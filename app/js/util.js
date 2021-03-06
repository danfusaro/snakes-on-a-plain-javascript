export function randomCoordinate(width, height, size) {
  let x = Math.max(Math.round(Math.random() * width) - (size / 2), size / 2);
  let y = Math.max(Math.round(Math.random() * height) - (size / 2), size / 2);
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