// src/routes/PrivateRoute.js
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthenticationContext } from '../contextApi/AuthenticationContext';

export const PrivateRoute = ({ children }) => {
  const { loginState } = useContext(AuthenticationContext);

  return loginState ? children : <Navigate to="/login" />;
};

