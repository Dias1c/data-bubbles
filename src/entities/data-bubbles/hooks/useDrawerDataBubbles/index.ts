import { useMemo, useRef } from "react";
import { DrawerDataBubbles } from "../../lib";

export const useDrawerDataBubbles = (props?: {
  defaultColorBackground?: string;
  defaultColorText?: string;
}) => {
  const { defaultColorBackground, defaultColorText } = props ?? {};
  const drawerRef = useRef<DrawerDataBubbles | null>(null);

  const colorBackground = useMemo(() => {
    let value = getComputedStyle(document.body).getPropertyValue(
      "--color-bg-default"
    );

    if (defaultColorBackground) {
      value = defaultColorBackground;
    }

    return {
      getValue: () => value,
      setValue: (v: string) => {
        value = v;
        drawerRef.current?.setColorBackground(v);
      },
    };
  }, []);

  const colorText = useMemo(() => {
    let value = getComputedStyle(document.body).getPropertyValue(
      "--color-fg-deafult"
    );

    if (defaultColorText) {
      value = defaultColorText;
    }

    return {
      getValue: () => value,
      setValue: (v: string) => {
        value = v;
        drawerRef.current?.setColorText(v);
      },
    };
  }, []);

  const setCanvas = (canvas: HTMLCanvasElement) => {
    if (!drawerRef.current) {
      const scale = window?.devicePixelRatio ?? 1;

      drawerRef.current = new DrawerDataBubbles({
        canvas,
        scale,
        colorBackground: colorBackground.getValue(),
        colorText: colorText.getValue(),
      });
      return;
    }

    drawerRef.current.canvas = canvas;
  };

  return { setCanvas, drawerRef, colorBackground, colorText };
};
