import React, { useState } from 'react';
import ReplyIcon from '@mui/icons-material/Reply';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router';
import BootstrapTooltip from '../BootstrapTooltip';

function ButtonGoBack () {
  const navigate = useNavigate();
  const [hover, setHoverState] = useState(false);

  return (
    <BootstrapTooltip placement='bottom' arrow title='Go Back'>
      <IconButton
        onMouseEnter={() => { setHoverState(true) }}
        onMouseLeave={() => { setHoverState(false) }}
        onClick={() => { navigate(-1) }}
        sx={{
          mt: 3,
          border: '2px solid whitesmoke',
          opacity: (hover) ? '1.0' : '0.5',
          transition: 'opacity 0.2s ease-in-out'
        }}
      >
        <ReplyIcon />
      </IconButton>
    </BootstrapTooltip>
  )
}

export default ButtonGoBack;
