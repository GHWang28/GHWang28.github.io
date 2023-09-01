import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useInView } from '@react-spring/web';
import EducationCard from './EducationCard';

const EducationSection = () => {
  const [ref, inView] = useInView({
    rootMargin: '9999999px 0px 0px 0px'
  });

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
      <Grid container rowGap={2}>
        <Grid item xs={12} sm={6}>
          <EducationCard
            title={'Sefton High\xa0School'}
            subtitle={'High School Certificate'}
            color={'blue'}
            src={'/images/timeline/sefton-hs.webp'}
            backgroundSrc={'/images/about/education/shs.webp'}
            date={[2014, 2019]}
            description={['Graduated with a 90+ ATAR.', 'Participated in a number of extra-curricular activities.']}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <EducationCard
            title={'University of New\xa0South\xa0Wales'}
            subtitle={'Undergraduate Degree'}
            color={'yellow'}
            src={'/images/timeline/unsw.webp'}
            backgroundSrc={'/images/about/education/unsw.webp'}
            date={[2020, 2023]}
            description={[
              'Graduated with a degree in Computer Science.',
              'Made it to Dean\'s Honours List every year studying the degree.',
              'Graduated with a High Distinction WAM.',
              'Degree consisted of Frontend centered electives.',
              'Currently employed here as a Casual Frontend Tutor.'
            ]}
            odd
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default EducationSection;
