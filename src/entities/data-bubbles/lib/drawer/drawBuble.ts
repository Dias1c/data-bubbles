import type { TFuncGetColor } from "./getFunctionGetColorByDelta";

function drawBubbleSelectionOutline({
  ctx,
  x,
  y,
  r,
}: {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  r: number;
}) {
  ctx.beginPath();
  ctx.strokeStyle = "#fff";
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.closePath();
}

export function drawBuble({
  ctx,
  x,
  y,
  r,
  getColor,
  selected,
  scale,
}: {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  r: number;
  getColor: TFuncGetColor;
  selected?: boolean;
  scale?: number;
}): Error | void {
  if (r <= 0) {
    return;
  }

  ctx.beginPath();
  ctx.fillStyle = getColor({ opacity: 0.2 });
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = getColor({ opacity: 1 });
  if (scale != undefined) {
    ctx.lineWidth = 1 * scale;
  }
  ctx.stroke();
  ctx.closePath();

  if (selected) {
    drawBubbleSelectionOutline({ ctx, x, y, r });
  }
}
