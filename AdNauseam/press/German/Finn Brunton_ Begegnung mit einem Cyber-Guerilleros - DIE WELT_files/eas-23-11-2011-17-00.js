EAS_flash = 1;
EAS_proto = "http:";
if (location.protocol == "https:") {
   EAS_proto = "https:";
}
if (document.getElementById) {
   EAS_dom = true;
} else {
   EAS_dom = false;
}
EAS_server = EAS_proto + "//eas4.emediate.eu";

function EAS_load(url) {
	document.write('<scr' + 'ipt language="JavaScript" src="' + url + '"></sc' + 'ript>');
}

function EAS_init(pages, parameters) {
	var EAS_ord=new Date().getTime();
	var EAS_url = EAS_server + "/eas?target=_blank&EASformat=jsvars&EAScus=" + pages + "&ord=" + EAS_ord;

	EAS_detect_flash();

	EAS_url += "&EASflash=" + EAS_flash;

	if (parameters) EAS_url += "&" + parameters;

	EAS_load(EAS_url);

	return;
}

function EAS_detect_flash() {
   if (EAS_flash > 1) return;

	var maxVersion = 11;
	var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;
	var isIE = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
	var isWin = (navigator.appVersion.indexOf("Windows") != -1) ? true : false;

	// write vbscript detection if we're not on mac.
	if(isIE && isWin && !isOpera){
		document.write('<SCR' + 'IPT LANGUAGE=VBScript\> \n');
		document.write('on error resume next \nDim eas_flobj(' + maxVersion + ') \n');
		for (i = 2; i < maxVersion; i++) {
			document.write('Set eas_flobj(' + i + ') = CreateObject("ShockwaveFlash.ShockwaveFlash.' + i + '") \n');
			document.write('if(IsObject(eas_flobj(' + i + '))) Then EAS_flash='+i+' \n');
		}
		document.write('</SCR' + 'IPT\> \n'); // break up end tag so it doesn't end our script
	} else if (navigator.plugins) {
		if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]){

			var isVersion2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
			var flashDescription = navigator.plugins["Shockwave Flash" + isVersion2].description;
			var flashVersion = parseInt(flashDescription.substr(flashDescription.indexOf(".") - 2, 2), 10);

			if (flashVersion > 1) EAS_flash = flashVersion;
		}
	}

	// alert("Version is " + EAS_flash);

}

