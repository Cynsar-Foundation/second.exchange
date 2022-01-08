import { relayPool } from 'nostr-tools'
import { FC, useReducer } from 'react'
import { createContext } from 'vm'

const initialRelayState = {
    pool: relayPool()
}

const RelayContext = createContext(initialRelayState)

export const RelayProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        const currentState = { ...state };
        switch (action.type) {
            default:
                return currentState
        }
    }, initialRelayState)

    return (
        <RelayContext.Provider value={{ state, dispatch }}>
            {children}
        </RelayContext.Provider>
    );
};