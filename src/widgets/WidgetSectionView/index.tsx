import { CanvasDataBubbles, useDrawerDataBubbles } from "@/entities/drawer";
import { Subheader } from "@/shared/components/headers/Subheader";
import styles from "./styles.module.css";

export const WidgetSectoinView = ({
  hidden,
  drawerRef,
  setCanvas,
}: { hidden: boolean } & ReturnType<typeof useDrawerDataBubbles>) => {
  return (
    <section
      className={`${styles.section} ${hidden ? styles.section_hidden : ""}`}
    >
      <Subheader
        title="Sousou no Frieren"
        subtitle="Принимать вызовы — значит инвестировать в себя"
      />
      <CanvasDataBubbles drawerRef={drawerRef} setCanvas={setCanvas} />
    </section>
  );
};
