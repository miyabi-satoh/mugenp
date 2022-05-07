import { MugenContainer } from "~/components/container";
import { RefreshFunction } from "~/interfaces/types";
import { byScore, dsp, gcd, guard } from "~/utils";
import { Monomial } from "~/utils/monomial";
import { Polynomial } from "~/utils/polynomial";

// "id": "91143",
// "module": "heihou_bunkai",
// "grade": "中3",
// "chapter": "式の展開と因数分解",
// "title": "\\( a^2 \\pm 2ab +b^2 \\) の因数分解",
// "message": "次の式を因数分解しなさい。"
type Props = {
  title: string;
  message: string;
};
const Mugen = ({ title, message }: Props) => {
  return (
    <MugenContainer title={title} message={message} onRefresh={handleRefresh} />
  );
};

export { Mugen as M91143 };
export { handleRefresh as heihou_bunkai };

// 平方公式：(a + b)^2
const handleRefresh: RefreshFunction = (level, score) => {
  const idx = level - 1;
  let ax = Monomial.create({
    factors: "x",
    max: guard(idx, 1, 1, 2, 3, 3, 9),
    maxD: guard(idx, 1, 1, 1, 1, 5),
    maxN: guard(idx, 1, 1, 1, 1, 5),
  });
  let b = Monomial.create({
    factors: byScore(score, "", "y"),
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
  return [dsp(question), dsp(answer)];
};
