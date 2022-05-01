import { Fraction } from "./fraction";

type Factor = {
  [key: string]: Fraction;
};

type MonomialConstructor = number | string | Fraction | Monomial;

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

  toLatex(showPlus?: boolean, brackets?: string): string;
  toLatex(brackets?: string, showPlus?: boolean): string;
  toLatex(showPlus?: boolean | string, brackets?: string | boolean): string {
    if (typeof showPlus === "string") {
      [showPlus, brackets] = [brackets, showPlus];
    }
    if (showPlus === undefined) {
      showPlus = false;
    }
    if (brackets === undefined) {
      brackets = "";
    }
    if (typeof showPlus != "boolean" || typeof brackets != "string") {
      throw new Error("Invalid argument");
    }

    let left = "";
    let right = "";
    if (brackets.length == 2) {
      [left, right] = [`\\left${brackets[0]}`, `\\right${brackets[1]}`];
    }

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
        return key + "^{" + exp.toLatex() + "}";
      })
      .join("");

    const coeff = this._coeff.toLatex();
    const sign = showPlus && this.coeff.s > 0 ? "+" : "";
    if (!moji) {
      return left + sign + coeff + right;
    }

    if (coeff == "1") {
      return left + sign + moji + right;
    }
    if (coeff == "-1") {
      return left + "-" + moji + right;
    }
    return left + sign + coeff + moji + right;
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
    return ret;
  }
}
