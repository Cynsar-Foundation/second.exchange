import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";

import { Button } from "./button";

const styles = {
  global: () => ({
    body: {
      bg: mode("white", "#00171f"),
    },
  }),
};

const components = {
  Button,
  Text: {
    baseStyle: {
      cursor: "default",
    },
  },
};

const fonts = {
  body: "Roboto, sans-serif",
};

const colors = {
  brand: {
    "100": "#003459",
    "200": "#007ea7",
    "300": "#00a8e8",
  },
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: "true",
};

const theme = extendTheme({
  config,
  styles,
  components,
  colors,
  fonts,
  textStyle: {
    bold: {
      fontSize: ["16px", "20px"],
      color: colors.brand["100"],
    },
  },
});

export default theme;
