import { MugenContainer } from "~/components/container";
import { heihou_kousiki } from "~/core/09/01/02/heihou_kousiki";
import { waseki_no_kousiki } from "~/core/09/01/02/waseki_no_kousiki";
import { wa_to_sa_no_seki } from "~/core/09/01/02/wa_to_sa_no_seki";
import { RefreshFunction } from "~/interfaces/types";
import { ifUnder } from "~/utils";

const Mugen = () => {
  const handleRefresh: RefreshFunction = (score) => {
    if (ifUnder(33, true, false)) {
      return waseki_no_kousiki(score);
    }
    if (ifUnder(33, true, false)) {
      return heihou_kousiki(score);
    }
    return wa_to_sa_no_seki(score);
  };

  return (
    <MugenContainer title="次の式を展開しなさい。" onRefresh={handleRefresh} />
  );
};

export default Mugen;
