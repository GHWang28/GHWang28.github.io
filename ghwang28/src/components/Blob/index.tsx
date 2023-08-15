import React, { useEffect, useState } from 'react';
import { useSpring, animated, easings } from '@react-spring/web'
import { rng } from '../../helpers';
import { Box, SxProps } from '@mui/material';

type ComponentProps = {
  sx: SxProps,
  color: string,
  strokeWidth: number,
  speed: number,
  fill: string | 'none'
}

const allPaths = [
  {
    path: 'M67.4 -115.3C88.7 -104.3 108.4 -89.2 118.9 -69.3C129.4 -49.3 130.7 -24.7 125.6 -3C120.5 18.8 109 37.5 96.6 54.2C84.3 71 71.1 85.7 54.9 95C38.7 104.3 19.3 108.2 0 108.2C-19.3 108.2 -38.7 104.3 -57.7 96.6C-76.8 89 -95.5 77.5 -110.9 60.7C-126.2 44 -138.1 22 -139.7 -0.9C-141.3 -23.8 -132.6 -47.7 -117.8 -65.4C-103.1 -83.2 -82.3 -94.8 -61.6 -106.3C-41 -117.7 -20.5 -128.8 1.2 -131C23 -133.2 46 -126.3 67.4 -115.3',
    transform: 'translate(455.6988473581562 311.60410199462297)'
  },
  {
    path: 'M62.8 -114C80 -98.9 91.5 -79.2 101.5 -59.4C111.4 -39.7 119.7 -19.8 124 2.5C128.3 24.8 128.7 49.7 117.1 66.6C105.5 83.4 82 92.4 60.5 98.7C39 105.1 19.5 108.8 -0.6 109.8C-20.7 110.8 -41.3 109.1 -61.8 102.2C-82.3 95.3 -102.7 83.1 -111.5 65.2C-120.3 47.3 -117.7 23.7 -118.2 -0.3C-118.8 -24.3 -122.6 -48.7 -113.5 -66.1C-104.5 -83.6 -82.5 -94.2 -61.4 -107C-40.3 -119.9 -20.2 -134.9 1.3 -137.2C22.8 -139.5 45.7 -129.1 62.8 -114',
    transform: 'translate(446.36226215691386 313.72748035871547)'
  },
  {
    path: 'M59.2 -100.7C77.1 -92.3 92.3 -77.1 100.9 -59.2C109.6 -41.3 111.8 -20.7 112.2 0.2C112.7 21.2 111.3 42.3 104.8 64C98.3 85.6 86.7 107.8 68.3 120.7C50 133.6 25 137.3 3.2 131.8C-18.7 126.3 -37.3 111.7 -58.1 100.2C-78.9 88.7 -101.8 80.3 -116.6 64.2C-131.5 48 -138.2 24 -135.6 1.5C-133 -21 -121.1 -42 -108.4 -61.9C-95.7 -81.8 -82.4 -100.7 -64.2 -108.9C-46 -117.2 -23 -114.8 -1.2 -112.8C20.7 -110.8 41.3 -109.1 59.2 -100.7',
    transform: 'translate(461.92790593297235 290.23375834620373)'
  },
  {
    path: 'M64.3 -116.4C81.6 -101.4 92.8 -80.7 100.2 -60.4C107.6 -40 111.3 -20 111.6 0.2C111.9 20.3 108.8 40.7 100.4 59.4C92.1 78.2 78.6 95.4 60.9 104C43.3 112.6 21.7 112.5 0.2 112.2C-21.3 112 -42.7 111.4 -63.2 104.5C-83.7 97.6 -103.3 84.3 -117.3 65.8C-131.3 47.3 -139.7 23.7 -140.2 -0.3C-140.8 -24.3 -133.6 -48.7 -121 -69.6C-108.5 -90.5 -90.5 -108 -69.4 -120.9C-48.3 -133.7 -24.2 -141.9 -0.3 -141.3C23.5 -140.7 47 -131.4 64.3 -116.4',
    transform: 'translate(464.30753021334584 314.51843261024226)'
  },
  {
    path: 'M65.2 -117.2C81.5 -103.6 89.5 -79.9 95.9 -58.7C102.3 -37.5 107.1 -18.8 107.4 0.1C107.6 19 103.2 38 97 59.7C90.8 81.3 82.9 105.6 66.5 118.9C50 132.3 25 134.6 1.8 131.5C-21.3 128.3 -42.7 119.6 -62.6 108.2C-82.5 96.9 -101 83 -109.8 64.5C-118.7 46 -117.8 23 -118 -0.1C-118.1 -23.2 -119.3 -46.3 -110.3 -64.7C-101.4 -83 -82.5 -96.5 -62.4 -107.9C-42.3 -119.3 -21.2 -128.7 1.7 -131.5C24.5 -134.4 49 -130.9 65.2 -117.2',
    transform: 'translate(455.3497828820199 299.8608230157081)'
  },
]

const Blob = ({ sx, color, strokeWidth, speed = 500, fill = 'none' }: ComponentProps) => {
  const [pathId, setPathId] = useState(0);

  const animatedProps = useSpring({
    d: allPaths[pathId].path,
    transform: allPaths[pathId].transform,
    config: {
      duration: speed,
      easing: easings.easeInOutSine
    }
  })

  useEffect(() => {
    const timeout = setTimeout(() => {
      let randomlyGeneratedIndex = rng(0, allPaths.length - 1);
      while (randomlyGeneratedIndex === pathId) {
        randomlyGeneratedIndex = rng(0, allPaths.length - 1);
      }
      setPathId(randomlyGeneratedIndex);
    }, speed);
    return () => { clearTimeout(timeout) }
  })

  return (
    <Box component='svg' sx={sx} viewBox='0 0 900 600' width='900' height='600' xmlns='http://www.w3.org/2000/svg' version='1.1'>
      <animated.g transform={animatedProps.transform}>
        <animated.path
          d={animatedProps.d}
          fill={(fill === 'color') ? color : fill}
          stroke={color}
          strokeWidth={strokeWidth}
        />
      </animated.g>
    </Box>
  )
}

export default Blob;
