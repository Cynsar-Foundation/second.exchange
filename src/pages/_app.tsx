import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

import theme from "../chakra/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
