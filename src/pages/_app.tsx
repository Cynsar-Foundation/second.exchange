import React, { useEffect, useState, useRef } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

import theme from "../chakra/theme";
import MainLayout from "../components/Layouts/MainLayout";
import PrivateKeyModal from "../components/Modals/PrivateKeyModal";
import ErrorBoundary from "../utils/errorBoundary";
import NostrSetupService from "../service/nostrSetup";
import HomeFeedService from "../service/homefeed";
import NostrOpsService from "../service/nostrOps";

import "../global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  const [load, setLoad] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    setLoad(true);
  }, []);

  if (!load) return null;

  return (
    <div ref={contentRef}>
      <ErrorBoundary>
        <NostrSetupService>
          <HomeFeedService>
            <NostrOpsService>
              <ChakraProvider theme={theme}>
              <PrivateKeyModal contentRef={contentRef} />
                <MainLayout>
                  <Component {...pageProps} />
                </MainLayout>
              </ChakraProvider>
            </NostrOpsService>
          </HomeFeedService>
        </NostrSetupService>
      </ErrorBoundary>
    </div>
  );
}

export default MyApp;
