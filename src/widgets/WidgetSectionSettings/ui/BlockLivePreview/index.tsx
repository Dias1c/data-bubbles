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
