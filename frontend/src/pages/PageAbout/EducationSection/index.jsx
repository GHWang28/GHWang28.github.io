import React from 'react';
import { Box, Typography } from '@mui/material';
import { useInView } from 'react-spring';
import EducationCard from './EducationCard';

export default function EducationSection () {
  const [ref, inView] = useInView();

  const titleAnimation = {
    opacity: (inView) ? '1' : '0',
    translate: (inView) ? '0px' : '200px',
    transition: 'translate 0.5s ease-in-out, opacity 0.5s ease-in-out',
  }

  return (
    <Box ref={ref} mb={4}>
      <Typography mt={5} variant='h4' fontWeight='bold' align='center' sx={titleAnimation}>
        {'Education'}
      </Typography>
      <Typography mb={4} variant='subtitle1' fontWeight='bold' align='center' color='text.secondary' sx={titleAnimation}>
        {'Where I\'ve studied'}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly' , flexWrap: 'wrap', rowGap: '16px' }}>
        <EducationCard
          title={'Sefton High\xa0School'}
          subtitle={'High School Certificate'}
          color={'blue'}
          src={'/images/timeline/sefton-hs.jpg'}
          date={[2014, 2019]}
          description={['Graduated with a 90+ ATAR.', 'Participated in a number of extra-curricular activities.']}
        />
        <EducationCard
          title={'University of New\xa0South\xa0Wales'}
          subtitle={'Undergraduate Degree'}
          color={'yellow'}
          src={'/images/timeline/unsw.jpg'}
          date={[2020, 2023]}
          description={[
            'Graduated with a degree in Computer Science.',
            'Made it to Dean\'s Honours List every year studying the degree.',
            'Graduated with a High Disctinction WAM, awarding me with the prestigious Dean\'s Award.',
            'Degree consisted of Frontend centered electives.',
            'Currently employed here as a Frontend Tutor.'
          ]}
          odd
        />
      </Box>
    </Box>
  )
}