import AnimatedShape from './AnimatedShape';
import Arc from '../Arc';
import { colorToRGBA, rng } from '../../../../../helpers';

type ClassConstructor = {
  x: number,
  y: number,
  radius: number,
  velocityY?: number,
  velocityX?: number,
  strokeColor?: string,
  fillColor?: string,
  context: CanvasRenderingContext2D
}

class RainDropArc extends Arc implements AnimatedShape {
  static readonly GRAVITY = -980;
  static readonly GENERATE_INTERVAL_LENGTH = 0.3;

  private velocityX: number;
  private velocityY: number;
  
  constructor({ x, y, velocityX = 0, velocityY = -100, strokeColor = 'whitesmoke', fillColor, radius, context }: ClassConstructor) {
    super({ x, y, fillColor: fillColor || colorToRGBA(strokeColor, rng(5, 75) / 100), strokeColor, radius, context, endDegree: 360 });
    this.velocityX = velocityX;
    this.velocityY = velocityY;
  }

  animate(delta: number): void {
    this.velocityY += RainDropArc.GRAVITY * delta;

    this.setY(this.getY() - this.velocityY * delta);
    this.setX(this.getX() + this.velocityX);
  }

  createSplash(): RainDropArc[] {
    const newRadius = Math.floor(this.radius / 2.5);

    if (newRadius <= 0) return [];

    return Array.from({ length: rng(2, 5) }, () => (
      new RainDropArc({
        x: this.getX(),
        y: this.context.canvas.height - newRadius,
        radius: newRadius,
        velocityY: -this.velocityY * (rng(10, 130) / 100) / 2,
        velocityX: rng(-400, 400) / 100,
        strokeColor: this.strokeColor,
        fillColor: this.fillColor,
        context: this.context
      })
    ));
  }

  isOnFloor(): boolean {
    // Used to check if this rain droplet has hit the bottom
    return this.context.canvas.height <= this.getY();
  }

  render(): void {
    super.render();
  }
}

export default RainDropArc;
