import React from 'react';
import { CardContent, Typography } from '@mui/material';
import Card from './Card';

function Comment({ content, name, sx }) {
  return (
    <Card sx={sx}>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body.1">{content}</Typography>
        <Typography
          color="text.secondary"
          variant="body.1"
          textAlign="right"
          paddingLeft={1}
        >
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Comment;
