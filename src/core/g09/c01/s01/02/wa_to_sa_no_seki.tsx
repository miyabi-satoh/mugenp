import { byScore, dsp, guard } from "~/utils";
import { RefreshFunction } from "~/interfaces/types";
import { MugenContainer } from "~/components/container";
import { Monomial } from "~/utils/monomial";
import { Polynomial } from "~/utils/polynomial";

// "id": "91123",
// "module": "wa_to_sa_no_seki",
// "grade": "中3",
// "chapter": "式の展開と因数分解",
// "title": "\\((a + b)(a - b)\\) の展開",
// "message": "次の式を展開しなさい。"
type Props = {
  message: string;
};
const Mugen = ({ message }: Props) => {
  return (
    <MugenContainer maxLv={7} message={message} onRefresh={handleRefresh} />
  );
};

export { Mugen as M91123 };
export { handleRefresh as wa_to_sa_no_seki };

// 和と差の公式：(a + b)(a - b)
const handleRefresh: RefreshFunction = (level, score) => {
  const idx = level - 1;
  const ax = Monomial.create({
    factors: "x",
    max: guard(idx, 1, 2, 3, 4, 5, 6, 9),
    maxD: guard(idx, 1, 1, 1, 1, 5),
    maxN: guard(idx, 1, 1, 1, 1, 5),
    allowNegative: level > 5,
  });
  const b = Monomial.create({
    factors: byScore(score, "", "y"),
    max: 9,
    maxD: guard(idx, 1, 1, 1, 2, 5),
    maxN: guard(idx, 1, 1, 1, 3, 5),
    allowNegative: true,
  });

  const p1 = new Polynomial(ax, b);
  const p2 = new Polynomial(ax, b.neg);

  const question = p1.toLatex("()") + p2.toLatex("()");
  const answer = p1.mul(p2).compact().toLatex();

  return [dsp(question), dsp(answer)];
};
