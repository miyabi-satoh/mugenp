import { MugenContainer } from "~/components/container";
import { kyoutuu_bunkai } from "~/core/09/01/04/kyoutuu_bunkai";

const Mugen = () => {
  return (
    <MugenContainer
      title="次の式を因数分解しなさい。"
      onRefresh={kyoutuu_bunkai}
    />
  );
};

export default Mugen;
