import {
  useDataBubbles,
  useDrawerDataBubbles,
  type IData,
} from "@/entities/data-bubbles";
import { CUserStore } from "@/features/user-store";
import { BlockPartition } from "@/shared/components/blocks/BlockPartition";
import { Button } from "@/shared/components/buttons/Button";
import { FieldCheckbox } from "@/shared/components/input_fields/FieldCheckbox";
import { useStateMemorized } from "@/shared/hooks/useStateMemorized";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { BlockDisplaySettings } from "./ui/BlockDisplaySettings";
import { BlockLivePreview } from "./ui/BlockLivePreview";
import { ButtonExportJson } from "./ui/ButtonExportJson";
import { ButtonImportJson } from "./ui/ButtonImportJson";

export const WidgetSectionSettings = ({
  setData,
  defaultData,
  colors,
}: {
  setData: (value: IData) => void;
  defaultData: IData;
  colors: ReturnType<typeof useDrawerDataBubbles>["colors"];
}) => {
  const [isEditModeManual, setIsEditModeManual] = useState(true);

  const [error, setError] = useState<string>();
  const [value, setValue] = useState(
    JSON.stringify(defaultData, undefined, "  ")
  );

  const [view, setView] = useStateMemorized({
    defaultValue: true,
    name: "tabs:settings:preview",
    expiration: { days: 30 },
  });

  const dataBubbles = useDataBubbles({
    defaultValue: defaultData,
    defaultColors: colors.getValues(),
  });

  useEffect(() => {
    return () => {
      setData(dataBubbles.getData());

      const oldColors = colors.getValues();
      const newColors = dataBubbles.colors.getValues();

      Object.keys(oldColors).forEach((key) => {
        const name = key as keyof ReturnType<typeof colors.getValues>;
        const prevColor = oldColors[name];
        const newColor = newColors[name];

        if (!newColor) return;
        if (prevColor == newColor) return;
        colors?.[name]?.setValue?.(newColor);
      });

      CUserStore.drawerColors.set(colors.getValues());
    };
  }, []);

  return (
    <section className={styles.section}>
      {view && <BlockLivePreview {...dataBubbles} />}
      <section
        className={styles.section_controllers}
        style={{
          width: view ? undefined : "100%",
          flex: 1,
          overflow: "auto",
          height: "100%",
        }}
      >
        <div className={styles.section_controllers_system}>
          <FieldCheckbox
            label="Live Preview"
            checked={view}
            onChange={(e) => setView(e.target.checked)}
          />
        </div>
        <BlockDisplaySettings colors={dataBubbles.colors} />
        <BlockPartition
          label="Data Settings"
          childrenTitleEnd={
            <FieldCheckbox
              label="Manual"
              checked={isEditModeManual}
              onChange={(e) => setIsEditModeManual(e.target.checked)}
            />
          }
        >
          <div className={styles.section_controllers_system_buttons}>
            <ButtonExportJson
              data={dataBubbles.getData()}
              filename={dataBubbles.getData().title ?? "data-bubbles"}
            >
              📤 Export JSON
            </ButtonExportJson>
            <ButtonImportJson onSuccess={({ json }) => setValue(json)}>
              📥 Import JSON
            </ButtonImportJson>
          </div>
          {!isEditModeManual && (
            <p>
              Working on UI/UX, please use{" "}
              <span style={{ color: "red" }}>Manual mode</span>
            </p>
          )}
          {isEditModeManual && (
            <>
              <a href="https://github.com/Dias1c/data-bubbles" target="_blank">
                📌 Documentation
              </a>
              <textarea
                className={styles.textarea}
                value={value}
                onChange={(e) => {
                  const text = e?.target?.value ?? "";
                  setValue(text);
                  try {
                    const data = JSON.parse(text);
                    dataBubbles.setData(data);
                    setError("");
                  } catch (error) {
                    if (error instanceof Error) {
                      setError(error?.message ?? "");
                    }
                  }
                }}
              ></textarea>
              {!!error && (
                <span className={styles.text_error} title={error}>
                  {error}
                </span>
              )}
              <div>
                <Button
                  disabled={!!error}
                  onClick={() => {
                    setValue((v) => {
                      return JSON.stringify(JSON.parse(v), undefined, "  ");
                    });
                  }}
                >
                  👌 Format
                </Button>
              </div>
            </>
          )}
        </BlockPartition>
      </section>
    </section>
  );
};
