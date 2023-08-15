import React, { useEffect, PropsWithChildren } from "react";
import { useAtom } from "jotai";
import { relayPoolAtom } from "../atoms/relayPoolAtom";
import Contextualizer from "./context";
import ProvidedService from "./providedServices";
import { checkPrivateKey } from "../utils/checkPrivateKey";
import { initConnection } from "../utils/initConnection";
import { reConnect } from "../utils/reConnect";
import { initPool } from "../utils/initPool";
import { getRelays } from "../config/defaultRelays";

export interface INostrSetupService {
  initConnection(): Promise<NostrEvent[]>;
  reconnect(pool: any): any;
  initPool(): any;
}

const NostrServiceContext = Contextualizer.createContext(ProvidedService.NostrServiceContext);

const NostrSetupService: React.FunctionComponent<PropsWithChildren> = ({ children }: any) => {
  const [pool, setPool] = useAtom(relayPoolAtom);

  const initializePool = async () => {
    try {
      const { relayPool } = await import("nostr-tools");
      const tempPool = relayPool();
      const privKey = checkPrivateKey();
      if (privKey !== null) tempPool.setPrivateKey(privKey);

      const defaultRelays = getRelays();
      for (const relayUrl of defaultRelays) {
        await tempPool.addRelay(relayUrl);
      }

      setPool(tempPool);
    } catch (error) {
      console.error("Error initializing pool:", error);
    }
  };

  useEffect(() => {
    if (!pool) {
      initializePool();
    }
  }, []);

  const connectionService = {
    initConnection: () => initConnection(pool),
    reConnect,
    initPool
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
