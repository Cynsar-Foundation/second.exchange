import { useSetAtom } from "jotai";
import { homeFeed } from "../atoms/homeFeedAtom";
import { defaultRelays } from "../config/defaultRelays";
import { NostrEvent } from "../types";

export const initConnection = async () => {
  const { relayPool } = await import("nostr-tools");
  const fetchedEvents: NostrEvent[] = [];
  const pool = relayPool();
  if (typeof window !== undefined) {
    const privKey =
      localStorage.getItem("keys") !== null
        ? JSON.parse(localStorage.getItem("keys")!).privateKey
        : null;
    if (privKey !== null) pool.setPrivateKey(privKey);
  }
  defaultRelays.map((relayUrl: string) => pool.addRelay(relayUrl));
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
            "d27f3a85ed00f0faa0e4b03386fffd283ff3f8c9089f4ec4a13338a9d7844f54",
          ],
          kinds: [0, 1, 3],
        },
      ],
    },
    "profile-browser"
  );
  console.log(fetchedEvents.length);
  return fetchedEvents;
};
