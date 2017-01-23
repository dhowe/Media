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

if (typeof inFIF != "undefined") {
	document.write = function(str) {
		__ADTECH_CODE__ += str;
	};
	document.writeln = function(str) {
		document.write(str + "\n");
	};
	__theDocument = parent.document;
	__theWindow = parent;
}
document.write("<a href=\"https://secserv.adtech.de/adlink/1147/5202192/0/16/AdId=11318259;BnId=1;itime=30282822;nodecode=yes;link=\" target=\"_blank\"><img src=\"https://aka-cdn.adtech.de/apps/499/Ad11318259St3Sz16Sq106860749V0Id1/transparent_pixel.gif\" border=\"0\" alt=\"\" title=\"\"></a>\n");
function cleanUp() {
 if (typeof __parent.swappedRefs5202192 == "undefined") {
   __parent.swappedRefs5202192 = new Array();
 }
   
 while (__parent.swappedRefs5202192.length > 0) {
   var ref = __parent.swappedRefs5202192.pop();
   if (ref != "swappedRefs5202192") {
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
         && ref != "frameElement" && ref != "event" && ref != "swappedRefs5202192" && ref != "onunload") {
     try {__parent[ref] = window[ref]; __parent.swappedRefs5202192.push(ref);} catch (e) {}
  } 
 }  
}


if (typeof inFIF != "undefined" && inFIF) {
	__flushCode();
}

if (typeof inFIF != "undefined" && inFIF == true) {
try {parent.write = write;
} catch (e) {}try {parent.writeln = writeln;
} catch (e) {}try {parent.__flushCode = __flushCode;
} catch (e) {}}


