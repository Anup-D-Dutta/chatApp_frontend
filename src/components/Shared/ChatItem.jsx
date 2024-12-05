// import { memo } from 'react';
// import React from 'react'
// import { Link } from '../styles/styleComponents';
// import { Stack, Typography, Box, Avatar as AvatarCard } from '@mui/material';

// const ChatItem = ({
//     avatar = [],
//     name,
//     _id,
//     groupChat = false,
//     sameSender,
//     isOnline = [],
//     newMessageAlert,
//     index = 0,
//     handleDeleteChat,
// }) => {
//     return (
//         <Link

//             sx={{
//                 padding: 0,
//             }}

//             to={`/chat/${_id}`}
//             onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
//         >

//             <div style={{
//                 display: 'flex',
//                 gap: '1rem',
//                 alignItems: 'canter',
//                 padding: '1rem',
//                 background: sameSender ? 'rgba(0,0,0,0.3)' : 'unset',
//                 // color: sameSender ? 'black' : 'unset',
//                 position: 'relative',
//                 color: 'white'

//             }}>

//                 {/* Avatar Card */}
//                 <AvatarCard avatar={avatar} />


//                 <Stack>
//                     <Typography>{name}</Typography>
//                     {
//                         newMessageAlert && (
//                             <Typography fontSize={'11px'}>{newMessageAlert.count} New Message</Typography>
//                         )
//                     }
//                 </Stack>

//                 {isOnline && (
//                     <Box
//                         sx={{
//                             width: '10px',
//                             hight: '10px',
//                             borderRadius: '50%',
//                             backgroundColor: 'green',
//                             position: 'absolute',
//                             tap: '50%',
//                             right: '1rem',
//                             transform: 'translateY(-50%)',
//                         }}
//                     />
//                 )}
//             </div>
//         </Link>
//     );
// };

// export default memo(ChatItem);




import { memo } from 'react';
import React from 'react';
import { Link } from '../styles/styleComponents';
import { Stack, Typography, Box, Avatar } from '@mui/material';
import { motion } from 'framer-motion'


const ChatItem = ({
    avatar = [],
    name,
    _id,
    groupChat = false,
    sameSender,
    isOnline = [],
    newMessageAlert = {}, // Default to an empty object
    index = 0,
    handleDeleteChat
}) => {
    return (
        <Link
            sx={{ padding: 0 }}
            to={`/chat/${_id}`}
            onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
            aria-label={`Chat with ${name}`}
        >
            <motion.div
                initial={{ opacity: 0, x: '-100%' }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                    // borderBottom: '0.1px solid gray',
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center',
                    padding: '1rem',
                    background: sameSender ? 'rgba(0,0,0,0.7)' : 'unset',
                    color: 'white',
                    position: 'relative',
                }}>
                {/* Avatar Section */}
                <Avatar
                    src={Array.isArray(avatar) && avatar.length > 0 ? avatar[0] : ''}
                    alt={name}
                    sx={{
                        width: 40,
                        height: 40,
                        bgcolor: 'grey',
                    }}
                >
                    {(!Array.isArray(avatar) || avatar.length === 0) && name.charAt(0)}
                </Avatar>

                <Stack>
                    <Typography>{name}</Typography>

                    {/* Display new message count if it exists */}
                    {newMessageAlert?.count > 0 && (
                        <Typography fontSize="11px">{newMessageAlert.count} New Message</Typography>
                    )}
                </Stack>

                {isOnline && (
                    <Box
                        sx={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: '#04b976',
                            position: 'absolute',
                            top: '25%',
                            right: '20rem',
                            transform: 'translateY(-50%)',
                        }}
                    />
                    // <Typography
                    //     variant='caption'
                    //     sx={{
                    //         position: 'absolute',
                    //         top: '80%',
                    //         right: '0.3rem',
                    //         color: 'green',
                    //         transform: 'translateY(-50%)',
                    //     }}
                    // >
                    //     Online
                    // </Typography>
                )}


            </motion.div>
        </Link>
    );
};

export default memo(ChatItem);
