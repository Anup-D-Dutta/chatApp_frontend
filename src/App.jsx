import React, { Suspense, useEffect, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LayoutLoaders } from './components/layout/Loaders';
import ProtectRoute from './components/auth/ProtectRoute'
import axios from 'axios'
import { API_URL } from './constants/config';
import { useDispatch, useSelector } from 'react-redux';
import { userExists, userNotExists } from './redux/reducers/auth'
import { Toaster } from 'react-hot-toast'
import { SocketProvider } from './utils/socket';

const Home = lazy(() => import('./pages/home'));
const Login = lazy(() => import('./pages/login'));
const Chat = lazy(() => import('./pages/chat'));
const Group = lazy(() => import('./pages/group'));
const NotFound = lazy(() => import('./pages/NotFound'));

// const user = true;

const App = () => {

  const { user, loder } = useSelector(state => state.auth)

  const dispatch = useDispatch();


  useEffect(() => {

    axios
      .get(`${API_URL}/api/v1/user/me`, { withCredentials: true })
      .then(({ data }) => dispatch(userExists(data.user)))
      .catch((err) => dispatch(userNotExists()));
  }, [dispatch])

  return loder ? (
    <LayoutLoaders />
  ) : (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoaders />}>
        <Routes>
          {/* <Route element={<SocketProvider>
            <ProtectRoute use={user} />
          </SocketProvider>}> */}

          <Route element={<SocketProvider><ProtectRoute user={user} /></SocketProvider>}>


            <Route path='/' element={<Home />} />
            <Route path='/chat/:chatId' element={<Chat />} />
            <Route path='/group' element={<Group />} />

          </Route>

          <Route path='/login' element={<ProtectRoute user={!user} redirect='/'><Login /></ProtectRoute>} />
          {/* <Route element={<SocketProvider><ProtectRoute user={user} /></SocketProvider>}> */}

          <Route path='*' element={<NotFound />} />


        </Routes>
      </Suspense>
      <Toaster  position="top-center" />
    </BrowserRouter>
  );
};

export default App
