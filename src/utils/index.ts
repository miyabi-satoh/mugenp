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
 * thresholdを確率(%)としたクジ引き
 */
export function drawLots<T>(threshold: number, ...lots: T[]): T {
  const found = lots.find((x) => getRandomInt(100) < threshold);
  return found || lots.slice(-1)[0];
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
