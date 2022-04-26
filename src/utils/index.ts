import { Fraction } from "./fraction";

export function getRandomInt(max: number, min: number = 0): number {
  if (min > max) {
    [max, min] = [min, max];
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function ifUnder<T1, T2>(percentage: number, v1: T1, v2: T2): T1 | T2 {
  return getRandomInt(100) <= percentage ? v1 : v2;
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
