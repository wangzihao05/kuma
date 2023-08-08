import{d as q,j as N,o as s,a as r,w as t,z as M,g as a,b as e,R as E,f as S,a4 as F,r as W,h as i,q as h,G,t as l,e as $,F as A,W as K,v as B,V as O,D as P,H as D}from"./index-7e71fe76.js";import{_ as j}from"./MultizoneInfo.vue_vue_type_script_setup_true_lang-e1bc3284.js";import{A as H}from"./AppCollection-8d01782e.js";import{B as J,g as U,m as Y,e as Q,A as X,p as ee,S as te,_ as oe,n as ne,f as ae}from"./RouteView.vue_vue_type_script_setup_true_lang-159ad8a0.js";import{_ as se}from"./RouteTitle.vue_vue_type_script_setup_true_lang-3c1a3272.js";const ie=q({__name:"DeleteResourceModal",props:{actionButtonText:{type:String,required:!1,default:"Yes, delete"},confirmationText:{type:String,required:!1,default:""},deleteFunction:{type:Function,required:!0},isVisible:{type:Boolean,required:!0},modalId:{type:String,required:!0},title:{type:String,required:!1,default:"Delete"}},emits:["cancel","delete"],setup(C,{emit:d}){const c=C,o=N(!1);async function w(){o.value=!1;try{await c.deleteFunction(),d("delete")}catch{o.value=!0}}return(f,m)=>(s(),r(e(F),{"action-button-text":c.actionButtonText,"confirmation-text":c.confirmationText,"is-visible":c.isVisible,"modal-id":c.modalId,title:c.title,type:"danger","data-testid":"delete-resource-modal",onCanceled:m[0]||(m[0]=_=>d("cancel")),onProceed:w},{"body-content":t(()=>[M(f.$slots,"body-content"),a(),o.value?(s(),r(e(E),{key:0,class:"mt-4",appearance:"danger","is-dismissible":""},{alertMessage:t(()=>[M(f.$slots,"error")]),_:3})):S("",!0)]),_:3},8,["action-button-text","confirmation-text","is-visible","modal-id","title"]))}}),le=q({__name:"ZoneListView",props:{page:{type:Number,required:!0},size:{type:Number,required:!0}},setup(C){const d=C,c=J(),{t:o}=U(),w=Y(),f=Q(),m=N(!1),_=N("");function I(b){return b.map(g=>{var T;const{name:y}=g,V={name:"zone-cp-detail-view",params:{zone:y}};let u="",v="kubernetes",k=!0;(((T=g.zoneInsight)==null?void 0:T.subscriptions)??[]).forEach(p=>{if(p.version&&p.version.kumaCp){u=p.version.kumaCp.version;const{kumaCpGlobalCompatible:L=!0}=p.version.kumaCp;k=L}p.config&&(v=JSON.parse(p.config).environment)});const z=ne(g.zoneInsight);return{detailViewRoute:V,name:y,status:z,zoneCpVersion:u,type:v,warnings:!k}})}async function R(){await w.deleteZone({name:_.value})}function x(){m.value=!m.value}function Z(b){x(),_.value=b}return(b,g)=>{const y=W("RouterLink");return s(),r(oe,{name:"zone-cp-list-view"},{default:t(({route:V})=>[i(X,null,{title:t(()=>[h("h2",null,[i(se,{title:e(o)("zone-cps.routes.items.title"),render:!0},null,8,["title"])])]),default:t(()=>[a(),e(f).getters["config/getMulticlusterStatus"]===!1?(s(),r(j,{key:0})):(s(),r(ee,{key:1,src:`/zone-cps?size=${d.size}&page=${d.page}`},{default:t(({data:u,error:v,refresh:k})=>[i(e(G),null,{body:t(()=>[i(H,{class:"zone-cp-collection","data-testid":"zone-cp-collection",headers:[{label:"Name",key:"name"},{label:"Zone CP Version",key:"zoneCpVersion"},{label:"Type",key:"type"},{label:"Status",key:"status"},{label:"Warnings",key:"warnings",hideLabel:!0},{label:"Actions",key:"actions",hideLabel:!0}],"page-number":d.page,"page-size":d.size,total:u==null?void 0:u.total,items:u?I(u.items):void 0,error:v,onChange:V.update},{name:t(({row:n,rowValue:z})=>[i(y,{to:n.detailViewRoute,"data-testid":"detail-view-link"},{default:t(()=>[a(l(z),1)]),_:2},1032,["to"])]),zoneCpVersion:t(({rowValue:n})=>[a(l(n||e(o)("common.collection.none")),1)]),type:t(({rowValue:n})=>[a(l(n||e(o)("common.collection.none")),1)]),status:t(({rowValue:n})=>[n?(s(),r(te,{key:0,status:n},null,8,["status"])):(s(),$(A,{key:1},[a(l(e(o)("common.collection.none")),1)],64))]),warnings:t(({rowValue:n})=>[n?(s(),r(e(K),{key:0,label:e(o)("zone-cps.list.version_mismatch")},{default:t(()=>[i(e(B),{class:"mr-1",icon:"warning",color:"var(--black-500)","secondary-color":"var(--yellow-300)",size:"20","hide-title":""})]),_:1},8,["label"])):(s(),$(A,{key:1},[a(l(e(o)("common.collection.none")),1)],64))]),actions:t(({row:n})=>[i(e(O),{class:"actions-dropdown","data-testid":"actions-dropdown","kpop-attributes":{placement:"bottomEnd",popoverClasses:"mt-5 more-actions-popover"},width:"150"},{default:t(()=>[i(e(P),{class:"non-visual-button",appearance:"secondary",size:"small"},{icon:t(()=>[i(e(B),{color:"var(--black-400)",icon:"more",size:"16"})]),_:1})]),items:t(()=>[i(e(D),{item:{to:n.detailViewRoute,label:e(o)("common.collection.actions.view")}},null,8,["item"]),a(),e(c)("KUMA_ZONE_CREATION_FLOW")==="enabled"?(s(),r(e(D),{key:0,"has-divider":"","is-dangerous":"","data-testid":"dropdown-delete-item",onClick:z=>Z(n.name)},{default:t(()=>[a(l(e(o)("common.collection.actions.delete")),1)]),_:2},1032,["onClick"])):S("",!0)]),_:2},1024)]),_:2},1032,["page-number","page-size","total","items","error","onChange"])]),_:2},1024),a(),m.value?(s(),r(ie,{key:0,"confirmation-text":_.value,"delete-function":R,"is-visible":m.value,"modal-id":"delete-zone-modal","action-button-text":e(o)("zones.delete.confirmModal.proceedText"),title:e(o)("zones.delete.confirmModal.title"),onCancel:x,onDelete:()=>{x(),k()}},{"body-content":t(()=>[h("p",null,l(e(o)("zones.delete.confirmModal.text1",{zoneName:_.value})),1),a(),h("p",null,l(e(o)("zones.delete.confirmModal.text2")),1)]),error:t(()=>[a(l(e(o)("zones.delete.confirmModal.errorText")),1)]),_:2},1032,["confirmation-text","is-visible","action-button-text","title","onDelete"])):S("",!0)]),_:2},1032,["src"]))]),_:2},1024)]),_:1})}}});const pe=ae(le,[["__scopeId","data-v-8f37be0f"]]);export{pe as default};
