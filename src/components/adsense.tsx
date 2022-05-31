import { Center, useMediaQuery } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { isDev } from "~/utils";

declare global {
  var adsbygoogle: unknown[];
}

export const Adsense = () => {
  const { asPath } = useRouter();
  const [isLandscape] = useMediaQuery("(orientation: landscape)");

  useEffect(() => {
    const timerId = setTimeout(() => {
      try {
        if (!isDev) {
          (adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (e) {
        console.error(e);
      }
    }, 100);

    return () => {
      clearTimeout(timerId);
    };
  }, [isLandscape, asPath]);

  if (isDev) {
    return null;
  }

  return (
    <ins
      key={`${asPath}-${isLandscape}`}
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-1226899637934496"
      data-ad-slot="2305250435"
      data-ad-format="auto"
      data-full-width-responsive="true"
      data-adtest={isDev ? "on" : "off"}
    ></ins>
  );
};
