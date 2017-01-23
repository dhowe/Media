var mvp = mvp || {};
mvp.LOADER_VERSION = 119;
mvp.AB = 100;
mvp.CL = 0;
mvp.LANG = "PL";
mvp.VERSION = "637";
mvp.NKVERSION = "263nk";
mvp.PREINITTIME = (+ new Date);
if(window.location.hash.substring(0, 9) === "#version_") {
 mvp.VERSION = window.location.hash.substring(9);
}
mvp.NKREGEX = new RegExp("(.nk.pl$)|(^nk.pl$)");
if(mvp.NKREGEX.test(window.location.host)) {
 mvp.VERSION = mvp.NKVERSION;
}
mvp.companionAvailable = !!mvp.companionAvailable || false;
mvp.Protocol = 'http' + (window.location.protocol == 'https:' ? 's' : '') + ':';
mvp.UrlCSS = mvp.Protocol + '//ocdn.eu/static/mvpplayer/'+mvp.VERSION+'/_s/css/compiled/';
mvp.UrlJS = mvp.Protocol + '//ocdn.eu/static/mvpplayer/'+mvp.VERSION+'/_s/js/compiled/';
mvp.injectedConfig = {"per_version":{"633":{"js":{}},"591dev":{"js":{"CKM_MAX_RETRIES":1,"PERCENT_CCED_TO_EVENTS_API":100}}},"default":{"js":{"MEDIA_MAX_TRIES":1,"CKM_REQUEST_TIMEOUT":5000,"PERCENT_CCED_TO_EVENTS_API":100}},"a":"c1r1c"};

(function () {
if (!mvp.Initialized) {
mvp.Initialized = true;
var ab = 'compiled',
script = document.createElement('script'),
stylesheet = document.createElement('link');
stylesheet.setAttribute('href', mvp.UrlCSS + ab + '.css?_');
stylesheet.setAttribute('media', 'all');
stylesheet.setAttribute('rel', 'stylesheet');
stylesheet.setAttribute('type', 'text/css');
document.getElementsByTagName('head')[0].appendChild(stylesheet);
script.setAttribute('src', mvp.UrlJS + ab + '.' + (/opera mini/i.test(window.navigator.userAgent) ? 'wso' : 'min') + '.js?_');
script.setAttribute('type', 'text/javascript');
document.getElementsByTagName('head')[0].appendChild(script);
}})();delete mvp.AB;delete mvp.UrlCSS;delete mvp.UrlJS; ; 
 /*1446029674976*/