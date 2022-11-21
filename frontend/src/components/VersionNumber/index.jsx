import React, { useState } from 'react';
import config from '../../config.json';
import { Box, Collapse, Typography } from "@mui/material";
import GitInfo from 'react-git-info/macro'
import { ISOToDateStr } from '../../helpers';
import GitHubIcon from '@mui/icons-material/GitHub';

function VersionNumber () {
  const gitInfo = GitInfo();
  const [hover, hoverState] = useState(false);
  return (
    <Typography
      fontFamily='my-handwriting'
      fontSize={24}
      fontWeight='bold'
      onMouseEnter={() => { hoverState(true) }}
      onMouseLeave={() => { hoverState(false) }}
      sx={{ position: 'absolute', left: '5px', bottom: '0px' }}
    >
      {`v${config['VERSION-NUMBER']}`}
      <Box
        component='span'
      >
        <Collapse in={hover} orientation='vertical'>
          <Typography mb={1} noWrap fontFamily='my-handwriting' fontSize={24} lineHeight={0.6}>
            <GitHubIcon />
            {`- ${gitInfo.commit.message} (${ISOToDateStr(gitInfo.commit.date)})`}
          </Typography>
        </Collapse>
      </Box>
    </Typography>
  )
}

export default VersionNumber;
