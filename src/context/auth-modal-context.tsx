import React, { useState, createContext, useContext, FC } from 'react';

const defaultState = {
    authOverlayActive: false,
    setAuthOverlayActive: (authOverlayActive: boolean) => {}
}

export const AuthModalContext = createContext(defaultState);

export const AuthModalProvider: FC = ({ children }) => {
    const [authOverlayActive, setAuthOverlayActive] = useState(defaultState.authOverlayActive);

    return(
        <AuthModalContext.Provider value={{ authOverlayActive, setAuthOverlayActive }}>
            {children}
        </AuthModalContext.Provider>
    );
};

export const useAuthModalValue = () => useContext(AuthModalContext);
