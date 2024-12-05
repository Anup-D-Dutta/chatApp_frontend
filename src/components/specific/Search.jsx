


import { Dialog, DialogTitle, InputAdornment, Stack, TextField, List, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useInputValidation } from '6pp';
import { Search as SearchIcon } from '@mui/icons-material';
import UserItem from '../Shared/UserItem';
import { sampleUsers } from '../../constants/sampleData';
import { useDispatch, useSelector } from 'react-redux';
import { setIsSearch } from '../../redux/reducers/misc';
import { useLazySearchUserQuery, useSendFriendRequestMutation } from "../../redux/api/api";
import toast from 'react-hot-toast';
import { useAsyncMutation } from '../../hooks/hook';

const Search = () => {

  const { isSearch } = useSelector((state) => state.misc);

  const [searchUser] = useLazySearchUserQuery();
  const [sendFriendRequest, isLoadingSendFriendRequest] = useAsyncMutation(useSendFriendRequestMutation);

  const dispatch = useDispatch();

  const search = useInputValidation('');


  const [users, setUsers] = useState([]);


  const addFriendHandler = async (id) => {
    await sendFriendRequest("Sending friend request...", { userId: id });
  };

  const searchCloseHandler = () => dispatch(setIsSearch(false))

  useEffect(() => {
    // Create a timeout to delay the search function
    const timeOutId = setTimeout(() => {

      searchUser(search.value)
        .then(({ data }) => setUsers(data.users))  // Handle success by setting the users
        .catch((e) => console.log(e));  // Handle error by logging it

    }, 1000);  // Delay the search by 1 second

    // Clean up function to clear timeout when `search.value` changes
    return () => {
      clearTimeout(timeOutId);
    };
  }, [search.value]);  // Runs whenever `search.value` changes


  return (
    <Dialog
      open={isSearch}
      onClose={searchCloseHandler}
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
        <Stack p={'2rem'} direction={'column'} width={'25rem'}>
          <DialogTitle color='white' textAlign={'center'}>Find People</DialogTitle>
          <TextField
            label=''
            value={search.value}
            onChange={search.changeHandler}
            variant='outlined'
            size='small'
            placeholder='Search...'

            InputProps={{
              startAdornment: (
                <InputAdornment position='start' sx={{ color: 'white' }}>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            
            sx={{
              backgroundColor: 'rgba(0,0,0,0.1)', // TextField background with transparency
              border: '1px solid gray',
              borderRadius: '0.6rem',
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

            
          />

          <List>
            {users.map((i) => (
              <UserItem
                user={i}
                key={i._id}
                handler={addFriendHandler}
                handlerIsLoading={isLoadingSendFriendRequest}

              />
            ))}
          </List>
        </Stack>
      </Box>
    </Dialog>
  );
};



export default Search;




// import { Dialog, DialogTitle, InputAdornment, Stack, TextField, List, Box } from '@mui/material';
// import React, { useState, useEffect } from 'react';
// import { useInputValidation } from '6pp';
// import { Search as SearchIcon } from '@mui/icons-material';
// import UserItem from '../Shared/UserItem';
// import { sampleUsers } from '../../constants/sampleData';
// import { useDispatch, useSelector } from 'react-redux';
// import { setIsSearch } from '../../redux/reducers/misc';
// import { useLazySearchUserQuery } from "../../redux/api/api";

// const Search = () => {
//   const { isSearch } = useSelector(state => state.misc);
//   const [searchUser, { data, isFetching, isError }] = useLazySearchUserQuery(); // Get data, isFetching, isError from query
//   const dispatch = useDispatch();

//   const [users, setUsers] = useState(sampleUsers);
//   const search = useInputValidation(''); // Input value hook
//   let isLoadingSendFriendRequest = false;

//   const addFriendHandler = (id) => {
//     console.log(id);
//   };

//   const searchCloseHandler = () => dispatch(setIsSearch(false));

//   useEffect(() => {
//     // Only search when input value is not empty
//     if (search.value.trim() === '') {
//       setUsers(sampleUsers); // Reset to sample users if input is empty
//       return;
//     }

//     // Create a timeout to debounce the search
//     const timeOutId = setTimeout(() => {
//       searchUser(search.value); // Trigger the API call with the input value
//     }, 1000); // Delay the search by 1 second

//     // Cleanup function to clear timeout when `search.value` changes
//     return () => {
//       clearTimeout(timeOutId);
//     };
//   }, [search.value, searchUser]);

//   useEffect(() => {
//     // Handle the API response and update users
//     if (data && data.users) {
//       setUsers(data.users); // Update users from API response
//     }
//   }, [data]);

//   return (
//     <Dialog
//       open={isSearch}
//       onClose={searchCloseHandler}
//       PaperProps={{
//         sx: {
//           backgroundColor: 'rgba(0,0,0,0.1)', // Transparent background color
//           backdropFilter: 'blur(1px)', // Apply blur effect
//           boxShadow: 2,
//         },
//       }}
//     >
//       <Box
//         sx={{
//           bgcolor: 'rgba(0,0,0,0.1)', // Slightly transparent background inside the dialog
//           backdropFilter: 'blur(1px)', // Additional blur effect
//           borderRadius: 2,
//         }}
//       >
//         <Stack p={'2rem'} direction={'column'} width={'25rem'}>
//           <DialogTitle color='white' textAlign={'center'}>Find People</DialogTitle>
//           <TextField
//             label=''
//             value={search.value}
//             onChange={search.changeHandler}
//             variant='outlined'
//             size='small'
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position='start' sx={{ color: 'white' }}>
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//             sx={{
//               backgroundColor: 'rgba(0,0,0,0.1)', // TextField background with transparency
//               border: '1px solid gray',
//               borderRadius: '0.6rem',
//               input: { color: 'white' }
//             }}
//           />

//           <List>
//             {isFetching ? (
//               <p style={{ color: 'white', textAlign: 'center' }}>Loading...</p> // Display a loading state
//             ) : isError ? (
//               <p style={{ color: 'red', textAlign: 'center' }}>Error occurred. Please try again.</p> // Handle error case
//             ) : (
//               users.map((i) => (
//                 <UserItem
//                   user={i}
//                   key={i._id}
//                   handler={addFriendHandler}
//                   handlerIsLoading={isLoadingSendFriendRequest}
//                 />
//               ))
//             )}
//           </List>
//         </Stack>
//       </Box>
//     </Dialog>
//   );
// };

// export default Search;
