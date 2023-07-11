import { Fragment } from "react";
import InlineCode from "../../../components/InlineCode";
import SparklezText from "../../../components/Sparklez/SparklezText";
import { Box } from "@mui/material";

const pollingAllBlog = {
  id: 2,
  title: 'Why use Promise.all?',
  subtitle: 'How to make fetch requests concurrently.',
  thumbnail: '/images/blog/thumbnail_promise.png',
  created: '2023-07-11T00:00:00.000Z',
  estimatedReadingTime: '7',
  quizIncluded: false,
  emoji: '📬',
  elements: [
    {
      type: 'p',
      children: <Fragment>
        {'You may have been asked before to use'}
        <InlineCode>{'Promise.all'}</InlineCode>
        {'and asked yourself "but why?". Why use'}
        <InlineCode>{'Promise.all'}</InlineCode>
        {'when you could just fetch requests in a'}
        <InlineCode>{'while'}</InlineCode>
        {'loop? Before answering all that, we should first see what'}
        <InlineCode>{'Promise.all'}</InlineCode>
        {'even does.'}
      </Fragment>
    },
    {
      type: 'h4',
      children: '1. What is Promise.all?'
    },
    {
      type: 'p',
      children: <Fragment>
        {'As the name suggests,'}
        <InlineCode>{'Promise.all'}</InlineCode>
        {'is used for handling multiple promises in parallel and synchronising their results. It takes in an array of promises and returns a singular new promise that is fulfilled when all the promises in the given array is fulfilled. This singular new promise will resolve an array of all the resolved values from each of the promises in its array.'}
      </Fragment>
    },
    {
      type: 'p',
      children: '"Fulfilled" in this case means when the asynchronous operation associated with the promise has finished successfully (requesting data from the backend etc.), and the promise has resolved with a value.'
    },
    {
      type: 'p',
      children: <Fragment>
        {'For example, if we have 3 promises where one takes 10 seconds to fulfill while the others take 1 second, then the Promise created by using'}
        <InlineCode>{'Promise.all'}</InlineCode>
        {'will be fufilled 10 seconds later.'}
      </Fragment>
    },
    {
      type: 'code',
      language: 'js',
      title: 'Promise.all example',
      children:  `const promse1 = fetch('localhost:3000/food/1'); // Fetch Drink, which takes 1 second to make
const promse2 = fetch('localhost:3000/food/2'); // Fetch Burger, which takes 10 seconds to make
const promse3 = fetch('localhost:3000/food/3'); // Fetch fries, which takes 1 second to make

Promise.all([promise1, promise2, promise3])
.then((responseArray) => {
  // This function will be called 10 seconds later since Burger takes the longest
  // response === [response1, response2, response3]
  console.log(responseArray);
})
.catch((error) => {
  console.log(error);
});`
    },
    {
      type: 'p',
      children: <Fragment>
        {'You can also chain'}
        <InlineCode>{'.then'}</InlineCode>
        {'and'}
        <InlineCode>{'.catch'}</InlineCode>
        {'at the end of each individual promise'}
      </Fragment>
    },
    {
      type: 'code',
      language: 'js',
      title: 'Promise.all example with .then chaining',
      children:  `const promse1 = fetch('localhost:3000/food/1')
  .then((res) => ( res.json() ))
  .catch((error) => {//...//});
const promse2 = fetch('localhost:3000/food/2')
  .then((res) => ( res.json() ))
  .catch((error) => {//...//});
const promse3 = fetch('localhost:3000/food/3')
  .then((res) => ( res.json() ))
  .catch((error) => {//...//});

Promise.all([promise1, promise2, promise3])
.then((responseArray) => {
  // Since each promise is resolved to its unparsed json, then:
  // responseArray === ['Burger', 'Drink', 'Fries']
  console.log(responseArray);
})
.catch((error) => {
  console.log(error);
});`
    },
    {
      type: 'p',
      children: <Fragment>
        {'Note that if you do add'}
        <InlineCode>{'.catch'}</InlineCode>
        {', then if any of the promises are rejected, the catch block of'}
        <InlineCode>{'Promise.all'}</InlineCode>
        {'will be executed with the reason of the first rejected promise encountered, and the other promises\' results will be ignored.'}
      </Fragment>
    },
    {
      type: 'p',
      children: <Fragment>
        <InlineCode>{'Promise.all'}</InlineCode>
        {'can then be used with the inbuilt'}
        <InlineCode>{'.map'}</InlineCode>
        {'function of every array to avoid repeating ourselves.'}
      </Fragment>
    },
    {
      type: 'code',
      language: 'js',
      title: 'Promise.all example with mapping',
      children:  `const promiseArray = [1, 2, 3].map((item) => (
  fetch(\`localhost:3000/food/\${item}\`)
    .then((res) => ( res.json() ))
    .catch((error) => {//...//});
))

Promise.all(promiseArray)
.then((responseArray) => {
  // Since each promise is resolved to its unparsed json, then:
  // responseArray === ['Burger', 'Drink', 'Fries']
  console.log(responseArray);
})
.catch((error) => {
  console.log(error);
});`
    },
    {
      type: 'p',
      children: 'The above code would map each of the numbers (1, 2 and 3) to a promise, meaning you can easily create an array of promises like this.'
    },
    {
      type: 'code',
      language: 'js',
      title: 'What is inside the "promiseArray"',
      children:  `const promiseArray = [1, 2, 3].map((item) => (
  fetch(\`localhost:3000/food/\${item}\`)
    .then((res) => ( res.json() ))
    .catch((error) => {//...//});
))

/*
promiseArray is the same thing as [
  fetch('localhost:3000/food/1')
    .then((res) => ( res.json() ))
    .catch((error) => {//...//}),
  fetch('localhost:3000/food/2')
    .then((res) => ( res.json() ))
    .catch((error) => {//...//}),
  fetch('localhost:3000/food/3')
    .then((res) => ( res.json() ))
    .catch((error) => {//...//})
]

Which is the same thing as our [promise1, promise2, promise3] array that we made in the first example.
*/`
    },
    {
      type: 'p',
      children: <Fragment>
        {'If you\'re more comfortable with'}
        <InlineCode>{'awaits'}</InlineCode>
        {'and'}
        <InlineCode>{'asyncs'}</InlineCode>
        {', then you can replace the function passed into the mapping into an async function like so. Be careful, make sure you mind your'}
        <InlineCode>{'awaits'}</InlineCode>
        {'and'}
        <InlineCode>{'asyncs'}</InlineCode>
        {'here.'}
      </Fragment>
    },
    {
      type: 'code',
      language: 'js',
      title: 'Promise.all with await and async',
      children:  `const promiseArray = [1, 2, 3].map(async (item) => {
  // Waits for response and gets the json string that was responded.
  const response = await fetch(\`localhost:3000/food/\${item}\`);
  return await response.json();
});

const responseArray = await Promise.all((promiseArray));

// responseArray === ['Burger', 'Drink', 'Fries']
console.log(responseArray);`
    },
    {
      type: 'p',
      children: <Fragment>
        {'So far, it seems like you could ignore all of this and replace it with the tried and trusted'}
        <InlineCode>{'for'}</InlineCode>
        {'loop. So... what gives?'}
      </Fragment>
    },
    {
      type: 'h4',
      children: '2. The Problem'
    },
    {
      type: 'p',
      children: <Fragment>
        {'You may have come across this problem before. Say you work at a food delivery service and to get all items a customer has ordered, you can use this endpoint (replacing'}
        <InlineCode>{'CUSTOMER_ID'}</InlineCode>
        {'with the id of the targeted customer):'}
      </Fragment>
    },
    {
      type: 'code',
      language: 'js',
      children: 'goodFood.com/customer/order/[CUSTOMER_ID]'
    },
    {
      type: 'p',
      children: <Fragment>
        {'Which will get you this'}
        <InlineCode>{'json'}</InlineCode>
        {'response:'}
      </Fragment>
    },
    {
      type: 'code',
      language: 'json',
      children: `{
  order: [12390, 11231, 4210, 42]
}`
    },
    {
      type: 'p',
      children: 'Where each number in the array keyed by "order" is the ID of a food item.'
    },
    {
      type: 'p',
      children: 'Being the good UI designer who cares a lot about user experience, there is no way you are going to show a bunch of numbers to your customers. Won\'t it be much better if you could display the name of the food item associated with each ID in that array?'
    },
    {
      type: 'p',
      children: 'Luckily, you have another endpoint which gives you more information about the food item associated with the ID you\'ve given.'
    },
    {
      type: 'code',
      language: 'js',
      children: 'goodFood.com/food/[FOOD_ID]'
    },
    {
      type: 'code',
      language: 'json',
      children: `{
  name: "Burger",
  price: 7.5
}`
    },
    {
      type: 'p',
      children: 'But, how do you call this endpoint for each of the food items in our array?'
    },
    {
      type: 'h4',
      children: '3. The Naïve Approach'
    },
    {
      type: 'p',
      children: <Fragment>
        {'Let\'s try using a'}
        <InlineCode>
          {'for'}
        </InlineCode>
        {'loop to solve this.'}
      </Fragment> 
    },
    {
      type: 'code',
      language: 'jsx',
      title: 'Naïve fetching',
      children: `// Orders fetched from other endpoint
const orders = [12390, 11231, 4210, 42];

const allFoodItem = [];

for (const id of orders) {
  fetch(\`goodFood.com/food/\${id}\`)
    .then((res) => (res.json()))
    .then((json) => {
      allFoodItem.push(json);
    })
    .catch((error) => {//...//});
}

for (const foodItem of allFoodItem) {
  // Displaying the item onto the DOM
  displayFoodCard(foodItem);
}`
    },
    {
      type: 'p',
      children: <Fragment>
        {'Looks fine, so what\'s wrong? Well, the method of fetching above will not work because of the asynchronous nature of the'}
        <InlineCode>{'fetch/Promises'}</InlineCode>
        {'. This means that the code will reach the next for loop'}
        <b>{'before'}</b>
        {'the fetches have completed.'}
      </Fragment>
    },
    {
      type: 'p',
      children: <Fragment>
        {'Alright, so then lets include'}
        <InlineCode>{'await'}</InlineCode>
        {'and'}
        <InlineCode>{'async'}</InlineCode>
        {'keywords (unless you are specifically restricted from using these *ahem*).'}
      </Fragment>
    },
    {
      type: 'code',
      language: 'js',
      title: 'Naïve fetching with await and asyncs',
      children: `// Orders fetched from other endpoint
const orders = [12390, 11231, 4210, 42];

const allFoodItem = [];

for (const id of orders) {
  const res = await fetch(\`goodFood.com/food/\${id}\`);
  const json = await res.json();
  allFoodItem.push(json);
}

for (const foodItem of allFoodItem) {
  // Displaying the item onto the DOM
  displayFoodCard(foodItem);
}`
    },
    {
      type: 'p',
      children: <Fragment>
        {'This then leads onto more problems. What happens if each fetch request takes 1 second to '}
        <Box component='span' sx={{ textDecoration: 'line-through' }}>
          {'cook'}
        </Box>
        {' resolve?'}
      </Fragment>
    },
    {
      type: 'p',
      children: <Fragment>
        {'Since each request is only sent when the previous request is fulfilled, then getting the information of these 4 items will take 4 seconds! Imagine if you\'ve ordered 100 items for a party. Your app will take '}
        <b>{'100'}</b>
        {' seconds to respond.'}
      </Fragment>
    },
    {
      type: 'p',
      children: <Fragment>
        {'Fortunately, using '}
        <SparklezText>
          {'Promise.all'}
        </SparklezText>
        {' will solve both of these issues. It will make your fetch requests run concurrently while ensuring that the order of execution is maintained.'}
      </Fragment>
    },
    {
      type: 'h4',
      children: '4. The Better Approach'
    },
    {
      type: 'p',
      children: <Fragment>
        {'As a reminder, we need to do these steps in this order:'}
        <ul>
          <li>
            {'Get the array of order IDs.'}
          </li>
          <li>
            {'Get the information of each order ID '}<b>{'concurrently'}</b>{'.'}
          </li>
          <li>
            {'When and only when the information needed has successfully been gathered, then we display them all onto the DOM'}
          </li>
        </ul>
        {'For now, we will skip the first step and focus on using'}
        <InlineCode>
          {'Promise.all'}
        </InlineCode>
        {'to get all the information concurrently by first hardcoding the array of IDs. Don\'t worry, at the end I\'ll show you how to also fetch that array without breaking the order of steps.'}
      </Fragment>
    },
    {
      type: 'h6',
      children: '4.1 Promise.all'
    },
    {
      type: 'p',
      children: <Fragment>
        {'To use'}
        <InlineCode>{'Promise.all'}</InlineCode>
        {', we first need an array of promises. We can create this using the aforementioned'}
        <InlineCode>{'.map'}</InlineCode>
        {'function.'}
      </Fragment>
    },
    {
      type: 'code',
      language: 'js',
      title: 'Mapping order IDs to fetches',
      children: `// Orders fetched from other endpoint
const orders = [12390, 11231, 4210, 42];

const arrayOfPromises = orders.map((foodID) => (
  fetch(\`goodFood.com/food/\${foodID}\`)
  .then((res) => res.json())
));

/*
Above code will create the following array:
arrayOfPromises = [
  fetch('goodFood.com/food/12390').then((res) => res.json()),
  fetch('goodFood.com/food/11231').then((res) => res.json()),
  fetch('goodFood.com/food/4210').then((res) => res.json()),
  fetch('goodFood.com/food/42').then((res) => res.json())
]
*/`
    },
    {
      type: 'p',
      children: <Fragment>
        {'Now, just need to pass in this'}
        <InlineCode>{'arrayOfPromises'}</InlineCode>
        {'into a'}
        <InlineCode>{'Promise.all'}</InlineCode>
        {'.'}
      </Fragment>
    },
    {
      type: 'code',
      language: 'js',
      title: 'Introducing Promise.all',
      children: `// Orders fetched from other endpoint
const orders = [12390, 11231, 4210, 42];

const arrayOfPromises = orders.map((foodID) => (
  fetch(\`goodFood.com/food/\${foodID}\`)
  .then((res) => res.json())
));

Promise.all(arrayOfPromises)
  .then((responses) => {
    /*
    responses = [
      { name: "Burger", price: 7.5 },
      { name: "Fries", price: 2.0 },
      { name: "Drink", price: 2.0 },
      { name: "20pc Chicken Nuggets", price: 11.2 }
    ]
    */

    for (const foodItem of responses) {
      // Display the food items onto DOM
      displayFoodCard(foodItem);
    }
  })
  .catch((error) => {//...//});`
    },
    {
      type: 'h6',
      children: '4.2 Removing the hardcoded array'
    },
    {
      type: 'p',
      children: <Fragment>
        {'Currently in our solution, we have hardcoded the array of order IDs. So how do we make it so that we fetch the order IDs from the API and then execute the'}
        <InlineCode>{'Promise.all'}</InlineCode>
        {'?'}
      </Fragment>
    },
    {
      type: 'p',
      children: 'We can easily use Promise chaining here.'
    },
    {
      type: 'code',
      language: 'js',
      title: 'Removing hardcoded array of order IDs',
      children: `fetch('goodFood.com/customer/order/5309206')
  .then((res) => (res.json()))
  .then((json) => {
    const orders = JSON.parse(json);

    const arrayOfPromises = orders.map((foodID) => (
      fetch(\`goodFood.com/food/\${foodID}\`)
        .then((res) => res.json())
        .then((json) => JSON.parse(json))
    ));

    // To chain promises, Return the promise.all here
    return Promise.all(arrayOfPromises);
  })
  .then((responses) => {
    // This then will continue once the abovePromise.all is fulfilled

    /*
    responses = [
      { name: "Burger", price: 7.5 },
      { name: "Fries", price: 2.0 },
      { name: "Drink", price: 2.0 },
      { name: "20pc Chicken Nuggets", price: 11.2 }
    ]
    */

    for (const foodItem of responses) {
      // Display the food items onto DOM
      displayFoodCard(foodItem);
    }
  })
  .catch((error) => {//...//});`
    },
    {
      type: 'h6',
      children: '4.3 Modularising the code'
    },
    {
      type: 'p',
      children: <Fragment>
        {'Of course, the above code can be improved '}
        <i>{'significantly'}</i>
        {' by extracting the'}
        <InlineCode>
          {'fetch'}
        </InlineCode>
        {'function and its'}
        <InlineCode>
          {'then'}
        </InlineCode>
        {'and'}
        <InlineCode>
          {'catch'}
        </InlineCode>
        {'into its own separate dedicated API function.'}
      </Fragment>
    },
    {
      type: 'code',
      language: 'js',
      title: 'Removing hardcoded array of order IDs',
      children: `// Preferably have this function getReq imported from another javascript file
const getReq = (url) => (
  fetch(url)
    .then((res) => {
      if (!res.ok) throw Exception('Error');

      return res.json();
    })
    .then((json) => {
      return JSON.parse(json);
    })
    .catch((error) => {//...//});
)
      
getReq('goodFood.com/customer/order/5309206')
  .then((json) => {
    const arrayOfPromises = orders.map((foodID) => (
      getReq(\`goodFood.com/food/\${foodID}\`)
    ));

    // To chain promises, Return the promise.all here
    return Promise.all(arrayOfPromises);
  })
  .then((responses) => {
    // This then will continue once the abovePromise.all is fulfilled

    /*
    responses = [
      { name: "Burger", price: 7.5 },
      { name: "Fries", price: 2.0 },
      { name: "Drink", price: 2.0 },
      { name: "20pc Chicken Nuggets", price: 11.2 }
    ]
    */

    for (const foodItem of responses) {
      // Display the food items onto DOM
      displayFoodCard(foodItem);
    }
  })`
    },
    {
      type: 'p',
      children: <Fragment>
        {'Now, we have the capability to fetch the array of order IDs initially. Once that fetch is fulfilled, we can proceed to concurrently fetch additional information for each ID while ensuring that the necessary execution order is maintained.'}
      </Fragment>
    },
    {
      type: 'h6',
      children: '4.4 Await/Async alternative'
    },
    {
      type: 'p',
      children: <Fragment>
        {'If you much rather use'}
        <InlineCode>{'awaits'}</InlineCode>
        {'and'}
        <InlineCode>{'asyncs'}</InlineCode>
        {', then you can use the following snippet.'}
      </Fragment>
    },
    {
      type: 'code',
      language: 'js',
      title: 'Removing hardcoded array of order IDs',
      children: `// Preferably have this function getReq imported from another javascript file 
const getReq = async (url) => (
  try {
    const res = await fetch(url);
    if (!res.ok) throw Exception('Error');

    const json = await res.json();
    return JSON.parse();
  } catch (err) {
    console.error('Error: ', err);
    return false;
  }
)

// Gets the array of order IDs
const orders = await getReq('goodFood.com/customer/order/5309206');

// Create the array of promises to be run concurrently
const arrayOfPromises = orders.map((foodID) => (
  getReq(\`goodFood.com/food/\${foodID}\`)
));

const allFoodItems = await Promise.all(arrayOfPromises);

// Display the food items onto DOM
for (const foodItem of allFoodItems) {
  displayFoodCard(foodItem);
}`
    },
    { type: 'signoff' },
    { type: 'feedback' }
  ]
}


export default pollingAllBlog;