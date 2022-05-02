import { MugenContainer } from "~/components/container";
import { RefreshFunction, TermSpec } from "~/interfaces/types";
import { drawLots, getRandomInt } from "~/utils";
import { Fraction } from "~/utils/fraction";
import { Monomial } from "~/utils/monomial";
import { Polynomial } from "~/utils/polynomial";

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
  return <MugenContainer message={message} onRefresh={handleRefresh} />;
};

export { Mugen as M91101 };

// 多項式 × 単項式
const handleRefresh: RefreshFunction = (level, score) => {
  let [poly, mono] = poly_mono(level, score);
  if (level < 5 && poly.terms[0].isNegative) {
    poly = poly.mul(-1);
  }

  const polyAns = poly.mul(mono).compact().orderTo();

  let question;
  if (drawLots(50, true, false)) {
    question =
      poly.toLatex("()") +
      " \\times " +
      mono.toLatex(mono.isNegative ? "()" : "");
  } else {
    question = mono.toLatex() + poly.toLatex("()");
  }
  const answer = polyAns.toLatex();
  return [question, answer];
};

export const poly_mono = (
  level: number,
  score: number
): [Polynomial, Monomial] => {
  // 単項式の文字
  const monoVars: string[] = [];
  if (level == 1) {
    monoVars.push("x");
  } else if (level == 2) {
    monoVars.push("x", "y");
  } else {
    monoVars.push("x", "y", "xy");
  }
  // 多項式の文字
  const polyVars: string[] = [];
  if (level == 1) {
    polyVars.push("x", "");
  } else if (level == 2) {
    polyVars.push(drawLots(50, "x", "y"), "");
  } else if (level == 3) {
    polyVars.push("x", "y", "");
  } else {
    polyVars.push("x", "y", "xy", "");
  }

  // 多項式の項数
  const kousuuSeed = Math.max(50, 100 - score * 5);
  const kousuu = drawLots(kousuuSeed, 2, Math.min(3, polyVars.length));

  const monoSpec: TermSpec = {
    max: [2, 3, 4, 5, 5][level - 1],
    maxD: kousuu == 3 ? 1 : [1, 1, 2, 3, 5][level - 1],
    maxN: [1, 1, 2, 3, 5][level - 1],
    allowNegative: level >= 2,
  };
  const polySpec: TermSpec = {
    max: [3, 5, 9, 9, 9][level - 1],
    maxD: kousuu == 3 ? 1 : [1, 1, 1, 3, 5][level - 1],
    maxN: [1, 1, 1, 2, 5][level - 1],
    allowNegative: true,
  };

  // 単項式
  // const mono = new Monomial(
  //   getParam(monoParam),
  //   drawLots(100 / monoVars.length, ...monoVars)
  // );
  const mono = Monomial.create({
    ...monoSpec,
    factors: drawLots(100 / monoVars.length, ...monoVars),
  });

  // 多項式を作成
  let poly = new Polynomial();
  do {
    let p = Monomial.create(polySpec);
    if (level < 5) {
      if (mono.isFrac) {
        // 乗算の結果が分数になる場合は、あらかじめ分母をかけておき
        // 答えが整数になるようにする
        const a = p.mul(mono.coeff);
        if (a.isFrac) {
          p = p.mul(a.d);
        }
      }
    } else {
      if (p.isFrac || mono.isFrac) {
        // 分数の乗算で約分が発生しないのは面白くない
        const a = p.mul(mono.coeff);
        if (a.d == p.d * mono.d && a.n == p.n * mono.n) {
          continue;
        }
      }
    }

    // ±1以外は同じような数が並ばないようにする
    if (
      p.coeff.resembles(1) ||
      !poly.terms.find((x) => x.coeff.resembles(p.coeff))
    ) {
      const moji = polyVars.splice(getRandomInt(polyVars.length - 1), 1)[0];
      poly = poly.append(p.mul(moji));
    }
  } while (poly.length < kousuu);

  poly = poly.compact().orderTo();

  return [poly, mono];
};
