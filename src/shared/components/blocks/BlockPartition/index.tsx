import type { ReactNode } from "react";
import { DividerHorizontal } from "../../dividers/DividerHorizontal";
import { Typography } from "../../typography/Typography";
import styles from "./styles.module.css";

export const BlockPartition = ({
  label,
  children,
  maxWidth,
  fullHeight,
  childrenTitleEnd,
}: {
  label: string;
  children: ReactNode;
  maxWidth?: string;
  fullHeight?: boolean;
  childrenTitleEnd?: ReactNode;
}) => {
  return (
    <section
      className={`${styles.block} ${
        !!fullHeight ? styles.block_fullheight : ""
      }`}
      style={{ maxWidth: maxWidth }}
    >
      <div className={styles.block__label__block}>
        <Typography variant="h3">{label}</Typography>
        {childrenTitleEnd}
      </div>
      <DividerHorizontal />
      {children}
    </section>
  );
};
