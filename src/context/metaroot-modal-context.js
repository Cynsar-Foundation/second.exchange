import React, { useState, createContext, useContext } from 'react';

export const MetarootModalContext = createContext();
export const MetarootModalProvider = ({ children }) => {
    const [metarootOverlayActive, setMetarootOverlayActive] = useState(false);

    return(
        <MetarootModalContext.Provider value={{ metarootOverlayActive, setMetarootOverlayActive }}>
            {children}
        </MetarootModalContext.Provider>
    );
};

export const useMetarootModalValue = () => useContext(MetarootModalContext);
