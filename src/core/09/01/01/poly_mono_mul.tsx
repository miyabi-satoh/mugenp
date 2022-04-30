import { MugenContainer } from "~/components/container";
import { RefreshFunction } from "~/interfaces/types";
import { checkParam, drawLots, getRandomFraction, getRandomInt } from "~/utils";
import { Fraction } from "~/utils/fraction";
import { Monomial } from "~/utils/mojisiki";

// "id": "91101",
// "module": "poly_mono_mul",
// "grade": "中3",
// "chapter": "式の展開と因数分解",
// "title": "\\( (a+b)\\times c \\) の計算",
// "message": "次の計算をしなさい。"
type Props = {
  message: string;
};
const Mugen = ({ message }: Props) => {
  return <MugenContainer message={message} onRefresh={onRefresh} />;
};

export { Mugen as M91101 };

const onRefresh: RefreshFunction = (score) => {
  let question = "";
  let answer = "";

  while (1) {
    // 多項式 × 単項式

    // 単項式の係数
    const mono_keisuu = getRandomFraction();
    if (!checkParam(mono_keisuu)) {
      continue;
    }
    if (score < 5) {
      if (!mono_keisuu.isNatural) {
        continue;
      }
    } else if (score < 10) {
      if (!mono_keisuu.isInteger) {
        continue;
      }
    } else if (score < 15) {
      if (mono_keisuu.isFrac && mono_keisuu.isNegative) {
        continue;
      }
    }

    // 多項式の係数
    const maxKousuu = score > 10 ? 3 : 2;
    const kousuu = drawLots(Math.min(50, score * 5), maxKousuu, 2);
    const keisuu: Fraction[] = [];
    // 3項で分数は気持ち悪い
    if (kousuu == 3 && mono_keisuu.isFrac) {
      continue;
    }

    for (let i = 0; i < kousuu; i++) {
      const a = getRandomFraction();
      if (!checkParam(a)) {
        break;
      }
      // 係数が似てると気持ち悪い
      if (i > 0 && a.resembles(keisuu[i - 1])) {
        break;
      }
      // 3項で分数は気持ち悪い
      if (kousuu == 3) {
        if (a.isFrac) {
          break;
        }
      }
      if (score < 10) {
        if (!a.isInteger) {
          break;
        }
      } else if (score < 15) {
        if (!a.mul(mono_keisuu).isInteger) {
          break;
        }
      }

      keisuu.push(a);
    }

    if (keisuu.length != kousuu) {
      continue;
    }
    if (keisuu[0].isNegative) {
      continue;
    }

    // 係数が似てると気持ち悪い
    const retry = keisuu.find((k) => k.resembles(mono_keisuu));
    if (retry) {
      continue;
    }

    // 多項式の文字
    const moji: string[] = ["a"];
    if (kousuu > 2) {
      moji.push("b");
      moji.push(drawLots(Math.min(50, 5 * score), "c", ""));
    } else {
      moji.push(drawLots(Math.min(50, 5 * score), "b", ""));
    }

    // 単項式の文字
    const moji_count = moji.filter((m) => !!m).length; // 1,2,3
    const mono_moji = drawLots(
      Math.min(33, score * 5),
      ...moji.filter((x) => !!x)
    );

    // 式として作成
    const mono = new Monomial(mono_keisuu, [
      { moji: mono_moji, dimension: new Fraction(1) },
    ]);
    const poly = keisuu.map((k, i) => {
      return new Monomial(k, [{ moji: moji[i], dimension: new Fraction(1) }]);
    });
    const front = drawLots(50, true, false);
    if (front) {
      question =
        mono.toLatex() +
        "\\left(" +
        poly.map((m, i) => m.toLatex(i != 0)).join("") +
        "\\right)";
    } else {
      question =
        "\\left(" +
        poly.map((m, i) => m.toLatex(i != 0)).join("") +
        "\\right)" +
        " \\times " +
        mono.toLatex(mono.coeff.isNegative ? "()" : "");
    }

    const polyAns = [];
    for (let i = 0; i < kousuu; i++) {
      polyAns.push(mono.mul(poly[i]));
    }
    answer = polyAns.map((p, i) => p.toLatex(i != 0)).join("");
    break;
  }
  return [question, answer];
};
