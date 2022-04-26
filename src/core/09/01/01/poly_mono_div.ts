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
    if (keisuu[0].isNegative) {
      continue;
    }

    // 係数が似てると気持ち悪い
    const retry = keisuu.find((k) => k.isSimilarTo(mono_keisuu));
    if (retry) {
      continue;
    }

    // 単項式の文字
    let mono_moji = ["a", "b"].map((m) => ifUnder(33, m, "")).join("");
    if (mono_moji.length == 0) {
      mono_moji = ifUnder(50, "a", "b");
    }

    // 多項式(答え)の文字
    const moji: string[] = ["a"];
    if (kousuu > 2) {
      moji.push("b");
      moji.push(ifUnder(5 * score, "c", ""));
    } else {
      moji.push(ifUnder(5 * score, "b", ""));
    }

    // 式として作成
    const mono = new Monomial(
      mono_keisuu,
      mono_moji.split("").map((m) => {
        return {
          moji: m,
          dimension: new Fraction(1),
        };
      })
    );
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
