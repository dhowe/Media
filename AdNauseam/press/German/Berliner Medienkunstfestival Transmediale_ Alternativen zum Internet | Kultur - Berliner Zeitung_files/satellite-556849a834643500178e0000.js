function setVars_recommend_online(button) {
  
  s.linkTrackVars='events,eVar1,eVar2,eVar3,eVar8,eVar9,eVar10,eVar11,eVar12,eVar13,eVar14,eVar17,eVar18,eVar19,eVar33,eVar38,eVar41,eVar45,eVar70,prop1,prop2,prop3,prop4,prop6,prop7,prop8,prop9,prop10,prop11,prop12,prop13,prop15,prop16,prop18,prop31';
  s.linkTrackEvents = 'event54';
  
  /*Set standard vars*/
	s.eVar1 = _satellite.getVar('site');
	s.eVar2 = _satellite.getVar('ressort');
	s.eVar3 = _satellite.getVar('category');
	s.eVar8 = _satellite.getVar('adZone');
	s.eVar9 = _satellite.getVar('pageType');
	s.eVar10 = _satellite.getVar('pageName');
	s.eVar11 = "D=g";
	s.eVar12 = s.eVar13;
	s.eVar14 = _satellite.getVar('channel');
	s.eVar19 = _satellite.getVar('dateUnix');
	s.eVar33 = _satellite.getVar('ivwZone');
  s.eVar70 = button;
  
  /*Set standard props NOTE: set props via dynamic vars (D=) to save characters*/
	s.prop1 = "D=v1";
	s.prop2 = "D=v2";
	s.prop3 = "D=v3";
	s.prop4 = "D=v8";
	s.prop6 = "D=v14";
	s.prop7 = "D=v15";
	s.prop8 = "D=v17";
	s.prop9 = "D=v18";
	s.prop10 = "D=v19";
	s.prop11 = "D=v33";
	s.prop12 = "D=v10";
	s.prop13 = "D=v41";
	s.prop15 = "D=v45";
	s.prop16 = "D=v9";
	s.prop32 = "D=v38";
  s.prop31 = "D=v70";

  var stamp = new Date().getTime()/1000|0; //Serialisierung gegen Doppelzählung von hover-A	
	s.events = "event54:" + stamp;
  

}


function trackLinks_recommend_online(aObj,linkDesc){  
if((typeof s !== "undefined") && (typeof s.doPlugins == "function")) {
        s.forcedLinkTrackingTimeout=500;
  s.tl(this,'o',linkDesc,setVars_recommend_online(aObj.innerText + "::" + aObj.href),function(){document.location.href = aObj.href});
        return false;
    } else {
        return true; //  allow user click to continue.
    }
}
