import React, { Fragment, useState } from 'react';
import { Box, LinearProgress } from '@mui/material';
import { useParams } from 'react-router';
import ButtonGoBack from '../../components/ButtonGoBack';

const ProjectIFrameShowCase = () => {
  const projectName = useParams().project;
  const isXenoYova = (projectName?.toLowerCase() === 'xeno-and-yova');

  const [loaded, setLoaded] = useState(false);

  return (
    <Fragment>
      <Box mb={2} mt={-1} sx={{ position: { xs: 'relative', sm: 'absolute' }, left: { xs: '0%', sm: '2%' }}}>
        <ButtonGoBack destination={'/projects'} />
      </Box>
      <Box
        sx={{
          width: '100%',
          height: 'calc(100vh - 64px)',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Box
          id={'project-showcase'}
          component='iframe'
          onLoad={() => { setLoaded(true) }}
          title={'project-showcase'}
          sx={{ opacity: (loaded) ? '1.0' : '0.0' }}
          width={(isXenoYova) ? 'min(714px, 100vw)' : '100%'}
          height={(isXenoYova) ? '546px' : '99%'}
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
