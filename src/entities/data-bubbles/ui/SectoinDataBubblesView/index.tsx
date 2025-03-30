import { ConditionalSubheader } from "@/shared/components/headers/ConditionalSubheader";
import type { useDataBubbles } from "../../hooks";
import { CanvasDataBubbles } from "../CanvasDataBubbles";
import { ConditionalBubblesStatesControllers } from "../ConditionalBubblesStatesControllers";
import styles from "./styles.module.css";

export const SectoinDataBubblesView = ({
  activeData,
  getData,
  setData,
  hidden,
  drawerRef,
  setCanvas,
  colors,
}: { hidden?: boolean } & ReturnType<typeof useDataBubbles>) => {
  return (
    <section
      className={`${styles.section} ${hidden ? styles.section_hidden : ""}`}
    >
      <ConditionalSubheader
        title={activeData.title}
        subtitle={activeData.stateCurrent.title}
      />
      <CanvasDataBubbles
        drawerRef={drawerRef}
        setCanvas={setCanvas}
        colors={colors}
      />
      <ConditionalBubblesStatesControllers
        activeData={activeData}
        getData={getData}
        setData={setData}
      />
    </section>
  );
};
