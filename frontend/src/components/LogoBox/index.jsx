import { Box, Collapse, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect, useState, useRef, Fragment } from 'react';
import { useLocation, useNavigate } from 'react-router';


function LogoBox () {
  const [logoHover, setLogoHover] = useState(false);
  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm'));
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
    <Fragment>
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
          WebkitTapHighlightColor: 'transparent'
        }}
        m={1}
        onMouseEnter={() => { setLogoHover(true) }}
        onMouseLeave={() => { setLogoHover(false) }}
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


      <Collapse orientation='horizontal' in={logoHover || !smallMq}>
        <Box sx={{ display: 'flex', flexDirection: 'column', mx: 1 }}>
          <Typography fontFamily='my-handwriting' fontSize={16} lineHeight='15px' noWrap>
            {'Gordon Wang\'s'}
          </Typography>
          <Typography fontFamily='my-handwriting' fontSize={16} lineHeight='15px' noWrap>
            <Box component='span' className='gradient-text' sx={{ fontWeight: 'bold' }}>
              {'Portfolio'}
            </Box>
            {' Website'}
          </Typography>
        </Box>
      </Collapse>
    </Fragment>
  )
}

export default LogoBox
