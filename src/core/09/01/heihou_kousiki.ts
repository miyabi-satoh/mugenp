import { RefreshFunction } from "~/interfaces/types";
import { checkParam, ifUnder } from "~/utils";
import { getRandomFraction } from "~/utils/fraction";

export const heihou_kousiki: RefreshFunction = (score) => {
  let question = "";
  let answer = "";

  while (1) {
    // 平方公式：(a + b)^2
    const a = getRandomFraction();
    if (!checkParam(a)) {
      continue;
    }

    const b = getRandomFraction();
    if (!checkParam(b)) {
      continue;
    }

    if (!a.isEqualTo(1) && a.isSimilarTo(b)) {
      continue;
    }

    if (score < 5) {
      if (!a.isEqualTo(1) || b.isFrac) {
        continue;
      }
    } else if (score < 10) {
      if (!a.isNatural || b.isFrac) {
        continue;
      }
    } else if (score < 15) {
      if (!a.isNatural) {
        continue;
      }
      if (b.isFrac && !a.isEqualTo(1)) {
        continue;
      }
    } else if (score < 20) {
      if (a.isNegative && (a.isFrac || b.isFrac)) {
        continue;
      }
      if (a.isFrac && b.isFrac) {
        continue;
      }
    } else if (score < 25) {
      if (a.isNegative && a.isFrac) {
        continue;
      }
    }

    const y = ifUnder(score + 2, "y", "");

    question = `\\left(${a.toTex("x")} ${b.toTex(y, true)}\\right)^2`;

    const k1 = a.mul(a);
    const k2 = a.mul(b).mul(2);
    const k3 = b.mul(b);
    answer = `${k1.toTex("x^2")} ${k2.toTex(`x${y}`, true)} ${k3.toTex(
      `${y ? "y^2" : ""}`,
      true
    )}`;
    break;
  }
  return [question, answer];
};
