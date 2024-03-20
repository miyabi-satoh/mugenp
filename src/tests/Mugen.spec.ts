import { test, expect } from "@playwright/test";
import { readFileSync, readdir, unlink } from "node:fs";
import { join } from "node:path";
import { Page } from "~/interfaces/types";

// let pages: Page[];
// const timeout = 1000 * 60 * 3;
// const score = "4";

// JSON ファイルを読み込む
const jsonPath = join(process.cwd(), "src", "json", "pages.json");
const jsonText = readFileSync(jsonPath, "utf-8");
const json = JSON.parse(jsonText) as Page[];
const testParams = [...json.map((x) => [x.id])];

// スクリーンショットの保存先
const ssDir = join(process.cwd(), "src", "tests", "screenshots");

// 古いスクリーンショットを削除
readdir(ssDir, (err, files) => {
  if (err) {
    throw err;
  }
  files.forEach((file) => {
    unlink(`${ssDir}/${file}`, (err) => {
      if (err) {
        throw err;
      }
      //console.log(`deleted ${file}`);
    });
  });
});

test.describe("スクリーンショット", () => {
  // // ユニットテスト起動
  // test.beforeAll(async ({ page }) => {
  //   // browser = await puppeteer.launch({ headless: true });
  //   // page = await browser.newPage();
  //   // await page.setViewport({
  //   //   width: 768,
  //   //   height: 740,
  //   // });
  // }, timeout);

  // // テスト終了後ブラウザを終了させる
  // test.afterAll(async ({ page }) => {
  //   // await page.close();
  //   // await browser.close();
  // });

  for (const id of testParams) {
    test(`Page ${id}`, async ({ page }) => {
      await page.goto(`http://localhost:3001/${id}`);
      expect(page.url()).toBe(`http://localhost:3001/${id}`);
      // for (let i = 0; i < 10; i++) {
      //   await page.click("#toggle-answer");
      //   await page.waitForTimeout(1);
      //   await page.screenshot({
      //     fullPage: true,
      //     path: join(ssDir, `${id}_${i}.png`),
      //   });
      //   const text = await page.evaluate(() => document.body.textContent);
      //   if (text && text.includes("【Lv.Max】")) {
      //     break;
      //   }

      //   // await page.select("#select-score", score);
      //   await page.click('button[aria-haspopup="menu"]');
      //   await page.click('button[data-index="5"]');
      //   await page.click("#button-next");
      // }
    })
  }
});
