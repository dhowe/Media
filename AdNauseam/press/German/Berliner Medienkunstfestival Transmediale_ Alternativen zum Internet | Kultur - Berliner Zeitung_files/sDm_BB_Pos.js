var BBDomain = document.domain;

function addEventSimple(obj,evt,fn) {
	if (obj.addEventListener)
		obj.addEventListener(evt,fn,false);
	else if (obj.attachEvent)
		obj.attachEvent('on'+evt,fn);
}

function SDMLocateChildByPartialID(parentID, partialID, newID){
  var childList = document.getElementById(parentID).childNodes;
  for (var i = childList.length-1; i>=0; i--){
    if (typeof childList[i].id != 'undefined'){
      if (childList[i].id.match(partialID)) childList[i].id = newID;
    }
  }
}

function appendStylesToTopFrame(stylesToUse, elem){
  var head = (typeof elem !== 'undefined') ? elem : window.top.document.head || window.top.document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  style.className = 'SDM_Delivery';
  if (style.styleSheet){
    style.styleSheet.cssText = stylesToUse;
  } else {
    style.appendChild(document.createTextNode(stylesToUse));
  }
  head.appendChild(style);
}

if (typeof document.getElementsByClassName != 'function') {
  document.getElementsByClassName = function (classname) {
    var elArray = [];
    var tmp = document.getElementsByTagName("*");
    var regex = new RegExp("(^|\\s)" + classname + "(\\s|$)");
    for (var i = 0; i < tmp.length; i++) {

      if (regex.test(tmp[i].className)) {
        elArray.push(tmp[i]);
      }
    }

    return elArray;
  };
}

if(BBDomain.search(/auto-motor-und-sport.de/) != -1){
		document.write('<style type="text/css">.leaderboard {margin: 0 Auto; width: '+BBWidth+'px !important;}</style>');
		document.write('<style type="text/css">#adBox1 {height: 250px !important;}</style>');
}

else if(BBDomain.search(/4wheelfun.de/) != -1 || BBDomain.search(/sportauto.de/) != -1 || BBDomain.search(/motor-klassik.de/) != -1 || BBDomain.search(/promobil.de/) != -1 || BBDomain.search(/caravaning.de/) != -1 || BBDomain.search(/motorsport-aktuell.com/) != -1 || BBDomain.search(/autostrassenverkehr.de/) != -1){
		document.write('<style type="text/css">.leaderboard  {margin: 0 Auto; width: '+BBWidth+'px !important;}</style>');
		document.write('<style type="text/css">#adBox1 {height: 250px !important;}</style>');
}

else if(typeof cinewebLayout != 'undefined'){
	document.write('<style type="text/css">#asa {width:'+BBWidth+'px !important; margin-bottom: 10px !important;}</style>');
}

else if(BBDomain.search(/kinoundco.de/) != -1){
	document.write('<style type="text/css">#adsd_billboard_div {width:'+BBWidth+'px; margin: 0 auto;}</style>');
}

else if(BBDomain.search(/webauto.de/) != -1){
		document.write('<style type="text/css">#wabillboard {padding-right: 132px; margin: 0 Auto; width: '+BBWidth+'px;}</style>');
}

else if(BBDomain.search(/motor-klassik.de/) != -1 || BBDomain.search(/promobil.de/) != -1 || BBDomain.search(/caravaning.de/) != -1){
		document.write('<style type="text/css">#flashbuehne {margin: 0 Auto 15px; width: '+BBWidth+'px;}</style>');
}

else if (BBDomain.search(/cm7-gate.freenet.de/) != -1 || BBDomain.search(/cm7-preview.freenet.de/) != -1 || BBDomain.search(/freenet.isdc.c.ergebnis-dienst.de/) != -1 || (BBDomain.search(/freenet.de/) != -1 && typeof frn051portalrd != 'undefined')){
		document.write('<style type="text/css">#adBox16Inner {margin: 0 auto; position: relative; width: '+BBWidth+'px;}</style>');
}

else if(BBDomain.search(/freenet.de/) != -1){
		var adBoxMargin = (802 - BBWidth)/2;
		document.write('<style type="text/css">#adBox16 {margin-left: '+adBoxMargin+'px;}</style>');
}

else if(BBDomain.search(/segelreporter.de/) != -1 || BBDomain.search(/segelreporter.com/) != -1){
		document.write('<style type="text/css">#billboard {margin: 0 Auto; width: '+BBWidth+'px;}</style>');
}

else if(BBDomain.search(/meinelaufstrecken.runnersworld.de/) != -1){
		document.write('<style type="text/css">#flashbuehne {margin: 11px Auto 10px; width: '+BBWidth+'px;}</style>');
}

else if(BBDomain.search(/laufpartner.runnersworld.de/) != -1){
		document.write('<style type="text/css">#flashbuehne {margin: 0 Auto 10px; width: '+BBWidth+'px;}</style>');
}

else if (BBDomain.search(/wahretabelle.de/) != -1){
		document.write('<style type="text/css">#ad-billboard {width: '+BBWidth+'px; margin-left: auto; margin-right:auto;}</style>');
}

else if(BBDomain.search(/runnersworld.de/) != -1){
		document.write('<style type="text/css">#flashbuehne {margin: 0 Auto 10px; width: '+BBWidth+'px;}</style>');
}

else if(BBDomain.search(/4players.de/) != -1){
		document.write('<style type="text/css">#werbung-fb-container {margin: 0 Auto; width: '+BBWidth+'px;}</style>');
		document.write('<style type="text/css">#werbung-fb{display:block !important;}</style>');
		document.write('<style type="text/css">#seite {margin-top: 0;}</style>');
		if (BBWidth > 960) document.write('<style type="text/css">#werbung-fb{width: 1000px; left: -20px;}</style>');
}

else if(BBDomain.search(/snowboarden.de/) != -1){
		document.write('<style type="text/css">#billboard {margin: 0 Auto; width: '+BBWidth+'px;}</style>');
		document.write('<style type="text/css">#werbung {min-height: 10px !important;}</style>');
}

