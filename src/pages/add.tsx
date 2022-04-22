import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  IconButton,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Tooltip,
  useDisclosure,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { readFileSync } from "fs";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import path from "path";
import {
  FaMinus,
  FaAngleDoubleLeft,
  FaChevronRight,
  FaChevronDown,
} from "react-icons/fa";
import Layout from "~/components/layout";
import { Chapter, IdName, Unit } from "~/interfaces/types";

type Format = IdName & {
  helper?: string;
  max?: number;
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
                {f.name}
              </option>
            );
          })}
        </Select>
      </FormControl>
      <FormControl mb={4} as="fieldset">
        <FormLabel as="legend">単元と出題数</FormLabel>
        <VStack align="flex-start">
          <IconButton
            icon={<FaMinus />}
            colorScheme="red"
            aria-label={"remove"}
            size="xs"
          />
        </VStack>
      </FormControl>
    </Box>
  );
};

type ChapterBoxProps = {
  chapter: Chapter;
};
const ChapterBox = ({ chapter }: ChapterBoxProps) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box key={chapter.id} ml={1}>
      <Flex align="center">
        <Icon
          as={isOpen ? FaChevronDown : FaChevronRight}
          h={3}
          mr={1}
          color="teal.500"
          cursor="pointer"
          onClick={onToggle}
        />
        <Checkbox>{chapter.name}</Checkbox>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Wrap ml={12} spacingX={6} spacingY={1}>
          {chapter.sections?.map((section) => {
            return (
              <Tooltip key={section.id} label={section.format}>
                <WrapItem>
                  <Checkbox>{section.name}</Checkbox>
                </WrapItem>
              </Tooltip>
            );
          })}
        </Wrap>
      </Collapse>
    </Box>
  );
};

type UnitPaneProps = {
  units: Unit[];
};
const UnitPane = ({ units }: UnitPaneProps) => {
  return (
    <Box flex="1" p={4}>
      <FormControl mb={4}>
        <Button leftIcon={<FaAngleDoubleLeft />}>選択した単元を追加</Button>
      </FormControl>
      <Box overflowY="scroll">
        {units.map((unit) => {
          return (
            <Box key={unit.id} ml={2}>
              {unit.name}
              <Box>
                {unit.chapters?.map((chapter) => (
                  <ChapterBox key={chapter.id} chapter={chapter} />
                ))}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

type Props = {
  formats: Format[];
  units: Unit[];
};
const Add: NextPage<Props> = ({ formats, units }) => {
  return (
    <Layout>
      <Head>
        <title>MuGenP</title>
      </Head>
      <SettingsPane formats={formats} />
      <UnitPane units={units} />
    </Layout>
  );
};

function parseJson(name: string) {
  const jsonPath = path.join(process.cwd(), "src", "json", name);
  const jsonText = readFileSync(jsonPath, "utf-8");
  return JSON.parse(jsonText);
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  // JSON ファイルを読み込む
  const formats = parseJson("formats.json");
  const units = parseJson("units.json");

  // ページコンポーネントに渡す props オブジェクトを設定する
  return {
    props: { formats, units },
  };
};

export default Add;
