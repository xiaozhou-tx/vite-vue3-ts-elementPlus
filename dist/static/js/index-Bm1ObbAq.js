import{a as v,b as x,c as g,d as w,e as V}from"./element-plus-B4PemT8l.js";import{t as N,x as b}from"./@element-plus-BQKIWAjy.js";import{u as E}from"./index-B-iaVMDp.js";import{u as k}from"./vue-router-DJ3kB9XD.js";import{d as y,r as m,c as B,a as p,M as o,K as s,o as C,u as i,a3 as I}from"./@vue-BAU0wG7q.js";import{_ as T}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./@vueuse-B9vl5TEV.js";import"./lodash-es-BWt72ah6.js";import"./dayjs-CMScKg4O.js";import"./base64-js-seTY8gGK.js";import"./@popperjs-D9SI2xQl.js";import"./@ctrl-r5W6hzzQ.js";import"./async-validator-DKvM95Vc.js";import"./normalize-wheel-es-B6fDCfyv.js";/* empty css                    */import"./pinia-DjllxKsT.js";import"./gm-crypt-BHuB6tX9.js";const F={class:"login"},M={class:"content"},S=y({__name:"index",setup(U){const u=E(),d=k(),t=m({userName:"admin",password:"123456789"}),r=m(!1),f=()=>{r.value=!0,setTimeout(()=>{r.value=!1,u.setToken("123456"),x.success("登录成功"),d.push("/")},1e3)};return(K,e)=>{const n=g,l=w,c=V,_=v;return C(),B("div",F,[p("div",M,[e[4]||(e[4]=p("div",{class:"title"},"Login",-1)),o(_,{model:t.value},{default:s(()=>[o(l,{prop:"userName"},{default:s(()=>[o(n,{clearable:"","prefix-icon":i(N),modelValue:t.value.userName,"onUpdate:modelValue":e[0]||(e[0]=a=>t.value.userName=a),placeholder:"用户名"},null,8,["prefix-icon","modelValue"])]),_:1}),o(l,{prop:"password"},{default:s(()=>[o(n,{type:"password","show-password":"","prefix-icon":i(b),clearable:"",modelValue:t.value.password,"onUpdate:modelValue":e[1]||(e[1]=a=>t.value.password=a),placeholder:"密码"},null,8,["prefix-icon","modelValue"])]),_:1}),o(l,null,{default:s(()=>[o(c,{type:"primary",loading:r.value,style:{width:"100%"},onClick:e[2]||(e[2]=a=>f())},{default:s(()=>e[3]||(e[3]=[I("登录")])),_:1},8,["loading"])]),_:1})]),_:1},8,["model"])])])}}}),Z=T(S,[["__scopeId","data-v-fb0d68ab"]]);export{Z as default};