else if(BBDomain.search(/neu.mountainbike-magazin.de/) != -1){
		var BBMargin = (770 - BBWidth)/2;
		BBMargin -= 460;
		document.write('<style type="text/css">#flashbuehne {margin-left:'+BBMargin+'px !important; width: '+BBWidth+'px !important; z-index: 50 !important;}</style>');
		document.write('<style type="text/css">#main {margin-top:250px;}</style>');
		document.write('<style type="text/css">#rightbanner {margin-top:185px !important;}</style>');
}

else if(BBDomain.search(/outdoorchannel.de/) != -1
		|| BBDomain.search(/kanumagazin.de/) != -1
		|| BBDomain.search(/elektrobike-online.com/) != -1
		|| BBDomain.search(/planetsnow.de/) != -1
		|| BBDomain.search(/mountainbike-magazin.de/) != -1
		|| BBDomain.search(/urbanbiking.de/) != -1
		|| BBDomain.search(/roadbike.de/) != -1
		|| BBDomain.search(/rennradtouren.roadbike.de/) != -1
		|| BBDomain.search(/outdoor-magazin.com/) != -1
		|| BBDomain.search(/klettern.de/) != -1
		|| BBDomain.search(/dsv-atlas.de/) != -1
		|| BBDomain.search(/dsv-atlas.schneeundmehr.de/) != -1
		|| BBDomain.search(/active-life.com/) != -1
		|| BBDomain.search(/zeugwart.de/) != -1
		|| BBDomain.search(/cavallo.de/) != -1){
		//var BBMargin = (920 - BBWidth)/2;
		//document.write('<style type="text/css">#flashbuehne {margin-left:'+BBMargin+'px !important; width: '+BBWidth+'px !important; z-index: 50 !important;}</style>');
		var BBMargin = (770 - BBWidth)/2;
		BBMargin -= 460;
		document.write('<style type="text/css">#topBanner {margin-left:'+BBMargin+'px !important; width: '+BBWidth+'px !important; z-index: 50 !important;}</style>');
		document.write('<style type="text/css">#main {margin-top:250px !important;}</style>');
		document.write('<style type="text/css">#rightBanner {margin-top:189px !important;}</style>');
}

else if(BBDomain.search(/readmore/) != -1) { 
    document.write('<style type="text/css">#monkey_lb {width: '+BBWidth+'px;}</style>');
}

else if(BBDomain.search(/pcgames.de/) != -1 || BBDomain.search(/babel2.pcgames.de/) != -1 || BBDomain.search(/buffed.de/) != -1  || BBDomain.search(/buffed.de/) != -1 || BBDomain.search(/gamezone.de/) != -1 || BBDomain.search(/babel2.gamezone.de/) != -1 || BBDomain.search(/ba2stage.pcgames.de/) != -1 || BBDomain.search(/ba2stage.gamezone.de/) != -1 || BBDomain.search(/pcgameshardware.de/) != -1 || BBDomain.search(/babel2.pcgameshardware.de/) != -1){       
	document.write('<style type="text/css">.topFrameEddie {height: 250px;}</style>');
	document.write('<style type="text/css">.innerLeaderboard {width: '+BBWidth+'px !important;}</style>');
  document.write('<style type="text/css">#plakatanfuehrerbrettlatepos {top: -260px;}</style>');
}

else if(BBDomain.search(/videogameszone.de/) != -1 || BBDomain.search(/gamesaktuell.de/) != -1){       
		document.write('<style type="text/css">.leaderboard {height: 250px !important;}</style>');
		document.write('<style type="text/css">#plakatanfuehrerbrettlatepos {top: -10px; margin: 0 Auto; width: '+BBWidth+'px !important; padding-right: 260px;}</style>');
    document.write('<style type="text/css">#plakathimmelskratzerlatepos {top: 251px;}</style>');
    document.write('<style type="text/css">#plakatfullsize {height: 252px !important;} #bannerbottom{width: '+BBWidth+'px;}</style>');
}

else if(BBDomain.search(/pcaction.de/) != -1 || BBDomain.search(/spielefilmetechnik.de/) != -1){        
		document.write('<style type="text/css">#flashbuehnecontainer {margin: 0 Auto; width: '+BBWidth+'px !important;}</style>');
}

else if(BBDomain.search(/menshealth.de/) != -1){        
	if (window.top !== window.self){
    var SDM_Cont_Name = window.name;
    window.parent.document.getElementById(SDM_Cont_Name).width = BBWidth+'px';
    var setStyles = '';
    if (BBWidth >= 960) setStyles = '.mps-billboard{padding: 0;}';
    SDM_Cont_Name +='__container__';
    appendStylesToTopFrame(setStyles, window.top.document.getElementById(SDM_Cont_Name));
  } else {
    document.write('<style type="text/css">#flashbuehne {margin: 0 Auto 10px; width: '+BBWidth+'px !important;}</style>');
		if(typeof(lateAdTags) != "undefined" && lateAdTags == true){
			var SDM_eElement = document.getElementById('main');
			var SDM_newFirstElement = document.getElementById('flashbuehne');
			SDM_eElement.insertBefore(SDM_newFirstElement, SDM_eElement.firstChild);
			document.write('<style type="text/css">#flashbuehne {position: relative !important; left: 0 !important; top: 0 !important:}</style>');
			document.write('<style type="text/css">#col-left, #col-right {margin-top: 0 !important;}</style>');
			SDM_newFirstElement.style.top = '0';
		}
  }
}

else if(BBDomain.search(/urbanathlon.de/) != -1){        
		document.write('<style type="text/css">#flashbuehne {margin: 0 Auto 10px; width: '+BBWidth+'px !important;}</style>');
		document.write('<style type="text/css">#ticker {float: none !important;}</style>');
		if(typeof(lateAdTags) != "undefined" && lateAdTags == true){
			document.write('<style type="text/css">#header {margin-top: 5px !important;}</style>');
		}
}

