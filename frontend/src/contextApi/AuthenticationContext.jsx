import React, { createContext, useState, useEffect } from 'react';

export const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [loginUserName, setLoginUserName] = useState(() => localStorage.getItem("name"));

  // Sync context to localStorage

  return (
    <AuthenticationContext.Provider
      value={{ loginUserName, setLoginUserName }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
