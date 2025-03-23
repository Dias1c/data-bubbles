import { Button } from "@/shared/components/buttons/Button";
import { InputNumber } from "@/shared/components/inputs/InputNumber";
import { RangeSlider } from "@/shared/components/inputs/RangeSlider";
import { useCallback } from "react";
import type { useDataBubblesValue } from "../../hooks";

import styles from "./styles.module.css";

export const ConditionalBubblesStatesControllers = ({
  activeData,
  getData,
  setData,
}: ReturnType<typeof useDataBubblesValue>) => {
  const value = activeData.stateIndex + 1;
  const min = 1;
  const max = activeData.stateLength;

  const setValue = useCallback(
    (v: number) => {
      const data = getData();
      setData({ ...data, state_index: v - 1 });
    },
    [getData, setData]
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = Number(e.target.value);
      if (isNaN(v) || v < min || v > max) return;
      setValue(v);
    },
    [setValue]
  );

  const onClickPrev = useCallback(() => {
    setValue(value - 1);
  }, [setValue, value]);

  const onClickNext = useCallback(() => {
    setValue(value + 1);
  }, [setValue, value]);

  if (max < 2) return;
  return (
    <section className={styles.section}>
      <Button disabled={value <= 1} onClick={onClickPrev}>
        ⬅️
      </Button>
      <RangeSlider
        min={min}
        max={max}
        onChange={onChange}
        value={value}
        fullWidth
        disabled={1 >= max}
      />
      <InputNumber
        min={min}
        max={max}
        onChange={onChange}
        value={value}
        disabled={1 >= max}
      />
      <Button disabled={value >= max} onClick={onClickNext}>
        ➡️
      </Button>
    </section>
  );
};
