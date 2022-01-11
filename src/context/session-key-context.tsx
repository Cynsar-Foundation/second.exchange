import React, { useState, createContext, useContext, FC } from "react";

const defaultSessionState = {
    sessionKey: localStorage.getItem("user-auth")
        ? localStorage.getItem("user-auth")
        : null,
    setSessionKey: (sessionKey: any) => {},
};

export const SessionKeyContext = createContext(defaultSessionState);

export const SessionKeyProvider: FC = ({ children }) => {
    const [sessionKey, setSessionKey] = useState(
        defaultSessionState.sessionKey
    );

    return (
        <SessionKeyContext.Provider value={{ sessionKey, setSessionKey }}>
            {children}
        </SessionKeyContext.Provider>
    );
};

export const useSessionKeyValue = () => useContext(SessionKeyContext);
