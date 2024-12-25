import { Avatar, Dialog, Stack, Typography } from '@mui/material'
import React from 'react'
import { Face as FaceIcon, AlternateEmail as UaerNmaeIcon, CalendarMonth as CalenderIcon } from '@mui/icons-material'
import moment from 'moment';
import { transformImage } from '../../lib/Features'

const Profile = ({ user }) => {
    return (
        // <Dialog>
        <Stack spacing={'2rem'} direction={'column'} alignItems={'center'}
            sx={{
                bgcolor: 'rgba(0,0,0,0.1)', // Slightly transparent background inside the dialog
                backdropFilter: 'blur(8px)', // Additional blur effect
                borderRadius: 2,
                border: '1px solid #1F1F1F',
                height: '100%',
                padding: '2rem',
            }}
        >
            <Avatar
                src={transformImage(user?.avatar?.url)}
                sx={{
                    width: 200,
                    height: 200,
                    objectFit: 'contain',
                    marginBottom: '1rem',
                    border: '5px solid white'
                }}
            />
            <ProfileCard heading={"Bio"} text={user.bio} />
            <ProfileCard heading={"Username"} text={user?.username} Icon={<UaerNmaeIcon />} />
            <ProfileCard heading={"Name"} text={user?.name} Icon={<FaceIcon />} />
            <ProfileCard heading={"Joined"} text={moment(user.createdAt).fromNow()} Icon={<CalenderIcon />} />


        </Stack>
        // </Dialog> 
    );
};

const ProfileCard = ({ text, Icon, heading }) => (
    <Stack
        direction={'row'}
        alignItems={'center'}
        spacing={'1rem'}
        color={'white'}
        textAlign={'center'}
    >

        {Icon && Icon}

        <Stack>
            <Typography variant='body1'>{text}</Typography>
            <Typography color={'gray'} variant='caption'>{heading}</Typography>
        </Stack>
    </Stack>

);

export default Profile
