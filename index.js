var e,t,n,o,r=Object.defineProperty,s=Object.prototype.hasOwnProperty,i=Object.getOwnPropertySymbols,l=Object.prototype.propertyIsEnumerable,u=(e,t,n)=>t in e?r(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,a=(e,t)=>{for(var n in t||(t={}))s.call(t,n)&&u(e,n,t[n]);if(i)for(var n of i(t))l.call(t,n)&&u(e,n,t[n]);return e},c={},_=[],d=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function f(e,t){for(var n in t)e[n]=t[n];return e}function h(e){var t=e.parentNode;t&&t.removeChild(e)}function p(e,t,n){var o,r,s,i=arguments,l={};for(s in t)"key"==s?o=t[s]:"ref"==s?r=t[s]:l[s]=t[s];if(arguments.length>3)for(n=[n],s=3;s<arguments.length;s++)n.push(i[s]);if(null!=n&&(l.children=n),"function"==typeof e&&null!=e.defaultProps)for(s in e.defaultProps)void 0===l[s]&&(l[s]=e.defaultProps[s]);return m(e,l,o,r,null)}function m(t,n,o,r,s){var i={type:t,props:n,key:o,ref:r,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==s?++e.__v:s};return null!=e.vnode&&e.vnode(i),i}function g(e){return e.children}function y(e,t){this.props=e,this.context=t}function v(e,t){if(null==t)return e.__?v(e.__,e.__.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e)return n.__e;return"function"==typeof e.type?v(e):null}function b(e){var t,n;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e){e.__e=e.__c.base=n.__e;break}return b(e)}}function k(r){(!r.__d&&(r.__d=!0)&&t.push(r)&&!w.__r++||o!==e.debounceRendering)&&((o=e.debounceRendering)||n)(w)}function w(){for(var e;w.__r=t.length;)e=t.sort((function(e,t){return e.__v.__b-t.__v.__b})),t=[],e.some((function(e){var t,n,o,r,s,i;e.__d&&(s=(r=(t=e).__v).__e,(i=t.__P)&&(n=[],(o=f({},r)).__v=r.__v+1,T(i,r,o,t.__n,void 0!==i.ownerSVGElement,null!=r.__h?[s]:null,n,null==s?v(r):s,r.__h),q(n,r),r.__e!=s&&b(r)))}))}function x(e,t,n,o,r,s,i,l,u,a){var d,f,h,p,y,b,k,w=o&&o.__k||_,x=w.length;for(n.__k=[],d=0;d<t.length;d++)if(null!=(p=n.__k[d]=null==(p=t[d])||"boolean"==typeof p?null:"string"==typeof p||"number"==typeof p||"bigint"==typeof p?m(null,p,null,null,p):Array.isArray(p)?m(g,{children:p},null,null,null):p.__b>0?m(p.type,p.props,p.key,null,p.__v):p)){if(p.__=n,p.__b=n.__b+1,null===(h=w[d])||h&&p.key==h.key&&p.type===h.type)w[d]=void 0;else for(f=0;f<x;f++){if((h=w[f])&&p.key==h.key&&p.type===h.type){w[f]=void 0;break}h=null}T(e,p,h=h||c,r,s,i,l,u,a),y=p.__e,(f=p.ref)&&h.ref!=f&&(k||(k=[]),h.ref&&k.push(h.ref,null,p),k.push(f,p.__c||y,p)),null!=y?(null==b&&(b=y),"function"==typeof p.type&&null!=p.__k&&p.__k===h.__k?p.__d=u=N(p,u,e):u=S(e,p,h,w,y,u),a||"option"!==n.type?"function"==typeof n.type&&(n.__d=u):e.value=""):u&&h.__e==u&&u.parentNode!=e&&(u=v(h))}for(n.__e=b,d=x;d--;)null!=w[d]&&("function"==typeof n.type&&null!=w[d].__e&&w[d].__e==n.__d&&(n.__d=v(o,d+1)),D(w[d],w[d]));if(k)for(d=0;d<k.length;d++)A(k[d],k[++d],k[++d])}function N(e,t,n){var o,r;for(o=0;o<e.__k.length;o++)(r=e.__k[o])&&(r.__=e,t="function"==typeof r.type?N(r,t,n):S(n,r,r,e.__k,r.__e,t));return t}function S(e,t,n,o,r,s){var i,l,u;if(void 0!==t.__d)i=t.__d,t.__d=void 0;else if(null==n||r!=s||null==r.parentNode)e:if(null==s||s.parentNode!==e)e.appendChild(r),i=null;else{for(l=s,u=0;(l=l.nextSibling)&&u<o.length;u+=2)if(l==r)break e;e.insertBefore(r,s),i=s}return void 0!==i?i:r.nextSibling}function C(e,t,n){"-"===t[0]?e.setProperty(t,n):e[t]=null==n?"":"number"!=typeof n||d.test(t)?n:n+"px"}function I(e,t,n,o,r){var s;e:if("style"===t)if("string"==typeof n)e.style.cssText=n;else{if("string"==typeof o&&(e.style.cssText=o=""),o)for(t in o)n&&t in n||C(e.style,t,"");if(n)for(t in n)o&&n[t]===o[t]||C(e.style,t,n[t])}else if("o"===t[0]&&"n"===t[1])s=t!==(t=t.replace(/Capture$/,"")),t=t.toLowerCase()in e?t.toLowerCase().slice(2):t.slice(2),e.l||(e.l={}),e.l[t+s]=n,n?o||e.addEventListener(t,s?E:P,s):e.removeEventListener(t,s?E:P,s);else if("dangerouslySetInnerHTML"!==t){if(r)t=t.replace(/xlink[H:h]/,"h").replace(/sName$/,"s");else if("href"!==t&&"list"!==t&&"form"!==t&&"tabIndex"!==t&&"download"!==t&&t in e)try{e[t]=null==n?"":n;break e}catch(i){}"function"==typeof n||(null!=n&&(!1!==n||"a"===t[0]&&"r"===t[1])?e.setAttribute(t,n):e.removeAttribute(t))}}function P(t){this.l[t.type+!1](e.event?e.event(t):t)}function E(t){this.l[t.type+!0](e.event?e.event(t):t)}function T(t,n,o,r,s,i,l,u,a){var d,p,m,v,b,k,w,N,S,C,P,E=n.type;if(void 0!==n.constructor)return null;null!=o.__h&&(a=o.__h,u=n.__e=o.__e,n.__h=null,i=[u]),(d=e.__b)&&d(n);try{e:if("function"==typeof E){if(N=n.props,S=(d=E.contextType)&&r[d.__c],C=d?S?S.props.value:d.__:r,o.__c?w=(p=n.__c=o.__c).__=p.__E:("prototype"in E&&E.prototype.render?n.__c=p=new E(N,C):(n.__c=p=new y(N,C),p.constructor=E,p.render=G),S&&S.sub(p),p.props=N,p.state||(p.state={}),p.context=C,p.__n=r,m=p.__d=!0,p.__h=[]),null==p.__s&&(p.__s=p.state),null!=E.getDerivedStateFromProps&&(p.__s==p.state&&(p.__s=f({},p.__s)),f(p.__s,E.getDerivedStateFromProps(N,p.__s))),v=p.props,b=p.state,m)null==E.getDerivedStateFromProps&&null!=p.componentWillMount&&p.componentWillMount(),null!=p.componentDidMount&&p.__h.push(p.componentDidMount);else{if(null==E.getDerivedStateFromProps&&N!==v&&null!=p.componentWillReceiveProps&&p.componentWillReceiveProps(N,C),!p.__e&&null!=p.shouldComponentUpdate&&!1===p.shouldComponentUpdate(N,p.__s,C)||n.__v===o.__v){p.props=N,p.state=p.__s,n.__v!==o.__v&&(p.__d=!1),p.__v=n,n.__e=o.__e,n.__k=o.__k,n.__k.forEach((function(e){e&&(e.__=n)})),p.__h.length&&l.push(p);break e}null!=p.componentWillUpdate&&p.componentWillUpdate(N,p.__s,C),null!=p.componentDidUpdate&&p.__h.push((function(){p.componentDidUpdate(v,b,k)}))}p.context=C,p.props=N,p.state=p.__s,(d=e.__r)&&d(n),p.__d=!1,p.__v=n,p.__P=t,d=p.render(p.props,p.state,p.context),p.state=p.__s,null!=p.getChildContext&&(r=f(f({},r),p.getChildContext())),m||null==p.getSnapshotBeforeUpdate||(k=p.getSnapshotBeforeUpdate(v,b)),P=null!=d&&d.type===g&&null==d.key?d.props.children:d,x(t,Array.isArray(P)?P:[P],n,o,r,s,i,l,u,a),p.base=n.__e,n.__h=null,p.__h.length&&l.push(p),w&&(p.__E=p.__=null),p.__e=!1}else null==i&&n.__v===o.__v?(n.__k=o.__k,n.__e=o.__e):n.__e=function(e,t,n,o,r,s,i,l){var u,a,d,f,p=n.props,m=t.props,g=t.type,y=0;if("svg"===g&&(r=!0),null!=s)for(;y<s.length;y++)if((u=s[y])&&(u===e||(g?u.localName==g:3==u.nodeType))){e=u,s[y]=null;break}if(null==e){if(null===g)return document.createTextNode(m);e=r?document.createElementNS("http://www.w3.org/2000/svg",g):document.createElement(g,m.is&&m),s=null,l=!1}if(null===g)p===m||l&&e.data===m||(e.data=m);else{if(s=s&&_.slice.call(e.childNodes),a=(p=n.props||c).dangerouslySetInnerHTML,d=m.dangerouslySetInnerHTML,!l){if(null!=s)for(p={},f=0;f<e.attributes.length;f++)p[e.attributes[f].name]=e.attributes[f].value;(d||a)&&(d&&(a&&d.__html==a.__html||d.__html===e.innerHTML)||(e.innerHTML=d&&d.__html||""))}if(function(e,t,n,o,r){var s;for(s in n)"children"===s||"key"===s||s in t||I(e,s,null,n[s],o);for(s in t)r&&"function"!=typeof t[s]||"children"===s||"key"===s||"value"===s||"checked"===s||n[s]===t[s]||I(e,s,t[s],n[s],o)}(e,m,p,r,l),d)t.__k=[];else if(y=t.props.children,x(e,Array.isArray(y)?y:[y],t,n,o,r&&"foreignObject"!==g,s,i,e.firstChild,l),null!=s)for(y=s.length;y--;)null!=s[y]&&h(s[y]);l||("value"in m&&void 0!==(y=m.value)&&(y!==e.value||"progress"===g&&!y)&&I(e,"value",y,p.value,!1),"checked"in m&&void 0!==(y=m.checked)&&y!==e.checked&&I(e,"checked",y,p.checked,!1))}return e}(o.__e,n,o,r,s,i,l,a);(d=e.diffed)&&d(n)}catch(T){n.__v=null,(a||null!=i)&&(n.__e=u,n.__h=!!a,i[i.indexOf(u)]=null),e.__e(T,n,o)}}function q(t,n){e.__c&&e.__c(n,t),t.some((function(n){try{t=n.__h,n.__h=[],t.some((function(e){e.call(n)}))}catch(o){e.__e(o,n.__v)}}))}function A(t,n,o){try{"function"==typeof t?t(n):t.current=n}catch(r){e.__e(r,o)}}function D(t,n,o){var r,s,i;if(e.unmount&&e.unmount(t),(r=t.ref)&&(r.current&&r.current!==t.__e||A(r,null,n)),o||"function"==typeof t.type||(o=null!=(s=t.__e)),t.__e=t.__d=void 0,null!=(r=t.__c)){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(l){e.__e(l,n)}r.base=r.__P=null}if(r=t.__k)for(i=0;i<r.length;i++)r[i]&&D(r[i],n,o);null!=s&&h(s)}function G(e,t,n){return this.constructor(e,n)}e={__e:function(e,t){for(var n,o,r;t=t.__;)if((n=t.__c)&&!n.__)try{if((o=n.constructor)&&null!=o.getDerivedStateFromError&&(n.setState(o.getDerivedStateFromError(e)),r=n.__d),null!=n.componentDidCatch&&(n.componentDidCatch(e),r=n.__d),r)return n.__E=n}catch(s){e=s}throw e},__v:0},y.prototype.setState=function(e,t){var n;n=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=f({},this.state),"function"==typeof e&&(e=e(f({},n),this.props)),e&&f(n,e),null!=e&&this.__v&&(t&&this.__h.push(t),k(this))},y.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),k(this))},y.prototype.render=g,t=[],n="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,w.__r=0;function O(e){e=e||new Date;const t={},n="2-digit";Intl.DateTimeFormat("en-US",{timeZone:"America/New_York",hourCycle:"h23",year:"numeric",month:n,day:n,hour:n,minute:n,second:n}).formatToParts(e).forEach((e=>t[e.type]=e.value));const o=e.getMilliseconds().toString().padStart(3,"0");return{date:`${t.year}-${t.month}-${t.day}`,time:`${t.hour}:${t.minute}:${t.second}.${o}`}}class L extends Error{constructor(e){super(`Token "${e}" missing or expired`),this.name="TokenStale"}}function U(e){return"https://vqguest-svc-wdw.wdprapps.disney.com/application/v1/guest/"+e}class H extends Error{constructor(e,t="Request failed"){super(`${t}: ${JSON.stringify(e)}`),this.responseData=e,this.name="RequestError"}}var j,B,M,Q=0,$=[],F=e.__b,W=e.__r,R=e.diffed,J=e.__c,V=e.unmount;function z(t,n){e.__h&&e.__h(B,t,Q||n),Q=0;var o=B.__H||(B.__H={__:[],__h:[]});return t>=o.__.length&&o.__.push({}),o.__[t]}function Y(e){return Q=1,function(e,t,n){var o=z(j++,2);return o.t=e,o.__c||(o.__=[n?n(t):re(void 0,t),function(e){var t=o.t(o.__[0],e);o.__[0]!==t&&(o.__=[t,o.__[1]],o.__c.setState({}))}],o.__c=B),o.__}(re,e)}function K(t,n){var o=z(j++,3);!e.__s&&oe(o.__H,n)&&(o.__=t,o.__H=n,B.__H.__h.push(o))}function Z(e){return Q=5,function(e,t){var n=z(j++,7);return oe(n.__H,t)&&(n.__=e(),n.__H=t,n.__h=e),n.__}((function(){return{current:e}}),[])}function X(){$.forEach((function(t){if(t.__P)try{t.__H.__h.forEach(te),t.__H.__h.forEach(ne),t.__H.__h=[]}catch(Te){t.__H.__h=[],e.__e(Te,t.__v)}})),$=[]}e.__b=function(e){B=null,F&&F(e)},e.__r=function(e){W&&W(e),j=0;var t=(B=e.__c).__H;t&&(t.__h.forEach(te),t.__h.forEach(ne),t.__h=[])},e.diffed=function(t){R&&R(t);var n=t.__c;n&&n.__H&&n.__H.__h.length&&(1!==$.push(n)&&M===e.requestAnimationFrame||((M=e.requestAnimationFrame)||function(e){var t,n=function(){clearTimeout(o),ee&&cancelAnimationFrame(t),setTimeout(e)},o=setTimeout(n,100);ee&&(t=requestAnimationFrame(n))})(X)),B=void 0},e.__c=function(t,n){n.some((function(t){try{t.__h.forEach(te),t.__h=t.__h.filter((function(e){return!e.__||ne(e)}))}catch(o){n.some((function(e){e.__h&&(e.__h=[])})),n=[],e.__e(o,t.__v)}})),J&&J(t,n)},e.unmount=function(t){V&&V(t);var n=t.__c;if(n&&n.__H)try{n.__H.__.forEach(te)}catch(o){e.__e(o,n.__v)}};var ee="function"==typeof requestAnimationFrame;function te(e){var t=B;"function"==typeof e.__c&&e.__c(),B=t}function ne(e){var t=B;e.__c=e.__(),B=t}function oe(e,t){return!e||e.length!==t.length||t.some((function(t,n){return t!==e[n]}))}function re(e,t){return"function"==typeof t?t(e):t}function se({onClick:e,disabled:t,href:n,children:o}){return p("div",{className:"mb-20"},p("div",{className:"fixed bottom-0 left-0 w-full bg-gray-50 bg-opacity-75 text-center"},p("a",{href:n,className:"block max-w-2xl mx-auto px-3 pb-5"},p("button",{onClick:e,disabled:t,className:"w-full p-3 rounded-lg bg-blue-500 text-white font-semibold focus:outline-none focus:ring focus:ring-blue-600 focus:ring-offset-2 disabled:bg-gray-400"},o))))}function ie({guests:e,selectable:t,conflicts:n}){return p("ul",{className:"mt-3 ml-3"},e.map(((e,o)=>p("li",{key:e.guestId,className:"py-1.5 leading-tight"},p("label",{className:"flex items-center"},t?p("input",{type:"checkbox",checked:t.isSelected(o),onChange:()=>t.onToggle(o),className:"rounded mr-4 p-2.5 text-green-500"}):null,p("img",{src:e.avatarImageUrl,alt:"",width:"56",height:"56",className:"rounded-full mr-3"}),p("span",null,e.firstName," ",e.lastName,p("br",null),n&&e.guestId in n?p("span",{className:"text-xs font-semibold text-red-700"},n[e.guestId].replace(/_/g," ")):null))))))}function le({guests:e,party:t,onToggle:n,onConfirm:o}){return p(g,null,p("h2",{className:"mt-5 text-xl"},"Choose Your Party"),p(ie,{guests:e,selectable:{isSelected:e=>!!t[e],onToggle:n}}),p(se,{disabled:0===Object.keys(t).length,onClick:o},"Confirm Party"))}function ue({message:e,type:t}){t||(t="alert");return e?p("div",{role:"alert",className:`fixed bottom-20 left-0 w-full p-2 font-semibold text-center ${{alert:"bg-yellow-200",error:"bg-red-200"}[t]} text-gray-800`},e):null}function ae({guests:e,joinQueue:t,onEdit:n}){const[o,r]=Y(!1),[s,i]=function(){const[e,t]=Y(0),[n,o]=Y({message:"",type:"alert"});return[n,function(n,r){clearTimeout(e),o({message:n,type:r}),n&&t(self.setTimeout((()=>{o({message:"",type:r})}),2500))}]}();return p(g,null,p("div",{className:"mt-5 text-xl"},p("h2",{className:"inline"},"Your Party"),p("span",null,p("button",{onClick:n,className:"ml-3 px-2 py-1.5 rounded-lg bg-blue-500 text-white text-xs uppercase font-semibold tracking-wide align-middle focus:outline-none focus:ring focus:ring-blue-600 focus:ring-offset-2"},"Edit"))),p(ie,{guests:e}),p(se,{disabled:o,onClick:async function(){r(!0),i("");const e=async function(e){return new Promise((t=>{setTimeout(t,e)}))}(999);try{await t()||i("Queue not open yet")}catch(Ge){throw i("Error: try again","error"),Ge}finally{await e,r(!1)}}},"Join Boarding Group"),p(ue,a({},s)))}function ce({queue:e,queues:t,onChange:n}){return t||(t=[]),p("h1",{className:"border-b-2 border-gray-200 text-xl font-semibold"},t.length<=1?p("span",{className:"inline-block p-1 w-full whitespace-nowrap overflow-hidden overflow-ellipsis"},e.name):p("select",{className:"w-full border-none p-1 bg-transparent text-xl font-semibold focus:ring-0",onChange:e=>n?n(e.currentTarget.value):null},t.map((t=>p("option",{selected:t===e,key:t.queueId,value:t.queueId,className:"text-base font-normal"},t.name)))))}function _e({guests:e,result:t,onDone:n}){const{boardingGroup:o,conflicts:r}=t,s=e.filter((e=>!(e.guestId in r))),i=e.filter((e=>e.guestId in r));return p(g,null,o?p(g,null,p("h2",{className:"mt-5 text-xl"},"Boarding Group: ",o),p(ie,{guests:s}),Object.keys(r).length>0?p(g,null,p("p",{className:"font-semibold"},"These guests could not join:"),p(ie,{guests:i,conflicts:r})):null,p("p",null,"Refer to the My Disney Experience app for return time and other information.")):p(g,null,p("h2",{className:"mt-5 text-xl"},"Sorry!"),p("p",null,"A boarding group could not be obtained."),p(ie,{guests:i,conflicts:r})),p(se,{onClick:n},"Done"))}const de={};function fe(){"time_is_widget"in self&&self.time_is_widget.init(de)}function he(e){!function(){if([...document.scripts].some((e=>"https://widget.time.is/t.js"===e.src)))return;const e=document.createElement("script");e.src="https://widget.time.is/t.js",e.onload=fe,document.head.appendChild(e)}(),de[e]={},fe()}function pe(e){const t=document.getElementById(e);t&&!t.firstElementChild&&(t.textContent=O().time.slice(0,8),setTimeout((()=>pe(e)),100))}function me(){const e="_z161";return K((()=>(he(e),pe(e),()=>function(e){delete de[e],fe()}(e))),[e]),p("time",{id:e})}function ge({queue:e}){return p("table",{className:"mt-4 mx-auto text-gray-500"},p(ye,{heading:"Next queue opening",time:p("time",null,e.nextScheduledOpenTime||"07:00:00")}),p(ye,{heading:p("a",{href:"https://time.is/Orlando",id:"time_is_link",target:"_blank",rel:"noreferrer"},"Current time"),time:p(me,null)}))}function ye({heading:e,time:t}){return p("tr",null,p("th",{className:"pr-3 text-right text-xs font-semibold uppercase"},e,":"),p("td",{className:"text-xl font-mono leading-tight"},"\ufeff",t))}function ve({client:e}){const[t,n]=Y([]),[o,r]=Y(null),[s,i]=Y([]),[l,u]=Y([]),[a,c]=Y({boardingGroup:null,conflicts:{},closed:!0}),[_,d]=Y("ChooseParty");if(K((()=>{(async()=>{const t=await e.getQueues();n(t),r(t[0])})()}),[e]),K((()=>{if(!o)return;let t=!1;return(async()=>{var n;const r=await e.getLinkedGuests(o);if(!t){i(r);const e=[];for(let t=0;null==(n=r[t])?void 0:n.isPreselected;++t)e[t]=r[t];u(e)}})(),()=>{t=!0}}),[e,o]),K((()=>scrollTo(0,0)),[_]),!o||0===s.length)return null;return{ChooseParty:p(g,null,p(ce,{queue:o,queues:t,onChange:function(e){const n=t.find((t=>t.queueId===e));n&&r(n)}}),p(ge,{queue:o}),p(le,{guests:s,party:l,onToggle:function(e){const t=l.slice();t[e]?delete t[e]:t[e]=s[e],u(t)},onConfirm:()=>d("JoinQueue")})),JoinQueue:p(g,null,p(ce,{queue:o}),p(ge,{queue:o}),p(ae,{guests:Object.values(l),onEdit:()=>d("ChooseParty"),joinQueue:async function(){return!(!o||!(await e.getQueue(o)).isAcceptingJoins)&&(c(await e.joinQueue(o,Object.values(l))),d("BGResult"),!0)}})),BGResult:p(g,null,p(ce,{queue:o}),p(_e,{guests:Object.values(l),result:a,onDone:()=>d("ChooseParty")}))}[_]}function be({onAccept:e}){return p(g,null,p("h1",{className:"text-xl font-semibold"},"Warning!"),p("p",null,'Use at your own risk. BG1 is highly experimental, for demonstration purposes only, and provided "as is" without warranty of any kind. It could stop working at any time for any reason. There is no guarantee that using BG1 will actually help you obtain a boarding group, and it should not be relied on for this or any other purpose. Always use the official Disney app.'),p(se,{onClick:e},"Accept"))}const ke="https://cdn.registerdisney.go.com/v2/TPR-WDW-LBSDK.IOS-PROD/en-US?include=l10n,config,html,js&buildId=1785bba1445";class we{constructor(e,t,n=!1){this.iframe=e,this.logging=n,this.handlers={},this.handshakeAcked=!1,this.onMessage=e=>{if(e.source!==this.iframe.contentWindow)return;if("inner.loaded"===e.data)return;const t=JSON.parse(e.data);this.logging&&console.log("Message:",t);const n="message"===t.type?t.eventName:t.type,o=this.handlers[n],r=o?o("data"in t?t.data:null):void 0;var s;"deferredUuid"in(s=t)&&void 0!==s.deferredUuid&&this.send({type:"deferred",action:"resolve",deferredUuid:t.deferredUuid,data:void 0===r?{}:r})},this.on("handshake",(()=>{this.handshakeAcked||(this.handshakeAcked=!0,this.send({type:"handshakeAck"}),this.logging&&this.sendMessage("setLogLevel",{level:"log"}),this.sendMessage("workflow.execute",{name:"login"}))})),this.on("lightbox.hide",(()=>this.open())),this.on("session.loggedin",(({token:e})=>{t(e.access_token,new Date(e.expires))}))}open(){addEventListener("message",this.onMessage),this.iframe.src=ke.toString(),this.handshakeAcked=!1}close(){removeEventListener("message",this.onMessage)}on(e,t){this.handlers[e]=t}sendMessage(e,t){this.send({type:"message",eventName:e,data:t})}send(e){var t;null==(t=this.iframe.contentWindow)||t.postMessage(JSON.stringify(a(a({},e),{name:"lightbox-client-window"})),ke)}}function xe({onLogin:e}){const t=Z(null);return K((()=>{if(!t.current)return;const n=new we(t.current,e);return n.open(),()=>n.close()}),[t,e]),p("iframe",{ref:t,className:"fixed top-0 left-0 w-full h-full border-0"})}function Ne(){return p(g,null,p("h1",{className:"text-xl font-semibold"},"Unable to Load BG1"),p("p",null,"BG1 can only be loaded from a resource on Disney's virtual queue server. Run the bookmarklet again after clicking the button below."),p(se,{href:"https://vqguest-svc-wdw.wdprapps.disney.com/application/v1/guest/getQueues"},"Go to Virtual Queue Page"))}function Se({accessToken:e,client:t}){const[n,o]=Y("Blank"),[r,s]=function(e=localStorage,t="disclaimerAccepted"){const[n,o]=Y(!!e.getItem(t));return K((()=>{n&&e.setItem(t,"1")}),[n,e,t]),[n,()=>o(!0)]}();K((()=>{if("https://vqguest-svc-wdw.wdprapps.disney.com"!==location.origin)return o("WrongPage");if(!r)return o("Disclaimer");try{e.get()}catch(Ge){if(Ge instanceof L)return o("LoginForm");throw Ge}o("BGClient")}),[e,r]);return p("div",{className:"max-w-2xl mx-auto px-3 py-2"},{Blank:p("div",null),WrongPage:p(Ne,null),Disclaimer:p(be,{onAccept:s}),LoginForm:p(xe,{onLogin:function(t,n){e.set(t,n),o("BGClient")}}),BGClient:p(ve,{client:t})}[n])}document.head.innerHTML+='\n  <meta name=viewport content="width=device-width, initial-scale=1, maximum-scale=1">\n  <title>BG1</title>\n';const Ce=document.body;Ce.className="bg-gray-50 text-black",Ce.addEventListener("click",(()=>null));const Ie=new class{constructor(e,t=localStorage){this.name=e,this.storage=t}get(){const e=this.storage.getItem(this.name);if(e){const{token:t,expires:n}=JSON.parse(e),o=O(new Date(n)),r=O();if(o.date>r.date||o.date===r.date&&o.time>r.time&&o.time>="17")return t}throw new L(this.name)}set(e,t){this.storage.setItem(this.name,JSON.stringify({token:e,expires:t}))}delete(){this.storage.removeItem(this.name)}}("accessToken"),Pe=new class{constructor(e,t){this.fetch=e,this.getAccessToken=t}async getQueues(){return(await this.fetch(U("getQueues"))).data.queues}async getQueue(e){const t=(await this.getQueues()).find((t=>t.queueId===e.queueId));if(t)return t;throw new Error("Queue not Found")}async getLinkedGuests(e){const t=await this.post({resource:"getLinkedGuests",data:{queueId:e.queueId}});return t.guests.map((e=>({guestId:e.guestId,firstName:e.firstName,lastName:e.lastName,avatarImageUrl:e.avatarImageUrl,isPrimaryGuest:e.isPrimaryGuest,isPreselected:e.isPreselected}))).sort(((e,t)=>e.isPrimaryGuest!==t.isPrimaryGuest?e.isPrimaryGuest?-1:1:e.isPreselected!==t.isPreselected?e.isPreselected?-1:1:`${e.firstName} ${e.lastName}`.localeCompare(`${t.firstName} ${t.lastName}`)))}async joinQueue(e,t){const n=t.map((e=>e.guestId)),o=await this.post({resource:"joinQueue",data:{queueId:e.queueId,guestIds:n}});if("OK"===o.responseStatus){const t=o.positions.find((t=>t.queueId===e.queueId&&t.guestIds.length>0&&n.some((e=>t.guestIds.includes(e)))));if(!t)throw new H(o);return{boardingGroup:t.boardingGroup,conflicts:{},closed:!1}}if("INVALID_GUEST"===o.responseStatus||"CLOSED_QUEUE"===o.responseStatus){const n="CLOSED_QUEUE"===o.responseStatus,r=new Set,s={};for(const e of o.conflicts)for(const n of e.guestIds){const o=t.find((e=>e.guestId===n));o&&(s[o.guestId]=e.conflictType,r.add(n))}const i=t.filter((e=>!r.has(e.guestId)));if(n||0===i.length)return{boardingGroup:null,conflicts:s,closed:n};const l=await this.joinQueue(e,i);return l.conflicts=a(a({},s),l.conflicts),l}throw new H(o)}async post(e){const{status:t,data:n}=await this.fetch(U(e.resource),{method:"POST",headers:{"Content-Type":"application/json",Authorization:`BEARER ${await this.getAccessToken()}`},body:"data"in e?JSON.stringify(e.data):""});if(t>=500)throw new H(n);return n}}((async function(e,t={}){const n=await fetch(e,t);return{status:n.status,data:await n.json()}}),(()=>Ie.get()));var Ee,Te,qe,Ae,De,Ge;Ee=p(Se,{accessToken:Ie,client:Pe}),Te=Ce,e.__&&e.__(Ee,Te),De=(Ae="function"==typeof qe)?null:qe&&qe.__k||Te.__k,Ge=[],T(Te,Ee=(!Ae&&qe||Te).__k=p(g,null,[Ee]),De||c,c,void 0!==Te.ownerSVGElement,!Ae&&qe?[qe]:De?null:Te.firstChild?_.slice.call(Te.childNodes):null,Ge,!Ae&&qe?qe:De?De.__e:Te.firstChild,Ae),q(Ge,Ee);
