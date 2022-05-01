import { Monomial } from "./monomial";

export class Polynomial {
  private _monomials: Monomial[] = [];

  constructor(...monomials: Monomial[]);
  constructor(...monomials: Monomial[]) {
    this._monomials = monomials.map((x) => new Monomial(x));
  }

  get length(): number {
    return this._monomials.length;
  }

  append(x: Monomial | Polynomial): Polynomial {
    if (x instanceof Polynomial) {
      return new Polynomial(...this._monomials, ...x._monomials);
    }
    return new Polynomial(...this._monomials, x);
  }

  mul(x: Monomial | Polynomial): Polynomial {
    if (x instanceof Monomial) {
      return new Polynomial(...this._monomials.map((m) => m.mul(x)));
    }
    let ret = new Polynomial();
    this._monomials.forEach((m) => {
      ret = ret.append(x.mul(m));
    });
    return ret;
  }

  add(x: Monomial | Polynomial): Polynomial {
    return this.append(x).compact();
  }

  compact(): Polynomial {
    return new Polynomial(...Monomial.merge(...this._monomials));
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
    const inverter = ascend ? 1 : -1;
    const monomials = this._monomials.map((x) => new Monomial(x));
    monomials.sort((a, b) => {
      const ad = a.degree(_focus);
      const bd = b.degree(_focus);

      // 単純な次数比較
      const comp = ad.compare(bd);
      if (comp !== 0) {
        return inverter * comp;
      }

      // 次数が等しいので、文字のアルファベット順で比較
      const keys = [...a.factors, ...b.factors].sort().filter((x, i, array) => {
        if (i === 0) {
          return true;
        }
        return x !== array[i - 1];
      });

      for (let i = 0; i < keys.length; i++) {
        const ad = a.degree(keys[i]);
        const bd = b.degree(keys[i]);
        const comp = ad.compare(bd);
        if (comp !== 0) {
          return inverter * comp;
        }
      }

      // 最後は係数比較
      return inverter * a.coeff.compare(b.coeff);
    });

    return new Polynomial(...monomials);
  }
}
