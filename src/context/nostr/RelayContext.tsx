import { relayPool } from 'nostr-tools'
import { FC, useContext, useReducer, createContext } from 'react'
import { RelayAction, RelayState } from './NostrTypes'

const initialRelayState = {
    pool: relayPool(),
}

export const RelayContext = createContext<{
    state: RelayState;
    dispatch: React.Dispatch<RelayAction>;
}>({
    state: initialRelayState,
    dispatch: () => null,
})

const mainReducer = (state: RelayState, action: RelayAction) => {
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
}

export const RelayProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(mainReducer, initialRelayState);

    return (
        <RelayContext.Provider value={{ state, dispatch }}>
            {children}
        </RelayContext.Provider>
    );
};

export const useRelayContext = () => useContext(RelayContext);
