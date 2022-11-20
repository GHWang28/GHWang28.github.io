import { rng } from '../../helpers'
import { v4 } from 'uuid'

function generateSparklez (color = 'hsl(50deg, 100%, 50%)', size = rng(25, 75) ) {
  return {
    id: v4(),
    timestamp: Date.now(),
    color,
    size: size,
    sx: {
      top:  `${rng(0, 100)}%`,
      right: `${rng(0, 100)}%`,
      zIndex: 2,
    }
  }
}

export default generateSparklez
