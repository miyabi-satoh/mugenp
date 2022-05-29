import Fraction from "fraction.js";
import { MugenP, GeneratorFunc } from "~/components/mugenp";
import { dsp, randArray } from "~/utils";
import { Monomial } from "~/utils/monomial";

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
  let len = 3;
  if (level > 2) {
    len = randArray(3, 4);
  }

  let question = "";
  let aValue = new Fraction(0);
  for (let i = 0; i < len; i++) {
    const x = Monomial.create({
      max: 9,
      allowNegative: true,
    });
    // Lv1: かっこあり
    // Lv2: かっこなし
    // Lv3: かっこランダム
    let brackets = "";
    if (level === 1) {
      brackets = "()";
    } else if (level == 2) {
      brackets = "";
    } else {
      brackets = randArray("()", "");
    }

    let operator = "";
    if (i != 0 && brackets) {
      operator = randArray("+", "-");
    }

    const sign: boolean = i != 0 && brackets === "";
    question += operator + x.toLatex({ brackets, sign });
    if (operator === "-") {
      aValue = aValue.sub(x.coeff);
    } else {
      aValue = aValue.add(x.coeff);
    }
  }

  if (!question.includes("-")) {
    return { question: "", answer: "" };
  }
  question = dsp(question);
  const answer = dsp(aValue.toLatex());

  return { question, answer };
};
