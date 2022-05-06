import { MugenContainer } from "~/components/container";
import { RefreshFunction } from "~/interfaces/types";
import { byScore, dsp, getRandomInt, guard, randArray } from "~/utils";
import { Fraction } from "~/utils/fraction";
import { Monomial } from "~/utils/monomial";

// "id": "71301",
// "module": "daisyou",
// "grade": "中1",
// "chapter": "正の数・負の数",
// "section": "正の数・負の数",
// "subsection": "絶対値と数の大小",
// "title": "正の数・負の数の大小",
// "message": "次の各組の数の大小を、不等号(＜)を使って表しなさい。"
type Props = {
  message: string;
};
const Mugen = ({ message }: Props) => {
  return (
    <MugenContainer
      answerPrefix=""
      message={message}
      onRefresh={handleRefresh}
    />
  );
};

export { Mugen as M71301 };

// 正の数・負の数の大小
const handleRefresh: RefreshFunction = (level, score) => {
  const idx = level - 1;
  const len = byScore(score, 2, 3);
  const values: Fraction[] = [];
  const stack: { [key: string]: number } = {};

  do {
    let x = Monomial.create({
      max: 9,
      maxD: guard(idx, 1, 5, 10),
      maxN: guard(idx, 1, 4, 9),
      allowNegative: true,
      allowZero: true,
    }).coeff;
    // 分母が5or10なら小数表記にする
    if (x.d == 5 || x.d == 10) {
      x = new Fraction(x.valueOf);
    }
    const key = x.toLatex();
    if (stack[key] === undefined) {
      stack[key] = 1;
      values.push(x);
    }
  } while (values.length < len);

  const question = values.map((x) => x.toLatex()).join(",\\quad ");
  const answer = values
    .sort((a, b) => a.compare(b))
    .map((x) => x.toLatex())
    .join(" < ");

  return [dsp(question), dsp(answer)];
};
