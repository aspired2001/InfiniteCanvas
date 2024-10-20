import { Pan } from "../types/stateTypes";

export function getRealMouseCordinate(
  clientX: number,
  clientY: number,
  canvas: HTMLCanvasElement,
  pan: Pan,
  scale: number
): [number, number] {
  var mouseX = (clientX - canvas.getBoundingClientRect().left - pan.x) / scale;
  var mouseY = (clientY - canvas.getBoundingClientRect().top - pan.y) / scale;

  return [mouseX, mouseY];
}

export function calculateDistance(
  x1: number,
  y1: number,
  x2: number,
  y2: number
) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

export function calculateAngle(x1: number, y1: number, x2: number, y2: number) {
  return -Math.atan2(y1 - y2, x2 - x1);
}

export function toPositive(num: number) {
  if (num <= 0) {
    return -num;
  } else {
    return num;
  }
}

export function toNegative(num: number) {
  if (num >= 0) {
    return -num;
  } else {
    return num;
  }
}

export function isPositive(num: number) {
  return num >= 0;
}

export function isNegative(num: number) {
  return !isPositive(num);
}
