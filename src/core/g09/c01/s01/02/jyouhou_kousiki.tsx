import { MugenContainer } from "~/components/container";
import { RefreshFunction } from "~/interfaces/types";
import { randArray } from "~/utils";
import { heihou_kousiki } from "./heihou_kousiki";
import { waseki_no_kousiki } from "./waseki_no_kousiki";
import { wa_to_sa_no_seki } from "./wa_to_sa_no_seki";

// "id": "91124",
// "module": "jyouhou_kousiki",
// "grade": "中3",
// "chapter": "式の展開と因数分解",
// "title": "乗法公式まとめ",
// "message": "次の式を展開しなさい。"
type Props = {
  message: string;
};
const Mugen = ({ message }: Props) => {
  return (
    <MugenContainer maxLv={7} message={message} onRefresh={handleRefresh} />
  );
};

export { Mugen as M91124 };

const handleRefresh: RefreshFunction = (level, score) => {
  return randArray(
    heihou_kousiki,
    wa_to_sa_no_seki,
    waseki_no_kousiki
  )(level, score);
};
