import { MugenContainer } from "~/components/container";
import { RefreshFunction, TermSpec } from "~/interfaces/types";
import { byScore, guard } from "~/utils";
import { Monomial } from "~/utils/monomial";
import { Polynomial } from "~/utils/polynomial";

// "id": "91404",
// "module": "waseki_no_bunkai",
// "grade": "中3",
// "chapter": "式の展開と因数分解",
// "title": "\\( x^2 + (a+b)x +ab \\) の因数分解",
// "message": "次の式を因数分解しなさい。"
type Props = {
  message: string;
};
const Mugen = ({ message }: Props) => {
  return (
    <MugenContainer maxLv={7} message={message} onRefresh={handleRefresh} />
  );
};

export { Mugen as M91404 };
export { handleRefresh as waseki_no_bunkai };

// 和積の公式：(x + b)(x + c)
const handleRefresh: RefreshFunction = (level, score) => {
  const idx = level - 1;
  const bcSpec: TermSpec = {
    factors: byScore(score, "", "y"),
    max: guard(idx, 3, 4, 5, 7, 9, 11, 13),
    allowNegative: true,
  };
  const b = Monomial.create(bcSpec);
  const c = Monomial.create(bcSpec);

  if (b.coeff.resembles(c.coeff)) {
    // 平方公式、和と差の公式の問題になってしまうのでスキップ
    return ["", ""];
  }
  const ax = Monomial.create({
    factors: "x",
  });

  const p1 = new Polynomial(ax, b);
  const p2 = new Polynomial(ax, c);
  const question = p1.mul(p2).compact().toLatex();
  const answer = p1.toLatex("()") + p2.toLatex("()");
  return [question, answer];
};