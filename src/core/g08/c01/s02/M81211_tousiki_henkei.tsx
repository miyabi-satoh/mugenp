import Fraction from "fraction.js";
import { MugenContainer } from "~/components/container";
import { RefreshFunction } from "~/interfaces/types";
import { dsp, gcd, getRandomInt, guard, lcm, minMax, randArray } from "~/utils";
import { Monomial } from "~/utils/monomial";
import { Polynomial } from "~/utils/polynomial";

// "id": "81211",
// "module": "tousiki_henkei",
// "grade": "中2",
// "chapter": "式の計算",
// "section": "文字式の利用",
// "subsection": "文字式の利用",
// "title": "等式変形",
// "message": "次の等式を[　]内の文字について解きなさい。"
const Mugen = () => {
  return <MugenContainer maxLv={9} answerPrefix="" onRefresh={handleRefresh} />;
};

export { Mugen as M81211 };

// 等式変形
const handleRefresh: RefreshFunction = (level, score) => {
  const idx = level - 1;
  // 項を生成する
  const terms: Monomial[] = [];
  ["a", "b", "c", ""].forEach((c, i) => {
    const x = Monomial.create({
      max: minMax(1, level + i, 8), // level + (0,1,2,3)
      maxD: guard(idx, 1, 1, 1, 1, 1, 6),
      maxN: guard(idx, 1, 1, 1, 1, 1, 6),
      factors: c,
      allowNegative: true,
      allowZero: true,
    });
    if (x.toLatex().length > 0) {
      // 0は除外する
      terms.push(x);
    }
  });
  if (terms.length <= 2) {
    // 2項以下はスキップ
    return ["", ""];
  }
  if (terms.length >= 4) {
    terms.pop();
  }

  let poly: Polynomial[] = [];
  // 左辺
  poly[0] = new Polynomial(
    ...terms.splice(0, getRandomInt(minMax(1, terms.length, 3), 1))
  );
  // 右辺
  poly[1] = new Polynomial(...terms);

  if (level === 1) {
    // Lv1は = 0 を除外
    if (poly[0].length === 0) {
      return ["", ""];
    }
  }
  if (level >= 3) {
    // Lv3は、両辺を割るタイプも混ぜる
    const k = getRandomInt(3, 1);
    poly = poly.map((p) => p.mul(k));
  }

  // 項数の多い辺の中から、どの文字について解くかランダムに決定
  const p = poly[0].length >= poly[1].length ? poly[0] : poly[1];
  const target: string = randArray(
    ...p.terms
      .filter((t) => t.degree().compare(1) >= 0)
      .map((t) => t.factors.join(""))
  );

  const prefix = [new Fraction(1), new Fraction(1)];
  if (level >= 5) {
    poly = poly.map((p, i) => {
      if (p.length !== 2) {
        return p;
      } else if (p.terms.find((t) => t.isFrac)) {
        // 通分する
        const f = new Fraction(1, lcm(...p.terms.map((t) => t.d)));
        prefix[i] = f;
        return p.div(f);
      } else {
        // 共通因数でくくる
        let f = new Fraction(gcd(...p.terms.map((t) => t.n)));
        f = f.mul(p.terms[0].s);
        prefix[i] = f;
        return p.div(f);
      }
    });
  }

  const question =
    poly
      .map((p, i) => {
        if (prefix[i].d > 1) {
          return "\\frac{" + p.toLatex() + `}{${prefix[i].d}}`;
        } else if (prefix[i].n > 1) {
          return `${prefix[i].toLatex()}\\left(` + p.toLatex() + "\\right)";
        } else {
          return p.toLatex();
        }
      })
      .join(" = ") + ` \\qquad [\\,${target}\\,]`;

  // prefixを元に戻す
  poly = poly.map((p, i) => p.mul(prefix[i]));

  ////////////////////////////////
  // 解きます
  ////////////////////////////////
  if (poly[1].terms.find((t) => t.likes(target))) {
    // 解く文字を左辺に
    poly.reverse();
  }
  // 対象外の項を右辺に移項
  let term;
  while ((term = poly[0].terms.find((t) => !t.likes(target))) !== undefined) {
    const negTerm = term.neg();
    poly = poly.map((p) => p.add(negTerm));
  }
  // 左辺に残った項の係数で両辺を割る
  const coeff = poly[0].terms[0].coeff;
  poly = poly.map((p) => p.div(coeff).orderTo());
  let denominator = 1;
  if (poly[1].terms.find((t) => t.isFrac)) {
    // 答えに分数が含まれる場合
    if (level <= 3) {
      // Lv3まではスキップ
      return ["", ""];
    }
    // 分母の最小公倍数を求める
    denominator = lcm(...poly[1].terms.map((t) => t.d));
    poly[1] = new Polynomial(
      ...poly[1].terms.map((t) => {
        return t.mul(denominator);
      })
    );
  }

  let answer = poly[0].toLatex() + " = ";
  if (denominator === 1) {
    answer += poly[1].toLatex();
  } else {
    answer += "\\frac{" + poly[1].toLatex() + `}{${denominator}}`;
  }

  return [dsp(question), dsp(answer)];
};
