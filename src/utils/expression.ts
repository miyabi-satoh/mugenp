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
      factors.push({ char, dim });
      // const index = factors.findIndex((factor) => factor.char == char);
      // if (index != -1) {
      //   factors[index].dim.add(dim);
      // } else {
      //   factors.push({
      //     char,
      //     dim,
      //   });
      // }
    }
    this._factors = Term.mergeFactors(...factors);

    // // 0乗を除外
    // factors = factors.filter((f) => !f.dim.equals(0));

    // // アルファベット順にソート
    // factors.sort((a, b) => {
    //   if (a.char == b.char) {
    //     return 0;
    //   }
    //   if (a.char.match(/^\\pi ?$/)) {
    //     return -1;
    //   }
    //   if (b.char.match(/^\\pi ?$/)) {
    //     return 1;
    //   }
    //   const charA = a.char.toUpperCase();
    //   const charB = b.char.toUpperCase();
    //   if (charA < charB) {
    //     return -1;
    //   }
    //   if (charA > charB) {
    //     return 1;
    //   }
    //   return 0;
    // });

    // this._factors = factors;
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
   * 乗算
   * @date 6/3/2022 - 2:11:02 AM
   *
   * @param {Term} other
   * @returns {Term}
   */
  mul(other: Term): Term {
    const newTerm = new Term(this.c.mul(other.c));
    newTerm._factors = Term.mergeFactors(...this._factors, ...other._factors);
    return newTerm;
  }

  /**
   * 除算
   * @date 6/3/2022 - 2:11:14 AM
   *
   * @param {Term} other
   * @returns {Term}
   */
  div(other: Term): Term {
    const newTerm = new Term(this.c.div(other.c));
    newTerm._factors = Term.mergeFactors(
      ...this._factors,
      ...other._factors.map((f) => {
        return {
          char: f.char,
          dim: f.dim.neg(),
        };
      })
    );
    return newTerm;
  }

  /**
   * 累乗
   * @date 6/5/2022 - 1:24:23 AM
   *
   * @param {number} n
   * @returns {Term}
   */
  pow(n: number): Term {
    const newTerm = new Term(this.c.pow(n));
    newTerm._factors = Term.mergeFactors(
      ...this._factors.map((f) => {
        return {
          char: f.char,
          dim: f.dim.mul(n),
        };
      })
    );
    return newTerm;
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
  toLatex(
    opt: { decimal?: boolean; sign?: boolean; brackets?: string } = {}
  ): string {
    // カッコの設定
    let left = "";
    let right = "";
    if (opt.brackets && opt.brackets.length == 2) {
      [left, right] = [`\\left${opt.brackets[0]}`, `\\right${opt.brackets[1]}`];
      opt.sign = true;
    }

    // 係数を文字列化
    let coeff = opt.decimal ? this.c.toString() : this.c.toLatex();
    // +符号の強制表示
    if (opt.sign && this.s > 0) {
      coeff = "+" + coeff;
    }

    // 0
    if (this.c.equals(0)) {
      return "0";
    }

    // 文字を文字列化
    const factors = this.factorsToString();

    // 文字なしなら係数のみ返却
    if (!factors.length) {
      return `${left} ${coeff} ${right}`.trim();
    }

    // 文字がある場合、"1"は表示しない
    if (this.c.abs().equals(1)) {
      coeff = coeff.replace("1", "");
    }

    return `${left} ${coeff} ${factors} ${right}`.trim();
  }

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

  private static mergeFactors(...factors: Factor[]): Factor[] {
    let mergedFactors: Factor[] = [];

    factors.forEach((factor) => {
      const index = mergedFactors.findIndex((x) => factor.char == x.char);
      if (index != -1) {
        mergedFactors[index].dim = mergedFactors[index].dim.add(factor.dim);
      } else {
        mergedFactors.push(factor);
      }
    });

    // 0乗を除外
    mergedFactors = mergedFactors.filter((f) => !f.dim.equals(0));

    // アルファベット順にソート
    mergedFactors.sort((a, b) => {
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

    return mergedFactors;
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
