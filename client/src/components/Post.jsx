import React from 'react';
import { CardContent, Typography, CardHeader } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import Avatar from './Avatar';

function Post({ name, content, id, sx, image }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/post/${id}`);
  }
  if (image) {
    console.log(image.split('\\')[1]);
  }
  return (
    <Card onClick={() => handleClick()} sx={sx}>
      <CardHeader avatar={<Avatar name={name} />} title={name} />
      <CardContent>
        {image && <img src={image.split(`\\`)[1]} alt="post" height="300" />}
        <Typography variant="body.1">{content}</Typography>
      </CardContent>
    </Card>
  );
}

export default Post;
