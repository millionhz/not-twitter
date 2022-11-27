import { useState, useEffect } from 'react';
import { authenticate } from '../api/backend';

function useAuth() {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    authenticate()
      .then(() => {
        setIsValid(true);
      })
      .catch(() => {
        setIsValid(false);
      });
  });

  return isValid;
}

export default useAuth;
