import { MugenContainer } from "~/components/container";
import { RefreshFunction } from "~/interfaces/types";
import { dsp, getRandomInt, guard, randArray } from "~/utils";
import { Monomial, TermSpec } from "~/utils/monomial";
import { Polynomial } from "~/utils/polynomial";

// "id": "91111",
// "module": "poly_mono_mul",
// "grade": "中3",
// "chapter": "式の展開と因数分解",
// "title": "\\( (a+b)\\times c \\) の計算",
// "message": "次の計算をしなさい。"
type Props = {
  title: string;
  message: string;
};
const Mugen = ({ title, message }: Props) => {
  return (
    <MugenContainer title={title} message={message} onRefresh={handleRefresh} />
  );
};

export { Mugen as M91111 };

// 多項式 × 単項式
const handleRefresh: RefreshFunction = (level, score) => {
  let [poly, mono] = poly_mono(level, score);
  if (level < 5 && poly.terms[0].isNegative) {
    poly = poly.neg();
  }

  const polyAns = poly.mul(mono).compact().orderTo();

  let question;
  if (randArray(true, false)) {
    question =
      poly.toLatex("()") +
      " \\times " +
      mono.toLatex({
        brackets: mono.isNegative ? "()" : "",
      });
  } else {
    question = mono.toLatex() + poly.toLatex("()");
  }
  const answer = polyAns.toLatex();
  return [dsp(question), dsp(answer)];
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
    polyVars.push(randArray("x", "y"), "");
  } else if (level == 3) {
    polyVars.push("x", "y", "");
  } else {
    polyVars.push("x", "y", "xy", "");
  }

  // 多項式の項数
  const kousuu = randArray(2, Math.min(3, polyVars.length));

  const idx = level - 1;
  const monoSpec: TermSpec = {
    max: guard(idx, 2, 3, 4, 5),
    maxD: kousuu == 3 ? 1 : guard(idx, 1, 1, 2, 3, 5),
    maxN: guard(idx, 1, 1, 2, 3, 5),
    allowNegative: level >= 2,
  };
  const polySpec: TermSpec = {
    max: guard(idx, 3, 5, 9),
    maxD: kousuu == 3 ? 1 : guard(idx, 1, 1, 1, 3, 5),
    maxN: guard(idx, 1, 1, 1, 2, 5),
    allowNegative: true,
  };

  // 単項式
  const mono = Monomial.create({
    ...monoSpec,
    factors: randArray(...monoVars),
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
      p.coeff.abs().compare(1) === 0 ||
      !poly.terms.find((x) => x.coeff.abs().compare(p.coeff.abs()) == 0)
    ) {
      const moji = polyVars.splice(getRandomInt(polyVars.length - 1), 1)[0];
      poly = poly.append(p.mul(moji));
    }
  } while (poly.length < kousuu);

  poly = poly.compact().orderTo();

  return [poly, mono];
};
