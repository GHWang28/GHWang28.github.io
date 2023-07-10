import { Fragment } from "react";
import InlineCode from "../../../components/InlineCode";
import SparklezText from "../../../components/Sparklez/SparklezText";
import { Box } from "@mui/material";

const pollingAllBlog = {
  id: 2,
  title: 'Why use Promise.all?',
  subtitle: 'The purpose of Promise.all',
  thumbnail: '/images/blog/thumbnail_promise.png',
  created: '2023-06-24T04:31:51.316Z',
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
      language: 'jsx',
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
      children: 'Blog post under construction....'
    },
    // { type: 'signoff' },
    // { type: 'feedback' }
  ]
}


export default pollingAllBlog;