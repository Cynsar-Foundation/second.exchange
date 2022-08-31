import { defaultRelays } from "../config/defaultRelays";

export const initConnection = async (pool: any) => {
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
    userList = JSON.parse(userIdList);
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
          authors: userList,
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
