import React, { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlinePaperClip } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";
import AppLayout from "../components/layout/AppLayout";
import FileMenu from "../components/dialogs/FileMenu";
import MessageComponents from "../components/Shared/MessageComponents";
import { getSocket } from "../utils/socket";
import { CHAT_JOINED, CHAT_LEAVED, NEW_MESSAGE } from "../constants/event";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { useErrors, useSocketEvents } from "../hooks/hook";
import { useInfiniteScrollTop } from "6pp";
import { useDispatch } from "react-redux";
import { setIsFileMenu } from "../redux/reducers/misc";
import { setNewMessageAlert } from "../redux/reducers/chat";
import ChatHeader from "../components/layout/ChatHeader";

const Chat = ({ chatId, handleDeleteChat }) => {
  const socket = getSocket();
  const dispatch = useDispatch();
  const fileMenuRef = useRef(null);
  const containerRef = useRef(null);
  const bottomRef = useRef(null);
  const user = useSelector(state => state.auth.user);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
  const chatDetails = useChatDetailsQuery({ chatId, populate: true, skip: !chatId });

  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  );

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];

  const members = chatDetails?.data?.chat?.members;

  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

  const handleEmojiClick = (emojiObject) => {
    setMessage((prev) => prev + emojiObject.emoji);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      chatId,
      members,
      message,
      timestamp: new Date().toISOString(),
    };

    socket.emit(NEW_MESSAGE, newMessage);
    setMessage("");
  };

  useEffect(() => {
    socket.emit(CHAT_JOINED, { userId: user._id, members });

    return () => {
      setMessages([]);
      setMessage("");
      setOldMessages([]);
      setPage(1);
      socket.emit(CHAT_LEAVED, { userId: user._id, members });
    };
  }, [chatId]);

  const newMessageHandler = useCallback(
    (data) => {
      // Always increment new message count for the chat
      dispatch(setNewMessageAlert({ chatId: data.chatId }));

      // Only add message to UI if it's for the open chat
      if (data.chatId === chatId) {
        setMessages((prev) => [...prev, data.message]);
      }
    },
    [chatId, dispatch]
  );

  const eventHandlers = { [NEW_MESSAGE]: newMessageHandler };
  useSocketEvents(socket, eventHandlers);
  useErrors(errors);

  const allMessages = [...oldMessages, ...messages].sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );

  useEffect(() => {
    if (messages.length > 0) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef(null);

  const handleScroll = () => {
    setIsScrolling(true);
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
    }, 1500);
  };

  useEffect(() => {
    // Reset new message count for this chat when opened or messages change
    dispatch(setNewMessageAlert({ chatId, reset: true }));
  }, [chatId, messages, dispatch]);


  const handleBack = () => {
    window.history.back();
  };

  return chatDetails.isLoading ? (
    <div className="w-full h-full bg-gray-900 animate-pulse"></div>
  ) : (
    <Fragment>
      {/* Full Height Flex Layout */}
      <div className="flex flex-col h-full w-full bg-black/90 backdrop-blur-md">
        {/* Header */}
        <div className="shrink-0">
          <ChatHeader
            avatar={(() => {
              const chat = chatDetails?.data?.chat;
              if (!chat) return '/default-avatar.png';
              if (chat.groupChat) {
                return chat.avatar?.[0] || '/default-avatar.png';
              } else {
                const myId = user?._id ? String(user._id) : undefined;
                let otherMember = chat.members?.find(m => String(m._id) !== myId);
                if (!otherMember && chat.members?.length) {
                  otherMember = chat.members[0];
                }
                if (!otherMember) return '/default-avatar.png';
                if (typeof otherMember.avatar === 'object' && otherMember.avatar !== null) {
                  return otherMember.avatar.url || '/default-avatar.png';
                }
                return otherMember.avatar || '/default-avatar.png';
              }
            })()}
            name={(() => {
              const chat = chatDetails?.data?.chat;
              if (!chat) return 'Unknown User';
              if (chat.groupChat) {
                return chat.name || 'Unknown Group';
              } else {
                const myId = user?._id ? String(user._id) : undefined;
                let otherMember = chat.members?.find(m => String(m._id) !== myId);
                if (!otherMember && chat.members?.length) {
                  otherMember = chat.members[0];
                }
                return otherMember?.name || 'Unknown User';
              }
            })()}
            chatId={chatId}
            groupChat={chatDetails?.data?.chat?.groupChat}
            handleDeleteChat={handleDeleteChat}
            handleBack={handleBack}
          />
        </div>

        {/* Messages */}
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className={`flex-1 p-4 flex flex-col gap-4 border-r border-[#2C2C2C] overflow-y-auto ${isScrolling ? "scrollbar-thin scrollbar-thumb-gray-500" : "scrollbar-none"
            }`}
        >
          {allMessages.map((msg, index) => (
            <MessageComponents key={msg._id || `msg-${index}`} message={msg} user={user} />
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={submitHandler}
          className="shrink-0 flex items-center border-t border-[#2C2C2C] px-3 py-2 gap-2"
        >
          {/* File Button */}
          <button
            type="button"
            ref={fileMenuRef}
            onClick={handleFileOpen}
            className="text-white hover:text-gray-300 p-2"
          >
            <AiOutlinePaperClip size={22} />
          </button>

          {/* Emoji Button */}
          <div className="relative w-5">
            <button
              type="button"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
              className="text-white hover:text-gray-300 p-2"
            >
              <BsEmojiSmile size={22} />
            </button>

            {showEmojiPicker && (
              <div className="absolute bottom-12 sm:bottom-14 left-0 z-50">
                <EmojiPicker theme="dark" onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>

          {/* Input */}
          <input
            type="text"
            className="flex-1 bg-transparent outline-none text-white px-2 py-2 text-sm sm:text-base"
            placeholder="Type message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          {/* Send */}
          <button
            type="submit"
            className="text-white hover:text-gray-300 p-2"
          >
            <IoSend size={22} />
          </button>
        </form>
      </div>

      <FileMenu anchorEl={fileMenuAnchor} chatId={chatId} />
    </Fragment>
  );
};

export default AppLayout()(Chat);
