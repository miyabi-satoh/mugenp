import { Monomial } from "~/utils/monomial";

describe("Monomialクラス", () => {
  test.each([
    ["0", "0"],
    ["+5", "5"],
    ["-5", "-5"],
    ["0.3", "0.3"],
    ["+1.4", "1.4"],
    ["-12.08", "-12.08"],
    ["1/2", "0.5"],
    ["+4/2", "2"],
    ["-9/10", "-0.9"],
    ["-4x^{2}y", "-4x^{2}y"],
    ["-3/2xxx", "-1.5x^{3}"],
    ["x", "x"],
    ["+abc", "abc"],
    ["-xyz", "-xyz"],
    ["x^{0}", "1"],
  ])("コンストラクタ %s", (a, expected) => {
    const x = new Monomial(a);
    expect(x.toString()).toBe(expected);
  });

  test.each([
    ["2", "3", "6"],
    ["1", "x", "x"],
    ["x", "-2", "-2x"],
    ["x", "x", "x^{2}"],
    ["2", "", "2"],
    ["x", "", "x"],
  ])("mul() %s x %s", (a, b, expected) => {
    const x = new Monomial(a);
    expect(x.mul(b).toString()).toBe(expected);
  });
});
