import React, { useState, createContext, useContext, FC } from 'react';

const defaultState = {
    isUserAuthenticated: localStorage.getItem('user-auth') ? true : false,
    setIsUserAuthenticated: (isUserAuthenticated: boolean) => {}
}

export const UserAuthContext = createContext(defaultState);

export const UserAuthProvider: FC = ({ children }) => {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(defaultState.isUserAuthenticated);

    const getKeys = () => {
        if(isUserAuthenticated)
            // @ts-ignore
            return JSON.parse(localStorage.getItem('user-auth'));
    }

    return(
        <UserAuthContext.Provider value={{ isUserAuthenticated, setIsUserAuthenticated }}>
            {children}
        </UserAuthContext.Provider>
    );
};

export const useUserAuthValue = () => useContext(UserAuthContext);
