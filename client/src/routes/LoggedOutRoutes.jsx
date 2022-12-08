import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function LoggedOutRoutes() {
  const {
    user: { isAuthenticated },
  } = useContext(AuthContext);

  if (isAuthenticated === false) {
    return <Outlet />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <div>Loading...</div>;
}

export default LoggedOutRoutes;
