import { Fragment } from "react";
import InlineCode from "../../components/InlineCode";
import { Box } from "@mui/material";

const blogs = [
  {
    id: 1,
    title: 'Polling in ReactJS',
    subtitle: 'A guide on how to request data from the backend in set intervals.',
    thumbnail: '/images/blog/thumbnail_polling.jpg',
    created: '2023-06-24T04:31:51.316Z',
    estimatedReadingTime: '5',
    quizIncluded: true,
    elements: [
      {
        type: 'h4',
        children: 'What is Polling?'
      },
      {
        type: 'p',
        children: <Fragment>
          <Box component='span' sx={{ color: 'blue.main' }}>
            {'Polling'}
          </Box>
          {' a backend enables you to fetch updated data from a server at regular intervals, providing a way to incorporate real-time updates into your application without relying on manual user actions.'}
        </Fragment>
      },
      {
        type: 'p',
        children: <Fragment>
          {'While '}
          <Box component='span' sx={{ color: 'blue.main' }}>
            {'polling'}
          </Box>
          {' is not as efficient as Websocket connections, it serves as a extremely simple choice for situations where data that are infrequently updated and that synchronisation is not too important.'}
        </Fragment>
      },
      {
        type: 'p',
        children: <Fragment>
        {'For instance, you wouldn\'t use '}
        <Box component='span' sx={{ color: 'blue.main' }}>
          {'polling'}
        </Box>
        {' for a live message feed, whereas it becomes more appropriate for scenarios like retrieving weather forecast updates.'}
      </Fragment>
      },
      {
        type: 'h4',
        children: 'The Problem'
      },
      {
        type: 'p',
        children: <Fragment>
        {'Say you have a button counter that keeps track of how many people have clicked on it. Now, let\'s be real, it could be minutes or even hours till the next button click, and nobody\'s going to nitpick about how precise or perfectly synchronised that counter is. So, to keep things simple and practical, you\'ve opted for '}
        <Box component='span' sx={{ color: 'blue.main' }}>
          {'polling'}
        </Box>
        {'.'}
      </Fragment>
      },
      {
        type: 'p',
        children: <Fragment>
          {'Sending a request to the backend for the count will return the following '}
          <InlineCode>
            {'json'}
          </InlineCode>
          {'.'}
        </Fragment>
      },
      {
        type: 'code',
        language: 'json',
        children:  `{
  "totalClicked": 1
}`
      },
      {
        type: 'p',
        children: 'Now, how can we make our application automatically request for that data every minute or so? While it may be simple in Vanilla JavaScript, many people struggle with it in ReactJS due to poor state management.'
      },
      {
        type: 'h4',
        children: 'The Naïve Approach'
      }
      ,
      {
        type: 'p',
        children: <Fragment>
          {'Most people would think to simply use '}
          <InlineCode>
            {'setInterval'}
          </InlineCode>
          {' to create a function scheduled to be repeatedly called every now and then.'}
        </Fragment> 
      },
      {
        type: 'code',
        language: 'jsx',
        children: `import React, { useState, useEffect } from 'react';

const CounterButton = () => {
  const [counter, setCounter] = useState(0);

  const handleButtonClick = () => {
    // Send request to the backend to increase the counter
    // ...
  };

  // Setting up polling
  setInterval(() => {
    fetch('/api/getCounter')
      .then((res) => res.json())
      .then((data) => {
        setCounter(data.counter);
      })
      .catch((error) => {
        // Error handling...
      });
  }, 5000);

  return (
    <button onClick={handleButtonClick}>
      {counter}
    </button>
  );
};

export default CounterButton;
`
      },
      {
        type: 'quiz',
        question: 'What\'s wrong with the above method of polling?',
        options: [
          { text: 'You risk scheduling the same function multiple times.', correct: true },
          { text: 'It only polls the backend once.', correct: false },
          { text: 'It never polls the backend, so counter remains a 0.', correct: false },
          { text: 'The polling will occur before this button component is mounted.', correct: false }
        ],
        children: 'Every time the component function is invoked, a new interval schedule would be created in parallel to the original one. For instance, every time your component\'s state updates, it will add separate but identical "thread" for calling that polling function, leading to overlapping intervals and potentially excessive API requests. This then leads to higher risks of bottlenecking in the backend.'
      },
      {
        type: 'p',
        children: 'This Blog post is still under construction. Thank you for your patience!'
      },
    ]
  },
  {
    id: 2,
    title: 'Placeholder Title',
    subtitle: 'This blog page is in WIP state.',
    created: '2023-06-24T04:31:51.316Z',
    estimatedReadingTime: '5'
  }
]

export default blogs;