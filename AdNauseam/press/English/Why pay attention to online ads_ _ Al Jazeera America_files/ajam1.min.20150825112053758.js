/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */
(function(a,b){if(typeof exports==="object"&&exports){module.exports=b
}else{if(typeof define==="function"&&define.amd){define(b)
}else{a.Mustache=b
}}}(this,(function(){var x={};
x.name="mustache.js";
x.version="0.7.2";
x.tags=["{{","}}"];
x.Scanner=v;
x.Context=s;
x.Writer=q;
var d=/\s*/;
var l=/\s+/;
var h=/\S/;
var g=/\s*=/;
var n=/\s*\}/;
var u=/#|\^|\/|>|\{|&|=|!/;
var j=RegExp.prototype.test;
var w=Object.prototype.toString;
function o(A,z){return j.call(A,z)
}function f(z){return !o(h,z)
}var k=Array.isArray||function(z){return w.call(z)==="[object Array]"
};
function e(z){return z.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")
}var c={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"};
function m(z){return String(z).replace(/[&<>"'\/]/g,function(A){return c[A]
})
}x.escape=m;
function v(z){this.string=z;
this.tail=z;
this.pos=0
}v.prototype.eos=function(){return this.tail===""
};
v.prototype.scan=function(A){var z=this.tail.match(A);
if(z&&z.index===0){this.tail=this.tail.substring(z[0].length);
this.pos+=z[0].length;
return z[0]
}return""
};
v.prototype.scanUntil=function(A){var z,B=this.tail.search(A);
switch(B){case -1:z=this.tail;
this.pos+=this.tail.length;
this.tail="";
break;
case 0:z="";
break;
default:z=this.tail.substring(0,B);
this.tail=this.tail.substring(B);
this.pos+=B
}return z
};
function s(z,A){this.view=z;
this.parent=A;
this._cache={}
}s.make=function(z){return(z instanceof s)?z:new s(z)
};
s.prototype.push=function(z){return new s(z,this)
};
s.prototype.lookup=function(z){var C=this._cache[z];
if(!C){if(z=="."){C=this.view
}else{var B=this;
while(B){if(z.indexOf(".")>0){C=B.view;
var D=z.split("."),A=0;
while(C&&A<D.length){C=C[D[A++]]
}}else{C=B.view[z]
}if(C!=null){break
}B=B.parent
}}this._cache[z]=C
}if(typeof C==="function"){C=C.call(this.view)
}return C
};
function q(){this.clearCache()
}q.prototype.clearCache=function(){this._cache={};
this._partialCache={}
};
q.prototype.compile=function(B,z){var A=this._cache[B];
if(!A){var C=x.parse(B,z);
A=this._cache[B]=this.compileTokens(C,B)
}return A
};
q.prototype.compilePartial=function(A,C,z){var B=this.compile(C,z);
this._partialCache[A]=B;
return B
};
q.prototype.getPartial=function(z){if(!(z in this._partialCache)&&this._loadPartial){this.compilePartial(z,this._loadPartial(z))
}return this._partialCache[z]
};
q.prototype.compileTokens=function(B,A){var z=this;
return function(C,E){if(E){if(typeof E==="function"){z._loadPartial=E
}else{for(var D in E){z.compilePartial(D,E[D])
}}}return p(B,z,s.make(C),A)
}
};
q.prototype.render=function(B,z,A){return this.compile(B)(z,A)
};
function p(G,A,z,J){var D="";
var B,H,I;
for(var E=0,F=G.length;
E<F;
++E){B=G[E];
H=B[1];
switch(B[0]){case"#":I=z.lookup(H);
if(typeof I==="object"){if(k(I)){for(var C=0,L=I.length;
C<L;
++C){D+=p(B[4],A,z.push(I[C]),J)
}}else{if(I){D+=p(B[4],A,z.push(I),J)
}}}else{if(typeof I==="function"){var K=J==null?null:J.slice(B[3],B[5]);
I=I.call(z.view,K,function(M){return A.render(M,z)
});
if(I!=null){D+=I
}}else{if(I){D+=p(B[4],A,z,J)
}}}break;
case"^":I=z.lookup(H);
if(!I||(k(I)&&I.length===0)){D+=p(B[4],A,z,J)
}break;
case">":I=A.getPartial(H);
if(typeof I==="function"){D+=I(z)
}break;
case"&":I=z.lookup(H);
if(I!=null){D+=I
}break;
case"name":I=z.lookup(H);
if(I!=null){D+=x.escape(I)
}break;
case"text":D+=H;
break
}}return D
}function y(F){var A=[];
var E=A;
var G=[];
var C;
for(var B=0,z=F.length;
B<z;
++B){C=F[B];
switch(C[0]){case"#":case"^":G.push(C);
E.push(C);
E=C[4]=[];
break;
case"/":var D=G.pop();
D[5]=C[2];
E=G.length>0?G[G.length-1][4]:A;
break;
default:E.push(C)
}}return A
}function a(E){var B=[];
var D,A;
for(var C=0,z=E.length;
C<z;
++C){D=E[C];
if(D){if(D[0]==="text"&&A&&A[0]==="text"){A[1]+=D[1];
A[3]=D[3]
}else{A=D;
B.push(D)
}}}return B
}function r(z){return[new RegExp(e(z[0])+"\\s*"),new RegExp("\\s*"+e(z[1]))]
}x.parse=function(P,F){P=P||"";
F=F||x.tags;
if(typeof F==="string"){F=F.split(l)
}if(F.length!==2){throw new Error("Invalid tags: "+F.join(", "))
}var J=r(F);
var B=new v(P);
var H=[];
var G=[];
var E=[];
var Q=false;
var O=false;
function N(){if(Q&&!O){while(E.length){delete G[E.pop()]
}}else{E=[]
}Q=false;
O=false
}var C,A,I,K,D;
while(!B.eos()){C=B.pos;
I=B.scanUntil(J[0]);
if(I){for(var L=0,M=I.length;
L<M;
++L){K=I.charAt(L);
if(f(K)){E.push(G.length)
}else{O=true
}G.push(["text",K,C,C+1]);
C+=1;
if(K=="\n"){N()
}}}if(!B.scan(J[0])){break
}Q=true;
A=B.scan(u)||"name";
B.scan(d);
if(A==="="){I=B.scanUntil(g);
B.scan(g);
B.scanUntil(J[1])
}else{if(A==="{"){I=B.scanUntil(new RegExp("\\s*"+e("}"+F[1])));
B.scan(n);
B.scanUntil(J[1]);
A="&"
}else{I=B.scanUntil(J[1])
}}if(!B.scan(J[1])){throw new Error("Unclosed tag at "+B.pos)
}D=[A,I,C,B.pos];
G.push(D);
if(A==="#"||A==="^"){H.push(D)
}else{if(A==="/"){if(H.length===0){throw new Error('Unopened section "'+I+'" at '+C)
}var z=H.pop();
if(z[1]!==I){throw new Error('Unclosed section "'+z[1]+'" at '+C)
}}else{if(A==="name"||A==="{"||A==="&"){O=true
}else{if(A==="="){F=I.split(l);
if(F.length!==2){throw new Error("Invalid tags at "+C+": "+F.join(", "))
}J=r(F)
}}}}}var z=H.pop();
if(z){throw new Error('Unclosed section "'+z[1]+'" at '+B.pos)
}G=a(G);
return y(G)
};
var b=new q();
x.clearCache=function(){return b.clearCache()
};
x.compile=function(A,z){return b.compile(A,z)
};
x.compilePartial=function(A,B,z){return b.compilePartial(A,B,z)
};
x.compileTokens=function(A,z){return b.compileTokens(A,z)
};
x.render=function(B,z,A){return b.render(B,z,A)
};
x.to_html=function(C,A,B,D){var z=x.render(C,A,B);
if(typeof D==="function"){D(z)
}else{return z
}};
return x
}())));
(function(){var ai=this,ac=ai._,ae={},ar=Array.prototype,ab=Object.prototype,an=Function.prototype,aw=ar.push,ah=ar.slice,au=ar.concat,ak=ab.toString,aq=ab.hasOwnProperty,ad=ar.forEach,ag=ar.map,ao=ar.reduce,aa=ar.reduceRight,at=ar.filter,ap=ar.every,aj=ar.some,X=ar.indexOf,av=ar.lastIndexOf,Y=Array.isArray,ax=Object.keys,am=an.bind,Z=function(a){return a instanceof Z?a:this instanceof Z?(this._wrapped=a,void 0):new Z(a)
};
"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=Z),exports._=Z):ai._=Z,Z.VERSION="1.4.4";
var W=Z.each=Z.forEach=function(h,f,g){if(null!=h){if(ad&&h.forEach===ad){h.forEach(f,g)
}else{if(h.length===+h.length){for(var c=0,d=h.length;
d>c;
c++){if(f.call(g,h[c],c,h)===ae){return
}}}else{for(var b in h){if(Z.has(h,b)&&f.call(g,h[b],b,h)===ae){return
}}}}}};
Z.map=Z.collect=function(d,a,b){var c=[];
return null==d?c:ag&&d.map===ag?d.map(a,b):(W(d,function(g,e,f){c[c.length]=a.call(b,g,e,f)
}),c)
};
var H="Reduce of empty array with no initial value";
Z.reduce=Z.foldl=Z.inject=function(f,b,c,d){var a=arguments.length>2;
if(null==f&&(f=[]),ao&&f.reduce===ao){return d&&(b=Z.bind(b,d)),a?f.reduce(b,c):f.reduce(b)
}if(W(f,function(h,g,e){a?c=b.call(d,c,h,g,e):(c=h,a=!0)
}),!a){throw new TypeError(H)
}return c
},Z.reduceRight=Z.foldr=function(j,f,g,h){var c=arguments.length>2;
if(null==j&&(j=[]),aa&&j.reduceRight===aa){return h&&(f=Z.bind(f,h)),c?j.reduceRight(f,g):j.reduceRight(f)
}var d=j.length;
if(d!==+d){var b=Z.keys(j);
d=b.length
}if(W(j,function(e,k,a){k=b?b[--d]:--d,c?g=f.call(h,g,j[k],k,a):(g=j[k],c=!0)
}),!c){throw new TypeError(H)
}return g
},Z.find=Z.detect=function(d,a,b){var c;
return Q(d,function(g,e,f){return a.call(b,g,e,f)?(c=g,!0):void 0
}),c
},Z.filter=Z.select=function(d,a,b){var c=[];
return null==d?c:at&&d.filter===at?d.filter(a,b):(W(d,function(g,e,f){a.call(b,g,e,f)&&(c[c.length]=g)
}),c)
},Z.reject=function(c,a,b){return Z.filter(c,function(g,f,d){return !a.call(b,g,f,d)
},b)
},Z.every=Z.all=function(d,b,c){b||(b=Z.identity);
var a=!0;
return null==d?a:ap&&d.every===ap?d.every(b,c):(W(d,function(g,f,e){return(a=a&&b.call(c,g,f,e))?void 0:ae
}),!!a)
};
var Q=Z.some=Z.any=function(d,b,c){b||(b=Z.identity);
var a=!1;
return null==d?a:aj&&d.some===aj?d.some(b,c):(W(d,function(g,f,e){return a||(a=b.call(c,g,f,e))?ae:void 0
}),!!a)
};
Z.contains=Z.include=function(b,a){return null==b?!1:X&&b.indexOf===X?b.indexOf(a)!=-1:Q(b,function(c){return c===a
})
},Z.invoke=function(d,a){var b=ah.call(arguments,2),c=Z.isFunction(a);
return Z.map(d,function(e){return(c?a:e[a]).apply(e,b)
})
},Z.pluck=function(b,a){return Z.map(b,function(c){return c[a]
})
},Z.where=function(c,a,b){return Z.isEmpty(a)?b?null:[]:Z[b?"find":"filter"](c,function(e){for(var d in a){if(a[d]!==e[d]){return !1
}}return !0
})
},Z.findWhere=function(b,a){return Z.where(b,a,!0)
},Z.max=function(d,a,b){if(!a&&Z.isArray(d)&&d[0]===+d[0]&&65535>d.length){return Math.max.apply(Math,d)
}if(!a&&Z.isEmpty(d)){return -1/0
}var c={computed:-1/0,value:-1/0};
return W(d,function(h,f,g){var e=a?a.call(b,h,f,g):h;
e>=c.computed&&(c={value:h,computed:e})
}),c.value
},Z.min=function(d,a,b){if(!a&&Z.isArray(d)&&d[0]===+d[0]&&65535>d.length){return Math.min.apply(Math,d)
}if(!a&&Z.isEmpty(d)){return 1/0
}var c={computed:1/0,value:1/0};
return W(d,function(h,f,g){var e=a?a.call(b,h,f,g):h;
c.computed>e&&(c={value:h,computed:e})
}),c.value
},Z.shuffle=function(d){var a,b=0,c=[];
return W(d,function(e){a=Z.random(b++),c[b-1]=c[a],c[a]=e
}),c
};
var al=function(a){return Z.isFunction(a)?a:function(b){return b[a]
}
};
Z.sortBy=function(d,a,b){var c=al(a);
return Z.pluck(Z.map(d,function(g,f,e){return{value:g,index:f,criteria:c.call(b,g,f,e)}
}).sort(function(j,f){var g=j.criteria,h=f.criteria;
if(g!==h){if(g>h||g===void 0){return 1
}if(h>g||h===void 0){return -1
}}return j.index<f.index?-1:1
}),"value")
};
var P=function(g,c,d,f){var a={},b=al(c||Z.identity);
return W(g,function(h,e){var j=b.call(d,h,e,g);
f(a,j,h)
}),a
};
Z.groupBy=function(c,a,b){return P(c,a,b,function(f,d,e){(Z.has(f,d)?f[d]:f[d]=[]).push(e)
})
},Z.countBy=function(c,a,b){return P(c,a,b,function(e,d){Z.has(e,d)||(e[d]=0),e[d]++
})
},Z.sortedIndex=function(k,f,g,h){g=null==g?Z.identity:al(g);
for(var c=g.call(h,f),d=0,b=k.length;
b>d;
){var j=d+b>>>1;
c>g.call(h,k[j])?d=j+1:b=j
}return d
},Z.toArray=function(a){return a?Z.isArray(a)?ah.call(a):a.length===+a.length?Z.map(a,Z.identity):Z.values(a):[]
},Z.size=function(a){return null==a?0:a.length===+a.length?a.length:Z.keys(a).length
},Z.first=Z.head=Z.take=function(c,a,b){return null==c?void 0:null==a||b?c[0]:ah.call(c,0,a)
},Z.initial=function(c,a,b){return ah.call(c,0,c.length-(null==a||b?1:a))
},Z.last=function(c,a,b){return null==c?void 0:null==a||b?c[c.length-1]:ah.call(c,Math.max(c.length-a,0))
},Z.rest=Z.tail=Z.drop=function(c,a,b){return ah.call(c,null==a||b?1:a)
},Z.compact=function(a){return Z.filter(a,Z.identity)
};
var G=function(c,a,b){return W(c,function(d){Z.isArray(d)?a?aw.apply(b,d):G(d,a,b):b.push(d)
}),b
};
Z.flatten=function(b,a){return G(b,a,[])
},Z.without=function(a){return Z.difference(a,ah.call(arguments,1))
},Z.uniq=Z.unique=function(j,f,g,h){Z.isFunction(f)&&(h=g,g=f,f=!1);
var c=g?Z.map(j,g,h):j,d=[],b=[];
return W(c,function(a,k){(f?k&&b[b.length-1]===a:Z.contains(b,a))||(b.push(a),d.push(j[k]))
}),d
},Z.union=function(){return Z.uniq(au.apply(ar,arguments))
},Z.intersection=function(b){var a=ah.call(arguments,1);
return Z.filter(Z.uniq(b),function(c){return Z.every(a,function(d){return Z.indexOf(d,c)>=0
})
})
},Z.difference=function(b){var a=au.apply(ar,ah.call(arguments,1));
return Z.filter(b,function(c){return !Z.contains(a,c)
})
},Z.zip=function(){for(var d=ah.call(arguments),a=Z.max(Z.pluck(d,"length")),b=Array(a),c=0;
a>c;
c++){b[c]=Z.pluck(d,""+c)
}return b
},Z.object=function(f,b){if(null==f){return{}
}for(var c={},d=0,a=f.length;
a>d;
d++){b?c[f[d]]=b[d]:c[f[d][0]]=f[d][1]
}return c
},Z.indexOf=function(f,b,c){if(null==f){return -1
}var d=0,a=f.length;
if(c){if("number"!=typeof c){return d=Z.sortedIndex(f,b),f[d]===b?d:-1
}d=0>c?Math.max(0,a+c):c
}if(X&&f.indexOf===X){return f.indexOf(b,c)
}for(;
a>d;
d++){if(f[d]===b){return d
}}return -1
},Z.lastIndexOf=function(f,b,c){if(null==f){return -1
}var d=null!=c;
if(av&&f.lastIndexOf===av){return d?f.lastIndexOf(b,c):f.lastIndexOf(b)
}for(var a=d?c:f.length;
a--;
){if(f[a]===b){return a
}}return -1
},Z.range=function(g,c,d){1>=arguments.length&&(c=g||0,g=0),d=arguments[2]||1;
for(var f=Math.max(Math.ceil((c-g)/d),0),a=0,b=Array(f);
f>a;
){b[a++]=g,g+=d
}return b
},Z.bind=function(c,a){if(c.bind===am&&am){return am.apply(c,ah.call(arguments,1))
}var b=ah.call(arguments,2);
return function(){return c.apply(a,b.concat(ah.call(arguments)))
}
},Z.partial=function(b){var a=ah.call(arguments,1);
return function(){return b.apply(this,a.concat(ah.call(arguments)))
}
},Z.bindAll=function(b){var a=ah.call(arguments,1);
return 0===a.length&&(a=Z.functions(b)),W(a,function(c){b[c]=Z.bind(b[c],b)
}),b
},Z.memoize=function(c,a){var b={};
return a||(a=Z.identity),function(){var d=a.apply(this,arguments);
return Z.has(b,d)?b[d]:b[d]=c.apply(this,arguments)
}
},Z.delay=function(c,a){var b=ah.call(arguments,2);
return setTimeout(function(){return c.apply(null,b)
},a)
},Z.defer=function(a){return Z.delay.apply(Z,[a,1].concat(ah.call(arguments,1)))
},Z.throttle=function(k,f){var g,h,c,d,b=0,j=function(){b=new Date,c=null,d=k.apply(g,h)
};
return function(){var e=new Date,a=f-(e-b);
return g=this,h=arguments,0>=a?(clearTimeout(c),c=null,b=e,d=k.apply(g,h)):c||(c=setTimeout(j,a)),d
}
},Z.debounce=function(f,b,c){var d,a;
return function(){var g=this,e=arguments,h=function(){d=null,c||(a=f.apply(g,e))
},j=c&&!d;
return clearTimeout(d),d=setTimeout(h,b),j&&(a=f.apply(g,e)),a
}
},Z.once=function(c){var a,b=!1;
return function(){return b?a:(b=!0,a=c.apply(this,arguments),c=null,a)
}
},Z.wrap=function(b,a){return function(){var c=[b];
return aw.apply(c,arguments),a.apply(this,c)
}
},Z.compose=function(){var a=arguments;
return function(){for(var b=arguments,c=a.length-1;
c>=0;
c--){b=[a[c].apply(this,b)]
}return b[0]
}
},Z.after=function(b,a){return 0>=b?a():function(){return 1>--b?a.apply(this,arguments):void 0
}
},Z.keys=ax||function(c){if(c!==Object(c)){throw new TypeError("Invalid object")
}var a=[];
for(var b in c){Z.has(c,b)&&(a[a.length]=b)
}return a
},Z.values=function(c){var a=[];
for(var b in c){Z.has(c,b)&&a.push(c[b])
}return a
},Z.pairs=function(c){var a=[];
for(var b in c){Z.has(c,b)&&a.push([b,c[b]])
}return a
},Z.invert=function(c){var a={};
for(var b in c){Z.has(c,b)&&(a[c[b]]=b)
}return a
},Z.functions=Z.methods=function(c){var a=[];
for(var b in c){Z.isFunction(c[b])&&a.push(b)
}return a.sort()
},Z.extend=function(a){return W(ah.call(arguments,1),function(b){if(b){for(var c in b){a[c]=b[c]
}}}),a
},Z.pick=function(c){var a={},b=au.apply(ar,ah.call(arguments,1));
return W(b,function(d){d in c&&(a[d]=c[d])
}),a
},Z.omit=function(d){var b={},c=au.apply(ar,ah.call(arguments,1));
for(var a in d){Z.contains(c,a)||(b[a]=d[a])
}return b
},Z.defaults=function(a){return W(ah.call(arguments,1),function(b){if(b){for(var c in b){null==a[c]&&(a[c]=b[c])
}}}),a
},Z.clone=function(a){return Z.isObject(a)?Z.isArray(a)?a.slice():Z.extend({},a):a
},Z.tap=function(b,a){return a(b),b
};
var L=function(g,q,b,k){if(g===q){return 0!==g||1/g==1/q
}if(null==g||null==q){return g===q
}g instanceof Z&&(g=g._wrapped),q instanceof Z&&(q=q._wrapped);
var p=ak.call(g);
if(p!=ak.call(q)){return !1
}switch(p){case"[object String]":return g==q+"";
case"[object Number]":return g!=+g?q!=+q:0==g?1/g==1/q:g==+q;
case"[object Date]":case"[object Boolean]":return +g==+q;
case"[object RegExp]":return g.source==q.source&&g.global==q.global&&g.multiline==q.multiline&&g.ignoreCase==q.ignoreCase
}if("object"!=typeof g||"object"!=typeof q){return !1
}for(var h=b.length;
h--;
){if(b[h]==g){return k[h]==q
}}b.push(g),k.push(q);
var m=0,d=!0;
if("[object Array]"==p){if(m=g.length,d=m==q.length){for(;
m--&&(d=L(g[m],q[m],b,k));
){}}}else{var l=g.constructor,j=q.constructor;
if(l!==j&&!(Z.isFunction(l)&&l instanceof l&&Z.isFunction(j)&&j instanceof j)){return !1
}for(var v in g){if(Z.has(g,v)&&(m++,!(d=Z.has(q,v)&&L(g[v],q[v],b,k)))){break
}}if(d){for(v in q){if(Z.has(q,v)&&!m--){break
}}d=!m
}}return b.pop(),k.pop(),d
};
Z.isEqual=function(b,a){return L(b,a,[],[])
},Z.isEmpty=function(b){if(null==b){return !0
}if(Z.isArray(b)||Z.isString(b)){return 0===b.length
}for(var a in b){if(Z.has(b,a)){return !1
}}return !0
},Z.isElement=function(a){return !(!a||1!==a.nodeType)
},Z.isArray=Y||function(a){return"[object Array]"==ak.call(a)
},Z.isObject=function(a){return a===Object(a)
},W(["Arguments","Function","String","Number","Date","RegExp"],function(a){Z["is"+a]=function(b){return ak.call(b)=="[object "+a+"]"
}
}),Z.isArguments(arguments)||(Z.isArguments=function(a){return !(!a||!Z.has(a,"callee"))
}),"function"!=typeof/./&&(Z.isFunction=function(a){return"function"==typeof a
}),Z.isFinite=function(a){return isFinite(a)&&!isNaN(parseFloat(a))
},Z.isNaN=function(a){return Z.isNumber(a)&&a!=+a
},Z.isBoolean=function(a){return a===!0||a===!1||"[object Boolean]"==ak.call(a)
},Z.isNull=function(a){return null===a
},Z.isUndefined=function(a){return a===void 0
},Z.has=function(b,a){return aq.call(b,a)
},Z.noConflict=function(){return ai._=ac,this
},Z.identity=function(a){return a
},Z.times=function(f,b,c){for(var d=Array(f),a=0;
f>a;
a++){d[a]=b.call(c,a)
}return d
},Z.random=function(b,a){return null==a&&(a=b,b=0),b+Math.floor(Math.random()*(a-b+1))
};
var K={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"}};
K.unescape=Z.invert(K.escape);
var C={escape:RegExp("["+Z.keys(K.escape).join("")+"]","g"),unescape:RegExp("("+Z.keys(K.unescape).join("|")+")","g")};
Z.each(["escape","unescape"],function(a){Z[a]=function(b){return null==b?"":(""+b).replace(C[a],function(c){return K[a][c]
})
}
}),Z.result=function(c,a){if(null==c){return null
}var b=c[a];
return Z.isFunction(b)?b.call(c):b
},Z.mixin=function(a){W(Z.functions(a),function(b){var c=Z[b]=a[b];
Z.prototype[b]=function(){var d=[this._wrapped];
return aw.apply(d,arguments),U.call(this,c.apply(Z,d))
}
})
};
var J=0;
Z.uniqueId=function(b){var a=++J+"";
return b?b+a:a
},Z.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};
var z=/(.)^/,af={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},V=/\\|'|\r|\n|\t|\u2028|\u2029/g;
Z.template=function(f,m,b){var h;
b=Z.defaults({},b,Z.templateSettings);
var l=RegExp([(b.escape||z).source,(b.interpolate||z).source,(b.evaluate||z).source].join("|")+"|$","g"),g=0,k="__p+='";
f.replace(l,function(c,n,p,a,q){return k+=f.slice(g,q).replace(V,function(e){return"\\"+af[e]
}),n&&(k+="'+\n((__t=("+n+"))==null?'':_.escape(__t))+\n'"),p&&(k+="'+\n((__t=("+p+"))==null?'':__t)+\n'"),a&&(k+="';\n"+a+"\n__p+='"),g=q+c.length,c
}),k+="';\n",b.variable||(k="with(obj||{}){\n"+k+"}\n"),k="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+k+"return __p;\n";
try{h=Function(b.variable||"obj","_",k)
}catch(d){throw d.source=k,d
}if(m){return h(m,Z)
}var j=function(a){return h.call(this,a,Z)
};
return j.source="function("+(b.variable||"obj")+"){\n"+k+"}",j
},Z.chain=function(a){return Z(a).chain()
};
var U=function(a){return this._chain?Z(a).chain():a
};
Z.mixin(Z),W(["pop","push","reverse","shift","sort","splice","unshift"],function(b){var a=ar[b];
Z.prototype[b]=function(){var c=this._wrapped;
return a.apply(c,arguments),"shift"!=b&&"splice"!=b||0!==c.length||delete c[0],U.call(this,c)
}
}),W(["concat","join","slice"],function(b){var a=ar[b];
Z.prototype[b]=function(){return U.call(this,a.apply(this._wrapped,arguments))
}
}),Z.extend(Z.prototype,{chain:function(){return this._chain=!0,this
},value:function(){return this._wrapped
}})
}).call(this);
(function(){var ac=this;
var aq=ac.Backbone;
var am=[];
var ae=am.push;
var ad=am.slice;
var ah=am.splice;
var av;
if(typeof exports!=="undefined"){av=exports
}else{av=ac.Backbone={}
}av.VERSION="1.0.0";
var an=ac._;
if(!an&&typeof require!=="undefined"){an=require("underscore")
}av.$=ac.jQuery||ac.Zepto||ac.ender||ac.$;
av.noConflict=function(){ac.Backbone=aq;
return this
};
av.emulateHTTP=false;
av.emulateJSON=false;
var ag=av.Events={on:function(b,d,a){if(!aj(this,"on",b,[d,a])||!d){return this
}this._events||(this._events={});
var c=this._events[b]||(this._events[b]=[]);
c.push({callback:d,context:a,ctx:a||this});
return this
},once:function(b,f,a){if(!aj(this,"once",b,[f,a])||!f){return this
}var d=this;
var c=an.once(function(){d.off(b,c);
f.apply(this,arguments)
});
c._callback=f;
return this.on(b,c,a)
},off:function(v,k,h){var b,w,g,m,d,p,l,j;
if(!this._events||!aj(this,"off",v,[k,h])){return this
}if(!v&&!k&&!h){this._events={};
return this
}m=v?[v]:an.keys(this._events);
for(d=0,p=m.length;
d<p;
d++){v=m[d];
if(g=this._events[v]){this._events[v]=b=[];
if(k||h){for(l=0,j=g.length;
l<j;
l++){w=g[l];
if(k&&k!==w.callback&&k!==w.callback._callback||h&&h!==w.context){b.push(w)
}}}if(!b.length){delete this._events[v]
}}}return this
},trigger:function(b){if(!this._events){return this
}var d=ad.call(arguments,1);
if(!aj(this,"trigger",b,d)){return this
}var a=this._events[b];
var c=this._events.all;
if(a){at(a,d)
}if(c){at(c,arguments)
}return this
},stopListening:function(b,f,a){var d=this._listeners;
if(!d){return this
}var c=!f&&!a;
if(typeof f==="object"){a=this
}if(b){(d={})[b._listenerId]=b
}for(var g in d){d[g].off(f,a,this);
if(c){delete this._listeners[g]
}}return this
}};
var ab=/\s+/;
var aj=function(d,k,c,j){if(!c){return true
}if(typeof c==="object"){for(var g in c){d[k].apply(d,[g,c[g]].concat(j))
}return false
}if(ab.test(c)){var l=c.split(ab);
for(var b=0,f=l.length;
b<f;
b++){d[k].apply(d,[l[b]].concat(j))
}return false
}return true
};
var at=function(d,k){var c,j=-1,g=d.length,l=k[0],b=k[1],f=k[2];
switch(k.length){case 0:while(++j<g){(c=d[j]).callback.call(c.ctx)
}return;
case 1:while(++j<g){(c=d[j]).callback.call(c.ctx,l)
}return;
case 2:while(++j<g){(c=d[j]).callback.call(c.ctx,l,b)
}return;
case 3:while(++j<g){(c=d[j]).callback.call(c.ctx,l,b,f)
}return;
default:while(++j<g){(c=d[j]).callback.apply(c.ctx,k)
}}};
var ap={listenTo:"on",listenToOnce:"once"};
an.each(ap,function(a,b){ag[b]=function(g,c,f){var d=this._listeners||(this._listeners={});
var h=g._listenerId||(g._listenerId=an.uniqueId("l"));
d[h]=g;
if(typeof c==="object"){f=this
}g[a](c,f,this);
return this
}
});
ag.bind=ag.on;
ag.unbind=ag.off;
an.extend(av,ag);
var ar=av.Model=function(b,d){var a;
var c=b||{};
d||(d={});
this.cid=an.uniqueId("c");
this.attributes={};
an.extend(this,an.pick(d,af));
if(d.parse){c=this.parse(c,d)||{}
}if(a=an.result(this,"defaults")){c=an.defaults({},c,a)
}this.set(c,d);
this.changed={};
this.initialize.apply(this,arguments)
};
var af=["url","urlRoot","collection"];
an.extend(ar.prototype,ag,{changed:null,validationError:null,idAttribute:"id",initialize:function(){},toJSON:function(a){return an.clone(this.attributes)
},sync:function(){return av.sync.apply(this,arguments)
},get:function(a){return this.attributes[a]
},escape:function(a){return an.escape(this.get(a))
},has:function(a){return this.get(a)!=null
},set:function(A,p,k){var b,C,h,x,g,y,j,w;
if(A==null){return this
}if(typeof A==="object"){C=A;
k=p
}else{(C={})[A]=p
}k||(k={});
if(!this._validate(C,k)){return false
}h=k.unset;
g=k.silent;
x=[];
y=this._changing;
this._changing=true;
if(!y){this._previousAttributes=an.clone(this.attributes);
this.changed={}
}w=this.attributes,j=this._previousAttributes;
if(this.idAttribute in C){this.id=C[this.idAttribute]
}for(b in C){p=C[b];
if(!an.isEqual(w[b],p)){x.push(b)
}if(!an.isEqual(j[b],p)){this.changed[b]=p
}else{delete this.changed[b]
}h?delete w[b]:w[b]=p
}if(!g){if(x.length){this._pending=true
}for(var m=0,v=x.length;
m<v;
m++){this.trigger("change:"+x[m],this,w[x[m]],k)
}}if(y){return this
}if(!g){while(this._pending){this._pending=false;
this.trigger("change",this,k)
}}this._pending=false;
this._changing=false;
return this
},unset:function(a,b){return this.set(a,void 0,an.extend({},b,{unset:true}))
},clear:function(b){var c={};
for(var a in this.attributes){c[a]=void 0
}return this.set(c,an.extend({},b,{unset:true}))
},hasChanged:function(a){if(a==null){return !an.isEmpty(this.changed)
}return an.has(this.changed,a)
},changedAttributes:function(b){if(!b){return this.hasChanged()?an.clone(this.changed):false
}var f,a=false;
var d=this._changing?this._previousAttributes:this.attributes;
for(var c in b){if(an.isEqual(d[c],f=b[c])){continue
}(a||(a={}))[c]=f
}return a
},previous:function(a){if(a==null||!this._previousAttributes){return null
}return this._previousAttributes[a]
},previousAttributes:function(){return an.clone(this._previousAttributes)
},fetch:function(b){b=b?an.clone(b):{};
if(b.parse===void 0){b.parse=true
}var c=this;
var a=b.success;
b.success=function(d){if(!c.set(c.parse(d,b),b)){return false
}if(a){a(c,d,b)
}c.trigger("sync",c,d,b)
};
D(this,b);
return this.sync("read",this,b)
},save:function(k,g,f){var b,l,d,h=this.attributes;
if(k==null||typeof k==="object"){b=k;
f=g
}else{(b={})[k]=g
}if(b&&(!f||!f.wait)&&!this.set(b,f)){return false
}f=an.extend({validate:true},f);
if(!this._validate(b,f)){return false
}if(b&&f.wait){this.attributes=an.extend({},h,b)
}if(f.parse===void 0){f.parse=true
}var c=this;
var j=f.success;
f.success=function(a){c.attributes=h;
var m=c.parse(a,f);
if(f.wait){m=an.extend(b||{},m)
}if(an.isObject(m)&&!c.set(m,f)){return false
}if(j){j(c,a,f)
}c.trigger("sync",c,a,f)
};
D(this,f);
l=this.isNew()?"create":f.patch?"patch":"update";
if(l==="patch"){f.attrs=b
}d=this.sync(l,this,f);
if(b&&f.wait){this.attributes=h
}return d
},destroy:function(b){b=b?an.clone(b):{};
var f=this;
var a=b.success;
var d=function(){f.trigger("destroy",f,f.collection,b)
};
b.success=function(e){if(b.wait||f.isNew()){d()
}if(a){a(f,e,b)
}if(!f.isNew()){f.trigger("sync",f,e,b)
}};
if(this.isNew()){b.success();
return false
}D(this,b);
var c=this.sync("delete",this,b);
if(!b.wait){d()
}return c
},url:function(){var a=an.result(this,"urlRoot")||an.result(this.collection,"url")||q();
if(this.isNew()){return a
}return a+(a.charAt(a.length-1)==="/"?"":"/")+encodeURIComponent(this.id)
},parse:function(a,b){return a
},clone:function(){return new this.constructor(this.attributes)
},isNew:function(){return this.id==null
},isValid:function(a){return this._validate({},an.extend(a||{},{validate:true}))
},_validate:function(b,c){if(!c.validate||!this.validate){return true
}b=an.extend({},this.attributes,b);
var a=this.validationError=this.validate(b,c)||null;
if(!a){return true
}this.trigger("invalid",this,a,an.extend(c||{},{validationError:a}));
return false
}});
var aa=["keys","values","pairs","invert","pick","omit"];
an.each(aa,function(a){ar.prototype[a]=function(){var b=ad.call(arguments);
b.unshift(this.attributes);
return an[a].apply(an,b)
}
});
var ao=av.Collection=function(a,b){b||(b={});
if(b.url){this.url=b.url
}if(b.model){this.model=b.model
}if(b.comparator!==void 0){this.comparator=b.comparator
}this._reset();
this.initialize.apply(this,arguments);
if(a){this.reset(a,an.extend({silent:true},b))
}};
var ai={add:true,remove:true,merge:true};
var X={add:true,merge:false,remove:false};
an.extend(ao.prototype,ag,{model:ar,initialize:function(){},toJSON:function(a){return this.map(function(b){return b.toJSON(a)
})
},sync:function(){return av.sync.apply(this,arguments)
},add:function(a,b){return this.set(a,an.defaults(b||{},X))
},remove:function(b,f){b=an.isArray(b)?b.slice():[b];
f||(f={});
var a,d,c,g;
for(a=0,d=b.length;
a<d;
a++){g=this.get(b[a]);
if(!g){continue
}delete this._byId[g.id];
delete this._byId[g.cid];
c=this.indexOf(g);
this.models.splice(c,1);
this.length--;
if(!f.silent){f.index=c;
g.trigger("remove",g,this,f)
}this._removeReference(g)
}return this
},set:function(E,r){r=an.defaults(r||{},ai);
if(r.parse){E=this.parse(E,r)
}if(!an.isArray(E)){E=E?[E]:[]
}var k,H,y,h,C,j;
var x=r.at;
var n=this.comparator&&x==null&&r.sort!==false;
var w=an.isString(this.comparator)?this.comparator:null;
var b=[],A=[],m={};
for(k=0,H=E.length;
k<H;
k++){if(!(y=this._prepareModel(E[k],r))){continue
}if(C=this.get(y)){if(r.remove){m[C.cid]=true
}if(r.merge){C.set(y.attributes,r);
if(n&&!j&&C.hasChanged(w)){j=true
}}}else{if(r.add){b.push(y);
y.on("all",this._onModelEvent,this);
this._byId[y.cid]=y;
if(y.id!=null){this._byId[y.id]=y
}}}}if(r.remove){for(k=0,H=this.length;
k<H;
++k){if(!m[(y=this.models[k]).cid]){A.push(y)
}}if(A.length){this.remove(A,r)
}}if(b.length){if(n){j=true
}this.length+=b.length;
if(x!=null){ah.apply(this.models,[x,0].concat(b))
}else{ae.apply(this.models,b)
}}if(j){this.sort({silent:true})
}if(r.silent){return this
}for(k=0,H=b.length;
k<H;
k++){(y=b[k]).trigger("add",y,this,r)
}if(j){this.trigger("sort",this,r)
}return this
},reset:function(b,d){d||(d={});
for(var a=0,c=this.models.length;
a<c;
a++){this._removeReference(this.models[a])
}d.previousModels=this.models;
this._reset();
this.add(b,an.extend({silent:true},d));
if(!d.silent){this.trigger("reset",this,d)
}return this
},push:function(a,b){a=this._prepareModel(a,b);
this.add(a,an.extend({at:this.length},b));
return a
},pop:function(a){var b=this.at(this.length-1);
this.remove(b,a);
return b
},unshift:function(a,b){a=this._prepareModel(a,b);
this.add(a,an.extend({at:0},b));
return a
},shift:function(a){var b=this.at(0);
this.remove(b,a);
return b
},slice:function(a,b){return this.models.slice(a,b)
},get:function(a){if(a==null){return void 0
}return this._byId[a.id!=null?a.id:a.cid||a]
},at:function(a){return this.models[a]
},where:function(a,b){if(an.isEmpty(a)){return b?void 0:[]
}return this[b?"find":"filter"](function(d){for(var c in a){if(a[c]!==d.get(c)){return false
}}return true
})
},findWhere:function(a){return this.where(a,true)
},sort:function(a){if(!this.comparator){throw new Error("Cannot sort a set without a comparator")
}a||(a={});
if(an.isString(this.comparator)||this.comparator.length===1){this.models=this.sortBy(this.comparator,this)
}else{this.models.sort(an.bind(this.comparator,this))
}if(!a.silent){this.trigger("sort",this,a)
}return this
},sortedIndex:function(b,d,a){d||(d=this.comparator);
var c=an.isFunction(d)?d:function(e){return e.get(d)
};
return an.sortedIndex(this.models,b,c,a)
},pluck:function(a){return an.invoke(this.models,"get",a)
},fetch:function(b){b=b?an.clone(b):{};
if(b.parse===void 0){b.parse=true
}var c=b.success;
var a=this;
b.success=function(e){var d=b.reset?"reset":"set";
a[d](e,b);
if(c){c(a,e,b)
}a.trigger("sync",a,e,b)
};
D(this,b);
return this.sync("read",this,b)
},create:function(b,d){d=d?an.clone(d):{};
if(!(b=this._prepareModel(b,d))){return false
}if(!d.wait){this.add(b,d)
}var a=this;
var c=d.success;
d.success=function(e){if(d.wait){a.add(b,d)
}if(c){c(b,e,d)
}};
b.save(null,d);
return b
},parse:function(a,b){return a
},clone:function(){return new this.constructor(this.models)
},_reset:function(){this.length=0;
this.models=[];
this._byId={}
},_prepareModel:function(b,c){if(b instanceof ar){if(!b.collection){b.collection=this
}return b
}c||(c={});
c.collection=this;
var a=new this.model(b,c);
if(!a._validate(b,c)){this.trigger("invalid",this,b,c);
return false
}return a
},_removeReference:function(a){if(this===a.collection){delete a.collection
}a.off("all",this._onModelEvent,this)
},_onModelEvent:function(b,d,a,c){if((b==="add"||b==="remove")&&a!==this){return
}if(b==="destroy"){this.remove(d,c)
}if(d&&b==="change:"+d.idAttribute){delete this._byId[d.previous(d.idAttribute)];
if(d.id!=null){this._byId[d.id]=d
}}this.trigger.apply(this,arguments)
}});
var aw=["forEach","each","map","collect","reduce","foldl","inject","reduceRight","foldr","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","toArray","size","first","head","take","initial","rest","tail","drop","last","without","indexOf","shuffle","lastIndexOf","isEmpty","chain"];
an.each(aw,function(a){ao.prototype[a]=function(){var b=ad.call(arguments);
b.unshift(this.models);
return an[a].apply(an,b)
}
});
var Z=["groupBy","countBy","sortBy"];
an.each(Z,function(a){ao.prototype[a]=function(d,b){var c=an.isFunction(d)?d:function(e){return e.get(d)
};
return an[a](this.models,c,b)
}
});
var au=av.View=function(a){this.cid=an.uniqueId("view");
this._configure(a||{});
this._ensureElement();
this.initialize.apply(this,arguments);
this.delegateEvents()
};
var Y=/^(\S+)\s*(.*)$/;
var M=["model","collection","el","id","attributes","className","tagName","events"];
an.extend(au.prototype,ag,{tagName:"div",$:function(a){return this.$el.find(a)
},initialize:function(){},render:function(){return this
},remove:function(){this.$el.remove();
this.stopListening();
return this
},setElement:function(a,b){if(this.$el){this.undelegateEvents()
}this.$el=a instanceof av.$?a:av.$(a);
this.el=this.$el[0];
if(b!==false){this.delegateEvents()
}return this
},delegateEvents:function(b){if(!(b||(b=an.result(this,"events")))){return this
}this.undelegateEvents();
for(var f in b){var a=b[f];
if(!an.isFunction(a)){a=this[b[f]]
}if(!a){continue
}var d=f.match(Y);
var c=d[1],g=d[2];
a=an.bind(a,this);
c+=".delegateEvents"+this.cid;
if(g===""){this.$el.on(c,a)
}else{this.$el.on(c,g,a)
}}return this
},undelegateEvents:function(){this.$el.off(".delegateEvents"+this.cid);
return this
},_configure:function(a){if(this.options){a=an.extend({},an.result(this,"options"),a)
}an.extend(this,an.pick(a,M));
this.options=a
},_ensureElement:function(){if(!this.el){var a=an.extend({},an.result(this,"attributes"));
if(this.id){a.id=an.result(this,"id")
}if(this.className){a["class"]=an.result(this,"className")
}var b=av.$("<"+an.result(this,"tagName")+">").attr(a);
this.setElement(b,false)
}else{this.setElement(an.result(this,"el"),false)
}}});
av.sync=function(b,f,a){var d=ak[b];
an.defaults(a||(a={}),{emulateHTTP:av.emulateHTTP,emulateJSON:av.emulateJSON});
var c={type:d,dataType:"json"};
if(!a.url){c.url=an.result(f,"url")||q()
}if(a.data==null&&f&&(b==="create"||b==="update"||b==="patch")){c.contentType="application/json";
c.data=JSON.stringify(a.attrs||f.toJSON(a))
}if(a.emulateJSON){c.contentType="application/x-www-form-urlencoded";
c.data=c.data?{model:c.data}:{}
}if(a.emulateHTTP&&(d==="PUT"||d==="DELETE"||d==="PATCH")){c.type="POST";
if(a.emulateJSON){c.data._method=d
}var h=a.beforeSend;
a.beforeSend=function(e){e.setRequestHeader("X-HTTP-Method-Override",d);
if(h){return h.apply(this,arguments)
}}
}if(c.type!=="GET"&&!a.emulateJSON){c.processData=false
}if(c.type==="PATCH"&&window.ActiveXObject&&!(window.external&&window.external.msActiveXFilteringEnabled)){c.xhr=function(){return new ActiveXObject("Microsoft.XMLHTTP")
}
}var g=a.xhr=av.ajax(an.extend(c,a));
f.trigger("request",f,g,a);
return g
};
var ak={create:"POST",update:"PUT",patch:"PATCH","delete":"DELETE",read:"GET"};
av.ajax=function(){return av.$.ajax.apply(av.$,arguments)
};
var B=av.Router=function(a){a||(a={});
if(a.routes){this.routes=a.routes
}this._bindRoutes();
this.initialize.apply(this,arguments)
};
var W=/\((.*?)\)/g;
var z=/(\(\?)?:\w+/g;
var L=/\*\w+/g;
var V=/[\-{}\[\]+?.,\\\^$|#\s]/g;
an.extend(B.prototype,ag,{initialize:function(){},route:function(b,d,a){if(!an.isRegExp(b)){b=this._routeToRegExp(b)
}if(an.isFunction(d)){a=d;
d=""
}if(!a){a=this[d]
}var c=this;
av.history.route(b,function(e){var f=c._extractParameters(b,e);
a&&a.apply(c,f);
c.trigger.apply(c,["route:"+d].concat(f));
c.trigger("route",d,f);
av.history.trigger("route",c,d,f)
});
return this
},navigate:function(a,b){av.history.navigate(a,b);
return this
},_bindRoutes:function(){if(!this.routes){return
}this.routes=an.result(this,"routes");
var a,b=an.keys(this.routes);
while((a=b.pop())!=null){this.route(a,this.routes[a])
}},_routeToRegExp:function(a){a=a.replace(V,"\\$&").replace(W,"(?:$1)?").replace(z,function(b,c){return c?b:"([^/]+)"
}).replace(L,"(.*?)");
return new RegExp("^"+a+"$")
},_extractParameters:function(b,c){var a=b.exec(c).slice(1);
return an.map(a,function(d){return d?decodeURIComponent(d):null
})
}});
var K=av.History=function(){this.handlers=[];
an.bindAll(this,"checkUrl");
if(typeof window!=="undefined"){this.location=window.location;
this.history=window.history
}};
var J=/^[#\/]|\s+$/g;
var F=/^\/+|\/+$/g;
var G=/msie [\w.]+/;
var Q=/\/$/;
K.started=false;
an.extend(K.prototype,ag,{interval:50,getHash:function(a){var b=(a||this).location.href.match(/#(.*)$/);
return b?b[1]:""
},getFragment:function(b,c){if(b==null){if(this._hasPushState||!this._wantsHashChange||c){b=this.location.pathname;
var a=this.root.replace(Q,"");
if(!b.indexOf(a)){b=b.substr(a.length)
}}else{b=this.getHash()
}}return b.replace(J,"")
},start:function(b){if(K.started){throw new Error("Backbone.history has already been started")
}K.started=true;
this.options=an.extend({},{root:"/"},this.options,b);
this.root=this.options.root;
this._wantsHashChange=this.options.hashChange!==false;
this._wantsPushState=!!this.options.pushState;
this._hasPushState=!!(this.options.pushState&&this.history&&this.history.pushState);
var f=this.getFragment();
var a=document.documentMode;
var d=G.exec(navigator.userAgent.toLowerCase())&&(!a||a<=7);
this.root=("/"+this.root+"/").replace(F,"/");
if(d&&this._wantsHashChange){this.iframe=av.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow;
this.navigate(f)
}if(this._hasPushState){av.$(window).on("popstate",this.checkUrl)
}else{if(this._wantsHashChange&&"onhashchange" in window&&!d){av.$(window).on("hashchange",this.checkUrl)
}else{if(this._wantsHashChange){this._checkUrlInterval=setInterval(this.checkUrl,this.interval)
}}}this.fragment=f;
var c=this.location;
var g=c.pathname.replace(/[^\/]$/,"$&/")===this.root;
if(this._wantsHashChange&&this._wantsPushState&&!this._hasPushState&&!g){this.fragment=this.getFragment(null,true);
this.location.replace(this.root+this.location.search+"#"+this.fragment);
return true
}else{if(this._wantsPushState&&this._hasPushState&&g&&c.hash){this.fragment=this.getHash().replace(J,"");
this.history.replaceState({},document.title,this.root+this.fragment+c.search)
}}if(!this.options.silent){return this.loadUrl()
}},stop:function(){av.$(window).off("popstate",this.checkUrl).off("hashchange",this.checkUrl);
clearInterval(this._checkUrlInterval);
K.started=false
},route:function(a,b){this.handlers.unshift({route:a,callback:b})
},checkUrl:function(a){var b=this.getFragment();
if(b===this.fragment&&this.iframe){b=this.getFragment(this.getHash(this.iframe))
}if(b===this.fragment){return false
}if(this.iframe){this.navigate(b)
}this.loadUrl()||this.loadUrl(this.getHash())
},loadUrl:function(b){var c=this.fragment=this.getFragment(b);
var a=an.any(this.handlers,function(d){if(d.route.test(c)){d.callback(c);
return true
}});
return a
},navigate:function(b,c){if(!K.started){return false
}if(!c||c===true){c={trigger:c}
}b=this.getFragment(b||"");
if(this.fragment===b){return
}this.fragment=b;
var a=this.root+b;
if(this._hasPushState){this.history[c.replace?"replaceState":"pushState"]({},document.title,a)
}else{if(this._wantsHashChange){this._updateHash(this.location,b,c.replace);
if(this.iframe&&b!==this.getFragment(this.getHash(this.iframe))){if(!c.replace){this.iframe.document.open().close()
}this._updateHash(this.iframe.location,b,c.replace)
}}else{return this.location.assign(a)
}}if(c.trigger){this.loadUrl(b)
}},_updateHash:function(b,d,a){if(a){var c=b.href.replace(/(javascript:|#).*$/,"");
b.replace(c+"#"+d)
}else{b.hash="#"+d
}}});
av.history=new K;
var al=function(b,f){var a=this;
var d;
if(b&&an.has(b,"constructor")){d=b.constructor
}else{d=function(){return a.apply(this,arguments)
}
}an.extend(d,a,f);
var c=function(){this.constructor=d
};
c.prototype=a.prototype;
d.prototype=new c;
if(b){an.extend(d.prototype,b)
}d.__super__=a.prototype;
return d
};
ar.extend=ao.extend=B.extend=au.extend=K.extend=al;
var q=function(){throw new Error('A "url" property or function must be specified')
};
var D=function(b,c){var a=c.error;
c.error=function(d){if(a){a(b,d,c)
}b.trigger("error",b,d,c)
}
}
}).call(this);
var BrowserDetect={init:function(){this.browser=this.searchString(this.dataBrowser)||this.dataBrowser;
this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"unknown version";
this.OS=this.searchString(this.dataOS)||"an unknown OS"
},searchString:function(d){for(var a=0;
a<d.length;
a++){var b=d[a].string;
var c=d[a].prop;
this.versionSearchString=d[a].versionSearch||d[a].identity;
if(b){if(b.indexOf(d[a].subString)!=-1){return d[a].identity
}}else{if(c){return d[a].identity
}}}},searchVersion:function(b){var a=b.indexOf(this.versionSearchString);
if(a==-1){return
}return parseFloat(b.substring(a+this.versionSearchString.length+1))
},dataBrowser:[{string:navigator.userAgent,subString:"Android",versionSearch:"Android ",identity:"Android"},{string:navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:navigator.userAgent,subString:"Safari",identity:"Safari",versionSearch:"Version"},{string:navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera",versionSearch:"Version"},{string:navigator.vendor,subString:"iCab",identity:"iCab"},{string:navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.vendor,subString:"Camino",identity:"Camino"},{string:navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],dataOS:[{string:navigator.platform,subString:"Win",identity:"Windows"},{string:navigator.platform,subString:"Mac",identity:"Mac"},{string:navigator.userAgent,subString:"iPhone",identity:"iPhone/iPod"},{string:navigator.userAgent,subString:"Android",identity:"Android"},{string:navigator.platform,subString:"Linux",identity:"Linux"}]};
BrowserDetect.init();
function getSiteCookie(d){var b=document.cookie;
var c=b.indexOf(" "+d+"=");
if(c==-1){c=b.indexOf(d+"=")
}if(c==-1){b=null
}else{c=b.indexOf("=",c)+1;
var a=b.indexOf(";",c);
if(a==-1){a=b.length
}b=decodeURI(b.substring(c,a))
}return b
}function setSiteCookie(a,d,b){var e=new Date();
e.setDate(e.getDate()+b);
var c=encodeURI(d)+((b===null)?"":"; path=/; expires="+e.toUTCString());
document.cookie=a+"="+c
}function launchWarningMsg(){if(!getSiteCookie("doNotWarnBrowser")){showElement($("#js-unsupported-browser-warning"))
}}$(document).ready(function(){$("#js-unsupported-browser-dismiss").click(function(){setSiteCookie("doNotWarnBrowser","1",200);
hideElement($("#js-unsupported-browser-warning"))
});
var b=navigator.userAgent;
if(BrowserDetect.browser=="Explorer"&&BrowserDetect.version<9){launchWarningMsg()
}else{if(BrowserDetect.browser=="Firefox"&&BrowserDetect.version<11){launchWarningMsg()
}else{if(BrowserDetect.browser=="Chrome"&&BrowserDetect.version<14&&(BrowserDetect.OS=="Windows"||BrowserDetect.OS=="Mac")){launchWarningMsg()
}else{if(BrowserDetect.browser=="Safari"&&BrowserDetect.version<5){launchWarningMsg()
}else{if(BrowserDetect.browser=="Safari"&&BrowserDetect.version=="unknown version"){var a=parseFloat(b.slice(b.indexOf("Safari/")+7));
if(a&&a<420){launchWarningMsg()
}}}}}}});
window.Modernizr=function(ah,ag,af){function F(b){Y.cssText=b
}function E(d,c){return F(prefixes.join(d+";")+(c||""))
}function S(d,c){return typeof d===c
}function Q(d,c){return !!~(""+d).indexOf(c)
}function O(g,c,k){for(var j in g){var h=c[g[j]];
if(h!==af){return k===!1?g[j]:S(h,"function")?h.bind(k||c):h
}}return !1
}var ae="2.7.1",ad={},ac=!0,ab=ag.documentElement,aa="modernizr",Z=ag.createElement(aa),Y=Z.style,X,W={}.toString,V="Webkit Moz O ms",U=V.split(" "),T=V.toLowerCase().split(" "),R={svg:"http://www.w3.org/2000/svg"},P={},N={},M={},K=[],J=K.slice,I,H={}.hasOwnProperty,G;
!S(H,"undefined")&&!S(H.call,"undefined")?G=function(d,c){return H.call(d,c)
}:G=function(d,c){return c in d&&S(d.constructor.prototype[c],"undefined")
},Function.prototype.bind||(Function.prototype.bind=function(a){var h=this;
if(typeof h!="function"){throw new TypeError
}var g=J.call(arguments,1),f=function(){if(this instanceof f){var b=function(){};
b.prototype=h.prototype;
var d=new b,c=h.apply(d,g.concat(J.call(arguments)));
return Object(c)===c?c:d
}return h.apply(a,g.concat(J.call(arguments)))
};
return f
}),P.localstorage=function(){try{return localStorage.setItem(aa,aa),localStorage.removeItem(aa),!0
}catch(b){return !1
}},P.svg=function(){return !!ag.createElementNS&&!!ag.createElementNS(R.svg,"svg").createSVGRect
};
for(var L in P){G(P,L)&&(I=L.toLowerCase(),ad[I]=P[L](),K.push((ad[I]?"":"no-")+I))
}return ad.addTest=function(e,c){if(typeof e=="object"){for(var f in e){G(e,f)&&ad.addTest(f,e[f])
}}else{e=e.toLowerCase();
if(ad[e]!==af){return ad
}c=typeof c=="function"?c():c,typeof ac!="undefined"&&ac&&(ab.className+=" "+(c?"":"no-")+e),ad[e]=c
}return ad
},F(""),Z=X=null,function(aq,ap){function B(f,e){var h=f.createElement("p"),g=f.getElementsByTagName("head")[0]||f.documentElement;
return h.innerHTML="x<style>"+e+"</style>",g.insertBefore(h.lastChild,g.firstChild)
}function A(){var b=u.elements;
return typeof b=="string"?b.split(" "):b
}function z(d){var c=D[d[aj]];
return c||(c={},ai++,d[aj]=ai,D[ai]=c),c
}function y(b,h,f){h||(h=ap);
if(C){return h.createElement(b)
}f||(f=z(h));
var e;
return f.cache[b]?e=f.cache[b].cloneNode():al.test(b)?e=(f.cache[b]=f.createElem(b)).cloneNode():e=f.createElem(b),e.canHaveChildren&&!am.test(b)&&!e.tagUrn?f.frag.appendChild(e):e
}function x(b,m){b||(b=ap);
if(C){return b.createDocumentFragment()
}m=m||z(b);
var l=m.frag.cloneNode(),k=0,j=A(),h=j.length;
for(;
k<h;
k++){l.createElement(j[k])
}return l
}function w(d,c){c.cache||(c.cache={},c.createElem=d.createElement,c.createFrag=d.createDocumentFragment,c.frag=c.createFrag()),d.createElement=function(a){return u.shivMethods?y(a,d,c):c.createElem(a)
},d.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+A().join().replace(/[\w\-]+/g,function(b){return c.createElem(b),c.frag.createElement(b),'c("'+b+'")'
})+");return n}")(u,c.frag)
}function v(b){b||(b=ap);
var d=z(b);
return u.shivCSS&&!ak&&!d.hasCSS&&(d.hasCSS=!!B(b,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),C||w(b,d),b
}var ao="3.7.0",an=aq.html5||{},am=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,al=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,ak,aj="_html5shiv",ai=0,D={},C;
(function(){try{var b=ap.createElement("a");
b.innerHTML="<xyz></xyz>",ak="hidden" in b,C=b.childNodes.length==1||function(){ap.createElement("a");
var c=ap.createDocumentFragment();
return typeof c.cloneNode=="undefined"||typeof c.createDocumentFragment=="undefined"||typeof c.createElement=="undefined"
}()
}catch(d){ak=!0,C=!0
}})();
var u={elements:an.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:ao,shivCSS:an.shivCSS!==!1,supportsUnknownElements:C,shivMethods:an.shivMethods!==!1,type:"default",shivDocument:v,createElement:y,createDocumentFragment:x};
aq.html5=u,v(ap)
}(this,ag),ad._version=ae,ad._domPrefixes=T,ad._cssomPrefixes=U,ab.className=ab.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(ac?" js "+K.join(" "):""),ad
}(this,this.document),function(ad,ac,ab){function aa(b){return"[object Function]"==P.call(b)
}function Z(b){return"string"==typeof b
}function Y(){}function X(b){return !b||"loaded"==b||"complete"==b||"uninitialized"==b
}function W(){var b=O.shift();
M=1,b?b.t?R(function(){("c"==b.t?L.injectCss:L.injectJs)(b.s,0,b.a,b.x,b.e,1)
},0):(b(),W()):M=0
}function V(x,w,v,s,q,p,n){function m(a){if(!g&&X(h.readyState)&&(y.r=g=1,!M&&W(),h.onload=h.onreadystatechange=null,a)){"img"!=x&&R(function(){I.removeChild(h)
},50);
for(var c in D[w]){D[w].hasOwnProperty(c)&&D[w][c].onload()
}}}var n=n||L.errorTimeout,h=ac.createElement(x),g=0,b=0,y={t:v,s:w,e:q,a:p,x:n};
1===D[w]&&(b=1,D[w]=[]),"object"==x?h.data=w:(h.src=w,h.type=x),h.width=h.height="0",h.onerror=h.onload=h.onreadystatechange=function(){m.call(this,b)
},O.splice(s,0,y),"img"!=x&&(b||2===D[w]?(I.insertBefore(h,J?null:Q),R(m,n)):D[w].push(h))
}function U(g,e,k,j,h){return M=0,e=e||"j",Z(g)?V("c"==e?G:H,g,e,this.i++,k,j,h):(O.splice(this.i++,0,g),1==O.length&&W()),this
}function T(){var b=L;
return b.loader={load:U,i:0},b
}var S=ac.documentElement,R=ad.setTimeout,Q=ac.getElementsByTagName("script")[0],P={}.toString,O=[],M=0,K="MozAppearance" in S.style,J=K&&!!ac.createRange().compareNode,I=J?S:Q.parentNode,S=ad.opera&&"[object Opera]"==P.call(ad.opera),S=!!ac.attachEvent&&!S,H=K?"object":S?"script":"img",G=S?"script":H,F=Array.isArray||function(b){return"[object Array]"==P.call(b)
},E=[],D={},C={timeout:function(d,c){return c.length&&(d.timeout=c[0]),d
}},N,L;
L=function(e){function c(j){var j=j.split("!"),h=E.length,r=j.pop(),q=j.length,r={url:r,origUrl:r,prefixes:j},p,o,l;
for(o=0;
o<q;
o++){l=j[o].split("="),(p=C[l.shift()])&&(r=p(r,l))
}for(o=0;
o<h;
o++){r=E[o](r)
}return r
}function n(b,s,r,q,p){var o=c(b),l=o.autoCallback;
o.url.split(".").pop().split("?").shift(),o.bypass||(s&&(s=aa(s)?s:s[b]||s[q]||s[b.split("/").pop().split("?")[0]]),o.instead?o.instead(b,s,r,q,p):(D[o.url]?o.noexec=!0:D[o.url]=1,r.load(o.url,o.forceCSS||!o.forceJS&&"css"==o.url.split(".").pop().split("?").shift()?"c":ab,o.noexec,o.attrs,o.timeout),(aa(s)||aa(l))&&r.load(function(){T(),s&&s(o.origUrl,p,q),l&&l(o.origUrl,p,q),D[o.url]=2
})))
}function m(x,w){function v(b,h){if(b){if(Z(b)){h||(r=function(){var j=[].slice.call(arguments);
q.apply(this,j),p()
}),n(b,r,w,0,u)
}else{if(Object(b)===b){for(g in o=function(){var a=0,j;
for(j in b){b.hasOwnProperty(j)&&a++
}return a
}(),b){b.hasOwnProperty(g)&&(!h&&!--o&&(aa(r)?r=function(){var j=[].slice.call(arguments);
q.apply(this,j),p()
}:r[g]=function(j){return function(){var a=[].slice.call(arguments);
j&&j.apply(this,a),p()
}
}(q[g])),n(b[g],r,w,g,u))
}}}}else{!h&&p()
}}var u=!!x.test,s=x.load||x.both,r=x.callback||Y,q=r,p=x.complete||Y,o,g;
v(u?x.yep:x.nope,!!s),s&&v(s)
}var k,f,d=this.yepnope.loader;
if(Z(e)){n(e,0,d,0)
}else{if(F(e)){for(k=0;
k<e.length;
k++){f=e[k],Z(f)?n(f,0,d,0):F(f)?L(f):Object(f)===f&&m(f,d)
}}else{Object(e)===e&&m(e,d)
}}},L.addPrefix=function(d,c){C[d]=c
},L.addFilter=function(b){E.push(b)
},L.errorTimeout=10000,null==ac.readyState&&ac.addEventListener&&(ac.readyState="loading",ac.addEventListener("DOMContentLoaded",N=function(){ac.removeEventListener("DOMContentLoaded",N,0),ac.readyState="complete"
},0)),ad.yepnope=T(),ad.yepnope.executeStack=W,ad.yepnope.injectJs=function(r,q,p,n,m,h){var g=ac.createElement("script"),f,b,n=n||L.errorTimeout;
g.src=r;
for(b in p){g.setAttribute(b,p[b])
}q=h?W:q||Y,g.onreadystatechange=g.onload=function(){!f&&X(g.readyState)&&(f=1,q(),g.onload=g.onreadystatechange=null)
},R(function(){f||(f=1,q(1))
},n),m?g.onload():Q.parentNode.insertBefore(g,Q)
},ad.yepnope.injectCss=function(b,n,m,l,k,h){var l=ac.createElement("link"),f,n=h?W:n||Y;
l.href=b,l.rel="stylesheet",l.type="text/css";
for(f in m){l.setAttribute(f,m[f])
}k||(Q.parentNode.insertBefore(l,Q),R(n,0))
}
}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))
},Modernizr.addTest("fullscreen",function(){for(var b=0;
b<Modernizr._domPrefixes.length;
b++){if(document[Modernizr._domPrefixes[b].toLowerCase()+"CancelFullScreen"]){return !0
}}return !!document.cancelFullScreen||!1
});
AJAM={};
AJAM.Models={};
AJAM.Views={};
AJAM.Collections={};
AJAM.Templates={};
AJAM.loadTemplates=function(){var a="";
$.ajax({async:false,dataType:"text",url:"/bin/ajam/templates.html",success:function(b){a=b
}});
$(a).each(function(){var b=$(this).attr("class")+"Template";
AJAM.Templates[b]=Mustache.compile($(this).html())
})
};
AJAM.Utils={};
AJAM.Utils.Dates={};
AJAM.Utils.Dates.monthNamesShort=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
AJAM.Utils.Dates.dayNamesShort=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
(function(){AJAM.loadTemplates();
$(document).ready(function(){$(".js-equalHeights").each(function(){var a=$(this).children(".item");
var b=Math.max.apply(null,a.map(function(){return $(this).height()
}).get());
a.each(function(){$(this).css({height:b})
})
})
});
$(document).on("shown",'[data-toggle="tab"]',function(a){$(".ellipsis").ellipsisAJAM()
});
$(document).ready(function(){$(".ellipsis").ellipsisAJAM();
var d=new Spinner({lines:10,length:5,radius:5,width:3,color:"#f89406"}).spin();
$(".ajax-loader").html(d.el).parent().css({"min-height":"30px",position:"relative"});
$(".js-shareDismiss").on("click",function(f){f.preventDefault();
$(this).closest(".js-shareOverlay").css("display","none")
});
$(".js-shareToggle--both").on("click",function(f){f.preventDefault();
$(this).closest(".js-shareOverlay--parent").find(".js-shareOverlay--both").css("display","block")
});
$(".js-shareToggle--link").on("click",function(f){f.preventDefault();
$(this).closest(".js-shareOverlay--parent").find(".js-shareOverlay--embed").css("display","none");
$(this).closest(".js-shareOverlay--parent").find(".js-shareOverlay--link").css("display","block")
});
$(".js-shareToggle--embed").on("click",function(f){f.preventDefault();
$(this).closest(".js-shareOverlay--parent").find(".js-shareOverlay--link").css("display","none");
$(this).closest(".js-shareOverlay--parent").find(".js-shareOverlay--embed").css("display","block")
});
$(".js-shareToggle--link").live("click",function(f){f.preventDefault();
$(this).closest(".js-shareOverlay--parent").find(".js-shareOverlay--embed").css("display","none");
$(this).closest(".js-shareOverlay--parent").find(".js-shareOverlay--link").css("display","block")
});
$(".js-shareToggle--embed").live("click",function(f){f.preventDefault();
$(this).closest(".js-shareOverlay--parent").find(".js-shareOverlay--link").css("display","none");
$(this).closest(".js-shareOverlay--parent").find(".js-shareOverlay--embed").css("display","block")
});
if(typeof CQ==="undefined"||typeof CQ.WCM.getContentFinder()==="undefined"){var c=new ZeroClipboard($(".share-copy"),{moviePath:"/etc/designs/al-jazeera-america/swf/ZeroClipboard.swf"});
c.on("dataRequested",function(e,f){var g=$(this).parent().find("textarea,.videoLink-inputContainer input").val();
e.setText(g);
e.on("complete",function(h,j){$(this).prepend('<span class="zeroclipboard-copied">Copied!</span>');
setTimeout(function(){$(".zeroclipboard-copied").fadeOut(1000,function(){$(this).remove()
})
},1000)
})
});
c.on("noflash",function(e,f){$(".share-copy").css("display","none")
});
c.on("wrongflash",function(e,f){$(".share-copy").css("display","none")
})
}$(".share-formInput").click(function(){$(this).focus();
$(this).select();
this.selectionStart=0;
this.selectionEnd=this.value.length
});
$(".share-formInput").on("keydown",function(f){f.preventDefault();
f.stopPropagation();
return false
});
$(".share-formInput").on("oncut",function(f){f.preventDefault();
f.stopPropagation();
return false
});
var a=document.getElementById("page_refresh_check");
function b(){if(a&&typeof a!=="undefined"){a.value="1"
}}b();
$(".js-magnific--expand__trigger").magnificPopup({type:"image",closeBtnInside:true,showCloseBtn:true,image:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption class="mfp-caption"><div class="mfp-bottom-bar"><div class="mfp-title"></div></div></figcaption></figure></div>',tError:'<a href="%url%">The image #%curr%</a> could not be loaded.',verticalFit:true,titleSrc:function(e){return e.el.attr("data-mfp-caption")+"<small> "+e.el.attr("data-mfp-copyright")+"</small>"
}},callbacks:{open:function(){if((this.currItem.el.attr("data-mfp-caption"))||(this.currItem.el.attr("data-mfp-copyright"))){return
}this.currItem.img[0].nextSibling.style.display="none"
}}});
$(".featuredStories-carousel").on("slide",function(h){var f=$(this).find(".js-featuredStories--index__current");
var g=$(h.relatedTarget).index()+1;
f.text(g)
});
if($("table.tablesaw")){if(typeof CQ==="undefined"||typeof CQ.WCM.getMode()==="undefined"){AJAM.Utils.Tables.init()
}else{AJAM.Utils.Tables.init(true)
}}})
})();
AJAM.Utils.Tables={};
AJAM.Utils.Tables.defaultHandler=function(f){var c=$(f.target),a=c.find("th[data-tablesaw-sortable-default-col]"),d={asc:"tablesaw-sortable-ascending",desc:"tablesaw-sortable-descending"};
if(a){a.toggleClass(d.asc+" "+d.desc).children("button").trigger("click");
if(typeof c.data("tableShadeRow")!=="undefined"){var g=c.data("tableShadeRow");
c.find("tr.shaded").removeClass("shaded");
var b=c.children("tbody").find("tr").get(g-1);
$(b).addClass("shaded")
}}};
AJAM.Utils.Tables.forceWidth=function(d){var c=d.find("thead").children("tr").children("th");
for(i=0;
i<c.length;
++i){var b=$(c[i]),a=b.outerWidth();
b.css("width",a)
}};
AJAM.Utils.Tables.changeIndex=function(b){var a=b.data("showMoreRow");
b.find(".breakpoint").removeClass("breakpoint");
b.find("tr:nth-child("+a+")").addClass("breakpoint")
};
AJAM.Utils.Tables.handleChangeSort=function(b){var a=$(b.target).closest("table");
if(!a.hasClass("active")){a.find("tr[style]").removeAttr("style");
AJAM.Utils.Tables.changeIndex(a)
}};
AJAM.Utils.Tables.handleShowMore=function(h){var g=$(h.target),d=g.parents("table"),b=d.data("showMoreRow"),a=d.find("tbody tr:nth-child("+b+")"),c={active:"See More",inactive:"See Less"},f=(d.hasClass("active")?"active":"inactive");
if(f==="active"){d.find("tbody tr:nth-child(n + "+b+")").animate({opacity:0},500,function(){a.addClass("breakpoint");
d.removeClass("active");
g.html(c[f])
})
}else{a.removeClass("breakpoint");
g.html(c[f]);
d.addClass("active");
d.find("tbody tr:nth-child(n + "+b+")").animate({opacity:1},500)
}};
AJAM.Utils.Tables.init=function(b){$(document).on("tablesawcreate",AJAM.Utils.Tables.defaultHandler);
$(".js-toggle-show-more").on("click",AJAM.Utils.Tables.handleShowMore);
$(document).on("tablesawsorted","table[data-show-more-row]",AJAM.Utils.Tables.handleChangeSort);
if(typeof b!=="undefined"){$("table.tablesaw-sortable").each(function(c,d){AJAM.Utils.Tables.defaultHandler({target:$(d)})
})
}var a=$(".js-force-column-width");
if(a.length!==0){for(t=0;
t<a.length;
++t){AJAM.Utils.Tables.forceWidth($(a[t]))
}a.removeClass("js-force-column-width")
}};
AJAM.Utils.Story={};
AJAM.Utils.Story.addType=function(a){if(a.type){a.isVideo=(a.type==="VIDEO");
a.isOpinion=(a.type==="OPINION");
a.isOpinionOrOpinionChild=false;
a.isBlog=(a.type==="BLOG");
a.isArticle=(a.type==="ARTICLE");
a.isOutsideContent=(a.type=="OUTSIDE_CONTENT");
a.isOpinionOrOpinionChild=a.isOpinion||(a.isBlog&&a.opinionChild)
}return a
};
AJAM.Utils.Story.addMobileReady=function(a){if(a.backgrounder&&a.activated&&(!a.dirty||(a.dirty&&a.previousRevisionIsMobileReady))){a.mobileReady=true
}};
AJAM.Utils.Story.addSentToUmano=function(a){if(a.umanoId){a.sentToUmano=true
}};
if(navigator.userAgent.match(/Windows Phone/i)){var msViewportStyle=document.createElement("style");
msViewportStyle.appendChild(document.createTextNode("@-ms-viewport{width:auto!important}"));
document.getElementsByTagName("head")[0].appendChild(msViewportStyle)
}function showElement(a,b){b=b||"inherit";
a[0].style.display=b
}function hideElement(a){a[0].style.display="none"
}!function(a){a(function(){a.support.transition=function(){var b=function(){var d=document.createElement("bootstrap"),c={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"},f;
for(f in c){if(d.style[f]!==undefined){return c[f]
}}}();
return b&&{end:b}
}()
})
}(window.jQuery),!function(c){var a='[data-dismiss="alert"]',d=function(e){c(e).on("click",a,this.close)
};
d.prototype.close=function(f){function g(){e.trigger("closed").remove()
}var j=c(this),h=j.attr("data-target"),e;
h||(h=j.attr("href"),h=h&&h.replace(/.*(?=#[^\s]*$)/,"")),e=c(h),f&&f.preventDefault(),e.length||(e=j.hasClass("alert")?j:j.parent()),e.trigger(f=c.Event("close"));
if(f.isDefaultPrevented()){return
}e.removeClass("in"),c.support.transition&&e.hasClass("fade")?e.on(c.support.transition.end,g):g()
};
var b=c.fn.alert;
c.fn.alert=function(e){return this.each(function(){var g=c(this),f=g.data("alert");
f||g.data("alert",f=new d(this)),typeof e=="string"&&f[e].call(g)
})
},c.fn.alert.Constructor=d,c.fn.alert.noConflict=function(){return c.fn.alert=b,this
},c(document).on("click.alert.data-api",a,d.prototype.close)
}(window.jQuery),!function(b){var a=function(d,e){this.$element=b(d),this.options=b.extend({},b.fn.button.defaults,e)
};
a.prototype.setState=function(h){var f="disabled",j=this.$element,g=j.data(),d=j.is("input")?"val":"html";
h+="Text",g.resetText||j.data("resetText",j[d]()),j[d](g[h]||this.options[h]),setTimeout(function(){h=="loadingText"?j.addClass(f).attr(f,f):j.removeClass(f).removeAttr(f)
},0)
},a.prototype.toggle=function(){var d=this.$element.closest('[data-toggle="buttons-radio"]');
d&&d.find(".active").removeClass("active"),this.$element.toggleClass("active")
};
var c=b.fn.button;
b.fn.button=function(d){return this.each(function(){var g=b(this),e=g.data("button"),f=typeof d=="object"&&d;
e||g.data("button",e=new a(this,f)),d=="toggle"?e.toggle():d&&e.setState(d)
})
},b.fn.button.defaults={loadingText:"loading..."},b.fn.button.Constructor=a,b.fn.button.noConflict=function(){return b.fn.button=c,this
},b(document).on("click.button.data-api","[data-toggle^=button]",function(d){var e=b(d.target);
e.hasClass("btn")||(e=e.closest(".btn")),e.button("toggle")
})
}(window.jQuery),!function(b){var a=function(d,e){this.$element=b(d),this.$indicators=this.$element.find(".carousel-indicators"),this.options=e,this.options.pause=="hover"&&this.$element.on("mouseenter",b.proxy(this.pause,this)).on("mouseleave",b.proxy(this.cycle,this))
};
a.prototype={cycle:function(d){return d||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(b.proxy(this.next,this),this.options.interval)),this
},getActiveIndex:function(){return this.$active=this.$element.find(".item.active"),this.$items=this.$active.parent().children(),this.$items.index(this.$active)
},to:function(d){var f=this.getActiveIndex(),e=this;
if(d>this.$items.length-1||d<0){return
}return this.sliding?this.$element.one("slid",function(){e.to(d)
}):f==d?this.pause().cycle():this.slide(d>f?"next":"prev",b(this.$items[d]))
},pause:function(d){return d||(this.paused=!0),this.$element.find(".next, .prev").length&&b.support.transition.end&&(this.$element.trigger(b.support.transition.end),this.cycle(!0)),clearInterval(this.interval),this.interval=null,this
},next:function(){if(this.sliding){return
}return this.slide("next")
},prev:function(){if(this.sliding){return
}return this.slide("prev")
},slide:function(m,g){var d=this.$element.find(".item.active"),h=g||d[m](),p=this.interval,e=m=="next"?"left":"right",l=m=="next"?"first":"last",k=this,j;
this.sliding=!0,p&&this.pause(),h=h.length?h:this.$element.find(".item")[l](),j=b.Event("slide",{relatedTarget:h[0],direction:e});
if(h.hasClass("active")){return
}this.$indicators.length&&(this.$indicators.find(".active").removeClass("active"),this.$element.one("slid",function(){var f=b(k.$indicators.children()[k.getActiveIndex()]);
f&&f.addClass("active")
}));
if(b.support.transition&&this.$element.hasClass("slide")){this.$element.trigger(j);
if(j.isDefaultPrevented()){return
}h.addClass(m),h[0].offsetWidth,d.addClass(e),h.addClass(e),this.$element.one(b.support.transition.end,function(){h.removeClass([m,e].join(" ")).addClass("active"),d.removeClass(["active",e].join(" ")),k.sliding=!1,setTimeout(function(){k.$element.trigger("slid")
},0)
})
}else{this.$element.trigger(j);
if(j.isDefaultPrevented()){return
}d.removeClass("active"),h.addClass("active"),this.sliding=!1,this.$element.trigger("slid")
}return p&&this.cycle(),this
}};
var c=b.fn.carousel;
b.fn.carousel=function(d){return this.each(function(){var g=b(this),e=g.data("carousel"),f=b.extend({},b.fn.carousel.defaults,typeof d=="object"&&d),h=typeof d=="string"?d:f.slide;
e||g.data("carousel",e=new a(this,f)),typeof d=="number"?e.to(d):h?e[h]():f.interval&&e.pause().cycle()
})
},b.fn.carousel.defaults={interval:5000,pause:"hover"},b.fn.carousel.Constructor=a,b.fn.carousel.noConflict=function(){return b.fn.carousel=c,this
},b(document).on("click.carousel.data-api","[data-slide], [data-slide-to]",function(e){var j=b(this),g,d=b(j.attr("data-target")||(g=j.attr("href"))&&g.replace(/.*(?=#[^\s]+$)/,"")),f=b.extend({},d.data(),j.data()),h;
d.carousel(f),(h=j.attr("data-slide-to"))&&d.data("carousel").pause().to(h).cycle(),e.preventDefault()
})
}(window.jQuery),!function(b){var a=function(d,e){this.$element=b(d),this.options=b.extend({},b.fn.collapse.defaults,e),this.options.parent&&(this.$parent=b(this.options.parent)),this.options.toggle&&this.toggle()
};
a.prototype={constructor:a,dimension:function(){var d=this.$element.hasClass("width");
return d?"width":"height"
},show:function(){var e,g,f,d;
if(this.transitioning||this.$element.hasClass("in")){return
}e=this.dimension(),g=b.camelCase(["scroll",e].join("-")),f=this.$parent&&this.$parent.find("> .accordion-group > .in");
if(f&&f.length){d=f.data("collapse");
if(d&&d.transitioning){return
}f.collapse("hide"),d||f.data("collapse",null)
}this.$element[e](0),this.transition("addClass",b.Event("show"),"shown"),b.support.transition&&this.$element[e](this.$element[0][g])
},hide:function(){var d;
if(this.transitioning||!this.$element.hasClass("in")){return
}d=this.dimension(),this.reset(this.$element[d]()),this.transition("removeClass",b.Event("hide"),"hidden"),this.$element[d](0)
},reset:function(f){var d=this.dimension();
return this.$element.removeClass("collapse")[d](f||"auto")[0].offsetWidth,this.$element[f!==null?"addClass":"removeClass"]("collapse"),this
},transition:function(e,h,g){var d=this,f=function(){h.type=="show"&&d.reset(),d.transitioning=0,d.$element.trigger(g)
};
this.$element.trigger(h);
if(h.isDefaultPrevented()){return
}this.transitioning=1,this.$element[e]("in"),b.support.transition&&this.$element.hasClass("collapse")?this.$element.one(b.support.transition.end,f):f()
},toggle:function(){this[this.$element.hasClass("in")?"hide":"show"]()
}};
var c=b.fn.collapse;
b.fn.collapse=function(d){return this.each(function(){var g=b(this),e=g.data("collapse"),f=b.extend({},b.fn.collapse.defaults,g.data(),typeof d=="object"&&d);
e||g.data("collapse",e=new a(this,f)),typeof d=="string"&&e[d]()
})
},b.fn.collapse.defaults={toggle:!0},b.fn.collapse.Constructor=a,b.fn.collapse.noConflict=function(){return b.fn.collapse=c,this
},b(document).on("click.collapse.data-api","[data-toggle=collapse]",function(e){var h=b(this),g,d=h.attr("data-target")||e.preventDefault()||(g=h.attr("href"))&&g.replace(/.*(?=#[^\s]+$)/,""),f=b(d).data("collapse")?"toggle":h.data();
h[b(d).hasClass("in")?"addClass":"removeClass"]("collapsed"),b(d).collapse(f)
})
}(window.jQuery),!function(f){function d(){f(".dropdown-backdrop").remove(),f(a).each(function(){b(f(this)).removeClass("open")
})
}function b(e){var j=e.attr("data-target"),h;
j||(j=e.attr("href"),j=j&&/#/.test(j)&&j.replace(/.*(?=#[^\s]*$)/,"")),h=j&&f(j);
if(!h||!h.length){h=e.parent()
}return h
}var a="[data-toggle=dropdown]",g=function(e){var h=f(e).on("click.dropdown.data-api",this.toggle);
f("html").on("click.dropdown.data-api",function(){h.parent().removeClass("open")
})
};
g.prototype={constructor:g,toggle:function(e){var k=f(this),h,j;
if(k.is(".disabled, :disabled")){return
}return h=b(k),j=h.hasClass("open"),d(),j||("ontouchstart" in document.documentElement&&f('<div class="dropdown-backdrop"/>').insertBefore(f(this)).on("click",d),h.toggleClass("open")),k.focus(),!1
},keydown:function(p){var k,j,m,h,e,l;
if(!/(38|40|27)/.test(p.keyCode)){return
}k=f(this),p.preventDefault(),p.stopPropagation();
if(k.is(".disabled, :disabled")){return
}h=b(k),e=h.hasClass("open");
if(!e||e&&p.keyCode==27){return p.which==27&&h.find(a).focus(),k.click()
}j=f("[role=menu] li:not(.divider):visible a",h);
if(!j.length){return
}l=j.index(j.filter(":focus")),p.keyCode==38&&l>0&&l--,p.keyCode==40&&l<j.length-1&&l++,~l||(l=0),j.eq(l).focus()
}};
var c=f.fn.dropdown;
f.fn.dropdown=function(e){return this.each(function(){var j=f(this),h=j.data("dropdown");
h||j.data("dropdown",h=new g(this)),typeof e=="string"&&h[e].call(j)
})
},f.fn.dropdown.Constructor=g,f.fn.dropdown.noConflict=function(){return f.fn.dropdown=c,this
},f(document).on("click.dropdown.data-api",d).on("click.dropdown.data-api",".dropdown form",function(h){h.stopPropagation()
}).on("click.dropdown.data-api",a,g.prototype.toggle).on("keydown.dropdown.data-api",a+", [role=menu]",g.prototype.keydown)
}(window.jQuery),!function(b){var a=function(d,e){this.options=e,this.$element=b(d).delegate('[data-dismiss="modal"]',"click.dismiss.modal",b.proxy(this.hide,this)),this.options.remote&&this.$element.find(".modal-body").load(this.options.remote)
};
a.prototype={constructor:a,toggle:function(){return this[this.isShown?"hide":"show"]()
},show:function(){var d=this,e=b.Event("show");
this.$element.trigger(e);
if(this.isShown||e.isDefaultPrevented()){return
}this.isShown=!0,this.escape(),this.backdrop(function(){var f=b.support.transition&&d.$element.hasClass("fade");
d.$element.parent().length||d.$element.appendTo(document.body),d.$element.show(),f&&d.$element[0].offsetWidth,d.$element.addClass("in").attr("aria-hidden",!1),d.enforceFocus(),f?d.$element.one(b.support.transition.end,function(){d.$element.focus().trigger("shown")
}):d.$element.focus().trigger("shown")
})
},hide:function(d){d&&d.preventDefault();
var e=this;
d=b.Event("hide"),this.$element.trigger(d);
if(!this.isShown||d.isDefaultPrevented()){return
}this.isShown=!1,this.escape(),b(document).off("focusin.modal"),this.$element.removeClass("in").attr("aria-hidden",!0),b.support.transition&&this.$element.hasClass("fade")?this.hideWithTransition():this.hideModal()
},enforceFocus:function(){var d=this;
b(document).on("focusin.modal",function(f){d.$element[0]!==f.target&&!d.$element.has(f.target).length&&d.$element.focus()
})
},escape:function(){var d=this;
this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.modal",function(e){e.which==27&&d.hide()
}):this.isShown||this.$element.off("keyup.dismiss.modal")
},hideWithTransition:function(){var d=this,e=setTimeout(function(){d.$element.off(b.support.transition.end),d.hideModal()
},500);
this.$element.one(b.support.transition.end,function(){clearTimeout(e),d.hideModal()
})
},hideModal:function(){var d=this;
this.$element.hide(),this.backdrop(function(){d.removeBackdrop(),d.$element.trigger("hidden")
})
},removeBackdrop:function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null
},backdrop:function(e){var g=this,f=this.$element.hasClass("fade")?"fade":"";
if(this.isShown&&this.options.backdrop){var d=b.support.transition&&f;
this.$backdrop=b('<div class="modal-backdrop '+f+'" />').appendTo(document.body),this.$backdrop.click(this.options.backdrop=="static"?b.proxy(this.$element[0].focus,this.$element[0]):b.proxy(this.hide,this)),d&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in");
if(!e){return
}d?this.$backdrop.one(b.support.transition.end,e):e()
}else{!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),b.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(b.support.transition.end,e):e()):e&&e()
}}};
var c=b.fn.modal;
b.fn.modal=function(d){return this.each(function(){var g=b(this),e=g.data("modal"),f=b.extend({},b.fn.modal.defaults,g.data(),typeof d=="object"&&d);
e||g.data("modal",e=new a(this,f)),typeof d=="string"?e[d]():f.show&&e.show()
})
},b.fn.modal.defaults={backdrop:!0,keyboard:!0,show:!0},b.fn.modal.Constructor=a,b.fn.modal.noConflict=function(){return b.fn.modal=c,this
},b(document).on("click.modal.data-api",'[data-toggle="modal"]',function(e){var h=b(this),g=h.attr("href"),d=b(h.attr("data-target")||g&&g.replace(/.*(?=#[^\s]+$)/,"")),f=d.data("modal")?"toggle":b.extend({remote:!/#/.test(g)&&g},d.data(),h.data());
e.preventDefault(),d.modal(f).one("hide",function(){h.focus()
})
})
}(window.jQuery),!function(b){var a=function(f,d){this.init("tooltip",f,d)
};
a.prototype={constructor:a,init:function(g,l,j){var f,h,k,e,d;
this.type=g,this.$element=b(l),this.options=this.getOptions(j),this.enabled=!0,k=this.options.trigger.split(" ");
for(d=k.length;
d--;
){e=k[d],e=="click"?this.$element.on("click."+this.type,this.options.selector,b.proxy(this.toggle,this)):e!="manual"&&(f=e=="hover"?"mouseenter":"focus",h=e=="hover"?"mouseleave":"blur",this.$element.on(f+"."+this.type,this.options.selector,b.proxy(this.enter,this)),this.$element.on(h+"."+this.type,this.options.selector,b.proxy(this.leave,this)))
}this.options.selector?this._options=b.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()
},getOptions:function(d){return d=b.extend({},b.fn[this.type].defaults,this.$element.data(),d),d.delay&&typeof d.delay=="number"&&(d.delay={show:d.delay,hide:d.delay}),d
},enter:function(e){var g=b.fn[this.type].defaults,f={},d;
this._options&&b.each(this._options,function(j,h){g[j]!=h&&(f[j]=h)
},this),d=b(e.currentTarget)[this.type](f).data(this.type);
if(!d.options.delay||!d.options.delay.show){return d.show()
}clearTimeout(this.timeout),d.hoverState="in",this.timeout=setTimeout(function(){d.hoverState=="in"&&d.show()
},d.options.delay.show)
},leave:function(d){var e=b(d.currentTarget)[this.type](this._options).data(this.type);
this.timeout&&clearTimeout(this.timeout);
if(!e.options.delay||!e.options.delay.hide){return e.hide()
}e.hoverState="out",this.timeout=setTimeout(function(){e.hoverState=="out"&&e.hide()
},e.options.delay.hide)
},show:function(){var f,k,h,e,g,j,d=b.Event("show");
if(this.hasContent()&&this.enabled){this.$element.trigger(d);
if(d.isDefaultPrevented()){return
}f=this.tip(),this.setContent(),this.options.animation&&f.addClass("fade"),g=typeof this.options.placement=="function"?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,f.detach().css({top:0,left:0,display:"block"}),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element),k=this.getPosition(),h=f[0].offsetWidth,e=f[0].offsetHeight;
switch(g){case"bottom":j={top:k.top+k.height,left:k.left+k.width/2-h/2};
break;
case"top":j={top:k.top-e,left:k.left+k.width/2-h/2};
break;
case"left":j={top:k.top+k.height/2-e/2,left:k.left-h};
break;
case"right":j={top:k.top+k.height/2-e/2,left:k.left+k.width}
}this.applyPlacement(j,g),this.$element.trigger("shown")
}},applyPlacement:function(j,m){var g=this.tip(),d=g[0].offsetWidth,h=g[0].offsetHeight,p,f,l,k;
g.offset(j).addClass(m).addClass("in"),p=g[0].offsetWidth,f=g[0].offsetHeight,m=="top"&&f!=h&&(j.top=j.top+h-f,k=!0),m=="bottom"||m=="top"?(l=0,j.left<0&&(l=j.left*-2,j.left=0,g.offset(j),p=g[0].offsetWidth,f=g[0].offsetHeight),this.replaceArrow(l-d+p,p,"left")):this.replaceArrow(f-h,f,"top"),k&&g.offset(j)
},replaceArrow:function(f,d,g){this.arrow().css(g,f?50*(1-f/d)+"%":"")
},setContent:function(){var f=this.tip(),d=this.getTitle();
f.find(".tooltip-inner")[this.options.html?"html":"text"](d),f.removeClass("fade in top bottom left right")
},hide:function(){function e(){var h=setTimeout(function(){g.off(b.support.transition.end).detach()
},500);
g.one(b.support.transition.end,function(){clearTimeout(h),g.detach()
})
}var d=this,g=this.tip(),f=b.Event("hide");
this.$element.trigger(f);
if(f.isDefaultPrevented()){return
}return g.removeClass("in"),b.support.transition&&this.$tip.hasClass("fade")?e():g.detach(),this.$element.trigger("hidden"),this
},fixTitle:function(){var d=this.$element;
(d.attr("title")||typeof d.attr("data-original-title")!="string")&&d.attr("data-original-title",d.attr("title")||"").attr("title","")
},hasContent:function(){return this.getTitle()
},getPosition:function(){var d=this.$element[0];
return b.extend({},typeof d.getBoundingClientRect=="function"?d.getBoundingClientRect():{width:d.offsetWidth,height:d.offsetHeight},this.$element.offset())
},getTitle:function(){var f,d=this.$element,g=this.options;
return f=d.attr("data-original-title")||(typeof g.title=="function"?g.title.call(d[0]):g.title),f
},tip:function(){return this.$tip=this.$tip||b(this.options.template)
},arrow:function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")
},validate:function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)
},enable:function(){this.enabled=!0
},disable:function(){this.enabled=!1
},toggleEnabled:function(){this.enabled=!this.enabled
},toggle:function(d){var e=d?b(d.currentTarget)[this.type](this._options).data(this.type):this;
e.tip().hasClass("in")?e.hide():e.show()
},destroy:function(){this.hide().$element.off("."+this.type).removeData(this.type)
}};
var c=b.fn.tooltip;
b.fn.tooltip=function(d){return this.each(function(){var g=b(this),e=g.data("tooltip"),f=typeof d=="object"&&d;
e||g.data("tooltip",e=new a(this,f)),typeof d=="string"&&e[d]()
})
},b.fn.tooltip.Constructor=a,b.fn.tooltip.defaults={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1},b.fn.tooltip.noConflict=function(){return b.fn.tooltip=c,this
}
}(window.jQuery),!function(b){var a=function(f,d){this.init("popover",f,d)
};
a.prototype=b.extend({},b.fn.tooltip.Constructor.prototype,{constructor:a,setContent:function(){var f=this.tip(),d=this.getTitle(),g=this.getContent();
f.find(".popover-title")[this.options.html?"html":"text"](d),f.find(".popover-content")[this.options.html?"html":"text"](g),f.removeClass("fade top bottom left right in")
},hasContent:function(){return this.getTitle()||this.getContent()
},getContent:function(){var f,d=this.$element,g=this.options;
return f=(typeof g.content=="function"?g.content.call(d[0]):g.content)||d.attr("data-content"),f
},tip:function(){return this.$tip||(this.$tip=b(this.options.template)),this.$tip
},destroy:function(){this.hide().$element.off("."+this.type).removeData(this.type)
}});
var c=b.fn.popover;
b.fn.popover=function(d){return this.each(function(){var g=b(this),e=g.data("popover"),f=typeof d=="object"&&d;
e||g.data("popover",e=new a(this,f)),typeof d=="string"&&e[d]()
})
},b.fn.popover.Constructor=a,b.fn.popover.defaults=b.extend({},b.fn.tooltip.defaults,{placement:"right",trigger:"click",content:"",template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),b.fn.popover.noConflict=function(){return b.fn.popover=c,this
}
}(window.jQuery),!function(b){function a(e,h){var g=b.proxy(this.process,this),d=b(e).is("body")?b(window):b(e),f;
this.options=b.extend({},b.fn.scrollspy.defaults,h),this.$scrollElement=d.on("scroll.scroll-spy.data-api",g),this.selector=(this.options.target||(f=b(e).attr("href"))&&f.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a",this.$body=b("body"),this.refresh(),this.process()
}a.prototype={constructor:a,refresh:function(){var d=this,e;
this.offsets=b([]),this.targets=b([]),e=this.$body.find(this.selector).map(function(){var h=b(this),g=h.data("target")||h.attr("href"),f=/^#\w/.test(g)&&b(g);
return f&&f.length&&[[f.position().top+(!b.isWindow(d.$scrollElement.get(0))&&d.$scrollElement.scrollTop()),g]]||null
}).sort(function(g,f){return g[0]-f[0]
}).each(function(){d.offsets.push(this[0]),d.targets.push(this[1])
})
},process:function(){var j=this.$scrollElement.scrollTop()+this.options.offset,f=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight,l=f-this.$scrollElement.height(),h=this.offsets,d=this.targets,g=this.activeTarget,k;
if(j>=l){return g!=(k=d.last()[0])&&this.activate(k)
}for(k=h.length;
k--;
){g!=d[k]&&j>=h[k]&&(!h[k+1]||j<=h[k+1])&&this.activate(d[k])
}},activate:function(d){var f,e;
this.activeTarget=d,b(this.selector).parent(".active").removeClass("active"),e=this.selector+'[data-target="'+d+'"],'+this.selector+'[href="'+d+'"]',f=b(e).parent("li").addClass("active"),f.parent(".dropdown-menu").length&&(f=f.closest("li.dropdown").addClass("active")),f.trigger("activate")
}};
var c=b.fn.scrollspy;
b.fn.scrollspy=function(d){return this.each(function(){var g=b(this),e=g.data("scrollspy"),f=typeof d=="object"&&d;
e||g.data("scrollspy",e=new a(this,f)),typeof d=="string"&&e[d]()
})
},b.fn.scrollspy.Constructor=a,b.fn.scrollspy.defaults={offset:10},b.fn.scrollspy.noConflict=function(){return b.fn.scrollspy=c,this
},b(window).on("load",function(){b('[data-spy="scroll"]').each(function(){var d=b(this);
d.scrollspy(d.data())
})
})
}(window.jQuery),!function(b){var a=function(d){this.element=b(d)
};
a.prototype={constructor:a,show:function(){var e=this.element,j=e.closest("ul:not(.dropdown-menu)"),g=e.attr("data-target"),d,f,h;
g||(g=e.attr("href"),g=g&&g.replace(/.*(?=#[^\s]*$)/,""));
if(e.parent("li").hasClass("active")){return
}d=j.find(".active:last a")[0],h=b.Event("show",{relatedTarget:d}),e.trigger(h);
if(h.isDefaultPrevented()){return
}f=b(g),this.activate(e.parent("li"),j),this.activate(f,f.parent(),function(){e.trigger({type:"shown",relatedTarget:d})
})
},activate:function(e,j,g){function h(){d.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),e.addClass("active"),f?(e[0].offsetWidth,e.addClass("in")):e.removeClass("fade"),e.parent(".dropdown-menu")&&e.closest("li.dropdown").addClass("active"),g&&g()
}var d=j.find("> .active"),f=g&&b.support.transition&&d.hasClass("fade");
f?d.one(b.support.transition.end,h):h(),d.removeClass("in")
}};
var c=b.fn.tab;
b.fn.tab=function(d){return this.each(function(){var f=b(this),e=f.data("tab");
e||f.data("tab",e=new a(this)),typeof d=="string"&&e[d]()
})
},b.fn.tab.Constructor=a,b.fn.tab.noConflict=function(){return b.fn.tab=c,this
},b(document).on("click.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(d){d.preventDefault(),b(this).tab("show")
})
}(window.jQuery),!function(b){var a=function(d,e){this.$element=b(d),this.options=b.extend({},b.fn.typeahead.defaults,e),this.matcher=this.options.matcher||this.matcher,this.sorter=this.options.sorter||this.sorter,this.highlighter=this.options.highlighter||this.highlighter,this.updater=this.options.updater||this.updater,this.source=this.options.source,this.$menu=b(this.options.menu),this.shown=!1,this.listen()
};
a.prototype={constructor:a,select:function(){var d=this.$menu.find(".active").attr("data-value");
return this.$element.val(this.updater(d)).change(),this.hide()
},updater:function(d){return d
},show:function(){var d=b.extend({},this.$element.position(),{height:this.$element[0].offsetHeight});
return this.$menu.insertAfter(this.$element).css({top:d.top+d.height,left:d.left}).show(),this.shown=!0,this
},hide:function(){return this.$menu.hide(),this.shown=!1,this
},lookup:function(d){var e;
return this.query=this.$element.val(),!this.query||this.query.length<this.options.minLength?this.shown?this.hide():this:(e=b.isFunction(this.source)?this.source(this.query,b.proxy(this.process,this)):this.source,e?this.process(e):this)
},process:function(d){var e=this;
return d=b.grep(d,function(f){return e.matcher(f)
}),d=this.sorter(d),d.length?this.render(d.slice(0,this.options.items)).show():this.shown?this.hide():this
},matcher:function(d){return ~d.toLowerCase().indexOf(this.query.toLowerCase())
},sorter:function(h){var f=[],j=[],g=[],d;
while(d=h.shift()){d.toLowerCase().indexOf(this.query.toLowerCase())?~d.indexOf(this.query)?j.push(d):g.push(d):f.push(d)
}return f.concat(j,g)
},highlighter:function(f){var d=this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&");
return f.replace(new RegExp("("+d+")","ig"),function(h,g){return"<strong>"+g+"</strong>"
})
},render:function(d){var e=this;
return d=b(d).map(function(f,g){return f=b(e.options.item).attr("data-value",g),f.find("a").html(e.highlighter(g)),f[0]
}),d.first().addClass("active"),this.$menu.html(d),this
},next:function(d){var f=this.$menu.find(".active").removeClass("active"),e=f.next();
e.length||(e=b(this.$menu.find("li")[0])),e.addClass("active")
},prev:function(f){var d=this.$menu.find(".active").removeClass("active"),g=d.prev();
g.length||(g=this.$menu.find("li").last()),g.addClass("active")
},listen:function(){this.$element.on("focus",b.proxy(this.focus,this)).on("blur",b.proxy(this.blur,this)).on("keypress",b.proxy(this.keypress,this)).on("keyup",b.proxy(this.keyup,this)),this.eventSupported("keydown")&&this.$element.on("keydown",b.proxy(this.keydown,this)),this.$menu.on("click",b.proxy(this.click,this)).on("mouseenter","li",b.proxy(this.mouseenter,this)).on("mouseleave","li",b.proxy(this.mouseleave,this))
},eventSupported:function(f){var d=f in this.$element;
return d||(this.$element.setAttribute(f,"return;"),d=typeof this.$element[f]=="function"),d
},move:function(d){if(!this.shown){return
}switch(d.keyCode){case 9:case 13:case 27:d.preventDefault();
break;
case 38:d.preventDefault(),this.prev();
break;
case 40:d.preventDefault(),this.next()
}d.stopPropagation()
},keydown:function(d){this.suppressKeyPressRepeat=~b.inArray(d.keyCode,[40,38,9,13,27]),this.move(d)
},keypress:function(d){if(this.suppressKeyPressRepeat){return
}this.move(d)
},keyup:function(d){switch(d.keyCode){case 40:case 38:case 16:case 17:case 18:break;
case 9:case 13:if(!this.shown){return
}this.select();
break;
case 27:if(!this.shown){return
}this.hide();
break;
default:this.lookup()
}d.stopPropagation(),d.preventDefault()
},focus:function(d){this.focused=!0
},blur:function(d){this.focused=!1,!this.mousedover&&this.shown&&this.hide()
},click:function(d){d.stopPropagation(),d.preventDefault(),this.select(),this.$element.focus()
},mouseenter:function(d){this.mousedover=!0,this.$menu.find(".active").removeClass("active"),b(d.currentTarget).addClass("active")
},mouseleave:function(d){this.mousedover=!1,!this.focused&&this.shown&&this.hide()
}};
var c=b.fn.typeahead;
b.fn.typeahead=function(d){return this.each(function(){var g=b(this),e=g.data("typeahead"),f=typeof d=="object"&&d;
e||g.data("typeahead",e=new a(this,f)),typeof d=="string"&&e[d]()
})
},b.fn.typeahead.defaults={source:[],items:8,menu:'<ul class="typeahead dropdown-menu"></ul>',item:'<li><a href="#"></a></li>',minLength:1},b.fn.typeahead.Constructor=a,b.fn.typeahead.noConflict=function(){return b.fn.typeahead=c,this
},b(document).on("focus.typeahead.data-api",'[data-provide="typeahead"]',function(d){var e=b(this);
if(e.data("typeahead")){return
}e.typeahead(e.data())
})
}(window.jQuery),!function(b){var a=function(d,e){this.options=b.extend({},b.fn.affix.defaults,e),this.$window=b(window).on("scroll.affix.data-api",b.proxy(this.checkPosition,this)).on("click.affix.data-api",b.proxy(function(){setTimeout(b.proxy(this.checkPosition,this),1)
},this)),this.$element=b(d),this.checkPosition()
};
a.prototype.checkPosition=function(){if(!this.$element.is(":visible")){return
}var g=b(document).height(),l=this.$window.scrollTop(),j=this.$element.offset(),f=this.options.offset,h=f.bottom,k=f.top,e="affix affix-top affix-bottom",d;
typeof f!="object"&&(h=k=f),typeof k=="function"&&(k=f.top()),typeof h=="function"&&(h=f.bottom()),d=this.unpin!=null&&l+this.unpin<=j.top?!1:h!=null&&j.top+this.$element.height()>=g-h?"bottom":k!=null&&l<=k?"top":!1;
if(this.affixed===d){return
}this.affixed=d,this.unpin=d=="bottom"?j.top-l:null,this.$element.removeClass(e).addClass("affix"+(d?"-"+d:""))
};
var c=b.fn.affix;
b.fn.affix=function(d){return this.each(function(){var g=b(this),e=g.data("affix"),f=typeof d=="object"&&d;
e||g.data("affix",e=new a(this,f)),typeof d=="string"&&e[d]()
})
},b.fn.affix.Constructor=a,b.fn.affix.defaults={offset:0},b.fn.affix.noConflict=function(){return b.fn.affix=c,this
},b(window).on("load",function(){b('[data-spy="affix"]').each(function(){var d=b(this),e=d.data();
e.offset=e.offset||{},e.offsetBottom&&(e.offset.bottom=e.offsetBottom),e.offsetTop&&(e.offset.top=e.offsetTop),d.affix(e)
})
})
}(window.jQuery);
window.matchMedia||(window.matchMedia=function(h){var a=h.document,m=a.documentElement,e=[],k=0,g="",b={},j=/\s*(only|not)?\s*(screen|print|[a-z\-]+)\s*(and)?\s*/i,d=/^\s*\(\s*(-[a-z]+-)?(min-|max-)?([a-z\-]+)\s*(:?\s*([0-9]+(\.[0-9]+)?|portrait|landscape)(px|em|dppx|dpcm|rem|%|in|cm|mm|ex|pt|pc|\/([0-9]+(\.[0-9]+)?))?)?\s*\)\s*$/,c=0,f=function(z){var C=(z.indexOf(",")!==-1&&z.split(","))||[z],K=C.length-1,x=K,G=null,v=null,I="",E=0,r=false,s="",p="",A=null,J=0,w=0,q=null,H="",u="",D="",F="",y="",B=false;
if(z===""){return true
}do{G=C[x-K];
r=false;
v=G.match(j);
if(v){I=v[0];
E=v.index
}if(!v||((G.substring(0,E).indexOf("(")===-1)&&(E||(!v[3]&&I!==v.input)))){B=false;
continue
}p=G;
r=v[1]==="not";
if(!E){s=v[2];
p=G.substring(I.length)
}B=s===g||s==="all"||s==="";
A=(p.indexOf(" and ")!==-1&&p.split(" and "))||[p];
J=A.length-1;
w=J;
if(B&&J>=0&&p!==""){do{q=A[J].match(d);
if(!q||!b[q[3]]){B=false;
break
}H=q[2];
u=q[5];
F=u;
D=q[7];
y=b[q[3]];
if(D){if(D==="px"){F=Number(u)
}else{if(D==="em"||D==="rem"){F=16*u
}else{if(q[8]){F=(u/q[8]).toFixed(2)
}else{if(D==="dppx"){F=u*96
}else{if(D==="dpcm"){F=u*0.3937
}else{F=Number(u)
}}}}}}if(H==="min-"&&F){B=y>=F
}else{if(H==="max-"&&F){B=y<=F
}else{if(F){B=y===F
}else{B=!!y
}}}if(!B){break
}}while(J--)
}if(B){break
}}while(K--);
return r?!B:B
},o=function(){var q=h.innerWidth||m.clientWidth,s=h.innerHeight||m.clientHeight,r=h.screen.width,u=h.screen.height,v=h.screen.colorDepth,p=h.devicePixelRatio;
b.width=q;
b.height=s;
b["aspect-ratio"]=(q/s).toFixed(2);
b["device-width"]=r;
b["device-height"]=u;
b["device-aspect-ratio"]=(r/u).toFixed(2);
b.color=v;
b["color-index"]=Math.pow(2,v);
b.orientation=(s>=q?"portrait":"landscape");
b.resolution=(p&&p*96)||h.screen.deviceXDPI||96;
b["device-pixel-ratio"]=p||1
},n=function(){clearTimeout(c);
c=setTimeout(function(){var u=null,v=k-1,s=v,q=false;
if(v>=0){o();
do{u=e[s-v];
if(u){q=f(u.mql.media);
if((q&&!u.mql.matches)||(!q&&u.mql.matches)){u.mql.matches=q;
if(u.listeners){for(var r=0,p=u.listeners.length;
r<p;
r++){if(u.listeners[r]){u.listeners[r].call(h,u.mql)
}}}}}}while(v--)
}},10)
},l=function(){var y=a.getElementsByTagName("head")[0],q=a.createElement("style"),r=null,u=["screen","print","speech","projection","handheld","tv","braille","embossed","tty"],w=0,p=u.length,s="#mediamatchjs { position: relative; z-index: 0; }",x="",v=h.addEventListener||(x="on")&&h.attachEvent;
q.type="text/css";
q.id="mediamatchjs";
y.appendChild(q);
r=(h.getComputedStyle&&h.getComputedStyle(q))||q.currentStyle;
for(;
w<p;
w++){s+="@media "+u[w]+" { #mediamatchjs { position: relative; z-index: "+w+" } }"
}if(q.styleSheet){q.styleSheet.cssText=s
}else{q.textContent=s
}g=u[(r.zIndex*1)||0];
y.removeChild(q);
o();
v(x+"resize",n);
v(x+"orientationchange",n)
};
l();
return function(s){var u=k,p={matches:false,media:s,addListener:function q(v){e[u].listeners||(e[u].listeners=[]);
v&&e[u].listeners.push(v)
},removeListener:function r(y){var x=e[u],w=0,v=0;
if(!x){return
}v=x.listeners.length;
for(;
w<v;
w++){if(x.listeners[w]===y){x.listeners.splice(w,1)
}}}};
if(s===""){p.matches=true;
return p
}p.matches=f(s);
k=e.push({mql:p,listeners:null});
return p
}
}(window));
/*!
 * enquire.js v2.1.1 - Awesome Media Queries in JavaScript
 * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/enquire.js
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */
(function(b,c,a){var d=window.matchMedia;
if(typeof module!=="undefined"&&module.exports){module.exports=a(d)
}else{if(typeof define==="function"&&define.amd){define(function(){return(c[b]=a(d))
})
}else{c[b]=a(d)
}}}("enquire",this,function(d){function e(m,k){var j=0,l=m.length,h;
for(j;
j<l;
j++){h=k(m[j],j);
if(h===false){break
}}}function a(h){return Object.prototype.toString.apply(h)==="[object Array]"
}function g(h){return typeof h==="function"
}function b(h){this.options=h;
!h.deferSetup&&this.setup()
}b.prototype={setup:function(){if(this.options.setup){this.options.setup()
}this.initialised=true
},on:function(){!this.initialised&&this.setup();
this.options.match&&this.options.match()
},off:function(){this.options.unmatch&&this.options.unmatch()
},destroy:function(){this.options.destroy?this.options.destroy():this.off()
},equals:function(h){return this.options===h||this.options.match===h
}};
function c(k,j){this.query=k;
this.isUnconditional=j;
this.handlers=[];
this.mql=d(k);
var h=this;
this.listener=function(l){h.mql=l;
h.assess()
};
this.mql.addListener(this.listener)
}c.prototype={addHandler:function(j){var h=new b(j);
this.handlers.push(h);
this.matches()&&h.on()
},removeHandler:function(j){var h=this.handlers;
e(h,function(l,k){if(l.equals(j)){l.destroy();
return !h.splice(k,1)
}})
},matches:function(){return this.mql.matches||this.isUnconditional
},clear:function(){e(this.handlers,function(h){h.destroy()
});
this.mql.removeListener(this.listener);
this.handlers.length=0
},assess:function(){var h=this.matches()?"on":"off";
e(this.handlers,function(j){j[h]()
})
}};
function f(){if(!d){throw new Error("matchMedia not present, legacy browsers require a polyfill")
}this.queries={};
this.browserIsIncapable=!d("only all").matches
}f.prototype={register:function(m,k,l){var j=this.queries,h=l&&this.browserIsIncapable;
if(!j[m]){j[m]=new c(m,h)
}if(g(k)){k={match:k}
}if(!a(k)){k=[k]
}e(k,function(n){j[m].addHandler(n)
});
return this
},unregister:function(k,h){var j=this.queries[k];
if(j){if(h){j.removeHandler(h)
}else{j.clear();
delete this.queries[k]
}}return this
}};
return new f()
}));
/*! Picturefill - Responsive Images that work today. (and mimic the proposed Picture element with divs). Author: Scott Jehl, Filament Group, 2012 | License: MIT/GPLv2 */
(function(b){var a=true;
b.picturefill=function(){var d=b.document.getElementsByTagName("div"),n=(a)?"picturefill_ready":"picturefill_update",o,h,g,k,p,e,q,m,c,f;
for(h=0,p=d.length;
h<p;
h=h+1){if(d[h].getAttribute("data-picture")!==null){c=d[h].getElementsByTagName("div");
m=[];
for(g=0,k=c.length;
g<k;
g=g+1){e=c[g].getAttribute("data-media");
if(!e||(b.matchMedia&&b.matchMedia(e).matches)){m.push(c[g])
}}q=d[h].getElementsByTagName("img")[0];
if(m.length){if(!q){q=b.document.createElement("img");
q.alt=d[h].getAttribute("data-alt");
d[h].appendChild(q)
}var l=m.pop();
q.className=l.getAttribute("data-class");
q.src=l.getAttribute("data-src")
}else{if(q){d[h].removeChild(q)
}}}}if(document.createEvent){f=document.createEvent("HTMLEvents");
f.initEvent(n,true,true)
}else{f=document.createEventObject();
f.eventType=n
}f.eventName=n;
f.memo=o||{};
if(document.createEvent){document.dispatchEvent(f)
}else{document.fireEvent("on"+f.eventType,f)
}a=false
};
if(b.addEventListener){b.addEventListener("resize",b.picturefill,false);
b.addEventListener("DOMContentLoaded",function(){b.picturefill();
b.removeEventListener("load",b.picturefill,false)
},false);
b.addEventListener("load",b.picturefill,false)
}else{if(b.attachEvent){b.attachEvent("onload",b.picturefill)
}}}(this));
!function(g){function f(e,d,l){return e.addEventListener?e.addEventListener(d,l,!1):e.attachEvent?e.attachEvent("on"+d,l):void 0
}function k(l,e){var n,m;
for(n=0,m=l.length;
m>n;
n++){if(l[n]===e){return !0
}}return !1
}function j(e,d){var l;
e.createTextRange?(l=e.createTextRange(),l.move("character",d),l.select()):e.selectionStart&&(e.focus(),e.setSelectionRange(d,d))
}function h(e,d){try{return e.type=d,!0
}catch(l){return !1
}}g.Placeholders={Utils:{addEventListener:f,inArray:k,moveCaret:j,changeType:h}}
}(this),function(aK){function aJ(){}function aI(d){var c;
return d.value===d.getAttribute(ad)&&"true"===d.getAttribute(ac)?(d.setAttribute(ac,"false"),d.value="",d.className=d.className.replace(ae,""),c=d.getAttribute(ab),c&&(d.type=c),!0):!1
}function aH(e){var d,f=e.getAttribute(ad);
return""===e.value&&f?(e.setAttribute(ac,"true"),e.value=f,e.className+=" "+af,d=e.getAttribute(ab),d?e.type="text":"password"===e.type&&S.changeType(e,"text")&&e.setAttribute(ab,"password"),!0):!1
}function aG(j,h){var o,n,m,l,k;
if(j&&j.getAttribute(ad)){h(j)
}else{for(o=j?j.getElementsByTagName("input"):aw,n=j?j.getElementsByTagName("textarea"):av,k=0,l=o.length+n.length;
l>k;
k++){m=k<o.length?o[k]:n[k-o.length],h(m)
}}}function aF(b){aG(b,aI)
}function aE(b){aG(b,aH)
}function aD(b){return function(){au&&b.value===b.getAttribute(ad)&&"true"===b.getAttribute(ac)?S.moveCaret(b,0):aI(b)
}
}function aC(b){return function(){aH(b)
}
}function aB(b){return function(a){return ar=b.value,"true"===b.getAttribute(ac)&&ar===b.getAttribute(ad)&&S.inArray(ah,a.keyCode)?(a.preventDefault&&a.preventDefault(),!1):void 0
}
}function aA(b){return function(){var a;
"true"===b.getAttribute(ac)&&b.value!==ar&&(b.className=b.className.replace(ae,""),b.value=b.value.replace(b.getAttribute(ad),""),b.setAttribute(ac,!1),a=b.getAttribute(ab),a&&(b.type=a)),""===b.value&&(b.blur(),S.moveCaret(b,0))
}
}function az(b){return function(){b===document.activeElement&&b.value===b.getAttribute(ad)&&"true"===b.getAttribute(ac)&&S.moveCaret(b,0)
}
}function ay(b){return function(){aF(b)
}
}function ax(b){b.form&&(am=b.form,am.getAttribute(aa)||(S.addEventListener(am,"submit",ay(am)),am.setAttribute(aa,"true"))),S.addEventListener(b,"focus",aD(b)),S.addEventListener(b,"blur",aC(b)),au&&(S.addEventListener(b,"keydown",aB(b)),S.addEventListener(b,"keyup",aA(b)),S.addEventListener(b,"click",az(b))),b.setAttribute(Z,"true"),b.setAttribute(ad,ao),aH(b)
}var aw,av,au,at,ar,aq,ap,ao,an,am,al,ak,aj,ai=["text","search","url","tel","email","password","number","textarea"],ah=[27,33,34,35,36,37,38,39,40,8,46],ag="#ccc",af="placeholdersjs",ae=new RegExp("(?:^|\\s)"+af+"(?!\\S)"),ad="data-placeholder-value",ac="data-placeholder-active",ab="data-placeholder-type",aa="data-placeholder-submit",Z="data-placeholder-bound",Y="data-placeholder-focus",X="data-placeholder-live",W=document.createElement("input"),V=document.getElementsByTagName("head")[0],U=document.documentElement,T=aK.Placeholders,S=T.Utils;
if(T.nativeSupport=void 0!==W.placeholder,!T.nativeSupport){for(aw=document.getElementsByTagName("input"),av=document.getElementsByTagName("textarea"),au="false"===U.getAttribute(Y),at="false"!==U.getAttribute(X),aq=document.createElement("style"),aq.type="text/css",ap=document.createTextNode("."+af+" { color:"+ag+"; }"),aq.styleSheet?aq.styleSheet.cssText=ap.nodeValue:aq.appendChild(ap),V.insertBefore(aq,V.firstChild),aj=0,ak=aw.length+av.length;
ak>aj;
aj++){al=aj<aw.length?aw[aj]:av[aj-aw.length],ao=al.attributes.placeholder,ao&&(ao=ao.nodeValue,ao&&S.inArray(ai,al.type)&&ax(al))
}an=setInterval(function(){for(aj=0,ak=aw.length+av.length;
ak>aj;
aj++){al=aj<aw.length?aw[aj]:av[aj-aw.length],ao=al.attributes.placeholder,ao&&(ao=ao.nodeValue,ao&&S.inArray(ai,al.type)&&(al.getAttribute(Z)||ax(al),(ao!==al.getAttribute(ad)||"password"===al.type&&!al.getAttribute(ab))&&("password"===al.type&&!al.getAttribute(ab)&&S.changeType(al,"text")&&al.setAttribute(ab,"password"),al.value===al.getAttribute(ad)&&(al.value=ao),al.setAttribute(ad,ao))))
}at||clearInterval(an)
},100)
}T.disable=T.nativeSupport?aJ:aF,T.enable=T.nativeSupport?aJ:aE
}(this);
(function(b){b.fn.each2===void 0&&b.fn.extend({each2:function(a){for(var h=b([0]),g=-1,f=this.length;
f>++g&&(h.context=h[0]=this[g])&&a.call(h[0],g,h)!==!1;
){}return this
}})
})(jQuery),function(an,am){function ad(f,e){for(var h=0,g=e.length;
g>h;
h+=1){if(ac(f,e[h])){return h
}}return -1
}function ac(b,d){return b===d?!0:b===am||d===am?!1:null===b||null===d?!1:b.constructor===String?b+""==d+"":d.constructor===String?d+""==b+"":!1
}function ab(a,k){var j,h,g;
if(null===a||1>a.length){return[]
}for(j=a.split(k),h=0,g=j.length;
g>h;
h+=1){j[h]=an.trim(j[h])
}return j
}function aa(b){return b.outerWidth(!1)-b.width()
}function Z(b){var a="keyup-change-value";
b.bind("keydown",function(){an.data(b,a)===am&&an.data(b,a,b.val())
}),b.bind("keyup",function(){var c=an.data(b,a);
c!==am&&b.val()!==c&&(an.removeData(b,a),b.trigger("keyup-change"))
})
}function Y(a){a.bind("mousemove",function(e){var b=af;
(b===am||b.x!==e.pageX||b.y!==e.pageY)&&an(e.target).trigger("mousemove-filtered",e)
})
}function W(b,h,g){g=g||am;
var f;
return function(){var a=arguments;
window.clearTimeout(f),f=window.setTimeout(function(){h.apply(g,a)
},b)
}
}function U(e){var f,d=!1;
return function(){return d===!1&&(f=e(),d=!0),f
}
}function S(e,d){var f=W(e,function(b){d.trigger("scroll-debounced",b)
});
d.bind("scroll",function(b){ad(b.target,d.get())>=0&&f(b)
})
}function Q(b){b[0]!==document.activeElement&&window.setTimeout(function(){var e,a=b[0],f=b.val().length;
b.focus(),b.is(":visible")&&a===document.activeElement&&(a.setSelectionRange?a.setSelectionRange(f,f):a.createTextRange&&(e=a.createTextRange(),e.collapse(!1),e.select()))
},0)
}function O(b){b.preventDefault(),b.stopPropagation()
}function M(b){b.preventDefault(),b.stopImmediatePropagation()
}function K(a){if(!ag){var d=a[0].currentStyle||window.getComputedStyle(a[0],null);
ag=an(document.createElement("div")).css({position:"absolute",left:"-10000px",top:"-10000px",display:"none",fontSize:d.fontSize,fontFamily:d.fontFamily,fontStyle:d.fontStyle,fontWeight:d.fontWeight,letterSpacing:d.letterSpacing,textTransform:d.textTransform,whiteSpace:"nowrap"}),ag.attr("class","select2-sizer"),an("body").append(ag)
}return ag.text(a.val()),ag.width()
}function J(a,m,l){var k,h,j=[];
k=a.attr("class"),k&&(k=""+k,an(k.split(" ")).each2(function(){0===this.indexOf("select2-")&&j.push(this)
})),k=m.attr("class"),k&&(k=""+k,an(k.split(" ")).each2(function(){0!==this.indexOf("select2-")&&(h=l(this),h&&j.push(this))
})),a.attr("class",j.join(" "))
}function I(b,m,l,k){var j=b.toUpperCase().indexOf(m.toUpperCase()),h=m.length;
return 0>j?(l.push(k(b)),am):(l.push(k(b.substring(0,j))),l.push("<span class='select2-match'>"),l.push(k(b.substring(j,j+h))),l.push("</span>"),l.push(k(b.substring(j+h,b.length))),am)
}function H(a){var o,n=0,m=null,l=a.quietMillis||100,k=a.url,j=this;
return function(b){window.clearTimeout(o),o=window.setTimeout(function(){n+=1;
var q=n,p=a.data,h=k,g=a.transport||an.ajax,e=a.type||"GET",d={};
p=p?p.call(j,b.term,b.page,b.context):null,h="function"==typeof h?h.call(j,b.term,b.page,b.context):h,null!==m&&m.abort(),a.params&&(an.isFunction(a.params)?an.extend(d,a.params.call(j)):an.extend(d,a.params)),an.extend(d,{url:h,dataType:a.dataType,data:p,type:e,cache:!1,success:function(c){if(!(n>q)){var f=a.results(c,b.page);
b.callback(f)
}}}),m=g.call(j,d)
},l)
}
}function X(m){var k,j,l=m,b=function(c){return""+c.text
};
an.isArray(l)&&(j=l,l={results:j}),an.isFunction(l)===!1&&(j=l,l=function(){return j
});
var a=l();
return a.text&&(b=a.text,an.isFunction(b)||(k=l.text,b=function(c){return c[k]
})),function(o){var d,n=o.term,g={results:[]};
return""===n?(o.callback(l()),am):(d=function(c,p){var h,e;
if(c=c[0],c.children){h={};
for(e in c){c.hasOwnProperty(e)&&(h[e]=c[e])
}h.children=[],an(c.children).each2(function(q,f){d(f,h.children)
}),(h.children.length||o.matcher(n,b(h),c))&&p.push(h)
}else{o.matcher(n,b(c),c)&&p.push(c)
}},an(l().results).each2(function(e,c){d(c,g.results)
}),o.callback(g),am)
}
}function V(b){var a=an.isFunction(b);
return function(h){var d=h.term,c={results:[]};
an(a?b():b).each(function(){var e=this.text!==am,f=e?this.text:this;
(""===d||h.matcher(d,f))&&c.results.push(e?this:{id:this,text:this})
}),h.callback(c)
}
}function T(a){if(an.isFunction(a)){return !0
}if(!a){return !1
}throw Error("formatterName must be a function or a falsy value")
}function R(a){return an.isFunction(a)?a():a
}function P(a){var d=0;
return an.each(a,function(e,c){c.children?d+=P(c.children):d++
}),d
}function N(w,v,u,s){var p,o,n,l,b,r=w,q=!1;
if(!s.createSearchChoice||!s.tokenSeparators||1>s.tokenSeparators.length){return am
}for(;
;
){for(o=-1,n=0,l=s.tokenSeparators.length;
l>n&&(b=s.tokenSeparators[n],o=w.indexOf(b),!(o>=0));
n++){}if(0>o){break
}if(p=w.substring(0,o),w=w.substring(o+b.length),p.length>0&&(p=s.createSearchChoice(p,v),p!==am&&null!==p&&s.id(p)!==am&&null!==s.id(p))){for(q=!1,n=0,l=v.length;
l>n;
n++){if(ac(s.id(p),s.id(v[n]))){q=!0;
break
}}q||u(p)
}}return r!==w?w:am
}function L(a,f){var e=function(){};
return e.prototype=new a,e.prototype.constructor=e,e.prototype.parent=a.prototype,e.prototype=an.extend(e.prototype,f),e
}if(window.Select2===am){var al,ak,aj,ai,ah,ag,af,ae;
al={TAB:9,ENTER:13,ESC:27,SPACE:32,LEFT:37,UP:38,RIGHT:39,DOWN:40,SHIFT:16,CTRL:17,ALT:18,PAGE_UP:33,PAGE_DOWN:34,HOME:36,END:35,BACKSPACE:8,DELETE:46,isArrow:function(b){switch(b=b.which?b.which:b){case al.LEFT:case al.RIGHT:case al.UP:case al.DOWN:return !0
}return !1
},isControl:function(d){var c=d.which;
switch(c){case al.SHIFT:case al.CTRL:case al.ALT:return !0
}return d.metaKey?!0:!1
},isFunctionKey:function(b){return b=b.which?b.which:b,b>=112&&123>=b
}},ae=an(document),ah=function(){var b=1;
return function(){return b++
}
}(),ae.bind("mousemove",function(b){af={x:b.pageX,y:b.pageY}
}),ak=L(Object,{bind:function(d){var c=this;
return function(){d.apply(c,arguments)
}
},init:function(h){var g,b,a=".select2-results";
this.opts=h=this.prepareOpts(h),this.id=h.id,h.element.data("select2")!==am&&null!==h.element.data("select2")&&this.destroy(),this.enabled=!0,this.container=this.createContainer(),this.containerId="s2id_"+(h.element.attr("id")||"autogen"+ah()),this.containerSelector="#"+this.containerId.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g,"\\$1"),this.container.attr("id",this.containerId),this.body=U(function(){return h.element.closest("body")
}),J(this.container,this.opts.element,this.opts.adaptContainerCssClass),this.container.css(R(h.containerCss)),this.container.addClass(R(h.containerCssClass)),this.elementTabIndex=this.opts.element.attr("tabIndex"),this.opts.element.data("select2",this).addClass("select2-offscreen").bind("focus.select2",function(){an(this).select2("focus")
}).attr("tabIndex","-1").before(this.container),this.container.data("select2",this),this.dropdown=this.container.find(".select2-drop"),this.dropdown.addClass(R(h.dropdownCssClass)),this.dropdown.data("select2",this),this.results=g=this.container.find(a),this.search=b=this.container.find("input.select2-input"),b.attr("tabIndex",this.elementTabIndex),this.resultsPage=0,this.context=null,this.initContainer(),Y(this.results),this.dropdown.delegate(a,"mousemove-filtered touchstart touchmove touchend",this.bind(this.highlightUnderEvent)),S(80,this.results),this.dropdown.delegate(a,"scroll-debounced",this.bind(this.loadMoreIfNeeded)),an.fn.mousewheel&&g.mousewheel(function(j,d,m,l){var k=g.scrollTop();
l>0&&0>=k-l?(g.scrollTop(0),O(j)):0>l&&g.get(0).scrollHeight-g.scrollTop()+l<=g.height()&&(g.scrollTop(g.get(0).scrollHeight-g.height()),O(j))
}),Z(b),b.bind("keyup-change input paste",this.bind(this.updateResults)),b.bind("focus",function(){b.addClass("select2-focused")
}),b.bind("blur",function(){b.removeClass("select2-focused")
}),this.dropdown.delegate(a,"mouseup",this.bind(function(c){an(c.target).closest(".select2-result-selectable").length>0&&(this.highlightUnderEvent(c),this.selectHighlighted(c))
})),this.dropdown.bind("click mouseup mousedown",function(c){c.stopPropagation()
}),an.isFunction(this.opts.initSelection)&&(this.initSelection(),this.monitorSource()),(h.element.is(":disabled")||h.element.is("[readonly='readonly']"))&&this.disable()
},destroy:function(){var b=this.opts.element.data("select2");
this.propertyObserver&&(delete this.propertyObserver,this.propertyObserver=null),b!==am&&(b.container.remove(),b.dropdown.remove(),b.opts.element.removeClass("select2-offscreen").removeData("select2").unbind(".select2").attr({tabIndex:this.elementTabIndex}).show())
},prepareOpts:function(k){var j,h,b,a;
if(j=k.element,"select"===j.get(0).tagName.toLowerCase()&&(this.select=h=k.element),h&&an.each(["id","multiple","ajax","query","createSearchChoice","initSelection","data","tags"],function(){if(this in k){throw Error("Option '"+this+"' is not allowed for Select2 when attached to a <select> element.")
}}),k=an.extend({},{populateResults:function(q,p,o){var n,m=this.opts.id,c=this;
n=function(B,A,z){var y,x,w,v,u,l,g,f,D,C;
for(B=k.sortResults(B,A,o),y=0,x=B.length;
x>y;
y+=1){w=B[y],u=w.disabled===!0,v=!u&&m(w)!==am,l=w.children&&w.children.length>0,g=an("<li></li>"),g.addClass("select2-results-dept-"+z),g.addClass("select2-result"),g.addClass(v?"select2-result-selectable":"select2-result-unselectable"),u&&g.addClass("select2-disabled"),l&&g.addClass("select2-result-with-children"),g.addClass(c.opts.formatResultCssClass(w)),f=an(document.createElement("div")),f.addClass("select2-result-label"),C=k.formatResult(w,f,o,c.opts.escapeMarkup),C!==am&&f.html(C),g.append(f),l&&(D=an("<ul></ul>"),D.addClass("select2-result-sub"),n(w.children,D,z+1),g.append(D)),g.data("select2-data",w),A.append(g)
}},n(p,q,0)
}},an.fn.select2.defaults,k),"function"!=typeof k.id&&(b=k.id,k.id=function(c){return c[b]
}),an.isArray(k.element.data("select2Tags"))){if("tags" in k){throw"tags specified as both an attribute 'data-select2-tags' and in options of Select2 "+k.element.attr("id")
}k.tags=k.element.data("select2Tags")
}if(h?(k.query=this.bind(function(p){var m,l,d,o={results:[],more:!1},n=p.term;
d=function(e,c){var f;
e.is("option")?p.matcher(n,e.text(),e)&&c.push({id:e.attr("value"),text:e.text(),element:e.get(),css:e.attr("class"),disabled:ac(e.attr("disabled"),"disabled")}):e.is("optgroup")&&(f={text:e.attr("label"),children:[],element:e.get(),css:e.attr("class")},e.children().each2(function(q,g){d(g,f.children)
}),f.children.length>0&&c.push(f))
},m=j.children(),this.getPlaceholder()!==am&&m.length>0&&(l=m[0],""===an(l).text()&&(m=m.not(l))),m.each2(function(e,c){d(c,o.results)
}),p.callback(o)
}),k.id=function(c){return c.id
},k.formatResultCssClass=function(c){return c.css
}):"query" in k||("ajax" in k?(a=k.element.data("ajax-url"),a&&a.length>0&&(k.ajax.url=a),k.query=H.call(k.element,k.ajax)):"data" in k?k.query=X(k.data):"tags" in k&&(k.query=V(k.tags),k.createSearchChoice===am&&(k.createSearchChoice=function(c){return{id:c,text:c}
}),k.initSelection===am&&(k.initSelection=function(l,g){var c=[];
an(ab(l.val(),k.separator)).each(function(){var n=this,m=this,f=k.tags;
an.isFunction(f)&&(f=f()),an(f).each(function(){return ac(this.id,n)?(m=this.text,!1):am
}),c.push({id:n,text:m})
}),g(c)
}))),"function"!=typeof k.query){throw"query function not defined for Select2 "+k.element.attr("id")
}return k
},monitorSource:function(){var c,d=this.opts.element;
d.bind("change.select2",this.bind(function(){this.opts.element.data("select2-change-triggered")!==!0&&this.initSelection()
})),c=this.bind(function(){var f,e;
f="disabled"!==this.opts.element.attr("disabled"),e="readonly"===this.opts.element.attr("readonly"),f=f&&!e,this.enabled!==f&&(f?this.enable():this.disable()),J(this.container,this.opts.element,this.opts.adaptContainerCssClass),this.container.addClass(R(this.opts.containerCssClass)),J(this.dropdown,this.opts.element,this.opts.adaptDropdownCssClass),this.dropdown.addClass(R(this.opts.dropdownCssClass))
}),d.bind("propertychange.select2 DOMAttrModified.select2",c),"undefined"!=typeof WebKitMutationObserver&&(this.propertyObserver&&(delete this.propertyObserver,this.propertyObserver=null),this.propertyObserver=new WebKitMutationObserver(function(b){b.forEach(c)
}),this.propertyObserver.observe(d.get(0),{attributes:!0,subtree:!1}))
},triggerChange:function(a){a=a||{},a=an.extend({},a,{type:"change",val:this.val()}),this.opts.element.data("select2-change-triggered",!0),this.opts.element.trigger(a),this.opts.element.data("select2-change-triggered",!1),this.opts.element.click(),this.opts.blurOnChange&&this.opts.element.blur()
},enable:function(){this.enabled||(this.enabled=!0,this.container.removeClass("select2-container-disabled"),this.opts.element.removeAttr("disabled"))
},disable:function(){this.enabled&&(this.close(),this.enabled=!1,this.container.addClass("select2-container-disabled"),this.opts.element.attr("disabled","disabled"))
},opened:function(){return this.container.hasClass("select2-dropdown-open")
},positionDropdown:function(){var s,r,a,G=this.container.offset(),F=this.container.outerHeight(!1),E=this.container.outerWidth(!1),D=this.dropdown.outerHeight(!1),C=an(window).scrollLeft()+an(window).width(),B=an(window).scrollTop()+an(window).height(),A=G.top+F,z=G.left,y=B>=A+D,x=G.top-D>=this.body().scrollTop(),w=this.dropdown.outerWidth(!1),v=C>=z+w,u=this.dropdown.hasClass("select2-drop-above");
"static"!==this.body().css("position")&&(s=this.body().offset(),A-=s.top,z-=s.left),u?(r=!0,!x&&y&&(r=!1)):(r=!1,!y&&x&&(r=!0)),v||(z=G.left+E-w),r?(A=G.top-D,this.container.addClass("select2-drop-above"),this.dropdown.addClass("select2-drop-above")):(this.container.removeClass("select2-drop-above"),this.dropdown.removeClass("select2-drop-above")),a=an.extend({top:A,left:z,width:E},R(this.opts.dropdownCss)),this.dropdown.css(a)
},shouldOpen:function(){var a;
return this.opened()?!1:(a=an.Event("opening"),this.opts.element.trigger(a),!a.isDefaultPrevented())
},clearDropdownAlignmentPreference:function(){this.container.removeClass("select2-drop-above"),this.dropdown.removeClass("select2-drop-above")
},open:function(){return this.shouldOpen()?(window.setTimeout(this.bind(this.opening),1),!0):!1
},opening:function(){function j(){return{width:Math.max(document.documentElement.scrollWidth,an(window).width()),height:Math.max(document.documentElement.scrollHeight,an(window).height())}
}var l,a=this.containerId,o="scroll."+a,n="resize."+a,m="orientationchange."+a;
this.clearDropdownAlignmentPreference(),this.container.addClass("select2-dropdown-open").addClass("select2-container-active"),this.dropdown[0]!==this.body().children().last()[0]&&this.dropdown.detach().appendTo(this.body()),this.updateResults(!0),l=an("#select2-drop-mask"),0==l.length&&(l=an(document.createElement("div")),l.attr("id","select2-drop-mask").attr("class","select2-drop-mask"),l.hide(),l.appendTo(this.body()),l.bind("mousedown touchstart",function(){var b,e=an("#select2-drop");
e.length>0&&(b=e.data("select2"),b.opts.selectOnBlur&&b.selectHighlighted({noFocus:!0}),b.close())
})),this.dropdown.prev()[0]!==l[0]&&this.dropdown.before(l),an("#select2-drop").removeAttr("id"),this.dropdown.attr("id","select2-drop"),l.css(j()),l.show(),this.dropdown.show(),this.positionDropdown(),this.dropdown.addClass("select2-drop-active"),this.ensureHighlightVisible();
var k=this;
this.container.parents().add(window).each(function(){an(this).bind(n+" "+o+" "+m,function(){an("#select2-drop-mask").css(j()),k.positionDropdown()
})
}),this.focusSearch()
},close:function(){if(this.opened()){var a=this.containerId,h="scroll."+a,g="resize."+a,f="orientationchange."+a;
this.container.parents().add(window).each(function(){an(this).unbind(h).unbind(g).unbind(f)
}),this.clearDropdownAlignmentPreference(),an("#select2-drop-mask").hide(),this.dropdown.removeAttr("id"),this.dropdown.hide(),this.container.removeClass("select2-dropdown-open"),this.results.empty(),this.clearSearch(),this.search.removeClass("select2-active"),this.opts.element.trigger(an.Event("close"))
}},clearSearch:function(){},getMaximumSelectionSize:function(){return R(this.opts.maximumSelectionSize)
},ensureHighlightVisible:function(){var o,n,m,l,k,b,a,p=this.results;
if(n=this.highlight(),!(0>n)){if(0==n){return p.scrollTop(0),am
}o=this.findHighlightableChoices(),m=an(o[n]),l=m.offset().top+m.outerHeight(!0),n===o.length-1&&(a=p.find("li.select2-more-results"),a.length>0&&(l=a.offset().top+a.outerHeight(!0))),k=p.offset().top+p.outerHeight(!0),l>k&&p.scrollTop(p.scrollTop()+(l-k)),b=m.offset().top-p.offset().top,0>b&&"none"!=m.css("display")&&p.scrollTop(p.scrollTop()+b)
}},findHighlightableChoices:function(){return this.results.find(".select2-result-selectable:not(.select2-selected):not(.select2-disabled)"),this.results.find(".select2-result-selectable:not(.select2-selected):not(.select2-disabled)")
},moveHighlight:function(a){for(var h=this.findHighlightableChoices(),g=this.highlight();
g>-1&&h.length>g;
){g+=a;
var f=an(h[g]);
if(f.hasClass("select2-result-selectable")&&!f.hasClass("select2-disabled")&&!f.hasClass("select2-selected")){this.highlight(g);
break
}}},highlight:function(h){var b,a,g=this.findHighlightableChoices();
return 0===arguments.length?ad(g.filter(".select2-highlighted")[0],g.get()):(h>=g.length&&(h=g.length-1),0>h&&(h=0),this.results.find(".select2-highlighted").removeClass("select2-highlighted"),b=an(g[h]),b.addClass("select2-highlighted"),this.ensureHighlightVisible(),a=b.data("select2-data"),a&&this.opts.element.trigger({type:"highlight",val:this.id(a),choice:a}),am)
},countSelectableResults:function(){return this.findHighlightableChoices().length
},highlightUnderEvent:function(a){var f=an(a.target).closest(".select2-result-selectable");
if(f.length>0&&!f.is(".select2-highlighted")){var e=this.findHighlightableChoices();
this.highlight(e.index(f))
}else{0==f.length&&this.results.find(".select2-highlighted").removeClass("select2-highlighted")
}},loadMoreIfNeeded:function(){var o,j=this.results,d=j.find("li.select2-more-results"),n=this.resultsPage+1,m=this,l=this.search.val(),k=this.context;
0!==d.length&&(o=d.offset().top-j.offset().top-j.height(),this.opts.loadMorePadding>=o&&(d.addClass("select2-active"),this.opts.query({element:this.opts.element,term:l,page:n,context:k,matcher:this.opts.matcher,callback:this.bind(function(a){m.opened()&&(m.opts.populateResults.call(this,j,a.results,{term:l,page:n,context:k}),m.postprocessResults(a,!1,!1),a.more===!0?(d.detach().appendTo(j).text(m.opts.formatLoadMore(n+1)),window.setTimeout(function(){m.loadMoreIfNeeded()
},10)):d.remove(),m.positionDropdown(),m.resultsPage=n,m.context=a.context)
})})))
},tokenize:function(){},updateResults:function(y){function l(){w.scrollTop(0),x.removeClass("select2-active"),s.positionDropdown()
}function b(c){w.html(c),l()
}var u,r,x=this.search,w=this.results,v=this.opts,s=this,q=x.val(),p=an.data(this.container,"select2-last-term");
if((y===!0||!p||!ac(q,p))&&(an.data(this.container,"select2-last-term",q),y===!0||this.showSearchInput!==!1&&this.opened())){var a=this.getMaximumSelectionSize();
if(a>=1&&(u=this.data(),an.isArray(u)&&u.length>=a&&T(v.formatSelectionTooBig,"formatSelectionTooBig"))){return b("<li class='select2-selection-limit'>"+v.formatSelectionTooBig(a)+"</li>"),am
}if(x.val().length<v.minimumInputLength){return T(v.formatInputTooShort,"formatInputTooShort")?b("<li class='select2-no-results'>"+v.formatInputTooShort(x.val(),v.minimumInputLength)+"</li>"):b(""),am
}if(v.maximumInputLength&&x.val().length>v.maximumInputLength){return T(v.formatInputTooLong,"formatInputTooLong")?b("<li class='select2-no-results'>"+v.formatInputTooLong(x.val(),v.maximumInputLength)+"</li>"):b(""),am
}v.formatSearching&&0===this.findHighlightableChoices().length&&b("<li class='select2-searching'>"+v.formatSearching()+"</li>"),x.addClass("select2-active"),r=this.tokenize(),r!=am&&null!=r&&x.val(r),this.resultsPage=1,v.query({element:v.element,term:x.val(),page:this.resultsPage,context:null,matcher:v.matcher,callback:this.bind(function(d){var c;
return this.opened()?(this.context=d.context===am?null:d.context,this.opts.createSearchChoice&&""!==x.val()&&(c=this.opts.createSearchChoice.call(null,x.val(),d.results),c!==am&&null!==c&&s.id(c)!==am&&null!==s.id(c)&&0===an(d.results).filter(function(){return ac(s.id(this),s.id(c))
}).length&&d.results.unshift(c)),0===d.results.length&&T(v.formatNoMatches,"formatNoMatches")?(b("<li class='select2-no-results'>"+v.formatNoMatches(x.val())+"</li>"),am):(w.empty(),s.opts.populateResults.call(this,w,d.results,{term:x.val(),page:this.resultsPage,context:null}),d.more===!0&&T(v.formatLoadMore,"formatLoadMore")&&(w.append("<li class='select2-more-results'>"+s.opts.escapeMarkup(v.formatLoadMore(this.resultsPage))+"</li>"),window.setTimeout(function(){s.loadMoreIfNeeded()
},10)),this.postprocessResults(d,y),l(),this.opts.element.trigger({type:"loaded",data:d}),am)):(this.search.removeClass("select2-active"),am)
})})
}},cancel:function(){this.close()
},blur:function(){this.opts.selectOnBlur&&this.selectHighlighted({noFocus:!0}),this.close(),this.container.removeClass("select2-container-active"),this.search[0]===document.activeElement&&this.search.blur(),this.clearSearch(),this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus")
},focusSearch:function(){Q(this.search)
},selectHighlighted:function(f){var e=this.highlight(),h=this.results.find(".select2-highlighted"),g=h.closest(".select2-result").data("select2-data");
g&&(this.highlight(e),this.onSelect(g,f))
},getPlaceholder:function(){return this.opts.element.attr("placeholder")||this.opts.element.attr("data-placeholder")||this.opts.element.data("placeholder")||this.opts.placeholder
},initContainerWidth:function(){function b(){var m,l,k,j,h;
if("off"===this.opts.width){return null
}if("element"===this.opts.width){return 0===this.opts.element.outerWidth(!1)?"auto":this.opts.element.outerWidth(!1)+"px"
}if("copy"===this.opts.width||"resolve"===this.opts.width){if(m=this.opts.element.attr("style"),m!==am){for(l=m.split(";"),j=0,h=l.length;
h>j;
j+=1){if(k=l[j].replace(/\s/g,"").match(/width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/),null!==k&&k.length>=1){return k[1]
}}}return"resolve"===this.opts.width?(m=this.opts.element.css("width"),m.indexOf("%")>0?m:0===this.opts.element.outerWidth(!1)?"auto":this.opts.element.outerWidth(!1)+"px"):null
}return an.isFunction(this.opts.width)?this.opts.width():this.opts.width
}var a=b.call(this);
null!==a&&this.container.css("width",a)
}}),aj=L(ak,{createContainer:function(){var a=an(document.createElement("div")).attr({"class":"select2-container"}).html(["<a href='javascript:void(0)' onclick='return false;' class='select2-choice' tabindex='-1'>","   <span></span><abbr class='select2-search-choice-close' style='display:none;'></abbr>","   <div><b></b></div>","</a>","<input class='select2-focusser select2-offscreen' type='text'/>","<div class='select2-drop' style='display:none'>","   <div class='select2-search'>","       <input type='text' autocomplete='off' class='select2-input'/>","   </div>","   <ul class='select2-results'>","   </ul>","</div>"].join(""));
return a
},disable:function(){this.enabled&&(this.parent.disable.apply(this,arguments),this.focusser.attr("disabled","disabled"))
},enable:function(){this.enabled||(this.parent.enable.apply(this,arguments),this.focusser.removeAttr("disabled"))
},opening:function(){this.parent.opening.apply(this,arguments),this.focusser.attr("disabled","disabled"),this.opts.element.trigger(an.Event("open"))
},close:function(){this.opened()&&(this.parent.close.apply(this,arguments),this.focusser.removeAttr("disabled"),Q(this.focusser))
},focus:function(){this.opened()?this.close():(this.focusser.removeAttr("disabled"),this.focusser.focus())
},isFocused:function(){return this.container.hasClass("select2-container-active")
},cancel:function(){this.parent.cancel.apply(this,arguments),this.focusser.removeAttr("disabled"),this.focusser.focus()
},initContainer:function(){var g,c=this.container,b=this.dropdown,a=!1;
this.showSearch(this.opts.minimumResultsForSearch>=0),this.selection=g=c.find(".select2-choice"),this.focusser=c.find(".select2-focusser"),this.focusser.attr("id","s2id_autogen"+ah()),an("label[for='"+this.opts.element.attr("id")+"']").attr("for",this.focusser.attr("id")),this.search.bind("keydown",this.bind(function(d){if(this.enabled){if(d.which===al.PAGE_UP||d.which===al.PAGE_DOWN){return O(d),am
}switch(d.which){case al.UP:case al.DOWN:return this.moveHighlight(d.which===al.UP?-1:1),O(d),am;
case al.TAB:case al.ENTER:return this.selectHighlighted(),O(d),am;
case al.ESC:return this.cancel(d),O(d),am
}}})),this.search.bind("blur",this.bind(function(){document.activeElement===this.body().get(0)&&window.setTimeout(this.bind(function(){this.search.focus()
}),0)
})),this.focusser.bind("keydown",this.bind(function(d){return !this.enabled||d.which===al.TAB||al.isControl(d)||al.isFunctionKey(d)||d.which===al.ESC?am:this.opts.openOnEnter===!1&&d.which===al.ENTER?(O(d),am):d.which==al.DOWN||d.which==al.UP||d.which==al.ENTER&&this.opts.openOnEnter?(this.open(),O(d),am):d.which==al.DELETE||d.which==al.BACKSPACE?(this.opts.allowClear&&this.clear(),O(d),am):am
})),Z(this.focusser),this.focusser.bind("keyup-change input",this.bind(function(d){this.opened()||(this.open(),this.showSearchInput!==!1&&this.search.val(this.focusser.val()),this.focusser.val(""),O(d))
})),g.delegate("abbr","mousedown",this.bind(function(d){this.enabled&&(this.clear(),M(d),this.close(),this.selection.focus())
})),g.bind("mousedown",this.bind(function(d){a=!0,this.opened()?this.close():this.enabled&&this.open(),O(d),a=!1
})),b.bind("mousedown",this.bind(function(){this.search.focus()
})),g.bind("focus",this.bind(function(d){O(d)
})),this.focusser.bind("focus",this.bind(function(){this.container.addClass("select2-container-active")
})).bind("blur",this.bind(function(){this.opened()||this.container.removeClass("select2-container-active")
})),this.search.bind("focus",this.bind(function(){this.container.addClass("select2-container-active")
})),this.initContainerWidth(),this.setPlaceholder()
},clear:function(d){var c=this.selection.data("select2-data");
c&&(this.opts.element.val(""),this.selection.find("span").empty(),this.selection.removeData("select2-data"),this.setPlaceholder(),d!==!1&&(this.opts.element.trigger({type:"removed",val:this.id(c),choice:c}),this.triggerChange({removed:c})))
},initSelection:function(){if(""===this.opts.element.val()&&""===this.opts.element.text()){this.close(),this.setPlaceholder()
}else{var a=this;
this.opts.initSelection.call(null,this.opts.element,function(b){b!==am&&null!==b&&(a.updateSelection(b),a.close(),a.setPlaceholder())
})
}},prepareOpts:function(){var a=this.parent.prepareOpts.apply(this,arguments);
return"select"===a.element.get(0).tagName.toLowerCase()?a.initSelection=function(e,g){var f=e.find(":selected");
an.isFunction(g)&&g({id:f.attr("value"),text:f.text(),element:f})
}:"data" in a&&(a.initSelection=a.initSelection||function(j,h){var g=j.val(),b=null;
a.query({matcher:function(e,l,k){var f=ac(g,a.id(k));
return f&&(b=k),f
},callback:an.isFunction(h)?function(){h(b)
}:an.noop})
}),a
},getPlaceholder:function(){return this.select&&""!==this.select.find("option").first().text()?am:this.parent.getPlaceholder.apply(this,arguments)
},setPlaceholder:function(){var b=this.getPlaceholder();
if(""===this.opts.element.val()&&b!==am){if(this.select&&""!==this.select.find("option:first").text()){return
}this.selection.find("span").html(this.opts.escapeMarkup(b)),this.selection.addClass("select2-default"),this.selection.find("abbr").hide()
}},postprocessResults:function(b,o,n){var m=0,l=this,k=!0;
if(this.findHighlightableChoices().each2(function(d,e){return ac(l.id(e.data("select2-data")),l.opts.element.val())?(m=d,!1):am
}),n!==!1&&this.highlight(m),o===!0){var j=this.opts.minimumResultsForSearch;
k=0>j?!1:P(b.results)>=j,this.showSearch(k)
}},showSearch:function(a){this.showSearchInput=a,this.dropdown.find(".select2-search")[a?"removeClass":"addClass"]("select2-search-hidden"),an(this.dropdown,this.container)[a?"addClass":"removeClass"]("select2-with-searchbox")
},onSelect:function(e,d){var f=this.opts.element.val();
this.opts.element.val(this.id(e)),this.updateSelection(e),this.opts.element.trigger({type:"selected",val:this.id(e),choice:e}),this.close(),d&&d.noFocus||this.selection.focus(),ac(f,this.id(e))||this.triggerChange()
},updateSelection:function(b){var e,f=this.selection.find("span");
this.selection.data("select2-data",b),f.empty(),e=this.opts.formatSelection(b,f),e!==am&&f.append(this.opts.escapeMarkup(e)),this.selection.removeClass("select2-default"),this.opts.allowClear&&this.getPlaceholder()!==am&&this.selection.find("abbr").show()
},val:function(){var b,h=!1,g=null,f=this;
if(0===arguments.length){return this.opts.element.val()
}if(b=arguments[0],arguments.length>1&&(h=arguments[1]),this.select){this.select.val(b).find(":selected").each2(function(d,c){return g={id:c.attr("value"),text:c.text(),element:c.get(0)},!1
}),this.updateSelection(g),this.setPlaceholder(),h&&this.triggerChange()
}else{if(this.opts.initSelection===am){throw Error("cannot call val() if initSelection() is not defined")
}if(!b&&0!==b){return this.clear(h),h&&this.triggerChange(),am
}this.opts.element.val(b),this.opts.initSelection(this.opts.element,function(c){f.opts.element.val(c?f.id(c):""),f.updateSelection(c),f.setPlaceholder(),h&&f.triggerChange()
})
}},clearSearch:function(){this.search.val(""),this.focusser.val("")
},data:function(b){var d;
return 0===arguments.length?(d=this.selection.data("select2-data"),d==am&&(d=null),d):(b&&""!==b?(this.opts.element.val(b?this.id(b):""),this.updateSelection(b)):this.clear(),am)
}}),ai=L(ak,{createContainer:function(){var a=an(document.createElement("div")).attr({"class":"select2-container select2-container-multi"}).html(["    <ul class='select2-choices'>","  <li class='select2-search-field'>","    <input type='text' autocomplete='off' class='select2-input'>","  </li>","</ul>","<div class='select2-drop select2-drop-multi' style='display:none;'>","   <ul class='select2-results'>","   </ul>","</div>"].join(""));
return a
},prepareOpts:function(){var a=this.parent.prepareOpts.apply(this,arguments);
return"select"===a.element.get(0).tagName.toLowerCase()?a.initSelection=function(e,d){var f=[];
e.find(":selected").each2(function(g,c){f.push({id:c.attr("value"),text:c.text(),element:c[0]})
}),d(f)
}:"data" in a&&(a.initSelection=a.initSelection||function(j,h){var g=ab(j.val(),a.separator),b=[];
a.query({matcher:function(l,k,f){var e=an.grep(g,function(c){return ac(c,a.id(f))
}).length;
return e&&b.push(f),e
},callback:an.isFunction(h)?function(){h(b)
}:an.noop})
}),a
},initContainer:function(){var a,b=".select2-choices";
this.searchContainer=this.container.find(".select2-search-field"),this.selection=a=this.container.find(b),this.search.attr("id","s2id_autogen"+ah()),an("label[for='"+this.opts.element.attr("id")+"']").attr("for",this.search.attr("id")),this.search.bind("input paste",this.bind(function(){this.enabled&&(this.opened()||this.open())
})),this.search.bind("keydown",this.bind(function(c){if(this.enabled){if(c.which===al.BACKSPACE&&""===this.search.val()){this.close();
var g,e=a.find(".select2-search-choice-focus");
if(e.length>0){return this.unselect(e.first()),this.search.width(10),O(c),am
}g=a.find(".select2-search-choice:not(.select2-locked)"),g.length>0&&g.last().addClass("select2-search-choice-focus")
}else{a.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus")
}if(this.opened()){switch(c.which){case al.UP:case al.DOWN:return this.moveHighlight(c.which===al.UP?-1:1),O(c),am;
case al.ENTER:case al.TAB:return this.selectHighlighted(),O(c),am;
case al.ESC:return this.cancel(c),O(c),am
}}if(c.which!==al.TAB&&!al.isControl(c)&&!al.isFunctionKey(c)&&c.which!==al.BACKSPACE&&c.which!==al.ESC){if(c.which===al.ENTER){if(this.opts.openOnEnter===!1){return
}if(c.altKey||c.ctrlKey||c.shiftKey||c.metaKey){return
}}this.open(),(c.which===al.PAGE_UP||c.which===al.PAGE_DOWN)&&O(c),c.which===al.ENTER&&O(c)
}}})),this.search.bind("keyup",this.bind(this.resizeSearch)),this.search.bind("blur",this.bind(function(c){this.container.removeClass("select2-container-active"),this.search.removeClass("select2-focused"),this.opened()||this.clearSearch(),c.stopImmediatePropagation()
})),this.container.delegate(b,"mousedown",this.bind(function(c){this.enabled&&(an(c.target).closest(".select2-search-choice").length>0||(this.clearPlaceholder(),this.open(),this.focusSearch(),c.preventDefault()))
})),this.container.delegate(b,"focus",this.bind(function(){this.enabled&&(this.container.addClass("select2-container-active"),this.dropdown.addClass("select2-drop-active"),this.clearPlaceholder())
})),this.initContainerWidth(),this.clearSearch()
},enable:function(){this.enabled||(this.parent.enable.apply(this,arguments),this.search.removeAttr("disabled"))
},disable:function(){this.enabled&&(this.parent.disable.apply(this,arguments),this.search.attr("disabled",!0))
},initSelection:function(){if(""===this.opts.element.val()&&""===this.opts.element.text()&&(this.updateSelection([]),this.close(),this.clearSearch()),this.select||""!==this.opts.element.val()){var a=this;
this.opts.initSelection.call(null,this.opts.element,function(b){b!==am&&null!==b&&(a.updateSelection(b),a.close(),a.clearSearch())
})
}},clearSearch:function(){var b=this.getPlaceholder();
b!==am&&0===this.getVal().length&&this.search.hasClass("select2-focused")===!1?(this.search.val(b).addClass("select2-default"),this.search.width(this.getMaxSearchWidth())):this.search.val("").width(10)
},clearPlaceholder:function(){this.search.hasClass("select2-default")&&this.search.val("").removeClass("select2-default")
},opening:function(){this.clearPlaceholder(),this.resizeSearch(),this.parent.opening.apply(this,arguments),this.focusSearch(),this.opts.element.trigger(an.Event("open"))
},close:function(){this.opened()&&this.parent.close.apply(this,arguments)
},focus:function(){this.close(),this.search.focus()
},isFocused:function(){return this.search.hasClass("select2-focused")
},updateSelection:function(a){var h=[],g=[],f=this;
an(a).each(function(){0>ad(f.id(this),h)&&(h.push(f.id(this)),g.push(this))
}),a=g,this.selection.find(".select2-search-choice").remove(),an(a).each(function(){f.addSelectedChoice(this)
}),f.postprocessResults()
},tokenize:function(){var b=this.search.val();
b=this.opts.tokenizer(b,this.data(),this.bind(this.onSelect),this.opts),null!=b&&b!=am&&(this.search.val(b),b.length>0&&this.open())
},onSelect:function(d,c){this.addSelectedChoice(d),this.opts.element.trigger({type:"selected",val:this.id(d),choice:d}),(this.select||!this.opts.closeOnSelect)&&this.postprocessResults(),this.opts.closeOnSelect?(this.close(),this.search.width(10)):this.countSelectableResults()>0?(this.search.width(10),this.resizeSearch(),this.getMaximumSelectionSize()>0&&this.val().length>=this.getMaximumSelectionSize()&&this.updateResults(!0),this.positionDropdown()):(this.close(),this.search.width(10)),this.triggerChange({added:d}),c&&c.noFocus||this.focusSearch()
},cancel:function(){this.close(),this.focusSearch()
},addSelectedChoice:function(p){var a,o=!p.locked,n=an("<li class='select2-search-choice'>    <div></div>    <a href='#' onclick='return false;' class='select2-search-choice-close' tabindex='-1'></a></li>"),m=an("<li class='select2-search-choice select2-locked'><div></div></li>"),l=o?n:m,k=this.id(p),b=this.getVal();
a=this.opts.formatSelection(p,l.find("div")),a!=am&&l.find("div").replaceWith("<div>"+this.opts.escapeMarkup(a)+"</div>"),o&&l.find(".select2-search-choice-close").bind("mousedown",O).bind("click dblclick",this.bind(function(c){this.enabled&&(an(c.target).closest(".select2-search-choice").fadeOut("fast",this.bind(function(){this.unselect(an(c.target)),this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus"),this.close(),this.focusSearch()
})).dequeue(),O(c))
})).bind("focus",this.bind(function(){this.enabled&&(this.container.addClass("select2-container-active"),this.dropdown.addClass("select2-drop-active"))
})),l.data("select2-data",p),l.insertBefore(this.searchContainer),b.push(k),this.setVal(b)
},unselect:function(f){var h,g,e=this.getVal();
if(f=f.closest(".select2-search-choice"),0===f.length){throw"Invalid argument: "+f+". Must be .select2-search-choice"
}h=f.data("select2-data"),h&&(g=ad(this.id(h),e),g>=0&&(e.splice(g,1),this.setVal(e),this.select&&this.postprocessResults()),f.remove(),this.opts.element.trigger({type:"removed",val:this.id(h),choice:h}),this.triggerChange({removed:h}))
},postprocessResults:function(){var f=this.getVal(),e=this.results.find(".select2-result"),h=this.results.find(".select2-result-with-children"),g=this;
e.each2(function(a,j){var d=g.id(j.data("select2-data"));
ad(d,f)>=0&&(j.addClass("select2-selected"),j.find(".select2-result-selectable").addClass("select2-selected"))
}),h.each2(function(d,c){c.is(".select2-result-selectable")||0!==c.find(".select2-result-selectable:not(.select2-selected)").length||c.addClass("select2-selected")
}),-1==this.highlight()&&g.highlight(0)
},getMaxSearchWidth:function(){return this.selection.width()-aa(this.search)
},resizeSearch:function(){var h,g,m,l,k,j=aa(this.search);
h=K(this.search)+10,g=this.search.offset().left,m=this.selection.width(),l=this.selection.offset().left,k=m-(g-l)-j,h>k&&(k=m-j),40>k&&(k=m-j),0>=k&&(k=h),this.search.width(k)
},getVal:function(){var b;
return this.select?(b=this.select.val(),null===b?[]:b):(b=this.opts.element.val(),ab(b,this.opts.separator))
},setVal:function(a){var d;
this.select?this.select.val(a):(d=[],an(a).each(function(){0>ad(this,d)&&d.push(this)
}),this.opts.element.val(0===d.length?"":d.join(this.opts.separator)))
},val:function(){var e,b=!1,a=this;
if(0===arguments.length){return this.getVal()
}if(e=arguments[0],arguments.length>1&&(b=arguments[1]),!e&&0!==e){return this.opts.element.val(""),this.updateSelection([]),this.clearSearch(),b&&this.triggerChange(),am
}if(this.setVal(e),this.select){this.opts.initSelection(this.select,this.bind(this.updateSelection)),b&&this.triggerChange()
}else{if(this.opts.initSelection===am){throw Error("val() cannot be called if initSelection() is not defined")
}this.opts.initSelection(this.opts.element,function(d){var f=an(d).map(a.id);
a.setVal(f),a.updateSelection(d),a.clearSearch(),b&&a.triggerChange()
})
}this.clearSearch()
},onSortStart:function(){if(this.select){throw Error("Sorting of elements is not supported when attached to <select>. Attach to <input type='hidden'/> instead.")
}this.search.width(0),this.searchContainer.hide()
},onSortEnd:function(){var a=[],d=this;
this.searchContainer.show(),this.searchContainer.appendTo(this.searchContainer.parent()),this.resizeSearch(),this.selection.find(".select2-search-choice").each(function(){a.push(d.opts.id(an(this).data("select2-data")))
}),this.setVal(a),this.triggerChange()
},data:function(f){var a,b=this;
return 0===arguments.length?this.selection.find(".select2-search-choice").map(function(){return an(this).data("select2-data")
}).get():(f||(f=[]),a=an.map(f,function(c){return b.opts.id(c)
}),this.setVal(a),this.updateSelection(f),this.clearSearch(),am)
}}),an.fn.select2=function(){var k,f,e,b,l=Array.prototype.slice.call(arguments,0),a=["val","destroy","opened","open","close","focus","isFocused","container","onSortStart","onSortEnd","enable","disable","positionDropdown","data"];
return this.each(function(){if(0===l.length||"object"==typeof l[0]){k=0===l.length?{}:an.extend({},l[0]),k.element=an(this),"select"===k.element.get(0).tagName.toLowerCase()?b=k.element.attr("multiple"):(b=k.multiple||!1,"tags" in k&&(k.multiple=b=!0)),f=b?new ai:new aj,f.init(k)
}else{if("string"!=typeof l[0]){throw"Invalid arguments to select2 plugin: "+l
}if(0>ad(l[0],a)){throw"Unknown method: "+l[0]
}if(e=am,f=an(this).data("select2"),f===am){return
}if(e="container"===l[0]?f.container:f[l[0]].apply(f,l.slice(1)),e!==am){return !1
}}}),e===am?this:e
},an.fn.select2.defaults={width:"copy",loadMorePadding:0,closeOnSelect:!0,openOnEnter:!0,containerCss:{},dropdownCss:{},containerCssClass:"",dropdownCssClass:"",formatResult:function(g,f,k,j){var h=[];
return I(g.text,k.term,h,j),h.join("")
},formatSelection:function(b){return b?b.text:am
},sortResults:function(b){return b
},formatResultCssClass:function(){return am
},formatNoMatches:function(){return"No matches found"
},formatInputTooShort:function(e,d){var f=d-e.length;
return"Please enter "+f+" more character"+(1==f?"":"s")
},formatInputTooLong:function(e,d){var f=e.length-d;
return"Please delete "+f+" character"+(1==f?"":"s")
},formatSelectionTooBig:function(b){return"You can only select "+b+" item"+(1==b?"":"s")
},formatLoadMore:function(){return"Loading more results..."
},formatSearching:function(){return"Searching..."
},minimumResultsForSearch:0,minimumInputLength:0,maximumInputLength:null,maximumSelectionSize:0,id:function(b){return b.id
},matcher:function(d,c){return(""+c).toUpperCase().indexOf((""+d).toUpperCase())>=0
},separator:",",tokenSeparators:[],tokenizer:N,escapeMarkup:function(d){var c={"\\":"&#92;","&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;","/":"&#47;"};
return(d+"").replace(/[&<>"'\/\\]/g,function(b){return c[b[0]]
})
},blurOnChange:!1,selectOnBlur:!1,adaptContainerCssClass:function(b){return b
},adaptDropdownCssClass:function(){return null
}},window.Select2={query:{ajax:H,local:X,tags:V},util:{debounce:W,markMatch:I},"class":{"abstract":ak,single:aj,multi:ai}}
}}(jQuery);
(function(aO,aN,aM){function Z(b){ag(arguments,function(a,c){b[a]===aM&&(b[a]=c)
});
return b
}function aa(b){ag(arguments,function(a,d){b[aC][ab(b,a)||a]=d
});
return b
}function ab(e,c){var k=e[aC],j,h;
if(k[c]!==aM){return c
}c=c.charAt(0).toUpperCase()+c.slice(1);
for(h=0;
h<aj[aK];
h++){j=aj[h]+c;
if(k[j]!==aM){return j
}}}function ac(h,e){var m=[aF,e,~~(h*100)].join("-"),l="{"+aF+":"+h+"}",k;
if(!ai[m]){for(k=0;
k<aj[aK];
k++){try{ad.insertRule("@"+(aj[k]&&"-"+aj[k].toLowerCase()+"-"||"")+"keyframes "+m+"{0%{"+aF+":1}"+e+"%"+l+"to"+l+"}",ad.cssRules[aK])
}catch(j){}}ai[m]=1
}return m
}function ae(e,d,f){f&&!f[av]&&ae(e,f),e.insertBefore(d,f||null);
return e
}function af(b){var d=aN.createElement(b||"div");
ag(arguments,function(e,c){d[e]=c
});
return d
}function ag(f,e){var h=~~((f[aK]-1)/2);
for(var g=1;
g<=h;
g++){e(f[g*2-1],f[g*2])
}}var aL="width",aK="length",aJ="radius",aI="lines",aH="trail",aG="color",aF="opacity",aE="speed",aD="shadow",aC="style",aB="height",aA="left",az="top",ay="px",ax="childNodes",aw="firstChild",av="parentNode",au="position",at="relative",ar="absolute",aq="animation",ap="transform",ao="Origin",an="Timeout",am="coord",al="#000",ak=aC+"Sheets",aj="webkit0Moz0ms0O".split(0),ai={},ah;
ae(aN.getElementsByTagName("head")[0],af(aC));
var ad=aN[ak][aN[ak][aK]-1],Y=function(b){this.opts=Z(b||{},aI,12,aH,100,aK,7,aL,5,aJ,10,aG,al,aF,0.25,aE,1)
},X=Y.prototype={spin:function(r){var q=this,p=q.el=q[aI](q.opts);
r&&ae(r,aa(p,aA,~~(r.offsetWidth/2)+ay,az,~~(r.offsetHeight/2)+ay),r[aw]);
if(!ah){var o=q.opts,k=0,j=20/o[aE],h=(1-o[aF])/(j*o[aH]/100),g=j/o[aI];
(function a(){k++;
for(var c=o[aI];
c;
c--){var d=Math.max(1-(k+c*g)%j*h,o[aF]);
q[aF](p,o[aI]-c,d,o)
}q[an]=q.el&&aO["set"+an](a,50)
})()
}return q
},stop:function(){var a=this,c=a.el;
aO["clear"+an](a[an]),c&&c[av]&&c[av].removeChild(c),a.el=aM;
return a
}};
X[aI]=function(f){function g(a,k){return aa(af(),au,ar,aL,f[aK]+f[aL]+ay,aB,f[aL]+ay,"background",a,"boxShadow",k,ap+ao,aA,ap,"rotate("+~~(360/f[aI]*d)+"deg) translate("+f[aJ]+ay+",0)","borderRadius","100em")
}var e=aa(af(),au,at),j=ac(f[aF],f[aH]),d=0,h;
for(;
d<f[aI];
d++){h=aa(af(),au,ar,az,1+~(f[aL]/2)+ay,ap,"translate3d(0,0,0)",aq,j+" "+1/f[aE]+"s linear infinite "+(1/f[aI]/f[aE]*d-1/f[aE])+"s"),f[aD]&&ae(h,aa(g(al,"0 0 4px "+al),az,2+ay)),ae(e,ae(h,g(f[aG],"0 0 1px rgba(0,0,0,.1)")))
}return e
},X[aF]=function(e,d,f){e[ax][d][aC][aF]=f
};
var W="behavior",V="url(#default#VML)",U="group0roundrect0fill0stroke".split(0);
(function(){var d=aa(af(U[0]),W,V),c;
if(!ab(d,ap)&&d.adj){for(c=0;
c<U[aK];
c++){ad.addRule(U[c],W+":"+V)
}X[aI]=function(){function n(h,b,a){ae(j,ae(aa(l(),"rotation",360/g[aI]*h+"deg",aA,~~b),ae(aa(af(U[1],"arcsize",1),aL,f,aB,g[aL],aA,g[aJ],az,-g[aL]/2,"filter",a),af(U[2],aG,g[aG],aF,g[aF]),af(U[3],aF,0))))
}function l(){return aa(af(U[0],am+"size",p+" "+p,am+ao,-f+" "+-f),aL,p,aB,p)
}var g=this.opts,f=g[aK]+g[aL],p=2*f,j=l(),e=~(g[aK]+g[aJ]+g[aL])+ay,o;
if(g[aD]){for(o=1;
o<=g[aI];
o++){n(o,-2,"progid:DXImage"+ap+".Microsoft.Blur(pixel"+aJ+"=2,make"+aD+"=1,"+aD+aF+"=.3)")
}}for(o=1;
o<=g[aI];
o++){n(o)
}return ae(aa(af(),"margin",e+" 0 0 "+e,au,at),j)
},X[aF]=function(f,e,h,g){g=g[aD]&&g[aI]||0,f[aw][ax][e+g][aw][aw][aF]=h
}
}else{ah=ab(d,aq)
}})(),aO.Spinner=Y
})(window,document);
(function(a){if(typeof exports=="object"){a(require("jquery"),require("spin"))
}else{if(typeof define=="function"&&define.amd){define(["jquery","spin"],a)
}else{if(!window.Spinner){throw new Error("Spin.js not present")
}a(window.jQuery,window.Spinner)
}}}(function(b,a){b.fn.spin=function(d,c){return this.each(function(){var f=b(this),e=f.data();
if(e.spinner){e.spinner.stop();
delete e.spinner
}if(d!==false){d=b.extend({color:c||f.css("color")},b.fn.spin.presets[d]||d);
e.spinner=new a(d).spin(this)
}})
};
b.fn.spin.presets={tiny:{lines:8,length:2,width:2,radius:3},small:{lines:8,length:4,width:3,radius:5},large:{lines:10,length:8,width:4,radius:8}}
}));
AJAM.getTimeZone=function(d){var c=d||new Date(),b=c+"",a=(b.match(/\(([^\)]+)\)$/)||b.match(/([A-Z]+) [\d]{4}$/));
if(a){a=a[1].match(/[A-Z]/g).join("")
}return a
};
(function(h){var d,p=this,J=p.document,o=h(J),C=h(p),k=Array.prototype,G=1.29,f=true,b=30000,y=false,v=navigator.userAgent.toLowerCase(),r=p.location.hash.replace(/#\//,""),x=function(){},D=function(){return false
},q=(function(){var F=3,L=J.createElement("div"),K=L.getElementsByTagName("i");
do{L.innerHTML="<!--[if gt IE "+(++F)+"]><i></i><![endif]-->"
}while(K[0]);
return F>4?F:d
}()),I=function(){return{html:J.documentElement,body:J.body,head:J.getElementsByTagName("head")[0],title:J.title}
},H=p.parent!==p.self,j="data ready thumbnail loadstart loadfinish image play pause progress fullscreen_enter fullscreen_exit idle_enter idle_exit rescale lightbox_open lightbox_close lightbox_image",w=(function(){var F=[];
h.each(j.split(" "),function(K,L){F.push(L);
if(/_/.test(L)){F.push(L.replace(/_/g,""))
}});
return F
}()),B=function(F){var K;
if(typeof F!=="object"){return F
}h.each(F,function(L,M){if(/^[a-z]+_/.test(L)){K="";
h.each(L.split("_"),function(O,N){K+=O>0?N.substr(0,1).toUpperCase()+N.substr(1):N
});
F[K]=M;
delete F[L]
}});
return F
},c=function(F){if(h.inArray(F,w)>-1){return Galleria[F.toUpperCase()]
}return F
},n={youtube:{reg:/https?:\/\/(?:[a-zA_Z]{2,3}.)?(?:youtube\.com\/watch\?)((?:[\w\d\-\_\=]+&amp;(?:amp;)?)*v(?:&lt;[A-Z]+&gt;)?=([0-9a-zA-Z\-\_]+))/i,embed:function(F){return"http://www.youtube.com/embed/"+F
},getThumb:function(L,K,F){F=F||x;
h.getJSON(p.location.protocol+"//gdata.youtube.com/feeds/api/videos/"+L+"?v=2&alt=json-in-script&callback=?",function(M){try{K(M.entry.media$group.media$thumbnail[0].url)
}catch(N){F()
}}).error(F)
}},vimeo:{reg:/https?:\/\/(?:www\.)?(vimeo\.com)\/(?:hd#)?([0-9]+)/i,embed:function(F){return"http://player.vimeo.com/video/"+F
},getThumb:function(L,K,F){F=F||x;
h.getJSON("http://vimeo.com/api/v2/video/"+L+".json?callback=?",function(M){try{K(M[0].thumbnail_medium)
}catch(N){F()
}}).error(F)
}},dailymotion:{reg:/https?:\/\/(?:www\.)?(dailymotion\.com)\/video\/([^_]+)/,embed:function(F){return"http://www.dailymotion.com/embed/video/"+F
},getThumb:function(L,K,F){F=F||x;
h.getJSON("https://api.dailymotion.com/video/"+L+"?fields=thumbnail_medium_url&callback=?",function(M){try{K(M.thumbnail_medium_url)
}catch(N){F()
}}).error(F)
}}},a=function(L){var K;
for(var F in n){K=L&&L.match(n[F].reg);
if(K&&K.length){return{id:K[2],provider:F}
}}return false
},E={support:(function(){var F=I().html;
return !H&&(F.requestFullscreen||F.mozRequestFullScreen||F.webkitRequestFullScreen)
}()),callback:x,enter:function(F,L,K){this.instance=F;
this.callback=L||x;
K=K||I().html;
if(K.requestFullscreen){K.requestFullscreen()
}else{if(K.mozRequestFullScreen){K.mozRequestFullScreen()
}else{if(K.webkitRequestFullScreen){K.webkitRequestFullScreen()
}}}},exit:function(F){this.callback=F||x;
if(J.exitFullscreen){J.exitFullscreen()
}else{if(J.mozCancelFullScreen){J.mozCancelFullScreen()
}else{if(J.webkitCancelFullScreen){J.webkitCancelFullScreen()
}}}},instance:null,listen:function(){if(!this.support){return
}var F=function(){if(!E.instance){return
}var K=E.instance._fullscreen;
if(J.fullscreen||J.mozFullScreen||J.webkitIsFullScreen){K._enter(E.callback)
}else{K._exit(E.callback)
}};
J.addEventListener("fullscreenchange",F,false);
J.addEventListener("mozfullscreenchange",F,false);
J.addEventListener("webkitfullscreenchange",F,false)
}},s=[],A=[],u=false,z=false,g=[],m=function(F){Galleria.theme=F;
h.each(g,function(L,K){if(!K._initialized){K._init.call(K)
}});
g=[]
},e=(function(){return{clearTimer:function(F){h.each(Galleria.get(),function(){this.clearTimer(F)
})
},addTimer:function(F){h.each(Galleria.get(),function(){this.addTimer(F)
})
},array:function(F){return k.slice.call(F,0)
},create:function(F,L){L=L||"div";
var K=J.createElement(L);
K.className=F;
return K
},removeFromArray:function(F,K){h.each(F,function(L,M){if(M==K){F.splice(L,1);
return false
}});
return F
},getScriptPath:function(K){K=K||h("script:last").attr("src");
var F=K.split("/");
if(F.length==1){return""
}F.pop();
return F.join("/")+"/"
},animate:(function(){var Q=(function(X){var W="WebkitTransition MozTransition OTransition transition".split(" "),V;
if(p.opera){return false
}for(V=0;
W[V];
V++){if(typeof X[W[V]]!=="undefined"){return W[V]
}}return false
}((J.body||J.documentElement).style));
var U={MozTransition:"transitionend",OTransition:"oTransitionEnd",WebkitTransition:"webkitTransitionEnd",transition:"transitionend"}[Q];
var L={_default:[0.25,0.1,0.25,1],galleria:[0.645,0.045,0.355,1],galleriaIn:[0.55,0.085,0.68,0.53],galleriaOut:[0.25,0.46,0.45,0.94],ease:[0.25,0,0.25,1],linear:[0.25,0.25,0.75,0.75],"ease-in":[0.42,0,1,1],"ease-out":[0,0,0.58,1],"ease-in-out":[0.42,0,0.58,1]};
var N=function(W,X,Y){var V={};
Y=Y||"transition";
h.each("webkit moz ms o".split(" "),function(){V["-"+this+"-"+Y]=X
});
W.css(V)
};
var R=function(V){N(V,"none","transition");
if(Galleria.WEBKIT&&Galleria.TOUCH){N(V,"translate3d(0,0,0)","transform");
if(V.data("revert")){V.css(V.data("revert"));
V.data("revert",null)
}}};
var S,T,P,K,O,F,M;
return function(W,X,V){V=h.extend({duration:400,complete:x,stop:false},V);
W=h(W);
if(!V.duration){W.css(X);
V.complete.call(W[0]);
return
}if(!Q){W.animate(X,V);
return
}if(V.stop){W.unbind(U);
R(W)
}S=false;
h.each(X,function(Y,Z){M=W.css(Y);
if(e.parseValue(M)!=e.parseValue(Z)){S=true
}W.css(Y,M)
});
if(!S){p.setTimeout(function(){V.complete.call(W[0])
},V.duration);
return
}T=[];
P=V.easing in L?L[V.easing]:L._default;
K=" "+V.duration+"ms cubic-bezier("+P.join(",")+")";
p.setTimeout((function(Z,ab,aa,Y){return function(){Z.one(ab,(function(ac){return function(){R(ac);
V.complete.call(ac[0])
}
}(Z)));
if(Galleria.WEBKIT&&Galleria.TOUCH){O={};
F=[0,0,0];
h.each(["left","top"],function(ad,ac){if(ac in aa){F[ad]=(e.parseValue(aa[ac])-e.parseValue(Z.css(ac)))+"px";
O[ac]=aa[ac];
delete aa[ac]
}});
if(F[0]||F[1]){Z.data("revert",O);
T.push("-webkit-transform"+Y);
N(Z,"translate3d("+F.join(",")+")","transform")
}}h.each(aa,function(ac,ad){T.push(ac+Y)
});
N(Z,T.join(","));
Z.css(aa)
}
}(W,U,X,K)),2)
}
}()),removeAlpha:function(M){if(q<9&&M){var L=M.style,F=M.currentStyle,K=F&&F.filter||L.filter||"";
if(/alpha/.test(K)){L.filter=K.replace(/alpha\([^)]*\)/i,"")
}}},forceStyles:function(K,F){K=h(K);
if(K.attr("style")){K.data("styles",K.attr("style")).removeAttr("style")
}K.css(F)
},revertStyles:function(){h.each(e.array(arguments),function(F,K){K=h(K);
K.removeAttr("style");
K.attr("style","");
if(K.data("styles")){K.attr("style",K.data("styles")).data("styles",null)
}})
},moveOut:function(F){e.forceStyles(F,{position:"absolute",left:-10000})
},moveIn:function(){e.revertStyles.apply(e,e.array(arguments))
},elem:function(F){if(F instanceof h){return{$:F,dom:F[0]}
}else{return{$:h(F),dom:F}
}},hide:function(N,O,P){P=P||x;
var M=e.elem(N),K=M.$;
N=M.dom;
if(!K.data("opacity")){K.data("opacity",K.css("opacity"))
}var L={opacity:0};
if(O){var F=q<9&&N?function(){e.removeAlpha(N);
N.style.visibility="hidden";
P.call(N)
}:P;
e.animate(N,L,{duration:O,complete:F,stop:true})
}else{if(q<9&&N){e.removeAlpha(N);
N.style.visibility="hidden"
}else{K.css(L)
}}},show:function(O,P,Q){Q=Q||x;
var M=e.elem(O),K=M.$;
O=M.dom;
var N=parseFloat(K.data("opacity"))||1,L={opacity:N};
if(P){if(q<9){K.css("opacity",0);
O.style.visibility="visible"
}var F=q<9&&O?function(){if(L.opacity==1){e.removeAlpha(O)
}Q.call(O)
}:Q;
e.animate(O,L,{duration:P,complete:F,stop:true})
}else{if(q<9&&L.opacity==1&&O){e.removeAlpha(O);
O.style.visibility="visible"
}else{K.css(L)
}}},optimizeTouch:(function(){var P,N,L,Q,K={},O=function(R){R.preventDefault();
K=h.extend({},R,true)
},M=function(){this.evt=K
},F=function(){this.handler.call(P,this.evt)
};
return function(R){h(R).bind("touchend",function(S){P=S.target;
Q=true;
while(P.parentNode&&P!=S.currentTarget&&Q){N=h(P).data("events");
L=h(P).data("fakes");
if(N&&"click" in N){Q=false;
S.preventDefault();
h(P).click(O).click();
N.click.pop();
h.each(N.click,M);
h(P).data("fakes",N.click);
delete N.click
}else{if(L){Q=false;
S.preventDefault();
h.each(L,F)
}}P=P.parentNode
}})
}
}()),wait:function(L){L=h.extend({until:D,success:x,error:function(){Galleria.raise("Could not complete wait function.")
},timeout:3000},L);
var N=e.timestamp(),F,K,M=function(){K=e.timestamp();
F=K-N;
if(L.until(F)){L.success();
return false
}if(typeof L.timeout=="number"&&K>=N+L.timeout){L.error();
return false
}p.setTimeout(M,10)
};
p.setTimeout(M,10)
},toggleQuality:function(F,K){if((q!==7&&q!==8)||!F||F.nodeName.toUpperCase()!="IMG"){return
}if(typeof K==="undefined"){K=F.style.msInterpolationMode==="nearest-neighbor"
}F.style.msInterpolationMode=K?"bicubic":"nearest-neighbor"
},insertStyleTag:function(L,M){if(M&&h("#"+M).length){return
}var K=J.createElement("style");
if(M){K.id=M
}I().head.appendChild(K);
if(K.styleSheet){K.styleSheet.cssText=L
}else{var F=J.createTextNode(L);
K.appendChild(F)
}},loadScript:function(L,M){var F=false,K=h("<script>").attr({src:L,async:true}).get(0);
K.onload=K.onreadystatechange=function(){if(!F&&(!this.readyState||this.readyState==="loaded"||this.readyState==="complete")){F=true;
K.onload=K.onreadystatechange=null;
if(typeof M==="function"){M.call(this,this)
}}};
I().head.appendChild(K)
},parseValue:function(K){if(typeof K==="number"){return K
}else{if(typeof K==="string"){var F=K.match(/\-?\d|\./g);
return F&&F.constructor===Array?F.join("")*1:0
}else{return 0
}}},timestamp:function(){return new Date().getTime()
},loadCSS:function(F,P,O){var N,M;
h("link[rel=stylesheet]").each(function(){if(new RegExp(F).test(this.href)){N=this;
return false
}});
if(typeof P==="function"){O=P;
P=d
}O=O||x;
if(N){O.call(N,N);
return N
}M=J.styleSheets.length;
if(h("#"+P).length){h("#"+P).attr("href",F);
M--
}else{N=h("<link>").attr({rel:"stylesheet",href:F,id:P}).get(0);
var L=h('link[rel="stylesheet"], style');
if(L.length){L.get(0).parentNode.insertBefore(N,L[0])
}else{I().head.appendChild(N)
}if(q){if(M>=31){Galleria.raise("You have reached the browser stylesheet limit (31)",true);
return
}}}if(typeof O==="function"){var K=h("<s>").attr("id","galleria-loader").hide().appendTo(I().body);
e.wait({until:function(){return K.height()==1
},success:function(){K.remove();
O.call(N,N)
},error:function(){K.remove();
Galleria.raise("Theme CSS could not load after 20 sec. "+(Galleria.QUIRK?"Your browser is in Quirks Mode, please add a correct doctype.":"Please download the latest theme at http://galleria.io/customer/."),true)
},timeout:5000})
}return N
}}
}()),l=(function(){var F=function(N,L,M,K){var R=this.getOptions("easing"),Q=this.getStageWidth(),P={left:Q*(N.rewind?-1:1)},O={left:0};
if(M){P.opacity=0;
O.opacity=1
}else{P.opacity=1
}h(N.next).css(P);
e.animate(N.next,O,{duration:N.speed,complete:(function(S){return function(){L();
S.css({left:0})
}
}(h(N.next).add(N.prev))),queue:false,easing:R});
if(K){N.rewind=!N.rewind
}if(N.prev){P={left:0};
O={left:Q*(N.rewind?1:-1)};
if(M){P.opacity=1;
O.opacity=0
}h(N.prev).css(P);
e.animate(N.prev,O,{duration:N.speed,queue:false,easing:R,complete:function(){h(this).css("opacity",0)
}})
}};
return{active:false,init:function(L,M,K){if(l.effects.hasOwnProperty(L)){l.effects[L].call(this,M,K)
}},effects:{fade:function(L,K){h(L.next).css({opacity:0,left:0});
e.animate(L.next,{opacity:1},{duration:L.speed,complete:K});
if(L.prev){h(L.prev).css("opacity",1).show();
e.animate(L.prev,{opacity:0},{duration:L.speed})
}},flash:function(L,K){h(L.next).css({opacity:0,left:0});
if(L.prev){e.animate(L.prev,{opacity:0},{duration:L.speed/2,complete:function(){e.animate(L.next,{opacity:1},{duration:L.speed,complete:K})
}})
}else{e.animate(L.next,{opacity:1},{duration:L.speed,complete:K})
}},pulse:function(L,K){if(L.prev){h(L.prev).hide()
}h(L.next).css({opacity:0,left:0}).show();
e.animate(L.next,{opacity:1},{duration:L.speed,complete:K})
},slide:function(L,K){F.apply(this,e.array(arguments))
},fadeslide:function(L,K){F.apply(this,e.array(arguments).concat([true]))
},doorslide:function(L,K){F.apply(this,e.array(arguments).concat([false,true]))
}}}
}());
E.listen();
Galleria=function(){var S=this;
this._options={};
this._playing=false;
this._playtime=5000;
this._active=null;
this._queue={length:0};
this._data=[];
this._dom={};
this._thumbnails=[];
this._layers=[];
this._initialized=false;
this._firstrun=false;
this._stageWidth=0;
this._stageHeight=0;
this._target=d;
this._binds=[];
this._id=parseInt(Math.random()*10000,10);
var O="container stage images image-nav image-nav-left image-nav-right info info-text info-title info-description thumbnails thumbnails-list thumbnails-container thumb-nav-left thumb-nav-right loader counter tooltip",N="current total";
h.each(O.split(" "),function(U,V){S._dom[V]=e.create("galleria-"+V)
});
h.each(N.split(" "),function(U,V){S._dom[V]=e.create("galleria-"+V,"span")
});
var M=this._keyboard={keys:{UP:38,DOWN:40,LEFT:37,RIGHT:39,RETURN:13,ESCAPE:27,BACKSPACE:8,SPACE:32},map:{},bound:false,press:function(V){var U=V.keyCode||V.which;
if(U in M.map&&typeof M.map[U]==="function"){M.map[U].call(S,V)
}},attach:function(W){var V,U;
for(V in W){if(W.hasOwnProperty(V)){U=V.toUpperCase();
if(U in M.keys){M.map[M.keys[U]]=W[V]
}else{M.map[U]=W[V]
}}}if(!M.bound){M.bound=true;
o.bind("keydown",M.press)
}},detach:function(){M.bound=false;
M.map={};
o.unbind("keydown",M.press)
}};
var Q=this._controls={0:d,1:d,active:0,swap:function(){Q.active=Q.active?0:1
},getActive:function(){return Q[Q.active]
},getNext:function(){return Q[1-Q.active]
}};
var R=this._carousel={next:S.$("thumb-nav-right"),prev:S.$("thumb-nav-left"),width:0,current:0,max:0,hooks:[],update:function(){var V=0,W=0,U=[0];
h.each(S._thumbnails,function(Y,X){if(X.ready){V+=X.outerWidth||h(X.container).outerWidth(true);
U[Y+1]=V;
W=Math.max(W,X.outerHeight||h(X.container).outerHeight(true))
}});
S.$("thumbnails").css({width:V,height:W});
R.max=V;
R.hooks=U;
R.width=S.$("thumbnails-list").width();
R.setClasses();
S.$("thumbnails-container").toggleClass("galleria-carousel",V>R.width);
R.width=S.$("thumbnails-list").width()
},bindControls:function(){var U;
R.next.bind("click",function(V){V.preventDefault();
if(S._options.carouselSteps==="auto"){for(U=R.current;
U<R.hooks.length;
U++){if(R.hooks[U]-R.hooks[R.current]>R.width){R.set(U-2);
break
}}}else{R.set(R.current+S._options.carouselSteps)
}});
R.prev.bind("click",function(V){V.preventDefault();
if(S._options.carouselSteps==="auto"){for(U=R.current;
U>=0;
U--){if(R.hooks[R.current]-R.hooks[U]>R.width){R.set(U+2);
break
}else{if(U===0){R.set(0);
break
}}}}else{R.set(R.current-S._options.carouselSteps)
}})
},set:function(U){U=Math.max(U,0);
while(R.hooks[U-1]+R.width>=R.max&&U>=0){U--
}R.current=U;
R.animate()
},getLast:function(U){return(U||R.current)-1
},follow:function(U){if(U===0||U===R.hooks.length-2){R.set(U);
return
}var V=R.current;
while(R.hooks[V]-R.hooks[R.current]<R.width&&V<=R.hooks.length){V++
}if(U-1<R.current){R.set(U-1)
}else{if(U+2>V){R.set(U-V+R.current+2)
}}},setClasses:function(){R.prev.toggleClass("disabled",!R.current);
R.next.toggleClass("disabled",R.hooks[R.current]+R.width>=R.max)
},animate:function(V){R.setClasses();
var U=R.hooks[R.current]*-1;
if(isNaN(U)){return
}e.animate(S.get("thumbnails"),{left:U},{duration:S._options.carouselSpeed,easing:S._options.easing,queue:false})
}};
var T=this._tooltip={initialized:false,open:false,timer:"tooltip"+S._id,swapTimer:"swap"+S._id,init:function(){T.initialized=true;
var U=".galleria-tooltip{padding:3px 8px;max-width:50%;background:#ffe;color:#000;z-index:3;position:absolute;font-size:11px;line-height:1.3;opacity:0;box-shadow:0 0 2px rgba(0,0,0,.4);}";
e.insertStyleTag(U,"galleria-tooltip");
S.$("tooltip").css({opacity:0.8,visibility:"visible",display:"none"})
},move:function(ab){var aa=S.getMousePosition(ab).x,Z=S.getMousePosition(ab).y,X=S.$("tooltip"),ad=aa,ac=Z,ae=X.outerHeight(true)+1,W=X.outerWidth(true),Y=ae+15;
var V=S.$("container").width()-W-2,U=S.$("container").height()-ae-2;
if(!isNaN(ad)&&!isNaN(ac)){ad+=10;
ac-=(ae+8);
ad=Math.max(0,Math.min(V,ad));
ac=Math.max(0,Math.min(U,ac));
if(Z<Y){ac=Y
}X.css({left:ad,top:ac})
}},bind:function(V,W){if(Galleria.TOUCH){return
}if(!T.initialized){T.init()
}var X=function(){S.$("container").unbind("mousemove",T.move);
S.clearTimer(T.timer);
S.$("tooltip").stop().animate({opacity:0},200,function(){S.$("tooltip").hide();
S.addTimer(T.swapTimer,function(){T.open=false
},1000)
})
};
var U=function(Y,Z){T.define(Y,Z);
h(Y).hover(function(){S.clearTimer(T.swapTimer);
S.$("container").unbind("mousemove",T.move).bind("mousemove",T.move).trigger("mousemove");
T.show(Y);
S.addTimer(T.timer,function(){S.$("tooltip").stop().show().animate({opacity:1});
T.open=true
},T.open?0:500)
},X).click(X)
};
if(typeof W==="string"){U((V in S._dom?S.get(V):V),W)
}else{h.each(V,function(Y,Z){U(S.get(Y),Z)
})
}},show:function(U){U=h(U in S._dom?S.get(U):U);
var W=U.data("tt"),V=function(X){p.setTimeout((function(Y){return function(){T.move(Y)
}
}(X)),10);
U.unbind("mouseup",V)
};
W=typeof W==="function"?W():W;
if(!W){return
}S.$("tooltip").html(W.replace(/\s/,"&#160;"));
U.bind("mouseup",V)
},define:function(V,W){if(typeof W!=="function"){var U=W;
W=function(){return U
}
}V=h(V in S._dom?S.get(V):V).data("tt",W);
T.show(V)
}};
var P=this._fullscreen={scrolled:0,crop:d,active:false,keymap:S._keyboard.map,parseCallback:function(V,U){return l.active?function(){if(typeof V=="function"){V.call(S)
}var X=S._controls.getActive(),W=S._controls.getNext();
S._scaleImage(W);
S._scaleImage(X);
if(U&&S._options.trueFullscreen){h(X.container).add(W.container).trigger("transitionend")
}}:V
},enter:function(U){U=P.parseCallback(U,true);
if(S._options.trueFullscreen&&E.support){P.active=true;
e.forceStyles(S.get("container"),{width:"100%",height:"100%"});
S.rescale();
if(Galleria.MAC){if(Galleria.WEBKIT&&!(Galleria.SAFARI&&/version\/[1-5]/.test(v))){S.$("container").css("opacity",0).addClass("fullscreen");
p.setTimeout(function(){P.scale();
S.$("container").css("opacity",1)
},50)
}else{S.$("stage").css("opacity",0);
p.setTimeout(function(){P.scale();
S.$("stage").css("opacity",1)
},4)
}}else{S.$("container").addClass("fullscreen")
}C.resize(P.scale);
E.enter(S,U,S.get("container"))
}else{P.scrolled=C.scrollTop();
p.scrollTo(0,0);
P._enter(U)
}},_enter:function(ab){P.active=true;
if(H){P.iframe=(function(){var ae,ad=J.referrer,ag=J.createElement("a"),af=p.location;
ag.href=ad;
if(ag.protocol!=af.protocol||ag.hostname!=af.hostname||ag.port!=af.port){Galleria.raise("Parent fullscreen not available. Iframe protocol, domains and ports must match.");
return false
}P.pd=p.parent.document;
h(P.pd).find("iframe").each(function(){var ah=this.contentDocument||this.contentWindow.document;
if(ah===J){ae=this;
return false
}});
return ae
}())
}e.hide(S.getActiveImage());
if(H&&P.iframe){P.iframe.scrolled=h(p.parent).scrollTop();
p.parent.scrollTo(0,0)
}var X=S.getData(),ac=S._options,Z=!S._options.trueFullscreen||!E.support,aa={height:"100%",overflow:"hidden",margin:0,padding:0};
if(Z){S.$("container").addClass("fullscreen");
e.forceStyles(S.get("container"),{position:"fixed",top:0,left:0,width:"100%",height:"100%",zIndex:10000});
e.forceStyles(I().html,aa);
e.forceStyles(I().body,aa)
}if(H&&P.iframe){e.forceStyles(P.pd.documentElement,aa);
e.forceStyles(P.pd.body,aa);
e.forceStyles(P.iframe,h.extend(aa,{width:"100%",height:"100%",top:0,left:0,position:"fixed",zIndex:10000,border:"none"}))
}P.keymap=h.extend({},S._keyboard.map);
S.attachKeyboard({escape:S.exitFullscreen,right:S.next,left:S.prev});
P.crop=ac.imageCrop;
if(ac.fullscreenCrop!=d){ac.imageCrop=ac.fullscreenCrop
}if(X&&X.big&&X.image!==X.big){var W=new Galleria.Picture(),V=W.isCached(X.big),Y=S.getIndex(),U=S._thumbnails[Y];
S.trigger({type:Galleria.LOADSTART,cached:V,rewind:false,index:Y,imageTarget:S.getActiveImage(),thumbTarget:U,galleriaData:X});
W.load(X.big,function(ad){S._scaleImage(ad,{complete:function(ae){S.trigger({type:Galleria.LOADFINISH,cached:V,index:Y,rewind:false,imageTarget:ae.image,thumbTarget:U});
var af=S._controls.getActive().image;
if(af){h(af).width(ae.image.width).height(ae.image.height).attr("style",h(ae.image).attr("style")).attr("src",ae.image.src)
}}})
})
}S.rescale(function(){S.addTimer(false,function(){if(Z){e.show(S.getActiveImage())
}if(typeof ab==="function"){ab.call(S)
}},100);
S.trigger(Galleria.FULLSCREEN_ENTER)
});
if(!Z){e.show(S.getActiveImage())
}else{C.resize(P.scale)
}},scale:function(){S.rescale()
},exit:function(U){U=P.parseCallback(U);
if(S._options.trueFullscreen&&E.support){E.exit(U)
}else{P._exit(U)
}},_exit:function(X){P.active=false;
var V=!S._options.trueFullscreen||!E.support;
S.$("container").removeClass("fullscreen");
if(V){e.hide(S.getActiveImage());
e.revertStyles(S.get("container"),I().html,I().body);
p.scrollTo(0,P.scrolled)
}if(H&&P.iframe){e.revertStyles(P.pd.documentElement,P.pd.body,P.iframe);
if(P.iframe.scrolled){p.parent.scrollTo(0,P.iframe.scrolled)
}}S.detachKeyboard();
S.attachKeyboard(P.keymap);
S._options.imageCrop=P.crop;
var U=S.getData().big,W=S._controls.getActive().image;
if(!S.getData().iframe&&W&&U&&U==W.src){p.setTimeout(function(Y){return function(){W.src=Y
}
}(S.getData().image),1)
}S.rescale(function(){S.addTimer(false,function(){if(V){e.show(S.getActiveImage())
}if(typeof X==="function"){X.call(S)
}C.trigger("resize")
},50);
S.trigger(Galleria.FULLSCREEN_EXIT)
});
C.unbind("resize",P.scale)
}};
var L=this._idle={trunk:[],bound:false,active:false,add:function(X,Z,Y,U){if(!X){return
}if(!L.bound){L.addEvent()
}X=h(X);
if(typeof Y=="boolean"){U=Y;
Y={}
}Y=Y||{};
var W={},V;
for(V in Z){if(Z.hasOwnProperty(V)){W[V]=X.css(V)
}}X.data("idle",{from:h.extend(W,Y),to:Z,complete:true,busy:false});
if(!U){L.addTimer()
}else{X.css(Z)
}L.trunk.push(X)
},remove:function(U){U=h(U);
h.each(L.trunk,function(V,W){if(W&&W.length&&!W.not(U).length){U.css(U.data("idle").from);
L.trunk.splice(V,1)
}});
if(!L.trunk.length){L.removeEvent();
S.clearTimer(L.timer)
}},addEvent:function(){L.bound=true;
S.$("container").bind("mousemove click",L.showAll);
if(S._options.idleMode=="hover"){S.$("container").bind("mouseleave",L.hide)
}},removeEvent:function(){L.bound=false;
S.$("container").bind("mousemove click",L.showAll);
if(S._options.idleMode=="hover"){S.$("container").unbind("mouseleave",L.hide)
}},addTimer:function(){if(S._options.idleMode=="hover"){return
}S.addTimer("idle",function(){L.hide()
},S._options.idleTime)
},hide:function(){if(!S._options.idleMode||S.getIndex()===false||S.getData().iframe){return
}S.trigger(Galleria.IDLE_ENTER);
var U=L.trunk.length;
h.each(L.trunk,function(V,W){var X=W.data("idle");
if(!X){return
}W.data("idle").complete=false;
e.animate(W,X.to,{duration:S._options.idleSpeed,complete:function(){if(V==U-1){L.active=false
}}})
})
},showAll:function(){S.clearTimer("idle");
h.each(L.trunk,function(U,V){L.show(V)
})
},show:function(U){var V=U.data("idle");
if(!L.active||(!V.busy&&!V.complete)){V.busy=true;
S.trigger(Galleria.IDLE_EXIT);
S.clearTimer("idle");
e.animate(U,V.from,{duration:S._options.idleSpeed/2,complete:function(){L.active=true;
h(U).data("idle").busy=false;
h(U).data("idle").complete=true
}})
}L.addTimer()
}};
var K=this._lightbox={width:0,height:0,initialized:false,active:null,image:null,elems:{},keymap:false,init:function(){S.trigger(Galleria.LIGHTBOX_OPEN);
if(K.initialized){return
}K.initialized=true;
var U="overlay box content shadow title info close prevholder prev nextholder next counter image",V={},W=S._options,Z="",ac="position:absolute;",Y="lightbox-",X={overlay:"position:fixed;display:none;opacity:"+W.overlayOpacity+";filter:alpha(opacity="+(W.overlayOpacity*100)+");top:0;left:0;width:100%;height:100%;background:"+W.overlayBackground+";z-index:99990",box:"position:fixed;display:none;width:400px;height:400px;top:50%;left:50%;margin-top:-200px;margin-left:-200px;z-index:99991",shadow:ac+"background:#000;width:100%;height:100%;",content:ac+"background-color:#fff;top:10px;left:10px;right:10px;bottom:10px;overflow:hidden",info:ac+"bottom:10px;left:10px;right:10px;color:#444;font:11px/13px arial,sans-serif;height:13px",close:ac+"top:10px;right:10px;height:20px;width:20px;background:#fff;text-align:center;cursor:pointer;color:#444;font:16px/22px arial,sans-serif;z-index:99999",image:ac+"top:10px;left:10px;right:10px;bottom:30px;overflow:hidden;display:block;",prevholder:ac+"width:50%;top:0;bottom:40px;cursor:pointer;",nextholder:ac+"width:50%;top:0;bottom:40px;right:-1px;cursor:pointer;",prev:ac+"top:50%;margin-top:-20px;height:40px;width:30px;background:#fff;left:20px;display:none;text-align:center;color:#000;font:bold 16px/36px arial,sans-serif",next:ac+"top:50%;margin-top:-20px;height:40px;width:30px;background:#fff;right:20px;left:auto;display:none;font:bold 16px/36px arial,sans-serif;text-align:center;color:#000",title:"float:left",counter:"float:right;margin-left:8px;"},aa=function(ad){return ad.hover(function(){h(this).css("color","#bbb")
},function(){h(this).css("color","#444")
})
},ab={};
if(q&&q>7){X.nextholder+="background:#000;filter:alpha(opacity=0);";
X.prevholder+="background:#000;filter:alpha(opacity=0);"
}h.each(X,function(ad,ae){Z+=".galleria-"+Y+ad+"{"+ae+"}"
});
Z+=".galleria-"+Y+"box.iframe .galleria-"+Y+"prevholder,.galleria-"+Y+"box.iframe .galleria-"+Y+"nextholder{width:100px;height:100px;top:50%;margin-top:-70px}";
e.insertStyleTag(Z,"galleria-lightbox");
h.each(U.split(" "),function(ad,ae){S.addElement("lightbox-"+ae);
V[ae]=K.elems[ae]=S.get("lightbox-"+ae)
});
K.image=new Galleria.Picture();
h.each({box:"shadow content close prevholder nextholder",info:"title counter",content:"info image",prevholder:"prev",nextholder:"next"},function(ae,af){var ad=[];
h.each(af.split(" "),function(ag,ah){ad.push(Y+ah)
});
ab[Y+ae]=ad
});
S.append(ab);
h(V.image).append(K.image.container);
h(I().body).append(V.overlay,V.box);
e.optimizeTouch(V.box);
aa(h(V.close).bind("click",K.hide).html("&#215;"));
h.each(["Prev","Next"],function(ag,ae){var af=h(V[ae.toLowerCase()]).html(/v/.test(ae)?"&#8249;&#160;":"&#160;&#8250;"),ad=h(V[ae.toLowerCase()+"holder"]);
ad.bind("click",function(){K["show"+ae]()
});
if(q<8||Galleria.TOUCH){af.show();
return
}ad.hover(function(){af.show()
},function(ah){af.stop().fadeOut(200)
})
});
h(V.overlay).bind("click",K.hide);
if(Galleria.IPAD){S._options.lightboxTransitionSpeed=0
}},rescale:function(Y){var X=Math.min(C.width()-40,K.width),U=Math.min(C.height()-60,K.height),W=Math.min(X/K.width,U/K.height),V=Math.round(K.width*W)+40,aa=Math.round(K.height*W)+60,Z={width:V,height:aa,"margin-top":Math.ceil(aa/2)*-1,"margin-left":Math.ceil(V/2)*-1};
if(Y){h(K.elems.box).css(Z)
}else{h(K.elems.box).animate(Z,{duration:S._options.lightboxTransitionSpeed,easing:S._options.easing,complete:function(){var ac=K.image,ab=S._options.lightboxFadeSpeed;
S.trigger({type:Galleria.LIGHTBOX_IMAGE,imageTarget:ac.image});
h(ac.container).show();
h(ac.image).animate({opacity:1},ab);
e.show(K.elems.info,ab)
}})
}},hide:function(){K.image.image=null;
C.unbind("resize",K.rescale);
h(K.elems.box).hide();
e.hide(K.elems.info);
S.detachKeyboard();
S.attachKeyboard(K.keymap);
K.keymap=false;
e.hide(K.elems.overlay,200,function(){h(this).hide().css("opacity",S._options.overlayOpacity);
S.trigger(Galleria.LIGHTBOX_CLOSE)
})
},showNext:function(){K.show(S.getNext(K.active))
},showPrev:function(){K.show(S.getPrev(K.active))
},show:function(U){K.active=U=typeof U==="number"?U:S.getIndex()||0;
if(!K.initialized){K.init()
}if(!K.keymap){K.keymap=h.extend({},S._keyboard.map);
S.attachKeyboard({escape:K.hide,right:K.showNext,left:K.showPrev})
}C.unbind("resize",K.rescale);
var Y=S.getData(U),W=S.getDataLength(),ab=S.getNext(U),X,aa,V;
e.hide(K.elems.info);
try{for(V=S._options.preload;
V>0;
V--){aa=new Galleria.Picture();
X=S.getData(ab);
aa.preload("big" in X?X.big:X.image);
ab=S.getNext(ab)
}}catch(Z){}K.image.isIframe=!!Y.iframe;
h(K.elems.box).toggleClass("iframe",!!Y.iframe);
K.image.load(Y.iframe||Y.big||Y.image,function(af){if(af.isIframe){var ac=h(p).width(),ad=h(p).height();
if(S._options.maxVideoSize){var ae=Math.min(S._options.maxVideoSize/ac,S._options.maxVideoSize/ad);
if(ae<1){ac*=ae;
ad*=ae
}}K.width=ac;
K.height=ad
}else{K.width=af.original.width;
K.height=af.original.height
}h(af.image).css({width:af.isIframe?"100%":"100.1%",height:af.isIframe?"100%":"100.1%",top:0,zIndex:99998,opacity:0,visibility:"visible"});
K.elems.title.innerHTML=Y.title||"";
K.elems.counter.innerHTML=(U+1)+S._options.counterSeperator+W;
C.resize(K.rescale);
K.rescale()
});
h(K.elems.overlay).show().css("visibility","visible");
h(K.elems.box).show()
}};
var F=this._timer={trunk:{},add:function(Y,X,W,V){Y=Y||new Date().getTime();
V=V||false;
this.clear(Y);
if(V){var U=X;
X=function(){U();
F.add(Y,X,W)
}
}this.trunk[Y]=p.setTimeout(X,W)
},clear:function(W){var U=function(X){p.clearTimeout(this.trunk[X]);
delete this.trunk[X]
},V;
if(!!W&&W in this.trunk){U.call(this,W)
}else{if(typeof W==="undefined"){for(V in this.trunk){if(this.trunk.hasOwnProperty(V)){U.call(this,V)
}}}}}};
return this
};
Galleria.prototype={constructor:Galleria,init:function(L,K){var F=this;
K=B(K);
this._original={target:L,options:K,data:null};
this._target=this._dom.target=L.nodeName?L:h(L).get(0);
this._original.html=this._target.innerHTML;
A.push(this);
if(!this._target){Galleria.raise("Target not found",true);
return
}this._options={autoplay:false,carousel:true,carouselFollow:true,carouselSpeed:400,carouselSteps:"auto",counterSeperator:"/",clicknext:false,dailymotion:{foreground:"%23EEEEEE",highlight:"%235BCEC5",background:"%23222222",logo:0,hideInfos:1},dataConfig:function(M){return{}
},dataSelector:"img:not(.js-galleryPromotional--image)",dataSort:false,dataSource:this._target,debug:d,dummy:d,easing:"galleria",extend:function(M){},fullscreenCrop:d,fullscreenDoubleTap:true,fullscreenTransition:d,height:0,idleMode:true,idleTime:3000,idleSpeed:200,imageCrop:false,imageMargin:0,imagePan:false,imagePanSmoothness:12,imagePosition:"50%",imageTimeout:d,initialTransition:d,keepSource:false,layerFollow:true,lightbox:false,lightboxFadeSpeed:200,lightboxTransitionSpeed:200,linkSourceImages:true,maxScaleRatio:d,maxVideoSize:d,minScaleRatio:d,overlayOpacity:0.85,overlayBackground:"#0b0b0b",pauseOnInteraction:true,popupLinks:false,preload:2,queue:true,responsive:true,show:0,showInfo:true,showCounter:true,showImagenav:true,swipe:true,thumbCrop:true,thumbEventType:"click",thumbFit:true,thumbMargin:0,thumbQuality:"auto",thumbDisplayOrder:true,thumbnails:true,touchTransition:d,transition:"fade",transitionInitial:d,transitionSpeed:400,trueFullscreen:true,useCanvas:false,vimeo:{title:0,byline:0,portrait:0,color:"aaaaaa"},wait:5000,width:"auto",youtube:{modestbranding:1,autohide:1,color:"white",hd:1,rel:0,showinfo:0}};
this._options.initialTransition=this._options.initialTransition||this._options.transitionInitial;
if(K&&K.debug===false){f=false
}if(K&&typeof K.imageTimeout==="number"){b=K.imageTimeout
}if(K&&typeof K.dummy==="string"){y=K.dummy
}h(this._target).children().hide();
if(Galleria.QUIRK){Galleria.raise("Your page is in Quirks mode, Galleria may not render correctly. Please validate your HTML and add a correct doctype.")
}if(typeof Galleria.theme==="object"){this._init()
}else{g.push(this)
}return this
},_init:function(){var K=this,L=this._options;
if(this._initialized){Galleria.raise("Init failed: Gallery instance already initialized.");
return this
}this._initialized=true;
if(!Galleria.theme){Galleria.raise("Init failed: No theme found.",true);
return this
}h.extend(true,L,Galleria.theme.defaults,this._original.options,Galleria.configure.options);
(function(N){if(!("getContext" in N)){N=null;
return
}z=z||{elem:N,context:N.getContext("2d"),cache:{},length:0}
}(J.createElement("canvas")));
this.bind(Galleria.DATA,function(){this._original.data=this._data;
this.get("total").innerHTML=this.getDataLength();
var P=this.$("container");
if(K._options.height<2){K._userRatio=K._ratio=K._options.height
}var O={width:0,height:0};
var N=function(){return K.$("stage").height()
};
e.wait({until:function(){O=K._getWH();
P.width(O.width).height(O.height);
return N()&&O.width&&O.height>50
},success:function(){K._width=O.width;
K._height=O.height;
K._ratio=K._ratio||O.height/O.width;
if(Galleria.WEBKIT){p.setTimeout(function(){K._run()
},1)
}else{K._run()
}},error:function(){if(N()){Galleria.raise("Could not extract sufficient width/height of the gallery container. Traced measures: width:"+O.width+"px, height: "+O.height+"px.",true)
}else{Galleria.raise("Could not extract a stage height from the CSS. Traced height: "+N()+"px.",true)
}},timeout:typeof this._options.wait=="number"?this._options.wait:false})
});
this.append({"info-text":["info-title","info-description"],info:["info-text"],"image-nav":["image-nav-right","image-nav-left"],stage:["images","loader","counter","image-nav"],"thumbnails-list":["thumbnails"],"thumbnails-container":["thumb-nav-left","thumbnails-list","thumb-nav-right"],container:["stage","thumbnails-container","info","tooltip"]});
e.hide(this.$("counter").append(this.get("current"),J.createTextNode(" "+this._options.counterSeperator+" "),this.get("total")));
this.setCounter("&#8211;");
e.hide(K.get("tooltip"));
this.$("container").addClass(Galleria.TOUCH?"touch":"notouch");
h.each(new Array(2),function(N){var O=new Galleria.Picture();
h(O.container).css({position:"absolute",top:0,left:0}).prepend(K._layers[N]=h(e.create("galleria-layer")).css({position:"absolute",top:0,left:0,right:0,bottom:0,zIndex:2})[0]);
K.$("images").append(O.container);
K._controls[N]=O
});
this.$("images").css({position:"relative",top:0,left:0,width:"100%",height:"100%"});
this.$("thumbnails, thumbnails-list").css({overflow:"hidden",position:"relative"});
this.$("image-nav-right, image-nav-left").bind("click",function(O){if(L.clicknext){O.stopPropagation()
}if(L.pauseOnInteraction){K.pause()
}var N=/right/.test(this.className)?"next":"prev";
K[N]()
});
h.each(["info","counter","image-nav"],function(N,O){if(L["show"+O.substr(0,1).toUpperCase()+O.substr(1).replace(/-/,"")]===false){e.moveOut(K.get(O.toLowerCase()))
}});
this.load();
if(!L.keepSource&&!q){this._target.innerHTML=""
}if(this.get("errors")){this.appendChild("target","errors")
}this.appendChild("target","container");
if(L.carousel){var M=0,F=L.show;
this.bind(Galleria.THUMBNAIL,function(){this.updateCarousel();
if(++M==this.getDataLength()&&typeof F=="number"&&F>0){this._carousel.follow(F)
}})
}if(L.responsive){C.bind("resize",function(){if(!K.isFullscreen()){K.resize()
}})
}if(L.swipe){(function(W){var V=[0,0],Y=[0,0],P=30,O=100,U=false,Q=0,S,X={start:"touchstart",move:"touchmove",stop:"touchend"},R=function(Z){return Z.originalEvent.touches?Z.originalEvent.touches[0]:Z
},T=function(Z){if(Z.originalEvent.touches&&Z.originalEvent.touches.length>1){return
}S=R(Z);
Y=[S.pageX,S.pageY];
if(!V[0]){V=Y
}if(Math.abs(V[0]-Y[0])>10){Z.preventDefault()
}},N=function(Z){W.unbind(X.move,T);
if((Z.originalEvent.touches&&Z.originalEvent.touches.length)||U){U=!U;
return
}if(e.timestamp()-Q<1000&&Math.abs(V[0]-Y[0])>P&&Math.abs(V[1]-Y[1])<O){Z.preventDefault();
K[V[0]>Y[0]?"next":"prev"]()
}V=Y=[0,0]
};
W.bind(X.start,function(Z){if(Z.originalEvent.touches&&Z.originalEvent.touches.length>1){return
}S=R(Z);
Q=e.timestamp();
V=Y=[S.pageX,S.pageY];
W.bind(X.move,T).one(X.stop,N)
})
}(K.$("images")));
if(L.fullscreenDoubleTap){this.$("stage").bind("touchstart",(function(){var R,O,T,S,Q,P,N=function(U){return U.originalEvent.touches?U.originalEvent.touches[0]:U
};
return function(U){P=Galleria.utils.timestamp();
O=N(U).pageX;
T=N(U).pageY;
if((P-R<500)&&(O-S<20)&&(T-Q<20)){K.toggleFullscreen();
U.preventDefault();
K.$("stage").unbind("touchend",arguments.callee);
return
}R=P;
S=O;
Q=T
}
}()))
}}e.optimizeTouch(this.get("container"));
h.each(Galleria.on.binds,function(N,O){if(h.inArray(O.hash,K._binds)==-1){K.bind(O.type,O.callback)
}});
return this
},addTimer:function(){this._timer.add.apply(this._timer,e.array(arguments));
return this
},clearTimer:function(){this._timer.clear.apply(this._timer,e.array(arguments));
return this
},_getWH:function(){var N=this.$("container"),K=this.$("target"),L=this,M={},F;
h.each(["width","height"],function(P,O){if(L._options[O]&&typeof L._options[O]==="number"){M[O]=L._options[O]
}else{F=[e.parseValue(N.css(O)),e.parseValue(K.css(O)),N[O](),K[O]()];
if(!L["_"+O]){F.splice(F.length,e.parseValue(N.css("min-"+O)),e.parseValue(K.css("min-"+O)))
}M[O]=Math.max.apply(Math,F)
}});
if(L._userRatio){M.height=M.width*L._userRatio
}return M
},_createThumbnails:function(P){this.get("total").innerHTML=this.getDataLength();
var O,aa,ab,L,X,U=this,V=this._options,Y=P?this._data.length-P.length:0,R=Y,Z=[],W=0,T=q<8?"http://upload.wikimedia.org/wikipedia/commons/c/c0/Blank.gif":"data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw%3D%3D",N=(function(){var ad=U.$("thumbnails").find(".active");
if(!ad.length){return false
}return ad.find("img").attr("src")
}()),ac=typeof V.thumbnails==="string"?V.thumbnails.toLowerCase():null,M=function(ad){return J.defaultView&&J.defaultView.getComputedStyle?J.defaultView.getComputedStyle(aa.container,null)[ad]:X.css(ad)
},F=function(af,ae,ad){return function(){h(ad).append(af);
U.trigger({type:Galleria.THUMBNAIL,thumbTarget:af,index:ae,galleriaData:U.getData(ae)})
}
},Q=function(ae){if(V.pauseOnInteraction){U.pause()
}var ad=h(ae.currentTarget).data("index");
if(U.getIndex()!==ad){U.show(ad)
}ae.preventDefault()
},K=function(ad,ae){h(ad.container).css("visibility","visible");
U.trigger({type:Galleria.THUMBNAIL,thumbTarget:ad.image,index:ad.data.order,galleriaData:U.getData(ad.data.order)});
if(typeof ae=="function"){ae.call(U,ad)
}},S=function(ad,ae){ad.scale({width:ad.data.width,height:ad.data.height,crop:V.thumbCrop,margin:V.thumbMargin,canvas:V.useCanvas,complete:function(ah){var al=["left","top"],ag=["Width","Height"],af,aj,ak=U.getData(ah.index),ai=ak.thumb.split(":");
h.each(ag,function(am,an){af=an.toLowerCase();
if((V.thumbCrop!==true||V.thumbCrop===af)&&V.thumbFit){aj={};
aj[af]=ah[af];
h(ah.container).css(aj);
aj={};
aj[al[am]]=0;
h(ah.image).css(aj)
}ah["outer"+an]=h(ah.container)["outer"+an](true)
});
e.toggleQuality(ah.image,V.thumbQuality===true||(V.thumbQuality==="auto"&&ah.original.width<ah.width*3));
if(ak.iframe&&ai.length==2&&ai[0] in n){n[ai[0]].getThumb(ai[1],(function(am){return function(an){am.src=an;
K(ah,ae)
}
}(ah.image)))
}else{if(V.thumbDisplayOrder&&!ah.lazy){h.each(Z,function(am,an){if(am===W&&an.ready&&!an.displayed){W++;
an.displayed=true;
K(an,ae);
return
}})
}else{K(ah,ae)
}}}})
};
if(!P){this._thumbnails=[];
this.$("thumbnails").empty()
}for(;
this._data[Y];
Y++){ab=this._data[Y];
O=ab.thumb||ab.image;
if((V.thumbnails===true||ac=="lazy")&&(ab.thumb||ab.image)){aa=new Galleria.Picture(Y);
aa.index=Y;
aa.displayed=false;
aa.lazy=false;
aa.video=false;
this.$("thumbnails").append(aa.container);
X=h(aa.container);
X.css("visibility","hidden");
aa.data={width:e.parseValue(M("width")),height:e.parseValue(M("height")),order:Y,src:O};
if(V.thumbFit&&V.thumbCrop!==true){X.css({width:"auto",height:"auto"})
}else{X.css({width:aa.data.width,height:aa.data.height})
}L=O.split(":");
if(L.length==2&&L[0] in n){aa.video=true;
aa.ready=true;
aa.load(T,{height:aa.data.height,width:aa.data.height*1.25},S)
}else{if(ac=="lazy"){X.addClass("lazy");
aa.lazy=true;
aa.load(T,{height:aa.data.height,width:aa.data.width})
}else{aa.load(O,S)
}}if(V.preload==="all"){aa.preload(ab.image)
}}else{if(ab.iframe||ac==="empty"||ac==="numbers"){aa={container:e.create("galleria-image"),image:e.create("img","span"),ready:true};
if(ac==="numbers"){h(aa.image).text(Y+1)
}if(ab.iframe){h(aa.image).addClass("iframe")
}this.$("thumbnails").append(aa.container);
p.setTimeout((F)(aa.image,Y,aa.container),50+(Y*20))
}else{aa={container:null,image:null}
}}h(aa.container).add(V.keepSource&&V.linkSourceImages?ab.original:null).data("index",Y).bind(V.thumbEventType,Q).data("thumbload",S);
if(N===O){h(aa.container).addClass("active")
}this._thumbnails.push(aa)
}Z=this._thumbnails.slice(R);
return this
},lazyLoad:function(N,K){var F=N.constructor==Array?N:[N],L=this,O=this.$("thumbnails").children().filter(function(){return h(this).data("lazy-src")
}),M=0;
h.each(F,function(R,U){if(U>L._thumbnails.length-1){return
}var P=L._thumbnails[U],T=P.data,Q=T.src.split(":"),V=function(){if(++M==F.length&&typeof K=="function"){K.call(L)
}},S=h(P.container).data("thumbload");
if(P.video){S.call(L,P,V)
}else{P.load(T.src,function(W){S.call(L,W,V)
})
}});
return this
},lazyLoadChunks:function(R,L){var N=this.getDataLength(),K=0,F=0,M=[],O=[],Q=this;
L=L||0;
for(;
K<N;
K++){O.push(K);
if(++F==R||K==N-1){M.push(O);
F=0;
O=[]
}}var P=function(T){var S=M.shift();
if(S){p.setTimeout(function(){Q.lazyLoad(S,function(){P(true)
})
},(L&&T)?L:0)
}};
P(false);
return this
},_run:function(){var F=this;
F._createThumbnails();
e.wait({timeout:10000,until:function(){if(Galleria.OPERA){F.$("stage").css("display","inline-block")
}F._stageWidth=F.$("stage").width();
F._stageHeight=F.$("stage").height();
return(F._stageWidth&&F._stageHeight>50)
},success:function(){s.push(F);
e.show(F.get("counter"));
if(F._options.carousel){F._carousel.bindControls()
}if(F._options.autoplay){F.pause();
if(typeof F._options.autoplay==="number"){F._playtime=F._options.autoplay
}F._playing=true
}if(F._firstrun){if(F._options.autoplay){F.trigger(Galleria.PLAY)
}if(typeof F._options.show==="number"){F.show(F._options.show)
}return
}F._firstrun=true;
if(Galleria.History){Galleria.History.change(function(K){if(isNaN(K)){p.history.go(-1)
}else{F.show(K,d,true)
}})
}F.trigger(Galleria.READY);
Galleria.theme.init.call(F,F._options);
h.each(Galleria.ready.callbacks,function(K,L){if(typeof L=="function"){L.call(F,F._options)
}});
F._options.extend.call(F,F._options);
if(/^[0-9]{1,4}$/.test(r)&&Galleria.History){F.show(r,d,true)
}else{if(F._data[F._options.show]){F.show(F._options.show)
}}if(F._options.autoplay){F.trigger(Galleria.PLAY)
}},error:function(){Galleria.raise("Stage width or height is too small to show the gallery. Traced measures: width:"+F._stageWidth+"px, height: "+F._stageHeight+"px.",true)
}})
},load:function(M,F,L){var K=this,N=this._options;
this._data=[];
this._thumbnails=[];
this.$("thumbnails").empty();
if(typeof F==="function"){L=F;
F=null
}M=M||N.dataSource;
F=F||N.dataSelector;
L=L||N.dataConfig;
if(/^function Object/.test(M.constructor)){M=[M]
}if(M.constructor===Array){if(this.validate(M)){this._data=M
}else{Galleria.raise("Load failed: JSON Array not valid.")
}}else{F+=",.video,.iframe";
h(M).find(F).each(function(R,T){T=h(T);
var U={},S=T.parent(),P=S.attr("href"),O=S.attr("rel");
var V;
var Q=S.find(".js-galleryPromotional--content");
if(Q.length==1){V=Q[0]
}if(P&&(T[0].nodeName=="IMG"||T.hasClass("video"))&&a(P)){U.video=P
}else{if(P&&T.hasClass("iframe")){U.iframe=P
}else{if(V){U.div=V.outerHTML
}else{U.image=U.big=P
}}}if(O){U.big=O
}h.each("big title description link layer".split(" "),function(W,X){if(T.data(X)){U[X]=T.data(X)
}});
K._data.push(h.extend({title:T.attr("title")||"",thumb:T.attr("src"),image:T.attr("src"),big:T.attr("src"),description:T.attr("alt")||"",link:T.attr("longdesc"),original:T.get(0)},U,L(T)))
})
}if(typeof N.dataSort=="function"){k.sort.call(this._data,N.dataSort)
}else{if(N.dataSort=="random"){this._data.sort(function(){return Math.round(Math.random())-0.5
})
}}if(this.getDataLength()){this._parseData().trigger(Galleria.DATA)
}return this
},_parseData:function(){var F=this,K;
h.each(this._data,function(M,N){K=F._data[M];
if("thumb" in N===false){K.thumb=N.image
}if(!"big" in N){K.big=N.image
}if("div" in N){K.div=N.div
}if("video" in N){var L=a(N.video);
if(L){K.iframe=n[L.provider].embed(L.id)+(function(){if(typeof F._options[L.provider]=="object"){var P="?",O=[];
h.each(F._options[L.provider],function(Q,R){O.push(Q+"="+R)
});
if(L.provider=="youtube"){O=["wmode=opaque"].concat(O)
}return P+O.join("&")
}return""
}());
delete K.video;
if(!("thumb" in K)||!K.thumb){K.thumb=L.provider+":"+L.id
}}}});
return this
},destroy:function(){this.$("target").data("galleria",null);
this.$("container").unbind("galleria");
this.get("target").innerHTML=this._original.html;
this.clearTimer();
e.removeFromArray(A,this);
e.removeFromArray(s,this);
return this
},splice:function(){var F=this,K=e.array(arguments);
p.setTimeout(function(){k.splice.apply(F._data,K);
F._parseData()._createThumbnails()
},2);
return F
},push:function(){var F=this,K=e.array(arguments);
if(K.length==1&&K[0].constructor==Array){K=K[0]
}p.setTimeout(function(){k.push.apply(F._data,K);
F._parseData()._createThumbnails(K)
},2);
return F
},_getActive:function(){return this._controls.getActive()
},validate:function(F){return true
},bind:function(K,F){K=c(K);
this.$("container").bind(K,this.proxy(F));
return this
},unbind:function(F){F=c(F);
this.$("container").unbind(F);
return this
},trigger:function(F){F=typeof F==="object"?h.extend(F,{scope:this}):{type:c(F),scope:this};
this.$("container").trigger(F);
return this
},addIdleState:function(L,K,M,F){this._idle.add.apply(this._idle,e.array(arguments));
return this
},removeIdleState:function(F){this._idle.remove.apply(this._idle,e.array(arguments));
return this
},enterIdleMode:function(){this._idle.hide();
return this
},exitIdleMode:function(){this._idle.showAll();
return this
},enterFullscreen:function(F){this._fullscreen.enter.apply(this,e.array(arguments));
return this
},exitFullscreen:function(F){this._fullscreen.exit.apply(this,e.array(arguments));
return this
},toggleFullscreen:function(F){this._fullscreen[this.isFullscreen()?"exit":"enter"].apply(this,e.array(arguments));
return this
},bindTooltip:function(F,K){this._tooltip.bind.apply(this._tooltip,e.array(arguments));
return this
},defineTooltip:function(F,K){this._tooltip.define.apply(this._tooltip,e.array(arguments));
return this
},refreshTooltip:function(F){this._tooltip.show.apply(this._tooltip,e.array(arguments));
return this
},openLightbox:function(){this._lightbox.show.apply(this._lightbox,e.array(arguments));
return this
},closeLightbox:function(){this._lightbox.hide.apply(this._lightbox,e.array(arguments));
return this
},getActiveImage:function(){return this._getActive().image||d
},getActiveThumb:function(){return this._thumbnails[this._active].image||d
},getMousePosition:function(F){return{x:F.pageX-this.$("container").offset().left,y:F.pageY-this.$("container").offset().top}
},addPan:function(P){if(this._options.imageCrop===false){return
}P=h(P||this.getActiveImage());
var Z=this,Y=P.width()/2,V=P.height()/2,X=parseInt(P.css("left"),10),W=parseInt(P.css("top"),10),L=X||0,K=W||0,U=0,T=0,N=false,S=e.timestamp(),F=0,M=0,R=function(ac,ab,ad){if(ac>0){M=Math.round(Math.max(ac*-1,Math.min(0,ab)));
if(F!==M){F=M;
if(q===8){P.parent()["scroll"+ad](M*-1)
}else{var aa={};
aa[ad.toLowerCase()]=M;
P.css(aa)
}}}},O=function(aa){if(e.timestamp()-S<50){return
}N=true;
Y=Z.getMousePosition(aa).x;
V=Z.getMousePosition(aa).y
},Q=function(aa){if(!N){return
}U=P.width()-Z._stageWidth;
T=P.height()-Z._stageHeight;
X=Y/Z._stageWidth*U*-1;
W=V/Z._stageHeight*T*-1;
L+=(X-L)/Z._options.imagePanSmoothness;
K+=(W-K)/Z._options.imagePanSmoothness;
R(T,K,"Top");
R(U,L,"Left")
};
if(q===8){P.parent().scrollTop(K*-1).scrollLeft(L*-1);
P.css({top:0,left:0})
}this.$("stage").unbind("mousemove",O).bind("mousemove",O);
this.addTimer("pan"+Z._id,Q,50,true);
return this
},proxy:function(K,F){if(typeof K!=="function"){return x
}F=F||this;
return function(){return K.apply(F,e.array(arguments))
}
},removePan:function(){this.$("stage").unbind("mousemove");
this.clearTimer("pan"+this._id);
return this
},addElement:function(K){var F=this._dom;
h.each(e.array(arguments),function(M,L){F[L]=e.create("galleria-"+L)
});
return this
},attachKeyboard:function(F){this._keyboard.attach.apply(this._keyboard,e.array(arguments));
return this
},detachKeyboard:function(){this._keyboard.detach.apply(this._keyboard,e.array(arguments));
return this
},appendChild:function(K,F){this.$(K).append(this.get(F)||F);
return this
},prependChild:function(K,F){this.$(K).prepend(this.get(F)||F);
return this
},remove:function(F){this.$(e.array(arguments).join(",")).remove();
return this
},append:function(L){var K,F;
for(K in L){if(L.hasOwnProperty(K)){if(L[K].constructor===Array){for(F=0;
L[K][F];
F++){this.appendChild(K,L[K][F])
}}else{this.appendChild(K,L[K])
}}}return this
},_scaleImage:function(N,L){N=N||this._controls.getActive();
if(!N){return
}var K=this,F,M=function(O){h(O.container).children(":first").css({top:O.image.style&&N.image.style.top?Math.max(0,e.parseValue(O.image.style.top)):0,left:O.image.style&&N.image.style.left?Math.max(0,e.parseValue(O.image.style.left)):0,width:e.parseValue(O.image.width),height:e.parseValue(O.image.height)})
};
L=h.extend({width:this._stageWidth,height:this._stageHeight,crop:this._options.imageCrop,max:this._options.maxScaleRatio,min:this._options.minScaleRatio,margin:this._options.imageMargin,position:this._options.imagePosition,iframelimit:this._options.maxVideoSize},L);
if(this._options.layerFollow&&this._options.imageCrop!==true){if(typeof L.complete=="function"){F=L.complete;
L.complete=function(){F.call(N,N);
M(N)
}
}else{L.complete=M
}}else{h(N.container).children(":first").css({top:0,left:0})
}N.scale(L);
return this
},updateCarousel:function(){this._carousel.update();
return this
},resize:function(L,F){if(typeof L=="function"){F=L;
L=d
}L=h.extend({width:0,height:0},L);
var K=this,M=this.$("container");
h.each(L,function(N,O){if(!O){M[N]("auto");
L[N]=K._getWH()[N]
}});
h.each(L,function(N,O){M[N](O)
});
return this.rescale(F)
},rescale:function(M,F,K){var L=this;
if(typeof M==="function"){K=M;
M=d
}var N=function(){L._stageWidth=M||L.$("stage").width();
L._stageHeight=F||L.$("stage").height();
L._scaleImage();
if(L._options.carousel){L.updateCarousel()
}L.trigger(Galleria.RESCALE);
if(typeof K==="function"){K.call(L)
}};
N.call(L);
return this
},refreshImage:function(){this._scaleImage();
if(this._options.imagePan){this.addPan()
}return this
},show:function(K,F,L){if(this._queue.length>3||K===false||(!this._options.queue&&this._queue.stalled)){return
}K=Math.max(0,Math.min(parseInt(K,10),this.getDataLength()-1));
F=typeof F!=="undefined"?!!F:K<this.getIndex();
L=L||false;
if(!L&&Galleria.History){Galleria.History.set(K.toString());
return
}this._active=K;
k.push.call(this._queue,{index:K,rewind:F});
if(!this._queue.stalled){this._show()
}return this
},_show:function(){var X=this,U=this._queue[0],S=this.getData(U.index);
if(!S){return
}var F=S.iframe||S.div||(this.isFullscreen()&&"big" in S?S.big:S.image),Q=this._controls.getActive(),T=this._controls.getNext(),O=T.isCached(F),K=this._thumbnails[U.index],P=function(){h(T.image).trigger("mouseup")
};
var M=(function(ab,aa,ac,Y,Z){return function(){var ad;
l.active=false;
e.toggleQuality(aa.image,X._options.imageQuality);
X._layers[X._controls.active].innerHTML="";
h(ac.container).css({zIndex:0,opacity:0}).show();
if(ac.isIframe){h(ac.container).find("iframe").remove()
}X.$("container").toggleClass("iframe",!!ab.iframe);
h(aa.container).css({zIndex:1,left:0,top:0}).show();
X._controls.swap();
if(X._options.imagePan){X.addPan(aa.image)
}if(ab.link||X._options.lightbox||X._options.clicknext){h(aa.image).css({cursor:"pointer"}).bind("mouseup",function(ae){if(typeof ae.which=="number"&&ae.which>1){return
}if(X._options.clicknext&&!Galleria.TOUCH){if(X._options.pauseOnInteraction){X.pause()
}X.next();
return
}if(ab.link){if(X._options.popupLinks){ad=p.open(ab.link,"_blank")
}else{p.location.href=ab.link
}return
}if(X._options.lightbox){X.openLightbox()
}})
}X._playCheck();
X.trigger({type:Galleria.IMAGE,index:Y.index,imageTarget:aa.image,thumbTarget:Z.image,galleriaData:ab});
k.shift.call(X._queue);
X._queue.stalled=false;
if(X._queue.length){X._show()
}}
}(S,T,Q,U,K));
if(this._options.carousel&&this._options.carouselFollow){this._carousel.follow(U.index)
}if(this._options.preload){var L,R,N=this.getNext(),W;
try{for(R=this._options.preload;
R>0;
R--){L=new Galleria.Picture();
W=X.getData(N);
L.preload(this.isFullscreen()&&"big" in W?W.big:W.image);
N=X.getNext(N)
}}catch(V){}}e.show(T.container);
T.isIframe=!!S.iframe;
T.isDiv=!!S.div;
h(X._thumbnails[U.index].container).addClass("active").siblings(".active").removeClass("active");
X.trigger({type:Galleria.LOADSTART,cached:O,index:U.index,rewind:U.rewind,imageTarget:T.image,thumbTarget:K.image,galleriaData:S});
X._queue.stalled=true;
T.load(F,function(Z){var Y=h(X._layers[1-X._controls.active]).html(S.layer||"").hide();
X._scaleImage(Z,{complete:function(aa){if("image" in Q){e.toggleQuality(Q.image,false)
}e.toggleQuality(aa.image,false);
X.removePan();
X.setInfo(U.index);
X.setCounter(U.index);
if(S.layer){Y.show();
if(S.link||X._options.lightbox||X._options.clicknext){Y.css("cursor","pointer").unbind("mouseup").mouseup(P)
}}var ac=X._options.transition;
h.each({initial:Q.image===null,touch:Galleria.TOUCH,fullscreen:X.isFullscreen()},function(ae,ad){if(ad&&X._options[ae+"Transition"]!==d){ac=X._options[ae+"Transition"];
return false
}});
if(ac in l.effects===false){M()
}else{var ab={prev:Q.container,next:aa.container,rewind:U.rewind,speed:X._options.transitionSpeed||400};
l.active=true;
l.init.call(X,ac,ab,M)
}X.trigger({type:Galleria.LOADFINISH,cached:O,index:U.index,rewind:U.rewind,imageTarget:aa.image,thumbTarget:X._thumbnails[U.index].image,galleriaData:X.getData(U.index)})
}})
})
},getNext:function(F){F=typeof F==="number"?F:this.getIndex();
return F===this.getDataLength()-1?0:F+1
},getPrev:function(F){F=typeof F==="number"?F:this.getIndex();
return F===0?this.getDataLength()-1:F-1
},next:function(){if(this.getDataLength()>1){this.show(this.getNext(),false)
}return this
},prev:function(){if(this.getDataLength()>1){this.show(this.getPrev(),true)
}return this
},get:function(F){return F in this._dom?this._dom[F]:null
},getData:function(F){return F in this._data?this._data[F]:this._data[this._active]
},getDataLength:function(){return this._data.length
},getIndex:function(){return typeof this._active==="number"?this._active:false
},getStageHeight:function(){return this._stageHeight
},getStageWidth:function(){return this._stageWidth
},getOptions:function(F){return typeof F==="undefined"?this._options:this._options[F]
},setOptions:function(F,K){if(typeof F==="object"){h.extend(this._options,F)
}else{this._options[F]=K
}return this
},play:function(F){this._playing=true;
this._playtime=F||this._playtime;
this._playCheck();
this.trigger(Galleria.PLAY);
return this
},pause:function(){this._playing=false;
this.trigger(Galleria.PAUSE);
return this
},playToggle:function(F){return(this._playing)?this.pause():this.play(F)
},isPlaying:function(){return this._playing
},isFullscreen:function(){return this._fullscreen.active
},_playCheck:function(){var K=this,N=0,F=20,L=e.timestamp(),O="play"+this._id;
if(this._playing){this.clearTimer(O);
var M=function(){N=e.timestamp()-L;
if(N>=K._playtime&&K._playing){K.clearTimer(O);
K.next();
return
}if(K._playing){K.trigger({type:Galleria.PROGRESS,percent:Math.ceil(N/K._playtime*100),seconds:Math.floor(N/1000),milliseconds:N});
K.addTimer(O,M,F)
}};
K.addTimer(O,M,F)
}},setPlaytime:function(F){this._playtime=F;
return this
},setIndex:function(F){this._active=F;
return this
},setCounter:function(K){if(typeof K==="number"){K++
}else{if(typeof K==="undefined"){K=this.getIndex()+1
}}this.get("current").innerHTML=K;
if(q){var L=this.$("counter"),F=L.css("opacity");
if(parseInt(F,10)===1){e.removeAlpha(L[0])
}else{this.$("counter").css("opacity",F)
}}return this
},setInfo:function(K){var F=this,L=this.getData(K);
h.each(["title","description"],function(M,N){var O=F.$("info-"+N);
if(!!L[N]){O[L[N].length?"show":"hide"]().html(L[N])
}else{O.empty().hide()
}});
return this
},hasInfo:function(K){var F="title description".split(" "),L;
for(L=0;
F[L];
L++){if(!!this.getData(K)[F[L]]){return true
}}return false
},jQuery:function(M){var F=this,K=[];
h.each(M.split(","),function(N,O){O=h.trim(O);
if(F.get(O)){K.push(O)
}});
var L=h(F.get(K.shift()));
h.each(K,function(N,O){L=L.add(F.get(O))
});
return L
},$:function(F){return this.jQuery.apply(this,e.array(arguments))
}};
h.each(w,function(F,L){var K=/_/.test(L)?L.replace(/_/g,""):L;
Galleria[L.toUpperCase()]="galleria."+K
});
h.extend(Galleria,{IE9:q===9,IE8:q===8,IE7:q===7,IE6:q===6,IE:q,WEBKIT:/webkit/.test(v),CHROME:/chrome/.test(v),SAFARI:/safari/.test(v)&&!(/chrome/.test(v)),QUIRK:(q&&J.compatMode&&J.compatMode==="BackCompat"),MAC:/mac/.test(navigator.platform.toLowerCase()),OPERA:!!p.opera,IPHONE:/iphone/.test(v),IPAD:/ipad/.test(v),ANDROID:/android/.test(v),TOUCH:("ontouchstart" in J)});
Galleria.addTheme=function(L){if(!L.name){Galleria.raise("No theme name specified")
}if(typeof L.defaults!=="object"){L.defaults={}
}else{L.defaults=B(L.defaults)
}var F=false,K;
if(typeof L.css==="string"){h("link").each(function(M,N){K=new RegExp(L.css);
if(K.test(N.href)){F=true;
m(L);
return false
}});
if(!F){h("script").each(function(N,M){K=new RegExp("galleria\\."+L.name.toLowerCase()+"\\.");
if(K.test(M.src)){F=M.src.replace(/[^\/]*$/,"")+L.css;
p.setTimeout(function(){e.loadCSS(F,"galleria-theme",function(){m(L)
})
},1)
}})
}if(!F){Galleria.raise("No theme CSS loaded")
}}else{m(L)
}return L
};
Galleria.loadTheme=function(M,K){if(h("script").filter(function(){return h(this).attr("src")==M
}).length){return
}var F=false,L;
h(p).load(function(){if(!F){L=p.setTimeout(function(){if(!F&&!Galleria.theme){Galleria.raise("Galleria had problems loading theme at "+M+". Please check theme path or load manually.",true)
}},20000)
}});
Galleria.unloadTheme();
e.loadScript(M,function(){F=true;
p.clearTimeout(L)
});
return Galleria
};
Galleria.unloadTheme=function(){if(typeof Galleria.theme=="object"){h("script").each(function(K,F){if(new RegExp("galleria\\."+Galleria.theme.name+"\\.").test(F.src)){h(F).remove()
}});
Galleria.theme=d
}return Galleria
};
Galleria.get=function(F){if(!!A[F]){return A[F]
}else{if(typeof F!=="number"){return A
}else{Galleria.raise("Gallery index "+F+" not found")
}}};
Galleria.configure=function(F,L){var K={};
if(typeof F=="string"&&L){K[F]=L;
F=K
}else{h.extend(K,F)
}Galleria.configure.options=K;
h.each(Galleria.get(),function(N,M){M.setOptions(K)
});
return Galleria
};
Galleria.configure.options={};
Galleria.on=function(F,L){if(!F){return
}L=L||x;
var K=F+L.toString().replace(/\s/g,"")+e.timestamp();
h.each(Galleria.get(),function(N,M){M._binds.push(K);
M.bind(F,L)
});
Galleria.on.binds.push({type:F,callback:L,hash:K});
return Galleria
};
Galleria.on.binds=[];
Galleria.run=function(F,K){if(h.isFunction(K)){K={extend:K}
}h(F||"#galleria").galleria(K);
return Galleria
};
Galleria.addTransition=function(F,K){l.effects[F]=K;
return Galleria
};
Galleria.utils=e;
Galleria.log=function(){var F=e.array(arguments);
if("console" in p&&"log" in p.console){try{return p.console.log.apply(p.console,F)
}catch(K){h.each(F,function(){p.console.log(this)
})
}}else{return p.alert(F.join("<br>"))
}};
Galleria.ready=function(F){if(typeof F!="function"){return Galleria
}h.each(s,function(L,K){F.call(K,K._options)
});
Galleria.ready.callbacks.push(F);
return Galleria
};
Galleria.ready.callbacks=[];
Galleria.raise=function(O,N){var M=N?"Fatal error":"Error",K=this,L={color:"#fff",position:"absolute",top:0,left:0,zIndex:100000},F=function(Q){var P='<div style="padding:4px;margin:0 0 2px;background:#'+(N?"811":"222")+';">'+(N?"<strong>"+M+": </strong>":"")+Q+"</div>";
h.each(A,function(){var R=this.$("errors"),S=this.$("target");
if(!R.length){S.css("position","relative");
R=this.addElement("errors").appendChild("target","errors").$("errors").css(L)
}R.append(P)
});
if(!A.length){h("<div>").css(h.extend(L,{position:"fixed"})).append(P).appendTo(I().body)
}};
if(f){F(O);
if(N){throw new Error(M+": "+O)
}}else{if(N){if(u){return
}u=true;
N=false;
F("Gallery could not load.")
}}};
Galleria.version=G;
Galleria.requires=function(F,K){K=K||"You need to upgrade Galleria to version "+F+" to use one or more components.";
if(Galleria.version<F){Galleria.raise(K,true)
}return Galleria
};
Galleria.Picture=function(F){this.id=F||null;
this.image=null;
this.container=e.create("galleria-image");
h(this.container).css({overflow:"hidden",position:"relative"});
this.original={width:0,height:0};
this.ready=false;
this.isIframe=false;
this.isDiv=false
};
Galleria.Picture.prototype={cache:{},show:function(){e.show(this.image)
},hide:function(){e.moveOut(this.image)
},clear:function(){this.image=null
},isCached:function(F){return !!this.cache[F]
},preload:function(F){h(new Image()).load((function(L,K){return function(){K[L]=L
}
}(F,this.cache))).attr("src",F)
},load:function(F,T,R){if(typeof T=="function"){R=T;
T=null
}if(this.isIframe){var L="if"+new Date().getTime();
this.image=h("<iframe>",{src:F,frameborder:0,id:L,allowfullscreen:true,css:{visibility:"hidden"}})[0];
h(this.container).find("iframe,img").remove();
this.container.appendChild(this.image);
h("#"+L).load((function(U,V){return function(){p.setTimeout(function(){h(U.image).css("visibility","visible");
if(typeof V=="function"){V.call(U,U)
}},10)
}
}(this,R)));
return this.container
}if(this.isDiv){var L="div"+new Date().getTime();
this.image=F;
h(this.container).find("img,iframe,.js-galleryPromotional--content").remove();
h(this.container).append(this.image);
if(typeof R=="function"){R.call(this,this)
}return this.container
}this.image=new Image();
h(this.container).find("iframe,.js-galleryPromotional--content").remove();
if(Galleria.IE8){h(this.image).css("filter","inherit")
}var O=0,K=false,P=false,S=h(this.container),M=h(this.image),Q=function(){if(!K){K=true;
p.setTimeout((function(U,V){return function(){U.attr("src",V+"?"+e.timestamp())
}
}(h(this),F)),50)
}else{if(y){h(this).attr("src",y)
}else{Galleria.raise("Image not found: "+F)
}}},N=(function(U,W,V){return function(){var X=function(){h(this).unbind("load");
U.original=T||{height:this.height,width:this.width};
U.container.appendChild(this);
U.cache[V]=V;
if(typeof W=="function"){p.setTimeout(function(){W.call(U,U)
},1)
}};
if((!this.width||!this.height)){p.setTimeout((function(Y){return function(){if(Y.width&&Y.height){X.call(Y)
}else{if(!P){h(new Image()).load(N).attr("src",Y.src);
P=true
}else{Galleria.raise("Could not extract width/height from image: "+Y.src+". Traced measures: width:"+Y.width+"px, height: "+Y.height+"px.")
}}}
}(this)),2)
}else{X.call(this)
}}
}(this,R,F));
S.find("iframe,img").remove();
M.css("display","block");
e.hide(this.image);
h.each("minWidth minHeight maxWidth maxHeight".split(" "),function(U,V){M.css(V,(/min/.test(V)?"0":"none"))
});
M.load(N).error(Q).attr("src",F);
return this.container
},scale:function(U){var T=this;
U=h.extend({width:0,height:0,min:d,max:d,margin:0,complete:x,position:"center",crop:false,canvas:false,iframelimit:d},U);
if(this.isIframe||this.isDiv){var N=U.width,K=U.height,P,M;
if(U.iframelimit){var F=Math.min(U.iframelimit/N,U.iframelimit/K);
if(F<1){P=N*F;
M=K*F;
h(this.image).css({top:K/2-M/2,left:N/2-P/2,position:"absolute"})
}else{h(this.image).css({top:0,left:0})
}}h(this.image).width(P||N).height(M||K).removeAttr("width").removeAttr("height");
h(this.container).width(N).height(K);
U.complete.call(T,T);
try{if(this.image.contentWindow){h(this.image.contentWindow).trigger("resize")
}}catch(Q){}return this.container
}if(!this.image){return this.container
}var L,R,S=h(T.container),O;
e.wait({until:function(){L=U.width||S.width()||e.parseValue(S.css("width"));
R=U.height||S.height()||e.parseValue(S.css("height"));
return L&&R
},success:function(){var X=(L-U.margin*2)/T.original.width,V=(R-U.margin*2)/T.original.height,W=Math.min(X,V),aa=Math.max(X,V),ae={"true":aa,width:X,height:V,"false":W,landscape:T.original.width>T.original.height?aa:W,portrait:T.original.width<T.original.height?aa:W},Y=ae[U.crop.toString()],ab="";
if(U.max){Y=Math.min(U.max,Y)
}if(U.min){Y=Math.max(U.min,Y)
}h.each(["width","height"],function(ah,ag){h(T.image)[ag](T[ag]=T.image[ag]=Math.round(T.original[ag]*Y))
});
h(T.container).width(L).height(R);
if(U.canvas&&z){z.elem.width=T.width;
z.elem.height=T.height;
ab=T.image.src+":"+T.width+"x"+T.height;
T.image.src=z.cache[ab]||(function(ag){z.context.drawImage(T.image,0,0,T.original.width*Y,T.original.height*Y);
try{O=z.elem.toDataURL();
z.length+=O.length;
z.cache[ag]=O;
return O
}catch(ah){return T.image.src
}}(ab))
}var Z={},ad={},ac=function(ak,ai,aj){var ah=0;
if(/\%/.test(ak)){var al=parseInt(ak,10)/100,ag=T.image[ai]||h(T.image)[ai]();
ah=Math.ceil(ag*-1*al+aj*al)
}else{ah=e.parseValue(ak)
}return ah
},af={top:{top:0},left:{left:0},right:{left:"100%"},bottom:{top:"100%"}};
h.each(U.position.toLowerCase().split(" "),function(ag,ah){if(ah==="center"){ah="50%"
}Z[ag?"top":"left"]=ah
});
h.each(Z,function(ag,ah){if(af.hasOwnProperty(ah)){h.extend(ad,af[ah])
}});
Z=Z.top?h.extend(Z,ad):ad;
Z=h.extend({top:"50%",left:"50%"},Z);
h(T.image).css({position:"absolute",top:ac(Z.top,"height",R),left:ac(Z.left,"width",L)});
T.show();
T.ready=true;
U.complete.call(T,T)
},error:function(){Galleria.raise("Could not scale image: "+T.image.src)
},timeout:1000});
return this
}};
h.extend(h.easing,{galleria:function(K,L,F,N,M){if((L/=M/2)<1){return N/2*L*L*L+F
}return N/2*((L-=2)*L*L+2)+F
},galleriaIn:function(K,L,F,N,M){return N*(L/=M)*L+F
},galleriaOut:function(K,L,F,N,M){return -N*(L/=M)*(L-2)+F
}});
h.fn.galleria=function(K){var F=this.selector;
if(!h(this).length){h(function(){if(h(F).length){h(F).galleria(K)
}else{Galleria.utils.wait({until:function(){return h(F).length
},success:function(){h(F).galleria(K)
},error:function(){Galleria.raise('Init failed: Galleria could not find the element "'+F+'".')
},timeout:5000})
}});
return this
}return this.each(function(){if(h.data(this,"galleria")){h.data(this,"galleria").destroy();
h(this).find("*").hide()
}h.data(this,"galleria",new Galleria().init(this,K))
})
}
}(jQuery));
/*!
 * jQuery Cookie Plugin v1.4.0
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function(a){if(typeof define==="function"&&define.amd){define(["jquery"],a)
}else{a(jQuery)
}}(function(h){var f=/\+/g;
function j(l){return e.raw?l:encodeURIComponent(l)
}function a(l){return e.raw?l:decodeURIComponent(l)
}function g(l){return j(e.json?JSON.stringify(l):String(l))
}function k(o,q){var n=new Date(0).toUTCString();
document.cookie=o+"=; expires="+n;
for(var p=0,m=q.length;
p<m;
p++){document.cookie=o+"=; path="+q[p]+"; expires="+n
}}function b(o){var r=location.pathname.replace(/\/$/,""),n=r.split("/"),s=[];
for(var p=0,m=n.length,q;
p<m;
p++){q=n.slice(0,p+1).join("/");
s.push(q);
s.push(q+"/")
}k(o,s)
}function d(l){if(l.indexOf('"')===0){l=l.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\")
}try{l=decodeURIComponent(l.replace(f," "))
}catch(m){return
}try{return e.json?JSON.parse(l):l
}catch(m){}}function c(m,l){var n=e.raw?m:d(m);
return h.isFunction(l)?l(n):n
}var e=h.cookie=function(s,r,x){if(r!==undefined&&!h.isFunction(r)){x=h.extend({},e.defaults,x);
if(typeof x.expires==="number"){var u=x.expires,w=x.expires=new Date();
w.setDate(w.getDate()+u)
}return(document.cookie=[j(s),"=",g(r),x.expires?"; expires="+x.expires.toUTCString():"",x.path?"; path="+x.path:"",x.domain?"; domain="+x.domain:"",x.secure?"; secure":""].join(""))
}var y=s?undefined:{};
var v=document.cookie?document.cookie.split("; "):[];
for(var q=0,o=v.length;
q<o;
q++){var p=v[q].split("=");
var m=a(p.shift());
var n=p.join("=");
if(s&&s===m){y=c(n,r);
break
}if(!s&&(n=c(n))!==undefined){y[m]=n
}}return y
};
e.defaults={};
h.removeCookie=function(m,l){if(h.cookie(m)!==undefined){h.cookie(m,"",h.extend({},l,{expires:-1}));
return true
}return false
};
h.removePathCookie=function(m,l){if(h.cookie(m)!==undefined){b(m);
return true
}return false
}
}));
/*! grunt-grunticon Stylesheet Loader - v2.0.1 | https://github.com/filamentgroup/grunticon | (c) 2015 Scott Jehl, Filament Group, Inc. | MIT license. */
(function(b){function a(g,l,h,j){function d(){for(var m,o=0;
e.length>o;
o++){e[o].href&&e[o].href.indexOf(g)>-1&&(m=!0)
}m?f.media=h||"all":setTimeout(d)
}var f=b.document.createElement("link"),k=l||b.document.getElementsByTagName("script")[0],e=b.document.styleSheets;
return f.rel="stylesheet",f.href=g,f.media="only x",f.onload=j||function(){},k.parentNode.insertBefore(f,k),d(),f
}var c=function(g,h){if(g&&3===g.length){var d=b.navigator,f=b.Image,j=!(!document.createElementNS||!document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect||!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")||b.opera&&-1===d.userAgent.indexOf("Chrome")||-1!==d.userAgent.indexOf("Series40")),e=new f;
e.onerror=function(){c.method="png",a(g[2])
},e.onload=function(){var l=1===e.width&&1===e.height,k=g[l&&j?0:l?1:2];
c.method=l&&j?"svg":l?"datapng":"png",c.href=k,a(k,null,null,h)
},e.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",document.documentElement.className+=" grunticon"
}};
c.loadCSS=a,b.grunticon=c
})(this);
grunticon(["/etc/designs/al-jazeera-america/icons/grunticon/icons.data.svg.css","/etc/designs/al-jazeera-america/icons/grunticon/icons.data.png.css","/etc/designs/al-jazeera-america/icons/grunticon/icons.fallback.css"]);
/*!
* ZeroClipboard
* The ZeroClipboard library provides an easy way to copy text to the clipboard using an invisible Adobe Flash movie and a JavaScript interface.
* Copyright (c) 2013 Jon Rohan, James M. Greene
* Licensed MIT
* http://zeroclipboard.org/
* v1.2.1
*/
if(typeof CQ==="undefined"||typeof CQ.WCM.getContentFinder()==="undefined"){!function(){var R,Q=function(){var d=/\-([a-z])/g,c=function(f,e){return e.toUpperCase()
};
return function(a){return a.replace(d,c)
}
}(),P=function(b,p){var o,n,m,l,k,j;
if(window.getComputedStyle?o=window.getComputedStyle(b,null).getPropertyValue(p):(n=Q(p),o=b.currentStyle?b.currentStyle[n]:b.style[n]),"cursor"===p&&(!o||"auto"===o)){for(m=b.tagName.toLowerCase(),l=["a"],k=0,j=l.length;
j>k;
k++){if(m===l[k]){return"pointer"
}}}return o
},O=function(d){if(C.prototype._singleton){d||(d=window.event);
var c;
this!==window?c=this:d.target?c=d.target:d.srcElement&&(c=d.srcElement),C.prototype._singleton.setCurrent(c)
}},N=function(e,d,f){e.addEventListener?e.addEventListener(d,f,!1):e.attachEvent&&e.attachEvent("on"+d,f)
},M=function(e,d,f){e.removeEventListener?e.removeEventListener(d,f,!1):e.detachEvent&&e.detachEvent("on"+d,f)
},L=function(j,h){if(j.addClass){return j.addClass(h),j
}if(h&&"string"==typeof h){var o=(h||"").split(/\s+/);
if(1===j.nodeType){if(j.className){for(var n=" "+j.className+" ",m=j.className,l=0,k=o.length;
k>l;
l++){n.indexOf(" "+o[l]+" ")<0&&(m+=" "+o[l])
}j.className=m.replace(/^\s+|\s+$/g,"")
}else{j.className=h
}}}return j
},K=function(h,g){if(h.removeClass){return h.removeClass(g),h
}if(g&&"string"==typeof g||void 0===g){var m=(g||"").split(/\s+/);
if(1===h.nodeType&&h.className){if(g){for(var l=(" "+h.className+" ").replace(/[\n\t]/g," "),k=0,j=m.length;
j>k;
k++){l=l.replace(" "+m[k]+" "," ")
}h.className=l.replace(/^\s+|\s+$/g,"")
}else{h.className=""
}}}return h
},J=function(){var f,e,h,g=1;
return"function"==typeof document.body.getBoundingClientRect&&(f=document.body.getBoundingClientRect(),e=f.right-f.left,h=document.body.offsetWidth,g=Math.round(100*(e/h))/100),g
},I=function(s){var r={left:0,top:0,width:0,height:0,zIndex:999999999},q=P(s,"z-index");
if(q&&"auto"!==q&&(r.zIndex=parseInt(q,10)),s.getBoundingClientRect){var p,o,n,m=s.getBoundingClientRect();
"pageXOffset" in window&&"pageYOffset" in window?(p=window.pageXOffset,o=window.pageYOffset):(n=J(),p=Math.round(document.documentElement.scrollLeft/n),o=Math.round(document.documentElement.scrollTop/n));
var l=document.documentElement.clientLeft||0,c=document.documentElement.clientTop||0;
r.left=m.left+p-l,r.top=m.top+o-c,r.width="width" in m?m.width:m.right-m.left,r.height="height" in m?m.height:m.bottom-m.top
}return r
},H=function(e,d){var f=!(d&&d.useNoCache===!1);
return f?(-1===e.indexOf("?")?"?":"&")+"nocache="+(new Date).getTime():""
},G=function(e){var d=[],f=[];
return e.trustedOrigins&&("string"==typeof e.trustedOrigins?f.push(e.trustedOrigins):"object"==typeof e.trustedOrigins&&"length" in e.trustedOrigins&&(f=f.concat(e.trustedOrigins))),e.trustedDomains&&("string"==typeof e.trustedDomains?f.push(e.trustedDomains):"object"==typeof e.trustedDomains&&"length" in e.trustedDomains&&(f=f.concat(e.trustedDomains))),f.length&&d.push("trustedOrigins="+encodeURIComponent(f.join(","))),"string"==typeof e.amdModuleId&&e.amdModuleId&&d.push("amdModuleId="+encodeURIComponent(e.amdModuleId)),"string"==typeof e.cjsModuleId&&e.cjsModuleId&&d.push("cjsModuleId="+encodeURIComponent(e.cjsModuleId)),d.join("&")
},F=function(f,e){if(e.indexOf){return e.indexOf(f)
}for(var h=0,g=e.length;
g>h;
h++){if(e[h]===f){return h
}}return -1
},E=function(b){if("string"==typeof b){throw new TypeError("ZeroClipboard doesn't accept query strings.")
}return b.length?b:[b]
},D=function(g,f,k,j,h){h?window.setTimeout(function(){g.call(f,k,j)
},0):g.call(f,k,j)
},C=function(f,e){if(f&&(C.prototype._singleton||this).glue(f),C.prototype._singleton){return C.prototype._singleton
}C.prototype._singleton=this,this.options={};
for(var h in z){this.options[h]=z[h]
}for(var g in e){this.options[g]=e[g]
}this.handlers={},C.detectFlashSupport()&&w()
},B=[];
C.prototype.setCurrent=function(a){R=a,this.reposition();
var f=a.getAttribute("title");
f&&this.setTitle(f);
var c=this.options.forceHandCursor===!0||"pointer"===P(a,"cursor");
return A.call(this,c),this
},C.prototype.setText=function(b){return b&&""!==b&&(this.options.text=b,this.ready()&&this.flashBridge.setText(b)),this
},C.prototype.setTitle=function(b){return b&&""!==b&&this.htmlBridge.setAttribute("title",b),this
},C.prototype.setSize=function(d,c){return this.ready()&&this.flashBridge.setSize(d,c),this
},C.prototype.setHandCursor=function(b){return b="boolean"==typeof b?b:!!b,A.call(this,b),this.options.forceHandCursor=b,this
};
var A=function(b){this.ready()&&this.flashBridge.setHandCursor(b)
};
C.version="1.2.1";
var z={moviePath:"ZeroClipboard.swf",trustedOrigins:null,text:null,hoverClass:"zeroclipboard-is-hover",activeClass:"zeroclipboard-is-active",allowScriptAccess:"sameDomain",useNoCache:!0,forceHandCursor:!1};
C.setDefaults=function(d){for(var c in d){z[c]=d[c]
}},C.destroy=function(){C.prototype._singleton.unglue(B);
var b=C.prototype._singleton.htmlBridge;
b.parentNode.removeChild(b),delete C.prototype._singleton
},C.detectFlashSupport=function(){var d=!1;
if("function"==typeof ActiveXObject){try{new ActiveXObject("ShockwaveFlash.ShockwaveFlash")&&(d=!0)
}catch(c){}}return !d&&navigator.mimeTypes["application/x-shockwave-flash"]&&(d=!0),d
};
var y=null,x=null,w=function(){var h=C.prototype._singleton,g=document.getElementById("global-zeroclipboard-html-bridge");
if(!g){var m={};
for(var l in h.options){m[l]=h.options[l]
}m.amdModuleId=y,m.cjsModuleId=x;
var k=G(m),j='      <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" id="global-zeroclipboard-flash-bridge" width="100%" height="100%">         <param name="movie" value="'+h.options.moviePath+H(h.options.moviePath,h.options)+'"/>         <param name="allowScriptAccess" value="'+h.options.allowScriptAccess+'"/>         <param name="scale" value="exactfit"/>         <param name="loop" value="false"/>         <param name="menu" value="false"/>         <param name="quality" value="best" />         <param name="bgcolor" value="#ffffff"/>         <param name="wmode" value="transparent"/>         <param name="flashvars" value="'+k+'"/>         <embed src="'+h.options.moviePath+H(h.options.moviePath,h.options)+'"           loop="false" menu="false"           quality="best" bgcolor="#ffffff"           width="100%" height="100%"           name="global-zeroclipboard-flash-bridge"           allowScriptAccess="always"           allowFullScreen="false"           type="application/x-shockwave-flash"           wmode="transparent"           pluginspage="http://www.macromedia.com/go/getflashplayer"           flashvars="'+k+'"           scale="exactfit">         </embed>       </object>';
g=document.createElement("div"),g.id="global-zeroclipboard-html-bridge",g.setAttribute("class","global-zeroclipboard-container"),g.setAttribute("data-clipboard-ready",!1),g.style.position="absolute",g.style.left="-9999px",g.style.top="-9999px",g.style.width="15px",g.style.height="15px",g.style.zIndex="9999",g.innerHTML=j,document.body.appendChild(g)
}h.htmlBridge=g,h.flashBridge=document["global-zeroclipboard-flash-bridge"]||g.children[0].lastElementChild
};
C.prototype.resetBridge=function(){return this.htmlBridge.style.left="-9999px",this.htmlBridge.style.top="-9999px",this.htmlBridge.removeAttribute("title"),this.htmlBridge.removeAttribute("data-clipboard-text"),K(R,this.options.activeClass),R=null,this.options.text=null,this
},C.prototype.ready=function(){var b=this.htmlBridge.getAttribute("data-clipboard-ready");
return"true"===b||b===!0
},C.prototype.reposition=function(){if(!R){return !1
}var a=I(R);
return this.htmlBridge.style.top=a.top+"px",this.htmlBridge.style.left=a.left+"px",this.htmlBridge.style.width=a.width+"px",this.htmlBridge.style.height=a.height+"px",this.htmlBridge.style.zIndex=a.zIndex+1,this.setSize(a.width,a.height),this
},C.dispatch=function(d,c){C.prototype._singleton.receiveEvent(d,c)
},C.prototype.on=function(f,e){for(var h=f.toString().split(/\s/g),g=0;
g<h.length;
g++){f=h[g].toLowerCase().replace(/^on/,""),this.handlers[f]||(this.handlers[f]=e)
}return this.handlers.noflash&&!C.detectFlashSupport()&&this.receiveEvent("onNoFlash",null),this
},C.prototype.addEventListener=C.prototype.on,C.prototype.off=function(g,f){for(var k=g.toString().split(/\s/g),j=0;
j<k.length;
j++){g=k[j].toLowerCase().replace(/^on/,"");
for(var h in this.handlers){h===g&&this.handlers[h]===f&&delete this.handlers[h]
}}return this
},C.prototype.removeEventListener=C.prototype.off,C.prototype.receiveEvent=function(r,q){r=r.toString().toLowerCase().replace(/^on/,"");
var p=R,o=!0;
switch(r){case"load":if(q&&parseFloat(q.flashVersion.replace(",",".").replace(/[^0-9\.]/gi,""))<10){return this.receiveEvent("onWrongFlash",{flashVersion:q.flashVersion}),void 0
}this.htmlBridge.setAttribute("data-clipboard-ready",!0);
break;
case"mouseover":L(p,this.options.hoverClass);
break;
case"mouseout":K(p,this.options.hoverClass),this.resetBridge();
break;
case"mousedown":L(p,this.options.activeClass);
break;
case"mouseup":K(p,this.options.activeClass);
break;
case"datarequested":var n=p.getAttribute("data-clipboard-target"),m=n?document.getElementById(n):null;
if(m){var h=m.value||m.textContent||m.innerText;
h&&this.setText(h)
}else{var g=p.getAttribute("data-clipboard-text");
g&&this.setText(g)
}o=!1;
break;
case"complete":this.options.text=null
}if(this.handlers[r]){var a=this.handlers[r];
"string"==typeof a&&"function"==typeof window[a]&&(a=window[a]),"function"==typeof a&&D(a,p,this,q,o)
}},C.prototype.glue=function(d){d=E(d);
for(var c=0;
c<d.length;
c++){-1==F(d[c],B)&&(B.push(d[c]),N(d[c],"mouseover",O))
}return this
},C.prototype.unglue=function(e){e=E(e);
for(var d=0;
d<e.length;
d++){M(e[d],"mouseover",O);
var f=F(e[d],B);
-1!=f&&B.splice(f,1)
}return this
},"function"==typeof define&&define.amd?define(["require","exports","module"],function(e,d,f){return y=f&&f.id||null,C
}):"object"==typeof module&&module&&"object"==typeof module.exports&&module.exports?(x=module.id||null,module.exports=C):window.ZeroClipboard=C
}();
/*!
 * jQuery Smart Banner
 * Copyright (c) 2012 Arnold Daniels <arnold@jasny.net>
 * Based on 'jQuery Smart Web App Banner' by Kurt Zenisek @ kzeni.com
 */
}!function(b){var a=function(d){this.origHtmlMargin=parseFloat(b("html").css("margin-top"));
this.options=b.extend({},b.smartbanner.defaults,d);
var c=navigator.standalone,e=navigator.userAgent;
if(this.options.force){this.type=this.options.force
}else{if(e.match(/iPad|iPhone|iPod/i)!=null){if(e.match(/Safari/i)!=null||(e.match(/CriOS/i)!=null||window.Number(navigator.userAgent.substr(navigator.userAgent.indexOf("OS ")+3,3).replace("_","."))<6)){this.type="ios"
}}else{if(e.match(/Android/i)!=null){this.type="android"
}else{if(e.match(/Windows NT 6.2/i)!=null&&e.match(/Touch/i)!==null){this.type="windows"
}}}}if(!this.type||c||this.getCookie("sb-closed")||this.getCookie("sb-installed")){return
}this.scale=this.options.scale=="auto"?b(window).width()/window.screen.width:this.options.scale;
if(this.scale<1){this.scale=1
}var f=b(this.type=="android"?'meta[name="google-play-app"]':this.type=="ios"?'meta[name="apple-itunes-app"]':'meta[name="msApplication-ID"]');
if(f.length==0){return
}if(this.type=="windows"){this.pfn=b('meta[name="msApplication-PackageFamilyName"]').attr("content");
this.appId=f.attr("content")[1]
}else{this.appId=/app-id=([^\s,]+)/.exec(f.attr("content"))[1]
}this.title=this.options.title?this.options.title:b("title").text().replace(/\s*[|\-·].*$/,"");
this.author=this.options.author?this.options.author:(b('meta[name="author"]').length?b('meta[name="author"]').attr("content"):window.location.hostname);
this.create();
this.show();
this.listen()
};
a.prototype={constructor:a,create:function(){var d,c=(this.options.url?this.options.url:(this.type=="windows"?"ms-windows-store:PDP?PFN="+this.pfn:(this.type=="android"?"market://details?id=":"https://itunes.apple.com/"+this.options.appStoreLanguage+"/app/id"))+this.appId),f=this.options.price?this.options.price+" - "+(this.type=="android"?this.options.inGooglePlay:this.type=="ios"?this.options.inAppStore:this.options.inWindowsStore):"",e=this.options.iconGloss===null?(this.type=="ios"):this.options.iconGloss;
b("body").append('<div id="smartbanner" class="'+this.type+'"><div class="sb-container"><a href="#" class="sb-close">&times;</a><span class="sb-icon"></span><div class="sb-info"><strong>'+this.title+"</strong><span>"+this.author+"</span><span>"+f+'</span></div><a href="'+c+'" class="sb-button"><span>'+this.options.button+"</span></a></div></div>");
if(this.options.icon){d=this.options.icon
}else{if(b('link[rel="apple-touch-icon-precomposed"]').length>0){d=b('link[rel="apple-touch-icon-precomposed"]').attr("href");
if(this.options.iconGloss===null){e=false
}}else{if(b('link[rel="apple-touch-icon"]').length>0){d=b('link[rel="apple-touch-icon"]').attr("href")
}else{if(b('meta[name="msApplication-TileImage"]').length>0){d=b('meta[name="msApplication-TileImage"]').attr("content")
}else{if(b('meta[name="msapplication-TileImage"]').length>0){d=b('meta[name="msapplication-TileImage"]').attr("content")
}}}}}if(d){b("#smartbanner .sb-icon").css("background-image","url("+d+")");
if(e){b("#smartbanner .sb-icon").addClass("gloss")
}}else{b("#smartbanner").addClass("no-icon")
}this.bannerHeight=b("#smartbanner").outerHeight();
if(this.scale>1){b("#smartbanner").css("top",parseFloat(b("#smartbanner").css("top"))*this.scale).css("height",parseFloat(b("#smartbanner").css("height"))*this.scale);
b("#smartbanner .sb-container").css("-webkit-transform","scale("+this.scale+")").css("-msie-transform","scale("+this.scale+")").css("-moz-transform","scale("+this.scale+")").css("width",b(window).width()/this.scale)
}},listen:function(){b("#smartbanner .sb-close").on("click",b.proxy(this.close,this));
b("#smartbanner .sb-button").on("click",b.proxy(this.install,this))
},show:function(c){b("#smartbanner").stop().animate({top:0},this.options.speedIn).addClass("shown");
b("html").animate({marginTop:this.origHtmlMargin+(this.bannerHeight*this.scale)},this.options.speedIn,"swing",c);
b("html, body").css("position","static")
},hide:function(c){b("#smartbanner").stop().animate({top:-1*this.bannerHeight*this.scale},this.options.speedOut).removeClass("shown");
b("html").animate({marginTop:this.origHtmlMargin},this.options.speedOut,"swing",c);
b("html, body").css("position","")
},close:function(c){c.preventDefault();
this.hide();
this.setCookie("sb-closed","true",this.options.daysHidden)
},install:function(c){this.hide();
this.setCookie("sb-installed","true",this.options.daysReminder)
},setCookie:function(c,e,d){var f=new Date();
f.setDate(f.getDate()+d);
e=escape(e)+((d==null)?"":"; expires="+f.toUTCString());
document.cookie=c+"="+e+"; path=/;"
},getCookie:function(d){var e,c,g,f=document.cookie.split(";");
for(e=0;
e<f.length;
e++){c=f[e].substr(0,f[e].indexOf("="));
g=f[e].substr(f[e].indexOf("=")+1);
c=c.replace(/^\s+|\s+$/g,"");
if(c==d){return unescape(g)
}}return null
},switchType:function(){var c=this;
this.hide(function(){c.type=c.type=="android"?"ios":"android";
var d=b(c.type=="android"?'meta[name="google-play-app"]':'meta[name="apple-itunes-app"]').attr("content");
c.appId=/app-id=([^\s,]+)/.exec(d)[1];
b("#smartbanner").detach();
c.create();
c.show()
})
}};
b.smartbanner=function(d){var f=b(window),e=f.data("typeahead"),c=typeof d=="object"&&d;
if(!e){f.data("typeahead",(e=new a(c)))
}if(typeof d=="string"){e[d]()
}};
b.smartbanner.defaults={title:null,author:null,price:"FREE",appStoreLanguage:"us",inAppStore:"On the App Store",inGooglePlay:"In Google Play",inWindowsStore:"In the Windows Store",icon:null,iconGloss:null,button:"VIEW",url:null,scale:"auto",speedIn:300,speedOut:400,daysHidden:15,daysReminder:90,force:null};
b.smartbanner.Constructor=a
}(window.jQuery);
(function(a){function b(g,f){var d=0;
var h=g-1;
var j=-1;
var e;
while(d<=h){e=~~((d+h)/2);
var c=f(e);
if(c<0){h=e-1
}else{if(c>0){d=e+1
}else{j=e;
d=e+1
}}}return j
}a.each(["show","toggleClass","addClass","removeClass"],function(){var c=a.fn[this];
a.fn[this]=function(){var e=this.find(":hidden").add(this.filter(":hidden"));
var d=c.apply(this,arguments);
e.filter(":visible").each(function(){a(this).triggerHandler("show")
});
return d
}
});
a.fn.ellipsisAJAM=function(c){return this.each(function(){var g=a(this);
if(g.is(":visible")){if(g.css("overflow")==="hidden"){var p=g.html();
var h=g.hasClass("multiline");
var f=a(this.cloneNode(true)).hide().css("position","absolute").css("overflow","visible").width(h?g.width():"auto").height(h?"auto":g.height());
g.after(f);
var k=function(){return f.height()>g.height()
};
var d=function(){return f.width()>g.width()
};
var l=h?k:d;
if(l()){var o=null;
if(c){o=a.trim(g.text()).replace(/\s\s+/g," ")
}var e=p;
var m=function(q){p=e.substr(0,q);
f.html(p+"…")
};
var j=function(q){m(q);
if(l()){return -1
}return 0
};
var n=b(p.length-1,j);
m(n);
g.html(f.html());
if(o!==null){g.attr("title",o)
}}f.remove()
}}else{g.one("show",function(){a(this).ellipsisAJAM(c)
})
}})
}
}(jQuery));
/*! jQuery UI - v1.9.2 - 2014-03-12
* http://jqueryui.com
* Includes: jquery.ui.effect.js, jquery.ui.effect-blind.js
* Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */
jQuery.effects||function(f,d){var c=f.uiBackCompat!==!1,b="ui-effects-";
f.effects={effect:{}},function(D,w){function B(n,m,l){var h=A[m.type]||{};
return null==n?l||!m.def?null:m.def:(n=h.floor?~~n:parseFloat(n),isNaN(n)?m.def:h.mod?(n+h.mod)%h.mod:0>n?0:n>h.max?h.max:n)
}function E(m){var h=C(),l=h._rgba=[];
return m=m.toLowerCase(),q(v,function(p,G){var u,F=G.re.exec(m),s=F&&G.parse(F),a=G.space||"rgba";
return s?(u=h[a](s),h[z[a].cache]=u[z[a].cache],l=h._rgba=u._rgba,!1):w
}),l.length?("0,0,0,0"===l.join()&&D.extend(l,e.transparent),h):e[m]
}function k(l,h,a){return a=(a+1)%1,1>6*a?l+6*(h-l)*a:1>2*a?h:2>3*a?l+6*(h-l)*(2/3-a):l
}var e,j="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor".split(" "),x=/^([\-+])=\s*(\d+\.?\d*)/,v=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,parse:function(a){return[a[1],a[2],a[3],a[4]]
}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,parse:function(a){return[2.55*a[1],2.55*a[2],2.55*a[3],a[4]]
}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(a){return[parseInt(a[1],16),parseInt(a[2],16),parseInt(a[3],16)]
}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(a){return[parseInt(a[1]+a[1],16),parseInt(a[2]+a[2],16),parseInt(a[3]+a[3],16)]
}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(a){return[a[1],a[2]/100,a[3]/100,a[4]]
}}],C=D.Color=function(n,l,h,m){return new D.Color.fn.parse(n,l,h,m)
},z={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},A={"byte":{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},g=C.support={},y=D("<p>")[0],q=D.each;
y.style.cssText="background-color:rgba(1,1,1,.5)",g.rgba=y.style.backgroundColor.indexOf("rgba")>-1,q(z,function(h,a){a.cache="_"+h,a.props.alpha={idx:3,type:"percent",def:1}
}),C.fn=D.extend(C.prototype,{parse:function(G,u,m,a){if(G===w){return this._rgba=[null,null,null,null],this
}(G.jquery||G.nodeType)&&(G=D(G).css(u),u=w);
var F=this,s=D.type(G),r=this._rgba=[];
return u!==w&&(G=[G,u,m,a],s="array"),"string"===s?this.parse(E(G)||e._default):"array"===s?(q(z.rgba.props,function(l,h){r[h.idx]=B(G[h.idx],h)
}),this):"object"===s?(G instanceof C?q(z,function(l,h){G[h.cache]&&(F[h.cache]=G[h.cache].slice())
}):q(z,function(l,h){var n=h.cache;
q(h.props,function(p,o){if(!F[n]&&h.to){if("alpha"===p||null==G[p]){return
}F[n]=h.to(F._rgba)
}F[n][o.idx]=B(G[p],o,!0)
}),F[n]&&0>f.inArray(null,F[n].slice(0,3))&&(F[n][3]=1,h.from&&(F._rgba=h.from(F[n])))
}),this):w
},is:function(n){var l=C(n),h=!0,m=this;
return q(z,function(p,u){var a,s=l[u.cache];
return s&&(a=m[u.cache]||u.to&&u.to(m._rgba)||[],q(u.props,function(r,o){return null!=s[o.idx]?h=s[o.idx]===a[o.idx]:w
})),h
}),h
},_space:function(){var h=[],a=this;
return q(z,function(m,l){a[l.cache]&&h.push(m)
}),h.pop()
},transition:function(F,l){var a=C(F),p=a._space(),H=z[p],u=0===this.alpha()?C("transparent"):this,G=u[H.cache]||H.to(u._rgba),m=G.slice();
return a=a[H.cache],q(H.props,function(K,I){var L=I.idx,J=G[L],h=a[L],o=A[I.type]||{};
null!==h&&(null===J?m[L]=h:(o.mod&&(h-J>o.mod/2?J+=o.mod:J-h>o.mod/2&&(J-=o.mod)),m[L]=B((h-J)*l+J,I)))
}),this[p](m)
},blend:function(n){if(1===this._rgba[3]){return this
}var l=this._rgba.slice(),h=l.pop(),m=C(n)._rgba;
return C(D.map(l,function(o,a){return(1-h)*m[a]+h*o
}))
},toRgbaString:function(){var h="rgba(",a=D.map(this._rgba,function(m,l){return null==m?l>2?1:0:m
});
return 1===a[3]&&(a.pop(),h="rgb("),h+a.join()+")"
},toHslaString:function(){var h="hsla(",a=D.map(this.hsla(),function(m,l){return null==m&&(m=l>2?1:0),l&&3>l&&(m=Math.round(100*m)+"%"),m
});
return 1===a[3]&&(a.pop(),h="hsl("),h+a.join()+")"
},toHexString:function(m){var l=this._rgba.slice(),h=l.pop();
return m&&l.push(~~(255*h)),"#"+D.map(l,function(a){return a=(a||0).toString(16),1===a.length?"0"+a:a
}).join("")
},toString:function(){return 0===this._rgba[3]?"transparent":this.toRgbaString()
}}),C.fn.parse.prototype=C.fn,z.hsla.to=function(J){if(null==J[0]||null==J[1]||null==J[2]){return[null,null,null,J[3]]
}var N,H,L=J[0]/255,O=J[1]/255,F=J[2]/255,m=J[3],p=Math.max(L,O,F),I=Math.min(L,O,F),G=p-I,M=p+I,K=0.5*M;
return N=I===p?0:L===p?60*(O-F)/G+360:O===p?60*(F-L)/G+120:60*(L-O)/G+240,H=0===K||1===K?K:0.5>=K?G/M:G/(2-M),[Math.round(N)%360,H,K,null==m?1:m]
},z.hsla.from=function(u){if(null==u[0]||null==u[1]||null==u[2]){return[null,null,null,u[3]]
}var m=u[0]/360,l=u[1],h=u[2],n=u[3],p=0.5>=h?h*(1+l):h+l-h*l,F=2*h-p;
return[Math.round(255*k(F,p,m+1/3)),Math.round(255*k(F,p,m)),Math.round(255*k(F,p,m-1/3)),n]
},q(z,function(p,h){var F=h.props,m=h.cache,u=h.to,a=h.from;
C.fn[p]=function(o){if(u&&!this[m]&&(this[m]=u(this._rgba)),o===w){return this[m].slice()
}var n,l=D.type(o),r="array"===l||"object"===l?o:arguments,G=this[m].slice();
return q(F,function(I,H){var s=r["object"===l?I:H.idx];
null==s&&(s=G[H.idx]),G[H.idx]=B(s,H)
}),a?(n=C(a(G)),n[m]=G,n):C(G)
},q(F,function(n,l){C.fn[n]||(C.fn[n]=function(I){var L,J=D.type(I),K="alpha"===n?this._hsla?"hsla":"rgba":p,G=this[K](),H=G[l.idx];
return"undefined"===J?H:("function"===J&&(I=I.call(this,H),J=D.type(I)),null==I&&l.empty?this:("string"===J&&(L=x.exec(I),L&&(I=H+parseFloat(L[2])*("+"===L[1]?1:-1))),G[l.idx]=I,this[K](G)))
})
})
}),q(j,function(h,a){D.cssHooks[a]={set:function(F,p){var H,u,G="";
if("string"!==D.type(p)||(H=E(p))){if(p=C(H||p),!g.rgba&&1!==p._rgba[3]){for(u="backgroundColor"===a?F.parentNode:F;
(""===G||"transparent"===G)&&u&&u.style;
){try{G=D.css(u,"backgroundColor"),u=u.parentNode
}catch(s){}}p=p.blend(G&&"transparent"!==G?G:"_default")
}p=p.toRgbaString()
}try{F.style[a]=p
}catch(m){}}},D.fx.step[a]=function(l){l.colorInit||(l.start=C(l.elem,a),l.end=C(l.end),l.colorInit=!0),D.cssHooks[a].set(l.elem,l.start.transition(l.end,l.pos))
}
}),D.cssHooks.borderColor={expand:function(h){var a={};
return q(["Top","Right","Bottom","Left"],function(m,l){a["border"+l+"Color"]=h
}),a
}},e=D.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}
}(jQuery),function(){function g(){var m,l,k=this.ownerDocument.defaultView?this.ownerDocument.defaultView.getComputedStyle(this,null):this.currentStyle,n={};
if(k&&k.length&&k[0]&&k[k[0]]){for(l=k.length;
l--;
){m=k[l],"string"==typeof k[m]&&(n[f.camelCase(m)]=k[m])
}}else{for(m in k){"string"==typeof k[m]&&(n[m]=k[m])
}}return n
}function e(m,l){var k,n,o={};
for(k in l){n=l[k],m[k]!==n&&(j[k]||(f.fx.step[k]||!isNaN(parseFloat(n)))&&(o[k]=n))
}return o
}var h=["add","remove","toggle"],j={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};
f.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(k,a){f.fx.step[a]=function(l){("none"!==l.end&&!l.setAttr||1===l.pos&&!l.setAttr)&&(jQuery.style(l.elem,a,l.end),l.setAttr=!0)
}
}),f.effects.animateClass=function(a,p,l,m){var k=f.speed(p,l,m);
return this.queue(function(){var v,s=f(this),u=s.attr("class")||"",q=k.children?s.find("*").andSelf():s;
q=q.map(function(){var n=f(this);
return{el:n,start:g.call(this)}
}),v=function(){f.each(h,function(o,n){a[n]&&s[n+"Class"](a[n])
})
},v(),q=q.map(function(){return this.end=g.call(this.el[0]),this.diff=e(this.start,this.end),this
}),s.attr("class",u),q=q.map(function(){var r=this,o=f.Deferred(),n=jQuery.extend({},k,{queue:!1,complete:function(){o.resolve(r)
}});
return this.el.animate(this.diff,n),o.promise()
}),f.when.apply(f,q.get()).done(function(){v(),f.each(arguments,function(){var n=this.el;
f.each(this.diff,function(o){n.css(o,"")
})
}),k.complete.call(s[0])
})
})
},f.fn.extend({_addClass:f.fn.addClass,addClass:function(m,l,k,n){return l?f.effects.animateClass.call(this,{add:m},l,k,n):this._addClass(m)
},_removeClass:f.fn.removeClass,removeClass:function(m,l,k,n){return l?f.effects.animateClass.call(this,{remove:m},l,k,n):this._removeClass(m)
},_toggleClass:f.fn.toggleClass,toggleClass:function(l,k,m,p,o){return"boolean"==typeof k||k===d?m?f.effects.animateClass.call(this,k?{add:l}:{remove:l},m,p,o):this._toggleClass(l,k):f.effects.animateClass.call(this,{toggle:l},k,m,p)
},switchClass:function(m,l,k,o,p){return f.effects.animateClass.call(this,{add:l,remove:m},k,o,p)
}})
}(),function(){function a(j,h,g,k){return f.isPlainObject(j)&&(h=j,j=j.effect),j={effect:j},null==h&&(h={}),f.isFunction(h)&&(k=h,g=null,h={}),("number"==typeof h||f.fx.speeds[h])&&(k=g,g=h,h={}),f.isFunction(g)&&(k=g,g=null),h&&f.extend(j,h),g=g||h.duration,j.duration=f.fx.off?0:"number"==typeof g?g:g in f.fx.speeds?f.fx.speeds[g]:f.fx.speeds._default,j.complete=k||h.complete,j
}function e(g){return !g||"number"==typeof g||f.fx.speeds[g]?!0:"string"!=typeof g||f.effects.effect[g]?!1:c&&f.effects[g]?!1:!0
}f.extend(f.effects,{version:"1.9.2",save:function(j,h){for(var g=0;
h.length>g;
g++){null!==h[g]&&j.data(b+h[g],j[0].style[h[g]])
}},restore:function(j,g){var h,k;
for(k=0;
g.length>k;
k++){null!==g[k]&&(h=j.data(b+g[k]),h===d&&(h=""),j.css(g[k],h))
}},setMode:function(h,g){return"toggle"===g&&(g=h.is(":hidden")?"show":"hide"),g
},getBaseline:function(k,j){var h,g;
switch(k[0]){case"top":h=0;
break;
case"middle":h=0.5;
break;
case"bottom":h=1;
break;
default:h=k[0]/j.height
}switch(k[1]){case"left":g=0;
break;
case"center":g=0.5;
break;
case"right":g=1;
break;
default:g=k[1]/j.width
}return{x:g,y:h}
},createWrapper:function(j){if(j.parent().is(".ui-effects-wrapper")){return j.parent()
}var h={width:j.outerWidth(!0),height:j.outerHeight(!0),"float":j.css("float")},g=f("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),k={width:j.width(),height:j.height()},m=document.activeElement;
try{m.id
}catch(l){m=document.body
}return j.wrap(g),(j[0]===m||f.contains(j[0],m))&&f(m).focus(),g=j.parent(),"static"===j.css("position")?(g.css({position:"relative"}),j.css({position:"relative"})):(f.extend(h,{position:j.css("position"),zIndex:j.css("z-index")}),f.each(["top","left","bottom","right"],function(o,n){h[n]=j.css(n),isNaN(parseInt(h[n],10))&&(h[n]="auto")
}),j.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),j.css(k),g.css(h).show()
},removeWrapper:function(h){var g=document.activeElement;
return h.parent().is(".ui-effects-wrapper")&&(h.parent().replaceWith(h),(h[0]===g||f.contains(h[0],g))&&f(g).focus()),h
},setTransition:function(j,h,g,k){return k=k||{},f.each(h,function(m,l){var o=j.cssUnit(l);
o[0]>0&&(k[l]=o[0]*g+o[1])
}),k
}}),f.fn.extend({effect:function(){function j(o){function h(){f.isFunction(v)&&v.call(q[0]),f.isFunction(o)&&o()
}var q=f(this),v=g.complete,u=g.mode;
(q.is(":hidden")?"hide"===u:"show"===u)?h():m.call(q[0],g,h)
}var g=a.apply(this,arguments),p=g.mode,l=g.queue,m=f.effects.effect[g.effect],k=!m&&c&&f.effects[g.effect];
return f.fx.off||!m&&!k?p?this[p](g.duration,g.complete):this.each(function(){g.complete&&g.complete.call(this)
}):m?l===!1?this.each(j):this.queue(l||"fx",j):k.call(this,{options:g,duration:g.duration,callback:g.complete,mode:g.mode})
},_show:f.fn.show,show:function(h){if(e(h)){return this._show.apply(this,arguments)
}var g=a.apply(this,arguments);
return g.mode="show",this.effect.call(this,g)
},_hide:f.fn.hide,hide:function(h){if(e(h)){return this._hide.apply(this,arguments)
}var g=a.apply(this,arguments);
return g.mode="hide",this.effect.call(this,g)
},__toggle:f.fn.toggle,toggle:function(h){if(e(h)||"boolean"==typeof h||f.isFunction(h)){return this.__toggle.apply(this,arguments)
}var g=a.apply(this,arguments);
return g.mode="toggle",this.effect.call(this,g)
},cssUnit:function(j){var h=this.css(j),g=[];
return f.each(["em","px","%","pt"],function(l,k){h.indexOf(k)>0&&(g=[parseFloat(h),k])
}),g
}})
}(),function(){var a={};
f.each(["Quad","Cubic","Quart","Quint","Expo"],function(h,g){a[g]=function(e){return Math.pow(e,h+2)
}
}),f.extend(a,{Sine:function(g){return 1-Math.cos(g*Math.PI/2)
},Circ:function(g){return 1-Math.sqrt(1-g*g)
},Elastic:function(g){return 0===g||1===g?g:-Math.pow(2,8*(g-1))*Math.sin((80*(g-1)-7.5)*Math.PI/15)
},Back:function(g){return g*g*(3*g-2)
},Bounce:function(j){for(var h,g=4;
((h=Math.pow(2,--g))-1)/11>j;
){}return 1/Math.pow(4,3-g)-7.5625*Math.pow((3*h-2)/22-j,2)
}}),f.each(a,function(g,e){f.easing["easeIn"+g]=e,f.easing["easeOut"+g]=function(h){return 1-e(1-h)
},f.easing["easeInOut"+g]=function(h){return 0.5>h?e(2*h)/2:1-e(-2*h+2)/2
}
})
}()
}(jQuery);
(function(c){var b=/up|down|vertical/,a=/up|left|vertical|horizontal/;
c.effects.effect.blind=function(D,G){var q,e,k,x=c(this),y=["position","top","bottom","left","right","height","width"],F=c.effects.setMode(x,D.mode||"hide"),B=D.direction||"up",C=b.test(B),j=C?"height":"width",w=C?"top":"left",A=a.test(B),z={},E="show"===F;
x.parent().is(".ui-effects-wrapper")?c.effects.save(x.parent(),y):c.effects.save(x,y),x.show(),q=c.effects.createWrapper(x).css({overflow:"hidden"}),e=q[j](),k=parseFloat(q.css(w))||0,z[j]=E?e:0,A||(x.css(C?"bottom":"right",0).css(C?"top":"left","auto").css({position:"absolute"}),z[w]=E?k:e+k),E&&(q.css(j,0),A||q.css(w,k+e)),q.animate(z,{duration:D.duration,easing:D.easing,queue:!1,complete:function(){"hide"===F&&x.hide(),c.effects.restore(x,y),c.effects.removeWrapper(x),G()
}})
}
})(jQuery);
/*! Fixedfixed: a CSS position:fixed qualifier. (c)2012 @scottjehl, Filament Group, Inc. Dual license: MIT and/or GPLv2 */
(function(a,f){var e="fixed-supported",d=a.document.createElement("div"),c=a.navigator.userAgent,g=a.document.documentElement;
d.style.position="fixed";
d.style.top=0;
function b(){var h="scrollTop" in a.document.body?a.document.body.scrollTop:g.scrollTop;
if(h!==f&&h>0&&a.document.body){a.document.body.insertBefore(d,a.document.body.firstChild);
if((!d.getBoundingClientRect||d.getBoundingClientRect().top!==0)&&!/OS 8_\d+(?:_\d+)? like Mac OS X/.test(c)){g.className=g.className.replace(e,"")
}a.document.body.removeChild(d);
if(a.removeEventListener){a.removeEventListener("scroll",b,false)
}else{a.detachEvent("onscroll",b)
}}}if(!(c.match(/Android 2\.[1256]/)&&c.indexOf("AppleWebKit")>-1)||!(c.match(/Opera Mobi\/([0-9]+)/)&&RegExp.$1<7458)||!(a.operamini&&({}).toString.call(a.operamini)==="[object OperaMini]")||!(c.match(/Fennec\/([0-9]+)/)&&RegExp.$1<6)){g.className+=" "+e;
if(a.addEventListener){a.addEventListener("scroll",b,false)
}else{a.attachEvent("onscroll",b)
}}a.FixedFixed=b
}(this));
(function(d,c){function e(j,h,l){var k=j+":",g=document.createElement("test"),f=g.style;
if(!l){f.cssText=k+["-webkit-","-moz-","-ms-","-o-",""].join(h+";"+k)+h+";"
}else{f.cssText=k+h
}return f[j].indexOf(h)!==-1
}function a(f){return parseInt(f,10)||0
}var b={classes:{plugin:"fixedsticky",active:"fixedsticky-on",inactive:"fixedsticky-off",clone:"fixedsticky-dummy",withoutFixedFixed:"fixedsticky-withoutfixedfixed"},keys:{offset:"fixedStickyOffset",position:"fixedStickyPosition"},tests:{sticky:e("position","sticky"),fixed:e("position","fixed",true)},getScrollTop:function(){var g="pageYOffset",f="scrollTop";
return d?(g in d)?d[g]:d.document.documentElement[f]:d.document.body[f]
},bypass:function(){return(b.tests.sticky&&!b.optOut)||!b.tests.fixed||d.FixedFixed&&!c(d.document.documentElement).hasClass("fixed-supported")
},update:function(h){if(!h.offsetWidth){return
}var x=c(h),s=x.outerHeight(),g=x.data(b.keys.offset),q=b.getScrollTop(),v=x.is("."+b.classes.active),n=function(y){x[y?"addClass":"removeClass"](b.classes.active)[!y?"addClass":"removeClass"](b.classes.inactive)
},m=c(window).height(),l=x.data(b.keys.position),u,r,p,k=x.parent(),f=k.offset().top,o=k.outerHeight();
if(!g){g=x.offset().top;
x.data(b.keys.offset,g);
x.after(c("<div>").addClass(b.classes.clone).height(s))
}if(!l){u=x.css("top")!=="auto"||x.css("bottom")!=="auto";
if(!u){x.css("position","fixed")
}l={top:x.css("top")!=="auto",bottom:x.css("bottom")!=="auto"};
if(!u){x.css("position","")
}x.data(b.keys.position,l)
}function j(){var y=q+r;
return g<y&&y+s<=f+o
}function w(){return g+(s||0)>q+m-p&&q+m-p>=f+(s||0)
}r=a(x.css("top"));
p=a(x.css("bottom"));
if(l.top&&j()||l.bottom&&w()){if(!v){n(true)
}}else{if(v){n(false)
}}},destroy:function(g){var f=c(g);
if(b.bypass()){return
}c(d).unbind(".fixedsticky");
return f.each(function(){c(this).removeData([b.keys.offset,b.keys.position]).removeClass(b.classes.active).removeClass(b.classes.inactive).next("."+b.classes.clone).remove()
})
},init:function(g){var f=c(g);
if(b.bypass()){return
}return f.each(function(){var h=this;
c(d).bind("scroll.fixedsticky",function(){b.update(h)
});
b.update(this);
c(d).bind("resize.fixedsticky",function(){if(f.is("."+b.classes.active)){b.update(h)
}})
})
}};
d.FixedSticky=b;
c.fn.fixedsticky=function(f){if(typeof b[f]==="function"){return b[f].call(b,this)
}else{if(typeof f==="object"||!f){return b.init.call(b,this)
}else{throw new Error("Method `"+f+"` does not exist on jQuery.fixedsticky")
}}};
if(!d.FixedFixed){c(d.document.documentElement).addClass(b.classes.withoutFixedFixed)
}})(this,jQuery);
(function(c,a,d){function e(g){g.preventDefault();
var f=d(this).data("activateRunFunc");
f&&f()
}function b(g){g.preventDefault();
g.stopImmediatePropagation();
var f=d(this).data("activateRunFunc");
f&&f()
}d.fn.activate=function(f){return d(this).data("activateRunFunc",f).on({touchend:e,click:b})
};
d(a).ready(function(){var B=d(".js-fullWidth--caption"),v=d(".js-fullWidth--caption__desktop"),z=d(".js-fullWidth--caption__mobile"),r=d(".js-articleWidth--caption"),C=d(".js-fullWidth--captionOverlay"),n=d(".js-articleWidth--captionOverlay"),k=d(".js-fullWidth--infoButton"),o=d(".js-articleWidth--infoButton"),u=d(".js-toggle--fade");
var y="(min-width: 568px)",j="(min-width: 568px) and (max-width: 767px)",E="(max-width: 767px)",D="(min-width: 768px)";
var F=function(){C.removeAttr("style");
n.removeAttr("style")
};
var H=function(){u.fadeOut()
};
var l=function(){u.fadeIn()
};
var s=function(){enquire.register(D,{deferSetup:true,setup:function(){C.stop().animate({marginTop:"-1"},400)
}})
};
var x=function(){enquire.register(j,{deferSetup:true,setup:function(){C.stop().animate({marginTop:"0"},400)
}})
};
var A=function(){enquire.register(y,{deferSetup:true,setup:function(){n.stop().animate({marginTop:"20"},400)
}})
};
var f=function(){enquire.register(E,{deferSetup:true,setup:function(){z.show("blind");
x()
}}).register(D,{deferSetup:true,setup:function(){v.show("blind");
s()
}})
};
var m=function(){r.show("blind");
A()
};
var q=function(){enquire.register(E,{deferSetup:true,setup:function(){z.hide("blind");
enquire.unregister(D)
}}).register(D,{deferSetup:true,setup:function(){v.hide("blind");
enquire.unregister(E)
}})
};
var I=function(){r.hide("blind")
};
var G=function(){enquire.register(j,{deferSetup:true,setup:function(){C.stop().animate({marginTop:"-25"},400)
}}).register(D,{deferSetup:true,setup:function(){C.stop().animate({marginTop:"-40"},400)
}})
};
var g=function(){enquire.register(j,{deferSetup:true,setup:function(){n.stop().animate({marginTop:"-25"},400)
}}).register(D,{deferSetup:true,setup:function(){n.stop().animate({marginTop:"-37"},400)
}})
};
k.activate(_.debounce(function(){if(u.is(":visible")){H();
f()
}else{l();
q();
G()
}},250));
o.activate(_.debounce(function(){if(u.is(":visible")){H();
m()
}else{l();
I();
g()
}},250));
k.mouseenter(function(){H();
f()
}).mouseleave(function(){l();
q();
G()
});
o.mouseenter(function(){H();
m()
}).mouseleave(function(){l();
I();
g()
});
d(c).resize(_.throttle(F,250));
var p=c.orientation;
var w=function(){if(c.orientation!==p){p=c.orientation;
l();
if(B.length){q()
}if(r.length){I()
}d(c).trigger("resize")
}};
c.addEventListener("resize",w,false);
c.addEventListener("orientationchange",w,false);
$window=d(c);
function h(L){var N=$window.scrollTop();
var M=N+$window.height();
var J=d(L).offset().top;
var K=J+d(L).height();
if((K>=N)&&(J<=M)){return false
}else{return true
}}d(c).scroll(_.throttle(function(){if(B.length&&h(B)){l();
q();
G()
}if(r.length&&h(r)){l();
I();
g()
}},250));
if(!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent||navigator.vendor||c.opera)){enquire.register(D,{match:function(){d('[data-type="background"]').each(function(){var J=d(this),K=J.data("speed"),L=J.data("position");
d(c).scroll(_.throttle(function(){if(!h(J)&&J.is(":visible")){var M;
if(L==="top"){var M=($window.scrollTop()/K)
}else{if(L==="center"){var M=((($window.scrollTop()/K)-50)*-1)
}else{if(L==="bottom"){var M=(-($window.scrollTop()/K)+100)
}}}var N=M.toFixed(2);
J.css("background-position","50% "+N+"%")
}},11))
})
},unmatch:function(){d('[data-type="background"]').each(function(){d(c).off("scroll")
})
}})
}})
})(window,document,window.jQuery);
/*! Magnific Popup - v1.0.0 - 2015-01-03
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2015 Dmitry Semenov; */
(function(a){if(typeof define==="function"&&define.amd){define(["jquery"],a)
}else{if(typeof exports==="object"){a(require("jquery"))
}else{a(window.jQuery||window.Zepto)
}}}(function(D){var z="Close",I="BeforeClose",x="AfterClose",O="BeforeAppend",f="MarkupParse",l="Open",h="Change",E="mfp",d="."+E,J="mfp-ready",L="mfp-removing",e="mfp-prevent-close";
var T,A=function(){},K=!!(window.jQuery),C,a=D(window),B,G,b,M;
var j=function(X,Y){T.ev.on(E+X+d,Y)
},o=function(ab,Y,Z,X){var aa=document.createElement("div");
aa.className="mfp-"+ab;
if(Z){aa.innerHTML=Z
}if(!X){aa=D(aa);
if(Y){aa.appendTo(Y)
}}else{if(Y){Y.appendChild(aa)
}}return aa
},Q=function(Y,X){T.ev.triggerHandler(E+Y,X);
if(T.st.callbacks){Y=Y.charAt(0).toLowerCase()+Y.slice(1);
if(T.st.callbacks[Y]){T.st.callbacks[Y].apply(T,D.isArray(X)?X:[X])
}}},F=function(X){if(X!==M||!T.currTemplate.closeBtn){T.currTemplate.closeBtn=D(T.st.closeMarkup.replace("%title%",T.st.tClose));
M=X
}return T.currTemplate.closeBtn
},u=function(){if(!D.magnificPopup.instance){T=new A();
T.init();
D.magnificPopup.instance=T
}},W=function(){var Y=document.createElement("p").style,X=["ms","O","Moz","Webkit"];
if(Y.transition!==undefined){return true
}while(X.length){if(X.pop()+"Transition" in Y){return true
}}return false
};
A.prototype={constructor:A,init:function(){var X=navigator.appVersion;
T.isIE7=X.indexOf("MSIE 7.")!==-1;
T.isIE8=X.indexOf("MSIE 8.")!==-1;
T.isLowIE=T.isIE7||T.isIE8;
T.isAndroid=(/android/gi).test(X);
T.isIOS=(/iphone|ipad|ipod/gi).test(X);
T.supportsTransition=W();
T.probablyMobile=(T.isAndroid||T.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent));
B=D(document);
T.popupsCache={}
},open:function(ac){var ad;
if(ac.isObj===false){T.items=ac.items.toArray();
T.index=0;
var ae=ac.items,af;
for(ad=0;
ad<ae.length;
ad++){af=ae[ad];
if(af.parsed){af=af.el[0]
}if(af===ac.el[0]){T.index=ad;
break
}}}else{T.items=D.isArray(ac.items)?ac.items:[ac.items];
T.index=ac.index||0
}if(T.isOpen){T.updateItemHTML();
return
}T.types=[];
b="";
if(ac.mainEl&&ac.mainEl.length){T.ev=ac.mainEl.eq(0)
}else{T.ev=B
}if(ac.key){if(!T.popupsCache[ac.key]){T.popupsCache[ac.key]={}
}T.currTemplate=T.popupsCache[ac.key]
}else{T.currTemplate={}
}T.st=D.extend(true,{},D.magnificPopup.defaults,ac);
T.fixedContentPos=T.st.fixedContentPos==="auto"?!T.probablyMobile:T.st.fixedContentPos;
if(T.st.modal){T.st.closeOnContentClick=false;
T.st.closeOnBgClick=false;
T.st.showCloseBtn=false;
T.st.enableEscapeKey=false
}if(!T.bgOverlay){T.bgOverlay=o("bg").on("click"+d,function(){T.close()
});
T.wrap=o("wrap").attr("tabindex",-1).on("click"+d,function(ah){if(T._checkIfClose(ah.target)){T.close()
}});
T.container=o("container",T.wrap)
}T.contentContainer=o("content");
if(T.st.preloader){T.preloader=o("preloader",T.container,T.st.tLoading)
}var ab=D.magnificPopup.modules;
for(ad=0;
ad<ab.length;
ad++){var aa=ab[ad];
aa=aa.charAt(0).toUpperCase()+aa.slice(1);
T["init"+aa].call(T)
}Q("BeforeOpen");
if(T.st.showCloseBtn){if(!T.st.closeBtnInside){T.wrap.append(F())
}else{j(f,function(ak,ai,ah,aj){ah.close_replaceWith=F(aj.type)
});
b+=" mfp-close-btn-in"
}}if(T.st.alignTop){b+=" mfp-align-top"
}if(T.fixedContentPos){T.wrap.css({overflow:T.st.overflowY,overflowX:"hidden",overflowY:T.st.overflowY})
}else{T.wrap.css({top:a.scrollTop(),position:"absolute"})
}if(T.st.fixedBgPos===false||(T.st.fixedBgPos==="auto"&&!T.fixedContentPos)){T.bgOverlay.css({height:B.height(),position:"absolute"})
}if(T.st.enableEscapeKey){B.on("keyup"+d,function(ah){if(ah.keyCode===27){T.close()
}})
}a.on("resize"+d,function(){T.updateSize()
});
if(!T.st.closeOnContentClick){b+=" mfp-auto-cursor"
}if(b){T.wrap.addClass(b)
}var X=T.wH=a.height();
var Z={};
if(T.fixedContentPos){if(T._hasScrollBar(X)){var ag=T._getScrollbarSize();
if(ag){Z.marginRight=ag
}}}if(T.fixedContentPos){if(!T.isIE7){Z.overflow="hidden"
}else{D("body, html").css("overflow","hidden")
}}var Y=T.st.mainClass;
if(T.isIE7){Y+=" mfp-ie7"
}if(Y){T._addClassToMFP(Y)
}T.updateItemHTML();
Q("BuildControls");
D("html").css(Z);
T.bgOverlay.add(T.wrap).prependTo(T.st.prependTo||D(document.body));
T._lastFocusedEl=document.activeElement;
setTimeout(function(){if(T.content){T._addClassToMFP(J);
T._setFocus()
}else{T.bgOverlay.addClass(J)
}B.on("focusin"+d,T._onFocusIn)
},16);
T.isOpen=true;
T.updateSize(X);
Q(l);
return ac
},close:function(){if(!T.isOpen){return
}Q(I);
T.isOpen=false;
if(T.st.removalDelay&&!T.isLowIE&&T.supportsTransition){T._addClassToMFP(L);
setTimeout(function(){T._close()
},T.st.removalDelay)
}else{T._close()
}},_close:function(){Q(z);
var X=L+" "+J+" ";
T.bgOverlay.detach();
T.wrap.detach();
T.container.empty();
if(T.st.mainClass){X+=T.st.mainClass+" "
}T._removeClassFromMFP(X);
if(T.fixedContentPos){var Y={marginRight:""};
if(T.isIE7){D("body, html").css("overflow","")
}else{Y.overflow=""
}D("html").css(Y)
}B.off("keyup"+d+" focusin"+d);
T.ev.off(d);
T.wrap.attr("class","mfp-wrap").removeAttr("style");
T.bgOverlay.attr("class","mfp-bg");
T.container.attr("class","mfp-container");
if(T.st.showCloseBtn&&(!T.st.closeBtnInside||T.currTemplate[T.currItem.type]===true)){if(T.currTemplate.closeBtn){T.currTemplate.closeBtn.detach()
}}if(T._lastFocusedEl){D(T._lastFocusedEl).focus()
}T.currItem=null;
T.content=null;
T.currTemplate=null;
T.prevHeight=0;
Q(x)
},updateSize:function(Y){if(T.isIOS){var Z=document.documentElement.clientWidth/window.innerWidth;
var X=window.innerHeight*Z;
T.wrap.css("height",X);
T.wH=X
}else{T.wH=Y||a.height()
}if(!T.fixedContentPos){T.wrap.css("height",T.wH)
}Q("Resize")
},updateItemHTML:function(){var aa=T.items[T.index];
T.contentContainer.detach();
if(T.content){T.content.detach()
}if(!aa.parsed){aa=T.parseEl(T.index)
}var Z=aa.type;
Q("BeforeChange",[T.currItem?T.currItem.type:"",Z]);
T.currItem=aa;
if(!T.currTemplate[Z]){var Y=T.st[Z]?T.st[Z].markup:false;
Q("FirstMarkupParse",Y);
if(Y){T.currTemplate[Z]=D(Y)
}else{T.currTemplate[Z]=true
}}if(G&&G!==aa.type){T.container.removeClass("mfp-"+G+"-holder")
}var X=T["get"+Z.charAt(0).toUpperCase()+Z.slice(1)](aa,T.currTemplate[Z]);
T.appendContent(X,Z);
aa.preloaded=true;
Q(h,aa);
G=aa.type;
T.container.prepend(T.contentContainer);
Q("AfterChange")
},appendContent:function(X,Y){T.content=X;
if(X){if(T.st.showCloseBtn&&T.st.closeBtnInside&&T.currTemplate[Y]===true){if(!T.content.find(".mfp-close").length){T.content.append(F())
}}else{T.content=X
}}else{T.content=""
}Q(O);
T.container.addClass("mfp-"+Y+"-holder");
T.contentContainer.append(T.content)
},parseEl:function(X){var ab=T.items[X],aa;
if(ab.tagName){ab={el:D(ab)}
}else{aa=ab.type;
ab={data:ab,src:ab.src}
}if(ab.el){var Z=T.types;
for(var Y=0;
Y<Z.length;
Y++){if(ab.el.hasClass("mfp-"+Z[Y])){aa=Z[Y];
break
}}ab.src=ab.el.attr("data-mfp-src");
if(!ab.src){ab.src=ab.el.attr("href")
}}ab.type=aa||T.st.type||"inline";
ab.index=X;
ab.parsed=true;
T.items[X]=ab;
Q("ElementParse",ab);
return T.items[X]
},addGroup:function(Z,Y){var aa=function(ab){ab.mfpEl=this;
T._openClick(ab,Z,Y)
};
if(!Y){Y={}
}var X="click.magnificPopup";
Y.mainEl=Z;
if(Y.items){Y.isObj=true;
Z.off(X).on(X,aa)
}else{Y.isObj=false;
if(Y.delegate){Z.off(X).on(X,Y.delegate,aa)
}else{Y.items=Z;
Z.off(X).on(X,aa)
}}},_openClick:function(ab,Z,X){var Y=X.midClick!==undefined?X.midClick:D.magnificPopup.defaults.midClick;
if(!Y&&(ab.which===2||ab.ctrlKey||ab.metaKey)){return
}var aa=X.disableOn!==undefined?X.disableOn:D.magnificPopup.defaults.disableOn;
if(aa){if(D.isFunction(aa)){if(!aa.call(T)){return true
}}else{if(a.width()<aa){return true
}}}if(ab.type){ab.preventDefault();
if(T.isOpen){ab.stopPropagation()
}}X.el=D(ab.mfpEl);
if(X.delegate){X.items=Z.find(X.delegate)
}T.open(X)
},updateStatus:function(X,Z){if(T.preloader){if(C!==X){T.container.removeClass("mfp-s-"+C)
}if(!Z&&X==="loading"){Z=T.st.tLoading
}var Y={status:X,text:Z};
Q("UpdateStatus",Y);
X=Y.status;
Z=Y.text;
T.preloader.html(Z);
T.preloader.find("a").on("click",function(aa){aa.stopImmediatePropagation()
});
T.container.addClass("mfp-s-"+X);
C=X
}},_checkIfClose:function(Z){if(D(Z).hasClass(e)){return
}var X=T.st.closeOnContentClick;
var Y=T.st.closeOnBgClick;
if(X&&Y){return true
}else{if(!T.content||D(Z).hasClass("mfp-close")||(T.preloader&&Z===T.preloader[0])){return true
}if((Z!==T.content[0]&&!D.contains(T.content[0],Z))){if(Y){if(D.contains(document,Z)){return true
}}}else{if(X){return true
}}}return false
},_addClassToMFP:function(X){T.bgOverlay.addClass(X);
T.wrap.addClass(X)
},_removeClassFromMFP:function(X){this.bgOverlay.removeClass(X);
T.wrap.removeClass(X)
},_hasScrollBar:function(X){return((T.isIE7?B.height():document.body.scrollHeight)>(X||a.height()))
},_setFocus:function(){(T.st.focus?T.content.find(T.st.focus).eq(0):T.wrap).focus()
},_onFocusIn:function(X){if(X.target!==T.wrap[0]&&!D.contains(T.wrap[0],X.target)){T._setFocus();
return false
}},_parseMarkup:function(Z,Y,aa){var X;
if(aa.data){Y=D.extend(aa.data,Y)
}Q(f,[Z,Y,aa]);
D.each(Y,function(ac,ae){if(ae===undefined||ae===false){return true
}X=ac.split("_");
if(X.length>1){var ad=Z.find(d+"-"+X[0]);
if(ad.length>0){var ab=X[1];
if(ab==="replaceWith"){if(ad[0]!==ae[0]){ad.replaceWith(ae)
}}else{if(ab==="img"){if(ad.is("img")){ad.attr("src",ae)
}else{ad.replaceWith('<img src="'+ae+'" class="'+ad.attr("class")+'" />')
}}else{ad.attr(X[1],ae)
}}}}else{Z.find(d+"-"+ac).html(ae)
}})
},_getScrollbarSize:function(){if(T.scrollbarSize===undefined){var X=document.createElement("div");
X.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;";
document.body.appendChild(X);
T.scrollbarSize=X.offsetWidth-X.clientWidth;
document.body.removeChild(X)
}return T.scrollbarSize
}};
D.magnificPopup={instance:null,proto:A.prototype,modules:[],open:function(Y,X){u();
if(!Y){Y={}
}else{Y=D.extend(true,{},Y)
}Y.isObj=true;
Y.index=X||0;
return this.instance.open(Y)
},close:function(){return D.magnificPopup.instance&&D.magnificPopup.instance.close()
},registerModule:function(X,Y){if(Y.options){D.magnificPopup.defaults[X]=Y.options
}D.extend(this.proto,Y.proto);
this.modules.push(X)
},defaults:{disableOn:0,key:null,midClick:false,mainClass:"",preloader:true,focus:"",closeOnContentClick:false,closeOnBgClick:true,closeBtnInside:true,showCloseBtn:true,enableEscapeKey:true,modal:false,alignTop:false,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&times;</button>',tClose:"Close (Esc)",tLoading:"Loading..."}};
D.fn.magnificPopup=function(Z){u();
var aa=D(this);
if(typeof Z==="string"){if(Z==="open"){var X,ab=K?aa.data("magnificPopup"):aa[0].magnificPopup,Y=parseInt(arguments[1],10)||0;
if(ab.items){X=ab.items[Y]
}else{X=aa;
if(ab.delegate){X=X.find(ab.delegate)
}X=X.eq(Y)
}T._openClick({mfpEl:X},aa,ab)
}else{if(T.isOpen){T[Z].apply(T,Array.prototype.slice.call(arguments,1))
}}}else{Z=D.extend(true,{},Z);
if(K){aa.data("magnificPopup",Z)
}else{aa[0].magnificPopup=Z
}T.addGroup(aa,Z)
}return aa
};
var H="inline",S,P,s,m=function(){if(s){P.after(s.addClass(S)).detach();
s=null
}};
D.magnificPopup.registerModule(H,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){T.types.push(H);
j(z+"."+H,function(){m()
})
},getInline:function(ab,aa){m();
if(ab.src){var X=T.st.inline,Z=D(ab.src);
if(Z.length){var Y=Z[0].parentNode;
if(Y&&Y.tagName){if(!P){S=X.hiddenClass;
P=o(S);
S="mfp-"+S
}s=Z.after(P).detach().removeClass(S)
}T.updateStatus("ready")
}else{T.updateStatus("error",X.tNotFound);
Z=D("<div>")
}ab.inlineElement=Z;
return Z
}T.updateStatus("ready");
T._parseMarkup(aa,{},ab);
return aa
}}});
var v="ajax",V,w=function(){if(V){D(document.body).removeClass(V)
}},U=function(){w();
if(T.req){T.req.abort()
}};
D.magnificPopup.registerModule(v,{options:{settings:null,cursor:"mfp-ajax-cur",tError:'<a href="%url%">The content</a> could not be loaded.'},proto:{initAjax:function(){T.types.push(v);
V=T.st.ajax.cursor;
j(z+"."+v,U);
j("BeforeChange."+v,U)
},getAjax:function(Y){if(V){D(document.body).addClass(V)
}T.updateStatus("loading");
var X=D.extend({url:Y.src,success:function(ab,ac,aa){var Z={data:ab,xhr:aa};
Q("ParseAjax",Z);
T.appendContent(D(Z.data),v);
Y.finished=true;
w();
T._setFocus();
setTimeout(function(){T.wrap.addClass(J)
},16);
T.updateStatus("ready");
Q("AjaxContentAdded")
},error:function(){w();
Y.finished=Y.loadError=true;
T.updateStatus("error",T.st.ajax.tError.replace("%url%",Y.src))
}},T.st.ajax.settings);
T.req=D.ajax(X);
return""
}}});
var g,c=function(X){if(X.data&&X.data.title!==undefined){return X.data.title
}var Y=T.st.image.titleSrc;
if(Y){if(D.isFunction(Y)){return Y.call(T,X)
}else{if(X.el){return X.el.attr(Y)||""
}}}return""
};
D.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:true,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var Y=T.st.image,X=".image";
T.types.push("image");
j(l+X,function(){if(T.currItem.type==="image"&&Y.cursor){D(document.body).addClass(Y.cursor)
}});
j(z+X,function(){if(Y.cursor){D(document.body).removeClass(Y.cursor)
}a.off("resize"+d)
});
j("Resize"+X,T.resizeImage);
if(T.isLowIE){j("AfterChange",T.resizeImage)
}},resizeImage:function(){var Y=T.currItem;
if(!Y||!Y.img){return
}if(T.st.image.verticalFit){var X=0;
if(T.isLowIE){X=parseInt(Y.img.css("padding-top"),10)+parseInt(Y.img.css("padding-bottom"),10)
}Y.img.css("max-height",T.wH-X)
}},_onImageHasSize:function(X){if(X.img){X.hasSize=true;
if(g){clearInterval(g)
}X.isCheckingImgSize=false;
Q("ImageHasSize",X);
if(X.imgHidden){if(T.content){T.content.removeClass("mfp-loading")
}X.imgHidden=false
}}},findImageSize:function(aa){var X=0,Y=aa.img[0],Z=function(ab){if(g){clearInterval(g)
}g=setInterval(function(){if(Y.naturalWidth>0){T._onImageHasSize(aa);
return
}if(X>200){clearInterval(g)
}X++;
if(X===3){Z(10)
}else{if(X===40){Z(50)
}else{if(X===100){Z(500)
}}}},ab)
};
Z(1)
},getImage:function(ad,aa){var ac=0,ae=function(){if(ad){if(ad.img[0].complete){ad.img.off(".mfploader");
if(ad===T.currItem){T._onImageHasSize(ad);
T.updateStatus("ready")
}ad.hasSize=true;
ad.loaded=true;
Q("ImageLoadComplete")
}else{ac++;
if(ac<200){setTimeout(ae,100)
}else{X()
}}}},X=function(){if(ad){ad.img.off(".mfploader");
if(ad===T.currItem){T._onImageHasSize(ad);
T.updateStatus("error",ab.tError.replace("%url%",ad.src))
}ad.hasSize=true;
ad.loaded=true;
ad.loadError=true
}},ab=T.st.image;
var Z=aa.find(".mfp-img");
if(Z.length){var Y=document.createElement("img");
Y.className="mfp-img";
if(ad.el&&ad.el.find("img").length){Y.alt=ad.el.find("img").attr("alt")
}ad.img=D(Y).on("load.mfploader",ae).on("error.mfploader",X);
Y.src=ad.src;
if(Z.is("img")){ad.img=ad.img.clone()
}Y=ad.img[0];
if(Y.naturalWidth>0){ad.hasSize=true
}else{if(!Y.width){ad.hasSize=false
}}}T._parseMarkup(aa,{title:c(ad),img_replaceWith:ad.img},ad);
T.resizeImage();
if(ad.hasSize){if(g){clearInterval(g)
}if(ad.loadError){aa.addClass("mfp-loading");
T.updateStatus("error",ab.tError.replace("%url%",ad.src))
}else{aa.removeClass("mfp-loading");
T.updateStatus("ready")
}return aa
}T.updateStatus("loading");
ad.loading=true;
if(!ad.hasSize){ad.imgHidden=true;
aa.addClass("mfp-loading");
T.findImageSize(ad)
}return aa
}}});
var k,N=function(){if(k===undefined){k=document.createElement("p").style.MozTransform!==undefined
}return k
};
D.magnificPopup.registerModule("zoom",{options:{enabled:false,easing:"ease-in-out",duration:300,opener:function(X){return X.is("img")?X:X.find("img")
}},proto:{initZoom:function(){var Y=T.st.zoom,ab=".zoom",ae;
if(!Y.enabled||!T.supportsTransition){return
}var ad=Y.duration,ac=function(ah){var ag=ah.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),ai="all "+(Y.duration/1000)+"s "+Y.easing,aj={position:"fixed",zIndex:9999,left:0,top:0},af="transition";
aj["-webkit-"+af]=aj["-moz-"+af]=aj["-o-"+af]=aj[af]=ai;
ag.css(aj);
return ag
},X=function(){T.content.css("visibility","visible")
},Z,aa;
j("BuildControls"+ab,function(){if(T._allowZoom()){clearTimeout(Z);
T.content.css("visibility","hidden");
ae=T._getItemToZoom();
if(!ae){X();
return
}aa=ac(ae);
aa.css(T._getOffset());
T.wrap.append(aa);
Z=setTimeout(function(){aa.css(T._getOffset(true));
Z=setTimeout(function(){X();
setTimeout(function(){aa.remove();
ae=aa=null;
Q("ZoomAnimationEnded")
},16)
},ad)
},16)
}});
j(I+ab,function(){if(T._allowZoom()){clearTimeout(Z);
T.st.removalDelay=ad;
if(!ae){ae=T._getItemToZoom();
if(!ae){return
}aa=ac(ae)
}aa.css(T._getOffset(true));
T.wrap.append(aa);
T.content.css("visibility","hidden");
setTimeout(function(){aa.css(T._getOffset())
},16)
}});
j(z+ab,function(){if(T._allowZoom()){X();
if(aa){aa.remove()
}ae=null
}})
},_allowZoom:function(){return T.currItem.type==="image"
},_getItemToZoom:function(){if(T.currItem.hasSize){return T.currItem.img
}else{return false
}},_getOffset:function(Z){var X;
if(Z){X=T.currItem.img
}else{X=T.st.zoom.opener(T.currItem.el||T.currItem)
}var ac=X.offset();
var Y=parseInt(X.css("padding-top"),10);
var ab=parseInt(X.css("padding-bottom"),10);
ac.top-=(D(window).scrollTop()-Y);
var aa={width:X.width(),height:(K?X.innerHeight():X[0].offsetHeight)-ab-Y};
if(N()){aa["-moz-transform"]=aa.transform="translate("+ac.left+"px,"+ac.top+"px)"
}else{aa.left=ac.left;
aa.top=ac.top
}return aa
}}});
var r="iframe",q="//about:blank",R=function(X){if(T.currTemplate[r]){var Y=T.currTemplate[r].find("iframe");
if(Y.length){if(!X){Y[0].src=q
}if(T.isIE8){Y.css("display",X?"block":"none")
}}}};
D.magnificPopup.registerModule(r,{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){T.types.push(r);
j("BeforeChange",function(Z,X,Y){if(X!==Y){if(X===r){R()
}else{if(Y===r){R(true)
}}}});
j(z+"."+r,function(){R()
})
},getIframe:function(ab,aa){var X=ab.src;
var Z=T.st.iframe;
D.each(Z.patterns,function(){if(X.indexOf(this.index)>-1){if(this.id){if(typeof this.id==="string"){X=X.substr(X.lastIndexOf(this.id)+this.id.length,X.length)
}else{X=this.id.call(this,X)
}}X=this.src.replace("%id%",X);
return false
}});
var Y={};
if(Z.srcAction){Y[Z.srcAction]=X
}T._parseMarkup(aa,Y,ab);
T.updateStatus("ready");
return aa
}}});
var y=function(X){var Y=T.items.length;
if(X>Y-1){return X-Y
}else{if(X<0){return Y+X
}}return X
},p=function(Z,Y,X){return Z.replace(/%curr%/gi,Y+1).replace(/%total%/gi,X)
};
D.magnificPopup.registerModule("gallery",{options:{enabled:false,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:true,arrows:true,tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var X=T.st.gallery,Z=".mfp-gallery",Y=Boolean(D.fn.mfpFastClick);
T.direction=true;
if(!X||!X.enabled){return false
}b+=" mfp-gallery";
j(l+Z,function(){if(X.navigateByImgClick){T.wrap.on("click"+Z,".mfp-img",function(){if(T.items.length>1){T.next();
return false
}})
}B.on("keydown"+Z,function(aa){if(aa.keyCode===37){T.prev()
}else{if(aa.keyCode===39){T.next()
}}})
});
j("UpdateStatus"+Z,function(ab,aa){if(aa.text){aa.text=p(aa.text,T.currItem.index,T.items.length)
}});
j(f+Z,function(ae,ac,ab,ad){var aa=T.items.length;
ab.counter=aa>1?p(X.tCounter,ad.index,aa):""
});
j("BuildControls"+Z,function(){if(T.items.length>1&&X.arrows&&!T.arrowLeft){var ac=X.arrowMarkup,ad=T.arrowLeft=D(ac.replace(/%title%/gi,X.tPrev).replace(/%dir%/gi,"left")).addClass(e),ab=T.arrowRight=D(ac.replace(/%title%/gi,X.tNext).replace(/%dir%/gi,"right")).addClass(e);
var aa=Y?"mfpFastClick":"click";
ad[aa](function(){T.prev()
});
ab[aa](function(){T.next()
});
if(T.isIE7){o("b",ad[0],false,true);
o("a",ad[0],false,true);
o("b",ab[0],false,true);
o("a",ab[0],false,true)
}T.container.append(ad.add(ab))
}});
j(h+Z,function(){if(T._preloadTimeout){clearTimeout(T._preloadTimeout)
}T._preloadTimeout=setTimeout(function(){T.preloadNearbyImages();
T._preloadTimeout=null
},16)
});
j(z+Z,function(){B.off(Z);
T.wrap.off("click"+Z);
if(T.arrowLeft&&Y){T.arrowLeft.add(T.arrowRight).destroyMfpFastClick()
}T.arrowRight=T.arrowLeft=null
})
},next:function(){T.direction=true;
T.index=y(T.index+1);
T.updateItemHTML()
},prev:function(){T.direction=false;
T.index=y(T.index-1);
T.updateItemHTML()
},goTo:function(X){T.direction=(X>=T.index);
T.index=X;
T.updateItemHTML()
},preloadNearbyImages:function(){var aa=T.st.gallery.preload,Y=Math.min(aa[0],T.items.length),Z=Math.min(aa[1],T.items.length),X;
for(X=1;
X<=(T.direction?Z:Y);
X++){T._preloadItem(T.index+X)
}for(X=1;
X<=(T.direction?Y:Z);
X++){T._preloadItem(T.index-X)
}},_preloadItem:function(X){X=y(X);
if(T.items[X].preloaded){return
}var Y=T.items[X];
if(!Y.parsed){Y=T.parseEl(X)
}Q("LazyLoad",Y);
if(Y.type==="image"){Y.img=D('<img class="mfp-img" />').on("load.mfploader",function(){Y.hasSize=true
}).on("error.mfploader",function(){Y.hasSize=true;
Y.loadError=true;
Q("LazyLoadError",Y)
}).attr("src",Y.src)
}Y.preloaded=true
}}});
var n="retina";
D.magnificPopup.registerModule(n,{options:{replaceSrc:function(X){return X.src.replace(/\.\w+$/,function(Y){return"@2x"+Y
})
},ratio:1},proto:{initRetina:function(){if(window.devicePixelRatio>1){var X=T.st.retina,Y=X.ratio;
Y=!isNaN(Y)?Y:Y();
if(Y>1){j("ImageHasSize."+n,function(aa,Z){Z.img.css({"max-width":Z.img[0].naturalWidth/Y,width:"100%"})
});
j("ElementParse."+n,function(aa,Z){Z.src=X.replaceSrc(Z,Y)
})
}}}}});
(function(){var Y=1000,aa="ontouchstart" in window,ab=function(){a.off("touchmove"+Z+" touchend"+Z)
},X="mfpFastClick",Z="."+X;
D.fn.mfpFastClick=function(ac){return D(this).each(function(){var aj=D(this),ai;
if(aa){var ak,af,ae,ah,ad,ag;
aj.on("touchstart"+Z,function(al){ah=false;
ag=1;
ad=al.originalEvent?al.originalEvent.touches[0]:al.touches[0];
af=ad.clientX;
ae=ad.clientY;
a.on("touchmove"+Z,function(am){ad=am.originalEvent?am.originalEvent.touches:am.touches;
ag=ad.length;
ad=ad[0];
if(Math.abs(ad.clientX-af)>10||Math.abs(ad.clientY-ae)>10){ah=true;
ab()
}}).on("touchend"+Z,function(am){ab();
if(ah||ag>1){return
}ai=true;
am.preventDefault();
clearTimeout(ak);
ak=setTimeout(function(){ai=false
},Y);
ac()
})
})
}aj.on("click"+Z,function(){if(!ai){ac()
}})
})
};
D.fn.destroyMfpFastClick=function(){D(this).off("touchstart"+Z+" click"+Z);
if(aa){a.off("touchmove"+Z+" touchend"+Z)
}}
})();
u()
}));
/*! Tablesaw - v1.0.5 - 2015-02-19
 * https://github.com/filamentgroup/tablesaw
 * Copyright (c) 2015 Filament Group; Licensed MIT */
(function(b){var d=document.createElement("div"),a=d.getElementsByTagName("i"),c=b(document.documentElement);
d.innerHTML="<!--[if lte IE 8]><i></i><![endif]-->";
if(a[0]){c.addClass("ie-lte8")
}if(!("querySelector" in document)||(window.blackberry&&!window.WebKitPoint)||window.operamini){return
}else{c.addClass("tablesaw-enhanced");
b(function(){b(document).trigger("enhance.tablesaw")
})
}})(jQuery);
if(typeof Tablesaw==="undefined"){Tablesaw={i18n:{modes:["Stack","Swipe","Toggle"],columns:'Col<span class="a11y-sm">umn</span>s',columnBtnText:"Columns",columnsDialogError:"No eligible columns.",sort:"Sort"}}
}if(!Tablesaw.config){Tablesaw.config={}
}(function(g){var f="table",e={toolbar:"tablesaw-bar"},d={create:"tablesawcreate",destroy:"tablesawdestroy",refresh:"tablesawrefresh"},c="stack",b="table[data-tablesaw-mode],table[data-tablesaw-sortable]";
var a=function(h){if(!h){throw new Error("Tablesaw requires an element.")
}this.table=h;
this.$table=g(h);
this.mode=this.$table.attr("data-tablesaw-mode")||c;
this.init()
};
a.prototype.init=function(){if(!this.$table.attr("id")){this.$table.attr("id",f+"-"+Math.round(Math.random()*10000))
}this.createToolbar();
var h=this._initCells();
this.$table.trigger(d.create,[this,h])
};
a.prototype._initCells=function(){var j,k=this.table.querySelectorAll("thead tr"),h=this;
g(k).each(function(){var l=0;
g(this).children().each(function(){var n=parseInt(this.getAttribute("colspan"),10),o=":nth-child("+(l+1)+")";
j=l+1;
if(n){for(var m=0;
m<n-1;
m++){l++;
o+=", :nth-child("+(l+1)+")"
}}this.cells=h.$table.find("tr").not(g(k).eq(0)).not(this).children(o);
l++
})
});
return j
};
a.prototype.refresh=function(){this._initCells();
this.$table.trigger(d.refresh)
};
a.prototype.createToolbar=function(){var h=this.$table.prev("."+e.toolbar);
if(!h.length){h=g("<div>").addClass(e.toolbar).insertBefore(this.$table)
}this.$toolbar=h;
if(this.mode){this.$toolbar.addClass("mode-"+this.mode)
}};
a.prototype.destroy=function(){this.$table.prev("."+e.toolbar).each(function(){this.className=this.className.replace(/\bmode\-\w*\b/gi,"")
});
var h=this.$table.attr("id");
g(document).unbind("."+h);
g(window).unbind("."+h);
this.$table.trigger(d.destroy,[this]);
this.$table.removeAttr("data-tablesaw-mode");
this.$table.removeData(f)
};
g.fn[f]=function(){return this.each(function(){var j=g(this);
if(j.data(f)){return
}var h=new a(this);
j.data(f,h)
})
};
g(document).on("enhance.tablesaw",function(h){g(h.target).find(b)[f]()
})
}(jQuery));
(function(f,e,g){var b={stackTable:"tablesaw-stack",cellLabels:"tablesaw-cell-label",cellContentLabels:"tablesaw-cell-content"};
var d={obj:"tablesaw-stack"};
var a={labelless:"data-tablesaw-no-labels",hideempty:"data-tablesaw-hide-empty"};
var c=function(h){this.$table=e(h);
this.labelless=this.$table.is("["+a.labelless+"]");
this.hideempty=this.$table.is("["+a.hideempty+"]");
if(!this.labelless){this.allHeaders=this.$table.find("th")
}this.$table.data(d.obj,this)
};
c.prototype.init=function(k){this.$table.addClass(b.stackTable);
if(this.labelless){return
}var h=e(this.allHeaders);
var j=this.hideempty;
h.each(function(){var r=e(this),l=e(this.cells).filter(function(){return !e(this).parent().is("["+a.labelless+"]")&&(!j||!e(this).is(":empty"))
}),q=l.not(this).filter("thead th").length&&" tablesaw-cell-label-top",o=r.find(".tablesaw-sortable-btn"),m=o.length?o.html():r.html();
if(m!==""){if(q){var p=parseInt(e(this).attr("colspan"),10),n="";
if(p){n="td:nth-child("+p+"n + "+(k)+")"
}l.filter(n).prepend("<b class='"+b.cellLabels+q+"'>"+m+"</b>")
}else{l.wrapInner("<span class='"+b.cellContentLabels+"'></span>");
l.prepend("<b class='"+b.cellLabels+"'>"+m+"</b>")
}}})
};
c.prototype.destroy=function(){this.$table.removeClass(b.stackTable);
this.$table.find("."+b.cellLabels).remove();
this.$table.find("."+b.cellContentLabels).each(function(){e(this).replaceWith(this.childNodes)
})
};
e(document).on("tablesawcreate",function(l,k,h){if(k.mode==="stack"){var j=new c(k.table);
j.init(h)
}});
e(document).on("tablesawdestroy",function(j,h){if(h.mode==="stack"){e(h.table).data(d.obj).destroy()
}})
}(this,jQuery));
(function(d){var c="tablesawbtn",b=".btn",a={_create:function(){return d(this).each(function(){d(this).trigger("beforecreate."+c)[c]("_init").trigger("create."+c)
})
},_init:function(){var e=d(this),f=this.getElementsByTagName("select")[0];
if(f){d(this).addClass("btn-select")[c]("_select",f)
}return e
},_select:function(e){var f=function(j,p){var o=d(p).find("option"),h,n,m;
o.each(function(){var l=this;
if(l.selected){h=document.createTextNode(l.text)
}});
m=j.childNodes;
if(o.length>0){for(var k=0,g=m.length;
k<g;
k++){n=m[k];
if(n&&n.nodeType===3){j.replaceChild(h,n)
}}}};
f(this,e);
d(this).bind("change refresh",function(){f(this,e)
})
}};
d.fn[c]=function(g,f,e,h){return this.each(function(){if(g&&typeof(g)==="string"){return d.fn[c].prototype[g].call(this,f,e,h)
}if(d(this).data(c+"active")){return d(this)
}d(this).data(c+"active",true);
d.fn[c].prototype._create.call(this)
})
};
d.extend(d.fn[c].prototype,a);
d(document).on("enhance",function(f){d(b,f.target)[c]()
})
}(jQuery));
(function(c,a,d){var b=function(e){this.$table=a(e);
this.classes={columnToggleTable:"tablesaw-columntoggle",columnBtnContain:"tablesaw-columntoggle-btnwrap tablesaw-advance",columnBtn:"tablesaw-columntoggle-btn tablesaw-nav-btn down",popup:"tablesaw-columntoggle-popup",priorityPrefix:"tablesaw-priority-",toolbar:"tablesaw-bar"};
this.headers=this.$table.find("tr:first > th");
this.$table.data("tablesaw-coltoggle",this)
};
b.prototype.init=function(){var j,g,k,e,f,l,p=this;
this.$table.addClass(this.classes.columnToggleTable);
j=this.$table.attr("id");
g=j+"-popup";
l=a("<div class='"+this.classes.columnBtnContain+"'></div>");
k=a("<a href='#"+g+"' class='btn btn-micro "+this.classes.columnBtn+"' data-popup-link><span>"+Tablesaw.i18n.columnBtnText+"</span></a>");
e=a("<div class='dialog-table-coltoggle "+this.classes.popup+"' id='"+g+"'></div>");
f=a("<div class='btn-group'></div>");
var m=false;
a(this.headers).not("td").each(function(){var s=a(this),r=s.attr("data-tablesaw-priority"),q=s.add(this.cells);
if(r&&r!=="persist"){q.addClass(p.classes.priorityPrefix+r);
a("<label><input type='checkbox' checked>"+s.text()+"</label>").appendTo(f).children(0).data("cells",q);
m=true
}});
if(!m){f.append("<label>"+Tablesaw.i18n.columnsDialogError+"</label>")
}f.appendTo(e);
f.find('input[type="checkbox"]').on("change",function(r){var q=r.target.checked;
a(r.target).data("cells").toggleClass("tablesaw-cell-hidden",!q).toggleClass("tablesaw-cell-visible",q);
p.$table.trigger("tablesawcolumns")
});
k.appendTo(l);
l.appendTo(this.$table.prev("."+this.classes.toolbar));
var o;
function h(){l.addClass("visible");
k.removeClass("down").addClass("up");
a(document).unbind("click."+j,n);
window.clearTimeout(o);
o=window.setTimeout(function(){a(document).one("click."+j,n)
},15)
}function n(q){if(q&&a(q.target).closest("."+p.classes.popup).length){return
}a(document).unbind("click."+j);
k.removeClass("up").addClass("down");
l.removeClass("visible")
}k.on("click.tablesaw",function(q){q.preventDefault();
if(!l.is(".visible")){h()
}else{n()
}});
e.appendTo(l);
this.$menu=f;
a(window).on("resize."+j,function(){p.refreshToggle()
});
this.refreshToggle()
};
b.prototype.refreshToggle=function(){this.$menu.find("input").each(function(){var e=a(this);
this.checked=e.data("cells").eq(0).css("display")==="table-cell"
})
};
b.prototype.refreshPriority=function(){var e=this;
a(this.headers).not("td").each(function(){var h=a(this),g=h.attr("data-tablesaw-priority"),f=h.add(this.cells);
if(g&&g!=="persist"){f.addClass(e.classes.priorityPrefix+g)
}})
};
b.prototype.destroy=function(){this.$table.removeClass(this.classes.columnToggleTable);
this.$table.find("th, td").each(function(){var e=a(this);
e.removeClass("tablesaw-cell-hidden").removeClass("tablesaw-cell-visible");
this.className=this.className.replace(/\bui\-table\-priority\-\d\b/g,"")
})
};
a(document).on("tablesawcreate",function(h,g){if(g.mode==="columntoggle"){var f=new b(g.table);
f.init()
}});
a(document).on("tablesawdestroy",function(g,f){if(f.mode==="columntoggle"){a(f.table).data("tablesaw-coltoggle").destroy()
}})
}(this,jQuery));
(function(c,b,d){b.extend(Tablesaw.config,{swipe:{horizontalThreshold:15,verticalThreshold:30}});
function a(o){var G=b("<div class='tablesaw-advance'></div>"),m=b("<a href='#' class='tablesaw-nav-btn btn btn-micro left' title='Previous Column'></a>").appendTo(G),x=b("<a href='#' class='tablesaw-nav-btn btn btn-micro right' title='Next Column'></a>").appendTo(G),e="disabled",F="tablesaw-fix-persist",A=o.find("thead th"),l=A.not('[data-tablesaw-priority="persist"]'),s=[],p=b(document.head||"head"),q=o.attr("id"),u=b("html").is(".ie-lte8");
if(!A.length){throw new Error("tablesaw swipe: no header cells found. Are you using <th> inside of <thead>?")
}o.css("width","auto");
A.each(function(){s.push(b(this).outerWidth())
});
o.css("width","");
G.appendTo(o.prev(".tablesaw-bar"));
o.addClass("tablesaw-swipe");
if(!q){q="tableswipe-"+Math.round(Math.random()*10000);
o.attr("id",q)
}function E(H){return b(H.cells).add(H)
}function B(H){E(H).removeClass("tablesaw-cell-hidden")
}function g(H){E(H).addClass("tablesaw-cell-hidden")
}function y(H){E(H).addClass("tablesaw-cell-persist")
}function n(H){return b(H).is('[data-tablesaw-priority="persist"]')
}function w(){o.removeClass(F);
b("#"+q+"-persist").remove()
}function D(){var L="#"+q+".tablesaw-swipe ",K=[],H=o.width(),M=[],J;
A.each(function(N){var O;
if(n(this)){O=b(this).outerWidth();
if(O<H*0.75){M.push(N+"-"+O);
K.push(L+" .tablesaw-cell-persist:nth-child("+(N+1)+") { width: "+O+"px; }")
}}});
J=M.join("_");
o.addClass(F);
var I=b("#"+q+"-persist");
if(!I.length||I.data("hash")!==J){I.remove();
if(K.length){b("<style>"+K.join("\n")+"</style>").attr("id",q+"-persist").data("hash",J).appendTo(p)
}}}function k(){var I=[],H;
l.each(function(K){var L=b(this),J=L.css("display")==="none"||L.is(".tablesaw-cell-hidden");
if(!J&&!H){H=true;
I[0]=K
}else{if(J&&H){I[1]=K;
return false
}}});
return I
}function j(){var H=k();
return[H[1]-1,H[0]-1]
}function C(H){return H?k():j()
}function z(H){return H[1]>-1&&H[1]<l.length
}function f(){var H=o.attr("data-tablesaw-swipe-media");
return !H||("matchMedia" in c)&&c.matchMedia(H).matches
}function r(){if(!f()){return
}var M=20,L=o.parent().width(),K=[],J=0,I=[],H=A.length;
A.each(function(P){var Q=b(this),O=Q.is('[data-tablesaw-priority="persist"]');
K.push(O);
J+=s[P]+(O?0:M);
I.push(J);
if(O||J>L){H--
}});
var N=H===0;
A.each(function(O){if(K[O]){y(this);
return
}if(I[O]<=L||N){N=false;
B(this)
}else{g(this)
}});
if(!u){w()
}o.trigger("tablesawcolumns")
}function v(H){var I=C(H);
if(z(I)){if(isNaN(I[0])){if(H){I[0]=0
}else{I[0]=l.length-1
}}if(!u){D()
}g(l.get(I[0]));
B(l.get(I[1]));
o.trigger("tablesawcolumns")
}}m.add(x).click(function(H){v(!!b(H.target).closest(x).length);
H.preventDefault()
});
function h(I,H){return(I.touches||I.originalEvent.touches)[0][H]
}o.bind("touchstart.swipetoggle",function(K){var J=h(K,"pageX"),I=h(K,"pageY"),H,L;
b(c).off("resize",r);
b(this).bind("touchmove",function(N){H=h(N,"pageX");
L=h(N,"pageY");
var M=Tablesaw.config.swipe;
if(Math.abs(H-J)>M.horizontalThreshold&&Math.abs(L-I)<M.verticalThreshold){N.preventDefault()
}}).bind("touchend.swipetoggle",function(){var M=Tablesaw.config.swipe;
if(Math.abs(L-I)<M.verticalThreshold){if(H-J<-1*M.horizontalThreshold){v(true)
}if(H-J>M.horizontalThreshold){v(false)
}}window.setTimeout(function(){b(c).on("resize",r)
},300);
b(this).unbind("touchmove touchend")
})
}).bind("tablesawcolumns.swipetoggle",function(){m[z(j())?"removeClass":"addClass"](e);
x[z(k())?"removeClass":"addClass"](e)
}).bind("tablesawnext.swipetoggle",function(){v(true)
}).bind("tablesawprev.swipetoggle",function(){v(false)
}).bind("tablesawdestroy.swipetoggle",function(){var H=b(this);
H.removeClass("tablesaw-swipe");
H.prev(".tablesaw-bar").find(".tablesaw-advance").remove();
b(c).off("resize",r);
H.unbind(".swipetoggle")
});
r();
b(c).on("resize",r)
}b(document).on("tablesawcreate",function(g,f){if(f.mode==="swipe"){a(f.$table)
}})
}(this,jQuery));
(function(f){function g(j){return f.map(j.childNodes,function(l){var k=f(l);
if(k.is("input, select")){return k.val()
}else{if(k.hasClass("tablesaw-cell-label")){return
}}return f.trim(k.text())
}).join("")
}var e="tablesaw-sortable",c="table[data-"+e+"]",h="[data-"+e+"-switch]",b={defaultCol:"data-tablesaw-sortable-default-col"},d={head:e+"-head",ascend:e+"-ascending",descend:e+"-descending",switcher:e+"-switch",tableToolbar:"tablesaw-toolbar",sortButton:e+"-btn"},a={_create:function(j){return f(this).each(function(){var k=f(this).data("init"+e);
if(k){return false
}f(this).data("init"+e,true).trigger("beforecreate."+e)[e]("_init",j).trigger("create."+e)
})
},_init:function(){var k=f(this),q,l;
var n=function(){k.addClass(e)
},m=function(u){f.each(u,function(x,w){f(w).addClass(d.head)
})
},p=function(v,u){f.each(v,function(y,x){var w=f("<button class='"+d.sortButton+"'/>");
w.bind("click",{col:x},u);
f(x).wrapInner(w)
})
},s=function(u){f.each(u,function(y,w){var x=f(w);
x.removeAttr(b.defaultCol);
x.removeClass(d.ascend);
x.removeClass(d.descend)
})
},r=function(x){if(f(x.target).is("a[href]")){return
}x.stopPropagation();
var w=f(this).parent(),u=x.data.col,y=q.index(w);
s(w.siblings());
if(w.hasClass(d.descend)){k[e]("sortBy",u,true);
y+="_asc"
}else{k[e]("sortBy",u);
y+="_desc"
}if(l){l.find("select").val(y).trigger("refresh")
}w.parents("table").trigger("tablesawsorted");
x.preventDefault()
},j=function(u){f.each(u,function(v,x){var w=f(x);
if(w.is("["+b.defaultCol+"]")){if(!w.hasClass(d.descend)){w.addClass(d.ascend)
}}})
},o=function(v){l=f("<div>").addClass(d.switcher).addClass(d.tableToolbar).html(function(){var x=["<label>"+Tablesaw.i18n.sort+":"];
x.push('<span class="btn btn-small">&#160;<select>');
v.each(function(z){var C=f(this),y=C.is("["+b.defaultCol+"]"),A=C.hasClass(d.descend),B=false;
f(this.cells).slice(0,3).each(function(){if(!isNaN(parseInt(g(this),10))){B=true;
return false
}});
x.push("<option"+(y&&!A?" selected":"")+' value="'+z+'_asc">'+C.text()+" "+(B?"↑":"(A-Z)")+"</option>");
x.push("<option"+(y&&A?" selected":"")+' value="'+z+'_desc">'+C.text()+" "+(B?"↓":"(Z-A)")+"</option>")
});
x.push("</select></span></label>");
return x.join("")
});
var u=k.prev(".tablesaw-bar"),w=u.children().eq(0);
if(w.length){l.insertBefore(w)
}else{l.appendTo(u)
}l.find(".btn").tablesawbtn();
l.find("select").on("change",function(){var y=f(this).val().split("_"),x=v.eq(y[0]);
s(x.siblings());
k[e]("sortBy",x.get(0),y[1]==="asc")
})
};
n();
q=k.find("thead th[data-"+e+"-col]");
m(q);
p(q,r);
j(q);
if(k.is(h)){o(q,k.find("tbody tr:nth-child(-n+3)"))
}},getColumnNumber:function(j){return f(j).prevAll().length
},getTableRows:function(){return f(this).find("tbody tr")
},sortRows:function(u,j,l,k){var s,p,o;
var m=function(w){var v=[];
f.each(w,function(x,y){v.push({cell:g(f(y).children().get(j)),rowNum:x})
});
return v
},q=function(w,y){var v,x=/[^\-\+\d\.]/g;
if(w){v=function(A,z){if(y||!isNaN(parseFloat(A.cell))){return parseFloat(A.cell.replace(x,""))-parseFloat(z.cell.replace(x,""))
}else{return A.cell.toLowerCase()>z.cell.toLowerCase()?1:-1
}}
}else{v=function(A,z){if(y||!isNaN(parseFloat(A.cell))){return parseFloat(z.cell.replace(x,""))-parseFloat(A.cell.replace(x,""))
}else{return A.cell.toLowerCase()<z.cell.toLowerCase()?1:-1
}}
}return v
},r=function(w,z){var y=[],x,v,A;
for(x=0,v=w.length;
x<v;
x++){A=w[x].rowNum;
y.push(z[A])
}return y
};
s=m(u);
var n=f(k).data("tablesaw-sort");
p=(n&&typeof n==="function"?n(l):false)||q(l,f(k).is("[data-sortable-numeric]"));
o=s.sort(p);
u=r(o,u);
return u
},replaceTableRows:function(l){var k=f(this),j=k.find("tbody");
j.html(l)
},makeColDefault:function(k,j){var l=f(k);
l.attr(b.defaultCol,"true");
if(j){l.removeClass(d.descend);
l.addClass(d.ascend)
}else{l.removeClass(d.ascend);
l.addClass(d.descend)
}},sortBy:function(k,m){var l=f(this),j,n;
j=l[e]("getColumnNumber",k);
n=l[e]("getTableRows");
n=l[e]("sortRows",n,j,m,k);
l[e]("replaceTableRows",n);
l[e]("makeColDefault",k,m)
}};
f.fn[e]=function(k){var j=Array.prototype.slice.call(arguments,1),l;
if(k&&typeof(k)==="string"){l=f.fn[e].prototype[k].apply(this[0],j);
return(typeof l!=="undefined")?l:f(this)
}if(!f(this).data(e+"data")){f(this).data(e+"active",true);
f.fn[e].prototype._create.call(this,k)
}return f(this)
};
f.extend(f.fn[e].prototype,a);
f(document).on("tablesawcreate",function(k,j){if(j.$table.is(c)){j.$table[e]()
}})
}(jQuery));
(function(c,b,d){var e={attr:{init:"data-tablesaw-minimap"}};
function a(k){var j=b('<div class="tablesaw-advance minimap">'),m=b('<ul class="tablesaw-advance-dots">').appendTo(j),h="tablesaw-advance-dots-hide",l=k.find("thead th");
l.each(function(){m.append("<li><i></i></li>")
});
j.appendTo(k.prev(".tablesaw-bar"));
function f(n){var o=n.attr(e.attr.init);
return !o||c.matchMedia&&c.matchMedia(o).matches
}function g(){if(!f(k)){j.hide();
return
}j.show();
var n=m.find("li").removeClass(h);
k.find("thead th").each(function(o){if(b(this).css("display")==="none"){n.eq(o).addClass(h)
}})
}g();
b(c).on("resize",g);
k.bind("tablesawcolumns.minimap",function(){g()
}).bind("tablesawdestroy.minimap",function(){var n=b(this);
n.prev(".tablesaw-bar").find(".tablesaw-advance").remove();
b(c).off("resize",g);
n.unbind(".minimap")
})
}b(document).on("tablesawcreate",function(g,f){if((f.mode==="swipe"||f.mode==="columntoggle")&&f.$table.is("[ "+e.attr.init+"]")){a(f.$table)
}})
}(this,jQuery));
(function(c,b){var a={selectors:{init:"table[data-tablesaw-mode-switch]"},attributes:{excludeMode:"data-tablesaw-mode-exclude"},classes:{main:"tablesaw-modeswitch",toolbar:"tablesaw-toolbar"},modes:["stack","swipe","columntoggle"],init:function(j){var e=b(j),k=e.attr(a.attributes.excludeMode),d=e.prev(".tablesaw-bar"),h="",f=b("<div>").addClass(a.classes.main+" "+a.classes.toolbar).html(function(){var o=["<label>"+Tablesaw.i18n.columns+":"],p=e.attr("data-tablesaw-mode"),n;
o.push('<span class="btn btn-small">&#160;<select>');
for(var m=0,l=a.modes.length;
m<l;
m++){if(k&&k.toLowerCase()===a.modes[m]){continue
}n=p===a.modes[m];
if(n){h=a.modes[m]
}o.push("<option"+(n?" selected":"")+' value="'+a.modes[m]+'">'+Tablesaw.i18n.modes[m]+"</option>")
}o.push("</select></span></label>");
return o.join("")
});
var g=d.find(".tablesaw-advance").eq(0);
if(g.length){f.insertBefore(g)
}else{f.appendTo(d)
}f.find(".btn").tablesawbtn();
f.find("select").bind("change",a.onModeChange)
},onModeChange:function(){var g=b(this),e=g.closest("."+a.classes.main),d=g.closest(".tablesaw-bar").nextUntil(d).eq(0),f=g.val();
e.remove();
d.data("table").destroy();
d.attr("data-tablesaw-mode",f);
d.table()
}};
b(c.document).on("tablesawcreate",function(f,d){if(d.$table.is(a.selectors.init)){a.init(d.table)
}})
})(this,jQuery);
/*!
 * Masonry PACKAGED v3.3.0
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */
(function(c){var d=Array.prototype.slice;
function b(){}function a(f){if(!f){return
}function h(j){if(j.prototype.option){return
}j.prototype.option=function(k){if(!f.isPlainObject(k)){return
}this.options=f.extend(true,this.options,k)
}
}var e=typeof console==="undefined"?b:function(j){console.error(j)
};
function g(j,k){f.fn[j]=function(o){if(typeof o==="string"){var n=d.call(arguments,1);
for(var p=0,m=this.length;
p<m;
p++){var r=this[p];
var l=f.data(r,j);
if(!l){e("cannot call methods on "+j+" prior to initialization; attempted to call '"+o+"'");
continue
}if(!f.isFunction(l[o])||o.charAt(0)==="_"){e("no such method '"+o+"' for "+j+" instance");
continue
}var q=l[o].apply(l,n);
if(q!==undefined){return q
}}return this
}else{return this.each(function(){var s=f.data(this,j);
if(s){s.option(o);
s._init()
}else{s=new k(this,o);
f.data(this,j,s)
}})
}}
}f.bridget=function(j,k){h(k);
g(j,k)
};
return f.bridget
}if(typeof define==="function"&&define.amd){define("jquery-bridget/jquery.bridget",["jquery"],a)
}else{if(typeof exports==="object"){a(require("jquery"))
}else{a(c.jQuery)
}}})(window);
/*!
 * eventie v1.0.6
 * event binding helper
 *   eventie.bind( elem, 'click', myFn )
 *   eventie.unbind( elem, 'click', myFn )
 * MIT license
 */
(function(e){var b=document.documentElement;
var f=function(){};
function a(h){var g=e.event;
g.target=g.target||g.srcElement||h;
return g
}if(b.addEventListener){f=function(j,h,g){j.addEventListener(h,g,false)
}
}else{if(b.attachEvent){f=function(j,h,g){j[h+g]=g.handleEvent?function(){var k=a(j);
g.handleEvent.call(g,k)
}:function(){var k=a(j);
g.call(j,k)
};
j.attachEvent("on"+h,j[h+g])
}
}}var d=function(){};
if(b.removeEventListener){d=function(j,h,g){j.removeEventListener(h,g,false)
}
}else{if(b.detachEvent){d=function(k,h,g){k.detachEvent("on"+h,k[h+g]);
try{delete k[h+g]
}catch(j){k[h+g]=undefined
}}
}}var c={bind:f,unbind:d};
if(typeof define==="function"&&define.amd){define("eventie/eventie",c)
}else{if(typeof exports==="object"){module.exports=c
}else{e.eventie=c
}}})(window);
/*!
 * EventEmitter v4.2.11 - git.io/ee
 * Unlicense - http://unlicense.org/
 * Oliver Caldwell - http://oli.me.uk/
 * @preserve
 */
(function(){function c(){}var m=c.prototype;
var x=this;
var z=x.EventEmitter;
function h(B,C){var A=B.length;
while(A--){if(B[A].listener===C){return A
}}return -1
}function k(A){return function B(){return this[A].apply(this,arguments)
}
}m.getListeners=function v(A){var D=this._getEvents();
var B;
var C;
if(A instanceof RegExp){B={};
for(C in D){if(D.hasOwnProperty(C)&&A.test(C)){B[C]=D[C]
}}}else{B=D[A]||(D[A]=[])
}return B
};
m.flattenListeners=function s(C){var A=[];
var B;
for(B=0;
B<C.length;
B+=1){A.push(C[B].listener)
}return A
};
m.getListenersAsObject=function e(A){var C=this.getListeners(A);
var B;
if(C instanceof Array){B={};
B[A]=C
}return B||C
};
m.addListener=function f(A,D){var C=this.getListenersAsObject(A);
var E=typeof D==="object";
var B;
for(B in C){if(C.hasOwnProperty(B)&&h(C[B],D)===-1){C[B].push(E?D:{listener:D,once:false})
}}return this
};
m.on=k("addListener");
m.addOnceListener=function a(A,B){return this.addListener(A,{listener:B,once:true})
};
m.once=k("addOnceListener");
m.defineEvent=function q(A){this.getListeners(A);
return this
};
m.defineEvents=function r(A){for(var B=0;
B<A.length;
B+=1){this.defineEvent(A[B])
}return this
};
m.removeListener=function b(A,E){var D=this.getListenersAsObject(A);
var B;
var C;
for(C in D){if(D.hasOwnProperty(C)){B=h(D[C],E);
if(B!==-1){D[C].splice(B,1)
}}}return this
};
m.off=k("removeListener");
m.addListeners=function n(A,B){return this.manipulateListeners(false,A,B)
};
m.removeListeners=function u(A,B){return this.manipulateListeners(true,A,B)
};
m.manipulateListeners=function g(B,C,E){var D;
var F;
var G=B?this.removeListener:this.addListener;
var A=B?this.removeListeners:this.addListeners;
if(typeof C==="object"&&!(C instanceof RegExp)){for(D in C){if(C.hasOwnProperty(D)&&(F=C[D])){if(typeof F==="function"){G.call(this,D,F)
}else{A.call(this,D,F)
}}}}else{D=E.length;
while(D--){G.call(this,C,E[D])
}}return this
};
m.removeEvent=function p(A){var D=typeof A;
var C=this._getEvents();
var B;
if(D==="string"){delete C[A]
}else{if(A instanceof RegExp){for(B in C){if(C.hasOwnProperty(B)&&A.test(B)){delete C[B]
}}}else{delete this._events
}}return this
};
m.removeAllListeners=k("removeEvent");
m.emitEvent=function w(A,C){var F=this.getListenersAsObject(A);
var G;
var E;
var D;
var B;
for(D in F){if(F.hasOwnProperty(D)){E=F[D].length;
while(E--){G=F[D][E];
if(G.once===true){this.removeListener(A,G.listener)
}B=G.listener.apply(this,C||[]);
if(B===this._getOnceReturnValue()){this.removeListener(A,G.listener)
}}}}return this
};
m.trigger=k("emitEvent");
m.emit=function l(A){var B=Array.prototype.slice.call(arguments,1);
return this.emitEvent(A,B)
};
m.setOnceReturnValue=function j(A){this._onceReturnValue=A;
return this
};
m._getOnceReturnValue=function o(){if(this.hasOwnProperty("_onceReturnValue")){return this._onceReturnValue
}else{return true
}};
m._getEvents=function d(){return this._events||(this._events={})
};
c.noConflict=function y(){x.EventEmitter=z;
return c
};
if(typeof define==="function"&&define.amd){define("eventEmitter/EventEmitter",[],function(){return c
})
}else{if(typeof module==="object"&&module.exports){module.exports=c
}else{x.EventEmitter=c
}}}.call(this));
/*!
 * getStyleProperty v1.0.4
 * original by kangax
 * http://perfectionkills.com/feature-testing-css-properties/
 * MIT license
 */
(function(c){var d="Webkit Moz ms Ms O".split(" ");
var b=document.documentElement.style;
function a(h){if(!h){return
}if(typeof b[h]==="string"){return h
}h=h.charAt(0).toUpperCase()+h.slice(1);
var f;
for(var g=0,e=d.length;
g<e;
g++){f=d[g]+h;
if(typeof b[f]==="string"){return f
}}}if(typeof define==="function"&&define.amd){define("get-style-property/get-style-property",[],function(){return a
})
}else{if(typeof exports==="object"){module.exports=a
}else{c.getStyleProperty=a
}}})(window);
/*!
 * getSize v1.2.2
 * measure size of elements
 * MIT license
 */
(function(e,g){function b(k){var j=parseFloat(k);
var l=k.indexOf("%")===-1&&!isNaN(j);
return l&&j
}function d(){}var c=typeof console==="undefined"?d:function(j){console.error(j)
};
var a=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"];
function f(){var l={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0};
for(var k=0,j=a.length;
k<j;
k++){var m=a[k];
l[m]=0
}return l
}function h(p){var n=false;
var l,m,o;
function k(){if(n){return
}n=true;
var u=e.getComputedStyle;
l=(function(){var x=u?function(y){return u(y,null)
}:function(y){return y.currentStyle
};
return function w(z){var y=x(z);
if(!y){c("Style returned "+y+". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1")
}return y
}
})();
m=p("boxSizing");
if(m){var v=document.createElement("div");
v.style.width="200px";
v.style.padding="1px 2px 3px 4px";
v.style.borderStyle="solid";
v.style.borderWidth="1px 2px 3px 4px";
v.style[m]="border-box";
var r=document.body||document.documentElement;
r.appendChild(v);
var s=l(v);
o=b(s.width)===200;
r.removeChild(v)
}}function q(H){k();
if(typeof H==="string"){H=document.querySelector(H)
}if(!H||typeof H!=="object"||!H.nodeType){return
}var F=l(H);
if(F.display==="none"){return f()
}var y={};
y.width=H.offsetWidth;
y.height=H.offsetHeight;
var G=y.isBorderBox=!!(m&&F[m]&&F[m]==="border-box");
for(var C=0,D=a.length;
C<D;
C++){var A=a[C];
var B=F[A];
B=j(H,B);
var r=parseFloat(B);
y[A]=!isNaN(r)?r:0
}var E=y.paddingLeft+y.paddingRight;
var x=y.paddingTop+y.paddingBottom;
var J=y.marginLeft+y.marginRight;
var v=y.marginTop+y.marginBottom;
var I=y.borderLeftWidth+y.borderRightWidth;
var u=y.borderTopWidth+y.borderBottomWidth;
var s=G&&o;
var w=b(F.width);
if(w!==false){y.width=w+(s?0:E+I)
}var z=b(F.height);
if(z!==false){y.height=z+(s?0:x+u)
}y.innerWidth=y.width-(E+I);
y.innerHeight=y.height-(x+u);
y.outerWidth=y.width+J;
y.outerHeight=y.height+v;
return y
}function j(v,w){if(e.getComputedStyle||w.indexOf("%")===-1){return w
}var u=v.style;
var x=u.left;
var s=v.runtimeStyle;
var r=s&&s.left;
if(r){s.left=v.currentStyle.left
}u.left=w;
w=u.pixelLeft;
u.left=x;
if(r){s.left=r
}return w
}return q
}if(typeof define==="function"&&define.amd){define("get-size/get-size",["get-style-property/get-style-property"],h)
}else{if(typeof exports==="object"){module.exports=h(require("desandro-get-style-property"))
}else{e.getSize=h(e.getStyleProperty)
}}})(window);
/*!
 * docReady v1.0.4
 * Cross browser DOMContentLoaded event emitter
 * MIT license
 */
(function(e){var b=e.document;
var a=[];
function d(h){if(typeof h!=="function"){return
}if(d.isReady){h()
}else{a.push(h)
}}d.isReady=false;
function g(j){var h=j.type==="readystatechange"&&b.readyState!=="complete";
if(d.isReady||h){return
}c()
}function c(){d.isReady=true;
for(var j=0,h=a.length;
j<h;
j++){var k=a[j];
k()
}}function f(h){if(b.readyState==="complete"){c()
}else{h.bind(b,"DOMContentLoaded",g);
h.bind(b,"readystatechange",g);
h.bind(e,"load",g)
}return d
}if(typeof define==="function"&&define.amd){define("doc-ready/doc-ready",["eventie/eventie"],f)
}else{if(typeof exports==="object"){module.exports=f(require("eventie"))
}else{e.docReady=f(e.eventie)
}}})(window);
(function(h){var f=(function(){if(h.matches){return"matches"
}if(h.matchesSelector){return"matchesSelector"
}var n=["webkit","moz","ms","o"];
for(var l=0,k=n.length;
l<k;
l++){var m=n[l];
var o=m+"MatchesSelector";
if(h[o]){return o
}}})();
function d(l,k){return l[f](k)
}function g(l){if(l.parentNode){return
}var k=document.createDocumentFragment();
k.appendChild(l)
}function e(o,l){g(o);
var m=o.parentNode.querySelectorAll(l);
for(var n=0,k=m.length;
n<k;
n++){if(m[n]===o){return true
}}return false
}function c(l,k){g(l);
return d(l,k)
}var j;
if(f){var a=document.createElement("div");
var b=d(a,"div");
j=b?d:c
}else{j=e
}if(typeof define==="function"&&define.amd){define("matches-selector/matches-selector",[],function(){return j
})
}else{if(typeof exports==="object"){module.exports=j
}else{window.matchesSelector=j
}}})(Element.prototype);
(function(b,a){if(typeof define=="function"&&define.amd){define("fizzy-ui-utils/utils",["doc-ready/doc-ready","matches-selector/matches-selector"],function(d,c){return a(b,d,c)
})
}else{if(typeof exports=="object"){module.exports=a(b,require("doc-ready"),require("desandro-matches-selector"))
}else{b.fizzyUIUtils=a(b,b.docReady,b.matchesSelector)
}}}(window,function factory(f,e,d){var b={};
b.extend=function(k,j){for(var l in j){k[l]=j[l]
}return k
};
b.modulo=function(j,k){return((j%k)+k)%k
};
var a=Object.prototype.toString;
b.isArray=function(j){return a.call(j)=="[object Array]"
};
b.makeArray=function(m){var l=[];
if(b.isArray(m)){l=m
}else{if(m&&typeof m.length=="number"){for(var k=0,j=m.length;
k<j;
k++){l.push(m[k])
}}else{l.push(m)
}}return l
};
b.indexOf=Array.prototype.indexOf?function(j,k){return j.indexOf(k)
}:function(l,m){for(var k=0,j=l.length;
k<j;
k++){if(l[k]===m){return k
}}return -1
};
b.removeFrom=function(k,l){var j=b.indexOf(k,l);
if(j!=-1){k.splice(j,1)
}};
b.isElement=(typeof HTMLElement=="function"||typeof HTMLElement=="object")?function h(j){return j instanceof HTMLElement
}:function g(j){return j&&typeof j=="object"&&j.nodeType==1&&typeof j.nodeName=="string"
};
b.setText=(function(){var k;
function j(l,m){k=k||(document.documentElement.textContent!==undefined?"textContent":"innerText");
l[k]=m
}return j
})();
b.getParent=function(k,j){while(k!=document.body){k=k.parentNode;
if(d(k,j)){return k
}}};
b.getQueryElement=function(j){if(typeof j=="string"){return document.querySelector(j)
}return j
};
b.handleEvent=function(j){var k="on"+j.type;
if(this[k]){this[k](j)
}};
b.filterFindElements=function(k,m){k=b.makeArray(k);
var p=[];
for(var o=0,q=k.length;
o<q;
o++){var l=k[o];
if(!b.isElement(l)){continue
}if(m){if(d(l,m)){p.push(l)
}var r=l.querySelectorAll(m);
for(var n=0,s=r.length;
n<s;
n++){p.push(r[n])
}}else{p.push(l)
}}return p
};
b.debounceMethod=function(m,l,j){var n=m.prototype[l];
var k=l+"Timeout";
m.prototype[l]=function(){var p=this[k];
if(p){clearTimeout(p)
}var o=arguments;
var q=this;
this[k]=setTimeout(function(){n.apply(q,o);
delete q[k]
},j||100)
}
};
b.toDashed=function(j){return j.replace(/(.)([A-Z])/g,function(l,k,m){return k+"-"+m
}).toLowerCase()
};
var c=f.console;
b.htmlInit=function(j,k){e(function(){var r=b.toDashed(k);
var l=document.querySelectorAll(".js-"+r);
var s="data-"+r+"-options";
for(var n=0,o=l.length;
n<o;
n++){var m=l[n];
var p=m.getAttribute(s);
var w;
try{w=p&&JSON.parse(p)
}catch(q){if(c){c.error("Error parsing "+s+" on "+m.nodeName.toLowerCase()+(m.id?"#"+m.id:"")+": "+q)
}continue
}var u=new j(m,w);
var v=f.jQuery;
if(v){v.data(m,k,u)
}}})
};
return b
}));
(function(b,a){if(typeof define==="function"&&define.amd){define("outlayer/item",["eventEmitter/EventEmitter","get-size/get-size","get-style-property/get-style-property","fizzy-ui-utils/utils"],function(e,f,d,c){return a(b,e,f,d,c)
})
}else{if(typeof exports==="object"){module.exports=a(b,require("wolfy87-eventemitter"),require("get-size"),require("desandro-get-style-property"),require("fizzy-ui-utils"))
}else{b.Outlayer={};
b.Outlayer.Item=a(b,b.EventEmitter,b.getSize,b.getStyleProperty,b.fizzyUIUtils)
}}}(window,function factory(k,h,d,l,u){var r=k.getComputedStyle;
var f=r?function(w){return r(w,null)
}:function(w){return w.currentStyle
};
function g(w){for(var x in w){return false
}x=null;
return true
}var s=l("transition");
var o=l("transform");
var q=s&&o;
var m=!!l("perspective");
var a={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend",transition:"transitionend"}[s];
var e=["transform","transition","transitionDuration","transitionProperty"];
var p=(function(){var x={};
for(var y=0,w=e.length;
y<w;
y++){var A=e[y];
var z=l(A);
if(z&&z!==A){x[A]=z
}}return x
})();
function c(w,x){if(!w){return
}this.element=w;
this.layout=x;
this.position={x:0,y:0};
this._create()
}u.extend(c.prototype,h.prototype);
c.prototype._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}};
this.css({position:"absolute"})
};
c.prototype.handleEvent=function(w){var x="on"+w.type;
if(this[x]){this[x](w)
}};
c.prototype.getSize=function(){this.size=d(this.element)
};
c.prototype.css=function(y){var w=this.element.style;
for(var z in y){var x=p[z]||z;
w[x]=y[z]
}};
c.prototype.getPosition=function(){var B=f(this.element);
var z=this.layout.options;
var E=z.isOriginLeft;
var D=z.isOriginTop;
var w=parseInt(B[E?"left":"right"],10);
var C=parseInt(B[D?"top":"bottom"],10);
w=isNaN(w)?0:w;
C=isNaN(C)?0:C;
var A=this.layout.size;
w-=E?A.paddingLeft:A.paddingRight;
C-=D?A.paddingTop:A.paddingBottom;
this.position.x=w;
this.position.y=C
};
c.prototype.layoutPosition=function(){var A=this.layout.size;
var I=this.layout.options;
var z={};
var G=I.isOriginLeft?"paddingLeft":"paddingRight";
var B=I.isOriginLeft?"left":"right";
var C=I.isOriginLeft?"right":"left";
var F=this.position.x+A[G];
F=I.percentPosition&&!I.isHorizontal?((F/A.width)*100)+"%":F+"px";
z[B]=F;
z[C]="";
var D=I.isOriginTop?"paddingTop":"paddingBottom";
var H=I.isOriginTop?"top":"bottom";
var w=I.isOriginTop?"bottom":"top";
var E=this.position.y+A[D];
E=I.percentPosition&&I.isHorizontal?((E/A.height)*100)+"%":E+"px";
z[H]=E;
z[w]="";
this.css(z);
this.emitEvent("layout",[this])
};
var n=m?function(w,z){return"translate3d("+w+"px, "+z+"px, 0)"
}:function(w,z){return"translate("+w+"px, "+z+"px)"
};
c.prototype._transitionTo=function(H,G){this.getPosition();
var z=this.position.x;
var w=this.position.y;
var F=parseInt(H,10);
var E=parseInt(G,10);
var D=F===this.position.x&&E===this.position.y;
this.setPosition(H,G);
if(D&&!this.isTransitioning){this.layoutPosition();
return
}var C=H-z;
var B=G-w;
var A={};
var I=this.layout.options;
C=I.isOriginLeft?C:-C;
B=I.isOriginTop?B:-B;
A.transform=n(C,B);
this.transition({to:A,onTransitionEnd:{transform:this.layoutPosition},isCleaning:true})
};
c.prototype.goTo=function(w,z){this.setPosition(w,z);
this.layoutPosition()
};
c.prototype.moveTo=q?c.prototype._transitionTo:c.prototype.goTo;
c.prototype.setPosition=function(w,z){this.position.x=parseInt(w,10);
this.position.y=parseInt(z,10)
};
c.prototype._nonTransition=function(w){this.css(w.to);
if(w.isCleaning){this._removeStyles(w.to)
}for(var x in w.onTransitionEnd){w.onTransitionEnd[x].call(this)
}};
c.prototype._transition=function(w){if(!parseFloat(this.layout.options.transitionDuration)){this._nonTransition(w);
return
}var y=this._transn;
for(var z in w.onTransitionEnd){y.onEnd[z]=w.onTransitionEnd[z]
}for(z in w.to){y.ingProperties[z]=true;
if(w.isCleaning){y.clean[z]=true
}}if(w.from){this.css(w.from);
var x=this.element.offsetHeight;
x=null
}this.enableTransition(w.to);
this.css(w.to);
this.isTransitioning=true
};
var j=o&&(u.toDashed(o)+",opacity");
c.prototype.enableTransition=function(){if(this.isTransitioning){return
}this.css({transitionProperty:j,transitionDuration:this.layout.options.transitionDuration});
this.element.addEventListener(a,this,false)
};
c.prototype.transition=c.prototype[s?"_transition":"_nonTransition"];
c.prototype.onwebkitTransitionEnd=function(w){this.ontransitionend(w)
};
c.prototype.onotransitionend=function(w){this.ontransitionend(w)
};
var v={"-webkit-transform":"transform","-moz-transform":"transform","-o-transform":"transform"};
c.prototype.ontransitionend=function(z){if(z.target!==this.element){return
}var y=this._transn;
var w=v[z.propertyName]||z.propertyName;
delete y.ingProperties[w];
if(g(y.ingProperties)){this.disableTransition()
}if(w in y.clean){this.element.style[z.propertyName]="";
delete y.clean[w]
}if(w in y.onEnd){var x=y.onEnd[w];
x.call(this);
delete y.onEnd[w]
}this.emitEvent("transitionEnd",[this])
};
c.prototype.disableTransition=function(){this.removeTransitionStyles();
this.element.removeEventListener(a,this,false);
this.isTransitioning=false
};
c.prototype._removeStyles=function(x){var w={};
for(var y in x){w[y]=""
}this.css(w)
};
var b={transitionProperty:"",transitionDuration:""};
c.prototype.removeTransitionStyles=function(){this.css(b)
};
c.prototype.removeElem=function(){this.element.parentNode.removeChild(this.element);
this.css({display:""});
this.emitEvent("remove",[this])
};
c.prototype.remove=function(){if(!s||!parseFloat(this.layout.options.transitionDuration)){this.removeElem();
return
}var w=this;
this.once("transitionEnd",function(){w.removeElem()
});
this.hide()
};
c.prototype.reveal=function(){delete this.isHidden;
this.css({display:""});
var x=this.layout.options;
var y={};
var w=this.getHideRevealTransitionEndProperty("visibleStyle");
y[w]=this.onRevealTransitionEnd;
this.transition({from:x.hiddenStyle,to:x.visibleStyle,isCleaning:true,onTransitionEnd:y})
};
c.prototype.onRevealTransitionEnd=function(){if(!this.isHidden){this.emitEvent("reveal")
}};
c.prototype.getHideRevealTransitionEndProperty=function(x){var w=this.layout.options[x];
if(w.opacity){return"opacity"
}for(var y in w){return y
}};
c.prototype.hide=function(){this.isHidden=true;
this.css({display:""});
var x=this.layout.options;
var y={};
var w=this.getHideRevealTransitionEndProperty("hiddenStyle");
y[w]=this.onHideTransitionEnd;
this.transition({from:x.visibleStyle,to:x.hiddenStyle,isCleaning:true,onTransitionEnd:y})
};
c.prototype.onHideTransitionEnd=function(){if(this.isHidden){this.css({display:"none"});
this.emitEvent("hide")
}};
c.prototype.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})
};
return c
}));
/*!
 * Outlayer v1.4.0
 * the brains and guts of a layout library
 * MIT license
 */
(function(b,a){if(typeof define=="function"&&define.amd){define("outlayer/outlayer",["eventie/eventie","eventEmitter/EventEmitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(d,f,g,c,e){return a(b,d,f,g,c,e)
})
}else{if(typeof exports=="object"){module.exports=a(b,require("eventie"),require("wolfy87-eventemitter"),require("get-size"),require("fizzy-ui-utils"),require("./item"))
}else{b.Outlayer=a(b,b.eventie,b.EventEmitter,b.getSize,b.fizzyUIUtils,b.Outlayer.Item)
}}}(window,function factory(f,h,m,k,g,b){var c=f.console;
var l=f.jQuery;
var j=function(){};
var e=0;
var a={};
function d(p,o){var n=g.getQueryElement(p);
if(!n){if(c){c.error("Bad element for "+this.constructor.namespace+": "+(n||p))
}return
}this.element=n;
if(l){this.$element=l(this.element)
}this.options=g.extend({},this.constructor.defaults);
this.option(o);
var q=++e;
this.element.outlayerGUID=q;
a[q]=this;
this._create();
if(this.options.isInitLayout){this.layout()
}}d.namespace="outlayer";
d.Item=b;
d.defaults={containerStyle:{position:"relative"},isInitLayout:true,isOriginLeft:true,isOriginTop:true,isResizeBound:true,isResizingContainer:true,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}};
g.extend(d.prototype,m.prototype);
d.prototype.option=function(n){g.extend(this.options,n)
};
d.prototype._create=function(){this.reloadItems();
this.stamps=[];
this.stamp(this.options.stamp);
g.extend(this.element.style,this.options.containerStyle);
if(this.options.isResizeBound){this.bindResize()
}};
d.prototype.reloadItems=function(){this.items=this._itemize(this.element.children)
};
d.prototype._itemize=function(p){var s=this._filterFindItemElements(p);
var q=this.constructor.Item;
var o=[];
for(var r=0,n=s.length;
r<n;
r++){var v=s[r];
var u=new q(v,this);
o.push(u)
}return o
};
d.prototype._filterFindItemElements=function(n){return g.filterFindElements(n,this.options.itemSelector)
};
d.prototype.getItemElements=function(){var o=[];
for(var p=0,n=this.items.length;
p<n;
p++){o.push(this.items[p].element)
}return o
};
d.prototype.layout=function(){this._resetLayout();
this._manageStamps();
var n=this.options.isLayoutInstant!==undefined?this.options.isLayoutInstant:!this._isLayoutInited;
this.layoutItems(this.items,n);
this._isLayoutInited=true
};
d.prototype._init=d.prototype.layout;
d.prototype._resetLayout=function(){this.getSize()
};
d.prototype.getSize=function(){this.size=k(this.element)
};
d.prototype._getMeasurement=function(p,n){var o=this.options[p];
var q;
if(!o){this[p]=0
}else{if(typeof o==="string"){q=this.element.querySelector(o)
}else{if(g.isElement(o)){q=o
}}this[p]=q?k(q)[n]:o
}};
d.prototype.layoutItems=function(n,o){n=this._getItemsForLayout(n);
this._layoutItems(n,o);
this._postLayout()
};
d.prototype._getItemsForLayout=function(o){var r=[];
for(var p=0,n=o.length;
p<n;
p++){var q=o[p];
if(!q.isIgnored){r.push(q)
}}return r
};
d.prototype._layoutItems=function(q,u){this._emitCompleteOnItems("layout",q);
if(!q||!q.length){return
}var p=[];
for(var r=0,o=q.length;
r<o;
r++){var s=q[r];
var n=this._getItemLayoutPosition(s);
n.item=s;
n.isInstant=u||s.isLayoutInstant;
p.push(n)
}this._processLayoutQueue(p)
};
d.prototype._getItemLayoutPosition=function(){return{x:0,y:0}
};
d.prototype._processLayoutQueue=function(o){for(var p=0,n=o.length;
p<n;
p++){var q=o[p];
this._positionItem(q.item,q.x,q.y,q.isInstant)
}};
d.prototype._positionItem=function(o,n,q,p){if(p){o.goTo(n,q)
}else{o.moveTo(n,q)
}};
d.prototype._postLayout=function(){this.resizeContainer()
};
d.prototype.resizeContainer=function(){if(!this.options.isResizingContainer){return
}var n=this._getContainerSize();
if(n){this._setContainerMeasure(n.width,true);
this._setContainerMeasure(n.height,false)
}};
d.prototype._getContainerSize=j;
d.prototype._setContainerMeasure=function(n,o){if(n===undefined){return
}var p=this.size;
if(p.isBorderBox){n+=o?p.paddingLeft+p.paddingRight+p.borderLeftWidth+p.borderRightWidth:p.paddingBottom+p.paddingTop+p.borderTopWidth+p.borderBottomWidth
}n=Math.max(n,0);
this.element.style[o?"width":"height"]=n+"px"
};
d.prototype._emitCompleteOnItems=function(r,w){var u=this;
function n(){u.emitEvent(r+"Complete",[w])
}var v=w.length;
if(!w||!v){n();
return
}var o=0;
function q(){o++;
if(o===v){n()
}}for(var p=0,s=w.length;
p<s;
p++){var x=w[p];
x.once(r,q)
}};
d.prototype.ignore=function(o){var n=this.getItem(o);
if(n){n.isIgnored=true
}};
d.prototype.unignore=function(o){var n=this.getItem(o);
if(n){delete n.isIgnored
}};
d.prototype.stamp=function(o){o=this._find(o);
if(!o){return
}this.stamps=this.stamps.concat(o);
for(var p=0,n=o.length;
p<n;
p++){var q=o[p];
this.ignore(q)
}};
d.prototype.unstamp=function(o){o=this._find(o);
if(!o){return
}for(var p=0,n=o.length;
p<n;
p++){var q=o[p];
g.removeFrom(this.stamps,q);
this.unignore(q)
}};
d.prototype._find=function(n){if(!n){return
}if(typeof n==="string"){n=this.element.querySelectorAll(n)
}n=g.makeArray(n);
return n
};
d.prototype._manageStamps=function(){if(!this.stamps||!this.stamps.length){return
}this._getBoundingRect();
for(var p=0,n=this.stamps.length;
p<n;
p++){var o=this.stamps[p];
this._manageStamp(o)
}};
d.prototype._getBoundingRect=function(){var n=this.element.getBoundingClientRect();
var o=this.size;
this._boundingRect={left:n.left+o.paddingLeft+o.borderLeftWidth,top:n.top+o.paddingTop+o.borderTopWidth,right:n.right-(o.paddingRight+o.borderRightWidth),bottom:n.bottom-(o.paddingBottom+o.borderBottomWidth)}
};
d.prototype._manageStamp=j;
d.prototype._getElementOffset=function(q){var n=q.getBoundingClientRect();
var p=this._boundingRect;
var o=k(q);
var r={left:n.left-p.left-o.marginLeft,top:n.top-p.top-o.marginTop,right:p.right-n.right-o.marginRight,bottom:p.bottom-n.bottom-o.marginBottom};
return r
};
d.prototype.handleEvent=function(n){var o="on"+n.type;
if(this[o]){this[o](n)
}};
d.prototype.bindResize=function(){if(this.isResizeBound){return
}h.bind(f,"resize",this);
this.isResizeBound=true
};
d.prototype.unbindResize=function(){if(this.isResizeBound){h.unbind(f,"resize",this)
}this.isResizeBound=false
};
d.prototype.onresize=function(){if(this.resizeTimeout){clearTimeout(this.resizeTimeout)
}var o=this;
function n(){o.resize();
delete o.resizeTimeout
}this.resizeTimeout=setTimeout(n,100)
};
d.prototype.resize=function(){if(!this.isResizeBound||!this.needsResizeLayout()){return
}this.layout()
};
d.prototype.needsResizeLayout=function(){var o=k(this.element);
var n=this.size&&o;
return n&&o.innerWidth!==this.size.innerWidth
};
d.prototype.addItems=function(o){var n=this._itemize(o);
if(n.length){this.items=this.items.concat(n)
}return n
};
d.prototype.appended=function(o){var n=this.addItems(o);
if(!n.length){return
}this.layoutItems(n,true);
this.reveal(n)
};
d.prototype.prepended=function(o){var n=this._itemize(o);
if(!n.length){return
}var p=this.items.slice(0);
this.items=n.concat(p);
this._resetLayout();
this._manageStamps();
this.layoutItems(n,true);
this.reveal(n);
this.layoutItems(p)
};
d.prototype.reveal=function(o){this._emitCompleteOnItems("reveal",o);
var n=o&&o.length;
for(var p=0;
n&&p<n;
p++){var q=o[p];
q.reveal()
}};
d.prototype.hide=function(o){this._emitCompleteOnItems("hide",o);
var n=o&&o.length;
for(var p=0;
n&&p<n;
p++){var q=o[p];
q.hide()
}};
d.prototype.revealItemElements=function(o){var n=this.getItems(o);
this.reveal(n)
};
d.prototype.hideItemElements=function(o){var n=this.getItems(o);
this.hide(n)
};
d.prototype.getItem=function(q){for(var o=0,n=this.items.length;
o<n;
o++){var p=this.items[o];
if(p.element===q){return p
}}};
d.prototype.getItems=function(p){p=g.makeArray(p);
var o=[];
for(var q=0,n=p.length;
q<n;
q++){var s=p[q];
var r=this.getItem(s);
if(r){o.push(r)
}}return o
};
d.prototype.remove=function(o){var q=this.getItems(o);
this._emitCompleteOnItems("remove",q);
if(!q||!q.length){return
}for(var p=0,n=q.length;
p<n;
p++){var r=q[p];
r.remove();
g.removeFrom(this.items,r)
}};
d.prototype.destroy=function(){var p=this.element.style;
p.height="";
p.position="";
p.width="";
for(var o=0,n=this.items.length;
o<n;
o++){var q=this.items[o];
q.destroy()
}this.unbindResize();
var r=this.element.outlayerGUID;
delete a[r];
delete this.element.outlayerGUID;
if(l){l.removeData(this.element,this.constructor.namespace)
}};
d.data=function(n){n=g.getQueryElement(n);
var o=n&&n.outlayerGUID;
return o&&a[o]
};
d.create=function(q,o){function p(){d.apply(this,arguments)
}if(Object.create){p.prototype=Object.create(d.prototype)
}else{g.extend(p.prototype,d.prototype)
}p.prototype.constructor=p;
p.defaults=g.extend({},d.defaults);
g.extend(p.defaults,o);
p.prototype.settings={};
p.namespace=q;
p.data=d.data;
p.Item=function n(){b.apply(this,arguments)
};
p.Item.prototype=new b();
g.htmlInit(p,q);
if(l&&l.bridget){l.bridget(q,p)
}return p
};
d.Item=b;
return d
}));
/*!
 * Masonry v3.3.0
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */
(function(b,a){if(typeof define==="function"&&define.amd){define(["outlayer/outlayer","get-size/get-size","fizzy-ui-utils/utils"],a)
}else{if(typeof exports==="object"){module.exports=a(require("outlayer"),require("get-size"),require("fizzy-ui-utils"))
}else{b.Masonry=a(b.Outlayer,b.getSize,b.fizzyUIUtils)
}}}(window,function factory(c,d,a){var b=c.create("masonry");
b.prototype._resetLayout=function(){this.getSize();
this._getMeasurement("columnWidth","outerWidth");
this._getMeasurement("gutter","outerWidth");
this.measureColumns();
var e=this.cols;
this.colYs=[];
while(e--){this.colYs.push(0)
}this.maxY=0
};
b.prototype.measureColumns=function(){this.getContainerWidth();
if(!this.columnWidth){var l=this.items[0];
var g=l&&l.element;
this.columnWidth=g&&d(g).outerWidth||this.containerWidth
}var j=this.columnWidth+=this.gutter;
var h=this.containerWidth+this.gutter;
var k=h/j;
var e=j-h%j;
var f=e&&e<1?"round":"floor";
k=Math[f](k);
this.cols=Math.max(k,1)
};
b.prototype.getContainerWidth=function(){var e=this.options.isFitWidth?this.element.parentNode:this.element;
var f=d(e);
this.containerWidth=f&&f.innerWidth
};
b.prototype._getItemLayoutPosition=function(p){p.getSize();
var o=p.size.outerWidth%this.columnWidth;
var k=o&&o<1?"round":"ceil";
var l=Math[k](p.size.outerWidth/this.columnWidth);
l=Math.min(l,this.cols);
var e=this._getColGroup(l);
var f=Math.min.apply(Math,e);
var m=a.indexOf(e,f);
var j={x:this.columnWidth*m,y:f};
var n=f+p.size.outerHeight;
var g=this.cols+1-e.length;
for(var h=0;
h<g;
h++){this.colYs[m+h]=n
}return j
};
b.prototype._getColGroup=function(g){if(g<2){return this.colYs
}var h=[];
var j=this.cols+1-g;
for(var e=0;
e<j;
e++){var f=this.colYs.slice(e,e+g);
h[e]=Math.max.apply(Math,f)
}return h
};
b.prototype._manageStamp=function(e){var l=d(e);
var j=this._getElementOffset(e);
var h=this.options.isOriginLeft?j.left:j.right;
var f=h+l.outerWidth;
var n=Math.floor(h/this.columnWidth);
n=Math.max(0,n);
var g=Math.floor(f/this.columnWidth);
g-=f%this.columnWidth?0:1;
g=Math.min(this.cols-1,g);
var m=(this.options.isOriginTop?j.top:j.bottom)+l.outerHeight;
for(var k=n;
k<=g;
k++){this.colYs[k]=Math.max(m,this.colYs[k])
}};
b.prototype._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);
var e={height:this.maxY};
if(this.options.isFitWidth){e.width=this._getContainerFitWidth()
}return e
};
b.prototype._getContainerFitWidth=function(){var f=0;
var e=this.cols;
while(--e){if(this.colYs[e]!==0){break
}f++
}return(this.cols-f)*this.columnWidth-this.gutter
};
b.prototype.needsResizeLayout=function(){var e=this.containerWidth;
this.getContainerWidth();
return e!==this.containerWidth
};
return b
}));
(function(b,a,c){c(a).ready(function(){var n=c(".js-newsletterSignUpSplash"),f=c(".js-newsletterSignUpSplash--dismiss",n),g=c(".js-newsletterSignUpSplash--drawerToggle",n),s=c(".newsletterSignUpSplash-form",n),r=c(".newsletterSignUpSplash-input--email",s),e=c(".newsletterSignUpSplash-input--zip",s),p=c(".newsletterSignUpSplash-select",s),d="newsletterSplashAutoHideCount",o="hideNewsletterSplash",w=false,u=10000,h=6,v=3;
if(s&&s.length>0){s[0].reset();
if(j()){n.hide();
w=false
}else{n.show()
}c.merge(r,e).focus(function(){w=true
});
p.focus(function(){w=true
});
var m=function(B,A,z){B.attr("data-state",B.attr("data-state")===A?z:A)
};
f.click(function(){n.hide();
w=true;
k()
});
g.click(function(){m(n,"collapsed","expanded");
w=true
});
s.submit(function(z){setTimeout(function(){s[0].reset()
},1000)
});
if(!j()){setTimeout(function(){if(!w){n.attr("data-state","collapsed");
setTimeout(function(){if(!w){n.hide();
x()
}},u)
}},u)
}c.ajax({type:"GET",dataType:"json",url:"/bin/ajam/mailchimp.cableproviders.json",success:function(z){c.each(z,function(A,B){p.append(c("<option></option>").attr("value",B).text(B))
})
},error:function(){n.hide()
}});
var l=navigator.platform.match(/iP(ad|hone|od)/i)?true:false;
c.fn.mobileFix=function(z){var B=c(this),A=c(z.fixedElements);
c(a).on("focus",z.inputElements,function(C){B.addClass(z.addClass)
}).on("blur",z.inputElements,function(C){B.removeClass(z.addClass);
setTimeout(function(){c(a).scrollTop(c(a).scrollTop())
},1)
});
return this
};
if(l){c("body").mobileFix({inputElements:"input,textarea,select",addClass:"fixfixed"})
}}function y(z){var A=new Date();
A.setMonth(A.getMonth()+z);
return A
}function j(){return c.cookie(o,Boolean)
}function k(){var z=y(h);
c.cookie(o,true,{expires:z,path:"/"})
}function q(){var z=c.cookie(d,Number);
return isNaN(z)?0:z
}function x(){var z=q()+1;
if(z>=v){k();
c.cookie(d,0,{path:"/"})
}else{c.cookie(d,z,{path:"/"})
}}})
})(window,document,window.jQuery);
AJAM.Models.Article=Backbone.Model.extend({defaults:{author:null},parse:function(b){for(var a=0;
a<b.authors.length;
a++){b.authors[a].first=(a===0);
b.authors[a].last=(a===b.authors.length-1)
}return b
}});
AJAM.Models.Video=Backbone.Model.extend({});
AJAM.Models.Blog=Backbone.Model.extend({defaults:{author:null},parse:function(b){for(var a=0;
a<b.authors.length;
a++){b.authors[a].first=(a===0);
b.authors[a].penultimate=(a===b.authors.length-2);
b.authors[a].last=(a===b.authors.length-1);
b.authors[a].showTwitterGooglePlus=b.authors[a].twitterName||b.authors[a].googlePlusName?true:false
}b.showImageInfo=(b.caption||b.imageCopyright);
b.showTwitterGooglePlus=(b.twitterName||b.googlePlusName);
return b
}});
AJAM.Collections.Articles=Backbone.Collection.extend({model:AJAM.Models.Article,url:function(){return this.instanceUrl
},initialize:function(a){this.instanceUrl=a.url
},parse:function(a){this.serverCount=a.totalResults;
return a.stories
}});
AJAM.Collections.Videos=Backbone.Collection.extend({model:AJAM.Models.Video,url:function(){return this.instanceUrl
},initialize:function(a){this.instanceUrl=a.url
},parse:function(a){this.serverCount=a.totalResults;
return a.stories
}});
AJAM.Collections.Blogs=Backbone.Collection.extend({model:AJAM.Models.Blog,url:function(){return this.instanceUrl
},initialize:function(a){this.instanceUrl=a.url
},parse:function(a){this.serverCount=a.totalResults;
return a.stories
}});
AJAM.Views.AbstractFeaturedVideoPlayerView=Backbone.View.extend({initialize:function(){throw"Can not instantiate an abstract view"
},_initialize:function(){var d=this;
var e=this.$el.attr("id");
var a=brightcove.api.getExperience(e);
this.videoPlayer=a.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
this.experienceModule=a.getModule(brightcove.api.modules.APIModules.EXPERIENCE);
this.collection=new AJAM.Collections.Videos([],{url:""});
this._setPlayerContainerHeight();
var c=this.$el.parents(this.parentEl);
this.$videosHolder=$(c.find(this.sidebarEl)[0]);
this.$overlayLink=$(c.find(".js-shareOverlay--link")[0]);
this.$overlayEmbed=$(c.find(".js-shareOverlay--embed")[0]);
this.$titles=c.find(".videoTitle-share");
if(c.data("video1")!==""){var b=new AJAM.Models.Video(c.data("video1"));
this.collection.add(b);
if(this.hasCaption){this.caption=new this.captionTemplate({model:b});
c.find(this.captionEl).append(this.caption.render().el)
}this._setOverlay(b)
}if(c.data("video2")!==""){this.collection.add(new AJAM.Models.Video(c.data("video2")))
}if(c.data("video3")!==""){this.collection.add(new AJAM.Models.Video(c.data("video3")))
}if(c.data("video4")!==""){this.collection.add(new AJAM.Models.Video(c.data("video4")))
}this.currentVideo=0;
this._renderSideBar();
this.videoPlayer.addEventListener(brightcove.api.events.MediaEvent.COMPLETE,function(){d._nextVideo()
});
$(window).resize(_.throttle(function(){d._setPlayerContainerHeight()
},250))
},_nextVideo:function(){var a=this.collection.at(this.currentVideo);
a.unset("playing");
this.currentVideo++;
if(this.currentVideo==this.collection.length){this.currentVideo=0
}var b=this.collection.at(this.currentVideo);
if(this.hasCaption){this.caption.changeModel(b)
}this.videoPlayer.loadVideoByID(b.attributes.videoPlayer);
b.set("playing",true)
},_changeVideo:function(b){if(!b.get("playing")){var a=this.collection.at(this.currentVideo);
a.unset("playing");
if(this.hasCaption){this.caption.changeModel(b)
}this.currentVideo=this.collection.indexOf(b);
this.videoPlayer.loadVideoByID(b.attributes.videoPlayer);
b.set("playing",true);
this._setOverlay(b)
}this._dismissOverlay()
},_setPlayerContainerHeight:function(){var a=$(".featuredVideosPlayer-videoContainer--inner");
a.each(function(){var c=$(this).find(".BrightcoveExperience").height();
var b=$(this).find(".featuredVideosPlayer-viewAllShows--outer").height();
var d=c-b;
$(this).find(".featuredVideosPlayer-secondaryShows--inner").height(d)
})
},_renderSideBar:function(){this.$videosHolder.empty();
_this=this;
this.collection.each(function(b){var a=new _this.videoTemplate({model:b});
if(_this.collection.indexOf(b)===0){b.set("playing",true)
}a.$el.click(function(){_this._changeVideo(b)
});
_this.$videosHolder.append(a.render().el)
})
},_setOverlay:function(d){var b=this.$overlayLink.find("input");
var c=b.data("servername")+d.attributes.linkHref;
b.val(c);
var a=this.$overlayEmbed.find("textarea");
var e={embedPath:a.data("embedpath"),serverName:a.data("servername"),video:d.attributes};
a.val(AJAM.Templates.VideoEmbedTemplate(e));
this.$titles.text(d.attributes.title)
},_dismissOverlay:function(){$(".js-shareOverlay").css("display","none")
}});