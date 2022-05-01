import { ParameterCondition } from "~/interfaces/types";
import { Fraction } from "./fraction";

export const isDev = process.env.NODE_ENV !== "production";

export function getRandomInt(max: number, min: number = 0): number {
  if (min > max) {
    [max, min] = [min, max];
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function drawLots<T>(threshold: number, ...lots: T[]): T {
  const len = lots.length;
  let i = 0;
  for (; i < len - 1; i++) {
    if (getRandomInt(100) < threshold) {
      return lots[i];
    }
  }
  return lots[i];
}

export function checkParam(p: Fraction): boolean {
  // 大きめの仮分数は気持ち悪い
  if (p.isFrac && p.abs.compare(1.5) > 0) {
    return false;
  }
  // 分母は5まで
  if (p.d > 5) {
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

type Filter = undefined | ((f: Fraction) => boolean);
export function getRandomFraction(f: Filter = undefined): Fraction {
  do {
    const n = getRandomInt(9, -9);
    if (n != 0) {
      const m = getRandomInt(9, 1);
      const frac = new Fraction(n, m);
      if (!f || f(frac)) {
        return frac;
      }
    }
  } while (1);
  return new Fraction(1);
}

export function getParam(condition: ParameterCondition): Fraction {
  do {
    // 分母
    const m = getRandomInt(condition.maxD, 1);
    // 分子
    const maxN = m === 1 ? condition.max : condition.maxN;
    const minN = condition.allowNegative ? maxN * -1 : 0;
    const n = getRandomInt(maxN, minN);

    if (n === 0 && !condition.allowZero) {
      continue;
    }

    return new Fraction(n, m);
  } while (1);
  return new Fraction(1);
}
