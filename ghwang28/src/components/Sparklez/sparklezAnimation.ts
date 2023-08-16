import { keyframes } from '@mui/material';


export const growShrink = keyframes`
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`

export const spinAntiClockwise = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-135deg);
  }
`
export const spinClockwise = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(135deg);
  }
`
