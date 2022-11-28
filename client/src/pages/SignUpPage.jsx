import React, { useState } from 'react';
import {
  Link,
  Typography,
  Container,
  Box,
  Avatar,
  TextField,
  Button,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/backend';

function AuthForm({ title, onSubmit, error, children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(name, email, password);
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
            name="name"
            label="Name"
            type="text"
            id="name"
            error={error}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            error={error}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={error}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
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

function SignupPage() {
  const [isError, setError] = useState(false);
  const navigate = useNavigate();

  const signUp = (name, email, password) => {
    signup(name, email, password)
      .then(() => {
        navigate('/login');
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
    <AuthForm onSubmit={signUp} title="Sign Up" error={isError}>
      <Typography variant="body2" color="text.secondary" align="center">
        Already have an account?{' '}
        <Link href="/login" variant="body2" color="inherit">
          Log In
        </Link>
      </Typography>
    </AuthForm>
  );
}

export default SignupPage;
