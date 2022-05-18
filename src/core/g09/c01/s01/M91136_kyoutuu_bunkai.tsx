import { RefreshFunction } from "~/interfaces/types";
import { MugenContainer } from "~/components/container";
import {
  byScore,
  dsp,
  gcd,
  getRandomInt,
  guard,
  minMax,
  randArray,
} from "~/utils";
import { Monomial } from "~/utils/monomial";
import { Polynomial } from "~/utils/polynomial";

// "id": "91136",
// "module": "kyoutuu_kousiki",
// "grade": "中3",
// "chapter": "式の展開と因数分解",
// "section": "式の展開と因数分解",
// "subsection": "因数分解",
// "title": "2段階の因数分解",
// "message": "次の式を因数分解しなさい。"
const Mugen = () => {
  return <MugenContainer onRefresh={handleRefresh} />;
};

export { Mugen as M91136 };

// 2段階の因数分解
const handleRefresh: RefreshFunction = (level, score) => {
  const idx = level - 1;

  // 共通因数
  let common = Monomial.create({
    max: guard(idx, 2, 3, 4, 5),
    allowNegative: randArray(false, guard(idx, false, false, false, true)),
    factors: guard(
      idx,
      "",
      "",
      randArray("", "a"),
      randArray("", "a", "x", "y")
    ),
  });
  if (common.coeff.equals(1)) {
    common = common.mul(getRandomInt(guard(idx, 2, 3, 4, 5), 2));
  }

  const commonNum = common.coeff.valueOf();
  const mode = randArray(1, 2, 3, 3);
  let qExpr: Polynomial;
  let aTex: string;
  switch (mode) {
    case 1: // 和と差の公式
      {
        let a = Monomial.create({
          max: minMax(1, guard(idx, 1, 2, 3, 4, 5), 9 - commonNum),
          factors: "x",
        });
        let b = Monomial.create({
          max: minMax(1, guard(idx, 1, 2, 3, 4, 5), 9 - commonNum),
          factors: guard(idx, "", randArray("", "y")),
          allowNegative: true,
        });
        const g = gcd(a.coeff.valueOf(), b.coeff.valueOf());
        if (g != 1) {
          a = a.div(g);
          b = b.div(g);
        }
        const p1 = new Polynomial(a, b);
        const p2 = new Polynomial(a, b.neg());
        qExpr = p1.mul(p2).compact();
        aTex = p1.toLatex("()") + p2.toLatex("()");
      }
      break;
    case 2: // 平方公式
      {
        let a = Monomial.create({
          max: minMax(1, guard(idx, 1, 1, 2, 3, 4, 5), 9 - commonNum),
          factors: "x",
        });
        let b = Monomial.create({
          max: minMax(1, guard(idx, 3, 4, 5), 9 - commonNum),
          factors: guard(idx, "", randArray("", "y")),
          allowNegative: true,
        });
        const g = gcd(a.coeff.valueOf(), b.coeff.valueOf());
        if (g != 1) {
          a = a.div(g);
          b = b.div(g);
        }
        const p1 = new Polynomial(a, b);
        qExpr = p1.mul(p1).compact();
        aTex = p1.toLatex("()") + "^2";
      }
      break;
    default:
      {
        // 和と積の公式
        const x = Monomial.create({
          max: 1,
          factors: "x",
        });
        const y = guard(idx, "", randArray("", "y"));
        let a = Monomial.create({
          max: minMax(1, guard(idx, 3, 4, 5), 9 - commonNum),
          factors: y,
          allowNegative: true,
        });
        let b = Monomial.create({
          max: minMax(1, guard(idx, 3, 4, 5), 9 - commonNum),
          factors: y,
          allowNegative: true,
        });
        const g = gcd(a.coeff.valueOf(), b.coeff.valueOf());
        if (g != 1) {
          a = a.div(g);
          b = b.div(g);
        }

        if (a.coeff.equals(b.coeff)) {
          // 平方公式になる
          const p1 = new Polynomial(x, a);
          qExpr = p1.mul(p1).compact();
          aTex = p1.toLatex("()") + "^2";
        } else {
          const p1 = new Polynomial(x, a);
          const p2 = new Polynomial(x, b);
          qExpr = p1.mul(p2).compact();
          aTex = p1.toLatex("()") + p2.toLatex("()");
        }
      }
      break;
  }

  const question = qExpr.mul(common).toLatex();
  const answer = (common.coeff.equals(-1) ? "-" : common.toLatex()) + aTex;

  return [dsp(question), dsp(answer)];
};
