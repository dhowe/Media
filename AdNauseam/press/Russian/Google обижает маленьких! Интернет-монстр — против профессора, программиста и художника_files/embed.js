(function(){function w(a,b){return-1<a.indexOf(b)?a:-1<a.indexOf("?")?a+"&"+b:a+"?"+b}function S(a,b){if(H){var c;c=a;for(var f=!1;!f&&c.parentNode;)c=c.parentNode,f=c.className&&0<=c.className.split(" ").indexOf(H);if(c=f&&c){(f=c.parentNode)&&f.removeChild(c);return}}b&&b.iframeContainer?b.iframeContainer.parentNode.removeChild(b.iframeContainer):(c=a,"IFRAME"===a.nodeName&&(f=x(a))&&(c=f.maxWidthWrapper),c.parentNode.removeChild(c))}function I(a){a=a.getBoundingClientRect();var b=window.innerHeight||
document.documentElement.clientHeight,c=window.innerWidth||document.documentElement.clientWidth;if(0<=a.bottom&&0<=a.right&&a.top<=b&&a.left<=c)return aa;if(a.bottom>=0-b&&a.right>=0-c&&a.top<=b+b&&a.left<=c+c)return T}function U(a){for(var b=0,c=0;c<a.childNodes.length;c++){var f=a.childNodes[c];f.nodeType===Node.TEXT_NODE?(f=f.textContent||f.innerText,(f=f.replace(/\s|\n/g,""))&&b++):f.nodeType===Node.ELEMENT_NODE&&b++}return b}function x(a){if((a=a.parentNode)&&!("DIV"!==a.nodeName||2<U(a))){var b=
a.parentNode;if(b&&!("DIV"!==b.nodeName||1<U(b)))return{aspectWrapper:a,maxWidthWrapper:b}}}function ba(a){var b=J(a);a=b.url;var c=b.api_key,b=b.key,f=[];a&&f.push("url="+encodeURIComponent(a));c&&f.push("api_key="+encodeURIComponent(c));b&&f.push("key="+encodeURIComponent(b));return"/api/thumbnail?"+f.join("&")}function V(a,b){var c=x(a);if(c){var f;if(b.match(/\/api\/iframe\?.+/))f=b.replace(/\/api\/iframe\?.+/,ba(b));else if(b.match(/^(?:https?:)?\/\/[^\/]+\/[a-zA-Z0-9]+(?:\?.*)?$/))f=b.replace(/^((?:https?:)?\/\/[^\/]+\/[a-zA-Z0-9]+)((?:\?.*)?)$/,
"$1/thumbnail");else return;var e=document.createElement("div");e.style.position="absolute";e.style.top="0";e.style.width="100%";e.style.height="100%";e.style.backgroundImage="url('"+f+"')";e.style.backgroundSize="cover";e.style.backgroundPosition="center";f=c.aspectWrapper.style["padding-top"];var d=c.aspectWrapper.style["padding-bottom"];if(f&&d&&f.match(/^\d+px$/)){var m=document.createElement("div");m.style.left=0;m.style.top="-"+f;m.style.width="100%";m.style.height=0;m.style.position="relative";
m.style["padding-bottom"]=d;m.appendChild(e);c.aspectWrapper.appendChild(m)}else c.aspectWrapper.appendChild(e)}}function W(a){var b=(a=x(a))&&a.aspectWrapper&&1<a.aspectWrapper.childNodes.length&&a.aspectWrapper.childNodes[1];b&&"DIV"===b.nodeName&&a.aspectWrapper.removeChild(b)}function ca(a,b){setTimeout(function(){da(a)},b==T?200:0)}function da(a){function b(){f++;f===c&&(clearTimeout(e),setTimeout(function(){W(a)},200))}var c=a.hasAttribute("data-direct")?1:2,f=0,e;a.addEventListener?a.addEventListener("load",
b):a.attachEvent("onload",b);e=setTimeout(function(){b()},1E4);var d=a.getAttribute("data-iframely-url");d&&(a.removeAttribute("data-iframely-url"),a.removeAttribute("data-iframely-loading"),a.setAttribute("src",d))}function ea(a,b){var c=a.getAttribute("data-max-width");c&&(b["max-width"]=c);if(b){b.frame_style&&a.setAttribute("data-frame-style",b.frame_style);var c=a.getAttribute("data-frame-style"),f=x(a);if(f){var e=f.aspectWrapper,d=f.maxWidthWrapper;a.removeAttribute("style");e.removeAttribute("style");
d.removeAttribute("style");d.style.width="100%";b&&b.height&&b.width&&!b["aspect-ratio"]?(c&&a.setAttribute("style",c),a.setAttribute("width",b.width),a.setAttribute("height",b.height)):(a.setAttribute("style","top: 0; left: 0; width: 100%; height: 100%; position: absolute; "+(c||"")),e.style.left=0,e.style.width="100%",e.style.height=0,e.style.position="relative",b.height||b["aspect-ratio"]||(e.style["padding-bottom"]="56.25%"),b["aspect-ratio"]?(e.style["padding-bottom"]=Math.round(1E5/b["aspect-ratio"])/
1E3+"%",b["padding-bottom"]&&(e.style["padding-top"]=b["padding-bottom"]+"px")):(b.height&&(e.style.height=b.height+"px"),b.width&&(e.style.width=b.width+"px")),(b["max-width"]||b["min-width"])&&["max-width","min-width"].forEach(function(a){b[a]&&(d.style[a]=b[a]+"px")}),"undefined"!==typeof checkLazyLoad&&checkLazyLoad())}}}function J(a){if(a=a.match(/\?(.+)/i)){a=a[1];a=a.split("&");for(var b={},c=0;c<a.length;c++){var d=a[c].split("=");b[d[0]]=decodeURIComponent(d[1])}return b}return{}}function fa(){var a=
!1;try{a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash")?!0:!1}catch(b){a=navigator.mimeTypes&&void 0!=navigator.mimeTypes["application/x-shockwave-flash"]&&navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin?!0:!1}return a}var s=window.iframely=window.iframely||{},d=s.widgets=s.widgets||{},C=s.events=s.events||{},D=d._iframes=d._iframes||[],K=d._global_iframes=d._global_iframes||[],p=d._lazy_iframes=d._lazy_iframes||[],E=d._lazy_widgets=d._lazy_widgets||[],L=d._import_links=d._import_links||
{},h,X,A,B,M,F,z,H,N,Y,G,O=/^(?:https?:)?\/\/[^\/]+/,ga=/^(?:https?:)?\/\/[^\/]+\/(\w+)(?:\?.*)?$/;d.load||(s.load=d.load=function(){if(0===arguments.length){var a=document.querySelectorAll("[data-iframely-url]"),b;if(1<a.length&&"file:"!==document.location.protocol&&"import"in(b=document.createElement("link"))){for(var c=[],f=[],e={},l,m,r,k,g,p,h,s=function(a,b){e[a]||(e[a]=[]);e[a].push(b)},v=function(){for(var a in e)for(var b=e[a],c=0;c<b.length;c++){var f=b[c];"import"===f.getAttribute("data-iframely-loading")&&
(f.removeAttribute("data-iframely-loading"),d.createWidget(f))}},n=0;n<a.length;n++){var t=a[n];if(!t.getAttribute("data-iframely-loading")){var q=t.getAttribute("data-iframely-url");l=(l=q.match(O))&&l[0]||z;var y=q.match(ga),y=y&&y[1];k=k||q.match(/align=left/);g=g||q.match(/autoplay=(true|1)/);h=h||q.match(/playerjs=(true|1)/);var w=q.match(/maxwidth=(\d+)/);w&&(p=p||w[1]);y?(t.setAttribute("data-iframely-loading","import"),-1===f.indexOf(y)&&f.push(y),s(y,t)):(r=J(q),(q=r.url)||(q=t.getAttribute("href")),
m=r.api_key||A,r=r.key||B,(m||r)&&q?(t.setAttribute("data-iframely-loading","import"),-1===c.indexOf(q)&&c.push(q),s(q,t)):d.createWidget(t))}}if((0<c.length||0<f.length)&&l){b.rel="import";b.href=l+"/api/import?app=1";fa()?b.href+="&flash=1":b.href+="&flash=0";0<c.length&&(c=c.map(function(a){return"uri="+encodeURIComponent(a)}),b.href+="&"+c.join("&"));0<f.length&&(b.href+="&ids="+encodeURIComponent(f.join("&")));m?b.href+="&api_key="+m:r&&(b.href+="&key="+r);if(k||"left"===G)b.href+="&align=left";
g&&(b.href+="&autoplay=1");if(p||F)b.href+="&maxwidth="+(p||F);if(h||Y)b.href+="&playerjs=1";var x=function(a){for(var b=(a=a["import"])?a.querySelectorAll("template[data-uri]"):[],c=0;c<b.length;c++){var f=b[c],l=f.getAttribute("data-iframe-src"),m=f.hasAttribute("data-cancel"),g=f.hasAttribute("data-shadow"),k=f.getAttribute("data-uri"),p=e[k];if(p){for(var q=0;q<p.length;q++){var u=p[q];if(m)S(u);else if(l)u.removeAttribute("data-iframely-loading"),d.createWidget(u,{directIframeSrc:l});else{var h=
document.importNode(f.content,!0),r=u.parentNode,n=N||u.hasAttribute("data-lazy");if("IFRAME"===u.nodeName)u.removeAttribute("data-iframely-loading"),d.createWidget(u);else{if(g){var s=document.createElement("div"),t=s.createShadowRoot();t.appendChild(h);d.applyCardStyles&&d.applyCardStyles({shadowRoot:t,container:r,sourceTemplate:f,importDoc:a});h=s}!n||I(u)?(r.insertBefore(h,u),r.removeChild(u)):(n=document.createElement("div"),r.insertBefore(n,u),r.removeChild(u),n.style.width="100%",n.style.height=
"400px",E.push({container:n,widget:h}))}}}delete e[k]}}v()};b.onload=function(){x(b)};b.onerror=function(){v()};b.href in L?x(L[b.href]):(L[b.href]=b,document.head.appendChild(b))}}else for(n=0;n<a.length;n++)t=a[n],d.createWidget(t);a=document.querySelectorAll(".iframely-embed-button");for(n=0;n<a.length;n++)d.createEmbedButton(a[n])}else 1===arguments.length?d.createWidget(arguments[0]):2===arguments.length&&d.createWidgetInContainer(arguments[0],arguments[1])});d.createWidgetInContainer||(d.createWidgetInContainer=
function(a,b){var c=document.createElement("a");c.setAttribute("href",b);c.textContent=b;a.appendChild(c);d.createWidget(c)});d.createWidget||(d.createWidget=function(a,b){if(!a.getAttribute("data-iframely-loading")){a.setAttribute("data-iframely-loading",!0);var c=a.getAttribute("data-iframely-url"),f=a.hasAttribute("data-img"),e=c&&c.match(/^((?:https?:)?\/\/[^\/]+)\/\w+/i),e=e&&e[1],l=N||a.hasAttribute("data-lazy")||"IFRAME"===a.nodeName;if("IFRAME"===a.nodeName)b&&b.directIframeSrc&&a.setAttribute("data-direct",
""),l?(f&&(V(a,c),c=w(c,"img=1")),a.setAttribute("data-iframely-url",b&&b.directIframeSrc||c),p.push({iframe:a})):(a.setAttribute("src",b&&b.directIframeSrc||c),a.removeAttribute("data-iframely-url"),a.removeAttribute("data-iframely-loading")),D.push({iframe:a});else{var m=a.getAttribute("href"),k=a.parentNode,h=a.getAttribute("data-max-width"),g;!m||c&&e?c&&(g=w(c,"app=1"),"auto"===h&&(c=k.clientWidth)&&(g=w(g,"maxwidth="+c)),G&&(g=w(g,"align="+G))):(h=h||F,g="/api/iframe?app=1&url="+encodeURIComponent(m),
g=B?z+g+"&key="+B:A?z+g+"&api_key="+A:"http://open.iframe.ly"+g,M&&(g+="&"+M));g&&(e=g.match(/^(https?:)?\/\//i),e[1]||"file:"!==document.location.protocol||(g="http:"+g),c=document.createElement("div"),c.innerHTML='<div style="width: 100%; position: relative; padding-bottom: 56.25%;"><iframe frameborder="0" allowfullscreen style="top: 0; width: 100%; height: 100%; position: absolute;"></iframe></div>',e=c.querySelector("iframe"),h&&parseInt(h)?(c.setAttribute("style","width: 100%; max-width: "+h+
"px;"),e.setAttribute("data-max-width",h)):c.setAttribute("style","width: 100%;"),D.push({iframe:e,iframeContainer:c}),k.insertBefore(c,a),k.removeChild(a),l?(f&&(V(e,g),g=w(g,"img=1")),e.setAttribute("data-iframely-url",g),e.setAttribute("data-iframely-loading",!0),p.push({iframe:e})):e.setAttribute("src",g))}d.checkLazyLoad();C.trigger("rendered")}});d.createEmbedButton||(d.createEmbedButton=function(a){if(!a.getAttribute("data-iframely-binded")){a.setAttribute("data-iframely-binded",!0);var b=
a.getAttribute("data-url")||document.location.href,c=a.getAttribute("data-promo")||"",f=a.getAttribute("data-iframely-api-key")||A,e=a.getAttribute("data-iframely-key")||B,d=z+"/widget/embed#url="+encodeURIComponent(b)+"&promo="+encodeURIComponent(c);if(f)d+="&api_key="+encodeURIComponent(f);else if(e)d+="&key="+encodeURIComponent(e);else return;a.addEventListener("click",function(a){a.preventDefault();a=document.body;X=document.defaultView&&document.defaultView.getComputedStyle?document.defaultView.getComputedStyle(a,
null).overflow:a.currentStyle?a.currentStyle.overflow:a.style.overflow;document.body.style.overflow="hidden";h=document.createElement("iframe");h.setAttribute("style","position: fixed; z-index: 999999; top: 0; left: 0; width: 100%; height: 100%; border: 0; margin: 0; padding: 0; display: block");h.setAttribute("src",d);document.body.appendChild(h);h.focus()})}});if(!C.bind){var P={};C.bind=function(a,b){(P[a]=P[a]||[]).push(b)};C.trigger=function(a,b){(P[a]||[]).forEach(function(a){a(b)})}}d.ready||
(d.ready=function(a){"function"===typeof a&&a()});for(var s=function(){return{postMessage:function(a,b,c){a=JSON.stringify(a);c=c||window.parent;window.postMessage&&c.postMessage(a,(b||"*").replace(/([^:]+:\/\/[^\/]+).*/,"$1"))},receiveMessage:function(a){function b(b){var d;try{d=JSON.parse(b.data)}catch(e){}a(b,d)}if(window.postMessage)if(window.addEventListener)window[a?"addEventListener":"removeEventListener"]("message",b,!1);else window[a?"attachEvent":"detachEvent"]("onmessage",b)}}}(),Z=document.querySelectorAll("script"),
Q=0;Q<Z.length&&!z;Q++){var v=Z[Q].getAttribute("src");if(v&&v.match(/\/embed\.js/)){var k=J(v);A=k.api_key;B=k.key;F=k.maxwidth;H=k.parent;N=k.lazy;Y=k.playerjs;G=k.align;delete k.api_key;delete k.key;var $=[],R;for(R in k)$.push(R+"="+encodeURIComponent(k[R]));M=$.join("&");z=(v=v.match(O)||document.location.href.match(O))&&v[0]||"https://iframe.ly"}}d.checkLazyLoad||(d._checkLazyLoad=function(){d.checkLazyLoadTimeout&&clearTimeout(d.checkLazyLoadTimeout);d.checkLazyLoadTimeout=null;for(var a=0;a<
p.length;){var b=p[a].iframe,c=I(b);c?(p.splice(a,1),ca(b,c)):a++}for(a=0;a<E.length;)b=E[a],(c=I(b.container))?(E.splice(a,1),c=b,b=c.container.parentNode,b.insertBefore(c.widget,c.container),b.removeChild(c.container)):a++},d.checkLazyLoad=function(){d.checkLazyLoadTimeout||(d.checkLazyLoadTimeout=setTimeout(d._checkLazyLoad,300))},window.addEventListener?(addEventListener("scroll",d.checkLazyLoad,!0),addEventListener("resize",d.checkLazyLoad,!0)):window.attachEvent&&(attachEvent("onscroll",d.checkLazyLoad),
attachEvent("onresize",d.checkLazyLoad)));d.receiveMessageRegistered||(d.receiveMessageRegistered=!0,s.receiveMessage(function(a,b){if(b&&b.method){for(var c=null,d=null,e=0;e<D.length&&!c;e++){var l=D[e];l.iframe.contentWindow===a.source&&(c=l.iframe,d=l)}if(!c)for(e=0;e<K.length&&!c;e++)l=K[e],l.contentWindow===a.source&&(c=l);if(!c)for(var k=document.querySelectorAll("iframe"),e=0;e<k.length&&!c;e++)l=k[e],l.contentWindow===a.source&&(K.push(l),c=l);if(c&&"widgetRendered"===b.method){for(e=0;e<
p.length;)l=p[e].iframe,c===l?p.splice(e,1):e++;W(c)}!c||"setIframelyWidgetSize"!==b.method&&"resize"!==b.method&&"setIframelyEmbedData"!==b.method||ea(c,b.data&&b.data.media||{height:b.height});c&&"cancelWidget"===b.method&&S(c,d);"closeEmbedPreview"===b.method&&(h&&h.parentNode.removeChild(h),document.body.style.overflow=X)}}));var aa=1,T=2;(function(a){"complete"!==document.readyState&&"interactive"!==document.readyState||a();document.addEventListener?document.addEventListener("DOMContentLoaded",
a):window.attachEvent("onload",a)})(function(){d.load()});(d._e||[]).forEach(function(a){"function"===typeof a&&a()})})();
