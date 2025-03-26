import type { DrawerDataBubbles, IData } from "@/entities/data-bubbles";
import { BlockPartition } from "@/shared/components/blocks/BlockPartition";
import { Button } from "@/shared/components/buttons/Button";
import { FieldCheckbox } from "@/shared/components/input_fields/FieldCheckbox";
import { type ITabsElement } from "@/shared/components/tabs/Tabs";
import { Typography } from "@/shared/components/typography/Typography";
import { useIsTablet } from "@/shared/hooks/useIsTablet";
import { download } from "@/shared/lib/files/download";
import { useMemo } from "react";
import { useAppShareUrl } from "./hooks/useAppShareUrl";
import styles from "./styles.module.css";
import { BlockShareIframe } from "./ui/BlockShareIframe";
import { BlockShareLink } from "./ui/BlockShareLink";
import { BlockShareQrCode } from "./ui/BlockShareQrCode";
import { BoxDrawerImageDownload } from "./ui/BoxDrawerImageDownload";

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
  const isTablet = useIsTablet();

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
        {!isTablet && (
          <BoxDrawerImageDownload drawer={drawer} mimeType={"image/png"} />
        )}
        <div>
          <Button
            onClick={() => {
              const url = drawer.canvas.toDataURL("image/png");
              download({ url, name: "data-bubbles" });
            }}
          >
            📥 Download
          </Button>
        </div>
      </BlockPartition>

      <BlockPartition label="Share" maxWidth={maxWidth}>
        <BlockShareLink value={href} />
        <BlockShareQrCode value={href} />
        <BlockShareIframe value={href} />
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
    </section>
  );
};
