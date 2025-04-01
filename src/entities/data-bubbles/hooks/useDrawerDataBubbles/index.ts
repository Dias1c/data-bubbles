import { useRef } from "react";
import { DrawerDataBubbles, type IDrawerDataBubblesColors } from "../../lib";
import { useDrawerDataBubblesColors } from "../useDrawerDataBubblesColors";

export const useDrawerDataBubbles = (props?: {
  defaultColors?: IDrawerDataBubblesColors;
}) => {
  const drawerRef = useRef<DrawerDataBubbles | null>(null);

  const colors = useDrawerDataBubblesColors({
    ...props,
    drawerRef,
  });

  const setCanvas = (canvas: HTMLCanvasElement) => {
    if (!drawerRef.current) {
      const scale = window?.devicePixelRatio ?? 1;

      drawerRef.current = new DrawerDataBubbles({
        canvas,
        scale,
        colors: colors.getValues(),
      });
      return;
    }

    drawerRef.current.canvas = canvas;
  };

  return { setCanvas, drawerRef, colors };
};
