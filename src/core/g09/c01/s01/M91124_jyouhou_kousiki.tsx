import { MugenP, GeneratorFunc } from "~/components/mugenp";
import { randArray } from "~/utils";
import { heihou_kousiki, waseki_no_kousiki, wa_to_sa_no_seki } from ".";

// "id": "91124",
// "module": "jyouhou_kousiki",
// "grade": "中3",
// "chapter": "式の展開と因数分解",
// "title": "乗法公式まとめ",
// "message": "次の式を展開しなさい。"
export const M91124 = () => {
  return <MugenP maxLv={7} generator={generatorFunc} />;
};

const generatorFunc: GeneratorFunc = (level) => {
  return randArray(heihou_kousiki, wa_to_sa_no_seki, waseki_no_kousiki)(level);
};
