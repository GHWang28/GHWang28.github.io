"use strict";(self.webpackChunkmygithubpage=self.webpackChunkmygithubpage||[]).push([[520],{2494:function(e,n,t){var o=t(4942),i=t(1413),r=t(5987),a=(t(2791),t(9560)),s=t(9293),l=t(7630),c=t(184),u=["className"],d=(0,l.ZP)((function(e){var n=e.className,t=(0,r.Z)(e,u);return(0,c.jsx)(a.Z,(0,i.Z)((0,i.Z)({},t),{},{arrow:!0,classes:{popper:n}}))}))((function(e){var n,t=e.theme;return n={},(0,o.Z)(n,"& .".concat(s.Z.arrow),{color:t.palette.tooltipColor.bgColor}),(0,o.Z)(n,"& .".concat(s.Z.tooltip),{backgroundColor:t.palette.tooltipColor.bgColor,color:t.palette.tooltipColor.main,boxShadow:t.shadows[1],fontSize:11}),n}));n.Z=d},4824:function(e,n,t){var o=t(9439),i=t(2791),r=t(3400),a=t(5463),s=t(2494),l=t(184);n.Z=function(e){var n=e.id,t=e.children,c=e.icon,u=e.sx,d=e.tooltip,x=void 0===d?"":d,p=e.title,f=e.closeOnClick,h=void 0===f||f,m=(0,i.useState)(),g=(0,o.Z)(m,2),b=g[0],v=g[1],Z=function(){v(void 0)},k=(0,l.jsx)(r.Z,{title:p,"aria-label":p,sx:u,id:n,"aria-controls":b?"dropdown-menu":void 0,"aria-haspopup":"true","aria-expanded":b?"true":void 0,onClick:function(e){e.stopPropagation(),v(e.currentTarget)},children:c}),j=(0,l.jsx)(a.Z,{disableScrollLock:!0,anchorEl:b,open:Boolean(b),onClose:Z,onClick:function(){h&&Z()},MenuListProps:{"aria-labelledby":n},sx:{ul:{border:1,borderColor:"text.primary",borderRadius:"15px"}},PaperProps:{sx:{borderRadius:"15px"}},children:t});return x.length>0?(0,l.jsxs)(i.Fragment,{children:[(0,l.jsx)(s.Z,{arrow:!0,title:x,placement:"top",children:k}),j]}):(0,l.jsxs)(i.Fragment,{children:[k,j]})}},4520:function(e,n,t){t.r(n),t.d(n,{default:function(){return O}});var o=t(1413),i=t(9439),r=t(2791),a=t(3967),s=t(5193),l=t(4395),c=t(8870),u=t(4721),d=t(1889),x=t(4374),p=t(7689),f=t(6125),h=t(890),m=t(184),g=function(){var e=(0,r.useState)(!1),n=(0,i.Z)(e,2),t=n[0],o=n[1],a=(0,s.Z)((function(e){return e.breakpoints.up("sm")})),l=(0,p.s0)(),u=(0,p.TH)(),d="/"!==u.pathname,x=(0,r.useRef)(null),g=(0,r.useState)("url(/images/transparent-img.png)"),b=(0,i.Z)(g,2),v=b[0],Z=b[1];return(0,r.useEffect)((function(){var e=setTimeout((function(){Z("url(/images/gw-logo-anim-2.gif)")}),10);return function(){clearTimeout(e)}}),[]),(0,r.useEffect)((function(){var e;if("/"===u.pathname&&Boolean(null===(e=u.state)||void 0===e?void 0:e.prevLocation)){var n=x.current;null===n||void 0===n||n.classList.remove("logo-anim"),null===n||void 0===n||n.offsetWidth,null===n||void 0===n||n.classList.add("logo-anim")}}),[u]),(0,m.jsxs)(r.Fragment,{children:[(0,m.jsx)(c.Z,{ref:x,role:"button",title:"Home Page",className:"logo-anim",sx:{width:"40px",height:"40px",borderRadius:"4px",overflow:"hidden",cursor:"pointer",transition:"scale 0.3s ease-in-out",scale:"1.0","&:hover":{scale:"1.05"},WebkitTapHighlightColor:"transparent"},m:1,onMouseEnter:function(){o(!0)},onMouseLeave:function(){o(!1)},onClick:function(){d&&l("/",{state:{prevLocation:u.pathname}})},children:(0,m.jsx)(c.Z,{sx:{height:"100%",width:"100%",maskImage:v,maskSize:"100%",maskRepeat:"no-repeat"},children:(0,m.jsx)(c.Z,{className:"gradient-background",sx:{height:"100%",width:"100%"}})})}),(0,m.jsx)(f.Z,{orientation:"horizontal",in:t||!a,children:(0,m.jsxs)(c.Z,{sx:{display:"flex",flexDirection:"column",mx:1},children:[(0,m.jsx)(h.Z,{fontFamily:"my-handwriting",fontSize:16,lineHeight:"15px",noWrap:!0,children:"Gordon Wang's"}),(0,m.jsxs)(h.Z,{fontFamily:"my-handwriting",fontSize:16,lineHeight:"15px",noWrap:!0,children:[(0,m.jsx)(c.Z,{component:"span",className:"gradient-text",sx:{fontWeight:"bold"},children:"Portfolio"})," Website"]})]})})]})},b=t(4638),v=t(7064),Z=t(2577),k=t(4824),j=t(5405),w=t(7122),y=t(3552),C=t(2936),z=t(6711),S=t(79),L=t(2793),E=t(4483),I=t(4773),R=t(838),W=t(6168),T=t(3085),M=t(7749),N=t(1248),P=t(3746),B=t(165);var q=function(){var e=(0,j.TL)(),n=(0,j.CG)((function(e){return e.background})),t=(0,j.CG)((function(e){return e.splash})),o=(0,j.CG)((function(e){return e.navbarLock})),i=(0,j.CG)((function(e){return e.hideWebsite})),r=(0,a.Z)().palette.mode,s=[{icon:(0,m.jsx)(W.Z,{}),label:"Mountains"},{icon:(0,m.jsx)(T.Z,{}),label:"Rain"},{icon:(0,m.jsx)(C.Z,{}),label:"Waves"},{icon:(0,m.jsx)(S.Z,{}),label:"Ripples"},{icon:(0,m.jsx)(E.Z,{sx:{scale:"1.0"}}),label:"Blocks LG"},{icon:(0,m.jsx)(E.Z,{sx:{scale:"0.66"}}),label:"Blocks SM"},{icon:(0,m.jsx)(L.Z,{}),label:"Circuitry"},{icon:(0,m.jsx)(z.Z,{}),label:"None"}],l=[{key:"background",icon:s[n].icon,text:"Background: ".concat(s[n].label),onClick:function(){e((0,Z.AY)(n+1))}},{key:"splash",icon:(0,m.jsx)(y.Z,{}),text:"Splash Text ".concat(t?"enabled":"disabled"),onClick:function(){e((0,Z.yF)(!t))}},{key:"theme",icon:"dark"===r?(0,m.jsx)(R.Z,{}):(0,m.jsx)(I.Z,{}),text:"".concat(r[0].toUpperCase()+r.slice(1).toLowerCase()," mode"),onClick:function(){e((0,Z.qe)("dark"===r?"light":"dark"))}},{key:"lock",icon:o?(0,m.jsx)(M.Z,{}):(0,m.jsx)(N.Z,{}),text:"Navbar ".concat(o?"locked":"unlocked"),onClick:function(){e((0,Z.Zf)(!o))}},{key:"hide-website",icon:i?(0,m.jsx)(B.Z,{}):(0,m.jsx)(P.Z,{}),text:"Elements ".concat(i?"hidden":"showing"),onClick:function(){e((0,Z.N7)(!i))}}];return(0,m.jsxs)(k.Z,{title:"Settings",icon:(0,m.jsx)(w.Z,{}),children:[(0,m.jsx)(h.Z,{align:"center",m:1,sx:{width:"250px"},children:"Website Settings"}),(0,m.jsx)("hr",{}),l.map((function(e){return(0,m.jsxs)(b.Z,{onClick:function(n){n.stopPropagation(),e.onClick()},children:[(0,m.jsx)(v.Z,{children:e.icon}),(0,m.jsx)(h.Z,{children:e.text})]},e.key)}))]})},F=t(6151),G=t(4e3),D=(0,r.forwardRef)((function(e,n){var t=e.label,o=e.onClick,s=e.disabled,l=void 0!==s&&s,c=e.startIcon,u="light"===(0,a.Z)().palette.mode,d=(0,r.useState)(!1),x=(0,i.Z)(d,2),p=x[0],f=x[1];return(0,m.jsx)(F.Z,{ref:n,startIcon:c,onClick:function(){f(!1),o()},sx:{fontWeight:"bold",borderRadius:"0px",height:"100%",width:"33.33%",borderBottom:"3px solid rgba(0,0,0,0.5)",transition:"background-color 0.2s ease-in-out, color 0.2s ease-in-out",fontSize:{sm:"12px"},bgcolor:l?u?"rgba(90,90,90,0.5)":"rgba(0,0,0,0.5)":"",color:l?"rgba(127,127,127)":"","&:hover":{bgcolor:l?u?"rgba(90,90,90,0.5)":"rgba(0,0,0,0.5)":"rgba(0,0,0,0)"}},disabled:l,disableRipple:!0,children:p?(0,m.jsx)(G.Z,{frequency:3,sizeRange:[10,15],children:t}):t})})),H=t(9455),V=t(2513),A=t(9995),Y=t(3475),O=function(){var e=(0,j.CG)((function(e){return e.navbarLock})),n=(0,r.useState)({}),t=(0,i.Z)(n,2),f=t[0],h=t[1],b=(0,r.useState)(!0),v=(0,i.Z)(b,2),Z=v[0],k=v[1],w=(0,r.useState)(0),y=(0,i.Z)(w,2),C=y[0],z=y[1],S=(0,r.useRef)([]),L=(0,a.Z)(),E="light"===(0,a.Z)().palette.mode,I=(0,s.Z)(L.breakpoints.up("sm")),R=(0,x.q_)({from:{y:-50},to:{y:0}}),W=(0,x.q)(l.Z),T=(0,p.s0)(),M=(0,p.TH)(),N=H.q5.slice(1).map((function(e){return e.slice(1)})),P=[(0,m.jsx)(V.Z,{}),(0,m.jsx)(A.Z,{}),(0,m.jsx)(Y.Z,{})];(0,r.useEffect)((function(){var e=!1,n=H.q5.slice(1).map((function(e){return e.slice(1)})).findIndex((function(n){var t=M.pathname.substring(1);return e=n===t,t.startsWith(n)})),t=S.current[Math.max(n,0)],o=null===t||void 0===t?void 0:t.getBoundingClientRect();h({bottom:(null===t||void 0===t?void 0:t.offsetTop)+3,left:null===t||void 0===t?void 0:t.offsetLeft,width:null===o||void 0===o?void 0:o.width,height:0,opacity:n<0||!e?"0":"1"})}),[M]),(0,r.useEffect)((function(){if(!e&&null!=window){var n=function(){null!=window&&(k(window.scrollY<C),z(window.scrollY))};return window.addEventListener("scroll",n),function(){window.removeEventListener("scroll",n)}}k(!0)}),[C,e]);var B=(0,m.jsx)(c.Z,{ml:"auto",sx:{display:"flex",justifyContent:"center",alignItems:"center"},children:(0,m.jsx)(q,{})}),F=N.map((function(e,n){return(0,m.jsx)(D,{ref:function(e){S.current[n]=e},onClick:function(){T("/".concat(e),{state:{prevLocation:M.pathname}})},disabled:M.pathname==="/".concat(e),label:e,startIcon:P[n]},"nav-btn-".concat(e))})).flatMap((function(e,n){return 0===n?[(0,m.jsx)(u.Z,{orientation:"vertical",flexItem:!0},"divider-".concat(n)),e,(0,m.jsx)(u.Z,{orientation:"vertical",flexItem:!0},"divider-".concat(n+1))]:[e,(0,m.jsx)(u.Z,{orientation:"vertical",flexItem:!0},"divider-".concat(n+1))]}));return(0,m.jsx)(W,{style:R,sx:{backgroundColor:E?"rgba(255,255,255,0.7)":"rgba(0,0,0,0.7)",backdropFilter:'blur(1px)\n          url(\'data:image/svg+xml,          <svg xmlns="http://www.w3.org/2000/svg">            <filter id="turbulence" x="0" y="0">              <feTurbulence numOctaves="3" seed="2" baseFrequency="0.02 0.05"></feTurbulence>              <feDisplacementMap scale="12" in="SourceGraphic"></feDisplacementMap>            </filter>          </svg>#turbulence\')\n        ',width:"100vw",transition:"translate 0.4s ease-in-out",translate:"0% ".concat(Z?"0%":"-150%"),top:0,left:0,position:"fixed"},children:(0,m.jsxs)(d.ZP,{container:!0,sx:{pb:0,px:I?5:1},children:[(0,m.jsx)(d.ZP,{item:!0,sx:{display:"flex",alignItems:"center"},children:(0,m.jsx)(g,{})}),!I&&B,!I&&(0,m.jsx)(u.Z,{orientation:"horizontal",flexItem:!0,sx:{width:"100%",bgcolor:"whitesmoke"}}),(0,m.jsxs)(d.ZP,{item:!0,id:"nav-btn-group",xs:12,sm:7,md:5,sx:{position:"relative",display:"flex",justifyContent:I?"left":"space-between",ml:I?2:0,minHeight:"50px"},children:[(0,m.jsx)(c.Z,{className:"border-gradient marker",sx:(0,o.Z)({position:"absolute",display:"flex",pointerEvents:"none",transition:"all 0.5s ease-in-out",zIndex:2},f)}),F]}),I&&B]})})}},4e3:function(e,n,t){t.d(n,{Z:function(){return f}});var o=t(3433),i=t(9439),r=t(2791),a=t(8870),s=t(3226),l=t(4261),c=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"hsl(50deg, 100%, 50%)",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:(0,s.Vk)(25,75);return{id:(0,l.Z)(),timestamp:Date.now(),color:e,size:n,style:{top:"".concat((0,s.Vk)(0,100),"%"),left:"".concat((0,s.Vk)(0,100),"%"),zIndex:2}}},u=t(1413),d=t(184),x=function(e){var n=e.color,t=e.size,o=e.style;return(0,d.jsx)("span",{className:"sparklez-grow-shrink",style:(0,u.Z)((0,u.Z)({position:"absolute",pointerEvents:"none"},o),{},{translate:"-50% -50%"}),children:(0,d.jsx)("svg",{style:{transform:"translate(-50000000%, 0)"},width:t,height:t,viewBox:"0 0 16 16",fill:"none",className:(0,s.Vk)(0,1)?"sparklez-spin-clockwise":"sparklez-spin-anticlockwise",children:(0,d.jsx)("path",{stroke:"white",strokeWidth:"1px",d:"M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z",fill:n})})})},p=["hsl(50deg, 100%, 50%)","#EE7752","#E73C7E","#23A6D5","#23D5AB","rgb(150, 246, 246)"],f=function(e){var n=e.children,t=e.frequency,l=void 0===t?1:t,u=e.sizeRange,f=void 0===u?[5,15]:u,h=(0,r.useState)([]),m=(0,i.Z)(h,2),g=m[0],b=m[1];return(0,r.useEffect)((function(){var e=setTimeout((function(){var e=Date.now(),n=(0,o.Z)(g).filter((function(n){return e-n.timestamp<=1e3}));b([].concat((0,o.Z)(n),[c(p[(0,s.Vk)(0,p.length-1)],(0,s.Vk)(f[0],f[1]))]))}),(0,s.Vk)(5,Math.max(2e3/l,10)));return function(){return clearTimeout(e)}})),(0,d.jsxs)(a.Z,{component:"span",sx:{position:"relative",display:"inline-block"},children:[g.map((function(e){return(0,d.jsx)(x,{color:e.color,size:e.size,style:e.style},"sparklez-".concat(e.id))})),(0,d.jsx)(a.Z,{component:"span",sx:{position:"relative",zIndex:1,fontWeight:"bold"},children:n})]})}}}]);
//# sourceMappingURL=520.13dc96ec.chunk.js.map