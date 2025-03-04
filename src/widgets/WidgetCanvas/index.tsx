import { useEffect, useRef } from "react";
import { DrawerDataBubbles } from "../../entities/drawer";

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

// TODO: Use Imperative Handler
export const WidgetCanvas = ({}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const scale = window?.devicePixelRatio ?? 1;

    const canvas = canvasRef.current;
    if (!(canvas instanceof HTMLCanvasElement)) {
      console.error("canvas not found");
      return;
    }
    if (!canvas.getContext) {
      console.error("canvas is not supported");
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("canvas context 2d is not supported");
      return;
    }

    const fitCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * scale;
      canvas.height = rect.height * scale;
    };
    fitCanvasSize();

    const onResize = () => {
      fitCanvasSize();
      drawer.recalculateBubbleSizes();
      drawer.draw();
    };

    const drawer = new DrawerDataBubbles({ canvas, scale });
    drawer.data = data;
    drawer.data = data2;

    const interval = setInterval(() => drawer.draw(), 1000 / 60);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);

      clearInterval(interval);
    };
  }, []);

  return (
    <canvas
      style={{
        width: "100%",
        height: "100%",
      }}
      ref={canvasRef}
    >
      Canvas is not supporting in your browser
    </canvas>
  );
};
