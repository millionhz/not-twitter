import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function AdminRouter() {
  const {
    user: { isAdmin },
  } = useContext(AuthContext);

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  if (isAdmin) {
    return <Outlet />;
  }

  console.log(isAdmin);

  return <div>Loading...</div>;
}

export default AdminRouter;
