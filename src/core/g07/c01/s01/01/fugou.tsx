import { MugenContainer } from "~/components/container";
import { RefreshFunction } from "~/interfaces/types";
import { dsp, getRandomInt, randArray } from "~/utils";
import { Fraction } from "~/utils/fraction";
import { Monomial } from "~/utils/monomial";

// "id": "71101",
// "module": "fugou",
// "grade": "中1",
// "chapter": "正の数・負の数",
// "section": "正の数・負の数",
// "subsection": "０より小さい数",
// "title": "正の符号・負の符号",
// "message": "次の数について、正の符号または負の符号をつけて表しなさい。"
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

export { Mugen as M71101 };

// 0よりX[大きい,小さい]数を答える
const handleRefresh: RefreshFunction = (level, score) => {
  let qValue: Fraction;

  if (level === 1) {
    qValue = seisuu();
  } else if (level === 2) {
    qValue = randArray(seisuu, syousuu)();
  } else {
    qValue = randArray(seisuu, syousuu, bunsuu)();
  }

  let aValue: Fraction;
  let qType: string;
  if (randArray(true, false)) {
    aValue = new Fraction(qValue);
    qType = " 大きな";
  } else {
    aValue = qValue.neg;
    qType = " 小さな";
  }

  const question = dsp("0") + " よりも " + dsp(qValue.toLatex()) + qType + "数";
  return [question, dsp(aValue.toLatex(true))];
};

const seisuu = (): Fraction => {
  return new Fraction(getRandomInt(9, 1));
};

const syousuu = (): Fraction => {
  return new Fraction(getRandomInt(50, 1) / 10);
};

const bunsuu = (): Fraction => {
  return Monomial.create({
    max: 9,
    maxD: 9,
    maxN: 9,
  }).coeff;
};
