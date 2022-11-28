import React from 'react';
import { CardContent, Typography } from '@mui/material';
import Card from './Card';

function Comment({ content }) {
  return (
    <Card sx={{ borderTop: 0 }}>
      <CardContent>
        <Typography variant="body.1">{content}</Typography>
      </CardContent>
    </Card>
  );
}

export default Comment;
