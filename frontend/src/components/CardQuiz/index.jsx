
import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Collapse, Grid, IconButton, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { randomiseArray } from '../../helpers';
import TypographyBorder from '../TypographyBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RefreshIcon from '@mui/icons-material/Refresh';
import BootstrapTooltip from '../BootstrapTooltip';
import AccordionWrapper from '../AccordionWrapper';

export default function CardQuiz ({ question, options }) {
  const theme = useTheme();

  const [answered, setAnswered] = useState(false);
  const [answerMessage, setAnswerMessage] = useState('');
  const [explanation, setExplanation] = useState('');
  const [incorrect, setIncorrect] = useState(false);
  const [randomisedOptions, setRandomisedOptions] = useState([]);
  const responseTitleRef = useRef();

  useEffect(() => {
    setRandomisedOptions(randomiseArray(options));
  }, [options]);

  // This function is called by the top right button
  const handleIconButton = () => {
    setAnswered(!answered);
    setIncorrect(false);

    // If not answered yet, then change the answer message to this
    if (!answered) {
      setAnswerMessage('Answer Revealed')
    } else {
      setRandomisedOptions(randomiseArray(options));
    };
  }

  // This funciton is called when one of the answer options is clicked on
  const handleOptionClick = (isCorrect, explanation) => {
    const responseTitleElement = responseTitleRef.current;
    responseTitleElement.classList.remove('logo-anim');
    void responseTitleElement.offsetWidth;
    responseTitleElement.classList.add('logo-anim');

    setIncorrect(!isCorrect);
    setExplanation(explanation);
    if (isCorrect) {
      setAnswered(true);
      setAnswerMessage(`✅ ${randomiseArray(['Correct!', 'Well Done!', 'Fantastic!'])[0]}`);
    } else {
      setAnswerMessage(`❌ ${randomiseArray(['Incorrect!', 'Try Again!', 'Not Quite!'])[0]}`);
      
    }
  }
  
  return (
    <AccordionWrapper title={`🧩 Quiz - Try to complete me before continuing.`}>
      <Box
        sx={{
          borderRadius: '15px',
          bgcolor: 'bgColor.main',
          boxSizing: 'border-box',
          position: 'relative',
          boxShadow: '0 8px 6px -6px black'
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
          {randomisedOptions.map((option, index) => (
            <Grid
              key={`option-${index}`}
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
                  opacity: (answered && !option.correct) ? '0.5' : '1',
                  boxShadow: '0 8px 6px -6px black'
                }}
                disabled={answered}
                onClick={(event) => {
                  event.preventDefault();
                  handleOptionClick(option.correct, option.explanation);
                }}
              >
                <Typography fontSize={16} color={(!answered) ? theme.palette.borderColor.main : (answered && option.correct) ? theme.palette.green.main : theme.palette.red.main} align='center'>{option.text}</Typography>
              </Button>
            </Grid>
          ))}
        </Grid>

        <Collapse in={answered || incorrect} sx={{ overflow: 'hidden',  boxSizing: 'border-box' }}>
          <Typography ref={responseTitleRef} variant='h5' align='center' color={(incorrect) ? theme.palette.red.main : theme.palette.green.main} my={2}>
            {answerMessage}
          </Typography>
          <TypographyBorder sx={{ bgcolor: (theme.palette.mode === 'light') ? '#FAFAFA' : '#1E1E1E' }} textAlign='justify' fontSize={16}>
            {explanation}
          </TypographyBorder>
        </Collapse>
      </Box>
    </AccordionWrapper>
  )
}

CardQuiz.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.element.isRequired]),
    correct: PropTypes.bool.isRequired,
    explanation: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.element.isRequired])
  })).isRequired,
  question: PropTypes.string.isRequired
};

