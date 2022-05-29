import { MugenP, GeneratorFunc } from "~/components/mugenp";
import { dsp, gcd } from "~/utils";
import { poly_mono } from ".";

// "id": "91131",
// "module": "kyoutuu_bunkai",
// "grade": "中3",
// "chapter": "式の展開と因数分解",
// "title": "共通因数でくくる",
// "message": "次の式を因数分解しなさい。"
export const M91131 = () => {
  return <MugenP maxLv={5} generator={kyoutuu_bunkai} />;
};

// 共通因数でくくる
export const kyoutuu_bunkai: GeneratorFunc = (level) => {
  let [poly, mono] = poly_mono(level);
  if (poly.terms.find((x) => x.isFrac)) {
    return { question: "", answer: "" };
  }
  if (mono.isFrac) {
    return { question: "", answer: "" };
  }
  if (poly.terms[0].isNegative) {
    poly = poly.neg();
  }
  if (mono.isNegative) {
    mono = mono.neg();
  }

  const g = gcd(...poly.terms.map((x) => x.coeff.valueOf()));
  poly = poly.div(g);
  mono = mono.mul(g);

  const question = dsp(poly.mul(mono).toLatex());
  const answer = dsp(mono.toLatex() + poly.toLatex("()"));
  return { question, answer };
};
