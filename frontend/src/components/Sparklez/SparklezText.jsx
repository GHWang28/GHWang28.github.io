import React from 'react';
import Sparklez from '.';

const SparklezText = ({ children, gradient, noSparklez = false }) => (
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
