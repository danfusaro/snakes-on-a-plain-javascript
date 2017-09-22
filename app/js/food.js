import { randomCoordinate } from './util';
import { Sprite } from './sprite';
export class Food extends Sprite {
  constructor(canvas, size, color) {
    const coords = randomCoordinate(canvas.width, canvas.height, size);
    super(coords.x, coords.y, size, color);
  }
}