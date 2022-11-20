import { Box } from "@mui/system"
import { useState } from "react";
import { useNavigate } from "react-router";
import LetterBox from "./LetterBox";

function LogoBox () {
  const [face, setFace] = useState(0);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: '50px',
        height: '50px',
        mr: 2
      }}
      onClick={() => { setFace((face + 1) % 6); navigate('/') }}
    >
      {(face === 0) && (
        <LetterBox letter='G' />
      )}
      {(face === 1) && (
        <LetterBox letter='H' />
      )}
      {(face === 2) && (
        <LetterBox letter='W' />
      )}
      {(face === 3) && (
        <LetterBox letter='A' />
      )}
      {(face === 4) && (
        <LetterBox letter='N' />
      )}
      {(face === 5) && (
        <LetterBox letter='G' />
      )}
    </Box>
  )
}

export default LogoBox
