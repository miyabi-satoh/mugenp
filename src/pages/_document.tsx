import { ColorModeScript } from "@chakra-ui/react";
import { Html, Head, Main, NextScript } from "next/document";
import { theme } from "~/theme";
import { isDev } from "~/utils";

const MyDocument = () => {
  return (
    <Html lang="ja">
      <Head>
        {!isDev && (
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1226899637934496"
            crossOrigin="anonymous"
          ></script>
        )}
      </Head>
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default MyDocument;
