import { getParam } from "~/utils";

describe("getParam()のテスト", () => {
  test("1のみ", () => {
    for (let i = 0; i < 100; i++) {
      const x = getParam({
        max: 1,
        maxD: 1,
        maxN: 1,
        allowZero: false,
        allowNegative: false,
      });
      expect(x.equals(1)).toBeTruthy();
    }
  });

  test("1か-1のみ", () => {
    for (let i = 0; i < 100; i++) {
      const x = getParam({
        max: 1,
        maxD: 1,
        maxN: 1,
        allowZero: false,
        allowNegative: true,
      });
      expect(x.resembles(1)).toBeTruthy();
    }
  });

  test("自然数のみ", () => {
    for (let i = 0; i < 100; i++) {
      const x = getParam({
        max: 10,
        maxD: 1,
        maxN: 1,
        allowZero: false,
        allowNegative: false,
      });
      expect(x.compare(0) > 0).toBeTruthy();
      expect(x.compare(10) <= 0).toBeTruthy();
    }
  });

  test("整数のみ", () => {
    for (let i = 0; i < 100; i++) {
      const x = getParam({
        max: 10,
        maxD: 1,
        maxN: 1,
        allowZero: true,
        allowNegative: true,
      });
      expect(x.compare(-10) >= 0).toBeTruthy();
      expect(x.compare(10) <= 0).toBeTruthy();
    }
  });

  test("分数あり", () => {
    let cntF = 0;
    let cntI = 0;
    for (let i = 0; i < 100; i++) {
      const x = getParam({
        max: 5,
        maxD: 5,
        maxN: 5,
        allowZero: false,
        allowNegative: true,
      });
      if (x.isFrac) {
        cntF++;
      }
      if (x.isInteger) {
        cntI++;
      }
      expect(x.compare(-10) >= 0).toBeTruthy();
      expect(x.compare(10) <= 0).toBeTruthy();
    }
    // console.log(cntF, cntI);
  });
});
