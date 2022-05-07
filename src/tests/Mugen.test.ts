/**
 * @jest-environment puppeteer
 */
import "expect-puppeteer";
import puppeteer from "puppeteer";
import { readFileSync } from "fs";
import { join } from "path";
import { Page as PageJson } from "~/interfaces/types";

// let pages: PageJson[];
let browser: puppeteer.Browser;
let page: puppeteer.Page;
const timeout = 1000 * 60 * 2;
const score = "4";

// JSON ファイルを読み込む
const jsonPath = join(process.cwd(), "src", "json", "pages.json");
const jsonText = readFileSync(jsonPath, "utf-8");
const json = JSON.parse(jsonText) as PageJson[];
const testParams = [...json.map((x) => [x.id])];

// スクリーンショットの保存先
const ssDir = join(process.cwd(), "src", "tests", "screenshots");

describe("スクリーンショット", () => {
  // ユニットテスト起動
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.setViewport({
      width: 768,
      height: 685,
    });
  }, timeout);

  // テスト終了後ブラウザを終了させる
  afterAll(async () => {
    await page.close();
    await browser.close();
  });

  test.each(testParams)(
    "Page %s",
    async (id) => {
      await page.goto(`http://localhost:3001/${id}`);
      expect(page.url()).toBe(`http://localhost:3001/${id}`);
      const text = await page.evaluate(() => document.body.textContent);
      expect(text).not.toContain("スコア");
      for (let i = 0; i < 10; i++) {
        await page.click("#toggle-answer");
        await page.screenshot({
          path: join(ssDir, `${id}_${i}.png`),
        });
        // await page.waitForTimeout(500);
        await page.select("#select-score", score);
        // await page.waitForTimeout(200);
        await page.click("#button-next");
        // await page.waitForTimeout(200);
      }
    },
    timeout
  );
});
