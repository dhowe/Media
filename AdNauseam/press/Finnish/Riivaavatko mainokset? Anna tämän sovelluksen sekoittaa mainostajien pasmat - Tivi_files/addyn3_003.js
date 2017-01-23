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
document.write("<iframe src=\"http://talentum-sales-html5.s3.amazonaws.com/HP1015_2/Intel_BladesGen9_Tivi_980x400/index.html\" width=\"980\" height=\"400\" frameborder=\"0\" hspace=\"0\" vspace=\"0\" marginheight=\"0\" marginwidth=\"0\" scrolling=\"no\" ></iframe>\n");
function cleanUp() {
 if (typeof __parent.swappedRefs5567585 == "undefined") {
   __parent.swappedRefs5567585 = new Array();
 }
   
 while (__parent.swappedRefs5567585.length > 0) {
   var ref = __parent.swappedRefs5567585.pop();
   if (ref != "swappedRefs5567585") {
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
         && ref != "frameElement" && ref != "event" && ref != "swappedRefs5567585" && ref != "onunload") {
     try {__parent[ref] = window[ref]; __parent.swappedRefs5567585.push(ref);} catch (e) {}
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


document.write("<scr"+"ipt src=\""+(window.location.protocol=='https:' ? "https://aka-cdn.adtechus.com" : "http://aka-cdn-ns.adtechus.com")+"/media/moat/adtechbrands092348fjlsmdhlwsl239fh3df/moatad.js#moatClientLevel1=360&moatClientLevel2=14636&moatClientLevel3=0&moatClientLevel4=5567585&zMoatMaster=13248527&zMoatFlight=13248582&zMoatBanner=108868768&zURL=http&zMoatPlacementId=5567585&zMoatAdId=13248582&zMoatCreative=0&zMoatBannerID=1&zMoatCustomVisp=50&zMoatCustomVist=1000&zMoatIsAdvisGoal=0&zMoatEventUrl=&zMoatSize=1441&zMoatSubNetID=0&zMoatisSelected=1&zMoatadServer=adserver.adtech.de&zMoatadVisServer=&zMoatSamplingRate=23&zMoatliveTestCookie=&zMoatRefSeqId=pw1DLYBAJFA\" type=\"text/javascript\"></scr"+"ipt>");
