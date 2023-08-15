import React from 'react';
import { SvgIcon, useTheme, SxProps } from '@mui/material';

type ComponentProps = {
  sx?: SxProps
}

const ReactIcon = ({ sx }: ComponentProps) => {
  const themeMode = useTheme().palette.mode;
  return (
    <SvgIcon sx={sx} viewBox='-11.5 -10.23174 23 20.46348'>
      <circle xmlns='http://www.w3.org/2000/svg' cx='0' cy='0' r='2.05'/>
      <g xmlns='http://www.w3.org/2000/svg' stroke={(themeMode === 'dark') ? 'whitesmoke' : 'rgb(27,27,27)'} strokeWidth='1' fill='none'>
        <ellipse rx='11' ry='4.2'/>
        <ellipse rx='11' ry='4.2' transform='rotate(60)'/>
        <ellipse rx='11' ry='4.2' transform='rotate(120)'/>
      </g>
    </SvgIcon>
  )
}

export default ReactIcon;
