import { gcd } from "~/utils";

describe("ユーティリティ関数のテスト", () => {
  test("gcd()で負の数を指定", () => {
    expect(gcd(24, -32)).toBe(8);
  });
  test("gcd()で小数を指定", () => {
    expect(gcd(2, 0.5)).toBe(0.5);
  });
});
