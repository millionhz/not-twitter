import React from 'react';
import { CardHeader, Avatar } from '@mui/material';

function PostHeader({ name, image }) {
  return (
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: 'primary.main' }}>
          {name[0].toUpperCase()}
        </Avatar>
      }
      title={name}
    />
  );
}

export default PostHeader;
