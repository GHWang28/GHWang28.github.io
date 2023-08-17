import React from 'react';
import { Box, Typography, keyframes } from '@mui/material';
import { useInView } from '@react-spring/web';
import { Skill } from '../../types';

type ComponentProps = {
  skill: Skill
}

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

export default function SkillIcon ({ skill }: ComponentProps) {
  const {
    src,
    name,
    whitebg
  } = skill;
  
  const [ref, inView] = useInView({
    rootMargin: '9999999px 0px 0px 0px'
  });

  return (
    <Box
      component='span'
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
        transition: `opacity 0.5s ease-in-out, scale 0.2s ease-in-out`,
        minWidth: '64px'
      }}
      mx={2}
    >
      <Box
        component='img'
        src={`/images/about/skills/${src}`}
        alt={name}
        sx={[
          {
            height: '64px',
            maxWidth: '256px',
            boxSizing: 'border-box'
          },
          (whitebg) ? {
            bgcolor: 'whitesmoke',
            borderRadius: '15px',
            p: 1,
          } : {}
        ]}
      />
      <Typography variant='subtitle2' align='center'>
        {name}
      </Typography>
    </Box>
  )
}