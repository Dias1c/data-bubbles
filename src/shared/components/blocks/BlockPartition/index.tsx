import type { ReactNode } from "react";
import { Typography } from "../../typography/Typography";
import styles from "./styles.module.css";
import { DividerHorizontal } from "../../dividers/DividerHorizontal";

export const BlockPartition = ({
  label,
  children,
  maxWidth,
}: {
  label: string;
  children: ReactNode;
  maxWidth?: string;
}) => {
  return (
    <section className={styles.block} style={{ maxWidth: maxWidth }}>
      <Typography variant="h3">{label}</Typography>
      <DividerHorizontal />
      {children}
    </section>
  );
};
