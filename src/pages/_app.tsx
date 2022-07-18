import { ChakraProvider } from "@chakra-ui/react";
import { useSetAtom, useAtom } from "jotai";
import type { AppProps } from "next/app";
import { useEffect } from "react";

import { authAtom } from "../atoms/authStateAtom";
import { homeFeed } from "../atoms/homeFeedAtom";
import theme from "../chakra/theme";
import MainLayout from "../components/Layouts/MainLayout";
import { initConnection } from "../service/nostrSetup";
import { NostrEvent } from "../types";

import "../global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  const [feed, setFeed] = useAtom(homeFeed);
  const setUserAuthenticated = useSetAtom(authAtom);

  useEffect(() => {
    if (typeof window !== "undefined")
      setUserAuthenticated(localStorage.getItem("keys") !== null);
  }, []);
  useEffect(() => {
    const init = async () => {
      const postList: NostrEvent[] = await initConnection();
      if (feed.length === 0) setFeed(postList);
    };
    setTimeout(() => init(), 1000);
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ChakraProvider>
  );
}

export default MyApp;
