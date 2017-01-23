(function() {
	asmi.pageSet.kruxId = (asmi.pageSet.kruxId == "fallback")?{
		//// general setting fallback till page uses own config.js
		'www.bild.de': 'IaeXTaus',		//bild.de
		'www.welt.de': 'IaeXdO9D',		//welt.de
		'www.abendblatt.de': 'IaeXw_Sx',		//hamburgerabendblatt.de
		'www.morgenpost.de': 'IaeX79SN',		//berlinermorgenpost.de
		'www.computerbild.de': 'IaeXjg_0',		//computerbild.de
		'www.autobild.de': 'IaeXlgqY',		// autobild.de
		'www.meinestadt.de': 'IaeXZltG',		// meinestadt.de
		'jobs.meinestadt.de': 'IaeXZltG',		// meinestadt.de
		'www.sportbild.de': 'IaeXneK5',		// sportbild.de
		'www.kaufda.de': 'IaeX1cTb',		// kaufda.de
		'www.musikexpress.de': 'IaeYgcYy',		// musikexpress.de
		'www.bildderfrau.de': 'IaeYAPBo',		// bildderfrau.de
		'www.my-entdecker.de': 'IaeYa4-Y',		// my-entdecker.de
		'www.stylebook.de': 'IaeYYyXd' // stylebook.de
	}:asmi.pageSet.kruxId;
	var kId = asmi.pageSet.kruxId[document.domain] || asmi.pageSet.kruxId;
	var krxScr = document.createElement('script');
	krxScr.id=kId;
	krxScr.dataId=kId;
	krxScr.className="kxct";
	krxScr.dataTiming="async";
	krxScr.dataVersion="1.9" ;
	krxScr.type="text/javascript";
	document.getElementsByTagName('head')[0].appendChild(krxScr);
	window.Krux||((Krux=function(){Krux.q.push(arguments)}).q=[]);
	(function(){
		var k=document.createElement('script');k.type='text/javascript';k.async=true;
		var m,src=(m=location.href.match(/\bkxsrc=([^&]+)/))&&decodeURIComponent(m[1]);
		k.src = /^https?:\/\/([^\/]+\.)?krxd\.net(:\d{1,5})?\//i.test(src) ? src : src === "disable" ? "" :
		(location.protocol==="https:"?"https:":"http:")+"//cdn.krxd.net/controltag?confid="+kId;
		var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(k,s);
	}());

	// krux InterchangeDirect Integration
	window.Krux || ((Krux = function () {
		Krux.q.push(arguments);
	}).q = []);
	(function () {
		function retrieve(n) {
			var m, k = 'kx' + n;
			if (window.localStorage) {
				return window.localStorage[k] || "";
			} else if (navigator.cookieEnabled) {
				m = document.cookie.match(k + '=([^;]*)');
				return (m && unescape(m[1])) || "";
			} else {
				return '';
			}
		}
		var kvs = [];
		Krux.user = retrieve('user');
		if (Krux.user) {
			kvs.push('u=' + Krux.user);
		}
		Krux.segments = retrieve('segs') && retrieve('segs').split(',') || [];
		for (var i = 0; i < Krux.segments.length; i++) {
			kvs.push('ksgmnt=' + Krux.segments[i]);
		}
		Krux.dartKeyValues = kvs.length ? kvs.join(';') + ';' : '';
	})();
	if (window.Krux.dartKeyValues) {
		if (typeof(kruxkey) != "undefined") {kruxkey = ";" + window.Krux.dartKeyValues;}
		asmi.sas.prtnKeys += window.Krux.dartKeyValues;
	}
})();