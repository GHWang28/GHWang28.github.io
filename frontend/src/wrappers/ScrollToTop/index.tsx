import React from 'react';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type ComponentProps = {
  children: React.ReactNode
}

export default function ScrollToTop({ children }: ComponentProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, [pathname]);

  return children;
}