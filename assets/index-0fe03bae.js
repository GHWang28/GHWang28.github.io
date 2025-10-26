import{j as e,a as t,B as p,T as i,R as U,_ as Z,r as g,i as f,s as O,ah as K,f as y,ai as u,I as X,aj as ee,M as oe,ak as te,al as B,am as re,p as ne,q as A}from"./index-ffeed943.js";import{C as se,a as ae,b as ie}from"./index-51ef2c94.js";import{I as r}from"./index-e8b634ba.js";import{S as k}from"./SparklezText-90f4c88f.js";import{G as M}from"./index-570cd2ed.js";import{u as le,I as E}from"./PageRouter-91726921.js";import{B as ce}from"./index-2f9160c7.js";import he from"./index-d2e28659.js";import{T as de,C as w}from"./index-9b546486.js";import{d as pe}from"./Visibility-115e6b14.js";import{B as m,C as ue}from"./index-6efc40d0.js";import{G as D}from"./Grid-fdd1b7b7.js";import{u as me}from"./useMediaQuery-f45e9202.js";import{D as z}from"./Divider-713eeb29.js";import{L as ge}from"./Link-1b6be545.js";const fe={id:1,title:"Polling in ReactJS",subtitle:"A guide on how to request data from the backend in set intervals.",thumbnail:"/images/blog/thumbnail_polling.webp",created:"2023-06-24T04:31:51.316Z",estimatedReadingTime:5,quizIncluded:!0,emoji:"🎣",elements:[{type:"p",children:"This blog post will mainly focus on how to poll in ReactJS. However, if you're using something else like Vanilla Javascript, you should be able to easily extrapolate from the information here for your own needs."},{type:"h4",children:"1. What is Polling?"},{type:"p",children:"Polling a backend enables you to fetch updated data from a server at regular intervals, providing a way to incorporate real-time updates into your application without relying on manual user actions."},{type:"p",children:"While polling is not as efficient as Websocket connections, its simplicity makes it a better choice for live data that are infrequently updated and when synchronisation is not too important."},{type:"p",children:"For instance, you wouldn't use polling for a live message feed, whereas you would for scenarios like retrieving weather forecast updates."},{type:"h4",children:"2. The Problem"},{type:"p",children:"Say you have a button counter that keeps track of how many people have clicked on it. It could be minutes or even hours till the next button click, and nobody's going to nitpick about how precise or perfectly synchronised that counter is. So, to keep things simple and practical, you've opted for polling."},{type:"p",children:e.jsxs(t.Fragment,{children:["Sending a request to the backend for the count will return the following ",e.jsx(r,{children:"json"}),"."]})},{type:"code",language:"json",children:`{
  "totalClicked": 1
}`},{type:"p",children:"Now, how can we make our application automatically request for that data every five seconds or so? While it may be simple in Vanilla JavaScript, many people struggle with it in ReactJS if they're unfamiliar with the life-cycle of a React component."},{type:"h4",children:"3. The Naïve Approach"},{type:"p",children:e.jsxs(t.Fragment,{children:["Most people would think to simply use ",e.jsx(r,{children:"setInterval"})," to create a function scheduled to be repeatedly called every now and then. However, it's not that simple..."]})},{type:"code",language:"jsx",title:"Naïve polling",children:`import React, { useState, useEffect } from 'react';

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
`},{type:"quiz",question:"What is wrong with the above naïve polling?",options:[{text:"You risk creating multiple parallel timers for the same function.",correct:!0,explanation:e.jsxs(t.Fragment,{children:["Every time the component function is invoked (i.e., from a state update), a new interval schedule will be created concurrently with the original one. The overlapping of the same interval function will create excessive API requests and may bottleneck in the backend. The more updates your component goes through, the more excessive API requests will be made.",e.jsx("br",{}),e.jsx("br",{}),"In general, it is recommended to perform any side effects, such as setting up timers, or making API calls, within the useEffect hook. This ensures that the side effects are properly managed and cleaned up when the component unmounts or when the component's states (i.e., the dependencies) changes."]})},{text:e.jsxs(t.Fragment,{children:["A ",e.jsx(r,{children:"useEffect"})," hook is better for creating a polling functionality compared to using ",e.jsx(r,{children:"setInterval"}),"."]}),correct:!1,explanation:e.jsxs(t.Fragment,{children:["Completely replacing the ",e.jsx(r,{children:"setInterval"})," with a ",e.jsx(r,{children:"useEffect"})," hook is not viable, since you would not have a way to set how often the polling will occur.",e.jsx("br",{}),e.jsx("br",{}),"Removing the dependency array will cause the polling to occur every millisecond, leading to loads of server traffic. ",e.jsx("br",{}),e.jsx("br",{}),"Including the dependency array will cause the polling to occur only when a state changes, turning it into a manual process.",e.jsx("br",{}),e.jsx("br",{}),"We want the polling to be automatic and occur in longer intervals."]})},{text:e.jsxs(t.Fragment,{children:["The ",e.jsx(r,{children:"setInterval"})," function is not asynchronous, which will create blockage in the code."]}),correct:!1,explanation:"The function inside the setInterval will be executed in an asynchronous manner, meaning it won't interfere with the main code."},{text:e.jsxs(t.Fragment,{children:["The backend is only polled once since the ",e.jsx(r,{children:"setInterval"})," is only called once."]}),correct:!1,explanation:e.jsxs(t.Fragment,{children:["The ",e.jsx(r,{children:"setInterval"})," is used to create a timer that will execute its given function periodically, which in this example, is every 5000 milliseconds (5 seconds). So the backend will be polled every 5 seconds."]})}]},{type:"p",children:"So, what's the better way to poll in ReactJS?"},{type:"h4",children:"4. The Better Approach"},{type:"h6",children:"4.1 The useEffect Hook"},{type:"p",children:"To solve the shortcomings of the naïve polling, we need a way that gets rid of any existing duplicate timers so that there is only one timer for this polling functionality running at a time. We also need a way to ensure that these timers won't be created each time the component function gets invoked."},{type:"p",children:e.jsxs(t.Fragment,{children:["Luckily, we have the perfect hook for these kinds of problems - The ",e.jsx(k,{children:"useEffect"})," hook. We will use it by wrapping it around our ",e.jsx(r,{children:"setInterval"}),"."]})},{type:"code",language:"jsx",title:"Wrapping our setInterval into a useEffect",children:`import React, { useState, useEffect } from 'react';

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
`},{type:"p",children:e.jsxs(t.Fragment,{children:["By putting our ",e.jsx(r,{children:"setInterval"})," into a ",e.jsx(r,{children:"useEffect"}),", we ensured that it will only be called once in the lifecycle, rather than each time the component re-renders or has a state change."]})},{type:"p",children:e.jsxs(t.Fragment,{children:["Furthermore, you may have also noticed that we're now keeping track of the ID of the polling interval we made. This is so we can get rid of that interval if we don't need it anymore by using ",e.jsx(r,{children:"clearInterval"}),". But where in our ",e.jsx(r,{children:"useEffect"})," should we use this?"]})},{type:"h6",children:"4.2 The Cleanup Function"},{type:"p",children:e.jsxs(t.Fragment,{children:["One often overlooked feature of the ",e.jsx(r,{children:"useEffect"})," hook is its ",e.jsx(k,{children:"cleanup"})," function, which is the function that gets returned from the ",e.jsx(r,{children:"useEffect"}),"."]})},{type:"code",language:"js",title:"Where is cleanup located in useEffect?",children:`useEffect(() => {
  // Do the effect

  return () => {
    // Do the cleanup of the effect
  }
})`},{type:"p",children:e.jsxs(t.Fragment,{children:["This cleanup function is called when the component is unmounted. We can use this to our advantage by placing our ",e.jsx(r,{children:"clearInterval"})," in here."]})},{type:"p",children:"This way, if our button gets unmounted from the DOM, our application will no longer poll the backend unnecessarily."},{type:"code",language:"js",title:"Adding a cleanup function to our useEffect",children:`useEffect(() => {
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
}, [/* Include any dependencies you need, in this case it's nothing */]);`},{type:"p",children:"The cleanup function will also be called whenever the dependency array changes. Additionally, it will re-run the function passed into useEffect, effectively replacing the old polling interval that was just cleaned up. "},{type:"p",children:"This is extremely useful when our polling relies on some state variable since we can kill the old polling interval that still uses the outdated variables. For example, if we want to let the users adjust how frequent the the application polls the backend, we can introduce a state variable to manages this."},{type:"code",language:"js",title:"Adding a way to adjust how frequent we poll the backend",children:`useEffect(() => {
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
}, [pollingFrequency]); // <-- This useEffect is now dependent on pollingFrequency`},{type:"p",children:"That's about it. Our full completed functional component that polls the backend and allows the user to change the polling frequency would look something like this:"},{type:"code",language:"jsx",title:"Complete Polling Code",children:`import React, { Fragment, useState, useEffect } from 'react';

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

export default CounterButton;`},{type:"p",children:"Hope you've learnt something new from this blog post and can master polling in ReactJS if you ever need it."},{type:"signoff"},{type:"feedback"}]},ye={id:2,title:"Why use Promise.all?",subtitle:"How to make fetch requests concurrently.",thumbnail:"/images/blog/thumbnail_promise.webp",created:"2023-07-11T00:00:00.000Z",estimatedReadingTime:7,quizIncluded:!1,emoji:"📬",elements:[{type:"p",children:e.jsxs(t.Fragment,{children:["You may have been asked before to use",e.jsx(r,{children:"Promise.all"}),'and asked yourself "but why?". Why use',e.jsx(r,{children:"Promise.all"}),"when you could just fetch requests in a",e.jsx(r,{children:"while"}),"loop? Before answering all that, we should first see what",e.jsx(r,{children:"Promise.all"}),"even does."]})},{type:"h4",children:"1. What is Promise.all?"},{type:"p",children:e.jsxs(t.Fragment,{children:["As the name suggests,",e.jsx(r,{children:"Promise.all"}),"is used for handling multiple promises in parallel and synchronising their results. It takes in an array of promises and returns a singular new promise that is fulfilled when all the promises in the given array is fulfilled. This singular new promise will resolve an array of all the resolved values from each of the promises in its array."]})},{type:"p",children:'"Fulfilled" in this case means when the asynchronous operation associated with the promise has finished successfully (requesting data from the backend etc.), and the promise has resolved with a value.'},{type:"p",children:e.jsxs(t.Fragment,{children:["For example, if we have 3 promises where one takes 10 seconds to fulfill while the others take 1 second, then the Promise created by using",e.jsx(r,{children:"Promise.all"}),"will be fufilled 10 seconds later."]})},{type:"code",language:"js",title:"Promise.all example",children:`const promse1 = fetch('localhost:3000/food/1'); // Fetch Drink, which takes 1 second to make
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
});`},{type:"p",children:e.jsxs(t.Fragment,{children:["You can also chain",e.jsx(r,{children:".then"}),"and",e.jsx(r,{children:".catch"}),"at the end of each individual promise"]})},{type:"code",language:"js",title:"Promise.all example with .then chaining",children:`const promse1 = fetch('localhost:3000/food/1')
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
});`},{type:"p",children:e.jsxs(t.Fragment,{children:["Note that if you do add",e.jsx(r,{children:".catch"}),", then if any of the promises are rejected, the catch block of",e.jsx(r,{children:"Promise.all"}),"will be executed with the reason of the first rejected promise encountered, and the other promises' results will be ignored."]})},{type:"p",children:e.jsxs(t.Fragment,{children:[e.jsx(r,{children:"Promise.all"}),"can then be used with the inbuilt",e.jsx(r,{children:".map"}),"function of every array to avoid repeating ourselves."]})},{type:"code",language:"js",title:"Promise.all example with mapping",children:`const promiseArray = [1, 2, 3].map((item) => (
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
});`},{type:"p",children:"The above code would map each of the numbers (1, 2 and 3) to a promise, meaning you can easily create an array of promises like this."},{type:"code",language:"js",title:'What is inside the "promiseArray"',children:`const promiseArray = [1, 2, 3].map((item) => (
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
*/`},{type:"p",children:e.jsxs(t.Fragment,{children:["If you're more comfortable with",e.jsx(r,{children:"awaits"}),"and",e.jsx(r,{children:"asyncs"}),", then you can replace the function passed into the mapping into an async function like so. Be careful, make sure you mind your",e.jsx(r,{children:"awaits"}),"and",e.jsx(r,{children:"asyncs"}),"here."]})},{type:"code",language:"js",title:"Promise.all with await and async",children:`const promiseArray = [1, 2, 3].map(async (item) => {
  // Waits for response and gets the json string that was responded.
  const response = await fetch(\`localhost:3000/food/\${item}\`);
  return await response.json();
});

const responseArray = await Promise.all((promiseArray));

// responseArray === ['Burger', 'Drink', 'Fries']
console.log(responseArray);`},{type:"p",children:e.jsxs(t.Fragment,{children:["So far, it seems like you could ignore all of this and replace it with the tried and trusted",e.jsx(r,{children:"for"}),"loop. So... what gives?"]})},{type:"h4",children:"2. The Problem"},{type:"p",children:e.jsxs(t.Fragment,{children:["You may have come across this problem before. Say you work at a food delivery service and to get all items a customer has ordered, you can use this endpoint (replacing",e.jsx(r,{children:"CUSTOMER_ID"}),"with the id of the targeted customer):"]})},{type:"code",language:"js",children:"goodFood.com/customer/order/[CUSTOMER_ID]"},{type:"p",children:e.jsxs(t.Fragment,{children:["Which will get you this",e.jsx(r,{children:"json"}),"response:"]})},{type:"code",language:"json",children:`{
  order: [12390, 11231, 4210, 42]
}`},{type:"p",children:'Where each number in the array keyed by "order" is the ID of a food item.'},{type:"p",children:"Being the good UI designer who cares a lot about user experience, there is no way you are going to show a bunch of numbers to your customers. Won't it be much better if you could display the name of the food item associated with each ID in that array?"},{type:"p",children:"Luckily, you have another endpoint which gives you more information about the food item associated with the ID you've given."},{type:"code",language:"js",children:"goodFood.com/food/[FOOD_ID]"},{type:"code",language:"json",children:`{
  name: "Burger",
  price: 7.5
}`},{type:"p",children:"But, how do you call this endpoint for each of the food items in our array?"},{type:"h4",children:"3. The Naïve Approach"},{type:"p",children:e.jsxs(t.Fragment,{children:["Let's try using a",e.jsx(r,{children:"for"}),"loop to solve this."]})},{type:"code",language:"jsx",title:"Naïve fetching",children:`// Orders fetched from other endpoint
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
}`},{type:"p",children:e.jsxs(t.Fragment,{children:["Looks fine, so what's wrong? Well, the method of fetching above will not work because of the asynchronous nature of the",e.jsx(r,{children:"fetch/Promises"}),". This means that the code will reach the next for loop ",e.jsx("b",{children:"before"})," the fetches have completed."]})},{type:"p",children:e.jsxs(t.Fragment,{children:["Alright, so then lets include",e.jsx(r,{children:"await"}),"and",e.jsx(r,{children:"async"}),"keywords (unless you are specifically restricted from using these *ahem*)."]})},{type:"code",language:"js",title:"Naïve fetching with await and asyncs",children:`// Orders fetched from other endpoint
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
}`},{type:"p",children:e.jsxs(t.Fragment,{children:["This then leads onto more problems. What happens if each fetch request takes 1 second to ",e.jsx(p,{component:"span",sx:{textDecoration:"line-through"},children:"cook"})," resolve?"]})},{type:"p",children:e.jsxs(t.Fragment,{children:["Since each request is only sent when the previous request is fulfilled, then getting the information of these 4 items will take 4 seconds! Imagine if you've ordered 100 items for a party. Your app will take ",e.jsx("b",{children:"100"})," seconds to respond."]})},{type:"p",children:e.jsxs(t.Fragment,{children:["Fortunately, using ",e.jsx(k,{children:"Promise.all"})," will solve both of these issues. It will make your fetch requests run concurrently while ensuring that the order of execution is maintained."]})},{type:"h4",children:"4. The Better Approach"},{type:"p",children:"As a reminder, we need to do these steps in this order:"},{type:"as-is",children:e.jsxs(p,{component:"ul",sx:{listStyle:"none"},children:[e.jsx("li",{children:e.jsx(i,{children:"1. Get the array of order IDs."})}),e.jsx("li",{children:e.jsxs(i,{children:["2. Get the information of each order ID ",e.jsx("b",{children:"concurrently"}),"."]})}),e.jsx("li",{children:e.jsx(i,{children:"3. When and only when the information needed has successfully been gathered, then we display them all onto the DOM"})})]})},{type:"p",children:e.jsxs(t.Fragment,{children:["For now, we will skip the first step and focus on using",e.jsx(r,{children:"Promise.all"}),"to get all the information concurrently by first hardcoding the array of IDs. Don't worry, at the end I'll show you how to also fetch that array without breaking the order of steps."]})},{type:"h6",children:"4.1 Promise.all"},{type:"p",children:e.jsxs(t.Fragment,{children:["To use",e.jsx(r,{children:"Promise.all"}),", we first need an array of promises. We can create this using the aforementioned",e.jsx(r,{children:".map"}),"function."]})},{type:"code",language:"js",title:"Mapping order IDs to fetches",children:`// Orders fetched from other endpoint
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
*/`},{type:"p",children:e.jsxs(t.Fragment,{children:["Now, just need to pass in this",e.jsx(r,{children:"arrayOfPromises"}),"into a",e.jsx(r,{children:"Promise.all"}),"."]})},{type:"code",language:"js",title:"Introducing Promise.all",children:`// Orders fetched from other endpoint
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
  .catch((error) => {//...//});`},{type:"h6",children:"4.2 Removing the hardcoded array"},{type:"p",children:e.jsxs(t.Fragment,{children:["Currently in our solution, we have hardcoded the array of order IDs. So how do we make it so that we fetch the order IDs from the API and then execute the",e.jsx(r,{children:"Promise.all"}),"?"]})},{type:"p",children:"We can easily use Promise chaining here."},{type:"code",language:"js",title:"Removing hardcoded array of order IDs",children:`fetch('goodFood.com/customer/order/5309206')
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
  .catch((error) => {//...//});`},{type:"h6",children:"4.3 Modularising the code"},{type:"p",children:e.jsxs(t.Fragment,{children:["Of course, the above code can be improved ",e.jsx("i",{children:"significantly"})," by extracting the",e.jsx(r,{children:"fetch"}),"function and its",e.jsx(r,{children:"then"}),"and",e.jsx(r,{children:"catch"}),"into its own separate dedicated API function."]})},{type:"code",language:"js",title:"Removing hardcoded array of order IDs",children:`// Preferably have this function getReq imported from another javascript file
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
  })`},{type:"p",children:e.jsx(t.Fragment,{children:"Now, we have the capability to fetch the array of order IDs initially. Once that fetch is fulfilled, we can proceed to concurrently fetch additional information for each ID while ensuring that the necessary execution order is maintained."})},{type:"h6",children:"4.4 Await/Async alternative"},{type:"p",children:e.jsxs(t.Fragment,{children:["If you much rather use",e.jsx(r,{children:"awaits"}),"and",e.jsx(r,{children:"asyncs"}),", then you can use the following snippet."]})},{type:"code",language:"js",title:"Removing hardcoded array of order IDs",children:`// Preferably have this function getReq imported from another javascript file 
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
}`},{type:"signoff"},{type:"feedback"}]},be={id:3,title:"What are Promise pools?",subtitle:"A guide on balancing concurrency with resource constraints.",thumbnail:"/images/blog/thumbnail_pool.webp",created:"2023-09-04T00:00:00.000Z",estimatedReadingTime:4,quizIncluded:!1,emoji:"🏊‍♀️",elements:[{type:"h4",children:"1. What's wrong with Promise.all?"},{type:"p",children:e.jsxs(t.Fragment,{children:[e.jsx(r,{children:"Promise.all"}),"is great and all, but what about scenarios when we have a large number of asynchronous tasks that needs to be done concurrently, but our backend/system does not have the resources to handle it all at once? We will need to limit the total concurrent tasks somehow."]})},{type:"p",children:e.jsxs(t.Fragment,{children:["We could try and divide the array of promises up into chunks of ",e.jsx(r,{children:"x"})," size and then await for each chunk:"]})},{type:"code",language:"js",title:"Naïve Solution",children:`const naivePromisePool = async (arrayOfFnPromise, limit) => {
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
`},{type:"p",children:e.jsx(t.Fragment,{children:"But there's a problem with this. The time it takes to resolve the above is 8 seconds. While that may seem quick, take a look at the diagram below:"})},{type:"img",aspectRatio:874/191,src:"/images/blog/diagrams/naivePool.webp",alt:"Inefficient Pooling"},{type:"p",children:e.jsxs(t.Fragment,{children:["The diagram above shows the time it takes to resolve the promises using the",e.jsx(r,{children:"naivePromisePool"})," with a limit of 2 concurrent tasks (slot A and slot B) at a time and an array of 6 concurrent tasks as seen in the previous example code."]})},{type:"p",children:e.jsxs(t.Fragment,{children:["You may have observed that there are periods where the slot isn't resolving anything. This occurs because the time to resolve each chunk ",e.jsx("b",{children:"equals the time taken to resolve the longest promise within it."})]})},{type:"p",children:"As you can tell, this is suboptimal. To optimise it, we will need to get rid of the chunk system."},{type:"h4",children:"2. Intuition behind Optimised solution"},{type:"p",children:e.jsx(t.Fragment,{children:`Similar to the previous function, we'll execute x asynchronous tasks concurrently by organizing them into "pools". Except this time, when one task completes, another replaces it in the pool.`})},{type:"p",children:e.jsxs(t.Fragment,{children:["Furthermore, this function will take in an array of ",e.jsx("b",{children:"functions that return promises"})," (rather than an array of promises) to avoid immediate pending. This function will also accept a maximum concurrent promise count."]})},{type:"p",children:e.jsx(t.Fragment,{children:"Inside this function, we'll begin resolving as many promises as allowed initially (determined by the number passed into the function) and then continue resolving the next unsettled promise in the array using a recursive function and a counter variable to track settled promises."})},{type:"h4",children:"3. Implementation & Results"},{type:"code",language:"js",title:"Optimal Promise Pool Solution",children:`// Promise pool implementation
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
`},{type:"p",children:"When we benchmark this using the same test used for the naïve promise pool function, we will see that it only takes 6 seconds now:"},{type:"img",aspectRatio:874/191,src:"/images/blog/diagrams/optimalPool.webp",alt:"Efficient Pooling"},{type:"p",children:e.jsxs(t.Fragment,{children:["That is ",e.jsx("b",{children:"2 seconds"})," saved! Notice that the odd or even numbered promises are not restricted to slot A or B - whenever a slot is freed, the next promise will occupy it immediately."]})},{type:"p",children:e.jsxs(t.Fragment,{children:["With this function, you can easily prevent overloading your servers. Just make sure to adjust the ",e.jsx(r,{children:"limit"})," parameter to the needs of your project."]})},{type:"p",children:e.jsxs(t.Fragment,{children:["And if you want to make it so that you can use this function like a ",e.jsx(r,{children:"Promise.all"}),", then you can do this (Not recommended, since it can lead to unexpected issues and conflicts with other code)."]})},{type:"code",language:"js",children:`Promise.pool = promisePool;

// Usage
Promise.pool([...], 2);
`},{type:"p",children:"Hope you've learn something new here!"},{type:"signoff"},{type:"feedback"}]},v=[fe,ye,be],xe=({index:s=0})=>{const[a,o]=le({rootMargin:"9999999px 0px 0px 0px"});return e.jsx(se,{ref:a,sx:{opacity:o?"0.8":"0",translate:o?"0px":s%2?"100px":"-100px",mx:{lg:0,md:5,xs:0},mb:{md:5,xs:2}},children:e.jsx(i,{fontSize:18,children:" More posts coming soon..."})})},we=U.lazy(()=>Z(()=>import("./index-c0469f95.js"),["./index-c0469f95.js","./index-ffeed943.js","./index-bd331685.css","./PageRouter-91726921.js","./index-6efc40d0.js","./useMediaQuery-f45e9202.js","./index-51ef2c94.js","./index-e8b634ba.js","./SparklezText-90f4c88f.js","./index-c6717cc9.js","./v4-4a60fe23.js","./index-570cd2ed.js","./index-2f9160c7.js","./index-d2e28659.js","./use-sound.esm-ff0f7f6f.js","./index-9b546486.js","./Visibility-115e6b14.js","./Grid-fdd1b7b7.js","./Divider-713eeb29.js","./dividerClasses-67f44a85.js","./Link-1b6be545.js"],import.meta.url)),ke=()=>{const s=v.map((a,o)=>e.jsx(t.Suspense,{fallback:e.jsx(ie,{}),children:e.jsx(we,{index:o,data:a})},`blog-${o}`));return s.push(e.jsx(xe,{index:v.length},"trailing-card")),e.jsxs(t.Fragment,{children:[e.jsx(M,{title:"Blog Posts",subtitle:"Resources for students (and other shenanigans)"}),e.jsx(ae,{children:s})]})};var j={},ve=f;Object.defineProperty(j,"__esModule",{value:!0});var W=j.default=void 0,je=ve(g()),Fe=e;W=j.default=(0,je.default)((0,Fe.jsx)("path",{d:"M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"}),"ExpandMore");const Ie=O("summary")(({theme:s})=>({listStyleType:"none",padding:"16px",boxSizing:"border-box",cursor:"pointer",display:"flex",justifyContent:"space-between",color:s.palette.contrastColor.main,"::webkit-details-marker":{display:"none"}})),Pe=O("details")(({theme:s})=>({backgroundColor:s.palette.bgColor.main,"& > summary > svg":{color:"inherit",rotate:"180deg",transition:"rotate 0.2s ease-in-out"},"&[open] > summary > svg":{rotate:"0deg"}})),_=({children:s,title:a})=>{const o=K({onSwiped:({event:n})=>{n.stopPropagation()}}),l=()=>{var n;(n=window.getSelection())==null||n.removeAllRanges()};return e.jsxs(Pe,{...o,children:[e.jsxs(Ie,{onClick:l,children:[e.jsx(i,{fontWeight:"bold",children:a}),e.jsx(W,{})]}),e.jsx("section",{children:s})]})},Se=({question:s,options:a})=>{const o=y(),l=o.palette.mode==="light",[n,d]=t.useState(!1),[L,b]=t.useState(""),[V,G]=t.useState(void 0),[S,C]=t.useState(!1),[J,T]=t.useState([]),R=t.useRef(null);t.useEffect(()=>{T(u(a))},[a]);const Q=()=>{d(!n),C(!1),n?T(u(a)):b("Answer Revealed")},Y=(h,x)=>{const c=R.current;c==null||c.classList.remove("logo-anim"),c==null||c.offsetWidth,c==null||c.classList.add("logo-anim"),C(!h),G(x),h?(d(!0),b(`✅ ${u(["Correct!","Well Done!","Fantastic!"])[0]}`)):b(`❌ ${u(["Incorrect!","Try Again!","Not Quite!"])[0]}`)};return e.jsx(_,{bgcolor:l?"#6f8ead":"#234553",title:"🧩 Quiz - Try to complete me before continuing.",children:e.jsxs(p,{sx:{borderRadius:"15px",bgcolor:"bgColor.main",boxSizing:"border-box",position:"relative",boxShadow:"0 8px 6px -6px black"},p:2,pt:3,my:2,children:[e.jsx(m,{title:n?"Restart":"Reveal Answer",children:e.jsx(X,{onClick:Q,sx:{position:"absolute",top:"4px",right:"4px"},children:n?e.jsx(ee,{}):e.jsx(pe,{})})}),e.jsx(i,{mb:2,variant:"h5",align:"center",children:s}),e.jsx(D,{container:!0,rowSpacing:{xs:1,sm:2,md:3},columnSpacing:{xs:1,sm:2,md:3},children:J.map((h,x)=>e.jsx(D,{item:!0,xs:12,md:6,children:e.jsx(oe,{sx:{p:2,border:`2px solid ${n?n&&h.correct?o.palette.green.main:o.palette.red.main:o.palette.contrastColor.main}`,borderRadius:"15px",width:"100%",height:"100%",boxSizing:"border-box",textTransform:"none",transition:"scale 0.2s ease-in-out","&:hover":{scale:"1.05"},opacity:n&&!h.correct?"0.5":"1",boxShadow:"0 8px 6px -6px black"},disabled:n,onClick:c=>{c.preventDefault(),Y(h.correct,h.explanation)},children:e.jsx(i,{fontSize:16,color:n?n&&h.correct?o.palette.green.main:o.palette.red.main:o.palette.contrastColor.main,align:"center",children:h.text})})},`option-${x}`))}),e.jsxs(ue,{in:n||S,sx:{overflow:"hidden",boxSizing:"border-box"},children:[e.jsx(i,{ref:R,variant:"h5",align:"center",color:S?o.palette.red.main:o.palette.green.main,my:2,children:L}),e.jsx(de,{sx:{bgcolor:o.palette.mode==="light"?"#FAFAFA":"#1E1E1E"},textAlign:"justify",fontSize:16,children:V})]})]})})},Ce={'code[class*="language-"]':{background:"hsl(230, 1%, 98%)",color:"hsl(230, 8%, 24%)",fontFamily:'"Fira Code", "Fira Mono", Menlo, Consolas, "DejaVu Sans Mono", monospace',direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"2",OTabSize:"2",tabSize:"2",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]':{background:"hsl(230, 1%, 98%)",color:"hsl(230, 8%, 24%)",fontFamily:'"Fira Code", "Fira Mono", Menlo, Consolas, "DejaVu Sans Mono", monospace',direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"2",OTabSize:"2",tabSize:"2",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",padding:"1em",margin:"0.5em 0",overflow:"auto",borderRadius:"0.3em"},'code[class*="language-"]::-moz-selection':{background:"hsl(230, 1%, 90%)",color:"inherit"},'code[class*="language-"] *::-moz-selection':{background:"hsl(230, 1%, 90%)",color:"inherit"},'pre[class*="language-"] *::-moz-selection':{background:"hsl(230, 1%, 90%)",color:"inherit"},'code[class*="language-"]::selection':{background:"hsl(230, 1%, 90%)",color:"inherit"},'code[class*="language-"] *::selection':{background:"hsl(230, 1%, 90%)",color:"inherit"},'pre[class*="language-"] *::selection':{background:"hsl(230, 1%, 90%)",color:"inherit"},':not(pre) > code[class*="language-"]':{padding:"0.2em 0.3em",borderRadius:"0.3em",whiteSpace:"normal"},comment:{color:"hsl(230, 4%, 64%)",fontStyle:"italic"},prolog:{color:"hsl(230, 4%, 64%)"},cdata:{color:"hsl(230, 4%, 64%)"},doctype:{color:"hsl(230, 8%, 24%)"},punctuation:{color:"hsl(230, 8%, 24%)"},entity:{color:"hsl(230, 8%, 24%)",cursor:"help"},"attr-name":{color:"hsl(35, 99%, 36%)"},"class-name":{color:"hsl(35, 99%, 36%)"},boolean:{color:"hsl(35, 99%, 36%)"},constant:{color:"hsl(35, 99%, 36%)"},number:{color:"hsl(35, 99%, 36%)"},atrule:{color:"hsl(35, 99%, 36%)"},keyword:{color:"hsl(301, 63%, 40%)"},property:{color:"hsl(5, 74%, 59%)"},tag:{color:"hsl(5, 74%, 59%)"},symbol:{color:"hsl(5, 74%, 59%)"},deleted:{color:"hsl(5, 74%, 59%)"},important:{color:"hsl(5, 74%, 59%)"},selector:{color:"hsl(119, 34%, 47%)"},string:{color:"hsl(119, 34%, 47%)"},char:{color:"hsl(119, 34%, 47%)"},builtin:{color:"hsl(119, 34%, 47%)"},inserted:{color:"hsl(119, 34%, 47%)"},regex:{color:"hsl(119, 34%, 47%)"},"attr-value":{color:"hsl(119, 34%, 47%)"},"attr-value > .token.punctuation":{color:"hsl(119, 34%, 47%)"},variable:{color:"hsl(221, 87%, 60%)"},operator:{color:"hsl(221, 87%, 60%)"},function:{color:"hsl(221, 87%, 60%)"},url:{color:"hsl(198, 99%, 37%)"},"attr-value > .token.punctuation.attr-equals":{color:"hsl(230, 8%, 24%)"},"special-attr > .token.attr-value > .token.value.css":{color:"hsl(230, 8%, 24%)"},".language-css .token.selector":{color:"hsl(5, 74%, 59%)"},".language-css .token.property":{color:"hsl(230, 8%, 24%)"},".language-css .token.function":{color:"hsl(198, 99%, 37%)"},".language-css .token.url > .token.function":{color:"hsl(198, 99%, 37%)"},".language-css .token.url > .token.string.url":{color:"hsl(119, 34%, 47%)"},".language-css .token.important":{color:"hsl(301, 63%, 40%)"},".language-css .token.atrule .token.rule":{color:"hsl(301, 63%, 40%)"},".language-javascript .token.operator":{color:"hsl(301, 63%, 40%)"},".language-javascript .token.template-string > .token.interpolation > .token.interpolation-punctuation.punctuation":{color:"hsl(344, 84%, 43%)"},".language-json .token.operator":{color:"hsl(230, 8%, 24%)"},".language-json .token.null.keyword":{color:"hsl(35, 99%, 36%)"},".language-markdown .token.url":{color:"hsl(230, 8%, 24%)"},".language-markdown .token.url > .token.operator":{color:"hsl(230, 8%, 24%)"},".language-markdown .token.url-reference.url > .token.string":{color:"hsl(230, 8%, 24%)"},".language-markdown .token.url > .token.content":{color:"hsl(221, 87%, 60%)"},".language-markdown .token.url > .token.url":{color:"hsl(198, 99%, 37%)"},".language-markdown .token.url-reference.url":{color:"hsl(198, 99%, 37%)"},".language-markdown .token.blockquote.punctuation":{color:"hsl(230, 4%, 64%)",fontStyle:"italic"},".language-markdown .token.hr.punctuation":{color:"hsl(230, 4%, 64%)",fontStyle:"italic"},".language-markdown .token.code-snippet":{color:"hsl(119, 34%, 47%)"},".language-markdown .token.bold .token.content":{color:"hsl(35, 99%, 36%)"},".language-markdown .token.italic .token.content":{color:"hsl(301, 63%, 40%)"},".language-markdown .token.strike .token.content":{color:"hsl(5, 74%, 59%)"},".language-markdown .token.strike .token.punctuation":{color:"hsl(5, 74%, 59%)"},".language-markdown .token.list.punctuation":{color:"hsl(5, 74%, 59%)"},".language-markdown .token.title.important > .token.punctuation":{color:"hsl(5, 74%, 59%)"},bold:{fontWeight:"bold"},italic:{fontStyle:"italic"},namespace:{Opacity:"0.8"},"token.tab:not(:empty):before":{color:"hsla(230, 8%, 24%, 0.2)"},"token.cr:before":{color:"hsla(230, 8%, 24%, 0.2)"},"token.lf:before":{color:"hsla(230, 8%, 24%, 0.2)"},"token.space:before":{color:"hsla(230, 8%, 24%, 0.2)"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item":{marginRight:"0.4em"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > button":{background:"hsl(230, 1%, 90%)",color:"hsl(230, 6%, 44%)",padding:"0.1em 0.4em",borderRadius:"0.3em"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > a":{background:"hsl(230, 1%, 90%)",color:"hsl(230, 6%, 44%)",padding:"0.1em 0.4em",borderRadius:"0.3em"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > span":{background:"hsl(230, 1%, 90%)",color:"hsl(230, 6%, 44%)",padding:"0.1em 0.4em",borderRadius:"0.3em"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:hover":{background:"hsl(230, 1%, 78%)",color:"hsl(230, 8%, 24%)"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:focus":{background:"hsl(230, 1%, 78%)",color:"hsl(230, 8%, 24%)"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:hover":{background:"hsl(230, 1%, 78%)",color:"hsl(230, 8%, 24%)"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:focus":{background:"hsl(230, 1%, 78%)",color:"hsl(230, 8%, 24%)"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:hover":{background:"hsl(230, 1%, 78%)",color:"hsl(230, 8%, 24%)"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:focus":{background:"hsl(230, 1%, 78%)",color:"hsl(230, 8%, 24%)"},".line-highlight.line-highlight":{background:"hsla(230, 8%, 24%, 0.05)"},".line-highlight.line-highlight:before":{background:"hsl(230, 1%, 90%)",color:"hsl(230, 8%, 24%)",padding:"0.1em 0.6em",borderRadius:"0.3em",boxShadow:"0 2px 0 0 rgba(0, 0, 0, 0.2)"},".line-highlight.line-highlight[data-end]:after":{background:"hsl(230, 1%, 90%)",color:"hsl(230, 8%, 24%)",padding:"0.1em 0.6em",borderRadius:"0.3em",boxShadow:"0 2px 0 0 rgba(0, 0, 0, 0.2)"},"pre[id].linkable-line-numbers.linkable-line-numbers span.line-numbers-rows > span:hover:before":{backgroundColor:"hsla(230, 8%, 24%, 0.05)"},".line-numbers.line-numbers .line-numbers-rows":{borderRightColor:"hsla(230, 8%, 24%, 0.2)"},".command-line .command-line-prompt":{borderRightColor:"hsla(230, 8%, 24%, 0.2)"},".line-numbers .line-numbers-rows > span:before":{color:"hsl(230, 1%, 62%)"},".command-line .command-line-prompt > span:before":{color:"hsl(230, 1%, 62%)"},".rainbow-braces .token.token.punctuation.brace-level-1":{color:"hsl(5, 74%, 59%)"},".rainbow-braces .token.token.punctuation.brace-level-5":{color:"hsl(5, 74%, 59%)"},".rainbow-braces .token.token.punctuation.brace-level-9":{color:"hsl(5, 74%, 59%)"},".rainbow-braces .token.token.punctuation.brace-level-2":{color:"hsl(119, 34%, 47%)"},".rainbow-braces .token.token.punctuation.brace-level-6":{color:"hsl(119, 34%, 47%)"},".rainbow-braces .token.token.punctuation.brace-level-10":{color:"hsl(119, 34%, 47%)"},".rainbow-braces .token.token.punctuation.brace-level-3":{color:"hsl(221, 87%, 60%)"},".rainbow-braces .token.token.punctuation.brace-level-7":{color:"hsl(221, 87%, 60%)"},".rainbow-braces .token.token.punctuation.brace-level-11":{color:"hsl(221, 87%, 60%)"},".rainbow-braces .token.token.punctuation.brace-level-4":{color:"hsl(301, 63%, 40%)"},".rainbow-braces .token.token.punctuation.brace-level-8":{color:"hsl(301, 63%, 40%)"},".rainbow-braces .token.token.punctuation.brace-level-12":{color:"hsl(301, 63%, 40%)"},"pre.diff-highlight > code .token.token.deleted:not(.prefix)":{backgroundColor:"hsla(353, 100%, 66%, 0.15)"},"pre > code.diff-highlight .token.token.deleted:not(.prefix)":{backgroundColor:"hsla(353, 100%, 66%, 0.15)"},"pre.diff-highlight > code .token.token.deleted:not(.prefix)::-moz-selection":{backgroundColor:"hsla(353, 95%, 66%, 0.25)"},"pre.diff-highlight > code .token.token.deleted:not(.prefix) *::-moz-selection":{backgroundColor:"hsla(353, 95%, 66%, 0.25)"},"pre > code.diff-highlight .token.token.deleted:not(.prefix)::-moz-selection":{backgroundColor:"hsla(353, 95%, 66%, 0.25)"},"pre > code.diff-highlight .token.token.deleted:not(.prefix) *::-moz-selection":{backgroundColor:"hsla(353, 95%, 66%, 0.25)"},"pre.diff-highlight > code .token.token.deleted:not(.prefix)::selection":{backgroundColor:"hsla(353, 95%, 66%, 0.25)"},"pre.diff-highlight > code .token.token.deleted:not(.prefix) *::selection":{backgroundColor:"hsla(353, 95%, 66%, 0.25)"},"pre > code.diff-highlight .token.token.deleted:not(.prefix)::selection":{backgroundColor:"hsla(353, 95%, 66%, 0.25)"},"pre > code.diff-highlight .token.token.deleted:not(.prefix) *::selection":{backgroundColor:"hsla(353, 95%, 66%, 0.25)"},"pre.diff-highlight > code .token.token.inserted:not(.prefix)":{backgroundColor:"hsla(137, 100%, 55%, 0.15)"},"pre > code.diff-highlight .token.token.inserted:not(.prefix)":{backgroundColor:"hsla(137, 100%, 55%, 0.15)"},"pre.diff-highlight > code .token.token.inserted:not(.prefix)::-moz-selection":{backgroundColor:"hsla(135, 73%, 55%, 0.25)"},"pre.diff-highlight > code .token.token.inserted:not(.prefix) *::-moz-selection":{backgroundColor:"hsla(135, 73%, 55%, 0.25)"},"pre > code.diff-highlight .token.token.inserted:not(.prefix)::-moz-selection":{backgroundColor:"hsla(135, 73%, 55%, 0.25)"},"pre > code.diff-highlight .token.token.inserted:not(.prefix) *::-moz-selection":{backgroundColor:"hsla(135, 73%, 55%, 0.25)"},"pre.diff-highlight > code .token.token.inserted:not(.prefix)::selection":{backgroundColor:"hsla(135, 73%, 55%, 0.25)"},"pre.diff-highlight > code .token.token.inserted:not(.prefix) *::selection":{backgroundColor:"hsla(135, 73%, 55%, 0.25)"},"pre > code.diff-highlight .token.token.inserted:not(.prefix)::selection":{backgroundColor:"hsla(135, 73%, 55%, 0.25)"},"pre > code.diff-highlight .token.token.inserted:not(.prefix) *::selection":{backgroundColor:"hsla(135, 73%, 55%, 0.25)"},".prism-previewer.prism-previewer:before":{borderColor:"hsl(0, 0, 95%)"},".prism-previewer-gradient.prism-previewer-gradient div":{borderColor:"hsl(0, 0, 95%)",borderRadius:"0.3em"},".prism-previewer-color.prism-previewer-color:before":{borderRadius:"0.3em"},".prism-previewer-easing.prism-previewer-easing:before":{borderRadius:"0.3em"},".prism-previewer.prism-previewer:after":{borderTopColor:"hsl(0, 0, 95%)"},".prism-previewer-flipped.prism-previewer-flipped.after":{borderBottomColor:"hsl(0, 0, 95%)"},".prism-previewer-angle.prism-previewer-angle:before":{background:"hsl(0, 0%, 100%)"},".prism-previewer-time.prism-previewer-time:before":{background:"hsl(0, 0%, 100%)"},".prism-previewer-easing.prism-previewer-easing":{background:"hsl(0, 0%, 100%)"},".prism-previewer-angle.prism-previewer-angle circle":{stroke:"hsl(230, 8%, 24%)",strokeOpacity:"1"},".prism-previewer-time.prism-previewer-time circle":{stroke:"hsl(230, 8%, 24%)",strokeOpacity:"1"},".prism-previewer-easing.prism-previewer-easing circle":{stroke:"hsl(230, 8%, 24%)",fill:"transparent"},".prism-previewer-easing.prism-previewer-easing path":{stroke:"hsl(230, 8%, 24%)"},".prism-previewer-easing.prism-previewer-easing line":{stroke:"hsl(230, 8%, 24%)"}},Te={'pre[class*="language-"]':{color:"#d4d4d4",fontSize:"13px",textShadow:"none",fontFamily:'Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace',direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",padding:"1em",margin:".5em 0",overflow:"auto",background:"#1e1e1e"},'code[class*="language-"]':{color:"#d4d4d4",fontSize:"13px",textShadow:"none",fontFamily:'Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace',direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]::selection':{textShadow:"none",background:"#264F78"},'code[class*="language-"]::selection':{textShadow:"none",background:"#264F78"},'pre[class*="language-"] *::selection':{textShadow:"none",background:"#264F78"},'code[class*="language-"] *::selection':{textShadow:"none",background:"#264F78"},':not(pre) > code[class*="language-"]':{padding:".1em .3em",borderRadius:".3em",color:"#db4c69",background:"#1e1e1e"},".namespace":{Opacity:".7"},"doctype.doctype-tag":{color:"#569CD6"},"doctype.name":{color:"#9cdcfe"},comment:{color:"#6a9955"},prolog:{color:"#6a9955"},punctuation:{color:"#d4d4d4"},".language-html .language-css .token.punctuation":{color:"#d4d4d4"},".language-html .language-javascript .token.punctuation":{color:"#d4d4d4"},property:{color:"#9cdcfe"},tag:{color:"#569cd6"},boolean:{color:"#569cd6"},number:{color:"#b5cea8"},constant:{color:"#9cdcfe"},symbol:{color:"#b5cea8"},inserted:{color:"#b5cea8"},unit:{color:"#b5cea8"},selector:{color:"#d7ba7d"},"attr-name":{color:"#9cdcfe"},string:{color:"#ce9178"},char:{color:"#ce9178"},builtin:{color:"#ce9178"},deleted:{color:"#ce9178"},".language-css .token.string.url":{textDecoration:"underline"},operator:{color:"#d4d4d4"},entity:{color:"#569cd6"},"operator.arrow":{color:"#569CD6"},atrule:{color:"#ce9178"},"atrule.rule":{color:"#c586c0"},"atrule.url":{color:"#9cdcfe"},"atrule.url.function":{color:"#dcdcaa"},"atrule.url.punctuation":{color:"#d4d4d4"},keyword:{color:"#569CD6"},"keyword.module":{color:"#c586c0"},"keyword.control-flow":{color:"#c586c0"},function:{color:"#dcdcaa"},"function.maybe-class-name":{color:"#dcdcaa"},regex:{color:"#d16969"},important:{color:"#569cd6"},italic:{fontStyle:"italic"},"class-name":{color:"#4ec9b0"},"maybe-class-name":{color:"#4ec9b0"},console:{color:"#9cdcfe"},parameter:{color:"#9cdcfe"},interpolation:{color:"#9cdcfe"},"punctuation.interpolation-punctuation":{color:"#569cd6"},variable:{color:"#9cdcfe"},"imports.maybe-class-name":{color:"#9cdcfe"},"exports.maybe-class-name":{color:"#9cdcfe"},escape:{color:"#d7ba7d"},"tag.punctuation":{color:"#808080"},cdata:{color:"#808080"},"attr-value":{color:"#ce9178"},"attr-value.punctuation":{color:"#ce9178"},"attr-value.punctuation.attr-equals":{color:"#d4d4d4"},namespace:{color:"#4ec9b0"},'pre[class*="language-javascript"]':{color:"#9cdcfe"},'code[class*="language-javascript"]':{color:"#9cdcfe"},'pre[class*="language-jsx"]':{color:"#9cdcfe"},'code[class*="language-jsx"]':{color:"#9cdcfe"},'pre[class*="language-typescript"]':{color:"#9cdcfe"},'code[class*="language-typescript"]':{color:"#9cdcfe"},'pre[class*="language-tsx"]':{color:"#9cdcfe"},'code[class*="language-tsx"]':{color:"#9cdcfe"},'pre[class*="language-css"]':{color:"#ce9178"},'code[class*="language-css"]':{color:"#ce9178"},'pre[class*="language-html"]':{color:"#d4d4d4"},'code[class*="language-html"]':{color:"#d4d4d4"},".language-regex .token.anchor":{color:"#dcdcaa"},".language-html .token.punctuation":{color:"#808080"},'pre[class*="language-"] > code[class*="language-"]':{position:"relative",zIndex:"1"},".line-highlight.line-highlight":{background:"#f7ebc6",boxShadow:"inset 5px 0 0 #f7d87c",zIndex:"0"}},Re=({snippet:s,title:a,...o})=>{const n=y().palette.mode==="light",d=e.jsx(te,{customStyle:{margin:"0px"},...o,style:n?Ce:Te,children:s});return a!=null?e.jsx(_,{title:`💡 Code Snippet - ${a}`,children:d}):d};var F={},Ae=f;Object.defineProperty(F,"__esModule",{value:!0});var $=F.default=void 0,De=Ae(g()),ze=e;$=F.default=(0,De.default)((0,ze.jsx)("path",{d:"M11 17c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1m0-14v4h2V5.08c3.39.49 6 3.39 6 6.92 0 3.87-3.13 7-7 7s-7-3.13-7-7c0-1.68.59-3.22 1.58-4.42L12 13l1.41-1.41-6.8-6.8v.02C4.42 6.45 3 9.05 3 12c0 4.97 4.02 9 9 9 4.97 0 9-4.03 9-9s-4.03-9-9-9zm7 9c0-.55-.45-1-1-1s-1 .45-1 1 .45 1 1 1 1-.45 1-1M6 12c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1"}),"AvTimer");var I={},qe=f;Object.defineProperty(I,"__esModule",{value:!0});var H=I.default=void 0,Oe=qe(g()),Be=e;H=I.default=(0,Oe.default)((0,Be.jsx)("path",{d:"M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 18H4V8h16z"}),"CalendarToday");var P={},Me=f;Object.defineProperty(P,"__esModule",{value:!0});var N=P.default=void 0,Ee=Me(g()),q=e;N=P.default=(0,Ee.default)([(0,q.jsx)("path",{d:"M4 6H2v14c0 1.1.9 2 2 2h14v-2H4z"},"0"),(0,q.jsx)("path",{d:"M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m-5.99 13c-.59 0-1.05-.47-1.05-1.05 0-.59.47-1.04 1.05-1.04.59 0 1.04.45 1.04 1.04-.01.58-.45 1.05-1.04 1.05m2.5-6.17c-.63.93-1.23 1.21-1.56 1.81-.13.24-.18.4-.18 1.18h-1.52c0-.41-.06-1.08.26-1.65.41-.73 1.18-1.16 1.63-1.8.48-.68.21-1.94-1.14-1.94-.88 0-1.32.67-1.5 1.23l-1.37-.57C11.51 5.96 12.52 5 13.99 5c1.23 0 2.08.56 2.51 1.26.37.61.58 1.73.01 2.57"},"1")],"Quiz");const We=({created:s,estimatedReadingTime:a,quizIncluded:o})=>{const l=y(),n=me(d=>d.breakpoints.up("sm"));return e.jsxs(p,{sx:{display:"flex",width:"100%"},children:[e.jsx(m,{title:"Creation Date",placement:n?"left":"top-start",children:e.jsx(w,{sx:{flex:1,mx:{xs:0,sm:.5}},icon:e.jsx(H,{}),label:B(s,!n),variant:"outlined"})}),e.jsx(m,{title:"Estimated Time to Read",placement:n?"left":"top-start",children:e.jsx(w,{sx:{flex:1,mx:{xs:0,sm:.5}},icon:e.jsx($,{}),label:`~${a} ${n?"minutes":"min"}`,variant:"outlined"})}),e.jsx(m,{title:o?"This blog contains quizzes":"This blog does not contain quizzes",placement:n?"left":"top-start",children:e.jsx(w,{sx:{flex:1,mx:{xs:0,sm:.5},color:o?"green.main":"red.main"},icon:e.jsx(N,{style:{color:o?l.palette.green.main:l.palette.red.main}}),label:n?`Quiz ${o?"Included":"Not Included"}`:`${o?"":"No"} Quiz`,variant:"outlined"})})]})},_e=()=>{const s=Number(re().blogID),a=y().palette.mode==="light",o=v.find(l=>l.id===s);return o==null?e.jsx(he,{}):e.jsxs(t.Fragment,{children:[e.jsx(ce,{destination:"/blog"}),e.jsx(M,{title:o.title,mt:0,subtitle:o.subtitle,children:e.jsx(We,{created:o==null?void 0:o.created,estimatedReadingTime:o==null?void 0:o.estimatedReadingTime,quizIncluded:o==null?void 0:o.quizIncluded})}),e.jsxs(p,{mx:"auto",component:"section",p:2,sx:{maxWidth:"800px",aspectRatio:1,display:"flex",flexDirection:"column",bgcolor:a?"rgba(255,255,255,0.4)":"rgba(0,0,0,0.4)",borderRadius:"15px"},children:[e.jsx(E,{src:o.thumbnail,sx:{width:"90%",maxWidth:"500px",borderRadius:"15px",border:"2px solid black",mx:"auto",bgcolor:"rgb(200,200,200)"}}),e.jsx(p,{component:"section",sx:{img:{my:3}},children:(o==null?void 0:o.elements)&&o.elements.map((l,n)=>e.jsx($e,{elementData:l,emoji:o.emoji,created:o.created},`element-${n}`))})]})]})},$e=({emoji:s,created:a,elementData:o})=>{switch(o.type){case"h6":case"h5":case"h4":case"h3":case"h2":case"h1":return e.jsxs(t.Fragment,{children:[e.jsx(i,{textAlign:{sm:"left",xs:"center"},fontWeight:"bold",sx:{mt:o.type==="h6"?2:4,mb:1},variant:o.type,children:`${s} ${o.children}`}),e.jsx(z,{sx:{mb:4}})]});case"code":return e.jsx(Re,{language:o.language,snippet:o.children,title:o.title});case"quiz":return e.jsx(Se,{question:o.question,options:o.options});case"feedback":return e.jsxs(t.Fragment,{children:[e.jsx(p,{component:"hr",width:"100%",mt:4}),e.jsx(i,{textAlign:{sm:"left",xs:"center"},fontWeight:"bold",sx:{mt:6,mb:1},variant:"h4",children:`${s} Feedback`}),e.jsx(z,{}),e.jsxs(i,{textAlign:"justify",fontSize:20,my:2,children:["Find something wrong with one of my blog posts? Want to provide general feedback? Let me know ",e.jsx(ge,{target:"_blank",href:"https://forms.gle/bEsuMMEHmtViWxmY7",children:"here"}),"!"]})]});case"signoff":return e.jsxs(i,{align:"right",mt:3,children:["Last updated: ",B(a)]});case"p":return e.jsx(i,{textAlign:{md:"justify"},fontSize:20,my:6,children:o.children});case"img":return e.jsx(E,{component:"img",width:"100%",src:o.src,alt:o.alt,sx:{aspectRatio:o.aspectRatio,borderRadius:"15px"}});default:return o.children}},He=()=>e.jsxs(ne,{children:[e.jsx(A,{path:"",element:e.jsx(ke,{})}),e.jsx(A,{path:"/:blogID",element:e.jsx(_e,{})})]}),no=Object.freeze(Object.defineProperty({__proto__:null,default:He},Symbol.toStringTag,{value:"Module"}));export{We as B,no as i};
