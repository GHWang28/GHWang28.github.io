import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from "@mui/material";
import Sparklez from '../Sparklez';

function NavbarButton (props) {
  const [hover, setHover] = useState(false);
  const prunedProps = {...props};
  delete prunedProps.label;

  return (
    <Button
      onMouseEnter={() => { setHover(true) }}
      onMouseLeave={() => { setHover(false) }}
      {...prunedProps}
      sx={{ fontWeight: 'bold' }}
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