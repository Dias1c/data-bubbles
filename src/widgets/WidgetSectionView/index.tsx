import {
  CanvasDataBubbles,
  useDrawerDataBubbles,
} from "@/entities/data-bubbles";
import { Subheader } from "@/shared/components/headers/Subheader";
import styles from "./styles.module.css";

export const WidgetSectoinView = ({
  title,
  subtitle,
  hidden,
  drawerRef,
  setCanvas,
}: { hidden: boolean; title?: string; subtitle?: string } & ReturnType<
  typeof useDrawerDataBubbles
>) => {
  return (
    <section
      className={`${styles.section} ${hidden ? styles.section_hidden : ""}`}
    >
      <Subheader title={title} subtitle={subtitle} />
      <CanvasDataBubbles drawerRef={drawerRef} setCanvas={setCanvas} />
    </section>
  );
};
