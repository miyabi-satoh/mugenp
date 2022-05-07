import { MugenContainer } from "~/components/container";
import { RefreshFunction } from "~/interfaces/types";
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
type Props = {
  title: string;
  message: string;
};
const Mugen = ({ title, message }: Props) => {
  return (
    <MugenContainer title={title} message={message} onRefresh={handleRefresh} />
  );
};

export { Mugen as M71212 };
export { handleRefresh as genpou_kihon };

// 減法の基本
const handleRefresh: RefreshFunction = (level, score) => {
  const values: Monomial[] = [];
  for (let i = 0; i < 2; i++) {
    const x = Monomial.create({
      max: 9,
      allowNegative: true,
      allowZero: i == 0,
    });
    values.push(x);
  }

  const question = values
    .map((x) => x.toLatex({ sign: true, brackets: "()" }))
    .join(" - ");

  const aValue = values.reduce(
    (pv, cv) => new Monomial(pv.coeff.sub(cv.coeff))
  );
  const answer = aValue.toLatex();

  return [dsp(question), dsp(answer)];
};
