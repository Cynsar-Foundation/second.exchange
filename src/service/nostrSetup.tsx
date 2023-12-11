import React, { useEffect, PropsWithChildren, useState } from "react";
import { useAtom } from "jotai";
import { relayPoolAtom } from "../atoms/relayPoolAtom";
import Contextualizer from "./context";
import ProvidedService from "./providedServices";
import { checkPrivateKey } from "../utils/checkPrivateKey";
import { initConnection } from "../utils/initConnection";
import { reConnect } from "../utils/reConnect";
import { initPool } from "../utils/initPool";
import { getRelays } from "../config/defaultRelays";
import NDK, {NDKNip07Signer, NDKPrivateKeySigner} from "@nostr-dev-kit/ndk";
import { logger } from "./../utils/logger";
import { generateKey } from "../utils/generateKey";




export interface INostrSetupService {
  initConnection(): any;
  reconnect(pool: any): any;
  initPool(): any;
  getNDK(): NDK;
  generateKey(signerType: 'privateKey' | 'nip07'): any
  postKeyGenerationInit(): Promise<void>; // New method
  isNDKInitialized(): boolean
  checkLocalStorage(): boolean
}

const NostrServiceContext = Contextualizer.createContext(ProvidedService.NostrServiceContext);

const NostrSetupService: React.FunctionComponent<PropsWithChildren> = ({ children }: any) => {
  const [pool, setPool] = useAtom(relayPoolAtom);
  const [ndk, setNdk] = useState<NDK | null>(null); 

  const isNDKInitialized = () => {
    return ndk !== null; // Assuming ndk is the state variable for NDK instance

  };

  const checkLocalStorage = () => {
    let key = localStorage.getItem("keys")
    if (key) {
      logger.info('Keys Found')
      // maybe init with noRecreate
      connectionService.generateKey('privateKey', true)
      return true
    } else {
      return false
    }
  }

  const postKeyGenerationInit = async (signerType: any, ndk: NDK) => {
    try {
      const privKey = checkPrivateKey(signerType, ndk);
      if (!privKey) {
        logger.info('Private Key Not Found, waiting for key generation');
        return;
      }

      const defaultRelays = getRelays();
      const tempPool = await initPool(defaultRelays, ndk);
      setPool(tempPool);
    } catch (error) {
      console.error("Error in post-key-generation initialization:", error);
    }
  };

  const connectionService = {
    initConnection: () => initConnection(pool, ndk),
    reConnect,
    initPool,
    getNDK : () => ndk,
    generateKey: async (singerType: any, noRecreate: boolean) => {
      const key = await generateKey(singerType, noRecreate);
      const ndkT = new NDK({ explicitRelayUrls: getRelays(), signer: key })
      setNdk(ndkT);
      await postKeyGenerationInit(singerType, ndkT);
      return key;
    },
    postKeyGenerationInit,
    isNDKInitialized,
    checkLocalStorage
  };

  return (
    <NostrServiceContext.Provider value={connectionService}>
      {children}
    </NostrServiceContext.Provider>
  );
};

export const useNostrSetupService = () =>
  Contextualizer.use<INostrSetupService>(ProvidedService.NostrServiceContext);

export default NostrSetupService;
