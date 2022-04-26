import { MugenContainer } from "~/components/container";
import { poly_mono_div } from "~/core/09/01/01/poly_mono_div";
const Mugen = () => {
  return (
    <MugenContainer title="次の計算をしなさい。" onRefresh={poly_mono_div} />
  );
};

export default Mugen;
