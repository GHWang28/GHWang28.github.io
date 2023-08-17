import React, { Fragment } from 'react';
import { useMediaQuery, Theme } from '@mui/material';
import { splitArray } from '../../helpers';

type ComponentProps = {
  children: React.ReactNode
}

const CardContainer = ({ children }: ComponentProps) => {
  const largeMq = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  if (largeMq) {
    const { odd, even } = splitArray(children as React.ReactNode[]);

    return (
      <section style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '49.5%', margin: 0 }}>
          {even}
        </div>
        <div style={{ width: '49.5%', margin: 0  }}>
          {odd}
        </div>
      </section>
    )
  }

  return (
    <Fragment>
      {children}
    </Fragment>
  )
}

export default CardContainer;
