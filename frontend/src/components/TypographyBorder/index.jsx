import { Typography, styled } from '@mui/material';

const TypographyBorder = styled(Typography)(({ theme }) => {
  return {
    border: `1px solid ${(theme.palette.mode === 'dark') ? 'whitesmoke' : 'black'}`,
    borderRadius: '15px',
    margin: '5px 0px',
    padding: '0px 10px',
    backgroundColor: (theme.palette.mode === 'dark') ? theme.palette.darkgray.main : 'whitesmoke'
  }
});

export default TypographyBorder;