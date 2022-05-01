import { MugenContainer } from "~/components/container";
import { RefreshFunction } from "~/interfaces/types";
import { drawLots, getParam, getRandomInt } from "~/utils";
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
  return <MugenContainer message={message} onRefresh={onRefresh} />;
};

export { Mugen as M91101 };

const onRefresh: RefreshFunction = (score) => {
  // 多項式 × 単項式

  // 多項式の項数
  const maxKousuu = score > 10 ? 3 : 2;
  const kousuu = drawLots(Math.min(50, score * 5), maxKousuu, 2);

  // 単項式の係数
  let mono = new Monomial(
    getParam({
      max: Math.min(Math.max(2, score), 5),
      maxD: kousuu == 3 || score < 10 ? 1 : 5,
      maxN: 5,
      allowZero: false,
      allowNegative: score >= 5,
    })
  );
  // 単項式の文字
  mono = mono.mul(drawLots(Math.max(33, 100 - score * 5), "x", "y", "xy"));

  // 多項式の係数
  const keisuu: Fraction[] = [];

  do {
    let p = getParam({
      max: Math.min(Math.max(3, score), 9),
      maxD: kousuu == 3 || score < 20 ? 1 : 5,
      maxN: 5,
      allowZero: false,
      allowNegative: keisuu.length > 0,
    });
    if (score < 20) {
      if (mono.coeff.isFrac) {
        // 乗算の結果が分数になる場合は、あらかじめ分母をかけておき
        // 答えが整数になるようにする
        const a = p.mul(mono.coeff);
        if (a.isFrac) {
          p = p.mul(a.d);
        }
      }
    } else {
      if (p.isFrac || mono.coeff.isFrac) {
        // 分数の乗算で約分が発生しないのは面白くない
        const a = p.mul(mono.coeff);
        if (a.d == p.d * mono.coeff.d && a.n == p.n * mono.coeff.n) {
          continue;
        }
      }
    }

    // ±1以外は同じような数が並ばないようにする
    if (p.resembles(1) || !keisuu.find((x) => x.resembles(p))) {
      keisuu.push(p);
    }
  } while (keisuu.length < kousuu);

  // 多項式の文字
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
  let poly = new Polynomial();
  for (let i = 0; i < kousuu; i++) {
    poly = poly.append(new Monomial(keisuu[i], moji[i]));
  }
  poly = poly.orderTo();

  let polyAns = poly.mul(mono).compact().orderTo();

  let question;
  if (drawLots(50, true, false)) {
    question =
      "\\left(" +
      poly.toLatex() +
      "\\right)" +
      " \\times " +
      mono.toLatex(mono.coeff.isNegative ? "()" : "");
  } else {
    question = mono.toLatex() + "\\left(" + poly.toLatex() + "\\right)";
  }
  const answer = polyAns.toLatex();
  return [question, answer];
};
