import { MugenP, GeneratorFunc } from "~/components/mugenp";
import { getRandomInt, randArray } from "~/utils";
import { Term } from "~/utils/expression";

// "id": "71212",
// "module": "genpou_kihon",
// "grade": "中1",
// "chapter": "正の数・負の数",
// "section": "正の数・負の数の計算",
// "subsection": "正の数・負の数の加法，減法",
// "title": "減法の基本",
// "message": "次の計算をしなさい。"
export const M71212 = () => {
  return <MugenP maxLv={3} generator={genpou_kihon} />;
};

// 減法の基本
export const genpou_kihon: GeneratorFunc = (level) => {
  // Lv1: −正の数
  // Lv2: −負の数
  // Lv3: ミックス
  const lhs = getRandomInt(9) * randArray(1, -1, -1);

  let rhs;
  if (level == 1) {
    rhs = getRandomInt(9, 1);
  } else if (level == 2) {
    rhs = getRandomInt(9, 1) * randArray(1, -1);
  } else {
    rhs = getRandomInt(9, lhs == 0 ? 1 : 0) * randArray(1, -1);
  }

  const brackets = "()";
  const question =
    new Term(lhs).toLatex({ brackets }) +
    " - " +
    new Term(rhs).toLatex({ brackets });
  const answer = new Term(lhs - rhs).toLatex();

  return { question, answer };
};
