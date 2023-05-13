import { Box, Typography } from "@mui/material";
import React from "react";

export default function Disc ({ size, maxSize }) {
  const getColor = () => {
    switch (size) {
      default: return 'lightcoral'
      case 1: return 'cadetblue'
      case 2: return 'forestgreen'
      case 3: return 'goldenrod'
      case 4: return 'crimson'
      case 5: return 'rgb(10,10,10)'
      case 6: return 'chocolate'
      case 7: return 'rgb(69,42,80)'
    }
  }
  return (
    <Box
      sx={{
        height: '30px',
        minHeight: '10px',
        width: `calc(95% / ${maxSize} * ${size})`,
        bgcolor: getColor(),
        opacity: '100%',
        borderRadius: '15px',
        border: '2px solid black',
        zIndex: 10
      }}
    >
      <Typography align='center' fontWeight='bold' sx={{ opacity: '0.75', color: 'whitesmoke' }}>
        {size}
      </Typography>
    </Box>
  )
}
