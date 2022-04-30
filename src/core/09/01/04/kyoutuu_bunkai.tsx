import { MugenContainer } from "~/components/container";
import { RefreshFunction } from "~/interfaces/types";
import { checkParam, drawLots, getRandomFraction, getRandomInt } from "~/utils";
import { Fraction } from "~/utils/fraction";
import { Monomial } from "~/utils/monomial";
import { Polynomial } from "~/utils/polynomial";

// "id": "91401",
// "module": "kyoutuu_bunkai",
// "grade": "中3",
// "chapter": "式の展開と因数分解",
// "title": "共通因数でくくる",
// "message": "次の式を因数分解しなさい。"
type Props = {
  message: string;
};
const Mugen = ({ message }: Props) => {
  return <MugenContainer message={message} onRefresh={onRefresh} />;
};

export { Mugen as M91401 };

const onRefresh: RefreshFunction = (score) => {
  while (1) {
    // 共通因数でくくる

    // 単項式の係数
    const mono_keisuu = getRandomFraction((f) => {
      if (!checkParam(f)) {
        return false;
      }
      if (score < 5) {
        // 1のみ
        return f.equals(1);
      }
      // 自然数のみ
      return f.isNatural;
    });

    // 単項式の文字
    const mono_variables = [];
    if (score < 5) {
      // 文字は x のみ
      mono_variables.push("x");
    } else if (score < 10) {
      // 文字は x か y か 無し
      if (mono_keisuu.resembles(1)) {
        mono_variables.push(drawLots(50, "x", "y"));
      }
    } else if (score < 15) {
      // 文字は x か y か xy か 無し
      mono_variables.push(`x^{${getRandomInt(1)}}`);
      mono_variables.push(`y^{${getRandomInt(1)}}`);
    } else {
      mono_variables.push(`x^{${getRandomInt(2)}}`);
      mono_variables.push(`y^{${getRandomInt(2)}}`);
    }

    // 単項式
    const mono = new Monomial(mono_keisuu, mono_variables.join(""));
    if (mono.toLatex() == "1") {
      continue;
    }

    // 多項式(答え)の係数
    const kousuu = drawLots(Math.min(50, score * 5), 3, 2);
    const keisuu: Fraction[] = [];

    do {
      const a = getRandomFraction((x) => {
        if (!checkParam(x)) {
          return false;
        }

        // 分数は気持ち悪い
        if (x.isFrac) {
          return false;
        }
        // 問題が分数になるのも気持ち悪い
        if (x.mul(mono_keisuu).isFrac) {
          return false;
        }

        if (keisuu.length == 0) {
          // 初項がマイナスは気持ち悪い
          if (x.mul(mono.coeff).isNegative) {
            return false;
          }
        }
        return x.isInteger;
      });

      // 似た数がいなければ追加
      if (!keisuu.find((x) => x.resembles(a))) {
        keisuu.push(a);
      }
    } while (keisuu.length < kousuu);

    // 多項式間の係数が似てると気持ち悪い
    if (keisuu.slice(1).find((k) => k.resembles(keisuu[0]))) {
      continue;
    }
    // 多項式中に共通因数があったらアカン
    const min = Math.min(...keisuu.map((k) => Math.abs(k.valueOf)));
    let retry = false;
    for (let i = 2; i <= min; i++) {
      if (keisuu.find((k) => Math.abs(k.valueOf) % i != 0)) {
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
        moji.push(drawLots(50, "x", "y"), "");
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
    let polyAns = new Polynomial();
    for (let i = 0; i < kousuu; i++) {
      polyAns = polyAns.add(new Monomial(keisuu[i], moji[i]));
    }

    let poly = polyAns.mul(mono);

    // const polyAns = keisuu.map((k, i) => {
    //   return new Monomial(k, [{ moji: moji[i], dimension: new Fraction(1) }]);
    // });
    // const poly = [];
    // for (let i = 0; i < kousuu; i++) {
    //   poly.push(mono.mul(polyAns[i]));
    // }

    const question = poly.toLatex();
    const answer = mono.toLatex() + "\\left(" + polyAns.toLatex() + "\\right)";
    return [question, answer];
  }
  throw new Error("What's wrong?");
};
