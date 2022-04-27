import { getRandomFraction } from "~/utils/fraction";
import { checkParam, getMinCoprime, ifUnder } from "~/utils";
import { RefreshFunction } from "~/interfaces/types";

export const wa_to_sa_no_bunkai: RefreshFunction = (score) => {
  let question = "";
  let answer = "";
  while (1) {
    // 和と差の公式：(a + b)(a - b)
    const a = getRandomFraction((f) => {
      if (!checkParam(f)) {
        return false;
      }
      if (f.isNegative) {
        return false;
      }
      if (score < 5) {
        return f.isEqualTo(1);
      }
      if (score < 20) {
        return f.isInteger;
      }
      return true;
    });

    const b = getRandomFraction((f) => {
      if (!checkParam(f)) {
        return false;
      }
      if (f.isNegative) {
        return false;
      }

      if (a.isInteger && f.isInteger) {
        // a, b は互いに素でなければならない
        if (getMinCoprime(a.value, f.value) != 1) {
          return false;
        }
      } else {
        // 両方分数なら、分母・分子それぞれで公約数チェック
        if (getMinCoprime(a.numerator, f.numerator) != 1) {
          return false;
        }
        if (a.isFrac && f.isFrac) {
          if (getMinCoprime(a.denominator, f.denominator) != 1) {
            return false;
          }
        }
      }

      if (score < 20) {
        return f.isInteger;
      }

      return true;
    });

    const x = "x";
    const y = ifUnder(Math.min(50, score * 5), "y", "");

    const k1 = a.mul(a);
    const k2 = b.mul(b);
    question = k1.toTex("x^2") + " - " + k2.toTex(`${y ? "y^2" : ""}`);

    answer =
      `\\left(${a.toTex(x)} ${b.toTex(y, true)}\\right)` +
      `\\left(${a.toTex(x)} ${b.mul(-1).toTex(y, true)}\\right)`;

    break;
  }

  return [question, answer];
};
