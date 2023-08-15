import React, { useState } from 'react';
import { Box, Collapse, Typography, useTheme } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import ImageAvatar from '../../../components/ImageAvatar';

type ComponentProps = {
  title: string,
  subtitle: string,
  color: string,
  src: string,
  backgroundSrc: string,
  date: [number, number],
  description: string[],
  odd?: boolean
}

const EducationCard = ({title, subtitle, color, src, date = [0, 0], description = [], odd, backgroundSrc}: ComponentProps) => {
  const [show, setShow] = useState(false);
  const [ref, inView] = useInView({
    rootMargin: '9999999px 0px 0px 0px'
  });
  const theme = useTheme();
  
  return (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        bgcolor: (theme.palette.mode === 'dark') ? 'bgColor.main' : 'rgb(150,150,150)',
        borderColor: `${color}.main`,
        borderStyle: 'solid',
        borderWidth: '2px',
        borderRadius: '15px',
        width: '90%',
        maxWidth: '600px',
        mx: 'auto',
        py: { sm: 2, xs: 1 },
        px: 4,
        boxSizing: 'border-box',
        opacity: (inView) ? '1' : '0',
        translate: (inView) ? '0px' : ((odd) ? '100px' : '-100px'),
        transition: 'translate 0.5s ease-in-out, opacity 0.5s ease-in-out',
        position: 'sticky',
        top: '94px',
        height: 'fit-content',
        cursor: 'pointer',
        WebkitTapHighlightColor: 'transparent',
        '::before': {
          // Background image
          width: '100%',
          height: '100%',
          content: '""',
          backgroundImage: `url("${backgroundSrc}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'absolute',
          bottom: '0%',
          right: '0%',
          opacity: (show) ? 0.1 : 0.2,
          transition: 'opacity 0.2s ease-in-out',
          borderRadius: '15px',
          zIndex: -1
        }
      }}
      onClick={() => {
        setShow(!show)
      }}
    >
      <ImageAvatar
        src={src}
        alt='education-logo'
        bgcolor={(color === 'yellow') ? 'rgb(254,230,0)' : 'rgb(255,255,255)'}
        sx={{
          my: 1
        }}
      />
      <Typography variant='h5' color={`${color}.main`} align={'center'} fontWeight='bold'>
        {title}
      </Typography>
      <Typography variant='subtitle1' color={`${color}.main`} align={'center'}>
        {subtitle}
      </Typography>
      <Typography variant='subtitle2' color={`${color}.main`} align={'center'}>
        {`${date[0]} → ${date[1]}`}
      </Typography>
      <Collapse in={show} component='ul' sx={{ width: '100%' }}>
        {description.map((dotpoint) => (
          <Box
            key={`education-dotpoint-${dotpoint}`}
            component='li'
            sx={{
              color: theme.palette.mode === 'light' ? 'black' : 'whitesmoke',
              '&::marker': { color: `${color}.main` }
            }}
          >
            <Typography pr={1}>
              {dotpoint}
            </Typography>
          </Box>
        ))}
      </Collapse>
      <Collapse in={!show}>
        <Typography variant='subtitle2' color={`${color}.main`} align={'center'}>
          {'Click to show more information.'}
        </Typography>
      </Collapse>
    </Box>
  )
}

export default EducationCard;
