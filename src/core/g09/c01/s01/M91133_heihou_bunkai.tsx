import { MugenP, GeneratorFunc } from "~/components/mugenp";
import { gcd, guard, randArray } from "~/utils";
import { Monomial } from "~/utils/monomial";
import { Polynomial } from "~/utils/polynomial";

// "id": "91133",
// "module": "heihou_bunkai",
// "grade": "中3",
// "chapter": "式の展開と因数分解",
// "title": "\\( a^2 \\pm 2ab +b^2 \\) の因数分解",
// "message": "次の式を因数分解しなさい。"
export const M91133 = () => {
  return <MugenP maxLv={6} generator={heihou_bunkai} />;
};

// 平方公式：(a + b)^2
export const heihou_bunkai: GeneratorFunc = (level) => {
  const idx = level - 1;
  let ax = Monomial.create({
    factors: "x",
    max: guard(idx, 1, 1, 2, 3, 3, 9),
    maxD: guard(idx, 1, 1, 1, 1, 5),
    maxN: guard(idx, 1, 1, 1, 1, 5),
  });
  let b = Monomial.create({
    factors: level > 2 ? randArray("", "y") : "",
    max: guard(idx, 5, 6, 7, 8, 9),
    maxD: guard(idx, 1, 1, 1, 2, 5),
    maxN: guard(idx, 1, 1, 1, 3, 5),
    allowNegative: true,
  });

  // 絶対値が同じだと、変な感じがする
  if (
    ax.coeff.abs().compare(1) != 0 &&
    ax.coeff.abs().compare(b.coeff.abs()) == 0
  ) {
    return null;
  }

  if (level === 4) {
    if (b.isFrac && !ax.coeff.equals(1)) {
      return null;
    }
  }

  const g = gcd(ax.coeff.n, b.coeff.n);
  ax = ax.div(g);
  b = b.div(g);

  const p = new Polynomial(ax, b);
  const question = p.mul(p).compact().toLatex();
  const answer = p.toLatex("()") + "^2";
  return { question, answer };
};
