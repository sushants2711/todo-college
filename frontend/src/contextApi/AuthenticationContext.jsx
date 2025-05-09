import React, { createContext, useState } from 'react'


export const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
    const [loginState, setLoginState] = useState(false);
    const [loginUserName, setLoginUserName] = useState("");

    return <AuthenticationContext.Provider value={{ loginState, setLoginState, loginUserName, setLoginUserName }} >
        {children}
    </AuthenticationContext.Provider>
}
