import { MugenP, GeneratorFunc } from "~/components/mugenp";
import { dsp, getRandomInt, minMax, randArray } from "~/utils";
import { Monomial } from "~/utils/monomial";
import { Polynomial } from "~/utils/polynomial";

// "id": "91113",
// "module": "poly_poly_mul",
// "grade": "中3",
// "chapter": "式の展開と因数分解",
// "title": "\\( (a+b)(c+d) \\) の展開",
// "message": "次の式を展開をしなさい。"
export const M91113 = () => {
  return <MugenP maxLv={6} generator={generatorFunc} />;
};

// 多項式 × 多項式
const generatorFunc: GeneratorFunc = (level) => {
  // 多項式の文字
  //  Lv1 : (x) + (N)
  //  Lv2 : (x) + (N)
  //        (y) + (N)
  //  Lv3 : (x) + (N)
  //        (y) + (N)
  //        (x) + (y)
  //        (x) + (y) + (N)
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
        max: minMax(3, level * 2, 9),
        maxD: kousuu == 3 || level < 5 ? 1 : 5,
        maxN: 5,
        allowNegative: true,
      });

      // ±1以外は同じような数が並ばないようにする
      if (
        p.coeff.abs().compare(1) == 0 ||
        !expressions[i].terms.find(
          (x) => x.coeff.abs().compare(p.coeff.abs()) == 0
        )
      ) {
        p = p.mul(moji.splice(getRandomInt(moji.length - 1), 1)[0]);
        expressions[i] = expressions[i].append(p);
      }
    } while (expressions[i].length < kousuu);

    expressions[i] = expressions[i].orderTo();
    // 初項がマイナスにならないようにする
    if (expressions[i].terms[0].isNegative) {
      expressions[i] = expressions[i].neg();
    }
  }

  // 式として作成
  let polyAns = expressions[0].mul(expressions[1]).compact();

  const question = dsp(
    expressions[0].toLatex("()") + expressions[1].toLatex("()")
  );
  const answer = dsp(polyAns.toLatex());
  return { question, answer };
};
