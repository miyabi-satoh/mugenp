import { MugenP, GeneratorFunc } from "~/components/mugenp";
import { getRandomInt, randArray } from "~/utils";
import { Term } from "~/utils/expression";

// "id": "71221",
// "module": "jyouhou",
// "grade": "中1",
// "chapter": "正の数・負の数",
// "section": "正の数・負の数の計算",
// "subsection": "正の数・負の数の乗法，除法",
// "title": "正の数・負の数の乗法",
// "message": "次の計算をしなさい。"
export const M71221 = () => {
  return <MugenP maxLv={3} generator={generatorFunc} />;
};

// 正の数・負の数の乗法
const generatorFunc: GeneratorFunc = (level) => {
  // Lv1: 正の数をかける
  // Lv2: 負の数をかける
  // Lv3: 混合

  const lhs = getRandomInt(9, 1) * randArray(1, -1);
  let rhs;
  if (level == 1) {
    rhs = getRandomInt(9, 1);
  } else if (level == 2) {
    rhs = getRandomInt(-9, -1);
  } else {
    rhs = getRandomInt(9, 1) * randArray(1, -1);
  }

  const getBrackets = (x: number) => (x < 0 ? "()" : randArray("", "()"));
  const question =
    new Term(lhs).toLatex({ brackets: getBrackets(lhs) }) +
    " \\times " +
    new Term(rhs).toLatex({ brackets: getBrackets(rhs) });

  const answer = new Term(lhs * rhs).toLatex();

  return { question, answer };
};
