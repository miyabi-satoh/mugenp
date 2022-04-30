import { MugenContainer } from "~/components/container";
import { RefreshFunction } from "~/interfaces/types";
import { drawLots } from "~/utils";
import { heihou_kousiki } from "./heihou_kousiki";
import { waseki_no_kousiki } from "./waseki_no_kousiki";
import { wa_to_sa_no_seki } from "./wa_to_sa_no_seki";

// "id": "91204",
// "module": "jyouhou_kousiki",
// "grade": "中3",
// "chapter": "式の展開と因数分解",
// "title": "乗法公式まとめ",
// "message": "次の式を展開しなさい。"
type Props = {
  message: string;
};
const Mugen = ({ message }: Props) => {
  return <MugenContainer message={message} onRefresh={onRefresh} />;
};

export { Mugen as M91204 };

const onRefresh: RefreshFunction = (score) => {
  return drawLots(
    33,
    heihou_kousiki,
    wa_to_sa_no_seki,
    waseki_no_kousiki
  )(score);
};
