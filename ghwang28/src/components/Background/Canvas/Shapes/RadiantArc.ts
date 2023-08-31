import { colorToRGBA } from '../../../../utils';
import { CSSColorKeyword } from '../../../../types';
import Arc from './Arc';

type ClassConstructor = {
  x: number,
  y: number,
  fillColor?: string,
  strokeColor?: string,
  radius: number,
  startDegree?: number,
  endDegree: number,
  stopColor: CSSColorKeyword,
  opacity?: number,
  context: CanvasRenderingContext2D
}

class RadiantArc extends Arc {

  private stopColor: string;
  private opacity: number;

  constructor({ opacity = 0.5, ...parameters } : ClassConstructor) {
    super(parameters);
    this.stopColor = colorToRGBA(parameters.strokeColor || 'whitesmoke', 0);
    this.opacity = opacity;
  }

  render(): void {
    this.context.globalAlpha = this.opacity;

    const x = this.getX();
    const y = this.getY();

    const gradient = this.context.createRadialGradient(x, y, 0, x, y, this.radius);
    gradient.addColorStop(0, this.stopColor);
    gradient.addColorStop(0.55, this.stopColor);
    gradient.addColorStop(0.6, this.strokeColor);
    gradient.addColorStop(1, this.stopColor);

    this.context.beginPath();
    this.context.arc(x, y, this.radius, this.startDegree, this.endDegree);
    this.context.fillStyle = gradient;
    this.context.fill();
    this.context.closePath();

    this.context.globalAlpha = 1;
  }
}

export default RadiantArc;
