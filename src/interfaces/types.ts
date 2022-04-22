export type IdName = {
  id: string;
  name: string;
};

type Section = IdName & {
  format?: string;
};
export type Chapter = IdName & {
  sections?: Section[];
};
export type Unit = IdName & {
  chapters?: Chapter[];
};
