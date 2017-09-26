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
    // Start rendering loop
    this.segments.push(new Segment(boundsInfo.x, boundsInfo.y, this.size, this.color));

    // Food was eaten
    if(boundsInfo.food) {
      this.game.scored();
      // How many segments need to be added based on game speed
      let count = Math.floor(this.size / this.game.speed);
      while(count > 0) {
        this.segments.push(new Segment(boundsInfo.x, boundsInfo.y, this.size, this.color));
        count--;
      }
    } else {
      // If there was no growth, remove last added segment
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

    const min = this.size / 2;
    const bounds = { width: this.canvas.width - min, height: this.canvas.height - min };
    // Speed based on level
    const speed = this.game.speed;


    switch(this.direction) {
      case directions.right:
        // Check for max width and increment +
        if(x + speed < bounds.width) {
          x += speed;
        }
        break;
      case directions.left:
        // Check for 0 and decrement -
        if(x - speed > min) {
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
        if(y - speed > min) {
          y -= speed;
        }
        break;
    }
    // No coordinates changed, there was a collision
    let collision = x === this.head.x && y === this.head.y;
    // Check to see if the snake ate food
    const food = intersects(this.game.food.getRect(), this.head.getRect());
    // TODO - check for intersection of head and segments
    if(this.segments.length > 1) {
      for(let x = 1; x < this.segments.length; x++) {
        const s = this.segments[x];
        if(this.head.x === s.x || this.head.y === s.y) {
          // debugger;
        }
      }
    }

    return { x, y, collision, speed, food };
  }
}