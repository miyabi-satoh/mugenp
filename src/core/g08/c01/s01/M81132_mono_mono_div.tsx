import { MugenP, GeneratorFunc } from "~/components/mugenp";
import { guard, randArray } from "~/utils";
import { Monomial } from "~/utils/monomial";

// "id": "81132",
// "module": "mono_mono_div",
// "grade": "中2",
// "chapter": "式の計算",
// "section": "式の計算",
// "subsection": "単項式の乗法，除法",
// "title": "単項式の除法",
// "message": "次の計算をしなさい。"
export const M81132 = () => {
  return <MugenP maxLv={4} generator={generatorFunc} />;
};

// 単項式の除法
const generatorFunc: GeneratorFunc = (level) => {
  // Lv1: 係数は自然数のみ
  // Lv2: ＋係数に負の数
  // Lv3: ＋分数で割る
  // Lv4: ＋答えも分数
  const idx = level - 1;
  const mono: Monomial[] = [];
  do {
    const dn = mono.length > 0 ? 4 : 1;
    let x = Monomial.create({
      max: 7,
      maxD: guard(idx, 1, 1, dn, 4),
      maxN: guard(idx, 1, 1, dn, 4),
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

  mono.push(mono[0].mul(mono[1]));

  const question =
    mono[2].toLatex({ brackets: mono[2].isNegative ? "()" : "" }) +
    " \\div " +
    mono[1].toLatex({ brackets: mono[1].isNegative ? "()" : "" });

  const answer = mono[0].toLatex();

  return { question, answer };
};
