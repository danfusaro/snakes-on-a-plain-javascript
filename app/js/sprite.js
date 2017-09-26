export class Sprite {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
  }
  getRect() {
    return {
      top: this.y,
      left: this.x,
      bottom: this.y + this.size,
      right: this.x + this.size
    };
  }

  draw(context) {
    context.fillStyle = this.color;
    context.beginPath();
    context.moveTo(this.x - (this.size / 2), this.y - (this.size / 2));
    context.lineTo(this.x + (this.size / 2), this.y - (this.size / 2));
    context.lineTo(this.x + (this.size / 2), this.y + (this.size / 2));
    context.lineTo(this.x - (this.size / 2), this.y + (this.size / 2));
    context.closePath();
    context.fill();
  }

}