import { gcd, randArray } from "~/utils";

describe("ユーティリティ関数のテスト", () => {
  test("gcd()で負の数を指定", () => {
    expect(gcd(24, -32)).toBe(8);
  });
  test("gcd()で小数を指定", () => {
    expect(gcd(2, 0.5)).toBe(0.5);
  });
  test("randArray()", () => {
    const count = [0, 0, 0, 0];
    for (let i = 0; i < 100; i++) {
      const n = randArray(0, 1, 2, 3);
      count[n]++;
    }
    console.log(count);
  });
});
