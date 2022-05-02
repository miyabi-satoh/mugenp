import { Monomial } from "~/utils/monomial";
import { Polynomial } from "~/utils/polynomial";

describe("Polynomialクラス", () => {
  test("デフォルトコンストラクタ", () => {
    const x = new Polynomial();
    expect(x.length).toBe(0);
  });

  test.each([["1", "2", "1+2"]])("コンストラクタ", (a, b, expected) => {
    const x = new Polynomial(new Monomial(a), new Monomial(b));
    expect(x.toLatex()).toBe(expected);
  });

  test.each([["1", "2", "1+2"]])("append()", (a, b, expected) => {
    const x = new Polynomial(new Monomial(a));
    expect(x.append(new Monomial(b)).toLatex()).toBe(expected);
  });

  test.each([["1", "2", "2"]])("mul()", (a, b, expected) => {
    const x = new Polynomial(new Monomial(a));
    expect(x.mul(new Monomial(b)).toLatex()).toBe(expected);
  });

  test.each([["1", "-2x", "+x^{2}"]])("orderTo()", (a, b, c) => {
    const x = new Polynomial(new Monomial(a), new Monomial(b), new Monomial(c));
    expect(x.orderTo("x").toLatex()).toBe("x^{2}-2x+1");
  });
});
