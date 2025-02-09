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
}: {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  r: number;
  getColor: TFuncGetColor;
  selected?: boolean;
}): Error | void {
  if (r <= 0) {
    return;
  }

  ctx.beginPath();
  ctx.fillStyle = getColor({ opacity: 0.05 });
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();

  let max = r * 0.1;
  for (let i = 1; i < max; i += 1) {
    const opacity = (1 - i / max) / (r * 0.1);
    ctx.strokeStyle = getColor({ opacity });
    ctx.arc(x, y, r - i, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.closePath();

  if (selected) {
    drawBubbleSelectionOutline({ ctx, x, y, r });
  }
}
