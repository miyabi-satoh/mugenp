import { MugenContainer } from "~/components/container";
import { RefreshFunction } from "~/interfaces/types";
import { byScore, dsp, getRandomInt, guard, randArray } from "~/utils";
import { Fraction } from "~/utils/fraction";
import { Monomial } from "~/utils/monomial";

// "id": "71211",
// "module": "kahou",
// "grade": "中1",
// "chapter": "正の数・負の数",
// "section": "正の数・負の数の計算",
// "subsection": "正の数・負の数の加法，減法",
// "title": "加法の基本",
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

export { Mugen as M71211 };

// 加法の基本
const handleRefresh: RefreshFunction = (level, score) => {
  const idx = level - 1;

  let a = Monomial.create({
    max: guard(idx, 9, 9, 20, 9),
    maxD: guard(idx, 1, 1, 1, 1, 9),
    maxN: guard(idx, 1, 1, 1, 1, 9),
    allowNegative: true,
  }).coeff;

  let b = Monomial.create({
    max: 9,
    maxD: guard(idx, 1, 1, 1, 1, 9),
    maxN: guard(idx, 1, 1, 1, 1, 9),
    allowNegative: true,
  }).coeff;

  if (level === 3) {
    // ランダムで小数にする
    if (randArray(true, false)) {
      a = new Fraction(a.n / Math.pow(10, getRandomInt(String(a).length, 1)));
      b = new Fraction(b.n / Math.pow(10, getRandomInt(String(b).length, 1)));
    }
  } else if (level === 4) {
    // 分数にする
    const m = getRandomInt(9, 2);
    const newA = a.div(m);
    const newB = b.div(m);
    if (newA.d == newB.d) {
      a = newA;
      b = newB;
    }
  }

  const k1 = new Monomial(a);
  const k2 = new Monomial(b);
  const question = k1.toLatex(true, "()") + "+" + k2.toLatex(true, "()");
  const answer = a.add(b).toLatex();

  return [dsp(question), dsp(answer)];
};
