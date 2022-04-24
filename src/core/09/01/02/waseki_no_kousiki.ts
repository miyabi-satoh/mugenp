import { RefreshFunction } from "~/interfaces/types";
import { checkParam, ifUnder } from "~/utils";
import { getRandomFraction } from "~/utils/fraction";

export const waseki_no_kousiki: RefreshFunction = (score) => {
  let question = "";
  let answer = "";
  while (1) {
    // 和積の公式：(ax + b)(ax + c)
    const b = getRandomFraction();
    if (!checkParam(b)) {
      continue;
    }

    const c = getRandomFraction();
    if (!checkParam(c)) {
      continue;
    }
    if (b.isSimilarTo(c)) {
      // 平方公式、和と差の公式の問題になってしまうのでスキップ
      continue;
    }

    const a = getRandomFraction();
    if (!checkParam(a) || a.isFrac) {
      continue;
    }

    if (score < 5) {
      if (!a.isEqualTo(1) || b.isFrac || c.isFrac) {
        continue;
      }
    } else if (score < 10) {
      if (a.isNegative || a.isFrac || b.isFrac || c.isFrac) {
        continue;
      }
    } else if (score < 15) {
      if (a.isNegative) {
        continue;
      }
      if (b.isFrac || c.isFrac) {
        if (!a.isEqualTo(1) || b.denominator != c.denominator) {
          continue;
        }
      }
    } else if (score < 20) {
      if (b.isInteger && c.isInteger) {
        // 制限なし
      } else if (b.isFrac && c.isFrac) {
        if (a.isNegative || b.denominator != c.denominator) {
          continue;
        }
      } else {
        if (!a.isEqualTo(1)) {
          continue;
        }
      }
    }

    const y = ifUnder(score + 2, "y", "");
    question =
      `\\left(${a.toTex("x")} ${b.toTex(y, true)}\\right)` +
      `\\left(${a.toTex("x")} ${c.toTex(y, true)}\\right)`;

    const k1 = a.mul(a);
    const k2 = b.add(c).mul(a);
    const k3 = b.mul(c);
    answer = `${k1.toTex("x^2")} ${k2.toTex(`x${y}`, true)} ${k3.toTex(
      `${y ? "y^2" : ""}`,
      true
    )}`;
    break;
  }
  return [question, answer];
};
