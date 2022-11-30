import { createContext, useEffect, useMemo, useState } from 'react';
import { authenticate } from '../api/backend';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    isAuthenticated: null,
  });

  useEffect(() => {
    authenticate()
      .then((data) => {
        setUser({ ...data.data, isAuthenticated: true });
      })
      .catch(() => {
        setUser((prev) => ({ ...prev, isAuthenticated: false }));
      });
  }, []);

  const authProviderValue = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user, setUser]
  );

  return (
    <AuthContext.Provider value={authProviderValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
