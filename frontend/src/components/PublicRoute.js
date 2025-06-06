// src/routes/PublicRoute.js
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthenticationContext } from '../contextApi/AuthenticationContext';

export const PublicRoute = ({ children }) => {
  const { loginState } = useContext(AuthenticationContext);
if(loginState){


  return loginState ? <Navigate to="/home" /> : children;
}
};


