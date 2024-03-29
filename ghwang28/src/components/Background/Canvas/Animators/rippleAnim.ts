import { rng, throttle } from '../../../../utils';
import { GenericFunction, Position } from '../../../../types';
import RippleArc from '../Shapes/AnimatedShapes/RippleArc';
import { renderAndAnimateShapes } from '../canvasRenderer';
import config from '../../../../config.json';

const rippleAnim = (context: CanvasRenderingContext2D): GenericFunction => {
  let lastTime = performance.now(), deltaTime = 0, createRippleTimer = 0;
  let animationFrameID: number;
  let arrayOfShapes: RippleArc[] = [];

  const genRipple = (pos: Position[] = []) => {
    for (const p of pos) {
      arrayOfShapes.push(
        new RippleArc({
          ...p,
          strokeColor: config.POSSIBLE_COLORS[rng(0, config.POSSIBLE_COLORS.length - 1)],
          context
        })
      )
    }
  }

  const genRippleThrottle = throttle(genRipple, 125);

  // Generates the new shape via mouse movement
  const generateNewShapesByMovement = (event: MouseEvent) => {
    const currPos: Position = {
      x: event.x,
      y: event.y
    }
    genRippleThrottle([currPos]);
  }

  // Generate new shapes via mouse clicking
  const generateNewShapesByClick = (event: MouseEvent) => {
    genRipple([{ x: event.x, y: event.y }]);
  }

  window.addEventListener('mousemove', generateNewShapesByMovement);
  window.addEventListener('mousedown', generateNewShapesByClick);

  // Render loop
  const render = (currentTime: number) => {
    // Calculate the delta time in seconds
    deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    if (createRippleTimer < 0) {
      createRippleTimer = RippleArc.GENERATE_INTERVAL_LENGTH;
      genRipple(Array.from({ length: rng(1,2) }, () => (
        { x: rng(0, context.canvas.width), y: rng(0, context.canvas.height) }
      )));
    } else {
      createRippleTimer -= deltaTime;
    }

    // Rendering Shape
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    renderAndAnimateShapes(arrayOfShapes, deltaTime);
    animationFrameID = window.requestAnimationFrame(render);

    // Filtering out expired
    arrayOfShapes = arrayOfShapes.filter((ripple: RippleArc) => !ripple.isExpired());
  }
  animationFrameID = window.requestAnimationFrame(render);

  return () => {
    window.cancelAnimationFrame(animationFrameID);
    window.removeEventListener('mousemove', generateNewShapesByMovement);
    window.removeEventListener('mousedown', generateNewShapesByClick);
  }
}

export default rippleAnim;
