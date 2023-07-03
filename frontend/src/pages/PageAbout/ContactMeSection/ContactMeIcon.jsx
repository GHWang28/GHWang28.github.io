import { Box, IconButton, keyframes, Typography } from "@mui/material";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import BootstrapTooltip from "../../../components/BootstrapTooltip";

const onClick = keyframes`
  0% {
    scale: 0
  }
  100% {
    scale: 1
  }
`

export default function ContactMeIcon ({ contact }) {
  const [clicked, setClicked] = useState(false);
  const [ref, inView] = useInView({
    rootMargin: '9999999px 0px 0px 0px'
  });

  return (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        transition: 'scale 0.5s ease-in-out',
        scale: (inView) ? '1' : '0'
      }}
    >
      <BootstrapTooltip title={contact.tooltip} placement='top'>
        <IconButton
          onClick={() => { contact.onClick(); setClicked(true); }}
          sx={{
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: 'borderColor.main',
            transition: 'rotate 0.5s ease-in-out',
            rotate: '0deg',
            '&:hover': {
              rotate: '360deg'
            }
          }}
        >
          {contact.icon}
        </IconButton>
      </BootstrapTooltip>
      <Typography fontWeight='bold' align='center'>
        {contact.label}
      </Typography>
      {(contact.info) && (
        <Typography fontWeight='bold' fontSize={'0.7em'} align='center' color='text.secondary'>
          {contact.info}
        </Typography>
      )}
      {(clicked && contact.extraInfo) && (
        <Typography fontWeight='bold' fontSize={'0.7em'} align='center' color='green.main' sx={{ animation: `${onClick} 0.2s ease-in-out 1` }}>
          {contact.extraInfo}
        </Typography>
      )}
    </Box>
  )
}