import {
  Box,
  Button,
  Container,
  Flex,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import { MathJax } from "better-react-mathjax";
import { ChangeEventHandler, useEffect, useMemo, useState } from "react";
import { RefreshFunction } from "~/interfaces/types";
import { Layout } from "./layout";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { isDev } from "~/utils";
type Props = {
  maxLv?: number;
  message: string;
  onRefresh: RefreshFunction;
};

const NUM_OF_Q = isDev ? 10 : 4;

export const MugenContainer = ({ maxLv = 5, message, onRefresh }: Props) => {
  const [score, setScore] = useState(-1);
  const [totalScore, setTotalScore] = useState(0);
  const [refresh, setRefresh] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [stock, setStock] = useState<string[]>([]);

  const level = useMemo(() => {
    return Math.max(0, Math.min(Math.floor(totalScore / 5), maxLv - 1)) + 1;
  }, [maxLv, totalScore]);

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

  const handleNext = () => {
    if (score < 0) {
      alert("正解数を選択してください。");
      return;
    }

    const total = totalScore + (score - Math.floor(NUM_OF_Q / 2));
    setTotalScore(total);
    setShowAnswer(false);
    setScore(-1);
    setRefresh(true);
  };

  const handleChangeScore: ChangeEventHandler<HTMLSelectElement> = (ev) => {
    setScore(Number(ev.target.value));
  };

  useEffect(() => {
    if (refresh) {
      const newQuestions: string[] = [];
      const newAnswers: string[] = [];
      let _stock = [...stock];
      let s_time = new Date();
      while (newQuestions.length < NUM_OF_Q) {
        const [question, answer] = onRefresh(level, totalScore);
        if (!!question && !!answer) {
          if (_stock.includes(question) || _stock.includes(answer)) {
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

          newQuestions.push(question);
          newAnswers.push(answer);
          _stock.push(question, answer);
        }
      }

      setShowAnswer(false);
      setQuestions([...newQuestions]);
      setAnswers([...newAnswers]);
      setStock(_stock.slice(-4 * NUM_OF_Q));
      setRefresh(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  return (
    <Layout>
      <Container my={4} p={4} maxW="container.md" shadow="base">
        <Box mb={4}>{message}</Box>
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
        <SimpleGrid columns={2} mb={4}>
          {questions.map((q, index) => (
            <Box key={`${q}${index}`}>
              <Flex h="3em" align="center">
                <Box w="2em" textAlign="center" mr={2}>
                  ({index + 1})
                </Box>
                <MathJax>{`\\(\\displaystyle ${q}\\)`}</MathJax>
              </Flex>
              <Box h="3em" my={2} ml={6} color="red">
                {showAnswer && (
                  <MathJax>{`\\(\\displaystyle = ${answers[index]}\\)`}</MathJax>
                )}
              </Box>
            </Box>
          ))}
        </SimpleGrid>
        <Flex align="center" ml={2}>
          <Button onClick={() => setShowAnswer(!showAnswer)}>
            解答を{`${showAnswer ? "隠す" : "表示"}`}
          </Button>
          <Box mx={3}>正解数</Box>
          <Select
            data-testid="correct-answers"
            w="4em"
            mr={4}
            onChange={handleChangeScore}
            value={score}
          >
            <option value="-1"></option>
            {Array.from(Array(NUM_OF_Q + 1).keys()).map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </Select>
          <Button disabled={score < 0} onClick={handleNext}>
            次の問題
          </Button>
          {isDev && <Box>スコア：{totalScore}</Box>}
          {isDev && <Box>レベル：{level}</Box>}
        </Flex>
      </Container>
    </Layout>
  );
};
