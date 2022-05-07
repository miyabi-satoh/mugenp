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
