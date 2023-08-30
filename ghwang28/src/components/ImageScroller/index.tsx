import React, { useState } from 'react';
import { Box, keyframes, useTheme } from "@mui/material";
import BootstrapTooltip from '../BootstrapTooltip';

type ComponentProps = {
  images: string[],
  height?: string,
  length?: string,
  bgcolor?: string,
  tooltips?: string[],
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

const tickScroll = keyframes`
  0% {
    translate: 0% 0%;
  }
  100% {
    translate: -50% 0%;
  }
`;

const ImageScroller = ({ images, height, length = '10s', bgcolor, tooltips = [], onClick }: ComponentProps) => {
  const lightMode = useTheme().palette.mode === 'light';
  const [hover, setHover] = useState<boolean>(false);

  return (
    <Box
      sx={{
        overflowX: 'hidden',
        bgcolor,
        border: `2px solid ${(lightMode) ? 'black' : 'whitesmoke'}`,
        borderRadius: '15px',
        cursor: (onClick != null) ? 'pointer' : 'default'
      }}
      onMouseEnter={() => { setHover(true) }}
      onMouseLeave={() => { setHover(false) }}
      onClick={onClick}
    >
      <Box
        sx={{
          width: 'fit-content',
          height,
          display: 'flex',
          animation: `${tickScroll} ${length} linear infinite`,
          animationPlayState: (hover) ? 'paused' : 'running'
        }}
      >
        {([...images, ...images].map((src, index) => (
          <BootstrapTooltip key={`img-scroll-${index}`} title={tooltips[index % tooltips.length]}>
            <Box
              sx={{
                height,
                minWidth: height,
                display: 'flex',
                overflow: 'clip',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Box
                component='img'
                draggable={false}
                sx={{ height: '90%' }}
                alt={`skill-${index}`}
                src={src}
              />
            </Box>
          </BootstrapTooltip>
        )))}
      </Box>
    </Box>
  )
}

export default ImageScroller;
