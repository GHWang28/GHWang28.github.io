import React, { Fragment } from 'react';
import InlineCode from '../../../components/InlineCode';
import { BlogData } from '../../../types';

const promisePoolBlog: BlogData = {
  id: 3,
  title: 'What are Promise pools?',
  subtitle: 'A guide on balancing concurrency with resource constraints.',
  thumbnail: '/images/blog/thumbnail_pool.webp',
  created: '2023-09-04T00:00:00.000Z',
  estimatedReadingTime: 4,
  quizIncluded: false,
  emoji: '🏊‍♀️',
  elements: [
    {
      type: 'h4',
      children: '1. What\'s wrong with Promise.all?'
    },
    {
      type: 'p',
      children: <Fragment>
        <InlineCode>{'Promise.all'}</InlineCode>
        {'is great and all, but what about scenarios when we have a large number of asynchronous tasks that needs to be done concurrently, but our backend/system does not have the resources to handle it all at once? We will need to limit the total concurrent tasks somehow.'}
      </Fragment>
    },
    {
      type: 'p',
      children: <Fragment>
        {'We could try and divide the array of promises up into chunks of '}
        <InlineCode>{'x'}</InlineCode>
        {' size and then await for each chunk:'}
      </Fragment>
    },
    {
      type: 'code',
      language: 'js',
      title: 'Naïve Solution',
      children: `const naivePromisePool = async (arrayOfFnPromise, limit) => {
  const promisePools = [];
  const responses = [];
  
  // Divide into chunks of max size "limit"
  while (arrayOfFnPromise.length > 0) {
    promisePools.push(arrayOfFnPromise.splice(0, limit));
  }

  // For each pool, simultaneously fetch the online status of all IDs within the group.
  for (const pool of promisePools) {
    const pendingPromises = pool.map((promise) => promise());

    // Wait for this chunk to be finished
    const resolved = await Promise.all(pendingPromises);
    responses.push(...resolved);
  }

  return responses;
}

// TESTING:
// Benchmarking how long it takes to execute these with a limit of 2
console.time('t');
naivePromisePool([
  () => new Promise((resolve) => setTimeout(() => { resolve(1) }, 4000)),
  () => new Promise((resolve) => setTimeout(() => { resolve(2) }, 1000)),
  () => new Promise((resolve) => setTimeout(() => { resolve(3) }, 1000)),
  () => new Promise((resolve) => setTimeout(() => { resolve(4) }, 2000)),
  () => new Promise((resolve) => setTimeout(() => { resolve(5) }, 2000)),
  () => new Promise((resolve) => setTimeout(() => { resolve(6) }, 1000)),
], 2).then(console.log).then(() => { console.timeEnd('t') });
`
    },
    {
      type: 'p',
      children: <Fragment>
        {'But there\'s a problem with this. The time it takes to resolve the above is 8 seconds. While that may seem quick, take a look at the diagram below:'}
      </Fragment>
    },
    {
      type: 'img',
      aspectRatio: 874 / 191,
      src: '/images/blog/diagrams/naivePool.webp',
      alt: 'Inefficient Pooling'
    },
    {
      type: 'p',
      children: <Fragment>
        {'The diagram above shows the time it takes to resolve the promises using the'}
        <InlineCode>{'naivePromisePool'}</InlineCode>
        {' with a limit of 2 concurrent tasks (slot A and slot B) at a time and an array of 6 concurrent tasks as seen in the previous example code.'}
      </Fragment>
    },
    {
      type: 'p',
      children: <Fragment>
        {'The whitespace in the diagram shows the moments where nothing was being resolved. This occurs because the time to resolve each chunk '}
        <b>{'equals the time taken to resolve the longest promise within it.'}</b>
      </Fragment>
    },
    {
      type: 'p',
      children:  'This is a massive waste of time, especially when we\'re resolving a larger promise set. To optimise this, we will need to get rid of this chunk system.'
    },
    {
      type: 'h4',
      children: '2. Intuition behind Promise pools'
    },
    {
      type: 'p',
      children: <Fragment>
        {'Like with the previous solution, we will have '}
        <InlineCode>{'x'}</InlineCode>
        {' amount of asynchronous tasks will be executing at once. Rather than chunks, we will put the first '}
        <InlineCode>{'x'}</InlineCode>
        {' tasks into "pools". The moment one of those tasks complete, another one will take its place in the pool. This ensures that we\'re not overwhelming the backend while minimising the wait time for these tasks to complete.'}
      </Fragment>
    },
    {
      type: 'p',
      children: <Fragment>
        {'Unfortunately, as of writing this, there is not a built in method of Promise pools. So, we will have to implement it ourselves.'}
      </Fragment>
    },
    {
      type: 'p',
      children: <Fragment>
        {'We\'ll need a function that, just like with '}
        <InlineCode>{'Promise.all'}</InlineCode>
        {' takes in an array. Rather than an array of promises, we need an '}
        <b>{'array of functions that returns promises'}</b>
        {'. That way, the promises won\'t start pending immediately.'}
      </Fragment>
    },
    {
      type: 'p',
      children: <Fragment>
        {'This function will also take in another '}
        <b>{'number variable'}</b>
        {', which determines the max amount of promises that will be pending at a time.'}
      </Fragment>
    },
    {
      type: 'p',
      children: <Fragment>
        {'Inside this function, we will need to resolve \'x\' amount of promises. Then, after a promises is fulfilled or rejected, resolve the next unresolved promise in the array. This can easily be implemented through a '}
        <b>{'recursive function'}</b>
        {'. Regarding which promise to resolve next, we can keep track of that with a counter variable.'}
      </Fragment>
    },
    {
      type: 'h4',
      children: '3. Implementation & Results'
    },
    {
      type: 'code',
      language: 'js',
      title: 'Optimal Promise Pool Solution',
      children: `// Promise pool implementation
const promisePool = async (arrayOfFnPromise, limit) => {
  let promiseCounter = 0;
  const res = Array(arrayOfFnPromise.length);
  
  async function executeNextPromise () {
    // Base case when there's no more promises left
    if (promiseCounter >= arrayOfFnPromise.length) return;

    // Populate the res array while incrementing the promise counter
    // The () before the .catch is important since it starts pending the promise
    res[promiseCounter] = await arrayOfFnPromise[promiseCounter++]().catch((err) => err);

    // Loop back for the next promise
    await executeNextPromise();
  }

  // Creates an array with a length of "limit" filled with "executeNextPromise"
  const initialPromises = Array.from({ length: limit }, executeNextPromise);

  // Wait for all of it to finish
  await Promise.all(initialPromises);

  return res;
}

// TESTING:
// Benchmarking how long it takes to execute these with a limit of 2
console.time('t');
promisePool([
  () => new Promise((resolve) => setTimeout(() => { resolve(1) }, 4000)),
  () => new Promise((resolve) => setTimeout(() => { resolve(2) }, 1000)),
  () => new Promise((resolve) => setTimeout(() => { resolve(3) }, 1000)),
  () => new Promise((resolve) => setTimeout(() => { resolve(4) }, 2000)),
  () => new Promise((resolve) => setTimeout(() => { resolve(5) }, 2000)),
  () => new Promise((resolve) => setTimeout(() => { resolve(6) }, 1000)),
], 2).then(console.log).then(() => { console.timeEnd('t') });
`
    },
    {
      type: 'p',
      children: 'When we benchmark this using the same test used for the naïve promise pool function, we will see that it only takes 6 seconds now:'
    },
    {
      type: 'img',
      aspectRatio: 874 / 191,
      src: '/images/blog/diagrams/optimalPool.webp',
      alt: 'Efficient Pooling'
    },
    {
      type: 'p',
      children: <Fragment>
        {'That is '}
        <b>{'2 seconds'}</b>
        {' saved! Notice that the odd or even numbered promises are not restricted to slot A or B - whenever a slot is freed, the next promise will occupy it immediately.'}
      </Fragment>
    },
    {
      type: 'p',
      children: <Fragment>
        {'With this function, you can easily prevent overloading your servers. Just make sure to adjust the '}
        <InlineCode>{'limit'}</InlineCode>
        {' parameter to the needs of your project.'}
      </Fragment>
    },
    {
      type: 'p',
      children: <Fragment>
        {'And if you want to make it so that you can use this function like a '}
        <InlineCode>{'Promise.all'}</InlineCode>
        {', then you can do this (Not recommended, since it can lead to unexpected issues and conflicts with other code).'}
      </Fragment>
    },
    {
      type: 'code',
      language: 'js',
      children:  `Promise.pool = promisePool;

// Usage
Promise.pool([...], 2);
`
    },
    {
      type: 'p',
      children: 'Hope you\'ve learn something new here!'
    },
    { type: 'signoff' },
    { type: 'feedback' }
  ]
}

export default promisePoolBlog;
