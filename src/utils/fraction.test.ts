import { Fraction } from "./fraction";

describe("Fractionクラス", () => {
  describe("分母=0の例外をテスト", () => {
    test("new Fraction(1, 0)は例外を送出する", () => {
      expect(() => new Fraction(1, 0)).toThrow(Error);
    });
    test("分子=0でのinvert()は例外を送出する", () => {
      const f = new Fraction();
      expect(f.numerator).toBe(0);
      expect(() => f.invert()).toThrow(Error);
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
      expect(f.value).toBe(expected);
      expect(f.isEqualTo(expected)).toBeTruthy();
      expect(f.isEqualTo(expected + 1)).toBeFalsy();
      expect(f.isSimilarTo(expected)).toBeTruthy();
      expect(f.isSimilarTo(-expected)).toBeTruthy();
      expect(f.isSimilarTo(expected + 1)).toBeFalsy();
      expect(f.isSimilarTo(-expected - 1)).toBeFalsy();
    });
  });

  describe("toTex()をテスト", () => {
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
      expect(f.toTex()).toBe(expected);
    });
  });
  describe("toTex('', true)をテスト", () => {
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
      expect(f.toTex("", true)).toBe(expected);
    });
  });

  describe("toTex('x')をテスト", () => {
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
      expect(f.toTex("x")).toBe(expected);
    });
  });

  describe("toTex('x', true)をテスト", () => {
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
      expect(f.toTex("x", true)).toBe(expected);
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
      expect(f.add(p).value).toBe(c + p);
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
      expect(f.add(g).value).toBe((5 * c + p) / 5);
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
      expect(f.mul(p).value).toBe(c * p);
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
      expect(f.mul(g).value).toBe((c * p) / 5);
    });
  });
});
