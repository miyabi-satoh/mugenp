import { join } from "node:path";
import { IndexPage, PageProps } from "./index-page";
import { readFileSync } from "node:fs";

export default function Page() {
  // JSON ファイルを読み込む
  const jsonPath = join(process.cwd(), "src", "json", "pages.json");
  const jsonText = readFileSync(jsonPath, "utf-8");
  const pages = JSON.parse(jsonText) as PageProps["pages"];

  return <IndexPage pages={pages} />;
}
