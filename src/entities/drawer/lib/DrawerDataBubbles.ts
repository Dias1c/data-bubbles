import { DrawableDataBubble } from "./DrawableDataBubble";
import { getFunctionGetColorByDelta } from "./getFunctionGetColorByDelta";

type TDataElement = {
  src?: string;
  label: string;
  value: number;
};

type TDrawingData = {
  prevData?: TDataElement;
  currentData?: TDataElement;
  directionX: number;
  directionY: number;
  targetR: number;
  drawer: DrawableDataBubble;
};

export class DrawerDataBubbles {
  canvas: HTMLCanvasElement;
  scale: number;
  ctx: CanvasRenderingContext2D;

  dataValuesSum: number = 0;

  bublesMap: Map<string, TDrawingData> = new Map();
  _data: TDataElement[] = [];
  public get data(): TDataElement[] {
    return this._data;
  }
  public set data(v: TDataElement[]) {
    this._data = v;
    this.dataValuesSum = v.reduce((p, c) => {
      return p + c.value;
    }, 0);

    const { bublesMap, canvas, dataValuesSum } = this;

    for (const [, value] of bublesMap) {
      value.prevData = value.currentData;
      value.currentData = undefined;
    }

    // TODO: Recognize Bubbles To Delete
    const maxSize = Math.min(canvas.width, canvas.height);
    v.forEach((data) => {
      // Calculate Radius
      const radius = maxSize * 0.5 * (data.value / dataValuesSum);

      let image: HTMLImageElement | undefined;
      if (data.src) {
        image = new Image();
        image.src = data.src;
      }

      let bubble = bublesMap.get(data.label);
      if (!bubble) {
        const drawer = new DrawableDataBubble({
          x: Math.random() * (canvas.width - radius * 2) + radius,
          y: Math.random() * (canvas.height - radius * 2) + radius,
          r: 0,
          image: image,
          label: data.label,
          value: `${data.value}`,
          fontFamily: "Arial",
          getColor: getFunctionGetColorByDelta({
            delta: 1,
          }),
        });

        bubble = {
          directionX: Math.random() * 2 - 1,
          directionY: Math.random() * 2 - 1,
          targetR: radius,
          currentData: data,
          drawer,
        };
      } else {
        bubble.currentData = data;

        // Calculate Delta
        const prevVal = bubble.prevData?.value ?? 0;
        const curVal = bubble.currentData?.value ?? 0;
        let delta = ((curVal / prevVal) * 100 - 100) / 100;
        console.log(curVal, prevVal, delta);
        if (!Number.isFinite(delta)) {
          delta = -1;
        }
        bubble.drawer.value = `${data.value}`;
        bubble.drawer.getColor = getFunctionGetColorByDelta({
          delta: delta,
        });

        // Set Target
        bubble.targetR = radius;
      }

      bublesMap.set(data.label, bubble);
    });

    for (const [, value] of bublesMap) {
      if (value.currentData) {
        continue;
      }
      value.targetR = 0;
    }
  }

  constructor({ canvas, scale }: { canvas: HTMLCanvasElement; scale: number }) {
    this.scale = scale;
    this.canvas = canvas;
    if (!canvas.getContext) {
      throw new Error("Canvas is not supported");
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Canvas context 2d is null");
    }
    this.ctx = ctx;
  }

  recalculateBubbleSizes() {
    const { canvas, bublesMap, dataValuesSum } = this;
    const maxSize = Math.min(canvas.width, canvas.height);

    for (const [, value] of bublesMap) {
      const { drawer, currentData } = value;
      const currentDataValue = currentData?.value ?? 0;
      const radius = maxSize * 0.5 * (currentDataValue / dataValuesSum);
      if (drawer.r > radius) {
        drawer.r = radius;
      }
      if (currentDataValue == 0) {
        continue;
      }

      value.targetR = radius;
    }
  }

  draw() {
    const { ctx, canvas, _data, dataValuesSum, bublesMap } = this;

    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fill();

    for (const [key, bubble] of bublesMap) {
      const { currentData, drawer } = bubble;
      if (!currentData && bubble.targetR <= 0 && drawer.r <= 0) {
        bublesMap.delete(key);
        continue;
      }

      // Calculate on Time
      let deltaR = bubble.targetR - drawer.r;
      if (deltaR > 0) {
        deltaR = deltaR / 10;
      } else if (deltaR < 0) {
        deltaR = deltaR / 10;
      }
      drawer.r += deltaR;

      if (drawer.x - drawer.r < 0) {
        drawer.x = drawer.r;
        bubble.directionX *= -1;
      } else if (canvas.width < drawer.x + drawer.r) {
        drawer.x = canvas.width - drawer.r;
        bubble.directionX *= -1;
      }

      if (drawer.y - drawer.r < 0) {
        drawer.y = drawer.r;
        bubble.directionY *= -1;
      } else if (canvas.height < drawer.y + drawer.r) {
        drawer.y = canvas.height - drawer.r;
        bubble.directionY *= -1;
      }

      drawer.x += bubble.directionX;
      drawer.y += bubble.directionY;

      bubble.drawer.draw({ ctx });
    }
  }
}
