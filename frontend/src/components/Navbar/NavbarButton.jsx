import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, useMediaQuery } from "@mui/material";
import Sparklez from '../Sparklez';

function NavbarButton ({ label, onClick, disabled, ...props }) {
  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const [hover, setHover] = useState(false);

  const handleOnClick = () => {
    setHover(false);
    onClick();
  }

  return (
    <Button
      title={props.label}
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
          transition: 'background-color 0.5s ease-in-out'
        },
        (!smallMq) && {
          fontSize: '12px',
        },
        (disabled) && {
          bgcolor: 'rgba(0,0,0,0.5)'
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
}

NavbarButton.propTypes = {
  label: PropTypes.string.isRequired
};

export default NavbarButton;