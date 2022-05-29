import { MugenP, GeneratorFunc } from "~/components/mugenp";
import { randArray } from "~/utils";
import { Monomial } from "~/utils/monomial";

// "id": "71222",
// "module": "jyohou",
// "grade": "中1",
// "chapter": "正の数・負の数",
// "section": "正の数・負の数の計算",
// "subsection": "正の数・負の数の乗法，除法",
// "title": "正の数・負の数の除法",
// "message": "次の計算をしなさい。"
export const M71222 = () => {
  return <MugenP maxLv={3} generator={generatorFunc} />;
};

// 正の数・負の数の除法
const generatorFunc: GeneratorFunc = (level) => {
  // Lv1: 正の数でわる
  // Lv2: 負の数でわる
  // Lv3: 混合
  const c = Monomial.create({
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
  const a = b.mul(c);

  const question =
    a.toLatex({ brackets: a.isNegative ? "()" : randArray("", "()") }) +
    " \\div " +
    b.toLatex({ brackets: b.isNegative ? "()" : randArray("", "()") });

  const answer = c.toLatex();

  return { question, answer };
};
