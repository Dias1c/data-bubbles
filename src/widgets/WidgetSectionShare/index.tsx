import type { DrawerDataBubbles, IData } from "@/entities/data-bubbles";
import { BlockPartition } from "@/shared/components/blocks/BlockPartition";
import { FieldCheckbox } from "@/shared/components/input_fields/FieldCheckbox";
import { type ITabsElement } from "@/shared/components/tabs/Tabs";
import { Typography } from "@/shared/components/typography/Typography";
import { useMemo } from "react";
import { useAppShareUrl } from "./hooks/useAppShareUrl";
import styles from "./styles.module.css";
import { BoxDrawerImageDownload } from "./ui/BoxDrawerImageDownload";
import { BlockShareLink } from "./ui/BlockShareLink";

const maxWidth = "420px";

export const WidgetSectionShare = ({
  drawer,
  getData,
  tabs,
}: {
  drawer: DrawerDataBubbles;
  getData: () => IData;
  tabs: ITabsElement<string>[];
}) => {
  const { setHiddenTabs, hiddenTabs, href } = useAppShareUrl({
    data: getData(),
    tabs,
  });

  const visibleTabs = useMemo(() => {
    return tabs.filter((t) => !t.hidden);
  }, [JSON.stringify(tabs)]);

  return (
    <section className={styles.section}>
      <BlockPartition label="Download Image" maxWidth={maxWidth}>
        <BoxDrawerImageDownload drawer={drawer} mimeType={"image/png"} />
      </BlockPartition>
      {!!visibleTabs.length && (
        <BlockPartition label="Settings" maxWidth={maxWidth}>
          <Typography>Available Tabs</Typography>
          {visibleTabs.map((t) => {
            return (
              <FieldCheckbox
                key={t.value}
                label={t.label}
                checked={!hiddenTabs[t.value]}
                disabled={t.disabled}
                onChange={(e) => {
                  if (t.disabled) return;
                  setHiddenTabs((prev) => {
                    return { ...prev, [t.value]: !e.target.checked };
                  });
                }}
              />
            );
          })}
        </BlockPartition>
      )}
      <BlockPartition label="Share" maxWidth={maxWidth}>
        <BlockShareLink value={href} />
        {/* <Typography>QR</Typography>
        <Typography>Iframe</Typography> */}
      </BlockPartition>
    </section>
  );
};
