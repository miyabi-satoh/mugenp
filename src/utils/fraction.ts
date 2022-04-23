export class Fraction {
  private _numerator: number = 0;
  private _denominator: number = 1;
  private _sign: number = 1;

  constructor(numerator: number = 0, denominator: number = 1) {
    if (denominator === 0) {
      throw new Error(`Invalid denominator: ${denominator}`);
    }
    this._sign = numerator * denominator > 0 ? 1 : -1;
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

  toString(): string {
    return `${this.numerator}/${this.denominator}`;
  }

  toTex(): string {
    if (this.denominator == 1) {
      return `${this.numerator}`;
    }
    return `${this.numerator < 0 ? "-" : ""}\\frac{${Math.abs(
      this.numerator
    )}}{${this.denominator}}`;
  }

  // 約分
  private reduction() {
    const end = Math.min(this._numerator, this._denominator);
    for (let i = end; i > 1; i--) {
      if (this._numerator % i == 0 && this._denominator % i == 0) {
        this._numerator = this._numerator / i;
        this._denominator = this._denominator / i;
        this.reduction();
        return;
      }
    }
  }
}
