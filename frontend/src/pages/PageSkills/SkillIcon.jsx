import React from 'react';
import { Box, Typography, keyframes } from '@mui/material';
import { useInView } from 'react-spring';

const levitateKeyframes = keyframes`
  0% {
    transform: translatey(0%);
  }
  50% {
    transform: translatey(-12.5%);
  }
  100% {
    transform: translatey(0%);
  }
`

export default function SkillIcon ({ src, name, whitebg = false, index = 0 }) {
  const [ref, inView] = useInView({
    rootMargin: '9999999px 0px 0px 0px'
  });

  return (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '&:hover': {
          scale: '1.1',
          animation: `${levitateKeyframes} 2s ease-in-out infinite`
        },
        opacity: (inView) ? '1' : 0,
        transition: `opacity 0.5s ${50 * index}ms ease-in-out, scale 0.2s ease-in-out`,
        minWidth: '64px'
      }}
      mx={2}
    >
      <Box
        component='img'
        src={src}
        alt={name}
        sx={[
          {
            height: '64px',
            maxWidth: '256px',
            boxSizing: 'border-box'
          },
          (whitebg) && {
            bgcolor: 'whitesmoke',
            borderRadius: '15px',
            p: 1,
          }
        ]}
      />
      <Typography variant='subtitle2' align='center'>
        {name}
      </Typography>
    </Box>
  )
}