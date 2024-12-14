import React, { memo } from 'react'
import { Dialog, DialogTitle, InputAdornment, Stack, TextField, ListItem, Typography, Avatar, Button, Box, Skeleton } from '@mui/material'
import { sampleNotifications } from '../../constants/sampleData'
import { useAcceptFriendRequestMutation, useGetNotificationsQuery } from '../../redux/api/api'
import { useErrors } from '../../hooks/hook'
import { useDispatch, useSelector } from 'react-redux'
import { setIsNotification } from '../../redux/reducers/misc'
import toast from 'react-hot-toast'


const Notifications = () => {

  const { isNotification } = useSelector((state) => state.misc);

  const dispatch = useDispatch();

  const { isLoading, data, error, isError } = useGetNotificationsQuery();

  const [acceptRequest] = useAcceptFriendRequestMutation();


  const friendRequestHandler = async({ _id, accept }) => {

    try {

      const res = await acceptRequest({requestId: _id, accept})

      dispatch(setIsNotification(false))

      if(res.data?.success){
        console.log("Use SocketHere");
        toast.success(res.data.message);
      }
      else if(!res.data?.success){
        console.log("Use SocketHere");
        toast.success(res.data.message);
      }
      else{
        toast.error(res.data?.error || "somthing went wrong")
      }

    } catch (error) {
      toast.error("somthing went wrong")

      console.log(error)
    }


  };

  const closeHandler = () => dispatch(setIsNotification(false))

  useErrors([{ error, isError }]);

  return (
    <Dialog open={isNotification} onClose={closeHandler}
      PaperProps={{
        sx: {
          backgroundColor: 'rgba(0,0,0,0.1)', // Transparent background color
          backdropFilter: 'blur(1px)', // Apply blur effect
          boxShadow: 2,
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'gray',
            borderRadius: '4px',
          },
        },
      }}
    >
      <Stack p={{ xs: '1rem', sm: '2rem' }} maxWidth={'25rem'} sx={{
        bgcolor: 'rgba(0,0,0,0.1)', // Slightly transparent background inside the dialog
        backdropFilter: 'blur(1px)', // Additional blur effect
        borderRadius: 2,
      }}>
        <DialogTitle textAlign={'center'} color='white'>Notifications</DialogTitle>

        <Box color={'white'}>

          {
            isLoading ? <Skeleton /> : <>
              {data?.allRequest?.length > 0 ? (
                data?.allRequest.map(({ sender, _id }) => (
                  <NotificationItem
                    sender={sender}
                    _id={_id}
                    handler={friendRequestHandler}
                    key={_id}
                  />
                ))
              ) : (
                <Typography color='white' textAlign={'center'}>0 Notifications</Typography>
              )}
            </>
          }
        </Box>
      </Stack>
    </Dialog>
  )
}

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;
  return (
    <ListItem >
      <Stack
        direction={'row'}
        alignItems={'center'}
        spacing={'1rem'}
        width={'100%'}
      >
        <Avatar src={avatar} />

        <Typography
          variant='body1'
          sx={{
            flexGrow: 1,
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%'
          }}
        >
          {`${name} send you a friend request.`}
        </Typography>

        <Stack direction={{
          xs: 'column',
          sm: 'row',
        }}>
          <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
          <Button color='error' onClick={() => handler({ _id, accept: false })}>Reject</Button>

        </Stack>

      </Stack>
    </ListItem>
  )
});

export default Notifications