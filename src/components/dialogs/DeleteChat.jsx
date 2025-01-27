import { Menu, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { setIsDeleteChat } from '../../redux/reducers/misc'
import { ExitToApp as ExitToAppIcon, Delete as DeleteIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useAsyncMutation } from '../../hooks/hook'
import { useDeleteChatMutation, useLeaveGroupMutation } from '../../redux/api/api'
import toast from 'react-hot-toast'

const DeleteChat = ({ dispatch, deleteChatAnchor }) => {

    const navigate = useNavigate();

    const { isDeleteChat, selectedDeleteChat } = useSelector((state) => state.misc)

    const [deleteChat, _, deleteChatData] = useAsyncMutation(useDeleteChatMutation);
    const [leaveGroup, __, leaveGroupData] = useAsyncMutation(useLeaveGroupMutation);


    const closeHandler = () => {
        dispatch(setIsDeleteChat(false))
        deleteChatAnchor.current = null;
    }

    const isGroup = selectedDeleteChat.groupChat;


    const leavGroupHandler = () => {
        closeHandler();
        leaveGroup("Leaving Group...", selectedDeleteChat.chatId)

    }

    const deleteChatHandler = () => {
        closeHandler();
        deleteChat("Deleting Chat...", selectedDeleteChat.chatId)
    };

    useEffect(() => {

        if (deleteChatData || leaveGroupData) {
            navigate('/')
        }

    }, [deleteChatData, leaveGroupData])

    return (
        <Menu
            open={isDeleteChat}
            onClose={closeHandler}
            anchorEl={deleteChatAnchor.current}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }}
            transformOrigin={{
                vertical: 'center',
                horizontal: 'center'
            }}
            sx={{
                bgcolor: 'transparent', // Make the menu background fully transparent
                backdropFilter: 'blur(1px)',
                '& .MuiPaper-root': {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(5px)',
                    boxShadow: 'none',
                }
            }}
        >
            <Stack
                sx={{
                    width: '10rem',
                    padding: '0.5rem',
                    cursor: 'pointer',
                    color: 'white',
                }}
                direction={'row'}
                alignItems={'center'}
                spacing={'0.5rem'}
                onClick={isGroup ? leavGroupHandler : deleteChatHandler}
            >
                {isGroup ? (
                    <>
                        <ExitToAppIcon /> <Typography>Leave Group</Typography>
                    </>
                ) : (
                    <>
                        <DeleteIcon /> <Typography>Delete User</Typography>
                    </>
                )}
            </Stack>
        </Menu>
    )
}

export default DeleteChat
