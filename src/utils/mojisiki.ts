import { Fraction } from "./fraction";

type Variable = {
  moji: string;
  dimension: Fraction;
};

export class Monomial {
  private _coefficient: Fraction = new Fraction(); // 係数
  private _variables: Variable[] = []; // 文字(元)

  constructor(
    coefficient: Fraction = new Fraction(),
    variables: Variable[] = []
  ) {
    // console.log(variables);
    this._coefficient = coefficient;
    variables.forEach((v) => {
      if (v.moji.length > 1) {
        v.moji.split("").forEach((m) => {
          this._variables.push({
            moji: m,
            dimension: v.dimension,
          });
        });
      } else {
        this._variables.push(v);
      }
    });
    // this._variables = [...variables];
    this.compact();
  }

  get coeff(): Fraction {
    return this._coefficient;
  }

  get variable(): string {
    return this._variables
      .map((v) => {
        if (v.dimension.equals(1)) {
          return v.moji;
        }
        return v.moji + "^" + v.dimension.toLatex();
      })
      .join("");
  }

  inverse(): Monomial {
    return new Monomial(
      this.coeff.inverse(),
      this._variables.map((v: Variable) => ({
        moji: v.moji,
        dimension: v.dimension.mul(-1),
      }))
    );
  }

  toLatex(showPlus?: string | boolean, brackets?: string | boolean): string {
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
    return left + this.coeff.toLatex(this.variable, showPlus) + right;
  }

  mul(lhs: Monomial | number): Monomial {
    if (typeof lhs === "number") {
      return new Monomial(this.coeff.mul(lhs), this._variables);
    }
    return new Monomial(this.coeff.mul(lhs._coefficient), [
      ...this._variables,
      ...lhs._variables,
    ]);
  }

  private compact() {
    // console.log("before", this._variables);
    const newVariables: Variable[] = [];
    // 同じ文字をまとめる
    this._variables.forEach((v) => {
      const index = newVariables.findIndex((nv) => nv.moji == v.moji);
      if (index != -1) {
        newVariables[index] = {
          moji: v.moji,
          dimension: newVariables[index].dimension.add(v.dimension),
        };
      } else {
        newVariables.push(v);
      }
    });
    // 次数0を削除してからアルファベット順にする
    this._variables = newVariables.filter((v) => !v.dimension.equals(0));
    this._variables.sort((a, b) => {
      var mojiA = a.moji.toUpperCase(); // 大文字と小文字を無視する
      var mojiB = b.moji.toUpperCase(); // 大文字と小文字を無視する
      if (mojiA < mojiB) {
        return -1;
      }
      if (mojiA > mojiB) {
        return 1;
      }
      // 同じ文字なハズは無いんだが…
      console.log("Oh my god!");
      return 0;
    });
    // console.log("after", this._variables);
  }
}

export type Polynomial = Monomial[];
