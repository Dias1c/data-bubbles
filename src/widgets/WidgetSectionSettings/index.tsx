import { DrawerDataBubbles, useDrawerDataBubbles } from "@/entities/drawer";
import { BlockPartition } from "@/shared/components/blocks/BlockPartition";
import { Button } from "@/shared/components/buttons/Button";
import { FieldCheckbox } from "@/shared/components/input_fields/FieldCheckbox";
import { useStateMemorized } from "@/shared/hooks/useStateMemorized";
import styles from "./styles.module.css";
import { BlockLiveView } from "./ui/BlockLiveView";

export const WidgetSectionSettings = ({
  drawer,
}: {
  drawer: DrawerDataBubbles;
}) => {
  const [view, setView] = useStateMemorized({
    defaultValue: true,
    name: "tabs:settings:live_view",
    expiration: { days: 30 },
  });

  const dataBubbles = useDrawerDataBubbles();

  return (
    <section className={styles.section}>
      {view && <BlockLiveView {...dataBubbles} />}
      <section
        className={styles.section_controllers}
        style={{
          width: view ? undefined : "100%",
        }}
      >
        <div className={styles.section_controllers_system}>
          <FieldCheckbox
            label="Live view"
            checked={view}
            onChange={(e) => setView(e.target.checked)}
          />
          <div className={styles.section_controllers_system_buttons}>
            <Button variant="outlined" loading>
              TODO:Export JSON
            </Button>
            <Button variant="outlined">TODO:Import JSON</Button>
          </div>
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
