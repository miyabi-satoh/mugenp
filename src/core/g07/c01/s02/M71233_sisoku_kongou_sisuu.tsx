import { MugenP, GeneratorFunc } from "~/components/mugenp";
import { getRandomInt, randArray, shuffle } from "~/utils";
import { Term } from "~/utils/expression";

// "id": "71233",
// "module": "sisoku_kongou_sisuu",
// "grade": "中1",
// "chapter": "正の数・負の数",
// "section": "正の数・負の数の計算",
// "subsection": "いろいろな計算",
// "title": "四則混合と指数",
// "message": "次の計算をしなさい。"
export const M71233 = () => {
  return <MugenP maxLv={5} generator={generatorFunc} />;
};

// 四則混合と指数
const generatorFunc: GeneratorFunc = (level) => {
  let pattern = pattern1;
  if (level == 2) {
    pattern = randArray(pattern1, pattern2);
  } else if (level == 3) {
    pattern = randArray(pattern2, pattern3);
  } else if (level == 4) {
    pattern = randArray(pattern3, pattern4);
  } else if (level == 5) {
    pattern = randArray(pattern4, pattern5);
  }

  return pattern();
};

const opAddSub = () => randArray("", "+", "-");
const opMulDiv = () => randArray("\\times", "\\div");

const termForAddSub = () => new Term(getRandomInt(9, 1) * randArray(1, -1));
const termForMulDiv = () => new Term(getRandomInt(9, 2) * randArray(1, -1));
const termForPow = (exp: number) =>
  new Term(getRandomInt(exp > 2 ? 5 : 9, 2) * randArray(1, -1));

const optForAddSub = (op: string) => {
  return {
    brackets: op ? "()" : "",
    sign: op == "",
  };
};
const optForMulDiv = (t: Term) => {
  return { brackets: t.s > 0 ? "" : "()" };
};

const binaryResult = (lhs: Term, op: string, rhs: Term) => {
  if (op == "\\div") {
    return lhs.div(rhs);
  } else if (op == "\\times") {
    return lhs.mul(rhs);
  } else if (op == "-") {
    return new Term(lhs.c.sub(rhs.c));
  }

  return new Term(lhs.c.add(rhs.c));
};

// a [+-] b [*/] c
const pattern1 = () => {
  const terms: Term[] = [];
  const operators: string[] = [];
  const exponent = randArray(2, 3);

  const exPos = getRandomInt(2);
  terms.push(
    exPos == 0 ? termForPow(exponent) : termForAddSub(),
    exPos == 1 ? termForPow(exponent) : termForMulDiv(),
    exPos == 2 ? termForPow(exponent) : termForMulDiv()
  );
  operators.push(opAddSub(), opMulDiv());

  // if (operators[1] == "\\div") {
  //   terms[1] = terms[1].mul(terms[2].pow(exPos == 2 ? exponents : 1));
  // }

  let brackets = "";
  const exTerms = terms.map((t, i) => {
    if (exPos == i) {
      if (i == 0 && t.s < 0) {
        brackets = randArray("", "()");
        if (brackets == "") {
          return t.abs().pow(exponent).mul(-1);
        }
      }
      return t.pow(exponent);
    }
    return t;
  });

  let ans = binaryResult(exTerms[1], operators[1], exTerms[2]);
  ans = binaryResult(exTerms[0], operators[0], ans);
  if (ans.c.d != 1 || ans.c.abs().compare(99) > 0) {
    return null;
  }

  const question =
    terms[0].toLatex({ brackets }) +
    (exPos == 0 ? `^{${exponent}}` : "") +
    operators[0] +
    " " +
    terms[1].toLatex(optForAddSub(operators[0])) +
    (exPos == 1 ? `^{${exponent}}` : "") +
    operators[1] +
    " " +
    terms[2].toLatex(optForMulDiv(terms[2])) +
    (exPos == 2 ? `^{${exponent}}` : "");
  const answer = ans.toLatex();

  return { question, answer };
};

