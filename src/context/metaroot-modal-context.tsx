import React, { useState, createContext, useContext, FC } from 'react';

const defaultState = {
    metarootOverlayActive: false,
    setMetarootOverlayActive: (metarootOverlayActive: boolean) => {}
}

const MetarootModalContext = createContext(defaultState);

export const MetarootModalProvider: FC = ({ children }) => {
    const [metarootOverlayActive, setMetarootOverlayActive] = useState(defaultState.metarootOverlayActive);

    return(
        <MetarootModalContext.Provider value={{ metarootOverlayActive, setMetarootOverlayActive }}>
            {children}
        </MetarootModalContext.Provider>
    );
};

export const useMetarootModalContext = () => useContext(MetarootModalContext);
