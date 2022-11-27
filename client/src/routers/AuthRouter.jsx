import React from 'react';
import useAuth from '../hooks/useAuth';

function AuthRouter({ onValid, onInvalid }) {
  const isValid = useAuth();

  if (isValid === false) {
    return onInvalid;
  }

  if (isValid) {
    return onValid;
  }

  return <div>Loading...</div>;
}

export default AuthRouter;
