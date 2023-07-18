import React from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, IconButton, styled, useTheme } from '@mui/material';
import BootstrapTooltip from '../BootstrapTooltip';
import { useSpring, animated } from 'react-spring';
import { easings } from '@react-spring/web'
import config from '../../config.json';

const OutlinedButton = styled(IconButton)(() => {
  const theme = useTheme();
  return {
    border: `1px solid ${theme.palette.borderColor.main}`
  }
});

const ContactDetails = () => {
  const AnimatedBox = animated(Box);
  const allLinks = [
    {
      href: config.GITHUB,
      title: 'Go to my GitHub',
      icon: <GitHubIcon />,
      style: useSpring({
        from: { y: 50 },
        to: { y: 0 },
        delay: 1750,
        config: {
          duration: 1000,
          easing: easings.easeOutBounce
        }
      })
    },
    {
      href: config.LINKED_IN,
      title: 'Go to my LinkedIn',
      icon: <LinkedInIcon />,
      style: useSpring({
        from: { y: 50 },
        to: { y: 0 },
        delay: 1500,
        config: {
          duration: 1000,
          easing: easings.easeOutBounce
        }
      })
    },
  ];

  return (
    <Box
      sx={{
        position: 'fixed',
        right: '10px',
        bottom: '0px',
        display: 'flex',
        overflow: 'hidden',
        gap: 0.5
      }}
    >
      {allLinks.map((link, index) => (
        <AnimatedBox style={link.style} sx={{ mb: 1 }} key={`link-icon-${index}`}>
          <BootstrapTooltip title={link.title} arrow>
            <OutlinedButton onClick={() => { window.open(link.href, '_blank') }}>
              {link.icon}
            </OutlinedButton>
          </BootstrapTooltip>
        </AnimatedBox>
      ))}
    </Box>
  )
}

export default ContactDetails;
