import React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import AuthForm from './AuthForm';

function LoginPage() {
  const signIn = (email, password) => {
    console.log({
      email,
      password,
    });
  };

  return (
    <AuthForm onSubmit={signIn} title="Sign In">
      <Typography variant="body2" color="text.secondary" align="center">
        Don't have an account?{' '}
        <Link href="#" variant="body2" color="inherit">
          Sign Up
        </Link>
      </Typography>
    </AuthForm>
  );
}

export default LoginPage;
