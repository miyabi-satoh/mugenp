import Fraction from "fraction.js";

describe("Fractionクラス", () => {
  test("0", () => {
    const x = new Fraction(0);
    expect(x.abs().toString()).toBe("0");
    expect(x.neg().toString()).toBe("0");
    expect(x.add(1).toString()).toBe("1");
    expect(x.sub(1).toString()).toBe("-1");
    expect(x.mul(1).toString()).toBe("0");
    expect(x.div(1).toString()).toBe("0");
    expect(x.pow(1).toString()).toBe("0");
    expect(x.mod().toString()).toBe("0");
    expect(x.mod(1).toString()).toBe("0");
    expect(x.gcd(1).toString()).toBe("1");
    expect(x.lcm(1).toString()).toBe("0");
    expect(x.equals(0)).toBeTruthy();
    expect(x.compare(1) < 0).toBeTruthy();
    expect(x.compare(1) == 0).toBeFalsy();
    expect(x.compare(1) > 0).toBeFalsy();
    expect(x.compare(0) < 0).toBeFalsy();
    expect(x.compare(0) == 0).toBeTruthy();
    expect(x.compare(0) > 0).toBeFalsy();
  });

  test("3/10", () => {
    const x = new Fraction(3, 10);
    expect(x.abs().toString()).toBe("0.3");
    expect(x.neg().toString()).toBe("-0.3");
    expect(x.add(1).toString()).toBe("1.3");
    expect(x.sub(1).toString()).toBe("-0.7");
    expect(x.mul(1).toString()).toBe("0.3");
    expect(x.div(1).toString()).toBe("0.3");
    expect(x.pow(1).toString()).toBe("0.3");
    expect(x.mod().toString()).toBe("3");
    expect(x.mod(1).toString()).toBe("0.3");
    expect(x.gcd(1).toString()).toBe("0.1");
    expect(x.lcm(1).toString()).toBe("3");
    expect(x.equals(0.3)).toBeTruthy();
    expect(x.compare(1) < 0).toBeTruthy();
    expect(x.compare(1) == 0).toBeFalsy();
    expect(x.compare(1) > 0).toBeFalsy();
    expect(x.compare(0.3) < 0).toBeFalsy();
    expect(x.compare(0.3) == 0).toBeTruthy();
    expect(x.compare(0.3) > 0).toBeFalsy();
  });

  test("1/3", () => {
    const x = new Fraction(1, 3);
    expect(x.abs().toString()).toBe("0.(3)");
    expect(x.neg().toString()).toBe("-0.(3)");
    expect(x.add(1).toString()).toBe("1.(3)");
    expect(x.sub(1).toString()).toBe("-0.(6)");
    expect(x.mul(1).toString()).toBe("0.(3)");
    expect(x.div(1).toString()).toBe("0.(3)");
    expect(x.pow(1).toString()).toBe("0.(3)");
    expect(x.mod().toString()).toBe("1");
    expect(x.mod(1).toString()).toBe("0.(3)");
    expect(x.gcd(1).toString()).toBe("0.(3)");
    expect(x.lcm(1).toString()).toBe("1");
    expect(x.equals(0.3)).toBeFalsy();
    expect(x.compare(1) < 0).toBeTruthy();
    expect(x.compare(1) == 0).toBeFalsy();
    expect(x.compare(1) > 0).toBeFalsy();
    expect(x.compare(1 / 3) < 0).toBeFalsy();
    expect(x.compare(1 / 3) == 0).toBeTruthy();
    expect(x.compare(1 / 3) > 0).toBeFalsy();
  });
});
