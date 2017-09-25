export class Renderer {
  constructor(game, fps, canvas) {
    this.game = game;
    this.fps = fps;
    this.configuredFps = fps;
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
  }

  reset() {
    this.fps = this.configuredFps;
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
      });
    }
  }

}