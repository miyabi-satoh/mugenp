import { MugenP, GeneratorFunc } from "~/components/mugenp";
import { dsp, getRandomInt, randArray } from "~/utils";

// "id": "71122",
// "module": "kijun",
// "grade": "中1",
// "chapter": "正の数・負の数",
// "section": "正の数・負の数",
// "subsection": "正の数・負の数で量を表す",
// "title": "基準からの増減や過不足",
// "message": "次の問いに答えなさい。"
export const M71122 = () => {
  return (
    <MugenP answerPrefix="" maxLv={3} columns={1} generator={generatorFunc} />
  );
};

// 基準とした量からの増減や過不足
const generatorFunc: GeneratorFunc = (level) => {
  const patterns = [
    [
      "{base}{unit}を基準としたとき、{x}{unit}を符号を使って表しなさい。",
      "{diff}{unit}",
    ],
    [
      "{base}{unit}を基準にして{diff}{unit}と表すとき、実際には何{unit}のことですか。",
      "{x}{unit}",
    ],
    [
      "ある数を基準にして、{x}を{diff}と表すとき、基準となる数を答えなさい。",
      "{base}",
    ],
  ];
  const units = ["個", "円", "歩", "m", "km", "kg", "分", "時間", "日", "年"];

  const unit = randArray(...units);
  const pattern = randArray(...patterns);
  const base = getRandomInt(60, 40);

  let diff: number;
  if (level == 1) {
    // 繰り上がり・繰り下がりが無いようにする
    const num = base % 10;
    const array: number[] = [];
    for (let i = 3; i <= num; i++) {
      array.push(i * -1);
    }
    for (let i = 3; i <= 9 - num; i++) {
      array.push(i);
    }
    diff = randArray(...array);
  } else if (level == 2) {
    diff = getRandomInt(9, 1) * randArray(1, -1);
  } else {
    diff = getRandomInt(19, 6) * randArray(1, -1);
  }
  const x = base + diff;
  const strDiff = `${diff > 0 ? "+" : ""}${diff}`;
  const [question, answer] = pattern.map((p) => {
    return p
      .replaceAll("{base}", dsp(String(base)))
      .replaceAll("{unit}", unit)
      .replaceAll("{x}", dsp(String(x)))
      .replaceAll("{diff}", dsp(strDiff));
  });

  return { question, answer };
};
