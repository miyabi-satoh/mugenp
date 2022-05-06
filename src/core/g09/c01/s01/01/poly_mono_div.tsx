import { MugenContainer } from "~/components/container";
import { RefreshFunction } from "~/interfaces/types";
import { dsp } from "~/utils";
import { poly_mono } from "./poly_mono_mul";

// "id": "91112",
// "module": "poly_mono_div",
// "grade": "中3",
// "chapter": "式の展開と因数分解",
// "title": "\\( (a+b)\\div c \\) の計算",
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

export { Mugen as M91112 };

// 多項式 ÷ 単項式
const handleRefresh: RefreshFunction = (level, score) => {
  let [polyAns, mono] = poly_mono(level, score);

  let poly = polyAns.mul(mono).compact().orderTo();
  if (level < 5 && poly.terms[0].isNegative) {
    poly = poly.neg;
    polyAns = polyAns.neg;
  }

  const question =
    poly.toLatex("()") + " \\div " + mono.toLatex(mono.isNegative ? "()" : "");
  const answer = polyAns.toLatex();
  return [dsp(question), dsp(answer)];
};
