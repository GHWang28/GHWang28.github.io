import { Box } from "@mui/material";
import { rng } from "../../helpers";

function SparklezInstance ({ color, size, sx }) {
  return (
    <Box
      component='span'
      className='sparklez-grow-shrink'
      sx={{ position: 'absolute', pointerEvents: 'none', ...sx, translate: '-50% -50%' }}
    >
      <Box
        component='svg'
        sx={{ transform: 'translate(-50000000%, 0)' }}
        width={size}
        height={size}
        viewBox='0 0 16 16'
        fill='none'
        className={(rng(0, 1)) ? 'sparklez-spin-clockwise' : 'sparklez-spin-anticlockwise'}
      >
        <path
          stroke='white'
          strokeWidth='1px'
          d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z'
          fill={color}
        />
      </Box>
    </Box>
  );
}

export default SparklezInstance;
