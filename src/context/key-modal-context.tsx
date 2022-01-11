import React, { useState, createContext, useContext, FC } from 'react';

const defaultState = {
    keyOverlayActive: false,
    setKeyOverlayActive: (walletOverlayActive: boolean) => {}
}

const KeyModalContext = createContext(defaultState);

export const KeyModalProvider: FC = ({ children }) => {
    const [keyOverlayActive, setKeyOverlayActive] = useState(defaultState.keyOverlayActive);

    return(
        <KeyModalContext.Provider value={{ keyOverlayActive, setKeyOverlayActive }}>
            {children}
        </KeyModalContext.Provider>
    );
};

export const useKeyModalContext = () => useContext(KeyModalContext);
