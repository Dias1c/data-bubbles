import {
  CanvasDataBubbles,
  type useDrawerDataBubbles,
} from "@/entities/data-bubbles";
import { Subheader } from "@/shared/components/headers/Subheader";
import { useEffect } from "react";
import styles from "./styles.module.css";

export const BlockLivePreview = ({
  drawerRef,
  setCanvas,
  title,
  subtitle,
}: {
  title?: string;
  subtitle?: string;
} & ReturnType<typeof useDrawerDataBubbles>) => {
  useEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer) return;
    drawer.startAnimation();
    return () => {
      drawer.stopAnimation();
    };
  }, []);

  return (
    <section className={styles.section_canvas}>
      <Subheader title={title} subtitle={subtitle} />
      <CanvasDataBubbles drawerRef={drawerRef} setCanvas={setCanvas} />
    </section>
  );
};
