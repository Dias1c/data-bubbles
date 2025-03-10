import { DividerVertical } from "@/shared/components/dividers/DividerVertical";
import type { ReactNode } from "react";
import styles from "./styles.module.css";

export const Subheader = ({
  title,
  subtitle,
  childrenEnd,
}: {
  title?: string;
  subtitle?: string;
  childrenEnd?: ReactNode;
}) => {
  if (!title && !subtitle) return;
  return (
    <header className={styles.subheader}>
      <div className={styles.subheader__labels}>
        {!!title && (
          <h1 className={styles.title} title={title}>
            {title}
          </h1>
        )}
        {!!title && !!subtitle && <DividerVertical />}
        {!!subtitle && (
          <h2 className={styles.subtitle} title={subtitle}>
            {subtitle}
          </h2>
        )}
      </div>
      {childrenEnd}
    </header>
  );
};
