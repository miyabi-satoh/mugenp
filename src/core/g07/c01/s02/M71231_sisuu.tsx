import { MugenP, GeneratorFunc } from "~/components/mugenp";
import { dsp, getRandomInt, guard, randArray } from "~/utils";
import { Monomial } from "~/utils/monomial";

// "id": "71231",
// "module": "sisuu",
// "grade": "中1",
// "chapter": "正の数・負の数",
// "section": "正の数・負の数の計算",
// "subsection": "いろいろな計算",
// "title": "指数",
// "message": "次の計算をしなさい。"
export const M71231 = () => {
  return <MugenP maxLv={5} generator={generatorFunc} />;
};

// 指数
const generatorFunc: GeneratorFunc = (level) => {
  const idx = level - 1;
  const e = getRandomInt(3, 2);
  const limit = e > 2 ? 5 : 13;
  let x = Monomial.create({
    max: guard(idx, 5, 5, limit),
    maxD: guard(idx, 1, 1, 1, 5, limit),
    maxN: guard(idx, 1, 1, 1, 5, limit),
    allowNegative: guard(idx, false, true),
  });

  let decimal = guard(idx, false, false, false, false, randArray(true, false));
  if (decimal) {
    if (e === 3) {
      decimal = false;
    } else if (x.d === 1) {
      x = x.div(10);
    } else if (!(x.d === 2 || x.d === 5 || x.d === 10)) {
      decimal = false;
    } else if (x.abs().compare(1.3) > 0) {
      decimal = false;
    }
  }

  let brackets = randArray("", "()");
  if (level <= 2 || (!decimal && x.isFrac)) {
    brackets = "()";
  }
  const question = dsp(x.toLatex({ brackets, decimal }) + `^${e}`);

  let aValue = x;
  for (let i = 1; i < e; i++) {
    aValue = aValue.mul(x);
  }
  if (brackets === "") {
    if (aValue.s !== x.s) {
      aValue = aValue.neg();
    }
  }
  const answer = dsp(aValue.toLatex({ decimal }));

  return { question, answer };
};
