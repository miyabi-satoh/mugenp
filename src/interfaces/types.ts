export type Page = {
  id: string;
  title: string;
  grade: string;
  chapter: string;
};

export type RefreshFunction = (score: number) => [string, string];
