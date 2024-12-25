import React, { useCallback, useEffect, useRef, useState } from 'react'
import Header from './Header'
import Title from '../Shared/Title'
import { Box, Drawer, Grid, Skeleton, Stack } from '@mui/material';
import ChatList from '../specific/ChatList';
import { sampleChats } from '../../constants/sampleData';
import { useParams, useNavigate } from 'react-router-dom';
import Profile from '../specific/Profile';
import { navyBlue } from '../../constants/color';
import { useMyChatsQuery } from '../../redux/api/api';
import { useDispatch, useSelector } from 'react-redux';
import { setIsDeleteChat, setIsMobile, setSelectedDeleteChat } from '../../redux/reducers/misc';
import toast from 'react-hot-toast';
import { useErrors, useSocketEvents } from '../../hooks/hook';
import { getSocket } from '../../utils/socket';
import UserDetails from '../Shared/UserDetails';
import { NEW_MESSAGE_ALERT, NEW_REQUEST, ONLINE_USERS, REFETCH_CHATS } from '../../constants/event';
import { incrementNotification, setNewMessageAlert } from '../../redux/reducers/chat';
import { assets } from '../../assets/assets';
import DeleteChat from '../dialogs/DeleteChat';


const AppLayout = () => (WrappedComponent) => {
    return (props) => {

        try {
            const params = useParams(); // useParams() cames from 'react-router-dom'
            const dispatch = useDispatch();
            const navigate = useNavigate();
            const socket = getSocket();


            const chatId = params.chatId;
            const deleteChatAnchor = useRef(null)
    

            const [onlineUsers, setOnlineUsers] = useState([]);

            const { isMobile } = useSelector((state) => state.misc);
            const { user } = useSelector((state) => state.auth);
            const { newMessagesAlert } = useSelector((state) => state.chat);



            const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");

            useErrors([{ isError, error }]);

            const handleDeleteChat = (e, chatId, groupChat) => {
                dispatch(setIsDeleteChat(true))
                dispatch(setSelectedDeleteChat({chatId,groupChat}))
                deleteChatAnchor.current = e.currentTarget;
                // e.preventDefault();
            }

            const handleMobileClose = () => dispatch(setIsMobile(false));

            const newMessageAlertHandler = useCallback((data) => {
                const sf = data.chatId;
                console.log(sf);
                // dispatch(setNewMessageAlert())

            }, [])

            const newRequestHandler = useCallback(() => {

                dispatch(incrementNotification())
            }, [dispatch]);

            const refreshHandler = useCallback(() => {
                refetch();
                navigate('/')
            }, [refetch, navigate])


            const onlineUserHandler = useCallback((data) => {
                // console.log(data);
                setOnlineUsers(data);
            }, []);


            const eventHandlers = {
                [NEW_MESSAGE_ALERT]: newMessageAlertHandler,
                [NEW_REQUEST]: newRequestHandler,
                [REFETCH_CHATS]: refreshHandler,
                [ONLINE_USERS]: onlineUserHandler,

            }

            useSocketEvents(socket, eventHandlers);

            return (
                <>
                    <Title />
                    <Header />
                    <DeleteChat dispatch={dispatch} deleteChatAnchor={deleteChatAnchor}/>

                    {
                        isLoading ? <Skeleton /> : (
                            <Drawer open={isMobile} onClick={handleMobileClose}
                                sx={{
                                    '& .MuiDrawer-paper': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Semi-transparent black
                                        backdropFilter: 'blur(1px)',          // Optional blur effect
                                    },
                                }}
                            >
                                <ChatList w='70vw'
                                    // bgcolor='rgba(0, 0, 0, 0.4)'
                                    // bgcolor='red'
                                    chats={data?.chats}
                                    chatId={chatId}
                                    handleDeleteChat={handleDeleteChat}
                                    color={'black'}
                                    newMessagesAlert={newMessagesAlert}
                                    onlineUsers={onlineUsers}
                                />
                            </Drawer>
                        )
                    }

                    {/* User(person) List */}
                    <Grid container height={'calc(100vh - 4rem)'}>
                        <Grid item sm={4} md={3} sx={{
                            display: { xs: 'none', sm: 'block' },
                            // background: 'rgba(0, 0, 0, 0.85)',
                            boxShadow: 4,
                        }}
                            height={'100%'}
                        >
                            {
                                isLoading ? (
                                    <Skeleton />
                                ) : (
                                    <ChatList
                                        chats={data?.chats}
                                        chatId={chatId}
                                        handleDeleteChat={handleDeleteChat}
                                        color={'white'}
                                        // user={user}
                                        newMessagesAlert={newMessagesAlert}
                                        onlineUsers={onlineUsers}

                                    />
                                )
                            }
                        </Grid>


                        <Grid item xs={12} sm={8} md={5} lg={6} height={'100%'}>
                            <WrappedComponent {...props} chatId={chatId} user={user} />
                            {/* <WrappedComponent {...props} /> */}

                        </Grid>


                        {/* Profile Container  */}
                        <Grid item md={4} lg={3} height={'100%'}
                            sx={{
                                display: { xs: 'none', md: 'block' },
                                padding: '2rem',
                                // borderTop: '5px solid red',
                                bgcolor: 'rgba(0,0,0,0.9)',
                                // backdropFilter: 'blur(5px)',
                                boxShadow: 4,
                            }}
                        >
                            <Profile user={user} />
                        </Grid>
                    </Grid>

                </>
            );

        } catch (error) {
            console.log(error);
        }

    }
}

export default AppLayout;


