import { directions, intersects } from './util';
import { Segment } from './segment';

export class Snake {
  constructor(game, size, color) {
    this.canvas = game.canvas;
    // Start in the middle
    this.segments = [new Segment(
      Math.round((game.canvas.width - size) / 2),
      Math.round((game.canvas.height - size) / 2),
      size,
      color)];
    // Defaults to right-moving
    this.direction = directions.right;
    this.game = game;
    this.size = size;
    this.color = color;
    this.growing = false;
  }

  update(context) {
    const boundsInfo = this.getBoundsInfo();
    // Start rendering loop
    this.segments.push(new Segment(boundsInfo.x, boundsInfo.y, this.size, this.color));

    // Food was eaten
    if(boundsInfo.food) {
      this.game.scored();
      // Add segment at a certain length of time based on game speed and animation performance
      this.growing = true;
      const timeStamp = performance.now();
      requestAnimationFrame(() => {
        const diff = Math.round(performance.now() - timeStamp);
        const time = Math.floor(this.size / this.game.speed) * diff;
        setTimeout(() => {
            this.segments.push(new Segment(boundsInfo.x, boundsInfo.y, this.size, this.color));
            this.growing = false;
          },
          time);
      });
    } else if(!this.growing) {
      // If there was no growth, remove last added segment
      this.segments.splice(0, 1);
    }

    // There was a collision, game over
    if(boundsInfo.collision) {
      this.game.stop();
    }

    // Motion
    this.head.x = boundsInfo.x;
    this.head.y = boundsInfo.y;

    // Draw all segments
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

  getBoundsInfo() {

    let x = this.head.x;
    let y = this.head.y;

    const min = this.size / 2;
    const bounds = { width: this.canvas.width - min, height: this.canvas.height - min };
    // Speed based on level
    const speed = this.game.speed;
    let collisonSelf;

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

    // Test for head collision with a segment
    for(let i = 1; i < this.segments.length; i++) {
      const s = this.segments[i];
      if(x === s.x && y === s.y) {
        collisonSelf = true;
        break;
      }
    }

    // No coordinates changed, there was a collision or head collided with segment
    let collision = (x === this.head.x && y === this.head.y) || collisonSelf;

    // Check to see if the snake ate food
    const food = intersects(this.game.food.getRect(), this.head.getRect());

    return { x, y, collision, speed, food };
  }
}