import React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import AuthForm from './AuthForm';

function SignupPage() {
  const signUp = (email, password) => {
    console.log({
      email,
      password,
    });
  };

  return (
    <AuthForm onSubmit={signUp} title="Sign Up">
      <Typography variant="body2" color="text.secondary" align="center">
        Already have an account?{' '}
        <Link href="#" variant="body2" color="inherit">
          Sign In
        </Link>
      </Typography>
    </AuthForm>
  );
}

export default SignupPage;
