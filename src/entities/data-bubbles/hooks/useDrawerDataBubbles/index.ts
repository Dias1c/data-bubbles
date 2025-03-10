import { useRef } from "react";
import { DrawerDataBubbles } from "../../lib";

export const useDrawerDataBubbles = () => {
  const drawerRef = useRef<DrawerDataBubbles | null>(null);

  const setCanvas = (canvas: HTMLCanvasElement) => {
    if (!drawerRef.current) {
      const scale = window?.devicePixelRatio ?? 1;

      drawerRef.current = new DrawerDataBubbles({ canvas, scale });
      return;
    }

    drawerRef.current.canvas = canvas;
  };

  return { setCanvas, drawerRef };
};
