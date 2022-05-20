import { MugenContainer } from "~/components/container";
import { RefreshFunction } from "~/interfaces/types";
import { dsp, getRandomInt, guard, randArray } from "~/utils";
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
  const idx = level - 1;
  const terms: Monomial[] = [];
  ["a", "b", "c", ""].forEach((c, i) => {
    const x = Monomial.create({
      max: level + i, // level + (0,1,2,3)
      maxD: guard(idx, 1, 1, 1, 5),
      maxN: guard(idx, 1, 1, 1, 5),
      factors: c,
      allowNegative: true,
      allowZero: true,
    });
    terms.push(x);
  });

  const pLeft = new Polynomial(
    ...terms.splice(0, getRandomInt(terms.length - 1, 1))
  );
  const pRight = new Polynomial(...terms);

  let question = "";
  let answer = "";

  question = pLeft.toLatex() + " = " + pRight.toLatex();
  answer = question;

  return [dsp(question), dsp(answer)];
};
