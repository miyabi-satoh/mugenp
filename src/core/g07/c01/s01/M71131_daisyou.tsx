import { MugenP, GeneratorFunc } from "~/components/mugenp";
import { dsp, getRandomInt, randArray, shuffle } from "~/utils";
import { Term } from "~/utils/expression";

// "id": "71131",
// "module": "daisyou",
// "grade": "中1",
// "chapter": "正の数・負の数",
// "section": "正の数・負の数",
// "subsection": "絶対値と数の大小",
// "title": "正の数・負の数の大小",
// "message": "次の各組の数の大小を、不等号(＜)を使って表しなさい。"
export const M71131 = () => {
  return <MugenP answerPrefix="" maxLv={6} generator={generatorFunc} />;
};

type DataType = {
  term: Term;
  decimal: boolean;
};

// 正の数・負の数の大小
const generatorFunc: GeneratorFunc = (level) => {
  const values: DataType[] = [];
  if (level == 1) {
    const base = getRandomInt(-9, -1);
    const diff = getRandomInt(5, 1);
    const decimal = false;
    values.push(
      {
        term: new Term(base),
        decimal,
      },
      {
        term: new Term(base + diff),
        decimal,
      }
    );
  } else if (level == 2) {
    const base = getRandomInt(-5, -1);
    const diff = getRandomInt(4, 1);
    const decimal = false;
    values.push(
      {
        term: new Term(base),
        decimal,
      },
      {
        term: new Term(base - diff),
        decimal,
      }
    );
  } else if (level == 3) {
    // ここからは3項
    const base = getRandomInt(-5, -1);
    const diff1 = getRandomInt(4, 1);
    const diff2 = getRandomInt(4, 1);
    const decimal = false;
    values.push(
      {
        term: new Term(base),
        decimal,
      },
      {
        term: new Term(base - diff1),
        decimal,
      },
      {
        term: new Term(base + diff2),
        decimal,
      }
    );
  } else if (level == 4) {
    // X.Y と X.YZ
    const base_n = getRandomInt(0, 3);
    const base_d = getRandomInt(9);
    const base = Number(`-${base_n}.${base_d}`);
    const diff1 = getRandomInt(9, 1) / 100;
    const diff2 = getRandomInt(9, 1) / 100;
    const decimal = true;
    values.push(
      {
        term: new Term(base),
        decimal,
      },
      {
        term: new Term(base - diff1),
        decimal,
      },
      {
        term: new Term(base + diff2),
        decimal,
      }
    );
  } else if (level == 5) {
    // 分数
    const base_n = getRandomInt(-1, -9);
    const base_d = getRandomInt(12, 2);
    const diff1 = getRandomInt(8, 1);
    const diff2 = getRandomInt(8, 1);
    const decimal = false;
    values.push(
      {
        term: new Term(base_n, base_d),
        decimal,
      },
      {
        term: new Term(base_n - diff1, base_d),
        decimal,
      },
      {
        term: new Term(base_n + diff2, base_d),
        decimal,
      }
    );
  } else {
    // 色々
    const base_n = getRandomInt(0, 3);
    const base_d = getRandomInt(9);
    const base = Number(`-${base_n}.${base_d}`);
    const diff1 = getRandomInt(9, 1) / 10;
    const diff2 = getRandomInt(9, 1) / 10;
    values.push(
      {
        term: new Term(base),
        decimal: true,
      },
      {
        term: new Term(base - diff1),
        decimal: randArray(true, false),
      },
      {
        term: new Term(base + diff2),
        decimal: randArray(true, false),
      }
    );
  }

  const question = dsp(
    shuffle(...values)
      .map(({ term, decimal }) => term.toLatex({ decimal }))
      .join(",\\quad ")
  );
  const answer = dsp(
    values
      .sort((a, b) => a.term.c.compare(b.term.c))
      .map(({ term, decimal }) => term.toLatex({ decimal }))
      .join(" < ")
  );

  return { question, answer };
};
