import { convertDegToRad } from "../../../../helpers";
import Shape from "./Shape";

type ClassConstructor = {
  x: number,
  y: number,
  fillColor?: string,
  strokeColor?: string,
  radius: number,
  startDegree?: number,
  endDegree: number,
  context: CanvasRenderingContext2D
}

class Arc extends Shape {
  protected radius: number;
  private startDegree: number;
  private endDegree: number;  

  constructor({ x, y, fillColor = '', strokeColor = 'whitesmoke', radius, startDegree = 0, endDegree, context}: ClassConstructor) {
    super(x, y, fillColor, strokeColor, context);
    this.startDegree = convertDegToRad(startDegree);
    this.endDegree = convertDegToRad(endDegree);
    this.radius = radius;
  }

  render(): void {
    this.context.strokeStyle = this.strokeColor || 'rgba(0,0,0,0)';
    this.context.fillStyle = this.fillColor || 'rgba(0,0,0,0)';

    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, this.startDegree, this.endDegree);
    this.context.fill();
    this.context.stroke();

    this.context.closePath();
  }
}

export default Arc;
