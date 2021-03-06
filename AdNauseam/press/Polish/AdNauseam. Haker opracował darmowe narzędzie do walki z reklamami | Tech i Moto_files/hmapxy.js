// common

if (typeof ghmxy_hitcollector=='undefined') {
	var ghmxy_hitcollector='tvn.hit.gemius.pl';
}
var ghmxy_proto;
if(document.location && document.location.protocol) {
	ghmxy_proto = 'http'+((document.location.protocol=='https:')?'s':'')+'://';
} else {
	ghmxy_proto = 'http://';
}


var ghmxy_images = new Array();
var ghmxy_hm_data_to_send = "";
var ghmxy_xy_data_to_send = "";
var ghmxy_last_x = -1;
var ghmxy_last_y = -1;

function ghmxy_send() {
	if (ghmxy_hm_data_to_send!="" || ghmxy_xy_data_to_send!="") {
		var ghmxy_url = ghmxy_proto+ghmxy_hitcollector+"/_"+(new Date()).getTime()+"/redot.gif?"+ghmxy_hm_data_to_send+"&"+ghmxy_xy_data_to_send;
		ghmxy_hm_data_to_send = "";
		ghmxy_xy_data_to_send = "";
		var ghmxy_image = new Image();
		ghmxy_image.src = ghmxy_url;
		ghmxy_images[ghmxy_images.length] = ghmxy_image;
		var start = (new Date()).getTime();
		while (start+200>(new Date()).getTime());
	}
}

// (c) by Gemius SA - gemius link map
// ver. 4.15

function ghmxy_checklink(node,usecache) {
	if (usecache && node.ghmxy_checklink) {
		return node.ghmxy_checklink;
	}
	var imn	= null;
	if (node.nodeName == "#text") {
		if (node.nodeValue && node.nodeValue.replace(/[ \t\r\n]+/g,"").length > 0) {
			imn = node;
		}
	} else if (node.nodeName == "IMG") {
		imn = node;
	} else if (node.childNodes) {
		for (var i = 0 ; i < node.childNodes.length ; i++) {
			var hn = ghmxy_checklink(node.childNodes[i]);
			if (hn != null) {
				if (hn.nodeName == "#text") {
					imn = hn;
					break;
				}
				if (imn == null) {
					imn = hn;
				}
			}
		}
	}
	if (usecache) {
		node.ghmxy_checklink = imn;
	}
	return imn;
}

function ghmxy_toutf8(str) {
	function Hex(n) {
		var hexMap = '0123456789ABCDEF';
		return '%'+hexMap.charAt(n>>4)+hexMap.charAt(n&0xF);
	}
	var c,s,uc,ul;
	var dst = '';
	for (var i=0 ; i<str.length ; i++) {
		c = str.charCodeAt(i);
		if ((c>=0xDC00)&&(c<0xE000)) continue;
		if ((c>=0xD800)&&(c<0xDC00)) {
			i++;
			if (i>=str.length) continue;
			s = str.charCodeAt(i);
			if ((s<0xDC00)||(s>=0xDE00)) continue;
			c = ((c-0xD800)<<10)+(s-0xDC00)+0x10000;
		}
		if (c<=0x20 || c==0x22 || c==0x7C) {
			uc = Hex(c);
		} else if (c<0x80) {
			uc = String.fromCharCode(c);
		} else if (c<0x800) {
			uc = Hex(0xC0+(c>>6))+Hex(0x80+(c&0x3F));
		} else if (c<0x10000) {
			uc = Hex(0xE0+(c>>12))+Hex(0x80+(c>>6&0x3F))+Hex(0x80+(c&0x3F));
		} else {
			uc = Hex(0xF0+(c>>18))+Hex(0x80+(c>>12&0x3F))+Hex(0x80+(c>>6&0x3F))+Hex(0x80+(c&0x3F));
		}
		dst+=uc;
	}
	return dst;
}

function ghmxy_url_escape(str) {
	return ghmxy_toutf8(str).replace(/\x2520|\x2509|\x250[aA]|\x250[dD]/g,"")
}

