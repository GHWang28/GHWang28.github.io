import { rng } from '../../../../helpers';
import RainDropArc from '../Shapes/AnimatedShapes/RainDropArc';
import { renderAndAnimateShapes } from '../canvasRenderer';
import config from '../../../../config.json';

const rainAnim = (context: CanvasRenderingContext2D): Function => {
  let lastTime = performance.now(), deltaTime = 0, createRainDropTimer = 0;
  let animationFrameID: number;
  let rainDrops: RainDropArc[] = [];

  // Render loop
  const render = (currentTime: number) => {
    // Calculate the delta time in seconds
    deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    const maxRainDrop = Math.floor(window.innerWidth / 4);
    // Generate new raindrops if needed
    if (createRainDropTimer < 0 && rainDrops.length < maxRainDrop) {
      createRainDropTimer = RainDropArc.GENERATE_INTERVAL_LENGTH;
      rainDrops.push(
        ...Array.from({ length: 2 + rng(0, Math.ceil(maxRainDrop / 100)) }, () => (
          new RainDropArc({
            x: rng(0, context.canvas.width),
            y: rng(0, -context.canvas.height / 2),
            radius: rng(200, 2500) / 100,
            strokeColor: config.POSSIBLE_COLORS[rng(0, config.POSSIBLE_COLORS.length - 1)],
            context
          })
        ))
      );
    } else if (createRainDropTimer >= 0) {
      createRainDropTimer -= deltaTime
    }

    // Filter and render raindrops
    const newRainDrops: RainDropArc[] = [];
    rainDrops = rainDrops.filter((raindrop) => {
      const isOnFloor = raindrop.isOnFloor();
      if (isOnFloor) {
        newRainDrops.push(...raindrop.createSplash());
      }
      return !isOnFloor;
    });

    rainDrops.push(...newRainDrops);

    // Render and animate raindrops
    renderAndAnimateShapes(rainDrops, deltaTime);

    animationFrameID = window.requestAnimationFrame(render);
  };

  animationFrameID = window.requestAnimationFrame(render);

  return () => {
    window.cancelAnimationFrame(animationFrameID);
  };
};

export default rainAnim;