import {
  CanvasDataBubbles,
  type useDrawerDataBubbles,
} from "@/entities/drawer";
import { Subheader } from "@/shared/components/headers/Subheader";
import { useEffect } from "react";
import styles from "./styles.module.css";

export const BlockLivePreview = (
  dataBubbles: ReturnType<typeof useDrawerDataBubbles>
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
      <Subheader title="TODO" subtitle="TODO" />
      <CanvasDataBubbles {...dataBubbles} />
    </section>
  );
};
