import { RefreshFunction } from "~/interfaces/types";
import { checkParam, getRandomInt, ifUnder } from "~/utils";
import { Fraction, getRandomFraction } from "~/utils/fraction";
import { Monomial } from "~/utils/mojisiki";

export const poly_mono_div: RefreshFunction = (score) => {
  let question = "";
  let answer = "";

  while (1) {
    // 多項式 ÷ 単項式

    // 単項式の係数
    const mono_keisuu = getRandomFraction();
    if (!checkParam(mono_keisuu)) {
      continue;
    }
    // 単項式の文字
    const mono_variables = [];
    if (score < 5) {
      if (!mono_keisuu.isNatural) {
        continue;
      }
      mono_variables.push({
        moji: "a",
        dimension: new Fraction(1),
      });
    } else if (score < 10) {
      if (!mono_keisuu.isNatural) {
        continue;
      }
      mono_variables.push({
        moji: ifUnder(50, "a", "b"),
        dimension: new Fraction(1),
      });
    } else if (score < 15) {
      if (!mono_keisuu.isInteger) {
        continue;
      }
      mono_variables.push({
        moji: ifUnder(50, "a", "b"),
        dimension: new Fraction(1),
      });
    } else if (score < 20) {
      if (mono_keisuu.isFrac && mono_keisuu.isNegative) {
        continue;
      }
    }

    if (mono_variables.length === 0) {
      if (ifUnder(33, true, false)) {
        mono_variables.push({
          moji: "b",
          dimension: new Fraction(1),
        });
      }
      if (mono_variables.length === 0 || ifUnder(33, true, false)) {
        mono_variables.push({
          moji: "a",
          dimension: new Fraction(1),
        });
      }
    }

    // 多項式(答え)の係数
    const maxKousuu = score > 10 ? 3 : 2;
    const kousuu = ifUnder(score > 5 ? 50 : 10 * score, maxKousuu, 2);
    const keisuu: Fraction[] = [];

    for (let i = 0; i < kousuu; i++) {
      const a = getRandomFraction();
      if (!checkParam(a)) {
        break;
      }
      // 係数が似てると気持ち悪い
      if (i > 0 && a.isSimilarTo(keisuu[i - 1])) {
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
    if (score < 15) {
      if (mono_keisuu.isNegative && keisuu[0].isPositive) {
        continue;
      }
    }

    // 係数が似てると気持ち悪い
    const retry = keisuu.find((k) => k.isSimilarTo(mono_keisuu));
    if (retry) {
      continue;
    }

    // 多項式(答え)の文字
    const moji: string[] = ["a"];
    if (kousuu > 2) {
      moji.push("b");
      moji.push(ifUnder(Math.min(50, 5 * score), "c", ""));
    } else {
      moji.push(ifUnder(Math.min(50, 5 * score), "b", ""));
    }

    // 式として作成
    const mono = new Monomial(mono_keisuu, mono_variables);
    const polyAns = keisuu.map((k, i) => {
      return new Monomial(k, [{ moji: moji[i], dimension: new Fraction(1) }]);
    });
    const poly = [];
    for (let i = 0; i < kousuu; i++) {
      poly.push(mono.mul(polyAns[i]));
    }

    question =
      "\\left(" +
      poly.map((m, i) => m.toTex(i != 0)).join("") +
      "\\right)" +
      " \\div " +
      mono.toTexKakkoIfNegative();

    answer = polyAns.map((p, i) => p.toTex(i != 0)).join("");
    break;
  }
  return [question, answer];
};
