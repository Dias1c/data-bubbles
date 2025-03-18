import type { ReactNode } from "react";
import styles from "./styles.module.css";

export const Footer = ({ children }: { children?: ReactNode }) => {
  return <div className={styles.footer}>{children}</div>;
};
