import { MugenP, GeneratorFunc } from "~/components/mugenp";
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
export const M91135 = () => {
  return <MugenP maxLv={7} generator={generatorFunc} />;
};

const generatorFunc: GeneratorFunc = (level) => {
  return randArray(
    kyoutuu_bunkai,
    wa_to_sa_no_bunkai,
    heihou_bunkai,
    waseki_no_bunkai
  )(level);
};
