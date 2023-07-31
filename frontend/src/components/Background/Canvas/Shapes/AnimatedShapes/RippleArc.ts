import { rng } from '../../../../../helpers';
import Arc from '../Arc';
import AnimatedShape from './AnimatedShape'

type ClassConstructor = {
  x: number,
  y: number,
  strokeColor?: string,
  context: CanvasRenderingContext2D
}

class RippleArc extends Arc implements AnimatedShape {
  static readonly OFFSET: number = 15;
  static readonly MAX_DISTANCE: number = 90;
  static readonly MIN_RADIUS: number = 80;
  static readonly MAX_RADIUS: number = 150;

  private lifeSpan: number;
  private lifeLeft: number;
  private maxRadius: number;
  private lineWidth: number;
  private opacity: number;

  constructor({ x, y, strokeColor, context }: ClassConstructor) {
    super({
      x: x + rng(-RippleArc.OFFSET, RippleArc.OFFSET),
      y: y + rng(-RippleArc.OFFSET, RippleArc.OFFSET),
      strokeColor,
      radius: 0,
      endDegree: 360,
      context
    });
    this.lifeSpan = rng(50, 200) / 100;
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
