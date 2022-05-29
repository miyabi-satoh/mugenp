import { GeneratorFunc, MugenP } from "~/components/mugenp";
import { dsp, getRandomInt, minMax, randArray } from "~/utils";
import { Term } from "~/utils/expression";

// "id": "71121",
// "module": "hantai",
// "grade": "中1",
// "chapter": "正の数・負の数",
// "section": "正の数・負の数",
// "subsection": "正の数・負の数で量を表す",
// "title": "反対の性質を持つ量",
// "message": "[ ]内の言葉を使って、次のことを表しなさい。"
export const M71121 = () => {
  return (
    <MugenP
      answerPrefix=""
      displayStyle={false}
      maxLv={3}
      generator={generatorFunc}
    />
  );
};

// 反対の意味の言葉を使う
const generatorFunc: GeneratorFunc = (level) => {
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
    mode = getRandomInt(minMax(1, level, 3), 1);
  }

  // 数値モードに応じて問題の数値を決定
  let decimal = false;
  let qValue: Term;
  if (mode == 1) {
    // 整数
    qValue = new Term(getRandomInt(100, 1) * randArray(1, -1));
  } else if (mode == 2) {
    // 小数
    // 場合分けにより、以下のパターンをバランスよく作る
    //   0.X
    //   X.X
    //  XX.X

    // 整数部
    let num = randArray(0, 1, 10);
    if (num == 1) {
      num *= getRandomInt(9, 1);
    } else if (num == 10) {
      num = getRandomInt(99, 10);
    }
    // 小数部
    let double = getRandomInt(9, 1);
    qValue = new Term(`${num}.${double}`);
    decimal = true;
  } else {
    // 分数
    qValue = new Term(getRandomInt(10, 1) / 12);
  }

  // 問題と正解の数値を文字列化
  const sign = true;
  const qStr = dsp(qValue.toLatex({ sign, decimal }));
  const aStr = dsp(qValue.neg().toLatex({ sign, decimal }));

  const question = `${qStr}${unit} ${words[0]}　[${words[1]}]`;
  const answer = `${aStr}${unit} ${words[1]}`;

  return { question, answer };
};
