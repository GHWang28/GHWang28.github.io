import{j as e,t as n,T as g,y as j,r as x,z as w,C}from"./index-841481fb.js";import{u as v,T as $,k}from"./PageRouter-7805c93a.js";import{C as T,u as I,B as m,a as S}from"./Visibility-aa3a3572.js";import{T as B}from"./ProjectHub-c6175300.js";import"./School-768f81e7.js";import"./index-70d0fc7a.js";const M=({children:t})=>e.jsx(n,{sx:{display:"flex",flexWrap:"wrap",justifyContent:"left",width:"100%",gap:"3px",alignItems:"center",minHeight:"32px",overflowY:"hidden",m:"5px 0px",rowGap:"8px"},children:t.length===0?e.jsx(g,{fontSize:18,sx:{width:"100%",opacity:"0.7"},align:"center",children:"Empty"}):t}),y=({bgColor:t,speed:o,yPos:s,direction:i,inView:l})=>{const p=j`
    0% {
      translate: 0px 0px
    }
    100% {
      translate: 0px ${i==="up"?"-":""}240px
    }
  `,c=j`
    0% {
      transform: translateX(15px)
    }
    50% {
      transform: translateX(-15px)
    }
    100% {
      transform: translateX(15px)
    }
  `,r=`
    radial-gradient(98.41px at calc(100% - 138.00px) 50%,#000 99%,#0000 101%) 0 calc(50% - 120px)/100% 240px,
    radial-gradient(98.41px at calc(100% + 78.00px) 50%,#0000 99%,#000 101%) calc(100% - 60px) 50%/100% 240px repeat-y
  `;return e.jsx(n,{sx:{width:"200%",height:"calc(100% + 240px)",position:"absolute",top:i==="up"?"0px":"-240px",left:s,translate:l?"-50%":"15%",transition:"translate 2.0s ease-out",userSelect:"none",zIndex:-1},children:e.jsx(n,{sx:{width:"100%",height:"100%",animation:`${p} ${o}s linear infinite, ${c} ${o/2}s ease-in-out -${i==="up"?o/8:0}s infinite`,backgroundImage:`linear-gradient(90deg, ${t} 65%, rgba(255,255,255,0) 150%)`,mask:r,WebkitMask:r}})})},E=({imgs:t,onLoad:o})=>{const[s,i]=x.useState(0),[l,p]=x.useState(0);return x.useEffect(()=>{if(t.length<=1)return;const c=setTimeout(()=>{i((s+1)%t.length)},8e3);return()=>{clearTimeout(c)}},[s,t.length]),x.useEffect(()=>{l<t.length||o()},[l,t,o]),e.jsx(x.Fragment,{children:t.map((c,r)=>e.jsx(n,{component:"img",alt:`image-background-${r}`,title:`Background Image #${r}`,src:c,onLoad:()=>{p(h=>h+1)},sx:{position:"absolute",top:"0px",right:"0px",width:"100%",height:"100%",opacity:s===r?"1.0":"0.0",transition:"opacity 0.5s ease-in-out",objectFit:"cover",zIndex:-2}},`card-bg-${r}`))})},W=({src:t,onCanPlayThrough:o})=>e.jsx(n,{component:"video",muted:!0,loop:!0,autoPlay:!0,onCanPlayThrough:o,sx:{position:"absolute",top:"0px",right:"0px",width:"100%",height:"100%",transition:"opacity 0.5s ease-in-out",objectFit:"cover",zIndex:-2},children:e.jsx("source",{src:t,type:"video/webm"})}),z=({inView:t,odd:o,imgs:s})=>{const i=w(),l=i.palette.mode==="light",[p,c]=x.useState(!1),r=()=>{c(!0)};return x.useEffect(()=>{t||c(!1)},[t]),t?e.jsxs(x.Fragment,{children:[e.jsx(y,{bgColor:l?"white":i.palette.gray.main,speed:7,yPos:"-37.5%",direction:o?"up":"down",inView:p}),e.jsx(y,{bgColor:l?"gray":"rgba(20,20,20,0.6)",speed:7,yPos:"-67%",direction:o?"down":"up",inView:p}),s[0].endsWith(".webm")||s[0].endsWith(".mp4")?e.jsx(W,{src:s[0],onCanPlayThrough:r}):e.jsx(E,{imgs:s,onLoad:r}),!p&&e.jsx(n,{sx:{color:"contrastColor.main",position:"absolute",right:"15px",top:"15px"},children:e.jsx(C,{color:"inherit"})})]}):null},P=({label:t})=>{const[o,s]=x.useState(!1);return e.jsxs(n,{sx:{border:"1px solid",borderColor:"contrastColor.main",color:"contrastColor.main",display:"flex",alignItems:"center",borderRadius:"16px",bgcolor:"bgColor.main",p:.5},onMouseEnter:()=>{s(!0)},onMouseLeave:()=>{s(!1)},children:[e.jsx(B,{sx:{rotate:o?"360deg":"0deg",transition:"rotate 0.5s ease-in-out"},label:t}),e.jsx(T,{in:o,orientation:"horizontal",sx:{whiteSpace:"nowrap"},children:e.jsx(g,{children:` ${t} `})})]})},D=({data:t,index:o=0})=>{const[s,i]=v({rootMargin:"9999999px 0px 0px 0px"}),l=w(),p=I(l.breakpoints.up("sm")),{title:c,date:r,type:h,body:u,imgs:b,buttons:f}=t;return e.jsxs(n,{ref:s,className:"border-gradient",p:2,sx:{position:"relative",opacity:i?"1":"0",translate:i?"0px":o%2?"100px":"-100px",transition:"scale 0.5s ease-in-out, box-shadow 0.5s ease-in-out, translate 0.5s ease-in-out, opacity 0.5s ease-in-out",borderRadius:"15px",overflow:"hidden",mx:{lg:0,md:5,xs:0},mb:{md:5,xs:2},bgcolor:"bgColor.main",scale:"0.975",boxShadow:"0 4px 8px 0 rgba(255,255,255,0.2)","&:hover":{boxShadow:"0 4px 16px 0 rgba(255,255,255,0.2)",scale:"1"}},children:[e.jsxs(n,{sx:{width:{sm:"60%",xs:"100%"}},children:[e.jsx(m,{title:"Title",placement:p?"left":"top-start",children:e.jsx($,{variant:"h4",sx:{maxWidth:{xs:"75%",sm:"100%"},width:"fit-content",bgcolor:"gray.transparent"},children:c})}),h&&e.jsx(m,{title:"Tags",placement:p?"left":"top-start",children:e.jsx("div",{children:e.jsx(M,{children:h.sort().map((a,d)=>e.jsx(P,{label:a},`chip-${a}-${d}`))})})}),r&&e.jsx(m,{title:"Date Finished",placement:p?"left":"top-start",children:e.jsx(k,{label:r,variant:"outlined"})}),e.jsx(n,{component:"hr"}),u&&e.jsx(n,{component:"ul",sx:{py:3,border:`1px solid ${l.palette.contrastColor.main}`,borderRadius:"15px",bgcolor:"bgColor.main"},children:u.map((a,d)=>e.jsx(n,{component:"li",sx:{color:l.palette.mode==="light"?"black":"whitesmoke"},children:e.jsx(g,{pr:1,children:a})},`dotpoint-${d}`))})]}),f&&f.map((a,d)=>e.jsx(m,{placement:"left",enterDelay:300,title:(a==null?void 0:a.disabled)||a.text,children:e.jsx(n,{component:"span",sx:{display:"flex",justifyContent:{xs:"center",sm:"left"}},children:e.jsx(S,{startIcon:a.icon,variant:"contained",onClick:a==null?void 0:a.onClick,sx:{m:.5,border:`1px solid ${l.palette.contrastColor.main}`,width:{sm:"fit-content",xs:"75%"},minWidth:"180px"},disabled:(a==null?void 0:a.disabled)!=null,children:a.text})})},`c${o}-b${d}]`)),e.jsx(z,{odd:o%2===0,imgs:b,inView:i})]})};export{D as default};
