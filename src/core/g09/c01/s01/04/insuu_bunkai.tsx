import { MugenContainer } from "~/components/container";
import { RefreshFunction } from "~/interfaces/types";
import { randArray } from "~/utils";
import { heihou_bunkai } from "./heihou_bunkai";
import { kyoutuu_bunkai } from "./kyoutuu_bunkai";
import { waseki_no_bunkai } from "./waseki_no_bunkai";
import { wa_to_sa_no_bunkai } from "./wa_to_sa_no_bunkai";

// "id": "91145",
// "module": "insuu_bunkai",
// "grade": "中3",
// "chapter": "式の展開と因数分解",
// "title": "因数分解まとめ",
// "message": "次の式を因数分解しなさい。"
type Props = {
  title: string;
  message: string;
};
const Mugen = ({ title, message }: Props) => {
  return (
    <MugenContainer
      maxLv={7}
      title={title}
      message={message}
      onRefresh={handleRefresh}
    />
  );
};

export { Mugen as M91145 };

const handleRefresh: RefreshFunction = (level, score) => {
  return randArray(
    kyoutuu_bunkai,
    wa_to_sa_no_bunkai,
    heihou_bunkai,
    waseki_no_bunkai
  )(level, score);
};
