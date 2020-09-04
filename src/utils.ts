export function clamp(min: number, max: number, num: number) {
  return Math.max(min, Math.min(num, max));
}

export function addVectors([x1, y1]: Vector, [x2, y2]: Vector): Vector {
  return [x1 + x2, y1 + y2];
}

export function getDistance([x1, y1]: Vector, [x2, y2]: Vector): number {
  return Math.hypot(x2 - x1, y2 - y1);
}
