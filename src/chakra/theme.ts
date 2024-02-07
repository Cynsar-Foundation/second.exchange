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
      "h1, h2, h3, h4, h5, h6": {
        fontFamily: "Roboto, sans-serif", // or any other font family
        fontWeight: "bold", // Example of a common weight, adjust as necessary
      },
      h1: {
        fontSize: "3xl", // or your specific size
        fontWeight: 'bold' // Example color, adjust as necessary
      },
      h2: {
        fontSize: "2xl", // or your specific size
        fontWeight: 'semi-bold' // Example color, adjust as necessary
      },
      h3: {
        fontSize: "xl", // or your specific size
        fontWeight: 'semi-bold' // Example color, adjust as necessary
      },
      h4: {
        fontSize: "lg",
        fontWeight: 'semi-bold'
      },
      h5: {
        fontSize: "base",
        fontWeight: 'semi-bold'
      },
      h6: {
        fontSize: "base",
        fontWeight: 'semi-bold'
      }

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
      baseStyle: {
        mt: "4rem", // assuming navbar height is 4rem
        transition: "margin-left 0.5s",
      },
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