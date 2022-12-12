import { Box } from "@mui/system"
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

function LogoBox ({ doNavigate = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [hover, setHover] = useState(false);
  const [src, setSrc] = useState('url(/images/transparent-img.png)');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrc('url(/images/gw-logo-anim-2.gif)');
    }, 10);

    return () => { clearTimeout(timeout) };
  }, [])

  return (
    <Box
      role='button'
      title='Home Page'
      sx={{
        width: '40px',
        height: '40px',
        borderRadius: '4px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'scale 0.3s ease-in-out',
        scale: (hover) ? '1.1' : '1',
      }}
      onMouseEnter={() => { setHover(true) }}
      onMouseLeave={() => { setHover(false) }}
      onClick={() => { if (doNavigate) navigate('/', { state: { prevLocation: location.pathname } }) }}
    >
      <Box
        name='mask'
        sx={{
          height: '100%',
          width: '100%',
          maskImage: src,
          maskSize: '100%',
          maskRepeat: 'no-repeat'
        }}
      >
        <Box
          className={'gradient-background'}
          sx={{ height: '100%', width: '100%' }}
        />
      </Box>
    </Box>
  )
}

export default LogoBox
