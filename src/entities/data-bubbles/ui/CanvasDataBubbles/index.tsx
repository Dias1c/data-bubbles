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
      drawer.calculateAndSetBubblesTargetRadius();
      drawer.draw();
    };
    fitCanvasSize();

    const resizeObserver = new ResizeObserver(() => {
      fitCanvasSize();
    });
    resizeObserver.observe(drawer.canvas);
    return () => {
      resizeObserver.unobserve(drawer.canvas);
    };
  }, []);

  return (
    <section
      style={{
        flex: 1,
        height: "100%",
        overflow: "auto",
      }}
    >
      <canvas
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
        ref={(ref) => {
          if (ref) setCanvas(ref);
        }}
      >
        Canvas is not supporting in your browser
      </canvas>
    </section>
  );
};
