import { GeneratorFunc, MugenP } from "~/components/mugenp";
import { dsp, getRandomInt, minMax, randArray } from "~/utils";
import { Term } from "~/utils/expression";

// "id": "71111",
// "module": "fugou",
// "grade": "中1",
// "chapter": "正の数・負の数",
// "section": "正の数・負の数",
// "subsection": "０より小さい数",
// "title": "正の符号・負の符号",
// "message": "次の数について、正の符号または負の符号をつけて表しなさい。"
export const M71111 = () => {
  return (
    <MugenP
      answerPrefix=""
      displayStyle={false}
      maxLv={3}
      generator={generatorFunc}
    />
  );
};

// 0よりX[大きい,小さい]数を答える
const generatorFunc: GeneratorFunc = (level) => {
  let qValue: Term;
  let decimal = false;
  const mode = getRandomInt(minMax(1, level, 3), 1);
  if (mode === 1) {
    // 1〜9の整数
    qValue = new Term(getRandomInt(9, 1));
  } else if (mode === 2) {
    // 小数
    // 場合分けにより、以下のパターンをバランスよく作る
    //  0.X
    //  0.XX
    //  X.X
    //  X.XX

    // 整数部
    let num = getRandomInt(1, 0);
    if (num != 0) {
      num *= getRandomInt(9, 1);
    }
    // 小数部
    let double = getRandomInt(9, 1);
    if (randArray(true, false)) {
      double = double * 10 + getRandomInt(9, 1);
    }
    qValue = new Term(`${num}.${double}`);
    decimal = true;
  } else {
    // 分数
    qValue = new Term(getRandomInt(10, 1) / 12);
  }

  let aValue: Term;
  let format: string;
  if (randArray(true, false)) {
    aValue = qValue;
    format = `${dsp("0")} よりも {q} 大きな数`;
  } else {
    aValue = qValue.neg();
    format = `${dsp("0")} よりも {q} 小さな数`;
  }

  const question = format.replace("{q}", `${dsp(qValue.toLatex({ decimal }))}`);
  const sign = true;
  const answer = dsp(aValue.toLatex({ decimal, sign }));
  return { question, answer };
};
