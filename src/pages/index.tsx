import {
  Box,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
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
import path from "path";
import { PropsWithChildren } from "react";
import { FaPlus } from "react-icons/fa";
// import Head from "next/head";
// import Image from "next/image";
// import styles from "../styles/Home.module.css";

type Format = {
  id: string;
  description: string;
  helper?: string;
  max?: number;
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
};
const SettingsPane = ({ formats }: SettingsPaneProps) => {
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
                {f.description}
              </option>
            );
          })}
        </Select>
      </FormControl>
      <FormControl mb={4} as="fieldset">
        <FormLabel as="legend">単元と問題数</FormLabel>
        <VStack align="flex-start">
          <IconButton
            icon={<FaPlus />}
            colorScheme="green"
            aria-label={"add"}
            size="xs"
          />
        </VStack>
      </FormControl>
    </Box>
  );
};

const PreviewPane = () => {
  return <Flex flex="1">プレビュー</Flex>;
};

type HomeProps = {
  formats: Format[];
};
const Home: NextPage<HomeProps> = ({ formats }) => {
  return (
    <Container>
      <Header />
      <Main>
        <SettingsPane formats={formats} />
        <PreviewPane />
      </Main>
      <Footer />
    </Container>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async (context) => {
  // JSON ファイルを読み込む
  const jsonPath = path.join(process.cwd(), "src", "json", "formats.json");
  const jsonText = readFileSync(jsonPath, "utf-8");
  const formats = JSON.parse(jsonText) as Format[];

  // ページコンポーネントに渡す props オブジェクトを設定する
  return {
    props: { formats },
  };
};

export default Home;
