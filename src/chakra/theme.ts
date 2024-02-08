import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: true,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode("white", "#00171f")(props),
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "lg",
      },
    },
    Text: {
      baseStyle: {
        cursor: "default",
      },
    },
    Modal: {
      parts: ["dialog", "header", "body", "footer"],
      baseStyle: {
        dialog: {
          borderRadius: "md",
        },
        header: {
          padding: "4",
          fontWeight: "bold",
        },
        body: {
          padding: "4",
        },
        footer: {
          padding: "4",
        },
      },
    },
    EditorContainer: {
      // baseStyle, sizes, variants, defaultProps can be defined here
    },
  },
  fonts: {
    body: "Roboto, sans-serif",
  },
  colors: {
    brand: {
      100: "#003459",
      200: "#007ea7",
      300: "#00a8e8",
    },
  },
  textStyles: {
    bold: {
      fontSize: ["16px", "20px"],
      fontWeight: "bold",
      color: "brand.100",
    },
  },
});

export default theme;
