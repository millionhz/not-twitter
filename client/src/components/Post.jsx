import React from 'react';
import { CardHeader, CardContent, Avatar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Card from './Card';

function Post({ name, content, id }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/post/${id}`);
  }

  return (
    <Card onClick={() => handleClick()}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: 'primary.main' }}>R</Avatar>}
        title={name}
      />
      <CardContent>
        <Typography variant="body.1">{content}</Typography>
      </CardContent>
    </Card>
  );
}

export default Post;
