import { ConditionalSubheader } from "@/shared/components/headers/ConditionalSubheader";
import type { useDataBubbles } from "../../hooks";
import { ConditionalBubblesStatesControllers } from "../ConditionalBubblesStatesControllers";
import { CanvasDataBubbles } from "../CanvasDataBubbles";
import styles from "./styles.module.css";

export const SectoinDataBubblesView = ({
  activeData,
  getData,
  setData,
  hidden,
  drawerRef,
  setCanvas,
}: { hidden?: boolean } & ReturnType<typeof useDataBubbles>) => {
  return (
    <section
      className={`${styles.section} ${hidden ? styles.section_hidden : ""}`}
    >
      <ConditionalSubheader
        title={activeData.title}
        subtitle={activeData.stateCurrent.title}
      />
      <CanvasDataBubbles drawerRef={drawerRef} setCanvas={setCanvas} />
      <ConditionalBubblesStatesControllers
        activeData={activeData}
        getData={getData}
        setData={setData}
      />
    </section>
  );
};
