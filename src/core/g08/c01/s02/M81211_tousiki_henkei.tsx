import { MugenContainer } from "~/components/container";
import { RefreshFunction } from "~/interfaces/types";
import { dsp, getRandomInt, guard } from "~/utils";
import { Monomial } from "~/utils/monomial";
import { Polynomial } from "~/utils/polynomial";

// "id": "81211",
// "module": "tousiki_henkei",
// "grade": "中2",
// "chapter": "式の計算",
// "section": "文字式の利用",
// "subsection": "文字式の利用",
// "title": "等式変形",
// "message": "次の等式を[　]内の文字について解きなさい。"
const Mugen = () => {
  return <MugenContainer answerPrefix="" onRefresh={handleRefresh} />;
};

export { Mugen as M81211 };

// 等式変形
const handleRefresh: RefreshFunction = (level, score) => {
  // Lv1: 左辺→右辺へ移項
  // Lv2: 左辺→右辺、右辺→左辺へそれぞれ移項
  // Lv3: 移項後、自然数で割る(約分なし)
  // Lv4: 移項後、整数で割る(約分もあり)
  // Lv5: 移項後、文字で割る(文字の約分はなし)
  // Lv6: 多項式と数の積商を含む
  const idx = level - 1;
  let a = Monomial.create({
    max: guard(idx, 1, 1, 9),
    factors: "x",
  });
  let b = Monomial.create({
    max: 9,
    factors: "y",
    allowNegative: true,
  });
  let c = Monomial.create({
    max: 9,
    allowNegative: true,
    allowZero: true,
  });

  let question = "";
  let answer = "";
  if (level === 1) {
    question =
      a.toLatex() +
      b.toLatex({ sign: true }) +
      "=" +
      c.toLatex() +
      "\\quad [" +
      a.factors[0] +
      "]";
    answer = a.toLatex() + "=" + c.toLatex() + b.neg().toLatex({ sign: true });
  }
  if (level === 2) {
    question =
      b.toLatex() +
      "=" +
      a.neg().toLatex() +
      c.toLatex({ sign: true }) +
      "\\quad [" +
      a.factors[0] +
      "]";
    answer = a.toLatex() + "=" + c.toLatex() + b.neg().toLatex({ sign: true });
  }

  return [dsp(question), dsp(answer)];
};
