import { MugenContainer } from "~/components/container";
import { RefreshFunction, TermSpec } from "~/interfaces/types";
import { getRandomInt, guard, randArray } from "~/utils";
import { Fraction } from "~/utils/fraction";
import { Monomial } from "~/utils/monomial";
import { Polynomial } from "~/utils/polynomial";

// "id": "71201",
// "module": "hantai",
// "grade": "中1",
// "chapter": "正の数・負の数",
// "section": "正の数・負の数",
// "subsection": "正の数・負の数で量を表す",
// "title": "反対の性質を持つ量",
// "message": "[ ]内の言葉を使って、次のことを表しなさい。"
type Props = {
  message: string;
};
const Mugen = ({ message }: Props) => {
  return (
    <MugenContainer
      answerPrefix=""
      message={message}
      onRefresh={handleRefresh}
    />
  );
};

export { Mugen as M71201 };

// 反対の意味の言葉を使う
const handleRefresh: RefreshFunction = (level, score) => {
  //   const allUnits = ["個", "円", "歩", "m", "km", "kg", "分", "時間", "日", "年"];
  const words: [string, string, string[]][] = [
    ["多い", "少ない", ["個", "円", "kg"]],
    ["長い", "短い", ["cm", "m", "分"]],
    ["増える", "減る", ["個", "円", "kg"]],
    ["足りない", "余る", ["個", "円", "m", "kg", "秒", "分"]],
    ["北へ", "南へ", ["km"]],
    ["東へ", "西へ", ["km"]],
    ["後", "前", ["歩", "m", "分", "時間", "日", "年"]],
    ["の利益", "の損失", ["円"]],
    ["の収入", "の支出", ["円"]],
    ["高い", "低い", ["cm", "m", "km", "度"]],
    ["高い", "安い", ["円"]],
    ["重い", "軽い", ["g", "kg"]],
  ];

  const idx = getRandomInt(words.length - 1);
  const units: string[] = words[idx][2];
  const unit = randArray(...units);

  let value = "";

  if (level === 1 || unit === "円") {
    value = seisuu();
  } else if (level === 2) {
    value = randArray(seisuu, syousuu)();
  } else {
    value = randArray(seisuu, syousuu, bunsuu)();
  }

  const sign_q = randArray("+", "-");
  const sign_a = sign_q === "+" ? "-" : "+";

  let word_q, word_a;
  if (randArray(true, false)) {
    word_q = words[idx][0];
    word_a = words[idx][1];
  } else {
    word_q = words[idx][1];
    word_a = words[idx][0];
  }

  const question = `${sign_q}${value}\\mbox{${unit} ${word_q}}\\quad\\mbox{[${word_a}]}`;
  const answer = `${sign_a}${value}\\mbox{${unit} ${word_a}}`;

  return [question, answer];
};

const seisuu = (): string => {
  const x = getRandomInt(499, 100);
  return String(x);
};

const syousuu = (): string => {
  const x = getRandomInt(499, 1);
  const y = getRandomInt(String(x).length, 1);
  return String(x * Math.pow(10, -y));
};

const bunsuu = (): string => {
  const n = getRandomInt(499, 100);
  const m = getRandomInt(9, 1);

  const x = new Fraction(n, m);
  return x.toLatex();
};
