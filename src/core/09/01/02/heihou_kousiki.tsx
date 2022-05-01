import { MugenContainer } from "~/components/container";
import { RefreshFunction } from "~/interfaces/types";
import { checkParam, drawLots, getRandomFraction } from "~/utils";
import { Monomial } from "~/utils/monomial";
import { Polynomial } from "~/utils/polynomial";

// "id": "91202",
// "module": "heihou_kousiki",
// "grade": "中3",
// "chapter": "式の展開と因数分解",
// "title": "\\((a\\pm b)^2\\) の展開",
// "message": "次の式を展開しなさい。"
type Props = {
  message: string;
};
const Mugen = ({ message }: Props) => {
  return <MugenContainer message={message} onRefresh={onRefresh} />;
};

export { Mugen as M91202 };
export { onRefresh as heihou_kousiki };

const onRefresh: RefreshFunction = (score) => {
  while (1) {
    // 平方公式：(a + b)^2
    let a = new Monomial(
      getRandomFraction((x) => {
        if (!checkParam(x)) {
          return false;
        }
        if (score < 5) {
          return x.equals(1);
        } else if (score < 15) {
          return x.isNatural;
        }
        return true;
      })
    );

    let b = new Monomial(
      getRandomFraction((x) => {
        if (!checkParam(x)) {
          return false;
        }
        if (score < 15) {
          return x.isInteger;
        }

        return true;
      })
    );

    if (!a.coeff.equals(1) && a.coeff.resembles(b.coeff)) {
      continue;
    }
    if (score < 20) {
      if (a.coeff.isNegative && (a.coeff.isFrac || b.coeff.isFrac)) {
        continue;
      }
      if (a.coeff.isFrac && b.coeff.isFrac) {
        continue;
      }
    } else if (score < 25) {
      if (a.coeff.isNegative && b.coeff.isFrac) {
        continue;
      }
    }

    // const y = drawLots(Math.min(50, score * 2), "y", "");

    a = a.mul("x");
    b = b.mul(drawLots(Math.min(50, score * 2), "y", ""));
    const polyQ = new Polynomial(a, b);
    const question = "\\left(" + polyQ.toLatex() + "\\right)^2";

    const polyA = polyQ.mul(polyQ).compact();
    const answer = polyA.toLatex();
    return [question, answer];
  }
  throw new Error("What's wrong?");
};
