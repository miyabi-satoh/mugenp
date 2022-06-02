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

  const rhsValue = () => {
    if (level == 1) {
      return getRandomInt(9, 1);
    } else if (level == 2) {
      return getRandomInt(-9, -1);
    }

    return getRandomInt(9, 1) * randArray(1, -1);
  };

  const getBrackets = (x: Term) => (x.s < 0 ? "()" : randArray("", "()"));

  const lhs = new Term(getRandomInt(9, 1) * randArray(1, -1));
  const rhs = new Term(rhsValue());
  const question =
    lhs.toLatex({ brackets: getBrackets(lhs) }) +
    " \\times " +
    rhs.toLatex({ brackets: getBrackets(rhs) });

  const answer = lhs.mul(rhs).toLatex();

  return { question, answer };
};
