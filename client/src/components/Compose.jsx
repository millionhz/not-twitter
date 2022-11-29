import React, { useState } from 'react';
import { TextField, Box, Button } from '@mui/material';

function Compose({ placeholder, onSubmit }) {
  const [value, setValue] = useState('');

  return (
    <Box
      sx={{ maxWidth: 600, display: 'flex' }}
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
      <Button type="submit" variant="contained">
        Post
      </Button>
    </Box>
  );
}

export default Compose;
