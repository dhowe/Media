__ADTECH_CODE__ = "";
__theDocument = document;
__theWindow = window;
__bCodeFlushed = false;

function __flushCode() {
	if (!__bCodeFlushed) {
		var span = parent.document.createElement("SPAN");
		span.innerHTML = __ADTECH_CODE__;
		window.frameElement.parentNode.appendChild(span);
		__bCodeFlushed = true;
	}
}

if (typeof inFIF != "undefined" && inFIF) {
    document.nativeWrite = document.write;
    document.nativeWriteln = document.writeln;
	document.write = function(str) {
		__ADTECH_CODE__ += str;
	};
	document.writeln = function(str) {
		document.write(str + "\n");
	};
	__theDocument = parent.document;
	__theWindow = parent;
}
document.write("<img src=\"https://s79.research.de.com/bb-mx/prime?pjid=126425&place=123053246&cpid=9083788&size=1x1&mod=1&dur=0&sek=30&swf=0&tm=30283552\" />\n");
document.write("<img src=\"https://s79.research.de.com/bb-mx/prime?pjid=126425&place=123053246&cpid=9083788&size=1x1&mod=13&dur=25&sek=30&swf=0&tm=30283552\" />\n");
document.write("<img src=\"https://s79.research.de.com/bb-mx/prime?pjid=126425&place=123053246&cpid=9083788&size=1x1&mod=13&dur=50&sek=30&swf=0&tm=30283552\" />\n");
document.write("<img src=\"https://s79.research.de.com/bb-mx/prime?pjid=126425&place=123053246&cpid=9083788&size=1x1&mod=13&dur=75&sek=30&swf=0&tm=30283552\" />\n");
document.write("<img src=\"https://s79.research.de.com/bb-mx/prime?pjid=126425&place=123053246&cpid=9083788&size=1x1&mod=2&dur=100&sek=30&swf=0&tm=30283552\" />\n");



