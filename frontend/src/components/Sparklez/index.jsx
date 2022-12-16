import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import generateSparklez from './generateSparklez';
import SparklezInstance from './SparklezInstance';
import { rng } from '../../helpers';
import PropTypes from 'prop-types';

const sparkleColors = [
  'hsl(50deg, 100%, 50%)',
  '#EE7752',
  '#E73C7E',
  '#23A6D5',
  '#23D5AB',
  'rgb(150, 246, 246)'
]

function Sparklez ({ children, frequency = 1, sizeRange = [5, 15] }) {
  const [sparklez, setSparklez] = useState([]);

  useEffect(() => {
    const addSpaklezTimer = setTimeout(() => {
      const currTime = Date.now();
      const copySparklez = [...sparklez].filter((instance) => (
        currTime - instance.timestamp <= 1000
      ));
      setSparklez([
        ...copySparklez,
        generateSparklez(
          sparkleColors[rng(0, sparkleColors.length - 1)],
          rng(sizeRange[0], sizeRange[1])
        )
      ]);
    }, rng(5, Math.max(2000 / frequency, 10)));
  
    return () => clearTimeout(addSpaklezTimer);
  });

  return (
    <Box
      component='span'
      sx={{
        position: 'relative',
        display: 'inline-block'
      }}
    >
      {sparklez.map((instance) => (
        <SparklezInstance
          key={`sparklez-${instance.id}`}
          color={instance.color}
          size={instance.size}
          sx={instance.sx}
        />
      ))}
      <Box
        component='span'
        sx={{
          position: 'relative',
          zIndex: 1,
          fontWeight: 'bold'
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

Sparklez.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  frequency: PropTypes.number,
  sizeRange: PropTypes.array
};

export default Sparklez;
