nuggprof='';
if (asmi.pageSet.isMobile && asmi.pageSet.nuggadIdMobile != '') {
	var nugghost = "//asmi-mobile.nuggad.net";
	document.write('<script type="text/javascript" src="' + nugghost + '/javascripts/nuggad-ls.js"></script>'+
		'<script type="text/javascript">'+
			'nuggad.init({"rptn-url": "'+nugghost+'"}, function(api) {'+
				'api.rc({"nuggn": 246409744, "nuggsid": '+asmi.pageSet.nuggadIdMobile+', "nuggtg": "" });'+
			 '});'+
		'</scr'+'ipt><script type="text/javascript">'+
			'try {asmi.sas.prtnKeys += nuggprof+";";}catch(e){console.log(e)}'+
		'</scr'+'ipt>');
} else if (asmi.pageSet.nuggadId != '') {
	adServerURL = '//ww251.smartadserver.com/track/comp.asp?keyword=NUGGVARS&site='+asmi.pageSet.siteId;
	adServerURL = encodeURIComponent(adServerURL);
	var nuggcall= new Image();
	try {var nuggrid = encodeURIComponent(top.location.href);}
	catch(e) {var nuggrid = encodeURIComponent(location.href);}
	nuggcall.src = '//asv.nuggad.net/bk?nuggn=1569905102&nuggsid='+asmi.pageSet.nuggadId+'&nuggrid='+nuggrid+'&nuggl='+adServerURL;
}