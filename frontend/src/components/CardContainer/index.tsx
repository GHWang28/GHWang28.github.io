import React, { Fragment } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { BlogData, ProjectData } from '../../types';
import { splitArray } from '../../helpers';

type ComponentProps = {
  cardData: BlogData[] | ProjectData[],
  component: React.ElementType
}

const CardContainer = ({ cardData, component: Component }: ComponentProps) => {
  const theme = useTheme();
  const largeMq = useMediaQuery(theme.breakpoints.up('lg'));

  if (largeMq) {
    const { odd: oddProj, even: evenProj } = splitArray(cardData);

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
