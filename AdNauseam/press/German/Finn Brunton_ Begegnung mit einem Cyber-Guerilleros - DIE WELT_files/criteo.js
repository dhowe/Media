(function(){
	var crtg_nid = '1101';
	var crtg_cookiename = 'crtg_rta';
	var crtg_varname = 'crtg_content';

	function crtg_getCookie(c_name) {
		var i, x, y, ARRCookies = document.cookie.split(";");
		for (i = 0; i < ARRCookies.length; i++) {
			x = ARRCookies[i].substr(0, ARRCookies[i].indexOf("="));
			y = ARRCookies[i].substr(ARRCookies[i].indexOf("=") + 1);
			x = x.replace(/^\s+|\s+$/g, "");
			if (x == c_name) {
				return unescape(y);
			}
		}
		return '';
	}
	var crtg_content = crtg_getCookie(crtg_cookiename);
	var crtg_rnd = Math.floor(Math.random() * 99999999999);
	if (!sas_w.document.getElementById('critoScr')) {
		(function () {
			var crtg_url = location.protocol + '//rtax.criteo.com/delivery/rta/rta.js?netId=' + escape(crtg_nid);
			crtg_url += '&cookieName=' + escape(crtg_cookiename);
			crtg_url += '&rnd=' + crtg_rnd;
			crtg_url += '&varName=' + escape(crtg_varname);
			var crtg_script = document.createElement('script');
			crtg_script.type = 'text/javascript';
			crtg_script.src = crtg_url;
			crtg_script.async = true;
			crtg_script.id = "critoScr";
			if (document.getElementsByTagName("head").length > 0) document.getElementsByTagName("head")[0].appendChild(crtg_script);
			else if (document.getElementsByTagName("body").length > 0) document.getElementsByTagName("body")[0].appendChild(crtg_script);
		})();
	}

	asmi.sas.getCriteoKey = function(a) {
			if (a == 3648 && crtg_content.indexOf(';crth728=1;') != -1) {
				return ';crth728';
			} else if (a == 3650 && (crtg_content.indexOf(';crth160=1;') != -1 || crtg_content.indexOf(';crth120=1;') != -1)) {
				return ';crthSky';
			} else if (a == 4459 && crtg_content.indexOf(';crth300=1;') != -1) {
				return ';crth300';
			} else {return '';}
	}
})()