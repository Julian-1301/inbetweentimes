(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=e(i);fetch(i.href,n)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const N=globalThis,D=N.ShadowRoot&&(N.ShadyCSS===void 0||N.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,G=Symbol(),W=new WeakMap;let st=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==G)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(D&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=W.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&W.set(e,t))}return t}toString(){return this.cssText}};const dt=r=>new st(typeof r=="string"?r:r+"",void 0,G),ut=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new st(e,r,G)},pt=(r,t)=>{if(D)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=N.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},q=D?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return dt(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:$t,defineProperty:ft,getOwnPropertyDescriptor:mt,getOwnPropertyNames:gt,getOwnPropertySymbols:_t,getPrototypeOf:yt}=Object,g=globalThis,V=g.trustedTypes,At=V?V.emptyScript:"",j=g.reactiveElementPolyfillSupport,x=(r,t)=>r,L={toAttribute(r,t){switch(t){case Boolean:r=r?At:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},it=(r,t)=>!$t(r,t),J={attribute:!0,type:String,converter:L,reflect:!1,hasChanged:it};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),g.litPropertyMetadata??(g.litPropertyMetadata=new WeakMap);class v extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=J){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&ft(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=mt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return i==null?void 0:i.call(this)},set(o){const c=i==null?void 0:i.call(this);n.call(this,o),this.requestUpdate(t,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??J}static _$Ei(){if(this.hasOwnProperty(x("elementProperties")))return;const t=yt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(x("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(x("properties"))){const e=this.properties,s=[...gt(e),..._t(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(q(i))}else t!==void 0&&e.push(q(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return pt(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EC(t,e){var n;const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){const o=(((n=s.converter)==null?void 0:n.toAttribute)!==void 0?s.converter:L).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){var n;const s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const o=s.getPropertyOptions(i),c=typeof o.converter=="function"?{fromAttribute:o.converter}:((n=o.converter)==null?void 0:n.fromAttribute)!==void 0?o.converter:L;this._$Em=i,this[i]=c.fromAttribute(e,o.type),this._$Em=null}}requestUpdate(t,e,s){if(t!==void 0){if(s??(s=this.constructor.getPropertyOptions(t)),!(s.hasChanged??it)(this[t],e))return;this.P(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,s){this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,o]of i)o.wrapped!==!0||this._$AL.has(n)||this[n]===void 0||this.P(n,this[n],o)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(s=this._$EO)==null||s.forEach(i=>{var n;return(n=i.hostUpdate)==null?void 0:n.call(i)}),this.update(e)):this._$EU()}catch(i){throw t=!1,this._$EU(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}}v.elementStyles=[],v.shadowRootOptions={mode:"open"},v[x("elementProperties")]=new Map,v[x("finalized")]=new Map,j==null||j({ReactiveElement:v}),(g.reactiveElementVersions??(g.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const w=globalThis,I=w.trustedTypes,F=I?I.createPolicy("lit-html",{createHTML:r=>r}):void 0,rt="$lit$",m=`lit$${(Math.random()+"").slice(9)}$`,nt="?"+m,vt=`<${nt}>`,A=document,P=()=>A.createComment(""),O=r=>r===null||typeof r!="object"&&typeof r!="function",ot=Array.isArray,bt=r=>ot(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",B=`[ 	
\f\r]`,E=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,K=/-->/g,X=/>/g,_=RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Z=/'/g,Q=/"/g,at=/^(?:script|style|textarea|title)$/i,St=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),p=St(1),b=Symbol.for("lit-noChange"),l=Symbol.for("lit-nothing"),Y=new WeakMap,y=A.createTreeWalker(A,129);function ht(r,t){if(!Array.isArray(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return F!==void 0?F.createHTML(t):t}const Et=(r,t)=>{const e=r.length-1,s=[];let i,n=t===2?"<svg>":"",o=E;for(let c=0;c<e;c++){const a=r[c];let d,u,h=-1,$=0;for(;$<a.length&&(o.lastIndex=$,u=o.exec(a),u!==null);)$=o.lastIndex,o===E?u[1]==="!--"?o=K:u[1]!==void 0?o=X:u[2]!==void 0?(at.test(u[2])&&(i=RegExp("</"+u[2],"g")),o=_):u[3]!==void 0&&(o=_):o===_?u[0]===">"?(o=i??E,h=-1):u[1]===void 0?h=-2:(h=o.lastIndex-u[2].length,d=u[1],o=u[3]===void 0?_:u[3]==='"'?Q:Z):o===Q||o===Z?o=_:o===K||o===X?o=E:(o=_,i=void 0);const f=o===_&&r[c+1].startsWith("/>")?" ":"";n+=o===E?a+vt:h>=0?(s.push(d),a.slice(0,h)+rt+a.slice(h)+m+f):a+m+(h===-2?c:f)}return[ht(r,n+(r[e]||"<?>")+(t===2?"</svg>":"")),s]};class U{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0;const c=t.length-1,a=this.parts,[d,u]=Et(t,e);if(this.el=U.createElement(d,s),y.currentNode=this.el.content,e===2){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(i=y.nextNode())!==null&&a.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(const h of i.getAttributeNames())if(h.endsWith(rt)){const $=u[o++],f=i.getAttribute(h).split(m),H=/([.?@])?(.*)/.exec($);a.push({type:1,index:n,name:H[2],strings:f,ctor:H[1]==="."?wt:H[1]==="?"?Ct:H[1]==="@"?Pt:R}),i.removeAttribute(h)}else h.startsWith(m)&&(a.push({type:6,index:n}),i.removeAttribute(h));if(at.test(i.tagName)){const h=i.textContent.split(m),$=h.length-1;if($>0){i.textContent=I?I.emptyScript:"";for(let f=0;f<$;f++)i.append(h[f],P()),y.nextNode(),a.push({type:2,index:++n});i.append(h[$],P())}}}else if(i.nodeType===8)if(i.data===nt)a.push({type:2,index:n});else{let h=-1;for(;(h=i.data.indexOf(m,h+1))!==-1;)a.push({type:7,index:n}),h+=m.length-1}n++}}static createElement(t,e){const s=A.createElement("template");return s.innerHTML=t,s}}function S(r,t,e=r,s){var o,c;if(t===b)return t;let i=s!==void 0?(o=e._$Co)==null?void 0:o[s]:e._$Cl;const n=O(t)?void 0:t._$litDirective$;return(i==null?void 0:i.constructor)!==n&&((c=i==null?void 0:i._$AO)==null||c.call(i,!1),n===void 0?i=void 0:(i=new n(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=i:e._$Cl=i),i!==void 0&&(t=S(r,i._$AS(r,t.values),i,s)),t}class xt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??A).importNode(e,!0);y.currentNode=i;let n=y.nextNode(),o=0,c=0,a=s[0];for(;a!==void 0;){if(o===a.index){let d;a.type===2?d=new T(n,n.nextSibling,this,t):a.type===1?d=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(d=new Ot(n,this,t)),this._$AV.push(d),a=s[++c]}o!==(a==null?void 0:a.index)&&(n=y.nextNode(),o++)}return y.currentNode=A,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class T{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=l,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=S(this,t,e),O(t)?t===l||t==null||t===""?(this._$AH!==l&&this._$AR(),this._$AH=l):t!==this._$AH&&t!==b&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):bt(t)?this.k(t):this._(t)}S(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t))}_(t){this._$AH!==l&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(A.createTextNode(t)),this._$AH=t}$(t){var n;const{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=U.createElement(ht(s.h,s.h[0]),this.options)),s);if(((n=this._$AH)==null?void 0:n._$AD)===i)this._$AH.p(e);else{const o=new xt(i,this),c=o.u(this.options);o.p(e),this.T(c),this._$AH=o}}_$AC(t){let e=Y.get(t.strings);return e===void 0&&Y.set(t.strings,e=new U(t)),e}k(t){ot(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new T(this.S(P()),this.S(P()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class R{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=l,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=l}_$AI(t,e=this,s,i){const n=this.strings;let o=!1;if(n===void 0)t=S(this,t,e,0),o=!O(t)||t!==this._$AH&&t!==b,o&&(this._$AH=t);else{const c=t;let a,d;for(t=n[0],a=0;a<n.length-1;a++)d=S(this,c[s+a],e,a),d===b&&(d=this._$AH[a]),o||(o=!O(d)||d!==this._$AH[a]),d===l?t=l:t!==l&&(t+=(d??"")+n[a+1]),this._$AH[a]=d}o&&!i&&this.j(t)}j(t){t===l?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class wt extends R{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===l?void 0:t}}class Ct extends R{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==l)}}class Pt extends R{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=S(this,t,e,0)??l)===b)return;const s=this._$AH,i=t===l&&s!==l||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==l&&(s===l||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Ot{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t)}}const M=w.litHtmlPolyfillSupport;M==null||M(U,T),(w.litHtmlVersions??(w.litHtmlVersions=[])).push("3.1.2");const Ut=(r,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let i=s._$litPart$;if(i===void 0){const n=(e==null?void 0:e.renderBefore)??null;s._$litPart$=i=new T(t.insertBefore(P(),n),n,void 0,e??{})}return i._$AI(r),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class C extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ut(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return b}}var et;C._$litElement$=!0,C.finalized=!0,(et=globalThis.litElementHydrateSupport)==null||et.call(globalThis,{LitElement:C});const k=globalThis.litElementPolyfillSupport;k==null||k({LitElement:C});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Tt=r=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(r,t)}):customElements.define(r,t)};var lt={API_URL:"https://inbetweentimes.onrender.com/"};async function Ht(r,t){const e=await fetch(`${lt.API_URL}${r}`,{method:"GET",headers:{"X-PlayerSessionId":ct()}});return parseInt(e.headers.get("content-length"))>0?e.json():Promise.resolve(void 0)}async function Nt(r,t){return It("POST",r,t)}async function It(r,t,e){const s=await fetch(`${lt.API_URL}${t}`,{method:r,headers:{"Content-Type":"application/json","X-PlayerSessionId":ct()},body:e?JSON.stringify(e):void 0});return parseInt(s.headers.get("content-length"))>0?s.json():Promise.resolve(void 0)}function ct(){let r=localStorage.getItem("playerSessionId");return r||(r=crypto.randomUUID(),localStorage.setItem("playerSessionId",r)),r}async function Rt(){return Ht("state")}async function tt(r,t){try{return Nt("action",{action:r,objects:t})}catch{return}}var jt=Object.getOwnPropertyDescriptor,Bt=(r,t,e,s)=>{for(var i=s>1?void 0:s?jt(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(i)||i);return i};let z=class extends C{constructor(){super(...arguments),this.selectedGameObjectButtons=new Set}connectedCallback(){super.connectedCallback(),this.refreshState()}async refreshState(){const r=await Rt();this.updateState(r)}updateState(r){this.roomTitle=r.roomTitle,this.roomImages=r.roomImages,this.roomSounds=r.roomSounds,this.contentText=r.text,this.actionButtons=r.actions,this.gameObjectButtons=r.objects,this.selectedActionButton=void 0,this.selectedGameObjectButtons.clear(),this.requestUpdate()}async handleClickAction(r){if(r.needsObject)this.selectedActionButton=r,this.selectedGameObjectButtons.clear(),this.requestUpdate();else{const t=await tt(r.alias);if(t===void 0)return;this.updateState(t)}}async handleClickObject(r){if(!this.selectedActionButton)return;this.selectedGameObjectButtons.add(r);const t=await tt(this.selectedActionButton.alias,[...this.selectedGameObjectButtons].map(e=>e.alias));this.selectedGameObjectButtons.size>=2&&(this.selectedActionButton=void 0,this.selectedGameObjectButtons.clear()),this.requestUpdate(),t!==void 0&&this.updateState(t)}render(){return p`
            <div class="game">
                ${this.renderTitle()} ${this.renderHeader()} ${this.renderSound()} ${this.renderContent()} ${this.renderFooter()}
            </div>
        `}renderTitle(){return this.roomTitle?p`<div class="title">${this.roomTitle}</div>`:p`${l}`}renderSound(){return this.roomSounds&&this.roomSounds.length>0?p`
                <div class="sound">
                    ${this.roomSounds.map(r=>p`<audio autoplay loop src="assets/Sound/Ambient/${r}.mp3"></audio>`)}
                </div>
            `:p`${l}`}renderHeader(){var r;return this.roomImages&&this.roomImages.length>0?p`
                <div class="header">
                    ${(r=this.roomImages)==null?void 0:r.map(t=>p`<img src="assets/img/rooms/${t}.png" />`)}
                </div>
            `:p`${l}`}renderContent(){var r;return p`
            <div class="content">
                ${(r=this.contentText)==null?void 0:r.map(t=>{const e=t.split(/(<blue>.*?<\/blue>)/g).map(s=>typeof s=="string"&&s.startsWith("<blue>")&&s.endsWith("</blue>")?p`<span class="blue">${s.slice(6,-7)}</span>`:s);return p`<p>${e}</p>`})}
            </div>`}renderFooter(){var r,t;return p`
            <div class="footer">
                <div class="buttons">
                    <div>
                        ${(r=this.actionButtons)==null?void 0:r.map(e=>p`<a
                                class="button ${this.selectedActionButton===e?"active":""}"
                                @click=${()=>void this.handleClickAction(e)}
                            >${e.label}</a
                            >`)}
                    </div>
                    <div>
                        ${this.selectedActionButton?(t=this.gameObjectButtons)==null?void 0:t.map(e=>p`<a
                                    class="button ${this.selectedGameObjectButtons.has(e)?"active":""}"
                                    @click=${()=>void this.handleClickObject(e)}
                                >${e.name}</a
                                >`):l}
                    </div>
                </div>
            </div>
        `}};z.styles=ut`
        .game {
            height: 100%;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: auto auto 1fr auto;
            grid-column-gap: 0px;
            grid-row-gap: 0px;
        }

        .title {
            text-align: center;
            margin-top: 10px;
        }

        .header {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex-grow: 1;
            position: relative;
            margin-top: 10px;
        }

        .header img {
            width: 100%;
            height: auto;
            image-rendering: pixelated;
        }

        .sound {
            display: none;
        }

        .header img:nth-child(n + 2) {
            position: absolute;
        }

        .content {
            flex-grow: 1;
            overflow: auto;
            margin-top: 10px;
            padding: 0 10px;
        }

        .content p {
            margin: 0 0 10px 0;
        }

        .content p:last-of-type {
            margin: 0;
        }

        .footer {
            border-radius: 10px 10px 0 0;
            background-color: #0c3b8c;
            border: 1px solid #0a1128;
            margin-top: 10px;
            display: flex;
            height: 150px;
        }

        .footer .buttons {
            display: flex;
            flex-direction: column;
            overflow: auto;
            padding: 10px 10px 0 10px;
        }

        .footer .button {
            background-color: #0a59a2;
            border: 1px solid #0a1128;
            padding: 5px 10px;
            margin: 0 0 10px 10px;
            text-transform: uppercase;
            cursor: pointer;
            display: inline-block;
            user-select: none;
        }

        .footer .button.active,
        .footer .button:hover {
            background-color: #0a1128;
        }

        .blue {
            color: aquamarine;
        }

    `;z=Bt([Tt("game-canvas")],z);
//# sourceMappingURL=app_0-BIPnTr2Q.js.map
