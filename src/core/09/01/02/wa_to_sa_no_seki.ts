import { getRandomFraction } from "~/utils/fraction";
import { checkParam, ifUnder } from "~/utils";
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
    if (!a.isEqualTo(1) && a.isSimilarTo(b)) {
      continue;
    }

    if (score < 5) {
      // 1と整数
      if (!a.isEqualTo(1) || b.isFrac) {
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

    const y = ifUnder(score + 2, "y", "");

    question =
      `\\left(${a.toTex("x")} ${b.toTex(y, true)}\\right)` +
      `\\left(${a.toTex("x")} ${b.mul(-1).toTex(y, true)}\\right)`;

    const k1 = a.mul(a);
    const k2 = b.mul(b);
    answer = `${k1.toTex("x^2")} - ${k2.toTex(`${y ? "y^2" : ""}`)}`;
    break;
  }

  return [question, answer];
};