else if (BBDomain.search(/reittv.de/) != -1
		|| BBDomain.search(/soccer1.tv/) != -1
		|| BBDomain.search(/balancetv.de/) != -1
		|| BBDomain.search(/reittv.de/) != -1
		|| BBDomain.search(/fischentv.de/) != -1
		|| BBDomain.search(/wavetv.de/) != -1
		|| BBDomain.search(/cavallotv.de/) != -1
		|| BBDomain.search(/birdietv.de/) != -1
		|| BBDomain.search(/cars24tv.de/) != -1
		|| BBDomain.search(/globetrottertv.de/) != -1
		|| BBDomain.search(/mymoneytv.de/) != -1
		|| BBDomain.search(/sportnetz.tv/) != -1
		|| BBDomain.search(/starcliptv.de/) != -1){
		document.write('<style type="text/css">.billboard_advertisement_full {margin: 0 Auto; width: '+BBWidth+'px !important;}</style>');
		document.write('<style type="text/css">#top_advertisement {display:none;}</style>');
}

else if(BBDomain.search(/bfv.de/) != -1){       
		try{var isFF = navigator.userAgent.search(/Firefox/);}catch(err){}

		function addEventSimple(obj,evt,fn) {
			if (obj.addEventListener)
				obj.addEventListener(evt,fn,false);
			else if (obj.attachEvent)
				obj.attachEvent('on'+evt,fn);
		}
		
		function removeEventSimple(obj,evt,fn) {
			if (obj.removeEventListener)
				obj.removeEventListener(evt,fn,false);
			else if (obj.detachEvent)
				obj.detachEvent('on'+evt,fn);
		}
		
		var adBoxPadding = (920 - BBWidth)/2;
		document.getElementById('naMediaAd_SUPERBANNER').style.display = 'none';
		function moveBB_bfv(){
			document.getElementById('billboard').innerHTML = '<div id="SDM_BB_Container" style="position: absolute; width: 920px; height: 265px; left: 35px; top:0px; margin-left: 4px; margin-top: 0px; margin-bottom: 0px; padding-left: 0px; padding-top: 15px; border-top-color: rgb(204, 204, 204); border-left-color: rgb(204, 204, 204); border-right-color: rgb(204, 204, 204); border-bottom-color: rgb(204, 204, 204); border-top-width: 1px; border-left-width: 1px; border-right-width: 1px; border-bottom-width: 1px; border-top-style: solid; border-left-style: solid; border-right-style: solid; border-bottom-style: solid; background-color: none; z-index: auto;" id="msBillboard"><div id="msAnzeige" style="width: 15px; height: 250px; float: left; padding-right: 45px;"><img src="http://www.bfv.de/cms/img/anzeige_vertikal_250.png" width="15" height="250" border="0"></div>';
			//document.write('<style type="text/css">#billboard_reload {width: 920px !important; padding-left: '+adBoxPadding+'px;z-index:15;background-color:none;height:270px;margin-top:8px;}</style>');
			document.getElementById('billboard').setAttribute('style', 'width: 920px !important; padding-left: '+adBoxPadding+'px;z-index:15;background-color:none;height:270px !important;margin-top:8px;');
			document.getElementById('SDM_BB_Container').appendChild(naMediaAd_SUPERBANNER);
			document.getElementById('naMediaAd_SUPERBANNER').style.display = 'block';
			if (isFF == -1){
				FinalRepostion();
			} else{
				document.getElementById('banner2_reload').style.marginTop = '280px';
				removeEventSimple(window,'resize',FinalRepostion);
				window.onresize = "";
			}
		}
		
		addEventSimple(window,'load',moveBB_bfv);
}

else if(BBDomain.search(/spox.com/) != -1 || BBDomain.search(/spox.sportal.de/) != -1){
    if (BBWidth > 940){
      document.write('<style type="text/css">#spxAdBillboard {margin: 0 auto 0 -'+(BBWidth-940)/2+'px; width: '+BBWidth+'px !important;}</style>');
    }else{
      document.write('<style type="text/css">#spxAdBillboard {margin: 0 Auto; width: '+BBWidth+'px !important;}</style>');
    }
}

else if(BBDomain.search(/fussballdaten.de/) != -1){        
		document.write('<style type="text/css">#Flashbuehne {width: '+BBWidth+'px; margin-bottom: 5px;}</style>');
}

else if(BBDomain.search(/sportal.de/) != -1){    
    if (BBWidth > 920){
      document.write('<style type="text/css">#billboardMs {margin: 0 auto 0 -'+(BBWidth-920)+'px; width: '+BBWidth+'px !important;}</style>');
    }else{
      document.write('<style type="text/css">#billboardMs {margin: 0 Auto; width: '+BBWidth+'px !important;}</style>');
    }
}

else if(BBDomain.search(/fussballtransfers.com/) != -1){        
		var paddWidth = (1000- BBWidth)/2;
		document.write('<style type="text/css">.pub-billboard {width: '+BBWidth+'px !important; margin: 0 auto;}</style>');
}

else if(BBDomain.search(/fussball.avenueduweb.fr/) != -1){        
		var paddWidth = (1000- BBWidth)/2;
		document.write('<style type="text/css">.pub-billboard {width: '+BBWidth+'px !important; margin: 0 auto;}</style>');
    document.write('<style type="text/css">.pub-billboard img {max-width: none !important;}</style>');
}

else if(BBDomain.search(/comunio.de/) != -1){        
		document.write('<style type="text/css">#cont_billboard {margin: 0 Auto; width: '+BBWidth+'px !important; padding-top: 100px;}</style>');
		document.write('<style type="text/css">#advertising-top {height: auto !important;}</style>');
}

else if(BBDomain.search(/old.comunio.de/) != -1){        
		document.write('<style type="text/css">#center {padding-top: 20px;}</style>');
		
		function addEventSimple(obj,evt,fn) {
			if (obj.addEventListener)
				obj.addEventListener(evt,fn,false);
			else if (obj.attachEvent)
				obj.attachEvent('on'+evt,fn);
		}
		
		function moveBBcomunio(){
			var Ziel = document.getElementById('manager');
			var BBCon = document.getElementById('advertising-top');
			Ziel.appendChild(BBCon);
			BBCon.style.display = "block";
		}

		document.write('<style type="text/css">#advertising-top {margin: -5px Auto 15px; width: '+BBWidth+'px; float: none; display: none; overflow: hidden; height: 250px;}</style>');
		
		addEventSimple(window,'load',moveBBcomunio);
}

