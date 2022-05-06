import { MugenContainer } from "~/components/container";
import { RefreshFunction, TermSpec } from "~/interfaces/types";
import { byScore, dsp, guard } from "~/utils";
import { Monomial } from "~/utils/monomial";
import { Polynomial } from "~/utils/polynomial";

// "id": "91121",
// "module": "waseki_no_kousiki",
// "grade": "中3",
// "chapter": "式の展開と因数分解",
// "title": "\\((x+a)(x+b)\\) の展開",
// "message": "次の式を展開しなさい。"
type Props = {
  message: string;
};
const Mugen = ({ message }: Props) => {
  return (
    <MugenContainer maxLv={7} message={message} onRefresh={handleRefresh} />
  );
};

export { Mugen as M91121 };
export { handleRefresh as waseki_no_kousiki };

// 和積の公式：(ax + b)(ax + c)
const handleRefresh: RefreshFunction = (level, score) => {
  const idx = level - 1;
  const bcSpec: TermSpec = {
    factors: byScore(score, "", "y"),
    max: guard(idx, 3, 3, 5, 7, 9),
    maxD: guard(idx, 1, 1, 1, 5),
    maxN: guard(idx, 1, 1, 1, 5),
    allowNegative: true,
  };
  const b = Monomial.create(bcSpec);
  const c = Monomial.create(bcSpec);

  if (b.coeff.resembles(c.coeff)) {
    // 平方公式、和と差の公式の問題になってしまうのでスキップ
    return ["", ""];
  }
  if (level < 7) {
    if (b.isFrac || c.isFrac) {
      // 同分母以外はNG
      if (b.d !== c.d) {
        return ["", ""];
      }
    }
  }
  const ax = Monomial.create({
    factors: "x",
    max: guard(idx, 1, 1, 2, 3, 3, 9),
    maxD: guard(idx, 1, 1, 1, 1, 5),
    maxN: guard(idx, 1, 1, 1, 1, 5),
    allowNegative: level > 5,
  });
  if (level < 6) {
    // b,cが分数だったら、a=1
    if (b.isFrac && !ax.coeff.equals(1)) {
      return ["", ""];
    }
    // aが分数だったら、b,cは整数
    if (ax.isFrac && (b.isFrac || c.isFrac)) {
      return ["", ""];
    }
  } else if (level < 7) {
    // aが負の数だったら、a,b,cは整数
    if (ax.isNegative && (ax.isFrac || b.isFrac || c.isFrac)) {
      return ["", ""];
    }
  }

  const p1 = new Polynomial(ax, b);
  const p2 = new Polynomial(ax, c);
  const question = p1.toLatex("()") + p2.toLatex("()");
  const answer = p1.mul(p2).compact().toLatex();
  return [dsp(question), dsp(answer)];
};
