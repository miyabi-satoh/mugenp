import { MugenContainer } from "~/components/container";
import { RefreshFunction } from "~/interfaces/types";
import { dsp, getRandomInt } from "~/utils";
import { Monomial } from "~/utils/monomial";
import { Polynomial } from "~/utils/polynomial";

// "id": "81112",
// "module": "douruikou_no_seiri",
// "grade": "中2",
// "chapter": "式の計算",
// "section": "式の計算",
// "subsection": "式の加法，減法",
// "title": "同類項の整理",
// "message": "次の式の同類項をまとめて簡単にしなさい。"
const Mugen = () => {
  return <MugenContainer onRefresh={handleRefresh} />;
};

export { Mugen as M81112 };

// 同類項の整理
const handleRefresh: RefreshFunction = (level, score) => {
  // 固定パターンの文字から、ランダムに2つ選択
  const pattern = [];
  if (level === 1) {
    pattern.push("x", "y");
  } else if (level === 2) {
    pattern.push("x", "y", "xy");
  } else {
    pattern.push("x", "y", "xy", "x^{2}", "y^{2}");
  }
  const moji: string[] = [];
  do {
    moji.push(pattern.splice(getRandomInt(pattern.length - 1), 1)[0]);
  } while (moji.length < 2);
  moji.sort();

  let poly = new Polynomial();
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      poly = poly.append(
        Monomial.create({
          max: 9,
          allowNegative: true,
          factors: moji[j],
        })
      );
    }
  }

  const question = poly.toLatex();
  let answer = poly.compact().toLatex();
  if (answer.length === 0) {
    answer = "0";
  }

  return [dsp(question), dsp(answer)];
};
