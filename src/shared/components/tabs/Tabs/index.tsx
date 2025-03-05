import type { ComponentProps } from "react";
import { Button } from "../../buttons/Button";
import styles from "./styles.module.css";

export const Tab = ({
  label,
  disabled,
  selected,
  onClick,
}: {
  label: string;
  disabled?: boolean;
  selected?: boolean;
  onClick?: ComponentProps<typeof Button>["onClick"];
}) => {
  return (
    <div className={`${styles.tab} ${selected ? styles.selected : ""}`}>
      <Button disabled={disabled} onClick={onClick} variant="text">
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
  onSelect,
}: {
  values: ITabsElement<T>[];
  selected?: T;
  onSelect?: (props: { value: T }) => Promise<void> | void;
}) => {
  return (
    <section className={styles.tabs}>
      {values.map((v) => {
        return (
          <Tab
            label={v.label}
            disabled={v.disabled}
            selected={selected == v.value}
            onClick={() => onSelect?.({ value: v.value })}
          />
        );
      })}
    </section>
  );
};
