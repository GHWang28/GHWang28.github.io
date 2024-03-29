import PulsatingSquare from '../Shapes/AnimatedShapes/PulsatingSquare';
import { renderAndAnimateShapes } from '../canvasRenderer';

const blockPulsateAnim = (context: CanvasRenderingContext2D): Function => {
  let lastTime = performance.now(), deltaTime = 0;
  let animationFrameID: number;
  let arrayOfShapes: PulsatingSquare[] = []

  const generateShapes = () => {
    const dim = (window.innerWidth > 1200) ? (
      150
    ) : (window.innerWidth > 992) ? (
      130
    ) : (window.innerWidth > 768) ? (
      110
    ) : (window.innerWidth > 576) ? (
      90
    ) : (
      70
    )
    
    const totalRow = Math.ceil(window.innerHeight / dim);
    const totalCol = Math.ceil(window.innerWidth / dim);

    arrayOfShapes = Array.from({ length: totalRow * totalCol }, (_, index) => (
      new PulsatingSquare({
        x: (index % totalCol) * dim,
        y: Math.floor(index / totalCol) * dim,
        dim,
        context
      })
    ))
  }
  generateShapes();

  window.addEventListener('resize', generateShapes);

  // Render loop
  const render = (currentTime: number) => {
    // Calculate the delta time in seconds
    deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    // Rendering Shape
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    renderAndAnimateShapes(arrayOfShapes, deltaTime);
    animationFrameID = window.requestAnimationFrame(render);
  }
  animationFrameID = window.requestAnimationFrame(render);

  return () => {
    window.cancelAnimationFrame(animationFrameID);
    window.removeEventListener('resize', generateShapes);
  }
}

export default blockPulsateAnim;
