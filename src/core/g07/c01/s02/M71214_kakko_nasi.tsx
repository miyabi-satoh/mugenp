import { MugenContainer } from "~/components/container";
import { RefreshFunction } from "~/interfaces/types";
import { dsp } from "~/utils";
import { Monomial } from "~/utils/monomial";

// "id": "71214",
// "module": "kakko_nasi",
// "grade": "中1",
// "chapter": "正の数・負の数",
// "section": "正の数・負の数の計算",
// "subsection": "正の数・負の数の加法，減法",
// "title": "カッコのない加減法",
// "message": "次の計算をしなさい。"
const Mugen = () => {
  return <MugenContainer onRefresh={handleRefresh} />;
};

export { Mugen as M71214 };

// カッコのない加減法
const handleRefresh: RefreshFunction = (level, score) => {
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

  const question = values.map((x, i) => x.toLatex({ sign: i != 0 })).join("");

  const aValue = values.reduce(
    (pv, cv) => new Monomial(pv.coeff.add(cv.coeff))
  );
  const showZero = true;
  const answer = aValue.toLatex({ showZero });

  return [dsp(question), dsp(answer)];
};
