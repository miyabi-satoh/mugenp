import { MugenP, GeneratorFunc } from "~/components/mugenp";
import { guard, randArray } from "~/utils";
import { Monomial } from "~/utils/monomial";
import { Polynomial } from "~/utils/polynomial";

// "id": "91122",
// "module": "heihou_kousiki",
// "grade": "中3",
// "chapter": "式の展開と因数分解",
// "title": "\\((a\\pm b)^2\\) の展開",
// "message": "次の式を展開しなさい。"
export const M91122 = () => {
  return <MugenP maxLv={7} generator={heihou_kousiki} />;
};

// 平方公式：(a + b)^2
export const heihou_kousiki: GeneratorFunc = (level) => {
  const idx = level - 1;
  const ax = Monomial.create({
    factors: "x",
    max: guard(idx, 1, 1, 2, 3, 3, 9),
    maxD: guard(idx, 1, 1, 1, 1, 5),
    maxN: guard(idx, 1, 1, 1, 1, 5),
    allowNegative: level > 4,
  });
  const b = Monomial.create({
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
  } else if (level === 5) {
    if (ax.isNegative && (ax.isFrac || b.isFrac)) {
      return null;
    }
  }

  const p = new Polynomial(ax, b);
  const question = p.toLatex("()") + "^2";
  const answer = p.mul(p).compact().toLatex();
  return { question, answer };
};
