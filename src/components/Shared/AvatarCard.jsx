import { AvatarGroup, Stack, Box, Avatar } from '@mui/material'
import React from 'react'
import { transformImage } from '../../lib/Features'


// Todo Transform
const AvatarCard = ({ avatar = [], max = 4, src }) => {
    return (
        <Stack direction={'row'} spacing={0.5}>

            <AvatarGroup max={max} sx={{ position: 'relative' }}>

                <Box width={'5rem'} height={'3rem'}>
                    {avatar.map((i, index) => (
                        <Avatar
                            key={Math.random() + 100}
                            src={transformImage(i)}
                            // src={i}
                            alt={`Avatar ${index}`}
                            sx={{
                                width: '3rem',
                                height: '3rem',
                                // border: '2px solid white',
                                position: 'absolute',
                                left: {
                                    xs: `${0.5 + index}rem`,
                                    sm: `${index}rem`,
                                },

                            }}
                        />
                    ))}
                </Box>
            </AvatarGroup>

        </Stack>
    )
}

export default AvatarCard;
