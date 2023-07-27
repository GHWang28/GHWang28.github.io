import { calcDistance2D } from '../../../../helpers';
import { Position } from '../../../../types';
import RippleArc from '../Shapes/RippleArc';
import { renderAndAnimateShapes } from '../canvasRenderer';

const rippleAnim = (context: CanvasRenderingContext2D) => {
  let lastTime = performance.now(), deltaTime = 0;
  let lastPos: Position | null = null; 
  let animationFrameID: number;
  let arrayOfShapes: RippleArc[] = [];

  setTimeout(() => {
    arrayOfShapes.push(
      new RippleArc({
        x: Math.ceil(window.innerWidth / 2),
        y: Math.ceil(window.innerHeight / 2),
        context
      })
    )
  }, 5);

  const genNewShape = (pos: Position) => {
    arrayOfShapes.push(
      new RippleArc({
        ...pos,
        context
      })
    )
  }

  const generateNewShapesByMovement = (event: MouseEvent) => {
    const currPos: Position = {
      x: event.x,
      y: event.y
    }
    if (calcDistance2D(currPos, lastPos) > RippleArc.MAX_DISTANCE) {
      genNewShape(currPos);
      lastPos = currPos;
    }
  }

  const generateNewShapesByClick = (event: MouseEvent) => {
    genNewShape({ x: event.x, y: event.y });
  }

  window.addEventListener('mousemove', generateNewShapesByMovement);
  window.addEventListener('mousedown', generateNewShapesByClick);

  const render = (currentTime: number) => {
    // Calculate the delta time in seconds
    deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

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
