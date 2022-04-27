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

// 最小公約数
export function getMinCoprime(a: number, b: number) {
  a = Math.abs(a);
  b = Math.abs(b);
  const min = Math.min(a, b);
  for (let i = 2; i <= min; i++) {
    if (a % i == 0 && b % i == 0) {
      return i;
    }
  }
  return 1;
}

// 最大公約数
export function getMaxCoprime(a: number, b: number) {
  a = Math.abs(a);
  b = Math.abs(b);
  const min = Math.min(a, b);
  for (let i = min; i > 1; i--) {
    if (a % i == 0 && b % i == 0) {
      return i;
    }
  }
  return 1;
}
