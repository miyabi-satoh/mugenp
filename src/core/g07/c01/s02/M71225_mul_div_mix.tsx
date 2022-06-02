import { MugenP, GeneratorFunc } from "~/components/mugenp";
import { getRandomInt, guard, randArray, shuffle } from "~/utils";
import { Term } from "~/utils/expression";
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
  // Lv3: 問題分数1つまで
  // Lv4: 問題分数2つまで
  // Lv5: 問題分数3つまで
  // Lv6: 何でもあり
  const operations = shuffle("*", "*", "/", "/");
  let terms: Term[] = [];
  const integer = () => {
    return new Term(getRandomInt(12, 2) * randArray(1, -1));
  };
  const fraction = () => {
    let term;
    do {
      term = new Term(
        getRandomInt(12, 2) * randArray(1, -1),
        getRandomInt(9, 2)
      );
    } while (term.c.d == 1);
    return term;
  };
  const notOne = () => {
    let term;
    do {
      term = new Term(
        getRandomInt(12, 2) * randArray(1, -1),
        randArray(1, getRandomInt(9, 2))
      );
    } while (term.c.abs().equals(1));
    return term;
  };

  if (level <= 2) {
    terms.push(integer(), integer(), integer());
  } else if (level == 3) {
    terms.push(fraction(), integer(), integer());
  } else if (level == 4) {
    terms.push(fraction(), fraction(), integer());
  } else if (level == 5) {
    terms.push(fraction(), fraction(), fraction());
  } else {
    terms.push(notOne(), notOne(), notOne());
  }
  terms = shuffle(...terms);

  let question = terms[0].toLatex();
  let ans = terms[0].c;
  const getBrackets = (x: number) => (x < 0 ? "()" : randArray("", "()"));
  for (let i = 1; i < 3; i++) {
    const brackets = getBrackets(terms[i].c.s);
    if (operations[i] == "*") {
      question += "\\times " + terms[i].toLatex({ brackets });
      ans = ans.mul(terms[i].c);
    } else {
      question += "\\div " + terms[i].toLatex({ brackets });
      ans = ans.div(terms[i].c);
    }
  }

  if (ans.n > 99) {
    return null;
  }
  if (level == 1) {
    if (ans.d != 1) {
      return null;
    }
  }

  const answer = ans.toLatex();

  // const idx = level - 1;
  // let a = Monomial.create({
  //   max: 12,
  //   maxD: guard(idx, 1, 1, 1, 8),
  //   maxN: 8,
  //   allowNegative: level > 2,
  // });
  // if (a.abs().equals(1)) {
  //   a = a.mul(getRandomInt(12, 2));
  // }
  // let b = Monomial.create({
  //   max: 12,
  //   maxD: guard(idx, 1, 1, 1, 8),
  //   maxN: 8,
  //   allowNegative: true,
  // });
  // if (b.abs().equals(1)) {
  //   b = b.mul(getRandomInt(12, 2));
  // }
  // if (a.abs().equals(b.abs())) {
  //   return null;
  // }
  // let c = Monomial.create({
  //   max: 12,
  //   maxD: guard(idx, 1, 1, 1, 8),
  //   maxN: 8,
  //   allowNegative: true,
  // });
  // if (c.abs().equals(1)) {
  //   c = c.mul(getRandomInt(12, 2));
  // }
  // if (c.abs().equals(a.abs()) || c.abs().equals(b.abs())) {
  //   return null;
  // }

  // if (level === 4 || level === 5) {
  //   let fracCount = 0;
  //   if (a.isFrac) {
  //     fracCount++;
  //   }
  //   if (b.isFrac) {
  //     fracCount++;
  //   }
  //   if (c.isFrac) {
  //     fracCount++;
  //   }

  //   if (fracCount > level - 3) {
  //     return null;
  //   }
  // }

  // const opAB = randArray("\\div", "\\times", "\\div");
  // const opBC = randArray("\\times", "\\div");
  // let aValue = a;
  // if (opAB === "\\times") {
  //   aValue = aValue.mul(b);
  // } else {
  //   aValue = aValue.div(b);
  // }
  // if (opBC === "\\times") {
  //   aValue = aValue.mul(c);
  // } else {
  //   aValue = aValue.div(c);
  // }

  // if (level === 1) {
  //   if (a.isFrac || b.isFrac || c.isFrac || aValue.isFrac) {
  //     return null;
  //   }
  // } else if (level === 2) {
  //   if (a.isFrac || b.isFrac || c.isFrac) {
  //     return null;
  //   }
  // }

  // if (aValue.coeff.abs().compare(99) > 0) {
  //   return null;
  // }
  // if (aValue.coeff.n > 99 || aValue.coeff.d > 99) {
  //   return null;
  // }

  // const question =
  //   a.toLatex({ brackets: randArray("", "()") }) +
  //   opAB +
  //   b.toLatex({ brackets: b.isNegative ? "()" : randArray("", "()") }) +
  //   opBC +
  //   c.toLatex({ brackets: c.isNegative ? "()" : randArray("", "()") });

  // const answer = aValue.toLatex();

  return { question, answer };
};
