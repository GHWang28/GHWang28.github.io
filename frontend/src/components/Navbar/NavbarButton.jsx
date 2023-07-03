import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, useMediaQuery } from "@mui/material";
import Sparklez from '../Sparklez';
import { isMobileOrTablet } from '../../helpers';

const NavbarButton = forwardRef(({ label, onClick, disabled, ...props }, ref) => {
  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const [hover, setHover] = useState(false);

  const handleOnClick = () => {
    setHover(false);
    onClick();
  }

  return (
    <Button
      title={props.label}
      ref={ref}
      onMouseEnter={() => { setHover(true) }}
      onMouseLeave={() => { setHover(false) }}
      {...props}
      disabled={disabled}
      onClick={handleOnClick}
      sx={[
        {
          fontWeight: 'bold',
          borderRadius: '0px',
          height: '100%',
          width: '33.33%',
          borderBottom: '3px solid rgba(0,0,0,0.5)',
          transition: 'background-color 0.5s ease-in-out, color 0.5s ease-in-out',
        },
        (!smallMq) && {
          fontSize: '12px',
        },
        (disabled) && {
          bgcolor: 'rgba(0,0,0,0.5)',
        },
        (!isMobileOrTablet()) && {
          '&:hover': {
            // Remove highlight color
            backgroundColor: 'rgba(0,0,0,0)',
            color: 'borderColor.main'
          }
        }
      ]}
      disableRipple
    >
      {(hover) ? (
        <Sparklez frequency={1.5} sizeRange={[10, 15]}>
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