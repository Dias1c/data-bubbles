import { drawBuble } from "./drawBuble";
import type { TFuncGetColor } from "./getFunctionGetColorByDelta";

const isDebug = true;

/**
 * Value is related on radius
 */
const IMAGE_SIZE_RATIO = 0.75;

export class DrawableDataBubble {
  x: number;
  y: number;
  r: number;
  getColor: TFuncGetColor;
  image?: HTMLImageElement;
  label: string;
  value: string;
  fontFamily?: string;

  constructor({
    x,
    y,
    r,
    getColor,
    image,
    label,
    fontFamily,
    value,
  }: {
    x: number;
    y: number;
    r: number;
    getColor: TFuncGetColor;
    image?: HTMLImageElement;
    label: string;
    fontFamily?: string;
    value: string;
  }) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.getColor = getColor;
    this.image = image;
    this.label = label;
    this.fontFamily = fontFamily;
    this.value = value;
  }

  draw({
    ctx,
    scale,
    selected,
  }: {
    ctx: CanvasRenderingContext2D;
    scale?: number;
    selected?: boolean;
  }) {
    const { x, y, r, getColor } = this;
    if (r <= 0) {
      return;
    }

    drawBuble({ ctx, selected, x, y, r, getColor, scale });

    this.drawImage({ ctx });
    this.drawLabel({ ctx });
    this.drawValue({ ctx });
  }

  private drawImage({ ctx }: { ctx: CanvasRenderingContext2D }) {
    const { image, x, y, r } = this;
    if (!image || !image.width || !image.height || r <= 0) {
      return;
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

  private drawLabel({ ctx }: { ctx: CanvasRenderingContext2D }) {
    const { label, fontFamily, x, y, r } = this;
    if (!label || r <= 0) {
      return;
    }

    const fontSize = r / 3;

    ctx.font = `${fontSize}px ${fontFamily ?? "Serif"}`;
    ctx.fillStyle = "white";
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

  private drawValue({ ctx }: { ctx: CanvasRenderingContext2D }) {
    const { value, fontFamily, x, y, r } = this;
    if (!value || r <= 0) {
      return;
    }

    const fontSize = r / 3;
    ctx.font = `${fontSize}px ${fontFamily ?? "Serif"}`;
    ctx.fillStyle = "white";
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
