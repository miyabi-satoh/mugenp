import { MugenContainer } from "~/components/container";
import { RefreshFunction } from "~/interfaces/types";
import { checkParam, drawLots, getRandomFraction, getRandomInt } from "~/utils";
import { Fraction } from "~/utils/fraction";
import { Monomial } from "~/utils/monomial";
import { Polynomial } from "~/utils/polynomial";

// "id": "91102",
// "module": "poly_mono_div",
// "grade": "中3",
// "chapter": "式の展開と因数分解",
// "title": "\\( (a+b)\\div c \\) の計算",
// "message": "次の計算をしなさい。"
type Props = {
  message: string;
};
const Mugen = ({ message }: Props) => {
  return <MugenContainer message={message} onRefresh={onRefresh} />;
};

export { Mugen as M91102 };

const onRefresh: RefreshFunction = (score) => {
  while (1) {
    let mono = new Monomial(
      getRandomFraction((x) => {
        if (!checkParam(x)) {
          return false;
        }
        if (score < 10) {
          // 自然数のみ
          return x.isNatural;
        }
        if (score < 15) {
          // 整数のみ
          return x.isInteger;
        }
        if (score < 20) {
          // 整数か、正の分数
          return x.isInteger || x.isPositive;
        }
        return true;
      })
    );

    // 単項式の文字
    if (score < 5) {
      // 文字は x のみ
      mono = mono.mul("x");
    } else if (score < 15) {
      // 文字は x か y
      mono = mono.mul(drawLots(50, "x", "y"));
    } else {
      // 文字は x か y か xy
      mono = mono.mul(drawLots(33, "x", "y", "xy"));
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
        if (x.mul(mono.coeff).isFrac) {
          return false;
        }

        if (keisuu.length == 0) {
          // 初項がマイナスは気持ち悪い
          if (x.mul(mono.coeff).isNegative) {
            return false;
          }
        }
        if (score < 15) {
          return x.mul(mono.coeff).isInteger;
        }
        return true;
      });

      // 似た数がいなければ追加
      if (!keisuu.find((x) => x.resembles(a))) {
        keisuu.push(a);
      }
    } while (keisuu.length < kousuu);

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
      do {
        mojiList.splice(getRandomInt(mojiList.length - 1), 1);
      } while (mojiList.length > kousuu);
      moji.push(...mojiList);
    }

    // 式として作成
    let polyAns = new Polynomial();
    for (let i = 0; i < kousuu; i++) {
      polyAns = polyAns.add(new Monomial(keisuu[i], moji[i]));
    }

    let poly = polyAns.mul(mono);

    const question =
      "\\left(" +
      poly.toLatex() +
      "\\right)" +
      " \\div " +
      mono.toLatex(mono.coeff.isNegative ? "()" : "");

    const answer = polyAns.toLatex();
    return [question, answer];
  }
  throw new Error("What's wrong?");
};
