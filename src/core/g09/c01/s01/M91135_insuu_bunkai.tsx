import { MugenContainer } from "~/components/container";
import { RefreshFunction } from "~/interfaces/types";
import { randArray } from "~/utils";
import {
  heihou_bunkai,
  kyoutuu_bunkai,
  waseki_no_bunkai,
  wa_to_sa_no_bunkai,
} from ".";

// "id": "91135",
// "module": "insuu_bunkai",
// "grade": "中3",
// "chapter": "式の展開と因数分解",
// "title": "因数分解まとめ",
// "message": "次の式を因数分解しなさい。"
const Mugen = () => {
  return <MugenContainer maxLv={7} onRefresh={handleRefresh} />;
};

export { Mugen as M91135 };

const handleRefresh: RefreshFunction = (level, score) => {
  return randArray(
    kyoutuu_bunkai,
    wa_to_sa_no_bunkai,
    heihou_bunkai,
    waseki_no_bunkai
  )(level, score);
};
