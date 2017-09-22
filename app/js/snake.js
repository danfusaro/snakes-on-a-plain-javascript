import { directions, intersects } from './util';
import { Segment } from './segment';

export class Snake {
  constructor(game, size, color) {
    this.canvas = game.canvas;
    this.segments = [new Segment(
      Math.round((game.canvas.width - size) / 2),
      Math.round((game.canvas.height - size) / 2),
      size,
      color)];

    this.direction = directions.right;
    this.game = game;
    this.size = size;
    this.color = color;
  }

  update(context) {
    const boundsInfo = this.getBoundsInfo();

    this.segments.push(new Segment(boundsInfo.x, boundsInfo.y, this.size, this.color));

    if(boundsInfo.food) {
      this.segments.push(new Segment(boundsInfo.x, boundsInfo.y, this.size, this.color));
      let growth = 3;
      while(growth > 0) {
        this.segments.push(new Segment(boundsInfo.x, boundsInfo.y, this.size, this.color));
        growth--;
      }
      this.game.scored();
    } else {
      this.segments.shift();
    }

    if(boundsInfo.collision) {
      this.game.stop();
    }

    this.head.x = boundsInfo.x;
    this.head.y = boundsInfo.y;

    this.segments.forEach(s => {
      s.draw(context);
    });
  }

  turn(direction) {
    if(this.direction) {
      // Check for opposite and do not allow
      if(direction.keyCode === this.direction.opposite && this.game.score > 0) {
        return;
      }
    }
    this.direction = direction;
  }

  get head() {
    return this.segments[0];
  }

  get tail() {
    return this.segments[this.segments.length];
  }

  getBoundsInfo() {

    let x = this.head.x;
    let y = this.head.y;

    const bounds = { width: this.canvas.width - this.size, height: this.canvas.height - this.size };
    const speed = 2 * this.game.level;

    switch(this.direction) {
      case directions.right:
        // Check for max width and increment +
        if(x + speed < bounds.width) {
          x += speed;
        }
        break;
      case directions.left:
        // Check for 0 and decrement -
        if(x - speed > 0) {
          x -= speed;
        }
        break;
      case directions.down:
        // Check for max height and increment +
        if(y + speed < bounds.height) {
          y += speed;
        }
        break;
      case directions.up:
        // Check for 0 and decrement -
        if(y - speed > 0) {
          y -= speed;
        }
        break;
    }
    // No coordinates changed, there was a collision
    let collision = x === this.head.x && y === this.head.y;
    // Check to see if the snake ate food
    const food = intersects(this.game.food.getRect(), this.head.getRect());
    // TODO - check for intersection of head and segments
    return { x, y, collision, speed, food };
  }
}