import { MugenContainer } from "~/components/container";
import { RefreshFunction } from "~/interfaces/types";
import { checkParam, drawLots, getRandomFraction, getRandomInt } from "~/utils";
import { Fraction } from "~/utils/fraction";
import { Monomial } from "~/utils/mojisiki";

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
  let question = "";
  let answer = "";

  while (1) {
    // 多項式 ÷ 単項式

    // 単項式の係数
    const mono_keisuu = getRandomFraction((f) => {
      if (!checkParam(f)) {
        return false;
      }
      if (score < 10) {
        // 自然数のみ
        return f.isNatural;
      }
      if (score < 15) {
        // 整数のみ
        return f.isInteger;
      }
      if (score < 20) {
        // 整数か、正の分数
        return f.isInteger || f.isPositive;
      }
      return true;
    });

    // 単項式の文字
    const mono_variables = [];
    if (score < 5) {
      // 文字は x のみ
      mono_variables.push({
        moji: "x",
        dimension: new Fraction(1),
      });
    } else if (score < 15) {
      // 文字は x か y
      mono_variables.push({
        moji: drawLots(50, "x", "y"),
        dimension: new Fraction(1),
      });
    }

    // 文字未設定の場合、文字は x か y か xy
    if (mono_variables.length === 0) {
      if (drawLots(33, true, false)) {
        mono_variables.push({
          moji: "y",
          dimension: new Fraction(1),
        });
      }
      if (mono_variables.length === 0 || drawLots(33, true, false)) {
        mono_variables.push({
          moji: "x",
          dimension: new Fraction(1),
        });
      }
    }

    // 多項式(答え)の係数
    const per = Math.min(50, score * 5);
    const kousuu = drawLots(per, 3, 2);
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
        if (score < 15) {
          return f.mul(mono_keisuu).isInteger;
        }
        return true;
      });

      keisuu.push(a);
    }

    // 多項式間の係数が似てると気持ち悪い
    if (keisuu.slice(1).find((k) => k.resembles(keisuu[0]))) {
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
      poly.map((m, i) => m.toLatex(i != 0)).join("") +
      "\\right)" +
      " \\div " +
      mono.toLatex(mono.coeff.isNegative ? "()" : "");

    answer = polyAns.map((p, i) => p.toLatex(i != 0)).join("");
    break;
  }
  return [question, answer];
};
