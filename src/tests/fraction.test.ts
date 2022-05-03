import { Fraction } from "~/utils/fraction";

describe("Fractionクラス", () => {
  describe("分母=0の例外をテスト", () => {
    test("new Fraction(1, 0)は例外を送出する", () => {
      expect(() => new Fraction(1, 0)).toThrow(Error);
    });
    test("分子=0でのinverse()は例外を送出する", () => {
      const f = new Fraction(0, 1);
      expect(f.n).toBe(0);
      expect(() => f.inverse()).toThrow(Error);
    });
  });

  describe("構築時の約分をテスト", () => {
    test.each([
      [0, 1, 0], // 0/1 = 0
      [1, 1, 1], // 1/1 = 1
      [2, 2, 1], // 2/2 = 1
      [4, 8, 0.5], // 4/8 = 0.5
    ])("%d / %d = %d", (a, b, expected) => {
      const f = new Fraction(a, b);
      expect(f.valueOf).toBe(expected);
      expect(f.equals(expected)).toBeTruthy();
      expect(f.equals(expected + 1)).toBeFalsy();
      expect(f.resembles(expected)).toBeTruthy();
      expect(f.resembles(-expected)).toBeTruthy();
      expect(f.resembles(expected + 1)).toBeFalsy();
      expect(f.resembles(-expected - 1)).toBeFalsy();
    });
  });

  describe("toLatex()をテスト", () => {
    test.each([
      [1, 1, "1"], // 1/1
      [5, 1, "5"], // 5/1
      [1, 5, "\\frac{1}{5}"], // 1/5
      [3, 5, "\\frac{3}{5}"], // 3/5
      [-1, 1, "-1"], // -1/1
      [-5, 1, "-5"], // -5/1
      [-1, 5, "-\\frac{1}{5}"], // -1/5
      [-3, 5, "-\\frac{3}{5}"], // -3/5
    ])("%d / %d = %s", (a, b, expected) => {
      const f = new Fraction(a, b);
      expect(f.toLatex()).toBe(expected);
    });
  });
  describe("toLatex('', true)をテスト", () => {
    test.each([
      [1, 1, "+1"], // 1/1
      [5, 1, "+5"], // 5/1
      [1, 5, "+\\frac{1}{5}"], // 1/5
      [3, 5, "+\\frac{3}{5}"], // 3/5
      [-1, 1, "-1"], // -1/1
      [-5, 1, "-5"], // -5/1
      [-1, 5, "-\\frac{1}{5}"], // -1/5
      [-3, 5, "-\\frac{3}{5}"], // -3/5
    ])("%d / %d = %s", (a, b, expected) => {
      const f = new Fraction(a, b);
      expect(f.toLatex("", true)).toBe(expected);
    });
  });

  describe("toLatex('x')をテスト", () => {
    test.each([
      [1, 1, "x"], // 1/1
      [5, 1, "5x"], // 5/1
      [1, 5, "\\frac{1}{5}x"], // 1/5
      [3, 5, "\\frac{3}{5}x"], // 3/5
      [-1, 1, "-x"], // -1/1
      [-5, 1, "-5x"], // -5/1
      [-1, 5, "-\\frac{1}{5}x"], // -1/5
      [-3, 5, "-\\frac{3}{5}x"], // -3/5
    ])("%d / %d = %s", (a, b, expected) => {
      const f = new Fraction(a, b);
      expect(f.toLatex("x")).toBe(expected);
    });
  });

  describe("toLatex('x', true)をテスト", () => {
    test.each([
      [1, 1, "+x"], // 1/1
      [5, 1, "+5x"], // 5/1
      [1, 5, "+\\frac{1}{5}x"], // 1/5
      [3, 5, "+\\frac{3}{5}x"], // 3/5
      [-1, 1, "-x"], // -1/1
      [-5, 1, "-5x"], // -5/1
      [-1, 5, "-\\frac{1}{5}x"], // -1/5
      [-3, 5, "-\\frac{3}{5}x"], // -3/5
    ])("%d / %d = %s", (a, b, expected) => {
      const f = new Fraction(a, b);
      expect(f.toLatex("x", true)).toBe(expected);
    });
  });

  describe.each([0, 1, -1])("add()をテスト", (p) => {
    test.each([
      [1, 1, 1], // 1/1
      [5, 1, 5], // 5/1
      [1, 5, 0.2], // 1/5
      [3, 5, 0.6], // 3/5
      [-1, 1, -1], // -1/1
      [-5, 1, -5], // -5/1
      [-1, 5, -0.2], // -1/5
      [-3, 5, -0.6], // -3/5
    ])(`Frac(%d / %d).add(${p})`, (a, b, c) => {
      const f = new Fraction(a, b);
      expect(f.add(p).valueOf).toBe(c + p);
    });

    test.each([
      [1, 1, 1], // 1/1
      [5, 1, 5], // 5/1
      [1, 5, 0.2], // 1/5
      [3, 5, 0.6], // 3/5
      [-1, 1, -1], // -1/1
      [-5, 1, -5], // -5/1
      [-1, 5, -0.2], // -1/5
      [-3, 5, -0.6], // -3/5
    ])(`Frac(%d / %d).add(${p}/5)`, (a, b, c) => {
      const f = new Fraction(a, b);
      const g = new Fraction(p, 5);
      expect(f.add(g).valueOf).toBe((5 * c + p) / 5);
    });
  });

  describe.each([0, 2, -2])("mul()をテスト", (p) => {
    test.each([
      [1, 1, 1], // 1/1
      [5, 1, 5], // 5/1
      [1, 5, 0.2], // 1/5
      [3, 5, 0.6], // 3/5
      [-1, 1, -1], // -1/1
      [-5, 1, -5], // -5/1
      [-1, 5, -0.2], // -1/5
      [-3, 5, -0.6], // -3/5
    ])(`Frac(%d / %d).mul(${p})`, (a, b, c) => {
      const f = new Fraction(a, b);
      expect(f.mul(p).valueOf).toBe(c * p);
    });

    test.each([
      [1, 1, 1], // 1/1
      [5, 1, 5], // 5/1
      [1, 5, 0.2], // 1/5
      [3, 5, 0.6], // 3/5
      [-1, 1, -1], // -1/1
      [-5, 1, -5], // -5/1
      [-1, 5, -0.2], // -1/5
      [-3, 5, -0.6], // -3/5
    ])(`Frac(%d / %d).mul(${p}/5)`, (a, b, c) => {
      const f = new Fraction(a, b);
      const g = new Fraction(p, 5);
      expect(f.mul(g).valueOf).toBe((c * p) / 5);
    });
  });

  describe("compare()をテスト", () => {
    test.each([
      [10, false, false, true],
      [1, false, true, false],
      [-10, true, false, false],
    ])("compare(%d)", (x, e1, e2, e3) => {
      const f = new Fraction(1);
      // console.log(f.compare(x));

      expect(f.compare(x) > 0).toBe(e1);
      expect(f.compare(x) == 0).toBe(e2);
      expect(f.compare(x) < 0).toBe(e3);
    });
  });

  describe("neg()をテスト", () => {
    test.each([
      [1, -1],
      [-1, 1],
    ])("compare(%d)", (a, expected) => {
      const f = new Fraction(a);
      expect(f.neg.valueOf).toBe(expected);
    });
  });
});
