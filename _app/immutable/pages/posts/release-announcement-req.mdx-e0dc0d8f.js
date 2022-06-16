import{S as xe,i as je,s as He,D as fe,x as Ce,y as $e,z as Le,A as Se,B as Ee,r as Be,p as Ae,C as Oe,O as Pe,e as i,t as r,k as _,c as u,a as h,h as n,d as a,m as v,b as g,g as f,H as t,n as ze}from"../../chunks/index-911407ad.js";import{B as Re}from"../../chunks/blog-7ff63fb2.js";function Ue(j){let o,m,d,q,s,c,b,J,z,w,N,k,V,W,S,M,Z,R,H,K,U,y,B,Q,X,A,Y,ee,E,te,P,ae,oe,D,p,re,T,ne,se,x,le,ie,O,ue,he,F,C,de;return{c(){o=i("p"),m=r("I use "),d=i("a"),q=r("Postman"),s=r(" a lot at work. It\u2019s really helpful to have an interface where I can write down a request, run it, and then iterate on it based on the response. However, the fact that it\u2019s a GUI tool puts some real limitations on it."),c=_(),b=i("p"),J=r("Between VS Code, zoom, docker, firefox, and slack, I\u2019m often already pushing my computer a little harder than it\u2019s happy place, and adding another electron application isn\u2019t ideal. Worse than that, trying to eyeball my way through a 500 line JSON response is no fun at all."),z=_(),w=i("p"),N=r("I\u2019d much rather have a CLI tool where I can pipe the results into "),k=i("a"),V=r("jq"),W=r(" and explore to my hearts content in a more focused way. For a while I tried just using "),S=i("code"),M=r("curl"),Z=r(", but that had a different set of problems. Editing requests in Postman feels like iterating on code. I have a static document representing the request that can be saved between sessions, pull secrets from the environment (sort of), and have meaningful structure related to what I\u2019m building. Iterating on a curl request just feels bad, especially when I need to send a request with a body."),R=_(),H=i("p"),K=r("I spent a while complaining to my coworkers that curl wouldn\u2019t run HTTP requests from a file, and after I got all the whinging out of my system I realized that this should be a relatively easy thing to build. I wanted something that could"),U=_(),y=i("ul"),B=i("li"),Q=r("run as a CLI application"),X=_(),A=i("li"),Y=r("read requests in a standard format from a static file"),ee=_(),E=i("li"),te=r("be distributed as a static binary (none of this "),P=i("a"),ae=r("install from npm"),oe=r(" nonsense)"),D=_(),p=i("p"),re=r("So I wrote "),T=i("a"),ne=r("req"),se=r(". Req takes in a file containing a "),x=i("a"),le=r("spec compliant"),ie=r(" HTTP request, performs that request, and returns the response body to stdout. By default it "),O=i("em"),ue=r("only"),he=r(" returns the body, making it simple to pipe into other tools, but on a flag it can return other metadata as well."),F=_(),C=i("p"),de=r("I get that the world probably didn\u2019t need another HTTP client, but it was fun to have a project to work in a language that I don\u2019t get to work in every day that filled a real gap in the way I work. Often I struggle to stick with projects because the goal feels kind of abstract. It was very nice to have something that I am already using regularly to test and debug HTTP apps."),this.h()},l(e){o=u(e,"P",{});var l=h(o);m=n(l,"I use "),d=u(l,"A",{href:!0,rel:!0});var ce=h(d);q=n(ce,"Postman"),ce.forEach(a),s=n(l," a lot at work. It\u2019s really helpful to have an interface where I can write down a request, run it, and then iterate on it based on the response. However, the fact that it\u2019s a GUI tool puts some real limitations on it."),l.forEach(a),c=v(e),b=u(e,"P",{});var pe=h(b);J=n(pe,"Between VS Code, zoom, docker, firefox, and slack, I\u2019m often already pushing my computer a little harder than it\u2019s happy place, and adding another electron application isn\u2019t ideal. Worse than that, trying to eyeball my way through a 500 line JSON response is no fun at all."),pe.forEach(a),z=v(e),w=u(e,"P",{});var $=h(w);N=n($,"I\u2019d much rather have a CLI tool where I can pipe the results into "),k=u($,"A",{href:!0,rel:!0});var me=h(k);V=n(me,"jq"),me.forEach(a),W=n($," and explore to my hearts content in a more focused way. For a while I tried just using "),S=u($,"CODE",{});var we=h(S);M=n(we,"curl"),we.forEach(a),Z=n($,", but that had a different set of problems. Editing requests in Postman feels like iterating on code. I have a static document representing the request that can be saved between sessions, pull secrets from the environment (sort of), and have meaningful structure related to what I\u2019m building. Iterating on a curl request just feels bad, especially when I need to send a request with a body."),$.forEach(a),R=v(e),H=u(e,"P",{});var ye=h(H);K=n(ye,"I spent a while complaining to my coworkers that curl wouldn\u2019t run HTTP requests from a file, and after I got all the whinging out of my system I realized that this should be a relatively easy thing to build. I wanted something that could"),ye.forEach(a),U=v(e),y=u(e,"UL",{});var L=h(y);B=u(L,"LI",{});var ge=h(B);Q=n(ge,"run as a CLI application"),ge.forEach(a),X=v(L),A=u(L,"LI",{});var be=h(A);Y=n(be,"read requests in a standard format from a static file"),be.forEach(a),ee=v(L),E=u(L,"LI",{});var G=h(E);te=n(G,"be distributed as a static binary (none of this "),P=u(G,"A",{href:!0,rel:!0});var Ie=h(P);ae=n(Ie,"install from npm"),Ie.forEach(a),oe=n(G," nonsense)"),G.forEach(a),L.forEach(a),D=v(e),p=u(e,"P",{});var I=h(p);re=n(I,"So I wrote "),T=u(I,"A",{href:!0,rel:!0});var _e=h(T);ne=n(_e,"req"),_e.forEach(a),se=n(I,". Req takes in a file containing a "),x=u(I,"A",{href:!0,rel:!0});var ve=h(x);le=n(ve,"spec compliant"),ve.forEach(a),ie=n(I," HTTP request, performs that request, and returns the response body to stdout. By default it "),O=u(I,"EM",{});var qe=h(O);ue=n(qe,"only"),qe.forEach(a),he=n(I," returns the body, making it simple to pipe into other tools, but on a flag it can return other metadata as well."),I.forEach(a),F=v(e),C=u(e,"P",{});var ke=h(C);de=n(ke,"I get that the world probably didn\u2019t need another HTTP client, but it was fun to have a project to work in a language that I don\u2019t get to work in every day that filled a real gap in the way I work. Often I struggle to stick with projects because the goal feels kind of abstract. It was very nice to have something that I am already using regularly to test and debug HTTP apps."),ke.forEach(a),this.h()},h(){g(d,"href","https://www.postman.com/downloads/"),g(d,"rel","nofollow"),g(k,"href","https://stedolan.github.io/jq/"),g(k,"rel","nofollow"),g(P,"href","https://httpyac.github.io/"),g(P,"rel","nofollow"),g(T,"href","https://github.com/schicks/req/releases/tag/v1.0.0"),g(T,"rel","nofollow"),g(x,"href","https://www.w3.org/Protocols/rfc2616/rfc2616-sec5.html"),g(x,"rel","nofollow")},m(e,l){f(e,o,l),t(o,m),t(o,d),t(d,q),t(o,s),f(e,c,l),f(e,b,l),t(b,J),f(e,z,l),f(e,w,l),t(w,N),t(w,k),t(k,V),t(w,W),t(w,S),t(S,M),t(w,Z),f(e,R,l),f(e,H,l),t(H,K),f(e,U,l),f(e,y,l),t(y,B),t(B,Q),t(y,X),t(y,A),t(A,Y),t(y,ee),t(y,E),t(E,te),t(E,P),t(P,ae),t(E,oe),f(e,D,l),f(e,p,l),t(p,re),t(p,T),t(T,ne),t(p,se),t(p,x),t(x,le),t(p,ie),t(p,O),t(O,ue),t(p,he),f(e,F,l),f(e,C,l),t(C,de)},p:ze,d(e){e&&a(o),e&&a(c),e&&a(b),e&&a(z),e&&a(w),e&&a(R),e&&a(H),e&&a(U),e&&a(y),e&&a(D),e&&a(p),e&&a(F),e&&a(C)}}}function De(j){let o,m;const d=[j[0],Te];let q={$$slots:{default:[Ue]},$$scope:{ctx:j}};for(let s=0;s<d.length;s+=1)q=fe(q,d[s]);return o=new Re({props:q}),{c(){Ce(o.$$.fragment)},l(s){$e(o.$$.fragment,s)},m(s,c){Le(o,s,c),m=!0},p(s,[c]){const b=c&1?Se(d,[c&1&&Ee(s[0]),c&0&&Ee(Te)]):{};c&2&&(b.$$scope={dirty:c,ctx:s}),o.$set(b)},i(s){m||(Be(o.$$.fragment,s),m=!0)},o(s){Ae(o.$$.fragment,s),m=!1},d(s){Oe(o,s)}}}const Te={title:"Req: Postman in the terminal",date:"2022-06-16T15:34:32.000Z",status:"published",blurb:"Postman is great, but we could do better."};function Fe(j,o,m){return j.$$set=d=>{m(0,o=fe(fe({},o),Pe(d)))},o=Pe(o),[o]}class Ne extends xe{constructor(o){super(),je(this,o,Fe,De,He,{})}}export{Ne as default,Te as metadata};