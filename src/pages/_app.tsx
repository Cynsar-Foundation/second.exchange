import { ChakraProvider } from "@chakra-ui/react";
import { useSetAtom, useAtom } from "jotai";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";

import { authAtom } from "../atoms/authStateAtom";
import { homeFeed } from "../atoms/homeFeedAtom";
import theme from "../chakra/theme";
import MainLayout from "../components/Layouts/MainLayout";
import { initConnection } from "../service/nostrSetup";

import "../global.scss";
import { defaultRelays } from "../config/defaultRelays";
import { relayPoolAtom } from "../atoms/relayPoolAtom";

function MyApp({ Component, pageProps }: AppProps) {
  const [feed, setFeed] = useAtom(homeFeed);
  const setUserAuthenticated = useSetAtom(authAtom);
  const [pool, setPool] = useAtom(relayPoolAtom);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined")
      setUserAuthenticated(localStorage.getItem("keys") !== null);
  }, []);
  useEffect(() => {
    const initPool = async () => {
      const { relayPool } = await import("nostr-tools");
      const tempPool = relayPool();
      if (typeof window !== undefined) {
        const privKey =
          localStorage.getItem("keys") !== null
            ? JSON.parse(localStorage.getItem("keys")!).privateKey
            : null;
        if (privKey !== null) tempPool.setPrivateKey(privKey);
      }
      defaultRelays.map(
        async (relayUrl: string) => await tempPool.addRelay(relayUrl)
      );
      setPool(tempPool);
    };
    initPool();
  }, []);
  useEffect(() => {
    const init = async () => {
      if (pool) {
        const postList: NostrEvent[] = await initConnection(pool);
        if (feed.length === 0) setFeed(postList);
      }
    };
    setTimeout(() => init(), 1000);
  }, [pool]);

  if (load)
    return (
      <ChakraProvider theme={theme}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ChakraProvider>
    );
}

export default MyApp;
