!function(){"use strict";const e="SRData";function n(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function t(e){const t={},s=function(n=e.cssSelector){if(t[n])return t[n];{const e=document.querySelectorAll(n);return t[n]=e}};let r=!0;const o={},l=function(n=e.cssSelector){if(o[n])return o[n];{const e=s(n);if(!e||0===e.length)return r=!1,o[n]="";const t=[...e].map(e=>e.innerHTML).join("$$$$$D$E$L$I$M$$$$$");return o[n]=t}},i=(e.isRegex?e.openDelim:n(e.openDelim))+"((?:.|\\n|\\r)*?)"+(e.isRegex?e.closeDelim:n(e.closeDelim)),c={},a=function(n=e.cssSelector){if(c[n])return c[n];{const e=[],t=l(n);let s;try{s=RegExp(i,"gm")}catch{return r=!1,c[n]=[]}let o=s.exec(t);for(;o;)e.push(o[1]),o=s.exec(t);return c[n]=e}},f={},d=function(n=e.cssSelector){if(f[n])return f[n];{const t=[],s=a(n);for(const[n,r]of s.entries()){const s=r.split(e.isRegex?new RegExp(e.fieldSeparator):e.fieldSeparator).map((e,t)=>[n,t,e]);t.push(s)}return f[n]=t}},u=function(t,r,o,i,c,f=e.cssSelector){const m=function(e,n){const t=e.find(e=>"default"===e.name).stylings;e.forEach(e=>{e.stylings.randomIndices=n[e.name]||[],e.stylings.nextIndex=0});return{defaultStyle:t,propAccessor:function(n,s=t){const r=n?e.find(e=>e.name===n).stylings:s,o=function(e,n){return void 0===n?void 0!==r[e]?r[e]:s[e]:void 0===r[e]||void 0===r[e][n]?s[e][n]:r[e][n]};let l;return{getProp:o,getColorIndex:function(){let e;return void 0===l?o("colors","collectiveIndexing")&&o("colors","randomStartIndex")?0===o("colors","randomIndices").length?(e=Math.floor(Math.random()*o("colors","values").length),o("randomIndices").push(e)):e=0===o("nextIndex")?o("randomIndices")[0]:o("nextIndex")%o("colors","values").length:o("colors","collectiveIndexing")?e=o("nextIndex")%o("colors","values").length:o("colors","randomStartIndex")?(e=Math.floor(Math.random()*o("colors","values").length),o("randomIndices").push(e)):e=0:e=++l%o("colors","values").length,l=e,r.nextIndex=l+1,e}}},exportIndices:function(){const n={};return e.forEach(e=>{n[e.name]=e.stylings.randomIndices}),n}}}(r,i),p=Array(t.length);for(const[e,n]of t.entries()){const t=[],s=o[e],r=m.propAccessor(s);"sort"===r.getProp("display")?n.rendering.sort():"orig"===r.getProp("display")&&(n.rendering=c.find(n=>n.name===e).elements);for(const[e,s]of n.rendering.entries())if("d"!==s[3]){const e=r.getColorIndex(),n=r.getProp("colors","values")?` color: ${r.getProp("colors","values")[e]};`:"",o=`class="set-randomizer--element set-randomizer--element-index-${s[0]}-${s[1]}"`,l="block"===r.getProp("display")?" display: block;":"",i=`style="padding: 0px ${r.getProp("fieldPadding")}px;${n}${l}"`,c="block"===r.getProp("display")?`<record ${o} ${i}><div>${h=s[2],h.replace(RegExp("</div><div>","g"),"<br>").replace(RegExp("<div>","g"),"<br>")}</div></record>`:`<record ${o} ${i}>${s[2]}</record>`;t.push(c)}"none"===r.getProp("display")?p[n.order]="":0===t.length||"empty"===r.getProp("display")?p[n.order]=`${r.getProp("openDelim")}`+`${r.getProp("emptySet")}`+`${r.getProp("closeDelim")}`:p[n.order]=`${r.getProp("openDelim")}`+`${t.join(r.getProp("fieldSeparator"))}`+`${r.getProp("closeDelim")}`}var h;let g=l(f);for(const[t,s]of a(f).entries())g=g.replace(e.isRegex?new RegExp(`${e.openDelim}${n(s)}${e.closeDelim}`):`${e.openDelim}${s}${e.closeDelim}`,`${p[t]}`);const $=s(f);if(g.split("$$$$$D$E$L$I$M$$$$$").forEach((e,n)=>$[n].innerHTML=e),"div#clozed"===f){const e=d("div#original").flat();if(e.length>0){const n=t.map(n=>({rendering:n.rendering.map(n=>[n[0],n[1],e.find(e=>e[0]===n[0]&&e[1]===n[1])[2],n[3]]),order:n.order}));u(n,renderDirectives,i,"div#original")}}return m.exportIndices()};return{getOriginalStructure:d,renderSets:u,isValid:r}}function s(e){for(var n,t,s=e.length;0!==s;)t=Math.floor(Math.random()*s),n=e[s-=1],e[s]=e[t],e[t]=n;return e}function r(e){return e.map(e=>({name:e.name,length:e.elements.length,sets:[e.name],setLengths:[e.elements.length],order:s([...new Array(e.elements.length).keys()]),lastMinute:e.lastMinute}))}function o(e,n){return e.map(e=>{const t=e.sets.map(e=>n.filter(n=>n.name===e)).map(e=>e[0].elements.length),r=t.reduce((e,n)=>e+n,0);return{name:e.name,length:r,sets:e.sets,setLengths:t,order:s([...new Array(r).keys()]),lastMinute:e.lastMinute}})}function l(e,n){const t=function(e){return e.map(e=>e.elements).map(e=>e.map(e=>[e[0],e[1],e[2],"n"]))}(e);JSON.parse(JSON.stringify(t));return[t,[r(e),o(n,e)].flat()]}function i(e,n){n-=e.length*Math.floor(n/e.length),e.push.apply(e,e.splice(0,n))}function c(e,n){const t=[];for(const n of e)t.push(n);for(const e of n)t.includes(e)||t.push(e);return t}function a(e,n){const t=[];for(const s of n){const n=e[s];n&&t.push(n)}if(n.length<e.length)for(const s of Array.from(new Array(e.length-n.length),(e,t)=>t+n.length))t.push(e[s]);return t}function f(e,n){const t=[];let s=0;for(const r of n)t.push(e.slice(s,s+r)),s+=r;return t}function d(e,n,t){const s=[];for(const r of e){let e;(e=t.find(e=>r.name===e.to))?s.push(n.find(n=>n.name===e.from)):(e=n.find(e=>r.name===e.name))?s.push({name:r.name,length:r.length,sets:r.sets,setLengths:r.setLengths,order:c(e.order,r.order),lastMinute:r.lastMinute}):s.push(r)}return s}function u(e,n){e.sort((e,n)=>e[0]===n[0]?0:"c"===e[0]?-1:"m"===e[0]&&"d"===n[0]?-1:"m"===e[0]&&"c"===n[0]?1:"d"===e[0]?1:void 0).forEach(e=>(function(e,n){const t=e[0],s=e[2],r=e[3],o=e[4],l=e[5];let c;switch(typeof s){case"number":c=n[s];break;case"object":c=s.flatMap(e=>n[e])}if(c.length<=r||r<-c.length)return;i(c,r);const a=[];let f=e[1];for(const e of c){const n=e[3];if("d"!==n&&"c"!==n&&(a.push(e.slice(0)),"d"!==t&&"m"!==t||(e[3]="d"),0==--f))break}if(a.forEach(e=>e.splice(3,1,"c")),("c"===t||"m"===t)&&a.length>0){let e=l,t=0;for(;e>0;)t+=n[o].slice(t).findIndex(e=>"n"===e[3]||"d"===e[3]),t++,e--;n[o].splice(t,0,...a)}i(c,-r)})(e,n))}const m="[a-zA-Z_]\\w*";function p(e,n,t,s,r,o,l,i){let c;if(t)c=[Number(t)];else if(s){const n=Number(s.slice(1));c=[e.length+n-1]}else if(o){const n=r+Number(o);c=e[n]?[n]:[]}else if(l){const t=n.find(e=>e.name===l),s=t?t.sets:[];if(t&&i){const n=Number(i)>=0?Number(i):e.length+Number(i)-1;c=s[n]>=0?[s[n]]:[]}else c=s}else c=[r];return c}function h(e,n,t,s){const r=Math.random()*(n-e)+e;return s?r.toFixed(t||2):(Math.round(r)*(t||1)).toString()}function g(e,n){const t=[],s=[],r=[],o=[],l=new RegExp("^\\$(?:evaluate|eval|e)\\("+`(?:(${m})(?:(?::(n(?:-\\d+)?|-\\d|\\d+))?:(n(?:-\\d+)?|-\\d|\\d+))?)`+`(?:\\s*,\\s*(${m}))?\\)`),i=new RegExp("^\\$(?:generate|gen|g)\\("+`(${m})\\s*,\\s*`+"\\[((?:.|\\n|\\r)*)\\]\\)","m"),c=new RegExp(`^\\$(${m})(?!\\()(\\W)((?:.|\\n|\\r)*)`),a=new RegExp("\\\\'","g"),f=new RegExp('\\\\"',"g"),d=new RegExp("\\\\n","g"),u=new RegExp("\\\\.","g");for(const n of e.flat()){let e;if(e=n[2].match(i)){const t=[],s=new RegExp("(?:'((?:.|\\n|\\r)*?[^\\\\])'|\"((?:.|\\n|\\r)*?[^\\\\])\")","gm");let r=s.exec(n[2]);for(;r;)r[1]?t.push(r[1].replace(a,"'").replace(d,"<br/>").replace(u,e=>e.slice(1))):r[2]&&t.push(r[2].replace(f,'"').replace(d,"<br/>").replace(u,e=>e.slice(1))),r=s.exec(n[2]);o.push({name:e[1],elements:t,idx:0,set:n[0],pos:n[1]})}else(e=n[2].match(c))?o.push({name:e[1],elements:e[3].replace(new RegExp(`\\\\${e[2]}`,"g")).replace(d,"<br/>").replace(u,e=>e.slice(1)).split(e[2]),idx:0,set:n[0],pos:n[1]}):(e=n[2].match(l))&&e[1]&&r.push([e[1],e[2]||"*",e[3]||"*"])}const p=new RegExp("^\\$(n|name)!\\(\\)$"),g=new RegExp("^\\$(?:pick|p)\\((?:(\\d+(?:\\.\\d*)?):(\\d+(?:\\.\\d*)?)(?::(\\d+))?|"+`(${m})(?::(n(?:-\\d+)?|-\\d|\\d+))?)`+`(?:\\s*,\\s*(${m}))?\\)`),$=new RegExp("^[^\\$]"),x=[];for(const[l,a]of e.entries()){const e=[];let f=!1;for(const t of a){let l;if(p.test(t[2]))f=!0;else if(l=t[2].match(g)){const r=l[6],o=l[1],i=l[2],c=l[3],a=l[4],f=Number(l[5]);r&&!x.find(e=>e.name===r)&&x.push({name:r,values:[]});const d=t[0],u=t[1];let m,p;if(p=n.find(e=>e[0]===d&&e[1]===u))m=p[2];else if(o&&i){const e=o.includes(".")||i.includes(".");if(m=h(Number(o),Number(i),Number(c),e),r){let n=0;const t=1e3;for(;x.find(e=>e.name===r).values.includes(m)&&n<t;)m=h(Number(o),Number(i),Number(c),e),n++;n==t&&(m=null)}}else{const e=generatorSets.find(e=>e.name===a);if(e&&(m="number"!=typeof f||Number.isNaN(f)?e.elements[Math.floor(Math.random()*e.elements.length)]:f>=0?e.elements[e.elements.length<=f?null:f]:e.elements[e.elements.length+f<0?null:e.elements.length+f],r)){let n=0;const t=1e3;for(;x.find(e=>e.name===r).values.includes(m)&&n<t;){const t=Math.floor(Math.random()*e.elements.length);m=e.elements[t],n++}n==t&&(m=null)}}if(m){const n=[d,u,m];r&&x.find(e=>e.name===r).values.push(m),s.push(n),e.push(n)}}else if(i.test(t[2])||c.test(t[2])){const n=r.reverse();console.log(n);const l=o.find(e=>e.set===t[0]&&e.pos===t[1]);if(l){const r=n.find(e=>e[0]===l.name&&(e[1]===l.idx||"*"===e[1]));if(console.log(l),r){const n=[t[0],t[1],l.elements["*"===r?Math.floor(Math.random()*l.elements.length):r[2]]];s.push(n),e.push(n)}}}else($.test(t[2])||0===t[2].length)&&e.push(t)}t.push({name:l,elements:e,lastMinute:f})}return[t,s]}function $(e,n,t,s,r,o,l){if(e){const n=Number(e);return o<=n?[[],!0]:[[n],!0]}if(n){const e=r+Number(n);return e<0?[[],!0]:o<e?[[],!0]:[[e],!0]}if(t){const e=o+(Number(t)-1);return e<0?[[],!0]:[[e],!0]}if(s){const e=l.find(e=>e.name===s);return e?[e.sets,!0]:[[],!0]}return[[r],!1]}const x=function(e,n,t,s,r,o){return void 0!==e?e:void 0!==n?n:t?0:r.find(e=>e.name===s).elements.reduce((e,n)=>n[1]<o?e+1:e,0)};function y(e,n){if(!n||e.length!==n.length)return!1;for(let t=0,s=e.length;t<s;t++)if(e[t]instanceof Array&&n[t]instanceof Array){if(!y(e[t],n[t]))return!1}else if(e[t]!=n[t])return!1;return!0}function v(e,n){const t=[];for(const s of e)for(const e of n)!y(s.map(e=>e[2]),e.map(e=>e[2]))||t.find(n=>n.from===e[0][0])||t.find(e=>e.to===s[0][0])||t.push({from:e[0][0],to:s[0][0]});return t}function E(e,n,s,r,o,i,c,a){const f=t(n),u=f.getOriginalStructure();if(f.isValid&&(!e||!f.isContained)&&u.length>0){const e=v(u,r),[n,t]=g(u,function(e,n){const t=[];for(const s of n){const n=e.find(e=>e.from===s[0]);n&&t.push([n.to,s[1],s[2]])}return t}(v(u,r),o)),h=function(e){const n=new RegExp("\\$(?:name|n)(!)?\\("+`(${m})`+"(?:\\s*,\\s*(?:(\\d+)|(n-\\d+)|((?:\\+|-)\\d+)|"+`(${m})(?::(n-\\d+|-\\d|\\d+))?`+"))?\\)$"),t=[];return e.flat().map(e=>[...e,e[2].match(n)]).filter(e=>e[3]).reduce((e,n)=>(n[3][3]||n[3][4]||n[3][5]||n[3][6]||n[3][7]?e.push(n):e.unshift(n),e),[]).forEach(n=>{const[s,r,o,l,i,c,a,f]=n[3],d=p(e,t,l,i,n[0],c,a,f);let u=t.find(e=>e.name===o);if(!u){const e=t.push({name:o,lastMinute:!1,sets:[]});u=t[e-1]}u.sets.push(...d),u.sets.sort(),r&&(u.lastMinute=!0)}),t}(u),y=function(e,n){const t=[],s=new RegExp("\\$(?:order|ord|o)(!)?\\("+`(${m})`+"(?:\\s*,\\s*(?:(\\d+)|(n-\\d+)|((?:\\+|-)\\d+)|"+`(${m})(?::(n-\\d+|-\\d|\\d+))?`+"))?\\)$");return e.flat().map(e=>[...e,e[2].match(s)]).filter(e=>e[3]).forEach(s=>{const[r,o,l,i,c,a,f,d]=s[3],u=f&&!d?[f]:p(e,n,i,c,s[0],a,f,d);let m=t.find(e=>e.name===l);if(!m){const e=t.push({name:l,lastMinute:!1,sets:[],dictator:!1});m=t[e-1]}m.sets.push(...u),m.sets.sort(),o&&(m.lastMinute=!0)}),t}(u,h),E=function(e,n,t){const s=[],r=`(?:(\\d+)|((?:\\+|-)\\d+)|n(-\\d+)|(${m}))`,o=new RegExp("^\\$(?:(c|copy)|(m|move)|(d|del|delete))\\((?:(\\d+)(?:\\s*,\\s*"+`${r}(?::(?:\\+?(\\d+)|n?(-\\d+)))?`+"(?:\\s*,\\s*"+`${r}(?::(?:\\+?(\\d+)|n?(-\\d+)))?`+")?)?)?\\)$");for(const r of e.flat()){const l=r[2].match(o);if(l){const o=l[1]?"c":l[2]?"m":l[3]?"d":"",i=l[4]?Number(l[4]):999,[c,a]=$(l[11],l[12],l[13],l[14],r[0],e.length,t),f=x(l[15],l[16],a,c[0]?c[0]:r[0],n,r[1]),[d,u]=n.filter(e=>c.includes(e.name)).reduce((e,n,t,s)=>e[1]-(n.elements.length+1)<0?[e[0]||n.name,e[1]]:[null,e[1]-(n.elements.length+1)],[null,f]),[m,p]=$(l[5],l[6],l[7],l[8],r[0],e.length,t),h=x(l[9],l[10],!0,r[0],n,r[1]);null!==m&&null!==d&&i>0&&s.push([o,i,m,h,d,u])}}return s}(u,n,h),[b,S]=function(e,n,t){const s=[{name:"default",stylings:n},{name:"none",stylings:{display:"none"}},{name:"block",stylings:{display:"block",openDelim:"",closeDelim:"",fieldPadding:0}}],r=new RegExp("^\\$(?:style|s)\\("+`(${m})`+"\\s*,\\s(.*)\\)$"),o=new RegExp(":(.*)$");e.flat().map(e=>[...e,e[2].match(r)]).filter(e=>e[3]).forEach(e=>{const[n,t,r]=e[3];let l=s.find(e=>e.name===t);if(!l){const e=s.push({name:t,stylings:{}});l=s[e-1]}r.split(",").map(e=>e.trim()).forEach(e=>{if(e.startsWith("od:")||e.startsWith("openDelim:"))l.stylings.openDelim=e.match(o)[1];else if(e.startsWith("cd:")||e.startsWith("closeDelim:"))l.stylings.closeDelim=e.match(o)[1];else if(e.startsWith("fs:")||e.startsWith("fieldSeparator:"))l.stylings.fieldSeparator=e.match(o)[1];else if(e.startsWith("fp:")||e.startsWith("fieldPadding:")){const n=Number(e.match(o)[1]);n>=0&&(l.stylings.fieldPadding=n)}else if(e.startsWith("clrs:")||e.startsWith("colors:")){const n=e.match(o)[1].split(":");l.stylings.colors=n}else if(e.startsWith("ci:")||e.startsWith("collectiveIndexing:")){const n=e.match(o)[1],t="true"===n||"false"!==n&&null;"boolean"==typeof t&&(l.stylings.collectiveIndexing=t)}else if(e.startsWith("rsi:")||e.startsWith("randomStartIndex:")){const n=e.match(o)[1],t="true"===n||"false"!==n&&null;"boolean"==typeof t&&(l.stylings.randomStartIndex=t)}else(e.startsWith("dp:")||e.startsWith("display:"))&&(l.stylings.display=e.match(o)[1])})});const l=[],i=new RegExp("^\\$(?:apply|app|a)\\("+`(${m})`+"(?:\\s*,\\s(?:(\\d+)|(n-\\d+)|((?:\\+|-)\\d+)|"+`(${m})(?::(\\d+|n?-\\d+))?`+"))?\\)$");return e.flat().map(e=>[...e,e[2].match(i)]).filter(e=>e[3]).forEach(n=>{const[r,o,i,c,a,f,d]=n[3];s.find(e=>e.name===o)&&p(e,t,i,c,n[0],a,f,d).forEach(e=>l[e]=o)}),[s,l]}(u,s,h),[R,I]=l(n,h),w=d(I,i,e);M(w,R,y,E);const[P,N]=g(R.map(e=>e.filter(e=>"d"!==e[3])),[]),[D,W]=l(P.map((e,t)=>({name:e.name,elements:e.elements,lastMinute:n[t].lastMinute})),h),A=d(W,c,e);return M(A.filter(e=>e.lastMinute),D,y.filter(e=>e.lastMinute),[]),[u,t,w,A,f.renderSets(function(e,n){const t=Array(n.length);for(const[s,r]of n.map((e,n)=>({rendering:e,order:n})).entries()){const n=e.find(e=>s===e.to);n?t[n.from]=r:t.push(r)}return t.filter(e=>void 0!==e)}(e,D),b,S,a,n)]}return[u,[],[],[],{}]}function M(e,n,t,s){var r;r=e,t.forEach(e=>(function(e,n){const t=function(e,n){return e.sets.map(e=>({name:e,length:n.find(n=>n.name===e).length})).reduce((e,n)=>e.length<n.length?n:e).name}(e,n);e.dictator=t;const s=n.find(n=>n.name===e.dictator).order;for(const t of e.sets){const r=n.find(e=>e.name===t).order,o=s.filter(e=>e<r.length);n.forEach(n=>{n.name===t&&(n.order=o,e.lastMinute&&(n.lastMinute=!0))})}return n})(e,r)),function(e,n){const t=e.slice(0).sort((e,n)=>e.sets.length>n.sets.length?-1:e.sets.length<n.sets.length?1:"string"==typeof e.name?-1:1),s=[];for(const e of t)s.reduce((n,t)=>n||e.sets.every(e=>t.includes(e)),!1)||(f(a(e.sets.map(e=>n[e]).flat(),e.order),e.setLengths).forEach((t,s)=>{n[e.sets[s]]=t}),s.push(e.sets))}(e,n),u(s,n)}var b;!window.Persistence||!Persistence.isAvailable()||null!==document.querySelector("div#qa")&&new RegExp("// SET RANDOMIZER BACK TEMPLATE").test(document.querySelector("div#qa").innerHTML)||(b=$$options.reduce((e,n)=>{const t=E(!0,n.inputSyntax,n.defaultStyle,...e[1]);return[(e[0].push([n.inputSyntax,n.defaultStyle,...t]),e[0]),t]},[[],[[],[],[],[],{}]])[0],Persistence.removeItem(e),Persistence.setItem(e,b))}();
