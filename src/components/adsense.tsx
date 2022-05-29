import { Center } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { isDev } from "~/utils";

declare global {
  var adsbygoogle: unknown[];
}

export const Adsense = () => {
  const { asPath } = useRouter();

  useEffect(() => {
    try {
      if (!isDev) {
        (adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error(e);
    }
  }, [asPath]);

  if (isDev) {
    return null;
  }

  return (
    <Center key={asPath} my={4}>
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          width: "300px",
        }}
        data-ad-client="ca-pub-1226899637934496"
        data-ad-slot="2305250435"
        data-ad-format="rectangle"
        data-adtest={isDev ? "on" : "off"}
      ></ins>
    </Center>
  );
};
