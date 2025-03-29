/**
 * Вычисляет насколько нужно маштабировать круги чтобы они вместились в прямоугольник.
 * На самом деле `scaleFactor` всегда будет < 1, так как изначально суммарная площадь кругов будет равна к площади прямоугольника.
 * По этому он будет минимально уменьшать круги чтобы уместить в данную высоту и ширину.
 */
export function getCirclesScaleFactorByValues(
  width: number,
  height: number,
  circleValues: number[],
  precision: number = 0.0001
): number {
  const S_rect = width * height;
  const V_total = circleValues.reduce((sum, v) => sum + v, 0);

  const radiuses: number[] = circleValues.map(
    (v) => Math.sqrt((v / V_total) * S_rect) / 2
  );

  let min = 0;
  let max = 1;

  while (max - min > precision) {
    const mid = (min + max) / 2;
    if (canFitCirclesToRectangle(width, height, radiuses, mid)) {
      min = mid;
    } else {
      max = mid;
    }
  }

  return min;
}

interface ICircle {
  r: number;
  x?: number;
  y?: number;
}

function canFitCirclesToRectangle(
  width: number,
  height: number,
  radiuses: number[],
  scaleFactor: number
): boolean {
  const scaledCircles: ICircle[] = radiuses.map((r) => ({
    r: r * scaleFactor,
  }));

  scaledCircles.sort((a, b) => b.r - a.r);

  const placed: ICircle[] = [];

  for (const circle of scaledCircles) {
    let placedSuccessfully = false;

    for (
      let y = circle.r;
      y <= height - circle.r;
      y += Math.max(1, circle.r / 2)
    ) {
      for (
        let x = circle.r;
        x <= width - circle.r;
        x += Math.max(1, circle.r / 2)
      ) {
        const canPlace = placed.every((placedCircle) => {
          const dx = x - placedCircle.x!;
          const dy = y - placedCircle.y!;
          return Math.sqrt(dx * dx + dy * dy) >= circle.r + placedCircle.r;
        });

        if (canPlace) {
          placed.push({ ...circle, x, y });
          placedSuccessfully = true;
          break;
        }
      }
      if (placedSuccessfully) break;
    }

    if (!placedSuccessfully) return false;
  }

  return true;
}
