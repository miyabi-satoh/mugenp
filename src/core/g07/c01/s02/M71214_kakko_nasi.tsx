import { MugenP, GeneratorFunc } from "~/components/mugenp";
import { Monomial } from "~/utils/monomial";

// "id": "71214",
// "module": "kakko_nasi",
// "grade": "中1",
// "chapter": "正の数・負の数",
// "section": "正の数・負の数の計算",
// "subsection": "正の数・負の数の加法，減法",
// "title": "カッコのない加減法",
// "message": "次の計算をしなさい。"
export const M71214 = () => {
  return <MugenP maxLv={1} generator={generatorFunc} />;
};

// カッコのない加減法
const generatorFunc: GeneratorFunc = (level) => {
  const values: Monomial[] = [];
  do {
    const x = Monomial.create({
      max: 9,
      allowNegative: true,
      allowZero: true,
    });
    // 0と0の計算はスキップ
    if (x.coeff.equals(0) && values.find((v) => v.coeff.equals(0))) {
      continue;
    }
    values.push(x);
  } while (values.length < 2);

  const showZero = true;
  const question = values
    .map((x, i) => x.toLatex({ sign: i != 0, showZero }))
    .join("");

  const aValue = values.reduce(
    (pv, cv) => new Monomial(pv.coeff.add(cv.coeff))
  );
  const answer = aValue.toLatex({ showZero });

  return { question, answer };
};
