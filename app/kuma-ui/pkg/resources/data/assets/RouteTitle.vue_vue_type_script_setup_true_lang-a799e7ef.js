import{d as i,a4 as a,s,N as m,f as u}from"./index-e7bfbdad.js";const p=i({__name:"RouteTitle",props:{title:{type:String,required:!1,default:""}},setup(n){const r=n,o=Symbol("route-title"),e=a("route-view-parent");return typeof e<"u"&&(s(()=>r.title,t=>{t.length>0&&e.addTitle(t,o)},{immediate:!0}),m(()=>{e.removeTitle(o)})),(t,c)=>u("",!0)}});export{p as _};