else if(BBDomain.search(/beautyjunkies.de/) != -1){        
		document.write('<style type="text/css">#bjtBillboardAd {margin: 0 Auto 50px; width: '+BBWidth+'px !important;}</style>');
		//document.write('<style type="text/css">#bjtMainAll {padding-top: 0 !important;}</style>');
}

else if(BBDomain.search(/basketball-bund/) != -1){        
		document.write('<style type="text/css">#frnBillboardAd {margin: 0px Auto; width: '+BBWidth+'px !important;}</style>');
}

else if(BBDomain.search(/myfanbase.de/) != -1){        
		document.write('<style type="text/css">#ad-billboard {margin: 10px Auto; width: '+BBWidth+'px !important;}</style>');
}

else if(BBDomain.search(/golf.de/) != -1){

		function addEventSimple(obj,evt,fn) {
			if (obj.addEventListener)
				obj.addEventListener(evt,fn,false);
			else if (obj.attachEvent)
				obj.attachEvent('on'+evt,fn);
		}
		
		function moveBBgolf(){
			var zweitesKind = document.getElementById('main').firstChild;
			document.getElementById('main').insertBefore(sdm_bb,zweitesKind);
			sdm_bb.style.display = "block";
		}

		document.write('<div id="BBHandler" style="display:none;"></div>');
		document.getElementById('BBHandler').parentNode.id = 'BBContainer';
		var sdm_bb = document.getElementById('BBContainer');
		sdm_bb.style.display = "none";

		document.write('<style type="text/css">#BBContainer {margin: 0px Auto; width: '+BBWidth+'px !important;}</style>');
		
		addEventSimple(window,'load',moveBBgolf);
}

else if(BBDomain.search(/computerbase.de/) != -1 || BBDomain.search(/cbdev.de/) != -1){
		if (typeof window.SDM_Partner !== 'undefined') {
			SDM_Partner.showBillboard(250); 
		}
}

else if(BBDomain.search(/ligainsider.de/) != -1){
	document.write('<style type="text/css">#ms_billboard {margin: 0px Auto; width: '+BBWidth+'px; padding-top: 10px; padding-bottom: 5px;}</style>');
}

else if(BBDomain.search(/giga.de/) != -1){
	document.write('<style type="text/css">#iqadtile1 {width: '+BBWidth+'px; margin: 0 auto;}</style>');
	document.write('<style type="text/css">#hockeystick {height: 250px !important;}</style>');
}

else if(BBDomain.search(/rallye-magazin.de/) != -1){
	document.write('<style type="text/css">#banner_billboard {width: '+BBWidth+'px;margin:0 auto;}</style>');
}

else if(BBDomain.search(/petspot.de/) != -1 || BBDomain.search(/petspot.at/) != -1){
	document.write('<style type="text/css">#ps_parentcontainer_billboard {width: '+BBWidth+'px;margin:0 auto;}</style>');
}

else if(BBDomain.search(/deine-tierwelt.de/) != -1){
	document.write('<style type="text/css">#ps_parentcontainer_billboard {width: '+BBWidth+'px;margin:0 auto;}</style>');
	document.write('<style type="text/css">#ps_parentcontainer_lb {min-height: 0px !important;}</style>');
}

else if(BBDomain.search(/einfachtierisch.de/) != -1){
	document.write('<style type="text/css">.ad_leaderboard {width: 100%; margin:0 !important;}</style>');
	document.write('<style type="text/css">#ps_parentcontainer_lb {width: '+BBWidth+'px; margin:0 auto;}</style>');
}

else if(BBDomain.search(/dhd24.com/) != -1){
	document.write('<style type="text/css">#ps_parentcontainer_billboard {width: '+BBWidth+'px;margin:0 auto 10px;}</style>');
	document.write('<style type="text/css">#ps_parentcontainer_lb {min-height: 0px !important;}</style>');
}

else if(BBDomain.search(/mitfahrgelegenheit.de/) != -1){
	//document.write('<style type="text/css">#wrapper {padding-top: 267px !important;}</style>');
	//document.write('<style type="text/css">#wallpaper_ad_right {top: 267px !important;}</style>');
}

else if(BBDomain.search(/hockeyweb.de/) != -1){
	document.write('<style type="text/css">#frMainOutline {top: 253px !important;}</style>');
	document.write('<style type="text/css">#adFrTop {width: '+BBWidth+'px; margin: 0 auto; position: relative; left: 0; float: none;}</style>');
}

else if(BBDomain.search(/bmw-syndikat.de/) != -1){
	var paddWidth = (960 - BBWidth)/2;
	//document.write('<style type="text/css">.naMediaAd_BILLBOARD {margin-top: 142px !important; padding-left: '+paddWidth+'px;}</style>');
	document.write('<style type="text/css">.head2_surftips_main {visibility: hidden !important; z-index: -1;}</style>');
}

else if(BBDomain.search(/fddb.info/) != -1){
	document.write('<style type="text/css">#adv0001a {position: relative; margin: 8px auto 0 !important; width: '+BBWidth+'px;}</style>');
	document.write('<style type="text/css">#adv0002b {top: 440px !important;}</style>');
}

else if(BBDomain.search(/goal.com/) != -1){

		function addEventSimple(obj,evt,fn) {
			if (obj.addEventListener)
				obj.addEventListener(evt,fn,false);
			else if (obj.attachEvent)
				obj.attachEvent('on'+evt,fn);
		}
		
		function moveBBgoal(){
			document.getElementsByClassName('module-navigation')[0].appendChild(ad728x90);
			document.getElementById('ad728x90').style.display = "block ";
		}

		document.write('<style type="text/css">#ad728x90 {margin: 0px Auto; width: '+BBWidth+'px !important; display:none; }</style>');
		addEventSimple(window,'load',moveBBgoal);
}

else if(BBDomain.search(/speed-magazin.de/) != -1){        
		document.write('<style type="text/css">.art-banner_top {text-align: center; left: 0px;}</style>');
    document.write('<style type="text/css">.art-Sheet {top: 255px;}</style>'); 
    document.write('<style type="text/css">.art-banner_right {margin-top: 257px;}</style>');
}

