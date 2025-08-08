

import { Avatar, IconButton, ListItem, Typography, Stack } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import React, { memo } from 'react';
import { transformImage } from '../../lib/Features';
import { red } from '@mui/material/colors';

const UserItem = ({
  styling = {}, // Default to an empty object
  user,
  handler,
  handlerIsLoading,
  isAdded = false
}) => {
  const { name, _id, avatar, latestMessage, bio } = user;

  return (
    <ListItem>
      <Stack
        direction="row"
        alignItems="center"
        spacing="1rem"
        width="100%"
        {...styling}
      >
        <Avatar src={transformImage(avatar)} alt={`${name}'s avatar`} />

        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%',
            color: 'white'
          }}
        >
          {name}
        </Typography>

        <IconButton
          size="small"
          sx={{
            bgcolor: isAdded ? 'error.main' : 'primary.dark',
            color: 'white',
            "&:hover": {
              bgcolor: isAdded ? 'error.dark' : 'primary.main'
            }
          }}
          onClick={() => handler(_id)}
          disabled={handlerIsLoading}
        >
          {isAdded ? <RemoveIcon /> : <AddIcon />}
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default memo(UserItem);
