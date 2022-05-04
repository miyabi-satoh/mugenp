import { MugenContainer } from "~/components/container";
import { RefreshFunction } from "~/interfaces/types";
import { getRandomInt, randArray } from "~/utils";
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
  let question = "";

  if (level === 1) {
    question += seisuu();
  } else if (level === 2) {
    question += randArray(seisuu, syousuu)();
  } else {
    question += randArray(seisuu, syousuu, bunsuu)();
  }

  let answer = "";
  if (randArray(true, false)) {
    answer = "+" + question;
    question += "\\,\\mbox{大きな数}";
  } else {
    answer = "-" + question;
    question += "\\,\\mbox{小さな数}";
  }

  return [`0\\mbox{よりも}\\, ${question}`, answer];
};

const seisuu = (): string => {
  const x = getRandomInt(9, 1);
  return String(x);
};

const syousuu = (): string => {
  const x = getRandomInt(50, 1);
  return String(x / 10);
};

const bunsuu = (): string => {
  const x = Monomial.create({
    max: 9,
    maxD: 9,
    maxN: 9,
  });
  return x.toLatex();
};
