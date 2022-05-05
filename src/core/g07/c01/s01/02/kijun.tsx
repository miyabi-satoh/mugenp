import { MugenContainer } from "~/components/container";
import { RefreshFunction } from "~/interfaces/types";
import { getRandomInt, guard, randArray } from "~/utils";
import { Fraction } from "~/utils/fraction";
import { Monomial } from "~/utils/monomial";

// "id": "71202",
// "module": "kijun",
// "grade": "中1",
// "chapter": "正の数・負の数",
// "section": "正の数・負の数",
// "subsection": "正の数・負の数で量を表す",
// "title": "基準からの増減や過不足",
// "message": "次の問いに答えなさい。"
type Props = {
  message: string;
};
const Mugen = ({ message }: Props) => {
  return (
    <MugenContainer
      answerPrefix=""
      columns={1}
      message={message}
      onRefresh={handleRefresh}
    />
  );
};

export { Mugen as M71202 };

// 基準とした量からの増減や過不足
const handleRefresh: RefreshFunction = (level, score) => {
  const patterns = [
    "{x}\\mbox{{unit}を基準としたとき、}{y}\\mbox{{unit}を符号を使って表しなさい。}",
    "{x}\\mbox{{unit}を基準にして}{y}\\mbox{{unit}と表すとき、実際には何{unit}のことですか。}",
  ];
  const units = ["個", "円", "歩", "m", "km", "kg", "分", "時間", "日", "年"];

  const idx = level - 1;
  const base = getRandomInt(60, 40);
  const diff = Monomial.create({
    max: guard(idx, 5, 11, 19),
    allowNegative: true,
  });
  const unit = randArray(...units);

  let question = "";
  let answer = "";
  if (randArray(true, false)) {
    question = patterns[0]
      .replaceAll("{x}", String(base))
      .replaceAll("{unit}", unit)
      .replaceAll("{y}", diff.coeff.add(base).toLatex());
    answer = diff.coeff.toLatex(true) + `\\mbox{${unit}}`;
  } else {
    question = patterns[1]
      .replaceAll("{x}", String(base))
      .replaceAll("{unit}", unit)
      .replaceAll("{y}", diff.coeff.toLatex(true));
    answer = diff.coeff.add(base).toLatex() + `\\mbox{${unit}}`;
  }

  return [question, answer];
};
