import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import { rng } from '../../../helpers';
import { useState } from 'react';
import PropTypes from 'prop-types';

function Block ({ animation, dim }) {

  const [pulsate, setPulsate] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPulsate(!pulsate);
    }, rng(2500, 8000));

    return () => { clearTimeout(timeout) }
  })

  return (
    <Grid
      item
      xs={12 / dim}
      sx={{
        bgcolor: 'whitesmoke',
        opacity: 0,
        animation: (pulsate) ? `${animation} 2.0s ease-in-out 1` : ''
      }}
    />
  )
}

Block.propTypes = {
  animation: PropTypes.object,
  dim: PropTypes.number
};

export default Block;
