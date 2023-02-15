import React, { useState } from 'react';
import { Box, keyframes, useTheme } from "@mui/material";
import PropTypes from 'prop-types';
import BootstrapTooltip from '../BootstrapTooltip';

const tickScroll = keyframes`
  0% {
    translate: 0% 0%;
  }
  100% {
    translate: -50% 0%;
  }
`;

export default function ImageScroller ({ images, height, length = '10s', bgcolor, tooltips = [] }) {
  const themeMode = useTheme().palette.mode;
  const [hover, setHover] = useState(false);

  return (
    <Box
      sx={{
        overflowX: 'hidden',
        bgcolor,
        border: `2px solid ${(themeMode === 'dark') ? 'whitesmoke' : 'black'}`,
        borderRadius: '15px'
      }}
      onMouseEnter={() => { setHover(true) }}
      onMouseLeave={() => { setHover(false) }}
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
          <BootstrapTooltip key={`img-scroll-${index}`} title={tooltips.at(index % tooltips.length)}>
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

ImageScroller.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  itemGap: PropTypes.string,
  length: PropTypes.string,
  bgcolor: PropTypes.string,
  tooltips: PropTypes.arrayOf(PropTypes.string)
};
