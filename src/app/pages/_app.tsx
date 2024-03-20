import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../theme";
import { MathJaxContext } from "better-react-mathjax";
import { DefaultSeo } from "next-seo";
import { useEffect } from "react";
import TagManager from "react-gtm-module";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    TagManager.initialize({ gtmId: "GTM-MVKQTLQ" });
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <MathJaxContext>
        <DefaultSeo
          titleTemplate="MuGenP | %s"
          defaultTitle="MuGenP"
          description="中学数学の主要な計算問題を無限に演習できるサイトです。(開発中)"
          openGraph={{
            type: "website",
            locale: "ja_JP",
            url: "https://mugenp.amiiby.com/",
            site_name: "MuGenP",
            images: [
              {
                url: "https://mugenp.amiiby.com/mugenp.png",
                width: 1200,
                height: 630,
                alt: "OG Image",
              },
            ],
          }}
        />
        <Component {...pageProps} />
      </MathJaxContext>
    </ChakraProvider>
  );
}

export default MyApp;
