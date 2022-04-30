export type Page = {
  id: string;
  module: string;
  title: string;
  grade: string;
  chapter: string;
  message: string;
};

export type RefreshFunction = (score: number) => [string, string];
