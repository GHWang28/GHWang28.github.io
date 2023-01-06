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
import { useSelector } from 'react-redux';

const TransluscentTypography = styled(Typography)(() => {
  const theme = useTheme();
  const themeMode = useSelector(state => state.themeMode);
  return {
    border: `1px solid ${(themeMode === 'dark') ? 'whitesmoke' : 'black'}`,
    borderRadius: '15px',
    margin: '5px 0px',
    padding: '0px 10px',
    backgroundColor: (themeMode === 'dark') ? theme.palette.darkgray.translucent : 'rgba(255,255,255,0.5)'
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
  const themeMode = useSelector(state => state.themeMode);
  const xLargeMq = useMediaQuery((theme) => theme.breakpoints.up('xl'));
  const largeMq = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const mediumMq = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const theme = useTheme();
  const [hover, setHover] = useState(false);

  return (
    <Box
      ref={ref}
      onMouseEnter={() => { setHover(true) }}
      onMouseLeave={() => { setHover(false) }}
      className={'border-gradient'}
      sx={{
        position: 'relative',
        scale: (hover) ? '1' : '0.975',
        boxShadow: (hover) ? '0 4px 16px 0 rgba(255,255,255,0.2)' : '0 4px 8px 0 rgba(255,255,255,0.2)',
        opacity: (inView) ? '1' : '0',
        translate: (inView) ? '0px' : ((index % 2) ? '200px' : '-200px'),
        transition: 'scale 0.2s ease-in-out, box-shadow 0.2s ease-in-out, translate 0.2s ease-in-out, opacity 0.2s ease-in-out',
        borderRadius: '15px',
        overflow: 'hidden',
        mx: (xLargeMq) ? 0 : ((largeMq) ? 10 : ((mediumMq) ? 5 : 0)),
        mb: (mediumMq) ? 5 : 2,
        bgcolor: 'black.main'
      }}
    >
      <Box p={2}>
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
                        borderColor: (themeMode === 'dark') ? 'whitesmoke' : 'black.main'
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
              <Chip label={date} variant='outlined' sx={{ borderColor: (themeMode === 'dark') ? 'whitesmoke' : 'black.main' }}/>
            </BootstrapTooltip>
          )}
          <Box component='hr' />
          {(body) && (
            <Box
              component='ul'
              sx={{
                py: 3,
                border: `1px solid ${(themeMode === 'dark') ? 'whitesmoke' : 'black'}`,
                borderRadius: '15px',
                bgcolor: (themeMode === 'dark') ? 'darkgray.translucent' : 'white.translucent'
              }}
            >
              {body.map((dotpoint, index) => (
                <Box key={`dotpoint-${index}`} component='li'>
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
            <span>
              <Button
                startIcon={button.icon}
                variant='contained'
                onClick={button?.onClick}
                sx={{ mr: 1, border: `1px solid ${(themeMode === 'dark') ? 'whitesmoke' : 'black'}` }}
                disabled={(button?.disabled) !== undefined}
              >
                {button.text}
              </Button>
            </span>
          </BootstrapTooltip>
        ))}
      </Box>
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
