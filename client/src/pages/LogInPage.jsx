import React, { useContext, useState } from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { setToken } from '../utilities/localStorage';
import { login } from '../api/backend';
import AuthContext from '../context/AuthContext';

function LoginPage() {
  const [isError, setError] = useState(false);
  const navigate = useNavigate();
  const { setAuthenticated } = useContext(AuthContext);

  const signIn = (email, password) => {
    login(email, password)
      .then((res) => {
        const {
          data: { token },
        } = res;
        setToken(token);
        setAuthenticated(true);
        navigate('/', { replace: true });
      })
      .catch(() => {
        setError(true);
      });
  };

  return (
    <AuthForm onSubmit={signIn} title="Log In" error={isError}>
      <Typography variant="body2" color="text.secondary" align="center">
        Don't have an account?{' '}
        <Link href="/signup" variant="body2" color="inherit">
          Sign Up
        </Link>
      </Typography>
    </AuthForm>
  );
}

export default LoginPage;
