import React, { Fragment } from 'react';
import { Box, useMediaQuery, Theme } from '@mui/material';
import { splitArray } from '../../helpers';

type ComponentProps = {
  children: React.ReactNode
}

const CardContainer = ({ children }: ComponentProps) => {
  const largeMq = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  if (largeMq) {
    const { odd: oddProj, even: evenProj } = splitArray(children as React.ReactNode[]);

    return (
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ width: '49.5%', m: 0 }}>
          {evenProj}
        </Box>
        <Box sx={{ width: '49.5%', m: 0  }}>
          {oddProj}
        </Box>
      </Box>
    )
  }

  return (
    <Fragment>
      {children}
    </Fragment>
  )
}

export default CardContainer;
