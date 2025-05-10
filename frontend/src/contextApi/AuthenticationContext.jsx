import React, { createContext, useState, useEffect } from 'react';

export const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [loginState, setLoginState] = useState(false);
  const [loginUserName, setLoginUserName] = useState(() => localStorage.getItem("name") || "user");

  // Sync context to localStorage
  useEffect(() => {
    if (loginUserName) {
      localStorage.setItem("name", loginUserName);
    } else {
      localStorage.removeItem("name");
    }
  }, [loginUserName]);

  return (
    <AuthenticationContext.Provider
      value={{ loginState, setLoginState, loginUserName, setLoginUserName }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
