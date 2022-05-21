import {
  Flex,
  Heading,
  Center,
  Link,
  Box,
  Spacer,
  Icon,
  Show,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { PropsWithChildren } from "react";
import { FaInfoCircle } from "react-icons/fa";

const Container = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Flex direction="column" h="100vh">
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
