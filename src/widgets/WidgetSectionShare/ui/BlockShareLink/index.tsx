import { Button } from "@/shared/components/buttons/Button";
import { ButtonCopy } from "@/shared/components/buttons/ButtonCopy";
import { DividerVertical } from "@/shared/components/dividers/DividerVertical";
import { Typography } from "@/shared/components/typography/Typography";
import styles from "./styles.module.css";

export const BlockShareLink = ({ value }: { value: string }) => {
  return (
    <section className={styles.section_link}>
      <Typography>Link</Typography>
      <span className={styles.section_link__link}>{value}</span>
      <div className={styles.section_link__buttons}>
        <ButtonCopy value={value} />
        <DividerVertical />
        <a
          style={{
            color: "inherit",
            textDecoration: "none",
          }}
          href={value}
          target="_blank"
        >
          <Button>📺 Open</Button>
        </a>
      </div>
    </section>
  );
};
