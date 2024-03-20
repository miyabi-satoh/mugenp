import { isDev } from "~/utils";
import { Providers } from "./providers";
import { ColorModeScript } from "@chakra-ui/react";
import { theme } from "./theme";

const siteName = "MuGenP";
const description =
  "中学数学の主要な計算問題を無限に演習できるサイトです。(開発中)";
const url = "https://mugenp.amiiby.com/";

export const metadata = {
  metadataBase: new URL(process.env.URL ?? "http://localhost:3001"),
  title: {
    default: siteName,
    /** `next-seo`の`titleTemplate`に相当する機能 */
    template: `%s - ${siteName}`,
  },
  description,
  openGraph: {
    title: siteName,
    description,
    url,
    siteName,
    locale: "ja_JP",
    type: "website",
  },
  // twitter: {
  //   card: 'summary_large_image',
  //   title: siteName,
  //   description,
  //   site: '@サイト用アカウントのTwitterID',
  //   creator: '@作者のTwitterID',
  // },
  // verification: {
  //   google: 'サーチコンソールのやつ',
  // },
  alternates: {
    canonical: url,
  },
};

// 以下略

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        {!isDev && (
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1226899637934496"
            crossOrigin="anonymous"
          ></script>
        )}
      </head>
      <body>
        <Providers>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
