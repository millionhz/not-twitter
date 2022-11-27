import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Post({ name, content, id }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/post/${id}`);
  }

  return (
    <Card
      variant="outlined"
      onClick={() => handleClick()}
      sx={{ maxWidth: 600, borderRadius: 0, borderBottom: 0 }}
    >
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
