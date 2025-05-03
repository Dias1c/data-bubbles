import { getRGBfromColorString } from "@/shared/lib/colors/getRGBfromColorString";
import type { IRGB } from "@/shared/lib/colors/rgb";
import type { IDataStateBubble } from "../../types";
import { DrawableDataBubble } from "./DrawableDataBubble";
import { getFunctionGetColorByDelta } from "./getFunctionGetColorByDelta";

type TDrawingData = {
  currentData?: IDataStateBubble;
  directionX: number;
  directionY: number;
  targetR: number;
  drawer: DrawableDataBubble;
  delta: number;
};

const createImage = (src: string) => {
  let image = new Image();
  image.setAttribute("crossorigin", "anonymous");
  image.src = src;
  return image;
};

export interface IDrawerDataBubblesColors {
  background?: string;
  bubbleText?: string;
  bubbleOnNoChange?: string;
  bubbleOnIncrease?: string;
  bubbleOnDecrease?: string;
}

// TODO: Optimization
// TODO: Refactor Code
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

  private colorBackground: string = "#0D1116";
  setColorBackground(color: string) {
    this.colorBackground = color;
  }

  private colorBubbleText: string = "#F0F6FC";
  setColorBubbleText(color: string) {
    this.colorBubbleText = color;

    const { bublesMap } = this;
    for (const [, bubble] of bublesMap) {
      bubble.drawer.colorText = color;
    }
  }

  resetBubbleColors() {
    const { bublesMap } = this;
    for (const [, bubble] of bublesMap) {
      let rgbOnZero: IRGB | undefined | null = this.colorBubbleOnZeroRGB;
      const colorBubbleNoChange =
        bubble.currentData?.color?.bubble ??
        bubble.currentData?.color?.bubbleOnNoChange;
      if (colorBubbleNoChange) {
        rgbOnZero = getRGBfromColorString(colorBubbleNoChange);
      }

      let rgbOnNegative: IRGB | undefined | null =
        this.colorBubbleOnNegativeRGB;
      const colorBubbleOnDecrease =
        bubble.currentData?.color?.bubble ??
        bubble.currentData?.color?.bubbleOnDecrease;
      if (colorBubbleOnDecrease) {
        rgbOnNegative = getRGBfromColorString(colorBubbleOnDecrease);
      }

      let rgbOnPositive: IRGB | undefined | null =
        this.colorBubbleOnPositiveRGB;
      const colorBubbleOnIncrease =
        bubble.currentData?.color?.bubble ??
        bubble.currentData?.color?.bubbleOnIncrease;
      if (colorBubbleOnIncrease) {
        rgbOnPositive = getRGBfromColorString(colorBubbleOnIncrease);
      }

      bubble.drawer.getColor = getFunctionGetColorByDelta({
        delta: bubble.delta,
        rgbOnZero,
        rgbOnNegative,
        rgbOnPositive,
      });

      bubble.drawer.colorText =
        bubble.currentData?.color?.text ?? this.colorBubbleText;
    }
  }

  private colorBubbleOnZeroRGB?: IRGB;
  setColorBubbleOnZeroRGB(rgb?: IRGB) {
    this.colorBubbleOnZeroRGB = rgb;
    this.resetBubbleColors();
  }

  private colorBubbleOnNegativeRGB?: IRGB;
  setColorBubbleOnNegativeRGB(rgb?: IRGB) {
    this.colorBubbleOnNegativeRGB = rgb;
    this.resetBubbleColors();
  }

  private colorBubbleOnPositiveRGB?: IRGB;
  setColorBubbleOnPositiveRGB(rgb?: IRGB) {
    this.colorBubbleOnPositiveRGB = rgb;
    this.resetBubbleColors();
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

    // Обнуляем targetR для всех чтобы расчитать targetR только для тех кто будет оставаться в списке
    for (const [, value] of bublesMap) {
      value.currentData = undefined;
      value.targetR = 0;
    }

    for (const data of v) {
      let bubble = bublesMap.get(data.name);

      // TODO: Отдельная функция
      if (!bubble) {
        let image: HTMLImageElement | undefined;
        if (data.imgSrc) {
          image = createImage(data.imgSrc);
        }

        const drawer = new DrawableDataBubble({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: 0,
          image: image,
          label: data.displayName ?? data.name,
          value: data.displayValue ?? `${data.value}`,
          fontFamily: "Inter",
          colorText: this.colorBubbleText,
        });

        bubble = {
          directionX: 0,
          directionY: 0,
          targetR: 0,
          currentData: data,
          drawer,
          delta: 1,
        };

        bublesMap.set(data.name, bubble);
        if (!prevMap?.get(data.name)) continue;
      }

      // TODO: Отдельная функция
      bubble.currentData = data;
      bubble.drawer.value = data.displayValue ?? `${data.value}`;
      bubble.drawer.label = data.displayName ?? data.name;
      if (bubble.drawer.image?.src != data.imgSrc) {
        let image: HTMLImageElement | undefined;
        if (data.imgSrc) {
          image = createImage(data.imgSrc);
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

      bubble.delta = delta;
    }

    this.calculateAndSetBubblesTargetRadius();
    this.resetBubbleColors();
  }

  constructor({
    canvas,
    scale,
    colors,
  }: {
    canvas: HTMLCanvasElement;
    scale: number;
    colors?: IDrawerDataBubblesColors;
  }) {
    this.scale = scale;
    this.canvas = canvas;

    if (colors) {
      this.colorBackground = colors.background ?? this.colorBackground;
      this.colorBubbleText = colors.bubbleText ?? this.colorBubbleText;
      if (colors.bubbleOnNoChange) {
        const v = getRGBfromColorString(colors.bubbleOnNoChange);
        if (v) this.colorBubbleOnZeroRGB = v;
      }
      if (colors.bubbleOnDecrease) {
        const v = getRGBfromColorString(colors.bubbleOnDecrease);
        if (v) this.colorBubbleOnNegativeRGB = v;
      }
      if (colors.bubbleOnIncrease) {
        const v = getRGBfromColorString(colors.bubbleOnIncrease);
        if (v) this.colorBubbleOnPositiveRGB = v;
      }
    }
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

  calculateAndSetBubblesTargetRadius() {
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
          value.delta = -1;
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
          let res = 1;
          if (
            bubble.drawer.r == bubble.targetR &&
            bubble2.drawer.r == bubble2.targetR &&
            bubble2.drawer.r != 0
          ) {
            res = bubble.drawer.r / bubble2.drawer.r;
          }

          bubble.directionX -= (Math.cos(angle) * (overlap / 2)) / res / 100;
          bubble.directionY -= (Math.sin(angle) * (overlap / 2)) / res / 100;
          bubble2.directionX += (Math.cos(angle) * (overlap / 2) * res) / 100;
          bubble2.directionY += (Math.sin(angle) * (overlap / 2) * res) / 100;
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
        bubble.directionX /= -2;
      }
      if (canvas.width < drawer.x + drawer.r) {
        drawer.x = canvas.width - drawer.r;
        bubble.directionX /= -2;
      }

      if (drawer.y - drawer.r < 0) {
        drawer.y = drawer.r;
        bubble.directionY /= -2;
      }
      if (canvas.height < drawer.y + drawer.r) {
        drawer.y = canvas.height - drawer.r;
        bubble.directionY /= -2;
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
      bubble.drawer.draw({ ctx, optimizated: true, scale: this.scale });
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
