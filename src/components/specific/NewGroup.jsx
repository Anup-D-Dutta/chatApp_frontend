import React, { useState } from 'react'
import { Dialog, DialogTitle, InputAdornment, Stack, TextField, ListItem, Typography, Avatar, Button, Box, Skeleton } from '@mui/material'
import { sampleUsers } from '../../constants/sampleData'
import UserItem from '../Shared/UserItem'
import { useInputValidation } from '6pp'
import { useDispatch, useSelector } from 'react-redux'
import { useAvailableFriendsQuery, useNewGroupMutation } from '../../redux/api/api'
import { useAsyncMutation, useErrors } from '../../hooks/hook'
import { setIsNewGroup } from '../../redux/reducers/misc'
import toast from 'react-hot-toast'

const NewGroup = () => {

  const { isNewGroup } = useSelector((state) => state.misc)
  const dispatch = useDispatch();

  const { isError, isLoading, error, data } = useAvailableFriendsQuery();

  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);

  const submitHandler = async () => {
    if (!groupName.value) {
      toast.error('Group name is required');
      return;
    }
    if (selectedMembers.length < 2) {
      toast.error('Please select at least 3 members');
      return;
    }

    newGroup("Creating New Group", { name: groupName.value, members: selectedMembers });

  };


  // Initialize the hook with a rule (for example, the field cannot be empty)
  const groupName = useInputValidation('');

  const [selectedMembers, setSelectedMembers] = useState([]);

  console.log(data)

  const errors = [
    {
      isError,
      error,
    }
  ]

  useErrors(errors)


  const selectMemberHandler = (id) => {

    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((currentElement) => currentElement !== id) :
        [...prev, id]
    );
  };
  // console.log(selectedMembers);

  const closeHandler = () => {
    dispatch(setIsNewGroup(false))
  }

  return (
    <Dialog open={isNewGroup} onClose={closeHandler}
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
      <Box
        sx={{
          bgcolor: 'rgba(0,0,0,0.1)', // Slightly transparent background inside the dialog
          backdropFilter: 'blur(1px)', // Additional blur effect
          borderRadius: 2,
        }}
      >
        <Stack p={{ xs: '1rem', sm: '3rem' }} width={'25rem'} spacing={'2rem'}>
          <DialogTitle color='white' textAlign={'center'} variant='h4'>New Groups</DialogTitle>

          <TextField
            label='Group Name'
            value={groupName.value}
            onChange={groupName.changeHandler}
            sx={{
              backgroundColor: 'rgba(0,0,0,0.1)', // TextField background with transparency
              border: '1px solid gray',
              borderRadius: '0.6rem',
              // color: 'white',
              input: { color: 'white' },
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px", // Adjust the border radius
                "& fieldset": {
                  borderRadius: "0.4rem",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "gray", // Optional: Customize the focus color
                },
              },
            }}
            InputLabelProps={{
              style: { color: 'white', },
            }}
          />

          <Typography color='white' variant='body1'>Members</Typography>

          <Stack>
            {isLoading ? (<Skeleton />) : (data?.friends?.map((i) => (
              <UserItem
                user={i}
                key={i._id}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(i._id)}
              // handlerIsLoasding={isLoadingSendFriendRequest}
              />
            ))
            )}
          </Stack>

          <Stack direction={'row'} justifyContent={'space-evenly'} >
            <Button variant='text' color='error' size='large' onClick={closeHandler}>Cancel</Button>
            <Button variant='contained' size='large' onClick={submitHandler} disabled={isLoadingNewGroup}>Create</Button>

          </Stack>

        </Stack>
      </Box>
    </Dialog>
  )
}

export default NewGroup



