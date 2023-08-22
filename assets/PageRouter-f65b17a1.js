import{c as T,r as v,i as y,a as d,j as t,s as D,I as j,b as m,B as c,d as f,u as x,e as h,k as B,f as w,R as p,_ as u,g as W,h as S,P as A,l as k,m as l}from"./index-f2960486.js";import{B as P,T as O,C as z}from"./index-1c607e0a.js";const C=T(),G=C;var g={},H=y;Object.defineProperty(g,"__esModule",{value:!0});var R=g.default=void 0;V(d);var q=H(v()),L=t;function $(e){if(typeof WeakMap!="function")return null;var a=new WeakMap,o=new WeakMap;return($=function(i){return i?o:a})(e)}function V(e,a){if(!a&&e&&e.__esModule)return e;if(e===null||typeof e!="object"&&typeof e!="function")return{default:e};var o=$(a);if(o&&o.has(e))return o.get(e);var i={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in e)if(r!=="default"&&Object.prototype.hasOwnProperty.call(e,r)){var s=n?Object.getOwnPropertyDescriptor(e,r):null;s&&(s.get||s.set)?Object.defineProperty(i,r,s):i[r]=e[r]}return i.default=e,o&&o.set(e,i),i}var N=(0,q.default)((0,L.jsx)("path",{d:"M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"}),"LinkedIn");R=g.default=N;var _={},U=y;Object.defineProperty(_,"__esModule",{value:!0});var E=_.default=void 0;K(d);var F=U(v()),J=t;function I(e){if(typeof WeakMap!="function")return null;var a=new WeakMap,o=new WeakMap;return(I=function(i){return i?o:a})(e)}function K(e,a){if(!a&&e&&e.__esModule)return e;if(e===null||typeof e!="object"&&typeof e!="function")return{default:e};var o=I(a);if(o&&o.has(e))return o.get(e);var i={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in e)if(r!=="default"&&Object.prototype.hasOwnProperty.call(e,r)){var s=n?Object.getOwnPropertyDescriptor(e,r):null;s&&(s.get||s.set)?Object.defineProperty(i,r,s):i[r]=e[r]}return i.default=e,o&&o.set(e,i),i}var Q=(0,F.default)((0,J.jsx)("path",{d:"M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.28.73-.55v-1.84c-3.03.64-3.67-1.46-3.67-1.46-.55-1.29-1.28-1.65-1.28-1.65-.92-.65.1-.65.1-.65 1.1 0 1.73 1.1 1.73 1.1.92 1.65 2.57 1.2 3.21.92a2 2 0 01.64-1.47c-2.47-.27-5.04-1.19-5.04-5.5 0-1.1.46-2.1 1.2-2.84a3.76 3.76 0 010-2.93s.91-.28 3.11 1.1c1.8-.49 3.7-.49 5.5 0 2.1-1.38 3.02-1.1 3.02-1.1a3.76 3.76 0 010 2.93c.83.74 1.2 1.74 1.2 2.94 0 4.21-2.57 5.13-5.04 5.4.45.37.82.92.82 2.02v3.03c0 .27.1.64.73.55A11 11 0 0012 1.27"}),"GitHub");E=_.default=Q;const X=D(j)(({theme:e})=>({border:`1px solid ${e.palette.contrastColor.main}`})),Y=()=>{const e=m(c),a=[{href:f.GITHUB,title:"Go to my GitHub",icon:t.jsx(E,{}),style:x({from:{y:50},to:{y:0},delay:1750,config:{duration:1e3,easing:h.easeOutBounce}})},{href:f.LINKED_IN,title:"Go to my LinkedIn",icon:t.jsx(R,{}),style:x({from:{y:50},to:{y:0},delay:1500,config:{duration:1e3,easing:h.easeOutBounce}})}];return t.jsx(c,{sx:{position:"fixed",right:"10px",bottom:"0px",display:"flex",overflow:"hidden",gap:.5},children:a.map((o,i)=>t.jsx(e,{style:o.style,sx:{mb:1},children:t.jsx(P,{title:o.title,arrow:!0,children:t.jsx(X,{onClick:()=>{window.open(o.href,"_blank")},children:o.icon})})},`link-icon-${i}`))})},Z="ghwang28",ee="1.3.3",te="https://GHWang28.github.io",ae="module",oe={dev:"vite",start:"vite",predeploy:"npm run build",deploy:"gh-pages -b main -d dist",build:"tsc && vite build",lint:"eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",preview:"vite preview"},ie={"@emotion/react":"^11.11.1","@emotion/styled":"^11.11.0","@mui/icons-material":"^5.14.3","@mui/lab":"^5.0.0-alpha.140","@mui/material":"^5.14.5","@react-spring/web":"^9.7.3","@reduxjs/toolkit":"^1.9.5","color-convert":"^2.0.1","get-video-id":"^3.6.5",million:"^2.6.0-beta.0",moment:"^2.29.4",overlayscrollbars:"^2.2.1","overlayscrollbars-react":"^0.5.1",react:"^18.2.0","react-dom":"^18.2.0","react-intersection-observer":"^9.5.2","react-redux":"^8.1.2","react-router":"^6.15.0","react-router-dom":"^6.15.0","react-swipeable":"^7.0.1","react-syntax-highlighter":"^15.5.0","react-wavify":"^1.8.3","use-sound":"^4.0.1",uuid:"^9.0.0"},re={"@types/color-convert":"^2.0.0","@types/node":"^20.5.0","@types/react":"^18.2.15","@types/react-dom":"^18.2.7","@types/react-syntax-highlighter":"^15.5.7","@types/uuid":"^9.0.2","@typescript-eslint/eslint-plugin":"^6.0.0","@typescript-eslint/parser":"^6.0.0","@vitejs/plugin-react-swc":"^3.3.2",eslint:"^8.45.0","eslint-plugin-react-hooks":"^4.6.0","eslint-plugin-react-refresh":"^0.4.3","gh-pages":"^6.0.0",typescript:"^5.0.2",vite:"^4.4.5"},se={name:Z,private:!0,version:ee,homepage:te,type:ae,scripts:oe,dependencies:ie,devDependencies:re};var b={},ne=y;Object.defineProperty(b,"__esModule",{value:!0});var M=b.default=void 0,le=ne(v()),ce=t,pe=(0,le.default)((0,ce.jsx)("path",{d:"M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"}),"Code");M=b.default=pe;const ue=B`
  from {
    left: 100%;
  }
  to {
    left: -100%;
  }
`,de=({width:e,children:a})=>{const o=w().palette.mode;return t.jsx(G,{py:1,sx:{position:"relative",overflow:"hidden",width:e,height:"25px",bgcolor:"black",border:`1px solid ${o==="light"?"rgb(79,89,91)":"whitesmoke"}`,borderRadius:"5px"},children:t.jsx(O,{fontWeight:"bold",sx:{position:"absolute",animation:`${ue} linear 12s infinite`,width:"fit-content"},children:a})})},fe=()=>{const[e,a]=d.useState(!1),o=w().palette.mode,i=m(O),n=x({from:{y:100},to:{y:0},delay:2250,config:{duration:1e3,easing:h.easeOutBounce}});return t.jsxs(c,{sx:{overflow:"hidden",position:"fixed",left:"10px",bottom:"0px",color:o==="light"?"rgb(79,89,91)":"whitesmoke"},onMouseEnter:()=>{a(!0)},onMouseLeave:()=>{a(!1)},children:[t.jsx(i,{style:n,fontSize:24,fontWeight:"bold",sx:{opacity:e?"1.0":"0.4",transition:"opacity 0.3s ease-in-out",userSelect:"none"},children:`v${se.version}`}),t.jsx(z,{in:e,orientation:"vertical",children:t.jsxs(c,{sx:{display:"flex",whiteSpace:"noWrap",fontSize:24,alignItems:"center",mb:1},children:[t.jsx(P,{title:"Go to this Website's Repository",arrow:!0,children:t.jsx(j,{sx:{border:`1px solid ${o==="light"?"rgb(79,89,91)":"whitesmoke"}`,mr:1},href:"https://github.com/GHWang28/GHWang28.github.io",target:"_blank",children:t.jsx(M,{})})}),t.jsx(de,{width:"40vw",children:`(${f.LATEST_UPDATE}) ${f.LATEST_COMMIT}`})]})})]})},xe=p.lazy(()=>u(()=>import("./index-6c0504e4.js"),["assets/index-6c0504e4.js","assets/index-f2960486.js","assets/index-a0c3409e.css","assets/index-b00461e8.js","assets/index-36646ef7.js","assets/index-1c607e0a.js","assets/Grid-eb17d48f.js","assets/useMediaQuery-86b70a3c.js","assets/School-0c6eee4f.js","assets/Link-f9f1dd9c.js","assets/index-f5f7414f.js","assets/v4-a960c1f4.js","assets/index-035287bd.js","assets/index-2d85ba0b.js","assets/SparklezText-c5d81087.js","assets/Divider-960d61ec.js","assets/dividerClasses-57366f64.js"])),he=p.lazy(()=>u(()=>import("./index-44e91eea.js").then(e=>e.i),["assets/index-44e91eea.js","assets/index-f2960486.js","assets/index-a0c3409e.css","assets/index-13cbb681.js","assets/useMediaQuery-86b70a3c.js","assets/index-035287bd.js","assets/SparklezText-c5d81087.js","assets/index-f5f7414f.js","assets/v4-a960c1f4.js","assets/index-2d85ba0b.js","assets/index-1c607e0a.js","assets/index-36646ef7.js","assets/index-b5c55ebd.js","assets/index-fce72bff.js","assets/use-sound.esm-95f770b7.js","assets/index-b00461e8.js","assets/index-e2fea836.js","assets/Visibility-9ae39505.js","assets/Grid-eb17d48f.js","assets/Button-f2a6ffa6.js","assets/Link-f9f1dd9c.js"])),ve=p.lazy(()=>u(()=>import("./index-0235dc83.js"),["assets/index-0235dc83.js","assets/index-f2960486.js","assets/index-a0c3409e.css"])),ye=p.lazy(()=>u(()=>import("./index-524b742d.js"),["assets/index-524b742d.js","assets/index-f2960486.js","assets/index-a0c3409e.css","assets/index-f5f7414f.js","assets/v4-a960c1f4.js","assets/index-1c607e0a.js"])),me=p.lazy(()=>u(()=>import("./index-fce72bff.js"),["assets/index-fce72bff.js","assets/index-f2960486.js","assets/index-a0c3409e.css","assets/index-1c607e0a.js","assets/use-sound.esm-95f770b7.js"])),ge=p.lazy(()=>u(()=>import("./index-8ba1ffa7.js"),["assets/index-8ba1ffa7.js","assets/index-f2960486.js","assets/index-a0c3409e.css","assets/index-2d85ba0b.js","assets/index-f5f7414f.js","assets/v4-a960c1f4.js","assets/index-1c607e0a.js","assets/index-b5c55ebd.js","assets/useMediaQuery-86b70a3c.js","assets/Divider-960d61ec.js","assets/dividerClasses-57366f64.js"])),_e=()=>{var i;const e=W(),a=S(e,be(e.pathname,(i=e==null?void 0:e.state)==null?void 0:i.prevLocation)),o=m(c);return t.jsxs(d.Suspense,{fallback:t.jsx(A,{}),children:[a(({position:n,...r},s)=>t.jsx(o,{style:{...r,position:n},sx:{width:"100vw",left:"0px",top:"0px",overflow:"clip"},children:t.jsx(c,{pb:e.pathname.includes("/projects/showcase")||e.pathname==="/"?0:5,px:{xs:0,sm:6,md:15,lg:22},pt:{xs:12,sm:8},children:t.jsxs(k,{location:s,children:[t.jsx(l,{path:"*",element:t.jsx(me,{})}),t.jsx(l,{path:"/",element:t.jsx(ye,{})}),t.jsx(l,{path:"/projects/*",element:t.jsx(ve,{})}),t.jsx(l,{path:"/blog/*",element:t.jsx(he,{})}),t.jsx(l,{path:"/about",element:t.jsx(xe,{})}),t.jsx(l,{path:"/about/skills",element:t.jsx(ge,{})})]})})})),e.pathname==="/"&&t.jsxs(d.Fragment,{children:[t.jsx(fe,{}),t.jsx(Y,{})]})]})},be=(e,a)=>e==="/"&&["/projects","/about","/blog"].includes(a)||e==="/projects"&&["/about","/blog"].includes(a)||e==="/blog"&&a==="/about"?{from:{opacity:0,x:"-25%",y:"0px",position:"absolute"},enter:{opacity:1,x:"0%",y:"0px",position:"absolute"},leave:{opacity:0,x:"12.5%",y:"0px",position:"static"}}:e==="/about"&&["/projects","/","/blog"].includes(a)||e==="/projects"&&a==="/"||e==="/blog"&&["/","/projects"].includes(a)?{from:{opacity:0,x:"25%",y:"0px",position:"static"},enter:{opacity:1,x:"0%",y:"0px",position:"static"},leave:{opacity:0,x:"-12.5%",y:"0px",position:"absolute"}}:a&&a.startsWith("/projects/")?{from:{opacity:0,x:"0%",y:"200px",position:"absolute"},enter:{opacity:1,x:"0%",y:"0px",position:"absolute"},leave:{opacity:0,x:"0%",y:"-100px",position:"static"}}:{from:{opacity:0,x:"0%",y:"-200px",position:"static"},enter:{opacity:1,x:"0%",y:"0px",position:"static"},leave:{opacity:0,x:"0%",y:"100px",position:"absolute"}},Pe=Object.freeze(Object.defineProperty({__proto__:null,default:_e},Symbol.toStringTag,{value:"Module"}));export{Pe as P,E as a,M as b,R as d};
