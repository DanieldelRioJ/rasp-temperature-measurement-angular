import{Ha as $,Ma as k,Oa as z,R as j,c as P,d as O,da as U,e as w,f as T,g as x,h as l,j as L,k as _,l as u}from"./chunk-MYK5DXPC.js";import{Ca as v,F as m,Fb as I,Za as A,_ as h,_a as S,ab as M,cb as b,cc as E,ea as f,eb as C,lb as R,oa as g,oc as D,s as p,va as y,wc as N,za as s,zc as F}from"./chunk-SLHVZUCB.js";var B=()=>s(u).user()!=null?!0:(s(l).navigate(["login"]),!1),H=()=>s(u).user()==null?!0:(s(l).navigate(["/"]),!1);var V=[{path:"",loadChildren:()=>import("./chunk-X4PWQNBN.js").then(i=>i.MAIN_ROUTES),canActivate:[B]},{path:"login",loadChildren:()=>import("./chunk-BSRYVSYM.js").then(i=>i.LOGIN_ROUTES),canActivate:[H]}];var Q="@",ee=(()=>{let e=class e{constructor(r,o,n,a,d){this.doc=r,this.delegate=o,this.zone=n,this.animationType=a,this.moduleImpl=d,this._rendererFactoryPromise=null,this.scheduler=s(M,{optional:!0})}ngOnDestroy(){this._engine?.flush()}loadImpl(){return(this.moduleImpl??import("./chunk-T4Y3MLWQ.js")).catch(o=>{throw new h(5300,!1)}).then(({\u0275createEngine:o,\u0275AnimationRendererFactory:n})=>{this._engine=o(this.animationType,this.doc,this.scheduler);let a=new n(this.delegate,this._engine,this.zone);return this.delegate=a,a})}createRenderer(r,o){let n=this.delegate.createRenderer(r,o);if(n.\u0275type===0)return n;typeof n.throwOnSyntheticProps=="boolean"&&(n.throwOnSyntheticProps=!1);let a=new c(n);return o?.data?.animation&&!this._rendererFactoryPromise&&(this._rendererFactoryPromise=this.loadImpl()),this._rendererFactoryPromise?.then(d=>{let K=d.createRenderer(r,o);a.use(K)}).catch(d=>{a.use(n)}),a}begin(){this.delegate.begin?.()}end(){this.delegate.end?.()}whenRenderingDone(){return this.delegate.whenRenderingDone?.()??Promise.resolve()}};e.\u0275fac=function(o){S()},e.\u0275prov=g({token:e,factory:e.\u0275fac});let i=e;return i})(),c=class{constructor(e){this.delegate=e,this.replay=[],this.\u0275type=1}use(e){if(this.delegate=e,this.replay!==null){for(let t of this.replay)t(e);this.replay=null}}get data(){return this.delegate.data}destroy(){this.replay=null,this.delegate.destroy()}createElement(e,t){return this.delegate.createElement(e,t)}createComment(e){return this.delegate.createComment(e)}createText(e){return this.delegate.createText(e)}get destroyNode(){return this.delegate.destroyNode}appendChild(e,t){this.delegate.appendChild(e,t)}insertBefore(e,t,r,o){this.delegate.insertBefore(e,t,r,o)}removeChild(e,t,r){this.delegate.removeChild(e,t,r)}selectRootElement(e,t){return this.delegate.selectRootElement(e,t)}parentNode(e){return this.delegate.parentNode(e)}nextSibling(e){return this.delegate.nextSibling(e)}setAttribute(e,t,r,o){this.delegate.setAttribute(e,t,r,o)}removeAttribute(e,t,r){this.delegate.removeAttribute(e,t,r)}addClass(e,t){this.delegate.addClass(e,t)}removeClass(e,t){this.delegate.removeClass(e,t)}setStyle(e,t,r,o){this.delegate.setStyle(e,t,r,o)}removeStyle(e,t,r){this.delegate.removeStyle(e,t,r)}setProperty(e,t,r){this.shouldReplay(t)&&this.replay.push(o=>o.setProperty(e,t,r)),this.delegate.setProperty(e,t,r)}setValue(e,t){this.delegate.setValue(e,t)}listen(e,t,r){return this.shouldReplay(t)&&this.replay.push(o=>o.listen(e,t,r)),this.delegate.listen(e,t,r)}shouldReplay(e){return this.replay!==null&&e.startsWith(Q)}};function X(i="animations"){return C("NgAsyncAnimations"),v([{provide:b,useFactory:(e,t,r)=>new ee(e,t,r,i),deps:[N,w,R]},{provide:y,useValue:i==="noop"?"NoopAnimations":"BrowserAnimations"}])}var G=(i,e)=>e(i).pipe(m(t=>{if(t.status==401){let r=s(l),o=s(u);o.token=null,r.navigate(["login"])}return p(()=>t)})),J=(i,e)=>{let r=s(u).token,o=i;return r&&(o=i.clone({setHeaders:{authorization:`Bearer ${r}`}})),e(o)};function te(i){let e=i,t=Math.floor(Math.abs(i)),r=i.toString().replace(/^[^.]*\.?/,"").length,o=parseInt(i.toString().replace(/^[^e]*(e([-+]?\d+))?/,"$2"))||0;return e===1?1:o===0&&t!==0&&t%1e6===0&&r===0||!(o>=0&&o<=5)?4:5}var Y=["es",[["a.\xA0m.","p.\xA0m."],void 0,void 0],void 0,[["D","L","M","X","J","V","S"],["dom","lun","mar","mi\xE9","jue","vie","s\xE1b"],["domingo","lunes","martes","mi\xE9rcoles","jueves","viernes","s\xE1bado"],["DO","LU","MA","MI","JU","VI","SA"]],void 0,[["E","F","M","A","M","J","J","A","S","O","N","D"],["ene","feb","mar","abr","may","jun","jul","ago","sept","oct","nov","dic"],["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"]],void 0,[["a. C.","d. C."],void 0,["antes de Cristo","despu\xE9s de Cristo"]],1,[6,0],["d/M/yy","d MMM y","d 'de' MMMM 'de' y","EEEE, d 'de' MMMM 'de' y"],["H:mm","H:mm:ss","H:mm:ss z","H:mm:ss (zzzz)"],["{1}, {0}",void 0,void 0,void 0],[",",".",";","%","+","-","E","\xD7","\u2030","\u221E","NaN",":"],["#,##0.###","#,##0\xA0%","#,##0.00\xA0\xA4","#E0"],"EUR","\u20AC","euro",{AUD:[void 0,"$"],BRL:[void 0,"R$"],BYN:[void 0,"\u0440."],CAD:[void 0,"$"],CNY:[void 0,"\xA5"],EGP:[],ESP:["\u20A7"],GBP:[void 0,"\xA3"],HKD:[void 0,"$"],ILS:[void 0,"\u20AA"],INR:[void 0,"\u20B9"],JPY:[void 0,"\xA5"],KRW:[void 0,"\u20A9"],MXN:[void 0,"$"],NZD:[void 0,"$"],PHP:[void 0,"\u20B1"],RON:[void 0,"L"],THB:["\u0E3F"],TWD:[void 0,"NT$"],USD:["US$","$"],XAF:[],XCD:[void 0,"$"],XOF:[]},"ltr",te];F(Y);var W={providers:[k,{provide:D,useValue:"es-ES"},L(V,_()),X(),P(O([G,J])),{provide:$,useValue:{subscriptSizing:"dynamic"}}]};var q=(()=>{let e=class e{constructor(r){this._raspberryConfigurationService=r,this._raspberryConfigurationService.getName().pipe(U()).subscribe()}};e.\u0275fac=function(o){return new(o||e)(A(z))},e.\u0275cmp=f({type:e,selectors:[["app-root"]],standalone:!0,features:[E],decls:1,vars:0,template:function(o,n){o&1&&I(0,"router-outlet")},dependencies:[x,j],encapsulation:2});let i=e;return i})();T(q,W).catch(i=>console.error(i));