var rt=Object.defineProperty,it=Object.defineProperties;var nt=Object.getOwnPropertyDescriptors;var O=Object.getOwnPropertySymbols;var Y=Object.prototype.hasOwnProperty,G=Object.prototype.propertyIsEnumerable;var J=(a,t,e)=>t in a?rt(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e,k=(a,t)=>{for(var e in t||(t={}))Y.call(t,e)&&J(a,e,t[e]);if(O)for(var e of O(t))G.call(t,e)&&J(a,e,t[e]);return a},X=(a,t)=>it(a,nt(t));var F=(a,t)=>{var e={};for(var s in a)Y.call(a,s)&&t.indexOf(s)<0&&(e[s]=a[s]);if(a!=null&&O)for(var s of O(a))t.indexOf(s)<0&&G.call(a,s)&&(e[s]=a[s]);return e};import{S as ot,i as at,s as lt,e as ct,c as ut,a as ft,d as E,b as C,f as R,t as ht,g as dt,h as pt,j as S,k as _t,l as y,m as D,n as mt,o as q,p as N,q as B,r as b,u as j,v as g,w as U,x as gt,y as wt,z as yt,A as z,B as x,C as K}from"./chunks/vendor-24f10c49.js";var Ct="#svelte-announcer.svelte-1j55zn5{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}";function H(a){let t,e,s;const i=[a[2]||{}];var o=a[0][1];function n(r){let l={$$slots:{default:[bt]},$$scope:{ctx:r}};for(let c=0;c<i.length;c+=1)l=z(l,i[c]);return{props:l}}return o&&(t=new o(n(a))),{c(){t&&S(t.$$.fragment),e=y()},l(r){t&&D(t.$$.fragment,r),e=y()},m(r,l){t&&q(t,r,l),R(r,e,l),s=!0},p(r,l){const c=l&4?N(i,[B(r[2]||{})]):{};if(l&521&&(c.$$scope={dirty:l,ctx:r}),o!==(o=r[0][1])){if(t){x();const u=t;b(u.$$.fragment,1,0,()=>{U(u,1)}),j()}o?(t=new o(n(r)),S(t.$$.fragment),g(t.$$.fragment,1),q(t,e.parentNode,e)):t=null}else o&&t.$set(c)},i(r){s||(t&&g(t.$$.fragment,r),s=!0)},o(r){t&&b(t.$$.fragment,r),s=!1},d(r){r&&E(e),t&&U(t,r)}}}function Q(a){let t,e,s;const i=[a[3]||{}];var o=a[0][2];function n(r){let l={};for(let c=0;c<i.length;c+=1)l=z(l,i[c]);return{props:l}}return o&&(t=new o(n())),{c(){t&&S(t.$$.fragment),e=y()},l(r){t&&D(t.$$.fragment,r),e=y()},m(r,l){t&&q(t,r,l),R(r,e,l),s=!0},p(r,l){const c=l&8?N(i,[B(r[3]||{})]):{};if(o!==(o=r[0][2])){if(t){x();const u=t;b(u.$$.fragment,1,0,()=>{U(u,1)}),j()}o?(t=new o(n()),S(t.$$.fragment),g(t.$$.fragment,1),q(t,e.parentNode,e)):t=null}else o&&t.$set(c)},i(r){s||(t&&g(t.$$.fragment,r),s=!0)},o(r){t&&b(t.$$.fragment,r),s=!1},d(r){r&&E(e),t&&U(t,r)}}}function bt(a){let t,e,s=a[0][2]&&Q(a);return{c(){s&&s.c(),t=y()},l(i){s&&s.l(i),t=y()},m(i,o){s&&s.m(i,o),R(i,t,o),e=!0},p(i,o){i[0][2]?s?(s.p(i,o),o&1&&g(s,1)):(s=Q(i),s.c(),g(s,1),s.m(t.parentNode,t)):s&&(x(),b(s,1,1,()=>{s=null}),j())},i(i){e||(g(s),e=!0)},o(i){b(s),e=!1},d(i){s&&s.d(i),i&&E(t)}}}function vt(a){let t,e,s=a[0][1]&&H(a);return{c(){s&&s.c(),t=y()},l(i){s&&s.l(i),t=y()},m(i,o){s&&s.m(i,o),R(i,t,o),e=!0},p(i,o){i[0][1]?s?(s.p(i,o),o&1&&g(s,1)):(s=H(i),s.c(),g(s,1),s.m(t.parentNode,t)):s&&(x(),b(s,1,1,()=>{s=null}),j())},i(i){e||(g(s),e=!0)},o(i){b(s),e=!1},d(i){s&&s.d(i),i&&E(t)}}}function Z(a){let t,e=a[5]&&tt(a);return{c(){t=ct("div"),e&&e.c(),this.h()},l(s){t=ut(s,"DIV",{id:!0,"aria-live":!0,"aria-atomic":!0,class:!0});var i=ft(t);e&&e.l(i),i.forEach(E),this.h()},h(){C(t,"id","svelte-announcer"),C(t,"aria-live","assertive"),C(t,"aria-atomic","true"),C(t,"class","svelte-1j55zn5")},m(s,i){R(s,t,i),e&&e.m(t,null)},p(s,i){s[5]?e?e.p(s,i):(e=tt(s),e.c(),e.m(t,null)):e&&(e.d(1),e=null)},d(s){s&&E(t),e&&e.d()}}}function tt(a){let t;return{c(){t=ht(a[6])},l(e){t=dt(e,a[6])},m(e,s){R(e,t,s)},p(e,s){s&64&&pt(t,e[6])},d(e){e&&E(t)}}}function Et(a){let t,e,s,i;const o=[a[1]||{}];var n=a[0][0];function r(c){let u={$$slots:{default:[vt]},$$scope:{ctx:c}};for(let h=0;h<o.length;h+=1)u=z(u,o[h]);return{props:u}}n&&(t=new n(r(a)));let l=a[4]&&Z(a);return{c(){t&&S(t.$$.fragment),e=_t(),l&&l.c(),s=y()},l(c){t&&D(t.$$.fragment,c),e=mt(c),l&&l.l(c),s=y()},m(c,u){t&&q(t,c,u),R(c,e,u),l&&l.m(c,u),R(c,s,u),i=!0},p(c,[u]){const h=u&2?N(o,[B(c[1]||{})]):{};if(u&525&&(h.$$scope={dirty:u,ctx:c}),n!==(n=c[0][0])){if(t){x();const f=t;b(f.$$.fragment,1,0,()=>{U(f,1)}),j()}n?(t=new n(r(c)),S(t.$$.fragment),g(t.$$.fragment,1),q(t,e.parentNode,e)):t=null}else n&&t.$set(h);c[4]?l?l.p(c,u):(l=Z(c),l.c(),l.m(s.parentNode,s)):l&&(l.d(1),l=null)},i(c){i||(t&&g(t.$$.fragment,c),i=!0)},o(c){t&&b(t.$$.fragment,c),i=!1},d(c){t&&U(t,c),c&&E(e),l&&l.d(c),c&&E(s)}}}function kt(a,t,e){let{stores:s}=t,{page:i}=t,{components:o}=t,{props_0:n=null}=t,{props_1:r=null}=t,{props_2:l=null}=t;gt("__svelte__",s),wt(s.page.notify);let c=!1,u=!1,h=null;return yt(()=>{const f=s.page.subscribe(()=>{c&&(e(5,u=!0),e(6,h=document.title||"untitled page"))});return e(4,c=!0),f}),a.$$set=f=>{"stores"in f&&e(7,s=f.stores),"page"in f&&e(8,i=f.page),"components"in f&&e(0,o=f.components),"props_0"in f&&e(1,n=f.props_0),"props_1"in f&&e(2,r=f.props_1),"props_2"in f&&e(3,l=f.props_2)},a.$$.update=()=>{a.$$.dirty&384&&s.page.set(i)},[o,n,r,l,c,u,h,s,i]}class Rt extends ot{constructor(t){super();at(this,t,kt,Et,lt,{stores:7,page:8,components:0,props_0:1,props_1:2,props_2:3})}}let W;const et={},$=function(t,e){if(!e)return t();if(W===void 0){const s=document.createElement("link").relList;W=s&&s.supports&&s.supports("modulepreload")?"modulepreload":"preload"}return Promise.all(e.map(s=>{if(s in et)return;et[s]=!0;const i=s.endsWith(".css"),o=i?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${s}"]${o}`))return;const n=document.createElement("link");if(n.rel=i?"stylesheet":W,i||(n.as="script",n.crossOrigin=""),n.href=s,document.head.appendChild(n),i)return new Promise((r,l)=>{n.addEventListener("load",r),n.addEventListener("error",l)})})).then(()=>t())},d=[()=>$(()=>import("./pages/__layout.svelte-49974530.js"),["/_app/pages/__layout.svelte-49974530.js","/_app/assets/pages/__layout.svelte-7ad9140d.css","/_app/chunks/vendor-24f10c49.js"]),()=>$(()=>import("./error.svelte-14967739.js"),["/_app/error.svelte-14967739.js","/_app/chunks/vendor-24f10c49.js"]),()=>$(()=>import("./pages/index.svelte-e597ed3b.js"),["/_app/pages/index.svelte-e597ed3b.js","/_app/assets/pages/index.svelte-eed6f812.css","/_app/chunks/vendor-24f10c49.js"]),()=>$(()=>import("./pages/posts/better-pooled-coronavirus-testing.mdx-f3399a8c.js"),["/_app/pages/posts/better-pooled-coronavirus-testing.mdx-f3399a8c.js","/_app/assets/pages/posts/better-pooled-coronavirus-testing.mdx-7b12b1fa.css","/_app/chunks/vendor-24f10c49.js","/_app/chunks/blog-ede6f8b8.js","/_app/assets/blog-5d13c88b.css"]),()=>$(()=>import("./pages/posts/typescript-tree-traversals.mdx-97853db6.js"),["/_app/pages/posts/typescript-tree-traversals.mdx-97853db6.js","/_app/chunks/vendor-24f10c49.js","/_app/chunks/blog-ede6f8b8.js","/_app/assets/blog-5d13c88b.css"]),()=>$(()=>import("./pages/posts/type-safe-url-wrangling.mdx-21cec324.js"),["/_app/pages/posts/type-safe-url-wrangling.mdx-21cec324.js","/_app/chunks/vendor-24f10c49.js","/_app/chunks/blog-ede6f8b8.js","/_app/assets/blog-5d13c88b.css"]),()=>$(()=>import("./pages/posts/deriving-derive-macros.mdx-c6b69e65.js"),["/_app/pages/posts/deriving-derive-macros.mdx-c6b69e65.js","/_app/chunks/vendor-24f10c49.js","/_app/chunks/blog-ede6f8b8.js","/_app/assets/blog-5d13c88b.css"]),()=>$(()=>import("./pages/posts/koka-vs-the-world.mdx-4168133d.js"),["/_app/pages/posts/koka-vs-the-world.mdx-4168133d.js","/_app/chunks/vendor-24f10c49.js","/_app/chunks/blog-ede6f8b8.js","/_app/assets/blog-5d13c88b.css"])],$t=[[/^\/$/,[d[0],d[2]],[d[1]]],[/^\/posts\/better-pooled-coronavirus-testing\/?$/,[d[0],d[3]],[d[1]]],[/^\/posts\/typescript-tree-traversals\/?$/,[d[0],d[4]],[d[1]]],[/^\/posts\/type-safe-url-wrangling\/?$/,[d[0],d[5]],[d[1]]],[/^\/posts\/deriving-derive-macros\/?$/,[d[0],d[6]],[d[1]]],[/^\/posts\/koka-vs-the-world\/?$/,[d[0],d[7]],[d[1]]]],Lt=[d[0](),d[1]()];function St(a){let t=a.baseURI;if(!t){const e=a.getElementsByTagName("base");t=e.length?e[0].href:a.URL}return t}function M(){return{x:pageXOffset,y:pageYOffset}}function st(a){for(;a&&a.nodeName.toUpperCase()!=="A";)a=a.parentNode;return a}class qt{constructor({base:t,routes:e,trailing_slash:s}){this.base=t,this.routes=e,this.trailing_slash=s}init(t){this.renderer=t,t.router=this,this.enabled=!0,"scrollRestoration"in history&&(history.scrollRestoration="manual"),addEventListener("beforeunload",()=>{history.scrollRestoration="auto"}),addEventListener("load",()=>{history.scrollRestoration="manual"});let e;addEventListener("scroll",()=>{clearTimeout(e),e=setTimeout(()=>{const n=X(k({},history.state||{}),{"sveltekit:scroll":M()});history.replaceState(n,document.title,window.location.href)},50)});const s=n=>{const r=st(n.target);r&&r.href&&r.hasAttribute("sveltekit:prefetch")&&this.prefetch(new URL(r.href))};let i;const o=n=>{clearTimeout(i),i=setTimeout(()=>{s(n)},20)};addEventListener("touchstart",s),addEventListener("mousemove",o),addEventListener("click",n=>{var w;if(!this.enabled||n.button||n.which!==1||n.metaKey||n.ctrlKey||n.shiftKey||n.altKey||n.defaultPrevented)return;const r=st(n.target);if(!r||!r.href)return;const l=typeof r.href=="object"&&r.href.constructor.name==="SVGAnimatedString",c=String(l?r.href.baseVal:r.href);if(c===location.href){location.hash||n.preventDefault();return}const u=(w=r.getAttribute("rel"))==null?void 0:w.split(/\s+/);if(r.hasAttribute("download")||u&&u.includes("external")||(l?r.target.baseVal:r.target))return;const h=new URL(c);if(!this.owns(h))return;const f=r.hasAttribute("sveltekit:noscroll");history.pushState({},"",h.href),this._navigate(h,f?M():null,[],h.hash),n.preventDefault()}),addEventListener("popstate",n=>{if(n.state&&this.enabled){const r=new URL(location.href);this._navigate(r,n.state["sveltekit:scroll"],[])}}),document.body.setAttribute("tabindex","-1"),history.replaceState(history.state||{},"",location.href)}owns(t){return t.origin===location.origin&&t.pathname.startsWith(this.base)}parse(t){if(this.owns(t)){const e=decodeURIComponent(t.pathname.slice(this.base.length)||"/"),s=this.routes.filter(([n])=>n.test(e)),i=new URLSearchParams(t.search);return{id:`${e}?${i}`,routes:s,path:e,query:i}}}async goto(t,{noscroll:e=!1,replaceState:s=!1,state:i={}}={},o){const n=new URL(t,St(document));return this.enabled&&this.owns(n)?(history[s?"replaceState":"pushState"](i,"",t),this._navigate(n,e?M():null,o,n.hash)):(location.href=n.href,new Promise(()=>{}))}enable(){this.enabled=!0}disable(){this.enabled=!1}async prefetch(t){const e=this.parse(t);if(!e)throw new Error("Attempted to prefetch a URL that does not belong to this app");return this.renderer.load(e)}async _navigate(t,e,s,i){const o=this.parse(t);if(!o)throw new Error("Attempted to navigate to a URL that does not belong to this app");if(o.path!=="/"){const r=o.path.endsWith("/");(r&&this.trailing_slash==="never"||!r&&this.trailing_slash==="always"&&!o.path.split("/").pop().includes("."))&&(o.path=r?o.path.slice(0,-1):o.path+"/",history.replaceState({},"",`${this.base}${o.path}${location.search}`))}this.renderer.notify({path:o.path,query:o.query}),await this.renderer.update(o,s,!1),document.body.focus();const n=i&&document.getElementById(i.slice(1));e?scrollTo(e.x,e.y):n?scrollTo(0,n.getBoundingClientRect().top+scrollY):scrollTo(0,0)}}function Ut(a){let t=5381,e=a.length;if(typeof a=="string")for(;e;)t=t*33^a.charCodeAt(--e);else for(;e;)t=t*33^a[--e];return(t>>>0).toString(36)}function At(a){if(a.error){const t=typeof a.error=="string"?new Error(a.error):a.error,e=a.status;return t instanceof Error?!e||e<400||e>599?(console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500'),{status:500,error:t}):{status:e,error:t}:{status:500,error:new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof t}"`)}}if(a.redirect){if(!a.status||Math.floor(a.status/100)!==3)return{status:500,error:new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')};if(typeof a.redirect!="string")return{status:500,error:new Error('"redirect" property returned from load() must be a string')}}return a}function Tt(a){const t=K(a);let e=!0;function s(){e=!0,t.update(n=>n)}function i(n){e=!1,t.set(n)}function o(n){let r;return t.subscribe(l=>{(r===void 0||e&&l!==r)&&n(r=l)})}return{notify:s,set:i,subscribe:o}}function jt(a,t){let s=`script[type="svelte-data"][url="${typeof a=="string"?a:a.url}"]`;t&&typeof t.body=="string"&&(s+=`[body="${Ut(t.body)}"]`);const i=document.querySelector(s);if(i){const o=JSON.parse(i.textContent),{body:n}=o,r=F(o,["body"]);return Promise.resolve(new Response(n,r))}return fetch(a,t)}class xt{constructor({Root:t,fallback:e,target:s,session:i,host:o}){this.Root=t,this.fallback=e,this.host=o,this.router=null,this.target=s,this.started=!1,this.session_id=1,this.invalid=new Set,this.invalidating=null,this.current={page:null,session_id:null,branch:[]},this.cache=new Map,this.loading={id:null,promise:null},this.stores={page:Tt({}),navigating:K(null),session:K(i)},this.$session=null,this.root=null;let n=!1;this.stores.session.subscribe(async r=>{if(this.$session=r,!n)return;this.session_id+=1;const l=this.router.parse(new URL(location.href));this.update(l,[],!0)}),n=!0}async start({status:t,error:e,nodes:s,page:i}){const o=[];let n={},r,l,c;try{for(let u=0;u<s.length;u+=1){const h=u===s.length-1,f=await this._load_node({module:await s[u],page:i,context:n,status:h&&t,error:h&&e});if(o.push(f),f&&f.loaded)if(f.loaded.error){if(e)throw f.loaded.error;l=f.loaded.status,c=f.loaded.error}else f.loaded.context&&(n=k(k({},n),f.loaded.context))}r=await this._get_navigation_result_from_branch({page:i,branch:o})}catch(u){if(e)throw u;l=500,c=u}if(c&&(r=await this._load_error({status:l,error:c,path:i.path,query:i.query})),r.redirect){location.href=new URL(r.redirect,location.href).href;return}this._init(r)}notify({path:t,query:e}){dispatchEvent(new CustomEvent("sveltekit:navigation-start")),this.started&&this.stores.navigating.set({from:{path:this.current.page.path,query:this.current.page.query},to:{path:t,query:e}})}async update(t,e,s){const i=this.token={};let o=await this._get_navigation_result(t,s);if(i!==this.token)return;if(this.invalid.clear(),o.redirect)if(e.length>10||e.includes(t.path))o=await this._load_error({status:500,error:new Error("Redirect loop"),path:t.path,query:t.query});else{this.router?this.router.goto(o.redirect,{replaceState:!0},[...e,t.path]):location.href=new URL(o.redirect,location.href).href;return}o.reload?location.reload():this.started?(this.current=o.state,this.root.$set(o.props),this.stores.navigating.set(null),await 0):this._init(o),dispatchEvent(new CustomEvent("sveltekit:navigation-end")),this.loading.promise=null,this.loading.id=null;const n=o.state.branch[o.state.branch.length-1];n&&n.module.router===!1?this.router.disable():this.router.enable()}load(t){return this.loading.promise=this._get_navigation_result(t,!1),this.loading.id=t.id,this.loading.promise}invalidate(t){return this.invalid.add(t),this.invalidating||(this.invalidating=Promise.resolve().then(async()=>{const e=this.router.parse(new URL(location.href));await this.update(e,[],!0),this.invalidating=null})),this.invalidating}_init(t){this.current=t.state;const e=document.querySelector("style[data-svelte]");e&&e.remove(),this.root=new this.Root({target:this.target,props:k({stores:this.stores},t.props),hydrate:!0}),this.started=!0}async _get_navigation_result(t,e){if(this.loading.id===t.id)return this.loading.promise;for(let s=0;s<t.routes.length;s+=1){const i=t.routes[s];if(i.length===1)return{reload:!0};let o=s+1;for(;o<t.routes.length;){const r=t.routes[o];if(r[0].toString()===i[0].toString())r.length!==1&&r[1].forEach(l=>l()),o+=1;else break}const n=await this._load({route:i,path:t.path,query:t.query},e);if(n)return n}return await this._load_error({status:404,error:new Error(`Not found: ${t.path}`),path:t.path,query:t.query})}async _get_navigation_result_from_branch({page:t,branch:e}){const s=e.filter(Boolean),i={state:{page:t,branch:e,session_id:this.session_id},props:{components:s.map(r=>r.module.default)}};for(let r=0;r<s.length;r+=1)s[r].loaded&&(i.props[`props_${r}`]=await s[r].loaded.props);(!this.current.page||t.path!==this.current.page.path||t.query.toString()!==this.current.page.query.toString())&&(i.props.page=t);const o=s[s.length-1],n=o.loaded&&o.loaded.maxage;if(n){const r=`${t.path}?${t.query}`;let l=!1;const c=()=>{this.cache.get(r)===i&&this.cache.delete(r),h(),clearTimeout(u)},u=setTimeout(c,n*1e3),h=this.stores.session.subscribe(()=>{l&&c()});l=!0,this.cache.set(r,i)}return i}async _load_node({status:t,error:e,module:s,page:i,context:o}){const n={module:s,uses:{params:new Set,path:!1,query:!1,session:!1,context:!1,dependencies:[]},loaded:null,context:o},r={};for(const c in i.params)Object.defineProperty(r,c,{get(){return n.uses.params.add(c),i.params[c]},enumerable:!0});const l=this.$session;if(s.load){const{started:c}=this,u={page:{host:i.host,params:r,get path(){return n.uses.path=!0,i.path},get query(){return n.uses.query=!0,i.query}},get session(){return n.uses.session=!0,l},get context(){return n.uses.context=!0,k({},o)},fetch(f,w){const A=typeof f=="string"?f:f.url,{href:P}=new URL(A,new URL(i.path,document.baseURI));return n.uses.dependencies.push(P),c?fetch(f,w):jt(f,w)}};e&&(u.status=t,u.error=e);const h=await s.load.call(null,u);if(!h)return;n.loaded=At(h),n.loaded.context&&(n.context=n.loaded.context)}return n}async _load({route:t,path:e,query:s},i){const o=`${e}?${s}`;if(!i&&this.cache.has(o))return this.cache.get(o);const[n,r,l,c]=t,u=c?c(n.exec(e)):{},h=this.current.page&&{path:e!==this.current.page.path,params:Object.keys(u).filter(p=>this.current.page.params[p]!==u[p]),query:s.toString()!==this.current.page.query.toString(),session:this.session_id!==this.current.session_id},f={host:this.host,path:e,query:s,params:u},w=[];let A={},P=!1,I=200,T=null;r.forEach(p=>p());t:for(let p=0;p<r.length;p+=1){let _;try{if(!r[p])continue;const v=await r[p](),m=this.current.branch[p];if(!m||v!==m.module||h.path&&m.uses.path||h.params.some(L=>m.uses.params.has(L))||h.query&&m.uses.query||h.session&&m.uses.session||m.uses.dependencies.some(L=>this.invalid.has(L))||P&&m.uses.context){_=await this._load_node({module:v,page:f,context:A});const L=p===r.length-1;if(_&&_.loaded){if(_.loaded.error&&(I=_.loaded.status,T=_.loaded.error),_.loaded.redirect)return{redirect:_.loaded.redirect};_.loaded.context&&(P=!0)}else if(L&&v.load)return}else _=m}catch(v){I=500,T=v}if(T){for(;p--;)if(l[p]){let v,m,V=p;for(;!(m=w[V]);)V-=1;try{if(v=await this._load_node({status:I,error:T,module:await l[p](),page:f,context:m.context}),v.loaded.error)continue;w.push(v);break t}catch(L){continue}}return await this._load_error({status:I,error:T,path:e,query:s})}else _&&_.loaded&&_.loaded.context&&(A=k(k({},A),_.loaded.context)),w.push(_)}return await this._get_navigation_result_from_branch({page:f,branch:w})}async _load_error({status:t,error:e,path:s,query:i}){const o={host:this.host,path:s,query:i,params:{}},n=await this._load_node({module:await this.fallback[0],page:o,context:{}}),r=[n,await this._load_node({status:t,error:e,module:await this.fallback[1],page:o,context:n&&n.loaded&&n.loaded.context})];return await this._get_navigation_result_from_branch({page:o,branch:r})}}async function Pt({paths:a,target:t,session:e,host:s,route:i,spa:o,trailing_slash:n,hydrate:r}){const l=i&&new qt({base:a.base,routes:$t,trailing_slash:n}),c=new xt({Root:Rt,fallback:Lt,target:t,session:e,host:s});r&&await c.start(r),i&&l.init(c),o&&l.goto(location.href,{replaceState:!0},[]),dispatchEvent(new CustomEvent("sveltekit:start"))}export{Pt as start};
