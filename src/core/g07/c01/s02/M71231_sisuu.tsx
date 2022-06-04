import { MugenP, GeneratorFunc } from "~/components/mugenp";
import { getRandomInt, randArray } from "~/utils";
import { Term } from "~/utils/expression";

// "id": "71231",
// "module": "sisuu",
// "grade": "中1",
// "chapter": "正の数・負の数",
// "section": "正の数・負の数の計算",
// "subsection": "いろいろな計算",
// "title": "指数",
// "message": "次の計算をしなさい。"
export const M71231 = () => {
  return <MugenP maxLv={6} generator={generatorFunc} />;
};

// 指数
const generatorFunc: GeneratorFunc = (level) => {
  // Lv1: 正の数
  // Lv2: ＋負の数
  // Lv3: ＋カッコなし
  // Lv4: ＋分数
  // Lv5: ＋小数
  // Lv6: all

  let x: Term;
  let brackets: string = "()";
  let decimal: boolean = false;
  const e = getRandomInt(3, 2);

  const fraction = () => {
    let term;
    do {
      term = new Term(
        getRandomInt(e == 3 ? 5 : 10, 2) * randArray(1, -1),
        getRandomInt(e == 3 ? 5 : 10, 2)
      );
    } while (term.c.d == 1);
    return term;
  };

  if (level == 1) {
    // 正の数・カッコあり
    x = new Term(getRandomInt(e == 3 ? 5 : 10, 1));
  } else if (level == 2) {
    // 正の数 or 負の数
    x = new Term(getRandomInt(e == 3 ? 5 : 10, 1) * randArray(1, -1));
  } else if (level == 3) {
    // カッコ
    x = new Term(getRandomInt(e == 3 ? 5 : 10, 1) * randArray(1, -1));
    brackets = randArray("", "()");
  } else if (level == 4) {
    // 整数 or 分数
    if (randArray(true, false)) {
      x = new Term(getRandomInt(e == 3 ? 5 : 10, 1) * randArray(1, -1));
      brackets = randArray("", "()");
    } else {
      x = fraction();
    }
  } else if (level == 5) {
    // 整数 or 分数 or 小数
    if (randArray(true, false)) {
      if (randArray(true, false)) {
        x = new Term(getRandomInt(e == 3 ? 5 : 10, 1) * randArray(1, -1));
        brackets = randArray("", "()");
      } else {
        x = fraction();
      }
    } else {
      x = new Term(getRandomInt(e == 3 ? 5 : 9, 1) * randArray(1, -1), 10);
      brackets = randArray("", "()");
      decimal = true;
    }
  } else {
    const pattern = randArray(0, 1, 2);
    if (pattern == 0) {
      x = new Term(getRandomInt(e == 3 ? 5 : 10, 1) * randArray(1, -1));
      brackets = randArray("", "()");
    } else if (pattern == 1) {
      x = fraction();
    } else {
      x = new Term(getRandomInt(e == 3 ? 5 : 9, 1) * randArray(1, -1), 10);
      brackets = randArray("", "()");
      decimal = true;
    }
  }

  // const idx = level - 1;
  // const limit = e > 2 ? 5 : 13;
  // let x = Monomial.create({
  //   max: guard(idx, 5, 5, limit),
  //   maxD: guard(idx, 1, 1, 1, 5, limit),
  //   maxN: guard(idx, 1, 1, 1, 5, limit),
  //   allowNegative: guard(idx, false, true),
  // });

  // let decimal = guard(idx, false, false, false, false, randArray(true, false));
  // if (decimal) {
  //   if (e === 3) {
  //     decimal = false;
  //   } else if (x.d === 1) {
  //     x = x.div(10);
  //   } else if (!(x.d === 2 || x.d === 5 || x.d === 10)) {
  //     decimal = false;
  //   } else if (x.abs().compare(1.3) > 0) {
  //     decimal = false;
  //   }
  // }

  // let brackets = randArray("", "()");
  // if (level <= 2 || (!decimal && x.isFrac)) {
  //   brackets = "()";
  // }
  const question = x.toLatex({ brackets, decimal }) + `^${e}`;
  let ans = x.pow(e);
  if (brackets == "") {
    // 符号を修正
    if (ans.s != x.s) {
      ans = ans.neg();
    }
  }

  const answer = ans.toLatex({ decimal });

  return { question, answer };
};
