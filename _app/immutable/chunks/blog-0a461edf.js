import{S as T,i as K,s as X,F as A,e as c,c as g,a as d,d as k,R as h,g as x,A as S,t as v,k as w,l as y,h as M,m as _,b as R,H as p,j as B,I,J as C,K as E,r as q,p as N,D as U}from"./index-986541d7.js";function F(r){let t,o,l=[{src:o="https://utteranc.es/client.js"},r[1]],z={};for(let s=0;s<l.length;s+=1)z=U(z,l[s]);return{c(){t=c("script"),this.h()},l(s){t=g(s,"SCRIPT",{src:!0});var f=d(t);f.forEach(k),this.h()},h(){h(t,z)},m(s,f){x(s,t,f)},p(s,f){h(t,z=S(l,[{src:o},s[1]]))},d(s){s&&k(t)}}}function W(r){let t,o,l,z,s,f,n;const u=r[3].default,a=A(u,r,r[2],null);let m=F(r);return{c(){t=c("article"),o=c("h2"),l=v(r[0]),z=w(),a&&a.c(),s=w(),m&&m.c(),f=y(),this.h()},l(e){t=g(e,"ARTICLE",{class:!0});var i=d(t);o=g(i,"H2",{});var b=d(o);l=M(b,r[0]),b.forEach(k),z=_(i),a&&a.l(i),i.forEach(k),s=_(e),m&&m.l(e),f=y(),this.h()},h(){R(t,"class","blog")},m(e,i){x(e,t,i),p(t,o),p(o,l),p(t,z),a&&a.m(t,null),x(e,s,i),m&&m.m(e,i),x(e,f,i),n=!0},p(e,[i]){(!n||i&1)&&B(l,e[0]),a&&a.p&&(!n||i&4)&&I(a,u,e,e[2],n?E(u,e[2],i,null):C(e[2]),null),m.p(e,i)},i(e){n||(q(a,e),n=!0)},o(e){N(a,e),n=!1},d(e){e&&k(t),a&&a.d(e),e&&k(s),m&&m.d(e),e&&k(f)}}}function G(r,t,o){let{$$slots:l={},$$scope:z}=t,{title:s}=t;const f={repo:"schicks/schicks.github.io","issue-term":s,label:"blog-comments",theme:"preferred-color-scheme",crossorigin:"anonymous",async:!0};return r.$$set=n=>{"title"in n&&o(0,s=n.title),"$$scope"in n&&o(2,z=n.$$scope)},[s,f,z,l]}class O extends T{constructor(t){super(),K(this,t,G,W,X,{title:0})}}export{O as B};