import Shape from './Shapes/Shape';
import AnimatedShape from './Shapes/AnimatedShapes/AnimatedShape';

export const renderShapes = (arrayOfShapes: Shape[]) => {
  arrayOfShapes.forEach((shape: Shape) => {
    shape.render();
  })
}

export const renderAndAnimateShapes = (arrayOfShapes: (Shape & AnimatedShape)[], delta: number) => {
  arrayOfShapes.forEach((shape: (Shape & AnimatedShape)) => {
    shape.render();
    shape.animate(delta);
  })
}
