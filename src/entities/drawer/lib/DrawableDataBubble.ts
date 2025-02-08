import { drawBuble } from "./drawBuble";
import type { TFuncGetColor } from "./getFunctionGetColorByDelta";

// Текущая структура готова
// Функция draw будет рисовать все на основе текущих данных
// Нужно реализовать:
// - рисовку image (Размер, положение и тд)
// - рисовку title

const isDebug = false;

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
    selected,
  }: {
    ctx: CanvasRenderingContext2D;
    selected?: boolean;
  }) {
    const { x, y, r, getColor, label } = this;

    drawBuble({ ctx, selected, x, y, r, getColor });

    this.drawImage({ ctx });
    this.drawLabel({ ctx });
    this.drawValue({ ctx });
  }

  private drawImage({ ctx }: { ctx: CanvasRenderingContext2D }) {
    const { image, x, y, r } = this;
    if (!image) {
      return;
    }

    const ratio = 0.75;
    const size = r * ratio;
    const dx = x - size / 2;
    const dy = y - r + (r * (1 - ratio)) / 3;
    ctx.drawImage(image, dx, dy, size, size);

    if (isDebug) {
      ctx.beginPath();
      ctx.strokeStyle = "white";
      ctx.strokeRect(dx, dy, size, size);
      ctx.closePath();
    }
  }

  private drawLabel({ ctx }: { ctx: CanvasRenderingContext2D }) {
    const { label, fontFamily, x, y, r } = this;
    if (!label) {
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
    if (!value) {
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
