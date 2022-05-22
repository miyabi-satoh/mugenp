import { useRouter } from "next/router";
import { useEffect } from "react";

export const Adsense = () => {
  const { asPath } = useRouter();

  useEffect(() => {
    try {
      (adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error(e);
    }
  }, [asPath]);

  return (
    <div key={asPath}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", minWidth: "250px", minHeight: "50px" }}
        data-ad-client="ca-pub-1226899637934496"
        data-ad-slot="2305250435"
        data-ad-format="horizontal"
        data-full-width-responsive="true"
        data-adtest={process.env.NODE_ENV === "production" ? "off" : "on"}
      ></ins>
    </div>
  );
};
