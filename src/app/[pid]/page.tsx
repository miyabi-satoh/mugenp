import { readFileSync } from "fs";
import { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { join } from "path";
import { Page } from "~/interfaces/types";
import { NextSeo } from "next-seo";
import { useMemo } from "react";
import { Layout } from "~/components/layout";
import { Box, Container, Heading } from "@chakra-ui/react";

type PathParams = {
  pid: string;
};

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  // JSON ファイルを読み込む
  const jsonPath = join(process.cwd(), "src", "json", "pages.json");
  const jsonText = readFileSync(jsonPath, "utf-8");
  const pages = JSON.parse(jsonText) as Page[];

  return {
    paths: pages.map((p) => ({
      params: {
        pid: p.id,
      },
    })),
    fallback: false, // 上記以外のパスでアクセスした場合は 404 ページにする
  };
};

export const getStaticProps: GetStaticProps<Page> = async (context) => {
  const { pid } = context.params as PathParams;

  // JSON ファイルを読み込む
  const jsonPath = join(process.cwd(), "src", "json", "pages.json");
  const jsonText = readFileSync(jsonPath, "utf-8");
  const pages = JSON.parse(jsonText) as Page[];

  const page = pages.find((p) => p.id === pid);

  return { props: page! };
};

const Mugen = (page: Page) => {
  const Adsense = dynamic(
    () => import("~/components/adsense").then((mod: any) => mod.Adsense),
    { ssr: false }
  );

  const MugenContainer = dynamic(() =>
    import("~/core").then((mod: any) => mod[`M${page.id}`])
  );

  const description = useMemo(() => {
    let ret = page.grade + " " + page.chapter + " ";
    if (page.section != page.chapter) {
      ret += page.section + " ";
    }
    ret += page.subsection;

    return ret;
  }, [page]);

  const title = useMemo(() => {
    return `${page.grade} ${page.section} / ${page.subsection}`;
  }, [page]);

  return (
    <Layout>
      <Container my={4} p={4} maxW="container.md" shadow="base">
        <Box>
          <Heading as="h2" size="sm">
            {title}
          </Heading>
        </Box>
        <Box mb={4}>{page.message}</Box>
        <NextSeo
          title={title}
          description={description}
          openGraph={{
            type: "article",
            url: `https://mugenp.amiiby.com/${page.id}`,
            title: page.subsection,
          }}
        />
        <MugenContainer />
      </Container>
      <Container maxW="container.md" my={4}>
        <Adsense />
      </Container>
    </Layout>
  );
};

export default Mugen;
