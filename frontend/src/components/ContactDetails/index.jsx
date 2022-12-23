import React from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, IconButton, styled } from '@mui/material';
import DeviantArtIcon from '../../icons/DeviantArtIcon';
import BootstrapTooltip from '../BootstrapTooltip';
import { useSpring, animated } from 'react-spring';
import { easings } from '@react-spring/web'

const OutlinedButton = styled(IconButton)(() => ({
  border: '1px solid white',
  marginLeft: '5px'
}));

function ContactDetails () {
  const AnimatedBox = animated(Box);
  const allLinks = [
    {
      href: 'https://deviantart.com/valnorth1001',
      title: 'Go to my DeviantArt',
      icon: <DeviantArtIcon />,
      style: useSpring({
        from: { y: 50 },
        to: { y: 0 },
        delay: 2000,
        config: {
          duration: 1000,
          easing: easings.easeOutBounce
        }
      })
    },
    {
      href: 'https://www.github.com/GHWang28',
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
      href: 'https://www.linkedin.com/in/gordon-wang-6b9403232',
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
  ]
  return (
    <Box
      sx={{
        position: 'fixed',
        right: '10px',
        bottom: '0px',
        display: 'flex',
        overflow: 'hidden'
      }}
    >
      {allLinks.map((link, index) => (
        <AnimatedBox style={link.style} sx={{ mb: 1 }} key={`link-icon-${index}`}>
          <BootstrapTooltip title={link.title} arrow>
            <OutlinedButton
              href={link.href}
              target='_blank'
            >
              {link.icon}
            </OutlinedButton>
          </BootstrapTooltip>
        </AnimatedBox>
      ))}
    </Box>
  )
}

export default ContactDetails;
