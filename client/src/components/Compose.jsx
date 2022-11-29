import React, { useState } from 'react';
import { TextField, Box, Button } from '@mui/material';

function Compose({ title, placeholder, onSubmit }) {
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
        autoComplete="off"
        fullWidth
        value={value}
        placeholder={placeholder}
        onChange={(event) => setValue(event.target.value)}
      />
      <Button type="submit" variant="contained" sx={{ paddingX: 4 }}>
        {title}
      </Button>
    </Box>
  );
}

export default Compose;
