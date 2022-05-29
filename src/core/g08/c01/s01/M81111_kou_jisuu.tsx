import Fraction from "fraction.js";
import { MugenP, GeneratorFunc } from "~/components/mugenp";
import { dsp, getRandomInt, randArray } from "~/utils";
import { Monomial } from "~/utils/monomial";
import { Polynomial } from "~/utils/polynomial";

// "id": "81111",
// "module": "kou_jisuu",
// "grade": "中2",
// "chapter": "式の計算",
// "section": "式の計算",
// "subsection": "式の加法，減法",
// "title": "単項式・多項式・次数",
// "message": "次の式が単項式ならば次数を、多項式ならば項と次数を答えなさい。"
export const M81111 = () => {
  return (
    <MugenP
      maxLv={1}
      answerPrefix=""
      displayStyle={false}
      generator={generatorFunc}
    />
  );
};

// 単項式・多項式・次数
const generatorFunc: GeneratorFunc = (level) => {
  // 項数
  const kousuu = randArray(1, 2, 3);
  // 次数
  const zisuu: number[] = [];
  do {
    const z = getRandomInt(4);
    if (z === 0) {
      // 次数0(定数項)の場合
      if (kousuu === 1) {
        // 単項式で定数は不可
        continue;
      } else if (zisuu.find((v) => v === 0)) {
        // 多項式で既に定数項が存在したら不可
        continue;
      }
    }
    zisuu.push(z);
  } while (zisuu.length < kousuu);

  let poly = new Polynomial();
  zisuu.forEach((z) => {
    // 係数
    let m = Monomial.create({
      max: 9,
      allowNegative: true,
    });
    // 文字
    for (let i = 0; i < z; i++) {
      m = m.mul(randArray("x", "y"));
    }
    poly = poly.add(m);
  });

  const question = dsp(poly.toLatex());
  let answer = "";
  if (poly.length > 1) {
    // 多項式の項
    answer += "項：";
    answer += dsp(poly.terms.map((t) => t.toLatex()).join(",\\,"));
    answer += "　";
  }
  // 次数
  let maxZisuu = new Fraction(0);
  poly.terms.forEach((t) => {
    if (maxZisuu.compare(t.degree()) < 0) {
      maxZisuu = t.degree();
    }
  });
  answer += "次数：";
  answer += dsp(maxZisuu.toLatex());

  return { question, answer };
};
