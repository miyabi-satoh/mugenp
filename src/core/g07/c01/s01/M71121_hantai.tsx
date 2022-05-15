import Fraction from "fraction.js";
import { MugenContainer } from "~/components/container";
import { RefreshFunction } from "~/interfaces/types";
import { dsp, getRandomInt, randArray } from "~/utils";
import { LatexOptions, Monomial } from "~/utils/monomial";
// import { Fraction } from "~/utils/fraction";

// "id": "71121",
// "module": "hantai",
// "grade": "中1",
// "chapter": "正の数・負の数",
// "section": "正の数・負の数",
// "subsection": "正の数・負の数で量を表す",
// "title": "反対の性質を持つ量",
// "message": "[ ]内の言葉を使って、次のことを表しなさい。"
const Mugen = () => {
  return <MugenContainer answerPrefix="" maxLv={3} onRefresh={handleRefresh} />;
};

export { Mugen as M71121 };

// 反対の意味の言葉を使う
const handleRefresh: RefreshFunction = (level, score) => {
  // 問題パターン
  const patterns: [string, string, string[]][] = [
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

  // 使用する問題パターンをランダムに決定
  const pattern = patterns[getRandomInt(patterns.length - 1)];
  const unit = randArray(...pattern[2]);
  // 表現もランダムに入れ替え
  const words = pattern.slice(0, 2);
  if (randArray(true, false)) {
    words.reverse();
  }

  // レベルに応じて数値モードを決定
  let mode: number;
  if (level === 1 || ["円", "個"].includes(unit)) {
    mode = 1;
  } else {
    mode = getRandomInt(level, 1);
  }

  // 数値モードに応じて問題の数値を決定
  const opt: LatexOptions = {
    sign: true,
  };
  let qValue: Monomial;
  switch (mode) {
    case 1:
      qValue = seisuu();
      break;
    case 2:
      qValue = syousuu();
      opt.decimal = true;
      break;
    default:
      qValue = bunsuu();
  }

  // 問題と正解の数値を文字列化
  const qStr = dsp(qValue.toLatex(opt));
  const aStr = dsp(qValue.neg().toLatex(opt));

  const question = `${qStr}${unit} ${words[0]}　[${words[1]}]`;
  const answer = `${aStr}${unit} ${words[1]}`;

  return [question, answer];
};

const seisuu = (): Monomial => {
  return Monomial.create({
    max: 100,
    allowNegative: true,
  });
};

const syousuu = (): Monomial => {
  const m = Monomial.create({
    max: 100,
    allowNegative: true,
  });
  const y = getRandomInt(m.toString().length, 1);
  return m.div(Math.pow(10, y));
};

const bunsuu = (): Monomial => {
  return Monomial.create({
    max: 12,
    maxD: 12,
    maxN: 12,
    allowNegative: true,
  });
};
