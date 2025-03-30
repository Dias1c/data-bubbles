import type { IDataStateBubble } from "../../types";
import { DrawableDataBubble } from "./DrawableDataBubble";
import { getFunctionGetColorByDelta } from "./getFunctionGetColorByDelta";

type TDrawingData = {
  currentData?: IDataStateBubble;
  directionX: number;
  directionY: number;
  targetR: number;
  drawer: DrawableDataBubble;
};

const createImage = (src: string) => {
  let image = new Image();
  image.setAttribute("crossorigin", "anonymous");
  image.src = src;
  return image;
};

// TODO: Optimization
export class DrawerDataBubbles {
  minDelayPerFrameMs: number = 1000 / 60;

  private _canvas!: HTMLCanvasElement;
  public get canvas() {
    return this._canvas;
  }
  public set canvas(v: HTMLCanvasElement) {
    this._canvas = v;
    if (!v.getContext) {
      throw new Error("Canvas is not supported");
    }

    const ctx = v.getContext("2d");
    if (!ctx) {
      throw new Error("Canvas context 2d is null");
    }
    this._ctx = ctx;
  }

  private requestAnimationFrameId: number | undefined;

  private _ctx!: CanvasRenderingContext2D;
  public get ctx() {
    return this._ctx;
  }

  scale: number;

  dataValuesSum: number = 0;

  bublesMap: Map<string, TDrawingData> = new Map();

  private colorBackground: string;
  setColorBackground(color: string) {
    this.colorBackground = color;
  }

  private colorText: string;
  setColorText(color: string) {
    this.colorText = color;

    const { bublesMap } = this;
    for (const [, bubble] of bublesMap) {
      bubble.drawer.colorText = color;
    }
  }

  private _data: IDataStateBubble[] = [];
  public get data(): IDataStateBubble[] {
    return this._data;
  }

  setData(v: IDataStateBubble[], prev?: IDataStateBubble[]) {
    this._data = v;
    const { bublesMap, canvas } = this;

    let prevMap: Map<string, IDataStateBubble> | undefined;
    if (!!prev?.length) {
      prevMap = new Map();
      for (const data of prev) {
        prevMap.set(data.name, data);
      }
    }

    for (const [, value] of bublesMap) {
      value.currentData = undefined;
      value.targetR = 0;
    }

    for (const data of v) {
      let bubble = bublesMap.get(data.name);

      // TODO: Отдельная функция
      if (!bubble) {
        let image: HTMLImageElement | undefined;
        if (data.img_src) {
          image = createImage(data.img_src);
        }

        const drawer = new DrawableDataBubble({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: 0,
          image: image,
          label: data.name,
          value: data.display_value ?? `${data.value}`,
          fontFamily: "Inter",
          getColor: getFunctionGetColorByDelta({
            delta: 1,
          }),
          colorText: this.colorText,
        });

        bubble = {
          directionX: 0,
          directionY: 0,
          targetR: 0,
          currentData: data,
          drawer,
        };

        bublesMap.set(data.name, bubble);
        continue;
      }

      // TODO: Отдельная функция
      bubble.currentData = data;
      bubble.drawer.value = data.display_value ?? `${data.value}`;
      if (bubble.drawer.image?.src != data.img_src) {
        let image: HTMLImageElement | undefined;
        if (data.img_src) {
          image = createImage(data.img_src);
        }
        bubble.drawer.image = image;
      }

      // TODO: Отдельная функция
      let delta = 1;
      const prevVal = prevMap?.get(data.name)?.value ?? 0;
      if (prevVal) {
        const curVal = bubble.currentData?.value ?? 0;
        delta = ((curVal / prevVal) * 100 - 100) / 100;
        if (!Number.isFinite(delta)) {
          delta = -1;
        }
      }
      bubble.drawer.getColor = getFunctionGetColorByDelta({
        delta: delta,
      });
    }

    this.calculateAndSetBubblesTargetRadius();
  }

  constructor({
    canvas,
    scale,
    colorBackground,
    colorText,
  }: {
    canvas: HTMLCanvasElement;
    scale: number;
    colorBackground: string;
    colorText: string;
  }) {
    this.scale = scale;
    this.canvas = canvas;
    this.colorBackground = colorBackground;
    this.colorText = colorText;
  }

  setCanvasSize({ width, height }: { width: number; height: number }) {
    this.canvas.width = width * this.scale;
    this.canvas.height = height * this.scale;
  }

  getCurrentBubblesStats() {
    const { bublesMap } = this;
    const values: number[] = [];
    let valuesSum = 0;
    for (const [, value] of bublesMap) {
      const cur = value.currentData;
      if (!cur) continue;
      valuesSum += cur.value;
      values.push(cur.value);
    }
    return { valuesSum, values };
  }

