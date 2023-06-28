const blogs = [
  {
    id: 1,
    title: 'Polling in ReactJS',
    subtitle: 'A guide on how to request data from the backend in set intervals.',
    thumbnail: '/images/blog/thumbnail_polling.jpg',
    created: '2023-06-24T04:31:51.316Z',
    estimatedReadingTime: '5',
    elements: [
      {
        type: 'h3',
        children: 'What is Polling?'
      },
      {
        type: 'p',
        children: 'Polling a backend in ReactJS enables you to fetch updated data from a server at regular intervals, providing a way to incorporate real-time updates into your application without relying on manual user actions.'
      },
      {
        type: 'p',
        children: 'While polling is not as efficient as Websocket connections, it serves as a extremely simple choice for situations where data that are infrequently updated and that synchronisation is not too important.'
      },
      {
        type: 'p',
        children: 'For instance, you wouldn\'t use polling for a live message feed, whereas it becomes more appropriate for scenarios like retrieving weather forecast updates.'
      },
      {
        type: 'h3',
        children: 'The Problem'
      },
      {
        type: 'p',
        children: 'Say you have a button counter that keeps track of how many people have clicked on it. Now, let\'s be real, it could be minutes or even hours till the next button click, and nobody\'s going to nitpick about how precise or perfectly synchronised that counter is. So, to keep things simple and practical, you\'ve opted for polling.'
      },
      {
        type: 'p',
        children: 'Sending a request to the backend for the count will return the following:'
      },
      {
        type: 'h3',
        children: 'The Naïve Approach'
      }
      ,
      {
        type: 'p',
        children: 'This page is still under construction. Stay tuned!'
      }
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