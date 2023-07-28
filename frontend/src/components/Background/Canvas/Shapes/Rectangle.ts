import Shape from './Shape';

type ClassConstructor = {
  x: number,
  y: number,
  fillColor?: string,
  width: number,
  height: number,
  context: CanvasRenderingContext2D
}

class Rectangle extends Shape {
  private width: number;
  private height: number;

  constructor({ x, y, fillColor = 'whitesmoke', width, height, context}: ClassConstructor) {
    super(x, y, fillColor, '', context);
    this.width = width;
    this.height = height;
  }

  render(): void {
    this.context.fillStyle = this.fillColor;
    this.context.fillRect(this.getX(), this.getY(), this.width, this.height);
  }
}

export default Rectangle;