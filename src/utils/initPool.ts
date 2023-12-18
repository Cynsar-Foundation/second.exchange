import { checkSignerType } from "./checkPrivateKey";
import { logger } from "./logger";

import { NDKRelay, NDKSigner } from "@nostr-dev-kit/ndk";




export const initPool = async (relay: any, defaultService: any , signer?: NDKSigner, key?: string) => {

    // return the initialized pool or relevant data
        logger.info('Initializing the pool services', relay)
        const defaultRelays =  relay;
        if (defaultRelays == undefined){
            return
          // We need to define the NDK 
        }
        const tempPool = defaultRelays.map(
          async (relayUrl: string) => await defaultService.pool.addRelay(new NDKRelay(relayUrl))
        );
        defaultService.connect()
        return tempPool
      };