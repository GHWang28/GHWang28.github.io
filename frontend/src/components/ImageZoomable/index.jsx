import { Box } from "@mui/material"
import { useDispatch } from "react-redux"
import { setImageZoom } from "../../redux/actions";

export default function ImageZoomable ({ src, sx, alternateSrc = '', ...props }) {
  const dispatch = useDispatch();

  return (
    <Box
      component='img'
      src={src}
      {...props}
      sx={{
        ...sx,
        cursor: 'pointer'
      }}
      onClick={() => { dispatch(alternateSrc || setImageZoom(src)) }}
    />
  )
}