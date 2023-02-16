import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import GitInfo from 'react-git-info/macro';
import { useLocation } from 'react-router';
import { ISOToDateStr } from '../../helpers';
import { useDispatch } from 'react-redux';
import { setImageZoom } from '../../redux/actions';

export default function Footer () {
  const location = useLocation();
  const gitInfo = GitInfo();
  const lightMode = (useTheme().palette.mode === 'light');
  const dispatch = useDispatch();
  const logoSrc = (lightMode) ? '/images/gw-logo.png' : '/images/gw-logo-light.png';
  const onLogoClick = () => {
    dispatch(setImageZoom(logoSrc))
  }

  if (location.pathname === '/') return null;

  return (
    <Box
      component='footer'
      sx={{
        height: '120px',
        width: '100vw',
        boxShadow: `inset 0 50px 50px -6px rgba(0,0,0,${(lightMode) ? '0.15' : '0.5'})`
      }}
    >
      <Box component='hr' sx={{ width: '95%' }} />
      <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
        <Box
          component='img'
          src={logoSrc}
          onClick={onLogoClick}
          sx={{
            height: '30%',
            '&:hover': {
              scale: '1.2'
            },
            cursor: 'pointer',
            transition: 'scale 0.2s ease-in-out'
          }}
        />
        <Box sx={{ height: '30%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography fontFamily='my-handwriting' sx={{ lineHeight: 1, fontWeight: 'bold' }}>
            {'Designed by Gordon Wang 2023 ©'}
          </Typography>
          <Typography fontFamily='my-handwriting' sx={{ lineHeight: 1 }}>
            {`Last updated: ${ISOToDateStr(gitInfo.commit.date)}`}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

