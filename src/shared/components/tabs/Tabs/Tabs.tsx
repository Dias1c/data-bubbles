import { Button } from "@/shared/components/buttons/Button";
import { useMemo, type ComponentProps } from "react";
import styles from "./styles.module.css";

type TTabLinePosition = "bottom" | "top";

export const Tab = ({
  label,
  disabled,
  selected,
  onClick,
  linePosition,
}: {
  label: string;
  disabled?: boolean;
  selected?: boolean;
  onClick?: ComponentProps<typeof Button>["onClick"];
  linePosition?: TTabLinePosition;
}) => {
  const className = useMemo(() => {
    let result = styles.tab;
    if (linePosition == "top") {
      result += ` ${styles.tab__variant_border_top}`;
    }
    if (selected) {
      result += ` ${styles.selected}`;
    }

    return result;
  }, [linePosition, selected]);

  return (
    <div className={className}>
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
  hidden?: boolean;
}

export const Tabs = <T extends string>({
  values,
  selected,
  onSelect,
  linePosition,
}: {
  values: ITabsElement<T>[];
  selected?: T;
  onSelect?: (props: { value: T }) => Promise<void> | void;
  linePosition?: TTabLinePosition;
}) => {
  return (
    <section className={styles.tabs}>
      {values.map((v) => {
        if (v.hidden) return;
        return (
          <Tab
            key={v.value}
            label={v.label}
            disabled={v.disabled}
            selected={selected == v.value}
            onClick={() => onSelect?.({ value: v.value })}
            linePosition={linePosition}
          />
        );
      })}
    </section>
  );
};
