import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function LoggedInRoutes() {
  const {
    user: { isAuthenticated },
  } = useContext(AuthContext);

  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <div>Loading...</div>;
}

export default LoggedInRoutes;
