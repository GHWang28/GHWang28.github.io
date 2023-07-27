import { rng } from "../../../../helpers";
import AnimatedShape from "./AnimatedShape"
import Arc from "./Arc"

type ClassConstructor = {
  x: number,
  y: number,
  context: CanvasRenderingContext2D
}

class RippleArc extends Arc implements AnimatedShape {
  static readonly OFFSET: number = 15;
  static readonly MAX_DISTANCE: number = 90;
  static readonly MIN_RADIUS: number = 80;
  static readonly MAX_RADIUS: number = 190;

  private lifeSpan: number;
  private lifeLeft: number;

  private maxRadius: number;

  private opacity: number;

  constructor({ x, y, context}: ClassConstructor) {
    super({
      x: x + rng(-RippleArc.OFFSET, RippleArc.OFFSET),
      y: y + rng(-RippleArc.OFFSET, RippleArc.OFFSET),
      radius: 0,
      endDegree: 360,
      context
    });
    this.lifeSpan = rng(1, 4) / 2;
    this.lifeLeft = this.lifeSpan;
    this.maxRadius = rng(RippleArc.MIN_RADIUS, RippleArc.MAX_RADIUS);
    this.opacity = 1;
  }

  isExpired(): boolean { return this.lifeLeft <= 0 };

  animate(delta: number): void {
    this.lifeLeft = Math.max(0, this.lifeLeft - delta);
    this.radius = ((this.lifeSpan - this.lifeLeft) / this.lifeSpan) * this.maxRadius;
    this.opacity = this.lifeLeft / this.lifeSpan;
  }

  render():void {
    this.context.globalAlpha = this.opacity;
    super.render();
    this.context.globalAlpha = 0;
  }
}

export default RippleArc;
