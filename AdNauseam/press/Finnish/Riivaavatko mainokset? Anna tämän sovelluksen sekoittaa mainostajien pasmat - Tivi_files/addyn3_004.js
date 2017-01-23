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
document.write("<iframe src=\"http://talentum-sales-html5.s3.amazonaws.com/HP1015_2/Intel_BladesGen9_Tivi_468x400/index.html\" width=\"468\" height=\"400\" frameborder=\"0\" hspace=\"0\" vspace=\"0\" marginheight=\"0\" marginwidth=\"0\" scrolling=\"no\" ></iframe>\n");
function cleanUp() {
 if (typeof __parent.swappedRefs5567584 == "undefined") {
   __parent.swappedRefs5567584 = new Array();
 }
   
 while (__parent.swappedRefs5567584.length > 0) {
   var ref = __parent.swappedRefs5567584.pop();
   if (ref != "swappedRefs5567584") {
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
         && ref != "frameElement" && ref != "event" && ref != "swappedRefs5567584" && ref != "onunload") {
     try {__parent[ref] = window[ref]; __parent.swappedRefs5567584.push(ref);} catch (e) {}
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
} catch (e) {}try {parent.__flushCode = __flushCode;
} catch (e) {}try{__restoreOverwrittenFuncs();}catch(e){}}


