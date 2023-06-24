import React, { Fragment } from 'react';
import { Box, useMediaQuery } from "@mui/material";

function CardContainer ({ cardData, component: Component }) {
  const largeMq = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  if (largeMq) {
    const evenProj = cardData.filter((_, index) => (
      !(index % 2)
    ))
    const oddProj = cardData.filter((_, index) => (
      (index % 2)
    ))

    return (
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ width: '49.5%', m: 0 }}>
          {evenProj.map((proj, index) => (
            <Component
              key={`project-${proj?.title?.toLowerCase()}`}
              index={index * 2}
              data={proj}
            />
          ))}
        </Box>
        <Box sx={{ width: '49.5%', m: 0  }}>
          {oddProj.map((proj, index) => (
            <Component
              key={`project-${proj?.title?.toLowerCase()}`}
              index={index * 2 + 1}
              data={proj}
            />
          ))}
        </Box>
      </Box>
    )
  }

  return (
    <Fragment>
      {cardData.map((proj, index) => (
        <Component
          key={`project-${proj?.title?.toLowerCase()}`}
          index={index}
          data={proj}
        />
      ))}
    </Fragment>
  )
}

export default CardContainer;
