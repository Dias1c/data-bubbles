import { useEffect, useRef } from "react";
import { DrawerDataBubbles } from "../../lib";

const data = [
  {
    label: "Alice",
    value: 500,
    src: "/favicon.png",
  },
  {
    label: "Bob",
    value: 500,
    src: "/favicon.png",
  },
  {
    label: "Carl",
    value: 500,
    src: "/favicon.png",
  },
];

const data2 = [
  {
    label: "Alice",
    value: 500,
    src: "/favicon.png",
  },
  {
    label: "Bob",
    value: 250,
    src: "/favicon.png",
  },
  {
    label: "Carl",
    value: 1000,
    src: "/favicon.png",
  },
];

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

  useEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer) return;
    drawer.data = data;
    drawer.data = data2;
  });

  return { setCanvas, drawerRef };
};
