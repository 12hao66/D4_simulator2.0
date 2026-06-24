(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const g of c.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&i(g)}).observe(document,{childList:!0,subtree:!0});function s(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerPolicy&&(c.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?c.credentials="include":o.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function i(o){if(o.ep)return;o.ep=!0;const c=s(o);fetch(o.href,c)}})();function getDefaultExportFromCjs(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var jsxRuntime={exports:{}},reactJsxRuntime_production_min={},react={exports:{}},react_production_min={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var l$1=Symbol.for("react.element"),n$1=Symbol.for("react.portal"),p$2=Symbol.for("react.fragment"),q$1=Symbol.for("react.strict_mode"),r=Symbol.for("react.profiler"),t=Symbol.for("react.provider"),u=Symbol.for("react.context"),v$1=Symbol.for("react.forward_ref"),w=Symbol.for("react.suspense"),x=Symbol.for("react.memo"),y=Symbol.for("react.lazy"),z$1=Symbol.iterator;function A$1(e){return e===null||typeof e!="object"?null:(e=z$1&&e[z$1]||e["@@iterator"],typeof e=="function"?e:null)}var B$1={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},C$1=Object.assign,D$1={};function E$1(e,a,s){this.props=e,this.context=a,this.refs=D$1,this.updater=s||B$1}E$1.prototype.isReactComponent={};E$1.prototype.setState=function(e,a){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,a,"setState")};E$1.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function F(){}F.prototype=E$1.prototype;function G$1(e,a,s){this.props=e,this.context=a,this.refs=D$1,this.updater=s||B$1}var H$1=G$1.prototype=new F;H$1.constructor=G$1;C$1(H$1,E$1.prototype);H$1.isPureReactComponent=!0;var I$1=Array.isArray,J=Object.prototype.hasOwnProperty,K$1={current:null},L$1={key:!0,ref:!0,__self:!0,__source:!0};function M$1(e,a,s){var i,o={},c=null,g=null;if(a!=null)for(i in a.ref!==void 0&&(g=a.ref),a.key!==void 0&&(c=""+a.key),a)J.call(a,i)&&!L$1.hasOwnProperty(i)&&(o[i]=a[i]);var d=arguments.length-2;if(d===1)o.children=s;else if(1<d){for(var h=Array(d),j=0;j<d;j++)h[j]=arguments[j+2];o.children=h}if(e&&e.defaultProps)for(i in d=e.defaultProps,d)o[i]===void 0&&(o[i]=d[i]);return{$$typeof:l$1,type:e,key:c,ref:g,props:o,_owner:K$1.current}}function N$1(e,a){return{$$typeof:l$1,type:e.type,key:a,ref:e.ref,props:e.props,_owner:e._owner}}function O$1(e){return typeof e=="object"&&e!==null&&e.$$typeof===l$1}function escape(e){var a={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(s){return a[s]})}var P$1=/\/+/g;function Q$1(e,a){return typeof e=="object"&&e!==null&&e.key!=null?escape(""+e.key):a.toString(36)}function R$1(e,a,s,i,o){var c=typeof e;(c==="undefined"||c==="boolean")&&(e=null);var g=!1;if(e===null)g=!0;else switch(c){case"string":case"number":g=!0;break;case"object":switch(e.$$typeof){case l$1:case n$1:g=!0}}if(g)return g=e,o=o(g),e=i===""?"."+Q$1(g,0):i,I$1(o)?(s="",e!=null&&(s=e.replace(P$1,"$&/")+"/"),R$1(o,a,s,"",function(j){return j})):o!=null&&(O$1(o)&&(o=N$1(o,s+(!o.key||g&&g.key===o.key?"":(""+o.key).replace(P$1,"$&/")+"/")+e)),a.push(o)),1;if(g=0,i=i===""?".":i+":",I$1(e))for(var d=0;d<e.length;d++){c=e[d];var h=i+Q$1(c,d);g+=R$1(c,a,s,h,o)}else if(h=A$1(e),typeof h=="function")for(e=h.call(e),d=0;!(c=e.next()).done;)c=c.value,h=i+Q$1(c,d++),g+=R$1(c,a,s,h,o);else if(c==="object")throw a=String(e),Error("Objects are not valid as a React child (found: "+(a==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":a)+"). If you meant to render a collection of children, use an array instead.");return g}function S$1(e,a,s){if(e==null)return e;var i=[],o=0;return R$1(e,i,"","",function(c){return a.call(s,c,o++)}),i}function T$1(e){if(e._status===-1){var a=e._result;a=a(),a.then(function(s){(e._status===0||e._status===-1)&&(e._status=1,e._result=s)},function(s){(e._status===0||e._status===-1)&&(e._status=2,e._result=s)}),e._status===-1&&(e._status=0,e._result=a)}if(e._status===1)return e._result.default;throw e._result}var U$1={current:null},V$1={transition:null},W$1={ReactCurrentDispatcher:U$1,ReactCurrentBatchConfig:V$1,ReactCurrentOwner:K$1};function X$1(){throw Error("act(...) is not supported in production builds of React.")}react_production_min.Children={map:S$1,forEach:function(e,a,s){S$1(e,function(){a.apply(this,arguments)},s)},count:function(e){var a=0;return S$1(e,function(){a++}),a},toArray:function(e){return S$1(e,function(a){return a})||[]},only:function(e){if(!O$1(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};react_production_min.Component=E$1;react_production_min.Fragment=p$2;react_production_min.Profiler=r;react_production_min.PureComponent=G$1;react_production_min.StrictMode=q$1;react_production_min.Suspense=w;react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=W$1;react_production_min.act=X$1;react_production_min.cloneElement=function(e,a,s){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var i=C$1({},e.props),o=e.key,c=e.ref,g=e._owner;if(a!=null){if(a.ref!==void 0&&(c=a.ref,g=K$1.current),a.key!==void 0&&(o=""+a.key),e.type&&e.type.defaultProps)var d=e.type.defaultProps;for(h in a)J.call(a,h)&&!L$1.hasOwnProperty(h)&&(i[h]=a[h]===void 0&&d!==void 0?d[h]:a[h])}var h=arguments.length-2;if(h===1)i.children=s;else if(1<h){d=Array(h);for(var j=0;j<h;j++)d[j]=arguments[j+2];i.children=d}return{$$typeof:l$1,type:e.type,key:o,ref:c,props:i,_owner:g}};react_production_min.createContext=function(e){return e={$$typeof:u,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:t,_context:e},e.Consumer=e};react_production_min.createElement=M$1;react_production_min.createFactory=function(e){var a=M$1.bind(null,e);return a.type=e,a};react_production_min.createRef=function(){return{current:null}};react_production_min.forwardRef=function(e){return{$$typeof:v$1,render:e}};react_production_min.isValidElement=O$1;react_production_min.lazy=function(e){return{$$typeof:y,_payload:{_status:-1,_result:e},_init:T$1}};react_production_min.memo=function(e,a){return{$$typeof:x,type:e,compare:a===void 0?null:a}};react_production_min.startTransition=function(e){var a=V$1.transition;V$1.transition={};try{e()}finally{V$1.transition=a}};react_production_min.unstable_act=X$1;react_production_min.useCallback=function(e,a){return U$1.current.useCallback(e,a)};react_production_min.useContext=function(e){return U$1.current.useContext(e)};react_production_min.useDebugValue=function(){};react_production_min.useDeferredValue=function(e){return U$1.current.useDeferredValue(e)};react_production_min.useEffect=function(e,a){return U$1.current.useEffect(e,a)};react_production_min.useId=function(){return U$1.current.useId()};react_production_min.useImperativeHandle=function(e,a,s){return U$1.current.useImperativeHandle(e,a,s)};react_production_min.useInsertionEffect=function(e,a){return U$1.current.useInsertionEffect(e,a)};react_production_min.useLayoutEffect=function(e,a){return U$1.current.useLayoutEffect(e,a)};react_production_min.useMemo=function(e,a){return U$1.current.useMemo(e,a)};react_production_min.useReducer=function(e,a,s){return U$1.current.useReducer(e,a,s)};react_production_min.useRef=function(e){return U$1.current.useRef(e)};react_production_min.useState=function(e){return U$1.current.useState(e)};react_production_min.useSyncExternalStore=function(e,a,s){return U$1.current.useSyncExternalStore(e,a,s)};react_production_min.useTransition=function(){return U$1.current.useTransition()};react_production_min.version="18.3.1";react.exports=react_production_min;var reactExports=react.exports;const React=getDefaultExportFromCjs(reactExports);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var f=reactExports,k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m$1=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p$1={key:!0,ref:!0,__self:!0,__source:!0};function q(e,a,s){var i,o={},c=null,g=null;s!==void 0&&(c=""+s),a.key!==void 0&&(c=""+a.key),a.ref!==void 0&&(g=a.ref);for(i in a)m$1.call(a,i)&&!p$1.hasOwnProperty(i)&&(o[i]=a[i]);if(e&&e.defaultProps)for(i in a=e.defaultProps,a)o[i]===void 0&&(o[i]=a[i]);return{$$typeof:k,type:e,key:c,ref:g,props:o,_owner:n.current}}reactJsxRuntime_production_min.Fragment=l;reactJsxRuntime_production_min.jsx=q;reactJsxRuntime_production_min.jsxs=q;jsxRuntime.exports=reactJsxRuntime_production_min;var jsxRuntimeExports=jsxRuntime.exports,client={},reactDom={exports:{}},reactDom_production_min={},scheduler={exports:{}},scheduler_production_min={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function a(pn,fn){var xn=pn.length;pn.push(fn);e:for(;0<xn;){var rn=xn-1>>>1,yn=pn[rn];if(0<o(yn,fn))pn[rn]=fn,pn[xn]=yn,xn=rn;else break e}}function s(pn){return pn.length===0?null:pn[0]}function i(pn){if(pn.length===0)return null;var fn=pn[0],xn=pn.pop();if(xn!==fn){pn[0]=xn;e:for(var rn=0,yn=pn.length,un=yn>>>1;rn<un;){var hn=2*(rn+1)-1,_n=pn[hn],En=hn+1,wn=pn[En];if(0>o(_n,xn))En<yn&&0>o(wn,_n)?(pn[rn]=wn,pn[En]=xn,rn=En):(pn[rn]=_n,pn[hn]=xn,rn=hn);else if(En<yn&&0>o(wn,xn))pn[rn]=wn,pn[En]=xn,rn=En;else break e}}return fn}function o(pn,fn){var xn=pn.sortIndex-fn.sortIndex;return xn!==0?xn:pn.id-fn.id}if(typeof performance=="object"&&typeof performance.now=="function"){var c=performance;e.unstable_now=function(){return c.now()}}else{var g=Date,d=g.now();e.unstable_now=function(){return g.now()-d}}var h=[],j=[],en=1,nn=null,_e=3,tn=!1,sn=!1,ln=!1,Tn=typeof setTimeout=="function"?setTimeout:null,b=typeof clearTimeout=="function"?clearTimeout:null,_=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function $(pn){for(var fn=s(j);fn!==null;){if(fn.callback===null)i(j);else if(fn.startTime<=pn)i(j),fn.sortIndex=fn.expirationTime,a(h,fn);else break;fn=s(j)}}function an(pn){if(ln=!1,$(pn),!sn)if(s(h)!==null)sn=!0,Ln(on);else{var fn=s(j);fn!==null&&In(an,fn.startTime-pn)}}function on(pn,fn){sn=!1,ln&&(ln=!1,b(dn),dn=-1),tn=!0;var xn=_e;try{for($(fn),nn=s(h);nn!==null&&(!(nn.expirationTime>fn)||pn&&!Cn());){var rn=nn.callback;if(typeof rn=="function"){nn.callback=null,_e=nn.priorityLevel;var yn=rn(nn.expirationTime<=fn);fn=e.unstable_now(),typeof yn=="function"?nn.callback=yn:nn===s(h)&&i(h),$(fn)}else i(h);nn=s(h)}if(nn!==null)var un=!0;else{var hn=s(j);hn!==null&&In(an,hn.startTime-fn),un=!1}return un}finally{nn=null,_e=xn,tn=!1}}var cn=!1,gn=null,dn=-1,Sn=5,mn=-1;function Cn(){return!(e.unstable_now()-mn<Sn)}function Wn(){if(gn!==null){var pn=e.unstable_now();mn=pn;var fn=!0;try{fn=gn(!0,pn)}finally{fn?Gn():(cn=!1,gn=null)}}else cn=!1}var Gn;if(typeof _=="function")Gn=function(){_(Wn)};else if(typeof MessageChannel<"u"){var Bn=new MessageChannel,Mn=Bn.port2;Bn.port1.onmessage=Wn,Gn=function(){Mn.postMessage(null)}}else Gn=function(){Tn(Wn,0)};function Ln(pn){gn=pn,cn||(cn=!0,Gn())}function In(pn,fn){dn=Tn(function(){pn(e.unstable_now())},fn)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(pn){pn.callback=null},e.unstable_continueExecution=function(){sn||tn||(sn=!0,Ln(on))},e.unstable_forceFrameRate=function(pn){0>pn||125<pn?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Sn=0<pn?Math.floor(1e3/pn):5},e.unstable_getCurrentPriorityLevel=function(){return _e},e.unstable_getFirstCallbackNode=function(){return s(h)},e.unstable_next=function(pn){switch(_e){case 1:case 2:case 3:var fn=3;break;default:fn=_e}var xn=_e;_e=fn;try{return pn()}finally{_e=xn}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(pn,fn){switch(pn){case 1:case 2:case 3:case 4:case 5:break;default:pn=3}var xn=_e;_e=pn;try{return fn()}finally{_e=xn}},e.unstable_scheduleCallback=function(pn,fn,xn){var rn=e.unstable_now();switch(typeof xn=="object"&&xn!==null?(xn=xn.delay,xn=typeof xn=="number"&&0<xn?rn+xn:rn):xn=rn,pn){case 1:var yn=-1;break;case 2:yn=250;break;case 5:yn=1073741823;break;case 4:yn=1e4;break;default:yn=5e3}return yn=xn+yn,pn={id:en++,callback:fn,priorityLevel:pn,startTime:xn,expirationTime:yn,sortIndex:-1},xn>rn?(pn.sortIndex=xn,a(j,pn),s(h)===null&&pn===s(j)&&(ln?(b(dn),dn=-1):ln=!0,In(an,xn-rn))):(pn.sortIndex=yn,a(h,pn),sn||tn||(sn=!0,Ln(on))),pn},e.unstable_shouldYield=Cn,e.unstable_wrapCallback=function(pn){var fn=_e;return function(){var xn=_e;_e=fn;try{return pn.apply(this,arguments)}finally{_e=xn}}}})(scheduler_production_min);scheduler.exports=scheduler_production_min;var schedulerExports=scheduler.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var aa=reactExports,ca=schedulerExports;function p(e){for(var a="https://reactjs.org/docs/error-decoder.html?invariant="+e,s=1;s<arguments.length;s++)a+="&args[]="+encodeURIComponent(arguments[s]);return"Minified React error #"+e+"; visit "+a+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var da=new Set,ea={};function fa(e,a){ha(e,a),ha(e+"Capture",a)}function ha(e,a){for(ea[e]=a,e=0;e<a.length;e++)da.add(a[e])}var ia=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ja=Object.prototype.hasOwnProperty,ka=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,la={},ma={};function oa(e){return ja.call(ma,e)?!0:ja.call(la,e)?!1:ka.test(e)?ma[e]=!0:(la[e]=!0,!1)}function pa(e,a,s,i){if(s!==null&&s.type===0)return!1;switch(typeof a){case"function":case"symbol":return!0;case"boolean":return i?!1:s!==null?!s.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function qa(e,a,s,i){if(a===null||typeof a>"u"||pa(e,a,s,i))return!0;if(i)return!1;if(s!==null)switch(s.type){case 3:return!a;case 4:return a===!1;case 5:return isNaN(a);case 6:return isNaN(a)||1>a}return!1}function v(e,a,s,i,o,c,g){this.acceptsBooleans=a===2||a===3||a===4,this.attributeName=i,this.attributeNamespace=o,this.mustUseProperty=s,this.propertyName=e,this.type=a,this.sanitizeURL=c,this.removeEmptyString=g}var z={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){z[e]=new v(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var a=e[0];z[a]=new v(a,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){z[e]=new v(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){z[e]=new v(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){z[e]=new v(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){z[e]=new v(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){z[e]=new v(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){z[e]=new v(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){z[e]=new v(e,5,!1,e.toLowerCase(),null,!1,!1)});var ra=/[\-:]([a-z])/g;function sa(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var a=e.replace(ra,sa);z[a]=new v(a,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var a=e.replace(ra,sa);z[a]=new v(a,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var a=e.replace(ra,sa);z[a]=new v(a,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){z[e]=new v(e,1,!1,e.toLowerCase(),null,!1,!1)});z.xlinkHref=new v("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){z[e]=new v(e,1,!1,e.toLowerCase(),null,!0,!0)});function ta(e,a,s,i){var o=z.hasOwnProperty(a)?z[a]:null;(o!==null?o.type!==0:i||!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(qa(a,s,o,i)&&(s=null),i||o===null?oa(a)&&(s===null?e.removeAttribute(a):e.setAttribute(a,""+s)):o.mustUseProperty?e[o.propertyName]=s===null?o.type===3?!1:"":s:(a=o.attributeName,i=o.attributeNamespace,s===null?e.removeAttribute(a):(o=o.type,s=o===3||o===4&&s===!0?"":""+s,i?e.setAttributeNS(i,a,s):e.setAttribute(a,s))))}var ua=aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,va=Symbol.for("react.element"),wa=Symbol.for("react.portal"),ya=Symbol.for("react.fragment"),za=Symbol.for("react.strict_mode"),Aa=Symbol.for("react.profiler"),Ba=Symbol.for("react.provider"),Ca=Symbol.for("react.context"),Da=Symbol.for("react.forward_ref"),Ea=Symbol.for("react.suspense"),Fa=Symbol.for("react.suspense_list"),Ga=Symbol.for("react.memo"),Ha=Symbol.for("react.lazy"),Ia=Symbol.for("react.offscreen"),Ja=Symbol.iterator;function Ka(e){return e===null||typeof e!="object"?null:(e=Ja&&e[Ja]||e["@@iterator"],typeof e=="function"?e:null)}var A=Object.assign,La;function Ma(e){if(La===void 0)try{throw Error()}catch(s){var a=s.stack.trim().match(/\n( *(at )?)/);La=a&&a[1]||""}return`
`+La+e}var Na=!1;function Oa(e,a){if(!e||Na)return"";Na=!0;var s=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(a)if(a=function(){throw Error()},Object.defineProperty(a.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(a,[])}catch(j){var i=j}Reflect.construct(e,[],a)}else{try{a.call()}catch(j){i=j}e.call(a.prototype)}else{try{throw Error()}catch(j){i=j}e()}}catch(j){if(j&&i&&typeof j.stack=="string"){for(var o=j.stack.split(`
`),c=i.stack.split(`
`),g=o.length-1,d=c.length-1;1<=g&&0<=d&&o[g]!==c[d];)d--;for(;1<=g&&0<=d;g--,d--)if(o[g]!==c[d]){if(g!==1||d!==1)do if(g--,d--,0>d||o[g]!==c[d]){var h=`
`+o[g].replace(" at new "," at ");return e.displayName&&h.includes("<anonymous>")&&(h=h.replace("<anonymous>",e.displayName)),h}while(1<=g&&0<=d);break}}}finally{Na=!1,Error.prepareStackTrace=s}return(e=e?e.displayName||e.name:"")?Ma(e):""}function Pa(e){switch(e.tag){case 5:return Ma(e.type);case 16:return Ma("Lazy");case 13:return Ma("Suspense");case 19:return Ma("SuspenseList");case 0:case 2:case 15:return e=Oa(e.type,!1),e;case 11:return e=Oa(e.type.render,!1),e;case 1:return e=Oa(e.type,!0),e;default:return""}}function Qa(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case ya:return"Fragment";case wa:return"Portal";case Aa:return"Profiler";case za:return"StrictMode";case Ea:return"Suspense";case Fa:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Ca:return(e.displayName||"Context")+".Consumer";case Ba:return(e._context.displayName||"Context")+".Provider";case Da:var a=e.render;return e=e.displayName,e||(e=a.displayName||a.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Ga:return a=e.displayName||null,a!==null?a:Qa(e.type)||"Memo";case Ha:a=e._payload,e=e._init;try{return Qa(e(a))}catch{}}return null}function Ra(e){var a=e.type;switch(e.tag){case 24:return"Cache";case 9:return(a.displayName||"Context")+".Consumer";case 10:return(a._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=a.render,e=e.displayName||e.name||"",a.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return a;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Qa(a);case 8:return a===za?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof a=="function")return a.displayName||a.name||null;if(typeof a=="string")return a}return null}function Sa(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Ta(e){var a=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(a==="checkbox"||a==="radio")}function Ua(e){var a=Ta(e)?"checked":"value",s=Object.getOwnPropertyDescriptor(e.constructor.prototype,a),i=""+e[a];if(!e.hasOwnProperty(a)&&typeof s<"u"&&typeof s.get=="function"&&typeof s.set=="function"){var o=s.get,c=s.set;return Object.defineProperty(e,a,{configurable:!0,get:function(){return o.call(this)},set:function(g){i=""+g,c.call(this,g)}}),Object.defineProperty(e,a,{enumerable:s.enumerable}),{getValue:function(){return i},setValue:function(g){i=""+g},stopTracking:function(){e._valueTracker=null,delete e[a]}}}}function Va(e){e._valueTracker||(e._valueTracker=Ua(e))}function Wa(e){if(!e)return!1;var a=e._valueTracker;if(!a)return!0;var s=a.getValue(),i="";return e&&(i=Ta(e)?e.checked?"true":"false":e.value),e=i,e!==s?(a.setValue(e),!0):!1}function Xa(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Ya(e,a){var s=a.checked;return A({},a,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:s??e._wrapperState.initialChecked})}function Za(e,a){var s=a.defaultValue==null?"":a.defaultValue,i=a.checked!=null?a.checked:a.defaultChecked;s=Sa(a.value!=null?a.value:s),e._wrapperState={initialChecked:i,initialValue:s,controlled:a.type==="checkbox"||a.type==="radio"?a.checked!=null:a.value!=null}}function ab(e,a){a=a.checked,a!=null&&ta(e,"checked",a,!1)}function bb(e,a){ab(e,a);var s=Sa(a.value),i=a.type;if(s!=null)i==="number"?(s===0&&e.value===""||e.value!=s)&&(e.value=""+s):e.value!==""+s&&(e.value=""+s);else if(i==="submit"||i==="reset"){e.removeAttribute("value");return}a.hasOwnProperty("value")?cb(e,a.type,s):a.hasOwnProperty("defaultValue")&&cb(e,a.type,Sa(a.defaultValue)),a.checked==null&&a.defaultChecked!=null&&(e.defaultChecked=!!a.defaultChecked)}function db(e,a,s){if(a.hasOwnProperty("value")||a.hasOwnProperty("defaultValue")){var i=a.type;if(!(i!=="submit"&&i!=="reset"||a.value!==void 0&&a.value!==null))return;a=""+e._wrapperState.initialValue,s||a===e.value||(e.value=a),e.defaultValue=a}s=e.name,s!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,s!==""&&(e.name=s)}function cb(e,a,s){(a!=="number"||Xa(e.ownerDocument)!==e)&&(s==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+s&&(e.defaultValue=""+s))}var eb=Array.isArray;function fb(e,a,s,i){if(e=e.options,a){a={};for(var o=0;o<s.length;o++)a["$"+s[o]]=!0;for(s=0;s<e.length;s++)o=a.hasOwnProperty("$"+e[s].value),e[s].selected!==o&&(e[s].selected=o),o&&i&&(e[s].defaultSelected=!0)}else{for(s=""+Sa(s),a=null,o=0;o<e.length;o++){if(e[o].value===s){e[o].selected=!0,i&&(e[o].defaultSelected=!0);return}a!==null||e[o].disabled||(a=e[o])}a!==null&&(a.selected=!0)}}function gb(e,a){if(a.dangerouslySetInnerHTML!=null)throw Error(p(91));return A({},a,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function hb(e,a){var s=a.value;if(s==null){if(s=a.children,a=a.defaultValue,s!=null){if(a!=null)throw Error(p(92));if(eb(s)){if(1<s.length)throw Error(p(93));s=s[0]}a=s}a==null&&(a=""),s=a}e._wrapperState={initialValue:Sa(s)}}function ib(e,a){var s=Sa(a.value),i=Sa(a.defaultValue);s!=null&&(s=""+s,s!==e.value&&(e.value=s),a.defaultValue==null&&e.defaultValue!==s&&(e.defaultValue=s)),i!=null&&(e.defaultValue=""+i)}function jb(e){var a=e.textContent;a===e._wrapperState.initialValue&&a!==""&&a!==null&&(e.value=a)}function kb(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function lb(e,a){return e==null||e==="http://www.w3.org/1999/xhtml"?kb(a):e==="http://www.w3.org/2000/svg"&&a==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var mb,nb=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(a,s,i,o){MSApp.execUnsafeLocalFunction(function(){return e(a,s,i,o)})}:e}(function(e,a){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=a;else{for(mb=mb||document.createElement("div"),mb.innerHTML="<svg>"+a.valueOf().toString()+"</svg>",a=mb.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;a.firstChild;)e.appendChild(a.firstChild)}});function ob(e,a){if(a){var s=e.firstChild;if(s&&s===e.lastChild&&s.nodeType===3){s.nodeValue=a;return}}e.textContent=a}var pb={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},qb=["Webkit","ms","Moz","O"];Object.keys(pb).forEach(function(e){qb.forEach(function(a){a=a+e.charAt(0).toUpperCase()+e.substring(1),pb[a]=pb[e]})});function rb(e,a,s){return a==null||typeof a=="boolean"||a===""?"":s||typeof a!="number"||a===0||pb.hasOwnProperty(e)&&pb[e]?(""+a).trim():a+"px"}function sb(e,a){e=e.style;for(var s in a)if(a.hasOwnProperty(s)){var i=s.indexOf("--")===0,o=rb(s,a[s],i);s==="float"&&(s="cssFloat"),i?e.setProperty(s,o):e[s]=o}}var tb=A({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ub(e,a){if(a){if(tb[e]&&(a.children!=null||a.dangerouslySetInnerHTML!=null))throw Error(p(137,e));if(a.dangerouslySetInnerHTML!=null){if(a.children!=null)throw Error(p(60));if(typeof a.dangerouslySetInnerHTML!="object"||!("__html"in a.dangerouslySetInnerHTML))throw Error(p(61))}if(a.style!=null&&typeof a.style!="object")throw Error(p(62))}}function vb(e,a){if(e.indexOf("-")===-1)return typeof a.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var wb=null;function xb(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var yb=null,zb=null,Ab=null;function Bb(e){if(e=Cb(e)){if(typeof yb!="function")throw Error(p(280));var a=e.stateNode;a&&(a=Db(a),yb(e.stateNode,e.type,a))}}function Eb(e){zb?Ab?Ab.push(e):Ab=[e]:zb=e}function Fb(){if(zb){var e=zb,a=Ab;if(Ab=zb=null,Bb(e),a)for(e=0;e<a.length;e++)Bb(a[e])}}function Gb(e,a){return e(a)}function Hb(){}var Ib=!1;function Jb(e,a,s){if(Ib)return e(a,s);Ib=!0;try{return Gb(e,a,s)}finally{Ib=!1,(zb!==null||Ab!==null)&&(Hb(),Fb())}}function Kb(e,a){var s=e.stateNode;if(s===null)return null;var i=Db(s);if(i===null)return null;s=i[a];e:switch(a){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break e;default:e=!1}if(e)return null;if(s&&typeof s!="function")throw Error(p(231,a,typeof s));return s}var Lb=!1;if(ia)try{var Mb={};Object.defineProperty(Mb,"passive",{get:function(){Lb=!0}}),window.addEventListener("test",Mb,Mb),window.removeEventListener("test",Mb,Mb)}catch{Lb=!1}function Nb(e,a,s,i,o,c,g,d,h){var j=Array.prototype.slice.call(arguments,3);try{a.apply(s,j)}catch(en){this.onError(en)}}var Ob=!1,Pb=null,Qb=!1,Rb=null,Sb={onError:function(e){Ob=!0,Pb=e}};function Tb(e,a,s,i,o,c,g,d,h){Ob=!1,Pb=null,Nb.apply(Sb,arguments)}function Ub(e,a,s,i,o,c,g,d,h){if(Tb.apply(this,arguments),Ob){if(Ob){var j=Pb;Ob=!1,Pb=null}else throw Error(p(198));Qb||(Qb=!0,Rb=j)}}function Vb(e){var a=e,s=e;if(e.alternate)for(;a.return;)a=a.return;else{e=a;do a=e,a.flags&4098&&(s=a.return),e=a.return;while(e)}return a.tag===3?s:null}function Wb(e){if(e.tag===13){var a=e.memoizedState;if(a===null&&(e=e.alternate,e!==null&&(a=e.memoizedState)),a!==null)return a.dehydrated}return null}function Xb(e){if(Vb(e)!==e)throw Error(p(188))}function Yb(e){var a=e.alternate;if(!a){if(a=Vb(e),a===null)throw Error(p(188));return a!==e?null:e}for(var s=e,i=a;;){var o=s.return;if(o===null)break;var c=o.alternate;if(c===null){if(i=o.return,i!==null){s=i;continue}break}if(o.child===c.child){for(c=o.child;c;){if(c===s)return Xb(o),e;if(c===i)return Xb(o),a;c=c.sibling}throw Error(p(188))}if(s.return!==i.return)s=o,i=c;else{for(var g=!1,d=o.child;d;){if(d===s){g=!0,s=o,i=c;break}if(d===i){g=!0,i=o,s=c;break}d=d.sibling}if(!g){for(d=c.child;d;){if(d===s){g=!0,s=c,i=o;break}if(d===i){g=!0,i=c,s=o;break}d=d.sibling}if(!g)throw Error(p(189))}}if(s.alternate!==i)throw Error(p(190))}if(s.tag!==3)throw Error(p(188));return s.stateNode.current===s?e:a}function Zb(e){return e=Yb(e),e!==null?$b(e):null}function $b(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var a=$b(e);if(a!==null)return a;e=e.sibling}return null}var ac=ca.unstable_scheduleCallback,bc=ca.unstable_cancelCallback,cc=ca.unstable_shouldYield,dc=ca.unstable_requestPaint,B=ca.unstable_now,ec=ca.unstable_getCurrentPriorityLevel,fc=ca.unstable_ImmediatePriority,gc=ca.unstable_UserBlockingPriority,hc=ca.unstable_NormalPriority,ic=ca.unstable_LowPriority,jc=ca.unstable_IdlePriority,kc=null,lc=null;function mc(e){if(lc&&typeof lc.onCommitFiberRoot=="function")try{lc.onCommitFiberRoot(kc,e,void 0,(e.current.flags&128)===128)}catch{}}var oc=Math.clz32?Math.clz32:nc,pc=Math.log,qc=Math.LN2;function nc(e){return e>>>=0,e===0?32:31-(pc(e)/qc|0)|0}var rc=64,sc=4194304;function tc(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function uc(e,a){var s=e.pendingLanes;if(s===0)return 0;var i=0,o=e.suspendedLanes,c=e.pingedLanes,g=s&268435455;if(g!==0){var d=g&~o;d!==0?i=tc(d):(c&=g,c!==0&&(i=tc(c)))}else g=s&~o,g!==0?i=tc(g):c!==0&&(i=tc(c));if(i===0)return 0;if(a!==0&&a!==i&&!(a&o)&&(o=i&-i,c=a&-a,o>=c||o===16&&(c&4194240)!==0))return a;if(i&4&&(i|=s&16),a=e.entangledLanes,a!==0)for(e=e.entanglements,a&=i;0<a;)s=31-oc(a),o=1<<s,i|=e[s],a&=~o;return i}function vc(e,a){switch(e){case 1:case 2:case 4:return a+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return a+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function wc(e,a){for(var s=e.suspendedLanes,i=e.pingedLanes,o=e.expirationTimes,c=e.pendingLanes;0<c;){var g=31-oc(c),d=1<<g,h=o[g];h===-1?(!(d&s)||d&i)&&(o[g]=vc(d,a)):h<=a&&(e.expiredLanes|=d),c&=~d}}function xc(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function yc(){var e=rc;return rc<<=1,!(rc&4194240)&&(rc=64),e}function zc(e){for(var a=[],s=0;31>s;s++)a.push(e);return a}function Ac(e,a,s){e.pendingLanes|=a,a!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,a=31-oc(a),e[a]=s}function Bc(e,a){var s=e.pendingLanes&~a;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=a,e.mutableReadLanes&=a,e.entangledLanes&=a,a=e.entanglements;var i=e.eventTimes;for(e=e.expirationTimes;0<s;){var o=31-oc(s),c=1<<o;a[o]=0,i[o]=-1,e[o]=-1,s&=~c}}function Cc(e,a){var s=e.entangledLanes|=a;for(e=e.entanglements;s;){var i=31-oc(s),o=1<<i;o&a|e[i]&a&&(e[i]|=a),s&=~o}}var C=0;function Dc(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Ec,Fc,Gc,Hc,Ic,Jc=!1,Kc=[],Lc=null,Mc=null,Nc=null,Oc=new Map,Pc=new Map,Qc=[],Rc="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Sc(e,a){switch(e){case"focusin":case"focusout":Lc=null;break;case"dragenter":case"dragleave":Mc=null;break;case"mouseover":case"mouseout":Nc=null;break;case"pointerover":case"pointerout":Oc.delete(a.pointerId);break;case"gotpointercapture":case"lostpointercapture":Pc.delete(a.pointerId)}}function Tc(e,a,s,i,o,c){return e===null||e.nativeEvent!==c?(e={blockedOn:a,domEventName:s,eventSystemFlags:i,nativeEvent:c,targetContainers:[o]},a!==null&&(a=Cb(a),a!==null&&Fc(a)),e):(e.eventSystemFlags|=i,a=e.targetContainers,o!==null&&a.indexOf(o)===-1&&a.push(o),e)}function Uc(e,a,s,i,o){switch(a){case"focusin":return Lc=Tc(Lc,e,a,s,i,o),!0;case"dragenter":return Mc=Tc(Mc,e,a,s,i,o),!0;case"mouseover":return Nc=Tc(Nc,e,a,s,i,o),!0;case"pointerover":var c=o.pointerId;return Oc.set(c,Tc(Oc.get(c)||null,e,a,s,i,o)),!0;case"gotpointercapture":return c=o.pointerId,Pc.set(c,Tc(Pc.get(c)||null,e,a,s,i,o)),!0}return!1}function Vc(e){var a=Wc(e.target);if(a!==null){var s=Vb(a);if(s!==null){if(a=s.tag,a===13){if(a=Wb(s),a!==null){e.blockedOn=a,Ic(e.priority,function(){Gc(s)});return}}else if(a===3&&s.stateNode.current.memoizedState.isDehydrated){e.blockedOn=s.tag===3?s.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Xc(e){if(e.blockedOn!==null)return!1;for(var a=e.targetContainers;0<a.length;){var s=Yc(e.domEventName,e.eventSystemFlags,a[0],e.nativeEvent);if(s===null){s=e.nativeEvent;var i=new s.constructor(s.type,s);wb=i,s.target.dispatchEvent(i),wb=null}else return a=Cb(s),a!==null&&Fc(a),e.blockedOn=s,!1;a.shift()}return!0}function Zc(e,a,s){Xc(e)&&s.delete(a)}function $c(){Jc=!1,Lc!==null&&Xc(Lc)&&(Lc=null),Mc!==null&&Xc(Mc)&&(Mc=null),Nc!==null&&Xc(Nc)&&(Nc=null),Oc.forEach(Zc),Pc.forEach(Zc)}function ad(e,a){e.blockedOn===a&&(e.blockedOn=null,Jc||(Jc=!0,ca.unstable_scheduleCallback(ca.unstable_NormalPriority,$c)))}function bd(e){function a(o){return ad(o,e)}if(0<Kc.length){ad(Kc[0],e);for(var s=1;s<Kc.length;s++){var i=Kc[s];i.blockedOn===e&&(i.blockedOn=null)}}for(Lc!==null&&ad(Lc,e),Mc!==null&&ad(Mc,e),Nc!==null&&ad(Nc,e),Oc.forEach(a),Pc.forEach(a),s=0;s<Qc.length;s++)i=Qc[s],i.blockedOn===e&&(i.blockedOn=null);for(;0<Qc.length&&(s=Qc[0],s.blockedOn===null);)Vc(s),s.blockedOn===null&&Qc.shift()}var cd=ua.ReactCurrentBatchConfig,dd=!0;function ed(e,a,s,i){var o=C,c=cd.transition;cd.transition=null;try{C=1,fd(e,a,s,i)}finally{C=o,cd.transition=c}}function gd(e,a,s,i){var o=C,c=cd.transition;cd.transition=null;try{C=4,fd(e,a,s,i)}finally{C=o,cd.transition=c}}function fd(e,a,s,i){if(dd){var o=Yc(e,a,s,i);if(o===null)hd(e,a,i,id,s),Sc(e,i);else if(Uc(o,e,a,s,i))i.stopPropagation();else if(Sc(e,i),a&4&&-1<Rc.indexOf(e)){for(;o!==null;){var c=Cb(o);if(c!==null&&Ec(c),c=Yc(e,a,s,i),c===null&&hd(e,a,i,id,s),c===o)break;o=c}o!==null&&i.stopPropagation()}else hd(e,a,i,null,s)}}var id=null;function Yc(e,a,s,i){if(id=null,e=xb(i),e=Wc(e),e!==null)if(a=Vb(e),a===null)e=null;else if(s=a.tag,s===13){if(e=Wb(a),e!==null)return e;e=null}else if(s===3){if(a.stateNode.current.memoizedState.isDehydrated)return a.tag===3?a.stateNode.containerInfo:null;e=null}else a!==e&&(e=null);return id=e,null}function jd(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(ec()){case fc:return 1;case gc:return 4;case hc:case ic:return 16;case jc:return 536870912;default:return 16}default:return 16}}var kd=null,ld=null,md=null;function nd(){if(md)return md;var e,a=ld,s=a.length,i,o="value"in kd?kd.value:kd.textContent,c=o.length;for(e=0;e<s&&a[e]===o[e];e++);var g=s-e;for(i=1;i<=g&&a[s-i]===o[c-i];i++);return md=o.slice(e,1<i?1-i:void 0)}function od(e){var a=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&a===13&&(e=13)):e=a,e===10&&(e=13),32<=e||e===13?e:0}function pd(){return!0}function qd(){return!1}function rd(e){function a(s,i,o,c,g){this._reactName=s,this._targetInst=o,this.type=i,this.nativeEvent=c,this.target=g,this.currentTarget=null;for(var d in e)e.hasOwnProperty(d)&&(s=e[d],this[d]=s?s(c):c[d]);return this.isDefaultPrevented=(c.defaultPrevented!=null?c.defaultPrevented:c.returnValue===!1)?pd:qd,this.isPropagationStopped=qd,this}return A(a.prototype,{preventDefault:function(){this.defaultPrevented=!0;var s=this.nativeEvent;s&&(s.preventDefault?s.preventDefault():typeof s.returnValue!="unknown"&&(s.returnValue=!1),this.isDefaultPrevented=pd)},stopPropagation:function(){var s=this.nativeEvent;s&&(s.stopPropagation?s.stopPropagation():typeof s.cancelBubble!="unknown"&&(s.cancelBubble=!0),this.isPropagationStopped=pd)},persist:function(){},isPersistent:pd}),a}var sd={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},td=rd(sd),ud=A({},sd,{view:0,detail:0}),vd=rd(ud),wd,xd,yd,Ad=A({},ud,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:zd,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==yd&&(yd&&e.type==="mousemove"?(wd=e.screenX-yd.screenX,xd=e.screenY-yd.screenY):xd=wd=0,yd=e),wd)},movementY:function(e){return"movementY"in e?e.movementY:xd}}),Bd=rd(Ad),Cd=A({},Ad,{dataTransfer:0}),Dd=rd(Cd),Ed=A({},ud,{relatedTarget:0}),Fd=rd(Ed),Gd=A({},sd,{animationName:0,elapsedTime:0,pseudoElement:0}),Hd=rd(Gd),Id=A({},sd,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Jd=rd(Id),Kd=A({},sd,{data:0}),Ld=rd(Kd),Md={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Nd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Od={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Pd(e){var a=this.nativeEvent;return a.getModifierState?a.getModifierState(e):(e=Od[e])?!!a[e]:!1}function zd(){return Pd}var Qd=A({},ud,{key:function(e){if(e.key){var a=Md[e.key]||e.key;if(a!=="Unidentified")return a}return e.type==="keypress"?(e=od(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Nd[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:zd,charCode:function(e){return e.type==="keypress"?od(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?od(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Rd=rd(Qd),Sd=A({},Ad,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Td=rd(Sd),Ud=A({},ud,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:zd}),Vd=rd(Ud),Wd=A({},sd,{propertyName:0,elapsedTime:0,pseudoElement:0}),Xd=rd(Wd),Yd=A({},Ad,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Zd=rd(Yd),$d=[9,13,27,32],ae=ia&&"CompositionEvent"in window,be=null;ia&&"documentMode"in document&&(be=document.documentMode);var ce=ia&&"TextEvent"in window&&!be,de=ia&&(!ae||be&&8<be&&11>=be),ee=" ",fe=!1;function ge(e,a){switch(e){case"keyup":return $d.indexOf(a.keyCode)!==-1;case"keydown":return a.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function he(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var ie=!1;function je(e,a){switch(e){case"compositionend":return he(a);case"keypress":return a.which!==32?null:(fe=!0,ee);case"textInput":return e=a.data,e===ee&&fe?null:e;default:return null}}function ke(e,a){if(ie)return e==="compositionend"||!ae&&ge(e,a)?(e=nd(),md=ld=kd=null,ie=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(a.ctrlKey||a.altKey||a.metaKey)||a.ctrlKey&&a.altKey){if(a.char&&1<a.char.length)return a.char;if(a.which)return String.fromCharCode(a.which)}return null;case"compositionend":return de&&a.locale!=="ko"?null:a.data;default:return null}}var le={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function me(e){var a=e&&e.nodeName&&e.nodeName.toLowerCase();return a==="input"?!!le[e.type]:a==="textarea"}function ne(e,a,s,i){Eb(i),a=oe(a,"onChange"),0<a.length&&(s=new td("onChange","change",null,s,i),e.push({event:s,listeners:a}))}var pe=null,qe=null;function re(e){se(e,0)}function te(e){var a=ue(e);if(Wa(a))return e}function ve(e,a){if(e==="change")return a}var we=!1;if(ia){var xe;if(ia){var ye="oninput"in document;if(!ye){var ze=document.createElement("div");ze.setAttribute("oninput","return;"),ye=typeof ze.oninput=="function"}xe=ye}else xe=!1;we=xe&&(!document.documentMode||9<document.documentMode)}function Ae(){pe&&(pe.detachEvent("onpropertychange",Be),qe=pe=null)}function Be(e){if(e.propertyName==="value"&&te(qe)){var a=[];ne(a,qe,e,xb(e)),Jb(re,a)}}function Ce(e,a,s){e==="focusin"?(Ae(),pe=a,qe=s,pe.attachEvent("onpropertychange",Be)):e==="focusout"&&Ae()}function De(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return te(qe)}function Ee(e,a){if(e==="click")return te(a)}function Fe(e,a){if(e==="input"||e==="change")return te(a)}function Ge(e,a){return e===a&&(e!==0||1/e===1/a)||e!==e&&a!==a}var He=typeof Object.is=="function"?Object.is:Ge;function Ie(e,a){if(He(e,a))return!0;if(typeof e!="object"||e===null||typeof a!="object"||a===null)return!1;var s=Object.keys(e),i=Object.keys(a);if(s.length!==i.length)return!1;for(i=0;i<s.length;i++){var o=s[i];if(!ja.call(a,o)||!He(e[o],a[o]))return!1}return!0}function Je(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Ke(e,a){var s=Je(e);e=0;for(var i;s;){if(s.nodeType===3){if(i=e+s.textContent.length,e<=a&&i>=a)return{node:s,offset:a-e};e=i}e:{for(;s;){if(s.nextSibling){s=s.nextSibling;break e}s=s.parentNode}s=void 0}s=Je(s)}}function Le(e,a){return e&&a?e===a?!0:e&&e.nodeType===3?!1:a&&a.nodeType===3?Le(e,a.parentNode):"contains"in e?e.contains(a):e.compareDocumentPosition?!!(e.compareDocumentPosition(a)&16):!1:!1}function Me(){for(var e=window,a=Xa();a instanceof e.HTMLIFrameElement;){try{var s=typeof a.contentWindow.location.href=="string"}catch{s=!1}if(s)e=a.contentWindow;else break;a=Xa(e.document)}return a}function Ne(e){var a=e&&e.nodeName&&e.nodeName.toLowerCase();return a&&(a==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||a==="textarea"||e.contentEditable==="true")}function Oe(e){var a=Me(),s=e.focusedElem,i=e.selectionRange;if(a!==s&&s&&s.ownerDocument&&Le(s.ownerDocument.documentElement,s)){if(i!==null&&Ne(s)){if(a=i.start,e=i.end,e===void 0&&(e=a),"selectionStart"in s)s.selectionStart=a,s.selectionEnd=Math.min(e,s.value.length);else if(e=(a=s.ownerDocument||document)&&a.defaultView||window,e.getSelection){e=e.getSelection();var o=s.textContent.length,c=Math.min(i.start,o);i=i.end===void 0?c:Math.min(i.end,o),!e.extend&&c>i&&(o=i,i=c,c=o),o=Ke(s,c);var g=Ke(s,i);o&&g&&(e.rangeCount!==1||e.anchorNode!==o.node||e.anchorOffset!==o.offset||e.focusNode!==g.node||e.focusOffset!==g.offset)&&(a=a.createRange(),a.setStart(o.node,o.offset),e.removeAllRanges(),c>i?(e.addRange(a),e.extend(g.node,g.offset)):(a.setEnd(g.node,g.offset),e.addRange(a)))}}for(a=[],e=s;e=e.parentNode;)e.nodeType===1&&a.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof s.focus=="function"&&s.focus(),s=0;s<a.length;s++)e=a[s],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Pe=ia&&"documentMode"in document&&11>=document.documentMode,Qe=null,Re=null,Se=null,Te=!1;function Ue(e,a,s){var i=s.window===s?s.document:s.nodeType===9?s:s.ownerDocument;Te||Qe==null||Qe!==Xa(i)||(i=Qe,"selectionStart"in i&&Ne(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Se&&Ie(Se,i)||(Se=i,i=oe(Re,"onSelect"),0<i.length&&(a=new td("onSelect","select",null,a,s),e.push({event:a,listeners:i}),a.target=Qe)))}function Ve(e,a){var s={};return s[e.toLowerCase()]=a.toLowerCase(),s["Webkit"+e]="webkit"+a,s["Moz"+e]="moz"+a,s}var We={animationend:Ve("Animation","AnimationEnd"),animationiteration:Ve("Animation","AnimationIteration"),animationstart:Ve("Animation","AnimationStart"),transitionend:Ve("Transition","TransitionEnd")},Xe={},Ye={};ia&&(Ye=document.createElement("div").style,"AnimationEvent"in window||(delete We.animationend.animation,delete We.animationiteration.animation,delete We.animationstart.animation),"TransitionEvent"in window||delete We.transitionend.transition);function Ze(e){if(Xe[e])return Xe[e];if(!We[e])return e;var a=We[e],s;for(s in a)if(a.hasOwnProperty(s)&&s in Ye)return Xe[e]=a[s];return e}var $e=Ze("animationend"),af=Ze("animationiteration"),bf=Ze("animationstart"),cf=Ze("transitionend"),df=new Map,ef="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function ff(e,a){df.set(e,a),fa(a,[e])}for(var gf=0;gf<ef.length;gf++){var hf=ef[gf],jf=hf.toLowerCase(),kf=hf[0].toUpperCase()+hf.slice(1);ff(jf,"on"+kf)}ff($e,"onAnimationEnd");ff(af,"onAnimationIteration");ff(bf,"onAnimationStart");ff("dblclick","onDoubleClick");ff("focusin","onFocus");ff("focusout","onBlur");ff(cf,"onTransitionEnd");ha("onMouseEnter",["mouseout","mouseover"]);ha("onMouseLeave",["mouseout","mouseover"]);ha("onPointerEnter",["pointerout","pointerover"]);ha("onPointerLeave",["pointerout","pointerover"]);fa("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));fa("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));fa("onBeforeInput",["compositionend","keypress","textInput","paste"]);fa("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));fa("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));fa("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var lf="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),mf=new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));function nf(e,a,s){var i=e.type||"unknown-event";e.currentTarget=s,Ub(i,a,void 0,e),e.currentTarget=null}function se(e,a){a=(a&4)!==0;for(var s=0;s<e.length;s++){var i=e[s],o=i.event;i=i.listeners;e:{var c=void 0;if(a)for(var g=i.length-1;0<=g;g--){var d=i[g],h=d.instance,j=d.currentTarget;if(d=d.listener,h!==c&&o.isPropagationStopped())break e;nf(o,d,j),c=h}else for(g=0;g<i.length;g++){if(d=i[g],h=d.instance,j=d.currentTarget,d=d.listener,h!==c&&o.isPropagationStopped())break e;nf(o,d,j),c=h}}}if(Qb)throw e=Rb,Qb=!1,Rb=null,e}function D(e,a){var s=a[of];s===void 0&&(s=a[of]=new Set);var i=e+"__bubble";s.has(i)||(pf(a,e,2,!1),s.add(i))}function qf(e,a,s){var i=0;a&&(i|=4),pf(s,e,i,a)}var rf="_reactListening"+Math.random().toString(36).slice(2);function sf(e){if(!e[rf]){e[rf]=!0,da.forEach(function(s){s!=="selectionchange"&&(mf.has(s)||qf(s,!1,e),qf(s,!0,e))});var a=e.nodeType===9?e:e.ownerDocument;a===null||a[rf]||(a[rf]=!0,qf("selectionchange",!1,a))}}function pf(e,a,s,i){switch(jd(a)){case 1:var o=ed;break;case 4:o=gd;break;default:o=fd}s=o.bind(null,a,s,e),o=void 0,!Lb||a!=="touchstart"&&a!=="touchmove"&&a!=="wheel"||(o=!0),i?o!==void 0?e.addEventListener(a,s,{capture:!0,passive:o}):e.addEventListener(a,s,!0):o!==void 0?e.addEventListener(a,s,{passive:o}):e.addEventListener(a,s,!1)}function hd(e,a,s,i,o){var c=i;if(!(a&1)&&!(a&2)&&i!==null)e:for(;;){if(i===null)return;var g=i.tag;if(g===3||g===4){var d=i.stateNode.containerInfo;if(d===o||d.nodeType===8&&d.parentNode===o)break;if(g===4)for(g=i.return;g!==null;){var h=g.tag;if((h===3||h===4)&&(h=g.stateNode.containerInfo,h===o||h.nodeType===8&&h.parentNode===o))return;g=g.return}for(;d!==null;){if(g=Wc(d),g===null)return;if(h=g.tag,h===5||h===6){i=c=g;continue e}d=d.parentNode}}i=i.return}Jb(function(){var j=c,en=xb(s),nn=[];e:{var _e=df.get(e);if(_e!==void 0){var tn=td,sn=e;switch(e){case"keypress":if(od(s)===0)break e;case"keydown":case"keyup":tn=Rd;break;case"focusin":sn="focus",tn=Fd;break;case"focusout":sn="blur",tn=Fd;break;case"beforeblur":case"afterblur":tn=Fd;break;case"click":if(s.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":tn=Bd;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":tn=Dd;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":tn=Vd;break;case $e:case af:case bf:tn=Hd;break;case cf:tn=Xd;break;case"scroll":tn=vd;break;case"wheel":tn=Zd;break;case"copy":case"cut":case"paste":tn=Jd;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":tn=Td}var ln=(a&4)!==0,Tn=!ln&&e==="scroll",b=ln?_e!==null?_e+"Capture":null:_e;ln=[];for(var _=j,$;_!==null;){$=_;var an=$.stateNode;if($.tag===5&&an!==null&&($=an,b!==null&&(an=Kb(_,b),an!=null&&ln.push(tf(_,an,$)))),Tn)break;_=_.return}0<ln.length&&(_e=new tn(_e,sn,null,s,en),nn.push({event:_e,listeners:ln}))}}if(!(a&7)){e:{if(_e=e==="mouseover"||e==="pointerover",tn=e==="mouseout"||e==="pointerout",_e&&s!==wb&&(sn=s.relatedTarget||s.fromElement)&&(Wc(sn)||sn[uf]))break e;if((tn||_e)&&(_e=en.window===en?en:(_e=en.ownerDocument)?_e.defaultView||_e.parentWindow:window,tn?(sn=s.relatedTarget||s.toElement,tn=j,sn=sn?Wc(sn):null,sn!==null&&(Tn=Vb(sn),sn!==Tn||sn.tag!==5&&sn.tag!==6)&&(sn=null)):(tn=null,sn=j),tn!==sn)){if(ln=Bd,an="onMouseLeave",b="onMouseEnter",_="mouse",(e==="pointerout"||e==="pointerover")&&(ln=Td,an="onPointerLeave",b="onPointerEnter",_="pointer"),Tn=tn==null?_e:ue(tn),$=sn==null?_e:ue(sn),_e=new ln(an,_+"leave",tn,s,en),_e.target=Tn,_e.relatedTarget=$,an=null,Wc(en)===j&&(ln=new ln(b,_+"enter",sn,s,en),ln.target=$,ln.relatedTarget=Tn,an=ln),Tn=an,tn&&sn)n:{for(ln=tn,b=sn,_=0,$=ln;$;$=vf($))_++;for($=0,an=b;an;an=vf(an))$++;for(;0<_-$;)ln=vf(ln),_--;for(;0<$-_;)b=vf(b),$--;for(;_--;){if(ln===b||b!==null&&ln===b.alternate)break n;ln=vf(ln),b=vf(b)}ln=null}else ln=null;tn!==null&&wf(nn,_e,tn,ln,!1),sn!==null&&Tn!==null&&wf(nn,Tn,sn,ln,!0)}}e:{if(_e=j?ue(j):window,tn=_e.nodeName&&_e.nodeName.toLowerCase(),tn==="select"||tn==="input"&&_e.type==="file")var on=ve;else if(me(_e))if(we)on=Fe;else{on=De;var cn=Ce}else(tn=_e.nodeName)&&tn.toLowerCase()==="input"&&(_e.type==="checkbox"||_e.type==="radio")&&(on=Ee);if(on&&(on=on(e,j))){ne(nn,on,s,en);break e}cn&&cn(e,_e,j),e==="focusout"&&(cn=_e._wrapperState)&&cn.controlled&&_e.type==="number"&&cb(_e,"number",_e.value)}switch(cn=j?ue(j):window,e){case"focusin":(me(cn)||cn.contentEditable==="true")&&(Qe=cn,Re=j,Se=null);break;case"focusout":Se=Re=Qe=null;break;case"mousedown":Te=!0;break;case"contextmenu":case"mouseup":case"dragend":Te=!1,Ue(nn,s,en);break;case"selectionchange":if(Pe)break;case"keydown":case"keyup":Ue(nn,s,en)}var gn;if(ae)e:{switch(e){case"compositionstart":var dn="onCompositionStart";break e;case"compositionend":dn="onCompositionEnd";break e;case"compositionupdate":dn="onCompositionUpdate";break e}dn=void 0}else ie?ge(e,s)&&(dn="onCompositionEnd"):e==="keydown"&&s.keyCode===229&&(dn="onCompositionStart");dn&&(de&&s.locale!=="ko"&&(ie||dn!=="onCompositionStart"?dn==="onCompositionEnd"&&ie&&(gn=nd()):(kd=en,ld="value"in kd?kd.value:kd.textContent,ie=!0)),cn=oe(j,dn),0<cn.length&&(dn=new Ld(dn,e,null,s,en),nn.push({event:dn,listeners:cn}),gn?dn.data=gn:(gn=he(s),gn!==null&&(dn.data=gn)))),(gn=ce?je(e,s):ke(e,s))&&(j=oe(j,"onBeforeInput"),0<j.length&&(en=new Ld("onBeforeInput","beforeinput",null,s,en),nn.push({event:en,listeners:j}),en.data=gn))}se(nn,a)})}function tf(e,a,s){return{instance:e,listener:a,currentTarget:s}}function oe(e,a){for(var s=a+"Capture",i=[];e!==null;){var o=e,c=o.stateNode;o.tag===5&&c!==null&&(o=c,c=Kb(e,s),c!=null&&i.unshift(tf(e,c,o)),c=Kb(e,a),c!=null&&i.push(tf(e,c,o))),e=e.return}return i}function vf(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function wf(e,a,s,i,o){for(var c=a._reactName,g=[];s!==null&&s!==i;){var d=s,h=d.alternate,j=d.stateNode;if(h!==null&&h===i)break;d.tag===5&&j!==null&&(d=j,o?(h=Kb(s,c),h!=null&&g.unshift(tf(s,h,d))):o||(h=Kb(s,c),h!=null&&g.push(tf(s,h,d)))),s=s.return}g.length!==0&&e.push({event:a,listeners:g})}var xf=/\r\n?/g,yf=/\u0000|\uFFFD/g;function zf(e){return(typeof e=="string"?e:""+e).replace(xf,`
`).replace(yf,"")}function Af(e,a,s){if(a=zf(a),zf(e)!==a&&s)throw Error(p(425))}function Bf(){}var Cf=null,Df=null;function Ef(e,a){return e==="textarea"||e==="noscript"||typeof a.children=="string"||typeof a.children=="number"||typeof a.dangerouslySetInnerHTML=="object"&&a.dangerouslySetInnerHTML!==null&&a.dangerouslySetInnerHTML.__html!=null}var Ff=typeof setTimeout=="function"?setTimeout:void 0,Gf=typeof clearTimeout=="function"?clearTimeout:void 0,Hf=typeof Promise=="function"?Promise:void 0,Jf=typeof queueMicrotask=="function"?queueMicrotask:typeof Hf<"u"?function(e){return Hf.resolve(null).then(e).catch(If)}:Ff;function If(e){setTimeout(function(){throw e})}function Kf(e,a){var s=a,i=0;do{var o=s.nextSibling;if(e.removeChild(s),o&&o.nodeType===8)if(s=o.data,s==="/$"){if(i===0){e.removeChild(o),bd(a);return}i--}else s!=="$"&&s!=="$?"&&s!=="$!"||i++;s=o}while(s);bd(a)}function Lf(e){for(;e!=null;e=e.nextSibling){var a=e.nodeType;if(a===1||a===3)break;if(a===8){if(a=e.data,a==="$"||a==="$!"||a==="$?")break;if(a==="/$")return null}}return e}function Mf(e){e=e.previousSibling;for(var a=0;e;){if(e.nodeType===8){var s=e.data;if(s==="$"||s==="$!"||s==="$?"){if(a===0)return e;a--}else s==="/$"&&a++}e=e.previousSibling}return null}var Nf=Math.random().toString(36).slice(2),Of="__reactFiber$"+Nf,Pf="__reactProps$"+Nf,uf="__reactContainer$"+Nf,of="__reactEvents$"+Nf,Qf="__reactListeners$"+Nf,Rf="__reactHandles$"+Nf;function Wc(e){var a=e[Of];if(a)return a;for(var s=e.parentNode;s;){if(a=s[uf]||s[Of]){if(s=a.alternate,a.child!==null||s!==null&&s.child!==null)for(e=Mf(e);e!==null;){if(s=e[Of])return s;e=Mf(e)}return a}e=s,s=e.parentNode}return null}function Cb(e){return e=e[Of]||e[uf],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function ue(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(p(33))}function Db(e){return e[Pf]||null}var Sf=[],Tf=-1;function Uf(e){return{current:e}}function E(e){0>Tf||(e.current=Sf[Tf],Sf[Tf]=null,Tf--)}function G(e,a){Tf++,Sf[Tf]=e.current,e.current=a}var Vf={},H=Uf(Vf),Wf=Uf(!1),Xf=Vf;function Yf(e,a){var s=e.type.contextTypes;if(!s)return Vf;var i=e.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===a)return i.__reactInternalMemoizedMaskedChildContext;var o={},c;for(c in s)o[c]=a[c];return i&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=a,e.__reactInternalMemoizedMaskedChildContext=o),o}function Zf(e){return e=e.childContextTypes,e!=null}function $f(){E(Wf),E(H)}function ag(e,a,s){if(H.current!==Vf)throw Error(p(168));G(H,a),G(Wf,s)}function bg(e,a,s){var i=e.stateNode;if(a=a.childContextTypes,typeof i.getChildContext!="function")return s;i=i.getChildContext();for(var o in i)if(!(o in a))throw Error(p(108,Ra(e)||"Unknown",o));return A({},s,i)}function cg(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Vf,Xf=H.current,G(H,e),G(Wf,Wf.current),!0}function dg(e,a,s){var i=e.stateNode;if(!i)throw Error(p(169));s?(e=bg(e,a,Xf),i.__reactInternalMemoizedMergedChildContext=e,E(Wf),E(H),G(H,e)):E(Wf),G(Wf,s)}var eg=null,fg=!1,gg=!1;function hg(e){eg===null?eg=[e]:eg.push(e)}function ig(e){fg=!0,hg(e)}function jg(){if(!gg&&eg!==null){gg=!0;var e=0,a=C;try{var s=eg;for(C=1;e<s.length;e++){var i=s[e];do i=i(!0);while(i!==null)}eg=null,fg=!1}catch(o){throw eg!==null&&(eg=eg.slice(e+1)),ac(fc,jg),o}finally{C=a,gg=!1}}return null}var kg=[],lg=0,mg=null,ng=0,og=[],pg=0,qg=null,rg=1,sg="";function tg(e,a){kg[lg++]=ng,kg[lg++]=mg,mg=e,ng=a}function ug(e,a,s){og[pg++]=rg,og[pg++]=sg,og[pg++]=qg,qg=e;var i=rg;e=sg;var o=32-oc(i)-1;i&=~(1<<o),s+=1;var c=32-oc(a)+o;if(30<c){var g=o-o%5;c=(i&(1<<g)-1).toString(32),i>>=g,o-=g,rg=1<<32-oc(a)+o|s<<o|i,sg=c+e}else rg=1<<c|s<<o|i,sg=e}function vg(e){e.return!==null&&(tg(e,1),ug(e,1,0))}function wg(e){for(;e===mg;)mg=kg[--lg],kg[lg]=null,ng=kg[--lg],kg[lg]=null;for(;e===qg;)qg=og[--pg],og[pg]=null,sg=og[--pg],og[pg]=null,rg=og[--pg],og[pg]=null}var xg=null,yg=null,I=!1,zg=null;function Ag(e,a){var s=Bg(5,null,null,0);s.elementType="DELETED",s.stateNode=a,s.return=e,a=e.deletions,a===null?(e.deletions=[s],e.flags|=16):a.push(s)}function Cg(e,a){switch(e.tag){case 5:var s=e.type;return a=a.nodeType!==1||s.toLowerCase()!==a.nodeName.toLowerCase()?null:a,a!==null?(e.stateNode=a,xg=e,yg=Lf(a.firstChild),!0):!1;case 6:return a=e.pendingProps===""||a.nodeType!==3?null:a,a!==null?(e.stateNode=a,xg=e,yg=null,!0):!1;case 13:return a=a.nodeType!==8?null:a,a!==null?(s=qg!==null?{id:rg,overflow:sg}:null,e.memoizedState={dehydrated:a,treeContext:s,retryLane:1073741824},s=Bg(18,null,null,0),s.stateNode=a,s.return=e,e.child=s,xg=e,yg=null,!0):!1;default:return!1}}function Dg(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Eg(e){if(I){var a=yg;if(a){var s=a;if(!Cg(e,a)){if(Dg(e))throw Error(p(418));a=Lf(s.nextSibling);var i=xg;a&&Cg(e,a)?Ag(i,s):(e.flags=e.flags&-4097|2,I=!1,xg=e)}}else{if(Dg(e))throw Error(p(418));e.flags=e.flags&-4097|2,I=!1,xg=e}}}function Fg(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;xg=e}function Gg(e){if(e!==xg)return!1;if(!I)return Fg(e),I=!0,!1;var a;if((a=e.tag!==3)&&!(a=e.tag!==5)&&(a=e.type,a=a!=="head"&&a!=="body"&&!Ef(e.type,e.memoizedProps)),a&&(a=yg)){if(Dg(e))throw Hg(),Error(p(418));for(;a;)Ag(e,a),a=Lf(a.nextSibling)}if(Fg(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(p(317));e:{for(e=e.nextSibling,a=0;e;){if(e.nodeType===8){var s=e.data;if(s==="/$"){if(a===0){yg=Lf(e.nextSibling);break e}a--}else s!=="$"&&s!=="$!"&&s!=="$?"||a++}e=e.nextSibling}yg=null}}else yg=xg?Lf(e.stateNode.nextSibling):null;return!0}function Hg(){for(var e=yg;e;)e=Lf(e.nextSibling)}function Ig(){yg=xg=null,I=!1}function Jg(e){zg===null?zg=[e]:zg.push(e)}var Kg=ua.ReactCurrentBatchConfig;function Lg(e,a,s){if(e=s.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(s._owner){if(s=s._owner,s){if(s.tag!==1)throw Error(p(309));var i=s.stateNode}if(!i)throw Error(p(147,e));var o=i,c=""+e;return a!==null&&a.ref!==null&&typeof a.ref=="function"&&a.ref._stringRef===c?a.ref:(a=function(g){var d=o.refs;g===null?delete d[c]:d[c]=g},a._stringRef=c,a)}if(typeof e!="string")throw Error(p(284));if(!s._owner)throw Error(p(290,e))}return e}function Mg(e,a){throw e=Object.prototype.toString.call(a),Error(p(31,e==="[object Object]"?"object with keys {"+Object.keys(a).join(", ")+"}":e))}function Ng(e){var a=e._init;return a(e._payload)}function Og(e){function a(b,_){if(e){var $=b.deletions;$===null?(b.deletions=[_],b.flags|=16):$.push(_)}}function s(b,_){if(!e)return null;for(;_!==null;)a(b,_),_=_.sibling;return null}function i(b,_){for(b=new Map;_!==null;)_.key!==null?b.set(_.key,_):b.set(_.index,_),_=_.sibling;return b}function o(b,_){return b=Pg(b,_),b.index=0,b.sibling=null,b}function c(b,_,$){return b.index=$,e?($=b.alternate,$!==null?($=$.index,$<_?(b.flags|=2,_):$):(b.flags|=2,_)):(b.flags|=1048576,_)}function g(b){return e&&b.alternate===null&&(b.flags|=2),b}function d(b,_,$,an){return _===null||_.tag!==6?(_=Qg($,b.mode,an),_.return=b,_):(_=o(_,$),_.return=b,_)}function h(b,_,$,an){var on=$.type;return on===ya?en(b,_,$.props.children,an,$.key):_!==null&&(_.elementType===on||typeof on=="object"&&on!==null&&on.$$typeof===Ha&&Ng(on)===_.type)?(an=o(_,$.props),an.ref=Lg(b,_,$),an.return=b,an):(an=Rg($.type,$.key,$.props,null,b.mode,an),an.ref=Lg(b,_,$),an.return=b,an)}function j(b,_,$,an){return _===null||_.tag!==4||_.stateNode.containerInfo!==$.containerInfo||_.stateNode.implementation!==$.implementation?(_=Sg($,b.mode,an),_.return=b,_):(_=o(_,$.children||[]),_.return=b,_)}function en(b,_,$,an,on){return _===null||_.tag!==7?(_=Tg($,b.mode,an,on),_.return=b,_):(_=o(_,$),_.return=b,_)}function nn(b,_,$){if(typeof _=="string"&&_!==""||typeof _=="number")return _=Qg(""+_,b.mode,$),_.return=b,_;if(typeof _=="object"&&_!==null){switch(_.$$typeof){case va:return $=Rg(_.type,_.key,_.props,null,b.mode,$),$.ref=Lg(b,null,_),$.return=b,$;case wa:return _=Sg(_,b.mode,$),_.return=b,_;case Ha:var an=_._init;return nn(b,an(_._payload),$)}if(eb(_)||Ka(_))return _=Tg(_,b.mode,$,null),_.return=b,_;Mg(b,_)}return null}function _e(b,_,$,an){var on=_!==null?_.key:null;if(typeof $=="string"&&$!==""||typeof $=="number")return on!==null?null:d(b,_,""+$,an);if(typeof $=="object"&&$!==null){switch($.$$typeof){case va:return $.key===on?h(b,_,$,an):null;case wa:return $.key===on?j(b,_,$,an):null;case Ha:return on=$._init,_e(b,_,on($._payload),an)}if(eb($)||Ka($))return on!==null?null:en(b,_,$,an,null);Mg(b,$)}return null}function tn(b,_,$,an,on){if(typeof an=="string"&&an!==""||typeof an=="number")return b=b.get($)||null,d(_,b,""+an,on);if(typeof an=="object"&&an!==null){switch(an.$$typeof){case va:return b=b.get(an.key===null?$:an.key)||null,h(_,b,an,on);case wa:return b=b.get(an.key===null?$:an.key)||null,j(_,b,an,on);case Ha:var cn=an._init;return tn(b,_,$,cn(an._payload),on)}if(eb(an)||Ka(an))return b=b.get($)||null,en(_,b,an,on,null);Mg(_,an)}return null}function sn(b,_,$,an){for(var on=null,cn=null,gn=_,dn=_=0,Sn=null;gn!==null&&dn<$.length;dn++){gn.index>dn?(Sn=gn,gn=null):Sn=gn.sibling;var mn=_e(b,gn,$[dn],an);if(mn===null){gn===null&&(gn=Sn);break}e&&gn&&mn.alternate===null&&a(b,gn),_=c(mn,_,dn),cn===null?on=mn:cn.sibling=mn,cn=mn,gn=Sn}if(dn===$.length)return s(b,gn),I&&tg(b,dn),on;if(gn===null){for(;dn<$.length;dn++)gn=nn(b,$[dn],an),gn!==null&&(_=c(gn,_,dn),cn===null?on=gn:cn.sibling=gn,cn=gn);return I&&tg(b,dn),on}for(gn=i(b,gn);dn<$.length;dn++)Sn=tn(gn,b,dn,$[dn],an),Sn!==null&&(e&&Sn.alternate!==null&&gn.delete(Sn.key===null?dn:Sn.key),_=c(Sn,_,dn),cn===null?on=Sn:cn.sibling=Sn,cn=Sn);return e&&gn.forEach(function(Cn){return a(b,Cn)}),I&&tg(b,dn),on}function ln(b,_,$,an){var on=Ka($);if(typeof on!="function")throw Error(p(150));if($=on.call($),$==null)throw Error(p(151));for(var cn=on=null,gn=_,dn=_=0,Sn=null,mn=$.next();gn!==null&&!mn.done;dn++,mn=$.next()){gn.index>dn?(Sn=gn,gn=null):Sn=gn.sibling;var Cn=_e(b,gn,mn.value,an);if(Cn===null){gn===null&&(gn=Sn);break}e&&gn&&Cn.alternate===null&&a(b,gn),_=c(Cn,_,dn),cn===null?on=Cn:cn.sibling=Cn,cn=Cn,gn=Sn}if(mn.done)return s(b,gn),I&&tg(b,dn),on;if(gn===null){for(;!mn.done;dn++,mn=$.next())mn=nn(b,mn.value,an),mn!==null&&(_=c(mn,_,dn),cn===null?on=mn:cn.sibling=mn,cn=mn);return I&&tg(b,dn),on}for(gn=i(b,gn);!mn.done;dn++,mn=$.next())mn=tn(gn,b,dn,mn.value,an),mn!==null&&(e&&mn.alternate!==null&&gn.delete(mn.key===null?dn:mn.key),_=c(mn,_,dn),cn===null?on=mn:cn.sibling=mn,cn=mn);return e&&gn.forEach(function(Wn){return a(b,Wn)}),I&&tg(b,dn),on}function Tn(b,_,$,an){if(typeof $=="object"&&$!==null&&$.type===ya&&$.key===null&&($=$.props.children),typeof $=="object"&&$!==null){switch($.$$typeof){case va:e:{for(var on=$.key,cn=_;cn!==null;){if(cn.key===on){if(on=$.type,on===ya){if(cn.tag===7){s(b,cn.sibling),_=o(cn,$.props.children),_.return=b,b=_;break e}}else if(cn.elementType===on||typeof on=="object"&&on!==null&&on.$$typeof===Ha&&Ng(on)===cn.type){s(b,cn.sibling),_=o(cn,$.props),_.ref=Lg(b,cn,$),_.return=b,b=_;break e}s(b,cn);break}else a(b,cn);cn=cn.sibling}$.type===ya?(_=Tg($.props.children,b.mode,an,$.key),_.return=b,b=_):(an=Rg($.type,$.key,$.props,null,b.mode,an),an.ref=Lg(b,_,$),an.return=b,b=an)}return g(b);case wa:e:{for(cn=$.key;_!==null;){if(_.key===cn)if(_.tag===4&&_.stateNode.containerInfo===$.containerInfo&&_.stateNode.implementation===$.implementation){s(b,_.sibling),_=o(_,$.children||[]),_.return=b,b=_;break e}else{s(b,_);break}else a(b,_);_=_.sibling}_=Sg($,b.mode,an),_.return=b,b=_}return g(b);case Ha:return cn=$._init,Tn(b,_,cn($._payload),an)}if(eb($))return sn(b,_,$,an);if(Ka($))return ln(b,_,$,an);Mg(b,$)}return typeof $=="string"&&$!==""||typeof $=="number"?($=""+$,_!==null&&_.tag===6?(s(b,_.sibling),_=o(_,$),_.return=b,b=_):(s(b,_),_=Qg($,b.mode,an),_.return=b,b=_),g(b)):s(b,_)}return Tn}var Ug=Og(!0),Vg=Og(!1),Wg=Uf(null),Xg=null,Yg=null,Zg=null;function $g(){Zg=Yg=Xg=null}function ah(e){var a=Wg.current;E(Wg),e._currentValue=a}function bh(e,a,s){for(;e!==null;){var i=e.alternate;if((e.childLanes&a)!==a?(e.childLanes|=a,i!==null&&(i.childLanes|=a)):i!==null&&(i.childLanes&a)!==a&&(i.childLanes|=a),e===s)break;e=e.return}}function ch(e,a){Xg=e,Zg=Yg=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&a&&(dh=!0),e.firstContext=null)}function eh(e){var a=e._currentValue;if(Zg!==e)if(e={context:e,memoizedValue:a,next:null},Yg===null){if(Xg===null)throw Error(p(308));Yg=e,Xg.dependencies={lanes:0,firstContext:e}}else Yg=Yg.next=e;return a}var fh=null;function gh(e){fh===null?fh=[e]:fh.push(e)}function hh(e,a,s,i){var o=a.interleaved;return o===null?(s.next=s,gh(a)):(s.next=o.next,o.next=s),a.interleaved=s,ih(e,i)}function ih(e,a){e.lanes|=a;var s=e.alternate;for(s!==null&&(s.lanes|=a),s=e,e=e.return;e!==null;)e.childLanes|=a,s=e.alternate,s!==null&&(s.childLanes|=a),s=e,e=e.return;return s.tag===3?s.stateNode:null}var jh=!1;function kh(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function lh(e,a){e=e.updateQueue,a.updateQueue===e&&(a.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function mh(e,a){return{eventTime:e,lane:a,tag:0,payload:null,callback:null,next:null}}function nh(e,a,s){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,K&2){var o=i.pending;return o===null?a.next=a:(a.next=o.next,o.next=a),i.pending=a,ih(e,s)}return o=i.interleaved,o===null?(a.next=a,gh(i)):(a.next=o.next,o.next=a),i.interleaved=a,ih(e,s)}function oh(e,a,s){if(a=a.updateQueue,a!==null&&(a=a.shared,(s&4194240)!==0)){var i=a.lanes;i&=e.pendingLanes,s|=i,a.lanes=s,Cc(e,s)}}function ph(e,a){var s=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,s===i)){var o=null,c=null;if(s=s.firstBaseUpdate,s!==null){do{var g={eventTime:s.eventTime,lane:s.lane,tag:s.tag,payload:s.payload,callback:s.callback,next:null};c===null?o=c=g:c=c.next=g,s=s.next}while(s!==null);c===null?o=c=a:c=c.next=a}else o=c=a;s={baseState:i.baseState,firstBaseUpdate:o,lastBaseUpdate:c,shared:i.shared,effects:i.effects},e.updateQueue=s;return}e=s.lastBaseUpdate,e===null?s.firstBaseUpdate=a:e.next=a,s.lastBaseUpdate=a}function qh(e,a,s,i){var o=e.updateQueue;jh=!1;var c=o.firstBaseUpdate,g=o.lastBaseUpdate,d=o.shared.pending;if(d!==null){o.shared.pending=null;var h=d,j=h.next;h.next=null,g===null?c=j:g.next=j,g=h;var en=e.alternate;en!==null&&(en=en.updateQueue,d=en.lastBaseUpdate,d!==g&&(d===null?en.firstBaseUpdate=j:d.next=j,en.lastBaseUpdate=h))}if(c!==null){var nn=o.baseState;g=0,en=j=h=null,d=c;do{var _e=d.lane,tn=d.eventTime;if((i&_e)===_e){en!==null&&(en=en.next={eventTime:tn,lane:0,tag:d.tag,payload:d.payload,callback:d.callback,next:null});e:{var sn=e,ln=d;switch(_e=a,tn=s,ln.tag){case 1:if(sn=ln.payload,typeof sn=="function"){nn=sn.call(tn,nn,_e);break e}nn=sn;break e;case 3:sn.flags=sn.flags&-65537|128;case 0:if(sn=ln.payload,_e=typeof sn=="function"?sn.call(tn,nn,_e):sn,_e==null)break e;nn=A({},nn,_e);break e;case 2:jh=!0}}d.callback!==null&&d.lane!==0&&(e.flags|=64,_e=o.effects,_e===null?o.effects=[d]:_e.push(d))}else tn={eventTime:tn,lane:_e,tag:d.tag,payload:d.payload,callback:d.callback,next:null},en===null?(j=en=tn,h=nn):en=en.next=tn,g|=_e;if(d=d.next,d===null){if(d=o.shared.pending,d===null)break;_e=d,d=_e.next,_e.next=null,o.lastBaseUpdate=_e,o.shared.pending=null}}while(!0);if(en===null&&(h=nn),o.baseState=h,o.firstBaseUpdate=j,o.lastBaseUpdate=en,a=o.shared.interleaved,a!==null){o=a;do g|=o.lane,o=o.next;while(o!==a)}else c===null&&(o.shared.lanes=0);rh|=g,e.lanes=g,e.memoizedState=nn}}function sh(e,a,s){if(e=a.effects,a.effects=null,e!==null)for(a=0;a<e.length;a++){var i=e[a],o=i.callback;if(o!==null){if(i.callback=null,i=s,typeof o!="function")throw Error(p(191,o));o.call(i)}}}var th={},uh=Uf(th),vh=Uf(th),wh=Uf(th);function xh(e){if(e===th)throw Error(p(174));return e}function yh(e,a){switch(G(wh,a),G(vh,e),G(uh,th),e=a.nodeType,e){case 9:case 11:a=(a=a.documentElement)?a.namespaceURI:lb(null,"");break;default:e=e===8?a.parentNode:a,a=e.namespaceURI||null,e=e.tagName,a=lb(a,e)}E(uh),G(uh,a)}function zh(){E(uh),E(vh),E(wh)}function Ah(e){xh(wh.current);var a=xh(uh.current),s=lb(a,e.type);a!==s&&(G(vh,e),G(uh,s))}function Bh(e){vh.current===e&&(E(uh),E(vh))}var L=Uf(0);function Ch(e){for(var a=e;a!==null;){if(a.tag===13){var s=a.memoizedState;if(s!==null&&(s=s.dehydrated,s===null||s.data==="$?"||s.data==="$!"))return a}else if(a.tag===19&&a.memoizedProps.revealOrder!==void 0){if(a.flags&128)return a}else if(a.child!==null){a.child.return=a,a=a.child;continue}if(a===e)break;for(;a.sibling===null;){if(a.return===null||a.return===e)return null;a=a.return}a.sibling.return=a.return,a=a.sibling}return null}var Dh=[];function Eh(){for(var e=0;e<Dh.length;e++)Dh[e]._workInProgressVersionPrimary=null;Dh.length=0}var Fh=ua.ReactCurrentDispatcher,Gh=ua.ReactCurrentBatchConfig,Hh=0,M=null,N=null,O=null,Ih=!1,Jh=!1,Kh=0,Lh=0;function P(){throw Error(p(321))}function Mh(e,a){if(a===null)return!1;for(var s=0;s<a.length&&s<e.length;s++)if(!He(e[s],a[s]))return!1;return!0}function Nh(e,a,s,i,o,c){if(Hh=c,M=a,a.memoizedState=null,a.updateQueue=null,a.lanes=0,Fh.current=e===null||e.memoizedState===null?Oh:Ph,e=s(i,o),Jh){c=0;do{if(Jh=!1,Kh=0,25<=c)throw Error(p(301));c+=1,O=N=null,a.updateQueue=null,Fh.current=Qh,e=s(i,o)}while(Jh)}if(Fh.current=Rh,a=N!==null&&N.next!==null,Hh=0,O=N=M=null,Ih=!1,a)throw Error(p(300));return e}function Sh(){var e=Kh!==0;return Kh=0,e}function Th(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return O===null?M.memoizedState=O=e:O=O.next=e,O}function Uh(){if(N===null){var e=M.alternate;e=e!==null?e.memoizedState:null}else e=N.next;var a=O===null?M.memoizedState:O.next;if(a!==null)O=a,N=e;else{if(e===null)throw Error(p(310));N=e,e={memoizedState:N.memoizedState,baseState:N.baseState,baseQueue:N.baseQueue,queue:N.queue,next:null},O===null?M.memoizedState=O=e:O=O.next=e}return O}function Vh(e,a){return typeof a=="function"?a(e):a}function Wh(e){var a=Uh(),s=a.queue;if(s===null)throw Error(p(311));s.lastRenderedReducer=e;var i=N,o=i.baseQueue,c=s.pending;if(c!==null){if(o!==null){var g=o.next;o.next=c.next,c.next=g}i.baseQueue=o=c,s.pending=null}if(o!==null){c=o.next,i=i.baseState;var d=g=null,h=null,j=c;do{var en=j.lane;if((Hh&en)===en)h!==null&&(h=h.next={lane:0,action:j.action,hasEagerState:j.hasEagerState,eagerState:j.eagerState,next:null}),i=j.hasEagerState?j.eagerState:e(i,j.action);else{var nn={lane:en,action:j.action,hasEagerState:j.hasEagerState,eagerState:j.eagerState,next:null};h===null?(d=h=nn,g=i):h=h.next=nn,M.lanes|=en,rh|=en}j=j.next}while(j!==null&&j!==c);h===null?g=i:h.next=d,He(i,a.memoizedState)||(dh=!0),a.memoizedState=i,a.baseState=g,a.baseQueue=h,s.lastRenderedState=i}if(e=s.interleaved,e!==null){o=e;do c=o.lane,M.lanes|=c,rh|=c,o=o.next;while(o!==e)}else o===null&&(s.lanes=0);return[a.memoizedState,s.dispatch]}function Xh(e){var a=Uh(),s=a.queue;if(s===null)throw Error(p(311));s.lastRenderedReducer=e;var i=s.dispatch,o=s.pending,c=a.memoizedState;if(o!==null){s.pending=null;var g=o=o.next;do c=e(c,g.action),g=g.next;while(g!==o);He(c,a.memoizedState)||(dh=!0),a.memoizedState=c,a.baseQueue===null&&(a.baseState=c),s.lastRenderedState=c}return[c,i]}function Yh(){}function Zh(e,a){var s=M,i=Uh(),o=a(),c=!He(i.memoizedState,o);if(c&&(i.memoizedState=o,dh=!0),i=i.queue,$h(ai.bind(null,s,i,e),[e]),i.getSnapshot!==a||c||O!==null&&O.memoizedState.tag&1){if(s.flags|=2048,bi(9,ci.bind(null,s,i,o,a),void 0,null),Q===null)throw Error(p(349));Hh&30||di(s,a,o)}return o}function di(e,a,s){e.flags|=16384,e={getSnapshot:a,value:s},a=M.updateQueue,a===null?(a={lastEffect:null,stores:null},M.updateQueue=a,a.stores=[e]):(s=a.stores,s===null?a.stores=[e]:s.push(e))}function ci(e,a,s,i){a.value=s,a.getSnapshot=i,ei(a)&&fi(e)}function ai(e,a,s){return s(function(){ei(a)&&fi(e)})}function ei(e){var a=e.getSnapshot;e=e.value;try{var s=a();return!He(e,s)}catch{return!0}}function fi(e){var a=ih(e,1);a!==null&&gi(a,e,1,-1)}function hi(e){var a=Th();return typeof e=="function"&&(e=e()),a.memoizedState=a.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Vh,lastRenderedState:e},a.queue=e,e=e.dispatch=ii.bind(null,M,e),[a.memoizedState,e]}function bi(e,a,s,i){return e={tag:e,create:a,destroy:s,deps:i,next:null},a=M.updateQueue,a===null?(a={lastEffect:null,stores:null},M.updateQueue=a,a.lastEffect=e.next=e):(s=a.lastEffect,s===null?a.lastEffect=e.next=e:(i=s.next,s.next=e,e.next=i,a.lastEffect=e)),e}function ji(){return Uh().memoizedState}function ki(e,a,s,i){var o=Th();M.flags|=e,o.memoizedState=bi(1|a,s,void 0,i===void 0?null:i)}function li(e,a,s,i){var o=Uh();i=i===void 0?null:i;var c=void 0;if(N!==null){var g=N.memoizedState;if(c=g.destroy,i!==null&&Mh(i,g.deps)){o.memoizedState=bi(a,s,c,i);return}}M.flags|=e,o.memoizedState=bi(1|a,s,c,i)}function mi(e,a){return ki(8390656,8,e,a)}function $h(e,a){return li(2048,8,e,a)}function ni(e,a){return li(4,2,e,a)}function oi(e,a){return li(4,4,e,a)}function pi(e,a){if(typeof a=="function")return e=e(),a(e),function(){a(null)};if(a!=null)return e=e(),a.current=e,function(){a.current=null}}function qi(e,a,s){return s=s!=null?s.concat([e]):null,li(4,4,pi.bind(null,a,e),s)}function ri(){}function si(e,a){var s=Uh();a=a===void 0?null:a;var i=s.memoizedState;return i!==null&&a!==null&&Mh(a,i[1])?i[0]:(s.memoizedState=[e,a],e)}function ti(e,a){var s=Uh();a=a===void 0?null:a;var i=s.memoizedState;return i!==null&&a!==null&&Mh(a,i[1])?i[0]:(e=e(),s.memoizedState=[e,a],e)}function ui(e,a,s){return Hh&21?(He(s,a)||(s=yc(),M.lanes|=s,rh|=s,e.baseState=!0),a):(e.baseState&&(e.baseState=!1,dh=!0),e.memoizedState=s)}function vi(e,a){var s=C;C=s!==0&&4>s?s:4,e(!0);var i=Gh.transition;Gh.transition={};try{e(!1),a()}finally{C=s,Gh.transition=i}}function wi(){return Uh().memoizedState}function xi(e,a,s){var i=yi(e);if(s={lane:i,action:s,hasEagerState:!1,eagerState:null,next:null},zi(e))Ai(a,s);else if(s=hh(e,a,s,i),s!==null){var o=R();gi(s,e,i,o),Bi(s,a,i)}}function ii(e,a,s){var i=yi(e),o={lane:i,action:s,hasEagerState:!1,eagerState:null,next:null};if(zi(e))Ai(a,o);else{var c=e.alternate;if(e.lanes===0&&(c===null||c.lanes===0)&&(c=a.lastRenderedReducer,c!==null))try{var g=a.lastRenderedState,d=c(g,s);if(o.hasEagerState=!0,o.eagerState=d,He(d,g)){var h=a.interleaved;h===null?(o.next=o,gh(a)):(o.next=h.next,h.next=o),a.interleaved=o;return}}catch{}finally{}s=hh(e,a,o,i),s!==null&&(o=R(),gi(s,e,i,o),Bi(s,a,i))}}function zi(e){var a=e.alternate;return e===M||a!==null&&a===M}function Ai(e,a){Jh=Ih=!0;var s=e.pending;s===null?a.next=a:(a.next=s.next,s.next=a),e.pending=a}function Bi(e,a,s){if(s&4194240){var i=a.lanes;i&=e.pendingLanes,s|=i,a.lanes=s,Cc(e,s)}}var Rh={readContext:eh,useCallback:P,useContext:P,useEffect:P,useImperativeHandle:P,useInsertionEffect:P,useLayoutEffect:P,useMemo:P,useReducer:P,useRef:P,useState:P,useDebugValue:P,useDeferredValue:P,useTransition:P,useMutableSource:P,useSyncExternalStore:P,useId:P,unstable_isNewReconciler:!1},Oh={readContext:eh,useCallback:function(e,a){return Th().memoizedState=[e,a===void 0?null:a],e},useContext:eh,useEffect:mi,useImperativeHandle:function(e,a,s){return s=s!=null?s.concat([e]):null,ki(4194308,4,pi.bind(null,a,e),s)},useLayoutEffect:function(e,a){return ki(4194308,4,e,a)},useInsertionEffect:function(e,a){return ki(4,2,e,a)},useMemo:function(e,a){var s=Th();return a=a===void 0?null:a,e=e(),s.memoizedState=[e,a],e},useReducer:function(e,a,s){var i=Th();return a=s!==void 0?s(a):a,i.memoizedState=i.baseState=a,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:a},i.queue=e,e=e.dispatch=xi.bind(null,M,e),[i.memoizedState,e]},useRef:function(e){var a=Th();return e={current:e},a.memoizedState=e},useState:hi,useDebugValue:ri,useDeferredValue:function(e){return Th().memoizedState=e},useTransition:function(){var e=hi(!1),a=e[0];return e=vi.bind(null,e[1]),Th().memoizedState=e,[a,e]},useMutableSource:function(){},useSyncExternalStore:function(e,a,s){var i=M,o=Th();if(I){if(s===void 0)throw Error(p(407));s=s()}else{if(s=a(),Q===null)throw Error(p(349));Hh&30||di(i,a,s)}o.memoizedState=s;var c={value:s,getSnapshot:a};return o.queue=c,mi(ai.bind(null,i,c,e),[e]),i.flags|=2048,bi(9,ci.bind(null,i,c,s,a),void 0,null),s},useId:function(){var e=Th(),a=Q.identifierPrefix;if(I){var s=sg,i=rg;s=(i&~(1<<32-oc(i)-1)).toString(32)+s,a=":"+a+"R"+s,s=Kh++,0<s&&(a+="H"+s.toString(32)),a+=":"}else s=Lh++,a=":"+a+"r"+s.toString(32)+":";return e.memoizedState=a},unstable_isNewReconciler:!1},Ph={readContext:eh,useCallback:si,useContext:eh,useEffect:$h,useImperativeHandle:qi,useInsertionEffect:ni,useLayoutEffect:oi,useMemo:ti,useReducer:Wh,useRef:ji,useState:function(){return Wh(Vh)},useDebugValue:ri,useDeferredValue:function(e){var a=Uh();return ui(a,N.memoizedState,e)},useTransition:function(){var e=Wh(Vh)[0],a=Uh().memoizedState;return[e,a]},useMutableSource:Yh,useSyncExternalStore:Zh,useId:wi,unstable_isNewReconciler:!1},Qh={readContext:eh,useCallback:si,useContext:eh,useEffect:$h,useImperativeHandle:qi,useInsertionEffect:ni,useLayoutEffect:oi,useMemo:ti,useReducer:Xh,useRef:ji,useState:function(){return Xh(Vh)},useDebugValue:ri,useDeferredValue:function(e){var a=Uh();return N===null?a.memoizedState=e:ui(a,N.memoizedState,e)},useTransition:function(){var e=Xh(Vh)[0],a=Uh().memoizedState;return[e,a]},useMutableSource:Yh,useSyncExternalStore:Zh,useId:wi,unstable_isNewReconciler:!1};function Ci(e,a){if(e&&e.defaultProps){a=A({},a),e=e.defaultProps;for(var s in e)a[s]===void 0&&(a[s]=e[s]);return a}return a}function Di(e,a,s,i){a=e.memoizedState,s=s(i,a),s=s==null?a:A({},a,s),e.memoizedState=s,e.lanes===0&&(e.updateQueue.baseState=s)}var Ei={isMounted:function(e){return(e=e._reactInternals)?Vb(e)===e:!1},enqueueSetState:function(e,a,s){e=e._reactInternals;var i=R(),o=yi(e),c=mh(i,o);c.payload=a,s!=null&&(c.callback=s),a=nh(e,c,o),a!==null&&(gi(a,e,o,i),oh(a,e,o))},enqueueReplaceState:function(e,a,s){e=e._reactInternals;var i=R(),o=yi(e),c=mh(i,o);c.tag=1,c.payload=a,s!=null&&(c.callback=s),a=nh(e,c,o),a!==null&&(gi(a,e,o,i),oh(a,e,o))},enqueueForceUpdate:function(e,a){e=e._reactInternals;var s=R(),i=yi(e),o=mh(s,i);o.tag=2,a!=null&&(o.callback=a),a=nh(e,o,i),a!==null&&(gi(a,e,i,s),oh(a,e,i))}};function Fi(e,a,s,i,o,c,g){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,c,g):a.prototype&&a.prototype.isPureReactComponent?!Ie(s,i)||!Ie(o,c):!0}function Gi(e,a,s){var i=!1,o=Vf,c=a.contextType;return typeof c=="object"&&c!==null?c=eh(c):(o=Zf(a)?Xf:H.current,i=a.contextTypes,c=(i=i!=null)?Yf(e,o):Vf),a=new a(s,c),e.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=Ei,e.stateNode=a,a._reactInternals=e,i&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=o,e.__reactInternalMemoizedMaskedChildContext=c),a}function Hi(e,a,s,i){e=a.state,typeof a.componentWillReceiveProps=="function"&&a.componentWillReceiveProps(s,i),typeof a.UNSAFE_componentWillReceiveProps=="function"&&a.UNSAFE_componentWillReceiveProps(s,i),a.state!==e&&Ei.enqueueReplaceState(a,a.state,null)}function Ii(e,a,s,i){var o=e.stateNode;o.props=s,o.state=e.memoizedState,o.refs={},kh(e);var c=a.contextType;typeof c=="object"&&c!==null?o.context=eh(c):(c=Zf(a)?Xf:H.current,o.context=Yf(e,c)),o.state=e.memoizedState,c=a.getDerivedStateFromProps,typeof c=="function"&&(Di(e,a,c,s),o.state=e.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(a=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),a!==o.state&&Ei.enqueueReplaceState(o,o.state,null),qh(e,s,o,i),o.state=e.memoizedState),typeof o.componentDidMount=="function"&&(e.flags|=4194308)}function Ji(e,a){try{var s="",i=a;do s+=Pa(i),i=i.return;while(i);var o=s}catch(c){o=`
Error generating stack: `+c.message+`
`+c.stack}return{value:e,source:a,stack:o,digest:null}}function Ki(e,a,s){return{value:e,source:null,stack:s??null,digest:a??null}}function Li(e,a){try{console.error(a.value)}catch(s){setTimeout(function(){throw s})}}var Mi=typeof WeakMap=="function"?WeakMap:Map;function Ni(e,a,s){s=mh(-1,s),s.tag=3,s.payload={element:null};var i=a.value;return s.callback=function(){Oi||(Oi=!0,Pi=i),Li(e,a)},s}function Qi(e,a,s){s=mh(-1,s),s.tag=3;var i=e.type.getDerivedStateFromError;if(typeof i=="function"){var o=a.value;s.payload=function(){return i(o)},s.callback=function(){Li(e,a)}}var c=e.stateNode;return c!==null&&typeof c.componentDidCatch=="function"&&(s.callback=function(){Li(e,a),typeof i!="function"&&(Ri===null?Ri=new Set([this]):Ri.add(this));var g=a.stack;this.componentDidCatch(a.value,{componentStack:g!==null?g:""})}),s}function Si(e,a,s){var i=e.pingCache;if(i===null){i=e.pingCache=new Mi;var o=new Set;i.set(a,o)}else o=i.get(a),o===void 0&&(o=new Set,i.set(a,o));o.has(s)||(o.add(s),e=Ti.bind(null,e,a,s),a.then(e,e))}function Ui(e){do{var a;if((a=e.tag===13)&&(a=e.memoizedState,a=a!==null?a.dehydrated!==null:!0),a)return e;e=e.return}while(e!==null);return null}function Vi(e,a,s,i,o){return e.mode&1?(e.flags|=65536,e.lanes=o,e):(e===a?e.flags|=65536:(e.flags|=128,s.flags|=131072,s.flags&=-52805,s.tag===1&&(s.alternate===null?s.tag=17:(a=mh(-1,1),a.tag=2,nh(s,a,1))),s.lanes|=1),e)}var Wi=ua.ReactCurrentOwner,dh=!1;function Xi(e,a,s,i){a.child=e===null?Vg(a,null,s,i):Ug(a,e.child,s,i)}function Yi(e,a,s,i,o){s=s.render;var c=a.ref;return ch(a,o),i=Nh(e,a,s,i,c,o),s=Sh(),e!==null&&!dh?(a.updateQueue=e.updateQueue,a.flags&=-2053,e.lanes&=~o,Zi(e,a,o)):(I&&s&&vg(a),a.flags|=1,Xi(e,a,i,o),a.child)}function $i(e,a,s,i,o){if(e===null){var c=s.type;return typeof c=="function"&&!aj(c)&&c.defaultProps===void 0&&s.compare===null&&s.defaultProps===void 0?(a.tag=15,a.type=c,bj(e,a,c,i,o)):(e=Rg(s.type,null,i,a,a.mode,o),e.ref=a.ref,e.return=a,a.child=e)}if(c=e.child,!(e.lanes&o)){var g=c.memoizedProps;if(s=s.compare,s=s!==null?s:Ie,s(g,i)&&e.ref===a.ref)return Zi(e,a,o)}return a.flags|=1,e=Pg(c,i),e.ref=a.ref,e.return=a,a.child=e}function bj(e,a,s,i,o){if(e!==null){var c=e.memoizedProps;if(Ie(c,i)&&e.ref===a.ref)if(dh=!1,a.pendingProps=i=c,(e.lanes&o)!==0)e.flags&131072&&(dh=!0);else return a.lanes=e.lanes,Zi(e,a,o)}return cj(e,a,s,i,o)}function dj(e,a,s){var i=a.pendingProps,o=i.children,c=e!==null?e.memoizedState:null;if(i.mode==="hidden")if(!(a.mode&1))a.memoizedState={baseLanes:0,cachePool:null,transitions:null},G(ej,fj),fj|=s;else{if(!(s&1073741824))return e=c!==null?c.baseLanes|s:s,a.lanes=a.childLanes=1073741824,a.memoizedState={baseLanes:e,cachePool:null,transitions:null},a.updateQueue=null,G(ej,fj),fj|=e,null;a.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=c!==null?c.baseLanes:s,G(ej,fj),fj|=i}else c!==null?(i=c.baseLanes|s,a.memoizedState=null):i=s,G(ej,fj),fj|=i;return Xi(e,a,o,s),a.child}function gj(e,a){var s=a.ref;(e===null&&s!==null||e!==null&&e.ref!==s)&&(a.flags|=512,a.flags|=2097152)}function cj(e,a,s,i,o){var c=Zf(s)?Xf:H.current;return c=Yf(a,c),ch(a,o),s=Nh(e,a,s,i,c,o),i=Sh(),e!==null&&!dh?(a.updateQueue=e.updateQueue,a.flags&=-2053,e.lanes&=~o,Zi(e,a,o)):(I&&i&&vg(a),a.flags|=1,Xi(e,a,s,o),a.child)}function hj(e,a,s,i,o){if(Zf(s)){var c=!0;cg(a)}else c=!1;if(ch(a,o),a.stateNode===null)ij(e,a),Gi(a,s,i),Ii(a,s,i,o),i=!0;else if(e===null){var g=a.stateNode,d=a.memoizedProps;g.props=d;var h=g.context,j=s.contextType;typeof j=="object"&&j!==null?j=eh(j):(j=Zf(s)?Xf:H.current,j=Yf(a,j));var en=s.getDerivedStateFromProps,nn=typeof en=="function"||typeof g.getSnapshotBeforeUpdate=="function";nn||typeof g.UNSAFE_componentWillReceiveProps!="function"&&typeof g.componentWillReceiveProps!="function"||(d!==i||h!==j)&&Hi(a,g,i,j),jh=!1;var _e=a.memoizedState;g.state=_e,qh(a,i,g,o),h=a.memoizedState,d!==i||_e!==h||Wf.current||jh?(typeof en=="function"&&(Di(a,s,en,i),h=a.memoizedState),(d=jh||Fi(a,s,d,i,_e,h,j))?(nn||typeof g.UNSAFE_componentWillMount!="function"&&typeof g.componentWillMount!="function"||(typeof g.componentWillMount=="function"&&g.componentWillMount(),typeof g.UNSAFE_componentWillMount=="function"&&g.UNSAFE_componentWillMount()),typeof g.componentDidMount=="function"&&(a.flags|=4194308)):(typeof g.componentDidMount=="function"&&(a.flags|=4194308),a.memoizedProps=i,a.memoizedState=h),g.props=i,g.state=h,g.context=j,i=d):(typeof g.componentDidMount=="function"&&(a.flags|=4194308),i=!1)}else{g=a.stateNode,lh(e,a),d=a.memoizedProps,j=a.type===a.elementType?d:Ci(a.type,d),g.props=j,nn=a.pendingProps,_e=g.context,h=s.contextType,typeof h=="object"&&h!==null?h=eh(h):(h=Zf(s)?Xf:H.current,h=Yf(a,h));var tn=s.getDerivedStateFromProps;(en=typeof tn=="function"||typeof g.getSnapshotBeforeUpdate=="function")||typeof g.UNSAFE_componentWillReceiveProps!="function"&&typeof g.componentWillReceiveProps!="function"||(d!==nn||_e!==h)&&Hi(a,g,i,h),jh=!1,_e=a.memoizedState,g.state=_e,qh(a,i,g,o);var sn=a.memoizedState;d!==nn||_e!==sn||Wf.current||jh?(typeof tn=="function"&&(Di(a,s,tn,i),sn=a.memoizedState),(j=jh||Fi(a,s,j,i,_e,sn,h)||!1)?(en||typeof g.UNSAFE_componentWillUpdate!="function"&&typeof g.componentWillUpdate!="function"||(typeof g.componentWillUpdate=="function"&&g.componentWillUpdate(i,sn,h),typeof g.UNSAFE_componentWillUpdate=="function"&&g.UNSAFE_componentWillUpdate(i,sn,h)),typeof g.componentDidUpdate=="function"&&(a.flags|=4),typeof g.getSnapshotBeforeUpdate=="function"&&(a.flags|=1024)):(typeof g.componentDidUpdate!="function"||d===e.memoizedProps&&_e===e.memoizedState||(a.flags|=4),typeof g.getSnapshotBeforeUpdate!="function"||d===e.memoizedProps&&_e===e.memoizedState||(a.flags|=1024),a.memoizedProps=i,a.memoizedState=sn),g.props=i,g.state=sn,g.context=h,i=j):(typeof g.componentDidUpdate!="function"||d===e.memoizedProps&&_e===e.memoizedState||(a.flags|=4),typeof g.getSnapshotBeforeUpdate!="function"||d===e.memoizedProps&&_e===e.memoizedState||(a.flags|=1024),i=!1)}return jj(e,a,s,i,c,o)}function jj(e,a,s,i,o,c){gj(e,a);var g=(a.flags&128)!==0;if(!i&&!g)return o&&dg(a,s,!1),Zi(e,a,c);i=a.stateNode,Wi.current=a;var d=g&&typeof s.getDerivedStateFromError!="function"?null:i.render();return a.flags|=1,e!==null&&g?(a.child=Ug(a,e.child,null,c),a.child=Ug(a,null,d,c)):Xi(e,a,d,c),a.memoizedState=i.state,o&&dg(a,s,!0),a.child}function kj(e){var a=e.stateNode;a.pendingContext?ag(e,a.pendingContext,a.pendingContext!==a.context):a.context&&ag(e,a.context,!1),yh(e,a.containerInfo)}function lj(e,a,s,i,o){return Ig(),Jg(o),a.flags|=256,Xi(e,a,s,i),a.child}var mj={dehydrated:null,treeContext:null,retryLane:0};function nj(e){return{baseLanes:e,cachePool:null,transitions:null}}function oj(e,a,s){var i=a.pendingProps,o=L.current,c=!1,g=(a.flags&128)!==0,d;if((d=g)||(d=e!==null&&e.memoizedState===null?!1:(o&2)!==0),d?(c=!0,a.flags&=-129):(e===null||e.memoizedState!==null)&&(o|=1),G(L,o&1),e===null)return Eg(a),e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(a.mode&1?e.data==="$!"?a.lanes=8:a.lanes=1073741824:a.lanes=1,null):(g=i.children,e=i.fallback,c?(i=a.mode,c=a.child,g={mode:"hidden",children:g},!(i&1)&&c!==null?(c.childLanes=0,c.pendingProps=g):c=pj(g,i,0,null),e=Tg(e,i,s,null),c.return=a,e.return=a,c.sibling=e,a.child=c,a.child.memoizedState=nj(s),a.memoizedState=mj,e):qj(a,g));if(o=e.memoizedState,o!==null&&(d=o.dehydrated,d!==null))return rj(e,a,g,i,d,o,s);if(c){c=i.fallback,g=a.mode,o=e.child,d=o.sibling;var h={mode:"hidden",children:i.children};return!(g&1)&&a.child!==o?(i=a.child,i.childLanes=0,i.pendingProps=h,a.deletions=null):(i=Pg(o,h),i.subtreeFlags=o.subtreeFlags&14680064),d!==null?c=Pg(d,c):(c=Tg(c,g,s,null),c.flags|=2),c.return=a,i.return=a,i.sibling=c,a.child=i,i=c,c=a.child,g=e.child.memoizedState,g=g===null?nj(s):{baseLanes:g.baseLanes|s,cachePool:null,transitions:g.transitions},c.memoizedState=g,c.childLanes=e.childLanes&~s,a.memoizedState=mj,i}return c=e.child,e=c.sibling,i=Pg(c,{mode:"visible",children:i.children}),!(a.mode&1)&&(i.lanes=s),i.return=a,i.sibling=null,e!==null&&(s=a.deletions,s===null?(a.deletions=[e],a.flags|=16):s.push(e)),a.child=i,a.memoizedState=null,i}function qj(e,a){return a=pj({mode:"visible",children:a},e.mode,0,null),a.return=e,e.child=a}function sj(e,a,s,i){return i!==null&&Jg(i),Ug(a,e.child,null,s),e=qj(a,a.pendingProps.children),e.flags|=2,a.memoizedState=null,e}function rj(e,a,s,i,o,c,g){if(s)return a.flags&256?(a.flags&=-257,i=Ki(Error(p(422))),sj(e,a,g,i)):a.memoizedState!==null?(a.child=e.child,a.flags|=128,null):(c=i.fallback,o=a.mode,i=pj({mode:"visible",children:i.children},o,0,null),c=Tg(c,o,g,null),c.flags|=2,i.return=a,c.return=a,i.sibling=c,a.child=i,a.mode&1&&Ug(a,e.child,null,g),a.child.memoizedState=nj(g),a.memoizedState=mj,c);if(!(a.mode&1))return sj(e,a,g,null);if(o.data==="$!"){if(i=o.nextSibling&&o.nextSibling.dataset,i)var d=i.dgst;return i=d,c=Error(p(419)),i=Ki(c,i,void 0),sj(e,a,g,i)}if(d=(g&e.childLanes)!==0,dh||d){if(i=Q,i!==null){switch(g&-g){case 4:o=2;break;case 16:o=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32;break;case 536870912:o=268435456;break;default:o=0}o=o&(i.suspendedLanes|g)?0:o,o!==0&&o!==c.retryLane&&(c.retryLane=o,ih(e,o),gi(i,e,o,-1))}return tj(),i=Ki(Error(p(421))),sj(e,a,g,i)}return o.data==="$?"?(a.flags|=128,a.child=e.child,a=uj.bind(null,e),o._reactRetry=a,null):(e=c.treeContext,yg=Lf(o.nextSibling),xg=a,I=!0,zg=null,e!==null&&(og[pg++]=rg,og[pg++]=sg,og[pg++]=qg,rg=e.id,sg=e.overflow,qg=a),a=qj(a,i.children),a.flags|=4096,a)}function vj(e,a,s){e.lanes|=a;var i=e.alternate;i!==null&&(i.lanes|=a),bh(e.return,a,s)}function wj(e,a,s,i,o){var c=e.memoizedState;c===null?e.memoizedState={isBackwards:a,rendering:null,renderingStartTime:0,last:i,tail:s,tailMode:o}:(c.isBackwards=a,c.rendering=null,c.renderingStartTime=0,c.last=i,c.tail=s,c.tailMode=o)}function xj(e,a,s){var i=a.pendingProps,o=i.revealOrder,c=i.tail;if(Xi(e,a,i.children,s),i=L.current,i&2)i=i&1|2,a.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=a.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&vj(e,s,a);else if(e.tag===19)vj(e,s,a);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===a)break e;for(;e.sibling===null;){if(e.return===null||e.return===a)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}i&=1}if(G(L,i),!(a.mode&1))a.memoizedState=null;else switch(o){case"forwards":for(s=a.child,o=null;s!==null;)e=s.alternate,e!==null&&Ch(e)===null&&(o=s),s=s.sibling;s=o,s===null?(o=a.child,a.child=null):(o=s.sibling,s.sibling=null),wj(a,!1,o,s,c);break;case"backwards":for(s=null,o=a.child,a.child=null;o!==null;){if(e=o.alternate,e!==null&&Ch(e)===null){a.child=o;break}e=o.sibling,o.sibling=s,s=o,o=e}wj(a,!0,s,null,c);break;case"together":wj(a,!1,null,null,void 0);break;default:a.memoizedState=null}return a.child}function ij(e,a){!(a.mode&1)&&e!==null&&(e.alternate=null,a.alternate=null,a.flags|=2)}function Zi(e,a,s){if(e!==null&&(a.dependencies=e.dependencies),rh|=a.lanes,!(s&a.childLanes))return null;if(e!==null&&a.child!==e.child)throw Error(p(153));if(a.child!==null){for(e=a.child,s=Pg(e,e.pendingProps),a.child=s,s.return=a;e.sibling!==null;)e=e.sibling,s=s.sibling=Pg(e,e.pendingProps),s.return=a;s.sibling=null}return a.child}function yj(e,a,s){switch(a.tag){case 3:kj(a),Ig();break;case 5:Ah(a);break;case 1:Zf(a.type)&&cg(a);break;case 4:yh(a,a.stateNode.containerInfo);break;case 10:var i=a.type._context,o=a.memoizedProps.value;G(Wg,i._currentValue),i._currentValue=o;break;case 13:if(i=a.memoizedState,i!==null)return i.dehydrated!==null?(G(L,L.current&1),a.flags|=128,null):s&a.child.childLanes?oj(e,a,s):(G(L,L.current&1),e=Zi(e,a,s),e!==null?e.sibling:null);G(L,L.current&1);break;case 19:if(i=(s&a.childLanes)!==0,e.flags&128){if(i)return xj(e,a,s);a.flags|=128}if(o=a.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),G(L,L.current),i)break;return null;case 22:case 23:return a.lanes=0,dj(e,a,s)}return Zi(e,a,s)}var zj,Aj,Bj,Cj;zj=function(e,a){for(var s=a.child;s!==null;){if(s.tag===5||s.tag===6)e.appendChild(s.stateNode);else if(s.tag!==4&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===a)break;for(;s.sibling===null;){if(s.return===null||s.return===a)return;s=s.return}s.sibling.return=s.return,s=s.sibling}};Aj=function(){};Bj=function(e,a,s,i){var o=e.memoizedProps;if(o!==i){e=a.stateNode,xh(uh.current);var c=null;switch(s){case"input":o=Ya(e,o),i=Ya(e,i),c=[];break;case"select":o=A({},o,{value:void 0}),i=A({},i,{value:void 0}),c=[];break;case"textarea":o=gb(e,o),i=gb(e,i),c=[];break;default:typeof o.onClick!="function"&&typeof i.onClick=="function"&&(e.onclick=Bf)}ub(s,i);var g;s=null;for(j in o)if(!i.hasOwnProperty(j)&&o.hasOwnProperty(j)&&o[j]!=null)if(j==="style"){var d=o[j];for(g in d)d.hasOwnProperty(g)&&(s||(s={}),s[g]="")}else j!=="dangerouslySetInnerHTML"&&j!=="children"&&j!=="suppressContentEditableWarning"&&j!=="suppressHydrationWarning"&&j!=="autoFocus"&&(ea.hasOwnProperty(j)?c||(c=[]):(c=c||[]).push(j,null));for(j in i){var h=i[j];if(d=o!=null?o[j]:void 0,i.hasOwnProperty(j)&&h!==d&&(h!=null||d!=null))if(j==="style")if(d){for(g in d)!d.hasOwnProperty(g)||h&&h.hasOwnProperty(g)||(s||(s={}),s[g]="");for(g in h)h.hasOwnProperty(g)&&d[g]!==h[g]&&(s||(s={}),s[g]=h[g])}else s||(c||(c=[]),c.push(j,s)),s=h;else j==="dangerouslySetInnerHTML"?(h=h?h.__html:void 0,d=d?d.__html:void 0,h!=null&&d!==h&&(c=c||[]).push(j,h)):j==="children"?typeof h!="string"&&typeof h!="number"||(c=c||[]).push(j,""+h):j!=="suppressContentEditableWarning"&&j!=="suppressHydrationWarning"&&(ea.hasOwnProperty(j)?(h!=null&&j==="onScroll"&&D("scroll",e),c||d===h||(c=[])):(c=c||[]).push(j,h))}s&&(c=c||[]).push("style",s);var j=c;(a.updateQueue=j)&&(a.flags|=4)}};Cj=function(e,a,s,i){s!==i&&(a.flags|=4)};function Dj(e,a){if(!I)switch(e.tailMode){case"hidden":a=e.tail;for(var s=null;a!==null;)a.alternate!==null&&(s=a),a=a.sibling;s===null?e.tail=null:s.sibling=null;break;case"collapsed":s=e.tail;for(var i=null;s!==null;)s.alternate!==null&&(i=s),s=s.sibling;i===null?a||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null}}function S(e){var a=e.alternate!==null&&e.alternate.child===e.child,s=0,i=0;if(a)for(var o=e.child;o!==null;)s|=o.lanes|o.childLanes,i|=o.subtreeFlags&14680064,i|=o.flags&14680064,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)s|=o.lanes|o.childLanes,i|=o.subtreeFlags,i|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=i,e.childLanes=s,a}function Ej(e,a,s){var i=a.pendingProps;switch(wg(a),a.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return S(a),null;case 1:return Zf(a.type)&&$f(),S(a),null;case 3:return i=a.stateNode,zh(),E(Wf),E(H),Eh(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(e===null||e.child===null)&&(Gg(a)?a.flags|=4:e===null||e.memoizedState.isDehydrated&&!(a.flags&256)||(a.flags|=1024,zg!==null&&(Fj(zg),zg=null))),Aj(e,a),S(a),null;case 5:Bh(a);var o=xh(wh.current);if(s=a.type,e!==null&&a.stateNode!=null)Bj(e,a,s,i,o),e.ref!==a.ref&&(a.flags|=512,a.flags|=2097152);else{if(!i){if(a.stateNode===null)throw Error(p(166));return S(a),null}if(e=xh(uh.current),Gg(a)){i=a.stateNode,s=a.type;var c=a.memoizedProps;switch(i[Of]=a,i[Pf]=c,e=(a.mode&1)!==0,s){case"dialog":D("cancel",i),D("close",i);break;case"iframe":case"object":case"embed":D("load",i);break;case"video":case"audio":for(o=0;o<lf.length;o++)D(lf[o],i);break;case"source":D("error",i);break;case"img":case"image":case"link":D("error",i),D("load",i);break;case"details":D("toggle",i);break;case"input":Za(i,c),D("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!c.multiple},D("invalid",i);break;case"textarea":hb(i,c),D("invalid",i)}ub(s,c),o=null;for(var g in c)if(c.hasOwnProperty(g)){var d=c[g];g==="children"?typeof d=="string"?i.textContent!==d&&(c.suppressHydrationWarning!==!0&&Af(i.textContent,d,e),o=["children",d]):typeof d=="number"&&i.textContent!==""+d&&(c.suppressHydrationWarning!==!0&&Af(i.textContent,d,e),o=["children",""+d]):ea.hasOwnProperty(g)&&d!=null&&g==="onScroll"&&D("scroll",i)}switch(s){case"input":Va(i),db(i,c,!0);break;case"textarea":Va(i),jb(i);break;case"select":case"option":break;default:typeof c.onClick=="function"&&(i.onclick=Bf)}i=o,a.updateQueue=i,i!==null&&(a.flags|=4)}else{g=o.nodeType===9?o:o.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=kb(s)),e==="http://www.w3.org/1999/xhtml"?s==="script"?(e=g.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof i.is=="string"?e=g.createElement(s,{is:i.is}):(e=g.createElement(s),s==="select"&&(g=e,i.multiple?g.multiple=!0:i.size&&(g.size=i.size))):e=g.createElementNS(e,s),e[Of]=a,e[Pf]=i,zj(e,a,!1,!1),a.stateNode=e;e:{switch(g=vb(s,i),s){case"dialog":D("cancel",e),D("close",e),o=i;break;case"iframe":case"object":case"embed":D("load",e),o=i;break;case"video":case"audio":for(o=0;o<lf.length;o++)D(lf[o],e);o=i;break;case"source":D("error",e),o=i;break;case"img":case"image":case"link":D("error",e),D("load",e),o=i;break;case"details":D("toggle",e),o=i;break;case"input":Za(e,i),o=Ya(e,i),D("invalid",e);break;case"option":o=i;break;case"select":e._wrapperState={wasMultiple:!!i.multiple},o=A({},i,{value:void 0}),D("invalid",e);break;case"textarea":hb(e,i),o=gb(e,i),D("invalid",e);break;default:o=i}ub(s,o),d=o;for(c in d)if(d.hasOwnProperty(c)){var h=d[c];c==="style"?sb(e,h):c==="dangerouslySetInnerHTML"?(h=h?h.__html:void 0,h!=null&&nb(e,h)):c==="children"?typeof h=="string"?(s!=="textarea"||h!=="")&&ob(e,h):typeof h=="number"&&ob(e,""+h):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(ea.hasOwnProperty(c)?h!=null&&c==="onScroll"&&D("scroll",e):h!=null&&ta(e,c,h,g))}switch(s){case"input":Va(e),db(e,i,!1);break;case"textarea":Va(e),jb(e);break;case"option":i.value!=null&&e.setAttribute("value",""+Sa(i.value));break;case"select":e.multiple=!!i.multiple,c=i.value,c!=null?fb(e,!!i.multiple,c,!1):i.defaultValue!=null&&fb(e,!!i.multiple,i.defaultValue,!0);break;default:typeof o.onClick=="function"&&(e.onclick=Bf)}switch(s){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(a.flags|=4)}a.ref!==null&&(a.flags|=512,a.flags|=2097152)}return S(a),null;case 6:if(e&&a.stateNode!=null)Cj(e,a,e.memoizedProps,i);else{if(typeof i!="string"&&a.stateNode===null)throw Error(p(166));if(s=xh(wh.current),xh(uh.current),Gg(a)){if(i=a.stateNode,s=a.memoizedProps,i[Of]=a,(c=i.nodeValue!==s)&&(e=xg,e!==null))switch(e.tag){case 3:Af(i.nodeValue,s,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Af(i.nodeValue,s,(e.mode&1)!==0)}c&&(a.flags|=4)}else i=(s.nodeType===9?s:s.ownerDocument).createTextNode(i),i[Of]=a,a.stateNode=i}return S(a),null;case 13:if(E(L),i=a.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(I&&yg!==null&&a.mode&1&&!(a.flags&128))Hg(),Ig(),a.flags|=98560,c=!1;else if(c=Gg(a),i!==null&&i.dehydrated!==null){if(e===null){if(!c)throw Error(p(318));if(c=a.memoizedState,c=c!==null?c.dehydrated:null,!c)throw Error(p(317));c[Of]=a}else Ig(),!(a.flags&128)&&(a.memoizedState=null),a.flags|=4;S(a),c=!1}else zg!==null&&(Fj(zg),zg=null),c=!0;if(!c)return a.flags&65536?a:null}return a.flags&128?(a.lanes=s,a):(i=i!==null,i!==(e!==null&&e.memoizedState!==null)&&i&&(a.child.flags|=8192,a.mode&1&&(e===null||L.current&1?T===0&&(T=3):tj())),a.updateQueue!==null&&(a.flags|=4),S(a),null);case 4:return zh(),Aj(e,a),e===null&&sf(a.stateNode.containerInfo),S(a),null;case 10:return ah(a.type._context),S(a),null;case 17:return Zf(a.type)&&$f(),S(a),null;case 19:if(E(L),c=a.memoizedState,c===null)return S(a),null;if(i=(a.flags&128)!==0,g=c.rendering,g===null)if(i)Dj(c,!1);else{if(T!==0||e!==null&&e.flags&128)for(e=a.child;e!==null;){if(g=Ch(e),g!==null){for(a.flags|=128,Dj(c,!1),i=g.updateQueue,i!==null&&(a.updateQueue=i,a.flags|=4),a.subtreeFlags=0,i=s,s=a.child;s!==null;)c=s,e=i,c.flags&=14680066,g=c.alternate,g===null?(c.childLanes=0,c.lanes=e,c.child=null,c.subtreeFlags=0,c.memoizedProps=null,c.memoizedState=null,c.updateQueue=null,c.dependencies=null,c.stateNode=null):(c.childLanes=g.childLanes,c.lanes=g.lanes,c.child=g.child,c.subtreeFlags=0,c.deletions=null,c.memoizedProps=g.memoizedProps,c.memoizedState=g.memoizedState,c.updateQueue=g.updateQueue,c.type=g.type,e=g.dependencies,c.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),s=s.sibling;return G(L,L.current&1|2),a.child}e=e.sibling}c.tail!==null&&B()>Gj&&(a.flags|=128,i=!0,Dj(c,!1),a.lanes=4194304)}else{if(!i)if(e=Ch(g),e!==null){if(a.flags|=128,i=!0,s=e.updateQueue,s!==null&&(a.updateQueue=s,a.flags|=4),Dj(c,!0),c.tail===null&&c.tailMode==="hidden"&&!g.alternate&&!I)return S(a),null}else 2*B()-c.renderingStartTime>Gj&&s!==1073741824&&(a.flags|=128,i=!0,Dj(c,!1),a.lanes=4194304);c.isBackwards?(g.sibling=a.child,a.child=g):(s=c.last,s!==null?s.sibling=g:a.child=g,c.last=g)}return c.tail!==null?(a=c.tail,c.rendering=a,c.tail=a.sibling,c.renderingStartTime=B(),a.sibling=null,s=L.current,G(L,i?s&1|2:s&1),a):(S(a),null);case 22:case 23:return Hj(),i=a.memoizedState!==null,e!==null&&e.memoizedState!==null!==i&&(a.flags|=8192),i&&a.mode&1?fj&1073741824&&(S(a),a.subtreeFlags&6&&(a.flags|=8192)):S(a),null;case 24:return null;case 25:return null}throw Error(p(156,a.tag))}function Ij(e,a){switch(wg(a),a.tag){case 1:return Zf(a.type)&&$f(),e=a.flags,e&65536?(a.flags=e&-65537|128,a):null;case 3:return zh(),E(Wf),E(H),Eh(),e=a.flags,e&65536&&!(e&128)?(a.flags=e&-65537|128,a):null;case 5:return Bh(a),null;case 13:if(E(L),e=a.memoizedState,e!==null&&e.dehydrated!==null){if(a.alternate===null)throw Error(p(340));Ig()}return e=a.flags,e&65536?(a.flags=e&-65537|128,a):null;case 19:return E(L),null;case 4:return zh(),null;case 10:return ah(a.type._context),null;case 22:case 23:return Hj(),null;case 24:return null;default:return null}}var Jj=!1,U=!1,Kj=typeof WeakSet=="function"?WeakSet:Set,V=null;function Lj(e,a){var s=e.ref;if(s!==null)if(typeof s=="function")try{s(null)}catch(i){W(e,a,i)}else s.current=null}function Mj(e,a,s){try{s()}catch(i){W(e,a,i)}}var Nj=!1;function Oj(e,a){if(Cf=dd,e=Me(),Ne(e)){if("selectionStart"in e)var s={start:e.selectionStart,end:e.selectionEnd};else e:{s=(s=e.ownerDocument)&&s.defaultView||window;var i=s.getSelection&&s.getSelection();if(i&&i.rangeCount!==0){s=i.anchorNode;var o=i.anchorOffset,c=i.focusNode;i=i.focusOffset;try{s.nodeType,c.nodeType}catch{s=null;break e}var g=0,d=-1,h=-1,j=0,en=0,nn=e,_e=null;n:for(;;){for(var tn;nn!==s||o!==0&&nn.nodeType!==3||(d=g+o),nn!==c||i!==0&&nn.nodeType!==3||(h=g+i),nn.nodeType===3&&(g+=nn.nodeValue.length),(tn=nn.firstChild)!==null;)_e=nn,nn=tn;for(;;){if(nn===e)break n;if(_e===s&&++j===o&&(d=g),_e===c&&++en===i&&(h=g),(tn=nn.nextSibling)!==null)break;nn=_e,_e=nn.parentNode}nn=tn}s=d===-1||h===-1?null:{start:d,end:h}}else s=null}s=s||{start:0,end:0}}else s=null;for(Df={focusedElem:e,selectionRange:s},dd=!1,V=a;V!==null;)if(a=V,e=a.child,(a.subtreeFlags&1028)!==0&&e!==null)e.return=a,V=e;else for(;V!==null;){a=V;try{var sn=a.alternate;if(a.flags&1024)switch(a.tag){case 0:case 11:case 15:break;case 1:if(sn!==null){var ln=sn.memoizedProps,Tn=sn.memoizedState,b=a.stateNode,_=b.getSnapshotBeforeUpdate(a.elementType===a.type?ln:Ci(a.type,ln),Tn);b.__reactInternalSnapshotBeforeUpdate=_}break;case 3:var $=a.stateNode.containerInfo;$.nodeType===1?$.textContent="":$.nodeType===9&&$.documentElement&&$.removeChild($.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(p(163))}}catch(an){W(a,a.return,an)}if(e=a.sibling,e!==null){e.return=a.return,V=e;break}V=a.return}return sn=Nj,Nj=!1,sn}function Pj(e,a,s){var i=a.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var o=i=i.next;do{if((o.tag&e)===e){var c=o.destroy;o.destroy=void 0,c!==void 0&&Mj(a,s,c)}o=o.next}while(o!==i)}}function Qj(e,a){if(a=a.updateQueue,a=a!==null?a.lastEffect:null,a!==null){var s=a=a.next;do{if((s.tag&e)===e){var i=s.create;s.destroy=i()}s=s.next}while(s!==a)}}function Rj(e){var a=e.ref;if(a!==null){var s=e.stateNode;switch(e.tag){case 5:e=s;break;default:e=s}typeof a=="function"?a(e):a.current=e}}function Sj(e){var a=e.alternate;a!==null&&(e.alternate=null,Sj(a)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(a=e.stateNode,a!==null&&(delete a[Of],delete a[Pf],delete a[of],delete a[Qf],delete a[Rf])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Tj(e){return e.tag===5||e.tag===3||e.tag===4}function Uj(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Tj(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Vj(e,a,s){var i=e.tag;if(i===5||i===6)e=e.stateNode,a?s.nodeType===8?s.parentNode.insertBefore(e,a):s.insertBefore(e,a):(s.nodeType===8?(a=s.parentNode,a.insertBefore(e,s)):(a=s,a.appendChild(e)),s=s._reactRootContainer,s!=null||a.onclick!==null||(a.onclick=Bf));else if(i!==4&&(e=e.child,e!==null))for(Vj(e,a,s),e=e.sibling;e!==null;)Vj(e,a,s),e=e.sibling}function Wj(e,a,s){var i=e.tag;if(i===5||i===6)e=e.stateNode,a?s.insertBefore(e,a):s.appendChild(e);else if(i!==4&&(e=e.child,e!==null))for(Wj(e,a,s),e=e.sibling;e!==null;)Wj(e,a,s),e=e.sibling}var X=null,Xj=!1;function Yj(e,a,s){for(s=s.child;s!==null;)Zj(e,a,s),s=s.sibling}function Zj(e,a,s){if(lc&&typeof lc.onCommitFiberUnmount=="function")try{lc.onCommitFiberUnmount(kc,s)}catch{}switch(s.tag){case 5:U||Lj(s,a);case 6:var i=X,o=Xj;X=null,Yj(e,a,s),X=i,Xj=o,X!==null&&(Xj?(e=X,s=s.stateNode,e.nodeType===8?e.parentNode.removeChild(s):e.removeChild(s)):X.removeChild(s.stateNode));break;case 18:X!==null&&(Xj?(e=X,s=s.stateNode,e.nodeType===8?Kf(e.parentNode,s):e.nodeType===1&&Kf(e,s),bd(e)):Kf(X,s.stateNode));break;case 4:i=X,o=Xj,X=s.stateNode.containerInfo,Xj=!0,Yj(e,a,s),X=i,Xj=o;break;case 0:case 11:case 14:case 15:if(!U&&(i=s.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){o=i=i.next;do{var c=o,g=c.destroy;c=c.tag,g!==void 0&&(c&2||c&4)&&Mj(s,a,g),o=o.next}while(o!==i)}Yj(e,a,s);break;case 1:if(!U&&(Lj(s,a),i=s.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=s.memoizedProps,i.state=s.memoizedState,i.componentWillUnmount()}catch(d){W(s,a,d)}Yj(e,a,s);break;case 21:Yj(e,a,s);break;case 22:s.mode&1?(U=(i=U)||s.memoizedState!==null,Yj(e,a,s),U=i):Yj(e,a,s);break;default:Yj(e,a,s)}}function ak(e){var a=e.updateQueue;if(a!==null){e.updateQueue=null;var s=e.stateNode;s===null&&(s=e.stateNode=new Kj),a.forEach(function(i){var o=bk.bind(null,e,i);s.has(i)||(s.add(i),i.then(o,o))})}}function ck(e,a){var s=a.deletions;if(s!==null)for(var i=0;i<s.length;i++){var o=s[i];try{var c=e,g=a,d=g;e:for(;d!==null;){switch(d.tag){case 5:X=d.stateNode,Xj=!1;break e;case 3:X=d.stateNode.containerInfo,Xj=!0;break e;case 4:X=d.stateNode.containerInfo,Xj=!0;break e}d=d.return}if(X===null)throw Error(p(160));Zj(c,g,o),X=null,Xj=!1;var h=o.alternate;h!==null&&(h.return=null),o.return=null}catch(j){W(o,a,j)}}if(a.subtreeFlags&12854)for(a=a.child;a!==null;)dk(a,e),a=a.sibling}function dk(e,a){var s=e.alternate,i=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(ck(a,e),ek(e),i&4){try{Pj(3,e,e.return),Qj(3,e)}catch(ln){W(e,e.return,ln)}try{Pj(5,e,e.return)}catch(ln){W(e,e.return,ln)}}break;case 1:ck(a,e),ek(e),i&512&&s!==null&&Lj(s,s.return);break;case 5:if(ck(a,e),ek(e),i&512&&s!==null&&Lj(s,s.return),e.flags&32){var o=e.stateNode;try{ob(o,"")}catch(ln){W(e,e.return,ln)}}if(i&4&&(o=e.stateNode,o!=null)){var c=e.memoizedProps,g=s!==null?s.memoizedProps:c,d=e.type,h=e.updateQueue;if(e.updateQueue=null,h!==null)try{d==="input"&&c.type==="radio"&&c.name!=null&&ab(o,c),vb(d,g);var j=vb(d,c);for(g=0;g<h.length;g+=2){var en=h[g],nn=h[g+1];en==="style"?sb(o,nn):en==="dangerouslySetInnerHTML"?nb(o,nn):en==="children"?ob(o,nn):ta(o,en,nn,j)}switch(d){case"input":bb(o,c);break;case"textarea":ib(o,c);break;case"select":var _e=o._wrapperState.wasMultiple;o._wrapperState.wasMultiple=!!c.multiple;var tn=c.value;tn!=null?fb(o,!!c.multiple,tn,!1):_e!==!!c.multiple&&(c.defaultValue!=null?fb(o,!!c.multiple,c.defaultValue,!0):fb(o,!!c.multiple,c.multiple?[]:"",!1))}o[Pf]=c}catch(ln){W(e,e.return,ln)}}break;case 6:if(ck(a,e),ek(e),i&4){if(e.stateNode===null)throw Error(p(162));o=e.stateNode,c=e.memoizedProps;try{o.nodeValue=c}catch(ln){W(e,e.return,ln)}}break;case 3:if(ck(a,e),ek(e),i&4&&s!==null&&s.memoizedState.isDehydrated)try{bd(a.containerInfo)}catch(ln){W(e,e.return,ln)}break;case 4:ck(a,e),ek(e);break;case 13:ck(a,e),ek(e),o=e.child,o.flags&8192&&(c=o.memoizedState!==null,o.stateNode.isHidden=c,!c||o.alternate!==null&&o.alternate.memoizedState!==null||(fk=B())),i&4&&ak(e);break;case 22:if(en=s!==null&&s.memoizedState!==null,e.mode&1?(U=(j=U)||en,ck(a,e),U=j):ck(a,e),ek(e),i&8192){if(j=e.memoizedState!==null,(e.stateNode.isHidden=j)&&!en&&e.mode&1)for(V=e,en=e.child;en!==null;){for(nn=V=en;V!==null;){switch(_e=V,tn=_e.child,_e.tag){case 0:case 11:case 14:case 15:Pj(4,_e,_e.return);break;case 1:Lj(_e,_e.return);var sn=_e.stateNode;if(typeof sn.componentWillUnmount=="function"){i=_e,s=_e.return;try{a=i,sn.props=a.memoizedProps,sn.state=a.memoizedState,sn.componentWillUnmount()}catch(ln){W(i,s,ln)}}break;case 5:Lj(_e,_e.return);break;case 22:if(_e.memoizedState!==null){gk(nn);continue}}tn!==null?(tn.return=_e,V=tn):gk(nn)}en=en.sibling}e:for(en=null,nn=e;;){if(nn.tag===5){if(en===null){en=nn;try{o=nn.stateNode,j?(c=o.style,typeof c.setProperty=="function"?c.setProperty("display","none","important"):c.display="none"):(d=nn.stateNode,h=nn.memoizedProps.style,g=h!=null&&h.hasOwnProperty("display")?h.display:null,d.style.display=rb("display",g))}catch(ln){W(e,e.return,ln)}}}else if(nn.tag===6){if(en===null)try{nn.stateNode.nodeValue=j?"":nn.memoizedProps}catch(ln){W(e,e.return,ln)}}else if((nn.tag!==22&&nn.tag!==23||nn.memoizedState===null||nn===e)&&nn.child!==null){nn.child.return=nn,nn=nn.child;continue}if(nn===e)break e;for(;nn.sibling===null;){if(nn.return===null||nn.return===e)break e;en===nn&&(en=null),nn=nn.return}en===nn&&(en=null),nn.sibling.return=nn.return,nn=nn.sibling}}break;case 19:ck(a,e),ek(e),i&4&&ak(e);break;case 21:break;default:ck(a,e),ek(e)}}function ek(e){var a=e.flags;if(a&2){try{e:{for(var s=e.return;s!==null;){if(Tj(s)){var i=s;break e}s=s.return}throw Error(p(160))}switch(i.tag){case 5:var o=i.stateNode;i.flags&32&&(ob(o,""),i.flags&=-33);var c=Uj(e);Wj(e,c,o);break;case 3:case 4:var g=i.stateNode.containerInfo,d=Uj(e);Vj(e,d,g);break;default:throw Error(p(161))}}catch(h){W(e,e.return,h)}e.flags&=-3}a&4096&&(e.flags&=-4097)}function hk(e,a,s){V=e,ik(e)}function ik(e,a,s){for(var i=(e.mode&1)!==0;V!==null;){var o=V,c=o.child;if(o.tag===22&&i){var g=o.memoizedState!==null||Jj;if(!g){var d=o.alternate,h=d!==null&&d.memoizedState!==null||U;d=Jj;var j=U;if(Jj=g,(U=h)&&!j)for(V=o;V!==null;)g=V,h=g.child,g.tag===22&&g.memoizedState!==null?jk(o):h!==null?(h.return=g,V=h):jk(o);for(;c!==null;)V=c,ik(c),c=c.sibling;V=o,Jj=d,U=j}kk(e)}else o.subtreeFlags&8772&&c!==null?(c.return=o,V=c):kk(e)}}function kk(e){for(;V!==null;){var a=V;if(a.flags&8772){var s=a.alternate;try{if(a.flags&8772)switch(a.tag){case 0:case 11:case 15:U||Qj(5,a);break;case 1:var i=a.stateNode;if(a.flags&4&&!U)if(s===null)i.componentDidMount();else{var o=a.elementType===a.type?s.memoizedProps:Ci(a.type,s.memoizedProps);i.componentDidUpdate(o,s.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var c=a.updateQueue;c!==null&&sh(a,c,i);break;case 3:var g=a.updateQueue;if(g!==null){if(s=null,a.child!==null)switch(a.child.tag){case 5:s=a.child.stateNode;break;case 1:s=a.child.stateNode}sh(a,g,s)}break;case 5:var d=a.stateNode;if(s===null&&a.flags&4){s=d;var h=a.memoizedProps;switch(a.type){case"button":case"input":case"select":case"textarea":h.autoFocus&&s.focus();break;case"img":h.src&&(s.src=h.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(a.memoizedState===null){var j=a.alternate;if(j!==null){var en=j.memoizedState;if(en!==null){var nn=en.dehydrated;nn!==null&&bd(nn)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(p(163))}U||a.flags&512&&Rj(a)}catch(_e){W(a,a.return,_e)}}if(a===e){V=null;break}if(s=a.sibling,s!==null){s.return=a.return,V=s;break}V=a.return}}function gk(e){for(;V!==null;){var a=V;if(a===e){V=null;break}var s=a.sibling;if(s!==null){s.return=a.return,V=s;break}V=a.return}}function jk(e){for(;V!==null;){var a=V;try{switch(a.tag){case 0:case 11:case 15:var s=a.return;try{Qj(4,a)}catch(h){W(a,s,h)}break;case 1:var i=a.stateNode;if(typeof i.componentDidMount=="function"){var o=a.return;try{i.componentDidMount()}catch(h){W(a,o,h)}}var c=a.return;try{Rj(a)}catch(h){W(a,c,h)}break;case 5:var g=a.return;try{Rj(a)}catch(h){W(a,g,h)}}}catch(h){W(a,a.return,h)}if(a===e){V=null;break}var d=a.sibling;if(d!==null){d.return=a.return,V=d;break}V=a.return}}var lk=Math.ceil,mk=ua.ReactCurrentDispatcher,nk=ua.ReactCurrentOwner,ok=ua.ReactCurrentBatchConfig,K=0,Q=null,Y=null,Z=0,fj=0,ej=Uf(0),T=0,pk=null,rh=0,qk=0,rk=0,sk=null,tk=null,fk=0,Gj=1/0,uk=null,Oi=!1,Pi=null,Ri=null,vk=!1,wk=null,xk=0,yk=0,zk=null,Ak=-1,Bk=0;function R(){return K&6?B():Ak!==-1?Ak:Ak=B()}function yi(e){return e.mode&1?K&2&&Z!==0?Z&-Z:Kg.transition!==null?(Bk===0&&(Bk=yc()),Bk):(e=C,e!==0||(e=window.event,e=e===void 0?16:jd(e.type)),e):1}function gi(e,a,s,i){if(50<yk)throw yk=0,zk=null,Error(p(185));Ac(e,s,i),(!(K&2)||e!==Q)&&(e===Q&&(!(K&2)&&(qk|=s),T===4&&Ck(e,Z)),Dk(e,i),s===1&&K===0&&!(a.mode&1)&&(Gj=B()+500,fg&&jg()))}function Dk(e,a){var s=e.callbackNode;wc(e,a);var i=uc(e,e===Q?Z:0);if(i===0)s!==null&&bc(s),e.callbackNode=null,e.callbackPriority=0;else if(a=i&-i,e.callbackPriority!==a){if(s!=null&&bc(s),a===1)e.tag===0?ig(Ek.bind(null,e)):hg(Ek.bind(null,e)),Jf(function(){!(K&6)&&jg()}),s=null;else{switch(Dc(i)){case 1:s=fc;break;case 4:s=gc;break;case 16:s=hc;break;case 536870912:s=jc;break;default:s=hc}s=Fk(s,Gk.bind(null,e))}e.callbackPriority=a,e.callbackNode=s}}function Gk(e,a){if(Ak=-1,Bk=0,K&6)throw Error(p(327));var s=e.callbackNode;if(Hk()&&e.callbackNode!==s)return null;var i=uc(e,e===Q?Z:0);if(i===0)return null;if(i&30||i&e.expiredLanes||a)a=Ik(e,i);else{a=i;var o=K;K|=2;var c=Jk();(Q!==e||Z!==a)&&(uk=null,Gj=B()+500,Kk(e,a));do try{Lk();break}catch(d){Mk(e,d)}while(!0);$g(),mk.current=c,K=o,Y!==null?a=0:(Q=null,Z=0,a=T)}if(a!==0){if(a===2&&(o=xc(e),o!==0&&(i=o,a=Nk(e,o))),a===1)throw s=pk,Kk(e,0),Ck(e,i),Dk(e,B()),s;if(a===6)Ck(e,i);else{if(o=e.current.alternate,!(i&30)&&!Ok(o)&&(a=Ik(e,i),a===2&&(c=xc(e),c!==0&&(i=c,a=Nk(e,c))),a===1))throw s=pk,Kk(e,0),Ck(e,i),Dk(e,B()),s;switch(e.finishedWork=o,e.finishedLanes=i,a){case 0:case 1:throw Error(p(345));case 2:Pk(e,tk,uk);break;case 3:if(Ck(e,i),(i&130023424)===i&&(a=fk+500-B(),10<a)){if(uc(e,0)!==0)break;if(o=e.suspendedLanes,(o&i)!==i){R(),e.pingedLanes|=e.suspendedLanes&o;break}e.timeoutHandle=Ff(Pk.bind(null,e,tk,uk),a);break}Pk(e,tk,uk);break;case 4:if(Ck(e,i),(i&4194240)===i)break;for(a=e.eventTimes,o=-1;0<i;){var g=31-oc(i);c=1<<g,g=a[g],g>o&&(o=g),i&=~c}if(i=o,i=B()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*lk(i/1960))-i,10<i){e.timeoutHandle=Ff(Pk.bind(null,e,tk,uk),i);break}Pk(e,tk,uk);break;case 5:Pk(e,tk,uk);break;default:throw Error(p(329))}}}return Dk(e,B()),e.callbackNode===s?Gk.bind(null,e):null}function Nk(e,a){var s=sk;return e.current.memoizedState.isDehydrated&&(Kk(e,a).flags|=256),e=Ik(e,a),e!==2&&(a=tk,tk=s,a!==null&&Fj(a)),e}function Fj(e){tk===null?tk=e:tk.push.apply(tk,e)}function Ok(e){for(var a=e;;){if(a.flags&16384){var s=a.updateQueue;if(s!==null&&(s=s.stores,s!==null))for(var i=0;i<s.length;i++){var o=s[i],c=o.getSnapshot;o=o.value;try{if(!He(c(),o))return!1}catch{return!1}}}if(s=a.child,a.subtreeFlags&16384&&s!==null)s.return=a,a=s;else{if(a===e)break;for(;a.sibling===null;){if(a.return===null||a.return===e)return!0;a=a.return}a.sibling.return=a.return,a=a.sibling}}return!0}function Ck(e,a){for(a&=~rk,a&=~qk,e.suspendedLanes|=a,e.pingedLanes&=~a,e=e.expirationTimes;0<a;){var s=31-oc(a),i=1<<s;e[s]=-1,a&=~i}}function Ek(e){if(K&6)throw Error(p(327));Hk();var a=uc(e,0);if(!(a&1))return Dk(e,B()),null;var s=Ik(e,a);if(e.tag!==0&&s===2){var i=xc(e);i!==0&&(a=i,s=Nk(e,i))}if(s===1)throw s=pk,Kk(e,0),Ck(e,a),Dk(e,B()),s;if(s===6)throw Error(p(345));return e.finishedWork=e.current.alternate,e.finishedLanes=a,Pk(e,tk,uk),Dk(e,B()),null}function Qk(e,a){var s=K;K|=1;try{return e(a)}finally{K=s,K===0&&(Gj=B()+500,fg&&jg())}}function Rk(e){wk!==null&&wk.tag===0&&!(K&6)&&Hk();var a=K;K|=1;var s=ok.transition,i=C;try{if(ok.transition=null,C=1,e)return e()}finally{C=i,ok.transition=s,K=a,!(K&6)&&jg()}}function Hj(){fj=ej.current,E(ej)}function Kk(e,a){e.finishedWork=null,e.finishedLanes=0;var s=e.timeoutHandle;if(s!==-1&&(e.timeoutHandle=-1,Gf(s)),Y!==null)for(s=Y.return;s!==null;){var i=s;switch(wg(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&$f();break;case 3:zh(),E(Wf),E(H),Eh();break;case 5:Bh(i);break;case 4:zh();break;case 13:E(L);break;case 19:E(L);break;case 10:ah(i.type._context);break;case 22:case 23:Hj()}s=s.return}if(Q=e,Y=e=Pg(e.current,null),Z=fj=a,T=0,pk=null,rk=qk=rh=0,tk=sk=null,fh!==null){for(a=0;a<fh.length;a++)if(s=fh[a],i=s.interleaved,i!==null){s.interleaved=null;var o=i.next,c=s.pending;if(c!==null){var g=c.next;c.next=o,i.next=g}s.pending=i}fh=null}return e}function Mk(e,a){do{var s=Y;try{if($g(),Fh.current=Rh,Ih){for(var i=M.memoizedState;i!==null;){var o=i.queue;o!==null&&(o.pending=null),i=i.next}Ih=!1}if(Hh=0,O=N=M=null,Jh=!1,Kh=0,nk.current=null,s===null||s.return===null){T=1,pk=a,Y=null;break}e:{var c=e,g=s.return,d=s,h=a;if(a=Z,d.flags|=32768,h!==null&&typeof h=="object"&&typeof h.then=="function"){var j=h,en=d,nn=en.tag;if(!(en.mode&1)&&(nn===0||nn===11||nn===15)){var _e=en.alternate;_e?(en.updateQueue=_e.updateQueue,en.memoizedState=_e.memoizedState,en.lanes=_e.lanes):(en.updateQueue=null,en.memoizedState=null)}var tn=Ui(g);if(tn!==null){tn.flags&=-257,Vi(tn,g,d,c,a),tn.mode&1&&Si(c,j,a),a=tn,h=j;var sn=a.updateQueue;if(sn===null){var ln=new Set;ln.add(h),a.updateQueue=ln}else sn.add(h);break e}else{if(!(a&1)){Si(c,j,a),tj();break e}h=Error(p(426))}}else if(I&&d.mode&1){var Tn=Ui(g);if(Tn!==null){!(Tn.flags&65536)&&(Tn.flags|=256),Vi(Tn,g,d,c,a),Jg(Ji(h,d));break e}}c=h=Ji(h,d),T!==4&&(T=2),sk===null?sk=[c]:sk.push(c),c=g;do{switch(c.tag){case 3:c.flags|=65536,a&=-a,c.lanes|=a;var b=Ni(c,h,a);ph(c,b);break e;case 1:d=h;var _=c.type,$=c.stateNode;if(!(c.flags&128)&&(typeof _.getDerivedStateFromError=="function"||$!==null&&typeof $.componentDidCatch=="function"&&(Ri===null||!Ri.has($)))){c.flags|=65536,a&=-a,c.lanes|=a;var an=Qi(c,d,a);ph(c,an);break e}}c=c.return}while(c!==null)}Sk(s)}catch(on){a=on,Y===s&&s!==null&&(Y=s=s.return);continue}break}while(!0)}function Jk(){var e=mk.current;return mk.current=Rh,e===null?Rh:e}function tj(){(T===0||T===3||T===2)&&(T=4),Q===null||!(rh&268435455)&&!(qk&268435455)||Ck(Q,Z)}function Ik(e,a){var s=K;K|=2;var i=Jk();(Q!==e||Z!==a)&&(uk=null,Kk(e,a));do try{Tk();break}catch(o){Mk(e,o)}while(!0);if($g(),K=s,mk.current=i,Y!==null)throw Error(p(261));return Q=null,Z=0,T}function Tk(){for(;Y!==null;)Uk(Y)}function Lk(){for(;Y!==null&&!cc();)Uk(Y)}function Uk(e){var a=Vk(e.alternate,e,fj);e.memoizedProps=e.pendingProps,a===null?Sk(e):Y=a,nk.current=null}function Sk(e){var a=e;do{var s=a.alternate;if(e=a.return,a.flags&32768){if(s=Ij(s,a),s!==null){s.flags&=32767,Y=s;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{T=6,Y=null;return}}else if(s=Ej(s,a,fj),s!==null){Y=s;return}if(a=a.sibling,a!==null){Y=a;return}Y=a=e}while(a!==null);T===0&&(T=5)}function Pk(e,a,s){var i=C,o=ok.transition;try{ok.transition=null,C=1,Wk(e,a,s,i)}finally{ok.transition=o,C=i}return null}function Wk(e,a,s,i){do Hk();while(wk!==null);if(K&6)throw Error(p(327));s=e.finishedWork;var o=e.finishedLanes;if(s===null)return null;if(e.finishedWork=null,e.finishedLanes=0,s===e.current)throw Error(p(177));e.callbackNode=null,e.callbackPriority=0;var c=s.lanes|s.childLanes;if(Bc(e,c),e===Q&&(Y=Q=null,Z=0),!(s.subtreeFlags&2064)&&!(s.flags&2064)||vk||(vk=!0,Fk(hc,function(){return Hk(),null})),c=(s.flags&15990)!==0,s.subtreeFlags&15990||c){c=ok.transition,ok.transition=null;var g=C;C=1;var d=K;K|=4,nk.current=null,Oj(e,s),dk(s,e),Oe(Df),dd=!!Cf,Df=Cf=null,e.current=s,hk(s),dc(),K=d,C=g,ok.transition=c}else e.current=s;if(vk&&(vk=!1,wk=e,xk=o),c=e.pendingLanes,c===0&&(Ri=null),mc(s.stateNode),Dk(e,B()),a!==null)for(i=e.onRecoverableError,s=0;s<a.length;s++)o=a[s],i(o.value,{componentStack:o.stack,digest:o.digest});if(Oi)throw Oi=!1,e=Pi,Pi=null,e;return xk&1&&e.tag!==0&&Hk(),c=e.pendingLanes,c&1?e===zk?yk++:(yk=0,zk=e):yk=0,jg(),null}function Hk(){if(wk!==null){var e=Dc(xk),a=ok.transition,s=C;try{if(ok.transition=null,C=16>e?16:e,wk===null)var i=!1;else{if(e=wk,wk=null,xk=0,K&6)throw Error(p(331));var o=K;for(K|=4,V=e.current;V!==null;){var c=V,g=c.child;if(V.flags&16){var d=c.deletions;if(d!==null){for(var h=0;h<d.length;h++){var j=d[h];for(V=j;V!==null;){var en=V;switch(en.tag){case 0:case 11:case 15:Pj(8,en,c)}var nn=en.child;if(nn!==null)nn.return=en,V=nn;else for(;V!==null;){en=V;var _e=en.sibling,tn=en.return;if(Sj(en),en===j){V=null;break}if(_e!==null){_e.return=tn,V=_e;break}V=tn}}}var sn=c.alternate;if(sn!==null){var ln=sn.child;if(ln!==null){sn.child=null;do{var Tn=ln.sibling;ln.sibling=null,ln=Tn}while(ln!==null)}}V=c}}if(c.subtreeFlags&2064&&g!==null)g.return=c,V=g;else e:for(;V!==null;){if(c=V,c.flags&2048)switch(c.tag){case 0:case 11:case 15:Pj(9,c,c.return)}var b=c.sibling;if(b!==null){b.return=c.return,V=b;break e}V=c.return}}var _=e.current;for(V=_;V!==null;){g=V;var $=g.child;if(g.subtreeFlags&2064&&$!==null)$.return=g,V=$;else e:for(g=_;V!==null;){if(d=V,d.flags&2048)try{switch(d.tag){case 0:case 11:case 15:Qj(9,d)}}catch(on){W(d,d.return,on)}if(d===g){V=null;break e}var an=d.sibling;if(an!==null){an.return=d.return,V=an;break e}V=d.return}}if(K=o,jg(),lc&&typeof lc.onPostCommitFiberRoot=="function")try{lc.onPostCommitFiberRoot(kc,e)}catch{}i=!0}return i}finally{C=s,ok.transition=a}}return!1}function Xk(e,a,s){a=Ji(s,a),a=Ni(e,a,1),e=nh(e,a,1),a=R(),e!==null&&(Ac(e,1,a),Dk(e,a))}function W(e,a,s){if(e.tag===3)Xk(e,e,s);else for(;a!==null;){if(a.tag===3){Xk(a,e,s);break}else if(a.tag===1){var i=a.stateNode;if(typeof a.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(Ri===null||!Ri.has(i))){e=Ji(s,e),e=Qi(a,e,1),a=nh(a,e,1),e=R(),a!==null&&(Ac(a,1,e),Dk(a,e));break}}a=a.return}}function Ti(e,a,s){var i=e.pingCache;i!==null&&i.delete(a),a=R(),e.pingedLanes|=e.suspendedLanes&s,Q===e&&(Z&s)===s&&(T===4||T===3&&(Z&130023424)===Z&&500>B()-fk?Kk(e,0):rk|=s),Dk(e,a)}function Yk(e,a){a===0&&(e.mode&1?(a=sc,sc<<=1,!(sc&130023424)&&(sc=4194304)):a=1);var s=R();e=ih(e,a),e!==null&&(Ac(e,a,s),Dk(e,s))}function uj(e){var a=e.memoizedState,s=0;a!==null&&(s=a.retryLane),Yk(e,s)}function bk(e,a){var s=0;switch(e.tag){case 13:var i=e.stateNode,o=e.memoizedState;o!==null&&(s=o.retryLane);break;case 19:i=e.stateNode;break;default:throw Error(p(314))}i!==null&&i.delete(a),Yk(e,s)}var Vk;Vk=function(e,a,s){if(e!==null)if(e.memoizedProps!==a.pendingProps||Wf.current)dh=!0;else{if(!(e.lanes&s)&&!(a.flags&128))return dh=!1,yj(e,a,s);dh=!!(e.flags&131072)}else dh=!1,I&&a.flags&1048576&&ug(a,ng,a.index);switch(a.lanes=0,a.tag){case 2:var i=a.type;ij(e,a),e=a.pendingProps;var o=Yf(a,H.current);ch(a,s),o=Nh(null,a,i,e,o,s);var c=Sh();return a.flags|=1,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0?(a.tag=1,a.memoizedState=null,a.updateQueue=null,Zf(i)?(c=!0,cg(a)):c=!1,a.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,kh(a),o.updater=Ei,a.stateNode=o,o._reactInternals=a,Ii(a,i,e,s),a=jj(null,a,i,!0,c,s)):(a.tag=0,I&&c&&vg(a),Xi(null,a,o,s),a=a.child),a;case 16:i=a.elementType;e:{switch(ij(e,a),e=a.pendingProps,o=i._init,i=o(i._payload),a.type=i,o=a.tag=Zk(i),e=Ci(i,e),o){case 0:a=cj(null,a,i,e,s);break e;case 1:a=hj(null,a,i,e,s);break e;case 11:a=Yi(null,a,i,e,s);break e;case 14:a=$i(null,a,i,Ci(i.type,e),s);break e}throw Error(p(306,i,""))}return a;case 0:return i=a.type,o=a.pendingProps,o=a.elementType===i?o:Ci(i,o),cj(e,a,i,o,s);case 1:return i=a.type,o=a.pendingProps,o=a.elementType===i?o:Ci(i,o),hj(e,a,i,o,s);case 3:e:{if(kj(a),e===null)throw Error(p(387));i=a.pendingProps,c=a.memoizedState,o=c.element,lh(e,a),qh(a,i,null,s);var g=a.memoizedState;if(i=g.element,c.isDehydrated)if(c={element:i,isDehydrated:!1,cache:g.cache,pendingSuspenseBoundaries:g.pendingSuspenseBoundaries,transitions:g.transitions},a.updateQueue.baseState=c,a.memoizedState=c,a.flags&256){o=Ji(Error(p(423)),a),a=lj(e,a,i,s,o);break e}else if(i!==o){o=Ji(Error(p(424)),a),a=lj(e,a,i,s,o);break e}else for(yg=Lf(a.stateNode.containerInfo.firstChild),xg=a,I=!0,zg=null,s=Vg(a,null,i,s),a.child=s;s;)s.flags=s.flags&-3|4096,s=s.sibling;else{if(Ig(),i===o){a=Zi(e,a,s);break e}Xi(e,a,i,s)}a=a.child}return a;case 5:return Ah(a),e===null&&Eg(a),i=a.type,o=a.pendingProps,c=e!==null?e.memoizedProps:null,g=o.children,Ef(i,o)?g=null:c!==null&&Ef(i,c)&&(a.flags|=32),gj(e,a),Xi(e,a,g,s),a.child;case 6:return e===null&&Eg(a),null;case 13:return oj(e,a,s);case 4:return yh(a,a.stateNode.containerInfo),i=a.pendingProps,e===null?a.child=Ug(a,null,i,s):Xi(e,a,i,s),a.child;case 11:return i=a.type,o=a.pendingProps,o=a.elementType===i?o:Ci(i,o),Yi(e,a,i,o,s);case 7:return Xi(e,a,a.pendingProps,s),a.child;case 8:return Xi(e,a,a.pendingProps.children,s),a.child;case 12:return Xi(e,a,a.pendingProps.children,s),a.child;case 10:e:{if(i=a.type._context,o=a.pendingProps,c=a.memoizedProps,g=o.value,G(Wg,i._currentValue),i._currentValue=g,c!==null)if(He(c.value,g)){if(c.children===o.children&&!Wf.current){a=Zi(e,a,s);break e}}else for(c=a.child,c!==null&&(c.return=a);c!==null;){var d=c.dependencies;if(d!==null){g=c.child;for(var h=d.firstContext;h!==null;){if(h.context===i){if(c.tag===1){h=mh(-1,s&-s),h.tag=2;var j=c.updateQueue;if(j!==null){j=j.shared;var en=j.pending;en===null?h.next=h:(h.next=en.next,en.next=h),j.pending=h}}c.lanes|=s,h=c.alternate,h!==null&&(h.lanes|=s),bh(c.return,s,a),d.lanes|=s;break}h=h.next}}else if(c.tag===10)g=c.type===a.type?null:c.child;else if(c.tag===18){if(g=c.return,g===null)throw Error(p(341));g.lanes|=s,d=g.alternate,d!==null&&(d.lanes|=s),bh(g,s,a),g=c.sibling}else g=c.child;if(g!==null)g.return=c;else for(g=c;g!==null;){if(g===a){g=null;break}if(c=g.sibling,c!==null){c.return=g.return,g=c;break}g=g.return}c=g}Xi(e,a,o.children,s),a=a.child}return a;case 9:return o=a.type,i=a.pendingProps.children,ch(a,s),o=eh(o),i=i(o),a.flags|=1,Xi(e,a,i,s),a.child;case 14:return i=a.type,o=Ci(i,a.pendingProps),o=Ci(i.type,o),$i(e,a,i,o,s);case 15:return bj(e,a,a.type,a.pendingProps,s);case 17:return i=a.type,o=a.pendingProps,o=a.elementType===i?o:Ci(i,o),ij(e,a),a.tag=1,Zf(i)?(e=!0,cg(a)):e=!1,ch(a,s),Gi(a,i,o),Ii(a,i,o,s),jj(null,a,i,!0,e,s);case 19:return xj(e,a,s);case 22:return dj(e,a,s)}throw Error(p(156,a.tag))};function Fk(e,a){return ac(e,a)}function $k(e,a,s,i){this.tag=e,this.key=s,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=a,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Bg(e,a,s,i){return new $k(e,a,s,i)}function aj(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Zk(e){if(typeof e=="function")return aj(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Da)return 11;if(e===Ga)return 14}return 2}function Pg(e,a){var s=e.alternate;return s===null?(s=Bg(e.tag,a,e.key,e.mode),s.elementType=e.elementType,s.type=e.type,s.stateNode=e.stateNode,s.alternate=e,e.alternate=s):(s.pendingProps=a,s.type=e.type,s.flags=0,s.subtreeFlags=0,s.deletions=null),s.flags=e.flags&14680064,s.childLanes=e.childLanes,s.lanes=e.lanes,s.child=e.child,s.memoizedProps=e.memoizedProps,s.memoizedState=e.memoizedState,s.updateQueue=e.updateQueue,a=e.dependencies,s.dependencies=a===null?null:{lanes:a.lanes,firstContext:a.firstContext},s.sibling=e.sibling,s.index=e.index,s.ref=e.ref,s}function Rg(e,a,s,i,o,c){var g=2;if(i=e,typeof e=="function")aj(e)&&(g=1);else if(typeof e=="string")g=5;else e:switch(e){case ya:return Tg(s.children,o,c,a);case za:g=8,o|=8;break;case Aa:return e=Bg(12,s,a,o|2),e.elementType=Aa,e.lanes=c,e;case Ea:return e=Bg(13,s,a,o),e.elementType=Ea,e.lanes=c,e;case Fa:return e=Bg(19,s,a,o),e.elementType=Fa,e.lanes=c,e;case Ia:return pj(s,o,c,a);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Ba:g=10;break e;case Ca:g=9;break e;case Da:g=11;break e;case Ga:g=14;break e;case Ha:g=16,i=null;break e}throw Error(p(130,e==null?e:typeof e,""))}return a=Bg(g,s,a,o),a.elementType=e,a.type=i,a.lanes=c,a}function Tg(e,a,s,i){return e=Bg(7,e,i,a),e.lanes=s,e}function pj(e,a,s,i){return e=Bg(22,e,i,a),e.elementType=Ia,e.lanes=s,e.stateNode={isHidden:!1},e}function Qg(e,a,s){return e=Bg(6,e,null,a),e.lanes=s,e}function Sg(e,a,s){return a=Bg(4,e.children!==null?e.children:[],e.key,a),a.lanes=s,a.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},a}function al(e,a,s,i,o){this.tag=a,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=zc(0),this.expirationTimes=zc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=zc(0),this.identifierPrefix=i,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null}function bl(e,a,s,i,o,c,g,d,h){return e=new al(e,a,s,d,h),a===1?(a=1,c===!0&&(a|=8)):a=0,c=Bg(3,null,null,a),e.current=c,c.stateNode=e,c.memoizedState={element:i,isDehydrated:s,cache:null,transitions:null,pendingSuspenseBoundaries:null},kh(c),e}function cl(e,a,s){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:wa,key:i==null?null:""+i,children:e,containerInfo:a,implementation:s}}function dl(e){if(!e)return Vf;e=e._reactInternals;e:{if(Vb(e)!==e||e.tag!==1)throw Error(p(170));var a=e;do{switch(a.tag){case 3:a=a.stateNode.context;break e;case 1:if(Zf(a.type)){a=a.stateNode.__reactInternalMemoizedMergedChildContext;break e}}a=a.return}while(a!==null);throw Error(p(171))}if(e.tag===1){var s=e.type;if(Zf(s))return bg(e,s,a)}return a}function el(e,a,s,i,o,c,g,d,h){return e=bl(s,i,!0,e,o,c,g,d,h),e.context=dl(null),s=e.current,i=R(),o=yi(s),c=mh(i,o),c.callback=a??null,nh(s,c,o),e.current.lanes=o,Ac(e,o,i),Dk(e,i),e}function fl(e,a,s,i){var o=a.current,c=R(),g=yi(o);return s=dl(s),a.context===null?a.context=s:a.pendingContext=s,a=mh(c,g),a.payload={element:e},i=i===void 0?null:i,i!==null&&(a.callback=i),e=nh(o,a,g),e!==null&&(gi(e,o,g,c),oh(e,o,g)),g}function gl(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function hl(e,a){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var s=e.retryLane;e.retryLane=s!==0&&s<a?s:a}}function il(e,a){hl(e,a),(e=e.alternate)&&hl(e,a)}function jl(){return null}var kl=typeof reportError=="function"?reportError:function(e){console.error(e)};function ll(e){this._internalRoot=e}ml.prototype.render=ll.prototype.render=function(e){var a=this._internalRoot;if(a===null)throw Error(p(409));fl(e,a,null,null)};ml.prototype.unmount=ll.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var a=e.containerInfo;Rk(function(){fl(null,e,null,null)}),a[uf]=null}};function ml(e){this._internalRoot=e}ml.prototype.unstable_scheduleHydration=function(e){if(e){var a=Hc();e={blockedOn:null,target:e,priority:a};for(var s=0;s<Qc.length&&a!==0&&a<Qc[s].priority;s++);Qc.splice(s,0,e),s===0&&Vc(e)}};function nl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function ol(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function pl(){}function ql(e,a,s,i,o){if(o){if(typeof i=="function"){var c=i;i=function(){var j=gl(g);c.call(j)}}var g=el(a,i,e,0,null,!1,!1,"",pl);return e._reactRootContainer=g,e[uf]=g.current,sf(e.nodeType===8?e.parentNode:e),Rk(),g}for(;o=e.lastChild;)e.removeChild(o);if(typeof i=="function"){var d=i;i=function(){var j=gl(h);d.call(j)}}var h=bl(e,0,!1,null,null,!1,!1,"",pl);return e._reactRootContainer=h,e[uf]=h.current,sf(e.nodeType===8?e.parentNode:e),Rk(function(){fl(a,h,s,i)}),h}function rl(e,a,s,i,o){var c=s._reactRootContainer;if(c){var g=c;if(typeof o=="function"){var d=o;o=function(){var h=gl(g);d.call(h)}}fl(a,g,e,o)}else g=ql(s,a,e,o,i);return gl(g)}Ec=function(e){switch(e.tag){case 3:var a=e.stateNode;if(a.current.memoizedState.isDehydrated){var s=tc(a.pendingLanes);s!==0&&(Cc(a,s|1),Dk(a,B()),!(K&6)&&(Gj=B()+500,jg()))}break;case 13:Rk(function(){var i=ih(e,1);if(i!==null){var o=R();gi(i,e,1,o)}}),il(e,1)}};Fc=function(e){if(e.tag===13){var a=ih(e,134217728);if(a!==null){var s=R();gi(a,e,134217728,s)}il(e,134217728)}};Gc=function(e){if(e.tag===13){var a=yi(e),s=ih(e,a);if(s!==null){var i=R();gi(s,e,a,i)}il(e,a)}};Hc=function(){return C};Ic=function(e,a){var s=C;try{return C=e,a()}finally{C=s}};yb=function(e,a,s){switch(a){case"input":if(bb(e,s),a=s.name,s.type==="radio"&&a!=null){for(s=e;s.parentNode;)s=s.parentNode;for(s=s.querySelectorAll("input[name="+JSON.stringify(""+a)+'][type="radio"]'),a=0;a<s.length;a++){var i=s[a];if(i!==e&&i.form===e.form){var o=Db(i);if(!o)throw Error(p(90));Wa(i),bb(i,o)}}}break;case"textarea":ib(e,s);break;case"select":a=s.value,a!=null&&fb(e,!!s.multiple,a,!1)}};Gb=Qk;Hb=Rk;var sl={usingClientEntryPoint:!1,Events:[Cb,ue,Db,Eb,Fb,Qk]},tl={findFiberByHostInstance:Wc,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},ul={bundleType:tl.bundleType,version:tl.version,rendererPackageName:tl.rendererPackageName,rendererConfig:tl.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ua.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Zb(e),e===null?null:e.stateNode},findFiberByHostInstance:tl.findFiberByHostInstance||jl,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var vl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!vl.isDisabled&&vl.supportsFiber)try{kc=vl.inject(ul),lc=vl}catch{}}reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=sl;reactDom_production_min.createPortal=function(e,a){var s=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!nl(a))throw Error(p(200));return cl(e,a,null,s)};reactDom_production_min.createRoot=function(e,a){if(!nl(e))throw Error(p(299));var s=!1,i="",o=kl;return a!=null&&(a.unstable_strictMode===!0&&(s=!0),a.identifierPrefix!==void 0&&(i=a.identifierPrefix),a.onRecoverableError!==void 0&&(o=a.onRecoverableError)),a=bl(e,1,!1,null,null,s,!1,i,o),e[uf]=a.current,sf(e.nodeType===8?e.parentNode:e),new ll(a)};reactDom_production_min.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var a=e._reactInternals;if(a===void 0)throw typeof e.render=="function"?Error(p(188)):(e=Object.keys(e).join(","),Error(p(268,e)));return e=Zb(a),e=e===null?null:e.stateNode,e};reactDom_production_min.flushSync=function(e){return Rk(e)};reactDom_production_min.hydrate=function(e,a,s){if(!ol(a))throw Error(p(200));return rl(null,e,a,!0,s)};reactDom_production_min.hydrateRoot=function(e,a,s){if(!nl(e))throw Error(p(405));var i=s!=null&&s.hydratedSources||null,o=!1,c="",g=kl;if(s!=null&&(s.unstable_strictMode===!0&&(o=!0),s.identifierPrefix!==void 0&&(c=s.identifierPrefix),s.onRecoverableError!==void 0&&(g=s.onRecoverableError)),a=el(a,null,e,1,s??null,o,!1,c,g),e[uf]=a.current,sf(e),i)for(e=0;e<i.length;e++)s=i[e],o=s._getVersion,o=o(s._source),a.mutableSourceEagerHydrationData==null?a.mutableSourceEagerHydrationData=[s,o]:a.mutableSourceEagerHydrationData.push(s,o);return new ml(a)};reactDom_production_min.render=function(e,a,s){if(!ol(a))throw Error(p(200));return rl(null,e,a,!1,s)};reactDom_production_min.unmountComponentAtNode=function(e){if(!ol(e))throw Error(p(40));return e._reactRootContainer?(Rk(function(){rl(null,null,e,!1,function(){e._reactRootContainer=null,e[uf]=null})}),!0):!1};reactDom_production_min.unstable_batchedUpdates=Qk;reactDom_production_min.unstable_renderSubtreeIntoContainer=function(e,a,s,i){if(!ol(s))throw Error(p(200));if(e==null||e._reactInternals===void 0)throw Error(p(38));return rl(e,a,s,!1,i)};reactDom_production_min.version="18.3.1-next-f1338f8080-20240426";function checkDCE(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE)}catch(e){console.error(e)}}checkDCE(),reactDom.exports=reactDom_production_min;var reactDomExports=reactDom.exports,m=reactDomExports;client.createRoot=m.createRoot,client.hydrateRoot=m.hydrateRoot;const NODE_TYPE_LABELS={start:{zhCN:"巅峰起点",enUS:"Paragon Start"},gate:{zhCN:"面板连接关口",enUS:"Board Attachment Gate"},normal:{zhCN:"普通节点",enUS:"Normal Node"},magic:{zhCN:"魔法节点",enUS:"Magic Node"},rare:{zhCN:"稀有节点",enUS:"Rare Node"},legendary:{zhCN:"传奇节点",enUS:"Legendary Node"},socket:{zhCN:"雕纹槽位",enUS:"Glyph Socket"}},NODE_TYPE_COLORS={start:"#d9c9a8",gate:"#e8833a",normal:"#6b6052",magic:"#3d6b8a",rare:"#c9a13b",legendary:"#b8362a",socket:"#8a4a9e"},ALLOCATED_COLORS={start:"#ffffff",gate:"#ffaa00",normal:"#8b7355",magic:"#4a8fc4",rare:"#ffd700",legendary:"#ff4444",socket:"#b06ec9"},NODE_SIZE=36,NODE_GAP=4,CELL_SIZE=NODE_SIZE+NODE_GAP,PARAGON_GRID_COORDINATES={V:[-1680,-4200],E:[-840,-4200],F:[0,-4200],G:[840,-4200],H:[1680,-4200],I:[2520,-4200],U:[3360,-4200],W:[-1680,-3360],D:[-840,-3360],J:[0,-3360],K:[840,-3360],L:[1680,-3360],M:[2520,-3360],T:[3360,-3360],X:[-1680,-2520],C:[-840,-2520],7:[0,-2520],8:[840,-2520],9:[1680,-2520],N:[2520,-2520],S:[3360,-2520],Y:[-1680,-1680],B:[-840,-1680],4:[0,-1680],5:[840,-1680],6:[1680,-1680],O:[2520,-1680],R:[3360,-1680],Z:[-1680,-840],A:[-840,-840],1:[0,-840],2:[840,-840],3:[1680,-840],P:[2520,-840],Q:[3360,-840]},BOARD_LOCATIONS=["1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],TOOLBAR_BUTTONS=[{action:"rotate",icon:"↻",title:"旋转盘面",tooltip:"顺时针旋转90°"},{action:"clear",icon:"⊗",title:"清理盘面",tooltip:"清除所有点亮节点"},{action:"replace",icon:"⊕",title:"替换盘面",tooltip:"重新选择盘面"},{action:"delete",icon:"⊖",title:"删除盘面",tooltip:"移除该盘面"}],TOOLBAR_BUTTON_SIZE=24,TOOLBAR_BUTTON_GAP=8,TOOLBAR_PADDING=10;function getNodeColor(e,a){return a?ALLOCATED_COLORS[e]||"#ff6600":NODE_TYPE_COLORS[e]||"#6b6052"}function getNodeWorldPosition(e,a,s,i,o){const[c,g]=PARAGON_GRID_COORDINATES[a.gridLocation]||[0,0],d=c,h=g,j=i*o,en=s*o;if(a.rotation!==0){const nn=e.cols*o/2,_e=e.rows*o/2,tn=a.rotation*Math.PI/180,sn=Math.cos(tn),ln=Math.sin(tn),Tn=j-nn,b=en-_e,_=Tn*sn-b*ln+nn,$=Tn*ln+b*sn+_e;return{x:d+_,y:h+$}}return{x:d+j,y:h+en}}function getNodeCenterWorld(e,a,s,i,o){const c=getNodeWorldPosition(e,a,s,i,o);return{x:c.x+o/2,y:c.y+o/2}}function drawNode(e,a,s,i,o,c,g,d,h){const j=s+o/2,en=i+o/2,_e=(o-4*2)/2,tn=a.type;e.fillStyle="#1a1a1a",e.fillRect(s,i,o,o),e.strokeStyle="#2a2a2a",e.lineWidth=1,e.strokeRect(s,i,o,o);const sn=getNodeColor(tn,c);if(c||tn==="legendary"){const ln=tn==="legendary"?10:8,Tn=e.createRadialGradient(j,en,_e,j,en,_e+ln);Tn.addColorStop(0,sn),Tn.addColorStop(.5,sn+"60"),Tn.addColorStop(1,"transparent"),e.fillStyle=Tn,e.beginPath(),e.arc(j,en,_e+ln,0,Math.PI*2),e.fill()}if(e.fillStyle=sn,e.beginPath(),tn==="gate"||tn==="socket")e.moveTo(j,en-_e),e.lineTo(j+_e,en),e.lineTo(j,en+_e),e.lineTo(j-_e,en),e.closePath();else if(tn==="legendary"){for(let ln=0;ln<6;ln++){const Tn=Math.PI/3*ln-Math.PI/2,b=j+_e*Math.cos(Tn),_=en+_e*Math.sin(Tn);ln===0?e.moveTo(b,_):e.lineTo(b,_)}e.closePath()}else e.arc(j,en,_e,0,Math.PI*2);e.fill(),c?(e.strokeStyle="#ff4444",e.lineWidth=3,e.shadowColor="#ff4444",e.shadowBlur=8):g?(e.strokeStyle="#ffffff",e.lineWidth=3):d?(e.strokeStyle="#00ff00",e.lineWidth=2):(e.strokeStyle="#2a2a2a",e.lineWidth=1.5),e.stroke(),e.shadowBlur=0,e.fillStyle="#ffffff",e.font=`bold ${o*.35}px Arial`,e.textAlign="center",e.textBaseline="middle",tn==="start"?e.fillText("★",j,en):tn==="gate"?e.fillText("▸",j,en):tn==="socket"?h?(e.font=`bold ${o*.3}px Arial`,e.fillText(`${h.rank}`,j,en)):e.fillText("◈",j,en):tn==="legendary"&&e.fillText("◆",j,en)}function drawConnectionLine(e,a,s,i,o,c){e.strokeStyle=c?"#ff4444":"#666666",e.lineWidth=c?4:2,e.setLineDash([]),e.beginPath(),e.moveTo(a,s),e.lineTo(i,o),e.stroke()}const ParagonCanvas=({boards:e,connectedBoards:a,allocations:s,reachableNodes:i,socketGlyphs:o,hoveredNode:c,onNodeHover:g,onNodeClick:d,zoom:h,pan:j,onZoomChange:en,onPanChange:nn,onRotateBoard:_e,onClearBoard:tn,onReplaceBoard:sn,onDeleteBoard:ln})=>{const Tn=reactExports.useRef(null),b=reactExports.useRef(null),_=reactExports.useRef(!1),$=reactExports.useRef({x:0,y:0}),an=reactExports.useRef(null),[on,cn]=reactExports.useState(null),gn=reactExports.useMemo(()=>{const rn=[];return a.forEach(yn=>{var hn,_n;const un=e.find(En=>En.id===yn.boardId);if(un)for(let En=0;En<un.rows;En++)for(let wn=0;wn<un.cols;wn++){if(!((hn=un.grid[En])==null?void 0:hn[wn]))continue;const Dn=`${yn.boardId}_${En}_${wn}`,Nn=s.has(Dn),Rn=[{dr:0,dc:1,name:"right"},{dr:1,dc:0,name:"down"}];for(const kn of Rn){const Pn=En+kn.dr,Vn=wn+kn.dc;if(Pn>=un.rows||Vn>=un.cols||!((_n=un.grid[Pn])==null?void 0:_n[Vn]))continue;const Fn=`${yn.boardId}_${Pn}_${Vn}`,An=s.has(Fn);if(Nn||An){const On=getNodeCenterWorld(un,yn,En,wn,CELL_SIZE),Hn=getNodeCenterWorld(un,yn,Pn,Vn,CELL_SIZE);rn.push({from:On,to:Hn,isActive:Nn&&An})}}}}),rn},[e,a,s]),dn=reactExports.useCallback(()=>{const rn=Tn.current,yn=b.current;if(!rn||!yn)return;const un=rn.getContext("2d");un&&(rn.width=yn.clientWidth,rn.height=yn.clientHeight,un.clearRect(0,0,rn.width,rn.height),un.fillStyle="#1a1a1a",un.fillRect(0,0,rn.width,rn.height),un.save(),un.translate(rn.width/2+j.x,rn.height/2+j.y),un.scale(h,h),gn.forEach(hn=>{drawConnectionLine(un,hn.from.x,hn.from.y,hn.to.x,hn.to.y,hn.isActive)}),a.forEach((hn,_n)=>{var Fn;const En=e.find(An=>An.id===hn.boardId);if(!En)return;const[wn,vn]=PARAGON_GRID_COORDINATES[hn.gridLocation]||[0,0],Dn=En.cols*CELL_SIZE,Nn=En.rows*CELL_SIZE,Rn=wn,kn=vn;if(un.save(),hn.rotation!==0){const An=Dn/2,On=Nn/2;un.translate(Rn+An,kn+On),un.rotate(hn.rotation*Math.PI/180),un.translate(-An,-On)}const Pn=hn.rotation!==0?0:Rn,Vn=hn.rotation!==0?0:kn,jn=21*CELL_SIZE;un.fillStyle="#252525",un.fillRect(Pn,Vn,jn,jn),un.strokeStyle="#ff0000",un.lineWidth=2/h,un.strokeRect(Pn,Vn,jn,jn);for(let An=0;An<En.rows;An++)for(let On=0;On<En.cols;On++){const Hn=(Fn=En.grid[An])==null?void 0:Fn[On];if(!Hn)continue;const qn=`${hn.boardId}_${An}_${On}`,bn=s.has(qn),zn=(c==null?void 0:c.boardId)===hn.boardId&&(c==null?void 0:c.row)===An&&(c==null?void 0:c.col)===On,$n=i.has(qn)&&!bn,Un=Pn+On*CELL_SIZE+NODE_GAP,Yn=Vn+An*CELL_SIZE+NODE_GAP,Xn=`${hn.boardId}_${An}_${On}`,Kn=o.get(Xn);drawNode(un,Hn,Un,Yn,NODE_SIZE,bn,zn,$n,Kn)}un.restore(),un.fillStyle="#888888",un.font="14px Arial",un.textAlign="center",un.fillText(En.name,Rn+En.cols*CELL_SIZE/2,kn-10),Sn(un,hn,En,_n,Rn,kn,Dn)}),un.restore())},[e,a,s,i,gn,c,h,j,on]),Sn=(rn,yn,un,hn,_n=0,En=0,wn=0)=>{wn===0&&(wn=un.cols*CELL_SIZE);const vn=_n+wn-TOOLBAR_PADDING-TOOLBAR_BUTTON_SIZE,Dn=En+TOOLBAR_PADDING;(yn.boardId.includes("Start")?TOOLBAR_BUTTONS.filter(kn=>kn.action==="clear"):TOOLBAR_BUTTONS).forEach((kn,Pn)=>{const Vn=vn-Pn*(TOOLBAR_BUTTON_SIZE+TOOLBAR_BUTTON_GAP),jn=Dn,Fn=(on==null?void 0:on.boardIndex)===hn&&(on==null?void 0:on.action)===kn.action;if(rn.fillStyle=Fn?"rgba(201, 161, 59, 0.3)":"rgba(0, 0, 0, 0.7)",rn.beginPath(),rn.roundRect(Vn,jn,TOOLBAR_BUTTON_SIZE,TOOLBAR_BUTTON_SIZE,4),rn.fill(),rn.strokeStyle=Fn?"#c9a13b":"#444",rn.lineWidth=1,rn.stroke(),rn.fillStyle=Fn?"#c9a13b":"#ccc",rn.font=`${TOOLBAR_BUTTON_SIZE*.6}px Arial`,rn.textAlign="center",rn.textBaseline="middle",rn.fillText(kn.icon,Vn+TOOLBAR_BUTTON_SIZE/2,jn+TOOLBAR_BUTTON_SIZE/2),Fn&&kn.tooltip){rn.font="12px Arial";const Hn=rn.measureText(kn.tooltip).width+6*2,qn=12+6*2,bn=Vn+TOOLBAR_BUTTON_SIZE/2-Hn/2,zn=jn+TOOLBAR_BUTTON_SIZE+4;rn.fillStyle="rgba(0, 0, 0, 0.9)",rn.beginPath(),rn.roundRect(bn,zn,Hn,qn,4),rn.fill(),rn.strokeStyle="#c9a13b",rn.lineWidth=1,rn.stroke(),rn.fillStyle="#c9a13b",rn.font="12px Arial",rn.textAlign="center",rn.textBaseline="middle",rn.fillText(kn.tooltip,bn+Hn/2,zn+qn/2)}})},mn=reactExports.useCallback((rn,yn)=>{const un=Tn.current;if(!un)return{x:0,y:0};const hn=un.getBoundingClientRect(),_n=rn-hn.left,En=yn-hn.top;return{x:(_n-un.width/2-j.x)/h,y:(En-un.height/2-j.y)/h}},[h,j,Tn]),Cn=reactExports.useCallback((rn,yn,un,hn)=>{const[_n,En]=PARAGON_GRID_COORDINATES[yn.gridLocation]||[0,0],wn=_n,vn=En,Dn=rn.cols*CELL_SIZE/2,Nn=rn.rows*CELL_SIZE/2;if(yn.rotation!==0){const Pn=yn.rotation*Math.PI/180,Vn=Math.cos(Pn),jn=Math.sin(Pn);return[[hn*CELL_SIZE+NODE_GAP-Dn,un*CELL_SIZE+NODE_GAP-Nn],[hn*CELL_SIZE+NODE_GAP+NODE_SIZE-Dn,un*CELL_SIZE+NODE_GAP-Nn],[hn*CELL_SIZE+NODE_GAP+NODE_SIZE-Dn,un*CELL_SIZE+NODE_GAP+NODE_SIZE-Nn],[hn*CELL_SIZE+NODE_GAP-Dn,un*CELL_SIZE+NODE_GAP+NODE_SIZE-Nn]].map(([An,On])=>{const Hn=An*Vn-On*jn,qn=An*jn+On*Vn;return[wn+Dn+Hn,vn+Nn+qn]})}const Rn=wn+hn*CELL_SIZE+NODE_GAP,kn=vn+un*CELL_SIZE+NODE_GAP;return[[Rn,kn],[Rn+NODE_SIZE,kn],[Rn+NODE_SIZE,kn+NODE_SIZE],[Rn,kn+NODE_SIZE]]},[]),Wn=reactExports.useCallback((rn,yn,un,hn)=>{const _n=Cn(rn,yn,un,hn),En=_n.map(vn=>vn[0]),wn=_n.map(vn=>vn[1]);return{minX:Math.min(...En),minY:Math.min(...wn),maxX:Math.max(...En),maxY:Math.max(...wn),corners:_n}},[Cn]),Gn=(rn,yn,un)=>{let hn=!1;const _n=un.length;for(let En=0,wn=_n-1;En<_n;wn=En++){const vn=un[En][0],Dn=un[En][1],Nn=un[wn][0],Rn=un[wn][1];Dn>yn!=Rn>yn&&rn<(Nn-vn)*(yn-Dn)/(Rn-Dn)+vn&&(hn=!hn)}return hn},Bn=(rn,yn,un)=>{const[hn,_n]=PARAGON_GRID_COORDINATES[rn.gridLocation]||[0,0],En=yn.cols*CELL_SIZE,wn=hn+En-TOOLBAR_PADDING-TOOLBAR_BUTTON_SIZE,vn=_n+TOOLBAR_PADDING,Dn=wn-un*(TOOLBAR_BUTTON_SIZE+TOOLBAR_BUTTON_GAP),Nn=vn;return{minX:Dn,minY:Nn,maxX:Dn+TOOLBAR_BUTTON_SIZE,maxY:Nn+TOOLBAR_BUTTON_SIZE}},Mn=reactExports.useCallback(rn=>{var vn;const yn=Tn.current;if(!yn)return;if(_.current){const Dn=rn.clientX-$.current.x,Nn=rn.clientY-$.current.y;$.current={x:rn.clientX,y:rn.clientY},nn({x:j.x+Dn,y:j.y+Nn});return}const un=mn(rn.clientX,rn.clientY);let hn=null;for(let Dn=0;Dn<a.length;Dn++){const Nn=a[Dn],Rn=e.find(Vn=>Vn.id===Nn.boardId);if(!Rn)continue;const Pn=Nn.boardId.includes("Start")?TOOLBAR_BUTTONS.filter(Vn=>Vn.action==="clear"):TOOLBAR_BUTTONS;for(let Vn=0;Vn<Pn.length;Vn++){const jn=Bn(Nn,Rn,Vn);if(un.x>=jn.minX&&un.x<=jn.maxX&&un.y>=jn.minY&&un.y<=jn.maxY){hn={boardIndex:Dn,action:Pn[Vn].action,x:(jn.minX+jn.maxX)/2,y:jn.minY-10};break}}if(hn)break}if(hn){cn(hn),yn.style.cursor="pointer";return}cn(null);let _n=null;for(const Dn of a){const Nn=e.find(Rn=>Rn.id===Dn.boardId);if(Nn){for(let Rn=0;Rn<Nn.rows;Rn++){for(let kn=0;kn<Nn.cols;kn++){const Pn=(vn=Nn.grid[Rn])==null?void 0:vn[kn];if(!Pn)continue;const Vn=Wn(Nn,Dn,Rn,kn);if(!(un.x<Vn.minX||un.x>Vn.maxX||un.y<Vn.minY||un.y>Vn.maxY))if(Dn.rotation!==0&&Vn.corners){if(Gn(un.x,un.y,Vn.corners)){_n={node:Pn,boardId:Dn.boardId,row:Rn,col:kn};break}}else{_n={node:Pn,boardId:Dn.boardId,row:Rn,col:kn};break}}if(_n)break}if(_n)break}}yn.style.cursor=_n?"pointer":"default",an.current&&clearTimeout(an.current);const En=c?`${c.boardId}_${c.row}_${c.col}`:null,wn=_n?`${_n.boardId}_${_n.row}_${_n.col}`:null;En!==wn&&(an.current=window.setTimeout(()=>{g(_n)},30))},[e,a,mn,Wn,Gn,g,c]),Ln=reactExports.useCallback(rn=>{var un;if(_.current)return;const yn=mn(rn.clientX,rn.clientY);for(let hn=0;hn<a.length;hn++){const _n=a[hn],En=e.find(Dn=>Dn.id===_n.boardId);if(!En)continue;const vn=_n.boardId.includes("Start")?TOOLBAR_BUTTONS.filter(Dn=>Dn.action==="clear"):TOOLBAR_BUTTONS;for(let Dn=0;Dn<vn.length;Dn++){const Nn=Bn(_n,En,Dn);if(yn.x>=Nn.minX&&yn.x<=Nn.maxX&&yn.y>=Nn.minY&&yn.y<=Nn.maxY){switch(vn[Dn].action){case"rotate":_e(hn);break;case"clear":tn(hn);break;case"replace":sn(hn);break;case"delete":ln(hn);break}return}}}for(const hn of a){const _n=e.find(En=>En.id===hn.boardId);if(_n)for(let En=0;En<_n.rows;En++)for(let wn=0;wn<_n.cols;wn++){const vn=(un=_n.grid[En])==null?void 0:un[wn];if(!vn)continue;const Dn=Wn(_n,hn,En,wn);if(!(yn.x<Dn.minX||yn.x>Dn.maxX||yn.y<Dn.minY||yn.y>Dn.maxY))if(hn.rotation!==0&&Dn.corners){if(Gn(yn.x,yn.y,Dn.corners)){d(hn.boardId,En,wn,vn);return}}else{d(hn.boardId,En,wn,vn);return}}}},[e,a,mn,Wn,Gn,d,_e,tn,sn,ln]),In=reactExports.useCallback(rn=>{if(rn.button!==0)return;_.current=!0,$.current={x:rn.clientX,y:rn.clientY};const yn=Tn.current;yn&&(yn.style.cursor="grabbing")},[]),pn=reactExports.useCallback(()=>{_.current=!1;const rn=Tn.current;rn&&(rn.style.cursor="default")},[]),fn=reactExports.useCallback(()=>{_.current=!1,g(null);const rn=Tn.current;rn&&(rn.style.cursor="default")},[g]),xn=reactExports.useCallback(rn=>{const yn=rn.deltaY>0?.9:1.1,un=Math.max(.05,Math.min(2,h*yn)),hn=Tn.current;if(hn){const _n=hn.getBoundingClientRect(),En=rn.clientX-_n.left,wn=rn.clientY-_n.top,vn=un/h;nn({x:En-(En-j.x)*vn,y:wn-(wn-j.y)*vn})}en(un)},[h,j,en,nn]);return reactExports.useEffect(()=>{dn()},[dn]),jsxRuntimeExports.jsxs("div",{ref:b,style:{overflow:"hidden",position:"relative",border:"1px solid #444",background:"#1a1a1a",width:"100%",height:"100%"},children:[jsxRuntimeExports.jsx("canvas",{ref:Tn,onMouseMove:Mn,onMouseDown:In,onMouseUp:pn,onMouseLeave:fn,onClick:Ln,onWheel:xn,style:{display:"block",cursor:"default"}}),jsxRuntimeExports.jsxs("div",{style:{position:"absolute",bottom:"10px",right:"10px",background:"rgba(0,0,0,0.7)",color:"#d2c8ae",padding:"4px 8px",borderRadius:"4px",fontSize:"12px",fontFamily:"monospace"},children:[Math.round(h*100),"%"]}),jsxRuntimeExports.jsx("div",{style:{position:"absolute",top:"10px",left:"10px",background:"rgba(0,0,0,0.5)",color:"#888",padding:"4px 8px",borderRadius:"4px",fontSize:"11px"},children:"拖拽移动 · 滚轮缩放 · 点击节点分配"})]})},getNodeName=(e,a)=>a==="zhCN"&&e.nameCn?e.nameCn:e.nameEn||e.name||NODE_TYPE_LABELS[e.type][a],translateTerms=e=>{const a=[["Physical","物理"],["Damage","伤害"],["Strength","力量"],["Intelligence","智力"],["Willpower","意力"],["Dexterity","敏捷"],["Armor","护甲"],["Life","生命"],["Bonus","加成"],["Another","额外"],["if requirements met","满足门槛要求"],["requirements","门槛要求"],["met","满足"],["\\+","+"],["%","%"]];let s=e;for(const[i,o]of a){const c=new RegExp(i,"g");s=s.replace(c,o)}return s=s.replace(/\n{3,}/g,`

`).trim(),s},calculateThresholdRequirements=(node,equipIndex=1,className="Barbarian")=>{if(!node.thresholdRequirements)return"";const classRequirements=node.thresholdRequirements[className];if(!classRequirements||classRequirements.length===0)return"";let requirement=classRequirements[0];const expressionMatch=requirement.match(/\{(.+?)\}/);if(expressionMatch){const expression=expressionMatch[1],evaluatedExpression=expression.replace(/ParagonBoardEquipIndex/g,equipIndex.toString());try{const result=eval(evaluatedExpression);requirement=requirement.replace(/\{.+?\}/,Math.round(result).toString())}catch(e){console.error("Failed to evaluate threshold expression:",e)}}return requirement},attributeTranslations={Strength:"力量",Intelligence:"智力",Willpower:"意力",Dexterity:"敏捷"},translateAttributeName=e=>{for(const[a,s]of Object.entries(attributeTranslations))e=e.replace(new RegExp(a,"g"),s);return e},getNodeDesc=(e,a,s=1,i="Barbarian")=>{let o="";a==="zhCN"&&e.descCn?o=e.descCn:o=e.descEn||e.desc||"";const c=o.indexOf(`

Tags:`);if(c!==-1&&(o=o.substring(0,c)),a==="zhCN"&&(o=translateTerms(o)),o.includes("{thresholdRequirements}")){const g=calculateThresholdRequirements(e,s,i);if(g){let d=g;a==="zhCN"&&(d=translateAttributeName(g)),o=o.replace(/{thresholdRequirements}/g,d)}}return o.trim()},NodeTooltip=({node:e,mouseX:a,mouseY:s,language:i,equipIndex:o=1,className:c="Barbarian"})=>{const g=getNodeName(e,i),d=getNodeDesc(e,i,o,c),j=(()=>{switch(e.type){case"normal":return{iconBg:"#6b6052",iconBorder:"#8a7a6a",titleColor:"#c0c0c0",borderColor:"#4a453d",typeColor:"#9c8c6f"};case"magic":return{iconBg:"#3d6b8a",iconBorder:"#5d8baa",titleColor:"#6bb8e6",borderColor:"#2d5b7a",typeColor:"#6bb8e6"};case"rare":return{iconBg:"#c9a13b",iconBorder:"#ffd700",titleColor:"#ffffff",borderColor:"#c9a13b",typeColor:"#c9a13b"};case"legendary":return{iconBg:"#b8362a",iconBorder:"#ff6b6b",titleColor:"#ffffff",borderColor:"#b8362a",typeColor:"#ff6b6b"};case"gate":return{iconBg:"#e8833a",iconBorder:"#ffaa66",titleColor:"#ffaa66",borderColor:"#c8631a",typeColor:"#e8833a"};case"socket":return{iconBg:"#8a4a9e",iconBorder:"#c88aeb",titleColor:"#c88aeb",borderColor:"#6a2a7e",typeColor:"#8a4a9e"};case"start":return{iconBg:"#d9c9a8",iconBorder:"#fff8dc",titleColor:"#fff8dc",borderColor:"#b9a988",typeColor:"#d9c9a8"};default:return{iconBg:"#666",iconBorder:"#888",titleColor:"#ccc",borderColor:"#444",typeColor:"#888"}}})(),en=()=>{switch(e.type){case"normal":return"⚪";case"magic":return"✦";case"rare":return"✧";case"legendary":return"◆";case"gate":return"▸";case"socket":return"◈";case"start":return"★";default:return"●"}},nn=Math.min(a,window.innerWidth-340),_e=Math.min(s,window.innerHeight-300),tn=()=>d?d.split(`
`).filter(b=>b.trim()).map((b,_)=>jsxRuntimeExports.jsxs("div",{className:"attr-item",children:[jsxRuntimeExports.jsx("span",{className:"attr-dot",style:{backgroundColor:e.type==="rare"?"#c9a13b":"#00ff00"}}),jsxRuntimeExports.jsx("span",{className:"attr-text",children:b.trim()})]},_)):e.value!==void 0?jsxRuntimeExports.jsxs("div",{className:"attr-item",children:[jsxRuntimeExports.jsx("span",{className:"attr-dot",style:{backgroundColor:e.type==="rare"?"#c9a13b":"#00ff00"}}),jsxRuntimeExports.jsxs("span",{className:"attr-text",children:[e.value," 主属性"]})]}):e.tags&&e.tags.length>0?e.tags.map((Tn,b)=>jsxRuntimeExports.jsxs("div",{className:"attr-item",children:[jsxRuntimeExports.jsx("span",{className:"attr-dot",style:{backgroundColor:e.type==="rare"?"#c9a13b":"#00ff00"}}),jsxRuntimeExports.jsx("span",{className:"attr-text",children:Tn})]},b)):null,ln=(()=>{if(!e.tierValues||e.tierValues.length===0)return{current:0,total:0,percentage:0};const Tn=630,b=932;return{current:b,total:Tn,percentage:Math.min(100,b/Tn*100)}})();return jsxRuntimeExports.jsxs("div",{className:"node-tooltip",style:{left:nn+15,top:_e+15,borderColor:j.borderColor},children:[jsxRuntimeExports.jsx("div",{className:"tooltip-icon-wrapper",children:jsxRuntimeExports.jsx("div",{className:"tooltip-icon",style:{backgroundColor:j.iconBg,borderColor:j.iconBorder},children:en()})}),jsxRuntimeExports.jsxs("div",{className:"tooltip-header",children:[jsxRuntimeExports.jsx("div",{className:"tooltip-type",style:{color:j.typeColor},children:NODE_TYPE_LABELS[e.type][i]}),jsxRuntimeExports.jsx("div",{className:"tooltip-title",style:{color:j.titleColor},children:g})]}),jsxRuntimeExports.jsxs("div",{className:"tooltip-divider",children:[jsxRuntimeExports.jsx("div",{className:"divider-line"}),jsxRuntimeExports.jsxs("div",{className:"divider-decoration",children:[jsxRuntimeExports.jsx("span",{children:"◈"}),jsxRuntimeExports.jsx("span",{children:"◈"})]}),jsxRuntimeExports.jsx("div",{className:"divider-line"})]}),jsxRuntimeExports.jsx("div",{className:"tooltip-content",children:e.type==="legendary"?jsxRuntimeExports.jsx("div",{className:"legendary-desc",children:d}):e.type==="socket"?jsxRuntimeExports.jsx("div",{className:"socket-hint",children:"点击安装雕纹"}):e.type==="gate"?jsxRuntimeExports.jsxs("div",{className:"attributes",children:[tn(),jsxRuntimeExports.jsx("div",{className:"gate-hint",children:"点击连接或替换巅峰盘"})]}):e.type==="start"?jsxRuntimeExports.jsx("div",{className:"start-hint",children:"巅峰盘起始节点"}):jsxRuntimeExports.jsxs("div",{className:"attributes",children:[tn(),e.type==="rare"&&jsxRuntimeExports.jsxs("div",{className:"bonus-section",children:[jsxRuntimeExports.jsx("div",{className:"bonus-label",children:"加成:"}),jsxRuntimeExports.jsx("div",{className:"bonus-text",children:"如果满足要求则额外加+10.0%非物理伤害:"}),jsxRuntimeExports.jsxs("div",{className:"threshold-info",children:[jsxRuntimeExports.jsx("div",{className:"threshold-bar",children:jsxRuntimeExports.jsx("div",{className:"threshold-fill",style:{width:`${ln.percentage}%`}})}),jsxRuntimeExports.jsxs("div",{className:"threshold-text",children:[jsxRuntimeExports.jsx("span",{className:"threshold-current",children:ln.current}),jsxRuntimeExports.jsx("span",{className:"threshold-separator",children:" / "}),jsxRuntimeExports.jsx("span",{className:"threshold-total",children:ln.total}),jsxRuntimeExports.jsx("span",{className:"threshold-unit",children:" 点智力"})]})]})]})]})})]})},boards=[{id:"Paragon_Barb_Start",name:"Start",rows:15,cols:21,grid:[[null,null,null,null,null,null,null,null,null,null,{id:"Generic_Gate",type:"gate",name:"面板连接关口",nameEn:"Board Attachment Gate",nameCn:"面板连接关口",desc:`+5 点力量
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

Tags: 物理, 伤害, 力量.`,tags:["物理","伤害","力量."],tierValues:[],thresholdRequirements:{Barbarian:["{180 + (90 * ParagonBoardEquipIndex)} Intelligence"]}},null,{id:"Barbarian_Rare_001",type:"rare",name:"钢铁力量",nameEn:"Iron Strength",nameCn:"钢铁力量",desc:`+100 护甲值
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

Tags: 护甲, 力量.`,tags:["护甲","力量."],tierValues:[],thresholdRequirements:{Barbarian:["{160 + (90 * ParagonBoardEquipIndex)} Willpower"]}},{id:"Generic_Magic_Will",type:"magic",name:"Willpower",nameEn:"Willpower",desc:`+7 点意力

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

Tags: 生命, 护甲.`,tags:["生命","护甲."],tierValues:[],thresholdRequirements:{Barbarian:["{160 + (90 * ParagonBoardEquipIndex)} Strength"]}},{id:"Generic_Magic_HPPercent",type:"magic",name:"HP Percent",nameEn:"HP Percent",desc:`+2% 生命

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

Tags: 物理, 伤害, 生命.`,tags:["物理","伤害","生命."],tierValues:[],thresholdRequirements:{Barbarian:["{180 + (90 * ParagonBoardEquipIndex)} Dexterity"]}},null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,{id:"Generic_Magic_Armor",type:"magic",name:"Armor",nameEn:"Armor",desc:`+50 护甲值

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

Tags: 流血, 伤害, 力量.`,tags:["流血","伤害","力量."],tierValues:[],thresholdRequirements:{Barbarian:["{180 + (90 * ParagonBoardEquipIndex)} Dexterity"]}},{id:"Generic_Magic_Dex",type:"magic",name:"Dexterity",nameEn:"Dexterity",desc:`+7 点敏捷

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

Tags: 流血, 伤害减免, 力量.`,tags:["流血","伤害减免","力量."],tierValues:[],thresholdRequirements:{Barbarian:["{160 + (90 * ParagonBoardEquipIndex)} Willpower"]}},{id:"Generic_Magic_DamageReductionFromBleedingTarget",type:"magic",name:"Damage Reduction From Bleeding Target",nameEn:"Damage Reduction From Bleeding Target",desc:`2% 对Bleeding 敌人的伤害减免

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

Tags: 抗性, 护甲, 毒素.`,tags:["抗性","护甲","毒素."],tierValues:[],thresholdRequirements:{Barbarian:["{160 + (90 * ParagonBoardEquipIndex)} Intelligence"]}},{id:"Generic_Magic_Armor",type:"magic",name:"Armor",nameEn:"Armor",desc:`+50 护甲值

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

Tags: 流血, 伤害.`,tags:["流血","伤害."],tierValues:[],thresholdRequirements:{Barbarian:["{180 + (90 * ParagonBoardEquipIndex)} Dexterity"]}},{id:"Generic_Magic_DamageBleed",type:"magic",name:"Damage Bleed",nameEn:"Damage Bleed",desc:`+5% Physical 持续性伤害

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

Tags: 控制, 伤害减免.`,tags:["控制","伤害减免."],tierValues:[],thresholdRequirements:{Barbarian:["{160 + (90 * ParagonBoardEquipIndex)} Willpower"]}},null,null,null,null,null,null,null],[null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

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

Tags: 流血, 物理, 伤害.`,tags:["流血","物理","伤害."],tierValues:[],thresholdRequirements:{Barbarian:["{180 + (90 * ParagonBoardEquipIndex)} Dexterity"]}},{id:"Generic_Magic_DamageBleed",type:"magic",name:"Damage Bleed",nameEn:"Damage Bleed",desc:`+5% Physical 持续性伤害

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

Tags: 治疗, 生命.`,tags:["治疗","生命."],tierValues:[],thresholdRequirements:{Barbarian:["{160 + (90 * ParagonBoardEquipIndex)} Willpower"]}},{id:"Generic_Magic_PotionHealing",type:"magic",name:"Potion Healing",nameEn:"Potion Healing",desc:`2% 药水恢复效果

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

Tags: 流血, 伤害减免, 力量.`,tags:["流血","伤害减免","力量."],tierValues:[],thresholdRequirements:{Barbarian:["{160 + (90 * ParagonBoardEquipIndex)} Willpower"]}},{id:"Generic_Magic_Will",type:"magic",name:"Willpower",nameEn:"Willpower",desc:`+7 点意力

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

Tags: 物理, 伤害, 生命.`,tags:["物理","伤害","生命."],tierValues:[],thresholdRequirements:{Barbarian:["{180 + (90 * ParagonBoardEquipIndex)} Dexterity"]}},{id:"Generic_Magic_DamagePhysical",type:"magic",name:"Damage Physical",nameEn:"Damage Physical",desc:`+5% Physical 伤害

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

Tags: 治疗, 生命.`,tags:["治疗","生命."],tierValues:[],thresholdRequirements:{Barbarian:["{160 + (90 * ParagonBoardEquipIndex)} Willpower"]}},{id:"Generic_Magic_PotionHealing",type:"magic",name:"Potion Healing",nameEn:"Potion Healing",desc:`2% 药水恢复效果

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

Tags: 生命, 护甲.`,tags:["生命","护甲."],tierValues:[],thresholdRequirements:{Barbarian:["{160 + (90 * ParagonBoardEquipIndex)} Strength"]}},{id:"Generic_Magic_HPPercent",type:"magic",name:"HP Percent",nameEn:"HP Percent",desc:`+2% 生命

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

Tags: 物理, 伤害, 力量.`,tags:["物理","伤害","力量."],tierValues:[],thresholdRequirements:{Barbarian:["{180 + (90 * ParagonBoardEquipIndex)} Intelligence"]}},{id:"Generic_Magic_DamagePhysical",type:"magic",name:"Damage Physical",nameEn:"Damage Physical",desc:`+5% Physical 伤害

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

Tags: 物理, 伤害, 力量.`,tags:["物理","伤害","力量."],tierValues:[],thresholdRequirements:{Barbarian:["{180 + (90 * ParagonBoardEquipIndex)} Intelligence"]}},null,null,{id:"Generic_Normal_Str",type:"normal",name:"Strength",nameEn:"Strength",desc:`+5 点力量

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

Tags: 护甲, 力量.`,tags:["护甲","力量."],tierValues:[],thresholdRequirements:{Barbarian:["{160 + (90 * ParagonBoardEquipIndex)} Willpower"]}},{id:"Generic_Magic_Armor",type:"magic",name:"Armor",nameEn:"Armor",desc:`+50 护甲值

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

Tags: 力量, 智力, 意力, 敏捷.`,tags:["力量","智力","意力","敏捷."],tierValues:[]},null,null,null,null,null,null,null,null,null,null]],gates:[{row:0,col:10,id:"Generic_Gate",direction:"bottom"},{row:10,col:0,id:"Generic_Gate",direction:"right"},{row:10,col:20,id:"Generic_Gate",direction:"left"},{row:20,col:10,id:"Generic_Gate",direction:"top"}],startNodes:[],gatePositions:{top:[{row:0,col:10,id:"Generic_Gate",direction:"bottom"}],bottom:[{row:20,col:10,id:"Generic_Gate",direction:"top"}],left:[{row:10,col:0,id:"Generic_Gate",direction:"right"}],right:[{row:10,col:20,id:"Generic_Gate",direction:"left"}]}}],glyphs=[{id:"ParagonGlyph_011",name:"吸收者",nameEn:"Imbiber",nameCn:"吸收者",threshold:"25 Willpower",thresholdCn:"25 Willpower",bonus:"你的药水治疗效果提高 +30%。",bonusEn:"You gain +30% increased Potion Healing.",bonusCn:"你的药水治疗效果提高 +30%。",descTemplate:"For every 5 Willpower purchased within range, you deal +{TIER}% increased damage while Healthy.",tiers:[2.65,3.018,3.385,3.752,4.12,4.487,4.855,5.223,5.59,5.957,6.325,6.692,7.06,7.428,7.795,8.162,8.53,8.897,9.265,9.633,10],tags:[],levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},{id:"ParagonGlyph_014",name:"领地",nameEn:"Territorial",nameCn:"领地",threshold:"25 Dexterity",thresholdCn:"25 Dexterity",bonus:"你从近距敌人处受到的伤害降低 10%。",bonusEn:"You gain 10% Damage Reduction against Close enemies.",bonusCn:"你从近距敌人处受到的伤害降低 10%。",descTemplate:"For every 5 Dexterity purchased within range, you deal +{TIER}% increased damage to Close targets.",tiers:[2,2.4,2.8,3.2,3.6,4,4.4,4.8,5.2,5.6,6,6.4,6.8,7.2,7.6,8,8.4,8.8,9.2,9.6,10],tags:[],levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},{id:"ParagonGlyph_016",name:"利用",nameEn:"Exploit",nameCn:"利用",threshold:"25 Dexterity",thresholdCn:"25 Dexterity",bonus:"一名敌人受到你造成的伤害时会受到易伤效果, 持续 3 秒。该效果对每个敌人每 20 秒只能触发一次。",bonusEn:"When an enemy is damaged by you, they become Vulnerable for 3 seconds. This cannot happen more than once every 20 seconds per enemy.",bonusCn:"一名敌人受到你造成的伤害时会受到易伤效果, 持续 3 秒。该效果对每个敌人每 20 秒只能触发一次。",descTemplate:"For every 5 Dexterity purchased within range, you deal +{TIER}% increased damage to Vulnerable targets.",tiers:[2,2.3,2.6,2.9,3.2,3.5,3.8,4.1,4.4,4.7,5,5.3,5.6,5.9,6.2,6.5,6.8,7.1,7.4,7.7,8],tags:[],levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},{id:"ParagonGlyph_021",name:"灵巧",nameEn:"Ambidextrous",nameCn:"灵巧",threshold:"40 Strength",thresholdCn:"40 Strength",bonus:"装备单手武器时, 你造成的伤害提高 x8%。",bonusEn:"You deal x8% increased damage while wielding One-Handed weapons.",bonusCn:"装备单手武器时, 你造成的伤害提高 x8%。",descTemplate:"Grants +{TIER}% bonus to all Magic nodes within range.",tiers:[25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100,105,110,115,120,125],tags:[],levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},{id:"ParagonGlyph_022",name:"勇力",nameEn:"Might",nameCn:"勇力",threshold:"40 Strength",thresholdCn:"40 Strength",bonus:"装备双手武器时, 你造成的伤害提高 x8%。",bonusEn:"You deal x8% increased damage while wielding Two-Handed weapons.",bonusCn:"装备双手武器时, 你造成的伤害提高 x8%。",descTemplate:"Grants +{TIER}% bonus to all Magic nodes within range.",tiers:[25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100,105,110,115,120,125],tags:[],levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},{id:"ParagonGlyph_023",name:"削砍",nameEn:"Cleaver",nameCn:"削砍",threshold:"40 Strength",thresholdCn:"40 Strength",bonus:"装备斧类武器时, 你造成的暴击伤害提高 x12%。",bonusEn:"While wielding an Axe, you deal x12% increased Critical Strike Damage.",bonusCn:"装备斧类武器时, 你造成的暴击伤害提高 x12%。",descTemplate:"For every 5 Strength purchased within range, you deal +{TIER}% increased damage while wielding an Axe.",tiers:[1.333,1.533,1.733,1.933,2.133,2.333,2.533,2.733,2.933,3.133,3.333,3.533,3.733,3.933,4.133,4.333,4.533,4.733,4.933,5.133,5.333],tags:[],levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},{id:"ParagonGlyph_024",name:"恼怒",nameEn:"Seething",nameCn:"恼怒",threshold:"40 Strength",thresholdCn:"40 Strength",bonus:"装备剑类武器时, 消灭一名敌人可获得 3 点怒气。",bonusEn:"While wielding a Sword, you gain 3 Fury when you kill an enemy.",bonusCn:"装备剑类武器时, 消灭一名敌人可获得 3 点怒气。",descTemplate:"For every 5 Strength purchased within range, you deal +{TIER}% increased damage while wielding a Sword.",tiers:[1.333,1.533,1.733,1.933,2.133,2.333,2.533,2.733,2.933,3.133,3.333,3.533,3.733,3.933,4.133,4.333,4.533,4.733,4.933,5.133,5.333],tags:[],levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},{id:"ParagonGlyph_025",name:"碾压者",nameEn:"Crusher",nameCn:"碾压者",threshold:"40 Strength",thresholdCn:"40 Strength",bonus:"装备锤类武器时, 你造成的压制伤害提高 x30%。",bonusEn:"While wielding a Mace, you deal x30% increased Overpower damage.",bonusCn:"装备锤类武器时, 你造成的压制伤害提高 x30%。",descTemplate:"For every 5 Strength purchased within range, you deal +{TIER}% increased damage while wielding a Mace.",tiers:[1.333,1.533,1.733,1.933,2.133,2.333,2.533,2.733,2.933,3.133,3.333,3.533,3.733,3.933,4.133,4.333,4.533,4.733,4.933,5.133,5.333],tags:[],levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},{id:"ParagonGlyph_026",name:"处决者",nameEn:"Executioner",nameCn:"处决者",threshold:"40 Strength",thresholdCn:"40 Strength",bonus:"装备长柄武器时,你造成的伤害提高 x10%。",bonusEn:"While wielding a Polearm, you deal x10% increased damage.",bonusCn:"装备长柄武器时,你造成的伤害提高 x10%。",descTemplate:"For every 5 Strength purchased within range, you deal +{TIER}% increased damage while wielding a Polearm.",tiers:[1.333,1.533,1.733,1.933,2.133,2.333,2.533,2.733,2.933,3.133,3.333,3.533,3.733,3.933,4.133,4.333,4.533,4.733,4.933,5.133,5.333],tags:[],levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},{id:"ParagonGlyph_027",name:"怒火",nameEn:"Ire",nameCn:"怒火",threshold:"40 Strength",thresholdCn:"40 Strength",bonus:"处于狂暴状态时, 你受到精英怪的伤害降低 10%。",bonusEn:"While Berserking, you take 10% reduced damage from Elites.",bonusCn:"处于狂暴状态时, 你受到精英怪的伤害降低 10%。",descTemplate:"For every 5 Strength purchased within range, you deal +{TIER}% increased damage while Berserking.",tiers:[1.333,1.533,1.733,1.933,2.133,2.333,2.533,2.733,2.933,3.133,3.333,3.533,3.733,3.933,4.133,4.333,4.533,4.733,4.933,5.133,5.333],tags:[],levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},{id:"ParagonGlyph_028",name:"统帅",nameEn:"Marshal",nameCn:"统帅",threshold:"40 Strength",thresholdCn:"40 Strength",bonus:"施放一个战吼技能后, 所有其他非战吼技能的剩余冷却时间缩短 4 秒。",bonusEn:"After casting a Shout Skill, the active Cooldown of every other Non-Shout Skill is reduced by 4 seconds.",bonusCn:"施放一个战吼技能后, 所有其他非战吼技能的剩余冷却时间缩短 4 秒。",descTemplate:"Grants +{TIER}% bonus to all Magic nodes within range.",tiers:[25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100,105,110,115,120,125],tags:[],levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},{id:"ParagonGlyph_029",name:"鲜血喂食者",nameEn:"Bloodfeeder",nameCn:"鲜血喂食者",threshold:"25 Dexterity",thresholdCn:"25 Dexterity",bonus:"你对流血敌人造成暴击的几率提高 5%。",bonusEn:"You have 5% increased Critical Strike Chance against Bleeding enemies.",bonusCn:"你对流血敌人造成暴击的几率提高 5%。",descTemplate:"For every 5 Dexterity purchased within range, you deal +{TIER}% increased damage to Bleeding targets.",tiers:[2,2.3,2.6,2.9,3.2,3.5,3.8,4.1,4.4,4.7,5,5.3,5.6,5.9,6.2,6.5,6.8,7.1,7.4,7.7,8],tags:[],levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},{id:"ParagonGlyph_030",name:"愤怒",nameEn:"Wrath",nameCn:"愤怒",threshold:"25 Dexterity",thresholdCn:"25 Dexterity",bonus:"技能暴击时产生 3 点怒气。",bonusEn:"Skills that Critically Strike generate 3 Fury.",bonusCn:"技能暴击时产生 3 点怒气。",descTemplate:"For every 5 Dexterity purchased within range, you deal +{TIER}% increased Critical Strike Damage.",tiers:[3,3.6,4.2,4.8,5.4,6,6.6,7.2,7.8,8.4,9,9.6,10.2,10.8,11.4,12,12.6,13.2,13.8,14.4,15],tags:[],levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},{id:"ParagonGlyph_031",name:"武器大师",nameEn:"Weapon Master",nameCn:"武器大师",threshold:"25 Dexterity",thresholdCn:"25 Dexterity",bonus:"武器精通技能命中时, 随机使另一个武器精通技能的冷却时间缩短 2 秒。",bonusEn:"Hitting with a Weapon Mastery Skill reduces the active Cooldown of another random Weapon Mastery Skill by 2 seconds.",bonusCn:"武器精通技能命中时, 随机使另一个武器精通技能的冷却时间缩短 2 秒。",descTemplate:"Paragon nodes within range gain +{TIER}% bonus to their Physical damage and damage reduction modifiers.",tiers:[11,13.2,15.4,17.6,19.8,22,24.2,26.4,28.6,30.8,33,35.2,37.4,39.6,41.8,44,46.2,48.4,50.6,52.8,55],tags:[],levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},{id:"ParagonGlyph_032",name:"致命吸引",nameEn:"Mortal Draw",nameCn:"致命吸引",threshold:"25 Dexterity",thresholdCn:"25 Dexterity",bonus:"切换武器有 18% 几率使下一个技能暴击。",bonusEn:"Swapping weapons has a 18% chance to cause the Skill's damage to Critically Strike.",bonusCn:"切换武器有 18% 几率使下一个技能暴击。",descTemplate:"For every 5 Dexterity purchased within range, Skills that Swap to a different weapon deal +{TIER}% increased damage.",tiers:[2.68,3.381,4.082,4.783,5.484,6.185,6.886,7.587,8.288,8.989,9.69,10.391,11.092,11.793,12.494,13.195,13.896,14.597,15.298,15.999,16.7],tags:[],levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},{id:"ParagonGlyph_033",name:"复仇",nameEn:"Revenge",nameCn:"复仇",threshold:"25 Willpower",thresholdCn:"25 Willpower",bonus:"对敌人造成荆棘伤害会使你对其造成的所有伤害提高 x1%, 最多提高 x8%, 持续 10 秒。",bonusEn:"Dealing Thorns damage to an enemy increases all damage it takes from you by x1%, up to x8%, for 10 seconds.",bonusCn:"对敌人造成荆棘伤害会使你对其造成的所有伤害提高 x1%, 最多提高 x8%, 持续 10 秒。",descTemplate:"Grants +{TIER}% bonus to all Rare nodes within range.",tiers:[20,24,28,32,36,40,44,48,52,56,60,64,68,72,76,80,84,88,92,96,100],tags:[],levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},{id:"ParagonGlyph_034",name:"无惧",nameEn:"Undaunted",nameCn:"无惧",threshold:"25 Willpower",thresholdCn:"25 Willpower",bonus:"你拥有的强固值越多, 你获得的伤害减免最多可达 10%。",bonusEn:"You gain up to 10% Damage Reduction the more Fortify you have.",bonusCn:"你拥有的强固值越多, 你获得的伤害减免最多可达 10%。",descTemplate:"For every 5 Willpower purchased within range, you deal +{TIER}% increased damage while Fortified.",tiers:[2,2.3,2.6,2.9,3.2,3.5,3.8,4.1,4.4,4.7,5,5.3,5.6,5.9,6.2,6.5,6.8,7.1,7.4,7.7,8],tags:[],levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},{id:"ParagonGlyph_035_Barb",name:"支配",nameEn:"Dominate",nameCn:"支配",threshold:"25 Willpower",thresholdCn:"25 Willpower",bonus:"30 秒内未造成压制后, 你的下一次攻击造成压制。",bonusEn:"After not Overpowering for 30 seconds, your next attack will Overpower.",bonusCn:"30 秒内未造成压制后, 你的下一次攻击造成压制。",descTemplate:"For every 5 Willpower purchased within range, you deal +{TIER}% increased Overpower damage.",tiers:[8,9.6,11.2,12.8,14.4,16,17.6,19.2,20.8,22.4,24,25.6,27.2,28.8,30.4,32,33.6,35.2,36.8,38.4,40],tags:[],levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},{id:"ParagonGlyph_036",name:"开膛破肚",nameEn:"Disembowel",nameCn:"开膛破肚",threshold:"25 Willpower",thresholdCn:"25 Willpower",bonus:"消灭流血的敌人有 10% 几率使你的非终极技能的剩余冷却时间缩短 1 秒。",bonusEn:"Killing a Bleeding enemy has a 10% chance to reduce the Cooldowns of your Non-Ultimate active Cooldowns by 1 second.",bonusCn:"消灭流血的敌人有 10% 几率使你的非终极技能的剩余冷却时间缩短 1 秒。",descTemplate:"For every 5 Willpower purchased within range, you deal +{TIER}% increased Bleeding damage.",tiers:[2,2.3,2.6,2.9,3.2,3.5,3.8,4.1,4.4,4.7,5,5.3,5.6,5.9,6.2,6.5,6.8,7.1,7.4,7.7,8],tags:[],levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},{id:"ParagonGlyph_037",name:"搏斗",nameEn:"Brawl",nameCn:"搏斗",threshold:"25 Willpower",thresholdCn:"25 Willpower",bonus:"搏斗技能造成的伤害提高 x18%。",bonusEn:"Brawling Skills deal x18% increased damage.",bonusCn:"搏斗技能造成的伤害提高 x18%。",descTemplate:"Paragon nodes within range gain +{TIER}% bonus to their Physical damage and damage reduction modifiers.",tiers:[11,13.2,15.4,17.6,19.8,22,24.2,26.4,28.6,30.8,33,35.2,37.4,39.6,41.8,44,46.2,48.4,50.6,52.8,55],tags:[],levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},{id:"ParagonGlyph_080",name:"旋风",nameEn:"Twister",nameCn:"旋风",threshold:"40 Strength",thresholdCn:"40 Strength",bonus:"生成一个尘魔后, 你造成的伤害提高 x13%, 持续 4 秒。",bonusEn:"You deal x13% increased damage for 4 seconds after creating a Dust Devil.",bonusCn:"生成一个尘魔后, 你造成的伤害提高 x13%, 持续 4 秒。",descTemplate:"For every 5 Strength purchased within range, your Dust Devils deal +{TIER}% increased damage.",tiers:[13.333,14.667,16,17.333,18.667,20,21.333,22.667,24,25.333,26.667,28,29.333,30.667,32,33.333,34.667,36,37.333,38.667,40],tags:[],levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},{id:"ParagonGlyph_081",name:"轰鸣",nameEn:"Rumble",nameCn:"轰鸣",threshold:"40 Strength",thresholdCn:"40 Strength",bonus:"每激活一次撼地重击时, 对首领和被群控敌人造成的伤害提高 x10%。",bonusEn:"You deal x10% increased damage to Bosses and Crowd Controlled enemies for each active Earthquake.",bonusCn:"每激活一次撼地重击时, 对首领和被群控敌人造成的伤害提高 x10%。",descTemplate:"For every 5 Strength purchased within range, your Earthquakes deal +{TIER}% increased damage.",tiers:[13.333,14.667,16,17.333,18.667,20,21.333,22.667,24,25.333,26.667,28,29.333,30.667,32,33.333,34.667,36,37.333,38.667,40],tags:[],levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]}],barbarianData={boards,glyphs},GRID_LOCATIONS=[["V","E","F","G","H","I","U"],["W","D","J","K","L","M","T"],["X","C","7","8","9","N","S"],["Y","B","4","5","6","O","R"],["Z","A","1","2","3","P","Q"]],rotateAngle=(e,a,s,i,o)=>{const c=o*Math.PI/180,g=Math.cos(c),d=Math.sin(c),h=g*(s-e)-d*(i-a)+e,j=d*(s-e)+g*(i-a)+a;return[h,j]},reverseRotateAngle=(e,a,s,i,o)=>{const c=-(o*Math.PI)/180,g=Math.cos(c),d=Math.sin(c),h=g*(s-e)-d*(i-a)+e,j=d*(s-e)+g*(i-a)+a;return[h,j]},findGridPosition=e=>{for(let a=0;a<GRID_LOCATIONS.length;a++){const s=GRID_LOCATIONS[a].indexOf(e);if(s>=0)return[a,s]}return null},findAdjacentGridLocation=(e,a,s,i)=>{const o=findGridPosition(e);if(!o)return null;const[c,g]=o,[d,h]=rotateAngle(10,10,s,a,i);if(d===0){if(g>0)return GRID_LOCATIONS[c][g-1]}else if(d===20){if(g<6)return GRID_LOCATIONS[c][g+1]}else if(h===0){if(c>0)return GRID_LOCATIONS[c-1][g]}else if(c<4)return GRID_LOCATIONS[c+1][g];return null},findShortestPath=(e,a,s,i,o)=>{var tn,sn,ln,Tn,b;const c=new Set,g=[],d=new Set(s.keys()),h=new Set,j=[i];for(;j.length>0;){const{boardId:_,row:$,col:an}=j.shift(),on=`${_}_${$}_${an}`;if(h.has(on))continue;h.add(on);const cn=[{row:-1,col:0},{row:1,col:0},{row:0,col:-1},{row:0,col:1}],gn=e.boards.find(dn=>dn.id===_);if(gn)for(const dn of cn){const Sn=$+dn.row,mn=an+dn.col;if(Sn<0||Sn>=gn.rows||mn<0||mn>=gn.cols)continue;const Cn=`${_}_${Sn}_${mn}`;if(d.has(Cn)){const Wn=(tn=gn.grid[Sn])==null?void 0:tn[mn];if((Wn==null?void 0:Wn.type)==="gate"){const Gn=a.find(Bn=>Bn.boardId===_);if(((sn=Gn==null?void 0:Gn.entryGate)==null?void 0:sn.row)===Sn&&((ln=Gn==null?void 0:Gn.entryGate)==null?void 0:ln.col)===mn){const Bn=a.find(Mn=>{var yn,un;if(Mn.boardId===_)return!1;const[Ln,In]=PARAGON_GRID_COORDINATES[Gn.gridLocation]||[0,0],[pn,fn]=PARAGON_GRID_COORDINATES[Mn.gridLocation]||[0,0],xn=Math.abs(pn-Ln),rn=Math.abs(fn-In);if(xn===840&&rn===0||xn===0&&rn===840){let hn;xn>0?hn=pn>Ln?"right":"left":hn=fn>In?"bottom":"top";let _n,En;return hn==="left"?(_n=10,En=0):hn==="right"?(_n=10,En=20):hn==="top"?(_n=0,En=10):(_n=20,En=10),((yn=Mn.entryGate)==null?void 0:yn.row)===_n&&((un=Mn.entryGate)==null?void 0:un.col)===En}return!1});Bn!=null&&Bn.entryGate&&j.push({boardId:Bn.boardId,row:Bn.entryGate.row,col:Bn.entryGate.col})}}else j.push({boardId:_,row:Sn,col:mn})}}}if(console.log("[BFS] 与起始节点连通的已点亮节点数量:",h.size),h.forEach(_=>{const $=_.split("_"),an=parseInt($[$.length-2]),on=parseInt($[$.length-1]),cn=$.slice(0,-2).join("_");c.add(_),g.push({node:{boardId:cn,row:an,col:on},path:[]})}),g.length===0){const _=`${i.boardId}_${i.row}_${i.col}`;c.add(_),g.push({node:i,path:[i]})}console.log("[BFS] 起始节点数量:",g.length);const en=[{row:-1,col:0},{row:1,col:0},{row:0,col:-1},{row:0,col:1}];let nn=0;const _e=1e4;for(;g.length>0&&nn<_e;){nn++;const{node:_,path:$}=g.shift(),{boardId:an,row:on,col:cn}=_;if(an===o.boardId&&on===o.row&&cn===o.col){console.log("[BFS] 找到目标节点!");const Sn=$.filter(mn=>{const Cn=`${mn.boardId}_${mn.row}_${mn.col}`;return!d.has(Cn)});return console.log("[BFS] 返回路径长度:",Sn.length),Sn}const gn=e.boards.find(Sn=>Sn.id===an);if(!gn){console.log("[BFS] 未找到盘面:",an);continue}const dn=(Tn=gn.grid[on])==null?void 0:Tn[cn];if((dn==null?void 0:dn.type)==="gate"){const Sn=a.find(mn=>mn.boardId===an);if(!Sn)continue;for(const mn of a){if(mn.boardId===an)continue;const[Cn,Wn]=PARAGON_GRID_COORDINATES[Sn.gridLocation]||[0,0],[Gn,Bn]=PARAGON_GRID_COORDINATES[mn.gridLocation]||[0,0],Mn=Math.abs(Gn-Cn),Ln=Math.abs(Bn-Wn);if(Mn===840&&Ln===0||Mn===0&&Ln===840){let In;cn===0?In="left":cn===20?In="right":on===0?In="top":In="bottom";let pn;if(Mn>0?pn=Gn>Cn?"right":"left":pn=Bn>Wn?"bottom":"top",In===pn&&mn.entryGate){const fn=`${mn.boardId}_${mn.entryGate.row}_${mn.entryGate.col}`;c.has(fn)||(c.add(fn),g.push({node:{boardId:mn.boardId,row:mn.entryGate.row,col:mn.entryGate.col},path:[...$,{boardId:mn.boardId,row:mn.entryGate.row,col:mn.entryGate.col}]}))}}}}for(const Sn of en){const mn=on+Sn.row,Cn=cn+Sn.col;if(mn<0||mn>=gn.rows||Cn<0||Cn>=gn.cols)continue;if(!((b=gn.grid[mn])==null?void 0:b[Cn])){console.log(`[BFS] 邻居节点为空: (${mn}, ${Cn})`);continue}const Gn=`${an}_${mn}_${Cn}`;c.has(Gn)||(c.add(Gn),g.push({node:{boardId:an,row:mn,col:Cn},path:[...$,{boardId:an,row:mn,col:Cn}]}))}}return console.log("[BFS] 搜索结束，迭代次数:",nn,"队列长度:",g.length),[]};function App(){const data=barbarianData,[language,setLanguage]=reactExports.useState("zhCN"),[currentClass,setCurrentClass]=reactExports.useState("Barbarian"),[totalPoints]=reactExports.useState(220),[allocations,setAllocations]=reactExports.useState(new Map),[connectedBoards,setConnectedBoards]=reactExports.useState([{boardIndex:0,boardId:"Paragon_Barb_Start",gridLocation:"5",rotation:0,equipIndex:1,equippedGlyph:null}]),[selectedBoardIndex,setSelectedBoardIndex]=reactExports.useState(0),[selectingBoardForGate,setSelectingBoardForGate]=reactExports.useState(null),[quickPathMode,setQuickPathMode]=reactExports.useState(!1),[selectingGlyphForSocket,setSelectingGlyphForSocket]=reactExports.useState(null),[socketGlyphs,setSocketGlyphs]=reactExports.useState(new Map),[zoom,setZoom]=reactExports.useState(.65),[pan,setPan]=reactExports.useState({x:-819,y:819}),[hoveredNode,setHoveredNode]=reactExports.useState(null),[mousePosition,setMousePosition]=reactExports.useState({x:0,y:0});reactExports.useEffect(()=>{const e=a=>{setMousePosition({x:a.clientX,y:a.clientY})};return window.addEventListener("mousemove",e),()=>window.removeEventListener("mousemove",e)},[]);const[searchQuery,setSearchQuery]=reactExports.useState(""),[typeFilter,setTypeFilter]=reactExports.useState("all"),[showRightPanel,setShowRightPanel]=reactExports.useState(!0),[operationMode,setOperationMode]=reactExports.useState("select"),usedPoints=reactExports.useMemo(()=>{let e=0;return allocations.forEach(a=>{e+=a.points}),e},[allocations]),playerAttributes=reactExports.useMemo(()=>{const e={Strength:0,Intelligence:0,Willpower:0,Dexterity:0},a=usedPoints;return e.Strength=Math.floor(a*.5),e.Dexterity=Math.floor(a*.2),e.Intelligence=Math.floor(a*.15),e.Willpower=Math.floor(a*.15),allocations.forEach((s,i)=>{var j;const[o,c,g]=i.split("_"),d=data.boards.find(en=>en.id===o),h=(j=d==null?void 0:d.grid[parseInt(c)])==null?void 0:j[parseInt(g)];if(h){const en=h.id.match(/Generic_Normal_(Str|Int|Will|Dex)/);if(en){const nn=en[1],tn={Str:"Strength",Int:"Intelligence",Will:"Willpower",Dex:"Dexterity"}[nn];tn&&(e[tn]+=5)}}}),e},[usedPoints,allocations,data.boards]),reachableNodes=reactExports.useMemo(()=>{const e=new Set,a=new Set;if(allocations.forEach((s,i)=>{a.add(i),e.add(i)}),a.size===0){const s=connectedBoards.find(i=>i.gridLocation==="5");if(s){const i=data.boards.find(o=>o.id===s.boardId);i&&i.startNodes&&i.startNodes.forEach(o=>{const c=`${i.id}_${o.row}_${o.col}`;e.add(c)})}return e}return allocations.forEach(s=>{var h,j;const i=data.boards.find(en=>en.id===s.boardId);if(!i)return;const{row:o,col:c}=s,g=(h=i.grid[o])==null?void 0:h[c];if((g==null?void 0:g.type)==="gate"){const en=connectedBoards.find(nn=>{var _e,tn;return nn.gridLocation==="5"?!1:((_e=nn.entryGate)==null?void 0:_e.row)===s.row&&((tn=nn.entryGate)==null?void 0:tn.col)===s.col});if(en&&en.entryGate){const nn=`${en.boardId}_${en.entryGate.row}_${en.entryGate.col}`;e.add(nn)}}const d=[{row:o-1,col:c},{row:o+1,col:c},{row:o,col:c-1},{row:o,col:c+1}];for(const en of d){if(en.row<0||en.row>=i.rows||en.col<0||en.col>=i.cols||!((j=i.grid[en.row])==null?void 0:j[en.col]))continue;const _e=`${s.boardId}_${en.row}_${en.col}`;!a.has(_e)&&!e.has(_e)&&e.add(_e)}}),e},[allocations,data.boards,connectedBoards]),checkGateConnections=reactExports.useMemo(()=>{const e=[];for(let a=0;a<connectedBoards.length;a++)for(let s=a+1;s<connectedBoards.length;s++){const i=connectedBoards[a],o=connectedBoards[s],[c,g]=PARAGON_GRID_COORDINATES[i.gridLocation]||[0,0],[d,h]=PARAGON_GRID_COORDINATES[o.gridLocation]||[0,0],j=Math.abs(d-c),en=Math.abs(h-g);(j===840&&en===0||j===0&&en===840)&&e.push({from:a,to:s,fromGate:j>0?d>c?"right":"left":h>g?"bottom":"top",toGate:j>0?d>c?"left":"right":h>g?"top":"bottom"})}return e},[connectedBoards]),handleNodeClick=reactExports.useCallback((e,a,s,i)=>{var en,nn,_e;const o=`${e}_${a}_${s}`,c=allocations.has(o),g=reachableNodes.has(o),d=usedPoints<totalPoints;if(quickPathMode&&!g&&!c){console.log("[快捷路径] 模式已启用，开始计算路径..."),console.log("[快捷路径] 目标节点:",e,a,s);const tn=data.boards.find(sn=>sn.id==="Paragon_Barb_Start");if(!((en=tn==null?void 0:tn.startNodes)!=null&&en[0]))console.log("[快捷路径] 未找到起始盘");else{const sn={boardId:"Paragon_Barb_Start",row:tn.startNodes[0].row,col:tn.startNodes[0].col},ln={boardId:e,row:a,col:s};console.log("[快捷路径] 起点:",sn,"终点:",ln);const Tn=findShortestPath(data,connectedBoards,allocations,sn,ln);if(console.log("[快捷路径] 计算出的路径长度:",Tn.length),Tn.length>0){console.log("[快捷路径] 路径节点:",Tn);let b=0;for(const _ of Tn){const $=(_e=(nn=data.boards.find(an=>an.id===_.boardId))==null?void 0:nn.grid[_.row])==null?void 0:_e[_.col];$&&($.type==="rare"?b+=5:($.type==="legendary"||$.type!=="gate")&&(b+=1))}if(console.log("[快捷路径] 路径总消耗:",b,"当前已用:",usedPoints),usedPoints+b>totalPoints)console.warn("点数不足，无法点亮路径");else if(setAllocations(_=>{var an,on;const $=new Map(_);for(const cn of Tn){const gn=`${cn.boardId}_${cn.row}_${cn.col}`,dn=(on=(an=data.boards.find(Sn=>Sn.id===cn.boardId))==null?void 0:an.grid[cn.row])==null?void 0:on[cn.col];$.set(gn,{nodeId:(dn==null?void 0:dn.id)||"Generic_Node",boardId:cn.boardId,row:cn.row,col:cn.col,points:(dn==null?void 0:dn.type)==="rare"?5:(dn==null?void 0:dn.type)==="legendary"?1:0})}return $}),i.type!=="gate")return}else console.warn("无法找到路径")}}let h=1;if(i.type==="rare"?h=5:i.type==="legendary"&&(h=1),i.type==="gate"){const tn=connectedBoards.find(ln=>ln.boardId===e);if(!tn)return;if((()=>{if(!tn.entryGate)return!1;const ln=tn.entryGate,Tn=tn.rotation||0;if(Tn===0)return ln.row===a&&ln.col===s;const b=10,_=10,[$,an]=rotateAngle(b,_,ln.row,ln.col,Tn);return Math.round($)===a&&Math.round(an)===s})())c||setAllocations(ln=>{const Tn=new Map(ln);return Tn.set(o,{nodeId:i.id||"Generic_Gate",boardId:e,row:a,col:s,points:0}),Tn});else{const ln=tn.rotation||0,Tn=10,b=10,[_,$]=ln!==0?reverseRotateAngle(Tn,b,a,s,ln):[a,s],an=connectedBoards.find(on=>{if(on.boardId===e)return!1;const[cn,gn]=PARAGON_GRID_COORDINATES[tn.gridLocation]||[0,0],[dn,Sn]=PARAGON_GRID_COORDINATES[on.gridLocation]||[0,0],mn=Math.abs(dn-cn),Cn=Math.abs(Sn-gn);if(mn===840&&Cn===0||mn===0&&Cn===840){let Wn;Math.round($)===0?Wn="left":Math.round($)===20?Wn="right":Math.round(_)===0?Wn="top":Wn="bottom";let Gn;return mn>0?Gn=dn>cn?"right":"left":Gn=Sn>gn?"bottom":"top",Wn===Gn}return!1});if(an){const on=connectedBoards.find(cn=>{var Gn,Bn,Mn,Ln;if(cn.boardId===an.boardId)return!1;const[gn,dn]=PARAGON_GRID_COORDINATES[cn.gridLocation]||[0,0],[Sn,mn]=PARAGON_GRID_COORDINATES[an.gridLocation]||[0,0],Cn=Math.abs(Sn-gn),Wn=Math.abs(mn-dn);if(Cn===840&&Wn===0||Cn===0&&Wn===840){let In;Cn>0?In=Sn>gn?"right":"left":In=mn>dn?"bottom":"top";let pn,fn;In==="left"?(pn=10,fn=0):In==="right"?(pn=10,fn=20):In==="top"?(pn=0,fn=10):(pn=20,fn=10);const xn=cn.rotation||0;let rn=!1;if(xn===0)rn=((Gn=an.entryGate)==null?void 0:Gn.row)===pn&&((Bn=an.entryGate)==null?void 0:Bn.col)===fn;else{const[hn,_n]=rotateAngle(10,10,((Mn=an.entryGate)==null?void 0:Mn.row)||0,((Ln=an.entryGate)==null?void 0:Ln.col)||0,xn);rn=Math.round(hn)===pn&&Math.round(_n)===fn}if(rn)return!0}return!1});if(on){const cn=connectedBoards.findIndex(Mn=>Mn.boardId===on.boardId),[gn,dn]=PARAGON_GRID_COORDINATES[on.gridLocation]||[0,0],[Sn,mn]=PARAGON_GRID_COORDINATES[an.gridLocation]||[0,0];let Cn,Wn,Gn;Sn>gn?(Cn="right",Wn=10,Gn=20):Sn<gn?(Cn="left",Wn=10,Gn=0):mn>dn?(Cn="bottom",Wn=20,Gn=10):(Cn="top",Wn=0,Gn=10);const Bn=on.rotation||0;if(Bn!==0){const[In,pn]=rotateAngle(10,10,Wn,Gn,Bn);Wn=Math.round(In),Gn=Math.round(pn)}setSelectingBoardForGate({boardIndex:cn,gateDirection:Cn,gateRow:Wn,gateCol:Gn})}}else{if(connectedBoards.length>=5){console.warn("已达到最大盘面数量限制（5个）");return}const on=connectedBoards.findIndex(gn=>gn.boardId===e);let cn;Math.round($)===0?cn="left":Math.round($)===20?cn="right":Math.round(_)===0?cn="top":cn="bottom",setSelectingBoardForGate({boardIndex:on,gateDirection:cn,gateRow:a,gateCol:s})}}return}if(i.type==="socket"){setSelectingGlyphForSocket({boardId:e,row:a,col:s});return}if(c){setAllocations(tn=>{const sn=new Map(tn);return sn.delete(o),sn});return}const j=i.type==="start";if((g||j)&&d){if(i.type==="legendary"){let tn=!1;if(allocations.forEach(sn=>{var Tn,b;const ln=(b=(Tn=data.boards.find(_=>_.id===sn.boardId))==null?void 0:Tn.grid[sn.row])==null?void 0:b[sn.col];(ln==null?void 0:ln.type)==="legendary"&&(tn=!0)}),tn&&i.type==="legendary")return}setAllocations(tn=>{const sn=new Map(tn);return sn.set(o,{nodeId:i.id,boardId:e,row:a,col:s,points:h}),sn})}},[allocations,reachableNodes,usedPoints,totalPoints,data.boards,connectedBoards]),rotateBoardCounterClockwise=reactExports.useCallback(e=>{setConnectedBoards(a=>{const s=[...a],o=(s[e].rotation-90+360)%360;return s[e]={...s[e],rotation:o},s})},[]),rotateBoardClockwise=reactExports.useCallback(e=>{setConnectedBoards(a=>{const s=[...a],o=(s[e].rotation+90)%360;return s[e]={...s[e],rotation:o},s})},[]),moveBoard=reactExports.useCallback((e,a)=>{if(connectedBoards.some((i,o)=>o!==e&&i.gridLocation===a)){const i=connectedBoards.findIndex((o,c)=>c!==e&&o.gridLocation===a);i!==-1&&setConnectedBoards(o=>{const c=[...o],g=c[e].gridLocation;return c[e]={...c[e],gridLocation:a},c[i]={...c[i],gridLocation:g},c})}else setConnectedBoards(i=>{const o=[...i];return o[e]={...o[e],gridLocation:a},o})},[connectedBoards]),changeBoard=reactExports.useCallback((e,a)=>{setConnectedBoards(s=>{const i=[...s];return i[e]={...i[e],boardId:a},i})},[]),connectBoardViaGate=reactExports.useCallback(e=>{if(!selectingBoardForGate)return;const{boardIndex:a,gateDirection:s,gateRow:i,gateCol:o}=selectingBoardForGate,c=connectedBoards[a];if(!c)return;const g=findAdjacentGridLocation(c.gridLocation,i,o,c.rotation);if(!g){setSelectingBoardForGate(null);return}let d;const h=data.boards.find(nn=>nn.id===e);if(h&&h.gatePositions){const _e={top:"bottom",bottom:"top",left:"right",right:"left"}[s],tn=h.gatePositions[_e];tn&&tn.length>0&&(d={row:tn[0].row,col:tn[0].col})}const j=connectedBoards.findIndex(nn=>nn.gridLocation===g);if(j!==-1)setConnectedBoards(nn=>{const _e=[...nn];return _e[j]={..._e[j],boardId:e,equippedGlyph:null,entryGate:d},_e});else{if(connectedBoards.length>=5){console.warn("已达到最大盘面数量限制（5个）"),setSelectingBoardForGate(null);return}const nn={boardIndex:connectedBoards.length,boardId:e,gridLocation:g,rotation:0,equipIndex:connectedBoards.length+1,equippedGlyph:null,entryGate:d};setConnectedBoards(_e=>[..._e,nn])}setSelectingBoardForGate(null);const en=`${c.boardId}_${i}_${o}`;setAllocations(nn=>{const _e=new Map(nn);return _e.set(en,{nodeId:"Generic_Gate",boardId:c.boardId,row:i,col:o,points:1}),_e})},[selectingBoardForGate,connectedBoards]),setEquipIndex=reactExports.useCallback((e,a)=>{a<1||a>9||setConnectedBoards(s=>{const i=[...s];return i[e]={...i[e],equipIndex:a},i})},[]),equipGlyph=reactExports.useCallback((e,a,s)=>{setConnectedBoards(i=>{const o=[...i];return o[e]={...o[e],equippedGlyph:{glyphId:a,rank:s}},o})},[]),removeGlyph=reactExports.useCallback(e=>{setConnectedBoards(a=>{const s=[...a];return s[e]={...s[e],equippedGlyph:null},s})},[]),equipSocketGlyph=reactExports.useCallback((e,a,s,i,o)=>{const c=`${e}_${a}_${s}`;setSocketGlyphs(g=>{const d=new Map(g);return d.set(c,{glyphId:i,rank:o}),d}),setSelectingGlyphForSocket(null)},[]),getNodeName=e=>language==="zhCN"&&e.nameCn?e.nameCn:e.nameEn||e.name||e.id,translateTerms=e=>{const a=[["Physical","物理"],["Damage","伤害"],["Strength","力量"],["Intelligence","智力"],["Willpower","意力"],["Dexterity","敏捷"],["Armor","护甲"],["Life","生命"],["Bonus","加成"],["Another","额外"],["if requirements met","满足门槛要求"],["requirements","门槛要求"],["met","满足"],["\\+","+"],["%","%"]];let s=e;for(const[o,c]of a){const g=new RegExp(o,"g");s=s.replace(g,c)}const i=s.indexOf(`

Tags:`);return i!==-1&&(s=s.substring(0,i)),s=s.replace(/\n{3,}/g,`

`).trim(),s},calculateThresholdRequirements=(node,equipIndex=1,className="Barbarian")=>{if(!node.thresholdRequirements)return"";const classRequirements=node.thresholdRequirements[className];if(!classRequirements||classRequirements.length===0)return"";let requirement=classRequirements[0];const expressionMatch=requirement.match(/\{(.+?)\}/);if(expressionMatch){const expression=expressionMatch[1],evaluatedExpression=expression.replace(/ParagonBoardEquipIndex/g,equipIndex.toString());try{const result=eval(evaluatedExpression);requirement=requirement.replace(/\{.+?\}/,Math.round(result).toString())}catch(e){console.error("Failed to evaluate threshold expression:",e)}}return requirement},attributeTranslations={Strength:"力量",Intelligence:"智力",Willpower:"意力",Dexterity:"敏捷"},translateAttributeName=e=>{for(const[a,s]of Object.entries(attributeTranslations))e=e.replace(new RegExp(a,"g"),s);return e},getNodeDesc=(e,a=1,s="Barbarian")=>{let i="";language==="zhCN"&&e.descCn?i=e.descCn:i=e.descEn||e.desc||"";const o=i.indexOf(`

Tags:`);if(o!==-1&&(i=i.substring(0,o)),language==="zhCN"&&(i=translateTerms(i)),i.includes("{thresholdRequirements}")){const c=calculateThresholdRequirements(e,a,s);if(c){let g=c;language==="zhCN"&&(g=translateAttributeName(c)),i=i.replace(/{thresholdRequirements}/g,g)}}return i.trim()},getGlyphName=e=>language==="zhCN"&&e.nameCn?e.nameCn:e.name||e.nameEn||e.id,filteredNodes=reactExports.useMemo(()=>{const e=[];return connectedBoards.forEach(a=>{var i;const s=data.boards.find(o=>o.id===a.boardId);if(s)for(let o=0;o<s.rows;o++)for(let c=0;c<s.cols;c++){const g=(i=s.grid[o])==null?void 0:i[c];if(g&&!(typeFilter!=="all"&&g.type!==typeFilter)){if(searchQuery){const d=searchQuery.toLowerCase(),h=getNodeName(g).toLowerCase(),j=getNodeDesc(g).toLowerCase();if(!h.includes(d)&&!j.includes(d)&&!g.id.toLowerCase().includes(d))continue}e.push({node:g,boardId:a.boardId,row:o,col:c})}}}),e},[data.boards,connectedBoards,typeFilter,searchQuery,language]),resetSimulator=reactExports.useCallback(()=>{setAllocations(new Map)},[]),clearBoardAllocations=reactExports.useCallback(e=>{const a=connectedBoards[e];a&&setAllocations(s=>{const i=new Map(s);return i.forEach((o,c)=>{c.startsWith(a.boardId+"_")&&i.delete(c)}),i})},[connectedBoards]),[replacingBoardIndex,setReplacingBoardIndex]=reactExports.useState(null),handleReplaceBoard=reactExports.useCallback(e=>{setReplacingBoardIndex(e)},[]),confirmReplaceBoard=reactExports.useCallback(e=>{if(replacingBoardIndex===null)return;setConnectedBoards(s=>{const i=[...s];return i[replacingBoardIndex]={...i[replacingBoardIndex],boardId:e,equippedGlyph:null,entryGate:void 0},i});const a=connectedBoards[replacingBoardIndex];a&&setAllocations(s=>{const i=new Map(s);return i.forEach((o,c)=>{c.startsWith(a.boardId+"_")&&i.delete(c)}),i}),setReplacingBoardIndex(null)},[replacingBoardIndex,connectedBoards]),handleDeleteBoard=reactExports.useCallback(e=>{const a=connectedBoards[e];!a||a.boardId.includes("Start")||(setAllocations(s=>{const i=new Map(s);return i.forEach((o,c)=>{c.startsWith(a.boardId+"_")&&i.delete(c)}),i}),setConnectedBoards(s=>s.filter((o,c)=>c!==e).map((o,c)=>({...o,boardIndex:c}))),selectedBoardIndex===e?setSelectedBoardIndex(0):selectedBoardIndex>e&&setSelectedBoardIndex(selectedBoardIndex-1))},[connectedBoards,selectedBoardIndex]),selectedGlyph=reactExports.useMemo(()=>{const e=connectedBoards[selectedBoardIndex];return e!=null&&e.equippedGlyph?data.glyphs.find(a=>{var s;return a.id===((s=e.equippedGlyph)==null?void 0:s.glyphId)}):null},[selectedBoardIndex,connectedBoards,data.glyphs]);return jsxRuntimeExports.jsxs("div",{className:"app",children:[jsxRuntimeExports.jsxs("header",{className:"header",children:[jsxRuntimeExports.jsx("h1",{children:"暗黑破坏神4 巅峰盘模拟器"}),jsxRuntimeExports.jsxs("div",{className:"header-controls",children:[jsxRuntimeExports.jsxs("select",{value:currentClass,onChange:e=>setCurrentClass(e.target.value),className:"class-select",children:[jsxRuntimeExports.jsx("option",{value:"Barbarian",children:"野蛮人"}),jsxRuntimeExports.jsx("option",{value:"Druid",children:"德鲁伊"}),jsxRuntimeExports.jsx("option",{value:"Necromancer",children:"死灵法师"}),jsxRuntimeExports.jsx("option",{value:"Rogue",children:"游侠"}),jsxRuntimeExports.jsx("option",{value:"Sorcerer",children:"法师"})]}),jsxRuntimeExports.jsx("button",{className:`lang-btn ${language==="zhCN"?"active":""}`,onClick:()=>setLanguage("zhCN"),children:"中文"}),jsxRuntimeExports.jsx("button",{className:`lang-btn ${language==="enUS"?"active":""}`,onClick:()=>setLanguage("enUS"),children:"English"})]})]}),jsxRuntimeExports.jsxs("div",{className:"main-container",children:[jsxRuntimeExports.jsxs("div",{className:"left-panel",children:[jsxRuntimeExports.jsxs("div",{className:"panel-section",children:[jsxRuntimeExports.jsx("h3",{children:"操作模式"}),jsxRuntimeExports.jsxs("div",{className:"mode-buttons",children:[jsxRuntimeExports.jsx("button",{className:`mode-btn ${operationMode==="select"?"active":""}`,onClick:()=>setOperationMode("select"),children:"选择"}),jsxRuntimeExports.jsx("button",{className:`mode-btn ${operationMode==="move"?"active":""}`,onClick:()=>setOperationMode("move"),children:"移动"}),jsxRuntimeExports.jsx("button",{className:`mode-btn ${operationMode==="rotate"?"active":""}`,onClick:()=>setOperationMode("rotate"),children:"旋转"})]}),jsxRuntimeExports.jsxs("div",{className:"quick-path-toggle",children:[jsxRuntimeExports.jsx("button",{className:`quick-path-btn ${quickPathMode?"active":""}`,onClick:()=>setQuickPathMode(!quickPathMode),children:quickPathMode?"✓ 快捷路径模式":"快捷路径模式"}),jsxRuntimeExports.jsx("p",{className:"quick-path-hint",children:"启用后，点击任意未点亮节点会自动点亮最短路径"})]})]}),jsxRuntimeExports.jsxs("div",{className:"panel-section",children:[jsxRuntimeExports.jsxs("h3",{children:["已连接的巅峰盘 (",connectedBoards.length,"/5)"]}),jsxRuntimeExports.jsx("div",{className:"board-list",children:connectedBoards.map((e,a)=>{var i;const s=data.boards.find(o=>o.id===e.boardId);return jsxRuntimeExports.jsxs("div",{className:`board-item ${selectedBoardIndex===a?"active":""}`,onClick:()=>{setSelectedBoardIndex(a)},children:[jsxRuntimeExports.jsxs("div",{className:"board-header",children:[jsxRuntimeExports.jsx("span",{className:"board-name",children:(s==null?void 0:s.name)||e.boardId}),jsxRuntimeExports.jsxs("span",{className:"board-location",children:["位置: ",e.gridLocation]})]}),jsxRuntimeExports.jsx("div",{className:"board-controls",children:jsxRuntimeExports.jsxs("div",{className:"rotation-controls",children:[jsxRuntimeExports.jsx("button",{className:"rot-btn",onClick:o=>{o.stopPropagation(),rotateBoardCounterClockwise(a)},title:"逆时针旋转",children:"↺"}),jsxRuntimeExports.jsxs("span",{className:"rotation-value",children:[e.rotation,"°"]}),jsxRuntimeExports.jsx("button",{className:"rot-btn",onClick:o=>{o.stopPropagation(),rotateBoardClockwise(a)},title:"顺时针旋转",children:"↻"})]})}),jsxRuntimeExports.jsx("div",{className:"board-change",children:jsxRuntimeExports.jsx("select",{value:e.boardId,onChange:o=>{changeBoard(a,o.target.value)},className:"board-select",children:data.boards.map(o=>jsxRuntimeExports.jsx("option",{value:o.id,children:o.name||o.id},o.id))})}),jsxRuntimeExports.jsxs("div",{className:"equip-index",children:[jsxRuntimeExports.jsx("label",{children:"装备索引:"}),jsxRuntimeExports.jsx("input",{type:"number",min:"1",max:"9",value:e.equipIndex,onChange:o=>setEquipIndex(a,parseInt(o.target.value)),className:"equip-index-input"})]}),jsxRuntimeExports.jsxs("div",{className:"grid-position",children:[jsxRuntimeExports.jsx("label",{children:"网格位置:"}),jsxRuntimeExports.jsxs("select",{value:e.gridLocation,onChange:o=>moveBoard(a,o.target.value),className:"grid-select",children:[jsxRuntimeExports.jsx("option",{value:"",children:"选择位置"}),BOARD_LOCATIONS.map(o=>jsxRuntimeExports.jsx("option",{value:o,children:o},o))]})]}),jsxRuntimeExports.jsxs("div",{className:"glyph-socket",children:[jsxRuntimeExports.jsx("label",{children:"雕文:"}),jsxRuntimeExports.jsxs("select",{value:((i=e.equippedGlyph)==null?void 0:i.glyphId)||"",onChange:o=>{o.target.value?equipGlyph(a,o.target.value,1):removeGlyph(a)},className:"glyph-select",children:[jsxRuntimeExports.jsx("option",{value:"",children:"选择雕文"}),data.glyphs.map(o=>jsxRuntimeExports.jsx("option",{value:o.id,children:getGlyphName(o)},o.id))]}),e.equippedGlyph&&jsxRuntimeExports.jsxs("div",{className:"glyph-rank",children:[jsxRuntimeExports.jsx("label",{children:"等级:"}),jsxRuntimeExports.jsx("input",{type:"range",min:"1",max:"21",value:e.equippedGlyph.rank,onChange:o=>{equipGlyph(a,e.equippedGlyph.glyphId,parseInt(o.target.value))},className:"glyph-rank-slider"}),jsxRuntimeExports.jsx("span",{children:e.equippedGlyph.rank})]})]})]},a)})})]}),jsxRuntimeExports.jsxs("div",{className:"panel-section",children:[jsxRuntimeExports.jsx("h3",{children:"属性统计"}),jsxRuntimeExports.jsxs("div",{className:"stats-panel",children:[jsxRuntimeExports.jsxs("div",{className:"stat-item",children:[jsxRuntimeExports.jsx("span",{className:"stat-label",children:"剩余点数"}),jsxRuntimeExports.jsx("span",{className:"stat-value",children:totalPoints-usedPoints})]}),jsxRuntimeExports.jsxs("div",{className:"stat-item",children:[jsxRuntimeExports.jsx("span",{className:"stat-label",children:"已用点数"}),jsxRuntimeExports.jsx("span",{className:"stat-value",children:usedPoints})]}),jsxRuntimeExports.jsxs("div",{className:"stat-item",children:[jsxRuntimeExports.jsx("span",{className:"stat-label",children:"Strength"}),jsxRuntimeExports.jsx("span",{className:"stat-value",children:playerAttributes.Strength})]}),jsxRuntimeExports.jsxs("div",{className:"stat-item",children:[jsxRuntimeExports.jsx("span",{className:"stat-label",children:"Intelligence"}),jsxRuntimeExports.jsx("span",{className:"stat-value",children:playerAttributes.Intelligence})]}),jsxRuntimeExports.jsxs("div",{className:"stat-item",children:[jsxRuntimeExports.jsx("span",{className:"stat-label",children:"Willpower"}),jsxRuntimeExports.jsx("span",{className:"stat-value",children:playerAttributes.Willpower})]}),jsxRuntimeExports.jsxs("div",{className:"stat-item",children:[jsxRuntimeExports.jsx("span",{className:"stat-label",children:"Dexterity"}),jsxRuntimeExports.jsx("span",{className:"stat-value",children:playerAttributes.Dexterity})]})]})]}),jsxRuntimeExports.jsxs("div",{className:"panel-section",children:[jsxRuntimeExports.jsx("h3",{children:"连接状态"}),jsxRuntimeExports.jsx("div",{className:"connections-panel",children:checkGateConnections.length>0?checkGateConnections.map((e,a)=>jsxRuntimeExports.jsxs("div",{className:"connection-item",children:[jsxRuntimeExports.jsx("span",{children:connectedBoards[e.from].boardId.split("_").pop()}),jsxRuntimeExports.jsx("span",{className:"connection-arrow",children:"↔"}),jsxRuntimeExports.jsx("span",{children:connectedBoards[e.to].boardId.split("_").pop()})]},a)):jsxRuntimeExports.jsx("span",{className:"no-connections",children:"暂无连接"})})]}),jsxRuntimeExports.jsx("button",{className:"reset-btn",onClick:resetSimulator,children:"重置模拟器"}),jsxRuntimeExports.jsx("button",{className:`toggle-panel-btn ${showRightPanel?"active":""}`,onClick:()=>setShowRightPanel(!showRightPanel),children:showRightPanel?"隐藏右侧面板":"显示右侧面板"})]}),jsxRuntimeExports.jsx("div",{className:`center-panel ${showRightPanel?"":"full-width"}`,children:jsxRuntimeExports.jsx(ParagonCanvas,{boards:data.boards,connectedBoards,allocations,reachableNodes,socketGlyphs,hoveredNode,onNodeHover:setHoveredNode,onNodeClick:handleNodeClick,zoom,pan,onZoomChange:setZoom,onPanChange:setPan,onRotateBoard:rotateBoardClockwise,onClearBoard:clearBoardAllocations,onReplaceBoard:handleReplaceBoard,onDeleteBoard:handleDeleteBoard})}),selectingBoardForGate&&jsxRuntimeExports.jsx("div",{className:"modal-overlay",onClick:()=>setSelectingBoardForGate(null),children:jsxRuntimeExports.jsxs("div",{className:"modal-content gate-select-modal",onClick:e=>e.stopPropagation(),children:[jsxRuntimeExports.jsx("h3",{children:"选择连接的巅峰盘"}),jsxRuntimeExports.jsx("div",{className:"board-grid",children:data.boards.filter(e=>!e.id.includes("Start")&&!connectedBoards.some(a=>a.boardId===e.id)).map(e=>jsxRuntimeExports.jsx("button",{className:"board-select-btn",onClick:()=>connectBoardViaGate(e.id),children:e.name},e.id))}),jsxRuntimeExports.jsx("button",{className:"cancel-btn",onClick:()=>setSelectingBoardForGate(null),children:"取消"})]})}),replacingBoardIndex!==null&&jsxRuntimeExports.jsx("div",{className:"modal-overlay",onClick:()=>setReplacingBoardIndex(null),children:jsxRuntimeExports.jsxs("div",{className:"modal-content gate-select-modal",onClick:e=>e.stopPropagation(),children:[jsxRuntimeExports.jsx("h3",{children:"替换巅峰盘"}),jsxRuntimeExports.jsx("div",{className:"board-grid",children:data.boards.filter(e=>!e.id.includes("Start")&&!connectedBoards.some((a,s)=>s!==replacingBoardIndex&&a.boardId===e.id)).map(e=>{var a;return jsxRuntimeExports.jsx("button",{className:`board-select-btn ${((a=connectedBoards[replacingBoardIndex])==null?void 0:a.boardId)===e.id?"selected":""}`,onClick:()=>confirmReplaceBoard(e.id),children:e.name},e.id)})}),jsxRuntimeExports.jsx("button",{className:"cancel-btn",onClick:()=>setReplacingBoardIndex(null),children:"取消"})]})}),selectingGlyphForSocket&&jsxRuntimeExports.jsx("div",{className:"modal-overlay",onClick:()=>setSelectingGlyphForSocket(null),children:jsxRuntimeExports.jsxs("div",{className:"modal-content glyph-select-modal",onClick:e=>e.stopPropagation(),children:[jsxRuntimeExports.jsx("h3",{children:"选择雕纹"}),jsxRuntimeExports.jsx("div",{className:"glyph-grid",children:data.glyphs.map(e=>jsxRuntimeExports.jsxs("button",{className:"glyph-select-btn",onClick:()=>equipSocketGlyph(selectingGlyphForSocket.boardId,selectingGlyphForSocket.row,selectingGlyphForSocket.col,e.id,1),children:[jsxRuntimeExports.jsx("span",{className:"glyph-name",children:getGlyphName(e)}),e.thresholdCn&&jsxRuntimeExports.jsx("span",{className:"glyph-threshold",children:e.thresholdCn})]},e.id))}),jsxRuntimeExports.jsx("button",{className:"cancel-btn",onClick:()=>setSelectingGlyphForSocket(null),children:"取消"})]})}),hoveredNode&&jsxRuntimeExports.jsx(NodeTooltip,{node:hoveredNode.node,mouseX:mousePosition.x,mouseY:mousePosition.y,language}),showRightPanel&&jsxRuntimeExports.jsxs("div",{className:"right-panel",children:[jsxRuntimeExports.jsxs("div",{className:"panel-section",children:[jsxRuntimeExports.jsx("input",{type:"text",placeholder:"搜索节点...",value:searchQuery,onChange:e=>setSearchQuery(e.target.value),className:"search-input"}),jsxRuntimeExports.jsxs("div",{className:"filter-buttons",children:[jsxRuntimeExports.jsx("button",{className:`filter-btn ${typeFilter==="all"?"active":""}`,onClick:()=>setTypeFilter("all"),children:"全部"}),jsxRuntimeExports.jsx("button",{className:`filter-btn ${typeFilter==="normal"?"active":""}`,onClick:()=>setTypeFilter("normal"),children:"普通"}),jsxRuntimeExports.jsx("button",{className:`filter-btn ${typeFilter==="magic"?"active":""}`,onClick:()=>setTypeFilter("magic"),children:"魔法"}),jsxRuntimeExports.jsx("button",{className:`filter-btn ${typeFilter==="rare"?"active":""}`,onClick:()=>setTypeFilter("rare"),children:"稀有"}),jsxRuntimeExports.jsx("button",{className:`filter-btn ${typeFilter==="legendary"?"active":""}`,onClick:()=>setTypeFilter("legendary"),children:"传奇"})]})]}),jsxRuntimeExports.jsx("div",{className:"panel-section node-detail",children:hoveredNode?jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment,{children:[jsxRuntimeExports.jsx("h3",{children:getNodeName(hoveredNode.node)}),jsxRuntimeExports.jsx("div",{className:"node-type-badge","data-type":hoveredNode.node.type,children:NODE_TYPE_LABELS[hoveredNode.node.type][language]}),jsxRuntimeExports.jsx("p",{className:"node-desc",children:getNodeDesc(hoveredNode.node)}),jsxRuntimeExports.jsxs("div",{className:"node-coords",children:["位置: ",hoveredNode.boardId," (",hoveredNode.row,", ",hoveredNode.col,")"]}),reachableNodes.has(`${hoveredNode.boardId}_${hoveredNode.row}_${hoveredNode.col}`)&&!allocations.has(`${hoveredNode.boardId}_${hoveredNode.row}_${hoveredNode.col}`)&&jsxRuntimeExports.jsx("div",{className:"node-hint",children:"点击分配点数"})]}):jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment,{children:[jsxRuntimeExports.jsx("h3",{children:"节点详情"}),jsxRuntimeExports.jsx("div",{className:"node-empty",children:"鼠标悬停在节点上查看详情"})]})}),selectedGlyph&&jsxRuntimeExports.jsxs("div",{className:"panel-section glyph-detail",children:[jsxRuntimeExports.jsxs("h3",{children:["当前雕文: ",getGlyphName(selectedGlyph)]}),jsxRuntimeExports.jsxs("div",{className:"glyph-info",children:[jsxRuntimeExports.jsx("div",{className:"glyph-desc",children:selectedGlyph.descCn||selectedGlyph.desc}),selectedGlyph.threshold&&jsxRuntimeExports.jsxs("div",{className:"glyph-threshold",children:["需求: ",selectedGlyph.thresholdCn||selectedGlyph.threshold]}),selectedGlyph.bonus&&jsxRuntimeExports.jsx("div",{className:"glyph-bonus",children:selectedGlyph.bonusCn||selectedGlyph.bonus})]})]}),jsxRuntimeExports.jsxs("div",{className:"panel-section",children:[jsxRuntimeExports.jsxs("h3",{children:["节点列表 (",filteredNodes.length,")"]}),jsxRuntimeExports.jsx("div",{className:"node-list",children:filteredNodes.slice(0,50).map(({node:e,boardId:a,row:s,col:i})=>{const o=`${a}_${s}_${i}`,c=allocations.has(o);return jsxRuntimeExports.jsxs("div",{className:`node-list-item ${c?"allocated":""}`,onClick:()=>handleNodeClick(a,s,i,e),children:[jsxRuntimeExports.jsx("span",{className:`node-dot ${e.type}`}),jsxRuntimeExports.jsx("span",{className:"node-name",children:getNodeName(e)}),jsxRuntimeExports.jsx("span",{className:"node-board",children:a}),c&&jsxRuntimeExports.jsx("span",{className:"allocated-badge",children:"已分配"})]},o)})})]}),jsxRuntimeExports.jsxs("div",{className:"panel-section",children:[jsxRuntimeExports.jsxs("h3",{children:["可用雕纹 (",data.glyphs.length,")"]}),jsxRuntimeExports.jsx("div",{className:"glyph-list",children:data.glyphs.slice(0,10).map(e=>jsxRuntimeExports.jsxs("div",{className:"glyph-item",children:[jsxRuntimeExports.jsx("div",{className:"glyph-name",children:getGlyphName(e)}),e.tiers&&jsxRuntimeExports.jsxs("div",{className:"glyph-tiers",children:[e.tiers.slice(0,5).map((a,s)=>jsxRuntimeExports.jsxs("span",{className:"tier-badge",children:["Lv",s+1,": +",a]},s)),"..."]})]},e.id))})]})]})]})]})}client.createRoot(document.getElementById("root")).render(jsxRuntimeExports.jsx(React.StrictMode,{children:jsxRuntimeExports.jsx(App,{})}));
