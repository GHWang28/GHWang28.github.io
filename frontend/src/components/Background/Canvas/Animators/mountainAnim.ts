import { calcDistance2D, isMobileOrTablet } from '../../../../helpers';
import MountainShape from '../Shapes/AnimatedShapes/MountainShape';
import RadiantArc from '../Shapes/RadiantArc';
import { renderShapes } from '../canvasRenderer';

const mountainAnim = (context: CanvasRenderingContext2D): Function => {
  let lastTime = performance.now(), deltaTime = 0;
  let animationFrameID: number;
  let arrayOfMountains: MountainShape[] = [];
  let moon: RadiantArc[] = [];

  const middleY = { x: 0, y: window.innerHeight / 2 }
  const middleX = { x: window.innerWidth / 2, y: 0 }

  const generateScene = () => {

    moon = [new RadiantArc({
      x: Math.max(window.innerWidth * 0.1, 150),
      y: 250,
      radius: 150,
      endDegree: 360,
      stopColor: 'whitesmoke',
      opacity: 0.25,
      context
    })];

    arrayOfMountains = [
      new MountainShape({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        width: window.innerWidth + 2 * MountainShape.OFFSET,
        height: window.innerHeight + 2 * MountainShape.OFFSET,
        heightRatio: 0.85,
        opacity: 0.05,
        context,
        points: Math.ceil(window.innerWidth / 85),
        amplification: 0.6
      }),
      new MountainShape({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        width: window.innerWidth + 2 * MountainShape.OFFSET,
        height: window.innerHeight + 2 * MountainShape.OFFSET,
        heightRatio: 0.6,
        opacity: 0.1,
        context,
        points: Math.ceil(window.innerWidth / 50),
        amplification: 0.4
      }),
      new MountainShape({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        width: window.innerWidth + 2 * MountainShape.OFFSET,
        height: window.innerHeight + 2 * MountainShape.OFFSET,
        heightRatio: 0.35,
        opacity: 0.15,
        context,
        points: Math.ceil(window.innerWidth / 150),
        amplification: 0.5
      }),
      new MountainShape({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        width: window.innerWidth + 2 * MountainShape.OFFSET,
        height: window.innerHeight + 2 * MountainShape.OFFSET,
        heightRatio: 0.3,
        opacity: 0.2,
        context,
        points: Math.ceil(window.innerWidth / 150),
        amplification: 0.8
      })
    ]
  }
  generateScene();

  window.addEventListener('resize', generateScene);

  // Parallax via mouse
  const onMouseMove = (event: MouseEvent) => {
    const xDistance = calcDistance2D(
      { x: event.x, y: 0 },
      middleX
    ) / (window.innerWidth / 2);
    const yDistance = calcDistance2D(
      { x: 0, y: event.y },
      middleY
    ) / (window.innerHeight / 2);

    const left = (event.x < (window.innerWidth / 2)) ? 1 : -1;
    const up = event.y < (window.innerHeight / 2) ? 1 : -1;

    for (let i = 0; i < arrayOfMountains.length; ++i) {
      const amplification = (i + 1) / arrayOfMountains.length;
      arrayOfMountains[i].setXOffset(left * xDistance * MountainShape.OFFSET * amplification);
      arrayOfMountains[i].setYOffset(up * yDistance * MountainShape.OFFSET * amplification);
    }
  }

  // Parallax via device movement
  const onDeviceMotion = (event: DeviceOrientationEvent) => {
    const yDistance = Math.max(-1, Math.min(1, (event.beta || 0) / 90));
    const xDistance = Math.max(-1, Math.min(1, (event.gamma || 0) / 90));

    for (let i = 0; i < arrayOfMountains.length; ++i) {
      const amplification = (i + 1) / arrayOfMountains.length;
      arrayOfMountains[i].setXOffset(xDistance * MountainShape.OFFSET * amplification);
      arrayOfMountains[i].setYOffset(yDistance * MountainShape.OFFSET * amplification);
    }
  }

  if (isMobileOrTablet()) {
    window.addEventListener('deviceorientation', onDeviceMotion);
  } else {
    window.addEventListener('mousemove', onMouseMove);
  }

  // Render loop
  const render = (currentTime: number) => {
    // Calculate the delta time in seconds
    deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // Rendering Sun
    renderShapes(moon);

    // Rendering mountain
    for (let i = 0; i < arrayOfMountains.length; ++i) {
      context.globalCompositeOperation = 'destination-out';
      context.fillStyle = 'black'
      arrayOfMountains[i].createPath();
      context.fill();
      context.globalCompositeOperation = 'source-over';
      arrayOfMountains[i].render();
    }


    // Clearing
    animationFrameID = window.requestAnimationFrame(render);
  }
  animationFrameID = window.requestAnimationFrame(render);

  return () => {
    if (isMobileOrTablet()) {
      window.removeEventListener('deviceorientation', onDeviceMotion);
    } else {
      window.removeEventListener('mousemove', onMouseMove);
    }
    window.removeEventListener('resize', generateScene);
    window.cancelAnimationFrame(animationFrameID);
  }
}

export default mountainAnim;
