

import React from 'react';
import { Box, Typography } from '@mui/material';

const UserDetails = ({ message = {}, user }) => {
    const { sender } = message;
    const sameSender = sender?._id === user?._id;

    return (
        <div
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.85)",
                color: 'white',
                // borderRadius: '0.5rem',
                width: '100%',
                height: '3rem',
                padding: '0',
                // margin: '-1rem',
                position: 'fixed'
            }}
        >
            {/* Sender Name */}
            {!sameSender && sender?.name && (
                <Typography
                    color={'#2694ab'}
                    fontWeight={'600'}
                    variant={"caption"}
                >
                    {sender.name}
                </Typography>
            )}
        </div>
    );
}

export default UserDetails;
