import React, { forwardRef, useState } from 'react';
import { Button, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Sparklez from '../Sparklez';

type ComponentProps = {
  label?: string,
  href: string,
  state: { prevLocation: any },
  disabled?: boolean,
  startIcon?: React.ReactNode
}

const NavbarButton = forwardRef<HTMLButtonElement, ComponentProps>(({ label, href, state, disabled = false, startIcon }, ref) => {
  const lightMode = useTheme().palette.mode === 'light';
  const [hover, setHover] = useState(false);

  const handleOnClick = () => {
    setHover(false);
  }

  return (
    <RouterLink
      state={state}
      to={href}
      style={{
        height: '100%',
        width: '33.33%',
        pointerEvents: (disabled) ? 'none' : 'auto'
      }}
      onMouseEnter={() => { setHover(true) }}
      onMouseLeave={() => { setHover(false) }}
    >
      <Button
        ref={ref}
        startIcon={startIcon}
        onClick={handleOnClick}
        sx={{
          fontWeight: 'bold',
          borderRadius: '0px',
          width: '100%',
          height: '100%',
          borderBottom: '3px solid rgba(0,0,0,0.5)',
          transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
          fontSize: { sm: '12px' },
          bgcolor: (disabled) ? (lightMode ? 'rgba(90,90,90,0.5)' : 'rgba(0,0,0,0.5)') : '',
          color: (disabled) ? 'rgba(127,127,127)' : '',
          '&:hover': {
            // Remove highlight color
            bgcolor: (disabled) ? (lightMode ? 'rgba(90,90,90,0.5)' : 'rgba(0,0,0,0.5)') : 'rgba(0,0,0,0)',
          }
        }}
        disabled={disabled}
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
    </RouterLink>
  )
})

export default NavbarButton;