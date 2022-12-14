import { Box } from "@mui/material";

function AbsoluteWrapper ({ children, pb, pt, px }) {
  return (
    <Box sx={{ width: '100%', height: 'fit-content', position: 'absolute', left: '0px', top: '0px', overflow: 'clip' }}>
      <Box pt={pt} pb={pb} px={px} sx={{ height: 'fit-content' }}>
        {children}
      </Box>
    </Box>
  )
}

export default AbsoluteWrapper;
