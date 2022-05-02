import { MugenContainer } from "~/components/container";
import { RefreshFunction } from "~/interfaces/types";
import { drawLots, gcd } from "~/utils";
import { Monomial } from "~/utils/monomial";
import { Polynomial } from "~/utils/polynomial";

// "id": "91403",
// "module": "heihou_bunkai",
// "grade": "中3",
// "chapter": "式の展開と因数分解",
// "title": "\\( a^2 \\pm 2ab +b^2 \\) の因数分解",
// "message": "次の式を因数分解しなさい。"
type Props = {
  message: string;
};
const Mugen = ({ message }: Props) => {
  return <MugenContainer message={message} onRefresh={handleRefresh} />;
};

export { Mugen as M91403 };

// 平方公式：(a + b)^2
const handleRefresh: RefreshFunction = (level, score) => {
  let ax = Monomial.create({
    factors: "x",
    max: [1, 1, 2, 3, 3, 9, 9][level - 1],
    maxD: [1, 1, 1, 1, 5, 5, 5][level - 1],
    maxN: [1, 1, 1, 1, 5, 5, 5][level - 1],
  });
  let b = Monomial.create({
    factors: drawLots(Math.max(50, 100 - level * 10), "", "y"),
    max: [5, 6, 7, 8, 9, 9, 9][level - 1],
    maxD: [1, 1, 1, 2, 5, 5, 5][level - 1],
    maxN: [1, 1, 1, 3, 5, 5, 5][level - 1],
    allowNegative: true,
  });

  // 絶対値が同じだと、変な感じがする
  if (!ax.coeff.resembles(1) && ax.coeff.resembles(b.coeff)) {
    return ["", ""];
  }

  if (level === 4) {
    if (b.isFrac && !ax.coeff.equals(1)) {
      return ["", ""];
    }
  }

  const g = gcd(ax.coeff.n, b.coeff.n);
  ax = ax.div(g);
  b = b.div(g);

  const p = new Polynomial(ax, b);
  const question = p.mul(p).compact().toLatex();
  const answer = p.toLatex("()") + "^2";
  return [question, answer];
};
