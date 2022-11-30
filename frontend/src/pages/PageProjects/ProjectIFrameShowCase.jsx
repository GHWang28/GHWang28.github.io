import { Box, LinearProgress, useMediaQuery } from '@mui/material';
import React, { Fragment, useState } from 'react';
import { useParams } from 'react-router';
import ButtonGoBack from '../../components/ButtonGoBack';

function ProjectIFrameShowCase () {
  const projectName = useParams().project;
  const [loaded, setLoaded] = useState(false);

  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  return (
    <Fragment>
      <Box mb={2} mt={-1} sx={{ position: (smallMq) ? 'absolute' : 'relative', left: (smallMq) ? '2%' : '' }}>
        <ButtonGoBack />
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <Box
          component='iframe'
          sx={{ opacity: (loaded) ? '1.0' : '0.0' }}
          onLoad={() => { setLoaded(true) }}
          title={'project-showcase'}
          width={'100%'}
          height={'99%'}
          src={`https://ghwang28.github.io/${projectName}`}
        />
        {(!loaded) && (
          <LinearProgress
            sx={{
              width: '100%',
              height: '20px',
              position: 'absolute',
              top: '50%',
              left: '50%',
              translate: '-50% -50%'
            }}
          />
        )}
      </Box>
    </Fragment>
  )
}

export default ProjectIFrameShowCase;
