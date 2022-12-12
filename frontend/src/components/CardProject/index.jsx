import React, { useState } from 'react';
import { Box, Button, Chip, IconButton, styled, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import ChipContainer from '../ChipContainer';
import BootstrapTooltip from '../BootstrapTooltip';
import ImageSlideShow from './ImageSlideShow';
import PropTypes from 'prop-types';
import VideoShow from './VideoShow';
import TagIcon from '../../icons/TagIcon';

const TransluscentTypography = styled(Typography)(() => {
  const theme = useTheme();
  return {
    borderRadius: '15px',
    margin: '5px 0px',
    padding: '0px 10px',
    backgroundColor: theme.palette.darkgray.translucent
  }
});

function CardProject ({
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
  const [hover, setHover] = useState(false);
  const bgColor = theme.palette.gray.main;

  return (
    <Box
      ref={ref}
      onMouseEnter={() => { setHover(true) }}
      onMouseLeave={() => { setHover(false) }}
      sx={{
        position: 'relative',
        border: '2px solid whitesmoke',
        scale: (hover) ? '1' : '0.975',
        boxShadow: (hover) ? '0 4px 32px 0 rgba(0, 0, 0, 0.8)' : '0 4px 16px 0 rgba(0, 0, 0, 0.8)',
        opacity: (inView) ? '1' : '0',
        translate: (inView) ? '0px' : ((index % 2) ? '200px' : '-200px'),
        transition: 'scale 0.2s ease-in-out, boxShadow 0.2s ease-in-out, translate 0.2s ease-in-out, opacity 0.2s ease-in-out',
        borderRadius: '15px',
        overflow: 'hidden',
        mx: (xLargeMq) ? 0 : ((largeMq) ? 10 : ((mediumMq) ? 5 : 0)),
        mb: (mediumMq) ? 5 : 2,
        bgcolor: 'black'
      }}
    >
      <Box
        sx={{
          p: 2,
          backgroundImage: `linear-gradient(90deg, ${bgColor} 35%, rgba(255,255,255,0) 70%)` 
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
                <ChipContainer >
                  {type.sort().map((label, index) => (
                    <Chip
                      icon={<TagIcon label={label} sx={{ ml: 0.6 }}/>}
                      variant='outlined'
                      sx={{
                        mr: (index === type.length - 1) ? 0 : 1,
                        borderColor: 'whitesmoke'
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
              <Chip label={date} variant='outlined' sx={{ borderColor: 'whitesmoke' }}/>
            </BootstrapTooltip>
          )}
          <Box component='hr' />
          {(body) && (
            <Box
              component='ul'
              sx={{
                py: 3,
                borderRadius: '15px',
                backgroundColor: theme.palette.darkgray.translucent
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
              {(smallMq) ? (
                <Button
                  startIcon={button.icon}
                  variant='outlined'
                  onClick={button?.onClick}
                  sx={{ mr: 1 }}
                  disabled={(button?.disabled) !== undefined}
                >
                  {button.text}
                </Button>
              ) : (
                <IconButton
                  onClick={button.onClick}
                  disabled={button?.disabled}
                  sx={{
                    mr: 1,
                    color: 'primary.main',
                    borderColor: (button?.disabled) ? 'gray' : 'primary.main',
                    borderStyle: 'solid',
                    borderWidth: '1px'
                  }}
                >
                  {button.icon}
                </IconButton>
              )}
            </span>
          </BootstrapTooltip>
        ))}
      </Box>
      {/* Background Image */}
      {(imgs[0].endsWith('.mp4'))
        ? <VideoShow src={imgs[0]} />
        : <ImageSlideShow imgs={imgs} />
      }
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

export default CardProject;
