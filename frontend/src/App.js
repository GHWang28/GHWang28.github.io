import logo from './logo.svg';
import './App.css';
import { Box } from '@mui/material';
import { useSpring, animated } from 'react-spring';

function App() {
  const animationProps = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 }
  })
  const AnimatedBox = animated(Box);
  return (
    <AnimatedBox style={animationProps}>
      WOW THIS IS A WEBSITE
    </AnimatedBox>
  );
}

export default App;
