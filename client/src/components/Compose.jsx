import React, { useState } from 'react';
import { TextField, Box } from '@mui/material';

function Compose({ placeholder, onSubmit }) {
  const [value, setValue] = useState('');

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(value);
      }}
    >
      <TextField
        fullWidth
        value={value}
        placeholder={placeholder}
        onChange={(event) => setValue(event.target.value)}
        sx={{ maxWidth: 600 }}
      />
    </Box>
  );
}

export default Compose;
