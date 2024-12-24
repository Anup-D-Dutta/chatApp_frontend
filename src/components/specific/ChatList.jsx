



import React from 'react';
import { Stack, TextField } from '@mui/material';
import ChatItem from '../Shared/ChatItem';

const ChatList = ({
    bg = 'rgba(0, 0, 0, 0.9)',
    // backgroundImage: '',
    w = '100%',
    chats = [],
    chatId,
    onlineUsers = [],
    newMessagesAlert = [{ chatId: "", count: 0 }],
    handleDeleteChat,
}) => {
    return (
        <Stack
            bgcolor={bg}
            width={w}
            direction="column"
            overflow="auto"
            height="100%"
            padding='0.4rem'
            borderRight={'1px solid gray'}
            sx={{
                backdropFilter: 'blur(5px)',
                overflow: 'auto',
                height: '100%',
                '&::-webkit-scrollbar': {
                    width: '4px',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'gray',
                    borderRadius: '4px',
                },

            }}
        >
            {/* <TextField
            label='Search...'

                sx={{
                    // position: 'fixed',
                    marginTop: '1rem',
                    border: '1px solid gray',
                    borderRadius: '2rem',
                    input: { color: 'white' },
                    label: { color: 'white' },
                }}
            /> */}

            {chats.map((data, index) => {
                // Ensure data object and required properties are defined
                if (!data || !data._id) {
                    return null; // Skip this iteration if data is undefined or missing an _id
                }

                const {
                    // avatar = [],  // Default to an empty array if avatar is missing
                    avatar,
                    _id,
                    // name = "Unknown User", // Default name if missing
                    name,
                    groupChat = false,
                    members, // Default to empty array if members are missing
                    // members = [], // Default to empty array if members are missing

                } = data;

                const newMessageAlert = newMessagesAlert.find(
                    (alert) => alert.chatId === _id
                );

                // const isOnline = Array.isArray(members) && Array.isArray(onlineUsers)
                //     ? members.some((member) => {
                //         const memberId = typeof member === 'string' ? member : member._id;
                //         return onlineUsers.some((onlineUser) => {
                //             const onlineUserId = typeof onlineUser === 'string' ? onlineUser : onlineUser._id;
                //             return onlineUserId === memberId;
                //         });
                //     })
                //     : false;
                // const isOnline = Array.isArray(members) && Array.isArray(onlineUsers)
                //     ? members.some((member) => onlineUsers.includes(member._id || member))
                //     : false;
                const isOnline = Array.isArray(members) && Array.isArray(onlineUsers) && members.length > 0 && onlineUsers.length > 0
                    ? members.some((member) => onlineUsers.includes(member))
                    : false;



                return (
                    <ChatItem
                        index={index}
                        newMessageAlert={newMessageAlert}
                        isOnline={isOnline}
                        avatar={avatar}
                        name={name}
                        _id={_id}
                        key={_id}
                        groupChat={groupChat}
                        sameSender={chatId === _id}
                        handleDeleteChat={handleDeleteChat}
                    />
                );
            })}
        </Stack>
    );
};

export default ChatList;
