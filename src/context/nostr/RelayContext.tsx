import { relayPool } from 'nostr-tools'
import { FC, useReducer } from 'react'
import { createContext } from 'vm'
import { RelayAction, RelayState } from './NostrTypes'
import { pool } from './pool'


const initialRelayState = {
    pool: relayPool()
}

const RelayContext = createContext(initialRelayState)

export const RelayProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer((state: RelayState, action: RelayAction) => {
        switch (action.type) {
            case 'addRelay':
                return state.pool.addRelay(action.url, { read: true, write: true })
            case 'removeRelay':
                return state.pool.removeRelay(action.url)
            case 'subSingle':
                return state.pool.sub({ cb: action.cb, filter: action.filter })
            case 'subBulk':
                return state.pool.sub({ cb: action.cb, filter: action.filter })

            default:
                return state
        }
    }, initialRelayState)

    return (
        <RelayContext.Provider value={{ state, dispatch }}>
            {children}
        </RelayContext.Provider>
    );
};