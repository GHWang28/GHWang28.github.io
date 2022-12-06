import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log('huh');
  }, [pathname]);

  return children;
}