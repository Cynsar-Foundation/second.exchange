import React, { useState, createContext, useContext, FC } from 'react';

const defaultState = {
    authOverlayActive: false,
    setAuthOverlayActive: (authOverlayActive: boolean) => {}
}

const AuthModalContext = createContext(defaultState);

export const AuthModalProvider: FC = ({ children }) => {
    const [authOverlayActive, setAuthOverlayActive] = useState(defaultState.authOverlayActive);

    return(
        <AuthModalContext.Provider value={{ authOverlayActive, setAuthOverlayActive }}>
            {children}
        </AuthModalContext.Provider>
    );
};

export const useAuthModalContext = () => useContext(AuthModalContext);
