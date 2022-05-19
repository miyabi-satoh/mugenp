import { MugenContainer } from "~/components/container";
import { RefreshFunction } from "~/interfaces/types";
import { dsp, getRandomInt } from "~/utils";
import { Monomial } from "~/utils/monomial";
import { Polynomial } from "~/utils/polynomial";

// "id": "81211",
// "module": "tousiki_henkei",
// "grade": "中2",
// "chapter": "式の計算",
// "section": "文字式の利用",
// "subsection": "文字式の利用",
// "title": "等式変形",
// "message": "次の等式を[　]内の文字について解きなさい。"
const Mugen = () => {
  return <MugenContainer answerPrefix="" onRefresh={handleRefresh} />;
};

export { Mugen as M81211 };

// 等式変形
const handleRefresh: RefreshFunction = (level, score) => {
  // Lv1: 左辺→右辺へ移項
  // Lv2: 左辺→右辺、右辺→左辺へそれぞれ移項
  // Lv3: 移項後、自然数で割る(約分なし)
  // Lv4: 移項後、整数で割る(約分もあり)
  // Lv5: 移項後、文字で割る(文字の約分はなし)
  // Lv6: 多項式と数の積商を含む
};
