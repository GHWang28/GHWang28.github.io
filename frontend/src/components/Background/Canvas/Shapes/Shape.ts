abstract class Shape {
  protected fillColor: string;
  protected strokeColor: string;

  protected x: number;
  protected y: number;

  protected context: CanvasRenderingContext2D;

  constructor(x: number, y: number, fillColor: string, strokeColor: string, context: CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
    this.context = context;
  }

  abstract render():void;
}

export default Shape;