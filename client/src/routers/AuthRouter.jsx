import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../api/backend';

function AuthRouter({ onValid, onInValid }) {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    isAuthenticated()
      .then(() => {
        setIsValid(true);
      })
      .catch(() => {
        setIsValid(false);
      });
  }, []);

  if (isValid === false) {
    return onInValid;
  }

  if (isValid) {
    return onValid;
  }

  return <div>Loading...</div>;
}

export default AuthRouter;
