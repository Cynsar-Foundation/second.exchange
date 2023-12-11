import { logger } from "./logger";

import { NDKRelay } from "@nostr-dev-kit/ndk";




export const initPool = async (relay: any, defaultService: any ) => {

    // return the initialized pool or relevant data
        logger.info('Initing the pool services')
        const defaultRelays =  relay;
        if (defaultRelays == undefined){
          return
        }
        const tempPool = defaultRelays.map(
          async (relayUrl: string) => await defaultService.pool.addRelay(new NDKRelay(relayUrl))
        );
        defaultService.connect()
        return tempPool
      };