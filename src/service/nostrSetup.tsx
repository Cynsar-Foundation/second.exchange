import { createContext, FC, PropsWithChildren, useEffect } from "react";
import { getRelays } from "../config/defaultRelays";
import { useAtom, useSetAtom } from "jotai";
import { relayPoolAtom } from "../atoms/relayPoolAtom";
import { useContext } from "react";
import Contextualizer from "./context";
import ProvidedService from "./providedServices";
import { useFormControlStyles } from "@chakra-ui/react";
import NostrOpsService from "./nostrOps";
import { logger } from "../utils/logger";
import { checkPrivateKey } from "../utils/checkPrivateKey";
import { initConnection } from "../utils/initConnection";
import { reConnect } from "../utils/reConnect";
import { initPool } from "../utils/initPool";
import { useRouter } from "next/router";

export interface INostrSetupService {
  initConnection(): Promise<NostrEvent[]>;
  reconnect(pool: any): any
  initPool(): any
}

const NostrServiceContext = Contextualizer.createContext(ProvidedService.NostrServiceContext)

const NostrSetupService: React.FunctionComponent<PropsWithChildren> = ({ children }: any) => {
  const [pool, setPool] = useAtom(relayPoolAtom);

  useEffect(() => {

    const initializePool = async () => {
        const { relayPool } = await import("nostr-tools");
        const tempPool = relayPool();
        const privKey = checkPrivateKey();  // Use the utility function
        if (privKey !== null) tempPool.setPrivateKey(privKey);

        const defaultRelays = getRelays();
        for (const relayUrl of defaultRelays) {
            await tempPool.addRelay(relayUrl);
        }

        setPool(tempPool);
    };

    if (!pool) {
        initializePool();
    }
}, []);

useEffect(() => {
  // This will run every time `pool` changes.
  console.log(pool);
}, [pool]);

  const connectionService = {
      initConnection: initConnection(pool),
      reConnect,
      initPool
    }
    
  
  return (
    <>
      <NostrServiceContext.Provider
        value={connectionService}
      >
        {children}
      </NostrServiceContext.Provider>
    </>
  );
};

export const useNostrSetupService = () =>
    Contextualizer.use<INostrSetupService>(ProvidedService.NostrServiceContext)


export default NostrSetupService