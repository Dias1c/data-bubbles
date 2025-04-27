import type { ReactNode } from "react";
import { DividerHorizontal } from "../../dividers/DividerHorizontal";
import { Typography } from "../../typography/Typography";
import styles from "./styles.module.css";

export const BlockPartition = ({
  label,
  children,
  fullHeight,
  childrenTitleEnd,
  style,
}: {
  label: string;
  children: ReactNode;
  fullHeight?: boolean;
  childrenTitleEnd?: ReactNode;
  style?: React.CSSProperties;
}) => {
  return (
    <section
      className={`${styles.block} ${
        !!fullHeight ? styles.block_fullheight : ""
      }`}
      style={style}
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
