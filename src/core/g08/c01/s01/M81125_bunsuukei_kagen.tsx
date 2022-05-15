import { MugenContainer } from "~/components/container";
import { RefreshFunction } from "~/interfaces/types";
import { dsp, gcd, getRandomInt, lcm, randArray } from "~/utils";
import { Monomial } from "~/utils/monomial";
import { Polynomial } from "~/utils/polynomial";

// "id": "81125",
// "module": "bunsuukei_kagen",
// "grade": "中2",
// "chapter": "式の計算",
// "section": "式の計算",
// "subsection": "いろいろな多項式の計算",
// "title": "分数形の式と加減法",
// "message": "次の計算をしなさい。"
const Mugen = () => {
  return <MugenContainer onRefresh={handleRefresh} />;
};

export { Mugen as M81125 };

// 分数形の式と加減法
const handleRefresh: RefreshFunction = (level, score) => {
  // 文字は固定パターンから、ランダムに2つ選択
  const moji: string[] = ["x", "y"];

  // 係数
  // Lv1: 同分母の和
  // Lv2: ＋同分母の差
  // Lv3: ＋異分母の和差
  const denominators: number[] = [];
  let operator: string;
  if (level <= 2) {
    denominators[0] = getRandomInt(5, 2);
    denominators[1] = denominators[0];
    operator = level < 2 ? "+" : "-";
  } else {
    denominators[0] = getRandomInt(5, 2);
    denominators[1] = getRandomInt(5, 2);
    operator = randArray("+", "-");
  }

  let poly: Polynomial[] = [new Polynomial(), new Polynomial()];
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      const m = Monomial.create({
        max: 9,
        allowNegative: level > 3 || j !== 0,
        factors: moji[j],
      });
      poly[i] = poly[i].append(m);
    }
  }

  // 約分チェック
  for (let i = 0; i < 2; i++) {
    const g = gcd(
      denominators[i],
      ...poly[i].terms.map((t) => t.coeff.valueOf())
    );
    if (g !== 1) {
      return ["", ""];
    }
  }

  const question =
    `\\frac{${poly[0].toLatex()}}{${denominators[0]}}` +
    operator +
    `\\frac{${poly[1].toLatex()}}{${denominators[1]}}`;

  // 分母の最小公倍数を取得する
  let l = lcm(...denominators);
  // 通分後の分子
  const p1 = poly[0].mul(l / denominators[0]);
  const p2 = poly[1].mul(l / denominators[1]);

  // 分子の和(差)
  let p: Polynomial;
  if (operator === "+") {
    p = p1.add(p2);
  } else {
    p = p1.add(p2.mul(-1));
  }

  // 係数 < 20 でフィルタ
  if (p.terms.find((t) => t.coeff.abs().compare(20) >= 0)) {
    return ["", ""];
  }

  // 答えを約分
  const g = gcd(l, ...p.terms.map((t) => t.coeff.valueOf()));
  p = p.div(g);
  l = l / g;

  let answer;
  if (p.length === 0) {
    answer = "0";
  } else if (l === 1) {
    answer = p.toLatex();
  } else if (p.length === 1) {
    answer = p.div(l).toLatex();
  } else {
    // ややこしい事になるので、分数形の分子初項がマイナスは除外する
    if (p.terms[0].isNegative) {
      return ["", ""];
    }
    answer = `\\frac{${p.toLatex()}}{${l}}`;
  }

  return [dsp(question), dsp(answer)];
};
