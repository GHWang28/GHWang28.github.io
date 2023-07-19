import React, { Fragment } from 'react';
import Hanoi from './Hanoi';
import { Box, Typography } from '@mui/material';

const PageError = () => (
  <Fragment>
    <Typography align='center' variant='h5' mt={2}>
      <Box component='span' fontWeight='bold' sx={{ color: 'lightcoral' }}>
        {'Error 404'}
      </Box>
      {' - Page Not Found'}
    </Typography>
    <Typography align='center' variant='subtitle1' mb={2} sx={{ opacity: 0.7 }}>
      {'But you found this secret game of "Tower of Hanoi"!'}
    </Typography>
    <Hanoi />
  </Fragment>
)

export default PageError;
