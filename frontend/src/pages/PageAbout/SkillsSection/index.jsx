import { Box, Typography, useMediaQuery } from "@mui/material";
import { useInView } from "react-intersection-observer";
import ImageScroller from "../../../components/ImageScroller";

export default function SkillsSection () {
  const [ref, inView] = useInView();
  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  return (
    <Box
      ref={ref}
      sx={{
        opacity: (inView) ? '1' : '0',
        translate: (inView) ? '0px' : '50px',
        transition: 'translate 0.2s ease-in-out, opacity 0.2s ease-in-out',
      }}
    >
      <Typography variant='h4' fontWeight='bold' align='center'>
        {'Skills'}
      </Typography>
      <Typography mb={(smallMq) ? 1 : 3} variant='subtitle1' fontWeight='bold' align='center' color='text.secondary'>
        {'I possess skills in...'}
      </Typography>
      <ImageScroller
        height='75px'
        images={[
          '/images/about/skills/c++.svg',
          '/images/about/skills/css.svg',
          '/images/about/skills/firebase.svg',
          '/images/about/skills/html.svg',
          '/images/about/skills/java.svg',
          '/images/about/skills/js.svg',
          '/images/about/skills/opengl.svg',
          '/images/about/skills/psql.svg',
          '/images/about/skills/python.svg',
          '/images/about/skills/react.svg'
        ]}
      />
    </Box>
  )
}