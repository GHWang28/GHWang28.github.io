import React, { Fragment } from 'react';
import { Box, Typography } from '@mui/material';
import { animated, useSpring } from '@react-spring/web';
import Sparklez from '../Sparklez';

type ComponentProps = {
  title: string,
  subtitle?: string,
  children?: React.ReactNode,
  mt?: number
}

const GradientTitle = ({ title, subtitle, children, mt = 1 }: ComponentProps) => {
  const AnimatedBox = animated(Box);

  return (
    <Fragment>
      <AnimatedBox
        component='section'
        mt={mt}
        mb={1.5}
        sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        style={useSpring({
          from: { opacity: 0 },
          to: { opacity: 1 },
        })}
      >
        <Sparklez frequency={2} sizeRange={[20, 35]}>
          <Box className='gradient-text'>
            <Typography variant='h2' fontWeight='bold' align='center'>
              {title}
            </Typography>
            {(subtitle) && (
              <Typography variant='h5' fontWeight='bold' align='center'>
                {subtitle}
              </Typography>
            )}
          </Box>
        </Sparklez>
      </AnimatedBox>
      {children}
      <Box component='hr' mt={1.5} mb={1}/>
    </Fragment>
  )
}

export default GradientTitle;
