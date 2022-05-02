import { RefreshFunction } from "~/interfaces/types";
import { MugenContainer } from "~/components/container";
import { wa_to_sa_no_seki } from "~/core";
import { drawLots, gcd } from "~/utils";
import { Monomial } from "~/utils/monomial";
import { Polynomial } from "~/utils/polynomial";

// "id": "91402",
// "module": "wa_to_sa_no_bunkai",
// "grade": "中3",
// "chapter": "式の展開と因数分解",
// "title": "\\( (a^2 - b^2) \\) の因数分解",
// "message": "次の式を因数分解しなさい。"
type Props = {
  message: string;
};
const Mugen = ({ message }: Props) => {
  return <MugenContainer message={message} onRefresh={handleRefresh} />;
};

export { Mugen as M91402 };

// 和と差の公式：(a + b)(a - b)
const handleRefresh: RefreshFunction = (level, score) => {
  let ax = Monomial.create({
    factors: "x",
    max: [1, 2, 3, 4, 5, 6, 9][level - 1],
    maxD: [1, 1, 1, 1, 5, 5, 5][level - 1],
    maxN: [1, 1, 1, 1, 5, 5, 5][level - 1],
    allowNegative: level > 5,
  });
  let b = Monomial.create({
    factors: drawLots(Math.max(50, 95 - level * 10), "", "y"),
    max: 9,
    maxD: [1, 1, 1, 2, 5, 5, 5][level - 1],
    maxN: [1, 1, 1, 3, 5, 5, 5][level - 1],
    allowNegative: true,
  });

  if (ax.isInteger && b.isInteger) {
    const g = gcd(ax.coeff.valueOf, b.coeff.valueOf);
    ax = ax.div(g);
    b = b.div(g);
  }

  const p1 = new Polynomial(ax, b);
  const p2 = new Polynomial(ax, b.mul(-1));

  const question = p1.mul(p2).compact().toLatex();
  const answer = p1.toLatex("()") + p2.toLatex("()");

  return [question, answer];
};
