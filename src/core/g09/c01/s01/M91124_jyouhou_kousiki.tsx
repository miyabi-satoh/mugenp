import { MugenContainer } from "~/components/container";
import { RefreshFunction } from "~/interfaces/types";
import { randArray } from "~/utils";
import { heihou_kousiki, waseki_no_kousiki, wa_to_sa_no_seki } from ".";

// "id": "91124",
// "module": "jyouhou_kousiki",
// "grade": "中3",
// "chapter": "式の展開と因数分解",
// "title": "乗法公式まとめ",
// "message": "次の式を展開しなさい。"
const Mugen = () => {
  return <MugenContainer maxLv={7} onRefresh={handleRefresh} />;
};

export { Mugen as M91124 };

const handleRefresh: RefreshFunction = (level, score) => {
  return randArray(
    heihou_kousiki,
    wa_to_sa_no_seki,
    waseki_no_kousiki
  )(level, score);
};