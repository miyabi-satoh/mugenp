import { MugenP, GeneratorFunc } from "~/components/mugenp";
import { dsp, getRandomInt, randArray } from "~/utils";

// "id": "91211",
// "module": "kazu_no_keisan",
// "grade": "中3",
// "chapter": "式の展開と因数分解",
// "section": "式の計算の利用",
// "subsection": "式の計算の利用",
// "title": "数の計算への利用",
// "message": "乗法公式や因数分解を利用して次の計算をしなさい。"
export const M91211 = () => {
  return <MugenP maxLv={1} generator={generatorFunc} />;
};

// 数の計算への利用
const generatorFunc: GeneratorFunc = (level) => {
  let question = "";
  let answer = "";
  switch (getRandomInt(2)) {
    case 1: // x^2 -> (a + b)^2
      {
        const a = 10 * getRandomInt(10, 4);
        const b = getRandomInt(3, 1) * randArray(1, -1);
        question = `${a + b}^2`;
        answer = `${(a + b) * (a + b)}`;
      }
      break;
    case 2: // x * y -> (a + b)(a - b)
      {
        const a = 10 * getRandomInt(10, 4);
        const b = getRandomInt(3, 1) * randArray(1, -1);
        question = `${a + b} \\times ${a - b}`;
        answer = `${(a + b) * (a - b)}`;
      }
      break;
    default:
      {
        // a^2 - b^2 -> (a + b)(a -b)
        let a = getRandomInt(85, 15);
        let b = randArray(100 - a, 10 + a);
        [a, b] = a > b ? [a, b] : [b, a];
        question = `${a}^2 - ${b}^2`;
        answer = `${a * a - b * b}`;
      }
      break;
  }

  question = dsp(question);
  answer = dsp(answer);
  return { question, answer };
};
