import React, { useState } from 'react';
import packageJson from '../../../package.json';
import { Box, Collapse, IconButton, Typography, useTheme } from "@mui/material";
import { useSpring, animated, easings } from '@react-spring/web';
import CodeIcon from '@mui/icons-material/Code';
import BootstrapTooltip from '../BootstrapTooltip';
import Ticker from '../Ticker';
import config from '../../config.json';

const VersionNumber = () => {
  const [hover, setHover] = useState(false);
  const themeMode = useTheme().palette.mode;
  const AnimatedTypography = animated(Typography);
  const animationProps = useSpring({
    from: { y: 100 },
    to: { y: 0 },
    delay: 2250,
    config: {
      duration: 1000,
      easing: easings.easeOutBounce
    }
  })

  return (
    <Box
      sx={{
        overflow: 'hidden',
        position: 'fixed',
        left: '10px',
        bottom: '0px',
        color: (themeMode === 'light') ? 'rgb(79,89,91)' : 'whitesmoke'
      }}
      onMouseEnter={() => { setHover(true) }}
      onMouseLeave={() => { setHover(false) }}
    >
      <AnimatedTypography
        style={animationProps}
        fontSize={24}
        fontWeight='bold'
        sx={{
          opacity: (hover) ? '1.0' : '0.4',
          transition: 'opacity 0.3s ease-in-out',
          userSelect: 'none'
        }}
      >
        {`v${packageJson.version}`}
      </AnimatedTypography>
      <Collapse in={hover} orientation='vertical'>
        <Box
          sx={{
            display: 'flex',
            whiteSpace: 'noWrap',
            fontSize: 24,
            alignItems: 'center',
            mb: 1
          }}
        >
          <BootstrapTooltip title={'Go to this Website\'s Repository'} arrow>
            <IconButton
              sx={{ border: `1px solid ${(themeMode === 'light') ? 'rgb(79,89,91)' : 'whitesmoke'}`, mr: 1 }}
              href={'https://github.com/GHWang28/GHWang28.github.io'}
              target='_blank'
            >
              <CodeIcon />
            </IconButton>
          </BootstrapTooltip>
          <Ticker width='40vw'>
            {`(${config.LATEST_UPDATE}) ${config.LATEST_COMMIT}`}
          </Ticker>
        </Box>
      </Collapse>
    </Box>
  )
}

export default VersionNumber;
