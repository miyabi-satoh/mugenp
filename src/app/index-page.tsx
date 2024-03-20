"use client";

import {
  Box,
  Center,
  Container,
  Flex,
  Link,
  LinkBox,
  Select,
  SimpleGrid,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { ChangeEvent, useCallback, useMemo } from "react";
import { Layout } from "~/components/layout";
import { useLocalStorage } from "~/hooks/useLocalStorage";
import { Page } from "~/interfaces/types";
import NextLink from "next/link";
import { MathJax } from "better-react-mathjax";

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
        <Link href={`/${page.id}`} as={NextLink}>
          <MathJax>{page.title}</MathJax>
        </Link>
      </Center>
    </LinkBox>
  );
};

export type PageProps = {
  pages: Page[];
};
const STORAGE_KEY_GRADE = "mugenp.amiiby.com/grade";
const STORAGE_KEY_SUBSECTION = "mugenp.amiiby.com/subsection";

export const IndexPage = ({ pages }: PageProps) => {
  const Adsense = dynamic(
    () => import("~/components/adsense").then((mod: any) => mod.Adsense),
    { ssr: false }
  );

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
        <Wrap mb={4}>
          <WrapItem>
            <Flex alignItems="center">
              <Box flexGrow={0} flexShrink={0} mr={2}>
                学年
              </Box>
              <Select
                mr={3}
                minW="5em"
                onChange={handleChangeGrade}
                value={grade}
              >
                {grades.map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </Select>
            </Flex>
          </WrapItem>
          <WrapItem>
            <Flex alignItems="center">
              <Box flexGrow={0} flexShrink={0} mr={2}>
                項目
              </Box>
              <Select
                minW="16em"
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
          </WrapItem>
        </Wrap>
        <SimpleGrid columns={[1, 1, 2]} spacing={6}>
          {pages
            .filter((p) => p.grade == grade)
            .filter((p) => !subSection || p.subsection == subSection)
            .map((page) => (
              <Card key={page.id} page={page} />
            ))}
        </SimpleGrid>
      </Container>
      <Container my={4} maxW="container.md">
        <Adsense />
      </Container>
    </Layout>
  );
};
