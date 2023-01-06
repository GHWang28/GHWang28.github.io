import { Tooltip, tooltipClasses } from "@mui/material";
import { styled } from "@mui/system";

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.tooltipColor.bgColor,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.tooltipColor.bgColor,
    color: theme.palette.tooltipColor.textColor,
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

export default BootstrapTooltip;
