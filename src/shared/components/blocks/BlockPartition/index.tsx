import type { ReactNode } from "react";
import { Typography } from "../../typography/Typography";
import styles from "./styles.module.css";
import { DividerHorizontal } from "../../dividers/DividerHorizontal";

export const BlockPartition = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => {
  return (
    <section className={styles.block}>
      <Typography variant="h3">{label}</Typography>
      <DividerHorizontal />
      {children}
    </section>
  );
};
