import React, { useState } from 'react';
import config from '../../config.json';
import { Box, Collapse, IconButton, Typography } from "@mui/material";
import GitInfo from 'react-git-info/macro'
import { ISOToDateStr } from '../../helpers';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useSpring, animated } from 'react-spring';
import BootstrapTooltip from '../BootstrapTooltip';
import Ticker from '../Ticker';

function VersionNumber () {
  const gitInfo = GitInfo();
  const [hover, hoverState] = useState(false);
  const animationProps = useSpring({
    from: { y: 50 },
    to: { y: 0 }
  })
  const AnimatedTypography = animated(Typography);
  return (
    <Box
      sx={{ overflow: 'hidden', position: 'absolute', left: '10px', bottom: '0px'}}
      onMouseEnter={() => { hoverState(true) }}
      onMouseLeave={() => { hoverState(false) }}
    >
      <AnimatedTypography
        style={animationProps}
        fontFamily='my-handwriting'
        fontSize={24}
        fontWeight='bold'
        sx={{ opacity: (hover) ? '1.0' : '0.4', transition: 'opacity 0.3s ease-in-out' }}
      >
        {`v${config['VERSION-NUMBER']}`}
      </AnimatedTypography>
      <Collapse in={hover} orientation='vertical'>
          <Box
            sx={{
              display: 'flex',
              fontFamily: 'my-handwriting',
              whiteSpace: 'noWrap',
              fontSize: 24,
              alignItems: 'center',
              mb: 1
            }}
          >
            <BootstrapTooltip title={'Go to this Website\'s Repository'} arrow>
              <IconButton
                sx={{ border: '1px solid white', mr: 1 }}
                href={'https://github.com/GHWang28/GHWang28.github.io'}
                target='_blank'
              >
                <GitHubIcon />
              </IconButton>
            </BootstrapTooltip>
            <Ticker>
              {`(${ISOToDateStr(gitInfo.commit.date)}) ${gitInfo.commit.message}`}
            </Ticker>
          </Box>
      </Collapse>
    </Box>
  )
}

export default VersionNumber;
