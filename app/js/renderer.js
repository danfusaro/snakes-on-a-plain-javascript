export class Renderer {
  constructor(game, canvas, font) {
    this.game = game;
    this.font = font;
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // Draw food 
    this.game.food.draw(this.context);
    // Draw snake
    this.game.snake.update(this.context);

    this.text(`Level: ${this.game.level}`, 105, 50);
    this.text(`Score: ${this.game.score}`, this.canvas.width - 150, this.canvas.height - 30);

    if(this.game.gameOver === false) {
      // Rendering thread
      setTimeout(() => {
        requestAnimationFrame(() => this.draw());
      });
    }
  }

  text(value, x, y, props = {}) {
    this.context.fillStyle = props.color || 'white';
    const size = props.size || '5vh';
    this.context.font = `${size} ${props.font || this.font}`;
    this.context.textAlign = props.textAlign || 'center';
    this.context.fillText(value, x, y);
  }

}