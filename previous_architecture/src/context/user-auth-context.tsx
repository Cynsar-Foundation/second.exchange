import React, { useState, createContext, useContext, FC } from 'react';

const defaultState = {
    isUserAuthenticated: localStorage.getItem('user-auth') ? true : false,
    setIsUserAuthenticated: (isUserAuthenticated: boolean) => {}
}

const UserAuthContext = createContext(defaultState);

export const UserAuthProvider: FC = ({ children }) => {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(defaultState.isUserAuthenticated);

    return(
        <UserAuthContext.Provider value={{ isUserAuthenticated, setIsUserAuthenticated }}>
            {children}
        </UserAuthContext.Provider>
    );
};

export const useUserAuthContext = () => useContext(UserAuthContext);
