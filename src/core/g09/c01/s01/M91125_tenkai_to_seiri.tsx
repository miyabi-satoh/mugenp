import { MugenP, GeneratorFunc } from "~/components/mugenp";
import { dsp, guard, randArray } from "~/utils";
import { Monomial } from "~/utils/monomial";
import { Polynomial } from "~/utils/polynomial";

// "id": "91125",
// "module": "tenkai_to_seiri",
// "grade": "中3",
// "chapter": "式の展開と因数分解",
// "title": "展開と整理",
// "message": "次の計算をしなさい。"
export const M91125 = () => {
  return <MugenP columns={1} maxLv={5} generator={generatorFunc} />;
};

// 展開と整理 m(x + a)(x + b) + n(x + c)(x + d)
const generatorFunc: GeneratorFunc = (level) => {
  const idx = level - 1;
  const y = level > 2 ? randArray("", "y") : "";
  const mn = [];
  const p = [];
  const s = [];
  for (let i = 0; i < 2; i++) {
    const x = Monomial.create({
      factors: "x",
    });
    for (let j = 0; j < 2; j++) {
      const poly = new Polynomial(
        x,
        Monomial.create({
          factors: y,
          max: guard(idx, 3, 3, 5, 7, 9),
          allowNegative: true,
        })
      );
      p.push(poly);
      s.push(poly.toLatex("()"));
    }
    mn.push(
      Monomial.create({
        max: guard(idx, 1, 2, 3, 4),
        allowNegative:
          i == 0 ? guard(idx, false, false, true) : guard(idx, false, true),
      })
    );
  }

  let question = "";
  for (let i = 0; i < 2; i++) {
    if (mn[i].coeff.equals(1)) {
      if (i != 0) {
        question += "+";
      }
    } else if (mn[i].coeff.equals(-1)) {
      question += "-";
    } else {
      question += mn[i].toLatex({ sign: i != 0 });
    }

    if (s[i * 2] == s[i * 2 + 1]) {
      // 平方公式になる場合
      if (level > 1) {
        const x = Monomial.create({
          factors: "x",
          max: guard(idx, 1, 1, 2, 3),
          allowZero: true,
        });
        p[i * 2] = p[i * 2].add(x);
        p[i * 2 + 1] = p[i * 2 + 1].add(x);
        s[i * 2] = p[i * 2].toLatex("()");
      }
      question += s[i * 2] + "^2";
    } else {
      if (level > 1) {
        if (p[i * 2].terms[1].coeff.equals(p[i * 2 + 1].terms[1].coeff.neg())) {
          // 和と差の積になる場合
          const x = Monomial.create({
            factors: "x",
            max: guard(idx, 1, 1, 2, 3),
            allowZero: true,
          });
          p[i * 2] = p[i * 2].add(x);
          s[i * 2] = p[i * 2].toLatex("()");
          p[i * 2 + 1] = p[i * 2 + 1].add(x);
          s[i * 2 + 1] = p[i * 2 + 1].toLatex("()");
        }
      }
      question += s[i * 2] + s[i * 2 + 1];
    }
  }

  let answer = p[0]
    .mul(p[1])
    .mul(mn[0])
    .add(p[2].mul(p[3]).mul(mn[1]))
    .compact()
    .orderTo()
    .toLatex();
  if (answer.length === 0) {
    answer = "0";
  }

  question = dsp(question);
  answer = dsp(answer);
  return { question, answer };
};
