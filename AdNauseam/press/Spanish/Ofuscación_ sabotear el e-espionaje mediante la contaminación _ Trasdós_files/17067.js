(function(require, define) {
define(function(require, exports, module) {
	var widModule = require('richbutton'), $ = require('jquery'), widgets = require('widgets');
	var wid = widModule.create({"articleId":66428782,"linkWidget":17065,"hideInvisible":true,"bindClickToImage":true,"includeBodyOffset":false,"position":"MR","location":"ABSOLUTE","openTargetInNewTab":true,"count":21,"keyword":"cia","text":"See {count} articles about {keyword}","postContent":" ","minImageWidth":100,"minImageHeight":100,"widgetId":17067,"publisherId":4553,"clickUrl":"","clickTarget":"_top","css":["//assets.kaloo.ga/widgets/4553/widget17067c5f823.css"],"translation":null,"googleAnalytics":false,"omnitureClickTracking":false,"omniturePageTracking":false,"omniturePageName":"Kalooga","defaultGaTrackEvent":true,"defaultGaTrackPageview":true,"cdn":false,"comScoreEPI":false,"excludeSource":false,"excludeDate":false,"sortVideoStills":0,"retina":true,"chartbeat":false,"adDebug":false,"kicker":false,"inViewAds":false,"publisherName":"blogs.20minutos.es","language":"es","type":"richbutton"});
	var e = $('.kalooga_17067');
	if(e.length > 0) widgets.print(wid, e);
	return wid;
});

})(kalooga.require, kalooga.define);