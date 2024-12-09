import React, { Suspense, useState, lazy } from 'react'
import { AppBar, Box, Toolbar, Typography, IconButton, Tooltip, Backdrop, Badge } from '@mui/material'
import { navyBlue } from '../../constants/color';
import { Menu as MenuIcon, Search as SearchIcon, Add as AddIcon, Group as GroupIcon, Logout as LogoutIcon, Notifications as NotificationsIcon, Brightness1 } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { userNotExists } from '../../redux/reducers/auth';
// import SearchDialog from '../specific/Search'
import { API_URL } from '../../constants/config';
import { setIsMobile, setIsNotification, setIsSearch, setIsNewGroup } from '../../redux/reducers/misc';
import { resetNotification } from '../../redux/reducers/chat';
import { assets } from '../../assets/assets';



const SearchDialog = lazy(() => import('../specific/Search'));
const NotificationDialog = lazy(() => import('../specific/Notifications'));
const NewGroupDialog = lazy(() => import('../specific/NewGroup'));


const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const { isSearch, isNotification, isNewGroup } = useSelector((state) => state.misc);

  const { notificationCount } = useSelector((state) => state.chat);

  // console.log(notificationCount)

  // const [isNewGroup, setisNewGroup] = useState(false)



  const handleMobile = () => {
    dispatch(setIsMobile(true))
    setIsMobile(true);
  }

  const openSearch = () => {
    // setisSearch((prev) => !prev);
    dispatch(setIsSearch(true))
    // setisSearch(true);
  }

  const openNewGroup = () => {
    // setisNewGroup((prev) => !prev);
    dispatch(setIsNewGroup(true));
  }

  const opennotification = () => {
    dispatch(setIsNotification(true));
    dispatch(resetNotification());

  }

  //  Group Manage page
  // const navigateToGroup = () => navigate('/group');


  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/v1/user/logout`,
        { withCredentials: true });

      dispatch(userNotExists())
      toast.success(data.message)
    }
    catch (error) {

      toast.error(error?.response?.data?.message || "Something went wrong")

    }
  }




  return (

    <>

      <Box sx={{ flexGrow: 1 }} height={'4rem'} >

        <AppBar position='static'
          sx={{
            bgcolor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(5px)',
            borderBottom: '1px solid gray'
            // bgcolor: 'transparent'
          }}>

          <Toolbar>

            <Typography sx={{
              fontSize: '1.8rem', display: { xs: 'none', sm: 'block' }
            }}>
              <span style={{
                fontWeight: '600',
                fontSize: '2rem',
                background: 'linear-gradient(16deg, #4b90ff, #ff5546)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                T
              </span>
              alk
              <span
                style={{
                  fontWeight: '600',
                  fontSize: '2rem',
                  background: 'linear-gradient(16deg, #4b90ff, #ff5546)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                S
              </span>
              ync
              <img style={{
                margin: '0 0 8px 5px', width: '2rem', filter: 'invert(15%) sepia(0%) saturate(107%) hue-rotate(130deg) brightness(95%) contrast(80%)'
              }}
                src={assets.chat_icon2} alt="" />
            </Typography>

            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>

              <IconButton color='inherit' onClick={handleMobile}>
                <MenuIcon />
              </IconButton>

            </Box>

            <Box sx={{ flexGrow: 1, }} />

            <Box>

              {/* Search Section */}
              <IconBtn title={'Search'} icon={<SearchIcon />} onClick={openSearch} />

              {/* Create Group Section */}
              <IconBtn title={'New Group'} icon={<AddIcon />} onClick={openNewGroup} />

              {/* Group Manage */}
              {/* <IconBtn title={'Manage Groups'} icon={<GroupIcon />} onClick={navigateToGroup} /> */}

              {/* Notification */}
              <IconBtn title={'Notifications'} icon={<NotificationsIcon />} onClick={opennotification} value={notificationCount} />

              {/* Logout Section */}
              <IconBtn title={'Logout'} icon={<LogoutIcon />} onClick={logoutHandler} />



            </Box>
          </Toolbar>
        </AppBar>
      </Box >


      {/* Search */}
      {
        isSearch && (
          <Suspense
            fallback={<Backdrop open />}>
            <SearchDialog
              open={isSearch}
            />
          </Suspense>)
      }

      {/* Notification  */}
      {
        isNotification &&
        <Suspense
          fallback={<Backdrop open />}
        >
          <NotificationDialog />
        </Suspense>
      }

      {/* New Group */}
      {
        isNewGroup &&
        <Suspense
          fallback={<Backdrop open />}
        >
          <NewGroupDialog />
        </Suspense>
      }


    </>
  );
};

// Here we create a component(IconBtn)
const IconBtn = ({ title, icon, onClick, value }) => {
  return (

    <Tooltip title={title}>
      <IconButton color='inherit' size='large' onClick={onClick}>
        {
          value ? (<Badge badgeContent={value} color="error"> {icon}</Badge>) : (icon)
          // icon
        }

      </IconButton>
    </Tooltip>
  );
};




export default Header



