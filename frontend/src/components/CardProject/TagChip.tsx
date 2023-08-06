import React, { useState } from 'react';
import { Box, Collapse, Typography } from '@mui/material';
import TagIcon from '../../icons/TagIcon';
import { IconTypes } from '../../types';


type ComponentProps = {
  label: IconTypes
}

const TagChip = ({ label }: ComponentProps) => {

  const [hover, setHover] = useState<boolean>(false);

  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'contrastColor.main',
        color: 'contrastColor.main',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '16px',
        bgcolor: 'bgColor.main',
        p: 0.5,
      }}
      onMouseEnter={() => { setHover(true) }}
      onMouseLeave={() => { setHover(false) }}
    >
      <TagIcon sx={{ rotate: (hover) ? '360deg' : '0deg', transition: 'rotate 0.5s ease-in-out' }} label={label} />
      <Collapse component={Typography} in={hover} orientation='horizontal' sx={{ whiteSpace: 'nowrap' }}>
        {` ${label} `}
      </Collapse>
    </Box>
  )
}

export default TagChip;
