import { Box, useMediaQuery } from '@mui/material';
import React, { Fragment } from 'react';
import ButtonGoBack from '../../components/ButtonGoBack';

function ProjectTicTacToeCapture () {
  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  return (
    <Fragment>
      <Box mb={2} mt={-1} sx={{ position: (smallMq) ? 'absolute' : 'relative', left: (smallMq) ? '2%' : '' }}>
        <ButtonGoBack />
      </Box>
      <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
        <iframe
          title={'tic-tac-toe-player'}
          width={'100%'}
          height={'99%'}
          src={'https://ghwang28.github.io/tic-tac-toe-capture'}
        />
      </Box>
    </Fragment>
  )
}

export default ProjectTicTacToeCapture;
