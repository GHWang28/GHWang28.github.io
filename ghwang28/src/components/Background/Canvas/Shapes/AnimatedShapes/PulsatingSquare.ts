import { rng } from '../../../../../utils';
import AnimatedShape from './AnimatedShape';
import Rectangle from '../Rectangle';

type ClassConstructor = {
  x: number,
  y: number,
  fillColor?: string,
  dim: number,
  context: CanvasRenderingContext2D
}

class PulsatingSquare extends Rectangle implements AnimatedShape {
  static readonly MAX_WAIT: number = 40;
  static readonly OPACITY_VELOCITY: number = 0.4;
  static readonly GRAVITY: number = -0.5;

  private opacity: number;
  private opacityVelocity: number;
  private nextPulsate: number;
  private state: State;

  constructor({ x, y, fillColor = 'whitesmoke', dim, context}: ClassConstructor) {
    super({ x, y, fillColor, width: dim, height: dim, context });
    this.opacity = 0;
    this.opacityVelocity = 0;
    this.nextPulsate = rng(0, PulsatingSquare.MAX_WAIT) / 3;
    this.state = new WaitState(this);
  }

  animate(delta: number): void {
    this.state.animate(delta);
  }

  render(): void {
    this.context.globalAlpha = Math.min(1, this.opacity);
    super.render();
    this.context.globalAlpha = 0;
  }

  wait(delta: number): void {
    if (this.nextPulsate <= 0) {
      this.nextPulsate = rng(0, PulsatingSquare.MAX_WAIT) / 3;
      this.opacityVelocity = PulsatingSquare.OPACITY_VELOCITY;
      this.state = new PulsateState(this);
    } else {
      this.nextPulsate -= delta;
    }
  }

  pulsate = (delta: number): void => {
    this.opacityVelocity += PulsatingSquare.GRAVITY * delta;
    this.opacity = Math.max(this.opacity + this.opacityVelocity * delta, 0);

    if (this.opacity === 0) {
      this.state = new WaitState(this);
    }
  }
}

// States of the pulsating square

abstract class State {
  protected context: PulsatingSquare;

  constructor(context: PulsatingSquare) {
    this.context = context;
  }

  abstract animate(delta: number): void;
}

class PulsateState extends State {
  animate(delta: number): void {
    this.context.pulsate(delta);
  }
}

class WaitState extends State {
  animate(delta: number): void {
    this.context.wait(delta);
  }
}

export default PulsatingSquare;
