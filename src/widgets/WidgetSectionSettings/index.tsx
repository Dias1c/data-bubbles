import {
  DrawerDataBubbles,
  useDataBubbles,
  type IData,
} from "@/entities/data-bubbles";
import { BlockPartition } from "@/shared/components/blocks/BlockPartition";
import { Button } from "@/shared/components/buttons/Button";
import { FieldCheckbox } from "@/shared/components/input_fields/FieldCheckbox";
import { useStateMemorized } from "@/shared/hooks/useStateMemorized";
import { useState } from "react";
import styles from "./styles.module.css";
import { BlockLivePreview } from "./ui/BlockLivePreview";
import { ButtonExportJson } from "./ui/ButtonExportJson";
import { ButtonImportJson } from "./ui/ButtonImportJson";

export const WidgetSectionSettings = ({
  drawer,
  defaultData,
}: {
  drawer: DrawerDataBubbles;
  defaultData: IData;
}) => {
  const [value, setValue] = useState(
    JSON.stringify(defaultData, undefined, "  ")
  );
  const [error, setError] = useState<string>();
  const [view, setView] = useStateMemorized({
    defaultValue: true,
    name: "tabs:settings:preview",
    expiration: { days: 30 },
  });

  const dataBubbles = useDataBubbles({
    defaultValue: defaultData,
  });

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
            <ButtonExportJson
              data={dataBubbles.data}
              filename={dataBubbles.data.title ?? "data-bubbles"}
            >
              Export JSON
            </ButtonExportJson>
            <ButtonImportJson onSuccess={({ json }) => setValue(json)}>
              Import JSON
            </ButtonImportJson>
          </div>
        </div>
        <BlockPartition label="Settings">
          <a href="https://github.com/Dias1c/data-bubbles" target="_blank">
            Documentation
          </a>
          <textarea
            className={styles.textarea}
            value={value}
            onChange={(e) => {
              const text = e?.target?.value ?? "";
              setValue(text);
              try {
                const data = JSON.parse(text);
                console.log("data", data);
                dataBubbles.setData(data);
                setError("");
              } catch (error) {
                if (error instanceof Error) {
                  setError(error?.message ?? "");
                }
              }
            }}
          ></textarea>
          {error}
          <div>
            <Button
              disabled={!!error}
              onClick={() => {
                setValue((v) => {
                  return JSON.stringify(JSON.parse(v), undefined, "  ");
                });
              }}
            >
              Format
            </Button>
          </div>
        </BlockPartition>
      </section>
    </section>
  );
};
