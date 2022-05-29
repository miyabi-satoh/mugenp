import { MugenP, GeneratorFunc } from "~/components/mugenp";
import { dsp, getRandomInt, guard, minMax, randArray } from "~/utils";
import { Monomial } from "~/utils/monomial";
import { Polynomial } from "~/utils/polynomial";

// "id": "81122",
// "module": "poly_num_div",
// "grade": "中2",
// "chapter": "式の計算",
// "section": "式の計算",
// "subsection": "いろいろな多項式の計算",
// "title": "多項式と数の除法",
// "message": "次の計算をしなさい。"
export const M81122 = () => {
  return <MugenP maxLv={4} generator={generatorFunc} />;
};

// 多項式と数の除法
const generatorFunc: GeneratorFunc = (level) => {
  // 割る数
  const idx = level - 1;
  let mono: Monomial;
  do {
    mono = Monomial.create({
      max: guard(idx, 9),
      maxD: randArray(1, 1, guard(idx, 1, 2, 3, 6)),
      maxN: guard(idx, 1, 4, 6, 9),
      allowNegative: level >= 1,
    });
  } while (mono.abs().equals(1));

  // 文字は固定パターンから、ランダムに2つ選択
  const pattern = [];
  let kousuu = 2;
  if (level === 1) {
    pattern.push("x", "y");
  } else if (level === 2) {
    pattern.push("x", "y", "xy");
  } else {
    pattern.push("x", "y", "xy", "x^{2}", "y^{2}");
    kousuu = randArray(2, 3);
  }
  const moji: string[] = [];
  do {
    moji.push(pattern.splice(getRandomInt(pattern.length - 1), 1)[0]);
  } while (moji.length < 2);
  moji.sort();
  // 定数項を追加しておく
  moji.push("");

  let poly = new Polynomial();
  for (let j = 0; j < kousuu; j++) {
    poly = poly.append(
      Monomial.create({
        max: minMax(12, mono.coeff.mul(9).abs().valueOf(), 30),
        allowNegative: j !== 0,
        factors: moji[j],
      })
    );
  }
  poly = poly.orderTo();

  const question = dsp(
    `${poly.toLatex("()")} \\div ${mono.toLatex({
      brackets: mono.isNegative ? "()" : "",
    })}`
  );

  const answer = dsp(poly.div(mono).toLatex());
  if (answer.includes("frac")) {
    return { question: "", answer: "" };
  }

  return { question, answer };
};
