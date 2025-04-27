import type { DrawerDataBubbles, IData } from "@/entities/data-bubbles";
import { BlockPartition } from "@/shared/components/blocks/BlockPartition";
import { Button } from "@/shared/components/buttons/Button";
import { ErrorBoundary } from "@/shared/components/error/ErrorBoundary";
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
      <BlockPartition
        label="Download Image"
        style={{
          flex: 1,
          flexBasis: "180px",
          maxWidth,
        }}
      >
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

      <BlockPartition
        label="Share"
        style={{
          flex: 1,
          flexBasis: "200px",
          maxWidth,
        }}
      >
        {href.length > 4096 && (
          <span
            style={{
              fontSize: "14px",
              color: "orange",
            }}
          >
            Caution: Most likely the links will not work, since most browsers
            have a limit on the URL
          </span>
        )}
        <BlockShareLink value={href} />
        <ErrorBoundary
          renderOnError={() => <Typography disabled>QR unavailable</Typography>}
        >
          <BlockShareQrCode value={href} />
        </ErrorBoundary>
        <BlockShareIframe value={href} />
      </BlockPartition>

      {!!visibleTabs.length && (
        <BlockPartition
          label="Settings"
          style={{
            flex: 1,
            flexBasis: "120px",
            maxWidth,
          }}
        >
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
