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
            "33d27697907362b8f82a69d251011535591faca9cca172de0c29880316e027dc",
          ],
          kinds: [0, 1, 3],
        },
      ],
    },
    "profile-browser"
  );
  return fetchedEvents;
};
