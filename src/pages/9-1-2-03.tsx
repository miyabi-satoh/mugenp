import { MugenContainer } from "~/components/container";
import { wa_to_sa_no_seki } from "~/core/09/01/02/wa_to_sa_no_seki";

const Mugen = () => {
  return (
    <MugenContainer
      title="次の式を展開しなさい。"
      onRefresh={wa_to_sa_no_seki}
    />
  );
};

export default Mugen;
