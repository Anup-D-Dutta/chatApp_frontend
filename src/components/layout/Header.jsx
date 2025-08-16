import React, { Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import {FaBars} from 'react-icons/fa';
import { AiOutlineLogout } from "react-icons/ai";
import {
  HiOutlineSearch,
  HiOutlinePlus,
  HiOutlineBell,
} from 'react-icons/hi';
import { setIsMobile, setIsNotification, setIsSearch, setIsNewGroup } from '../../redux/reducers/misc';
import { userNotExists } from '../../redux/reducers/auth';
import { clearChatState } from '../../redux/reducers/chat';
import { resetNotification } from '../../redux/reducers/chat';
import { API_URL } from '../../constants/config';
import { assets } from '../../assets/assets';


const SearchDialog = lazy(() => import('../specific/Search'));
const NotificationDialog = lazy(() => import('../specific/Notifications'));
const NewGroupDialog = lazy(() => import('../specific/NewGroup'));

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSearch, isNotification, isNewGroup } = useSelector((state) => state.misc);
  const { notificationCount } = useSelector((state) => state.chat);

  const handleMobile = () => {
    dispatch(setIsMobile(true));
  };

  const openSearch = () => {
    dispatch(setIsSearch(true));
  };

  const openNewGroup = () => {
    dispatch(setIsNewGroup(true));
  };

  const openNotification = () => {
    dispatch(setIsNotification(true));
    dispatch(resetNotification());
  };

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/v1/user/logout`, { withCredentials: true });
      dispatch(userNotExists());
      dispatch(clearChatState());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <header className="bg-black/90 bg-opacity-90 backdrop-blur-md h-16 px-4 flex items-center justify-between shadow-md w-full">
        {/* Logo + Brand */}
        <div className="flex items-center gap-2">
          {/* Visible on sm and up */}
          <div className="flex items-center text-white text-xl md:text-2xl font-bold w-full">
            <span className="bg-gradient-to-r from-blue-500 to-red-500 text-transparent bg-clip-text">T</span>alk
            <span className="bg-gradient-to-r from-blue-500 to-red-500 text-transparent bg-clip-text">S</span>ync
            <img
              src={assets.chat_icon2}
              alt="logo"
              className="w-6 md:w-8 ml-2 mb-1 filter invert-[15%] sepia-0 saturate-[107%] hue-rotate-[130deg] brightness-[95%] contrast-[80%]"
            />
          </div>
        </div>

        {/* Mobile Menu Icon - Visible only on small screens */}
        {/* <div className="sm:hidden flex items-center">
          <IconBtn title="Menu" icon={<FaBars color="white" />} onClick={handleMobile} />
        </div> */}

        {/* Action Icons */}
        <div className="flex gap-3 sm:gap-5 text-white items-center ml-auto">
          <IconBtn title="Search" icon={<HiOutlineSearch  />} onClick={openSearch} />
          <IconBtn title="New Group" icon={<HiOutlinePlus />} onClick={openNewGroup} />
          <IconBtn
            title="Notifications"
            icon={<HiOutlineBell />}
            onClick={openNotification}
            value={notificationCount}
          />
          <IconBtn title="Logout" icon={<AiOutlineLogout />} onClick={logoutHandler} />
        </div>
      </header>

      {/* Dialogs */}
      {isSearch && (
        <Suspense fallback={<div className="fixed inset-0 bg-black bg-opacity-50 z-50" />}>
          <SearchDialog open={isSearch} />
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<div className="fixed inset-0 bg-black bg-opacity-50 z-50" />}>
          <NotificationDialog />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<div className="fixed inset-0 bg-black bg-opacity-50 z-50" />}>
          <NewGroupDialog />
        </Suspense>
      )}
    </>
  );
};

// Icon Button Component
const IconBtn = ({ title, icon, onClick, value }) => {
  return (
    <div className="relative group cursor-pointer" onClick={onClick} title={title}>
      {value > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full z-10">
          {value}
        </span>
      )}
      <div className="text-lg sm:text-xl">{icon}</div>
    </div>
  );
};

export default Header;
