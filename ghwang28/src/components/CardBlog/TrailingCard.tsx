import React from 'react';
import { Typography } from '@mui/material';
import CardDashed from '../CardDashed'
import { useInView } from 'react-intersection-observer';

type ComponentProps = {
  index?: number
}

const TrailingCard = ({ index = 0 }: ComponentProps) => {
  const [ref, inView] = useInView({
    rootMargin: '9999999px 0px 0px 0px'
  });

  return (
    <CardDashed
      ref={ref}
      sx={{
        opacity: (inView) ? '0.8' : '0',
        translate: (inView) ? '0px' : ((index % 2) ? '100px' : '-100px'),
        mx: { lg: 0, md: 5, xs: 0 },
        mb: { md: 5, xs: 2 }
      }}
    >
      <Typography fontSize={18}>
        {' More posts coming soon...'}
      </Typography>
    </CardDashed>
  )
}

export default TrailingCard;
