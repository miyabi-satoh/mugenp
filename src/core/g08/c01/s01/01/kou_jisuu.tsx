import { MugenContainer } from "~/components/container";
import { RefreshFunction } from "~/interfaces/types";
import { dsp, getRandomInt, minMax, randArray } from "~/utils";
import { Monomial } from "~/utils/monomial";
import { Polynomial } from "~/utils/polynomial";

// "id": "81111",
// "module": "kou_jisuu",
// "grade": "中2",
// "chapter": "式の計算",
// "section": "式の計算",
// "subsection": "式の加法，減法",
// "title": "単項式・多項式・次数",
// "message": "次の式が単項式ならば次数を、多項式ならば項と次数を答えなさい。"
const Mugen = () => {
  return <MugenContainer onRefresh={handleRefresh} />;
};

export { Mugen as M81111 };

// 単項式・多項式・次数
const handleRefresh: RefreshFunction = (level, score) => {};
