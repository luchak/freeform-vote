(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{178:function(e,t,n){e.exports=n(616)},183:function(e,t,n){},184:function(e,t,n){},616:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(176),i=n.n(l),o=(n(183),n(9)),u=(n(184),n(17)),s=n(18),c=n(115),m=n.n(c),v=n(91),h=n(618),d=m.a.mark(f);function f(e,t){var n,a;return m.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:n=Math.min(e.length,t.length),a=0;case 2:if(!(a<n)){r.next=8;break}return r.next=5,[e[a],t[a]];case 5:++a,r.next=2;break;case 8:case"end":return r.stop()}},d)}function y(e){for(var t=(e=e.slice()).length-1;t>0;t--){var n=Math.floor(Math.random()*(t+1)),a=e[t];e[t]=e[n],e[n]=a}return e}function g(e){var t=[],n=(e=(e=(e=(e=e.trim()).replace("\r\n","\n")).replace(/\n[ \t\n]+\n/g,"\n\n")).replace(/[ \t]+/g," ")).split("\n\n"),a=!0,r=!1,l=void 0;try{for(var i,o=n[Symbol.iterator]();!(a=(i=o.next()).done);a=!0){var u=i.value,s=[],c=!0,m=!1,v=void 0;try{for(var h,d=u.split("\n")[Symbol.iterator]();!(c=(h=d.next()).done);c=!0){var f=h.value,y=(f=f.trim()).split(" ");if(0===y.length)throw new Error("0 length rank group found");s.push(y)}}catch(g){m=!0,v=g}finally{try{c||null==d.return||d.return()}finally{if(m)throw v}}s.length>1?t.push(s):console.warn("Ignoring too-short ranking:",s)}}catch(g){r=!0,l=g}finally{try{a||null==o.return||o.return()}finally{if(r)throw l}}return t}function p(e,t,n){for(var a=new Map,r=0;r<n;++r){var l=new b,i=!0,u=!1,s=void 0;try{for(var c,m=y(e)[Symbol.iterator]();!(i=(c=m.next()).done);i=!0){var v=c.value;l.update(v)}}catch(h){u=!0,s=h}finally{try{i||null==m.return||m.return()}finally{if(u)throw s}}l.accumulateRatings(a)}return function(e,t,n){var a=[],r=!0,l=!1,i=void 0;try{for(var u,s=e.entries()[Symbol.iterator]();!(r=(u=s.next()).done);r=!0){var c=u.value,m=Object(o.a)(c,2),v=m[0],d=m[1],f=d.mu/n+t*Math.sqrt(d.sigma2/n);a.push({id:v,score:f})}}catch(h){l=!0,i=h}finally{try{r||null==s.return||s.return()}finally{if(l)throw i}}return a}(a,t,n).sort(function(e,t){return t.score-e.score})}var b=function(){function e(t,n){Object(u.a)(this,e),this._defaultMu=t,this._defaultSigma=n,this._ratings=void 0,this._ratings=new Map}return Object(s.a)(e,[{key:"accumulateRatings",value:function(e){var t=!0,n=!1,a=void 0;try{for(var r,l=this._ratings.entries()[Symbol.iterator]();!(t=(r=l.next()).done);t=!0){var i=r.value,u=Object(o.a)(i,2),s=u[0],c=u[1],m=e.get(s),v={mu:c.mu,sigma2:c.sigma*c.sigma};m&&(v.mu+=m.mu,v.sigma2+=m.sigma2),e.set(s,v)}}catch(h){n=!0,a=h}finally{try{t||null==l.return||l.return()}finally{if(n)throw a}}}},{key:"addEntry",value:function(e,t,n){var a=new v.a(t||this._defaultMu,n||this._defaultSigma);return this._ratings.set(e,a),a}},{key:"update",value:function(e){var t=this._rankingToRatingGroups(e),n=Object(h.a)(t);this._updateRatings(e,n)}},{key:"_rankingToRatingGroups",value:function(e){var t=[],n=!0,a=!1,r=void 0;try{for(var l,i=e[Symbol.iterator]();!(n=(l=i.next()).done);n=!0){var o=l.value,u=[],s=!0,c=!1,m=void 0;try{for(var v,h=o[Symbol.iterator]();!(s=(v=h.next()).done);s=!0){var d=v.value,f=this._ratings.get(d);f||(f=this.addEntry(d)),u.push(f)}}catch(y){c=!0,m=y}finally{try{s||null==h.return||h.return()}finally{if(c)throw m}}t.push(u)}}catch(y){a=!0,r=y}finally{try{n||null==i.return||i.return()}finally{if(a)throw r}}return t}},{key:"_updateRatings",value:function(e,t){var n=!0,a=!1,r=void 0;try{for(var l,i=f(e,t)[Symbol.iterator]();!(n=(l=i.next()).done);n=!0){var u=l.value,s=Object(o.a)(u,2),c=s[0],m=s[1],v=!0,h=!1,d=void 0;try{for(var y,g=f(c,m)[Symbol.iterator]();!(v=(y=g.next()).done);v=!0){var p=y.value,b=Object(o.a)(p,2),E=b[0],w=b[1];this._ratings.set(E,w)}}catch(k){h=!0,d=k}finally{try{v||null==g.return||g.return()}finally{if(h)throw d}}}}catch(k){a=!0,r=k}finally{try{n||null==i.return||i.return()}finally{if(a)throw r}}}}]),e}(),E=r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,r.a.createElement("b",null,"Optimism")," controls how much we credit (positive values) or penalize (negative values) entries with uncertain scores: controversial entries, or entries without many votes. Best to keep this zero or negative. (Details: controls how many standard deviations we should add/subtract from the mean of each entry's rating distribution to arrive at a final score.)"),r.a.createElement("div",null,r.a.createElement("b",null,"Samples"),' trades off computation time versus the stability of the final result. Use a low value for quick approximate answers, a higher value for more repeatable ones. (Details: the order in which we run "matches" affects the final result. This samples multiple orders and averages the results.)')),w=r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,r.a.createElement("b",null,"Points by rank"),' is how many points entries get for each time they are listed at each rank, in descending order. So the default value of "3,2,1" means that first place gets 3 points, second gets 2, etc. Ties are split equally, so 2 entries tied for first/second with the default 3,2,1 scoring each get 2.5 points.')),k=r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,r.a.createElement("b",null,"Points by rank"),' is how many points entries get for each time they are listed at each rank, in descending order. So the default value of "3,2,1" means that first place gets 3 points, second gets 2, etc. Ties are split equally, so 2 entries tied for first/second with the default 3,2,1 scoring each get 2.5 points.'),r.a.createElement("div",null,r.a.createElement("b",null,"Smoothing")," helps to stabilize (and reduce) the scores of mixes with a small number of rankings. If smoothing is 1, each mix is treated as though there were 1 extra ranking where it appeared rated too low to receive any points.")),S={averagePoints:{form:function(e){var t=Object(a.useState)("3,2,1".toString()),n=Object(o.a)(t,2),l=n[0],i=n[1],u=Object(a.useState)(1..toString()),s=Object(o.a)(u,2),c=s[0],m=s[1];return r.a.createElement("form",{onSubmit:function(t){var n=l.split(",").map(function(e){return parseInt(e.trim(),10)}),a=function(e,t,n){var a=new Map,r=new Map,l=!0,i=!1,u=void 0;try{for(var s,c=e[Symbol.iterator]();!(l=(s=c.next()).done);l=!0){var m=s.value,v=0,h=!0,d=!1,f=void 0;try{for(var y,g=m[Symbol.iterator]();!(h=(y=g.next()).done);h=!0){for(var p=y.value,b=0,E=0;E<p.length;E++)b+=t[v++]||0;var w=b/p.length,k=!0,S=!1,x=void 0;try{for(var j,O=p[Symbol.iterator]();!(k=(j=O.next()).done);k=!0){var C=j.value,_=a.get(C)||0,B=r.get(C)||n;_+=w,B+=1,a.set(C,_),r.set(C,B)}}catch(z){S=!0,x=z}finally{try{k||null==O.return||O.return()}finally{if(S)throw x}}}}catch(z){d=!0,f=z}finally{try{h||null==g.return||g.return()}finally{if(d)throw f}}}}catch(z){i=!0,u=z}finally{try{l||null==c.return||c.return()}finally{if(i)throw u}}var M=[],F=!0,R=!1,P=void 0;try{for(var T,A=a.entries()[Symbol.iterator]();!(F=(T=A.next()).done);F=!0){var V=T.value,D=Object(o.a)(V,2),I=D[0],q=D[1];M.push({id:I,score:q/r.get(I)})}}catch(z){R=!0,P=z}finally{try{F||null==A.return||A.return()}finally{if(R)throw P}}return M.sort(function(e,t){return t.score-e.score})}(g(e.votes),n,parseFloat(c));e.setResult(a.map(function(e,t){return"".concat(t+1,"\t").concat(e.score.toFixed(3),"\t").concat(e.id)}).join("\n")),t.preventDefault()}},r.a.createElement("div",null,r.a.createElement("label",null,"Points by rank:"),r.a.createElement("input",{type:"text",id:"rankPoints",name:"rankPoints",value:l,onChange:function(e){return i(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("label",null,"Smoothing:"),r.a.createElement("input",{type:"text",id:"smoothing",name:"smoothing",value:c,onChange:function(e){return m(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("label",null,"Votes:")),r.a.createElement("div",null,r.a.createElement("textarea",{id:"votes",name:"votes",rows:30,cols:60,value:e.votes,onChange:function(t){return e.setVotes(t.target.value)}})),r.a.createElement("div",null,r.a.createElement("input",{type:"submit"})))},instructions:k},points:{form:function(e){var t=Object(a.useState)("3,2,1".toString()),n=Object(o.a)(t,2),l=n[0],i=n[1];return r.a.createElement("form",{onSubmit:function(t){var n=l.split(",").map(function(e){return parseFloat(e.trim())}),a=function(e,t){var n=new Map,a=!0,r=!1,l=void 0;try{for(var i,u=e[Symbol.iterator]();!(a=(i=u.next()).done);a=!0){var s=i.value,c=0,m=!0,v=!1,h=void 0;try{for(var d,f=s[Symbol.iterator]();!(m=(d=f.next()).done);m=!0){for(var y=d.value,g=0,p=0;p<y.length;p++)g+=t[c++]||0;var b=g/y.length,E=!0,w=!1,k=void 0;try{for(var S,x=y[Symbol.iterator]();!(E=(S=x.next()).done);E=!0){var j=S.value,O=n.get(j)||0;O+=b,n.set(j,O)}}catch(D){w=!0,k=D}finally{try{E||null==x.return||x.return()}finally{if(w)throw k}}}}catch(D){v=!0,h=D}finally{try{m||null==f.return||f.return()}finally{if(v)throw h}}}}catch(D){r=!0,l=D}finally{try{a||null==u.return||u.return()}finally{if(r)throw l}}var C=[],_=!0,B=!1,M=void 0;try{for(var F,R=n.entries()[Symbol.iterator]();!(_=(F=R.next()).done);_=!0){var P=F.value,T=Object(o.a)(P,2),A=T[0],V=T[1];C.push({id:A,score:V})}}catch(D){B=!0,M=D}finally{try{_||null==R.return||R.return()}finally{if(B)throw M}}return C.sort(function(e,t){return t.score-e.score})}(g(e.votes),n);e.setResult(a.map(function(e,t){return"".concat(t+1,"\t").concat(e.score.toFixed(3),"\t").concat(e.id)}).join("\n")),t.preventDefault()}},r.a.createElement("div",null,r.a.createElement("label",null,"Points by rank:"),r.a.createElement("input",{type:"text",id:"rankPoints",name:"rankPoints",value:l,onChange:function(e){return i(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("label",null,"Votes:")),r.a.createElement("div",null,r.a.createElement("textarea",{id:"votes",name:"votes",rows:30,cols:60,value:e.votes,onChange:function(t){return e.setVotes(t.target.value)}})),r.a.createElement("div",null,r.a.createElement("input",{type:"submit"})))},instructions:w},trueSkill:{form:function(e){var t=Object(a.useState)((-3).toString()),n=Object(o.a)(t,2),l=n[0],i=n[1],u=Object(a.useState)(100..toString()),s=Object(o.a)(u,2),c=s[0],m=s[1];return r.a.createElement("form",{onSubmit:function(t){var n=p(g(e.votes),parseFloat(l),parseInt(c,10));e.setResult(n.map(function(e,t){return"".concat(t+1,"\t").concat(e.score.toFixed(3),"\t").concat(e.id)}).join("\n")),t.preventDefault()}},r.a.createElement("div",null,r.a.createElement("label",null,"Optimism (-3 to -2 seems ideal):"),r.a.createElement("input",{type:"text",id:"optimism",name:"optimism",value:l,onChange:function(e){return i(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("label",null,"Samples (1 to 10000):"),r.a.createElement("input",{type:"number",id:"epochs",name:"epochs",min:"1",max:"10000",value:c,onChange:function(e){return m(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("label",null,"Votes:")),r.a.createElement("div",null,r.a.createElement("textarea",{id:"votes",name:"votes",rows:30,cols:60,value:e.votes,onChange:function(t){return e.setVotes(t.target.value)}})),r.a.createElement("div",null,r.a.createElement("input",{type:"submit"})))},instructions:E}},x=function(){var e=Object(a.useState)("Asiago Brie\nCheddar\n\nBrie Cheddar\nAsiago\n\nAsiago\nBrie\n\nCheddar\nAsiago\nDanishBlue\n\nBrie\nAsiago\nCheddar\n\nBrie\nDanishBlue\nAsiago\nCheddar\n\n"),t=Object(o.a)(e,2),n=t[0],l=t[1],i=Object(a.useState)(null),u=Object(o.a)(i,2),s=u[0],c=u[1],m=Object(a.useState)("trueSkill"),v=Object(o.a)(m,2),h=v[0],d=v[1],f=S[h],y=f.form,g=f.instructions;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,"Provide rankings, get scores!"),r.a.createElement("div",null,"\xa0"),r.a.createElement("div",null,"This page demonstrates using"," ",r.a.createElement("a",{href:"https://trueskill.org/"},"TrueSkill")," to construct a voting system where not every voter has to evaluate every entry. Each voter instead ranks every entry they have an opinion about. We can get scores (and therefore a consensus ranking) from these inputs by treating each voter's ranking as the result of a free-for-all match between all the entries they ranked, and use TrueSkill to update entry ratings based on the results of each match."),r.a.createElement("div",null,r.a.createElement("h3",null,"Instructions")),r.a.createElement("div",null,r.a.createElement("b",null,"Votes:")," each block of lines below is an individual voter's ranking. Entries that come first are ranked higher, entries appearing on the same line are ties. For example: in the default rankings in the box below, the first user has ranked Asiago and Brie tied for first, with Cheddar coming in second. The second user ranked Brie and Cheddar first, and Asiago second."),g,r.a.createElement("div",{style:{display:"grid",gridTemplateColumns:"50% 50%"}},r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement("h3",null,"Inputs")),r.a.createElement("div",null,r.a.createElement("label",null,"Mode:"),r.a.createElement("select",{value:h,onChange:function(e){return d(e.target.value)}},Object.keys(S).map(function(e){return r.a.createElement("option",{key:e,value:e},e)}))),r.a.createElement("div",null,r.a.createElement(y,{votes:n,setVotes:l,setResult:c}))),r.a.createElement("div",null,r.a.createElement("h3",null,"Results"),s&&r.a.createElement("pre",null,s))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(x,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[178,1,2]]]);
//# sourceMappingURL=main.9e7b1c83.chunk.js.map