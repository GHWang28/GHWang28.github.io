import{a5 as t,k as p,a as l,j as o,B as k}from"./index-f2960486.js";import{v as x}from"./v4-a960c1f4.js";const h=(r="hsl(50deg, 100%, 50%)",s=t(25,75))=>({id:x(),timestamp:Date.now(),color:r,size:s,style:{top:`${t(0,100)}%`,left:`${t(0,100)}%`,zIndex:2}}),g=p`
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`,u=p`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-135deg);
  }
`,z=p`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(135deg);
  }
`,S=({color:r,size:s,top:a,left:n,zIndex:i})=>{const[e,c]=l.useState(!1);return l.useEffect(()=>{c(!!t(0,1))},[]),o.jsx(k,{component:"span",sx:{animation:`${g} 0.6s ease-in-out forwards`,"& svg":{animation:`${e?z:u} 0.6s linear forwards`}},style:{position:"absolute",pointerEvents:"none",top:a,left:n,zIndex:i,translate:"-50% -50%"},children:o.jsx("svg",{width:s,height:s,viewBox:"0 0 16 16",fill:"none",children:o.jsx("path",{stroke:"white",strokeWidth:"1px",d:"M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z",fill:r})})})},m=["hsl(50deg, 100%, 50%)","#EE7752","#E73C7E","#23A6D5","#23D5AB","rgb(150, 246, 246)"],j=({children:r,frequency:s=1,sizeRange:a=[5,15]})=>{const[n,i]=l.useState([]);return l.useEffect(()=>{const e=setTimeout(()=>{const c=Date.now(),f=n.filter(d=>c-d.timestamp<=1e3);i([...f,h(m[t(0,m.length-1)],t(a[0],a[1]))])},t(5,Math.max(2e3/s,10)));return()=>clearTimeout(e)}),o.jsxs("span",{style:{position:"relative",display:"inline-block"},children:[n.map(e=>o.jsx(S,{color:e.color,size:e.size,...e.style},`sparklez-${e.id}`)),o.jsx("span",{style:{position:"relative",zIndex:1,fontWeight:"bold"},children:r})]})};export{j as S};
