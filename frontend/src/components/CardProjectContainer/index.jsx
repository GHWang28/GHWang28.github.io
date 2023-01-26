import React, { Fragment } from 'react';
import { Box, useMediaQuery } from "@mui/material";
import CardProject from "../CardProject";

function CardProjectContainer ({ projects }) {
  const xLargeMq = useMediaQuery((theme) => theme.breakpoints.up('xl'));

  if (xLargeMq) {
    const evenProj = projects.filter((_, index) => (
      !(index % 2)
    ))
    const oddProj = projects.filter((_, index) => (
      (index % 2)
    ))

    return (
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ width: '49.5%', m: 0 }}>
          {evenProj.map((proj, index) => (
            <CardProject
              key={`project-${proj?.title?.toLowerCase()}`}
              index={index * 2}
              {...proj}
            />
          ))}
        </Box>
        <Box sx={{ width: '49.5%', m: 0  }}>
          {oddProj.map((proj, index) => (
            <CardProject
              key={`project-${proj?.title?.toLowerCase()}`}
              index={index * 2 + 1}
              {...proj}
            />
          ))}
        </Box>
      </Box>
    )
  }

  return (
    <Fragment>
      {projects.map((proj, index) => (
        <CardProject
          key={`project-${proj?.title?.toLowerCase()}`}
          index={index}
          {...proj}
        />
      ))}
    </Fragment>
  )
}

export default CardProjectContainer;
