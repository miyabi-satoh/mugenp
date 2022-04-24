import { MugenContainer } from "~/components/container";
import { waseki_no_kousiki } from "~/core/09/01/waseki_no_kousiki";

const Mugen = () => {
  return (
    <MugenContainer
      title="次の式を展開しなさい。"
      onRefresh={waseki_no_kousiki}
    />
  );
};

export default Mugen;