document.write("<img src=\"https://aka-cdn.adtech.de/apps/339/Ad13288275St3Sz277Sq108822617V29Id1/clear.gif\" width=1 height=1 style=\"margin-top: -1\" id=\"5202217adTracking\">\n");
document.write("<scr"+"ipt>\n");
document.write("(function() {\n");
document.write("\"use strict\";\n");
document.write("var lastResult = 0;\n");
document.write("var parentContainer;\n");
document.write("var adID = '5202217adRollover';\n");
document.write("var trackingID = '5202217adTracking';\n");
document.write("var portraitImage = \"\";\n");
document.write("var portraitImageHeight = \"\";\n");
document.write("var portraitImageWidth = \"\";\n");
document.write("var portraitImageAspec = portraitImageHeight/portraitImageWidth;\n");
document.write("var landscapeImage = \"\";\n");
document.write("var landscapeImageHeight = \"\";\n");
document.write("var landscapeImageWidth = \"\";\n");
document.write("var landscapeImageAspec = landscapeImageHeight/landscapeImageWidth;\n");
document.write("var backgroundStyle = \"\";\n");
document.write("var backgroundColor = \"\";\n");
document.write("var adURL = \"http://adserver.adtech.de/?adlink|3.0|1147|5580835|1|16|AdId=13349086;BnId=1;link=https://ad.doubleclick.net/ddm/trackclk/N34502.1979701WIRED.DE/B9083788.123053246;dc_trk_aid=296139106;dc_trk_cid=65702469\";\n");
document.write("var html5URL = \"https://aka-cdn.adtech.de/apps/339/Ad13288275St3Sz277Sq108822617V29Id1/video.html\";\n");
document.write("var respectAspecRatio = false;\n");
document.write("var ieForceFallback = false;\n");
document.write("var peepholeClassName = 'ad-peephole';\n");
document.write("var hiddenClassName = 'hidden';\n");
document.write("var peepholes = __theDocument.getElementsByClassName(peepholeClassName);\n");
document.write("var pushMenues = __theDocument.getElementsByClassName('push-menu');\n");
document.write("if (pushMenues.length > 0 ) {\n");
document.write("var i = 0;\n");
document.write("while (pushMenues[i]) {\n");
document.write("pushMenues[i].style.zIndex = '2000';\n");
document.write("i++;\n");
document.write("}\n");
document.write("}\n");
document.write("// Date Polyfill\n");
document.write("if (!Date.now) {\n");
document.write("Date.now = function() { return new Date().getTime(); };\n");
document.write("}\n");
document.write("// IE Browser Detection\n");
document.write("var IE = (function() {\n");
document.write("if (__theDocument.documentMode) {\n");
document.write("return __theDocument.documentMode;\n");
document.write("}\n");
document.write("else {\n");
document.write("for (var i = 7; i > 4; i--) {\n");
document.write("var div = __theDocument.createElement(\"div\");\n");
document.write("div.innerHTML = \"\";\n");
document.write("if (div.getElementsByTagName(\"span\").length) {\n");
document.write("div = null;\n");
document.write("return i;\n");
document.write("}\n");
document.write("}\n");
document.write("}\n");
document.write("return undefined;\n");
document.write("})();\n");
document.write("// Debounce function\n");
document.write("function debounce(func, wait, immediate) {\n");
document.write("var timeout;\n");
document.write("return function() {\n");
document.write("var context = this, args = arguments;\n");
document.write("var later = function() {\n");
document.write("timeout = null;\n");
document.write("if (!immediate) func.apply(context, args);\n");
document.write("};\n");
document.write("var callNow = immediate && !timeout;\n");
document.write("clearTimeout(timeout);\n");
document.write("timeout = setTimeout(later, wait);\n");
document.write("if (callNow) func.apply(context, args);\n");
document.write("};\n");
document.write("};\n");
document.write("// event Handler\n");
document.write("var addEvent = function (elem, type, eventHandle) {\n");
document.write("if (elem == null || typeof(elem) == 'undefined') return;\n");
document.write("if (elem.addEventListener) {\n");
document.write("elem.addEventListener(type, eventHandle, false);\n");
document.write("} else if (elem.attachEvent) {\n");
document.write("elem.attachEvent(\"on\" + type, eventHandle);\n");
document.write("} else {\n");
document.write("elem[\"on\" + type] = eventHandle;\n");
document.write("}\n");
document.write("};\n");
document.write("// Function to resize Iframe ad to take the full space we need / get\n");
document.write("var resizeIframeAd = debounce(function() {\n");
document.write("var ad = __theDocument.getElementById(adID);\n");
document.write("if (ad) {\n");
document.write("var adHeight = window.innerHeight-100;\n");
document.write("ad.parentNode.style.height = (adHeight+100).toString()+'px';\n");
document.write("ad.parentNode.style.paddingTop = \"60px\";\n");
document.write("ad.parentNode.style.fontSize =  \"0px\";\n");
document.write("ad.parentNode.style.lineHeight = \"0px\";\n");
document.write("ad.style.height = adHeight.toString()+'px';\n");
document.write("ad.style.width = window.innerWidth.toString()+\"px\";\n");
document.write("ad.setAttribute('src', html5URL+'?t='+Date.now());\n");
document.write("}\n");
document.write("}, 250);\n");
document.write("// Function to resize div ad to take the full space we need / get\n");
document.write("var resizeAd = debounce(function() {\n");
document.write("var ad = __theDocument.getElementById(adID);\n");
document.write("if (ad) {\n");
document.write("var adHeight = window.innerHeight-100;\n");
document.write("if (window.innerWidth > window.innerHeight) {\n");
document.write("ad.style.backgroundImage = \"url(\" + landscapeImage + \")\";\n");
document.write("ad.style.backgroundSize = backgroundStyle;\n");
document.write("ad.style.backgroundColor = backgroundColor;\n");
document.write("ad.style.backgroundRepeat = \"no-repeat\";\n");
document.write("ad.style.backgroundPosition = \"center center\";\n");
document.write("if(respectAspecRatio === true){\n");
document.write("adHeight = window.innerWidth * landscapeImageAspec;\n");
document.write("}\n");
document.write("}\n");
document.write("else {\n");
document.write("ad.style.backgroundImage = \"url(\" + portraitImage + \")\";\n");
document.write("ad.style.backgroundSize = backgroundStyle;\n");
document.write("ad.style.backgroundColor = backgroundColor;\n");
document.write("ad.style.backgroundRepeat = \"no-repeat\";\n");
document.write("ad.style.backgroundPosition = \"center center\";\n");
document.write("if(respectAspecRatio === true){\n");
document.write("adHeight = window.innerWidth * portraitImageAspec;\n");
document.write("}\n");
document.write("}\n");
document.write("ad.parentNode.style.height = (adHeight+60).toString()+'px';\n");
document.write("ad.parentNode.style.paddingTop = \"60px\";\n");
document.write("ad.parentNode.style.fontSize =  \"0px\";\n");
document.write("ad.parentNode.style.lineHeight = \"0px\";\n");
document.write("ad.style.height = adHeight.toString()+'px';\n");
document.write("ad.style.width = window.innerWidth.toString()+\"px\";\n");
document.write("if (peepholes.length > 0 && respectAspecRatio === true) {\n");
document.write("var i = 0;\n");
document.write("while (peepholes[i]) {\n");
document.write("peepholes[i].style.height = (adHeight+40).toString()+'px';\n");
document.write("i++;\n");
document.write("}\n");
document.write("}\n");
document.write("}\n");
document.write("}, 250);\n");
document.write("// Check for the gap and remove hidden class\n");
document.write("function openGap() {\n");
document.write("if (peepholes.length > 0) {\n");
document.write("var i = 0;\n");
document.write("var re = new RegExp(\"\\\\b\" + hiddenClassName + \"\\\\b\", \"g\");\n");
document.write("while (peepholes[i]) {\n");
document.write("peepholes[i].className = peepholes[i].className.replace(re, '');\n");
document.write("i++;\n");
document.write("}\n");
document.write("}\n");
document.write("}\n");
document.write("// Add a click event to peephole\n");
document.write("function linkGap() {\n");
document.write("if (peepholes.length > 0) {\n");
document.write("var i = 0;\n");
document.write("while (peepholes[i]) {\n");
document.write("peepholes[i].style.cursor = 'pointer';\n");
document.write("addEvent(peepholes[i], 'click', function(){\n");
document.write("window.open(\"https://secserv.adtech.de/adlink/1147/5202217/0/277/AdId=13288275;BnId=1;itime=30283552;nodecode=yes;link=\"+\"https://secserv.adtech.de/adlink/1147/5202217/0/277/AdId=13288275;BnId=1;itime=30283552;nodecode=yes;link=\"+adURL, '_blank');\n");
document.write("});\n");
document.write("i++;\n");
document.write("}\n");
document.write("}\n");
document.write("}\n");
document.write("// Check visibility for the ad\n");
document.write("function checkVisibility(elem){\n");
document.write("var total = window.innerHeight;\n");
document.write("var start = window.scrollY - total;\n");
document.write("var end = window.scrollY + total;\n");
document.write("var topOffset = elem.offsetTop;\n");
document.write("if(topOffset > start && topOffset < end ){\n");
document.write("if(window.scrollY == elem.offsetTop){\n");
document.write("return 100;\n");
document.write("}\n");
document.write("else if(window.scrollY  > topOffset) {\n");
document.write("var visible = window.scrollY - topOffset;\n");
document.write("return parseInt(100-(visible/(total/100)), 10) ;\n");
document.write("}\n");
document.write("else{\n");
document.write("var visible =  topOffset - window.scrollY;\n");
document.write("return parseInt(100-(visible/(total/100)), 10) ;\n");
document.write("}\n");
document.write("}\n");
document.write("return 0;\n");
document.write("}\n");
document.write("// Message visibility to iframe\n");
document.write("function msgToIframe(){\n");
document.write("var result = 0;\n");
document.write("if (peepholes.length > 0) {\n");
document.write("var i = 0;\n");
document.write("while (peepholes[i]) {\n");
document.write("result = Math.max(checkVisibility(peepholes[i]));\n");
document.write("i++;\n");
document.write("}\n");
document.write("}\n");
document.write("if(result != lastResult){\n");
document.write("lastResult = result;\n");
document.write("var ad = __theDocument.getElementById(adID);\n");
document.write("if(ad){\n");
document.write("ad.contentWindow.postMessage(result, '*');\n");
document.write("}\n");
document.write("}\n");
document.write("}\n");
document.write("// Inject Iframe\n");
document.write("function injectIframeAd(){\n");
document.write("var iframe = __theDocument.createElement('iframe');\n");
document.write("iframe.setAttribute(\"scrolling\", \"no\");\n");
document.write("iframe.setAttribute(\"frameborder\", \"0\");\n");
document.write("iframe.setAttribute(\"marginheight\", \"0\");\n");
document.write("iframe.setAttribute(\"marginwidth\", \"0\");\n");
document.write("iframe.setAttribute(\"id\", adID);\n");
document.write("parentContainer.appendChild(iframe);\n");
document.write("}\n");
document.write("// Inject Image\n");
document.write("function injectAd(){\n");
document.write("var div = __theDocument.createElement('div');\n");
document.write("div.setAttribute(\"id\", adID);\n");
document.write("parentContainer.appendChild(div);\n");
document.write("div.style.cursor = 'pointer';\n");
document.write("addEvent(div, 'click', function(){\n");
document.write("window.open(\"https://secserv.adtech.de/adlink/1147/5202217/0/277/AdId=13288275;BnId=1;itime=30283552;nodecode=yes;link=\"+\"https://secserv.adtech.de/adlink/1147/5202217/0/277/AdId=13288275;BnId=1;itime=30283552;nodecode=yes;link=\"+adURL, '_blank');\n");
document.write("});\n");
document.write("}\n");
document.write("// Inject Label\n");
document.write("function injectLabel(){\n");
document.write("var div = __theDocument.createElement('div');\n");
document.write("div.setAttribute(\"style\", \"padding: 0 20px; line-height: 40px; font-family: AvenyT, Helvetica, sans-serif; font-weight: 600; font-size: 18px;\");\n");
document.write("div.style.textAlign = 'left';\n");
document.write("if('standard' === 'invert'){\n");
document.write("div.style.color = 'white';\n");
document.write("div.style.backgroundColor = 'black';\n");
document.write("}\n");
document.write("div.innerHTML = \"ANZEIGE\";\n");
document.write("parentContainer.appendChild(div);\n");
document.write("}\n");
document.write("jQuery(document).ready(function(){\n");
document.write("parentContainer = __theDocument.getElementById(trackingID).parentNode;\n");
document.write("if( (IE && IE < 11) || (IE && ieForceFallback === true) || (html5URL == 'https://aka-cdn.adtech.de/apps/339/Ad13288275St3Sz277Sq108822617V29Id1/null') ){\n");
document.write("var trackingImg = __theDocument.getElementById(trackingID);\n");
document.write("if(trackingImg){\n");
document.write("trackingImg.src = \"https://ad.doubleclick.net/ddm/trackimp/N34502.1979701WIRED.DE/B9083788.123053246;dc_trk_aid=296139106;dc_trk_cid=65702469;ord=30283552?\".replace('30283552', Date.now());\n");
document.write("}\n");
document.write("addEvent(window, \"orientationchange\", resizeAd);\n");
document.write("addEvent(window, \"resize\", resizeAd);\n");
document.write("openGap();\n");
document.write("if(IE && IE < 11){\n");
document.write("linkGap();\n");
document.write("}\n");
document.write("injectAd();\n");
document.write("injectLabel();\n");
document.write("resizeAd();\n");
document.write("}\n");
document.write("else{\n");
document.write("var trackingImg = __theDocument.getElementById(trackingID);\n");
document.write("if(trackingImg){\n");
document.write("trackingImg.src = \"https://ad.doubleclick.net/ddm/trackimp/N34502.1979701WIRED.DE/B9083788.123053246;dc_trk_aid=296139106;dc_trk_cid=65702469;ord=30283552?\".replace('30283552', Date.now());\n");
document.write("}\n");
document.write("addEvent(window, \"orientationchange\", resizeIframeAd);\n");
document.write("addEvent(window, \"resize\", resizeIframeAd);\n");
document.write("addEvent(window, \"scroll\", msgToIframe);\n");
document.write("openGap();\n");
document.write("injectIframeAd();\n");
document.write("injectLabel();\n");
document.write("resizeIframeAd();\n");
document.write("}\n");
document.write("});\n");
document.write("})();\n");
document.write("</scr"+"ipt>\n");
function cleanUp() {
 if (typeof __parent.swappedRefs5202217 == "undefined") {
   __parent.swappedRefs5202217 = new Array();
 }
   
 while (__parent.swappedRefs5202217.length > 0) {
   var ref = __parent.swappedRefs5202217.pop();
   if (ref != "swappedRefs5202217") {
     __parent[ref] = null;
   }
 }
}

