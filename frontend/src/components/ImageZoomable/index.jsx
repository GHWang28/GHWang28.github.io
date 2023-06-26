import { Box } from "@mui/material"
import { useDispatch } from "react-redux"
import { setImageZoom } from "../../redux/actions";

export default function ImageZoomable ({ src, ...props }) {
  const dispatch = useDispatch();

  return (
    <Box
      component='img'
      src={src}
      {...props}
      onClick={() => { dispatch(setImageZoom(src)) }}
    />
  )
}