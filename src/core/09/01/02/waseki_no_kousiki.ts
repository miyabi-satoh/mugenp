import { RefreshFunction } from "~/interfaces/types";
import { checkParam, drawLots, getRandomFraction } from "~/utils";

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
    if (b.resembles(c)) {
      // 平方公式、和と差の公式の問題になってしまうのでスキップ
      continue;
    }

    const a = getRandomFraction();
    if (!checkParam(a) || a.isFrac) {
      continue;
    }

    if (score < 5) {
      if (!a.equals(1) || b.isFrac || c.isFrac) {
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
        if (!a.equals(1) || b.d != c.d) {
          continue;
        }
      }
    } else if (score < 20) {
      if (b.isInteger && c.isInteger) {
        // 制限なし
      } else if (b.isFrac && c.isFrac) {
        if (a.isNegative || b.d != c.d) {
          continue;
        }
      } else {
        if (!a.equals(1)) {
          continue;
        }
      }
    }

    const y = drawLots(Math.min(50, score * 2), "y", "");
    question =
      `\\left(${a.toLatex("x")} ${b.toLatex(y, true)}\\right)` +
      `\\left(${a.toLatex("x")} ${c.toLatex(y, true)}\\right)`;

    const k1 = a.mul(a);
    const k2 = b.add(c).mul(a);
    const k3 = b.mul(c);
    answer = `${k1.toLatex("x^2")} ${k2.toLatex(`x${y}`, true)} ${k3.toLatex(
      `${y ? "y^2" : ""}`,
      true
    )}`;
    break;
  }
  return [question, answer];
};
