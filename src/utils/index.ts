import { Fraction } from "./fraction";

export function ifUnder<T1, T2>(percentage: number, v1: T1, v2: T2): T1 | T2 {
  return Math.floor(Math.random() * 100) < percentage ? v1 : v2;
}

export function checkParam(p: Fraction): boolean {
  // 大きめの仮分数は気持ち悪い
  if (p.isFrac && p.abs > 1.5) {
    return false;
  }
  // 分母は5まで
  if (p.denominator > 5) {
    return false;
  }
  return true;
}
