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

  protected getY(): number {
    return this.yOffset + this.y;
  }

  protected setX(x: number) {
    this.x = x;
  }

  protected setY(y: number) {
    this.y = y;
  }

  setXOffset(offset: number): void {
    this.xOffset = offset;
  }

  setYOffset(offset: number): void {
    this.yOffset = offset;
  }

  

  abstract render(): void;

  abstract createPath(): void;
}

export default Shape;