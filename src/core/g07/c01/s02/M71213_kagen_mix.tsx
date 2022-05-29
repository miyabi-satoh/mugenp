import { MugenP, GeneratorFunc } from "~/components/mugenp";
import { randArray } from "~/utils";
import { genpou_kihon, kahou_kihon } from ".";

// "id": "71213",
// "module": "kagen_mix",
// "grade": "中1",
// "chapter": "正の数・負の数",
// "section": "正の数・負の数の計算",
// "subsection": "正の数・負の数の加法，減法",
// "title": "加法・減法ミックス",
// "message": "次の計算をしなさい。"
export const M71213 = () => {
  return <MugenP generator={generatorFunc} />;
};

// 加法・減法ミックス
const generatorFunc: GeneratorFunc = (level) => {
  return randArray(kahou_kihon, genpou_kihon)(level);
};
