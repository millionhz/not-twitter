import React from 'react';
import { Avatar } from '@mui/material';

function Avatar_({ name, image }) {
  return (
    <Avatar sx={{ bgcolor: 'primary.main' }}>{name[0].toUpperCase()}</Avatar>
  );
}

export default Avatar_;
