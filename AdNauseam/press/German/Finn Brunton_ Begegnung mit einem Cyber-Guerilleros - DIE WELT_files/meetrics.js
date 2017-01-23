if (typeof de_meetrics !== "object" && typeof asmiMeetricsStatus === 'undefined') {
	window.asmiMeetricsStatus = 'loading';
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = '//s361.mxcdn.net/bb-mx/serve/mtrcs_147519.js';
	document.getElementsByTagName('head')[0].appendChild(script);
}