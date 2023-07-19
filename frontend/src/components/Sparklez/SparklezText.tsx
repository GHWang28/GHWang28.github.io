import React from 'react';
import Sparklez from '.';

type ComponentProps = {
  children: React.ReactNode,
  gradient?: string,
  noSparklez?: boolean
}

const SparklezText = ({ children, gradient = '', noSparklez = false }: ComponentProps) => (
  (noSparklez) ? (
    <span className={`gradient-text ${gradient}`}>
      {children}
    </span>
  ) : (
    <Sparklez>
      <span className={`gradient-text ${gradient}`}>
        {children}
      </span>
    </Sparklez>
  )
)

export default SparklezText;
