import { MugenContainer } from "~/components/container";
import { RefreshFunction } from "~/interfaces/types";
import { byScore, dsp, guard } from "~/utils";
import { Monomial } from "~/utils/monomial";
import { Polynomial } from "~/utils/polynomial";

// "id": "91125",
// "module": "tenkai_to_seiri",
// "grade": "中3",
// "chapter": "式の展開と因数分解",
// "title": "展開と整理",
// "message": "次の計算をしなさい。"
const Mugen = () => {
  return <MugenContainer columns={1} onRefresh={handleRefresh} />;
};

export { Mugen as M91125 };

// 展開と整理 m(x + a)(x + b) + n(x + c)(x + d)
const handleRefresh: RefreshFunction = (level, score) => {
  const idx = level - 1;
  const y = byScore(score, "", "y");
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

  return [dsp(question), dsp(answer)];
};
