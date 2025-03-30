import { useRef } from "react";
import { DrawerDataBubbles } from "../../lib";
import { useDrawerDataBubblesColors } from "../useDrawerDataBubblesColors";

export const useDrawerDataBubbles = (props?: {
  defaultColorBackground?: string;
  defaultColorBubbleText?: string;
}) => {
  const { defaultColorBackground, defaultColorBubbleText } = props ?? {};
  const drawerRef = useRef<DrawerDataBubbles | null>(null);

  const colors = useDrawerDataBubblesColors({
    drawerRef,
    defaultColorBackground,
    defaultColorBubbleText,
  });

  const setCanvas = (canvas: HTMLCanvasElement) => {
    if (!drawerRef.current) {
      const scale = window?.devicePixelRatio ?? 1;

      const { colorBackground, colorBubbleText } = colors;
      drawerRef.current = new DrawerDataBubbles({
        canvas,
        scale,
        colorBackground: colorBackground.getValue(),
        colorText: colorBubbleText.getValue(),
      });
      return;
    }

    drawerRef.current.canvas = canvas;
  };

  return { setCanvas, drawerRef, colors };
};