function EAS_show_flash(width, height, src, extra) {
   var EAS_args = [];
   if (extra) EAS_args = extra.split(",");

   document.write('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + width + '" height="' + height + '"><param name=src value=' + src + '>');
   for (i = 0; i < EAS_args.length; i++) {
      EAS_eq = EAS_args[i].indexOf('=');
      EAS_nv0 = EAS_args[i].substring(0, EAS_eq );
      EAS_nv1 = EAS_args[i].substring(EAS_eq+1, EAS_args[i].length);
      document.write('<param name="' + EAS_nv0 + '" value="' + EAS_nv1 + '">');
   }
   document.write('<embed src="' + src + '" width="' + width + '" height="' + height + '" type="application/x-shockwave-flash"');
   for (i = 0; i < EAS_args.length; i++) {
      EAS_eq = EAS_args[i].indexOf('=');
      EAS_nv0 = EAS_args[i].substring(0, EAS_eq );
      EAS_nv1 = EAS_args[i].substring(EAS_eq+1, EAS_args[i].length);

      document.write(' ' + EAS_nv0 + '="' + EAS_nv1 + '"');
   }
   document.write('></embed></object>');
}

function EAS_embed_flash(width, height, src, params, flashvars, events, eventurl) {
   var par = "";
   var flashID = new Date().getTime() + "" + Math.floor(Math.random() * 11);
   if (params) {
      var args = [];
      var eq, nv0, nv1;
      args = params.split(',');
      for (i = 0; i < args.length; i++) {
         eq = args[i].indexOf('=');
         nv0 = args[i].substring(0, eq);
         nv1 = args[i].substring(eq + 1, args[i].length);
         if (nv0.toLowerCase() == 'flashvars') {
            if (typeof(flashvars) == "undefined")  {
               flashvars = nv1;
            } else {
               flashvars +=  "&" + nv1;
            }
         } else {
            par += '<param name="' + nv0 + '" value="' + nv1 + '" />';
         }
      }
   }

   if (events && eventurl) {
      var args = [];
      args = events.split(",");
      for (i = 0; i < args.length; i++) {
         flashvars += (flashvars ? "&" : "") + args[i] + "=" + eventurl + args[i];
      }
   }

   if (flashvars)
      par += '<param name="FlashVars" value="' + flashvars + '" />';

   document.write('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + width + '" height="' + height + '" id="eas_' + flashID + '"><param name="movie" value="' + src + '" />');
   if (params) document.write(par);

   document.write('<!--[if !IE]>-->');
   document.write('<object type="application/x-shockwave-flash" data="' + src + '" width="' + width + '" height="' + height + '">');
   if (params) document.write(par);
   document.write('</object>');
   document.write('<!--<![endif]-->');

   document.write('</object>');

   return;
}

function EAS_statistics() {

   var t = new Date();
   var EAS_time = t.getTime();
   var bWidth = 0;
   var bHeight = 0;
   var cdepth = 0;
   var plugins = "";
   var tmz = t.getTimezoneOffset() / 60;
   if (navigator.plugins) {
      var p = navigator.plugins;
      var pArr = new Array();
      for (var i = 0; i < p.length; i++) {
         if (p[i].name.indexOf("RealPlayer") != -1) pArr[0] = 1;
         else if (p[i].name.indexOf("Adobe Reader") != -1) pArr[1] = 1;
         else if (p[i].name.indexOf("Adobe Acrobat") != -1) pArr[1] = 1;
         else if (p[i].name.indexOf("Windows Media Player") != -1) pArr[2] = 1;
         else if (p[i].name.indexOf("QuickTime") != -1) pArr[3] = 1;
      }
      for (var i = 0; i < 4; i++) if (pArr[i]) plugins += i + ",";
   }

   if (typeof(EAS_cu) == "undefined") return;
   if (EAS_flash == 1) EAS_detect_flash();

   if (screen && screen.colorDepth) cdepth = screen.colorDepth;

   if (document.body && document.body.clientHeight > 50) {
      bWidth = document.body.clientWidth;
      bHeight = document.body.clientHeight;
   } else if (document.documentElement && document.documentElement.clientHeight > 50) {
      bWidth = document.documentElement.clientWidth;
      bHeight = document.documentElement.clientHeight;
   } else if (typeof(window.innerHeight == 'number')) {
      bWidth = window.innerWidth;
      bHeight = window.innerHeight;
   }

   var EAS_stat_tag = EAS_server + '/eas?cu=' + EAS_cu + ';ord=' + EAS_time;
   EAS_stat_tag += ';logrest=width=' + screen.width + ';height=' + screen.height + ';bwidth=' + bWidth + ';bheight=' + bHeight + ';time=' + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds();
   EAS_stat_tag += ";tmz=" + tmz;
   if (EAS_flash > 2) EAS_stat_tag += ';flash=' + EAS_flash;
   if (typeof(EAS_page) != "undefined") EAS_stat_tag += ';page=' + EAS_page;
   if (typeof(java) != "undefined" && java.installed) EAS_stat_tag += ';jversion=' + java.lang.System.getProperty("java.version");
   if (typeof(EAS_jsversion) != "undefined") EAS_stat_tag += ';jsversion=' + EAS_jsversion;
   if (cdepth) EAS_stat_tag += ';cdepth=' + cdepth;
   if (plugins) EAS_stat_tag += ';plugins=' + plugins;
   if (document.referrer) EAS_stat_tag += ';ref=' + escape(document.referrer);
   if (document.location) EAS_stat_tag += ';url=' + escape(document.location);
   if (typeof(EAS_capture) != "undefined") EAS_stat_tag += ';EAScapture=' + escape(EAS_capture);

   document.write('<img width="1" height="1" src="' + EAS_stat_tag + '">');
}

function EAS_duplicate(cu, expires) {
   var cookie_arr = document.cookie.split('; ');
   var nv_arr;
   var cu_arr;
   var duplicate = 0;
   var found_cu = 0;
   var now = Math.round(new Date().getTime() / 1000);
   var new_cookie = "";
   if (cookie_arr.length > 0) {
      for (var i = 0; i < cookie_arr.length; i++) {
         nv_arr = cookie_arr[i].split('=');
         if (nv_arr[0] == 'eas_dup') {
            cu_arr = nv_arr[1].split(':');
            for (var j = 0; j < cu_arr.length; j++) {
               cu_val = cu_arr[j].split('_');
               if (now - cu_val[1] < expires) {
                  if (cu_val[0] == cu) {
                     found_cu = 1;
                     duplicate = 1;
                     break;
                  } else {
                     if (new_cookie) new_cookie += ":";
                     new_cookie += cu_arr[j];
                  }
               }
            }
            break;
         }
      }
   }

   if (!duplicate) {
      if (!found_cu) {
         if (new_cookie) new_cookie += ":";
         new_cookie += cu + "_" + now;
      }
      document.cookie = "eas_dup=" + new_cookie + "; path=/; expires=Mon, 16-Mar-20 01:00:00 GMT;";
   }
   if (duplicate) return true;
   return false;
}

function EAS_place_ad(cus, EAS_options) {
   if(!EAS_dom) return;
   var set_size = 1;
   var safe_log = 0;
   var move_pos = 1;
   if (EAS_options) {
      var EAS_options_arr = EAS_options.split(",");
      for (var i = 0; i < EAS_options_arr.length; i++) {
         var EAS_temp = EAS_options_arr[i].split("=");
         var EAS_temp_val = 0;
         if (EAS_temp[1] == "1" || EAS_temp[1] == "y" || EAS_temp[1] == "yes") {
            EAS_temp_val = 1;
         }
         if (EAS_temp[0] == "set_size") set_size = EAS_temp_val;
         else if (EAS_temp[0] == "safe_log") safe_log = EAS_temp_val;
         else if (EAS_temp[0] == "move_pos") move_pos = EAS_temp_val;
      }
   }

   var EAS_cu_arr = cus.split(",");
   for (var i = 0; i < EAS_cu_arr.length; i++) {
      var EAS_cu = EAS_cu_arr[i];
      if (set_size || move_pos) {
         var EAS_temp = "EAS_position_" + EAS_cu;
         var EAS_div_position = document.getElementById(EAS_temp);
         if (EAS_div_position) {
            EAS_temp = "EAS_tag_" + EAS_cu;
            var EAS_div_tag = document.getElementById(EAS_temp);
            if (EAS_div_tag) {
               if (set_size) {
                  var EAS_width = eval("EAS_found_width_" + EAS_cu);
                  var EAS_height = eval("EAS_found_height_" + EAS_cu);
                  if (EAS_width && EAS_height) {
                     EAS_div_position.style.width = EAS_width + "px";
                     EAS_div_position.style.height = EAS_height + "px";
                  }
               }
               if (move_pos) {
                  var EAS_pos_top = EAS_pos_left = 0;
                  var EAS_pos_obj = EAS_div_position;
                  if (EAS_pos_obj.offsetParent) {
                     do {
                        EAS_pos_top += EAS_pos_obj.offsetTop;
                        EAS_pos_left += EAS_pos_obj.offsetLeft;
                     } while (EAS_pos_obj = EAS_pos_obj.offsetParent);
                     EAS_div_tag.style.position = "absolute";
                     EAS_div_tag.style.top = EAS_pos_top + "px";
                     EAS_div_tag.style.left = EAS_pos_left + "px";
                  }
               }
               EAS_div_tag.style.display = "block";
            }
         }
      }
      if (safe_log) {
         var confirm_img_src = eval("EAS_confirm_" + EAS_cu);
         if (confirm_img_src) {
            var confirm_img = new Image(1,1);
            confirm_img.src = confirm_img_src;
         }
      }
   }
}

function EAS_load_fif(divId, fifSrc, easSrc, width, height) {
   var d = document,
       fif = d.createElement("iframe"),
       div = d.getElementById(divId);

   fif.src = fifSrc;
   fif.style.width = width + "px";
   fif.style.height = height + "px";
   fif.style.margin = "0px";
   fif.style.borderWidth = "0px";
   fif.style.padding = "0px";
   fif.scrolling = "no";
   fif.frameBorder = "0";
   fif.allowTransparency = "true";
   fif.EAS_src = easSrc;
   div.appendChild(fif);
}

function EAS_resize_fif(expand, width, height) {
   if (typeof inDapIF !== "undefined") {
      var fif = window.frameElement;

      if (expand) {
         fif._width = fif.style.width;
         fif._height = fif.style.height;
         fif.style.width = width + "px";
         fif.style.height = height + "px";
      } else {
         fif.style.width = fif._width;
         fif.style.height = fif._height;
      }
   }
}

function EAS_ism(id, width, height, minVisibleRatio, url, interval, maxLogInterval, activeTimeout, maxDuration) {
   this.elementId = id;
   this.width = width;
   this.height = height;
   this.minVisibleRatio = minVisibleRatio;
   this.logUrl = url;
   this.interval = interval;
   this.logInterval = 0;
   this.maxLogInterval = maxLogInterval;
   this.activeTimeout = activeTimeout;
   this.maxDuration = maxDuration;
   this.isActive = true;
   this.activeDuration = 0;
   this.loggedDuration = 0;
   this.totalDuration = 0;
   this.lastActive = 0;
   this.lastLogged = 0;
   this.logEnabled = true;
   this.uid = this.getUid();
   this.debugEnabled = this.getDebug();

   this.updateLogInterval = (function() {
      var f0 = 1, f1 = 1;
      return function() {var f = f0 + f1; f0 = f1; f1 = f; this.logInterval = Math.min(f0 * this.interval, this.maxLogInterval)};
   })();

   var _this = this;
   w = window;
   d = document;

   if (typeof inDapIF !== "undefined") {
      w = window.top;
      d = parent.document;
   }

   if (/*@cc_on!@*/false) {
      this.addEventHandler(d, "focusin", function(){_this.setActive();});
      this.addEventHandler(d, "focusout", function(){_this.setInactive();});
   } else {
      this.addEventHandler(w, "focus", function(){_this.setActive();});
      this.addEventHandler(w, "blur", function(){_this.setInactive();});
   }
   this.addEventHandler(w, "scroll", function(){_this.setActive();});
   this.addEventHandler(w, "resize", function(){_this.setActive();});

   setInterval(function(){_this.update();}, _this.interval);

   if (this.debugEnabled) {
      ismElem = document.getElementById(this.elementId);
      debugWidth = (this.width) - 2;
      if (debugWidth < 100) {
         debugWidth = 100;
      }
      this.debugDiv = document.createElement("div");
      this.debugDiv.style.background = "#20AA4F";
      this.debugDiv.style.position = "absolute";
      this.debugDiv.style.top = "0px";
      this.debugDiv.style.left = "0px";
      this.debugDiv.style.width =  debugWidth + "px";
      this.debugDiv.style.fontSize = "10px";
      this.debugDiv.style.fontFamily = "Verdana";
      this.debugDiv.style.color = "#000";
      this.debugDiv.style.border = "1px solid white";
      this.debugDiv.style.zIndex = "1000";
      ismElem.appendChild(this.debugDiv);
   }
}

EAS_ism.prototype.addEventHandler = function(element, event, handler) {
   if (element.addEventListener) {
      element.addEventListener(event, handler, false);
   } else if (element.attachEvent) {
      element.attachEvent("on" + event, handler);
   }
}

EAS_ism.prototype.setActive = function() {
   this.isActive = true;
   this.lastActive = this.activeDuration;
}

EAS_ism.prototype.setInactive = function() {
   this.isActive = false;
}

EAS_ism.prototype.getPosition = function(id) {
   var position = {top: 0, right: 0, bottom: 0, left: 0};
   var e = document.getElementById(id);
   var w = window;
   var d = document;

   if (typeof inDapIF !== "undefined") {
      e = window.frameElement.parentNode;
      w = window.top;
      d = parent.document;
   }

   while (e) {
      position.left += e.offsetLeft;
      position.top += e.offsetTop;
      e = e.offsetParent;
   }

   if (typeof w.pageYOffset == 'number') {
      position.left -= w.pageXOffset;
      position.top -= w.pageYOffset;
   } else if (d.body && (d.body.scrollLeft || d.body.scrollTop)) {
      position.left -= d.body.scrollLeft;
      position.top -= d.body.scrollTop;
   } else if (d.documentElement && (d.documentElement.scrollLeft || d.documentElement.scrollTop)) {
      position.left -= d.documentElement.scrollLeft;
      position.top -= d.documentElement.scrollTop;
   }

   position.right = position.left + this.width;
   position.bottom = position.top + this.height;

   return position;
}

EAS_ism.prototype.getWindowSize = function() {
   var size = {width: 0, height: 0};
   var w = window;
   var d = document;

   if (typeof inDapIF !== "undefined") {
      w = window.top;
      d = parent.document;
   }

   if (typeof w.top.innerWidth == 'number') {
      size.width = w.top.innerWidth;
      size.height = w.top.innerHeight;
   } else if (d.documentElement && (d.documentElement.clientWidth || d.documentElement.clientHeight)) {
      size.width = d.documentElement.clientWidth;
      size.height = d.documentElement.clientHeight;
   } else if(d.body && (d.body.clientWidth || d.body.clientHeight)) {
      size.width = d.body.clientWidth;
      size.height = d.body.clientHeight;
   }

   return size;
}

EAS_ism.prototype.isHidden = function(windowSize, position) {
   function getArea(position) {
      return (position.right - position.left) * (position.bottom - position.top);
   }
   var totalArea = getArea(position);

   position.left = Math.max(0, position.left);
   position.right = Math.min(position.right, windowSize.width);
   position.top = Math.max(0, position.top);
   position.bottom = Math.min(position.bottom, windowSize.height);

   return (getArea(position) / totalArea < this.minVisibleRatio);
}

EAS_ism.prototype.log = function(time) {
   if (time <= 0) return;

   var url = this.logUrl + "&time=" + time + "&uid=" + this.uid;
   var oldScript = document.getElementById("EAS_ism");
   var script = document.createElement("script");
   script.setAttribute("type", "text/javascript");
   script.setAttribute("id", "EAS_ism");
   script.setAttribute("src", url);

   if (oldScript == null) {
      document.getElementsByTagName("head")[0].appendChild(script);
   } else {
      document.getElementsByTagName("head")[0].replaceChild(script, oldScript);
   }

   this.logEnabled = false;
   this.lastLogged = this.totalDuration;
   this.updateLogInterval();
}

EAS_ism.prototype.parseResponse = function(response) {
   if ("uid" in response) {
      this.loggedDuration = this.activeDuration;
      this.logEnabled = true;
   }
}

EAS_ism.prototype.getUid = function() {
   var uid = parseInt((new Date).getTime() / 1000) + Math.random().toString().slice(2, 11);
   
   return uid;
}

EAS_ism.prototype.getDebug = function() {
   if (typeof EAS_debug_ism != "undefined") {
      return EAS_debug_ism;
   }
   var debug = "";
   var d = document;

   if (typeof inDapIF !== "undefined") {
      d = parent.document;
   }

   if (typeof d.cookie != "undefined") {
      debug = (debug = d.cookie.match(new RegExp("(^|;|\\s)eas_debug_ism=([^;]+);?"))) ? debug[2] : "";
   }
   if (debug == "") {
      return false;
   }
   return true;
}

EAS_ism.prototype.update = function() {
   var isVisible = false;

   if (this.isActive) {
      if (this.activeDuration >= this.maxDuration || this.activeDuration - this.lastActive >= this.activeTimeout) {
         this.setInactive();
      } else {
         var position = this.getPosition(this.elementId);
         var windowSize = this.getWindowSize();

         if (!this.isHidden(windowSize, position)) {
            this.activeDuration += this.interval;
            isVisible = true;
         }
      }
   }

   if (this.logEnabled && this.lastLogged < this.maxDuration) {
      this.totalDuration += this.interval;
      if (this.totalDuration - this.lastLogged >= this.logInterval) {
         this.log(this.activeDuration - this.loggedDuration);
      }
   }

   if (this.debugEnabled) {
      this.debug(isVisible);
   }
};

EAS_ism.prototype.debug = function(isVisible) {
   if (this.debugEnabled && typeof this.debugDiv != "undefined") {
      pos = this.getPosition(this.elementId);
      if (pos.top < 0 && pos.bottom > 0) {
         this.debugDiv.style.top = (-pos.top) + "px";
      } else {
         this.debugDiv.style.top = "0px";
      }
      this.debugDiv.innerHTML = "&nbsp;" +
         (this.isActive ? "Active" : "Idle") +
         (this.isActive ? " and " +
         (isVisible ? "visible" : "hidden") : "") +
         "<br/>&nbsp;In-screen time: " + (this.activeDuration / 1000) +
         (this.logInterval ? ", Log interval: " + (this.logInterval / 1000) : "");
   }
}
