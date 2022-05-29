import { MugenP, GeneratorFunc } from "~/components/mugenp";
import { getRandomInt, randArray, shuffle } from "~/utils";
import { Term } from "~/utils/expression";

// "id": "71215",
// "module": "kagen_kongou",
// "grade": "中1",
// "chapter": "正の数・負の数",
// "section": "正の数・負の数の計算",
// "subsection": "正の数・負の数の加法，減法",
// "title": "加減混合計算",
// "message": "次の計算をしなさい。"
export const M71215 = () => {
  return <MugenP maxLv={3} generator={generatorFunc} />;
};

// 加減混合計算
const generatorFunc: GeneratorFunc = (level) => {
  // Lv1: かっこあり
  // Lv2: かっこなし
  // Lv3: かっこランダム／最大4項
  const getBrackets = () => {
    if (level == 1) {
      return "()";
    } else if (level == 2) {
      return "";
    }
    return randArray("()", "");
  };

  // 項数
  const len = level > 2 ? randArray(3, 4) : 3;

  // 符号
  const signs = shuffle(1, 1, -1, -1);

  let question = "";
  let value = 0;
  for (let i = 0; i < len; i++) {
    const x = getRandomInt(9, 1) * signs[i];
    const brackets = getBrackets();
    const sign = i > 0;
    let pm = 1;
    if (i > 0 && brackets != "") {
      pm = randArray(1, -1);
      question += pm == 1 ? " + " : " - ";
    }

    question += new Term(x).toLatex({ brackets, sign });
    value += x * pm;
  }

  const answer = new Term(value).toLatex();

  return { question, answer };
};
