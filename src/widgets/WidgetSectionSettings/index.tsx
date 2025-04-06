import {
  useDataBubbles,
  useDrawerDataBubbles,
  type IData,
} from "@/entities/data-bubbles";
import { CUserStore } from "@/features/user-store";
import { FieldCheckbox } from "@/shared/components/input_fields/FieldCheckbox";
import { useStateMemorized } from "@/shared/hooks/useStateMemorized";
import { useEffect } from "react";
import styles from "./styles.module.css";
import { BlockDataSettings } from "./ui/BlockDataSettings";
import { BlockDisplaySettings } from "./ui/BlockDisplaySettings";
import { BlockLivePreview } from "./ui/BlockLivePreview";

export const WidgetSectionSettings = ({
  setData,
  defaultData,
  colors,
}: {
  setData: (value: IData) => void;
  defaultData: IData;
  colors: ReturnType<typeof useDrawerDataBubbles>["colors"];
}) => {
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
        <BlockDataSettings dataBubbles={dataBubbles} />
      </section>
    </section>
  );
};
