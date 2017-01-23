/*global jQuery, IAPP_megamenu, IAPP_shopping, IAPP_search, IAPP_messaging, IAPP_notifications, IAPP_events, IAPP_ui, IAPP_saved, quickShare*/

/*! Cookies.js - 0.4.0; Copyright (c) 2014, Scott Hamper; http://www.opensource.org/licenses/MIT */
(function(e){"use strict";var b=function(a,d,c){return 1===arguments.length?b.get(a):b.set(a,d,c)};b._document=document;b._navigator=navigator;b.defaults={path:"/"};b.get=function(a){b._cachedDocumentCookie!==b._document.cookie&&b._renewCache();return b._cache[a]};b.set=function(a,d,c){c=b._getExtendedOptions(c);c.expires=b._getExpiresDate(d===e?-1:c.expires);b._document.cookie=b._generateCookieString(a,d,c);return b};b.expire=function(a,d){return b.set(a,e,d)};b._getExtendedOptions=function(a){return{path:a&& a.path||b.defaults.path,domain:a&&a.domain||b.defaults.domain,expires:a&&a.expires||b.defaults.expires,secure:a&&a.secure!==e?a.secure:b.defaults.secure}};b._isValidDate=function(a){return"[object Date]"===Object.prototype.toString.call(a)&&!isNaN(a.getTime())};b._getExpiresDate=function(a,d){d=d||new Date;switch(typeof a){case "number":a=new Date(d.getTime()+1E3*a);break;case "string":a=new Date(a)}if(a&&!b._isValidDate(a))throw Error("`expires` parameter cannot be converted to a valid Date instance"); return a};b._generateCookieString=function(a,b,c){a=a.replace(/[^#$&+\^`|]/g,encodeURIComponent);a=a.replace(/\(/g,"%28").replace(/\)/g,"%29");b=(b+"").replace(/[^!#$&-+\--:<-\[\]-~]/g,encodeURIComponent);c=c||{};a=a+"="+b+(c.path?";path="+c.path:"");a+=c.domain?";domain="+c.domain:"";a+=c.expires?";expires="+c.expires.toUTCString():"";return a+=c.secure?";secure":""};b._getCookieObjectFromString=function(a){var d={};a=a?a.split("; "):[];for(var c=0;c<a.length;c++){var f=b._getKeyValuePairFromCookieString(a[c]); d[f.key]===e&&(d[f.key]=f.value)}return d};b._getKeyValuePairFromCookieString=function(a){var b=a.indexOf("="),b=0>b?a.length:b;return{key:decodeURIComponent(a.substr(0,b)),value:decodeURIComponent(a.substr(b+1))}};b._renewCache=function(){b._cache=b._getCookieObjectFromString(b._document.cookie);b._cachedDocumentCookie=b._document.cookie};b._areEnabled=function(){var a="1"===b.set("cookies.js",1).get("cookies.js");b.expire("cookies.js");return a};b.enabled=b._areEnabled();"function"===typeof define&& define.amd?define(function(){return b}):"undefined"!==typeof exports?("undefined"!==typeof module&&module.exports&&(exports=module.exports=b),exports.Cookies=b):window.Cookies=b})();

(function($) {
	$(function() {

		IAPP_messaging.init();
		IAPP_notifications.init();
		IAPP_megamenu.init();
		IAPP_shopping.init();
		IAPP_events.init();
		IAPP_saved.init();
		IAPP_ui.init();
		IAPP_ads.init();

		quickShare();

		// This adds the user--logged in class to the body when the .nav-myiapp-loggedin class exists
		$('.nav-myiapp-loggedin').closest('body').addClass('user--loggedin');
		//$('.myiapp-link').attr('href', '/profile'); // bw - removing; should hard-code link

		$('#feed-edit').on('click', function(event) {
			$('.skybox-mod').toggleClass('is-active');
			event.preventDefault();
		});

		// This hides and shows the side menu at smaller screens on layout-default pages.
		$('#side_menu_trigger').on('click', function(event) {
			$('.side-menu-container').toggleClass('is-active');
			event.preventDefault();
		});

		// This adds the comment-is-active class to the comment form when clicking in
		// The comment form text area. Will need a click to remove class in the future.
		$("#comment").on('click', function() {
			$('#respond').addClass('comment-is-active');
		});

		// close the search bar by clicking the hamburger
		var $menumod = $('.nav-menu-mod')
		$('.nav-trigger--instant-search').on('click', function(event) {
			$menumod.removeClass('js-search-nav').addClass('js-menu-mod'); // is this js-menu-mod needed? - pk
			// add a slight delay before enabling megamenu due
			// 	to the placement of the hamburger/ search reset icon
			setTimeout(function() {
				IAPP_megamenu.enable();
			}, 150);
			event.preventDefault();
		});

		// initialize nav search
		$('.search-link').on('click', function(event) {			
			IAPP_megamenu.disable();
			$menumod.removeClass('js-menu-nav').addClass('js-search-nav');
			event.preventDefault();
		});

		if ($('.iapp-lead-form').length > 0) {
			$('.iapp-lead-form').submit(function(e) {
				e.preventDefault();
				// validate?

				// post lead
				$.post("/api/lead", $(this).serialize(), function(data){
					//print(data);
					$.each(data.messages, function(i, msg){
						IAPP_notifications.post(msg.type, msg.body);
					});
					if(data.data.success) {
						$('.iapp-lead-submit').hide();
					}
				});
			});
		}
	});


	$.fn.check = function() {
		$(this).prop('checked', true);
	};
	$.fn.uncheck = function() {
		$(this).prop('checked', false);
	};

	$.fn.disable = function() {
		$(this).attr('disabled', 'disabled');
	};
	$.fn.enable = function() {
		$(this).removeAttr('disabled');
	};
	$.urlParam = function(name) {
		var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
		if (results === null){
			return null;
		}else{
			return results[1] || 0;
		}
	};
	$.scrollToTop = function(){
		$('html, body').animate({ scrollTop: 0 }, 0);
	};

	// Initialize fitvids
	if($('.article-body').length) {
		$('.article-body').fitVids();
	}

	 // Conference Nav Dropdown
	 $('#conference_nav_trigger').on('click', function(event) {
			$('.conference-nav-item--withdrop').toggleClass('is-active');
			// event.preventDefault();
		});

	 // Replaces svgs with pngs for for browser that lack svg support
    if (!Modernizr.svg) {
        $('img[src$=".svg"]').each(function() {
            //E.g replaces 'logo.svg' with 'logo.png'.
            $(this).attr('src', $(this).attr('src').replace('.svg', '.png'));
        });
    }

    // angularjs does not allow forms without the "action" attribute
	$('form').filter('[method]').filter(':not([action])').each(function() {    		
	  $(this).attr('action', window.location.href);              
	});        
            


}(jQuery));

/*
	print()
	> debug function; alerts object as JSON string
*/
function objprint(o, cs) {
	if (cs === true) {
		return JSON.stringify(o, null, 4);
	} else {
		//console.log(JSON.stringify(o, null, 4));
	}
}

function validateEmail(email) {
	var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
	return reg.test(email);
}

function validatePassword(pw) {
	var reg = /^(?=.*\d)(?=.*[a-zA-z]).{6,32}$/;
	return reg.test(pw);
}

function validatePhone(phone) {
  var reg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4,8})$/;
  return reg.test(phone);
}

function validatePhoneExt(ext) {
  var reg = /^\(?([0-9]{0,5})$/;
  return reg.test(ext);
}

function validateDate(date) {
    var reg = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/ ;
    return reg.test(date);
}		

/* =====================
	Polyfills: < IE8
===================== */
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(obj, start) {
         for (var i = (start || 0), j = this.length; i < j; i++) {
             if (this[i] === obj) { return i; }
         }
         return -1;
    }
}
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
if (!Array.prototype.map) {
  Array.prototype.map = function(callback, thisArg) {
    var T, A, k;
    if (this == null) {
      throw new TypeError(' this is null or not defined');
    }
    var O = Object(this);
    var len = O.length >>> 0;
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }
    if (arguments.length > 1) {
      T = thisArg;
    }
    A = new Array(len);
    k = 0;
    while (k < len) {
      var kValue, mappedValue;
      if (k in O) {
        kValue = O[k];
        mappedValue = callback.call(T, kValue, k, O);
        A[k] = mappedValue;
      }
      k++;
    }
    return A;
  };
}
