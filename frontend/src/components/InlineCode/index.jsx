import { styled } from '@mui/material';

const InlineCode = styled('code')(({ theme }) => ({
  padding: '0px 4px',
  margin: '0px 4px',
  backgroundColor: theme.palette.mode === 'light' ? 'rgb(90,90,90)' : 'rgb(10,10,10)',
  borderRadius: '10px',
  color: theme.palette.mode === 'light' ? 'black' : 'whitesmoke',
}))

export default InlineCode;

