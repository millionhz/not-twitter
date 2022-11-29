import React from 'react';
import { CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import PostHeader from './PostHeader';

function Post({ name, content, id, sx }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/post/${id}`);
  }

  return (
    <Card onClick={() => handleClick()} sx={sx}>
      <PostHeader name={name} />
      <CardContent>
        <Typography variant="body.1">{content}</Typography>
      </CardContent>
    </Card>
  );
}

export default Post;
