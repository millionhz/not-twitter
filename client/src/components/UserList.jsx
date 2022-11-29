import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CardHeader } from '@mui/material';
import Card from './Card';
import Avatar from './Avatar';

function User({ name, id, sx }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/user/${id}`);
  };

  return (
    <Card sx={sx} onClick={handleClick}>
      <CardHeader avatar={<Avatar name={name} />} title={name} />
    </Card>
  );
}

export default User;
