import Fraction from "fraction.js";
import { getRandomInt } from ".";

/**
 * 項の生成条件
 */
export type TermSpec = {
  /**
   * 文字
   */
  factors?: string;

  /**
   * 整数の最大値
   * 省略時は 1
   */
  max?: number;
  /**
   * 分母の最大値
   * 省略時は 1
   */
  maxD?: number;
  /**
   * 分子の最大値
   * 省略時は 1
   */
  maxN?: number;
  /**
   * true = 負の数を許可する
   * 省略時は false
   */
  allowNegative?: boolean;
  /**
   * true = 0を許可する
   * 省略時は false
   */
  allowZero?: boolean;
};

export type LatexOptions = {
  sign?: boolean;
  brackets?: string;
  decimal?: boolean;
  showZero?: boolean;
};

type Factor = {
  [key: string]: Fraction;
};

export type MonomialConstructor = number | string | Fraction | Monomial;

export class Monomial {
  private _coeff: Fraction = new Fraction(1);
  private _factors: Factor = {};

  constructor(x: MonomialConstructor);
  constructor(x: Fraction, v: string);
  constructor(x: Fraction, v: Factor);
  constructor(x: MonomialConstructor, v?: string | Factor) {
    if (v !== undefined) {
      if (typeof v === "string") {
        // x: Fraction
        // v: string
        const m = new Monomial(v);
        return m.mul(x);
      } else {
        this._coeff = new Fraction(x as Fraction);
        this._factors = Monomial.mergeFactors(v);
      }
    } else if (x instanceof Monomial) {
      return new Monomial(x._coeff, x._factors);
    } else if (typeof x !== "string") {
      // 非文字列なら係数のみ
      return new Monomial(new Fraction(x), {});
    } else {
      const reNum = "(\\d+\\.\\d+)|(\\d+/\\d+)|(\\d*)";
      const re = new RegExp(`^([+-]?(${reNum}))(.*)$`);
      const matches = x.match(re);
      // matches[0]:全体
      // matches[1]:係数全体
      // matches[2]:係数の符号以外
      // matches[3]:小数にマッチした場合
      // matches[4]:分数にマッチした場合
      // matches[5]:整数にマッチした場合
      // matches[6]:文字式
      // console.log(matches);
      if (matches === null) {
        throw new Error("Invalid argument");
      }
      if (matches[6]) {
        // 文字式の省略された"1"
        if (matches[1] === undefined || matches[1] == "+") {
          matches[1] = "1";
        } else if (matches[1] == "-") {
          matches[1] = "-1";
        }
      }

      const regex = /([A-Za-z])(\^\{([^}]+)\})?/g;
      let tmp;
      let factors: Factor = {};
      while ((tmp = regex.exec(matches[6])) !== null) {
        // tmp[0]:全体
        // tmp[1]:文字
        // tmp[2]:^{指数}
        // tmp[3]:指数
        // console.log(tmp);

        const key = tmp[1];
        const exp = tmp[3] || "1";
        const newFactor: Factor = {};
        newFactor[key] = new Fraction(exp);
        factors = Monomial.mergeFactors(factors, newFactor);
      }

      const coeff = new Fraction(matches[1] || 1);
      return new Monomial(coeff, factors);
    }
  }

  /**
   * 係数を返す
   */
  get coeff(): Fraction {
    return this._coeff;
  }
  /**
   * 文字(元)をアルファベット順で返す
   */
  get factors(): string[] {
    return Object.keys(this._factors).sort();
  }

  /**
   * 全体または特定文字の次数を返す
   * @param key 特定文字
   * @returns
   */
  degree(key?: string): Fraction {
    let degree = new Fraction(0);
    if (key !== undefined) {
      if (this._factors[key] !== undefined) {
        degree = new Fraction(this._factors[key]);
      }
    } else {
      Object.keys(this._factors).forEach((key) => {
        degree = degree.add(this._factors[key]);
      });
    }
    return degree;
  }

  likes(other: MonomialConstructor): boolean {
    if (!(other instanceof Monomial)) {
      other = new Monomial(other);
    }

    // 最初にキーを比較
    const factorsA = JSON.stringify(this.factors);
    const factorsB = JSON.stringify(other.factors);
    if (factorsA !== factorsB) {
      return false;
    }

    // キー一致なら次数を比較
    if (
      this.factors.find(
        (key) => !this._factors[key].equals((other as Monomial)._factors[key])
      )
    ) {
      return false;
    }
    return true;
  }

  toString(): string {
    const moji = Object.keys(this._factors)
      .sort()
      .map((key) => {
        const exp = this._factors[key];
        if (exp.equals(0)) {
          return "";
        }
        if (exp.equals(1)) {
          return key;
        }
        return key + "^{" + exp.toString() + "}";
      })
      .join("");

    const coeff = this._coeff.toString();
    if (!moji) {
      return coeff;
    }

    if (coeff == "1") {
      return moji;
    }
    if (coeff == "-1") {
      return "-" + moji;
    }
    return coeff + moji;
  }

  toLatex(options: LatexOptions = {}): string {
    if (this._coeff.equals(0)) {
      return options.showZero ? "0" : "";
    }

    // カッコの設定
    let left = "";
    let right = "";
    if (options.brackets && options.brackets.length == 2) {
      [left, right] = [
        `\\left${options.brackets[0]}`,
        `\\right${options.brackets[1]}`,
      ];
      options.sign = true;
    }

    // 分子と分母
    let numerator = "";
    let denominator = "";
    Object.keys(this._factors)
      .sort()
      .forEach((key) => {
        const exp = this._factors[key];
        if (exp.equals(0)) {
          // pass
        } else if (exp.equals(1)) {
          numerator += key;
        } else if (exp.compare(0) > 0) {
          numerator += key + "^{" + exp.toLatex() + "}";
        } else if (exp.equals(-1)) {
          denominator += key;
        } else {
          denominator += key + "^{" + exp.neg().toLatex() + "}";
        }
      });

    let sign = "";
    if (this._coeff.s >= 0) {
      sign = options.sign ? "+" : "";
    } else {
      sign = "-";
    }
    if (denominator.length > 0) {
      // 分母に文字がある場合
      return (
        left +
        sign +
        "\\frac{" +
        Monomial.mojisiki(String(this._coeff.n), numerator) +
        "}{" +
        Monomial.mojisiki(String(this._coeff.d), denominator) +
        "}" +
        right
      );
    } else {
      let coeff = "";
      if (options.decimal) {
        coeff = this._coeff.abs().toString();
      } else {
        coeff = this._coeff.abs().toLatex();
      }
      // if (coeff == "1" && numerator.length > 0) {
      //   return left + sign + numerator + right;
      // }
      // if (coeff == "-1" && numerator.length > 0) {
      //   return left + "-" + numerator + right;
      // }
      return left + sign + Monomial.mojisiki(coeff, numerator) + right;
    }
  }

  /**
   * 文字式のルールに従った表現を返す
   * @param keisuu [string] 係数
   * @param moji [string] 文字
   * @returns
   */
  private static mojisiki(keisuu: string, moji: string): string {
    if (keisuu === "0") {
      return "";
    } else if (keisuu === "1" && moji.length > 0) {
      return moji;
    } else if (keisuu === "-1" && moji.length > 0) {
      return "-" + moji;
    } else {
      return keisuu + moji;
    }
  }

  /**
   * Multiplies two rational numbers
   */
  mul(other: MonomialConstructor): Monomial {
    if (!(other instanceof Monomial)) {
      other = new Monomial(other);
    }
    const coeff = this._coeff.mul(other._coeff);
    const factors = Monomial.mergeFactors(this._factors, other._factors);

    return new Monomial(coeff, factors);
  }

  div(other: MonomialConstructor): Monomial {
    if (!(other instanceof Monomial)) {
      other = new Monomial(other);
    }
    const coeff = this._coeff.div(other._coeff);
    const newFactors: Factor = {};
    Object.keys(other._factors).forEach((key) => {
      newFactors[key] = (other as Monomial)._factors[key].neg();
    });
    const factors = Monomial.mergeFactors(this._factors, newFactors);

    return new Monomial(coeff, factors);
  }

  static merge(...monomials: Monomial[]): Monomial[] {
    const ret: Monomial[] = [];

    monomials.forEach((a) => {
      const i = ret.findIndex((b) => {
        const keysA = a.factors;
        const keysB = b.factors;
        if (JSON.stringify(keysA) !== JSON.stringify(keysB)) {
          return false;
        }
        if (keysA.length === 0) {
          return true;
        }
        return !keysA.find((key) => !a.degree(key).equals(b.degree(key)));
      });

      if (i === -1) {
        ret.push(new Monomial(a));
      } else {
        ret[i] = new Monomial(ret[i].coeff.add(a.coeff), a._factors);
      }
    });

    return ret;
  }

  private static mergeFactors(...factors: Factor[]): Factor {
    const ret: Factor = {};
    factors.forEach((f) => {
      Object.keys(f).forEach((key) => {
        if (ret[key] === undefined) {
          ret[key] = new Fraction(f[key]);
        } else {
          ret[key] = ret[key].add(f[key]);
        }
      });
    });

    // 0乗になった文字は取り除く
    Object.keys(ret)
      .filter((key) => ret[key].equals(0))
      .forEach((key) => {
        delete ret[key];
      });

    return ret;
  }

  static create({
    factors = "",
    max = 1,
    maxD = 1,
    maxN = 1,
    allowNegative = false,
    allowZero = false,
  }: TermSpec): Monomial {
    do {
      // 分母
      const m = getRandomInt(maxD, 1);
      // 分子
      maxN = m === 1 ? max : maxN;
      const minN = allowNegative ? maxN * -1 : 0;
      const n = getRandomInt(maxN, minN);

      if (n === 0 && !allowZero) {
        continue;
      }

      return new Monomial(new Fraction(n, m), factors);
    } while (1);

    throw new Error("What's wrong?");
  }

  // 係数に関するショートカット
  get n(): number {
    return this.coeff.n;
  }
  get d(): number {
    return this.coeff.d;
  }
  get s(): number {
    return this.coeff.s;
  }
  valueOf(): number {
    return this.coeff.valueOf();
  }
  abs(): Fraction {
    return this.coeff.abs();
  }
  neg(): Monomial {
    return new Monomial(this.coeff.neg(), this._factors);
  }
  get isInteger(): boolean {
    return this.d === 1;
  }
  get isNatural(): boolean {
    return this.isInteger && this.n > 0;
  }
  get isFrac(): boolean {
    return this.d > 1;
  }
  get isPositive(): boolean {
    return this.s > 0;
  }
  get isNegative(): boolean {
    return this.s < 0;
  }
}
