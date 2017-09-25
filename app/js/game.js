import { Renderer } from './renderer';
import { Food } from './food';
import { Snake } from './snake';
import { directions } from './util';

export class Game {
  constructor(config, element) {
    this.size = config.size;
    this.configuredSpeed = config.speed;
    this.colors = config.colors;
    this.levelUp = config.levelUp;
    this.canvas = this.createGameboard(element, config.width, config.height, config.colors);
    this.over = false;
    this.renderer = new Renderer(this, config.fps, this.canvas);
    window.addEventListener('keydown', (event) => this.keyHandler(event));
    this.start();
  }

  createGameboard(parent, width, height, colors) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    // TODO - checkerboard
    canvas.style.background = colors.board[0];
    parent.appendChild(canvas);
    return canvas;
  }

  keyHandler(event) {
    if(!this.over) {
      // Control the snake
      const direction =
        Object.keys(directions)
        .map(key => directions[key])
        .find(direction =>
          direction.keyCode === event.keyCode);
      if(!!direction) {
        this.snake.turn(direction);
      }
    } else {
      if(event.keyCode === 13) {
        this.start();
      }
    }
  }

  start() {
    this.over = false;
    this.score = 0;
    this.level = 1;
    this.generateFood();
    this.snake = new Snake(this, this.size, this.colors.snake, this.speed);
    this.renderer.reset();
    this.renderer.draw();
  }

  get speed() {
    return this.configuredSpeed * this.level;
  }

  generateFood() {
    this.food = new Food(this.canvas, this.size, this.colors.food);
  }

  scored() {
    this.score++;
    if(this.score % this.levelUp === 0) {
      this.level++;
    }
    this.generateFood();
    console.log('New score', this.score, this.renderer.fps, 'fps');
  }

  stop() {
    this.over = true;
    // Game over
    console.log('You lose');
  }

}