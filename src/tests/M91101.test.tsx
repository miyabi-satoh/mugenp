import { expect, test, describe, beforeEach, afterEach } from "vitest";
import { MathJaxContext } from "better-react-mathjax";
import { M91111 } from "~/core";
import {
  RenderResult,
  act,
  render,
  waitFor,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe.skip("M91101コンポーネント", () => {
  const user = userEvent.setup();

  let renderResult: RenderResult;
  beforeEach(() => {
    // 準備処理 テスト対象Componentの描画
    renderResult = render(<M91111 />, {
      wrapper: MathJaxContext,
    });
  });
  afterEach(() => {
    // テスト終了後処理 テスト対象のアンマウント
    renderResult.unmount();
  });
  describe("初期状態", () => {
    test("messageが表示されている", async () => {
      await waitFor(() => {
        expect(renderResult.getByText(/テスト/));
      });
    });
  });
  describe("正解を続ける", () => {
    test("スコアが表示されている", async () => {
      for (let i = 0; i < 50; i++) {
        const score = await renderResult.findByText(`スコア：${i}`);
        expect(score);
        // screen.debug(score);

        await act(async () => {
          await user.selectOptions(
            // Find the select element
            screen.getByRole("combobox"),
            // Find and select the Ireland option
            screen.getByRole("option", { name: "6" })
          );
          const submit = screen.getByText("次の問題");
          await user.click(submit);
        });
      }
    }, 8000);
  });
});
