import { Navigate, Outlet } from 'react-router-dom';

import React from 'react';
import { getToken } from '../../utilities/localStorage';

function ProtectedRoutes() {
  const isAuthenticated = getToken();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;
