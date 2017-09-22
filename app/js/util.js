export function randomCoordinate(width, height, size) {
  const x = Math.round(Math.random() * (width - size));
  const y = Math.round(Math.random() * (height - size));
  return { x, y };
}

export function intersects(a, b) {
  return Math.max(a.left, b.left) < Math.min(a.right, b.right) &&
    Math.max(a.top, b.top) < Math.min(a.bottom, b.bottom);
}

export const directions = {
  left: { keyCode: 37, opposite: 39 },
  right: { keyCode: 39, opposite: 37 },
  up: { keyCode: 38, opposite: 40 },
  down: { keyCode: 40, opposite: 38 }
};