export class Renderer {
  constructor(game, fps, canvas) {
    this.game = game;
    this.fps = fps;
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // Draw food 
    this.game.food.draw(this.context);
    // Draw snake
    this.game.snake.update(this.context);

    if(this.game.over === false) {
      // Rendering thread
      setTimeout(() => {
        requestAnimationFrame(() => this.draw());
      }, 1000 / this.fps);
    }
  }

}