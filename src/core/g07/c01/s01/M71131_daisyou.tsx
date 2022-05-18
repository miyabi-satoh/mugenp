import Fraction from "fraction.js";
import { MugenContainer } from "~/components/container";
import { RefreshFunction } from "~/interfaces/types";
import { dsp, getRandomInt, randArray } from "~/utils";
import { Monomial } from "~/utils/monomial";

// "id": "71131",
// "module": "daisyou",
// "grade": "中1",
// "chapter": "正の数・負の数",
// "section": "正の数・負の数",
// "subsection": "絶対値と数の大小",
// "title": "正の数・負の数の大小",
// "message": "次の各組の数の大小を、不等号(＜)を使って表しなさい。"
const Mugen = () => {
  return <MugenContainer answerPrefix="" onRefresh={handleRefresh} />;
};

export { Mugen as M71131 };

// 正の数・負の数の大小
const handleRefresh: RefreshFunction = (level, score) => {
  const values: Array<[Monomial, boolean]> = [];

  switch (level) {
    case 1: // Lv1: 整数、整数
      {
        const len = randArray(2, 2, 2, 3);
        const base = Monomial.create({
          max: 5,
          allowNegative: true,
          allowZero: true,
        });
        values.push([base, false]);
        do {
          const diff = Monomial.create({
            max: 4,
            allowNegative: true,
          });
          const other = new Monomial(base.coeff.add(diff.coeff));
          if (!values.find((v) => v[0].toString() === other.toString())) {
            values.push([other, false]);
          }
        } while (values.length < len);
      }
      break;
    case 2: // Lv2: 整数、小数
      {
        const len = randArray(2, 2, 2, 3);
        const base = Monomial.create({
          max: 5,
          allowNegative: true,
          allowZero: true,
        });
        values.push([base, false]);
        do {
          const diff = Monomial.create({
            max: 9,
            allowNegative: true,
          }).coeff.div(10);
          // base +/- 0.1〜0.9の範囲
          const other = new Monomial(base.coeff.add(diff));
          if (!values.find((v) => v[0].toString() === other.toString())) {
            values.push([other, true]);
          }
        } while (values.length < len);
      }
      break;
    case 3: // Lv3: 整数、分数/小数
      {
        const len = randArray(2, 2, 2, 3);
        const base = Monomial.create({
          max: 5,
          allowNegative: true,
          allowZero: true,
        });
        values.push([base, false]);
        do {
          const diff = new Fraction(randArray(1, -1), getRandomInt(5, 2));
          const other = new Monomial(base.coeff.add(diff));
          if (!values.find((v) => v[0].toString() === other.toString())) {
            values.push([other, [2, 5, 10].includes(other.d)]);
          }
        } while (values.length < len);
      }
      break;
    default:
      {
        // Lv4〜: 混在
        const len = randArray(2, 3, 3);
        const base = Monomial.create({
          max: 5,
          allowNegative: true,
          allowZero: true,
        });
        do {
          const diff = new Fraction(getRandomInt(5, -5), getRandomInt(5, 1));
          const other = new Monomial(base.coeff.add(diff));
          if (!values.find((v) => v[0].toString() === other.toString())) {
            values.push([other, [2, 5, 10].includes(other.d)]);
          }
        } while (values.length < len);
      }
      break;
  }

  // 確率50%でリバース
  if (randArray(true, false)) {
    values.reverse();
  }

  const showZero = true;
  const question = values
    .map((x) => x[0].toLatex({ decimal: x[1], showZero }))
    .join(",\\quad ");
  const answer = values
    .sort((a, b) => a[0].coeff.compare(b[0].coeff))
    .map((x) => x[0].toLatex({ decimal: x[1], showZero }))
    .join(" < ");

  return [dsp(question), dsp(answer)];
};
