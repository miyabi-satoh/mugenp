import { MugenContainer } from "~/components/container";
import { waseki_no_kousiki } from "~/core/09/01/02/waseki_no_kousiki";

const Mugen = () => {
  return (
    <MugenContainer title="Now construction" onRefresh={waseki_no_kousiki} />
  );
};

export default Mugen;
