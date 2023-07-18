import React, { useEffect, useState, useRef } from 'react';
import { Box, keyframes } from '@mui/material';
import config from '../../config.json';
import useSound from 'use-sound';
import SMBCoinSFX from '../../sfx/smb-coin.ogg';
import SMB1upSFX from '../../sfx/smb-1up.ogg';
import Sparklez from '../Sparklez';
import { animated, useSpring } from 'react-spring';
import { easings } from '@react-spring/web'

const coinAnimation = keyframes`
  0% {
    translate: -50% 0%
  }
  45%, 55% {
    translate: -50% -130%
  }
  100% {
    translate: -50% 0%
  }
`

const QuestionBlock = () => {
  const AnimatedBox = animated(Box);

  const [coins, setCoins] = useState<string[]>([]);
  const [coinCount, setCoinCount] = useState<number>(0);
  const [playCoin] = useSound(SMBCoinSFX);
  const [play1up] = useSound(SMB1upSFX);

  const coinBlockRef = useRef<HTMLElement>(null);
  const coinMaskRef = useRef<HTMLElement>(null);

  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const coinBlockElement = coinBlockRef.current;
    coinBlockElement?.classList.remove('coin-block-anim');
    void coinBlockElement?.offsetWidth;
    coinBlockElement?.classList.add('coin-block-anim');

    const coinMaskElement = coinMaskRef.current;
    coinMaskElement?.classList.remove('coin-clip-anim');
    void coinMaskElement?.offsetWidth;
    coinMaskElement?.classList.add('coin-clip-anim');

    const epoch = Date.now();
    if (coinCount + 1 >= config.MARIO_EASTER_EGG_LIMIT) {
      play1up();
      setCoinCount(0);
      setCoins([...coins, `1up-${epoch}`]);
    } else {
      playCoin();
      setCoinCount(coinCount + 1);
      setCoins([...coins, `coin-${epoch}`]);
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currEpoch = Date.now();
      setCoins(coins.filter((key) => {
        // Filter out expired coins
        const keyEpoch = Number(key.split('-')[1]);
        return (currEpoch - keyEpoch) <= 650;
      }));
    }, 650);
  
    return () => { clearTimeout(timeout) };
  });

  return (
    <Box sx={{ position: 'relative' }}>
      <Sparklez frequency={1.5} sizeRange={[15, 30]}>
        <AnimatedBox
          ref={coinBlockRef}
          role='button'
          title='??? Block'
          style={useSpring({
            from: { opacity: 0, y: -500 },
            to: { opacity: 1, y: 0 },
            config: {
              duration: 1000,
              easing: easings.easeOutBounce
            }
          })}
          onContextMenu={(event) => { event.preventDefault() }}
          onClick={onClick}
          sx={{
            cursor: 'pointer',
            width: '75px',
            height: '75px',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          <Box
            sx={{
              height: '100%',
              width: '100%',
              maskImage: 'url(/images/easter-egg/question-block.svg)',
              maskSize: '100%',
              maskRepeat: 'no-repeat'
            }}
          >
            <Box
              className={'gradient-background'}
              sx={{ height: '100%', width: '100%' }}
            />
          </Box>
        </AnimatedBox>
      </Sparklez>
      <Box
        ref={coinMaskRef}
        sx={{
          position: 'absolute',
          width: '75px',
          height: '300px',
          bottom: '4px',
          pointerEvents: 'none',
          clipPath: 'polygon(0 0, 100% 0%, 100% 75%, 0 75%)'
        }}
      >
        {coins.map((coinKey) => (
          <Box
            key={coinKey}
            onContextMenu={(event) => { event.preventDefault() }}
            sx={{
              animation: `${coinAnimation} 0.65s ease-in-out 1`,
              width: (coinKey.startsWith('coin')) ? '50px' : '75px',
              height: '75px',
              position: 'absolute',
              bottom: 0,
              left: '50%',
              zIndex: -1
            }}
          >
            <Box
              sx={{
                height: '100%',
                width: '100%',
                maskImage: (coinKey.startsWith('1up')) ? 'url(/images/easter-egg/1up.png)' : 'url(/images/easter-egg/coin.svg)',
                maskSize: '100%',
                maskRepeat: 'no-repeat'
              }}
            >
              <Box
                className={'gradient-background'}
                sx={{ height: '100%', width: '100%' }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default QuestionBlock;