function ghmxy_load() {
	if (document.getElementById && document.getElementsByTagName) {
		var allImages = document.getElementsByTagName("img");
		var allInputs = document.getElementsByTagName("input");
		var allForms = document.getElementsByTagName("form");
		var i;
		if (allImages) {
			for (i=0; i<allImages.length; i++) {
				if (typeof(allImages[i].src) != "undefined") {
					allImages[i].ghmxy_src = allImages[i].src;
				}
			}
		}
		if (allInputs) {
			for (i=0; i<allInputs.length; i++) {
				if (typeof(allInputs[i].value) != "undefined") {
					allInputs[i].ghmxy_value = allInputs[i].value;
				}
				if (typeof(allInputs[i].src) != "undefined") {
					allInputs[i].ghmxy_src = allInputs[i].src;
				}
			}
		}
		if (allForms) {
			for (i=0; i<allForms.length; i++) {
				if (typeof(allForms[i].action) != "undefined") {
					allForms[i].ghmxy_action = allForms[i].action;
				}
			}
		}
	}
}

function ghmxy_gettext(node,usecache) {
	if (usecache && node.ghmxy_gettext) {
		return node.ghmxy_gettext;
	}
	var rettext="";
	if (node.nodeName=="#text") {
		rettext = node.nodeValue;
	} else if (node.nodeName=="IMG") {
		var src="";
		var alt="";
		if (node.ghmxy_src) {
			src = node.ghmxy_src;
		} else {
			src = node.src;
		}
		if (node.alt) {
			alt = node.alt;
		}
		rettext = "img:"+ghmxy_url_escape(src)+":"+alt;
	} else if (node.childNodes) {
		for (var i=0 ; i<node.childNodes.length ; i++) {
			if (node.childNodes[i].nodeName!='A') {
				rettext+=" "+ghmxy_gettext(node.childNodes[i],usecache);
			}
		}
	}
	if (usecache) {
		node.ghmxy_gettext = rettext;
	}
	return rettext;
}

function ghmxy_checksum(itext,pos) {
	var cs=0;
	var b64map=".ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";
	for (var n = pos; n < itext.length; n++) {
		cs = ((cs * 13) + itext.charCodeAt(n))&0xFFF;
	}
	return b64map.charAt((cs>>6)&0x3F)+b64map.charAt(cs&0x3F);
}

function ghmxy_tail_checksum(str,limit) {
	var c,s,ul;
	for (var i=0 ; i<str.length ; i++) {
		c = str.charCodeAt(i);
		if ((c>=0xDC00)&&(c<0xE000)) continue;
		if ((c>=0xD800)&&(c<0xDC00)) {
			i++;
			if (i>=str.length) continue;
			s = str.charCodeAt(i);
			if ((s<0xDC00)||(s>=0xE000)) continue;
			c = ((c-0xD800)<<10)+(s-0xDC00)+0x10000;
		}
		if (c<=0x20) {
			ul = 3;
		} else if (c<0x80) {
			ul = 1;
		} else if (c<0x800) {
			ul = 2;
		} else if (c<0x10000) {
			ul = 3;
		} else {
			ul = 4;
		}
		limit -= ul;
		if (limit<0) {
			return ghmxy_checksum(str,i);
		}
	}
	return "";
}

