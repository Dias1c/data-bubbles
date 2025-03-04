import { Button } from "../../buttons/Button";
import styles from "./styles.module.css";

export const Tab = ({
  label,
  disabled,
  selected,
}: {
  label: string;
  disabled?: boolean;
  selected?: boolean;
}) => {
  return (
    <div className={`${styles.tab} ${selected ? styles.selected : ""}`}>
      <Button disabled={disabled} variant="text">
        {label}
      </Button>
    </div>
  );
};

export interface ITabsElement<T extends string> {
  label: string;
  value: T;
  disabled?: boolean;
}

export const Tabs = <T extends string>({
  values,
  selected,
}: {
  values: ITabsElement<T>[];
  selected?: T;
}) => {
  return (
    <section className={styles.tabs}>
      {values.map((v) => {
        return (
          <Tab
            label={v.label}
            disabled={v.disabled}
            selected={selected == v.value}
          />
        );
      })}
    </section>
  );
};
