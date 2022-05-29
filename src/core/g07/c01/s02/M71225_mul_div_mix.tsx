import { MugenP, GeneratorFunc } from "~/components/mugenp";
import { getRandomInt, guard, randArray } from "~/utils";
import { Monomial } from "~/utils/monomial";

// "id": "71225",
// "module": "mul_div_mix",
// "grade": "中1",
// "chapter": "正の数・負の数",
// "section": "正の数・負の数の計算",
// "subsection": "正の数・負の数の乗法，除法",
// "title": "乗除混合計算",
// "message": "次の計算をしなさい。"
export const M71225 = () => {
  return <MugenP maxLv={6} generator={generatorFunc} />;
};

// 乗除混合計算
const generatorFunc: GeneratorFunc = (level) => {
  // Lv1: 問題整数、答え整数
  // Lv2: 答え分数
  // Lv3: 初項マイナス
  // Lv4: 問題分数1つまで
  // Lv5: 問題分数2つまで
  // Lv6: 問題分数3つまで
  const idx = level - 1;
  let a = Monomial.create({
    max: 12,
    maxD: guard(idx, 1, 1, 1, 8),
    maxN: 8,
    allowNegative: level > 2,
  });
  if (a.abs().equals(1)) {
    a = a.mul(getRandomInt(12, 2));
  }
  let b = Monomial.create({
    max: 12,
    maxD: guard(idx, 1, 1, 1, 8),
    maxN: 8,
    allowNegative: true,
  });
  if (b.abs().equals(1)) {
    b = b.mul(getRandomInt(12, 2));
  }
  if (a.abs().equals(b.abs())) {
    return null;
  }
  let c = Monomial.create({
    max: 12,
    maxD: guard(idx, 1, 1, 1, 8),
    maxN: 8,
    allowNegative: true,
  });
  if (c.abs().equals(1)) {
    c = c.mul(getRandomInt(12, 2));
  }
  if (c.abs().equals(a.abs()) || c.abs().equals(b.abs())) {
    return null;
  }

  if (level === 4 || level === 5) {
    let fracCount = 0;
    if (a.isFrac) {
      fracCount++;
    }
    if (b.isFrac) {
      fracCount++;
    }
    if (c.isFrac) {
      fracCount++;
    }

    if (fracCount > level - 3) {
      return null;
    }
  }

  const opAB = randArray("\\div", "\\times", "\\div");
  const opBC = randArray("\\times", "\\div");
  let aValue = a;
  if (opAB === "\\times") {
    aValue = aValue.mul(b);
  } else {
    aValue = aValue.div(b);
  }
  if (opBC === "\\times") {
    aValue = aValue.mul(c);
  } else {
    aValue = aValue.div(c);
  }

  if (level === 1) {
    if (a.isFrac || b.isFrac || c.isFrac || aValue.isFrac) {
      return null;
    }
  } else if (level === 2) {
    if (a.isFrac || b.isFrac || c.isFrac) {
      return null;
    }
  }

  if (aValue.coeff.abs().compare(99) > 0) {
    return null;
  }
  if (aValue.coeff.n > 99 || aValue.coeff.d > 99) {
    return null;
  }

  const question =
    a.toLatex({ brackets: randArray("", "()") }) +
    opAB +
    b.toLatex({ brackets: b.isNegative ? "()" : randArray("", "()") }) +
    opBC +
    c.toLatex({ brackets: c.isNegative ? "()" : randArray("", "()") });

  const answer = aValue.toLatex();

  return { question, answer };
};
