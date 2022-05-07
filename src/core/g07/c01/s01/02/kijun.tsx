import { MugenContainer } from "~/components/container";
import { RefreshFunction } from "~/interfaces/types";
import { dsp, getRandomInt, guard, randArray } from "~/utils";
import { Monomial } from "~/utils/monomial";

// "id": "71122",
// "module": "kijun",
// "grade": "中1",
// "chapter": "正の数・負の数",
// "section": "正の数・負の数",
// "subsection": "正の数・負の数で量を表す",
// "title": "基準からの増減や過不足",
// "message": "次の問いに答えなさい。"
type Props = {
  title: string;
  message: string;
};
const Mugen = ({ title, message }: Props) => {
  return (
    <MugenContainer
      answerPrefix=""
      columns={1}
      title={title}
      message={message}
      onRefresh={handleRefresh}
    />
  );
};

export { Mugen as M71122 };

// 基準とした量からの増減や過不足
const handleRefresh: RefreshFunction = (level, score) => {
  const patterns = [
    "{x}{unit}を基準としたとき、{y}{unit}を符号を使って表しなさい。",
    "{x}{unit}を基準にして{y}{unit}と表すとき、実際には何{unit}のことですか。",
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
      .replaceAll("{x}", dsp(String(base)))
      .replaceAll("{unit}", unit)
      .replaceAll("{y}", dsp(diff.coeff.add(base).toLatex()));
    answer = dsp(diff.toLatex({ sign: true })) + unit;
  } else {
    question = patterns[1]
      .replaceAll("{x}", dsp(String(base)))
      .replaceAll("{unit}", unit)
      .replaceAll("{y}", dsp(diff.toLatex({ sign: true })));
    answer = dsp(diff.coeff.add(base).toLatex()) + unit;
  }

  return [question, answer];
};