else if(BBDomain.search(/eishockey.net/) != -1){        
		document.write('<style type="text/css">.headerabove {height: 250px !important; margin-bottom: 35px !important;}</style>');
}

else if(BBDomain.search(/wrestling-infos.de/) != -1){

		function moveBBWrI(){
			var getWrIParent = document.getElementById('adlay');
			var getWrIMover = document.getElementById('msSuperBanner');
			getWrIParent.insertBefore(getWrIMover, getWrIParent.firstChild);
			document.getElementById('msSuperBanner').style.display = "block ";
		}

		document.write('<style type="text/css">#msSuperBanner {margin: 10px Auto 0; width: '+BBWidth+'px !important; display:none; padding-right: 170px; }</style>');
		
		addEventSimple(window,'load',moveBBWrI);
}

else if(BBDomain.search(/babyclub.de/) != -1){
	document.write('<style type="text/css">#adtop {width: '+BBWidth+'px;}</style>');
}

else if(BBDomain.search(/baby-vornamen.de/) != -1){
	document.write('<style type="text/css">#adBillboard {width: '+BBWidth+'px; margin: 0 auto; float:none !important}</style>');
}

else if(BBDomain.search(/daddylicious.de/) != -1){
	document.write('<style type="text/css">#stroer_billboard {width: '+BBWidth+'px; margin: -15px auto 15px;}</style>');
}

else if(BBDomain.search(/elterngeld.net/) != -1){
	document.write('<style type="text/css">#stroeer_billboard {width: '+BBWidth+'px; margin:0 auto 10px;}</style>');
}

else if(BBDomain.search(/cartoonnetwork.de/) != -1){
	document.write('<style type="text/css">#block-block-100 > .content {width: '+BBWidth+'px; margin:0 auto;}</style>');
}

else if(BBDomain.search(/weltfussball.de/) != -1){
	document.write('<style type="text/css">#wac_flash-arena {width: '+BBWidth+'px; margin:10px auto 0;}</style>');
}

else if(BBDomain.search(/crossmagazin.de/) != -1){
	document.write('<style type="text/css">#frnBillboard {width: '+BBWidth+'px; margin-left: auto; margin-right: auto; text-align: center;}</style>');
}

else if(BBDomain.search(/bza.tb.it2media.de/) != -1 || BBDomain.search(/dastelefonbuch.de/) != -1){
	document.write('<style type="text/css">#billboard {width: '+BBWidth+'px !important; margin-left: auto !important; margin-right: auto !important; text-align: center !important;}</style>');
}

else if(BBDomain.search(/preview.tb.it2media.de/) != -1){
  try{
    var topIframes=top.document.getElementsByTagName("IFRAME");
		for(var i=0;i<topIframes.length;i++){
      if(topIframes[i].contentWindow==self){
        topIframes[i].style.width = BBWidth + "px";
      }
    }
  } catch(e) {}
}

else if(BBDomain.search(/fussballeuropa.com/) != -1){
	document.write('<style type="text/css">#billboard {width: '+BBWidth+'px; margin: 10px auto 0;}</style>');
}

else if(BBDomain.search(/1000ps/) != -1){
	document.write('<style type="text/css">#frnBannerAd {width: '+BBWidth+'px; margin: 0 auto;}</style>');
}

else if(BBDomain.search(/wireltern.de/) != -1){
	document.write('<style type="text/css">#header {float: none !important;} #billboard {width: '+BBWidth+'px !important; margin-left:auto !important; margin-right: auto !important; margin-bottom: 13px !important;}</style>');
}

else if(BBDomain.search(/kochrezepte.de/) != -1){
	document.write('<style type="text/css">#billboard {width: '+BBWidth+'px; margin: 0 auto;}</style>');
}

else if(BBDomain.search(/universal-music.de/) != -1 || BBDomain.search(/klassikakzente.de/) != -1 || BBDomain.search(/jazzecho.de/) != -1){
  document.write('<style type="text/css">#ad_billboard {width:'+BBWidth+'px !important; margin-top:4px !important; margin-bottom:8px !important;}</style>');
}

else if(BBDomain.search(/flugzeugforum.de/) != -1){
	document.write('<style type="text/css">#billboard {width: '+BBWidth+'px; margin: 0 auto;}</style>');
}

else if(BBDomain.search(/berliner-zeitung.de/) != -1 || BBDomain.search(/express.de/) != -1 || BBDomain.search(/mopo.de/) != -1 || BBDomain.search(/berliner-kurier.de/) != -1 || BBDomain.search(/rundschau-online.de/) != -1 || BBDomain.search(/ksta.de/) != -1 || BBDomain.search(/mz-web.de/) != -1 || BBDomain.search(/naumburger-tageblatt.de/) != -1){
	document.write('<style type="text/css">#stroeer_billboard {width: '+BBWidth+'px; margin: 0 auto;}</style>');
}

else if(BBDomain.search(/motorsportmarkt.de/) != -1){
	document.write('<div id="BBHandler" style="display:none;"></div>');
  document.getElementById('BBHandler').parentNode.parentNode.style.margin = '5px auto';
}

else if(BBDomain.search(/markt.de/) != -1 || BBDomain.search(/markt.merkur-online.de/) != -1 || BBDomain.search(/markt.merkur.de/) != -1 || BBDomain.search(/markt.az-online.de/) != -1){
  document.write('<style type="text/css">#markt_billboard_below_header {width:'+BBWidth+'px; margin: 5px auto;}</style>');
}

else if(BBDomain.search(/fanzeit.de/) != -1){
  document.write('<style type="text/css">#fz-billboard {width:'+BBWidth+'px; margin: 0 auto;}</style>');
}

else if(BBDomain.search(/moviemaze.de/) != -1){
  document.write('<style type="text/css">#BillboardAd {width:'+BBWidth+'px; margin: 0 auto; margin-top: 10px}</style>');
}

else if(BBDomain.search(/meinehaushaltstipps.de/) != -1){
  document.write('<style type="text/css">#header {width:'+BBWidth+'px; margin: 0 auto; position:relative;}</style>');
  document.write('<style type="text/css">h1 {background-position:center top}</style>');
  document.write('<style type="text/css">.blog_title {display:inline; position:relative; margin-left: -1310px; top:30px;}</style>');
  document.write('<style type="text/css">.blog_description {display:inline; position:absolute;}</style>');
  document.write('<style type="text/css">#wrapper {margin-top: 200px}</style>');
}

