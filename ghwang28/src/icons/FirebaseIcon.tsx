import React from 'react';
import { SvgIcon, SxProps } from '@mui/material';

type ComponentProps = {
  sx?: SxProps
}

const FirebaseIcon = ({ sx }: ComponentProps) => (
  <SvgIcon sx={sx} xmlns='http://www.w3.org/2000/svg' version='1.1' width='800' height='800' viewBox='0 0 512 512'>
    <path id='icon' d='M93.19,329.38,140.64,25.31c1.64-10.37,15.55-12.82,20.46-3.55l51,95.45ZM432,400,385.26,123.21a11,11,0,0,0-18.54-6L80,400l159.36,91.91a33.18,33.18,0,0,0,31.91,0ZM302.36,158.93,265.82,89.39a10.86,10.86,0,0,0-19.36,0L85.83,375.74Z'/>
  </SvgIcon>
)

export default FirebaseIcon;