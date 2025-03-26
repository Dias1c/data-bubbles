import { mixRgba } from "./mixRgba";

export type TFuncGetColor = (prop: { opacity: number | string }) => string;

export function getFunctionGetColorByDelta({
  delta,
}: {
  delta?: number;
}): TFuncGetColor {
  let d = delta ?? 0;

  if (!d || d === 0) {
    return ({ opacity = 1 }) => `rgba(255, 255, 255, ${opacity})`;
  }

  let red = 0;
  let green = 0;

  if (d < 0) {
    if (d < -1) {
      d = -1;
    }
    d = d * -1;

    red = 255 * d;
  } else if (d > 0) {
    if (d > 1) {
      d = 1;
    }

    green = 255 * d;
  }

  const mix = mixRgba(
    { r: 255, g: 255, b: 255, a: 1, ratio: 1 - d },
    { r: red, g: green, b: 0, a: 1, ratio: d }
  );

  return ({ opacity = 1 }) => `rgba(${mix.r}, ${mix.g}, ${mix.b}, ${opacity})`;
}
