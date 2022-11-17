import React from 'react';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import AuthForm from './AuthForm';
import { signup } from '../../api/backend';

function SignupPage() {
  const [error, setError] = React.useState(false);
  const navigate = useNavigate();

  const signUp = (email, password) => {
    signup(email, password)
      .then(() => {
        // server returns status 200
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
    <AuthForm onSubmit={signUp} title="Sign Up" error={error}>
      <Typography variant="body2" color="text.secondary" align="center">
        Already have an account?{' '}
        <Link href="/login" variant="body2" color="inherit">
          Sign In
        </Link>
      </Typography>
    </AuthForm>
  );
}

export default SignupPage;
