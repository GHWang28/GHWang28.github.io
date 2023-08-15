import { Box } from '@mui/material';
import Disc from './Disc';
import Rod from './Rod';
import React, { useEffect, useState } from 'react';
import { isSorted, rng } from '../../../helpers';
// @ts-ignore
import useSound from 'use-sound';
import victorySFX from '../../../sfx/victory.ogg'
import cardSFX from '../../../sfx/card.ogg'
import errorSFX from '../../../sfx/error.ogg'

const Hanoi = () => {
  const [stacks, setStacks] = useState<number[][]>([[],[],[]]);
  const [totalStacks, setTotalStacks] = useState<number>(rng(3,8));
  const [prevTowerIndex, setPrevTower] = useState<number>(-1);
  const [gameWon, setGameWon] = useState(false);
  const [playErrorSFX] = useSound(errorSFX);
  const [playVictorySFX] = useSound(victorySFX);
  const [playCardSFX] = useSound(cardSFX);

  // Setup function
  useEffect(() => {
    const newStack: number[][] = [[],[],[]];
    for (let i = 1; i <= totalStacks; i++) {
      // Push each size onto the new stack
      newStack[0].push(i);
    }
    setStacks(newStack);
  }, [totalStacks]); // <-- this function only gets called once

  const onSwap = (targetTowerIndex: number) => {
    const newStacks = [...stacks];

    if (prevTowerIndex < 0) {
      // If a tower hasn't been selected yet, select it now
      setPrevTower(targetTowerIndex);
      return;
    }

    if (prevTowerIndex === targetTowerIndex || stacks[prevTowerIndex].length === 0) {
      // If clicked on same tower as previously OR there's nothing to move
      // from previous tower, do nothing
      playErrorSFX();
      setPrevTower(-1);
      return;
    }

    // Moves the disc over to new tower only if that new addition still has
    // the tower be sorted
    const prevTower = [...stacks[prevTowerIndex]];
    const targetTower = [...stacks[targetTowerIndex]];

    if (isSorted([prevTower[0], ...stacks[targetTowerIndex]])) {
      // Pop disc and move it over if order is maintained
      const poppedDisc = prevTower.shift();
      if (poppedDisc !== undefined) {
        targetTower.unshift(poppedDisc);
        playCardSFX();
      }
    } else {
      // If not sorted, play error sound effect
      playErrorSFX();
    }

    // Setting state
    newStacks[prevTowerIndex] = prevTower;
    newStacks[targetTowerIndex] = targetTower;
    setStacks([...newStacks]);
    setPrevTower(-1);

    // Check if the last stack has all the discs
    if (newStacks[newStacks.length - 1].length === totalStacks) {
      playVictorySFX();
      setGameWon(true);
    }
  }

  // After 2 seconds, reset the game when won
  useEffect(() => {
    if (!gameWon) return;

    const timeout = setTimeout(() => {
      setTotalStacks(rng(3,8));
      setGameWon(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    }
  }, [gameWon])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 350px)',
        minHeight: '400px'
      }}
    >
      {/* Container containing the 3 stacks */}
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
        {stacks.map((stack, index) => (
          // Map the stacks to its respective box.
          <Box
            key={`stack-${index}`}
            sx={{
              height: '400px',
              width: '30vw',
              maxWidth: '300px',
              border: '2px solid',
              borderColor: 'contrastColor.main',
              borderRadius: '15px',
              position: 'relative',
              bgcolor: (prevTowerIndex === index) ? 'rgb(0,0,0,0.25)' : '',
              cursor: 'pointer'
            }}
            onClick={() => {
              onSwap(index)
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'end',
                flexDirection: 'column',
                alignItems: 'center',
                height: '95%',
              }}
            >
              {stack.map((size, index) => (
                // Maps the discs
                <Disc size={size} maxSize={totalStacks} key={`disc-${index}`} />
              ))}
            </Box>
            {/* Background Rod */}
            <Rod />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Hanoi;
