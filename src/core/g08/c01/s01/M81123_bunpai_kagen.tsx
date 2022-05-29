import Fraction from "fraction.js";
import { MugenP, GeneratorFunc } from "~/components/mugenp";
import { getRandomInt, guard } from "~/utils";
import { Monomial } from "~/utils/monomial";
import { Polynomial } from "~/utils/polynomial";

// "id": "81123",
// "module": "bunpai_kagen",
// "grade": "中2",
// "chapter": "式の計算",
// "section": "式の計算",
// "subsection": "いろいろな多項式の計算",
// "title": "分配法則と加減法",
// "message": "次の計算をしなさい。"
export const M81123 = () => {
  return <MugenP maxLv={4} generator={generatorFunc} />;
};

// 分配法則と加減法
const generatorFunc: GeneratorFunc = (level) => {
  // 文字は固定パターンから、ランダムに2つ選択
  const pattern = [];
  const kousuu = 2;
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
  // 定数項を追加しておく
  moji.push("");

  // 係数被りのチェック用
  const stock: Fraction[] = [];

  let poly: Polynomial[] = [new Polynomial(), new Polynomial()];
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < kousuu; j++) {
      const m = Monomial.create({
        max: 9,
        allowNegative: level > 3 || j !== 0,
        factors: moji[j],
      });
      poly[i] = poly[i].append(m);
      stock.push(m.coeff);
    }
  }

  // 係数
  let mono: Monomial[] = [];
  const idx = level - 1;
  do {
    const x = Monomial.create({
      max: 5,
      allowNegative: guard(idx, false, mono.length > 0, true),
    });
    // ±1はスキップ
    if (x.abs().equals(1)) {
      continue;
    }
    mono.push(x);
    stock.push(x.coeff);
  } while (mono.length < 2);

  // 係数被りをチェック
  for (let i = 0; i < stock.length - 1; i++) {
    for (let j = i + 1; j < stock.length; j++) {
      if (stock[i].equals(stock[j])) {
        return null;
      }
    }
  }

  const question =
    mono[0].toLatex() +
    poly[0].toLatex("()") +
    mono[1].toLatex({ sign: true }) +
    poly[1].toLatex("()");

  let answer = poly[0].mul(mono[0]).add(poly[1].mul(mono[1])).toLatex();
  if (answer.length === 0) {
    answer = "0";
  }

  return { question, answer };
};
