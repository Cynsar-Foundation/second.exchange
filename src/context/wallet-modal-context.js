import React, { useState, createContext, useContext } from 'react';

export const WalletModalContext = createContext();
export const WalletModalProvider = ({ children }) => {
    const [walletOverlayActive, setWalletOverlayActive] = useState(false);

    return(
        <WalletModalContext.Provider value={{ walletOverlayActive, setWalletOverlayActive }}>
            {children}
        </WalletModalContext.Provider>
    );
};

export const useWalletModalValue = () => useContext(WalletModalContext);
