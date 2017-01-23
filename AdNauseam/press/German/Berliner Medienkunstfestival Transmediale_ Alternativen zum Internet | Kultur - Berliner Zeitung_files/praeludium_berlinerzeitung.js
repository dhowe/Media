// Tools SDM (fXm) 10.2011 03.2012 07.2012 06.2013 08.2013 02.2014 07.2014
// meikel, afofana, cflack, wwolfschuetz, sweber, jjourdan, djaschkowitz
// GNU Terry Pratchett

var fXm_Head = {
  create : {
    style : function (strn) {
      var newStyle = document.createElement('style');
      newStyle.type = 'text/css';
      if (newStyle.styleSheet) {
        /* IE */
        newStyle.styleSheet.cssText = strn;
      } else {
        newStyle.appendChild(document.createTextNode(strn));
      }
      this.add(newStyle);
    },
    script : function (src) {
      var newScript = document.createElement('script');
      newScript.type = 'text/javascript';
      newScript.src = src;
      this.add(newScript);
    },
    twin : function (presrc, postfn, syncflag) {
      var getElHead = document.getElementsByTagName('head')[0];
      var newSrcA = document.createElement('script');
      newSrcA.type = 'text/javascript';
      //if (!syncflag) newSrcA.async=false;
      newSrcA.src = unescape(presrc);
      newSrcA.onload = newSrcA.onreadystatechange = function () {
        if (!(this.readyState && this.readyState !== 'complete' && this.readyState !== 'loaded')) {
          this.onload = this.onreadystatechange = null;
          postfn();
        }
      };
      getElHead.appendChild(newSrcA);
    },
    add : function (node) {
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  },
  aframe : {
    BuildFrame : function (id, width, height, html) {
      var frame = document.createElement('iframe');
      var myLocation = window.location.href;
      frame.setAttribute('width', width);
      frame.setAttribute('height', height);
      frame.setAttribute('scrolling', 'no');
      frame.setAttribute('frameborder', '0');
      frame.setAttribute('allowtransparency', 'true');

      var eventEl = typeof DelayedAds !== 'undefined' && DelayedAds.enabled ? frame : window;
      this.AddEvent(eventEl, 'load', function () {
        window.setTimeout(function () {
          var isIE = navigator.appName === 'Microsoft Internet Explorer';
          var frameDocument = frame.contentDocument || frame.contentWindow.document;
          if (frameDocument.body.childNodes.length !== 0) return; // In Firefox 3.6 und IE doppeltes Laden des IFrames verhindern
          fXm_Head.aframe.FixDocumentWrite(frameDocument);
          frameDocument.open('text/html', 'replace');
          frameDocument.write('<html><head><style>body{margin:0;padding:0}body>img{position:absolute}</style><scr' + 'ipt type="text/javascript">var frn046resource = "fn";var google_page_url = "' + myLocation + '";</scr' + 'ipt></head><body>' + html + '</body></html>');
          if (!isIE && !window.opera) frameDocument.close(); // In IE und Opera wuerde document.close() das Laden des IFrames abbrechen
        }, 0);
      });
      var wrapper = document.getElementById('fxm-framed-ad-' + id);
      wrapper.appendChild(frame);
    },
    FixDocumentWrite : function (frameDocument) {
      var buffer = '';
      frameDocument.writeln = function (html) {
        buffer += html;
        if (fXm_Head.aframe.CountMatches(buffer, '<script') === fXm_Head.aframe.CountMatches(buffer, '</script')) {
          var tmpBuffer = buffer;
          buffer = '';
          frameDocument.write(tmpBuffer);
        }
      };
    },
    CountMatches : function (haystack, needle) {
      var matches = haystack.match(needle);
      return matches ? matches.length : 0;
    },
    AddEvent : function (el, name, fn) {
      if (typeof window.addEventListener !== 'undefined') {
        el.addEventListener(name, fn, false);
      } else if (typeof window.attachEvent !== 'undefined') {
        el.attachEvent('on' + name, fn); // IE 6-8
      }
    }
  },
  ping : function (url) {
    var pong = new Image();
    pong.src = url;
  },
  now : function () {
    var time = new Date();
    return time.getTime();
  },
  cleanamp : function (target) {
    target = (target.charAt(0) == '&') ? target.substr(1, target.length - 1) : target;
    target = (target.charAt(target.length - 1) == '&') ? target.substr(0, target.length - 1) : target;
    if (target === '') {
      return '';
    } else {
      return '&' + target;
    }
  }
};

var SDM_head = {
  cleansemcol : function (target) {
    target = (target.charAt(0) == ';') ? target.substr(1, target.length - 1) : target;
    target = (target.charAt(target.length - 1) == ';') ? target.substr(0, target.length - 1) : target;
    if (target === '') {
      return '';
    } else {
      return ';' + target;
    }
  },
  query : function (par) {
    var retvalue = '';
    var querystring = window.location.search;
    if (querystring !== '') {
      var i = querystring.indexOf(par + '=');
      if (i >= 0) {
        i = i + par.length + 1;
        var k = querystring.indexOf('&', i);
        if (k < 0 || par == 'url') k = querystring.length;
        retvalue = querystring.substring(i, k);
      }
    }
    return unescape(retvalue);
  },
  eyeo_cnt : function () {
    if (typeof(SDM_urnd) === 'undefined') {
      fXm_Head.ping('//cdn.stroeerdigitalmedia.de/dcfc.gif?eyeo&cb=' + SDM_rnd);
    } else {
      fXm_Head.ping('//cdn.stroeerdigitalmedia.de/dcfc.gif?noeyeo&cb=' + SDM_rnd);
    }
  },
  isinarray : function (array, search) {
    if (!Array.prototype.indexOf) {
      from = 0;
      len = array.length >>> 0;
      for (; from < len; from++) {
        if (from in array && array[from] === search) return true;
      }
      return false;
    } else {
      return array.indexOf(search) >= 0;
    }
  },
  prep : {
    asigmd : function () {
      // prepare Audience Science Gateway MEDIA Direct
      try {
        var SDM_asienr = ''; //ASci Anreicherung via Cookie
        if (typeof asiPlacements != 'undefined') {
          if (typeof asiAdserver != 'undefined') {
            asiPlacements.asiAdserver = asiAdserver;
          }
          SDM_asienr = escape(JSON.stringify(asiPlacements));
          fXm_Head.ping('//cdn.stroeerdigitalmedia.de/Cookie?co=asgw&val=' + SDM_asienr + '&m=10&cb=' + SDM_rnd);
        }
      } catch(ignore) {}
    },    
    crit : function () {
      // prepare criteo real time audience
      crtg_content = crtg_content.replace(/=1|&/g, '').replace(/(.+);$/, '$1').replace(/;/g, '|');
      // Cookie-dropping
      if (crtg_content !== '') {
        fXm_Head.ping('//cdn.stroeerdigitalmedia.de/Cookie?co=crt&val=' + crtg_content + '&m=43200&cb=' + SDM_rnd);
      } else {
        fXm_Head.ping('//cdn.stroeerdigitalmedia.de/Cookie?co=crt&val=0&m=0&cb=' + SDM_rnd);
      }
    },
    nugg : function () {
      // prepare nugg.ad targeting
      // Cookie-dropping
      n_pbt = n_pbt.replace(/(.+);$/, '$1').replace(/;/g, '|');
      if (n_pbt !== "") fXm_Head.ping('//cdn.stroeerdigitalmedia.de/Cookie?co=nug&val=' + n_pbt + '&m=10080&cb=' + SDM_rnd);
    }
  },
  getViewPortWidth : function () {
    return document.documentElement.clientWidth;
  }
};

//prepare random
var frn046rnd = Math.round(Math.random() * 314159265); // deprecated
var SDM_rnd = Math.floor(Math.random() * 314159265358);

var frn046adxtra = ''; // reaktiviert wegen Anreicherung adset=f durch Sites
// preliminary combine preparations

// Anreicherungsvariable inkl. Markierung 'Praeludium!'

var SDM_adxtra = ';prae=y';
var SDM_target = '';
var GPT_tagType = '';
var SDM_demo = '';

SDM_demo = (SDM_head.query('sDmaD') || SDM_head.query('sdmad'));
if (SDM_demo !== '') {
  SDM_adxtra += SDM_head.cleansemcol(SDM_demo);
}

// prepare tie, resourcing, Bandbreite; Schreibweise bei resource beachten wg. praeludium-Script!
var frn046tie = 'free'; // weiterhin zur Tandem-Erkennung
var frn046resource = 'blank'; // deprecated
var SDM_resource = 'berlinerzeitung';

// welche version des Containers?
sdm_vers = (typeof(sdm_vers) != 'undefined') ? sdm_vers : 0;
n_pbt = (typeof(n_pbt) != 'undefined') ? n_pbt : "";

// maximale Contentbreite im responsiven Design prüfen

if (SDM_resource === 'fn') {
  if (SDM_head.getViewPortWidth() >= 1462) {
    SDM_adxtra += ';cnw=max';
  }
}

// prepare nugg.ad
var SDM_nurl = 'http://si.nuggad.net/rc?nuggn=1516487384';
var SDM_nonugg = ["freeplay", "gelbeseiten", "automobile", "meinauto"];
// New_Nugg_Url
var SDM_nsid=2140999718; //preset
if (SDM_nsid > 0) SDM_nurl = 'http://si.nuggad.net/rc?nuggn=571289945&nuggsid=' + SDM_nsid + '&nuggrid=' + encodeURIComponent(top.location.href);
if (document.location.protocol == "https:") SDM_nurl = SDM_nurl.replace("http://si.", "https://si-s.");

//  nur Aufbereitung bei sync request aus Container
try {
  if (sdm_vers === 0) SDM_adxtra += SDM_head.cleansemcol(n_pbt);
} catch (ignore) {}
//sync, prereqest
// nur async wenn NICHT schon Antwort aus Container
if ((sdm_vers >= 1) && !SDM_head.isinarray(SDM_nonugg, SDM_resource)) fXm_Head.create.twin(escape(SDM_nurl), SDM_head.prep.nugg, true);

// prepare meta schlagwort targeting
function SDM_getMetaContents(mn) {
  var m = document.getElementsByTagName('meta');
  for (var i in m) {
    if (m[i].name == mn) return m[i].content;
  }
}
// SDM (new)
var SDM_KWTargeting = [['mol 1kps', 'mpkey', 'keywords', [['Helm', '01'], ['Kombi', '02'], ['Stiefel', '03'], ['Hose', '04'], ['Handschuh', '05'], ['Jacke', '06'], ['Reifen', '07'], ['Auspuff', '08'], ['Navigationssysteme', '09'], ['Gepäck', '10'], ['Verschleißteile', '11'], ['Fahrwerk', '12'], ['Cruiser', '13'], ['Enduro', '14'], ['Klassiker', '15'], ['Motocross', '16'], ['NakedBike', '17'], ['Quad', '18'], ['Roller', '19'], ['Sporttourer', '20'], ['Supermoto', '21'], ['Supersportler', '22'], ['Tourer', '23'], ['Aprilia', '24'], ['BMW', '25'], ['Cagiva', '26'], ['Ducati', '27'], ['Harley-Davidson', '28'], ['Honda', '29'], ['Horex', '30'], ['Husqvarna', '31'], ['Kawasaki', '32'], ['KTM', '33'], ['MotoGuzzi', '34'], ['MVAgusta', '35'], ['Suzuki', '36'], ['Triumph', '37'], ['Victory', '38'], ['Yamaha', '39']]], ['spox sportal', 'spxkey', 'keywords', [['Bayern München', '01']]], ['mensh rworld womenshealth fddb', 'mkey', 'themen', [['grill', '01'],['Grill', '01'],['Fleisch', '01'],['fleisch', '01'],['Rind','01'],['Tartar','01'],['Hack','01'],['Schwein','01'],['Wurst','01'],['Lamm','01'],['Kalb','01'],['Hamburger', '01'],['Hähnchen', '01'],['Fisch', '02'],['Lachs', '02'],['Honig', '03'],['Schokolade', '03'],['Back', '03'],['Bonbon', '03'],['Pralinen', '03'],['Kuchen', '03'],['Wein', '04'],['Bier', '04'],['Cocktails', '04'],['Müsli', '05'],['Nüsse', '05'],['Kürbis', '05'],['Walnuss', '05'],['Ananas', '06'],['Artischocke', '06'],['Avocado', '06'],['Birne', '06'],['Broccolini', '06'],['Cranberries', '06'],['Gemüse', '06'],['Pflaumen', '06'],['Feigen', '06'],['Granatapfel', '06'],['Spargel', '06'],['Kartoffeln', '06'],['Kiwi', '06'],['Mandarinen', '06'],['Obst', '06'],['Orange', '06'],['Paprika', '06'],['Salat', '06'],['Smoothies', '06'],['Spinat', '06'],['Tomate', '06'],['Vitamine', '06'],['Zitrone', '06'],['Apfel', '06'],['Apfelschorle', '06'],['Banane', '06'],['Blutorangen', '06'],['Fruchtsaft', '06'],['Himbeeren', '06'],['Mango', '06'],['Pilze', '06'],['Rhabarber', '06'],['Rosenkohl', '06'],['Saftschorle ', '06']]]];

(function() {
  for (var j = SDM_KWTargeting.length - 1; j >= 0; j--) {
    if (SDM_KWTargeting[j][0].search(SDM_resource) != -1) {
      if (typeof SDM_getMetaContents(SDM_KWTargeting[j][2]) != 'undefined') {
        SDM_meta = SDM_getMetaContents(SDM_KWTargeting[j][2]).split(',');
        SDM_values = [];

        for (var i = SDM_meta.length - 1; i >= 0; i--) {
          for (var n = SDM_KWTargeting[j][3].length - 1; n >= 0; n--) {
            regex = new RegExp(SDM_KWTargeting[j][3][n][0]);
            if (SDM_meta[i].search(regex) != -1) {
              if (SDM_values.indexOf(SDM_KWTargeting[j][3][n][1]) == -1) {
                SDM_values.push(SDM_KWTargeting[j][3][n][1]);
              }
            }
          }
        }
        SDM_kv = SDM_KWTargeting[j][1] + '=' + SDM_values.join(',');
      }
    }
  }
  if (typeof SDM_kv != 'undefined') {
    SDM_adxtra += ';' + SDM_kv;
  }
})();

if ((SDM_resource == 'spox') && (window.location.pathname == '/de/sport/fussball/dfb-team/1411/Artikel/voting-aufstellung-startelf-deutschland-gibraltar-bundestrainer-loew.html')) {
  SDM_adxtra += ';spxkey=02';
}
if ((SDM_resource == 'ams') && (window.location.pathname == '/adventskalender/adventskalender-5947942.html')) {
  SDM_adxtra += ';mkey=99';
}

// MPS virtuelle Portale
if ((SDM_resource == 'ams') && (typeof(SDM_getMetaContents('Portal_Select')) != 'undefined')) {
  switch (SDM_getMetaContents('Portal_Select')) {
    // case 'AMS':
    //     SDM_defsite='P4444.ams.auto-motor-sport.de_de';
    //     SDM_defzone='Rest';
    //     break;
  case 'MKL':
    SDM_defsite = 'p4444.sdm.motor-klassik.de_de';
    SDM_defzone = 'Rest';
    break;
  case 'SPA':
    SDM_defsite = 'p4444.sdm.sportauto.de_de';
    SDM_defzone = 'Rest';
    break;
  case '4WF':
    SDM_defsite = 'p4444.sdm.4wheelfun.de_de';
    SDM_defzone = 'Rest';
    break;
  }
}

// Audience Science Gateway MEDIA Direct (asi)
// IpZElE: 300x250; Rdkg7V: 160x600; NkqpjZ: 728x90; acWaVx: 728x180; RmJKxA: 300x600; oeu2b6: Exp. Skyscraper; BnG7vD: Sidebar
function asiCallOnload(){
  var SDM_noasci = ['meinauto'];
  var asi_p = 'IpZElE,Rdkg7V,NkqpjZ,acWaVx,RmJKxA,BnG7vD,oeu2b6,foY3mB'; //Produktion
  var asiPqTag = false; //Initialisierung, Antwort setzt auf true
  try {
    if ((sdm_vers >= 1) && !SDM_head.isinarray(SDM_noasci, SDM_resource)) {
      fXm_Head.create.twin(escape('//pq-direct.revsci.net/pql?placementIdList=' + asi_p), SDM_head.prep.asigmd, true);
    }
  } catch (ignore) {}

  // Audience Science Data Sharing
  if (!SDM_head.isinarray(SDM_noasci, SDM_resource)) {
    fXm_Head.create.script('//js.revsci.net/gateway/gw.js?csid=F09828&auto=t&bpid=Stroer');
  }
}
fXm_Head.aframe.AddEvent(window, 'load', asiCallOnload);

// MBR Cookie-sync
fXm_Head.create.script('//tracking.m6r.eu/sync/container?source=praeludium');

// TheADEX SDG-DMP
var SDM_adexlist=['1kps','4pl','4wf','aero','aerokurier','ams','angurten','anpfiff','anschlusstor','areadvd','autoextrem','baby-vornamen','beautyjunkies','bergst','buff','carav','caraworld','cavallo','cmpbs','crossmagazin','cyclingmanager','daddylicious','ddos','derclub','dlh','druckerchannel','eishockey24','eishy','evocarsmag','fanreport','flugrevue','fmarena','content1','fotocommunity','foozee','fn','funspt','fussballarena','fussballeuropa','gamesakt','gz','geliebtekatze','giga','goal','halloeltern','handballserver','hbworld','herzfuertiere','kicktipp','kidszone','kino','klassikerluftfahrt','leichtath','liga2online','liga3online','ligamanager','ltur','mehrtanken','mensh','mkl','mol','mpsair','mtbmagazin','myfanbase','nflcom','notebookcheck','onlinetennis','outdch','outdoormagazin','partnerhund','pcaction','pcgames','pcgh','planetsnow','pokewiki','promo','raceoffice','radsport','rallyemagazin','rbfans','rworld','single','snoa','snowbdn','solebich','spa','speedmagazin','sportal','spox','sft','stadionwelt','swimsportnews','tennisnet','trwrk','turus','tvpro','uspforum','vgz','vorname','webauto','wfbll','winboard','winfut','womenshealth','wrestlinginfos','zeugwart','zwelle'];

if (SDM_head.isinarray(SDM_adexlist, SDM_resource)) {
  fXm_Head.create.script('//dmp.theadex.com/d/173/249/s/adex.js');
}
//fXm_Head.ping('//dmp.theadex.com/d/173/249/i/1.gif?' + SDM_resource + '__' + SDM_rnd);

// Criteo Real Time Audience
var SDM_nocrit = ['meinauto'];
var crtg_nid = '1363';
var crtg_content = '';
var crtg_url = '//rtax.criteo.com/delivery/rta/rta.js?netId=' + escape(crtg_nid);
crtg_url += '&rnd=' + SDM_rnd;
crtg_url += '&varName=crtg_content';
crtg_url += '&cookiecreation=0';
if ((sdm_vers >= 1) && !SDM_head.isinarray(SDM_nocrit, SDM_resource)) {
  fXm_Head.create.twin(escape(crtg_url), SDM_head.prep.crit, true);
}

// initialize eyeo count
fXm_Head.aframe.AddEvent(window, 'load', SDM_head.eyeo_cnt);

/*
Copyright (c) Copyright (c) 2007, Carl S. Yestrau All rights reserved.
Code licensed under the BSD License: http://www.featureblend.com/license.txt
Version: 1.0.4
(Derived with minor modifications)
*/
var fXmFlashDetect = new function () {
  var self = this;
  self.installed = false;
  self.raw = "";
  self.major = -1;
  self.minor = -1;
  self.revision = -1;
  self.revisionStr = "";
  var activeXDetectRules = [{
      "name" : "ShockwaveFlash.ShockwaveFlash.7",
      "version" : function (obj) {
        return getActiveXVersion(obj);
      }
    }, {
      "name" : "ShockwaveFlash.ShockwaveFlash.6",
      "version" : function (obj) {
        var version = "6,0,21";
        try {
          obj.AllowScriptAccess = "always";
          version = getActiveXVersion(obj);
        } catch (ignore) {}
        return version;
      }
    }, {
      "name" : "ShockwaveFlash.ShockwaveFlash",
      "version" : function (obj) {
        return getActiveXVersion(obj);
      }
    }
  ];
  /**
   * Extract the ActiveX version of the plugin.
   *
   * @param {Object} The flash ActiveX object.
   * @type String
   */
  var getActiveXVersion = function (activeXObj) {
    var version = -1;
    try {
      version = activeXObj.GetVariable("$version");
    } catch (ignore) {}
    return version;
  };
  /**
   * Try and retrieve an ActiveX object having a specified name.
   *
   * @param {String} name The ActiveX object name lookup.
   * @return One of ActiveX object or a simple object having an attribute of activeXError with a value of true.
   * @type Object
   */
  var getActiveXObject = function (name) {
    var obj = -1;
    try {
      obj = new ActiveXObject(name);
    } catch (ignore) {
      obj = {
        activeXError : true
      };
    }
    return obj;
  };
  /**
   * Parse an ActiveX $version string into an object.
   *
   * @param {String} str The ActiveX Object GetVariable($version) return value.
   * @return An object having raw, major, minor, revision and revisionStr attributes.
   * @type Object
   */
  var parseActiveXVersion = function (str) {
    var versionArray = str.split(","); //replace with regex
    return {
      "raw" : str,
      "major" : parseInt(versionArray[0].split(" ")[1], 10),
      "minor" : parseInt(versionArray[1], 10),
      "revision" : parseInt(versionArray[2], 10),
      "revisionStr" : versionArray[2]
    };
  };
  /**
   * Parse a standard enabledPlugin.description into an object.
   *
   * @param {String} str The enabledPlugin.description value.
   * @return An object having raw, major, minor, revision and revisionStr attributes.
   * @type Object
   */
  var parseStandardVersion = function (str) {
    var descParts = str.split(/ +/);
    var majorMinor = descParts[2].split(/\./);
    var revisionStr = descParts[3];
    return {
      "raw" : str,
      "major" : parseInt(majorMinor[0], 10),
      "minor" : parseInt(majorMinor[1], 10),
      "revisionStr" : revisionStr,
      "revision" : parseRevisionStrToInt(revisionStr)
    };
  };
  /**
   * Parse the plugin revision string into an integer.
   *
   * @param {String} The revision in string format.
   * @type Number
   */
  var parseRevisionStrToInt = function (str) {
    return parseInt(str.replace(/[a-zA-Z]/g, ""), 10) || self.revision;
  };
  /**
   * Is the major version greater than or equal to a specified version.
   *
   * @param {Number} version The minimum required major version.
   * @type Boolean
   */
  self.majorAtLeast = function (version) {
    return self.major >= version;
  };
  /**
   * Is the minor version greater than or equal to a specified version.
   *
   * @param {Number} version The minimum required minor version.
   * @type Boolean
   */
  self.minorAtLeast = function (version) {
    return self.minor >= version;
  };
  /**
   * Is the revision version greater than or equal to a specified version.
   *
   * @param {Number} version The minimum required revision version.
   * @type Boolean
   */
  self.revisionAtLeast = function (version) {
    return self.revision >= version;
  };
  /**
   * Is the version greater than or equal to a specified major, minor and revision.
   *
   * @param {Number} major The minimum required major version.
   * @param {Number} (Optional) minor The minimum required minor version.
   * @param {Number} (Optional) revision The minimum required revision version.
   * @type Boolean
   */
  self.versionAtLeast = function (major) {
    var properties = [self.major, self.minor, self.revision];
    var len = Math.min(properties.length, arguments.length);
    for (i = 0; i < len; i++) {
      if (properties[i] >= arguments[i]) {
        if (i + 1 < len && properties[i] == arguments[i]) {
          continue;
        } else {
          return true;
        }
      } else {
        return false;
      }
    }
  };
  /**
   * Constructor, sets raw, major, minor, revisionStr, revision and installed public properties.
   */
  self.fXmFlashDetect = function () {
    if (navigator.plugins && navigator.plugins.length > 0) {
      var type = 'application/x-shockwave-flash';
      var mimeTypes = navigator.mimeTypes;
      if (mimeTypes && mimeTypes[type] && mimeTypes[type].enabledPlugin && mimeTypes[type].enabledPlugin.description) {
        var version = mimeTypes[type].enabledPlugin.description;
        var versionObj = parseStandardVersion(version);
        self.raw = versionObj.raw;
        self.major = versionObj.major;
        self.minor = versionObj.minor;
        self.revisionStr = versionObj.revisionStr;
        self.revision = versionObj.revision;
        self.installed = true;
      }
    } else if (navigator.appVersion.indexOf("Mac") == -1 && window.execScript) {
      var version = -1;
      for (var i = 0; i < activeXDetectRules.length && version == -1; i++) {
        var obj = getActiveXObject(activeXDetectRules[i].name);
        if (!obj.activeXError) {
          self.installed = true;
          version = activeXDetectRules[i].version(obj);
          if (version !== -1) {
            var versionObj = parseActiveXVersion(version);
            self.raw = versionObj.raw;
            self.major = versionObj.major;
            self.minor = versionObj.minor;
            self.revision = versionObj.revision;
            self.revisionStr = versionObj.revisionStr;
          }
        }
      }
    }
  }
  ();
};
fXmFlashDetect.JS_RELEASE = "1.0.4";

// targeting auf flash
if (!(fXmFlashDetect.versionAtLeast(9, 0)))
  SDM_adxtra += ";flash=no";

/*
GPT-Setup 
*/

var GPT_resource = ['jolie','maedchen','madame','familie','starflash','mensh','promiflash']; 

if (SDM_head.isinarray(GPT_resource, SDM_resource)) {
  var GPT_targets_temp = (typeof GPT_targets_temp !== 'undefined') ? GPT_targets_temp : [];
  var GPT_targets = (typeof GPT_targets !== 'undefined') ? GPT_targets : [];

  // function - prepare targeting
  var GPT_prepTargeting = function () {
    var SDM_targetArr, GPT_attachTargeting, GPT_targetFunc, valueTemp, pushTemp, i, z;
    SDM_target = (typeof SDM_target !== 'undefined') ? SDM_target : '';
    SDM_adxtra = (typeof SDM_adxtra !== 'undefined') ? SDM_adxtra : '';
    SDM_adset = (typeof SDM_adset !== 'undefined') ? SDM_adset : '';
    SDM_target += SDM_adxtra + SDM_adset;
    if (SDM_target !== '') {
      SDM_targetArr = SDM_target.split(';');
      if (SDM_targetArr !== '') {
        for (i = SDM_targetArr.length - 1; i >= 0; i--) {
          if (SDM_targetArr[i].split('=') !== '') {
            GPT_targets_temp.push(SDM_targetArr[i].split('='));
          }
        }
      }
      if (GPT_targets_temp !== []) {
        for (i = 0; i < GPT_targets_temp.length; i++) {
          if (GPT_targets_temp[i].length == 2 && GPT_targets_temp[i][1] !== '') {
            GPT_targets.push(GPT_targets_temp[i]);
          }
        }
        GPT_attachTargeting = '';
        if (GPT_targets.length >= 1) {
          GPT_targets.sort();
          GPT_attachTargeting = 'googletag.pubads()';
          for (i = GPT_targets.length - 1; i >= 0; i--) {
            if (i == 0 || GPT_targets[i][0] !== GPT_targets[i-1][0]) {
              valueTemp = GPT_targets[i][1].split(',');
              if (valueTemp.length == 1) {
                GPT_attachTargeting += '.setTargeting("' + GPT_targets[i][0] + '","' + GPT_targets[i][1] + '")';
              } else {
                GPT_attachTargeting += '.setTargeting("' + GPT_targets[i][0] + '",[';
                for (z = valueTemp.length-1; z >= 0; z--) {
                  GPT_attachTargeting += '"' + valueTemp[z] + '"';
                  if (z !== 0) {
                    GPT_attachTargeting += ',';
                  }  
                }
                GPT_attachTargeting += '])';
              }
            } else {
              valueTemp = GPT_targets[i][1].split(',');
              pushTemp = valueTemp.push(GPT_targets[i-1][1].split(','));
              GPT_attachTargeting += '.setTargeting("' + GPT_targets[i][0] + '",[';
              for (z = valueTemp.length-1; z >= 0; z--) {
                GPT_attachTargeting += '"' + valueTemp[z] + '"';
                if (z !== 0) {
                  GPT_attachTargeting += ',';
                }
              }
              GPT_attachTargeting += '])';
              i--;
            }
          }
          GPT_attachTargeting += ';';
          GPT_targetFunc = (new Function(GPT_attachTargeting))();
        }
      }
    }
  };

  var googletag = googletag || {};
  googletag.cmd = googletag.cmd || [];

  fXm_Head.create.twin('//cdn.stroeerdigitalmedia.de/dynback/call.sjs?' + SDM_rnd, function() { fXm_Head.create.script('//www.googletagservices.com/tag/js/gpt.js'); });
  
  googletag.cmd.push(function () {
    googletag.pubads().collapseEmptyDivs(true);
    googletag.pubads().enableSingleRequest();
    googletag.pubads().disableInitialLoad();
    googletag.enableServices(); 
  });
  function refreshAdslots() {
    try {
      GPT_prepTargeting();
      googletag.pubads().refresh();
    } catch(ignore){}
  };
  fXm_Head.aframe.AddEvent(window, 'load', refreshAdslots);
}