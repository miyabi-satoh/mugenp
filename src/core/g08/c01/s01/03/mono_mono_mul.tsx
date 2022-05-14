import { MugenContainer } from "~/components/container";
import { RefreshFunction } from "~/interfaces/types";
import { dsp, getRandomInt, guard, randArray } from "~/utils";
import { Monomial } from "~/utils/monomial";
import { Polynomial } from "~/utils/polynomial";

// "id": "81131",
// "module": "mono_mono_mul",
// "grade": "中2",
// "chapter": "式の計算",
// "section": "式の計算",
// "subsection": "単項式の乗法，除法",
// "title": "単項式の乗法",
// "message": "次の計算をしなさい。"
const Mugen = () => {
  return <MugenContainer onRefresh={handleRefresh} />;
};

export { Mugen as M81131 };

// 単項式の乗法
const handleRefresh: RefreshFunction = (level, score) => {
  // Lv1: 係数は自然数のみ
  // Lv2: ＋係数に負の数
  // Lv3: ＋たまに2項目を2乗
  // Lv4: ＋分数の係数
  const idx = level - 1;
  const mono: Monomial[] = [];
  do {
    let x = Monomial.create({
      max: 7,
      maxD: guard(idx, 1, 1, 1, 4),
      maxN: guard(idx, 1, 1, 1, 4),
      allowNegative: guard(idx, false, true),
    });
    // 1,-1は使わない
    if (x.abs().equals(1)) {
      continue;
    }

    // 文字は1次または2次
    const jisuu = randArray(1, 2);
    for (let i = 0; i < jisuu; i++) {
      x = x.mul(randArray("x", "y"));
    }
    mono.push(x);
  } while (mono.length < 2);

  let question: string;
  const q1 = mono[0].toLatex({ brackets: mono[0].isNegative ? "()" : "" });
  const q2 = mono[1].toLatex({ brackets: mono[1].isNegative ? "()" : "" });
  if (q1 === q2) {
    if (mono[0].isPositive) {
      mono[0] = mono[0].neg();
      mono[1] = mono[1].neg();
    }
    question = mono[0].toLatex({ brackets: "()" }) + "^2";
  } else {
    question = q1 + " \\times " + q2;
    if (
      level > 2 &&
      q2.includes("-") &&
      !q2.includes("^") &&
      randArray(false, true)
    ) {
      question += "^2";
      mono[1] = mono[1].mul(mono[1]);
    }
  }

  let answer = mono[0].mul(mono[1]).toLatex();

  return [dsp(question), dsp(answer)];
};
