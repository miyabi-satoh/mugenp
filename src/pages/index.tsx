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
import math from "mathjs";
import type { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { ChangeEventHandler, useEffect, useState } from "react";
import Layout from "~/components/layout";
import { Fraction } from "~/utils/fraction";

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

function kou(n: number, x: string = "", sign: string = "+"): string {
  if (n == 0) {
    return "";
  }

  if (x) {
    if (n > 0) {
      return `${sign}${n > 1 ? n : ""}${x}`;
    }
    return `${n == -1 ? "-" : n}${x}`;
  }

  if (n > 0) {
    return `${sign}${n}`;
  }
  return `${n}`;
}
function syokou(n: number, x: string = ""): string {
  return kou(n, x);
}

const Home: NextPage = () => {
  const [level, setLevel] = useState(3);
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
    } else if (score > 6) {
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
        let question = "";
        let answer = "";

        const pattern = getRandomInt(3); // 0, 1, 2
        if (pattern == 2) {
          // 平方公式：(a + b)^2
          const s = getRandomInt(2) == 0 ? 1 : -1;
          if (level == 1) {
            // Lv1: a = x, b = 整数
            const b = (1 + getRandomInt(9)) * s;
            question = `\\left(x ${kou(b)}\\right)^2`;
            answer = `x^2 ${kou(2 * b, "x")} ${kou(b * b)}`;
          } else if (level == 2) {
            // Lv2: a = x, b = 整数y
            const b = (1 + getRandomInt(9)) * s;
            question = `\\left(x ${kou(b, "y")}\\right)^2`;
            answer = `x^2 ${kou(2 * b, "xy")} ${kou(b * b, "y^2")}`;
          } else {
            // Lv3: a = x, b = 分数
            let b: Fraction = new Fraction();
            while (1) {
              const m = 1 + getRandomInt(9); // 分母
              const n = (1 + getRandomInt(9)) * s; // 分子
              b = new Fraction(n, m);
              if (b.denominator == 1) {
                // 整数なのでパス
                continue;
              }
              if (b.denominator != m || b.numerator != n) {
                // 約分されたのでパス
                continue;
              }
              break;
            }
            question = `\\left(x ${s == 1 ? "+" : ""}${b.toTex()}\\right)^2`;
            const b2 = new Fraction(b.numerator * 2, b.denominator);
            const bb = new Fraction(
              b.numerator * b.numerator,
              b.denominator * b.denominator
            );
            if (b2.denominator == 1) {
              answer = `x^2 ${kou(b2.numerator, "x")} +${bb.toTex()}`;
            } else {
              answer = `x^2 ${s == 1 ? "+" : ""}${b2.toTex()}x +${bb.toTex()}`;
            }
          }
          // Lv4: a = x, b = 分数y
          // Lv5: a = 整数x, b = 整数
          // Lv6: a = 整数x, b = 整数y
          // Lv7: a = 整数x, b = 分数
          // Lv8: a = 整数x, b = 分数y
          // Lv9: a = 分数x, b = 整数
          // Lv10: a = 分数x, b = 整数y
          // Lv11: a = 分数x, b = 分数
          // Lv12: a = 分数x, b = 分数y
        } else if (pattern == 1) {
          // 和と差の積：(a + b)(a - b)
          const s = getRandomInt(2) == 0 ? 1 : -1;

          // Lv1: a = x, b = 整数
          const b = 1 + getRandomInt(9);
          question = `\\left(x ${kou(b)}\\right)\\left(x ${kou(-b)}\\right)`;
          answer = `x^2 ${kou(b * -b)}`;
        } else {
          // 和積の公式：(x + a)(x + b)
          const a_s = getRandomInt(2) == 0 ? 1 : -1;
          const b_s = getRandomInt(2) == 0 ? 1 : -1;

          // Lv1: x = x, a = 整数, b = 整数
          const a = (1 + getRandomInt(9)) * a_s;
          const b = (1 + getRandomInt(9)) * b_s;
          if (a == b || a + b == 0) {
            // 平方公式、和と差の公式になるのでスキップ
            continue;
          }
          question = `\\left(x ${kou(a)}\\right)\\left(x ${kou(b)}\\right)`;
          answer = `x^2 ${kou(a + b, "x")} ${kou(a * b)}`;
        }

        if (0) {
          const a_sign = getRandomInt(2) == 0 ? 1 : -1; // a の符号
          const b_sign = getRandomInt(2) == 0 ? 1 : -1; // b の符号
          const a = (1 + getRandomInt(9)) * a_sign;
          const b = (1 + getRandomInt(9)) * b_sign;

          let x = 1;
          let q;
          if (a == b) {
            // 平方公式：(x + a)^2
            q = `\\left(${syokou(x, "x")} ${kou(a)}\\right)^2`;
          } else if (a == b * -1) {
            // 和と差の積：(x + a)(x - a)
            q = `\\left(${syokou(x, "x")} ${kou(a)}\\right)\\left(${syokou(
              x,
              "x"
            )} ${kou(b)}\\right)`;
          } else {
            // 和積の公式：(x + a)(x + b)
            q = `\\left(${syokou(x, "x")} ${kou(a)}\\right)\\left(${syokou(
              x,
              "x"
            )} ${kou(b)}\\right)`;
          }
          const ans = `${syokou(x * x, "x^2")} ${kou(a + b, "x")} ${kou(
            a * b
          )}`;
        }

        if (_stock.includes(question) || _stock.includes(answer)) {
          retryCount++;
          if (retryCount > 18 * 18 - 50) {
            _stock = [];
            retryCount = 0;
            console.log("give up!");
          }
          continue;
        }

        newQuestions.push(question);
        newAnswers.push(answer);
        _stock.push(question, answer);
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
                <MathJax>{`\\(\\displaystyle ${q}\\)`}</MathJax>
              </Flex>
              <Box h="3em" mt={2} ml={6} color="red">
                {showAnswer && (
                  <MathJax>{`\\(\\displaystyle = ${answers[index]}\\)`}</MathJax>
                )}
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
