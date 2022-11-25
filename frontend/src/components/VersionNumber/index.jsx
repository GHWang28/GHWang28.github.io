import React, { useState } from 'react';
import packageJson from '../../../package.json';
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
    to: { y: 0 },
    delay: 2000
  })
  const AnimatedTypography = animated(Typography);
  return (
    <Box
      sx={{ overflow: 'hidden', position: 'fixed', left: '10px', bottom: '0px'}}
      onMouseEnter={() => { hoverState(true) }}
      onMouseLeave={() => { hoverState(false) }}
    >
      <AnimatedTypography
        style={animationProps}
        fontSize={24}
        fontWeight='bold'
        sx={{ opacity: (hover) ? '1.0' : '0.4', transition: 'opacity 0.3s ease-in-out' }}
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
                sx={{ border: '1px solid white', mr: 1 }}
                href={'https://github.com/GHWang28/GHWang28.github.io'}
                target='_blank'
              >
                <GitHubIcon />
              </IconButton>
            </BootstrapTooltip>
            <Ticker width='40vw'>
              {`(${ISOToDateStr(gitInfo.commit.date)}) ${gitInfo.commit.message}`}
            </Ticker>
          </Box>
      </Collapse>
    </Box>
  )
}

export default VersionNumber;
