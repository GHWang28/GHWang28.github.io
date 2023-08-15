import React from 'react';
import { Box, SxProps } from '@mui/material';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';

type ComponentProps = {
  src?: string,
  alt?: string,
  bgcolor?: string
  sx?: SxProps
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

const ImageAvatar = ({ src, alt, bgcolor = 'whitesmoke', sx, onClick }: ComponentProps) => {

  return (
    <Box
      sx={{
        width: '60px',
        height: '60px',
        overflow: 'clip',
        borderRadius: '50%',
        color: 'whitesmoke',
        bgcolor,
        cursor: 'pointer',
        transition: 'scale 0.2s ease-in-out, rotate 0.5s ease-in-out',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        WebkitTapHighlightColor: 'transparent',
        ...sx
      }}
      onClick={onClick}
    >
      {(src) ? (
        <Box
          component='img'
          alt={alt}
          src={src}
          sx={{ width: '85%', height: '85%' }}
        />
      ) : (
        <WorkHistoryIcon sx={{ width: '85%', height: '85%' }} />
      )}
    </Box>
  )
}

export default ImageAvatar;
