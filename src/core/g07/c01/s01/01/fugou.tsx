import { MugenContainer } from "~/components/container";
import { RefreshFunction } from "~/interfaces/types";
import { dsp, getRandomInt, randArray } from "~/utils";
import { LatexOptions, Monomial } from "~/utils/monomial";

// "id": "71111",
// "module": "fugou",
// "grade": "中1",
// "chapter": "正の数・負の数",
// "section": "正の数・負の数",
// "subsection": "０より小さい数",
// "title": "正の符号・負の符号",
// "message": "次の数について、正の符号または負の符号をつけて表しなさい。"
type Props = {
  title: string;
  message: string;
};
const Mugen = ({ title, message }: Props) => {
  return (
    <MugenContainer
      answerPrefix=""
      maxLv={3}
      title={title}
      message={message}
      onRefresh={handleRefresh}
    />
  );
};

export { Mugen as M71111 };

// 0よりX[大きい,小さい]数を答える
const handleRefresh: RefreshFunction = (level, score) => {
  let qValue: Monomial;
  const opt: LatexOptions = {};

  const mode = getRandomInt(level, 1);
  switch (mode) {
    case 1:
      qValue = seisuu();
      break;
    case 2:
      qValue = syousuu();
      opt.decimal = true;
      break;
    default:
      qValue = bunsuu();
  }

  let aValue: Monomial;
  let qType: string;
  if (randArray(true, false)) {
    aValue = qValue;
    qType = " 大きな";
  } else {
    aValue = qValue.neg();
    qType = " 小さな";
  }

  const question = `${dsp("0")} よりも ${dsp(qValue.toLatex(opt))}${qType}数`;
  const answer = dsp(aValue.toLatex({ ...opt, sign: true }));
  return [question, answer];
};

const seisuu = (): Monomial => {
  return Monomial.create({
    max: 9,
  });
};

const syousuu = (): Monomial => {
  const m = Monomial.create({
    max: 50,
  });
  const y = getRandomInt(m.toString().length, 1);
  return m.div(Math.pow(10, y));
};

const bunsuu = (): Monomial => {
  return Monomial.create({
    max: 9,
    maxD: 9,
    maxN: 9,
  });
};
