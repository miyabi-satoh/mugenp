import { MugenContainer } from "~/components/container";
import { wa_to_sa_no_bunkai } from "~/core/09/01/04/wa_to_sa_no_bunkai";

const Mugen = () => {
  return (
    <MugenContainer
      title="次の式を因数分解しなさい。"
      onRefresh={wa_to_sa_no_bunkai}
    />
  );
};

export default Mugen;
