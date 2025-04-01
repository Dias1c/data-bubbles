import { drawBuble } from "./drawBuble";
import {
  getFunctionGetColorByDelta,
  type TFuncGetColor,
} from "./getFunctionGetColorByDelta";

const isDebug = false;

/**
 * Value is related on radius
 */
const IMAGE_SIZE_RATIO = 0.75;

export class DrawableDataBubble {
  x: number;
  y: number;
  r: number;
  getColor: TFuncGetColor = getFunctionGetColorByDelta({
    delta: 0,
  });
  image?: HTMLImageElement;
  label: string;
  value: string;
  fontFamily?: string;
  colorText: string;

  constructor({
    x,
    y,
    r,
    getColor,
    image,
    label,
    fontFamily,
    value,
    colorText,
  }: {
    x: number;
    y: number;
    r: number;
    getColor?: TFuncGetColor;
    image?: HTMLImageElement;
    label: string;
    fontFamily?: string;
    value: string;
    colorText: string;
  }) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.getColor = getColor;
    this.image = image;
    this.label = label;
    this.fontFamily = fontFamily;
    this.value = value;
    this.colorText = colorText;
  }

  draw({
    ctx,
    scale,
    selected,
    optimizated,
  }: {
    ctx: CanvasRenderingContext2D;
    scale?: number;
    selected?: boolean;
    optimizated?: boolean;
  }) {
    let { x, y, r, getColor } = this;
    if (r <= 0) {
      return;
    }
    if (optimizated) {
      x = Math.round(x);
      y = Math.round(y);
      r = Math.round(r);
    }

    drawBuble({ ctx, selected, x, y, r, getColor, scale });

    this.drawImage({ ctx, optimizated });
    this.drawLabel({ ctx, optimizated });
    this.drawValue({ ctx, optimizated });
  }

  private drawImage({
    ctx,
    optimizated,
  }: {
    ctx: CanvasRenderingContext2D;
    optimizated?: boolean;
  }) {
    let { image, x, y, r } = this;
    if (!image || !image.width || !image.height || r <= 0) {
      return;
    }

    if (optimizated) {
      x = Math.round(x);
      y = Math.round(y);
      r = Math.round(r);
    }

    const size = r * IMAGE_SIZE_RATIO;
    let dw = size;
    let dh = size;

    if (image.width != image.height) {
      const delta = image.width / image.height;
      if (delta < 1) {
        dw = size * delta;
      } else if (delta > 1) {
        dh = size / delta;
      }
    }

    const dx = x - dw / 2;
    const dy = y - r + (r * (1 - IMAGE_SIZE_RATIO)) / 3 + (size - dh) / 2;

    ctx.drawImage(image, dx, dy, dw, dh);

    if (isDebug) {
      const dx = x - size / 2;
      const dy = y - r + (r * (1 - IMAGE_SIZE_RATIO)) / 3;
      ctx.beginPath();
      ctx.strokeStyle = "white";
      ctx.strokeRect(dx, dy, size, size);
      ctx.closePath();
    }
  }

  private drawLabel({
    ctx,
    optimizated,
  }: {
    ctx: CanvasRenderingContext2D;
    optimizated?: boolean;
  }) {
    let { label, fontFamily, x, y, r } = this;
    if (!label || r <= 0) {
      return;
    }

    let fontSize = r / 3;

    if (optimizated) {
      x = Math.round(x);
      y = Math.round(y);
      r = Math.round(r);
      fontSize = Math.round(fontSize);
    }

    ctx.font = `${fontSize}px ${fontFamily ?? "Serif"}`;
    ctx.fillStyle = this.colorText;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const maxWidth = r * 2;
    ctx.fillText(label, x, y, maxWidth);

    if (isDebug) {
      ctx.beginPath();
      ctx.strokeStyle = "white";
      ctx.strokeRect(x - r, y - fontSize / 2, maxWidth, fontSize);
      ctx.closePath();
    }
  }

  private drawValue({
    ctx,
    optimizated,
  }: {
    ctx: CanvasRenderingContext2D;
    optimizated?: boolean;
  }) {
    let { value, fontFamily, x, y, r } = this;
    if (!value || r <= 0) {
      return;
    }

    let fontSize = r / 3;
    if (optimizated) {
      x = Math.round(x);
      y = Math.round(y);
      r = Math.round(r);
      fontSize = Math.round(fontSize);
    }

    ctx.font = `${fontSize}px ${fontFamily ?? "Serif"}`;
    ctx.fillStyle = this.colorText;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const dx = x;
    const dy = y + r / 2;
    const maxWidth = r * 2;
    ctx.fillText(value, dx, dy, maxWidth);

    if (isDebug) {
      ctx.beginPath();
      ctx.strokeStyle = "white";
      ctx.strokeRect(x - r, dy - fontSize / 2, r * 2, fontSize);
      ctx.closePath();
    }
  }
}