else if(BBDomain.search(/jrd.jolie.de/) != -1) {
  var setStyles = '#div-gpt-ad-billboard {width: '+BBWidth+'px; margin: 0 auto;}';
  appendStylesToTopFrame(setStyles);
}

else if(BBDomain.search(/jolie.de/) != -1) {
  var setStyles = '#div-gpt-ad-billboard {width: '+BBWidth+'px; margin: 0 auto;}';
  appendStylesToTopFrame(setStyles);
}

else if(BBDomain.search(/maedchen.de/) != -1){
  document.write('<style type="text/css">#sdm_billboard {width:'+BBWidth+'px; margin: 0 auto;}</style>');
}

else if(BBDomain.search(/starflash.de/) != -1){
  document.write('<style type="text/css">#sdm_billboard {width:'+BBWidth+'px; margin: 0 auto;}</style>');
}

else if(BBDomain.search(/familie.de/) != -1){
  document.write('<style type="text/css">#sdm_billboard {width:'+BBWidth+'px; margin: 0 auto;}</style>');
}

else if(BBDomain.search(/madame.de/) != -1){
  function moveFP_madame(){
    document.getElementsByClassName('sdm_fullpage')[0].innerHTML = document.getElementById('sdm_billboard').innerHTML;
    document.getElementById('sdm_billboard').innerHTML = "";
  }
  
  if (typeof fullpageAd == 'undefined') {
    document.write('<style type="text/css">#sdm_billboard {width:'+BBWidth+'px; margin: 0 auto;}</style>');
  } else if (fullpageAd == true){
    document.write('<style type="text/css">#sdm_billboard {display:none !important;}</style>');
    document.write('<style type="text/css">.sdm_fullpage {position: relative; width:'+BBWidth+'px; margin: 0 auto; background: white; padding-bottom: 50px;}</style>');
    document.write('<style type="text/css">.sdm_fullpage a {outline: none !important;}</style>');
    document.write('<style type="text/css">.main-navigation {padding-bottom: 18px !important;}</style>');
    document.write('<style type="text/css">.stage-teaser {padding-top: 0px !important;}</style>');
    document.write('<style type="text/css">.article {margin-bottom: 0px !important;}</style>');    
    document.write('<style type="text/css">.article + .main-footer, .article + .sdm_fullpage + .main-footer {margin-top: -54px !important;}</style>');    
    addEventSimple(window, 'load', moveFP_madame);
  }
}

else if(BBDomain.search(/daparto.de/) != -1){
  document.write('<style type="text/css">.ads--billboard {width:'+BBWidth+'px; margin: 0 auto;}</style>');
}

else if(BBDomain.search(/b2b-deutschland.de/) != -1){
  document.write('<style type="text/css">.billboard {width:'+BBWidth+'px; margin: 0 auto;}</style>');
}

else if(BBDomain.search(/evocars-magazin.de/) != -1){
  document.write('<style type="text/css">.cb_billboard {width:'+BBWidth+'px;}</style>');
}

else if(BBDomain.search(/staging.promiflash.de/) != -1){
  var setStyles = '#div-gpt-ad-billboard {width: '+BBWidth+'px; margin: 0 auto;}';
  appendStylesToTopFrame(setStyles);
}

else if(BBDomain.search(/promiflash.de/) != -1){
  document.write('<style type="text/css">#billboard-ad {width:'+BBWidth+'px; margin: 0 auto;}</style>');
}

else if(BBDomain.search(/snoa.de/) != -1){
  document.write('<style type="text/css">#billboard {width:'+BBWidth+'px; margin: 0 auto;}</style>');
  document.write('<style type="text/css">#content {top: 0px !important;}</style>');
}

else if(BBDomain.search(/sz-online.de/) != -1){
	document.write('<div id="SDM_BB_Handler" style="display:none;"></div>');
	document.getElementById('SDM_BB_Handler').parentNode.style.width = BBWidth+'px';
	document.getElementById('SDM_BB_Handler').parentNode.style.margin = '0 auto 5px';
}

else if(BBDomain.search(/diagnosia.com/) != -1){
  document.write('<style type="text/css">#front-brsl-billboard, #all-brsl-billboard {width:'+BBWidth+'px; margin: 0 auto;}</style>');
}

else if(BBDomain.search(/tischtennis-manager.com/) != -1){
  document.write('<style type="text/css">#page-top {width:'+BBWidth+'px; padding-right: 0px;}</style>');
}

else if(BBDomain.search(/hallo-eltern.de/) != -1){
  document.write('<style type="text/css">#ad_teaser {width:'+BBWidth+'px; left: -15px; margin: 0 auto; float: none !important;}</style>');
}


else if(BBDomain.search(/bergsteiger.de/) != -1){
  document.write('<style type="text/css">#billboard {width:'+BBWidth+'px !important; margin: 0 auto 10px; }</style>');
  document.write('<style type="text/css">#leaderboard {height: 0px;}</style>');
  document.write('<style type="text/css">.header-container {margin-bottom: 15px !important;}</style>');
}

else if(BBDomain.search(/eisenbahnwelt.de/) != -1 || BBDomain.search(/bahn-extra.de/) != -1 || BBDomain.search(/lok-magazin.de/) != -1 || BBDomain.search(/strassenbahn-magazin.de/) != -1 || BBDomain.search(/nbahnmagazin.de/) != -1 || BBDomain.search(/eisenbahnmagazin.de/) != -1){
  document.write('<style type="text/css">#leaderboard {width:'+BBWidth+'px !important; height: 250px !important; margin: 0 auto; padding-top: 0px;}</style>');
  document.write('<style type="text/css">#leaderboard div {margin-bottom: 0px !important;}</style>');  
}

else if(BBDomain.search(/zs.vh-digital.de/) != -1){
  document.write('<style type="text/css">#billboard {width:'+BBWidth+'px !important; margin: 0 auto;}</style>');
  document.write('<style type="text/css">#leaderboard {height: 0px;}</style>');
  document.write('<style type="text/css">.header-container {margin-bottom: 15px !important;}</style>');
}

