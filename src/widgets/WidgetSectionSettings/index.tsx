import {
  DrawerDataBubbles,
  useDataBubbles,
  type IData,
} from "@/entities/data-bubbles";
import { BlockPartition } from "@/shared/components/blocks/BlockPartition";
import { Button } from "@/shared/components/buttons/Button";
import { FieldCheckbox } from "@/shared/components/input_fields/FieldCheckbox";
import { useStateMemorized } from "@/shared/hooks/useStateMemorized";
import { useMemo } from "react";
import styles from "./styles.module.css";
import { BlockLivePreview } from "./ui/BlockLivePreview";

export const WidgetSectionSettings = ({
  drawer,
  defaultData,
}: {
  drawer: DrawerDataBubbles;
  defaultData: IData;
}) => {
  const [view, setView] = useStateMemorized({
    defaultValue: true,
    name: "tabs:settings:preview",
    expiration: { days: 30 },
  });

  const dataBubbles = useDataBubbles({
    defaultValue: defaultData,
  });

  const defaultDataText = useMemo(() => {
    return JSON.stringify(defaultData, undefined, "  ");
  }, [defaultData]);

  return (
    <section className={styles.section}>
      {view && (
        <BlockLivePreview
          title={dataBubbles.activeData.title}
          subtitle={dataBubbles.activeData.state?.title}
          setCanvas={dataBubbles.setCanvas}
          drawerRef={dataBubbles.drawerRef}
        />
      )}
      <section
        className={styles.section_controllers}
        style={{
          width: view ? undefined : "100%",
        }}
      >
        <div className={styles.section_controllers_system}>
          <FieldCheckbox
            label="Live Preview"
            checked={view}
            onChange={(e) => setView(e.target.checked)}
          />
          <div className={styles.section_controllers_system_buttons}>
            <Button variant="outlined">TODO:Export JSON</Button>
            <Button variant="outlined">TODO:Import JSON</Button>
          </div>
        </div>
        <BlockPartition label="Settings">
          <a href="https://github.com/Dias1c/data-bubbles" target="_blank">
            Documentation
          </a>
          <textarea defaultValue={defaultDataText}></textarea>
        </BlockPartition>
      </section>
    </section>
  );
};
