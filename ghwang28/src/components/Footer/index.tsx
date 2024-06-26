import React, { useState } from 'react';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { useLocation } from 'react-router';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import MailIcon from '@mui/icons-material/Mail';
import BootstrapTooltip from '../BootstrapTooltip';
import ImageZoomable from '../ImageZoomable';
import { useInView } from 'react-intersection-observer';
import { FooterContacts } from '../../types';
import config from '../../config.json';

const Footer = () => {
  const [ref, inView] = useInView();
  const location = useLocation();
  const lightMode = (useTheme().palette.mode === 'light');
  const [copiedAddress, setCopiedAddress] = useState(false);
  const logoSrc = (lightMode) ? '/images/gw-logo.webp' : '/images/gw-logo-light.webp';

  if (location.pathname === '/') return null;

  const allContacts: FooterContacts[] = [
    {
      onClick: () => {
        window.open(config.GITHUB, '_blank')?.focus();
      },
      title: 'Go to my GitHub',
      icon: <GitHubIcon />,
    },
    {
      onClick: () => {
        window.open(config.LINKED_IN, '_blank')?.focus();
      },
      title: 'Go to my LinkedIn',
      icon: <LinkedInIcon />,
    },
    {
      onClick: () => {
        navigator.clipboard.writeText('gordon.wang280801@gmail.com');
        setCopiedAddress(true)
      },
      title: (copiedAddress) ? 'E-mail Address has been copied!' : 'Copy E-mail Address to Clipboard',
      icon: <MailIcon />,
    },
  ]

  return (
    <Box
      ref={ref}
      component='footer'
      pb={2}
      px={'2.5%'}
      sx={{
        height: 'fit-content',
        boxSizing: 'border-box',
        width: '100vw',
        boxShadow: `inset 0 50px 50px -6px rgba(0,0,0,${(lightMode) ? '0.1' : '0.3'})`
      }}
    >
      <Box component='hr' mb={2} sx={{ opacity: 0.5 }}/>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
        {/* Contact Buttons */}
        {allContacts.map((contact) => (
          <BootstrapTooltip title={contact.title} key={contact.title} placement='top'>
            <IconButton
              onClick={contact.onClick}
              sx={{
                transition: 'rotate 0.5s ease-in-out, scale 0.2s ease-in-out',
                rotate: '0deg',
                scale: (inView) ? '1' : '0',
                '&:hover': {
                  rotate: '360deg'
                }
              }}
            >
              {contact.icon}
            </IconButton>
          </BootstrapTooltip>
        ))}
      </Box>
      <Box
        p={2}
        sx={{
          borderRadius: '15px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          bgcolor: (lightMode) ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.06)'
        }}
      >
        <ImageZoomable
          src={logoSrc}
          alt='Website Logo'
          sx={{
            height: '32px',
            '&:hover': {
              scale: '1.2'
            },
            transition: 'scale 0.2s ease-in-out'
          }}
        />
        <Box sx={{ height: '30%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography fontFamily='my-handwriting' sx={{ lineHeight: 1, fontWeight: 'bold' }}>
            {'© 2024 Designed by Gordon Wang'}
          </Typography>
          <Typography fontFamily='my-handwriting' sx={{ lineHeight: 1 }}>
            {`Last updated: ${config.LATEST_UPDATE}`}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Footer;
