import React, { useState } from 'react';
import ReplyIcon from '@mui/icons-material/Reply';
import { IconButton } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import BootstrapTooltip from '../BootstrapTooltip';

type ComponentProps = {
  destination: string
}

const ButtonGoBack = ({ destination }: ComponentProps) => {
  const navigate = useNavigate();
  const [hover, setHoverState] = useState(false);
  const location = useLocation();

  return (
    <BootstrapTooltip placement='bottom' arrow title='Go Back'>
      <IconButton
        onMouseEnter={() => { setHoverState(true) }}
        onMouseLeave={() => { setHoverState(false) }}
        onClick={() => { navigate(location.state?.prevLocation || destination, { state: { prevLocation: location.pathname } }) }}
        sx={{
          mt: 2,
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: 'borderColor.main',
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
