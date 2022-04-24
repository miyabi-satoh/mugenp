import { Fraction } from "./fraction";

export class Monomial {
  private _coefficient: Fraction = new Fraction();
  private _variables: string[] = [];

  constructor(
    coefficient: Fraction = new Fraction(),
    variables: string[] = []
  ) {
    this._coefficient = coefficient;
    this._variables = [...variables];
  }

  get coefficient(): Fraction {
    return this._coefficient;
  }

  get variables(): string[] {
    return this._variables;
  }
}
