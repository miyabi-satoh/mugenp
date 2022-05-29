/**
 * 本番環境かどうかの判定
 * @date 5/28/2022 - 10:30:08 PM
 *
 * @type {boolean}
 */
export const isDev: boolean = process.env.NODE_ENV !== "production";

/**
 * 数式をインラインスタイルにして返す
 * @date 5/28/2022 - 10:33:13 PM
 *
 * @export
 * @param {string} x
 * @returns {string}
 */
export function dsp(x: string): string {
  return `\\(\\displaystyle ${x}\\)`;
}

/**
 * min以上 max以下のランダムな整数を返す
 * @date 5/28/2022 - 10:33:34 PM
 *
 * @export
 * @param {number} max
 * @param {number} [min=0]
 * @returns {number}
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
 * 最大公約数を求める
 *
 * https://mebee.info/2021/04/26/post-26097/
 * @date 5/28/2022 - 10:35:26 PM
 *
 * @export
 * @param {...number[]} args
 * @returns {number}
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
 * 最小公倍数を求める
 *
 * https://tech-blog.s-yoshiki.com/entry/63/
 * @date 5/28/2022 - 10:35:49 PM
 *
 * @export
 * @param {...number[]} args
 * @returns {number}
 */
export function lcm(...args: number[]): number {
  const f = (n: number, m: number) => (n * m) / gcd(n, m);

  let ans = Math.abs(args[0]);

  for (let i = 1; i < args.length; i++) {
    ans = f(ans, Math.abs(args[i]));
  }
  return ans;
}

/**
 * 安全な配列からのチョイス
 * @date 5/28/2022 - 10:36:16 PM
 *
 * @export
 * @template T
 * @param {number} idx
 * @param {...T[]} ary
 * @returns {T}
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
 * @date 5/28/2022 - 10:36:38 PM
 *
 * @export
 * @template T
 * @param {...T[]} array
 * @returns {T}
 */
export function randArray<T>(...array: T[]): T {
  var rand = getRandomInt(array.length - 1);
  var rValue = array[rand];
  return rValue;
}

/**
 * 最小値と最大値の範囲内に収めた数値を返す
 * @date 5/28/2022 - 10:36:57 PM
 *
 * @export
 * @param {number} min
 * @param {number} n
 * @param {number} max
 * @returns {number}
 */
export function minMax(min: number, n: number, max: number): number {
  return Math.max(min, Math.min(n, max));
}

/**
 * 配列のシャッフル
 * @date 5/29/2022 - 12:45:29 AM
 *
 * @export
 * @template T
 * @param {...T[]} array
 * @returns {T[]}
 */
export function shuffle<T>(...array: T[]): T[] {
  const cloneArray = [...array];

  for (let i = cloneArray.length - 1; i >= 0; i--) {
    let rand = Math.floor(Math.random() * (i + 1));
    // 配列の要素の順番を入れ替える
    let tmpStorage = cloneArray[i];
    cloneArray[i] = cloneArray[rand];
    cloneArray[rand] = tmpStorage;
  }

  return cloneArray;
}
