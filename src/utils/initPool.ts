import { getRelays } from "../config/defaultRelays";
import { logger } from "./logger";

import { getLocalData } from './getLocalData';

const {privKey} =  getLocalData()

export const initPool = async () => {
    // ... implementation ...
    // return the initialized pool or relevant data
        logger.info('Initing the pool services')
        const { relayPool } = await import("nostr-tools");
        const tempPool = relayPool();
        if(privKey){
            tempPool.setPrivateKey(privKey)
        }
        const defaultRelays =  getRelays();
        defaultRelays.map(
          async (relayUrl: string) => await tempPool.addRelay(relayUrl)
        );
        return tempPool
      };