import React, { Fragment } from 'react';
import InlineCode from '../../components/InlineCode';
import SparklezText from '../../components/Sparklez/SparklezText';

const blogs = [
  {
    id: 1,
    title: 'Polling in ReactJS',
    subtitle: 'A guide on how to request data from the backend in set intervals.',
    thumbnail: '/images/blog/thumbnail_polling.jpg',
    created: '2023-06-24T04:31:51.316Z',
    estimatedReadingTime: '7',
    quizIncluded: true,
    emoji: '🎣',
    elements: [
      {
        type: 'p',
        children: 'This blog post will mainly focus on how to poll in ReactJS. However, if you\'re using something else like Vanilla Javascript, you should be able to easily extrapolate from the information here for your own needs.'
      },
      {
        type: 'h4',
        children: '1. What is Polling?'
      },
      {
        type: 'p',
        children: 'Polling a backend enables you to fetch updated data from a server at regular intervals, providing a way to incorporate real-time updates into your application without relying on manual user actions.'
      },
      {
        type: 'p',
        children: 'While polling is not as efficient as Websocket connections, its simplicity makes it a better choice for live data that are infrequently updated and when synchronisation is not too important.'
      },
      {
        type: 'p',
        children: 'For instance, you wouldn\'t use polling for a live message feed, whereas you would for scenarios like retrieving weather forecast updates.'
      },
      {
        type: 'h4',
        children: '2. The Problem'
      },
      {
        type: 'p',
        children: 'Say you have a button counter that keeps track of how many people have clicked on it. It could be minutes or even hours till the next button click, and nobody\'s going to nitpick about how precise or perfectly synchronised that counter is. So, to keep things simple and practical, you\'ve opted for polling.'
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
        children: 'Now, how can we make our application automatically request for that data every five seconds or so? While it may be simple in Vanilla JavaScript, many people struggle with it in ReactJS if they\'re unfamiliar with the life-cycle of a React component.'
      },
      {
        type: 'h4',
        children: '3. The Naïve Approach'
      },
      {
        type: 'p',
        children: <Fragment>
          {'Most people would think to simply use '}
          <InlineCode>
            {'setInterval'}
          </InlineCode>
          {' to create a function scheduled to be repeatedly called every now and then. However, it\'s not that simple...'}
        </Fragment> 
      },
      {
        type: 'code',
        language: 'jsx',
        title: 'Naïve polling',
        children: `import React, { useState, useEffect } from 'react';

const CounterButton = () => {
  const [counter, setCounter] = useState(0);

  const handleButtonClick = () => {
    // Send request to the backend to increase the counter
    // ...
  };

  // Setting up polling
  setInterval(() => {
    fetch('.../api/database')
      .then((res) => res.json())
      .then((data) => {
        setCounter(data.totalClicked);
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
        question: 'What is wrong with the above naïve polling?',
        options: [
          {
            text: 'You risk creating multiple parallel timers for the same function.',
            correct: true,
            explanation: <Fragment>
              {'Every time the component function is invoked (i.e., from a state update), a new interval schedule will be created concurrently with the original one. The overlapping of the same interval function will create excessive API requests and may bottleneck in the backend. The more updates your component goes through, the more excessive API requests will be made.'}
              <br />
              <br />
              {'In general, it is recommended to perform any side effects, such as setting up timers, or making API calls, within the useEffect hook. This ensures that the side effects are properly managed and cleaned up when the component unmounts or when the component\'s states (i.e., the dependencies) changes.'}
            </Fragment>,
          },
          {
            text: <Fragment>
              {'A '}
              <InlineCode>{'useEffect'}</InlineCode>
              {' hook is better for creating a polling functionality compared to using '}
              <InlineCode>{'setInterval'}</InlineCode>
              {'.'}
            </Fragment>,
            correct: false, 
            explanation: <Fragment>
              { 'Completely replacing the '}
              <InlineCode>{'setInterval'}</InlineCode>
              {' with a '}
              <InlineCode>{'useEffect'}</InlineCode>
              {' hook is not viable, since you would not have a way to set how often the polling will occur.'}
              <br />
              <br />
              {'Removing the dependency array will cause the polling to occur every millisecond, leading to loads of server traffic. '}
              <br />
              <br />
              {'Including the dependency array will cause the polling to occur only when a state changes, turning it into a manual process.'}
              <br />
              <br />
              {'We want the polling to be automatic and occur in longer intervals.'}
            </Fragment>,
          },
          {
            text: <Fragment>
              {'The '}
              <InlineCode>{'setInterval'}</InlineCode>
              {' function is not asynchronous, which will create blockage in the code.'}
            </Fragment>,
            correct: false,
            explanation: 'The function inside the setInterval will be executed in an asynchronous manner, meaning it won\'t interfere with the main code.',
          },
          {
            text: <Fragment>
              {'The backend is only polled once since the '}
              <InlineCode>{'setInterval'}</InlineCode>
              {' is only called once.'}
            </Fragment>,
            correct: false,
            explanation: <Fragment>
              {'The '}
              <InlineCode>{'setInterval'}</InlineCode>
              {' is used to create a timer that will execute its given function periodically, which in this example, is every 5000 milliseconds (5 seconds). So the backend will be polled every 5 seconds.'}
            </Fragment>,
          }
        ],
      },
      {
        type: 'p',
        children: 'So, what\'s the better way to poll in ReactJS?'
      },
      {
        type: 'h4',
        children: '4. The Better Approach'
      },
      {
        type: 'h6',
        children: '4.1 The useEffect Hook'
      },
      {
        type: 'p',
        children: 'To solve the shortcomings of the naïve polling, we need a way that gets rid of any existing duplicate timers so that there is only one timer for this polling functionality running at a time. We also need a way to ensure that these timers won\'t be created each time the component function gets invoked.'
      },
      {
        type: 'p',
        children: <Fragment>
          {'Luckily, we have the perfect hook for these kinds of problems - The '}
          <SparklezText>{'useEffect'}</SparklezText>
          {' hook. We will use it by wrapping it around our '}
          <InlineCode>{'setInterval'}</InlineCode>
          {'.'}
        </Fragment>
      },
      {
        type: 'code',
        language: 'jsx',
        title: 'Wrapping our setInterval into a useEffect',
        children: `import React, { useState, useEffect } from 'react';

const CounterButton = () => {
  const [counter, setCounter] = useState(0);

  const handleButtonClick = () => {
    // Send request to the backend to increase the counter
    // ...
  };

  // Wrap the setInterval in a useEffect so that it will only be executed once
  // in the component's lifecycle
  useEffect(() => {

    // Setting up polling
    const invervalID = setInterval(() => {
      fetch('.../api/database')
        .then((res) => res.json())
        .then((data) => {
          setCounter(data.totalClicked);
        })
        .catch((error) => {
          // Error handling...
        });
    }, 5000);

  }, [/* Include any dependencies you need, in this case it's nothing */]);

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
        type: 'p',
        children: <Fragment>
          {'By putting our '}
          <InlineCode>{'setInterval'}</InlineCode>
          {' into a '}
          <InlineCode>{'useEffect'}</InlineCode>
          {', we ensured that it will only be called once in the lifecycle, rather than each time the component re-renders or has a state change.'}
        </Fragment>
      },
      {
        type: 'p',
        children: <Fragment>
          {'Furthermore, you may have also noticed that we\'re now keeping track of the ID of the polling interval we made. This is so we can get rid of that interval if we don\'t need it anymore by using '}
          <InlineCode>{'clearInterval'}</InlineCode>
          {'. But where in our '}
          <InlineCode>{'useEffect'}</InlineCode>
          {' should we use this?'}
        </Fragment>
      },
      {
        type: 'h6',
        children: '4.2 The Cleanup Function'
      },
      {
        type: 'p',
        children: <Fragment>
          {'One often overlooked feature of the '}
          <InlineCode>{'useEffect'}</InlineCode>
          {' hook is its '}
          <SparklezText>{'cleanup'}</SparklezText>
          {' function, which is the function that gets returned from the '}
          <InlineCode>{'useEffect'}</InlineCode>
          {'.'}
        </Fragment>
      },
      {
        type: 'code',
        language: 'js',
        title: 'Where is cleanup located in useEffect?',
        children: `useEffect(() => {
  // Do the effect

  return () => {
    // Do the cleanup of the effect
  }
})`
      },
      {
        type: 'p',
        children: <Fragment>
          {'This cleanup function is called when the component is unmounted. We can use this to our advantage by placing our '}
          <InlineCode>{'clearInterval'}</InlineCode>
          {' in here.'}
        </Fragment>
      },
      {
        type: 'p',
        children: 'This way, if our button gets unmounted from the DOM, our application will no longer poll the backend unnecessarily.'
      },
      {
        type: 'code',
        language: 'js',
        title: 'Adding a cleanup function to our useEffect',
        children: `useEffect(() => {
  // Setting up polling
  const invervalID = setInterval(() => {
    fetch('.../api/database')
      .then((res) => res.json())
      .then((data) => {
        setCounter(data.totalClicked);
      })
      .catch((error) => {
        // Error handling...
      });
  }, 5000);

  /** The cleanup function that is called whenever the component is unmounted **/
  return () => {
    // Gets rid of the interval associated with the invervalID
    clearInterval(invervalID);
  }
}, [/* Include any dependencies you need, in this case it's nothing */]);`
      },
      {
        type: 'p',
        children: 'The cleanup function will also be called whenever the dependency array changes. Additionally, it will re-run the function passed into useEffect, effectively replacing the old polling interval that was just cleaned up. '
      },
      {
        type: 'p',
        children: 'This is extremely useful when our polling relies on some state variable since we can kill the old polling interval that still uses the outdated variables. For example, if we want to let the users adjust how frequent the the application polls the backend, we can introduce a state variable to manages this.'
      },
      {
        type: 'code',
        language: 'js',
        title: 'Adding a way to adjust how frequent we poll the backend',
        children: `useEffect(() => {
  // Setting up polling
  const invervalID = setInterval(() => {
    fetch('.../api/database')
      .then((res) => res.json())
      .then((data) => {
        setCounter(data.totalClicked);
      })
      .catch((error) => {
        // Error handling...
      });
  }, pollingFrequency); // <-- How often to poll is now determined by a variable

  /** The cleanup function that is called whenever the component is unmounted **/
  return () => {
    // Gets rid of the interval associated with the invervalID
    clearInterval(invervalID);
  }
}, [pollingFrequency]); // <-- This useEffect is now dependent on pollingFrequency`
      },
      {
        type: 'p',
        children: 'That\'s about it. Our full completed functional component that polls the backend and allows the user to change the polling frequency would look something like this:'
      },
      {
        type: 'code',
        language: 'jsx',
        title: 'Complete Polling Code',
        children: `import React, { Fragment, useState, useEffect } from 'react';

const CounterButton = () => {
  const [counter, setCounter] = useState(0);
  const handleButtonClick = () => {
    // Send request to the backend to increase the counter
    // ...
  };

  // New state - keeps track of how often we're polling in ms
  const [pollingFrequency, setPollingFrequency] = useState(5000);
  const handleToggleFrequency = () => {
    // Toggles between 5000ms and 2500ms
    setPollingFrequency((pollingFrequency === 5000) ? 2500 : 5000);
  }

  // Wrap the setInterval in a useEffect so that it will only be executed once
  // whenever pollingFrequency changes
  useEffect(() => {
    // Setting up polling
    const invervalID = setInterval(() => {
      fetch('.../api/database')
        .then((res) => res.json())
        .then((data) => {
          setCounter(data.totalClicked);
        })
        .catch((error) => {
          // Error handling...
        });
    }, pollingFrequency); // <-- How often to poll is now determined by a variable

    // The cleanup function that will be called whenever
    // pollingFrequency changes and when the component unmounts
    return () => {
      // Gets rid of the interval associated with the invervalID
      clearInterval(invervalID);
    }
  }, [pollingFrequency]); // <-- This useEffect is now dependent on pollingFrequency

  return (
    <Fragment>
      <button onClick={handleButtonClick}>
        {counter}
      </button>
      <button onClick={handleToggleFrequency}>
        {\`Click me to change polling frequency - \${pollingFrequency}\`}
      </button>
    </Fragment>
  );
};

export default CounterButton;`
      },
      {
        type: 'p',
        children: 'Hope you\'ve learnt something new from this blog post and can master polling in ReactJS if you ever need it.'
      },
      { type: 'signoff' },
      { type: 'feedback' }
    ]
  },
  /*
  {
    id: 2,
    title: 'Placeholder Title',
    subtitle: 'This blog page is in WIP state.',
    created: '2023-06-24T04:31:51.316Z',
    estimatedReadingTime: '5'
  }
  */
]

export default blogs;