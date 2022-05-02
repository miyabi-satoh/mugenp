import { readFileSync } from "fs";
import { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { join } from "path";
import { ComponentType } from "react";
import { Page } from "~/interfaces/types";

type PathParams = {
  pid: string;
};

type PageProps = PathParams & {
  message: string;
};

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  // JSON ファイルを読み込む
  const jsonPath = join(process.cwd(), "src", "json", "pages.json");
  const jsonText = readFileSync(jsonPath, "utf-8");
  const pages = JSON.parse(jsonText) as Page[];

  return {
    paths: pages.map((p) => ({
      params: {
        pid: p.id,
      },
    })),
    fallback: false, // 上記以外のパスでアクセスした場合は 404 ページにする
  };
};

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const { pid } = context.params as PathParams;

  // JSON ファイルを読み込む
  const jsonPath = join(process.cwd(), "src", "json", "pages.json");
  const jsonText = readFileSync(jsonPath, "utf-8");
  const pages = JSON.parse(jsonText) as Page[];

  const page = pages.find((p) => p.id === pid);
  const props: PageProps = {
    pid,
    message: page!.message,
  };

  return { props };
};

const Mugen = ({ pid, message }: PageProps) => {
  const MugenContainer = dynamic<{ message: string }>(() =>
    import("~/core").then((mod: any) => mod[`M${pid}`])
  );

  return <MugenContainer message={message} />;
};

export default Mugen;
