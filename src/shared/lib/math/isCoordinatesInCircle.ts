export function isCoordinatesInCircle({
  x,
  y,
  cX,
  cY,
  cR,
}: {
  x: number;
  y: number;
  cX: number;
  cY: number;
  cR: number;
}): boolean {
  return (x - cX) ** 2 + (y - cY) ** 2 <= cR ** 2;
}
