import { DrawableDataBubble } from "./DrawableDataBubble";
import { getFunctionGetColorByDelta } from "./getFunctionGetColorByDelta";

type TDataElement = {
  src?: string;
  label: string;
  value: number;
};

export class DrawerDataBubbles {
  canvas: HTMLCanvasElement;
  scale: number;
  ctx: CanvasRenderingContext2D;

  dataValuesSum: number = 0;

  dataBubblesMap: Map<string, DrawableDataBubble> = new Map();
  _data: TDataElement[] = [];
  public get data(): TDataElement[] {
    return this._data;
  }
  public set data(v: TDataElement[]) {
    this._data = v;
    this.dataValuesSum = v.reduce((p, c) => {
      return p + c.value;
    }, 0);

    const { dataBubblesMap, canvas, dataValuesSum } = this;

    // TODO: Recognize Bubbles To Delete

    const maxSize = Math.min(canvas.width, canvas.height);
    v.forEach((el) => {
      const r = maxSize * 0.5 * (el.value / dataValuesSum);

      let image: HTMLImageElement | undefined;
      if (el.src) {
        image = new Image();
        image.src = el.src;
      }

      const dataBubble = new DrawableDataBubble({
        x: Math.random() * (canvas.width - r * 2) + r,
        y: Math.random() * (canvas.height - r * 2) + r,
        r: r,
        image: image,
        label: el.label,
        value: `${el.value}`,
        fontFamily: "Arial",
        getColor: getFunctionGetColorByDelta({ delta: Math.random() * 2 - 1 }),
      });

      dataBubblesMap.set(el.label, dataBubble);
    });
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

  draw() {
    const { ctx, canvas, _data, dataValuesSum, dataBubblesMap } = this;

    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fill();

    const maxSize = Math.min(canvas.width, canvas.height);

    _data.forEach((d) => {
      let image: HTMLImageElement | undefined;
      if (d.src) {
        image = new Image();
        image.src = d.src;
      }

      const dataBubble = dataBubblesMap.get(d.label);
      if (!dataBubble) {
        return;
      }

      // TODO: Move On Idle
      dataBubble.x = dataBubble.x + Math.random() * 2 - 1;
      dataBubble.y = dataBubble.y + Math.random() * 2 - 1;

      dataBubble.draw({ ctx });
    });
  }
}
