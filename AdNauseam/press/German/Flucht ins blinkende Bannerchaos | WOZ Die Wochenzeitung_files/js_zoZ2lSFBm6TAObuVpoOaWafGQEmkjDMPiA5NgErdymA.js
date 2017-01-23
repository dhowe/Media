/*jslint browser: true */ /*global jQuery: true */

/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

// TODO JsDoc

/**
 * Create a cookie with the given key and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String key The key of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given key.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String key The key of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function (key, value, options) {

    // key and value given, set cookie...
    if (arguments.length > 1 && (value === null || typeof value !== "object")) {
        options = jQuery.extend({}, options);

        if (value === null) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? String(value) : encodeURIComponent(String(value)),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};
;
/*
 * Foundation Responsive Library
 * http://foundation.zurb.com
 * Copyright 2014, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/

(function ($, window, document, undefined) {
  'use strict';

  var header_helpers = function (class_array) {
    var i = class_array.length;
    var head = $('head');

    while (i--) {
      if (head.has('.' + class_array[i]).length === 0) {
        head.append('<meta class="' + class_array[i] + '" />');
      }
    }
  };

  header_helpers([
    'foundation-mq-small',
    'foundation-mq-small-only',
    'foundation-mq-medium',
    'foundation-mq-medium-only',
    'foundation-mq-large',
    'foundation-mq-large-only',
    'foundation-mq-xlarge',
    'foundation-mq-xlarge-only',
    'foundation-mq-xxlarge',
    'foundation-data-attribute-namespace']);

  // Enable FastClick if present

  $(function () {
    if (typeof FastClick !== 'undefined') {
      // Don't attach to body if undefined
      if (typeof document.body !== 'undefined') {
        FastClick.attach(document.body);
      }
    }
  });

  // private Fast Selector wrapper,
  // returns jQuery object. Only use where
  // getElementById is not available.
  var S = function (selector, context) {
    if (typeof selector === 'string') {
      if (context) {
        var cont;
        if (context.jquery) {
          cont = context[0];
          if (!cont) {
            return context;
          }
        } else {
          cont = context;
        }
        return $(cont.querySelectorAll(selector));
      }

      return $(document.querySelectorAll(selector));
    }

    return $(selector, context);
  };

  // Namespace functions.

  var attr_name = function (init) {
    var arr = [];
    if (!init) {
      arr.push('data');
    }
    if (this.namespace.length > 0) {
      arr.push(this.namespace);
    }
    arr.push(this.name);

    return arr.join('-');
  };

  var add_namespace = function (str) {
    var parts = str.split('-'),
        i = parts.length,
        arr = [];

    while (i--) {
      if (i !== 0) {
        arr.push(parts[i]);
      } else {
        if (this.namespace.length > 0) {
          arr.push(this.namespace, parts[i]);
        } else {
          arr.push(parts[i]);
        }
      }
    }

    return arr.reverse().join('-');
  };

  // Event binding and data-options updating.

  var bindings = function (method, options) {
    var self = this,
        bind = function(){
          var $this = S(this),
              should_bind_events = !$this.data(self.attr_name(true) + '-init');
          $this.data(self.attr_name(true) + '-init', $.extend({}, self.settings, (options || method), self.data_options($this)));

          if (should_bind_events) {
            self.events(this);
          }
        };

    if (S(this.scope).is('[' + this.attr_name() +']')) {
      bind.call(this.scope);
    } else {
      S('[' + this.attr_name() +']', this.scope).each(bind);
    }
    // # Patch to fix #5043 to move this *after* the if/else clause in order for Backbone and similar frameworks to have improved control over event binding and data-options updating.
    if (typeof method === 'string') {
      return this[method].call(this, options);
    }

  };

  var single_image_loaded = function (image, callback) {
    function loaded () {
      callback(image[0]);
    }

    function bindLoad () {
      this.one('load', loaded);

      if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
        var src = this.attr( 'src' ),
            param = src.match( /\?/ ) ? '&' : '?';

        param += 'random=' + (new Date()).getTime();
        this.attr('src', src + param);
      }
    }

    if (!image.attr('src')) {
      loaded();
      return;
    }

    if (image[0].complete || image[0].readyState === 4) {
      loaded();
    } else {
      bindLoad.call(image);
    }
  };

  /*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */

  window.matchMedia || (window.matchMedia = function() {
      "use strict";

      // For browsers that support matchMedium api such as IE 9 and webkit
      var styleMedia = (window.styleMedia || window.media);

      // For those that don't support matchMedium
      if (!styleMedia) {
          var style       = document.createElement('style'),
              script      = document.getElementsByTagName('script')[0],
              info        = null;

          style.type  = 'text/css';
          style.id    = 'matchmediajs-test';

          script.parentNode.insertBefore(style, script);

          // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
          info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

          styleMedia = {
              matchMedium: function(media) {
                  var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

                  // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
                  if (style.styleSheet) {
                      style.styleSheet.cssText = text;
                  } else {
                      style.textContent = text;
                  }

                  // Test if media query is true or false
                  return info.width === '1px';
              }
          };
      }

      return function(media) {
          return {
              matches: styleMedia.matchMedium(media || 'all'),
              media: media || 'all'
          };
      };
  }());

  /*
   * jquery.requestAnimationFrame
   * https://github.com/gnarf37/jquery-requestAnimationFrame
   * Requires jQuery 1.8+
   *
   * Copyright (c) 2012 Corey Frang
   * Licensed under the MIT license.
   */

  (function(jQuery) {


  // requestAnimationFrame polyfill adapted from Erik Möller
  // fixes from Paul Irish and Tino Zijdel
  // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

  var animating,
      lastTime = 0,
      vendors = ['webkit', 'moz'],
      requestAnimationFrame = window.requestAnimationFrame,
      cancelAnimationFrame = window.cancelAnimationFrame,
      jqueryFxAvailable = 'undefined' !== typeof jQuery.fx;

  for (; lastTime < vendors.length && !requestAnimationFrame; lastTime++) {
    requestAnimationFrame = window[ vendors[lastTime] + 'RequestAnimationFrame' ];
    cancelAnimationFrame = cancelAnimationFrame ||
      window[ vendors[lastTime] + 'CancelAnimationFrame' ] ||
      window[ vendors[lastTime] + 'CancelRequestAnimationFrame' ];
  }

  function raf() {
    if (animating) {
      requestAnimationFrame(raf);

      if (jqueryFxAvailable) {
        jQuery.fx.tick();
      }
    }
  }

  if (requestAnimationFrame) {
    // use rAF
    window.requestAnimationFrame = requestAnimationFrame;
    window.cancelAnimationFrame = cancelAnimationFrame;

    if (jqueryFxAvailable) {
      jQuery.fx.timer = function (timer) {
        if (timer() && jQuery.timers.push(timer) && !animating) {
          animating = true;
          raf();
        }
      };

      jQuery.fx.stop = function () {
        animating = false;
      };
    }
  } else {
    // polyfill
    window.requestAnimationFrame = function (callback) {
      var currTime = new Date().getTime(),
        timeToCall = Math.max(0, 16 - (currTime - lastTime)),
        id = window.setTimeout(function () {
          callback(currTime + timeToCall);
        }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };

  }

  }( $ ));

  function removeQuotes (string) {
    if (typeof string === 'string' || string instanceof String) {
      string = string.replace(/^['\\/"]+|(;\s?})+|['\\/"]+$/g, '');
    }

    return string;
  }

  window.Foundation = {
    name : 'Foundation',

    version : '5.5.2',

    media_queries : {
      'small'       : S('.foundation-mq-small').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
      'small-only'  : S('.foundation-mq-small-only').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
      'medium'      : S('.foundation-mq-medium').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
      'medium-only' : S('.foundation-mq-medium-only').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
      'large'       : S('.foundation-mq-large').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
      'large-only'  : S('.foundation-mq-large-only').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
      'xlarge'      : S('.foundation-mq-xlarge').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
      'xlarge-only' : S('.foundation-mq-xlarge-only').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
      'xxlarge'     : S('.foundation-mq-xxlarge').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, '')
    },

    stylesheet : $('<style></style>').appendTo('head')[0].sheet,

    global : {
      namespace : undefined
    },

    init : function (scope, libraries, method, options, response) {
      var args = [scope, method, options, response],
          responses = [];

      // check RTL
      this.rtl = /rtl/i.test(S('html').attr('dir'));

      // set foundation global scope
      this.scope = scope || this.scope;

      this.set_namespace();

      if (libraries && typeof libraries === 'string' && !/reflow/i.test(libraries)) {
        if (this.libs.hasOwnProperty(libraries)) {
          responses.push(this.init_lib(libraries, args));
        }
      } else {
        for (var lib in this.libs) {
          responses.push(this.init_lib(lib, libraries));
        }
      }

      S(window).load(function () {
        S(window)
          .trigger('resize.fndtn.clearing')
          .trigger('resize.fndtn.dropdown')
          .trigger('resize.fndtn.equalizer')
          .trigger('resize.fndtn.interchange')
          .trigger('resize.fndtn.joyride')
          .trigger('resize.fndtn.magellan')
          .trigger('resize.fndtn.topbar')
          .trigger('resize.fndtn.slider');
      });

      return scope;
    },

    init_lib : function (lib, args) {
      if (this.libs.hasOwnProperty(lib)) {
        this.patch(this.libs[lib]);

        if (args && args.hasOwnProperty(lib)) {
            if (typeof this.libs[lib].settings !== 'undefined') {
              $.extend(true, this.libs[lib].settings, args[lib]);
            } else if (typeof this.libs[lib].defaults !== 'undefined') {
              $.extend(true, this.libs[lib].defaults, args[lib]);
            }
          return this.libs[lib].init.apply(this.libs[lib], [this.scope, args[lib]]);
        }

        args = args instanceof Array ? args : new Array(args);
        return this.libs[lib].init.apply(this.libs[lib], args);
      }

      return function () {};
    },

    patch : function (lib) {
      lib.scope = this.scope;
      lib.namespace = this.global.namespace;
      lib.rtl = this.rtl;
      lib['data_options'] = this.utils.data_options;
      lib['attr_name'] = attr_name;
      lib['add_namespace'] = add_namespace;
      lib['bindings'] = bindings;
      lib['S'] = this.utils.S;
    },

    inherit : function (scope, methods) {
      var methods_arr = methods.split(' '),
          i = methods_arr.length;

      while (i--) {
        if (this.utils.hasOwnProperty(methods_arr[i])) {
          scope[methods_arr[i]] = this.utils[methods_arr[i]];
        }
      }
    },

    set_namespace : function () {

      // Description:
      //    Don't bother reading the namespace out of the meta tag
      //    if the namespace has been set globally in javascript
      //
      // Example:
      //    Foundation.global.namespace = 'my-namespace';
      // or make it an empty string:
      //    Foundation.global.namespace = '';
      //
      //

      // If the namespace has not been set (is undefined), try to read it out of the meta element.
      // Otherwise use the globally defined namespace, even if it's empty ('')
      var namespace = ( this.global.namespace === undefined ) ? $('.foundation-data-attribute-namespace').css('font-family') : this.global.namespace;

      // Finally, if the namsepace is either undefined or false, set it to an empty string.
      // Otherwise use the namespace value.
      this.global.namespace = ( namespace === undefined || /false/i.test(namespace) ) ? '' : namespace;
    },

    libs : {},

    // methods that can be inherited in libraries
    utils : {

      // Description:
      //    Fast Selector wrapper returns jQuery object. Only use where getElementById
      //    is not available.
      //
      // Arguments:
      //    Selector (String): CSS selector describing the element(s) to be
      //    returned as a jQuery object.
      //
      //    Scope (String): CSS selector describing the area to be searched. Default
      //    is document.
      //
      // Returns:
      //    Element (jQuery Object): jQuery object containing elements matching the
      //    selector within the scope.
      S : S,

      // Description:
      //    Executes a function a max of once every n milliseconds
      //
      // Arguments:
      //    Func (Function): Function to be throttled.
      //
      //    Delay (Integer): Function execution threshold in milliseconds.
      //
      // Returns:
      //    Lazy_function (Function): Function with throttling applied.
      throttle : function (func, delay) {
        var timer = null;

        return function () {
          var context = this, args = arguments;

          if (timer == null) {
            timer = setTimeout(function () {
              func.apply(context, args);
              timer = null;
            }, delay);
          }
        };
      },

      // Description:
      //    Executes a function when it stops being invoked for n seconds
      //    Modified version of _.debounce() http://underscorejs.org
      //
      // Arguments:
      //    Func (Function): Function to be debounced.
      //
      //    Delay (Integer): Function execution threshold in milliseconds.
      //
      //    Immediate (Bool): Whether the function should be called at the beginning
      //    of the delay instead of the end. Default is false.
      //
      // Returns:
      //    Lazy_function (Function): Function with debouncing applied.
      debounce : function (func, delay, immediate) {
        var timeout, result;
        return function () {
          var context = this, args = arguments;
          var later = function () {
            timeout = null;
            if (!immediate) {
              result = func.apply(context, args);
            }
          };
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, delay);
          if (callNow) {
            result = func.apply(context, args);
          }
          return result;
        };
      },

      // Description:
      //    Parses data-options attribute
      //
      // Arguments:
      //    El (jQuery Object): Element to be parsed.
      //
      // Returns:
      //    Options (Javascript Object): Contents of the element's data-options
      //    attribute.
      data_options : function (el, data_attr_name) {
        data_attr_name = data_attr_name || 'options';
        var opts = {}, ii, p, opts_arr,
            data_options = function (el) {
              var namespace = Foundation.global.namespace;

              if (namespace.length > 0) {
                return el.data(namespace + '-' + data_attr_name);
              }

              return el.data(data_attr_name);
            };

        var cached_options = data_options(el);

        if (typeof cached_options === 'object') {
          return cached_options;
        }

        opts_arr = (cached_options || ':').split(';');
        ii = opts_arr.length;

        function isNumber (o) {
          return !isNaN (o - 0) && o !== null && o !== '' && o !== false && o !== true;
        }

        function trim (str) {
          if (typeof str === 'string') {
            return $.trim(str);
          }
          return str;
        }

        while (ii--) {
          p = opts_arr[ii].split(':');
          p = [p[0], p.slice(1).join(':')];

          if (/true/i.test(p[1])) {
            p[1] = true;
          }
          if (/false/i.test(p[1])) {
            p[1] = false;
          }
          if (isNumber(p[1])) {
            if (p[1].indexOf('.') === -1) {
              p[1] = parseInt(p[1], 10);
            } else {
              p[1] = parseFloat(p[1]);
            }
          }

          if (p.length === 2 && p[0].length > 0) {
            opts[trim(p[0])] = trim(p[1]);
          }
        }

        return opts;
      },

      // Description:
      //    Adds JS-recognizable media queries
      //
      // Arguments:
      //    Media (String): Key string for the media query to be stored as in
      //    Foundation.media_queries
      //
      //    Class (String): Class name for the generated <meta> tag
      register_media : function (media, media_class) {
        if (Foundation.media_queries[media] === undefined) {
          $('head').append('<meta class="' + media_class + '"/>');
          Foundation.media_queries[media] = removeQuotes($('.' + media_class).css('font-family'));
        }
      },

      // Description:
      //    Add custom CSS within a JS-defined media query
      //
      // Arguments:
      //    Rule (String): CSS rule to be appended to the document.
      //
      //    Media (String): Optional media query string for the CSS rule to be
      //    nested under.
      add_custom_rule : function (rule, media) {
        if (media === undefined && Foundation.stylesheet) {
          Foundation.stylesheet.insertRule(rule, Foundation.stylesheet.cssRules.length);
        } else {
          var query = Foundation.media_queries[media];

          if (query !== undefined) {
            Foundation.stylesheet.insertRule('@media ' +
              Foundation.media_queries[media] + '{ ' + rule + ' }', Foundation.stylesheet.cssRules.length);
          }
        }
      },

      // Description:
      //    Performs a callback function when an image is fully loaded
      //
      // Arguments:
      //    Image (jQuery Object): Image(s) to check if loaded.
      //
      //    Callback (Function): Function to execute when image is fully loaded.
      image_loaded : function (images, callback) {
        var self = this,
            unloaded = images.length;

        function pictures_has_height(images) {
          var pictures_number = images.length;

          for (var i = pictures_number - 1; i >= 0; i--) {
            if(images.attr('height') === undefined) {
              return false;
            };
          };

          return true;
        }

        if (unloaded === 0 || pictures_has_height(images)) {
          callback(images);
        }

        images.each(function () {
          single_image_loaded(self.S(this), function () {
            unloaded -= 1;
            if (unloaded === 0) {
              callback(images);
            }
          });
        });
      },

      // Description:
      //    Returns a random, alphanumeric string
      //
      // Arguments:
      //    Length (Integer): Length of string to be generated. Defaults to random
      //    integer.
      //
      // Returns:
      //    Rand (String): Pseudo-random, alphanumeric string.
      random_str : function () {
        if (!this.fidx) {
          this.fidx = 0;
        }
        this.prefix = this.prefix || [(this.name || 'F'), (+new Date).toString(36)].join('-');

        return this.prefix + (this.fidx++).toString(36);
      },

      // Description:
      //    Helper for window.matchMedia
      //
      // Arguments:
      //    mq (String): Media query
      //
      // Returns:
      //    (Boolean): Whether the media query passes or not
      match : function (mq) {
        return window.matchMedia(mq).matches;
      },

      // Description:
      //    Helpers for checking Foundation default media queries with JS
      //
      // Returns:
      //    (Boolean): Whether the media query passes or not

      is_small_up : function () {
        return this.match(Foundation.media_queries.small);
      },

      is_medium_up : function () {
        return this.match(Foundation.media_queries.medium);
      },

      is_large_up : function () {
        return this.match(Foundation.media_queries.large);
      },

      is_xlarge_up : function () {
        return this.match(Foundation.media_queries.xlarge);
      },

      is_xxlarge_up : function () {
        return this.match(Foundation.media_queries.xxlarge);
      },

      is_small_only : function () {
        return !this.is_medium_up() && !this.is_large_up() && !this.is_xlarge_up() && !this.is_xxlarge_up();
      },

      is_medium_only : function () {
        return this.is_medium_up() && !this.is_large_up() && !this.is_xlarge_up() && !this.is_xxlarge_up();
      },

      is_large_only : function () {
        return this.is_medium_up() && this.is_large_up() && !this.is_xlarge_up() && !this.is_xxlarge_up();
      },

      is_xlarge_only : function () {
        return this.is_medium_up() && this.is_large_up() && this.is_xlarge_up() && !this.is_xxlarge_up();
      },

      is_xxlarge_only : function () {
        return this.is_medium_up() && this.is_large_up() && this.is_xlarge_up() && this.is_xxlarge_up();
      }
    }
  };

  $.fn.foundation = function () {
    var args = Array.prototype.slice.call(arguments, 0);

    return this.each(function () {
      Foundation.init.apply(Foundation, [this].concat(args));
      return this;
    });
  };

}(jQuery, window, window.document));
;
!function($,undefined){"use strict";function absurl(url,base){if(base||(base=document.baseURI||$("html > head > base").last().attr("href")||document.location.href),!url)return base;if(/^[a-z][-+\.a-z0-9]*:/i.test(url))return url;if("//"===url.slice(0,2))return/^[^:]+:/.exec(base)[0]+url;var ch=url.charAt(0);if("/"===ch)return/^file:/i.test(base)?"file://"+url:/^[^:]+:\/*[^\/]+/i.exec(base)[0]+url;if("#"===ch)return base.replace(/#.*$/,"")+url;if("?"===ch)return base.replace(/[\?#].*$/,"")+url;var path;if(/^file:/i.test(base))path=base.replace(/^file:\/{0,2}/i,""),base="file://";else{var match=/^([^:]+:\/*[^\/]+)(\/.*?)?(\?.*?)?(#.*)?$/.exec(base);base=match[1],path=match[2]||"/"}return path=path.split("/"),path.pop(),0===path.length&&path.push(""),path.push(url),base+path.join("/")}function formatNumber(number){number=Number(number);var prefix="",suffix="";if(0>number&&(prefix="-",number=-number),1/0===number)return prefix+"Infinity";if(number>9999&&(number/=1e3,suffix="K"),number=Math.round(number),0===number)return"0";for(var buf=[];number>0;){var part=String(number%1e3);if(number=Math.floor(number/1e3))for(;part.length<3;)part="0"+part;buf.unshift(part)}return prefix+buf.join(",")+suffix}function getTitle(options,uri,settings){var title=settings&&settings.title;if("function"==typeof title&&(title=title.call(this,options,uri,settings)),title)return title;var title=$('meta[name="DC.title"]').attr("content"),creator=$('meta[name="DC.creator"]').attr("content");return title&&creator?title+" - "+creator:title||$('meta[property="og:title"]').attr("content")||$("title").text()}function getDescription(options,uri,settings){var description=settings&&settings.description;return"function"==typeof description&&(description=description.call(this,options,uri,settings)),description?description:abbreviateText($('meta[name="twitter:description"]').attr("content")||$('meta[itemprop="description"]').attr("content")||$('meta[name="description"]').attr("content")||$.trim($("article, p").first().text())||$.trim($("body").text()),3500)}function getImage(options,uri,settings){var imgs,img=settings&&settings.image;return"function"==typeof img&&(img=img.call(this,options,uri,settings)),img||(imgs=$('meta[property="image"], meta[property="og:image"], meta[property="og:image:url"], meta[name="twitter:image"], link[rel="image_src"], itemscope *[itemprop="image"]').first(),imgs.length>0&&(img=imgs.attr(IMAGE_ATTR_MAP[imgs[0].nodeName]))),img?absurl(img):(imgs=$("img").filter(":visible").filter(function(){return 0===$(this).parents(".social_share_privacy_area").length}),0===imgs.length?(img=$('link[rel~="shortcut"][rel~="icon"]').attr("href"),img?absurl(img):"http://www.google.com/s2/favicons?"+$.param({domain:location.hostname})):(imgs.sort(function(lhs,rhs){return rhs.offsetWidth*rhs.offsetHeight-lhs.offsetWidth*lhs.offsetHeight}),imgs[0].src))}function abbreviateText(text,length){if(unescape(encodeURIComponent(text)).length<=length)return text;var abbrev=text.slice(0,length-3);if(!/\W/.test(text.charAt(length-3))){var match=/^(.*)\s\S*$/.exec(abbrev);match&&(abbrev=match[1])}return abbrev+"…"}function escapeHtml(s){return s.replace(/[<>&"']/g,function(ch){return HTML_CHAR_MAP[ch]})}function getEmbed(options,uri,settings){var embed=settings&&settings.embed;if("function"==typeof embed&&(embed=embed.call(this,options,uri,settings)),embed)return embed;embed=['<iframe scrolling="no" frameborder="0" style="border:none;" allowtransparency="true"'];var embed_url=$('meta[name="twitter:player"]').attr("content");if(embed_url){var width=$('meta[name="twitter:player:width"]').attr("content"),height=$('meta[name="twitter:player:height"]').attr("content");width&&embed.push(' width="',escapeHtml(width),'"'),height&&embed.push(' height="',escapeHtml(height),'"')}else embed_url=uri+options.referrer_track;return embed.push(' src="',escapeHtml(embed_url),'"></iframe>'),embed.join("")}function getURI(options){var uri=document.location.href,canonical=$("link[rel=canonical]").attr("href")||$('head meta[property="og:url"]').attr("content");return canonical?uri=absurl(canonical):options&&options.ignore_fragment&&(uri=uri.replace(/#.*$/,"")),uri}function buttonClickHandler(service_name){function onclick(event){var $container=$(this).parents("li.help_info").first(),$share=$container.parents(".social_share_privacy_area").first().parent(),options=$share.data("social-share-privacy-options"),service=options.services[service_name],button_class=service.button_class||service_name,uri=options.uri;"function"==typeof uri&&(uri=uri.call($share[0],options));var $switch=$container.find("span.switch");$switch.hasClass("off")?($container.addClass("info_off"),$switch.addClass("on").removeClass("off").html(service.txt_on||" "),$container.find("img.privacy_dummy").replaceWith("function"==typeof service.button?service.button.call($container.parent().parent()[0],service,uri,options):service.button),$share.trigger({type:"socialshareprivacy:enable",serviceName:service_name,isClick:!event.isTrigger})):($container.removeClass("info_off"),$switch.addClass("off").removeClass("on").html(service.txt_off||" "),$container.find(".dummy_btn").empty().append($("<img/>").addClass(button_class+"_privacy_dummy privacy_dummy").attr({alt:service.dummy_alt,src:service.path_prefix+("line"===options.layout?service.dummy_line_img:service.dummy_box_img)}).click(onclick)),$share.trigger({type:"socialshareprivacy:disable",serviceName:service_name,isClick:!event.isTrigger}))}return onclick}function enterHelpInfo(){var $info_wrapper=$(this);if(!$info_wrapper.hasClass("info_off")){var timeout_id=window.setTimeout(function(){$info_wrapper.addClass("display"),$info_wrapper.removeData("timeout_id")},500);$info_wrapper.data("timeout_id",timeout_id)}}function leaveHelpInfo(){var $info_wrapper=$(this),timeout_id=$info_wrapper.data("timeout_id");timeout_id!==undefined&&window.clearTimeout(timeout_id),$info_wrapper.removeClass("display")}function permCheckChangeHandler(){var $input=$(this),$share=$input.parents(".social_share_privacy_area").first().parent(),options=$share.data("social-share-privacy-options");$input.is(":checked")?(options.set_perma_option($input.attr("data-service"),options),$input.parent().addClass("checked")):(options.del_perma_option($input.attr("data-service"),options),$input.parent().removeClass("checked"))}function enterSettingsInfo(){var $settings=$(this),timeout_id=window.setTimeout(function(){$settings.find(".settings_info_menu").removeClass("off").addClass("on"),$settings.removeData("timeout_id")},500);$settings.data("timeout_id",timeout_id)}function leaveSettingsInfo(){var $settings=$(this),timeout_id=$settings.data("timeout_id");timeout_id!==undefined&&window.clearTimeout(timeout_id),$settings.find(".settings_info_menu").removeClass("on").addClass("off")}function setPermaOption(service_name,options){$.cookie("socialSharePrivacy_"+service_name,"perma_on",{domain:options.cookie_domain,expires:options.cookie_expires,path:options.cookie_path})}function delPermaOption(service_name,options){$.cookie("socialSharePrivacy_"+service_name,null,{domain:options.cookie_domain,path:options.cookie_path})}function getPermaOption(service_name){return!!$.cookie("socialSharePrivacy_"+service_name)}function socialSharePrivacy(options){if("string"==typeof options){var command=options;if(1===arguments.length)switch(command){case"enable":this.find(".switch.off").click();break;case"disable":this.find(".switch.on").click();break;case"toggle":this.find(".switch").click();break;case"options":return this.data("social-share-privacy-options");case"destroy":this.trigger({type:"socialshareprivacy:destroy"}),this.children(".social_share_privacy_area").remove(),this.removeData("social-share-privacy-options");break;case"enabled":var enabled={};return this.each(function(){var $self=$(this),options=$self.data("social-share-privacy-options");for(var name in options.services)enabled[name]=$self.find("."+(options.services[name].class_name||name)+" .switch").hasClass("on")}),enabled;case"disabled":var disabled={};return this.each(function(){var $self=$(this),options=$self.data("social-share-privacy-options");for(var name in options.services)disabled[name]=$self.find("."+(options.services[name].class_name||name)+" .switch").hasClass("off")}),disabled;default:throw new Error("socialSharePrivacy: unknown command: "+command)}else{var arg=arguments[1];switch(command){case"enable":this.each(function(){var $self=$(this),options=$self.data("social-share-privacy-options");$self.find("."+(options.services[arg].class_name||arg)+" .switch.off").click()});break;case"disable":this.each(function(){var $self=$(this),options=$self.data("social-share-privacy-options");$self.find("."+(options.services[arg].class_name||arg)+" .switch.on").click()});break;case"toggle":this.each(function(){var $self=$(this),options=$self.data("social-share-privacy-options");$self.find("."+(options.services[arg].class_name||arg)+" .switch").click()});break;case"option":if(!(arguments.length>2))return this.data("social-share-privacy-options")[arg];var value={};value[arg]=arguments[2],this.each(function(){$.extend(!0,$(this).data("social-share-privacy-options"),value)});break;case"options":$.extend(!0,options,arg);break;case"enabled":var options=this.data("social-share-privacy-options");return this.find("."+(options.services[arg].class_name||arg)+" .switch").hasClass("on");case"disabled":var options=this.data("social-share-privacy-options");return this.find("."+(options.services[arg].class_name||arg)+" .switch").hasClass("off");default:throw new Error("socialSharePrivacy: unknown command: "+command)}}return this}return this.each(function(){var data={};this.lang&&(data.language=this.lang);for(var i=0,attrs=this.attributes;i<attrs.length;++i){var attr=attrs[i];if(/^data-./.test(attr.name)){for(var path=attr.name.slice(5).replace(/-/g,"_").split("."),ctx=data,j=0;j<path.length-1;++j){var name=path[j];name in ctx?(ctx=ctx[name],"string"==typeof ctx&&(ctx=new Function("$","return ("+ctx+");").call(this,$))):ctx=ctx[name]={}}var name=path[j];ctx[name]="object"==typeof ctx[name]?$.extend(!0,new Function("$","return ("+attr.value+");").call(this,$),ctx[name]):attr.value}}if("cookie_expires"in data&&(data.cookie_expires=Number(data.cookie_expires)),"perma_option"in data&&(data.perma_option="true"===$.trim(data.perma_option).toLowerCase()),"ignore_fragment"in data&&(data.ignore_fragment="true"===$.trim(data.ignore_fragment).toLowerCase()),"set_perma_option"in data&&(data.set_perma_option=new Function("service_name","options",data.set_perma_option)),"del_perma_option"in data&&(data.del_perma_option=new Function("service_name","options",data.del_perma_option)),"get_perma_option"in data&&(data.get_perma_option=new Function("service_name","options",data.get_perma_option)),"get_perma_options"in data&&(data.get_perma_options=new Function("options",data.get_perma_options)),"order"in data&&(data.order=$.trim(data.order),data.order?data.order=data.order.split(/\s+/g):delete data.order),"string"==typeof data.services&&(data.services=new Function("$","return ("+data.services+");").call(this,$)),"options"in data&&(data=$.extend(data,new Function("$","return ("+data.options+");").call(this,$)),delete data.options),"services"in data)for(var service_name in data.services){var service=data.services[service_name];"string"==typeof service&&(data.services[service_name]=new Function("$","return ("+service+");").call(this,$)),"string"==typeof service.status&&(service.status="true"===$.trim(service.status).toLowerCase()),"string"==typeof service.perma_option&&(service.perma_option="true"===$.trim(service.perma_option).toLowerCase())}var this_options=$.extend(!0,{},socialSharePrivacy.settings,options,data),order=this_options.order||[],dummy_img="line"===this_options.layout?"dummy_line_img":"dummy_box_img",any_on=!1,any_perm=!1,any_unsafe=!1,unordered=[];for(var service_name in this_options.services){var service=this_options.services[service_name];service.status&&(any_on=!0,-1===$.inArray(service_name,order)&&unordered.push(service_name),"safe"!==service.privacy&&(any_unsafe=!0,service.perma_option&&(any_perm=!0))),"language"in service||(service.language=this_options.language),"path_prefix"in service||(service.path_prefix=this_options.path_prefix),"referrer_track"in service||(service.referrer_track="")}if(unordered.sort(),order=order.concat(unordered),any_on){if(this_options.css_path){var css_path=(this_options.path_prefix||"")+this_options.css_path;document.createStyleSheet?document.createStyleSheet(css_path):0===$('link[href="'+css_path+'"]').length&&$("<link/>",{rel:"stylesheet",type:"text/css",href:css_path}).appendTo(document.head)}var permas;if(this_options.perma_option&&any_perm)if(this_options.get_perma_options)permas=this_options.get_perma_options(this_options);else{permas={};for(var service_name in this_options.services)permas[service_name]=this_options.get_perma_option(service_name,this_options)}var uri=this_options.uri;"function"==typeof uri&&(uri=uri.call(this,this_options));var $context=$('<ul class="social_share_privacy_area"></ul>').addClass(this_options.layout),$share=$(this);$share.prepend($context).data("social-share-privacy-options",this_options);for(var i=0;i<order.length;++i){var service_name=order[i],service=this_options.services[service_name];if(service&&service.status){var $help_info,class_name=service.class_name||service_name,button_class=service.button_class||service_name;"safe"===service.privacy?($help_info=$('<li class="help_info"><div class="info">'+service.txt_info+'</div><div class="dummy_btn"></div></li>').addClass(class_name),$help_info.find(".dummy_btn").addClass(button_class).append(service.button.call(this,service,uri,this_options))):($help_info=$('<li class="help_info"><div class="info">'+service.txt_info+'</div><span class="switch off">'+(service.txt_off||" ")+'</span><div class="dummy_btn"></div></li>').addClass(class_name),$help_info.find(".dummy_btn").addClass(button_class).append($("<img/>").addClass(button_class+"_privacy_dummy privacy_dummy").attr({alt:service.dummy_alt,src:service.path_prefix+service[dummy_img]})),$help_info.find(".dummy_btn img.privacy_dummy, span.switch").click(buttonClickHandler(service_name))),$context.append($help_info)}}if(any_unsafe){var $settings_info=$('<li class="settings_info"><div class="settings_info_menu off perma_option_off"><a><span class="help_info icon"><span class="info">'+this_options.txt_help+"</span></span></a></div></li>"),$info_link=$settings_info.find("> .settings_info_menu > a").attr("href",this_options.info_link);if(this_options.info_link_target&&$info_link.attr("target",this_options.info_link_target),$context.append($settings_info),$context.find(".help_info").on("mouseenter",enterHelpInfo).on("mouseleave",leaveHelpInfo),this_options.perma_option&&any_perm){var $container_settings_info=$context.find("li.settings_info"),$settings_info_menu=$container_settings_info.find(".settings_info_menu");$settings_info_menu.removeClass("perma_option_off"),$settings_info_menu.append('<span class="settings">'+this_options.txt_settings+"</span><form><fieldset><legend>"+this_options.settings_perma+"</legend></fieldset></form>");for(var $fieldset=$settings_info_menu.find("form fieldset"),i=0;i<order.length;++i){var service_name=order[i],service=this_options.services[service_name];if(service&&service.status&&service.perma_option&&"safe"!==service.privacy){var class_name=service.class_name||service_name,perma=permas[service_name],$field=$('<label><input type="checkbox"'+(perma?' checked="checked"/>':"/>")+service.display_name+"</label>");$field.find("input").attr("data-service",service_name),$fieldset.append($field),perma&&($context.find("li."+class_name+" span.switch").click(),this_options.set_perma_option(service_name,this_options))}}$container_settings_info.find("span.settings").css("cursor","pointer"),$container_settings_info.on("mouseenter",enterSettingsInfo).on("mouseleave",leaveSettingsInfo),$container_settings_info.find("fieldset input").on("change",permCheckChangeHandler)}}$share.trigger({type:"socialshareprivacy:create",options:this_options})}})}var IMAGE_ATTR_MAP={META:"content",IMG:"src",A:"href",IFRAME:"src",LINK:"href"},HTML_CHAR_MAP={"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;","'":"&#39;"};socialSharePrivacy.absurl=absurl,socialSharePrivacy.escapeHtml=escapeHtml,socialSharePrivacy.getTitle=getTitle,socialSharePrivacy.getImage=getImage,socialSharePrivacy.getEmbed=getEmbed,socialSharePrivacy.getDescription=getDescription,socialSharePrivacy.abbreviateText=abbreviateText,socialSharePrivacy.formatNumber=formatNumber,socialSharePrivacy.settings={services:{},info_link:"http://panzi.github.io/SocialSharePrivacy/",info_link_target:"",txt_settings:"Settings",txt_help:"If you activate these fields via click, data will be sent to a third party (Facebook, Twitter, Google, ...) and stored there. For more details click <em>i</em>.",settings_perma:"Permanently enable share buttons:",layout:"line",set_perma_option:setPermaOption,del_perma_option:delPermaOption,get_perma_options:null,get_perma_option:getPermaOption,perma_option:!!$.cookie,cookie_path:"/",cookie_domain:null,cookie_expires:365,path_prefix:"",css_path:"stylesheets/jquery.socialshareprivacy.min.css",uri:getURI,language:"en",ignore_fragment:!0},$.fn.socialSharePrivacy=socialSharePrivacy}(jQuery),function($){"use strict";var locales={af:["ZA"],ar:["AR"],az:["AZ"],be:["BY"],bg:["BG"],bn:["IN"],bs:["BA"],ca:["ES"],cs:["CZ"],cy:["GB"],da:["DK"],de:["DE"],el:["GR"],en:["GB","PI","UD","US"],eo:["EO"],es:["ES","LA"],et:["EE"],eu:["ES"],fa:["IR"],fb:["LT"],fi:["FI"],fo:["FO"],fr:["CA","FR"],fy:["NL"],ga:["IE"],gl:["ES"],he:["IL"],hi:["IN"],hr:["HR"],hu:["HU"],hy:["AM"],id:["ID"],is:["IS"],it:["IT"],ja:["JP"],ka:["GE"],km:["KH"],ko:["KR"],ku:["TR"],la:["VA"],lt:["LT"],lv:["LV"],mk:["MK"],ml:["IN"],ms:["MY"],nb:["NO"],ne:["NP"],nl:["NL"],nn:["NO"],pa:["IN"],pl:["PL"],ps:["AF"],pt:["BR","PT"],ro:["RO"],ru:["RU"],sk:["SK"],sl:["SI"],sq:["AL"],sr:["RS"],sv:["SE"],sw:["KE"],ta:["IN"],te:["IN"],th:["TH"],tl:["PH"],tr:["TR"],uk:["UA"],vi:["VN"],zh:["CN","HK","TW"]};$.fn.socialSharePrivacy.settings.services.facebook={status:!0,button_class:"fb_like",dummy_line_img:"images/dummy_facebook.png",dummy_box_img:"images/dummy_box_facebook.png",dummy_alt:'Facebook "Like"-Dummy',txt_info:"Two clicks for more privacy: The Facebook Like button will be enabled once you click here. Activating the button already sends data to Facebook &ndash; see <em>i</em>.",txt_off:"not connected to Facebook",txt_on:"connected to Facebook",perma_option:!0,display_name:"Facebook Like/Recommend",referrer_track:"",action:"like",colorscheme:"light",font:"",button:function(options,uri,settings){var match=/^([a-z]{2})_([A-Z]{2})$/.exec(options.language),locale="en_US";if(match){if(match[1]in locales){var subs=locales[match[1]];locale=-1!==$.inArray(match[2],subs)?options.language:match[1]+"_"+subs[0]}}else options.language in locales&&(locale=options.language+"_"+locales[options.language][0]);var params={locale:locale,href:uri+options.referrer_track,send:"false",show_faces:"false",action:options.action,colorscheme:options.colorscheme};return options.font&&(params.font=options.font),"line"===settings.layout?(params.width="120",params.height="20",params.layout="button_count"):(params.width=62,params.height=61,params.layout="box_count"),$('<iframe scrolling="no" frameborder="0" allowtransparency="true"></iframe>').attr("src","https://www.facebook.com/plugins/like.php?"+$.param(params))}}}(jQuery),function($){"use strict";$.fn.socialSharePrivacy.settings.services.gplus={status:!0,button_class:"gplusone",dummy_line_img:"images/dummy_gplus.png",dummy_box_img:"images/dummy_box_gplus.png",dummy_alt:'"Google+1"-Dummy',txt_info:"Two clicks for more privacy: The Google+ button will be enabled once you click here. Activating the button already sends data to Google &ndash; see <em>i</em>.",txt_off:"not connected to Google+",txt_on:"connected to Google+",perma_option:!0,display_name:"Google+",referrer_track:"",button:function(options,uri,settings){var $code=$('<div class="g-plusone"></div><script type="text/javascript">window.___gcfg = {lang: "'+options.language.replace("_","-")+'"}; (function() { var po = document.createElement("script"); po.type = "text/javascript"; po.async = true; po.src = "https://apis.google.com/js/plusone.js"; var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(po, s); })(); </script>');return $code.filter(".g-plusone").attr({"data-href":uri+options.referrer_track,"data-size":"line"===settings.layout?"medium":"tall"}),$code}}}(jQuery),function($){"use strict";$.fn.socialSharePrivacy.settings.services.twitter={status:!0,button_class:"tweet",dummy_line_img:"images/dummy_twitter.png",dummy_box_img:"images/dummy_box_twitter.png",dummy_alt:'"Tweet this"-Dummy',txt_info:"Two clicks for more privacy: The Tweet this button will be enabled once you click here. Activating the button already sends data to Twitter &ndash; see <em>i</em>.",txt_off:"not connected to Twitter",txt_on:"connected to Twitter",perma_option:!0,display_name:"Twitter",referrer_track:"",via:"",related:"",hashtags:"",dnt:!0,text:$.fn.socialSharePrivacy.getTitle,button:function(options,uri,settings){var text="function"==typeof options.text?options.text.call(this,options,uri,settings):String(options.text);text=$.fn.socialSharePrivacy.abbreviateText(text,120);var params={url:uri+options.referrer_track,counturl:uri,text:text,count:"line"===settings.layout?"horizontal":"vertical",lang:options.language};return options.via&&(params.via=options.via),options.related&&(params.related=options.related),options.hashtags&&(params.hashtags=options.hashtags),options.dnt&&(params.dnt=options.dnt),$('<iframe allowtransparency="true" frameborder="0" scrolling="no"></iframe>').attr("src","https://platform.twitter.com/widgets/tweet_button.html?"+$.param(params).replace(/\+/g,"%20"))}}}(jQuery),jQuery(document).ready(function($){"use strict";$('script[type="application/x-social-share-privacy-settings"]').each(function(){var settings=new Function("return ("+(this.textContent||this.innerText||this.text)+");").call(this);"object"==typeof settings&&$.extend(!0,$.fn.socialSharePrivacy.settings,settings)})});;
jQuery.extend(!0,jQuery.fn.socialSharePrivacy.settings,{services:{facebook:{dummy_line_img:"images/de/dummy_facebook.png",dummy_box_img:"images/de/dummy_box_facebook.png",txt_info:"Zwei Klicks f&uuml;r mehr Datenschutz: Erst wenn Sie hier klicken, wird der Button aktiv und Sie k&ouml;nnen Ihre Empfehlung an Facebook senden. Schon beim Aktivieren werden Daten an Dritte &uuml;bertragen &ndash; siehe <em>i</em>.",txt_off:"nicht mit Facebook verbunden",txt_on:"mit Facebook verbunden"},gplus:{txt_info:"Zwei Klicks f&uuml;r mehr Datenschutz: Erst wenn Sie hier klicken, wird der Button aktiv und Sie k&ouml;nnen Ihre Empfehlung an Google+ senden. Schon beim Aktivieren werden Daten an Dritte &uuml;bertragen &ndash; siehe <em>i</em>.",txt_off:"nicht mit Google+ verbunden",txt_on:"mit Google+ verbunden"},twitter:{txt_info:"Zwei Klicks f&uuml;r mehr Datenschutz: Erst wenn Sie hier klicken, wird der Button aktiv und Sie k&ouml;nnen Ihre Empfehlung an Twitter senden. Schon beim Aktivieren werden Daten an Dritte &uuml;bertragen &ndash; siehe <em>i</em>.",txt_off:"nicht mit Twitter verbunden",txt_on:"mit Twitter verbunden"}},info_link:"http://panzi.github.io/SocialSharePrivacy/index.de.html",txt_settings:"Einstellungen",txt_help:"Wenn Sie diese Felder durch einen Klick aktivieren, werden Informationen an Facebook, Twitter oder Google etc. in die USA &uuml;bertragen und unter Umst&auml;nden auch dort gespeichert. N&auml;heres erfahren Sie durch einen Klick auf das <em>i</em>.",settings_perma:"Dauerhaft aktivieren und Daten&uuml;ber&shy;tragung zustimmen:",language:"de"});;
