import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Link,
  ListItem,
  OrderedList,
  Select,
  Stack,
} from "@chakra-ui/react";
import { MathJax } from "better-react-mathjax";
import type { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { ChangeEventHandler, useEffect, useState } from "react";
import Layout from "~/components/layout";

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

function kou(n: number, x: string = ""): string {
  if (n == 0) {
    return "";
  }

  if (x) {
    if (n > 0) {
      return `+${n > 1 ? n : ""}${x}`;
    }
    return `${n == -1 ? "-" : n}${x}`;
  }

  if (n > 0) {
    return `+${n}`;
  }
  return `${n}`;
}

const Home: NextPage = () => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(-1);
  const [refresh, setRefresh] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [stock, setStock] = useState<string[]>([]);

  const handleNext = () => {
    console.log(stock.length);

    if (score < 0) {
      alert("正解数を選択してください。");
      return;
    }

    let newLevel = level;
    if (score < 5) {
      newLevel = level - 1;
    } else {
      newLevel = level + 1;
    }
    if (newLevel < 1) {
      newLevel = 1;
    }

    setLevel(newLevel);
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
      let retryCount = 0;
      while (newQuestions.length < 10) {
        const af = getRandomInt(2) == 0 ? 1 : -1;
        const bf = getRandomInt(2) == 0 ? 1 : -1;
        const a = (1 + getRandomInt(9)) * af;
        const b = (1 + getRandomInt(9)) * bf;

        let q;
        if (a == b) {
          q = `\\left(x ${kou(a)}\\right)^2`;
        } else {
          q = `\\left(x ${kou(a)}\\right)\\left(x ${kou(b)}\\right)`;
        }

        if (_stock.includes(q)) {
          retryCount++;
          if (retryCount > 18 * 18 - 50) {
            _stock = [];
            retryCount = 0;
            console.log("give up!");
          }
          continue;
        }

        newQuestions.push(q);
        newAnswers.push(`x^2 ${kou(a + b, "x")} ${kou(a * b)}`);
        _stock.push(q);
      }

      setQuestions([...newQuestions]);
      setAnswers([...newAnswers]);
      setStock([..._stock]);
      setRefresh(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  return (
    <Layout>
      <Head>
        <title>MuGenP</title>
      </Head>
      <Box p={4}>
        <Flex align="center" mb={6}>
          <Box>【乗法公式Lv{level}】次の式を展開しなさい。</Box>
          <Button onClick={() => setShowAnswer(!showAnswer)}>
            解答を{`${showAnswer ? "隠す" : "表示"}`}
          </Button>
        </Flex>
        <Flex wrap="wrap" mb={4}>
          {questions.map((q, index) => (
            <Box key={`${q}${index}`} my={2} mr={4} w="200px">
              <Flex>
                <Box w="2em" textAlign="center" mr={2}>
                  ({index + 1})
                </Box>
                <MathJax>{`\\(${q}\\)`}</MathJax>
              </Flex>
              <Box h="1em" mt={1} ml={6} color="red">
                {showAnswer && <MathJax>{`\\(= ${answers[index]}\\)`}</MathJax>}
              </Box>
            </Box>
          ))}
        </Flex>
        <Flex align="center" ml={2}>
          <Box mr={2}>正解数</Box>
          <Select w="4em" mr={4} onChange={handleChangeScore} value={score}>
            <option value="-1"></option>
            {Array.from(Array(11).keys()).map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </Select>
          <Button disabled={score < 0} onClick={handleNext}>
            次の問題
          </Button>
        </Flex>
      </Box>
    </Layout>
  );
};

export default Home;
