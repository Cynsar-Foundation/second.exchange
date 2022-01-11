import { relayPool } from 'nostr-tools'
import { FC, useReducer } from 'react'
import { createContext } from 'vm'
import { RelayAction, RelayState } from './NostrTypes'


const initialRelayState = {
    pool: relayPool()
}

const RelayContext = createContext(initialRelayState)

export const RelayProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer((state: RelayState, action: RelayAction) => {
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