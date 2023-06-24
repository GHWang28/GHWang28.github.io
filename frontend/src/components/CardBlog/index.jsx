import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useInView } from "react-intersection-observer";


export default function CardBlog ({ data, index = 0 }) {
  const [ref, inView] = useInView();
  const largeMq = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const mediumMq = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const theme = useTheme();
  const themeMode = theme.palette.mode;

  const {
    id,
    title
  } = data;

  return (
    <Box
      ref={ref}
      className='border-gradient'
      p={2}
      sx={{
        position: 'relative',
        opacity: (inView) ? '1' : '0',
        translate: (inView) ? '0px' : ((index % 2) ? '100px' : '-100px'),
        transition: 'scale 0.5s ease-in-out, box-shadow 0.5s ease-in-out, translate 0.5s ease-in-out, opacity 0.5s ease-in-out',
        borderRadius: '15px',
        overflow: 'hidden',
        mx: (largeMq) ? 0 : (mediumMq) ? 5 : 0,
        mb: (mediumMq) ? 5 : 2,
        bgcolor: 'bgColor.main',
        scale: '0.975',
        boxShadow: '0 4px 8px 0 rgba(255,255,255,0.2)',
        '&:hover': {
          boxShadow: '0 4px 16px 0 rgba(255,255,255,0.2)',
          scale: '1'
        }
      }}
    >
      <Typography>
        {id}
      </Typography>
      <Typography>
        {title}
      </Typography>
    </Box>
  )
}