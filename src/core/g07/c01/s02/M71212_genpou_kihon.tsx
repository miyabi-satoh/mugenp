import { MugenP, GeneratorFunc } from "~/components/mugenp";
import { dsp } from "~/utils";
import { Monomial } from "~/utils/monomial";

// "id": "71212",
// "module": "genpou_kihon",
// "grade": "中1",
// "chapter": "正の数・負の数",
// "section": "正の数・負の数の計算",
// "subsection": "正の数・負の数の加法，減法",
// "title": "減法の基本",
// "message": "次の計算をしなさい。"
export const M71212 = () => {
  return <MugenP maxLv={1} generator={genpou_kihon} />;
};

// 減法の基本
export const genpou_kihon: GeneratorFunc = (level) => {
  const values: Monomial[] = [];
  do {
    const x = Monomial.create({
      max: 9,
      allowNegative: true,
    });
    values.push(x);
  } while (values.length < 2);

  const question = dsp(
    values.map((x) => x.toLatex({ brackets: "()" })).join(" - ")
  );

  const aValue = values.reduce(
    (pv, cv) => new Monomial(pv.coeff.sub(cv.coeff))
  );
  const showZero = true;
  const answer = dsp(aValue.toLatex({ showZero }));

  return { question, answer };
};
