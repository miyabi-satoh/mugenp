import { MugenContainer } from "~/components/container";
import { RefreshFunction } from "~/interfaces/types";
import { dsp } from "~/utils";
import { Monomial } from "~/utils/monomial";

// "id": "71211",
// "module": "kahou_kihon",
// "grade": "中1",
// "chapter": "正の数・負の数",
// "section": "正の数・負の数の計算",
// "subsection": "正の数・負の数の加法，減法",
// "title": "加法の基本",
// "message": "次の計算をしなさい。"
const Mugen = () => {
  return <MugenContainer onRefresh={handleRefresh} />;
};

export { Mugen as M71211 };
export { handleRefresh as kahou_kihon };

// 加法の基本
const handleRefresh: RefreshFunction = (level, score) => {
  const values: Monomial[] = [];
  do {
    const x = Monomial.create({
      max: 9,
      allowNegative: true,
    });
    values.push(x);
  } while (values.length < 2);

  const question = values
    .map((x) => x.toLatex({ sign: true, brackets: "()" }))
    .join(" + ");

  const aValue = values.reduce(
    (pv, cv) => new Monomial(pv.coeff.add(cv.coeff))
  );
  const answer = aValue.toLatex();

  return [dsp(question), dsp(answer)];
};
