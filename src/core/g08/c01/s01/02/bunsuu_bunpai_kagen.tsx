import Fraction from "fraction.js";
import { MugenContainer } from "~/components/container";
import { RefreshFunction } from "~/interfaces/types";
import { dsp, getRandomInt, guard, minMax } from "~/utils";
import { Monomial } from "~/utils/monomial";
import { Polynomial } from "~/utils/polynomial";

// "id": "81124",
// "module": "bunsuu_bunpai_kagen",
// "grade": "中2",
// "chapter": "式の計算",
// "section": "式の計算",
// "subsection": "いろいろな多項式の計算",
// "title": "分数×多項式と加減法",
// "message": "次の計算をしなさい。"
const Mugen = () => {
  return <MugenContainer onRefresh={handleRefresh} />;
};

export { Mugen as M81124 };

// 分数×多項式と加減法
const handleRefresh: RefreshFunction = (level, score) => {
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

  // 係数
  let mono: Monomial[] = [];
  const idx = level - 1;
  do {
    const x = Monomial.create({
      max: 1,
      maxD: 6,
      maxN: 5,
      allowNegative: guard(idx, false, mono.length > 0, true),
    });
    // 整数はスキップ
    if (x.isInteger) {
      continue;
    }
    mono.push(x);
  } while (mono.length < 2);

  // 係数被りのチェック用
  const stock: Fraction[] = [];

  let poly: Polynomial[] = [new Polynomial(), new Polynomial()];
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < kousuu; j++) {
      const m = Monomial.create({
        max: minMax(9, mono[i].coeff.inverse().mul(9).valueOf(), 20),
        allowNegative: level > 3 || j !== 0,
        factors: moji[j],
      });
      poly[i] = poly[i].append(m);
      stock.push(m.coeff);
    }
  }

  // 係数被りをチェック
  for (let i = 0; i < stock.length - 1; i++) {
    for (let j = i + 1; j < stock.length; j++) {
      if (stock[i].equals(stock[j])) {
        return ["", ""];
      }
    }
  }

  if (level <= 2) {
    // レベル2までは、分配で分数が残るケースを除外
    for (let i = 0; i < 2; i++) {
      const tmp = poly[i].mul(mono[i]).toLatex();
      if (tmp.includes("frac")) {
        return ["", ""];
      }
    }
  } else {
    // レベル3以降は分子が2桁になるケースを除外
    let tmp: Polynomial[] = [];
    for (let i = 0; i < 2; i++) {
      tmp.push(poly[i].mul(mono[i]));
      if (tmp[i].terms.find((t) => t.coeff.n > 9)) {
        return ["", ""];
      }
    }
    if (tmp[0].add(tmp[1]).terms.find((t) => t.coeff.n > 9)) {
      return ["", ""];
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

  return [dsp(question), dsp(answer)];
};
