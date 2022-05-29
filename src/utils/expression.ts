import Fraction from "fraction.js";

/**
 * 項に含まれる文字情報を表現する型
 * @date 5/28/2022 - 9:21:15 PM
 *
 * @typedef {Factor}
 */
type Factor = {
  /**
   * 文字(character)
   * @date 5/28/2022 - 9:22:44 PM
   *
   * @type {string}
   */
  char: string;
  /**
   * 次数(dimension)
   * @date 5/28/2022 - 9:22:37 PM
   *
   * @type {Fraction}
   */
  dim: Fraction;
};

/**
 * 項を表現するクラス
 * @date 5/28/2022 - 9:29:56 PM
 *
 * @export
 * @class Term
 * @typedef {Term}
 */
export class Term {
  /**
   * 係数
   * @date 5/28/2022 - 9:21:15 PM
   *
   * @private
   * @type {Fraction}
   */
  private _coeff: Fraction = new Fraction(0);
  /**
   * 文字
   * @date 5/28/2022 - 9:21:15 PM
   *
   * @private
   * @type {Factor[]}
   */
  private _factors: Factor[] = [];

  /**
   * Creates an instance of Term.
   * @date 5/28/2022 - 9:31:37 PM
   *
   * @constructor
   * @param {?(number | string | Fraction)} [c]
   * @param {?(string | number)} [fs]
   */
  constructor(n: number, fs?: string);
  constructor(s: string, fs?: string);
  constructor(n: Fraction, fs?: string);
  constructor(n: number, m?: number);
  constructor(n: number, m?: number, fs?: string);
  constructor(a: number | string | Fraction, b?: number | string, c?: string) {
    let fs = "";
    if (typeof a == "number") {
      // 以下のいずれか
      // constructor(n:number, fs:string)
      // constructor(n:number, m:number)
      // constructor(n:number, m:number, fs:string)
      if (typeof b == "number") {
        this._coeff = new Fraction(a, b);
        if (typeof c == "string") {
          fs = c;
        }
      } else {
        this._coeff = new Fraction(a);
        if (typeof b == "string") {
          fs = b;
        }
      }
    } else {
      // 以下のいずれか
      // constructor(s:string, fs:string)
      // constructor(n:Fraction, fs:string)
      this._coeff = new Fraction(a);
      if (typeof b == "string") {
        fs = b;
      }
    }

    const regex = /([A-Za-z]|\\pi ?)(\^\{([^}]+)\})?/g;
    let tmp;
    let factors: Factor[] = [];
    while ((tmp = regex.exec(fs)) !== null) {
      // tmp[0]:全体
      // tmp[1]:文字
      // tmp[2]:^{指数}
      // tmp[3]:指数
      // console.log(tmp);

      if (tmp[3] == null) {
        tmp[3] = "1";
      }

      const char = tmp[1].trim();
      const dim = new Fraction(tmp[3].trim());
      const index = factors.findIndex((factor) => factor.char == char);
      if (index != -1) {
        factors[index].dim.add(dim);
      } else {
        factors.push({
          char,
          dim,
        });
      }
    }

    // 0乗を除外
    factors = factors.filter((f) => !f.dim.equals(0));

    // アルファベット順にソート
    factors.sort((a, b) => {
      if (a.char == b.char) {
        return 0;
      }
      if (a.char.match(/^\\pi ?$/)) {
        return -1;
      }
      if (b.char.match(/^\\pi ?$/)) {
        return 1;
      }
      const charA = a.char.toUpperCase();
      const charB = b.char.toUpperCase();
      if (charA < charB) {
        return -1;
      }
      if (charA > charB) {
        return 1;
      }
      return 0;
    });

