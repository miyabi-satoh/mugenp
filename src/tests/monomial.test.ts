import { Fraction } from "~/utils/fraction";
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

  test("コンストラクタ", () => {
    const x = new Monomial(new Fraction(1), "");
    expect(x.toString()).toBe("1");
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

  test.each([
    ["1", "-1"],
    ["-1", "1"],
    ["x", "-x"],
    ["-x", "x"],
  ])("neg() %s -> %s", (a, expected) => {
    const x = new Monomial(a);
    expect(x.neg.toString()).toBe(expected);
  });
});

describe("create()のテスト", () => {
  test("1のみ", () => {
    for (let i = 0; i < 100; i++) {
      const x = Monomial.create({
        max: 1,
        maxD: 1,
        maxN: 1,
        allowZero: false,
        allowNegative: false,
      });
      expect(x.coeff.equals(1)).toBeTruthy();
    }
  });

  test("1か-1のみ", () => {
    for (let i = 0; i < 100; i++) {
      const x = Monomial.create({
        max: 1,
        maxD: 1,
        maxN: 1,
        allowZero: false,
        allowNegative: true,
      });
      expect(x.coeff.resembles(1)).toBeTruthy();
    }
  });

  test("自然数のみ", () => {
    for (let i = 0; i < 100; i++) {
      const x = Monomial.create({
        max: 10,
        maxD: 1,
        maxN: 1,
        allowZero: false,
        allowNegative: false,
      });
      expect(x.coeff.compare(0) > 0).toBeTruthy();
      expect(x.coeff.compare(10) <= 0).toBeTruthy();
    }
  });

  test("整数のみ", () => {
    for (let i = 0; i < 100; i++) {
      const x = Monomial.create({
        max: 10,
        maxD: 1,
        maxN: 1,
        allowZero: true,
        allowNegative: true,
      });
      expect(x.coeff.compare(-10) >= 0).toBeTruthy();
      expect(x.coeff.compare(10) <= 0).toBeTruthy();
    }
  });

  test("分数あり", () => {
    let cntF = 0;
    let cntI = 0;
    for (let i = 0; i < 100; i++) {
      const x = Monomial.create({
        max: 5,
        maxD: 5,
        maxN: 5,
        allowZero: false,
        allowNegative: true,
      });
      if (x.coeff.isFrac) {
        cntF++;
      }
      if (x.coeff.isInteger) {
        cntI++;
      }
      expect(x.coeff.compare(-10) >= 0).toBeTruthy();
      expect(x.coeff.compare(10) <= 0).toBeTruthy();
    }
    // console.log(cntF, cntI);
  });
});
