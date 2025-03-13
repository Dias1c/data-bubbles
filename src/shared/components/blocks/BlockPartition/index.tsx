import type { ReactNode } from "react";
import { DividerHorizontal } from "../../dividers/DividerHorizontal";
import { Typography } from "../../typography/Typography";
import styles from "./styles.module.css";

export const BlockPartition = ({
  label,
  children,
  maxWidth,
  fullHeight,
}: {
  label: string;
  children: ReactNode;
  maxWidth?: string;
  fullHeight?: boolean;
}) => {
  return (
    <section
      className={`${styles.block} ${
        !!fullHeight ? styles.block_fullheight : ""
      }`}
      style={{ maxWidth: maxWidth }}
    >
      <Typography variant="h3">{label}</Typography>
      <DividerHorizontal />
      {children}
    </section>
  );
};
