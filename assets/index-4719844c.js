import{a as t,o as O,n as E,s as F,q as f,t as W,v as N,W as ue,j as e,w as $,x as H,a7 as ge,B as S,R as me,_ as fe,r as R,i as A,a8 as be,f as D,a9 as T,I as ye,aa as xe,ab as ee,ac as ke,l as we,m as Z}from"./index-b197d6fe.js";import{C as ve,a as je,b as Ce}from"./index-c304716b.js";import{I as a}from"./index-961b81ff.js";import{S as q}from"./SparklezText-cc651ad1.js";import{G as oe}from"./index-6fccfc52.js";import{u as Se}from"./index-8fbb96c7.js";import{C as te,T as y,B as M}from"./index-352ca49e.js";import{B as Ie}from"./index-1d3a735a.js";import Fe from"./index-8b3a790f.js";import{I as Re}from"./index-09cb14f4.js";import{T as B,C as z}from"./index-0d88b5c0.js";import{P as Ae,d as Te}from"./Visibility-7456465c.js";import{G as K}from"./Grid-17328a78.js";import{B as Pe}from"./Button-380d1948.js";import{u as re}from"./useMediaQuery-30fbf988.js";import{L as Me}from"./Link-0b7002d5.js";const $e=t.createContext({}),ne=$e;function De(o){return E("MuiAccordion",o)}const ze=O("MuiAccordion",["root","rounded","expanded","disabled","gutters","region"]),P=ze,qe=["children","className","defaultExpanded","disabled","disableGutters","expanded","onChange","square","TransitionComponent","TransitionProps"],Be=o=>{const{classes:n,square:s,expanded:i,disabled:r,disableGutters:l}=o;return H({root:["root",!s&&"rounded",i&&"expanded",r&&"disabled",!l&&"gutters"],region:["region"]},De,n)},_e=F(Ae,{name:"MuiAccordion",slot:"Root",overridesResolver:(o,n)=>{const{ownerState:s}=o;return[{[`& .${P.region}`]:n.region},n.root,!s.square&&n.rounded,!s.disableGutters&&n.gutters]}})(({theme:o})=>{const n={duration:o.transitions.duration.shortest};return{position:"relative",transition:o.transitions.create(["margin"],n),overflowAnchor:"none","&:before":{position:"absolute",left:0,top:-1,right:0,height:1,content:'""',opacity:1,backgroundColor:(o.vars||o).palette.divider,transition:o.transitions.create(["opacity","background-color"],n)},"&:first-of-type":{"&:before":{display:"none"}},[`&.${P.expanded}`]:{"&:before":{opacity:0},"&:first-of-type":{marginTop:0},"&:last-of-type":{marginBottom:0},"& + &":{"&:before":{display:"none"}}},[`&.${P.disabled}`]:{backgroundColor:(o.vars||o).palette.action.disabledBackground}}},({theme:o,ownerState:n})=>f({},!n.square&&{borderRadius:0,"&:first-of-type":{borderTopLeftRadius:(o.vars||o).shape.borderRadius,borderTopRightRadius:(o.vars||o).shape.borderRadius},"&:last-of-type":{borderBottomLeftRadius:(o.vars||o).shape.borderRadius,borderBottomRightRadius:(o.vars||o).shape.borderRadius,"@supports (-ms-ime-align: auto)":{borderBottomLeftRadius:0,borderBottomRightRadius:0}}},!n.disableGutters&&{[`&.${P.expanded}`]:{margin:"16px 0"}})),Oe=t.forwardRef(function(n,s){const i=W({props:n,name:"MuiAccordion"}),{children:r,className:l,defaultExpanded:u=!1,disabled:p=!1,disableGutters:b=!1,expanded:I,onChange:g,square:x=!1,TransitionComponent:v=te,TransitionProps:k}=i,j=N(i,qe),[d,m]=ue({controlled:I,default:u,name:"Accordion",state:"expanded"}),c=t.useCallback(pe=>{m(!d),g&&g(pe,!d)},[d,g,m]),[w,...h]=t.Children.toArray(r),he=t.useMemo(()=>({expanded:d,disabled:p,disableGutters:b,toggle:c}),[d,p,b,c]),Q=f({},i,{square:x,disabled:p,disableGutters:b,expanded:d}),Y=Be(Q);return e.jsxs(_e,f({className:$(Y.root,l),ref:s,ownerState:Q,square:x},j,{children:[e.jsx(ne.Provider,{value:he,children:w}),e.jsx(v,f({in:d,timeout:"auto"},k,{children:e.jsx("div",{"aria-labelledby":w.props.id,id:w.props["aria-controls"],role:"region",className:Y.region,children:h})}))]}))}),Ee=Oe;function We(o){return E("MuiAccordionDetails",o)}O("MuiAccordionDetails",["root"]);const Ne=["className"],He=o=>{const{classes:n}=o;return H({root:["root"]},We,n)},Ve=F("div",{name:"MuiAccordionDetails",slot:"Root",overridesResolver:(o,n)=>n.root})(({theme:o})=>({padding:o.spacing(1,2,2)})),Ge=t.forwardRef(function(n,s){const i=W({props:n,name:"MuiAccordionDetails"}),{className:r}=i,l=N(i,Ne),u=i,p=He(u);return e.jsx(Ve,f({className:$(p.root,r),ref:s,ownerState:u},l))}),Le=Ge;function Ue(o){return E("MuiAccordionSummary",o)}const Je=O("MuiAccordionSummary",["root","expanded","focusVisible","disabled","gutters","contentGutters","content","expandIconWrapper"]),C=Je,Qe=["children","className","expandIcon","focusVisibleClassName","onClick"],Ye=o=>{const{classes:n,expanded:s,disabled:i,disableGutters:r}=o;return H({root:["root",s&&"expanded",i&&"disabled",!r&&"gutters"],focusVisible:["focusVisible"],content:["content",s&&"expanded",!r&&"contentGutters"],expandIconWrapper:["expandIconWrapper",s&&"expanded"]},Ue,n)},Ze=F(ge,{name:"MuiAccordionSummary",slot:"Root",overridesResolver:(o,n)=>n.root})(({theme:o,ownerState:n})=>{const s={duration:o.transitions.duration.shortest};return f({display:"flex",minHeight:48,padding:o.spacing(0,2),transition:o.transitions.create(["min-height","background-color"],s),[`&.${C.focusVisible}`]:{backgroundColor:(o.vars||o).palette.action.focus},[`&.${C.disabled}`]:{opacity:(o.vars||o).palette.action.disabledOpacity},[`&:hover:not(.${C.disabled})`]:{cursor:"pointer"}},!n.disableGutters&&{[`&.${C.expanded}`]:{minHeight:64}})}),Ke=F("div",{name:"MuiAccordionSummary",slot:"Content",overridesResolver:(o,n)=>n.content})(({theme:o,ownerState:n})=>f({display:"flex",flexGrow:1,margin:"12px 0"},!n.disableGutters&&{transition:o.transitions.create(["margin"],{duration:o.transitions.duration.shortest}),[`&.${C.expanded}`]:{margin:"20px 0"}})),Xe=F("div",{name:"MuiAccordionSummary",slot:"ExpandIconWrapper",overridesResolver:(o,n)=>n.expandIconWrapper})(({theme:o})=>({display:"flex",color:(o.vars||o).palette.action.active,transform:"rotate(0deg)",transition:o.transitions.create("transform",{duration:o.transitions.duration.shortest}),[`&.${C.expanded}`]:{transform:"rotate(180deg)"}})),eo=t.forwardRef(function(n,s){const i=W({props:n,name:"MuiAccordionSummary"}),{children:r,className:l,expandIcon:u,focusVisibleClassName:p,onClick:b}=i,I=N(i,Qe),{disabled:g=!1,disableGutters:x,expanded:v,toggle:k}=t.useContext(ne),j=c=>{k&&k(c),b&&b(c)},d=f({},i,{expanded:v,disabled:g,disableGutters:x}),m=Ye(d);return e.jsxs(Ze,f({focusRipple:!1,disableRipple:!0,disabled:g,component:"div","aria-expanded":v,className:$(m.root,l),focusVisibleClassName:$(m.focusVisible,p),onClick:j,ref:s,ownerState:d},I,{children:[e.jsx(Ke,{className:m.content,ownerState:d,children:r}),u&&e.jsx(Xe,{className:m.expandIconWrapper,ownerState:d,children:u})]}))}),oo=eo,to={id:1,title:"Polling in ReactJS",subtitle:"A guide on how to request data from the backend in set intervals.",thumbnail:"/images/blog/thumbnail_polling.webp",created:"2023-06-24T04:31:51.316Z",estimatedReadingTime:5,quizIncluded:!0,emoji:"🎣",elements:[{type:"p",children:"This blog post will mainly focus on how to poll in ReactJS. However, if you're using something else like Vanilla Javascript, you should be able to easily extrapolate from the information here for your own needs."},{type:"h4",children:"1. What is Polling?"},{type:"p",children:"Polling a backend enables you to fetch updated data from a server at regular intervals, providing a way to incorporate real-time updates into your application without relying on manual user actions."},{type:"p",children:"While polling is not as efficient as Websocket connections, its simplicity makes it a better choice for live data that are infrequently updated and when synchronisation is not too important."},{type:"p",children:"For instance, you wouldn't use polling for a live message feed, whereas you would for scenarios like retrieving weather forecast updates."},{type:"h4",children:"2. The Problem"},{type:"p",children:"Say you have a button counter that keeps track of how many people have clicked on it. It could be minutes or even hours till the next button click, and nobody's going to nitpick about how precise or perfectly synchronised that counter is. So, to keep things simple and practical, you've opted for polling."},{type:"p",children:e.jsxs(t.Fragment,{children:["Sending a request to the backend for the count will return the following ",e.jsx(a,{children:"json"}),"."]})},{type:"code",language:"json",children:`{
  "totalClicked": 1
}`},{type:"p",children:"Now, how can we make our application automatically request for that data every five seconds or so? While it may be simple in Vanilla JavaScript, many people struggle with it in ReactJS if they're unfamiliar with the life-cycle of a React component."},{type:"h4",children:"3. The Naïve Approach"},{type:"p",children:e.jsxs(t.Fragment,{children:["Most people would think to simply use ",e.jsx(a,{children:"setInterval"})," to create a function scheduled to be repeatedly called every now and then. However, it's not that simple..."]})},{type:"code",language:"jsx",title:"Naïve polling",children:`import React, { useState, useEffect } from 'react';

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
`},{type:"quiz",question:"What is wrong with the above naïve polling?",options:[{text:"You risk creating multiple parallel timers for the same function.",correct:!0,explanation:e.jsxs(t.Fragment,{children:["Every time the component function is invoked (i.e., from a state update), a new interval schedule will be created concurrently with the original one. The overlapping of the same interval function will create excessive API requests and may bottleneck in the backend. The more updates your component goes through, the more excessive API requests will be made.",e.jsx("br",{}),e.jsx("br",{}),"In general, it is recommended to perform any side effects, such as setting up timers, or making API calls, within the useEffect hook. This ensures that the side effects are properly managed and cleaned up when the component unmounts or when the component's states (i.e., the dependencies) changes."]})},{text:e.jsxs(t.Fragment,{children:["A ",e.jsx(a,{children:"useEffect"})," hook is better for creating a polling functionality compared to using ",e.jsx(a,{children:"setInterval"}),"."]}),correct:!1,explanation:e.jsxs(t.Fragment,{children:["Completely replacing the ",e.jsx(a,{children:"setInterval"})," with a ",e.jsx(a,{children:"useEffect"})," hook is not viable, since you would not have a way to set how often the polling will occur.",e.jsx("br",{}),e.jsx("br",{}),"Removing the dependency array will cause the polling to occur every millisecond, leading to loads of server traffic. ",e.jsx("br",{}),e.jsx("br",{}),"Including the dependency array will cause the polling to occur only when a state changes, turning it into a manual process.",e.jsx("br",{}),e.jsx("br",{}),"We want the polling to be automatic and occur in longer intervals."]})},{text:e.jsxs(t.Fragment,{children:["The ",e.jsx(a,{children:"setInterval"})," function is not asynchronous, which will create blockage in the code."]}),correct:!1,explanation:"The function inside the setInterval will be executed in an asynchronous manner, meaning it won't interfere with the main code."},{text:e.jsxs(t.Fragment,{children:["The backend is only polled once since the ",e.jsx(a,{children:"setInterval"})," is only called once."]}),correct:!1,explanation:e.jsxs(t.Fragment,{children:["The ",e.jsx(a,{children:"setInterval"})," is used to create a timer that will execute its given function periodically, which in this example, is every 5000 milliseconds (5 seconds). So the backend will be polled every 5 seconds."]})}]},{type:"p",children:"So, what's the better way to poll in ReactJS?"},{type:"h4",children:"4. The Better Approach"},{type:"h6",children:"4.1 The useEffect Hook"},{type:"p",children:"To solve the shortcomings of the naïve polling, we need a way that gets rid of any existing duplicate timers so that there is only one timer for this polling functionality running at a time. We also need a way to ensure that these timers won't be created each time the component function gets invoked."},{type:"p",children:e.jsxs(t.Fragment,{children:["Luckily, we have the perfect hook for these kinds of problems - The ",e.jsx(q,{children:"useEffect"})," hook. We will use it by wrapping it around our ",e.jsx(a,{children:"setInterval"}),"."]})},{type:"code",language:"jsx",title:"Wrapping our setInterval into a useEffect",children:`import React, { useState, useEffect } from 'react';

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
`},{type:"p",children:e.jsxs(t.Fragment,{children:["By putting our ",e.jsx(a,{children:"setInterval"})," into a ",e.jsx(a,{children:"useEffect"}),", we ensured that it will only be called once in the lifecycle, rather than each time the component re-renders or has a state change."]})},{type:"p",children:e.jsxs(t.Fragment,{children:["Furthermore, you may have also noticed that we're now keeping track of the ID of the polling interval we made. This is so we can get rid of that interval if we don't need it anymore by using ",e.jsx(a,{children:"clearInterval"}),". But where in our ",e.jsx(a,{children:"useEffect"})," should we use this?"]})},{type:"h6",children:"4.2 The Cleanup Function"},{type:"p",children:e.jsxs(t.Fragment,{children:["One often overlooked feature of the ",e.jsx(a,{children:"useEffect"})," hook is its ",e.jsx(q,{children:"cleanup"})," function, which is the function that gets returned from the ",e.jsx(a,{children:"useEffect"}),"."]})},{type:"code",language:"js",title:"Where is cleanup located in useEffect?",children:`useEffect(() => {
  // Do the effect

  return () => {
    // Do the cleanup of the effect
  }
})`},{type:"p",children:e.jsxs(t.Fragment,{children:["This cleanup function is called when the component is unmounted. We can use this to our advantage by placing our ",e.jsx(a,{children:"clearInterval"})," in here."]})},{type:"p",children:"This way, if our button gets unmounted from the DOM, our application will no longer poll the backend unnecessarily."},{type:"code",language:"js",title:"Adding a cleanup function to our useEffect",children:`useEffect(() => {
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

export default CounterButton;`},{type:"p",children:"Hope you've learnt something new from this blog post and can master polling in ReactJS if you ever need it."},{type:"signoff"},{type:"feedback"}]},ro={id:2,title:"Why use Promise.all?",subtitle:"How to make fetch requests concurrently.",thumbnail:"/images/blog/thumbnail_promise.webp",created:"2023-07-11T00:00:00.000Z",estimatedReadingTime:7,quizIncluded:!1,emoji:"📬",elements:[{type:"p",children:e.jsxs(t.Fragment,{children:["You may have been asked before to use",e.jsx(a,{children:"Promise.all"}),'and asked yourself "but why?". Why use',e.jsx(a,{children:"Promise.all"}),"when you could just fetch requests in a",e.jsx(a,{children:"while"}),"loop? Before answering all that, we should first see what",e.jsx(a,{children:"Promise.all"}),"even does."]})},{type:"h4",children:"1. What is Promise.all?"},{type:"p",children:e.jsxs(t.Fragment,{children:["As the name suggests,",e.jsx(a,{children:"Promise.all"}),"is used for handling multiple promises in parallel and synchronising their results. It takes in an array of promises and returns a singular new promise that is fulfilled when all the promises in the given array is fulfilled. This singular new promise will resolve an array of all the resolved values from each of the promises in its array."]})},{type:"p",children:'"Fulfilled" in this case means when the asynchronous operation associated with the promise has finished successfully (requesting data from the backend etc.), and the promise has resolved with a value.'},{type:"p",children:e.jsxs(t.Fragment,{children:["For example, if we have 3 promises where one takes 10 seconds to fulfill while the others take 1 second, then the Promise created by using",e.jsx(a,{children:"Promise.all"}),"will be fufilled 10 seconds later."]})},{type:"code",language:"js",title:"Promise.all example",children:`const promse1 = fetch('localhost:3000/food/1'); // Fetch Drink, which takes 1 second to make
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
});`},{type:"p",children:e.jsxs(t.Fragment,{children:["You can also chain",e.jsx(a,{children:".then"}),"and",e.jsx(a,{children:".catch"}),"at the end of each individual promise"]})},{type:"code",language:"js",title:"Promise.all example with .then chaining",children:`const promse1 = fetch('localhost:3000/food/1')
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
});`},{type:"p",children:e.jsxs(t.Fragment,{children:["Note that if you do add",e.jsx(a,{children:".catch"}),", then if any of the promises are rejected, the catch block of",e.jsx(a,{children:"Promise.all"}),"will be executed with the reason of the first rejected promise encountered, and the other promises' results will be ignored."]})},{type:"p",children:e.jsxs(t.Fragment,{children:[e.jsx(a,{children:"Promise.all"}),"can then be used with the inbuilt",e.jsx(a,{children:".map"}),"function of every array to avoid repeating ourselves."]})},{type:"code",language:"js",title:"Promise.all example with mapping",children:`const promiseArray = [1, 2, 3].map((item) => (
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
*/`},{type:"p",children:e.jsxs(t.Fragment,{children:["If you're more comfortable with",e.jsx(a,{children:"awaits"}),"and",e.jsx(a,{children:"asyncs"}),", then you can replace the function passed into the mapping into an async function like so. Be careful, make sure you mind your",e.jsx(a,{children:"awaits"}),"and",e.jsx(a,{children:"asyncs"}),"here."]})},{type:"code",language:"js",title:"Promise.all with await and async",children:`const promiseArray = [1, 2, 3].map(async (item) => {
  // Waits for response and gets the json string that was responded.
  const response = await fetch(\`localhost:3000/food/\${item}\`);
  return await response.json();
});

const responseArray = await Promise.all((promiseArray));

// responseArray === ['Burger', 'Drink', 'Fries']
console.log(responseArray);`},{type:"p",children:e.jsxs(t.Fragment,{children:["So far, it seems like you could ignore all of this and replace it with the tried and trusted",e.jsx(a,{children:"for"}),"loop. So... what gives?"]})},{type:"h4",children:"2. The Problem"},{type:"p",children:e.jsxs(t.Fragment,{children:["You may have come across this problem before. Say you work at a food delivery service and to get all items a customer has ordered, you can use this endpoint (replacing",e.jsx(a,{children:"CUSTOMER_ID"}),"with the id of the targeted customer):"]})},{type:"code",language:"js",children:"goodFood.com/customer/order/[CUSTOMER_ID]"},{type:"p",children:e.jsxs(t.Fragment,{children:["Which will get you this",e.jsx(a,{children:"json"}),"response:"]})},{type:"code",language:"json",children:`{
  order: [12390, 11231, 4210, 42]
}`},{type:"p",children:'Where each number in the array keyed by "order" is the ID of a food item.'},{type:"p",children:"Being the good UI designer who cares a lot about user experience, there is no way you are going to show a bunch of numbers to your customers. Won't it be much better if you could display the name of the food item associated with each ID in that array?"},{type:"p",children:"Luckily, you have another endpoint which gives you more information about the food item associated with the ID you've given."},{type:"code",language:"js",children:"goodFood.com/food/[FOOD_ID]"},{type:"code",language:"json",children:`{
  name: "Burger",
  price: 7.5
}`},{type:"p",children:"But, how do you call this endpoint for each of the food items in our array?"},{type:"h4",children:"3. The Naïve Approach"},{type:"p",children:e.jsxs(t.Fragment,{children:["Let's try using a",e.jsx(a,{children:"for"}),"loop to solve this."]})},{type:"code",language:"jsx",title:"Naïve fetching",children:`// Orders fetched from other endpoint
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
}`},{type:"p",children:e.jsxs(t.Fragment,{children:["Looks fine, so what's wrong? Well, the method of fetching above will not work because of the asynchronous nature of the",e.jsx(a,{children:"fetch/Promises"}),". This means that the code will reach the next for loop",e.jsx("b",{children:"before"}),"the fetches have completed."]})},{type:"p",children:e.jsxs(t.Fragment,{children:["Alright, so then lets include",e.jsx(a,{children:"await"}),"and",e.jsx(a,{children:"async"}),"keywords (unless you are specifically restricted from using these *ahem*)."]})},{type:"code",language:"js",title:"Naïve fetching with await and asyncs",children:`// Orders fetched from other endpoint
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
}`},{type:"p",children:e.jsxs(t.Fragment,{children:["This then leads onto more problems. What happens if each fetch request takes 1 second to ",e.jsx(S,{component:"span",sx:{textDecoration:"line-through"},children:"cook"})," resolve?"]})},{type:"p",children:e.jsxs(t.Fragment,{children:["Since each request is only sent when the previous request is fulfilled, then getting the information of these 4 items will take 4 seconds! Imagine if you've ordered 100 items for a party. Your app will take ",e.jsx("b",{children:"100"})," seconds to respond."]})},{type:"p",children:e.jsxs(t.Fragment,{children:["Fortunately, using ",e.jsx(q,{children:"Promise.all"})," will solve both of these issues. It will make your fetch requests run concurrently while ensuring that the order of execution is maintained."]})},{type:"h4",children:"4. The Better Approach"},{type:"p",children:e.jsxs(t.Fragment,{children:["As a reminder, we need to do these steps in this order:",e.jsxs("ul",{children:[e.jsx("li",{children:"Get the array of order IDs."}),e.jsxs("li",{children:["Get the information of each order ID ",e.jsx("b",{children:"concurrently"}),"."]}),e.jsx("li",{children:"When and only when the information needed has successfully been gathered, then we display them all onto the DOM"})]}),"For now, we will skip the first step and focus on using",e.jsx(a,{children:"Promise.all"}),"to get all the information concurrently by first hardcoding the array of IDs. Don't worry, at the end I'll show you how to also fetch that array without breaking the order of steps."]})},{type:"h6",children:"4.1 Promise.all"},{type:"p",children:e.jsxs(t.Fragment,{children:["To use",e.jsx(a,{children:"Promise.all"}),", we first need an array of promises. We can create this using the aforementioned",e.jsx(a,{children:".map"}),"function."]})},{type:"code",language:"js",title:"Mapping order IDs to fetches",children:`// Orders fetched from other endpoint
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
*/`},{type:"p",children:e.jsxs(t.Fragment,{children:["Now, just need to pass in this",e.jsx(a,{children:"arrayOfPromises"}),"into a",e.jsx(a,{children:"Promise.all"}),"."]})},{type:"code",language:"js",title:"Introducing Promise.all",children:`// Orders fetched from other endpoint
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
  .catch((error) => {//...//});`},{type:"h6",children:"4.2 Removing the hardcoded array"},{type:"p",children:e.jsxs(t.Fragment,{children:["Currently in our solution, we have hardcoded the array of order IDs. So how do we make it so that we fetch the order IDs from the API and then execute the",e.jsx(a,{children:"Promise.all"}),"?"]})},{type:"p",children:"We can easily use Promise chaining here."},{type:"code",language:"js",title:"Removing hardcoded array of order IDs",children:`fetch('goodFood.com/customer/order/5309206')
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
  .catch((error) => {//...//});`},{type:"h6",children:"4.3 Modularising the code"},{type:"p",children:e.jsxs(t.Fragment,{children:["Of course, the above code can be improved ",e.jsx("i",{children:"significantly"})," by extracting the",e.jsx(a,{children:"fetch"}),"function and its",e.jsx(a,{children:"then"}),"and",e.jsx(a,{children:"catch"}),"into its own separate dedicated API function."]})},{type:"code",language:"js",title:"Removing hardcoded array of order IDs",children:`// Preferably have this function getReq imported from another javascript file
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
  })`},{type:"p",children:e.jsx(t.Fragment,{children:"Now, we have the capability to fetch the array of order IDs initially. Once that fetch is fulfilled, we can proceed to concurrently fetch additional information for each ID while ensuring that the necessary execution order is maintained."})},{type:"h6",children:"4.4 Await/Async alternative"},{type:"p",children:e.jsxs(t.Fragment,{children:["If you much rather use",e.jsx(a,{children:"awaits"}),"and",e.jsx(a,{children:"asyncs"}),", then you can use the following snippet."]})},{type:"code",language:"js",title:"Removing hardcoded array of order IDs",children:`// Preferably have this function getReq imported from another javascript file 
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
}`},{type:"signoff"},{type:"feedback"}]},_=[to,ro],no=({index:o=0})=>{const[n,s]=Se({rootMargin:"9999999px 0px 0px 0px"});return e.jsx(ve,{ref:n,sx:{opacity:s?"0.8":"0",translate:s?"0px":o%2?"100px":"-100px",mx:{lg:0,md:5,xs:0},mb:{md:5,xs:2}},children:e.jsx(y,{fontSize:18,children:" More posts coming soon..."})})},ao=me.lazy(()=>fe(()=>import("./index-ecd59da2.js"),["assets/index-ecd59da2.js","assets/index-b197d6fe.js","assets/index-a0c3409e.css","assets/index-8fbb96c7.js","assets/index-0d88b5c0.js","assets/index-352ca49e.js","assets/index-c304716b.js","assets/useMediaQuery-30fbf988.js","assets/index-09cb14f4.js","assets/index-961b81ff.js","assets/SparklezText-cc651ad1.js","assets/index-98868e98.js","assets/v4-a960c1f4.js","assets/index-6fccfc52.js","assets/index-1d3a735a.js","assets/index-8b3a790f.js","assets/use-sound.esm-655986d5.js","assets/Visibility-7456465c.js","assets/Grid-17328a78.js","assets/Button-380d1948.js","assets/Link-0b7002d5.js"])),so=()=>{const o=_.map((n,s)=>e.jsx(t.Suspense,{fallback:e.jsx(Ce,{}),children:e.jsx(ao,{index:s,data:n})},`blog-${s}`));return o.push(e.jsx(no,{index:_.length},"trailing-card")),e.jsxs(t.Fragment,{children:[e.jsx(oe,{title:"Blog Posts",subtitle:"Resources for students (and other shenanigans)"}),e.jsx(je,{children:o})]})};var V={},io=A;Object.defineProperty(V,"__esModule",{value:!0});var ae=V.default=void 0,lo=io(R()),co=e,ho=(0,lo.default)((0,co.jsx)("path",{d:"M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"}),"Refresh");ae=V.default=ho;var G={},po=A;Object.defineProperty(G,"__esModule",{value:!0});var se=G.default=void 0,uo=po(R()),go=e,mo=(0,uo.default)((0,go.jsx)("path",{d:"M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"}),"ExpandMore");se=G.default=mo;const ie=({children:o,title:n,bgcolor:s})=>{const i=be({onSwiped:({event:r})=>{r.stopPropagation()}});return e.jsxs(Ee,{...i,children:[e.jsx(oo,{expandIcon:e.jsx(se,{}),sx:{bgcolor:s},children:e.jsx(y,{fontWeight:"bold",children:n})}),e.jsx(Le,{sx:{bgcolor:s},children:o})]})},fo=({question:o,options:n})=>{const s=D(),i=s.palette.mode==="light",[r,l]=t.useState(!1),[u,p]=t.useState(""),[b,I]=t.useState(void 0),[g,x]=t.useState(!1),[v,k]=t.useState([]),j=t.useRef(null);t.useEffect(()=>{k(T(n))},[n]);const d=()=>{l(!r),x(!1),r?k(T(n)):p("Answer Revealed")},m=(c,w)=>{const h=j.current;h==null||h.classList.remove("logo-anim"),h==null||h.offsetWidth,h==null||h.classList.add("logo-anim"),x(!c),I(w),c?(l(!0),p(`✅ ${T(["Correct!","Well Done!","Fantastic!"])[0]}`)):p(`❌ ${T(["Incorrect!","Try Again!","Not Quite!"])[0]}`)};return e.jsx(ie,{bgcolor:i?"#6f8ead":"#234553",title:"🧩 Quiz - Try to complete me before continuing.",children:e.jsxs(S,{sx:{borderRadius:"15px",bgcolor:"bgColor.main",boxSizing:"border-box",position:"relative",boxShadow:"0 8px 6px -6px black"},p:2,pt:3,my:2,children:[e.jsx(M,{title:r?"Restart":"Reveal Answer",children:e.jsx(ye,{onClick:d,sx:{position:"absolute",top:"4px",right:"4px"},children:r?e.jsx(ae,{}):e.jsx(Te,{})})}),e.jsx(y,{mb:2,variant:"h5",align:"center",children:o}),e.jsx(K,{container:!0,rowSpacing:{xs:1,sm:2,md:3},columnSpacing:{xs:1,sm:2,md:3},children:v.map((c,w)=>e.jsx(K,{item:!0,xs:12,md:6,children:e.jsx(Pe,{sx:{p:2,border:`2px solid ${r?r&&c.correct?s.palette.green.main:s.palette.red.main:s.palette.contrastColor.main}`,borderRadius:"15px",width:"100%",height:"100%",boxSizing:"border-box",textTransform:"none",transition:"scale 0.2s ease-in-out","&:hover":{scale:"1.05"},opacity:r&&!c.correct?"0.5":"1",boxShadow:"0 8px 6px -6px black"},disabled:r,onClick:h=>{h.preventDefault(),m(c.correct,c.explanation)},children:e.jsx(y,{fontSize:16,color:r?r&&c.correct?s.palette.green.main:s.palette.red.main:s.palette.contrastColor.main,align:"center",children:c.text})})},`option-${w}`))}),e.jsxs(te,{in:r||g,sx:{overflow:"hidden",boxSizing:"border-box"},children:[e.jsx(y,{ref:j,variant:"h5",align:"center",color:g?s.palette.red.main:s.palette.green.main,my:2,children:u}),e.jsx(B,{sx:{bgcolor:s.palette.mode==="light"?"#FAFAFA":"#1E1E1E"},textAlign:"justify",fontSize:16,children:b})]})]})})},bo={'code[class*="language-"]':{background:"hsl(230, 1%, 98%)",color:"hsl(230, 8%, 24%)",fontFamily:'"Fira Code", "Fira Mono", Menlo, Consolas, "DejaVu Sans Mono", monospace',direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"2",OTabSize:"2",tabSize:"2",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]':{background:"hsl(230, 1%, 98%)",color:"hsl(230, 8%, 24%)",fontFamily:'"Fira Code", "Fira Mono", Menlo, Consolas, "DejaVu Sans Mono", monospace',direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"2",OTabSize:"2",tabSize:"2",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",padding:"1em",margin:"0.5em 0",overflow:"auto",borderRadius:"0.3em"},'code[class*="language-"]::-moz-selection':{background:"hsl(230, 1%, 90%)",color:"inherit"},'code[class*="language-"] *::-moz-selection':{background:"hsl(230, 1%, 90%)",color:"inherit"},'pre[class*="language-"] *::-moz-selection':{background:"hsl(230, 1%, 90%)",color:"inherit"},'code[class*="language-"]::selection':{background:"hsl(230, 1%, 90%)",color:"inherit"},'code[class*="language-"] *::selection':{background:"hsl(230, 1%, 90%)",color:"inherit"},'pre[class*="language-"] *::selection':{background:"hsl(230, 1%, 90%)",color:"inherit"},':not(pre) > code[class*="language-"]':{padding:"0.2em 0.3em",borderRadius:"0.3em",whiteSpace:"normal"},comment:{color:"hsl(230, 4%, 64%)",fontStyle:"italic"},prolog:{color:"hsl(230, 4%, 64%)"},cdata:{color:"hsl(230, 4%, 64%)"},doctype:{color:"hsl(230, 8%, 24%)"},punctuation:{color:"hsl(230, 8%, 24%)"},entity:{color:"hsl(230, 8%, 24%)",cursor:"help"},"attr-name":{color:"hsl(35, 99%, 36%)"},"class-name":{color:"hsl(35, 99%, 36%)"},boolean:{color:"hsl(35, 99%, 36%)"},constant:{color:"hsl(35, 99%, 36%)"},number:{color:"hsl(35, 99%, 36%)"},atrule:{color:"hsl(35, 99%, 36%)"},keyword:{color:"hsl(301, 63%, 40%)"},property:{color:"hsl(5, 74%, 59%)"},tag:{color:"hsl(5, 74%, 59%)"},symbol:{color:"hsl(5, 74%, 59%)"},deleted:{color:"hsl(5, 74%, 59%)"},important:{color:"hsl(5, 74%, 59%)"},selector:{color:"hsl(119, 34%, 47%)"},string:{color:"hsl(119, 34%, 47%)"},char:{color:"hsl(119, 34%, 47%)"},builtin:{color:"hsl(119, 34%, 47%)"},inserted:{color:"hsl(119, 34%, 47%)"},regex:{color:"hsl(119, 34%, 47%)"},"attr-value":{color:"hsl(119, 34%, 47%)"},"attr-value > .token.punctuation":{color:"hsl(119, 34%, 47%)"},variable:{color:"hsl(221, 87%, 60%)"},operator:{color:"hsl(221, 87%, 60%)"},function:{color:"hsl(221, 87%, 60%)"},url:{color:"hsl(198, 99%, 37%)"},"attr-value > .token.punctuation.attr-equals":{color:"hsl(230, 8%, 24%)"},"special-attr > .token.attr-value > .token.value.css":{color:"hsl(230, 8%, 24%)"},".language-css .token.selector":{color:"hsl(5, 74%, 59%)"},".language-css .token.property":{color:"hsl(230, 8%, 24%)"},".language-css .token.function":{color:"hsl(198, 99%, 37%)"},".language-css .token.url > .token.function":{color:"hsl(198, 99%, 37%)"},".language-css .token.url > .token.string.url":{color:"hsl(119, 34%, 47%)"},".language-css .token.important":{color:"hsl(301, 63%, 40%)"},".language-css .token.atrule .token.rule":{color:"hsl(301, 63%, 40%)"},".language-javascript .token.operator":{color:"hsl(301, 63%, 40%)"},".language-javascript .token.template-string > .token.interpolation > .token.interpolation-punctuation.punctuation":{color:"hsl(344, 84%, 43%)"},".language-json .token.operator":{color:"hsl(230, 8%, 24%)"},".language-json .token.null.keyword":{color:"hsl(35, 99%, 36%)"},".language-markdown .token.url":{color:"hsl(230, 8%, 24%)"},".language-markdown .token.url > .token.operator":{color:"hsl(230, 8%, 24%)"},".language-markdown .token.url-reference.url > .token.string":{color:"hsl(230, 8%, 24%)"},".language-markdown .token.url > .token.content":{color:"hsl(221, 87%, 60%)"},".language-markdown .token.url > .token.url":{color:"hsl(198, 99%, 37%)"},".language-markdown .token.url-reference.url":{color:"hsl(198, 99%, 37%)"},".language-markdown .token.blockquote.punctuation":{color:"hsl(230, 4%, 64%)",fontStyle:"italic"},".language-markdown .token.hr.punctuation":{color:"hsl(230, 4%, 64%)",fontStyle:"italic"},".language-markdown .token.code-snippet":{color:"hsl(119, 34%, 47%)"},".language-markdown .token.bold .token.content":{color:"hsl(35, 99%, 36%)"},".language-markdown .token.italic .token.content":{color:"hsl(301, 63%, 40%)"},".language-markdown .token.strike .token.content":{color:"hsl(5, 74%, 59%)"},".language-markdown .token.strike .token.punctuation":{color:"hsl(5, 74%, 59%)"},".language-markdown .token.list.punctuation":{color:"hsl(5, 74%, 59%)"},".language-markdown .token.title.important > .token.punctuation":{color:"hsl(5, 74%, 59%)"},bold:{fontWeight:"bold"},italic:{fontStyle:"italic"},namespace:{Opacity:"0.8"},"token.tab:not(:empty):before":{color:"hsla(230, 8%, 24%, 0.2)"},"token.cr:before":{color:"hsla(230, 8%, 24%, 0.2)"},"token.lf:before":{color:"hsla(230, 8%, 24%, 0.2)"},"token.space:before":{color:"hsla(230, 8%, 24%, 0.2)"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item":{marginRight:"0.4em"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > button":{background:"hsl(230, 1%, 90%)",color:"hsl(230, 6%, 44%)",padding:"0.1em 0.4em",borderRadius:"0.3em"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > a":{background:"hsl(230, 1%, 90%)",color:"hsl(230, 6%, 44%)",padding:"0.1em 0.4em",borderRadius:"0.3em"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > span":{background:"hsl(230, 1%, 90%)",color:"hsl(230, 6%, 44%)",padding:"0.1em 0.4em",borderRadius:"0.3em"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:hover":{background:"hsl(230, 1%, 78%)",color:"hsl(230, 8%, 24%)"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:focus":{background:"hsl(230, 1%, 78%)",color:"hsl(230, 8%, 24%)"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:hover":{background:"hsl(230, 1%, 78%)",color:"hsl(230, 8%, 24%)"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:focus":{background:"hsl(230, 1%, 78%)",color:"hsl(230, 8%, 24%)"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:hover":{background:"hsl(230, 1%, 78%)",color:"hsl(230, 8%, 24%)"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:focus":{background:"hsl(230, 1%, 78%)",color:"hsl(230, 8%, 24%)"},".line-highlight.line-highlight":{background:"hsla(230, 8%, 24%, 0.05)"},".line-highlight.line-highlight:before":{background:"hsl(230, 1%, 90%)",color:"hsl(230, 8%, 24%)",padding:"0.1em 0.6em",borderRadius:"0.3em",boxShadow:"0 2px 0 0 rgba(0, 0, 0, 0.2)"},".line-highlight.line-highlight[data-end]:after":{background:"hsl(230, 1%, 90%)",color:"hsl(230, 8%, 24%)",padding:"0.1em 0.6em",borderRadius:"0.3em",boxShadow:"0 2px 0 0 rgba(0, 0, 0, 0.2)"},"pre[id].linkable-line-numbers.linkable-line-numbers span.line-numbers-rows > span:hover:before":{backgroundColor:"hsla(230, 8%, 24%, 0.05)"},".line-numbers.line-numbers .line-numbers-rows":{borderRightColor:"hsla(230, 8%, 24%, 0.2)"},".command-line .command-line-prompt":{borderRightColor:"hsla(230, 8%, 24%, 0.2)"},".line-numbers .line-numbers-rows > span:before":{color:"hsl(230, 1%, 62%)"},".command-line .command-line-prompt > span:before":{color:"hsl(230, 1%, 62%)"},".rainbow-braces .token.token.punctuation.brace-level-1":{color:"hsl(5, 74%, 59%)"},".rainbow-braces .token.token.punctuation.brace-level-5":{color:"hsl(5, 74%, 59%)"},".rainbow-braces .token.token.punctuation.brace-level-9":{color:"hsl(5, 74%, 59%)"},".rainbow-braces .token.token.punctuation.brace-level-2":{color:"hsl(119, 34%, 47%)"},".rainbow-braces .token.token.punctuation.brace-level-6":{color:"hsl(119, 34%, 47%)"},".rainbow-braces .token.token.punctuation.brace-level-10":{color:"hsl(119, 34%, 47%)"},".rainbow-braces .token.token.punctuation.brace-level-3":{color:"hsl(221, 87%, 60%)"},".rainbow-braces .token.token.punctuation.brace-level-7":{color:"hsl(221, 87%, 60%)"},".rainbow-braces .token.token.punctuation.brace-level-11":{color:"hsl(221, 87%, 60%)"},".rainbow-braces .token.token.punctuation.brace-level-4":{color:"hsl(301, 63%, 40%)"},".rainbow-braces .token.token.punctuation.brace-level-8":{color:"hsl(301, 63%, 40%)"},".rainbow-braces .token.token.punctuation.brace-level-12":{color:"hsl(301, 63%, 40%)"},"pre.diff-highlight > code .token.token.deleted:not(.prefix)":{backgroundColor:"hsla(353, 100%, 66%, 0.15)"},"pre > code.diff-highlight .token.token.deleted:not(.prefix)":{backgroundColor:"hsla(353, 100%, 66%, 0.15)"},"pre.diff-highlight > code .token.token.deleted:not(.prefix)::-moz-selection":{backgroundColor:"hsla(353, 95%, 66%, 0.25)"},"pre.diff-highlight > code .token.token.deleted:not(.prefix) *::-moz-selection":{backgroundColor:"hsla(353, 95%, 66%, 0.25)"},"pre > code.diff-highlight .token.token.deleted:not(.prefix)::-moz-selection":{backgroundColor:"hsla(353, 95%, 66%, 0.25)"},"pre > code.diff-highlight .token.token.deleted:not(.prefix) *::-moz-selection":{backgroundColor:"hsla(353, 95%, 66%, 0.25)"},"pre.diff-highlight > code .token.token.deleted:not(.prefix)::selection":{backgroundColor:"hsla(353, 95%, 66%, 0.25)"},"pre.diff-highlight > code .token.token.deleted:not(.prefix) *::selection":{backgroundColor:"hsla(353, 95%, 66%, 0.25)"},"pre > code.diff-highlight .token.token.deleted:not(.prefix)::selection":{backgroundColor:"hsla(353, 95%, 66%, 0.25)"},"pre > code.diff-highlight .token.token.deleted:not(.prefix) *::selection":{backgroundColor:"hsla(353, 95%, 66%, 0.25)"},"pre.diff-highlight > code .token.token.inserted:not(.prefix)":{backgroundColor:"hsla(137, 100%, 55%, 0.15)"},"pre > code.diff-highlight .token.token.inserted:not(.prefix)":{backgroundColor:"hsla(137, 100%, 55%, 0.15)"},"pre.diff-highlight > code .token.token.inserted:not(.prefix)::-moz-selection":{backgroundColor:"hsla(135, 73%, 55%, 0.25)"},"pre.diff-highlight > code .token.token.inserted:not(.prefix) *::-moz-selection":{backgroundColor:"hsla(135, 73%, 55%, 0.25)"},"pre > code.diff-highlight .token.token.inserted:not(.prefix)::-moz-selection":{backgroundColor:"hsla(135, 73%, 55%, 0.25)"},"pre > code.diff-highlight .token.token.inserted:not(.prefix) *::-moz-selection":{backgroundColor:"hsla(135, 73%, 55%, 0.25)"},"pre.diff-highlight > code .token.token.inserted:not(.prefix)::selection":{backgroundColor:"hsla(135, 73%, 55%, 0.25)"},"pre.diff-highlight > code .token.token.inserted:not(.prefix) *::selection":{backgroundColor:"hsla(135, 73%, 55%, 0.25)"},"pre > code.diff-highlight .token.token.inserted:not(.prefix)::selection":{backgroundColor:"hsla(135, 73%, 55%, 0.25)"},"pre > code.diff-highlight .token.token.inserted:not(.prefix) *::selection":{backgroundColor:"hsla(135, 73%, 55%, 0.25)"},".prism-previewer.prism-previewer:before":{borderColor:"hsl(0, 0, 95%)"},".prism-previewer-gradient.prism-previewer-gradient div":{borderColor:"hsl(0, 0, 95%)",borderRadius:"0.3em"},".prism-previewer-color.prism-previewer-color:before":{borderRadius:"0.3em"},".prism-previewer-easing.prism-previewer-easing:before":{borderRadius:"0.3em"},".prism-previewer.prism-previewer:after":{borderTopColor:"hsl(0, 0, 95%)"},".prism-previewer-flipped.prism-previewer-flipped.after":{borderBottomColor:"hsl(0, 0, 95%)"},".prism-previewer-angle.prism-previewer-angle:before":{background:"hsl(0, 0%, 100%)"},".prism-previewer-time.prism-previewer-time:before":{background:"hsl(0, 0%, 100%)"},".prism-previewer-easing.prism-previewer-easing":{background:"hsl(0, 0%, 100%)"},".prism-previewer-angle.prism-previewer-angle circle":{stroke:"hsl(230, 8%, 24%)",strokeOpacity:"1"},".prism-previewer-time.prism-previewer-time circle":{stroke:"hsl(230, 8%, 24%)",strokeOpacity:"1"},".prism-previewer-easing.prism-previewer-easing circle":{stroke:"hsl(230, 8%, 24%)",fill:"transparent"},".prism-previewer-easing.prism-previewer-easing path":{stroke:"hsl(230, 8%, 24%)"},".prism-previewer-easing.prism-previewer-easing line":{stroke:"hsl(230, 8%, 24%)"}},yo={'pre[class*="language-"]':{color:"#d4d4d4",fontSize:"13px",textShadow:"none",fontFamily:'Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace',direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",padding:"1em",margin:".5em 0",overflow:"auto",background:"#1e1e1e"},'code[class*="language-"]':{color:"#d4d4d4",fontSize:"13px",textShadow:"none",fontFamily:'Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace',direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]::selection':{textShadow:"none",background:"#264F78"},'code[class*="language-"]::selection':{textShadow:"none",background:"#264F78"},'pre[class*="language-"] *::selection':{textShadow:"none",background:"#264F78"},'code[class*="language-"] *::selection':{textShadow:"none",background:"#264F78"},':not(pre) > code[class*="language-"]':{padding:".1em .3em",borderRadius:".3em",color:"#db4c69",background:"#1e1e1e"},".namespace":{Opacity:".7"},"doctype.doctype-tag":{color:"#569CD6"},"doctype.name":{color:"#9cdcfe"},comment:{color:"#6a9955"},prolog:{color:"#6a9955"},punctuation:{color:"#d4d4d4"},".language-html .language-css .token.punctuation":{color:"#d4d4d4"},".language-html .language-javascript .token.punctuation":{color:"#d4d4d4"},property:{color:"#9cdcfe"},tag:{color:"#569cd6"},boolean:{color:"#569cd6"},number:{color:"#b5cea8"},constant:{color:"#9cdcfe"},symbol:{color:"#b5cea8"},inserted:{color:"#b5cea8"},unit:{color:"#b5cea8"},selector:{color:"#d7ba7d"},"attr-name":{color:"#9cdcfe"},string:{color:"#ce9178"},char:{color:"#ce9178"},builtin:{color:"#ce9178"},deleted:{color:"#ce9178"},".language-css .token.string.url":{textDecoration:"underline"},operator:{color:"#d4d4d4"},entity:{color:"#569cd6"},"operator.arrow":{color:"#569CD6"},atrule:{color:"#ce9178"},"atrule.rule":{color:"#c586c0"},"atrule.url":{color:"#9cdcfe"},"atrule.url.function":{color:"#dcdcaa"},"atrule.url.punctuation":{color:"#d4d4d4"},keyword:{color:"#569CD6"},"keyword.module":{color:"#c586c0"},"keyword.control-flow":{color:"#c586c0"},function:{color:"#dcdcaa"},"function.maybe-class-name":{color:"#dcdcaa"},regex:{color:"#d16969"},important:{color:"#569cd6"},italic:{fontStyle:"italic"},"class-name":{color:"#4ec9b0"},"maybe-class-name":{color:"#4ec9b0"},console:{color:"#9cdcfe"},parameter:{color:"#9cdcfe"},interpolation:{color:"#9cdcfe"},"punctuation.interpolation-punctuation":{color:"#569cd6"},variable:{color:"#9cdcfe"},"imports.maybe-class-name":{color:"#9cdcfe"},"exports.maybe-class-name":{color:"#9cdcfe"},escape:{color:"#d7ba7d"},"tag.punctuation":{color:"#808080"},cdata:{color:"#808080"},"attr-value":{color:"#ce9178"},"attr-value.punctuation":{color:"#ce9178"},"attr-value.punctuation.attr-equals":{color:"#d4d4d4"},namespace:{color:"#4ec9b0"},'pre[class*="language-javascript"]':{color:"#9cdcfe"},'code[class*="language-javascript"]':{color:"#9cdcfe"},'pre[class*="language-jsx"]':{color:"#9cdcfe"},'code[class*="language-jsx"]':{color:"#9cdcfe"},'pre[class*="language-typescript"]':{color:"#9cdcfe"},'code[class*="language-typescript"]':{color:"#9cdcfe"},'pre[class*="language-tsx"]':{color:"#9cdcfe"},'code[class*="language-tsx"]':{color:"#9cdcfe"},'pre[class*="language-css"]':{color:"#ce9178"},'code[class*="language-css"]':{color:"#ce9178"},'pre[class*="language-html"]':{color:"#d4d4d4"},'code[class*="language-html"]':{color:"#d4d4d4"},".language-regex .token.anchor":{color:"#dcdcaa"},".language-html .token.punctuation":{color:"#808080"},'pre[class*="language-"] > code[class*="language-"]':{position:"relative",zIndex:"1"},".line-highlight.line-highlight":{background:"#f7ebc6",boxShadow:"inset 5px 0 0 #f7d87c",zIndex:"0"}},xo=({snippet:o,title:n,...s})=>{const r=D().palette.mode==="light",l=e.jsx(xe,{...s,style:r?bo:yo,children:o});return n!=null?e.jsx(ie,{title:`💡 Code Snippet - ${n}`,children:l}):l};var L={},ko=A;Object.defineProperty(L,"__esModule",{value:!0});var le=L.default=void 0,wo=ko(R()),vo=e,jo=(0,wo.default)((0,vo.jsx)("path",{d:"M11 17c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1zm0-14v4h2V5.08c3.39.49 6 3.39 6 6.92 0 3.87-3.13 7-7 7s-7-3.13-7-7c0-1.68.59-3.22 1.58-4.42L12 13l1.41-1.41-6.8-6.8v.02C4.42 6.45 3 9.05 3 12c0 4.97 4.02 9 9 9 4.97 0 9-4.03 9-9s-4.03-9-9-9h-1zm7 9c0-.55-.45-1-1-1s-1 .45-1 1 .45 1 1 1 1-.45 1-1zM6 12c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1z"}),"AvTimer");le=L.default=jo;var U={},Co=A;Object.defineProperty(U,"__esModule",{value:!0});var ce=U.default=void 0,So=Co(R()),Io=e,Fo=(0,So.default)((0,Io.jsx)("path",{d:"M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"}),"CalendarToday");ce=U.default=Fo;var J={},Ro=A;Object.defineProperty(J,"__esModule",{value:!0});var de=J.default=void 0,Ao=Ro(R()),X=e,To=(0,Ao.default)([(0,X.jsx)("path",{d:"M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z"},"0"),(0,X.jsx)("path",{d:"M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-5.99 13c-.59 0-1.05-.47-1.05-1.05 0-.59.47-1.04 1.05-1.04.59 0 1.04.45 1.04 1.04-.01.58-.45 1.05-1.04 1.05zm2.5-6.17c-.63.93-1.23 1.21-1.56 1.81-.13.24-.18.4-.18 1.18h-1.52c0-.41-.06-1.08.26-1.65.41-.73 1.18-1.16 1.63-1.8.48-.68.21-1.94-1.14-1.94-.88 0-1.32.67-1.5 1.23l-1.37-.57C11.51 5.96 12.52 5 13.99 5c1.23 0 2.08.56 2.51 1.26.37.61.58 1.73.01 2.57z"},"1")],"Quiz");de=J.default=To;const Po=({created:o,estimatedReadingTime:n,quizIncluded:s})=>{const i=D(),r=re(l=>l.breakpoints.up("sm"));return e.jsxs(S,{sx:{display:"flex",width:"100%"},children:[e.jsx(M,{title:"Creation Date",placement:r?"left":"top-start",children:e.jsx(z,{sx:{flex:1,mx:{xs:0,sm:.5}},icon:e.jsx(ce,{}),label:ee(o,!r),variant:"outlined"})}),e.jsx(M,{title:"Estimated Time to Read",placement:r?"left":"top-start",children:e.jsx(z,{sx:{flex:1,mx:{xs:0,sm:.5}},icon:e.jsx(le,{}),label:`~${n} ${r?"minutes":"min"}`,variant:"outlined"})}),e.jsx(M,{title:s?"This blog contains quizzes":"This blog does not contain quizzes",placement:r?"left":"top-start",children:e.jsx(z,{sx:{flex:1,mx:{xs:0,sm:.5},color:s?"green.main":"red.main"},icon:e.jsx(de,{style:{color:s?i.palette.green.main:i.palette.red.main}}),label:r?`Quiz ${s?"Included":"Not Included"}`:`${s?"":"No"} Quiz`,variant:"outlined"})})]})},Mo=()=>{const o=Number(ke().blogID),n=re(r=>r.breakpoints.up("sm")),s=D().palette.mode==="light",i=_.find(r=>r.id===o);return i==null?e.jsx(Fe,{}):e.jsxs(t.Fragment,{children:[e.jsx(Ie,{destination:"/blog"}),e.jsx(oe,{title:i.title,mt:0,subtitle:i.subtitle,children:e.jsx(Po,{created:i==null?void 0:i.created,estimatedReadingTime:i==null?void 0:i.estimatedReadingTime,quizIncluded:i==null?void 0:i.quizIncluded})}),e.jsxs(S,{mx:"auto",p:2,sx:{maxWidth:"750px",display:"flex",flexDirection:"column",bgcolor:s?"rgba(255,255,255,0.4)":"rgba(0,0,0,0.4)",borderRadius:"15px"},children:[e.jsx(Re,{src:i.thumbnail,sx:{width:"90%",maxWidth:"500px",borderRadius:"15px",border:"2px solid black",mx:"auto",bgcolor:"rgb(200,200,200)"}}),(i==null?void 0:i.elements)&&i.elements.map((r,l)=>{switch(r.type){case"h6":case"h5":case"h4":case"h3":case"h2":case"h1":return e.jsx(B,{textAlign:n?"left":"center",fontWeight:"bold",sx:{my:r.type==="h6"?2:4},variant:r.type,children:`${i.emoji} ${r.children}`},`page-item-${r.type}-${l}`);case"code":return e.jsx(xo,{language:r.language,snippet:r.children,title:r.title},`page-item-${r.type}-${l}`);case"quiz":return e.jsx(fo,{question:r.question,options:r.options},`page-item-${r.type}-${l}`);case"feedback":return e.jsxs(t.Fragment,{children:[e.jsx(S,{component:"hr",width:"100%",mt:4}),e.jsx(B,{textAlign:n?"left":"center",fontWeight:"bold",sx:{mt:6,mb:1},variant:"h4",children:`${i.emoji} Feedback`}),e.jsxs(y,{textAlign:"justify",fontSize:16,my:2,children:["Find something wrong with one of my blog posts? Want to provide general feedback? Let me know ",e.jsx(Me,{target:"_blank",href:"https://forms.gle/bEsuMMEHmtViWxmY7",children:"here"}),"!"]})]},`page-item-${r.type}-${l}`);case"signoff":return e.jsxs(y,{align:"right",mt:3,children:["- ",e.jsx(S,{component:"span",fontWeight:"bold",color:"blue.main",children:"Gordon Wang"}),e.jsx("br",{}),ee(i==null?void 0:i.created)]},`page-item-${r.type}-${l}`);default:return e.jsx(y,{textAlign:"justify",fontSize:16,my:2,children:r.children},`page-item-${r.type}-${l}`)}})]})]})},$o=()=>e.jsxs(we,{children:[e.jsx(Z,{path:"",element:e.jsx(so,{})}),e.jsx(Z,{path:"/:blogID",element:e.jsx(Mo,{})})]}),Yo=Object.freeze(Object.defineProperty({__proto__:null,default:$o},Symbol.toStringTag,{value:"Module"}));export{Po as B,Yo as i};
