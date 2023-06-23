import React, { useState } from 'react';
import { Box, Button, Chip, styled, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import ChipContainer from '../ChipContainer';
import BootstrapTooltip from '../BootstrapTooltip';
import ImageSlideShow from './ImageSlideShow';
import VideoShow from './VideoShow';
import TagIcon from '../../icons/TagIcon';
import WavyBackdrop from './WavyBackdrop';
import PropTypes from 'prop-types';

const TransluscentTypography = styled(Typography)(() => {
  const theme = useTheme();
  return {
    border: `1px solid ${(theme.palette.mode === 'dark') ? 'whitesmoke' : 'black'}`,
    borderRadius: '15px',
    margin: '5px 0px',
    padding: '0px 10px',
    backgroundColor: (theme.palette.mode === 'dark') ? theme.palette.darkgray.translucent : 'rgba(255,255,255,0.5)'
  }
});

export default function CardProject ({
  title,
  date,
  type,
  body,
  imgs,
  index = 0,
  buttons = []
}) {
  const [ref, inView] = useInView();
  const xLargeMq = useMediaQuery((theme) => theme.breakpoints.up('xl'));
  const largeMq = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const mediumMq = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const theme = useTheme();
  const themeMode = theme.palette.mode;
  const [hover, setHover] = useState(false);

  return (
    <Box
      ref={ref}
      onMouseEnter={() => { setHover(true) }}
      onMouseLeave={() => { setHover(false) }}
      className='border-gradient'
      p={2}
      sx={{
        position: 'relative',
        scale: (hover) ? '1' : '0.975',
        boxShadow: (hover) ? '0 4px 16px 0 rgba(255,255,255,0.2)' : '0 4px 8px 0 rgba(255,255,255,0.2)',
        opacity: (inView) ? '1' : '0',
        translate: (inView) ? '0px' : ((index % 2) ? '100px' : '-100px'),
        transition: 'scale 0.5s ease-in-out, box-shadow 0.5s ease-in-out, translate 0.5s ease-in-out, opacity 0.5s ease-in-out',
        borderRadius: '15px',
        overflow: 'hidden',
        mx: (xLargeMq) ? 0 : ((largeMq) ? 10 : ((mediumMq) ? 5 : 0)),
        mb: (mediumMq) ? 5 : 2,
        bgcolor: 'bgColor.main'
      }}
    >
      <Box sx={{ width: (smallMq) ? '60%' : '100%' }}>
        <BootstrapTooltip title='Title' placement={(smallMq) ? 'left' : 'top-start'}>
          <TransluscentTypography variant='h4'>
            {title}
          </TransluscentTypography>
        </BootstrapTooltip>
        {(type) && (
          <BootstrapTooltip title='Tags' placement={(smallMq) ? 'left' : 'top-start'}>
            <Box sx={{ display: 'flex' }}>
              <ChipContainer>
                {type.sort().map((label, index) => (
                  <Chip
                    icon={<TagIcon label={label} sx={{ ml: 0.6 }}/>}
                    variant='outlined'
                    sx={{
                      mr: (index === type.length - 1) ? 0 : 1,
                      borderColor: 'borderColor.main'
                    }}
                    key={`label-${index}`}
                    label={label}
                  />
                ))}
              </ChipContainer>
            </Box>
          </BootstrapTooltip>
        )}
        {(date) && (
          <BootstrapTooltip title='Date Finished' placement={(smallMq) ? 'left' : 'top-start'}>
            <Chip label={date} variant='outlined' sx={{ borderColor: 'borderColor.main', bgcolor: 'bgColor.main' }}/>
          </BootstrapTooltip>
        )}
        <Box component='hr' />
        {(body) && (
          <Box
            component='ul'
            sx={{
              py: 3,
              border: `1px solid ${theme.palette.borderColor.main}`,
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
      {buttons.map((button, buttonIndex) => (
        <BootstrapTooltip key={`c${index}-b${buttonIndex}]`} enterDelay={300} title={button?.disabled || button.text}>
          <Box
            component='span'
            sx={!smallMq && {
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Button
              startIcon={button.icon}
              variant='contained'
              onClick={button?.onClick}
              sx={{ m: 0.5, border: `1px solid ${theme.palette.borderColor.main}`, width: (smallMq) ? 'fit-content' : '75%', minWidth: '180px' }}
              disabled={(button?.disabled) !== undefined}
            >
              {button.text}
            </Button>
          </Box>
        </BootstrapTooltip>
      ))}
      {/* Wavy Backdrop displayed behind text */}
      <WavyBackdrop
        bgColor={(themeMode === 'dark') ? theme.palette.gray.main : 'white'}
        speed={7}
        yPos='-37.5%'
        direction={(index % 2) ? 'up' : 'down'}
        inView={inView}
      />
      <WavyBackdrop
        bgColor={(themeMode === 'dark') ? 'rgba(20,20,20,0.6)' : 'gray'}
        speed={7}
        yPos='-67%'
        direction={!(index % 2) ? 'up' : 'down'}
        inView={inView}
      />
      {/* Background to show image slideshow or video */}
      {(imgs[0].endsWith('.mp4')) ? <VideoShow src={imgs[0]} /> : <ImageSlideShow imgs={imgs} />}
    </Box>
  )
}

CardProject.propTypes = {
  title: PropTypes.string.isRequired,
  imgs: PropTypes.arrayOf(PropTypes.string).isRequired,
  index: PropTypes.number,
  date: PropTypes.string,
  type: PropTypes.arrayOf(PropTypes.string),
  body: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  buttons: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    disabled: PropTypes.string,
    onClick: PropTypes.func
  })),
};
