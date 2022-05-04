import { MugenContainer } from "~/components/container";
import { RefreshFunction } from "~/interfaces/types";
import { gcd } from "~/utils";
import { poly_mono } from "../01";

// "id": "91401",
// "module": "kyoutuu_bunkai",
// "grade": "中3",
// "chapter": "式の展開と因数分解",
// "title": "共通因数でくくる",
// "message": "次の式を因数分解しなさい。"
type Props = {
  message: string;
};
const Mugen = ({ message }: Props) => {
  return <MugenContainer message={message} onRefresh={handleRefresh} />;
};

export { Mugen as M91401 };
export { handleRefresh as kyoutuu_bunkai };

// 共通因数でくくる
const handleRefresh: RefreshFunction = (level, score) => {
  let [poly, mono] = poly_mono(level, score);
  if (poly.terms.find((x) => x.isFrac)) {
    return ["", ""];
  }
  if (mono.isFrac) {
    return ["", ""];
  }
  if (poly.terms[0].isNegative) {
    poly = poly.neg;
  }
  if (mono.isNegative) {
    mono = mono.neg;
  }

  const g = gcd(...poly.terms.map((x) => x.coeff.valueOf));
  poly = poly.div(g);
  mono = mono.mul(g);

  const question = poly.mul(mono).toLatex();
  const answer = mono.toLatex() + poly.toLatex("()");
  return [question, answer];
};