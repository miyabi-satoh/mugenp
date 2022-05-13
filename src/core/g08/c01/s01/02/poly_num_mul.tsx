import { MugenContainer } from "~/components/container";
import { RefreshFunction } from "~/interfaces/types";
import { dsp, getRandomInt, guard, randArray } from "~/utils";
import { Monomial } from "~/utils/monomial";
import { Polynomial } from "~/utils/polynomial";

// "id": "81121",
// "module": "poly_num_mul",
// "grade": "中2",
// "chapter": "式の計算",
// "section": "式の計算",
// "subsection": "いろいろな多項式の計算",
// "title": "多項式と数の乗法",
// "message": "次の計算をしなさい。"
const Mugen = () => {
  return <MugenContainer onRefresh={handleRefresh} />;
};

export { Mugen as M81121 };

// 多項式と数の乗法
const handleRefresh: RefreshFunction = (level, score) => {
  // 文字は固定パターンから、ランダムに2つ選択
  const pattern = [];
  let kousuu = 2;
  if (level === 1) {
    pattern.push("x", "y");
  } else if (level === 2) {
    pattern.push("x", "y", "xy");
  } else {
    pattern.push("x", "y", "xy", "x^{2}", "y^{2}");
    kousuu = randArray(2, 3);
  }
  const moji: string[] = [];
  do {
    moji.push(pattern.splice(getRandomInt(pattern.length - 1), 1)[0]);
  } while (moji.length < 2);
  moji.sort();
  // 定数項を追加しておく
  moji.push("");

  let poly = new Polynomial();
  for (let j = 0; j < kousuu; j++) {
    poly = poly.append(
      Monomial.create({
        max: 9,
        allowNegative: j !== 0,
        factors: moji[j],
      })
    );
  }
  poly = poly.orderTo();

  const idx = level - 1;
  let mono: Monomial;
  do {
    mono = Monomial.create({
      max: guard(idx, 9),
      maxD: guard(idx, 1, 6, 8, 9),
      maxN: guard(idx, 1, 7, 9, 9),
      allowNegative: level >= 1,
    });
  } while (mono.abs().equals(1));

  let question = "";
  if (randArray(true, false)) {
    // a(b + c)
    question = `${mono.toLatex()}${poly.toLatex("()")}`;
  } else {
    // (a + b) × c
    question = `${poly.toLatex("()")} \\times ${mono.toLatex({
      brackets: mono.isNegative ? "()" : "",
    })}`;
  }

  const answer = poly.mul(mono).toLatex();
  if (answer.includes("frac")) {
    return ["", ""];
  }

  return [dsp(question), dsp(answer)];
};
