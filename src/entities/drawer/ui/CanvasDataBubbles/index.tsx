import { useEffect } from "react";
import type { useDrawerDataBubbles } from "../../hooks";

export const CanvasDataBubbles = ({
  drawerRef,
  setCanvas,
}: ReturnType<typeof useDrawerDataBubbles>) => {
  useEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer) return;
    const canvas = drawer.canvas;

    const fitCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      drawer.setCanvasSize({ width: rect.width, height: rect.height });
    };
    fitCanvasSize();

    const onResize = () => {
      fitCanvasSize();
      drawer.recalculateBubbleSizes();
      drawer.draw();
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      style={{
        width: "100%",
        height: "100%",
      }}
      ref={(ref) => {
        if (ref) setCanvas(ref);
      }}
    >
      Canvas is not supporting in your browser
    </canvas>
  );
};
