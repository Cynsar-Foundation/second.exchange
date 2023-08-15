import { getRelays } from "../config/defaultRelays";

export const reConnect = async (pool: any) => {
    // ... implementation ...
    // return the updated pool or relevant data
        if (typeof window !== undefined) {
          const privKey =
            localStorage.getItem("keys") !== null
              ? JSON.parse(localStorage.getItem("keys")!).privateKey
              : null;
          if (privKey !== null) pool.setPrivateKey(privKey);
        }
        const relays = getRelays();
        relays.map(async (relayUrl: string) => await pool.addRelay(relayUrl));
        return pool;
      
};
