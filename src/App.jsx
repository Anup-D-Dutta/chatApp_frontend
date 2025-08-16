// src/App.jsx
import React, { Suspense, useEffect, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import "./index.css";
import { API_URL } from "./constants/config";
import { useDispatch, useSelector } from "react-redux";
import { userExists, userNotExists } from "./redux/reducers/auth";
import { Toaster } from "react-hot-toast";
import { SocketProvider } from "./utils/socket";
import ProtectRoute from "./components/auth/ProtectRoute";

// Simple Loader Component (Tailwind)
const LayoutLoaders = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
  </div>
);

// Lazy imports
const Home = lazy(() => import("./pages/home"));
const Login = lazy(() => import("./pages/login"));
const Chat = lazy(() => import("./pages/chat"));
const Group = lazy(() => import("./pages/group"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  const { user, loader } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

 useEffect(() => {
  dispatch(userNotExists()); // reset immediately
  axios.get(`${API_URL}/api/v1/user/me`, { withCredentials: true })
    .then(({ data }) => dispatch(userExists(data.user)))
    .catch(() => dispatch(userNotExists()));
}, [dispatch]);

  return loader ? (
    <LayoutLoaders />
  ) : (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoaders />}>
        <Routes>
          {/* Protected routes with socket */}
          <Route
            element={
              <SocketProvider>
                <ProtectRoute user={user} />
              </SocketProvider>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/group" element={<Group />} />
          </Route>

          {/* Login route for non-authenticated users */}
          <Route
            path="/login"
            element={
              <ProtectRoute user={!user} redirect="/">
                <Login />
              </ProtectRoute>
            }
          />

          {/* Catch all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(30, 30, 30, 0.85)',
            backdropFilter: 'blur(10px)',
            color: '#fff',
            borderRadius: '0.75rem',
            padding: '0.75rem 1rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            fontSize: '0.95rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
          success: {
            style: {
              background: 'rgba(16, 185, 129, 0.9)', // Tailwind emerald-500
              color: '#fff',
            },
          },
          error: {
            style: {
              background: 'rgba(239, 68, 68, 0.9)', // Tailwind red-500
              color: '#fff',
            },
          },
        }}
      />
    </BrowserRouter>
  );
};

export default App;
