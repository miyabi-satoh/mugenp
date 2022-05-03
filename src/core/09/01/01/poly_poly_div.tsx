import { MugenContainer } from "~/components/container";
import { RefreshFunction } from "~/interfaces/types";
import { getRandomInt, randArray } from "~/utils";
import { Monomial } from "~/utils/monomial";
import { Polynomial } from "~/utils/polynomial";

// "id": "91103",
// "module": "poly_poly_div",
// "grade": "中3",
// "chapter": "式の展開と因数分解",
// "title": "\\( (a+b)(c+d) \\) の展開",
// "message": "次の式を展開をしなさい。"
type Props = {
  message: string;
};
const Mugen = ({ message }: Props) => {
  return <MugenContainer message={message} onRefresh={handleRefresh} />;
};

export { Mugen as M91103 };

// 多項式 × 多項式
const handleRefresh: RefreshFunction = (level, score) => {
  // 多項式の文字
  const polyVars: string[] = [];
  if (level == 1) {
    polyVars.push("x", "");
  } else if (level == 2) {
    polyVars.push(randArray("x", "y"), "");
  } else {
    polyVars.push("x", "y", "");
  }

  const expressions = [new Polynomial(), new Polynomial()];

  for (let i = 0; i < 2; i++) {
    const moji = [...polyVars];
    let kousuu: number = 2;
    if (level >= 3) {
      kousuu = randArray(2, 3);
      if (i > 0 && expressions[0].terms.length === 3) {
        kousuu = 2;
      }
    }

    do {
      let p = Monomial.create({
        max: Math.min(Math.max(3, score), 9),
        maxD: kousuu == 3 || level < 5 ? 1 : 5,
        maxN: 5,
        allowNegative: true,
      });

      // ±1以外は同じような数が並ばないようにする
      if (
        p.coeff.resembles(1) ||
        !expressions[i].terms.find((x) => x.coeff.resembles(p.coeff))
      ) {
        p = p.mul(moji.splice(getRandomInt(moji.length - 1), 1)[0]);
        expressions[i] = expressions[i].append(p);
      }
    } while (expressions[i].length < kousuu);

    expressions[i] = expressions[i].orderTo();
    // 初項がマイナスにならないようにする
    if (expressions[i].terms[0].isNegative) {
      expressions[i] = expressions[i].mul(-1);
    }
  }

  // 式として作成
  let polyAns = expressions[0].mul(expressions[1]).compact();

  const question = expressions[0].toLatex("()") + expressions[1].toLatex("()");
  const answer = polyAns.toLatex();
  return [question, answer];
};
