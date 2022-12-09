import React from 'react';
import { Box, keyframes } from '@mui/material';
import { useState } from 'react';
import { v4 } from 'uuid';
import config from '../../config.json';
import useSound from 'use-sound';
import SMBCoinSFX from '../../sfx/smb-coin.ogg';
import SMB1upSFX from '../../sfx/smb-1up.ogg';

const coinAnimation = keyframes`
  0% {
    translate: -50% 0%
  }
  45%, 55% {
    translate: -50% -110%
  }
  100% {
    translate: -50% 0%
  }
`

function QuestionBlock () {
  const [coins, setCoins] = useState([]);
  const [coinCount, setCoinCount] = useState(0);
  const [playCoin] = useSound(SMBCoinSFX);
  const [play1up] = useSound(SMB1upSFX);

  const onClick = (event) => {
    event.preventDefault();
    const coinBlockElement = document.getElementById('coin-block');
    coinBlockElement.classList.remove('coin-block-anim');
    void coinBlockElement.offsetWidth;
    coinBlockElement.classList.add('coin-block-anim');
    setCoins([...coins, v4()]);

    if (coinCount + 1 >= config.MARIO_EASTER_EGG_LIMIT) {
      play1up();
      setCoinCount(0);
      setCoins([...coins, `1up-${v4()}`]);
    } else {
      playCoin();
      setCoinCount(coinCount + 1);
      setCoins([...coins, `coin-${v4()}`]);
    }
  }

  return (
    <Box sx={{ position: 'relative' }} name='coin-block-easter-egg-container'>
      <Box
        id='coin-block'
        role='button'
        onContextMenu={(event) => { event.preventDefault() }}
        onClick={onClick}
        sx={{
          cursor: 'pointer',
          width: '75px',
          height: '75px',
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
      </Box>
      <Box
        name='coin-mask'
        sx={{
          position: 'absolute',
          width: '75px',
          height: '300px',
          bottom: 0,
          pointerEvents: 'none',
          clipPath: 'polygon(0 0, 100% 0%, 100% 75%, 0 75%);'
        }}
      >
        {coins.map((coinKey) => (
          <Box
            key={coinKey}
            onContextMenu={(event) => { event.preventDefault() }}
            onAnimationEnd={() => {
              const newCoins = [...coins];
              newCoins.splice(coins.indexOf(coinKey), 1);
              setCoins([...newCoins]);
            }}
            sx={{
              animation: `${coinAnimation} 0.7s ease-in-out 1`,
              width: '55px',
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
