import { GeneratorFunc, MugenP } from "~/components/mugenp";
import { getRandomInt, randArray } from "~/utils";
import { Monomial } from "~/utils/monomial";

const Mugen = () => {
  return <MugenP generator={generatorFunc} />;
};

export { Mugen as M71211 };

// 加法の応用
const generatorFunc: GeneratorFunc = (level) => {
  // score|Lv|M1|M2|M3|M4
  // 0    | 1| 4| 0| 0| 0
  // 1    | 1| 4| 0| 0| 0
  // 2    | 1| 4| 0| 0| 0
  // --------------------
  // 3    | 1| 3| 1| 0| 0
  // 4    | 1| 3| 1| 0| 0
  // 5    | 2| 3| 1| 0| 0
  // --------------------
  // 6    | 2| 2| 2| 0| 0
  // 7    | 2| 2| 2| 0| 0
  // 8    | 2| 2| 2| 0| 0
  // --------------------
  // 9    | 2| 1| 3| 0| 0
  // 10   | 3| 1| 3| 0| 0
  // 11   | 3| 1| 3| 0| 0
  // --------------------
  // 12   | 3| 1| 2| 1| 0
  // 13   | 3| 1| 2| 1| 0
  // 14   | 3| 1| 2| 1| 0
  // --------------------
  // 15   | 4| 1| 1| 2| 0
  // 16   | 4| 1| 1| 2| 0
  // 17   | 4| 1| 1| 2| 0
  // --------------------
  // 18   | 4| 1| 1| 1| 1
  // 19   | 4| 1| 1| 1| 1
  const modeArray = [];
  if (level < 1) {
    modeArray.push(1, 1, 1, 1);
  } else if (level < 2) {
    modeArray.push(1, 1, 1, 2);
  } else if (level < 3) {
    modeArray.push(1, 1, 2, 2);
  } else if (level < 4) {
    modeArray.push(1, 2, 2, 2);
  } else if (level < 5) {
    modeArray.push(1, 2, 2, 3);
  } else if (level < 6) {
    modeArray.push(1, 2, 3, 3);
  } else {
    modeArray.push(1, 2, 3, 4);
  }

  const values: Array<[Monomial, boolean]> = [];
  switch (randArray(...modeArray)) {
    case 1: // Lv1: 整数
      {
        for (let i = 0; i < 2; i++) {
          const x = Monomial.create({
            max: 9,
            allowNegative: true,
            allowZero: true,
          });
          values.push([x, false]);
        }
      }
      break;
    case 2: // Lv2: 小数
      {
        for (let i = 0; i < 2; i++) {
          // const pow = Math.pow(10, getRandomInt(2));
          const x = Monomial.create({
            max: 99,
            allowNegative: true,
            allowZero: true,
          }).div(10);
          values.push([x, true]);
        }
      }
      break;
    case 3: // Lv3: 分数(同分母)
      {
        const m = getRandomInt(5, 2);
        for (let i = 0; i < 2; i++) {
          const x = Monomial.create({
            max: 9,
            allowNegative: true,
            allowZero: true,
          }).div(m);
          values.push([x, false]);
        }
      }
      break;
    default:
      {
        // Lv4: 混在
        for (let i = 0; i < 2; i++) {
          const m = getRandomInt(5, 1);
          const x = Monomial.create({
            max: 9,
            allowNegative: true,
            allowZero: true,
          }).div(m);
          values.push([x, false]);
        }
      }
      break;
  }

  const question = values
    .map((x) => x[0].toLatex({ sign: true, brackets: "()", decimal: x[1] }))
    .join(" + ");

  const aValue = values.reduce((pv, cv) => [
    new Monomial(pv[0].coeff.add(cv[0].coeff)),
    false,
  ])[0];
  const answer = aValue.toLatex({ decimal: !question.includes("frac") });

  return { question, answer };
};
