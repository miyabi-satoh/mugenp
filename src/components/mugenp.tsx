import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import { MathJax } from "better-react-mathjax";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { FaArrowUp, FaArrowDown, FaChevronDown } from "react-icons/fa";
import { dsp, isDev, minMax } from "~/utils";

/**
 * 問題と解答の型
 * @date 5/29/2022 - 6:56:35 PM
 *
 * @typedef {QA}
 */
type QA = {
  question: string;
  answer: string;
};

/**
 * QAを生成する関数の型
 * @date 5/29/2022 - 6:57:07 PM
 *
 * @export
 * @typedef {GeneratorFunc}
 */
export type GeneratorFunc = (level: number) => QA | null;

type Props = {
  columns?: number | number[];
  maxLv?: number;
  answerPrefix?: string;
  displayStyle?: boolean;
  generator: GeneratorFunc;
};

const NUM_OF_Q = isDev ? 10 : 4;

export const MugenP = ({
  columns = [1, 1, 2],
  maxLv = 5,
  answerPrefix = "=",
  displayStyle = true,
  generator,
}: Props) => {
  const [score, setScore] = useState(-1);
  const [totalScore, setTotalScore] = useState(0);
  const [refresh, setRefresh] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);
  const [qas, setQAs] = useState<QA[]>([]);
  const [stock, setStock] = useState<string[]>([]);

  const level = useMemo(() => {
    return minMax(0, Math.floor(totalScore / (NUM_OF_Q / 2)), maxLv - 1) + 1;
  }, [maxLv, totalScore]);

  const wrap = (s: string) => {
    return displayStyle ? dsp(s) : s;
  };

  const handleLevelDown = () => {
    if (totalScore > 0) {
      setTotalScore(totalScore - NUM_OF_Q);
      setRefresh(true);
    }
  };

  const handleLevelUp = () => {
    setTotalScore(totalScore + NUM_OF_Q);
    setRefresh(true);
  };

  const handleNext = useCallback(() => {
    if (score < 0) {
      alert("正解数を選択してください。");
      return;
    }

    const total = totalScore + (score - Math.floor(NUM_OF_Q / 2));
    setTotalScore(total);
    setShowAnswer(false);
    setScore(-1);
    setRefresh(true);
  }, [score, totalScore]);

  const handleChangeScore = useCallback(
    (ev: ChangeEvent<HTMLSelectElement>) => {
      setScore(Number(ev.target.value));
    },
    []
  );

  useEffect(() => {
    if (refresh) {
      const newQAs: QA[] = [];
      let _stock = [...stock];
      let s_time = new Date();
      while (newQAs.length < NUM_OF_Q) {
        const r = generator(level);
        if (r) {
          if (_stock.includes(r.question) || _stock.includes(r.answer)) {
            const e_time = new Date();
            const diff = e_time.getTime() - s_time.getTime();
            if (diff > 50) {
              _stock = _stock.slice(-1 * Math.floor(_stock.length / 2));
              s_time = new Date();
              // if (isDev) {
              //   console.log(`Level ${level}: give up!`);
              // }
            }
            continue;
          }

          newQAs.push(r);
          _stock.push(r.question, r.answer);
        }
      }

      setShowAnswer(false);
      setQAs(newQAs);
      setStock(_stock.slice(-4 * NUM_OF_Q));
      setRefresh(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  return (
    <>
      {/* <Box mb={6}>
          <Button
            disabled={totalScore <= 0}
            onClick={handleLevelDown}
            leftIcon={<FaArrowDown />}
            colorScheme="green"
            mr={3}
          >
            難易度を下げる
          </Button>
          <Button
            onClick={handleLevelUp}
            leftIcon={<FaArrowUp />}
            colorScheme="red"
          >
            難易度を上げる
          </Button>
        </Box> */}
      <Box>【Lv.{level == maxLv ? "Max" : level}】</Box>
      <SimpleGrid columns={columns} mb={4}>
        {qas.map((qa, index) => (
          <Box key={`${qa.question}${index}`}>
            <Flex h="3em" align="center">
              <Box w="2em" textAlign="center" mr={2}>
                ({index + 1})
              </Box>
              <MathJax>{wrap(qa.question)}</MathJax>
            </Flex>
            <Box h="3em" my={2} ml={6} color="red">
              {showAnswer && (
                <MathJax>{wrap(answerPrefix + " " + qa.answer)}</MathJax>
              )}
            </Box>
          </Box>
        ))}
      </SimpleGrid>
      <Flex align="center" ml={2}>
        <Button id="toggle-answer" onClick={() => setShowAnswer(!showAnswer)}>
          解答を{`${showAnswer ? "隠す" : "表示"}`}
        </Button>
        <Box mx={3}>
          <Menu placement="top">
            <MenuButton
              as={Button}
              rightIcon={<FaChevronDown />}
              colorScheme="teal"
              variant="outline"
              id="menu-score"
            >
              正解数{score < 0 ? "を選択" : `: ${score}`}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setScore(-1)}>正解数を選択</MenuItem>
              {Array.from(Array(NUM_OF_Q + 1).keys()).map((i) => (
                <MenuItem key={i} id={`score-${i}`} onClick={() => setScore(i)}>
                  {i}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Box>
        <Button id="button-next" disabled={score < 0} onClick={handleNext}>
          次の問題
        </Button>
        {isDev && <Box>スコア：{totalScore}</Box>}
        {isDev && <Box>レベル：{level}</Box>}
      </Flex>
    </>
  );
};
