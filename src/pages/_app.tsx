import { ChakraProvider, propNames } from "@chakra-ui/react";
import { useSetAtom, useAtom } from "jotai";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";

import { authAtom } from "../atoms/authStateAtom";
import { homeFeed } from "../atoms/homeFeedAtom";
import theme from "../chakra/theme";
import MainLayout from "../components/Layouts/MainLayout";
import { useNostrSetupService } from "../service/nostrSetup";

import "../global.scss";
import { getRelays } from "../config/defaultRelays";
import { relayPoolAtom } from "../atoms/relayPoolAtom";
import ErrorBoundary from "../utils/errorBoundary";
import NostrSetupService  from "../service/nostrSetup";
import HomeFeedService from "../service/homefeed";
import NostrOpsService from "../service/nostrOps";

function MyApp({ Component, pageProps }: AppProps) {
  const [load, setLoad] = useState(false);
  // const nostrSetupService = useNostrSetupService()

  useEffect(() => {
    setLoad(true);
  }, []);
  
  // useEffect(() => {
  //   if (nostrSetupService !==  undefined){
  //     nostrSetupService.initConnection();
  //   }
    
  // });

  if (load)
    return (
      <ErrorBoundary>
        <NostrSetupService>
        <HomeFeedService>
          <NostrOpsService>
      <ChakraProvider theme={theme}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ChakraProvider>
      </NostrOpsService>
      </HomeFeedService>
      </NostrSetupService>
      </ErrorBoundary>
    );
}

export default MyApp;

