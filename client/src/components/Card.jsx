import React from 'react';
import { Card } from '@mui/material';

function Card_({ sx, onClick, children }) {
  return (
    <Card
      variant="outlined"
      sx={{ ...sx, width: 700, borderRadius: 0 }}
      onClick={onClick}
    >
      {children}
    </Card>
  );
}

export default Card_;
