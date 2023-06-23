import React from 'react';
import { Box, Typography } from "@mui/material";

export default function CardBlogContainer ({ blogs }) {

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      {/*blogs.map((blogItem) => (
        <Box
          sx={{
            width: '100%',
            height: '100px'
          }}
        >
          <Typography>
            {blogItem.id}
          </Typography>
          <Typography>
            {blogItem.title}
          </Typography>
        </Box>
      ))*/}
      <Typography color='salmon' fontWeight='bold' my={10} align='center'>
        {'This page is still in a work-in-progress state. Stay tuned!'}
      </Typography>
    </Box>
  )
}
