import { MugenContainer } from "~/components/container";
import { RefreshFunction } from "~/interfaces/types";
import { dsp, getRandomInt, guard, randArray } from "~/utils";
import { Monomial } from "~/utils/monomial";

// "id": "71122",
// "module": "kijun",
// "grade": "中1",
// "chapter": "正の数・負の数",
// "section": "正の数・負の数",
// "subsection": "正の数・負の数で量を表す",
// "title": "基準からの増減や過不足",
// "message": "次の問いに答えなさい。"
const Mugen = () => {
  return (
    <MugenContainer answerPrefix="" columns={1} onRefresh={handleRefresh} />
  );
};

export { Mugen as M71122 };

// 基準とした量からの増減や過不足
const handleRefresh: RefreshFunction = (level, score) => {
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

  const idx = level - 1;
  const base = getRandomInt(60, 40);
  const diff = Monomial.create({
    max: guard(idx, 5, 11, 19),
    allowNegative: true,
  });
  const x = diff.coeff.add(base);
  const unit = randArray(...units);

  const pattern = randArray(...patterns);
  let question = "";
  let answer = "";
  [question, answer] = pattern.map((p) => {
    return p
      .replaceAll("{base}", dsp(String(base)))
      .replaceAll("{unit}", unit)
      .replaceAll("{x}", dsp(x.toLatex()))
      .replaceAll("{diff}", dsp(diff.toLatex({ sign: true })));
  });

  return [question, answer];
};