  _calculateAndSetBubblesTargetRadiusAbortController:
    | AbortController
    | undefined;
  calculateAndSetBubblesTargetRadius() {
    this._calculateAndSetBubblesTargetRadiusAbortController?.abort();
    this._calculateAndSetBubblesTargetRadiusAbortController =
      new AbortController();
    const abortController =
      this._calculateAndSetBubblesTargetRadiusAbortController;

    const { canvas, bublesMap } = this;
    const canvasS = canvas.width * canvas.height;
    const maxRadius = Math.min(canvas.width, canvas.height) / 2;

    const calculateAndSetRadiuses = (scaleFactor: number = 1) => {
      const { valuesSum } = this.getCurrentBubblesStats();
      for (const [, value] of bublesMap) {
        const { currentData } = value;

        const currentValue = currentData?.value ?? 0;
        const s = (currentValue / valuesSum) * canvasS;
        let r = Math.sqrt(s) / 2;
        if (r > maxRadius) {
          r = maxRadius;
        }

        if (value.drawer.r > maxRadius) {
          value.drawer.r = maxRadius;
        }
        if (currentValue == 0) {
          continue;
        }

        value.targetR = r * scaleFactor;
      }
    };

    // TODO: Optimize or DELETE
    // new Promise(async (resolve) => {
    //   abortController.signal.addEventListener("abort", () =>
    //     resolve(undefined)
    //   );

    //   const { values } = this.getCurrentBubblesStats();

    //   try {
    //     const scaleFactor = await getCirclesScaleFactorByValues({
    //       width: canvas.width,
    //       height: canvas.height,
    //       circleValues: values,
    //       signal: abortController.signal,
    //     });
    //     calculateAndSetRadiuses(scaleFactor);
    //   } finally {
    //   }
    // });

    calculateAndSetRadiuses();
  }

  simulateFrame() {
    const { canvas, bublesMap } = this;

    for (const [key, bubble] of bublesMap) {
      const { currentData, drawer } = bubble;
      if (!currentData && bubble.targetR <= 0 && drawer.r <= 0) {
        bublesMap.delete(key);
        continue;
      }

      let deltaR = bubble.targetR - drawer.r;
      if (deltaR > 0 || deltaR < 0) {
        deltaR = deltaR / 10;
      }
      drawer.r += deltaR;

      if (drawer.r < 1 && bubble.targetR == 0) {
        drawer.r = 0;
      }

      // Collisions
      for (const [key2, bubble2] of bublesMap) {
        if (key == key2) continue;

        const { drawer: drawer2 } = bubble2;

        let dx = drawer2.x - drawer.x;
        let dy = drawer2.y - drawer.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let minDistance = drawer.r + drawer2.r;

        let angle = Math.atan2(dy, dx);
        let overlap = minDistance - distance;

        if (distance < minDistance) {
          bubble.directionX -= (Math.cos(angle) * (overlap / 2)) / 10;
          bubble.directionY -= (Math.sin(angle) * (overlap / 2)) / 10;
          bubble2.directionX += (Math.cos(angle) * (overlap / 2)) / 10;
          bubble2.directionY += (Math.sin(angle) * (overlap / 2)) / 10;
        }
      }

      // if (Math.abs(bubble.directionX) > 100) {
      //   bubble.directionX = bubble.directionX > 0 ? 100 : -100;
      // }
      // if (Math.abs(bubble.directionY) > 100) {
      //   bubble.directionY = bubble.directionY > 0 ? 100 : -100;
      // }

      if (bubble.directionX < 0.1 && bubble.directionY < 0.1) {
        bubble.directionX += (Math.random() - 0.5) / 10;
        bubble.directionY += (Math.random() - 0.5) / 10;
      }

      bubble.directionX -= bubble.directionX * 0.01;
      bubble.directionY -= bubble.directionY * 0.01;

      drawer.x += bubble.directionX;
      drawer.y += bubble.directionY;

      // Calculate Coordinates
      if (drawer.x - drawer.r < 0) {
        drawer.x = drawer.r;
        bubble.directionX /= 2;
      }
      if (canvas.width < drawer.x + drawer.r) {
        drawer.x = canvas.width - drawer.r;
        bubble.directionX /= 2;
      }

      if (drawer.y - drawer.r < 0) {
        drawer.y = drawer.r;
        bubble.directionY = 0;
      }
      if (canvas.height < drawer.y + drawer.r) {
        drawer.y = canvas.height - drawer.r;
        bubble.directionY = 0;
      }
    }
  }

  draw() {
    const { ctx, canvas, bublesMap } = this;

    ctx.beginPath();
    ctx.fillStyle = this.colorBackground;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fill();

    for (const [, bubble] of bublesMap) {
      bubble.drawer.draw({ ctx, optimizated: true });
    }
  }

  startAnimation() {
    if (this.requestAnimationFrameId) {
      cancelAnimationFrame(this.requestAnimationFrameId);
    }

    let prevTime: number | null = null;
    const animateCallback: FrameRequestCallback = (t) => {
      const stepMs = t - (prevTime ?? 0);
      if (prevTime && stepMs < this.minDelayPerFrameMs) {
        this.requestAnimationFrameId = requestAnimationFrame(animateCallback);
        return;
      }
      prevTime = t;

      this.simulateFrame();
      this.draw();
      this.requestAnimationFrameId = requestAnimationFrame(animateCallback);
    };

    this.requestAnimationFrameId = requestAnimationFrame(animateCallback);
  }

  stopAnimation() {
    if (!this.requestAnimationFrameId) {
      return;
    }

    cancelAnimationFrame(this.requestAnimationFrameId);
  }
}
