import { RefreshFunction } from "~/interfaces/types";
import { checkParam, getRandomInt, ifUnder } from "~/utils";
import { Fraction, getRandomFraction } from "~/utils/fraction";
import { Monomial } from "~/utils/mojisiki";

export const kyoutuu_bunkai: RefreshFunction = (score) => {
  let question = "";
  let answer = "";

  while (1) {
    // 共通因数でくくる

    // 単項式の係数
    const mono_keisuu = getRandomFraction((f) => {
      if (!checkParam(f)) {
        return false;
      }
      if (score < 5) {
        // 1のみ
        return f.isEqualTo(1);
      }
      // 自然数のみ
      return f.isNatural;
    });

    // 単項式の文字
    const mono_variables = [];
    if (score < 5) {
      // 文字は x のみ
      mono_variables.push({
        moji: "x",
        dimension: new Fraction(1),
      });
    } else if (score < 10) {
      // 文字は x か y か 無し
      if (mono_keisuu.isSimilarTo(1)) {
        mono_variables.push({
          moji: ifUnder(50, "x", "y"),
          dimension: new Fraction(1),
        });
      }
    } else if (score < 15) {
      // 文字は x か y か xy か 無し
      mono_variables.push({
        moji: "x",
        dimension: new Fraction(getRandomInt(1)),
      });
      mono_variables.push({
        moji: "y",
        dimension: new Fraction(getRandomInt(1)),
      });
    } else {
      mono_variables.push({
        moji: "x",
        dimension: new Fraction(getRandomInt(2)),
      });
      mono_variables.push({
        moji: "y",
        dimension: new Fraction(getRandomInt(2)),
      });
    }

    // 多項式(答え)の係数
    const per = Math.min(50, score * 5);
    const kousuu = ifUnder(per, 3, 2);
    const keisuu: Fraction[] = [];

    for (let i = 0; i < kousuu; i++) {
      const a = getRandomFraction((f) => {
        if (!checkParam(f)) {
          return false;
        }

        // 分数は気持ち悪い
        if (f.isFrac) {
          return false;
        }
        // 問題が分数になるのも気持ち悪い
        if (f.mul(mono_keisuu).isFrac) {
          return false;
        }

        if (i == 0) {
          // 初項がマイナスは気持ち悪い
          if (f.mul(mono_keisuu).isNegative) {
            return false;
          }
        }
        return f.isInteger;
      });

      keisuu.push(a);
    }

    // 多項式間の係数が似てると気持ち悪い
    if (keisuu.slice(1).find((k) => k.isSimilarTo(keisuu[0]))) {
      continue;
    }
    // 多項式中に共通因数があったらアカン
    const min = Math.min(...keisuu.map((k) => k.value));
    let retry = false;
    for (let i = min; i > 1; i--) {
      if (keisuu.find((n) => n.value % i !== 0)) {
        continue;
      }
      retry = true;
      break;
    }
    if (retry) {
      continue;
    }

    // 多項式(答え)の文字
    const moji: string[] = [];
    if (kousuu == 2) {
      if (score < 5) {
        moji.push("x", "");
      } else if (score < 10) {
        moji.push(ifUnder(50, "x", "y"), "");
      }
    } else {
      if (score < 10) {
        moji.push("x", "y", "");
      }
    }
    if (moji.length !== kousuu) {
      const mojiList = ["xy", "x", "y", ""];
      for (let i = 0; i < kousuu; i++) {
        moji.push(mojiList.splice(getRandomInt(mojiList.length - 1), 1)[0]);
      }
    }
    moji.sort((a, b) => {
      if (a === "" && b === "") {
        return 0;
      }
      if (a === "") {
        return 1;
      }
      if (b === "") {
        return -1;
      }
      return a < b ? -1 : 1;
    });

    // 式として作成
    const mono = new Monomial(mono_keisuu, mono_variables);
    const polyAns = keisuu.map((k, i) => {
      return new Monomial(k, [{ moji: moji[i], dimension: new Fraction(1) }]);
    });
    const poly = [];
    for (let i = 0; i < kousuu; i++) {
      poly.push(mono.mul(polyAns[i]));
    }

    question = poly.map((m, i) => m.toTex(i != 0)).join("");
    answer =
      mono.toTex() +
      "\\left(" +
      polyAns.map((p, i) => p.toTex(i != 0)).join("") +
      "\\right)";
    break;
  }
  return [question, answer];
};
