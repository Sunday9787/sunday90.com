import{h as p,r,o as a,c as s,F as i,i as h,a as o,t as e,b as _,_ as d}from"./app-x68-VUNY.js";const u={class:"photography"},g=["src","alt"],m=o("div",{class:"photography-item-mask"},null,-1),y={class:"photography-item-title"},f={class:"photography-item-place"},v=p({__name:"photography",props:{column:{default:4},data:{}},setup(k){return(n,F)=>{const l=r("FontIcon");return a(),s("ol",u,[(a(!0),s(i,null,h(n.data,(t,c)=>(a(),s("li",{key:c,class:"photography-item"},[o("picture",null,[o("img",{src:t.photo,alt:t.title,loading:"lazy",class:"photography-item-media"},null,8,g)]),m,o("div",y,e(t.title),1),o("div",f,[_(l,{icon:t.icon||"location-dot",class:"photography-icon"},null,8,["icon"]),o("span",null,e(t.place),1)])]))),128))])}}}),x=d(v,[["__file","photography.vue"]]);export{x as default};