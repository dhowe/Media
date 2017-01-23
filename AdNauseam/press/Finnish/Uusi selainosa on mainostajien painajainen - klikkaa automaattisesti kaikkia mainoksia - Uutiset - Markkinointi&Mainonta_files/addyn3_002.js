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
document.write("<style type=\"text/css\">\n");
document.write("#nm_native {height:280px; background-color:#f4ede7}\n");
document.write("#nm_head {background:url(http://aka-cdn-ns.adtech.de/apps/446/Ad13378494St3Sz1726Sq108848431V26Id1/ut-logo.png); background-repeat:no-repeat; background-color:#383838; color:#f4ede7; font-family:\"Trebuchet\"; font-size:11px; padding:5px 20px 5px 0; text-align:right;}\n");
document.write("#nm_img {float:left; padding: 5px; font-family:\"Book Antiqua\"; background-color:#f4ede7; height:250px;}\n");
document.write("#nm_text {float:right;  font-family:\"Trebuchet MS\";  padding:5px; background-color:#f4ede7; height:250px; overflow: hidden;}\n");
document.write("#nm_foot {color:#000000; font-family:\"Trebuchet MS\"; height:0px;width:540px; background-color:#f4ede7;}\n");
document.write("a#nm_link {font-size:16px; font-family:\"Trebuchet MS\"; text-decoration:none;}\n");
document.write("h1#nm_h1 {font-size:16px; font-family:\"Trebuchet MS\"; font-weight:bold; color:#383838;line-height:17px;}\n");
document.write("p#nm_p {font-size:14px; font-family:\"Trebuchet MS\"; margin:0; color:#383838; line-height:20px;text-align:left;}\n");
document.write("p a#nm_native {font-weight:bold; font-family:\"Trebuchet MS\"; text-decoration:none; color:#666; margin-left:5px; padding:none; font-size:12px;text-align:left;}\n");
document.write("</style>\n");
document.write("<div id=\"nm_native\" style=\"width:545px\";>\n");
document.write("	<div id=\"nm_head\">\n");
document.write("YHTEISTY&Ouml;KUMPPANIN TUOTTAMAA SIS&Auml;LT&Ouml;&Auml;\n");
document.write("	</div>\n");
document.write("		<div id=\"nm_img\" style=\"width:263px\";>\n");
document.write("		<a href=\"http://adserver.adtech.de/adlink|360|5149415|0|1726|AdId=13378494;BnId=1;itime=30538447;nodecode=yes;link=http://adserver.adtech.de/?adlink|3.0|360|1010314|1|16|AdId=13378493;BnId=1;link=http://hyotytieto.fonecta.fi/digitaalinen-markkinointi/millainen-tulevaisuuden-media?edsacid=p-dsp-nv-mavibig-marmai-natiivi\" target=\"_blank\"><img src=\"http://aka-cdn-ns.adtech.de/apps/446/Ad13378494St3Sz1726Sq108848431V26Id1/fonecta-digitalist-01.jpg\"/></a>\n");
document.write("		<a id=\"nm_link\" href=\"http://adserver.adtech.de/adlink|360|5149415|0|1726|AdId=13378494;BnId=1;itime=30538447;nodecode=yes;link=http://adserver.adtech.de/?adlink|3.0|360|1010314|1|16|AdId=13378493;BnId=1;link=http://hyotytieto.fonecta.fi/digitaalinen-markkinointi/millainen-tulevaisuuden-media?edsacid=p-dsp-nv-mavibig-marmai-natiivi\" target=\"_blank\"><h1 id=\"nm_h1\" style=\"text-align:left\">Sinä olet media</h1>\n");
document.write("		<p id=\"nm_p\">Digitalist Future Media Forumin puhujien pääviesti oli selvä: Tulevaisuudessa yksi media on ylitse muiden. Se olet sinä.\n");
document.write("		</p></a>\n");
document.write("		<p style=\"text-align:left;font-family:Trebuchet MS;\"><a href=\"http://adserver.adtech.de/adlink|360|5149415|0|1726|AdId=13378494;BnId=1;itime=30538447;nodecode=yes;link=http://adserver.adtech.de/?adlink|3.0|360|1010314|1|16|AdId=13378493;BnId=1;link=http://hyotytieto.fonecta.fi/digitaalinen-markkinointi/millainen-tulevaisuuden-media?edsacid=p-dsp-nv-mavibig-marmai-natiivi\" style=\"text-align:left\" target=\"_blank\">» Lue lisää.</a></p>\n");
document.write("		</div>\n");
document.write("	<div id=\"nm_text\" style=\"width:262px\";>\n");
document.write("		<a href=\"http://adserver.adtech.de/adlink|360|5149415|0|1726|AdId=13378494;BnId=1;itime=30538447;nodecode=yes;link=http://adserver.adtech.de/?adlink|3.0|360|1010314|1|16|AdId=13378493;BnId=2;link=http://hyotytieto.fonecta.fi/digitaalinen-markkinointi/mediatrendit-2016-kuuma-kuumempi-ohjelmallinen-ostaminen?edsacid=p-dsp-nv-mavibig-marmai-natiivi\" target=\"_blank\"><img src=\"http://aka-cdn-ns.adtech.de/apps/446/Ad13378494St3Sz1726Sq108848431V26Id1/kohdennus.jpg\"/></a>\n");
document.write("		<a id=\"nm_link\" href=\"http://adserver.adtech.de/adlink|360|5149415|0|1726|AdId=13378494;BnId=1;itime=30538447;nodecode=yes;link=http://adserver.adtech.de/?adlink|3.0|360|1010314|1|16|AdId=13378493;BnId=2;link=http://hyotytieto.fonecta.fi/digitaalinen-markkinointi/mediatrendit-2016-kuuma-kuumempi-ohjelmallinen-ostaminen?edsacid=p-dsp-nv-mavibig-marmai-natiivi\" target=\"_blank\"><h1 id=\"nm_h1\" style=\"text-align:left\">&quot;Vaadimme kohdennusta!&quot;</h1>\n");
document.write("		<p id=\"nm_p\">Ohjelmallinen ostaminen polttelee näppejä. Kuinka vastata koveneviin vaatimuksiin laadukkaasta kohdentamisesta?</p>\n");
document.write("		</a>\n");
document.write("		<p style=\"text-align:left;font-family:Trebuchet MS;\"><a href=\"http://adserver.adtech.de/adlink|360|5149415|0|1726|AdId=13378494;BnId=1;itime=30538447;nodecode=yes;link=http://adserver.adtech.de/?adlink|3.0|360|1010314|1|16|AdId=13378493;BnId=2;link=http://hyotytieto.fonecta.fi/digitaalinen-markkinointi/mediatrendit-2016-kuuma-kuumempi-ohjelmallinen-ostaminen?edsacid=p-dsp-nv-mavibig-marmai-natiivi\" style=\"text-align:left\" target=\"_blank\">» Lue lisää</a></p>\n");
document.write("		</div>\n");
document.write("	</div>\n");
document.write("<img src=\"http://track.adform.net/adfserve/?bn=8421366;1x1inv=1;srctype=3;ord=[timestamp]\" border=\"0\" width=\"1\" height=\"1\"/>\n");
function cleanUp() {
 if (typeof __parent.swappedRefs5149415 == "undefined") {
   __parent.swappedRefs5149415 = new Array();
 }
   
 while (__parent.swappedRefs5149415.length > 0) {
   var ref = __parent.swappedRefs5149415.pop();
   if (ref != "swappedRefs5149415") {
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
         && ref != "frameElement" && ref != "event" && ref != "swappedRefs5149415" && ref != "onunload") {
     try {__parent[ref] = window[ref]; __parent.swappedRefs5149415.push(ref);} catch (e) {}
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


