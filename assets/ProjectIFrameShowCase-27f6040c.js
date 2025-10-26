import{f as D,g as N,D as C,s as m,q as n,a as l,aN as y,r as v,h as M,_ as z,ak as U,j as o,i as O,k as T,av as A,au as K,at as S,B as h}from"./index-396175d3.js";import{B as X}from"./index-837394e1.js";import"./index-ebdcb163.js";function E(r){return D("MuiLinearProgress",r)}N("MuiLinearProgress",["root","colorPrimary","colorSecondary","determinate","indeterminate","buffer","query","dashed","dashedColorPrimary","dashedColorSecondary","bar","barColorPrimary","barColorSecondary","bar1Indeterminate","bar1Determinate","bar1Buffer","bar2Indeterminate","bar2Buffer"]);const F=["className","color","value","valueBuffer","variant"];let c=r=>r,L,j,B,I,_,R;const x=4,G=C(L||(L=c`
  0% {
    left: -35%;
    right: 100%;
  }

  60% {
    left: 100%;
    right: -90%;
  }

  100% {
    left: 100%;
    right: -90%;
  }
`)),W=C(j||(j=c`
  0% {
    left: -200%;
    right: 100%;
  }

  60% {
    left: 107%;
    right: -8%;
  }

  100% {
    left: 107%;
    right: -8%;
  }
`)),Y=C(B||(B=c`
  0% {
    opacity: 1;
    background-position: 0 -23px;
  }

  60% {
    opacity: 0;
    background-position: 0 -23px;
  }

  100% {
    opacity: 1;
    background-position: -200px -23px;
  }
`)),H=r=>{const{classes:e,variant:a,color:t}=r,p={root:["root",`color${n(t)}`,a],dashed:["dashed",`dashedColor${n(t)}`],bar1:["bar",`barColor${n(t)}`,(a==="indeterminate"||a==="query")&&"bar1Indeterminate",a==="determinate"&&"bar1Determinate",a==="buffer"&&"bar1Buffer"],bar2:["bar",a!=="buffer"&&`barColor${n(t)}`,a==="buffer"&&`color${n(t)}`,(a==="indeterminate"||a==="query")&&"bar2Indeterminate",a==="buffer"&&"bar2Buffer"]};return T(p,E,e)},P=(r,e)=>e==="inherit"?"currentColor":r.vars?r.vars.palette.LinearProgress[`${e}Bg`]:r.palette.mode==="light"?A(r.palette[e].main,.62):K(r.palette[e].main,.5),J=m("span",{name:"MuiLinearProgress",slot:"Root",overridesResolver:(r,e)=>{const{ownerState:a}=r;return[e.root,e[`color${n(a.color)}`],e[a.variant]]}})(({ownerState:r,theme:e})=>l({position:"relative",overflow:"hidden",display:"block",height:4,zIndex:0,"@media print":{colorAdjust:"exact"},backgroundColor:P(e,r.color)},r.color==="inherit"&&r.variant!=="buffer"&&{backgroundColor:"none","&::before":{content:'""',position:"absolute",left:0,top:0,right:0,bottom:0,backgroundColor:"currentColor",opacity:.3}},r.variant==="buffer"&&{backgroundColor:"transparent"},r.variant==="query"&&{transform:"rotate(180deg)"})),Q=m("span",{name:"MuiLinearProgress",slot:"Dashed",overridesResolver:(r,e)=>{const{ownerState:a}=r;return[e.dashed,e[`dashedColor${n(a.color)}`]]}})(({ownerState:r,theme:e})=>{const a=P(e,r.color);return l({position:"absolute",marginTop:0,height:"100%",width:"100%"},r.color==="inherit"&&{opacity:.3},{backgroundImage:`radial-gradient(${a} 0%, ${a} 16%, transparent 42%)`,backgroundSize:"10px 10px",backgroundPosition:"0 -23px"})},y(I||(I=c`
    animation: ${0} 3s infinite linear;
  `),Y)),V=m("span",{name:"MuiLinearProgress",slot:"Bar1",overridesResolver:(r,e)=>{const{ownerState:a}=r;return[e.bar,e[`barColor${n(a.color)}`],(a.variant==="indeterminate"||a.variant==="query")&&e.bar1Indeterminate,a.variant==="determinate"&&e.bar1Determinate,a.variant==="buffer"&&e.bar1Buffer]}})(({ownerState:r,theme:e})=>l({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left",backgroundColor:r.color==="inherit"?"currentColor":(e.vars||e).palette[r.color].main},r.variant==="determinate"&&{transition:`transform .${x}s linear`},r.variant==="buffer"&&{zIndex:1,transition:`transform .${x}s linear`}),({ownerState:r})=>(r.variant==="indeterminate"||r.variant==="query")&&y(_||(_=c`
      width: auto;
      animation: ${0} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    `),G)),Z=m("span",{name:"MuiLinearProgress",slot:"Bar2",overridesResolver:(r,e)=>{const{ownerState:a}=r;return[e.bar,e[`barColor${n(a.color)}`],(a.variant==="indeterminate"||a.variant==="query")&&e.bar2Indeterminate,a.variant==="buffer"&&e.bar2Buffer]}})(({ownerState:r,theme:e})=>l({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left"},r.variant!=="buffer"&&{backgroundColor:r.color==="inherit"?"currentColor":(e.vars||e).palette[r.color].main},r.color==="inherit"&&{opacity:.3},r.variant==="buffer"&&{backgroundColor:P(e,r.color),transition:`transform .${x}s linear`}),({ownerState:r})=>(r.variant==="indeterminate"||r.variant==="query")&&y(R||(R=c`
      width: auto;
      animation: ${0} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;
    `),W)),rr=v.forwardRef(function(e,a){const t=M({props:e,name:"MuiLinearProgress"}),{className:p,color:w="primary",value:g,valueBuffer:$,variant:s="indeterminate"}=t,q=z(t,F),u=l({},t,{color:w,variant:s}),d=H(u),k=U(),f={},b={bar1:{},bar2:{}};if((s==="determinate"||s==="buffer")&&g!==void 0){f["aria-valuenow"]=Math.round(g),f["aria-valuemin"]=0,f["aria-valuemax"]=100;let i=g-100;k&&(i=-i),b.bar1.transform=`translateX(${i}%)`}if(s==="buffer"&&$!==void 0){let i=($||0)-100;k&&(i=-i),b.bar2.transform=`translateX(${i}%)`}return o.jsxs(J,l({className:O(d.root,p),ownerState:u,role:"progressbar"},f,{ref:a},q,{children:[s==="buffer"?o.jsx(Q,{className:d.dashed,ownerState:u}):null,o.jsx(V,{className:d.bar1,ownerState:u,style:b.bar1}),s==="determinate"?null:o.jsx(Z,{className:d.bar2,ownerState:u,style:b.bar2})]}))}),er=rr,nr=()=>{const r=S().project,e=(r==null?void 0:r.toLowerCase())==="xeno-and-yova",[a,t]=v.useState(!1);return o.jsxs(v.Fragment,{children:[o.jsx(h,{mb:2,mt:-1,sx:{position:{xs:"relative",sm:"absolute"},left:{xs:"0%",sm:"2%"}},children:o.jsx(X,{destination:"/projects"})}),o.jsxs(h,{sx:{width:"100%",height:"calc(100vh - 64px)",display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center",position:"relative"},children:[o.jsx(h,{id:"project-showcase",component:"iframe",onLoad:()=>{t(!0)},title:"project-showcase",sx:{opacity:a?"1.0":"0.0"},width:e?"min(714px, 100vw)":"100%",height:e?"546px":"99%",src:`https://ghwang28.github.io/${r}`}),!a&&o.jsx(er,{sx:{width:"100%",height:"20px",position:"absolute",top:"50%",left:"50%",translate:"-50% -50%"}})]})]})};export{nr as default};
