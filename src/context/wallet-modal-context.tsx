import React, { useState, createContext, useContext, FC } from 'react';

const defaultState = {
    walletOverlayActive: false,
    setWalletOverlayActive: (walletOverlayActive: boolean) => {}
}

export const WalletModalContext = createContext(defaultState);

export const WalletModalProvider: FC = ({ children }) => {
    const [walletOverlayActive, setWalletOverlayActive] = useState(defaultState.walletOverlayActive);

    return(
        <WalletModalContext.Provider value={{ walletOverlayActive, setWalletOverlayActive }}>
            {children}
        </WalletModalContext.Provider>
    );
};

export const useWalletModalValue = () => useContext(WalletModalContext);
