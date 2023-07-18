import React from 'react';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.tooltipColor.bgColor,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.tooltipColor.bgColor,
    color: theme.palette.tooltipColor.main,
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

export default BootstrapTooltip;
