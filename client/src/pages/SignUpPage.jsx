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

function SignupPage() {
  const title = 'Sign Up';

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);

  const navigate = useNavigate();

  const handleSignup = () => {
    signup(name, email, password)
      .then(() => {
        navigate('/login');
      })
      .catch(() => {
        setEmailError(true);
      });
  };

  const onChangeName = (e) => {
    const name_ = e.target.value;
    setNameError(name_.length < 1);
    setName(name_);
  };

  const onChangeEmail = (e) => {
    setEmailError(!e.target.checkValidity());
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    const password_ = e.target.value;
    setPassword(password_);
    setPasswordError(password_.length < 6);
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
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignup();
          }}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            autoFocus
            margin="normal"
            required
            fullWidth
            name="name"
            label="Name"
            type="text"
            id="name"
            error={nameError}
            value={name}
            onChange={onChangeName}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            error={emailError}
            onChange={onChangeEmail}
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
            error={passwordError}
            value={password}
            onChange={onChangePassword}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 3 }}
          >
            {title}
          </Button>
          <Typography variant="body2" color="text.secondary" align="center">
            Already have an account?{' '}
            <Link href="/login" variant="body2" color="inherit">
              Log In
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default SignupPage;
