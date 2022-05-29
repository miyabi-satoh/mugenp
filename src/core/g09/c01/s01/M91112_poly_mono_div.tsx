import { MugenP, GeneratorFunc } from "~/components/mugenp";
import { poly_mono } from "~/core";

// "id": "91112",
// "module": "poly_mono_div",
// "grade": "中3",
// "chapter": "式の展開と因数分解",
// "title": "\\( (a+b)\\div c \\) の計算",
// "message": "次の計算をしなさい。"
export const M91112 = () => {
  return <MugenP maxLv={5} generator={generatorFunc} />;
};

// 多項式 ÷ 単項式
const generatorFunc: GeneratorFunc = (level) => {
  let [polyAns, mono] = poly_mono(level);

  let poly = polyAns.mul(mono).compact().orderTo();
  if (level < 5 && poly.terms[0].isNegative) {
    poly = poly.neg();
    polyAns = polyAns.neg();
  }

  const question =
    poly.toLatex("()") +
    " \\div " +
    mono.toLatex({ brackets: mono.isNegative ? "()" : "" });
  const answer = polyAns.toLatex();
  return { question, answer };
};
