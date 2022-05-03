/**
 * 本番環境かどうかの判定
 */
export const isDev = process.env.NODE_ENV !== "production";

/**
 * min以上 max以下のランダムな整数を返す
 */
export function getRandomInt(max: number, min: number = 0): number {
  if (min > max) {
    [max, min] = [min, max];
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * scoreを元にした抽選
 *
 * F(x) = 100 - (x^2/2)
 * F(0) = 100, F(10) = 50
 */
export function byScore<T>(score: number, ...ary: T[]): T {
  const threshold = Math.max(100 / ary.length, 100 - (score * score) / 2);
  const found = ary.find((x) => getRandomInt(100) <= threshold);
  return found !== undefined ? found : ary[0];
}

/**
 * 最大公約数を求める
 * https://mebee.info/2021/04/26/post-26097/
 */
export function gcd(...args: number[]): number {
  const f = (x: number, y: number): number => (y ? f(y, x % y) : x);

  let ans = Math.abs(args[0]);

  for (let i = 1; i < args.length; i++) {
    ans = f(ans, Math.abs(args[i]));
  }

  return ans;
}

/**
 * 安全な配列からのチョイス
 */
export function guard<T>(idx: number, ...ary: T[]): T {
  if (ary[idx] === undefined) {
    if (idx > ary.length / 2) {
      return ary.slice(-1)[0];
    } else {
      return ary[0];
    }
  }
  return ary[idx];
}

/**
 * 配列からランダムに要素を返す
 */
export function randArray<T>(...array: T[]): T {
  var rand = (Math.random() * array.length) | 0;
  var rValue = array[rand];
  return rValue;
}
