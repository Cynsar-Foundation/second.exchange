import { createContext, FC, PropsWithChildren } from "react";
import { getRelays } from "../config/defaultRelays";
import { useAtom, useSetAtom } from "jotai";
import { relayPoolAtom } from "../atoms/relayPoolAtom";
import { useContext } from "react";
import Contextualizer from "./context";
import ProvidedService from "./providedServices";
import { useFormControlStyles } from "@chakra-ui/react";
import NostrOpsService from "./nostrOps";
import { logger } from "../utils/logger";

export interface INostrSetupService {
  initConnection(): Promise<NostrEvent[]>;
  reconnect(pool: any): any
  initPool(): any
}

const NostrServiceContext = Contextualizer.createContext(ProvidedService.NostrServiceContext)

const NostrSetupService: React.FunctionComponent<PropsWithChildren> = ({ children }: any) => {
  const [pool, setPool] = useAtom(relayPoolAtom);
  console.log("this",pool)
  const connectionService = {
    async initConnection(): Promise<NostrEvent[]> {
      const fetchedEvents: NostrEvent[] = [];
      let userList = [];
      if (typeof window !== undefined) {
        const privKey =
          localStorage.getItem("keys") !== null
            ? JSON.parse(localStorage.getItem("keys")!).privateKey
            : null;
        if (privKey !== null) pool.setPrivateKey(privKey);
        const userIdList =
          localStorage.getItem("follow-list") !== null
            ? JSON.parse(JSON.stringify(localStorage.getItem("follow-list")))
            : [];
        // console.log(JSON.parse(userIdList));
        userList = JSON.parse(userIdList);
        // userList =
        //   typeof userIdList === "object" ? JSON.parse(userIdList) : userList;
      }
      // Check if local or dev mode one then switch to local
      const relays = await getRelays();
      relays.map(async (relayUrl: string) => await pool.addRelay(relayUrl));

      await pool.sub(
        {
          cb: async (event: NostrEvent) => {
            switch (event.kind) {
              case 0:
              case 1:
              case 2:
                fetchedEvents.push(event);
                return;
            }
          },
          filter: [
            {
              authors: userList,
              kinds: [0, 1, 3],
            },
          ],
        },
        "profile-browser"
      );
      return fetchedEvents;
    },
    reconnect: async (pool: any) => {
        if (typeof window !== undefined) {
          const privKey =
            localStorage.getItem("keys") !== null
              ? JSON.parse(localStorage.getItem("keys")!).privateKey
              : null;
          if (privKey !== null) pool.setPrivateKey(privKey);
        }
        const relays = await getRelays();
        relays.map(async (relayUrl: string) => await pool.addRelay(relayUrl));
        return pool;
      },

      initPool:async () => {
        logger.info('Initing the pool services')
        const { relayPool } = await import("nostr-tools");
        const tempPool = relayPool();
        console.log(tempPool)
        if (typeof window !== undefined) {
          const privKey =
            localStorage.getItem("keys") !== null
              ? JSON.parse(localStorage.getItem("keys")!).privateKey
              : null;
          if (privKey !== null) tempPool.setPrivateKey(privKey);
        }
        const defaultRelays = await getRelays();
        defaultRelays.map(
          async (relayUrl: string) => await tempPool.addRelay(relayUrl)
        );
        setPool(tempPool);
        console.log(pool);
      }
  };

  
  
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