    this._factors = factors;
  }

  /**
   * 係数へのアクセサ
   * @date 5/28/2022 - 9:32:07 PM
   *
   * @readonly
   * @type {Fraction}
   */
  get c(): Fraction {
    return this._coeff;
  }

  /**
   * 係数の符号を返す
   * @date 5/28/2022 - 9:32:27 PM
   *
   * @readonly
   * @type {number}
   */
  get s(): number {
    return this.c.s;
  }

  /**
   * 係数を絶対値にする
   * @date 5/28/2022 - 9:33:01 PM
   *
   * @returns {Term}
   */
  abs(): Term {
    const term = this.clone();
    term._coeff = this.c.abs();
    return term;
  }

  /**
   * 係数の符号を反転する
   * @date 5/28/2022 - 9:21:15 PM
   *
   * @returns {Term}
   */
  neg(): Term {
    const term = this.clone();
    term._coeff = this.c.neg();
    return term;
  }

  add() {}

  /**
   * 文字を文字列化する
   * @date 5/28/2022 - 9:34:33 PM
   *
   * @returns {string}
   */
  factorsToString(): string {
    return this._factors
      .map((factor) => {
        if (factor.dim.equals(1)) {
          return factor.char;
        }
        return factor.char + `^{${factor.dim.toString()}}`;
      })
      .join(" ")
      .trim();
  }

  /**
   * 文字列化する
   * @date 5/28/2022 - 9:34:58 PM
   *
   * @returns {string}
   */
  toString(): string {
    // 0
    if (this.c.equals(0)) {
      return this.c.toString();
    }

    const factors = this.factorsToString();
    // 文字なし
    if (!factors.length) {
      return this.c.toString();
    }

    let coeff = "";
    if (this.c.equals(-1)) {
      coeff = "-";
    } else if (!this.c.equals(1)) {
      coeff = this.c.toString();
    }

    return coeff + factors;
  }

  /**
   * LaTeX表現を返す
   * @date 5/28/2022 - 9:35:27 PM
   *
   * @param {{ decimal?: boolean; sign?: boolean }} [opt={}]
   * @returns {string}
   */
  toLatex(opt: { decimal?: boolean; sign?: boolean } = {}): string {
    // 係数を文字列化
    let coeff = opt.decimal ? this.c.toString() : this.c.toLatex();
    // +符号の強制表示
    if (opt.sign && this.s > 0) {
      coeff = "+" + coeff;
    }

    // 0
    if (this.c.equals(0)) {
      return coeff;
    }

    // 文字を文字列化
    const factors = this.factorsToString();

    // 文字なしなら係数のみ返却
    if (!factors.length) {
      return coeff;
    }

    // 文字がある場合、"1"は表示しない
    if (this.c.equals(1)) {
      coeff = "";
    } else if (this.c.equals(-1)) {
      coeff = "-";
    }

    return coeff + factors;
  }

  // mul()

  /**
   * 複製を返す
   * @date 5/28/2022 - 9:21:15 PM
   *
   * @returns {Term}
   */
  clone(): Term {
    const c = new Term(this.c);
    c._factors = [...this._factors];
    return c;
  }
}

/**
 * Description placeholder
 * @date 5/28/2022 - 9:21:15 PM
 *
 * @export
 * @class Expression
 * @typedef {Expression}
 */
export class Expression {
  /**
   * Description placeholder
   * @date 5/28/2022 - 9:21:15 PM
   *
   * @private
   * @type {Term[]}
   */
  private _terms: Term[] = [];

  /**
   * Description placeholder
   * @date 5/28/2022 - 9:21:15 PM
   *
   * @returns {string}
   */
  toString(): string {
    let s = "";
    this._terms.forEach((term, index) => {
      if (!index) {
        s += term.toString();
      } else {
        if (term.s) {
          s += "+";
        }
        s += term.toString();
      }
    });
    return s;
  }

  /**
   * Description placeholder
   * @date 5/28/2022 - 9:21:15 PM
   *
   * @param {(Term | Expression | Term[])} other
   */
  mul(other: Term | Expression | Term[]) {
    if (other instanceof Expression) {
      other = other._terms;
    } else if (other instanceof Term) {
      other = [other];
    }

    if (!this._terms.length) {
      throw new Error("Uninitialized");
    }
    if (!other.length) {
      throw new Error("Invalid argument");
    }

    const terms = [];
    const this_terms = this._terms;
    other.forEach((x) => {
      this_terms.forEach((y) => {
        // terms.push(x.mul(y))
      });
    });
  }
}
