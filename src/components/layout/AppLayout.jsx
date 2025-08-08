import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Header from './Header';
import Title from '../Shared/Title';
import ChatList from '../specific/ChatList';
import Profile from '../specific/Profile';
import DeleteChat from '../dialogs/DeleteChat';

import { useMyChatsQuery } from '../../redux/api/api';
import { setIsDeleteChat, setIsMobile, setSelectedDeleteChat } from '../../redux/reducers/misc';
import { incrementNotification } from '../../redux/reducers/chat';
import { useErrors, useSocketEvents } from '../../hooks/hook';
import { getSocket } from '../../utils/socket';

import {
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  ONLINE_USERS,
  REFETCH_CHATS
} from '../../constants/event';

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const socket = getSocket();
    const chatId = params.chatId;
    const deleteChatAnchor = useRef(null);
    const location = useLocation();

    const [onlineUsers, setOnlineUsers] = useState([]);
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);
    const { isMobile } = useSelector((state) => state.misc);
    const { user } = useSelector((state) => state.auth);
    const { newMessagesAlert } = useSelector((state) => state.chat);

    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");
    useErrors([{ isError, error }]);

    useEffect(() => {
      const handleResize = () => {
        setIsLargeScreen(window.innerWidth >= 639);
      };

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    const handleDeleteChat = (e, chatId, groupChat) => {
      dispatch(setIsDeleteChat(true));
      dispatch(setSelectedDeleteChat({ chatId, groupChat }));
      deleteChatAnchor.current = e.currentTarget;
    };

    const handleMobileClose = () => dispatch(setIsMobile(false));

    const newMessageAlertHandler = useCallback((data) => {
      console.log(data.chatId);
    }, []);

    const newRequestHandler = useCallback(() => {
      dispatch(incrementNotification());
    }, [dispatch]);

    const refreshHandler = useCallback(() => {
      refetch();
      navigate('/');
    }, [refetch, navigate]);

    const onlineUserHandler = useCallback((data) => {
      setOnlineUsers(data);
    }, []);

    const eventHandlers = {
      [NEW_MESSAGE_ALERT]: newMessageAlertHandler,
      [NEW_REQUEST]: newRequestHandler,
      [REFETCH_CHATS]: refreshHandler,
      [ONLINE_USERS]: onlineUserHandler,
    };

    useSocketEvents(socket, eventHandlers);

    return (
      <>
        <Title />
        {(location.pathname === '/' || isLargeScreen) && <Header />}
        <DeleteChat dispatch={dispatch} deleteChatAnchor={deleteChatAnchor} />

        {/* Mobile Sidebar */}
        {isMobile && (
          <div
            onClick={handleMobileClose}
            className="fixed inset-0 z-50 bg-black/10 backdrop-blur-sm"
          >
            <div className="w-[70vw] bg-white h-full overflow-y-auto shadow-xl">
              <ChatList
                chats={data?.chats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
                color={'black'}
                newMessagesAlert={newMessagesAlert}
                onlineUsers={onlineUsers}
              />
            </div>
          </div>
        )}

        {/* Main Layout */}
        <div className="h-[calc(100vh-0rem)] md:h-[calc(100vh-4rem)] grid grid-cols-1 sm:grid-cols-[1fr_2fr] md:grid-cols-[0.8fr_2fr]">
          {/* Chat List (Left Sidebar) */}
          <div className="hidden sm:block h-full overflow-y-auto shadow-md">
            {isLoading ? (
              <div className="p-4 bg-gray-200 h-full animate-pulse" />
            ) : (
              <ChatList
                chats={data?.chats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
                color={'white'}
                newMessagesAlert={newMessagesAlert}
                onlineUsers={onlineUsers}
              />
            )}
          </div>

          {/* Chat Screen (Middle Section) */}
          <div className="h-full overflow-y-auto">
            <WrappedComponent
              {...props}
              chatId={chatId}
              user={user}
              data={data}
              handleDeleteChat={handleDeleteChat}
              newMessagesAlert={newMessagesAlert}
              onlineUsers={onlineUsers}
            />
          </div>

        </div>
      </>
    );
  };
};

export default AppLayout;