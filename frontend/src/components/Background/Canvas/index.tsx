import React, { useEffect, useState, useRef } from 'react';
import { Box } from '@mui/material';
import blockPulsateAnim from './Animators/blockPulsateAnim';

type ComponentProps = {
  anim?: (arg: CanvasRenderingContext2D) => void;
}

const Canvas = ({ anim = (c: CanvasRenderingContext2D) => blockPulsateAnim(c, 100) }: ComponentProps) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  // Setup
  useEffect(() => {
    // Sets context
    if (ref.current) {
      setContext(ref.current.getContext('2d'));
    }

    // Adds resizer listener
    const resizeCanvas = () => {
      if (!ref.current) return;
      ref.current.width = window.innerWidth;
      ref.current.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      // Cleans up the event listener once component is unmounted
      window.removeEventListener('resize', resizeCanvas);
    }
  }, []);

  // Animate
  useEffect(() => {
    if (!context) return;
    return anim(context);
  }, [context, anim])


  return (
    <Box
      component='canvas'
      ref={ref}
    />
  )
}

export default Canvas;
