import { MugenP, GeneratorFunc } from "~/components/mugenp";
import { randArray } from "~/utils";
import { Monomial } from "~/utils/monomial";

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
  const a = Monomial.create({
    max: 9,
    allowNegative: true,
  });
  let b = Monomial.create({
    max: 9,
    allowNegative: level > 2,
  });
  if (level === 2) {
    // Lv2は符号反転することで必ず負の数にしている
    b = b.neg();
  }

  const question =
    a.toLatex({ brackets: a.isNegative ? "()" : randArray("", "()") }) +
    " \\times " +
    b.toLatex({ brackets: b.isNegative ? "()" : randArray("", "()") });

  const answer = a.mul(b).toLatex();

  return { question, answer };
};
