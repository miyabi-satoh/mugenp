import { MugenContainer } from "~/components/container";
import { RefreshFunction } from "~/interfaces/types";
import { checkParam, drawLots, getRandomFraction } from "~/utils";

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

    if (!a.equals(1) && a.resembles(b)) {
      continue;
    }

    if (score < 5) {
      if (!a.equals(1) || b.isFrac) {
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
      if (b.isFrac && !a.equals(1)) {
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

    const y = drawLots(Math.min(50, score * 2), "y", "");

    question = `\\left(${a.toLatex("x")} ${b.toLatex(y, true)}\\right)^2`;

    const k1 = a.mul(a);
    const k2 = a.mul(b).mul(2);
    const k3 = b.mul(b);
    answer = `${k1.toLatex("x^2")} ${k2.toLatex(`x${y}`, true)} ${k3.toLatex(
      `${y ? "y^2" : ""}`,
      true
    )}`;
    break;
  }
  return [question, answer];
};
