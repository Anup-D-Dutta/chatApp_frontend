
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import { IconButton, Skeleton, Stack } from '@mui/material';
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material';
import { InputBox } from '../components/styles/styleComponents';
import FileMenu from '../components/dialogs/FileMenu';
import MessageComponents from '../components/Shared/MessageComponents';
import { getSocket } from '../utils/socket';
import { CHAT_JOINED, CHAT_LEAVED, NEW_MESSAGE } from '../constants/event';
import { useChatDetailsQuery, useGetMessagesQuery } from '../redux/api/api';
import { useErrors, useSocketEvents } from '../hooks/hook';
import { useInfiniteScrollTop } from '6pp';
import { useDispatch } from 'react-redux';
import { setIsFileMenu } from '../redux/reducers/misc';
import { assets } from '../assets/assets';

const Chat = ({ chatId, user = { currentUser } }) => {
  const socket = getSocket();
  const dispatch = useDispatch();
  const fileMenuRef = useRef(null);

  const containerRef = useRef(null);
  const bottomRef = useRef(null); // To scroll to bottom

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages,
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

    socket.emit(CHAT_JOINED, { userId: user._id, members })
    // dispatch(removeNewMessageAlert(chatId));

    return () => {
      setMessages([]);
      setMessage('');
      setOldMessages([]);
      setPage(1);
      socket.emit(CHAT_LEAVED, { userId: user._id, members })
    };
  }, [chatId]);

  const newMessageHandler = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );

  const eventHandlers = { [NEW_MESSAGE]: newMessageHandler };
  useSocketEvents(socket, eventHandlers);
  useErrors(errors);

  // Merge and sort all messages in ascending order
  // const allMessages = [...oldMessages, ...messages].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  const allMessages = [...oldMessages, ...messages].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  // const allMessages = [...oldMessages, ...messages];


  useEffect(() => {
    if (messages.length > 0) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);


  useEffect(() => {
    if (oldMessages.length > 0) {
      containerRef.current.scrollBottom = 1; // Set to the top

    }
  }, [oldMessages]);




  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <Fragment>
      <Stack
        ref={containerRef}
        boxSizing={'border-box'}
        padding={'1rem'}
        spacing={'1rem'}
        bgcolor={'rgba(0, 0, 0, 0.9)'}
        borderRight={'1px solid gray'}
        height={'90%'}
        sx={{
          // backgroundImage: `url(${assets.bg_chat3})`,
          // backgroundSize: 'cover',
          backdropFilter: 'blur(5px)',
          overflowX: 'hidden',
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'gray',
            borderRadius: '4px',
          },
        }}

      >
        {/* Render messages in ascending order (oldest first) */}
        {allMessages.map((msg, index) => (
          <MessageComponents key={msg._id || `msg-${index}`} message={msg} user={user} />
        ))}

        {/* Scroll target for new messages */}
        <div ref={bottomRef} />
      </Stack>

      <form
        style={{ height: '10%' }}
        onSubmit={submitHandler}
      >
        {/* Message container */}
        <Stack
          direction={'row'}
          height={'100%'}
          padding={'0.8rem'}
          alignItems={'center'}
          position={'relative'}
          bgcolor={'rgba(0, 0, 0, 0.9)'}
          sx={{
            borderTop: '1px solid gray',
            borderRight: '1px solid gray',
            backdropFilter: 'blur(5px)'
          }}
        >
          <IconButton
            sx={{
              position: 'absolute',
              left: '0.4rem',
              color: 'white',
              '&:hover': { rotate: '-90deg' }
            }}
            onClick={handleFileOpen}
            ref={fileMenuRef}
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox placeholder='Type Message Here...' value={message} onChange={(e) => setMessage(e.target.value)} />

          <IconButton type='submit' sx={{ color: 'white', marginLeft: '0.5rem', padding: '0.5rem', '&:hover': { background: 'gray', rotate: '-90deg' } }}>
            <SendIcon />
          </IconButton>
        </Stack>
      </form>

      <FileMenu anchorEl={fileMenuAnchor} chatId={chatId} />
      {/* {chatId && <FileMenu anchorEl={fileMenuAnchor} chatId={chatId} />} */}

    </Fragment>
  );
};

export default AppLayout()(Chat);
