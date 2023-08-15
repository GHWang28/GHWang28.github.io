import { rng } from '../../../../../helpers';
import { Position } from '../../../../../types';
import Shape from '../Shape';

type ClassConstructor = {
  x: number,
  y: number,
  fillColor?: string,
  strokeColor?: string,
  height?: number,
  width?: number,
  heightRatio?: number,
  points: number,
  opacity?: number,
  amplification: 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1,
  context: CanvasRenderingContext2D
}

class MountainShape extends Shape {
  static readonly OFFSET: number = 100;

  private points: Position[];
  private width: number;
  private height: number;
  private opacity: number;

  constructor({
    x, y, fillColor = 'whitesmoke', strokeColor = 'whitesmoke', context,
    height = window.innerHeight,
    width = window.innerWidth,
    points,
    opacity = 0.5,
    heightRatio = 0.5,
    amplification
  }: ClassConstructor) {
    super(x, y, fillColor, strokeColor, context)

    this.width = width;
    this.height = height;
    this.opacity = opacity;

    const minX = width / 2;
    const minY = height / 2;

    const gapBetweenPoints = width / (points - 1);

    const trueHeight = height * heightRatio;

    this.points = [];
    for (let i = 0; i < points; ++i) {
      this.points.push({
        x: -minX + (gapBetweenPoints * i),
        y: minY + -rng((1 - amplification) * trueHeight, trueHeight)
      })
    }
  }
  
  public createPath(): void {
    const x = this.getX();
    const y = this.getY();

    this.context.beginPath();
    this.context.moveTo(this.points[0].x + x, this.points[0].y + y);

    for (let i = 1; i < this.points.length - 2; i++) {
      const xc = (this.points[i].x + this.points[i + 1].x) / 2 + x;
      const yc = (this.points[i].y + this.points[i + 1].y) / 2 + y;
      this.context.quadraticCurveTo(this.points[i].x + x, this.points[i].y + y, xc, yc);
    }

    this.context.quadraticCurveTo(
      this.points[this.points.length - 2].x + x,
      this.points[this.points.length - 2].y + y,
      this.points[this.points.length - 1].x + x,
      this.points[this.points.length - 1].y + y
    );

    this.context.lineTo(x + this.width / 2, y + this.height / 2);
    this.context.lineTo(x - this.width / 2, y + this.height / 2);
    this.context.closePath();
  }

  render(): void {
    this.context.globalAlpha = this.opacity;
    this.createPath();

    this.context.strokeStyle = this.strokeColor;
    this.context.fillStyle = this.fillColor;
    this.context.fill();
    this.context.globalAlpha = 1;

    /*
    for (const pt of this.points) {
      const c = new Arc({ x: pt.x + x, y: pt.y + y, radius: 10, endDegree: 360, context: this.context, fillColor: 'blue' });
      c.render();
    }
    */
  }
}

export default MountainShape;
