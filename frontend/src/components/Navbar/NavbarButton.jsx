import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, useMediaQuery } from "@mui/material";
import Sparklez from '../Sparklez';

function NavbarButton (props) {
  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const [hover, setHover] = useState(false);
  const prunedProps = {...props};
  delete prunedProps.label;
  delete prunedProps.onClick;

  return (
    <Button
      title={props.label}
      onMouseEnter={() => { setHover(true) }}
      onMouseLeave={() => { setHover(false) }}
      {...prunedProps}
      onClick={() => {
        setHover(false);
        props.onClick();
      }}
      sx={[
        {
          border: '1px solid rgba(0,0,0,0)',
          fontWeight: 'bold',
          borderRadius: '15px',
          height: '100%',
          mx: 1
        },
        (!smallMq) && {
          width: '33.33%',
          fontSize: '12px',
        }
      ]}
      disableRipple
    >
      {(hover) ? (
        <Sparklez frequency={1.5} sizeRange={[10, 15]}>
          {props.label}
        </Sparklez>
      ) : (
        props.label
      )}
    </Button>
  )
}

NavbarButton.propTypes = {
  label: PropTypes.string.isRequired
};

export default NavbarButton;