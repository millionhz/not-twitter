import React, { useState } from 'react';
import { TextField, Box } from '@mui/material';

function Compose({ placeholder, onSubmit }) {
  const [value, setValue] = useState('');

  return (
    <Box
      sx={{ maxWidth: 600 }}
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
      />
    </Box>
  );
}

export default Compose;
