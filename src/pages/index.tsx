import {
  Box,
  Center,
  Container,
  Flex,
  LinkBox,
  LinkOverlay,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import { MathJax } from "better-react-mathjax";
import { readFileSync } from "fs";
import type { GetStaticProps, NextPage } from "next";
import NextLink from "next/link";
import { join } from "path";
import { ChangeEvent, useCallback, useMemo } from "react";
import { Layout } from "~/components/layout";
import { useLocalStorage } from "~/hooks/useLocalStorage";
import { Page } from "~/interfaces/types";

type CardProps = {
  page: Page;
};
const Card = ({ page }: CardProps) => {
  return (
    <LinkBox rounded="lg" boxShadow="base" overflow="hidden">
      <Box bg="blue.100" px={2} py={1} fontSize="sm">
        {page.chapter} / {page.subsection}
      </Box>
      <Center as="h2" p={4} bg="blue.600" color="gray.50" fontSize="sm">
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

const STORAGE_KEY_GRADE = "mugenp.amiiby.com/grade";
const STORAGE_KEY_SUBSECTION = "mugenp.amiiby.com/subsection";

const Home: NextPage<PageProps> = ({ pages }) => {
  const grades = useMemo(() => {
    const _grades = pages.map((x) => x.grade);
    return _grades.filter((e, pos) => _grades.indexOf(e) == pos);
  }, [pages]);

  const [grade, setGrade] = useLocalStorage(
    STORAGE_KEY_GRADE,
    grades.slice(-1)[0]
  );
  const [subSection, setSubSection] = useLocalStorage(
    STORAGE_KEY_SUBSECTION,
    ""
  );

  const subsections = useMemo(() => {
    const _subsections = pages
      .filter((x) => x.grade === grade)
      .map((x) => x.subsection);
    return _subsections.filter((e, pos) => _subsections.indexOf(e) == pos);
  }, [grade, pages]);

  const handleChangeGrade = useCallback(
    (ev: ChangeEvent<HTMLSelectElement>) => {
      setSubSection("");
      setGrade(ev.target.value);
    },
    [setGrade, setSubSection]
  );

  const handleChangeSubsection = useCallback(
    (ev: ChangeEvent<HTMLSelectElement>) => {
      setSubSection(ev.target.value);
    },
    [setSubSection]
  );

  // useEffect(() => {
  //   setGrade(grades[0]);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  if (grade === undefined || subSection === undefined) {
    return null;
  }

  return (
    <Layout>
      <Container p={4} maxW="container.md">
        <Flex alignItems="center" mb={4}>
          <Box mr={3}>学年</Box>
          <Select w="5em" onChange={handleChangeGrade} value={grade}>
            {grades.map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </Select>
          <Box mx={3}>項目</Box>
          <Select
            maxW="16em"
            onChange={handleChangeSubsection}
            value={subSection}
          >
            <option value="">すべて表示</option>
            {subsections.map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </Select>
        </Flex>
        <SimpleGrid columns={[1, 1, 2]} spacing={6}>
          {pages
            .filter((p) => p.grade == grade)
            .filter((p) => !subSection || p.subsection == subSection)
            .map((page) => (
              <Card key={page.id} page={page} />
            ))}
        </SimpleGrid>
      </Container>
    </Layout>
  );
};

export default Home;
