import React, { useState } from 'react';
import ReplyIcon from '@mui/icons-material/Reply';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router';

function ButtonGoBack () {
  const navigate = useNavigate();
  const [hover, setHoverState] = useState(false);

  return (
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
  )
}

export default ButtonGoBack;
