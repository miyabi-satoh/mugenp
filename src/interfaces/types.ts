export type Page = {
  id: string;
  module: string;
  title: string;
  grade: string;
  chapter: string;
  section: string;
  subsection: string;
  message: string;
};

export type RefreshFunction = (
  level: number,
  score: number
) => [string, string];

/**
 * 項の生成条件
 */
export type TermSpec = {
  /**
   * 文字
   */
  factors?: string;

  /**
   * 整数の最大値
   * 省略時は 1
   */
  max?: number;
  /**
   * 分母の最大値
   * 省略時は 1
   */
  maxD?: number;
  /**
   * 分子の最大値
   * 省略時は 1
   */
  maxN?: number;
  /**
   * true = 負の数を許可する
   * 省略時は false
   */
  allowNegative?: boolean;
  /**
   * true = 0を許可する
   * 省略時は false
   */
  allowZero?: boolean;
};
