import { getRelays } from "../config/defaultRelays";
import { getLocalData } from "./getLocalData";
import { initPool } from "./initPool";

const { privKey, userList } = getLocalData();

export const initConnection = async (pool:any): Promise<NostrEvent[]> => {
  if (pool == undefined){
    // no pool meaning check for pool
    initPool()
  } else {
     // ... implementation ...
    // return the fetchedEvents or relevant data
    const fetchedEvents: NostrEvent[] = [];
      let userList: any[] = [];
        if (privKey) {
            pool.setPrivateKey(privKey);
        }
      // Check if local or dev mode one then switch to local
      const relays = getRelays();
      relays.map(
        async (relayUrl: string) => await pool.addRelay(relayUrl)
        );

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
  }
};
