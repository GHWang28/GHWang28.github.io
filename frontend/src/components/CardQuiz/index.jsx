
import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Collapse, Grid, IconButton, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { randomiseArray } from '../../helpers';
import TransluscentTypography from '../TranslucentTypography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RefreshIcon from '@mui/icons-material/Refresh';
import BootstrapTooltip from '../BootstrapTooltip';

export default function CardQuiz ({ question, options, explanation }) {
  const theme = useTheme();

  const [answered, setAnswered] = useState(false);
  const [answerMessage, setAnswerMessage] = useState('');
  const [incorrect, setIncorrect] = useState(false);
  const [randomisedOptions, setRandomisedOptions] = useState([]);
  const incorrectRef = useRef();

  useEffect(() => {
    setRandomisedOptions(randomiseArray(options));
  }, [options]);

  // This function is called by the top right button
  const handleIconButton = () => {
    setAnswered(!answered);
    setIncorrect(false);

    // If not answered yet, then change the answer message to this
    if (!answered) setAnswerMessage('Answer Revealed');
  }

  // This funciton is called when one of the answer options is clicked on
  const handleOptionClick = (isCorrect) => {
    setIncorrect(!isCorrect);
    if (isCorrect) {
      setAnswered(true);
      setAnswerMessage('Correct!');
    } else {
      const incorrectElement = incorrectRef.current;
      incorrectElement.classList.remove('logo-anim');
      void incorrectElement.offsetWidth;
      incorrectElement.classList.add('logo-anim');
    }
  }
  
  return (
    <Box
      sx={{
        borderRadius: '15px',
        bgcolor: 'bgColor.main',
        border: `2px solid ${theme.palette.borderColor.main}`,
        boxSizing: 'border-box',
        position: 'relative'
      }}
      p={2}
      my={2}
    >
      <BootstrapTooltip title={(answered) ? 'Restart' : 'Reveal Answer'}>
        <IconButton onClick={handleIconButton} sx={{ position: 'absolute', top: '4px', right: '4px' }}>
          {(answered) ? <RefreshIcon /> : <VisibilityIcon />}
        </IconButton>
      </BootstrapTooltip>

      <Typography mb={2} variant='h5' align='center'>{question}</Typography>
      <Grid container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {randomisedOptions.map((option) => (
          <Grid
            key={option.text}
            item xs={12}
            md={6}
          >
            <Button
              sx={{
                p: 2,
                border: `2px solid ${(!answered) ? theme.palette.borderColor.main : (answered && option.correct) ? theme.palette.green.main : theme.palette.red.main}`,
                borderRadius: '15px',
                width: '100%',
                height: '100%',
                boxSizing: 'border-box',
                textTransform: 'none',
                transition: 'scale 0.2s ease-in-out',
                '&:hover': {
                  scale: '1.05'
                },
                opacity: (answered && !option.correct) ? '0.5' : '1'
              }}
              disabled={answered}
              onClick={(event) => {
                event.preventDefault();
                handleOptionClick(option.correct);
              }}
            >
              <Typography fontSize={20} color={(!answered) ? theme.palette.borderColor.main : (answered && option.correct) ? theme.palette.green.main : theme.palette.red.main} align='center'>{option.text}</Typography>
            </Button>
          </Grid>
        ))}
      </Grid>

      <Collapse in={answered} sx={{ overflow: 'hidden',  boxSizing: 'border-box' }}>
        <Typography variant='h5' align='center' color={'green.main'} my={2}>
          {answerMessage}
        </Typography>
        <TransluscentTypography sx={{ bgcolor: 'rgba(0,0,0,0.2)' }} textAlign='justify' fontSize={20}>
          {explanation}
        </TransluscentTypography>
      </Collapse>
      <Collapse in={incorrect} sx={{ overflow: 'hidden', width: '100%', boxSizing: 'border-box' }}>
        <Typography ref={incorrectRef} variant='h5' align='center' color={'red.main'} mt={2}>
          {'Incorrect!'}
        </Typography>
      </Collapse>
    </Box>
  )
}

CardQuiz.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    correct: PropTypes.bool.isRequired
  })).isRequired,
  question: PropTypes.string.isRequired,
  explanation: PropTypes.string.isRequired
};

