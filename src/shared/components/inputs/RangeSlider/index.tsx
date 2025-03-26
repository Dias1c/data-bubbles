import { useMemo } from "react";
import styles from "./styles.module.css";

export const RangeSlider = ({
  name,
  fullWidth,
  min,
  max,
  value,
  onChange,
  disabled,
}: {
  name?: string;
  fullWidth?: boolean;
  min?: number;
  max?: number;
  value?: number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
}) => {
  const blockClassName = useMemo(() => {
    let result = styles.block__slider;
    if (fullWidth) {
      result += ` ${styles.fullwidth}`;
    }
    return result;
  }, [fullWidth]);

  const inputClassName = useMemo(() => {
    let result = styles.input;
    if (fullWidth) {
      result += ` ${styles.fullwidth}`;
    }
    return result;
  }, [fullWidth]);

  return (
    <div className={blockClassName}>
      <input
        type="range"
        name={name}
        className={inputClassName}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};
