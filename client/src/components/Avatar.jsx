import React from 'react';
import { Avatar } from '@mui/material';

function Avatar_({ name, image, sx }) {
  return (
    <Avatar sx={{ ...sx, bgcolor: 'primary.main' }}>
      {name ? name[0].toUpperCase() : ''}
    </Avatar>
  );
}

export default Avatar_;
