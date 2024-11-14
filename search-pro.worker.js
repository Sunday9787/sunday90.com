const nt="ENTRIES",V="KEYS",T="VALUES",F="";class D{set;_type;_path;constructor(t,s){const n=t._tree,u=Array.from(n.keys());this.set=t,this._type=s,this._path=u.length>0?[{node:n,keys:u}]:[]}next(){const t=this.dive();return this.backtrack(),t}dive(){if(this._path.length===0)return{done:!0,value:void 0};const{node:t,keys:s}=E(this._path);if(E(s)===F)return{done:!1,value:this.result()};const n=t.get(E(s));return this._path.push({node:n,keys:Array.from(n.keys())}),this.dive()}backtrack(){if(this._path.length===0)return;const t=E(this._path).keys;t.pop(),!(t.length>0)&&(this._path.pop(),this.backtrack())}key(){return this.set._prefix+this._path.map(({keys:t})=>E(t)).filter(t=>t!==F).join("")}value(){return E(this._path).node.get(F)}result(){switch(this._type){case T:return this.value();case V:return this.key();default:return[this.key(),this.value()]}}[Symbol.iterator](){return this}}const E=e=>e[e.length-1],ut=(e,t,s)=>{const n=new Map;if(t===void 0)return n;const u=t.length+1,o=u+s,i=new Uint8Array(o*u).fill(s+1);for(let r=0;r<u;++r)i[r]=r;for(let r=1;r<o;++r)i[r*u]=r;return R(e,t,s,n,i,1,u,""),n},R=(e,t,s,n,u,o,i,r)=>{const d=o*i;t:for(const l of e.keys())if(l===F){const a=u[d-1];a<=s&&n.set(r,[e.get(l),a])}else{let a=o;for(let h=0;h<l.length;++h,++a){const m=l[h],p=i*a,f=p-i;let c=u[p];const g=Math.max(0,a-s-1),_=Math.min(i-1,a+s);for(let y=g;y<_;++y){const b=m!==t[y],z=u[f+y]+ +b,A=u[f+y+1]+1,w=u[p+y]+1,L=u[p+y+1]=Math.min(z,A,w);L<c&&(c=L)}if(c>s)continue t}R(e.get(l),t,s,n,u,a,i,r+l)}};class C{_tree;_prefix;_size=void 0;constructor(t=new Map,s=""){this._tree=t,this._prefix=s}atPrefix(t){if(!t.startsWith(this._prefix))throw new Error("Mismatched prefix");const[s,n]=x(this._tree,t.slice(this._prefix.length));if(s===void 0){const[u,o]=M(n);for(const i of u.keys())if(i!==F&&i.startsWith(o)){const r=new Map;return r.set(i.slice(o.length),u.get(i)),new C(r,t)}}return new C(s,t)}clear(){this._size=void 0,this._tree.clear()}delete(t){return this._size=void 0,ot(this._tree,t)}entries(){return new D(this,nt)}forEach(t){for(const[s,n]of this)t(s,n,this)}fuzzyGet(t,s){return ut(this._tree,t,s)}get(t){const s=I(this._tree,t);return s!==void 0?s.get(F):void 0}has(t){const s=I(this._tree,t);return s!==void 0&&s.has(F)}keys(){return new D(this,V)}set(t,s){if(typeof t!="string")throw new Error("key must be a string");return this._size=void 0,O(this._tree,t).set(F,s),this}get size(){if(this._size)return this._size;this._size=0;const t=this.entries();for(;!t.next().done;)this._size+=1;return this._size}update(t,s){if(typeof t!="string")throw new Error("key must be a string");this._size=void 0;const n=O(this._tree,t);return n.set(F,s(n.get(F))),this}fetch(t,s){if(typeof t!="string")throw new Error("key must be a string");this._size=void 0;const n=O(this._tree,t);let u=n.get(F);return u===void 0&&n.set(F,u=s()),u}values(){return new D(this,T)}[Symbol.iterator](){return this.entries()}static from(t){const s=new C;for(const[n,u]of t)s.set(n,u);return s}static fromObject(t){return C.from(Object.entries(t))}}const x=(e,t,s=[])=>{if(t.length===0||e==null)return[e,s];for(const n of e.keys())if(n!==F&&t.startsWith(n))return s.push([e,n]),x(e.get(n),t.slice(n.length),s);return s.push([e,t]),x(void 0,"",s)},I=(e,t)=>{if(t.length===0||e==null)return e;for(const s of e.keys())if(s!==F&&t.startsWith(s))return I(e.get(s),t.slice(s.length))},O=(e,t)=>{const s=t.length;t:for(let n=0;e&&n<s;){for(const o of e.keys())if(o!==F&&t[n]===o[0]){const i=Math.min(s-n,o.length);let r=1;for(;r<i&&t[n+r]===o[r];)++r;const d=e.get(o);if(r===o.length)e=d;else{const l=new Map;l.set(o.slice(r),d),e.set(t.slice(n,n+r),l),e.delete(o),e=l}n+=r;continue t}const u=new Map;return e.set(t.slice(n),u),u}return e},ot=(e,t)=>{const[s,n]=x(e,t);if(s!==void 0){if(s.delete(F),s.size===0)W(n);else if(s.size===1){const[u,o]=s.entries().next().value;q(n,u,o)}}},W=e=>{if(e.length===0)return;const[t,s]=M(e);if(t.delete(s),t.size===0)W(e.slice(0,-1));else if(t.size===1){const[n,u]=t.entries().next().value;n!==F&&q(e.slice(0,-1),n,u)}},q=(e,t,s)=>{if(e.length===0)return;const[n,u]=M(e);n.set(u+t,s),n.delete(u)},M=e=>e[e.length-1],it=(e,t)=>{const s=e._idToShortId.get(t);if(s!=null)return e._storedFields.get(s)},rt=/[\n\r -#%-*,-/:;?@[-\]_{}\u00A0\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u1680\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2000-\u200A\u2010-\u2029\u202F-\u2043\u2045-\u2051\u2053-\u205F\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u3000-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]+/u,S="or",$="and",ct="and_not",lt=(e,t)=>{e.includes(t)||e.push(t)},P=(e,t)=>{for(const s of t)e.includes(s)||e.push(s)},N=({score:e},{score:t})=>t-e,ht=()=>new Map,k=e=>{const t=new Map;for(const s of Object.keys(e))t.set(parseInt(s,10),e[s]);return t},G=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)?e[t]:void 0,dt={[S]:(e,t)=>{for(const s of t.keys()){const n=e.get(s);if(n==null)e.set(s,t.get(s));else{const{score:u,terms:o,match:i}=t.get(s);n.score=n.score+u,n.match=Object.assign(n.match,i),P(n.terms,o)}}return e},[$]:(e,t)=>{const s=new Map;for(const n of t.keys()){const u=e.get(n);if(u==null)continue;const{score:o,terms:i,match:r}=t.get(n);P(u.terms,i),s.set(n,{score:u.score+o,terms:u.terms,match:Object.assign(u.match,r)})}return s},[ct]:(e,t)=>{for(const s of t.keys())e.delete(s);return e}},at=(e,t,s,n,u,o)=>{const{k:i,b:r,d}=o;return Math.log(1+(s-t+.5)/(t+.5))*(d+e*(i+1)/(e+i*(1-r+r*n/u)))},ft=e=>(t,s,n)=>{const u=typeof e.fuzzy=="function"?e.fuzzy(t,s,n):e.fuzzy||!1,o=typeof e.prefix=="function"?e.prefix(t,s,n):e.prefix===!0;return{term:t,fuzzy:u,prefix:o}},H=(e,t,s,n)=>{for(const u of Object.keys(e._fieldIds))if(e._fieldIds[u]===s){e._options.logger("warn",`SlimSearch: document with ID ${e._documentIds.get(t)} has changed before removal: term "${n}" was not present in field "${u}". Removing a document after it has changed can corrupt the index!`,"version_conflict");return}},gt=(e,t,s,n)=>{if(!e._index.has(n)){H(e,s,t,n);return}const u=e._index.fetch(n,ht),o=u.get(t);o==null||o.get(s)==null?H(e,s,t,n):o.get(s)<=1?o.size<=1?u.delete(t):o.delete(s):o.set(s,o.get(s)-1),e._index.get(n).size===0&&e._index.delete(n)},mt={k:1.2,b:.7,d:.5},pt={idField:"id",extractField:(e,t)=>e[t],tokenize:e=>e.split(rt),processTerm:e=>e.toLowerCase(),fields:void 0,searchOptions:void 0,storeFields:[],logger:(e,t)=>{typeof console?.[e]=="function"&&console[e](t)},autoVacuum:!0},J={combineWith:S,prefix:!1,fuzzy:!1,maxFuzzy:6,boost:{},weights:{fuzzy:.45,prefix:.375},bm25:mt},Ft={combineWith:$,prefix:(e,t,s)=>t===s.length-1},_t={batchSize:1e3,batchWait:10},U={minDirtFactor:.1,minDirtCount:20},yt={..._t,...U},Y=(e,t=S)=>{if(e.length===0)return new Map;const s=t.toLowerCase();return e.reduce(dt[s])||new Map},B=(e,t,s,n,u,o,i,r,d=new Map)=>{if(u==null)return d;for(const l of Object.keys(o)){const a=o[l],h=e._fieldIds[l],m=u.get(h);if(m==null)continue;let p=m.size;const f=e._avgFieldLength[h];for(const c of m.keys()){if(!e._documentIds.has(c)){gt(e,h,c,s),p-=1;continue}const g=i?i(e._documentIds.get(c),s,e._storedFields.get(c)):1;if(!g)continue;const _=m.get(c),y=e._fieldLength.get(c)[h],b=at(_,p,e._documentCount,y,f,r),z=n*a*g*b,A=d.get(c);if(A){A.score+=z,lt(A.terms,t);const w=G(A.match,s);w?w.push(l):A.match[s]=[l]}else d.set(c,{score:z,terms:[t],match:{[s]:[l]}})}}return d},At=(e,t,s)=>{const n={...e._options.searchOptions,...s},u=(n.fields||e._options.fields).reduce((c,g)=>({...c,[g]:G(n.boost,g)||1}),{}),{boostDocument:o,weights:i,maxFuzzy:r,bm25:d}=n,{fuzzy:l,prefix:a}={...J.weights,...i},h=e._index.get(t.term),m=B(e,t.term,t.term,1,h,u,o,d);let p,f;if(t.prefix&&(p=e._index.atPrefix(t.term)),t.fuzzy){const c=t.fuzzy===!0?.2:t.fuzzy,g=c<1?Math.min(r,Math.round(t.term.length*c)):c;g&&(f=e._index.fuzzyGet(t.term,g))}if(p)for(const[c,g]of p){const _=c.length-t.term.length;if(!_)continue;f?.delete(c);const y=a*c.length/(c.length+.3*_);B(e,t.term,c,y,g,u,o,d,m)}if(f)for(const c of f.keys()){const[g,_]=f.get(c);if(!_)continue;const y=l*c.length/(c.length+_);B(e,t.term,c,y,g,u,o,d,m)}return m},X=(e,t,s={})=>{if(typeof t!="string"){const a={...s,...t,queries:void 0},h=t.queries.map(m=>X(e,m,a));return Y(h,a.combineWith)}const{tokenize:n,processTerm:u,searchOptions:o}=e._options,i={tokenize:n,processTerm:u,...o,...s},{tokenize:r,processTerm:d}=i,l=r(t).flatMap(a=>d(a)).filter(a=>!!a).map(ft(i)).map(a=>At(e,a,i));return Y(l,i.combineWith)},K=(e,t,s={})=>{const n=X(e,t,s),u=[];for(const[o,{score:i,terms:r,match:d}]of n){const l=r.length,a={id:e._documentIds.get(o),score:i*l,terms:Object.keys(d),match:d};Object.assign(a,e._storedFields.get(o)),(s.filter==null||s.filter(a))&&u.push(a)}return u.sort(N),u},Ct=(e,t,s={})=>{s={...e._options.autoSuggestOptions,...s};const n=new Map;for(const{score:o,terms:i}of K(e,t,s)){const r=i.join(" "),d=n.get(r);d!=null?(d.score+=o,d.count+=1):n.set(r,{score:o,terms:i,count:1})}const u=[];for(const[o,{score:i,terms:r,count:d}]of n)u.push({suggestion:o,terms:r,score:i/d});return u.sort(N),u};class Et{_options;_index;_documentCount;_documentIds;_idToShortId;_fieldIds;_fieldLength;_avgFieldLength;_nextId;_storedFields;_dirtCount;_currentVacuum;_enqueuedVacuum;_enqueuedVacuumConditions;constructor(t){if(t?.fields==null)throw new Error('SlimSearch: option "fields" must be provided');const s=t.autoVacuum==null||t.autoVacuum===!0?yt:t.autoVacuum;this._options={...pt,...t,autoVacuum:s,searchOptions:{...J,...t.searchOptions||{}},autoSuggestOptions:{...Ft,...t.autoSuggestOptions||{}}},this._index=new C,this._documentCount=0,this._documentIds=new Map,this._idToShortId=new Map,this._fieldIds={},this._fieldLength=new Map,this._avgFieldLength=[],this._nextId=0,this._storedFields=new Map,this._dirtCount=0,this._currentVacuum=null,this._enqueuedVacuum=null,this._enqueuedVacuumConditions=U,this.addFields(this._options.fields)}get isVacuuming(){return this._currentVacuum!=null}get dirtCount(){return this._dirtCount}get dirtFactor(){return this._dirtCount/(1+this._documentCount+this._dirtCount)}get documentCount(){return this._documentCount}get termCount(){return this._index.size}toJSON(){const t=[];for(const[s,n]of this._index){const u={};for(const[o,i]of n)u[o]=Object.fromEntries(i);t.push([s,u])}return{documentCount:this._documentCount,nextId:this._nextId,documentIds:Object.fromEntries(this._documentIds),fieldIds:this._fieldIds,fieldLength:Object.fromEntries(this._fieldLength),averageFieldLength:this._avgFieldLength,storedFields:Object.fromEntries(this._storedFields),dirtCount:this._dirtCount,index:t,serializationVersion:2}}addFields(t){for(let s=0;s<t.length;s++)this._fieldIds[t[s]]=s}}const zt=({index:e,documentCount:t,nextId:s,documentIds:n,fieldIds:u,fieldLength:o,averageFieldLength:i,storedFields:r,dirtCount:d,serializationVersion:l},a)=>{if(l!==1&&l!==2)throw new Error("SlimSearch: cannot deserialize an index created with an incompatible version");const h=new Et(a);h._documentCount=t,h._nextId=s,h._documentIds=k(n),h._idToShortId=new Map,h._fieldIds=u,h._fieldLength=k(o),h._avgFieldLength=i,h._storedFields=k(r),h._dirtCount=d||0,h._index=new C;for(const[m,p]of h._documentIds)h._idToShortId.set(p,m);for(const[m,p]of e){const f=new Map;for(const c of Object.keys(p)){let g=p[c];l===1&&(g=g.ds),f.set(parseInt(c,10),k(g))}h._index.set(m,f)}return h},Q=Object.entries,wt=Object.fromEntries,j=(e,t)=>{const s=e.toLowerCase(),n=t.toLowerCase(),u=[];let o=0,i=0;const r=(l,a=!1)=>{let h="";i===0?h=l.length>20?`… ${l.slice(-20)}`:l:a?h=l.length+i>100?`${l.slice(0,100-i)}… `:l:h=l.length>20?`${l.slice(0,20)} … ${l.slice(-20)}`:l,h&&u.push(h),i+=h.length,a||(u.push(["mark",t]),i+=t.length,i>=100&&u.push(" …"))};let d=s.indexOf(n,o);if(d===-1)return null;for(;d>=0;){const l=d+n.length;if(r(e.slice(o,d)),o=l,i>100)break;d=s.indexOf(n,o)}return i<100&&r(e.slice(o),!0),u},Z=/[\u4e00-\u9fa5]/g,tt=(e={})=>({fuzzy:.2,prefix:!0,processTerm:t=>{const s=t.match(Z)||[],n=t.replace(Z,"").toLowerCase();return n?[n,...s]:[...s]},...e}),xt=(e,t)=>t.contents.reduce((s,[,n])=>s+n,0)-e.contents.reduce((s,[,n])=>s+n,0),kt=(e,t)=>Math.max(...t.contents.map(([,s])=>s))-Math.max(...e.contents.map(([,s])=>s)),et=(e,t,s={})=>{const n={};return K(t,e,tt({boost:{h:2,t:1,c:4},...s})).forEach(u=>{const{id:o,terms:i,score:r}=u,d=o.includes("@"),l=o.includes("#"),[a,h]=o.split(/[#@]/),m=i.sort((f,c)=>f.length-c.length).filter((f,c)=>i.slice(c+1).every(g=>!g.includes(f))),{contents:p}=n[a]??={title:"",contents:[]};if(d)p.push([{type:"customField",key:a,index:h,display:m.map(f=>u.c.map(c=>j(c,f))).flat().filter(f=>f!==null)},r]);else{const f=m.map(c=>j(u.h,c)).filter(c=>c!==null);if(f.length&&p.push([{type:l?"heading":"title",key:a,...l&&{anchor:h},display:f},r]),"t"in u)for(const c of u.t){const g=m.map(_=>j(c,_)).filter(_=>_!==null);g.length&&p.push([{type:"text",key:a,...l&&{anchor:h},display:g},r])}}}),Q(n).sort(([,u],[,o])=>"max"==="total"?xt(u,o):kt(u,o)).map(([u,{title:o,contents:i}])=>{if(!o){const r=it(t,u);r&&(o=r.h)}return{title:o,contents:i.map(([r])=>r)}})},st=(e,t,s={})=>Ct(t,e,tt(s)).map(({suggestion:n})=>n),v=wt(Q(JSON.parse("{\"/\":{\"documentCount\":177,\"nextId\":177,\"documentIds\":{\"0\":\"v-74bc627b\",\"1\":\"v-fc52599a\",\"2\":\"v-744993e4\",\"3\":\"v-744993e4#目录\",\"4\":\"v-3494bfab\",\"5\":\"v-66ef6463\",\"6\":\"v-336fef16\",\"7\":\"v-336fef16#html\",\"8\":\"v-336fef16#javascript\",\"9\":\"v-336fef16#php\",\"10\":\"v-00f888c1\",\"11\":\"v-ee4f0190\",\"12\":\"v-ee4f0190#命名规范\",\"13\":\"v-ee4f0190#项目命名\",\"14\":\"v-ee4f0190#目录命名\",\"15\":\"v-ee4f0190#js、css、scss、html、png-等文件命名\",\"16\":\"v-ee4f0190#命名严谨性\",\"17\":\"v-ee4f0190#css-命名规范\",\"18\":\"v-ee4f0190#id\",\"19\":\"v-ee4f0190#class\",\"20\":\"v-ee4f0190#书写顺序\",\"21\":\"v-ee4f0190#常用的-css-命名规则\",\"22\":\"v-ee4f0190#js-命名规范\",\"23\":\"v-ee4f0190#变量\",\"24\":\"v-ee4f0190#常量\",\"25\":\"v-ee4f0190#函数\",\"26\":\"v-ee4f0190#类\",\"27\":\"v-ee4f0190#类的成员\",\"28\":\"v-704cf638\",\"29\":\"v-704cf638#一个简单的类型约束装饰器\",\"30\":\"v-704cf638#再来一个复杂一点的装饰器\",\"31\":\"v-704cf638#结语\",\"32\":\"v-0569ff96\",\"33\":\"v-0569ff96#前言\",\"34\":\"v-0569ff96#传统的前端ts操作\",\"35\":\"v-0569ff96#我的操作\",\"36\":\"v-0569ff96#class\",\"37\":\"v-0569ff96#model\",\"38\":\"v-0569ff96#class-transformer\",\"39\":\"v-0569ff96#abstract-oop\",\"40\":\"v-0569ff96#服务类-service\",\"41\":\"v-0569ff96#实体类-entity\",\"42\":\"v-0569ff96#子类实现\",\"43\":\"v-0569ff96#view-视图调用\",\"44\":\"v-0569ff96#总结\",\"45\":\"v-765a2c4e\",\"46\":\"v-765a2c4e#前言\",\"47\":\"v-765a2c4e#传统\",\"48\":\"v-765a2c4e#不一样的\",\"49\":\"v-765a2c4e#抽象类-abstractentity\",\"50\":\"v-765a2c4e#实体\",\"51\":\"v-765a2c4e#视图\",\"52\":\"v-765a2c4e#问题\",\"53\":\"v-765a2c4e#weakmap-是什么\",\"54\":\"v-765a2c4e#为什么在-constructor-里要-settimeout\",\"55\":\"v-765a2c4e#为什么在-reset-方法内-需要-toraw-this\",\"56\":\"v-765a2c4e#总结\",\"57\":\"v-749dea32\",\"58\":\"v-749dea32#统一编辑器配置\",\"59\":\"v-749dea32#第一步-配置-prettier-格式化规范\",\"60\":\"v-749dea32#第二步-配置-eslint\",\"61\":\"v-749dea32#第三步-配置-stylelint\",\"62\":\"v-749dea32#第四步-配置-commitlint\",\"63\":\"v-749dea32#第五步-配置-commitizen\",\"64\":\"v-749dea32#第六步-配置-lint-staged\",\"65\":\"v-749dea32#第七步-配置-husky\",\"66\":\"v-749dea32#最后\",\"67\":\"v-538faf04\",\"68\":\"v-538faf04#外观优化\",\"69\":\"v-538faf04#主题色\",\"70\":\"v-538faf04#文件-icon\",\"71\":\"v-538faf04#代码辅助\",\"72\":\"v-538faf04#前端开发必备插件\",\"73\":\"v-538faf04#vue2-开发插件包\",\"74\":\"v-538faf04#vue3-开发插件包\",\"75\":\"v-538faf04#uni-app-开发插件包\",\"76\":\"v-538faf04#功能扩展\",\"77\":\"v-538faf04#提升编码效率\",\"78\":\"v-538faf04#其它插件\",\"79\":\"v-cf4e8152\",\"80\":\"v-38141106\",\"81\":\"v-38141106#权限方案\",\"82\":\"v-38141106#动态路由\",\"83\":\"v-38141106#路由钩子\",\"84\":\"v-38141106#权限命名规范\",\"85\":\"v-38141106#技术细节\",\"86\":\"v-38141106#总结\",\"87\":\"v-63b04892\",\"88\":\"v-63b04892#前言\",\"89\":\"v-63b04892#需求分析\",\"90\":\"v-63b04892#设计\",\"91\":\"v-63b04892#视图\",\"92\":\"v-63b04892#props\",\"93\":\"v-63b04892#实现\",\"94\":\"v-63b04892#初始化\",\"95\":\"v-63b04892#框选\",\"96\":\"v-63b04892#框选完成\",\"97\":\"v-63b04892#最后\",\"98\":\"v-42494cd4\",\"99\":\"v-42494cd4#需求分析\",\"100\":\"v-42494cd4#组件\",\"101\":\"v-42494cd4#实现\",\"102\":\"v-42494cd4#props\",\"103\":\"v-42494cd4#computed\",\"104\":\"v-42494cd4#method\",\"105\":\"v-42494cd4#组件基类\",\"106\":\"v-42494cd4#组件-1\",\"107\":\"v-42494cd4#控件\",\"108\":\"v-42494cd4#控件数据模型\",\"109\":\"v-42494cd4#初始化控件\",\"110\":\"v-42494cd4#props-数据模型\",\"111\":\"v-42494cd4#初始化-控件-props\",\"112\":\"v-42494cd4#property-数据模型\",\"113\":\"v-42494cd4#property-初始化\",\"114\":\"v-42494cd4#propsoption-数据模型\",\"115\":\"v-42494cd4#控件组\",\"116\":\"v-42494cd4#公式\",\"117\":\"v-42494cd4#position\",\"118\":\"v-42494cd4#size\",\"119\":\"v-42494cd4#实现-1\",\"120\":\"v-42494cd4#重写-tohtml\",\"121\":\"v-42494cd4#初始化组\",\"122\":\"v-42494cd4#最后\",\"123\":\"v-7eaf2894\",\"124\":\"v-7eaf2894#前言\",\"125\":\"v-7eaf2894#需求分析\",\"126\":\"v-7eaf2894#视图\",\"127\":\"v-7eaf2894#props\",\"128\":\"v-7eaf2894#缩放移动\",\"129\":\"v-7eaf2894#公式\",\"130\":\"v-7eaf2894#限制范围\",\"131\":\"v-7eaf2894#限制最左边\",\"132\":\"v-7eaf2894#限制最右边\",\"133\":\"v-7eaf2894#限制最上边\",\"134\":\"v-7eaf2894#限制最下边\",\"135\":\"v-7eaf2894#更新位置\",\"136\":\"v-7eaf2894#控制点移动\",\"137\":\"v-7eaf2894#公式-1\",\"138\":\"v-7eaf2894#设计\",\"139\":\"v-7eaf2894#实现\",\"140\":\"v-7eaf2894#控制点按下\",\"141\":\"v-7eaf2894#最后\",\"142\":\"v-21b9fff7\",\"143\":\"v-21b9fff7#前言\",\"144\":\"v-21b9fff7#引言\",\"145\":\"v-21b9fff7#需求分析\",\"146\":\"v-21b9fff7#原型\",\"147\":\"v-21b9fff7#整体架构\",\"148\":\"v-21b9fff7#技术选型\",\"149\":\"v-21b9fff7#项目结构\",\"150\":\"v-21b9fff7#最后\",\"151\":\"v-5b4e8344\",\"152\":\"v-5b4e8344#前言\",\"153\":\"v-5b4e8344#需求分析\",\"154\":\"v-5b4e8344#设计\",\"155\":\"v-5b4e8344#视图\",\"156\":\"v-5b4e8344#组件\",\"157\":\"v-5b4e8344#使用\",\"158\":\"v-5b4e8344#props\",\"159\":\"v-5b4e8344#实现\",\"160\":\"v-5b4e8344#边界判定\",\"161\":\"v-5b4e8344#对比条件\",\"162\":\"v-5b4e8344#遍历对比\",\"163\":\"v-5b4e8344#最后\",\"164\":\"v-79b6f9c0\",\"165\":\"v-79b6f9c0#第一步-配置-入口出口模块\",\"166\":\"v-79b6f9c0#第二步-配置可以被解析的文件\",\"167\":\"v-79b6f9c0#第三步-配置外部资源\",\"168\":\"v-79b6f9c0#第四步-配置-module\",\"169\":\"v-79b6f9c0#最后奉上-最终配置\",\"170\":\"v-6d7b29fe\",\"171\":\"v-361e04ea\",\"172\":\"v-3554d470\",\"173\":\"v-4b36d9e6\",\"174\":\"v-562a9a3e\",\"175\":\"v-4c0c694d\",\"176\":\"v-4a0d7a46\"},\"fieldIds\":{\"h\":0,\"t\":1,\"c\":2},\"fieldLength\":{\"0\":[1,10],\"1\":[1,9],\"2\":[1],\"3\":[1],\"4\":[1],\"5\":[2],\"6\":[1],\"7\":[1],\"8\":[1],\"9\":[1],\"10\":[3,22],\"11\":[1,5],\"12\":[1],\"13\":[1],\"14\":[1],\"15\":[6],\"16\":[1],\"17\":[2],\"18\":[1],\"19\":[1],\"20\":[1],\"21\":[3],\"22\":[2],\"23\":[1],\"24\":[1],\"25\":[1],\"26\":[1],\"27\":[1],\"28\":[2],\"29\":[1],\"30\":[1],\"31\":[1],\"32\":[1],\"33\":[1],\"34\":[1],\"35\":[1],\"36\":[1],\"37\":[1],\"38\":[2],\"39\":[2],\"40\":[2],\"41\":[2],\"42\":[1],\"43\":[2],\"44\":[1],\"45\":[1],\"46\":[1],\"47\":[1],\"48\":[1],\"49\":[2],\"50\":[1],\"51\":[1],\"52\":[1],\"53\":[3],\"54\":[5],\"55\":[7],\"56\":[1],\"57\":[2,14],\"58\":[1],\"59\":[4],\"60\":[3],\"61\":[3],\"62\":[3],\"63\":[3],\"64\":[4],\"65\":[3],\"66\":[1],\"67\":[3],\"68\":[1],\"69\":[1],\"70\":[2],\"71\":[1],\"72\":[1],\"73\":[2],\"74\":[2],\"75\":[3],\"76\":[1],\"77\":[1],\"78\":[1],\"79\":[6,14],\"80\":[1],\"81\":[1],\"82\":[1],\"83\":[1],\"84\":[1],\"85\":[1],\"86\":[1],\"87\":[2],\"88\":[1],\"89\":[1],\"90\":[1],\"91\":[1],\"92\":[1],\"93\":[1],\"94\":[1],\"95\":[1],\"96\":[1],\"97\":[1],\"98\":[2],\"99\":[1],\"100\":[1],\"101\":[1],\"102\":[1],\"103\":[1],\"104\":[1],\"105\":[1],\"106\":[1],\"107\":[1],\"108\":[1],\"109\":[1],\"110\":[2],\"111\":[3],\"112\":[2],\"113\":[2],\"114\":[2],\"115\":[1],\"116\":[1],\"117\":[1],\"118\":[1],\"119\":[1],\"120\":[2],\"121\":[1],\"122\":[1],\"123\":[2],\"124\":[1],\"125\":[1],\"126\":[1],\"127\":[1],\"128\":[1],\"129\":[1],\"130\":[1],\"131\":[1],\"132\":[1],\"133\":[1],\"134\":[1],\"135\":[1],\"136\":[1],\"137\":[1],\"138\":[1],\"139\":[1],\"140\":[1],\"141\":[1],\"142\":[2],\"143\":[1],\"144\":[1],\"145\":[1],\"146\":[1],\"147\":[1],\"148\":[1],\"149\":[1],\"150\":[1],\"151\":[2],\"152\":[1],\"153\":[1],\"154\":[1],\"155\":[1],\"156\":[1],\"157\":[1],\"158\":[1],\"159\":[1],\"160\":[1],\"161\":[1],\"162\":[1],\"163\":[1],\"164\":[2,6],\"165\":[3],\"166\":[2],\"167\":[2],\"168\":[3],\"169\":[2],\"170\":[1],\"171\":[1],\"172\":[1],\"173\":[1],\"174\":[1],\"175\":[1],\"176\":[1]},\"averageFieldLength\":[1.4519774011299436,10.25391065830721],\"storedFields\":{\"0\":{\"h\":\"关于\",\"t\":[\"声明：本站所有文章除特别声明皆为原创，仅代表个人思想，与其他任何人或组织无关！\",\"技术更迭迅猛，部分内容可能会作修改，为保证信息与源同步，转载时请务必注明文章出处！谢谢合作 😁\"]},\"1\":{\"h\":\"友情链接\",\"t\":[\"各位大佬想交换友链的话可以在下方留言，必须要提供名称、头像和链接哦。\",\"名称: xxx\\n头像: xxx\\n地址: xxx\\n标签: 技术大佬\"]},\"2\":{\"h\":\"日志\"},\"3\":{\"h\":\"目录\"},\"4\":{\"h\":\"我的摄影\"},\"5\":{\"h\":\"dom-tips\"},\"6\":{\"h\":\"填字游戏\"},\"7\":{\"h\":\"HTML\"},\"8\":{\"h\":\"JavaScript\"},\"9\":{\"h\":\"PHP\"},\"10\":{\"h\":\"target='_blank'\",\"t\":[\"不知道有没有人跟我一样 打开一个网站喜欢 ctrl + shift + i 😀 不过有时候会发现 a 标签 加了一些东西\",\"<a href=\\\"xxx\\\" target=\\\"_blank\\\" rel=\\\"nofollow noopener noreferrer\\\"> \"]},\"11\":{\"h\":\"前端开发规范\",\"t\":[\"规范不是强制性的，对代码的编写和程序的运行不会有致命的问题，但是没有规范会有一系列的问题，比如：\"]},\"12\":{\"h\":\"命名规范\"},\"13\":{\"h\":\"项目命名\"},\"14\":{\"h\":\"目录命名\"},\"15\":{\"h\":\"JS、CSS、SCSS、HTML、PNG 等文件命名\"},\"16\":{\"h\":\"命名严谨性\"},\"17\":{\"h\":\"css 命名规范\"},\"18\":{\"h\":\"id\"},\"19\":{\"h\":\"class\"},\"20\":{\"h\":\"书写顺序\"},\"21\":{\"h\":\"常用的 CSS 命名规则\"},\"22\":{\"h\":\"JS 命名规范\"},\"23\":{\"h\":\"变量\"},\"24\":{\"h\":\"常量\"},\"25\":{\"h\":\"函数\"},\"26\":{\"h\":\"类\"},\"27\":{\"h\":\"类的成员\"},\"28\":{\"h\":\"Typescript 类型装饰器\"},\"29\":{\"h\":\"一个简单的类型约束装饰器\"},\"30\":{\"h\":\"再来一个复杂一点的装饰器\"},\"31\":{\"h\":\"结语\"},\"32\":{\"h\":\"我是这样写TS的\"},\"33\":{\"h\":\"前言\"},\"34\":{\"h\":\"传统的前端TS操作\"},\"35\":{\"h\":\"我的操作\"},\"36\":{\"h\":\"Class\"},\"37\":{\"h\":\"Model\"},\"38\":{\"h\":\"Class-transformer\"},\"39\":{\"h\":\"Abstract&OOP\"},\"40\":{\"h\":\"服务类：Service\"},\"41\":{\"h\":\"实体类：Entity\"},\"42\":{\"h\":\"子类实现\"},\"43\":{\"h\":\"View 视图调用\"},\"44\":{\"h\":\"总结\"},\"45\":{\"h\":\"我是这样重置数据的\"},\"46\":{\"h\":\"前言\"},\"47\":{\"h\":\"传统\"},\"48\":{\"h\":\"不一样的\"},\"49\":{\"h\":\"抽象类 AbstractEntity\"},\"50\":{\"h\":\"实体\"},\"51\":{\"h\":\"视图\"},\"52\":{\"h\":\"问题\"},\"53\":{\"h\":\"WeakMap 是什么？\"},\"54\":{\"h\":\"为什么在 constructor 里要 setTimeout？\"},\"55\":{\"h\":\"为什么在 reset 方法内 需要 toRaw(this) ？\"},\"56\":{\"h\":\"总结\"},\"57\":{\"h\":\"项目工程化之 eslint+prettier+stylelint+commitlint\",\"t\":[\"团队多人协同开发项目中困恼团队管理一个很大的问题是：无可避免地会出现每个开发者编码习惯不同、代码风格迥异，为了代码高可用、可维护性， 如何从项目管理上尽量统一和规范代码呢？\",\" 文档约定 - 谆谆教导，自求多福？\",\" 经常性 CodeReview - 苦口婆心，耳提面命？\"]},\"58\":{\"h\":\"统一编辑器配置\"},\"59\":{\"h\":\"第一步 配置 prettier 格式化规范\"},\"60\":{\"h\":\"第二步 配置 eslint\"},\"61\":{\"h\":\"第三步 配置 stylelint\"},\"62\":{\"h\":\"第四步 配置 commitlint\"},\"63\":{\"h\":\"第五步 配置 commitizen\"},\"64\":{\"h\":\"第六步 配置 lint-staged\"},\"65\":{\"h\":\"第七步 配置 husky\"},\"66\":{\"h\":\"最后\"},\"67\":{\"h\":\"前端 Vscode 常用插件\"},\"68\":{\"h\":\"外观优化\"},\"69\":{\"h\":\"主题色\"},\"70\":{\"h\":\"文件 icon\"},\"71\":{\"h\":\"代码辅助\"},\"72\":{\"h\":\"前端开发必备插件\"},\"73\":{\"h\":\"Vue2 开发插件包\"},\"74\":{\"h\":\"Vue3 开发插件包\"},\"75\":{\"h\":\"UNI-APP 开发插件包\"},\"76\":{\"h\":\"功能扩展\"},\"77\":{\"h\":\"提升编码效率\"},\"78\":{\"h\":\"其它插件\"},\"79\":{\"h\":\"element-form resetFields 与 Vue $nextTick\",\"t\":[\"公司之前一个管理后台做好了，拿给客户演示后，提了新的需求，url传递参数 页面自动显示 action form 表单，且 form表单内数据是传递来的参数\",\"想了下这个需求很简单，router传递参数吗 easy,\"]},\"80\":{\"h\":\"中后台管理系统权限应该怎样设计\"},\"81\":{\"h\":\"权限方案\"},\"82\":{\"h\":\"动态路由\"},\"83\":{\"h\":\"路由钩子\"},\"84\":{\"h\":\"权限命名规范\"},\"85\":{\"h\":\"技术细节\"},\"86\":{\"h\":\"总结\"},\"87\":{\"h\":\"模板编辑器：框选\"},\"88\":{\"h\":\"前言\"},\"89\":{\"h\":\"需求分析\"},\"90\":{\"h\":\"设计\"},\"91\":{\"h\":\"视图\"},\"92\":{\"h\":\"Props\"},\"93\":{\"h\":\"实现\"},\"94\":{\"h\":\"初始化\"},\"95\":{\"h\":\"框选\"},\"96\":{\"h\":\"框选完成\"},\"97\":{\"h\":\"最后\"},\"98\":{\"h\":\"模板编辑器：组件的设计与实现\"},\"99\":{\"h\":\"需求分析\"},\"100\":{\"h\":\"组件\"},\"101\":{\"h\":\"实现\"},\"102\":{\"h\":\"Props\"},\"103\":{\"h\":\"Computed\"},\"104\":{\"h\":\"Method\"},\"105\":{\"h\":\"组件基类\"},\"106\":{\"h\":\"组件\"},\"107\":{\"h\":\"控件\"},\"108\":{\"h\":\"控件数据模型\"},\"109\":{\"h\":\"初始化控件\"},\"110\":{\"h\":\"Props 数据模型\"},\"111\":{\"h\":\"初始化 控件 props\"},\"112\":{\"h\":\"Property 数据模型\"},\"113\":{\"h\":\"Property 初始化\"},\"114\":{\"h\":\"PropsOption 数据模型\"},\"115\":{\"h\":\"控件组\"},\"116\":{\"h\":\"公式\"},\"117\":{\"h\":\"Position\"},\"118\":{\"h\":\"Size\"},\"119\":{\"h\":\"实现\"},\"120\":{\"h\":\"重写 toHtml\"},\"121\":{\"h\":\"初始化组\"},\"122\":{\"h\":\"最后\"},\"123\":{\"h\":\"模板编辑器：控件的控制\"},\"124\":{\"h\":\"前言\"},\"125\":{\"h\":\"需求分析\"},\"126\":{\"h\":\"视图\"},\"127\":{\"h\":\"Props\"},\"128\":{\"h\":\"缩放移动\"},\"129\":{\"h\":\"公式\"},\"130\":{\"h\":\"限制范围\"},\"131\":{\"h\":\"限制最左边\"},\"132\":{\"h\":\"限制最右边\"},\"133\":{\"h\":\"限制最上边\"},\"134\":{\"h\":\"限制最下边\"},\"135\":{\"h\":\"更新位置\"},\"136\":{\"h\":\"控制点移动\"},\"137\":{\"h\":\"公式\"},\"138\":{\"h\":\"设计\"},\"139\":{\"h\":\"实现\"},\"140\":{\"h\":\"控制点按下\"},\"141\":{\"h\":\"最后\"},\"142\":{\"h\":\"模板编辑器：架构\"},\"143\":{\"h\":\"前言\"},\"144\":{\"h\":\"引言\"},\"145\":{\"h\":\"需求分析\"},\"146\":{\"h\":\"原型\"},\"147\":{\"h\":\"整体架构\"},\"148\":{\"h\":\"技术选型\"},\"149\":{\"h\":\"项目结构\"},\"150\":{\"h\":\"最后\"},\"151\":{\"h\":\"模板编辑器：辅助线\"},\"152\":{\"h\":\"前言\"},\"153\":{\"h\":\"需求分析\"},\"154\":{\"h\":\"设计\"},\"155\":{\"h\":\"视图\"},\"156\":{\"h\":\"组件\"},\"157\":{\"h\":\"使用\"},\"158\":{\"h\":\"Props\"},\"159\":{\"h\":\"实现\"},\"160\":{\"h\":\"边界判定\"},\"161\":{\"h\":\"对比条件\"},\"162\":{\"h\":\"遍历对比\"},\"163\":{\"h\":\"最后\"},\"164\":{\"h\":\"webpack+ts+es6+vue 配置教程\",\"t\":[\"webpack\",\"之前一直搞不懂webpack，也排斥学习 总是觉得太难了 配置太复杂。。。\"]},\"165\":{\"h\":\"第一步 配置 入口出口模块\"},\"166\":{\"h\":\"第二步 配置可以被解析的文件\"},\"167\":{\"h\":\"第三步 配置外部资源\"},\"168\":{\"h\":\"第四步 配置 module\"},\"169\":{\"h\":\"最后奉上 最终配置\"},\"170\":{\"h\":\"Javascript\"},\"171\":{\"h\":\"Security\"},\"172\":{\"h\":\"Specification\"},\"173\":{\"h\":\"Typescript\"},\"174\":{\"h\":\"Vscode\"},\"175\":{\"h\":\"Vue\"},\"176\":{\"h\":\"Webpack\"}},\"dirtCount\":0,\"index\":[[\"最终配置\",{\"0\":{\"169\":1}}],[\"最后奉上\",{\"0\":{\"169\":1}}],[\"最后\",{\"0\":{\"66\":1,\"97\":1,\"122\":1,\"141\":1,\"150\":1,\"163\":1}}],[\"入口出口模块\",{\"0\":{\"165\":1}}],[\"总是觉得太难了\",{\"1\":{\"164\":1}}],[\"总结\",{\"0\":{\"44\":1,\"56\":1,\"86\":1}}],[\"也排斥学习\",{\"1\":{\"164\":1}}],[\"之前一直搞不懂webpack\",{\"1\":{\"164\":1}}],[\"webpack\",{\"0\":{\"176\":1},\"1\":{\"164\":1}}],[\"webpack+ts+es6+vue\",{\"0\":{\"164\":1}}],[\"weakmap\",{\"0\":{\"53\":1}}],[\"遍历对比\",{\"0\":{\"162\":1}}],[\"对比条件\",{\"0\":{\"161\":1}}],[\"对代码的编写和程序的运行不会有致命的问题\",{\"1\":{\"11\":1}}],[\"边界判定\",{\"0\":{\"160\":1}}],[\"使用\",{\"0\":{\"157\":1}}],[\"辅助线\",{\"0\":{\"151\":1}}],[\"整体架构\",{\"0\":{\"147\":1}}],[\"原型\",{\"0\":{\"146\":1}}],[\"引言\",{\"0\":{\"144\":1}}],[\"架构\",{\"0\":{\"142\":1}}],[\"控制点按下\",{\"0\":{\"140\":1}}],[\"控制点移动\",{\"0\":{\"136\":1}}],[\"控件的控制\",{\"0\":{\"123\":1}}],[\"控件组\",{\"0\":{\"115\":1}}],[\"控件数据模型\",{\"0\":{\"108\":1}}],[\"控件\",{\"0\":{\"107\":1,\"111\":1}}],[\"更新位置\",{\"0\":{\"135\":1}}],[\"限制最下边\",{\"0\":{\"134\":1}}],[\"限制最上边\",{\"0\":{\"133\":1}}],[\"限制最右边\",{\"0\":{\"132\":1}}],[\"限制最左边\",{\"0\":{\"131\":1}}],[\"限制范围\",{\"0\":{\"130\":1}}],[\"缩放移动\",{\"0\":{\"128\":1}}],[\"重写\",{\"0\":{\"120\":1}}],[\"公式\",{\"0\":{\"116\":1,\"129\":1,\"137\":1}}],[\"公司之前一个管理后台做好了\",{\"1\":{\"79\":1}}],[\"数据模型\",{\"0\":{\"110\":1,\"112\":1,\"114\":1}}],[\"module\",{\"0\":{\"168\":1}}],[\"model\",{\"0\":{\"37\":1}}],[\"method\",{\"0\":{\"104\":1}}],[\"组件基类\",{\"0\":{\"105\":1}}],[\"组件\",{\"0\":{\"100\":1,\"106\":1,\"156\":1}}],[\"组件的设计与实现\",{\"0\":{\"98\":1}}],[\"初始化组\",{\"0\":{\"121\":1}}],[\"初始化控件\",{\"0\":{\"109\":1}}],[\"初始化\",{\"0\":{\"94\":1,\"111\":1,\"113\":1}}],[\"实现\",{\"0\":{\"93\":1,\"101\":1,\"119\":1,\"139\":1,\"159\":1}}],[\"实体\",{\"0\":{\"50\":1}}],[\"实体类\",{\"0\":{\"41\":1}}],[\"设计\",{\"0\":{\"90\":1,\"138\":1,\"154\":1}}],[\"需求分析\",{\"0\":{\"89\":1,\"99\":1,\"125\":1,\"145\":1,\"153\":1}}],[\"需要\",{\"0\":{\"55\":1}}],[\"框选完成\",{\"0\":{\"96\":1}}],[\"框选\",{\"0\":{\"87\":1,\"95\":1}}],[\"模板编辑器\",{\"0\":{\"87\":1,\"98\":1,\"123\":1,\"142\":1,\"151\":1}}],[\"权限命名规范\",{\"0\":{\"84\":1}}],[\"权限方案\",{\"0\":{\"81\":1}}],[\"路由钩子\",{\"0\":{\"83\":1}}],[\"动态路由\",{\"0\":{\"82\":1}}],[\"中后台管理系统权限应该怎样设计\",{\"0\":{\"80\":1}}],[\"router传递参数吗\",{\"1\":{\"79\":1}}],[\"resetfields\",{\"0\":{\"79\":1}}],[\"reset\",{\"0\":{\"55\":1}}],[\"rel=\",{\"1\":{\"10\":1}}],[\"想了下这个需求很简单\",{\"1\":{\"79\":1}}],[\"且\",{\"1\":{\"79\":1}}],[\"表单\",{\"1\":{\"79\":1}}],[\"页面自动显示\",{\"1\":{\"79\":1}}],[\"url传递参数\",{\"1\":{\"79\":1}}],[\"uni\",{\"0\":{\"75\":1}}],[\"提了新的需求\",{\"1\":{\"79\":1}}],[\"提升编码效率\",{\"0\":{\"77\":1}}],[\"拿给客户演示后\",{\"1\":{\"79\":1}}],[\"$nexttick\",{\"0\":{\"79\":1}}],[\"与\",{\"0\":{\"79\":1}}],[\"与其他任何人或组织无关\",{\"1\":{\"0\":1}}],[\"form表单内数据是传递来的参数\",{\"1\":{\"79\":1}}],[\"form\",{\"0\":{\"79\":1},\"1\":{\"79\":1}}],[\"其它插件\",{\"0\":{\"78\":1}}],[\"功能扩展\",{\"0\":{\"76\":1}}],[\"开发插件包\",{\"0\":{\"73\":1,\"74\":1,\"75\":1}}],[\"代码辅助\",{\"0\":{\"71\":1}}],[\"代码风格迥异\",{\"1\":{\"57\":1}}],[\"文件\",{\"0\":{\"70\":1}}],[\"文档约定\",{\"1\":{\"57\":1}}],[\"主题色\",{\"0\":{\"69\":1}}],[\"外观优化\",{\"0\":{\"68\":1}}],[\"vue\",{\"0\":{\"79\":1,\"175\":1}}],[\"vue3\",{\"0\":{\"74\":1}}],[\"vue2\",{\"0\":{\"73\":1}}],[\"vscode\",{\"0\":{\"67\":1,\"174\":1}}],[\"view\",{\"0\":{\"43\":1}}],[\"lint\",{\"0\":{\"64\":1}}],[\"第七步\",{\"0\":{\"65\":1}}],[\"第六步\",{\"0\":{\"64\":1}}],[\"第五步\",{\"0\":{\"63\":1}}],[\"第四步\",{\"0\":{\"62\":1,\"168\":1}}],[\"第三步\",{\"0\":{\"61\":1,\"167\":1}}],[\"第二步\",{\"0\":{\"60\":1,\"166\":1}}],[\"第一步\",{\"0\":{\"59\":1,\"165\":1}}],[\"格式化规范\",{\"0\":{\"59\":1}}],[\"配置外部资源\",{\"0\":{\"167\":1}}],[\"配置可以被解析的文件\",{\"0\":{\"166\":1}}],[\"配置太复杂\",{\"1\":{\"164\":1}}],[\"配置教程\",{\"0\":{\"164\":1}}],[\"配置\",{\"0\":{\"59\":1,\"60\":1,\"61\":1,\"62\":1,\"63\":1,\"64\":1,\"65\":1,\"165\":1,\"168\":1}}],[\"统一编辑器配置\",{\"0\":{\"58\":1}}],[\"耳提面命\",{\"1\":{\"57\":1}}],[\"苦口婆心\",{\"1\":{\"57\":1}}],[\"经常性\",{\"1\":{\"57\":1}}],[\"自求多福\",{\"1\":{\"57\":1}}],[\"谆谆教导\",{\"1\":{\"57\":1}}],[\"如何从项目管理上尽量统一和规范代码呢\",{\"1\":{\"57\":1}}],[\"可维护性\",{\"1\":{\"57\":1}}],[\"无可避免地会出现每个开发者编码习惯不同\",{\"1\":{\"57\":1}}],[\"团队多人协同开发项目中困恼团队管理一个很大的问题是\",{\"1\":{\"57\":1}}],[\"easy\",{\"1\":{\"79\":1}}],[\"element\",{\"0\":{\"79\":1}}],[\"eslint\",{\"0\":{\"60\":1}}],[\"eslint+prettier+stylelint+commitlint\",{\"0\":{\"57\":1}}],[\"entity\",{\"0\":{\"41\":1}}],[\"项目结构\",{\"0\":{\"149\":1}}],[\"项目工程化之\",{\"0\":{\"57\":1}}],[\"项目命名\",{\"0\":{\"13\":1}}],[\"方法内\",{\"0\":{\"55\":1}}],[\"里要\",{\"0\":{\"54\":1}}],[\"为了代码高可用\",{\"1\":{\"57\":1}}],[\"为什么在\",{\"0\":{\"54\":1,\"55\":1}}],[\"为保证信息与源同步\",{\"1\":{\"0\":1}}],[\"是什么\",{\"0\":{\"53\":1}}],[\"问题\",{\"0\":{\"52\":1}}],[\"视图\",{\"0\":{\"51\":1,\"91\":1,\"126\":1,\"155\":1}}],[\"视图调用\",{\"0\":{\"43\":1}}],[\"抽象类\",{\"0\":{\"49\":1}}],[\"传统\",{\"0\":{\"47\":1}}],[\"传统的前端ts操作\",{\"0\":{\"34\":1}}],[\"子类实现\",{\"0\":{\"42\":1}}],[\"服务类\",{\"0\":{\"40\":1}}],[\"oop\",{\"0\":{\"39\":1}}],[\"前端开发必备插件\",{\"0\":{\"72\":1}}],[\"前端开发规范\",{\"0\":{\"11\":1}}],[\"前端\",{\"0\":{\"67\":1}}],[\"前言\",{\"0\":{\"33\":1,\"46\":1,\"88\":1,\"124\":1,\"143\":1,\"152\":1}}],[\"我是这样重置数据的\",{\"0\":{\"45\":1}}],[\"我是这样写ts的\",{\"0\":{\"32\":1}}],[\"我的操作\",{\"0\":{\"35\":1}}],[\"我的摄影\",{\"0\":{\"4\":1}}],[\"结语\",{\"0\":{\"31\":1}}],[\"再来一个复杂一点的装饰器\",{\"0\":{\"30\":1}}],[\"一个简单的类型约束装饰器\",{\"0\":{\"29\":1}}],[\"类型装饰器\",{\"0\":{\"28\":1}}],[\"类的成员\",{\"0\":{\"27\":1}}],[\"类\",{\"0\":{\"26\":1}}],[\"函数\",{\"0\":{\"25\":1}}],[\"常用插件\",{\"0\":{\"67\":1}}],[\"常用的\",{\"0\":{\"21\":1}}],[\"常量\",{\"0\":{\"24\":1}}],[\"变量\",{\"0\":{\"23\":1}}],[\"书写顺序\",{\"0\":{\"20\":1}}],[\"命名规则\",{\"0\":{\"21\":1}}],[\"命名规范\",{\"0\":{\"12\":1,\"17\":1,\"22\":1}}],[\"命名严谨性\",{\"0\":{\"16\":1}}],[\"等文件命名\",{\"0\":{\"15\":1}}],[\"position\",{\"0\":{\"117\":1}}],[\"property\",{\"0\":{\"112\":1,\"113\":1}}],[\"propsoption\",{\"0\":{\"114\":1}}],[\"props\",{\"0\":{\"92\":1,\"102\":1,\"110\":1,\"111\":1,\"127\":1,\"158\":1}}],[\"prettier\",{\"0\":{\"59\":1}}],[\"png\",{\"0\":{\"15\":1}}],[\"php\",{\"0\":{\"9\":1}}],[\"specification\",{\"0\":{\"172\":1}}],[\"size\",{\"0\":{\"118\":1}}],[\"staged\",{\"0\":{\"64\":1}}],[\"stylelint\",{\"0\":{\"61\":1}}],[\"security\",{\"0\":{\"171\":1}}],[\"settimeout\",{\"0\":{\"54\":1}}],[\"service\",{\"0\":{\"40\":1}}],[\"scss\",{\"0\":{\"15\":1}}],[\"shift\",{\"1\":{\"10\":1}}],[\"computed\",{\"0\":{\"103\":1}}],[\"commitizen\",{\"0\":{\"63\":1}}],[\"commitlint\",{\"0\":{\"62\":1}}],[\"codereview\",{\"1\":{\"57\":1}}],[\"constructor\",{\"0\":{\"54\":1}}],[\"class\",{\"0\":{\"19\":1,\"36\":1,\"38\":1}}],[\"css\",{\"0\":{\"15\":1,\"17\":1,\"21\":1}}],[\"ctrl\",{\"1\":{\"10\":1}}],[\"js\",{\"0\":{\"15\":1,\"22\":1}}],[\"javascript\",{\"0\":{\"8\":1,\"170\":1}}],[\"比如\",{\"1\":{\"11\":1}}],[\"但是没有规范会有一系列的问题\",{\"1\":{\"11\":1}}],[\"规范不是强制性的\",{\"1\":{\"11\":1}}],[\">\",{\"1\":{\"10\":1}}],[\"noreferrer\",{\"1\":{\"10\":1}}],[\"noopener\",{\"1\":{\"10\":1}}],[\"nofollow\",{\"1\":{\"10\":1}}],[\"husky\",{\"0\":{\"65\":1}}],[\"href=\",{\"1\":{\"10\":1}}],[\"html\",{\"0\":{\"7\":1,\"15\":1}}],[\"<a\",{\"1\":{\"10\":1}}],[\"加了一些东西\",{\"1\":{\"10\":1}}],[\"action\",{\"1\":{\"79\":1}}],[\"app\",{\"0\":{\"75\":1}}],[\"abstractentity\",{\"0\":{\"49\":1}}],[\"abstract\",{\"0\":{\"39\":1}}],[\"a\",{\"1\":{\"10\":1}}],[\"不一样的\",{\"0\":{\"48\":1}}],[\"不过有时候会发现\",{\"1\":{\"10\":1}}],[\"不知道有没有人跟我一样\",{\"1\":{\"10\":1}}],[\"😀\",{\"1\":{\"10\":1}}],[\"😁\",{\"1\":{\"0\":1}}],[\"icon\",{\"0\":{\"70\":1}}],[\"id\",{\"0\":{\"18\":1}}],[\"i\",{\"1\":{\"10\":1}}],[\"+\",{\"1\":{\"10\":2}}],[\"打开一个网站喜欢\",{\"1\":{\"10\":1}}],[\"blank\",{\"0\":{\"10\":1},\"1\":{\"10\":1}}],[\"tohtml\",{\"0\":{\"120\":1}}],[\"toraw\",{\"0\":{\"55\":1}}],[\"this\",{\"0\":{\"55\":1}}],[\"transformer\",{\"0\":{\"38\":1}}],[\"typescript\",{\"0\":{\"28\":1,\"173\":1}}],[\"target=\",{\"0\":{\"10\":1},\"1\":{\"10\":1}}],[\"tips\",{\"0\":{\"5\":1}}],[\"填字游戏\",{\"0\":{\"6\":1}}],[\"dom\",{\"0\":{\"5\":1}}],[\"目录命名\",{\"0\":{\"14\":1}}],[\"目录\",{\"0\":{\"3\":1}}],[\"日志\",{\"0\":{\"2\":1}}],[\"技术选型\",{\"0\":{\"148\":1}}],[\"技术细节\",{\"0\":{\"85\":1}}],[\"技术大佬\",{\"1\":{\"1\":1}}],[\"技术更迭迅猛\",{\"1\":{\"0\":1}}],[\"标签\",{\"1\":{\"1\":1,\"10\":1}}],[\"地址\",{\"1\":{\"1\":1}}],[\"头像\",{\"1\":{\"1\":1}}],[\"头像和链接哦\",{\"1\":{\"1\":1}}],[\"xxx\",{\"1\":{\"1\":3,\"10\":1}}],[\"名称\",{\"1\":{\"1\":1}}],[\"必须要提供名称\",{\"1\":{\"1\":1}}],[\"各位大佬想交换友链的话可以在下方留言\",{\"1\":{\"1\":1}}],[\"友情链接\",{\"0\":{\"1\":1}}],[\"谢谢合作\",{\"1\":{\"0\":1}}],[\"转载时请务必注明文章出处\",{\"1\":{\"0\":1}}],[\"部分内容可能会作修改\",{\"1\":{\"0\":1}}],[\"仅代表个人思想\",{\"1\":{\"0\":1}}],[\"本站所有文章除特别声明皆为原创\",{\"1\":{\"0\":1}}],[\"声明\",{\"1\":{\"0\":1}}],[\"关于\",{\"0\":{\"0\":1}}]],\"version\":2}}")).map(([e,t])=>[e,zt(t,{fields:["h","t","c"],storeFields:["h","t","c"]})]));self.onmessage=({data:{type:e="all",query:t,locale:s,options:n}})=>{e==="suggest"?self.postMessage(st(t,v[s],n)):e==="search"?self.postMessage(et(t,v[s],n)):self.postMessage({suggestions:st(t,v[s],n),results:et(t,v[s],n)})};
//# sourceMappingURL=index.js.map
