import { Fraction } from "./fraction";

describe("Fraction()", () => {
  const f = new Fraction();
  test("denominator = 1", () => {
    expect(f.denominator).toBe(1);
  });
  test("numerator = 0", () => {
    expect(f.numerator).toBe(0);
  });
  test("value = 0", () => {
    expect(f.value).toBe(0);
  });
  test("abs = 0", () => {
    expect(f.abs).toBe(0);
  });
  test("isInteger = true", () => {
    expect(f.isInteger).toBeTruthy();
  });
  test("isNatural = false", () => {
    expect(f.isNatural).toBeFalsy();
  });
  test("isFrac = false", () => {
    expect(f.isFrac).toBeFalsy();
  });
  test("isPositive = false", () => {
    expect(f.isPositive).toBeFalsy();
  });
  test("isNegative = false", () => {
    expect(f.isNegative).toBeFalsy();
  });
  test("invert() => Error", () => {
    expect(() => f.invert()).toThrow(Error);
  });
  test("isEqualTo(0) = true", () => {
    expect(f.isEqualTo(0)).toBeTruthy();
  });
  test("isEqualTo(1) = false", () => {
    expect(f.isEqualTo(1)).toBeFalsy();
  });
  test("isEqualTo(-1) = false", () => {
    expect(f.isEqualTo(-1)).toBeFalsy();
  });
  test("isEqualTo(self) = true", () => {
    expect(f.isEqualTo(f)).toBeTruthy();
  });
  test("isSimilarTo(0) = true", () => {
    expect(f.isSimilarTo(0)).toBeTruthy();
  });
  test("isSimilarTo(1) = false", () => {
    expect(f.isSimilarTo(1)).toBeFalsy();
  });
  test("isSimilarTo(-1) = false", () => {
    expect(f.isSimilarTo(-1)).toBeFalsy();
  });
  test("isSimilarTo(self) = true", () => {
    expect(f.isSimilarTo(f)).toBeTruthy();
  });
  test("toString() = 0/1", () => {
    expect(f.toString()).toBe("0/1");
  });
  test("toTex() = '0'", () => {
    expect(f.toTex()).toBe("0");
  });
  test("toTex('x') = '0'", () => {
    expect(f.toTex("x")).toBe("0");
  });
  test("toTex('', true) = '+0'", () => {
    expect(f.toTex("", true)).toBe("+0");
  });
  test("toTex('x', true) = '+0'", () => {
    expect(f.toTex("x", true)).toBe("+0");
  });
  test("add(1) = 1", () => {
    expect(f.add(1).value).toBe(1);
    expect(f.add(new Fraction(1)).value).toBe(1);
  });
  test("mul(1) = 0", () => {
    expect(f.mul(1).value).toBe(0);
    expect(f.mul(new Fraction(1)).value).toBe(0);
  });
});
