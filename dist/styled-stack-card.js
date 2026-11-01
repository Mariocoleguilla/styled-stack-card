var e=globalThis,t=e.ShadowRoot&&(e.ShadyCSS===void 0||e.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,n=Symbol(),r=new WeakMap,i=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,n=this.t;if(t&&e===void 0){let t=n!==void 0&&n.length===1;t&&(e=r.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&r.set(n,e))}return e}toString(){return this.cssText}},a=e=>new i(typeof e==`string`?e:e+``,void 0,n),o=(e,...t)=>new i(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,n),s=(n,r)=>{if(t)n.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let t of r){let r=document.createElement(`style`),i=e.litNonce;i!==void 0&&r.setAttribute(`nonce`,i),r.textContent=t.cssText,n.appendChild(r)}},c=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return a(t)})(e):e,l,{is:u,defineProperty:d,getOwnPropertyDescriptor:ee,getOwnPropertyNames:te,getOwnPropertySymbols:ne,getPrototypeOf:re}=Object,f=globalThis,ie=f.trustedTypes,ae=ie?ie.emptyScript:``,oe=f.reactiveElementPolyfillSupport,p=(e,t)=>e,m={toAttribute(e,t){switch(t){case Boolean:e=e?ae:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},se=(e,t)=>!u(e,t),ce={attribute:!0,type:String,converter:m,reflect:!1,useDefault:!1,hasChanged:se};(l=Symbol).metadata??(l.metadata=Symbol(`metadata`)),f.litPropertyMetadata??(f.litPropertyMetadata=new WeakMap);var h=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ce){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&d(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=ee(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ce}static _$Ei(){if(this.hasOwnProperty(p(`elementProperties`)))return;let e=re(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(p(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(p(`properties`))){let e=this.properties,t=[...te(e),...ne(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(c(e))}else e!==void 0&&t.push(c(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return s(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?m:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?m:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??(n=a.getPropertyOptions(e)),!((n.hasChanged??se)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(e){}firstUpdated(e){}};h.elementStyles=[],h.shadowRootOptions={mode:`open`},h[p(`elementProperties`)]=new Map,h[p(`finalized`)]=new Map,oe?.({ReactiveElement:h}),(f.reactiveElementVersions??(f.reactiveElementVersions=[])).push(`2.1.2`);var g=globalThis,le=e=>e,_=g.trustedTypes,ue=_?_.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,v=`$lit$`,y=`lit$${Math.random().toFixed(9).slice(2)}$`,b=`?`+y,de=`<${b}>`,x=document,S=()=>x.createComment(``),C=e=>e===null||typeof e!=`object`&&typeof e!=`function`,w=Array.isArray,fe=e=>w(e)||typeof e?.[Symbol.iterator]==`function`,T=`[ 	
\f\r]`,E=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,pe=/-->/g,me=/>/g,D=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),he=/'/g,ge=/"/g,_e=/^(?:script|style|textarea|title)$/i,O=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),k=Symbol.for(`lit-noChange`),A=Symbol.for(`lit-nothing`),ve=new WeakMap,j=x.createTreeWalker(x,129);function ye(e,t){if(!w(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return ue===void 0?t:ue.createHTML(t)}var be=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=E;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===E?c[1]===`!--`?o=pe:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=D):(_e.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=D):o=me:o===D?c[0]===`>`?(o=i??E,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?D:c[3]===`"`?ge:he):o===ge||o===he?o=D:o===pe||o===me?o=E:(o=D,i=void 0);let d=o===D&&e[t+1].startsWith(`/>`)?` `:``;a+=o===E?n+de:l>=0?(r.push(s),n.slice(0,l)+v+n.slice(l)+y+d):n+y+(l===-2?t:d)}return[ye(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},M=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=be(t,n);if(this.el=e.createElement(l,r),j.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=j.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(v)){let t=u[o++],n=i.getAttribute(e).split(y),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?Se:r[1]===`?`?Ce:r[1]===`@`?we:F}),i.removeAttribute(e)}else e.startsWith(y)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(_e.test(i.tagName)){let e=i.textContent.split(y),t=e.length-1;if(t>0){i.textContent=_?_.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],S()),j.nextNode(),c.push({type:2,index:++a});i.append(e[t],S())}}}else if(i.nodeType===8)if(i.data===b)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(y,e+1))!==-1;)c.push({type:7,index:a}),e+=y.length-1}a++}}static createElement(e,t){let n=x.createElement(`template`);return n.innerHTML=e,n}};function N(e,t,n=e,r){if(t===k)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=C(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??(n._$Co=[]))[r]=i),i!==void 0&&(t=N(e,i._$AS(e,t.values),i,r)),t}var xe=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??x).importNode(t,!0);j.currentNode=r;let i=j.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new P(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new Te(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=j.nextNode(),a++)}return j.currentNode=x,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},P=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=N(this,e,t),C(e)?e===A||e==null||e===``?(this._$AH!==A&&this._$AR(),this._$AH=A):e!==this._$AH&&e!==k&&this._(e):e._$litType$===void 0?e.nodeType===void 0?fe(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==A&&C(this._$AH)?this._$AA.nextSibling.data=e:this.T(x.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=M.createElement(ye(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new xe(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=ve.get(e.strings);return t===void 0&&ve.set(e.strings,t=new M(e)),t}k(t){w(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(S()),this.O(S()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=le(e).nextSibling;le(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},F=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=A,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=A}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=N(this,e,t,0),a=!C(e)||e!==this._$AH&&e!==k,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=N(this,r[n+o],t,o),s===k&&(s=this._$AH[o]),a||(a=!C(s)||s!==this._$AH[o]),s===A?e=A:e!==A&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},Se=class extends F{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===A?void 0:e}},Ce=class extends F{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==A)}},we=class extends F{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=N(this,e,t,0)??A)===k)return;let n=this._$AH,r=e===A&&n!==A||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==A&&(n===A||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Te=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){N(this,e)}},Ee={M:v,P:y,A:b,C:1,L:be,R:xe,D:fe,V:N,I:P,H:F,N:Ce,U:we,B:Se,F:Te},De=g.litHtmlPolyfillSupport;De?.(M,P),(g.litHtmlVersions??(g.litHtmlVersions=[])).push(`3.3.3`);var Oe=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new P(t.insertBefore(S(),e),e,void 0,n??{})}return i._$AI(e),i},I=globalThis,L=class extends h{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Oe(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return k}};L._$litElement$=!0,L.finalized=!0,I.litElementHydrateSupport?.({LitElement:L});var ke=I.litElementPolyfillSupport;ke?.({LitElement:L}),(I.litElementVersions??(I.litElementVersions=[])).push(`4.2.2`);var R=`styled-stack-card-presets-updated`,Ae=`styled_stack_card/subscribe_presets`,je=`styled_stack_card_presets_updated`,Me=`styled_stack_card_manager`,Ne=`/local/styled-stack-card-presets/styled-stack-card-presets.js`,Pe=`styled-stack-card-presets-cache`,Fe=5e3,Ie=0,z;function Le(){return Ie}function B(e,t=!0){let n=e&&typeof e==`object`?e:{},r;try{r=JSON.stringify(n)}catch{return}if(window.StyledStackCustomPresets=n,r!==z){if(z=r,Ie++,t)try{localStorage.setItem(Pe,r)}catch{}window.dispatchEvent(new CustomEvent(R,{detail:n}))}}(()=>{if(window.StyledStackCustomPresets){try{z=JSON.stringify(window.StyledStackCustomPresets)}catch{}return}try{let e=localStorage.getItem(Pe);e&&(window.StyledStackCustomPresets=JSON.parse(e),z=e)}catch{}})();var V=null,Re=!1;function H(){return V||(V=new Promise(e=>{document.querySelectorAll(`script[data-styled-stack-presets]`).forEach(e=>e.remove());let t=document.createElement(`script`);t.src=`${Ne}?t=${Date.now()}`,t.dataset.styledStackPresets=``;let n=t=>{V=null,Re=!0,t&&window.StyledStackCustomPresets&&B(window.StyledStackCustomPresets),e()};t.onload=()=>n(!0),t.onerror=()=>n(!1),document.head.appendChild(t)}),V)}var U=0,W=null,G=null,K=null,q=null,J=null,Y,X=0,ze=0,Z,Be=0,Ve=3e4,He=2e3;function Ue(e){return!!e.config?.components?.includes(Me)}function We(e){let t=e.config?.state;return!t||t===`RUNNING`}var Ge=()=>{document.visibilityState===`visible`&&G&&Ue(G)&&H()},Ke=()=>{q!==`ws`&&q!==`pending`||!G||U===0||(K=null,q=null,Ye(G,!0))};function qe(){X++;let e=K;if(K=null,e)try{Promise.resolve(e()).catch(()=>void 0)}catch{}q===`visibility`&&document.removeEventListener(`visibilitychange`,Ge),W?.removeEventListener?.(`ready`,Ke),q=null,J=null,Z=void 0,W=null,G=null}async function Je(e,t,n){let r=e.connection;try{let e=await r.subscribeMessage(e=>B(e?.presets),{type:Ae},{resubscribe:!1});if(t!==X){Promise.resolve(e()).catch(()=>void 0);return}K=e,q=`ws`;return}catch(r){if(t!==X)return;if(r?.code!==`unknown_command`){ze=Date.now(),W?.removeEventListener?.(`ready`,Ke),W=null,q=null;return}if(n||!We(e)){q=`pending`,Z=e.config;return}}let i=Ue(e);if(i&&!Re&&H(),i&&e.user?.is_admin)try{let e=await r.subscribeEvents(e=>{e?.data?.presets?B(e.data.presets):H()},je);if(t!==X){Promise.resolve(e()).catch(()=>void 0);return}K=e,q=`events`;return}catch{if(t!==X)return}i?(document.addEventListener(`visibilitychange`,Ge),q=`visibility`):q=`none`}function Ye(e,t=!1){let n=++X;J=Je(e,n,t).finally(()=>{n===X&&(J=null)})}function Xe(e){if(e?.connection){if(W===e.connection&&(q!==null||J)){if(G=e,q===`pending`&&!J&&e.config!==Z){if(Date.now()-Be<He)return;Ue(e)||We(e)?(Be=Date.now(),q=null,Ye(e,!1)):Z=e.config}return}W&&W!==e.connection&&qe(),!(!W&&ze&&Date.now()-ze<Ve)&&(W=e.connection,G=e,W.addEventListener?.(`ready`,Ke),Ye(e,!1))}}function Q(e){U++,Y!==void 0&&(clearTimeout(Y),Y=void 0),Xe(e);let t=!1;return()=>{t||(t=!0,U=Math.max(0,U-1),U===0&&Y===void 0&&(Y=window.setTimeout(()=>{Y=void 0,U===0&&qe()},Fe)))}}function Ze(e){U>0&&Xe(e)}var Qe={spotify:`linear-gradient(135deg, rgba(17, 255, 0, 0.60) 0%, rgba(22, 119, 9, 0.60) 50%, rgba(0, 0, 0, 0.60) 100%)`,lights:`linear-gradient(135deg, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 0, 0.65) 50%, rgba(191, 99, 13, 0.65) 100%)`,water:`linear-gradient(135deg, rgba(0, 170, 255, 0.60) 0%, rgba(0, 119, 179, 0.80) 50%, rgba(255, 255, 255, 0.37) 100%)`,alert:`linear-gradient(135deg, rgba(255, 0, 0, 0.60) 0%, rgba(119, 9, 9, 0.60) 50%, rgba(46, 0, 0, 0.60) 100%)`};function $e(e){let t=e.color_start||`transparent`,n=e.color_end||`transparent`,r=e.angle??135;if(e.color_mid){let i=e.color_mid_pos??50;return`linear-gradient(${r}deg, ${t} 0%, ${e.color_mid} ${i}%, ${n} 100%)`}return`linear-gradient(${r}deg, ${t} 0%, ${n} 100%)`}function et(e){let t=e||{},n=t.preset||`custom`;if(Object.prototype.hasOwnProperty.call(Qe,n))return Qe[n];let r=window.StyledStackCustomPresets;return n!==`custom`&&r&&r[n]?$e(r[n]):$e(t)}var tt,nt;function rt(){return nt||(nt=window.loadCardHelpers().then(e=>(tt=e,e))),nt}function it(e,t){if(e===t)return!0;if(typeof e!=`object`||typeof t!=`object`||e===null||t===null||Array.isArray(e)!==Array.isArray(t))return!1;let n=Object.keys(e);return n.length===Object.keys(t).length&&n.every(n=>Object.prototype.hasOwnProperty.call(t,n)&&it(e[n],t[n]))}function at(e,t){return new Promise((n,r)=>{let i=setTimeout(()=>r(Error(`timeout`)),e);t.then(e=>{clearTimeout(i),n(e)},e=>{clearTimeout(i),r(e)})})}function ot(e){if(typeof e.getCardSize==`function`)try{return at(500,Promise.resolve(e.getCardSize())).catch(()=>1)}catch{return 1}return customElements.get(e.localName)?1:customElements.whenDefined(e.localName).then(()=>ot(e))}var st=class e extends L{constructor(...e){super(...e),this._cardConfigs=[],this._cardsReady=Promise.resolve(),this._onPresetsUpdated=()=>{let e=this._config?.style_config?.preset;e&&e!==`custom`&&this.requestUpdate()}}static get properties(){return{_config:{state:!0},_cards:{state:!0}}}static async getConfigElement(){return await e.ensureHaEditorElements(),document.createElement(`styled-stack-card-editor`)}static async ensureHaEditorElements(){if(customElements.get(`hui-card-picker`)&&customElements.get(`hui-card-element-editor`))return;(await rt()).createCardElement({type:`vertical-stack`,cards:[]}),await customElements.whenDefined(`hui-vertical-stack-card`);let e=customElements.get(`hui-vertical-stack-card`);e?.getConfigElement&&await e.getConfigElement(),await customElements.whenDefined(`hui-card-picker`),await customElements.whenDefined(`hui-card-element-editor`)}static getStubConfig(){return{style_config:{preset:`spotify`},cards:[]}}set hass(e){if(this._hass=e,this._cards)for(let t of this._cards)t.hass=e;e&&this.isConnected&&(this._releasePresets?Ze(e):this._releasePresets=Q(e))}get hass(){return this._hass}setConfig(e){if(!e)throw Error(`Invalid configuration`);this._config=e;let t=Array.isArray(e.cards)?e.cards:[];if(tt){this._buildCards(t);return}this._resolveCardsReady||(this._cardsReady=new Promise(e=>this._resolveCardsReady=e)),rt().then(()=>{this._config===e&&this._buildCards(t)})}async getCardSize(){return await this._cardsReady,this._config?!this._cards||this._cards.length===0?1:(await Promise.all(this._cards.map(e=>ot(e)))).reduce((e,t)=>e+t,0):0}getGridOptions(){return{columns:12,min_columns:3,rows:`auto`}}getLayoutOptions(){return{grid_columns:4,grid_min_columns:1,grid_rows:`auto`}}connectedCallback(){super.connectedCallback(),window.addEventListener(R,this._onPresetsUpdated),this.hasUpdated&&this._backgroundStale()&&this.requestUpdate(),this._hass&&!this._releasePresets&&(this._releasePresets=Q(this._hass))}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener(R,this._onPresetsUpdated),this._releasePresets?.(),this._releasePresets=void 0}_createCard(e){let t=tt.createCardElement(e);return this._hass&&(t.hass=this._hass),t.addEventListener(`ll-rebuild`,n=>{n.stopPropagation(),this._rebuildCard(t,e)},{once:!0}),t.addEventListener(`ll-upgrade`,e=>{e.stopPropagation(),this._hass&&(t.hass=this._hass)},{once:!0}),t}_buildCards(e){let t=this._cards||[],n=this._cardConfigs;this._cards=e.map((e,r)=>t[r]&&it(n[r],e)?t[r]:this._createCard(e)),this._cardConfigs=e,this._resolveCardsReady&&(this._resolveCardsReady(),this._resolveCardsReady=void 0)}_rebuildCard(e,t){if(!this._cards)return;let n=this._cards.indexOf(e);if(n===-1)return;let r=[...this._cards];r[n]=this._createCard(t),this._cards=r}_backgroundStale(){let e=this._gradientCache;return!e||e.version!==Le()||e.presets!==window.StyledStackCustomPresets}_background(){let e=this._config?.style_config,t=Le(),n=window.StyledStackCustomPresets,r=this._gradientCache;if(r&&r.style===e&&r.version===t&&r.presets===n)return r.value;let i=et(e);return this._gradientCache={style:e,version:t,presets:n,value:i},i}render(){return this._config?this._cards?this._cards.length===0?O`
        <ha-card style="background: ${this._background()};">
          <div class="card-content" style="padding: 16px; text-align: center;">
            <p>⚙️ <b>Styled Stack Card:</b> Añade tarjetas en el código YAML o configura las opciones.</p>
          </div>
        </ha-card>
      `:O`
      <ha-card style="background: ${this._background()}; border: none;">
        <div class="card-content">
          ${this._cards}
        </div>
      </ha-card>
    `:O`
        <ha-card style="background: ${this._background()}; border: none;">
          <div class="card-content"></div>
        </ha-card>
      `:A}static get styles(){return o`
      :host {
        display: block;
      }
      ha-card {
        overflow: hidden;
      }
      .card-content {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 0;
        --ha-card-background: none !important;
        --card-background-color: transparent !important;
      }
    `}},$={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ct=e=>(...t)=>({_$litDirective$:e,values:t}),lt=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}},{I:ut}=Ee,dt=e=>e.strings===void 0,ft={},pt=(e,t=ft)=>e._$AH=t,mt=ct(class extends lt{constructor(){super(...arguments),this.key=A}render(e,t){return this.key=e,t}update(e,[t,n]){return t!==this.key&&(pt(e),this.key=t),n}}),ht=ct(class extends lt{constructor(e){if(super(e),e.type!==$.PROPERTY&&e.type!==$.ATTRIBUTE&&e.type!==$.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!dt(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===k||t===A)return t;let n=e.element,r=e.name;if(e.type===$.PROPERTY){if(t===n[r])return k}else if(e.type===$.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return k}else if(e.type===$.ATTRIBUTE&&n.getAttribute(r)===t+``)return k;return pt(e),t}});function gt(){let e=document.querySelector(`home-assistant`);if(e=e&&e.shadowRoot,e=e&&e.querySelector(`home-assistant-main`),e=e&&e.shadowRoot,e=e&&e.querySelector(`app-drawer-layout partial-panel-resolver, ha-drawer partial-panel-resolver`),e=e&&e.shadowRoot||e,e=e&&e.querySelector(`ha-panel-lovelace`),e=e&&e.shadowRoot,e=e&&e.querySelector(`hui-root`),e){let t=e.lovelace;return t.current_view=e.___curView,t}return null}function _t(e,t){if(e===t)return!0;if(typeof e!=`object`||typeof t!=`object`||e===null||t===null||Array.isArray(e)!==Array.isArray(t))return!1;let n=Object.keys(e);return n.length===Object.keys(t).length&&n.every(n=>Object.prototype.hasOwnProperty.call(t,n)&&_t(e[n],t[n]))}var vt=`dashboardCardClipboard`,yt=`M19,21H8V7H19M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z`,bt=`M19,3H14.82C14.4,1.84 13.3,1 12,1A3,3 0 0,0 9,3H4A2,2 0 0,0 2,5V19A2,2 0 0,0 4,21H9A3,3 0 0,0 12,23A3,3 0 0,0 15,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3Z`,xt=`M19,20H5V4H7V7H17V4H19M12,2A1,1 0 0,1 13,3A1,1 0 0,1 12,4A1,1 0 0,1 11,3A1,1 0 0,1 12,2M19,2H14.82C14.4,0.84 13.3,0 12,0C10.7,0 9.6,0.84 9.18,2H5A2,2 0 0,0 3,4V20A2,2 0 0,0 5,22H19A2,2 0 0,0 21,20V4A2,2 0 0,0 19,2Z`,St=`M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z`,Ct=`M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z`,wt=`M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z`,Tt=`M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z`,Et=class extends L{constructor(...e){super(...e),this._selectedCard=0,this._keys=new Map,this._cardsGeneration=0,this._onPresetsUpdated=()=>{this.requestUpdate()},this._computePresetLabel=e=>e.name===`preset`?`Tema visual`:e.name,this._computeAngleLabel=e=>e.name===`angle`?`Ángulo del degradado`:e.name}static get properties(){return{hass:{attribute:!1},lovelace:{attribute:!1},_config:{state:!0},_selectedCard:{state:!0}}}set hass(e){this._hass=e,e&&this.isConnected&&(this._releasePresets?Ze(e):this._releasePresets=Q(e))}get hass(){return this._hass}connectedCallback(){super.connectedCallback(),window.addEventListener(R,this._onPresetsUpdated),this._hass&&!this._releasePresets&&(this._releasePresets=Q(this._hass))}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener(R,this._onPresetsUpdated),this._releasePresets?.(),this._releasePresets=void 0}set lovelace(e){this._lovelace=e}get _effectiveLovelace(){return this._lovelace??gt()}setConfig(e){let t=this._config?.cards?.length;this._config=e??{type:`styled-stack-card`,cards:[]};let n=this._config.cards?.length??0;t!==void 0&&t!==n&&this._structureChanged(),this._selectedCard>n&&(this._selectedCard=n)}async firstUpdated(){await st.ensureHaEditorElements()}_structureChanged(){this._keys.clear(),this._cardsGeneration++}_getKey(e){let t=`${e}-${this._config.cards?.length??0}`;return this._keys.has(t)||this._keys.set(t,Math.random().toString()),this._keys.get(t)}_updateConfig(e){this._config=e,this.dispatchEvent(new CustomEvent(`config-changed`,{detail:{config:e},bubbles:!0,composed:!0}))}_parseRgbaString(e){let t=e.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/);if(t){let e=parseInt(t[1],10),n=parseInt(t[2],10),r=parseInt(t[3],10),i=t[4]===void 0?1:parseFloat(t[4]);return{rgb:[e,n,r],alpha:Math.round(i*100)}}return{rgb:[128,128,128],alpha:100}}_rgbToRgbaString(e,t){let n=(t/100).toFixed(2);return`rgba(${e[0]}, ${e[1]}, ${e[2]}, ${n})`}_getStyleData(){let e=this._config.style_config||{},t=this._parseRgbaString(e.color_start||`rgba(128,128,128,0.25)`),n=this._parseRgbaString(e.color_end||`rgba(30,30,30,0)`),r=e.color_mid!==void 0&&e.color_mid!==null,i=r?this._parseRgbaString(e.color_mid):{rgb:[128,128,128],alpha:50};return{preset:e.preset||`custom`,color_start_rgb:t.rgb,color_start_alpha:t.alpha,color_end_rgb:n.rgb,color_end_alpha:n.alpha,has_mid:r,color_mid_rgb:i.rgb,color_mid_alpha:i.alpha,color_mid_pos:e.color_mid_pos??50,angle:Number(e.angle??135)}}_getPresetOptions(){let e=[{value:`custom`,label:`Colores manuales`},{value:`spotify`,label:`Spotify`},{value:`lights`,label:`Luces`},{value:`water`,label:`Agua / Baño`},{value:`alert`,label:`Alerta`}],t=window.StyledStackCustomPresets;return t&&typeof t==`object`&&Object.keys(t).forEach(t=>{e.some(e=>e.value===t)||e.push({value:t,label:`✨ ${t}`})}),e}_presetSchema(){return[{name:`preset`,selector:{select:{mode:`dropdown`,options:this._getPresetOptions()}}}]}_angleSchema(){return[{name:`angle`,selector:{number:{min:0,max:360,step:1,unit_of_measurement:`°`}}}]}_handlePresetChanged(e){e.stopPropagation();let t=e.detail.value.preset,n=this._config.style_config||{};this._updateConfig({...this._config,style_config:{...n,preset:t}})}_handleAngleChanged(e){e.stopPropagation();let t=e.detail.value.angle,n=this._config.style_config||{};this._updateConfig({...this._config,style_config:{...n,angle:t}})}_handleColorChange(e,t,n){let r=this._config.style_config||{};this._updateConfig({...this._config,style_config:{...r,[e]:this._rgbToRgbaString(t,n)}})}_handleColorRgbChanged(e,t){e.stopPropagation();let n=this._getStyleData(),r=e.detail.value,i=t===`color_start`?n.color_start_alpha:t===`color_mid`?n.color_mid_alpha:n.color_end_alpha;this._handleColorChange(t,r,i)}_handleAlphaChanged(e,t){let n=e.target,r=parseInt(n.value,10),i=this._getStyleData(),a=t===`color_start`?i.color_start_rgb:t===`color_mid`?i.color_mid_rgb:i.color_end_rgb;this._handleColorChange(t,a,r)}_handleMidPosChanged(e){let t=e.target,n=parseInt(t.value,10),r=this._config.style_config||{};this._updateConfig({...this._config,style_config:{...r,color_mid_pos:n}})}_toggleMidColor(){let e=this._config.style_config||{};if(e.color_mid!==void 0){let{color_mid:t,color_mid_pos:n,...r}=e;this._updateConfig({...this._config,style_config:r})}else this._updateConfig({...this._config,style_config:{...e,color_mid:`rgba(128, 128, 128, 0.15)`,color_mid_pos:50}})}_renderColorRow(e,t,n,r,i){let a=`rgb(${n[0]}, ${n[1]}, ${n[2]})`,o=`rgba(${n[0]}, ${n[1]}, ${n[2]}, ${(r/100).toFixed(2)})`,s=`linear-gradient(to right, transparent, ${a})`;return O`
      <div class="color-row">
        <div class="color-row-header">
          <span class="color-row-label">${e}</span>
          <div class="color-row-header-right">
            ${i?.removable?O`
              <button class="btn-remove-mid" @click=${this._toggleMidColor} title="Eliminar color medio">
                ✕
              </button>
            `:A}
            <div class="color-swatch-wrap">
              <div class="checker-bg"></div>
              <div class="color-swatch" style="background:${o}"></div>
            </div>
          </div>
        </div>
        <div class="color-row-body">
          <ha-selector
            .hass=${this._hass}
            .selector=${{color_rgb:{}}}
            .value=${n}
            @value-changed=${e=>this._handleColorRgbChanged(e,t)}
          ></ha-selector>
          <div class="alpha-row">
            <span class="alpha-label">Opacidad</span>
            <div class="alpha-slider-wrap">
              <div class="alpha-track" style="--alpha-gradient:${s}"></div>
              <input
                type="range"
                class="alpha-slider"
                min="0"
                max="100"
                step="1"
                .value=${String(r)}
                @input=${e=>this._handleAlphaChanged(e,t)}
                @change=${e=>this._handleAlphaChanged(e,t)}
              />
            </div>
            <span class="alpha-value">${r}%</span>
          </div>
          ${i?.midPos===void 0?A:O`
            <div class="alpha-row">
              <span class="alpha-label">Posición</span>
              <div class="alpha-slider-wrap">
                <div class="alpha-track" style="--alpha-gradient:linear-gradient(to right, var(--divider-color), var(--primary-color))"></div>
                <input
                  type="range"
                  class="alpha-slider"
                  min="1"
                  max="99"
                  step="1"
                  .value=${String(i.midPos)}
                  @input=${this._handleMidPosChanged}
                  @change=${this._handleMidPosChanged}
                />
              </div>
              <span class="alpha-value">${i.midPos}%</span>
            </div>
          `}
        </div>
      </div>
    `}_handleSelectedCard(e){if(e.stopPropagation(),e.target!==e.currentTarget)return;let t=parseInt(e.detail?.name,10),n=this._config?.cards?.length??0;Number.isNaN(t)||t<0||t>n||t!==this._selectedCard&&(this._selectedCard=t)}_stopTabEvent(e){e.stopPropagation()}_handleCardPicked(e){e.stopPropagation();let t=e.detail?.config;if(!t)return;let n=[...this._config.cards||[],t];this._structureChanged(),this._updateConfig({...this._config,cards:n}),this._selectedCard=n.length-1}_handleCardConfigChanged(e,t,n){if(e.stopPropagation(),!this._config.cards||n!==this._cardsGeneration||t<0||t>=this._config.cards.length)return;let r=e.detail?.config;if(!r||_t(r,this._config.cards[t]))return;let i=[...this._config.cards];i[t]=r,this._updateConfig({...this._config,cards:i})}_handleGUIModeChanged(e){e.stopPropagation()}_getClipboardCard(){try{let e=sessionStorage.getItem(vt);return e?JSON.parse(e):null}catch{return null}}_copyCardToClipboard(e){sessionStorage.setItem(vt,JSON.stringify(e)),this._showToast(this._hass?.localize?.(`ui.common.copied`)??`Copiado`),this.requestUpdate()}_handlePasteCard(){let e=this._getClipboardCard();if(!e)return;let t=[...this._config.cards||[],e];this._structureChanged(),this._updateConfig({...this._config,cards:t}),this._selectedCard=t.length-1,this._showToast(this._hass?.localize?.(`ui.common.pasted`)??`Pegado`)}_showToast(e){this.dispatchEvent(new CustomEvent(`hass-notification`,{detail:{message:e},bubbles:!0,composed:!0}))}_handleCopyCard(){this._config.cards?.[this._selectedCard]&&this._copyCardToClipboard(JSON.parse(JSON.stringify(this._config.cards[this._selectedCard])))}_handleCutCard(){this._config.cards&&(this._handleCopyCard(),this._handleDeleteCard())}_handleDeleteCard(){if(!this._config.cards)return;let e=[...this._config.cards];e.splice(this._selectedCard,1),this._structureChanged(),this._updateConfig({...this._config,cards:e}),this._selectedCard=Math.max(0,this._selectedCard-1)}_handleMove(e){if(!this._config.cards)return;let t=this._selectedCard+e;if(t<0||t>=this._config.cards.length)return;let n=[...this._config.cards],[r]=n.splice(this._selectedCard,1);n.splice(t,0,r),this._structureChanged(),this._updateConfig({...this._config,cards:n}),this._selectedCard=t}_cardConfigChangedHandler(e){let t=this._cardsGeneration;return n=>this._handleCardConfigChanged(n,e,t)}render(){if(!this._config||!this._hass)return A;let e=this._getStyleData(),t=e.preset,n=this._config.cards||[],r=this._selectedCard,i=n.length,a=r>=i,o=this._getClipboardCard()!==null,s=et(this._config?.style_config);return O`
      <div class="card-config">

        <!-- SELECTOR DE PRESET -->
        <ha-form
          .hass=${this._hass}
          .data=${{preset:t}}
          .schema=${this._presetSchema()}
          .computeLabel=${this._computePresetLabel}
          @value-changed=${this._handlePresetChanged}
        ></ha-form>

        <!-- Preview del degradado para presets no manuales -->
        ${t===`custom`?A:O`
          <div class="gradient-preview-wrap" style="margin-bottom: 16px;">
            <div class="gradient-preview" style="background:${s}"></div>
            <div class="gradient-preview-label">Vista previa del tema "${t}"</div>
          </div>
        `}

        <!-- SECCIÓN DE COLORES MANUALES -->
        ${t===`custom`?O`
          <div class="gradient-section">

            <div class="gradient-preview-wrap">
              <div class="gradient-preview" style="background:${s}"></div>
              <div class="gradient-preview-label">Vista previa del degradado</div>
            </div>

            ${this._renderColorRow(`Color superior`,`color_start`,e.color_start_rgb,e.color_start_alpha)}

            <!-- Color medio (opcional) -->
            ${e.has_mid?this._renderColorRow(`Color medio`,`color_mid`,e.color_mid_rgb,e.color_mid_alpha,{removable:!0,midPos:e.color_mid_pos}):O`
                <button class="btn-add-mid" @click=${this._toggleMidColor}>
                  <span class="btn-add-mid-icon">+</span>
                  Añadir color intermedio
                </button>
              `}

            ${this._renderColorRow(`Color inferior`,`color_end`,e.color_end_rgb,e.color_end_alpha)}

            <ha-form
              .hass=${this._hass}
              .data=${{angle:e.angle}}
              .schema=${this._angleSchema()}
              .computeLabel=${this._computeAngleLabel}
              @value-changed=${this._handleAngleChanged}
            ></ha-form>
          </div>
        `:A}

        <!-- BARRA DE PESTAÑAS Y NAVEGACIÓN -->
        <div class="toolbar">
          <ha-tab-group
            @wa-tab-show=${this._handleSelectedCard}
            @wa-tab-hide=${this._stopTabEvent}
          >
            ${n.map((e,t)=>O`
                <ha-tab-group-tab slot="nav" .panel=${String(t)} .active=${ht(r===t)}>
                  ${t+1}
                </ha-tab-group-tab>
              `)}
            <ha-tab-group-tab slot="nav" .panel=${String(i)} .active=${ht(a)}>
              <ha-svg-icon .path=${Ct}></ha-svg-icon>
            </ha-tab-group-tab>
          </ha-tab-group>
        </div>

        <!-- CONTENIDO DEL EDITOR -->
        ${a?O`
              <div id="editor">
                ${o?O`
                      <div class="paste-bar">
                        <button class="btn-paste" @click=${this._handlePasteCard}>
                          <ha-icon .path=${xt}></ha-icon>
                          Pegar tarjeta del portapapeles
                        </button>
                      </div>
                    `:A}
                <hui-card-picker
                  .hass=${this._hass}
                  .lovelace=${this._effectiveLovelace}
                  @config-changed=${this._handleCardPicked}
                ></hui-card-picker>
              </div>
            `:i>0?O`
                <div id="card-options">
                  <ha-icon-button
                    .path=${wt}
                    .label=${`Mover a la izquierda`}
                    .disabled=${r===0}
                    @click=${()=>this._handleMove(-1)}
                  ></ha-icon-button>
                  <ha-icon-button
                    .path=${Tt}
                    .label=${`Mover a la derecha`}
                    .disabled=${r>=i-1}
                    @click=${()=>this._handleMove(1)}
                  ></ha-icon-button>
                  <ha-icon-button
                    .path=${yt}
                    .label=${this._hass.localize?.(`ui.common.copy`)??`Copiar`}
                    @click=${this._handleCopyCard}
                  ></ha-icon-button>
                  <ha-icon-button
                    .path=${bt}
                    .label=${this._hass.localize?.(`ui.common.cut`)??`Cortar`}
                    @click=${this._handleCutCard}
                  ></ha-icon-button>
                  <ha-icon-button
                    .path=${St}
                    .label=${this._hass.localize?.(`ui.common.delete`)??`Eliminar`}
                    @click=${this._handleDeleteCard}
                  ></ha-icon-button>
                </div>

                <div id="editor">
                  ${mt(this._getKey(r),O`<hui-card-element-editor
                      .hass=${this._hass}
                      .lovelace=${this._effectiveLovelace}
                      .value=${n[r]}
                      @config-changed=${this._cardConfigChangedHandler(r)}
                      @GUImode-changed=${this._handleGUIModeChanged}
                    ></hui-card-element-editor>`)}
                </div>
              `:A}
      </div>
    `}static get styles(){return[o`
        .card-config {
          overflow: auto;
        }

        ha-form {
          display: block;
        }

        /* ── Sección de colores manuales ── */
        .gradient-section {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 2px;
          margin-bottom: 16px;
        }

        /* Barra de preview del degradado */
        .gradient-preview-wrap {
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid var(--divider-color);
        }
        .gradient-preview {
          height: 56px;
          width: 100%;
          transition: background 0.35s ease;
        }
        .gradient-preview-label {
          font-size: 0.72em;
          color: var(--secondary-text-color);
          text-align: center;
          padding: 4px 0;
          background: var(--secondary-background-color);
          letter-spacing: 0.03em;
        }

        /* ── Fila de color ── */
        .color-row {
          background: var(--secondary-background-color);
          border: 1px solid var(--divider-color);
          border-radius: 10px;
          overflow: hidden;
        }
        .color-row-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px 8px;
          border-bottom: 1px solid var(--divider-color);
        }
        .color-row-label {
          font-size: 0.85em;
          font-weight: 600;
          color: var(--primary-text-color);
          letter-spacing: 0.02em;
        }
        .color-row-header-right {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        /* Botón quitar color medio */
        .btn-remove-mid {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: 1.5px solid var(--error-color, #f44336);
          background: transparent;
          color: var(--error-color, #f44336);
          font-size: 0.8em;
          cursor: pointer;
          padding: 0;
          line-height: 1;
          transition: background 0.15s ease, color 0.15s ease;
        }
        .btn-remove-mid:hover {
          background: var(--error-color, #f44336);
          color: #fff;
        }
        /* Botón añadir color intermedio */
        .btn-add-mid {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          background: transparent;
          border: 1.5px dashed var(--divider-color);
          border-radius: 10px;
          padding: 10px 14px;
          color: var(--secondary-text-color);
          font-size: 0.85em;
          cursor: pointer;
          transition: border-color 0.15s ease, color 0.15s ease, background 0.15s ease;
        }
        .btn-add-mid:hover {
          border-color: var(--primary-color);
          color: var(--primary-color);
          background: color-mix(in srgb, var(--primary-color) 6%, transparent);
        }
        .btn-add-mid-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 1.5px solid currentColor;
          font-size: 1.1em;
          line-height: 1;
          flex-shrink: 0;
        }

        /* Swatch circular con patrón de ajedrez para transparencia */
        .color-swatch-wrap {
          position: relative;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid var(--divider-color);
          flex-shrink: 0;
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
        }
        .checker-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(45deg, #aaa 25%, transparent 25%),
            linear-gradient(-45deg, #aaa 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #aaa 75%),
            linear-gradient(-45deg, transparent 75%, #aaa 75%);
          background-color: #fff;
          background-size: 7px 7px;
          background-position: 0 0, 0 3.5px, 3.5px -3.5px, -3.5px 0;
        }
        .color-swatch {
          position: absolute;
          inset: 0;
          transition: background 0.2s ease;
        }

        .color-row-body {
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        ha-selector {
          display: block;
        }

        /* ── Slider de opacidad ── */
        .alpha-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .alpha-label {
          font-size: 0.78em;
          color: var(--secondary-text-color);
          white-space: nowrap;
          min-width: 54px;
        }
        .alpha-slider-wrap {
          position: relative;
          flex: 1;
          height: 20px;
          display: flex;
          align-items: center;
        }
        /* Pista: checker base + overlay con el gradiente de color */
        .alpha-track {
          position: absolute;
          left: 0;
          right: 0;
          height: 8px;
          border-radius: 4px;
          pointer-events: none;
          /* checker base */
          background-image:
            linear-gradient(45deg, #bbb 25%, transparent 25%),
            linear-gradient(-45deg, #bbb 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #bbb 75%),
            linear-gradient(-45deg, transparent 75%, #bbb 75%),
            var(--alpha-gradient, linear-gradient(to right, transparent, grey));
          background-color: #fff;
          background-size: 8px 8px, 8px 8px, 8px 8px, 8px 8px, 100% 100%;
          background-position: 0 0, 0 4px, 4px -4px, -4px 0, 0 0;
        }
        .alpha-slider {
          position: relative;
          width: 100%;
          height: 8px;
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          cursor: pointer;
          z-index: 1;
        }
        .alpha-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--card-background-color, #fff);
          border: 2.5px solid var(--primary-color);
          box-shadow: 0 1px 5px rgba(0,0,0,0.28);
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .alpha-slider::-webkit-slider-thumb:hover {
          transform: scale(1.18);
          box-shadow: 0 2px 9px rgba(0,0,0,0.32);
        }
        .alpha-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--card-background-color, #fff);
          border: 2.5px solid var(--primary-color);
          box-shadow: 0 1px 5px rgba(0,0,0,0.28);
          cursor: pointer;
        }
        .alpha-value {
          font-size: 0.8em;
          font-weight: 600;
          color: var(--primary-text-color);
          min-width: 34px;
          text-align: right;
        }

        /* ── Toolbar y editor de tarjetas ── */
        .toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          margin-top: 4px;
        }
        ha-tab-group {
          flex-grow: 1;
          min-width: 0;
          --ha-tab-track-color: var(--card-background-color);
        }
        #card-options {
          display: flex;
          justify-content: flex-end;
          width: 100%;
          gap: 4px;
          margin-bottom: 8px;
        }
        #editor {
          border: 1px solid var(--divider-color);
          border-radius: 8px;
          padding: 12px;
          background: var(--secondary-background-color);
        }
        .paste-bar {
          display: flex;
          justify-content: center;
          margin-bottom: 12px;
        }
        .btn-paste {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--primary-color);
          color: var(--text-primary-color, #fff);
          border: none;
          border-radius: 4px;
          padding: 8px 16px;
          font-weight: bold;
          cursor: pointer;
        }
        .btn-paste:hover {
          opacity: 0.9;
        }
        @media (max-width: 450px) {
          #editor {
            margin: 0 -12px;
          }
        }
      `]}};customElements.get(`styled-stack-card`)||customElements.define(`styled-stack-card`,st),customElements.get(`styled-stack-card-editor`)||customElements.define(`styled-stack-card-editor`,Et),window.customCards=window.customCards||[],window.customCards.some(e=>e.type===`styled-stack-card`)||window.customCards.push({type:`styled-stack-card`,name:`Styled Stack Card`,preview:!0,description:`Un contenedor personalizado con degradados y temas visuales para tus tarjetas.`}),console.info(`%c STYLED-STACK-CARD %c Cargada correctamente `,`color: white; background: #1db954; font-weight: 700;`,`color: black; background: #f3f3f3; font-weight: 700;`);