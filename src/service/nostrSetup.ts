import { defaultRelays } from "../config/defaultRelays";
import { NostrEvent } from "../types";

export const initConnection = async (pool: any) => {
  const fetchedEvents: NostrEvent[] = [];
  if (typeof window !== undefined) {
    const privKey =
      localStorage.getItem("keys") !== null
        ? JSON.parse(localStorage.getItem("keys")!).privateKey
        : null;
    if (privKey !== null) pool.setPrivateKey(privKey);
  }
  defaultRelays.map(async (relayUrl: string) => await pool.addRelay(relayUrl));
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
          authors: [
            "dfb0b888e9b322e90c3ee3b06fe5d3e79bc2f3bdf1ffe31002919512d90129a4",
          ],
          kinds: [0, 1, 3],
        },
      ],
    },
    "profile-browser"
  );
  return fetchedEvents;
};

export const reconnect = async (pool: any) => {
  if (typeof window !== undefined) {
    const privKey =
      localStorage.getItem("keys") !== null
        ? JSON.parse(localStorage.getItem("keys")!).privateKey
        : null;
    if (privKey !== null) pool.setPrivateKey(privKey);
  }
  defaultRelays.map(async (relayUrl: string) => await pool.addRelay(relayUrl));
  return pool;
};
