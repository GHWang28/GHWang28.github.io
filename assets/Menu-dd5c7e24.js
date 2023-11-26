import{p as ee,q as te,s as q,v as h,Y as ye,a as c,w as oe,x as z,j as A,y as Y,z as ne,O as le,W,a7 as ae,a0 as Re,aw as ke,f as $e,S as Ke,a8 as ze,ac as Ue}from"./index-d31f89e0.js";import{e as We,u as Z,P as qe,a as Ge,b as Ye,r as Ve,g as Te,c as Me,i as Oe,G as Xe}from"./index-92760c5a.js";function Ae(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}const Je=e=>{let t;return e<1?t=5.11916*e**2:t=4.5*Math.log(e+1)+2,(t/100).toFixed(2)},Ce=Je;function Qe(e){return ee("MuiPaper",e)}te("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const Ze=["className","component","elevation","square","variant"],et=e=>{const{square:t,elevation:o,variant:n,classes:i}=e,r={root:["root",n,!t&&"rounded",n==="elevation"&&`elevation${o}`]};return ne(r,Qe,i)},tt=q("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,t[o.variant],!o.square&&t.rounded,o.variant==="elevation"&&t[`elevation${o.elevation}`]]}})(({theme:e,ownerState:t})=>{var o;return h({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},t.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},t.variant==="elevation"&&h({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${ye("#fff",Ce(t.elevation))}, ${ye("#fff",Ce(t.elevation))})`},e.vars&&{backgroundImage:(o=e.vars.overlays)==null?void 0:o[t.elevation]}))}),ot=c.forwardRef(function(t,o){const n=oe({props:t,name:"MuiPaper"}),{className:i,component:r="div",elevation:a=1,square:l=!1,variant:d="elevation"}=n,m=z(n,Ze),x=h({},n,{component:r,elevation:a,square:l,variant:d}),v=et(x);return A.jsx(tt,h({as:r,ownerState:x,className:Y(v.root,i),ref:o},m))}),nt=ot,rt=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function st(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function it(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=n=>e.ownerDocument.querySelector(`input[type="radio"]${n}`);let o=t(`[name="${e.name}"]:checked`);return o||(o=t(`[name="${e.name}"]`)),o!==e}function at(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||it(e))}function lt(e){const t=[],o=[];return Array.from(e.querySelectorAll(rt)).forEach((n,i)=>{const r=st(n);r===-1||!at(n)||(r===0?t.push(n):o.push({documentOrder:i,tabIndex:r,node:n}))}),o.sort((n,i)=>n.tabIndex===i.tabIndex?n.documentOrder-i.documentOrder:n.tabIndex-i.tabIndex).map(n=>n.node).concat(t)}function ct(){return!0}function dt(e){const{children:t,disableAutoFocus:o=!1,disableEnforceFocus:n=!1,disableRestoreFocus:i=!1,getTabbable:r=lt,isEnabled:a=ct,open:l}=e,d=c.useRef(!1),m=c.useRef(null),x=c.useRef(null),v=c.useRef(null),R=c.useRef(null),E=c.useRef(!1),P=c.useRef(null),N=le(t.ref,P),k=c.useRef(null);c.useEffect(()=>{!l||!P.current||(E.current=!o)},[o,l]),c.useEffect(()=>{if(!l||!P.current)return;const s=W(P.current);return P.current.contains(s.activeElement)||(P.current.hasAttribute("tabIndex")||P.current.setAttribute("tabIndex","-1"),E.current&&P.current.focus()),()=>{i||(v.current&&v.current.focus&&(d.current=!0,v.current.focus()),v.current=null)}},[l]),c.useEffect(()=>{if(!l||!P.current)return;const s=W(P.current),u=g=>{const{current:S}=P;if(S!==null){if(!s.hasFocus()||n||!a()||d.current){d.current=!1;return}if(!S.contains(s.activeElement)){if(g&&R.current!==g.target||s.activeElement!==R.current)R.current=null;else if(R.current!==null)return;if(!E.current)return;let C=[];if((s.activeElement===m.current||s.activeElement===x.current)&&(C=r(P.current)),C.length>0){var O,F;const D=!!((O=k.current)!=null&&O.shiftKey&&((F=k.current)==null?void 0:F.key)==="Tab"),H=C[0],b=C[C.length-1];typeof H!="string"&&typeof b!="string"&&(D?b.focus():H.focus())}else S.focus()}}},f=g=>{k.current=g,!(n||!a()||g.key!=="Tab")&&s.activeElement===P.current&&g.shiftKey&&(d.current=!0,x.current&&x.current.focus())};s.addEventListener("focusin",u),s.addEventListener("keydown",f,!0);const T=setInterval(()=>{s.activeElement&&s.activeElement.tagName==="BODY"&&u(null)},50);return()=>{clearInterval(T),s.removeEventListener("focusin",u),s.removeEventListener("keydown",f,!0)}},[o,n,i,a,l,r]);const p=s=>{v.current===null&&(v.current=s.relatedTarget),E.current=!0,R.current=s.target;const u=t.props.onFocus;u&&u(s)},w=s=>{v.current===null&&(v.current=s.relatedTarget),E.current=!0};return A.jsxs(c.Fragment,{children:[A.jsx("div",{tabIndex:l?0:-1,onFocus:w,ref:m,"data-testid":"sentinelStart"}),c.cloneElement(t,{ref:N,onFocus:p}),A.jsx("div",{tabIndex:l?0:-1,onFocus:w,ref:x,"data-testid":"sentinelEnd"})]})}function ut(e){const t=W(e);return t.body===e?ae(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function ie(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function we(e){return parseInt(ae(e).getComputedStyle(e).paddingRight,10)||0}function pt(e){const o=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,n=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return o||n}function Se(e,t,o,n,i){const r=[t,o,...n];[].forEach.call(e.children,a=>{const l=r.indexOf(a)===-1,d=!pt(a);l&&d&&ie(a,i)})}function ue(e,t){let o=-1;return e.some((n,i)=>t(n)?(o=i,!0):!1),o}function ft(e,t){const o=[],n=e.container;if(!t.disableScrollLock){if(ut(n)){const a=Ae(W(n));o.push({value:n.style.paddingRight,property:"padding-right",el:n}),n.style.paddingRight=`${we(n)+a}px`;const l=W(n).querySelectorAll(".mui-fixed");[].forEach.call(l,d=>{o.push({value:d.style.paddingRight,property:"padding-right",el:d}),d.style.paddingRight=`${we(d)+a}px`})}let r;if(n.parentNode instanceof DocumentFragment)r=W(n).body;else{const a=n.parentElement,l=ae(n);r=(a==null?void 0:a.nodeName)==="HTML"&&l.getComputedStyle(a).overflowY==="scroll"?a:n}o.push({value:r.style.overflow,property:"overflow",el:r},{value:r.style.overflowX,property:"overflow-x",el:r},{value:r.style.overflowY,property:"overflow-y",el:r}),r.style.overflow="hidden"}return()=>{o.forEach(({value:r,el:a,property:l})=>{r?a.style.setProperty(l,r):a.style.removeProperty(l)})}}function ht(e){const t=[];return[].forEach.call(e.children,o=>{o.getAttribute("aria-hidden")==="true"&&t.push(o)}),t}class mt{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,o){let n=this.modals.indexOf(t);if(n!==-1)return n;n=this.modals.length,this.modals.push(t),t.modalRef&&ie(t.modalRef,!1);const i=ht(o);Se(o,t.mount,t.modalRef,i,!0);const r=ue(this.containers,a=>a.container===o);return r!==-1?(this.containers[r].modals.push(t),n):(this.containers.push({modals:[t],container:o,restore:null,hiddenSiblings:i}),n)}mount(t,o){const n=ue(this.containers,r=>r.modals.indexOf(t)!==-1),i=this.containers[n];i.restore||(i.restore=ft(i,o))}remove(t,o=!0){const n=this.modals.indexOf(t);if(n===-1)return n;const i=ue(this.containers,a=>a.modals.indexOf(t)!==-1),r=this.containers[i];if(r.modals.splice(r.modals.indexOf(t),1),this.modals.splice(n,1),r.modals.length===0)r.restore&&r.restore(),t.modalRef&&ie(t.modalRef,o),Se(r.container,t.mount,t.modalRef,r.hiddenSiblings,!1),this.containers.splice(i,1);else{const a=r.modals[r.modals.length-1];a.modalRef&&ie(a.modalRef,!1)}return n}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function vt(e){return typeof e=="function"?e():e}function gt(e){return e?e.props.hasOwnProperty("in"):!1}const bt=new mt;function Pt(e){const{container:t,disableEscapeKeyDown:o=!1,disableScrollLock:n=!1,manager:i=bt,closeAfterTransition:r=!1,onTransitionEnter:a,onTransitionExited:l,children:d,onClose:m,open:x,rootRef:v}=e,R=c.useRef({}),E=c.useRef(null),P=c.useRef(null),N=le(P,v),[k,p]=c.useState(!x),w=gt(d);let s=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(s=!1);const u=()=>W(E.current),f=()=>(R.current.modalRef=P.current,R.current.mount=E.current,R.current),T=()=>{i.mount(f(),{disableScrollLock:n}),P.current&&(P.current.scrollTop=0)},g=Re(()=>{const y=vt(t)||u().body;i.add(f(),y),P.current&&T()}),S=c.useCallback(()=>i.isTopModal(f()),[i]),O=Re(y=>{E.current=y,y&&(x&&S()?T():P.current&&ie(P.current,s))}),F=c.useCallback(()=>{i.remove(f(),s)},[s,i]);c.useEffect(()=>()=>{F()},[F]),c.useEffect(()=>{x?g():(!w||!r)&&F()},[x,F,w,r,g]);const C=y=>M=>{var B;(B=y.onKeyDown)==null||B.call(y,M),!(M.key!=="Escape"||!S())&&(o||(M.stopPropagation(),m&&m(M,"escapeKeyDown")))},D=y=>M=>{var B;(B=y.onClick)==null||B.call(y,M),M.target===M.currentTarget&&m&&m(M,"backdropClick")};return{getRootProps:(y={})=>{const M=We(e);delete M.onTransitionEnter,delete M.onTransitionExited;const B=h({},M,y);return h({role:"presentation"},B,{onKeyDown:C(B),ref:N})},getBackdropProps:(y={})=>{const M=y;return h({"aria-hidden":!0},M,{onClick:D(M),open:x})},getTransitionProps:()=>{const y=()=>{p(!1),a&&a()},M=()=>{p(!0),l&&l(),r&&F()};return{onEnter:ke(y,d.props.onEnter),onExited:ke(M,d.props.onExited)}},rootRef:N,portalRef:O,isTopModal:S,exited:k,hasTransition:w}}function xt(e){return ee("MuiModal",e)}te("MuiModal",["root","hidden","backdrop"]);const Et=["children","closeAfterTransition","container","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onKeyDown","open","onTransitionEnter","onTransitionExited","slotProps","slots"],yt=e=>{const{open:t,exited:o}=e;return ne({root:["root",!t&&o&&"hidden"],backdrop:["backdrop"]},Ge(xt))},Rt=c.forwardRef(function(t,o){var n;const{children:i,closeAfterTransition:r=!1,container:a,disableAutoFocus:l=!1,disableEnforceFocus:d=!1,disableEscapeKeyDown:m=!1,disablePortal:x=!1,disableRestoreFocus:v=!1,disableScrollLock:R=!1,hideBackdrop:E=!1,keepMounted:P=!1,onBackdropClick:N,open:k,slotProps:p={},slots:w={}}=t,s=z(t,Et),u=h({},t,{closeAfterTransition:r,disableAutoFocus:l,disableEnforceFocus:d,disableEscapeKeyDown:m,disablePortal:x,disableRestoreFocus:v,disableScrollLock:R,hideBackdrop:E,keepMounted:P}),{getRootProps:f,getBackdropProps:T,getTransitionProps:g,portalRef:S,isTopModal:O,exited:F,hasTransition:C}=Pt(h({},u,{rootRef:o})),D=h({},u,{exited:F,hasTransition:C}),H=yt(D),b={};if(i.props.tabIndex===void 0&&(b.tabIndex="-1"),C){const{onEnter:L,onExited:_}=g();b.onEnter=L,b.onExited=_}const I=(n=w.root)!=null?n:"div",y=Z({elementType:I,externalSlotProps:p.root,externalForwardedProps:s,getSlotProps:f,className:H.root,ownerState:D}),M=w.backdrop,B=Z({elementType:M,externalSlotProps:p.backdrop,getSlotProps:L=>T(h({},L,{onClick:_=>{N&&N(_),L!=null&&L.onClick&&L.onClick(_)}})),className:H.backdrop,ownerState:D});return!P&&!k&&(!C||F)?null:A.jsx(qe,{ref:S,container:a,disablePortal:x,children:A.jsxs(I,h({},y,{children:[!E&&M?A.jsx(M,h({},B)):null,A.jsx(dt,{disableEnforceFocus:d,disableAutoFocus:l,disableRestoreFocus:v,isEnabled:O,open:k,children:c.cloneElement(i,b)})]}))})}),kt=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],Tt={entering:{opacity:1},entered:{opacity:1}},Mt=c.forwardRef(function(t,o){const n=$e(),i={enter:n.transitions.duration.enteringScreen,exit:n.transitions.duration.leavingScreen},{addEndListener:r,appear:a=!0,children:l,easing:d,in:m,onEnter:x,onEntered:v,onEntering:R,onExit:E,onExited:P,onExiting:N,style:k,timeout:p=i,TransitionComponent:w=Ye}=t,s=z(t,kt),u=c.useRef(null),f=le(u,l.ref,o),T=b=>I=>{if(b){const y=u.current;I===void 0?b(y):b(y,I)}},g=T(R),S=T((b,I)=>{Ve(b);const y=Te({style:k,timeout:p,easing:d},{mode:"enter"});b.style.webkitTransition=n.transitions.create("opacity",y),b.style.transition=n.transitions.create("opacity",y),x&&x(b,I)}),O=T(v),F=T(N),C=T(b=>{const I=Te({style:k,timeout:p,easing:d},{mode:"exit"});b.style.webkitTransition=n.transitions.create("opacity",I),b.style.transition=n.transitions.create("opacity",I),E&&E(b)}),D=T(P),H=b=>{r&&r(u.current,b)};return A.jsx(w,h({appear:a,in:m,nodeRef:u,onEnter:S,onEntered:O,onEntering:g,onExit:C,onExited:D,onExiting:F,addEndListener:H,timeout:p},s,{children:(b,I)=>c.cloneElement(l,h({style:h({opacity:0,visibility:b==="exited"&&!m?"hidden":void 0},Tt[b],k,l.props.style),ref:f},I))}))}),Ct=Mt;function wt(e){return ee("MuiBackdrop",e)}te("MuiBackdrop",["root","invisible"]);const St=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],It=e=>{const{classes:t,invisible:o}=e;return ne({root:["root",o&&"invisible"]},wt,t)},Nt=q("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,o.invisible&&t.invisible]}})(({ownerState:e})=>h({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),Ft=c.forwardRef(function(t,o){var n,i,r;const a=oe({props:t,name:"MuiBackdrop"}),{children:l,className:d,component:m="div",components:x={},componentsProps:v={},invisible:R=!1,open:E,slotProps:P={},slots:N={},TransitionComponent:k=Ct,transitionDuration:p}=a,w=z(a,St),s=h({},a,{component:m,invisible:R}),u=It(s),f=(n=P.root)!=null?n:v.root;return A.jsx(k,h({in:E,timeout:p},w,{children:A.jsx(Nt,h({"aria-hidden":!0},f,{as:(i=(r=N.root)!=null?r:x.Root)!=null?i:m,className:Y(u.root,d,f==null?void 0:f.className),ownerState:h({},s,f==null?void 0:f.ownerState),classes:u,ref:o,children:l}))}))}),Lt=Ft,$t=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","open","slotProps","slots","theme"],Ot=q("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,!o.open&&o.exited&&t.hidden]}})(({theme:e,ownerState:t})=>h({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),At=q(Lt,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),Dt=c.forwardRef(function(t,o){var n,i,r,a,l,d;const m=oe({name:"MuiModal",props:t}),{BackdropComponent:x=At,BackdropProps:v,classes:R,className:E,closeAfterTransition:P=!1,children:N,container:k,component:p,components:w={},componentsProps:s={},disableAutoFocus:u=!1,disableEnforceFocus:f=!1,disableEscapeKeyDown:T=!1,disablePortal:g=!1,disableRestoreFocus:S=!1,disableScrollLock:O=!1,hideBackdrop:F=!1,keepMounted:C=!1,onBackdropClick:D,onClose:H,open:b,slotProps:I,slots:y,theme:M}=m,B=z(m,$t),[L,_]=c.useState(!0),G={container:k,closeAfterTransition:P,disableAutoFocus:u,disableEnforceFocus:f,disableEscapeKeyDown:T,disablePortal:g,disableRestoreFocus:S,disableScrollLock:O,hideBackdrop:F,keepMounted:C,onBackdropClick:D,onClose:H,open:b},X=h({},m,G,{exited:L}),ce=(n=(i=y==null?void 0:y.root)!=null?i:w.Root)!=null?n:Ot,de=(r=(a=y==null?void 0:y.backdrop)!=null?a:w.Backdrop)!=null?r:x,re=(l=I==null?void 0:I.root)!=null?l:s.root,V=(d=I==null?void 0:I.backdrop)!=null?d:s.backdrop;return A.jsx(Rt,h({slots:{root:ce,backdrop:de},slotProps:{root:()=>h({},Me(re,X),!Oe(ce)&&{as:p,theme:M},{className:Y(E,re==null?void 0:re.className,R==null?void 0:R.root,!X.open&&X.exited&&(R==null?void 0:R.hidden))}),backdrop:()=>h({},v,Me(V,X),{className:Y(V==null?void 0:V.className,v==null?void 0:v.className,R==null?void 0:R.backdrop)})},onTransitionEnter:()=>_(!1),onTransitionExited:()=>_(!0),ref:o},B,G,{children:N}))}),Bt=Dt,_t=c.createContext({}),jt=_t;function Ht(e){return ee("MuiList",e)}te("MuiList",["root","padding","dense","subheader"]);const Kt=["children","className","component","dense","disablePadding","subheader"],zt=e=>{const{classes:t,disablePadding:o,dense:n,subheader:i}=e;return ne({root:["root",!o&&"padding",n&&"dense",i&&"subheader"]},Ht,t)},Ut=q("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,!o.disablePadding&&t.padding,o.dense&&t.dense,o.subheader&&t.subheader]}})(({ownerState:e})=>h({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),Wt=c.forwardRef(function(t,o){const n=oe({props:t,name:"MuiList"}),{children:i,className:r,component:a="ul",dense:l=!1,disablePadding:d=!1,subheader:m}=n,x=z(n,Kt),v=c.useMemo(()=>({dense:l}),[l]),R=h({},n,{component:a,dense:l,disablePadding:d}),E=zt(R);return A.jsx(jt.Provider,{value:v,children:A.jsxs(Ut,h({as:a,className:Y(E.root,r),ref:o,ownerState:R},x,{children:[m,i]}))})}),qt=Wt,Gt=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function pe(e,t,o){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:o?null:e.firstChild}function Ie(e,t,o){return e===t?o?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:o?null:e.lastChild}function De(e,t){if(t===void 0)return!0;let o=e.innerText;return o===void 0&&(o=e.textContent),o=o.trim().toLowerCase(),o.length===0?!1:t.repeating?o[0]===t.keys[0]:o.indexOf(t.keys.join(""))===0}function se(e,t,o,n,i,r){let a=!1,l=i(e,t,t?o:!1);for(;l;){if(l===e.firstChild){if(a)return!1;a=!0}const d=n?!1:l.disabled||l.getAttribute("aria-disabled")==="true";if(!l.hasAttribute("tabindex")||!De(l,r)||d)l=i(e,l,o);else return l.focus(),!0}return!1}const Yt=c.forwardRef(function(t,o){const{actions:n,autoFocus:i=!1,autoFocusItem:r=!1,children:a,className:l,disabledItemsFocusable:d=!1,disableListWrap:m=!1,onKeyDown:x,variant:v="selectedMenu"}=t,R=z(t,Gt),E=c.useRef(null),P=c.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});Ke(()=>{i&&E.current.focus()},[i]),c.useImperativeHandle(n,()=>({adjustStyleForScrollbar:(s,u)=>{const f=!E.current.style.width;if(s.clientHeight<E.current.clientHeight&&f){const T=`${Ae(W(s))}px`;E.current.style[u.direction==="rtl"?"paddingLeft":"paddingRight"]=T,E.current.style.width=`calc(100% + ${T})`}return E.current}}),[]);const N=s=>{const u=E.current,f=s.key,T=W(u).activeElement;if(f==="ArrowDown")s.preventDefault(),se(u,T,m,d,pe);else if(f==="ArrowUp")s.preventDefault(),se(u,T,m,d,Ie);else if(f==="Home")s.preventDefault(),se(u,null,m,d,pe);else if(f==="End")s.preventDefault(),se(u,null,m,d,Ie);else if(f.length===1){const g=P.current,S=f.toLowerCase(),O=performance.now();g.keys.length>0&&(O-g.lastTime>500?(g.keys=[],g.repeating=!0,g.previousKeyMatched=!0):g.repeating&&S!==g.keys[0]&&(g.repeating=!1)),g.lastTime=O,g.keys.push(S);const F=T&&!g.repeating&&De(T,g);g.previousKeyMatched&&(F||se(u,T,!1,d,pe,g))?s.preventDefault():g.previousKeyMatched=!1}x&&x(s)},k=le(E,o);let p=-1;c.Children.forEach(a,(s,u)=>{if(!c.isValidElement(s)){p===u&&(p+=1,p>=a.length&&(p=-1));return}s.props.disabled||(v==="selectedMenu"&&s.props.selected||p===-1)&&(p=u),p===u&&(s.props.disabled||s.props.muiSkipListHighlight||s.type.muiSkipListHighlight)&&(p+=1,p>=a.length&&(p=-1))});const w=c.Children.map(a,(s,u)=>{if(u===p){const f={};return r&&(f.autoFocus=!0),s.props.tabIndex===void 0&&v==="selectedMenu"&&(f.tabIndex=0),c.cloneElement(s,f)}return s});return A.jsx(qt,h({role:"menu",ref:k,className:l,onKeyDown:N,tabIndex:i?0:-1},R,{children:w}))}),Vt=Yt;function Xt(e){return ee("MuiPopover",e)}te("MuiPopover",["root","paper"]);const Jt=["onEntering"],Qt=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps"],Zt=["slotProps"];function Ne(e,t){let o=0;return typeof t=="number"?o=t:t==="center"?o=e.height/2:t==="bottom"&&(o=e.height),o}function Fe(e,t){let o=0;return typeof t=="number"?o=t:t==="center"?o=e.width/2:t==="right"&&(o=e.width),o}function Le(e){return[e.horizontal,e.vertical].map(t=>typeof t=="number"?`${t}px`:t).join(" ")}function fe(e){return typeof e=="function"?e():e}const eo=e=>{const{classes:t}=e;return ne({root:["root"],paper:["paper"]},Xt,t)},to=q(Bt,{name:"MuiPopover",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Be=q(nt,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,t)=>t.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),oo=c.forwardRef(function(t,o){var n,i,r;const a=oe({props:t,name:"MuiPopover"}),{action:l,anchorEl:d,anchorOrigin:m={vertical:"top",horizontal:"left"},anchorPosition:x,anchorReference:v="anchorEl",children:R,className:E,container:P,elevation:N=8,marginThreshold:k=16,open:p,PaperProps:w={},slots:s,slotProps:u,transformOrigin:f={vertical:"top",horizontal:"left"},TransitionComponent:T=Xe,transitionDuration:g="auto",TransitionProps:{onEntering:S}={}}=a,O=z(a.TransitionProps,Jt),F=z(a,Qt),C=(n=u==null?void 0:u.paper)!=null?n:w,D=c.useRef(),H=le(D,C.ref),b=h({},a,{anchorOrigin:m,anchorReference:v,elevation:N,marginThreshold:k,externalPaperSlotProps:C,transformOrigin:f,TransitionComponent:T,transitionDuration:g,TransitionProps:O}),I=eo(b),y=c.useCallback(()=>{if(v==="anchorPosition")return x;const $=fe(d),K=($&&$.nodeType===1?$:W(D.current).body).getBoundingClientRect();return{top:K.top+Ne(K,m.vertical),left:K.left+Fe(K,m.horizontal)}},[d,m.horizontal,m.vertical,x,v]),M=c.useCallback($=>({vertical:Ne($,f.vertical),horizontal:Fe($,f.horizontal)}),[f.horizontal,f.vertical]),B=c.useCallback($=>{const j={width:$.offsetWidth,height:$.offsetHeight},K=M(j);if(v==="none")return{top:null,left:null,transformOrigin:Le(K)};const ve=y();let J=ve.top-K.vertical,Q=ve.left-K.horizontal;const ge=J+j.height,be=Q+j.width,Pe=ae(fe(d)),xe=Pe.innerHeight-k,Ee=Pe.innerWidth-k;if(J<k){const U=J-k;J-=U,K.vertical+=U}else if(ge>xe){const U=ge-xe;J-=U,K.vertical+=U}if(Q<k){const U=Q-k;Q-=U,K.horizontal+=U}else if(be>Ee){const U=be-Ee;Q-=U,K.horizontal+=U}return{top:`${Math.round(J)}px`,left:`${Math.round(Q)}px`,transformOrigin:Le(K)}},[d,v,y,M,k]),[L,_]=c.useState(p),G=c.useCallback(()=>{const $=D.current;if(!$)return;const j=B($);j.top!==null&&($.style.top=j.top),j.left!==null&&($.style.left=j.left),$.style.transformOrigin=j.transformOrigin,_(!0)},[B]),X=($,j)=>{S&&S($,j),G()},ce=()=>{_(!1)};c.useEffect(()=>{p&&G()}),c.useImperativeHandle(l,()=>p?{updatePosition:()=>{G()}}:null,[p,G]),c.useEffect(()=>{if(!p)return;const $=ze(()=>{G()}),j=ae(d);return j.addEventListener("resize",$),()=>{$.clear(),j.removeEventListener("resize",$)}},[d,p,G]);let de=g;g==="auto"&&!T.muiSupportAuto&&(de=void 0);const re=P||(d?W(fe(d)).body:void 0),V=(i=s==null?void 0:s.root)!=null?i:to,he=(r=s==null?void 0:s.paper)!=null?r:Be,_e=Z({elementType:he,externalSlotProps:h({},C,{style:L?C.style:h({},C.style,{opacity:0})}),additionalProps:{elevation:N,ref:H},ownerState:b,className:Y(I.paper,C==null?void 0:C.className)}),me=Z({elementType:V,externalSlotProps:(u==null?void 0:u.root)||{},externalForwardedProps:F,additionalProps:{ref:o,slotProps:{backdrop:{invisible:!0}},container:re,open:p},ownerState:b,className:Y(I.root,E)}),{slotProps:je}=me,He=z(me,Zt);return A.jsx(V,h({},He,!Oe(V)&&{slotProps:je},{children:A.jsx(T,h({appear:!0,in:p,onEntering:X,onExited:ce,timeout:de},O,{children:A.jsx(he,h({},_e,{children:R}))}))}))}),no=oo;function ro(e){return ee("MuiMenu",e)}te("MuiMenu",["root","paper","list"]);const so=["onEntering"],io=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],ao={vertical:"top",horizontal:"right"},lo={vertical:"top",horizontal:"left"},co=e=>{const{classes:t}=e;return ne({root:["root"],paper:["paper"],list:["list"]},ro,t)},uo=q(no,{shouldForwardProp:e=>Ue(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,t)=>t.root})({}),po=q(Be,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,t)=>t.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),fo=q(Vt,{name:"MuiMenu",slot:"List",overridesResolver:(e,t)=>t.list})({outline:0}),ho=c.forwardRef(function(t,o){var n,i;const r=oe({props:t,name:"MuiMenu"}),{autoFocus:a=!0,children:l,className:d,disableAutoFocusItem:m=!1,MenuListProps:x={},onClose:v,open:R,PaperProps:E={},PopoverClasses:P,transitionDuration:N="auto",TransitionProps:{onEntering:k}={},variant:p="selectedMenu",slots:w={},slotProps:s={}}=r,u=z(r.TransitionProps,so),f=z(r,io),T=$e(),g=T.direction==="rtl",S=h({},r,{autoFocus:a,disableAutoFocusItem:m,MenuListProps:x,onEntering:k,PaperProps:E,transitionDuration:N,TransitionProps:u,variant:p}),O=co(S),F=a&&!m&&R,C=c.useRef(null),D=(L,_)=>{C.current&&C.current.adjustStyleForScrollbar(L,T),k&&k(L,_)},H=L=>{L.key==="Tab"&&(L.preventDefault(),v&&v(L,"tabKeyDown"))};let b=-1;c.Children.map(l,(L,_)=>{c.isValidElement(L)&&(L.props.disabled||(p==="selectedMenu"&&L.props.selected||b===-1)&&(b=_))});const I=(n=w.paper)!=null?n:po,y=(i=s.paper)!=null?i:E,M=Z({elementType:w.root,externalSlotProps:s.root,ownerState:S,className:[O.root,d]}),B=Z({elementType:I,externalSlotProps:y,ownerState:S,className:O.paper});return A.jsx(uo,h({onClose:v,anchorOrigin:{vertical:"bottom",horizontal:g?"right":"left"},transformOrigin:g?ao:lo,slots:{paper:I,root:w.root},slotProps:{root:M,paper:B},open:R,ref:o,transitionDuration:N,TransitionProps:h({onEntering:D},u),ownerState:S},f,{classes:P,children:A.jsx(fo,h({onKeyDown:H,actions:C,autoFocus:a&&(b===-1||m),autoFocusItem:F,variant:p},x,{className:Y(O.list,x.className),children:l}))}))}),go=ho;export{jt as L,go as M,nt as P};
