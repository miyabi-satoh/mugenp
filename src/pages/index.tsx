import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  VStack,
} from "@chakra-ui/react";
import { readFileSync } from "fs";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import path from "path";
import { PropsWithChildren } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
// import Head from "next/head";
// import Image from "next/image";
// import styles from "../styles/Home.module.css";

type IdName = {
  id: string;
  name: string;
};

type Format = IdName & {
  helper?: string;
  max?: number;
};
type Section = IdName & {
  format?: string;
};
type Chapter = IdName & {
  sections?: Section[];
};
type Unit = IdName & {
  chapters?: Chapter[];
};

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
        MuGenP
      </Heading>
    </Flex>
  );
};

const Footer = () => {
  return <Center py={1}>Copyright &copy; miyabi-satoh</Center>;
};

const Main = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Flex flex="1" shadow="sm">
      {children}
    </Flex>
  );
};

type SettingsPaneProps = {
  formats: Format[];
  units: Unit[];
};
const SettingsPane = ({ formats, units }: SettingsPaneProps) => {
  return (
    <Box flex="1" p={4}>
      <FormControl mb={4}>
        <FormLabel htmlFor="title">タイトル</FormLabel>
        <Input id="title" />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel htmlFor="format">フォーマット</FormLabel>
        <Select id="format" placeholder="フォーマットを選択...">
          {formats.map((f) => {
            return (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            );
          })}
        </Select>
      </FormControl>
      <FormControl mb={4} as="fieldset">
        <FormLabel as="legend">単元と問題数</FormLabel>
        <VStack align="flex-start">
          <IconButton
            icon={<FaMinus />}
            colorScheme="red"
            aria-label={"remove"}
            size="xs"
          />
        </VStack>
      </FormControl>
      <Button leftIcon={<FaPlus />}>単元を追加</Button>
    </Box>
  );
};

const PreviewPane = () => {
  return <Flex flex="1">プレビュー</Flex>;
};

type HomeProps = {
  formats: Format[];
  units: Unit[];
};
const Home: NextPage<HomeProps> = ({ formats, units }) => {
  return (
    <Container>
      <Head>
        <title>MuGenP</title>
      </Head>
      <Header />
      <Main>
        <SettingsPane formats={formats} units={units} />
        <PreviewPane />
      </Main>
      <Footer />
    </Container>
  );
};

function parseJson(name: string) {
  const jsonPath = path.join(process.cwd(), "src", "json", name);
  const jsonText = readFileSync(jsonPath, "utf-8");
  return JSON.parse(jsonText);
}

export const getStaticProps: GetStaticProps<HomeProps> = async (context) => {
  // JSON ファイルを読み込む
  const formats = parseJson("formats.json");
  const units = parseJson("units.json");

  // ページコンポーネントに渡す props オブジェクトを設定する
  return {
    props: { formats, units },
  };
};

export default Home;
