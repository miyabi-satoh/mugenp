import { MugenP, GeneratorFunc } from "~/components/mugenp";
import { dsp, guard, randArray } from "~/utils";
import { Monomial } from "~/utils/monomial";

// "id": "81133",
// "module": "mul_div_mix",
// "grade": "中2",
// "chapter": "式の計算",
// "section": "式の計算",
// "subsection": "単項式の乗法，除法",
// "title": "乗除混合計算",
// "message": "次の計算をしなさい。"
export const M81133 = () => {
  return <MugenP maxLv={3} generator={generatorFunc} />;
};

// 乗除混合計算
const generatorFunc: GeneratorFunc = (level) => {
  // Lv1: 係数は自然数のみ
  // Lv2: ＋係数に負の数
  // Lv3: ＋分数の係数
  const idx = level - 1;
  const mono: Monomial[] = [];
  do {
    let x = Monomial.create({
      max: 7,
      maxD: guard(idx, 1, 1, 4),
      maxN: guard(idx, 1, 1, 4),
      allowNegative: guard(idx, false, true),
    });
    // 1,-1は使わない
    if (x.abs().equals(1)) {
      continue;
    }

    // 文字は1次 〜 3次
    const jisuu = randArray(1, 2, 3);
    for (let i = 0; i < jisuu; i++) {
      x = x.mul(randArray("x", "y"));
    }
    mono.push(x);
  } while (mono.length < 3);

  const q: string[] = [];
  q.push(mono[0].toLatex({ brackets: mono[0].isNegative ? "()" : "" }));
  q.push(mono[1].toLatex({ brackets: mono[1].isNegative ? "()" : "" }));
  q.push(mono[2].toLatex({ brackets: mono[2].isNegative ? "()" : "" }));
  if (q[0] === q[1] || q[0] === q[2] || q[1] === q[2]) {
    return { question: "", answer: "" };
  }

  let question: string = q[0];
  let aValue: Monomial = mono[0];

  for (let i = 1; i < 3; i++) {
    if (randArray(true, false)) {
      question += " \\times " + q[i];
      aValue = aValue.mul(mono[i]);
    } else {
      question += " \\div " + q[i];
      aValue = aValue.div(mono[i]);
    }
  }

  let answer = aValue.toLatex();
  question = dsp(question);
  answer = dsp(answer);

  return { question, answer };
};
