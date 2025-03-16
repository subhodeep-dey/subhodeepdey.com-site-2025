(()=>{var e={};e.id=103,e.ids=[103],e.modules={3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},5086:(e,t,s)=>{"use strict";s.r(t),s.d(t,{patchFetch:()=>w,routeModule:()=>l,serverHooks:()=>h,workAsyncStorage:()=>d,workUnitAsyncStorage:()=>m});var r={};s.r(r),s.d(r,{POST:()=>u});var i=s(64360),o=s(9133),n=s(82428),a=s(35329),c=s(9963),p=s(77624);async function u(e){try{let t=e.headers.get("x-forwarded-for")||e.headers.get("x-real-ip")||"unknown-ip",s=p.ar.isRateLimited(t),r=p.ar.getRemainingRequests(t),i=p.ar.getTimeUntilReset(t),o={limited:s,remainingRequests:r,resetTime:i};if(o.limited)return a.NextResponse.json({error:"Rate limit exceeded. Please try again later.",rateLimited:!0,resetTime:o.resetTime},{status:429});let{email:n}=await e.json();if(!n||!(0,c.B9)(n))return a.NextResponse.json({error:"Invalid email address"},{status:400});let u=process.env.BREVO_API;if(!u)return console.error("BREVO_API key is not defined in environment variables"),a.NextResponse.json({error:"Server configuration error"},{status:500});let l=await fetch("https://api.brevo.com/v3/contacts",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json","api-key":u},body:JSON.stringify({email:n,updateEnabled:!0,attributes:{NEWSLETTER:!0,SUBSCRIPTION_DATE:new Date().toISOString().split("T")[0]}})}),d=null,m=!1;if(201===l.status)m=!0,d=(await l.json()).id;else if(204===l.status){let e=await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(n)}`,{method:"GET",headers:{Accept:"application/json","api-key":u}});e.ok&&(d=(await e.json()).id)}else{let e=await l.json();return console.error("Brevo API error (create contact):",e),a.NextResponse.json({error:"Failed to subscribe to newsletter"},{status:500})}let h=null,w=await fetch("https://api.brevo.com/v3/contacts/lists",{method:"GET",headers:{Accept:"application/json","api-key":u}});if(w.ok){let e=(await w.json()).lists.find(e=>"Newsletter Subscribers"===e.name);if(e)h=e.id;else{let e=await fetch("https://api.brevo.com/v3/contacts/lists",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json","api-key":u},body:JSON.stringify({name:"Newsletter Subscribers",folderId:1})});e.ok?h=(await e.json()).id:console.error("Failed to create list:",await e.text())}}if(d&&h){let e=await fetch(`https://api.brevo.com/v3/contacts/lists/${h}/contacts/add`,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json","api-key":u},body:JSON.stringify({emails:[n]})});e.ok||console.error("Failed to add contact to list:",await e.text())}return a.NextResponse.json({success:!0,message:m?"Successfully subscribed to newsletter":"Your subscription has been updated",remainingRequests:o.remainingRequests},{status:200})}catch(e){return console.error("Newsletter subscription error:",e),a.NextResponse.json({error:"Internal server error"},{status:500})}}let l=new i.AppRouteRouteModule({definition:{kind:o.RouteKind.APP_ROUTE,page:"/api/newsletter/route",pathname:"/api/newsletter",filename:"route",bundlePath:"app/api/newsletter/route"},resolvedPagePath:"C:\\Users\\HP-PC\\OneDrive - vit.ac.in\\HP Probook Laptop Files\\sdey - hp\\programs\\kamran-ahmed-clone\\src\\app\\api\\newsletter\\route.ts",nextConfigOutput:"",userland:r}),{workAsyncStorage:d,workUnitAsyncStorage:m,serverHooks:h}=l;function w(){return(0,n.patchFetch)({workAsyncStorage:d,workUnitAsyncStorage:m})}},9963:(e,t,s)=>{"use strict";function r(e){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e.trim())}function i(e){return e?e.replace(/<[^>]*>/g,"").trim():""}function o(e){return/^[a-zA-Z\s\-']{2,}$/.test(e.trim())}function n(e){return e.trim().length>=10}s.d(t,{B9:()=>r,SI:()=>n,o2:()=>i,uV:()=>o})},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},44870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},46967:()=>{},51695:()=>{},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},77624:(e,t,s)=>{"use strict";s.d(t,{ar:()=>o,p5:()=>i});class r{constructor(e,t){this.store={},this.maxRequests=e,this.windowMs=t,setInterval(()=>this.cleanUp(),36e5)}isRateLimited(e){let t=Date.now();this.store[e]||(this.store[e]={count:0,resetTime:t+this.windowMs});let s=this.store[e];return t>s.resetTime&&(s.count=0,s.resetTime=t+this.windowMs),s.count+=1,s.count>this.maxRequests}getRemainingRequests(e){if(!this.store[e])return this.maxRequests;let t=this.store[e],s=Date.now();return s>t.resetTime?(t.count=0,t.resetTime=s+this.windowMs,this.maxRequests):Math.max(0,this.maxRequests-t.count)}getTimeUntilReset(e){if(!this.store[e])return 0;let t=this.store[e],s=Date.now();return Math.max(0,t.resetTime-s)}cleanUp(){let e=Date.now();Object.keys(this.store).forEach(t=>{e>this.store[t].resetTime&&delete this.store[t]})}}let i=new r(10,36e5),o=new r(5,36e5)}};var t=require("../../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[571,776],()=>s(5086));module.exports=r})();