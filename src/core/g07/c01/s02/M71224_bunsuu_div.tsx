import { MugenContainer } from "~/components/container";
import { RefreshFunction } from "~/interfaces/types";
import { dsp, guard, randArray } from "~/utils";
import { Monomial } from "~/utils/monomial";

// "id": "71224",
// "module": "bunsuu_div",
// "grade": "中1",
// "chapter": "正の数・負の数",
// "section": "正の数・負の数の計算",
// "subsection": "正の数・負の数の乗法，除法",
// "title": "分数を含む除法",
// "message": "次の計算をしなさい。"
const Mugen = () => {
  return <MugenContainer onRefresh={handleRefresh} />;
};

export { Mugen as M71224 };

// 分数を含む除法
const handleRefresh: RefreshFunction = (level, score) => {
  // Lv1: 整数÷分数=整数
  // Lv2: 整数÷分数=分数
  // Lv3: 分数÷分数
  const idx = level - 1;
  const a = Monomial.create({
    max: 12,
    maxD: guard(idx, 1, 1, 8),
    maxN: 8,
    allowNegative: level > 2,
  });
  const b = Monomial.create({
    max: 12,
    maxD: 8,
    maxN: 8,
    allowNegative: true,
  });
  if (b.d === 1) {
    return ["", ""];
  }
  const c = a.div(b);

  if (level === 1) {
    if (a.d !== 1) {
      return ["", ""];
    }
    if (c.d !== 1) {
      return ["", ""];
    }
  } else if (level === 2) {
    if (a.d !== 1) {
      return ["", ""];
    }
  }

  const question =
    a.toLatex({ brackets: a.isNegative ? "()" : randArray("", "()") }) +
    " \\div " +
    b.toLatex({ brackets: b.isNegative ? "()" : randArray("", "()") });

  const answer = c.toLatex();

  return [dsp(question), dsp(answer)];
};
