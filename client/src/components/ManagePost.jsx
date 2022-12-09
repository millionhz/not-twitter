import React, { useState } from 'react';
import {
  Box,
  CardContent,
  Typography,
  CardHeader,
  IconButton,
} from '@mui/material';
import { DeleteOutline, ReportOff } from '@mui/icons-material';
import Image from './Image';
import Card from './Card';
import Avatar from './Avatar';
import { unreportPost, deletePost } from '../api/backend';

function ManagePost({ userName, content, postId, imageId }) {
  const [disabled, setDisabled] = useState(false);
  console.log(disabled);

  const handleUnreport = () => {
    unreportPost(postId).then(() => {
      setDisabled(true);
    });
  };

  const handleDelete = () => {
    deletePost(postId).then(() => {
      setDisabled(true);
    });
  };

  const disabledStyles = () => ({
    minWidth: 700,
    paddingY: 1,
    opacity: disabled ? 0.4 : 1,
    pointerEvents: disabled ? 'none' : 'initial',
  });

  return (
    <Card variant="outlined" sx={disabledStyles(disabled)}>
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <CardHeader
          avatar={<Avatar name={userName} />}
          title={userName}
          sx={{ flex: 1 }}
        />
        <IconButton
          aria-label="unreport-button"
          onClick={handleUnreport}
          sx={{ width: 50, height: 50 }}
        >
          <ReportOff />
        </IconButton>
        <IconButton
          aria-label="delete-button"
          onClick={handleDelete}
          sx={{ width: 50, height: 50 }}
        >
          <DeleteOutline />
        </IconButton>
      </Box>
      <CardContent>
        <Image imageId={imageId} />
        <Typography variant="body.1">{content}</Typography>
      </CardContent>
    </Card>
  );
}

export default ManagePost;
