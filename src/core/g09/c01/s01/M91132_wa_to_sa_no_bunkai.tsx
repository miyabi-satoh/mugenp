import { MugenP, GeneratorFunc } from "~/components/mugenp";
import { gcd, guard, randArray } from "~/utils";
import { Monomial } from "~/utils/monomial";
import { Polynomial } from "~/utils/polynomial";

// "id": "91132",
// "module": "wa_to_sa_no_bunkai",
// "grade": "中3",
// "chapter": "式の展開と因数分解",
// "title": "\\( (a^2 - b^2) \\) の因数分解",
// "message": "次の式を因数分解しなさい。"
export const M91132 = () => {
  return <MugenP generator={wa_to_sa_no_bunkai} />;
};

// 和と差の公式：(a + b)(a - b)
export const wa_to_sa_no_bunkai: GeneratorFunc = (level) => {
  const idx = level - 1;
  let ax = Monomial.create({
    factors: "x",
    max: guard(idx, 1, 2, 3, 4, 5, 6, 9),
    maxD: guard(idx, 1, 1, 1, 1, 5),
    maxN: guard(idx, 1, 1, 1, 1, 5),
    allowNegative: level > 5,
  });
  let b = Monomial.create({
    factors: level > 2 ? randArray("", "y") : "",
    max: guard(idx, 3, 5, 7, 9, 11, 13),
    maxD: guard(idx, 1, 1, 1, 2, 5),
    maxN: guard(idx, 1, 1, 1, 3, 5),
    allowNegative: true,
  });

  if (ax.isInteger && b.isInteger) {
    const g = gcd(ax.coeff.valueOf(), b.coeff.valueOf());
    ax = ax.div(g);
    b = b.div(g);
  }

  const p1 = new Polynomial(ax, b);
  const p2 = new Polynomial(ax, b.neg());

  const question = p1.mul(p2).compact().toLatex();
  const answer = p1.toLatex("()") + p2.toLatex("()");

  return { question, answer };
};
