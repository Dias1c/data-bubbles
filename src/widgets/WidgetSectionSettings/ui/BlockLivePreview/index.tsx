import {
  SectoinDataBubblesView,
  useDataBubbles,
} from "@/entities/data-bubbles";
import { useEffect } from "react";
import styles from "./styles.module.css";

export const BlockLivePreview = (
  dataBubbles: ReturnType<typeof useDataBubbles>
) => {
  useEffect(() => {
    const drawer = dataBubbles.drawerRef.current;
    if (!drawer) return;
    const { stateCurrent, statePrev } = dataBubbles.activeData;
    drawer.setData(stateCurrent.bubbles ?? [], statePrev.bubbles ?? []);
    drawer.startAnimation();
    return () => {
      drawer.stopAnimation();
    };
  }, []);

  return (
    <section className={styles.section_canvas}>
      <SectoinDataBubblesView {...dataBubbles} />
    </section>
  );
};
