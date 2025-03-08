import type { DrawerDataBubbles } from "@/entities/drawer";
import { BlockPartition } from "@/shared/components/blocks/BlockPartition";
import styles from "./styles.module.css";
import { BoxDrawerImageDownload } from "./ui/BoxDrawerImageDownload";

const maxWidth = "420px";

export const WidgetSectionShare = ({
  drawer,
}: {
  drawer: DrawerDataBubbles;
}) => {
  return (
    <section className={styles.section}>
      <BlockPartition label="Download Image" maxWidth={maxWidth}>
        <BoxDrawerImageDownload drawer={drawer} mimeType={"image/png"} />
      </BlockPartition>
      <BlockPartition label="Share" maxWidth={maxWidth}>
        TODO
      </BlockPartition>
    </section>
  );
};
