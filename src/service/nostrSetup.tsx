// I've grouped the imports to make it easier to discern which modules they come from
import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { relayPoolAtom } from "../atoms/relayPoolAtom";
import Contextualizer from "./context";
import ProvidedService from "./providedServices";
import NDK, { NDKNip07Signer, NDKPrivateKeySigner } from "@nostr-dev-kit/ndk";
import { getRelays, initPool, checkPrivateKey, generateKey , initConnection } from "../utils";
import { logger } from "./../utils/logger";
import { ndkAtom } from "../atoms/ndkAtom";
import { checkSignerType } from "../utils/checkPrivateKey";

// In this setup we should call the storage also where the user data is stored like what did the key follow, 
// probably structured data somewhere without a fuss like which is simple enough to replicate , so 
// Defined the typescript interface for better understanding of what functions are to be implemented within the INostrSetupService interface
export interface INostrSetupService {
  initConnection(): any;
  reConnect(pool: any): any;
  initPool(): any;
  getNDK(): NDK;
  generateKey(signerType: 'privateKey' | 'nip07'): any;
  postKeyGenerationInit(signerType: any, ndk: NDK): Promise<void>;
  isNDKInitialized(): boolean;
  checkLocalStorage(): boolean;
  reInit():boolean
}

const NostrServiceContext = Contextualizer.createContext(ProvidedService.NostrServiceContext);

const NostrSetupService: React.FC = ({ children }: any) => {

// State and atom have been defined at the top for better visibility
  const [pool, setPool] = useAtom(relayPoolAtom);
  const [ndk, setNdk] = useAtom(ndkAtom);

  // Service functions have been grouped together for better organization
  const serviceFunctions = {
    isNDKInitialized: () => ndk !== null,
    checkLocalStorage: () => {
      const keyExists = Boolean(localStorage.getItem("keys"))
      if (keyExists) logger.info('Keys Found')
      // now check for pubKeys 
      const pubKeysExists = Boolean(localStorage.getItem("pubKey"))
      if (pubKeysExists) logger.info('Pub Keys found')
      return keyExists;
    },
    postKeyGenerationInit: async (signerType: any, ndk: NDK) => {
      const privKey = checkPrivateKey(signerType, ndk);
      if (!privKey) {
        logger.info('Private Key Not Found, waiting for key generation');
        return;
      }
      setNdk(ndk)
      setPool(await initPool(getRelays(), ndk))
    },
    getNDK: () => ndk,
    generateKey: async (signerType: any, noReCreate: boolean) => {
      const key = await generateKey(signerType, noReCreate);
      const newNdk = new NDK({ explicitRelayUrls: getRelays(), signer: key })
      setNdk(newNdk);
      await serviceFunctions.postKeyGenerationInit(signerType, newNdk);
      return key;
    },
    initConnection: () => initConnection(pool, ndk),
    initPool,
    reInit: () => {
      if (!ndk) {
        // Determine the type of key present
        const signerType = checkSignerType(); // Implement this function to determine the key type
        const key = signerType === 'privateKey' ? localStorage.getItem('keys') : null
        if (key) {
          // Initialize NDK with the existing key
          const newNdk = new NDK({ 
            explicitRelayUrls: getRelays(), 
            signer: signerType === 'privateKey' ? new NDKPrivateKeySigner(key as string): new NDKNip07Signer()
          })
          setNdk(newNdk);
          newNdk.connect()
          return true;
        }
        return false;
      }
      return true;
    },
    
  };
  useEffect(() => {
    serviceFunctions.reInit();
  }, []); 

  return (
    <NostrServiceContext.Provider value={serviceFunctions}>
      {children}
    </NostrServiceContext.Provider>
  );
};

export const useNostrSetupService = () =>
  Contextualizer.use<INostrSetupService>(ProvidedService.NostrServiceContext);

export default NostrSetupService;
