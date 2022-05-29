import { MugenP, GeneratorFunc } from "~/components/mugenp";
import { getRandomInt, randArray } from "~/utils";
import { Term } from "~/utils/expression";

// "id": "71214",
// "module": "kakko_nasi",
// "grade": "中1",
// "chapter": "正の数・負の数",
// "section": "正の数・負の数の計算",
// "subsection": "正の数・負の数の加法，減法",
// "title": "カッコのない加減法",
// "message": "次の計算をしなさい。"
export const M71214 = () => {
  return <MugenP maxLv={3} generator={generatorFunc} />;
};

// カッコのない加減法
const generatorFunc: GeneratorFunc = (level) => {
  // Lv1: 正の数に
  // Lv2: 負の数に
  // Lv3: ミックス

  let lhs;
  let rhs;
  if (level == 1) {
    lhs = getRandomInt(9, 1);
    rhs = getRandomInt(9, 1) * randArray(1, -1);
  } else if (level == 2) {
    lhs = getRandomInt(-9, -1);
    rhs = getRandomInt(9, 1) * randArray(1, -1);
  } else {
    lhs = getRandomInt(9) * randArray(1, -1);
    rhs = getRandomInt(9, lhs == 0 ? 1 : 0) * randArray(1, -1);
  }

  const zeroSign = rhs == 0 ? randArray("+", "-") : "";
  const sign = true;
  const question =
    new Term(lhs).toLatex() + zeroSign + new Term(rhs).toLatex({ sign });
  const answer = new Term(lhs + rhs).toLatex();

  return { question, answer };
};