else if(BBDomain.search(/aerokurier.de/) != -1 || BBDomain.search(/flugrevue.de/) != -1 || BBDomain.search(/klassiker-der-luftfahrt.de/) != -1){
  document.write('<style type="text/css">#mrd_fullsize {width:'+BBWidth+'px; margin: 0 auto 10px;}</style>');
}

else if(BBDomain.search(/spieletipps.de/) != -1){
  document.write('<style type="text/css">#leaderboard {width:'+BBWidth+'px !important; margin: 0 auto  !important;}</style>');
}

else if(BBDomain.search(/neuh.com/) != -1){
  document.write('<style type="text/css">#top-ad {top: -13px;}</style>');
  document.write('<style type="text/css">.primary-nav.black {height: 260px !important;}</style>');
}

else if(BBDomain.search(/spielaffe.de/) != -1 || BBDomain.search(/kraloyun.com/) != -1){
//	var BBMargin = (980 - BBWidth)/2;
//  document.write('<style type="text/css">#app_advertising_billboard {margin-left: -'+BBWidth+'px;}</style>');
}

else if(BBDomain.search(/dogforum.de/) != -1 || BBDomain.search(/dogforum.at/) != -1){
  document.write('<style type="text/css">#ps_parentcontainer_lb {width: '+BBWidth+'px; margin: 0 auto;}</style>');
}

else if(BBDomain.search(/partner-hund.de/) != -1 || BBDomain.search(/geliebte-katze.de/) != -1 || BBDomain.search(/relaunch.herz-fuer-tiere.de/) != -1 || BBDomain.search(/dogstoday.de/) != -1 || BBDomain.search(/catstoday-magazin.de/) != -1 || BBDomain.search(/herz-fuer-tiere.de/) != -1){
  document.write('<style type="text/css">#billboard {width: '+BBWidth+'px; margin: 0 auto 10px;}</style>');
}

else if(BBDomain.search(/stadionwelt/) != -1){
  document.write('<style type="text/css">#sdm_billboard {width: '+BBWidth+'px; margin: 0 auto;}</style>');
}

else if(BBDomain.search(/druckerchannel/) != -1){
  document.write('<style type="text/css">#DCGA_LEAD {height: 250px !important;}</style>');
  document.write('<style type="text/css">#DCGA_SKY {top: 252px !important;}</style>');
}

else if(BBDomain.search(/hamburg-airport.de/) != -1){
	var random_id="BBCont_ad_" + Math.round(Math.random()*1000);
  document.write('<div id="' + random_id + '"></div>');
  var SDM_BB_ID = document.getElementById(random_id).parentNode.id;
  document.write('<style type="text/css">#'+SDM_BB_ID+' {position: relative; width: '+BBWidth+'px; margin: 10px auto 0;}</style>');
}

else if(BBDomain.search(/skifahren-bayerischer-wald.com/) != -1 || BBDomain.search(/langlaufen-bayerischer-wald.de/) != -1 || BBDomain.search(/winterwandern-bayerischer-wald.de/) != -1 || BBDomain.search(/rodeln-bayerischer-wald.de/) != -1 || BBDomain.search(/wandern-bayerischer-wald.com/) != -1 || BBDomain.search(/ausflug-arber.de/) != -1 || BBDomain.search(/wandern-kinder-bayerischer-wald.de/) != -1 || BBDomain.search(/freizeit-bayerischer-wald.com/) != -1 || BBDomain.search(/wanderwege-bayerischer-wald.de/) != -1){
  document.write('<style type="text/css">#billboard {position: relative; width: '+BBWidth+'px; margin: 0 auto; padding-bottom: 54px;}</style>');
}

else if(BBDomain.search(/allgaeu-motorrad.de/) != -1 || BBDomain.search(/rodeln-allgaeu.de/) != -1 || BBDomain.search(/winterwandern-allgaeu.de/) != -1 || BBDomain.search(/allgaeu-fuer-kinder.de/) != -1 || BBDomain.search(/familienwanderungen-allgaeu.de/) != -1 || BBDomain.search(/ausflug-allgaeu.de/) != -1 || BBDomain.search(/allgaeu-radtour.de/) != -1 || BBDomain.search(/allgaeu-rennrad.de/) != -1 || BBDomain.search(/mtb-touren-allgaeu.de/) != -1 || BBDomain.search(/klettersteig-allgaeu.de/) != -1 || BBDomain.search(/klettern-allgaeu.de/) != -1 || BBDomain.search(/huettenwanderung-allgaeu.de/) != -1 || BBDomain.search(/wanderwege-allgaeu.de/) != -1){
  document.write('<style type="text/css">#billboard {position: relative; width: '+BBWidth+'px; margin: 0 auto; padding-bottom: 54px;}</style>');
}

else if(BBDomain.search(/tierpension.net/) != -1){
 document.write('<style type="text/css">#ps_childcontainer_billboard {position: relative; width: '+BBWidth+'px; margin: 0 auto;}</style>');
}

else if(BBDomain.search(/abacho.de/) != -1){
 document.write('<style type="text/css">#header {height: 382px;} #searchForm {margin-top: 285px;} #abacho_ads_skyscraper{top: 285px;}</style>');
}

else if(BBDomain.search(/mivitec.net/) != -1 || BBDomain.search(/topgeardeutschland.de/) != -1 || BBDomain.search(/topgear-deutschland.de/) != -1){
 document.write('<style type="text/css">#jsn-pos-mainmenu > .jsn-modulecontainer > .jsn-modulecontainer_inner > .jsn-modulecontent > .bannergroup > .banneritem {height: 250px; position: relative; top: 30px; left: '+((940-BBWidth)/2)+'px;} </style>');
}

else if(BBDomain.search(/pokewiki.de/) != -1){
 document.write('<style type="text/css">#ad1 {height: 250px !important; width: '+BBWidth+'px !important; overflow: visible !important; top: -250px !important;} #gl-content-wrapper {padding-top: 277px;} #gl-topbar{top: -277px;} #ad2{top: 0 !important;}</style>');
}

