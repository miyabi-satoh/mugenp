import {
  Flex,
  Heading,
  Center,
  Link,
  Box,
  Spacer,
  Icon,
  ShowProps,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import NextLink from "next/link";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

const Show = dynamic<ShowProps>(
  () => import("@chakra-ui/react").then((mod: any) => mod.Show),
  { ssr: false }
);

const Container = ({ children }: PropsWithChildren<{}>) => {
  const [adSenseInjectorObserver, setAdSenseInjectorObserver] =
    useState<MutationObserver | null>();
  const ref = useRef<HTMLDivElement>(null);

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

  return (
    <Flex ref={ref} direction="column" h="100vh">
      {children}
    </Flex>
  );
};

const Header = () => {
  return (
    <Flex shadow="sm" py={2} px={4} alignItems="center">
      <Heading as="h1" size="lg">
        <NextLink href="/" passHref>
          <Link _hover={{ textDecorationLine: "none" }}>MuGenP</Link>
        </NextLink>
      </Heading>
      <Spacer />
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
  const Adsense = dynamic(
    () => import("~/components/adsense").then((mod: any) => mod.Adsense),
    { ssr: false }
  );

  return (
    <Box flex="1" shadow="sm" overflowY="scroll">
      {children}
      <Box m={4}>
        <Adsense />
      </Box>
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
