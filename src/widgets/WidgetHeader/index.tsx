import img_github from "@/shared/assets/logotypes/github.com-long-white.svg";
import styles from "./styles.module.css";

import { Tabs } from "@/shared/components/tabs/Tabs";

export const WidgetHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__logo_block} title="Author: Dias1c">
        <h2 className={styles.header__logo_text}>🫧 Data Bubbles</h2>
      </div>

      <Tabs
        values={[
          {
            label: "View",
            value: "view",
          },
          {
            label: "Share",
            value: "share",
          },
          {
            label: "Settings",
            value: "settings",
            disabled: true,
          },
        ]}
        selected="view"
      />

      <div className={styles.header__social}>
        <a href="https://github.com/Dias1c/data-bubbles" target="_blank" rel="">
          <img src={img_github.src} height="20px" alt="logo github" />
        </a>
      </div>
    </header>
  );
};
