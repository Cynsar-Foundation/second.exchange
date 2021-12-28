import React, { useState, createContext, useContext } from 'react';

export const UserAuthContext = createContext();
export const UserAuthProvider = ({ children }) => {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

    return(
        <UserAuthContext.Provider value={{ isUserAuthenticated, setIsUserAuthenticated }}>
            {children}
        </UserAuthContext.Provider>
    );
};

export const useUserAuthValue = () => useContext(UserAuthContext);
