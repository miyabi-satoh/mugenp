import { Monomial } from "./monomial";
import { Polynomial } from "./polynomial";

describe("Polynomialクラス", () => {
  test("デフォルトコンストラクタ", () => {
    const x = new Polynomial();
    expect(x.length).toBe(0);
  });
  test.each([["1", "2", "1+2"]])("コンストラクタ", (a, b, expected) => {
    const x = new Polynomial(new Monomial(a), new Monomial(b));
    expect(x.toLatex()).toBe(expected);
  });
  test.each([["1", "2", "1+2"]])("add()", (a, b, expected) => {
    const x = new Polynomial(new Monomial(a));
    expect(x.add(new Monomial(b)).toLatex()).toBe(expected);
  });
  test.each([["1", "2", "2"]])("mul()", (a, b, expected) => {
    const x = new Polynomial(new Monomial(a));
    expect(x.mul(new Monomial(b)).toLatex()).toBe(expected);
  });
});
