/**
 * Вычисляет насколько нужно маштабировать круги чтобы они вместились в прямоугольник.
 * На самом деле `scaleFactor` всегда будет < 1, так как изначально суммарная площадь кругов будет равна к площади прямоугольника.
 * По этому он будет минимально уменьшать круги чтобы уместить в данную высоту и ширину.
 */
export async function getCirclesScaleFactorByValues({
  width,
  height,
  circleValues,
  precision = 0.01,
  signal,
}: {
  width: number;
  height: number;
  circleValues: number[];
  precision?: number;
  signal?: AbortSignal;
}): Promise<number> {
  const S_rect = width * height;
  const V_total = circleValues.reduce((sum, v) => sum + v, 0);

  const radiuses: number[] = circleValues.map(
    (v) => Math.sqrt((v / V_total) * S_rect) / 2
  );

  let min = 0;
  let max = 1;

  while (max - min > precision) {
    if (signal?.aborted) {
      throw new Error("Aborted");
    }
    const mid = (min + max) / 2;
    if (await canFitCirclesToRectangle(width, height, radiuses, mid, signal)) {
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

/**
 * TODO: Оптимизировать 4 вложенных массива
 */
async function canFitCirclesToRectangle(
  width: number,
  height: number,
  radiuses: number[],
  scaleFactor: number,
  signal?: AbortSignal
): Promise<boolean> {
  if (signal?.aborted) {
    throw new Error("Aborted");
  }

  const scaledCircles: ICircle[] = radiuses.map((r) => ({
    r: r * scaleFactor,
  }));

  scaledCircles.sort((a, b) => b.r - a.r);

  const placed: ICircle[] = [];

  for (const circle of scaledCircles) {
    if (signal?.aborted) {
      throw new Error("Aborted");
    }

    let placedSuccessfully = false;

    for (
      let y = circle.r;
      y <= height - circle.r;
      y += Math.max(1, circle.r / 2)
    ) {
      if (signal?.aborted) {
        throw new Error("Aborted");
      }

      for (
        let x = circle.r;
        x <= width - circle.r;
        x += Math.max(1, circle.r / 2)
      ) {
        if (signal?.aborted) {
          throw new Error("Aborted");
        }

        const canPlace = await new Promise((resolve) => {
          const res = placed.every((placedCircle) => {
            const dx = x - placedCircle.x!;
            const dy = y - placedCircle.y!;
            return Math.sqrt(dx * dx + dy * dy) >= circle.r + placedCircle.r;
          });

          resolve(res);
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
