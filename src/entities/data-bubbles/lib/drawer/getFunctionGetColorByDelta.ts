import { mixRgba } from "./mixRgba";

export type TFuncGetColor = (prop: { opacity: number | string }) => string;

interface IRGB {
  r: number;
  g: number;
  b: number;
}

export function getFunctionGetColorByDelta({
  delta,
  rgbOnZero,
  rgbOnNegative,
  rgbOnPositive,
}: {
  delta?: number;
  rgbOnZero?: IRGB;
  rgbOnNegative?: IRGB;
  rgbOnPositive?: IRGB;
}): TFuncGetColor {
  let d = delta ?? 0;

  let rgbZero: IRGB = rgbOnZero ?? {
    b: 255,
    g: 255,
    r: 255,
  };
  let rgbNegative: IRGB = rgbOnNegative ?? { b: 0, g: 0, r: 255 };
  let rgbPositive: IRGB = rgbOnPositive ?? { b: 0, g: 255, r: 0 };

  if (!d || d === 0) {
    return ({ opacity = 1 }) =>
      `rgba(${rgbZero.r}, ${rgbZero.g}, ${rgbZero.b}, ${opacity})`;
  }

  let rgb = rgbZero;
  if (d < 0) {
    if (d < -1) {
      d = -1;
    }
    d = d * -1;

    rgb = rgbNegative;
  } else if (d > 0) {
    if (d > 1) {
      d = 1;
    }

    rgb = rgbPositive;
  }

  rgb.r *= d;
  rgb.g *= d;
  rgb.b *= d;

  let mix = mixRgba(
    { ...rgbZero, a: 1, ratio: 1 - d },
    { ...rgb, a: 1, ratio: d }
  );

  return ({ opacity = 1 }) => `rgba(${mix.r}, ${mix.g}, ${mix.b}, ${opacity})`;
}
