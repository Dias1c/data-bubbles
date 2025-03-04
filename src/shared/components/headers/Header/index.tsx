import img_github from "../../../assets/logotypes/github.com-long-white.svg";
import styles from "./styles.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__logo_block} title="Author: Dias1c">
        <h2 className={styles.header__logo_text}>🫧 Data Bubbles</h2>
      </div>
      <div></div>
      <div className={styles.header__social}>
        <a href="https://github.com/Dias1c/data-bubbles" target="_blank" rel="">
          <img src={img_github.src} height="20px" alt="logo github" />
        </a>
      </div>
    </header>
  );
};
