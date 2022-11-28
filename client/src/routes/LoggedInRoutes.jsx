import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function LoggedInRoutes() {
  const { authenticated } = useContext(AuthContext);

  if (authenticated === false) {
    return <Navigate to="/login" />;
  }

  if (authenticated) {
    return <Outlet />;
  }

  return <div>Loading...</div>;
}

export default LoggedInRoutes;
