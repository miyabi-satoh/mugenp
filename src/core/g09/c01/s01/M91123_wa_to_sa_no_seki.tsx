import { MugenP, GeneratorFunc } from "~/components/mugenp";
import { dsp, guard, randArray } from "~/utils";
import { Monomial } from "~/utils/monomial";
import { Polynomial } from "~/utils/polynomial";

// "id": "91123",
// "module": "wa_to_sa_no_seki",
// "grade": "中3",
// "chapter": "式の展開と因数分解",
// "title": "\\((a + b)(a - b)\\) の展開",
// "message": "次の式を展開しなさい。"
export const M91123 = () => {
  return <MugenP maxLv={7} generator={wa_to_sa_no_seki} />;
};

// 和と差の公式：(a + b)(a - b)
export const wa_to_sa_no_seki: GeneratorFunc = (level) => {
  const idx = level - 1;
  const ax = Monomial.create({
    factors: "x",
    max: guard(idx, 1, 2, 3, 4, 5, 6, 9),
    maxD: guard(idx, 1, 1, 1, 1, 5),
    maxN: guard(idx, 1, 1, 1, 1, 5),
    allowNegative: level > 5,
  });
  const b = Monomial.create({
    factors: level > 2 ? randArray("", "y") : "",
    max: 9,
    maxD: guard(idx, 1, 1, 1, 2, 5),
    maxN: guard(idx, 1, 1, 1, 3, 5),
    allowNegative: true,
  });

  const p1 = new Polynomial(ax, b);
  const p2 = new Polynomial(ax, b.neg());

  const question = dsp(p1.toLatex("()") + p2.toLatex("()"));
  const answer = dsp(p1.mul(p2).compact().toLatex());

  return { question, answer };
};
