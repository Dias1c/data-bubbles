import {
  CanvasDataBubbles,
  DrawerDataBubbles,
  useDrawerDataBubbles,
} from "@/entities/drawer";
import { BlockPartition } from "@/shared/components/blocks/BlockPartition";
import { Button } from "@/shared/components/buttons/Button";
import { Subheader } from "@/shared/components/headers/Subheader";
import { FieldCheckbox } from "@/shared/components/input_fields/FieldCheckbox";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export const WidgetSectionSettings = ({
  drawer,
}: {
  drawer: DrawerDataBubbles;
}) => {
  // TODO: save to localstorage
  const [view, setView] = useState(true);
  const dataBubbles = useDrawerDataBubbles();

  useEffect(() => {
    const drawer = dataBubbles.drawerRef.current;
    if (!drawer || !view) return;
    drawer.startAnimation();
    return () => {
      drawer.stopAnimation();
    };
  }, [view]);

  return (
    <section className={styles.section}>
      {view && (
        <section className={styles.section_canvas}>
          <Subheader title="TODO" subtitle="TODO" />
          <CanvasDataBubbles {...dataBubbles} />
        </section>
      )}
      <section
        className={styles.section_controllers}
        style={{
          width: view ? undefined : "100%",
        }}
      >
        <div>
          <FieldCheckbox
            label="View"
            checked={view}
            onChange={(e) => setView(e.target.checked)}
          />
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
