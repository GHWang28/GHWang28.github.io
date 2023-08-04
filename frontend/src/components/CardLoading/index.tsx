import React from 'react';
import CardDashed from '../CardDashed';
import CircularProgress from '@mui/material/CircularProgress';

const CardLoading = () => (
  <CardDashed
    sx={{
      mx: { lg: 0, md: 5, xs: 0 },
      mb: { md: 5, xs: 2 },
    }}
  >
    <CircularProgress />
  </CardDashed>
)

export default CardLoading;
