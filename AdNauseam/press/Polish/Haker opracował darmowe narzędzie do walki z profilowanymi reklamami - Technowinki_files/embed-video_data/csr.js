onet('adsCheck', 'ok')
onet('set','adid','fa4,118953,189504.fa4,121363,213871.fa4,102917,59583')
onet('adsRes', "");
onet('set', 'geoloc', {P:60});
if (onetAds.random == 1 || onetAds.random == 2 || onetAds.random == 3 || onetAds.random == 4) {
    onetAds.sendSLA = 1;
    if (typeof (onetAds.registerCreationsAudit) != 'undefined') {
      onetAds.registerCreationsAudit()
    }
    setTimeout(function() {
      onetAds.sendCreationsAudit();
    }, 30000);

    onetAds.resMonitReq = function(perfName) {
      if (perfName.match(/pl1\-sst\.sensic\.net/)) {
        return 'gfk';
      }
      if (perfName.match(/(.*?)csr.onet.pl(.*?)csr/)) {
        return 'csr';
      }
      if (perfName.match(/(.*?)ocdn.eu(.*?)init.js/)) {
        return 'init';
      }
      if (perfName.match(/(.*?)lib.onet.pl(.*?)init.js/)) {
        return 'init';
      }
      if (perfName.match(/(.*?)ocdn.eu(.*?)init\.sg\.min\.js/)) {
        return 'init';
      }
      if (perfName.match(/reklama.onet.pl(.*?)onetads\.js/)) {
        return 'init';
      }
      if (perfName.match(/events.ocdn.eu\/v1\/etag/)) {
        return 'nkr';
      }
      
    }
  }
(function() {
  onetAds.extJs = 0;
  if (self!=parent || location.protocol == "https:" || /(konto|sympatia)\.onet\.pl$/.test(location.hostname) || onetAds.mobile == 1) {  
    return;
  }
  
  if (/\.onet\.pl$/.test(location.hostname)) {
    crtg_nid="957";
    crtg_cookiename="onet_crt_adtech";
    crtg_varname="crtg_content";
    function crtg_getCookie(c_name){ var i,x,y,ARRCookies=document.cookie.split(";");for(i=0;i<ARRCookies.length;i++){x=ARRCookies[i].substr(0,ARRCookies[i].indexOf("="));y=ARRCookies[i].substr(ARRCookies[i].indexOf("=")+1);x=x.replace(/^\s+|\s+$/g,"");if(x==c_name){return unescape(y);}}return'';}
    crtg_content = crtg_getCookie(crtg_cookiename);var crtg_rnd=Math.floor(Math.random()*99999999999);
    var crtg_url=location.protocol+'//rtax.criteo.com/delivery/rta/rta.js?netId='+escape(crtg_nid);crtg_url+='&cookieName='+escape(crtg_cookiename);crtg_url+='&rnd='+crtg_rnd;crtg_url+='&varName=' + escape(crtg_varname);
    crtg_script=document.createElement('script');crtg_script.type='text/javascript';crtg_script.src=crtg_url;crtg_script.async=true;
    if(document.getElementsByTagName("head").length>0)document.getElementsByTagName("head")[0].appendChild(crtg_script);else if(document.getElementsByTagName("body").length>0)document.getElementsByTagName("body")[0].appendChild(crtg_script);
    if (location.hostname != 'www.onet.pl') {
      onetAds.onetAddAudit("//googleads.g.doubleclick.net/pagead/viewthroughconversion/972452827/?value=0&label=AT7fCI3luQIQ2-fZzwM&guid=ON&script=0");
    }
  } else if(onetAds.async == 1) {
    var ifrm = document.createElement("iframe");
    ifrm.id = "extJs";
    ifrm.style.width = "0px";
    ifrm.style.height = "0px";
    ifrm.style.display = "none";
    ifrm.setAttribute("src", "//lib.onet.pl/s.csr/external/iframe.html?v=20130313");
    document.body.appendChild(ifrm);
  }
})();

$onet['tb']=1;

var onet_ubi="201505241744087603100045";onetAds["time"]["TDMGR"]=1;onetShowAsynchAds1();