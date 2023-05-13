import React, { Fragment } from 'react';
import Hanoi from './Hanoi';
import { Box, Typography } from '@mui/material';

export default function PageError () {
  return (
    <Fragment>
      <Typography align='center' variant='h5' mt={2}>
        <Box component='span' fontWeight='bold' sx={{ color: 'lightcoral' }}>
          {'Error 404'}
        </Box>
        {' - Page not found'}
      </Typography>
      <Typography align='center' variant='subtitle1' mb={2} sx={{ opacity: 0.7 }}>
        {'Instead, here\'s a game of "Tower of Hanoi"'}
      </Typography>
      <Hanoi />
    </Fragment>
  )
}