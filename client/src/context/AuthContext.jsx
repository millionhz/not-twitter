import { createContext, useEffect, useMemo, useState } from 'react';
import { authenticate } from '../api/backend';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    authenticate()
      .then(() => {
        setAuthenticated(true);
      })
      .catch(() => {
        setAuthenticated(false);
      });
  }, []);

  const authProviderValue = useMemo(
    () => ({
      authenticated,
      setAuthenticated,
    }),
    [authenticated, setAuthenticated]
  );

  return (
    <AuthContext.Provider value={authProviderValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