// a [*/] b [+-] c
const pattern2 = () => {
  const terms: Term[] = [];
  const operators: string[] = [];

  terms.push(termForMulDiv(), termForMulDiv(), termForAddSub());
  operators.push(opMulDiv(), opAddSub());

  if (operators[0] == "\\div") {
    terms[0] = terms[0].mul(terms[1]);
  }
  let ans = binaryResult(terms[0], operators[0], terms[1]);
  ans = binaryResult(ans, operators[1], terms[2]);

  const question =
    terms[0].toLatex() +
    operators[0] +
    " " +
    terms[1].toLatex(optForMulDiv(terms[1])) +
    operators[1] +
    " " +
    terms[2].toLatex(optForAddSub(operators[1]));

  const answer = ans.toLatex();

  return { question, answer };
};

// a [+-] b [*/] c [+-] d
const pattern3 = () => {
  const terms: Term[] = [];
  let operators: string[] = [];

  terms.push(
    termForAddSub(),
    termForMulDiv(),
    termForMulDiv(),
    termForAddSub()
  );
  operators = shuffle("", "+", "-");
  operators = [operators[0], opMulDiv(), operators[1]];

  if (operators[1] == "\\div") {
    terms[1] = terms[1].mul(terms[2]);
  }
  let ans = binaryResult(terms[1], operators[1], terms[2]);
  ans = binaryResult(terms[0], operators[0], ans);
  ans = binaryResult(ans, operators[2], terms[3]);

  const question =
    terms[0].toLatex() +
    operators[0] +
    " " +
    terms[1].toLatex(optForAddSub(operators[0])) +
    operators[1] +
    " " +
    terms[2].toLatex(optForMulDiv(terms[2])) +
    operators[2] +
    " " +
    terms[3].toLatex(optForAddSub(operators[2]));

  const answer = ans.toLatex();

  return { question, answer };
};

// a [*/] b [+-] c [*/] d
const pattern4 = () => {
  const terms: Term[] = [];
  let operators: string[] = [];

  terms.push(
    termForMulDiv(),
    termForMulDiv(),
    termForMulDiv(),
    termForMulDiv()
  );
  operators = shuffle("\\times", "\\div");
  operators = [operators[0], opAddSub(), operators[1]];

  if (operators[0] == "\\div") {
    terms[0] = terms[0].mul(terms[1]);
  }
  if (operators[2] == "\\div") {
    terms[2] = terms[2].mul(terms[3]);
  }
  const left = binaryResult(terms[0], operators[0], terms[1]);
  const right = binaryResult(terms[2], operators[2], terms[3]);
  const ans = binaryResult(left, operators[1], right);

  const question =
    terms[0].toLatex() +
    operators[0] +
    " " +
    terms[1].toLatex(optForMulDiv(terms[1])) +
    operators[1] +
    " " +
    terms[2].toLatex(optForAddSub(operators[1])) +
    operators[2] +
    " " +
    terms[3].toLatex(optForMulDiv(terms[3]));

  const answer = ans.toLatex();

  return { question, answer };
};

// a [+-] b [*/] c [*/] d
const pattern5 = () => {
  const terms: Term[] = [];
  let operators: string[] = [];

  terms.push(
    termForAddSub(),
    termForMulDiv(),
    termForMulDiv(),
    termForMulDiv()
  );
  operators = shuffle("\\times", "\\div");
  operators = [opAddSub(), ...operators];

  if (operators[1] == "\\div") {
    terms[1] = terms[1].mul(terms[2]);
  }
  if (operators[2] == "\\div") {
    terms[2] = terms[2].mul(terms[3]);
  }
  let ans = binaryResult(terms[1], operators[1], terms[2]);
  ans = binaryResult(ans, operators[2], terms[3]);
  ans = binaryResult(terms[0], operators[0], ans);

  const question =
    terms[0].toLatex() +
    operators[0] +
    " " +
    terms[1].toLatex(optForAddSub(operators[0])) +
    operators[1] +
    " " +
    terms[2].toLatex(optForMulDiv(terms[2])) +
    operators[2] +
    " " +
    terms[3].toLatex(optForMulDiv(terms[3]));

  const answer = ans.toLatex();

  return { question, answer };
};
