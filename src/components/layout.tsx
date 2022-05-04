import { Flex, Heading, Center, Link, Box } from "@chakra-ui/react";
import NextLink from "next/link";
import { PropsWithChildren } from "react";

const Container = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Flex direction="column" h="100vh">
      {children}
    </Flex>
  );
};

const Header = () => {
  return (
    <Flex shadow="sm" py={2} px={4}>
      <Heading as="h1" size="lg">
        <NextLink href="/" passHref>
          <Link _hover={{ textDecorationLine: "none" }}>MuGenP</Link>
        </NextLink>
      </Heading>
    </Flex>
  );
};

const Footer = () => {
  return <Center py={1}>Copyright &copy; miyabi-satoh</Center>;
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
