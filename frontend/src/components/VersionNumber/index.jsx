import React, { useState } from 'react';
import config from '../../config.json';
import { Box, Collapse, Typography } from "@mui/material";
import GitInfo from 'react-git-info/macro'
import { ISOToDateStr } from '../../helpers';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useSpring, animated } from 'react-spring';

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
        <Typography mb={1} noWrap fontFamily='my-handwriting' fontSize={24} lineHeight={0.6}>
          <GitHubIcon />
          {` - ${gitInfo.commit.message} (${ISOToDateStr(gitInfo.commit.date)})`}
        </Typography>
      </Collapse>
    </Box>
  )
}

export default VersionNumber;
