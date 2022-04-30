import { Monomial } from "./monomial";

export class Polynomial {
  private _monomials: Monomial[] = [];

  constructor(...factors: Monomial[]);
  constructor(...factors: Monomial[]) {
    this._monomials = factors.map((x) => new Monomial(x));
  }

  get length(): number {
    return this._monomials.length;
  }

  add(x: Monomial): Polynomial {
    return new Polynomial(...this._monomials, x);
  }

  mul(x: Monomial): Polynomial {
    return new Polynomial(...this._monomials.map((m) => m.mul(x)));
  }

  toLatex(): string {
    return this._monomials.map((x, i) => x.toLatex(!!i)).join("");
  }

  orderTo(ascend?: boolean): Polynomial;
  orderTo(focus?: string): Polynomial;
  orderTo(ascend?: boolean | string, focus?: string | boolean): Polynomial {
    if (typeof ascend === "string") {
      [ascend, focus] = [focus, ascend];
    }
    if (ascend === undefined) {
      ascend = false;
    }
    if (typeof focus === "boolean") {
      focus = undefined;
    }

    const _focus = focus;
    return new Polynomial(
      ...this._monomials.sort((a, b) => {
        const ad = a.degree(_focus);
        const bd = b.degree(_focus);
        // 単純な次数比較
        if (ad > bd) {
          return ascend ? -1 : 1;
        }
        if (bd > ad) {
          return ascend ? 1 : -1;
        }

        // 次数が等しいので、文字のアルファベット順で比較
        const keys = [...a.factors, ...b.factors]
          .sort()
          .filter((x, i, array) => {
            if (i === 0) {
              return true;
            }
            return x !== array[i - 1];
          });

        for (let i = 0; i < keys.length; i++) {
          const ad = a.degree(keys[i]);
          const bd = b.degree(keys[i]);
          if (ad > bd) {
            return ascend ? -1 : 1;
          }
          if (bd > ad) {
            return ascend ? 1 : -1;
          }
        }

        // 最後は係数比較
        if (ascend) {
          return b.coeff.compare(a.coeff);
        }
        return a.coeff.compare(b.coeff);
      })
    );
  }
}
