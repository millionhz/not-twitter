import React, { useState } from 'react';
import { TextField, Box, Button } from '@mui/material';

function Compose({ title, placeholder, onSubmit, sx }) {
  const [value, setValue] = useState('');

  return (
    <Box
      sx={{ minWidth: 700, display: 'flex', ...sx }}
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
