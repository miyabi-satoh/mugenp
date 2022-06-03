import { MugenP, GeneratorFunc } from "~/components/mugenp";
import { getRandomInt, guard, randArray } from "~/utils";
import { Term } from "~/utils/expression";

// "id": "71224",
// "module": "bunsuu_div",
// "grade": "中1",
// "chapter": "正の数・負の数",
// "section": "正の数・負の数の計算",
// "subsection": "正の数・負の数の乗法，除法",
// "title": "分数を含む除法",
// "message": "次の計算をしなさい。"
export const M71224 = () => {
  return <MugenP maxLv={3} generator={generatorFunc} />;
};

// 分数を含む除法
const generatorFunc: GeneratorFunc = (level) => {
  // Lv1: 整数÷分数=整数
  // Lv2: 整数÷分数=分数
  // Lv3: 分数÷分数
  let rhs = new Term(
    getRandomInt(12, 1) * randArray(1, -1),
    getRandomInt(10, 2)
  );
  let ans;
  if (level == 1) {
    ans = new Term(getRandomInt(9, 1) * randArray(1, -1));
  } else {
    const d = getRandomInt(9, level == 2 ? 2 : 1);
    ans = new Term(getRandomInt(16, 1) * randArray(1, -1), d);
  }
  const lhs = rhs.mul(ans);

  if (rhs.c.d == 1) {
    return null;
  }
  if (level == 1) {
    // 整数÷分数＝整数
    if (lhs.c.d != 1 || rhs.c.d == 1 || ans.c.d != 1) {
      return null;
    }
    // 整数と分子が同じ数
    if (lhs.c.n == rhs.c.n) {
      return null;
    }
  } else if (level === 2) {
    // 整数÷分数＝分数
    if (lhs.c.d != 1 || rhs.c.d == 1 || ans.c.d == 1) {
      return null;
    }
    // 約分が発生しない
    if (rhs.c.n == ans.c.d) {
      return null;
    }
  } else {
    // 約分が発生しない
    if (lhs.c.d * rhs.c.n == ans.c.d) {
      return null;
    }
  }

  const getBrackets = (x: number) => (x < 0 ? "()" : randArray("", "()"));
  const question =
    lhs.toLatex({ brackets: getBrackets(lhs.c.s) }) +
    " \\div " +
    rhs.toLatex({ brackets: getBrackets(rhs.c.s) });

  const answer = ans.toLatex();

  return { question, answer };
};
