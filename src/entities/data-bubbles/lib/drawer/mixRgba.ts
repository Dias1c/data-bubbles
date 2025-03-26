type TFuncMixRgbaParam = {
  r: number;
  g: number;
  b: number;
  a: number;
  ratio: number;
};

export function mixRgba(c1: TFuncMixRgbaParam, c2: TFuncMixRgbaParam) {
  const mix = (v1: number, v2: number, r1: number, r2: number) =>
    Math.round(v1 * r1 + v2 * r2);

  const totalRatio = c1.ratio + c2.ratio;
  const r1 = c1.ratio / totalRatio;
  const r2 = c2.ratio / totalRatio;

  return {
    r: mix(c1.r, c2.r, r1, r2),
    g: mix(c1.g, c2.g, r1, r2),
    b: mix(c1.b, c2.b, r1, r2),
    a: mix(c1.a, c2.a, r1, r2),
  };
}
