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
    this.gameOver = true;
    this.renderer = new Renderer(this, this.canvas, config.font);
    // Intro text
    this.renderer.text('SNAKE!', config.width / 2, config.height / 2);
    this.renderer.text('Press Enter to Start', config.width / 2, config.height / 2 + 50, { size: '3vh' });
    // Add global key handlers
    window.addEventListener('keydown', (event) => this.keyHandler(event));
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
    if(!this.gameOver) {
      // Control the snake
      const direction =
        Object.keys(directions)
        .map(key => directions[key])
        .find(direction =>
          direction.keyCode === event.keyCode);
      if(direction) {
        this.snake.turn(direction);
      }
    } else {
      if(event.keyCode === 13) {
        this.start();
      }
    }
  }

  start() {
    this.gameOver = false;
    this.score = 0;
    this.level = 1;
    this.generateFood();
    this.snake = new Snake(this, this.size, this.colors.snake, this.speed);
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
  }

  stop() {
    this.gameOver = true;
    // Intro text
    this.renderer.text('Game Over!', this.canvas.width / 2, this.canvas.height / 2);
    // TODO - real math for laying out text
    this.renderer.text('Press Enter to Play Again', this.canvas.width / 2, this.canvas.height / 2 + 50, { size: '3vh' });
  }

}