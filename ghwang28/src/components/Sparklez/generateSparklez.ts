import { rng } from '../../utils';
import { v4 } from 'uuid';
import { SparklezType } from '../../types';

const generateSparklez = (color = 'hsl(50deg, 100%, 50%)', size = rng(25, 75) ): SparklezType => {
  return {
    id: v4(),
    timestamp: Date.now(),
    color,
    size: size,
    style: {
      top:  `${rng(0, 100)}%`,
      left: `${rng(0, 100)}%`,
      zIndex: 2,
    }
  }
}

export default generateSparklez