else if(BBDomain.search(/liga-zwei.de/) != -1){
 document.write('<style type="text/css">#page > .naMediaAd_BILLBOARD {width: '+BBWidth+'px !important; margin: 40px auto 0;}</style>');
}

else if(BBDomain.search(/anschlusstor.de/) != -1){
 document.write('<style type="text/css">#billboard {width: '+BBWidth+'px; margin: 0 auto; padding-right: 160px;}</style>');
}

else if(BBDomain.search(/schalke-news.de/) != -1){
 document.write('<style type="text/css">.billboard {width: '+BBWidth+'px !important; height: 410px;}</style>');
}

else if(BBDomain.search(/juraforum.de/) != -1){
 document.write('<style type="text/css">.werbung-billboard-top {width: '+BBWidth+'px !important; margin: 0 auto;}</style>');
}

else if(BBDomain.search(/planetoutdoor.de/) != -1){
 document.write('<style type="text/css">#billboard {width: '+BBWidth+'px !important; margin: 0 auto; margin-bottom: 10px;}</style>');
}

else if(BBDomain.search(/loewenfreun.de/) != -1){
 document.write('<style type="text/css">#logo {height: 270px; background-color: #0099FF;} #superbanner{z-index: 10; top: 50px;}</style>');
}

else if(BBDomain.search(/sgd-fanforum.de/) != -1){
 document.write('<style type="text/css">.headerPatch > div {width: '+BBWidth+'px; margin: 0 auto;}</style>');
}

else if(BBDomain.search(/royalbavarianliga.de/) != -1){
  document.write('<style type="text/css">#ast {width: 1000px;} #container{padding-top: 250px;</style>');
  function moveBB_RBL(){
    SDMLocateChildByPartialID('ast_top', 'asm_tdm_', 'LB_Container');
    SDMLocateChildByPartialID('ast_sky', 'asm_tdm_', 'Sky_Container');
    document.getElementById('LB_Container').setAttribute('style', 'position:static; width:'+BBWidth+'px; margin: 0 auto;');
    document.getElementById('Sky_Container').setAttribute('style', 'position:static;');
  }
 addEventSimple(window, 'load', moveBB_RBL);
}

else if(BBDomain.search(/sgd-fanforum.de/) != -1){
 document.write('<style type="text/css">.headerPatch > div {width: '+BBWidth+'px; margin: 0 auto;}</style>');
}

else if(BBDomain.search(/hafo.de/) != -1){
  document.write('<div id="SDM_BB_Handler" style="display: none; height: 1px; width: 1px;"></div>');
  document.write('<style type="text/css">#ast {width: 1000px;} #container{padding-top: 250px;</style>');
  
  function moveBB_hafo(){
    var searchDiv = document.getElementById('SDM_BB_Handler');
    var SDM_Found = false;
    while (SDM_Found == false){
      searchDiv = searchDiv.parentNode;
      console.log(searchDiv);
      if (typeof searchDiv.id != 'undefined'){
        if (searchDiv.id.match('asm_tdm_')){
          searchDiv.id = 'LB_Container';
          SDM_Found = true;
        }
      }
    }
    document.getElementById('LB_Container').setAttribute('style', 'position:relative; width:'+BBWidth+'px; margin: 0 auto; top: -120px;');
    document.getElementById('LB_Container').parentNode.setAttribute('height', '250px;');
    //document.getElementById('Sky_Container').setAttribute('style', 'position:static;');
  }
 addEventSimple(window, 'load', moveBB_hafo);
}

else if(BBDomain.search(/selbermachen.de/) != -1){
 document.write('<style type="text/css">#billboard {width: '+BBWidth+'px; margin: 5px auto; top: -7px;}</style>');
}

else if(BBDomain.search(/motorradonline.de/) != -1){
 document.write('<style type="text/css">#mrd_fullsize {width: '+BBWidth+'px; margin: 0 auto 9px;} #topBanner{width: 900px;}</style>');
}

else if(BBDomain.search(/aero.de/) != -1){
 document.write('<style type="text/css">#frnBannerAd {width: '+BBWidth+'px; margin: 0 auto;}</style>');
}

else if(BBDomain.search(/tabtech.de/) != -1){
 document.write('<style type="text/css">#banner-wrapper-desktop {width: '+BBWidth+'px; margin: 0 auto;}</style>');
}

else if(BBDomain.search(/just4sports.de/) != -1){
 document.write('<style type="text/css">#ad-billboard {width: '+BBWidth+'px; margin: 5px auto;}</style>');
}

else if(BBDomain.search(/meinpassat.de/) != -1){
 document.write('<style type="text/css">#nab_top {width: '+BBWidth+'px; margin: 0 auto; left: 0; position: relative; top: -360px !important;} body{margin-top: 250px;} #nab_side{margin-top: 100px;</style>');
}

else if(BBDomain.search(/meinauto.de/) != -1) {
  document.write('<style type="text/css">#ad-tag-billboard {width: '+BBWidth+'px; margin: 10px auto 0;}</style>');
}

else if(BBDomain.search(/r1200st.de/) != -1) {
  document.write('<style type="text/css">#billboard {width: '+BBWidth+'px; margin: 5px auto 0px;} #page-body {margin-top: -12px;}</style>');
}

else if(BBDomain.search(/r1200st.de/) != -1 || BBDomain.search(/s1000-forum.de/) != -1 || BBDomain.search(/f800-forum.de/) != -1 || BBDomain.search(/bmw-maxi-scooter.de/) != -1 ||  BBDomain.search(/bmw-k-forum.de/) != -1 || BBDomain.search(/michaelbense.de/) !=-1) {
  document.write('<style type="text/css">#billboard {width: '+BBWidth+'px; margin: 5px auto 0px;} #page-body {margin-top: -12px;}</style>');
}

else if(BBDomain.search(/gaultmillau.de/) != -1) {
  document.write('<style type="text/css">#billboard {width: '+BBWidth+'px; margin: 10px auto 0;}</style>');
}

else if(BBDomain.search(/fussballhamburg.de/) != -1) {
  document.write('<style type="text/css">#adBox16 {position:relative; width: '+BBWidth+'px; margin: 0 auto; top: 130px;}</style>');
}