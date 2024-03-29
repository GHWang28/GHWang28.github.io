import { rng } from '../../../../../utils';
import Arc from '../Arc';
import AnimatedShape from './AnimatedShape'

type ClassConstructor = {
  x: number,
  y: number,
  strokeColor?: string,
  context: CanvasRenderingContext2D
}

class RippleArc extends Arc implements AnimatedShape {
  static readonly MAX_DISTANCE: number = 90;
  static readonly MIN_RADIUS: number = 70;
  static readonly MAX_RADIUS: number = 85;
  static readonly GENERATE_INTERVAL_LENGTH = 1;

  private lifeSpan: number;
  private lifeLeft: number;
  private maxRadius: number;
  private lineWidth: number;
  private opacity: number;

  constructor({ x, y, strokeColor, context }: ClassConstructor) {
    super({
      x,
      y,
      strokeColor,
      radius: 0,
      endDegree: 360,
      context
    });
    this.lifeSpan = rng(50, 150) / 100;
    this.lifeLeft = this.lifeSpan;
    this.maxRadius = rng(RippleArc.MIN_RADIUS * 100, RippleArc.MAX_RADIUS * 100) / 100;
    this.opacity = 1;
    this.lineWidth = rng(50, 200) / 10
  }

  isExpired(): boolean { return this.lifeLeft <= 0 };

  animate(delta: number): void {
    this.lifeLeft = Math.max(0, this.lifeLeft - delta);
    this.radius = ((this.lifeSpan - this.lifeLeft) / this.lifeSpan) * this.maxRadius;
    this.opacity = this.lifeLeft / this.lifeSpan;
  }

  render():void {
    this.context.globalAlpha = this.opacity;
    this.context.lineWidth = this.lineWidth;
    super.render();
    this.context.globalAlpha = 0;
    this.context.lineWidth = 1;
  }
}

export default RippleArc;
