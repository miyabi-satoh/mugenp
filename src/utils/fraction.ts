import { getMaxCoprime, getRandomInt } from ".";

export class Fraction {
  private _numerator: number = 0;
  private _denominator: number = 1;
  private _sign: number = 0;

  constructor(numerator: number = 0, denominator: number = 1) {
    if (denominator === 0) {
      throw new Error(`Invalid denominator: ${denominator}`);
    }
    this._sign = Math.sign(numerator * denominator);
    this._numerator = Math.abs(numerator);
    this._denominator = Math.abs(denominator);
    this.reduction();
  }

  get numerator(): number {
    return this._numerator * this._sign;
  }
  get denominator(): number {
    return this._denominator;
  }
  get value(): number {
    return this.numerator / this.denominator;
  }
  get abs(): number {
    return Math.abs(this.value);
  }

  get isInteger(): boolean {
    return this.denominator == 1;
  }
  get isNatural(): boolean {
    return this.denominator == 1 && this._sign > 0;
  }
  get isFrac(): boolean {
    return this.denominator != 1;
  }
  get isPositive(): boolean {
    return this._sign > 0;
  }
  get isNegative(): boolean {
    return this._sign < 0;
  }

  invert(): Fraction {
    return new Fraction(this.denominator, this.numerator);
  }

  isEqualTo(other: number | Fraction): boolean {
    if (typeof other === "number") {
      return other * this.denominator == this.numerator;
    }
    return (
      this.numerator == other.numerator && this.denominator == other.denominator
    );
  }

  isSimilarTo(other: number | Fraction): boolean {
    if (typeof other === "number") {
      return Math.abs(other * this.denominator) == Math.abs(this.numerator);
    }
    return (
      Math.abs(this.numerator) == Math.abs(other.numerator) &&
      this.denominator == other.denominator
    );
  }

  toString(): string {
    return `${this.numerator}/${this.denominator}`;
  }

  toTex(moji: string = "", showPlus: boolean = false): string {
    const sign = this._sign < 0 ? "-" : showPlus ? "+" : "";
    if (this.isInteger) {
      if (this.numerator == 0) {
        return sign + "0";
      }
      if (Math.abs(this.numerator) == 1) {
        return sign + (moji ? moji : "1");
      }
      return sign + Math.abs(this.numerator) + moji;
    }
    return (
      sign +
      `\\frac{` +
      Math.abs(this.numerator) +
      `}{` +
      this.denominator +
      `}` +
      moji
    );
  }

  add(lhs: Fraction | number): Fraction {
    if (typeof lhs === "number") {
      return new Fraction(
        this.numerator + lhs * this.denominator,
        this.denominator
      );
    }
    return new Fraction(
      this.numerator * lhs.denominator + lhs.numerator * this.denominator,
      this.denominator * lhs.denominator
    );
  }

  mul(lhs: Fraction | number): Fraction {
    if (typeof lhs === "number") {
      return new Fraction(this.numerator * lhs, this.denominator);
    }
    return new Fraction(
      this.numerator * lhs.numerator,
      this.denominator * lhs.denominator
    );
  }

  // 約分
  private reduction() {
    // 0/m -> 0/1として扱う
    if (this._numerator == 0) {
      this._denominator = 1;
      return;
    }
    const coprime = getMaxCoprime(this._numerator, this._denominator);
    if (coprime != 1) {
      this._numerator = this._numerator / coprime;
      this._denominator = this._denominator / coprime;
      this.reduction();
      return;
    }
  }
}

type Filter = undefined | ((f: Fraction) => boolean);
export function getRandomFraction(f: Filter = undefined): Fraction {
  do {
    const n = getRandomInt(9, -9);
    if (n != 0) {
      const m = getRandomInt(9, 1);
      const frac = new Fraction(n, m);
      if (!f || f(frac)) {
        return frac;
      }
    }
  } while (1);
  return new Fraction(1);
}
