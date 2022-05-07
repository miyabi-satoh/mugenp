import { MugenContainer } from "~/components/container";
import { RefreshFunction } from "~/interfaces/types";
import { randArray } from "~/utils";
import { genpou_kihon } from "./genpou_kihon";
import { kahou_kihon } from "./kahou_kihon";

// "id": "71213",
// "module": "kagen_mix",
// "grade": "中1",
// "chapter": "正の数・負の数",
// "section": "正の数・負の数の計算",
// "subsection": "正の数・負の数の加法，減法",
// "title": "加法・減法ミックス",
// "message": "次の計算をしなさい。"
const Mugen = () => {
  return <MugenContainer onRefresh={handleRefresh} />;
};

export { Mugen as M71213 };

// 減法の基本
const handleRefresh: RefreshFunction = (level, score) => {
  return randArray(kahou_kihon, genpou_kihon)(level, score);
};
