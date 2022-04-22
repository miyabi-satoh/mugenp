// import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "~/theme";
import { MathJaxContext } from "better-react-mathjax";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <MathJaxContext>
        <Component {...pageProps} />
      </MathJaxContext>
    </ChakraProvider>
  );
}

export default MyApp;
