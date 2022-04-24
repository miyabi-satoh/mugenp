import { MugenContainer } from "~/components/container";
import { heihou_kousiki } from "~/core/09/01/heihou_kousiki";

const Mugen = () => {
  return (
    <MugenContainer title="次の式を展開しなさい。" onRefresh={heihou_kousiki} />
  );
};

export default Mugen;
