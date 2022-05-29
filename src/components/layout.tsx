import {
  Flex,
  Heading,
  Center,
  Link,
  Box,
  Icon,
  ShowProps,
  useMediaQuery,
  HStack,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import NextLink from "next/link";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { measureHeight, use100vh } from "react-div-100vh";
import { FaInfoCircle } from "react-icons/fa";
import {
  FacebookIcon,
  FacebookShareButton,
  LineIcon,
  LineShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

const Show = dynamic<ShowProps>(
  () => import("@chakra-ui/react").then((mod: any) => mod.Show),
  { ssr: false }
);

const Container = ({ children }: PropsWithChildren<{}>) => {
  const trigger = use100vh();
  const [height, setHeight] = useState<number | null>();
  const [adSenseInjectorObserver, setAdSenseInjectorObserver] =
    useState<MutationObserver | null>();
  const ref = useRef<HTMLDivElement>(null);
  const [isLandscape] = useMediaQuery("(orientation: landscape)");

  useEffect(() => {
    if (!adSenseInjectorObserver && ref.current) {
      const observer = new MutationObserver((mutations, observer) => {
        ref.current!.style.removeProperty("min-height");
        ref.current!.style.removeProperty("height");
      });
      observer.observe(ref.current, {
        attributes: true,
        attributeFilter: ["style"],
      });
      setAdSenseInjectorObserver(observer);
    }

    return () => {
      if (adSenseInjectorObserver) {
        adSenseInjectorObserver.disconnect();
        setAdSenseInjectorObserver(null);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setHeight(measureHeight());
    }, 100);

    return () => {
      clearTimeout(timerId);
    };
  }, [isLandscape, trigger]);

  return (
    <Flex ref={ref} direction="column" h={height ? `${height}px` : "100vh"}>
      {children}
    </Flex>
  );
};

const Header = () => {
  const shareUrl = `https://mugenp.amiiby.com/`;
  const title = `MuGenP`;
  return (
    <Flex shadow="sm" py={2} px={[2, 4]} alignItems="center">
      <Heading as="h1" size="lg">
        <NextLink href="/" passHref>
          <Link _hover={{ textDecorationLine: "none" }}>MuGenP</Link>
        </NextLink>
      </Heading>
      <Center flexGrow="1">
        <HStack spacing={2} mx={[2, 4]}>
          <Show above="sm">
            <Box>SNSでシェア</Box>
          </Show>
          <FacebookShareButton url={shareUrl} quote={title}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl} title={title}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <LineShareButton url={shareUrl} title={title}>
            <LineIcon size={32} round />
          </LineShareButton>
        </HStack>
      </Center>
      <NextLink href="/about" passHref>
        <Link display="inline-flex" alignItems="center">
          <Icon as={FaInfoCircle} mr={1} /> About
        </Link>
      </NextLink>
    </Flex>
  );
};

const Footer = () => {
  return (
    <Center py={1}>
      Copyright &copy; 2022 amiiby.com
      <Show above="sm"> All Rights Reserved.</Show>
    </Center>
  );
};

const Main = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Box flex="1" shadow="sm" overflowY="scroll">
      {children}
    </Box>
  );
};

export const Layout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Container>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Container>
  );
};
