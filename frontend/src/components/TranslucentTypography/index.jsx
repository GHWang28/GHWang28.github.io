import { Typography, styled } from '@mui/material';

const TransluscentTypography = styled(Typography)(({ theme }) => {
  return {
    border: `1px solid ${(theme.palette.mode === 'dark') ? 'whitesmoke' : 'black'}`,
    borderRadius: '15px',
    margin: '5px 0px',
    padding: '0px 10px',
    backgroundColor: (theme.palette.mode === 'dark') ? theme.palette.darkgray.translucent : 'rgba(255,255,255,0.5)'
  }
});

export default TransluscentTypography;