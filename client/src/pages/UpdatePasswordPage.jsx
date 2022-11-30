import React, { useState } from 'react';
import {
  Typography,
  Container,
  Box,
  Avatar,
  TextField,
  Button,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { updatePassword } from '../api/backend';

function AuthForm({ title, onSubmit, error, children }) {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState(''); // for updating the password

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(password, newPassword);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 2, bgcolor: 'primary.main' }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Old Password"
            type="password"
            name="password"
            autoComplete="current-password"
            error={error}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="new-password"
            label="New Password"
            type="password"
            id="new-password"
            autoComplete="new-password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 3 }}
          >
            {title}
          </Button>
          {children}
        </Box>
      </Box>
    </Container>
  );
}

function UpdatePassword() {
  const [isError, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (password, newPassword) => {
    updatePassword(password, newPassword)
      .then(() => {
        navigate('/');
      })
      .catch(() => {
        setError(true);
      });
  };

  return (
    <AuthForm onSubmit={handleSubmit} title="Update Password" error={isError} />
  );
}

export default UpdatePassword;
