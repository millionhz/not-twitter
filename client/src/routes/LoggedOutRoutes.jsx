import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function LoggedOutRoutes() {
  const { authenticated } = useContext(AuthContext);

  if (authenticated === false) {
    return <Outlet />;
  }

  if (authenticated) {
    return <Navigate to="/" />;
  }

  return <div>Loading...</div>;
}

export default LoggedOutRoutes;
