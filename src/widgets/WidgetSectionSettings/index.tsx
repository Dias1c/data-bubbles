import {
  CanvasDataBubbles,
  DrawerDataBubbles,
  useDrawerDataBubbles,
} from "@/entities/drawer";
import styles from "./styles.module.css";
import { useEffect } from "react";
import { DividerVertical } from "@/shared/components/dividers/DividerVertical";
import { BlockPartition } from "@/shared/components/blocks/BlockPartition";
import { Typography } from "@/shared/components/typography/Typography";
import { Button } from "@/shared/components/buttons/Button";

export const WidgetSectionSettings = ({
  drawer,
}: {
  drawer: DrawerDataBubbles;
}) => {
  const dataBubbles = useDrawerDataBubbles();

  useEffect(() => {
    const drawer = dataBubbles.drawerRef.current;
    if (!drawer) return;
    drawer.startAnimation();
    return () => {
      drawer.stopAnimation();
    };
  }, []);

  return (
    <section className={styles.section}>
      <section className={styles.section_canvas}>
        <CanvasDataBubbles {...dataBubbles} />
      </section>
      <section className={styles.section_controllers}>
        <div>
          View
          <Button variant="outlined" loading>
            TODO:Export JSON
          </Button>
          <Button variant="outlined">TODO:Import JSON</Button>
        </div>
        <BlockPartition label="Settings">
          <a href="https://github.com/Dias1c/data-bubbles" target="_blank">
            Documentation
          </a>
          <textarea>TODO</textarea>
        </BlockPartition>
      </section>
    </section>
  );
};
