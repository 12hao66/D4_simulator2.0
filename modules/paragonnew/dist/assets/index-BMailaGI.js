(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))l(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&l(s)}).observe(document,{childList:!0,subtree:!0});function t(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(a){if(a.ep)return;a.ep=!0;const r=t(a);fetch(a.href,r)}})();function Nc(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var ho={exports:{}},va={},yo={exports:{}},j={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var xl=Symbol.for("react.element"),vc=Symbol.for("react.portal"),kc=Symbol.for("react.fragment"),Pc=Symbol.for("react.strict_mode"),Rc=Symbol.for("react.profiler"),Bc=Symbol.for("react.provider"),Ic=Symbol.for("react.context"),Mc=Symbol.for("react.forward_ref"),Ac=Symbol.for("react.suspense"),Fc=Symbol.for("react.memo"),Hc=Symbol.for("react.lazy"),ri=Symbol.iterator;function Lc(e){return e===null||typeof e!="object"?null:(e=ri&&e[ri]||e["@@iterator"],typeof e=="function"?e:null)}var Eo={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},fo=Object.assign,_o={};function Ft(e,n,t){this.props=e,this.context=n,this.refs=_o,this.updater=t||Eo}Ft.prototype.isReactComponent={};Ft.prototype.setState=function(e,n){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,n,"setState")};Ft.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function So(){}So.prototype=Ft.prototype;function us(e,n,t){this.props=e,this.context=n,this.refs=_o,this.updater=t||Eo}var ds=us.prototype=new So;ds.constructor=us;fo(ds,Ft.prototype);ds.isPureReactComponent=!0;var si=Array.isArray,Do=Object.prototype.hasOwnProperty,ms={current:null},wo={key:!0,ref:!0,__self:!0,__source:!0};function Co(e,n,t){var l,a={},r=null,s=null;if(n!=null)for(l in n.ref!==void 0&&(s=n.ref),n.key!==void 0&&(r=""+n.key),n)Do.call(n,l)&&!wo.hasOwnProperty(l)&&(a[l]=n[l]);var o=arguments.length-2;if(o===1)a.children=t;else if(1<o){for(var i=Array(o),c=0;c<o;c++)i[c]=arguments[c+2];a.children=i}if(e&&e.defaultProps)for(l in o=e.defaultProps,o)a[l]===void 0&&(a[l]=o[l]);return{$$typeof:xl,type:e,key:r,ref:s,props:a,_owner:ms.current}}function Oc(e,n){return{$$typeof:xl,type:e.type,key:n,ref:e.ref,props:e.props,_owner:e._owner}}function ps(e){return typeof e=="object"&&e!==null&&e.$$typeof===xl}function qc(e){var n={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(t){return n[t]})}var ii=/\/+/g;function Ua(e,n){return typeof e=="object"&&e!==null&&e.key!=null?qc(""+e.key):n.toString(36)}function Ql(e,n,t,l,a){var r=typeof e;(r==="undefined"||r==="boolean")&&(e=null);var s=!1;if(e===null)s=!0;else switch(r){case"string":case"number":s=!0;break;case"object":switch(e.$$typeof){case xl:case vc:s=!0}}if(s)return s=e,a=a(s),e=l===""?"."+Ua(s,0):l,si(a)?(t="",e!=null&&(t=e.replace(ii,"$&/")+"/"),Ql(a,n,t,"",function(c){return c})):a!=null&&(ps(a)&&(a=Oc(a,t+(!a.key||s&&s.key===a.key?"":(""+a.key).replace(ii,"$&/")+"/")+e)),n.push(a)),1;if(s=0,l=l===""?".":l+":",si(e))for(var o=0;o<e.length;o++){r=e[o];var i=l+Ua(r,o);s+=Ql(r,n,t,i,a)}else if(i=Lc(e),typeof i=="function")for(e=i.call(e),o=0;!(r=e.next()).done;)r=r.value,i=l+Ua(r,o++),s+=Ql(r,n,t,i,a);else if(r==="object")throw n=String(e),Error("Objects are not valid as a React child (found: "+(n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.");return s}function kl(e,n,t){if(e==null)return e;var l=[],a=0;return Ql(e,l,"","",function(r){return n.call(t,r,a++)}),l}function jc(e){if(e._status===-1){var n=e._result;n=n(),n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var Ie={current:null},Kl={transition:null},zc={ReactCurrentDispatcher:Ie,ReactCurrentBatchConfig:Kl,ReactCurrentOwner:ms};function xo(){throw Error("act(...) is not supported in production builds of React.")}j.Children={map:kl,forEach:function(e,n,t){kl(e,function(){n.apply(this,arguments)},t)},count:function(e){var n=0;return kl(e,function(){n++}),n},toArray:function(e){return kl(e,function(n){return n})||[]},only:function(e){if(!ps(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};j.Component=Ft;j.Fragment=kc;j.Profiler=Rc;j.PureComponent=us;j.StrictMode=Pc;j.Suspense=Ac;j.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=zc;j.act=xo;j.cloneElement=function(e,n,t){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var l=fo({},e.props),a=e.key,r=e.ref,s=e._owner;if(n!=null){if(n.ref!==void 0&&(r=n.ref,s=ms.current),n.key!==void 0&&(a=""+n.key),e.type&&e.type.defaultProps)var o=e.type.defaultProps;for(i in n)Do.call(n,i)&&!wo.hasOwnProperty(i)&&(l[i]=n[i]===void 0&&o!==void 0?o[i]:n[i])}var i=arguments.length-2;if(i===1)l.children=t;else if(1<i){o=Array(i);for(var c=0;c<i;c++)o[c]=arguments[c+2];l.children=o}return{$$typeof:xl,type:e.type,key:a,ref:r,props:l,_owner:s}};j.createContext=function(e){return e={$$typeof:Ic,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Bc,_context:e},e.Consumer=e};j.createElement=Co;j.createFactory=function(e){var n=Co.bind(null,e);return n.type=e,n};j.createRef=function(){return{current:null}};j.forwardRef=function(e){return{$$typeof:Mc,render:e}};j.isValidElement=ps;j.lazy=function(e){return{$$typeof:Hc,_payload:{_status:-1,_result:e},_init:jc}};j.memo=function(e,n){return{$$typeof:Fc,type:e,compare:n===void 0?null:n}};j.startTransition=function(e){var n=Kl.transition;Kl.transition={};try{e()}finally{Kl.transition=n}};j.unstable_act=xo;j.useCallback=function(e,n){return Ie.current.useCallback(e,n)};j.useContext=function(e){return Ie.current.useContext(e)};j.useDebugValue=function(){};j.useDeferredValue=function(e){return Ie.current.useDeferredValue(e)};j.useEffect=function(e,n){return Ie.current.useEffect(e,n)};j.useId=function(){return Ie.current.useId()};j.useImperativeHandle=function(e,n,t){return Ie.current.useImperativeHandle(e,n,t)};j.useInsertionEffect=function(e,n){return Ie.current.useInsertionEffect(e,n)};j.useLayoutEffect=function(e,n){return Ie.current.useLayoutEffect(e,n)};j.useMemo=function(e,n){return Ie.current.useMemo(e,n)};j.useReducer=function(e,n,t){return Ie.current.useReducer(e,n,t)};j.useRef=function(e){return Ie.current.useRef(e)};j.useState=function(e){return Ie.current.useState(e)};j.useSyncExternalStore=function(e,n,t){return Ie.current.useSyncExternalStore(e,n,t)};j.useTransition=function(){return Ie.current.useTransition()};j.version="18.3.1";yo.exports=j;var F=yo.exports;const $c=Nc(F);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Uc=F,Yc=Symbol.for("react.element"),Qc=Symbol.for("react.fragment"),Kc=Object.prototype.hasOwnProperty,Xc=Uc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Zc={key:!0,ref:!0,__self:!0,__source:!0};function Wo(e,n,t){var l,a={},r=null,s=null;t!==void 0&&(r=""+t),n.key!==void 0&&(r=""+n.key),n.ref!==void 0&&(s=n.ref);for(l in n)Kc.call(n,l)&&!Zc.hasOwnProperty(l)&&(a[l]=n[l]);if(e&&e.defaultProps)for(l in n=e.defaultProps,n)a[l]===void 0&&(a[l]=n[l]);return{$$typeof:Yc,type:e,key:r,ref:s,props:a,_owner:Xc.current}}va.Fragment=Qc;va.jsx=Wo;va.jsxs=Wo;ho.exports=va;var m=ho.exports,Er={},Go={exports:{}},Ke={},Vo={exports:{}},No={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function n(D,B){var M=D.length;D.push(B);e:for(;0<M;){var q=M-1>>>1,H=D[q];if(0<a(H,B))D[q]=B,D[M]=H,M=q;else break e}}function t(D){return D.length===0?null:D[0]}function l(D){if(D.length===0)return null;var B=D[0],M=D.pop();if(M!==B){D[0]=M;e:for(var q=0,H=D.length,te=H>>>1;q<te;){var We=2*(q+1)-1,ke=D[We],he=We+1,Pe=D[he];if(0>a(ke,M))he<H&&0>a(Pe,ke)?(D[q]=Pe,D[he]=M,q=he):(D[q]=ke,D[We]=M,q=We);else if(he<H&&0>a(Pe,M))D[q]=Pe,D[he]=M,q=he;else break e}}return B}function a(D,B){var M=D.sortIndex-B.sortIndex;return M!==0?M:D.id-B.id}if(typeof performance=="object"&&typeof performance.now=="function"){var r=performance;e.unstable_now=function(){return r.now()}}else{var s=Date,o=s.now();e.unstable_now=function(){return s.now()-o}}var i=[],c=[],h=1,p=null,T=3,f=!1,S=!1,x=!1,z=typeof setTimeout=="function"?setTimeout:null,u=typeof clearTimeout=="function"?clearTimeout:null,g=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function d(D){for(var B=t(c);B!==null;){if(B.callback===null)l(c);else if(B.startTime<=D)l(c),B.sortIndex=B.expirationTime,n(i,B);else break;B=t(c)}}function E(D){if(x=!1,d(D),!S)if(t(i)!==null)S=!0,K(N);else{var B=t(c);B!==null&&ne(E,B.startTime-D)}}function N(D,B){S=!1,x&&(x=!1,u(I),I=-1),f=!0;var M=T;try{for(d(B),p=t(i);p!==null&&(!(p.expirationTime>B)||D&&!O());){var q=p.callback;if(typeof q=="function"){p.callback=null,T=p.priorityLevel;var H=q(p.expirationTime<=B);B=e.unstable_now(),typeof H=="function"?p.callback=H:p===t(i)&&l(i),d(B)}else l(i);p=t(i)}if(p!==null)var te=!0;else{var We=t(c);We!==null&&ne(E,We.startTime-B),te=!1}return te}finally{p=null,T=M,f=!1}}var v=!1,P=null,I=-1,ee=5,C=-1;function O(){return!(e.unstable_now()-C<ee)}function V(){if(P!==null){var D=e.unstable_now();C=D;var B=!0;try{B=P(!0,D)}finally{B?A():(v=!1,P=null)}}else v=!1}var A;if(typeof g=="function")A=function(){g(V)};else if(typeof MessageChannel<"u"){var $=new MessageChannel,Q=$.port2;$.port1.onmessage=V,A=function(){Q.postMessage(null)}}else A=function(){z(V,0)};function K(D){P=D,v||(v=!0,A())}function ne(D,B){I=z(function(){D(e.unstable_now())},B)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(D){D.callback=null},e.unstable_continueExecution=function(){S||f||(S=!0,K(N))},e.unstable_forceFrameRate=function(D){0>D||125<D?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):ee=0<D?Math.floor(1e3/D):5},e.unstable_getCurrentPriorityLevel=function(){return T},e.unstable_getFirstCallbackNode=function(){return t(i)},e.unstable_next=function(D){switch(T){case 1:case 2:case 3:var B=3;break;default:B=T}var M=T;T=B;try{return D()}finally{T=M}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(D,B){switch(D){case 1:case 2:case 3:case 4:case 5:break;default:D=3}var M=T;T=D;try{return B()}finally{T=M}},e.unstable_scheduleCallback=function(D,B,M){var q=e.unstable_now();switch(typeof M=="object"&&M!==null?(M=M.delay,M=typeof M=="number"&&0<M?q+M:q):M=q,D){case 1:var H=-1;break;case 2:H=250;break;case 5:H=1073741823;break;case 4:H=1e4;break;default:H=5e3}return H=M+H,D={id:h++,callback:B,priorityLevel:D,startTime:M,expirationTime:H,sortIndex:-1},M>q?(D.sortIndex=M,n(c,D),t(i)===null&&D===t(c)&&(x?(u(I),I=-1):x=!0,ne(E,M-q))):(D.sortIndex=H,n(i,D),S||f||(S=!0,K(N))),D},e.unstable_shouldYield=O,e.unstable_wrapCallback=function(D){var B=T;return function(){var M=T;T=B;try{return D.apply(this,arguments)}finally{T=M}}}})(No);Vo.exports=No;var Jc=Vo.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var bc=F,Qe=Jc;function _(e){for(var n="https://reactjs.org/docs/error-decoder.html?invariant="+e,t=1;t<arguments.length;t++)n+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var vo=new Set,ol={};function it(e,n){kt(e,n),kt(e+"Capture",n)}function kt(e,n){for(ol[e]=n,e=0;e<n.length;e++)vo.add(n[e])}var wn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),fr=Object.prototype.hasOwnProperty,eu=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,oi={},gi={};function nu(e){return fr.call(gi,e)?!0:fr.call(oi,e)?!1:eu.test(e)?gi[e]=!0:(oi[e]=!0,!1)}function tu(e,n,t,l){if(t!==null&&t.type===0)return!1;switch(typeof n){case"function":case"symbol":return!0;case"boolean":return l?!1:t!==null?!t.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function lu(e,n,t,l){if(n===null||typeof n>"u"||tu(e,n,t,l))return!0;if(l)return!1;if(t!==null)switch(t.type){case 3:return!n;case 4:return n===!1;case 5:return isNaN(n);case 6:return isNaN(n)||1>n}return!1}function Me(e,n,t,l,a,r,s){this.acceptsBooleans=n===2||n===3||n===4,this.attributeName=l,this.attributeNamespace=a,this.mustUseProperty=t,this.propertyName=e,this.type=n,this.sanitizeURL=r,this.removeEmptyString=s}var xe={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){xe[e]=new Me(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var n=e[0];xe[n]=new Me(n,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){xe[e]=new Me(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){xe[e]=new Me(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){xe[e]=new Me(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){xe[e]=new Me(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){xe[e]=new Me(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){xe[e]=new Me(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){xe[e]=new Me(e,5,!1,e.toLowerCase(),null,!1,!1)});var Ts=/[\-:]([a-z])/g;function hs(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var n=e.replace(Ts,hs);xe[n]=new Me(n,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var n=e.replace(Ts,hs);xe[n]=new Me(n,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var n=e.replace(Ts,hs);xe[n]=new Me(n,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){xe[e]=new Me(e,1,!1,e.toLowerCase(),null,!1,!1)});xe.xlinkHref=new Me("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){xe[e]=new Me(e,1,!1,e.toLowerCase(),null,!0,!0)});function ys(e,n,t,l){var a=xe.hasOwnProperty(n)?xe[n]:null;(a!==null?a.type!==0:l||!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(lu(n,t,a,l)&&(t=null),l||a===null?nu(n)&&(t===null?e.removeAttribute(n):e.setAttribute(n,""+t)):a.mustUseProperty?e[a.propertyName]=t===null?a.type===3?!1:"":t:(n=a.attributeName,l=a.attributeNamespace,t===null?e.removeAttribute(n):(a=a.type,t=a===3||a===4&&t===!0?"":""+t,l?e.setAttributeNS(l,n,t):e.setAttribute(n,t))))}var Gn=bc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Pl=Symbol.for("react.element"),ut=Symbol.for("react.portal"),dt=Symbol.for("react.fragment"),Es=Symbol.for("react.strict_mode"),_r=Symbol.for("react.profiler"),ko=Symbol.for("react.provider"),Po=Symbol.for("react.context"),fs=Symbol.for("react.forward_ref"),Sr=Symbol.for("react.suspense"),Dr=Symbol.for("react.suspense_list"),_s=Symbol.for("react.memo"),vn=Symbol.for("react.lazy"),Ro=Symbol.for("react.offscreen"),ci=Symbol.iterator;function Ot(e){return e===null||typeof e!="object"?null:(e=ci&&e[ci]||e["@@iterator"],typeof e=="function"?e:null)}var ge=Object.assign,Ya;function Kt(e){if(Ya===void 0)try{throw Error()}catch(t){var n=t.stack.trim().match(/\n( *(at )?)/);Ya=n&&n[1]||""}return`
`+Ya+e}var Qa=!1;function Ka(e,n){if(!e||Qa)return"";Qa=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(n)if(n=function(){throw Error()},Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(n,[])}catch(c){var l=c}Reflect.construct(e,[],n)}else{try{n.call()}catch(c){l=c}e.call(n.prototype)}else{try{throw Error()}catch(c){l=c}e()}}catch(c){if(c&&l&&typeof c.stack=="string"){for(var a=c.stack.split(`
`),r=l.stack.split(`
`),s=a.length-1,o=r.length-1;1<=s&&0<=o&&a[s]!==r[o];)o--;for(;1<=s&&0<=o;s--,o--)if(a[s]!==r[o]){if(s!==1||o!==1)do if(s--,o--,0>o||a[s]!==r[o]){var i=`
`+a[s].replace(" at new "," at ");return e.displayName&&i.includes("<anonymous>")&&(i=i.replace("<anonymous>",e.displayName)),i}while(1<=s&&0<=o);break}}}finally{Qa=!1,Error.prepareStackTrace=t}return(e=e?e.displayName||e.name:"")?Kt(e):""}function au(e){switch(e.tag){case 5:return Kt(e.type);case 16:return Kt("Lazy");case 13:return Kt("Suspense");case 19:return Kt("SuspenseList");case 0:case 2:case 15:return e=Ka(e.type,!1),e;case 11:return e=Ka(e.type.render,!1),e;case 1:return e=Ka(e.type,!0),e;default:return""}}function wr(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case dt:return"Fragment";case ut:return"Portal";case _r:return"Profiler";case Es:return"StrictMode";case Sr:return"Suspense";case Dr:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Po:return(e.displayName||"Context")+".Consumer";case ko:return(e._context.displayName||"Context")+".Provider";case fs:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case _s:return n=e.displayName||null,n!==null?n:wr(e.type)||"Memo";case vn:n=e._payload,e=e._init;try{return wr(e(n))}catch{}}return null}function ru(e){var n=e.type;switch(e.tag){case 24:return"Cache";case 9:return(n.displayName||"Context")+".Consumer";case 10:return(n._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=n.render,e=e.displayName||e.name||"",n.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return n;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return wr(n);case 8:return n===Es?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n}return null}function zn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Bo(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function su(e){var n=Bo(e)?"checked":"value",t=Object.getOwnPropertyDescriptor(e.constructor.prototype,n),l=""+e[n];if(!e.hasOwnProperty(n)&&typeof t<"u"&&typeof t.get=="function"&&typeof t.set=="function"){var a=t.get,r=t.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return a.call(this)},set:function(s){l=""+s,r.call(this,s)}}),Object.defineProperty(e,n,{enumerable:t.enumerable}),{getValue:function(){return l},setValue:function(s){l=""+s},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function Rl(e){e._valueTracker||(e._valueTracker=su(e))}function Io(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var t=n.getValue(),l="";return e&&(l=Bo(e)?e.checked?"true":"false":e.value),e=l,e!==t?(n.setValue(e),!0):!1}function sa(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Cr(e,n){var t=n.checked;return ge({},n,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:t??e._wrapperState.initialChecked})}function ui(e,n){var t=n.defaultValue==null?"":n.defaultValue,l=n.checked!=null?n.checked:n.defaultChecked;t=zn(n.value!=null?n.value:t),e._wrapperState={initialChecked:l,initialValue:t,controlled:n.type==="checkbox"||n.type==="radio"?n.checked!=null:n.value!=null}}function Mo(e,n){n=n.checked,n!=null&&ys(e,"checked",n,!1)}function xr(e,n){Mo(e,n);var t=zn(n.value),l=n.type;if(t!=null)l==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+t):e.value!==""+t&&(e.value=""+t);else if(l==="submit"||l==="reset"){e.removeAttribute("value");return}n.hasOwnProperty("value")?Wr(e,n.type,t):n.hasOwnProperty("defaultValue")&&Wr(e,n.type,zn(n.defaultValue)),n.checked==null&&n.defaultChecked!=null&&(e.defaultChecked=!!n.defaultChecked)}function di(e,n,t){if(n.hasOwnProperty("value")||n.hasOwnProperty("defaultValue")){var l=n.type;if(!(l!=="submit"&&l!=="reset"||n.value!==void 0&&n.value!==null))return;n=""+e._wrapperState.initialValue,t||n===e.value||(e.value=n),e.defaultValue=n}t=e.name,t!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,t!==""&&(e.name=t)}function Wr(e,n,t){(n!=="number"||sa(e.ownerDocument)!==e)&&(t==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+t&&(e.defaultValue=""+t))}var Xt=Array.isArray;function Ct(e,n,t,l){if(e=e.options,n){n={};for(var a=0;a<t.length;a++)n["$"+t[a]]=!0;for(t=0;t<e.length;t++)a=n.hasOwnProperty("$"+e[t].value),e[t].selected!==a&&(e[t].selected=a),a&&l&&(e[t].defaultSelected=!0)}else{for(t=""+zn(t),n=null,a=0;a<e.length;a++){if(e[a].value===t){e[a].selected=!0,l&&(e[a].defaultSelected=!0);return}n!==null||e[a].disabled||(n=e[a])}n!==null&&(n.selected=!0)}}function Gr(e,n){if(n.dangerouslySetInnerHTML!=null)throw Error(_(91));return ge({},n,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function mi(e,n){var t=n.value;if(t==null){if(t=n.children,n=n.defaultValue,t!=null){if(n!=null)throw Error(_(92));if(Xt(t)){if(1<t.length)throw Error(_(93));t=t[0]}n=t}n==null&&(n=""),t=n}e._wrapperState={initialValue:zn(t)}}function Ao(e,n){var t=zn(n.value),l=zn(n.defaultValue);t!=null&&(t=""+t,t!==e.value&&(e.value=t),n.defaultValue==null&&e.defaultValue!==t&&(e.defaultValue=t)),l!=null&&(e.defaultValue=""+l)}function pi(e){var n=e.textContent;n===e._wrapperState.initialValue&&n!==""&&n!==null&&(e.value=n)}function Fo(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Vr(e,n){return e==null||e==="http://www.w3.org/1999/xhtml"?Fo(n):e==="http://www.w3.org/2000/svg"&&n==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Bl,Ho=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(n,t,l,a){MSApp.execUnsafeLocalFunction(function(){return e(n,t,l,a)})}:e}(function(e,n){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=n;else{for(Bl=Bl||document.createElement("div"),Bl.innerHTML="<svg>"+n.valueOf().toString()+"</svg>",n=Bl.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;n.firstChild;)e.appendChild(n.firstChild)}});function gl(e,n){if(n){var t=e.firstChild;if(t&&t===e.lastChild&&t.nodeType===3){t.nodeValue=n;return}}e.textContent=n}var bt={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},iu=["Webkit","ms","Moz","O"];Object.keys(bt).forEach(function(e){iu.forEach(function(n){n=n+e.charAt(0).toUpperCase()+e.substring(1),bt[n]=bt[e]})});function Lo(e,n,t){return n==null||typeof n=="boolean"||n===""?"":t||typeof n!="number"||n===0||bt.hasOwnProperty(e)&&bt[e]?(""+n).trim():n+"px"}function Oo(e,n){e=e.style;for(var t in n)if(n.hasOwnProperty(t)){var l=t.indexOf("--")===0,a=Lo(t,n[t],l);t==="float"&&(t="cssFloat"),l?e.setProperty(t,a):e[t]=a}}var ou=ge({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Nr(e,n){if(n){if(ou[e]&&(n.children!=null||n.dangerouslySetInnerHTML!=null))throw Error(_(137,e));if(n.dangerouslySetInnerHTML!=null){if(n.children!=null)throw Error(_(60));if(typeof n.dangerouslySetInnerHTML!="object"||!("__html"in n.dangerouslySetInnerHTML))throw Error(_(61))}if(n.style!=null&&typeof n.style!="object")throw Error(_(62))}}function vr(e,n){if(e.indexOf("-")===-1)return typeof n.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var kr=null;function Ss(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Pr=null,xt=null,Wt=null;function Ti(e){if(e=Vl(e)){if(typeof Pr!="function")throw Error(_(280));var n=e.stateNode;n&&(n=Ia(n),Pr(e.stateNode,e.type,n))}}function qo(e){xt?Wt?Wt.push(e):Wt=[e]:xt=e}function jo(){if(xt){var e=xt,n=Wt;if(Wt=xt=null,Ti(e),n)for(e=0;e<n.length;e++)Ti(n[e])}}function zo(e,n){return e(n)}function $o(){}var Xa=!1;function Uo(e,n,t){if(Xa)return e(n,t);Xa=!0;try{return zo(e,n,t)}finally{Xa=!1,(xt!==null||Wt!==null)&&($o(),jo())}}function cl(e,n){var t=e.stateNode;if(t===null)return null;var l=Ia(t);if(l===null)return null;t=l[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(e=e.type,l=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!l;break e;default:e=!1}if(e)return null;if(t&&typeof t!="function")throw Error(_(231,n,typeof t));return t}var Rr=!1;if(wn)try{var qt={};Object.defineProperty(qt,"passive",{get:function(){Rr=!0}}),window.addEventListener("test",qt,qt),window.removeEventListener("test",qt,qt)}catch{Rr=!1}function gu(e,n,t,l,a,r,s,o,i){var c=Array.prototype.slice.call(arguments,3);try{n.apply(t,c)}catch(h){this.onError(h)}}var el=!1,ia=null,oa=!1,Br=null,cu={onError:function(e){el=!0,ia=e}};function uu(e,n,t,l,a,r,s,o,i){el=!1,ia=null,gu.apply(cu,arguments)}function du(e,n,t,l,a,r,s,o,i){if(uu.apply(this,arguments),el){if(el){var c=ia;el=!1,ia=null}else throw Error(_(198));oa||(oa=!0,Br=c)}}function ot(e){var n=e,t=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,n.flags&4098&&(t=n.return),e=n.return;while(e)}return n.tag===3?t:null}function Yo(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function hi(e){if(ot(e)!==e)throw Error(_(188))}function mu(e){var n=e.alternate;if(!n){if(n=ot(e),n===null)throw Error(_(188));return n!==e?null:e}for(var t=e,l=n;;){var a=t.return;if(a===null)break;var r=a.alternate;if(r===null){if(l=a.return,l!==null){t=l;continue}break}if(a.child===r.child){for(r=a.child;r;){if(r===t)return hi(a),e;if(r===l)return hi(a),n;r=r.sibling}throw Error(_(188))}if(t.return!==l.return)t=a,l=r;else{for(var s=!1,o=a.child;o;){if(o===t){s=!0,t=a,l=r;break}if(o===l){s=!0,l=a,t=r;break}o=o.sibling}if(!s){for(o=r.child;o;){if(o===t){s=!0,t=r,l=a;break}if(o===l){s=!0,l=r,t=a;break}o=o.sibling}if(!s)throw Error(_(189))}}if(t.alternate!==l)throw Error(_(190))}if(t.tag!==3)throw Error(_(188));return t.stateNode.current===t?e:n}function Qo(e){return e=mu(e),e!==null?Ko(e):null}function Ko(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var n=Ko(e);if(n!==null)return n;e=e.sibling}return null}var Xo=Qe.unstable_scheduleCallback,yi=Qe.unstable_cancelCallback,pu=Qe.unstable_shouldYield,Tu=Qe.unstable_requestPaint,pe=Qe.unstable_now,hu=Qe.unstable_getCurrentPriorityLevel,Ds=Qe.unstable_ImmediatePriority,Zo=Qe.unstable_UserBlockingPriority,ga=Qe.unstable_NormalPriority,yu=Qe.unstable_LowPriority,Jo=Qe.unstable_IdlePriority,ka=null,Tn=null;function Eu(e){if(Tn&&typeof Tn.onCommitFiberRoot=="function")try{Tn.onCommitFiberRoot(ka,e,void 0,(e.current.flags&128)===128)}catch{}}var gn=Math.clz32?Math.clz32:Su,fu=Math.log,_u=Math.LN2;function Su(e){return e>>>=0,e===0?32:31-(fu(e)/_u|0)|0}var Il=64,Ml=4194304;function Zt(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function ca(e,n){var t=e.pendingLanes;if(t===0)return 0;var l=0,a=e.suspendedLanes,r=e.pingedLanes,s=t&268435455;if(s!==0){var o=s&~a;o!==0?l=Zt(o):(r&=s,r!==0&&(l=Zt(r)))}else s=t&~a,s!==0?l=Zt(s):r!==0&&(l=Zt(r));if(l===0)return 0;if(n!==0&&n!==l&&!(n&a)&&(a=l&-l,r=n&-n,a>=r||a===16&&(r&4194240)!==0))return n;if(l&4&&(l|=t&16),n=e.entangledLanes,n!==0)for(e=e.entanglements,n&=l;0<n;)t=31-gn(n),a=1<<t,l|=e[t],n&=~a;return l}function Du(e,n){switch(e){case 1:case 2:case 4:return n+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function wu(e,n){for(var t=e.suspendedLanes,l=e.pingedLanes,a=e.expirationTimes,r=e.pendingLanes;0<r;){var s=31-gn(r),o=1<<s,i=a[s];i===-1?(!(o&t)||o&l)&&(a[s]=Du(o,n)):i<=n&&(e.expiredLanes|=o),r&=~o}}function Ir(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function bo(){var e=Il;return Il<<=1,!(Il&4194240)&&(Il=64),e}function Za(e){for(var n=[],t=0;31>t;t++)n.push(e);return n}function Wl(e,n,t){e.pendingLanes|=n,n!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,n=31-gn(n),e[n]=t}function Cu(e,n){var t=e.pendingLanes&~n;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=n,e.mutableReadLanes&=n,e.entangledLanes&=n,n=e.entanglements;var l=e.eventTimes;for(e=e.expirationTimes;0<t;){var a=31-gn(t),r=1<<a;n[a]=0,l[a]=-1,e[a]=-1,t&=~r}}function ws(e,n){var t=e.entangledLanes|=n;for(e=e.entanglements;t;){var l=31-gn(t),a=1<<l;a&n|e[l]&n&&(e[l]|=n),t&=~a}}var J=0;function eg(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var ng,Cs,tg,lg,ag,Mr=!1,Al=[],Mn=null,An=null,Fn=null,ul=new Map,dl=new Map,Pn=[],xu="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Ei(e,n){switch(e){case"focusin":case"focusout":Mn=null;break;case"dragenter":case"dragleave":An=null;break;case"mouseover":case"mouseout":Fn=null;break;case"pointerover":case"pointerout":ul.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":dl.delete(n.pointerId)}}function jt(e,n,t,l,a,r){return e===null||e.nativeEvent!==r?(e={blockedOn:n,domEventName:t,eventSystemFlags:l,nativeEvent:r,targetContainers:[a]},n!==null&&(n=Vl(n),n!==null&&Cs(n)),e):(e.eventSystemFlags|=l,n=e.targetContainers,a!==null&&n.indexOf(a)===-1&&n.push(a),e)}function Wu(e,n,t,l,a){switch(n){case"focusin":return Mn=jt(Mn,e,n,t,l,a),!0;case"dragenter":return An=jt(An,e,n,t,l,a),!0;case"mouseover":return Fn=jt(Fn,e,n,t,l,a),!0;case"pointerover":var r=a.pointerId;return ul.set(r,jt(ul.get(r)||null,e,n,t,l,a)),!0;case"gotpointercapture":return r=a.pointerId,dl.set(r,jt(dl.get(r)||null,e,n,t,l,a)),!0}return!1}function rg(e){var n=Zn(e.target);if(n!==null){var t=ot(n);if(t!==null){if(n=t.tag,n===13){if(n=Yo(t),n!==null){e.blockedOn=n,ag(e.priority,function(){tg(t)});return}}else if(n===3&&t.stateNode.current.memoizedState.isDehydrated){e.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Xl(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var t=Ar(e.domEventName,e.eventSystemFlags,n[0],e.nativeEvent);if(t===null){t=e.nativeEvent;var l=new t.constructor(t.type,t);kr=l,t.target.dispatchEvent(l),kr=null}else return n=Vl(t),n!==null&&Cs(n),e.blockedOn=t,!1;n.shift()}return!0}function fi(e,n,t){Xl(e)&&t.delete(n)}function Gu(){Mr=!1,Mn!==null&&Xl(Mn)&&(Mn=null),An!==null&&Xl(An)&&(An=null),Fn!==null&&Xl(Fn)&&(Fn=null),ul.forEach(fi),dl.forEach(fi)}function zt(e,n){e.blockedOn===n&&(e.blockedOn=null,Mr||(Mr=!0,Qe.unstable_scheduleCallback(Qe.unstable_NormalPriority,Gu)))}function ml(e){function n(a){return zt(a,e)}if(0<Al.length){zt(Al[0],e);for(var t=1;t<Al.length;t++){var l=Al[t];l.blockedOn===e&&(l.blockedOn=null)}}for(Mn!==null&&zt(Mn,e),An!==null&&zt(An,e),Fn!==null&&zt(Fn,e),ul.forEach(n),dl.forEach(n),t=0;t<Pn.length;t++)l=Pn[t],l.blockedOn===e&&(l.blockedOn=null);for(;0<Pn.length&&(t=Pn[0],t.blockedOn===null);)rg(t),t.blockedOn===null&&Pn.shift()}var Gt=Gn.ReactCurrentBatchConfig,ua=!0;function Vu(e,n,t,l){var a=J,r=Gt.transition;Gt.transition=null;try{J=1,xs(e,n,t,l)}finally{J=a,Gt.transition=r}}function Nu(e,n,t,l){var a=J,r=Gt.transition;Gt.transition=null;try{J=4,xs(e,n,t,l)}finally{J=a,Gt.transition=r}}function xs(e,n,t,l){if(ua){var a=Ar(e,n,t,l);if(a===null)ir(e,n,l,da,t),Ei(e,l);else if(Wu(a,e,n,t,l))l.stopPropagation();else if(Ei(e,l),n&4&&-1<xu.indexOf(e)){for(;a!==null;){var r=Vl(a);if(r!==null&&ng(r),r=Ar(e,n,t,l),r===null&&ir(e,n,l,da,t),r===a)break;a=r}a!==null&&l.stopPropagation()}else ir(e,n,l,null,t)}}var da=null;function Ar(e,n,t,l){if(da=null,e=Ss(l),e=Zn(e),e!==null)if(n=ot(e),n===null)e=null;else if(t=n.tag,t===13){if(e=Yo(n),e!==null)return e;e=null}else if(t===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null);return da=e,null}function sg(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(hu()){case Ds:return 1;case Zo:return 4;case ga:case yu:return 16;case Jo:return 536870912;default:return 16}default:return 16}}var Bn=null,Ws=null,Zl=null;function ig(){if(Zl)return Zl;var e,n=Ws,t=n.length,l,a="value"in Bn?Bn.value:Bn.textContent,r=a.length;for(e=0;e<t&&n[e]===a[e];e++);var s=t-e;for(l=1;l<=s&&n[t-l]===a[r-l];l++);return Zl=a.slice(e,1<l?1-l:void 0)}function Jl(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function Fl(){return!0}function _i(){return!1}function Xe(e){function n(t,l,a,r,s){this._reactName=t,this._targetInst=a,this.type=l,this.nativeEvent=r,this.target=s,this.currentTarget=null;for(var o in e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(r):r[o]);return this.isDefaultPrevented=(r.defaultPrevented!=null?r.defaultPrevented:r.returnValue===!1)?Fl:_i,this.isPropagationStopped=_i,this}return ge(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=Fl)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=Fl)},persist:function(){},isPersistent:Fl}),n}var Ht={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Gs=Xe(Ht),Gl=ge({},Ht,{view:0,detail:0}),vu=Xe(Gl),Ja,ba,$t,Pa=ge({},Gl,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Vs,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==$t&&($t&&e.type==="mousemove"?(Ja=e.screenX-$t.screenX,ba=e.screenY-$t.screenY):ba=Ja=0,$t=e),Ja)},movementY:function(e){return"movementY"in e?e.movementY:ba}}),Si=Xe(Pa),ku=ge({},Pa,{dataTransfer:0}),Pu=Xe(ku),Ru=ge({},Gl,{relatedTarget:0}),er=Xe(Ru),Bu=ge({},Ht,{animationName:0,elapsedTime:0,pseudoElement:0}),Iu=Xe(Bu),Mu=ge({},Ht,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Au=Xe(Mu),Fu=ge({},Ht,{data:0}),Di=Xe(Fu),Hu={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Lu={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Ou={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function qu(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=Ou[e])?!!n[e]:!1}function Vs(){return qu}var ju=ge({},Gl,{key:function(e){if(e.key){var n=Hu[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=Jl(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Lu[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Vs,charCode:function(e){return e.type==="keypress"?Jl(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Jl(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),zu=Xe(ju),$u=ge({},Pa,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),wi=Xe($u),Uu=ge({},Gl,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Vs}),Yu=Xe(Uu),Qu=ge({},Ht,{propertyName:0,elapsedTime:0,pseudoElement:0}),Ku=Xe(Qu),Xu=ge({},Pa,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Zu=Xe(Xu),Ju=[9,13,27,32],Ns=wn&&"CompositionEvent"in window,nl=null;wn&&"documentMode"in document&&(nl=document.documentMode);var bu=wn&&"TextEvent"in window&&!nl,og=wn&&(!Ns||nl&&8<nl&&11>=nl),Ci=" ",xi=!1;function gg(e,n){switch(e){case"keyup":return Ju.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function cg(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var mt=!1;function ed(e,n){switch(e){case"compositionend":return cg(n);case"keypress":return n.which!==32?null:(xi=!0,Ci);case"textInput":return e=n.data,e===Ci&&xi?null:e;default:return null}}function nd(e,n){if(mt)return e==="compositionend"||!Ns&&gg(e,n)?(e=ig(),Zl=Ws=Bn=null,mt=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return og&&n.locale!=="ko"?null:n.data;default:return null}}var td={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Wi(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!td[e.type]:n==="textarea"}function ug(e,n,t,l){qo(l),n=ma(n,"onChange"),0<n.length&&(t=new Gs("onChange","change",null,t,l),e.push({event:t,listeners:n}))}var tl=null,pl=null;function ld(e){Dg(e,0)}function Ra(e){var n=ht(e);if(Io(n))return e}function ad(e,n){if(e==="change")return n}var dg=!1;if(wn){var nr;if(wn){var tr="oninput"in document;if(!tr){var Gi=document.createElement("div");Gi.setAttribute("oninput","return;"),tr=typeof Gi.oninput=="function"}nr=tr}else nr=!1;dg=nr&&(!document.documentMode||9<document.documentMode)}function Vi(){tl&&(tl.detachEvent("onpropertychange",mg),pl=tl=null)}function mg(e){if(e.propertyName==="value"&&Ra(pl)){var n=[];ug(n,pl,e,Ss(e)),Uo(ld,n)}}function rd(e,n,t){e==="focusin"?(Vi(),tl=n,pl=t,tl.attachEvent("onpropertychange",mg)):e==="focusout"&&Vi()}function sd(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Ra(pl)}function id(e,n){if(e==="click")return Ra(n)}function od(e,n){if(e==="input"||e==="change")return Ra(n)}function gd(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var un=typeof Object.is=="function"?Object.is:gd;function Tl(e,n){if(un(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var t=Object.keys(e),l=Object.keys(n);if(t.length!==l.length)return!1;for(l=0;l<t.length;l++){var a=t[l];if(!fr.call(n,a)||!un(e[a],n[a]))return!1}return!0}function Ni(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function vi(e,n){var t=Ni(e);e=0;for(var l;t;){if(t.nodeType===3){if(l=e+t.textContent.length,e<=n&&l>=n)return{node:t,offset:n-e};e=l}e:{for(;t;){if(t.nextSibling){t=t.nextSibling;break e}t=t.parentNode}t=void 0}t=Ni(t)}}function pg(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?pg(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function Tg(){for(var e=window,n=sa();n instanceof e.HTMLIFrameElement;){try{var t=typeof n.contentWindow.location.href=="string"}catch{t=!1}if(t)e=n.contentWindow;else break;n=sa(e.document)}return n}function vs(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}function cd(e){var n=Tg(),t=e.focusedElem,l=e.selectionRange;if(n!==t&&t&&t.ownerDocument&&pg(t.ownerDocument.documentElement,t)){if(l!==null&&vs(t)){if(n=l.start,e=l.end,e===void 0&&(e=n),"selectionStart"in t)t.selectionStart=n,t.selectionEnd=Math.min(e,t.value.length);else if(e=(n=t.ownerDocument||document)&&n.defaultView||window,e.getSelection){e=e.getSelection();var a=t.textContent.length,r=Math.min(l.start,a);l=l.end===void 0?r:Math.min(l.end,a),!e.extend&&r>l&&(a=l,l=r,r=a),a=vi(t,r);var s=vi(t,l);a&&s&&(e.rangeCount!==1||e.anchorNode!==a.node||e.anchorOffset!==a.offset||e.focusNode!==s.node||e.focusOffset!==s.offset)&&(n=n.createRange(),n.setStart(a.node,a.offset),e.removeAllRanges(),r>l?(e.addRange(n),e.extend(s.node,s.offset)):(n.setEnd(s.node,s.offset),e.addRange(n)))}}for(n=[],e=t;e=e.parentNode;)e.nodeType===1&&n.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof t.focus=="function"&&t.focus(),t=0;t<n.length;t++)e=n[t],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var ud=wn&&"documentMode"in document&&11>=document.documentMode,pt=null,Fr=null,ll=null,Hr=!1;function ki(e,n,t){var l=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;Hr||pt==null||pt!==sa(l)||(l=pt,"selectionStart"in l&&vs(l)?l={start:l.selectionStart,end:l.selectionEnd}:(l=(l.ownerDocument&&l.ownerDocument.defaultView||window).getSelection(),l={anchorNode:l.anchorNode,anchorOffset:l.anchorOffset,focusNode:l.focusNode,focusOffset:l.focusOffset}),ll&&Tl(ll,l)||(ll=l,l=ma(Fr,"onSelect"),0<l.length&&(n=new Gs("onSelect","select",null,n,t),e.push({event:n,listeners:l}),n.target=pt)))}function Hl(e,n){var t={};return t[e.toLowerCase()]=n.toLowerCase(),t["Webkit"+e]="webkit"+n,t["Moz"+e]="moz"+n,t}var Tt={animationend:Hl("Animation","AnimationEnd"),animationiteration:Hl("Animation","AnimationIteration"),animationstart:Hl("Animation","AnimationStart"),transitionend:Hl("Transition","TransitionEnd")},lr={},hg={};wn&&(hg=document.createElement("div").style,"AnimationEvent"in window||(delete Tt.animationend.animation,delete Tt.animationiteration.animation,delete Tt.animationstart.animation),"TransitionEvent"in window||delete Tt.transitionend.transition);function Ba(e){if(lr[e])return lr[e];if(!Tt[e])return e;var n=Tt[e],t;for(t in n)if(n.hasOwnProperty(t)&&t in hg)return lr[e]=n[t];return e}var yg=Ba("animationend"),Eg=Ba("animationiteration"),fg=Ba("animationstart"),_g=Ba("transitionend"),Sg=new Map,Pi="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Un(e,n){Sg.set(e,n),it(n,[e])}for(var ar=0;ar<Pi.length;ar++){var rr=Pi[ar],dd=rr.toLowerCase(),md=rr[0].toUpperCase()+rr.slice(1);Un(dd,"on"+md)}Un(yg,"onAnimationEnd");Un(Eg,"onAnimationIteration");Un(fg,"onAnimationStart");Un("dblclick","onDoubleClick");Un("focusin","onFocus");Un("focusout","onBlur");Un(_g,"onTransitionEnd");kt("onMouseEnter",["mouseout","mouseover"]);kt("onMouseLeave",["mouseout","mouseover"]);kt("onPointerEnter",["pointerout","pointerover"]);kt("onPointerLeave",["pointerout","pointerover"]);it("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));it("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));it("onBeforeInput",["compositionend","keypress","textInput","paste"]);it("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));it("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));it("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Jt="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),pd=new Set("cancel close invalid load scroll toggle".split(" ").concat(Jt));function Ri(e,n,t){var l=e.type||"unknown-event";e.currentTarget=t,du(l,n,void 0,e),e.currentTarget=null}function Dg(e,n){n=(n&4)!==0;for(var t=0;t<e.length;t++){var l=e[t],a=l.event;l=l.listeners;e:{var r=void 0;if(n)for(var s=l.length-1;0<=s;s--){var o=l[s],i=o.instance,c=o.currentTarget;if(o=o.listener,i!==r&&a.isPropagationStopped())break e;Ri(a,o,c),r=i}else for(s=0;s<l.length;s++){if(o=l[s],i=o.instance,c=o.currentTarget,o=o.listener,i!==r&&a.isPropagationStopped())break e;Ri(a,o,c),r=i}}}if(oa)throw e=Br,oa=!1,Br=null,e}function ae(e,n){var t=n[zr];t===void 0&&(t=n[zr]=new Set);var l=e+"__bubble";t.has(l)||(wg(n,e,2,!1),t.add(l))}function sr(e,n,t){var l=0;n&&(l|=4),wg(t,e,l,n)}var Ll="_reactListening"+Math.random().toString(36).slice(2);function hl(e){if(!e[Ll]){e[Ll]=!0,vo.forEach(function(t){t!=="selectionchange"&&(pd.has(t)||sr(t,!1,e),sr(t,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[Ll]||(n[Ll]=!0,sr("selectionchange",!1,n))}}function wg(e,n,t,l){switch(sg(n)){case 1:var a=Vu;break;case 4:a=Nu;break;default:a=xs}t=a.bind(null,n,t,e),a=void 0,!Rr||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(a=!0),l?a!==void 0?e.addEventListener(n,t,{capture:!0,passive:a}):e.addEventListener(n,t,!0):a!==void 0?e.addEventListener(n,t,{passive:a}):e.addEventListener(n,t,!1)}function ir(e,n,t,l,a){var r=l;if(!(n&1)&&!(n&2)&&l!==null)e:for(;;){if(l===null)return;var s=l.tag;if(s===3||s===4){var o=l.stateNode.containerInfo;if(o===a||o.nodeType===8&&o.parentNode===a)break;if(s===4)for(s=l.return;s!==null;){var i=s.tag;if((i===3||i===4)&&(i=s.stateNode.containerInfo,i===a||i.nodeType===8&&i.parentNode===a))return;s=s.return}for(;o!==null;){if(s=Zn(o),s===null)return;if(i=s.tag,i===5||i===6){l=r=s;continue e}o=o.parentNode}}l=l.return}Uo(function(){var c=r,h=Ss(t),p=[];e:{var T=Sg.get(e);if(T!==void 0){var f=Gs,S=e;switch(e){case"keypress":if(Jl(t)===0)break e;case"keydown":case"keyup":f=zu;break;case"focusin":S="focus",f=er;break;case"focusout":S="blur",f=er;break;case"beforeblur":case"afterblur":f=er;break;case"click":if(t.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":f=Si;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":f=Pu;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":f=Yu;break;case yg:case Eg:case fg:f=Iu;break;case _g:f=Ku;break;case"scroll":f=vu;break;case"wheel":f=Zu;break;case"copy":case"cut":case"paste":f=Au;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":f=wi}var x=(n&4)!==0,z=!x&&e==="scroll",u=x?T!==null?T+"Capture":null:T;x=[];for(var g=c,d;g!==null;){d=g;var E=d.stateNode;if(d.tag===5&&E!==null&&(d=E,u!==null&&(E=cl(g,u),E!=null&&x.push(yl(g,E,d)))),z)break;g=g.return}0<x.length&&(T=new f(T,S,null,t,h),p.push({event:T,listeners:x}))}}if(!(n&7)){e:{if(T=e==="mouseover"||e==="pointerover",f=e==="mouseout"||e==="pointerout",T&&t!==kr&&(S=t.relatedTarget||t.fromElement)&&(Zn(S)||S[Cn]))break e;if((f||T)&&(T=h.window===h?h:(T=h.ownerDocument)?T.defaultView||T.parentWindow:window,f?(S=t.relatedTarget||t.toElement,f=c,S=S?Zn(S):null,S!==null&&(z=ot(S),S!==z||S.tag!==5&&S.tag!==6)&&(S=null)):(f=null,S=c),f!==S)){if(x=Si,E="onMouseLeave",u="onMouseEnter",g="mouse",(e==="pointerout"||e==="pointerover")&&(x=wi,E="onPointerLeave",u="onPointerEnter",g="pointer"),z=f==null?T:ht(f),d=S==null?T:ht(S),T=new x(E,g+"leave",f,t,h),T.target=z,T.relatedTarget=d,E=null,Zn(h)===c&&(x=new x(u,g+"enter",S,t,h),x.target=d,x.relatedTarget=z,E=x),z=E,f&&S)n:{for(x=f,u=S,g=0,d=x;d;d=ct(d))g++;for(d=0,E=u;E;E=ct(E))d++;for(;0<g-d;)x=ct(x),g--;for(;0<d-g;)u=ct(u),d--;for(;g--;){if(x===u||u!==null&&x===u.alternate)break n;x=ct(x),u=ct(u)}x=null}else x=null;f!==null&&Bi(p,T,f,x,!1),S!==null&&z!==null&&Bi(p,z,S,x,!0)}}e:{if(T=c?ht(c):window,f=T.nodeName&&T.nodeName.toLowerCase(),f==="select"||f==="input"&&T.type==="file")var N=ad;else if(Wi(T))if(dg)N=od;else{N=sd;var v=rd}else(f=T.nodeName)&&f.toLowerCase()==="input"&&(T.type==="checkbox"||T.type==="radio")&&(N=id);if(N&&(N=N(e,c))){ug(p,N,t,h);break e}v&&v(e,T,c),e==="focusout"&&(v=T._wrapperState)&&v.controlled&&T.type==="number"&&Wr(T,"number",T.value)}switch(v=c?ht(c):window,e){case"focusin":(Wi(v)||v.contentEditable==="true")&&(pt=v,Fr=c,ll=null);break;case"focusout":ll=Fr=pt=null;break;case"mousedown":Hr=!0;break;case"contextmenu":case"mouseup":case"dragend":Hr=!1,ki(p,t,h);break;case"selectionchange":if(ud)break;case"keydown":case"keyup":ki(p,t,h)}var P;if(Ns)e:{switch(e){case"compositionstart":var I="onCompositionStart";break e;case"compositionend":I="onCompositionEnd";break e;case"compositionupdate":I="onCompositionUpdate";break e}I=void 0}else mt?gg(e,t)&&(I="onCompositionEnd"):e==="keydown"&&t.keyCode===229&&(I="onCompositionStart");I&&(og&&t.locale!=="ko"&&(mt||I!=="onCompositionStart"?I==="onCompositionEnd"&&mt&&(P=ig()):(Bn=h,Ws="value"in Bn?Bn.value:Bn.textContent,mt=!0)),v=ma(c,I),0<v.length&&(I=new Di(I,e,null,t,h),p.push({event:I,listeners:v}),P?I.data=P:(P=cg(t),P!==null&&(I.data=P)))),(P=bu?ed(e,t):nd(e,t))&&(c=ma(c,"onBeforeInput"),0<c.length&&(h=new Di("onBeforeInput","beforeinput",null,t,h),p.push({event:h,listeners:c}),h.data=P))}Dg(p,n)})}function yl(e,n,t){return{instance:e,listener:n,currentTarget:t}}function ma(e,n){for(var t=n+"Capture",l=[];e!==null;){var a=e,r=a.stateNode;a.tag===5&&r!==null&&(a=r,r=cl(e,t),r!=null&&l.unshift(yl(e,r,a)),r=cl(e,n),r!=null&&l.push(yl(e,r,a))),e=e.return}return l}function ct(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Bi(e,n,t,l,a){for(var r=n._reactName,s=[];t!==null&&t!==l;){var o=t,i=o.alternate,c=o.stateNode;if(i!==null&&i===l)break;o.tag===5&&c!==null&&(o=c,a?(i=cl(t,r),i!=null&&s.unshift(yl(t,i,o))):a||(i=cl(t,r),i!=null&&s.push(yl(t,i,o)))),t=t.return}s.length!==0&&e.push({event:n,listeners:s})}var Td=/\r\n?/g,hd=/\u0000|\uFFFD/g;function Ii(e){return(typeof e=="string"?e:""+e).replace(Td,`
`).replace(hd,"")}function Ol(e,n,t){if(n=Ii(n),Ii(e)!==n&&t)throw Error(_(425))}function pa(){}var Lr=null,Or=null;function qr(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var jr=typeof setTimeout=="function"?setTimeout:void 0,yd=typeof clearTimeout=="function"?clearTimeout:void 0,Mi=typeof Promise=="function"?Promise:void 0,Ed=typeof queueMicrotask=="function"?queueMicrotask:typeof Mi<"u"?function(e){return Mi.resolve(null).then(e).catch(fd)}:jr;function fd(e){setTimeout(function(){throw e})}function or(e,n){var t=n,l=0;do{var a=t.nextSibling;if(e.removeChild(t),a&&a.nodeType===8)if(t=a.data,t==="/$"){if(l===0){e.removeChild(a),ml(n);return}l--}else t!=="$"&&t!=="$?"&&t!=="$!"||l++;t=a}while(t);ml(n)}function Hn(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?")break;if(n==="/$")return null}}return e}function Ai(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="$"||t==="$!"||t==="$?"){if(n===0)return e;n--}else t==="/$"&&n++}e=e.previousSibling}return null}var Lt=Math.random().toString(36).slice(2),pn="__reactFiber$"+Lt,El="__reactProps$"+Lt,Cn="__reactContainer$"+Lt,zr="__reactEvents$"+Lt,_d="__reactListeners$"+Lt,Sd="__reactHandles$"+Lt;function Zn(e){var n=e[pn];if(n)return n;for(var t=e.parentNode;t;){if(n=t[Cn]||t[pn]){if(t=n.alternate,n.child!==null||t!==null&&t.child!==null)for(e=Ai(e);e!==null;){if(t=e[pn])return t;e=Ai(e)}return n}e=t,t=e.parentNode}return null}function Vl(e){return e=e[pn]||e[Cn],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function ht(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(_(33))}function Ia(e){return e[El]||null}var $r=[],yt=-1;function Yn(e){return{current:e}}function re(e){0>yt||(e.current=$r[yt],$r[yt]=null,yt--)}function b(e,n){yt++,$r[yt]=e.current,e.current=n}var $n={},ve=Yn($n),Le=Yn(!1),tt=$n;function Pt(e,n){var t=e.type.contextTypes;if(!t)return $n;var l=e.stateNode;if(l&&l.__reactInternalMemoizedUnmaskedChildContext===n)return l.__reactInternalMemoizedMaskedChildContext;var a={},r;for(r in t)a[r]=n[r];return l&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=n,e.__reactInternalMemoizedMaskedChildContext=a),a}function Oe(e){return e=e.childContextTypes,e!=null}function Ta(){re(Le),re(ve)}function Fi(e,n,t){if(ve.current!==$n)throw Error(_(168));b(ve,n),b(Le,t)}function Cg(e,n,t){var l=e.stateNode;if(n=n.childContextTypes,typeof l.getChildContext!="function")return t;l=l.getChildContext();for(var a in l)if(!(a in n))throw Error(_(108,ru(e)||"Unknown",a));return ge({},t,l)}function ha(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||$n,tt=ve.current,b(ve,e),b(Le,Le.current),!0}function Hi(e,n,t){var l=e.stateNode;if(!l)throw Error(_(169));t?(e=Cg(e,n,tt),l.__reactInternalMemoizedMergedChildContext=e,re(Le),re(ve),b(ve,e)):re(Le),b(Le,t)}var fn=null,Ma=!1,gr=!1;function xg(e){fn===null?fn=[e]:fn.push(e)}function Dd(e){Ma=!0,xg(e)}function Qn(){if(!gr&&fn!==null){gr=!0;var e=0,n=J;try{var t=fn;for(J=1;e<t.length;e++){var l=t[e];do l=l(!0);while(l!==null)}fn=null,Ma=!1}catch(a){throw fn!==null&&(fn=fn.slice(e+1)),Xo(Ds,Qn),a}finally{J=n,gr=!1}}return null}var Et=[],ft=0,ya=null,Ea=0,Ze=[],Je=0,lt=null,_n=1,Sn="";function Kn(e,n){Et[ft++]=Ea,Et[ft++]=ya,ya=e,Ea=n}function Wg(e,n,t){Ze[Je++]=_n,Ze[Je++]=Sn,Ze[Je++]=lt,lt=e;var l=_n;e=Sn;var a=32-gn(l)-1;l&=~(1<<a),t+=1;var r=32-gn(n)+a;if(30<r){var s=a-a%5;r=(l&(1<<s)-1).toString(32),l>>=s,a-=s,_n=1<<32-gn(n)+a|t<<a|l,Sn=r+e}else _n=1<<r|t<<a|l,Sn=e}function ks(e){e.return!==null&&(Kn(e,1),Wg(e,1,0))}function Ps(e){for(;e===ya;)ya=Et[--ft],Et[ft]=null,Ea=Et[--ft],Et[ft]=null;for(;e===lt;)lt=Ze[--Je],Ze[Je]=null,Sn=Ze[--Je],Ze[Je]=null,_n=Ze[--Je],Ze[Je]=null}var Ye=null,Ue=null,se=!1,on=null;function Gg(e,n){var t=be(5,null,null,0);t.elementType="DELETED",t.stateNode=n,t.return=e,n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)}function Li(e,n){switch(e.tag){case 5:var t=e.type;return n=n.nodeType!==1||t.toLowerCase()!==n.nodeName.toLowerCase()?null:n,n!==null?(e.stateNode=n,Ye=e,Ue=Hn(n.firstChild),!0):!1;case 6:return n=e.pendingProps===""||n.nodeType!==3?null:n,n!==null?(e.stateNode=n,Ye=e,Ue=null,!0):!1;case 13:return n=n.nodeType!==8?null:n,n!==null?(t=lt!==null?{id:_n,overflow:Sn}:null,e.memoizedState={dehydrated:n,treeContext:t,retryLane:1073741824},t=be(18,null,null,0),t.stateNode=n,t.return=e,e.child=t,Ye=e,Ue=null,!0):!1;default:return!1}}function Ur(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Yr(e){if(se){var n=Ue;if(n){var t=n;if(!Li(e,n)){if(Ur(e))throw Error(_(418));n=Hn(t.nextSibling);var l=Ye;n&&Li(e,n)?Gg(l,t):(e.flags=e.flags&-4097|2,se=!1,Ye=e)}}else{if(Ur(e))throw Error(_(418));e.flags=e.flags&-4097|2,se=!1,Ye=e}}}function Oi(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Ye=e}function ql(e){if(e!==Ye)return!1;if(!se)return Oi(e),se=!0,!1;var n;if((n=e.tag!==3)&&!(n=e.tag!==5)&&(n=e.type,n=n!=="head"&&n!=="body"&&!qr(e.type,e.memoizedProps)),n&&(n=Ue)){if(Ur(e))throw Vg(),Error(_(418));for(;n;)Gg(e,n),n=Hn(n.nextSibling)}if(Oi(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(_(317));e:{for(e=e.nextSibling,n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="/$"){if(n===0){Ue=Hn(e.nextSibling);break e}n--}else t!=="$"&&t!=="$!"&&t!=="$?"||n++}e=e.nextSibling}Ue=null}}else Ue=Ye?Hn(e.stateNode.nextSibling):null;return!0}function Vg(){for(var e=Ue;e;)e=Hn(e.nextSibling)}function Rt(){Ue=Ye=null,se=!1}function Rs(e){on===null?on=[e]:on.push(e)}var wd=Gn.ReactCurrentBatchConfig;function Ut(e,n,t){if(e=t.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(t._owner){if(t=t._owner,t){if(t.tag!==1)throw Error(_(309));var l=t.stateNode}if(!l)throw Error(_(147,e));var a=l,r=""+e;return n!==null&&n.ref!==null&&typeof n.ref=="function"&&n.ref._stringRef===r?n.ref:(n=function(s){var o=a.refs;s===null?delete o[r]:o[r]=s},n._stringRef=r,n)}if(typeof e!="string")throw Error(_(284));if(!t._owner)throw Error(_(290,e))}return e}function jl(e,n){throw e=Object.prototype.toString.call(n),Error(_(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e))}function qi(e){var n=e._init;return n(e._payload)}function Ng(e){function n(u,g){if(e){var d=u.deletions;d===null?(u.deletions=[g],u.flags|=16):d.push(g)}}function t(u,g){if(!e)return null;for(;g!==null;)n(u,g),g=g.sibling;return null}function l(u,g){for(u=new Map;g!==null;)g.key!==null?u.set(g.key,g):u.set(g.index,g),g=g.sibling;return u}function a(u,g){return u=jn(u,g),u.index=0,u.sibling=null,u}function r(u,g,d){return u.index=d,e?(d=u.alternate,d!==null?(d=d.index,d<g?(u.flags|=2,g):d):(u.flags|=2,g)):(u.flags|=1048576,g)}function s(u){return e&&u.alternate===null&&(u.flags|=2),u}function o(u,g,d,E){return g===null||g.tag!==6?(g=hr(d,u.mode,E),g.return=u,g):(g=a(g,d),g.return=u,g)}function i(u,g,d,E){var N=d.type;return N===dt?h(u,g,d.props.children,E,d.key):g!==null&&(g.elementType===N||typeof N=="object"&&N!==null&&N.$$typeof===vn&&qi(N)===g.type)?(E=a(g,d.props),E.ref=Ut(u,g,d),E.return=u,E):(E=ra(d.type,d.key,d.props,null,u.mode,E),E.ref=Ut(u,g,d),E.return=u,E)}function c(u,g,d,E){return g===null||g.tag!==4||g.stateNode.containerInfo!==d.containerInfo||g.stateNode.implementation!==d.implementation?(g=yr(d,u.mode,E),g.return=u,g):(g=a(g,d.children||[]),g.return=u,g)}function h(u,g,d,E,N){return g===null||g.tag!==7?(g=nt(d,u.mode,E,N),g.return=u,g):(g=a(g,d),g.return=u,g)}function p(u,g,d){if(typeof g=="string"&&g!==""||typeof g=="number")return g=hr(""+g,u.mode,d),g.return=u,g;if(typeof g=="object"&&g!==null){switch(g.$$typeof){case Pl:return d=ra(g.type,g.key,g.props,null,u.mode,d),d.ref=Ut(u,null,g),d.return=u,d;case ut:return g=yr(g,u.mode,d),g.return=u,g;case vn:var E=g._init;return p(u,E(g._payload),d)}if(Xt(g)||Ot(g))return g=nt(g,u.mode,d,null),g.return=u,g;jl(u,g)}return null}function T(u,g,d,E){var N=g!==null?g.key:null;if(typeof d=="string"&&d!==""||typeof d=="number")return N!==null?null:o(u,g,""+d,E);if(typeof d=="object"&&d!==null){switch(d.$$typeof){case Pl:return d.key===N?i(u,g,d,E):null;case ut:return d.key===N?c(u,g,d,E):null;case vn:return N=d._init,T(u,g,N(d._payload),E)}if(Xt(d)||Ot(d))return N!==null?null:h(u,g,d,E,null);jl(u,d)}return null}function f(u,g,d,E,N){if(typeof E=="string"&&E!==""||typeof E=="number")return u=u.get(d)||null,o(g,u,""+E,N);if(typeof E=="object"&&E!==null){switch(E.$$typeof){case Pl:return u=u.get(E.key===null?d:E.key)||null,i(g,u,E,N);case ut:return u=u.get(E.key===null?d:E.key)||null,c(g,u,E,N);case vn:var v=E._init;return f(u,g,d,v(E._payload),N)}if(Xt(E)||Ot(E))return u=u.get(d)||null,h(g,u,E,N,null);jl(g,E)}return null}function S(u,g,d,E){for(var N=null,v=null,P=g,I=g=0,ee=null;P!==null&&I<d.length;I++){P.index>I?(ee=P,P=null):ee=P.sibling;var C=T(u,P,d[I],E);if(C===null){P===null&&(P=ee);break}e&&P&&C.alternate===null&&n(u,P),g=r(C,g,I),v===null?N=C:v.sibling=C,v=C,P=ee}if(I===d.length)return t(u,P),se&&Kn(u,I),N;if(P===null){for(;I<d.length;I++)P=p(u,d[I],E),P!==null&&(g=r(P,g,I),v===null?N=P:v.sibling=P,v=P);return se&&Kn(u,I),N}for(P=l(u,P);I<d.length;I++)ee=f(P,u,I,d[I],E),ee!==null&&(e&&ee.alternate!==null&&P.delete(ee.key===null?I:ee.key),g=r(ee,g,I),v===null?N=ee:v.sibling=ee,v=ee);return e&&P.forEach(function(O){return n(u,O)}),se&&Kn(u,I),N}function x(u,g,d,E){var N=Ot(d);if(typeof N!="function")throw Error(_(150));if(d=N.call(d),d==null)throw Error(_(151));for(var v=N=null,P=g,I=g=0,ee=null,C=d.next();P!==null&&!C.done;I++,C=d.next()){P.index>I?(ee=P,P=null):ee=P.sibling;var O=T(u,P,C.value,E);if(O===null){P===null&&(P=ee);break}e&&P&&O.alternate===null&&n(u,P),g=r(O,g,I),v===null?N=O:v.sibling=O,v=O,P=ee}if(C.done)return t(u,P),se&&Kn(u,I),N;if(P===null){for(;!C.done;I++,C=d.next())C=p(u,C.value,E),C!==null&&(g=r(C,g,I),v===null?N=C:v.sibling=C,v=C);return se&&Kn(u,I),N}for(P=l(u,P);!C.done;I++,C=d.next())C=f(P,u,I,C.value,E),C!==null&&(e&&C.alternate!==null&&P.delete(C.key===null?I:C.key),g=r(C,g,I),v===null?N=C:v.sibling=C,v=C);return e&&P.forEach(function(V){return n(u,V)}),se&&Kn(u,I),N}function z(u,g,d,E){if(typeof d=="object"&&d!==null&&d.type===dt&&d.key===null&&(d=d.props.children),typeof d=="object"&&d!==null){switch(d.$$typeof){case Pl:e:{for(var N=d.key,v=g;v!==null;){if(v.key===N){if(N=d.type,N===dt){if(v.tag===7){t(u,v.sibling),g=a(v,d.props.children),g.return=u,u=g;break e}}else if(v.elementType===N||typeof N=="object"&&N!==null&&N.$$typeof===vn&&qi(N)===v.type){t(u,v.sibling),g=a(v,d.props),g.ref=Ut(u,v,d),g.return=u,u=g;break e}t(u,v);break}else n(u,v);v=v.sibling}d.type===dt?(g=nt(d.props.children,u.mode,E,d.key),g.return=u,u=g):(E=ra(d.type,d.key,d.props,null,u.mode,E),E.ref=Ut(u,g,d),E.return=u,u=E)}return s(u);case ut:e:{for(v=d.key;g!==null;){if(g.key===v)if(g.tag===4&&g.stateNode.containerInfo===d.containerInfo&&g.stateNode.implementation===d.implementation){t(u,g.sibling),g=a(g,d.children||[]),g.return=u,u=g;break e}else{t(u,g);break}else n(u,g);g=g.sibling}g=yr(d,u.mode,E),g.return=u,u=g}return s(u);case vn:return v=d._init,z(u,g,v(d._payload),E)}if(Xt(d))return S(u,g,d,E);if(Ot(d))return x(u,g,d,E);jl(u,d)}return typeof d=="string"&&d!==""||typeof d=="number"?(d=""+d,g!==null&&g.tag===6?(t(u,g.sibling),g=a(g,d),g.return=u,u=g):(t(u,g),g=hr(d,u.mode,E),g.return=u,u=g),s(u)):t(u,g)}return z}var Bt=Ng(!0),vg=Ng(!1),fa=Yn(null),_a=null,_t=null,Bs=null;function Is(){Bs=_t=_a=null}function Ms(e){var n=fa.current;re(fa),e._currentValue=n}function Qr(e,n,t){for(;e!==null;){var l=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,l!==null&&(l.childLanes|=n)):l!==null&&(l.childLanes&n)!==n&&(l.childLanes|=n),e===t)break;e=e.return}}function Vt(e,n){_a=e,Bs=_t=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&n&&(He=!0),e.firstContext=null)}function nn(e){var n=e._currentValue;if(Bs!==e)if(e={context:e,memoizedValue:n,next:null},_t===null){if(_a===null)throw Error(_(308));_t=e,_a.dependencies={lanes:0,firstContext:e}}else _t=_t.next=e;return n}var Jn=null;function As(e){Jn===null?Jn=[e]:Jn.push(e)}function kg(e,n,t,l){var a=n.interleaved;return a===null?(t.next=t,As(n)):(t.next=a.next,a.next=t),n.interleaved=t,xn(e,l)}function xn(e,n){e.lanes|=n;var t=e.alternate;for(t!==null&&(t.lanes|=n),t=e,e=e.return;e!==null;)e.childLanes|=n,t=e.alternate,t!==null&&(t.childLanes|=n),t=e,e=e.return;return t.tag===3?t.stateNode:null}var kn=!1;function Fs(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Pg(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Dn(e,n){return{eventTime:e,lane:n,tag:0,payload:null,callback:null,next:null}}function Ln(e,n,t){var l=e.updateQueue;if(l===null)return null;if(l=l.shared,Y&2){var a=l.pending;return a===null?n.next=n:(n.next=a.next,a.next=n),l.pending=n,xn(e,t)}return a=l.interleaved,a===null?(n.next=n,As(l)):(n.next=a.next,a.next=n),l.interleaved=n,xn(e,t)}function bl(e,n,t){if(n=n.updateQueue,n!==null&&(n=n.shared,(t&4194240)!==0)){var l=n.lanes;l&=e.pendingLanes,t|=l,n.lanes=t,ws(e,t)}}function ji(e,n){var t=e.updateQueue,l=e.alternate;if(l!==null&&(l=l.updateQueue,t===l)){var a=null,r=null;if(t=t.firstBaseUpdate,t!==null){do{var s={eventTime:t.eventTime,lane:t.lane,tag:t.tag,payload:t.payload,callback:t.callback,next:null};r===null?a=r=s:r=r.next=s,t=t.next}while(t!==null);r===null?a=r=n:r=r.next=n}else a=r=n;t={baseState:l.baseState,firstBaseUpdate:a,lastBaseUpdate:r,shared:l.shared,effects:l.effects},e.updateQueue=t;return}e=t.lastBaseUpdate,e===null?t.firstBaseUpdate=n:e.next=n,t.lastBaseUpdate=n}function Sa(e,n,t,l){var a=e.updateQueue;kn=!1;var r=a.firstBaseUpdate,s=a.lastBaseUpdate,o=a.shared.pending;if(o!==null){a.shared.pending=null;var i=o,c=i.next;i.next=null,s===null?r=c:s.next=c,s=i;var h=e.alternate;h!==null&&(h=h.updateQueue,o=h.lastBaseUpdate,o!==s&&(o===null?h.firstBaseUpdate=c:o.next=c,h.lastBaseUpdate=i))}if(r!==null){var p=a.baseState;s=0,h=c=i=null,o=r;do{var T=o.lane,f=o.eventTime;if((l&T)===T){h!==null&&(h=h.next={eventTime:f,lane:0,tag:o.tag,payload:o.payload,callback:o.callback,next:null});e:{var S=e,x=o;switch(T=n,f=t,x.tag){case 1:if(S=x.payload,typeof S=="function"){p=S.call(f,p,T);break e}p=S;break e;case 3:S.flags=S.flags&-65537|128;case 0:if(S=x.payload,T=typeof S=="function"?S.call(f,p,T):S,T==null)break e;p=ge({},p,T);break e;case 2:kn=!0}}o.callback!==null&&o.lane!==0&&(e.flags|=64,T=a.effects,T===null?a.effects=[o]:T.push(o))}else f={eventTime:f,lane:T,tag:o.tag,payload:o.payload,callback:o.callback,next:null},h===null?(c=h=f,i=p):h=h.next=f,s|=T;if(o=o.next,o===null){if(o=a.shared.pending,o===null)break;T=o,o=T.next,T.next=null,a.lastBaseUpdate=T,a.shared.pending=null}}while(!0);if(h===null&&(i=p),a.baseState=i,a.firstBaseUpdate=c,a.lastBaseUpdate=h,n=a.shared.interleaved,n!==null){a=n;do s|=a.lane,a=a.next;while(a!==n)}else r===null&&(a.shared.lanes=0);rt|=s,e.lanes=s,e.memoizedState=p}}function zi(e,n,t){if(e=n.effects,n.effects=null,e!==null)for(n=0;n<e.length;n++){var l=e[n],a=l.callback;if(a!==null){if(l.callback=null,l=t,typeof a!="function")throw Error(_(191,a));a.call(l)}}}var Nl={},hn=Yn(Nl),fl=Yn(Nl),_l=Yn(Nl);function bn(e){if(e===Nl)throw Error(_(174));return e}function Hs(e,n){switch(b(_l,n),b(fl,e),b(hn,Nl),e=n.nodeType,e){case 9:case 11:n=(n=n.documentElement)?n.namespaceURI:Vr(null,"");break;default:e=e===8?n.parentNode:n,n=e.namespaceURI||null,e=e.tagName,n=Vr(n,e)}re(hn),b(hn,n)}function It(){re(hn),re(fl),re(_l)}function Rg(e){bn(_l.current);var n=bn(hn.current),t=Vr(n,e.type);n!==t&&(b(fl,e),b(hn,t))}function Ls(e){fl.current===e&&(re(hn),re(fl))}var ie=Yn(0);function Da(e){for(var n=e;n!==null;){if(n.tag===13){var t=n.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||t.data==="$?"||t.data==="$!"))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!==void 0){if(n.flags&128)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var cr=[];function Os(){for(var e=0;e<cr.length;e++)cr[e]._workInProgressVersionPrimary=null;cr.length=0}var ea=Gn.ReactCurrentDispatcher,ur=Gn.ReactCurrentBatchConfig,at=0,oe=null,Ee=null,Se=null,wa=!1,al=!1,Sl=0,Cd=0;function Ge(){throw Error(_(321))}function qs(e,n){if(n===null)return!1;for(var t=0;t<n.length&&t<e.length;t++)if(!un(e[t],n[t]))return!1;return!0}function js(e,n,t,l,a,r){if(at=r,oe=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,ea.current=e===null||e.memoizedState===null?Vd:Nd,e=t(l,a),al){r=0;do{if(al=!1,Sl=0,25<=r)throw Error(_(301));r+=1,Se=Ee=null,n.updateQueue=null,ea.current=vd,e=t(l,a)}while(al)}if(ea.current=Ca,n=Ee!==null&&Ee.next!==null,at=0,Se=Ee=oe=null,wa=!1,n)throw Error(_(300));return e}function zs(){var e=Sl!==0;return Sl=0,e}function mn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Se===null?oe.memoizedState=Se=e:Se=Se.next=e,Se}function tn(){if(Ee===null){var e=oe.alternate;e=e!==null?e.memoizedState:null}else e=Ee.next;var n=Se===null?oe.memoizedState:Se.next;if(n!==null)Se=n,Ee=e;else{if(e===null)throw Error(_(310));Ee=e,e={memoizedState:Ee.memoizedState,baseState:Ee.baseState,baseQueue:Ee.baseQueue,queue:Ee.queue,next:null},Se===null?oe.memoizedState=Se=e:Se=Se.next=e}return Se}function Dl(e,n){return typeof n=="function"?n(e):n}function dr(e){var n=tn(),t=n.queue;if(t===null)throw Error(_(311));t.lastRenderedReducer=e;var l=Ee,a=l.baseQueue,r=t.pending;if(r!==null){if(a!==null){var s=a.next;a.next=r.next,r.next=s}l.baseQueue=a=r,t.pending=null}if(a!==null){r=a.next,l=l.baseState;var o=s=null,i=null,c=r;do{var h=c.lane;if((at&h)===h)i!==null&&(i=i.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),l=c.hasEagerState?c.eagerState:e(l,c.action);else{var p={lane:h,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};i===null?(o=i=p,s=l):i=i.next=p,oe.lanes|=h,rt|=h}c=c.next}while(c!==null&&c!==r);i===null?s=l:i.next=o,un(l,n.memoizedState)||(He=!0),n.memoizedState=l,n.baseState=s,n.baseQueue=i,t.lastRenderedState=l}if(e=t.interleaved,e!==null){a=e;do r=a.lane,oe.lanes|=r,rt|=r,a=a.next;while(a!==e)}else a===null&&(t.lanes=0);return[n.memoizedState,t.dispatch]}function mr(e){var n=tn(),t=n.queue;if(t===null)throw Error(_(311));t.lastRenderedReducer=e;var l=t.dispatch,a=t.pending,r=n.memoizedState;if(a!==null){t.pending=null;var s=a=a.next;do r=e(r,s.action),s=s.next;while(s!==a);un(r,n.memoizedState)||(He=!0),n.memoizedState=r,n.baseQueue===null&&(n.baseState=r),t.lastRenderedState=r}return[r,l]}function Bg(){}function Ig(e,n){var t=oe,l=tn(),a=n(),r=!un(l.memoizedState,a);if(r&&(l.memoizedState=a,He=!0),l=l.queue,$s(Fg.bind(null,t,l,e),[e]),l.getSnapshot!==n||r||Se!==null&&Se.memoizedState.tag&1){if(t.flags|=2048,wl(9,Ag.bind(null,t,l,a,n),void 0,null),De===null)throw Error(_(349));at&30||Mg(t,n,a)}return a}function Mg(e,n,t){e.flags|=16384,e={getSnapshot:n,value:t},n=oe.updateQueue,n===null?(n={lastEffect:null,stores:null},oe.updateQueue=n,n.stores=[e]):(t=n.stores,t===null?n.stores=[e]:t.push(e))}function Ag(e,n,t,l){n.value=t,n.getSnapshot=l,Hg(n)&&Lg(e)}function Fg(e,n,t){return t(function(){Hg(n)&&Lg(e)})}function Hg(e){var n=e.getSnapshot;e=e.value;try{var t=n();return!un(e,t)}catch{return!0}}function Lg(e){var n=xn(e,1);n!==null&&cn(n,e,1,-1)}function $i(e){var n=mn();return typeof e=="function"&&(e=e()),n.memoizedState=n.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Dl,lastRenderedState:e},n.queue=e,e=e.dispatch=Gd.bind(null,oe,e),[n.memoizedState,e]}function wl(e,n,t,l){return e={tag:e,create:n,destroy:t,deps:l,next:null},n=oe.updateQueue,n===null?(n={lastEffect:null,stores:null},oe.updateQueue=n,n.lastEffect=e.next=e):(t=n.lastEffect,t===null?n.lastEffect=e.next=e:(l=t.next,t.next=e,e.next=l,n.lastEffect=e)),e}function Og(){return tn().memoizedState}function na(e,n,t,l){var a=mn();oe.flags|=e,a.memoizedState=wl(1|n,t,void 0,l===void 0?null:l)}function Aa(e,n,t,l){var a=tn();l=l===void 0?null:l;var r=void 0;if(Ee!==null){var s=Ee.memoizedState;if(r=s.destroy,l!==null&&qs(l,s.deps)){a.memoizedState=wl(n,t,r,l);return}}oe.flags|=e,a.memoizedState=wl(1|n,t,r,l)}function Ui(e,n){return na(8390656,8,e,n)}function $s(e,n){return Aa(2048,8,e,n)}function qg(e,n){return Aa(4,2,e,n)}function jg(e,n){return Aa(4,4,e,n)}function zg(e,n){if(typeof n=="function")return e=e(),n(e),function(){n(null)};if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function $g(e,n,t){return t=t!=null?t.concat([e]):null,Aa(4,4,zg.bind(null,n,e),t)}function Us(){}function Ug(e,n){var t=tn();n=n===void 0?null:n;var l=t.memoizedState;return l!==null&&n!==null&&qs(n,l[1])?l[0]:(t.memoizedState=[e,n],e)}function Yg(e,n){var t=tn();n=n===void 0?null:n;var l=t.memoizedState;return l!==null&&n!==null&&qs(n,l[1])?l[0]:(e=e(),t.memoizedState=[e,n],e)}function Qg(e,n,t){return at&21?(un(t,n)||(t=bo(),oe.lanes|=t,rt|=t,e.baseState=!0),n):(e.baseState&&(e.baseState=!1,He=!0),e.memoizedState=t)}function xd(e,n){var t=J;J=t!==0&&4>t?t:4,e(!0);var l=ur.transition;ur.transition={};try{e(!1),n()}finally{J=t,ur.transition=l}}function Kg(){return tn().memoizedState}function Wd(e,n,t){var l=qn(e);if(t={lane:l,action:t,hasEagerState:!1,eagerState:null,next:null},Xg(e))Zg(n,t);else if(t=kg(e,n,t,l),t!==null){var a=Be();cn(t,e,l,a),Jg(t,n,l)}}function Gd(e,n,t){var l=qn(e),a={lane:l,action:t,hasEagerState:!1,eagerState:null,next:null};if(Xg(e))Zg(n,a);else{var r=e.alternate;if(e.lanes===0&&(r===null||r.lanes===0)&&(r=n.lastRenderedReducer,r!==null))try{var s=n.lastRenderedState,o=r(s,t);if(a.hasEagerState=!0,a.eagerState=o,un(o,s)){var i=n.interleaved;i===null?(a.next=a,As(n)):(a.next=i.next,i.next=a),n.interleaved=a;return}}catch{}finally{}t=kg(e,n,a,l),t!==null&&(a=Be(),cn(t,e,l,a),Jg(t,n,l))}}function Xg(e){var n=e.alternate;return e===oe||n!==null&&n===oe}function Zg(e,n){al=wa=!0;var t=e.pending;t===null?n.next=n:(n.next=t.next,t.next=n),e.pending=n}function Jg(e,n,t){if(t&4194240){var l=n.lanes;l&=e.pendingLanes,t|=l,n.lanes=t,ws(e,t)}}var Ca={readContext:nn,useCallback:Ge,useContext:Ge,useEffect:Ge,useImperativeHandle:Ge,useInsertionEffect:Ge,useLayoutEffect:Ge,useMemo:Ge,useReducer:Ge,useRef:Ge,useState:Ge,useDebugValue:Ge,useDeferredValue:Ge,useTransition:Ge,useMutableSource:Ge,useSyncExternalStore:Ge,useId:Ge,unstable_isNewReconciler:!1},Vd={readContext:nn,useCallback:function(e,n){return mn().memoizedState=[e,n===void 0?null:n],e},useContext:nn,useEffect:Ui,useImperativeHandle:function(e,n,t){return t=t!=null?t.concat([e]):null,na(4194308,4,zg.bind(null,n,e),t)},useLayoutEffect:function(e,n){return na(4194308,4,e,n)},useInsertionEffect:function(e,n){return na(4,2,e,n)},useMemo:function(e,n){var t=mn();return n=n===void 0?null:n,e=e(),t.memoizedState=[e,n],e},useReducer:function(e,n,t){var l=mn();return n=t!==void 0?t(n):n,l.memoizedState=l.baseState=n,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:n},l.queue=e,e=e.dispatch=Wd.bind(null,oe,e),[l.memoizedState,e]},useRef:function(e){var n=mn();return e={current:e},n.memoizedState=e},useState:$i,useDebugValue:Us,useDeferredValue:function(e){return mn().memoizedState=e},useTransition:function(){var e=$i(!1),n=e[0];return e=xd.bind(null,e[1]),mn().memoizedState=e,[n,e]},useMutableSource:function(){},useSyncExternalStore:function(e,n,t){var l=oe,a=mn();if(se){if(t===void 0)throw Error(_(407));t=t()}else{if(t=n(),De===null)throw Error(_(349));at&30||Mg(l,n,t)}a.memoizedState=t;var r={value:t,getSnapshot:n};return a.queue=r,Ui(Fg.bind(null,l,r,e),[e]),l.flags|=2048,wl(9,Ag.bind(null,l,r,t,n),void 0,null),t},useId:function(){var e=mn(),n=De.identifierPrefix;if(se){var t=Sn,l=_n;t=(l&~(1<<32-gn(l)-1)).toString(32)+t,n=":"+n+"R"+t,t=Sl++,0<t&&(n+="H"+t.toString(32)),n+=":"}else t=Cd++,n=":"+n+"r"+t.toString(32)+":";return e.memoizedState=n},unstable_isNewReconciler:!1},Nd={readContext:nn,useCallback:Ug,useContext:nn,useEffect:$s,useImperativeHandle:$g,useInsertionEffect:qg,useLayoutEffect:jg,useMemo:Yg,useReducer:dr,useRef:Og,useState:function(){return dr(Dl)},useDebugValue:Us,useDeferredValue:function(e){var n=tn();return Qg(n,Ee.memoizedState,e)},useTransition:function(){var e=dr(Dl)[0],n=tn().memoizedState;return[e,n]},useMutableSource:Bg,useSyncExternalStore:Ig,useId:Kg,unstable_isNewReconciler:!1},vd={readContext:nn,useCallback:Ug,useContext:nn,useEffect:$s,useImperativeHandle:$g,useInsertionEffect:qg,useLayoutEffect:jg,useMemo:Yg,useReducer:mr,useRef:Og,useState:function(){return mr(Dl)},useDebugValue:Us,useDeferredValue:function(e){var n=tn();return Ee===null?n.memoizedState=e:Qg(n,Ee.memoizedState,e)},useTransition:function(){var e=mr(Dl)[0],n=tn().memoizedState;return[e,n]},useMutableSource:Bg,useSyncExternalStore:Ig,useId:Kg,unstable_isNewReconciler:!1};function rn(e,n){if(e&&e.defaultProps){n=ge({},n),e=e.defaultProps;for(var t in e)n[t]===void 0&&(n[t]=e[t]);return n}return n}function Kr(e,n,t,l){n=e.memoizedState,t=t(l,n),t=t==null?n:ge({},n,t),e.memoizedState=t,e.lanes===0&&(e.updateQueue.baseState=t)}var Fa={isMounted:function(e){return(e=e._reactInternals)?ot(e)===e:!1},enqueueSetState:function(e,n,t){e=e._reactInternals;var l=Be(),a=qn(e),r=Dn(l,a);r.payload=n,t!=null&&(r.callback=t),n=Ln(e,r,a),n!==null&&(cn(n,e,a,l),bl(n,e,a))},enqueueReplaceState:function(e,n,t){e=e._reactInternals;var l=Be(),a=qn(e),r=Dn(l,a);r.tag=1,r.payload=n,t!=null&&(r.callback=t),n=Ln(e,r,a),n!==null&&(cn(n,e,a,l),bl(n,e,a))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var t=Be(),l=qn(e),a=Dn(t,l);a.tag=2,n!=null&&(a.callback=n),n=Ln(e,a,l),n!==null&&(cn(n,e,l,t),bl(n,e,l))}};function Yi(e,n,t,l,a,r,s){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(l,r,s):n.prototype&&n.prototype.isPureReactComponent?!Tl(t,l)||!Tl(a,r):!0}function bg(e,n,t){var l=!1,a=$n,r=n.contextType;return typeof r=="object"&&r!==null?r=nn(r):(a=Oe(n)?tt:ve.current,l=n.contextTypes,r=(l=l!=null)?Pt(e,a):$n),n=new n(t,r),e.memoizedState=n.state!==null&&n.state!==void 0?n.state:null,n.updater=Fa,e.stateNode=n,n._reactInternals=e,l&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=a,e.__reactInternalMemoizedMaskedChildContext=r),n}function Qi(e,n,t,l){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(t,l),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(t,l),n.state!==e&&Fa.enqueueReplaceState(n,n.state,null)}function Xr(e,n,t,l){var a=e.stateNode;a.props=t,a.state=e.memoizedState,a.refs={},Fs(e);var r=n.contextType;typeof r=="object"&&r!==null?a.context=nn(r):(r=Oe(n)?tt:ve.current,a.context=Pt(e,r)),a.state=e.memoizedState,r=n.getDerivedStateFromProps,typeof r=="function"&&(Kr(e,n,r,t),a.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof a.getSnapshotBeforeUpdate=="function"||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(n=a.state,typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount(),n!==a.state&&Fa.enqueueReplaceState(a,a.state,null),Sa(e,t,a,l),a.state=e.memoizedState),typeof a.componentDidMount=="function"&&(e.flags|=4194308)}function Mt(e,n){try{var t="",l=n;do t+=au(l),l=l.return;while(l);var a=t}catch(r){a=`
Error generating stack: `+r.message+`
`+r.stack}return{value:e,source:n,stack:a,digest:null}}function pr(e,n,t){return{value:e,source:null,stack:t??null,digest:n??null}}function Zr(e,n){try{console.error(n.value)}catch(t){setTimeout(function(){throw t})}}var kd=typeof WeakMap=="function"?WeakMap:Map;function ec(e,n,t){t=Dn(-1,t),t.tag=3,t.payload={element:null};var l=n.value;return t.callback=function(){Wa||(Wa=!0,is=l),Zr(e,n)},t}function nc(e,n,t){t=Dn(-1,t),t.tag=3;var l=e.type.getDerivedStateFromError;if(typeof l=="function"){var a=n.value;t.payload=function(){return l(a)},t.callback=function(){Zr(e,n)}}var r=e.stateNode;return r!==null&&typeof r.componentDidCatch=="function"&&(t.callback=function(){Zr(e,n),typeof l!="function"&&(On===null?On=new Set([this]):On.add(this));var s=n.stack;this.componentDidCatch(n.value,{componentStack:s!==null?s:""})}),t}function Ki(e,n,t){var l=e.pingCache;if(l===null){l=e.pingCache=new kd;var a=new Set;l.set(n,a)}else a=l.get(n),a===void 0&&(a=new Set,l.set(n,a));a.has(t)||(a.add(t),e=$d.bind(null,e,n,t),n.then(e,e))}function Xi(e){do{var n;if((n=e.tag===13)&&(n=e.memoizedState,n=n!==null?n.dehydrated!==null:!0),n)return e;e=e.return}while(e!==null);return null}function Zi(e,n,t,l,a){return e.mode&1?(e.flags|=65536,e.lanes=a,e):(e===n?e.flags|=65536:(e.flags|=128,t.flags|=131072,t.flags&=-52805,t.tag===1&&(t.alternate===null?t.tag=17:(n=Dn(-1,1),n.tag=2,Ln(t,n,1))),t.lanes|=1),e)}var Pd=Gn.ReactCurrentOwner,He=!1;function Re(e,n,t,l){n.child=e===null?vg(n,null,t,l):Bt(n,e.child,t,l)}function Ji(e,n,t,l,a){t=t.render;var r=n.ref;return Vt(n,a),l=js(e,n,t,l,r,a),t=zs(),e!==null&&!He?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~a,Wn(e,n,a)):(se&&t&&ks(n),n.flags|=1,Re(e,n,l,a),n.child)}function bi(e,n,t,l,a){if(e===null){var r=t.type;return typeof r=="function"&&!ei(r)&&r.defaultProps===void 0&&t.compare===null&&t.defaultProps===void 0?(n.tag=15,n.type=r,tc(e,n,r,l,a)):(e=ra(t.type,null,l,n,n.mode,a),e.ref=n.ref,e.return=n,n.child=e)}if(r=e.child,!(e.lanes&a)){var s=r.memoizedProps;if(t=t.compare,t=t!==null?t:Tl,t(s,l)&&e.ref===n.ref)return Wn(e,n,a)}return n.flags|=1,e=jn(r,l),e.ref=n.ref,e.return=n,n.child=e}function tc(e,n,t,l,a){if(e!==null){var r=e.memoizedProps;if(Tl(r,l)&&e.ref===n.ref)if(He=!1,n.pendingProps=l=r,(e.lanes&a)!==0)e.flags&131072&&(He=!0);else return n.lanes=e.lanes,Wn(e,n,a)}return Jr(e,n,t,l,a)}function lc(e,n,t){var l=n.pendingProps,a=l.children,r=e!==null?e.memoizedState:null;if(l.mode==="hidden")if(!(n.mode&1))n.memoizedState={baseLanes:0,cachePool:null,transitions:null},b(Dt,$e),$e|=t;else{if(!(t&1073741824))return e=r!==null?r.baseLanes|t:t,n.lanes=n.childLanes=1073741824,n.memoizedState={baseLanes:e,cachePool:null,transitions:null},n.updateQueue=null,b(Dt,$e),$e|=e,null;n.memoizedState={baseLanes:0,cachePool:null,transitions:null},l=r!==null?r.baseLanes:t,b(Dt,$e),$e|=l}else r!==null?(l=r.baseLanes|t,n.memoizedState=null):l=t,b(Dt,$e),$e|=l;return Re(e,n,a,t),n.child}function ac(e,n){var t=n.ref;(e===null&&t!==null||e!==null&&e.ref!==t)&&(n.flags|=512,n.flags|=2097152)}function Jr(e,n,t,l,a){var r=Oe(t)?tt:ve.current;return r=Pt(n,r),Vt(n,a),t=js(e,n,t,l,r,a),l=zs(),e!==null&&!He?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~a,Wn(e,n,a)):(se&&l&&ks(n),n.flags|=1,Re(e,n,t,a),n.child)}function eo(e,n,t,l,a){if(Oe(t)){var r=!0;ha(n)}else r=!1;if(Vt(n,a),n.stateNode===null)ta(e,n),bg(n,t,l),Xr(n,t,l,a),l=!0;else if(e===null){var s=n.stateNode,o=n.memoizedProps;s.props=o;var i=s.context,c=t.contextType;typeof c=="object"&&c!==null?c=nn(c):(c=Oe(t)?tt:ve.current,c=Pt(n,c));var h=t.getDerivedStateFromProps,p=typeof h=="function"||typeof s.getSnapshotBeforeUpdate=="function";p||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(o!==l||i!==c)&&Qi(n,s,l,c),kn=!1;var T=n.memoizedState;s.state=T,Sa(n,l,s,a),i=n.memoizedState,o!==l||T!==i||Le.current||kn?(typeof h=="function"&&(Kr(n,t,h,l),i=n.memoizedState),(o=kn||Yi(n,t,o,l,T,i,c))?(p||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(n.flags|=4194308)):(typeof s.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=l,n.memoizedState=i),s.props=l,s.state=i,s.context=c,l=o):(typeof s.componentDidMount=="function"&&(n.flags|=4194308),l=!1)}else{s=n.stateNode,Pg(e,n),o=n.memoizedProps,c=n.type===n.elementType?o:rn(n.type,o),s.props=c,p=n.pendingProps,T=s.context,i=t.contextType,typeof i=="object"&&i!==null?i=nn(i):(i=Oe(t)?tt:ve.current,i=Pt(n,i));var f=t.getDerivedStateFromProps;(h=typeof f=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(o!==p||T!==i)&&Qi(n,s,l,i),kn=!1,T=n.memoizedState,s.state=T,Sa(n,l,s,a);var S=n.memoizedState;o!==p||T!==S||Le.current||kn?(typeof f=="function"&&(Kr(n,t,f,l),S=n.memoizedState),(c=kn||Yi(n,t,c,l,T,S,i)||!1)?(h||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(l,S,i),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(l,S,i)),typeof s.componentDidUpdate=="function"&&(n.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof s.componentDidUpdate!="function"||o===e.memoizedProps&&T===e.memoizedState||(n.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||o===e.memoizedProps&&T===e.memoizedState||(n.flags|=1024),n.memoizedProps=l,n.memoizedState=S),s.props=l,s.state=S,s.context=i,l=c):(typeof s.componentDidUpdate!="function"||o===e.memoizedProps&&T===e.memoizedState||(n.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||o===e.memoizedProps&&T===e.memoizedState||(n.flags|=1024),l=!1)}return br(e,n,t,l,r,a)}function br(e,n,t,l,a,r){ac(e,n);var s=(n.flags&128)!==0;if(!l&&!s)return a&&Hi(n,t,!1),Wn(e,n,r);l=n.stateNode,Pd.current=n;var o=s&&typeof t.getDerivedStateFromError!="function"?null:l.render();return n.flags|=1,e!==null&&s?(n.child=Bt(n,e.child,null,r),n.child=Bt(n,null,o,r)):Re(e,n,o,r),n.memoizedState=l.state,a&&Hi(n,t,!0),n.child}function rc(e){var n=e.stateNode;n.pendingContext?Fi(e,n.pendingContext,n.pendingContext!==n.context):n.context&&Fi(e,n.context,!1),Hs(e,n.containerInfo)}function no(e,n,t,l,a){return Rt(),Rs(a),n.flags|=256,Re(e,n,t,l),n.child}var es={dehydrated:null,treeContext:null,retryLane:0};function ns(e){return{baseLanes:e,cachePool:null,transitions:null}}function sc(e,n,t){var l=n.pendingProps,a=ie.current,r=!1,s=(n.flags&128)!==0,o;if((o=s)||(o=e!==null&&e.memoizedState===null?!1:(a&2)!==0),o?(r=!0,n.flags&=-129):(e===null||e.memoizedState!==null)&&(a|=1),b(ie,a&1),e===null)return Yr(n),e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(n.mode&1?e.data==="$!"?n.lanes=8:n.lanes=1073741824:n.lanes=1,null):(s=l.children,e=l.fallback,r?(l=n.mode,r=n.child,s={mode:"hidden",children:s},!(l&1)&&r!==null?(r.childLanes=0,r.pendingProps=s):r=Oa(s,l,0,null),e=nt(e,l,t,null),r.return=n,e.return=n,r.sibling=e,n.child=r,n.child.memoizedState=ns(t),n.memoizedState=es,e):Ys(n,s));if(a=e.memoizedState,a!==null&&(o=a.dehydrated,o!==null))return Rd(e,n,s,l,o,a,t);if(r){r=l.fallback,s=n.mode,a=e.child,o=a.sibling;var i={mode:"hidden",children:l.children};return!(s&1)&&n.child!==a?(l=n.child,l.childLanes=0,l.pendingProps=i,n.deletions=null):(l=jn(a,i),l.subtreeFlags=a.subtreeFlags&14680064),o!==null?r=jn(o,r):(r=nt(r,s,t,null),r.flags|=2),r.return=n,l.return=n,l.sibling=r,n.child=l,l=r,r=n.child,s=e.child.memoizedState,s=s===null?ns(t):{baseLanes:s.baseLanes|t,cachePool:null,transitions:s.transitions},r.memoizedState=s,r.childLanes=e.childLanes&~t,n.memoizedState=es,l}return r=e.child,e=r.sibling,l=jn(r,{mode:"visible",children:l.children}),!(n.mode&1)&&(l.lanes=t),l.return=n,l.sibling=null,e!==null&&(t=n.deletions,t===null?(n.deletions=[e],n.flags|=16):t.push(e)),n.child=l,n.memoizedState=null,l}function Ys(e,n){return n=Oa({mode:"visible",children:n},e.mode,0,null),n.return=e,e.child=n}function zl(e,n,t,l){return l!==null&&Rs(l),Bt(n,e.child,null,t),e=Ys(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function Rd(e,n,t,l,a,r,s){if(t)return n.flags&256?(n.flags&=-257,l=pr(Error(_(422))),zl(e,n,s,l)):n.memoizedState!==null?(n.child=e.child,n.flags|=128,null):(r=l.fallback,a=n.mode,l=Oa({mode:"visible",children:l.children},a,0,null),r=nt(r,a,s,null),r.flags|=2,l.return=n,r.return=n,l.sibling=r,n.child=l,n.mode&1&&Bt(n,e.child,null,s),n.child.memoizedState=ns(s),n.memoizedState=es,r);if(!(n.mode&1))return zl(e,n,s,null);if(a.data==="$!"){if(l=a.nextSibling&&a.nextSibling.dataset,l)var o=l.dgst;return l=o,r=Error(_(419)),l=pr(r,l,void 0),zl(e,n,s,l)}if(o=(s&e.childLanes)!==0,He||o){if(l=De,l!==null){switch(s&-s){case 4:a=2;break;case 16:a=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:a=32;break;case 536870912:a=268435456;break;default:a=0}a=a&(l.suspendedLanes|s)?0:a,a!==0&&a!==r.retryLane&&(r.retryLane=a,xn(e,a),cn(l,e,a,-1))}return bs(),l=pr(Error(_(421))),zl(e,n,s,l)}return a.data==="$?"?(n.flags|=128,n.child=e.child,n=Ud.bind(null,e),a._reactRetry=n,null):(e=r.treeContext,Ue=Hn(a.nextSibling),Ye=n,se=!0,on=null,e!==null&&(Ze[Je++]=_n,Ze[Je++]=Sn,Ze[Je++]=lt,_n=e.id,Sn=e.overflow,lt=n),n=Ys(n,l.children),n.flags|=4096,n)}function to(e,n,t){e.lanes|=n;var l=e.alternate;l!==null&&(l.lanes|=n),Qr(e.return,n,t)}function Tr(e,n,t,l,a){var r=e.memoizedState;r===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:l,tail:t,tailMode:a}:(r.isBackwards=n,r.rendering=null,r.renderingStartTime=0,r.last=l,r.tail=t,r.tailMode=a)}function ic(e,n,t){var l=n.pendingProps,a=l.revealOrder,r=l.tail;if(Re(e,n,l.children,t),l=ie.current,l&2)l=l&1|2,n.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&to(e,t,n);else if(e.tag===19)to(e,t,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break e;for(;e.sibling===null;){if(e.return===null||e.return===n)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}l&=1}if(b(ie,l),!(n.mode&1))n.memoizedState=null;else switch(a){case"forwards":for(t=n.child,a=null;t!==null;)e=t.alternate,e!==null&&Da(e)===null&&(a=t),t=t.sibling;t=a,t===null?(a=n.child,n.child=null):(a=t.sibling,t.sibling=null),Tr(n,!1,a,t,r);break;case"backwards":for(t=null,a=n.child,n.child=null;a!==null;){if(e=a.alternate,e!==null&&Da(e)===null){n.child=a;break}e=a.sibling,a.sibling=t,t=a,a=e}Tr(n,!0,t,null,r);break;case"together":Tr(n,!1,null,null,void 0);break;default:n.memoizedState=null}return n.child}function ta(e,n){!(n.mode&1)&&e!==null&&(e.alternate=null,n.alternate=null,n.flags|=2)}function Wn(e,n,t){if(e!==null&&(n.dependencies=e.dependencies),rt|=n.lanes,!(t&n.childLanes))return null;if(e!==null&&n.child!==e.child)throw Error(_(153));if(n.child!==null){for(e=n.child,t=jn(e,e.pendingProps),n.child=t,t.return=n;e.sibling!==null;)e=e.sibling,t=t.sibling=jn(e,e.pendingProps),t.return=n;t.sibling=null}return n.child}function Bd(e,n,t){switch(n.tag){case 3:rc(n),Rt();break;case 5:Rg(n);break;case 1:Oe(n.type)&&ha(n);break;case 4:Hs(n,n.stateNode.containerInfo);break;case 10:var l=n.type._context,a=n.memoizedProps.value;b(fa,l._currentValue),l._currentValue=a;break;case 13:if(l=n.memoizedState,l!==null)return l.dehydrated!==null?(b(ie,ie.current&1),n.flags|=128,null):t&n.child.childLanes?sc(e,n,t):(b(ie,ie.current&1),e=Wn(e,n,t),e!==null?e.sibling:null);b(ie,ie.current&1);break;case 19:if(l=(t&n.childLanes)!==0,e.flags&128){if(l)return ic(e,n,t);n.flags|=128}if(a=n.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),b(ie,ie.current),l)break;return null;case 22:case 23:return n.lanes=0,lc(e,n,t)}return Wn(e,n,t)}var oc,ts,gc,cc;oc=function(e,n){for(var t=n.child;t!==null;){if(t.tag===5||t.tag===6)e.appendChild(t.stateNode);else if(t.tag!==4&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break;for(;t.sibling===null;){if(t.return===null||t.return===n)return;t=t.return}t.sibling.return=t.return,t=t.sibling}};ts=function(){};gc=function(e,n,t,l){var a=e.memoizedProps;if(a!==l){e=n.stateNode,bn(hn.current);var r=null;switch(t){case"input":a=Cr(e,a),l=Cr(e,l),r=[];break;case"select":a=ge({},a,{value:void 0}),l=ge({},l,{value:void 0}),r=[];break;case"textarea":a=Gr(e,a),l=Gr(e,l),r=[];break;default:typeof a.onClick!="function"&&typeof l.onClick=="function"&&(e.onclick=pa)}Nr(t,l);var s;t=null;for(c in a)if(!l.hasOwnProperty(c)&&a.hasOwnProperty(c)&&a[c]!=null)if(c==="style"){var o=a[c];for(s in o)o.hasOwnProperty(s)&&(t||(t={}),t[s]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(ol.hasOwnProperty(c)?r||(r=[]):(r=r||[]).push(c,null));for(c in l){var i=l[c];if(o=a!=null?a[c]:void 0,l.hasOwnProperty(c)&&i!==o&&(i!=null||o!=null))if(c==="style")if(o){for(s in o)!o.hasOwnProperty(s)||i&&i.hasOwnProperty(s)||(t||(t={}),t[s]="");for(s in i)i.hasOwnProperty(s)&&o[s]!==i[s]&&(t||(t={}),t[s]=i[s])}else t||(r||(r=[]),r.push(c,t)),t=i;else c==="dangerouslySetInnerHTML"?(i=i?i.__html:void 0,o=o?o.__html:void 0,i!=null&&o!==i&&(r=r||[]).push(c,i)):c==="children"?typeof i!="string"&&typeof i!="number"||(r=r||[]).push(c,""+i):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(ol.hasOwnProperty(c)?(i!=null&&c==="onScroll"&&ae("scroll",e),r||o===i||(r=[])):(r=r||[]).push(c,i))}t&&(r=r||[]).push("style",t);var c=r;(n.updateQueue=c)&&(n.flags|=4)}};cc=function(e,n,t,l){t!==l&&(n.flags|=4)};function Yt(e,n){if(!se)switch(e.tailMode){case"hidden":n=e.tail;for(var t=null;n!==null;)n.alternate!==null&&(t=n),n=n.sibling;t===null?e.tail=null:t.sibling=null;break;case"collapsed":t=e.tail;for(var l=null;t!==null;)t.alternate!==null&&(l=t),t=t.sibling;l===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:l.sibling=null}}function Ve(e){var n=e.alternate!==null&&e.alternate.child===e.child,t=0,l=0;if(n)for(var a=e.child;a!==null;)t|=a.lanes|a.childLanes,l|=a.subtreeFlags&14680064,l|=a.flags&14680064,a.return=e,a=a.sibling;else for(a=e.child;a!==null;)t|=a.lanes|a.childLanes,l|=a.subtreeFlags,l|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=l,e.childLanes=t,n}function Id(e,n,t){var l=n.pendingProps;switch(Ps(n),n.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ve(n),null;case 1:return Oe(n.type)&&Ta(),Ve(n),null;case 3:return l=n.stateNode,It(),re(Le),re(ve),Os(),l.pendingContext&&(l.context=l.pendingContext,l.pendingContext=null),(e===null||e.child===null)&&(ql(n)?n.flags|=4:e===null||e.memoizedState.isDehydrated&&!(n.flags&256)||(n.flags|=1024,on!==null&&(cs(on),on=null))),ts(e,n),Ve(n),null;case 5:Ls(n);var a=bn(_l.current);if(t=n.type,e!==null&&n.stateNode!=null)gc(e,n,t,l,a),e.ref!==n.ref&&(n.flags|=512,n.flags|=2097152);else{if(!l){if(n.stateNode===null)throw Error(_(166));return Ve(n),null}if(e=bn(hn.current),ql(n)){l=n.stateNode,t=n.type;var r=n.memoizedProps;switch(l[pn]=n,l[El]=r,e=(n.mode&1)!==0,t){case"dialog":ae("cancel",l),ae("close",l);break;case"iframe":case"object":case"embed":ae("load",l);break;case"video":case"audio":for(a=0;a<Jt.length;a++)ae(Jt[a],l);break;case"source":ae("error",l);break;case"img":case"image":case"link":ae("error",l),ae("load",l);break;case"details":ae("toggle",l);break;case"input":ui(l,r),ae("invalid",l);break;case"select":l._wrapperState={wasMultiple:!!r.multiple},ae("invalid",l);break;case"textarea":mi(l,r),ae("invalid",l)}Nr(t,r),a=null;for(var s in r)if(r.hasOwnProperty(s)){var o=r[s];s==="children"?typeof o=="string"?l.textContent!==o&&(r.suppressHydrationWarning!==!0&&Ol(l.textContent,o,e),a=["children",o]):typeof o=="number"&&l.textContent!==""+o&&(r.suppressHydrationWarning!==!0&&Ol(l.textContent,o,e),a=["children",""+o]):ol.hasOwnProperty(s)&&o!=null&&s==="onScroll"&&ae("scroll",l)}switch(t){case"input":Rl(l),di(l,r,!0);break;case"textarea":Rl(l),pi(l);break;case"select":case"option":break;default:typeof r.onClick=="function"&&(l.onclick=pa)}l=a,n.updateQueue=l,l!==null&&(n.flags|=4)}else{s=a.nodeType===9?a:a.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Fo(t)),e==="http://www.w3.org/1999/xhtml"?t==="script"?(e=s.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof l.is=="string"?e=s.createElement(t,{is:l.is}):(e=s.createElement(t),t==="select"&&(s=e,l.multiple?s.multiple=!0:l.size&&(s.size=l.size))):e=s.createElementNS(e,t),e[pn]=n,e[El]=l,oc(e,n,!1,!1),n.stateNode=e;e:{switch(s=vr(t,l),t){case"dialog":ae("cancel",e),ae("close",e),a=l;break;case"iframe":case"object":case"embed":ae("load",e),a=l;break;case"video":case"audio":for(a=0;a<Jt.length;a++)ae(Jt[a],e);a=l;break;case"source":ae("error",e),a=l;break;case"img":case"image":case"link":ae("error",e),ae("load",e),a=l;break;case"details":ae("toggle",e),a=l;break;case"input":ui(e,l),a=Cr(e,l),ae("invalid",e);break;case"option":a=l;break;case"select":e._wrapperState={wasMultiple:!!l.multiple},a=ge({},l,{value:void 0}),ae("invalid",e);break;case"textarea":mi(e,l),a=Gr(e,l),ae("invalid",e);break;default:a=l}Nr(t,a),o=a;for(r in o)if(o.hasOwnProperty(r)){var i=o[r];r==="style"?Oo(e,i):r==="dangerouslySetInnerHTML"?(i=i?i.__html:void 0,i!=null&&Ho(e,i)):r==="children"?typeof i=="string"?(t!=="textarea"||i!=="")&&gl(e,i):typeof i=="number"&&gl(e,""+i):r!=="suppressContentEditableWarning"&&r!=="suppressHydrationWarning"&&r!=="autoFocus"&&(ol.hasOwnProperty(r)?i!=null&&r==="onScroll"&&ae("scroll",e):i!=null&&ys(e,r,i,s))}switch(t){case"input":Rl(e),di(e,l,!1);break;case"textarea":Rl(e),pi(e);break;case"option":l.value!=null&&e.setAttribute("value",""+zn(l.value));break;case"select":e.multiple=!!l.multiple,r=l.value,r!=null?Ct(e,!!l.multiple,r,!1):l.defaultValue!=null&&Ct(e,!!l.multiple,l.defaultValue,!0);break;default:typeof a.onClick=="function"&&(e.onclick=pa)}switch(t){case"button":case"input":case"select":case"textarea":l=!!l.autoFocus;break e;case"img":l=!0;break e;default:l=!1}}l&&(n.flags|=4)}n.ref!==null&&(n.flags|=512,n.flags|=2097152)}return Ve(n),null;case 6:if(e&&n.stateNode!=null)cc(e,n,e.memoizedProps,l);else{if(typeof l!="string"&&n.stateNode===null)throw Error(_(166));if(t=bn(_l.current),bn(hn.current),ql(n)){if(l=n.stateNode,t=n.memoizedProps,l[pn]=n,(r=l.nodeValue!==t)&&(e=Ye,e!==null))switch(e.tag){case 3:Ol(l.nodeValue,t,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Ol(l.nodeValue,t,(e.mode&1)!==0)}r&&(n.flags|=4)}else l=(t.nodeType===9?t:t.ownerDocument).createTextNode(l),l[pn]=n,n.stateNode=l}return Ve(n),null;case 13:if(re(ie),l=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(se&&Ue!==null&&n.mode&1&&!(n.flags&128))Vg(),Rt(),n.flags|=98560,r=!1;else if(r=ql(n),l!==null&&l.dehydrated!==null){if(e===null){if(!r)throw Error(_(318));if(r=n.memoizedState,r=r!==null?r.dehydrated:null,!r)throw Error(_(317));r[pn]=n}else Rt(),!(n.flags&128)&&(n.memoizedState=null),n.flags|=4;Ve(n),r=!1}else on!==null&&(cs(on),on=null),r=!0;if(!r)return n.flags&65536?n:null}return n.flags&128?(n.lanes=t,n):(l=l!==null,l!==(e!==null&&e.memoizedState!==null)&&l&&(n.child.flags|=8192,n.mode&1&&(e===null||ie.current&1?fe===0&&(fe=3):bs())),n.updateQueue!==null&&(n.flags|=4),Ve(n),null);case 4:return It(),ts(e,n),e===null&&hl(n.stateNode.containerInfo),Ve(n),null;case 10:return Ms(n.type._context),Ve(n),null;case 17:return Oe(n.type)&&Ta(),Ve(n),null;case 19:if(re(ie),r=n.memoizedState,r===null)return Ve(n),null;if(l=(n.flags&128)!==0,s=r.rendering,s===null)if(l)Yt(r,!1);else{if(fe!==0||e!==null&&e.flags&128)for(e=n.child;e!==null;){if(s=Da(e),s!==null){for(n.flags|=128,Yt(r,!1),l=s.updateQueue,l!==null&&(n.updateQueue=l,n.flags|=4),n.subtreeFlags=0,l=t,t=n.child;t!==null;)r=t,e=l,r.flags&=14680066,s=r.alternate,s===null?(r.childLanes=0,r.lanes=e,r.child=null,r.subtreeFlags=0,r.memoizedProps=null,r.memoizedState=null,r.updateQueue=null,r.dependencies=null,r.stateNode=null):(r.childLanes=s.childLanes,r.lanes=s.lanes,r.child=s.child,r.subtreeFlags=0,r.deletions=null,r.memoizedProps=s.memoizedProps,r.memoizedState=s.memoizedState,r.updateQueue=s.updateQueue,r.type=s.type,e=s.dependencies,r.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t=t.sibling;return b(ie,ie.current&1|2),n.child}e=e.sibling}r.tail!==null&&pe()>At&&(n.flags|=128,l=!0,Yt(r,!1),n.lanes=4194304)}else{if(!l)if(e=Da(s),e!==null){if(n.flags|=128,l=!0,t=e.updateQueue,t!==null&&(n.updateQueue=t,n.flags|=4),Yt(r,!0),r.tail===null&&r.tailMode==="hidden"&&!s.alternate&&!se)return Ve(n),null}else 2*pe()-r.renderingStartTime>At&&t!==1073741824&&(n.flags|=128,l=!0,Yt(r,!1),n.lanes=4194304);r.isBackwards?(s.sibling=n.child,n.child=s):(t=r.last,t!==null?t.sibling=s:n.child=s,r.last=s)}return r.tail!==null?(n=r.tail,r.rendering=n,r.tail=n.sibling,r.renderingStartTime=pe(),n.sibling=null,t=ie.current,b(ie,l?t&1|2:t&1),n):(Ve(n),null);case 22:case 23:return Js(),l=n.memoizedState!==null,e!==null&&e.memoizedState!==null!==l&&(n.flags|=8192),l&&n.mode&1?$e&1073741824&&(Ve(n),n.subtreeFlags&6&&(n.flags|=8192)):Ve(n),null;case 24:return null;case 25:return null}throw Error(_(156,n.tag))}function Md(e,n){switch(Ps(n),n.tag){case 1:return Oe(n.type)&&Ta(),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return It(),re(Le),re(ve),Os(),e=n.flags,e&65536&&!(e&128)?(n.flags=e&-65537|128,n):null;case 5:return Ls(n),null;case 13:if(re(ie),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(_(340));Rt()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return re(ie),null;case 4:return It(),null;case 10:return Ms(n.type._context),null;case 22:case 23:return Js(),null;case 24:return null;default:return null}}var $l=!1,Ne=!1,Ad=typeof WeakSet=="function"?WeakSet:Set,k=null;function St(e,n){var t=e.ref;if(t!==null)if(typeof t=="function")try{t(null)}catch(l){ue(e,n,l)}else t.current=null}function ls(e,n,t){try{t()}catch(l){ue(e,n,l)}}var lo=!1;function Fd(e,n){if(Lr=ua,e=Tg(),vs(e)){if("selectionStart"in e)var t={start:e.selectionStart,end:e.selectionEnd};else e:{t=(t=e.ownerDocument)&&t.defaultView||window;var l=t.getSelection&&t.getSelection();if(l&&l.rangeCount!==0){t=l.anchorNode;var a=l.anchorOffset,r=l.focusNode;l=l.focusOffset;try{t.nodeType,r.nodeType}catch{t=null;break e}var s=0,o=-1,i=-1,c=0,h=0,p=e,T=null;n:for(;;){for(var f;p!==t||a!==0&&p.nodeType!==3||(o=s+a),p!==r||l!==0&&p.nodeType!==3||(i=s+l),p.nodeType===3&&(s+=p.nodeValue.length),(f=p.firstChild)!==null;)T=p,p=f;for(;;){if(p===e)break n;if(T===t&&++c===a&&(o=s),T===r&&++h===l&&(i=s),(f=p.nextSibling)!==null)break;p=T,T=p.parentNode}p=f}t=o===-1||i===-1?null:{start:o,end:i}}else t=null}t=t||{start:0,end:0}}else t=null;for(Or={focusedElem:e,selectionRange:t},ua=!1,k=n;k!==null;)if(n=k,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,k=e;else for(;k!==null;){n=k;try{var S=n.alternate;if(n.flags&1024)switch(n.tag){case 0:case 11:case 15:break;case 1:if(S!==null){var x=S.memoizedProps,z=S.memoizedState,u=n.stateNode,g=u.getSnapshotBeforeUpdate(n.elementType===n.type?x:rn(n.type,x),z);u.__reactInternalSnapshotBeforeUpdate=g}break;case 3:var d=n.stateNode.containerInfo;d.nodeType===1?d.textContent="":d.nodeType===9&&d.documentElement&&d.removeChild(d.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(_(163))}}catch(E){ue(n,n.return,E)}if(e=n.sibling,e!==null){e.return=n.return,k=e;break}k=n.return}return S=lo,lo=!1,S}function rl(e,n,t){var l=n.updateQueue;if(l=l!==null?l.lastEffect:null,l!==null){var a=l=l.next;do{if((a.tag&e)===e){var r=a.destroy;a.destroy=void 0,r!==void 0&&ls(n,t,r)}a=a.next}while(a!==l)}}function Ha(e,n){if(n=n.updateQueue,n=n!==null?n.lastEffect:null,n!==null){var t=n=n.next;do{if((t.tag&e)===e){var l=t.create;t.destroy=l()}t=t.next}while(t!==n)}}function as(e){var n=e.ref;if(n!==null){var t=e.stateNode;switch(e.tag){case 5:e=t;break;default:e=t}typeof n=="function"?n(e):n.current=e}}function uc(e){var n=e.alternate;n!==null&&(e.alternate=null,uc(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&(delete n[pn],delete n[El],delete n[zr],delete n[_d],delete n[Sd])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function dc(e){return e.tag===5||e.tag===3||e.tag===4}function ao(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||dc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function rs(e,n,t){var l=e.tag;if(l===5||l===6)e=e.stateNode,n?t.nodeType===8?t.parentNode.insertBefore(e,n):t.insertBefore(e,n):(t.nodeType===8?(n=t.parentNode,n.insertBefore(e,t)):(n=t,n.appendChild(e)),t=t._reactRootContainer,t!=null||n.onclick!==null||(n.onclick=pa));else if(l!==4&&(e=e.child,e!==null))for(rs(e,n,t),e=e.sibling;e!==null;)rs(e,n,t),e=e.sibling}function ss(e,n,t){var l=e.tag;if(l===5||l===6)e=e.stateNode,n?t.insertBefore(e,n):t.appendChild(e);else if(l!==4&&(e=e.child,e!==null))for(ss(e,n,t),e=e.sibling;e!==null;)ss(e,n,t),e=e.sibling}var we=null,sn=!1;function Vn(e,n,t){for(t=t.child;t!==null;)mc(e,n,t),t=t.sibling}function mc(e,n,t){if(Tn&&typeof Tn.onCommitFiberUnmount=="function")try{Tn.onCommitFiberUnmount(ka,t)}catch{}switch(t.tag){case 5:Ne||St(t,n);case 6:var l=we,a=sn;we=null,Vn(e,n,t),we=l,sn=a,we!==null&&(sn?(e=we,t=t.stateNode,e.nodeType===8?e.parentNode.removeChild(t):e.removeChild(t)):we.removeChild(t.stateNode));break;case 18:we!==null&&(sn?(e=we,t=t.stateNode,e.nodeType===8?or(e.parentNode,t):e.nodeType===1&&or(e,t),ml(e)):or(we,t.stateNode));break;case 4:l=we,a=sn,we=t.stateNode.containerInfo,sn=!0,Vn(e,n,t),we=l,sn=a;break;case 0:case 11:case 14:case 15:if(!Ne&&(l=t.updateQueue,l!==null&&(l=l.lastEffect,l!==null))){a=l=l.next;do{var r=a,s=r.destroy;r=r.tag,s!==void 0&&(r&2||r&4)&&ls(t,n,s),a=a.next}while(a!==l)}Vn(e,n,t);break;case 1:if(!Ne&&(St(t,n),l=t.stateNode,typeof l.componentWillUnmount=="function"))try{l.props=t.memoizedProps,l.state=t.memoizedState,l.componentWillUnmount()}catch(o){ue(t,n,o)}Vn(e,n,t);break;case 21:Vn(e,n,t);break;case 22:t.mode&1?(Ne=(l=Ne)||t.memoizedState!==null,Vn(e,n,t),Ne=l):Vn(e,n,t);break;default:Vn(e,n,t)}}function ro(e){var n=e.updateQueue;if(n!==null){e.updateQueue=null;var t=e.stateNode;t===null&&(t=e.stateNode=new Ad),n.forEach(function(l){var a=Yd.bind(null,e,l);t.has(l)||(t.add(l),l.then(a,a))})}}function an(e,n){var t=n.deletions;if(t!==null)for(var l=0;l<t.length;l++){var a=t[l];try{var r=e,s=n,o=s;e:for(;o!==null;){switch(o.tag){case 5:we=o.stateNode,sn=!1;break e;case 3:we=o.stateNode.containerInfo,sn=!0;break e;case 4:we=o.stateNode.containerInfo,sn=!0;break e}o=o.return}if(we===null)throw Error(_(160));mc(r,s,a),we=null,sn=!1;var i=a.alternate;i!==null&&(i.return=null),a.return=null}catch(c){ue(a,n,c)}}if(n.subtreeFlags&12854)for(n=n.child;n!==null;)pc(n,e),n=n.sibling}function pc(e,n){var t=e.alternate,l=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(an(n,e),dn(e),l&4){try{rl(3,e,e.return),Ha(3,e)}catch(x){ue(e,e.return,x)}try{rl(5,e,e.return)}catch(x){ue(e,e.return,x)}}break;case 1:an(n,e),dn(e),l&512&&t!==null&&St(t,t.return);break;case 5:if(an(n,e),dn(e),l&512&&t!==null&&St(t,t.return),e.flags&32){var a=e.stateNode;try{gl(a,"")}catch(x){ue(e,e.return,x)}}if(l&4&&(a=e.stateNode,a!=null)){var r=e.memoizedProps,s=t!==null?t.memoizedProps:r,o=e.type,i=e.updateQueue;if(e.updateQueue=null,i!==null)try{o==="input"&&r.type==="radio"&&r.name!=null&&Mo(a,r),vr(o,s);var c=vr(o,r);for(s=0;s<i.length;s+=2){var h=i[s],p=i[s+1];h==="style"?Oo(a,p):h==="dangerouslySetInnerHTML"?Ho(a,p):h==="children"?gl(a,p):ys(a,h,p,c)}switch(o){case"input":xr(a,r);break;case"textarea":Ao(a,r);break;case"select":var T=a._wrapperState.wasMultiple;a._wrapperState.wasMultiple=!!r.multiple;var f=r.value;f!=null?Ct(a,!!r.multiple,f,!1):T!==!!r.multiple&&(r.defaultValue!=null?Ct(a,!!r.multiple,r.defaultValue,!0):Ct(a,!!r.multiple,r.multiple?[]:"",!1))}a[El]=r}catch(x){ue(e,e.return,x)}}break;case 6:if(an(n,e),dn(e),l&4){if(e.stateNode===null)throw Error(_(162));a=e.stateNode,r=e.memoizedProps;try{a.nodeValue=r}catch(x){ue(e,e.return,x)}}break;case 3:if(an(n,e),dn(e),l&4&&t!==null&&t.memoizedState.isDehydrated)try{ml(n.containerInfo)}catch(x){ue(e,e.return,x)}break;case 4:an(n,e),dn(e);break;case 13:an(n,e),dn(e),a=e.child,a.flags&8192&&(r=a.memoizedState!==null,a.stateNode.isHidden=r,!r||a.alternate!==null&&a.alternate.memoizedState!==null||(Xs=pe())),l&4&&ro(e);break;case 22:if(h=t!==null&&t.memoizedState!==null,e.mode&1?(Ne=(c=Ne)||h,an(n,e),Ne=c):an(n,e),dn(e),l&8192){if(c=e.memoizedState!==null,(e.stateNode.isHidden=c)&&!h&&e.mode&1)for(k=e,h=e.child;h!==null;){for(p=k=h;k!==null;){switch(T=k,f=T.child,T.tag){case 0:case 11:case 14:case 15:rl(4,T,T.return);break;case 1:St(T,T.return);var S=T.stateNode;if(typeof S.componentWillUnmount=="function"){l=T,t=T.return;try{n=l,S.props=n.memoizedProps,S.state=n.memoizedState,S.componentWillUnmount()}catch(x){ue(l,t,x)}}break;case 5:St(T,T.return);break;case 22:if(T.memoizedState!==null){io(p);continue}}f!==null?(f.return=T,k=f):io(p)}h=h.sibling}e:for(h=null,p=e;;){if(p.tag===5){if(h===null){h=p;try{a=p.stateNode,c?(r=a.style,typeof r.setProperty=="function"?r.setProperty("display","none","important"):r.display="none"):(o=p.stateNode,i=p.memoizedProps.style,s=i!=null&&i.hasOwnProperty("display")?i.display:null,o.style.display=Lo("display",s))}catch(x){ue(e,e.return,x)}}}else if(p.tag===6){if(h===null)try{p.stateNode.nodeValue=c?"":p.memoizedProps}catch(x){ue(e,e.return,x)}}else if((p.tag!==22&&p.tag!==23||p.memoizedState===null||p===e)&&p.child!==null){p.child.return=p,p=p.child;continue}if(p===e)break e;for(;p.sibling===null;){if(p.return===null||p.return===e)break e;h===p&&(h=null),p=p.return}h===p&&(h=null),p.sibling.return=p.return,p=p.sibling}}break;case 19:an(n,e),dn(e),l&4&&ro(e);break;case 21:break;default:an(n,e),dn(e)}}function dn(e){var n=e.flags;if(n&2){try{e:{for(var t=e.return;t!==null;){if(dc(t)){var l=t;break e}t=t.return}throw Error(_(160))}switch(l.tag){case 5:var a=l.stateNode;l.flags&32&&(gl(a,""),l.flags&=-33);var r=ao(e);ss(e,r,a);break;case 3:case 4:var s=l.stateNode.containerInfo,o=ao(e);rs(e,o,s);break;default:throw Error(_(161))}}catch(i){ue(e,e.return,i)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function Hd(e,n,t){k=e,Tc(e)}function Tc(e,n,t){for(var l=(e.mode&1)!==0;k!==null;){var a=k,r=a.child;if(a.tag===22&&l){var s=a.memoizedState!==null||$l;if(!s){var o=a.alternate,i=o!==null&&o.memoizedState!==null||Ne;o=$l;var c=Ne;if($l=s,(Ne=i)&&!c)for(k=a;k!==null;)s=k,i=s.child,s.tag===22&&s.memoizedState!==null?oo(a):i!==null?(i.return=s,k=i):oo(a);for(;r!==null;)k=r,Tc(r),r=r.sibling;k=a,$l=o,Ne=c}so(e)}else a.subtreeFlags&8772&&r!==null?(r.return=a,k=r):so(e)}}function so(e){for(;k!==null;){var n=k;if(n.flags&8772){var t=n.alternate;try{if(n.flags&8772)switch(n.tag){case 0:case 11:case 15:Ne||Ha(5,n);break;case 1:var l=n.stateNode;if(n.flags&4&&!Ne)if(t===null)l.componentDidMount();else{var a=n.elementType===n.type?t.memoizedProps:rn(n.type,t.memoizedProps);l.componentDidUpdate(a,t.memoizedState,l.__reactInternalSnapshotBeforeUpdate)}var r=n.updateQueue;r!==null&&zi(n,r,l);break;case 3:var s=n.updateQueue;if(s!==null){if(t=null,n.child!==null)switch(n.child.tag){case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}zi(n,s,t)}break;case 5:var o=n.stateNode;if(t===null&&n.flags&4){t=o;var i=n.memoizedProps;switch(n.type){case"button":case"input":case"select":case"textarea":i.autoFocus&&t.focus();break;case"img":i.src&&(t.src=i.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(n.memoizedState===null){var c=n.alternate;if(c!==null){var h=c.memoizedState;if(h!==null){var p=h.dehydrated;p!==null&&ml(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(_(163))}Ne||n.flags&512&&as(n)}catch(T){ue(n,n.return,T)}}if(n===e){k=null;break}if(t=n.sibling,t!==null){t.return=n.return,k=t;break}k=n.return}}function io(e){for(;k!==null;){var n=k;if(n===e){k=null;break}var t=n.sibling;if(t!==null){t.return=n.return,k=t;break}k=n.return}}function oo(e){for(;k!==null;){var n=k;try{switch(n.tag){case 0:case 11:case 15:var t=n.return;try{Ha(4,n)}catch(i){ue(n,t,i)}break;case 1:var l=n.stateNode;if(typeof l.componentDidMount=="function"){var a=n.return;try{l.componentDidMount()}catch(i){ue(n,a,i)}}var r=n.return;try{as(n)}catch(i){ue(n,r,i)}break;case 5:var s=n.return;try{as(n)}catch(i){ue(n,s,i)}}}catch(i){ue(n,n.return,i)}if(n===e){k=null;break}var o=n.sibling;if(o!==null){o.return=n.return,k=o;break}k=n.return}}var Ld=Math.ceil,xa=Gn.ReactCurrentDispatcher,Qs=Gn.ReactCurrentOwner,en=Gn.ReactCurrentBatchConfig,Y=0,De=null,Te=null,Ce=0,$e=0,Dt=Yn(0),fe=0,Cl=null,rt=0,La=0,Ks=0,sl=null,Fe=null,Xs=0,At=1/0,En=null,Wa=!1,is=null,On=null,Ul=!1,In=null,Ga=0,il=0,os=null,la=-1,aa=0;function Be(){return Y&6?pe():la!==-1?la:la=pe()}function qn(e){return e.mode&1?Y&2&&Ce!==0?Ce&-Ce:wd.transition!==null?(aa===0&&(aa=bo()),aa):(e=J,e!==0||(e=window.event,e=e===void 0?16:sg(e.type)),e):1}function cn(e,n,t,l){if(50<il)throw il=0,os=null,Error(_(185));Wl(e,t,l),(!(Y&2)||e!==De)&&(e===De&&(!(Y&2)&&(La|=t),fe===4&&Rn(e,Ce)),qe(e,l),t===1&&Y===0&&!(n.mode&1)&&(At=pe()+500,Ma&&Qn()))}function qe(e,n){var t=e.callbackNode;wu(e,n);var l=ca(e,e===De?Ce:0);if(l===0)t!==null&&yi(t),e.callbackNode=null,e.callbackPriority=0;else if(n=l&-l,e.callbackPriority!==n){if(t!=null&&yi(t),n===1)e.tag===0?Dd(go.bind(null,e)):xg(go.bind(null,e)),Ed(function(){!(Y&6)&&Qn()}),t=null;else{switch(eg(l)){case 1:t=Ds;break;case 4:t=Zo;break;case 16:t=ga;break;case 536870912:t=Jo;break;default:t=ga}t=wc(t,hc.bind(null,e))}e.callbackPriority=n,e.callbackNode=t}}function hc(e,n){if(la=-1,aa=0,Y&6)throw Error(_(327));var t=e.callbackNode;if(Nt()&&e.callbackNode!==t)return null;var l=ca(e,e===De?Ce:0);if(l===0)return null;if(l&30||l&e.expiredLanes||n)n=Va(e,l);else{n=l;var a=Y;Y|=2;var r=Ec();(De!==e||Ce!==n)&&(En=null,At=pe()+500,et(e,n));do try{jd();break}catch(o){yc(e,o)}while(!0);Is(),xa.current=r,Y=a,Te!==null?n=0:(De=null,Ce=0,n=fe)}if(n!==0){if(n===2&&(a=Ir(e),a!==0&&(l=a,n=gs(e,a))),n===1)throw t=Cl,et(e,0),Rn(e,l),qe(e,pe()),t;if(n===6)Rn(e,l);else{if(a=e.current.alternate,!(l&30)&&!Od(a)&&(n=Va(e,l),n===2&&(r=Ir(e),r!==0&&(l=r,n=gs(e,r))),n===1))throw t=Cl,et(e,0),Rn(e,l),qe(e,pe()),t;switch(e.finishedWork=a,e.finishedLanes=l,n){case 0:case 1:throw Error(_(345));case 2:Xn(e,Fe,En);break;case 3:if(Rn(e,l),(l&130023424)===l&&(n=Xs+500-pe(),10<n)){if(ca(e,0)!==0)break;if(a=e.suspendedLanes,(a&l)!==l){Be(),e.pingedLanes|=e.suspendedLanes&a;break}e.timeoutHandle=jr(Xn.bind(null,e,Fe,En),n);break}Xn(e,Fe,En);break;case 4:if(Rn(e,l),(l&4194240)===l)break;for(n=e.eventTimes,a=-1;0<l;){var s=31-gn(l);r=1<<s,s=n[s],s>a&&(a=s),l&=~r}if(l=a,l=pe()-l,l=(120>l?120:480>l?480:1080>l?1080:1920>l?1920:3e3>l?3e3:4320>l?4320:1960*Ld(l/1960))-l,10<l){e.timeoutHandle=jr(Xn.bind(null,e,Fe,En),l);break}Xn(e,Fe,En);break;case 5:Xn(e,Fe,En);break;default:throw Error(_(329))}}}return qe(e,pe()),e.callbackNode===t?hc.bind(null,e):null}function gs(e,n){var t=sl;return e.current.memoizedState.isDehydrated&&(et(e,n).flags|=256),e=Va(e,n),e!==2&&(n=Fe,Fe=t,n!==null&&cs(n)),e}function cs(e){Fe===null?Fe=e:Fe.push.apply(Fe,e)}function Od(e){for(var n=e;;){if(n.flags&16384){var t=n.updateQueue;if(t!==null&&(t=t.stores,t!==null))for(var l=0;l<t.length;l++){var a=t[l],r=a.getSnapshot;a=a.value;try{if(!un(r(),a))return!1}catch{return!1}}}if(t=n.child,n.subtreeFlags&16384&&t!==null)t.return=n,n=t;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function Rn(e,n){for(n&=~Ks,n&=~La,e.suspendedLanes|=n,e.pingedLanes&=~n,e=e.expirationTimes;0<n;){var t=31-gn(n),l=1<<t;e[t]=-1,n&=~l}}function go(e){if(Y&6)throw Error(_(327));Nt();var n=ca(e,0);if(!(n&1))return qe(e,pe()),null;var t=Va(e,n);if(e.tag!==0&&t===2){var l=Ir(e);l!==0&&(n=l,t=gs(e,l))}if(t===1)throw t=Cl,et(e,0),Rn(e,n),qe(e,pe()),t;if(t===6)throw Error(_(345));return e.finishedWork=e.current.alternate,e.finishedLanes=n,Xn(e,Fe,En),qe(e,pe()),null}function Zs(e,n){var t=Y;Y|=1;try{return e(n)}finally{Y=t,Y===0&&(At=pe()+500,Ma&&Qn())}}function st(e){In!==null&&In.tag===0&&!(Y&6)&&Nt();var n=Y;Y|=1;var t=en.transition,l=J;try{if(en.transition=null,J=1,e)return e()}finally{J=l,en.transition=t,Y=n,!(Y&6)&&Qn()}}function Js(){$e=Dt.current,re(Dt)}function et(e,n){e.finishedWork=null,e.finishedLanes=0;var t=e.timeoutHandle;if(t!==-1&&(e.timeoutHandle=-1,yd(t)),Te!==null)for(t=Te.return;t!==null;){var l=t;switch(Ps(l),l.tag){case 1:l=l.type.childContextTypes,l!=null&&Ta();break;case 3:It(),re(Le),re(ve),Os();break;case 5:Ls(l);break;case 4:It();break;case 13:re(ie);break;case 19:re(ie);break;case 10:Ms(l.type._context);break;case 22:case 23:Js()}t=t.return}if(De=e,Te=e=jn(e.current,null),Ce=$e=n,fe=0,Cl=null,Ks=La=rt=0,Fe=sl=null,Jn!==null){for(n=0;n<Jn.length;n++)if(t=Jn[n],l=t.interleaved,l!==null){t.interleaved=null;var a=l.next,r=t.pending;if(r!==null){var s=r.next;r.next=a,l.next=s}t.pending=l}Jn=null}return e}function yc(e,n){do{var t=Te;try{if(Is(),ea.current=Ca,wa){for(var l=oe.memoizedState;l!==null;){var a=l.queue;a!==null&&(a.pending=null),l=l.next}wa=!1}if(at=0,Se=Ee=oe=null,al=!1,Sl=0,Qs.current=null,t===null||t.return===null){fe=1,Cl=n,Te=null;break}e:{var r=e,s=t.return,o=t,i=n;if(n=Ce,o.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){var c=i,h=o,p=h.tag;if(!(h.mode&1)&&(p===0||p===11||p===15)){var T=h.alternate;T?(h.updateQueue=T.updateQueue,h.memoizedState=T.memoizedState,h.lanes=T.lanes):(h.updateQueue=null,h.memoizedState=null)}var f=Xi(s);if(f!==null){f.flags&=-257,Zi(f,s,o,r,n),f.mode&1&&Ki(r,c,n),n=f,i=c;var S=n.updateQueue;if(S===null){var x=new Set;x.add(i),n.updateQueue=x}else S.add(i);break e}else{if(!(n&1)){Ki(r,c,n),bs();break e}i=Error(_(426))}}else if(se&&o.mode&1){var z=Xi(s);if(z!==null){!(z.flags&65536)&&(z.flags|=256),Zi(z,s,o,r,n),Rs(Mt(i,o));break e}}r=i=Mt(i,o),fe!==4&&(fe=2),sl===null?sl=[r]:sl.push(r),r=s;do{switch(r.tag){case 3:r.flags|=65536,n&=-n,r.lanes|=n;var u=ec(r,i,n);ji(r,u);break e;case 1:o=i;var g=r.type,d=r.stateNode;if(!(r.flags&128)&&(typeof g.getDerivedStateFromError=="function"||d!==null&&typeof d.componentDidCatch=="function"&&(On===null||!On.has(d)))){r.flags|=65536,n&=-n,r.lanes|=n;var E=nc(r,o,n);ji(r,E);break e}}r=r.return}while(r!==null)}_c(t)}catch(N){n=N,Te===t&&t!==null&&(Te=t=t.return);continue}break}while(!0)}function Ec(){var e=xa.current;return xa.current=Ca,e===null?Ca:e}function bs(){(fe===0||fe===3||fe===2)&&(fe=4),De===null||!(rt&268435455)&&!(La&268435455)||Rn(De,Ce)}function Va(e,n){var t=Y;Y|=2;var l=Ec();(De!==e||Ce!==n)&&(En=null,et(e,n));do try{qd();break}catch(a){yc(e,a)}while(!0);if(Is(),Y=t,xa.current=l,Te!==null)throw Error(_(261));return De=null,Ce=0,fe}function qd(){for(;Te!==null;)fc(Te)}function jd(){for(;Te!==null&&!pu();)fc(Te)}function fc(e){var n=Dc(e.alternate,e,$e);e.memoizedProps=e.pendingProps,n===null?_c(e):Te=n,Qs.current=null}function _c(e){var n=e;do{var t=n.alternate;if(e=n.return,n.flags&32768){if(t=Md(t,n),t!==null){t.flags&=32767,Te=t;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{fe=6,Te=null;return}}else if(t=Id(t,n,$e),t!==null){Te=t;return}if(n=n.sibling,n!==null){Te=n;return}Te=n=e}while(n!==null);fe===0&&(fe=5)}function Xn(e,n,t){var l=J,a=en.transition;try{en.transition=null,J=1,zd(e,n,t,l)}finally{en.transition=a,J=l}return null}function zd(e,n,t,l){do Nt();while(In!==null);if(Y&6)throw Error(_(327));t=e.finishedWork;var a=e.finishedLanes;if(t===null)return null;if(e.finishedWork=null,e.finishedLanes=0,t===e.current)throw Error(_(177));e.callbackNode=null,e.callbackPriority=0;var r=t.lanes|t.childLanes;if(Cu(e,r),e===De&&(Te=De=null,Ce=0),!(t.subtreeFlags&2064)&&!(t.flags&2064)||Ul||(Ul=!0,wc(ga,function(){return Nt(),null})),r=(t.flags&15990)!==0,t.subtreeFlags&15990||r){r=en.transition,en.transition=null;var s=J;J=1;var o=Y;Y|=4,Qs.current=null,Fd(e,t),pc(t,e),cd(Or),ua=!!Lr,Or=Lr=null,e.current=t,Hd(t),Tu(),Y=o,J=s,en.transition=r}else e.current=t;if(Ul&&(Ul=!1,In=e,Ga=a),r=e.pendingLanes,r===0&&(On=null),Eu(t.stateNode),qe(e,pe()),n!==null)for(l=e.onRecoverableError,t=0;t<n.length;t++)a=n[t],l(a.value,{componentStack:a.stack,digest:a.digest});if(Wa)throw Wa=!1,e=is,is=null,e;return Ga&1&&e.tag!==0&&Nt(),r=e.pendingLanes,r&1?e===os?il++:(il=0,os=e):il=0,Qn(),null}function Nt(){if(In!==null){var e=eg(Ga),n=en.transition,t=J;try{if(en.transition=null,J=16>e?16:e,In===null)var l=!1;else{if(e=In,In=null,Ga=0,Y&6)throw Error(_(331));var a=Y;for(Y|=4,k=e.current;k!==null;){var r=k,s=r.child;if(k.flags&16){var o=r.deletions;if(o!==null){for(var i=0;i<o.length;i++){var c=o[i];for(k=c;k!==null;){var h=k;switch(h.tag){case 0:case 11:case 15:rl(8,h,r)}var p=h.child;if(p!==null)p.return=h,k=p;else for(;k!==null;){h=k;var T=h.sibling,f=h.return;if(uc(h),h===c){k=null;break}if(T!==null){T.return=f,k=T;break}k=f}}}var S=r.alternate;if(S!==null){var x=S.child;if(x!==null){S.child=null;do{var z=x.sibling;x.sibling=null,x=z}while(x!==null)}}k=r}}if(r.subtreeFlags&2064&&s!==null)s.return=r,k=s;else e:for(;k!==null;){if(r=k,r.flags&2048)switch(r.tag){case 0:case 11:case 15:rl(9,r,r.return)}var u=r.sibling;if(u!==null){u.return=r.return,k=u;break e}k=r.return}}var g=e.current;for(k=g;k!==null;){s=k;var d=s.child;if(s.subtreeFlags&2064&&d!==null)d.return=s,k=d;else e:for(s=g;k!==null;){if(o=k,o.flags&2048)try{switch(o.tag){case 0:case 11:case 15:Ha(9,o)}}catch(N){ue(o,o.return,N)}if(o===s){k=null;break e}var E=o.sibling;if(E!==null){E.return=o.return,k=E;break e}k=o.return}}if(Y=a,Qn(),Tn&&typeof Tn.onPostCommitFiberRoot=="function")try{Tn.onPostCommitFiberRoot(ka,e)}catch{}l=!0}return l}finally{J=t,en.transition=n}}return!1}function co(e,n,t){n=Mt(t,n),n=ec(e,n,1),e=Ln(e,n,1),n=Be(),e!==null&&(Wl(e,1,n),qe(e,n))}function ue(e,n,t){if(e.tag===3)co(e,e,t);else for(;n!==null;){if(n.tag===3){co(n,e,t);break}else if(n.tag===1){var l=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof l.componentDidCatch=="function"&&(On===null||!On.has(l))){e=Mt(t,e),e=nc(n,e,1),n=Ln(n,e,1),e=Be(),n!==null&&(Wl(n,1,e),qe(n,e));break}}n=n.return}}function $d(e,n,t){var l=e.pingCache;l!==null&&l.delete(n),n=Be(),e.pingedLanes|=e.suspendedLanes&t,De===e&&(Ce&t)===t&&(fe===4||fe===3&&(Ce&130023424)===Ce&&500>pe()-Xs?et(e,0):Ks|=t),qe(e,n)}function Sc(e,n){n===0&&(e.mode&1?(n=Ml,Ml<<=1,!(Ml&130023424)&&(Ml=4194304)):n=1);var t=Be();e=xn(e,n),e!==null&&(Wl(e,n,t),qe(e,t))}function Ud(e){var n=e.memoizedState,t=0;n!==null&&(t=n.retryLane),Sc(e,t)}function Yd(e,n){var t=0;switch(e.tag){case 13:var l=e.stateNode,a=e.memoizedState;a!==null&&(t=a.retryLane);break;case 19:l=e.stateNode;break;default:throw Error(_(314))}l!==null&&l.delete(n),Sc(e,t)}var Dc;Dc=function(e,n,t){if(e!==null)if(e.memoizedProps!==n.pendingProps||Le.current)He=!0;else{if(!(e.lanes&t)&&!(n.flags&128))return He=!1,Bd(e,n,t);He=!!(e.flags&131072)}else He=!1,se&&n.flags&1048576&&Wg(n,Ea,n.index);switch(n.lanes=0,n.tag){case 2:var l=n.type;ta(e,n),e=n.pendingProps;var a=Pt(n,ve.current);Vt(n,t),a=js(null,n,l,e,a,t);var r=zs();return n.flags|=1,typeof a=="object"&&a!==null&&typeof a.render=="function"&&a.$$typeof===void 0?(n.tag=1,n.memoizedState=null,n.updateQueue=null,Oe(l)?(r=!0,ha(n)):r=!1,n.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,Fs(n),a.updater=Fa,n.stateNode=a,a._reactInternals=n,Xr(n,l,e,t),n=br(null,n,l,!0,r,t)):(n.tag=0,se&&r&&ks(n),Re(null,n,a,t),n=n.child),n;case 16:l=n.elementType;e:{switch(ta(e,n),e=n.pendingProps,a=l._init,l=a(l._payload),n.type=l,a=n.tag=Kd(l),e=rn(l,e),a){case 0:n=Jr(null,n,l,e,t);break e;case 1:n=eo(null,n,l,e,t);break e;case 11:n=Ji(null,n,l,e,t);break e;case 14:n=bi(null,n,l,rn(l.type,e),t);break e}throw Error(_(306,l,""))}return n;case 0:return l=n.type,a=n.pendingProps,a=n.elementType===l?a:rn(l,a),Jr(e,n,l,a,t);case 1:return l=n.type,a=n.pendingProps,a=n.elementType===l?a:rn(l,a),eo(e,n,l,a,t);case 3:e:{if(rc(n),e===null)throw Error(_(387));l=n.pendingProps,r=n.memoizedState,a=r.element,Pg(e,n),Sa(n,l,null,t);var s=n.memoizedState;if(l=s.element,r.isDehydrated)if(r={element:l,isDehydrated:!1,cache:s.cache,pendingSuspenseBoundaries:s.pendingSuspenseBoundaries,transitions:s.transitions},n.updateQueue.baseState=r,n.memoizedState=r,n.flags&256){a=Mt(Error(_(423)),n),n=no(e,n,l,t,a);break e}else if(l!==a){a=Mt(Error(_(424)),n),n=no(e,n,l,t,a);break e}else for(Ue=Hn(n.stateNode.containerInfo.firstChild),Ye=n,se=!0,on=null,t=vg(n,null,l,t),n.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(Rt(),l===a){n=Wn(e,n,t);break e}Re(e,n,l,t)}n=n.child}return n;case 5:return Rg(n),e===null&&Yr(n),l=n.type,a=n.pendingProps,r=e!==null?e.memoizedProps:null,s=a.children,qr(l,a)?s=null:r!==null&&qr(l,r)&&(n.flags|=32),ac(e,n),Re(e,n,s,t),n.child;case 6:return e===null&&Yr(n),null;case 13:return sc(e,n,t);case 4:return Hs(n,n.stateNode.containerInfo),l=n.pendingProps,e===null?n.child=Bt(n,null,l,t):Re(e,n,l,t),n.child;case 11:return l=n.type,a=n.pendingProps,a=n.elementType===l?a:rn(l,a),Ji(e,n,l,a,t);case 7:return Re(e,n,n.pendingProps,t),n.child;case 8:return Re(e,n,n.pendingProps.children,t),n.child;case 12:return Re(e,n,n.pendingProps.children,t),n.child;case 10:e:{if(l=n.type._context,a=n.pendingProps,r=n.memoizedProps,s=a.value,b(fa,l._currentValue),l._currentValue=s,r!==null)if(un(r.value,s)){if(r.children===a.children&&!Le.current){n=Wn(e,n,t);break e}}else for(r=n.child,r!==null&&(r.return=n);r!==null;){var o=r.dependencies;if(o!==null){s=r.child;for(var i=o.firstContext;i!==null;){if(i.context===l){if(r.tag===1){i=Dn(-1,t&-t),i.tag=2;var c=r.updateQueue;if(c!==null){c=c.shared;var h=c.pending;h===null?i.next=i:(i.next=h.next,h.next=i),c.pending=i}}r.lanes|=t,i=r.alternate,i!==null&&(i.lanes|=t),Qr(r.return,t,n),o.lanes|=t;break}i=i.next}}else if(r.tag===10)s=r.type===n.type?null:r.child;else if(r.tag===18){if(s=r.return,s===null)throw Error(_(341));s.lanes|=t,o=s.alternate,o!==null&&(o.lanes|=t),Qr(s,t,n),s=r.sibling}else s=r.child;if(s!==null)s.return=r;else for(s=r;s!==null;){if(s===n){s=null;break}if(r=s.sibling,r!==null){r.return=s.return,s=r;break}s=s.return}r=s}Re(e,n,a.children,t),n=n.child}return n;case 9:return a=n.type,l=n.pendingProps.children,Vt(n,t),a=nn(a),l=l(a),n.flags|=1,Re(e,n,l,t),n.child;case 14:return l=n.type,a=rn(l,n.pendingProps),a=rn(l.type,a),bi(e,n,l,a,t);case 15:return tc(e,n,n.type,n.pendingProps,t);case 17:return l=n.type,a=n.pendingProps,a=n.elementType===l?a:rn(l,a),ta(e,n),n.tag=1,Oe(l)?(e=!0,ha(n)):e=!1,Vt(n,t),bg(n,l,a),Xr(n,l,a,t),br(null,n,l,!0,e,t);case 19:return ic(e,n,t);case 22:return lc(e,n,t)}throw Error(_(156,n.tag))};function wc(e,n){return Xo(e,n)}function Qd(e,n,t,l){this.tag=e,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=l,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function be(e,n,t,l){return new Qd(e,n,t,l)}function ei(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Kd(e){if(typeof e=="function")return ei(e)?1:0;if(e!=null){if(e=e.$$typeof,e===fs)return 11;if(e===_s)return 14}return 2}function jn(e,n){var t=e.alternate;return t===null?(t=be(e.tag,n,e.key,e.mode),t.elementType=e.elementType,t.type=e.type,t.stateNode=e.stateNode,t.alternate=e,e.alternate=t):(t.pendingProps=n,t.type=e.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=e.flags&14680064,t.childLanes=e.childLanes,t.lanes=e.lanes,t.child=e.child,t.memoizedProps=e.memoizedProps,t.memoizedState=e.memoizedState,t.updateQueue=e.updateQueue,n=e.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},t.sibling=e.sibling,t.index=e.index,t.ref=e.ref,t}function ra(e,n,t,l,a,r){var s=2;if(l=e,typeof e=="function")ei(e)&&(s=1);else if(typeof e=="string")s=5;else e:switch(e){case dt:return nt(t.children,a,r,n);case Es:s=8,a|=8;break;case _r:return e=be(12,t,n,a|2),e.elementType=_r,e.lanes=r,e;case Sr:return e=be(13,t,n,a),e.elementType=Sr,e.lanes=r,e;case Dr:return e=be(19,t,n,a),e.elementType=Dr,e.lanes=r,e;case Ro:return Oa(t,a,r,n);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case ko:s=10;break e;case Po:s=9;break e;case fs:s=11;break e;case _s:s=14;break e;case vn:s=16,l=null;break e}throw Error(_(130,e==null?e:typeof e,""))}return n=be(s,t,n,a),n.elementType=e,n.type=l,n.lanes=r,n}function nt(e,n,t,l){return e=be(7,e,l,n),e.lanes=t,e}function Oa(e,n,t,l){return e=be(22,e,l,n),e.elementType=Ro,e.lanes=t,e.stateNode={isHidden:!1},e}function hr(e,n,t){return e=be(6,e,null,n),e.lanes=t,e}function yr(e,n,t){return n=be(4,e.children!==null?e.children:[],e.key,n),n.lanes=t,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}function Xd(e,n,t,l,a){this.tag=n,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Za(0),this.expirationTimes=Za(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Za(0),this.identifierPrefix=l,this.onRecoverableError=a,this.mutableSourceEagerHydrationData=null}function ni(e,n,t,l,a,r,s,o,i){return e=new Xd(e,n,t,o,i),n===1?(n=1,r===!0&&(n|=8)):n=0,r=be(3,null,null,n),e.current=r,r.stateNode=e,r.memoizedState={element:l,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},Fs(r),e}function Zd(e,n,t){var l=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:ut,key:l==null?null:""+l,children:e,containerInfo:n,implementation:t}}function Cc(e){if(!e)return $n;e=e._reactInternals;e:{if(ot(e)!==e||e.tag!==1)throw Error(_(170));var n=e;do{switch(n.tag){case 3:n=n.stateNode.context;break e;case 1:if(Oe(n.type)){n=n.stateNode.__reactInternalMemoizedMergedChildContext;break e}}n=n.return}while(n!==null);throw Error(_(171))}if(e.tag===1){var t=e.type;if(Oe(t))return Cg(e,t,n)}return n}function xc(e,n,t,l,a,r,s,o,i){return e=ni(t,l,!0,e,a,r,s,o,i),e.context=Cc(null),t=e.current,l=Be(),a=qn(t),r=Dn(l,a),r.callback=n??null,Ln(t,r,a),e.current.lanes=a,Wl(e,a,l),qe(e,l),e}function qa(e,n,t,l){var a=n.current,r=Be(),s=qn(a);return t=Cc(t),n.context===null?n.context=t:n.pendingContext=t,n=Dn(r,s),n.payload={element:e},l=l===void 0?null:l,l!==null&&(n.callback=l),e=Ln(a,n,s),e!==null&&(cn(e,a,s,r),bl(e,a,s)),s}function Na(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function uo(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var t=e.retryLane;e.retryLane=t!==0&&t<n?t:n}}function ti(e,n){uo(e,n),(e=e.alternate)&&uo(e,n)}function Jd(){return null}var Wc=typeof reportError=="function"?reportError:function(e){console.error(e)};function li(e){this._internalRoot=e}ja.prototype.render=li.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(_(409));qa(e,n,null,null)};ja.prototype.unmount=li.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;st(function(){qa(null,e,null,null)}),n[Cn]=null}};function ja(e){this._internalRoot=e}ja.prototype.unstable_scheduleHydration=function(e){if(e){var n=lg();e={blockedOn:null,target:e,priority:n};for(var t=0;t<Pn.length&&n!==0&&n<Pn[t].priority;t++);Pn.splice(t,0,e),t===0&&rg(e)}};function ai(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function za(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function mo(){}function bd(e,n,t,l,a){if(a){if(typeof l=="function"){var r=l;l=function(){var c=Na(s);r.call(c)}}var s=xc(n,l,e,0,null,!1,!1,"",mo);return e._reactRootContainer=s,e[Cn]=s.current,hl(e.nodeType===8?e.parentNode:e),st(),s}for(;a=e.lastChild;)e.removeChild(a);if(typeof l=="function"){var o=l;l=function(){var c=Na(i);o.call(c)}}var i=ni(e,0,!1,null,null,!1,!1,"",mo);return e._reactRootContainer=i,e[Cn]=i.current,hl(e.nodeType===8?e.parentNode:e),st(function(){qa(n,i,t,l)}),i}function $a(e,n,t,l,a){var r=t._reactRootContainer;if(r){var s=r;if(typeof a=="function"){var o=a;a=function(){var i=Na(s);o.call(i)}}qa(n,s,e,a)}else s=bd(t,n,e,a,l);return Na(s)}ng=function(e){switch(e.tag){case 3:var n=e.stateNode;if(n.current.memoizedState.isDehydrated){var t=Zt(n.pendingLanes);t!==0&&(ws(n,t|1),qe(n,pe()),!(Y&6)&&(At=pe()+500,Qn()))}break;case 13:st(function(){var l=xn(e,1);if(l!==null){var a=Be();cn(l,e,1,a)}}),ti(e,1)}};Cs=function(e){if(e.tag===13){var n=xn(e,134217728);if(n!==null){var t=Be();cn(n,e,134217728,t)}ti(e,134217728)}};tg=function(e){if(e.tag===13){var n=qn(e),t=xn(e,n);if(t!==null){var l=Be();cn(t,e,n,l)}ti(e,n)}};lg=function(){return J};ag=function(e,n){var t=J;try{return J=e,n()}finally{J=t}};Pr=function(e,n,t){switch(n){case"input":if(xr(e,t),n=t.name,t.type==="radio"&&n!=null){for(t=e;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll("input[name="+JSON.stringify(""+n)+'][type="radio"]'),n=0;n<t.length;n++){var l=t[n];if(l!==e&&l.form===e.form){var a=Ia(l);if(!a)throw Error(_(90));Io(l),xr(l,a)}}}break;case"textarea":Ao(e,t);break;case"select":n=t.value,n!=null&&Ct(e,!!t.multiple,n,!1)}};zo=Zs;$o=st;var em={usingClientEntryPoint:!1,Events:[Vl,ht,Ia,qo,jo,Zs]},Qt={findFiberByHostInstance:Zn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},nm={bundleType:Qt.bundleType,version:Qt.version,rendererPackageName:Qt.rendererPackageName,rendererConfig:Qt.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Gn.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Qo(e),e===null?null:e.stateNode},findFiberByHostInstance:Qt.findFiberByHostInstance||Jd,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Yl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Yl.isDisabled&&Yl.supportsFiber)try{ka=Yl.inject(nm),Tn=Yl}catch{}}Ke.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=em;Ke.createPortal=function(e,n){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!ai(n))throw Error(_(200));return Zd(e,n,null,t)};Ke.createRoot=function(e,n){if(!ai(e))throw Error(_(299));var t=!1,l="",a=Wc;return n!=null&&(n.unstable_strictMode===!0&&(t=!0),n.identifierPrefix!==void 0&&(l=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),n=ni(e,1,!1,null,null,t,!1,l,a),e[Cn]=n.current,hl(e.nodeType===8?e.parentNode:e),new li(n)};Ke.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(_(188)):(e=Object.keys(e).join(","),Error(_(268,e)));return e=Qo(n),e=e===null?null:e.stateNode,e};Ke.flushSync=function(e){return st(e)};Ke.hydrate=function(e,n,t){if(!za(n))throw Error(_(200));return $a(null,e,n,!0,t)};Ke.hydrateRoot=function(e,n,t){if(!ai(e))throw Error(_(405));var l=t!=null&&t.hydratedSources||null,a=!1,r="",s=Wc;if(t!=null&&(t.unstable_strictMode===!0&&(a=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(s=t.onRecoverableError)),n=xc(n,null,e,1,t??null,a,!1,r,s),e[Cn]=n.current,hl(e),l)for(e=0;e<l.length;e++)t=l[e],a=t._getVersion,a=a(t._source),n.mutableSourceEagerHydrationData==null?n.mutableSourceEagerHydrationData=[t,a]:n.mutableSourceEagerHydrationData.push(t,a);return new ja(n)};Ke.render=function(e,n,t){if(!za(n))throw Error(_(200));return $a(null,e,n,!1,t)};Ke.unmountComponentAtNode=function(e){if(!za(e))throw Error(_(40));return e._reactRootContainer?(st(function(){$a(null,null,e,!1,function(){e._reactRootContainer=null,e[Cn]=null})}),!0):!1};Ke.unstable_batchedUpdates=Zs;Ke.unstable_renderSubtreeIntoContainer=function(e,n,t,l){if(!za(t))throw Error(_(200));if(e==null||e._reactInternals===void 0)throw Error(_(38));return $a(e,n,t,!1,l)};Ke.version="18.3.1-next-f1338f8080-20240426";function Gc(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Gc)}catch(e){console.error(e)}}Gc(),Go.exports=Ke;var tm=Go.exports,po=tm;Er.createRoot=po.createRoot,Er.hydrateRoot=po.hydrateRoot;const lm={start:{zhCN:"巅峰起点",enUS:"Paragon Start"},gate:{zhCN:"面板连接关口",enUS:"Board Attachment Gate"},normal:{zhCN:"普通节点",enUS:"Normal Node"},magic:{zhCN:"魔法节点",enUS:"Magic Node"},rare:{zhCN:"稀有节点",enUS:"Rare Node"},legendary:{zhCN:"传奇节点",enUS:"Legendary Node"},socket:{zhCN:"雕纹槽位",enUS:"Glyph Socket"}},am={start:"#d9c9a8",gate:"#e8833a",normal:"#6b6052",magic:"#3d6b8a",rare:"#c9a13b",legendary:"#b8362a",socket:"#8a4a9e"},rm={start:"#ffffff",gate:"#ffaa00",normal:"#8b7355",magic:"#4a8fc4",rare:"#ffd700",legendary:"#ff4444",socket:"#b06ec9"},Nn=36,ze=4,me=Nn+ze,vt={V:[-1680,-4200],E:[-840,-4200],F:[0,-4200],G:[840,-4200],H:[1680,-4200],I:[2520,-4200],U:[3360,-4200],W:[-1680,-3360],D:[-840,-3360],J:[0,-3360],K:[840,-3360],L:[1680,-3360],M:[2520,-3360],T:[3360,-3360],X:[-1680,-2520],C:[-840,-2520],7:[0,-2520],8:[840,-2520],9:[1680,-2520],N:[2520,-2520],S:[3360,-2520],Y:[-1680,-1680],B:[-840,-1680],4:[0,-1680],5:[840,-1680],6:[1680,-1680],O:[2520,-1680],R:[3360,-1680],Z:[-1680,-840],A:[-840,-840],1:[0,-840],2:[840,-840],3:[1680,-840],P:[2520,-840],Q:[3360,-840]},sm=["1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];function im(e,n){return n?rm[e]||"#ff6600":am[e]||"#6b6052"}function om(e,n,t,l,a){const[r,s]=vt[n.gridLocation]||[0,0],o=r,i=s,c=l*a,h=t*a;if(n.rotation!==0){const p=e.cols*a/2,T=e.rows*a/2,f=n.rotation*Math.PI/180,S=Math.cos(f),x=Math.sin(f),z=c-p,u=h-T,g=z*S-u*x+p,d=z*x+u*S+T;return{x:o+g,y:i+d}}return{x:o+c,y:i+h}}function To(e,n,t,l,a){const r=om(e,n,t,l,a);return{x:r.x+a/2,y:r.y+a/2}}function gm(e,n,t,l,a,r,s,o){const i=t+a/2,c=l+a/2,h=a/2-2,p=n.type,T=im(p,r);if(r||p==="legendary"){const f=p==="legendary"?10:8,S=e.createRadialGradient(i,c,h,i,c,h+f);S.addColorStop(0,T),S.addColorStop(.5,T+"60"),S.addColorStop(1,"transparent"),e.fillStyle=S,e.beginPath(),e.arc(i,c,h+f,0,Math.PI*2),e.fill()}if(e.fillStyle=T,e.beginPath(),p==="gate"||p==="socket")e.moveTo(i,c-h),e.lineTo(i+h,c),e.lineTo(i,c+h),e.lineTo(i-h,c),e.closePath();else if(p==="legendary"){for(let f=0;f<6;f++){const S=Math.PI/3*f-Math.PI/2,x=i+h*Math.cos(S),z=c+h*Math.sin(S);f===0?e.moveTo(x,z):e.lineTo(x,z)}e.closePath()}else e.arc(i,c,h,0,Math.PI*2);e.fill(),r?(e.strokeStyle="#ff4444",e.lineWidth=3,e.shadowColor="#ff4444",e.shadowBlur=8):s?(e.strokeStyle="#ffffff",e.lineWidth=3):o?(e.strokeStyle="#00ff00",e.lineWidth=2):(e.strokeStyle="#2a2a2a",e.lineWidth=1.5),e.stroke(),e.shadowBlur=0,e.fillStyle="#ffffff",e.font=`bold ${a*.35}px Arial`,e.textAlign="center",e.textBaseline="middle",p==="start"?e.fillText("★",i,c):p==="gate"?e.fillText("▸",i,c):p==="socket"?e.fillText("◈",i,c):p==="legendary"&&e.fillText("◆",i,c)}function cm(e,n,t,l,a,r){e.strokeStyle=r?"#ff4444":"#666666",e.lineWidth=r?4:2,e.setLineDash([]),e.beginPath(),e.moveTo(n,t),e.lineTo(l,a),e.stroke()}const um=({boards:e,connectedBoards:n,allocations:t,reachableNodes:l,hoveredNode:a,onNodeHover:r,onNodeClick:s,zoom:o,pan:i,onZoomChange:c,onPanChange:h})=>{const p=F.useRef(null),T=F.useRef(null),f=F.useRef(!1),S=F.useRef({x:0,y:0}),x=F.useRef(null),z=F.useMemo(()=>{const C=[];return n.forEach(O=>{var A,$;const V=e.find(Q=>Q.id===O.boardId);if(V)for(let Q=0;Q<V.rows;Q++)for(let K=0;K<V.cols;K++){if(!((A=V.grid[Q])==null?void 0:A[K]))continue;const D=`${O.boardId}_${Q}_${K}`,B=t.has(D),M=[{dr:0,dc:1,name:"right"},{dr:1,dc:0,name:"down"}];for(const q of M){const H=Q+q.dr,te=K+q.dc;if(H>=V.rows||te>=V.cols||!(($=V.grid[H])==null?void 0:$[te]))continue;const ke=`${O.boardId}_${H}_${te}`,he=t.has(ke);if(B||he){const Pe=To(V,O,Q,K,me),je=To(V,O,H,te,me);C.push({from:Pe,to:je,isActive:B&&he})}}}}),C},[e,n,t]),u=F.useCallback(()=>{const C=p.current,O=T.current;if(!C||!O)return;const V=C.getContext("2d");V&&(C.width=O.clientWidth,C.height=O.clientHeight,V.clearRect(0,0,C.width,C.height),V.fillStyle="#1a1a1a",V.fillRect(0,0,C.width,C.height),V.save(),V.translate(C.width/2+i.x,C.height/2+i.y),V.scale(o,o),z.forEach(A=>{cm(V,A.from.x,A.from.y,A.to.x,A.to.y,A.isActive)}),n.forEach(A=>{var q;const $=e.find(H=>H.id===A.boardId);if(!$)return;const[Q,K]=vt[A.gridLocation]||[0,0],ne=$.cols*me,D=$.rows*me,B=Q,M=K;if(V.save(),A.rotation!==0){const H=ne/2,te=D/2;V.translate(B+H,M+te),V.rotate(A.rotation*Math.PI/180),V.translate(-H,-te)}V.fillStyle="#252525",V.fillRect(B,M,ne,D),V.strokeStyle="#444444",V.lineWidth=2/o,V.strokeRect(B,M,ne,D);for(let H=0;H<$.rows;H++)for(let te=0;te<$.cols;te++){const We=(q=$.grid[H])==null?void 0:q[te];if(!We)continue;const ke=`${A.boardId}_${H}_${te}`,he=t.has(ke),Pe=(a==null?void 0:a.boardId)===A.boardId&&(a==null?void 0:a.row)===H&&(a==null?void 0:a.col)===te,je=l.has(ke)&&!he,gt=B+te*me+ze,Ae=M+H*me+ze;gm(V,We,gt,Ae,Nn,he,Pe,je)}V.fillStyle="#888888",V.font="14px Arial",V.textAlign="center",V.fillText($.name,B+$.cols*me/2,M-10),V.restore()}),V.restore())},[e,n,t,l,z,a,o,i]),g=F.useCallback((C,O)=>{const V=p.current;if(!V)return{x:0,y:0};const A=V.getBoundingClientRect(),$=C-A.left,Q=O-A.top;return{x:($-V.width/2-i.x)/o,y:(Q-V.height/2-i.y)/o}},[o,i,p]),d=F.useCallback((C,O,V,A)=>{const[$,Q]=vt[O.gridLocation]||[0,0],K=$,ne=Q,D=K+A*me+ze,B=ne+V*me+ze;if(O.rotation!==0){const M=C.cols*me/2,q=C.rows*me/2,H=O.rotation*Math.PI/180,te=Math.cos(H),We=Math.sin(H),ke=[[A*me+ze-M,V*me+ze-q],[A*me+ze+Nn-M,V*me+ze-q],[A*me+ze+Nn-M,V*me+ze+Nn-q],[A*me+ze-M,V*me+ze+Nn-q]].map(([je,gt])=>{const Ae=je*te+gt*We,y=je*-We+gt*te;return[K+M+Ae,ne+q+y]}),he=ke.map(je=>je[0]),Pe=ke.map(je=>je[1]);return{minX:Math.min(...he),minY:Math.min(...Pe),maxX:Math.max(...he),maxY:Math.max(...Pe)}}return{minX:D,minY:B,maxX:D+Nn,maxY:B+Nn}},[]),E=F.useCallback(C=>{var K;if(!p.current)return;if(f.current){const ne=C.clientX-S.current.x,D=C.clientY-S.current.y;S.current={x:C.clientX,y:C.clientY},h({x:i.x+ne,y:i.y+D});return}const V=g(C.clientX,C.clientY);let A=null;for(const ne of n){const D=e.find(B=>B.id===ne.boardId);if(D){for(let B=0;B<D.rows;B++){for(let M=0;M<D.cols;M++){const q=(K=D.grid[B])==null?void 0:K[M];if(!q)continue;const H=d(D,ne,B,M);if(V.x>=H.minX&&V.x<=H.maxX&&V.y>=H.minY&&V.y<=H.maxY){A={node:q,boardId:ne.boardId,row:B,col:M};break}}if(A)break}if(A)break}}x.current&&clearTimeout(x.current);const $=a?`${a.boardId}_${a.row}_${a.col}`:null,Q=A?`${A.boardId}_${A.row}_${A.col}`:null;$!==Q&&(x.current=window.setTimeout(()=>{r(A)},30))},[e,n,g,d,r,a]),N=F.useCallback(C=>{var V;if(f.current)return;const O=g(C.clientX,C.clientY);for(const A of n){const $=e.find(Q=>Q.id===A.boardId);if($)for(let Q=0;Q<$.rows;Q++)for(let K=0;K<$.cols;K++){const ne=(V=$.grid[Q])==null?void 0:V[K];if(!ne)continue;const D=d($,A,Q,K);if(O.x>=D.minX&&O.x<=D.maxX&&O.y>=D.minY&&O.y<=D.maxY){s(A.boardId,Q,K,ne);return}}}},[e,n,g,d,s]),v=F.useCallback(C=>{if(C.button!==0)return;f.current=!0,S.current={x:C.clientX,y:C.clientY};const O=p.current;O&&(O.style.cursor="grabbing")},[]),P=F.useCallback(()=>{f.current=!1;const C=p.current;C&&(C.style.cursor="default")},[]),I=F.useCallback(()=>{f.current=!1,r(null);const C=p.current;C&&(C.style.cursor="default")},[r]),ee=F.useCallback(C=>{const O=C.deltaY>0?.9:1.1,V=Math.max(.05,Math.min(2,o*O)),A=p.current;if(A){const $=A.getBoundingClientRect(),Q=C.clientX-$.left,K=C.clientY-$.top,ne=V/o;h({x:Q-(Q-i.x)*ne,y:K-(K-i.y)*ne})}c(V)},[o,i,c,h]);return F.useEffect(()=>{u()},[u]),m.jsxs("div",{ref:T,style:{overflow:"hidden",position:"relative",border:"1px solid #444",background:"#1a1a1a",width:"100%",height:"600px"},children:[m.jsx("canvas",{ref:p,onMouseMove:E,onMouseDown:v,onMouseUp:P,onMouseLeave:I,onClick:N,onWheel:ee,style:{display:"block",cursor:"default"}}),m.jsxs("div",{style:{position:"absolute",bottom:"10px",right:"10px",background:"rgba(0,0,0,0.7)",color:"#d2c8ae",padding:"4px 8px",borderRadius:"4px",fontSize:"12px",fontFamily:"monospace"},children:[Math.round(o*100),"%"]}),m.jsx("div",{style:{position:"absolute",top:"10px",left:"10px",background:"rgba(0,0,0,0.5)",color:"#888",padding:"4px 8px",borderRadius:"4px",fontSize:"11px"},children:"拖拽移动 · 滚轮缩放 · 点击节点分配"})]})},dm=[{id:"Paragon_Barb_Start",name:"Start",rows:15,cols:21,grid:[[null,null,null,null,null,null,null,null,null,null,{id:"Generic_Gate",type:"gate",name:"面板连接关口",nameEn:"Board Attachment Gate",nameCn:"面板连接关口",desc:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,descEn:`+5 Strength
+5 Intelligence
+5 Willpower
+5 Dexterity

Tags: Strength, Intelligence, Willpower, Dexterity.`,descCn:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,tags:["力量","智力","意力","敏捷."],tierValues:[]},null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,{id:"Generic_Magic_DamagePhysical",type:"magic",name:"Damage Physical",nameEn:"Damage Physical",desc:`+5% Physical 伤害

Tags: 物理, 伤害.`,descEn:`+5% Physical Damage

Tags: Physical, Damage.`,descCn:`+5% Physical 伤害

Tags: 物理, 伤害.`,tags:["物理","伤害."],tierValues:[]},null,{id:"Generic_Magic_Armor",type:"magic",name:"Armor",nameEn:"Armor",desc:`+50 护甲值

Tags: 护甲.`,descEn:`+50 Armor

Tags: Armor.`,descCn:`+50 护甲值

Tags: 护甲.`,tags:["护甲."],tierValues:[]},null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,{id:"Generic_Magic_Dex",type:"magic",name:"Dexterity",nameEn:"Dexterity",desc:`+7 点敏捷

Tags: 敏捷.`,descEn:`+7 Dexterity

Tags: Dexterity.`,descCn:`+7 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Rare_066",type:"rare",name:"原始力量",nameEn:"Raw Power",nameCn:"原始力量",desc:`+10% Physical 伤害
+10 点力量

Bonus: Another +10% Physical Damage if requirements met:
{thresholdRequirements}

Tags: 物理, 伤害, 力量.`,descEn:`+10% Physical Damage
+10 Strength

Bonus: Another +10% Physical Damage if requirements met:
{thresholdRequirements}

Tags: Physical, Damage, Strength.`,descCn:`+10% Physical 伤害
+10 点力量

Bonus: Another +10% Physical Damage if requirements met:
{thresholdRequirements}

Tags: 物理, 伤害, 力量.`,tags:["物理","伤害","力量."],tierValues:[]},null,{id:"Barbarian_Rare_001",type:"rare",name:"钢铁力量",nameEn:"Iron Strength",nameCn:"钢铁力量",desc:`+100 护甲值
+10 点力量

Bonus: Another +100 Armor if requirements met:
{thresholdRequirements}

Tags: 护甲, 力量.`,descEn:`+100 Armor
+10 Strength

Bonus: Another +100 Armor if requirements met:
{thresholdRequirements}

Tags: Armor, Strength.`,descCn:`+100 护甲值
+10 点力量

Bonus: Another +100 Armor if requirements met:
{thresholdRequirements}

Tags: 护甲, 力量.`,tags:["护甲","力量."],tierValues:[]},{id:"Generic_Magic_Will",type:"magic",name:"Willpower",nameEn:"Willpower",desc:`+7 点意力

Tags: 意力.`,descEn:`+7 Willpower

Tags: Willpower.`,descCn:`+7 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,{id:"Generic_Magic_DamagePhysical",type:"magic",name:"Damage Physical",nameEn:"Damage Physical",desc:`+5% Physical 伤害

Tags: 物理, 伤害.`,descEn:`+5% Physical Damage

Tags: Physical, Damage.`,descCn:`+5% Physical 伤害

Tags: 物理, 伤害.`,tags:["物理","伤害."],tierValues:[]},{id:"Generic_Magic_Dex",type:"magic",name:"Dexterity",nameEn:"Dexterity",desc:`+7 点敏捷

Tags: 敏捷.`,descEn:`+7 Dexterity

Tags: Dexterity.`,descCn:`+7 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Magic_DamagePhysical",type:"magic",name:"Damage Physical",nameEn:"Damage Physical",desc:`+5% Physical 伤害

Tags: 物理, 伤害.`,descEn:`+5% Physical Damage

Tags: Physical, Damage.`,descCn:`+5% Physical 伤害

Tags: 物理, 伤害.`,tags:["物理","伤害."],tierValues:[]},null,{id:"Generic_Magic_Armor",type:"magic",name:"Armor",nameEn:"Armor",desc:`+50 护甲值

Tags: 护甲.`,descEn:`+50 Armor

Tags: Armor.`,descCn:`+50 护甲值

Tags: 护甲.`,tags:["护甲."],tierValues:[]},{id:"Generic_Magic_Will",type:"magic",name:"Willpower",nameEn:"Willpower",desc:`+7 点意力

Tags: 意力.`,descEn:`+7 Willpower

Tags: Willpower.`,descCn:`+7 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Magic_Armor",type:"magic",name:"Armor",nameEn:"Armor",desc:`+50 护甲值

Tags: 护甲.`,descEn:`+50 Armor

Tags: Armor.`,descCn:`+50 护甲值

Tags: 护甲.`,tags:["护甲."],tierValues:[]},null,null,null,null,null,null,null],[null,null,null,null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Socket",type:"socket",name:"雕文插槽",nameEn:"Glyph Socket",nameCn:"雕文插槽",tags:[],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null,null,null,null,null],[null,null,null,null,null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,{id:"Generic_Magic_HPPercent",type:"magic",name:"HP Percent",nameEn:"HP Percent",desc:`+2% 生命

Tags: 生命.`,descEn:`+2% Life

Tags: Life.`,descCn:`+2% 生命

Tags: 生命.`,tags:["生命."],tierValues:[]},{id:"Generic_Magic_Armor",type:"magic",name:"Armor",nameEn:"Armor",desc:`+50 护甲值

Tags: 护甲.`,descEn:`+50 Armor

Tags: Armor.`,descCn:`+50 护甲值

Tags: 护甲.`,tags:["护甲."],tierValues:[]},null,{id:"Generic_Magic_DamagePhysical",type:"magic",name:"Damage Physical",nameEn:"Damage Physical",desc:`+5% Physical 伤害

Tags: 物理, 伤害.`,descEn:`+5% Physical Damage

Tags: Physical, Damage.`,descCn:`+5% Physical 伤害

Tags: 物理, 伤害.`,tags:["物理","伤害."],tierValues:[]},{id:"Generic_Magic_HPPercent",type:"magic",name:"HP Percent",nameEn:"HP Percent",desc:`+2% 生命

Tags: 生命.`,descEn:`+2% Life

Tags: Life.`,descCn:`+2% 生命

Tags: 生命.`,tags:["生命."],tierValues:[]},null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,{id:"Barbarian_Rare_015",type:"rare",name:"坚韧",nameEn:"Tenacity",nameCn:"坚韧",desc:`+4% 生命
+100 护甲值

Bonus: Another +4% Life if requirements met:
{thresholdRequirements}

Tags: 生命, 护甲.`,descEn:`+4% Life
+100 Armor

Bonus: Another +4% Life if requirements met:
{thresholdRequirements}

Tags: Life, Armor.`,descCn:`+4% 生命
+100 护甲值

Bonus: Another +4% Life if requirements met:
{thresholdRequirements}

Tags: 生命, 护甲.`,tags:["生命","护甲."],tierValues:[]},{id:"Generic_Magic_HPPercent",type:"magic",name:"HP Percent",nameEn:"HP Percent",desc:`+2% 生命

Tags: 生命.`,descEn:`+2% Life

Tags: Life.`,descCn:`+2% 生命

Tags: 生命.`,tags:["生命."],tierValues:[]},null,{id:"Generic_Magic_HPPercent",type:"magic",name:"HP Percent",nameEn:"HP Percent",desc:`+2% 生命

Tags: 生命.`,descEn:`+2% Life

Tags: Life.`,descCn:`+2% 生命

Tags: 生命.`,tags:["生命."],tierValues:[]},{id:"Barbarian_Rare_022",type:"rare",name:"膂力",nameEn:"Brawn",nameCn:"膂力",desc:`+10% Physical 伤害
+4% 生命

Bonus: Another +10% Physical Damage if requirements met:
{thresholdRequirements}

Tags: 物理, 伤害, 生命.`,descEn:`+10% Physical Damage
+4% Life

Bonus: Another +10% Physical Damage if requirements met:
{thresholdRequirements}

Tags: Physical, Damage, Life.`,descCn:`+10% Physical 伤害
+4% 生命

Bonus: Another +10% Physical Damage if requirements met:
{thresholdRequirements}

Tags: 物理, 伤害, 生命.`,tags:["物理","伤害","生命."],tierValues:[]},null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,{id:"Generic_Magic_Armor",type:"magic",name:"Armor",nameEn:"Armor",desc:`+50 护甲值

Tags: 护甲.`,descEn:`+50 Armor

Tags: Armor.`,descCn:`+50 护甲值

Tags: 护甲.`,tags:["护甲."],tierValues:[]},null,null,null,{id:"Generic_Magic_DamagePhysical",type:"magic",name:"Damage Physical",nameEn:"Damage Physical",desc:`+5% Physical 伤害

Tags: 物理, 伤害.`,descEn:`+5% Physical Damage

Tags: Physical, Damage.`,descCn:`+5% Physical 伤害

Tags: 物理, 伤害.`,tags:["物理","伤害."],tierValues:[]},null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"StartNodeBarb",type:"start",name:"巅峰等级起始节点",nameEn:"Paragon Starting Node",nameCn:"巅峰等级起始节点",tags:[],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null,null,null,null,null,null,null,null]],gates:[{row:0,col:10,id:"Generic_Gate",direction:"bottom"}],startNodes:[{row:14,col:10,id:"StartNodeBarb"}],gatePositions:{top:[{row:0,col:10,id:"Generic_Gate",direction:"bottom"}],bottom:[],left:[],right:[]}},{id:"Paragon_Barb_Hemorrhage",name:"Hemorrhage",rows:21,cols:21,grid:[[null,null,null,null,null,null,null,null,null,null,{id:"Generic_Gate",type:"gate",name:"面板连接关口",nameEn:"Board Attachment Gate",nameCn:"面板连接关口",desc:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,descEn:`+5 Strength
+5 Intelligence
+5 Willpower
+5 Dexterity

Tags: Strength, Intelligence, Willpower, Dexterity.`,descCn:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,tags:["力量","智力","意力","敏捷."],tierValues:[]},null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null,{id:"Generic_Magic_DamageBleed",type:"magic",name:"Damage Bleed",nameEn:"Damage Bleed",desc:`+5% Physical 持续性伤害

Tags: 流血, 伤害.`,descEn:`+5% Physical Damage Over Time

Tags: Bleed, Damage.`,descCn:`+5% Physical 持续性伤害

Tags: 流血, 伤害.`,tags:["流血","伤害."],tierValues:[]},null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Magic_DamageBleed",type:"magic",name:"Damage Bleed",nameEn:"Damage Bleed",desc:`+5% Physical 持续性伤害

Tags: 流血, 伤害.`,descEn:`+5% Physical Damage Over Time

Tags: Bleed, Damage.`,descCn:`+5% Physical 持续性伤害

Tags: 流血, 伤害.`,tags:["流血","伤害."],tierValues:[]},{id:"Barbarian_Rare_005",type:"rare",name:"屠夫",nameEn:"Butcher",nameCn:"屠夫",desc:`+10% Physical 持续性伤害
+10 点力量

Bonus: Another +10% Physical Damage Over Time if requirements met:
{thresholdRequirements}

Tags: 流血, 伤害, 力量.`,descEn:`+10% Physical Damage Over Time
+10 Strength

Bonus: Another +10% Physical Damage Over Time if requirements met:
{thresholdRequirements}

Tags: Bleed, Damage, Strength.`,descCn:`+10% Physical 持续性伤害
+10 点力量

Bonus: Another +10% Physical Damage Over Time if requirements met:
{thresholdRequirements}

Tags: 流血, 伤害, 力量.`,tags:["流血","伤害","力量."],tierValues:[]},{id:"Generic_Magic_Dex",type:"magic",name:"Dexterity",nameEn:"Dexterity",desc:`+7 点敏捷

Tags: 敏捷.`,descEn:`+7 Dexterity

Tags: Dexterity.`,descCn:`+7 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null,null,null],[null,null,null,null,null,null,null,null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Magic_Dex",type:"magic",name:"Dexterity",nameEn:"Dexterity",desc:`+7 点敏捷

Tags: 敏捷.`,descEn:`+7 Dexterity

Tags: Dexterity.`,descCn:`+7 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Magic_DamageBleed",type:"magic",name:"Damage Bleed",nameEn:"Damage Bleed",desc:`+5% Physical 持续性伤害

Tags: 流血, 伤害.`,descEn:`+5% Physical Damage Over Time

Tags: Bleed, Damage.`,descCn:`+5% Physical 持续性伤害

Tags: 流血, 伤害.`,tags:["流血","伤害."],tierValues:[]},null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,{id:"Generic_Magic_Will",type:"magic",name:"Willpower",nameEn:"Willpower",desc:`+7 点意力

Tags: 意力.`,descEn:`+7 Willpower

Tags: Willpower.`,descCn:`+7 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null],[null,null,null,null,null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Socket",type:"socket",name:"雕文插槽",nameEn:"Glyph Socket",nameCn:"雕文插槽",tags:[],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Magic_DamageReductionFromBleedingTarget",type:"magic",name:"Damage Reduction From Bleeding Target",nameEn:"Damage Reduction From Bleeding Target",desc:`2% 对Bleeding 敌人的伤害减免

Tags: 流血, 伤害减免.`,descEn:`2% Damage Reduction from Bleeding Enemies

Tags: Bleed, Damage Reduction.`,descCn:`2% 对Bleeding 敌人的伤害减免

Tags: 流血, 伤害减免.`,tags:["流血","伤害减免."],tierValues:[]},{id:"Barbarian_Rare_016",type:"rare",name:"毅力",nameEn:"Grit",nameCn:"毅力",desc:`4% 对Bleeding 敌人的伤害减免
+10 点力量

Bonus: Another 4% Damage Reduction from Bleeding Enemies if requirements met:
{thresholdRequirements}

Tags: 流血, 伤害减免, 力量.`,descEn:`4% Damage Reduction from Bleeding Enemies
+10 Strength

Bonus: Another 4% Damage Reduction from Bleeding Enemies if requirements met:
{thresholdRequirements}

Tags: Bleed, Damage Reduction, Strength.`,descCn:`4% 对Bleeding 敌人的伤害减免
+10 点力量

Bonus: Another 4% Damage Reduction from Bleeding Enemies if requirements met:
{thresholdRequirements}

Tags: 流血, 伤害减免, 力量.`,tags:["流血","伤害减免","力量."],tierValues:[]},{id:"Generic_Magic_DamageReductionFromBleedingTarget",type:"magic",name:"Damage Reduction From Bleeding Target",nameEn:"Damage Reduction From Bleeding Target",desc:`2% 对Bleeding 敌人的伤害减免

Tags: 流血, 伤害减免.`,descEn:`2% Damage Reduction from Bleeding Enemies

Tags: Bleed, Damage Reduction.`,descCn:`2% 对Bleeding 敌人的伤害减免

Tags: 流血, 伤害减免.`,tags:["流血","伤害减免."],tierValues:[]},null],[null,null,null,null,null,null,{id:"Generic_Magic_ResistancePoison",type:"magic",name:"Resistance Poison",nameEn:"Resistance Poison",desc:`+5% Poison 抗性

Tags: 抗性, 毒素.`,descEn:`+5% Poison Resistance

Tags: Resistance, Poison.`,descCn:`+5% Poison 抗性

Tags: 抗性, 毒素.`,tags:["抗性","毒素."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Magic_Will",type:"magic",name:"Willpower",nameEn:"Willpower",desc:`+7 点意力

Tags: 意力.`,descEn:`+7 Willpower

Tags: Willpower.`,descCn:`+7 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Magic_DamageReductionFromBleedingTarget",type:"magic",name:"Damage Reduction From Bleeding Target",nameEn:"Damage Reduction From Bleeding Target",desc:`2% 对Bleeding 敌人的伤害减免

Tags: 流血, 伤害减免.`,descEn:`2% Damage Reduction from Bleeding Enemies

Tags: Bleed, Damage Reduction.`,descCn:`2% 对Bleeding 敌人的伤害减免

Tags: 流血, 伤害减免.`,tags:["流血","伤害减免."],tierValues:[]},null,null],[null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Magic_ResistancePoison",type:"magic",name:"Resistance Poison",nameEn:"Resistance Poison",desc:`+5% Poison 抗性

Tags: 抗性, 毒素.`,descEn:`+5% Poison Resistance

Tags: Resistance, Poison.`,descCn:`+5% Poison 抗性

Tags: 抗性, 毒素.`,tags:["抗性","毒素."],tierValues:[]},{id:"Barbarian_Rare_026",type:"rare",name:"适应毒素",nameEn:"Poison Conditioned",nameCn:"适应毒素",desc:`+10% Poison 抗性
+100 护甲值

Bonus: Another +10% Poison Resistance if requirements met:
{thresholdRequirements}

Tags: 抗性, 护甲, 毒素.`,descEn:`+10% Poison Resistance
+100 Armor

Bonus: Another +10% Poison Resistance if requirements met:
{thresholdRequirements}

Tags: Resistance, Armor, Poison.`,descCn:`+10% Poison 抗性
+100 护甲值

Bonus: Another +10% Poison Resistance if requirements met:
{thresholdRequirements}

Tags: 抗性, 护甲, 毒素.`,tags:["抗性","护甲","毒素."],tierValues:[]},{id:"Generic_Magic_Armor",type:"magic",name:"Armor",nameEn:"Armor",desc:`+50 护甲值

Tags: 护甲.`,descEn:`+50 Armor

Tags: Armor.`,descCn:`+50 护甲值

Tags: 护甲.`,tags:["护甲."],tierValues:[]},null,null,null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null],[null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,{id:"Generic_Magic_Armor",type:"magic",name:"Armor",nameEn:"Armor",desc:`+50 护甲值

Tags: 护甲.`,descEn:`+50 Armor

Tags: Armor.`,descCn:`+50 护甲值

Tags: 护甲.`,tags:["护甲."],tierValues:[]},{id:"Generic_Magic_ResistancePoison",type:"magic",name:"Resistance Poison",nameEn:"Resistance Poison",desc:`+5% Poison 抗性

Tags: 抗性, 毒素.`,descEn:`+5% Poison Resistance

Tags: Resistance, Poison.`,descCn:`+5% Poison 抗性

Tags: 抗性, 毒素.`,tags:["抗性","毒素."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Generic_Magic_DamageBleed",type:"magic",name:"Damage Bleed",nameEn:"Damage Bleed",desc:`+5% Physical 持续性伤害

Tags: 流血, 伤害.`,descEn:`+5% Physical Damage Over Time

Tags: Bleed, Damage.`,descCn:`+5% Physical 持续性伤害

Tags: 流血, 伤害.`,tags:["流血","伤害."],tierValues:[]},{id:"Generic_Magic_DamageToBleed",type:"magic",name:"Damage To Bleed",nameEn:"Damage To Bleed",desc:`+5% 对Bleeding 敌人的伤害

Tags: 流血, 伤害.`,descEn:`+5% Damage to Bleeding Enemies

Tags: Bleed, Damage.`,descCn:`+5% 对Bleeding 敌人的伤害

Tags: 流血, 伤害.`,tags:["流血","伤害."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null],[null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Magic_DamageToBleed",type:"magic",name:"Damage To Bleed",nameEn:"Damage To Bleed",desc:`+5% 对Bleeding 敌人的伤害

Tags: 流血, 伤害.`,descEn:`+5% Damage to Bleeding Enemies

Tags: Bleed, Damage.`,descCn:`+5% 对Bleeding 敌人的伤害

Tags: 流血, 伤害.`,tags:["流血","伤害."],tierValues:[]},{id:"Barbarian_Rare_004",type:"rare",name:"剥皮者",nameEn:"Flayer",nameCn:"剥皮者",desc:`+10% Physical 持续性伤害
+10% 对Bleeding 敌人的伤害

Bonus: Another +10% Physical Damage Over Time if requirements met:
{thresholdRequirements}

Tags: 流血, 伤害.`,descEn:`+10% Physical Damage Over Time
+10% Damage to Bleeding Enemies

Bonus: Another +10% Physical Damage Over Time if requirements met:
{thresholdRequirements}

Tags: Bleed, Damage.`,descCn:`+10% Physical 持续性伤害
+10% 对Bleeding 敌人的伤害

Bonus: Another +10% Physical Damage Over Time if requirements met:
{thresholdRequirements}

Tags: 流血, 伤害.`,tags:["流血","伤害."],tierValues:[]},{id:"Generic_Magic_DamageBleed",type:"magic",name:"Damage Bleed",nameEn:"Damage Bleed",desc:`+5% Physical 持续性伤害

Tags: 流血, 伤害.`,descEn:`+5% Physical Damage Over Time

Tags: Bleed, Damage.`,descCn:`+5% Physical 持续性伤害

Tags: 流血, 伤害.`,tags:["流血","伤害."],tierValues:[]},null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null],[{id:"Generic_Gate",type:"gate",name:"面板连接关口",nameEn:"Board Attachment Gate",nameCn:"面板连接关口",desc:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,descEn:`+5 Strength
+5 Intelligence
+5 Willpower
+5 Dexterity

Tags: Strength, Intelligence, Willpower, Dexterity.`,descCn:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,tags:["力量","智力","意力","敏捷."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},null,null,null,null,null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null,{id:"Generic_Magic_DamageBleed",type:"magic",name:"Damage Bleed",nameEn:"Damage Bleed",desc:`+5% Physical 持续性伤害

Tags: 流血, 伤害.`,descEn:`+5% Physical Damage Over Time

Tags: Bleed, Damage.`,descCn:`+5% Physical 持续性伤害

Tags: 流血, 伤害.`,tags:["流血","伤害."],tierValues:[]},null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Gate",type:"gate",name:"面板连接关口",nameEn:"Board Attachment Gate",nameCn:"面板连接关口",desc:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,descEn:`+5 Strength
+5 Intelligence
+5 Willpower
+5 Dexterity

Tags: Strength, Intelligence, Willpower, Dexterity.`,descCn:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,tags:["力量","智力","意力","敏捷."],tierValues:[]}],[null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null,null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null,null,null],[null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null,null,null],[null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null,null,null],[null,{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Magic_CCDurationReduction",type:"magic",name:"CC Duration Reduction",nameEn:"CC Duration Reduction",desc:`4% 控制受限时间缩短

Tags: 控制.`,descEn:`4% Control Impaired Duration Reduction

Tags: Crowd Control.`,descCn:`4% 控制受限时间缩短

Tags: 控制.`,tags:["控制."],tierValues:[]},{id:"Generic_Magic_DamageReductionFromDot",type:"magic",name:"Damage Reduction From DoT",nameEn:"Damage Reduction From DoT",desc:`3.2% 受到的持续伤害减免

Tags: 伤害减免.`,descEn:`3.2% Damage Taken Over Time Reduction

Tags: Damage Reduction.`,descCn:`3.2% 受到的持续伤害减免

Tags: 伤害减免.`,tags:["伤害减免."],tierValues:[]},{id:"Generic_Magic_CCDurationReduction",type:"magic",name:"CC Duration Reduction",nameEn:"CC Duration Reduction",desc:`4% 控制受限时间缩短

Tags: 控制.`,descEn:`4% Control Impaired Duration Reduction

Tags: Crowd Control.`,descCn:`4% 控制受限时间缩短

Tags: 控制.`,tags:["控制."],tierValues:[]},null,null,null,null,null,null],[null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Barbarian_Legendary_002",type:"legendary",name:"出血",nameEn:"Hemorrhage",nameCn:"出血",desc:`你的流血伤害增加, 相当于你的易伤伤害加成的 x15%。

Tags: 流血, 伤害.`,descEn:`Your Bleeding damage is increased by x15% of your Vulnerable Damage Bonus.

Tags: Bleed, Damage.`,descCn:`你的流血伤害增加, 相当于你的易伤伤害加成的 x15%。

Tags: 流血, 伤害.`,tags:["流血","伤害."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null,null,{id:"Generic_Magic_DamageReductionFromDot",type:"magic",name:"Damage Reduction From DoT",nameEn:"Damage Reduction From DoT",desc:`3.2% 受到的持续伤害减免

Tags: 伤害减免.`,descEn:`3.2% Damage Taken Over Time Reduction

Tags: Damage Reduction.`,descCn:`3.2% 受到的持续伤害减免

Tags: 伤害减免.`,tags:["伤害减免."],tierValues:[]},{id:"Generic_Rare_006",type:"rare",name:"飞驰",nameEn:"Fleeting",nameCn:"飞驰",desc:`8% 控制受限时间缩短
6.5% 受到的持续伤害减免

Bonus: Another 8% Control Impaired Duration Reduction if requirements met:
{thresholdRequirements}

Tags: 控制, 伤害减免.`,descEn:`8% Control Impaired Duration Reduction
6.5% Damage Taken Over Time Reduction

Bonus: Another 8% Control Impaired Duration Reduction if requirements met:
{thresholdRequirements}

Tags: Crowd Control, Damage Reduction.`,descCn:`8% 控制受限时间缩短
6.5% 受到的持续伤害减免

Bonus: Another 8% Control Impaired Duration Reduction if requirements met:
{thresholdRequirements}

Tags: 控制, 伤害减免.`,tags:["控制","伤害减免."],tierValues:[]},null,null,null,null,null,null,null],[null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null,null,null,null,null,{id:"Generic_Magic_CCDurationReduction",type:"magic",name:"CC Duration Reduction",nameEn:"CC Duration Reduction",desc:`4% 控制受限时间缩短

Tags: 控制.`,descEn:`4% Control Impaired Duration Reduction

Tags: Crowd Control.`,descCn:`4% 控制受限时间缩短

Tags: 控制.`,tags:["控制."],tierValues:[]},null,null,null,null,null,null,null],[null,null,{id:"Generic_Magic_DamageBleed",type:"magic",name:"Damage Bleed",nameEn:"Damage Bleed",desc:`+5% Physical 持续性伤害

Tags: 流血, 伤害.`,descEn:`+5% Physical Damage Over Time

Tags: Bleed, Damage.`,descCn:`+5% Physical 持续性伤害

Tags: 流血, 伤害.`,tags:["流血","伤害."],tierValues:[]},{id:"Generic_Magic_DamagePhysical",type:"magic",name:"Damage Physical",nameEn:"Damage Physical",desc:`+5% Physical 伤害

Tags: 物理, 伤害.`,descEn:`+5% Physical Damage

Tags: Physical, Damage.`,descCn:`+5% Physical 伤害

Tags: 物理, 伤害.`,tags:["物理","伤害."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null,null,null,null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null,null,null,null,null,null],[null,{id:"Generic_Magic_DamagePhysical",type:"magic",name:"Damage Physical",nameEn:"Damage Physical",desc:`+5% Physical 伤害

Tags: 物理, 伤害.`,descEn:`+5% Physical Damage

Tags: Physical, Damage.`,descCn:`+5% Physical 伤害

Tags: 物理, 伤害.`,tags:["物理","伤害."],tierValues:[]},{id:"Barbarian_Rare_006",type:"rare",name:"撕裂者",nameEn:"Lacerator",nameCn:"撕裂者",desc:`+10% Physical 持续性伤害
+10% Physical 伤害

Bonus: Another +10% Physical Damage Over Time if requirements met:
{thresholdRequirements}

Tags: 流血, 物理, 伤害.`,descEn:`+10% Physical Damage Over Time
+10% Physical Damage

Bonus: Another +10% Physical Damage Over Time if requirements met:
{thresholdRequirements}

Tags: Bleed, Physical, Damage.`,descCn:`+10% Physical 持续性伤害
+10% Physical 伤害

Bonus: Another +10% Physical Damage Over Time if requirements met:
{thresholdRequirements}

Tags: 流血, 物理, 伤害.`,tags:["流血","物理","伤害."],tierValues:[]},{id:"Generic_Magic_DamageBleed",type:"magic",name:"Damage Bleed",nameEn:"Damage Bleed",desc:`+5% Physical 持续性伤害

Tags: 流血, 伤害.`,descEn:`+5% Physical Damage Over Time

Tags: Bleed, Damage.`,descCn:`+5% Physical 持续性伤害

Tags: 流血, 伤害.`,tags:["流血","伤害."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},null,null,null,null,null,null,null],[null,null,{id:"Generic_Magic_DamageBleed",type:"magic",name:"Damage Bleed",nameEn:"Damage Bleed",desc:`+5% Physical 持续性伤害

Tags: 流血, 伤害.`,descEn:`+5% Physical Damage Over Time

Tags: Bleed, Damage.`,descCn:`+5% Physical 持续性伤害

Tags: 流血, 伤害.`,tags:["流血","伤害."],tierValues:[]},null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,{id:"Generic_Gate",type:"gate",name:"面板连接关口",nameEn:"Board Attachment Gate",nameCn:"面板连接关口",desc:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,descEn:`+5 Strength
+5 Intelligence
+5 Willpower
+5 Dexterity

Tags: Strength, Intelligence, Willpower, Dexterity.`,descCn:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,tags:["力量","智力","意力","敏捷."],tierValues:[]},null,null,null,null,null,null,null,null,null,null]],gates:[{row:0,col:10,id:"Generic_Gate",direction:"bottom"},{row:10,col:0,id:"Generic_Gate",direction:"right"},{row:10,col:20,id:"Generic_Gate",direction:"left"},{row:20,col:10,id:"Generic_Gate",direction:"top"}],startNodes:[],gatePositions:{top:[{row:0,col:10,id:"Generic_Gate",direction:"bottom"}],bottom:[{row:20,col:10,id:"Generic_Gate",direction:"top"}],left:[{row:10,col:0,id:"Generic_Gate",direction:"right"}],right:[{row:10,col:20,id:"Generic_Gate",direction:"left"}]}},{id:"Paragon_Barb_Blood_Rage",name:"Blood Rage",rows:21,cols:21,grid:[[null,null,null,null,null,null,null,null,null,null,{id:"Generic_Gate",type:"gate",name:"面板连接关口",nameEn:"Board Attachment Gate",nameCn:"面板连接关口",desc:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,descEn:`+5 Strength
+5 Intelligence
+5 Willpower
+5 Dexterity

Tags: Strength, Intelligence, Willpower, Dexterity.`,descCn:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,tags:["力量","智力","意力","敏捷."],tierValues:[]},null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,{id:"Generic_Magic_HPPercent",type:"magic",name:"HP Percent",nameEn:"HP Percent",desc:`+2% 生命

Tags: 生命.`,descEn:`+2% Life

Tags: Life.`,descCn:`+2% 生命

Tags: 生命.`,tags:["生命."],tierValues:[]},null,null,null,null,null,null],[null,null,null,null,null,null,null,null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Magic_PotionHealing",type:"magic",name:"Potion Healing",nameEn:"Potion Healing",desc:`2% 药水恢复效果

Tags: 治疗.`,descEn:`+2% Potion Healing

Tags: Healing.`,descCn:`2% 药水恢复效果

Tags: 治疗.`,tags:["治疗."],tierValues:[]},{id:"Generic_Rare_042",type:"rare",name:"恢复",nameEn:"Restorative",nameCn:"恢复",desc:`4% 药水恢复效果
+4% 生命

Bonus: Another +4% Potion Healing if requirements met:
{thresholdRequirements}

Tags: 治疗, 生命.`,descEn:`+4% Potion Healing
+4% Life

Bonus: Another +4% Potion Healing if requirements met:
{thresholdRequirements}

Tags: Healing, Life.`,descCn:`4% 药水恢复效果
+4% 生命

Bonus: Another +4% Potion Healing if requirements met:
{thresholdRequirements}

Tags: 治疗, 生命.`,tags:["治疗","生命."],tierValues:[]},{id:"Generic_Magic_PotionHealing",type:"magic",name:"Potion Healing",nameEn:"Potion Healing",desc:`2% 药水恢复效果

Tags: 治疗.`,descEn:`+2% Potion Healing

Tags: Healing.`,descCn:`2% 药水恢复效果

Tags: 治疗.`,tags:["治疗."],tierValues:[]},null,null,null,null,null],[null,null,null,null,null,null,{id:"Barbarian_Magic_BerserkDamage",type:"magic",name:"Berserk Damage",nameEn:"Berserk Damage",desc:`+5% Damage while Berserking

Tags: Berserking, Damage.`,descEn:`+5% Damage while Berserking

Tags: Berserking, Damage.`,tags:["Berserking","Damage."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Magic_PotionHealing",type:"magic",name:"Potion Healing",nameEn:"Potion Healing",desc:`2% 药水恢复效果

Tags: 治疗.`,descEn:`+2% Potion Healing

Tags: Healing.`,descCn:`2% 药水恢复效果

Tags: 治疗.`,tags:["治疗."],tierValues:[]},{id:"Generic_Magic_HPPercent",type:"magic",name:"HP Percent",nameEn:"HP Percent",desc:`+2% 生命

Tags: 生命.`,descEn:`+2% Life

Tags: Life.`,descCn:`+2% 生命

Tags: 生命.`,tags:["生命."],tierValues:[]},null,null,null,null,null,null],[null,null,null,null,{id:"Barbarian_Magic_BerserkDamage",type:"magic",name:"Berserk Damage",nameEn:"Berserk Damage",desc:`+5% Damage while Berserking

Tags: Berserking, Damage.`,descEn:`+5% Damage while Berserking

Tags: Berserking, Damage.`,tags:["Berserking","Damage."],tierValues:[]},{id:"Barbarian_Rare_032",type:"rare",name:"暴怒",nameEn:"Enraged",nameCn:"暴怒",desc:`+10% Damage while Berserking
+15% Berserking Duration

Bonus: Another +10% Damage while Berserking if requirements met:
{thresholdRequirements}

Tags: Berserking, Damage.`,descEn:`+10% Damage while Berserking
+15% Berserking Duration

Bonus: Another +10% Damage while Berserking if requirements met:
{thresholdRequirements}

Tags: Berserking, Damage.`,tags:["Berserking","Damage."],tierValues:[]},{id:"Barbarian_Magic_BerserkDuration",type:"magic",name:"Berserk Duration",nameEn:"Berserk Duration",desc:`+7.5% Berserking Duration

Tags: Berserking.`,descEn:`+7.5% Berserking Duration

Tags: Berserking.`,tags:["Berserking."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null,null,null,null,null,null],[null,null,null,null,{id:"Barbarian_Magic_BerserkDamage",type:"magic",name:"Berserk Damage",nameEn:"Berserk Damage",desc:`+5% Damage while Berserking

Tags: Berserking, Damage.`,descEn:`+5% Damage while Berserking

Tags: Berserking, Damage.`,tags:["Berserking","Damage."],tierValues:[]},{id:"Barbarian_Magic_BerserkDuration",type:"magic",name:"Berserk Duration",nameEn:"Berserk Duration",desc:`+7.5% Berserking Duration

Tags: Berserking.`,descEn:`+7.5% Berserking Duration

Tags: Berserking.`,tags:["Berserking."],tierValues:[]},null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null,null,null,null,null],[null,null,null,null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null,null,null,null,null,null],[null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,{id:"Generic_Magic_DamageReductionFromBleedingTarget",type:"magic",name:"Damage Reduction From Bleeding Target",nameEn:"Damage Reduction From Bleeding Target",desc:`2% 对Bleeding 敌人的伤害减免

Tags: 流血, 伤害减免.`,descEn:`2% Damage Reduction from Bleeding Enemies

Tags: Bleed, Damage Reduction.`,descCn:`2% 对Bleeding 敌人的伤害减免

Tags: 流血, 伤害减免.`,tags:["流血","伤害减免."],tierValues:[]},null,null,null,null,null,null,null,null],[null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Barbarian_Legendary_004",type:"legendary",name:"血怒",nameEn:"Blood Rage",nameCn:"血怒",desc:`消灭一名流血敌人有 10% 几率使你进入狂暴状态, 持续 5 秒。你的伤害增加, 相当于狂暴伤害加成的 x25%。

Tags: 流血, 狂暴.`,descEn:`Killing a Bleeding enemy has 10% chance to grant Berserking for 5 seconds. Your damage is increased by x25% of your Damage while Berserking bonus.

Tags: Bleed, Berserking.`,descCn:`消灭一名流血敌人有 10% 几率使你进入狂暴状态, 持续 5 秒。你的伤害增加, 相当于狂暴伤害加成的 x25%。

Tags: 流血, 狂暴.`,tags:["流血","狂暴."],tierValues:[]},null,{id:"Generic_Magic_Will",type:"magic",name:"Willpower",nameEn:"Willpower",desc:`+7 点意力

Tags: 意力.`,descEn:`+7 Willpower

Tags: Willpower.`,descCn:`+7 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Barbarian_Rare_016",type:"rare",name:"毅力",nameEn:"Grit",nameCn:"毅力",desc:`4% 对Bleeding 敌人的伤害减免
+10 点力量

Bonus: Another 4% Damage Reduction from Bleeding Enemies if requirements met:
{thresholdRequirements}

Tags: 流血, 伤害减免, 力量.`,descEn:`4% Damage Reduction from Bleeding Enemies
+10 Strength

Bonus: Another 4% Damage Reduction from Bleeding Enemies if requirements met:
{thresholdRequirements}

Tags: Bleed, Damage Reduction, Strength.`,descCn:`4% 对Bleeding 敌人的伤害减免
+10 点力量

Bonus: Another 4% Damage Reduction from Bleeding Enemies if requirements met:
{thresholdRequirements}

Tags: 流血, 伤害减免, 力量.`,tags:["流血","伤害减免","力量."],tierValues:[]},{id:"Generic_Magic_Will",type:"magic",name:"Willpower",nameEn:"Willpower",desc:`+7 点意力

Tags: 意力.`,descEn:`+7 Willpower

Tags: Willpower.`,descCn:`+7 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null,null,null,null,null,null],[{id:"Generic_Gate",type:"gate",name:"面板连接关口",nameEn:"Board Attachment Gate",nameCn:"面板连接关口",desc:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,descEn:`+5 Strength
+5 Intelligence
+5 Willpower
+5 Dexterity

Tags: Strength, Intelligence, Willpower, Dexterity.`,descCn:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,tags:["力量","智力","意力","敏捷."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null,null,null,{id:"Generic_Magic_DamageReductionFromBleedingTarget",type:"magic",name:"Damage Reduction From Bleeding Target",nameEn:"Damage Reduction From Bleeding Target",desc:`2% 对Bleeding 敌人的伤害减免

Tags: 流血, 伤害减免.`,descEn:`2% Damage Reduction from Bleeding Enemies

Tags: Bleed, Damage Reduction.`,descCn:`2% 对Bleeding 敌人的伤害减免

Tags: 流血, 伤害减免.`,tags:["流血","伤害减免."],tierValues:[]},{id:"Generic_Magic_DamageReductionFromBleedingTarget",type:"magic",name:"Damage Reduction From Bleeding Target",nameEn:"Damage Reduction From Bleeding Target",desc:`2% 对Bleeding 敌人的伤害减免

Tags: 流血, 伤害减免.`,descEn:`2% Damage Reduction from Bleeding Enemies

Tags: Bleed, Damage Reduction.`,descCn:`2% 对Bleeding 敌人的伤害减免

Tags: 流血, 伤害减免.`,tags:["流血","伤害减免."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Gate",type:"gate",name:"面板连接关口",nameEn:"Board Attachment Gate",nameCn:"面板连接关口",desc:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,descEn:`+5 Strength
+5 Intelligence
+5 Willpower
+5 Dexterity

Tags: Strength, Intelligence, Willpower, Dexterity.`,descCn:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,tags:["力量","智力","意力","敏捷."],tierValues:[]}],[null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null,{id:"Generic_Magic_Dex",type:"magic",name:"Dexterity",nameEn:"Dexterity",desc:`+7 点敏捷

Tags: 敏捷.`,descEn:`+7 Dexterity

Tags: Dexterity.`,descCn:`+7 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null],[null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Magic_DamageToBleed",type:"magic",name:"Damage To Bleed",nameEn:"Damage To Bleed",desc:`+5% 对Bleeding 敌人的伤害

Tags: 流血, 伤害.`,descEn:`+5% Damage to Bleeding Enemies

Tags: Bleed, Damage.`,descCn:`+5% 对Bleeding 敌人的伤害

Tags: 流血, 伤害.`,tags:["流血","伤害."],tierValues:[]},{id:"Generic_Rare_058",type:"rare",name:"狂欢",nameEn:"Revel",nameCn:"狂欢",desc:`+10% 对Bleeding 敌人的伤害
+10 点力量

Bonus: Another +10% Damage to Bleeding Enemies if requirements met:
{thresholdRequirements}

Tags: 流血, 伤害, 力量.`,descEn:`+10% Damage to Bleeding Enemies
+10 Strength

Bonus: Another +10% Damage to Bleeding Enemies if requirements met:
{thresholdRequirements}

Tags: Bleed, Damage, Strength.`,descCn:`+10% 对Bleeding 敌人的伤害
+10 点力量

Bonus: Another +10% Damage to Bleeding Enemies if requirements met:
{thresholdRequirements}

Tags: 流血, 伤害, 力量.`,tags:["流血","伤害","力量."],tierValues:[]},{id:"Generic_Magic_DamageToBleed",type:"magic",name:"Damage To Bleed",nameEn:"Damage To Bleed",desc:`+5% 对Bleeding 敌人的伤害

Tags: 流血, 伤害.`,descEn:`+5% Damage to Bleeding Enemies

Tags: Bleed, Damage.`,descCn:`+5% 对Bleeding 敌人的伤害

Tags: 流血, 伤害.`,tags:["流血","伤害."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Socket",type:"socket",name:"雕文插槽",nameEn:"Glyph Socket",nameCn:"雕文插槽",tags:[],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null],[null,null,null,{id:"Generic_Magic_ResistanceFire",type:"magic",name:"Resistance Fire",nameEn:"Resistance Fire",desc:`+5% Fire 抗性

Tags: 抗性, 火焰.`,descEn:`+5% Fire Resistance

Tags: Resistance, Fire.`,descCn:`+5% Fire 抗性

Tags: 抗性, 火焰.`,tags:["抗性","火焰."],tierValues:[]},{id:"Generic_Magic_ResistanceFire",type:"magic",name:"Resistance Fire",nameEn:"Resistance Fire",desc:`+5% Fire 抗性

Tags: 抗性, 火焰.`,descEn:`+5% Fire Resistance

Tags: Resistance, Fire.`,descCn:`+5% Fire 抗性

Tags: 抗性, 火焰.`,tags:["抗性","火焰."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Generic_Magic_Dex",type:"magic",name:"Dexterity",nameEn:"Dexterity",desc:`+7 点敏捷

Tags: 敏捷.`,descEn:`+7 Dexterity

Tags: Dexterity.`,descCn:`+7 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Magic_DamageToBleed",type:"magic",name:"Damage To Bleed",nameEn:"Damage To Bleed",desc:`+5% 对Bleeding 敌人的伤害

Tags: 流血, 伤害.`,descEn:`+5% Damage to Bleeding Enemies

Tags: Bleed, Damage.`,descCn:`+5% 对Bleeding 敌人的伤害

Tags: 流血, 伤害.`,tags:["流血","伤害."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null],[null,null,{id:"Generic_Magic_Armor",type:"magic",name:"Armor",nameEn:"Armor",desc:`+50 护甲值

Tags: 护甲.`,descEn:`+50 Armor

Tags: Armor.`,descCn:`+50 护甲值

Tags: 护甲.`,tags:["护甲."],tierValues:[]},{id:"Barbarian_Rare_019",type:"rare",name:"适应火焰",nameEn:"Fire Conditioned",nameCn:"适应火焰",desc:`+10% Fire 抗性
+100 护甲值

Bonus: Another +10% Fire Resistance if requirements met:
{thresholdRequirements}

Tags: 抗性, 护甲, 火焰.`,descEn:`+10% Fire Resistance
+100 Armor

Bonus: Another +10% Fire Resistance if requirements met:
{thresholdRequirements}

Tags: Resistance, Armor, Fire.`,descCn:`+10% Fire 抗性
+100 护甲值

Bonus: Another +10% Fire Resistance if requirements met:
{thresholdRequirements}

Tags: 抗性, 护甲, 火焰.`,tags:["抗性","护甲","火焰."],tierValues:[]},{id:"Generic_Magic_Armor",type:"magic",name:"Armor",nameEn:"Armor",desc:`+50 护甲值

Tags: 护甲.`,descEn:`+50 Armor

Tags: Armor.`,descCn:`+50 护甲值

Tags: 护甲.`,tags:["护甲."],tierValues:[]},null,null,null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null],[null,null,null,{id:"Generic_Magic_ResistanceFire",type:"magic",name:"Resistance Fire",nameEn:"Resistance Fire",desc:`+5% Fire 抗性

Tags: 抗性, 火焰.`,descEn:`+5% Fire Resistance

Tags: Resistance, Fire.`,descCn:`+5% Fire 抗性

Tags: 抗性, 火焰.`,tags:["抗性","火焰."],tierValues:[]},null,null,null,null,null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Magic_DamageToBleed",type:"magic",name:"Damage To Bleed",nameEn:"Damage To Bleed",desc:`+5% 对Bleeding 敌人的伤害

Tags: 流血, 伤害.`,descEn:`+5% Damage to Bleeding Enemies

Tags: Bleed, Damage.`,descCn:`+5% 对Bleeding 敌人的伤害

Tags: 流血, 伤害.`,tags:["流血","伤害."],tierValues:[]},null,null,null],[null,null,null,null,null,null,null,null,null,null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Magic_DamageToBleed",type:"magic",name:"Damage To Bleed",nameEn:"Damage To Bleed",desc:`+5% 对Bleeding 敌人的伤害

Tags: 流血, 伤害.`,descEn:`+5% Damage to Bleeding Enemies

Tags: Bleed, Damage.`,descCn:`+5% 对Bleeding 敌人的伤害

Tags: 流血, 伤害.`,tags:["流血","伤害."],tierValues:[]},{id:"Generic_Magic_DamageToElite",type:"magic",name:"Damage To Elite",nameEn:"Damage To Elite",desc:`+8% 对精英的伤害

Tags: 精英怪物, 伤害.`,descEn:`+8% Damage to Elites

Tags: Elite Monsters, Damage.`,descCn:`+8% 对精英的伤害

Tags: 精英怪物, 伤害.`,tags:["精英怪物","伤害."],tierValues:[]},null,null,null],[null,null,null,null,null,null,null,null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Magic_DamageToBleed",type:"magic",name:"Damage To Bleed",nameEn:"Damage To Bleed",desc:`+5% 对Bleeding 敌人的伤害

Tags: 流血, 伤害.`,descEn:`+5% Damage to Bleeding Enemies

Tags: Bleed, Damage.`,descCn:`+5% 对Bleeding 敌人的伤害

Tags: 流血, 伤害.`,tags:["流血","伤害."],tierValues:[]},{id:"Generic_Magic_DamageToElite",type:"magic",name:"Damage To Elite",nameEn:"Damage To Elite",desc:`+8% 对精英的伤害

Tags: 精英怪物, 伤害.`,descEn:`+8% Damage to Elites

Tags: Elite Monsters, Damage.`,descCn:`+8% 对精英的伤害

Tags: 精英怪物, 伤害.`,tags:["精英怪物","伤害."],tierValues:[]},{id:"Generic_Rare_057",type:"rare",name:"渴求",nameEn:"Craving",nameCn:"渴求",desc:`+10% 对Bleeding 敌人的伤害
+16% 对精英的伤害

Bonus: Another +10% Damage to Bleeding Enemies if requirements met:
{thresholdRequirements}

Tags: 流血, 精英怪物, 伤害.`,descEn:`+10% Damage to Bleeding Enemies
+16% Damage to Elites

Bonus: Another +10% Damage to Bleeding Enemies if requirements met:
{thresholdRequirements}

Tags: Bleed, Elite Monsters, Damage.`,descCn:`+10% 对Bleeding 敌人的伤害
+16% 对精英的伤害

Bonus: Another +10% Damage to Bleeding Enemies if requirements met:
{thresholdRequirements}

Tags: 流血, 精英怪物, 伤害.`,tags:["流血","精英怪物","伤害."],tierValues:[]},null,null,null],[null,null,null,null,null,null,null,null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,{id:"Generic_Gate",type:"gate",name:"面板连接关口",nameEn:"Board Attachment Gate",nameCn:"面板连接关口",desc:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,descEn:`+5 Strength
+5 Intelligence
+5 Willpower
+5 Dexterity

Tags: Strength, Intelligence, Willpower, Dexterity.`,descCn:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,tags:["力量","智力","意力","敏捷."],tierValues:[]},null,null,null,null,null,null,null,null,null,null]],gates:[{row:0,col:10,id:"Generic_Gate",direction:"bottom"},{row:10,col:0,id:"Generic_Gate",direction:"right"},{row:10,col:20,id:"Generic_Gate",direction:"left"},{row:20,col:10,id:"Generic_Gate",direction:"top"}],startNodes:[],gatePositions:{top:[{row:0,col:10,id:"Generic_Gate",direction:"bottom"}],bottom:[{row:20,col:10,id:"Generic_Gate",direction:"top"}],left:[{row:10,col:0,id:"Generic_Gate",direction:"right"}],right:[{row:10,col:20,id:"Generic_Gate",direction:"left"}]}},{id:"Paragon_Barb_Carnage",name:"Carnage",rows:21,cols:21,grid:[[null,null,null,null,null,null,null,null,null,null,{id:"Generic_Gate",type:"gate",name:"面板连接关口",nameEn:"Board Attachment Gate",nameCn:"面板连接关口",desc:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,descEn:`+5 Strength
+5 Intelligence
+5 Willpower
+5 Dexterity

Tags: Strength, Intelligence, Willpower, Dexterity.`,descCn:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,tags:["力量","智力","意力","敏捷."],tierValues:[]},null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Magic_ResistanceCold",type:"magic",name:"Resistance Cold",nameEn:"Resistance Cold",desc:`+5% Cold 抗性

Tags: 抗性, 冰霜.`,descEn:`+5% Cold Resistance

Tags: Resistance, Cold.`,descCn:`+5% Cold 抗性

Tags: 抗性, 冰霜.`,tags:["抗性","冰霜."],tierValues:[]},{id:"Generic_Magic_Armor",type:"magic",name:"Armor",nameEn:"Armor",desc:`+50 护甲值

Tags: 护甲.`,descEn:`+50 Armor

Tags: Armor.`,descCn:`+50 护甲值

Tags: 护甲.`,tags:["护甲."],tierValues:[]},null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null,{id:"Generic_Magic_ResistanceCold",type:"magic",name:"Resistance Cold",nameEn:"Resistance Cold",desc:`+5% Cold 抗性

Tags: 抗性, 冰霜.`,descEn:`+5% Cold Resistance

Tags: Resistance, Cold.`,descCn:`+5% Cold 抗性

Tags: 抗性, 冰霜.`,tags:["抗性","冰霜."],tierValues:[]},{id:"Barbarian_Rare_010",type:"rare",name:"适应严寒",nameEn:"Cold Conditioned",nameCn:"适应严寒",desc:`+10% Cold 抗性
+100 护甲值

Bonus: Another +10% Cold Resistance if requirements met:
{thresholdRequirements}

Tags: 冰霜, 抗性, 护甲.`,descEn:`+10% Cold Resistance
+100 Armor

Bonus: Another +10% Cold Resistance if requirements met:
{thresholdRequirements}

Tags: Cold, Resistance, Armor.`,descCn:`+10% Cold 抗性
+100 护甲值

Bonus: Another +10% Cold Resistance if requirements met:
{thresholdRequirements}

Tags: 冰霜, 抗性, 护甲.`,tags:["冰霜","抗性","护甲."],tierValues:[]},null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Magic_ResistanceCold",type:"magic",name:"Resistance Cold",nameEn:"Resistance Cold",desc:`+5% Cold 抗性

Tags: 抗性, 冰霜.`,descEn:`+5% Cold Resistance

Tags: Resistance, Cold.`,descCn:`+5% Cold 抗性

Tags: 抗性, 冰霜.`,tags:["抗性","冰霜."],tierValues:[]},{id:"Generic_Magic_Armor",type:"magic",name:"Armor",nameEn:"Armor",desc:`+50 护甲值

Tags: 护甲.`,descEn:`+50 Armor

Tags: Armor.`,descCn:`+50 护甲值

Tags: 护甲.`,tags:["护甲."],tierValues:[]},null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null,null,null,null],[null,null,null,null,{id:"Barbarian_Rare_003",type:"rare",name:"狂战士",nameEn:"Berserker",nameCn:"狂战士",desc:`+5% Damage while Berserking
+16% 对精英的伤害

Bonus: Another +5% Damage while Berserking if requirements met:
{thresholdRequirements}

Tags: 狂暴, 精英怪物, 伤害.`,descEn:`+5% Damage while Berserking
+16% Damage to Elites

Bonus: Another +5% Damage while Berserking if requirements met:
{thresholdRequirements}

Tags: Berserking, Elite Monsters, Damage.`,descCn:`+5% Damage while Berserking
+16% 对精英的伤害

Bonus: Another +5% Damage while Berserking if requirements met:
{thresholdRequirements}

Tags: 狂暴, 精英怪物, 伤害.`,tags:["狂暴","精英怪物","伤害."],tierValues:[]},{id:"Generic_Magic_DamageToElite",type:"magic",name:"Damage To Elite",nameEn:"Damage To Elite",desc:`+8% 对精英的伤害

Tags: 精英怪物, 伤害.`,descEn:`+8% Damage to Elites

Tags: Elite Monsters, Damage.`,descCn:`+8% 对精英的伤害

Tags: 精英怪物, 伤害.`,tags:["精英怪物","伤害."],tierValues:[]},{id:"Barbarian_Magic_BerserkDamage",type:"magic",name:"Berserk Damage",nameEn:"Berserk Damage",desc:`+5% Damage while Berserking

Tags: Berserking, Damage.`,descEn:`+5% Damage while Berserking

Tags: Berserking, Damage.`,tags:["Berserking","Damage."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null,null,null,null,null],[null,null,null,null,{id:"Barbarian_Magic_BerserkDamage",type:"magic",name:"Berserk Damage",nameEn:"Berserk Damage",desc:`+5% Damage while Berserking

Tags: Berserking, Damage.`,descEn:`+5% Damage while Berserking

Tags: Berserking, Damage.`,tags:["Berserking","Damage."],tierValues:[]},{id:"Generic_Magic_DamageToElite",type:"magic",name:"Damage To Elite",nameEn:"Damage To Elite",desc:`+8% 对精英的伤害

Tags: 精英怪物, 伤害.`,descEn:`+8% Damage to Elites

Tags: Elite Monsters, Damage.`,descCn:`+8% 对精英的伤害

Tags: 精英怪物, 伤害.`,tags:["精英怪物","伤害."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null,{id:"Barbarian_Magic_BerserkDamage",type:"magic",name:"Berserk Damage",nameEn:"Berserk Damage",desc:`+5% Damage while Berserking

Tags: Berserking, Damage.`,descEn:`+5% Damage while Berserking

Tags: Berserking, Damage.`,tags:["Berserking","Damage."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null,null,null,null,null],[null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Barbarian_Magic_BerserkDamage",type:"magic",name:"Berserk Damage",nameEn:"Berserk Damage",desc:`+5% Damage while Berserking

Tags: Berserking, Damage.`,descEn:`+5% Damage while Berserking

Tags: Berserking, Damage.`,tags:["Berserking","Damage."],tierValues:[]},null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,{id:"Barbarian_Rare_023",type:"rare",name:"凶暴",nameEn:"Fierce",nameCn:"凶暴",desc:`+10% Damage while Berserking
+10 点力量

Bonus: Another +10% Damage while Berserking if requirements met:
{thresholdRequirements}

Tags: 狂暴, 伤害, 力量.`,descEn:`+10% Damage while Berserking
+10 Strength

Bonus: Another +10% Damage while Berserking if requirements met:
{thresholdRequirements}

Tags: Berserking, Damage, Strength.`,descCn:`+10% Damage while Berserking
+10 点力量

Bonus: Another +10% Damage while Berserking if requirements met:
{thresholdRequirements}

Tags: 狂暴, 伤害, 力量.`,tags:["狂暴","伤害","力量."],tierValues:[]},{id:"Generic_Magic_Dex",type:"magic",name:"Dexterity",nameEn:"Dexterity",desc:`+7 点敏捷

Tags: 敏捷.`,descEn:`+7 Dexterity

Tags: Dexterity.`,descCn:`+7 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null,null,null,null],[null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Generic_Magic_Dex",type:"magic",name:"Dexterity",nameEn:"Dexterity",desc:`+7 点敏捷

Tags: 敏捷.`,descEn:`+7 Dexterity

Tags: Dexterity.`,descCn:`+7 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Barbarian_Magic_BerserkDamage",type:"magic",name:"Berserk Damage",nameEn:"Berserk Damage",desc:`+5% Damage while Berserking

Tags: Berserking, Damage.`,descEn:`+5% Damage while Berserking

Tags: Berserking, Damage.`,tags:["Berserking","Damage."],tierValues:[]},{id:"Barbarian_Magic_BerserkDamage",type:"magic",name:"Berserk Damage",nameEn:"Berserk Damage",desc:`+5% Damage while Berserking

Tags: Berserking, Damage.`,descEn:`+5% Damage while Berserking

Tags: Berserking, Damage.`,tags:["Berserking","Damage."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null],[{id:"Generic_Gate",type:"gate",name:"面板连接关口",nameEn:"Board Attachment Gate",nameCn:"面板连接关口",desc:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,descEn:`+5 Strength
+5 Intelligence
+5 Willpower
+5 Dexterity

Tags: Strength, Intelligence, Willpower, Dexterity.`,descCn:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,tags:["力量","智力","意力","敏捷."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},null,null,null,null,{id:"Barbarian_Legendary_009",type:"legendary",name:"屠戮者",nameEn:"Carnage",nameCn:"屠戮者",desc:`狂暴状态下, 暴击使你的攻击速度提高 +2%, 最多提高 +16%, 持续 6 秒。

Tags: 狂暴, 暴击, 攻击速度.`,descEn:`While Berserking, Critical Strikes increase your Attack Speed by +2%, up to +16%, for 6 seconds.

Tags: Berserking, Critical Strikes, Attack Speed.`,descCn:`狂暴状态下, 暴击使你的攻击速度提高 +2%, 最多提高 +16%, 持续 6 秒。

Tags: 狂暴, 暴击, 攻击速度.`,tags:["狂暴","暴击","攻击速度."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null,null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Socket",type:"socket",name:"雕文插槽",nameEn:"Glyph Socket",nameCn:"雕文插槽",tags:[],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Gate",type:"gate",name:"面板连接关口",nameEn:"Board Attachment Gate",nameCn:"面板连接关口",desc:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,descEn:`+5 Strength
+5 Intelligence
+5 Willpower
+5 Dexterity

Tags: Strength, Intelligence, Willpower, Dexterity.`,descCn:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,tags:["力量","智力","意力","敏捷."],tierValues:[]}],[null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Generic_Magic_Will",type:"magic",name:"Willpower",nameEn:"Willpower",desc:`+7 点意力

Tags: 意力.`,descEn:`+7 Willpower

Tags: Willpower.`,descCn:`+7 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Magic_DamageReductionFromNear",type:"magic",name:"Damage Reduction From Near",nameEn:"Damage Reduction From Near",desc:`2.2% 来自近距敌人的伤害减免

Tags: 伤害减免.`,descEn:`2.2% Damage Reduction from Close Enemies

Tags: Damage Reduction.`,descCn:`2.2% 来自近距敌人的伤害减免

Tags: 伤害减免.`,tags:["伤害减免."],tierValues:[]},{id:"Generic_Magic_DamageReductionFromNear",type:"magic",name:"Damage Reduction From Near",nameEn:"Damage Reduction From Near",desc:`2.2% 来自近距敌人的伤害减免

Tags: 伤害减免.`,descEn:`2.2% Damage Reduction from Close Enemies

Tags: Damage Reduction.`,descCn:`2.2% 来自近距敌人的伤害减免

Tags: 伤害减免.`,tags:["伤害减免."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null],[null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Magic_PotionHealing",type:"magic",name:"Potion Healing",nameEn:"Potion Healing",desc:`2% 药水恢复效果

Tags: 治疗.`,descEn:`+2% Potion Healing

Tags: Healing.`,descCn:`2% 药水恢复效果

Tags: 治疗.`,tags:["治疗."],tierValues:[]},null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,{id:"Generic_Rare_059",type:"rare",name:"张狂",nameEn:"Brash",nameCn:"张狂",desc:`4.5% 来自近距敌人的伤害减免
+10 点力量

Bonus: Another 4.5% Damage Reduction from Close Enemies if requirements met:
{thresholdRequirements}

Tags: 伤害减免, 力量.`,descEn:`4.5% Damage Reduction from Close Enemies
+10 Strength

Bonus: Another 4.5% Damage Reduction from Close Enemies if requirements met:
{thresholdRequirements}

Tags: Damage Reduction, Strength.`,descCn:`4.5% 来自近距敌人的伤害减免
+10 点力量

Bonus: Another 4.5% Damage Reduction from Close Enemies if requirements met:
{thresholdRequirements}

Tags: 伤害减免, 力量.`,tags:["伤害减免","力量."],tierValues:[]},{id:"Generic_Magic_Will",type:"magic",name:"Willpower",nameEn:"Willpower",desc:`+7 点意力

Tags: 意力.`,descEn:`+7 Willpower

Tags: Willpower.`,descCn:`+7 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null,null,null,null],[null,null,null,null,{id:"Generic_Magic_PotionHealing",type:"magic",name:"Potion Healing",nameEn:"Potion Healing",desc:`2% 药水恢复效果

Tags: 治疗.`,descEn:`+2% Potion Healing

Tags: Healing.`,descCn:`2% 药水恢复效果

Tags: 治疗.`,tags:["治疗."],tierValues:[]},{id:"Generic_Magic_HPRegen",type:"magic",name:"HP Regen",nameEn:"HP Regen",desc:`+5 近期未受任何伤害时的生命回复速度

Tags: 治疗.`,descEn:`+5 Life Regeneration while Not Damaged Recently

Tags: Healing.`,descCn:`+5 近期未受任何伤害时的生命回复速度

Tags: 治疗.`,tags:["治疗."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null,{id:"Generic_Magic_DamageReductionFromNear",type:"magic",name:"Damage Reduction From Near",nameEn:"Damage Reduction From Near",desc:`2.2% 来自近距敌人的伤害减免

Tags: 伤害减免.`,descEn:`2.2% Damage Reduction from Close Enemies

Tags: Damage Reduction.`,descCn:`2.2% 来自近距敌人的伤害减免

Tags: 伤害减免.`,tags:["伤害减免."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null,null,null,null],[null,null,null,null,{id:"Generic_Rare_033",type:"rare",name:"复原",nameEn:"Recuperate",nameCn:"复原",desc:`4% 药水恢复效果
+10 近期未受任何伤害时的生命回复速度

Bonus: Another +4% Potion Healing if requirements met:
{thresholdRequirements}

Tags: 治疗.`,descEn:`+4% Potion Healing
+10 Life Regeneration while Not Damaged Recently

Bonus: Another +4% Potion Healing if requirements met:
{thresholdRequirements}

Tags: Healing.`,descCn:`4% 药水恢复效果
+10 近期未受任何伤害时的生命回复速度

Bonus: Another +4% Potion Healing if requirements met:
{thresholdRequirements}

Tags: 治疗.`,tags:["治疗."],tierValues:[]},{id:"Generic_Magic_HPRegen",type:"magic",name:"HP Regen",nameEn:"HP Regen",desc:`+5 近期未受任何伤害时的生命回复速度

Tags: 治疗.`,descEn:`+5 Life Regeneration while Not Damaged Recently

Tags: Healing.`,descCn:`+5 近期未受任何伤害时的生命回复速度

Tags: 治疗.`,tags:["治疗."],tierValues:[]},{id:"Generic_Magic_PotionHealing",type:"magic",name:"Potion Healing",nameEn:"Potion Healing",desc:`2% 药水恢复效果

Tags: 治疗.`,descEn:`+2% Potion Healing

Tags: Healing.`,descCn:`2% 药水恢复效果

Tags: 治疗.`,tags:["治疗."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Barbarian_Magic_BerserkDamage",type:"magic",name:"Berserk Damage",nameEn:"Berserk Damage",desc:`+5% Damage while Berserking

Tags: Berserking, Damage.`,descEn:`+5% Damage while Berserking

Tags: Berserking, Damage.`,tags:["Berserking","Damage."],tierValues:[]},{id:"Barbarian_Magic_BerserkDuration",type:"magic",name:"Berserk Duration",nameEn:"Berserk Duration",desc:`+7.5% Berserking Duration

Tags: Berserking.`,descEn:`+7.5% Berserking Duration

Tags: Berserking.`,tags:["Berserking."],tierValues:[]},null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null,{id:"Barbarian_Magic_BerserkDamage",type:"magic",name:"Berserk Damage",nameEn:"Berserk Damage",desc:`+5% Damage while Berserking

Tags: Berserking, Damage.`,descEn:`+5% Damage while Berserking

Tags: Berserking, Damage.`,tags:["Berserking","Damage."],tierValues:[]},{id:"Barbarian_Rare_032",type:"rare",name:"暴怒",nameEn:"Enraged",nameCn:"暴怒",desc:`+10% Damage while Berserking
+15% Berserking Duration

Bonus: Another +10% Damage while Berserking if requirements met:
{thresholdRequirements}

Tags: Berserking, Damage.`,descEn:`+10% Damage while Berserking
+15% Berserking Duration

Bonus: Another +10% Damage while Berserking if requirements met:
{thresholdRequirements}

Tags: Berserking, Damage.`,tags:["Berserking","Damage."],tierValues:[]},null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Barbarian_Magic_BerserkDamage",type:"magic",name:"Berserk Damage",nameEn:"Berserk Damage",desc:`+5% Damage while Berserking

Tags: Berserking, Damage.`,descEn:`+5% Damage while Berserking

Tags: Berserking, Damage.`,tags:["Berserking","Damage."],tierValues:[]},{id:"Barbarian_Magic_BerserkDuration",type:"magic",name:"Berserk Duration",nameEn:"Berserk Duration",desc:`+7.5% Berserking Duration

Tags: Berserking.`,descEn:`+7.5% Berserking Duration

Tags: Berserking.`,tags:["Berserking."],tierValues:[]},null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,{id:"Generic_Gate",type:"gate",name:"面板连接关口",nameEn:"Board Attachment Gate",nameCn:"面板连接关口",desc:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,descEn:`+5 Strength
+5 Intelligence
+5 Willpower
+5 Dexterity

Tags: Strength, Intelligence, Willpower, Dexterity.`,descCn:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,tags:["力量","智力","意力","敏捷."],tierValues:[]},null,null,null,null,null,null,null,null,null,null]],gates:[{row:0,col:10,id:"Generic_Gate",direction:"bottom"},{row:10,col:0,id:"Generic_Gate",direction:"right"},{row:10,col:20,id:"Generic_Gate",direction:"left"},{row:20,col:10,id:"Generic_Gate",direction:"top"}],startNodes:[],gatePositions:{top:[{row:0,col:10,id:"Generic_Gate",direction:"bottom"}],bottom:[{row:20,col:10,id:"Generic_Gate",direction:"top"}],left:[{row:10,col:0,id:"Generic_Gate",direction:"right"}],right:[{row:10,col:20,id:"Generic_Gate",direction:"left"}]}},{id:"Paragon_Barb_Decimator",name:"Decimator",rows:21,cols:21,grid:[[null,null,null,null,null,null,null,null,null,null,{id:"Generic_Gate",type:"gate",name:"面板连接关口",nameEn:"Board Attachment Gate",nameCn:"面板连接关口",desc:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,descEn:`+5 Strength
+5 Intelligence
+5 Willpower
+5 Dexterity

Tags: Strength, Intelligence, Willpower, Dexterity.`,descCn:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,tags:["力量","智力","意力","敏捷."],tierValues:[]},null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,{id:"Generic_Magic_Dex",type:"magic",name:"Dexterity",nameEn:"Dexterity",desc:`+7 点敏捷

Tags: 敏捷.`,descEn:`+7 Dexterity

Tags: Dexterity.`,descCn:`+7 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Magic_DamageToVulnerable",type:"magic",name:"Damage To Vulnerable",nameEn:"Damage To Vulnerable",desc:`+5% 易伤伤害

Tags: 易伤, 伤害.`,descEn:`+5% Vulnerable Damage

Tags: Vulnerable, Damage.`,descCn:`+5% 易伤伤害

Tags: 易伤, 伤害.`,tags:["易伤","伤害."],tierValues:[]},null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Generic_Magic_DamageReductionFromVulnerable",type:"magic",name:"Damage Reduction From Vulnerable",nameEn:"Damage Reduction From Vulnerable",desc:`2% 对易伤敌人的伤害减免

Tags: 易伤, 伤害减免.`,descEn:`2% Damage Reduction from Vulnerable Enemies

Tags: Vulnerable, Damage Reduction.`,descCn:`2% 对易伤敌人的伤害减免

Tags: 易伤, 伤害减免.`,tags:["易伤","伤害减免."],tierValues:[]},{id:"Generic_Magic_Will",type:"magic",name:"Willpower",nameEn:"Willpower",desc:`+7 点意力

Tags: 意力.`,descEn:`+7 Willpower

Tags: Willpower.`,descCn:`+7 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null,null,null,null,null,null],[null,null,null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Magic_Dex",type:"magic",name:"Dexterity",nameEn:"Dexterity",desc:`+7 点敏捷

Tags: 敏捷.`,descEn:`+7 Dexterity

Tags: Dexterity.`,descCn:`+7 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Rare_070",type:"rare",name:"毁坏",nameEn:"Demolish",nameCn:"毁坏",desc:`+10% 易伤伤害
+10 点力量

Bonus: Another +10% Vulnerable Damage if requirements met:
{thresholdRequirements}

Tags: 易伤, 伤害, 力量.`,descEn:`+10% Vulnerable Damage
+10 Strength

Bonus: Another +10% Vulnerable Damage if requirements met:
{thresholdRequirements}

Tags: Vulnerable, Damage, Strength.`,descCn:`+10% 易伤伤害
+10 点力量

Bonus: Another +10% Vulnerable Damage if requirements met:
{thresholdRequirements}

Tags: 易伤, 伤害, 力量.`,tags:["易伤","伤害","力量."],tierValues:[]},{id:"Generic_Magic_DamageToVulnerable",type:"magic",name:"Damage To Vulnerable",nameEn:"Damage To Vulnerable",desc:`+5% 易伤伤害

Tags: 易伤, 伤害.`,descEn:`+5% Vulnerable Damage

Tags: Vulnerable, Damage.`,descCn:`+5% 易伤伤害

Tags: 易伤, 伤害.`,tags:["易伤","伤害."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Socket",type:"socket",name:"雕文插槽",nameEn:"Glyph Socket",nameCn:"雕文插槽",tags:[],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Magic_DamageReductionFromVulnerable",type:"magic",name:"Damage Reduction From Vulnerable",nameEn:"Damage Reduction From Vulnerable",desc:`2% 对易伤敌人的伤害减免

Tags: 易伤, 伤害减免.`,descEn:`2% Damage Reduction from Vulnerable Enemies

Tags: Vulnerable, Damage Reduction.`,descCn:`2% 对易伤敌人的伤害减免

Tags: 易伤, 伤害减免.`,tags:["易伤","伤害减免."],tierValues:[]},{id:"Generic_Rare_069",type:"rare",name:"傲慢",nameEn:"Arrogance",nameCn:"傲慢",desc:`4% 对易伤敌人的伤害减免
+10 点力量

Bonus: Another 4% Damage Reduction from Vulnerable Enemies if requirements met:
{thresholdRequirements}

Tags: 易伤, 伤害减免, 力量.`,descEn:`4% Damage Reduction from Vulnerable Enemies
+10 Strength

Bonus: Another 4% Damage Reduction from Vulnerable Enemies if requirements met:
{thresholdRequirements}

Tags: Vulnerable, Damage Reduction, Strength.`,descCn:`4% 对易伤敌人的伤害减免
+10 点力量

Bonus: Another 4% Damage Reduction from Vulnerable Enemies if requirements met:
{thresholdRequirements}

Tags: 易伤, 伤害减免, 力量.`,tags:["易伤","伤害减免","力量."],tierValues:[]},{id:"Generic_Magic_Will",type:"magic",name:"Willpower",nameEn:"Willpower",desc:`+7 点意力

Tags: 意力.`,descEn:`+7 Willpower

Tags: Willpower.`,descCn:`+7 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null,null,null],[null,null,null,null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,{id:"Generic_Magic_DamageToVulnerable",type:"magic",name:"Damage To Vulnerable",nameEn:"Damage To Vulnerable",desc:`+5% 易伤伤害

Tags: 易伤, 伤害.`,descEn:`+5% Vulnerable Damage

Tags: Vulnerable, Damage.`,descCn:`+5% 易伤伤害

Tags: 易伤, 伤害.`,tags:["易伤","伤害."],tierValues:[]},null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Generic_Magic_DamageReductionFromVulnerable",type:"magic",name:"Damage Reduction From Vulnerable",nameEn:"Damage Reduction From Vulnerable",desc:`2% 对易伤敌人的伤害减免

Tags: 易伤, 伤害减免.`,descEn:`2% Damage Reduction from Vulnerable Enemies

Tags: Vulnerable, Damage Reduction.`,descCn:`2% 对易伤敌人的伤害减免

Tags: 易伤, 伤害减免.`,tags:["易伤","伤害减免."],tierValues:[]},null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null,null,null],[{id:"Generic_Gate",type:"gate",name:"面板连接关口",nameEn:"Board Attachment Gate",nameCn:"面板连接关口",desc:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,descEn:`+5 Strength
+5 Intelligence
+5 Willpower
+5 Dexterity

Tags: Strength, Intelligence, Willpower, Dexterity.`,descCn:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,tags:["力量","智力","意力","敏捷."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Gate",type:"gate",name:"面板连接关口",nameEn:"Board Attachment Gate",nameCn:"面板连接关口",desc:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,descEn:`+5 Strength
+5 Intelligence
+5 Willpower
+5 Dexterity

Tags: Strength, Intelligence, Willpower, Dexterity.`,descCn:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,tags:["力量","智力","意力","敏捷."],tierValues:[]}],[null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},null,null,null,null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null],[null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Magic_DamagePhysical",type:"magic",name:"Damage Physical",nameEn:"Damage Physical",desc:`+5% Physical 伤害

Tags: 物理, 伤害.`,descEn:`+5% Physical Damage

Tags: Physical, Damage.`,descCn:`+5% Physical 伤害

Tags: 物理, 伤害.`,tags:["物理","伤害."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Magic_DamageToVulnerable",type:"magic",name:"Damage To Vulnerable",nameEn:"Damage To Vulnerable",desc:`+5% 易伤伤害

Tags: 易伤, 伤害.`,descEn:`+5% Vulnerable Damage

Tags: Vulnerable, Damage.`,descCn:`+5% 易伤伤害

Tags: 易伤, 伤害.`,tags:["易伤","伤害."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null],[null,null,null,{id:"Generic_Magic_HPPercent",type:"magic",name:"HP Percent",nameEn:"HP Percent",desc:`+2% 生命

Tags: 生命.`,descEn:`+2% Life

Tags: Life.`,descCn:`+2% 生命

Tags: 生命.`,tags:["生命."],tierValues:[]},{id:"Generic_Magic_DamagePhysical",type:"magic",name:"Damage Physical",nameEn:"Damage Physical",desc:`+5% Physical 伤害

Tags: 物理, 伤害.`,descEn:`+5% Physical Damage

Tags: Physical, Damage.`,descCn:`+5% Physical 伤害

Tags: 物理, 伤害.`,tags:["物理","伤害."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Magic_DamageToVulnerable",type:"magic",name:"Damage To Vulnerable",nameEn:"Damage To Vulnerable",desc:`+5% 易伤伤害

Tags: 易伤, 伤害.`,descEn:`+5% Vulnerable Damage

Tags: Vulnerable, Damage.`,descCn:`+5% 易伤伤害

Tags: 易伤, 伤害.`,tags:["易伤","伤害."],tierValues:[]},{id:"Generic_Magic_Armor",type:"magic",name:"Armor",nameEn:"Armor",desc:`+50 护甲值

Tags: 护甲.`,descEn:`+50 Armor

Tags: Armor.`,descCn:`+50 护甲值

Tags: 护甲.`,tags:["护甲."],tierValues:[]},null,null,null],[null,null,{id:"Generic_Magic_HPPercent",type:"magic",name:"HP Percent",nameEn:"HP Percent",desc:`+2% 生命

Tags: 生命.`,descEn:`+2% Life

Tags: Life.`,descCn:`+2% 生命

Tags: 生命.`,tags:["生命."],tierValues:[]},{id:"Barbarian_Rare_022",type:"rare",name:"膂力",nameEn:"Brawn",nameCn:"膂力",desc:`+10% Physical 伤害
+4% 生命

Bonus: Another +10% Physical Damage if requirements met:
{thresholdRequirements}

Tags: 物理, 伤害, 生命.`,descEn:`+10% Physical Damage
+4% Life

Bonus: Another +10% Physical Damage if requirements met:
{thresholdRequirements}

Tags: Physical, Damage, Life.`,descCn:`+10% Physical 伤害
+4% 生命

Bonus: Another +10% Physical Damage if requirements met:
{thresholdRequirements}

Tags: 物理, 伤害, 生命.`,tags:["物理","伤害","生命."],tierValues:[]},{id:"Generic_Magic_DamagePhysical",type:"magic",name:"Damage Physical",nameEn:"Damage Physical",desc:`+5% Physical 伤害

Tags: 物理, 伤害.`,descEn:`+5% Physical Damage

Tags: Physical, Damage.`,descCn:`+5% Physical 伤害

Tags: 物理, 伤害.`,tags:["物理","伤害."],tierValues:[]},null,null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},null,null,{id:"Generic_Magic_DamageToVulnerable",type:"magic",name:"Damage To Vulnerable",nameEn:"Damage To Vulnerable",desc:`+5% 易伤伤害

Tags: 易伤, 伤害.`,descEn:`+5% Vulnerable Damage

Tags: Vulnerable, Damage.`,descCn:`+5% 易伤伤害

Tags: 易伤, 伤害.`,tags:["易伤","伤害."],tierValues:[]},{id:"Generic_Rare_025",type:"rare",name:"掠夺",nameEn:"Pillage",nameCn:"掠夺",desc:`+10% 易伤伤害
+100 护甲值

Bonus: Another +10% Vulnerable Damage if requirements met:
{thresholdRequirements}

Tags: 易伤, 伤害, 护甲.`,descEn:`+10% Vulnerable Damage
+100 Armor

Bonus: Another +10% Vulnerable Damage if requirements met:
{thresholdRequirements}

Tags: Vulnerable, Damage, Armor.`,descCn:`+10% 易伤伤害
+100 护甲值

Bonus: Another +10% Vulnerable Damage if requirements met:
{thresholdRequirements}

Tags: 易伤, 伤害, 护甲.`,tags:["易伤","伤害","护甲."],tierValues:[]},{id:"Generic_Magic_Armor",type:"magic",name:"Armor",nameEn:"Armor",desc:`+50 护甲值

Tags: 护甲.`,descEn:`+50 Armor

Tags: Armor.`,descCn:`+50 护甲值

Tags: 护甲.`,tags:["护甲."],tierValues:[]},null,null],[null,null,null,null,null,null,{id:"Generic_Magic_DamageToVulnerable",type:"magic",name:"Damage To Vulnerable",nameEn:"Damage To Vulnerable",desc:`+5% 易伤伤害

Tags: 易伤, 伤害.`,descEn:`+5% Vulnerable Damage

Tags: Vulnerable, Damage.`,descCn:`+5% 易伤伤害

Tags: 易伤, 伤害.`,tags:["易伤","伤害."],tierValues:[]},null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Barbarian_Legendary_014",type:"legendary",name:"残杀者",nameEn:"Decimator",nameCn:"残杀者",desc:`你每次对敌人造成易伤时, 你的伤害提高 x10%, 持续 5 秒。压制一名易伤敌人可额外获得 x10% 的伤害加成, 持续 5 秒。

Tags: 易伤, 压制.`,descEn:`Each time you make an enemy Vulnerable, your damage is increased by x10% for 5 seconds. Overpowering a Vulnerable enemy grants an additional x10% bonus for 5 seconds.

Tags: Vulnerable, Overpower.`,descCn:`你每次对敌人造成易伤时, 你的伤害提高 x10%, 持续 5 秒。压制一名易伤敌人可额外获得 x10% 的伤害加成, 持续 5 秒。

Tags: 易伤, 压制.`,tags:["易伤","压制."],tierValues:[]},null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,{id:"Generic_Magic_HPPercent",type:"magic",name:"HP Percent",nameEn:"HP Percent",desc:`+2% 生命

Tags: 生命.`,descEn:`+2% Life

Tags: Life.`,descCn:`+2% 生命

Tags: 生命.`,tags:["生命."],tierValues:[]},null,null,null,null,null,null],[null,null,null,null,null,{id:"Generic_Magic_Damage2HSlashing",type:"magic",name:"Damage 2H Slashing",nameEn:"Damage 2H Slashing",desc:`+5% 使用Two-Handed Slashing 的伤害

Tags: 伤害, 双手, 劈斩.`,descEn:`+5% Damage with Two-Handed Slashing

Tags: Damage, Two-Handed, Slashing.`,descCn:`+5% 使用Two-Handed Slashing 的伤害

Tags: 伤害, 双手, 劈斩.`,tags:["伤害","双手","劈斩."],tierValues:[]},{id:"Barbarian_Rare_030",type:"rare",name:"毁灭者",nameEn:"Destroyer",nameCn:"毁灭者",desc:`+10% 使用Two-Handed Slashing 的伤害
+10% 易伤伤害

Bonus: Another +10% Damage with Two-Handed Slashing if requirements met:
{thresholdRequirements}

Tags: 伤害, 易伤, 劈斩, 双手.`,descEn:`+10% Damage with Two-Handed Slashing
+10% Vulnerable Damage

Bonus: Another +10% Damage with Two-Handed Slashing if requirements met:
{thresholdRequirements}

Tags: Damage, Vulnerable, Slashing, Two-Handed.`,descCn:`+10% 使用Two-Handed Slashing 的伤害
+10% 易伤伤害

Bonus: Another +10% Damage with Two-Handed Slashing if requirements met:
{thresholdRequirements}

Tags: 伤害, 易伤, 劈斩, 双手.`,tags:["伤害","易伤","劈斩","双手."],tierValues:[]},{id:"Generic_Magic_DamageToVulnerable",type:"magic",name:"Damage To Vulnerable",nameEn:"Damage To Vulnerable",desc:`+5% 易伤伤害

Tags: 易伤, 伤害.`,descEn:`+5% Vulnerable Damage

Tags: Vulnerable, Damage.`,descCn:`+5% 易伤伤害

Tags: 易伤, 伤害.`,tags:["易伤","伤害."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Magic_HPPercent",type:"magic",name:"HP Percent",nameEn:"HP Percent",desc:`+2% 生命

Tags: 生命.`,descEn:`+2% Life

Tags: Life.`,descCn:`+2% 生命

Tags: 生命.`,tags:["生命."],tierValues:[]},{id:"Generic_Rare_042",type:"rare",name:"恢复",nameEn:"Restorative",nameCn:"恢复",desc:`4% 药水恢复效果
+4% 生命

Bonus: Another +4% Potion Healing if requirements met:
{thresholdRequirements}

Tags: 治疗, 生命.`,descEn:`+4% Potion Healing
+4% Life

Bonus: Another +4% Potion Healing if requirements met:
{thresholdRequirements}

Tags: Healing, Life.`,descCn:`4% 药水恢复效果
+4% 生命

Bonus: Another +4% Potion Healing if requirements met:
{thresholdRequirements}

Tags: 治疗, 生命.`,tags:["治疗","生命."],tierValues:[]},{id:"Generic_Magic_PotionHealing",type:"magic",name:"Potion Healing",nameEn:"Potion Healing",desc:`2% 药水恢复效果

Tags: 治疗.`,descEn:`+2% Potion Healing

Tags: Healing.`,descCn:`2% 药水恢复效果

Tags: 治疗.`,tags:["治疗."],tierValues:[]},null,null,null,null,null],[null,null,null,null,null,null,{id:"Generic_Magic_Damage2HSlashing",type:"magic",name:"Damage 2H Slashing",nameEn:"Damage 2H Slashing",desc:`+5% 使用Two-Handed Slashing 的伤害

Tags: 伤害, 双手, 劈斩.`,descEn:`+5% Damage with Two-Handed Slashing

Tags: Damage, Two-Handed, Slashing.`,descCn:`+5% 使用Two-Handed Slashing 的伤害

Tags: 伤害, 双手, 劈斩.`,tags:["伤害","双手","劈斩."],tierValues:[]},{id:"Generic_Magic_Damage2HSlashing",type:"magic",name:"Damage 2H Slashing",nameEn:"Damage 2H Slashing",desc:`+5% 使用Two-Handed Slashing 的伤害

Tags: 伤害, 双手, 劈斩.`,descEn:`+5% Damage with Two-Handed Slashing

Tags: Damage, Two-Handed, Slashing.`,descCn:`+5% 使用Two-Handed Slashing 的伤害

Tags: 伤害, 双手, 劈斩.`,tags:["伤害","双手","劈斩."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Magic_PotionHealing",type:"magic",name:"Potion Healing",nameEn:"Potion Healing",desc:`2% 药水恢复效果

Tags: 治疗.`,descEn:`+2% Potion Healing

Tags: Healing.`,descCn:`2% 药水恢复效果

Tags: 治疗.`,tags:["治疗."],tierValues:[]},{id:"Generic_Magic_PotionHealing",type:"magic",name:"Potion Healing",nameEn:"Potion Healing",desc:`2% 药水恢复效果

Tags: 治疗.`,descEn:`+2% Potion Healing

Tags: Healing.`,descCn:`2% 药水恢复效果

Tags: 治疗.`,tags:["治疗."],tierValues:[]},null,null,null,null,null,null],[null,null,null,null,null,null,null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},null,null,null,null,null,null,null],[null,null,null,null,null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,{id:"Generic_Gate",type:"gate",name:"面板连接关口",nameEn:"Board Attachment Gate",nameCn:"面板连接关口",desc:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,descEn:`+5 Strength
+5 Intelligence
+5 Willpower
+5 Dexterity

Tags: Strength, Intelligence, Willpower, Dexterity.`,descCn:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,tags:["力量","智力","意力","敏捷."],tierValues:[]},null,null,null,null,null,null,null,null,null,null]],gates:[{row:0,col:10,id:"Generic_Gate",direction:"bottom"},{row:10,col:0,id:"Generic_Gate",direction:"right"},{row:10,col:20,id:"Generic_Gate",direction:"left"},{row:20,col:10,id:"Generic_Gate",direction:"top"}],startNodes:[],gatePositions:{top:[{row:0,col:10,id:"Generic_Gate",direction:"bottom"}],bottom:[{row:20,col:10,id:"Generic_Gate",direction:"top"}],left:[{row:10,col:0,id:"Generic_Gate",direction:"right"}],right:[{row:10,col:20,id:"Generic_Gate",direction:"left"}]}},{id:"Paragon_Barb_Bone_Breaker",name:"Bone Breaker",rows:21,cols:21,grid:[[null,null,null,null,null,null,null,null,null,null,{id:"Generic_Gate",type:"gate",name:"面板连接关口",nameEn:"Board Attachment Gate",nameCn:"面板连接关口",desc:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,descEn:`+5 Strength
+5 Intelligence
+5 Willpower
+5 Dexterity

Tags: Strength, Intelligence, Willpower, Dexterity.`,descCn:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,tags:["力量","智力","意力","敏捷."],tierValues:[]},null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Barbarian_Legendary_015",type:"legendary",name:"碎骨者",nameEn:"Bone Breaker",nameCn:"碎骨者",desc:`每过 12 秒, 你的下一个技能必定会造成 压制。

Tags: 压制.`,descEn:`Every 12 seconds, your next Skill is guaranteed to Overpower.

Tags: Overpower.`,descCn:`每过 12 秒, 你的下一个技能必定会造成 压制。

Tags: 压制.`,tags:["压制."],tierValues:[]},null,null,null],[null,null,null,null,null,null,null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Magic_DamageReductionWhileFortified",type:"magic",name:"Damage Reduction While Fortified",nameEn:"Damage Reduction While Fortified",desc:`2% 被强固时的伤害减免

Tags: 强固, 伤害减免.`,descEn:`2% Damage Reduction while Fortified

Tags: Fortify, Damage Reduction.`,descCn:`2% 被强固时的伤害减免

Tags: 强固, 伤害减免.`,tags:["强固","伤害减免."],tierValues:[]},{id:"Generic_Magic_BonusFortify",type:"magic",name:"Bonus Fortify",nameEn:"Bonus Fortify",desc:`+3.2% 强固生成量

Tags: 强固.`,descEn:`+3.2% Fortify Generation

Tags: Fortify.`,descCn:`+3.2% 强固生成量

Tags: 强固.`,tags:["强固."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null],[null,null,null,null,null,null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Magic_BonusFortify",type:"magic",name:"Bonus Fortify",nameEn:"Bonus Fortify",desc:`+3.2% 强固生成量

Tags: 强固.`,descEn:`+3.2% Fortify Generation

Tags: Fortify.`,descCn:`+3.2% 强固生成量

Tags: 强固.`,tags:["强固."],tierValues:[]},{id:"Generic_Rare_032",type:"rare",name:"壁垒",nameEn:"Bulwark",nameCn:"壁垒",desc:`4% 被强固时的伤害减免
+6.5% 强固生成量

Bonus: Another 4% Damage Reduction while Fortified if requirements met:
{thresholdRequirements}

Tags: 强固, 伤害减免.`,descEn:`4% Damage Reduction while Fortified
+6.5% Fortify Generation

Bonus: Another 4% Damage Reduction while Fortified if requirements met:
{thresholdRequirements}

Tags: Fortify, Damage Reduction.`,descCn:`4% 被强固时的伤害减免
+6.5% 强固生成量

Bonus: Another 4% Damage Reduction while Fortified if requirements met:
{thresholdRequirements}

Tags: 强固, 伤害减免.`,tags:["强固","伤害减免."],tierValues:[]},{id:"Generic_Magic_DamageReductionWhileFortified",type:"magic",name:"Damage Reduction While Fortified",nameEn:"Damage Reduction While Fortified",desc:`2% 被强固时的伤害减免

Tags: 强固, 伤害减免.`,descEn:`2% Damage Reduction while Fortified

Tags: Fortify, Damage Reduction.`,descCn:`2% 被强固时的伤害减免

Tags: 强固, 伤害减免.`,tags:["强固","伤害减免."],tierValues:[]},null,null,null,null],[null,null,null,null,null,null,null,{id:"Barbarian_Rare_015",type:"rare",name:"坚韧",nameEn:"Tenacity",nameCn:"坚韧",desc:`+4% 生命
+100 护甲值

Bonus: Another +4% Life if requirements met:
{thresholdRequirements}

Tags: 生命, 护甲.`,descEn:`+4% Life
+100 Armor

Bonus: Another +4% Life if requirements met:
{thresholdRequirements}

Tags: Life, Armor.`,descCn:`+4% 生命
+100 护甲值

Bonus: Another +4% Life if requirements met:
{thresholdRequirements}

Tags: 生命, 护甲.`,tags:["生命","护甲."],tierValues:[]},{id:"Generic_Magic_HPPercent",type:"magic",name:"HP Percent",nameEn:"HP Percent",desc:`+2% 生命

Tags: 生命.`,descEn:`+2% Life

Tags: Life.`,descCn:`+2% 生命

Tags: 生命.`,tags:["生命."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,{id:"Generic_Magic_DamageReductionWhileFortified",type:"magic",name:"Damage Reduction While Fortified",nameEn:"Damage Reduction While Fortified",desc:`2% 被强固时的伤害减免

Tags: 强固, 伤害减免.`,descEn:`2% Damage Reduction while Fortified

Tags: Fortify, Damage Reduction.`,descCn:`2% 被强固时的伤害减免

Tags: 强固, 伤害减免.`,tags:["强固","伤害减免."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null],[null,null,null,null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Magic_Armor",type:"magic",name:"Armor",nameEn:"Armor",desc:`+50 护甲值

Tags: 护甲.`,descEn:`+50 Armor

Tags: Armor.`,descCn:`+50 护甲值

Tags: 护甲.`,tags:["护甲."],tierValues:[]},{id:"Generic_Magic_HPPercent",type:"magic",name:"HP Percent",nameEn:"HP Percent",desc:`+2% 生命

Tags: 生命.`,descEn:`+2% Life

Tags: Life.`,descCn:`+2% 生命

Tags: 生命.`,tags:["生命."],tierValues:[]},{id:"Generic_Magic_Armor",type:"magic",name:"Armor",nameEn:"Armor",desc:`+50 护甲值

Tags: 护甲.`,descEn:`+50 Armor

Tags: Armor.`,descCn:`+50 护甲值

Tags: 护甲.`,tags:["护甲."],tierValues:[]},null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null],[null,null,null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Magic_HPPercent",type:"magic",name:"HP Percent",nameEn:"HP Percent",desc:`+2% 生命

Tags: 生命.`,descEn:`+2% Life

Tags: Life.`,descCn:`+2% 生命

Tags: 生命.`,tags:["生命."],tierValues:[]},null,null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null],[null,null,null,null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,{id:"Generic_Magic_DamageWhileFortified",type:"magic",name:"Damage While Fortified",nameEn:"Damage While Fortified",desc:`+5% 被强固时的伤害

Tags: 强固, 伤害.`,descEn:`+5% Damage while Fortified

Tags: Fortify, Damage.`,descCn:`+5% 被强固时的伤害

Tags: 强固, 伤害.`,tags:["强固","伤害."],tierValues:[]},{id:"Generic_Magic_DamageWhileHealthy",type:"magic",name:"Damage While Healthy",nameEn:"Damage While Healthy",desc:`+6.2% 健康时伤害

Tags: 健康, 伤害.`,descEn:`+6.2% Damage while Healthy

Tags: Healthy, Damage.`,descCn:`+6.2% 健康时伤害

Tags: 健康, 伤害.`,tags:["健康","伤害."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null,null,null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null],[{id:"Generic_Gate",type:"gate",name:"面板连接关口",nameEn:"Board Attachment Gate",nameCn:"面板连接关口",desc:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,descEn:`+5 Strength
+5 Intelligence
+5 Willpower
+5 Dexterity

Tags: Strength, Intelligence, Willpower, Dexterity.`,descCn:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,tags:["力量","智力","意力","敏捷."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,{id:"Generic_Magic_DamageWhileHealthy",type:"magic",name:"Damage While Healthy",nameEn:"Damage While Healthy",desc:`+6.2% 健康时伤害

Tags: 健康, 伤害.`,descEn:`+6.2% Damage while Healthy

Tags: Healthy, Damage.`,descCn:`+6.2% 健康时伤害

Tags: 健康, 伤害.`,tags:["健康","伤害."],tierValues:[]},{id:"Generic_Rare_026",type:"rare",name:"内在之力",nameEn:"Inner Strength",nameCn:"内在之力",desc:`+10% 被强固时的伤害
+12.5% 健康时伤害

Bonus: Another +10% Damage while Fortified if requirements met:
{thresholdRequirements}

Tags: 强固, 健康, 伤害.`,descEn:`+10% Damage while Fortified
+12.5% Damage while Healthy

Bonus: Another +10% Damage while Fortified if requirements met:
{thresholdRequirements}

Tags: Fortify, Healthy, Damage.`,descCn:`+10% 被强固时的伤害
+12.5% 健康时伤害

Bonus: Another +10% Damage while Fortified if requirements met:
{thresholdRequirements}

Tags: 强固, 健康, 伤害.`,tags:["强固","健康","伤害."],tierValues:[]},{id:"Generic_Magic_DamageWhileFortified",type:"magic",name:"Damage While Fortified",nameEn:"Damage While Fortified",desc:`+5% 被强固时的伤害

Tags: 强固, 伤害.`,descEn:`+5% Damage while Fortified

Tags: Fortify, Damage.`,descCn:`+5% 被强固时的伤害

Tags: 强固, 伤害.`,tags:["强固","伤害."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Gate",type:"gate",name:"面板连接关口",nameEn:"Board Attachment Gate",nameCn:"面板连接关口",desc:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,descEn:`+5 Strength
+5 Intelligence
+5 Willpower
+5 Dexterity

Tags: Strength, Intelligence, Willpower, Dexterity.`,descCn:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,tags:["力量","智力","意力","敏捷."],tierValues:[]}],[null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Magic_DamageWhileFortified",type:"magic",name:"Damage While Fortified",nameEn:"Damage While Fortified",desc:`+5% 被强固时的伤害

Tags: 强固, 伤害.`,descEn:`+5% Damage while Fortified

Tags: Fortify, Damage.`,descCn:`+5% 被强固时的伤害

Tags: 强固, 伤害.`,tags:["强固","伤害."],tierValues:[]},null,null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null],[null,null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},null,null,null,{id:"Generic_Magic_OverpowerDamage",type:"magic",name:"Overpower Damage",nameEn:"Overpower Damage",desc:`+22.5% 压制伤害

Tags: 压制, 伤害.`,descEn:`+22.5% Overpower Damage

Tags: Overpower, Damage.`,descCn:`+22.5% 压制伤害

Tags: 压制, 伤害.`,tags:["压制","伤害."],tierValues:[]},{id:"Generic_Magic_Damage2HBludgeoning",type:"magic",name:"Damage 2H Bludgeoning",nameEn:"Damage 2H Bludgeoning",desc:`+5% 使用Two-Handed Bludgeoning 的伤害

Tags: 伤害, 钝击, 双手.`,descEn:`+5% Damage with Two-Handed Bludgeoning

Tags: Damage, Bludgeoning, Two-Handed.`,descCn:`+5% 使用Two-Handed Bludgeoning 的伤害

Tags: 伤害, 钝击, 双手.`,tags:["伤害","钝击","双手."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null,null,null],[null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Magic_Damage2HBludgeoning",type:"magic",name:"Damage 2H Bludgeoning",nameEn:"Damage 2H Bludgeoning",desc:`+5% 使用Two-Handed Bludgeoning 的伤害

Tags: 伤害, 钝击, 双手.`,descEn:`+5% Damage with Two-Handed Bludgeoning

Tags: Damage, Bludgeoning, Two-Handed.`,descCn:`+5% 使用Two-Handed Bludgeoning 的伤害

Tags: 伤害, 钝击, 双手.`,tags:["伤害","钝击","双手."],tierValues:[]},{id:"Generic_Magic_Damage2HBludgeoning",type:"magic",name:"Damage 2H Bludgeoning",nameEn:"Damage 2H Bludgeoning",desc:`+5% 使用Two-Handed Bludgeoning 的伤害

Tags: 伤害, 钝击, 双手.`,descEn:`+5% Damage with Two-Handed Bludgeoning

Tags: Damage, Bludgeoning, Two-Handed.`,descCn:`+5% 使用Two-Handed Bludgeoning 的伤害

Tags: 伤害, 钝击, 双手.`,tags:["伤害","钝击","双手."],tierValues:[]},{id:"Barbarian_Rare_008",type:"rare",name:"钝击者",nameEn:"Bludgeoner",nameCn:"钝击者",desc:`+10% 使用Two-Handed Bludgeoning 的伤害
+45% 压制伤害

Bonus: Another +10% Damage with Two-Handed Bludgeoning if requirements met:
{thresholdRequirements}

Tags: 压制, 伤害, 双手, 钝击.`,descEn:`+10% Damage with Two-Handed Bludgeoning
+45% Overpower Damage

Bonus: Another +10% Damage with Two-Handed Bludgeoning if requirements met:
{thresholdRequirements}

Tags: Overpower, Damage, Two-Handed, Bludgeoning.`,descCn:`+10% 使用Two-Handed Bludgeoning 的伤害
+45% 压制伤害

Bonus: Another +10% Damage with Two-Handed Bludgeoning if requirements met:
{thresholdRequirements}

Tags: 压制, 伤害, 双手, 钝击.`,tags:["压制","伤害","双手","钝击."],tierValues:[]},null,null,null,null,null,null],[null,null,{id:"Generic_Magic_OverpowerDamage",type:"magic",name:"Overpower Damage",nameEn:"Overpower Damage",desc:`+22.5% 压制伤害

Tags: 压制, 伤害.`,descEn:`+22.5% Overpower Damage

Tags: Overpower, Damage.`,descCn:`+22.5% 压制伤害

Tags: 压制, 伤害.`,tags:["压制","伤害."],tierValues:[]},{id:"Generic_Magic_OverpowerDamage",type:"magic",name:"Overpower Damage",nameEn:"Overpower Damage",desc:`+22.5% 压制伤害

Tags: 压制, 伤害.`,descEn:`+22.5% Overpower Damage

Tags: Overpower, Damage.`,descCn:`+22.5% 压制伤害

Tags: 压制, 伤害.`,tags:["压制","伤害."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Magic_OverpowerDamage",type:"magic",name:"Overpower Damage",nameEn:"Overpower Damage",desc:`+22.5% 压制伤害

Tags: 压制, 伤害.`,descEn:`+22.5% Overpower Damage

Tags: Overpower, Damage.`,descCn:`+22.5% 压制伤害

Tags: 压制, 伤害.`,tags:["压制","伤害."],tierValues:[]},null,null,null,null,null,null,null],[null,{id:"Generic_Magic_Will",type:"magic",name:"Willpower",nameEn:"Willpower",desc:`+7 点意力

Tags: 意力.`,descEn:`+7 Willpower

Tags: Willpower.`,descCn:`+7 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Rare_072",type:"rare",name:"残忍",nameEn:"Brutality",nameCn:"残忍",desc:`+45% 压制伤害
+10 点力量

Bonus: Another +45% Overpower Damage if requirements met:
{thresholdRequirements}

Tags: 压制, 伤害, 力量.`,descEn:`+45% Overpower Damage
+10 Strength

Bonus: Another +45% Overpower Damage if requirements met:
{thresholdRequirements}

Tags: Overpower, Damage, Strength.`,descCn:`+45% 压制伤害
+10 点力量

Bonus: Another +45% Overpower Damage if requirements met:
{thresholdRequirements}

Tags: 压制, 伤害, 力量.`,tags:["压制","伤害","力量."],tierValues:[]},null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Socket",type:"socket",name:"雕文插槽",nameEn:"Glyph Socket",nameCn:"雕文插槽",tags:[],tierValues:[]},null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null,null,null,null,null,null],[null,null,{id:"Generic_Magic_Will",type:"magic",name:"Willpower",nameEn:"Willpower",desc:`+7 点意力

Tags: 意力.`,descEn:`+7 Willpower

Tags: Willpower.`,descCn:`+7 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Magic_OverpowerDamage",type:"magic",name:"Overpower Damage",nameEn:"Overpower Damage",desc:`+22.5% 压制伤害

Tags: 压制, 伤害.`,descEn:`+22.5% Overpower Damage

Tags: Overpower, Damage.`,descCn:`+22.5% 压制伤害

Tags: 压制, 伤害.`,tags:["压制","伤害."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null,null,null,null,null,null],[null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Magic_DamageReductionWhileHealthy",type:"magic",name:"Damage Reduction While Healthy",nameEn:"Damage Reduction While Healthy",desc:`2.5% 健康状态下的伤害减免

Tags: 健康, 伤害减免.`,descEn:`2.5% Damage Reduction while Healthy

Tags: Healthy, Damage Reduction.`,descCn:`2.5% 健康状态下的伤害减免

Tags: 健康, 伤害减免.`,tags:["健康","伤害减免."],tierValues:[]},null,{id:"Generic_Magic_DamageReductionWhileHealthy",type:"magic",name:"Damage Reduction While Healthy",nameEn:"Damage Reduction While Healthy",desc:`2.5% 健康状态下的伤害减免

Tags: 健康, 伤害减免.`,descEn:`2.5% Damage Reduction while Healthy

Tags: Healthy, Damage Reduction.`,descCn:`2.5% 健康状态下的伤害减免

Tags: 健康, 伤害减免.`,tags:["健康","伤害减免."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null,null,null,null,null,null,null,null],[null,null,null,null,{id:"Generic_Magic_Dex",type:"magic",name:"Dexterity",nameEn:"Dexterity",desc:`+7 点敏捷

Tags: 敏捷.`,descEn:`+7 Dexterity

Tags: Dexterity.`,descCn:`+7 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Barbarian_Rare_009",type:"rare",name:"精力",nameEn:"Vigor",nameCn:"精力",desc:`5% 健康状态下的伤害减免
+10 点力量

Bonus: Another 5% Damage Reduction while Healthy if requirements met:
{thresholdRequirements}

Tags: 健康, 伤害减免, 力量.`,descEn:`5% Damage Reduction while Healthy
+10 Strength

Bonus: Another 5% Damage Reduction while Healthy if requirements met:
{thresholdRequirements}

Tags: Healthy, Damage Reduction, Strength.`,descCn:`5% 健康状态下的伤害减免
+10 点力量

Bonus: Another 5% Damage Reduction while Healthy if requirements met:
{thresholdRequirements}

Tags: 健康, 伤害减免, 力量.`,tags:["健康","伤害减免","力量."],tierValues:[]},{id:"Generic_Magic_DamageReductionWhileHealthy",type:"magic",name:"Damage Reduction While Healthy",nameEn:"Damage Reduction While Healthy",desc:`2.5% 健康状态下的伤害减免

Tags: 健康, 伤害减免.`,descEn:`2.5% Damage Reduction while Healthy

Tags: Healthy, Damage Reduction.`,descCn:`2.5% 健康状态下的伤害减免

Tags: 健康, 伤害减免.`,tags:["健康","伤害减免."],tierValues:[]},null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,{id:"Generic_Magic_Dex",type:"magic",name:"Dexterity",nameEn:"Dexterity",desc:`+7 点敏捷

Tags: 敏捷.`,descEn:`+7 Dexterity

Tags: Dexterity.`,descCn:`+7 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,{id:"Generic_Gate",type:"gate",name:"面板连接关口",nameEn:"Board Attachment Gate",nameCn:"面板连接关口",desc:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,descEn:`+5 Strength
+5 Intelligence
+5 Willpower
+5 Dexterity

Tags: Strength, Intelligence, Willpower, Dexterity.`,descCn:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,tags:["力量","智力","意力","敏捷."],tierValues:[]},null,null,null,null,null,null,null,null,null,null]],gates:[{row:0,col:10,id:"Generic_Gate",direction:"bottom"},{row:10,col:0,id:"Generic_Gate",direction:"right"},{row:10,col:20,id:"Generic_Gate",direction:"left"},{row:20,col:10,id:"Generic_Gate",direction:"top"}],startNodes:[],gatePositions:{top:[{row:0,col:10,id:"Generic_Gate",direction:"bottom"}],bottom:[{row:20,col:10,id:"Generic_Gate",direction:"top"}],left:[{row:10,col:0,id:"Generic_Gate",direction:"right"}],right:[{row:10,col:20,id:"Generic_Gate",direction:"left"}]}},{id:"Paragon_Barb_Flawless_Technique",name:"Flawless Technique",rows:21,cols:21,grid:[[null,null,null,null,null,null,null,null,null,null,{id:"Generic_Gate",type:"gate",name:"面板连接关口",nameEn:"Board Attachment Gate",nameCn:"面板连接关口",desc:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,descEn:`+5 Strength
+5 Intelligence
+5 Willpower
+5 Dexterity

Tags: Strength, Intelligence, Willpower, Dexterity.`,descCn:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,tags:["力量","智力","意力","敏捷."],tierValues:[]},null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null,null,null,null],[null,null,null,null,null,{id:"Generic_Magic_HPPercent",type:"magic",name:"HP Percent",nameEn:"HP Percent",desc:`+2% 生命

Tags: 生命.`,descEn:`+2% Life

Tags: Life.`,descCn:`+2% 生命

Tags: 生命.`,tags:["生命."],tierValues:[]},{id:"Generic_Magic_ResistanceCold",type:"magic",name:"Resistance Cold",nameEn:"Resistance Cold",desc:`+5% Cold 抗性

Tags: 抗性, 冰霜.`,descEn:`+5% Cold Resistance

Tags: Resistance, Cold.`,descCn:`+5% Cold 抗性

Tags: 抗性, 冰霜.`,tags:["抗性","冰霜."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Magic_Damage1H",type:"magic",name:"Damage 1H",nameEn:"Damage 1H",desc:`+5% 使用One-Handed 的伤害

Tags: 伤害, 双持.`,descEn:`+5% Damage with One-Handed

Tags: Damage, Dual Wield.`,descCn:`+5% 使用One-Handed 的伤害

Tags: 伤害, 双持.`,tags:["伤害","双持."],tierValues:[]},{id:"Generic_Magic_AttackSpeed",type:"magic",name:"Attack Speed",nameEn:"Attack Speed",desc:`+1.2% 攻击速度

Tags: 攻击速度.`,descEn:`+1.2% Attack Speed

Tags: Attack Speed.`,descCn:`+1.2% 攻击速度

Tags: 攻击速度.`,tags:["攻击速度."],tierValues:[]},null,null,null,null,null],[null,null,null,null,null,{id:"Generic_Rare_012",type:"rare",name:"寒冷抵御",nameEn:"Cold Resilience",nameCn:"寒冷抵御",desc:`+10% Cold 抗性
+4% 生命

Bonus: Another +10% Cold Resistance if requirements met:
{thresholdRequirements}

Tags: 抗性, 冰霜, 生命.`,descEn:`+10% Cold Resistance
+4% Life

Bonus: Another +10% Cold Resistance if requirements met:
{thresholdRequirements}

Tags: Resistance, Cold, Life.`,descCn:`+10% Cold 抗性
+4% 生命

Bonus: Another +10% Cold Resistance if requirements met:
{thresholdRequirements}

Tags: 抗性, 冰霜, 生命.`,tags:["抗性","冰霜","生命."],tierValues:[]},{id:"Generic_Magic_ResistanceCold",type:"magic",name:"Resistance Cold",nameEn:"Resistance Cold",desc:`+5% Cold 抗性

Tags: 抗性, 冰霜.`,descEn:`+5% Cold Resistance

Tags: Resistance, Cold.`,descCn:`+5% Cold 抗性

Tags: 抗性, 冰霜.`,tags:["抗性","冰霜."],tierValues:[]},null,null,null,null,null,null,null,{id:"Generic_Magic_Damage1H",type:"magic",name:"Damage 1H",nameEn:"Damage 1H",desc:`+5% 使用One-Handed 的伤害

Tags: 伤害, 双持.`,descEn:`+5% Damage with One-Handed

Tags: Damage, Dual Wield.`,descCn:`+5% 使用One-Handed 的伤害

Tags: 伤害, 双持.`,tags:["伤害","双持."],tierValues:[]},{id:"Barbarian_Rare_025",type:"rare",name:"狂野之力",nameEn:"Wild Force",nameCn:"狂野之力",desc:`+10% 使用One-Handed 的伤害
+2.5% 攻击速度

Bonus: Another +10% Damage with One-Handed if requirements met:
{thresholdRequirements}

Tags: 伤害, 攻击速度, 双持.`,descEn:`+10% Damage with One-Handed
+2.5% Attack Speed

Bonus: Another +10% Damage with One-Handed if requirements met:
{thresholdRequirements}

Tags: Damage, Attack Speed, Dual Wield.`,descCn:`+10% 使用One-Handed 的伤害
+2.5% 攻击速度

Bonus: Another +10% Damage with One-Handed if requirements met:
{thresholdRequirements}

Tags: 伤害, 攻击速度, 双持.`,tags:["伤害","攻击速度","双持."],tierValues:[]},null,null,null,null,null],[null,null,null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Magic_HPPercent",type:"magic",name:"HP Percent",nameEn:"HP Percent",desc:`+2% 生命

Tags: 生命.`,descEn:`+2% Life

Tags: Life.`,descCn:`+2% 生命

Tags: 生命.`,tags:["生命."],tierValues:[]},{id:"Generic_Magic_ResistanceCold",type:"magic",name:"Resistance Cold",nameEn:"Resistance Cold",desc:`+5% Cold 抗性

Tags: 抗性, 冰霜.`,descEn:`+5% Cold Resistance

Tags: Resistance, Cold.`,descCn:`+5% Cold 抗性

Tags: 抗性, 冰霜.`,tags:["抗性","冰霜."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null,null,null,null,{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Magic_Damage1H",type:"magic",name:"Damage 1H",nameEn:"Damage 1H",desc:`+5% 使用One-Handed 的伤害

Tags: 伤害, 双持.`,descEn:`+5% Damage with One-Handed

Tags: Damage, Dual Wield.`,descCn:`+5% 使用One-Handed 的伤害

Tags: 伤害, 双持.`,tags:["伤害","双持."],tierValues:[]},{id:"Generic_Magic_AttackSpeed",type:"magic",name:"Attack Speed",nameEn:"Attack Speed",desc:`+1.2% 攻击速度

Tags: 攻击速度.`,descEn:`+1.2% Attack Speed

Tags: Attack Speed.`,descCn:`+1.2% 攻击速度

Tags: 攻击速度.`,tags:["攻击速度."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null,null,null],[null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null,null],[null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null],[null,null,null,{id:"Generic_Magic_DamagePhysical",type:"magic",name:"Damage Physical",nameEn:"Damage Physical",desc:`+5% Physical 伤害

Tags: 物理, 伤害.`,descEn:`+5% Physical Damage

Tags: Physical, Damage.`,descCn:`+5% Physical 伤害

Tags: 物理, 伤害.`,tags:["物理","伤害."],tierValues:[]},{id:"Generic_Magic_CriticalDamage",type:"magic",name:"Critical Damage",nameEn:"Critical Damage",desc:`+7.5% 暴击伤害

Tags: 暴击, 伤害.`,descEn:`+7.5% Critical Strike Damage

Tags: Critical Strikes, Damage.`,descCn:`+7.5% 暴击伤害

Tags: 暴击, 伤害.`,tags:["暴击","伤害."],tierValues:[]},{id:"Generic_Rare_013",type:"rare",name:"浩劫",nameEn:"Havoc",nameCn:"浩劫",desc:`+15% 暴击伤害
+10% Physical 伤害

Bonus: Another +15% Critical Strike Damage if requirements met:
{thresholdRequirements}

Tags: 暴击, 物理, 伤害.`,descEn:`+15% Critical Strike Damage
+10% Physical Damage

Bonus: Another +15% Critical Strike Damage if requirements met:
{thresholdRequirements}

Tags: Critical Strikes, Physical, Damage.`,descCn:`+15% 暴击伤害
+10% Physical 伤害

Bonus: Another +15% Critical Strike Damage if requirements met:
{thresholdRequirements}

Tags: 暴击, 物理, 伤害.`,tags:["暴击","物理","伤害."],tierValues:[]},null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Barbarian_Legendary_016",type:"legendary",name:"无瑕技法",nameEn:"Flawless Technique",nameCn:"无瑕技法",desc:`使用单手武器对敌人造成伤害会使你的暴击几率提高 x1%, 持续 4 秒, 最多提高 x8%。该效果在单次技能施放期间只能触发一次, 在引导旋风斩时每秒可触发两次。

Tags: 暴击, 双持.`,descEn:`Damaging enemies with One-Handed Weapons increases your Critical Strike chance by x1% for 4 seconds, up to x8%. This can only happen once per Skill cast, or twice per second while channeling Whirlwind.

Tags: Critical Strikes, Dual Wield.`,descCn:`使用单手武器对敌人造成伤害会使你的暴击几率提高 x1%, 持续 4 秒, 最多提高 x8%。该效果在单次技能施放期间只能触发一次, 在引导旋风斩时每秒可触发两次。

Tags: 暴击, 双持.`,tags:["暴击","双持."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},null,null,null,{id:"Generic_Rare_067",type:"rare",name:"杀戮者",nameEn:"Slayer",nameCn:"杀戮者",desc:`+100 护甲值
4% 药水恢复效果

Bonus: Another +100 Armor if requirements met:
{thresholdRequirements}

Tags: 治疗, 护甲.`,descEn:`+100 Armor
+4% Potion Healing

Bonus: Another +100 Armor if requirements met:
{thresholdRequirements}

Tags: Healing, Armor.`,descCn:`+100 护甲值
4% 药水恢复效果

Bonus: Another +100 Armor if requirements met:
{thresholdRequirements}

Tags: 治疗, 护甲.`,tags:["治疗","护甲."],tierValues:[]},{id:"Generic_Magic_Armor",type:"magic",name:"Armor",nameEn:"Armor",desc:`+50 护甲值

Tags: 护甲.`,descEn:`+50 Armor

Tags: Armor.`,descCn:`+50 护甲值

Tags: 护甲.`,tags:["护甲."],tierValues:[]},{id:"Generic_Magic_PotionHealing",type:"magic",name:"Potion Healing",nameEn:"Potion Healing",desc:`2% 药水恢复效果

Tags: 治疗.`,descEn:`+2% Potion Healing

Tags: Healing.`,descCn:`2% 药水恢复效果

Tags: 治疗.`,tags:["治疗."],tierValues:[]},null,null,null],[null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Magic_CriticalDamage",type:"magic",name:"Critical Damage",nameEn:"Critical Damage",desc:`+7.5% 暴击伤害

Tags: 暴击, 伤害.`,descEn:`+7.5% Critical Strike Damage

Tags: Critical Strikes, Damage.`,descCn:`+7.5% 暴击伤害

Tags: 暴击, 伤害.`,tags:["暴击","伤害."],tierValues:[]},{id:"Generic_Magic_DamagePhysical",type:"magic",name:"Damage Physical",nameEn:"Damage Physical",desc:`+5% Physical 伤害

Tags: 物理, 伤害.`,descEn:`+5% Physical Damage

Tags: Physical, Damage.`,descCn:`+5% Physical 伤害

Tags: 物理, 伤害.`,tags:["物理","伤害."],tierValues:[]},{id:"Generic_Magic_CriticalDamage",type:"magic",name:"Critical Damage",nameEn:"Critical Damage",desc:`+7.5% 暴击伤害

Tags: 暴击, 伤害.`,descEn:`+7.5% Critical Strike Damage

Tags: Critical Strikes, Damage.`,descCn:`+7.5% 暴击伤害

Tags: 暴击, 伤害.`,tags:["暴击","伤害."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Magic_Armor",type:"magic",name:"Armor",nameEn:"Armor",desc:`+50 护甲值

Tags: 护甲.`,descEn:`+50 Armor

Tags: Armor.`,descCn:`+50 护甲值

Tags: 护甲.`,tags:["护甲."],tierValues:[]},{id:"Generic_Magic_PotionHealing",type:"magic",name:"Potion Healing",nameEn:"Potion Healing",desc:`2% 药水恢复效果

Tags: 治疗.`,descEn:`+2% Potion Healing

Tags: Healing.`,descCn:`2% 药水恢复效果

Tags: 治疗.`,tags:["治疗."],tierValues:[]},{id:"Generic_Magic_Armor",type:"magic",name:"Armor",nameEn:"Armor",desc:`+50 护甲值

Tags: 护甲.`,descEn:`+50 Armor

Tags: Armor.`,descCn:`+50 护甲值

Tags: 护甲.`,tags:["护甲."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null],[null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null],[{id:"Generic_Gate",type:"gate",name:"面板连接关口",nameEn:"Board Attachment Gate",nameCn:"面板连接关口",desc:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,descEn:`+5 Strength
+5 Intelligence
+5 Willpower
+5 Dexterity

Tags: Strength, Intelligence, Willpower, Dexterity.`,descCn:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,tags:["力量","智力","意力","敏捷."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Gate",type:"gate",name:"面板连接关口",nameEn:"Board Attachment Gate",nameCn:"面板连接关口",desc:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,descEn:`+5 Strength
+5 Intelligence
+5 Willpower
+5 Dexterity

Tags: Strength, Intelligence, Willpower, Dexterity.`,descCn:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,tags:["力量","智力","意力","敏捷."],tierValues:[]}],[null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,{id:"Generic_Magic_CriticalDamage1H",type:"magic",name:"Critical Damage 1H",nameEn:"Critical Damage 1H",desc:`+7.5% One-Handed 的暴击伤害

Tags: 暴击, 伤害, 双持.`,descEn:`+7.5% Critical Strike Damage with One-Handed

Tags: Critical Strikes, Damage, Dual Wield.`,descCn:`+7.5% One-Handed 的暴击伤害

Tags: 暴击, 伤害, 双持.`,tags:["暴击","伤害","双持."],tierValues:[]},{id:"Generic_Magic_Dex",type:"magic",name:"Dexterity",nameEn:"Dexterity",desc:`+7 点敏捷

Tags: 敏捷.`,descEn:`+7 Dexterity

Tags: Dexterity.`,descCn:`+7 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Magic_Will",type:"magic",name:"Willpower",nameEn:"Willpower",desc:`+7 点意力

Tags: 意力.`,descEn:`+7 Willpower

Tags: Willpower.`,descCn:`+7 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Magic_DamageReductionFromNear",type:"magic",name:"Damage Reduction From Near",nameEn:"Damage Reduction From Near",desc:`2.2% 来自近距敌人的伤害减免

Tags: 伤害减免.`,descEn:`2.2% Damage Reduction from Close Enemies

Tags: Damage Reduction.`,descCn:`2.2% 来自近距敌人的伤害减免

Tags: 伤害减免.`,tags:["伤害减免."],tierValues:[]},null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null,null],[null,null,null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Magic_CriticalDamage1H",type:"magic",name:"Critical Damage 1H",nameEn:"Critical Damage 1H",desc:`+7.5% One-Handed 的暴击伤害

Tags: 暴击, 伤害, 双持.`,descEn:`+7.5% Critical Strike Damage with One-Handed

Tags: Critical Strikes, Damage, Dual Wield.`,descCn:`+7.5% One-Handed 的暴击伤害

Tags: 暴击, 伤害, 双持.`,tags:["暴击","伤害","双持."],tierValues:[]},{id:"Barbarian_Rare_024",type:"rare",name:"沉重猛击",nameEn:"Heavy Blows",nameCn:"沉重猛击",desc:`+15% One-Handed 的暴击伤害
+10 点力量

Bonus: Another +15% Critical Strike Damage with One-Handed if requirements met:
{thresholdRequirements}

Tags: 暴击, 伤害, 力量, 双持.`,descEn:`+15% Critical Strike Damage with One-Handed
+10 Strength

Bonus: Another +15% Critical Strike Damage with One-Handed if requirements met:
{thresholdRequirements}

Tags: Critical Strikes, Damage, Strength, Dual Wield.`,descCn:`+15% One-Handed 的暴击伤害
+10 点力量

Bonus: Another +15% Critical Strike Damage with One-Handed if requirements met:
{thresholdRequirements}

Tags: 暴击, 伤害, 力量, 双持.`,tags:["暴击","伤害","力量","双持."],tierValues:[]},null,{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Socket",type:"socket",name:"雕文插槽",nameEn:"Glyph Socket",nameCn:"雕文插槽",tags:[],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,{id:"Generic_Rare_059",type:"rare",name:"张狂",nameEn:"Brash",nameCn:"张狂",desc:`4.5% 来自近距敌人的伤害减免
+10 点力量

Bonus: Another 4.5% Damage Reduction from Close Enemies if requirements met:
{thresholdRequirements}

Tags: 伤害减免, 力量.`,descEn:`4.5% Damage Reduction from Close Enemies
+10 Strength

Bonus: Another 4.5% Damage Reduction from Close Enemies if requirements met:
{thresholdRequirements}

Tags: Damage Reduction, Strength.`,descCn:`4.5% 来自近距敌人的伤害减免
+10 点力量

Bonus: Another 4.5% Damage Reduction from Close Enemies if requirements met:
{thresholdRequirements}

Tags: 伤害减免, 力量.`,tags:["伤害减免","力量."],tierValues:[]},{id:"Generic_Magic_DamageReductionFromNear",type:"magic",name:"Damage Reduction From Near",nameEn:"Damage Reduction From Near",desc:`2.2% 来自近距敌人的伤害减免

Tags: 伤害减免.`,descEn:`2.2% Damage Reduction from Close Enemies

Tags: Damage Reduction.`,descCn:`2.2% 来自近距敌人的伤害减免

Tags: 伤害减免.`,tags:["伤害减免."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null,null,null],[null,null,null,null,null,null,null,{id:"Generic_Magic_Dex",type:"magic",name:"Dexterity",nameEn:"Dexterity",desc:`+7 点敏捷

Tags: 敏捷.`,descEn:`+7 Dexterity

Tags: Dexterity.`,descCn:`+7 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Magic_CriticalDamage1H",type:"magic",name:"Critical Damage 1H",nameEn:"Critical Damage 1H",desc:`+7.5% One-Handed 的暴击伤害

Tags: 暴击, 伤害, 双持.`,descEn:`+7.5% Critical Strike Damage with One-Handed

Tags: Critical Strikes, Damage, Dual Wield.`,descCn:`+7.5% One-Handed 的暴击伤害

Tags: 暴击, 伤害, 双持.`,tags:["暴击","伤害","双持."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Magic_DamageReductionFromNear",type:"magic",name:"Damage Reduction From Near",nameEn:"Damage Reduction From Near",desc:`2.2% 来自近距敌人的伤害减免

Tags: 伤害减免.`,descEn:`2.2% Damage Reduction from Close Enemies

Tags: Damage Reduction.`,descCn:`2.2% 来自近距敌人的伤害减免

Tags: 伤害减免.`,tags:["伤害减免."],tierValues:[]},{id:"Generic_Magic_Will",type:"magic",name:"Willpower",nameEn:"Willpower",desc:`+7 点意力

Tags: 意力.`,descEn:`+7 Willpower

Tags: Willpower.`,descCn:`+7 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,{id:"Generic_Gate",type:"gate",name:"面板连接关口",nameEn:"Board Attachment Gate",nameCn:"面板连接关口",desc:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,descEn:`+5 Strength
+5 Intelligence
+5 Willpower
+5 Dexterity

Tags: Strength, Intelligence, Willpower, Dexterity.`,descCn:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,tags:["力量","智力","意力","敏捷."],tierValues:[]},null,null,null,null,null,null,null,null,null,null]],gates:[{row:0,col:10,id:"Generic_Gate",direction:"bottom"},{row:10,col:0,id:"Generic_Gate",direction:"right"},{row:10,col:20,id:"Generic_Gate",direction:"left"},{row:20,col:10,id:"Generic_Gate",direction:"top"}],startNodes:[],gatePositions:{top:[{row:0,col:10,id:"Generic_Gate",direction:"bottom"}],bottom:[{row:20,col:10,id:"Generic_Gate",direction:"top"}],left:[{row:10,col:0,id:"Generic_Gate",direction:"right"}],right:[{row:10,col:20,id:"Generic_Gate",direction:"left"}]}},{id:"Paragon_Barb_Warbringer",name:"Warbringer",rows:21,cols:21,grid:[[null,null,null,null,null,null,null,null,null,null,{id:"Generic_Gate",type:"gate",name:"面板连接关口",nameEn:"Board Attachment Gate",nameCn:"面板连接关口",desc:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,descEn:`+5 Strength
+5 Intelligence
+5 Willpower
+5 Dexterity

Tags: Strength, Intelligence, Willpower, Dexterity.`,descCn:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,tags:["力量","智力","意力","敏捷."],tierValues:[]},null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Magic_ResistanceFire",type:"magic",name:"Resistance Fire",nameEn:"Resistance Fire",desc:`+5% Fire 抗性

Tags: 抗性, 火焰.`,descEn:`+5% Fire Resistance

Tags: Resistance, Fire.`,descCn:`+5% Fire 抗性

Tags: 抗性, 火焰.`,tags:["抗性","火焰."],tierValues:[]},null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,{id:"Generic_Magic_ResistanceFire",type:"magic",name:"Resistance Fire",nameEn:"Resistance Fire",desc:`+5% Fire 抗性

Tags: 抗性, 火焰.`,descEn:`+5% Fire Resistance

Tags: Resistance, Fire.`,descCn:`+5% Fire 抗性

Tags: 抗性, 火焰.`,tags:["抗性","火焰."],tierValues:[]},{id:"Generic_Magic_HPPercent",type:"magic",name:"HP Percent",nameEn:"HP Percent",desc:`+2% 生命

Tags: 生命.`,descEn:`+2% Life

Tags: Life.`,descCn:`+2% 生命

Tags: 生命.`,tags:["生命."],tierValues:[]},null,null,null,null,null,null,null,null],[null,null,null,null,{id:"Barbarian_Magic_FuryOnKill",type:"magic",name:"Fury On Kill",nameEn:"Fury On Kill",desc:`消灭获得1 Fury

Tags: 怒气.`,descEn:`1 Fury On Kill

Tags: Fury.`,descCn:`消灭获得1 Fury

Tags: 怒气.`,tags:["怒气."],tierValues:[]},{id:"Barbarian_Magic_Fury",type:"magic",name:"Fury",nameEn:"Fury",desc:`+4 Fury 上限

Tags: 怒气.`,descEn:`+4 Maximum Fury

Tags: Fury.`,descCn:`+4 Fury 上限

Tags: 怒气.`,tags:["怒气."],tierValues:[]},{id:"Barbarian_Magic_FuryOnKill",type:"magic",name:"Fury On Kill",nameEn:"Fury On Kill",desc:`消灭获得1 Fury

Tags: 怒气.`,descEn:`1 Fury On Kill

Tags: Fury.`,descCn:`消灭获得1 Fury

Tags: 怒气.`,tags:["怒气."],tierValues:[]},{id:"Barbarian_Magic_Fury",type:"magic",name:"Fury",nameEn:"Fury",desc:`+4 Fury 上限

Tags: 怒气.`,descEn:`+4 Maximum Fury

Tags: Fury.`,descCn:`+4 Fury 上限

Tags: 怒气.`,tags:["怒气."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},null,{id:"Generic_Magic_ResistanceFire",type:"magic",name:"Resistance Fire",nameEn:"Resistance Fire",desc:`+5% Fire 抗性

Tags: 抗性, 火焰.`,descEn:`+5% Fire Resistance

Tags: Resistance, Fire.`,descCn:`+5% Fire 抗性

Tags: 抗性, 火焰.`,tags:["抗性","火焰."],tierValues:[]},{id:"Generic_Rare_031",type:"rare",name:"火焰抵御",nameEn:"Fire Resilience",nameCn:"火焰抵御",desc:`+10% Fire 抗性
+4% 生命

Bonus: Another +10% Fire Resistance if requirements met:
{thresholdRequirements}

Tags: 抗性, 火焰, 生命.`,descEn:`+10% Fire Resistance
+4% Life

Bonus: Another +10% Fire Resistance if requirements met:
{thresholdRequirements}

Tags: Resistance, Fire, Life.`,descCn:`+10% Fire 抗性
+4% 生命

Bonus: Another +10% Fire Resistance if requirements met:
{thresholdRequirements}

Tags: 抗性, 火焰, 生命.`,tags:["抗性","火焰","生命."],tierValues:[]},null,null,null,null,null,null,null,null],[null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Barbarian_Magic_Fury",type:"magic",name:"Fury",nameEn:"Fury",desc:`+4 Fury 上限

Tags: 怒气.`,descEn:`+4 Maximum Fury

Tags: Fury.`,descCn:`+4 Fury 上限

Tags: 怒气.`,tags:["怒气."],tierValues:[]},{id:"Barbarian_Rare_020",type:"rare",name:"饥饿怒火",nameEn:"Hungering Fury",nameCn:"饥饿怒火",desc:`+8 Fury 上限
消灭获得2 Fury

Bonus: Another +8 Maximum Fury if requirements met:
{thresholdRequirements}

Tags: 怒气.`,descEn:`+8 Maximum Fury
2 Fury On Kill

Bonus: Another +8 Maximum Fury if requirements met:
{thresholdRequirements}

Tags: Fury.`,descCn:`+8 Fury 上限
消灭获得2 Fury

Bonus: Another +8 Maximum Fury if requirements met:
{thresholdRequirements}

Tags: 怒气.`,tags:["怒气."],tierValues:[]},null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Magic_HPPercent",type:"magic",name:"HP Percent",nameEn:"HP Percent",desc:`+2% 生命

Tags: 生命.`,descEn:`+2% Life

Tags: Life.`,descCn:`+2% 生命

Tags: 生命.`,tags:["生命."],tierValues:[]},null,null,null,null,null,null,null,null,null],[null,null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null,null,null,null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null,null,{id:"Druid_Rare_006",type:"rare",name:"Druid_Rare_006",nameEn:"Druid_Rare_006",nameCn:"Druid_Rare_006",desc:"",descEn:"",descCn:"",tags:[],tierValues:[]},{id:"Generic_Magic_BonusFortify",type:"magic",name:"Bonus Fortify",nameEn:"Bonus Fortify",desc:`+3.2% 强固生成量

Tags: 强固.`,descEn:`+3.2% Fortify Generation

Tags: Fortify.`,descCn:`+3.2% 强固生成量

Tags: 强固.`,tags:["强固."],tierValues:[]},{id:"Generic_Magic_DamageWhileFortified",type:"magic",name:"Damage While Fortified",nameEn:"Damage While Fortified",desc:`+5% 被强固时的伤害

Tags: 强固, 伤害.`,descEn:`+5% Damage while Fortified

Tags: Fortify, Damage.`,descCn:`+5% 被强固时的伤害

Tags: 强固, 伤害.`,tags:["强固","伤害."],tierValues:[]},null,null,null,null],[null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null,null,null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null,{id:"Generic_Magic_BonusFortify",type:"magic",name:"Bonus Fortify",nameEn:"Bonus Fortify",desc:`+3.2% 强固生成量

Tags: 强固.`,descEn:`+3.2% Fortify Generation

Tags: Fortify.`,descCn:`+3.2% 强固生成量

Tags: 强固.`,tags:["强固."],tierValues:[]},{id:"Generic_Magic_DamageWhileFortified",type:"magic",name:"Damage While Fortified",nameEn:"Damage While Fortified",desc:`+5% 被强固时的伤害

Tags: 强固, 伤害.`,descEn:`+5% Damage while Fortified

Tags: Fortify, Damage.`,descCn:`+5% 被强固时的伤害

Tags: 强固, 伤害.`,tags:["强固","伤害."],tierValues:[]},{id:"Generic_Magic_DamageWhileFortified",type:"magic",name:"Damage While Fortified",nameEn:"Damage While Fortified",desc:`+5% 被强固时的伤害

Tags: 强固, 伤害.`,descEn:`+5% Damage while Fortified

Tags: Fortify, Damage.`,descCn:`+5% 被强固时的伤害

Tags: 强固, 伤害.`,tags:["强固","伤害."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null],[{id:"Generic_Gate",type:"gate",name:"面板连接关口",nameEn:"Board Attachment Gate",nameCn:"面板连接关口",desc:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,descEn:`+5 Strength
+5 Intelligence
+5 Willpower
+5 Dexterity

Tags: Strength, Intelligence, Willpower, Dexterity.`,descCn:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,tags:["力量","智力","意力","敏捷."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Gate",type:"gate",name:"面板连接关口",nameEn:"Board Attachment Gate",nameCn:"面板连接关口",desc:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,descEn:`+5 Strength
+5 Intelligence
+5 Willpower
+5 Dexterity

Tags: Strength, Intelligence, Willpower, Dexterity.`,descCn:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,tags:["力量","智力","意力","敏捷."],tierValues:[]}],[null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null],[null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,{id:"Barbarian_Legendary_011",type:"legendary",name:"战争使者",nameEn:"Warbringer",nameCn:"战争使者",desc:`你每消耗 75 点怒气, 强固你 15% 生命上限 。

Tags: 怒气, 强固.`,descEn:`For every 75 Fury you spend, gain 15% of your Maximum Life as Fortify.

Tags: Fury, Fortify.`,descCn:`你每消耗 75 点怒气, 强固你 15% 生命上限 。

Tags: 怒气, 强固.`,tags:["怒气","强固."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null,{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null,null,null],[null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null,null,null,null,null,null,{id:"Barbarian_Magic_Fury",type:"magic",name:"Fury",nameEn:"Fury",desc:`+4 Fury 上限

Tags: 怒气.`,descEn:`+4 Maximum Fury

Tags: Fury.`,descCn:`+4 Fury 上限

Tags: 怒气.`,tags:["怒气."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null,null,null],[null,null,{id:"Generic_Magic_DamagePhysical",type:"magic",name:"Damage Physical",nameEn:"Damage Physical",desc:`+5% Physical 伤害

Tags: 物理, 伤害.`,descEn:`+5% Physical Damage

Tags: Physical, Damage.`,descCn:`+5% Physical 伤害

Tags: 物理, 伤害.`,tags:["物理","伤害."],tierValues:[]},null,{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null,null,null,{id:"Generic_Rare_038",type:"rare",name:"核心储备",nameEn:"Core Reserve",nameCn:"核心储备",desc:`+8 Fury 上限
+4% 生命

Bonus: Another +8 Maximum Fury if requirements met:
{thresholdRequirements}

Tags: 怒气, 生命.`,descEn:`+8 Maximum Fury
+4% Life

Bonus: Another +8 Maximum Fury if requirements met:
{thresholdRequirements}

Tags: Fury, Life.`,descCn:`+8 Fury 上限
+4% 生命

Bonus: Another +8 Maximum Fury if requirements met:
{thresholdRequirements}

Tags: 怒气, 生命.`,tags:["怒气","生命."],tierValues:[]},{id:"Generic_Magic_HPPercent",type:"magic",name:"HP Percent",nameEn:"HP Percent",desc:`+2% 生命

Tags: 生命.`,descEn:`+2% Life

Tags: Life.`,descCn:`+2% 生命

Tags: 生命.`,tags:["生命."],tierValues:[]},null,null,null,null,null,null],[null,{id:"Generic_Magic_Dex",type:"magic",name:"Dexterity",nameEn:"Dexterity",desc:`+7 点敏捷

Tags: 敏捷.`,descEn:`+7 Dexterity

Tags: Dexterity.`,descCn:`+7 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Rare_066",type:"rare",name:"原始力量",nameEn:"Raw Power",nameCn:"原始力量",desc:`+10% Physical 伤害
+10 点力量

Bonus: Another +10% Physical Damage if requirements met:
{thresholdRequirements}

Tags: 物理, 伤害, 力量.`,descEn:`+10% Physical Damage
+10 Strength

Bonus: Another +10% Physical Damage if requirements met:
{thresholdRequirements}

Tags: Physical, Damage, Strength.`,descCn:`+10% Physical 伤害
+10 点力量

Bonus: Another +10% Physical Damage if requirements met:
{thresholdRequirements}

Tags: 物理, 伤害, 力量.`,tags:["物理","伤害","力量."],tierValues:[]},{id:"Generic_Magic_DamagePhysical",type:"magic",name:"Damage Physical",nameEn:"Damage Physical",desc:`+5% Physical 伤害

Tags: 物理, 伤害.`,descEn:`+5% Physical Damage

Tags: Physical, Damage.`,descCn:`+5% Physical 伤害

Tags: 物理, 伤害.`,tags:["物理","伤害."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Socket",type:"socket",name:"雕文插槽",nameEn:"Glyph Socket",nameCn:"雕文插槽",tags:[],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null,{id:"Barbarian_Magic_Fury",type:"magic",name:"Fury",nameEn:"Fury",desc:`+4 Fury 上限

Tags: 怒气.`,descEn:`+4 Maximum Fury

Tags: Fury.`,descCn:`+4 Fury 上限

Tags: 怒气.`,tags:["怒气."],tierValues:[]},{id:"Barbarian_Magic_Fury",type:"magic",name:"Fury",nameEn:"Fury",desc:`+4 Fury 上限

Tags: 怒气.`,descEn:`+4 Maximum Fury

Tags: Fury.`,descCn:`+4 Fury 上限

Tags: 怒气.`,tags:["怒气."],tierValues:[]},null,null,null,null,null,null],[null,null,{id:"Generic_Magic_Dex",type:"magic",name:"Dexterity",nameEn:"Dexterity",desc:`+7 点敏捷

Tags: 敏捷.`,descEn:`+7 Dexterity

Tags: Dexterity.`,descCn:`+7 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Magic_DamagePhysical",type:"magic",name:"Damage Physical",nameEn:"Damage Physical",desc:`+5% Physical 伤害

Tags: 物理, 伤害.`,descEn:`+5% Physical Damage

Tags: Physical, Damage.`,descCn:`+5% Physical 伤害

Tags: 物理, 伤害.`,tags:["物理","伤害."],tierValues:[]},null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Magic_HPPercent",type:"magic",name:"HP Percent",nameEn:"HP Percent",desc:`+2% 生命

Tags: 生命.`,descEn:`+2% Life

Tags: Life.`,descCn:`+2% 生命

Tags: 生命.`,tags:["生命."],tierValues:[]},null,null,null,null,null,null],[null,null,null,null,{id:"Generic_Magic_ResistanceAll",type:"magic",name:"Resistance All",nameEn:"Resistance All",desc:`+1.5% 全元素抗性

Tags: 抗性, 非物理.`,descEn:`+1.5% Resistance to All Elements

Tags: Resistance, Non-Physical.`,descCn:`+1.5% 全元素抗性

Tags: 抗性, 非物理.`,tags:["抗性","非物理."],tierValues:[]},{id:"Generic_Magic_ResistanceAll",type:"magic",name:"Resistance All",nameEn:"Resistance All",desc:`+1.5% 全元素抗性

Tags: 抗性, 非物理.`,descEn:`+1.5% Resistance to All Elements

Tags: Resistance, Non-Physical.`,descCn:`+1.5% 全元素抗性

Tags: 抗性, 非物理.`,tags:["抗性","非物理."],tierValues:[]},null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null,null,null,null,null,null],[null,null,null,null,{id:"Generic_Magic_Will",type:"magic",name:"Willpower",nameEn:"Willpower",desc:`+7 点意力

Tags: 意力.`,descEn:`+7 Willpower

Tags: Willpower.`,descCn:`+7 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Barbarian_Rare_018",type:"rare",name:"适应环境",nameEn:"Conditioned",nameCn:"适应环境",desc:`+3% 全元素抗性
+10 点力量

Bonus: Another +3% Resistance to All Elements if requirements met:
{thresholdRequirements}

Tags: 抗性, 力量, 非物理.`,descEn:`+3% Resistance to All Elements
+10 Strength

Bonus: Another +3% Resistance to All Elements if requirements met:
{thresholdRequirements}

Tags: Resistance, Strength, Non-Physical.`,descCn:`+3% 全元素抗性
+10 点力量

Bonus: Another +3% Resistance to All Elements if requirements met:
{thresholdRequirements}

Tags: 抗性, 力量, 非物理.`,tags:["抗性","力量","非物理."],tierValues:[]},{id:"Generic_Magic_ResistanceAll",type:"magic",name:"Resistance All",nameEn:"Resistance All",desc:`+1.5% 全元素抗性

Tags: 抗性, 非物理.`,descEn:`+1.5% Resistance to All Elements

Tags: Resistance, Non-Physical.`,descCn:`+1.5% 全元素抗性

Tags: 抗性, 非物理.`,tags:["抗性","非物理."],tierValues:[]},null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,{id:"Generic_Magic_Will",type:"magic",name:"Willpower",nameEn:"Willpower",desc:`+7 点意力

Tags: 意力.`,descEn:`+7 Willpower

Tags: Willpower.`,descCn:`+7 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,{id:"Generic_Gate",type:"gate",name:"面板连接关口",nameEn:"Board Attachment Gate",nameCn:"面板连接关口",desc:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,descEn:`+5 Strength
+5 Intelligence
+5 Willpower
+5 Dexterity

Tags: Strength, Intelligence, Willpower, Dexterity.`,descCn:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,tags:["力量","智力","意力","敏捷."],tierValues:[]},null,null,null,null,null,null,null,null,null,null]],gates:[{row:0,col:10,id:"Generic_Gate",direction:"bottom"},{row:10,col:0,id:"Generic_Gate",direction:"right"},{row:10,col:20,id:"Generic_Gate",direction:"left"},{row:20,col:10,id:"Generic_Gate",direction:"top"}],startNodes:[],gatePositions:{top:[{row:0,col:10,id:"Generic_Gate",direction:"bottom"}],bottom:[{row:20,col:10,id:"Generic_Gate",direction:"top"}],left:[{row:10,col:0,id:"Generic_Gate",direction:"right"}],right:[{row:10,col:20,id:"Generic_Gate",direction:"left"}]}},{id:"Paragon_Barb_Weapons_Master",name:"Weapons Master",rows:21,cols:21,grid:[[null,null,null,null,null,null,null,null,null,null,{id:"Generic_Gate",type:"gate",name:"面板连接关口",nameEn:"Board Attachment Gate",nameCn:"面板连接关口",desc:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,descEn:`+5 Strength
+5 Intelligence
+5 Willpower
+5 Dexterity

Tags: Strength, Intelligence, Willpower, Dexterity.`,descCn:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,tags:["力量","智力","意力","敏捷."],tierValues:[]},null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null,null,null,null,null,null,null],[null,null,null,null,{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Magic_DamagePhysical",type:"magic",name:"Damage Physical",nameEn:"Damage Physical",desc:`+5% Physical 伤害

Tags: 物理, 伤害.`,descEn:`+5% Physical Damage

Tags: Physical, Damage.`,descCn:`+5% Physical 伤害

Tags: 物理, 伤害.`,tags:["物理","伤害."],tierValues:[]},null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null,null,null,null,null,null,null,null],[null,null,null,null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Magic_Dex",type:"magic",name:"Dexterity",nameEn:"Dexterity",desc:`+7 点敏捷

Tags: 敏捷.`,descEn:`+7 Dexterity

Tags: Dexterity.`,descCn:`+7 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Rare_066",type:"rare",name:"原始力量",nameEn:"Raw Power",nameCn:"原始力量",desc:`+10% Physical 伤害
+10 点力量

Bonus: Another +10% Physical Damage if requirements met:
{thresholdRequirements}

Tags: 物理, 伤害, 力量.`,descEn:`+10% Physical Damage
+10 Strength

Bonus: Another +10% Physical Damage if requirements met:
{thresholdRequirements}

Tags: Physical, Damage, Strength.`,descCn:`+10% Physical 伤害
+10 点力量

Bonus: Another +10% Physical Damage if requirements met:
{thresholdRequirements}

Tags: 物理, 伤害, 力量.`,tags:["物理","伤害","力量."],tierValues:[]},null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},null,null,null,null,null,null,null,null,null],[null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Magic_DamagePhysical",type:"magic",name:"Damage Physical",nameEn:"Damage Physical",desc:`+5% Physical 伤害

Tags: 物理, 伤害.`,descEn:`+5% Physical Damage

Tags: Physical, Damage.`,descCn:`+5% Physical 伤害

Tags: 物理, 伤害.`,tags:["物理","伤害."],tierValues:[]},{id:"Generic_Magic_DamagePhysical",type:"magic",name:"Damage Physical",nameEn:"Damage Physical",desc:`+5% Physical 伤害

Tags: 物理, 伤害.`,descEn:`+5% Physical Damage

Tags: Physical, Damage.`,descCn:`+5% Physical 伤害

Tags: 物理, 伤害.`,tags:["物理","伤害."],tierValues:[]},{id:"Generic_Magic_Dex",type:"magic",name:"Dexterity",nameEn:"Dexterity",desc:`+7 点敏捷

Tags: 敏捷.`,descEn:`+7 Dexterity

Tags: Dexterity.`,descCn:`+7 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null,null,null,null,null,null,null,null],[null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Socket",type:"socket",name:"雕文插槽",nameEn:"Glyph Socket",nameCn:"雕文插槽",tags:[],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null,null,null,null,null,null,null],[null,{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Magic_Armor",type:"magic",name:"Armor",nameEn:"Armor",desc:`+50 护甲值

Tags: 护甲.`,descEn:`+50 Armor

Tags: Armor.`,descCn:`+50 护甲值

Tags: 护甲.`,tags:["护甲."],tierValues:[]},{id:"Generic_Magic_Will",type:"magic",name:"Willpower",nameEn:"Willpower",desc:`+7 点意力

Tags: 意力.`,descEn:`+7 Willpower

Tags: Willpower.`,descCn:`+7 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Magic_Armor",type:"magic",name:"Armor",nameEn:"Armor",desc:`+50 护甲值

Tags: 护甲.`,descEn:`+50 Armor

Tags: Armor.`,descCn:`+50 护甲值

Tags: 护甲.`,tags:["护甲."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},null,null,{id:"Generic_Magic_DamageToElite",type:"magic",name:"Damage To Elite",nameEn:"Damage To Elite",desc:`+8% 对精英的伤害

Tags: 精英怪物, 伤害.`,descEn:`+8% Damage to Elites

Tags: Elite Monsters, Damage.`,descCn:`+8% 对精英的伤害

Tags: 精英怪物, 伤害.`,tags:["精英怪物","伤害."],tierValues:[]},null,null,null,null,null,null,null,null],[null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,{id:"Barbarian_Rare_001",type:"rare",name:"钢铁力量",nameEn:"Iron Strength",nameCn:"钢铁力量",desc:`+100 护甲值
+10 点力量

Bonus: Another +100 Armor if requirements met:
{thresholdRequirements}

Tags: 护甲, 力量.`,descEn:`+100 Armor
+10 Strength

Bonus: Another +100 Armor if requirements met:
{thresholdRequirements}

Tags: Armor, Strength.`,descCn:`+100 护甲值
+10 点力量

Bonus: Another +100 Armor if requirements met:
{thresholdRequirements}

Tags: 护甲, 力量.`,tags:["护甲","力量."],tierValues:[]},{id:"Generic_Magic_Armor",type:"magic",name:"Armor",nameEn:"Armor",desc:`+50 护甲值

Tags: 护甲.`,descEn:`+50 Armor

Tags: Armor.`,descCn:`+50 护甲值

Tags: 护甲.`,tags:["护甲."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Generic_Rare_022",type:"rare",name:"屠猎者",nameEn:"Hunter Killer",nameCn:"屠猎者",desc:`+16% 对精英的伤害
+14% 在消灭一个精英怪后的移动速度,持续 {#} 秒

Bonus: Another +16% Damage to Elites if requirements met:
{thresholdRequirements}

Tags: 精英怪物, 伤害, 移动.`,descEn:`+16% Damage to Elites
+14% Movement Speed for {#} Seconds After Killing an Elite

Bonus: Another +16% Damage to Elites if requirements met:
{thresholdRequirements}

Tags: Elite Monsters, Damage, Movement.`,descCn:`+16% 对精英的伤害
+14% 在消灭一个精英怪后的移动速度,持续 {#} 秒

Bonus: Another +16% Damage to Elites if requirements met:
{thresholdRequirements}

Tags: 精英怪物, 伤害, 移动.`,tags:["精英怪物","伤害","移动."],tierValues:[]},{id:"Generic_Magic_MoveSpeedEliteKill",type:"magic",name:"Move Speed Elite Kill",nameEn:"Move Speed Elite Kill",desc:`+7% 在消灭一个精英怪后的移动速度,持续 {#} 秒

Tags: 移动, 精英怪物.`,descEn:`+7% Movement Speed for {#} Seconds After Killing an Elite

Tags: Movement, Elite Monsters.`,descCn:`+7% 在消灭一个精英怪后的移动速度,持续 {#} 秒

Tags: 移动, 精英怪物.`,tags:["移动","精英怪物."],tierValues:[]},null,null,null,null,null,null,null,null],[null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,{id:"Generic_Magic_Will",type:"magic",name:"Willpower",nameEn:"Willpower",desc:`+7 点意力

Tags: 意力.`,descEn:`+7 Willpower

Tags: Willpower.`,descCn:`+7 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Generic_Magic_DamageToElite",type:"magic",name:"Damage To Elite",nameEn:"Damage To Elite",desc:`+8% 对精英的伤害

Tags: 精英怪物, 伤害.`,descEn:`+8% Damage to Elites

Tags: Elite Monsters, Damage.`,descCn:`+8% 对精英的伤害

Tags: 精英怪物, 伤害.`,tags:["精英怪物","伤害."],tierValues:[]},{id:"Generic_Magic_DamageToElite",type:"magic",name:"Damage To Elite",nameEn:"Damage To Elite",desc:`+8% 对精英的伤害

Tags: 精英怪物, 伤害.`,descEn:`+8% Damage to Elites

Tags: Elite Monsters, Damage.`,descCn:`+8% 对精英的伤害

Tags: 精英怪物, 伤害.`,tags:["精英怪物","伤害."],tierValues:[]},{id:"Generic_Magic_MoveSpeedEliteKill",type:"magic",name:"Move Speed Elite Kill",nameEn:"Move Speed Elite Kill",desc:`+7% 在消灭一个精英怪后的移动速度,持续 {#} 秒

Tags: 移动, 精英怪物.`,descEn:`+7% Movement Speed for {#} Seconds After Killing an Elite

Tags: Movement, Elite Monsters.`,descCn:`+7% 在消灭一个精英怪后的移动速度,持续 {#} 秒

Tags: 移动, 精英怪物.`,tags:["移动","精英怪物."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null],[null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null,null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null],[{id:"Generic_Gate",type:"gate",name:"面板连接关口",nameEn:"Board Attachment Gate",nameCn:"面板连接关口",desc:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,descEn:`+5 Strength
+5 Intelligence
+5 Willpower
+5 Dexterity

Tags: Strength, Intelligence, Willpower, Dexterity.`,descCn:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,tags:["力量","智力","意力","敏捷."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null,null,{id:"Generic_Magic_ResistanceAll",type:"magic",name:"Resistance All",nameEn:"Resistance All",desc:`+1.5% 全元素抗性

Tags: 抗性, 非物理.`,descEn:`+1.5% Resistance to All Elements

Tags: Resistance, Non-Physical.`,descCn:`+1.5% 全元素抗性

Tags: 抗性, 非物理.`,tags:["抗性","非物理."],tierValues:[]},null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Gate",type:"gate",name:"面板连接关口",nameEn:"Board Attachment Gate",nameCn:"面板连接关口",desc:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,descEn:`+5 Strength
+5 Intelligence
+5 Willpower
+5 Dexterity

Tags: Strength, Intelligence, Willpower, Dexterity.`,descCn:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,tags:["力量","智力","意力","敏捷."],tierValues:[]}],[null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,{id:"Generic_Rare_060",type:"rare",name:"暴徒",nameEn:"Brute",nameCn:"暴徒",desc:`+10% Physical 伤害
+2.5% 攻击速度

Bonus: Another +10% Physical Damage if requirements met:
{thresholdRequirements}

Tags: 物理, 伤害, 攻击速度.`,descEn:`+10% Physical Damage
+2.5% Attack Speed

Bonus: Another +10% Physical Damage if requirements met:
{thresholdRequirements}

Tags: Physical, Damage, Attack Speed.`,descCn:`+10% Physical 伤害
+2.5% 攻击速度

Bonus: Another +10% Physical Damage if requirements met:
{thresholdRequirements}

Tags: 物理, 伤害, 攻击速度.`,tags:["物理","伤害","攻击速度."],tierValues:[]},{id:"Generic_Magic_DamagePhysical",type:"magic",name:"Damage Physical",nameEn:"Damage Physical",desc:`+5% Physical 伤害

Tags: 物理, 伤害.`,descEn:`+5% Physical Damage

Tags: Physical, Damage.`,descCn:`+5% Physical 伤害

Tags: 物理, 伤害.`,tags:["物理","伤害."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,{id:"Sorcerer_Rare_034",type:"rare",name:"Sorcerer_Rare_034",nameEn:"Sorcerer_Rare_034",nameCn:"Sorcerer_Rare_034",desc:"",descEn:"",descCn:"",tags:[],tierValues:[]},{id:"Generic_Magic_Armor",type:"magic",name:"Armor",nameEn:"Armor",desc:`+50 护甲值

Tags: 护甲.`,descEn:`+50 Armor

Tags: Armor.`,descCn:`+50 护甲值

Tags: 护甲.`,tags:["护甲."],tierValues:[]},null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null],[null,null,null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Magic_DamagePhysical",type:"magic",name:"Damage Physical",nameEn:"Damage Physical",desc:`+5% Physical 伤害

Tags: 物理, 伤害.`,descEn:`+5% Physical Damage

Tags: Physical, Damage.`,descCn:`+5% Physical 伤害

Tags: 物理, 伤害.`,tags:["物理","伤害."],tierValues:[]},{id:"Generic_Magic_AttackSpeed",type:"magic",name:"Attack Speed",nameEn:"Attack Speed",desc:`+1.2% 攻击速度

Tags: 攻击速度.`,descEn:`+1.2% Attack Speed

Tags: Attack Speed.`,descCn:`+1.2% 攻击速度

Tags: 攻击速度.`,tags:["攻击速度."],tierValues:[]},{id:"Generic_Magic_DamagePhysical",type:"magic",name:"Damage Physical",nameEn:"Damage Physical",desc:`+5% Physical 伤害

Tags: 物理, 伤害.`,descEn:`+5% Physical Damage

Tags: Physical, Damage.`,descCn:`+5% Physical 伤害

Tags: 物理, 伤害.`,tags:["物理","伤害."],tierValues:[]},null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Magic_Armor",type:"magic",name:"Armor",nameEn:"Armor",desc:`+50 护甲值

Tags: 护甲.`,descEn:`+50 Armor

Tags: Armor.`,descCn:`+50 护甲值

Tags: 护甲.`,tags:["护甲."],tierValues:[]},{id:"Generic_Magic_ResistanceAll",type:"magic",name:"Resistance All",nameEn:"Resistance All",desc:`+1.5% 全元素抗性

Tags: 抗性, 非物理.`,descEn:`+1.5% Resistance to All Elements

Tags: Resistance, Non-Physical.`,descCn:`+1.5% 全元素抗性

Tags: 抗性, 非物理.`,tags:["抗性","非物理."],tierValues:[]},{id:"Generic_Magic_ResistanceAll",type:"magic",name:"Resistance All",nameEn:"Resistance All",desc:`+1.5% 全元素抗性

Tags: 抗性, 非物理.`,descEn:`+1.5% Resistance to All Elements

Tags: Resistance, Non-Physical.`,descCn:`+1.5% 全元素抗性

Tags: 抗性, 非物理.`,tags:["抗性","非物理."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null],[null,null,null,null,null,null,null,null,{id:"Generic_Magic_AttackSpeed",type:"magic",name:"Attack Speed",nameEn:"Attack Speed",desc:`+1.2% 攻击速度

Tags: 攻击速度.`,descEn:`+1.2% Attack Speed

Tags: Attack Speed.`,descCn:`+1.2% 攻击速度

Tags: 攻击速度.`,tags:["攻击速度."],tierValues:[]},null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null,null,null],[null,null,null,null,null,null,null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,{id:"Generic_Magic_Armor",type:"magic",name:"Armor",nameEn:"Armor",desc:`+50 护甲值

Tags: 护甲.`,descEn:`+50 Armor

Tags: Armor.`,descCn:`+50 护甲值

Tags: 护甲.`,tags:["护甲."],tierValues:[]},null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},null,null,null,null],[null,null,null,null,null,null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Barbarian_Rare_021",type:"rare",name:"适应闪电",nameEn:"Lightning Conditioned",nameCn:"适应闪电",desc:`+10% Lightning 抗性
+100 护甲值

Bonus: Another +10% Lightning Resistance if requirements met:
{thresholdRequirements}

Tags: 抗性, 闪电, 护甲.`,descEn:`+10% Lightning Resistance
+100 Armor

Bonus: Another +10% Lightning Resistance if requirements met:
{thresholdRequirements}

Tags: Resistance, Lightning, Armor.`,descCn:`+10% Lightning 抗性
+100 护甲值

Bonus: Another +10% Lightning Resistance if requirements met:
{thresholdRequirements}

Tags: 抗性, 闪电, 护甲.`,tags:["抗性","闪电","护甲."],tierValues:[]},{id:"Generic_Magic_ResistanceLightning",type:"magic",name:"Resistance Lightning",nameEn:"Resistance Lightning",desc:`+5% Lightning 抗性

Tags: 闪电, 抗性.`,descEn:`+5% Lightning Resistance

Tags: Lightning, Resistance.`,descCn:`+5% Lightning 抗性

Tags: 闪电, 抗性.`,tags:["闪电","抗性."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},null,null,null],[null,null,null,null,null,null,null,null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Magic_ResistanceLightning",type:"magic",name:"Resistance Lightning",nameEn:"Resistance Lightning",desc:`+5% Lightning 抗性

Tags: 闪电, 抗性.`,descEn:`+5% Lightning Resistance

Tags: Lightning, Resistance.`,descCn:`+5% Lightning 抗性

Tags: 闪电, 抗性.`,tags:["闪电","抗性."],tierValues:[]},{id:"Generic_Magic_Armor",type:"magic",name:"Armor",nameEn:"Armor",desc:`+50 护甲值

Tags: 护甲.`,descEn:`+50 Armor

Tags: Armor.`,descCn:`+50 护甲值

Tags: 护甲.`,tags:["护甲."],tierValues:[]},{id:"Generic_Magic_ResistanceLightning",type:"magic",name:"Resistance Lightning",nameEn:"Resistance Lightning",desc:`+5% Lightning 抗性

Tags: 闪电, 抗性.`,descEn:`+5% Lightning Resistance

Tags: Lightning, Resistance.`,descCn:`+5% Lightning 抗性

Tags: 闪电, 抗性.`,tags:["闪电","抗性."],tierValues:[]},null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,null],[null,null,null,null,null,null,null,null,{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},{id:"Barbarian_Legendary_017",type:"legendary",name:"武器大师",nameEn:"Weapons Master",nameCn:"武器大师",desc:`切换武器可获得怒气上限 4% 的怒气。

Tags: 怒气.`,descEn:`Swapping weapons grants you 4% of your Maximum Fury.

Tags: Fury.`,descCn:`切换武器可获得怒气上限 4% 的怒气。

Tags: 怒气.`,tags:["怒气."],tierValues:[]},null,null,null],[null,null,null,null,null,null,null,null,{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

Tags: 力量.`,descEn:`+5 Strength

Tags: Strength.`,descCn:`+5 点力量

Tags: 力量.`,tags:["力量."],tierValues:[]},{id:"Generic_Normal_Will",type:"normal",name:"Willpower",nameEn:"Willpower",desc:`+5 点意力

Tags: 意力.`,descEn:`+5 Willpower

Tags: Willpower.`,descCn:`+5 点意力

Tags: 意力.`,tags:["意力."],tierValues:[]},{id:"Generic_Normal_Int",type:"normal",name:"Intelligence",nameEn:"Intelligence",desc:`+5 点智力

Tags: 智力.`,descEn:`+5 Intelligence

Tags: Intelligence.`,descCn:`+5 点智力

Tags: 智力.`,tags:["智力."],tierValues:[]},{id:"Generic_Normal_Dex",type:"normal",name:"Dexterity",nameEn:"Dexterity",desc:`+5 点敏捷

Tags: 敏捷.`,descEn:`+5 Dexterity

Tags: Dexterity.`,descCn:`+5 点敏捷

Tags: 敏捷.`,tags:["敏捷."],tierValues:[]},null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,{id:"Generic_Gate",type:"gate",name:"面板连接关口",nameEn:"Board Attachment Gate",nameCn:"面板连接关口",desc:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,descEn:`+5 Strength
+5 Intelligence
+5 Willpower
+5 Dexterity

Tags: Strength, Intelligence, Willpower, Dexterity.`,descCn:`+5 点力量
+5 点智力
+5 点意力
+5 点敏捷

Tags: 力量, 智力, 意力, 敏捷.`,tags:["力量","智力","意力","敏捷."],tierValues:[]},null,null,null,null,null,null,null,null,null,null]],gates:[{row:0,col:10,id:"Generic_Gate",direction:"bottom"},{row:10,col:0,id:"Generic_Gate",direction:"right"},{row:10,col:20,id:"Generic_Gate",direction:"left"},{row:20,col:10,id:"Generic_Gate",direction:"top"}],startNodes:[],gatePositions:{top:[{row:0,col:10,id:"Generic_Gate",direction:"bottom"}],bottom:[{row:20,col:10,id:"Generic_Gate",direction:"top"}],left:[{row:10,col:0,id:"Generic_Gate",direction:"right"}],right:[{row:10,col:20,id:"Generic_Gate",direction:"left"}]}}],mm=[{id:"ParagonGlyph_011",name:"吸收者",nameEn:"Imbiber",nameCn:"吸收者",threshold:"25 Willpower",thresholdCn:"25 Willpower",bonus:"你的药水治疗效果提高 +30%。",bonusEn:"You gain +30% increased Potion Healing.",bonusCn:"你的药水治疗效果提高 +30%。",descTemplate:"For every 5 Willpower purchased within range, you deal +{TIER}% increased damage while Healthy.",tiers:[2.65,3.018,3.385,3.752,4.12,4.487,4.855,5.223,5.59,5.957,6.325,6.692,7.06,7.428,7.795,8.162,8.53,8.897,9.265,9.633,10],tags:[],levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},{id:"ParagonGlyph_014",name:"领地",nameEn:"Territorial",nameCn:"领地",threshold:"25 Dexterity",thresholdCn:"25 Dexterity",bonus:"你从近距敌人处受到的伤害降低 10%。",bonusEn:"You gain 10% Damage Reduction against Close enemies.",bonusCn:"你从近距敌人处受到的伤害降低 10%。",descTemplate:"For every 5 Dexterity purchased within range, you deal +{TIER}% increased damage to Close targets.",tiers:[2,2.4,2.8,3.2,3.6,4,4.4,4.8,5.2,5.6,6,6.4,6.8,7.2,7.6,8,8.4,8.8,9.2,9.6,10],tags:[],levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},{id:"ParagonGlyph_016",name:"利用",nameEn:"Exploit",nameCn:"利用",threshold:"25 Dexterity",thresholdCn:"25 Dexterity",bonus:"一名敌人受到你造成的伤害时会受到易伤效果, 持续 3 秒。该效果对每个敌人每 20 秒只能触发一次。",bonusEn:"When an enemy is damaged by you, they become Vulnerable for 3 seconds. This cannot happen more than once every 20 seconds per enemy.",bonusCn:"一名敌人受到你造成的伤害时会受到易伤效果, 持续 3 秒。该效果对每个敌人每 20 秒只能触发一次。",descTemplate:"For every 5 Dexterity purchased within range, you deal +{TIER}% increased damage to Vulnerable targets.",tiers:[2,2.3,2.6,2.9,3.2,3.5,3.8,4.1,4.4,4.7,5,5.3,5.6,5.9,6.2,6.5,6.8,7.1,7.4,7.7,8],tags:[],levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},{id:"ParagonGlyph_021",name:"灵巧",nameEn:"Ambidextrous",nameCn:"灵巧",threshold:"40 Strength",thresholdCn:"40 Strength",bonus:"装备单手武器时, 你造成的伤害提高 x8%。",bonusEn:"You deal x8% increased damage while wielding One-Handed weapons.",bonusCn:"装备单手武器时, 你造成的伤害提高 x8%。",descTemplate:"Grants +{TIER}% bonus to all Magic nodes within range.",tiers:[25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100,105,110,115,120,125],tags:[],levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},{id:"ParagonGlyph_022",name:"勇力",nameEn:"Might",nameCn:"勇力",threshold:"40 Strength",thresholdCn:"40 Strength",bonus:"装备双手武器时, 你造成的伤害提高 x8%。",bonusEn:"You deal x8% increased damage while wielding Two-Handed weapons.",bonusCn:"装备双手武器时, 你造成的伤害提高 x8%。",descTemplate:"Grants +{TIER}% bonus to all Magic nodes within range.",tiers:[25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100,105,110,115,120,125],tags:[],levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},{id:"ParagonGlyph_023",name:"削砍",nameEn:"Cleaver",nameCn:"削砍",threshold:"40 Strength",thresholdCn:"40 Strength",bonus:"装备斧类武器时, 你造成的暴击伤害提高 x12%。",bonusEn:"While wielding an Axe, you deal x12% increased Critical Strike Damage.",bonusCn:"装备斧类武器时, 你造成的暴击伤害提高 x12%。",descTemplate:"For every 5 Strength purchased within range, you deal +{TIER}% increased damage while wielding an Axe.",tiers:[1.333,1.533,1.733,1.933,2.133,2.333,2.533,2.733,2.933,3.133,3.333,3.533,3.733,3.933,4.133,4.333,4.533,4.733,4.933,5.133,5.333],tags:[],levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},{id:"ParagonGlyph_024",name:"恼怒",nameEn:"Seething",nameCn:"恼怒",threshold:"40 Strength",thresholdCn:"40 Strength",bonus:"装备剑类武器时, 消灭一名敌人可获得 3 点怒气。",bonusEn:"While wielding a Sword, you gain 3 Fury when you kill an enemy.",bonusCn:"装备剑类武器时, 消灭一名敌人可获得 3 点怒气。",descTemplate:"For every 5 Strength purchased within range, you deal +{TIER}% increased damage while wielding a Sword.",tiers:[1.333,1.533,1.733,1.933,2.133,2.333,2.533,2.733,2.933,3.133,3.333,3.533,3.733,3.933,4.133,4.333,4.533,4.733,4.933,5.133,5.333],tags:[],levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},{id:"ParagonGlyph_025",name:"碾压者",nameEn:"Crusher",nameCn:"碾压者",threshold:"40 Strength",thresholdCn:"40 Strength",bonus:"装备锤类武器时, 你造成的压制伤害提高 x30%。",bonusEn:"While wielding a Mace, you deal x30% increased Overpower damage.",bonusCn:"装备锤类武器时, 你造成的压制伤害提高 x30%。",descTemplate:"For every 5 Strength purchased within range, you deal +{TIER}% increased damage while wielding a Mace.",tiers:[1.333,1.533,1.733,1.933,2.133,2.333,2.533,2.733,2.933,3.133,3.333,3.533,3.733,3.933,4.133,4.333,4.533,4.733,4.933,5.133,5.333],tags:[],levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},{id:"ParagonGlyph_026",name:"处决者",nameEn:"Executioner",nameCn:"处决者",threshold:"40 Strength",thresholdCn:"40 Strength",bonus:"装备长柄武器时,你造成的伤害提高 x10%。",bonusEn:"While wielding a Polearm, you deal x10% increased damage.",bonusCn:"装备长柄武器时,你造成的伤害提高 x10%。",descTemplate:"For every 5 Strength purchased within range, you deal +{TIER}% increased damage while wielding a Polearm.",tiers:[1.333,1.533,1.733,1.933,2.133,2.333,2.533,2.733,2.933,3.133,3.333,3.533,3.733,3.933,4.133,4.333,4.533,4.733,4.933,5.133,5.333],tags:[],levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},{id:"ParagonGlyph_027",name:"怒火",nameEn:"Ire",nameCn:"怒火",threshold:"40 Strength",thresholdCn:"40 Strength",bonus:"处于狂暴状态时, 你受到精英怪的伤害降低 10%。",bonusEn:"While Berserking, you take 10% reduced damage from Elites.",bonusCn:"处于狂暴状态时, 你受到精英怪的伤害降低 10%。",descTemplate:"For every 5 Strength purchased within range, you deal +{TIER}% increased damage while Berserking.",tiers:[1.333,1.533,1.733,1.933,2.133,2.333,2.533,2.733,2.933,3.133,3.333,3.533,3.733,3.933,4.133,4.333,4.533,4.733,4.933,5.133,5.333],tags:[],levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},{id:"ParagonGlyph_028",name:"统帅",nameEn:"Marshal",nameCn:"统帅",threshold:"40 Strength",thresholdCn:"40 Strength",bonus:"施放一个战吼技能后, 所有其他非战吼技能的剩余冷却时间缩短 4 秒。",bonusEn:"After casting a Shout Skill, the active Cooldown of every other Non-Shout Skill is reduced by 4 seconds.",bonusCn:"施放一个战吼技能后, 所有其他非战吼技能的剩余冷却时间缩短 4 秒。",descTemplate:"Grants +{TIER}% bonus to all Magic nodes within range.",tiers:[25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100,105,110,115,120,125],tags:[],levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},{id:"ParagonGlyph_029",name:"鲜血喂食者",nameEn:"Bloodfeeder",nameCn:"鲜血喂食者",threshold:"25 Dexterity",thresholdCn:"25 Dexterity",bonus:"你对流血敌人造成暴击的几率提高 5%。",bonusEn:"You have 5% increased Critical Strike Chance against Bleeding enemies.",bonusCn:"你对流血敌人造成暴击的几率提高 5%。",descTemplate:"For every 5 Dexterity purchased within range, you deal +{TIER}% increased damage to Bleeding targets.",tiers:[2,2.3,2.6,2.9,3.2,3.5,3.8,4.1,4.4,4.7,5,5.3,5.6,5.9,6.2,6.5,6.8,7.1,7.4,7.7,8],tags:[],levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},{id:"ParagonGlyph_030",name:"愤怒",nameEn:"Wrath",nameCn:"愤怒",threshold:"25 Dexterity",thresholdCn:"25 Dexterity",bonus:"技能暴击时产生 3 点怒气。",bonusEn:"Skills that Critically Strike generate 3 Fury.",bonusCn:"技能暴击时产生 3 点怒气。",descTemplate:"For every 5 Dexterity purchased within range, you deal +{TIER}% increased Critical Strike Damage.",tiers:[3,3.6,4.2,4.8,5.4,6,6.6,7.2,7.8,8.4,9,9.6,10.2,10.8,11.4,12,12.6,13.2,13.8,14.4,15],tags:[],levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},{id:"ParagonGlyph_031",name:"武器大师",nameEn:"Weapon Master",nameCn:"武器大师",threshold:"25 Dexterity",thresholdCn:"25 Dexterity",bonus:"武器精通技能命中时, 随机使另一个武器精通技能的冷却时间缩短 2 秒。",bonusEn:"Hitting with a Weapon Mastery Skill reduces the active Cooldown of another random Weapon Mastery Skill by 2 seconds.",bonusCn:"武器精通技能命中时, 随机使另一个武器精通技能的冷却时间缩短 2 秒。",descTemplate:"Paragon nodes within range gain +{TIER}% bonus to their Physical damage and damage reduction modifiers.",tiers:[11,13.2,15.4,17.6,19.8,22,24.2,26.4,28.6,30.8,33,35.2,37.4,39.6,41.8,44,46.2,48.4,50.6,52.8,55],tags:[],levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},{id:"ParagonGlyph_032",name:"致命吸引",nameEn:"Mortal Draw",nameCn:"致命吸引",threshold:"25 Dexterity",thresholdCn:"25 Dexterity",bonus:"切换武器有 18% 几率使下一个技能暴击。",bonusEn:"Swapping weapons has a 18% chance to cause the Skill's damage to Critically Strike.",bonusCn:"切换武器有 18% 几率使下一个技能暴击。",descTemplate:"For every 5 Dexterity purchased within range, Skills that Swap to a different weapon deal +{TIER}% increased damage.",tiers:[2.68,3.381,4.082,4.783,5.484,6.185,6.886,7.587,8.288,8.989,9.69,10.391,11.092,11.793,12.494,13.195,13.896,14.597,15.298,15.999,16.7],tags:[],levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},{id:"ParagonGlyph_033",name:"复仇",nameEn:"Revenge",nameCn:"复仇",threshold:"25 Willpower",thresholdCn:"25 Willpower",bonus:"对敌人造成荆棘伤害会使你对其造成的所有伤害提高 x1%, 最多提高 x8%, 持续 10 秒。",bonusEn:"Dealing Thorns damage to an enemy increases all damage it takes from you by x1%, up to x8%, for 10 seconds.",bonusCn:"对敌人造成荆棘伤害会使你对其造成的所有伤害提高 x1%, 最多提高 x8%, 持续 10 秒。",descTemplate:"Grants +{TIER}% bonus to all Rare nodes within range.",tiers:[20,24,28,32,36,40,44,48,52,56,60,64,68,72,76,80,84,88,92,96,100],tags:[],levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},{id:"ParagonGlyph_034",name:"无惧",nameEn:"Undaunted",nameCn:"无惧",threshold:"25 Willpower",thresholdCn:"25 Willpower",bonus:"你拥有的强固值越多, 你获得的伤害减免最多可达 10%。",bonusEn:"You gain up to 10% Damage Reduction the more Fortify you have.",bonusCn:"你拥有的强固值越多, 你获得的伤害减免最多可达 10%。",descTemplate:"For every 5 Willpower purchased within range, you deal +{TIER}% increased damage while Fortified.",tiers:[2,2.3,2.6,2.9,3.2,3.5,3.8,4.1,4.4,4.7,5,5.3,5.6,5.9,6.2,6.5,6.8,7.1,7.4,7.7,8],tags:[],levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},{id:"ParagonGlyph_035_Barb",name:"支配",nameEn:"Dominate",nameCn:"支配",threshold:"25 Willpower",thresholdCn:"25 Willpower",bonus:"30 秒内未造成压制后, 你的下一次攻击造成压制。",bonusEn:"After not Overpowering for 30 seconds, your next attack will Overpower.",bonusCn:"30 秒内未造成压制后, 你的下一次攻击造成压制。",descTemplate:"For every 5 Willpower purchased within range, you deal +{TIER}% increased Overpower damage.",tiers:[8,9.6,11.2,12.8,14.4,16,17.6,19.2,20.8,22.4,24,25.6,27.2,28.8,30.4,32,33.6,35.2,36.8,38.4,40],tags:[],levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},{id:"ParagonGlyph_036",name:"开膛破肚",nameEn:"Disembowel",nameCn:"开膛破肚",threshold:"25 Willpower",thresholdCn:"25 Willpower",bonus:"消灭流血的敌人有 10% 几率使你的非终极技能的剩余冷却时间缩短 1 秒。",bonusEn:"Killing a Bleeding enemy has a 10% chance to reduce the Cooldowns of your Non-Ultimate active Cooldowns by 1 second.",bonusCn:"消灭流血的敌人有 10% 几率使你的非终极技能的剩余冷却时间缩短 1 秒。",descTemplate:"For every 5 Willpower purchased within range, you deal +{TIER}% increased Bleeding damage.",tiers:[2,2.3,2.6,2.9,3.2,3.5,3.8,4.1,4.4,4.7,5,5.3,5.6,5.9,6.2,6.5,6.8,7.1,7.4,7.7,8],tags:[],levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},{id:"ParagonGlyph_037",name:"搏斗",nameEn:"Brawl",nameCn:"搏斗",threshold:"25 Willpower",thresholdCn:"25 Willpower",bonus:"搏斗技能造成的伤害提高 x18%。",bonusEn:"Brawling Skills deal x18% increased damage.",bonusCn:"搏斗技能造成的伤害提高 x18%。",descTemplate:"Paragon nodes within range gain +{TIER}% bonus to their Physical damage and damage reduction modifiers.",tiers:[11,13.2,15.4,17.6,19.8,22,24.2,26.4,28.6,30.8,33,35.2,37.4,39.6,41.8,44,46.2,48.4,50.6,52.8,55],tags:[],levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},{id:"ParagonGlyph_080",name:"旋风",nameEn:"Twister",nameCn:"旋风",threshold:"40 Strength",thresholdCn:"40 Strength",bonus:"生成一个尘魔后, 你造成的伤害提高 x13%, 持续 4 秒。",bonusEn:"You deal x13% increased damage for 4 seconds after creating a Dust Devil.",bonusCn:"生成一个尘魔后, 你造成的伤害提高 x13%, 持续 4 秒。",descTemplate:"For every 5 Strength purchased within range, your Dust Devils deal +{TIER}% increased damage.",tiers:[13.333,14.667,16,17.333,18.667,20,21.333,22.667,24,25.333,26.667,28,29.333,30.667,32,33.333,34.667,36,37.333,38.667,40],tags:[],levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},{id:"ParagonGlyph_081",name:"轰鸣",nameEn:"Rumble",nameCn:"轰鸣",threshold:"40 Strength",thresholdCn:"40 Strength",bonus:"每激活一次撼地重击时, 对首领和被群控敌人造成的伤害提高 x10%。",bonusEn:"You deal x10% increased damage to Bosses and Crowd Controlled enemies for each active Earthquake.",bonusCn:"每激活一次撼地重击时, 对首领和被群控敌人造成的伤害提高 x10%。",descTemplate:"For every 5 Strength purchased within range, your Earthquakes deal +{TIER}% increased damage.",tiers:[13.333,14.667,16,17.333,18.667,20,21.333,22.667,24,25.333,26.667,28,29.333,30.667,32,33.333,34.667,36,37.333,38.667,40],tags:[],levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]}],pm={boards:dm,glyphs:mm},wt=[["V","E","F","G","H","I","U"],["W","D","J","K","L","M","T"],["X","C","7","8","9","N","S"],["Y","B","4","5","6","O","R"],["Z","A","1","2","3","P","Q"]],Tm=(e,n,t,l,a)=>{const r=a*Math.PI/180,s=Math.cos(r),o=Math.sin(r),i=s*(t-e)-o*(l-n)+e,c=o*(t-e)+s*(l-n)+n;return[i,c]},hm=e=>{for(let n=0;n<wt.length;n++){const t=wt[n].indexOf(e);if(t>=0)return[n,t]}return null},ym=(e,n,t,l)=>{const a=hm(e);if(!a)return null;const[r,s]=a,[o,i]=Tm(10,10,t,n,l);if(o===0){if(s>0)return wt[r][s-1]}else if(o===20){if(s<6)return wt[r][s+1]}else if(i===0){if(r>0)return wt[r-1][s]}else if(r<4)return wt[r+1][s];return null},Em=[["V","E","F","G","H","I","U"],["W","D","J","K","L","M","T"],["X","C","7","8","9","N","S"],["Y","B","4","5","6","O","R"],["Z","A","1","2","3","P","Q"]];function fm(){const e=pm,[n,t]=F.useState("zhCN"),[l,a]=F.useState("Barbarian"),[r]=F.useState(220),[s,o]=F.useState(new Map),[i,c]=F.useState([{boardIndex:0,boardId:"Paragon_Barb_Start",gridLocation:"5",rotation:0,equipIndex:1,equippedGlyph:null}]),[h,p]=F.useState(0),[T,f]=F.useState(null),[S,x]=F.useState(.3),[z,u]=F.useState({x:-100,y:1940});F.useEffect(()=>{const y=i[h];if(!y)return;const[W,G]=vt[y.gridLocation]||[0,0],R=21*me,w=21*me,L=W+R/2,U=G+w/2,le=.3;u({x:-L*le,y:-U*le}),x(le)},[h,i]);const[g,d]=F.useState(null),[E,N]=F.useState(""),[v,P]=F.useState("all"),[I,ee]=F.useState(!0),[C,O]=F.useState("select"),V=F.useMemo(()=>{let y=0;return s.forEach(W=>{y+=W.points}),y},[s]),A=F.useMemo(()=>{const y={Strength:0,Intelligence:0,Willpower:0,Dexterity:0},W=V;return y.Strength=Math.floor(W*.5),y.Dexterity=Math.floor(W*.2),y.Intelligence=Math.floor(W*.15),y.Willpower=Math.floor(W*.15),s.forEach((G,R)=>{var _e;const[w,L,U]=R.split("_"),le=e.boards.find(X=>X.id===w),ye=(_e=le==null?void 0:le.grid[parseInt(L)])==null?void 0:_e[parseInt(U)];if(ye){const X=ye.id.match(/Generic_Normal_(Str|Int|Will|Dex)/);if(X){const ce=X[1],de={Str:"Strength",Int:"Intelligence",Will:"Willpower",Dex:"Dexterity"}[ce];de&&(y[de]+=5)}}}),y},[V,s,e.boards]),$=F.useMemo(()=>{const y=new Set,W=new Set;if(s.forEach((G,R)=>{W.add(R),y.add(R)}),W.size===0){const G=i.find(R=>R.gridLocation==="5");if(G){const R=e.boards.find(w=>w.id===G.boardId);R&&R.startNodes&&R.startNodes.forEach(w=>{const L=`${R.id}_${w.row}_${w.col}`;y.add(L)})}return y}return s.forEach(G=>{var ye,_e;const R=e.boards.find(X=>X.id===G.boardId);if(!R)return;const{row:w,col:L}=G,U=(ye=R.grid[w])==null?void 0:ye[L];if((U==null?void 0:U.type)==="gate"){const X=i.find(ce=>{var Z,de;return ce.gridLocation==="5"?!1:((Z=ce.entryGate)==null?void 0:Z.row)===G.row&&((de=ce.entryGate)==null?void 0:de.col)===G.col});if(X&&X.entryGate){const ce=`${X.boardId}_${X.entryGate.row}_${X.entryGate.col}`;y.add(ce)}}const le=[{row:w-1,col:L},{row:w+1,col:L},{row:w,col:L-1},{row:w,col:L+1}];for(const X of le){if(X.row<0||X.row>=R.rows||X.col<0||X.col>=R.cols||!((_e=R.grid[X.row])==null?void 0:_e[X.col]))continue;const Z=`${G.boardId}_${X.row}_${X.col}`;!W.has(Z)&&!y.has(Z)&&y.add(Z)}}),y},[s,e.boards,i]),Q=F.useMemo(()=>{const y=[];for(let W=0;W<i.length;W++)for(let G=W+1;G<i.length;G++){const R=i[W],w=i[G],[L,U]=vt[R.gridLocation]||[0,0],[le,ye]=vt[w.gridLocation]||[0,0],_e=Math.abs(le-L),X=Math.abs(ye-U);(_e===840&&X===0||_e===0&&X===840)&&y.push({from:W,to:G,fromGate:_e>0?le>L?"right":"left":ye>U?"bottom":"top",toGate:_e>0?le>L?"left":"right":ye>U?"top":"bottom"})}return y},[i]),K=F.useCallback((y,W,G,R)=>{var X,ce;const w=`${y}_${W}_${G}`,L=s.has(w),U=$.has(w),le=V<r;let ye=1;if(R.type==="rare"?ye=5:R.type==="legendary"&&(ye=1),R.type==="gate"){const Z=i.find(yn=>yn.boardId===y);if(!Z)return;if(((X=Z.entryGate)==null?void 0:X.row)===W&&((ce=Z.entryGate)==null?void 0:ce.col)===G)L||o(yn=>{const ln=new Map(yn);return ln.set(w,{nodeId:R.id||"Generic_Gate",boardId:y,row:W,col:G,points:0}),ln});else if(!L){const yn=i.findIndex(vl=>vl.boardId===y);let ln;G===0?ln="left":G===20?ln="right":W===0?ln="top":ln="bottom",f({boardIndex:yn,gateDirection:ln,gateRow:W,gateCol:G})}return}if(L){o(Z=>{const de=new Map(Z);return de.delete(w),de});return}const _e=R.type==="start";if((U||_e)&&le){if(R.type==="legendary"){let Z=!1;if(s.forEach(de=>{var ln,vl;const yn=(vl=(ln=e.boards.find(Vc=>Vc.id===de.boardId))==null?void 0:ln.grid[de.row])==null?void 0:vl[de.col];(yn==null?void 0:yn.type)==="legendary"&&(Z=!0)}),Z&&R.type==="legendary")return}o(Z=>{const de=new Map(Z);return de.set(w,{nodeId:R.id,boardId:y,row:W,col:G,points:ye}),de})}},[s,$,V,r,e.boards,i]),ne=F.useCallback(y=>{c(W=>{const G=[...W],w=(G[y].rotation-90+360)%360;return G[y]={...G[y],rotation:w},G})},[]),D=F.useCallback(y=>{c(W=>{const G=[...W],w=(G[y].rotation+90)%360;return G[y]={...G[y],rotation:w},G})},[]),B=F.useCallback((y,W)=>{if(i.some((R,w)=>w!==y&&R.gridLocation===W)){const R=i.findIndex((w,L)=>L!==y&&w.gridLocation===W);R!==-1&&c(w=>{const L=[...w],U=L[y].gridLocation;return L[y]={...L[y],gridLocation:W},L[R]={...L[R],gridLocation:U},L})}else c(R=>{const w=[...R];return w[y]={...w[y],gridLocation:W},w})},[i]),M=F.useCallback((y,W)=>{c(G=>{const R=[...G];return R[y]={...R[y],boardId:W},R})},[]),q=F.useCallback(y=>{if(!T)return;const{boardIndex:W,gateDirection:G,gateRow:R,gateCol:w}=T,L=i[W];if(!L)return;const U=ym(L.gridLocation,R,w,L.rotation);if(!U){f(null);return}let le;const ye=e.boards.find(ce=>ce.id===y);if(ye&&ye.gatePositions){const Z={top:"bottom",bottom:"top",left:"right",right:"left"}[G],de=ye.gatePositions[Z];de&&de.length>0&&(le={row:de[0].row,col:de[0].col})}const _e=i.findIndex(ce=>ce.gridLocation===U);if(_e!==-1)c(ce=>{const Z=[...ce];return Z[_e]={...Z[_e],boardId:y,equippedGlyph:null,entryGate:le},Z});else{const ce={boardIndex:i.length,boardId:y,gridLocation:U,rotation:0,equipIndex:i.length+1,equippedGlyph:null,entryGate:le};c(Z=>[...Z,ce])}f(null);const X=`${L.boardId}_${R}_${w}`;o(ce=>{const Z=new Map(ce);return Z.set(X,{nodeId:"Generic_Gate",boardId:L.boardId,row:R,col:w,points:1}),Z})},[T,i]),H=F.useCallback((y,W)=>{W<1||W>9||c(G=>{const R=[...G];return R[y]={...R[y],equipIndex:W},R})},[]),te=F.useCallback((y,W,G)=>{c(R=>{const w=[...R];return w[y]={...w[y],equippedGlyph:{glyphId:W,rank:G}},w})},[]),We=F.useCallback(y=>{c(W=>{const G=[...W];return G[y]={...G[y],equippedGlyph:null},G})},[]),ke=y=>n==="zhCN"&&y.nameCn?y.nameCn:y.nameEn||y.name||y.id,he=y=>n==="zhCN"&&y.descCn?y.descCn:y.descEn||y.desc||"",Pe=y=>n==="zhCN"&&y.nameCn?y.nameCn:y.name||y.nameEn||y.id,je=F.useMemo(()=>{const y=[];return i.forEach(W=>{var R;const G=e.boards.find(w=>w.id===W.boardId);if(G)for(let w=0;w<G.rows;w++)for(let L=0;L<G.cols;L++){const U=(R=G.grid[w])==null?void 0:R[L];if(U&&!(v!=="all"&&U.type!==v)){if(E){const le=E.toLowerCase(),ye=ke(U).toLowerCase(),_e=he(U).toLowerCase();if(!ye.includes(le)&&!_e.includes(le)&&!U.id.toLowerCase().includes(le))continue}y.push({node:U,boardId:W.boardId,row:w,col:L})}}}),y},[e.boards,i,v,E,n]),gt=F.useCallback(()=>{o(new Map)},[]),Ae=F.useMemo(()=>{const y=i[h];return y!=null&&y.equippedGlyph?e.glyphs.find(W=>{var G;return W.id===((G=y.equippedGlyph)==null?void 0:G.glyphId)}):null},[h,i,e.glyphs]);return m.jsxs("div",{className:"app",children:[m.jsxs("header",{className:"header",children:[m.jsx("h1",{children:"暗黑破坏神4 巅峰盘模拟器"}),m.jsxs("div",{className:"header-controls",children:[m.jsxs("select",{value:l,onChange:y=>a(y.target.value),className:"class-select",children:[m.jsx("option",{value:"Barbarian",children:"野蛮人"}),m.jsx("option",{value:"Druid",children:"德鲁伊"}),m.jsx("option",{value:"Necromancer",children:"死灵法师"}),m.jsx("option",{value:"Rogue",children:"游侠"}),m.jsx("option",{value:"Sorcerer",children:"法师"})]}),m.jsx("button",{className:`lang-btn ${n==="zhCN"?"active":""}`,onClick:()=>t("zhCN"),children:"中文"}),m.jsx("button",{className:`lang-btn ${n==="enUS"?"active":""}`,onClick:()=>t("enUS"),children:"English"})]})]}),m.jsxs("div",{className:"main-container",children:[m.jsxs("div",{className:"left-panel",children:[m.jsxs("div",{className:"panel-section",children:[m.jsx("h3",{children:"操作模式"}),m.jsxs("div",{className:"mode-buttons",children:[m.jsx("button",{className:`mode-btn ${C==="select"?"active":""}`,onClick:()=>O("select"),children:"选择"}),m.jsx("button",{className:`mode-btn ${C==="move"?"active":""}`,onClick:()=>O("move"),children:"移动"}),m.jsx("button",{className:`mode-btn ${C==="rotate"?"active":""}`,onClick:()=>O("rotate"),children:"旋转"})]})]}),m.jsxs("div",{className:"panel-section",children:[m.jsxs("h3",{children:["已连接的巅峰盘 (",i.length,"/5)"]}),m.jsx("div",{className:"board-list",children:i.map((y,W)=>{var R;const G=e.boards.find(w=>w.id===y.boardId);return m.jsxs("div",{className:`board-item ${h===W?"active":""}`,onClick:()=>{p(W)},children:[m.jsxs("div",{className:"board-header",children:[m.jsx("span",{className:"board-name",children:(G==null?void 0:G.name)||y.boardId}),m.jsxs("span",{className:"board-location",children:["位置: ",y.gridLocation]})]}),m.jsx("div",{className:"board-controls",children:m.jsxs("div",{className:"rotation-controls",children:[m.jsx("button",{className:"rot-btn",onClick:w=>{w.stopPropagation(),ne(W)},title:"逆时针旋转",children:"↺"}),m.jsxs("span",{className:"rotation-value",children:[y.rotation,"°"]}),m.jsx("button",{className:"rot-btn",onClick:w=>{w.stopPropagation(),D(W)},title:"顺时针旋转",children:"↻"})]})}),m.jsx("div",{className:"board-change",children:m.jsx("select",{value:y.boardId,onChange:w=>{M(W,w.target.value)},className:"board-select",children:e.boards.map(w=>m.jsx("option",{value:w.id,children:w.name||w.id},w.id))})}),m.jsxs("div",{className:"equip-index",children:[m.jsx("label",{children:"装备索引:"}),m.jsx("input",{type:"number",min:"1",max:"9",value:y.equipIndex,onChange:w=>H(W,parseInt(w.target.value)),className:"equip-index-input"})]}),m.jsxs("div",{className:"grid-position",children:[m.jsx("label",{children:"网格位置:"}),m.jsxs("select",{value:y.gridLocation,onChange:w=>B(W,w.target.value),className:"grid-select",children:[m.jsx("option",{value:"",children:"选择位置"}),sm.map(w=>m.jsx("option",{value:w,children:w},w))]})]}),m.jsxs("div",{className:"glyph-socket",children:[m.jsx("label",{children:"雕文:"}),m.jsxs("select",{value:((R=y.equippedGlyph)==null?void 0:R.glyphId)||"",onChange:w=>{w.target.value?te(W,w.target.value,1):We(W)},className:"glyph-select",children:[m.jsx("option",{value:"",children:"选择雕文"}),e.glyphs.map(w=>m.jsx("option",{value:w.id,children:Pe(w)},w.id))]}),y.equippedGlyph&&m.jsxs("div",{className:"glyph-rank",children:[m.jsx("label",{children:"等级:"}),m.jsx("input",{type:"range",min:"1",max:"21",value:y.equippedGlyph.rank,onChange:w=>{te(W,y.equippedGlyph.glyphId,parseInt(w.target.value))},className:"glyph-rank-slider"}),m.jsx("span",{children:y.equippedGlyph.rank})]})]})]},W)})})]}),m.jsxs("div",{className:"panel-section",children:[m.jsx("h3",{children:"属性统计"}),m.jsxs("div",{className:"stats-panel",children:[m.jsxs("div",{className:"stat-item",children:[m.jsx("span",{className:"stat-label",children:"剩余点数"}),m.jsx("span",{className:"stat-value",children:r-V})]}),m.jsxs("div",{className:"stat-item",children:[m.jsx("span",{className:"stat-label",children:"已用点数"}),m.jsx("span",{className:"stat-value",children:V})]}),m.jsxs("div",{className:"stat-item",children:[m.jsx("span",{className:"stat-label",children:"Strength"}),m.jsx("span",{className:"stat-value",children:A.Strength})]}),m.jsxs("div",{className:"stat-item",children:[m.jsx("span",{className:"stat-label",children:"Intelligence"}),m.jsx("span",{className:"stat-value",children:A.Intelligence})]}),m.jsxs("div",{className:"stat-item",children:[m.jsx("span",{className:"stat-label",children:"Willpower"}),m.jsx("span",{className:"stat-value",children:A.Willpower})]}),m.jsxs("div",{className:"stat-item",children:[m.jsx("span",{className:"stat-label",children:"Dexterity"}),m.jsx("span",{className:"stat-value",children:A.Dexterity})]})]})]}),m.jsxs("div",{className:"panel-section",children:[m.jsx("h3",{children:"连接状态"}),m.jsx("div",{className:"connections-panel",children:Q.length>0?Q.map((y,W)=>m.jsxs("div",{className:"connection-item",children:[m.jsx("span",{children:i[y.from].boardId.split("_").pop()}),m.jsx("span",{className:"connection-arrow",children:"↔"}),m.jsx("span",{children:i[y.to].boardId.split("_").pop()})]},W)):m.jsx("span",{className:"no-connections",children:"暂无连接"})})]}),m.jsx("button",{className:"reset-btn",onClick:gt,children:"重置模拟器"}),m.jsx("button",{className:`toggle-panel-btn ${I?"active":""}`,onClick:()=>ee(!I),children:I?"隐藏右侧面板":"显示右侧面板"})]}),m.jsxs("div",{className:`center-panel ${I?"":"full-width"}`,children:[m.jsx("div",{className:"grid-overlay",children:Em.map((y,W)=>m.jsx("div",{className:"grid-row",children:y.map(G=>{var w,L;const R=i.some(U=>U.gridLocation===G);return m.jsx("button",{className:`grid-cell ${R?"occupied":""} ${((w=i.find(U=>U.gridLocation===G))==null?void 0:w.boardId)===((L=i[h])==null?void 0:L.boardId)?"selected":""}`,onClick:()=>{const U=i.find(le=>le.gridLocation===G);U&&p(U.boardIndex)},children:G},G)})},W))}),m.jsx(um,{boards:e.boards,connectedBoards:i,allocations:s,reachableNodes:$,hoveredNode:g,onNodeHover:d,onNodeClick:K,zoom:S,pan:z,onZoomChange:x,onPanChange:u})]}),T&&m.jsx("div",{className:"modal-overlay",onClick:()=>f(null),children:m.jsxs("div",{className:"modal-content gate-select-modal",onClick:y=>y.stopPropagation(),children:[m.jsx("h3",{children:"选择连接的巅峰盘"}),m.jsx("div",{className:"board-grid",children:e.boards.filter(y=>!y.id.includes("Start")).map(y=>m.jsx("button",{className:"board-select-btn",onClick:()=>q(y.id),children:y.name},y.id))}),m.jsx("button",{className:"cancel-btn",onClick:()=>f(null),children:"取消"})]})}),I&&m.jsxs("div",{className:"right-panel",children:[m.jsxs("div",{className:"panel-section",children:[m.jsx("input",{type:"text",placeholder:"搜索节点...",value:E,onChange:y=>N(y.target.value),className:"search-input"}),m.jsxs("div",{className:"filter-buttons",children:[m.jsx("button",{className:`filter-btn ${v==="all"?"active":""}`,onClick:()=>P("all"),children:"全部"}),m.jsx("button",{className:`filter-btn ${v==="normal"?"active":""}`,onClick:()=>P("normal"),children:"普通"}),m.jsx("button",{className:`filter-btn ${v==="magic"?"active":""}`,onClick:()=>P("magic"),children:"魔法"}),m.jsx("button",{className:`filter-btn ${v==="rare"?"active":""}`,onClick:()=>P("rare"),children:"稀有"}),m.jsx("button",{className:`filter-btn ${v==="legendary"?"active":""}`,onClick:()=>P("legendary"),children:"传奇"})]})]}),m.jsx("div",{className:"panel-section node-detail",children:g?m.jsxs(m.Fragment,{children:[m.jsx("h3",{children:ke(g.node)}),m.jsx("div",{className:"node-type-badge","data-type":g.node.type,children:lm[g.node.type][n]}),m.jsx("p",{className:"node-desc",children:he(g.node)}),m.jsxs("div",{className:"node-coords",children:["位置: ",g.boardId," (",g.row,", ",g.col,")"]}),$.has(`${g.boardId}_${g.row}_${g.col}`)&&!s.has(`${g.boardId}_${g.row}_${g.col}`)&&m.jsx("div",{className:"node-hint",children:"点击分配点数"})]}):m.jsxs(m.Fragment,{children:[m.jsx("h3",{children:"节点详情"}),m.jsx("div",{className:"node-empty",children:"鼠标悬停在节点上查看详情"})]})}),Ae&&m.jsxs("div",{className:"panel-section glyph-detail",children:[m.jsxs("h3",{children:["当前雕文: ",Pe(Ae)]}),m.jsxs("div",{className:"glyph-info",children:[m.jsx("div",{className:"glyph-desc",children:Ae.descCn||Ae.desc}),Ae.threshold&&m.jsxs("div",{className:"glyph-threshold",children:["需求: ",Ae.thresholdCn||Ae.threshold]}),Ae.bonus&&m.jsx("div",{className:"glyph-bonus",children:Ae.bonusCn||Ae.bonus})]})]}),m.jsxs("div",{className:"panel-section",children:[m.jsxs("h3",{children:["节点列表 (",je.length,")"]}),m.jsx("div",{className:"node-list",children:je.slice(0,50).map(({node:y,boardId:W,row:G,col:R})=>{const w=`${W}_${G}_${R}`,L=s.has(w);return m.jsxs("div",{className:`node-list-item ${L?"allocated":""}`,onClick:()=>K(W,G,R,y),children:[m.jsx("span",{className:`node-dot ${y.type}`}),m.jsx("span",{className:"node-name",children:ke(y)}),m.jsx("span",{className:"node-board",children:W}),L&&m.jsx("span",{className:"allocated-badge",children:"已分配"})]},w)})})]}),m.jsxs("div",{className:"panel-section",children:[m.jsxs("h3",{children:["可用雕纹 (",e.glyphs.length,")"]}),m.jsx("div",{className:"glyph-list",children:e.glyphs.slice(0,10).map(y=>m.jsxs("div",{className:"glyph-item",children:[m.jsx("div",{className:"glyph-name",children:Pe(y)}),y.tiers&&m.jsxs("div",{className:"glyph-tiers",children:[y.tiers.slice(0,5).map((W,G)=>m.jsxs("span",{className:"tier-badge",children:["Lv",G+1,": +",W]},G)),"..."]})]},y.id))})]})]})]})]})}Er.createRoot(document.getElementById("root")).render(m.jsx($c.StrictMode,{children:m.jsx(fm,{})}));
