import { getRGBfromColorString } from "@/shared/lib/colors/getRGBfromColorString";
import { useMemo, useRef } from "react";
import {
  getDrawerDataBubblesDefaultColors,
  type DrawerDataBubbles,
  type IDrawerDataBubblesColors,
} from "../../lib";

export const useDrawerDataBubblesColors = ({
  drawerRef,
  defaultColors,
}: {
  drawerRef: ReturnType<typeof useRef<DrawerDataBubbles | null>>;
  defaultColors?: IDrawerDataBubblesColors;
}) => {
  const colorsFromStore = useMemo(() => {
    return getDrawerDataBubblesDefaultColors();
  }, []);

  const background = useMemoColor({
    defaultValue: defaultColors?.background ?? colorsFromStore.background,
    onSetValue: (v) => drawerRef.current?.setColorBackground(v),
  });

  const bubbleText = useMemoColor({
    defaultValue: defaultColors?.bubbleText ?? colorsFromStore.bubbleText,
    onSetValue: (v) => drawerRef.current?.setColorBubbleText(v),
  });

  const bubbleOnValueDown = useMemoColor({
    defaultValue:
      defaultColors?.bubbleOnValueDown ?? colorsFromStore.bubbleOnValueDown,
    onSetValue: (v) => {
      drawerRef.current?.setColorBubbleOnNegativeRGB(
        getRGBfromColorString(v) ?? undefined
      );
    },
  });

  const bubbleOnValueUp = useMemoColor({
    defaultValue:
      defaultColors?.bubbleOnValueUp ?? colorsFromStore.bubbleOnValueUp,
    onSetValue: (v) => {
      drawerRef.current?.setColorBubbleOnPositiveRGB(
        getRGBfromColorString(v) ?? undefined
      );
    },
  });

  const bubbleOnNoChanges = useMemoColor({
    defaultValue:
      defaultColors?.bubbleOnNoChanges ?? colorsFromStore.bubbleOnNoChanges,
    onSetValue: (v) => {
      drawerRef.current?.setColorBubbleOnZeroRGB(
        getRGBfromColorString(v) ?? undefined
      );
    },
  });

  const colors = useMemo(() => {
    type TResult = {
      [key in keyof IDrawerDataBubblesColors]: ReturnType<typeof useMemoColor>;
    } & { getValues: () => IDrawerDataBubblesColors };

    const result: TResult = {
      background,
      bubbleText,
      bubbleOnValueDown,
      bubbleOnValueUp,
      bubbleOnNoChanges,
      getValues: () => ({
        background: background.getValue(),
        bubbleText: bubbleText.getValue(),
        bubbleOnValueDown: bubbleOnValueDown.getValue(),
        bubbleOnValueUp: bubbleOnValueUp.getValue(),
        bubbleOnNoChanges: bubbleOnNoChanges.getValue(),
      }),
    };

    return result;
  }, [
    background,
    bubbleText,
    bubbleOnValueDown,
    bubbleOnValueUp,
    bubbleOnNoChanges,
  ]);

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
