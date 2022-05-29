import { MugenP, GeneratorFunc } from "~/components/mugenp";
import { getRandomInt, randArray } from "~/utils";
import { Term } from "~/utils/expression";

// "id": "71223",
// "module": "bunsuu_mul",
// "grade": "中1",
// "chapter": "正の数・負の数",
// "section": "正の数・負の数の計算",
// "subsection": "正の数・負の数の乗法，除法",
// "title": "分数を含む乗法",
// "message": "次の計算をしなさい。"
export const M71223 = () => {
  return <MugenP maxLv={3} generator={generatorFunc} />;
};

// 分数を含む乗法
const generatorFunc: GeneratorFunc = (level) => {
  // Lv1: 整数×分数=整数
  // Lv2: 整数×分数=分数
  // Lv3: 分数×分数

  let rhs = new Term(
    getRandomInt(10, 1) * randArray(1, -1),
    getRandomInt(12, 2)
  );
  let lhs;
  if (level <= 2) {
    lhs = new Term(getRandomInt(18, 2) * randArray(1, -1));
  } else {
    lhs = new Term(getRandomInt(18, 1) * randArray(1, -1), getRandomInt(12, 2));
  }
  const ans = new Term(rhs.c.mul(lhs.c));

  if (level == 1) {
    if (lhs.c.d != 1 || rhs.c.d == 1 || ans.c.d != 1) {
      return null;
    }
    if (lhs.c.abs().equals(rhs.c.d)) {
      return null;
    }
  } else if (level === 2) {
    if (lhs.c.d != 1 || rhs.c.d == 1 || ans.c.d == 1) {
      return null;
    }
  } else {
    if (lhs.c.d * rhs.c.d == ans.c.d) {
      return null;
    }
  }

  if (rhs.c.d == ans.c.d) {
    return null;
  }

  const getBrackets = (x: number) => (x < 0 ? "()" : randArray("", "()"));
  const question =
    lhs.toLatex({ brackets: getBrackets(lhs.c.s) }) +
    " \\times " +
    rhs.toLatex({ brackets: getBrackets(rhs.c.s) });

  const answer = ans.toLatex();

  return { question, answer };
};