if (typeof inFIF != "undefined" && inFIF == true) {
 __parent = window.parent;
 window.onunload = cleanUp;
 cleanUp();

 for (var ref in window) {
   if ((typeof __parent[ref] == "undefined" || __parent[ref] == null) 
         && ref != "frameElement" && ref != "event" && ref != "swappedRefs5202217" && ref != "onunload") {
     try {__parent[ref] = window[ref]; __parent.swappedRefs5202217.push(ref);} catch (e) {}
  } 
 }  
}

function __restoreOverwrittenFuncs() {
document.write = document.nativeWrite;
document.writeln = document.nativeWriteln;
}

if (typeof inFIF != "undefined" && inFIF) {
	__flushCode();
}

if (typeof inFIF != "undefined" && inFIF == true) {
try {parent.write = write;
} catch (e) {}try {parent.writeln = writeln;
} catch (e) {}try {parent.now = now;
} catch (e) {}try {parent.later = later;
} catch (e) {}try {parent.addEvent = addEvent;
} catch (e) {}try {parent.__flushCode = __flushCode;
} catch (e) {}try {parent.debounce = debounce;
} catch (e) {}try {parent.openGap = openGap;
} catch (e) {}try {parent.linkGap = linkGap;
} catch (e) {}try {parent.checkVisibility = checkVisibility;
} catch (e) {}try {parent.msgToIframe = msgToIframe;
} catch (e) {}try {parent.injectIframeAd = injectIframeAd;
} catch (e) {}try {parent.injectAd = injectAd;
} catch (e) {}try {parent.injectLabel = injectLabel;
} catch (e) {}try{__restoreOverwrittenFuncs();}catch(e){}}


