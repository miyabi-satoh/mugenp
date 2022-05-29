import { MugenP, GeneratorFunc } from "~/components/mugenp";
import { guard, randArray } from "~/utils";
import { Monomial, TermSpec } from "~/utils/monomial";
import { Polynomial } from "~/utils/polynomial";

// "id": "91134",
// "module": "waseki_no_bunkai",
// "grade": "中3",
// "chapter": "式の展開と因数分解",
// "title": "\\( x^2 + (a+b)x +ab \\) の因数分解",
// "message": "次の式を因数分解しなさい。"
export const M91134 = () => {
  return <MugenP maxLv={7} generator={waseki_no_bunkai} />;
};

// 和積の公式：(x + b)(x + c)
export const waseki_no_bunkai: GeneratorFunc = (level) => {
  const idx = level - 1;
  const bcSpec: TermSpec = {
    factors: level > 2 ? randArray("", "y") : "",
    max: guard(idx, 3, 4, 5, 7, 9, 11, 13),
    allowNegative: true,
  };
  const b = Monomial.create(bcSpec);
  const c = Monomial.create(bcSpec);

  if (b.coeff.abs().compare(c.coeff.abs()) == 0) {
    // 平方公式、和と差の公式の問題になってしまうのでスキップ
    return null;
  }
  const ax = Monomial.create({
    factors: "x",
  });

  const p1 = new Polynomial(ax, b);
  const p2 = new Polynomial(ax, c);
  const question = p1.mul(p2).compact().toLatex();
  const answer = p1.toLatex("()") + p2.toLatex("()");
  return { question, answer };
};
