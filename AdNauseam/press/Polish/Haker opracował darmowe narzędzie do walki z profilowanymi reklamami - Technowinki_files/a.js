

//;/

if (typeof(nslog_onet) === 'undefined') nslog_onet = {s:''};
nslog_onet.s += ' XE';

if(typeof(ns_global_vars) === 'undefined'){
	ns_global_vars = {};
}
if(ns_global_vars.gummiDetectBrowser === undefined){
	ns_global_vars.gummiDetectBrowser = function(){
	   var ua = navigator.userAgent.toLowerCase();
	   var makeVersion = function(result){
	     return parseInt(result[1]) * 1000 + parseInt(result[2]);
	   }
	   ;
	   
	   if (function(){
	     return ua.indexOf('webkit') != -1;
	   }
	   ())
	     return 'safari';
	   if (function(){
	     return ua.indexOf('msie') != -1 && document.documentMode >= 10;
	   }
	   ())
	     return 'ie10';
	   if (function(){
	     return ua.indexOf('msie') != -1 && document.documentMode >= 9;
	   }
	   ())
	     return 'ie9';
	   if (function(){
	     return ua.indexOf('msie') != -1 && document.documentMode >= 8;
	   }
	   ())
	     return 'ie8';
	   if (function(){
	     return ua.indexOf('gecko') != -1;
	   }
	   ())
	     return 'gecko1_8';
	   
	   return 'unknown';
	 };
}








