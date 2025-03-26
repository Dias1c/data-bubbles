import type { ComponentProps } from "react";
import { Checkbox } from "../../inputs/Checkbox";
import { Typography } from "../../typography/Typography";
import styles from "./styles.module.css";

export const FieldCheckbox = ({
  label,
  checked,
  disabled,
  name,
  onChange,
}: { label: string } & Pick<
  ComponentProps<typeof Checkbox>,
  "onChange" | "checked" | "disabled" | "name"
>) => {
  return (
    <label className={styles.block}>
      <Checkbox
        disabled={disabled}
        checked={checked}
        name={name}
        onChange={onChange}
      />
      <Typography disabled={disabled}>{label}</Typography>
    </label>
  );
};
