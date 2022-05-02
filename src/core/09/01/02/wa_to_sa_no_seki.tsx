import { drawLots } from "~/utils";
import { RefreshFunction } from "~/interfaces/types";
import { MugenContainer } from "~/components/container";
import { Monomial } from "~/utils/monomial";
import { Polynomial } from "~/utils/polynomial";

// "id": "91203",
// "module": "wa_to_sa_no_seki",
// "grade": "中3",
// "chapter": "式の展開と因数分解",
// "title": "\\((a + b)(a - b)\\) の展開",
// "message": "次の式を展開しなさい。"
type Props = {
  message: string;
};
const Mugen = ({ message }: Props) => {
  return <MugenContainer message={message} onRefresh={handleRefresh} />;
};

export { Mugen as M91203 };
export { handleRefresh as wa_to_sa_no_seki };

// 和と差の公式：(a + b)(a - b)
const handleRefresh: RefreshFunction = (level, score) => {
  const ax = Monomial.create({
    factors: "x",
    max: [1, 2, 3, 4, 5, 6, 9][level - 1],
    maxD: [1, 1, 1, 1, 5, 5, 5][level - 1],
    maxN: [1, 1, 1, 1, 5, 5, 5][level - 1],
    allowNegative: level > 5,
  });
  const b = Monomial.create({
    factors: drawLots(Math.max(50, 95 - level * 10), "", "y"),
    max: 9,
    maxD: [1, 1, 1, 2, 5, 5, 5][level - 1],
    maxN: [1, 1, 1, 3, 5, 5, 5][level - 1],
    allowNegative: true,
  });

  const p1 = new Polynomial(ax, b);
  const p2 = new Polynomial(ax, b.mul(-1));

  const question = p1.toLatex("()") + p2.toLatex("()");
  const answer = p1.mul(p2).compact().toLatex();

  return [question, answer];
};
