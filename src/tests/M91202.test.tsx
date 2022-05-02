import {
  act,
  render,
  RenderResult,
  screen,
  waitFor,
} from "@testing-library/react";
import { MathJaxContext } from "better-react-mathjax";
import { M91202 } from "~/core";
import userEvent from "@testing-library/user-event";

describe("M91202コンポーネント", () => {
  let renderResult: RenderResult;
  beforeEach(() => {
    // 準備処理 テスト対象Componentの描画
    renderResult = render(<M91202 message="テスト" />, {
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
          await userEvent.selectOptions(
            // Find the select element
            screen.getByRole("combobox"),
            // Find and select the Ireland option
            screen.getByRole("option", { name: "6" })
          );
          const submit = screen.getByText("次の問題");
          await userEvent.click(submit);
        });
      }
    }, 20000);
  });
});
