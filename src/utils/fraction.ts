export class Fraction {
  private _numerator: number = 0;
  private _denominator: number = 1;
  private _sign: number = 0;

  constructor(n: number = 0, d: number = 1) {
    if (d === 0) {
      throw new Error("Division by Zero");
    }
    const s = Math.sign(n * d);
    n = Math.abs(n);
    d = Math.abs(d);

    // ユークリッドの互除法で最大公約数を取得する
    // https://blog.beatdjam.com/entry/2017/11/07/190000
    const f = (a: number, b: number): number => (a % b ? f(b, a % b) : b);
    const gcd = f(n, d);

    this._numerator = n / gcd;
    this._denominator = d / gcd;
    this._sign = s;
  }

  /**
   * Gets the numerator of the fraction
   */
  get n(): number {
    return this._numerator;
  }

  /**
   * Gets the denominator of the fraction
   */
  get d(): number {
    return this._denominator;
  }

  /**
   * Gets the sign of the fraction
   * @return 1, -1, 0, -0
   */
  get s(): number {
    return this._sign;
  }

  /**
   * Returns a decimal representation of the fraction
   */
  get valueOf(): number {
    return (this.s * this.n) / this.d;
  }

  /**
   * Calculates the absolute value
   */
  get abs(): Fraction {
    return new Fraction(this.n, this.d);
  }

  /**
   * Returns true if the fraction is integer
   */
  get isInteger(): boolean {
    return this.d == 1;
  }

  /**
   * Returns true if the fraction is natural number
   */
  get isNatural(): boolean {
    return this.d == 1 && this.s > 0;
  }

  /**
   * Returns true if the fraction is not integer
   */
  get isFrac(): boolean {
    return this.d != 1;
  }

  /**
   * Returns true if the fraction is greater than 0
   */
  get isPositive(): boolean {
    return this.s > 0;
  }

  /**
   * Returns true if the fraction is less than 0
   */
  get isNegative(): boolean {
    return this.s < 0;
  }

  /**
   * Gets the inverse of the fraction, means numerator and denominator are exchanged
   */
  inverse(): Fraction {
    return new Fraction(this.s * this.d, this.n);
  }

  /**
   * Check if two rational numbers are the same
   */
  equals(other: number | Fraction): boolean {
    if (typeof other === "number") {
      other = new Fraction(other);
    }
    return (
      // a/b = A/B -> a*B = A*b
      this.s * this.n * other.d === other.s * other.n * this.d
    );
  }

  /**
   * Check if the absolute values ​​of the two rational numbers are the same
   */
  resembles(other: number | Fraction): boolean {
    if (typeof other === "number") {
      other = new Fraction(other);
    }
    return this.n * other.d === other.n * this.d;
  }

  compare(other: number | Fraction): number {
    if (typeof other === "number") {
      other = new Fraction(other);
    }
    return this.s * this.n * other.d - other.s * other.n * this.d;
  }
  /**
   * Creates a string representation of a fraction
   */
  toString(): string {
    return String(this.valueOf);
  }

  /**
   * Returns a latex representation of a Fraction object
   */
  toLatex(moji: string = "", showPlus: boolean = false): string {
    const sign = this._sign < 0 ? "-" : showPlus ? "+" : "";
    if (this.isInteger) {
      if (this.n == 0) {
        return sign + "0";
      }
      if (Math.abs(this.n) == 1) {
        return sign + (moji ? moji : "1");
      }
      return sign + this.n + moji;
    }
    return sign + `\\frac{` + this.n + `}{` + this.d + `}` + moji;
  }

  /**
   * Adds two rational numbers
   */
  add(other: Fraction | number): Fraction {
    if (typeof other === "number") {
      other = new Fraction(other);
    }
    return new Fraction(
      this.s * this.n * other.d + other.s * other.n * this.d,
      this.d * other.d
    );
  }

  /**
   * Multiplies two rational numbers
   */
  mul(other: Fraction | number): Fraction {
    if (typeof other === "number") {
      other = new Fraction(other);
    }
    return new Fraction(this.s * other.s * this.n * other.n, this.d * other.d);
  }
}
