import img_github from "@/shared/assets/logotypes/github.com-long-white.svg";
import styles from "./styles.module.css";

import { type ReactNode } from "react";

export const WidgetHeader = ({
  childrenCenter,
}: {
  childrenCenter?: ReactNode;
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.header__logo_block} title="Author: Dias1c">
        <h2 className={styles.header__logo_text}>🫧 Data Bubbles</h2>
      </div>

      {childrenCenter}

      <div className={styles.header__social}>
        <a href="https://github.com/Dias1c/data-bubbles" target="_blank" rel="">
          <img src={img_github.src} height="20px" alt="logo github" />
        </a>
      </div>
    </header>
  );
};
