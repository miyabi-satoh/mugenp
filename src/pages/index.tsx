import {
  Box,
  Center,
  Container,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
} from "@chakra-ui/react";
import { MathJax } from "better-react-mathjax";
import { readFileSync } from "fs";
import type { GetStaticProps, NextPage } from "next";
import NextLink from "next/link";
import { join } from "path";
import { Layout } from "~/components/layout";
import { Page } from "~/interfaces/types";

type CardProps = {
  page: Page;
};
const Card = ({ page }: CardProps) => {
  return (
    <LinkBox rounded="lg" boxShadow="base" overflow="hidden">
      <Box bg="blue.100" px={2} py={1} fontSize="sm">
        {page.grade} {page.chapter}
      </Box>
      <Center as="h2" p={4} bg="blue.600" color="gray.50">
        <NextLink href={`/${page.id}`} passHref>
          <LinkOverlay>
            <MathJax>{page.title}</MathJax>
          </LinkOverlay>
        </NextLink>
      </Center>
    </LinkBox>
  );
};

type PageProps = {
  pages: Page[];
};

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  // JSON ファイルを読み込む
  const jsonPath = join(process.cwd(), "src", "json", "pages.json");
  const jsonText = readFileSync(jsonPath, "utf-8");
  const pages = JSON.parse(jsonText) as Page[];

  // ページコンポーネントに渡す props オブジェクトを設定する
  return {
    props: { pages },
  };
};

const Home: NextPage<PageProps> = ({ pages }) => {
  return (
    <Layout>
      <Container p={4}>
        <SimpleGrid columns={2} spacing={6}>
          {pages.map((page) => (
            <Card key={page.id} page={page} />
          ))}
        </SimpleGrid>
      </Container>
    </Layout>
  );
};

export default Home;
