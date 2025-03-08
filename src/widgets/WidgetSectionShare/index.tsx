import type { DrawerDataBubbles } from "@/entities/drawer";
import { BlockPartition } from "@/shared/components/blocks/BlockPartition";
import styles from "./styles.module.css";
import { BoxDrawerImageDownload } from "./ui/BoxDrawerImageDownload";

export const WidgetSectionShare = ({
  drawer,
}: {
  drawer: DrawerDataBubbles;
}) => {
  return (
    <section className={styles.section}>
      <BlockPartition label="Download Image">
        <BoxDrawerImageDownload drawer={drawer} mimeType={"image/png"} />
      </BlockPartition>
      <BlockPartition label="Share">TODO</BlockPartition>
    </section>
  );
};
