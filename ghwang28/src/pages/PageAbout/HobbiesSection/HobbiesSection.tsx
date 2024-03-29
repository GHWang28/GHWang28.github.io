import React from 'react';
import { Box, Typography } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import generateHobbies from './hobbies';
import HobbiesItem from './HobbiesItem';

const HobbiesSection = () => {
  const [ref, inView] = useInView({
    rootMargin: '9999999px 0px 0px 0px'
  });
  const listOfHobbies = generateHobbies();

  return (
    <Box
      ref={ref}
      sx={{
        opacity: (inView) ? '1' : '0',
        transition: 'translate 0.5s ease-in-out, opacity 0.5s ease-in-out',
      }}
    >
      <Typography mt={5} variant='h4' fontWeight='bold' align='center'>
        {'Hobbies & Interests'}
      </Typography>
      <Typography mb={{ sm: 0, xs: 3 }} variant='subtitle1' fontWeight='bold' align='center' color='text.secondary'>
        {'My areas of interest'}
      </Typography>
      {listOfHobbies.map((hobby, index) => (
        <HobbiesItem key={`hobby-${index}`} data={hobby} odd={index % 2 !== 0} />
      ))}
    </Box>
  )
}

export default HobbiesSection;
