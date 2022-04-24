import { MugenContainer } from "~/components/container";
import { poly_mono_mul } from "~/core/09/01/01/poly_mono_mul";

const Mugen = () => {
  return (
    <MugenContainer title="次の計算をしなさい。" onRefresh={poly_mono_mul} />
  );
};

export default Mugen;
