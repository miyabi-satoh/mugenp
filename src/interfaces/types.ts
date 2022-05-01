export type Page = {
  id: string;
  module: string;
  title: string;
  grade: string;
  chapter: string;
  message: string;
};

export type RefreshFunction = (score: number) => [string, string];

export type ParameterCondition = {
  max: number; // 整数の最大値
  maxD: number; // 分母の最大値
  maxN: number; // 分子の最大値
  allowNegative: boolean; // 負の数を許可
  allowZero: boolean; // 0を許可
};
