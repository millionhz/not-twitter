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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [new_password, setNewPassword] = useState(''); // for updating the password

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(email, password, new_password);
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
            autoFocus
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            type="text"
            id="emaill"
            error={error}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
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
            type="new-password"
            id="new-password"
            autoComplete="new-password"
            error={error}
            value={new_password}
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

function UpdatePassword () {
  const [isError, setError] = useState(false);
  const navigate = useNavigate();

  const update = (email, password, new_password) => {
    updatePassword(email, password, new_password)
      .then(() => {
        navigate('/updatePassword');
      })
      .catch((err) => {
        const {
          response: {
            data: { message },
          },
        } = err;
        console.log(message);
        setError(true);
      });
  };

  return (
    <AuthForm onSubmit={update} title="Update Password" error={isError}>
      <Typography variant="body2" color="text.secondary" align="center">
      </Typography>
    </AuthForm>
  );
}

export default UpdatePassword;
