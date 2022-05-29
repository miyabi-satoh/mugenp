import { MugenP, GeneratorFunc } from "~/components/mugenp";
import { dsp, getRandomInt, randArray } from "~/utils";
import { Monomial } from "~/utils/monomial";
import { Polynomial } from "~/utils/polynomial";

// "id": "81113",
// "module": "kahou_genpou",
// "grade": "中2",
// "chapter": "式の計算",
// "section": "式の計算",
// "subsection": "式の加法，減法",
// "title": "多項式の加法，減法",
// "message": "次の計算をしなさい。"
export const M81113 = () => {
  return <MugenP maxLv={3} generator={generatorFunc} />;
};

// 多項式の加法，減法
const generatorFunc: GeneratorFunc = (level) => {
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

  let poly: Polynomial[] = [new Polynomial(), new Polynomial()];
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < kousuu; j++) {
      poly[i] = poly[i].append(
        Monomial.create({
          max: 9,
          allowNegative: j !== 0,
          factors: moji[j],
        })
      );
    }
  }

  const operator = randArray("+", "-");

  const question = dsp(
    poly[0].toLatex("()") + operator + poly[1].toLatex("()")
  );

  if (operator === "-") {
    poly[1] = poly[1].neg();
  }

  let answer = poly[0].add(poly[1]).toLatex();
  if (answer.length === 0) {
    answer = "0";
  }
  answer = dsp(answer);

  return { question, answer };
};
