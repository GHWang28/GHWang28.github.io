import { rng } from '../../../../helpers';
import RainDropArc from '../Shapes/AnimatedShapes/RainDropArc';
import { renderAndAnimateShapes } from '../canvasRenderer';
import config from '../../../../config.json';

const rainAnim = (context: CanvasRenderingContext2D, maxRainDrop: number = 500): Function => {
  let lastTime = performance.now(), deltaTime = 0;
  let animationFrameID: number;
  let mainRainDrops: RainDropArc[] = [];
  let littleRainDrops: RainDropArc[] = [];

  // Every 250 ms, create new rain
  const interval = setInterval(() => {
    if (mainRainDrops.length < maxRainDrop) {
      mainRainDrops.push(...Array.from({ length: Math.ceil(maxRainDrop / 100) }, () => (
        new RainDropArc({
          x: rng(0, context.canvas.width),
          y: rng(0, -context.canvas.height / 2),
          radius: rng(5, 15),
          strokeColor: config.POSSIBLE_COLORS[rng(0, config.POSSIBLE_COLORS.length - 1)],
          context
        })
      )))
    }
  }, 250)


  // Render loop
  const render = (currentTime: number) => {
    // Calculate the delta time in seconds
    deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // Rendering main rain drops
    renderAndAnimateShapes(mainRainDrops, deltaTime);

    mainRainDrops = mainRainDrops.filter((raindrop) => {
      const isOnFloor = raindrop.isOnFloor();

      if (isOnFloor) {
        littleRainDrops.push(...raindrop.createSplash());
      }

      return !isOnFloor;
    });

    renderAndAnimateShapes(littleRainDrops, deltaTime);

    const newRainDrops: RainDropArc[] = [];

    littleRainDrops = littleRainDrops.filter((raindrop) => {
      const isOnFloor = raindrop.isOnFloor();

      if (isOnFloor) {
        newRainDrops.push(...raindrop.createSplash());
      }

      return !isOnFloor;
    })

    littleRainDrops.push(...newRainDrops);


    animationFrameID = window.requestAnimationFrame(render);
  }
  animationFrameID = window.requestAnimationFrame(render);

  return () => {
    window.cancelAnimationFrame(animationFrameID);
    clearInterval(interval);
  }
}

export default rainAnim;
