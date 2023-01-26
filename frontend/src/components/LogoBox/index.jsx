import { Box } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';


function LogoBox () {
  const navigate = useNavigate();
  const location = useLocation();
  const doNavigate = location.pathname !== '/';
  const ref = useRef(null);

  const [src, setSrc] = useState('url(/images/transparent-img.png)');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrc('url(/images/gw-logo-anim-2.gif)');
    }, 10);

    return () => { clearTimeout(timeout) };
  }, []);

  useEffect(() => {
    if (location.pathname === '/' && Boolean(location.state?.prevLocation)) {
      const element = ref.current;
      element.classList.remove('logo-anim');
      void element.offsetWidth;
      element.classList.add('logo-anim');
    }
  }, [location])

  return (
    <Box
      ref={ref}
      role='button'
      title='Home Page'
      className='logo-anim'
      sx={{
        width: '40px',
        height: '40px',
        borderRadius: '4px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'scale 0.3s ease-in-out',
        scale: '1.0',
        '&:hover': {
          scale: '1.05'
        },
      }}
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
