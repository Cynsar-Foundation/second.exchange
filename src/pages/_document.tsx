import { ChakraProvider } from "@chakra-ui/react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";

export default class Default extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <ChakraProvider>
            <Main />
          </ChakraProvider>
          <NextScript />
        </body>
      </Html>
    );
  }
}
