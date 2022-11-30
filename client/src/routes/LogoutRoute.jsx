import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { clearToken } from '../utilities/localStorage';

function LogoutRoute() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    clearToken();
    setUser({ isAuthenticated: false });
    navigate('/');
  }, [setUser, navigate]);

  return <div>Loading...</div>;
}

export default LogoutRoute;
