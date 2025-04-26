import type { ComponentProps } from "react";
import { InputCheckbox } from "../../inputs/InputCheckbox";
import { Typography } from "../../typography/Typography";
import styles from "./styles.module.css";

export const FieldCheckbox = ({
  label,
  checked,
  disabled,
  name,
  onChange,
}: { label: string } & Pick<
  ComponentProps<typeof InputCheckbox>,
  "onChange" | "checked" | "disabled" | "name"
>) => {
  return (
    <label className={styles.block}>
      <InputCheckbox
        disabled={disabled}
        checked={checked}
        name={name}
        onChange={onChange}
      />
      <Typography disabled={disabled}>{label}</Typography>
    </label>
  );
};