function ghmxy_escape(str,limit,doescape) {
	function Hex(n) {
		var hexMap = "0123456789ABCDEF";
		return hexMap.charAt(n>>4)+hexMap.charAt(n&0xF);
	}
	var c,s,uc,ul;
	var dst = "";
	for (var i=0 ; i<str.length ; i++) {
		c = str.charCodeAt(i);
		if ((c>=0xDC00)&&(c<0xE000)) continue;
		if ((c>=0xD800)&&(c<0xDC00)) {
			i++;
			if (i>=str.length) continue;
			s = str.charCodeAt(i);
			if ((s<0xDC00)||(s>=0xE000)) continue;
			c = ((c-0xD800)<<10)+(s-0xDC00)+0x10000;
		}
		if (c<0x80) {
			uc = escape(String.fromCharCode(c)).replace(/\+/g,"%2B").replace(/\//g,"%2F");
			if (c<=0x20) {
				ul=3;
			} else {
				ul=1;
			}
		} else if (c<0x800) {
			uc = "%u"+Hex(c>>8)+Hex(c&0xFF);
			ul = 2;
		} else if (c<0x10000) {
			uc = "%u"+Hex(c>>8)+Hex(c&0xFF);
			ul = 3;
		} else {
			uc = "%U"+Hex((c>>24)&0xFF)+Hex((c>>16)&0xFF)+Hex((c>>8)&0xFF)+Hex(c&0xFF);
			ul = 4;
		}
		limit -= ul;
		if (limit<0) {
			if (doescape==0) {
				dst = str.substr(0,i);
			}
			return dst;
		}
		dst+=uc;
	}
	if (doescape==0) {
		dst = str;
	}
	return dst;
}

function ghmxy_node_desc(p,usecache) {
	var np=0;
	var ln=0;
	var ocln=0;
	var fform=0;
	var imgclick=0;
	var type="",octype="",mhref="",ocmhref="",path="",ltext="",ocltext="",lid="";
	try {
		if (p.nodeName == "A") {
			var cp = ghmxy_checklink(p,usecache);
			if (cp != null && cp.nodeName == "IMG") p = cp;
		}
		if (p.nodeName=="INPUT" || p.nodeName=="BUTTON") {
			if (p.type=="submit") {
				var value="";
				if (p.ghmxy_value) {
					value = p.ghmxy_value;
				} else {
					value = p.value;
				}
				ltext="formsubmit:"+value;
				fform=1;
			}
			if (p.type=="image") {
				var src="";
				if (p.ghmxy_src) {
					src = p.ghmxy_src;
				} else {
					src = p.src;
				}
				ltext="formimage:"+ghmxy_url_escape(src);
				fform=1;
			}
		} else if (p.nodeName=="IMG") {
			imgclick=1;
		}
		while (p) {
			if (!ocln && p.attributes && p.attributes.getNamedItem) {
				ocnode = p.attributes.getNamedItem("onclick");
				if (ocnode && ocnode.nodeValue) {
					ocln=p;
					octype = "hmc"
					ocmhref = ocnode.nodeValue;
					ocltext=p.nodeName+" "+ghmxy_gettext(p);
				}
			}
			if (!ln) {
				if (p.nodeName=="AREA" && typeof(p.href)=="string" && p.href!="") {
					ln=p;
					type = "hma";
					mhref = p.href;
					ltext = p.shape+" "+p.coords;
				}
				if (p.nodeName=="A" && typeof(p.href)=="string" && p.href!="") {
					ln=p;
					if (imgclick) {
						type = "hmi"
					} else {
						type = "hml"
					}
					mhref = p.href;
					if (typeof(p.className)=="string" && p.className!="") {
						ltext=p.className+" "+ghmxy_gettext(p,usecache);
					} else {
						ltext=ghmxy_gettext(p,usecache);
					}
				}
				if (fform && p.nodeName=="FORM") {
					if (typeof(p.ghmxy_action)=="string" && p.ghmxy_action!="") {
						ln=p;
						type = "hmf"
						mhref = p.ghmxy_action;
					} else if (p.attributes && p.attributes.getNamedItem) {
						osnode = p.attributes.getNamedItem("onsubmit");
						if (osnode && osnode.nodeValue) {
							ln=p;
							type = "hms"
							mhref = p.attributes.getNamedItem("onsubmit").nodeValue;
						}
					}
				}
			}
			if (typeof(p.id)=="string" && (ln || ocln)) {
				if (p.id.substr(0,7)=="LinkID:") {
					lid=p.id.replace(/\x2520/g,"_").substr(7,50);
				}
				if (p.id.substr(0,9)=="LinkArea:") {
					pel=p.id.replace(/\x2520/g,"_").substr(9,10);
					if (path) {
						path=pel+"|"+path;
					} else {
						path=pel; 
					} 
				}
			}
			np = 0;
			if (typeof(p.parentNode)=="object") {
				var pp = p.parentNode;
				if (pp && pp.childNodes) {
					for (var ch=0 ; ch<pp.childNodes.length ; ch++) {
						if (pp.childNodes[ch] == p) {
							np=pp;
						}
					}
				}
			}
			p=np;
		}
		if (!ln) {
			type = octype;
			mhref = ocmhref;
			ltext = ocltext;
		}
		if (type!="" && (mhref!="" || ltext!="" || path!="" || lid!="")) {
			mhref=ghmxy_url_escape(mhref);
			ltext=ltext.replace(/[ \t\r\n]+/g," ").replace(/^ /,"").replace(/ $/,"").replace(/\x22|\||\x2520/g,"_");
			path=path.replace(/;|&|\//g,"_");
			lid=lid.replace(/;|&|\/|\|/g,"_");
			return {type:type , link:mhref , area:path , alt:ltext , lid:lid};
		}
	} catch (_ev) {
	}
	return null;
}

function ghmxy_interface_node_desc(node,usecache) {
	var cache = usecache || true;
	if (cache && node.ghmxy_node_desc) {
		return node.ghmxy_node_desc;
	}
	node_desc = ghmxy_node_desc(node,cache);
	if (node_desc) {
		// sarg = node_desc.ltext+"|"+node_desc.area
		// ref  = node_desc.mhref+"|"+node_desc.lid
		node_desc.linkcs = ghmxy_tail_checksum(node_desc.link,226);
		node_desc.link = ghmxy_escape(node_desc.link,226,0);
		node_desc.altcs = ghmxy_tail_checksum(node_desc.alt,190);
		node_desc.alt = ghmxy_escape(node_desc.alt,190,0);
		node_desc.area = ghmxy_escape(node_desc.area,50,0,0);
		node_desc.lid = ghmxy_escape(node_desc.lid,50,0,0);
		if (cache) {
			node.ghmxy_node_desc = node_desc;
		}
	}
	return node_desc;
}

function ghmxy_prepare(type,mhref,areapath,ltext,lid) {
	var href = new String(document.location.href);
	ghmxy_hm_data_to_send = "l=1&id="+ghmxy_identifier+"&arg=0&sarg="+ghmxy_escape(ltext,190,1)+"|"+ghmxy_tail_checksum(ltext,190)+"|"+ghmxy_escape(areapath,50,1)+"&ref=http%3A%2F%2F0.0.0.0%2F"+type+"%3D"+ghmxy_escape(mhref,226,1)+"|"+ghmxy_tail_checksum(mhref,226)+"|"+ghmxy_escape(lid,50,1)+"&href="+escape(href.substring(0,499));
}

function ghmxy_hm_click(ev) {
	if (document.getElementById) {
		var p = 0;
		if (!window.event) { 
			p=ev.target;
		} else {
			p=window.event.srcElement;
		}
		node_desc = ghmxy_node_desc(p,false);
		if (node_desc) {
			ghmxy_prepare(node_desc.type,node_desc.link,node_desc.area,node_desc.alt,node_desc.lid);
		}
	}
}

function ghmxy_clear_cache(node) {
	delete node.ghmxy_gettext;
	delete node.ghmxy_checklink;
	delete node.ghmxy_node_desc;
}

// (c) by Gemius SA - gemius xy map
// ver. 2.9

if (typeof(ghmxy_type)=='undefined' || (ghmxy_type!='percent' && ghmxy_type!='absolute')) {
	var ghmxy_type='x';
} else {
	ghmxy_type = ghmxy_type.substr(0,1);
}
if (typeof(ghmxy_align)=='undefined' || (ghmxy_align!='left' && ghmxy_align!='center' && ghmxy_align!='right')) {
	var ghmxy_align='x';
} else {
	ghmxy_align = ghmxy_align.substr(0,1);
}

function ghmxy_get_window_params() {
	var w = window;
	var d = document;
	var dd;
	var wparam = 'r'+screen.width+','+screen.height;
	if (typeof w.innerWidth=='number') {
		wparam += '|s'+w.innerWidth+','+w.innerHeight+'|a'+ghmxy_align.substr(0,1)+'|t'+ghmxy_type.substr(0,1)+'|m'+w.pageXOffset+','+w.pageYOffset+'|p';
	} else if ( ((dd = d.documentElement) && (dd.clientWidth || dd.clientHeight)) || ((dd = d.body) && (dd.clientWidth || dd.clientHeight)) ) {
		wparam += '|s'+dd.clientWidth+','+dd.clientHeight+'|a'+ghmxy_align.substr(0,1)+'|t'+ghmxy_type.substr(0,1)+'|m'+dd.scrollLeft+','+dd.scrollTop+'|p';
	}
	if (d.body && typeof(d.body.scrollWidth)!='undefined' && typeof(d.body.scrollHeight)!='undefined') {
		wparam += d.body.scrollWidth+','+d.body.scrollHeight;
	}
	return wparam;
}

function ghmxy_get_obj_desc(id,posx,posy,sizex,sizey) {
	return '|o'+posx+','+posy+'|d'+sizex+','+sizey+'|n'+encodeURIComponent(id);
}

function ghmxy_xy_reset() {
	ghmxy_last_x = -1;
	ghmxy_last_y = -1;
}

function ghmxy_sendxy(x,y,objdesc) {
	if (x<ghmxy_last_x-1 || x>ghmxy_last_x+1 || y<ghmxy_last_y-1 || y>ghmxy_last_y+1) {
		var href = new String(document.location.href);
		ghmxy_xy_data_to_send = 'l=2&id='+ghmxy_identifier+'&arg=0&sarg='+ghmxy_get_window_params()+objdesc+'&href='+escape(href.substring(0,499))+'&ref=http%3A%2F%2F0.0.0.0%2Fxy%3D'+x+':'+y;
		ghmxy_last_x = x;
		ghmxy_last_y = y;
	}
}

function ghmxy_xy_click(ev) {
	var w = window;
	var d = document;
	var dd;
	if (d.getElementById) {
		var p=0;
		var ex;
		if (!w.event) {
			p=ev.target;
		} else {
			p=w.event.srcElement;
		}
		if (typeof(p)!="object") {
			return;
		}
		if (!p.getBoundingClientRect) {
			return;
		}
		if (typeof(p.nodeName)=="undefined" || p.nodeName=="HTML") {
			return;
		}
		try {
			while (p) {
				var css;
				if (w.getComputedStyle) {
					css = getComputedStyle(p, null);
				} else {
					css = p.currentStyle;
				}
				var ov = css.overflow || "";
				var ovx = css.overflowX || "";
				var ovy = css.overflowY || "";
				var scroll = (ov=="auto" || ov=="scroll" || ovx=="auto" || ovx=="scroll" || ovy=="auto" || ovy=="scroll")?1:0;
				var pid;
				if (typeof(p.id)=="string" && p.id!="") {
					pid = p.id.replace(/\x2520/g,"_").substr(0,100);
				} else {
					pid = 0;
				}
				if (p.nodeName=="BODY" || p==d.body) {
					var bodybox;
					if (typeof w.innerWidth=='number') {
						bodybox = {x:w.pageXOffset,y:w.pageYOffset};
					} else if ( ((dd = d.documentElement) && (dd.clientWidth || dd.clientHeight)) || ((dd = d.body) && (dd.clientWidth || dd.clientHeight)) ) {
						bodybox = {x:dd.scrollLeft,y:dd.scrollTop};
					}
					var insidepos = {x:ev.clientX+bodybox.x,y:ev.clientY+bodybox.y};
					ghmxy_sendxy(ev.clientX,ev.clientY,ghmxy_get_obj_desc("%%BODY%%",insidepos.x,insidepos.y,p.scrollWidth,p.scrollHeight));
					return;
				} else if (pid && (scroll || pid.substr(0,12)=="GemiusXYMap:")) {
					var ppos;
					if (p.getBoundingClientRect) {
						var box = p.getBoundingClientRect();
						ppos = {x:box.left,y:box.top};
					} else {
						return;
					}
					var clientpos = {x:ev.clientX-ppos.x,y:ev.clientY-ppos.y};
					var insidepos = {x:clientpos.x+p.scrollLeft,y:clientpos.y+p.scrollTop};
					if (clientpos.x >= p.clientLeft && clientpos.x < p.clientLeft+p.clientWidth && clientpos.y >= p.clientTop && clientpos.y < p.clientTop+p.clientHeight) {
						ghmxy_sendxy(ev.clientX,ev.clientY,ghmxy_get_obj_desc(pid,insidepos.x,insidepos.y,p.scrollWidth,p.scrollHeight));
					}
					return;
				} else {
					var np = 0;
					if (typeof(p.parentNode)=="object") {
						var pp = p.parentNode;
						if (pp && pp.childNodes) {
							for (var ch=0 ; ch<pp.childNodes.length ; ch++) {
								if (pp.childNodes[ch] == p) {
									np=pp;
								}
							}
						}
					}
					p = np;
				}
			}
		} catch (ex) {
		}
	}
}

function ghmxy_flash(id,xx,yy) {
	if (document.getElementById) {
		var p = document.getElementById(id);
		var pid = id.replace(/\x2520/g,"_").substr(0,100);
	        if (p && p.getBoundingClientRect) {
			var box = p.getBoundingClientRect();
			var ppos = {x:box.left,y:box.top};
			var ev = {clientX:ppos.x+xx,clientY:ppos.y+yy};
			ghmxy_sendxy(ev.clientX,ev.clientY,ghmxy_get_obj_desc(pid,xx,yy,p.scrollWidth,p.scrollHeight));
		}
	}
}


//Scroll Map

var ghmxy_visapi_s = "";
var ghmxy_visapi_c = "";
var ghmxy_scroll_ls = "";
var ghmxy_scroll_lt = 0;
var ghmxy_scroll_lh = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight;
var ghmxy_scroll_lupdate = ((new Date()).getTime());
var ghmxy_scroll_mdur = 7500;
var ghmxy_scroll_tdur = 0;
var ghmxy_scroll_data = [];

function ghmxy_findvisapi() {
	if (typeof document.hidden != 'undefined') {
		ghmxy_visapi_s = 'visibilityState';
		ghmxy_visapi_c = 'visibilitychange';
	} else {
		var p = ['moz','webkit','ms','o'];
		for (var i in p) {
			if (typeof document[p[i]+'Hidden'] != 'undefined') {
				ghmxy_visapi_s = p[i]+'VisibilityState';
				ghmxy_visapi_c = p[i]+'visibilitychange';
			}
		}
	}
}

function ghmxy_scroll_send() {
    if (ghmxy_scroll_data.length > 0 && typeof encodeURIComponent != 'undefined') {
		var image = new Image();
		var sarg = "";
		var href = new String(document.location.href);
		var url = ghmxy_proto+ghmxy_hitcollector+"/_"+(new Date()).getTime()+"/redot.gif?l=3&w=hsc&id="+ghmxy_identifier+"&arg=0";
		for (var i=0; i<ghmxy_scroll_data.length; i++) {
			if (i>0) {
				sarg += "|";
			}
			sarg += ghmxy_scroll_data[i].t + ":" + (ghmxy_scroll_data[i].t+ghmxy_scroll_data[i].h) + ":" + ghmxy_scroll_data[i].d;
		}
		url += "&sarg="+encodeURIComponent(sarg)+"&href="+encodeURIComponent(href.substring(0,499));
		image.src = url;
		ghmxy_images[ghmxy_images.length] = image;
	}
	ghmxy_scroll_data = [];
}

function ghmxy_scroll_getdur() {
	var res = 0;
	for (var i=0; i<ghmxy_scroll_data.length; i++) {
		res += ghmxy_scroll_data[i].d;
	}
	return res;
}

function ghmxy_scroll_update() {
	var t = window.pageYOffset || document.documentElement.scrollTop;
	var h = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight;
	var d = ((new Date()).getTime()) - ghmxy_scroll_lupdate;
	var s = ghmxy_visapi_s?document[ghmxy_visapi_s]:"";
	d = ((d<0)?0:((d>30000)?30000:d));
	if (ghmxy_scroll_ls && ghmxy_scroll_ls!="visible") {
		ghmxy_scroll_lupdate = ((new Date()).getTime());
	} else if ((typeof ghmxy_scroll_lt == "number") && (typeof ghmxy_scroll_lh == "number") && d > 250) {
		var data = null;
		ghmxy_scroll_lt = Math.round(ghmxy_scroll_lt);
		ghmxy_scroll_lh = Math.round(ghmxy_scroll_lh);
		for (var i=0; i<ghmxy_scroll_data.length; i++) {
			if (ghmxy_scroll_data[i].t == ghmxy_scroll_lt && ghmxy_scroll_data[i].h == ghmxy_scroll_lh) {
				data = ghmxy_scroll_data[i];
				data.d = data.d + d;
				break;
			}
		}
		if (!data && ghmxy_scroll_tdur < 900000) {
			ghmxy_scroll_data[ghmxy_scroll_data.length] = data = {t:ghmxy_scroll_lt, h:ghmxy_scroll_lh, d:d};
		}
		ghmxy_scroll_tdur += d;
		ghmxy_scroll_lupdate = ((new Date()).getTime());
	}
	if (t != ghmxy_scroll_lt) {
		ghmxy_scroll_tdur = 0;
	}
	if (ghmxy_scroll_data.length >= 50 || ghmxy_scroll_getdur() >= ghmxy_scroll_mdur) {
		ghmxy_scroll_send();
		ghmxy_scroll_mdur = ((ghmxy_scroll_mdur<=225000)?(2*ghmxy_scroll_mdur):450000);
	}
	ghmxy_scroll_ls = s;
	ghmxy_scroll_lt = t;
	ghmxy_scroll_lh = h;
}

function ghmxy_timer() {
	ghmxy_scroll_update();
}

function ghmxy_unload() {
	ghmxy_scroll_update();
	ghmxy_scroll_send();
	var start = (new Date()).getTime();
	while (start+200>(new Date()).getTime());
}


// common

function ghmxy_click(ev) {
	ghmxy_xy_click(ev);
	ghmxy_hm_click(ev);
	ghmxy_send();
}

function ghmxy_scroll() {
	ghmxy_xy_reset();
	if (typeof ghmxy_scrollmap != "undefined" && ghmxy_scrollmap) {
		ghmxy_scroll_update();
	}
}

function ghmxy_add_event(ob,evname,fn) {
	if (ob.attachEvent) {
		ob.attachEvent("on"+evname,fn);
	} else if(ob.addEventListener) {
		ob.addEventListener(evname,fn, false);
	}
}

if (typeof ghmxy_identifier != "undefined") {
	ghmxy_identifier = ghmxy_identifier.replace(/([a-zA-Z0-9._]+).*/,'$1');
	// common:
	ghmxy_add_event(document,"mousedown",ghmxy_click);
	ghmxy_add_event(window,"scroll",ghmxy_scroll);
	ghmxy_add_event(window,"resize",ghmxy_scroll);
	// link map:
	ghmxy_add_event(window,"load",ghmxy_load);
	// scroll map:
	if (typeof ghmxy_scrollmap != "undefined" && ghmxy_scrollmap) {
		ghmxy_findvisapi();
		ghmxy_scroll_ls = ghmxy_visapi_s?document[ghmxy_visapi_s]:"";
		setInterval(ghmxy_timer,2500);
		ghmxy_add_event(window,"unload",ghmxy_unload);
		if (ghmxy_visapi_c != '') {
			ghmxy_add_event(document,ghmxy_visapi_c,ghmxy_scroll_update);
		}
	}
}
