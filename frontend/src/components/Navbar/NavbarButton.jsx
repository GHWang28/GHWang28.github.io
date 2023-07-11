import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, useMediaQuery, useTheme } from "@mui/material";
import Sparklez from '../Sparklez';
import { isMobileOrTablet } from '../../helpers';

const NavbarButton = forwardRef(({ label, onClick, disabled, startIcon }, ref) => {
  const lightMode = useTheme().palette.mode === 'light';
  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const [hover, setHover] = useState(false);

  const handleOnClick = () => {
    setHover(false);
    onClick();
  }

  return (
    <Button
      title={label}
      ref={ref}
      onMouseEnter={() => { setHover(true) }}
      onMouseLeave={() => { setHover(false) }}
      startIcon={startIcon}
      onClick={handleOnClick}
      sx={[
        {
          fontWeight: 'bold',
          borderRadius: '0px',
          height: '100%',
          width: '33.33%',
          borderBottom: '3px solid rgba(0,0,0,0.5)',
          transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
        },
        (!smallMq) && {
          fontSize: '12px',
        },
        (disabled) && {
          bgcolor: lightMode ? 'rgba(90,90,90,0.5)' : 'rgba(0,0,0,0.5)',
          color: 'rgba(127,127,127)'
        },
        (!isMobileOrTablet()) && {
          '&:hover': {
            // Remove highlight color
            bgcolor: (disabled) ? (lightMode ? 'rgba(90,90,90,0.5)' : 'rgba(0,0,0,0.5)') : 'rgba(0,0,0,0)',
          }
        }
      ]}
      disableRipple
    >
      {(hover) ? (
        <Sparklez frequency={3} sizeRange={[10, 15]}>
          {label}
        </Sparklez>
      ) : (
        label
      )}
    </Button>
  )
})

NavbarButton.propTypes = {
  label: PropTypes.string.isRequired
};

export default NavbarButton;