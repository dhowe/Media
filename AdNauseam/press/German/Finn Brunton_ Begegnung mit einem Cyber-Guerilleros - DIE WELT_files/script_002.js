/*! HTML5 Shiv pre3.5 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
  Uncompressed source: https://github.com/aFarkas/html5shiv  */
;(function(a,b){function h(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function i(){var a=l.elements;return typeof a=="string"?a.split(" "):a}function j(a){var b={},c=a.createElement,f=a.createDocumentFragment,g=f();a.createElement=function(a){l.shivMethods||c(a);var f;return b[a]?f=b[a].cloneNode():e.test(a)?f=(b[a]=c(a)).cloneNode():f=c(a),f.canHaveChildren&&!d.test(a)?g.appendChild(f):f},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+i().join().replace(/\w+/g,function(a){return b[a]=c(a),g.createElement(a),'c("'+a+'")'})+");return n}")(l,g)}function k(a){var b;return a.documentShived?a:(l.shivCSS&&!f&&(b=!!h(a,"article,aside,details,figcaption,figure,footer,header,hgroup,nav,section{display:block}audio{display:none}canvas,video{display:inline-block;*display:inline;*zoom:1}[hidden]{display:none}audio[controls]{display:inline-block;*display:inline;*zoom:1}mark{background:#FF0;color:#000}")),g||(b=!j(a)),b&&(a.documentShived=b),a)}function p(a){var b,c=a.getElementsByTagName("*"),d=c.length,e=RegExp("^(?:"+i().join("|")+")$","i"),f=[];while(d--)b=c[d],e.test(b.nodeName)&&f.push(b.applyElement(q(b)));return f}function q(a){var b,c=a.attributes,d=c.length,e=a.ownerDocument.createElement(n+":"+a.nodeName);while(d--)b=c[d],b.specified&&e.setAttribute(b.nodeName,b.nodeValue);return e.style.cssText=a.style.cssText,e}function r(a){var b,c=a.split("{"),d=c.length,e=RegExp("(^|[\\s,>+~])("+i().join("|")+")(?=[[\\s,>+~#.:]|$)","gi"),f="$1"+n+"\\:$2";while(d--)b=c[d]=c[d].split("}"),b[b.length-1]=b[b.length-1].replace(e,f),c[d]=b.join("}");return c.join("{")}function s(a){var b=a.length;while(b--)a[b].removeNode()}function t(a){var b,c,d=a.namespaces,e=a.parentWindow;return!o||a.printShived?a:(typeof d[n]=="undefined"&&d.add(n),e.attachEvent("onbeforeprint",function(){var d,e,f,g=a.styleSheets,i=[],j=g.length,k=Array(j);while(j--)k[j]=g[j];while(f=k.pop())if(!f.disabled&&m.test(f.media)){for(d=f.imports,j=0,e=d.length;j<e;j++)k.push(d[j]);try{i.push(f.cssText)}catch(l){}}i=r(i.reverse().join("")),c=p(a),b=h(a,i)}),e.attachEvent("onafterprint",function(){s(c),b.removeNode(!0)}),a.printShived=!0,a)}var c=a.html5||{},d=/^<|^(?:button|form|map|select|textarea|object|iframe)$/i,e=/^<|^(?:a|b|button|code|div|fieldset|form|h1|h2|h3|h4|h5|h6|i|iframe|img|input|label|li|link|ol|option|p|param|q|script|select|span|strong|style|table|tbody|td|textarea|tfoot|th|thead|tr|ul)$/i,f,g;(function(){var c=b.createElement("a");c.innerHTML="<xyz></xyz>",f="hidden"in c,f&&typeof injectElementWithStyles=="function"&&injectElementWithStyles("#modernizr{}",function(b){b.hidden=!0,f=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle).display=="none"}),g=c.childNodes.length==1||function(){try{b.createElement("a")}catch(a){return!0}var c=b.createDocumentFragment();return typeof c.cloneNode=="undefined"||typeof c.createDocumentFragment=="undefined"||typeof c.createElement=="undefined"}()})();var l={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:k};a.html5=l,k(b);var m=/^$|\b(?:all|print)\b/,n="html5shiv",o=!g&&function(){var c=b.documentElement;return typeof b.namespaces!="undefined"&&typeof b.parentWindow!="undefined"&&typeof c.applyElement!="undefined"&&typeof c.removeNode!="undefined"&&typeof a.attachEvent!="undefined"}();l.type+=" print",l.shivPrint=t,t(b)})(this,document);;/**
 * @license MIT
 * @fileOverview Favico animations
 * @author Miroslav Magda, http://blog.ejci.net
 * @version 0.3.7
 */
!function(){var e=function(e){"use strict";function t(e){if(e.paused||e.ended||w)return!1;try{f.clearRect(0,0,h,l),f.drawImage(e,0,0,h,l)}catch(o){}p=setTimeout(t,S.duration,e),L.setIcon(s)}function o(e){var t=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;e=e.replace(t,function(e,t,o,n){return t+t+o+o+n+n});var o=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return o?{r:parseInt(o[1],16),g:parseInt(o[2],16),b:parseInt(o[3],16)}:!1}function n(e,t){var o,n={};for(o in e)n[o]=e[o];for(o in t)n[o]=t[o];return n}function r(){return document.hidden||document.msHidden||document.webkitHidden||document.mozHidden}e=e?e:{};var i,a,l,h,s,f,c,d,u,y,g,w,m,x,p,b={bgColor:"#d00",textColor:"#fff",fontFamily:"sans-serif",fontStyle:"bold",type:"circle",position:"down",animation:"slide",elementId:!1,dataUrl:!1};m={},m.ff="undefined"!=typeof InstallTrigger,m.chrome=!!window.chrome,m.opera=!!window.opera||navigator.userAgent.indexOf("Opera")>=0,m.ie=/*@cc_on!@*/!1,m.safari=Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor")>0,m.supported=m.chrome||m.ff||m.opera;var v=[];g=function(){},d=w=!1;var C=function(){i=n(b,e),i.bgColor=o(i.bgColor),i.textColor=o(i.textColor),i.position=i.position.toLowerCase(),i.animation=S.types[""+i.animation]?i.animation:b.animation;var t=i.position.indexOf("up")>-1,r=i.position.indexOf("left")>-1;if(t||r)for(var d=0;d<S.types[""+i.animation].length;d++){var u=S.types[""+i.animation][d];t&&(u.y=u.y<.6?u.y-.4:u.y-2*u.y+(1-u.w)),r&&(u.x=u.x<.6?u.x-.4:u.x-2*u.x+(1-u.h)),S.types[""+i.animation][d]=u}i.type=I[""+i.type]?i.type:b.type,a=L.getIcon(),s=document.createElement("canvas"),c=document.createElement("img"),a.hasAttribute("href")?(c.setAttribute("src",a.getAttribute("href")),c.onload=function(){l=c.height>0?c.height:32,h=c.width>0?c.width:32,s.height=l,s.width=h,f=s.getContext("2d"),M.ready()}):(c.setAttribute("src",""),l=32,h=32,c.height=l,c.width=h,s.height=l,s.width=h,f=s.getContext("2d"),M.ready())},M={};M.ready=function(){d=!0,M.reset(),g()},M.reset=function(){d&&(v=[],u=!1,y=!1,f.clearRect(0,0,h,l),f.drawImage(c,0,0,h,l),L.setIcon(s),window.clearTimeout(x),window.clearTimeout(p))},M.start=function(){if(d&&!y){var e=function(){u=v[0],y=!1,v.length>0&&(v.shift(),M.start())};if(v.length>0){y=!0;var t=function(){["type","animation","bgColor","textColor","fontFamily","fontStyle"].forEach(function(e){e in v[0].options&&(i[e]=v[0].options[e])}),S.run(v[0].options,function(){e()},!1)};u?S.run(u.options,function(){t()},!0):t()}}};var I={},T=function(e){return e.n="number"==typeof e.n?Math.abs(0|e.n):e.n,e.x=h*e.x,e.y=l*e.y,e.w=h*e.w,e.h=l*e.h,e.len=(""+e.n).length,e};I.circle=function(e){e=T(e);var t=!1;2===e.len?(e.x=e.x-.4*e.w,e.w=1.4*e.w,t=!0):e.len>=3&&(e.x=e.x-.65*e.w,e.w=1.65*e.w,t=!0),f.clearRect(0,0,h,l),f.drawImage(c,0,0,h,l),f.beginPath(),f.font=i.fontStyle+" "+Math.floor(e.h*(e.n>99?.85:1))+"px "+i.fontFamily,f.textAlign="center",t?(f.moveTo(e.x+e.w/2,e.y),f.lineTo(e.x+e.w-e.h/2,e.y),f.quadraticCurveTo(e.x+e.w,e.y,e.x+e.w,e.y+e.h/2),f.lineTo(e.x+e.w,e.y+e.h-e.h/2),f.quadraticCurveTo(e.x+e.w,e.y+e.h,e.x+e.w-e.h/2,e.y+e.h),f.lineTo(e.x+e.h/2,e.y+e.h),f.quadraticCurveTo(e.x,e.y+e.h,e.x,e.y+e.h-e.h/2),f.lineTo(e.x,e.y+e.h/2),f.quadraticCurveTo(e.x,e.y,e.x+e.h/2,e.y)):f.arc(e.x+e.w/2,e.y+e.h/2,e.h/2,0,2*Math.PI),f.fillStyle="rgba("+i.bgColor.r+","+i.bgColor.g+","+i.bgColor.b+","+e.o+")",f.fill(),f.closePath(),f.beginPath(),f.stroke(),f.fillStyle="rgba("+i.textColor.r+","+i.textColor.g+","+i.textColor.b+","+e.o+")","number"==typeof e.n&&e.n>999?f.fillText((e.n>9999?9:Math.floor(e.n/1e3))+"k+",Math.floor(e.x+e.w/2),Math.floor(e.y+e.h-.2*e.h)):f.fillText(e.n,Math.floor(e.x+e.w/2),Math.floor(e.y+e.h-.15*e.h)),f.closePath()},I.rectangle=function(e){e=T(e);var t=!1;2===e.len?(e.x=e.x-.4*e.w,e.w=1.4*e.w,t=!0):e.len>=3&&(e.x=e.x-.65*e.w,e.w=1.65*e.w,t=!0),f.clearRect(0,0,h,l),f.drawImage(c,0,0,h,l),f.beginPath(),f.font=i.fontStyle+" "+Math.floor(e.h*(e.n>99?.9:1))+"px "+i.fontFamily,f.textAlign="center",f.fillStyle="rgba("+i.bgColor.r+","+i.bgColor.g+","+i.bgColor.b+","+e.o+")",f.fillRect(e.x,e.y,e.w,e.h),f.fillStyle="rgba("+i.textColor.r+","+i.textColor.g+","+i.textColor.b+","+e.o+")","number"==typeof e.n&&e.n>999?f.fillText((e.n>9999?9:Math.floor(e.n/1e3))+"k+",Math.floor(e.x+e.w/2),Math.floor(e.y+e.h-.2*e.h)):f.fillText(e.n,Math.floor(e.x+e.w/2),Math.floor(e.y+e.h-.15*e.h)),f.closePath()};var A=function(e,t){t=("string"==typeof t?{animation:t}:t)||{},g=function(){try{if("number"==typeof e?e>0:""!==e){var n={type:"badge",options:{n:e}};if("animation"in t&&S.types[""+t.animation]&&(n.options.animation=""+t.animation),"type"in t&&I[""+t.type]&&(n.options.type=""+t.type),["bgColor","textColor"].forEach(function(e){e in t&&(n.options[e]=o(t[e]))}),["fontStyle","fontFamily"].forEach(function(e){e in t&&(n.options[e]=t[e])}),v.push(n),v.length>100)throw"Too many badges requests in queue.";M.start()}else M.reset()}catch(r){throw"Error setting badge. Message: "+r.message}},d&&g()},E=function(e){g=function(){try{var t=e.width,o=e.height,n=document.createElement("img"),r=o/l>t/h?t/h:o/l;n.setAttribute("src",e.getAttribute("src")),n.height=o/r,n.width=t/r,f.clearRect(0,0,h,l),f.drawImage(n,0,0,h,l),L.setIcon(s)}catch(i){throw"Error setting image. Message: "+i.message}},d&&g()},U=function(e){g=function(){try{if("stop"===e)return w=!0,M.reset(),void(w=!1);e.addEventListener("play",function(){t(this)},!1)}catch(o){throw"Error setting video. Message: "+o.message}},d&&g()},R=function(e){if(window.URL&&window.URL.createObjectURL||(window.URL=window.URL||{},window.URL.createObjectURL=function(e){return e}),m.supported){var o=!1;navigator.getUserMedia=navigator.getUserMedia||navigator.oGetUserMedia||navigator.msGetUserMedia||navigator.mozGetUserMedia||navigator.webkitGetUserMedia,g=function(){try{if("stop"===e)return w=!0,M.reset(),void(w=!1);o=document.createElement("video"),o.width=h,o.height=l,navigator.getUserMedia({video:!0,audio:!1},function(e){o.src=URL.createObjectURL(e),o.play(),t(o)},function(){})}catch(n){throw"Error setting webcam. Message: "+n.message}},d&&g()}},L={};L.getIcon=function(){var e=!1,t=function(){for(var e=document.getElementsByTagName("head")[0].getElementsByTagName("link"),t=e.length,o=t-1;o>=0;o--)if(/(^|\s)icon(\s|$)/i.test(e[o].getAttribute("rel")))return e[o];return!1};return i.element?e=i.element:i.elementId?(e=document.getElementById(i.elementId),e.setAttribute("href",e.getAttribute("src"))):(e=t(),e===!1&&(e=document.createElement("link"),e.setAttribute("rel","icon"),document.getElementsByTagName("head")[0].appendChild(e))),e.setAttribute("type","image/png"),e},L.setIcon=function(e){var t=e.toDataURL("image/png");if(i.dataUrl&&i.dataUrl(t),i.element)i.element.setAttribute("src",t);else if(i.elementId)document.getElementById(i.elementId).setAttribute("src",t);else if(m.ff||m.opera){var o=a;a=document.createElement("link"),m.opera&&a.setAttribute("rel","icon"),a.setAttribute("rel","icon"),a.setAttribute("type","image/png"),document.getElementsByTagName("head")[0].appendChild(a),a.setAttribute("href",t),o.parentNode&&o.parentNode.removeChild(o)}else a.setAttribute("href",t)};var S={};return S.duration=40,S.types={},S.types.fade=[{x:.4,y:.4,w:.6,h:.6,o:0},{x:.4,y:.4,w:.6,h:.6,o:.1},{x:.4,y:.4,w:.6,h:.6,o:.2},{x:.4,y:.4,w:.6,h:.6,o:.3},{x:.4,y:.4,w:.6,h:.6,o:.4},{x:.4,y:.4,w:.6,h:.6,o:.5},{x:.4,y:.4,w:.6,h:.6,o:.6},{x:.4,y:.4,w:.6,h:.6,o:.7},{x:.4,y:.4,w:.6,h:.6,o:.8},{x:.4,y:.4,w:.6,h:.6,o:.9},{x:.4,y:.4,w:.6,h:.6,o:1}],S.types.none=[{x:.4,y:.4,w:.6,h:.6,o:1}],S.types.pop=[{x:1,y:1,w:0,h:0,o:1},{x:.9,y:.9,w:.1,h:.1,o:1},{x:.8,y:.8,w:.2,h:.2,o:1},{x:.7,y:.7,w:.3,h:.3,o:1},{x:.6,y:.6,w:.4,h:.4,o:1},{x:.5,y:.5,w:.5,h:.5,o:1},{x:.4,y:.4,w:.6,h:.6,o:1}],S.types.popFade=[{x:.75,y:.75,w:0,h:0,o:0},{x:.65,y:.65,w:.1,h:.1,o:.2},{x:.6,y:.6,w:.2,h:.2,o:.4},{x:.55,y:.55,w:.3,h:.3,o:.6},{x:.5,y:.5,w:.4,h:.4,o:.8},{x:.45,y:.45,w:.5,h:.5,o:.9},{x:.4,y:.4,w:.6,h:.6,o:1}],S.types.slide=[{x:.4,y:1,w:.6,h:.6,o:1},{x:.4,y:.9,w:.6,h:.6,o:1},{x:.4,y:.9,w:.6,h:.6,o:1},{x:.4,y:.8,w:.6,h:.6,o:1},{x:.4,y:.7,w:.6,h:.6,o:1},{x:.4,y:.6,w:.6,h:.6,o:1},{x:.4,y:.5,w:.6,h:.6,o:1},{x:.4,y:.4,w:.6,h:.6,o:1}],S.run=function(e,t,o,a){var l=S.types[r()?"none":i.animation];return a=o===!0?"undefined"!=typeof a?a:l.length-1:"undefined"!=typeof a?a:0,t=t?t:function(){},a<l.length&&a>=0?(I[i.type](n(e,l[a])),x=setTimeout(function(){o?a-=1:a+=1,S.run(e,t,o,a)},S.duration),L.setIcon(s),void 0):void t()},C(),{badge:A,video:U,image:E,webcam:R,reset:M.reset,browser:{supported:m.supported}}};"undefined"!=typeof define&&define.amd?define([],function(){return e}):"undefined"!=typeof module&&module.exports?module.exports=e:this.Favico=e}();;/*! jQuery v1.7.1 jquery.com | jquery.org/license */
(function(a,b){function cy(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cv(a){if(!ck[a]){var b=c.body,d=f("<"+a+">").appendTo(b),e=d.css("display");d.remove();if(e==="none"||e===""){cl||(cl=c.createElement("iframe"),cl.frameBorder=cl.width=cl.height=0),b.appendChild(cl);if(!cm||!cl.createElement)cm=(cl.contentWindow||cl.contentDocument).document,cm.write((c.compatMode==="CSS1Compat"?"<!doctype html>":"")+"<html><body>"),cm.close();d=cm.createElement(a),cm.body.appendChild(d),e=f.css(d,"display"),b.removeChild(cl)}ck[a]=e}return ck[a]}function cu(a,b){var c={};f.each(cq.concat.apply([],cq.slice(0,b)),function(){c[this]=a});return c}function ct(){cr=b}function cs(){setTimeout(ct,0);return cr=f.now()}function cj(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ci(){try{return new a.XMLHttpRequest}catch(b){}}function cc(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function cb(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function ca(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bE.test(a)?d(a,e):ca(a+"["+(typeof e=="object"||f.isArray(e)?b:"")+"]",e,c,d)});else if(!c&&b!=null&&typeof b=="object")for(var e in b)ca(a+"["+e+"]",b[e],c,d);else d(a,b)}function b_(a,c){var d,e,g=f.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((g[d]?a:e||(e={}))[d]=c[d]);e&&f.extend(!0,a,e)}function b$(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bT,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=b$(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=b$(a,c,d,e,"*",g));return l}function bZ(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bP),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bC(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=b==="width"?bx:by,g=0,h=e.length;if(d>0){if(c!=="border")for(;g<h;g++)c||(d-=parseFloat(f.css(a,"padding"+e[g]))||0),c==="margin"?d+=parseFloat(f.css(a,c+e[g]))||0:d-=parseFloat(f.css(a,"border"+e[g]+"Width"))||0;return d+"px"}d=bz(a,b,b);if(d<0||d==null)d=a.style[b]||0;d=parseFloat(d)||0;if(c)for(;g<h;g++)d+=parseFloat(f.css(a,"padding"+e[g]))||0,c!=="padding"&&(d+=parseFloat(f.css(a,"border"+e[g]+"Width"))||0),c==="margin"&&(d+=parseFloat(f.css(a,c+e[g]))||0);return d+"px"}function bp(a,b){b.src?f.ajax({url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(bf,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)}function bo(a){var b=c.createElement("div");bh.appendChild(b),b.innerHTML=a.outerHTML;return b.firstChild}function bn(a){var b=(a.nodeName||"").toLowerCase();b==="input"?bm(a):b!=="script"&&typeof a.getElementsByTagName!="undefined"&&f.grep(a.getElementsByTagName("input"),bm)}function bm(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bl(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bk(a,b){var c;if(b.nodeType===1){b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase();if(c==="object")b.outerHTML=a.outerHTML;else if(c!=="input"||a.type!=="checkbox"&&a.type!=="radio"){if(c==="option")b.selected=a.defaultSelected;else if(c==="input"||c==="textarea")b.defaultValue=a.defaultValue}else a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value);b.removeAttribute(f.expando)}}function bj(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c,d,e,g=f._data(a),h=f._data(b,g),i=g.events;if(i){delete h.handle,h.events={};for(c in i)for(d=0,e=i[c].length;d<e;d++)f.event.add(b,c+(i[c][d].namespace?".":"")+i[c][d].namespace,i[c][d],i[c][d].data)}h.data&&(h.data=f.extend({},h.data))}}function bi(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function U(a){var b=V.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function T(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(O.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function S(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function K(){return!0}function J(){return!1}function n(a,b,c){var d=b+"defer",e=b+"queue",g=b+"mark",h=f._data(a,d);h&&(c==="queue"||!f._data(a,e))&&(c==="mark"||!f._data(a,g))&&setTimeout(function(){!f._data(a,e)&&!f._data(a,g)&&(f.removeData(a,d,!0),h.fire())},0)}function m(a){for(var b in a){if(b==="data"&&f.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function l(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(k,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNumeric(d)?parseFloat(d):j.test(d)?f.parseJSON(d):d}catch(g){}f.data(a,c,d)}else d=b}return d}function h(a){var b=g[a]={},c,d;a=a.split(/\s+/);for(c=0,d=a.length;c<d;c++)b[a[c]]=!0;return b}var c=a.document,d=a.navigator,e=a.location,f=function(){function J(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(J,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,n=/^[\],:{}\s]*$/,o=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,p=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,q=/(?:^|:|,)(?:\s*\[)+/g,r=/(webkit)[ \/]([\w.]+)/,s=/(opera)(?:.*version)?[ \/]([\w.]+)/,t=/(msie) ([\w.]+)/,u=/(mozilla)(?:.*? rv:([\w.]+))?/,v=/-([a-z]|[0-9])/ig,w=/^-ms-/,x=function(a,b){return(b+"").toUpperCase()},y=d.userAgent,z,A,B,C=Object.prototype.toString,D=Object.prototype.hasOwnProperty,E=Array.prototype.push,F=Array.prototype.slice,G=String.prototype.trim,H=Array.prototype.indexOf,I={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=m.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.7.1",length:0,size:function(){return this.length},toArray:function(){return F.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?E.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),A.add(a);return this},eq:function(a){a=+a;return a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(F.apply(this,arguments),"slice",F.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:E,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;A.fireWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").off("ready")}},bindReady:function(){if(!A){A=e.Callbacks("once memory");if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",B,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",B),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&J()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a&&typeof a=="object"&&"setInterval"in a},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):I[C.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;try{if(a.constructor&&!D.call(a,"constructor")&&!D.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||D.call(a,d)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw new Error(a)},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(n.test(b.replace(o,"@").replace(p,"]").replace(q,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(c){var d,f;try{a.DOMParser?(f=new DOMParser,d=f.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(g){d=b}(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&e.error("Invalid XML: "+c);return d},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(w,"ms-").replace(v,x)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:G?function(a){return a==null?"":G.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?E.call(c,a):e.merge(c,a)}return c},inArray:function(a,b,c){var d;if(b){if(H)return H.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=F.call(arguments,2),g=function(){return a.apply(c,f.concat(F.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h){var i=a.length;if(typeof c=="object"){for(var j in c)e.access(a,j,c[j],f,g,d);return a}if(d!==b){f=!h&&f&&e.isFunction(d);for(var k=0;k<i;k++)g(a[k],c,f?d.call(a[k],k,g(a[k],c)):d,h);return a}return i?g(a[0],c):b},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=r.exec(a)||s.exec(a)||t.exec(a)||a.indexOf("compatible")<0&&u.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){I["[object "+b+"]"]=b.toLowerCase()}),z=e.uaMatch(y),z.browser&&(e.browser[z.browser]=!0,e.browser.version=z.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?B=function(){c.removeEventListener("DOMContentLoaded",B,!1),e.ready()}:c.attachEvent&&(B=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",B),e.ready())});return e}(),g={};f.Callbacks=function(a){a=a?g[a]||h(a):{};var c=[],d=[],e,i,j,k,l,m=function(b){var d,e,g,h,i;for(d=0,e=b.length;d<e;d++)g=b[d],h=f.type(g),h==="array"?m(g):h==="function"&&(!a.unique||!o.has(g))&&c.push(g)},n=function(b,f){f=f||[],e=!a.memory||[b,f],i=!0,l=j||0,j=0,k=c.length;for(;c&&l<k;l++)if(c[l].apply(b,f)===!1&&a.stopOnFalse){e=!0;break}i=!1,c&&(a.once?e===!0?o.disable():c=[]:d&&d.length&&(e=d.shift(),o.fireWith(e[0],e[1])))},o={add:function(){if(c){var a=c.length;m(arguments),i?k=c.length:e&&e!==!0&&(j=a,n(e[0],e[1]))}return this},remove:function(){if(c){var b=arguments,d=0,e=b.length;for(;d<e;d++)for(var f=0;f<c.length;f++)if(b[d]===c[f]){i&&f<=k&&(k--,f<=l&&l--),c.splice(f--,1);if(a.unique)break}}return this},has:function(a){if(c){var b=0,d=c.length;for(;b<d;b++)if(a===c[b])return!0}return!1},empty:function(){c=[];return this},disable:function(){c=d=e=b;return this},disabled:function(){return!c},lock:function(){d=b,(!e||e===!0)&&o.disable();return this},locked:function(){return!d},fireWith:function(b,c){d&&(i?a.once||d.push([b,c]):(!a.once||!e)&&n(b,c));return this},fire:function(){o.fireWith(this,arguments);return this},fired:function(){return!!e}};return o};var i=[].slice;f.extend({Deferred:function(a){var b=f.Callbacks("once memory"),c=f.Callbacks("once memory"),d=f.Callbacks("memory"),e="pending",g={resolve:b,reject:c,notify:d},h={done:b.add,fail:c.add,progress:d.add,state:function(){return e},isResolved:b.fired,isRejected:c.fired,then:function(a,b,c){i.done(a).fail(b).progress(c);return this},always:function(){i.done.apply(i,arguments).fail.apply(i,arguments);return this},pipe:function(a,b,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[b,"reject"],progress:[c,"notify"]},function(a,b){var c=b[0],e=b[1],g;f.isFunction(c)?i[a](function(){g=c.apply(this,arguments),g&&f.isFunction(g.promise)?g.promise().then(d.resolve,d.reject,d.notify):d[e+"With"](this===i?d:this,[g])}):i[a](d[e])})}).promise()},promise:function(a){if(a==null)a=h;else for(var b in h)a[b]=h[b];return a}},i=h.promise({}),j;for(j in g)i[j]=g[j].fire,i[j+"With"]=g[j].fireWith;i.done(function(){e="resolved"},c.disable,d.lock).fail(function(){e="rejected"},b.disable,d.lock),a&&a.call(i,i);return i},when:function(a){function m(a){return function(b){e[a]=arguments.length>1?i.call(arguments,0):b,j.notifyWith(k,e)}}function l(a){return function(c){b[a]=arguments.length>1?i.call(arguments,0):c,--g||j.resolveWith(j,b)}}var b=i.call(arguments,0),c=0,d=b.length,e=Array(d),g=d,h=d,j=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred(),k=j.promise();if(d>1){for(;c<d;c++)b[c]&&b[c].promise&&f.isFunction(b[c].promise)?b[c].promise().then(l(c),j.reject,m(c)):--g;g||j.resolveWith(j,b)}else j!==a&&j.resolveWith(j,d?[a]:[]);return k}}),f.support=function(){var b,d,e,g,h,i,j,k,l,m,n,o,p,q=c.createElement("div"),r=c.documentElement;q.setAttribute("className","t"),q.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=q.getElementsByTagName("*"),e=q.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=q.getElementsByTagName("input")[0],b={leadingWhitespace:q.firstChild.nodeType===3,tbody:!q.getElementsByTagName("tbody").length,htmlSerialize:!!q.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:i.value==="on",optSelected:h.selected,getSetAttribute:q.className!=="t",enctype:!!c.createElement("form").enctype,html5Clone:c.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0},i.checked=!0,b.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,b.optDisabled=!h.disabled;try{delete q.test}catch(s){b.deleteExpando=!1}!q.addEventListener&&q.attachEvent&&q.fireEvent&&(q.attachEvent("onclick",function(){b.noCloneEvent=!1}),q.cloneNode(!0).fireEvent("onclick")),i=c.createElement("input"),i.value="t",i.setAttribute("type","radio"),b.radioValue=i.value==="t",i.setAttribute("checked","checked"),q.appendChild(i),k=c.createDocumentFragment(),k.appendChild(q.lastChild),b.checkClone=k.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=i.checked,k.removeChild(i),k.appendChild(q),q.innerHTML="",a.getComputedStyle&&(j=c.createElement("div"),j.style.width="0",j.style.marginRight="0",q.style.width="2px",q.appendChild(j),b.reliableMarginRight=(parseInt((a.getComputedStyle(j,null)||{marginRight:0}).marginRight,10)||0)===0);if(q.attachEvent)for(o in{submit:1,change:1,focusin:1})n="on"+o,p=n in q,p||(q.setAttribute(n,"return;"),p=typeof q[n]=="function"),b[o+"Bubbles"]=p;k.removeChild(q),k=g=h=j=q=i=null,f(function(){var a,d,e,g,h,i,j,k,m,n,o,r=c.getElementsByTagName("body")[0];!r||(j=1,k="position:absolute;top:0;left:0;width:1px;height:1px;margin:0;",m="visibility:hidden;border:0;",n="style='"+k+"border:5px solid #000;padding:0;'",o="<div "+n+"><div></div></div>"+"<table "+n+" cellpadding='0' cellspacing='0'>"+"<tr><td></td></tr></table>",a=c.createElement("div"),a.style.cssText=m+"width:0;height:0;position:static;top:0;margin-top:"+j+"px",r.insertBefore(a,r.firstChild),q=c.createElement("div"),a.appendChild(q),q.innerHTML="<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>",l=q.getElementsByTagName("td"),p=l[0].offsetHeight===0,l[0].style.display="",l[1].style.display="none",b.reliableHiddenOffsets=p&&l[0].offsetHeight===0,q.innerHTML="",q.style.width=q.style.paddingLeft="1px",f.boxModel=b.boxModel=q.offsetWidth===2,typeof q.style.zoom!="undefined"&&(q.style.display="inline",q.style.zoom=1,b.inlineBlockNeedsLayout=q.offsetWidth===2,q.style.display="",q.innerHTML="<div style='width:4px;'></div>",b.shrinkWrapBlocks=q.offsetWidth!==2),q.style.cssText=k+m,q.innerHTML=o,d=q.firstChild,e=d.firstChild,h=d.nextSibling.firstChild.firstChild,i={doesNotAddBorder:e.offsetTop!==5,doesAddBorderForTableAndCells:h.offsetTop===5},e.style.position="fixed",e.style.top="20px",i.fixedPosition=e.offsetTop===20||e.offsetTop===15,e.style.position=e.style.top="",d.style.overflow="hidden",d.style.position="relative",i.subtractsBorderForOverflowNotVisible=e.offsetTop===-5,i.doesNotIncludeMarginInBodyOffset=r.offsetTop!==j,r.removeChild(a),q=a=null,f.extend(b,i))});return b}();var j=/^(?:\{.*\}|\[.*\])$/,k=/([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!m(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g,h,i,j=f.expando,k=typeof c=="string",l=a.nodeType,m=l?f.cache:a,n=l?a[j]:a[j]&&j,o=c==="events";if((!n||!m[n]||!o&&!e&&!m[n].data)&&k&&d===b)return;n||(l?a[j]=n=++f.uuid:n=j),m[n]||(m[n]={},l||(m[n].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?m[n]=f.extend(m[n],c):m[n].data=f.extend(m[n].data,c);g=h=m[n],e||(h.data||(h.data={}),h=h.data),d!==b&&(h[f.camelCase(c)]=d);if(o&&!h[c])return g.events;k?(i=h[c],i==null&&(i=h[f.camelCase(c)])):i=h;return i}},removeData:function(a,b,c){if(!!f.acceptData(a)){var d,e,g,h=f.expando,i=a.nodeType,j=i?f.cache:a,k=i?a[h]:h;if(!j[k])return;if(b){d=c?j[k]:j[k].data;if(d){f.isArray(b)||(b in d?b=[b]:(b=f.camelCase(b),b in d?b=[b]:b=b.split(" ")));for(e=0,g=b.length;e<g;e++)delete d[b[e]];if(!(c?m:f.isEmptyObject)(d))return}}if(!c){delete j[k].data;if(!m(j[k]))return}f.support.deleteExpando||!j.setInterval?delete j[k]:j[k]=null,i&&(f.support.deleteExpando?delete a[h]:a.removeAttribute?a.removeAttribute(h):a[h]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d,e,g,h=null;if(typeof a=="undefined"){if(this.length){h=f.data(this[0]);if(this[0].nodeType===1&&!f._data(this[0],"parsedAttrs")){e=this[0].attributes;for(var i=0,j=e.length;i<j;i++)g=e[i].name,g.indexOf("data-")===0&&(g=f.camelCase(g.substring(5)),l(this[0],g,h[g]));f._data(this[0],"parsedAttrs",!0)}}return h}if(typeof a=="object")return this.each(function(){f.data(this,a)});d=a.split("."),d[1]=d[1]?"."+d[1]:"";if(c===b){h=this.triggerHandler("getData"+d[1]+"!",[d[0]]),h===b&&this.length&&(h=f.data(this[0],a),h=l(this[0],a,h));return h===b&&d[1]?this.data(d[0]):h}return this.each(function(){var b=f(this),e=[d[0],c];b.triggerHandler("setData"+d[1]+"!",e),f.data(this,a,c),b.triggerHandler("changeData"+d[1]+"!",e)})},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,b){a&&(b=(b||"fx")+"mark",f._data(a,b,(f._data(a,b)||0)+1))},_unmark:function(a,b,c){a!==!0&&(c=b,b=a,a=!1);if(b){c=c||"fx";var d=c+"mark",e=a?0:(f._data(b,d)||1)-1;e?f._data(b,d,e):(f.removeData(b,d,!0),n(b,c,"mark"))}},queue:function(a,b,c){var d;if(a){b=(b||"fx")+"queue",d=f._data(a,b),c&&(!d||f.isArray(c)?d=f._data(a,b,f.makeArray(c)):d.push(c));return d||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e={};d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),f._data(a,b+".run",e),d.call(a,function(){f.dequeue(a,b)},e)),c.length||(f.removeData(a,b+"queue "+b+".run",!0),n(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){typeof a!="string"&&(c=a,a="fx");if(c===b)return f.queue(this[0],a);return this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f.Callbacks("once memory"),!0))h++,l.add(m);m();return d.promise()}});var o=/[\n\t\r]/g,p=/\s+/,q=/\r/g,r=/^(?:button|input)$/i,s=/^(?:button|input|object|select|textarea)$/i,t=/^a(?:rea)?$/i,u=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,v=f.support.getSetAttribute,w,x,y;f.fn.extend({attr:function(a,b){return f.access(this,a,b,!0,f.attr)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,a,b,!0,f.prop)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,g,h,i;if(f.isFunction(a))return this.each(function(b){f(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(p);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{g=" "+e.className+" ";for(h=0,i=b.length;h<i;h++)~g.indexOf(" "+b[h]+" ")||(g+=b[h]+" ");e.className=f.trim(g)}}}return this},removeClass:function(a){var c,d,e,g,h,i,j;if(f.isFunction(a))return this.each(function(b){f(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(p);for(d=0,e=this.length;d<e;d++){g=this[d];if(g.nodeType===1&&g.className)if(a){h=(" "+g.className+" ").replace(o," ");for(i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){f(this).toggleClass(a.call(this,c,this.className,b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(p);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(o," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e,g=this[0];{if(!!arguments.length){e=f.isFunction(a);return this.each(function(d){var g=f(this),h;if(this.nodeType===1){e?h=a.call(this,d,g.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.nodeName.toLowerCase()]||f.valHooks[this.type];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}if(g){c=f.valHooks[g.nodeName.toLowerCase()]||f.valHooks[g.type];if(c&&"get"in c&&(d=c.get(g,"value"))!==b)return d;d=g.value;return typeof d=="string"?d.replace(q,""):d==null?"":d}}}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,g=a.selectedIndex,h=[],i=a.options,j=a.type==="select-one";if(g<0)return null;c=j?g:0,d=j?g+1:i.length;for(;c<d;c++){e=i[c];if(e.selected&&(f.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!f.nodeName(e.parentNode,"optgroup"))){b=f(e).val();if(j)return b;h.push(b)}}if(j&&!h.length&&i.length)return f(i[g]).val();return h},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attr:function(a,c,d,e){var g,h,i,j=a.nodeType;if(!!a&&j!==3&&j!==8&&j!==2){if(e&&c in f.attrFn)return f(a)[c](d);if(typeof a.getAttribute=="undefined")return f.prop(a,c,d);i=j!==1||!f.isXMLDoc(a),i&&(c=c.toLowerCase(),h=f.attrHooks[c]||(u.test(c)?x:w));if(d!==b){if(d===null){f.removeAttr(a,c);return}if(h&&"set"in h&&i&&(g=h.set(a,d,c))!==b)return g;a.setAttribute(c,""+d);return d}if(h&&"get"in h&&i&&(g=h.get(a,c))!==null)return g;g=a.getAttribute(c);return g===null?b:g}},removeAttr:function(a,b){var c,d,e,g,h=0;if(b&&a.nodeType===1){d=b.toLowerCase().split(p),g=d.length;for(;h<g;h++)e=d[h],e&&(c=f.propFix[e]||e,f.attr(a,e,""),a.removeAttribute(v?e:c),u.test(e)&&c in a&&(a[c]=!1))}},attrHooks:{type:{set:function(a,b){if(r.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},value:{get:function(a,b){if(w&&f.nodeName(a,"button"))return w.get(a,b);return b in a?a.value:null},set:function(a,b,c){if(w&&f.nodeName(a,"button"))return w.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,g,h,i=a.nodeType;if(!!a&&i!==3&&i!==8&&i!==2){h=i!==1||!f.isXMLDoc(a),h&&(c=f.propFix[c]||c,g=f.propHooks[c]);return d!==b?g&&"set"in g&&(e=g.set(a,d,c))!==b?e:a[c]=d:g&&"get"in g&&(e=g.get(a,c))!==null?e:a[c]}},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):s.test(a.nodeName)||t.test(a.nodeName)&&a.href?0:b}}}}),f.attrHooks.tabindex=f.propHooks.tabIndex,x={get:function(a,c){var d,e=f.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase()));return c}},v||(y={name:!0,id:!0},w=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&(y[c]?d.nodeValue!=="":d.specified)?d.nodeValue:b},set:function(a,b,d){var e=a.getAttributeNode(d);e||(e=c.createAttribute(d),a.setAttributeNode(e));return e.nodeValue=b+""}},f.attrHooks.tabindex.set=w.set,f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})}),f.attrHooks.contenteditable={get:w.get,set:function(a,b,c){b===""&&(b="false"),w.set(a,b,c)}}),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex);return null}})),f.support.enctype||(f.propFix.enctype="encoding"),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var z=/^(?:textarea|input|select)$/i,A=/^([^\.]*)?(?:\.(.+))?$/,B=/\bhover(\.\S+)?\b/,C=/^key/,D=/^(?:mouse|contextmenu)|click/,E=/^(?:focusinfocus|focusoutblur)$/,F=/^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,G=function(a){var b=F.exec(a);b&&(b[1]=(b[1]||"").toLowerCase(),b[3]=b[3]&&new RegExp("(?:^|\\s)"+b[3]+"(?:\\s|$)"));return b},H=function(a,b){var c=a.attributes||{};return(!b[1]||a.nodeName.toLowerCase()===b[1])&&(!b[2]||(c.id||{}).value===b[2])&&(!b[3]||b[3].test((c["class"]||{}).value))},I=function(a){return f.event.special.hover?a:a.replace(B,"mouseenter$1 mouseleave$1")};
f.event={add:function(a,c,d,e,g){var h,i,j,k,l,m,n,o,p,q,r,s;if(!(a.nodeType===3||a.nodeType===8||!c||!d||!(h=f._data(a)))){d.handler&&(p=d,d=p.handler),d.guid||(d.guid=f.guid++),j=h.events,j||(h.events=j={}),i=h.handle,i||(h.handle=i=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.dispatch.apply(i.elem,arguments):b},i.elem=a),c=f.trim(I(c)).split(" ");for(k=0;k<c.length;k++){l=A.exec(c[k])||[],m=l[1],n=(l[2]||"").split(".").sort(),s=f.event.special[m]||{},m=(g?s.delegateType:s.bindType)||m,s=f.event.special[m]||{},o=f.extend({type:m,origType:l[1],data:e,handler:d,guid:d.guid,selector:g,quick:G(g),namespace:n.join(".")},p),r=j[m];if(!r){r=j[m]=[],r.delegateCount=0;if(!s.setup||s.setup.call(a,e,n,i)===!1)a.addEventListener?a.addEventListener(m,i,!1):a.attachEvent&&a.attachEvent("on"+m,i)}s.add&&(s.add.call(a,o),o.handler.guid||(o.handler.guid=d.guid)),g?r.splice(r.delegateCount++,0,o):r.push(o),f.event.global[m]=!0}a=null}},global:{},remove:function(a,b,c,d,e){var g=f.hasData(a)&&f._data(a),h,i,j,k,l,m,n,o,p,q,r,s;if(!!g&&!!(o=g.events)){b=f.trim(I(b||"")).split(" ");for(h=0;h<b.length;h++){i=A.exec(b[h])||[],j=k=i[1],l=i[2];if(!j){for(j in o)f.event.remove(a,j+b[h],c,d,!0);continue}p=f.event.special[j]||{},j=(d?p.delegateType:p.bindType)||j,r=o[j]||[],m=r.length,l=l?new RegExp("(^|\\.)"+l.split(".").sort().join("\\.(?:.*\\.)?")+"(\\.|$)"):null;for(n=0;n<r.length;n++)s=r[n],(e||k===s.origType)&&(!c||c.guid===s.guid)&&(!l||l.test(s.namespace))&&(!d||d===s.selector||d==="**"&&s.selector)&&(r.splice(n--,1),s.selector&&r.delegateCount--,p.remove&&p.remove.call(a,s));r.length===0&&m!==r.length&&((!p.teardown||p.teardown.call(a,l)===!1)&&f.removeEvent(a,j,g.handle),delete o[j])}f.isEmptyObject(o)&&(q=g.handle,q&&(q.elem=null),f.removeData(a,["events","handle"],!0))}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){if(!e||e.nodeType!==3&&e.nodeType!==8){var h=c.type||c,i=[],j,k,l,m,n,o,p,q,r,s;if(E.test(h+f.event.triggered))return;h.indexOf("!")>=0&&(h=h.slice(0,-1),k=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());if((!e||f.event.customEvent[h])&&!f.event.global[h])return;c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.isTrigger=!0,c.exclusive=k,c.namespace=i.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)"):null,o=h.indexOf(":")<0?"on"+h:"";if(!e){j=f.cache;for(l in j)j[l].events&&j[l].events[h]&&f.event.trigger(c,d,j[l].handle.elem,!0);return}c.result=b,c.target||(c.target=e),d=d!=null?f.makeArray(d):[],d.unshift(c),p=f.event.special[h]||{};if(p.trigger&&p.trigger.apply(e,d)===!1)return;r=[[e,p.bindType||h]];if(!g&&!p.noBubble&&!f.isWindow(e)){s=p.delegateType||h,m=E.test(s+h)?e:e.parentNode,n=null;for(;m;m=m.parentNode)r.push([m,s]),n=m;n&&n===e.ownerDocument&&r.push([n.defaultView||n.parentWindow||a,s])}for(l=0;l<r.length&&!c.isPropagationStopped();l++)m=r[l][0],c.type=r[l][1],q=(f._data(m,"events")||{})[c.type]&&f._data(m,"handle"),q&&q.apply(m,d),q=o&&m[o],q&&f.acceptData(m)&&q.apply(m,d)===!1&&c.preventDefault();c.type=h,!g&&!c.isDefaultPrevented()&&(!p._default||p._default.apply(e.ownerDocument,d)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)&&o&&e[h]&&(h!=="focus"&&h!=="blur"||c.target.offsetWidth!==0)&&!f.isWindow(e)&&(n=e[o],n&&(e[o]=null),f.event.triggered=h,e[h](),f.event.triggered=b,n&&(e[o]=n));return c.result}},dispatch:function(c){c=f.event.fix(c||a.event);var d=(f._data(this,"events")||{})[c.type]||[],e=d.delegateCount,g=[].slice.call(arguments,0),h=!c.exclusive&&!c.namespace,i=[],j,k,l,m,n,o,p,q,r,s,t;g[0]=c,c.delegateTarget=this;if(e&&!c.target.disabled&&(!c.button||c.type!=="click")){m=f(this),m.context=this.ownerDocument||this;for(l=c.target;l!=this;l=l.parentNode||this){o={},q=[],m[0]=l;for(j=0;j<e;j++)r=d[j],s=r.selector,o[s]===b&&(o[s]=r.quick?H(l,r.quick):m.is(s)),o[s]&&q.push(r);q.length&&i.push({elem:l,matches:q})}}d.length>e&&i.push({elem:this,matches:d.slice(e)});for(j=0;j<i.length&&!c.isPropagationStopped();j++){p=i[j],c.currentTarget=p.elem;for(k=0;k<p.matches.length&&!c.isImmediatePropagationStopped();k++){r=p.matches[k];if(h||!c.namespace&&!r.namespace||c.namespace_re&&c.namespace_re.test(r.namespace))c.data=r.data,c.handleObj=r,n=((f.event.special[r.origType]||{}).handle||r.handler).apply(p.elem,g),n!==b&&(c.result=n,n===!1&&(c.preventDefault(),c.stopPropagation()))}}return c.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode);return a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,d){var e,f,g,h=d.button,i=d.fromElement;a.pageX==null&&d.clientX!=null&&(e=a.target.ownerDocument||c,f=e.documentElement,g=e.body,a.pageX=d.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=d.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?d.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0);return a}},fix:function(a){if(a[f.expando])return a;var d,e,g=a,h=f.event.fixHooks[a.type]||{},i=h.props?this.props.concat(h.props):this.props;a=f.Event(g);for(d=i.length;d;)e=i[--d],a[e]=g[e];a.target||(a.target=g.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey===b&&(a.metaKey=a.ctrlKey);return h.filter?h.filter(a,g):a},special:{ready:{setup:f.bindReady},load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=f.extend(new f.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?f.event.trigger(e,null,b):f.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},f.event.handle=f.event.dispatch,f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!(this instanceof f.Event))return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?K:J):this.type=a,b&&f.extend(this,b),this.timeStamp=a&&a.timeStamp||f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=K;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=K;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=K,this.stopPropagation()},isDefaultPrevented:J,isPropagationStopped:J,isImmediatePropagationStopped:J},f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c=this,d=a.relatedTarget,e=a.handleObj,g=e.selector,h;if(!d||d!==c&&!f.contains(c,d))a.type=e.origType,h=e.handler.apply(this,arguments),a.type=b;return h}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(){if(f.nodeName(this,"form"))return!1;f.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=f.nodeName(c,"input")||f.nodeName(c,"button")?c.form:b;d&&!d._submit_attached&&(f.event.add(d,"submit._submit",function(a){this.parentNode&&!a.isTrigger&&f.event.simulate("submit",this.parentNode,a,!0)}),d._submit_attached=!0)})},teardown:function(){if(f.nodeName(this,"form"))return!1;f.event.remove(this,"._submit")}}),f.support.changeBubbles||(f.event.special.change={setup:function(){if(z.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")f.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),f.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1,f.event.simulate("change",this,a,!0))});return!1}f.event.add(this,"beforeactivate._change",function(a){var b=a.target;z.test(b.nodeName)&&!b._change_attached&&(f.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&f.event.simulate("change",this.parentNode,a,!0)}),b._change_attached=!0)})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){f.event.remove(this,"._change");return z.test(this.nodeName)}}),f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){var d=0,e=function(a){f.event.simulate(b,a.target,f.event.fix(a),!0)};f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.fn.extend({on:function(a,c,d,e,g){var h,i;if(typeof a=="object"){typeof c!="string"&&(d=c,c=b);for(i in a)this.on(i,c,d,a[i],g);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=J;else if(!e)return this;g===1&&(h=e,e=function(a){f().off(a);return h.apply(this,arguments)},e.guid=h.guid||(h.guid=f.guid++));return this.each(function(){f.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on.call(this,a,b,c,d,1)},off:function(a,c,d){if(a&&a.preventDefault&&a.handleObj){var e=a.handleObj;f(a.delegateTarget).off(e.namespace?e.type+"."+e.namespace:e.type,e.selector,e.handler);return this}if(typeof a=="object"){for(var g in a)this.off(g,c,a[g]);return this}if(c===!1||typeof c=="function")d=c,c=b;d===!1&&(d=J);return this.each(function(){f.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){f(this.context).on(a,this.selector,b,c);return this},die:function(a,b){f(this.context).off(a,this.selector||"**",b);return this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length==1?this.off(a,"**"):this.off(b,a,c)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f._data(this,"lastToggle"+a.guid)||0)%d;f._data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.on(b,null,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0),C.test(b)&&(f.event.fixHooks[b]=f.event.keyHooks),D.test(b)&&(f.event.fixHooks[b]=f.event.mouseHooks)}),function(){function x(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}if(j.nodeType===1){g||(j[d]=c,j.sizset=h);if(typeof b!="string"){if(j===b){k=!0;break}}else if(m.filter(b,[j]).length>0){k=j;break}}j=j[a]}e[h]=k}}}function w(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}j.nodeType===1&&!g&&(j[d]=c,j.sizset=h);if(j.nodeName.toLowerCase()===b){k=j;break}j=j[a]}e[h]=k}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d="sizcache"+(Math.random()+"").replace(".",""),e=0,g=Object.prototype.toString,h=!1,i=!0,j=/\\/g,k=/\r\n/g,l=/\W/;[0,0].sort(function(){i=!1;return 0});var m=function(b,d,e,f){e=e||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return e;var i,j,k,l,n,q,r,t,u=!0,v=m.isXML(d),w=[],x=b;do{a.exec(""),i=a.exec(x);if(i){x=i[3],w.push(i[1]);if(i[2]){l=i[3];break}}}while(i);if(w.length>1&&p.exec(b))if(w.length===2&&o.relative[w[0]])j=y(w[0]+w[1],d,f);else{j=o.relative[w[0]]?[d]:m(w.shift(),d);while(w.length)b=w.shift(),o.relative[b]&&(b+=w.shift()),j=y(b,j,f)}else{!f&&w.length>1&&d.nodeType===9&&!v&&o.match.ID.test(w[0])&&!o.match.ID.test(w[w.length-1])&&(n=m.find(w.shift(),d,v),d=n.expr?m.filter(n.expr,n.set)[0]:n.set[0]);if(d){n=f?{expr:w.pop(),set:s(f)}:m.find(w.pop(),w.length===1&&(w[0]==="~"||w[0]==="+")&&d.parentNode?d.parentNode:d,v),j=n.expr?m.filter(n.expr,n.set):n.set,w.length>0?k=s(j):u=!1;while(w.length)q=w.pop(),r=q,o.relative[q]?r=w.pop():q="",r==null&&(r=d),o.relative[q](k,r,v)}else k=w=[]}k||(k=j),k||m.error(q||b);if(g.call(k)==="[object Array]")if(!u)e.push.apply(e,k);else if(d&&d.nodeType===1)for(t=0;k[t]!=null;t++)k[t]&&(k[t]===!0||k[t].nodeType===1&&m.contains(d,k[t]))&&e.push(j[t]);else for(t=0;k[t]!=null;t++)k[t]&&k[t].nodeType===1&&e.push(j[t]);else s(k,e);l&&(m(l,h,e,f),m.uniqueSort(e));return e};m.uniqueSort=function(a){if(u){h=i,a.sort(u);if(h)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},m.matches=function(a,b){return m(a,null,null,b)},m.matchesSelector=function(a,b){return m(b,null,null,[a]).length>0},m.find=function(a,b,c){var d,e,f,g,h,i;if(!a)return[];for(e=0,f=o.order.length;e<f;e++){h=o.order[e];if(g=o.leftMatch[h].exec(a)){i=g[1],g.splice(1,1);if(i.substr(i.length-1)!=="\\"){g[1]=(g[1]||"").replace(j,""),d=o.find[h](g,b,c);if(d!=null){a=a.replace(o.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},m.filter=function(a,c,d,e){var f,g,h,i,j,k,l,n,p,q=a,r=[],s=c,t=c&&c[0]&&m.isXML(c[0]);while(a&&c.length){for(h in o.filter)if((f=o.leftMatch[h].exec(a))!=null&&f[2]){k=o.filter[h],l=f[1],g=!1,f.splice(1,1);if(l.substr(l.length-1)==="\\")continue;s===r&&(r=[]);if(o.preFilter[h]){f=o.preFilter[h](f,s,d,r,e,t);if(!f)g=i=!0;else if(f===!0)continue}if(f)for(n=0;(j=s[n])!=null;n++)j&&(i=k(j,f,n,s),p=e^i,d&&i!=null?p?g=!0:s[n]=!1:p&&(r.push(j),g=!0));if(i!==b){d||(s=r),a=a.replace(o.match[h],"");if(!g)return[];break}}if(a===q)if(g==null)m.error(a);else break;q=a}return s},m.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)};var n=m.getText=function(a){var b,c,d=a.nodeType,e="";if(d){if(d===1||d===9){if(typeof a.textContent=="string")return a.textContent;if(typeof a.innerText=="string")return a.innerText.replace(k,"");for(a=a.firstChild;a;a=a.nextSibling)e+=n(a)}else if(d===3||d===4)return a.nodeValue}else for(b=0;c=a[b];b++)c.nodeType!==8&&(e+=n(c));return e},o=m.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!l.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&m.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!l.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&m.filter(b,a,!0)}},"":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("parentNode",b,f,a,d,c)},"~":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("previousSibling",b,f,a,d,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(j,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(j,"")},TAG:function(a,b){return a[1].replace(j,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||m.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&m.error(a[0]);a[0]=e++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(j,"");!f&&o.attrMap[g]&&(a[1]=o.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(j,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=m(b[3],null,null,c);else{var g=m.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(o.match.POS.test(b[0])||o.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!m(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=o.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||n([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}m.error(e)},CHILD:function(a,b){var c,e,f,g,h,i,j,k=b[1],l=a;switch(k){case"only":case"first":while(l=l.previousSibling)if(l.nodeType===1)return!1;if(k==="first")return!0;l=a;case"last":while(l=l.nextSibling)if(l.nodeType===1)return!1;return!0;case"nth":c=b[2],e=b[3];if(c===1&&e===0)return!0;f=b[0],g=a.parentNode;if(g&&(g[d]!==f||!a.nodeIndex)){i=0;for(l=g.firstChild;l;l=l.nextSibling)l.nodeType===1&&(l.nodeIndex=++i);g[d]=f}j=a.nodeIndex-e;return c===0?j===0:j%c===0&&j/c>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||!!a.nodeName&&a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=m.attr?m.attr(a,c):o.attrHandle[c]?o.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":!f&&m.attr?d!=null:f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=o.setFilters[e];if(f)return f(a,c,b,d)}}},p=o.match.POS,q=function(a,b){return"\\"+(b-0+1)};for(var r in o.match)o.match[r]=new RegExp(o.match[r].source+/(?![^\[]*\])(?![^\(]*\))/.source),o.leftMatch[r]=new RegExp(/(^(?:.|\r|\n)*?)/.source+o.match[r].source.replace(/\\(\d+)/g,q));var s=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(t){s=function(a,b){var c=0,d=b||[];if(g.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var e=a.length;c<e;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var u,v;c.documentElement.compareDocumentPosition?u=function(a,b){if(a===b){h=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(u=function(a,b){if(a===b){h=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],g=a.parentNode,i=b.parentNode,j=g;if(g===i)return v(a,b);if(!g)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return v(e[k],f[k]);return k===c?v(a,f[k],-1):v(e[k],b,1)},v=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(o.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},o.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(o.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(o.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=m,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){m=function(b,e,f,g){e=e||c;if(!g&&!m.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return s(e.getElementsByTagName(b),f);if(h[2]&&o.find.CLASS&&e.getElementsByClassName)return s(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return s([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return s([],f);if(i.id===h[3])return s([i],f)}try{return s(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var k=e,l=e.getAttribute("id"),n=l||d,p=e.parentNode,q=/^\s*[+~]/.test(b);l?n=n.replace(/'/g,"\\$&"):e.setAttribute("id",n),q&&p&&(e=e.parentNode);try{if(!q||p)return s(e.querySelectorAll("[id='"+n+"'] "+b),f)}catch(r){}finally{l||k.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)m[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}m.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!m.isXML(a))try{if(e||!o.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return m(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;o.order.splice(1,0,"CLASS"),o.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?m.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?m.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:m.contains=function(){return!1},m.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var y=function(a,b,c){var d,e=[],f="",g=b.nodeType?[b]:b;while(d=o.match.PSEUDO.exec(a))f+=d[0],a=a.replace(o.match.PSEUDO,"");a=o.relative[a]?a+"*":a;for(var h=0,i=g.length;h<i;h++)m(a,g[h],e,c);return m.filter(f,e)};m.attr=f.attr,m.selectors.attrMap={},f.find=m,f.expr=m.selectors,f.expr[":"]=f.expr.filters,f.unique=m.uniqueSort,f.text=m.getText,f.isXMLDoc=m.isXML,f.contains=m.contains}();var L=/Until$/,M=/^(?:parents|prevUntil|prevAll)/,N=/,/,O=/^.[^:#\[\.,]*$/,P=Array.prototype.slice,Q=f.expr.match.POS,R={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(T(this,a,!1),"not",a)},filter:function(a){return this.pushStack(T(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?Q.test(a)?f(a,this.context).index(this[0])>=0:f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h=1;while(g&&g.ownerDocument&&g!==b){for(d=0;d<a.length;d++)f(g).is(a[d])&&c.push({selector:a[d],elem:g,level:h});g=g.parentNode,h++}return c}var i=Q.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(i?i.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a)return this[0]&&this[0].parentNode?this.prevAll().length:-1;if(typeof a=="string")return f.inArray(this[0],f(a));return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(S(c[0])||S(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling(a.parentNode.firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c);L.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!R[a]?f.unique(e):e,(this.length>1||N.test(d))&&M.test(a)&&(e=e.reverse());return this.pushStack(e,a,P.call(arguments).join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var V="abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",W=/ jQuery\d+="(?:\d+|null)"/g,X=/^\s+/,Y=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,Z=/<([\w:]+)/,$=/<tbody/i,_=/<|&#?\w+;/,ba=/<(?:script|style)/i,bb=/<(?:script|object|embed|option|style)/i,bc=new RegExp("<(?:"+V+")","i"),bd=/checked\s*(?:[^=]|=\s*.checked.)/i,be=/\/(java|ecma)script/i,bf=/^\s*<!(?:\[CDATA\[|\-\-)/,bg={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bh=U(c);bg.optgroup=bg.option,bg.tbody=bg.tfoot=bg.colgroup=bg.caption=bg.thead,bg.th=bg.td,f.support.htmlSerialize||(bg._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){if(f.isFunction(a))return this.each(function(b){var c=f(this);c.text(a.call(this,b,c.text()))});if(typeof a!="object"&&a!==b)return this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a));return f.text(this)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=f.isFunction(a);return this.each(function(c){f(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f.clean(arguments);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f.clean(arguments));return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function()
{for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){if(a===b)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(W,""):null;if(typeof a=="string"&&!ba.test(a)&&(f.support.leadingWhitespace||!X.test(a))&&!bg[(Z.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Y,"<$1></$2>");try{for(var c=0,d=this.length;c<d;c++)this[c].nodeType===1&&(f.cleanData(this[c].getElementsByTagName("*")),this[c].innerHTML=a)}catch(e){this.empty().append(a)}}else f.isFunction(a)?this.each(function(b){var c=f(this);c.html(a.call(this,b,c.html()))}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bd.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bi(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,bp)}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i,j=a[0];b&&b[0]&&(i=b[0].ownerDocument||b[0]),i.createDocumentFragment||(i=c),a.length===1&&typeof j=="string"&&j.length<512&&i===c&&j.charAt(0)==="<"&&!bb.test(j)&&(f.support.checkClone||!bd.test(j))&&(f.support.html5Clone||!bc.test(j))&&(g=!0,h=f.fragments[j],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[j]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d,e,g,h=f.support.html5Clone||!bc.test("<"+a.nodeName)?a.cloneNode(!0):bo(a);if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bk(a,h),d=bl(a),e=bl(h);for(g=0;d[g];++g)e[g]&&bk(d[g],e[g])}if(b){bj(a,h);if(c){d=bl(a),e=bl(h);for(g=0;d[g];++g)bj(d[g],e[g])}}d=e=null;return h},clean:function(a,b,d,e){var g;b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);var h=[],i;for(var j=0,k;(k=a[j])!=null;j++){typeof k=="number"&&(k+="");if(!k)continue;if(typeof k=="string")if(!_.test(k))k=b.createTextNode(k);else{k=k.replace(Y,"<$1></$2>");var l=(Z.exec(k)||["",""])[1].toLowerCase(),m=bg[l]||bg._default,n=m[0],o=b.createElement("div");b===c?bh.appendChild(o):U(b).appendChild(o),o.innerHTML=m[1]+k+m[2];while(n--)o=o.lastChild;if(!f.support.tbody){var p=$.test(k),q=l==="table"&&!p?o.firstChild&&o.firstChild.childNodes:m[1]==="<table>"&&!p?o.childNodes:[];for(i=q.length-1;i>=0;--i)f.nodeName(q[i],"tbody")&&!q[i].childNodes.length&&q[i].parentNode.removeChild(q[i])}!f.support.leadingWhitespace&&X.test(k)&&o.insertBefore(b.createTextNode(X.exec(k)[0]),o.firstChild),k=o.childNodes}var r;if(!f.support.appendChecked)if(k[0]&&typeof (r=k.length)=="number")for(i=0;i<r;i++)bn(k[i]);else bn(k);k.nodeType?h.push(k):h=f.merge(h,k)}if(d){g=function(a){return!a.type||be.test(a.type)};for(j=0;h[j];j++)if(e&&f.nodeName(h[j],"script")&&(!h[j].type||h[j].type.toLowerCase()==="text/javascript"))e.push(h[j].parentNode?h[j].parentNode.removeChild(h[j]):h[j]);else{if(h[j].nodeType===1){var s=f.grep(h[j].getElementsByTagName("script"),g);h.splice.apply(h,[j+1,0].concat(s))}d.appendChild(h[j])}}return h},cleanData:function(a){var b,c,d=f.cache,e=f.event.special,g=f.support.deleteExpando;for(var h=0,i;(i=a[h])!=null;h++){if(i.nodeName&&f.noData[i.nodeName.toLowerCase()])continue;c=i[f.expando];if(c){b=d[c];if(b&&b.events){for(var j in b.events)e[j]?f.event.remove(i,j):f.removeEvent(i,j,b.handle);b.handle&&(b.handle.elem=null)}g?delete i[f.expando]:i.removeAttribute&&i.removeAttribute(f.expando),delete d[c]}}}});var bq=/alpha\([^)]*\)/i,br=/opacity=([^)]*)/,bs=/([A-Z]|^ms)/g,bt=/^-?\d+(?:px)?$/i,bu=/^-?\d/,bv=/^([\-+])=([\-+.\de]+)/,bw={position:"absolute",visibility:"hidden",display:"block"},bx=["Left","Right"],by=["Top","Bottom"],bz,bA,bB;f.fn.css=function(a,c){if(arguments.length===2&&c===b)return this;return f.access(this,a,c,!0,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)})},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bz(a,"opacity","opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d,h==="string"&&(g=bv.exec(d))&&(d=+(g[1]+1)*+g[2]+parseFloat(f.css(a,c)),h="number");if(d==null||h==="number"&&isNaN(d))return;h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(bz)return bz(a,c)},swap:function(a,b,c){var d={};for(var e in b)d[e]=a.style[e],a.style[e]=b[e];c.call(a);for(e in b)a.style[e]=d[e]}}),f.curCSS=f.css,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){var e;if(c){if(a.offsetWidth!==0)return bC(a,b,d);f.swap(a,bw,function(){e=bC(a,b,d)});return e}},set:function(a,b){if(!bt.test(b))return b;b=parseFloat(b);if(b>=0)return b+"px"}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return br.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=f.isNumeric(b)?"alpha(opacity="+b*100+")":"",g=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&f.trim(g.replace(bq,""))===""){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bq.test(g)?g.replace(bq,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){var c;f.swap(a,{display:"inline-block"},function(){b?c=bz(a,"margin-right","marginRight"):c=a.style.marginRight});return c}})}),c.defaultView&&c.defaultView.getComputedStyle&&(bA=function(a,b){var c,d,e;b=b.replace(bs,"-$1").toLowerCase(),(d=a.ownerDocument.defaultView)&&(e=d.getComputedStyle(a,null))&&(c=e.getPropertyValue(b),c===""&&!f.contains(a.ownerDocument.documentElement,a)&&(c=f.style(a,b)));return c}),c.documentElement.currentStyle&&(bB=function(a,b){var c,d,e,f=a.currentStyle&&a.currentStyle[b],g=a.style;f===null&&g&&(e=g[b])&&(f=e),!bt.test(f)&&bu.test(f)&&(c=g.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),g.left=b==="fontSize"?"1em":f||0,f=g.pixelLeft+"px",g.left=c,d&&(a.runtimeStyle.left=d));return f===""?"auto":f}),bz=bA||bB,f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style&&a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)});var bD=/%20/g,bE=/\[\]$/,bF=/\r?\n/g,bG=/#.*$/,bH=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bI=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bJ=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,bK=/^(?:GET|HEAD)$/,bL=/^\/\//,bM=/\?/,bN=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bO=/^(?:select|textarea)/i,bP=/\s+/,bQ=/([?&])_=[^&]*/,bR=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bS=f.fn.load,bT={},bU={},bV,bW,bX=["*/"]+["*"];try{bV=e.href}catch(bY){bV=c.createElement("a"),bV.href="",bV=bV.href}bW=bR.exec(bV.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bS)return bS.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bN,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bO.test(this.nodeName)||bI.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bF,"\r\n")}}):{name:b.name,value:c.replace(bF,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.on(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?b_(a,f.ajaxSettings):(b=a,a=f.ajaxSettings),b_(a,b);return a},ajaxSettings:{url:bV,isLocal:bJ.test(bW[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":bX},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:bZ(bT),ajaxTransport:bZ(bU),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a>0?4:0;var o,r,u,w=c,x=l?cb(d,v,l):b,y,z;if(a>=200&&a<300||a===304){if(d.ifModified){if(y=v.getResponseHeader("Last-Modified"))f.lastModified[k]=y;if(z=v.getResponseHeader("Etag"))f.etag[k]=z}if(a===304)w="notmodified",o=!0;else try{r=cc(d,x),w="success",o=!0}catch(A){w="parsererror",u=A}}else{u=w;if(!w||a)w="error",a<0&&(a=0)}v.status=a,v.statusText=""+(c||w),o?h.resolveWith(e,[r,w,v]):h.rejectWith(e,[v,w,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.fireWith(e,[v,w]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f.Callbacks("once memory"),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bH.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.add,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bG,"").replace(bL,bW[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bP),d.crossDomain==null&&(r=bR.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bW[1]&&r[2]==bW[2]&&(r[3]||(r[1]==="http:"?80:443))==(bW[3]||(bW[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),b$(bT,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bK.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bM.test(d.url)?"&":"?")+d.data,delete d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bQ,"$1_="+x);d.url=y+(y===d.url?(bM.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", "+bX+"; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=b$(bU,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){if(s<2)w(-1,z);else throw z}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)ca(g,a[g],c,e);return d.join("&").replace(bD,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var cd=f.now(),ce=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+cd++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=b.contentType==="application/x-www-form-urlencoded"&&typeof b.data=="string";if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(ce.test(b.url)||e&&ce.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(ce,l),b.url===j&&(e&&(k=k.replace(ce,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var cf=a.ActiveXObject?function(){for(var a in ch)ch[a](0,1)}:!1,cg=0,ch;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ci()||cj()}:ci,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,cf&&delete ch[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n),m.text=h.responseText;try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cg,cf&&(ch||(ch={},f(a).unload(cf)),ch[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var ck={},cl,cm,cn=/^(?:toggle|show|hide)$/,co=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,cp,cq=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cr;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(cu("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),e===""&&f.css(d,"display")==="none"&&f._data(d,"olddisplay",cv(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(cu("hide",3),a,b,c);var d,e,g=0,h=this.length;for(;g<h;g++)d=this[g],d.style&&(e=f.css(d,"display"),e!=="none"&&!f._data(d,"olddisplay")&&f._data(d,"olddisplay",e));for(g=0;g<h;g++)this[g].style&&(this[g].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(cu("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){function g(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]),h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(!f.support.inlineBlockNeedsLayout||cv(this.nodeName)==="inline"?this.style.display="inline-block":this.style.zoom=1))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)j=new f.fx(this,b,i),h=a[i],cn.test(h)?(o=f._data(this,"toggle"+i)||(h==="toggle"?d?"show":"hide":0),o?(f._data(this,"toggle"+i,o==="show"?"hide":"show"),j[o]()):j[h]()):(k=co.exec(h),l=j.cur(),k?(m=parseFloat(k[2]),n=k[3]||(f.cssNumber[i]?"":"px"),n!=="px"&&(f.style(this,i,(m||1)+n),l=(m||1)/j.cur()*l,f.style(this,i,l+n)),k[1]&&(m=(k[1]==="-="?-1:1)*m+l),j.custom(l,m,n)):j.custom(l,h,""));return!0}var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return e.queue===!1?this.each(g):this.queue(e.queue,g)},stop:function(a,c,d){typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]);return this.each(function(){function h(a,b,c){var e=b[c];f.removeData(a,c,!0),e.stop(d)}var b,c=!1,e=f.timers,g=f._data(this);d||f._unmark(!0,this);if(a==null)for(b in g)g[b]&&g[b].stop&&b.indexOf(".run")===b.length-4&&h(this,g,b);else g[b=a+".run"]&&g[b].stop&&h(this,g,b);for(b=e.length;b--;)e[b].elem===this&&(a==null||e[b].queue===a)&&(d?e[b](!0):e[b].saveState(),c=!0,e.splice(b,1));(!d||!c)&&f.dequeue(this,a)})}}),f.each({slideDown:cu("show",1),slideUp:cu("hide",1),slideToggle:cu("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";d.old=d.complete,d.complete=function(a){f.isFunction(d.old)&&d.old.call(this),d.queue?f.dequeue(this,d.queue):a!==!1&&f._unmark(this)};return d},easing:{linear:function(a,b,c,d){return c+d*a},swing:function(a,b,c,d){return(-Math.cos(a*Math.PI)/2+.5)*d+c}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,c,d){function h(a){return e.step(a)}var e=this,g=f.fx;this.startTime=cr||cs(),this.end=c,this.now=this.start=a,this.pos=this.state=0,this.unit=d||this.unit||(f.cssNumber[this.prop]?"":"px"),h.queue=this.options.queue,h.elem=this.elem,h.saveState=function(){e.options.hide&&f._data(e.elem,"fxshow"+e.prop)===b&&f._data(e.elem,"fxshow"+e.prop,e.start)},h()&&f.timers.push(h)&&!cp&&(cp=setInterval(g.tick,g.interval))},show:function(){var a=f._data(this.elem,"fxshow"+this.prop);this.options.orig[this.prop]=a||f.style(this.elem,this.prop),this.options.show=!0,a!==b?this.custom(this.cur(),a):this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f._data(this.elem,"fxshow"+this.prop)||f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b,c,d,e=cr||cs(),g=!0,h=this.elem,i=this.options;if(a||e>=i.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),i.animatedProperties[this.prop]=!0;for(b in i.animatedProperties)i.animatedProperties[b]!==!0&&(g=!1);if(g){i.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){h.style["overflow"+b]=i.overflow[a]}),i.hide&&f(h).hide();if(i.hide||i.show)for(b in i.animatedProperties)f.style(h,b,i.orig[b]),f.removeData(h,"fxshow"+b,!0),f.removeData(h,"toggle"+b,!0);d=i.complete,d&&(i.complete=!1,d.call(h))}return!1}i.duration==Infinity?this.now=e:(c=e-this.startTime,this.state=c/i.duration,this.pos=f.easing[i.animatedProperties[this.prop]](this.state,c,0,1,i.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){var a,b=f.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||f.fx.stop()},interval:13,stop:function(){clearInterval(cp),cp=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=a.now+a.unit:a.elem[a.prop]=a.now}}}),f.each(["width","height"],function(a,b){f.fx.step[b]=function(a){f.style(a.elem,b,Math.max(0,a.now)+a.unit)}}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var cw=/^t(?:able|d|h)$/i,cx=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?f.fn.offset=function(a){var b=this[0],c;if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);try{c=b.getBoundingClientRect()}catch(d){}var e=b.ownerDocument,g=e.documentElement;if(!c||!f.contains(g,b))return c?{top:c.top,left:c.left}:{top:0,left:0};var h=e.body,i=cy(e),j=g.clientTop||h.clientTop||0,k=g.clientLeft||h.clientLeft||0,l=i.pageYOffset||f.support.boxModel&&g.scrollTop||h.scrollTop,m=i.pageXOffset||f.support.boxModel&&g.scrollLeft||h.scrollLeft,n=c.top+l-j,o=c.left+m-k;return{top:n,left:o}}:f.fn.offset=function(a){var b=this[0];if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);var c,d=b.offsetParent,e=b,g=b.ownerDocument,h=g.documentElement,i=g.body,j=g.defaultView,k=j?j.getComputedStyle(b,null):b.currentStyle,l=b.offsetTop,m=b.offsetLeft;while((b=b.parentNode)&&b!==i&&b!==h){if(f.support.fixedPosition&&k.position==="fixed")break;c=j?j.getComputedStyle(b,null):b.currentStyle,l-=b.scrollTop,m-=b.scrollLeft,b===d&&(l+=b.offsetTop,m+=b.offsetLeft,f.support.doesNotAddBorder&&(!f.support.doesAddBorderForTableAndCells||!cw.test(b.nodeName))&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),e=d,d=b.offsetParent),f.support.subtractsBorderForOverflowNotVisible&&c.overflow!=="visible"&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),k=c}if(k.position==="relative"||k.position==="static")l+=i.offsetTop,m+=i.offsetLeft;f.support.fixedPosition&&k.position==="fixed"&&(l+=Math.max(h.scrollTop,i.scrollTop),m+=Math.max(h.scrollLeft,i.scrollLeft));return{top:l,left:m}},f.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=cx.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!cx.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each(["Left","Top"],function(a,c){var d="scroll"+c;f.fn[d]=function(c){var e,g;if(c===b){e=this[0];if(!e)return null;g=cy(e);return g?"pageXOffset"in g?g[a?"pageYOffset":"pageXOffset"]:f.support.boxModel&&g.document.documentElement[d]||g.document.body[d]:e[d]}return this.each(function(){g=cy(this),g?g.scrollTo(a?f(g).scrollLeft():c,a?c:f(g).scrollTop()):this[d]=c})}}),f.each(["Height","Width"],function(a,c){var d=c.toLowerCase();f.fn["inner"+c]=function(){var a=this[0];return a?a.style?parseFloat(f.css(a,d,"padding")):this[d]():null},f.fn["outer"+c]=function(a){var b=this[0];return b?b.style?parseFloat(f.css(b,d,a?"margin":"border")):this[d]():null},f.fn[d]=function(a){var e=this[0];if(!e)return a==null?null:this;if(f.isFunction(a))return this.each(function(b){var c=f(this);c[d](a.call(this,b,c[d]()))});if(f.isWindow(e)){var g=e.document.documentElement["client"+c],h=e.document.body;return e.document.compatMode==="CSS1Compat"&&g||h&&h["client"+c]||g}if(e.nodeType===9)return Math.max(e.documentElement["client"+c],e.body["scroll"+c],e.documentElement["scroll"+c],e.body["offset"+c],e.documentElement["offset"+c]);if(a===b){var i=f.css(e,d),j=parseFloat(i);return f.isNumeric(j)?j:i}return this.css(d,typeof a=="string"?a:a+"px")}}),a.jQuery=a.$=f,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return f})})(window);;//If optimizely should be loaded. send the load event to the event system.
//This Code requires the bigp widget and the bigp code to be loaded previously
if(window.doLoadOptimizely){
	window.bigpUserEvents = window.bigpUserEvents || [];  
	window.bigpUserEvents.push(['fire','optimizely-init']);
};/*!
 * jQuery UI 1.8.18
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 */
(function(a,b){function d(b){return!a(b).parents().andSelf().filter(function(){return a.curCSS(this,"visibility")==="hidden"||a.expr.filters.hidden(this)}).length}function c(b,c){var e=b.nodeName.toLowerCase();if("area"===e){var f=b.parentNode,g=f.name,h;if(!b.href||!g||f.nodeName.toLowerCase()!=="map")return!1;h=a("img[usemap=#"+g+"]")[0];return!!h&&d(h)}return(/input|select|textarea|button|object/.test(e)?!b.disabled:"a"==e?b.href||c:c)&&d(b)}a.ui=a.ui||{};a.ui.version||(a.extend(a.ui,{version:"1.8.18",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}}),a.fn.extend({propAttr:a.fn.prop||a.fn.attr,_focus:a.fn.focus,focus:function(b,c){return typeof b=="number"?this.each(function(){var d=this;setTimeout(function(){a(d).focus(),c&&c.call(d)},b)}):this._focus.apply(this,arguments)},scrollParent:function(){var b;a.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?b=this.parents().filter(function(){return/(relative|absolute|fixed)/.test(a.curCSS(this,"position",1))&&/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0):b=this.parents().filter(function(){return/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0);return/fixed/.test(this.css("position"))||!b.length?a(document):b},zIndex:function(c){if(c!==b)return this.css("zIndex",c);if(this.length){var d=a(this[0]),e,f;while(d.length&&d[0]!==document){e=d.css("position");if(e==="absolute"||e==="relative"||e==="fixed"){f=parseInt(d.css("zIndex"),10);if(!isNaN(f)&&f!==0)return f}d=d.parent()}}return 0},disableSelection:function(){return this.bind((a.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(a){a.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),a.each(["Width","Height"],function(c,d){function h(b,c,d,f){a.each(e,function(){c-=parseFloat(a.curCSS(b,"padding"+this,!0))||0,d&&(c-=parseFloat(a.curCSS(b,"border"+this+"Width",!0))||0),f&&(c-=parseFloat(a.curCSS(b,"margin"+this,!0))||0)});return c}var e=d==="Width"?["Left","Right"]:["Top","Bottom"],f=d.toLowerCase(),g={innerWidth:a.fn.innerWidth,innerHeight:a.fn.innerHeight,outerWidth:a.fn.outerWidth,outerHeight:a.fn.outerHeight};a.fn["inner"+d]=function(c){if(c===b)return g["inner"+d].call(this);return this.each(function(){a(this).css(f,h(this,c)+"px")})},a.fn["outer"+d]=function(b,c){if(typeof b!="number")return g["outer"+d].call(this,b);return this.each(function(){a(this).css(f,h(this,b,!0,c)+"px")})}}),a.extend(a.expr[":"],{data:function(b,c,d){return!!a.data(b,d[3])},focusable:function(b){return c(b,!isNaN(a.attr(b,"tabindex")))},tabbable:function(b){var d=a.attr(b,"tabindex"),e=isNaN(d);return(e||d>=0)&&c(b,!e)}}),a(function(){var b=document.body,c=b.appendChild(c=document.createElement("div"));c.offsetHeight,a.extend(c.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0}),a.support.minHeight=c.offsetHeight===100,a.support.selectstart="onselectstart"in c,b.removeChild(c).style.display="none"}),a.extend(a.ui,{plugin:{add:function(b,c,d){var e=a.ui[b].prototype;for(var f in d)e.plugins[f]=e.plugins[f]||[],e.plugins[f].push([c,d[f]])},call:function(a,b,c){var d=a.plugins[b];if(!!d&&!!a.element[0].parentNode)for(var e=0;e<d.length;e++)a.options[d[e][0]]&&d[e][1].apply(a.element,c)}},contains:function(a,b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b)},hasScroll:function(b,c){if(a(b).css("overflow")==="hidden")return!1;var d=c&&c==="left"?"scrollLeft":"scrollTop",e=!1;if(b[d]>0)return!0;b[d]=1,e=b[d]>0,b[d]=0;return e},isOverAxis:function(a,b,c){return a>b&&a<b+c},isOver:function(b,c,d,e,f,g){return a.ui.isOverAxis(b,d,f)&&a.ui.isOverAxis(c,e,g)}}))})(jQuery);
;/*!
 * jQuery UI Widget 1.8.18
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Widget
 */
(function(a,b){if(a.cleanData){var c=a.cleanData;a.cleanData=function(b){for(var d=0,e;(e=b[d])!=null;d++)try{a(e).triggerHandler("remove")}catch(f){}c(b)}}else{var d=a.fn.remove;a.fn.remove=function(b,c){return this.each(function(){c||(!b||a.filter(b,[this]).length)&&a("*",this).add([this]).each(function(){try{a(this).triggerHandler("remove")}catch(b){}});return d.call(a(this),b,c)})}}a.widget=function(b,c,d){var e=b.split(".")[0],f;b=b.split(".")[1],f=e+"-"+b,d||(d=c,c=a.Widget),a.expr[":"][f]=function(c){return!!a.data(c,b)},a[e]=a[e]||{},a[e][b]=function(a,b){arguments.length&&this._createWidget(a,b)};var g=new c;g.options=a.extend(!0,{},g.options),a[e][b].prototype=a.extend(!0,g,{namespace:e,widgetName:b,widgetEventPrefix:a[e][b].prototype.widgetEventPrefix||b,widgetBaseClass:f},d),a.widget.bridge(b,a[e][b])},a.widget.bridge=function(c,d){a.fn[c]=function(e){var f=typeof e=="string",g=Array.prototype.slice.call(arguments,1),h=this;e=!f&&g.length?a.extend.apply(null,[!0,e].concat(g)):e;if(f&&e.charAt(0)==="_")return h;f?this.each(function(){var d=a.data(this,c),f=d&&a.isFunction(d[e])?d[e].apply(d,g):d;if(f!==d&&f!==b){h=f;return!1}}):this.each(function(){var b=a.data(this,c);b?b.option(e||{})._init():a.data(this,c,new d(e,this))});return h}},a.Widget=function(a,b){arguments.length&&this._createWidget(a,b)},a.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:!1},_createWidget:function(b,c){a.data(c,this.widgetName,this),this.element=a(c),this.options=a.extend(!0,{},this.options,this._getCreateOptions(),b);var d=this;this.element.bind("remove."+this.widgetName,function(){d.destroy()}),this._create(),this._trigger("create"),this._init()},_getCreateOptions:function(){return a.metadata&&a.metadata.get(this.element[0])[this.widgetName]},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName),this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled "+"ui-state-disabled")},widget:function(){return this.element},option:function(c,d){var e=c;if(arguments.length===0)return a.extend({},this.options);if(typeof c=="string"){if(d===b)return this.options[c];e={},e[c]=d}this._setOptions(e);return this},_setOptions:function(b){var c=this;a.each(b,function(a,b){c._setOption(a,b)});return this},_setOption:function(a,b){this.options[a]=b,a==="disabled"&&this.widget()[b?"addClass":"removeClass"](this.widgetBaseClass+"-disabled"+" "+"ui-state-disabled").attr("aria-disabled",b);return this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_trigger:function(b,c,d){var e,f,g=this.options[b];d=d||{},c=a.Event(c),c.type=(b===this.widgetEventPrefix?b:this.widgetEventPrefix+b).toLowerCase(),c.target=this.element[0],f=c.originalEvent;if(f)for(e in f)e in c||(c[e]=f[e]);this.element.trigger(c,d);return!(a.isFunction(g)&&g.call(this.element[0],c,d)===!1||c.isDefaultPrevented())}}})(jQuery);
;/* jQuery UI Position 1.8.18
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Position
 */(function(a,b){a.ui=a.ui||{};var c=/left|center|right/,d=/top|center|bottom/,e="center",f={},g=a.fn.position,h=a.fn.offset;a.fn.position=function(b){if(!b||!b.of)return g.apply(this,arguments);b=a.extend({},b);var h=a(b.of),i=h[0],j=(b.collision||"flip").split(" "),k=b.offset?b.offset.split(" "):[0,0],l,m,n;i.nodeType===9?(l=h.width(),m=h.height(),n={top:0,left:0}):i.setTimeout?(l=h.width(),m=h.height(),n={top:h.scrollTop(),left:h.scrollLeft()}):i.preventDefault?(b.at="left top",l=m=0,n={top:b.of.pageY,left:b.of.pageX}):(l=h.outerWidth(),m=h.outerHeight(),n=h.offset()),a.each(["my","at"],function(){var a=(b[this]||"").split(" ");a.length===1&&(a=c.test(a[0])?a.concat([e]):d.test(a[0])?[e].concat(a):[e,e]),a[0]=c.test(a[0])?a[0]:e,a[1]=d.test(a[1])?a[1]:e,b[this]=a}),j.length===1&&(j[1]=j[0]),k[0]=parseInt(k[0],10)||0,k.length===1&&(k[1]=k[0]),k[1]=parseInt(k[1],10)||0,b.at[0]==="right"?n.left+=l:b.at[0]===e&&(n.left+=l/2),b.at[1]==="bottom"?n.top+=m:b.at[1]===e&&(n.top+=m/2),n.left+=k[0],n.top+=k[1];return this.each(function(){var c=a(this),d=c.outerWidth(),g=c.outerHeight(),h=parseInt(a.curCSS(this,"marginLeft",!0))||0,i=parseInt(a.curCSS(this,"marginTop",!0))||0,o=d+h+(parseInt(a.curCSS(this,"marginRight",!0))||0),p=g+i+(parseInt(a.curCSS(this,"marginBottom",!0))||0),q=a.extend({},n),r;b.my[0]==="right"?q.left-=d:b.my[0]===e&&(q.left-=d/2),b.my[1]==="bottom"?q.top-=g:b.my[1]===e&&(q.top-=g/2),f.fractions||(q.left=Math.round(q.left),q.top=Math.round(q.top)),r={left:q.left-h,top:q.top-i},a.each(["left","top"],function(c,e){a.ui.position[j[c]]&&a.ui.position[j[c]][e](q,{targetWidth:l,targetHeight:m,elemWidth:d,elemHeight:g,collisionPosition:r,collisionWidth:o,collisionHeight:p,offset:k,my:b.my,at:b.at})}),a.fn.bgiframe&&c.bgiframe(),c.offset(a.extend(q,{using:b.using}))})},a.ui.position={fit:{left:function(b,c){var d=a(window),e=c.collisionPosition.left+c.collisionWidth-d.width()-d.scrollLeft();b.left=e>0?b.left-e:Math.max(b.left-c.collisionPosition.left,b.left)},top:function(b,c){var d=a(window),e=c.collisionPosition.top+c.collisionHeight-d.height()-d.scrollTop();b.top=e>0?b.top-e:Math.max(b.top-c.collisionPosition.top,b.top)}},flip:{left:function(b,c){if(c.at[0]!==e){var d=a(window),f=c.collisionPosition.left+c.collisionWidth-d.width()-d.scrollLeft(),g=c.my[0]==="left"?-c.elemWidth:c.my[0]==="right"?c.elemWidth:0,h=c.at[0]==="left"?c.targetWidth:-c.targetWidth,i=-2*c.offset[0];b.left+=c.collisionPosition.left<0?g+h+i:f>0?g+h+i:0}},top:function(b,c){if(c.at[1]!==e){var d=a(window),f=c.collisionPosition.top+c.collisionHeight-d.height()-d.scrollTop(),g=c.my[1]==="top"?-c.elemHeight:c.my[1]==="bottom"?c.elemHeight:0,h=c.at[1]==="top"?c.targetHeight:-c.targetHeight,i=-2*c.offset[1];b.top+=c.collisionPosition.top<0?g+h+i:f>0?g+h+i:0}}}},a.offset.setOffset||(a.offset.setOffset=function(b,c){/static/.test(a.curCSS(b,"position"))&&(b.style.position="relative");var d=a(b),e=d.offset(),f=parseInt(a.curCSS(b,"top",!0),10)||0,g=parseInt(a.curCSS(b,"left",!0),10)||0,h={top:c.top-e.top+f,left:c.left-e.left+g};"using"in c?c.using.call(b,h):d.css(h)},a.fn.offset=function(b){var c=this[0];if(!c||!c.ownerDocument)return null;if(b)return this.each(function(){a.offset.setOffset(this,b)});return h.call(this)}),function(){var b=document.getElementsByTagName("body")[0],c=document.createElement("div"),d,e,g,h,i;d=document.createElement(b?"div":"body"),g={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},b&&a.extend(g,{position:"absolute",left:"-1000px",top:"-1000px"});for(var j in g)d.style[j]=g[j];d.appendChild(c),e=b||document.documentElement,e.insertBefore(d,e.firstChild),c.style.cssText="position: absolute; left: 10.7432222px; top: 10.432325px; height: 30px; width: 201px;",h=a(c).offset(function(a,b){return b}).offset(),d.innerHTML="",e.removeChild(d),i=h.top+h.left+(b?2e3:0),f.fractions=i>21&&i<22}()})(jQuery);;/*
 * jQuery UI Autocomplete 1.8.18
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Autocomplete
 *
 * Depends:
 *    jquery.ui.core.js
 *    jquery.ui.widget.js
 *    jquery.ui.position.js
 */
(function(a,b){var c=0;a.widget("ui.autocomplete",{options:{appendTo:"body",autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null},pending:0,_create:function(){var b=this,c=this.element[0].ownerDocument,d;this.element.addClass("ui-autocomplete-input").attr("autocomplete","off").attr({role:"textbox","aria-autocomplete":"list","aria-haspopup":"true"}).bind("keydown.autocomplete",function(c){if(!b.options.disabled&&!b.element.propAttr("readOnly")){d=!1;var e=a.ui.keyCode;switch(c.keyCode){case e.PAGE_UP:b._move("previousPage",c);break;case e.PAGE_DOWN:b._move("nextPage",c);break;case e.UP:b._move("previous",c),c.preventDefault();break;case e.DOWN:b._move("next",c),c.preventDefault();break;case e.ENTER:case e.NUMPAD_ENTER:b.menu.active&&(d=!0,c.preventDefault());case e.TAB:if(!b.menu.active)return;b.menu.select(c);break;case e.ESCAPE:b.element.val(b.term),b.close(c);break;default:clearTimeout(b.searching),b.searching=setTimeout(function(){b.term!=b.element.val()&&(b.selectedItem=null,b.search(null,c))},b.options.delay)}}}).bind("keypress.autocomplete",function(a){d&&(d=!1,a.preventDefault())}).bind("focus.autocomplete",function(){b.options.disabled||(b.selectedItem=null,b.previous=b.element.val())}).bind("blur.autocomplete",function(a){b.options.disabled||(clearTimeout(b.searching),b.closing=setTimeout(function(){b.close(a),b._change(a)},150))}),this._initSource(),this.response=function(){return b._response.apply(b,arguments)},this.menu=a("<ul></ul>").addClass("ui-autocomplete").appendTo(a(this.options.appendTo||"body",c)[0]).mousedown(function(c){var d=b.menu.element[0];a(c.target).closest(".ui-menu-item").length||setTimeout(function(){a(document).one("mousedown",function(c){c.target!==b.element[0]&&c.target!==d&&!a.ui.contains(d,c.target)&&b.close()})},1),setTimeout(function(){clearTimeout(b.closing)},13)}).menu({focus:function(a,c){var d=c.item.data("item.autocomplete");!1!==b._trigger("focus",a,{item:d})&&/^key/.test(a.originalEvent.type)&&b.element.val(d.value)},selected:function(a,d){var e=d.item.data("item.autocomplete"),f=b.previous;b.element[0]!==c.activeElement&&(b.element.focus(),b.previous=f,setTimeout(function(){b.previous=f,b.selectedItem=e},1)),!1!==b._trigger("select",a,{item:e})&&b.element.val(e.value),b.term=b.element.val(),b.close(a),b.selectedItem=e},blur:function(a,c){b.menu.element.is(":visible")&&b.element.val()!==b.term&&b.element.val(b.term)}}).zIndex(this.element.zIndex()+1).css({top:0,left:0}).hide().data("menu"),a.fn.bgiframe&&this.menu.element.bgiframe(),b.beforeunloadHandler=function(){b.element.removeAttr("autocomplete")},a(window).bind("beforeunload",b.beforeunloadHandler)},destroy:function(){this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup"),this.menu.element.remove(),a(window).unbind("beforeunload",this.beforeunloadHandler),a.Widget.prototype.destroy.call(this)},_setOption:function(b,c){a.Widget.prototype._setOption.apply(this,arguments),b==="source"&&this._initSource(),b==="appendTo"&&this.menu.element.appendTo(a(c||"body",this.element[0].ownerDocument)[0]),b==="disabled"&&c&&this.xhr&&this.xhr.abort()},_initSource:function(){var b=this,d,e;a.isArray(this.options.source)?(d=this.options.source,this.source=function(b,c){c(a.ui.autocomplete.filter(d,b.term))}):typeof this.options.source=="string"?(e=this.options.source,this.source=function(d,f){b.xhr&&b.xhr.abort(),b.xhr=a.ajax({url:e,data:d,dataType:"json",context:{autocompleteRequest:++c},success:function(a,b){this.autocompleteRequest===c&&f(a)},error:function(){this.autocompleteRequest===c&&f([])}})}):this.source=this.options.source},search:function(a,b){a=a!=null?a:this.element.val(),this.term=this.element.val();if(a.length<this.options.minLength)return this.close(b);clearTimeout(this.closing);if(this._trigger("search",b)!==!1)return this._search(a)},_search:function(a){this.pending++,this.element.addClass("ui-autocomplete-loading"),this.source({term:a},this.response)},_response:function(a){!this.options.disabled&&a&&a.length?(a=this._normalize(a),this._suggest(a),this._trigger("open")):this.close(),this.pending--,this.pending||this.element.removeClass("ui-autocomplete-loading")},close:function(a){clearTimeout(this.closing),this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.deactivate(),this._trigger("close",a))},_change:function(a){this.previous!==this.element.val()&&this._trigger("change",a,{item:this.selectedItem})},_normalize:function(b){if(b.length&&b[0].label&&b[0].value)return b;return a.map(b,function(b){if(typeof b=="string")return{label:b,value:b};return a.extend({label:b.label||b.value,value:b.value||b.label},b)})},_suggest:function(b){var c=this.menu.element.empty().zIndex(this.element.zIndex()+1);this._renderMenu(c,b),this.menu.deactivate(),this.menu.refresh(),c.show(),this._resizeMenu(),c.position(a.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next(new a.Event("mouseover"))},_resizeMenu:function(){var a=this.menu.element;a.outerWidth(Math.max(a.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(b,c){var d=this;a.each(c,function(a,c){d._renderItem(b,c)})},_renderItem:function(b,c){return a("<li></li>").data("item.autocomplete",c).append(a("<a></a>").text(c.label)).appendTo(b)},_move:function(a,b){if(!this.menu.element.is(":visible"))this.search(null,b);else{if(this.menu.first()&&/^previous/.test(a)||this.menu.last()&&/^next/.test(a)){this.element.val(this.term),this.menu.deactivate();return}this.menu[a](b)}},widget:function(){return this.menu.element}}),a.extend(a.ui.autocomplete,{escapeRegex:function(a){return a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")},filter:function(b,c){var d=new RegExp(a.ui.autocomplete.escapeRegex(c),"i");return a.grep(b,function(a){return d.test(a.label||a.value||a)})}})})(jQuery),function(a){a.widget("ui.menu",{_create:function(){var b=this;this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({role:"listbox","aria-activedescendant":"ui-active-menuitem"}).click(function(c){!a(c.target).closest(".ui-menu-item a").length||(c.preventDefault(),b.select(c))}),this.refresh()},refresh:function(){var b=this,c=this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role","menuitem");c.children("a").addClass("ui-corner-all").attr("tabindex",-1).mouseenter(function(c){b.activate(c,a(this).parent())}).mouseleave(function(){b.deactivate()})},activate:function(a,b){this.deactivate();if(this.hasScroll()){var c=b.offset().top-this.element.offset().top,d=this.element.scrollTop(),e=this.element.height();c<0?this.element.scrollTop(d+c):c>=e&&this.element.scrollTop(d+c-e+b.height())}this.active=b.eq(0).children("a").addClass("ui-state-hover").attr("id","ui-active-menuitem").end(),this._trigger("focus",a,{item:b})},deactivate:function(){!this.active||(this.active.children("a").removeClass("ui-state-hover").removeAttr("id"),this._trigger("blur"),this.active=null)},next:function(a){this.move("next",".ui-menu-item:first",a)},previous:function(a){this.move("prev",".ui-menu-item:last",a)},first:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},last:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},move:function(a,b,c){if(!this.active)this.activate(c,this.element.children(b));else{var d=this.active[a+"All"](".ui-menu-item").eq(0);d.length?this.activate(c,d):this.activate(c,this.element.children(b))}},nextPage:function(b){if(this.hasScroll()){if(!this.active||this.last()){this.activate(b,this.element.children(".ui-menu-item:first"));return}var c=this.active.offset().top,d=this.element.height(),e=this.element.children(".ui-menu-item").filter(function(){var b=a(this).offset().top-c-d+a(this).height();return b<10&&b>-10});e.length||(e=this.element.children(".ui-menu-item:last")),this.activate(b,e)}else this.activate(b,this.element.children(".ui-menu-item").filter(!this.active||this.last()?":first":":last"))},previousPage:function(b){if(this.hasScroll()){if(!this.active||this.first()){this.activate(b,this.element.children(".ui-menu-item:last"));return}var c=this.active.offset().top,d=this.element.height();result=this.element.children(".ui-menu-item").filter(function(){var b=a(this).offset().top-c+d-a(this).height();return b<10&&b>-10}),result.length||(result=this.element.children(".ui-menu-item:first")),this.activate(b,result)}else this.activate(b,this.element.children(".ui-menu-item").filter(!this.active||this.first()?":last":":first"))},hasScroll:function(){return this.element.height()<this.element[a.fn.prop?"prop":"attr"]("scrollHeight")},select:function(a){this._trigger("selected",a,{item:this.active})}})}(jQuery);;/*
 RequireJS 2.1.6 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 Available via the MIT or new BSD license.
 see: http://github.com/jrburke/requirejs for details
*/
var requirejs,require,define;
(function(ba){function J(b){return"[object Function]"===N.call(b)}function K(b){return"[object Array]"===N.call(b)}function z(b,c){if(b){var d;for(d=0;d<b.length&&(!b[d]||!c(b[d],d,b));d+=1);}}function O(b,c){if(b){var d;for(d=b.length-1;-1<d&&(!b[d]||!c(b[d],d,b));d-=1);}}function t(b,c){return ha.call(b,c)}function m(b,c){return t(b,c)&&b[c]}function H(b,c){for(var d in b)if(t(b,d)&&c(b[d],d))break}function S(b,c,d,m){c&&H(c,function(c,l){if(d||!t(b,l))m&&"string"!==typeof c?(b[l]||(b[l]={}),S(b[l],
c,d,m)):b[l]=c});return b}function v(b,c){return function(){return c.apply(b,arguments)}}function ca(b){throw b;}function da(b){if(!b)return b;var c=ba;z(b.split("."),function(b){c=c[b]});return c}function B(b,c,d,m){c=Error(c+"\nhttp://requirejs.org/docs/errors.html#"+b);c.requireType=b;c.requireModules=m;d&&(c.originalError=d);return c}function ia(b){function c(a,f,C){var e,n,b,c,d,T,k,g=f&&f.split("/");e=g;var l=j.map,h=l&&l["*"];if(a&&"."===a.charAt(0))if(f){e=m(j.pkgs,f)?g=[f]:g.slice(0,g.length-
1);f=a=e.concat(a.split("/"));for(e=0;f[e];e+=1)if(n=f[e],"."===n)f.splice(e,1),e-=1;else if(".."===n)if(1===e&&(".."===f[2]||".."===f[0]))break;else 0<e&&(f.splice(e-1,2),e-=2);e=m(j.pkgs,f=a[0]);a=a.join("/");e&&a===f+"/"+e.main&&(a=f)}else 0===a.indexOf("./")&&(a=a.substring(2));if(C&&l&&(g||h)){f=a.split("/");for(e=f.length;0<e;e-=1){b=f.slice(0,e).join("/");if(g)for(n=g.length;0<n;n-=1)if(C=m(l,g.slice(0,n).join("/")))if(C=m(C,b)){c=C;d=e;break}if(c)break;!T&&(h&&m(h,b))&&(T=m(h,b),k=e)}!c&&
T&&(c=T,d=k);c&&(f.splice(0,d,c),a=f.join("/"))}return a}function d(a){A&&z(document.getElementsByTagName("script"),function(f){if(f.getAttribute("data-requiremodule")===a&&f.getAttribute("data-requirecontext")===k.contextName)return f.parentNode.removeChild(f),!0})}function p(a){var f=m(j.paths,a);if(f&&K(f)&&1<f.length)return d(a),f.shift(),k.require.undef(a),k.require([a]),!0}function g(a){var f,b=a?a.indexOf("!"):-1;-1<b&&(f=a.substring(0,b),a=a.substring(b+1,a.length));return[f,a]}function l(a,
f,b,e){var n,D,i=null,d=f?f.name:null,l=a,h=!0,j="";a||(h=!1,a="_@r"+(N+=1));a=g(a);i=a[0];a=a[1];i&&(i=c(i,d,e),D=m(r,i));a&&(i?j=D&&D.normalize?D.normalize(a,function(a){return c(a,d,e)}):c(a,d,e):(j=c(a,d,e),a=g(j),i=a[0],j=a[1],b=!0,n=k.nameToUrl(j)));b=i&&!D&&!b?"_unnormalized"+(O+=1):"";return{prefix:i,name:j,parentMap:f,unnormalized:!!b,url:n,originalName:l,isDefine:h,id:(i?i+"!"+j:j)+b}}function s(a){var f=a.id,b=m(q,f);b||(b=q[f]=new k.Module(a));return b}function u(a,f,b){var e=a.id,n=m(q,
e);if(t(r,e)&&(!n||n.defineEmitComplete))"defined"===f&&b(r[e]);else if(n=s(a),n.error&&"error"===f)b(n.error);else n.on(f,b)}function w(a,f){var b=a.requireModules,e=!1;if(f)f(a);else if(z(b,function(f){if(f=m(q,f))f.error=a,f.events.error&&(e=!0,f.emit("error",a))}),!e)h.onError(a)}function x(){U.length&&(ja.apply(I,[I.length-1,0].concat(U)),U=[])}function y(a){delete q[a];delete W[a]}function G(a,f,b){var e=a.map.id;a.error?a.emit("error",a.error):(f[e]=!0,z(a.depMaps,function(e,c){var d=e.id,
g=m(q,d);g&&(!a.depMatched[c]&&!b[d])&&(m(f,d)?(a.defineDep(c,r[d]),a.check()):G(g,f,b))}),b[e]=!0)}function E(){var a,f,b,e,n=(b=1E3*j.waitSeconds)&&k.startTime+b<(new Date).getTime(),c=[],i=[],g=!1,l=!0;if(!X){X=!0;H(W,function(b){a=b.map;f=a.id;if(b.enabled&&(a.isDefine||i.push(b),!b.error))if(!b.inited&&n)p(f)?g=e=!0:(c.push(f),d(f));else if(!b.inited&&(b.fetched&&a.isDefine)&&(g=!0,!a.prefix))return l=!1});if(n&&c.length)return b=B("timeout","Load timeout for modules: "+c,null,c),b.contextName=
k.contextName,w(b);l&&z(i,function(a){G(a,{},{})});if((!n||e)&&g)if((A||ea)&&!Y)Y=setTimeout(function(){Y=0;E()},50);X=!1}}function F(a){t(r,a[0])||s(l(a[0],null,!0)).init(a[1],a[2])}function L(a){var a=a.currentTarget||a.srcElement,b=k.onScriptLoad;a.detachEvent&&!Z?a.detachEvent("onreadystatechange",b):a.removeEventListener("load",b,!1);b=k.onScriptError;(!a.detachEvent||Z)&&a.removeEventListener("error",b,!1);return{node:a,id:a&&a.getAttribute("data-requiremodule")}}function M(){var a;for(x();I.length;){a=
I.shift();if(null===a[0])return w(B("mismatch","Mismatched anonymous define() module: "+a[a.length-1]));F(a)}}var X,$,k,P,Y,j={waitSeconds:7,baseUrl:"./",paths:{},pkgs:{},shim:{},config:{}},q={},W={},aa={},I=[],r={},V={},N=1,O=1;P={require:function(a){return a.require?a.require:a.require=k.makeRequire(a.map)},exports:function(a){a.usingExports=!0;if(a.map.isDefine)return a.exports?a.exports:a.exports=r[a.map.id]={}},module:function(a){return a.module?a.module:a.module={id:a.map.id,uri:a.map.url,config:function(){var b=
m(j.pkgs,a.map.id);return(b?m(j.config,a.map.id+"/"+b.main):m(j.config,a.map.id))||{}},exports:r[a.map.id]}}};$=function(a){this.events=m(aa,a.id)||{};this.map=a;this.shim=m(j.shim,a.id);this.depExports=[];this.depMaps=[];this.depMatched=[];this.pluginMaps={};this.depCount=0};$.prototype={init:function(a,b,c,e){e=e||{};if(!this.inited){this.factory=b;if(c)this.on("error",c);else this.events.error&&(c=v(this,function(a){this.emit("error",a)}));this.depMaps=a&&a.slice(0);this.errback=c;this.inited=
!0;this.ignore=e.ignore;e.enabled||this.enabled?this.enable():this.check()}},defineDep:function(a,b){this.depMatched[a]||(this.depMatched[a]=!0,this.depCount-=1,this.depExports[a]=b)},fetch:function(){if(!this.fetched){this.fetched=!0;k.startTime=(new Date).getTime();var a=this.map;if(this.shim)k.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],v(this,function(){return a.prefix?this.callPlugin():this.load()}));else return a.prefix?this.callPlugin():this.load()}},load:function(){var a=
this.map.url;V[a]||(V[a]=!0,k.load(this.map.id,a))},check:function(){if(this.enabled&&!this.enabling){var a,b,c=this.map.id;b=this.depExports;var e=this.exports,n=this.factory;if(this.inited)if(this.error)this.emit("error",this.error);else{if(!this.defining){this.defining=!0;if(1>this.depCount&&!this.defined){if(J(n)){if(this.events.error&&this.map.isDefine||h.onError!==ca)try{e=k.execCb(c,n,b,e)}catch(d){a=d}else e=k.execCb(c,n,b,e);this.map.isDefine&&((b=this.module)&&void 0!==b.exports&&b.exports!==
this.exports?e=b.exports:void 0===e&&this.usingExports&&(e=this.exports));if(a)return a.requireMap=this.map,a.requireModules=this.map.isDefine?[this.map.id]:null,a.requireType=this.map.isDefine?"define":"require",w(this.error=a)}else e=n;this.exports=e;if(this.map.isDefine&&!this.ignore&&(r[c]=e,h.onResourceLoad))h.onResourceLoad(k,this.map,this.depMaps);y(c);this.defined=!0}this.defining=!1;this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=
!0)}}else this.fetch()}},callPlugin:function(){var a=this.map,b=a.id,d=l(a.prefix);this.depMaps.push(d);u(d,"defined",v(this,function(e){var n,d;d=this.map.name;var g=this.map.parentMap?this.map.parentMap.name:null,C=k.makeRequire(a.parentMap,{enableBuildCallback:!0});if(this.map.unnormalized){if(e.normalize&&(d=e.normalize(d,function(a){return c(a,g,!0)})||""),e=l(a.prefix+"!"+d,this.map.parentMap),u(e,"defined",v(this,function(a){this.init([],function(){return a},null,{enabled:!0,ignore:!0})})),
d=m(q,e.id)){this.depMaps.push(e);if(this.events.error)d.on("error",v(this,function(a){this.emit("error",a)}));d.enable()}}else n=v(this,function(a){this.init([],function(){return a},null,{enabled:!0})}),n.error=v(this,function(a){this.inited=!0;this.error=a;a.requireModules=[b];H(q,function(a){0===a.map.id.indexOf(b+"_unnormalized")&&y(a.map.id)});w(a)}),n.fromText=v(this,function(e,c){var d=a.name,g=l(d),i=Q;c&&(e=c);i&&(Q=!1);s(g);t(j.config,b)&&(j.config[d]=j.config[b]);try{h.exec(e)}catch(D){return w(B("fromtexteval",
"fromText eval for "+b+" failed: "+D,D,[b]))}i&&(Q=!0);this.depMaps.push(g);k.completeLoad(d);C([d],n)}),e.load(a.name,C,n,j)}));k.enable(d,this);this.pluginMaps[d.id]=d},enable:function(){W[this.map.id]=this;this.enabling=this.enabled=!0;z(this.depMaps,v(this,function(a,b){var c,e;if("string"===typeof a){a=l(a,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap);this.depMaps[b]=a;if(c=m(P,a.id)){this.depExports[b]=c(this);return}this.depCount+=1;u(a,"defined",v(this,function(a){this.defineDep(b,
a);this.check()}));this.errback&&u(a,"error",v(this,this.errback))}c=a.id;e=q[c];!t(P,c)&&(e&&!e.enabled)&&k.enable(a,this)}));H(this.pluginMaps,v(this,function(a){var b=m(q,a.id);b&&!b.enabled&&k.enable(a,this)}));this.enabling=!1;this.check()},on:function(a,b){var c=this.events[a];c||(c=this.events[a]=[]);c.push(b)},emit:function(a,b){z(this.events[a],function(a){a(b)});"error"===a&&delete this.events[a]}};k={config:j,contextName:b,registry:q,defined:r,urlFetched:V,defQueue:I,Module:$,makeModuleMap:l,
nextTick:h.nextTick,onError:w,configure:function(a){a.baseUrl&&"/"!==a.baseUrl.charAt(a.baseUrl.length-1)&&(a.baseUrl+="/");var b=j.pkgs,c=j.shim,e={paths:!0,config:!0,map:!0};H(a,function(a,b){e[b]?"map"===b?(j.map||(j.map={}),S(j[b],a,!0,!0)):S(j[b],a,!0):j[b]=a});a.shim&&(H(a.shim,function(a,b){K(a)&&(a={deps:a});if((a.exports||a.init)&&!a.exportsFn)a.exportsFn=k.makeShimExports(a);c[b]=a}),j.shim=c);a.packages&&(z(a.packages,function(a){a="string"===typeof a?{name:a}:a;b[a.name]={name:a.name,
location:a.location||a.name,main:(a.main||"main").replace(ka,"").replace(fa,"")}}),j.pkgs=b);H(q,function(a,b){!a.inited&&!a.map.unnormalized&&(a.map=l(b))});if(a.deps||a.callback)k.require(a.deps||[],a.callback)},makeShimExports:function(a){return function(){var b;a.init&&(b=a.init.apply(ba,arguments));return b||a.exports&&da(a.exports)}},makeRequire:function(a,f){function d(e,c,g){var i,j;f.enableBuildCallback&&(c&&J(c))&&(c.__requireJsBuild=!0);if("string"===typeof e){if(J(c))return w(B("requireargs",
"Invalid require call"),g);if(a&&t(P,e))return P[e](q[a.id]);if(h.get)return h.get(k,e,a,d);i=l(e,a,!1,!0);i=i.id;return!t(r,i)?w(B("notloaded",'Module name "'+i+'" has not been loaded yet for context: '+b+(a?"":". Use require([])"))):r[i]}M();k.nextTick(function(){M();j=s(l(null,a));j.skipMap=f.skipMap;j.init(e,c,g,{enabled:!0});E()});return d}f=f||{};S(d,{isBrowser:A,toUrl:function(b){var d,f=b.lastIndexOf("."),g=b.split("/")[0];if(-1!==f&&(!("."===g||".."===g)||1<f))d=b.substring(f,b.length),b=
b.substring(0,f);return k.nameToUrl(c(b,a&&a.id,!0),d,!0)},defined:function(b){return t(r,l(b,a,!1,!0).id)},specified:function(b){b=l(b,a,!1,!0).id;return t(r,b)||t(q,b)}});a||(d.undef=function(b){x();var c=l(b,a,!0),d=m(q,b);delete r[b];delete V[c.url];delete aa[b];d&&(d.events.defined&&(aa[b]=d.events),y(b))});return d},enable:function(a){m(q,a.id)&&s(a).enable()},completeLoad:function(a){var b,c,e=m(j.shim,a)||{},d=e.exports;for(x();I.length;){c=I.shift();if(null===c[0]){c[0]=a;if(b)break;b=!0}else c[0]===
a&&(b=!0);F(c)}c=m(q,a);if(!b&&!t(r,a)&&c&&!c.inited){if(j.enforceDefine&&(!d||!da(d)))return p(a)?void 0:w(B("nodefine","No define call for "+a,null,[a]));F([a,e.deps||[],e.exportsFn])}E()},nameToUrl:function(a,b,c){var d,g,l,i,k,p;if(h.jsExtRegExp.test(a))i=a+(b||"");else{d=j.paths;g=j.pkgs;i=a.split("/");for(k=i.length;0<k;k-=1)if(p=i.slice(0,k).join("/"),l=m(g,p),p=m(d,p)){K(p)&&(p=p[0]);i.splice(0,k,p);break}else if(l){a=a===l.name?l.location+"/"+l.main:l.location;i.splice(0,k,a);break}i=i.join("/");
i+=b||(/\?/.test(i)||c?"":".js");i=("/"===i.charAt(0)||i.match(/^[\w\+\.\-]+:/)?"":j.baseUrl)+i}return j.urlArgs?i+((-1===i.indexOf("?")?"?":"&")+j.urlArgs):i},load:function(a,b){h.load(k,a,b)},execCb:function(a,b,c,d){return b.apply(d,c)},onScriptLoad:function(a){if("load"===a.type||la.test((a.currentTarget||a.srcElement).readyState))R=null,a=L(a),k.completeLoad(a.id)},onScriptError:function(a){var b=L(a);if(!p(b.id))return w(B("scripterror","Script error for: "+b.id,a,[b.id]))}};k.require=k.makeRequire();
return k}var h,x,y,E,L,F,R,M,s,ga,ma=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,na=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,fa=/\.js$/,ka=/^\.\//;x=Object.prototype;var N=x.toString,ha=x.hasOwnProperty,ja=Array.prototype.splice,A=!!("undefined"!==typeof window&&navigator&&window.document),ea=!A&&"undefined"!==typeof importScripts,la=A&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,Z="undefined"!==typeof opera&&"[object Opera]"===opera.toString(),G={},u={},U=[],Q=
!1;if("undefined"===typeof define){if("undefined"!==typeof requirejs){if(J(requirejs))return;u=requirejs;requirejs=void 0}"undefined"!==typeof require&&!J(require)&&(u=require,require=void 0);h=requirejs=function(b,c,d,p){var g,l="_";!K(b)&&"string"!==typeof b&&(g=b,K(c)?(b=c,c=d,d=p):b=[]);g&&g.context&&(l=g.context);(p=m(G,l))||(p=G[l]=h.s.newContext(l));g&&p.configure(g);return p.require(b,c,d)};h.config=function(b){return h(b)};h.nextTick="undefined"!==typeof setTimeout?function(b){setTimeout(b,
4)}:function(b){b()};require||(require=h);h.version="2.1.6";h.jsExtRegExp=/^\/|:|\?|\.js$/;h.isBrowser=A;x=h.s={contexts:G,newContext:ia};h({});z(["toUrl","undef","defined","specified"],function(b){h[b]=function(){var c=G._;return c.require[b].apply(c,arguments)}});if(A&&(y=x.head=document.getElementsByTagName("head")[0],E=document.getElementsByTagName("base")[0]))y=x.head=E.parentNode;h.onError=ca;h.load=function(b,c,d){var h=b&&b.config||{},g;if(A)return g=h.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml",
"html:script"):document.createElement("script"),g.type=h.scriptType||"text/javascript",g.charset="utf-8",g.async=!0,g.setAttribute("data-requirecontext",b.contextName),g.setAttribute("data-requiremodule",c),g.attachEvent&&!(g.attachEvent.toString&&0>g.attachEvent.toString().indexOf("[native code"))&&!Z?(Q=!0,g.attachEvent("onreadystatechange",b.onScriptLoad)):(g.addEventListener("load",b.onScriptLoad,!1),g.addEventListener("error",b.onScriptError,!1)),g.src=d,M=g,E?y.insertBefore(g,E):y.appendChild(g),
M=null,g;if(ea)try{importScripts(d),b.completeLoad(c)}catch(l){b.onError(B("importscripts","importScripts failed for "+c+" at "+d,l,[c]))}};A&&O(document.getElementsByTagName("script"),function(b){y||(y=b.parentNode);if(L=b.getAttribute("data-main"))return s=L,u.baseUrl||(F=s.split("/"),s=F.pop(),ga=F.length?F.join("/")+"/":"./",u.baseUrl=ga),s=s.replace(fa,""),h.jsExtRegExp.test(s)&&(s=L),u.deps=u.deps?u.deps.concat(s):[s],!0});define=function(b,c,d){var h,g;"string"!==typeof b&&(d=c,c=b,b=null);
K(c)||(d=c,c=null);!c&&J(d)&&(c=[],d.length&&(d.toString().replace(ma,"").replace(na,function(b,d){c.push(d)}),c=(1===d.length?["require"]:["require","exports","module"]).concat(c)));if(Q){if(!(h=M))R&&"interactive"===R.readyState||O(document.getElementsByTagName("script"),function(b){if("interactive"===b.readyState)return R=b}),h=R;h&&(b||(b=h.getAttribute("data-requiremodule")),g=G[h.getAttribute("data-requirecontext")])}(g?g.defQueue:U).push([b,c,d])};define.amd={jQuery:!0};h.exec=function(b){return eval(b)};
h(u)}})(this);;/*	ALL JS $Revision: 1.1 $
	Copyright 2010 Letvertise GmbH
	Hamburg 
	www.letvertise.com
*/
var _0x5bfe=["\x6F\x6E\x75\x6E\x6C\x6F\x61\x64","\x6C\x65\x6E\x67\x74\x68","\x73\x74\x6F\x70\x4F\x62\x73\x65\x72\x76\x69\x6E\x67","\x6F\x6E\x6C\x6F\x61\x64","\x6F\x6E\x73\x63\x72\x6F\x6C\x6C","\x6F\x6E\x72\x65\x73\x69\x7A\x65","\x62\x61\x6E\x6E\x65\x72\x5F\x69\x64","\x62\x61\x6E\x6E\x65\x72\x5F\x63\x6F\x6E\x74\x65\x6E\x74","\x61\x64\x73\x65\x72\x76\x65\x72","\x62\x61\x6E\x6E\x65\x72\x5F\x77\x69\x64\x74\x68","\x62\x61\x6E\x6E\x65\x72\x5F\x68\x65\x69\x67\x68\x74","\x62\x61\x6E\x6E\x65\x72\x5F\x6C\x6F\x61\x64\x65\x64","\x62\x61\x6E\x6E\x65\x72\x49\x6E\x56\x69\x65\x77\x70\x6F\x72\x74","\x62\x61\x6E\x6E\x65\x72\x49\x6E\x56\x69\x65\x77\x70\x6F\x72\x74\x43\x6F\x75\x6E\x74\x65\x72","\x62\x61\x6E\x6E\x65\x72\x5F\x73\x74\x61\x74\x69\x63","\x73\x74\x61\x72\x74\x54\x69\x6D\x65","\x76\x69\x73\x69\x62\x6C\x65\x54\x69\x6D\x65","\x69\x73\x53\x69\x67\x68\x74\x4C\x6F\x61\x64\x65\x72\x49\x6E\x56\x69\x65\x77\x50\x6F\x72\x74","\x67\x65\x74\x54\x69\x6D\x65","\x70\x75\x73\x68","\x67\x72\x65\x65\x6E","\x72\x65\x64","\x62\x61\x63\x6B\x67\x72\x6F\x75\x6E\x64\x43\x6F\x6C\x6F\x72","\x73\x74\x79\x6C\x65","\x73\x74\x61\x74\x75\x73\x5F","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64","\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C","\x70\x6F\x73\x69\x74\x69\x6F\x6E","\x61\x62\x73\x6F\x6C\x75\x74\x65","\x69\x66\x72\x61\x6D\x65","\x63\x72\x65\x61\x74\x65\x45\x6C\x65\x6D\x65\x6E\x74","\x6D\x61\x72\x67\x69\x6E\x57\x69\x64\x74\x68","\x30","\x6D\x61\x72\x67\x69\x6E\x48\x65\x69\x67\x68\x74","\x76\x53\x70\x61\x63\x65","\x68\x53\x70\x61\x63\x65","\x66\x72\x61\x6D\x65\x42\x6F\x72\x64\x65\x72","\x68\x65\x69\x67\x68\x74","\x77\x69\x64\x74\x68","\x73\x63\x72\x6F\x6C\x6C\x69\x6E\x67","\x6E\x6F","\x6E\x61\x6D\x65","\x5F\x66\x72\x61\x6D\x65","\x69\x64","\x72\x69\x67\x68\x74\x6D\x65\x64\x69\x61","\x61\x70\x70\x65\x6E\x64\x43\x68\x69\x6C\x64","\x73\x6D\x61\x72\x74\x61\x64\x73\x65\x72\x76\x65\x72","\x73\x72\x63","\x73\x69\x67\x68\x74\x6C\x6F\x61\x64\x65\x72\x5F\x66\x72\x61\x6D\x65\x2E\x68\x74\x6D\x6C\x3F","\x20","\x72\x65\x70\x6C\x61\x63\x65","\x64\x6F\x63\x75\x6D\x65\x6E\x74","\x66\x72\x61\x6D\x65\x73","\x6F\x70\x65\x6E","\x3C\x68\x74\x6D\x6C\x3E\x3C\x68\x65\x61\x64\x3E\x3C\x2F\x68\x65\x61\x64\x3E\x3C\x62\x6F\x64\x79\x20\x6D\x61\x72\x67\x69\x6E\x68\x65\x69\x67\x68\x74\x3D\x22\x30\x22\x20\x6D\x61\x72\x67\x69\x6E\x77\x69\x64\x74\x68\x3D\x22\x30\x22\x3E","\x3C\x2F\x62\x6F\x64\x79\x3E\x3C\x2F\x68\x74\x6D\x6C\x3E","\x77\x72\x69\x74\x65","\x63\x6C\x6F\x73\x65","\x6F\x66\x66\x73\x65\x74\x54\x6F\x70","\x6F\x66\x66\x73\x65\x74\x4C\x65\x66\x74","\x6F\x66\x66\x73\x65\x74\x48\x65\x69\x67\x68\x74","\x6F\x66\x66\x73\x65\x74\x57\x69\x64\x74\x68","\x69\x6E\x6E\x65\x72\x57\x69\x64\x74\x68","\x64\x6F\x63\x75\x6D\x65\x6E\x74\x45\x6C\x65\x6D\x65\x6E\x74","\x63\x6C\x69\x65\x6E\x74\x57\x69\x64\x74\x68","\x62\x6F\x64\x79","\x69\x6E\x6E\x65\x72\x48\x65\x69\x67\x68\x74","\x63\x6C\x69\x65\x6E\x74\x48\x65\x69\x67\x68\x74","\x73\x63\x72\x6F\x6C\x6C\x58","\x73\x63\x72\x6F\x6C\x6C\x4C\x65\x66\x74","\x70\x61\x67\x65\x58\x4F\x66\x66\x73\x65\x74","\x73\x63\x72\x6F\x6C\x6C\x59","\x73\x63\x72\x6F\x6C\x6C\x54\x6F\x70","\x70\x61\x67\x65\x59\x4F\x66\x66\x73\x65\x74"];var sightLoader= new Array();window[_0x5bfe[0]]=function (){for(var _0x3d02x2=0;_0x3d02x2<sightLoader[_0x5bfe[1]];_0x3d02x2++){sightLoader[_0x3d02x2][_0x5bfe[2]]();} ;} ;window[_0x5bfe[3]]=function (){observeSightLoader();} ;window[_0x5bfe[4]]=function (){observeSightLoader();} ;window[_0x5bfe[5]]=function (){observeSightLoader();} ;function SightLoader(_0x3d02x4,_0x3d02x5,_0x3d02x6,_0x3d02x7,_0x3d02x8,_0x3d02x9){this[_0x5bfe[6]]=_0x3d02x4;this[_0x5bfe[7]]=_0x3d02x6;this[_0x5bfe[8]]=_0x3d02x5;this[_0x5bfe[9]]=_0x3d02x7;this[_0x5bfe[10]]=_0x3d02x8;this[_0x5bfe[11]]=false;this[_0x5bfe[12]]=false;this[_0x5bfe[13]]=0;this[_0x5bfe[14]]=_0x3d02x9;this[_0x5bfe[15]]=0;this[_0x5bfe[16]]=0;this[_0x5bfe[17]]=function (_0x3d02xa){if(this[_0x5bfe[12]]==false&_0x3d02xa==true){this[_0x5bfe[13]]++;this[_0x5bfe[15]]= new Date()[_0x5bfe[18]]();} else {if(this[_0x5bfe[12]]==true&_0x3d02xa==false){if(this[_0x5bfe[15]]>0){this[_0x5bfe[16]]+=( new Date()[_0x5bfe[18]]()-this[_0x5bfe[15]]);} ;} ;} ;this[_0x5bfe[12]]=_0x3d02xa;} ;this[_0x5bfe[2]]=function (_0x3d02xa){if(_0x3d02xa){this[_0x5bfe[16]]+=( new Date()[_0x5bfe[18]]()-this[_0x5bfe[15]]);} ;} ;sightLoader[_0x5bfe[19]](this);} ;function observeSightLoader(){for(var _0x3d02x2=0;_0x3d02x2<sightLoader[_0x5bfe[1]];_0x3d02x2++){checkSightBannerVisibility(sightLoader[_0x3d02x2]);} ;} ;var lock=false;function checkSightBannerVisibility(_0x3d02xe){if(lock){return ;} ;lock=true;if(isSightBannerInViewport(_0x3d02xe)){_0x3d02xe[_0x5bfe[17]](true);if(!_0x3d02xe[_0x5bfe[11]]){_0x3d02xe[_0x5bfe[11]]=true;loadSightBannerInViewport(_0x3d02xe);} ;} else {_0x3d02xe[_0x5bfe[17]](false);} ;lock=false;} ;function updateStatus(_0x3d02xe,_0x3d02x10){var _0x3d02x11=_0x3d02xe[_0x5bfe[12]]?_0x5bfe[20]:_0x5bfe[21];document[_0x5bfe[25]](_0x5bfe[24]+_0x3d02xe[_0x5bfe[6]])[_0x5bfe[23]][_0x5bfe[22]]=_0x3d02x11;document[_0x5bfe[25]](_0x5bfe[24]+_0x3d02xe[_0x5bfe[6]])[_0x5bfe[26]]=_0x3d02xe[_0x5bfe[6]]+_0x3d02x10;} ;function loadSightBannerInViewport(_0x3d02xe){if(_0x3d02xe[_0x5bfe[14]]){document[_0x5bfe[25]](_0x3d02xe[_0x5bfe[6]])[_0x5bfe[23]][_0x5bfe[27]]=_0x5bfe[28];} ;var _0x3d02x13=document[_0x5bfe[30]](_0x5bfe[29]);_0x3d02x13[_0x5bfe[31]]=_0x5bfe[32];_0x3d02x13[_0x5bfe[33]]=_0x5bfe[32];_0x3d02x13[_0x5bfe[34]]=_0x5bfe[32];_0x3d02x13[_0x5bfe[35]]=_0x5bfe[32];_0x3d02x13[_0x5bfe[36]]=_0x5bfe[32];_0x3d02x13[_0x5bfe[37]]=_0x3d02xe[_0x5bfe[9]];_0x3d02x13[_0x5bfe[38]]=_0x3d02xe[_0x5bfe[10]];_0x3d02x13[_0x5bfe[39]]=_0x5bfe[40];_0x3d02x13[_0x5bfe[41]]=_0x3d02xe[_0x5bfe[6]]+_0x5bfe[42];_0x3d02x13[_0x5bfe[43]]=_0x3d02xe[_0x5bfe[6]]+_0x5bfe[42];if(_0x3d02xe[_0x5bfe[8]]==_0x5bfe[44]){document[_0x5bfe[25]](_0x3d02xe[_0x5bfe[6]])[_0x5bfe[45]](_0x3d02x13);writeAdTag2IFrame(_0x3d02xe);} else {if(_0x3d02xe[_0x5bfe[8]]==_0x5bfe[46]){_0x3d02x13[_0x5bfe[47]]=publicationUrl+_0x5bfe[48]+unescape(_0x3d02xe[_0x5bfe[7]])[_0x5bfe[50]](/\+/g,_0x5bfe[49]);document[_0x5bfe[25]](_0x3d02xe[_0x5bfe[6]])[_0x5bfe[45]](_0x3d02x13);} ;} ;} ;function writeAdTag2IFrame(_0x3d02xe){var _0x3d02x15=unescape(_0x3d02xe[_0x5bfe[7]])[_0x5bfe[50]](/\+/g,_0x5bfe[49]);var _0x3d02x16=window[_0x5bfe[52]][_0x3d02xe[_0x5bfe[6]]+_0x5bfe[42]][_0x5bfe[51]];_0x3d02x16[_0x5bfe[53]]();_0x3d02x16[_0x5bfe[56]](_0x5bfe[54]+_0x3d02x15+_0x5bfe[55]);_0x3d02x16[_0x5bfe[57]]();} ;function isSightBannerInViewport(_0x3d02xe){window_y1=getViewportScrollY();window_x1=getViewportScrollX();window_y2=window_y1+getViewportHeight();window_x2=window_x1+getViewportWidth();element_y1=document[_0x5bfe[25]](_0x3d02xe[_0x5bfe[6]])[_0x5bfe[58]];element_x1=document[_0x5bfe[25]](_0x3d02xe[_0x5bfe[6]])[_0x5bfe[59]];element_y2=element_y1+document[_0x5bfe[25]](_0x3d02xe[_0x5bfe[6]])[_0x5bfe[60]];element_x2=element_x1+document[_0x5bfe[25]](_0x3d02xe[_0x5bfe[6]])[_0x5bfe[61]];if(((window_y1<=element_y1&&element_y1<=window_y2)&&(window_x1<=element_x1&&element_x1<=window_x2))||((window_y1<=element_y2&&element_y2<=window_y2)&&(window_x1<=element_x2&&element_x2<=window_x2))){return true;} ;return false;} ;getViewportWidth=function (){var _0x3d02x18=0;if(window[_0x5bfe[62]]){_0x3d02x18=window[_0x5bfe[62]]-18;} else {if(document[_0x5bfe[63]]&&document[_0x5bfe[63]][_0x5bfe[64]]){_0x3d02x18=document[_0x5bfe[63]][_0x5bfe[64]];} else {if(document[_0x5bfe[65]]&&document[_0x5bfe[65]][_0x5bfe[64]]){_0x3d02x18=document[_0x5bfe[65]][_0x5bfe[64]];} ;} ;} ;return _0x3d02x18;} ;getViewportHeight=function (){var _0x3d02x19=0;if(window[_0x5bfe[66]]){_0x3d02x19=window[_0x5bfe[66]]-18;} else {if(document[_0x5bfe[63]]&&document[_0x5bfe[63]][_0x5bfe[67]]){_0x3d02x19=document[_0x5bfe[63]][_0x5bfe[67]];} else {if(document[_0x5bfe[65]]&&document[_0x5bfe[65]][_0x5bfe[67]]){_0x3d02x19=document[_0x5bfe[65]][_0x5bfe[67]];} ;} ;} ;return _0x3d02x19;} ;getViewportScrollX=function (){var _0x3d02x1a=0;if(window[_0x5bfe[68]]){_0x3d02x1a=window[_0x5bfe[68]];} else {if(document[_0x5bfe[63]]&&document[_0x5bfe[63]][_0x5bfe[69]]){_0x3d02x1a=document[_0x5bfe[63]][_0x5bfe[69]];} else {if(document[_0x5bfe[65]]&&document[_0x5bfe[65]][_0x5bfe[69]]){_0x3d02x1a=document[_0x5bfe[65]][_0x5bfe[69]];} else {if(window[_0x5bfe[70]]){_0x3d02x1a=window[_0x5bfe[70]];} ;} ;} ;} ;return _0x3d02x1a;} ;getViewportScrollY=function (){var _0x3d02x1b=0;if(window[_0x5bfe[71]]){_0x3d02x1b=window[_0x5bfe[71]];} else {if(document[_0x5bfe[63]]&&document[_0x5bfe[63]][_0x5bfe[72]]){_0x3d02x1b=document[_0x5bfe[63]][_0x5bfe[72]];} else {if(document[_0x5bfe[65]]&&document[_0x5bfe[65]][_0x5bfe[72]]){_0x3d02x1b=document[_0x5bfe[65]][_0x5bfe[72]];} else {if(window[_0x5bfe[73]]){_0x3d02x1b=window[_0x5bfe[73]];} ;} ;} ;} ;return _0x3d02x1b;} ;;var google_adnum = 0;

function google_ad_request_done(google_ads) {
/*
* This function is required and is used to display
* the ads that are returned from the JavaScript
* request. You should modify the document.write
* commands so that the HTML they write out fits
* with your desired ad layout.
*/
var s = '';
var i;

/*
* Verify that there are actually ads to display.
*/
	if (google_ads.length == 0) {
		return;
	}

/*
* If an image or flash ad is returned, display that ad.
* Otherwise, build a string containing all of the ads and
* then use a document.write() command to print that string.
*/

	if (google_ads[0].type == "flash") {

		s += '<a href=\"' +
		google_info.feedback_url + '\" style="color:000000">Ads by Google</a><br>' +
		'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' +
		' codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" WIDTH="' +
		google_ad.image_width + '" HEIGHT="' +
		google_ad.image_height + '"> <PARAM NAME="movie" VALUE="' +
		google_ad.image_url + '">' +
		'<PARAM NAME="quality" VALUE="high">' +
		'<PARAM NAME="AllowScriptAccess" VALUE="never">' +
		'<EMBED src="' +
		google_ad.image_url + '" WIDTH="' +
		google_ad.image_width + '" HEIGHT="' +
		google_ad.image_height +
		'" TYPE="application/x-shockwave-flash"' +
		' AllowScriptAccess="never" ' +
		' PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer"></EMBED></OBJECT>';

	} else if (google_ads[0].type == "image") {

		s += '<a href=\"' +
		google_info.feedback_url + '\" style="color:000000">Ads by Google</a><br> <a href="' +
		google_ads[0].url + '" target="_top" title="go to ' +
		google_ads[0].visible_url + '" onmouseout="window.status=\'\'" onmouseover="window.status=\'go to ' +
		google_ads[0].visible_url + '\';return true"><img border="0" src="' +
		google_ads[0].image_url + '"width="' +
		google_ads[0].image_width + '"height="' +
		google_ads[0].image_height + '"></a>';

	} else if (google_ads[0].type == "html") {

		s += google_ads[0].snippet;

	} else {

		if (google_ads.length == 1) {
/*
* Partners should adjust text sizes
* so ads occupy the majority of ad space.
*/
			s += '<div class=\"googleHeadline\"><a href=\"' +
			google_info.feedback_url + '\" class="adsByGoogle" target="_blank">Google Anzeige</a></div><div class=\"googleAdsFrame\"><a href="' +
			google_ads[0].url + '" onmouseout="window.status=\'\'" onmouseover="window.status=\'go to ' +
			google_ads[0].visible_url + '\';return true" class="headline" target="_blank">' +
			google_ads[0].line1 + '</a><br><span>' +
			google_ads[0].line2 + ' ' +
			google_ads[0].line3 + '</span> <a href="' +
			google_ads[0].url + '" onmouseout="window.status=\'\'" onmouseover="window.status=\'go to ' +
			google_ads[0].visible_url + '\';return true" class="link" target="_blank">' +
			google_ads[0].visible_url + '</a></div>';
			
			if (google_ads[0].bidtype == "CPC") {
				google_adnum = google_adnum + google_ads.length;
			}

		} else if (google_ads.length > 1) {

			s += '<div class=\"googleHeadline\"><a href=\"' + google_info.feedback_url + '\" class="adsByGoogle" target="_blank">Google Anzeigen</a></div>'

  /*
  * For text ads, append each ad to the string.
  */

			for(i = 0; i < google_ads.length; ++i) {

				s += '<div class="googleAdsFrame"><a href="' +
				google_ads[i].url + '" onmouseout="window.status=\'\'" onmouseover="window.status=\'go to ' +
				google_ads[i].visible_url + '\';return true" class="headline" target="_blank">' +
				google_ads[i].line1 + '</a><br><span>' +
				google_ads[i].line2 + ' ' +
				google_ads[i].line3 + '</span> <a href="' +
				google_ads[i].url + '" onmouseout="window.status=\'\'" onmouseover="window.status=\'go to ' +
				google_ads[i].visible_url + '\';return true" class="link" target="_blank">' +
				google_ads[i].visible_url + '</a></div>';
			}
   
			if (google_ads[0].bidtype == "CPC") {
				google_adnum = google_adnum + google_ads.length;
			}
   
		}
    }

    document.write(s);
    return;
}

google_ad_client = 'pub-9638257500739576'; // substitute your client_id (pub-#)
google_ad_channel = '2805017551'; // In-Text-Ads Print-WELT
google_ad_output = 'js';
google_max_num_ads = '1';
google_ad_type = 'text';
google_image_size = '200x200';
google_feedback = 'on';
google_language = 'de';;var galleryAds = new Array();
var galleryAdsActive = true;
var adReloadActive = true;

function getGalleryAd(id) {
    if (galleryAdsActive) {
        return galleryAds[id];
    }
}

function setGalleryAdLoaded(id) {
    var ad = getGalleryAd(id);
    if (ad && ad.adLoadStatus == 1) {
        ad.adLoadStatus = 2;
    }
}

function setGalleryAdReloadLoaded(id) {
    var ad = getGalleryAd(id);
    if (ad && ad.adReloadLoadStatus == 1) {
        ad.adReloadLoadStatus = 2;
    }
}

function GalleryAd(id, clickCount, reloadClickCount, channelName) {
    galleryAds[id] = this;
    this.id = id;
    this.clickCount = clickCount;
    this.channelName = channelName;
    this.galleryClick = 0;
    this.adLoadStatus = 0;
    this.galleryElement = null;
    this.counterElement = null;
    this.bannerElement = null;
    this.adElement = null;
    this.adDomElement = null;
    this.titleElement = null;
    this.adFrame = null;
    
    this.reloadClickCount = reloadClickCount;
    this.adReloadLoadStatus = 0;
    this.reloadGalleryClick = 0;
    this.adReloadFrame = null;
    this.superbannerElement = null;
    this.skyscraperElement = null;
    this.rectangleElement = null;
    
    this.init = function(galleryElement) {
        this.galleryElement = galleryElement;
        this.counterElement = $("li.counter", galleryElement);
        var bannerAdId = "galleryBanner_"+this.id;
        this.bannerElement = $("#galleryBanner_"+this.id);
        var galleryAdId = "galleryAd_"+this.id;
        this.adElement = $("<div id='"+galleryAdId+"' class='clear galleryContent galleryContentAd galleryNextTrigger' style='display:none;'></div>").appendTo(galleryElement);
        this.adDomElement = document.getElementById(galleryAdId);
        this.titleElement = $("<li class='counter' style='display:none;'></li>").insertBefore(this.counterElement);
        this.adFrame = document.getElementById("adFrame_"+this.id);
        
        if (adReloadActive) {
            this.adReloadFrame = document.getElementById("adReloadFrame_"+this.id);
            this.superbannerElement = document.getElementById("ad2");
            this.skyscraperElement = document.getElementById("ad3");
            this.rectangleElement = document.getElementById("banner_1");
        }
    };
    
    this.countClick = function() {
        if (this.adReloadLoadStatus == 0) {
            this.reloadGalleryClick++;
            if (this.reloadGalleryClick >= this.reloadClickCount) {
                if (this.rectangleElement) {
                    this.loadAd(this.adReloadFrame, "adReload");
                } else {
                    this.loadAd(this.adReloadFrame, "adReloadBig");
                }
                this.adReloadLoadStatus = 1;
            }
        }

        if (this.adLoadStatus == 0) {
            this.galleryClick++;
            if (this.galleryClick >= this.clickCount) {
                this.loadAd(this.adFrame, "adGallery");
                this.adLoadStatus = 1;
                return true;
            }
        }
        return false;
    };
    
    this.loadAd = function(frame, name) {
        if (frame) {
            var timestamp = (new Date()).getTime();
            var adURL = "/"+name+".html?r="+this.channelName+"&id="+this.id+"&s="+timestamp;
            frame.setAttribute("src", adURL);
        }
    };
    
    this.isLoaded = function() {
        if (this.adReloadLoadStatus == 2) {
            if (this.adReloadFrame) {
                if (this.superbannerElement) {
                    this.superbannerElement.innerHTML = this.adReloadFrame.contentWindow.document.getElementById("bannerAd").innerHTML;
                }
                if (this.skyscraperElement) {
                    this.skyscraperElement.innerHTML = this.adReloadFrame.contentWindow.document.getElementById("scyscraperAd").innerHTML;
                }
                if (this.rectangleElement) {
                    this.rectangleElement.innerHTML = this.adReloadFrame.contentWindow.document.getElementById("rectangleAd").innerHTML;
                }
            }
            this.reloadGalleryClick = 0;
            this.adReloadLoadStatus = 0;
        }

        if (this.adLoadStatus == 2) {
            if (this.adFrame) {
                var adHtml = this.adFrame.contentWindow.document.getElementById("ad").innerHTML;
                if (adHtml.indexOf("display:none;") == -1) {
                    this.adLoadStatus = 3;
                    this.counterElement.hide();
                    this.titleElement.show();
                    this.adElement.show();
                    this.adDomElement.innerHTML = adHtml;
                    var bannerHtml = this.adFrame.contentWindow.document.getElementById("banner").innerHTML;
                    if (bannerHtml.indexOf("display:none;") == -1) {
                        this.bannerElement.show();
                    }
                    return true;
                } else {
                    this.adLoadStatus = 0;
                }
            }
        } else if (this.adLoadStatus == 3) {
            this.galleryClick = 0;
            this.adLoadStatus = 0;
            this.adElement.hide();
            this.titleElement.hide();
            this.counterElement.show();
        }
        return false;
    };    
}


/* SmartAd content replacing */
var smartAdContents = new Array();
var smartAdIds = new Array();

function setSmartAdContent(formatId, adId, content) {
    smartAdContents[formatId] = content;
    smartAdIds[formatId] = adId;
}

function checkSmartAdContent(formatId) {
    if (sas_noad) {
        replaceSmartAdContent(formatId);
    };
}

function replaceSmartAdContent(formatId) {
    var adId = smartAdIds[formatId];
    var content = smartAdContents[formatId];
    var ad = $("#"+adId);
    if (ad) {
        if (content) {
            ad.after(content);
        }
        ad.hide();
    }
}
;/*!
 * jQuery Tools v1.2.6 - The missing UI library for the Web
 * 
 * tabs/tabs.js
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/
 * 
 */
(function(a){a.tools=a.tools||{version:"v1.2.6"},a.tools.tabs={conf:{tabs:"a",current:"current",onBeforeClick:null,onClick:null,effect:"default",initialIndex:0,event:"click",rotate:!1,slideUpSpeed:400,slideDownSpeed:400,history:!1},addEffect:function(a,c){b[a]=c}};var b={"default":function(a,b){this.getPanes().hide().eq(a).show(),b.call(), $(window).trigger('resize')},fade:function(a,b){var c=this.getConf(),d=c.fadeOutSpeed,e=this.getPanes();d?e.fadeOut(d):e.hide(),e.eq(a).fadeIn(c.fadeInSpeed,b)},slide:function(a,b){var c=this.getConf();this.getPanes().slideUp(c.slideUpSpeed),this.getPanes().eq(a).slideDown(c.slideDownSpeed,b)},ajax:function(a,b){this.getPanes().eq(0).load(this.getTabs().eq(a).attr("href"),b)}},c,d;a.tools.tabs.addEffect("horizontal",function(b,e){if(!c){var f=this.getPanes().eq(b),g=this.getCurrentPane();d||(d=this.getPanes().eq(0).width()),c=!0,f.show(),g.animate({width:0},{step:function(a){f.css("width",d-a)},complete:function(){a(this).hide(),e.call(),c=!1}}),g.length||(e.call(),c=!1)}});function e(c,d,e){var f=this,g=c.add(this),h=c.find(e.tabs),i=d.jquery?d:c.children(d),j;h.length||(h=c.children()),i.length||(i=c.parent().find(d)),i.length||(i=a(d)),a.extend(this,{click:function(c,d){var i=h.eq(c);typeof c=="string"&&c.replace("#","")&&(i=h.filter("[href*="+c.replace("#","")+"]"),c=Math.max(h.index(i),0));if(e.rotate){var k=h.length-1;if(c<0)return f.click(k,d);if(c>k)return f.click(0,d)}if(!i.length){if(j>=0)return f;c=e.initialIndex,i=h.eq(c)}if(c===j)return f;d=d||a.Event(),d.type="onBeforeClick",g.trigger(d,[c]);if(!d.isDefaultPrevented()){b[e.effect].call(f,c,function(){j=c,d.type="onClick",g.trigger(d,[c])}),h.removeClass(e.current),i.addClass(e.current);return f}},getConf:function(){return e},getTabs:function(){return h},getPanes:function(){return i},getCurrentPane:function(){return i.eq(j)},getCurrentTab:function(){return h.eq(j)},getIndex:function(){return j},next:function(){return f.click(j+1)},prev:function(){return f.click(j-1)},destroy:function(){h.unbind(e.event).removeClass(e.current),i.find("a[href^=#]").unbind("click.T");return f}}),a.each("onBeforeClick,onClick".split(","),function(b,c){a.isFunction(e[c])&&a(f).bind(c,e[c]),f[c]=function(b){b&&a(f).bind(c,b);return f}}),e.history&&a.fn.history&&(a.tools.history.init(h),e.event="history"),h.each(function(b){a(this).bind(e.event,function(a){f.click(b,a);return a.preventDefault()})}),i.find("a[href^=#]").bind("click.T",function(b){f.click(a(this).attr("href"),b)}),location.hash&&e.tabs=="a"&&c.find("[href="+location.hash+"]").length?f.click(location.hash):(e.initialIndex===0||e.initialIndex>0)&&f.click(e.initialIndex)}a.fn.tabs=function(b,c){var d=this.data("tabs");d&&(d.destroy(),this.removeData("tabs")),a.isFunction(c)&&(c={onBeforeClick:c}),c=a.extend({},a.tools.tabs.conf,c),this.each(function(){d=new e(a(this),b,c),a(this).data("tabs",d)});return c.api?d:this}})(jQuery);
;/*!
 * jQuery Cookie Plugin v1.3
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function ($, document, undefined) {

    var pluses = /\+/g;

    function raw(s) {
        return s;
    }

    function decoded(s) {
        return decodeURIComponent(s.replace(pluses, ' '));
    }

    var config = $.cookie = function (key, value, options) {

        // write
        if (value !== undefined) {
            options = $.extend({}, config.defaults, options);

            if (value === null) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = config.json ? JSON.stringify(value) : String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // read
        var decode = config.raw ? raw : decoded;
        var cookies = document.cookie.split('; ');
        for (var i = 0, parts; (parts = cookies[i] && cookies[i].split('=')); i++) {
            if (decode(parts.shift()) === key) {
                var cookie = decode(parts.join('='));
                return config.json ? JSON.parse(cookie) : cookie;
            }
        }

        return null;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        if ($.cookie(key) !== null) {
            $.cookie(key, null, options);
            return true;
        }
        return false;
    };

})(jQuery, document);
;/**
 * jQuery Plugin to obtain touch gestures from iPhone, iPod Touch and iPad, should also work with Android mobile phones (not tested yet!)
 * Common usage: wipe images (left and right to show the previous or next image)
 *
 * @author Andreas Waltl, netCU Internetagentur (http://www.netcu.de)
 * @version modification: taken from http://stackoverflow.com/questions/9774253/jquery-touchwipe-disable-default-scrolling-for-1-axis-only
 * @version 1.1.1 (9th December 2010) - fix bug (older IE's had problems)
 * @version 1.1 (1st September 2010) - support wipe up and wipe down
 * @version 1.0 (15th July 2010)
 *
 */
(function ($) {
    $.fn.touchwipe = function (settings) {
        var config = {
            min_move_x: 20,
            min_move_y: 20,
            wipeLeft: function (e) {
            },
            wipeRight: function (e) {
            },
            wipeUp: function (e) {
            },
            wipeDown: function (e) {
            },
            preventDefaultEvents: true
        };

        if (settings) {
            $.extend(config, settings);
        }

        this.each(function () {
            var startX;
            var startY;
            var isMoving = false;

            function cancelTouch() {
                this.removeEventListener('touchmove', onTouchMove);
                startX = null;
                isMoving = false;
            }

            function onTouchMove(e) {
                if (config.preventDefaultEvents) {
                    e.preventDefault();
                }
                if (isMoving) {
                    var x = e.touches[0].pageX;
                    var y = e.touches[0].pageY;
                    var dx = startX - x;
                    var dy = startY - y;
                    if (Math.abs(dx) >= config.min_move_x) {
                        cancelTouch();
                        if (dx > 0) {
                            config.wipeLeft(e);
                        }
                        else {
                            config.wipeRight(e);
                        }
                    }
                    else if (Math.abs(dy) >= config.min_move_y) {
                        cancelTouch();
                        if (dy > 0) {
                            config.wipeDown(e);
                        }
                        else {
                            config.wipeUp(e);
                        }
                    }
                }
            }

            function onTouchStart(e) {
                if (e.touches.length === 1) {
                    startX = e.touches[0].pageX;
                    startY = e.touches[0].pageY;
                    isMoving = true;
                    this.addEventListener('touchmove', onTouchMove, false);
                }
            }

            if ('ontouchstart' in document.documentElement) {
                this.addEventListener('touchstart', onTouchStart, false);
            }
        });

        return this;
    };

})(jQuery);;/***************
 Details
 ***************/

/*!
 * Velocity.js: Accelerated JavaScript animation.
 * @version 0.9.0
 * @docs http://velocityjs.org
 * @license Copyright 2014 Julian Shapiro. MIT License: http://en.wikipedia.org/wiki/MIT_License
 */

/****************
 Summary
 ****************/

/*
 Velocity's structure:
 - CSS Stack: Works independently from the rest of Velocity.
 - Velocity.animate(): Core method that iterates over the targeted elements and queues the incoming call onto each element individually. Consists of:
 - Pre-Queueing: Prepare the element for animation by instantiating its data cache and processing the call's options.
 - Queueing: The logic that runs once the call has reached its point of execution in the element's $.queue() stack.
 Most logic is placed here to avoid risking it becoming stale (if the element's properties have changed).
 - Pushing: Consolidation of the tween data followed by its push onto the global in-progress calls container.
 - tick(): The single requestAnimationFrame loop responsible for tweening all in-progress calls.
 - completeCall(): Handles the cleanup process for each Velocity call.
 */

/* NOTICE: Despite the ensuing code indicating that Velocity works *without* jQuery and *with* Zepto, this support has not yet landed. */

/******************
 Velocity.js
 ******************/

;(function (global, window, document, undefined) {

    /*****************
     Constants
     *****************/

    var NAME = "velocity",
        DEFAULT_DURATION = 400,
        DEFAULT_EASING = "swing";

    /*********************
     Helper Functions
     *********************/

    /* IE detection. Gist: https://gist.github.com/julianshapiro/9098609 */
    var IE = (function() {
        if (document.documentMode) {
            return document.documentMode;
        } else {
            for (var i = 7; i > 4; i--) {
                var div = document.createElement("div");

                div.innerHTML = "<!--[if IE " + i + "]><span></span><![endif]-->";

                if (div.getElementsByTagName("span").length) {
                    div = null;

                    return i;
                }
            }
        }

        return undefined;
    })();

    /* rAF polyfill. Gist: https://gist.github.com/julianshapiro/9497513 */
    var rAFPollyfill = (function() {
        var timeLast = 0;

        return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
            var timeCurrent = (new Date()).getTime(),
                timeDelta;

            /* Dynamically set delay on a per-tick basis to match 60fps. */
            /* Technique by Erik Moller. MIT license: https://gist.github.com/paulirish/1579671 */
            timeDelta = Math.max(0, 16 - (timeCurrent - timeLast));
            timeLast = timeCurrent + timeDelta;

            return setTimeout(function() { callback(timeCurrent + timeDelta); }, timeDelta);
        };
    })();

    var rAF = window.requestAnimationFrame || rAFPollyfill;

    /* Array compacting. Copyright Lo-Dash. MIT License: https://github.com/lodash/lodash/blob/master/LICENSE.txt */
    function compactSparseArray (array) {
        var index = -1,
            length = array ? array.length : 0,
            result = [];

        while (++index < length) {
            var value = array[index];

            if (value) {
                result.push(value);
            }
        }

        return result;
    }

    var Type = {
        isString: function (variable) {
            return (typeof variable === "string");
        },

        isArray: Array.isArray || function (variable) {
            return Object.prototype.toString.call(variable) === "[object Array]";
        },

        isFunction: function (variable) {
            return Object.prototype.toString.call(variable) === "[object Function]";
        },

        isNode: function (variable) {
            return variable && variable.nodeType;
        },

        /* Copyright Martin Bohm. MIT License: https://gist.github.com/Tomalak/818a78a226a0738eaade */
        isNodeList: function (variable) {
            return typeof variable === "object" &&
                /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(variable)) &&
                variable.length !== undefined &&
                (variable.length === 0 || (typeof variable[0] === "object" && variable[0].nodeType > 0));
        },

        /* Determine if variable is a wrapped jQuery or Zepto element. */
        isWrapped: function (variable) {
            return variable && (variable.jquery || (window.Zepto && window.Zepto.zepto.isZ(variable)));
        },

        isSVG: function (variable) {
            return window.SVGElement && (variable instanceof SVGElement);
        }
    };

    /*****************
     Dependencies
     *****************/

    /* Local to our Velocity scope, assign $ to our jQuery shim if jQuery itself isn't loaded.
     (The shim is a port of the jQuery utility functions that Velocity uses.) */
    /* Note: We can't default to Zepto since the shimless version of Velocity does not work with Zepto,
     which is missing several utility functions that Velocity requires. */
    var $ = window.jQuery || (global.Velocity && global.Velocity.Utilities);

    if (!$) {
        throw new Error("Velocity: Either jQuery or Velocity's jQuery shim must first be loaded.")
        /* We allow the global Velocity variable to pre-exist so long as we were responsible for its creation
         (via the jQuery shim, which uniquely assigns a Utilities property to the Velocity object). */
    } else if (global.Velocity !== undefined && !global.Velocity.Utilities) {
        throw new Error("Velocity: Namespace is occupied.");
        /* Nothing prevents Velocity from working on IE6+7, but it is not worth the time to test on them.
         Revert to jQuery's $.animate(), and lose Velocity's extra features. */
    } else if (IE <= 7) {
        if (!window.jQuery) {
            throw new Error("Velocity: For IE<=7, Velocity falls back to jQuery, which must first be loaded.");
        } else {
            window.jQuery.fn.velocity = window.jQuery.fn.animate;

            /* Now that $.fn.velocity is aliased, abort this Velocity declaration. */
            return;
        }
        /* IE8 doesn't work with the jQuery shim; it requires jQuery proper. */
    } else if (IE === 8 && !window.jQuery) {
        throw new Error("Velocity: For IE8, Velocity requires jQuery to be loaded. (Velocity's jQuery shim does not work with IE8.)");
    }

    /* Shorthand alias for jQuery's $.data() utility. */
    function Data (element) {
        /* Hardcode a reference to the plugin name. */
        var response = $.data(element, NAME);

        /* jQuery <=1.4.2 returns null instead of undefined when no match is found. We normalize this behavior. */
        return response === null ? undefined : response;
    };

    /*************
     State
     *************/

    /* Velocity registers itself onto a global container (window.jQuery || window.Zepto || window) so that that
     certain features are accessible beyond just a per-element scope. This master object contains an .animate() method,
     which is later assigned to $.fn (if jQuery or Zepto are present). Accordingly, Velocity can both act on wrapped
     DOM elements and stand alone for targeting raw DOM elements. */
    /* Note: The global object also doubles as a publicly-accessible data store for the purposes of unit testing. */
    /* Note: Alias the lowercase and uppercase variants of "velocity" to minimize user confusion due to the lowercase nature of the $.fn extension. */
    var Velocity = global.Velocity = global.velocity = {
        /* Container for page-wide Velocity state data. */
        State: {
            /* Detect mobile devices to determine if mobileHA should be turned on. */
            isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            /* The mobileHA option's behavior changes on older Android devices (Gingerbread, versions 2.3.3-2.3.7). */
            isAndroid: /Android/i.test(navigator.userAgent),
            isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
            isChrome: window.chrome,
            isFirefox: /Firefox/i.test(navigator.userAgent),
            /* Create a cached element for re-use when checking for CSS property prefixes. */
            prefixElement: document.createElement("div"),
            /* Cache every prefix match to avoid repeating lookups. */
            prefixMatches: {},
            /* Cache the anchor used for animating window scrolling. */
            scrollAnchor: null,
            /* Cache the property names associated with the scroll anchor. */
            scrollPropertyLeft: null,
            scrollPropertyTop: null,
            /* Keep track of whether our RAF tick is running. */
            isTicking: false,
            /* Container for every in-progress call to Velocity. */
            calls: []
        },
        /* Velocity's custom CSS stack. Made global for unit testing. */
        CSS: { /* Defined below. */ },
        /* Defined by Velocity's optional jQuery shim. */
        Utilities: window.jQuery,
        /* Container for the user's custom animation sequences that are referenced by name in place of a properties map object. */
        Sequences: {
            /* Manually registered by the user. Learn more: VelocityJS.org/#sequences */
        },
        Easings: {
            /* Defined below. */
        },
        /* Attempt to use ES6 Promises by default. Users can override this with a third-party promises library. */
        Promise: window.Promise,
        /* Page-wide option defaults, which can be overriden by the user. */
        defaults: {
            queue: "",
            duration: DEFAULT_DURATION,
            easing: DEFAULT_EASING,
            begin: null,
            complete: null,
            progress: null,
            display: null,
            loop: false,
            delay: false,
            mobileHA: true,
            /* Set to false to prevent property values from being cached between consecutive Velocity-initiated chain calls. */
            _cacheValues: true
        },
        /* Velocity's core animation method, subsequently aliased to $.fn. */
        animate: function () { /* Defined below. */ },
        /* Set to true to force a duration of 1ms for all animations so that UI testing can be performed without waiting on animations to complete. */
        mock: false,
        version: { major: 0, minor: 9, patch: 0 },
        /* Set to 1 or 2 (most verbose) to output debug info to console. */
        debug: false
    };

    /* Retrieve the appropriate scroll anchor and property name for the browser: https://developer.mozilla.org/en-US/docs/Web/API/Window.scrollY */
    if (window.pageYOffset !== undefined) {
        Velocity.State.scrollAnchor = window;
        Velocity.State.scrollPropertyLeft = "pageXOffset";
        Velocity.State.scrollPropertyTop = "pageYOffset";
    } else {
        Velocity.State.scrollAnchor = document.documentElement || document.body.parentNode || document.body;
        Velocity.State.scrollPropertyLeft = "scrollLeft";
        Velocity.State.scrollPropertyTop = "scrollTop";
    }

    /**************
     Timing
     **************/

    /* Inactive browser tabs pause rAF, which results in all active animations immediately sprinting to their completion states when the tab refocuses.
     To get around this, we dynamically switch rAF to setTimeout (which the browser *doesn't* pause) when the tab loses focus. We skip this for mobile
     devices to avoid wasting battery power on inactive tabs. */
    /* Note: Tab focus detection doesn't work on older versions of IE, but that's okay since they don't support rAF to begin with. */
    if (!Velocity.State.isMobile && document.hidden !== undefined) {
        document.addEventListener("visibilitychange", function() {
            /* Reassign the rAF function (which the global tick() function uses) based on the tab's focus state. */
            if (document.hidden) {
                rAF = function(callback) {
                    /* The tick function needs a truthy first argument to pass its internal timestamp check. */
                    return setTimeout(function() { callback(true) }, 16);
                };

                /* The rAF loop has been paused by the browser, so we manually restart the tick. */
                tick();
            } else {
                rAF = window.requestAnimationFrame || rAFPollyfill;
            }
        });
    }

    /**************
     Easing
     **************/

    /* Step easing generator. */
    function generateStep (steps) {
        return function (p) {
            return Math.round(p * steps) * (1 / steps);
        };
    }

    /* Bezier curve function generator. Copyright Gaetan Renaudeau. MIT License: http://en.wikipedia.org/wiki/MIT_License */
    var generateBezier = (function () {
        function A (aA1, aA2) {
            return 1.0 - 3.0 * aA2 + 3.0 * aA1;
        }

        function B (aA1, aA2) {
            return 3.0 * aA2 - 6.0 * aA1;
        }
        function C (aA1) {
            return 3.0 * aA1;
        }

        function calcBezier (aT, aA1, aA2) {
            return ((A(aA1, aA2)*aT + B(aA1, aA2))*aT + C(aA1))*aT;
        }

        function getSlope (aT, aA1, aA2) {
            return 3.0 * A(aA1, aA2)*aT*aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
        }

        return function (mX1, mY1, mX2, mY2) {
            /* Must contain four arguments. */
            if (arguments.length !== 4) {
                return false;
            }

            /* Arguments must be numbers. */
            for (var i = 0; i < 4; ++i) {
                if (typeof arguments[i] !== "number" || isNaN(arguments[i]) || !isFinite(arguments[i])) {
                    return false;
                }
            }

            /* X values must be in the [0, 1] range. */
            mX1 = Math.min(mX1, 1);
            mX2 = Math.min(mX2, 1);
            mX1 = Math.max(mX1, 0);
            mX2 = Math.max(mX2, 0);

            function getTForX (aX) {
                var aGuessT = aX;

                for (var i = 0; i < 8; ++i) {
                    var currentSlope = getSlope(aGuessT, mX1, mX2);

                    if (currentSlope === 0.0) {
                        return aGuessT;
                    }

                    var currentX = calcBezier(aGuessT, mX1, mX2) - aX;

                    aGuessT -= currentX / currentSlope;
                }

                return aGuessT;
            }

            return function (aX) {
                if (mX1 === mY1 && mX2 === mY2) {
                    return aX;
                } else {
                    return calcBezier(getTForX(aX), mY1, mY2);
                }
            };
        };
    }());

    /* Runge-Kutta spring physics function generator. Adapted from Framer.js, copyright Koen Bok. MIT License: http://en.wikipedia.org/wiki/MIT_License */
    /* Given a tension, friction, and duration, a simulation at 60FPS will first run without a defined duration in order to calculate the full path. A second pass
     then adjusts the time dela -- using the relation between actual time and duration -- to calculate the path for the duration-constrained animation. */
    var generateSpringRK4 = (function () {

        function springAccelerationForState (state) {
            return (-state.tension * state.x) - (state.friction * state.v);
        }

        function springEvaluateStateWithDerivative (initialState, dt, derivative) {
            var state = {
                x: initialState.x + derivative.dx * dt,
                v: initialState.v + derivative.dv * dt,
                tension: initialState.tension,
                friction: initialState.friction
            };

            return { dx: state.v, dv: springAccelerationForState(state) };
        }

        function springIntegrateState (state, dt) {
            var a = {
                    dx: state.v,
                    dv: springAccelerationForState(state)
                },
                b = springEvaluateStateWithDerivative(state, dt * 0.5, a),
                c = springEvaluateStateWithDerivative(state, dt * 0.5, b),
                d = springEvaluateStateWithDerivative(state, dt, c),
                dxdt = 1.0 / 6.0 * (a.dx + 2.0 * (b.dx + c.dx) + d.dx),
                dvdt = 1.0 / 6.0 * (a.dv + 2.0 * (b.dv + c.dv) + d.dv);

            state.x = state.x + dxdt * dt;
            state.v = state.v + dvdt * dt;

            return state;
        }

        return function springRK4Factory (tension, friction, duration) {

            var initState = {
                    x: -1,
                    v: 0,
                    tension: null,
                    friction: null
                },
                path = [0],
                time_lapsed = 0,
                tolerance = 1 / 10000,
                DT = 16 / 1000,
                have_duration, dt, last_state;

            tension = parseFloat(tension) || 500;
            friction = parseFloat(friction) || 20;
            duration = duration || null;

            initState.tension = tension;
            initState.friction = friction;

            have_duration = duration !== null;

            /* Calculate the actual time it takes for this animation to complete with the provided conditions. */
            if (have_duration) {
                /* Run the simulation without a duration. */
                time_lapsed = springRK4Factory(tension, friction);
                /* Compute the adjusted time delta. */
                dt = time_lapsed / duration * DT;
            } else {
                dt = DT;
            }

            while (true) {
                /* Next/step function .*/
                last_state = springIntegrateState(last_state || initState, dt);
                /* Store the position. */
                path.push(1 + last_state.x);
                time_lapsed += 16;
                /* If the change threshold is reached, break. */
                if (!(Math.abs(last_state.x) > tolerance && Math.abs(last_state.v) > tolerance)) {
                    break;
                }
            }

            /* If duration is not defined, return the actual time required for completing this animation. Otherwise, return a closure that holds the
             computed path and returns a snapshot of the position according to a given percentComplete. */
            return !have_duration ? time_lapsed : function(percentComplete) { return path[ (percentComplete * (path.length - 1)) | 0 ]; };
        };
    }());

    /* Velocity embeds the named easings from jQuery, jQuery UI, and CSS3 in order to save users from having to include additional libraries on their page. */
    (function () {
        /* jQuery's default named easing types. */
        Velocity.Easings["linear"] = function(p) {
            return p;
        };

        Velocity.Easings["swing"] = function(p) {
            return 0.5 - Math.cos(p * Math.PI) / 2;
        };

        /* Bonus "spring" easing, which is a less exaggerated version of easeInOutElastic. */
        Velocity.Easings["spring"] = function(p) {
            return 1 - (Math.cos(p * 4.5 * Math.PI) * Math.exp(-p * 6));
        };

        /* CSS3's named easing types. */
        Velocity.Easings["ease"] = generateBezier(0.25, 0.1, 0.25, 1.0);
        Velocity.Easings["ease-in"] = generateBezier(0.42, 0.0, 1.00, 1.0);
        Velocity.Easings["ease-out"] = generateBezier(0.00, 0.0, 0.58, 1.0);
        Velocity.Easings["ease-in-out"] = generateBezier(0.42, 0.0, 0.58, 1.0);

        /* jQuery UI's Robert Penner easing equations. Copyright The jQuery Foundation. MIT License: https://jquery.org/license */
        var baseEasings = {};

        $.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(i, name) {
            baseEasings[name] = function(p) {
                return Math.pow(p, i + 2);
            };
        });

        $.extend(baseEasings, {
            Sine: function (p) {
                return 1 - Math.cos(p * Math.PI / 2);
            },

            Circ: function (p) {
                return 1 - Math.sqrt(1 - p * p);
            },

            Elastic: function(p) {
                return p === 0 || p === 1 ? p :
                    -Math.pow(2, 8 * (p - 1)) * Math.sin(((p - 1) * 80 - 7.5) * Math.PI / 15);
            },

            Back: function(p) {
                return p * p * (3 * p - 2);
            },

            Bounce: function (p) {
                var pow2,
                    bounce = 4;

                while (p < ((pow2 = Math.pow(2, --bounce)) - 1) / 11) {}
                return 1 / Math.pow(4, 3 - bounce) - 7.5625 * Math.pow((pow2 * 3 - 2) / 22 - p, 2);
            }
        });

        /* jQuery's easing generator for the object above. */
        $.each(baseEasings, function(name, easeIn) {
            Velocity.Easings["easeIn" + name] = easeIn;
            Velocity.Easings["easeOut" + name] = function(p) {
                return 1 - easeIn(1 - p);
            };
            Velocity.Easings["easeInOut" + name] = function(p) {
                return p < 0.5 ?
                    easeIn(p * 2) / 2 :
                    1 - easeIn(p * -2 + 2) / 2;
            };
        });
    })();

    /* Determine the appropriate easing type given an easing input. */
    function getEasing(value, duration) {
        var easing = value;

        /* The easing option can either be a string that references a pre-registered easing,
         or it can be a two-/four-item array of integers to be converted into a bezier/spring function. */
        if (Type.isString(value)) {
            /* Ensure that the easing has been assigned to jQuery's Velocity.Easings object. */
            if (!Velocity.Easings[value]) {
                easing = false;
            }
        } else if (Type.isArray(value) && value.length === 1) {
            easing = generateStep.apply(null, value);
        } else if (Type.isArray(value) && value.length === 2) {
            /* springRK4 must be passed the animation's duration. */
            /* Note: If the springRK4 array contains non-numbers, generateSpringRK4() returns an easing
             function generated with default tension and friction values. */
            easing = generateSpringRK4.apply(null, value.concat([ duration ]));
        } else if (Type.isArray(value) && value.length === 4) {
            /* Note: If the bezier array contains non-numbers, generateBezier() returns false. */
            easing = generateBezier.apply(null, value);
        } else {
            easing = false;
        }

        /* Revert to the Velocity-wide default easing type, or fall back to "swing" (which is also jQuery's default)
         if the Velocity-wide default has been incorrectly modified. */
        if (easing === false) {
            if (Velocity.Easings[Velocity.defaults.easing]) {
                easing = Velocity.defaults.easing;
            } else {
                easing = DEFAULT_EASING;
            }
        }

        return easing;
    }

    /*****************
     CSS Stack
     *****************/

    /* The CSS object is a highly condensed and performant CSS stack that fully replaces jQuery's.
     It handles the validation, getting, and setting of both standard CSS properties and CSS property hooks. */
    /* Note: A "CSS" shorthand is aliased so that our code is easier to read. */
    var CSS = Velocity.CSS = {

        /*************
         RegEx
         *************/

        RegEx: {
            /* Unwrap a property value's surrounding text, e.g. "rgba(4, 3, 2, 1)" ==> "4, 3, 2, 1" and "rect(4px 3px 2px 1px)" ==> "4px 3px 2px 1px". */
            isHex: /^#([A-f\d]{3}){1,2}$/i,
            valueUnwrap: /^[A-z]+\((.*)\)$/i,
            wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
            /* Split a multi-value property into an array of subvalues, e.g. "rgba(4, 3, 2, 1) 4px 3px 2px 1px" ==> [ "rgba(4, 3, 2, 1)", "4px", "3px", "2px", "1px" ]. */
            valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/ig
        },

        /************
         Lists
         ************/

        Lists: {
            colors: [ "fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor" ],
            transformsBase: [ "translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ" ],
            transforms3D: [ "transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY" ]
        },

        /************
         Hooks
         ************/

        /* Hooks allow a subproperty (e.g. "boxShadowBlur") of a compound-value CSS property
         (e.g. "boxShadow: X Y Blur Spread Color") to be animated as if it were a discrete property. */
        /* Note: Beyond enabling fine-grained property animation, hooking is necessary since Velocity only
         tweens properties with single numeric values; unlike CSS transitions, Velocity does not interpolate compound-values. */
        Hooks: {
            /********************
             Registration
             ********************/

            /* Templates are a concise way of indicating which subproperties must be individually registered for each compound-value CSS property. */
            /* Each template consists of the compound-value's base name, its constituent subproperty names, and those subproperties' default values. */
            templates: {
                "textShadow": [ "Color X Y Blur", "black 0px 0px 0px" ],
                /* Todo: Add support for inset boxShadows. (webkit places it last whereas IE places it first.) */
                "boxShadow": [ "Color X Y Blur Spread", "black 0px 0px 0px 0px" ],
                "clip": [ "Top Right Bottom Left", "0px 0px 0px 0px" ],
                "backgroundPosition": [ "X Y", "0% 0%" ],
                "transformOrigin": [ "X Y Z", "50% 50% 0px" ],
                "perspectiveOrigin": [ "X Y", "50% 50%" ]
            },

            /* A "registered" hook is one that has been converted from its template form into a live,
             tweenable property. It contains data to associate it with its root property. */
            registered: {
                /* Note: A registered hook looks like this ==> textShadowBlur: [ "textShadow", 3 ],
                 which consists of the subproperty's name, the associated root property's name,
                 and the subproperty's position in the root's value. */
            },
            /* Convert the templates into individual hooks then append them to the registered object above. */
            register: function () {
                /* Color hooks registration. */
                /* Note: Colors are defaulted to white -- as opposed to black -- since colors that are
                 currently set to "transparent" default to their respective template below when color-animated,
                 and white is typically a closer match to transparent than black is. */
                for (var i = 0; i < CSS.Lists.colors.length; i++) {
                    CSS.Hooks.templates[CSS.Lists.colors[i]] = [ "Red Green Blue Alpha", "255 255 255 1" ];
                }

                var rootProperty,
                    hookTemplate,
                    hookNames;

                /* In IE, color values inside compound-value properties are positioned at the end the value instead of at the beginning.
                 Thus, we re-arrange the templates accordingly. */
                if (IE) {
                    for (rootProperty in CSS.Hooks.templates) {
                        hookTemplate = CSS.Hooks.templates[rootProperty];
                        hookNames = hookTemplate[0].split(" ");

                        var defaultValues = hookTemplate[1].match(CSS.RegEx.valueSplit);

                        if (hookNames[0] === "Color") {
                            /* Reposition both the hook's name and its default value to the end of their respective strings. */
                            hookNames.push(hookNames.shift());
                            defaultValues.push(defaultValues.shift());

                            /* Replace the existing template for the hook's root property. */
                            CSS.Hooks.templates[rootProperty] = [ hookNames.join(" "), defaultValues.join(" ") ];
                        }
                    }
                }

                /* Hook registration. */
                for (rootProperty in CSS.Hooks.templates) {
                    hookTemplate = CSS.Hooks.templates[rootProperty];
                    hookNames = hookTemplate[0].split(" ");

                    for (var i in hookNames) {
                        var fullHookName = rootProperty + hookNames[i],
                            hookPosition = i;

                        /* For each hook, register its full name (e.g. textShadowBlur) with its root property (e.g. textShadow)
                         and the hook's position in its template's default value string. */
                        CSS.Hooks.registered[fullHookName] = [ rootProperty, hookPosition ];
                    }
                }
            },

            /*****************************
             Injection and Extraction
             *****************************/

            /* Look up the root property associated with the hook (e.g. return "textShadow" for "textShadowBlur"). */
            /* Since a hook cannot be set directly (the browser won't recognize it), style updating for hooks is routed through the hook's root property. */
            getRoot: function (property) {
                var hookData = CSS.Hooks.registered[property];

                if (hookData) {
                    return hookData[0];
                } else {
                    /* If there was no hook match, return the property name untouched. */
                    return property;
                }
            },
            /* Convert any rootPropertyValue, null or otherwise, into a space-delimited list of hook values so that
             the targeted hook can be injected or extracted at its standard position. */
            cleanRootPropertyValue: function(rootProperty, rootPropertyValue) {
                /* If the rootPropertyValue is wrapped with "rgb()", "clip()", etc., remove the wrapping to normalize the value before manipulation. */
                if (CSS.RegEx.valueUnwrap.test(rootPropertyValue)) {
                    rootPropertyValue = rootPropertyValue.match(CSS.Hooks.RegEx.valueUnwrap)[1];
                }

                /* If rootPropertyValue is a CSS null-value (from which there's inherently no hook value to extract),
                 default to the root's default value as defined in CSS.Hooks.templates. */
                /* Note: CSS null-values include "none", "auto", and "transparent". They must be converted into their
                 zero-values (e.g. textShadow: "none" ==> textShadow: "0px 0px 0px black") for hook manipulation to proceed. */
                if (CSS.Values.isCSSNullValue(rootPropertyValue)) {
                    rootPropertyValue = CSS.Hooks.templates[rootProperty][1];
                }

                return rootPropertyValue;
            },
            /* Extracted the hook's value from its root property's value. This is used to get the starting value of an animating hook. */
            extractValue: function (fullHookName, rootPropertyValue) {
                var hookData = CSS.Hooks.registered[fullHookName];

                if (hookData) {
                    var hookRoot = hookData[0],
                        hookPosition = hookData[1];

                    rootPropertyValue = CSS.Hooks.cleanRootPropertyValue(hookRoot, rootPropertyValue);

                    /* Split rootPropertyValue into its constituent hook values then grab the desired hook at its standard position. */
                    return rootPropertyValue.toString().match(CSS.RegEx.valueSplit)[hookPosition];
                } else {
                    /* If the provided fullHookName isn't a registered hook, return the rootPropertyValue that was passed in. */
                    return rootPropertyValue;
                }
            },
            /* Inject the hook's value into its root property's value. This is used to piece back together the root property
             once Velocity has updated one of its individually hooked values through tweening. */
            injectValue: function (fullHookName, hookValue, rootPropertyValue) {
                var hookData = CSS.Hooks.registered[fullHookName];

                if (hookData) {
                    var hookRoot = hookData[0],
                        hookPosition = hookData[1],
                        rootPropertyValueParts,
                        rootPropertyValueUpdated;

                    rootPropertyValue = CSS.Hooks.cleanRootPropertyValue(hookRoot, rootPropertyValue);

                    /* Split rootPropertyValue into its individual hook values, replace the targeted value with hookValue,
                     then reconstruct the rootPropertyValue string. */
                    rootPropertyValueParts = rootPropertyValue.toString().match(CSS.RegEx.valueSplit);
                    rootPropertyValueParts[hookPosition] = hookValue;
                    rootPropertyValueUpdated = rootPropertyValueParts.join(" ");

                    return rootPropertyValueUpdated;
                } else {
                    /* If the provided fullHookName isn't a registered hook, return the rootPropertyValue that was passed in. */
                    return rootPropertyValue;
                }
            }
        },

        /*******************
         Normalizations
         *******************/

        /* Normalizations standardize CSS property manipulation by pollyfilling browser-specific implementations (e.g. opacity)
         and reformatting special properties (e.g. clip, rgba) to look like standard ones. */
        Normalizations: {
            /* Normalizations are passed a normalization target (either the property's name, its extracted value, or its injected value),
             the targeted element (which may need to be queried), and the targeted property value. */
            registered: {
                clip: function(type, element, propertyValue) {
                    switch (type) {
                        case "name":
                            return "clip";
                        /* Clip needs to be unwrapped and stripped of its commas during extraction. */
                        case "extract":
                            var extracted;

                            /* If Velocity also extracted this value, skip extraction. */
                            if (CSS.RegEx.wrappedValueAlreadyExtracted.test(propertyValue)) {
                                extracted = propertyValue;
                            } else {
                                /* Remove the "rect()" wrapper. */
                                extracted = propertyValue.toString().match(CSS.RegEx.valueUnwrap);

                                /* Strip off commas. */
                                extracted = extracted ? extracted[1].replace(/,(\s+)?/g, " ") : propertyValue;
                            }

                            return extracted;
                        /* Clip needs to be re-wrapped during injection. */
                        case "inject":
                            return "rect(" + propertyValue + ")";
                    }
                },

                /* <=IE8 do not support the standard opacity property. They use filter:alpha(opacity=INT) instead. */
                opacity: function (type, element, propertyValue) {
                    if (IE <= 8) {
                        switch (type) {
                            case "name":
                                return "filter";
                            case "extract":
                                /* <=IE8 return a "filter" value of "alpha(opacity=\d{1,3})".
                                 Extract the value and convert it to a decimal value to match the standard CSS opacity property's formatting. */
                                var extracted = propertyValue.toString().match(/alpha\(opacity=(.*)\)/i);

                                if (extracted) {
                                    /* Convert to decimal value. */
                                    propertyValue = extracted[1] / 100;
                                } else {
                                    /* When extracting opacity, default to 1 since a null value means opacity hasn't been set. */
                                    propertyValue = 1;
                                }

                                return propertyValue;
                            case "inject":
                                /* Opacified elements are required to have their zoom property set to a non-zero value. */
                                element.style.zoom = 1;

                                /* Setting the filter property on elements with certain font property combinations can result in a
                                 highly unappealing ultra-bolding effect. There's no way to remedy this throughout a tween, but dropping the
                                 value altogether (when opacity hits 1) at leasts ensures that the glitch is gone post-tweening. */
                                if (parseFloat(propertyValue) >= 1) {
                                    return "";
                                } else {
                                    /* As per the filter property's spec, convert the decimal value to a whole number and wrap the value. */
                                    return "alpha(opacity=" + parseInt(parseFloat(propertyValue) * 100, 10) + ")";
                                }
                        }
                        /* With all other browsers, normalization is not required; return the same values that were passed in. */
                    } else {
                        switch (type) {
                            case "name":
                                return "opacity";
                            case "extract":
                                return propertyValue;
                            case "inject":
                                return propertyValue;
                        }
                    }
                }
            },

            /*****************************
             Batched Registrations
             *****************************/

            /* Note: Batched normalizations extend the CSS.Normalizations.registered object. */
            register: function () {

                /*****************
                 Transforms
                 *****************/

                /* Transforms are the subproperties contained by the CSS "transform" property. Transforms must undergo normalization
                 so that they can be referenced in a properties map by their individual names. */
                /* Note: When transforms are "set", they are actually assigned to a per-element transformCache. When all transform
                 setting is complete complete, CSS.flushTransformCache() must be manually called to flush the values to the DOM.
                 Transform setting is batched in this way to improve performance: the transform style only needs to be updated
                 once when multiple transform subproperties are being animated simultaneously. */
                /* Note: IE9 and Android Gingerbread have support for 2D -- but not 3D -- transforms. Since animating unsupported
                 transform properties results in the browser ignoring the *entire* transform string, we prevent these 3D values
                 from being normalized for these browsers so that tweening skips these properties altogether
                 (since it will ignore them as being unsupported by the browser.) */
                if (!(IE <= 9) && !Velocity.State.isGingerbread) {
                    /* Note: Since the standalone CSS "perspective" property and the CSS transform "perspective" subproperty
                     share the same name, the latter is given a unique token within Velocity: "transformPerspective". */
                    CSS.Lists.transformsBase = CSS.Lists.transformsBase.concat(CSS.Lists.transforms3D);
                }

                for (var i = 0; i < CSS.Lists.transformsBase.length; i++) {
                    /* Wrap the dynamically generated normalization function in a new scope so that transformName's value is
                     paired with its respective function. (Otherwise, all functions would take the final for loop's transformName.) */
                    (function() {
                        var transformName = CSS.Lists.transformsBase[i];

                        CSS.Normalizations.registered[transformName] = function (type, element, propertyValue) {
                            switch (type) {
                                /* The normalized property name is the parent "transform" property -- the property that is actually set in CSS. */
                                case "name":
                                    return "transform";
                                /* Transform values are cached onto a per-element transformCache object. */
                                case "extract":
                                    /* If this transform has yet to be assigned a value, return its null value. */
                                    if (Data(element).transformCache[transformName] === undefined) {
                                        /* Scale CSS.Lists.transformsBase default to 1 whereas all other transform properties default to 0. */
                                        return /^scale/i.test(transformName) ? 1 : 0;
                                        /* When transform values are set, they are wrapped in parentheses as per the CSS spec.
                                         Thus, when extracting their values (for tween calculations), we strip off the parentheses. */
                                    } else {
                                        return Data(element).transformCache[transformName].replace(/[()]/g, "");
                                    }
                                case "inject":
                                    var invalid = false;

                                    /* If an individual transform property contains an unsupported unit type, the browser ignores the *entire* transform property.
                                     Thus, protect users from themselves by skipping setting for transform values supplied with invalid unit types. */
                                    /* Switch on the base transform type; ignore the axis by removing the last letter from the transform's name. */
                                    switch (transformName.substr(0, transformName.length - 1)) {
                                        /* Whitelist unit types for each transform. */
                                        case "translate":
                                            invalid = !/(%|px|em|rem|vw|vh|\d)$/i.test(propertyValue);
                                            break;
                                        /* Since an axis-free "scale" property is supported as well, a little hack is used here to detect it by chopping off its last letter. */
                                        case "scal":
                                        case "scale":
                                            /* Chrome on Android has a bug in which scaled elements blur if their initial scale
                                             value is below 1 (which can happen with forcefeeding). Thus, we detect a yet-unset scale property
                                             and ensure that its first value is always 1. More info: http://stackoverflow.com/questions/10417890/css3-animations-with-transform-causes-blurred-elements-on-webkit/10417962#10417962 */
                                            if (Velocity.State.isAndroid && Data(element).transformCache[transformName] === undefined && propertyValue < 1) {
                                                propertyValue = 1;
                                            }

                                            invalid = !/(\d)$/i.test(propertyValue);
                                            break;
                                        case "skew":
                                            invalid = !/(deg|\d)$/i.test(propertyValue);
                                            break;
                                        case "rotate":
                                            invalid = !/(deg|\d)$/i.test(propertyValue);
                                            break;
                                    }

                                    if (!invalid) {
                                        /* As per the CSS spec, wrap the value in parentheses. */
                                        Data(element).transformCache[transformName] = "(" + propertyValue + ")";
                                    }

                                    /* Although the value is set on the transformCache object, return the newly-updated value for the calling code to process as normal. */
                                    return Data(element).transformCache[transformName];
                            }
                        };
                    })();
                }

                /*************
                 Colors
                 *************/

                /* Since Velocity only animates a single numeric value per property, color animation is achieved by hooking the individual RGBA components of CSS color properties.
                 Accordingly, color values must be normalized (e.g. "#ff0000", "red", and "rgb(255, 0, 0)" ==> "255 0 0 1") so that their components can be injected/extracted by CSS.Hooks logic. */
                for (var i = 0; i < CSS.Lists.colors.length; i++) {
                    /* Wrap the dynamically generated normalization function in a new scope so that colorName's value is paired with its respective function.
                     (Otherwise, all functions would take the final for loop's colorName.) */
                    (function () {
                        var colorName = CSS.Lists.colors[i];

                        /* Note: In IE<=8, which support rgb but not rgba, color properties are reverted to rgb by stripping off the alpha component. */
                        CSS.Normalizations.registered[colorName] = function(type, element, propertyValue) {
                            switch (type) {
                                case "name":
                                    return colorName;
                                /* Convert all color values into the rgb format. (Old IE can return hex values and color names instead of rgb/rgba.) */
                                case "extract":
                                    var extracted;

                                    /* If the color is already in its hookable form (e.g. "255 255 255 1") due to having been previously extracted, skip extraction. */
                                    if (CSS.RegEx.wrappedValueAlreadyExtracted.test(propertyValue)) {
                                        extracted = propertyValue;
                                    } else {
                                        var converted,
                                            colorNames = {
                                                black: "rgb(0, 0, 0)",
                                                blue: "rgb(0, 0, 255)",
                                                gray: "rgb(128, 128, 128)",
                                                green: "rgb(0, 128, 0)",
                                                red: "rgb(255, 0, 0)",
                                                white: "rgb(255, 255, 255)"
                                            };

                                        /* Convert color names to rgb. */
                                        if (/^[A-z]+$/i.test(propertyValue)) {
                                            if (colorNames[propertyValue] !== undefined) {
                                                converted = colorNames[propertyValue]
                                            } else {
                                                /* If an unmatched color name is provided, default to black. */
                                                converted = colorNames.black;
                                            }
                                            /* Convert hex values to rgb. */
                                        } else if (CSS.RegEx.isHex.test(propertyValue)) {
                                            converted = "rgb(" + CSS.Values.hexToRgb(propertyValue).join(" ") + ")";
                                            /* If the provided color doesn't match any of the accepted color formats, default to black. */
                                        } else if (!(/^rgba?\(/i.test(propertyValue))) {
                                            converted = colorNames.black;
                                        }

                                        /* Remove the surrounding "rgb/rgba()" string then replace commas with spaces and strip
                                         repeated spaces (in case the value included spaces to begin with). */
                                        extracted = (converted || propertyValue).toString().match(CSS.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ");
                                    }

                                    /* So long as this isn't <=IE8, add a fourth (alpha) component if it's missing and default it to 1 (visible). */
                                    if (!(IE <= 8) && extracted.split(" ").length === 3) {
                                        extracted += " 1";
                                    }

                                    return extracted;
                                case "inject":
                                    /* If this is IE<=8 and an alpha component exists, strip it off. */
                                    if (IE <= 8) {
                                        if (propertyValue.split(" ").length === 4) {
                                            propertyValue = propertyValue.split(/\s+/).slice(0, 3).join(" ");
                                        }
                                        /* Otherwise, add a fourth (alpha) component if it's missing and default it to 1 (visible). */
                                    } else if (propertyValue.split(" ").length === 3) {
                                        propertyValue += " 1";
                                    }

                                    /* Re-insert the browser-appropriate wrapper("rgb/rgba()"), insert commas, and strip off decimal units
                                     on all values but the fourth (R, G, and B only accept whole numbers). */
                                    return (IE <= 8 ? "rgb" : "rgba") + "(" + propertyValue.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")";
                            }
                        };
                    })();
                }
            }
        },

        /************************
         CSS Property Names
         ************************/

        Names: {
            /* Camelcase a property name into its JavaScript notation (e.g. "background-color" ==> "backgroundColor").
             Camelcasing is used to normalize property names between and across calls. */
            camelCase: function (property) {
                return property.replace(/-(\w)/g, function (match, subMatch) {
                    return subMatch.toUpperCase();
                });
            },

            /* For SVG elements, some properties (namely, dimensional ones) are GET/SET via the element's HTML attributes (instead of via CSS styles). */
            SVGAttribute: function (property) {
                var SVGAttributes = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";

                /* Certain browsers require an SVG transform to be applied as an attribute. (Otherwise, application via CSS is preferable due to 3D support.) */
                if (IE || (Velocity.State.isAndroid && !Velocity.State.isChrome)) {
                    SVGAttributes += "|transform";
                }

                return new RegExp("^(" + SVGAttributes + ")$", "i").test(property);
            },

            /* Determine whether a property should be set with a vendor prefix. */
            /* If a prefixed version of the property exists, return it. Otherwise, return the original property name.
             If the property is not at all supported by the browser, return a false flag. */
            prefixCheck: function (property) {
                /* If this property has already been checked, return the cached value. */
                if (Velocity.State.prefixMatches[property]) {
                    return [ Velocity.State.prefixMatches[property], true ];
                } else {
                    var vendors = [ "", "Webkit", "Moz", "ms", "O" ];

                    for (var i = 0, vendorsLength = vendors.length; i < vendorsLength; i++) {
                        var propertyPrefixed;

                        if (i === 0) {
                            propertyPrefixed = property;
                        } else {
                            /* Capitalize the first letter of the property to conform to JavaScript vendor prefix notation (e.g. webkitFilter). */
                            propertyPrefixed = vendors[i] + property.replace(/^\w/, function(match) { return match.toUpperCase(); });
                        }

                        /* Check if the browser supports this property as prefixed. */
                        if (Type.isString(Velocity.State.prefixElement.style[propertyPrefixed])) {
                            /* Cache the match. */
                            Velocity.State.prefixMatches[property] = propertyPrefixed;

                            return [ propertyPrefixed, true ];
                        }
                    }

                    /* If the browser doesn't support this property in any form, include a false flag so that the caller can decide how to proceed. */
                    return [ property, false ];
                }
            }
        },

        /************************
         CSS Property Values
         ************************/

        Values: {
            /* Hex to RGB conversion. Copyright Tim Down: http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb */
            hexToRgb: function (hex) {
                var shortformRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
                    longformRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
                    rgbParts;

                hex = hex.replace(shortformRegex, function (m, r, g, b) {
                    return r + r + g + g + b + b;
                });

                rgbParts = longformRegex.exec(hex);

                return rgbParts ? [ parseInt(rgbParts[1], 16), parseInt(rgbParts[2], 16), parseInt(rgbParts[3], 16) ] : [ 0, 0, 0 ];
            },
            isCSSNullValue: function (value) {
                /* The browser defaults CSS values that have not been set to either 0 or one of several possible null-value strings.
                 Thus, we check for both falsiness and these special strings. */
                /* Null-value checking is performed to default the special strings to 0 (for the sake of tweening) or their hook
                 templates as defined as CSS.Hooks (for the sake of hook injection/extraction). */
                /* Note: Chrome returns "rgba(0, 0, 0, 0)" for an undefined color whereas IE returns "transparent". */
                return (value == 0 || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(value));
            },
            /* Retrieve a property's default unit type. Used for assigning a unit type when one is not supplied by the user. */
            getUnitType: function (property) {
                if (/^(rotate|skew)/i.test(property)) {
                    return "deg";
                } else if (/(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(property)) {
                    /* The above properties are unitless. */
                    return "";
                } else {
                    /* Default to px for all other properties. */
                    return "px";
                }
            },
            /* HTML elements default to an associated display type when they're not set to display:none. */
            /* Note: This function is used for correctly setting the non-"none" display value in certain Velocity sequences, such as fadeIn/Out. */
            getDisplayType: function (element) {
                var tagName = element.tagName.toString().toLowerCase();

                if (/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(tagName)) {
                    return "inline";
                } else if (/^(li)$/i.test(tagName)) {
                    return "list-item";
                } else if (/^(tr)$/i.test(tagName)) {
                    return "table-row";
                    /* Default to "block" when no match is found. */
                } else {
                    return "block";
                }
            },
            /* The class add/remove functions are used to temporarily apply a "velocity-animating" class to elements while they're animating. */
            addClass: function (element, className) {
                if (element.classList) {
                    element.classList.add(className);
                } else {
                    element.className += (element.className.length ? " " : "") + className;
                }
            },
            removeClass: function (element, className) {
                if (element.classList) {
                    element.classList.remove(className);
                } else {
                    element.className = element.className.toString().replace(new RegExp("(^|\\s)" + className.split(" ").join("|") + "(\\s|$)", "gi"), " ");
                }
            }
        },

        /****************************
         Style Getting & Setting
         ****************************/

        /* The singular getPropertyValue, which routes the logic for all normalizations, hooks, and standard CSS properties. */
        getPropertyValue: function (element, property, rootPropertyValue, forceStyleLookup) {
            /* Get an element's computed property value. */
            /* Note: Retrieving the value of a CSS property cannot simply be performed by checking an element's
             style attribute (which only reflects user-defined values). Instead, the browser must be queried for a property's
             *computed* value. You can read more about getComputedStyle here: https://developer.mozilla.org/en/docs/Web/API/window.getComputedStyle */
            function computePropertyValue (element, property) {
                /* When box-sizing isn't set to border-box, height and width style values are incorrectly computed when an
                 element's scrollbars are visible (which expands the element's dimensions). Thus, we defer to the more accurate
                 offsetHeight/Width property, which includes the total dimensions for interior, border, padding, and scrollbar.
                 We subtract border and padding to get the sum of interior + scrollbar. */

                var computedValue = 0;

                /* IE<=8 doesn't support window.getComputedStyle, thus we defer to jQuery, which has an extensive array
                 of hacks to accurately retrieve IE8 property values. Re-implementing that logic here is not worth bloating the
                 codebase for a dying browser. The performance repercussions of using jQuery here are minimal since
                 Velocity is optimized to rarely (and sometimes never) query the DOM. Further, the $.css() codepath isn't that slow. */
                if (IE <= 8) {
                    computedValue = $.css(element, property); /* GET */
                    /* All other browsers support getComputedStyle. The returned live object reference is cached onto its
                     associated element so that it does not need to be refetched upon every GET. */
                } else {
                    /* Browsers do not return height and width values for elements that are set to display:"none". Thus, we temporarily
                     toggle display to the element type's default value. */
                    var toggleDisplay = false;

                    if (/^(width|height)$/.test(property) && CSS.getPropertyValue(element, "display") === 0) {
                        toggleDisplay = true;
                        CSS.setPropertyValue(element, "display", CSS.Values.getDisplayType(element));
                    }

                    function revertDisplay () {
                        if (toggleDisplay) {
                            CSS.setPropertyValue(element, "display", "none");
                        }
                    }

                    if (!forceStyleLookup) {
                        if (property === "height" && CSS.getPropertyValue(element, "boxSizing").toString().toLowerCase() !== "border-box") {
                            var contentBoxHeight = element.offsetHeight - (parseFloat(CSS.getPropertyValue(element, "borderTopWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "borderBottomWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingTop")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingBottom")) || 0);
                            revertDisplay();

                            return contentBoxHeight;
                        } else if (property === "width" && CSS.getPropertyValue(element, "boxSizing").toString().toLowerCase() !== "border-box") {
                            var contentBoxWidth = element.offsetWidth - (parseFloat(CSS.getPropertyValue(element, "borderLeftWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "borderRightWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingLeft")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingRight")) || 0);
                            revertDisplay();

                            return contentBoxWidth;
                        }
                    }

                    var computedStyle;

                    /* For elements that Velocity hasn't been called on directly (e.g. when Velocity queries the DOM on behalf
                     of a parent of an element its animating), perform a direct getComputedStyle lookup since the object isn't cached. */
                    if (Data(element) === undefined) {
                        computedStyle = window.getComputedStyle(element, null); /* GET */
                        /* If the computedStyle object has yet to be cached, do so now. */
                    } else if (!Data(element).computedStyle) {
                        computedStyle = Data(element).computedStyle = window.getComputedStyle(element, null); /* GET */
                        /* If computedStyle is cached, use it. */
                    } else {
                        computedStyle = Data(element).computedStyle;
                    }

                    /* IE and Firefox do not return a value for the generic borderColor -- they only return individual values for each border side's color.
                     As a polyfill for querying individual border side colors, just return the top border's color. */
                    if ((IE || Velocity.State.isFirefox) && property === "borderColor") {
                        property = "borderTopColor";
                    }

                    /* IE9 has a bug in which the "filter" property must be accessed from computedStyle using the getPropertyValue method
                     instead of a direct property lookup. The getPropertyValue method is slower than a direct lookup, which is why we avoid it by default. */
                    if (IE === 9 && property === "filter") {
                        computedValue = computedStyle.getPropertyValue(property); /* GET */
                    } else {
                        computedValue = computedStyle[property];
                    }

                    /* Fall back to the property's style value (if defined) when computedValue returns nothing,
                     which can happen when the element hasn't been painted. */
                    if (computedValue === "" || computedValue === null) {
                        computedValue = element.style[property];
                    }

                    revertDisplay();
                }

                /* For top, right, bottom, and left (TRBL) values that are set to "auto" on elements of "fixed" or "absolute" position,
                 defer to jQuery for converting "auto" to a numeric value. (For elements with a "static" or "relative" position, "auto" has the same
                 effect as being set to 0, so no conversion is necessary.) */
                /* An example of why numeric conversion is necessary: When an element with "position:absolute" has an untouched "left"
                 property, which reverts to "auto", left's value is 0 relative to its parent element, but is often non-zero relative
                 to its *containing* (not parent) element, which is the nearest "position:relative" ancestor or the viewport (and always the viewport in the case of "position:fixed"). */
                if (computedValue === "auto" && /^(top|right|bottom|left)$/i.test(property)) {
                    var position = computePropertyValue(element, "position"); /* GET */

                    /* For absolute positioning, jQuery's $.position() only returns values for top and left;
                     right and bottom will have their "auto" value reverted to 0. */
                    /* Note: A jQuery object must be created here since jQuery doesn't have a low-level alias for $.position().
                     Not a big deal since we're currently in a GET batch anyway. */
                    if (position === "fixed" || (position === "absolute" && /top|left/i.test(property))) {
                        /* Note: jQuery strips the pixel unit from its returned values; we re-add it here to conform with computePropertyValue's behavior. */
                        computedValue = $(element).position()[property] + "px"; /* GET */
                    }
                }

                return computedValue;
            }

            var propertyValue;

            /* If this is a hooked property (e.g. "clipLeft" instead of the root property of "clip"),
             extract the hook's value from a normalized rootPropertyValue using CSS.Hooks.extractValue(). */
            if (CSS.Hooks.registered[property]) {
                var hook = property,
                    hookRoot = CSS.Hooks.getRoot(hook);

                /* If a cached rootPropertyValue wasn't passed in (which Velocity always attempts to do in order to avoid requerying the DOM),
                 query the DOM for the root property's value. */
                if (rootPropertyValue === undefined) {
                    /* Since the browser is now being directly queried, use the official post-prefixing property name for this lookup. */
                    rootPropertyValue = CSS.getPropertyValue(element, CSS.Names.prefixCheck(hookRoot)[0]); /* GET */
                }

                /* If this root has a normalization registered, peform the associated normalization extraction. */
                if (CSS.Normalizations.registered[hookRoot]) {
                    rootPropertyValue = CSS.Normalizations.registered[hookRoot]("extract", element, rootPropertyValue);
                }

                /* Extract the hook's value. */
                propertyValue = CSS.Hooks.extractValue(hook, rootPropertyValue);

                /* If this is a normalized property (e.g. "opacity" becomes "filter" in <=IE8) or "translateX" becomes "transform"),
                 normalize the property's name and value, and handle the special case of transforms. */
                /* Note: Normalizing a property is mutually exclusive from hooking a property since hook-extracted values are strictly
                 numerical and therefore do not require normalization extraction. */
            } else if (CSS.Normalizations.registered[property]) {
                var normalizedPropertyName,
                    normalizedPropertyValue;

                normalizedPropertyName = CSS.Normalizations.registered[property]("name", element);

                /* Transform values are calculated via normalization extraction (see below), which checks against the element's transformCache.
                 At no point do transform GETs ever actually query the DOM; initial stylesheet values are never processed.
                 This is because parsing 3D transform matrices is not always accurate and would bloat our codebase;
                 thus, normalization extraction defaults initial transform values to their zero-values (e.g. 1 for scaleX and 0 for translateX). */
                if (normalizedPropertyName !== "transform") {
                    normalizedPropertyValue = computePropertyValue(element, CSS.Names.prefixCheck(normalizedPropertyName)[0]); /* GET */

                    /* If the value is a CSS null-value and this property has a hook template, use that zero-value template so that hooks can be extracted from it. */
                    if (CSS.Values.isCSSNullValue(normalizedPropertyValue) && CSS.Hooks.templates[property]) {
                        normalizedPropertyValue = CSS.Hooks.templates[property][1];
                    }
                }

                propertyValue = CSS.Normalizations.registered[property]("extract", element, normalizedPropertyValue);
            }

            /* If a (numeric) value wasn't produced via hook extraction or normalization, query the DOM. */
            if (!/^[\d-]/.test(propertyValue)) {
                /* For SVG elements, dimensional properties (which SVGAttribute() detects) are tweened via
                 their HTML attribute values instead of their CSS style values. */
                if (Data(element) && Data(element).isSVG && CSS.Names.SVGAttribute(property)) {
                    /* Since the height/width attribute values must be set manually, they don't reflect computed values.
                     Thus, we use use getBBox() to ensure we always get values for elements with undefined height/width attributes. */
                    if (/^(height|width)$/i.test(property)) {
                        propertyValue = element.getBBox()[property];
                        /* Otherwise, access the attribute value directly. */
                    } else {
                        propertyValue = element.getAttribute(property);
                    }
                } else {
                    propertyValue = computePropertyValue(element, CSS.Names.prefixCheck(property)[0]); /* GET */
                }
            }

            /* Since property lookups are for animation purposes (which entails computing the numeric delta between start and end values),
             convert CSS null-values to an integer of value 0. */
            if (CSS.Values.isCSSNullValue(propertyValue)) {
                propertyValue = 0;
            }

            if (Velocity.debug >= 2) console.log("Get " + property + ": " + propertyValue);

            return propertyValue;
        },

        /* The singular setPropertyValue, which routes the logic for all normalizations, hooks, and standard CSS properties. */
        setPropertyValue: function(element, property, propertyValue, rootPropertyValue, scrollData) {
            var propertyName = property;

            /* In order to be subjected to call options and element queueing, scroll animation is routed through Velocity as if it were a standard CSS property. */
            if (property === "scroll") {
                /* If a container option is present, scroll the container instead of the browser window. */
                if (scrollData.container) {
                    scrollData.container["scroll" + scrollData.direction] = propertyValue;
                    /* Otherwise, Velocity defaults to scrolling the browser window. */
                } else {
                    if (scrollData.direction === "Left") {
                        window.scrollTo(propertyValue, scrollData.alternateValue);
                    } else {
                        window.scrollTo(scrollData.alternateValue, propertyValue);
                    }
                }
            } else {
                /* Transforms (translateX, rotateZ, etc.) are applied to a per-element transformCache object, which is manually flushed via flushTransformCache().
                 Thus, for now, we merely cache transforms being SET. */
                if (CSS.Normalizations.registered[property] && CSS.Normalizations.registered[property]("name", element) === "transform") {
                    /* Perform a normalization injection. */
                    /* Note: The normalization logic handles the transformCache updating. */
                    CSS.Normalizations.registered[property]("inject", element, propertyValue);

                    propertyName = "transform";
                    propertyValue = Data(element).transformCache[property];
                } else {
                    /* Inject hooks. */
                    if (CSS.Hooks.registered[property]) {
                        var hookName = property,
                            hookRoot = CSS.Hooks.getRoot(property);

                        /* If a cached rootPropertyValue was not provided, query the DOM for the hookRoot's current value. */
                        rootPropertyValue = rootPropertyValue || CSS.getPropertyValue(element, hookRoot); /* GET */

                        propertyValue = CSS.Hooks.injectValue(hookName, propertyValue, rootPropertyValue);
                        property = hookRoot;
                    }

                    /* Normalize names and values. */
                    if (CSS.Normalizations.registered[property]) {
                        propertyValue = CSS.Normalizations.registered[property]("inject", element, propertyValue);
                        property = CSS.Normalizations.registered[property]("name", element);
                    }

                    /* Assign the appropriate vendor prefix before performing an official style update. */
                    propertyName = CSS.Names.prefixCheck(property)[0];

                    /* A try/catch is used for IE<=8, which throws an error when "invalid" CSS values are set, e.g. a negative width.
                     Try/catch is avoided for other browsers since it incurs a performance overhead. */
                    if (IE <= 8) {
                        try {
                            element.style[propertyName] = propertyValue;
                        } catch (error) { if (Velocity.debug) console.log("Browser does not support [" + propertyValue + "] for [" + propertyName + "]"); }
                        /* SVG elements have their dimensional properties (width, height, x, y, cx, etc.) applied directly as attributes instead of as styles. */
                        /* Note: IE8 does not support SVG elements, so it's okay that we skip it for SVG animation. */
                    } else if (Data(element) && Data(element).isSVG && CSS.Names.SVGAttribute(property)) {
                        /* Note: For SVG attributes, vendor-prefixed property names are never used. */
                        /* Note: Not all CSS properties can be animated via attributes, but the browser won't throw an error for unsupported properties. */
                        element.setAttribute(property, propertyValue);
                    } else {
                        element.style[propertyName] = propertyValue;
                    }

                    if (Velocity.debug >= 2) console.log("Set " + property + " (" + propertyName + "): " + propertyValue);
                }
            }

            /* Return the normalized property name and value in case the caller wants to know how these values were modified before being applied to the DOM. */
            return [ propertyName, propertyValue ];
        },

        /* To increase performance by batching transform updates into a single SET, transforms are not directly applied to an element until flushTransformCache() is called. */
        /* Note: Velocity applies transform properties in the same order that they are chronogically introduced to the element's CSS styles. */
        flushTransformCache: function(element) {
            var transformString = "";

            /* Certain browsers require that SVG transforms be applied as an attribute. However, the SVG transform attribute takes a modified version of CSS's transform string
             (units are dropped and, except for skewX/Y, subproperties are merged into their master property -- e.g. scaleX and scaleY are merged into scale(X Y). */
            if ((IE || (Velocity.State.isAndroid && !Velocity.State.isChrome)) && Data(element).isSVG) {
                /* Since transform values are stored in their parentheses-wrapped form, we use a helper function to strip out their numeric values.
                 Further, SVG transform properties only take unitless (representing pixels) values, so it's okay that parseFloat() strips the unit suffixed to the float value. */
                function getTransformFloat (transformProperty) {
                    return parseFloat(CSS.getPropertyValue(element, transformProperty));
                }

                /* Create an object to organize all the transforms that we'll apply to the SVG element. To keep the logic simple,
                 we process *all* transform properties -- even those that may not be explicitly applied (since they default to their zero-values anyway). */
                var SVGTransforms = {
                    translate: [ getTransformFloat("translateX"), getTransformFloat("translateY") ],
                    skewX: [ getTransformFloat("skewX") ], skewY: [ getTransformFloat("skewY") ],
                    /* If the scale property is set (non-1), use that value for the scaleX and scaleY values
                     (this behavior mimics the result of animating all these properties at once on HTML elements). */
                    scale: getTransformFloat("scale") !== 1 ? [ getTransformFloat("scale"), getTransformFloat("scale") ] : [ getTransformFloat("scaleX"), getTransformFloat("scaleY") ],
                    /* Note: SVG's rotate transform takes three values: rotation degrees followed by the X and Y values
                     defining the rotation's origin point. We ignore the origin values (default them to 0). */
                    rotate: [ getTransformFloat("rotateZ"), 0, 0 ]
                };

                /* Iterate through the transform properties in the user-defined property map order.
                 (This mimics the behavior of non-SVG transform animation.) */
                $.each(Data(element).transformCache, function(transformName) {
                    /* Except for with skewX/Y, revert the axis-specific transform subproperties to their axis-free master
                     properties so that they match up with SVG's accepted transform properties. */
                    if (/^translate/i.test(transformName)) {
                        transformName = "translate";
                    } else if (/^scale/i.test(transformName)) {
                        transformName = "scale";
                    } else if (/^rotate/i.test(transformName)) {
                        transformName = "rotate";
                    }

                    /* Check that we haven't yet deleted the property from the SVGTransforms container. */
                    if (SVGTransforms[transformName]) {
                        /* Append the transform property in the SVG-supported transform format. As per the spec, surround the space-delimited values in parentheses. */
                        transformString += transformName + "(" + SVGTransforms[transformName].join(" ") + ")" + " ";

                        /* After processing an SVG transform property, delete it from the SVGTransforms container so we don't
                         re-insert the same master property if we encounter another one of its axis-specific properties. */
                        delete SVGTransforms[transformName];
                    }
                });
            } else {
                var transformValue,
                    perspective;

                /* Transform properties are stored as members of the transformCache object. Concatenate all the members into a string. */
                $.each(Data(element).transformCache, function(transformName) {
                    transformValue = Data(element).transformCache[transformName];

                    /* Transform's perspective subproperty must be set first in order to take effect. Store it temporarily. */
                    if (transformName === "transformPerspective") {
                        perspective = transformValue;
                        return true;
                    }

                    /* IE9 only supports one rotation type, rotateZ, which it refers to as "rotate". */
                    if (IE === 9 && transformName === "rotateZ") {
                        transformName = "rotate";
                    }

                    transformString += transformName + transformValue + " ";
                });

                /* If present, set the perspective subproperty first. */
                if (perspective) {
                    transformString = "perspective" + perspective + " " + transformString;
                }
            }

            CSS.setPropertyValue(element, "transform", transformString);
        }
    };

    /* Register hooks and normalizations. */
    CSS.Hooks.register();
    CSS.Normalizations.register();

    /**********************
     Velocity.animate
     **********************/

    Velocity.animate = function() {

        /******************
         Call Chain
         ******************/

        /* Logic for determining what to return to the call stack when exiting out of Velocity. */
        function getChain () {
            /* If we are using the utility function, attempt to return this call's promise. If no promise library was detected,
             default to null instead of returning the targeted elements so that utility function's return value is standardized. */
            if (isUtility) {
                return promiseData.promise || null;
                /* Otherwise, if we're using $.fn, return the jQuery-/Zepto-wrapped element set. */
            } else {
                return elementsWrapped;
            }
        }

        /*************************
         Arguments Assignment
         *************************/

        /* To allow for expressive CoffeeScript code, Velocity supports an alternative syntax in which "properties" and "options"
         objects are defined on a container object that's passed in as Velocity's sole argument. */
        /* Note: Some browsers automatically populate arguments with a "properties" object. We detect it by checking for its default "names" property. */
        var syntacticSugar = (arguments[0] && (($.isPlainObject(arguments[0].properties) && !arguments[0].properties.names) || Type.isString(arguments[0].properties))),
        /* Whether Velocity was called via the utility function (as opposed to on a jQuery/Zepto object). */
            isUtility,
        /* When Velocity is called via the utility function ($.Velocity.animate()/Velocity.animate()), elements are explicitly
         passed in as the first parameter. Thus, argument positioning varies. We normalize them here. */
            elementsWrapped,
            argumentIndex;

        var elements,
            propertiesMap,
            options;

        /* Detect jQuery/Zepto elements being animated via the $.fn method. */
        if (Type.isWrapped(this)) {
            isUtility = false;

            argumentIndex = 0;
            elements = this;
            elementsWrapped = this;
            /* Otherwise, raw elements are being animated via the utility function. */
        } else {
            isUtility = true;

            argumentIndex = 1;
            elements = syntacticSugar ? arguments[0].elements : arguments[0];
        }

        elements = Type.isWrapped(elements) ? [].slice.call(elements) : elements;

        if (!elements) {
            return;
        }

        if (syntacticSugar) {
            propertiesMap = arguments[0].properties;
            options = arguments[0].options;
        } else {
            propertiesMap = arguments[argumentIndex];
            options = arguments[argumentIndex + 1];
        }

        /* The length of the element set (in the form of a nodeList or an array of elements) is defaulted to 1 in case a
         single raw DOM element is passed in (which doesn't contain a length property). */
        var elementsLength = (Type.isArray(elements) || Type.isNodeList(elements)) ? elements.length : 1,
            elementsIndex = 0;

        /***************************
         Argument Overloading
         ***************************/

        /* Support is included for jQuery's argument overloading: $.animate(propertyMap [, duration] [, easing] [, complete]).
         Overloading is detected by checking for the absence of an object being passed into options. */
        /* Note: The stop action does not accept animation options, and is therefore excluded from this check. */
        if (propertiesMap !== "stop" && !$.isPlainObject(options)) {
            /* The utility function shifts all arguments one position to the right, so we adjust for that offset. */
            var startingArgumentPosition = argumentIndex + 1;

            options = {};

            /* Iterate through all options arguments */
            for (var i = startingArgumentPosition; i < arguments.length; i++) {
                /* Treat a number as a duration. Parse it out. */
                /* Note: The following RegEx will return true if passed an array with a number as its first item.
                 Thus, arrays are skipped from this check. */
                if (!Type.isArray(arguments[i]) && /^\d/.test(arguments[i])) {
                    options.duration = parseFloat(arguments[i]);
                    /* Treat strings and arrays as easings. */
                } else if (Type.isString(arguments[i]) || Type.isArray(arguments[i])) {
                    options.easing = arguments[i];
                    /* Treat a function as a complete callback. */
                } else if (Type.isFunction(arguments[i])) {
                    options.complete = arguments[i];
                }
            }
        }

        /***************
         Promises
         ***************/

        var promiseData = {
            promise: null,
            resolver: null,
            rejecter: null
        };

        /* If this call was made via the utility function (which is the default method of invocation when jQuery/Zepto are not being used), and if
         promise support was detected, create a promise object for this call and store references to its resolver and rejecter methods. The resolve
         method is used when a call completes naturally or is prematurely stopped by the user. In both cases, completeCall() handles the associated
         call cleanup and promise resolving logic. The reject method is used when an invalid set of arguments is passed into a Velocity call. */
        /* Note: Velocity employs a call-based queueing architecture, which means that stopping an animating element actually stops the full call that
         triggered it -- not that one element exclusively. Similarly, there is one promise per call, and all elements targeted by a Velocity call are
         grouped together for the purposes of resolving and rejecting a promise. */
        if (isUtility && Velocity.Promise) {
            promiseData.promise = new Velocity.Promise(function (resolve, reject) {
                promiseData.resolver = resolve;
                promiseData.rejecter = reject;
            });
        }

        /*********************
         Action Detection
         *********************/

        /* Velocity's behavior is categorized into "actions": Elements can either be specially scrolled into view,
         or they can be started, stopped, or reversed. If a literal or referenced properties map is passed in as Velocity's
         first argument, the associated action is "start". Alternatively, "scroll", "reverse", or "stop" can be passed in instead of a properties map. */
        var action;

        switch (propertiesMap) {
            case "scroll":
                action = "scroll";
                break;

            case "reverse":
                action = "reverse";
                break;

            case "stop":
                /*******************
                 Action: Stop
                 *******************/

                /* Clear the currently-active delay on each targeted element. */
                $.each(Type.isNode(elements) ? [ elements ] : elements, function(i, element) {
                    if (Data(element) && Data(element).delayTimer) {
                        /* Stop the timer from triggering its cached next() function. */
                        clearTimeout(Data(element).delayTimer.setTimeout);

                        /* Manually call the next() function so that the subsequent queue items can progress. */
                        if (Data(element).delayTimer.next) {
                            Data(element).delayTimer.next();
                        }

                        delete Data(element).delayTimer;
                    }
                });

                var callsToStop = [];

                /* When the stop action is triggered, the elements' currently active call is immediately stopped. The active call might have
                 been applied to multiple elements, in which case all of the call's elements will be subjected to stopping. When an element
                 is stopped, the next item in its animation queue is immediately triggered. */
                /* An additional argument may be passed in to clear an element's remaining queued calls. Either true (which defaults to the "fx" queue)
                 or a custom queue string can be passed in. */
                /* Stopping is achieved by traversing active calls for those which contain the targeted element. */
                /* Note: The stop command runs prior to Queueing since its behavior is intended to take effect *immediately*,
                 regardless of the element's current queue state. */
                $.each(Velocity.State.calls, function(i, activeCall) {
                    /* Inactive calls are set to false by the logic inside completeCall(). Skip them. */
                    if (activeCall !== false) {
                        /* If we're operating on a single element, wrap it in an array so that $.each() can iterate over it. */
                        $.each(Type.isNode(activeCall[1]) ? [ activeCall[1] ] : activeCall[1], function(k, activeElement) {
                            $.each(Type.isNode(elements) ? [ elements ] : elements, function(l, element) {
                                /* Check that this call was applied to the target element. */
                                if (element === activeElement) {
                                    if (Data(element)) {
                                        /* Since "reverse" uses cached start values (the previous call's endValues),
                                         these values must be changed to reflect the final value that the elements were actually tweened to. */
                                        $.each(Data(element).tweensContainer, function(m, activeTween) {
                                            activeTween.endValue = activeTween.currentValue;
                                        });
                                    }

                                    /* Clear the remaining queued calls. */
                                    if (options === true || Type.isString(options)) {
                                        /* The options argument can be overriden with a custom queue's name. */
                                        var queueName = Type.isString(options) ? options : "";

                                        /* Iterate through the items in the element's queue. */
                                        $.each($.queue(element, queueName), function(i, item) {
                                            /* The queue array can contain an "inprogress" sentinal, which we skip. */
                                            if (Type.isFunction(item)) {
                                                /* Pass the item's callback a flag indicating that we want to abort from the queue call.
                                                 (Specifically, the queue will resolve the call's associated promise then abort.)  */
                                                item(null, true);
                                            }
                                        });

                                        /* Clearing the $.queue() array is achieved by resetting it to []. */
                                        $.queue(element, queueName, []);
                                    }

                                    callsToStop.push(i);
                                }
                            });
                        });
                    }
                });

                /* Prematurely call completeCall() on each matched active call, passing an additional flag to indicate
                 that the complete callback and display:none setting should be skipped since we're completing prematurely. */
                $.each(callsToStop, function(i, j) {
                    completeCall(j, true);
                });

                if (promiseData.promise) {
                    /* Immediately resolve the promise associated with this stop call since stop runs synchronously. */
                    promiseData.resolver(elements);
                }

                /* Since we're stopping, and not proceeding with queueing, exit out of Velocity. */
                return getChain();

            default:
                /* Treat a non-empty plain object as a literal properties map. */
                if ($.isPlainObject(propertiesMap) && !$.isEmptyObject(propertiesMap)) {
                    action = "start";

                    /****************
                     Sequences
                     ****************/

                    /* Check if a string matches a registered sequence (see Sequences above). */
                } else if (Type.isString(propertiesMap) && Velocity.Sequences[propertiesMap]) {
                    var durationOriginal = options.duration,
                        delayOriginal = options.delay || 0;

                    /* If the backwards option was passed in, reverse the element set so that elements animate from the last to the first. */
                    if (options.backwards === true) {
                        elements = (elements.jquery ? [].slice.call(elements) : elements).reverse();
                    }

                    /* Individually trigger the sequence for each element in the set to prevent users from having to handle iteration logic in their sequence. */
                    $.each(elements, function(elementIndex, element) {
                        /* If the stagger option was passed in, successively delay each element by the stagger value (in ms). Retain the original delay value. */
                        if (parseFloat(options.stagger)) {
                            options.delay = delayOriginal + (parseFloat(options.stagger) * elementIndex);
                        } else if (Type.isFunction(options.stagger)) {
                            options.delay = delayOriginal + options.stagger.call(element, elementIndex, elementsLength);
                        }

                        /* If the drag option was passed in, successively increase/decrease (depending on the presense of options.backwards)
                         the duration of each element's animation, using floors to prevent producing very short durations. */
                        if (options.drag) {
                            /* Default the duration of UI pack effects (callouts and transitions) to 1000ms instead of the usual default duration of 400ms. */
                            options.duration = parseFloat(durationOriginal) || (/^(callout|transition)/.test(propertiesMap) ? 1000 : DEFAULT_DURATION);

                            /* For each element, take the greater duration of: A) animation completion percentage relative to the original duration,
                             B) 75% of the original duration, or C) a 200ms fallback (in case duration is already set to a low value).
                             The end result is a baseline of 75% of the sequence's duration that increases/decreases as the end of the element set is approached. */
                            options.duration = Math.max(options.duration * (options.backwards ? 1 - elementIndex/elementsLength : (elementIndex + 1) / elementsLength), options.duration * 0.75, 200);
                        }

                        /* Pass in the call's options object so that the sequence can optionally extend it. It defaults to an empty object instead of null to
                         reduce the options checking logic required inside the sequence. */
                        Velocity.Sequences[propertiesMap].call(element, element, options || {}, elementIndex, elementsLength, elements, promiseData.promise ? promiseData : undefined);
                    });

                    /* Since the animation logic resides within the sequence's own code, abort the remainder of this call.
                     (The performance overhead up to this point is virtually non-existant.) */
                    /* Note: The jQuery call chain is kept intact by returning the complete element set. */
                    return getChain();
                } else {
                    var abortError = "Velocity: First argument (" + propertiesMap + ") was not a property map, a known action, or a registered sequence. Aborting.";

                    if (promiseData.promise) {
                        promiseData.rejecter(new Error(abortError));
                    } else {
                        console.log(abortError);
                    }

                    return getChain();
                }
        }

        /**************************
         Call-Wide Variables
         **************************/

        /* A container for CSS unit conversion ratios (e.g. %, rem, and em ==> px) that is used to cache ratios across all properties
         being animated in a single Velocity call. Calculating unit ratios necessitates DOM querying and updating, and is therefore
         avoided (via caching) wherever possible; further, ratios are only calculated when they're needed. */
        /* Note: This container is call-wide instead of page-wide to avoid the risk of using stale conversion metrics across
         Velocity animations that are not immediately consecutively chained. */
        var unitConversionRatios = {
            /* Performance optimization insight: When the parent element, CSS position value, and fontSize do not differ amongst elements,
             the elements' unit ratios are identical. */
            lastParent: null,
            lastPosition: null,
            lastFontSize: null,
            /* Percent is the only unit types whose ratio is dependant upon axis. */
            lastPercentToPxWidth: null,
            lastPercentToPxHeight: null,
            lastEmToPx: null,
            /* The rem==>px ratio is relative to the document's fontSize -- not any property belonging to the element.
             Thus, it is automatically call-wide cached whenever the rem unit is being animated. */
            remToPx: null,
            /* Similarly, viewport units are relative to the window's current dimensions. */
            vwToPx: null,
            vhToPx: null
        };

        /* A container for all the ensuing tween data and metadata associated with this call.
         This container gets pushed to the page-wide Velocity.State.calls array that is processed during animation ticking. */
        var call = [];

        /************************
         Element Processing
         ************************/

        /* Element processing consists of three parts -- data processing that cannot go stale and data processing that *can* go stale (i.e. third-party style modifications):
         1) Pre-Queueing: Element-wide variables, including the element's data storage, are instantiated. Call options are prepared. If triggered, the Stop action is executed.
         2) Queueing: The logic that runs once this call has reached its point of execution in the element's $.queue() stack. Most logic is placed here to avoid risking it becoming stale.
         3) Pushing: Consolidation of the tween data followed by its push onto the global in-progress calls container.
         */

        function processElement () {

            /*************************
             Part I: Pre-Queueing
             *************************/

            /***************************
             Element-Wide Variables
             ***************************/

            var element = this,
            /* The runtime opts object is the extension of the current call's options and Velocity's page-wide option defaults. */
                opts = $.extend({}, Velocity.defaults, options),
            /* A container for the processed data associated with each property in the propertyMap.
             (Each property in the map produces its own "tween".) */
                tweensContainer = {};

            /******************
             Data Cache
             ******************/

            /* A primary design goal of Velocity is to cache data wherever possible in order to avoid DOM requerying.
             Accordingly, each element has a data cache instantiated on it. */
            if (Data(element) === undefined) {
                $.data(element, NAME, {
                    /* Store whether this is an SVG element, since its properties are retrieved and updated differently than standard HTML elements. */
                    isSVG: Type.isSVG(element),
                    /* Keep track of whether the element is currently being animated by Velocity.
                     This is used to ensure that property values are not transferred between non-consecutive (stale) calls. */
                    isAnimating: false,
                    /* A reference to the element's live computedStyle object. Learn more here: https://developer.mozilla.org/en/docs/Web/API/window.getComputedStyle */
                    computedStyle: null,
                    /* Tween data is cached for each animation on the element so that data can be passed across calls --
                     in particular, end values are used as subsequent start values in consecutive Velocity calls. */
                    tweensContainer: null,
                    /* The full root property values of each CSS hook being animated on this element are cached so that:
                     1) Concurrently-animating hooks sharing the same root can have their root values' merged into one while tweening.
                     2) Post-hook-injection root values can be transferred over to consecutively chained Velocity calls as starting root values. */
                    rootPropertyValueCache: {},
                    /* A cache for transform updates, which must be manually flushed via CSS.flushTransformCache(). */
                    transformCache: {}
                });
            }

            /******************
             Option: Delay
             ******************/

            /* Since queue:false doesn't respect the item's existing queue, we avoid injecting its delay here (it's set later on). */
            /* Note: Velocity rolls its own delay function since jQuery doesn't have a utility alias for $.fn.delay()
             (and thus requires jQuery element creation, which we avoid since its overhead includes DOM querying). */
            if (parseFloat(opts.delay) && opts.queue !== false) {
                $.queue(element, opts.queue, function(next) {
                    /* This is a flag used to indicate to the upcoming completeCall() function that this queue entry was initiated by Velocity. See completeCall() for further details. */
                    Velocity.velocityQueueEntryFlag = true;

                    /* The ensuing queue item (which is assigned to the "next" argument that $.queue() automatically passes in) will be triggered after a setTimeout delay.
                     The setTimeout is stored so that it can be subjected to clearTimeout() if this animation is prematurely stopped via Velocity's "stop" command. */
                    Data(element).delayTimer = {
                        setTimeout: setTimeout(next, parseFloat(opts.delay)),
                        next: next
                    };
                });
            }

            /*********************
             Option: Duration
             *********************/

            /* In mock mode, all animations are forced to 1ms so that they occur immediately upon the next rAF tick. */
            if (Velocity.mock === true) {
                opts.duration = 1;
            } else {
                /* Support for jQuery's named durations. */
                switch (opts.duration.toString().toLowerCase()) {
                    case "fast":
                        opts.duration = 200;
                        break;

                    case "normal":
                        opts.duration = DEFAULT_DURATION;
                        break;

                    case "slow":
                        opts.duration = 600;
                        break;

                    default:
                        /* Remove the potential "ms" suffix and default to 1 if the user is attempting to set a duration of 0 (in order to produce an immediate style change). */
                        opts.duration = parseFloat(opts.duration) || 1;
                }
            }

            /*******************
             Option: Easing
             *******************/

            opts.easing = getEasing(opts.easing, opts.duration);

            /**********************
             Option: Callbacks
             **********************/

            /* Callbacks must functions. Otherwise, default to null. */
            if (opts.begin && !Type.isFunction(opts.begin)) {
                opts.begin = null;
            }

            if (opts.progress && !Type.isFunction(opts.progress)) {
                opts.progress = null;
            }

            if (opts.complete && !Type.isFunction(opts.complete)) {
                opts.complete = null;
            }

            /*********************************
             Option: Display & Visibility
             *********************************/

            /* Refer to Velocity's documentation (VelocityJS.org/#displayAndVisibility) for a description of the display and visibility options' behavior. */
            if (opts.display) {
                opts.display = opts.display.toString().toLowerCase();

                /* Users can pass in a special "auto" value to instruct Velocity to set the element to its default display value. */
                if (opts.display === "auto") {
                    opts.display = Velocity.CSS.Values.getDisplayType(element);
                }
            }

            if (opts.visibility) {
                opts.visibility = opts.visibility.toString().toLowerCase();
            }

            /**********************
             Option: mobileHA
             **********************/

            /* When set to true, and if this is a mobile device, mobileHA automatically enables hardware acceleration (via a null transform hack)
             on animating elements. HA is removed from the element at the completion of its animation. */
            /* Note: Android Gingerbread doesn't support HA. If a null transform hack (mobileHA) is in fact set, it will prevent other tranform subproperties from taking effect. */
            /* Note: You can read more about the use of mobileHA in Velocity's documentation: VelocityJS.org/#mobileHA. */
            opts.mobileHA = (opts.mobileHA && Velocity.State.isMobile && !Velocity.State.isGingerbread);

            /***********************
             Part II: Queueing
             ***********************/

            /* When a set of elements is targeted by a Velocity call, the set is broken up and each element has the current Velocity call individually queued onto it.
             In this way, each element's existing queue is respected; some elements may already be animating and accordingly should not have this current Velocity call triggered immediately. */
            /* In each queue, tween data is processed for each animating property then pushed onto the call-wide calls array. When the last element in the set has had its tweens processed,
             the call array is pushed to Velocity.State.calls for live processing by the requestAnimationFrame tick. */
            function buildQueue (next) {

                /*******************
                 Option: Begin
                 *******************/

                /* The begin callback is fired once per call -- not once per elemenet -- and is passed the full raw DOM element set as both its context and its first argument. */
                if (opts.begin && elementsIndex === 0) {
                    /* We throw callbacks in a setTimeout so that thrown errors don't halt the execution of Velocity itself. */
                    try {
                        opts.begin.call(elements, elements);
                    } catch (error) {
                        setTimeout(function() {
                            throw error;
                        }, 1);
                    }
                }

                /*****************************************
                 Tween Data Construction (for Scroll)
                 *****************************************/

                /* Note: In order to be subjected to chaining and animation options, scroll's tweening is routed through Velocity as if it were a standard CSS property animation. */
                if (action === "scroll") {
                    /* The scroll action uniquely takes an optional "offset" option -- specified in pixels -- that offsets the targeted scroll position. */
                    var scrollDirection = (/^x$/i.test(opts.axis) ? "Left" : "Top"),
                        scrollOffset = parseFloat(opts.offset) || 0,
                        scrollPositionCurrent,
                        scrollPositionCurrentAlternate,
                        scrollPositionEnd;

                    /* Scroll also uniquely takes an optional "container" option, which indicates the parent element that should be scrolled --
                     as opposed to the browser window itself. This is useful for scrolling toward an element that's inside an overflowing parent element. */
                    if (opts.container) {
                        /* Ensure that either a jQuery object or a raw DOM element was passed in. */
                        if (opts.container.jquery || Type.isNode(opts.container)) {
                            /* Extract the raw DOM element from the jQuery wrapper. */
                            opts.container = opts.container[0] || opts.container;
                            /* Note: Unlike other properties in Velocity, the browser's scroll position is never cached since it so frequently changes
                             (due to the user's natural interaction with the page). */
                            scrollPositionCurrent = opts.container["scroll" + scrollDirection]; /* GET */

                            /* $.position() values are relative to the container's currently viewable area (without taking into account the container's true dimensions
                             -- say, for example, if the container was not overflowing). Thus, the scroll end value is the sum of the child element's position *and*
                             the scroll container's current scroll position. */
                            /* Note: jQuery does not offer a utility alias for $.position(), so we have to incur jQuery object conversion here.
                             This syncs up with an ensuing batch of GETs, so it fortunately does not trigger layout thrashing. */
                            scrollPositionEnd = (scrollPositionCurrent + $(element).position()[scrollDirection.toLowerCase()]) + scrollOffset; /* GET */
                            /* If a value other than a jQuery object or a raw DOM element was passed in, default to null so that this option is ignored. */
                        } else {
                            opts.container = null;
                        }
                    } else {
                        /* If the window itself is being scrolled -- not a containing element -- perform a live scroll position lookup using
                         the appropriate cached property names (which differ based on browser type). */
                        scrollPositionCurrent = Velocity.State.scrollAnchor[Velocity.State["scrollProperty" + scrollDirection]]; /* GET */
                        /* When scrolling the browser window, cache the alternate axis's current value since window.scrollTo() doesn't let us change only one value at a time. */
                        scrollPositionCurrentAlternate = Velocity.State.scrollAnchor[Velocity.State["scrollProperty" + (scrollDirection === "Left" ? "Top" : "Left")]]; /* GET */

                        /* Unlike $.position(), $.offset() values are relative to the browser window's true dimensions -- not merely its currently viewable area --
                         and therefore end values do not need to be compounded onto current values. */
                        scrollPositionEnd = $(element).offset()[scrollDirection.toLowerCase()] + scrollOffset; /* GET */
                    }

                    /* Since there's only one format that scroll's associated tweensContainer can take, we create it manually. */
                    tweensContainer = {
                        scroll: {
                            rootPropertyValue: false,
                            startValue: scrollPositionCurrent,
                            currentValue: scrollPositionCurrent,
                            endValue: scrollPositionEnd,
                            unitType: "",
                            easing: opts.easing,
                            scrollData: {
                                container: opts.container,
                                direction: scrollDirection,
                                alternateValue: scrollPositionCurrentAlternate
                            }
                        },
                        element: element
                    };

                    if (Velocity.debug) console.log("tweensContainer (scroll): ", tweensContainer.scroll, element);

                    /******************************************
                     Tween Data Construction (for Reverse)
                     ******************************************/

                    /* Reverse acts like a "start" action in that a property map is animated toward. The only difference is
                     that the property map used for reverse is the inverse of the map used in the previous call. Thus, we manipulate
                     the previous call to construct our new map: use the previous map's end values as our new map's start values. Copy over all other data. */
                    /* Note: Reverse can be directly called via the "reverse" parameter, or it can be indirectly triggered via the loop option. (Loops are composed of multiple reverses.) */
                    /* Note: Reverse calls do not need to be consecutively chained onto a currently-animating element in order to operate on cached values;
                     there is no harm to reverse being called on a potentially stale data cache since reverse's behavior is simply defined
                     as reverting to the element's values as they were prior to the previous *Velocity* call. */
                } else if (action === "reverse") {
                    /* Abort if there is no prior animation data to reverse to. */
                    if (!Data(element).tweensContainer) {
                        /* Dequeue the element so that this queue entry releases itself immediately, allowing subsequent queue entries to run. */
                        $.dequeue(element, opts.queue);

                        return;
                    } else {
                        /*********************
                         Options Parsing
                         *********************/

                        /* If the element was hidden via the display option in the previous call,
                         revert display to block prior to reversal so that the element is visible again. */
                        if (Data(element).opts.display === "none") {
                            Data(element).opts.display = "block";
                        }

                        if (Data(element).opts.visibility === "hidden") {
                            Data(element).opts.visibility = "visible";
                        }

                        /* If the loop option was set in the previous call, disable it so that "reverse" calls aren't recursively generated.
                         Further, remove the previous call's callback options; typically, users do not want these to be refired. */
                        Data(element).opts.loop = false;
                        Data(element).opts.begin = null;
                        Data(element).opts.complete = null;

                        /* Since we're extending an opts object that has already been extended with the defaults options object,
                         we remove non-explicitly-defined properties that are auto-assigned values. */
                        if (!options.easing) {
                            delete opts.easing;
                        }

                        if (!options.duration) {
                            delete opts.duration;
                        }

                        /* The opts object used for reversal is an extension of the options object optionally passed into this
                         reverse call plus the options used in the previous Velocity call. */
                        opts = $.extend({}, Data(element).opts, opts);

                        /*************************************
                         Tweens Container Reconstruction
                         *************************************/

                        /* Create a deepy copy (indicated via the true flag) of the previous call's tweensContainer. */
                        var lastTweensContainer = $.extend(true, {}, Data(element).tweensContainer);

                        /* Manipulate the previous tweensContainer by replacing its end values and currentValues with its start values. */
                        for (var lastTween in lastTweensContainer) {
                            /* In addition to tween data, tweensContainers contain an element property that we ignore here. */
                            if (lastTween !== "element") {
                                var lastStartValue = lastTweensContainer[lastTween].startValue;

                                lastTweensContainer[lastTween].startValue = lastTweensContainer[lastTween].currentValue = lastTweensContainer[lastTween].endValue;
                                lastTweensContainer[lastTween].endValue = lastStartValue;

                                /* Easing is the only option that embeds into the individual tween data (since it can be defined on a per-property basis).
                                 Accordingly, every property's easing value must be updated when an options object is passed in with a reverse call.
                                 The side effect of this extensibility is that all per-property easing values are forcefully reset to the new value. */
                                if (!$.isEmptyObject(options)) {
                                    lastTweensContainer[lastTween].easing = opts.easing;
                                }

                                if (Velocity.debug) console.log("reverse tweensContainer (" + lastTween + "): " + JSON.stringify(lastTweensContainer[lastTween]), element);
                            }
                        }

                        tweensContainer = lastTweensContainer;
                    }

                    /*****************************************
                     Tween Data Construction (for Start)
                     *****************************************/

                } else if (action === "start") {

                    /*************************
                     Value Transferring
                     *************************/

                    /* If this queue entry follows a previous Velocity-initiated queue entry *and* if this entry was created
                     while the element was in the process of being animated by Velocity, then this current call is safe to use
                     the end values from the prior call as its start values. Velocity attempts to perform this value transfer
                     process whenever possible in order to avoid requerying the DOM. */
                    /* If values aren't transferred from a prior call and start values were not forcefed by the user (more on this below),
                     then the DOM is queried for the element's current values as a last resort. */
                    /* Note: Conversely, animation reversal (and looping) *always* perform inter-call value transfers; they never requery the DOM. */
                    var lastTweensContainer;

                    /* The per-element isAnimating flag is used to indicate whether it's safe (i.e. the data isn't stale)
                     to transfer over end values to use as start values. If it's set to true and there is a previous
                     Velocity call to pull values from, do so. */
                    if (Data(element).tweensContainer && Data(element).isAnimating === true) {
                        lastTweensContainer = Data(element).tweensContainer;
                    }

                    /***************************
                     Tween Data Calculation
                     ***************************/

                    /* This function parses property data and defaults endValue, easing, and startValue as appropriate. */
                    /* Property map values can either take the form of 1) a single value representing the end value,
                     or 2) an array in the form of [ endValue, [, easing] [, startValue] ].
                     The optional third parameter is a forcefed startValue to be used instead of querying the DOM for
                     the element's current value. Read Velocity's docmentation to learn more about forcefeeding: VelocityJS.org/#forcefeeding */
                    function parsePropertyValue (valueData, skipResolvingEasing) {
                        var endValue = undefined,
                            easing = undefined,
                            startValue = undefined;

                        /* Handle the array format, which can be structured as one of three potential overloads:
                         A) [ endValue, easing, startValue ], B) [ endValue, easing ], or C) [ endValue, startValue ] */
                        if (Type.isArray(valueData)) {
                            /* endValue is always the first item in the array. Don't bother validating endValue's value now
                             since the ensuing property cycling logic does that. */
                            endValue = valueData[0];

                            /* Two-item array format: If the second item is a number, function, or hex string, treat it as a
                             start value since easings can only be non-hex strings or arrays. */
                            if ((!Type.isArray(valueData[1]) && /^[\d-]/.test(valueData[1])) || Type.isFunction(valueData[1]) || CSS.RegEx.isHex.test(valueData[1])) {
                                startValue = valueData[1];
                                /* Two or three-item array: If the second item is a non-hex string or an array, treat it as an easing. */
                            } else if ((Type.isString(valueData[1]) && !CSS.RegEx.isHex.test(valueData[1])) || Type.isArray(valueData[1])) {
                                easing = skipResolvingEasing ? valueData[1] : getEasing(valueData[1], opts.duration);

                                /* Don't bother validating startValue's value now since the ensuing property cycling logic inherently does that. */
                                if (valueData[2] !== undefined) {
                                    startValue = valueData[2];
                                }
                            }
                            /* Handle the single-value format. */
                        } else {
                            endValue = valueData;
                        }

                        /* Default to the call's easing if a per-property easing type was not defined. */
                        easing = easing || opts.easing;

                        /* If functions were passed in as values, pass the function the current element as its context,
                         plus the element's index and the element set's size as arguments. Then, assign the returned value. */
                        if (Type.isFunction(endValue)) {
                            endValue = endValue.call(element, elementsIndex, elementsLength);
                        }

                        if (Type.isFunction(startValue)) {
                            startValue = startValue.call(element, elementsIndex, elementsLength);
                        }

                        /* Allow startValue to be left as undefined to indicate to the ensuing code that its value was not forcefed. */
                        return [ endValue || 0, easing, startValue ];
                    }

                    /* Cycle through each property in the map, looking for shorthand color properties (e.g. "color" as opposed to "colorRed"). Inject the corresponding
                     colorRed, colorGreen, and colorBlue RGB component tweens into the propertiesMap (which Velocity understands) and remove the shorthand property. */
                    $.each(propertiesMap, function(property, value) {
                        /* Parse the value data for each shorthand. */
                        var valueData = parsePropertyValue(value, true),
                            endValue = valueData[0],
                            easing = valueData[1],
                            startValue = valueData[2];

                        /* Find shorthand color properties that have been passed a hex string. */
                        if (RegExp(CSS.Lists.colors.join("|")).test(property) && CSS.RegEx.isHex.test(endValue)) {
                            /* Convert the hex strings into their RGB component arrays. */
                            var colorComponents = [ "Red", "Green", "Blue" ],
                                endValueRGB = CSS.Values.hexToRgb(endValue),
                                startValueRGB = startValue ? CSS.Values.hexToRgb(startValue) : undefined;

                            /* Inject the RGB component tweens into propertiesMap. */
                            for (var i = 0; i < colorComponents.length; i++) {
                                propertiesMap[property + colorComponents[i]] = [ endValueRGB[i], easing, startValueRGB ? startValueRGB[i] : startValueRGB ];
                            }

                            /* Remove the intermediary shorthand property entry now that we've processed it. */
                            delete propertiesMap[property];
                        }
                    });

                    /* Create a tween out of each property, and append its associated data to tweensContainer. */
                    for (var property in propertiesMap) {

                        /**************************
                         Start Value Sourcing
                         **************************/

                        /* Parse out endValue, easing, and startValue from the property's data. */
                        var valueData = parsePropertyValue(propertiesMap[property]),
                            endValue = valueData[0],
                            easing = valueData[1],
                            startValue = valueData[2];

                        /* Now that the original property name's format has been used for the parsePropertyValue() lookup above,
                         we force the property to its camelCase styling to normalize it for manipulation. */
                        property = CSS.Names.camelCase(property);

                        /* In case this property is a hook, there are circumstances where we will intend to work on the hook's root property and not the hooked subproperty. */
                        var rootProperty = CSS.Hooks.getRoot(property),
                            rootPropertyValue = false;

                        /* Properties that are not supported by the browser (and do not have an associated normalization) will
                         inherently produce no style changes when set, so they are skipped in order to decrease animation tick overhead.
                         Property support is determined via prefixCheck(), which returns a false flag when no supported is detected. */
                        /* Note: Since SVG elements have some of their properties directly applied as HTML attributes,
                         there is no way to check for their explicit browser support, and so we skip skip this check for them. */
                        if (!Data(element).isSVG && CSS.Names.prefixCheck(rootProperty)[1] === false && CSS.Normalizations.registered[rootProperty] === undefined) {
                            if (Velocity.debug) console.log("Skipping [" + rootProperty + "] due to a lack of browser support.");

                            continue;
                        }

                        /* If the display option is being set to a non-"none" (e.g. "block") and opacity (filter on IE<=8) is being
                         animated to an endValue of non-zero, the user's intention is to fade in from invisible, thus we forcefeed opacity
                         a startValue of 0 if its startValue hasn't already been sourced by value transferring or prior forcefeeding. */
                        if (((opts.display && opts.display !== "none") || (opts.visibility && opts.visibility !== "hidden")) && /opacity|filter/.test(property) && !startValue && endValue !== 0) {
                            startValue = 0;
                        }

                        /* If values have been transferred from the previous Velocity call, extract the endValue and rootPropertyValue
                         for all of the current call's properties that were *also* animated in the previous call. */
                        /* Note: Value transferring can optionally be disabled by the user via the _cacheValues option. */
                        if (opts._cacheValues && lastTweensContainer && lastTweensContainer[property]) {
                            if (startValue === undefined) {
                                startValue = lastTweensContainer[property].endValue + lastTweensContainer[property].unitType;
                            }

                            /* The previous call's rootPropertyValue is extracted from the element's data cache since that's the
                             instance of rootPropertyValue that gets freshly updated by the tweening process, whereas the rootPropertyValue
                             attached to the incoming lastTweensContainer is equal to the root property's value prior to any tweening. */
                            rootPropertyValue = Data(element).rootPropertyValueCache[rootProperty];
                            /* If values were not transferred from a previous Velocity call, query the DOM as needed. */
                        } else {
                            /* Handle hooked properties. */
                            if (CSS.Hooks.registered[property]) {
                                if (startValue === undefined) {
                                    rootPropertyValue = CSS.getPropertyValue(element, rootProperty); /* GET */
                                    /* Note: The following getPropertyValue() call does not actually trigger a DOM query;
                                     getPropertyValue() will extract the hook from rootPropertyValue. */
                                    startValue = CSS.getPropertyValue(element, property, rootPropertyValue);
                                    /* If startValue is already defined via forcefeeding, do not query the DOM for the root property's value;
                                     just grab rootProperty's zero-value template from CSS.Hooks. This overwrites the element's actual
                                     root property value (if one is set), but this is acceptable since the primary reason users forcefeed is
                                     to avoid DOM queries, and thus we likewise avoid querying the DOM for the root property's value. */
                                } else {
                                    /* Grab this hook's zero-value template, e.g. "0px 0px 0px black". */
                                    rootPropertyValue = CSS.Hooks.templates[rootProperty][1];
                                }
                                /* Handle non-hooked properties that haven't already been defined via forcefeeding. */
                            } else if (startValue === undefined) {
                                startValue = CSS.getPropertyValue(element, property); /* GET */
                            }
                        }

                        /**************************
                         Value Data Extraction
                         **************************/

                        var separatedValue,
                            endValueUnitType,
                            startValueUnitType,
                            operator = false;

                        /* Separates a property value into its numeric value and its unit type. */
                        function separateValue (property, value) {
                            var unitType,
                                numericValue;

                            numericValue = (value || 0)
                                .toString()
                                .toLowerCase()
                                /* Match the unit type at the end of the value. */
                                .replace(/[%A-z]+$/, function(match) {
                                    /* Grab the unit type. */
                                    unitType = match;

                                    /* Strip the unit type off of value. */
                                    return "";
                                });

                            /* If no unit type was supplied, assign one that is appropriate for this property (e.g. "deg" for rotateZ or "px" for width). */
                            if (!unitType) {
                                unitType = CSS.Values.getUnitType(property);
                            }

                            return [ numericValue, unitType ];
                        }

                        /* Separate startValue. */
                        separatedValue = separateValue(property, startValue);
                        startValue = separatedValue[0];
                        startValueUnitType = separatedValue[1];

                        /* Separate endValue, and extract a value operator (e.g. "+=", "-=") if one exists. */
                        separatedValue = separateValue(property, endValue);
                        endValue = separatedValue[0].replace(/^([+-\/*])=/, function(match, subMatch) {
                            operator = subMatch;

                            /* Strip the operator off of the value. */
                            return "";
                        });
                        endValueUnitType = separatedValue[1];

                        /* Parse float values from endValue and startValue. Default to 0 if NaN is returned. */
                        startValue = parseFloat(startValue) || 0;
                        endValue = parseFloat(endValue) || 0;

                        /*****************************
                         Value & Unit Conversion
                         *****************************/

                        var elementUnitRatios;

                        /* Custom support for properties that don't actually accept the % unit type, but where pollyfilling is trivial and relatively foolproof. */
                        if (endValueUnitType === "%") {
                            /* A %-value fontSize/lineHeight is relative to the parent's fontSize (as opposed to the parent's dimensions),
                             which is identical to the em unit's behavior, so we piggyback off of that. */
                            if (/^(fontSize|lineHeight)$/.test(property)) {
                                /* Convert % into an em decimal value. */
                                endValue = endValue / 100;
                                endValueUnitType = "em";
                                /* For scaleX and scaleY, convert the value into its decimal format and strip off the unit type. */
                            } else if (/^scale/.test(property)) {
                                endValue = endValue / 100;
                                endValueUnitType = "";
                                /* For RGB components, take the defined percentage of 255 and strip off the unit type. */
                            } else if (/(Red|Green|Blue)$/i.test(property)) {
                                endValue = (endValue / 100) * 255;
                                endValueUnitType = "";
                            }
                        }

                        /* When queried, the browser returns (most) CSS property values in pixels. Therefore, if an endValue with a unit type of
                         %, em, or rem is animated toward, startValue must be converted from pixels into the same unit type as endValue in order
                         for value manipulation logic (increment/decrement) to proceed. Further, if the startValue was forcefed or transferred
                         from a previous call, startValue may also not be in pixels. Unit conversion logic therefore consists of two steps:
                         1) Calculating the ratio of %,/em/rem relative to pixels then 2) Converting startValue into the same unit of measurement as endValue based on these ratios. */
                        /* Unit conversion ratios are calculated by momentarily setting a value with the target unit type on the element,
                         comparing the returned pixel value, then reverting to the original value. */
                        /* Note: Even if only one of these unit types is being animated, all unit ratios are calculated at once since the overhead
                         of batching the SETs and GETs together upfront outweights the potential overhead
                         of layout thrashing caused by re-querying for uncalculated ratios for subsequently-processed properties. */
                        /* Note: Instead of adjusting the CSS properties on the target element, an alternative way of performing value conversion
                         is to inject a cloned element into the element's parent and manipulate *its* values instead.
                         This is a cleaner method that avoids the ensuing rounds of layout thrashing, but it's ultimately less performant.
                         due to the overhead involved with DOM tree modification (element insertion/deletion). */
                        /* Todo: Shift this logic into the calls' first tick instance so that it's synced with RAF. */
                        /* Todo: Store the original values and skip re-setting if we're animating height or width in the properties map. */
                        function calculateUnitRatios () {
                            /* The properties below are used to determine whether the element differs sufficiently from this same call's
                             prior element (in the overall element set) to also differ in its unit conversion ratios. If the properties
                             match up with those of the prior element, the prior element's conversion ratios are used. Like most optimizations
                             in Velocity, this is done to minimize DOM querying. */
                            var sameRatioIndicators = {
                                    parent: element.parentNode, /* GET */
                                    position: CSS.getPropertyValue(element, "position"), /* GET */
                                    fontSize: CSS.getPropertyValue(element, "fontSize") /* GET */
                                },
                            /* Determine if the same % ratio can be used. % is relative to the element's position value and the parent's width and height dimensions. */
                                sameBasePercent = ((sameRatioIndicators.position === unitConversionRatios.lastPosition) && (sameRatioIndicators.parent === unitConversionRatios.lastParent)),
                            /* Determine if the same em ratio can be used. em is relative to the element's fontSize, which itself is relative to the parent's fontSize. */
                                sameBaseEm = ((sameRatioIndicators.fontSize === unitConversionRatios.lastFontSize) && (sameRatioIndicators.parent === unitConversionRatios.lastParent));

                            /* Store these ratio indicators call-wide for the next element to compare against. */
                            unitConversionRatios.lastParent = sameRatioIndicators.parent;
                            unitConversionRatios.lastPosition = sameRatioIndicators.position;
                            unitConversionRatios.lastFontSize = sameRatioIndicators.fontSize;

                            /* Whereas % and em ratios are determined on a per-element basis, the rem unit type only needs to be checked
                             once per call since it is exclusively dependant upon document.body's fontSize. If this is the first time
                             that calculateUnitRatios() is being run during this call, remToPx will still be set to its default value of null, so we calculate it now. */
                            if (unitConversionRatios.remToPx === null) {
                                /* Default to most browsers' default fontSize of 16px in the case of 0. */
                                unitConversionRatios.remToPx = parseFloat(CSS.getPropertyValue(document.body, "fontSize")) || 16; /* GET */
                            }

                            /* The viewport units are relative to the window's inner dimensions. */
                            if (unitConversionRatios.vwToPx === null) {
                                unitConversionRatios.vwToPx = parseFloat(window.innerWidth) / 100; /* GET */
                                unitConversionRatios.vhToPx = parseFloat(window.innerHeight) / 100; /* GET */
                            }

                            var originalValues = {
                                    /* To accurately and consistently calculate conversion ratios, the element's overflow and box-sizing are temporarily removed.
                                     Both properties modify an element's visible dimensions. */
                                    /* Note: Overflow must be manipulated on a per-axis basis since the plain overflow property overwrites its subproperties' values. */
                                    overflowX: null,
                                    overflowY: null,
                                    boxSizing: null,
                                    /* width and height act as our proxy properties for measuring the horizontal and vertical % ratios.
                                     Since they can be artificially constrained by their min-/max- equivalents, those properties are converted as well. */
                                    width: null,
                                    minWidth: null,
                                    maxWidth: null,
                                    height: null,
                                    minHeight: null,
                                    maxHeight: null,
                                    /* paddingLeft arbitrarily acts as our proxy for the em ratio. */
                                    paddingLeft: null
                                },
                                elementUnitRatios = {},
                            /* Note: IE<=8 round to the nearest pixel when returning CSS values, thus we perform conversions using a measurement
                             of 10 (instead of 1) to give our ratios a precision of at least 1 decimal value. */
                                measurement = 10;

                            /* For organizational purposes, current ratio calculations are consolidated onto the elementUnitRatios object. */
                            elementUnitRatios.remToPx = unitConversionRatios.remToPx;
                            elementUnitRatios.vwToPx = unitConversionRatios.vwToPx;
                            elementUnitRatios.vhToPx = unitConversionRatios.vhToPx;

                            /* After temporary unit conversion logic runs, width and height properties that were originally set to "auto" must be set back
                             to "auto" instead of to the actual corresponding pixel value. Leaving the values at their hard-coded pixel value equivalents
                             would inherently prevent the elements from vertically adjusting as the height of its inner content changes. */
                            /* IE tells us whether or not the property is set to "auto". Other browsers provide no way of determing "auto" values on height/width,
                             and thus we have to trigger additional layout thrashing (see below) to solve this. */
                            if (IE && !Data(element).isSVG) {
                                var isIEWidthAuto = /^auto$/i.test(element.currentStyle.width),
                                    isIEHeightAuto = /^auto$/i.test(element.currentStyle.height);
                            }

                            /* Note: To minimize layout thrashing, the ensuing unit conversion logic is split into batches to synchronize GETs and SETs. */
                            if (!sameBasePercent || !sameBaseEm) {
                                /* SVG elements have no concept of document flow, and don't support the full range of CSS properties,
                                 so we skip the unnecessary stripping of unapplied properties to avoid dirtying their HTML. */
                                if (!Data(element).isSVG) {
                                    originalValues.overflowX = CSS.getPropertyValue(element, "overflowX"); /* GET */
                                    originalValues.overflowY = CSS.getPropertyValue(element, "overflowY"); /* GET */
                                    originalValues.boxSizing = CSS.getPropertyValue(element, "boxSizing"); /* GET */

                                    /* Since % values are relative to their respective axes, ratios are calculated for both width and height.
                                     In contrast, only a single ratio is required for rem and em. */
                                    /* When calculating % values, we set a flag to indiciate that we want the computed value instead of offsetWidth/Height,
                                     which incorporate additional dimensions (such as padding and border-width) into their values. */
                                    originalValues.minWidth = CSS.getPropertyValue(element, "minWidth"); /* GET */
                                    /* Note: max-width/height must default to "none" when 0 is returned, otherwise the element cannot have its width/height set. */
                                    originalValues.maxWidth = CSS.getPropertyValue(element, "maxWidth") || "none"; /* GET */

                                    originalValues.minHeight = CSS.getPropertyValue(element, "minHeight"); /* GET */
                                    originalValues.maxHeight = CSS.getPropertyValue(element, "maxHeight") || "none"; /* GET */

                                    originalValues.paddingLeft = CSS.getPropertyValue(element, "paddingLeft"); /* GET */
                                }

                                originalValues.width = CSS.getPropertyValue(element, "width", null, true); /* GET */
                                originalValues.height = CSS.getPropertyValue(element, "height", null, true); /* GET */
                            }

                            if (sameBasePercent) {
                                elementUnitRatios.percentToPxRatioWidth = unitConversionRatios.lastPercentToPxWidth;
                                elementUnitRatios.percentToPxRatioHeight = unitConversionRatios.lastPercentToPxHeight;
                            } else {
                                if (!Data(element).isSVG) {
                                    CSS.setPropertyValue(element, "overflowX",  "hidden"); /* SET */
                                    CSS.setPropertyValue(element, "overflowY",  "hidden"); /* SET */
                                    CSS.setPropertyValue(element, "boxSizing",  "content-box"); /* SET */

                                    CSS.setPropertyValue(element, "minWidth", measurement + "%"); /* SET */
                                    CSS.setPropertyValue(element, "maxWidth", measurement + "%"); /* SET */

                                    CSS.setPropertyValue(element, "minHeight",  measurement + "%"); /* SET */
                                    CSS.setPropertyValue(element, "maxHeight",  measurement + "%"); /* SET */
                                }

                                CSS.setPropertyValue(element, "width", measurement + "%"); /* SET */
                                CSS.setPropertyValue(element, "height",  measurement + "%"); /* SET */
                            }

                            if (sameBaseEm) {
                                elementUnitRatios.emToPx = unitConversionRatios.lastEmToPx;
                            } else if (!Data(element).isSVG) {
                                CSS.setPropertyValue(element, "paddingLeft", measurement + "em"); /* SET */
                            }

                            /* The following pixel-value GETs cannot be batched with the prior GETs since they depend upon the values
                             temporarily set immediately above; layout thrashing cannot be avoided here. */
                            if (!sameBasePercent) {
                                /* Divide the returned value by the measurement value to get the ratio between 1% and 1px.
                                 Default to 1 since conversion logic using 0 can produce Infinite. */
                                elementUnitRatios.percentToPxRatioWidth = unitConversionRatios.lastPercentToPxWidth = (parseFloat(CSS.getPropertyValue(element, "width", null, true)) || 1) / measurement; /* GET */
                                elementUnitRatios.percentToPxRatioHeight = unitConversionRatios.lastPercentToPxHeight = (parseFloat(CSS.getPropertyValue(element, "height", null, true)) || 1) / measurement; /* GET */
                            }

                            if (!sameBaseEm) {
                                elementUnitRatios.emToPx = unitConversionRatios.lastEmToPx = (parseFloat(CSS.getPropertyValue(element, "paddingLeft")) || 1) / measurement; /* GET */
                            }

                            /* Revert each used test property to its original value. */
                            for (var originalValueProperty in originalValues) {
                                if (originalValues[originalValueProperty] !== null) {
                                    CSS.setPropertyValue(element, originalValueProperty, originalValues[originalValueProperty]); /* SETs */
                                }
                            }

                            /* SVG dimensions do not accept an "auto" value, so we skip this reset process for them. */
                            if (!Data(element).isSVG) {
                                /* In IE, revert to "auto" for width and height if it was originally set. */
                                if (IE) {
                                    if (isIEWidthAuto) {
                                        CSS.setPropertyValue(element, "width", "auto"); /* SET */
                                    }

                                    if (isIEHeightAuto) {
                                        CSS.setPropertyValue(element, "height", "auto"); /* SET */
                                    }
                                    /* For other browsers, additional layout thrashing must unfortunately be triggered to determine whether a dimension property was originally "auto". */
                                } else {
                                    /* Set height to "auto" then compare the returned value against the element's current height value.
                                     If they're identical, leave height set to "auto". If they're different, then "auto" wasn't originally
                                     set on the element prior to our conversions, and we revert it to its actual value. */
                                    /* Note: The following GETs and SETs cannot be batched together due to the cross-effect setting one axis to "auto" has on the other. */
                                    CSS.setPropertyValue(element, "height", "auto"); /* SET */
                                    if (originalValues.height !== CSS.getPropertyValue(element, "height", null, true)) { /* GET */
                                        CSS.setPropertyValue(element, "height", originalValues.height); /* SET */
                                    }

                                    CSS.setPropertyValue(element, "width", "auto"); /* SET */
                                    if (originalValues.width !== CSS.getPropertyValue(element, "width", null, true)) { /* GET */
                                        CSS.setPropertyValue(element, "width", originalValues.width); /* SET */
                                    }
                                }
                            }

                            if (Velocity.debug >= 1) console.log("Unit ratios: " + JSON.stringify(elementUnitRatios), element);

                            return elementUnitRatios;
                        }

                        /* The * and / operators, which are not passed in with an associated unit, inherently use startValue's unit. Skip value and unit conversion. */
                        if (/[\/*]/.test(operator)) {
                            endValueUnitType = startValueUnitType;
                            /* If startValue and endValue differ in unit type, convert startValue into the same unit type as endValue so that if endValueUnitType
                             is a relative unit (%, em, rem), the values set during tweening will continue to be accurately relative even if the metrics they depend
                             on are dynamically changing during the course of the animation. Conversely, if we always normalized into px and used px for setting values, the px ratio
                             would become stale if the original unit being animated toward was relative and the underlying metrics change during the animation. */
                            /* Since 0 is 0 in any unit type, no conversion is necessary when startValue is 0 -- we just start at 0 with endValueUnitType. */
                        } else if ((startValueUnitType !== endValueUnitType) && startValue !== 0) {
                            /* Unit conversion is also skipped when endValue is 0, but *startValueUnitType* must be used for tween values to remain accurate. */
                            /* Note: Skipping unit conversion here means that if endValueUnitType was originally a relative unit, the animation won't relatively
                             match the underlying metrics if they change, but this is acceptable since we're animating toward invisibility instead of toward visibility,
                             which remains past the point of the animation's completion. */
                            if (endValue === 0) {
                                endValueUnitType = startValueUnitType;
                            } else {
                                /* By this point, we cannot avoid unit conversion (it's undesirable since it causes layout thrashing).
                                 If we haven't already, we trigger calculateUnitRatios(), which runs once per element per call. */
                                elementUnitRatios = elementUnitRatios || calculateUnitRatios();

                                /* The following RegEx matches CSS properties that have their % values measured relative to the x-axis. */
                                /* Note: W3C spec mandates that all of margin and padding's properties (even top and bottom) are %-relative to the *width* of the parent element. */
                                var axis = (/margin|padding|left|right|width|text|word|letter/i.test(property) || /X$/.test(property)) ? "x" : "y";

                                /* In order to avoid generating n^2 bespoke conversion functions, unit conversion is a two-step process:
                                 1) Convert startValue into pixels. 2) Convert this new pixel value into endValue's unit type. */
                                switch (startValueUnitType) {
                                    case "%":
                                        /* Note: translateX and translateY are the only properties that are %-relative to an element's own dimensions -- not its parent's dimensions.
                                         Velocity does not include a special conversion process to account for this behavior. Therefore, animating translateX/Y from a % value
                                         to a non-% value will produce an incorrect start value. Fortunately, this sort of cross-unit conversion is rarely done by users in practice. */
                                        startValue *= (axis === "x" ? elementUnitRatios.percentToPxRatioWidth : elementUnitRatios.percentToPxRatioHeight);
                                        break;

                                    case "px":
                                        /* px acts as our midpoint in the unit conversion process; do nothing. */
                                        break;

                                    default:
                                        startValue *= elementUnitRatios[startValueUnitType + "ToPx"];
                                }

                                /* Invert the px ratios to convert into to the target unit. */
                                switch (endValueUnitType) {
                                    case "%":
                                        startValue *= 1 / (axis === "x" ? elementUnitRatios.percentToPxRatioWidth : elementUnitRatios.percentToPxRatioHeight);
                                        break;

                                    case "px":
                                        /* startValue is already in px, do nothing; we're done. */
                                        break;

                                    default:
                                        startValue *= 1 / elementUnitRatios[endValueUnitType + "ToPx"];
                                }
                            }
                        }

                        /***********************
                         Value Operators
                         ***********************/

                        /* Operator logic must be performed last since it requires unit-normalized start and end values. */
                        /* Note: Relative *percent values* do not behave how most people think; while one would expect "+=50%"
                         to increase the property 1.5x its current value, it in fact increases the percent units in absolute terms:
                         50 points is added on top of the current % value. */
                        switch (operator) {
                            case "+":
                                endValue = startValue + endValue;
                                break;

                            case "-":
                                endValue = startValue - endValue;
                                break;

                            case "*":
                                endValue = startValue * endValue;
                                break;

                            case "/":
                                endValue = startValue / endValue;
                                break;
                        }

                        /**************************
                         tweensContainer Push
                         **************************/

                        /* Construct the per-property tween object, and push it to the element's tweensContainer. */
                        tweensContainer[property] = {
                            rootPropertyValue: rootPropertyValue,
                            startValue: startValue,
                            currentValue: startValue,
                            endValue: endValue,
                            unitType: endValueUnitType,
                            easing: easing
                        };

                        if (Velocity.debug) console.log("tweensContainer (" + property + "): " + JSON.stringify(tweensContainer[property]), element);
                    }

                    /* Along with its property data, store a reference to the element itself onto tweensContainer. */
                    tweensContainer.element = element;
                }

                /*****************
                 Call Push
                 *****************/

                /* Note: tweensContainer can be empty if all of the properties in this call's property map were skipped due to not
                 being supported by the browser. The element property is used for checking that the tweensContainer has been appended to. */
                if (tweensContainer.element) {
                    /* Apply the "velocity-animating" indicator class. */
                    CSS.Values.addClass(element, "velocity-animating");

                    /* The call array houses the tweensContainers for each element being animated in the current call. */
                    call.push(tweensContainer);

                    /* Store the tweensContainer on the element, plus the current call's opts so that Velocity can reference this data the next time this element is animated. */
                    Data(element).tweensContainer = tweensContainer;
                    Data(element).opts = opts;
                    /* Switch on the element's animating flag. */
                    Data(element).isAnimating = true;

                    /* Once the final element in this call's element set has been processed, push the call array onto
                     Velocity.State.calls for the animation tick to immediately begin processing. */
                    if (elementsIndex === elementsLength - 1) {
                        /* To speed up iterating over this array, it is compacted (falsey items -- calls that have completed -- are removed)
                         when its length has ballooned to a point that can impact tick performance. This only becomes necessary when animation
                         has been continuous with many elements over a long period of time; whenever all active calls are completed, completeCall() clears Velocity.State.calls. */
                        if (Velocity.State.calls.length > 10000) {
                            Velocity.State.calls = compactSparseArray(Velocity.State.calls);
                        }

                        /* Add the current call plus its associated metadata (the element set and the call's options) onto the global call container.
                         Anything on this call container is subjected to tick() processing. */
                        Velocity.State.calls.push([ call, elements, opts, null, promiseData.resolver ]);

                        /* If the animation tick isn't running, start it. (Velocity shuts it off when there are no active calls to process.) */
                        if (Velocity.State.isTicking === false) {
                            Velocity.State.isTicking = true;

                            /* Start the tick loop. */
                            tick();
                        }
                    } else {
                        elementsIndex++;
                    }
                }
            }

            /* When the queue option is set to false, the call skips the element's queue and fires immediately. */
            if (opts.queue === false) {
                /* Since this buildQueue call doesn't respect the element's existing queue (which is where a delay option would have been appended),
                 we manually inject the delay property here with an explicit setTimeout. */
                if (opts.delay) {
                    setTimeout(buildQueue, opts.delay);
                } else {
                    buildQueue();
                }
                /* Otherwise, the call undergoes element queueing as normal. */
                /* Note: To interoperate with jQuery, Velocity uses jQuery's own $.queue() stack for queuing logic. */
            } else {
                $.queue(element, opts.queue, function(next, clearQueue) {
                    /* If the clearQueue flag was passed in by the stop command, resolve this call's promise. (Promises can only be resolved once,
                     so it's fine if this is repeatedly triggered for each element in the associated call.) */
                    if (clearQueue === true) {
                        if (promiseData.promise) {
                            promiseData.resolver(elements);
                        }

                        /* Do not continue with animation queueing. */
                        return true;
                    }

                    /* This flag indicates to the upcoming completeCall() function that this queue entry was initiated by Velocity.
                     See completeCall() for further details. */
                    Velocity.velocityQueueEntryFlag = true;

                    buildQueue(next);
                });
            }

            /*********************
             Auto-Dequeuing
             *********************/

            /* As per jQuery's $.queue() behavior, to fire the first non-custom-queue entry on an element, the element
             must be dequeued if its queue stack consists *solely* of the current call. (This can be determined by checking
             for the "inprogress" item that jQuery prepends to active queue stack arrays.) Regardless, whenever the element's
             queue is further appended with additional items -- including $.delay()'s or even $.animate() calls, the queue's
             first entry is automatically fired. This behavior contrasts that of custom queues, which never auto-fire. */
            /* Note: When an element set is being subjected to a non-parallel Velocity call, the animation will not begin until
             each one of the elements in the set has reached the end of its individually pre-existing queue chain. */
            /* Note: Unfortunately, most people don't fully grasp jQuery's powerful, yet quirky, $.queue() function.
             Lean more here: http://stackoverflow.com/questions/1058158/can-somebody-explain-jquery-queue-to-me */
            if ((opts.queue === "" || opts.queue === "fx") && $.queue(element)[0] !== "inprogress") {
                $.dequeue(element);
            }
        }

        /**************************
         Element Set Iteration
         **************************/

        /* If the "nodeType" property exists on the elements variable, we're animating a single element.
         Place it in an array so that $.each() can iterate over it. */
        $.each(Type.isNode(elements) ? [ elements ] : elements, function(i, element) {
            /* Ensure each element in a set has a nodeType (is a real element) to avoid throwing errors. */
            if (Type.isNode(element)) {
                processElement.call(element);
            }
        });

        /******************
         Option: Loop
         ******************/

        /* The loop option accepts an integer indicating how many times the element should loop between the values in the
         current call's properties map and the element's property values prior to this call. */
        /* Note: The loop option's logic is performed here -- after element processing -- because the current call needs
         to undergo its queue insertion prior to the loop option generating its series of constituent "reverse" calls,
         which chain after the current call. Two reverse calls (two "alternations") constitute one loop. */
        var opts = $.extend({}, Velocity.defaults, options),
            reverseCallsCount;

        opts.loop = parseInt(opts.loop);
        reverseCallsCount = (opts.loop * 2) - 1;

        if (opts.loop) {
            /* Double the loop count to convert it into its appropriate number of "reverse" calls.
             Subtract 1 from the resulting value since the current call is included in the total alternation count. */
            for (var x = 0; x < reverseCallsCount; x++) {
                /* Since the logic for the reverse action occurs inside Queueing and therefore this call's options object
                 isn't parsed until then as well, the current call's delay option must be explicitly passed into the reverse
                 call so that the delay logic that occurs inside *Pre-Queueing* can process it. */
                var reverseOptions = {
                    delay: opts.delay
                };

                /* If a complete callback was passed into this call, transfer it to the loop sequence's final "reverse" call
                 so that it's triggered when the entire sequence is complete (and not when the very first animation is complete). */
                if (opts.complete && (x === reverseCallsCount - 1)) {
                    reverseOptions.complete = opts.complete;
                }

                Velocity.animate(elements, "reverse", reverseOptions);
            }
        }

        /***************
         Chaining
         ***************/

        /* Return the elements back to the call chain, with wrapped elements taking precedence in case Velocity was called via the $.fn. extension. */
        return getChain();
    };

    /*****************************
     Tick (Calls Processing)
     *****************************/

    /* Note: All calls to Velocity are pushed to the Velocity.State.calls array, which is fully iterated through upon each tick. */
    function tick (timestamp) {
        /* An empty timestamp argument indicates that this is the first tick occurence since ticking was turned on.
         We leverage this metadata to fully ignore the first tick pass since RAF's initial pass is fired whenever
         the browser's next tick sync time occurs, which results in the first elements subjected to Velocity
         calls being animated out of sync with any elements animated immediately thereafter. In short, we ignore
         the first RAF tick pass so that elements being immediately consecutively animated -- instead of simultaneously animated
         by the same Velocity call -- are properly batched into the same initial RAF tick and consequently remain in sync thereafter. */
        if (timestamp) {
            /* We ignore RAF's high resolution timestamp since it can be significantly offset when the browser is
             under high stress; we opt for choppiness over allowing the browser to drop huge chunks of frames. */
            var timeCurrent = (new Date).getTime();

            /********************
             Call Iteration
             ********************/

            /* Iterate through each active call. */
            for (var i = 0, callsLength = Velocity.State.calls.length; i < callsLength; i++) {
                /* When a velocity call is completed, its Velocity.State.calls entry is set to false. Continue on to the next call. */
                if (!Velocity.State.calls[i]) {
                    continue;
                }

                /************************
                 Call-Wide Variables
                 ************************/

                var callContainer = Velocity.State.calls[i],
                    call = callContainer[0],
                    opts = callContainer[2],
                    timeStart = callContainer[3];

                /* If timeStart is undefined, then this is the first time that this call has been processed by tick().
                 We assign timeStart now so that its value is as close to the real animation start time as possible.
                 (Conversely, had timeStart been defined when this call was added to Velocity.State.calls, the delay
                 between that time and now would cause the first few frames of the tween to be skipped since
                 percentComplete is calculated relative to timeStart.) */
                /* Further, subtract 16ms (the approximate resolution of RAF) from the current time value so that the
                 first tick iteration isn't wasted by animating at 0% tween completion, which would produce the
                 same style value as the element's current value. */
                if (!timeStart) {
                    timeStart = Velocity.State.calls[i][3] = timeCurrent - 16;
                }

                /* The tween's completion percentage is relative to the tween's start time, not the tween's start value
                 (which would result in unpredictable tween durations since JavaScript's timers are not particularly accurate).
                 Accordingly, we ensure that percentComplete does not exceed 1. */
                var percentComplete = Math.min((timeCurrent - timeStart) / opts.duration, 1);

                /**********************
                 Element Iteration
                 **********************/

                /* For every call, iterate through each of the elements in its set. */
                for (var j = 0, callLength = call.length; j < callLength; j++) {
                    var tweensContainer = call[j],
                        element = tweensContainer.element;

                    /* Check to see if this element has been deleted midway through the animation by checking for the
                     continued existence of its data cache. If it's gone, skip animating this element. */
                    if (!Data(element)) {
                        continue;
                    }

                    var transformPropertyExists = false;

                    /**********************************
                     Display & Visibility Toggling
                     **********************************/

                    /* If the display option is set to non-"none", set it upfront so that the element can become visible before tweening begins.
                     (Otherwise, display's "none" value is set in completeCall() once the animation has completed.) */
                    if (opts.display && opts.display !== "none") {
                        CSS.setPropertyValue(element, "display", opts.display);
                    }

                    /* Same goes with the visibility option, but its "none" equivalent is "hidden". */
                    if (opts.visibility && opts.visibility !== "hidden") {
                        CSS.setPropertyValue(element, "visibility", opts.visibility);
                    }

                    /************************
                     Property Iteration
                     ************************/

                    /* For every element, iterate through each property. */
                    for (var property in tweensContainer) {
                        /* Note: In addition to property tween data, tweensContainer contains a reference to its associated element. */
                        if (property !== "element") {
                            var tween = tweensContainer[property],
                                currentValue,
                            /* Easing can either be a pre-genereated function or a string that references a pre-registered easing
                             on the Velocity.Easings object. In either case, return the appropriate easing *function*. */
                                easing = Type.isString(tween.easing) ? Velocity.Easings[tween.easing] : tween.easing;

                            /******************************
                             Current Value Calculation
                             ******************************/

                            /* If this is the last tick pass (if we've reached 100% completion for this tween),
                             ensure that currentValue is explicitly set to its target endValue so that it's not subjected to any rounding. */
                            if (percentComplete === 1) {
                                currentValue = tween.endValue;
                                /* Otherwise, calculate currentValue based on the current delta from startValue. */
                            } else {
                                currentValue = tween.startValue + ((tween.endValue - tween.startValue) * easing(percentComplete));
                            }

                            tween.currentValue = currentValue;

                            /******************
                             Hooks: Part I
                             ******************/

                            /* For hooked properties, the newly-updated rootPropertyValueCache is cached onto the element so that it can be used
                             for subsequent hooks in this call that are associated with the same root property. If we didn't cache the updated
                             rootPropertyValue, each subsequent update to the root property in this tick pass would reset the previous hook's
                             updates to rootPropertyValue prior to injection. A nice performance byproduct of rootPropertyValue caching is that
                             subsequently chained animations using the same hookRoot but a different hook can use this cached rootPropertyValue. */
                            if (CSS.Hooks.registered[property]) {
                                var hookRoot = CSS.Hooks.getRoot(property),
                                    rootPropertyValueCache = Data(element).rootPropertyValueCache[hookRoot];

                                if (rootPropertyValueCache) {
                                    tween.rootPropertyValue = rootPropertyValueCache;
                                }
                            }

                            /*****************
                             DOM Update
                             *****************/

                            /* setPropertyValue() returns an array of the property name and property value post any normalization that may have been performed. */
                            /* Note: To solve an IE<=8 positioning bug, the unit type is dropped when setting a property value of 0. */
                            var adjustedSetData = CSS.setPropertyValue(element, /* SET */
                                property,
                                tween.currentValue + (parseFloat(currentValue) === 0 ? "" : tween.unitType),
                                tween.rootPropertyValue,
                                tween.scrollData);

                            /*******************
                             Hooks: Part II
                             *******************/

                            /* Now that we have the hook's updated rootPropertyValue (the post-processed value provided by adjustedSetData), cache it onto the element. */
                            if (CSS.Hooks.registered[property]) {
                                /* Since adjustedSetData contains normalized data ready for DOM updating, the rootPropertyValue needs to be re-extracted from its normalized form. ?? */
                                if (CSS.Normalizations.registered[hookRoot]) {
                                    Data(element).rootPropertyValueCache[hookRoot] = CSS.Normalizations.registered[hookRoot]("extract", null, adjustedSetData[1]);
                                } else {
                                    Data(element).rootPropertyValueCache[hookRoot] = adjustedSetData[1];
                                }
                            }

                            /***************
                             Transforms
                             ***************/

                            /* Flag whether a transform property is being animated so that flushTransformCache() can be triggered once this tick pass is complete. */
                            if (adjustedSetData[0] === "transform") {
                                transformPropertyExists = true;
                            }
                        }
                    }

                    /****************
                     mobileHA
                     ****************/

                    /* If mobileHA is enabled, set the translate3d transform to null to force hardware acceleration.
                     It's safe to override this property since Velocity doesn't actually support its animation (hooks are used in its place). */
                    if (opts.mobileHA) {
                        /* Don't set the null transform hack if we've already done so. */
                        if (Data(element).transformCache.translate3d === undefined) {
                            /* All entries on the transformCache object are later concatenated into a single transform string via flushTransformCache(). */
                            Data(element).transformCache.translate3d = "(0px, 0px, 0px)";

                            transformPropertyExists = true;
                        }
                    }

                    if (transformPropertyExists) {
                        CSS.flushTransformCache(element);
                    }
                }

                /* The non-"none" display value is only applied to an element once -- when its associated call is first ticked through.
                 Accordingly, it's set to false so that it isn't re-processed by this call in the next tick. */
                if (opts.display && opts.display !== "none") {
                    Velocity.State.calls[i][2].display = false;
                }

                if (opts.visibility && opts.visibility !== "hidden") {
                    Velocity.State.calls[i][2].visibility = false;
                }

                /* Pass the elements and the timing data (percentComplete, msRemaining, and timeStart) into the progress callback. */
                if (opts.progress) {
                    opts.progress.call(callContainer[1],
                        callContainer[1],
                        percentComplete,
                        Math.max(0, (timeStart + opts.duration) - timeCurrent),
                        timeStart);
                }

                /* If this call has finished tweening, pass its index to completeCall() to handle call cleanup. */
                if (percentComplete === 1) {
                    completeCall(i);
                }
            }
        }

        /* Note: completeCall() sets the isTicking flag to false when the last call on Velocity.State.calls has completed. */
        if (Velocity.State.isTicking) {
            rAF(tick);
        }
    }

    /**********************
     Call Completion
     **********************/

    /* Note: Unlike tick(), which processes all active calls at once, call completion is handled on a per-call basis. */
    function completeCall (callIndex, isStopped) {
        /* Ensure the call exists. */
        if (!Velocity.State.calls[callIndex]) {
            return false;
        }

        /* Pull the metadata from the call. */
        var call = Velocity.State.calls[callIndex][0],
            elements = Velocity.State.calls[callIndex][1],
            opts = Velocity.State.calls[callIndex][2],
            resolver = Velocity.State.calls[callIndex][4];

        var remainingCallsExist = false;

        /*************************
         Element Finalization
         *************************/

        for (var i = 0, callLength = call.length; i < callLength; i++) {
            var element = call[i].element;

            /* If the user set display to "none" (intending to hide the element), set it now that the animation has completed. */
            /* Note: display:none isn't set when calls are manually stopped (via Velocity.animate("stop"). */
            /* Note: Display is ignored with "reverse" calls, which is what loops are composed of, since this behavior would be undesirable. */
            if (!isStopped && !opts.loop) {
                if (opts.display === "none") {
                    CSS.setPropertyValue(element, "display", opts.display);
                }

                if (opts.visibility === "hidden") {
                    CSS.setPropertyValue(element, "visibility", opts.visibility);
                }
            }

            /* If the element's queue is empty (if only the "inprogress" item is left at position 0) or if its queue is about to run
             a non-Velocity-initiated entry, turn off the isAnimating flag. A non-Velocity-initiatied queue entry's logic might alter
             an element's CSS values and thereby cause Velocity's cached value data to go stale. To detect if a queue entry was initiated by Velocity,
             we check for the existence of our special Velocity.queueEntryFlag declaration, which minifiers won't rename since the flag
             is assigned to jQuery's global $ object and thus exists out of Velocity's own scope. */
            if ($.queue(element)[1] === undefined || !/\.velocityQueueEntryFlag/i.test($.queue(element)[1])) {
                /* The element may have been deleted. Ensure that its data cache still exists before acting on it. */
                if (Data(element)) {
                    Data(element).isAnimating = false;
                    /* Clear the element's rootPropertyValueCache, which will become stale. */
                    Data(element).rootPropertyValueCache = {};

                    var transformHAPropertyExists = false;
                    /* If any transform subproperty is at its default value (regardless of unit type), remove it. This has the
                     dual benefit of avoiding random browser transform bugs and removing hardware acceleration to free up RAM. */
                    $.each(Data(element).transformCache, function(transformName, transformValue) {
                        var defaultValue = /^scale/.test(transformName) ? 1 : 0;

                        if (new RegExp("^\\(" + defaultValue + "[^.]").test(transformValue)) {
                            transformHAPropertyExists = true;
                            delete Data(element).transformCache[transformName];
                        }
                    });

                    /* Mobile devices have hardware acceleration removed at the end of the animation in order to avoid hogging the GPU's memory. */
                    if (opts.mobileHA) {
                        transformHAPropertyExists = true;
                        delete Data(element).transformCache.translate3d;
                    }

                    /* Flush the subproperty removals to the DOM. */
                    if (transformHAPropertyExists) {
                        CSS.flushTransformCache(element);
                    }

                    /* Remove the "velocity-animating" indicator class. */
                    CSS.Values.removeClass(element, "velocity-animating");
                }
            }

            /*********************
             Option: Complete
             *********************/

            /* Complete is fired once per call (not once per element) and is passed the full raw DOM element set as both its context and its first argument. */
            /* Note: Callbacks aren't fired when calls are manually stopped (via Velocity.animate("stop"). */
            /* Note: If this is a loop, complete callback firing is only triggered on the loop's final reverse call. */
            if (!isStopped && opts.complete && !opts.loop && (i === callLength - 1)) {
                /* We throw callbacks in a setTimeout so that thrown errors don't halt the execution of Velocity itself. */
                try {
                    opts.complete.call(elements, elements);
                } catch (error) {
                    setTimeout(function() {
                        throw error;
                    }, 1);
                }
            }

            /**********************
             Promise Resolving
             **********************/

            if (resolver) {
                resolver(elements);
            }

            /***************
             Dequeueing
             ***************/

            /* Fire the next call in the queue so long as this call's queue wasn't set to false (to trigger a parallel animation),
             which would have already caused the next call to fire. Note: Even if the end of the animation queue has been reached,
             $.dequeue() must still be called in order to completely clear jQuery's animation queue. */
            if (opts.queue !== false) {
                $.dequeue(element, opts.queue);
            }
        }

        /************************
         Calls Array Cleanup
         ************************/

        /* Since this call is complete, set it to false so that the rAF tick skips it. This array is later compacted via compactSparseArray().
         (For performance reasons, the call is set to false instead of being deleted from the array: http://www.html5rocks.com/en/tutorials/speed/v8/) */
        Velocity.State.calls[callIndex] = false;

        /* Iterate through the calls array to determine if this was the final in-progress animation.
         If so, set a flag to end ticking and clear the calls array. */
        for (var j = 0, callsLength = Velocity.State.calls.length; j < callsLength; j++) {
            if (Velocity.State.calls[j] !== false) {
                remainingCallsExist = true;

                break;
            }
        }

        if (remainingCallsExist === false) {
            /* tick() will detect this flag upon its next iteration and subsequently turn itself off. */
            Velocity.State.isTicking = false;

            /* Clear the calls array so that its length is reset. */
            delete Velocity.State.calls;
            Velocity.State.calls = [];
        }
    }

    /*******************
     Installation
     *******************/

    /* Both jQuery and Zepto allow their $.fn object to be extended to allow wrapped elements to be subjected to plugin calls.
     If either framework is loaded, register a "velocity" extension pointing to Velocity's core animate() method. */
    var framework = window.jQuery || window.Zepto;

    if (framework) {
        /* Assign the object function to Velocity's animate() method. */
        framework.fn.velocity = Velocity.animate;

        /* Assign the object function's defaults to Velocity's global defaults object. */
        framework.fn.velocity.defaults = Velocity.defaults;
    }

    // Commented out because of mismatched define function
    /* Support for AMD and CommonJS module loaders. */
    // if (typeof define !== "undefined" && define.amd) {
    //     define(function() { return Velocity; });
    // } else if (typeof module !== "undefined" && module.exports) {
    //     module.exports = Velocity;
    // }
    if (typeof module !== "undefined" && module.exports) {
        module.exports = Velocity;
    }

    /***********************
     Packaged Sequences
     ***********************/

    /* slideUp, slideDown */
    $.each([ "Down", "Up" ], function(i, direction) {
        Velocity.Sequences["slide" + direction] = function (element, options) {
            var opts = $.extend({}, options),
                originalValues = {
                    height: null,
                    marginTop: null,
                    marginBottom: null,
                    paddingTop: null,
                    paddingBottom: null,
                    overflow: null,
                    overflowX: null,
                    overflowY: null
                },
            /* Since the slide functions make use of the begin and complete callbacks, the user's custom callbacks are stored
             upfront for triggering once slideDown/Up's own callback logic is complete. */
                begin = opts.begin,
                complete = opts.complete,
                isHeightAuto = false;

            /* Allow the user to set display to null to bypass display toggling. */
            if (opts.display !== null) {
                /* Unless the user is overriding the display value, show the element before slideDown begins and hide the element after slideUp completes. */
                if (direction === "Down") {
                    /* All sliding elements are set to the "block" display value (as opposed to an element-appropriate block/inline distinction)
                     because inline elements cannot actually have their dimensions modified. */
                    opts.display = opts.display || "auto";
                } else {
                    opts.display = opts.display || "none";
                }
            }

            /* Begin callback. */
            opts.begin = function () {
                /* Check for height: "auto" so we can revert back to it when the sliding animation is complete. */
                function checkHeightAuto() {
                    originalValues.height = parseFloat(Velocity.CSS.getPropertyValue(element, "height"));

                    /* Determine if height was originally "auto" by checking if the computed "auto" value is identical to the original value. */
                    element.style.height = "auto";
                    if (parseFloat(Velocity.CSS.getPropertyValue(element, "height")) === originalValues.height) {
                        isHeightAuto = true;
                    }

                    /* Revert to the computed value before sliding begins to prevent vertical popping due to scrollbars. */
                    Velocity.CSS.setPropertyValue(element, "height", originalValues.height + "px");
                }

                if (direction === "Down") {
                    originalValues.overflow = [ Velocity.CSS.getPropertyValue(element, "overflow"), 0 ];
                    originalValues.overflowX = [ Velocity.CSS.getPropertyValue(element, "overflowX"), 0 ];
                    originalValues.overflowY = [ Velocity.CSS.getPropertyValue(element, "overflowY"), 0 ];

                    /* Ensure the element is visible, and temporarily remove vertical scrollbars since animating them is visually unappealing. */
                    element.style.overflow = "hidden";
                    element.style.overflowX = "visible";
                    element.style.overflowY = "hidden";

                    /* With the scrollars no longer affecting sizing, determine whether the element is currently height: "auto". */
                    checkHeightAuto();

                    /* Cache the elements' original vertical dimensional values so that we can animate back to them. */
                    for (var property in originalValues) {
                        /* Overflow values have already been cached; do not overwrite them with "hidden". */
                        if (/^overflow/.test(property)) {
                            continue;
                        }

                        var propertyValue = Velocity.CSS.getPropertyValue(element, property);

                        if (property === "height") {
                            propertyValue = parseFloat(propertyValue);
                        }

                        /* Use forcefeeding to animate slideDown properties from 0. */
                        originalValues[property] = [ propertyValue, 0 ];
                    }
                } else {
                    checkHeightAuto();

                    for (var property in originalValues) {
                        var propertyValue = Velocity.CSS.getPropertyValue(element, property);

                        if (property === "height") {
                            propertyValue = parseFloat(propertyValue);
                        }

                        /* Use forcefeeding to animate slideUp properties toward 0. */
                        originalValues[property] = [ 0, propertyValue ];
                    }

                    /* Both directions hide scrollbars since scrollbar height tweening looks unappealing. */
                    element.style.overflow = "hidden";
                    element.style.overflowX = "visible";
                    element.style.overflowY = "hidden";
                }

                /* If the user passed in a begin callback, fire it now. */
                if (begin) {
                    begin.call(element, element);
                }
            }

            /* Complete callback. */
            opts.complete = function (element) {
                var propertyValuePosition = (direction === "Down") ? 0 : 1;

                if (isHeightAuto === true) {
                    /* If the element's height was originally set to auto, overwrite the computed value with "auto". */
                    originalValues.height[propertyValuePosition] = "auto";
                } else {
                    originalValues.height[propertyValuePosition] += "px";
                }

                /* Reset element to its original values once its slide animation is complete: For slideDown, overflow
                 values are reset. For slideUp, all values are reset (since they were animated to 0).) */
                for (var property in originalValues) {
                    element.style[property] = originalValues[property][propertyValuePosition];
                }

                /* If the user passed in a complete callback, fire it now. */
                if (complete) {
                    complete.call(element, element);
                }
            };

            /* Animation triggering. */
            Velocity.animate(element, originalValues, opts);
        };
    });

    /* fadeIn, fadeOut */
    $.each([ "In", "Out" ], function(i, direction) {
        Velocity.Sequences["fade" + direction] = function (element, options, elementsIndex, elementsSize) {
            var opts = $.extend({}, options),
                propertiesMap = {
                    opacity: (direction === "In") ? 1 : 0
                };

            /* Since sequences are triggered individually for each element in the animated set, avoid repeatedly triggering
             callbacks by firing them only when the final element has been reached. */
            if (elementsIndex !== elementsSize - 1) {
                opts.complete = opts.begin = null;
            }

            /* If a display was passed in, use it. Otherwise, default to "none" for fadeOut or the element-specific default for fadeIn. */
            /* Note: We allow users to pass in "null" to skip display setting altogether. */
            if (opts.display !== null) {
                opts.display = opts.display || ((direction === "In") ? "auto" : "none");
            }

            Velocity.animate(this, propertiesMap, opts);
        };
    });
})((window.jQuery || window.Zepto || window), window, document);

/******************
 Known Issues
 ******************/

/* When animating height/width to a % value on an element *without* box-sizing:border-box and *with* visible scrollbars
 on *both* axes, the opposite axis (e.g. height vs width) will be shortened by the height/width of its scrollbar. */

/* The CSS spec mandates that the translateX/Y/Z transforms are %-relative to the element itself -- not its parent.
 Velocity, however, doesn't make this distinction. Thus, converting to or from the % unit with these subproperties
 will produce an inaccurate conversion value. The same issue exists with the cx/cy attributes of SVG circles and ellipses. */;/**
 * asms function package
 *
 * @uses jQuery
 * @author Steve Junker <steve.junker@axelspringer.de>
 *
 * @version Added getMonthName, jQuery
 *          Added addUrlParameter function
 *          Added addZero function
 */
var asms = (function ($, window, document, undefined) {
    var jQuery = $;

    var methods = {

        /**
         * Use asms.jQuery everytime
         */
        jQuery: function () {
            return jQuery;
        },

        extend: function (obj, name, val) {
            obj[name] = val;
        },

        /**
         * Predefined namespace structure
         */
        general: {
            ece: {
                widgets: {

                },
                unittests: {
                    enabled: false
                }
            },
            config: {

            }
        },
        pub: {
            won: {
                ece: {
                    widgets: {

                    }
                }
            },
            bmo: {
                ece: {
                    widgets: {

                    }
                }
            },
            hao: {
                ece: {
                    widgets: {

                    }
                }
            }
        },
        tests: {

        },

        /**
         * Returns the article id from url
         * @returns int | false
         */
        getArticleIdFromUrl: function (url) {
            var url = url || window.location.href;
            var match = url.match(/(?:article)(\d+)/i);

            if (null === match || undefined === match[1]) {
                return false;
            } else {
                return parseInt(match[1]);
            }
        },

        /**
         * Adds a parameter to an url,
         * checks for existing parameter
         *
         * @param string parameter E. g. config=print
         * @param string url Just a string
         *
         * @returns string
         */
        addUrlParameter: function (parameter, url) {
            var parameter = parameter || 'config=print';
            var url = url || window.location.href;

            // '?' was not found
            if (-1 == url.indexOf('?')) {
                url += '?' + parameter;
                // '?' was found so a parameter exists just add the parameter
            } else {
                url += '&' + parameter;
            }
            return url;
        },

        /**
         * Checks if the page is static
         * @returns boolean
         */
        isStaticPage: function () {
            if (0 < $('link[href*="static.css"]').length) {
                return true;
            } else {
                return false;
            }
        },

        /**
         * Loads a css file via url
         * @param string Url
         * @param string CSS id
         *
         * @return boolean
         */
        loadCssFromUrl: function (url, id) {
            if (undefined === url
                || 0 == url.length
                ) {
                throw {
                    name: 'Url undefined',
                    message: 'Url is  not defined or length is 0.'
                };
            }

            var css = document.createElement('link');
            css.type = "text/css";
            css.rel = "stylesheet";
            css.href = url;

            if (undefined !== id
                && 0 < id.length
                ) {
                css.id = id;
            }

            document.getElementsByTagName('head')[0].appendChild(css);

            return true;
        },

        /**
         * Returns the german name of a month index
         *
         * @param int month 0-11
         * @param string long|short|letter
         *
         * @returns string German name of the month
         * @throws exception
         */
        getMonthName: function (month, type) {
            month = parseInt(month);

            if (true === isNaN(month)
                || 11 < month
                || 0 > month
                ) {
                throw {
                    name: 'Index out of bounce',
                    message: 'Month index is not correct (0 - 11).'
                };
            }

            var monthShort = ["Jan", "Feb", "Mrz", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
            var monthLong = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

            switch (type) {
                case 'letter' :
                    return monthShort[month][0];
                case 'long' :
                    return monthLong[month];
                case 'short' :
                default:
                    return monthShort[month];
            }

        },

        /**
         * Adds a 0 to a number if it is > 0 and < 10
         *
         * @param int value
         *
         * @return string|int
         */
        addZero: function (number) {
            if (10 > number
                && 0 < number
                ) {
                number = '0' + number;
            }

            return number;
        },

        /**
         * Returns the count of days between to dates
         *
         * @param string format 25.12.2012 or 2012/12/25
         * @param string format 25.12.2012 or 2012/12/25
         *
         * @return int
         */
        getDaysBetween: function (today, yesterday) {
            // date format 2012/12/25
            if (-1 < today.indexOf('.')) {
                today = today.split('.');
                today = today.reverse().join('/');
            }

            // date format 2012/12/25
            if (-1 < yesterday.indexOf('.')) {
                yesterday = yesterday.split('.');
                yesterday = yesterday.reverse().join('/');
            }

            var dt = new Date(today);
            var dl = new Date(yesterday);

            var days = Math.round(Math.abs(dt.getTime() - dl.getTime()) / 1000 / 60 / 60 / 24);

            return days;
        },

        /**
         * Returns the date in different formats
         * e. g. 25.12.2012 or 25. Dez 2012 or 25. Dezember 2012
         *
         * @uses asms.addZero, asms.getMonthName
         * @param date or format that can be used for new Date()
         * @param string Date format: 'short'|'long'
         *
         * @return string
         */
        formatDate: function (date, format) {
            if ('object' != typeof date
                || 'function' != typeof date.getDate
                ) {
                date = new Date(date);
            }

            var day = asms.addZero(date.getDate());
            var month = date.getMonth();
            var year = date.getFullYear();

            if (undefined !== format) {
                month = ' ' + asms.getMonthName(month, format) + ' ';
            } else {
                month = asms.addZero(month + 1) + '.';
            }

            return day + '.' + month + year;
        }
    };

    // ASMS Logger
    function LoggerManagerClass(pOptions) {
        var _that = this;

        // Log Levels

        this.LOGLEVEL_ERROR = 0;
        this.LOGLEVEL_WARN = 1;
        this.LOGLEVEL_INFO = 2;
        this.LOGLEVEL_DEBUG = 3;
        this.LOGLEVEL_TRACE = 4;

        var options = $.extend({
            timestamp: {
                enabled: false
            },
            console: {
                visulize: false
            },
            showLoggerName: true,
            logLevel: this.LOGLEVEL_INFO,
            enabled: false
        }, pOptions);

        var OUTPUT_TYPE_CONSOLE = 0;
        var OUTPUT_TYPE_ALERT = 1;

        var outputType = null;

        var loggers = new Object();

        // privat Helper Funktionen
        var getLogger = function (pLogTag) {
            var logger = loggers[pLogTag];
            if (logger == undefined || logger == null) {
                return null;
            }
            return logger;
        };

        var checkLogLevel = function (pLogLegel) {
            if (pLogLegel == Log.LOGLEVEL_TRACE
                || pLogLegel == Log.LOGLEVEL_DEBUG
                || pLogLegel == Log.LOGLEVEL_INFO
                || pLogLegel == Log.LOGLEVEL_WARN
                || pLogLegel == Log.LOGLEVEL_ERROR
                ) {
                return true;
            }
            return false;
        };

        var createMessage = function (pLogger, pMessageLogLevel, pLogMessage) {
            if (!options.enabled) {
                return undefined;
            }

            if (options.logLevel < pLogger.logLevel) {
                return undefined;
            }

            var message = "";

            if (options.timestamp.enabled && pLogger.timestamp) {
                var timestamp = new Date();

                var t = timestamp.getHours();
                if (t < 10) {
                    t = "0" + t;
                }
                var timestring = t + ":";

                t = timestamp.getMinutes();
                if (t < 10) {
                    t = "0" + t;
                }
                timestring += t + ":";

                t = timestamp.getSeconds();
                if (t < 10) {
                    t = "0" + t;
                }
                timestring += t + ".";

                t = timestamp.getMilliseconds();
                if (t < 10) {
                    t = "0" + t;
                }
                if (t < 100) {
                    t = "0" + t;
                }
                timestring += t;

                message += timestring;
            }

            var logLevel = undefined;
            if (pMessageLogLevel == _that.LOGLEVEL_TRACE) {
                logLevel = "[TRACE]";
            } else if (pMessageLogLevel == _that.LOGLEVEL_DEBUG) {
                logLevel = "[DEBUG]";
            } else if (pMessageLogLevel == _that.LOGLEVEL_INFO) {
                logLevel = " [INFO]";
            } else if (pMessageLogLevel == _that.LOGLEVEL_WARN) {
                logLevel = " [WARN]";
            } else if (pMessageLogLevel == _that.LOGLEVEL_ERROR) {
                logLevel = "[ERROR]";
            }
            if (logLevel != undefined) {
                message += logLevel;
            }

            if (options.showLoggerName && pLogger.showLoggerName) {
                message += message.length == 0 ? pLogger.name : " " + pLogger.name;
            }

            message += message.length == 0 ? pLogMessage : ": " + pLogMessage;
            return message;
        };

        var printMessage = function (message, pMessageLogLevel) {
            if (outputType == OUTPUT_TYPE_CONSOLE) {
                if (options.console.visulize && pLogger.visulize) {
                    if (pMessageLogLevel == Log.LOGLEVEL_TRACE) {
                        console.trace(message);
                    } else if (pMessageLogLevel == Log.LOGLEVEL_DEBUG) {
                        console.debug(message);
                    } else if (pMessageLogLevel == Log.LOGLEVEL_INFO) {
                        console.info(message);
                    } else if (pMessageLogLevel == Log.LOGLEVEL_WARN) {
                        console.warn(message);
                    } else if (pMessageLogLevel == Log.LOGLEVEL_ERROR) {
                        console.warn("%c" + message, "background-color:#ffdddd");
                    }
                } else {
                    console.log(message);
                }
            } else if (outputType == OUTPUT_TYPE_ALERT) {
                alert(message);
            }
        };

        // Logger Verwaltungsfunktionen
        this.register = function (pLogTag, pOptions) {
            if (pLogTag == undefined || pLogTag == null) {
                return;
            }

            var opts = $.extend({
                logLevel: Log.LOGLEVEL_INFO,
                timestamp: false,
                visulize: false,
                showLoggerName: true
            }, pOptions);

            loggers[pLogTag] = {
                name: pLogTag,
                logLevel: opts.logLevel,
                timestamp: opts.timestamp,
                visulize: opts.visulize,
                showLoggerName: opts.showLoggerName
            };
        };

        this.isRegistered = function (pLogTag) {
            var logger = loggers[pLogTag];
            if (logger == undefined || logger == null) {
                return false;
            }
            return true;
        };

        this.remove = function (pLogTag) {
            if (pLogTag == undefined || pLogTag == null) {
                return;
            }

            if (getLogger(pLogTag) == null) {
                return;
            }

            delete loggers[pLogTag];
        };

        this.removeAll = function () {
            if (loggers == undefined || loggers == null) {
                return;
            }
            for (var key in loggers) {
                _that.remove(key);
            }
        };

        this.setLogLevel = function (pLogTag, pLogLevel) {
            if (pLogTag == undefined || pLogTag == null) {
                return;
            }
            if (pLogTag == undefined || pLogLevel == null) {
                return;
            }
            if (checkLogLevel(pLogLevel.logLevel) == false) {
                return;
            }

            var currLogger = getLogger(pLogTag);
            if (currLogger == null) {
                return;
            }

            currLogger.logLevel = pLogLevel;
        };

        this.getOptions = function () {
            return options;
        };

        this.setOptions = function (pOptions) {
            $.extend(options, pOptions);
        };

        // Log Message Funktionen

        this.t = function (pLogTag, pMessage) {
            var logger = getLogger(pLogTag);
            if (logger == null) {
                return;
            }

            var msg = createMessage(logger, this.LOGLEVEL_TRACE, pMessage);
            printMessage(msg, this.LOGLEVEL_TRACE);
        };

        this.d = function (pLogTag, pMessage) {
            var logger = getLogger(pLogTag);
            if (logger == null) {
                return;
            }
            var msg = createMessage(logger, this.LOGLEVEL_DEBUG, pMessage);
            printMessage(msg, this.LOGLEVEL_DEBUG);
        };

        this.i = function (pLogTag, pMessage) {
            var logger = getLogger(pLogTag);
            if (logger == null) {
                return;
            }

            var msg = createMessage(logger, this.LOGLEVEL_INFO, pMessage);
            printMessage(msg, this.LOGLEVEL_INFO);
        };

        this.w = function (pLogTag, pMessage) {
            var logger = getLogger(pLogTag);
            if (logger == null) {
                return;
            }

            var msg = createMessage(logger, this.LOGLEVEL_WARN, pMessage);
            printMessage(msg, this.LOGLEVEL_WARN);
        };

        this.e = function (pLogTag, pMessage) {
            var logger = getLogger(pLogTag);
            if (logger == null) {
                return;
            }

            var msg = createMessage(logger, this.LOGLEVEL_ERROR, pMessage);
            printMessage(msg, this.LOGLEVEL_ERROR);
        };

        var init = function () {
            if (window.console != undefined && typeof console == 'object') {
                outputType = OUTPUT_TYPE_CONSOLE;
            } else {
                outputType = OUTPUT_TYPE_ALERT;
            }
        };
        init();
    }

    methods.general.Log = new LoggerManagerClass();

    return methods;
})(jQuery, window, document);;/**
 * ASMS - writeServerDate Function
 *
 * Gets an empty file via ajax
 * Writes date from HTTP-Header into defined html element
 *
 * @hint The servertime.txt file cannot be loaded crossdomain
 * @author Steve Junker <steve.junker@axelspringer.de>, Markus Vogt <markus.vogt@axelspringer.de>
 * @uses jQuery, asms.getMonthName
 *
 */

// CCIESC-4812: Serverzeit per Script soll global verfügbar sein
var servertime;

(function($, window, document, undefined) {
    asms.general.writeServerDate = function(selector, newOptions) {
        var options = {
                selector : '.dateline.custom .first',
                publicationUrl : 'http://www.welt.de/',
                documentUrl : 'servertime.txt',
                widgetDate : false
            }

        /**
         * Try to get the date via ajax
         *
         * @returns ajax response object
         */
        function getDate() {
            var url = '';

            if (0 < options.publicationUrl.length
                    && 0 < options.documentUrl.length
            ) {
                url = options.publicationUrl + options.documentUrl;
            } else {
                return false;
            }

            return $.ajax({
                url: url
            });
        }

        /**
         * Sets the date which was set in options.widgetDate
         */
        function setWidgetDate() {
            if (false !== options.widgetDate) {
                $(selector).html(options.widgetDate);
            }
        }

        /**
         * Returns a formatted date
         *
         * @param date myDate
         * @returns string
         */
        function formatDate(myDate) {
            // format date
            var aMinutes = (myDate.getMinutes() < 10) ? "0" + myDate.getMinutes() : myDate.getMinutes();

            return myDate.getDate()
                        + '. ' + asms.getMonthName(myDate.getMonth())
                        + '. ' + myDate.getFullYear()
                        + ', ' + myDate.getHours()
                        + ':' + aMinutes;
        }

        var methods = {
            init : function(selector, newOptions) {
                var pageDate = '';
                // extend options
                options = jQuery.extend(options, newOptions || {});

                if (0 == selector.length) {
                    selector = options.selector;
                }
                // try to get date from server
                $.when(getDate()).done(function(data, status, jqXHR) {
                    if ('success' == status) {
                        pageDate = jqXHR.getResponseHeader('Date');
                        var myDate = new Date(Date.parse(pageDate));

                        // set global variable
                        servertime = myDate;

                        pageDate = formatDate(myDate);

                        $(selector).html(pageDate);
                    } else {
                        setWidgetDate();
                    }
                }).fail(function() {
                    setWidgetDate();
                });
            }
        }

        return methods.init(selector, newOptions);
    }
})(jQuery, window, document);;(function ($) { // Anonyme Funktion ausführen, Scope setzen, Variablen "verstecken"
		$.fn.GenerateLinks = function () { // jQuery.fn um Plugin erweitern
			var $this = this;
			return this.each( function () { // This returnen, um jQuery-Chainability zu sichern
				var href = $("h4.headline a",this).attr("href") || $("h4 a",this).attr("href") || $("span.headline a",this).attr("href"); // Link von Headline kopieren
				var name = $("h4.headline a",this).attr("name") || $("h4 a",this).attr("name") || $("span.headline a",this).attr("name"); // Name von Headline kopieren
				if ((href != "") && (typeof href != "undefined") && (typeof name != "undefined") && (name != "")) { //  Link vorhanden -> 
					$("h5",this).wrap("<a href='"+href+"' name='"+name+"'></a>"); // Link setzen
					$("topLine > span",this).wrap("<a href='"+href+"' name='"+name+"'></a>"); // Link setzen
					$("img",this).wrap("<a href='"+href+"' name='"+name+"'></a>"); // Link setzen
					$("p",this).children("a").replaceWith('<span class="more">'+$("p",this).children("a").html()+'</span>');
					$("p",this).wrap("<a href='"+href+"' name='"+name+"'></a>"); // Link setzen
					$("a.overlay",this).attr("name",name); // Link setzen
				} else if ((href != "") && (typeof href != "undefined")) { //  Link vorhanden -> 
					$("h5",this).wrap("<a href='"+href+"'></a>"); // Link setzen
					$("topLine > span",this).wrap("<a href='"+href+"' name='"+name+"'></a>"); // Link setzen
					$("img",this).wrap("<a href='"+href+"'></a>"); // Link setzen
					$("p",this).children("a").replaceWith('<span class="more">'+$("p",this).children("a").html()+'</span>');
					$("p",this).wrap("<a href='"+href+"'></a>"); // Link setzen
				}
			});
		};
	})(jQuery);;// ┌────────────────────────────────────────────────────────────────────┐ \\
// │ Raphaël 2.1.0 - JavaScript Vector Library                          │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright © 2008-2012 Dmitry Baranovskiy (http://raphaeljs.com)    │ \\
// │ Copyright © 2008-2012 Sencha Labs (http://sencha.com)              │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Licensed under the MIT (http://raphaeljs.com/license.html) license.│ \\
// └────────────────────────────────────────────────────────────────────┘ \\

// ┌──────────────────────────────────────────────────────────────────────────────────────┐ \\
// │ Eve 0.3.4 - JavaScript Events Library                                                │ \\
// ├──────────────────────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright (c) 2008-2011 Dmitry Baranovskiy (http://dmitry.baranovskiy.com/)          │ \\
// │ Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license. │ \\
// └──────────────────────────────────────────────────────────────────────────────────────┘ \\

(function (glob) {
    var version = "0.3.4",
        has = "hasOwnProperty",
        separator = /[\.\/]/,
        wildcard = "*",
        fun = function () {},
        numsort = function (a, b) {
            return a - b;
        },
        current_event,
        stop,
        events = {n: {}},
    
        eve = function (name, scope) {
            var e = events,
                oldstop = stop,
                args = Array.prototype.slice.call(arguments, 2),
                listeners = eve.listeners(name),
                z = 0,
                f = false,
                l,
                indexed = [],
                queue = {},
                out = [],
                ce = current_event,
                errors = [];
            current_event = name;
            stop = 0;
            for (var i = 0, ii = listeners.length; i < ii; i++) if ("zIndex" in listeners[i]) {
                indexed.push(listeners[i].zIndex);
                if (listeners[i].zIndex < 0) {
                    queue[listeners[i].zIndex] = listeners[i];
                }
            }
            indexed.sort(numsort);
            while (indexed[z] < 0) {
                l = queue[indexed[z++]];
                out.push(l.apply(scope, args));
                if (stop) {
                    stop = oldstop;
                    return out;
                }
            }
            for (i = 0; i < ii; i++) {
                l = listeners[i];
                if ("zIndex" in l) {
                    if (l.zIndex == indexed[z]) {
                        out.push(l.apply(scope, args));
                        if (stop) {
                            break;
                        }
                        do {
                            z++;
                            l = queue[indexed[z]];
                            l && out.push(l.apply(scope, args));
                            if (stop) {
                                break;
                            }
                        } while (l)
                    } else {
                        queue[l.zIndex] = l;
                    }
                } else {
                    out.push(l.apply(scope, args));
                    if (stop) {
                        break;
                    }
                }
            }
            stop = oldstop;
            current_event = ce;
            return out.length ? out : null;
        };
// added by mvogt to put eve into global scope - workaround for require.js
window.eve = eve;
// see also:
// - https://groups.google.com/d/msg/raphaeljs/9KM3LVad-CE/MwPZKUU8CG0J
// - https://as-wiki.axelspringer.de/x/0YG-Bg
// end of workarround
    
    eve.listeners = function (name) {
        var names = name.split(separator),
            e = events,
            item,
            items,
            k,
            i,
            ii,
            j,
            jj,
            nes,
            es = [e],
            out = [];
        for (i = 0, ii = names.length; i < ii; i++) {
            nes = [];
            for (j = 0, jj = es.length; j < jj; j++) {
                e = es[j].n;
                items = [e[names[i]], e[wildcard]];
                k = 2;
                while (k--) {
                    item = items[k];
                    if (item) {
                        nes.push(item);
                        out = out.concat(item.f || []);
                    }
                }
            }
            es = nes;
        }
        return out;
    };
    
    
    eve.on = function (name, f) {
        var names = name.split(separator),
            e = events;
        for (var i = 0, ii = names.length; i < ii; i++) {
            e = e.n;
            !e[names[i]] && (e[names[i]] = {n: {}});
            e = e[names[i]];
        }
        e.f = e.f || [];
        for (i = 0, ii = e.f.length; i < ii; i++) if (e.f[i] == f) {
            return fun;
        }
        e.f.push(f);
        return function (zIndex) {
            if (+zIndex == +zIndex) {
                f.zIndex = +zIndex;
            }
        };
    };
    
    eve.stop = function () {
        stop = 1;
    };
    
    eve.nt = function (subname) {
        if (subname) {
            return new RegExp("(?:\\.|\\/|^)" + subname + "(?:\\.|\\/|$)").test(current_event);
        }
        return current_event;
    };
    
    
    eve.off = eve.unbind = function (name, f) {
        var names = name.split(separator),
            e,
            key,
            splice,
            i, ii, j, jj,
            cur = [events];
        for (i = 0, ii = names.length; i < ii; i++) {
            for (j = 0; j < cur.length; j += splice.length - 2) {
                splice = [j, 1];
                e = cur[j].n;
                if (names[i] != wildcard) {
                    if (e[names[i]]) {
                        splice.push(e[names[i]]);
                    }
                } else {
                    for (key in e) if (e[has](key)) {
                        splice.push(e[key]);
                    }
                }
                cur.splice.apply(cur, splice);
            }
        }
        for (i = 0, ii = cur.length; i < ii; i++) {
            e = cur[i];
            while (e.n) {
                if (f) {
                    if (e.f) {
                        for (j = 0, jj = e.f.length; j < jj; j++) if (e.f[j] == f) {
                            e.f.splice(j, 1);
                            break;
                        }
                        !e.f.length && delete e.f;
                    }
                    for (key in e.n) if (e.n[has](key) && e.n[key].f) {
                        var funcs = e.n[key].f;
                        for (j = 0, jj = funcs.length; j < jj; j++) if (funcs[j] == f) {
                            funcs.splice(j, 1);
                            break;
                        }
                        !funcs.length && delete e.n[key].f;
                    }
                } else {
                    delete e.f;
                    for (key in e.n) if (e.n[has](key) && e.n[key].f) {
                        delete e.n[key].f;
                    }
                }
                e = e.n;
            }
        }
    };
    
    eve.once = function (name, f) {
        var f2 = function () {
            var res = f.apply(this, arguments);
            eve.unbind(name, f2);
            return res;
        };
        return eve.on(name, f2);
    };
    
    eve.version = version;
    eve.toString = function () {
        return "You are running Eve " + version;
    };
    (typeof module != "undefined" && module.exports) ? (module.exports = eve) : (typeof define != "undefined" ? (define("eve", [], function() { return eve; })) : (glob.eve = eve));
})(this);


// ┌─────────────────────────────────────────────────────────────────────┐ \\
// │ "Raphaël 2.1.0" - JavaScript Vector Library                         │ \\
// ├─────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright (c) 2008-2011 Dmitry Baranovskiy (http://raphaeljs.com)   │ \\
// │ Copyright (c) 2008-2011 Sencha Labs (http://sencha.com)             │ \\
// │ Licensed under the MIT (http://raphaeljs.com/license.html) license. │ \\
// └─────────────────────────────────────────────────────────────────────┘ \\
(function () {
    
    function R(first) {
        if (R.is(first, "function")) {
            return loaded ? first() : eve.on("raphael.DOMload", first);
        } else if (R.is(first, array)) {
            return R._engine.create[apply](R, first.splice(0, 3 + R.is(first[0], nu))).add(first);
        } else {
            var args = Array.prototype.slice.call(arguments, 0);
            if (R.is(args[args.length - 1], "function")) {
                var f = args.pop();
                return loaded ? f.call(R._engine.create[apply](R, args)) : eve.on("raphael.DOMload", function () {
                    f.call(R._engine.create[apply](R, args));
                });
            } else {
                return R._engine.create[apply](R, arguments);
            }
        }
    }
    R.version = "2.1.0";
    R.eve = eve;
    var loaded,
        separator = /[, ]+/,
        elements = {circle: 1, rect: 1, path: 1, ellipse: 1, text: 1, image: 1},
        formatrg = /\{(\d+)\}/g,
        proto = "prototype",
        has = "hasOwnProperty",
        g = {
            doc: document,
            win: window
        },
        oldRaphael = {
            was: Object.prototype[has].call(g.win, "Raphael"),
            is: g.win.Raphael
        },
        Paper = function () {
            
            
            this.ca = this.customAttributes = {};
        },
        paperproto,
        appendChild = "appendChild",
        apply = "apply",
        concat = "concat",
        supportsTouch = "createTouch" in g.doc,
        E = "",
        S = " ",
        Str = String,
        split = "split",
        events = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel"[split](S),
        touchMap = {
            mousedown: "touchstart",
            mousemove: "touchmove",
            mouseup: "touchend"
        },
        lowerCase = Str.prototype.toLowerCase,
        math = Math,
        mmax = math.max,
        mmin = math.min,
        abs = math.abs,
        pow = math.pow,
        PI = math.PI,
        nu = "number",
        string = "string",
        array = "array",
        toString = "toString",
        fillString = "fill",
        objectToString = Object.prototype.toString,
        paper = {},
        push = "push",
        ISURL = R._ISURL = /^url\(['"]?([^\)]+?)['"]?\)$/i,
        colourRegExp = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i,
        isnan = {"NaN": 1, "Infinity": 1, "-Infinity": 1},
        bezierrg = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,
        round = math.round,
        setAttribute = "setAttribute",
        toFloat = parseFloat,
        toInt = parseInt,
        upperCase = Str.prototype.toUpperCase,
        availableAttrs = R._availableAttrs = {
            "arrow-end": "none",
            "arrow-start": "none",
            blur: 0,
            "clip-rect": "0 0 1e9 1e9",
            cursor: "default",
            cx: 0,
            cy: 0,
            fill: "#fff",
            "fill-opacity": 1,
            font: '10px "Arial"',
            "font-family": '"Arial"',
            "font-size": "10",
            "font-style": "normal",
            "font-weight": 400,
            gradient: 0,
            height: 0,
            href: "http://raphaeljs.com/",
            "letter-spacing": 0,
            opacity: 1,
            path: "M0,0",
            r: 0,
            rx: 0,
            ry: 0,
            src: "",
            stroke: "#000",
            "stroke-dasharray": "",
            "stroke-linecap": "butt",
            "stroke-linejoin": "butt",
            "stroke-miterlimit": 0,
            "stroke-opacity": 1,
            "stroke-width": 1,
            target: "_blank",
            "text-anchor": "middle",
            title: "Raphael",
            transform: "",
            width: 0,
            x: 0,
            y: 0
        },
        availableAnimAttrs = R._availableAnimAttrs = {
            blur: nu,
            "clip-rect": "csv",
            cx: nu,
            cy: nu,
            fill: "colour",
            "fill-opacity": nu,
            "font-size": nu,
            height: nu,
            opacity: nu,
            path: "path",
            r: nu,
            rx: nu,
            ry: nu,
            stroke: "colour",
            "stroke-opacity": nu,
            "stroke-width": nu,
            transform: "transform",
            width: nu,
            x: nu,
            y: nu
        },
        whitespace = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]/g,
        commaSpaces = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,
        hsrg = {hs: 1, rg: 1},
        p2s = /,?([achlmqrstvxz]),?/gi,
        pathCommand = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig,
        tCommand = /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig,
        pathValues = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/ig,
        radial_gradient = R._radial_gradient = /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/,
        eldata = {},
        sortByKey = function (a, b) {
            return a.key - b.key;
        },
        sortByNumber = function (a, b) {
            return toFloat(a) - toFloat(b);
        },
        fun = function () {},
        pipe = function (x) {
            return x;
        },
        rectPath = R._rectPath = function (x, y, w, h, r) {
            if (r) {
                return [["M", x + r, y], ["l", w - r * 2, 0], ["a", r, r, 0, 0, 1, r, r], ["l", 0, h - r * 2], ["a", r, r, 0, 0, 1, -r, r], ["l", r * 2 - w, 0], ["a", r, r, 0, 0, 1, -r, -r], ["l", 0, r * 2 - h], ["a", r, r, 0, 0, 1, r, -r], ["z"]];
            }
            return [["M", x, y], ["l", w, 0], ["l", 0, h], ["l", -w, 0], ["z"]];
        },
        ellipsePath = function (x, y, rx, ry) {
            if (ry == null) {
                ry = rx;
            }
            return [["M", x, y], ["m", 0, -ry], ["a", rx, ry, 0, 1, 1, 0, 2 * ry], ["a", rx, ry, 0, 1, 1, 0, -2 * ry], ["z"]];
        },
        getPath = R._getPath = {
            path: function (el) {
                return el.attr("path");
            },
            circle: function (el) {
                var a = el.attrs;
                return ellipsePath(a.cx, a.cy, a.r);
            },
            ellipse: function (el) {
                var a = el.attrs;
                return ellipsePath(a.cx, a.cy, a.rx, a.ry);
            },
            rect: function (el) {
                var a = el.attrs;
                return rectPath(a.x, a.y, a.width, a.height, a.r);
            },
            image: function (el) {
                var a = el.attrs;
                return rectPath(a.x, a.y, a.width, a.height);
            },
            text: function (el) {
                var bbox = el._getBBox();
                return rectPath(bbox.x, bbox.y, bbox.width, bbox.height);
            }
        },
        
        mapPath = R.mapPath = function (path, matrix) {
            if (!matrix) {
                return path;
            }
            var x, y, i, j, ii, jj, pathi;
            path = path2curve(path);
            for (i = 0, ii = path.length; i < ii; i++) {
                pathi = path[i];
                for (j = 1, jj = pathi.length; j < jj; j += 2) {
                    x = matrix.x(pathi[j], pathi[j + 1]);
                    y = matrix.y(pathi[j], pathi[j + 1]);
                    pathi[j] = x;
                    pathi[j + 1] = y;
                }
            }
            return path;
        };

    R._g = g;
    
    R.type = (g.win.SVGAngle || g.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML");
    if (R.type == "VML") {
        var d = g.doc.createElement("div"),
            b;
        d.innerHTML = '<v:shape adj="1"/>';
        b = d.firstChild;
        b.style.behavior = "url(#default#VML)";
        if (!(b && typeof b.adj == "object")) {
            return (R.type = E);
        }
        d = null;
    }
    
    
    R.svg = !(R.vml = R.type == "VML");
    R._Paper = Paper;
    
    R.fn = paperproto = Paper.prototype = R.prototype;
    R._id = 0;
    R._oid = 0;
    
    R.is = function (o, type) {
        type = lowerCase.call(type);
        if (type == "finite") {
            return !isnan[has](+o);
        }
        if (type == "array") {
            return o instanceof Array;
        }
        return  (type == "null" && o === null) ||
                (type == typeof o && o !== null) ||
                (type == "object" && o === Object(o)) ||
                (type == "array" && Array.isArray && Array.isArray(o)) ||
                objectToString.call(o).slice(8, -1).toLowerCase() == type;
    };

    function clone(obj) {
        if (Object(obj) !== obj) {
            return obj;
        }
        var res = new obj.constructor;
        for (var key in obj) if (obj[has](key)) {
            res[key] = clone(obj[key]);
        }
        return res;
    }

    
    R.angle = function (x1, y1, x2, y2, x3, y3) {
        if (x3 == null) {
            var x = x1 - x2,
                y = y1 - y2;
            if (!x && !y) {
                return 0;
            }
            return (180 + math.atan2(-y, -x) * 180 / PI + 360) % 360;
        } else {
            return R.angle(x1, y1, x3, y3) - R.angle(x2, y2, x3, y3);
        }
    };
    
    R.rad = function (deg) {
        return deg % 360 * PI / 180;
    };
    
    R.deg = function (rad) {
        return rad * 180 / PI % 360;
    };
    
    R.snapTo = function (values, value, tolerance) {
        tolerance = R.is(tolerance, "finite") ? tolerance : 10;
        if (R.is(values, array)) {
            var i = values.length;
            while (i--) if (abs(values[i] - value) <= tolerance) {
                return values[i];
            }
        } else {
            values = +values;
            var rem = value % values;
            if (rem < tolerance) {
                return value - rem;
            }
            if (rem > values - tolerance) {
                return value - rem + values;
            }
        }
        return value;
    };
    
    
    var createUUID = R.createUUID = (function (uuidRegEx, uuidReplacer) {
        return function () {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(uuidRegEx, uuidReplacer).toUpperCase();
        };
    })(/[xy]/g, function (c) {
        var r = math.random() * 16 | 0,
            v = c == "x" ? r : (r & 3 | 8);
        return v.toString(16);
    });

    
    R.setWindow = function (newwin) {
        eve("raphael.setWindow", R, g.win, newwin);
        g.win = newwin;
        g.doc = g.win.document;
        if (R._engine.initWin) {
            R._engine.initWin(g.win);
        }
    };
    var toHex = function (color) {
        if (R.vml) {
            // http://dean.edwards.name/weblog/2009/10/convert-any-colour-value-to-hex-in-msie/
            var trim = /^\s+|\s+$/g;
            var bod;
            try {
                var docum = new ActiveXObject("htmlfile");
                docum.write("<body>");
                docum.close();
                bod = docum.body;
            } catch(e) {
                bod = createPopup().document.body;
            }
            var range = bod.createTextRange();
            toHex = cacher(function (color) {
                try {
                    bod.style.color = Str(color).replace(trim, E);
                    var value = range.queryCommandValue("ForeColor");
                    value = ((value & 255) << 16) | (value & 65280) | ((value & 16711680) >>> 16);
                    return "#" + ("000000" + value.toString(16)).slice(-6);
                } catch(e) {
                    return "none";
                }
            });
        } else {
            var i = g.doc.createElement("i");
            i.title = "Rapha\xebl Colour Picker";
            i.style.display = "none";
            g.doc.body.appendChild(i);
            toHex = cacher(function (color) {
                i.style.color = color;
                return g.doc.defaultView.getComputedStyle(i, E).getPropertyValue("color");
            });
        }
        return toHex(color);
    },
    hsbtoString = function () {
        return "hsb(" + [this.h, this.s, this.b] + ")";
    },
    hsltoString = function () {
        return "hsl(" + [this.h, this.s, this.l] + ")";
    },
    rgbtoString = function () {
        return this.hex;
    },
    prepareRGB = function (r, g, b) {
        if (g == null && R.is(r, "object") && "r" in r && "g" in r && "b" in r) {
            b = r.b;
            g = r.g;
            r = r.r;
        }
        if (g == null && R.is(r, string)) {
            var clr = R.getRGB(r);
            r = clr.r;
            g = clr.g;
            b = clr.b;
        }
        if (r > 1 || g > 1 || b > 1) {
            r /= 255;
            g /= 255;
            b /= 255;
        }
        
        return [r, g, b];
    },
    packageRGB = function (r, g, b, o) {
        r *= 255;
        g *= 255;
        b *= 255;
        var rgb = {
            r: r,
            g: g,
            b: b,
            hex: R.rgb(r, g, b),
            toString: rgbtoString
        };
        R.is(o, "finite") && (rgb.opacity = o);
        return rgb;
    };
    
    
    R.color = function (clr) {
        var rgb;
        if (R.is(clr, "object") && "h" in clr && "s" in clr && "b" in clr) {
            rgb = R.hsb2rgb(clr);
            clr.r = rgb.r;
            clr.g = rgb.g;
            clr.b = rgb.b;
            clr.hex = rgb.hex;
        } else if (R.is(clr, "object") && "h" in clr && "s" in clr && "l" in clr) {
            rgb = R.hsl2rgb(clr);
            clr.r = rgb.r;
            clr.g = rgb.g;
            clr.b = rgb.b;
            clr.hex = rgb.hex;
        } else {
            if (R.is(clr, "string")) {
                clr = R.getRGB(clr);
            }
            if (R.is(clr, "object") && "r" in clr && "g" in clr && "b" in clr) {
                rgb = R.rgb2hsl(clr);
                clr.h = rgb.h;
                clr.s = rgb.s;
                clr.l = rgb.l;
                rgb = R.rgb2hsb(clr);
                clr.v = rgb.b;
            } else {
                clr = {hex: "none"};
                clr.r = clr.g = clr.b = clr.h = clr.s = clr.v = clr.l = -1;
            }
        }
        clr.toString = rgbtoString;
        return clr;
    };
    
    R.hsb2rgb = function (h, s, v, o) {
        if (this.is(h, "object") && "h" in h && "s" in h && "b" in h) {
            v = h.b;
            s = h.s;
            h = h.h;
            o = h.o;
        }
        h *= 360;
        var R, G, B, X, C;
        h = (h % 360) / 60;
        C = v * s;
        X = C * (1 - abs(h % 2 - 1));
        R = G = B = v - C;

        h = ~~h;
        R += [C, X, 0, 0, X, C][h];
        G += [X, C, C, X, 0, 0][h];
        B += [0, 0, X, C, C, X][h];
        return packageRGB(R, G, B, o);
    };
    
    R.hsl2rgb = function (h, s, l, o) {
        if (this.is(h, "object") && "h" in h && "s" in h && "l" in h) {
            l = h.l;
            s = h.s;
            h = h.h;
        }
        if (h > 1 || s > 1 || l > 1) {
            h /= 360;
            s /= 100;
            l /= 100;
        }
        h *= 360;
        var R, G, B, X, C;
        h = (h % 360) / 60;
        C = 2 * s * (l < .5 ? l : 1 - l);
        X = C * (1 - abs(h % 2 - 1));
        R = G = B = l - C / 2;

        h = ~~h;
        R += [C, X, 0, 0, X, C][h];
        G += [X, C, C, X, 0, 0][h];
        B += [0, 0, X, C, C, X][h];
        return packageRGB(R, G, B, o);
    };
    
    R.rgb2hsb = function (r, g, b) {
        b = prepareRGB(r, g, b);
        r = b[0];
        g = b[1];
        b = b[2];

        var H, S, V, C;
        V = mmax(r, g, b);
        C = V - mmin(r, g, b);
        H = (C == 0 ? null :
             V == r ? (g - b) / C :
             V == g ? (b - r) / C + 2 :
                      (r - g) / C + 4
            );
        H = ((H + 360) % 6) * 60 / 360;
        S = C == 0 ? 0 : C / V;
        return {h: H, s: S, b: V, toString: hsbtoString};
    };
    
    R.rgb2hsl = function (r, g, b) {
        b = prepareRGB(r, g, b);
        r = b[0];
        g = b[1];
        b = b[2];

        var H, S, L, M, m, C;
        M = mmax(r, g, b);
        m = mmin(r, g, b);
        C = M - m;
        H = (C == 0 ? null :
             M == r ? (g - b) / C :
             M == g ? (b - r) / C + 2 :
                      (r - g) / C + 4);
        H = ((H + 360) % 6) * 60 / 360;
        L = (M + m) / 2;
        S = (C == 0 ? 0 :
             L < .5 ? C / (2 * L) :
                      C / (2 - 2 * L));
        return {h: H, s: S, l: L, toString: hsltoString};
    };
    R._path2string = function () {
        return this.join(",").replace(p2s, "$1");
    };
    function repush(array, item) {
        for (var i = 0, ii = array.length; i < ii; i++) if (array[i] === item) {
            return array.push(array.splice(i, 1)[0]);
        }
    }
    function cacher(f, scope, postprocessor) {
        function newf() {
            var arg = Array.prototype.slice.call(arguments, 0),
                args = arg.join("\u2400"),
                cache = newf.cache = newf.cache || {},
                count = newf.count = newf.count || [];
            if (cache[has](args)) {
                repush(count, args);
                return postprocessor ? postprocessor(cache[args]) : cache[args];
            }
            count.length >= 1e3 && delete cache[count.shift()];
            count.push(args);
            cache[args] = f[apply](scope, arg);
            return postprocessor ? postprocessor(cache[args]) : cache[args];
        }
        return newf;
    }

    var preload = R._preload = function (src, f) {
        var img = g.doc.createElement("img");
        img.style.cssText = "position:absolute;left:-9999em;top:-9999em";
        img.onload = function () {
            f.call(this);
            this.onload = null;
            g.doc.body.removeChild(this);
        };
        img.onerror = function () {
            g.doc.body.removeChild(this);
        };
        g.doc.body.appendChild(img);
        img.src = src;
    };
    
    function clrToString() {
        return this.hex;
    }

    
    R.getRGB = cacher(function (colour) {
        if (!colour || !!((colour = Str(colour)).indexOf("-") + 1)) {
            return {r: -1, g: -1, b: -1, hex: "none", error: 1, toString: clrToString};
        }
        if (colour == "none") {
            return {r: -1, g: -1, b: -1, hex: "none", toString: clrToString};
        }
        !(hsrg[has](colour.toLowerCase().substring(0, 2)) || colour.charAt() == "#") && (colour = toHex(colour));
        var res,
            red,
            green,
            blue,
            opacity,
            t,
            values,
            rgb = colour.match(colourRegExp);
        if (rgb) {
            if (rgb[2]) {
                blue = toInt(rgb[2].substring(5), 16);
                green = toInt(rgb[2].substring(3, 5), 16);
                red = toInt(rgb[2].substring(1, 3), 16);
            }
            if (rgb[3]) {
                blue = toInt((t = rgb[3].charAt(3)) + t, 16);
                green = toInt((t = rgb[3].charAt(2)) + t, 16);
                red = toInt((t = rgb[3].charAt(1)) + t, 16);
            }
            if (rgb[4]) {
                values = rgb[4][split](commaSpaces);
                red = toFloat(values[0]);
                values[0].slice(-1) == "%" && (red *= 2.55);
                green = toFloat(values[1]);
                values[1].slice(-1) == "%" && (green *= 2.55);
                blue = toFloat(values[2]);
                values[2].slice(-1) == "%" && (blue *= 2.55);
                rgb[1].toLowerCase().slice(0, 4) == "rgba" && (opacity = toFloat(values[3]));
                values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
            }
            if (rgb[5]) {
                values = rgb[5][split](commaSpaces);
                red = toFloat(values[0]);
                values[0].slice(-1) == "%" && (red *= 2.55);
                green = toFloat(values[1]);
                values[1].slice(-1) == "%" && (green *= 2.55);
                blue = toFloat(values[2]);
                values[2].slice(-1) == "%" && (blue *= 2.55);
                (values[0].slice(-3) == "deg" || values[0].slice(-1) == "\xb0") && (red /= 360);
                rgb[1].toLowerCase().slice(0, 4) == "hsba" && (opacity = toFloat(values[3]));
                values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
                return R.hsb2rgb(red, green, blue, opacity);
            }
            if (rgb[6]) {
                values = rgb[6][split](commaSpaces);
                red = toFloat(values[0]);
                values[0].slice(-1) == "%" && (red *= 2.55);
                green = toFloat(values[1]);
                values[1].slice(-1) == "%" && (green *= 2.55);
                blue = toFloat(values[2]);
                values[2].slice(-1) == "%" && (blue *= 2.55);
                (values[0].slice(-3) == "deg" || values[0].slice(-1) == "\xb0") && (red /= 360);
                rgb[1].toLowerCase().slice(0, 4) == "hsla" && (opacity = toFloat(values[3]));
                values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
                return R.hsl2rgb(red, green, blue, opacity);
            }
            rgb = {r: red, g: green, b: blue, toString: clrToString};
            rgb.hex = "#" + (16777216 | blue | (green << 8) | (red << 16)).toString(16).slice(1);
            R.is(opacity, "finite") && (rgb.opacity = opacity);
            return rgb;
        }
        return {r: -1, g: -1, b: -1, hex: "none", error: 1, toString: clrToString};
    }, R);
    
    R.hsb = cacher(function (h, s, b) {
        return R.hsb2rgb(h, s, b).hex;
    });
    
    R.hsl = cacher(function (h, s, l) {
        return R.hsl2rgb(h, s, l).hex;
    });
    
    R.rgb = cacher(function (r, g, b) {
        return "#" + (16777216 | b | (g << 8) | (r << 16)).toString(16).slice(1);
    });
    
    R.getColor = function (value) {
        var start = this.getColor.start = this.getColor.start || {h: 0, s: 1, b: value || .75},
            rgb = this.hsb2rgb(start.h, start.s, start.b);
        start.h += .075;
        if (start.h > 1) {
            start.h = 0;
            start.s -= .2;
            start.s <= 0 && (this.getColor.start = {h: 0, s: 1, b: start.b});
        }
        return rgb.hex;
    };
    
    R.getColor.reset = function () {
        delete this.start;
    };

    // http://schepers.cc/getting-to-the-point
    function catmullRom2bezier(crp, z) {
        var d = [];
        for (var i = 0, iLen = crp.length; iLen - 2 * !z > i; i += 2) {
            var p = [
                        {x: +crp[i - 2], y: +crp[i - 1]},
                        {x: +crp[i],     y: +crp[i + 1]},
                        {x: +crp[i + 2], y: +crp[i + 3]},
                        {x: +crp[i + 4], y: +crp[i + 5]}
                    ];
            if (z) {
                if (!i) {
                    p[0] = {x: +crp[iLen - 2], y: +crp[iLen - 1]};
                } else if (iLen - 4 == i) {
                    p[3] = {x: +crp[0], y: +crp[1]};
                } else if (iLen - 2 == i) {
                    p[2] = {x: +crp[0], y: +crp[1]};
                    p[3] = {x: +crp[2], y: +crp[3]};
                }
            } else {
                if (iLen - 4 == i) {
                    p[3] = p[2];
                } else if (!i) {
                    p[0] = {x: +crp[i], y: +crp[i + 1]};
                }
            }
            d.push(["C",
                  (-p[0].x + 6 * p[1].x + p[2].x) / 6,
                  (-p[0].y + 6 * p[1].y + p[2].y) / 6,
                  (p[1].x + 6 * p[2].x - p[3].x) / 6,
                  (p[1].y + 6*p[2].y - p[3].y) / 6,
                  p[2].x,
                  p[2].y
            ]);
        }

        return d;
    }
    
    R.parsePathString = function (pathString) {
        if (!pathString) {
            return null;
        }
        var pth = paths(pathString);
        if (pth.arr) {
            return pathClone(pth.arr);
        }
        
        var paramCounts = {a: 7, c: 6, h: 1, l: 2, m: 2, r: 4, q: 4, s: 4, t: 2, v: 1, z: 0},
            data = [];
        if (R.is(pathString, array) && R.is(pathString[0], array)) { // rough assumption
            data = pathClone(pathString);
        }
        if (!data.length) {
            Str(pathString).replace(pathCommand, function (a, b, c) {
                var params = [],
                    name = b.toLowerCase();
                c.replace(pathValues, function (a, b) {
                    b && params.push(+b);
                });
                if (name == "m" && params.length > 2) {
                    data.push([b][concat](params.splice(0, 2)));
                    name = "l";
                    b = b == "m" ? "l" : "L";
                }
                if (name == "r") {
                    data.push([b][concat](params));
                } else while (params.length >= paramCounts[name]) {
                    data.push([b][concat](params.splice(0, paramCounts[name])));
                    if (!paramCounts[name]) {
                        break;
                    }
                }
            });
        }
        data.toString = R._path2string;
        pth.arr = pathClone(data);
        return data;
    };
    
    R.parseTransformString = cacher(function (TString) {
        if (!TString) {
            return null;
        }
        var paramCounts = {r: 3, s: 4, t: 2, m: 6},
            data = [];
        if (R.is(TString, array) && R.is(TString[0], array)) { // rough assumption
            data = pathClone(TString);
        }
        if (!data.length) {
            Str(TString).replace(tCommand, function (a, b, c) {
                var params = [],
                    name = lowerCase.call(b);
                c.replace(pathValues, function (a, b) {
                    b && params.push(+b);
                });
                data.push([b][concat](params));
            });
        }
        data.toString = R._path2string;
        return data;
    });
    // PATHS
    var paths = function (ps) {
        var p = paths.ps = paths.ps || {};
        if (p[ps]) {
            p[ps].sleep = 100;
        } else {
            p[ps] = {
                sleep: 100
            };
        }
        setTimeout(function () {
            for (var key in p) if (p[has](key) && key != ps) {
                p[key].sleep--;
                !p[key].sleep && delete p[key];
            }
        });
        return p[ps];
    };
    
    R.findDotsAtSegment = function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
        var t1 = 1 - t,
            t13 = pow(t1, 3),
            t12 = pow(t1, 2),
            t2 = t * t,
            t3 = t2 * t,
            x = t13 * p1x + t12 * 3 * t * c1x + t1 * 3 * t * t * c2x + t3 * p2x,
            y = t13 * p1y + t12 * 3 * t * c1y + t1 * 3 * t * t * c2y + t3 * p2y,
            mx = p1x + 2 * t * (c1x - p1x) + t2 * (c2x - 2 * c1x + p1x),
            my = p1y + 2 * t * (c1y - p1y) + t2 * (c2y - 2 * c1y + p1y),
            nx = c1x + 2 * t * (c2x - c1x) + t2 * (p2x - 2 * c2x + c1x),
            ny = c1y + 2 * t * (c2y - c1y) + t2 * (p2y - 2 * c2y + c1y),
            ax = t1 * p1x + t * c1x,
            ay = t1 * p1y + t * c1y,
            cx = t1 * c2x + t * p2x,
            cy = t1 * c2y + t * p2y,
            alpha = (90 - math.atan2(mx - nx, my - ny) * 180 / PI);
        (mx > nx || my < ny) && (alpha += 180);
        return {
            x: x,
            y: y,
            m: {x: mx, y: my},
            n: {x: nx, y: ny},
            start: {x: ax, y: ay},
            end: {x: cx, y: cy},
            alpha: alpha
        };
    };
    
    R.bezierBBox = function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
        if (!R.is(p1x, "array")) {
            p1x = [p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y];
        }
        var bbox = curveDim.apply(null, p1x);
        return {
            x: bbox.min.x,
            y: bbox.min.y,
            x2: bbox.max.x,
            y2: bbox.max.y,
            width: bbox.max.x - bbox.min.x,
            height: bbox.max.y - bbox.min.y
        };
    };
    
    R.isPointInsideBBox = function (bbox, x, y) {
        return x >= bbox.x && x <= bbox.x2 && y >= bbox.y && y <= bbox.y2;
    };
    
    R.isBBoxIntersect = function (bbox1, bbox2) {
        var i = R.isPointInsideBBox;
        return i(bbox2, bbox1.x, bbox1.y)
            || i(bbox2, bbox1.x2, bbox1.y)
            || i(bbox2, bbox1.x, bbox1.y2)
            || i(bbox2, bbox1.x2, bbox1.y2)
            || i(bbox1, bbox2.x, bbox2.y)
            || i(bbox1, bbox2.x2, bbox2.y)
            || i(bbox1, bbox2.x, bbox2.y2)
            || i(bbox1, bbox2.x2, bbox2.y2)
            || (bbox1.x < bbox2.x2 && bbox1.x > bbox2.x || bbox2.x < bbox1.x2 && bbox2.x > bbox1.x)
            && (bbox1.y < bbox2.y2 && bbox1.y > bbox2.y || bbox2.y < bbox1.y2 && bbox2.y > bbox1.y);
    };
    function base3(t, p1, p2, p3, p4) {
        var t1 = -3 * p1 + 9 * p2 - 9 * p3 + 3 * p4,
            t2 = t * t1 + 6 * p1 - 12 * p2 + 6 * p3;
        return t * t2 - 3 * p1 + 3 * p2;
    }
    function bezlen(x1, y1, x2, y2, x3, y3, x4, y4, z) {
        if (z == null) {
            z = 1;
        }
        z = z > 1 ? 1 : z < 0 ? 0 : z;
        var z2 = z / 2,
            n = 12,
            Tvalues = [-0.1252,0.1252,-0.3678,0.3678,-0.5873,0.5873,-0.7699,0.7699,-0.9041,0.9041,-0.9816,0.9816],
            Cvalues = [0.2491,0.2491,0.2335,0.2335,0.2032,0.2032,0.1601,0.1601,0.1069,0.1069,0.0472,0.0472],
            sum = 0;
        for (var i = 0; i < n; i++) {
            var ct = z2 * Tvalues[i] + z2,
                xbase = base3(ct, x1, x2, x3, x4),
                ybase = base3(ct, y1, y2, y3, y4),
                comb = xbase * xbase + ybase * ybase;
            sum += Cvalues[i] * math.sqrt(comb);
        }
        return z2 * sum;
    }
    function getTatLen(x1, y1, x2, y2, x3, y3, x4, y4, ll) {
        if (ll < 0 || bezlen(x1, y1, x2, y2, x3, y3, x4, y4) < ll) {
            return;
        }
        var t = 1,
            step = t / 2,
            t2 = t - step,
            l,
            e = .01;
        l = bezlen(x1, y1, x2, y2, x3, y3, x4, y4, t2);
        while (abs(l - ll) > e) {
            step /= 2;
            t2 += (l < ll ? 1 : -1) * step;
            l = bezlen(x1, y1, x2, y2, x3, y3, x4, y4, t2);
        }
        return t2;
    }
    function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
        if (
            mmax(x1, x2) < mmin(x3, x4) ||
            mmin(x1, x2) > mmax(x3, x4) ||
            mmax(y1, y2) < mmin(y3, y4) ||
            mmin(y1, y2) > mmax(y3, y4)
        ) {
            return;
        }
        var nx = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4),
            ny = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4),
            denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

        if (!denominator) {
            return;
        }
        var px = nx / denominator,
            py = ny / denominator,
            px2 = +px.toFixed(2),
            py2 = +py.toFixed(2);
        if (
            px2 < +mmin(x1, x2).toFixed(2) ||
            px2 > +mmax(x1, x2).toFixed(2) ||
            px2 < +mmin(x3, x4).toFixed(2) ||
            px2 > +mmax(x3, x4).toFixed(2) ||
            py2 < +mmin(y1, y2).toFixed(2) ||
            py2 > +mmax(y1, y2).toFixed(2) ||
            py2 < +mmin(y3, y4).toFixed(2) ||
            py2 > +mmax(y3, y4).toFixed(2)
        ) {
            return;
        }
        return {x: px, y: py};
    }
    function inter(bez1, bez2) {
        return interHelper(bez1, bez2);
    }
    function interCount(bez1, bez2) {
        return interHelper(bez1, bez2, 1);
    }
    function interHelper(bez1, bez2, justCount) {
        var bbox1 = R.bezierBBox(bez1),
            bbox2 = R.bezierBBox(bez2);
        if (!R.isBBoxIntersect(bbox1, bbox2)) {
            return justCount ? 0 : [];
        }
        var l1 = bezlen.apply(0, bez1),
            l2 = bezlen.apply(0, bez2),
            n1 = ~~(l1 / 5),
            n2 = ~~(l2 / 5),
            dots1 = [],
            dots2 = [],
            xy = {},
            res = justCount ? 0 : [];
        for (var i = 0; i < n1 + 1; i++) {
            var p = R.findDotsAtSegment.apply(R, bez1.concat(i / n1));
            dots1.push({x: p.x, y: p.y, t: i / n1});
        }
        for (i = 0; i < n2 + 1; i++) {
            p = R.findDotsAtSegment.apply(R, bez2.concat(i / n2));
            dots2.push({x: p.x, y: p.y, t: i / n2});
        }
        for (i = 0; i < n1; i++) {
            for (var j = 0; j < n2; j++) {
                var di = dots1[i],
                    di1 = dots1[i + 1],
                    dj = dots2[j],
                    dj1 = dots2[j + 1],
                    ci = abs(di1.x - di.x) < .001 ? "y" : "x",
                    cj = abs(dj1.x - dj.x) < .001 ? "y" : "x",
                    is = intersect(di.x, di.y, di1.x, di1.y, dj.x, dj.y, dj1.x, dj1.y);
                if (is) {
                    if (xy[is.x.toFixed(4)] == is.y.toFixed(4)) {
                        continue;
                    }
                    xy[is.x.toFixed(4)] = is.y.toFixed(4);
                    var t1 = di.t + abs((is[ci] - di[ci]) / (di1[ci] - di[ci])) * (di1.t - di.t),
                        t2 = dj.t + abs((is[cj] - dj[cj]) / (dj1[cj] - dj[cj])) * (dj1.t - dj.t);
                    if (t1 >= 0 && t1 <= 1 && t2 >= 0 && t2 <= 1) {
                        if (justCount) {
                            res++;
                        } else {
                            res.push({
                                x: is.x,
                                y: is.y,
                                t1: t1,
                                t2: t2
                            });
                        }
                    }
                }
            }
        }
        return res;
    }
    
    R.pathIntersection = function (path1, path2) {
        return interPathHelper(path1, path2);
    };
    R.pathIntersectionNumber = function (path1, path2) {
        return interPathHelper(path1, path2, 1);
    };
    function interPathHelper(path1, path2, justCount) {
        path1 = R._path2curve(path1);
        path2 = R._path2curve(path2);
        var x1, y1, x2, y2, x1m, y1m, x2m, y2m, bez1, bez2,
            res = justCount ? 0 : [];
        for (var i = 0, ii = path1.length; i < ii; i++) {
            var pi = path1[i];
            if (pi[0] == "M") {
                x1 = x1m = pi[1];
                y1 = y1m = pi[2];
            } else {
                if (pi[0] == "C") {
                    bez1 = [x1, y1].concat(pi.slice(1));
                    x1 = bez1[6];
                    y1 = bez1[7];
                } else {
                    bez1 = [x1, y1, x1, y1, x1m, y1m, x1m, y1m];
                    x1 = x1m;
                    y1 = y1m;
                }
                for (var j = 0, jj = path2.length; j < jj; j++) {
                    var pj = path2[j];
                    if (pj[0] == "M") {
                        x2 = x2m = pj[1];
                        y2 = y2m = pj[2];
                    } else {
                        if (pj[0] == "C") {
                            bez2 = [x2, y2].concat(pj.slice(1));
                            x2 = bez2[6];
                            y2 = bez2[7];
                        } else {
                            bez2 = [x2, y2, x2, y2, x2m, y2m, x2m, y2m];
                            x2 = x2m;
                            y2 = y2m;
                        }
                        var intr = interHelper(bez1, bez2, justCount);
                        if (justCount) {
                            res += intr;
                        } else {
                            for (var k = 0, kk = intr.length; k < kk; k++) {
                                intr[k].segment1 = i;
                                intr[k].segment2 = j;
                                intr[k].bez1 = bez1;
                                intr[k].bez2 = bez2;
                            }
                            res = res.concat(intr);
                        }
                    }
                }
            }
        }
        return res;
    }
    
    R.isPointInsidePath = function (path, x, y) {
        var bbox = R.pathBBox(path);
        return R.isPointInsideBBox(bbox, x, y) &&
               interPathHelper(path, [["M", x, y], ["H", bbox.x2 + 10]], 1) % 2 == 1;
    };
    R._removedFactory = function (methodname) {
        return function () {
            eve("raphael.log", null, "Rapha\xebl: you are calling to method \u201c" + methodname + "\u201d of removed object", methodname);
        };
    };
    
    var pathDimensions = R.pathBBox = function (path) {
        var pth = paths(path);
        if (pth.bbox) {
            return pth.bbox;
        }
        if (!path) {
            return {x: 0, y: 0, width: 0, height: 0, x2: 0, y2: 0};
        }
        path = path2curve(path);
        var x = 0, 
            y = 0,
            X = [],
            Y = [],
            p;
        for (var i = 0, ii = path.length; i < ii; i++) {
            p = path[i];
            if (p[0] == "M") {
                x = p[1];
                y = p[2];
                X.push(x);
                Y.push(y);
            } else {
                var dim = curveDim(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
                X = X[concat](dim.min.x, dim.max.x);
                Y = Y[concat](dim.min.y, dim.max.y);
                x = p[5];
                y = p[6];
            }
        }
        var xmin = mmin[apply](0, X),
            ymin = mmin[apply](0, Y),
            xmax = mmax[apply](0, X),
            ymax = mmax[apply](0, Y),
            bb = {
                x: xmin,
                y: ymin,
                x2: xmax,
                y2: ymax,
                width: xmax - xmin,
                height: ymax - ymin
            };
        pth.bbox = clone(bb);
        return bb;
    },
        pathClone = function (pathArray) {
            var res = clone(pathArray);
            res.toString = R._path2string;
            return res;
        },
        pathToRelative = R._pathToRelative = function (pathArray) {
            var pth = paths(pathArray);
            if (pth.rel) {
                return pathClone(pth.rel);
            }
            if (!R.is(pathArray, array) || !R.is(pathArray && pathArray[0], array)) { // rough assumption
                pathArray = R.parsePathString(pathArray);
            }
            var res = [],
                x = 0,
                y = 0,
                mx = 0,
                my = 0,
                start = 0;
            if (pathArray[0][0] == "M") {
                x = pathArray[0][1];
                y = pathArray[0][2];
                mx = x;
                my = y;
                start++;
                res.push(["M", x, y]);
            }
            for (var i = start, ii = pathArray.length; i < ii; i++) {
                var r = res[i] = [],
                    pa = pathArray[i];
                if (pa[0] != lowerCase.call(pa[0])) {
                    r[0] = lowerCase.call(pa[0]);
                    switch (r[0]) {
                        case "a":
                            r[1] = pa[1];
                            r[2] = pa[2];
                            r[3] = pa[3];
                            r[4] = pa[4];
                            r[5] = pa[5];
                            r[6] = +(pa[6] - x).toFixed(3);
                            r[7] = +(pa[7] - y).toFixed(3);
                            break;
                        case "v":
                            r[1] = +(pa[1] - y).toFixed(3);
                            break;
                        case "m":
                            mx = pa[1];
                            my = pa[2];
                        default:
                            for (var j = 1, jj = pa.length; j < jj; j++) {
                                r[j] = +(pa[j] - ((j % 2) ? x : y)).toFixed(3);
                            }
                    }
                } else {
                    r = res[i] = [];
                    if (pa[0] == "m") {
                        mx = pa[1] + x;
                        my = pa[2] + y;
                    }
                    for (var k = 0, kk = pa.length; k < kk; k++) {
                        res[i][k] = pa[k];
                    }
                }
                var len = res[i].length;
                switch (res[i][0]) {
                    case "z":
                        x = mx;
                        y = my;
                        break;
                    case "h":
                        x += +res[i][len - 1];
                        break;
                    case "v":
                        y += +res[i][len - 1];
                        break;
                    default:
                        x += +res[i][len - 2];
                        y += +res[i][len - 1];
                }
            }
            res.toString = R._path2string;
            pth.rel = pathClone(res);
            return res;
        },
        pathToAbsolute = R._pathToAbsolute = function (pathArray) {
            var pth = paths(pathArray);
            if (pth.abs) {
                return pathClone(pth.abs);
            }
            if (!R.is(pathArray, array) || !R.is(pathArray && pathArray[0], array)) { // rough assumption
                pathArray = R.parsePathString(pathArray);
            }
            if (!pathArray || !pathArray.length) {
                return [["M", 0, 0]];
            }
            var res = [],
                x = 0,
                y = 0,
                mx = 0,
                my = 0,
                start = 0;
            if (pathArray[0][0] == "M") {
                x = +pathArray[0][1];
                y = +pathArray[0][2];
                mx = x;
                my = y;
                start++;
                res[0] = ["M", x, y];
            }
            var crz = pathArray.length == 3 && pathArray[0][0] == "M" && pathArray[1][0].toUpperCase() == "R" && pathArray[2][0].toUpperCase() == "Z";
            for (var r, pa, i = start, ii = pathArray.length; i < ii; i++) {
                res.push(r = []);
                pa = pathArray[i];
                if (pa[0] != upperCase.call(pa[0])) {
                    r[0] = upperCase.call(pa[0]);
                    switch (r[0]) {
                        case "A":
                            r[1] = pa[1];
                            r[2] = pa[2];
                            r[3] = pa[3];
                            r[4] = pa[4];
                            r[5] = pa[5];
                            r[6] = +(pa[6] + x);
                            r[7] = +(pa[7] + y);
                            break;
                        case "V":
                            r[1] = +pa[1] + y;
                            break;
                        case "H":
                            r[1] = +pa[1] + x;
                            break;
                        case "R":
                            var dots = [x, y][concat](pa.slice(1));
                            for (var j = 2, jj = dots.length; j < jj; j++) {
                                dots[j] = +dots[j] + x;
                                dots[++j] = +dots[j] + y;
                            }
                            res.pop();
                            res = res[concat](catmullRom2bezier(dots, crz));
                            break;
                        case "M":
                            mx = +pa[1] + x;
                            my = +pa[2] + y;
                        default:
                            for (j = 1, jj = pa.length; j < jj; j++) {
                                r[j] = +pa[j] + ((j % 2) ? x : y);
                            }
                    }
                } else if (pa[0] == "R") {
                    dots = [x, y][concat](pa.slice(1));
                    res.pop();
                    res = res[concat](catmullRom2bezier(dots, crz));
                    r = ["R"][concat](pa.slice(-2));
                } else {
                    for (var k = 0, kk = pa.length; k < kk; k++) {
                        r[k] = pa[k];
                    }
                }
                switch (r[0]) {
                    case "Z":
                        x = mx;
                        y = my;
                        break;
                    case "H":
                        x = r[1];
                        break;
                    case "V":
                        y = r[1];
                        break;
                    case "M":
                        mx = r[r.length - 2];
                        my = r[r.length - 1];
                    default:
                        x = r[r.length - 2];
                        y = r[r.length - 1];
                }
            }
            res.toString = R._path2string;
            pth.abs = pathClone(res);
            return res;
        },
        l2c = function (x1, y1, x2, y2) {
            return [x1, y1, x2, y2, x2, y2];
        },
        q2c = function (x1, y1, ax, ay, x2, y2) {
            var _13 = 1 / 3,
                _23 = 2 / 3;
            return [
                    _13 * x1 + _23 * ax,
                    _13 * y1 + _23 * ay,
                    _13 * x2 + _23 * ax,
                    _13 * y2 + _23 * ay,
                    x2,
                    y2
                ];
        },
        a2c = function (x1, y1, rx, ry, angle, large_arc_flag, sweep_flag, x2, y2, recursive) {
            // for more information of where this math came from visit:
            // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
            var _120 = PI * 120 / 180,
                rad = PI / 180 * (+angle || 0),
                res = [],
                xy,
                rotate = cacher(function (x, y, rad) {
                    var X = x * math.cos(rad) - y * math.sin(rad),
                        Y = x * math.sin(rad) + y * math.cos(rad);
                    return {x: X, y: Y};
                });
            if (!recursive) {
                xy = rotate(x1, y1, -rad);
                x1 = xy.x;
                y1 = xy.y;
                xy = rotate(x2, y2, -rad);
                x2 = xy.x;
                y2 = xy.y;
                var cos = math.cos(PI / 180 * angle),
                    sin = math.sin(PI / 180 * angle),
                    x = (x1 - x2) / 2,
                    y = (y1 - y2) / 2;
                var h = (x * x) / (rx * rx) + (y * y) / (ry * ry);
                if (h > 1) {
                    h = math.sqrt(h);
                    rx = h * rx;
                    ry = h * ry;
                }
                var rx2 = rx * rx,
                    ry2 = ry * ry,
                    k = (large_arc_flag == sweep_flag ? -1 : 1) *
                        math.sqrt(abs((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x))),
                    cx = k * rx * y / ry + (x1 + x2) / 2,
                    cy = k * -ry * x / rx + (y1 + y2) / 2,
                    f1 = math.asin(((y1 - cy) / ry).toFixed(9)),
                    f2 = math.asin(((y2 - cy) / ry).toFixed(9));

                f1 = x1 < cx ? PI - f1 : f1;
                f2 = x2 < cx ? PI - f2 : f2;
                f1 < 0 && (f1 = PI * 2 + f1);
                f2 < 0 && (f2 = PI * 2 + f2);
                if (sweep_flag && f1 > f2) {
                    f1 = f1 - PI * 2;
                }
                if (!sweep_flag && f2 > f1) {
                    f2 = f2 - PI * 2;
                }
            } else {
                f1 = recursive[0];
                f2 = recursive[1];
                cx = recursive[2];
                cy = recursive[3];
            }
            var df = f2 - f1;
            if (abs(df) > _120) {
                var f2old = f2,
                    x2old = x2,
                    y2old = y2;
                f2 = f1 + _120 * (sweep_flag && f2 > f1 ? 1 : -1);
                x2 = cx + rx * math.cos(f2);
                y2 = cy + ry * math.sin(f2);
                res = a2c(x2, y2, rx, ry, angle, 0, sweep_flag, x2old, y2old, [f2, f2old, cx, cy]);
            }
            df = f2 - f1;
            var c1 = math.cos(f1),
                s1 = math.sin(f1),
                c2 = math.cos(f2),
                s2 = math.sin(f2),
                t = math.tan(df / 4),
                hx = 4 / 3 * rx * t,
                hy = 4 / 3 * ry * t,
                m1 = [x1, y1],
                m2 = [x1 + hx * s1, y1 - hy * c1],
                m3 = [x2 + hx * s2, y2 - hy * c2],
                m4 = [x2, y2];
            m2[0] = 2 * m1[0] - m2[0];
            m2[1] = 2 * m1[1] - m2[1];
            if (recursive) {
                return [m2, m3, m4][concat](res);
            } else {
                res = [m2, m3, m4][concat](res).join()[split](",");
                var newres = [];
                for (var i = 0, ii = res.length; i < ii; i++) {
                    newres[i] = i % 2 ? rotate(res[i - 1], res[i], rad).y : rotate(res[i], res[i + 1], rad).x;
                }
                return newres;
            }
        },
        findDotAtSegment = function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
            var t1 = 1 - t;
            return {
                x: pow(t1, 3) * p1x + pow(t1, 2) * 3 * t * c1x + t1 * 3 * t * t * c2x + pow(t, 3) * p2x,
                y: pow(t1, 3) * p1y + pow(t1, 2) * 3 * t * c1y + t1 * 3 * t * t * c2y + pow(t, 3) * p2y
            };
        },
        curveDim = cacher(function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
            var a = (c2x - 2 * c1x + p1x) - (p2x - 2 * c2x + c1x),
                b = 2 * (c1x - p1x) - 2 * (c2x - c1x),
                c = p1x - c1x,
                t1 = (-b + math.sqrt(b * b - 4 * a * c)) / 2 / a,
                t2 = (-b - math.sqrt(b * b - 4 * a * c)) / 2 / a,
                y = [p1y, p2y],
                x = [p1x, p2x],
                dot;
            abs(t1) > "1e12" && (t1 = .5);
            abs(t2) > "1e12" && (t2 = .5);
            if (t1 > 0 && t1 < 1) {
                dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t1);
                x.push(dot.x);
                y.push(dot.y);
            }
            if (t2 > 0 && t2 < 1) {
                dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t2);
                x.push(dot.x);
                y.push(dot.y);
            }
            a = (c2y - 2 * c1y + p1y) - (p2y - 2 * c2y + c1y);
            b = 2 * (c1y - p1y) - 2 * (c2y - c1y);
            c = p1y - c1y;
            t1 = (-b + math.sqrt(b * b - 4 * a * c)) / 2 / a;
            t2 = (-b - math.sqrt(b * b - 4 * a * c)) / 2 / a;
            abs(t1) > "1e12" && (t1 = .5);
            abs(t2) > "1e12" && (t2 = .5);
            if (t1 > 0 && t1 < 1) {
                dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t1);
                x.push(dot.x);
                y.push(dot.y);
            }
            if (t2 > 0 && t2 < 1) {
                dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t2);
                x.push(dot.x);
                y.push(dot.y);
            }
            return {
                min: {x: mmin[apply](0, x), y: mmin[apply](0, y)},
                max: {x: mmax[apply](0, x), y: mmax[apply](0, y)}
            };
        }),
        path2curve = R._path2curve = cacher(function (path, path2) {
            var pth = !path2 && paths(path);
            if (!path2 && pth.curve) {
                return pathClone(pth.curve);
            }
            var p = pathToAbsolute(path),
                p2 = path2 && pathToAbsolute(path2),
                attrs = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null},
                attrs2 = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null},
                processPath = function (path, d) {
                    var nx, ny;
                    if (!path) {
                        return ["C", d.x, d.y, d.x, d.y, d.x, d.y];
                    }
                    !(path[0] in {T:1, Q:1}) && (d.qx = d.qy = null);
                    switch (path[0]) {
                        case "M":
                            d.X = path[1];
                            d.Y = path[2];
                            break;
                        case "A":
                            path = ["C"][concat](a2c[apply](0, [d.x, d.y][concat](path.slice(1))));
                            break;
                        case "S":
                            nx = d.x + (d.x - (d.bx || d.x));
                            ny = d.y + (d.y - (d.by || d.y));
                            path = ["C", nx, ny][concat](path.slice(1));
                            break;
                        case "T":
                            d.qx = d.x + (d.x - (d.qx || d.x));
                            d.qy = d.y + (d.y - (d.qy || d.y));
                            path = ["C"][concat](q2c(d.x, d.y, d.qx, d.qy, path[1], path[2]));
                            break;
                        case "Q":
                            d.qx = path[1];
                            d.qy = path[2];
                            path = ["C"][concat](q2c(d.x, d.y, path[1], path[2], path[3], path[4]));
                            break;
                        case "L":
                            path = ["C"][concat](l2c(d.x, d.y, path[1], path[2]));
                            break;
                        case "H":
                            path = ["C"][concat](l2c(d.x, d.y, path[1], d.y));
                            break;
                        case "V":
                            path = ["C"][concat](l2c(d.x, d.y, d.x, path[1]));
                            break;
                        case "Z":
                            path = ["C"][concat](l2c(d.x, d.y, d.X, d.Y));
                            break;
                    }
                    return path;
                },
                fixArc = function (pp, i) {
                    if (pp[i].length > 7) {
                        pp[i].shift();
                        var pi = pp[i];
                        while (pi.length) {
                            pp.splice(i++, 0, ["C"][concat](pi.splice(0, 6)));
                        }
                        pp.splice(i, 1);
                        ii = mmax(p.length, p2 && p2.length || 0);
                    }
                },
                fixM = function (path1, path2, a1, a2, i) {
                    if (path1 && path2 && path1[i][0] == "M" && path2[i][0] != "M") {
                        path2.splice(i, 0, ["M", a2.x, a2.y]);
                        a1.bx = 0;
                        a1.by = 0;
                        a1.x = path1[i][1];
                        a1.y = path1[i][2];
                        ii = mmax(p.length, p2 && p2.length || 0);
                    }
                };
            for (var i = 0, ii = mmax(p.length, p2 && p2.length || 0); i < ii; i++) {
                p[i] = processPath(p[i], attrs);
                fixArc(p, i);
                p2 && (p2[i] = processPath(p2[i], attrs2));
                p2 && fixArc(p2, i);
                fixM(p, p2, attrs, attrs2, i);
                fixM(p2, p, attrs2, attrs, i);
                var seg = p[i],
                    seg2 = p2 && p2[i],
                    seglen = seg.length,
                    seg2len = p2 && seg2.length;
                attrs.x = seg[seglen - 2];
                attrs.y = seg[seglen - 1];
                attrs.bx = toFloat(seg[seglen - 4]) || attrs.x;
                attrs.by = toFloat(seg[seglen - 3]) || attrs.y;
                attrs2.bx = p2 && (toFloat(seg2[seg2len - 4]) || attrs2.x);
                attrs2.by = p2 && (toFloat(seg2[seg2len - 3]) || attrs2.y);
                attrs2.x = p2 && seg2[seg2len - 2];
                attrs2.y = p2 && seg2[seg2len - 1];
            }
            if (!p2) {
                pth.curve = pathClone(p);
            }
            return p2 ? [p, p2] : p;
        }, null, pathClone),
        parseDots = R._parseDots = cacher(function (gradient) {
            var dots = [];
            for (var i = 0, ii = gradient.length; i < ii; i++) {
                var dot = {},
                    par = gradient[i].match(/^([^:]*):?([\d\.]*)/);
                dot.color = R.getRGB(par[1]);
                if (dot.color.error) {
                    return null;
                }
                dot.color = dot.color.hex;
                par[2] && (dot.offset = par[2] + "%");
                dots.push(dot);
            }
            for (i = 1, ii = dots.length - 1; i < ii; i++) {
                if (!dots[i].offset) {
                    var start = toFloat(dots[i - 1].offset || 0),
                        end = 0;
                    for (var j = i + 1; j < ii; j++) {
                        if (dots[j].offset) {
                            end = dots[j].offset;
                            break;
                        }
                    }
                    if (!end) {
                        end = 100;
                        j = ii;
                    }
                    end = toFloat(end);
                    var d = (end - start) / (j - i + 1);
                    for (; i < j; i++) {
                        start += d;
                        dots[i].offset = start + "%";
                    }
                }
            }
            return dots;
        }),
        tear = R._tear = function (el, paper) {
            el == paper.top && (paper.top = el.prev);
            el == paper.bottom && (paper.bottom = el.next);
            el.next && (el.next.prev = el.prev);
            el.prev && (el.prev.next = el.next);
        },
        tofront = R._tofront = function (el, paper) {
            if (paper.top === el) {
                return;
            }
            tear(el, paper);
            el.next = null;
            el.prev = paper.top;
            paper.top.next = el;
            paper.top = el;
        },
        toback = R._toback = function (el, paper) {
            if (paper.bottom === el) {
                return;
            }
            tear(el, paper);
            el.next = paper.bottom;
            el.prev = null;
            paper.bottom.prev = el;
            paper.bottom = el;
        },
        insertafter = R._insertafter = function (el, el2, paper) {
            tear(el, paper);
            el2 == paper.top && (paper.top = el);
            el2.next && (el2.next.prev = el);
            el.next = el2.next;
            el.prev = el2;
            el2.next = el;
        },
        insertbefore = R._insertbefore = function (el, el2, paper) {
            tear(el, paper);
            el2 == paper.bottom && (paper.bottom = el);
            el2.prev && (el2.prev.next = el);
            el.prev = el2.prev;
            el2.prev = el;
            el.next = el2;
        },
        
        toMatrix = R.toMatrix = function (path, transform) {
            var bb = pathDimensions(path),
                el = {
                    _: {
                        transform: E
                    },
                    getBBox: function () {
                        return bb;
                    }
                };
            extractTransform(el, transform);
            return el.matrix;
        },
        
        transformPath = R.transformPath = function (path, transform) {
            return mapPath(path, toMatrix(path, transform));
        },
        extractTransform = R._extractTransform = function (el, tstr) {
            if (tstr == null) {
                return el._.transform;
            }
            tstr = Str(tstr).replace(/\.{3}|\u2026/g, el._.transform || E);
            var tdata = R.parseTransformString(tstr),
                deg = 0,
                dx = 0,
                dy = 0,
                sx = 1,
                sy = 1,
                _ = el._,
                m = new Matrix;
            _.transform = tdata || [];
            if (tdata) {
                for (var i = 0, ii = tdata.length; i < ii; i++) {
                    var t = tdata[i],
                        tlen = t.length,
                        command = Str(t[0]).toLowerCase(),
                        absolute = t[0] != command,
                        inver = absolute ? m.invert() : 0,
                        x1,
                        y1,
                        x2,
                        y2,
                        bb;
                    if (command == "t" && tlen == 3) {
                        if (absolute) {
                            x1 = inver.x(0, 0);
                            y1 = inver.y(0, 0);
                            x2 = inver.x(t[1], t[2]);
                            y2 = inver.y(t[1], t[2]);
                            m.translate(x2 - x1, y2 - y1);
                        } else {
                            m.translate(t[1], t[2]);
                        }
                    } else if (command == "r") {
                        if (tlen == 2) {
                            bb = bb || el.getBBox(1);
                            m.rotate(t[1], bb.x + bb.width / 2, bb.y + bb.height / 2);
                            deg += t[1];
                        } else if (tlen == 4) {
                            if (absolute) {
                                x2 = inver.x(t[2], t[3]);
                                y2 = inver.y(t[2], t[3]);
                                m.rotate(t[1], x2, y2);
                            } else {
                                m.rotate(t[1], t[2], t[3]);
                            }
                            deg += t[1];
                        }
                    } else if (command == "s") {
                        if (tlen == 2 || tlen == 3) {
                            bb = bb || el.getBBox(1);
                            m.scale(t[1], t[tlen - 1], bb.x + bb.width / 2, bb.y + bb.height / 2);
                            sx *= t[1];
                            sy *= t[tlen - 1];
                        } else if (tlen == 5) {
                            if (absolute) {
                                x2 = inver.x(t[3], t[4]);
                                y2 = inver.y(t[3], t[4]);
                                m.scale(t[1], t[2], x2, y2);
                            } else {
                                m.scale(t[1], t[2], t[3], t[4]);
                            }
                            sx *= t[1];
                            sy *= t[2];
                        }
                    } else if (command == "m" && tlen == 7) {
                        m.add(t[1], t[2], t[3], t[4], t[5], t[6]);
                    }
                    _.dirtyT = 1;
                    el.matrix = m;
                }
            }

            
            el.matrix = m;

            _.sx = sx;
            _.sy = sy;
            _.deg = deg;
            _.dx = dx = m.e;
            _.dy = dy = m.f;

            if (sx == 1 && sy == 1 && !deg && _.bbox) {
                _.bbox.x += +dx;
                _.bbox.y += +dy;
            } else {
                _.dirtyT = 1;
            }
        },
        getEmpty = function (item) {
            var l = item[0];
            switch (l.toLowerCase()) {
                case "t": return [l, 0, 0];
                case "m": return [l, 1, 0, 0, 1, 0, 0];
                case "r": if (item.length == 4) {
                    return [l, 0, item[2], item[3]];
                } else {
                    return [l, 0];
                }
                case "s": if (item.length == 5) {
                    return [l, 1, 1, item[3], item[4]];
                } else if (item.length == 3) {
                    return [l, 1, 1];
                } else {
                    return [l, 1];
                }
            }
        },
        equaliseTransform = R._equaliseTransform = function (t1, t2) {
            t2 = Str(t2).replace(/\.{3}|\u2026/g, t1);
            t1 = R.parseTransformString(t1) || [];
            t2 = R.parseTransformString(t2) || [];
            var maxlength = mmax(t1.length, t2.length),
                from = [],
                to = [],
                i = 0, j, jj,
                tt1, tt2;
            for (; i < maxlength; i++) {
                tt1 = t1[i] || getEmpty(t2[i]);
                tt2 = t2[i] || getEmpty(tt1);
                if ((tt1[0] != tt2[0]) ||
                    (tt1[0].toLowerCase() == "r" && (tt1[2] != tt2[2] || tt1[3] != tt2[3])) ||
                    (tt1[0].toLowerCase() == "s" && (tt1[3] != tt2[3] || tt1[4] != tt2[4]))
                    ) {
                    return;
                }
                from[i] = [];
                to[i] = [];
                for (j = 0, jj = mmax(tt1.length, tt2.length); j < jj; j++) {
                    j in tt1 && (from[i][j] = tt1[j]);
                    j in tt2 && (to[i][j] = tt2[j]);
                }
            }
            return {
                from: from,
                to: to
            };
        };
    R._getContainer = function (x, y, w, h) {
        var container;
        container = h == null && !R.is(x, "object") ? g.doc.getElementById(x) : x;
        if (container == null) {
            return;
        }
        if (container.tagName) {
            if (y == null) {
                return {
                    container: container,
                    width: container.style.pixelWidth || container.offsetWidth,
                    height: container.style.pixelHeight || container.offsetHeight
                };
            } else {
                return {
                    container: container,
                    width: y,
                    height: w
                };
            }
        }
        return {
            container: 1,
            x: x,
            y: y,
            width: w,
            height: h
        };
    };
    
    R.pathToRelative = pathToRelative;
    R._engine = {};
    
    R.path2curve = path2curve;
    
    R.matrix = function (a, b, c, d, e, f) {
        return new Matrix(a, b, c, d, e, f);
    };
    function Matrix(a, b, c, d, e, f) {
        if (a != null) {
            this.a = +a;
            this.b = +b;
            this.c = +c;
            this.d = +d;
            this.e = +e;
            this.f = +f;
        } else {
            this.a = 1;
            this.b = 0;
            this.c = 0;
            this.d = 1;
            this.e = 0;
            this.f = 0;
        }
    }
    (function (matrixproto) {
        
        matrixproto.add = function (a, b, c, d, e, f) {
            var out = [[], [], []],
                m = [[this.a, this.c, this.e], [this.b, this.d, this.f], [0, 0, 1]],
                matrix = [[a, c, e], [b, d, f], [0, 0, 1]],
                x, y, z, res;

            if (a && a instanceof Matrix) {
                matrix = [[a.a, a.c, a.e], [a.b, a.d, a.f], [0, 0, 1]];
            }

            for (x = 0; x < 3; x++) {
                for (y = 0; y < 3; y++) {
                    res = 0;
                    for (z = 0; z < 3; z++) {
                        res += m[x][z] * matrix[z][y];
                    }
                    out[x][y] = res;
                }
            }
            this.a = out[0][0];
            this.b = out[1][0];
            this.c = out[0][1];
            this.d = out[1][1];
            this.e = out[0][2];
            this.f = out[1][2];
        };
        
        matrixproto.invert = function () {
            var me = this,
                x = me.a * me.d - me.b * me.c;
            return new Matrix(me.d / x, -me.b / x, -me.c / x, me.a / x, (me.c * me.f - me.d * me.e) / x, (me.b * me.e - me.a * me.f) / x);
        };
        
        matrixproto.clone = function () {
            return new Matrix(this.a, this.b, this.c, this.d, this.e, this.f);
        };
        
        matrixproto.translate = function (x, y) {
            this.add(1, 0, 0, 1, x, y);
        };
        
        matrixproto.scale = function (x, y, cx, cy) {
            y == null && (y = x);
            (cx || cy) && this.add(1, 0, 0, 1, cx, cy);
            this.add(x, 0, 0, y, 0, 0);
            (cx || cy) && this.add(1, 0, 0, 1, -cx, -cy);
        };
        
        matrixproto.rotate = function (a, x, y) {
            a = R.rad(a);
            x = x || 0;
            y = y || 0;
            var cos = +math.cos(a).toFixed(9),
                sin = +math.sin(a).toFixed(9);
            this.add(cos, sin, -sin, cos, x, y);
            this.add(1, 0, 0, 1, -x, -y);
        };
        
        matrixproto.x = function (x, y) {
            return x * this.a + y * this.c + this.e;
        };
        
        matrixproto.y = function (x, y) {
            return x * this.b + y * this.d + this.f;
        };
        matrixproto.get = function (i) {
            return +this[Str.fromCharCode(97 + i)].toFixed(4);
        };
        matrixproto.toString = function () {
            return R.svg ?
                "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")" :
                [this.get(0), this.get(2), this.get(1), this.get(3), 0, 0].join();
        };
        matrixproto.toFilter = function () {
            return "progid:DXImageTransform.Microsoft.Matrix(M11=" + this.get(0) +
                ", M12=" + this.get(2) + ", M21=" + this.get(1) + ", M22=" + this.get(3) +
                ", Dx=" + this.get(4) + ", Dy=" + this.get(5) + ", sizingmethod='auto expand')";
        };
        matrixproto.offset = function () {
            return [this.e.toFixed(4), this.f.toFixed(4)];
        };
        function norm(a) {
            return a[0] * a[0] + a[1] * a[1];
        }
        function normalize(a) {
            var mag = math.sqrt(norm(a));
            a[0] && (a[0] /= mag);
            a[1] && (a[1] /= mag);
        }
        
        matrixproto.split = function () {
            var out = {};
            // translation
            out.dx = this.e;
            out.dy = this.f;

            // scale and shear
            var row = [[this.a, this.c], [this.b, this.d]];
            out.scalex = math.sqrt(norm(row[0]));
            normalize(row[0]);

            out.shear = row[0][0] * row[1][0] + row[0][1] * row[1][1];
            row[1] = [row[1][0] - row[0][0] * out.shear, row[1][1] - row[0][1] * out.shear];

            out.scaley = math.sqrt(norm(row[1]));
            normalize(row[1]);
            out.shear /= out.scaley;

            // rotation
            var sin = -row[0][1],
                cos = row[1][1];
            if (cos < 0) {
                out.rotate = R.deg(math.acos(cos));
                if (sin < 0) {
                    out.rotate = 360 - out.rotate;
                }
            } else {
                out.rotate = R.deg(math.asin(sin));
            }

            out.isSimple = !+out.shear.toFixed(9) && (out.scalex.toFixed(9) == out.scaley.toFixed(9) || !out.rotate);
            out.isSuperSimple = !+out.shear.toFixed(9) && out.scalex.toFixed(9) == out.scaley.toFixed(9) && !out.rotate;
            out.noRotation = !+out.shear.toFixed(9) && !out.rotate;
            return out;
        };
        
        matrixproto.toTransformString = function (shorter) {
            var s = shorter || this[split]();
            if (s.isSimple) {
                s.scalex = +s.scalex.toFixed(4);
                s.scaley = +s.scaley.toFixed(4);
                s.rotate = +s.rotate.toFixed(4);
                return  (s.dx || s.dy ? "t" + [s.dx, s.dy] : E) + 
                        (s.scalex != 1 || s.scaley != 1 ? "s" + [s.scalex, s.scaley, 0, 0] : E) +
                        (s.rotate ? "r" + [s.rotate, 0, 0] : E);
            } else {
                return "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)];
            }
        };
    })(Matrix.prototype);

    // WebKit rendering bug workaround method
    var version = navigator.userAgent.match(/Version\/(.*?)\s/) || navigator.userAgent.match(/Chrome\/(\d+)/);
    if ((navigator.vendor == "Apple Computer, Inc.") && (version && version[1] < 4 || navigator.platform.slice(0, 2) == "iP") ||
        (navigator.vendor == "Google Inc." && version && version[1] < 8)) {
        
        paperproto.safari = function () {
            var rect = this.rect(-99, -99, this.width + 99, this.height + 99).attr({stroke: "none"});
            setTimeout(function () {rect.remove();});
        };
    } else {
        paperproto.safari = fun;
    }
 
    var preventDefault = function () {
        this.returnValue = false;
    },
    preventTouch = function () {
        return this.originalEvent.preventDefault();
    },
    stopPropagation = function () {
        this.cancelBubble = true;
    },
    stopTouch = function () {
        return this.originalEvent.stopPropagation();
    },
    addEvent = (function () {
        if (g.doc.addEventListener) {
            return function (obj, type, fn, element) {
                var realName = supportsTouch && touchMap[type] ? touchMap[type] : type,
                    f = function (e) {
                        var scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
                            scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft,
                            x = e.clientX + scrollX,
                            y = e.clientY + scrollY;
                    if (supportsTouch && touchMap[has](type)) {
                        for (var i = 0, ii = e.targetTouches && e.targetTouches.length; i < ii; i++) {
                            if (e.targetTouches[i].target == obj) {
                                var olde = e;
                                e = e.targetTouches[i];
                                e.originalEvent = olde;
                                e.preventDefault = preventTouch;
                                e.stopPropagation = stopTouch;
                                break;
                            }
                        }
                    }
                    return fn.call(element, e, x, y);
                };
                obj.addEventListener(realName, f, false);
                return function () {
                    obj.removeEventListener(realName, f, false);
                    return true;
                };
            };
        } else if (g.doc.attachEvent) {
            return function (obj, type, fn, element) {
                var f = function (e) {
                    e = e || g.win.event;
                    var scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
                        scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft,
                        x = e.clientX + scrollX,
                        y = e.clientY + scrollY;
                    e.preventDefault = e.preventDefault || preventDefault;
                    e.stopPropagation = e.stopPropagation || stopPropagation;
                    return fn.call(element, e, x, y);
                };
                obj.attachEvent("on" + type, f);
                var detacher = function () {
                    obj.detachEvent("on" + type, f);
                    return true;
                };
                return detacher;
            };
        }
    })(),
    drag = [],
    dragMove = function (e) {
        var x = e.clientX,
            y = e.clientY,
            scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
            scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft,
            dragi,
            j = drag.length;
        while (j--) {
            dragi = drag[j];
            if (supportsTouch) {
                var i = e.touches.length,
                    touch;
                while (i--) {
                    touch = e.touches[i];
                    if (touch.identifier == dragi.el._drag.id) {
                        x = touch.clientX;
                        y = touch.clientY;
                        (e.originalEvent ? e.originalEvent : e).preventDefault();
                        break;
                    }
                }
            } else {
                e.preventDefault();
            }
            var node = dragi.el.node,
                o,
                next = node.nextSibling,
                parent = node.parentNode,
                display = node.style.display;
            g.win.opera && parent.removeChild(node);
            node.style.display = "none";
            o = dragi.el.paper.getElementByPoint(x, y);
            node.style.display = display;
            g.win.opera && (next ? parent.insertBefore(node, next) : parent.appendChild(node));
            o && eve("raphael.drag.over." + dragi.el.id, dragi.el, o);
            x += scrollX;
            y += scrollY;
            eve("raphael.drag.move." + dragi.el.id, dragi.move_scope || dragi.el, x - dragi.el._drag.x, y - dragi.el._drag.y, x, y, e);
        }
    },
    dragUp = function (e) {
        R.unmousemove(dragMove).unmouseup(dragUp);
        var i = drag.length,
            dragi;
        while (i--) {
            dragi = drag[i];
            dragi.el._drag = {};
            eve("raphael.drag.end." + dragi.el.id, dragi.end_scope || dragi.start_scope || dragi.move_scope || dragi.el, e);
        }
        drag = [];
    },
    
    elproto = R.el = {};
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    for (var i = events.length; i--;) {
        (function (eventName) {
            R[eventName] = elproto[eventName] = function (fn, scope) {
                if (R.is(fn, "function")) {
                    this.events = this.events || [];
                    this.events.push({name: eventName, f: fn, unbind: addEvent(this.shape || this.node || g.doc, eventName, fn, scope || this)});
                }
                return this;
            };
            R["un" + eventName] = elproto["un" + eventName] = function (fn) {
                var events = this.events || [],
                    l = events.length;
                while (l--) if (events[l].name == eventName && events[l].f == fn) {
                    events[l].unbind();
                    events.splice(l, 1);
                    !events.length && delete this.events;
                    return this;
                }
                return this;
            };
        })(events[i]);
    }
    
    
    elproto.data = function (key, value) {
        var data = eldata[this.id] = eldata[this.id] || {};
        if (arguments.length == 1) {
            if (R.is(key, "object")) {
                for (var i in key) if (key[has](i)) {
                    this.data(i, key[i]);
                }
                return this;
            }
            eve("raphael.data.get." + this.id, this, data[key], key);
            return data[key];
        }
        data[key] = value;
        eve("raphael.data.set." + this.id, this, value, key);
        return this;
    };
    
    elproto.removeData = function (key) {
        if (key == null) {
            eldata[this.id] = {};
        } else {
            eldata[this.id] && delete eldata[this.id][key];
        }
        return this;
    };
    
    elproto.hover = function (f_in, f_out, scope_in, scope_out) {
        return this.mouseover(f_in, scope_in).mouseout(f_out, scope_out || scope_in);
    };
    
    elproto.unhover = function (f_in, f_out) {
        return this.unmouseover(f_in).unmouseout(f_out);
    };
    var draggable = [];
    
    elproto.drag = function (onmove, onstart, onend, move_scope, start_scope, end_scope) {
        function start(e) {
            (e.originalEvent || e).preventDefault();
            var scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
                scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft;
            this._drag.x = e.clientX + scrollX;
            this._drag.y = e.clientY + scrollY;
            this._drag.id = e.identifier;
            !drag.length && R.mousemove(dragMove).mouseup(dragUp);
            drag.push({el: this, move_scope: move_scope, start_scope: start_scope, end_scope: end_scope});
            onstart && eve.on("raphael.drag.start." + this.id, onstart);
            onmove && eve.on("raphael.drag.move." + this.id, onmove);
            onend && eve.on("raphael.drag.end." + this.id, onend);
            eve("raphael.drag.start." + this.id, start_scope || move_scope || this, e.clientX + scrollX, e.clientY + scrollY, e);
        }
        this._drag = {};
        draggable.push({el: this, start: start});
        this.mousedown(start);
        return this;
    };
    
    elproto.onDragOver = function (f) {
        f ? eve.on("raphael.drag.over." + this.id, f) : eve.unbind("raphael.drag.over." + this.id);
    };
    
    elproto.undrag = function () {
        var i = draggable.length;
        while (i--) if (draggable[i].el == this) {
            this.unmousedown(draggable[i].start);
            draggable.splice(i, 1);
            eve.unbind("raphael.drag.*." + this.id);
        }
        !draggable.length && R.unmousemove(dragMove).unmouseup(dragUp);
    };
    
    paperproto.circle = function (x, y, r) {
        var out = R._engine.circle(this, x || 0, y || 0, r || 0);
        this.__set__ && this.__set__.push(out);
        return out;
    };
    
    paperproto.rect = function (x, y, w, h, r) {
        var out = R._engine.rect(this, x || 0, y || 0, w || 0, h || 0, r || 0);
        this.__set__ && this.__set__.push(out);
        return out;
    };
    
    paperproto.ellipse = function (x, y, rx, ry) {
        var out = R._engine.ellipse(this, x || 0, y || 0, rx || 0, ry || 0);
        this.__set__ && this.__set__.push(out);
        return out;
    };
    
    paperproto.path = function (pathString) {
        pathString && !R.is(pathString, string) && !R.is(pathString[0], array) && (pathString += E);
        var out = R._engine.path(R.format[apply](R, arguments), this);
        this.__set__ && this.__set__.push(out);
        return out;
    };
    
    paperproto.image = function (src, x, y, w, h) {
        var out = R._engine.image(this, src || "about:blank", x || 0, y || 0, w || 0, h || 0);
        this.__set__ && this.__set__.push(out);
        return out;
    };
    
    paperproto.text = function (x, y, text) {
        var out = R._engine.text(this, x || 0, y || 0, Str(text));
        this.__set__ && this.__set__.push(out);
        return out;
    };
    
    paperproto.set = function (itemsArray) {
        !R.is(itemsArray, "array") && (itemsArray = Array.prototype.splice.call(arguments, 0, arguments.length));
        var out = new Set(itemsArray);
        this.__set__ && this.__set__.push(out);
        return out;
    };
    
    paperproto.setStart = function (set) {
        this.__set__ = set || this.set();
    };
    
    paperproto.setFinish = function (set) {
        var out = this.__set__;
        delete this.__set__;
        return out;
    };
    
    paperproto.setSize = function (width, height) {
        return R._engine.setSize.call(this, width, height);
    };
    
    paperproto.setViewBox = function (x, y, w, h, fit) {
        return R._engine.setViewBox.call(this, x, y, w, h, fit);
    };
    
    
    paperproto.top = paperproto.bottom = null;
    
    paperproto.raphael = R;
    var getOffset = function (elem) {
        var box = elem.getBoundingClientRect(),
            doc = elem.ownerDocument,
            body = doc.body,
            docElem = doc.documentElement,
            clientTop = docElem.clientTop || body.clientTop || 0, clientLeft = docElem.clientLeft || body.clientLeft || 0,
            top  = box.top  + (g.win.pageYOffset || docElem.scrollTop || body.scrollTop ) - clientTop,
            left = box.left + (g.win.pageXOffset || docElem.scrollLeft || body.scrollLeft) - clientLeft;
        return {
            y: top,
            x: left
        };
    };
    
    paperproto.getElementByPoint = function (x, y) {
        var paper = this,
            svg = paper.canvas,
            target = g.doc.elementFromPoint(x, y);
        if (g.win.opera && target.tagName == "svg") {
            var so = getOffset(svg),
                sr = svg.createSVGRect();
            sr.x = x - so.x;
            sr.y = y - so.y;
            sr.width = sr.height = 1;
            var hits = svg.getIntersectionList(sr, null);
            if (hits.length) {
                target = hits[hits.length - 1];
            }
        }
        if (!target) {
            return null;
        }
        while (target.parentNode && target != svg.parentNode && !target.raphael) {
            target = target.parentNode;
        }
        target == paper.canvas.parentNode && (target = svg);
        target = target && target.raphael ? paper.getById(target.raphaelid) : null;
        return target;
    };
    
    paperproto.getById = function (id) {
        var bot = this.bottom;
        while (bot) {
            if (bot.id == id) {
                return bot;
            }
            bot = bot.next;
        }
        return null;
    };
    
    paperproto.forEach = function (callback, thisArg) {
        var bot = this.bottom;
        while (bot) {
            if (callback.call(thisArg, bot) === false) {
                return this;
            }
            bot = bot.next;
        }
        return this;
    };
    
    paperproto.getElementsByPoint = function (x, y) {
        var set = this.set();
        this.forEach(function (el) {
            if (el.isPointInside(x, y)) {
                set.push(el);
            }
        });
        return set;
    };
    function x_y() {
        return this.x + S + this.y;
    }
    function x_y_w_h() {
        return this.x + S + this.y + S + this.width + " \xd7 " + this.height;
    }
    
    elproto.isPointInside = function (x, y) {
        var rp = this.realPath = this.realPath || getPath[this.type](this);
        return R.isPointInsidePath(rp, x, y);
    };
    
    elproto.getBBox = function (isWithoutTransform) {
        if (this.removed) {
            return {};
        }
        var _ = this._;
        if (isWithoutTransform) {
            if (_.dirty || !_.bboxwt) {
                this.realPath = getPath[this.type](this);
                _.bboxwt = pathDimensions(this.realPath);
                _.bboxwt.toString = x_y_w_h;
                _.dirty = 0;
            }
            return _.bboxwt;
        }
        if (_.dirty || _.dirtyT || !_.bbox) {
            if (_.dirty || !this.realPath) {
                _.bboxwt = 0;
                this.realPath = getPath[this.type](this);
            }
            _.bbox = pathDimensions(mapPath(this.realPath, this.matrix));
            _.bbox.toString = x_y_w_h;
            _.dirty = _.dirtyT = 0;
        }
        return _.bbox;
    };
    
    elproto.clone = function () {
        if (this.removed) {
            return null;
        }
        var out = this.paper[this.type]().attr(this.attr());
        this.__set__ && this.__set__.push(out);
        return out;
    };
    
    elproto.glow = function (glow) {
        if (this.type == "text") {
            return null;
        }
        glow = glow || {};
        var s = {
            width: (glow.width || 10) + (+this.attr("stroke-width") || 1),
            fill: glow.fill || false,
            opacity: glow.opacity || .5,
            offsetx: glow.offsetx || 0,
            offsety: glow.offsety || 0,
            color: glow.color || "#000"
        },
            c = s.width / 2,
            r = this.paper,
            out = r.set(),
            path = this.realPath || getPath[this.type](this);
        path = this.matrix ? mapPath(path, this.matrix) : path;
        for (var i = 1; i < c + 1; i++) {
            out.push(r.path(path).attr({
                stroke: s.color,
                fill: s.fill ? s.color : "none",
                "stroke-linejoin": "round",
                "stroke-linecap": "round",
                "stroke-width": +(s.width / c * i).toFixed(3),
                opacity: +(s.opacity / c).toFixed(3)
            }));
        }
        return out.insertBefore(this).translate(s.offsetx, s.offsety);
    };
    var curveslengths = {},
    getPointAtSegmentLength = function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length) {
        if (length == null) {
            return bezlen(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y);
        } else {
            return R.findDotsAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, getTatLen(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length));
        }
    },
    getLengthFactory = function (istotal, subpath) {
        return function (path, length, onlystart) {
            path = path2curve(path);
            var x, y, p, l, sp = "", subpaths = {}, point,
                len = 0;
            for (var i = 0, ii = path.length; i < ii; i++) {
                p = path[i];
                if (p[0] == "M") {
                    x = +p[1];
                    y = +p[2];
                } else {
                    l = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
                    if (len + l > length) {
                        if (subpath && !subpaths.start) {
                            point = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len);
                            sp += ["C" + point.start.x, point.start.y, point.m.x, point.m.y, point.x, point.y];
                            if (onlystart) {return sp;}
                            subpaths.start = sp;
                            sp = ["M" + point.x, point.y + "C" + point.n.x, point.n.y, point.end.x, point.end.y, p[5], p[6]].join();
                            len += l;
                            x = +p[5];
                            y = +p[6];
                            continue;
                        }
                        if (!istotal && !subpath) {
                            point = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len);
                            return {x: point.x, y: point.y, alpha: point.alpha};
                        }
                    }
                    len += l;
                    x = +p[5];
                    y = +p[6];
                }
                sp += p.shift() + p;
            }
            subpaths.end = sp;
            point = istotal ? len : subpath ? subpaths : R.findDotsAtSegment(x, y, p[0], p[1], p[2], p[3], p[4], p[5], 1);
            point.alpha && (point = {x: point.x, y: point.y, alpha: point.alpha});
            return point;
        };
    };
    var getTotalLength = getLengthFactory(1),
        getPointAtLength = getLengthFactory(),
        getSubpathsAtLength = getLengthFactory(0, 1);
    
    R.getTotalLength = getTotalLength;
    
    R.getPointAtLength = getPointAtLength;
    
    R.getSubpath = function (path, from, to) {
        if (this.getTotalLength(path) - to < 1e-6) {
            return getSubpathsAtLength(path, from).end;
        }
        var a = getSubpathsAtLength(path, to, 1);
        return from ? getSubpathsAtLength(a, from).end : a;
    };
    
    elproto.getTotalLength = function () {
        if (this.type != "path") {return;}
        if (this.node.getTotalLength) {
            return this.node.getTotalLength();
        }
        return getTotalLength(this.attrs.path);
    };
    
    elproto.getPointAtLength = function (length) {
        if (this.type != "path") {return;}
        return getPointAtLength(this.attrs.path, length);
    };
    
    elproto.getSubpath = function (from, to) {
        if (this.type != "path") {return;}
        return R.getSubpath(this.attrs.path, from, to);
    };
    
    var ef = R.easing_formulas = {
        linear: function (n) {
            return n;
        },
        "<": function (n) {
            return pow(n, 1.7);
        },
        ">": function (n) {
            return pow(n, .48);
        },
        "<>": function (n) {
            var q = .48 - n / 1.04,
                Q = math.sqrt(.1734 + q * q),
                x = Q - q,
                X = pow(abs(x), 1 / 3) * (x < 0 ? -1 : 1),
                y = -Q - q,
                Y = pow(abs(y), 1 / 3) * (y < 0 ? -1 : 1),
                t = X + Y + .5;
            return (1 - t) * 3 * t * t + t * t * t;
        },
        backIn: function (n) {
            var s = 1.70158;
            return n * n * ((s + 1) * n - s);
        },
        backOut: function (n) {
            n = n - 1;
            var s = 1.70158;
            return n * n * ((s + 1) * n + s) + 1;
        },
        elastic: function (n) {
            if (n == !!n) {
                return n;
            }
            return pow(2, -10 * n) * math.sin((n - .075) * (2 * PI) / .3) + 1;
        },
        bounce: function (n) {
            var s = 7.5625,
                p = 2.75,
                l;
            if (n < (1 / p)) {
                l = s * n * n;
            } else {
                if (n < (2 / p)) {
                    n -= (1.5 / p);
                    l = s * n * n + .75;
                } else {
                    if (n < (2.5 / p)) {
                        n -= (2.25 / p);
                        l = s * n * n + .9375;
                    } else {
                        n -= (2.625 / p);
                        l = s * n * n + .984375;
                    }
                }
            }
            return l;
        }
    };
    ef.easeIn = ef["ease-in"] = ef["<"];
    ef.easeOut = ef["ease-out"] = ef[">"];
    ef.easeInOut = ef["ease-in-out"] = ef["<>"];
    ef["back-in"] = ef.backIn;
    ef["back-out"] = ef.backOut;

    var animationElements = [],
        requestAnimFrame = window.requestAnimationFrame       ||
                           window.webkitRequestAnimationFrame ||
                           window.mozRequestAnimationFrame    ||
                           window.oRequestAnimationFrame      ||
                           window.msRequestAnimationFrame     ||
                           function (callback) {
                               setTimeout(callback, 16);
                           },
        animation = function () {
            var Now = +new Date,
                l = 0;
            for (; l < animationElements.length; l++) {
                var e = animationElements[l];
                if (e.el.removed || e.paused) {
                    continue;
                }
                var time = Now - e.start,
                    ms = e.ms,
                    easing = e.easing,
                    from = e.from,
                    diff = e.diff,
                    to = e.to,
                    t = e.t,
                    that = e.el,
                    set = {},
                    now,
                    init = {},
                    key;
                if (e.initstatus) {
                    time = (e.initstatus * e.anim.top - e.prev) / (e.percent - e.prev) * ms;
                    e.status = e.initstatus;
                    delete e.initstatus;
                    e.stop && animationElements.splice(l--, 1);
                } else {
                    e.status = (e.prev + (e.percent - e.prev) * (time / ms)) / e.anim.top;
                }
                if (time < 0) {
                    continue;
                }
                if (time < ms) {
                    var pos = easing(time / ms);
                    for (var attr in from) if (from[has](attr)) {
                        switch (availableAnimAttrs[attr]) {
                            case nu:
                                now = +from[attr] + pos * ms * diff[attr];
                                break;
                            case "colour":
                                now = "rgb(" + [
                                    upto255(round(from[attr].r + pos * ms * diff[attr].r)),
                                    upto255(round(from[attr].g + pos * ms * diff[attr].g)),
                                    upto255(round(from[attr].b + pos * ms * diff[attr].b))
                                ].join(",") + ")";
                                break;
                            case "path":
                                now = [];
                                for (var i = 0, ii = from[attr].length; i < ii; i++) {
                                    now[i] = [from[attr][i][0]];
                                    for (var j = 1, jj = from[attr][i].length; j < jj; j++) {
                                        now[i][j] = +from[attr][i][j] + pos * ms * diff[attr][i][j];
                                    }
                                    now[i] = now[i].join(S);
                                }
                                now = now.join(S);
                                break;
                            case "transform":
                                if (diff[attr].real) {
                                    now = [];
                                    for (i = 0, ii = from[attr].length; i < ii; i++) {
                                        now[i] = [from[attr][i][0]];
                                        for (j = 1, jj = from[attr][i].length; j < jj; j++) {
                                            now[i][j] = from[attr][i][j] + pos * ms * diff[attr][i][j];
                                        }
                                    }
                                } else {
                                    var get = function (i) {
                                        return +from[attr][i] + pos * ms * diff[attr][i];
                                    };
                                    // now = [["r", get(2), 0, 0], ["t", get(3), get(4)], ["s", get(0), get(1), 0, 0]];
                                    now = [["m", get(0), get(1), get(2), get(3), get(4), get(5)]];
                                }
                                break;
                            case "csv":
                                if (attr == "clip-rect") {
                                    now = [];
                                    i = 4;
                                    while (i--) {
                                        now[i] = +from[attr][i] + pos * ms * diff[attr][i];
                                    }
                                }
                                break;
                            default:
                                var from2 = [][concat](from[attr]);
                                now = [];
                                i = that.paper.customAttributes[attr].length;
                                while (i--) {
                                    now[i] = +from2[i] + pos * ms * diff[attr][i];
                                }
                                break;
                        }
                        set[attr] = now;
                    }
                    that.attr(set);
                    (function (id, that, anim) {
                        setTimeout(function () {
                            eve("raphael.anim.frame." + id, that, anim);
                        });
                    })(that.id, that, e.anim);
                } else {
                    (function(f, el, a) {
                        setTimeout(function() {
                            eve("raphael.anim.frame." + el.id, el, a);
                            eve("raphael.anim.finish." + el.id, el, a);
                            R.is(f, "function") && f.call(el);
                        });
                    })(e.callback, that, e.anim);
                    that.attr(to);
                    animationElements.splice(l--, 1);
                    if (e.repeat > 1 && !e.next) {
                        for (key in to) if (to[has](key)) {
                            init[key] = e.totalOrigin[key];
                        }
                        e.el.attr(init);
                        runAnimation(e.anim, e.el, e.anim.percents[0], null, e.totalOrigin, e.repeat - 1);
                    }
                    if (e.next && !e.stop) {
                        runAnimation(e.anim, e.el, e.next, null, e.totalOrigin, e.repeat);
                    }
                }
            }
            R.svg && that && that.paper && that.paper.safari();
            animationElements.length && requestAnimFrame(animation);
        },
        upto255 = function (color) {
            return color > 255 ? 255 : color < 0 ? 0 : color;
        };
    
    elproto.animateWith = function (el, anim, params, ms, easing, callback) {
        var element = this;
        if (element.removed) {
            callback && callback.call(element);
            return element;
        }
        var a = params instanceof Animation ? params : R.animation(params, ms, easing, callback),
            x, y;
        runAnimation(a, element, a.percents[0], null, element.attr());
        for (var i = 0, ii = animationElements.length; i < ii; i++) {
            if (animationElements[i].anim == anim && animationElements[i].el == el) {
                animationElements[ii - 1].start = animationElements[i].start;
                break;
            }
        }
        return element;
        // 
        // 
        // var a = params ? R.animation(params, ms, easing, callback) : anim,
        //     status = element.status(anim);
        // return this.animate(a).status(a, status * anim.ms / a.ms);
    };
    function CubicBezierAtTime(t, p1x, p1y, p2x, p2y, duration) {
        var cx = 3 * p1x,
            bx = 3 * (p2x - p1x) - cx,
            ax = 1 - cx - bx,
            cy = 3 * p1y,
            by = 3 * (p2y - p1y) - cy,
            ay = 1 - cy - by;
        function sampleCurveX(t) {
            return ((ax * t + bx) * t + cx) * t;
        }
        function solve(x, epsilon) {
            var t = solveCurveX(x, epsilon);
            return ((ay * t + by) * t + cy) * t;
        }
        function solveCurveX(x, epsilon) {
            var t0, t1, t2, x2, d2, i;
            for(t2 = x, i = 0; i < 8; i++) {
                x2 = sampleCurveX(t2) - x;
                if (abs(x2) < epsilon) {
                    return t2;
                }
                d2 = (3 * ax * t2 + 2 * bx) * t2 + cx;
                if (abs(d2) < 1e-6) {
                    break;
                }
                t2 = t2 - x2 / d2;
            }
            t0 = 0;
            t1 = 1;
            t2 = x;
            if (t2 < t0) {
                return t0;
            }
            if (t2 > t1) {
                return t1;
            }
            while (t0 < t1) {
                x2 = sampleCurveX(t2);
                if (abs(x2 - x) < epsilon) {
                    return t2;
                }
                if (x > x2) {
                    t0 = t2;
                } else {
                    t1 = t2;
                }
                t2 = (t1 - t0) / 2 + t0;
            }
            return t2;
        }
        return solve(t, 1 / (200 * duration));
    }
    elproto.onAnimation = function (f) {
        f ? eve.on("raphael.anim.frame." + this.id, f) : eve.unbind("raphael.anim.frame." + this.id);
        return this;
    };
    function Animation(anim, ms) {
        var percents = [],
            newAnim = {};
        this.ms = ms;
        this.times = 1;
        if (anim) {
            for (var attr in anim) if (anim[has](attr)) {
                newAnim[toFloat(attr)] = anim[attr];
                percents.push(toFloat(attr));
            }
            percents.sort(sortByNumber);
        }
        this.anim = newAnim;
        this.top = percents[percents.length - 1];
        this.percents = percents;
    }
    
    Animation.prototype.delay = function (delay) {
        var a = new Animation(this.anim, this.ms);
        a.times = this.times;
        a.del = +delay || 0;
        return a;
    };
    
    Animation.prototype.repeat = function (times) { 
        var a = new Animation(this.anim, this.ms);
        a.del = this.del;
        a.times = math.floor(mmax(times, 0)) || 1;
        return a;
    };
    function runAnimation(anim, element, percent, status, totalOrigin, times) {
        percent = toFloat(percent);
        var params,
            isInAnim,
            isInAnimSet,
            percents = [],
            next,
            prev,
            timestamp,
            ms = anim.ms,
            from = {},
            to = {},
            diff = {};
        if (status) {
            for (i = 0, ii = animationElements.length; i < ii; i++) {
                var e = animationElements[i];
                if (e.el.id == element.id && e.anim == anim) {
                    if (e.percent != percent) {
                        animationElements.splice(i, 1);
                        isInAnimSet = 1;
                    } else {
                        isInAnim = e;
                    }
                    element.attr(e.totalOrigin);
                    break;
                }
            }
        } else {
            status = +to; // NaN
        }
        for (var i = 0, ii = anim.percents.length; i < ii; i++) {
            if (anim.percents[i] == percent || anim.percents[i] > status * anim.top) {
                percent = anim.percents[i];
                prev = anim.percents[i - 1] || 0;
                ms = ms / anim.top * (percent - prev);
                next = anim.percents[i + 1];
                params = anim.anim[percent];
                break;
            } else if (status) {
                element.attr(anim.anim[anim.percents[i]]);
            }
        }
        if (!params) {
            return;
        }
        if (!isInAnim) {
            for (var attr in params) if (params[has](attr)) {
                if (availableAnimAttrs[has](attr) || element.paper.customAttributes[has](attr)) {
                    from[attr] = element.attr(attr);
                    (from[attr] == null) && (from[attr] = availableAttrs[attr]);
                    to[attr] = params[attr];
                    switch (availableAnimAttrs[attr]) {
                        case nu:
                            diff[attr] = (to[attr] - from[attr]) / ms;
                            break;
                        case "colour":
                            from[attr] = R.getRGB(from[attr]);
                            var toColour = R.getRGB(to[attr]);
                            diff[attr] = {
                                r: (toColour.r - from[attr].r) / ms,
                                g: (toColour.g - from[attr].g) / ms,
                                b: (toColour.b - from[attr].b) / ms
                            };
                            break;
                        case "path":
                            var pathes = path2curve(from[attr], to[attr]),
                                toPath = pathes[1];
                            from[attr] = pathes[0];
                            diff[attr] = [];
                            for (i = 0, ii = from[attr].length; i < ii; i++) {
                                diff[attr][i] = [0];
                                for (var j = 1, jj = from[attr][i].length; j < jj; j++) {
                                    diff[attr][i][j] = (toPath[i][j] - from[attr][i][j]) / ms;
                                }
                            }
                            break;
                        case "transform":
                            var _ = element._,
                                eq = equaliseTransform(_[attr], to[attr]);
                            if (eq) {
                                from[attr] = eq.from;
                                to[attr] = eq.to;
                                diff[attr] = [];
                                diff[attr].real = true;
                                for (i = 0, ii = from[attr].length; i < ii; i++) {
                                    diff[attr][i] = [from[attr][i][0]];
                                    for (j = 1, jj = from[attr][i].length; j < jj; j++) {
                                        diff[attr][i][j] = (to[attr][i][j] - from[attr][i][j]) / ms;
                                    }
                                }
                            } else {
                                var m = (element.matrix || new Matrix),
                                    to2 = {
                                        _: {transform: _.transform},
                                        getBBox: function () {
                                            return element.getBBox(1);
                                        }
                                    };
                                from[attr] = [
                                    m.a,
                                    m.b,
                                    m.c,
                                    m.d,
                                    m.e,
                                    m.f
                                ];
                                extractTransform(to2, to[attr]);
                                to[attr] = to2._.transform;
                                diff[attr] = [
                                    (to2.matrix.a - m.a) / ms,
                                    (to2.matrix.b - m.b) / ms,
                                    (to2.matrix.c - m.c) / ms,
                                    (to2.matrix.d - m.d) / ms,
                                    (to2.matrix.e - m.e) / ms,
                                    (to2.matrix.f - m.f) / ms
                                ];
                                // from[attr] = [_.sx, _.sy, _.deg, _.dx, _.dy];
                                // var to2 = {_:{}, getBBox: function () { return element.getBBox(); }};
                                // extractTransform(to2, to[attr]);
                                // diff[attr] = [
                                //     (to2._.sx - _.sx) / ms,
                                //     (to2._.sy - _.sy) / ms,
                                //     (to2._.deg - _.deg) / ms,
                                //     (to2._.dx - _.dx) / ms,
                                //     (to2._.dy - _.dy) / ms
                                // ];
                            }
                            break;
                        case "csv":
                            var values = Str(params[attr])[split](separator),
                                from2 = Str(from[attr])[split](separator);
                            if (attr == "clip-rect") {
                                from[attr] = from2;
                                diff[attr] = [];
                                i = from2.length;
                                while (i--) {
                                    diff[attr][i] = (values[i] - from[attr][i]) / ms;
                                }
                            }
                            to[attr] = values;
                            break;
                        default:
                            values = [][concat](params[attr]);
                            from2 = [][concat](from[attr]);
                            diff[attr] = [];
                            i = element.paper.customAttributes[attr].length;
                            while (i--) {
                                diff[attr][i] = ((values[i] || 0) - (from2[i] || 0)) / ms;
                            }
                            break;
                    }
                }
            }
            var easing = params.easing,
                easyeasy = R.easing_formulas[easing];
            if (!easyeasy) {
                easyeasy = Str(easing).match(bezierrg);
                if (easyeasy && easyeasy.length == 5) {
                    var curve = easyeasy;
                    easyeasy = function (t) {
                        return CubicBezierAtTime(t, +curve[1], +curve[2], +curve[3], +curve[4], ms);
                    };
                } else {
                    easyeasy = pipe;
                }
            }
            timestamp = params.start || anim.start || +new Date;
            e = {
                anim: anim,
                percent: percent,
                timestamp: timestamp,
                start: timestamp + (anim.del || 0),
                status: 0,
                initstatus: status || 0,
                stop: false,
                ms: ms,
                easing: easyeasy,
                from: from,
                diff: diff,
                to: to,
                el: element,
                callback: params.callback,
                prev: prev,
                next: next,
                repeat: times || anim.times,
                origin: element.attr(),
                totalOrigin: totalOrigin
            };
            animationElements.push(e);
            if (status && !isInAnim && !isInAnimSet) {
                e.stop = true;
                e.start = new Date - ms * status;
                if (animationElements.length == 1) {
                    return animation();
                }
            }
            if (isInAnimSet) {
                e.start = new Date - e.ms * status;
            }
            animationElements.length == 1 && requestAnimFrame(animation);
        } else {
            isInAnim.initstatus = status;
            isInAnim.start = new Date - isInAnim.ms * status;
        }
        eve("raphael.anim.start." + element.id, element, anim);
    }
    
    R.animation = function (params, ms, easing, callback) {
        if (params instanceof Animation) {
            return params;
        }
        if (R.is(easing, "function") || !easing) {
            callback = callback || easing || null;
            easing = null;
        }
        params = Object(params);
        ms = +ms || 0;
        var p = {},
            json,
            attr;
        for (attr in params) if (params[has](attr) && toFloat(attr) != attr && toFloat(attr) + "%" != attr) {
            json = true;
            p[attr] = params[attr];
        }
        if (!json) {
            return new Animation(params, ms);
        } else {
            easing && (p.easing = easing);
            callback && (p.callback = callback);
            return new Animation({100: p}, ms);
        }
    };
    
    elproto.animate = function (params, ms, easing, callback) {
        var element = this;
        if (element.removed) {
            callback && callback.call(element);
            return element;
        }
        var anim = params instanceof Animation ? params : R.animation(params, ms, easing, callback);
        runAnimation(anim, element, anim.percents[0], null, element.attr());
        return element;
    };
    
    elproto.setTime = function (anim, value) {
        if (anim && value != null) {
            this.status(anim, mmin(value, anim.ms) / anim.ms);
        }
        return this;
    };
    
    elproto.status = function (anim, value) {
        var out = [],
            i = 0,
            len,
            e;
        if (value != null) {
            runAnimation(anim, this, -1, mmin(value, 1));
            return this;
        } else {
            len = animationElements.length;
            for (; i < len; i++) {
                e = animationElements[i];
                if (e.el.id == this.id && (!anim || e.anim == anim)) {
                    if (anim) {
                        return e.status;
                    }
                    out.push({
                        anim: e.anim,
                        status: e.status
                    });
                }
            }
            if (anim) {
                return 0;
            }
            return out;
        }
    };
    
    elproto.pause = function (anim) {
        for (var i = 0; i < animationElements.length; i++) if (animationElements[i].el.id == this.id && (!anim || animationElements[i].anim == anim)) {
            if (eve("raphael.anim.pause." + this.id, this, animationElements[i].anim) !== false) {
                animationElements[i].paused = true;
            }
        }
        return this;
    };
    
    elproto.resume = function (anim) {
        for (var i = 0; i < animationElements.length; i++) if (animationElements[i].el.id == this.id && (!anim || animationElements[i].anim == anim)) {
            var e = animationElements[i];
            if (eve("raphael.anim.resume." + this.id, this, e.anim) !== false) {
                delete e.paused;
                this.status(e.anim, e.status);
            }
        }
        return this;
    };
    
    elproto.stop = function (anim) {
        for (var i = 0; i < animationElements.length; i++) if (animationElements[i].el.id == this.id && (!anim || animationElements[i].anim == anim)) {
            if (eve("raphael.anim.stop." + this.id, this, animationElements[i].anim) !== false) {
                animationElements.splice(i--, 1);
            }
        }
        return this;
    };
    function stopAnimation(paper) {
        for (var i = 0; i < animationElements.length; i++) if (animationElements[i].el.paper == paper) {
            animationElements.splice(i--, 1);
        }
    }
    eve.on("raphael.remove", stopAnimation);
    eve.on("raphael.clear", stopAnimation);
    elproto.toString = function () {
        return "Rapha\xebl\u2019s object";
    };

    // Set
    var Set = function (items) {
        this.items = [];
        this.length = 0;
        this.type = "set";
        if (items) {
            for (var i = 0, ii = items.length; i < ii; i++) {
                if (items[i] && (items[i].constructor == elproto.constructor || items[i].constructor == Set)) {
                    this[this.items.length] = this.items[this.items.length] = items[i];
                    this.length++;
                }
            }
        }
    },
    setproto = Set.prototype;
    
    setproto.push = function () {
        var item,
            len;
        for (var i = 0, ii = arguments.length; i < ii; i++) {
            item = arguments[i];
            if (item && (item.constructor == elproto.constructor || item.constructor == Set)) {
                len = this.items.length;
                this[len] = this.items[len] = item;
                this.length++;
            }
        }
        return this;
    };
    
    setproto.pop = function () {
        this.length && delete this[this.length--];
        return this.items.pop();
    };
    
    setproto.forEach = function (callback, thisArg) {
        for (var i = 0, ii = this.items.length; i < ii; i++) {
            if (callback.call(thisArg, this.items[i], i) === false) {
                return this;
            }
        }
        return this;
    };
    for (var method in elproto) if (elproto[has](method)) {
        setproto[method] = (function (methodname) {
            return function () {
                var arg = arguments;
                return this.forEach(function (el) {
                    el[methodname][apply](el, arg);
                });
            };
        })(method);
    }
    setproto.attr = function (name, value) {
        if (name && R.is(name, array) && R.is(name[0], "object")) {
            for (var j = 0, jj = name.length; j < jj; j++) {
                this.items[j].attr(name[j]);
            }
        } else {
            for (var i = 0, ii = this.items.length; i < ii; i++) {
                this.items[i].attr(name, value);
            }
        }
        return this;
    };
    
    setproto.clear = function () {
        while (this.length) {
            this.pop();
        }
    };
    
    setproto.splice = function (index, count, insertion) {
        index = index < 0 ? mmax(this.length + index, 0) : index;
        count = mmax(0, mmin(this.length - index, count));
        var tail = [],
            todel = [],
            args = [],
            i;
        for (i = 2; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        for (i = 0; i < count; i++) {
            todel.push(this[index + i]);
        }
        for (; i < this.length - index; i++) {
            tail.push(this[index + i]);
        }
        var arglen = args.length;
        for (i = 0; i < arglen + tail.length; i++) {
            this.items[index + i] = this[index + i] = i < arglen ? args[i] : tail[i - arglen];
        }
        i = this.items.length = this.length -= count - arglen;
        while (this[i]) {
            delete this[i++];
        }
        return new Set(todel);
    };
    
    setproto.exclude = function (el) {
        for (var i = 0, ii = this.length; i < ii; i++) if (this[i] == el) {
            this.splice(i, 1);
            return true;
        }
    };
    setproto.animate = function (params, ms, easing, callback) {
        (R.is(easing, "function") || !easing) && (callback = easing || null);
        var len = this.items.length,
            i = len,
            item,
            set = this,
            collector;
        if (!len) {
            return this;
        }
        callback && (collector = function () {
            !--len && callback.call(set);
        });
        easing = R.is(easing, string) ? easing : collector;
        var anim = R.animation(params, ms, easing, collector);
        item = this.items[--i].animate(anim);
        while (i--) {
            this.items[i] && !this.items[i].removed && this.items[i].animateWith(item, anim, anim);
        }
        return this;
    };
    setproto.insertAfter = function (el) {
        var i = this.items.length;
        while (i--) {
            this.items[i].insertAfter(el);
        }
        return this;
    };
    setproto.getBBox = function () {
        var x = [],
            y = [],
            x2 = [],
            y2 = [];
        for (var i = this.items.length; i--;) if (!this.items[i].removed) {
            var box = this.items[i].getBBox();
            x.push(box.x);
            y.push(box.y);
            x2.push(box.x + box.width);
            y2.push(box.y + box.height);
        }
        x = mmin[apply](0, x);
        y = mmin[apply](0, y);
        x2 = mmax[apply](0, x2);
        y2 = mmax[apply](0, y2);
        return {
            x: x,
            y: y,
            x2: x2,
            y2: y2,
            width: x2 - x,
            height: y2 - y
        };
    };
    setproto.clone = function (s) {
        s = new Set;
        for (var i = 0, ii = this.items.length; i < ii; i++) {
            s.push(this.items[i].clone());
        }
        return s;
    };
    setproto.toString = function () {
        return "Rapha\xebl\u2018s set";
    };

    
    R.registerFont = function (font) {
        if (!font.face) {
            return font;
        }
        this.fonts = this.fonts || {};
        var fontcopy = {
                w: font.w,
                face: {},
                glyphs: {}
            },
            family = font.face["font-family"];
        for (var prop in font.face) if (font.face[has](prop)) {
            fontcopy.face[prop] = font.face[prop];
        }
        if (this.fonts[family]) {
            this.fonts[family].push(fontcopy);
        } else {
            this.fonts[family] = [fontcopy];
        }
        if (!font.svg) {
            fontcopy.face["units-per-em"] = toInt(font.face["units-per-em"], 10);
            for (var glyph in font.glyphs) if (font.glyphs[has](glyph)) {
                var path = font.glyphs[glyph];
                fontcopy.glyphs[glyph] = {
                    w: path.w,
                    k: {},
                    d: path.d && "M" + path.d.replace(/[mlcxtrv]/g, function (command) {
                            return {l: "L", c: "C", x: "z", t: "m", r: "l", v: "c"}[command] || "M";
                        }) + "z"
                };
                if (path.k) {
                    for (var k in path.k) if (path[has](k)) {
                        fontcopy.glyphs[glyph].k[k] = path.k[k];
                    }
                }
            }
        }
        return font;
    };
    
    paperproto.getFont = function (family, weight, style, stretch) {
        stretch = stretch || "normal";
        style = style || "normal";
        weight = +weight || {normal: 400, bold: 700, lighter: 300, bolder: 800}[weight] || 400;
        if (!R.fonts) {
            return;
        }
        var font = R.fonts[family];
        if (!font) {
            var name = new RegExp("(^|\\s)" + family.replace(/[^\w\d\s+!~.:_-]/g, E) + "(\\s|$)", "i");
            for (var fontName in R.fonts) if (R.fonts[has](fontName)) {
                if (name.test(fontName)) {
                    font = R.fonts[fontName];
                    break;
                }
            }
        }
        var thefont;
        if (font) {
            for (var i = 0, ii = font.length; i < ii; i++) {
                thefont = font[i];
                if (thefont.face["font-weight"] == weight && (thefont.face["font-style"] == style || !thefont.face["font-style"]) && thefont.face["font-stretch"] == stretch) {
                    break;
                }
            }
        }
        return thefont;
    };
    
    paperproto.print = function (x, y, string, font, size, origin, letter_spacing) {
        origin = origin || "middle"; // baseline|middle
        letter_spacing = mmax(mmin(letter_spacing || 0, 1), -1);
        var letters = Str(string)[split](E),
            shift = 0,
            notfirst = 0,
            path = E,
            scale;
        R.is(font, string) && (font = this.getFont(font));
        if (font) {
            scale = (size || 16) / font.face["units-per-em"];
            var bb = font.face.bbox[split](separator),
                top = +bb[0],
                lineHeight = bb[3] - bb[1],
                shifty = 0,
                height = +bb[1] + (origin == "baseline" ? lineHeight + (+font.face.descent) : lineHeight / 2);
            for (var i = 0, ii = letters.length; i < ii; i++) {
                if (letters[i] == "\n") {
                    shift = 0;
                    curr = 0;
                    notfirst = 0;
                    shifty += lineHeight;
                } else {
                    var prev = notfirst && font.glyphs[letters[i - 1]] || {},
                        curr = font.glyphs[letters[i]];
                    shift += notfirst ? (prev.w || font.w) + (prev.k && prev.k[letters[i]] || 0) + (font.w * letter_spacing) : 0;
                    notfirst = 1;
                }
                if (curr && curr.d) {
                    path += R.transformPath(curr.d, ["t", shift * scale, shifty * scale, "s", scale, scale, top, height, "t", (x - top) / scale, (y - height) / scale]);
                }
            }
        }
        return this.path(path).attr({
            fill: "#000",
            stroke: "none"
        });
    };

    
    paperproto.add = function (json) {
        if (R.is(json, "array")) {
            var res = this.set(),
                i = 0,
                ii = json.length,
                j;
            for (; i < ii; i++) {
                j = json[i] || {};
                elements[has](j.type) && res.push(this[j.type]().attr(j));
            }
        }
        return res;
    };

    
    R.format = function (token, params) {
        var args = R.is(params, array) ? [0][concat](params) : arguments;
        token && R.is(token, string) && args.length - 1 && (token = token.replace(formatrg, function (str, i) {
            return args[++i] == null ? E : args[i];
        }));
        return token || E;
    };
    
    R.fullfill = (function () {
        var tokenRegex = /\{([^\}]+)\}/g,
            objNotationRegex = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g, // matches .xxxxx or ["xxxxx"] to run over object properties
            replacer = function (all, key, obj) {
                var res = obj;
                key.replace(objNotationRegex, function (all, name, quote, quotedName, isFunc) {
                    name = name || quotedName;
                    if (res) {
                        if (name in res) {
                            res = res[name];
                        }
                        typeof res == "function" && isFunc && (res = res());
                    }
                });
                res = (res == null || res == obj ? all : res) + "";
                return res;
            };
        return function (str, obj) {
            return String(str).replace(tokenRegex, function (all, key) {
                return replacer(all, key, obj);
            });
        };
    })();
    
    R.ninja = function () {
        oldRaphael.was ? (g.win.Raphael = oldRaphael.is) : delete Raphael;
        return R;
    };
    
    R.st = setproto;
    // Firefox <3.6 fix: http://webreflection.blogspot.com/2009/11/195-chars-to-help-lazy-loading.html
    (function (doc, loaded, f) {
        if (doc.readyState == null && doc.addEventListener){
            doc.addEventListener(loaded, f = function () {
                doc.removeEventListener(loaded, f, false);
                doc.readyState = "complete";
            }, false);
            doc.readyState = "loading";
        }
        function isLoaded() {
            (/in/).test(doc.readyState) ? setTimeout(isLoaded, 9) : R.eve("raphael.DOMload");
        }
        isLoaded();
    })(document, "DOMContentLoaded");

    oldRaphael.was ? (g.win.Raphael = R) : (Raphael = R);
    
    eve.on("raphael.DOMload", function () {
        loaded = true;
    });
})();


// ┌─────────────────────────────────────────────────────────────────────┐ \\
// │ Raphaël - JavaScript Vector Library                                 │ \\
// ├─────────────────────────────────────────────────────────────────────┤ \\
// │ SVG Module                                                          │ \\
// ├─────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright (c) 2008-2011 Dmitry Baranovskiy (http://raphaeljs.com)   │ \\
// │ Copyright (c) 2008-2011 Sencha Labs (http://sencha.com)             │ \\
// │ Licensed under the MIT (http://raphaeljs.com/license.html) license. │ \\
// └─────────────────────────────────────────────────────────────────────┘ \\
window.Raphael.svg && function (R) {
    var has = "hasOwnProperty",
        Str = String,
        toFloat = parseFloat,
        toInt = parseInt,
        math = Math,
        mmax = math.max,
        abs = math.abs,
        pow = math.pow,
        separator = /[, ]+/,
        eve = R.eve,
        E = "",
        S = " ";
    var xlink = "http://www.w3.org/1999/xlink",
        markers = {
            block: "M5,0 0,2.5 5,5z",
            classic: "M5,0 0,2.5 5,5 3.5,3 3.5,2z",
            diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z",
            open: "M6,1 1,3.5 6,6",
            oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"
        },
        markerCounter = {};
    R.toString = function () {
        return  "Your browser supports SVG.\nYou are running Rapha\xebl " + this.version;
    };
    var $ = function (el, attr) {
        if (attr) {
            if (typeof el == "string") {
                el = $(el);
            }
            for (var key in attr) if (attr[has](key)) {
                if (key.substring(0, 6) == "xlink:") {
                    el.setAttributeNS(xlink, key.substring(6), Str(attr[key]));
                } else {
                    el.setAttribute(key, Str(attr[key]));
                }
            }
        } else {
            el = R._g.doc.createElementNS("http://www.w3.org/2000/svg", el);
            el.style && (el.style.webkitTapHighlightColor = "rgba(0,0,0,0)");
        }
        return el;
    },
    addGradientFill = function (element, gradient) {
        var type = "linear",
            id = element.id + gradient,
            fx = .5, fy = .5,
            o = element.node,
            SVG = element.paper,
            s = o.style,
            el = R._g.doc.getElementById(id);
        if (!el) {
            gradient = Str(gradient).replace(R._radial_gradient, function (all, _fx, _fy) {
                type = "radial";
                if (_fx && _fy) {
                    fx = toFloat(_fx);
                    fy = toFloat(_fy);
                    var dir = ((fy > .5) * 2 - 1);
                    pow(fx - .5, 2) + pow(fy - .5, 2) > .25 &&
                        (fy = math.sqrt(.25 - pow(fx - .5, 2)) * dir + .5) &&
                        fy != .5 &&
                        (fy = fy.toFixed(5) - 1e-5 * dir);
                }
                return E;
            });
            gradient = gradient.split(/\s*\-\s*/);
            if (type == "linear") {
                var angle = gradient.shift();
                angle = -toFloat(angle);
                if (isNaN(angle)) {
                    return null;
                }
                var vector = [0, 0, math.cos(R.rad(angle)), math.sin(R.rad(angle))],
                    max = 1 / (mmax(abs(vector[2]), abs(vector[3])) || 1);
                vector[2] *= max;
                vector[3] *= max;
                if (vector[2] < 0) {
                    vector[0] = -vector[2];
                    vector[2] = 0;
                }
                if (vector[3] < 0) {
                    vector[1] = -vector[3];
                    vector[3] = 0;
                }
            }
            var dots = R._parseDots(gradient);
            if (!dots) {
                return null;
            }
            id = id.replace(/[\(\)\s,\xb0#]/g, "_");
            
            if (element.gradient && id != element.gradient.id) {
                SVG.defs.removeChild(element.gradient);
                delete element.gradient;
            }

            if (!element.gradient) {
                el = $(type + "Gradient", {id: id});
                element.gradient = el;
                $(el, type == "radial" ? {
                    fx: fx,
                    fy: fy
                } : {
                    x1: vector[0],
                    y1: vector[1],
                    x2: vector[2],
                    y2: vector[3],
                    gradientTransform: element.matrix.invert()
                });
                SVG.defs.appendChild(el);
                for (var i = 0, ii = dots.length; i < ii; i++) {
                    el.appendChild($("stop", {
                        offset: dots[i].offset ? dots[i].offset : i ? "100%" : "0%",
                        "stop-color": dots[i].color || "#fff"
                    }));
                }
            }
        }
        $(o, {
            fill: "url(#" + id + ")",
            opacity: 1,
            "fill-opacity": 1
        });
        s.fill = E;
        s.opacity = 1;
        s.fillOpacity = 1;
        return 1;
    },
    updatePosition = function (o) {
        var bbox = o.getBBox(1);
        $(o.pattern, {patternTransform: o.matrix.invert() + " translate(" + bbox.x + "," + bbox.y + ")"});
    },
    addArrow = function (o, value, isEnd) {
        if (o.type == "path") {
            var values = Str(value).toLowerCase().split("-"),
                p = o.paper,
                se = isEnd ? "end" : "start",
                node = o.node,
                attrs = o.attrs,
                stroke = attrs["stroke-width"],
                i = values.length,
                type = "classic",
                from,
                to,
                dx,
                refX,
                attr,
                w = 3,
                h = 3,
                t = 5;
            while (i--) {
                switch (values[i]) {
                    case "block":
                    case "classic":
                    case "oval":
                    case "diamond":
                    case "open":
                    case "none":
                        type = values[i];
                        break;
                    case "wide": h = 5; break;
                    case "narrow": h = 2; break;
                    case "long": w = 5; break;
                    case "short": w = 2; break;
                }
            }
            if (type == "open") {
                w += 2;
                h += 2;
                t += 2;
                dx = 1;
                refX = isEnd ? 4 : 1;
                attr = {
                    fill: "none",
                    stroke: attrs.stroke
                };
            } else {
                refX = dx = w / 2;
                attr = {
                    fill: attrs.stroke,
                    stroke: "none"
                };
            }
            if (o._.arrows) {
                if (isEnd) {
                    o._.arrows.endPath && markerCounter[o._.arrows.endPath]--;
                    o._.arrows.endMarker && markerCounter[o._.arrows.endMarker]--;
                } else {
                    o._.arrows.startPath && markerCounter[o._.arrows.startPath]--;
                    o._.arrows.startMarker && markerCounter[o._.arrows.startMarker]--;
                }
            } else {
                o._.arrows = {};
            }
            if (type != "none") {
                var pathId = "raphael-marker-" + type,
                    markerId = "raphael-marker-" + se + type + w + h;
                if (!R._g.doc.getElementById(pathId)) {
                    p.defs.appendChild($($("path"), {
                        "stroke-linecap": "round",
                        d: markers[type],
                        id: pathId
                    }));
                    markerCounter[pathId] = 1;
                } else {
                    markerCounter[pathId]++;
                }
                var marker = R._g.doc.getElementById(markerId),
                    use;
                if (!marker) {
                    marker = $($("marker"), {
                        id: markerId,
                        markerHeight: h,
                        markerWidth: w,
                        orient: "auto",
                        refX: refX,
                        refY: h / 2
                    });
                    use = $($("use"), {
                        "xlink:href": "#" + pathId,
                        transform: (isEnd ? "rotate(180 " + w / 2 + " " + h / 2 + ") " : E) + "scale(" + w / t + "," + h / t + ")",
                        "stroke-width": (1 / ((w / t + h / t) / 2)).toFixed(4)
                    });
                    marker.appendChild(use);
                    p.defs.appendChild(marker);
                    markerCounter[markerId] = 1;
                } else {
                    markerCounter[markerId]++;
                    use = marker.getElementsByTagName("use")[0];
                }
                $(use, attr);
                var delta = dx * (type != "diamond" && type != "oval");
                if (isEnd) {
                    from = o._.arrows.startdx * stroke || 0;
                    to = R.getTotalLength(attrs.path) - delta * stroke;
                } else {
                    from = delta * stroke;
                    to = R.getTotalLength(attrs.path) - (o._.arrows.enddx * stroke || 0);
                }
                attr = {};
                attr["marker-" + se] = "url(#" + markerId + ")";
                if (to || from) {
                    attr.d = Raphael.getSubpath(attrs.path, from, to);
                }
                $(node, attr);
                o._.arrows[se + "Path"] = pathId;
                o._.arrows[se + "Marker"] = markerId;
                o._.arrows[se + "dx"] = delta;
                o._.arrows[se + "Type"] = type;
                o._.arrows[se + "String"] = value;
            } else {
                if (isEnd) {
                    from = o._.arrows.startdx * stroke || 0;
                    to = R.getTotalLength(attrs.path) - from;
                } else {
                    from = 0;
                    to = R.getTotalLength(attrs.path) - (o._.arrows.enddx * stroke || 0);
                }
                o._.arrows[se + "Path"] && $(node, {d: Raphael.getSubpath(attrs.path, from, to)});
                delete o._.arrows[se + "Path"];
                delete o._.arrows[se + "Marker"];
                delete o._.arrows[se + "dx"];
                delete o._.arrows[se + "Type"];
                delete o._.arrows[se + "String"];
            }
            for (attr in markerCounter) if (markerCounter[has](attr) && !markerCounter[attr]) {
                var item = R._g.doc.getElementById(attr);
                item && item.parentNode.removeChild(item);
            }
        }
    },
    dasharray = {
        "": [0],
        "none": [0],
        "-": [3, 1],
        ".": [1, 1],
        "-.": [3, 1, 1, 1],
        "-..": [3, 1, 1, 1, 1, 1],
        ". ": [1, 3],
        "- ": [4, 3],
        "--": [8, 3],
        "- .": [4, 3, 1, 3],
        "--.": [8, 3, 1, 3],
        "--..": [8, 3, 1, 3, 1, 3]
    },
    addDashes = function (o, value, params) {
        value = dasharray[Str(value).toLowerCase()];
        if (value) {
            var width = o.attrs["stroke-width"] || "1",
                butt = {round: width, square: width, butt: 0}[o.attrs["stroke-linecap"] || params["stroke-linecap"]] || 0,
                dashes = [],
                i = value.length;
            while (i--) {
                dashes[i] = value[i] * width + ((i % 2) ? 1 : -1) * butt;
            }
            $(o.node, {"stroke-dasharray": dashes.join(",")});
        }
    },
    setFillAndStroke = function (o, params) {
        var node = o.node,
            attrs = o.attrs,
            vis = node.style.visibility;
        node.style.visibility = "hidden";
        for (var att in params) {
            if (params[has](att)) {
                if (!R._availableAttrs[has](att)) {
                    continue;
                }
                var value = params[att];
                attrs[att] = value;
                switch (att) {
                    case "blur":
                        o.blur(value);
                        break;
                    case "href":
                    case "title":
                    case "target":
                        var pn = node.parentNode;
                        if (pn.tagName.toLowerCase() != "a") {
                            var hl = $("a");
                            pn.insertBefore(hl, node);
                            hl.appendChild(node);
                            pn = hl;
                        }
                        if (att == "target") {
                            pn.setAttributeNS(xlink, "show", value == "blank" ? "new" : value);
                        } else {
                            pn.setAttributeNS(xlink, att, value);
                        }
                        break;
                    case "cursor":
                        node.style.cursor = value;
                        break;
                    case "transform":
                        o.transform(value);
                        break;
                    case "arrow-start":
                        addArrow(o, value);
                        break;
                    case "arrow-end":
                        addArrow(o, value, 1);
                        break;
                    case "clip-rect":
                        var rect = Str(value).split(separator);
                        if (rect.length == 4) {
                            o.clip && o.clip.parentNode.parentNode.removeChild(o.clip.parentNode);
                            var el = $("clipPath"),
                                rc = $("rect");
                            el.id = R.createUUID();
                            $(rc, {
                                x: rect[0],
                                y: rect[1],
                                width: rect[2],
                                height: rect[3]
                            });
                            el.appendChild(rc);
                            o.paper.defs.appendChild(el);
                            $(node, {"clip-path": "url(#" + el.id + ")"});
                            o.clip = rc;
                        }
                        if (!value) {
                            var path = node.getAttribute("clip-path");
                            if (path) {
                                var clip = R._g.doc.getElementById(path.replace(/(^url\(#|\)$)/g, E));
                                clip && clip.parentNode.removeChild(clip);
                                $(node, {"clip-path": E});
                                delete o.clip;
                            }
                        }
                    break;
                    case "path":
                        if (o.type == "path") {
                            $(node, {d: value ? attrs.path = R._pathToAbsolute(value) : "M0,0"});
                            o._.dirty = 1;
                            if (o._.arrows) {
                                "startString" in o._.arrows && addArrow(o, o._.arrows.startString);
                                "endString" in o._.arrows && addArrow(o, o._.arrows.endString, 1);
                            }
                        }
                        break;
                    case "width":
                        node.setAttribute(att, value);
                        o._.dirty = 1;
                        if (attrs.fx) {
                            att = "x";
                            value = attrs.x;
                        } else {
                            break;
                        }
                    case "x":
                        if (attrs.fx) {
                            value = -attrs.x - (attrs.width || 0);
                        }
                    case "rx":
                        if (att == "rx" && o.type == "rect") {
                            break;
                        }
                    case "cx":
                        node.setAttribute(att, value);
                        o.pattern && updatePosition(o);
                        o._.dirty = 1;
                        break;
                    case "height":
                        node.setAttribute(att, value);
                        o._.dirty = 1;
                        if (attrs.fy) {
                            att = "y";
                            value = attrs.y;
                        } else {
                            break;
                        }
                    case "y":
                        if (attrs.fy) {
                            value = -attrs.y - (attrs.height || 0);
                        }
                    case "ry":
                        if (att == "ry" && o.type == "rect") {
                            break;
                        }
                    case "cy":
                        node.setAttribute(att, value);
                        o.pattern && updatePosition(o);
                        o._.dirty = 1;
                        break;
                    case "r":
                        if (o.type == "rect") {
                            $(node, {rx: value, ry: value});
                        } else {
                            node.setAttribute(att, value);
                        }
                        o._.dirty = 1;
                        break;
                    case "src":
                        if (o.type == "image") {
                            node.setAttributeNS(xlink, "href", value);
                        }
                        break;
                    case "stroke-width":
                        if (o._.sx != 1 || o._.sy != 1) {
                            value /= mmax(abs(o._.sx), abs(o._.sy)) || 1;
                        }
                        if (o.paper._vbSize) {
                            value *= o.paper._vbSize;
                        }
                        node.setAttribute(att, value);
                        if (attrs["stroke-dasharray"]) {
                            addDashes(o, attrs["stroke-dasharray"], params);
                        }
                        if (o._.arrows) {
                            "startString" in o._.arrows && addArrow(o, o._.arrows.startString);
                            "endString" in o._.arrows && addArrow(o, o._.arrows.endString, 1);
                        }
                        break;
                    case "stroke-dasharray":
                        addDashes(o, value, params);
                        break;
                    case "fill":
                        var isURL = Str(value).match(R._ISURL);
                        if (isURL) {
                            el = $("pattern");
                            var ig = $("image");
                            el.id = R.createUUID();
                            $(el, {x: 0, y: 0, patternUnits: "userSpaceOnUse", height: 1, width: 1});
                            $(ig, {x: 0, y: 0, "xlink:href": isURL[1]});
                            el.appendChild(ig);

                            (function (el) {
                                R._preload(isURL[1], function () {
                                    var w = this.offsetWidth,
                                        h = this.offsetHeight;
                                    $(el, {width: w, height: h});
                                    $(ig, {width: w, height: h});
                                    o.paper.safari();
                                });
                            })(el);
                            o.paper.defs.appendChild(el);
                            $(node, {fill: "url(#" + el.id + ")"});
                            o.pattern = el;
                            o.pattern && updatePosition(o);
                            break;
                        }
                        var clr = R.getRGB(value);
                        if (!clr.error) {
                            delete params.gradient;
                            delete attrs.gradient;
                            !R.is(attrs.opacity, "undefined") &&
                                R.is(params.opacity, "undefined") &&
                                $(node, {opacity: attrs.opacity});
                            !R.is(attrs["fill-opacity"], "undefined") &&
                                R.is(params["fill-opacity"], "undefined") &&
                                $(node, {"fill-opacity": attrs["fill-opacity"]});
                        } else if ((o.type == "circle" || o.type == "ellipse" || Str(value).charAt() != "r") && addGradientFill(o, value)) {
                            if ("opacity" in attrs || "fill-opacity" in attrs) {
                                var gradient = R._g.doc.getElementById(node.getAttribute("fill").replace(/^url\(#|\)$/g, E));
                                if (gradient) {
                                    var stops = gradient.getElementsByTagName("stop");
                                    $(stops[stops.length - 1], {"stop-opacity": ("opacity" in attrs ? attrs.opacity : 1) * ("fill-opacity" in attrs ? attrs["fill-opacity"] : 1)});
                                }
                            }
                            attrs.gradient = value;
                            attrs.fill = "none";
                            break;
                        }
                        clr[has]("opacity") && $(node, {"fill-opacity": clr.opacity > 1 ? clr.opacity / 100 : clr.opacity});
                    case "stroke":
                        clr = R.getRGB(value);
                        node.setAttribute(att, clr.hex);
                        att == "stroke" && clr[has]("opacity") && $(node, {"stroke-opacity": clr.opacity > 1 ? clr.opacity / 100 : clr.opacity});
                        if (att == "stroke" && o._.arrows) {
                            "startString" in o._.arrows && addArrow(o, o._.arrows.startString);
                            "endString" in o._.arrows && addArrow(o, o._.arrows.endString, 1);
                        }
                        break;
                    case "gradient":
                        (o.type == "circle" || o.type == "ellipse" || Str(value).charAt() != "r") && addGradientFill(o, value);
                        break;
                    case "opacity":
                        if (attrs.gradient && !attrs[has]("stroke-opacity")) {
                            $(node, {"stroke-opacity": value > 1 ? value / 100 : value});
                        }
                        // fall
                    case "fill-opacity":
                        if (attrs.gradient) {
                            gradient = R._g.doc.getElementById(node.getAttribute("fill").replace(/^url\(#|\)$/g, E));
                            if (gradient) {
                                stops = gradient.getElementsByTagName("stop");
                                $(stops[stops.length - 1], {"stop-opacity": value});
                            }
                            break;
                        }
                    default:
                        att == "font-size" && (value = toInt(value, 10) + "px");
                        var cssrule = att.replace(/(\-.)/g, function (w) {
                            return w.substring(1).toUpperCase();
                        });
                        node.style[cssrule] = value;
                        o._.dirty = 1;
                        node.setAttribute(att, value);
                        break;
                }
            }
        }

        tuneText(o, params);
        node.style.visibility = vis;
    },
    leading = 1.2,
    tuneText = function (el, params) {
        if (el.type != "text" || !(params[has]("text") || params[has]("font") || params[has]("font-size") || params[has]("x") || params[has]("y"))) {
            return;
        }
        var a = el.attrs,
            node = el.node,
            fontSize = node.firstChild ? toInt(R._g.doc.defaultView.getComputedStyle(node.firstChild, E).getPropertyValue("font-size"), 10) : 10;

        if (params[has]("text")) {
            a.text = params.text;
            while (node.firstChild) {
                node.removeChild(node.firstChild);
            }
            var texts = Str(params.text).split("\n"),
                tspans = [],
                tspan;
            for (var i = 0, ii = texts.length; i < ii; i++) {
                tspan = $("tspan");
                i && $(tspan, {dy: fontSize * leading, x: a.x});
                tspan.appendChild(R._g.doc.createTextNode(texts[i]));
                node.appendChild(tspan);
                tspans[i] = tspan;
            }
        } else {
            tspans = node.getElementsByTagName("tspan");
            for (i = 0, ii = tspans.length; i < ii; i++) if (i) {
                $(tspans[i], {dy: fontSize * leading, x: a.x});
            } else {
                $(tspans[0], {dy: 0});
            }
        }
        $(node, {x: a.x, y: a.y});
        el._.dirty = 1;
        var bb = el._getBBox(),
            dif = a.y - (bb.y + bb.height / 2);
        dif && R.is(dif, "finite") && $(tspans[0], {dy: dif});
    },
    Element = function (node, svg) {
        var X = 0,
            Y = 0;
        
        this[0] = this.node = node;
        
        node.raphael = true;
        
        this.id = R._oid++;
        node.raphaelid = this.id;
        this.matrix = R.matrix();
        this.realPath = null;
        
        this.paper = svg;
        this.attrs = this.attrs || {};
        this._ = {
            transform: [],
            sx: 1,
            sy: 1,
            deg: 0,
            dx: 0,
            dy: 0,
            dirty: 1
        };
        !svg.bottom && (svg.bottom = this);
        
        this.prev = svg.top;
        svg.top && (svg.top.next = this);
        svg.top = this;
        
        this.next = null;
    },
    elproto = R.el;

    Element.prototype = elproto;
    elproto.constructor = Element;

    R._engine.path = function (pathString, SVG) {
        var el = $("path");
        SVG.canvas && SVG.canvas.appendChild(el);
        var p = new Element(el, SVG);
        p.type = "path";
        setFillAndStroke(p, {
            fill: "none",
            stroke: "#000",
            path: pathString
        });
        return p;
    };
    
    elproto.rotate = function (deg, cx, cy) {
        if (this.removed) {
            return this;
        }
        deg = Str(deg).split(separator);
        if (deg.length - 1) {
            cx = toFloat(deg[1]);
            cy = toFloat(deg[2]);
        }
        deg = toFloat(deg[0]);
        (cy == null) && (cx = cy);
        if (cx == null || cy == null) {
            var bbox = this.getBBox(1);
            cx = bbox.x + bbox.width / 2;
            cy = bbox.y + bbox.height / 2;
        }
        this.transform(this._.transform.concat([["r", deg, cx, cy]]));
        return this;
    };
    
    elproto.scale = function (sx, sy, cx, cy) {
        if (this.removed) {
            return this;
        }
        sx = Str(sx).split(separator);
        if (sx.length - 1) {
            sy = toFloat(sx[1]);
            cx = toFloat(sx[2]);
            cy = toFloat(sx[3]);
        }
        sx = toFloat(sx[0]);
        (sy == null) && (sy = sx);
        (cy == null) && (cx = cy);
        if (cx == null || cy == null) {
            var bbox = this.getBBox(1);
        }
        cx = cx == null ? bbox.x + bbox.width / 2 : cx;
        cy = cy == null ? bbox.y + bbox.height / 2 : cy;
        this.transform(this._.transform.concat([["s", sx, sy, cx, cy]]));
        return this;
    };
    
    elproto.translate = function (dx, dy) {
        if (this.removed) {
            return this;
        }
        dx = Str(dx).split(separator);
        if (dx.length - 1) {
            dy = toFloat(dx[1]);
        }
        dx = toFloat(dx[0]) || 0;
        dy = +dy || 0;
        this.transform(this._.transform.concat([["t", dx, dy]]));
        return this;
    };
    
    elproto.transform = function (tstr) {
        var _ = this._;
        if (tstr == null) {
            return _.transform;
        }
        R._extractTransform(this, tstr);

        this.clip && $(this.clip, {transform: this.matrix.invert()});
        this.pattern && updatePosition(this);
        this.node && $(this.node, {transform: this.matrix});
    
        if (_.sx != 1 || _.sy != 1) {
            var sw = this.attrs[has]("stroke-width") ? this.attrs["stroke-width"] : 1;
            this.attr({"stroke-width": sw});
        }

        return this;
    };
    
    elproto.hide = function () {
        !this.removed && this.paper.safari(this.node.style.display = "none");
        return this;
    };
    
    elproto.show = function () {
        !this.removed && this.paper.safari(this.node.style.display = "");
        return this;
    };
    
    elproto.remove = function () {
        if (this.removed || !this.node.parentNode) {
            return;
        }
        var paper = this.paper;
        paper.__set__ && paper.__set__.exclude(this);
        eve.unbind("raphael.*.*." + this.id);
        if (this.gradient) {
            paper.defs.removeChild(this.gradient);
        }
        R._tear(this, paper);
        if (this.node.parentNode.tagName.toLowerCase() == "a") {
            this.node.parentNode.parentNode.removeChild(this.node.parentNode);
        } else {
            this.node.parentNode.removeChild(this.node);
        }
        for (var i in this) {
            this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null;
        }
        this.removed = true;
    };
    elproto._getBBox = function () {
        if (this.node.style.display == "none") {
            this.show();
            var hide = true;
        }
        var bbox = {};
        try {
            bbox = this.node.getBBox();
        } catch(e) {
            // Firefox 3.0.x plays badly here
        } finally {
            bbox = bbox || {};
        }
        hide && this.hide();
        return bbox;
    };
    
    elproto.attr = function (name, value) {
        if (this.removed) {
            return this;
        }
        if (name == null) {
            var res = {};
            for (var a in this.attrs) if (this.attrs[has](a)) {
                res[a] = this.attrs[a];
            }
            res.gradient && res.fill == "none" && (res.fill = res.gradient) && delete res.gradient;
            res.transform = this._.transform;
            return res;
        }
        if (value == null && R.is(name, "string")) {
            if (name == "fill" && this.attrs.fill == "none" && this.attrs.gradient) {
                return this.attrs.gradient;
            }
            if (name == "transform") {
                return this._.transform;
            }
            var names = name.split(separator),
                out = {};
            for (var i = 0, ii = names.length; i < ii; i++) {
                name = names[i];
                if (name in this.attrs) {
                    out[name] = this.attrs[name];
                } else if (R.is(this.paper.customAttributes[name], "function")) {
                    out[name] = this.paper.customAttributes[name].def;
                } else {
                    out[name] = R._availableAttrs[name];
                }
            }
            return ii - 1 ? out : out[names[0]];
        }
        if (value == null && R.is(name, "array")) {
            out = {};
            for (i = 0, ii = name.length; i < ii; i++) {
                out[name[i]] = this.attr(name[i]);
            }
            return out;
        }
        if (value != null) {
            var params = {};
            params[name] = value;
        } else if (name != null && R.is(name, "object")) {
            params = name;
        }
        for (var key in params) {
            eve("raphael.attr." + key + "." + this.id, this, params[key]);
        }
        for (key in this.paper.customAttributes) if (this.paper.customAttributes[has](key) && params[has](key) && R.is(this.paper.customAttributes[key], "function")) {
            var par = this.paper.customAttributes[key].apply(this, [].concat(params[key]));
            this.attrs[key] = params[key];
            for (var subkey in par) if (par[has](subkey)) {
                params[subkey] = par[subkey];
            }
        }
        setFillAndStroke(this, params);
        return this;
    };
    
    elproto.toFront = function () {
        if (this.removed) {
            return this;
        }
        if (this.node.parentNode.tagName.toLowerCase() == "a") {
            this.node.parentNode.parentNode.appendChild(this.node.parentNode);
        } else {
            this.node.parentNode.appendChild(this.node);
        }
        var svg = this.paper;
        svg.top != this && R._tofront(this, svg);
        return this;
    };
    
    elproto.toBack = function () {
        if (this.removed) {
            return this;
        }
        var parent = this.node.parentNode;
        if (parent.tagName.toLowerCase() == "a") {
            parent.parentNode.insertBefore(this.node.parentNode, this.node.parentNode.parentNode.firstChild); 
        } else if (parent.firstChild != this.node) {
            parent.insertBefore(this.node, this.node.parentNode.firstChild);
        }
        R._toback(this, this.paper);
        var svg = this.paper;
        return this;
    };
    
    elproto.insertAfter = function (element) {
        if (this.removed) {
            return this;
        }
        var node = element.node || element[element.length - 1].node;
        if (node.nextSibling) {
            node.parentNode.insertBefore(this.node, node.nextSibling);
        } else {
            node.parentNode.appendChild(this.node);
        }
        R._insertafter(this, element, this.paper);
        return this;
    };
    
    elproto.insertBefore = function (element) {
        if (this.removed) {
            return this;
        }
        var node = element.node || element[0].node;
        node.parentNode.insertBefore(this.node, node);
        R._insertbefore(this, element, this.paper);
        return this;
    };
    elproto.blur = function (size) {
        // Experimental. No Safari support. Use it on your own risk.
        var t = this;
        if (+size !== 0) {
            var fltr = $("filter"),
                blur = $("feGaussianBlur");
            t.attrs.blur = size;
            fltr.id = R.createUUID();
            $(blur, {stdDeviation: +size || 1.5});
            fltr.appendChild(blur);
            t.paper.defs.appendChild(fltr);
            t._blur = fltr;
            $(t.node, {filter: "url(#" + fltr.id + ")"});
        } else {
            if (t._blur) {
                t._blur.parentNode.removeChild(t._blur);
                delete t._blur;
                delete t.attrs.blur;
            }
            t.node.removeAttribute("filter");
        }
    };
    R._engine.circle = function (svg, x, y, r) {
        var el = $("circle");
        svg.canvas && svg.canvas.appendChild(el);
        var res = new Element(el, svg);
        res.attrs = {cx: x, cy: y, r: r, fill: "none", stroke: "#000"};
        res.type = "circle";
        $(el, res.attrs);
        return res;
    };
    R._engine.rect = function (svg, x, y, w, h, r) {
        var el = $("rect");
        svg.canvas && svg.canvas.appendChild(el);
        var res = new Element(el, svg);
        res.attrs = {x: x, y: y, width: w, height: h, r: r || 0, rx: r || 0, ry: r || 0, fill: "none", stroke: "#000"};
        res.type = "rect";
        $(el, res.attrs);
        return res;
    };
    R._engine.ellipse = function (svg, x, y, rx, ry) {
        var el = $("ellipse");
        svg.canvas && svg.canvas.appendChild(el);
        var res = new Element(el, svg);
        res.attrs = {cx: x, cy: y, rx: rx, ry: ry, fill: "none", stroke: "#000"};
        res.type = "ellipse";
        $(el, res.attrs);
        return res;
    };
    R._engine.image = function (svg, src, x, y, w, h) {
        var el = $("image");
        $(el, {x: x, y: y, width: w, height: h, preserveAspectRatio: "none"});
        el.setAttributeNS(xlink, "href", src);
        svg.canvas && svg.canvas.appendChild(el);
        var res = new Element(el, svg);
        res.attrs = {x: x, y: y, width: w, height: h, src: src};
        res.type = "image";
        return res;
    };
    R._engine.text = function (svg, x, y, text) {
        var el = $("text");
        svg.canvas && svg.canvas.appendChild(el);
        var res = new Element(el, svg);
        res.attrs = {
            x: x,
            y: y,
            "text-anchor": "middle",
            text: text,
            font: R._availableAttrs.font,
            stroke: "none",
            fill: "#000"
        };
        res.type = "text";
        setFillAndStroke(res, res.attrs);
        return res;
    };
    R._engine.setSize = function (width, height) {
        this.width = width || this.width;
        this.height = height || this.height;
        this.canvas.setAttribute("width", this.width);
        this.canvas.setAttribute("height", this.height);
        if (this._viewBox) {
            this.setViewBox.apply(this, this._viewBox);
        }
        return this;
    };
    R._engine.create = function () {
        var con = R._getContainer.apply(0, arguments),
            container = con && con.container,
            x = con.x,
            y = con.y,
            width = con.width,
            height = con.height;
        if (!container) {
            throw new Error("SVG container not found.");
        }
        var cnvs = $("svg"),
            css = "overflow:hidden;",
            isFloating;
        x = x || 0;
        y = y || 0;
        width = width || 512;
        height = height || 342;
        $(cnvs, {
            height: height,
            version: 1.1,
            width: width,
            xmlns: "http://www.w3.org/2000/svg"
        });
        if (container == 1) {
            cnvs.style.cssText = css + "position:absolute;left:" + x + "px;top:" + y + "px";
            R._g.doc.body.appendChild(cnvs);
            isFloating = 1;
        } else {
            cnvs.style.cssText = css + "position:relative";
            if (container.firstChild) {
                container.insertBefore(cnvs, container.firstChild);
            } else {
                container.appendChild(cnvs);
            }
        }
        container = new R._Paper;
        container.width = width;
        container.height = height;
        container.canvas = cnvs;
        container.clear();
        container._left = container._top = 0;
        isFloating && (container.renderfix = function () {});
        container.renderfix();
        return container;
    };
    R._engine.setViewBox = function (x, y, w, h, fit) {
        eve("raphael.setViewBox", this, this._viewBox, [x, y, w, h, fit]);
        var size = mmax(w / this.width, h / this.height),
            top = this.top,
            aspectRatio = fit ? "meet" : "xMinYMin",
            vb,
            sw;
        if (x == null) {
            if (this._vbSize) {
                size = 1;
            }
            delete this._vbSize;
            vb = "0 0 " + this.width + S + this.height;
        } else {
            this._vbSize = size;
            vb = x + S + y + S + w + S + h;
        }
        $(this.canvas, {
            viewBox: vb,
            preserveAspectRatio: aspectRatio
        });
        while (size && top) {
            sw = "stroke-width" in top.attrs ? top.attrs["stroke-width"] : 1;
            top.attr({"stroke-width": sw});
            top._.dirty = 1;
            top._.dirtyT = 1;
            top = top.prev;
        }
        this._viewBox = [x, y, w, h, !!fit];
        return this;
    };
    
    R.prototype.renderfix = function () {
        var cnvs = this.canvas,
            s = cnvs.style,
            pos;
        try {
            pos = cnvs.getScreenCTM() || cnvs.createSVGMatrix();
        } catch (e) {
            pos = cnvs.createSVGMatrix();
        }
        var left = -pos.e % 1,
            top = -pos.f % 1;
        if (left || top) {
            if (left) {
                this._left = (this._left + left) % 1;
                s.left = this._left + "px";
            }
            if (top) {
                this._top = (this._top + top) % 1;
                s.top = this._top + "px";
            }
        }
    };
    
    R.prototype.clear = function () {
        R.eve("raphael.clear", this);
        var c = this.canvas;
        while (c.firstChild) {
            c.removeChild(c.firstChild);
        }
        this.bottom = this.top = null;
        (this.desc = $("desc")).appendChild(R._g.doc.createTextNode("Created with Rapha\xebl " + R.version));
        c.appendChild(this.desc);
        c.appendChild(this.defs = $("defs"));
    };
    
    R.prototype.remove = function () {
        eve("raphael.remove", this);
        this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
        for (var i in this) {
            this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null;
        }
    };
    var setproto = R.st;
    for (var method in elproto) if (elproto[has](method) && !setproto[has](method)) {
        setproto[method] = (function (methodname) {
            return function () {
                var arg = arguments;
                return this.forEach(function (el) {
                    el[methodname].apply(el, arg);
                });
            };
        })(method);
    }
}(window.Raphael);

// ┌─────────────────────────────────────────────────────────────────────┐ \\
// │ Raphaël - JavaScript Vector Library                                 │ \\
// ├─────────────────────────────────────────────────────────────────────┤ \\
// │ VML Module                                                          │ \\
// ├─────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright (c) 2008-2011 Dmitry Baranovskiy (http://raphaeljs.com)   │ \\
// │ Copyright (c) 2008-2011 Sencha Labs (http://sencha.com)             │ \\
// │ Licensed under the MIT (http://raphaeljs.com/license.html) license. │ \\
// └─────────────────────────────────────────────────────────────────────┘ \\
window.Raphael.vml && function (R) {
    var has = "hasOwnProperty",
        Str = String,
        toFloat = parseFloat,
        math = Math,
        round = math.round,
        mmax = math.max,
        mmin = math.min,
        abs = math.abs,
        fillString = "fill",
        separator = /[, ]+/,
        eve = R.eve,
        ms = " progid:DXImageTransform.Microsoft",
        S = " ",
        E = "",
        map = {M: "m", L: "l", C: "c", Z: "x", m: "t", l: "r", c: "v", z: "x"},
        bites = /([clmz]),?([^clmz]*)/gi,
        blurregexp = / progid:\S+Blur\([^\)]+\)/g,
        val = /-?[^,\s-]+/g,
        cssDot = "position:absolute;left:0;top:0;width:1px;height:1px",
        zoom = 21600,
        pathTypes = {path: 1, rect: 1, image: 1},
        ovalTypes = {circle: 1, ellipse: 1},
        path2vml = function (path) {
            var total =  /[ahqstv]/ig,
                command = R._pathToAbsolute;
            Str(path).match(total) && (command = R._path2curve);
            total = /[clmz]/g;
            if (command == R._pathToAbsolute && !Str(path).match(total)) {
                var res = Str(path).replace(bites, function (all, command, args) {
                    var vals = [],
                        isMove = command.toLowerCase() == "m",
                        res = map[command];
                    args.replace(val, function (value) {
                        if (isMove && vals.length == 2) {
                            res += vals + map[command == "m" ? "l" : "L"];
                            vals = [];
                        }
                        vals.push(round(value * zoom));
                    });
                    return res + vals;
                });
                return res;
            }
            var pa = command(path), p, r;
            res = [];
            for (var i = 0, ii = pa.length; i < ii; i++) {
                p = pa[i];
                r = pa[i][0].toLowerCase();
                r == "z" && (r = "x");
                for (var j = 1, jj = p.length; j < jj; j++) {
                    r += round(p[j] * zoom) + (j != jj - 1 ? "," : E);
                }
                res.push(r);
            }
            return res.join(S);
        },
        compensation = function (deg, dx, dy) {
            var m = R.matrix();
            m.rotate(-deg, .5, .5);
            return {
                dx: m.x(dx, dy),
                dy: m.y(dx, dy)
            };
        },
        setCoords = function (p, sx, sy, dx, dy, deg) {
            var _ = p._,
                m = p.matrix,
                fillpos = _.fillpos,
                o = p.node,
                s = o.style,
                y = 1,
                flip = "",
                dxdy,
                kx = zoom / sx,
                ky = zoom / sy;
            s.visibility = "hidden";
            if (!sx || !sy) {
                return;
            }
            o.coordsize = abs(kx) + S + abs(ky);
            s.rotation = deg * (sx * sy < 0 ? -1 : 1);
            if (deg) {
                var c = compensation(deg, dx, dy);
                dx = c.dx;
                dy = c.dy;
            }
            sx < 0 && (flip += "x");
            sy < 0 && (flip += " y") && (y = -1);
            s.flip = flip;
            o.coordorigin = (dx * -kx) + S + (dy * -ky);
            if (fillpos || _.fillsize) {
                var fill = o.getElementsByTagName(fillString);
                fill = fill && fill[0];
                o.removeChild(fill);
                if (fillpos) {
                    c = compensation(deg, m.x(fillpos[0], fillpos[1]), m.y(fillpos[0], fillpos[1]));
                    fill.position = c.dx * y + S + c.dy * y;
                }
                if (_.fillsize) {
                    fill.size = _.fillsize[0] * abs(sx) + S + _.fillsize[1] * abs(sy);
                }
                o.appendChild(fill);
            }
            s.visibility = "visible";
        };
    R.toString = function () {
        return  "Your browser doesn\u2019t support SVG. Falling down to VML.\nYou are running Rapha\xebl " + this.version;
    };
    var addArrow = function (o, value, isEnd) {
        var values = Str(value).toLowerCase().split("-"),
            se = isEnd ? "end" : "start",
            i = values.length,
            type = "classic",
            w = "medium",
            h = "medium";
        while (i--) {
            switch (values[i]) {
                case "block":
                case "classic":
                case "oval":
                case "diamond":
                case "open":
                case "none":
                    type = values[i];
                    break;
                case "wide":
                case "narrow": h = values[i]; break;
                case "long":
                case "short": w = values[i]; break;
            }
        }
        var stroke = o.node.getElementsByTagName("stroke")[0];
        stroke[se + "arrow"] = type;
        stroke[se + "arrowlength"] = w;
        stroke[se + "arrowwidth"] = h;
    },
    setFillAndStroke = function (o, params) {
        // o.paper.canvas.style.display = "none";
        o.attrs = o.attrs || {};
        var node = o.node,
            a = o.attrs,
            s = node.style,
            xy,
            newpath = pathTypes[o.type] && (params.x != a.x || params.y != a.y || params.width != a.width || params.height != a.height || params.cx != a.cx || params.cy != a.cy || params.rx != a.rx || params.ry != a.ry || params.r != a.r),
            isOval = ovalTypes[o.type] && (a.cx != params.cx || a.cy != params.cy || a.r != params.r || a.rx != params.rx || a.ry != params.ry),
            res = o;


        for (var par in params) if (params[has](par)) {
            a[par] = params[par];
        }
        if (newpath) {
            a.path = R._getPath[o.type](o);
            o._.dirty = 1;
        }
        params.href && (node.href = params.href);
        params.title && (node.title = params.title);
        params.target && (node.target = params.target);
        params.cursor && (s.cursor = params.cursor);
        "blur" in params && o.blur(params.blur);
        if (params.path && o.type == "path" || newpath) {
            node.path = path2vml(~Str(a.path).toLowerCase().indexOf("r") ? R._pathToAbsolute(a.path) : a.path);
            if (o.type == "image") {
                o._.fillpos = [a.x, a.y];
                o._.fillsize = [a.width, a.height];
                setCoords(o, 1, 1, 0, 0, 0);
            }
        }
        "transform" in params && o.transform(params.transform);
        if (isOval) {
            var cx = +a.cx,
                cy = +a.cy,
                rx = +a.rx || +a.r || 0,
                ry = +a.ry || +a.r || 0;
            node.path = R.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x", round((cx - rx) * zoom), round((cy - ry) * zoom), round((cx + rx) * zoom), round((cy + ry) * zoom), round(cx * zoom));
        }
        if ("clip-rect" in params) {
            var rect = Str(params["clip-rect"]).split(separator);
            if (rect.length == 4) {
                rect[2] = +rect[2] + (+rect[0]);
                rect[3] = +rect[3] + (+rect[1]);
                var div = node.clipRect || R._g.doc.createElement("div"),
                    dstyle = div.style;
                dstyle.clip = R.format("rect({1}px {2}px {3}px {0}px)", rect);
                if (!node.clipRect) {
                    dstyle.position = "absolute";
                    dstyle.top = 0;
                    dstyle.left = 0;
                    dstyle.width = o.paper.width + "px";
                    dstyle.height = o.paper.height + "px";
                    node.parentNode.insertBefore(div, node);
                    div.appendChild(node);
                    node.clipRect = div;
                }
            }
            if (!params["clip-rect"]) {
                node.clipRect && (node.clipRect.style.clip = "auto");
            }
        }
        if (o.textpath) {
            var textpathStyle = o.textpath.style;
            params.font && (textpathStyle.font = params.font);
            params["font-family"] && (textpathStyle.fontFamily = '"' + params["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, E) + '"');
            params["font-size"] && (textpathStyle.fontSize = params["font-size"]);
            params["font-weight"] && (textpathStyle.fontWeight = params["font-weight"]);
            params["font-style"] && (textpathStyle.fontStyle = params["font-style"]);
        }
        if ("arrow-start" in params) {
            addArrow(res, params["arrow-start"]);
        }
        if ("arrow-end" in params) {
            addArrow(res, params["arrow-end"], 1);
        }
        if (params.opacity != null || 
            params["stroke-width"] != null ||
            params.fill != null ||
            params.src != null ||
            params.stroke != null ||
            params["stroke-width"] != null ||
            params["stroke-opacity"] != null ||
            params["fill-opacity"] != null ||
            params["stroke-dasharray"] != null ||
            params["stroke-miterlimit"] != null ||
            params["stroke-linejoin"] != null ||
            params["stroke-linecap"] != null) {
            var fill = node.getElementsByTagName(fillString),
                newfill = false;
            fill = fill && fill[0];
            !fill && (newfill = fill = createNode(fillString));
            if (o.type == "image" && params.src) {
                fill.src = params.src;
            }
            params.fill && (fill.on = true);
            if (fill.on == null || params.fill == "none" || params.fill === null) {
                fill.on = false;
            }
            if (fill.on && params.fill) {
                var isURL = Str(params.fill).match(R._ISURL);
                if (isURL) {
                    fill.parentNode == node && node.removeChild(fill);
                    fill.rotate = true;
                    fill.src = isURL[1];
                    fill.type = "tile";
                    var bbox = o.getBBox(1);
                    fill.position = bbox.x + S + bbox.y;
                    o._.fillpos = [bbox.x, bbox.y];

                    R._preload(isURL[1], function () {
                        o._.fillsize = [this.offsetWidth, this.offsetHeight];
                    });
                } else {
                    fill.color = R.getRGB(params.fill).hex;
                    fill.src = E;
                    fill.type = "solid";
                    if (R.getRGB(params.fill).error && (res.type in {circle: 1, ellipse: 1} || Str(params.fill).charAt() != "r") && addGradientFill(res, params.fill, fill)) {
                        a.fill = "none";
                        a.gradient = params.fill;
                        fill.rotate = false;
                    }
                }
            }
            if ("fill-opacity" in params || "opacity" in params) {
                var opacity = ((+a["fill-opacity"] + 1 || 2) - 1) * ((+a.opacity + 1 || 2) - 1) * ((+R.getRGB(params.fill).o + 1 || 2) - 1);
                opacity = mmin(mmax(opacity, 0), 1);
                fill.opacity = opacity;
                if (fill.src) {
                    fill.color = "none";
                }
            }
            node.appendChild(fill);
            var stroke = (node.getElementsByTagName("stroke") && node.getElementsByTagName("stroke")[0]),
            newstroke = false;
            !stroke && (newstroke = stroke = createNode("stroke"));
            if ((params.stroke && params.stroke != "none") ||
                params["stroke-width"] ||
                params["stroke-opacity"] != null ||
                params["stroke-dasharray"] ||
                params["stroke-miterlimit"] ||
                params["stroke-linejoin"] ||
                params["stroke-linecap"]) {
                stroke.on = true;
            }
            (params.stroke == "none" || params.stroke === null || stroke.on == null || params.stroke == 0 || params["stroke-width"] == 0) && (stroke.on = false);
            var strokeColor = R.getRGB(params.stroke);
            stroke.on && params.stroke && (stroke.color = strokeColor.hex);
            opacity = ((+a["stroke-opacity"] + 1 || 2) - 1) * ((+a.opacity + 1 || 2) - 1) * ((+strokeColor.o + 1 || 2) - 1);
            var width = (toFloat(params["stroke-width"]) || 1) * .75;
            opacity = mmin(mmax(opacity, 0), 1);
            params["stroke-width"] == null && (width = a["stroke-width"]);
            params["stroke-width"] && (stroke.weight = width);
            width && width < 1 && (opacity *= width) && (stroke.weight = 1);
            stroke.opacity = opacity;
        
            params["stroke-linejoin"] && (stroke.joinstyle = params["stroke-linejoin"] || "miter");
            stroke.miterlimit = params["stroke-miterlimit"] || 8;
            params["stroke-linecap"] && (stroke.endcap = params["stroke-linecap"] == "butt" ? "flat" : params["stroke-linecap"] == "square" ? "square" : "round");
            if (params["stroke-dasharray"]) {
                var dasharray = {
                    "-": "shortdash",
                    ".": "shortdot",
                    "-.": "shortdashdot",
                    "-..": "shortdashdotdot",
                    ". ": "dot",
                    "- ": "dash",
                    "--": "longdash",
                    "- .": "dashdot",
                    "--.": "longdashdot",
                    "--..": "longdashdotdot"
                };
                stroke.dashstyle = dasharray[has](params["stroke-dasharray"]) ? dasharray[params["stroke-dasharray"]] : E;
            }
            newstroke && node.appendChild(stroke);
        }
        if (res.type == "text") {
            res.paper.canvas.style.display = E;
            var span = res.paper.span,
                m = 100,
                fontSize = a.font && a.font.match(/\d+(?:\.\d*)?(?=px)/);
            s = span.style;
            a.font && (s.font = a.font);
            a["font-family"] && (s.fontFamily = a["font-family"]);
            a["font-weight"] && (s.fontWeight = a["font-weight"]);
            a["font-style"] && (s.fontStyle = a["font-style"]);
            fontSize = toFloat(a["font-size"] || fontSize && fontSize[0]) || 10;
            s.fontSize = fontSize * m + "px";
            res.textpath.string && (span.innerHTML = Str(res.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>"));
            var brect = span.getBoundingClientRect();
            res.W = a.w = (brect.right - brect.left) / m;
            res.H = a.h = (brect.bottom - brect.top) / m;
            // res.paper.canvas.style.display = "none";
            res.X = a.x;
            res.Y = a.y + res.H / 2;

            ("x" in params || "y" in params) && (res.path.v = R.format("m{0},{1}l{2},{1}", round(a.x * zoom), round(a.y * zoom), round(a.x * zoom) + 1));
            var dirtyattrs = ["x", "y", "text", "font", "font-family", "font-weight", "font-style", "font-size"];
            for (var d = 0, dd = dirtyattrs.length; d < dd; d++) if (dirtyattrs[d] in params) {
                res._.dirty = 1;
                break;
            }
        
            // text-anchor emulation
            switch (a["text-anchor"]) {
                case "start":
                    res.textpath.style["v-text-align"] = "left";
                    res.bbx = res.W / 2;
                break;
                case "end":
                    res.textpath.style["v-text-align"] = "right";
                    res.bbx = -res.W / 2;
                break;
                default:
                    res.textpath.style["v-text-align"] = "center";
                    res.bbx = 0;
                break;
            }
            res.textpath.style["v-text-kern"] = true;
        }
        // res.paper.canvas.style.display = E;
    },
    addGradientFill = function (o, gradient, fill) {
        o.attrs = o.attrs || {};
        var attrs = o.attrs,
            pow = Math.pow,
            opacity,
            oindex,
            type = "linear",
            fxfy = ".5 .5";
        o.attrs.gradient = gradient;
        gradient = Str(gradient).replace(R._radial_gradient, function (all, fx, fy) {
            type = "radial";
            if (fx && fy) {
                fx = toFloat(fx);
                fy = toFloat(fy);
                pow(fx - .5, 2) + pow(fy - .5, 2) > .25 && (fy = math.sqrt(.25 - pow(fx - .5, 2)) * ((fy > .5) * 2 - 1) + .5);
                fxfy = fx + S + fy;
            }
            return E;
        });
        gradient = gradient.split(/\s*\-\s*/);
        if (type == "linear") {
            var angle = gradient.shift();
            angle = -toFloat(angle);
            if (isNaN(angle)) {
                return null;
            }
        }
        var dots = R._parseDots(gradient);
        if (!dots) {
            return null;
        }
        o = o.shape || o.node;
        if (dots.length) {
            o.removeChild(fill);
            fill.on = true;
            fill.method = "none";
            fill.color = dots[0].color;
            fill.color2 = dots[dots.length - 1].color;
            var clrs = [];
            for (var i = 0, ii = dots.length; i < ii; i++) {
                dots[i].offset && clrs.push(dots[i].offset + S + dots[i].color);
            }
            fill.colors = clrs.length ? clrs.join() : "0% " + fill.color;
            if (type == "radial") {
                fill.type = "gradientTitle";
                fill.focus = "100%";
                fill.focussize = "0 0";
                fill.focusposition = fxfy;
                fill.angle = 0;
            } else {
                // fill.rotate= true;
                fill.type = "gradient";
                fill.angle = (270 - angle) % 360;
            }
            o.appendChild(fill);
        }
        return 1;
    },
    Element = function (node, vml) {
        this[0] = this.node = node;
        node.raphael = true;
        this.id = R._oid++;
        node.raphaelid = this.id;
        this.X = 0;
        this.Y = 0;
        this.attrs = {};
        this.paper = vml;
        this.matrix = R.matrix();
        this._ = {
            transform: [],
            sx: 1,
            sy: 1,
            dx: 0,
            dy: 0,
            deg: 0,
            dirty: 1,
            dirtyT: 1
        };
        !vml.bottom && (vml.bottom = this);
        this.prev = vml.top;
        vml.top && (vml.top.next = this);
        vml.top = this;
        this.next = null;
    };
    var elproto = R.el;

    Element.prototype = elproto;
    elproto.constructor = Element;
    elproto.transform = function (tstr) {
        if (tstr == null) {
            return this._.transform;
        }
        var vbs = this.paper._viewBoxShift,
            vbt = vbs ? "s" + [vbs.scale, vbs.scale] + "-1-1t" + [vbs.dx, vbs.dy] : E,
            oldt;
        if (vbs) {
            oldt = tstr = Str(tstr).replace(/\.{3}|\u2026/g, this._.transform || E);
        }
        R._extractTransform(this, vbt + tstr);
        var matrix = this.matrix.clone(),
            skew = this.skew,
            o = this.node,
            split,
            isGrad = ~Str(this.attrs.fill).indexOf("-"),
            isPatt = !Str(this.attrs.fill).indexOf("url(");
        matrix.translate(-.5, -.5);
        if (isPatt || isGrad || this.type == "image") {
            skew.matrix = "1 0 0 1";
            skew.offset = "0 0";
            split = matrix.split();
            if ((isGrad && split.noRotation) || !split.isSimple) {
                o.style.filter = matrix.toFilter();
                var bb = this.getBBox(),
                    bbt = this.getBBox(1),
                    dx = bb.x - bbt.x,
                    dy = bb.y - bbt.y;
                o.coordorigin = (dx * -zoom) + S + (dy * -zoom);
                setCoords(this, 1, 1, dx, dy, 0);
            } else {
                o.style.filter = E;
                setCoords(this, split.scalex, split.scaley, split.dx, split.dy, split.rotate);
            }
        } else {
            o.style.filter = E;
            skew.matrix = Str(matrix);
            skew.offset = matrix.offset();
        }
        oldt && (this._.transform = oldt);
        return this;
    };
    elproto.rotate = function (deg, cx, cy) {
        if (this.removed) {
            return this;
        }
        if (deg == null) {
            return;
        }
        deg = Str(deg).split(separator);
        if (deg.length - 1) {
            cx = toFloat(deg[1]);
            cy = toFloat(deg[2]);
        }
        deg = toFloat(deg[0]);
        (cy == null) && (cx = cy);
        if (cx == null || cy == null) {
            var bbox = this.getBBox(1);
            cx = bbox.x + bbox.width / 2;
            cy = bbox.y + bbox.height / 2;
        }
        this._.dirtyT = 1;
        this.transform(this._.transform.concat([["r", deg, cx, cy]]));
        return this;
    };
    elproto.translate = function (dx, dy) {
        if (this.removed) {
            return this;
        }
        dx = Str(dx).split(separator);
        if (dx.length - 1) {
            dy = toFloat(dx[1]);
        }
        dx = toFloat(dx[0]) || 0;
        dy = +dy || 0;
        if (this._.bbox) {
            this._.bbox.x += dx;
            this._.bbox.y += dy;
        }
        this.transform(this._.transform.concat([["t", dx, dy]]));
        return this;
    };
    elproto.scale = function (sx, sy, cx, cy) {
        if (this.removed) {
            return this;
        }
        sx = Str(sx).split(separator);
        if (sx.length - 1) {
            sy = toFloat(sx[1]);
            cx = toFloat(sx[2]);
            cy = toFloat(sx[3]);
            isNaN(cx) && (cx = null);
            isNaN(cy) && (cy = null);
        }
        sx = toFloat(sx[0]);
        (sy == null) && (sy = sx);
        (cy == null) && (cx = cy);
        if (cx == null || cy == null) {
            var bbox = this.getBBox(1);
        }
        cx = cx == null ? bbox.x + bbox.width / 2 : cx;
        cy = cy == null ? bbox.y + bbox.height / 2 : cy;
    
        this.transform(this._.transform.concat([["s", sx, sy, cx, cy]]));
        this._.dirtyT = 1;
        return this;
    };
    elproto.hide = function () {
        !this.removed && (this.node.style.display = "none");
        return this;
    };
    elproto.show = function () {
        !this.removed && (this.node.style.display = E);
        return this;
    };
    elproto._getBBox = function () {
        if (this.removed) {
            return {};
        }
        return {
            x: this.X + (this.bbx || 0) - this.W / 2,
            y: this.Y - this.H,
            width: this.W,
            height: this.H
        };
    };
    elproto.remove = function () {
        if (this.removed || !this.node.parentNode) {
            return;
        }
        this.paper.__set__ && this.paper.__set__.exclude(this);
        R.eve.unbind("raphael.*.*." + this.id);
        R._tear(this, this.paper);
        this.node.parentNode.removeChild(this.node);
        this.shape && this.shape.parentNode.removeChild(this.shape);
        for (var i in this) {
            this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null;
        }
        this.removed = true;
    };
    elproto.attr = function (name, value) {
        if (this.removed) {
            return this;
        }
        if (name == null) {
            var res = {};
            for (var a in this.attrs) if (this.attrs[has](a)) {
                res[a] = this.attrs[a];
            }
            res.gradient && res.fill == "none" && (res.fill = res.gradient) && delete res.gradient;
            res.transform = this._.transform;
            return res;
        }
        if (value == null && R.is(name, "string")) {
            if (name == fillString && this.attrs.fill == "none" && this.attrs.gradient) {
                return this.attrs.gradient;
            }
            var names = name.split(separator),
                out = {};
            for (var i = 0, ii = names.length; i < ii; i++) {
                name = names[i];
                if (name in this.attrs) {
                    out[name] = this.attrs[name];
                } else if (R.is(this.paper.customAttributes[name], "function")) {
                    out[name] = this.paper.customAttributes[name].def;
                } else {
                    out[name] = R._availableAttrs[name];
                }
            }
            return ii - 1 ? out : out[names[0]];
        }
        if (this.attrs && value == null && R.is(name, "array")) {
            out = {};
            for (i = 0, ii = name.length; i < ii; i++) {
                out[name[i]] = this.attr(name[i]);
            }
            return out;
        }
        var params;
        if (value != null) {
            params = {};
            params[name] = value;
        }
        value == null && R.is(name, "object") && (params = name);
        for (var key in params) {
            eve("raphael.attr." + key + "." + this.id, this, params[key]);
        }
        if (params) {
            for (key in this.paper.customAttributes) if (this.paper.customAttributes[has](key) && params[has](key) && R.is(this.paper.customAttributes[key], "function")) {
                var par = this.paper.customAttributes[key].apply(this, [].concat(params[key]));
                this.attrs[key] = params[key];
                for (var subkey in par) if (par[has](subkey)) {
                    params[subkey] = par[subkey];
                }
            }
            // this.paper.canvas.style.display = "none";
            if (params.text && this.type == "text") {
                this.textpath.string = params.text;
            }
            setFillAndStroke(this, params);
            // this.paper.canvas.style.display = E;
        }
        return this;
    };
    elproto.toFront = function () {
        !this.removed && this.node.parentNode.appendChild(this.node);
        this.paper && this.paper.top != this && R._tofront(this, this.paper);
        return this;
    };
    elproto.toBack = function () {
        if (this.removed) {
            return this;
        }
        if (this.node.parentNode.firstChild != this.node) {
            this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild);
            R._toback(this, this.paper);
        }
        return this;
    };
    elproto.insertAfter = function (element) {
        if (this.removed) {
            return this;
        }
        if (element.constructor == R.st.constructor) {
            element = element[element.length - 1];
        }
        if (element.node.nextSibling) {
            element.node.parentNode.insertBefore(this.node, element.node.nextSibling);
        } else {
            element.node.parentNode.appendChild(this.node);
        }
        R._insertafter(this, element, this.paper);
        return this;
    };
    elproto.insertBefore = function (element) {
        if (this.removed) {
            return this;
        }
        if (element.constructor == R.st.constructor) {
            element = element[0];
        }
        element.node.parentNode.insertBefore(this.node, element.node);
        R._insertbefore(this, element, this.paper);
        return this;
    };
    elproto.blur = function (size) {
        var s = this.node.runtimeStyle,
            f = s.filter;
        f = f.replace(blurregexp, E);
        if (+size !== 0) {
            this.attrs.blur = size;
            s.filter = f + S + ms + ".Blur(pixelradius=" + (+size || 1.5) + ")";
            s.margin = R.format("-{0}px 0 0 -{0}px", round(+size || 1.5));
        } else {
            s.filter = f;
            s.margin = 0;
            delete this.attrs.blur;
        }
    };

    R._engine.path = function (pathString, vml) {
        var el = createNode("shape");
        el.style.cssText = cssDot;
        el.coordsize = zoom + S + zoom;
        el.coordorigin = vml.coordorigin;
        var p = new Element(el, vml),
            attr = {fill: "none", stroke: "#000"};
        pathString && (attr.path = pathString);
        p.type = "path";
        p.path = [];
        p.Path = E;
        setFillAndStroke(p, attr);
        vml.canvas.appendChild(el);
        var skew = createNode("skew");
        skew.on = true;
        el.appendChild(skew);
        p.skew = skew;
        p.transform(E);
        return p;
    };
    R._engine.rect = function (vml, x, y, w, h, r) {
        var path = R._rectPath(x, y, w, h, r),
            res = vml.path(path),
            a = res.attrs;
        res.X = a.x = x;
        res.Y = a.y = y;
        res.W = a.width = w;
        res.H = a.height = h;
        a.r = r;
        a.path = path;
        res.type = "rect";
        return res;
    };
    R._engine.ellipse = function (vml, x, y, rx, ry) {
        var res = vml.path(),
            a = res.attrs;
        res.X = x - rx;
        res.Y = y - ry;
        res.W = rx * 2;
        res.H = ry * 2;
        res.type = "ellipse";
        setFillAndStroke(res, {
            cx: x,
            cy: y,
            rx: rx,
            ry: ry
        });
        return res;
    };
    R._engine.circle = function (vml, x, y, r) {
        var res = vml.path(),
            a = res.attrs;
        res.X = x - r;
        res.Y = y - r;
        res.W = res.H = r * 2;
        res.type = "circle";
        setFillAndStroke(res, {
            cx: x,
            cy: y,
            r: r
        });
        return res;
    };
    R._engine.image = function (vml, src, x, y, w, h) {
        var path = R._rectPath(x, y, w, h),
            res = vml.path(path).attr({stroke: "none"}),
            a = res.attrs,
            node = res.node,
            fill = node.getElementsByTagName(fillString)[0];
        a.src = src;
        res.X = a.x = x;
        res.Y = a.y = y;
        res.W = a.width = w;
        res.H = a.height = h;
        a.path = path;
        res.type = "image";
        fill.parentNode == node && node.removeChild(fill);
        fill.rotate = true;
        fill.src = src;
        fill.type = "tile";
        res._.fillpos = [x, y];
        res._.fillsize = [w, h];
        node.appendChild(fill);
        setCoords(res, 1, 1, 0, 0, 0);
        return res;
    };
    R._engine.text = function (vml, x, y, text) {
        var el = createNode("shape"),
            path = createNode("path"),
            o = createNode("textpath");
        x = x || 0;
        y = y || 0;
        text = text || "";
        path.v = R.format("m{0},{1}l{2},{1}", round(x * zoom), round(y * zoom), round(x * zoom) + 1);
        path.textpathok = true;
        o.string = Str(text);
        o.on = true;
        el.style.cssText = cssDot;
        el.coordsize = zoom + S + zoom;
        el.coordorigin = "0 0";
        var p = new Element(el, vml),
            attr = {
                fill: "#000",
                stroke: "none",
                font: R._availableAttrs.font,
                text: text
            };
        p.shape = el;
        p.path = path;
        p.textpath = o;
        p.type = "text";
        p.attrs.text = Str(text);
        p.attrs.x = x;
        p.attrs.y = y;
        p.attrs.w = 1;
        p.attrs.h = 1;
        setFillAndStroke(p, attr);
        el.appendChild(o);
        el.appendChild(path);
        vml.canvas.appendChild(el);
        var skew = createNode("skew");
        skew.on = true;
        el.appendChild(skew);
        p.skew = skew;
        p.transform(E);
        return p;
    };
    R._engine.setSize = function (width, height) {
        var cs = this.canvas.style;
        this.width = width;
        this.height = height;
        width == +width && (width += "px");
        height == +height && (height += "px");
        cs.width = width;
        cs.height = height;
        cs.clip = "rect(0 " + width + " " + height + " 0)";
        if (this._viewBox) {
            R._engine.setViewBox.apply(this, this._viewBox);
        }
        return this;
    };
    R._engine.setViewBox = function (x, y, w, h, fit) {
        R.eve("raphael.setViewBox", this, this._viewBox, [x, y, w, h, fit]);
        var width = this.width,
            height = this.height,
            size = 1 / mmax(w / width, h / height),
            H, W;
        if (fit) {
            H = height / h;
            W = width / w;
            if (w * H < width) {
                x -= (width - w * H) / 2 / H;
            }
            if (h * W < height) {
                y -= (height - h * W) / 2 / W;
            }
        }
        this._viewBox = [x, y, w, h, !!fit];
        this._viewBoxShift = {
            dx: -x,
            dy: -y,
            scale: size
        };
        this.forEach(function (el) {
            el.transform("...");
        });
        return this;
    };
    var createNode;
    R._engine.initWin = function (win) {
            var doc = win.document;
            doc.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
            try {
                !doc.namespaces.rvml && doc.namespaces.add("rvml", "urn:schemas-microsoft-com:vml");
                createNode = function (tagName) {
                    return doc.createElement('<rvml:' + tagName + ' class="rvml">');
                };
            } catch (e) {
                createNode = function (tagName) {
                    return doc.createElement('<' + tagName + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
                };
            }
        };
    R._engine.initWin(R._g.win);
    R._engine.create = function () {
        var con = R._getContainer.apply(0, arguments),
            container = con.container,
            height = con.height,
            s,
            width = con.width,
            x = con.x,
            y = con.y;
        if (!container) {
            throw new Error("VML container not found.");
        }
        var res = new R._Paper,
            c = res.canvas = R._g.doc.createElement("div"),
            cs = c.style;
        x = x || 0;
        y = y || 0;
        width = width || 512;
        height = height || 342;
        res.width = width;
        res.height = height;
        width == +width && (width += "px");
        height == +height && (height += "px");
        res.coordsize = zoom * 1e3 + S + zoom * 1e3;
        res.coordorigin = "0 0";
        res.span = R._g.doc.createElement("span");
        res.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;";
        c.appendChild(res.span);
        cs.cssText = R.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", width, height);
        if (container == 1) {
            R._g.doc.body.appendChild(c);
            cs.left = x + "px";
            cs.top = y + "px";
            cs.position = "absolute";
        } else {
            if (container.firstChild) {
                container.insertBefore(c, container.firstChild);
            } else {
                container.appendChild(c);
            }
        }
        res.renderfix = function () {};
        return res;
    };
    R.prototype.clear = function () {
        R.eve("raphael.clear", this);
        this.canvas.innerHTML = E;
        this.span = R._g.doc.createElement("span");
        this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
        this.canvas.appendChild(this.span);
        this.bottom = this.top = null;
    };
    R.prototype.remove = function () {
        R.eve("raphael.remove", this);
        this.canvas.parentNode.removeChild(this.canvas);
        for (var i in this) {
            this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null;
        }
        return true;
    };

    var setproto = R.st;
    for (var method in elproto) if (elproto[has](method) && !setproto[has](method)) {
        setproto[method] = (function (methodname) {
            return function () {
                var arg = arguments;
                return this.forEach(function (el) {
                    el[methodname].apply(el, arg);
                });
            };
        })(method);
    }
}(window.Raphael);
;/*
* Raphael SVG Import Classic 0.1.3 - Extension to Raphael JS
* https://github.com/crccheck/raphael-svg-import-classic
*
* Raphael SVG Import Classic Copyright (c) 2012 Chris Chang
* Original Raphael SVG Import Copyright (c) 2009 Wout Fierens
* Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
*
*/

/* global Raphael */
Raphael.fn.importSVG = function (svgXML) {
  var myNewSet = this.set();
  var groupSet = {};
  var defaultTextAttr = {
    // stroke: "none"
    "text-anchor": "start"  // raphael defaults to "middle"
  };
  try {
    this.parseElement = function(elShape) {
      // skip text nodes
      if (elShape.nodeType == 3) {
        return;
      }
      var attr = {"stroke": "transparent", "stroke-width": 1, "fill":"#000"}, i;
      if (elShape.attributes){
        for (i = elShape.attributes.length - 1; i >= 0; --i){
          attr[elShape.attributes[i].name] = elShape.attributes[i].value;
        }
      }
      var shape, style;
      var shapeName = elShape.nodeName;
      switch(shapeName) {
        case "svg":
        case "g":
          // pass the id to the first child, parse the children
          var groupId = elShape.getAttribute('id');
          /*if (groupId && elShape.childNodes.length) {
            elShape.childNodes.item(1).setAttribute('id', groupId);
          }*/
          var thisGroup = this.set();
          for (i = 0; i < elShape.childNodes.length; ++i) {
            thisGroup.push(this.parseElement(elShape.childNodes.item(i)));
          }

          // handle transform attribute
          if (attr.transform){
            var match = /translate\(([^,]+),([^,]+)\)/.exec(attr.transform);
            if (match.length == 3){
              thisGroup.translate(match[1], match[2]);
            }
          }

          // handle display=none
          if (attr.display === "none") {
            thisGroup.hide();
          }
          // hold onto thisGroup just in case
          if (groupId && elShape.childNodes.length) {
            groupSet[groupId] = thisGroup;
          }
          return;
        case "rect":
          if (attr.rx && attr.ry) {
            attr.r = (+(attr.rx || 0) + (+(attr.ry || 0))) / 2;
            delete attr.rx;
            delete attr.ry;
          } else {
            attr.r = attr.rx || attr.ry || 0;
            delete attr.rx;
            delete attr.ry;
          }
          /* falls through */
        case "circle":
        case "ellipse":
          shape = this[shapeName]();
        break;
        case "path":
          shape = this.path(attr.d);
          delete attr.d;
        break;
        case "polygon":
          shape = this.polygon(attr);
        break;
        case "polyline":
          shape = this.polyline(attr);
        break;
        case "line":
          shape = this.line(attr);
        break;
        case "image":
          shape = this.image();
        break;
        case "text":
          for (var key in defaultTextAttr){
            if (!attr[key] && defaultTextAttr.hasOwnProperty(key)) {
              attr[key] = defaultTextAttr[key];
            }
          }
          shape = this.text(attr.x, attr.y, elShape.text || elShape.textContent);
        break;
        default:
          var elSVG = elShape.getElementsByTagName("svg");
          if (elSVG.length){
            elSVG[0].normalize();
            this.parseElement(elSVG[0]);
          }
          return;
      }

      // apply matrix transformation
      var matrix = attr.transform;
      if (matrix) {
        matrix = matrix.substring(7, matrix.length-1).split(' ')
                 .map(function(x){ return parseFloat(x); });
        var m = shape.matrix;
        m.add.apply(m, matrix);
        // this seems like a very odd step:
        shape.transform(m.toTransformString());
        delete attr.transform;
      }

      shape.attr(attr);

      // assign an arbitrary id
      var nodeID = elShape.getAttribute("id");
      if (nodeID) {
        shape.node.id = nodeID;
      }

      myNewSet.push(shape);
      return shape;
    };

    this.parseElement(svgXML);
  } catch (error) {
    throw "SVGParseError (" + error + ")";
  }

  var groupsExist = false, x;
  for (x in groupSet){
    groupsExist = true;
    break;
  }
  if (groupsExist) {
    myNewSet.groups = groupSet;
  }
  return myNewSet;
};


Raphael.fn.line = function(attr){
  var pathString = ["M",
                    attr.x1,
                    attr.y1,
                    "L",
                    attr.x2,
                    attr.y2,
                    "Z"];
  delete attr.x1;
  delete attr.y1;
  delete attr.x2;
  delete attr.y2;
  return this.path(pathString);
};


// extending raphael with a polygon function
Raphael.fn.polygon = function(attr) {
  var pointString = attr.points;
  var poly = ['M'],
      point = pointString.split(' ');

  for(var i=0; i < point.length; i++) {
     var c = point[i].split(',');
     for(var j=0; j < c.length; j++) {
        var d = parseFloat(c[j]);
        if (!isNaN(d))
          poly.push(d);
     }
     if (i === 0)
      poly.push('L');
  }
  poly.push('Z');
  delete attr.points;
  return this.path(poly);
};


Raphael.fn.polyline = function(attr) {
  var pointString = attr.points;
  var poly = ['M'],
      point = pointString.split(' ');

  for(var i=0; i < point.length; i++) {
     var c = point[i].split(',');
     for(var j=0; j < c.length; j++) {
        var d = parseFloat(c[j]);
        if (!isNaN(d))
          poly.push(d);
     }
     if (i === 0)
      poly.push('L');
  }
  delete attr.points;
  return this.path(poly);
};
;(function(){var D=[].indexOf||function(c){for(var g=0,q=this.length;g<q;g++)if(g in this&&this[g]===c)return g;return-1},y=[].slice;(function(c,g){var q,z,u,m,A,r,n,v,h,k,w,x,B,t,s,l;q=c(g);v=0<=D.call(g,"ontouchstart");m={horizontal:{},vertical:{}};A=1;n={};r="waypoints-context-id";w="resize.waypoints";x="scroll.waypoints";B=1;t="waypoints-waypoint-ids";s="waypoint";l="waypoints";z=function(){function a(b){var a=this;this.$element=b;this.element=b[0];this.didScroll=this.didResize=!1;this.id="context"+
A++;this.oldScroll={x:b.scrollLeft(),y:b.scrollTop()};this.waypoints={horizontal:{},vertical:{}};b.data(r,this.id);n[this.id]=this;b.bind(x,function(){if(!a.didScroll&&!v)return a.didScroll=!0,g.setTimeout(function(){a.doScroll();return a.didScroll=!1},c[l].settings.scrollThrottle)});b.bind(w,function(){if(!a.didResize)return a.didResize=!0,g.setTimeout(function(){c[l]("refresh");return a.didResize=!1},c[l].settings.resizeThrottle)})}a.prototype.doScroll=function(){var b,a=this;b={horizontal:{newScroll:this.$element.scrollLeft(),
oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.$element.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};if(v&&(!b.vertical.oldScroll||!b.vertical.newScroll))c[l]("refresh");c.each(b,function(b,f){var C,g,p;p=[];C=(g=f.newScroll>f.oldScroll)?f.forward:f.backward;c.each(a.waypoints[b],function(b,a){var c,e;if(f.oldScroll<(c=a.offset)&&c<=f.newScroll||f.newScroll<(e=a.offset)&&e<=f.oldScroll)return p.push(a)});p.sort(function(b,a){return b.offset-
a.offset});g||p.reverse();return c.each(p,function(b,a){if(a.options.continuous||b===p.length-1)return a.trigger([C])})});return this.oldScroll={x:b.horizontal.newScroll,y:b.vertical.newScroll}};a.prototype.refresh=function(){var b,a,d=this;a=c.isWindow(this.element);b=this.$element.offset();this.doScroll();b={horizontal:{contextOffset:a?0:b.left,contextScroll:a?0:this.oldScroll.x,contextDimension:this.$element.width(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},
vertical:{contextOffset:a?0:b.top,contextScroll:a?0:this.oldScroll.y,contextDimension:a?c[l]("viewportHeight"):this.$element.height(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};return c.each(b,function(b,a){return c.each(d.waypoints[b],function(b,d){var e,f,g,h,k;e=d.options.offset;g=d.offset;f=c.isWindow(d.element)?0:d.$element.offset()[a.offsetProp];c.isFunction(e)?e=e.apply(d.element):"string"===typeof e&&(e=parseFloat(e),-1<d.options.offset.indexOf("%")&&(e=Math.ceil(a.contextDimension*
e/100)));d.offset=f-a.contextOffset+a.contextScroll-e;if((!d.options.onlyOnScroll||null==g)&&d.enabled){if(null!==g&&g<(h=a.oldScroll)&&h<=d.offset)return d.trigger([a.backward]);if(null!==g&&g>(k=a.oldScroll)&&k>=d.offset||null===g&&a.oldScroll>=d.offset)return d.trigger([a.forward])}})})};a.prototype.checkEmpty=function(){if(c.isEmptyObject(this.waypoints.horizontal)&&c.isEmptyObject(this.waypoints.vertical))return this.$element.unbind([w,x].join(" ")),delete n[this.id]};return a}();u=function(){function a(a,
e,d){var f;d=c.extend({},c.fn[s].defaults,d);"bottom-in-view"===d.offset&&(d.offset=function(){var a;a=c[l]("viewportHeight");c.isWindow(e.element)||(a=e.$element.height());return a-c(this).outerHeight()});this.$element=a;this.element=a[0];this.axis=d.horizontal?"horizontal":"vertical";this.callback=d.handler;this.context=e;this.enabled=d.enabled;this.id="waypoints"+B++;this.offset=null;this.options=d;e.waypoints[this.axis][this.id]=this;m[this.axis][this.id]=this;d=null!=(f=a.data(t))?f:[];d.push(this.id);
a.data(t,d)}a.prototype.trigger=function(a){if(this.enabled&&(null!=this.callback&&this.callback.apply(this.element,a),this.options.triggerOnce))return this.destroy()};a.prototype.disable=function(){return this.enabled=!1};a.prototype.enable=function(){this.context.refresh();return this.enabled=!0};a.prototype.destroy=function(){delete m[this.axis][this.id];delete this.context.waypoints[this.axis][this.id];return this.context.checkEmpty()};a.getWaypointsByElement=function(a){var e;a=c(a).data(t);
if(!a)return[];e=c.extend({},m.horizontal,m.vertical);return c.map(a,function(a){return e[a]})};return a}();k={init:function(a,b){null==b&&(b={});null==b.handler&&(b.handler=a);this.each(function(){var a,d,f;a=c(this);f=null!=(d=b.context)?d:c.fn[s].defaults.context;c.isWindow(f)||(f=a.closest(f));f=c(f);(d=n[f.data(r)])||(d=new z(f));return new u(a,d,b)});c[l]("refresh");return this},disable:function(){return k._invoke(this,"disable")},enable:function(){return k._invoke(this,"enable")},destroy:function(){return k._invoke(this,
"destroy")},prev:function(a,b){return k._traverse.call(this,a,b,function(a,b,c){if(0<b)return a.push(c[b-1])})},next:function(a,b){return k._traverse.call(this,a,b,function(a,b,c){if(b<c.length-1)return a.push(c[b+1])})},_traverse:function(a,b,e){var d,f;null==a&&(a="vertical");null==b&&(b=g);f=h.aggregate(b);d=[];this.each(function(){var b;b=c.inArray(this,f[a]);return e(d,b,f[a])});return this.pushStack(d)},_invoke:function(a,b){a.each(function(){var a;a=u.getWaypointsByElement(this);return c.each(a,
function(a,c){c[b]();return!0})});return this}};c.fn[s]=function(){var a,b;b=arguments[0];a=2<=arguments.length?y.call(arguments,1):[];return k[b]?k[b].apply(this,a):c.isFunction(b)?k.init.apply(this,arguments):c.isPlainObject(b)?k.init.apply(this,[null,b]):b?c.error("The "+b+" method does not exist in jQuery Waypoints."):c.error("jQuery Waypoints needs a callback function or handler option.")};c.fn[s].defaults={context:g,continuous:!0,enabled:!0,horizontal:!1,offset:0,triggerOnce:!1};h={refresh:function(){return c.each(n,
function(a,b){return b.refresh()})},viewportHeight:function(){var a;return null!=(a=g.innerHeight)?a:q.height()},aggregate:function(a){var b,e,d;b=m;a&&(b=null!=(d=n[c(a).data(r)])?d.waypoints:void 0);if(!b)return[];e={horizontal:[],vertical:[]};c.each(e,function(a,d){c.each(b[a],function(a,b){return d.push(b)});d.sort(function(a,b){return a.offset-b.offset});e[a]=c.map(d,function(a){return a.element});return e[a]=c.unique(e[a])});return e},above:function(a){null==a&&(a=g);return h._filter(a,"vertical",
function(a,c){return c.offset<=a.oldScroll.y})},below:function(a){null==a&&(a=g);return h._filter(a,"vertical",function(a,c){return c.offset>a.oldScroll.y})},left:function(a){null==a&&(a=g);return h._filter(a,"horizontal",function(a,c){return c.offset<=a.oldScroll.x})},right:function(a){null==a&&(a=g);return h._filter(a,"horizontal",function(a,c){return c.offset>a.oldScroll.x})},enable:function(){return h._invoke("enable")},disable:function(){return h._invoke("disable")},destroy:function(){return h._invoke("destroy")},
extendFn:function(a,b){return k[a]=b},_invoke:function(a){var b;b=c.extend({},m.vertical,m.horizontal);return c.each(b,function(b,c){c[a]();return!0})},_filter:function(a,b,e){var d,f;d=n[c(a).data(r)];if(!d)return[];f=[];c.each(d.waypoints[b],function(a,b){if(e(d,b))return f.push(b)});f.sort(function(a,b){return a.offset-b.offset});return c.map(f,function(a){return a.element})}};c[l]=function(){var a,b;b=arguments[0];a=2<=arguments.length?y.call(arguments,1):[];return h[b]?h[b].apply(null,a):h.aggregate.call(null,
b)};c[l].settings={resizeThrottle:100,scrollThrottle:30};return q.load(function(){return c[l]("refresh")})})(this.jQuery,this)}).call(this);;/*
 * jQuery FlexSlider v2.2.2
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */
;
(function ($) {

    //FlexSlider: Object Instance
    $.flexslider = function(el, options) {
        var slider = $(el);

        // making variables public
        slider.vars = $.extend({}, $.flexslider.defaults, options);

        var namespace = slider.vars.namespace,
            msGesture = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
            touch = (( "ontouchstart" in window ) || msGesture || window.DocumentTouch && document instanceof DocumentTouch) && slider.vars.touch,
        // depricating this idea, as devices are being released with both of these events
        //eventType = (touch) ? "touchend" : "click",
            eventType = "click touchend MSPointerUp",
            watchedEvent = "",
            watchedEventClearTimer,
            vertical = slider.vars.direction === "vertical",
            reverse = slider.vars.reverse,
            carousel = (slider.vars.itemWidth > 0),
            fade = slider.vars.animation === "fade",
            asNav = slider.vars.asNavFor !== "",
            methods = {},
            focused = true;

        // Store a reference to the slider object
        $.data(el, "flexslider", slider);

        // Private slider methods
        methods = {
            init: function() {
                slider.animating = false;
                // Get current slide and make sure it is a number
                slider.currentSlide = parseInt( ( slider.vars.startAt ? slider.vars.startAt : 0), 10 );
                if ( isNaN( slider.currentSlide ) ) slider.currentSlide = 0;
                slider.animatingTo = slider.currentSlide;
                slider.atEnd = (slider.currentSlide === 0 || slider.currentSlide === slider.last);
                slider.containerSelector = slider.vars.selector.substr(0,slider.vars.selector.search(' '));
                slider.slides = $(slider.vars.selector, slider);
                slider.container = $(slider.containerSelector, slider);
                slider.count = slider.slides.length;
                // SYNC:
                slider.syncExists = $(slider.vars.sync).length > 0;
                // SLIDE:
                if (slider.vars.animation === "slide") slider.vars.animation = "swing";
                slider.prop = (vertical) ? "top" : "marginLeft";
                slider.args = {};
                // SLIDESHOW:
                slider.manualPause = false;
                slider.stopped = false;
                //PAUSE WHEN INVISIBLE
                slider.started = false;
                slider.startTimeout = null;
                // TOUCH/USECSS:
                slider.transitions = !slider.vars.video && !fade && slider.vars.useCSS && (function() {
                    var obj = document.createElement('div'),
                        props = ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
                    for (var i in props) {
                        if ( obj.style[ props[i] ] !== undefined ) {
                            slider.pfx = props[i].replace('Perspective','').toLowerCase();
                            slider.prop = "-" + slider.pfx + "-transform";
                            return true;
                        }
                    }
                    return false;
                }());
                // CONTROLSCONTAINER:
                if (slider.vars.controlsContainer !== "") slider.controlsContainer = $(slider.vars.controlsContainer).length > 0 && $(slider.vars.controlsContainer);
                // MANUAL:
                if (slider.vars.manualControls !== "") slider.manualControls = $(slider.vars.manualControls).length > 0 && $(slider.vars.manualControls);

                // RANDOMIZE:
                if (slider.vars.randomize) {
                    slider.slides.sort(function() { return (Math.round(Math.random())-0.5); });
                    slider.container.empty().append(slider.slides);
                }

                slider.doMath();

                // INIT
                slider.setup("init");

                // CONTROLNAV:
                if (slider.vars.controlNav) methods.controlNav.setup();

                // DIRECTIONNAV:
                if (slider.vars.directionNav) methods.directionNav.setup();

                // KEYBOARD:
                if (slider.vars.keyboard && ($(slider.containerSelector).length === 1 || slider.vars.multipleKeyboard)) {
                    $(document).bind('keyup', function(event) {
                        var keycode = event.keyCode;
                        if (!slider.animating && (keycode === 39 || keycode === 37)) {
                            var target = (keycode === 39) ? slider.getTarget('next') :
                                (keycode === 37) ? slider.getTarget('prev') : false;
                            slider.flexAnimate(target, slider.vars.pauseOnAction);
                        }
                    });
                }
                // MOUSEWHEEL:
                if (slider.vars.mousewheel) {
                    slider.bind('mousewheel', function(event, delta, deltaX, deltaY) {
                        event.preventDefault();
                        var target = (delta < 0) ? slider.getTarget('next') : slider.getTarget('prev');
                        slider.flexAnimate(target, slider.vars.pauseOnAction);
                    });
                }

                // PAUSEPLAY
                if (slider.vars.pausePlay) methods.pausePlay.setup();

                //PAUSE WHEN INVISIBLE
                if (slider.vars.slideshow && slider.vars.pauseInvisible) methods.pauseInvisible.init();

                // SLIDSESHOW
                if (slider.vars.slideshow) {
                    if (slider.vars.pauseOnHover) {
                        slider.hover(function() {
                            if (!slider.manualPlay && !slider.manualPause) slider.pause();
                        }, function() {
                            if (!slider.manualPause && !slider.manualPlay && !slider.stopped) slider.play();
                        });
                    }
                    // initialize animation
                    //If we're visible, or we don't use PageVisibility API
                    if(!slider.vars.pauseInvisible || !methods.pauseInvisible.isHidden()) {
                        (slider.vars.initDelay > 0) ? slider.startTimeout = setTimeout(slider.play, slider.vars.initDelay) : slider.play();
                    }
                }

                // ASNAV:
                if (asNav) methods.asNav.setup();

                // TOUCH
                if (touch && slider.vars.touch) methods.touch();

                // FADE&&SMOOTHHEIGHT || SLIDE:
                if (!fade || (fade && slider.vars.smoothHeight)) $(window).bind("resize orientationchange focus", methods.resize);

                slider.find("img").attr("draggable", "false");

                // API: start() Callback
                setTimeout(function(){
                    slider.vars.start(slider);
                }, 200);
            },
            asNav: {
                setup: function() {
                    slider.asNav = true;
                    slider.animatingTo = Math.floor(slider.currentSlide/slider.move);
                    slider.currentItem = slider.currentSlide;
                    slider.slides.removeClass(namespace + "active-slide").eq(slider.currentItem).addClass(namespace + "active-slide");
                    if(!msGesture){
                        slider.slides.on(eventType, function(e){
                            e.preventDefault();
                            var $slide = $(this),
                                target = $slide.index();
                            var posFromLeft = $slide.offset().left - $(slider).scrollLeft(); // Find position of slide relative to left of slider container
                            if( posFromLeft <= 0 && $slide.hasClass( namespace + 'active-slide' ) ) {
                                slider.flexAnimate(slider.getTarget("prev"), true);
                            } else if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass(namespace + "active-slide")) {
                                slider.direction = (slider.currentItem < target) ? "next" : "prev";
                                slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
                            }
                        });
                    }else{
                        el._slider = slider;
                        slider.slides.each(function (){
                            var that = this;
                            that._gesture = new MSGesture();
                            that._gesture.target = that;
                            that.addEventListener("MSPointerDown", function (e){
                                e.preventDefault();
                                if(e.currentTarget._gesture)
                                    e.currentTarget._gesture.addPointer(e.pointerId);
                            }, false);
                            that.addEventListener("MSGestureTap", function (e){
                                e.preventDefault();
                                var $slide = $(this),
                                    target = $slide.index();
                                if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass('active')) {
                                    slider.direction = (slider.currentItem < target) ? "next" : "prev";
                                    slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
                                }
                            });
                        });
                    }
                }
            },
            controlNav: {
                setup: function() {
                    if (!slider.manualControls) {
                        methods.controlNav.setupPaging();
                    } else { // MANUALCONTROLS:
                        methods.controlNav.setupManual();
                    }
                },
                setupPaging: function() {
                    var type = (slider.vars.controlNav === "thumbnails") ? 'control-thumbs' : 'control-paging',
                        j = 1,
                        item,
                        slide;

                    slider.controlNavScaffold = $('<ol class="'+ namespace + 'control-nav ' + namespace + type + '"></ol>');

                    if (slider.pagingCount > 1) {
                        for (var i = 0; i < slider.pagingCount; i++) {
                            slide = slider.slides.eq(i);
                            item = (slider.vars.controlNav === "thumbnails") ? '<img src="' + slide.attr( 'data-thumb' ) + '"/>' : '<a>' + j + '</a>';
                            if ( 'thumbnails' === slider.vars.controlNav && true === slider.vars.thumbCaptions ) {
                                var captn = slide.attr( 'data-thumbcaption' );
                                if ( '' != captn && undefined != captn ) item += '<span class="' + namespace + 'caption">' + captn + '</span>';
                            }
                            slider.controlNavScaffold.append('<li>' + item + '</li>');
                            j++;
                        }
                    }

                    // CONTROLSCONTAINER:
                    (slider.controlsContainer) ? $(slider.controlsContainer).append(slider.controlNavScaffold) : slider.append(slider.controlNavScaffold);
                    methods.controlNav.set();

                    methods.controlNav.active();

                    slider.controlNavScaffold.delegate('a, img', eventType, function(event) {
                        event.preventDefault();

                        if (watchedEvent === "" || watchedEvent === event.type) {
                            var $this = $(this),
                                target = slider.controlNav.index($this);

                            if (!$this.hasClass(namespace + 'active')) {
                                slider.direction = (target > slider.currentSlide) ? "next" : "prev";
                                slider.flexAnimate(target, slider.vars.pauseOnAction);
                            }
                        }

                        // setup flags to prevent event duplication
                        if (watchedEvent === "") {
                            watchedEvent = event.type;
                        }
                        methods.setToClearWatchedEvent();

                    });
                },
                setupManual: function() {
                    slider.controlNav = slider.manualControls;
                    methods.controlNav.active();

                    slider.controlNav.bind(eventType, function(event) {
                        event.preventDefault();

                        if (watchedEvent === "" || watchedEvent === event.type) {
                            var $this = $(this),
                                target = slider.controlNav.index($this);

                            if (!$this.hasClass(namespace + 'active')) {
                                (target > slider.currentSlide) ? slider.direction = "next" : slider.direction = "prev";
                                slider.flexAnimate(target, slider.vars.pauseOnAction);
                            }
                        }

                        // setup flags to prevent event duplication
                        if (watchedEvent === "") {
                            watchedEvent = event.type;
                        }
                        methods.setToClearWatchedEvent();
                    });
                },
                set: function() {
                    var selector = (slider.vars.controlNav === "thumbnails") ? 'img' : 'a';
                    slider.controlNav = $('.' + namespace + 'control-nav li ' + selector, (slider.controlsContainer) ? slider.controlsContainer : slider);
                },
                active: function() {
                    slider.controlNav.removeClass(namespace + "active").eq(slider.animatingTo).addClass(namespace + "active");
                },
                update: function(action, pos) {
                    if (slider.pagingCount > 1 && action === "add") {
                        slider.controlNavScaffold.append($('<li><a>' + slider.count + '</a></li>'));
                    } else if (slider.pagingCount === 1) {
                        slider.controlNavScaffold.find('li').remove();
                    } else {
                        slider.controlNav.eq(pos).closest('li').remove();
                    }
                    methods.controlNav.set();
                    (slider.pagingCount > 1 && slider.pagingCount !== slider.controlNav.length) ? slider.update(pos, action) : methods.controlNav.active();
                }
            },
            directionNav: {
                setup: function() {
                    var directionNavScaffold = $('<ul class="' + namespace + 'direction-nav"><li><a class="' + namespace + 'prev" href="#">' + slider.vars.prevText + '</a></li><li><a class="' + namespace + 'next" href="#">' + slider.vars.nextText + '</a></li></ul>');

                    // CONTROLSCONTAINER:
                    if (slider.controlsContainer) {
                        $(slider.controlsContainer).append(directionNavScaffold);
                        slider.directionNav = $('.' + namespace + 'direction-nav li a', slider.controlsContainer);
                    } else {
                        slider.append(directionNavScaffold);
                        slider.directionNav = $('.' + namespace + 'direction-nav li a', slider);
                    }

                    methods.directionNav.update();

                    slider.directionNav.bind(eventType, function(event) {
                        event.preventDefault();
                        var target;

                        if (watchedEvent === "" || watchedEvent === event.type) {
                            target = ($(this).hasClass(namespace + 'next')) ? slider.getTarget('next') : slider.getTarget('prev');
                            slider.flexAnimate(target, slider.vars.pauseOnAction);
                        }

                        // setup flags to prevent event duplication
                        if (watchedEvent === "") {
                            watchedEvent = event.type;
                        }
                        methods.setToClearWatchedEvent();
                    });
                },
                update: function() {
                    var disabledClass = namespace + 'disabled';
                    if (slider.pagingCount === 1) {
                        slider.directionNav.addClass(disabledClass).attr('tabindex', '-1');
                    } else if (!slider.vars.animationLoop) {
                        if (slider.animatingTo === 0) {
                            slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "prev").addClass(disabledClass).attr('tabindex', '-1');
                        } else if (slider.animatingTo === slider.last) {
                            slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "next").addClass(disabledClass).attr('tabindex', '-1');
                        } else {
                            slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
                        }
                    } else {
                        slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
                    }
                }
            },
            pausePlay: {
                setup: function() {
                    var pausePlayScaffold = $('<div class="' + namespace + 'pauseplay"><a></a></div>');

                    // CONTROLSCONTAINER:
                    if (slider.controlsContainer) {
                        slider.controlsContainer.append(pausePlayScaffold);
                        slider.pausePlay = $('.' + namespace + 'pauseplay a', slider.controlsContainer);
                    } else {
                        slider.append(pausePlayScaffold);
                        slider.pausePlay = $('.' + namespace + 'pauseplay a', slider);
                    }

                    methods.pausePlay.update((slider.vars.slideshow) ? namespace + 'pause' : namespace + 'play');

                    slider.pausePlay.bind(eventType, function(event) {
                        event.preventDefault();

                        if (watchedEvent === "" || watchedEvent === event.type) {
                            if ($(this).hasClass(namespace + 'pause')) {
                                slider.manualPause = true;
                                slider.manualPlay = false;
                                slider.pause();
                            } else {
                                slider.manualPause = false;
                                slider.manualPlay = true;
                                slider.play();
                            }
                        }

                        // setup flags to prevent event duplication
                        if (watchedEvent === "") {
                            watchedEvent = event.type;
                        }
                        methods.setToClearWatchedEvent();
                    });
                },
                update: function(state) {
                    (state === "play") ? slider.pausePlay.removeClass(namespace + 'pause').addClass(namespace + 'play').html(slider.vars.playText) : slider.pausePlay.removeClass(namespace + 'play').addClass(namespace + 'pause').html(slider.vars.pauseText);
                }
            },
            touch: function() {
                var startX,
                    startY,
                    offset,
                    cwidth,
                    dx,
                    startT,
                    scrolling = false,
                    localX = 0,
                    localY = 0,
                    accDx = 0;

                if(!msGesture){
                    el.addEventListener('touchstart', onTouchStart, false);

                    function onTouchStart(e) {
                        if (slider.animating) {
                            e.preventDefault();
                        } else if ( ( window.navigator.msPointerEnabled ) || e.touches.length === 1 ) {
                            slider.pause();
                            // CAROUSEL:
                            cwidth = (vertical) ? slider.h : slider. w;
                            startT = Number(new Date());
                            // CAROUSEL:

                            // Local vars for X and Y points.
                            localX = e.touches[0].pageX;
                            localY = e.touches[0].pageY;

                            offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
                                (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                                    (carousel && slider.currentSlide === slider.last) ? slider.limit :
                                        (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
                                            (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
                            startX = (vertical) ? localY : localX;
                            startY = (vertical) ? localX : localY;

                            el.addEventListener('touchmove', onTouchMove, false);
                            el.addEventListener('touchend', onTouchEnd, false);
                        }
                    }

                    function onTouchMove(e) {
                        // Local vars for X and Y points.

                        localX = e.touches[0].pageX;
                        localY = e.touches[0].pageY;

                        dx = (vertical) ? startX - localY : startX - localX;
                        scrolling = (vertical) ? (Math.abs(dx) < Math.abs(localX - startY)) : (Math.abs(dx) < Math.abs(localY - startY));

                        var fxms = 500;

                        if ( ! scrolling || Number( new Date() ) - startT > fxms ) {
                            e.preventDefault();
                            if (!fade && slider.transitions) {
                                if (!slider.vars.animationLoop) {
                                    dx = dx/((slider.currentSlide === 0 && dx < 0 || slider.currentSlide === slider.last && dx > 0) ? (Math.abs(dx)/cwidth+2) : 1);
                                }
                                slider.setProps(offset + dx, "setTouch");
                            }
                        }
                    }

                    function onTouchEnd(e) {
                        // finish the touch by undoing the touch session
                        el.removeEventListener('touchmove', onTouchMove, false);

                        if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
                            var updateDx = (reverse) ? -dx : dx,
                                target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

                            if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth/2)) {
                                slider.flexAnimate(target, slider.vars.pauseOnAction);
                            } else {
                                if (!fade) slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true);
                            }
                        }
                        el.removeEventListener('touchend', onTouchEnd, false);

                        startX = null;
                        startY = null;
                        dx = null;
                        offset = null;
                    }
                }else{
                    el.style.msTouchAction = "none";
                    el._gesture = new MSGesture();
                    el._gesture.target = el;
                    el.addEventListener("MSPointerDown", onMSPointerDown, false);
                    el._slider = slider;
                    el.addEventListener("MSGestureChange", onMSGestureChange, false);
                    el.addEventListener("MSGestureEnd", onMSGestureEnd, false);

                    function onMSPointerDown(e){
                        e.stopPropagation();
                        if (slider.animating) {
                            e.preventDefault();
                        }else{
                            slider.pause();
                            el._gesture.addPointer(e.pointerId);
                            accDx = 0;
                            cwidth = (vertical) ? slider.h : slider. w;
                            startT = Number(new Date());
                            // CAROUSEL:

                            offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
                                (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                                    (carousel && slider.currentSlide === slider.last) ? slider.limit :
                                        (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
                                            (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
                        }
                    }

                    function onMSGestureChange(e) {
                        e.stopPropagation();
                        var slider = e.target._slider;
                        if(!slider){
                            return;
                        }
                        var transX = -e.translationX,
                            transY = -e.translationY;

                        //Accumulate translations.
                        accDx = accDx + ((vertical) ? transY : transX);
                        dx = accDx;
                        scrolling = (vertical) ? (Math.abs(accDx) < Math.abs(-transX)) : (Math.abs(accDx) < Math.abs(-transY));

                        if(e.detail === e.MSGESTURE_FLAG_INERTIA){
                            setImmediate(function (){
                                el._gesture.stop();
                            });

                            return;
                        }

                        if (!scrolling || Number(new Date()) - startT > 500) {
                            e.preventDefault();
                            if (!fade && slider.transitions) {
                                if (!slider.vars.animationLoop) {
                                    dx = accDx / ((slider.currentSlide === 0 && accDx < 0 || slider.currentSlide === slider.last && accDx > 0) ? (Math.abs(accDx) / cwidth + 2) : 1);
                                }
                                slider.setProps(offset + dx, "setTouch");
                            }
                        }
                    }

                    function onMSGestureEnd(e) {
                        e.stopPropagation();
                        var slider = e.target._slider;
                        if(!slider){
                            return;
                        }
                        if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
                            var updateDx = (reverse) ? -dx : dx,
                                target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

                            if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth/2)) {
                                slider.flexAnimate(target, slider.vars.pauseOnAction);
                            } else {
                                if (!fade) slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true);
                            }
                        }

                        startX = null;
                        startY = null;
                        dx = null;
                        offset = null;
                        accDx = 0;
                    }
                }
            },
            resize: function() {
                if (!slider.animating && slider.is(':visible')) {
                    if (!carousel) slider.doMath();

                    if (fade) {
                        // SMOOTH HEIGHT:
                        methods.smoothHeight();
                    } else if (carousel) { //CAROUSEL:
                        slider.slides.width(slider.computedW);
                        slider.update(slider.pagingCount);
                        slider.setProps();
                    }
                    else if (vertical) { //VERTICAL:
                        slider.viewport.height(slider.h);
                        slider.setProps(slider.h, "setTotal");
                    } else {
                        // SMOOTH HEIGHT:
                        if (slider.vars.smoothHeight) methods.smoothHeight();
                        slider.newSlides.width(slider.computedW);
                        slider.setProps(slider.computedW, "setTotal");
                    }
                }
            },
            smoothHeight: function(dur) {
                if (!vertical || fade) {
                    var $obj = (fade) ? slider : slider.viewport;
                    (dur) ? $obj.animate({"height": slider.slides.eq(slider.animatingTo).height()}, dur) : $obj.height(slider.slides.eq(slider.animatingTo).height());
                }
            },
            sync: function(action) {
                var $obj = $(slider.vars.sync).data("flexslider"),
                    target = slider.animatingTo;

                switch (action) {
                    case "animate": $obj.flexAnimate(target, slider.vars.pauseOnAction, false, true); break;
                    case "play": if (!$obj.playing && !$obj.asNav) { $obj.play(); } break;
                    case "pause": $obj.pause(); break;
                }
            },
            uniqueID: function($clone) {
                $clone.find( '[id]' ).each(function() {
                    var $this = $(this);
                    $this.attr( 'id', $this.attr( 'id' ) + '_clone' );
                });
                return $clone;
            },
            pauseInvisible: {
                visProp: null,
                init: function() {
                    var prefixes = ['webkit','moz','ms','o'];

                    if ('hidden' in document) return 'hidden';
                    for (var i = 0; i < prefixes.length; i++) {
                        if ((prefixes[i] + 'Hidden') in document)
                            methods.pauseInvisible.visProp = prefixes[i] + 'Hidden';
                    }
                    if (methods.pauseInvisible.visProp) {
                        var evtname = methods.pauseInvisible.visProp.replace(/[H|h]idden/,'') + 'visibilitychange';
                        document.addEventListener(evtname, function() {
                            if (methods.pauseInvisible.isHidden()) {
                                if(slider.startTimeout) clearTimeout(slider.startTimeout); //If clock is ticking, stop timer and prevent from starting while invisible
                                else slider.pause(); //Or just pause
                            }
                            else {
                                if(slider.started) slider.play(); //Initiated before, just play
                                else (slider.vars.initDelay > 0) ? setTimeout(slider.play, slider.vars.initDelay) : slider.play(); //Didn't init before: simply init or wait for it
                            }
                        });
                    }
                },
                isHidden: function() {
                    return document[methods.pauseInvisible.visProp] || false;
                }
            },
            setToClearWatchedEvent: function() {
                clearTimeout(watchedEventClearTimer);
                watchedEventClearTimer = setTimeout(function() {
                    watchedEvent = "";
                }, 3000);
            }
        };

        // public methods
        slider.flexAnimate = function(target, pause, override, withSync, fromNav) {
            if (!slider.vars.animationLoop && target !== slider.currentSlide) {
                slider.direction = (target > slider.currentSlide) ? "next" : "prev";
            }

            if (asNav && slider.pagingCount === 1) slider.direction = (slider.currentItem < target) ? "next" : "prev";

            if (!slider.animating && (slider.canAdvance(target, fromNav) || override) && slider.is(":visible")) {
                if (asNav && withSync) {
                    var master = $(slider.vars.asNavFor).data('flexslider');
                    slider.atEnd = target === 0 || target === slider.count - 1;
                    master.flexAnimate(target, true, false, true, fromNav);
                    slider.direction = (slider.currentItem < target) ? "next" : "prev";
                    master.direction = slider.direction;

                    if (Math.ceil((target + 1)/slider.visible) - 1 !== slider.currentSlide && target !== 0) {
                        slider.currentItem = target;
                        slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
                        target = Math.floor(target/slider.visible);
                    } else {
                        slider.currentItem = target;
                        slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
                        return false;
                    }
                }

                slider.animating = true;
                slider.animatingTo = target;

                // SLIDESHOW:
                if (pause) slider.pause();

                // API: before() animation Callback
                slider.vars.before(slider);

                // SYNC:
                if (slider.syncExists && !fromNav) methods.sync("animate");

                // CONTROLNAV
                if (slider.vars.controlNav) methods.controlNav.active();

                // !CAROUSEL:
                // CANDIDATE: slide active class (for add/remove slide)
                if (!carousel) slider.slides.removeClass(namespace + 'active-slide').eq(target).addClass(namespace + 'active-slide');

                // INFINITE LOOP:
                // CANDIDATE: atEnd
                slider.atEnd = target === 0 || target === slider.last;

                // DIRECTIONNAV:
                if (slider.vars.directionNav) methods.directionNav.update();

                if (target === slider.last) {
                    // API: end() of cycle Callback
                    slider.vars.end(slider);
                    // SLIDESHOW && !INFINITE LOOP:
                    if (!slider.vars.animationLoop) slider.pause();
                }

                // SLIDE:
                if (!fade) {
                    var dimension = (vertical) ? slider.slides.filter(':first').height() : slider.computedW,
                        margin, slideString, calcNext;

                    // INFINITE LOOP / REVERSE:
                    if (carousel) {
                        //margin = (slider.vars.itemWidth > slider.w) ? slider.vars.itemMargin * 2 : slider.vars.itemMargin;
                        margin = slider.vars.itemMargin;
                        calcNext = ((slider.itemW + margin) * slider.move) * slider.animatingTo;
                        slideString = (calcNext > slider.limit && slider.visible !== 1) ? slider.limit : calcNext;
                    } else if (slider.currentSlide === 0 && target === slider.count - 1 && slider.vars.animationLoop && slider.direction !== "next") {
                        slideString = (reverse) ? (slider.count + slider.cloneOffset) * dimension : 0;
                    } else if (slider.currentSlide === slider.last && target === 0 && slider.vars.animationLoop && slider.direction !== "prev") {
                        slideString = (reverse) ? 0 : (slider.count + 1) * dimension;
                    } else {
                        slideString = (reverse) ? ((slider.count - 1) - target + slider.cloneOffset) * dimension : (target + slider.cloneOffset) * dimension;
                    }
                    slider.setProps(slideString, "", slider.vars.animationSpeed);
                    if (slider.transitions) {
                        if (!slider.vars.animationLoop || !slider.atEnd) {
                            slider.animating = false;
                            slider.currentSlide = slider.animatingTo;
                        }
                        slider.container.unbind("webkitTransitionEnd transitionend");
                        slider.container.bind("webkitTransitionEnd transitionend", function() {
                            slider.wrapup(dimension);
                        });
                    } else {
                        slider.container.animate(slider.args, slider.vars.animationSpeed, slider.vars.easing, function(){
                            slider.wrapup(dimension);
                        });
                    }
                } else { // FADE:
                    if (!touch) {
                        //slider.slides.eq(slider.currentSlide).fadeOut(slider.vars.animationSpeed, slider.vars.easing);
                        //slider.slides.eq(target).fadeIn(slider.vars.animationSpeed, slider.vars.easing, slider.wrapup);

                        slider.slides.eq(slider.currentSlide).css({"zIndex": 1}).animate({"opacity": 0}, slider.vars.animationSpeed, slider.vars.easing);
                        slider.slides.eq(target).css({"zIndex": 2}).animate({"opacity": 1}, slider.vars.animationSpeed, slider.vars.easing, slider.wrapup);

                    } else {
                        slider.slides.eq(slider.currentSlide).css({ "opacity": 0, "zIndex": 1 });
                        slider.slides.eq(target).css({ "opacity": 1, "zIndex": 2 });
                        slider.wrapup(dimension);
                    }
                }
                // SMOOTH HEIGHT:
                if (slider.vars.smoothHeight) methods.smoothHeight(slider.vars.animationSpeed);
            }
        };
        slider.wrapup = function(dimension) {
            // SLIDE:
            if (!fade && !carousel) {
                if (slider.currentSlide === 0 && slider.animatingTo === slider.last && slider.vars.animationLoop) {
                    slider.setProps(dimension, "jumpEnd");
                } else if (slider.currentSlide === slider.last && slider.animatingTo === 0 && slider.vars.animationLoop) {
                    slider.setProps(dimension, "jumpStart");
                }
            }
            slider.animating = false;
            slider.currentSlide = slider.animatingTo;
            // API: after() animation Callback
            slider.vars.after(slider);
        };

        // SLIDESHOW:
        slider.animateSlides = function() {
            if (!slider.animating && focused ) slider.flexAnimate(slider.getTarget("next"));
        };
        // SLIDESHOW:
        slider.pause = function() {
            clearInterval(slider.animatedSlides);
            slider.animatedSlides = null;
            slider.playing = false;
            // PAUSEPLAY:
            if (slider.vars.pausePlay) methods.pausePlay.update("play");
            // SYNC:
            if (slider.syncExists) methods.sync("pause");
        };
        // SLIDESHOW:
        slider.play = function() {
            if (slider.playing) clearInterval(slider.animatedSlides);
            slider.animatedSlides = slider.animatedSlides || setInterval(slider.animateSlides, slider.vars.slideshowSpeed);
            slider.started = slider.playing = true;
            // PAUSEPLAY:
            if (slider.vars.pausePlay) methods.pausePlay.update("pause");
            // SYNC:
            if (slider.syncExists) methods.sync("play");
        };
        // STOP:
        slider.stop = function () {
            slider.pause();
            slider.stopped = true;
        };
        slider.canAdvance = function(target, fromNav) {
            // ASNAV:
            var last = (asNav) ? slider.pagingCount - 1 : slider.last;
            return (fromNav) ? true :
                (asNav && slider.currentItem === slider.count - 1 && target === 0 && slider.direction === "prev") ? true :
                    (asNav && slider.currentItem === 0 && target === slider.pagingCount - 1 && slider.direction !== "next") ? false :
                        (target === slider.currentSlide && !asNav) ? false :
                            (slider.vars.animationLoop) ? true :
                                (slider.atEnd && slider.currentSlide === 0 && target === last && slider.direction !== "next") ? false :
                                    (slider.atEnd && slider.currentSlide === last && target === 0 && slider.direction === "next") ? false :
                                        true;
        };
        slider.getTarget = function(dir) {
            slider.direction = dir;
            if (dir === "next") {
                return (slider.currentSlide === slider.last) ? 0 : slider.currentSlide + 1;
            } else {
                return (slider.currentSlide === 0) ? slider.last : slider.currentSlide - 1;
            }
        };

        // SLIDE:
        slider.setProps = function(pos, special, dur) {
            var target = (function() {
                var posCheck = (pos) ? pos : ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo,
                    posCalc = (function() {
                        if (carousel) {
                            return (special === "setTouch") ? pos :
                                (reverse && slider.animatingTo === slider.last) ? 0 :
                                    (reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                                        (slider.animatingTo === slider.last) ? slider.limit : posCheck;
                        } else {
                            switch (special) {
                                case "setTotal": return (reverse) ? ((slider.count - 1) - slider.currentSlide + slider.cloneOffset) * pos : (slider.currentSlide + slider.cloneOffset) * pos;
                                case "setTouch": return (reverse) ? pos : pos;
                                case "jumpEnd": return (reverse) ? pos : slider.count * pos;
                                case "jumpStart": return (reverse) ? slider.count * pos : pos;
                                default: return pos;
                            }
                        }
                    }());

                return (posCalc * -1) + "px";
            }());

            if (slider.transitions) {
                target = (vertical) ? "translate3d(0," + target + ",0)" : "translate3d(" + target + ",0,0)";
                dur = (dur !== undefined) ? (dur/1000) + "s" : "0s";
                slider.container.css("-" + slider.pfx + "-transition-duration", dur);
                slider.container.css("transition-duration", dur);
            }

            slider.args[slider.prop] = target;
            if (slider.transitions || dur === undefined) slider.container.css(slider.args);

            slider.container.css('transform',target);
        };

        slider.setup = function(type) {
            // SLIDE:
            if (!fade) {
                var sliderOffset, arr;

                if (type === "init") {
                    slider.viewport = $('<div class="' + namespace + 'viewport"></div>').css({"overflow": "hidden", "position": "relative"}).appendTo(slider).append(slider.container);
                    // INFINITE LOOP:
                    slider.cloneCount = 0;
                    slider.cloneOffset = 0;
                    // REVERSE:
                    if (reverse) {
                        arr = $.makeArray(slider.slides).reverse();
                        slider.slides = $(arr);
                        slider.container.empty().append(slider.slides);
                    }
                }
                // INFINITE LOOP && !CAROUSEL:
                if (slider.vars.animationLoop && !carousel) {
                    slider.cloneCount = 2;
                    slider.cloneOffset = 1;
                    // clear out old clones
                    if (type !== "init") slider.container.find('.clone').remove();
                   // slider.container.append(slider.slides.first().clone().addClass('clone').attr('aria-hidden', 'true')).prepend(slider.slides.last().clone().addClass('clone').attr('aria-hidden', 'true'));
                    methods.uniqueID( slider.slides.first().clone().addClass('clone') ).appendTo( slider.container );
                    methods.uniqueID( slider.slides.last().clone().addClass('clone') ).prependTo( slider.container );
                }
                slider.newSlides = $(slider.vars.selector, slider);

                sliderOffset = (reverse) ? slider.count - 1 - slider.currentSlide + slider.cloneOffset : slider.currentSlide + slider.cloneOffset;
                // VERTICAL:
                if (vertical && !carousel) {
                    slider.container.height((slider.count + slider.cloneCount) * 200 + "%").css("position", "absolute").width("100%");
                    setTimeout(function(){
                        slider.newSlides.css({"display": "block"});
                        slider.doMath();
                        slider.viewport.height(slider.h);
                        slider.setProps(sliderOffset * slider.h, "init");
                    }, (type === "init") ? 100 : 0);
                } else {
                    slider.container.width((slider.count + slider.cloneCount) * 200 + "%");
                    slider.setProps(sliderOffset * slider.computedW, "init");
                    setTimeout(function(){
                        slider.doMath();
                        slider.newSlides.css({"width": slider.computedW, "float": "left", "display": "block"});
                        // SMOOTH HEIGHT:
                        if (slider.vars.smoothHeight) methods.smoothHeight();
                    }, (type === "init") ? 100 : 0);
                }
            } else { // FADE:
                slider.slides.css({"width": "100%", "float": "left", "marginRight": "-100%", "position": "relative"});
                if (type === "init") {
                    if (!touch) {
                        //slider.slides.eq(slider.currentSlide).fadeIn(slider.vars.animationSpeed, slider.vars.easing);
                        slider.slides.css({ "opacity": 0, "display": "block", "zIndex": 1 }).eq(slider.currentSlide).css({"zIndex": 2}).animate({"opacity": 1},slider.vars.animationSpeed,slider.vars.easing);
                    } else {
                        slider.slides.css({ "opacity": 0, "display": "block", "webkitTransition": "opacity " + slider.vars.animationSpeed / 1000 + "s ease", "zIndex": 1 }).eq(slider.currentSlide).css({ "opacity": 1, "zIndex": 2});
                    }
                }
                // SMOOTH HEIGHT:
                if (slider.vars.smoothHeight) methods.smoothHeight();
            }
            // !CAROUSEL:
            // CANDIDATE: active slide
            if (!carousel) slider.slides.removeClass(namespace + "active-slide").eq(slider.currentSlide).addClass(namespace + "active-slide");

            //FlexSlider: init() Callback
            slider.vars.init(slider);
        };

        slider.doMath = function() {
            var slide = slider.slides.first(),
                slideMargin = slider.vars.itemMargin,
                minItems = slider.vars.minItems,
                maxItems = slider.vars.maxItems;

            slider.w = (slider.viewport===undefined) ? slider.width() : slider.viewport.width();
            slider.h = slide.height();
            slider.boxPadding = slide.outerWidth() - slide.width();

            // CAROUSEL:
            if (carousel) {
                slider.itemT = slider.vars.itemWidth + slideMargin;
                slider.minW = (minItems) ? minItems * slider.itemT : slider.w;
                slider.maxW = (maxItems) ? (maxItems * slider.itemT) - slideMargin : slider.w;
                slider.itemW = (slider.minW > slider.w) ? (slider.w - (slideMargin * (minItems - 1)))/minItems :
                    (slider.maxW < slider.w) ? (slider.w - (slideMargin * (maxItems - 1)))/maxItems :
                        (slider.vars.itemWidth > slider.w) ? slider.w : slider.vars.itemWidth;

                slider.visible = Math.floor(slider.w/(slider.itemW));
                slider.move = (slider.vars.move > 0 && slider.vars.move < slider.visible ) ? slider.vars.move : slider.visible;
                slider.pagingCount = Math.ceil(((slider.count - slider.visible)/slider.move) + 1);
                slider.last =  slider.pagingCount - 1;
                slider.limit = (slider.pagingCount === 1) ? 0 :
                    (slider.vars.itemWidth > slider.w) ? (slider.itemW * (slider.count - 1)) + (slideMargin * (slider.count - 1)) : ((slider.itemW + slideMargin) * slider.count) - slider.w - slideMargin;
            } else {
                slider.itemW = slider.w;
                slider.pagingCount = slider.count;
                slider.last = slider.count - 1;
            }
            slider.computedW = slider.itemW - slider.boxPadding;
        };

        slider.update = function(pos, action) {
            slider.doMath();

            // update currentSlide and slider.animatingTo if necessary
            if (!carousel) {
                if (pos < slider.currentSlide) {
                    slider.currentSlide += 1;
                } else if (pos <= slider.currentSlide && pos !== 0) {
                    slider.currentSlide -= 1;
                }
                slider.animatingTo = slider.currentSlide;
            }

            // update controlNav
            if (slider.vars.controlNav && !slider.manualControls) {
                if ((action === "add" && !carousel) || slider.pagingCount > slider.controlNav.length) {
                    methods.controlNav.update("add");
                } else if ((action === "remove" && !carousel) || slider.pagingCount < slider.controlNav.length) {
                    if (carousel && slider.currentSlide > slider.last) {
                        slider.currentSlide -= 1;
                        slider.animatingTo -= 1;
                    }
                    methods.controlNav.update("remove", slider.last);
                }
            }
            // update directionNav
            if (slider.vars.directionNav) methods.directionNav.update();

        };

        slider.addSlide = function(obj, pos) {
            var $obj = $(obj);

            slider.count += 1;
            slider.last = slider.count - 1;

            // append new slide
            if (vertical && reverse) {
                (pos !== undefined) ? slider.slides.eq(slider.count - pos).after($obj) : slider.container.prepend($obj);
            } else {
                (pos !== undefined) ? slider.slides.eq(pos).before($obj) : slider.container.append($obj);
            }

            // update currentSlide, animatingTo, controlNav, and directionNav
            slider.update(pos, "add");

            // update slider.slides
            slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
            // re-setup the slider to accomdate new slide
            slider.setup();

            //FlexSlider: added() Callback
            slider.vars.added(slider);
        };
        slider.removeSlide = function(obj) {
            var pos = (isNaN(obj)) ? slider.slides.index($(obj)) : obj;

            // update count
            slider.count -= 1;
            slider.last = slider.count - 1;

            // remove slide
            if (isNaN(obj)) {
                $(obj, slider.slides).remove();
            } else {
                (vertical && reverse) ? slider.slides.eq(slider.last).remove() : slider.slides.eq(obj).remove();
            }

            // update currentSlide, animatingTo, controlNav, and directionNav
            slider.doMath();
            slider.update(pos, "remove");

            // update slider.slides
            slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
            // re-setup the slider to accomdate new slide
            slider.setup();

            // FlexSlider: removed() Callback
            slider.vars.removed(slider);
        };

        //FlexSlider: Initialize
        methods.init();
    };

    // Ensure the slider isn't focussed if the window loses focus.
    $( window ).blur( function ( e ) {
        focused = false;
    }).focus( function ( e ) {
        focused = true;
    });

    //FlexSlider: Default Settings
    $.flexslider.defaults = {
        namespace: "flex-",             //{NEW} String: Prefix string attached to the class of every element generated by the plugin
        selector: ".slides > li",       //{NEW} Selector: Must match a simple pattern. '{container} > {slide}' -- Ignore pattern at your own peril
        animation: "fade",              //String: Select your animation type, "fade" or "slide"
        easing: "swing",                //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
        direction: "horizontal",        //String: Select the sliding direction, "horizontal" or "vertical"
        reverse: false,                 //{NEW} Boolean: Reverse the animation direction
        animationLoop: true,            //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
        smoothHeight: false,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
        startAt: 0,                     //Integer: The slide that the slider should start on. Array notation (0 = first slide)
        slideshow: true,                //Boolean: Animate slider automatically
        slideshowSpeed: 7000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
        animationSpeed: 600,            //Integer: Set the speed of animations, in milliseconds
        initDelay: 0,                   //{NEW} Integer: Set an initialization delay, in milliseconds
        randomize: false,               //Boolean: Randomize slide order
        thumbCaptions: false,           //Boolean: Whether or not to put captions on thumbnails when using the "thumbnails" controlNav.

        // Usability features
        pauseOnAction: true,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
        pauseOnHover: false,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
        pauseInvisible: true,   		//{NEW} Boolean: Pause the slideshow when tab is invisible, resume when visible. Provides better UX, lower CPU usage.
        useCSS: true,                   //{NEW} Boolean: Slider will use CSS3 transitions if available
        touch: true,                    //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
        video: false,                   //{NEW} Boolean: If using video in the slider, will prevent CSS3 3D Transforms to avoid graphical glitches

        // Primary Controls
        controlNav: true,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
        directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
        prevText: "Previous",           //String: Set the text for the "previous" directionNav item
        nextText: "Next",               //String: Set the text for the "next" directionNav item

        // Secondary Navigation
        keyboard: true,                 //Boolean: Allow slider navigating via keyboard left/right keys
        multipleKeyboard: false,        //{NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
        mousewheel: false,              //{UPDATED} Boolean: Requires jquery.mousewheel.js (https://github.com/brandonaaron/jquery-mousewheel) - Allows slider navigating via mousewheel
        pausePlay: false,               //Boolean: Create pause/play dynamic element
        pauseText: "Pause",             //String: Set the text for the "pause" pausePlay item
        playText: "Play",               //String: Set the text for the "play" pausePlay item

        // Special properties
        controlsContainer: "",          //{UPDATED} jQuery Object/Selector: Declare which container the navigation elements should be appended too. Default container is the FlexSlider element. Example use would be $(".flexslider-container"). Property is ignored if given element is not found.
        manualControls: "",             //{UPDATED} jQuery Object/Selector: Declare custom control navigation. Examples would be $(".flex-control-nav li") or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
        sync: "",                       //{NEW} Selector: Mirror the actions performed on this slider with another slider. Use with care.
        asNavFor: "",                   //{NEW} Selector: Internal property exposed for turning the slider into a thumbnail navigation for another slider

        // Carousel Options
        itemWidth: 0,                   //{NEW} Integer: Box-model width of individual carousel items, including horizontal borders and padding.
        itemMargin: 0,                  //{NEW} Integer: Margin between carousel items.
        minItems: 1,                    //{NEW} Integer: Minimum number of carousel items that should be visible. Items will resize fluidly when below this.
        maxItems: 0,                    //{NEW} Integer: Maxmimum number of carousel items that should be visible. Items will resize fluidly when above this limit.
        move: 0,                        //{NEW} Integer: Number of carousel items that should move on animation. If 0, slider will move all visible items.
        allowOneSlide: true,           //{NEW} Boolean: Whether or not to allow a slider comprised of a single slide

        // Callback API
        start: function(){},            //Callback: function(slider) - Fires when the slider loads the first slide
        before: function(){},           //Callback: function(slider) - Fires asynchronously with each slider animation
        after: function(){},            //Callback: function(slider) - Fires after each slider animation completes
        end: function(){},              //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
        added: function(){},            //{NEW} Callback: function(slider) - Fires after a slide is added
        removed: function(){},           //{NEW} Callback: function(slider) - Fires after a slide is removed
        init: function() {}             //{NEW} Callback: function(slider) - Fires after the slider is initially setup
    };

    //FlexSlider: Plugin Function
    $.fn.flexslider = function(options) {
        if (options === undefined) options = {};

        if (typeof options === "object") {
            return this.each(function() {
                var $this = $(this),
                    selector = (options.selector) ? options.selector : ".slides > li",
                    $slides = $this.find(selector);

                if ( ( $slides.length === 1 && options.allowOneSlide === true ) || $slides.length === 0 ) {
                    $slides.fadeIn(400);
                    if (options.start) options.start($this);
                } else if ($this.data('flexslider') === undefined) {
                    new $.flexslider(this, options);
                }
            });
        } else {
            // Helper strings to quickly perform functions on the slider
            var $slider = $(this).data('flexslider');
            switch (options) {
                case "play": $slider.play(); break;
                case "pause": $slider.pause(); break;
                case "stop": $slider.stop(); break;
                case "next": $slider.flexAnimate($slider.getTarget("next"), true); break;
                case "prev":
                case "previous": $slider.flexAnimate($slider.getTarget("prev"), true); break;
                default: if (typeof options === "number") $slider.flexAnimate(options, true);
            }
        }
    };
})(jQuery);;/**
 *
 * @author Adrian Ramin
 *
 * @uses jQuery
 *
 */
asms.general.ece.widgets.slideshow = function ($) {
    var $endscreenFooter = null,
        $counter = null, // DOM: Counter
        $gallery = null, // self
        $items = null, // Elemente in der Galerie
        $prev = null, // DOM prev
        $next = null, // DOM prev
        $endElement = null, // DOM: Werbung
        $adElement = null, // DOM: Werbung
        $adReloadElement = null, // DOM: Ad-Reload
        $counterCurrent = null, // current position
        $zoomLayer = null,
        $slideshowWrapper = null,
        $inlineElement = null,
        loadedImageItems = {}, // Object holder for loaded items
        currentDescriptionHeight = 0,
        adCounter, // load ad after x clicks
        adReloadCounter, // reload ad after x clicks
        adClick, // click counter for ads
        adReload, // click counter for reloaded ads
        isAdLoaded = false, // flag for loaded ad status
        isAdVisible = false,
        areArrowsShrinked = false,
        isEndscreenVisible = false,
        isEndscreenLoaded = false;

    var _options = {
        pictureGalleryType: 'inlineElement',
        id: '',
        loaded: [1, 2, 3, 10], // vorgeladene Elemente
        toload: 4, // Wieviele Bilder vorwärts nachladen
        toloadBack: 1, // Wieviele Bilder rückwärts nachladen
        currentPosition: 1,
        puffer: 1, // Puffer bis zum Weiterladen
        lazyLoadUrl: '',
        endscreenURL: '',
        adCounter: 4, // Klicks bis Werbung
        adReload: 7, // Klicks zum Ad-Reload
        imageCount: 0,
        track: '',
        isZoomElement: false,
        channelName: '',
        minDescriptionHeight: {
            tenColumns: 50,
            sevenColumns: 69,
            inlineElement: 104
        },
        css: {
            classes: {
                content: '.content',
                galleryAd: '.galleryAd',
                endScreen: '.endScreen',
                slideshowItem: '.imagecontent',
                prevNextArrowShrinked: 'shrinked',
                zoomLayer: '.zoom-layer',
                slideshowWrapper: '.slideshow-wrapper',
                inlineElement: ''
            }
        }
    };

    function _isEndscreenAvailable() {
        return _options.endscreenURL !== '';
    }

    function _showPreviousSlide() {
        _setEndscreenFooterHeight();

        if (!isAdLoaded) { // Werbung nicht geladen?
            if (isAdVisible) {
                isAdVisible = false;
                adClick++;
            }
            if (_isEndscreenAvailable()) {
                if (isEndscreenVisible) { // wenn endscreen angezeigt wurde
                    _options.currentPosition = _options.imageCount; // Position auf letztes Element
                    isEndscreenVisible = false; // endscreen wieder verbergen
                } else {
                    if (!_getPositionOfPreviousItem()) { // Position 1?
                        isEndscreenVisible = true;
                    } else {
                        _options.currentPosition--;
                    }
                }
            } else {
                if (!_getPositionOfPreviousItem()) { // Position 1?
                    _options.currentPosition = _options.imageCount; // Position auf letztes Element
                } else {
                    _options.currentPosition--;
                }
            }

            var nextItemIndex = _options.currentPosition > 0 ? _options.currentPosition - _options.puffer : _options.imageCount - _options.puffer - 1; // Bei Position 1 auf max springen
            if (!loadedImageItems[nextItemIndex - 1]) {
                aLoad(0);
            }
        }
        _updateItem();
    }

    function _showNextSlide() {
        _setEndscreenFooterHeight();

        if (!isAdLoaded) { // Werbung nicht geladen?
            if (isAdVisible) {
                isAdVisible = false;
                adClick++;
            }
            if (_isEndscreenAvailable()) {
                if (isEndscreenVisible) { // wenn endscreen angezeigt wurde
                    _options.currentPosition = 1; // Position auf erstes Element
                    isEndscreenVisible = false; // endscreen wieder verbergen
                } else {
                    if (_options.imageCount == _options.currentPosition) { // Position Max?
                        isEndscreenVisible = true;
                    } else {
                        _options.currentPosition++;
                    }
                }
            } else {
                if (_options.imageCount == _options.currentPosition) { // Position Max?
                    _options.currentPosition = 1; // Position auf erstes Element
                } else {
                    _options.currentPosition++;
                }
            }

            var nextItemIndex = _options.currentPosition + _options.puffer;
            if (!loadedImageItems[nextItemIndex - 1]) {
                aLoad(1); // Nachladen Vorwärts
            }
        }
        _updateItem();
    }

    $.fn.actualHeight = function () {
        var thisHeight;

        this.addClass('temp-show');
        thisHeight = this.outerHeight();
        this.removeClass('temp-show');

        return thisHeight;
    };

    function _initializeDescriptionHeightOfAllImageItems(initialExecution) {
        if (undefined !== initialExecution && true === initialExecution && true === _options.isZoomElement) {
            setTimeout(function () {
                _setHeightOfAllDescriptionContainer();
            }, 500);
            return;
        }
        _setHeightOfAllDescriptionContainer();
    }

    function _setHeightOfAllDescriptionContainer() {
        currentDescriptionHeight = $(".item" + (_options.currentPosition) + " .description", $gallery).height();
        $(".imagecontent .description", $gallery).css('height', currentDescriptionHeight);
    }

    function _getMinDescriptionHeight() {
        if (_options.minDescriptionHeight[_options.pictureGalleryType]) {
            return _options.minDescriptionHeight[_options.pictureGalleryType];
        }
        return 0;
    }

    // needed for smooth collapsing/expanding feature
    function _updateDescriptionHeight() {
        var $currentDescriptionElement = $(".item" + (_options.currentPosition) + " .description", $gallery);
        var old_height = $currentDescriptionElement.height();
        $currentDescriptionElement.height("auto");
        var updatedItemDescriptionHeight = $currentDescriptionElement.height();
        $currentDescriptionElement.height(old_height);

        var minDescriptionHeight = _getMinDescriptionHeight();
        if (minDescriptionHeight > updatedItemDescriptionHeight) {
            updatedItemDescriptionHeight = minDescriptionHeight;
        }

        $currentDescriptionElement.velocity({
                height: updatedItemDescriptionHeight
            },
            {
                duration: 300,
                progress: function () {
                    _updateZoomLayerHeight();
                    $(document).trigger('de/welt/realignMarginalColumnFor10ColumnsArticleOpener');
                },
                complete: function () {
                    _initializeDescriptionHeightOfAllImageItems();
                    _moveAds();
                }
            });
    }

    function _initInlineElement() {
        if (null !== $inlineElement) {
            return;
        }
        $inlineElement = $(_options.css.classes.inlineElement);
    }

    function _initSlideshowWrapper() {
        $slideshowWrapper = $(_options.css.classes.zoomLayer + ' ' + _options.css.classes.slideshowWrapper);
    }

    function _updateZoomLayerHeight() {
        if (true === _options.isZoomElement) {
            _initInlineElement();
            _initSlideshowWrapper();

            var slideShowWrapperMarginTop = ($slideshowWrapper.length > 0) ? parseInt($slideshowWrapper.css('marginTop'), 10): 0;
            var inlineElementHeight = ($inlineElement.length > 0) ? $inlineElement.outerHeight(true): 0;
            var newZoomLayerHeight = inlineElementHeight + slideShowWrapperMarginTop;

            $zoomLayer.css('height', newZoomLayerHeight);
        }
    }

    function _moveAds() {
        $(document).trigger('de/welt/realignMarginalColumnForZoomedElements');
    }

    // set endscreen footer height to the same height as the last shown item
    function _setEndscreenFooterHeight() {
        if ('' === _options.endscreenURL) {
            return;
        }
        var lastShownItemHeight = $(".item" + (_options.currentPosition), $gallery).height();

        // -1 because of one pixel border
        var newEndscreenFooterHeight = lastShownItemHeight - $(".endScreen", $gallery).outerHeight(true) - 1;
        $endscreenFooter.css('height', newEndscreenFooterHeight);
    }

    // set advertisement footer height to the same height as the description of last shown item
    function _setGalleryAdFooterHeight() {
        var $lastShownDescription = $(".item" + (_options.currentPosition) + " .description", $gallery);
        if (0 === $lastShownDescription.length) {
            return;
        }

        // -1 because of one pixel border
        var lastShownItemDescriptionHeight = $lastShownDescription.outerHeight() - 1;
        $adElement.find('.footer').css('height', lastShownItemDescriptionHeight);
    }

    function _updateItem() {
        $endscreenFooter.hide();

        $(".header", $gallery).not(".secondHeader").show(); // unschönes ein und ausblenden der header
        $(".secondHeader", $gallery).hide(); // unschönes ein und ausblenden der header
        // Aktualisieren der Anzeige
        $(_options.css.classes.slideshowItem, $gallery).hide(); // Alle Elemente ausblenden
        $(".item" + (_options.currentPosition), $gallery).show(); // Nächstes Element anzeigen

        _updateDescriptionHeight();

        if (_options.css.classes.slideshowItem === ".imagecontent") {
            $("meta[property='og:image']").attr("content", $("img", ".item" + _options.currentPosition).attr("src"));
        }
        $($counterCurrent).html(_options.currentPosition); // Position im Counter setzen
        if (isAdLoaded) { // Werbung geladen und noch nicht angezeigt?
            _showAd(); // Werbung anzeigen
            return;
        } else {
            _extendArrowWidth();

            if (typeof(getCounters) != "undefined") {
                getCounters(_options.track);
            }
            $($counter).show();

            if (adCounter) {
                adClick--;
                if (adClick === 0) {
                    _loadAd();
                }
            }

            if (adReloadCounter) {
                if (!adReload--) {
                    // Werbeschnippsel tauschen
                    adReload = adReloadCounter;
                    $adReloadElement.find("iframe").load(function () { // Wenn iFrame geladen
                        if (el = document.getElementById("ad2")) {
                            el.innerHTML = $adReloadElement.find("iframe").contents().find("#bannerAd").html();
                            $(el).show();
                        }
                        if (el = document.getElementById("ad3")) {
                            el.innerHTML = $adReloadElement.find("iframe").contents().find("#scyscraperAd").html();
                            $(el).show();
                        }
                        if (el = document.getElementById("banner_1")) {
                            el.innerHTML = $adReloadElement.find("iframe").contents().find("#rectangleAd").html();
                            $(el).show();
                        }
                    }).attr("src", "/adReload.html?r=" + _options.channelName + "&id=" + _options.id + "&s=" + (new Date().getTime())); // Werbequelle setzen
                }
            }
        }

        _showEndScreen();
    }

    function _loadAd() {
        $adElement.find("iframe").load(function () {
            isAdLoaded = true;
        }).attr("src", "/adGallery.html?r=" + _options.channelName + "&id=" + _options.id + "&s=" + (new Date().getTime())); // set ad src
    }

    function _showEndScreen() {
        if (false === isEndscreenVisible) {
            return;
        }
        // load endscreen
        if (!isEndscreenLoaded) {
            $.ajax({
                url: _options.endscreenURL,
                dataType: "html",
                success: function (data) {
                    $(".endScreen", $gallery).html(data);
                    _addCssClassesToEndScreenItems();
                    isEndscreenLoaded = true;
                }
            });
        }

        $(_options.css.classes.slideshowItem, $gallery).hide(); // Alle Elemente ausblenden
        $($counter).hide(); // Counter ausblenden
        $adElement.hide(); // Werbung verstecken
        isAdVisible = true;
        isAdLoaded = false; // Indikator wieder auf false -> weitere Werbung ermöglichen
        adClick = adCounter; // Zähler zurücksetzen

        _shrinkArrowWidth();
        $(".endScreen", $gallery).show(); // Zeige Endscreen an
        $endscreenFooter.show();
    }

    function _addCssClassesToEndScreenItems() {
        var $endScreenItems = $('.endScreen', $gallery).find('.widget.slideshow');

        // add css classes only if there are two items
        if (2 !== $endScreenItems.length) {
            return;
        }
        var classNameMap = ['first', 'second'];
        $.each($endScreenItems, function (index) {
            $(this).addClass(classNameMap[index]);
        });
    }

    function _shrinkArrowWidth() {
        if (true === areArrowsShrinked) {
            return;
        }
        $prev.addClass(_options.css.classes.prevNextArrowShrinked);
        $next.addClass(_options.css.classes.prevNextArrowShrinked);

        areArrowsShrinked = true;
    }

    function _extendArrowWidth() {
        if (false === areArrowsShrinked) {
            return;
        }
        $prev.removeClass(_options.css.classes.prevNextArrowShrinked);
        $next.removeClass(_options.css.classes.prevNextArrowShrinked);

        areArrowsShrinked = false;
    }

    function _showAd() {
        _setGalleryAdFooterHeight();
        _shrinkArrowWidth();
        $(_options.css.classes.slideshowItem, $gallery).hide(); // Alle Elemente ausblenden
        $counter.hide(); // Counter ausblenden
        $adElement.show(); // Werbung anzeigen
        $endElement.hide(); // Endscreen anzeigen
        isAdVisible = true;
        isAdLoaded = false; // Indikator wieder auf false -> weitere Werbung ermöglichen
        adClick = adCounter; // Zähler zurücksetzen
    }

    function _getPositionOfNextItem() {
        return _options.currentPosition + 1;
    }

    function _getPositionOfPreviousItem() {
        return _options.currentPosition - 1;
    }

    function _getPropertiesCount(dataObject) {
        var propertiesCount = 0;
        for (var prop in dataObject) {
            if (dataObject.hasOwnProperty(prop)) {
                propertiesCount++;
            }
        }
        return propertiesCount;
    }

    function aLoad(direction) { // Inhalt nachladen
        if (_getPropertiesCount(loadedImageItems) >= _options.imageCount) {
            return;
        }

        var tmpPos = _options.currentPosition;
        var itemsToLoadCount = 0;

        // direction 0: backward, direction 1: forward
        if (direction === 1) {
            itemsToLoadCount = Math.min(_options.toload, _options.imageCount - _getPositionOfNextItem());

            $.ajax({
                type: 'POST',
                url: _options.lazyLoadUrl,
                dataType: "html",
                data: "index=" + (_getPositionOfNextItem()) + "&count=" + itemsToLoadCount,
                success: function (data) {
                    var l = 0;
                    $(data).filter("div").each(function () {
                        if (!loadedImageItems[tmpPos + l]) {
                            $(".item" + (tmpPos + l), $gallery).after(this);
                            loadedImageItems[tmpPos + l] = true;
                            l++;
                        }
                    });
                }
            });
        } else {
            itemsToLoadCount = Math.min(_options.toloadBack, _getPositionOfPreviousItem());

            $.ajax({
                type: 'POST',
                url: _options.lazyLoadUrl,
                dataType: "html",
                data: "index=" + _getPositionOfPreviousItem() + "&count=-" + itemsToLoadCount,
                success: function (data) {
                    var l = -1;

                    $(data).filter("div").each(function () {
                        if (!loadedImageItems[tmpPos + l - 1]) {
                            l--;
                            $(".item" + tmpPos, $gallery).before(this);
                            loadedImageItems[tmpPos + l] = true;
                        }
                    });
                }
            });
        }
    }

    function _addNextPrevClickListeners() {
        // prevent text selection
        $next.mousedown(function (e) {
            e.preventDefault();
        });

        $next.click(function (event) {
            event.preventDefault();

            _showNextSlide();
        });

        $prev.click(function (event) {
            event.preventDefault();

            _showPreviousSlide();
        });
    }

    function _addNextPrevTouchListeners() {
        if (typeof($.fn.touchwipe) !== 'function') {
            return;
        }

        $(_options.css.classes.content, $gallery).touchwipe({
            wipeLeft: function (e) {
                e.preventDefault();
                _showNextSlide();
            },
            wipeRight: function (e) {
                e.preventDefault();
                _showPreviousSlide();
            },
            min_move_x: 20,
            min_move_y: 20,
            preventDefaultEvents: false
        });
    }

    function _removeSlideshowContainer() {
        $gallery.remove();
    }

    function _setPictureGalleryType() {
        if ($gallery.hasClass('grid_10')) {
            _options.pictureGalleryType = 'tenColumns';
        } else if ($gallery.hasClass('grid_7')) {
            _options.pictureGalleryType = 'sevenColumns';
        }
    }

    /**
     * Return methods
     */
    return {
        init: function (newOptions) {
            // extend options
            $.extend(true, _options, newOptions || {});

            asms.general.ece.widgets.marginalAlignment.registerMarginalColumnRealignHandlerForZoomedElements();

            $gallery = $(_options.elementId);
            if (!$gallery) {
                return false;
            }

            $zoomLayer = $gallery.closest(_options.css.classes.zoomLayer);

            _setPictureGalleryType();

            $items = $(_options.css.classes.slideshowItem, $gallery).not(_options.css.classes.endScreen, $gallery).not(_options.css.classes.galleryAd, $gallery);
            if ($items.length === 0) {
                // no items found -> remove slideshow container
                _removeSlideshowContainer();
                return false;
            }

            $next = $('.next', $gallery);
            $prev = $('.prev', $gallery);
            $counter = $(".zaehler", $gallery);
            $counterCurrent = $(".current", $gallery);
            $endscreenFooter = $(".endscreen-footer", $gallery);
            $adElement = $(_options.css.classes.galleryAd, $gallery);
            $endElement = $(_options.css.classes.endScreen, $gallery);
            $adReloadElement = $(".galleryAdReload", $gallery);

            for (var i = 0, itemsLoadedLength = _options.loaded.length; i < itemsLoadedLength; i++) {
                loadedImageItems[_options.loaded[i] - 1] = true;
            }

            adCounter = _options.adCounter - 1; // Werbungslogik aktivieren, Klickanzahl setzen
            adClick = adCounter; // Klickanzahl setzen
            adReload = _options.adReload - 1;
            adReloadCounter = adReload;

            _initializeDescriptionHeightOfAllImageItems(true);
            _addNextPrevTouchListeners();
            _addNextPrevClickListeners();
        }
    };
};;/**
 *
 * @author Adrian Ramin
 *
 * @uses jQuery
 *
 */
asms.general.ece.widgets.videoplayer = asms.general.ece.widgets.videoplayer || {};
asms.general.ece.widgets.videoplayer.EmbedConfigurator = function ($) {
    var $videoContainer,
        $embedLayer;

    var _options = {
        embedType: 'frontpageVideo',
        defaultSelector: '.embedLayerContainer',
        embedButtonSelector: '.embed',
        closeButtonSelector: '.embedClose',
        videoWidgetSelector: '.as_videoplayer',
        videoPlayerWidthInputSelector: '.videoplayerWidth',
        videoPlayerHeightInputSelector: '.videoplayerHeight',
        parameterSuffix: '&noredirect=true',
        videoPlayerId: '',
        heightCalculation: {
            heightMultiplier: 0.540476,
            pixelsToAdd: 98.6905
        },
        video: {
            videoId: null,
            videoUrl: '',
            configName: 'iframe'
        },
        embedLayer: {
            fadeDuration: 500,
            height: 0,
            errorText: {
                visible: false,
                height: 31
            },
            initialized: false,
            visible: false
        },
        player: {
            defaultWidth: 640,
            defaultHeight: 445,
            minWidth: 300,
            textColor: 'default',
            backgroundColor: 'default',
            autoplay: false,
            currentState: {
                width: 0,
                height: 0,
                iframeCode: '',
                resumeVideoOnClose: false,
                initializeVideoOnClose: false,
                addPlayingCssClassOnClose: false
            }
        },
        errorMessages: {
            undershot: 'Der Player darf die Breite von 300 Pixel nicht unterschreiten.'
        },
        events: {
            marginalColumnRealignFor10ColumnsVideoOpener: 'de/welt/realignMarginalColumnFor10ColumnsArticleOpener'
        },
        easing: {
            mode: 'easeOut'
        }
    };

    function _registerEmbedButtonListener() {
        $videoContainer.find(_options.embedButtonSelector).on('click', function () {
            if (!_options.embedLayer.initialized) {
                _initDefaultDimensions();
                _setIframeCode();
                _initInputListeners();
            }

            if (!_options.embedLayer.visible) {
                _showEmbedLayer();
            } else {
                _closeEmbedLayer();
            }

            if (!_options.embedLayer.initialized) {
                // vertical align embed layer
                $embedLayer.children('div').eq(0).verticalAlign();
                _options.embedLayer.initialized = true;
            }
        });
    }

    function _registerCloseButtonListener() {
        $videoContainer.find(_options.closeButtonSelector).on('click', function () {
            _closeEmbedLayer();
        });
    }

    function _realignMarginalColumn() {
        if (_options.embedType !== 'articlePageVideo') {
            return;
        }
        $(document).trigger(_options.events.marginalColumnRealignFor10ColumnsVideoOpener);

        if (_options.video.videoId) {
            var zoomElement = _getZoomElementForVideoId(_options.video.videoId);
            if(null === zoomElement) {
                return;
            }
            zoomElement.adjustZoomLayer();
        }
    }

    function _getZoomElementForVideoId() {
        if (typeof asms.general.ece.widgets.inlineZoomElement !== undefined &&
            asms.general.ece.widgets.inlineZoomElement[_options.video.videoId] !== undefined) {
            return asms.general.ece.widgets.inlineZoomElement[_options.video.videoId];
        }
        return null;
    }

    function _showEmbedLayerOnFrontpage() {
        $embedLayer.fadeIn();
        _options.embedLayer.visible = true;
        _pauseVideoAndShowPreviewImage();
    }

    function _closeEmbedLayerOnFrontpage() {
        $embedLayer.fadeOut();
        _options.embedLayer.visible = false;
        _resumeVideo();
    }

    function _showEmbedLayerOnArticlePage() {
        $embedLayer.show();
        if (0 === _options.embedLayer.height) {
            _options.embedLayer.height = $embedLayer.actualHeight();
        }
        $embedLayer.css('height', 0);

        _fadeInEmbedLayer();
        _realignMarginalColumn();

        _options.embedLayer.visible = true;
    }

    function _closeEmbedLayerOnArticlePage() {
        _fadeOutEmbedLayer();
        _realignMarginalColumn();
        _options.embedLayer.visible = false;
    }

    function _showEmbedLayer() {
        if (_options.embedType === 'frontpageVideo') {
            _showEmbedLayerOnFrontpage();
        } else if (_options.embedType === 'articlePageVideo') {
            _showEmbedLayerOnArticlePage();
        }
    }

    function _fadeInEmbedLayer() {
        $embedLayer.velocity({
            marginBottom: 16
        }, {
            easing: _options.easing.mode,
            queue: false,
            duration: _options.embedLayer.fadeDuration
        });

        var heightToAdd = (true === _options.embedLayer.errorText.visible) ? _options.embedLayer.errorText.height : 0;
        $embedLayer.velocity({
            height: (_options.embedLayer.height + heightToAdd)
        }, {
            easing: _options.easing.mode,
            queue: false,
            duration: _options.embedLayer.fadeDuration,
            progress: function () {
                _realignMarginalColumn();
            }
        });
    }

    function _fadeOutEmbedLayer() {
        $embedLayer.velocity({
            marginBottom: 0
        }, {
            easing: _options.easing.mode,
            queue: false,
            duration: _options.embedLayer.fadeDuration
        });

        $embedLayer.velocity({
            height: 0
        }, {
            easing: _options.easing.mode,
            queue: false,
            duration: _options.embedLayer.fadeDuration,
            progress: function () {
                _realignMarginalColumn();
            },
            complete: function () {
                $embedLayer.hide();
            }
        });
    }

    function _closeEmbedLayer() {
        if (_options.embedType === 'frontpageVideo') {
            _closeEmbedLayerOnFrontpage();
        } else if (_options.embedType === 'articlePageVideo') {
            _closeEmbedLayerOnArticlePage();
        }
    }

    function _pauseVideoAndShowPreviewImage() {
        var $videoPlayer = $('#' + _options.videoPlayerId);
        if (true === $videoPlayer.hasClass('initialized')) {
            $videoContainer.find('object').addClass('hideObject');
            $videoPlayer.removeClass('initialized');
            _options.player.currentState.initializeVideoOnClose = true;
        }
        if (true === $videoPlayer.hasClass('playing')) {
            if (true === com.xoz.videoplayer.isPlaying(_options.videoPlayerId)) {
                com.xoz.videoplayer.pause(_options.videoPlayerId);
                _options.player.currentState.resumeVideoOnClose = true;
            }
            $videoPlayer.removeClass('playing');
            _options.player.currentState.addPlayingCssClassOnClose = true;
        }
    }

    function _resumeVideo() {
        var $videoPlayer = $('#' + _options.videoPlayerId);
        if (true === _options.player.currentState.initializeVideoOnClose) {
            $videoContainer.find('object').removeClass('hideObject');
            $videoPlayer.addClass('initialized');
        }
        if (true === _options.player.currentState.addPlayingCssClassOnClose) {
            $videoPlayer.addClass('playing');
            _options.player.currentState.addPlayingCssClassOnClose = false;
        }
        if (true === _options.player.currentState.resumeVideoOnClose) {
            com.xoz.videoplayer.resume(_options.videoPlayerId);
            _options.player.currentState.resumeVideoOnClose = false;
        }
    }

    function _setIframeCode() {
        var backgroundColor = _options.player.backgroundColor !== 'default' ? '&b=' + _options.player.backgroundColor : '';
        var textColor = _options.player.textColor !== 'default' ? '&t=' + _options.player.textColor : '';

        var replacements = {'%VIDEO_URL%': _options.video.videoUrl,
                '%CONFIG_NAME%': _options.video.configName,
                '%AUTOPLAY%': _options.player.autoplay + '',
                '%BACKGROUNDCOLOR%': backgroundColor,
                '%TEXTCOLOR%': textColor,
                '%WIDTH%': _options.player.currentState.width,
                '%HEIGHT%': _options.player.currentState.height
            },
            iframeCode = '<iframe src="%VIDEO_URL%?config=%CONFIG_NAME%&a=%AUTOPLAY%%BACKGROUNDCOLOR%%TEXTCOLOR%' + _options.parameterSuffix + '" width="%WIDTH%" height="%HEIGHT%" scrolling="no" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" frameborder="0" style="max-width:100%;"></iframe>';

        iframeCode = iframeCode.replace(/%\w+%/g, function (placeHolder) {
            return replacements[placeHolder];
        });

        _options.player.currentState.iframeCode = iframeCode;

        var $textArea = $embedLayer.find('textarea');
        $textArea.val(iframeCode);
    }

    function _initDefaultDimensions() {
        _options.player.currentState.width = _options.player.defaultWidth;
        _options.player.currentState.height = _options.player.defaultHeight;

        var $widthInput = $embedLayer.find(_options.videoPlayerWidthInputSelector);
        $widthInput.val(_options.player.defaultWidth);

        var $heightInput = $embedLayer.find(_options.videoPlayerHeightInputSelector);
        $heightInput.val(_options.player.defaultHeight);
    }

    function _initInputListeners() {
        var $videoPlayerWidthInput,
            $videoPlayerHeightInput,
            $videoPlayerEnvironmentSelect,
            $autoplayInput;

        $videoPlayerWidthInput = $embedLayer.find(_options.videoPlayerWidthInputSelector);
        $videoPlayerHeightInput = $embedLayer.find(_options.videoPlayerHeightInputSelector);
        $videoPlayerEnvironmentSelect = $embedLayer.find('select[name=embedEnvironment]');
        $autoplayInput = $embedLayer.find('.embedAutoplay input:checkbox');

        $videoPlayerWidthInput.on('keyup', function (event) {
            if (true === _pressedKeyIsNumber(event)) {
                _onWidthInputChange(false);
            }
        });

        $videoPlayerWidthInput.change(function () {
            _onWidthInputChange(true);
        });

        $videoPlayerWidthInput.focusout(function () {
            _onWidthInputChange(true);
        });

        $videoPlayerHeightInput.on('keyup', function (event) {
            if (true === _pressedKeyIsNumber(event)) {
                _onHeightInputChange(false);
            }
        });

        $videoPlayerHeightInput.focusout(function () {
            _onHeightInputChange(true);
        });

        $videoPlayerHeightInput.change(function () {
            _onHeightInputChange(true);
        });

        // register change handler for environment selectbox (only in preview mode)
        if (0 < $videoPlayerEnvironmentSelect.length) {
            $videoPlayerEnvironmentSelect.change(function () {
                _options.video.configName = $(this).val();
                _setIframeCode();
            });
        }

        $autoplayInput.change(function () {
            _options.player.autoplay = $(this).is(':checked');
            _setIframeCode();
        });
    }

    function _onHeightInputChange(showErrorMessage) {
        _calculateAndSetWidthAfterNewHeightInput(showErrorMessage);
        _setIframeCode();
    }

    function _onWidthInputChange(showErrorMessage) {
        _calculateAndSetHeightAfterNewWidthInput(showErrorMessage);
        _setIframeCode();
    }

    function _showErrorContainerWithText(showContainer, text) {
        var $errorContainer = $embedLayer.find('.embedErrorMessage');

        if (text && 0 < text.length) {
            $errorContainer.html(text);
        }

        if (true === showContainer) {
            _showErrorContainer($errorContainer);
        } else {
            _hideErrorContainer($errorContainer);
        }
    }

    function _showErrorContainer($errorContainer) {
        if (_options.embedType === 'frontpageVideo') {
            _showErrorContainerOnFrontpage($errorContainer);
        } else if (_options.embedType === 'articlePageVideo') {
            _showErrorContainerOnArticlePage($errorContainer);
        }
    }

    function _hideErrorContainer($errorContainer) {
        if (_options.embedType === 'frontpageVideo') {
            _hideErrorContainerOnFrontpage($errorContainer);
        } else if (_options.embedType === 'articlePageVideo') {
            _hideErrorContainerOnArticlePage();
        }
    }

    function _showErrorContainerOnFrontpage($errorContainer) {
        $errorContainer.show();
    }

    function _showErrorContainerOnArticlePage($errorContainer) {
        $errorContainer.show();
        $embedLayer.stop().velocity({
            height: (_options.embedLayer.height + _options.embedLayer.errorText.height)
        }, {
            easing: _options.easing.mode,
            queue: false,
            duration: _options.embedLayer.fadeDuration,
            progress: function () {
                _realignMarginalColumn();
            },
            complete: function () {
                _options.embedLayer.errorText.visible = true;
            }
        });
    }

    function _hideErrorContainerOnFrontpage($errorContainer) {
        $errorContainer.hide();
    }

    function _hideErrorContainerOnArticlePage() {
        $embedLayer.stop().velocity({
            height: _options.embedLayer.height
        }, {
            easing: _options.easing.mode,
            queue: false,
            duration: _options.embedLayer.fadeDuration,
            progress: function () {
                _realignMarginalColumn();
            },
            complete: function () {
                _options.embedLayer.errorText.visible = false;
            }
        });
    }

    function _calculateAndSetWidthAfterNewHeightInput(showErrorMessage) {
        _showErrorContainerWithText(false);

        var $heightInput = $embedLayer.find(_options.videoPlayerHeightInputSelector);
        var height = $heightInput.val();

        // inserted value is not a number
        if (!_isNumber(height)) {
            return;
        }

        var width = Math.ceil((height - _options.heightCalculation.pixelsToAdd) / _options.heightCalculation.heightMultiplier);

        var newDimensionsAreOk = _validateNewDimensions({width: width, height: height}, showErrorMessage);
        if (newDimensionsAreOk) {
            _options.player.currentState.width = width;
            _options.player.currentState.height = height;
        }

        var $widthInput = $embedLayer.find(_options.videoPlayerWidthInputSelector);
        $widthInput.val(width);
    }

    function _calculateAndSetHeightAfterNewWidthInput(showErrorMessage) {
        _showErrorContainerWithText(false);

        var $widthInput = $embedLayer.find(_options.videoPlayerWidthInputSelector);
        var width = $widthInput.val();

        // inserted value is not a number
        if (!_isNumber(width)) {
            return;
        }

        var height = Math.ceil(_options.heightCalculation.heightMultiplier * width + _options.heightCalculation.pixelsToAdd);

        var newDimensionsAreOk = _validateNewDimensions({width: width, height: height}, showErrorMessage);
        if (newDimensionsAreOk) {
            _options.player.currentState.width = width;
            _options.player.currentState.height = height;
        }

        var $heightInput = $embedLayer.find(_options.videoPlayerHeightInputSelector);
        $heightInput.val(height);
    }

    function _showRedBorderedInputFields(showRedBorders) {
        var $widthInput = $embedLayer.find(_options.videoPlayerWidthInputSelector);
        var $heightInput = $embedLayer.find(_options.videoPlayerHeightInputSelector);

        if (showRedBorders) {
            $widthInput.addClass('redBorder');
            $heightInput.addClass('redBorder');
        } else {
            $widthInput.removeClass('redBorder');
            $heightInput.removeClass('redBorder');
        }
    }

    function _validateNewDimensions(newDimensions, showErrorMessage) {
        if (newDimensions.width < _options.player.minWidth) {
            if (showErrorMessage) {
                _showRedBorderedInputFields(true);
                _showErrorContainerWithText(true, _options.errorMessages.undershot);
            }
            return false;
        }

        _showRedBorderedInputFields(false);
        return true;
    }

    // helper methods
    $.fn.verticalAlign = function () {
        return this.css("margin-top", ($(this).parent().outerHeight() - $(this).outerHeight()) / 2 + 'px');
    };

    function _isNumber(num) {
        return 0 < num.length && !isNaN(num);
    }

    function _pressedKeyIsNumber(keyUpEvent) {
        var pressedKey = String.fromCharCode(keyUpEvent.keyCode);
        return _isNumber($.trim(pressedKey));
    }

    /**
     * Return methods
     */
    return {
        init: function (newOptions) {
            // extend options
            $.extend(true, _options, newOptions || {});

            $videoContainer = $('#' + _options.videoPlayerId).closest(_options.videoWidgetSelector);
            $embedLayer = $videoContainer.find(_options.defaultSelector);

            _registerEmbedButtonListener();
            _registerCloseButtonListener();
        }

    };
};;/**
 *
 * @author Adrian Ramin
 *
 * @uses jQuery
 *
 */
asms.general.ece.widgets.marginalAlignment = function ($) {
    var $adContainers = null,
        $marginalColumn = null,
        isEventHandlerRegistered = {
            marginalColumnRealignHandlerFor10ColumnsArticleOpener: false,
            marginalColumnRealignHandlerFor10ColumnsFrontpageOpener: false,
            marginalColumnRealignHandler: false
        };

    var _options = {
        marginHeight: 20,
        events: {
            marginalRealignArticleOpenerEvent: 'de/welt/realignMarginalColumnFor10ColumnsArticleOpener',
            marginalRealignFrontpageOpenerEvent: 'de/welt/realignMarginalColumnFor10ColumnsFrontpageOpener',
            marginalRealignZoomedElementEvent: 'de/welt/realignMarginalColumnForZoomedElements'
        },
        css: {
            classes: {
                marginalColumn: '.marginal, .column-3',
                tenColumnsArticleOpener: '.widget.articleElementXXL',
                tenColumnsFrontpageOpener: '.teaser-XXL-Image',
                zoomContainer: '.zoom-layer'
            },
            ids: {
            }
        }
    };


    /**
     * public functions
     */

    function registerMarginalColumnRealignHandlerFor10ColumnsFrontpageOpener() {
        $(document).off(_options.events.marginalRealignFrontpageOpenerEvent);
        $(document).on(_options.events.marginalRealignFrontpageOpenerEvent, function () {
            _alignMarginalColumnForXXLFrontpageTeaser();
        });
    }

    function registerMarginalColumnRealignHandlerFor10ColumnsArticleOpener() {
        $(document).off(_options.events.marginalRealignArticleOpenerEvent);
        $(document).on(_options.events.marginalRealignArticleOpenerEvent, function () {
            _realignMarginalColumnFor10ColumnsArticleOpener();
        });
    }

    function registerMarginalColumnRealignHandlerForZoomedElements() {
        if (true === isEventHandlerRegistered.marginalColumnRealignHandler) {
            return;
        }
        isEventHandlerRegistered.marginalColumnRealignHandler = true;

        $(document).on(_options.events.marginalRealignZoomedElementEvent, function () {
            _realignMarginalColumnForZoomedElements();
        });

        _initAdContainers();
    }

    function _initMarginalColumn() {
        if (null !== $marginalColumn) {
            return;
        }
        $marginalColumn = $(_options.css.classes.marginalColumn);
    }

    /**
     * private functions
     */

    function _alignMarginalColumnForXXLFrontpageTeaser() {
        var $frontpageTeaserContainer = $(_options.css.classes.tenColumnsFrontpageOpener);
        if ($frontpageTeaserContainer.length !== 1) {
            return;
        }

        var contentHeight = $frontpageTeaserContainer.find('.content').height();
        var imageHeight = $frontpageTeaserContainer.find('.tsrImg').height();

        if (contentHeight && imageHeight) {
            var marginTop = imageHeight - contentHeight - 5;
            var cssBlock = _getMarginTopCssBlock(marginTop);
            $frontpageTeaserContainer.append(cssBlock);
        }
    }

    function _realignMarginalColumnFor10ColumnsArticleOpener() {
        var $articleOpenerContainer = $(_options.css.classes.tenColumnsArticleOpener);
        var $marginalColumn = $(_options.css.classes.marginalColumn);
        if ($articleOpenerContainer.length !== 1) {
            return;
        }

        var teaserContainerHeight = $articleOpenerContainer.outerHeight(true);
        if (teaserContainerHeight) {
            if (0 === $marginalColumn.length) {
                var cssBlock = _getMarginTopCssBlock(teaserContainerHeight);
                $articleOpenerContainer.append(cssBlock);
            } else {
                $marginalColumn.css('marginTop', teaserContainerHeight);
            }
        }
    }

    function _initAdContainers() {
        if (null !== $adContainers) {
            return;
        }
        $(function () {
            _initMarginalColumn();

            $adContainers = $marginalColumn.children('div').filter(function () {
                this.originMarginTop = parseInt($(this).css('margin-top'), 10);
                return $(this).height() > 0;
            });
        });
    }

    function _removeStyleFromAdContainers() {
        $adContainers.removeAttr('style');
    }

    function _realignMarginalColumnForZoomedElements() {
        var $openZoomElements = $(_options.css.classes.zoomContainer).filter(function () {
            return this.clientHeight > 0;
        });

        if (0 === $openZoomElements.length) {
            _removeStyleFromAdContainers();
            return;
        }

        var marginalColumnMarginTop = parseInt($marginalColumn.css('marginTop'), 10);

        $adContainers.each(function (count) {
            var $ad = $(this);

            var tmpStyle = $ad.attr('style');
            $ad.attr('style', '');
            var adPosTop = $ad.position().top;
            $ad.attr('style', tmpStyle);

            var adHeight = $ad.height();
            var newMarginTop = this.originMarginTop;
            var additionalMargin = count === 0 ? _options.marginHeight : 2 * _options.marginHeight;

            $openZoomElements.each(function () {
                var layer = this;
                var layerBottom = layer.offsetTop + layer.clientHeight + marginalColumnMarginTop;
                var layerTop = layer.offsetTop + marginalColumnMarginTop;
                var adVisibleTop = adPosTop + newMarginTop + marginalColumnMarginTop;
                var adVisibleBottom = adVisibleTop + adHeight + marginalColumnMarginTop;

                var affected = (adVisibleTop >= layerTop && adVisibleTop <= layerBottom) ||
                    (adVisibleBottom >= layerTop && adVisibleBottom <= layerBottom) ||
                    (adVisibleBottom <= layerTop && adVisibleBottom >= layerBottom);

                if (affected) {
                    newMarginTop += layerBottom - adVisibleTop + additionalMargin - marginalColumnMarginTop;
                }
            });

            $ad.attr('style', 'margin-top:' + newMarginTop + 'px!important');
        });
    }

    function _getMarginTopCssBlock(marginTop) {
        return '<style>' + _options.css.classes.marginalColumn + ' { margin-top: ' + marginTop + 'px; }</style>';
    }

    /**
     * Return methods
     */
    return {
        init: function (newOptions) {
            // extend options
            $.extend(true, _options, newOptions || {});

        },
        registerMarginalColumnRealignHandlerFor10ColumnsArticleOpener: registerMarginalColumnRealignHandlerFor10ColumnsArticleOpener,
        registerMarginalColumnRealignHandlerFor10ColumnsFrontpageOpener: registerMarginalColumnRealignHandlerFor10ColumnsFrontpageOpener,
        registerMarginalColumnRealignHandlerForZoomedElements: registerMarginalColumnRealignHandlerForZoomedElements
    };
}(asms.jQuery());
;/**
 *
 * @author Adrian Ramin
 * @author Igor Savchenko
 *
 * @uses jQuery
 *
 * @description: Soft zooming of inline elements, opener or closer. Applicable for images, video, Biga
 * See: OA-4381, OA-4760
 *
 */
asms.general.ece.widgets.inlineZoomElement = [];

asms.general.ece.widgets.inlineZoom = function ($) {
    var $inlineTeaserContainer,
        $inlineLayerContainer,
        $inlineLayerContent,
        $stickySidebar;

    var _options = {
        ajaxUrl: '',
        imageTitle: '',
        elementId: null,
        heightOfInlineElement: null,
        zoomDurationInMs: 500,
        teaserFadeInDurationInMs: 1000,
        teaserFadeOutDurationInMs: 300,
        marginHeight: 20,
        closeButtonPauseVideo: false,
        css: {
            classes: {
                zoomLink: 'a.overlay.fullsize',
                inlineElementContainerSelector: '',
                zoomContainer: 'zoom-layer',
                closeButton: '.close-btn',
                imageTitle: '.caption',
                imageCredit: '.credit',
                articleHead: '.articleHeader',
                marginalColumn: '.marginal',
                zooming: 'zooming',
                teaserImageContainer: '.tsrImg'
            },
            ids: {
                stickySidebar: '#stickySidebar'
            }
        },
        flags: {
            teaserContainerZoomHandlerRegistered: false,
            isZoomLayerVisible: false,
            zoomLayerClickHandlerRegistered: false
        }
    };

    function _disableClickOnTeaserContainer() {
        $inlineTeaserContainer.on('click', function (e) {
            if (false === _options.flags.teaserContainerZoomHandlerRegistered) {
                e.preventDefault();
                return false;
            }
        });
    }

    function _initStickySidebar() {
        $stickySidebar = $(_options.css.ids.stickySidebar);
    }

    function _init() {
        $inlineTeaserContainer = $(_options.css.classes.inlineElementContainerSelector);

        _initStickySidebar();

        _disableClickOnTeaserContainer();

        $(function () {
            _registerTeaserContainerClickHandler();
        });
    }

    function _registerTeaserContainerClickHandler() {
        $(document).on('click', _options.css.classes.inlineElementContainerSelector + ' ' + _options.css.classes.zoomLink, function (event) {
            _hideOrShowZoomLayer();

            event.stopPropagation();
            return false;
        });
        _options.flags.teaserContainerZoomHandlerRegistered = true;
    }

    // used by 4-columns slideshow/video teaser and by inline teasers
    function registerSmallTeaserContainerClickHandler() {
        $(function () {
            $inlineTeaserContainer.find(_options.css.classes.teaserImageContainer).click(function (event) {
                _hideOrShowZoomLayer();

                event.stopPropagation();
                return false;
            });
            _options.flags.teaserContainerZoomHandlerRegistered = true;
        });
        return this;
    }

    function _hideOrShowZoomLayer() {
        _createInlineAjaxContainer();
        _getLayerContentViaAjax();

        if (false === _options.flags.isZoomLayerVisible && $inlineLayerContent && $inlineLayerContent.length > 0) {
            _showZoomLayer();
            _changeArticleHead(false);
            return;
        }
        _hideZoomLayer();
        _changeArticleHead(true);
    }

    function _createInlineAjaxContainer() {
        if ($inlineLayerContainer && 0 < $inlineLayerContainer.length) {
            return;
        }
        $inlineTeaserContainer.before('<div class="' + _options.css.classes.zoomContainer + ' id-' + _options.elementId + '">INLINE LAYER</div>');
        $inlineLayerContainer = $('.' + _options.css.classes.zoomContainer + '.id-' + _options.elementId);
    }

    function _getLayerContentViaAjax() {
        if ($inlineLayerContent && $inlineLayerContent.length > 0 || _options.ajaxUrl === '') {
            return;
        }

        $.ajax({
            url: _options.ajaxUrl,
            dataType: "html",
            async: false,
            success: function (data) {
                $inlineLayerContainer.html(data);
                var $title = $inlineLayerContainer.find(_options.css.classes.imageTitle);
                $title.insertBefore($inlineLayerContainer.find(_options.css.classes.imageCredit));
                $title.html(_options.imageTitle);
                $inlineLayerContent = $(data);
            },
            error: function () {
                //_hideMarginalColumn(false);
            }
        });
    }

    function adjustZoomLayer() {
        var tmpHeight = parseInt($inlineLayerContainer.css('height'), 10);
        $inlineLayerContainer.css('height', 'auto');
        _options.heightOfInlineElement = $inlineLayerContainer.actualHeight();
        $inlineLayerContainer.css('height', tmpHeight);

        $inlineLayerContainer.animate({
            height: _options.heightOfInlineElement,
            marginBottom: 20
        }, 0, function () {
            _moveAds();
        });
    }

    function _showZoomLayer() {
        if (0 < $stickySidebar.length) {
            $stickySidebar.addClass('hide');
        }

        //_hideMarginalColumn(true);
        $inlineLayerContainer.show();

        // get height of inline element container
        if (null === _options.heightOfInlineElement) {
            _options.heightOfInlineElement = $inlineLayerContainer.actualHeight();
            $inlineLayerContainer.css({
                display: 'block',
                height: 0
            });
        }

        $inlineTeaserContainer.fadeOut(_options.teaserFadeOutDurationInMs);

        // add css style z-index=100 to overlap right marginal column.
        // add temporarily only, otherwise facebook popup in article opener will be overlaped.
        $inlineLayerContainer.addClass(_options.css.classes.zooming);

        var offsetY = $inlineLayerContainer.offset().top;
        var moveToY = offsetY - ($(window).height() - _options.heightOfInlineElement) / 2;

        _scrollToInlineLayer(moveToY);

        $inlineLayerContainer.animate({
            height: _options.heightOfInlineElement,
            marginBottom: 20
        }, _options.zoomDurationInMs, function () {
            //_hideMarginalColumn(false);
            $inlineLayerContainer.removeClass(_options.css.classes.zooming);
            _moveAds();
            _addCloseButtonHandler();
        });
        _options.flags.isZoomLayerVisible = true;
    }

    function _scrollToInlineLayer(moveToY) {
        var $htmlBody = $('html, body');

        if ($htmlBody.scrollTop() === moveToY) {
            return;
        }
        // using animate instead of velocity because of ie 11 bug (multiple velocity calls causing flickering behavior)
        $htmlBody.animate(
            { scrollTop: moveToY }, _options.zoomDurationInMs
        );
    }

    function _hideZoomLayer() {
        if (0 < $stickySidebar.length && _countOpenZoomElements() === 1) {
            $stickySidebar.removeClass('hide');
        }

        _removeCloseButtonHandler();

        // save last height (e.g. for changed slideshow pictures with different heights)
        _options.heightOfInlineElement = $inlineLayerContainer.actualHeight();

        $inlineTeaserContainer.fadeIn(_options.teaserFadeInDurationInMs);

        $inlineLayerContainer.animate({
            height: 0,
            marginBottom: 0
        }, _options.zoomDurationInMs, function () {
            _moveAds();
            $inlineLayerContainer.hide();
        });

        _options.flags.isZoomLayerVisible = false;
    }

    function _moveAds() {
        $(document).trigger('de/welt/realignMarginalColumnForZoomedElements');
    }

    // fix for first inline Element, that it fit close to header of article (without margin)
    function _changeArticleHead(addMargin) {
        var $head = $(_options.css.classes.articleHead);
        if ($head.length === 0 || $inlineLayerContainer.length === 0 || $inlineLayerContainer.position().top !== 0) {
            return;
        }
        var margin = addMargin ? '20px' : '1px';
        $head.animate({
            marginBottom: margin
        }, _options.zoomDurationInMs);
    }

    function _removeCloseButtonHandler() {
        if (false === _options.flags.zoomLayerClickHandlerRegistered) {
            return;
        }
        $inlineLayerContainer.find(_options.css.classes.closeButton).off('click');
        _options.flags.zoomLayerClickHandlerRegistered = false;
    }

    function _addCloseButtonHandler() {
        if (true === _options.flags.zoomLayerClickHandlerRegistered) {
            return;
        }
        $inlineLayerContainer.find(_options.css.classes.closeButton).click(function (event) {
            _hideOrShowZoomLayer();

            if (_options.closeButtonPauseVideo) {
                VideoPlayer.getObjectByVideoId(_options.elementId).pausePlayer();
            }

            event.stopPropagation();
            return false;
        });
        _options.flags.zoomLayerClickHandlerRegistered = true;
    }

    function _countOpenZoomElements() {
        return $('.' + _options.css.classes.zoomContainer + ':visible').length;
    }

    // helper methods
    $.fn.actualHeight = function () {
        var thisHeight;
        var style;

        this.addClass('temp-show');
        style = this.attr('style');
        this.removeAttr('style');
        thisHeight = this.outerHeight();
        this.attr('style', style);
        this.removeClass('temp-show');

        return thisHeight;
    };

    /**
     * Return methods
     */
    return {
        init: function (newOptions) {
            // extend options
            $.extend(true, _options, newOptions || {});

            asms.general.ece.widgets.marginalAlignment.registerMarginalColumnRealignHandlerForZoomedElements();

            _init();

            asms.general.ece.widgets.inlineZoomElement[newOptions.elementId] = this;

            return this;
        },
        registerSmallTeaserContainerClickHandler: registerSmallTeaserContainerClickHandler,
        adjustZoomLayer: adjustZoomLayer
    };
};
;
asms = asms || {};

asms.base64Tools = (function() {
	var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
	function int2char(n) {
		return BI_RM.charAt(n);
	}

	var b64mapurl = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

	// convert a base64 url save string to hex
	function b64urltohex(s) {
		var ret = ""
		var i;
		var k = 0; // b64 state, 0-3
		var slop;
		for (i = 0; i < s.length; ++i) {
			v = b64mapurl.indexOf(s.charAt(i));
			if (v < 0)
				continue;
			if (k == 0) {
				ret += int2char(v >> 2);
				slop = v & 3;
				k = 1;
			} else if (k == 1) {
				ret += int2char((slop << 2) | (v >> 4));
				slop = v & 0xf;
				k = 2;
			} else if (k == 2) {
				ret += int2char(slop);
				ret += int2char(v >> 2);
				slop = v & 3;
				k = 3;
			} else {
				ret += int2char((slop << 2) | (v >> 4));
				ret += int2char(v & 0xf);
				k = 0;
			}
		}
		if (k == 1)
			ret += int2char(slop << 2);
		return ret;
	}

	// Convert hex to byte array
	function hexToBA(h) {
		var i;
		var a = new Array();
		for (i = 0; 2 * i < h.length; ++i) {
			a[i] = parseInt(h.substring(2 * i, 2 * i + 2), 16);
		}
		return a;
	}

	function _b64urltoBA(s) {
		// piggyback on b64tohex for now, optimize later
		return hexToBA(b64urltohex(s));
	}

	function _decode(dotNetBytes) {
		var result = "";
		var i = 0;
		var c = c1 = c2 = 0;

		// Perform byte-order check.
		if (dotNetBytes.length >= 3) {
			if ((dotNetBytes[0] & 0xef) == 0xef
					&& (dotNetBytes[1] & 0xbb) == 0xbb
					&& (dotNetBytes[2] & 0xbf) == 0xbf) {
				// Hmm byte stream has a BOM at the start, we'll skip this.
				i = 3;
			}
		}

		while (i < dotNetBytes.length) {
			c = dotNetBytes[i] & 0xff;

			if (c < 128) {
				result += String.fromCharCode(c);
				i++;
			} else if ((c > 191) && (c < 224)) {
				if (i + 1 >= dotNetBytes.length)
					throw "Un-expected encoding error, UTF-8 stream truncated, or incorrect";
				c2 = dotNetBytes[i + 1] & 0xff;
				result += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				if (i + 2 >= dotNetBytes.length || i + 1 >= dotNetBytes.length)
					throw "Un-expected encoding error, UTF-8 stream truncated, or incorrect";
				c2 = dotNetBytes[i + 1] & 0xff;
				c3 = dotNetBytes[i + 2] & 0xff;
				result += String.fromCharCode(((c & 15) << 12)
						| ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return result;
	}

	var obj = {
		decode : function(s) {
			return _decode(s);
		},
		b64urltoBA : function(s) {
			return _b64urltoBA(s);
		},
		decodeB64Url : function(str) {
			return _decode(_b64urltoBA(str));
		}
	};

	return obj;

})();;/**
 * Created by fgerard on 18.03.2015.
 *
 * handle tracking OptOut part
 *
 * mobile equivalent /httpd/htdocs/www.welt.de/skins/responsive/js/asi/trackingtools.js
 */

asms = asms || {};
asms.trackingtools = (function () {

    var OPTOUT_COOKIENAME = "_troo"; // trackingOptOut

    function setCookie(cname, cvalue, expDate, domain) {
        var expires = typeof(expDate) !== "undefined" ? "expires=" + expDate.toUTCString() + ";" : "";
        var domain = typeof(domain) !== "undefined" ? "domain=" + domain + ";" : "";
        document.cookie = cname + "=" + cvalue + ";path=/;" + expires + domain;
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function _addOptOut(ooIdentifier, domain) {
        var curVal = getCookie(OPTOUT_COOKIENAME);
        if (curVal.indexOf(ooIdentifier) === -1) {
            setCookie(OPTOUT_COOKIENAME, curVal + ooIdentifier + ",", new Date(2030, 1, 1), domain);
        }
    }

    function _hasOptOut(ooIdentifier) {
        return getCookie(OPTOUT_COOKIENAME).indexOf(ooIdentifier) !== -1;
    }

    return {
        addOptOut: _addOptOut,
        hasOptOut: _hasOptOut
    };
})();
;/* 
 * Declare the class used by widget-asms-ad 
 */
function WidgetAsmsAd(constructorArg) {
    var that = this;

    this.member = constructorArg;

    this.exampleMethod = function(arg) {
        $(arg).click(function() {
           that.member = something;
        });
    };
}

asms = asms || {};
asms.ad = (function(adModule, $) {
  var callbackHandler = {

  };

  function onViewport(settings, deferred) {
    $(function() {
      $('#' + settings.adId).waypoint(function() {
        deferred.resolve(settings.sas);
      }, {
        offset: settings.offset,
        triggerOnce: true
      });
    });
  }

  adModule.load = function(options) {
    var defaultOptions = {
        on: 'parse',
        offset: '110%',
        sas: {
          async: false
        }
      },
      settings = $.extend(true, {}, defaultOptions, options),
      deferred = $.Deferred();

    if (settings.on === 'viewport') {
      settings.sas.async = true; // flag for calling an extra smartAd call
      onViewport(settings, deferred);
    } else {
      // async flag is false. ad is already displayed.
      deferred.resolve(settings.sas); // load immediate
    }

    return deferred.promise();
  };

  adModule.addCallbackHandler = function(formatId, callback) {
    callbackHandler['' + formatId] = callback;
  };

  adModule.doCallback = function(calledSmartAd) {
    var smartAdCallback = callbackHandler['' + calledSmartAd.id];
    if ($.isFunction(smartAdCallback)) {
      smartAdCallback(calledSmartAd);
    }
  };
 
 // if targetgroup (abo_user (true), non-abo-user (false)) matches with user state, ad will be injected 
 adModule.injectIfTargetgroupMatches = function(isForPayingUser, adContent){
	 	if (isForPayingUser == bpIsPayingUser()) {
	 		try {
	 			var adXhtml = asms.base64Tools.decodeB64Url(adContent);
	 			document.write(adXhtml);
	 		} catch (e) {
	 			if(typeof(console) != "undefined" ){
	 				console.warn("adinjection failed:"+e);
	 			}
	 		}
	 	}
 }; 
  

  return adModule;
})(asms.ad || {}, window.jQuery);;/* function to read the user paying state */
function bpIsPayingUser(){
	
	if(typeof window.bigpIsPayingUser == 'undefined'){window.bigpIsPayingUser=document.cookie.indexOf('bpa=1')!=-1;}
	return window.bigpIsPayingUser==true;
	
}

/**
 * warn: this way is just possible until big is loaded sync
 * need userid/ any questions? ask: fgerard, fschaefe
 * @returns the userid
 */
function bpGetSSOUserId(){
	
	var userId = null;	
	
	window['bigpUserEvents'] = window['bigpUserEvents'] || [];
	window['bigpUserEvents'].push(['listen','userstate-loggedIn',function(eventData){
		if(eventData != null && eventData.data != null && eventData.data.id != null && eventData.data.id.length>0){
			userId = eventData.data.id;
		}
	}]);
	
	return userId;
}


/**
  * 
 * warn: this way is just possible until big is loaded sync
 * need userid/promos any questions? ask: fgerard, fschaefe
 * 
 * @returns the userdata
 * id -> id
 * promotions -> list of promotion commaseparated
 */
function bpGetUserData(){
	
	var userdata = {};	
	
	window['bigpUserEvents'] = window['bigpUserEvents'] || [];
	window['bigpUserEvents'].push(['listen','userstate-loggedIn',function(eventData){
		if(eventData != null && eventData.data != null){
		    if(eventData.data.id != null && eventData.data.id.length>0){
			userdata["id"] = eventData.data.id;			
		    }
		    if(eventData.data.p != null && eventData.data.p.length>0){
			userdata["promotions"] = eventData.data.p;			
		    }		
		}
	}]);
	
	return userdata;
};/**
 *
 * @author Adrian Ramin
 *
 * @uses jQuery
 *
 */
asms.general.ece.widgets.background = function ($, wt) {
    var $backgroundElement = null;

    var _options = {
        animation: {
            slideDuration: 200
        },
        css: {
            classes: {
                backgroundContainer: '.widget.background.storyBodyCenter',
                backgroundItem: '.background-item',
                arrow: '.background-item-arrow',
                content: '.background-item-content',
                arrowUp: 'icon-arrow1_up',
                arrowDown: 'icon-arrow1_down',
                open: 'open'
            },
            ids: {
                backgroundContainer: ''
            }
        },
        webtrekk: {
            sendInfo: '_art_hintergrundmodul_openclose'
        }
    };


    function _initAccordion() {
        $backgroundElement.find('.background-item-header').click(function () {
            var $backgroundItem = $(this).closest(_options.css.classes.backgroundItem);

            var $arrowOfBackgroundItem = $backgroundItem.find(_options.css.classes.arrow);
            var $allArrowItems = $(_options.css.classes.backgroundContainer).find($(_options.css.classes.backgroundItem).find(_options.css.classes.arrow));

            var isOpened = $backgroundItem.hasClass(_options.css.classes.open);
            var $openedItem = $($backgroundItem).closest(_options.css.classes.backgroundContainer).find('.' + _options.css.classes.open);

            if (false === isOpened && 0 < $openedItem.length) {
                $openedItem.find(_options.css.classes.content).slideUp(_options.animation.slideDuration);
                $openedItem.removeClass(_options.css.classes.open);
                $allArrowItems.removeClass(_options.css.classes.arrowUp).addClass(_options.css.classes.arrowDown);
            }

            $arrowOfBackgroundItem.toggleClass(_options.css.classes.arrowDown + ' ' + _options.css.classes.arrowUp);
            $($backgroundItem).toggleClass(_options.css.classes.open);
            $($backgroundItem).find(_options.css.classes.content).slideToggle(_options.animation.slideDuration);
            _sendWebtrekkInfo();
        });
    }

    function _sendWebtrekkInfo() {
        if (typeof wt !== 'undefined' && 'function' === typeof wt.sendinfo) {
            wt.sendinfo({linkId: _options.webtrekk.sendInfo});
        }
    }

    function _initBackgroundElement() {
        $backgroundElement = $(_options.css.ids.backgroundContainer);
    }

    /**
     * Return methods
     */
    return {
        init: function (newOptions) {
            // extend options
            $.extend(true, _options, newOptions || {});

            _initBackgroundElement();
            _initAccordion();
        }
    };
};;/**
 *
 * @author Igor Savchenko
 * @author Adrian Ramin
 *
 * @uses jQuery
 *
 */

asms.general.ece.widgets.geolocation = (function ($, window, document, undefined) {
    var _options = {
        debug: false,
        cities: {},
        forcedGeolocation: '',
        clientIp: '',
        forcedIP: '',
        ajax: {
          ajaxTimeoutInMs: 10 * 1000, // in ms
          geoServiceUrl: '',
          localStageServiceUrl: ''
        },
        cookie: {
          cookieName: 'localRegion',
          defaultRegionValue: 'default',
          updateAfterTimeInMs: 5 * 1000, // in ms
          expireTimeInYears: 10 // in years (how long the browser will hold the cookie)
        },
        animation: {
          slideDownDuration: 1500,
          opacityDuration: 1500
        }
    };

    var localRegion = '',
        cities = [],
        ipToLocalRegionServiceProcessing = false,
        longitude = '',
        latitude = '';

    function getLongitude() {
        return longitude;
    }

    function getLatitude() {
        return latitude;
    }

    function getDataFromCookieAsJson() {
      var cookieData = null;

      // try to parse cookie json-data and convert it to js object
      try {
        cookieData = $.parseJSON(readDataFromFromCookie());
      } catch(exception) {
        // malformed json string: use cookieData = null instead
      }
      return cookieData;
    }

    function setLocalRegion(cookieData) {
      if(null !== cookieData) {
        localRegion = cookieData.region;
        longitude = cookieData.longitude;
        latitude = cookieData.latitude;
        return;
      }
      localRegion = _options.cookie.defaultRegionValue;
    }

    function createOrUpdateCookie() {
      var cookieData = getDataFromCookieAsJson();

      // use forced geolocation
      if (0 < _options.forcedGeolocation.length) {
        log('use forced geolocation: ' + _options.forcedGeolocation);

        setLocalRegion({region: _options.forcedGeolocation});
        createCookie(false);
        return;
      }

      // use forced ip
      if (0 < _options.forcedIP.length) {
        log('use forced ip: ' + _options.forcedIP);

        getLocalRegionByIp();
        return;
      }

      // cookie data available -> get region from cookie
      if(null !== cookieData) {
        log('cookie data available');

        setLocalRegion(cookieData);

        // update cookie
        updateCookie();

      } else
      { // cookie data not existing -> get region from webservice
        log('no cookie data available');

        getLocalRegionByIp();
      }
    }

    // update cookie if update time has exceeded or if last ajax call was erroneous
    function updateCookie() {
      var cookieData = getDataFromCookieAsJson();
      if(null !== cookieData) {
        // calculate the difference in milliseconds
        var dateDifferenceInMs = cookieData.updateDate - (new Date()).getTime();

        if(dateDifferenceInMs <= 0 || false === cookieData.ajaxCallSuccessful) {
          log('cookie expired or last ajax call was erroneous -> update cookie');
          getLocalRegionByIp();
        }
      }
    }

    function getLocalRegionByIp() {
      ipToLocalRegionServiceProcessing = true;

      log('get region by ip (forced ip: ' +_options.forcedIP);

      var geoServiceUrlWithOrWithoutIp = (0 < _options.forcedIP.length) ? _options.ajax.geoServiceUrl + '' + _options.forcedIP:  _options.ajax.geoServiceUrl;

      log('get region by ip (ajax call to: ' + geoServiceUrlWithOrWithoutIp + ')');

      var ajaxCallSuccessful = false;

      $.ajax({
        url: geoServiceUrlWithOrWithoutIp,
        async: true,
        timeout: _options.ajax.ajaxTimeout,
        dataType: 'json',
        cache: false,
        success: function(data) {
          longitude = data.longitude;
          latitude = data.latitude;
          localRegion = getRegionIdByLatitudeAndLongitude(data.latitude, data.longitude);
          ajaxCallSuccessful = true;
        },
        error: function(jqXHR, textStatus, errorThrown) {
          localRegion = _options.cookie.defaultRegionValue;

          log('ajax error:');
          log(textStatus);
          log(errorThrown);
        },
        complete: function() {
          createCookie(ajaxCallSuccessful);
          ipToLocalRegionServiceProcessing = false;
        }
      });
    }

    function getLocalStageFromWebserviceByRegion(werbserviceUrl, supportedCities, stageContainerSelector) {
      // check if getLocalRegionByIp-ajax-call is processing
      if(true === ipToLocalRegionServiceProcessing) {
        setTimeout(function() {
          getLocalStageFromWebserviceByRegion(werbserviceUrl, supportedCities, stageContainerSelector);
        }, 50); // wait 50 ms then recheck
        return;
      }

      // set local region if not done already
      if(0 === localRegion.length) {
        var cookieData = getDataFromCookieAsJson();
        setLocalRegion(cookieData);
      }

      // set forced region if necessary
      localRegion = (0 < _options.forcedGeolocation.length) ? _options.forcedGeolocation: localRegion;

      // region is not supported
      if(!inList(localRegion, supportedCities)) {
        log("region is not supported: don't make an ajax call");
        return;
      }

      log('get local stage by region (ajax call to: '  + werbserviceUrl + '_' + localRegion + ')');

      $.ajax({
        url: werbserviceUrl + '_' + localRegion,
        async: true,
        timeout: _options.ajax.ajaxTimeout,
        dataType: 'html',
        success: function(htmlData) {
          log('data received -> render it into page');

          // render html response
          putIntoPage(htmlData, stageContainerSelector);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          log('ajax error:');
          log(textStatus);
          log(errorThrown);
        }
      });
    }

    // create value of cookie
    function createCookie(ajaxCallSuccessful) {
        // ie8 polyfill
        if (!Date.now) {
            Date.now = function () {
                return new Date().getTime();
            };
        }

        var updateDate = Date.now();
        updateDate += _options.cookie.updateAfterTimeInMs;
        updateDate = new Date(updateDate);

        ajaxCallSuccessful = (0 < _options.forcedGeolocation.length || 0 < _options.forcedIP.length) ? false: ajaxCallSuccessful;

        var cookieValue = '{"region":"' + localRegion + '", "longitude":' + longitude + ', "latitude":' + latitude +
          ', "updateDate":' + updateDate.getTime() + ', "ajaxCallSuccessful":' + ajaxCallSuccessful + '}';

        writeCookie(cookieValue);

        log('created cookie: ' + cookieValue);
    }

    // write cookie: elapsed time must be given in minutes
    function writeCookie(value, elapsedTime) {
        var date = new Date();
        var expires;

        // if elapsed time was set use it
        if (elapsedTime) {
          date.setTime(date.getTime() + ((120 - elapsedTime) * 6000)); // (120 - elapsed time) * 60 seconds * 1000 ms
        } else
        { // set elapsed time to 10 years
          date.setFullYear(date.getFullYear() + _options.cookie.expireTimeInYears);
        }
        expires = "; expires=" + date.toGMTString();
        document.cookie = _options.cookie.cookieName + "=" + value + expires + "; path=/";
    }

    // reads value of cookie
    function readDataFromFromCookie() {
      var nameCookie = _options.cookie.cookieName + "="; // set name of cookie
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) { // loop for each value of cookie
            var cookie = cookies[i];
            while (cookie.charAt(0) == ' ') {
              cookie = cookie.substring(1, cookie.length);
            }
            // found cookie, return its value
            if (cookie.indexOf(nameCookie) === 0) {
              return cookie.substring(nameCookie.length, cookie.length);
            }
        }
        return null;
    }


    /**
     * Geo Functionality: Retrieve region from latitude and longitude
     */

    // Point Class
    function Point(x, y) {
      this.x = x;
      this.y = y;
    }

    // City Class
    function City(id, name, topLeftLatitude, topLefLongitude, bottomRightLatitude, bottomRightLongitude) {
      var self = this;

      self.id = id;
      self.name = name;
      // get latitude and longitude as float values
      self.topLeftLatitude = parseFloat(topLeftLatitude.replace(',', '.'));
      self.topLefLongitude = parseFloat(topLefLongitude.replace(',', '.'));
      self.bottomRightLatitude = parseFloat(bottomRightLatitude.replace(',', '.'));
      self.bottomRightLongitude = parseFloat(bottomRightLongitude.replace(',', '.'));

      self.getTopLeftPoint = getTopLeftPoint;
      self.getBottomRightPoint = getBottomRightPoint;

      function getTopLeftPoint() {
        return new Point(self.topLefLongitude, self.topLeftLatitude);
      }

      function getBottomRightPoint() {
        return new Point(self.bottomRightLongitude, self.bottomRightLatitude);
      }
    }

    // build city objects
    function createCityObjects() {
      log('created city objects:');

      $.each(_options.cities, function(key, value) {
        var cityValuesSplitted = value.split('/');
        if(5 === cityValuesSplitted.length) {
          var tmpCity = new City(key, cityValuesSplitted[0], cityValuesSplitted[1], cityValuesSplitted[2], cityValuesSplitted[3], cityValuesSplitted[4]);
          cities.push(tmpCity);
        }
      });

      log(cities);
    }

    // find region id for users coordinates
    function getRegionIdByLatitudeAndLongitude(latitude, longitude) {
      var regionId = _options.cookie.defaultRegionValue;
      var point = new Point(longitude, latitude);

      $.each(cities, function(i, city) {
        if( isPointWithinSquare(point, city.getTopLeftPoint(), city.getBottomRightPoint()) ) {
          regionId = city.id;
          return false; // break loop
        }
      });

      log('found city id: ' + regionId);

      return regionId;
    }

    // Latitude = y, Longitude = x
    function isPointWithinSquare(point, topLeftPoint, bottomRightPoint) {
      if(topLeftPoint.y >= point.y && bottomRightPoint.y <= point.y &&
          topLeftPoint.x <= point.x && bottomRightPoint.x >= point.x) {
        return true;
      }
      return false;
    }


    /**
     * Helper methods
     */
    function log(output) {
      if(true === _options.debug) {
        console.log(output);
      }
    }

    // slide html element into page
    function putIntoPage(html, selector) {
      var $htmlElement = $(selector);

      // stop if html selector does not exist or html response seems to be a complete html document
      if(0 === $htmlElement.length || html.indexOf("<html") >= 0) {
        return false;
      }

      $htmlElement.html(html);
      $htmlElement.slideDown({duration: _options.animation.slideDownDuration},{queue: false});
      $htmlElement.animate({'opacity': 1},{queue: false, duration: _options.animation.opacityDuration});

      if(typeof asms.general.ece.widgets.tracking != 'undefined' && typeof asms.general.ece.widgets.tracking === 'object') {
          // track all links within submenu teaser
          asms.general.ece.widgets.tracking.webtrekkLinkTrack($htmlElement);
          // bind tracking if it will be visible
          asms.general.ece.widgets.tracking.watchElement($htmlElement);
      }
    }

    // check if a string is in a comma separated list
    // e.g.: searched item = "test" and list = "firstItem, test, thirdItem" would return true
    function inList(searchedItem, list) {
      var listItems = list.split(',');

      var i = listItems.length;
      while(i--) {
          if (listItems[i] === searchedItem) {
              return true;
          }
      }
      return false;
    }

    /**
     * Return methods
     */
    var methods = {
        init: function (newOptions) {
            // extend options
            jQuery.extend(true, _options, newOptions || {});

            createCityObjects();
            createOrUpdateCookie();
        },
        getLongitude: getLongitude,
        getLatitude: getLatitude,
        getLocalStageFromWebserviceByRegion: getLocalStageFromWebserviceByRegion
    };

    return methods;
})(asms.jQuery(), window, document);
;/**
 *
 * @author Igor Savchenko
 * @author Adrian Ramin
 *
 * @uses jQuery
 *
 */
asms.general.ece.widgets.liveticker = (function ($, window, document, undefined) {

    var _$liveTickerContainer,
        _$pinItemsContainer,
        _$pinItemsBodyContainer,
        _$eventItemsContainer,
        _$refreshContainer,
        _eventItemsMustacheTemplate,
        _pinItemsMustacheTemplate,
        _eventItemsData,
        _pinItemsData,
        _$eventItemsOnPage,
        _$pinItemsOnPage,
        _intervalID;

    var DATE_HELPER = {
        GER: {
            WEEK: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
            MONTH: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
        },
        ENG: {
            WEEK: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            MONTH: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }
    };

    var _options = {
        css: {
            classes: {
                pinItemsContainerSelector: '.pinItems',
                pinItemsBodySelector: '.pinItems .pinBody',
                eventItemsContainerSelector: '.eventItems',
                eventItemSelector: '.cilEventItem',
                refreshContainerSelector: '.cilRefreshContainer',
                editableContentSelector: '.cilEditableContent'
            },
            ids: {
                eventItemsTemplateId: '#templateEventItems',
                pintItemsTemplateId: '#templatePinItems'
            }
        },
        liveTickerSelector: '',
        ajaxUrl: '',
        automaticUpdate: true,
        updateIntervalTimeInMs: 8000,
        minimumRefreshContainerDisplayTimeInMs: 500,
        maxItemsToCheckAfterUpdate: 15
    };

    function _getJSON(callback) {
        if (_options.ajaxUrl !== '') {
            $.ajax({
                url: _options.ajaxUrl,
                dataType: "json",
                success: function (data) {
                    _render(data);
                    executeCallback(callback);
                },
                error: function () {
                    executeCallback(callback);
                }
            });
        }
    }

    function executeCallback(callback) {
        if (typeof callback !== 'undefined' && callback.startTimeInMs !== 'undefined' && typeof callback.callbackFunction === 'function') {
            var timeToExecutionInMs = _options.minimumRefreshContainerDisplayTimeInMs - (new Date().getTime() - callback.startTimeInMs);

            if (timeToExecutionInMs <= 0) {
                callback.callbackFunction();
                return;
            }

            setTimeout(function () {
                executeCallback(callback);
            }, timeToExecutionInMs);
        }
    }

    function _render(json) {
        _eventItemsData = (json.eventdata && json.eventdata.data && json.eventdata.data.event_items) ? json.eventdata.data.event_items : [];
        _pinItemsData = (json.pinlist && json.pinlist.data) ? json.pinlist.data : [];

        _setEventItemsOnPage();
        _setPinItemsOnPage();

        // crud for pinned items
        _deleteChangedPinItems();
        _addNewPinItems();
        _deleteAndSortPinItems();
        _showOrHidePinItemContainer();

        // crud for event items
        _deleteChangedEventItems();
        _addNewEventItems();
        _addDateLine();
        _showOrHideEventItemContainer();
    }

    function _showOrHidePinItemContainer() {
        if (0 < _$pinItemsOnPage.length) {
            _$pinItemsContainer.removeClass('hide');
        } else {
            _$pinItemsContainer.addClass('hide');
        }
    }

    function _showOrHideEventItemContainer() {
        if (0 < _$eventItemsOnPage.length) {
            _$eventItemsContainer.removeClass('hide');
        } else {
            _$eventItemsContainer.addClass('hide');
        }
    }

    function _setPinItemsOnPage() {
        _$pinItemsOnPage = _$pinItemsBodyContainer.find(_options.css.classes.eventItemSelector);
    }

    function _setEventItemsOnPage() {
        _$eventItemsOnPage = _$eventItemsContainer.find(_options.css.classes.eventItemSelector);
    }

    function _deleteAndSortPinItems() {
        _setPinItemsOnPage();

        $.each(_$pinItemsOnPage, function (index, $item) {
            var pinIdOfExistingItem = $item.getAttribute("data-id");
            var newPinIndex = _getPinIndexOfItem(pinIdOfExistingItem);
            var oldPinIndex = _$pinItemsOnPage.index($item);

            // delete item
            if (newPinIndex === -1) {
                $item.remove();

                _setPinItemsOnPage();
                _deleteAndSortPinItems();
                return false;
            }

            // sort item
            if (oldPinIndex !== newPinIndex) {
                if (newPinIndex === 0) {
                    $(_options.css.classes.pinItemsBodySelector).prepend($item);
                } else if (newPinIndex === _$pinItemsOnPage.length) {
                    $(_options.css.classes.pinItemsBodySelector + ' > div:eq(' + _$pinItemsOnPage.length + ')').before($item);
                } else {
                    $(_options.css.classes.pinItemsBodySelector).append($item);
                }

                _setPinItemsOnPage();
                _deleteAndSortPinItems();
                return false;
            }
        });
    }

    function _getPinIndexOfItem(pinId) {
        var pinIndex = -1;
        $.each(_pinItemsData, function (index, item) {
            if (pinId === item.pin_id) {
                pinIndex = parseInt(item.pin_order, 10) - 1;
                return false;
            }
        });
        return pinIndex;
    }

    function _deleteChangedPinItems() {
        for (var i = 0, len = _$pinItemsOnPage.length; i < len; i++) {
            _deleteItem(_$pinItemsOnPage[i], _pinItemsData, _$pinItemsBodyContainer);
        }
    }

    function _deleteChangedEventItems() {
        for (var i = 0, len = _$eventItemsOnPage.length; i < len && i < _options.maxItemsToCheckAfterUpdate; i++) {
            _deleteItem(_$eventItemsOnPage[i], _eventItemsData, _$eventItemsContainer);
        }
    }

    function _deleteItem(itemOnPage, newItemsFromJson, $itemsContainer) {
        if (_itemNeedsToBeRemoved(itemOnPage, newItemsFromJson)) {
            var itemId = itemOnPage.getAttribute("data-id");
            $itemsContainer.find("[data-id=" + itemId + "]").remove();
        }
    }

    // test if oldItem is in the list of newItems:
    // returns true if item already exists on the page and has the same content
    function _itemNeedsToBeRemoved(itemOnPage, newItemsFromJson) {
        var remove = true;

        var oldItemId = itemOnPage.getAttribute("data-id");
        if (typeof oldItemId === 'undefined') {
            remove = false;
        }

        var content = $(itemOnPage).find(_options.css.classes.editableContentSelector);
        if (content.length) {
            content = content[0].innerHTML.trim();
        } else {
            remove = false;
        }

        if (remove) {
            var oldItemIdOnlyNumbers = oldItemId.replace(/\D+/, '');
            remove = _isContentDifferent(content, oldItemIdOnlyNumbers, newItemsFromJson);
        }
        return remove;
    }

    function _isContentDifferent(contentOfItemOnPage, idOfItemOnPage, newItemsFromJson) {
        var contentIsDifferent = true;
        for (var j = 0, len = newItemsFromJson.length; j < len; j++) {
            var obj = newItemsFromJson[j];
            if ((obj.itemID && obj.itemID === idOfItemOnPage) || (obj.pin_id && obj.pin_id === idOfItemOnPage)) {
                // escaping of contentOfItemOnPage
                var div = document.createElement("div");

                div.innerHTML = '';
                if (obj.type === "image") {
                    div.innerHTML = obj.caption;
                } else {
                    div.innerHTML = obj.comment.replace(/(\r\n|\n)/g, '<br>');
                }

                if (contentOfItemOnPage === div.innerHTML.trim()) {
                    contentIsDifferent = false;
                    break;
                }
            }
        }

        return contentIsDifferent;
    }

    function addNewItems($container, items, itemsOnPage) {
        for (var i = 0, len = items.length; i < len && i < _options.maxItemsToCheckAfterUpdate; i++) {
            var newItem = items[i];

            var newItemId = "";
            if (newItem.itemID && 0 < newItem.itemID.length) {
                newItemId = parseInt(newItem.itemID, 10);
            }

            if (_isItemInContainer(newItemId, $container)) {
                continue;
            }

            var lastItemID = -1;
            for (var j = 0, itemLen = itemsOnPage.length; j < itemLen; j++) {
                var commentId = itemsOnPage[j].getAttribute("data-id");
                if (typeof commentId !== 'undefined') {
                    commentId = parseInt(commentId.replace(/\D+/, ''), 10);

                    if (lastItemID < commentId && newItemId > lastItemID && newItemId > commentId) {
                        lastItemID = commentId;
                    }
                }
            }

            var html = _getRenderedEventItem(newItem);
            if (lastItemID === -1) {
                $(html).hide().appendTo($container).fadeIn();

            } else {
                $(html).hide().insertBefore($container.find("[data-id=" + lastItemID + "]")).fadeIn();
            }
        }
    }

    function _addNewPinItems() {
        for (var i = 0, len = _pinItemsData.length; i < len; i++) {
            var newItem = _pinItemsData[i];
            var newItemId = "";
            if (newItem.pin_id && 0 < newItem.pin_id.length) {
                newItemId = newItem.pin_id;
            }

            if (_isItemInContainer(newItemId, _$pinItemsBodyContainer)) {
                continue;
            }

            var html = _getRenderedPinItem(newItem);
            $(html).hide().appendTo(_$pinItemsBodyContainer).fadeIn();
        }
    }

    function _isItemInContainer(itemId, $itemsContainer) {
        return 0 < $itemsContainer.find("[data-id=" + itemId + "]").length;
    }

    function _getRenderedEventItem(newItem) {
        var view = {
            event_items: {}
        };
        view.event_items['type_' + newItem.type] = newItem;

        return Mustache.render(_eventItemsMustacheTemplate, view);
    }

    function _getRenderedPinItem(newItem) {
        var view = {
            pin_items: {}
        };
        view.pin_items['type_' + newItem.type] = newItem;

        return Mustache.render(_pinItemsMustacheTemplate, view);
    }

    function _addNewEventItems() {
        addNewItems(_$eventItemsContainer, _eventItemsData, _$eventItemsOnPage);
    }

    function _addDateLine() {
        var view = {
            event_items: {}
        };

        var lastItemInThisDay,
            dayBeginStr,
            datesList = {};

        // gather dates from JSON, concat them in order "one day -> one property" in 'datesList'
        for (var i = 0, len = _eventItemsData.length; i < len && i < _options.maxItemsToCheckAfterUpdate; i++) {
            var newItem = _eventItemsData[i];
            var newItemId = parseInt(newItem.itemID, 10);

            var itemDate = new Date(parseInt(newItem.timestamp, 10) * 1000);
            var dayBegin = new Date(itemDate.getFullYear(), itemDate.getMonth(), itemDate.getDate());

            dayBeginStr = _getDateLine(dayBegin);

            // presume that current item is a last item in this day
            lastItemInThisDay = {'id': newItemId, 'time': itemDate, 'dayBegin': dayBegin};

            // if presumption false, than override this value with older one
            if (datesList.hasOwnProperty(dayBeginStr)) {
                var compare = datesList[dayBeginStr];
                if (dayBegin.getTime() > compare.time.getTime()) {
                    lastItemInThisDay = compare;
                }
            }

            datesList[dayBeginStr] = lastItemInThisDay;
        }

        // go throw all dates and render them on page
        for (dayBeginStr in datesList) {
            if (datesList.hasOwnProperty(dayBeginStr)) {
                var dateExists = _$eventItemsContainer.find("[data-time='" + dayBeginStr + "']");

                if (dateExists.length !== 0) {
                    continue;
                }
                lastItemInThisDay = datesList[dayBeginStr];

                var text = _formatTime(lastItemInThisDay.dayBegin);
                var lastItemID = lastItemInThisDay.id;

                view.event_items.type_newday = {
                    'dateId': dayBeginStr,
                    'message': text
                };

                var html = Mustache.render(_eventItemsMustacheTemplate, view);
                _$eventItemsContainer.find("[data-id='" + lastItemID + "']").after(html);
            }
        }

    }

    function _getDateLine(date) {
        return DATE_HELPER.ENG.WEEK[date.getDay()] + ' ' + DATE_HELPER.ENG.MONTH[date.getMonth()] + ' ' + ('0' + date.getDate()).slice(-2) + ' ' + date.getFullYear();
    }

    function _formatTime(date) {
        return DATE_HELPER.GER.WEEK[date.getDay()] + ", den " + date.getDate() + ". " + DATE_HELPER.GER.MONTH[date.getMonth()] + " " + date.getFullYear();
    }

    if (typeof String.prototype.trim !== 'function') {
        String.prototype.trim = function () {
            return this.replace(/^\s+|\s+$/g, '');
        };
    }


    /**
     *
     * functionality for manually refreshing
     */
    function _addRefreshListener() {
        if (0 === _$refreshContainer.length) {
            return;
        }

        var clickOrTouchHandlerExecuted = false;
        _$refreshContainer.bind('touchstart click', function () {
            if (!clickOrTouchHandlerExecuted) {
                clickOrTouchHandlerExecuted = true;
                setTimeout(function () {
                    clickOrTouchHandlerExecuted = false;
                }, 100);
                refresh();
            }

            return false;
        });
    }

    function refresh() {
        _toggleRefreshingClass();
        _getJSON({startTimeInMs: new Date().getTime(), callbackFunction: _toggleRefreshingClass});
    }

    function _toggleRefreshingClass() {
        _$refreshContainer.toggleClass('refreshing');
    }


    /**
     * Return methods
     */
    return {
        init: function (newOptions) {
            // extend options
            $.extend(true, _options, newOptions || {});

            _$liveTickerContainer = $(_options.liveTickerSelector);
            _$pinItemsBodyContainer = _$liveTickerContainer.find(_options.css.classes.pinItemsBodySelector);
            _$pinItemsContainer = _$liveTickerContainer.find(_options.css.classes.pinItemsContainerSelector);
            _$eventItemsContainer = _$liveTickerContainer.find(_options.css.classes.eventItemsContainerSelector);
            _$refreshContainer = _$liveTickerContainer.find(_options.css.classes.refreshContainerSelector);
            _eventItemsMustacheTemplate = $(_options.css.ids.eventItemsTemplateId).html();
            _pinItemsMustacheTemplate = $(_options.css.ids.pintItemsTemplateId).html();

            // initial parsing of templates
            Mustache.parse(_eventItemsMustacheTemplate);
            Mustache.parse(_pinItemsMustacheTemplate);

            _getJSON();
            _addRefreshListener();

            // mobile ticker should not be updated automatically
            if (false === _options.automaticUpdate) {
                return;
            }
            clearInterval(_intervalID);

            _intervalID = setInterval(_getJSON, _options.updateIntervalTimeInMs);
        },
        stop: function () {
            clearInterval(_intervalID);
        },
        setUpdateInterval: function (time) {
            clearInterval(_intervalID);
            _intervalID = setInterval(_getJSON, time);
        }

    };
})(asms.jQuery(), window, document);;function WidgetNewsticker(track){
	var that = this;
	this.track = track;

	this.paginate = function(elem, amountPages){
		if (typeof(getCounters) != "undefined") {
			getCounters(this.track);
		}
		var newPageNr = 0;
	    var count = 0;
	    var bottomId = $(elem).attr('Id');
		
	    if(bottomId == 'nextPage' || bottomId == 'prevPage'){
	        if(bottomId == 'nextPage'){
	            if(parseInt($('#actualPageNr').val()) == amountPages-1){
	                newPageNr = 0;
	             }else{
	                 newPageNr = parseInt($('#actualPageNr').val()) + 1;
	            }
	        }else if(bottomId == 'prevPage'){
	            if(parseInt($('#actualPageNr').val()) == 0){
	                newPageNr = amountPages-1;
	             }else{
	                 newPageNr = parseInt($('#actualPageNr').val()) - 1;
	             }
	        }
	    } else if(bottomId.substring(0,5) == 'page_'){
	        if(parseInt(bottomId.substring(5)) > -1){
	            newPageNr = parseInt(bottomId.substring(5));
	         }
	    }
		
	   $("a[id^='page_']").each( 
	           function(){
	        	   $(this).removeClass('selected');
	           });
	   $("a[id^='page_']").slice(newPageNr, newPageNr+1).addClass('selected');
	   
	    if(newPageNr < amountPages && newPageNr > -1){
	        $('#actualPageNr').val(newPageNr);
		
	        $("ul[id^='newstickerPage_']").each(function() {
	            var $this = $(this);
	               if(newPageNr != count){
	             	  //$this.hide("slide", { direction: "right" }, 350);
	                    $this.hide();
	               }else if(newPageNr == count){
	             	//$this.show("slide", { direction: "right" }, 350);
	                   $this.show();
	               }
	               count++;
	        });
	    }
	};
};(function ($) { // Anonyme Funktion ausführe, Scope setzen, Variablen "verstecken"
						var options = {};
						var MultimediaGallery = function (e, o) { // Gallery-Klasse
							var url, // URL zum AJAX-Script
							position,
							max,
							track; // tracking data
							this.init = function (e, o) { // Konstruktor
								var defaults = {
									"url": ''
								}
								options = jQuery.extend(defaults, o); // Eigene Optionen mit Defauls zusammenführen
								gallery = $(e); // Referenz self
								if (!gallery) { // Keine Galerie gefunden -> Abbrechen
									return false;
								}
								// Options auslesen und zwischenspeichern
								track = options.track;
								url = options.url+"&pg=";
								if(url == '&pg=') {
									return false;	
								}
								position = 0;
								max = $(".pager a",e).size()-1;						
								$(".navi  a:not(.selected)", e).live("click",function(event) { // Vorwärts-Click
									event.preventDefault(); // Fallback-Href unterbinden, kein Springen
									var srcParent = $(this).parent();
									if ($(srcParent).hasClass("pager")) {	
										var pagerIndex = $(".pager a", e).index(this);
										if(!position) { //erstes element aktiv, position = 0 -> false
											if (pagerIndex != max) { // von 0 vorwärts, wahrscheinlicher, daher zuerst prüfen
												updateItem(1,pagerIndex);
											} else {
												updateItem(0,pagerIndex);
											}
										} else if (position==max) {
											if (pagerIndex == 0) {
												updateItem(1,pagerIndex);
											} else {
												updateItem(0,pagerIndex);
											}
										} else {
											// mitten drin
											if (pagerIndex > position) {
												updateItem(1,pagerIndex);
											} else {
												updateItem(0,pagerIndex);
											}
										}
									} else {
										if(!position) { //erstes element aktiv, position = 0 -> false
											if ($(srcParent).hasClass("next")) { // von 0 vorwärts, wahrscheinlicher, daher zuerst prüfen
												updateItem(1,position+1);
											} else {
												updateItem(0,max);
											}
										} else if (position==max) {
											if ($(srcParent).hasClass("next")) {
												updateItem(1,0);
											} else {
												updateItem(0,max-1);
											}
										} else {
											// mitten drin
											if ($(srcParent).hasClass("next")) {
												updateItem(1,position+1);
											} else {
												updateItem(0,position-1);
											}
										}
									}
								});
								$(document).ready(function() {
									$(".mmNavi",e).removeClass("hidden");
								});
							};
						function updateItem(richtung,pg) {
							if(richtung) {
								$(".next",e).addClass("loading");
							} else {
								$(".prev",e).addClass("loading");
							}
							$(".mmItem",e).css({'opacity':0.6});
							aLoad(pg);
							if (typeof(getCounters) != "undefined") {
								getCounters(track);
							}
						}
						
						function aLoad(pg) { // Inhalt nachladen
							$.ajax({ // Nachladen der Bilder
									type: "GET", // Parameter mitsenden, daher POST
									url: url+pg, // URL des AJAX-Scripts
									dataType: "html", // erwarteter Rückgabetyp
									success: function (data) { // Datenladen erfolgreich
										$(e).html(data);
										position = pg;
										$(".mmNavi",e).removeClass("hidden");
										$(e).children(".mmItem").GenerateLinks();
									},
									error: function (data) { // Fehlerbehandlung
										
									}
								});
							}
						
						this.init(e, o); // Konstruktor
					};
									
					$.fn.WON_MultimediaGalleryPlugin = function (options) { // jQuery.fn um Plugin erweitern
						options = options || {};
						return this.each( function () { // This returnen, um jQuery-Chainabiliy zu sichern
							new MultimediaGallery($(this), options) // neues Objekt erzeugen
						});
					};
				})(jQuery);
;asms.general.ece.widgets.socialMedia = function ($) {
    var _options = {
        events: {
            marginalColumnRealignFor10ColumnsVideoOpener: 'de/welt/realignMarginalColumnFor10ColumnsArticleOpener',
            xozVideoPlaying: 'xoz/videoplayer/playing'
        },
        css: {
            classes: {
                socialBar: '.as_videoplayer .social-bar'
            }
        },
        elementId: null,
        socialBar: {
            delayAfterVideoStartInMs: 1500,
            fadeInDurationInMs: 500
        }
    };

    /** --------------------------------------------------------------
     *  10 columns video opener files (OA-4218)
     -------------------------------------------------------------- */
    function _unbindArticleVideoXXLPlayListener() {
        $(document).off(_options.events.xozVideoPlaying);
    }

    function registerArticleVideoXXLPlayListener() {
        $(document).on(_options.events.xozVideoPlaying, function () {
            _showArticleVideoPlayerXXLSocialBar();
        });
    }

    function _showArticleVideoPlayerXXLSocialBar() {
        var $socialBar = $(_options.css.classes.socialBar);
        if (0 === $socialBar.length) {
            return;
        }

        setTimeout(function () {
            $socialBar.animate({
                marginBottom: 16
            }, {
                queue: false,
                duration: _options.socialBar.fadeInDurationInMs
            });

            $socialBar.animate({
                height: 24
            }, {
                queue: false,
                duration: _options.socialBar.fadeInDurationInMs,
                step: function () {
                    $(document).trigger(_options.events.marginalColumnRealignFor10ColumnsVideoOpener);
                },
                complete: function () {
                    $socialBar.css('overflow', 'visible');
                    _adjustZoomLayer();
                }
            });
        }, _options.socialBar.delayAfterVideoStartInMs);

        _unbindArticleVideoXXLPlayListener();
    }

    function _adjustZoomLayer() {
        if (_options.elementId &&
            typeof asms.general.ece.widgets.inlineZoomElement !== undefined &&
            asms.general.ece.widgets.inlineZoomElement[_options.elementId] !== undefined) {
            asms.general.ece.widgets.inlineZoomElement[_options.elementId].adjustZoomLayer();
        }
    }

    /** --------------------------------------------------------------
     *  display Facebook popup with defined context (OA-4802)
     *  @param FBVars Object with following properties
     *  {
     *     fbAppId : id of Facebook App , required
     *     fbShareUrl: url to article , required
     *     redirectUrl: alternative url (i.e. main page) , required
     *  }
     *
     -------------------------------------------------------------- */
    function openFacebookSharePopup(FBVars) {
        function fail(s) {
            return typeof s === 'undefined' || s.length === 0
        }

        if (fail(FBVars.fbAppId) || fail(FBVars.fbShareUrl) || fail(FBVars.redirectURL)) {
            return
        }

        FB.init({
            appId: FBVars.fbAppId,
            status: true,
            xfbml: true,
            version: 'v2.0'
        });

        FB.ui({
            app_id: FBVars.fbAppId,
            method: 'feed',
            link: FBVars.fbShareUrl,
            picture: FBVars.fbShareImg,
            name: FBVars.fbShareName,
            caption: FBVars.fbShareDesc
        });
    }

    /**
     * Return methods
     */
    return {
        init: function (newOptions) {
            // extend options
            $.extend(true, _options, newOptions || {});

            return this;
        },
        registerArticleVideoXXLPlayListener: registerArticleVideoXXLPlayListener,
        openFacebookSharePopup: openFacebookSharePopup
    };
};
;
var streetTracking = {
    trackRatingDoneView: function (orgTrackingData) {
        var ratingTrackingData = orgTrackingData.clone();
        ratingTrackingData.customParameter2 = "Bewerten_2";

        if (typeof(window.getCounters) === "function") {
            window.getCounters(ratingTrackingData);
        }
    },
    trackFormView: function (orgTrackingData) {
        var rateTrackingData = orgTrackingData.clone();
        rateTrackingData.customParameter2 = "Bewerten_1"; 

        $('BUTTON.openPopup.topMiddle').click(
            function () {
                if (typeof(window.getCounters) === "function") {
                    window.getCounters(rateTrackingData);
                }
            }
        );
    }
};

$('SELECT#streetRankingCategorySelect').change(
    function (evnt) {
        var $this = $(this),
            url = $this.data('baseurl');
        if ($this.val() != "") {
            window.location.href = url + $this.val();
        }
    }
);;
var trackingCounterDataArgNames;

function TrackingCounterData(
    pagename, agofCode, elementType, eaeObjectType,
    contentId, contentGroup1, contentGroup2, contentGroup3, contentGroup4,
    customParameter,
    articleId, mmContentType, mmChannelNameTree, mmRenderType) {

    // get all argument names for the hashmap
    if (!trackingCounterDataArgNames) {
        var funStr = TrackingCounterData.toString();
        trackingCounterDataArgNames = funStr.slice(funStr.indexOf('(')+1, funStr.indexOf(')')).match(/([^\s,]+)/g);
    }

    // store the arguments in this object hashmap with the names of the arguments
    for (i = 0; i < arguments.length; i++) {
        var data = arguments[i];
        var argName = trackingCounterDataArgNames[i];
        if (data == "page") {
            // if value is "page", set it blank to overwrite it with the original page tracking data
            data = "";
        } else if (data == "lightbox" && argName != "mmRenderType") {
            // if value is "lightbox", overwrite it with the value of the lightbox tracking data
            data = lightboxTracking[0] ? lightboxTracking[0][argName] : "";
        }
        this[argName] = data;
    }

    this.clone = function() {
        return new TrackingCounterData(
            this.pagename,
            this.agofCode,
            this.elementType,
            this.eaeObjectType,
            this.contentId,
            this.contentGroup1,
            this.contentGroup2,
            this.contentGroup3,
            this.contentGroup4,
            this.customParameter,
            this.articleId,
            this.mmContentType,
            this.mmChannelNameTree,
            this.mmRenderType
        );
    }
}
;/**
 *
 * @author Igor Savchenko
 * @author Adrian Ramin
 *
 * @uses jQuery
 */

asms.general.ece.widgets.tracking = (function ($) {

    var WEBTREKK_ACTION_NAME = "wt_ignore";
    var WEBTREKK_CUSTOM_PARAMETER_ID = 10;

    /* Track Widget immediately if it appears in viewport or delay it until "unload" page event */
    var TRACK_IMMEDIATELY = false;

    // track all links with webtrekk v3
    function webtrekkLinkTrack() {
        if (typeof wt !== 'undefined') {
            wt.linkTrackInit();
        }
    }

    // add "waypoint"-Listener to elements defined in sections parameters for tracking with webtrekk
    // @param modules = String from section parameter, injected through jsp
    function init(modules) {

        var paramsArray = (typeof modules === "string") ?  modules.split(",") : modules;
        this.modules = [];
        this.message = "";

        for (var i = 0; i < paramsArray.length; i++) {
            var param = paramsArray[i];
            var obj = param.replace(/\{|\}/gi,'').split("=");
            if (obj && obj.length === 2) {
                this.modules.push(obj);
                var $module = $(this.modules[i][0]);
                var message = this.modules[i][1];

                this.watchElement($module, message);
            }
        }

        if (!TRACK_IMMEDIATELY) {
            var self = this;
            $(window).unload(function(){
                if (self.message && self.message.length) {
                    var params = {};
                    params[WEBTREKK_CUSTOM_PARAMETER_ID] = self.message;
                    wt.sendinfo({'linkId':WEBTREKK_ACTION_NAME, customClickParameter:params });
                }
            });
        }
    }

    // add "waypoint"-Listener to elements loaded with Ajax.
    // @param $module - jQuery element.
    // @param webtrekkActionName - message to Webtrekk
    function registerWaypoint($module, webtrekkActionName) {

        if (!($module && $module.length > 0)) {
            return;
        }
        if (typeof $.waypoints !== "function") {
            return;
        }

        var self = this;
        $module.waypoint(function(){
            if (self.message.length > 0) {
                self.message += ";";
            }

            if (!TRACK_IMMEDIATELY) {
                var params = {};
                params[WEBTREKK_CUSTOM_PARAMETER_ID] = webtrekkActionName;
                wt.sendinfo({'linkId':WEBTREKK_ACTION_NAME, customClickParameter: params});
            } else {
                self.message += webtrekkActionName;
            }
        }, {
            offset: 'bottom-in-view',
            triggerOnce: true
        });
    }

    /* public methods */
    var methods = {
        init: init,
        watchElement: registerWaypoint,
        webtrekkLinkTrack: webtrekkLinkTrack
    };

    return methods;
})(asms.jQuery());;/**
 * @author Igor Savchenko
 * @author Adrian Ramin
 *
 * @uses jQuery
 *
 * Copyright (C) 2013 Axel Springer Verlag.
 */

asms.general.ece.widgets.navigation = (function ($, window, document) {

    var _options = {
            defaultSelector: '#mainNavigationMenu',  // selector of the menu
            menuWidth: 940,                          // width of the menu
            touchTimer: 1000,                        // time in ms: sets the duration in which no other touch event will be fired
            teaserFree: false                        // if true, don't load submenu teaser
        },
        $nav = null,
        justTouched = [];

    $.fn.redraw = function () {
        return $(this).each(function () {
            $(this).hide(0, function () {
                $(this).show();
            });
        });
    };

    function loadSubmenuTeasers(section, addClickListener) {
        if (_options.teaserFree) {
            return;
        }
        var $section = $(section),
            _url = $section.data("url"),
            $sub = $section.next(".submenu");

        if (typeof _url === "undefined") {
            return;
        }
        if (_url.length > 0 && !$section.hasClass("ajax-loaded")) {
            $sub.find(".submenuTeaser").addClass("ajaxLoadingGif");
            $.ajax({
                url: _url,
                success: function (data) {
                    // response seems to be a complete html document -> ignore response
                    if (data.indexOf("<html") >= 0) {
                        $section.removeAttr('data-url');
                        $sub.addClass("noTeaser");
                        return;
                    }

                    if (data.indexOf("div") > 0) {
                        var $submenuTeaser = $sub.find(".submenuTeaser");

                        // add teaser context and remove loading gif
                        $submenuTeaser.removeClass("ajaxLoadingGif").html(data);

                        // generate links for teaser images (images are initially not linked for seo reasons)
                        if (typeof( $().GenerateLinks()) !== 'undefined') {
                            $submenuTeaser.find('.multimedia .mmItem, .multimedia .tsrAM, .stories,.videoplayer,.slideshow').not(".relatedContents,.aufmacher,#artAufmacher,#artEnde").GenerateLinks();
                        }

                        $section.addClass("ajax-loaded");

                        // add click listener for teaser links (necessary for some android devices)
                        if (addClickListener) {
                            addClickListenerForAllLinksWithinElement($submenuTeaser);
                        }

                        // track all links within submenu teaser
                        if (typeof asms.general.ece.widgets.tracking !== 'undefined') {
                            asms.general.ece.widgets.tracking.webtrekkLinkTrack($submenuTeaser);
                        }

                        // force redraw to see box shadow (necessary for ie9 & ie10)
                        $sub.redraw();
                    }
                }
            });
        }
    }

    // aligns second submenu in page layout. Otherwise its overflow the right side of the page.
    function alignSubmenu() {
        var navRightBorder = $nav[0].getBoundingClientRect().right;
        $nav.find(".submenu").each(function () {
            var subMenuRightBorder = this.getBoundingClientRect().right;
            var diff = navRightBorder - subMenuRightBorder;
            if (diff < 0) {
                $(this).css("left", diff + "px");
            }

            // set height of submenu teaser
            var $submenuTeaser = $(this).find(".submenuTeaser");
            var marginPaddingAndBorderOfSubmenu = $submenuTeaser.outerHeight(true) - $submenuTeaser.height();
            var newHeightOfSubmenu = $(this).height() - marginPaddingAndBorderOfSubmenu;

            // check if new height is taller than min-height and old height
            if (newHeightOfSubmenu > $submenuTeaser.css('min-height') || $submenuTeaser.height() < newHeightOfSubmenu) {
                $submenuTeaser.css('min-height', newHeightOfSubmenu);
            }
        });
    }

    // set the left and right padding for the last menu item so it fills the remaining space
    function styleLastMenuItem() {
        var menuItemsWidth = 0;

        $nav.find("> ul").children("li").not('.last').each(function () {
            menuItemsWidth += $(this).outerWidth();
        });

        var newWidth = _options.menuWidth - menuItemsWidth;

        // no more space available
        if (0 > newWidth) {
            return false;
        }

        // set width of last menu item
        $nav.find(' > ul > li.last a.sectionName').css({
            'width': newWidth
        });

        return true;
    }

    function registerMouseOverListener() {
        var $submenu = $(this);
        loadSubmenuTeasers($submenu, false);
    }

    // register touchstart listener
    function registerTouchStarListener(evt) {
        var $self = $(this);
        var $sectionListItem = $self.parent('li').eq(0);
        var href = $self.attr('href');
        var $submenu = $sectionListItem.find('.submenu');
        var submenuExists = ( $submenu.length > 0 ||
            (typeof $self.data('url') !== 'undefined' && $self.data('url').length > 0) );

        // item has submenu and was just touched, so no further action is necessary
        if (submenuExists && justTouched[href] !== null && justTouched[href] === true) {
            evt.stopPropagation();
            evt.preventDefault();
            return;
        }

        // reset array
        justTouched = [];
        // set touched flag to true, so no other touch within a given time can fire a new event
        justTouched[href] = true;
        setTimeout(function () {
            justTouched[href] = false;
        }, _options.touchTimer);

        // stop event propagation so the section will not open
        if (submenuExists && !$self.hasClass('touched')) {
            evt.stopPropagation();
            evt.preventDefault();
        } else {
            // open section link in current window
            if (href !== null && href.length > 0) {
                window.location = href;
            }
        }

        addClickListenerForAllLinksWithinElement($submenu);

        // remove 'touched' class from all sections
        var $clonedNav = $nav.clone(true, true);
        // working on cloned object (reduce redraws)
        var sections = $clonedNav.find(".menu > li");
        var indexOfSelf = $nav.find(".menu > li").index($sectionListItem);
        $.each(sections, function () {
            var $this = $(this);
            var $sectionLink = $this.find('a.sectionName').eq(0);
            var indexOfThis = $clonedNav.find(".menu > li").index(this);

            if (indexOfThis !== indexOfSelf) {
                $sectionLink.removeClass('touched');
                // hide all submenus touched item visible
                $this.removeClass("showSubmenu").addClass("hideSubmenu");
            } else {
                // add class 'touched' to touched section
                $sectionLink.addClass('touched');
                // make current touched item visible
                $this.removeClass("hideSubmenu").addClass('showSubmenu');
                // load submenu teasers for section
                loadSubmenuTeasers($sectionLink, true);
            }
        });
        $nav.replaceWith($clonedNav);
        setSelector();
    }

    function registerEvents() {
        // adding event handlers (mouseover or touch)
        var sections = $nav.find(".sectionName");

        if (sections.length > 0) {
            if ('onmouseover' in document.documentElement && !('ontouchstart' in document.documentElement)) {
                // register mouse over listener
                sections.on({ 'mouseover': registerMouseOverListener });
            } else if ('ontouchstart' in document.documentElement) {
                // register touch listener if supported
                sections.on({ 'touchstart click': registerTouchStarListener });
            }
            alignSubmenu();
        }
    }

    function setSelector() {
        var selector = _options.defaultSelector;
        if (_options.selector && 0 < _options.selector.length) {
            selector = _options.selector;
        }
        $nav = $(selector);
    }

    // add click listener for all links within a specific element:
    // (necessary for submenu links on some android devices)
    function addClickListenerForAllLinksWithinElement($element) {
        $links = $element.find('a');

        $links.on({ 'touchstart click': function (evt) {
            window.location = this.href;
            evt.preventDefault();
        }
        });
    }

    /* public methods */
    var methods = {
        init: function (newOptions) {
            // extend options
            _options = jQuery.extend(_options, newOptions || {});

            setSelector();

            // check for existing console object
            if (!window.console) {
                console = { log: function () {
                } };
            }

            // set padding left and right for last menu item
            styleLastMenuItem();

            registerEvents();
        }
    };


    return methods;
})(asms.jQuery(), window, document);

;function errorPoll(pollid,errorMsg) {
	var pe = $("#pollerr-"+pollid);
	var peB = $('.errorBox',pe);
	var peW = $(pe).width()-70;
	$(peB).css("width",peW);
	$(peB).children("p").text(errorMsg);
	var peBH = $(peB).outerHeight();
	var wp = $("#pollq-"+pollid).parent();
	var wh = $(wp).outerHeight()-$(wp).children("h5").outerHeight();
	$(peB).css({"top":(wh-peBH)/2,"width":peW});
	$(pe).height(wh).css("visibility","visible");
}
function checkPoll(pollid){
	var val=$('input[name=pollr-'+pollid+']:checked', '#poll-'+pollid).val();
	if(val == null){
		errorPoll(pollid,"Bitte wählen Sie eine Antwort aus.");
	} else {
		var url=$('#poll-'+pollid).attr("action");
		var result='voteFor='+val;
		$('#pollerr-'+pollid).text('');
		if($.cookie('poll-'+pollid)==null){
			$.ajax({
				  url: url,
				  data: result,
				  type: "post",
				  success: function(data){
					if (typeof(getCounters) != "undefined") {
						getCounters(pollTracking[pollid]);
					}
				    $('#pollax-'+pollid).html(data);
					$('#pollq-'+pollid).hide();
					$('#polla-'+pollid).show();
					$.cookie('poll-'+pollid,'x',{ 'Max-Age': 2592000, expires: 30, path: '/' });
				  },
				  error: function(jqXHR, textStatus, errorThrown){
					$('.errorBox','#pollerr-'+pollid).text("Beim Senden der Daten ist ein Fehler aufgetreten.");					  
				  }
			});
		}
	}
}
function evalPoll(pollid,ended){
	if($.cookie('poll-'+pollid)!=null || ended){
		$('#polla-'+pollid).show();
		$('#pollq-'+pollid).hide();
	} else {
		$('#pollq-'+pollid).show();
		$('#polla-'+pollid).hide();
		var pe = $("#pollerr-"+pollid);
		$(".close",pe).click(function(){
			$(pe).css("visibility","hidden");
		});
	}
	$('#polla-'+pollid).parent().css("visibility","visible");
};/** script for videoplayer endscreen */

function VideoPlayer(videoPlayerId) {
    if (videoPlayerId != undefined) {
        this.videoPlayerId = videoPlayerId;
        VideoPlayer._objects[videoPlayerId] = this;
    }
}

VideoPlayer._objects = [];
VideoPlayer._history = [];

VideoPlayer.showVideoplayerEndscreen = function (videoPlayerId, videoId) {
    VideoPlayer._objects[videoPlayerId].showVideoplayerEndscreen(videoId);
};

VideoPlayer.showVideoplayerErrorScreen = function (videoPlayerId, videoId, videoplayerType, errorTopLine, errorBottomLine) {
    VideoPlayer._objects[videoPlayerId].showErrorScreen(videoId, errorTopLine, errorBottomLine);
};

VideoPlayer.trackVideo = function (videoId, vidID, event, duration, percent, cookie, search, revolver, partnerRessort, videoPartnerId) {
    VideoPlayer.getObjectByVideoId(videoId).track(vidID, event, duration, percent, cookie, search, revolver, partnerRessort, videoPartnerId);
};

VideoPlayer.getVideoIVW = function (videoId) {
     // old tracking IVW is deprecated due to OA-7200
};

VideoPlayer.getObjectByVideoId = function (videoId) {
    var object = VideoPlayer._objects["video_" + videoId];
    if (!object) {
        for (key in VideoPlayer._objects) {
            object = VideoPlayer._objects[key];
            break;
        }
    }
    return object;
};

VideoPlayer.prototype = {
    videoPlayerId: null,
    videoId: null,
    widgetView: null,
    latestFeed: null,
    mostviewedFeed: null,
    recommendedFeed: null,
    activeFeed: null,
    timerLength: null,
    origTimer: null,
    revolver: null,
    urlSuffix: '',
    xPathTopLine: null,
    xPathTopLineDate: null,
    xPathTitle: null,
    whichRoll: 'midroll',
    countDown: null,
    revolverCount: 0,
    countFeed: 1,
    feedItems: null,
    xPathVideo: null,
    xPathVideoEndscreen: null,
    tracking: null,
    isPaid: false,
    isAjax: false,
    isFree: true,
    isAutoplay: true,
    homesectionTree: '',
    agofCode: '',
    ajaxWidgetUrl: '',
    widgetStyleId: '',
    embedIfDisallowed: null,
    isEmbedAllowed: null,
    initializedByPlaylistClick: false,

    init: function () {
        if (this.feedItems == null) {
            // Eigenschaften
            this.feedItems = {};
            this.deleteArray();

            this.feedItems.history = []; // IDs der bereits gespielten Videos
            this.feedItems.count = 0; // Anzahl der Videos im aktuellen Parsing
            this.origTimer = this.timerLength;

            // this.urlSuffix
            if (this.urlSuffix == undefined) {
                this.urlSuffix = '';
            }

            this.xPathVideo = "#" + this.videoPlayerId;
            this.xPathVideoEndscreen = this.xPathVideo + " .videoEndscreen";
        }
    },

    showVideoplayerEndscreen: function (videoId) {
        var instance = com.xoz.videoplayer.getInstance(this.videoPlayerId);

        if (instance && instance.controls.is_fullscreen_active) {
            this.leaveFullscreen(instance);
        }

        this.init();
        var obj = this;

        if (!this.recommendedFeed) {
            // show start screen for same video
            com.xoz.videoplayer.showStartscreen(this.videoPlayerId);
            return;
        }

        // Gespieltes Video wird im Array gespeichert
        this.feedItems.history.push(videoId);
        if (this.widgetStyleId) {
            if (VideoPlayer._history[this.widgetStyleId] == undefined) {
                VideoPlayer._history[this.widgetStyleId] = [];
            }
            VideoPlayer._history[this.widgetStyleId].push(videoId);
        }

        // Feed wird geparst
        this.parseFeed(this.activeFeed, true, true);

        $(obj.xPathVideo + " .video_wrapper").hide();
        $(obj.xPathVideo + " .play").hide();

        if (this.timerLength === 0) {
            return;
        }

        $(obj.xPathVideoEndscreen).show();

        // Second Navi Liste bei Hover einblenden
        $(this.xPathVideoEndscreen + ' .moreVids li:last-child').hover(function () {
            $(obj.xPathVideoEndscreen + ' ul.category').show();
        }, function () {
            $(obj.xPathVideoEndscreen + ' ul.category').hide();
        });

        // NavBar Navigation (Auswahl des Feeds)
        $(this.xPathVideoEndscreen + ' .moreVids ul li a').click(function (event) {
            if ($(this).parent().parent().attr('class') === 'category') {
                return;
            }
            event.preventDefault();
            obj.deleteArray();
            $(obj.xPathVideoEndscreen + ' .moreVids ul li a').removeClass('active');
            $(this).addClass('active');
            switch ($(this).parent().index()) {
                case 0:
                    obj.activeFeed = obj.recommendedFeed;
                    break;
                case 1:
                    obj.activeFeed = obj.latestFeed;
                    break;
                case 2:
                    obj.activeFeed = obj.mostviewedFeed;
                    break;
                default:
                    obj.activeFeed = obj.recommendedFeed;
                    break;
            }
            obj.countFeed = 1;
            $(obj.xPathVideoEndscreen + ' .moreVids .vidContainer .lastGroup a').hide();
            obj.parseFeed(obj.activeFeed, true);
        });

        // Top Navigation
        $(this.xPathVideoEndscreen + ' .headNav .lastVid').click(function () {

            $(obj.xPathVideo + " .video_wrapper").show();
            $(obj.xPathVideo + " .play").show();
            $(obj.xPathVideoEndscreen).hide();

            com.xoz.videoplayer.replayVideo(obj.videoPlayerId);
            $(obj.xPathVideoEndscreen + ' .timeToGo, ' + obj.xPathVideoEndscreen + ' .clearTimer').css('opacity', '1');
        });
        $(this.xPathVideoEndscreen + ' .headNav .nextVid').click(function () {
            window.location.href = obj.feedItems.link[0];
        });

        // Teaser Navigation linke Seite < >
        $(this.xPathVideoEndscreen + ' .moreVids .vidContainer .nextGroup a').click(
            function (event) {
                event.preventDefault();
                obj.countFeed += 1;
                if (obj.countFeed + 2 >= obj.feedItems.image.length) {
                    $(obj.xPathVideoEndscreen + ' .moreVids .vidContainer .nextGroup a')
                        .hide();
                }
                if (obj.feedItems.image.length > 3) {
                    $(obj.xPathVideoEndscreen + ' .moreVids .vidContainer .lastGroup a')
                        .css('display', 'block');
                }
                obj.fillSmallTeaser(obj.countFeed);
            });
        $(this.xPathVideoEndscreen + ' .moreVids .vidContainer .lastGroup a').click(
            function (event) {
                event.preventDefault();
                obj.countFeed -= 1;
                if (obj.countFeed === 1) {
                    $(obj.xPathVideoEndscreen + ' .moreVids .vidContainer .lastGroup a')
                        .hide();
                }
                if (obj.feedItems.image.length > 3) {
                    $(obj.xPathVideoEndscreen + ' .moreVids .vidContainer .nextGroup a')
                        .css('display', 'block');
                }
                obj.fillSmallTeaser(obj.countFeed);
            });

        // Klick auf einen Videoteaser
        $(this.xPathVideoEndscreen + ' .tsrImg a, .videoEndscreen h4 a').click(
            function (event) {
                event.preventDefault();
                var clickedVid = $(
                    obj.xPathVideoEndscreen + ' .tsrImg a, .videoEndscreen h4 a')
                    .index(this);
                if (clickedVid >= 6) {
                    clickedVid = 0;
                } else if (clickedVid >= 3) {
                    clickedVid = obj.countFeed + 1;
                } else {
                    clickedVid = obj.countFeed;
                }
                window.location.href = obj.feedItems.link[clickedVid];
            });

    },

    // Timer wird heruntergezaehlt
    setTime: function () {
        $(this.xPathVideoEndscreen + ' .timeToGo span').text(this.timerLength);
        this.timerLength -= 1;
        if (this.timerLength < 0) {
            // Wenn Timer = 0, starte Revolver-Video
            clearInterval(this.countDown);
            this.timerLength = this.origTimer;
            this.revolverCount += 1;

            this.showNextVideo();
        }
    },

    showNextVideo: function () {
        // check if next video is a paid one
        if (true === this.feedItems.isPaid[0]) {
            this.fireBuliVideoAccessEvent(
                this.feedItems.id[0],
                this.videoPlayerId,
                this.feedItems.isPaid[0],
                this.feedItems.isFree[0],
                this.feedItems.homesectionTree[0]
            );

            // video is not free - don't show it
            if (false === this.feedItems.isFree[0]) {
                this.showFirstVideoFromFeed(false);
                return;
            }
        }

        this.showFirstVideoFromFeed(true);
    },

    removeVideoplayerInstance: function () {
        if (com.xoz.videoplayer.getInstance(this.videoPlayerId)) {
            com.xoz.videoplayer.removeInstance(this.videoPlayerId);
        }
    },

    showFirstVideoFromFeed: function (reinitVideo) {
        this.initializedByPlaylistClick = false;

        if (this.ajaxWidgetUrl) {
            // reload video by ajax
            var obj = this;
            $.ajax({
                url: this.ajaxWidgetUrl.replace(this.videoId, this.feedItems.id[0]),
                type: "GET",
                success: function (result) {
                    $("#" + obj.widgetStyleId).html(result);
                }
            });

        } else {
            $(this.xPathVideo + " .video_wrapper").show();
            $(this.xPathVideo + " .play").removeAttr('style');
            $(this.xPathVideoEndscreen).hide();

            if (typeof this.hasPlaylist !== 'undefined' && true === this.hasPlaylist) {
                $(document).trigger('de/welt/playlistPlayNextVideo', [ this.videoPlayerId, this.revolverCount ]);
                return;
            }

            // reinit videoplayer with new video
            if (true === reinitVideo) {
                com.xoz.videoplayer.reinitializeVideo(this.videoPlayerId, this.feedItems.xml[0] + this.urlSuffix,
                    this.revolverCount, false, {showTerminationButton: true});
            }

            this.updateVideoDescription(0);
        }
    },

    // update video description from feed data
    updateVideoDescription: function (pos) {
        $('#' + this.videoPlayerId + ' .video_wrapper img').attr('src', this.feedItems.imageTeaser[pos]);

        // parse published date: 2012-03-08T08:30:31+01:00
        var publisheddate = this.feedItems.publisheddate[pos];
        var publishedYear = publisheddate.substr(0, 4);
        var publishedMonth = publisheddate.substr(5, 2);
        var publishedDay = publisheddate.substr(8, 2);
        var publisheddatestring = publishedDay + "." + publishedMonth + "." + publishedYear;
        var videoid = this.videoId;

        var headline = $('#videoheadline_' + videoid);
        if (headline.length > 0) {
            var topline = $('#videotopline_' + videoid);
            if (topline.length > 0) {
                topline.find('.time').first().html(publisheddatestring);
                topline.find('h5').html(this.feedItems.topline[pos]);
                var count = topline.find('.count');
                if (count.length > 0) {
                    var duration = Math.floor(this.feedItems.duration[pos] / 1000);
                    var mins = Math.floor(duration / 60);
                    var secs = duration % 60;
                    count.html(mins + ':' + (secs < 10 ? '0' : '') + secs);
                }
            }
            headline.html(this.feedItems.title[pos]);
        }

        var subline = $('#videosubline_' + videoid);
        if (subline.length > 0) {
            subline.html(this.feedItems.source[pos] ? 'Quelle: ' + this.feedItems.source[pos] : '');
        }

        $('#video_' + this.videoId).siblings('span.kicker').html(this.feedItems.topline[pos]);

        var $socialBar = $('#video_' + this.videoId).siblings('.social-bar').find('.socialMedia');
        if ($socialBar.length === 1) {
            var socialBarTemplate = '';
            $socialBarTemplate = $('#templateSocialBar');
            if ($socialBarTemplate.length > 0) {
                socialBarTemplate = $socialBarTemplate.html();
                this.resetSocialMediaButtons($socialBar, {link: this.feedItems.link[pos], title: this.feedItems.title[pos]},
                    socialBarTemplate);
            }
        }

        var $time = $('#video_' + this.videoId).siblings('span.time');
        if ($time.length === 1) {
            $time.html(this.convertTheDate(this.feedItems.publisheddate[pos]));
        }

        var text = $('#videotext_' + videoid);
        if (text.length > 0) {
            text.html(this.feedItems.text[pos]);
        }
    },

    // converts date string from JSON to format "day.month.year" with leading zero
    convertTheDate: function (date) {
        var formattedDate = '';
        if (typeof date === 'string') {
            var q = new Date(date);
            formattedDate = ('0' + q.getDate()).slice(-2) + '.' + ('0' + (q.getMonth() + 1)).slice(-2) + '.' + q.getFullYear();
        }
        return formattedDate;
    },

    // change URL of social buttons according to selected video
    // see videoTeaserXXL.jsp
    resetSocialMediaButtons: function ($socialBar, videoData, socialBarTemplate) {
        if (typeof Mustache === 'undefined') {
            return;
        }
        Mustache.parse(socialBarTemplate);
        var socialBarHtml = Mustache.render(socialBarTemplate, {
            'url': videoData.link,
            'title': videoData.title
        });
        $($socialBar).html(socialBarHtml);

        if (typeof renderSocialButtons === 'function') {
            renderSocialButtons();
        }
    },

    // Timer wird gestartet
    startTimer: function () {
        this.countDown = setInterval("VideoPlayer._objects['" + this.videoPlayerId + "'].setTime()", 1000);
    },

    /**
     * Fuellt einen kompletten Teaser
     * @param: teaser : 0 = Links1; 1 = Links2; 2 = Rechts;
     * @feedIndex: Position im feedItem
     *
     */
    fillTeaser: function (teaser, feedIndex) {
        var $premiumContainer = $(this.xPathVideoEndscreen + ' .tsrImg .premiumContentContainer').eq(teaser);
        if (true === this.feedItems.isPaid[feedIndex] && false === this.feedItems.isFree[feedIndex]) {
            $premiumContainer.removeClass('hide');
        } else {
            $premiumContainer.addClass('hide');
        }

        $(this.xPathVideoEndscreen + ' .tsrImg img').eq(teaser).attr('src',
            this.feedItems.imagebig[feedIndex]);
        $(this.xPathVideoEndscreen + ' .tsrImg img').eq(teaser).attr('alt',
            this.feedItems.text[feedIndex]);
        $(this.xPathVideoEndscreen + ' .tsrImg:eq(' + (teaser) + ') a').attr('href',
            this.feedItems.link[feedIndex]);
        $(this.xPathVideoEndscreen + ' div.topLine').eq(teaser).html(
            this.feedItems.topline[feedIndex]);
        $(this.xPathVideoEndscreen + ' h4 a').eq(teaser).html(this.feedItems.title[feedIndex]);
        $(this.xPathVideoEndscreen + ' h4 a').eq(teaser).attr('href',
            this.feedItems.link[feedIndex]);
    },

    // Fuellt den grossen rechten Teaser
    fillBigTeaser: function () {
        this.fillTeaser(2, 0);
    },

    // Fuellt die kleinen linken Teaser
    fillSmallTeaser: function (count) {
        if (count === undefined) {
            count = 1;
        }
        var i;
        for (i = 0; i < $(this.xPathVideoEndscreen + ' .tsrImg img').length - 1; i += 1) {
            this.fillTeaser(i, count + i);
        }
    },

    fillAllTeaser: function () {
        this.fillBigTeaser();
        this.fillSmallTeaser();
    },

    setFeedItem: function (pos, item) {
        this.feedItems.id[pos] = $(item).find('id').text();
        this.feedItems.image[pos] = $(item).find('image').text();
        this.feedItems.imagebig[pos] = $(item).find('image-big').text();
        this.feedItems.imageTeaser[pos] = $(item).find('image-teaser').text();
        this.feedItems.topline[pos] = $(item).find('topline').text();
        this.feedItems.title[pos] = $(item).find('title').text();
        this.feedItems.text[pos] = $(item).find('text').text();
        this.feedItems.link[pos] = $(item).find('link').text();
        this.feedItems.xml[pos] = $(item).find('xml').text();
        this.feedItems.publisheddate[pos] = $(item).find('published-date').text();
        this.feedItems.duration[pos] = $(item).find('duration').text();
        this.feedItems.source[pos] = $(item).find('source').text();
        this.feedItems.isPaid[pos] = ('true' === $(item).find('paid').text());
        this.feedItems.isFree[pos] = ('true' === $(item).find('free').text());
        this.feedItems.homesectionTree[pos] = $(item).find('homesection').text();
    },

    deleteArray: function () {
        this.feedItems.id = []; // ID des Videos
        this.feedItems.image = []; // kleines Teaserbild
        this.feedItems.imagebig = []; // großes Teaserbild
        this.feedItems.imageTeaser = []; // großes Teaserbild
        this.feedItems.topline = []; // Kopfzeile
        this.feedItems.title = []; // Titelzeile
        this.feedItems.text = []; // Teasertext (wird nicht genutzt)
        this.feedItems.link = []; // Link zum Video auf der Videobühne
        this.feedItems.xml = []; // Link zum XMLV
        this.feedItems.publisheddate = []; // Publikationsdatum
        this.feedItems.duration = []; // Video-Länge
        this.feedItems.source = []; // Quelle
        this.feedItems.isPaid = []; // ist paid artikel
        this.feedItems.isFree = []; // ist kostenlos angebotener artikel
        this.feedItems.homesectionTree = []; // Homesection-Baum
    },

    clearTeaser: function () {
        $(this.xPathVideoEndscreen + ' .tsrImg img').attr('src', '#');
        $(this.xPathVideoEndscreen + ' .tsrImg img').attr('alt', ' ');
        $(this.xPathVideoEndscreen + ' .tsrImg a').attr('href', '#');
        $(this.xPathVideoEndscreen + ' div.topLine').html(' ');
        $(this.xPathVideoEndscreen + ' h4 a').html(' ');
        $(this.xPathVideoEndscreen + ' h4 a').attr('href', '#');
    },

    hideTeaser: function () {
        $(this.xPathVideoEndscreen + ' .tsrImg').each(function () {
            if ($(this).children().eq(0).attr('href') === '#') {
                $(this).hide();
            } else {
                $(this).css('display', 'block');
            }
        });
    },

    // Timer fuer Revolvervideo läuft los wenn "revolver = true"
    playRevolver: function () {
        var obj = this;
        if (this.revolver) {
            // show next video if timer is set to 0
            if (this.timerLength === 0) {
                this.revolverCount += 1;
                this.showNextVideo();
                return;
            }

            if (this.feedItems.imagebig[0] !== undefined) {
                this.startTimer();
            } else {
                // Countdown wird ausgeblendet
                $(obj.xPathVideoEndscreen + ' .timeToGo, ' + obj.xPathVideoEndscreen + ' .clearTimer').css('opacity', '0');
            }
            // Timer bei Click in Endscreen anhalten und zuruecksetzen
            $(this.xPathVideoEndscreen).click(function () {
                $(obj.xPathVideoEndscreen + ' .timeToGo, ' + obj.xPathVideoEndscreen + ' .clearTimer').animate({
                    opacity: '0.3'
                });
                clearInterval(obj.countDown);
            });
        } else {
            // Countdown wird ausgeblendet
            $(obj.xPathVideoEndscreen + ' .timeToGo, ' + obj.xPathVideoEndscreen + ' .clearTimer').css('opacity', '0');
        }
    },

    // prueft auf evtl. gespielte Videos
    checkPlayed: function () {
        var j;
        for (j = 0; j < this.feedItems.history.length; j += 1) {
            var i;
            for (i = 0; i < this.feedItems.xml.length; i += 1) {
                if (this.feedItems.id[i] === this.feedItems.history[j]) {
                    this.feedItems.id.splice(i, 1);
                    this.feedItems.image.splice(i, 1);
                    this.feedItems.imagebig.splice(i, 1);
                    this.feedItems.imageTeaser.splice(i, 1);
                    this.feedItems.topline.splice(i, 1);
                    this.feedItems.title.splice(i, 1);
                    this.feedItems.text.splice(i, 1);
                    this.feedItems.link.splice(i, 1);
                    this.feedItems.xml.splice(i, 1);
                    this.feedItems.publisheddate.splice(i, 1);
                    this.feedItems.duration.splice(i, 1);
                    this.feedItems.source.splice(i, 1);
                    this.feedItems.isPaid.splice(i, 1);
                    this.feedItems.isFree.splice(i, 1);
                    this.feedItems.homesectionTree.splice(i, 1);
                    break;
                }
            }
        }

        if (this.widgetStyleId) {
            var history = VideoPlayer._history[this.widgetStyleId];
            if (history) {
                for (j = 0; j < history.length; j += 1) {
                    var i;
                    for (i = 0; i < this.feedItems.xml.length; i += 1) {
                        if (this.feedItems.id[i] === history[j]) {
                            this.feedItems.id.splice(i, 1);
                            this.feedItems.image.splice(i, 1);
                            this.feedItems.imagebig.splice(i, 1);
                            this.feedItems.imageTeaser.splice(i, 1);
                            this.feedItems.topline.splice(i, 1);
                            this.feedItems.title.splice(i, 1);
                            this.feedItems.text.splice(i, 1);
                            this.feedItems.link.splice(i, 1);
                            this.feedItems.xml.splice(i, 1);
                            this.feedItems.publisheddate.splice(i, 1);
                            this.feedItems.duration.splice(i, 1);
                            this.feedItems.source.splice(i, 1);
                            this.feedItems.isPaid.splice(i, 1);
                            this.feedItems.isFree.splice(i, 1);
                            this.feedItems.homesectionTree.splice(i, 1);
                            break;
                        }
                    }
                }
            }
        }
    },

    // aktiven Feed auslesen
    parseFeed: function (feedURL, allTeaser, revolver) {
        var obj = this;
        this.clearTeaser();
        $.ajax({
            url: feedURL,
            dateType: 'xml',
            cache: false,
            success: function (data) {
                $(data).find('video').each(function (index) {
                    obj.setFeedItem(index, this);
                });
            },
            complete: function () {
                obj.checkPlayed();
                if (allTeaser) {
                    obj.fillAllTeaser();
                } else {
                    obj.fillSmallTeaser();
                }
                obj.hideTeaser();
                if (revolver) {
                    obj.playRevolver();
                }
                if (obj.feedItems.image.length < 4) {
                    $(obj.xPathVideoEndscreen + ' .moreVids .vidContainer .nextGroup a')
                        .hide();
                } else {
                    $(obj.xPathVideoEndscreen + ' .moreVids .vidContainer .nextGroup a')
                        .css('display', 'block');
                }
            }
        });
    },

    track: function (vidID, event, duration, elapsed, percent, cookie, search, revolver, partnerRessort, videoPartnerId) {
        var length = 0;
        switch (event) {
            case 'PLAY':
                if (isFrontPage === "true" && this.widgetStyleId.length > 0) {
                    var title = $("#" + this.widgetStyleId + " .headline a").html();
                    wt.sendinfo({linkId: '_chf_A_videohome_' + this.videoId + ': ' + title});
                }
                this.trackIVW();
            // miss break on purpose OA-2785
            case 'PlayAutoRev':
                event = 'init';
                if (duration > 1000) {
                    length = duration / 1000;
                }
                break;
            case 'START':
                event = 'play';
                break;
            case 'TIMEUPDATE':
                event = 'pos';
                break;
            case 'COMPLETE':
                event = 'eof';
        }
        if (this.widgetStyleId && VideoPlayer._history[this.widgetStyleId]) {
            revolver = VideoPlayer._history[this.widgetStyleId].length;
        }

        var ck7 = '';
        if (true === this.initializedByPlaylistClick) {
            ck7 = 'InitPlaylist';
        } else if (revolver > 0) {
            ck7 = 'Revolver';
        } else if (this.isAutoplay === true) {
            ck7 = 'Autoplay';
        } else {
            ck7 = 'Init';
        }

        cookie = "ck2=" + partnerRessort + ";";
        cookie += "ck3=" + videoPartnerId + ";";
        cookie += "ck6=" + this.widgetView + ";";
        cookie += "ck7=" + ck7 + ";";
        cookie += "ck8=" + revolver;
        wt_sendinfo_media(vidID, event, elapsed, length, cookie, search);
    },

    // track IVW only once on first user interaction, not on autoplay, but in zoomed video or clicking playlist (OA-7200)
    trackIVW: function () {
        var isZoom = this.isAutoplay && this.isAjax;
        if ( (!this.isAutoplay || isZoom || this.initializedByPlaylistClick) && typeof(window.getIVW) != "undefined") {
            var ivwData =  this.agofCode !== '' ? {agofCode: this.agofCode + '_INIT'} : '';
            window.getIVW(ivwData);
        }
    },

    prepareTrackingForPlaylistClick: function () {
        this.initializedByPlaylistClick = true;
        this.revolverCount = 0;
    },

    trackPremiumVideo: function () {
        wt.sendinfo(
            {linkId: '_Video: ' + this.videoId + '_BlockingLayer_'}
        );
    },

    trackLink: function (videoId) {
        wt.sendinfo(
            {linkId: '_Video: ' + videoId + '_GoToBild_'}
        );
    },

    // notify premium content via event
    fireBuliVideoAccessEvent: function (videoId, videoPlayerId, isPaid, isFree, homesectionTree) {
        var videoObject = {
            "meta": {
                "parentDivId": videoPlayerId,
                "freeClassName": "show_go_to_bild_screen",
                "denyClassName": "show_test_now_screen",
                "loginLinkClass": "",
                "offerLinkClass": "offer_button",
                "accessLinkClass": "access_button"
            },
            "content": {
                "id": videoId.toString(),
                "homeSection": homesectionTree,
                "type": "video",
                "category": "bundesliga",
                "isPremium": isPaid && !isFree
            }
        };
        window.bigpUserEvents = window.bigpUserEvents || [];
        window.bigpUserEvents.push([ 'fire', 'premium-checkContentAccess', videoObject ]);
    },

    // register player: show buli abo screens or init videoplayer
    register: function () {
        this.init();

        if ('embed' === this.widgetView) {
            if (this.prepareEmbeddedVideoplayer() == false) {
                return;
            }
        }

        if (true === this.isPaid) {
            this.fireBuliVideoAccessEvent(this.videoId, this.videoPlayerId, this.isPaid, this.isFree, this.homesectionTree);

            // video is not free - don't show it
            if (false === this.isFree) {
                this.trackPremiumVideo();
                return;
            }
        }

        var videoplayer = this;
        $("#" + this.videoPlayerId + " .access_button").click(function () {
            videoplayer.trackLink(videoplayer.videoId);
        });

        if (true === this.isAjax) {
            this.initAjaxPlayer();
        } else {
            this.initPlayer();
        }
    },

    // register player for non autoplay videos which are in paying phase
    registerPaidVideoNonAutoplay: function () {
        var videoPlayer = this;
        $("#" + this.videoPlayerId + " button.play").on("click", function () {
            videoPlayer.register();
        });
    },

    // initialize videoplayer
    initPlayer: function () {
        var player = this;
        $(document).on("xoz/videoplayer/ready", function () {
            // video is opened in lightbox
            if (true === player.isAjax) {
                // remove existing instance if necessary
                this.removeVideoplayerInstance();
            }

            // init videoplayer
            var context = $("#" + player.videoPlayerId).parents(".as_videoplayer");
            com.xoz.videoplayer.registerForContext(context);
        });
    },

    pausePlayer: function () {
        var player = this;
        com.xoz.videoplayer.pause(player.videoPlayerId);
    },

    // initialize videoplayer within lightbox
    initAjaxPlayer: function () {
        // remove existing instance if necessary
        this.removeVideoplayerInstance();

        // init videoplayer
        var context = $("#" + this.videoPlayerId).parents(".as_videoplayer");
        com.xoz.videoplayer.registerForContext(context);
    },

    showErrorScreen: function (videoId, errorTopLine, errorBottomLine) {
        this.init();

        $(this.xPathVideo + " .play").hide();

        $(this.xPathVideo + " .videoErrorscreen").show();
        $(this.xPathVideo + " .videoErrorscreen .topline").html(errorTopLine);
        $(this.xPathVideo + " .videoErrorscreen .bottomline").html(errorBottomLine);
    },

    leaveFullscreen: function (videoplayerInstance) {
        // workaround for firefox leaving fullscreen bug https://bugzilla.mozilla.org/show_bug.cgi?id=867967
        if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
            // Following workaround doesn't work for Android FF
            var $fullScreenElement = $(document.mozFullScreenElement);
            var $fullScreenElementParent = $fullScreenElement.parent();

            $fullScreenElementParent.prepend($fullScreenElement.detach());
        }

        videoplayerInstance.controls.leaveFullscreen();
    },


    // embed videoplayer


    prepareEmbeddedVideoplayer: function () {
        this.setTextColor();
        this.setBackgroundColor();
        this.setAutoplay();

        if (this.isEmbedAllowed == false) {
            $(this.xPathVideo).addClass("embed_disallow");
            $(this.xPathVideo + " .videoEmbedDisallowScreen").show();
            return false;
        }

        return true;
    },

    setBackgroundColor: function () {
        var backgroundColor = this.getUrlParameterValue('b');
        if (backgroundColor && this.isHexColor(backgroundColor)) {
            $('#content').css('background-color', '#' + backgroundColor);
        }
    },

    setTextColor: function () {
        var textColor = this.getUrlParameterValue('t');
        if (textColor && this.isHexColor(textColor)) {
            var cssStyle = $('<style>h1, .moreVideos { color: #' + textColor + ' !important; }</style>');
            $('html > head').append(cssStyle);
        }
    },

    setAutoplay: function () {
        var autoplay = this.getUrlParameterValue('a');
        var dataVideoSrc = $("#" + this.videoPlayerId).data('video');

        if (0 < autoplay.length && autoplay === 'true' || autoplay === 'false') {
            var newDataVideoSrc = '';

            // change autoplay attribute
            if (dataVideoSrc.indexOf('autoplay=') != -1) {
                newDataVideoSrc = this.updateURLParameter(dataVideoSrc, 'autoplay', autoplay);
            } else {
                var parameterSuffix = dataVideoSrc.indexOf('?') === -1 ? '?' : '&';
                newDataVideoSrc = dataVideoSrc + parameterSuffix + 'autoplay=' + autoplay;
            }
            $("#" + this.videoPlayerId).attr('data-video', newDataVideoSrc);
        }
    },

    // helper methods

    getUrlParameterValue: function (parameter, decode) {
        decode = decode || true;

        var currLocation = window.location.search,
            parArr = currLocation.split("?")[1].split("&"),
            returnBool = true;

        for (var i = 0; i < parArr.length; i++) {
            parr = parArr[i].split("=");
            if (parr[0] == parameter) {
                return (decode) ? decodeURIComponent(parr[1]) : parr[1];
            } else {
                returnBool = false;
            }
        }

        if (!returnBool) return false;
    },

    updateURLParameter: function (url, param, paramVal) {
        var newAdditionalURL = '';
        var tempArray = url.split('?');
        var baseURL = tempArray[0];
        var additionalURL = tempArray[1];
        var temp = '';
        if (additionalURL) {
            tempArray = additionalURL.split('&');
            for (i = 0; i < tempArray.length; i++) {
                if (tempArray[i].split('=')[0] != param) {
                    newAdditionalURL += temp + tempArray[i];
                    temp = '&';
                }
            }
        }

        var updatedParameter = temp + '' + param + '=' + paramVal;
        return baseURL + '?' + newAdditionalURL + updatedParameter;
    },

    isHexColor: function (color) {
        return typeof color === "string" && color.length === 6
            && /^[0-9A-F]{6}$/i.test(color);
    }

};
;(function ($) { // Anonyme Funktion ausführe, Scope setzen, Variablen "verstecken"
						var options = {};
						var Gallery = function (e, o) { // Gallery-Klasse
							var loaded, //Array der bereits geladenen Elemente
							puffer, // Puffer bis zum Weiterladen. Puffer 1: Bei Bild 3 schon das Laden ab Bild 4 starten
							toload, // Wieviele Bilder vorausladen (vorwärts)
							toloadBack, // Wieviele Bilder für rückwärts vorladen
							eleCount, // Maximale Elemente
							position, // Aktuelle Position in der Galerie
							counterCurrent, // DOM: Aktuelle Position
							counter, // DOM: Counter
							options, // zum Zusammenführen der Erweiterungen und Defaults
							gallery, // self
							items, // Elemente in der Galerie
							adCounter, // Werbung nach x Klicks laden
							adReloadCounter, // Werbung nach x Klicks reloaden
							adClick, // Click-Zaehler für Werbung
							adReload, // Click-Zaehler für Ad-Reload
							adElement, // DOM: Werbung
							adReloadElement, // DOM: Ad-Reload
							adLoaded, // Werbung geladen?
							channelName, // Channelname für Werbung
							id, // GalleryId für Werbung
							prev, // DOM prev
							content, // DOM: Content-Selektor
							url, // URL zum AJAX-Script
							track, // tracking data
							adVisible, // Werbung momentan angezeigt?
							enableEndscreen; // Endscreen anzeigen?
							this.init = function (e, o) { // Konstruktor
								var defaults = {
									'content': '.imagecontent', // Content-Selektor
									'loaded': [1, 2, 3, 10], // vorgeladene Elemente
									'toload': 4, // Wieviele Bilder vorwärts nachladen
									'toloadBack': 1, // Wieviele Bilder rückwärts nachladen
									'position': 1,
									'puffer': 1, // Puffer bis zum Weiterladen
									'url': '', // AJAX-URL
									'endscreenURL': '',
									'adCounter': 4, // Klicks bis Werbung
									'adReload': 7, // Klicks zum Ad-Reload
									'eleMax' : '' // Maximale Elemente
								}
								options = jQuery.extend(defaults, o); // Eigene Optionen mit Defauls zusammenführen
								gallery = $(e); // Referenz self
								if (!gallery) { // Keine Galerie gefunden -> Abbrechen
									return false;
								}
								// Options auslesen und zwischenspeichern
								adVisible = false;
								track = options.track;
								channelName = options.channelName;
								id = options.id;
								url = options.url;
								endscreenURL = options.endscreenURL; // Endscreen Ajax URL
								puffer = options.puffer;
								toload = options.toload;
								toloadBack = options.toloadBack;
								position = options.position;
								counterCurrent = $(".current", gallery);
								eleCount = options.eleMax == '' ? $(".max",gallery).html() : options.eleMax;
								prev = $(options.prev, gallery);
								counter = $(".zaehler", gallery);
								content = options.content;
								loaded = [];
								var il = options.loaded.length;
								while (il--) {
									loaded[options.loaded[il] - 1] = true;
								}
								items = $(content, gallery); // Einträge selektieren
								if (items.length < 1) { // Keine Einträge vorhanden?
									return false; // Abbrechen
								}
								adCounter = 0; // Werbungslogik deaktivieren
								adElement = $(".galleryAd", gallery); // DOM: Werbung setzen
								endElement = $(".endScreen", gallery); // DOM: Werbung setzen
								adReloadElement = $(".galleryAdReload", gallery); // DOM: Werbung setzen
								adCounter = options.adCounter-1; // Werbungslogik aktivieren, Klickanzahl setzen
								adClick = adCounter; // Klickanzahl setzen
								adReload = options.adReload-1;
								adReloadCounter = adReload;
								adLoaded = false; // Werbung noch nicht geladen
								displayEndScreen = false; // zeige Endscreen an
								endScreenAjaxCalled = false;
								//block=false;
							
								$(".content .imagewrapper, .galleryAd, .next, .endScreenShowAgainLink", gallery).live("click",function(event) { // Vorwärts-Click
									var ev = event;
									if((ev.target.tagName == "SPAN" && !($(ev.target.parentNode).hasClass("endScreenShowAgainLink"))) || (ev.target.tagName == "A" && ev.target.parentNode.tagName=="P") || ($(".endScreen", gallery).has(ev.target).length > 0)) {
										return true;
									}
									ev.stopPropagation();
									ev.preventDefault(); // Fallback-Href unterbinden, kein Springen
									if (!adLoaded) { // Werbung nicht geladen?
										if(adVisible) {
											adVisible = false;
											adClick++;
										}
										if (endscreenURL != '') { // Wenn Endsceen aktiv
											if (displayEndScreen) { // wenn endscreen angezeigt wurde
												position = 1; // Position auf erstes Element
												displayEndScreen = false; // endscreen wieder verbergen
											} else {
												if (eleCount == position) { // Position Max?
													displayEndScreen = true;
												} else {
													position++;
												}
											}
										} else {
											if (eleCount == position) { // Position Max?
												position = 1; // Position auf erstes Element
											} else {
												position++;
											}
										}
										if(content == ".imagecontent") {
											var p = (position - 1) + puffer;
											if (p < eleCount) {
												if (!loaded[p]) { // Bild an Position + Puffer noch nicht geladen?
													aLoad(1); // Nachladen Vorwärts
												}
											}
										}
									}
									updateItem();
								});
									
								$(".prev", gallery).click(function (event) { // Zurück-Click

									event.preventDefault(); // Fallback-Href unterbinden, kein Springen

									if (!adLoaded) { // Werbung nicht geladen?
										if(adVisible) {
											adVisible = false;
											adClick++;
										}
										if (endscreenURL != '') { // Wenn Endsceen aktiv
											if (displayEndScreen) { // wenn endscreen angezeigt wurde
												position = eleCount; // Position auf letztes Element
												displayEndScreen = false; // endscreen wieder verbergen
											} else {
												if (!(position - 1)) { // Position 1?
													displayEndScreen = true;
												} else {
													position--;
												}
											}
										} else {
											if (!(position - 1)) { // Position 1?
												position = eleCount; // Position auf letztes Element
											} else {
												position--;
											}
										}
										if(content == ".imagecontent") {
											var p = position > 1 ? (position - 1) - puffer : (eleCount - puffer); // Bei Position 1 auf max springen
											if (p) {
												if (!loaded[p]) { // Element an Position + Puffer noch nicht geladen?
													aLoad(0); // Nachladen rückwärts
												}
											}
										}
									}
									updateItem();
								});
						};

						function updateItem() {
							$(".header", gallery).not(".secondHeader").show(); // unschönes ein und ausblenden der header
							$(".secondHeader", gallery).hide(); // unschönes ein und ausblenden der header
							// Aktualisieren der Anzeige
							$(content, gallery).hide(); // Alle Elemente ausblenden
							$(".item" + (position), gallery).show(); // Nächstes Element anzeigen

							if(content == ".imagecontent") {
								$("meta[property='og:image']").attr("content",$("img",".item"+position).attr("src"));
							}
							$(counterCurrent).html(position); // Position im Counter setzen
							if (adLoaded) { // Werbung geladen und noch nicht angezeigt?
								showAd(); // Werbung anzeigen
							} else {
								if (typeof(getCounters) != "undefined") {
									getCounters(track);
								}
								$(counter).show(); // Counter anzeigen
								$(".share",gallery).show();
								if (adCounter) {  // Werbung aktiv?
									if (!adClick--) { // Noch Klicks zu tätigen bis Werbeeinblendung?
										loadAd(); // Werbung laden
									} 
								}
								if(adReloadCounter) {
									if(!adReload--) {
										// Werbeschnippsel tauschen
										adReload = adReloadCounter;
										adReloadElement.children("iframe").load( function () { // Wenn iFrame geladen
											if (el = document.getElementById("ad2")) {
												el.innerHTML = adReloadElement.children("iframe").contents().find("#bannerAd").html();
												$(el).show();
											}
											if (el = document.getElementById("ad3")) {
												el.innerHTML = adReloadElement.children("iframe").contents().find("#scyscraperAd").html();
												$(el).show();
											}
											if (el = document.getElementById("banner_1")) {
												el.innerHTML = adReloadElement.children("iframe").contents().find("#rectangleAd").html();
												$(el).show();
											}
										}).attr("src", "/adReload.html?r="+channelName+"&id="+id+"&s="+(new Date().getTime())); // Werbequelle setzen
									}
								}
							}

							if (displayEndScreen) { // zeige Endscreen, wenn am Ende
								showEndScreen();
							}
						}

						function loadAd() {
							// Werbung laden
							adElement.children("iframe").load( function () { // Wenn iFrame geladen
								adLoaded = true; // Indikator für fertig geladene Werbung setzen
							}).attr("src", "/adGallery.html?r="+channelName+"&id="+id+"&s="+(new Date().getTime())); // Werbequelle setzen
						}

						function showEndScreen() { // Werbung anzeigen
							// Hole Endscreen HTML
							if (!endScreenAjaxCalled) { // nur ajax call ausführen, wenn nicht schon vorher ausgeführt
								$.ajax({ // Nachladen vom Endscreen
									type: "GET", // Parameter nicht mitsenden, daher GET
									url: endscreenURL, // URL des AJAX-Scripts
									dataType: "html", // erwarteter Rückgabetyp
									success: function (data) {
										// Add Headlines Tabs
										var $endScreenHeadlineDiv = "<div class='endScreenHeadlines'>";

										var len = $(data).find(".header").not(".secondHeader").length;
										$(data).find(".header").not(".secondHeader").each(function (i) {
											$endScreenHeadlineDiv += "<a href='?"+$(this).text()+"' title='"+$(this).text()+"' data-tabId='"+i+"'>"+$(this).text()+"</a>";
											if (len != i+1)
												$endScreenHeadlineDiv += "<span class='seperator'>|</span>";
										});

										$endScreenHeadlineDiv += "</div>";
										// End: Add Headline Tabs

										$(".endScreen" ,gallery).html($endScreenHeadlineDiv+data);

										// Change HTML 
										$(gallery).prepend($(".widget.code.html", gallery).html()); // schreibt codewidget in headline

										$(".widget.code.html", gallery).remove(); // codewidget inhalt wieder aus content

										endScreenTabber();
										endScreenAjaxCalled = true;
									},
									error: function (data) { // Fehlerbehandlung
										//block=false;
									}
								});
							}
							$(".header", gallery).not(".secondHeader").hide(); // versteckt standartheader
							$(".secondHeader", gallery).show();
							$(content, gallery).hide(); // Alle Elemente ausblenden
							$(counter).hide(); // Counter ausblenden
							$(".share",gallery).hide();
							$(".socialMediaPopup",gallery).css('right','10000px');
							adElement.hide(); // Werbung verstecken
							endElement.show(); // Endscreen anzeigen
							adVisible = true;
							adLoaded = false; // Indikator wieder auf false -> weitere Werbung ermöglichen
							adClick = adCounter; // Zähler zurücksetzen
							$(".endScreen", gallery).show(); // Zeige Endscreen an
						}

						function endScreenTabber () {
							$(".endScreenHeadlines a:first", gallery).addClass("act"); // setze ersten link auf aktiv
							$(".widget.multimedia.teaserHorizontal:eq(0)", gallery).show(); // setze erste gallerie auf aktiv

							$(".endScreenHeadlines a", gallery).live("click",function(event) { // click event zur headline hinzufügen
								event.preventDefault(); // umgehe linksprung

								$(".endScreenHeadlines a", gallery).removeClass("act"); // auf standart zurücksetzen
								$(".widget.multimedia.teaserHorizontal", gallery).hide(); // auf standart zurücksetzen

								$(this).addClass("act", gallery); // act zum Link für Styling
								$(".widget.multimedia.teaserHorizontal:eq("+$(this).attr('data-tabId')+")", gallery).show(); // setze Container auf sichtbar
							});
						}

						function showAd() { // Werbung anzeigen
							$(content, gallery).hide(); // Alle Elemente ausblenden
							$(counter).hide(); // Counter ausblenden
							$(".share",gallery).hide();
							$(".socialMediaPopup",gallery).css('right','10000px');
							adElement.show(); // Werbung anzeigen
							endElement.hide(); // Endscreen anzeigen
							adVisible = true;
							adLoaded = false; // Indikator wieder auf false -> weitere Werbung ermöglichen
							adClick = adCounter; // Zähler zurücksetzen
						}

						function aLoad(richtung) { // Inhalt nachladen
							if (richtung) { // Richtung 0: rückwärts, Richtung 1: vorwärts -> hier: vorwärts
								var n = Math.min(toload, eleCount - (position + 1)); // weniger Bilder übrig, als geladen werden sollen?
								var tmpPos=position;
								//block = true;
								$.ajax({ // Nachladen der Bilder
									type: "POST", // Parameter mitsenden, daher POST
									url: url, // URL des AJAX-Scripts
									dataType: "html", // erwarteter Rückgabetyp
									data: "index=" + (position + 1) + "&count=" + n,
									success: function (data) { // Datenladen erfolgreich
										var l = 0; // temporärer Zähler
										$(data).filter("div").each( function () { // Rückgabedaten verarbeiten, mit jedem Element folgendes tun:
											if(!loaded[tmpPos]+l) {
											$(".item" + (tmpPos+l), gallery).after(this); // Element im DOM an entsprechender Stelle einfügen
											loaded[tmpPos + l] = true; // Array der bereits geladenen Elemente aktualisieren
											l++;
											}
										});
										//block = false;
										if(!$(".imagecontent").filter(function() {
											return $(this).css("display") == "block"}
										).length) {
											$(".item" + (position), gallery).show();
										}
									},
									error: function (data) { // Fehlerbehandlung
										//block=false;
									}
								});
							} else { // Rückwärts nachladen
								var n = Math.min(toloadBack, position - 1); // weniger Bilder übrig, als geladen werden sollen?
								var tmpPos=position;
								//block=true;
								$.ajax({ // Nachladen der Bilder
									type: "POST", // Parameter mitsenden, daher POST
									url: url, // URL des AJAX-Scripts
									dataType: "html", // erwarteter Rückgabetyp
									data: "index=" + (position - 1) + "&count=-" + n,
									success: function (data) { // Datenladen erfolgreich
										var l = 0; // temporärer Zähler
										$(data).filter("div").each( function () { // Rückgabedaten verarbeiten, mit jedem Element folgendes tun
											l--;
											if (!loaded[tmpPos - 1 + (l)]) { // Element an Position noch nicht geladen?
												$(".item" + tmpPos, gallery).before(this); // Element im DOM an Stelle einfügen
												loaded[tmpPos - 1 + l] = true; // Array der bereis geladenen Elemente aktualisieren
											}
										});
										//block = false;
										if(!$(".imagecontent").filter(function() {
											return $(this).css("display") == "block"}
										).length) {
											$(".item" + (position), gallery).show();
										}
									},
									error: function (data) { // Fehlerbehandlung
										//block=false;
									}
								});
							}
						}
						this.init(e, o); // Konstruktor
					};
									
					$.fn.WON_GalleryPlugin = function (options) { // jQuery.fn um Plugin erweitern
						options = options || {};
						return this.each( function () { // This returnen, um jQuery-Chainabiliy zu sichern
							new Gallery($(this), options) // neues Objekt erzeugen
						});
					};
				})(jQuery);;jQuery(document).ready(function() {
    window.com = window.com || {}, window.com.xoz = window.com.xoz || {}, window.com.xoz.config = {
        baseUrl: publicationUrl,
        core_path: "skins/welt/js/"+jsVersion+"/de.xoz.videoplayer.core",
        layouts: {
            welt: "xoz/videoplayer/modules/controls/Welt"
        },
        css_files: {
          welt: "skins/welt/css/"+cssVersion+"/player_welt.css"
        },
		flashvars : {
			autoplay	: 'true'
		},
        labels: {
            error: {
                top_line: "Es tut uns leid, ein Fehler ist aufgetreten.",
                bottom_line: "Das Video konnte nicht abgespielt werden. Bitte laden Sie die Seite erneut.",
                invalid_top_line: "Ihre Sitzung ist abgelaufen, bitte laden Sie die Seite erneut.",
                invalid_bottom_line: "<a href='#'>Diese Seite neu laden</a>",
                flash_top_line: "Bitte installieren Sie die neueste Version des Flash Plugins.",
                flash_bottom_line: "<a href='http://get.adobe.com/de/flashplayer/' target='_blank'>Zum Download</a>",
                geo_top_line: "Dieses Video ist aus rechtlichen Gr\u00fcnden<br/>nur aus Deutschland abrufbar.",
                geo_bottom_line: "Wir bitten um Ihr Verst\u00E4ndnis"
            }
        },
        defaults: {
            flash_player: {
                url: "skins/welt/flash/"+cssVersion+"/BildTvMain.swf"
            },
            "default": {
                layout: "widget",
                log_level: 0,
                enable_ios_autoplay: !0
            },
            use_html5_player: {
                firefox: !1,
                chrome: !1,
                ie: !1,
                ie10: !1,
                safari: !1
            },
            tracking: {
                timeupdate_intervall: 10
            },
            fallback: {
                preview_image: "http://placehold.it/1280x760&text=Fallback"
            },
            flash_detection: {
                enable: !0,
                version: "10.1"
            },
            vast_ads: {
                enable: !0,
                timeout: 1e4,
                preroll_format_id: 9446,
                postroll_format_id: 9448

}
        }
    }, require.config({
        baseUrl: window.com.xoz.config.baseUrl + "skins/welt/js/"+jsVersion+"/",
        paths: {
            xozVideoplayerWeltCore: window.com.xoz.config.baseUrl + window.com.xoz.config.core_path
        }
    }), require([ "xozVideoplayerWeltCore" ], function() {});
});;
;(function ($) { 
	var Infografik = function (e, o) {
		var infografik;
		var maps = [];
		var configs = [];
		var pathes = [];
		var infos = [];
		var mapdata = [];
		var colors = [];
		var config;
		var raphael;
		var date;
		var selection;
		var depth = 0;
		var layerOnTimer,layerOffTimer;
		var scaleFactor = 1;
		var meta;
		var viewboxW;
		var viewboxH;
		this.init = function (e, o) { 
			infografik = $(e)
// Konstruktor

			if (!o || !e) {

				return false;
			}
getConfig(o);
}
		// Konstruktor

// variablen in klasse oder objekt
function getMap(url,dataUrl) {
	if ( typeof maps[url] != "undefined") {
//			console.log("map schon vorhanden",url);
			createSVG(maps[url], url);
			getData(dataUrl, url);
	} else {
//		console.log("lade neu",url);
		$.ajax({
			type : "GET",
			dataType : "json",
			url : url,
			success : function(data) {
//				console.log("success");
				maps[url] = data;
				createSVG(data, url);
				getData(dataUrl, url);
			},error:function(data) {
//				console.log("error");
//				console.log(data);
			}
		
		});
	}
}

function getData(url, mapUrl) {
	if ( typeof mapdata[url] != "undefined") {
//				console.log("schon vorhanden mapdata "+url+' '+mapUrl);
//              console.log(mapdata[url]);
				populateMap(mapdata[url], mapUrl);

	} else {
//				console.log("neue daten");

		$.ajax({
			type : "GET",
			dataType : "json",
			url : url,
			success : function(data) {
//						console.log("success");
				mapdata[url] = data;
				populateMap(data, mapUrl);
			},
			error : function() {
//						console.log("error");

			}
		});
	}
}
function createSVG(json, url) {
	//raphael = Raphael('igrafik', 395, 520);
// erkennen, an welcher position die grafik platziert ist
if(infografik.hasClass("storyLead")) {
//console.log("artikel aufmacher");
//viewboxW = 395;
viewboxW = 418;
viewboxH = 520;
} else {
viewboxW = 418;
viewboxH = 475;
}
// todo: default wert definieren
meta = json.meta;
var parent = $('.igrafik .container',infografik);



if($("svg",infografik).length) {
		$("svg",infografik).remove();
} else if ($('.igrafik').children(".container").children('div:not(.overlayPositioner)').length) {
		$('.igrafik').children("container").children('div:not(.overlayPositioner)').remove()

//		console.log("entferne alte karte");
	}
	//$('.igrafik').children(".container").css("width",meta.width);
if(typeof meta.width != "undefined" && typeof meta.height != "undefined") {
//	console.log("meta infos gefunden");
//	console.log("META:",meta.width,meta.height);
//	console.log("VIEWBOX:",viewboxW,viewboxH);
//    raphael = Raphael(parent[0], meta.width, meta.height);
    raphael = Raphael(parent[0], viewboxW, viewboxH);

} else {
//	console.log("kein artikel aufmacher");

raphael = Raphael(parent[0], viewboxW, viewboxH);
}
	raphael.safari();
	//raphael.setViewBox(0,0,395,520,true); // muss abhängig von platzierung passieren
//	console.log(viewboxW,viewboxH);
	
	raphael.setViewBox(0,0,meta.width,meta.height,true); // muss abhängig von platzierung passieren
//    raphael.setViewBox(0,0,viewboxW,viewboxH,false);


//    console.log(viewboxW +' / '+meta.width);
    //scaleFactor = viewboxW / parseInt(meta.width);
    
    scaleFactor = Math.min(viewboxH / parseInt(meta.height),viewboxW / parseInt(meta.width));
    //console.log(scaleFactor);
    //console.log(scaleFactor);
//	console.log(scaleFactor);

	attr = {
		'stroke' : '#fff', // 
		'stroke-width' : 1,
		'stroke-linejoin' : 'round'
	};
	for (var item in json) {
		var it = json[item];
		var p = raphael.path(it.path);
		var short = it.short;
		p.attr(attr);



		//p.data("info",);
		if ( typeof pathes[url] == "undefined") {
			pathes[url] = {};
		}
		//test eval("pathes[url]." + short + " = p");
		pathes[url][short]= p;
				//todo: map durch config ersetzen
			if(!depth) {
				populateSecondLevel(p,short);
			}
		//infos[short] = it.overlay;
		//console.log(it);
	//	infos[short].label = it.label;
	infos[short] = it;
	}
	
	$(".igrafik",infografik).fadeIn(300);
	if (!$(".backbutton",infografik).length) {
//		console.log("kein button");
		var button = '<div class="backbutton"></div>';
		$(infografik).append(button);
//		console.log(infografik);
		$(infografik).on("click",".backbutton",function(e) {
			switchMap("root",e);
		});
	}
	
}

function populateInfos(path,data,name,short) {
	var highSize = config.label.high.length;
	var lowSize = config.label.low.length;
	var label = "<span class='name'>"+name+"</span>";
	var high='<div class="topinfo">';
	var low='<div class="info">';
	var arrow='<div class="arrow"></div>'
	var i;

	for (i = 0; i < highSize; i++) {
		high+='<span class="label">'+config.label.high[i]+'</span><span class="value">'+data.cols[i]+'</span>';
	}
	high += "</div>";
	for (var u = 0; u < lowSize; u++) {
		low+='<span class="label">'+config.label.low[u]+'</span><span class="value">'+data.cols[i+u]+'</span>';
	}
	low += "</div>";
	var info = label+high+low+arrow;
	
	path.hover(function(e) {
		if(path != selection && typeof selection != "undefined") {
			//selection.attr("fill",selection.data("fillcolor"));
			selection.attr("stroke","#fff");
		}
		//path.attr("fill",path.data("hovercolor"));
		path.attr("stroke","#003957");
		selection = path;
		//alert("ie");
		if(!$.browser.msie) {path.toFront();}
		//selection = path;
		layerOnTimer = setTimeout(function() {
			highlightSelection(path,info,e,short);
		},350);
	},function (e) {
		
		clearTimeout(layerOnTimer);

		if (!e) var e = window.event;
		var tg = (window.event) ? e.srcElement : e.target;
		if (tg.nodeName != 'path' && tg.nodeName != 'shape') {
			return;
		}
		
		var reltg = (e.relatedTarget) ? e.relatedTarget : e.toElement;
		if ($(reltg).hasClass("graficData")) { //console.log("gefunden1");
		return; }
		while (reltg != tg && !$(reltg).hasClass('infografik') && typeof reltg != "undefined" && reltg != null) {
			reltg= reltg.parentNode;
		if ($(reltg).hasClass("graficData")) { 
			return; }
		}
		// Mouseout took place when mouse actually left layer
		// Handle event
		//path.attr("fill",path.data("fillcolor"));
		path.attr("stroke","#fff");
				//glow.remove();
		removeSelection();

		//$("#igrafik").unbind("mousemove");
	});

	
}
function setOverlayHover() {

$(".graficData",infografik).hover (function() {},function (e) {
	if (!e) var e = window.event;
	var tg = (window.event) ? e.srcElement : e.target;
	if (!$(tg).hasClass('graficData')) return;
	var reltg = (e.relatedTarget) ? e.relatedTarget : e.toElement;
	if (reltg.nodeName == "path" || reltg.nodeName == "shape") { 
			if (reltg == selection[0]) {


		return;
			}
		 }
	while (reltg != tg && !$(reltg).hasClass('infografik')) {
		reltg = reltg.parentNode;
	if ((typeof reltg != "undefined" && reltg != null) && (reltg.nodeName == "path" || reltg.nodeName == "shape")) { //console.log("gefunden4");
	if (reltg == selection[0]) {


		return;
			} }
	}
	
	selection.attr("stroke","#fff");
	//selection.attr("fill",selection.data("fillcolor"));
	
	removeSelection();
	
	/*
			clearTimeout(layerOffTimer);
			selection.attr("fill",selection.data("hovercolor"));
			if(typeof glow != "undefined") {
				glow.remove();
			}
	//path.attr("stroke","#fff");
			selection.toFront();
			test=path;
			selection.attr("fill","#f00");
			glow = path.glow({width:7,opacity:0.2});
		},function() {
			selection.attr("fill",selection.data("fillcolor"));
			glow.remove();
			layerOffTimer = setTimeout(function() {
				$("#graficData").unbind("hover");
				removeSelection(selection,selection.attr("fill"));
			},300);	
		});
			clearTimeout(layerOffTimer);
			layerOnTimer = setTimeout(function () {
		},300);
*/
});
$("shape",infografik).css("cursor","pointer");
}


function highlightSelection(path,info,e,short) {
//console.log("highlight");
	showInfo(info,e,short);
    if (!depth) {
//      console.log('overlay ckick '+depth);
	    $(".graficData",infografik).unbind("click").click(function (e) {
//console.log("click");
//console.log(short);
		    switchMap(short,e);
	    });
    } else {
      $(".graficData",infografik).unbind("click");
    }
}
function removeSelection() {
hideInfo();
}
function showInfo(info,ev,short) {
	//var top = ev.pageY-offsetIgraficY;
	//var left = ev.pageX-offsetIgraficX;
	// mousemove in namespace, damit andere listener nicht entfernt werden
	/*if(top > 255) {
		$("#graficData").css({left:left-105,top:top-160}).removeClass("arrowTop").addClass("arrowBottom");
		} else {
		$("#graficData").css({left:left-105,top:top+30}).removeClass("arrowBottom").addClass("arrowTop");
		}
			$("#graficData").html(info).show();

	$("#igrafik").mousemove(function(ev) {
		top = ev.pageY-offsetIgraficY;
		left = ev.pageX-offsetIgraficX;
		if(top > 255) {
		$("#graficData").css({left:left-105,top:top-160}).removeClass("arrowTop").addClass("arrowBottom");
		} else {
		$("#graficData").css({left:left-105,top:top+30}).removeClass("arrowBottom").addClass("arrowTop");
		}
	});*/

var left = infos[short].overlay.left;
var top = infos[short].overlay.top;

var overlay = $(".overlayPositioner",infografik);
var gr = $(".graficData",overlay);
$(gr).removeClass("arrowBottom arrowTop");

//console.log('overlay top/left: '+top+' '+left);
//console.log(((scaleFactor*meta.height)-viewboxW)/2);
//console.log((418-(scaleFactor*528))/2);
var overlayOffsetX = 0;
var overlayOffsetY = 0;
if (viewboxH / parseInt(meta.height) < viewboxW / parseInt(meta.width)) {
	//console.log("breite");
	overlayOffsetX = Math.abs(((scaleFactor*meta.width)-viewboxW)/2);
} else {
	//console.log("hoehe");
	overlayOffsetY = Math.abs(((scaleFactor*meta.height)-viewboxH)/2);
}

//console.log(overlayOffsetY);
if(top > 250) {
	
	$(overlay).css({left:parseInt(left*scaleFactor+overlayOffsetX)+"px",top:parseInt(top*scaleFactor+overlayOffsetY)+"px"});

	$(".graficData",overlay).addClass("arrowBottom");
} else {
	$(overlay).css({left:parseInt(left*scaleFactor+overlayOffsetX)+"px",top:parseInt(top*scaleFactor+overlayOffsetY)+"px"});
	$(".graficData",overlay).addClass("arrowTop");
}
$(".graficData",overlay).html(info);
$(gr).fadeIn(250,"swing");

}
function hideInfo() {
	var overlay = $(".overlayPositioner",infografik);
	$(".graficData",overlay).fadeOut(250,"swing");
}
function evalCondition(condition, value) {
//console.log(condition);
//		console.log(condition.from);
//		console.log(condition.to);
//		console.log(value);
	var c = value + ">"+condition.from+"&&"+value+"<="+condition.to;
//				console.log("-----");

		return(eval(c));
}


function populateMap(data, url) {
    // Kennzeichnung Fußnote
    var stars = ['*','**'];
	//var legendeHTML='';
	var total = data.total;
	//fehlerhandling falls config.date leer
	var description = $(".legende",infografik);
	date = total.date;
	$(".label-1",description).html(total.name);
	$(".label-2",description).html(date);
	// config.label.high durchlaufen, je nach anzahl

//    console.log('populateMap config ');
//    console.log(config);
	for(var u=0;u<5;u++) {
		if(typeof total[u] == "undefined") {
			break;
		}
	}
	
	$(".box",description).hide();
	for (var i=0;i<u;i++) {
		$(".box .description",description).eq(i).html(config.label.total[i][0]);
		$(".box .value",description).eq(i).html(total[i][0][0]);
		if (typeof config.label.total[i][1] != "undefined") {
        	$(".box .value").eq(i).prepend('<span class="icn" style="background-image: url(\''+ config.label.total[i][1] +'\');"></span>');
        }
		
		if(total[i].length > 1 && typeof total[i][1][0] != "undefined") {
        	$(".box .difference",description).eq(i).html(total[i][1][0]+"<sup></sup>");
        		if (typeof total[i][1][1] != "undefined" && typeof config.sup[total[i][1][1]] != "undefined") {
        			$(".box .difference sup",description).eq(i).html(stars[total[i][1][1]]);
        		}
        }
        $(".box",description).eq(i).show();
	}
	//if(config.label.total.length>0) { 
		
    // Icon vor Wert Box 1
//    console.log('icon1 '+config.label.total[0][1]);
  
    //if( typeof total[0][1][0])
	
    //if (typeof data.total[0][1][1] != "undefined" && typeof config.sup[total[0][1][1]] != "undefined") {
      //  $(".box .difference sup",description).eq(0).html(stars[total[0][1][1]]);
        //console.log("1",stars[total[0][1][1]]);
    //}
   /* $(".box .description",description).eq(1).html(config.label.total[1][0]);
	$(".box .value",description).eq(1).html(total[1][0][0]);
    // Icon vor Wert Box 2
    if (typeof config.label.total[1][1] != "undefined") {
        $(".box .value").eq(1).prepend('<span class="icn" style="background-image: url(\''+ config.label.total[1][1] +'\');"></span>');
    }
    $(".box .difference",description).eq(1).html(total[1][1][0]+"<sup></sup>");
    if (typeof data.total[1][1][1] != "undefined" && typeof config.sup[total[1][1][1]] != "undefined") {
        $(".box .difference sup",description).eq(1).html(stars[total[1][1][1]]);
               // console.log("2",stars[total[1][1][1]]);

    } else {
	     $("br",description).eq(1).remove()
    }
	*/
	//$("#legende")
	// kapseln für diagrammtypen
	var farboutput = '';
	for (var ind = 0; ind < config.colors.length; ind++) {
	
		farboutput += '<div class="item"><span class="cl" style="background-color:'+config.colors[ind].color+'"> </span><span class="label">'+config.colors[ind].text+'</span></div>';
		
	}
	$(".source .difference",description).remove();
	for(var o=config.sup.length-1;o+1>0;o--) {
			$(".source",description).prepend("<div class='difference'>");
        }
        for(var i=0;i<config.sup.length;i++) {
            $(".source .difference",description).eq(i).html("<sup>"+stars[i]+"</sup>"+config.sup[i]);
        }
    	$(".colors .header  ~ .item",description).remove();
		$(".colors .header",description).after(farboutput);
        $(".source .quelle",description).html(config.source);
		$(".colors .header",description).html(config.title);
		//	continue;
		
		//farboutput += '<div class="item"><span class="cl" style="background-color:'+config.colors[config.description[value].color-1].color+'"> </span><span class="label">'+config.description[value].text+'</span></div>';
	
//	console.log("remove");

	// alte werte löschen, wenn neue karte geladen, sonst verkettung
	colors = [];
	for (var c=0;c<config.colors.length;c++) {
	/*	console.log(c);
		console.log("from"+config.colors[c].condition.from);
		console.log("--");
	*/	colors.push([config.colors[c].condition, config.colors[c].color]);
	}
	//for (label in )
	/*for (marker in config.legende) {
		legendeHTML += config.legende[marker].text;
	}*/
	//$("#legende").html(legendeHTML);
	for (short in data) {
		//console.log(short);
		//console.log(pathes[url][short]);
		if (short != "total" && short != "date" && short != "name" && typeof pathes[url][short] != "undefined") {
			//test eval("populateInfos(pathes[url]." + short + ",data." + short+",config.marker[short])");
			populateInfos(pathes[url][short],data[short],data[short].label,short);

			for (var color = 0; color<colors.length; color++) {
				if(evalCondition(colors[color][0],data[short].value)) {
				//test if(eval("evalCondition(colors[color][0],data." + short + ".value)")) {
					var color = colors[color][1];
					//test eval("pathes[url]." + short + ".attr('fill', color)");
					pathes[url][short].attr('fill', color);

//var fillcolor = Raphael.getRGB(color);
//	var factor = 1.1;
	//var newR = fillcolor.r*factor > 255 ? 255 : fillcolor.r*factor;
	//var newG = fillcolor.g*factor > 255 ? 255 : fillcolor.g*factor;
	//var newB = fillcolor.b*factor > 255 ? 255 : fillcolor.b*factor;
//pathes[url][short].data("fillcolor",color);
//pathes[url][short].data("hovercolor","rgb("+newR+","+newG+","+newB+")");

					break;
				}
			}
		}
	}
	$(infografik).removeClass("loading");
	setOverlayHover();
}
function populateSecondLevel(path,short) {
	//console.log(path);
	//console.log(short);
	path.click(function (e){
		switchMap(short,e);
	});
}
function switchMap(short,e) {
//pathSet.animate({opacity: 0}, 150);
//console.log("switchmap "+short);
//console.log("target "+ e.srcElement);
removeSelection();
var configurl = config.maps[short];
//console.log(configurl);
if((typeof configurl == "undefined" || configurl == "") && (short != "root")) {
	return;
}

    hideInfo();
    //console.log("hide");
    $(".igrafik", infografik).fadeOut(150, function () {
        $(infografik).addClass("loading");
        if (short == "root") {
            $(".backbutton", infografik).hide();
            depth = 0;
            getConfig("start");
        } else if (typeof configurl != "undefined") {
            $(".backbutton", infografik).show();
            depth = 1;
            getConfig(configurl);
        }
    });
}

        function parseConfig(config) {
	var type = config.type;
	if(type == "map" && typeof config.mapUrl != "undefined" && typeof config.dataUrl != "undefined") {
		getMap(config.mapUrl,config.dataUrl);
	}
}
function getConfig(url) {
	//todo schon config vorhanden?
if(typeof configs[url] != "undefined") {
	//console.log("config schon vorhanden "+url);
//    console.log(configs[url]);

    config = configs[url];
	parseConfig(configs[url]);
} else {
$.ajax({
			type : "GET",
			dataType : "json",
			url : url,
			success : function(data) {
			//	console.log("success aus getconfig");
				config = data;
				
				if(typeof configs["start"] == "undefined") {
					configs["start"] = data;
				} 
				configs[url] = data;	
				parseConfig(data);
			}
		});
}
}
this.init(e, o); 
}
	$.fn.Infografik = function (options) { // jQuery.fn um Plugin erweitern
//		console.log("infografik");
		options = options || {};
		return this.each( function () { // This returnen, um jQuery-Chainability zu sichern
//					console.log("infografik gefunden");

			new Infografik($(this), options) // neues Objekt erzeugen
		});
	};



//getMap("mapGermany.json");
// todo skalierung in html ausgeben / script übergeben. positionierungsdaten per script
})(jQuery);
;/**
 * 
 * @author Adrian Ramin <adrian.ramin@asideas.de>
 * 
 * @uses jQuery
 * 
 */
asms.general.ece.widgets.icon = (function($, window, document) {
  var _options = {};

  // wrap all child elements of aufmacher element in order to draw a border around them
  function wrapArtAufmacherInDivForDrawingBorder() {
    // wrap big portrait elements
    var $pictureGalleryDiv = $('#icon #artAufmacher.bigLandscape');
    if(0 < $pictureGalleryDiv.length) {
      $pictureGalleryDiv.children().not('.tsrImg').wrapAll('<div class="borderAufmacher"></div>');
    }

    // wrap picture gallery elements and add new css class to aufmacher div
    var $slideshowDiv = $('#icon #artAufmacher.slideshow');
    if(0 < $slideshowDiv.length) {
      $slideshowDiv.children().wrapAll('<div class="borderAufmacher"></div>');
      $slideshowDiv.addClass('borderAdded');
    }
  }

  // initialize sticky sidebar
  function initStickySidebar() {
    var $sidebarDiv = $('#stickySidebar');
    var $articleDiv = $('.grid_7.column-2').eq(0);
    
    if(0 === $sidebarDiv.length || 0 === $articleDiv.length) {
      return;
    }

    // check if sidebar needs to be positioned
    $(window).scroll(function(evt) {
        var sidebarTopDistance = $sidebarDiv.offset().top;
        var articleTopDistance = $articleDiv.offset().top;
        var maxScrollDistance = articleTopDistance + $articleDiv.outerHeight() - $sidebarDiv.outerHeight();
        var sidebarTopDistanceAfterEndOfArticle = $articleDiv.outerHeight() - $sidebarDiv.outerHeight();
        
        var currentScrollDistance = $(this).scrollTop();
        
        if (currentScrollDistance > articleTopDistance) {
          // place sidebar at the current scrolling position
          if (currentScrollDistance < maxScrollDistance) {
              $sidebarDiv.addClass('fixed').removeAttr('style');
            } else
            { // place sidebar at the end of the article div 
              $sidebarDiv.removeClass('fixed').css({
                    position: 'absolute',
                    top: sidebarTopDistanceAfterEndOfArticle + 'px'
                });
            }
        } else
        { // place sidebar at initial position
          $sidebarDiv.removeClass('fixed');
        }
    });
  }

  // let facebook, twitter and google links open in popup window
  function initPopupLinksInStickySidebar() {
    // overwrite inline onclick attribute (hotfix)
    $('#stickySidebar .content .twitter a, #stickySidebar .content .fbook a, #stickySidebar .content .google a').attr('onclick', '');
    
    // add click listener
    $('#stickySidebar .content .twitter a, #stickySidebar .content .fbook a, #stickySidebar .content .google a').click(function(e) {
        e.preventDefault();
        window.open(this.href, '_blank', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=600,height=480');
        return false;
    });
  }

  function initIconArticlePage() {
    initStickySidebar();
    initPopupLinksInStickySidebar();
  }

  function initAuthorName() {
    var $authorNameDiv = $('#main .widget.authorTeaserWidget.onlyName .authorName');

    if(0 === $authorNameDiv) {
      return;
    }

    var paddingTop = 0;
    var $title = $('#main h1');
    var $headlineSeparator = $('#main .headlineSeperator');

    paddingTop += $title.outerHeight(true) + $headlineSeparator.outerHeight(true) + 10;

    $authorNameDiv.css({
      'padding-top': paddingTop,
      'display': 'block'
    });
  }

  /* public methods */
  var methods = {
    init : function(newOptions) {
      // extend options
      _options = $.extend(_options, newOptions || {});
    },
    initIconArticlePage: initIconArticlePage,
    wrapArtAufmacherInDivForDrawingBorder: wrapArtAufmacherInDivForDrawingBorder,
    initAuthorName: initAuthorName
  };

  return methods;
})(asms.jQuery(), window, document);