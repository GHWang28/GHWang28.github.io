import React from 'react';
import { Box, Button, Chip, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import ChipContainer from '../ChipContainer';
import BootstrapTooltip from '../BootstrapTooltip';
import TypographyBorder from '../TypographyBorder';
import { ProjectData } from '../../types';
import CardBackground from './CardBackground';
import TagChip from './TagChip';

type ComponentProps = {
  data: ProjectData,
  index?: number
}

const CardProject = ({ data, index = 0 }: ComponentProps) => {
  const [ref, inView] = useInView({
    rootMargin: '9999999px 0px 0px 0px'
  });
  const theme = useTheme();
  const smallMq = useMediaQuery(theme.breakpoints.up('sm'));

  const {
    title,
    date,
    type,
    body,
    imgs,
    buttons
  } = data;

  return (
    <Box
      ref={ref}
      className='border-gradient'
      p={2}
      sx={{
        position: 'relative',
        opacity: (inView) ? '1' : '0',
        translate: (inView) ? '0px' : ((index % 2) ? '100px' : '-100px'),
        transition: 'scale 0.5s ease-in-out, box-shadow 0.5s ease-in-out, translate 0.5s ease-in-out, opacity 0.5s ease-in-out',
        borderRadius: '15px',
        overflow: 'hidden',
        mx: { lg: 0, md: 5, xs: 0 },
        mb: { md: 5, xs: 2 },
        bgcolor: 'bgColor.main',
        scale: '0.975',
        boxShadow: '0 4px 8px 0 rgba(255,255,255,0.2)',
        '&:hover': {
          boxShadow: '0 4px 16px 0 rgba(255,255,255,0.2)',
          scale: '1'
        }
      }}
    >
      <Box sx={{ width: { sm: '60%', xs: '100%' }}}>
        <BootstrapTooltip title='Title' placement={(smallMq) ? 'left' : 'top-start'}>
          <TypographyBorder variant='h4' sx={{ maxWidth: { xs: '75%', sm: '100%' }, width: 'fit-content', bgcolor: 'gray.transparent' }}>
            {title}
          </TypographyBorder>
        </BootstrapTooltip>
        {(type) && (
          <BootstrapTooltip title='Tags' placement={(smallMq) ? 'left' : 'top-start'}>
            <div>
              <ChipContainer>
                {Array.from(type).sort().map((label, index) => (
                  <TagChip key={`chip-${label}-${index}`} label={label}/>
                ))}
              </ChipContainer>
            </div>
          </BootstrapTooltip>
        )}
        {(date) && (
          <BootstrapTooltip title='Date Finished' placement={(smallMq) ? 'left' : 'top-start'}>
            <Chip label={date} variant='outlined' />
          </BootstrapTooltip>
        )}
        <Box component='hr' />
        {(body) && (
          <Box
            component='ul'
            sx={{
              py: 3,
              border: `1px solid ${theme.palette.contrastColor.main}`,
              borderRadius: '15px',
              bgcolor: 'bgColor.main'
            }}
          >
            {body.map((dotpoint, index) => (
              <Box key={`dotpoint-${index}`} component='li' sx={{ color: theme.palette.mode === 'light' ? 'black' : 'whitesmoke' }}>
                <Typography pr={1}>
                  {dotpoint}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>
      {buttons && buttons.map((button, buttonIndex) => (
        <BootstrapTooltip key={`c${index}-b${buttonIndex}]`} placement='left' enterDelay={300} title={button?.disabled || button.text}>
          <Box
            component='span'
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', sm: 'left' }
            }}
          >
            <Button
              startIcon={button.icon}
              variant='contained'
              onClick={button?.onClick}
              sx={{ m: 0.5, border: `1px solid ${theme.palette.contrastColor.main}`, width: { sm: 'fit-content', xs: '75%' }, minWidth: '180px' }}
              disabled={button?.disabled != null}
            >
              {button.text}
            </Button>
          </Box>
        </BootstrapTooltip>
      ))}
      {/* Wavy Backdrop displayed behind text */}
      <CardBackground odd={index % 2 === 0} imgs={imgs} inView={inView} />
    </Box>
  )
}

export default CardProject;
