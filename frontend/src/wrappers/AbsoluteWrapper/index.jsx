import { Box } from "@mui/material";

function AbsoluteWrapper ({ children, pb, pt, px }) {
  return (
    <Box sx={{ width: '100%', position: 'absolute', left: '0px', top: '0px' }}>
      <Box pt={pt} pb={pb} px={px}>
        {children}
      </Box>
    </Box>
  )
}

export default AbsoluteWrapper;
