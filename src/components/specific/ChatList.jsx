import React, { useState, useRef, useEffect, useCallback } from 'react';
import ChatItem from '../Shared/ChatItem';

const ChatList = ({
    bg = 'rgba(0, 0, 0, 0.9)',
    w = '100%',
    chats = [],
    chatId,
    onlineUsers = [],
    newMessagesAlert = [{ chatId: '', count: 0 }],
    handleDeleteChat,
}) => {
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeout = useRef(null);
    const containerRef = useRef(null);

    const handleScroll = useCallback(() => {
        setIsScrolling(true);

        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

        scrollTimeout.current = setTimeout(() => {
            setIsScrolling(false);
        }, 1500);
    }, []);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => clearTimeout(scrollTimeout.current);
    }, []);

    return (
        <div
            ref={containerRef}
            onScroll={handleScroll}
            className={`flex flex-col h-full overflow-auto p-2 border-r border-gray-800 transition-all`}
            style={{
                backgroundColor: bg,
                width: w,
                backdropFilter: 'blur(5px)',
                scrollbarWidth: isScrolling ? 'thin' : 'none', // Firefox
            }}
        >
            {/* Scrollbar styling scoped to this container */}
            <style>
                {`
                    /* Webkit browsers (Chrome, Edge, Safari) */
                    .chat-scroll::-webkit-scrollbar {
                        width: ${isScrolling ? '3px' : '0px'};
                        transition: width 0.3s ease;
                    }
                    .chat-scroll::-webkit-scrollbar-thumb {
                        background-color: gray;
                        border-radius: 4px;
                    }
                `}
            </style>

            <div className="chat-scroll flex flex-col">
                {chats.map((data, index) => {
                    if (!data?._id) return null;

                    const { avatar, _id, name, groupChat = false, members = [], messages = [] } = data;

                    const newMessageAlertData = newMessagesAlert.find(alert => alert.chatId === _id) || { count: 0 };
                    const latestMessage = messages.length > 0 ? messages[messages.length - 1]?.content || '' : '';

                    const isOnline = members.some(member => onlineUsers.includes(member));

                    return (
                        <ChatItem
                            key={_id}
                            index={index}
                            newMessageAlert={{ ...newMessageAlertData, latestMessage }}
                            isOnline={isOnline}
                            avatar={avatar}
                            name={name}
                            _id={_id}
                            groupChat={groupChat}
                            sameSender={chatId === _id}
                            handleDeleteChat={handleDeleteChat}
                            latestMessage={latestMessage}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ChatList;
