import React, { useEffect, useState } from 'react';
import generateSparklez from './generateSparklez';
import SparklezInstance from './SparklezInstance';
import { rng } from '../../helpers';
import { SparklezType } from '../../types';

type ComponentProps = {
  children: React.ReactNode,
  frequency?: number,
  sizeRange?: [number, number]
}

const sparkleColors = [
  'hsl(50deg, 100%, 50%)',
  '#EE7752',
  '#E73C7E',
  '#23A6D5',
  '#23D5AB',
  'rgb(150, 246, 246)'
]

const Sparklez = ({ children, frequency = 1, sizeRange = [5, 15] }: ComponentProps) => {
  const [sparklez, setSparklez] = useState<SparklezType[]>([]);

  useEffect(() => {
    const addSpaklezTimer = setTimeout(() => {
      // Delete old sparklez
      const currTime = Date.now();
      const copySparklez = sparklez.filter((instance) => (
        currTime - instance.timestamp <= 1000
      ));

      // Generate new sparklez
      setSparklez([
        ...copySparklez,
        generateSparklez(
          sparkleColors[rng(0, sparkleColors.length - 1)],
          rng(sizeRange[0], sizeRange[1])
        )
      ]);

    }, rng(5, Math.max(2000 / frequency, 10)));
  
    return () => clearTimeout(addSpaklezTimer);
  });

  return (
    <span
      style={{
        position: 'relative',
        display: 'inline-block'
      }}
    >
      {sparklez.map((instance) => (
        <SparklezInstance
          key={`sparklez-${instance.id}`}
          color={instance.color}
          size={instance.size}
          {...instance.style}
        />
      ))}
      <span
        style={{
          position: 'relative',
          zIndex: 1,
          fontWeight: 'bold'
        }}
      >
        {children}
      </span>
    </span>
  )
}

export default Sparklez;
