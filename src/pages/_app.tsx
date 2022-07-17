import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";

import theme from "../chakra/theme";
import { defaultRelays } from "../config/defaultRelays";
import { NostrEvent } from "../types";

function MyApp({ Component, pageProps }: AppProps) {
  const [nostrEventsValue, setNostrEventsValue] = useState<NostrEvent[]>();
  const eventsSet = new Set();
  const [posts, setPosts] = useState();
  useEffect(() => {
    const init = async () => {
      const { relayPool } = await import("nostr-tools");
      const pool = relayPool();
      // pool.setPrivateKey(
      //   "9d8553f19267c5930162f576eb3b2652ea63a637dc576bc85871cdc44a2ebf50"
      // );
      defaultRelays.map((relayUrl: string) => pool.addRelay(relayUrl));
      pool.sub(
        {
          cb: async (event: NostrEvent) => {
            switch (event.kind) {
              case 0:
              case 1:
              case 2:
                if (eventsSet.has(event.id)) return;
                eventsSet.add(event.id);
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
    };
    init();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
