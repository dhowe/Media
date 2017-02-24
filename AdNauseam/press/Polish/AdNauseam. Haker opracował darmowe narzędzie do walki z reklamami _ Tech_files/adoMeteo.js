var adoVars; // gdyby byl jakis mega problem z js'em

var adoMeteo = function() 
{
	thisObject = this;

	this.scriptDomain = 'http://s.tvn.pl/';
	this.scriptQuery = '';

	this.thisScript = false;

	this.cookieValue;
	this.callback;

	this.init = function()
	{
		var allScripts = document.getElementsByTagName('script');
		for (var i = 0; i < allScripts.length; i++) {
			if (allScripts[i].src.match('adoMeteo.js')) {
				this.thisScript = allScripts[i];
				break;
			}
		}

		if (this.thisScript) {
			var tmpScriptDomain = this.thisScript.src.match(/(https?:\/\/[^\/]+\/)/);
			if (tmpScriptDomain && tmpScriptDomain.length > 1) {
				this.scriptDomain = tmpScriptDomain[1];
			}
			var tmpScriptQuery = this.thisScript.src.match(/.*\?(.*)/);
			if (tmpScriptQuery && tmpScriptQuery.length > 1) {
				this.scriptQuery = tmpScriptQuery[1];
			}
		}
		//console.log(scriptQuery);

		this.varName 	= this.getParam('varName');
		this.cookieName = this.getParam('cookieName');
		this.ckLifetime = this.getParam('cookieLifetime');
		this.callback 	= this.getParam('callback');

		if (!this.varName) {
			this.varName = 'adoVars';
		}
		if (!this.cookieName) {
			this.cookieName = 'tvn_weather';
		}
		if (!this.ckLifetime) {
			this.ckLifetime = 3600;
		}
		if (this.callback) {
			try {
				this.callback = eval(this.callback);
			} catch (e) {
			}
		}

		this.cookieValue = this.getCookie(this.cookieName);
		//this.setCookie(this.cookieName, false, -50000);
		//console.log(this.cookieValue);

		if (!this.cookieValue || this.cookieValue == '' || this.cookieValue == '0' || this.cookieValue == 'false') {
			var xmlhttp = this.xhrObject();
			if (typeof window.XDomainRequest !== 'undefined') {
				xmlhttp.onload = function()
				{
					thisObject.receiveResponse(xmlhttp);
				}
			} else {
				xmlhttp.onreadystatechange = function()
				{
					if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
						thisObject.receiveResponse(xmlhttp);
					}
				}
			}

			xmlhttp.open("GET", "http://s.tvn.pl/adoMeteo.php" +(this.scriptQuery ? '?' + this.scriptQuery + '&uaq563' : '?uaq563'), true);
			//xmlhttp.open("GET", "http://statictvn.rc.online.tvwisla.com.pl/adoMeteo.php" +(this.scriptQuery ? '?' + this.scriptQuery + '&uaq563' : '?uaq563'), true);
			xmlhttp.send();
		} else {
			this.finalize();
		}

		//console.log('window.'+ this.varName +' = '+ this.cookieValue +';');
		//console.log(this.cookieValue);
	}

	this.getParam = function(key)
	{
		var re = new RegExp('.*\?.*'+ key +'=([^\?&=]+)');
		var matched = this.thisScript.src.match(re);
		if (matched && matched[1]) {
			return matched[1];
		}
		return false;
	}

	this.xhrObject = function()
	{
		var xmlHttp;
		try{
			if (typeof window.XDomainRequest !== 'undefined') { // ie
				xmlHttp = new window.XDomainRequest();
			} else {
				xmlHttp = new XMLHttpRequest();
			}
		} catch(e) {
			try {
				xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				try {
					xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
				} catch(e) {
					return false;
				}
			}
		}
		return xmlHttp;
	}
	
	this.receiveResponse = function(xmlhttp)
	{
		this.cookieValue = xmlhttp.responseText;
		this.setCookie(this.cookieName, this.cookieValue, this.ckLifetime);
		this.finalize();
	}

	this.setCookie = function(c_name,value,exp)
	{
		if (!exp) {
			exp = 0;
		}
		var exdate = new Date(new Date().getTime()+(exp*1000));
		var c_value = escape(value) + ((exp <= 0) ? "" : "; expires="+exdate.toUTCString()+'; path=/');
		document.cookie=c_name + "=" + c_value;
	}

	this.getCookie = function(c_name)
	{
		var i,x,y,ARRcookies=document.cookie.split(";");
		for (i=0;i<ARRcookies.length;i++) {
			x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
			y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
			x=x.replace(/^\s+|\s+$/g,"");
			if (x==c_name) {
				return unescape(y);
			}
		}
	}

	this.finalize = function()
	{
		eval('if (typeof window.'+ this.varName +' == "undefined") { window.'+ this.varName +' = {}; }');
		eval('if (typeof window.adoVarsMeteo == "undefined") { window.adoVarsMeteo = {}; }');
		eval('var tmpArr = '+ this.cookieValue +';');
		
		/*Przykładowe parametry do testowania*/
		//eval('var tmpArr = {"tvn_w_i":1,"tvn_w_p":102200,"tvn_w_r":0,"tvn_w_h":3700,"tvn_w_s":0,"tvn_w_t":29415,"tvn_w_w":1400,"tvn_w_t_s2":"cieplo","tvn_w_w2":"wieje","tvn_w_p2":"wysokie","tvn_w_r2":"nie_pada","tvn_w_s2":"nie_pada","tvn_w_h2":"duze","tvn_w_i2":"slonce"};');
		var key, adoVarsMeteoString = '';
		for (key in tmpArr) {
			//Zwracamy tylko dozwolone tagi lub wszystkie, jeżeli nie są wskazane tagi dozwolone
			if (typeof tvnMeteoTargetingAllowedTags == "undefined" || typeof tvnMeteoTargetingAllowedTags[key] !== "undefined" || tvnMeteoTargetingAllowedTags.length == 0){
				var val = tmpArr[key];
				adoVarsMeteoString += '/' + key + '=' + val;
				var valType = typeof val;
				valType = valType.toLowerCase();
				var valIsNaN = valType != 'number' && valType != 'integer';
				if (valIsNaN) {
						val = '"'+ val +'"';
				}
				eval('window.'+ this.varName +'.'+ key +' = '+ val +';');
				eval('window.adoVarsMeteo.'+ key +' = '+ val +';');
			}
		}

		eval('window.setExtraMeteoParams = function () { return adoVarsMeteoString; };');

		if (this.callback) {
			try {
				this.callback(this.cookieValue);
			} catch (e) {
			}
		}
	}
}

var tmpAdoMeteoObj = new adoMeteo();
tmpAdoMeteoObj.init();
