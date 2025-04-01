import type { IRGB } from "./rgb";

/**
 * Парсит цвет в формате RGB, RGBA или HEX и возвращает значения RGB
 * @param color Строка с цветом (например "rgb(255, 0, 0)", "rgba(0, 255, 0, 0.5)", "#FF00FF", "#abc")
 * @returns Объект с значениями RGB или null, если парсинг не удался
 */
export function getRGBfromColorString(color: string): IRGB | null {
  const normalized = color.replace(/\s+/g, "").toLowerCase();

  const rgbMatch = normalized.match(
    /^rgba?\((\d+),(\d+),(\d+)(?:,([\d.]+))?\)$/i
  );
  if (rgbMatch) {
    const r = clampValue(parseInt(rgbMatch[1], 10));
    const g = clampValue(parseInt(rgbMatch[2], 10));
    const b = clampValue(parseInt(rgbMatch[3], 10));

    if (isValidRGB(r, g, b)) {
      return { r, g, b };
    }
    return null;
  }

  const hexMatch = normalized.match(/^#([a-f0-9]{3}|[a-f0-9]{6})$/i);
  if (hexMatch) {
    const hex = hexMatch[1];
    if (hex.length === 3) {
      const r = clampValue(parseInt(hex[0] + hex[0], 16));
      const g = clampValue(parseInt(hex[1] + hex[1], 16));
      const b = clampValue(parseInt(hex[2] + hex[2], 16));
      return { r, g, b };
    } else {
      const r = clampValue(parseInt(hex.substring(0, 2), 16));
      const g = clampValue(parseInt(hex.substring(2, 4), 16));
      const b = clampValue(parseInt(hex.substring(4, 6), 16));
      return { r, g, b };
    }
  }

  return null;
}

function isValidRGB(r: number, g: number, b: number): boolean {
  return isValidChannel(r) && isValidChannel(g) && isValidChannel(b);
}

function isValidChannel(value: number): boolean {
  return !isNaN(value) && value >= 0 && value <= 255;
}

function clampValue(value: number): number {
  return Math.max(0, Math.min(255, value));
}
