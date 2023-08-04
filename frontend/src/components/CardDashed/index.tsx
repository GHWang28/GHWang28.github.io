import { Box, styled } from '@mui/material';

const CardDashed = styled(Box)(({ theme }) => ({
  padding: '8px 8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  transition: 'scale 0.5s ease-in-out, box-shadow 0.5s ease-in-out, translate 0.5s ease-in-out, opacity 0.5s ease-in-out',
  borderRadius: '15px',
  overflow: 'hidden',
  backgroundColor: theme.palette.bgColor.transparent,
  height: '350px',
  scale: '0.975',
  backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='15' ry='15' stroke='${theme.palette.mode === 'light' ? 'black' : 'whitesmoke'}' stroke-width='5' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`
}));

export default CardDashed;