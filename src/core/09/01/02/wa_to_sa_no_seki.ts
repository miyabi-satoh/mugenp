import { checkParam, drawLots, getRandomFraction } from "~/utils";
import { RefreshFunction } from "~/interfaces/types";

export const wa_to_sa_no_seki: RefreshFunction = (score) => {
  let question = "";
  let answer = "";
  while (1) {
    // 和と差の公式：(a + b)(a - b)
    const a = getRandomFraction();
    if (!checkParam(a)) {
      continue;
    }

    const b = getRandomFraction();
    if (!checkParam(b)) {
      continue;
    }

    // 1と1以外で同数は気持ち悪い
    if (!a.equals(1) && a.resembles(b)) {
      continue;
    }

    if (score < 5) {
      // 1と整数
      if (!a.equals(1) || b.isFrac) {
        continue;
      }
    } else if (score < 10) {
      // 自然数と整数
      if (!a.isNatural || b.isFrac) {
        continue;
      }
    } else if (score < 15) {
      // 整数と整数
      if (a.isFrac || b.isFrac) {
        continue;
      }
    } else if (score < 20) {
      // 自然数と分数
      if (!a.isNatural) {
        continue;
      }
    } else if (score < 25) {
      if (a.isNegative) {
        continue;
      }
    }

    const y = drawLots(Math.min(50, score * 2), "y", "");

    question =
      `\\left(${a.toLatex("x")} ${b.toLatex(y, true)}\\right)` +
      `\\left(${a.toLatex("x")} ${b.mul(-1).toLatex(y, true)}\\right)`;

    const k1 = a.mul(a);
    const k2 = b.mul(b);
    answer = `${k1.toLatex("x^2")} - ${k2.toLatex(`${y ? "y^2" : ""}`)}`;
    break;
  }

  return [question, answer];
};
