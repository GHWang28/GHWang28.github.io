abstract class Shape {
  protected fillColor: string;
  protected strokeColor: string;

  private x: number;
  private y: number;

  private xOffset: number;
  private yOffset: number;

  protected context: CanvasRenderingContext2D;

  constructor(x: number, y: number, fillColor: string, strokeColor: string, context: CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
    this.context = context;
    this.yOffset = 0;
    this.xOffset = 0;
  }

  protected getX(): number {
    return this.xOffset + this.x;
  }

  setXOffset(offset: number): void {
    this.xOffset = offset;
  }

  setYOffset(offset: number): void {
    this.yOffset = offset;
  }

  protected getY(): number {
    return this.yOffset + this.y;
  }

  abstract render():void;
}

export default Shape;