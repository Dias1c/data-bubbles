import { useMemo, useRef } from "react";
import {
  getDrawerDataBubblesDefaultColors,
  type DrawerDataBubbles,
} from "../../lib";

export const useDrawerDataBubblesColors = ({
  defaultColorBackground,
  defaultColorBubbleText,
  drawerRef,
}: {
  defaultColorBackground?: string;
  defaultColorBubbleText?: string;
  drawerRef: ReturnType<typeof useRef<DrawerDataBubbles | null>>;
}) => {
  const defaultColors = useMemo(() => {
    return getDrawerDataBubblesDefaultColors();
  }, []);

  const colorBackground = useMemoColor({
    defaultValue: defaultColorBackground ?? defaultColors.background,
    onSetValue: (v) => drawerRef.current?.setColorBackground(v),
  });

  const colorBubbleText = useMemoColor({
    defaultValue: defaultColorBubbleText ?? defaultColors.bubbleText,
    onSetValue: (v) => drawerRef.current?.setColorBubbleText(v),
  });

  const colors = useMemo(() => {
    return {
      colorBackground,
      colorBubbleText,
    };
  }, [colorBackground, colorBubbleText]);

  return colors;
};

type TFuncSetValue = (v: string) => void;

const useMemoColor = ({
  defaultValue,
  onSetValue,
}: {
  defaultValue: string;
  onSetValue?: TFuncSetValue;
}) => {
  const memorized = useMemo(() => {
    let value = defaultValue;

    const setValue = (v: string, callback?: TFuncSetValue) => {
      value = v;
      callback?.(v);
    };

    return {
      getValue: () => value,
      setValue,
      reset: (callback?: TFuncSetValue) => setValue(defaultValue, callback),
    };
  }, []);

  return {
    ...memorized,
    setValue: (v: string) => memorized.setValue(v, onSetValue),
    reset: () => memorized.reset(onSetValue),
  };
};
