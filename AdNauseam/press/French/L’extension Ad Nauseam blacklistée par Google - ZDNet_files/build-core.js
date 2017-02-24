var cacheBustingId = '$Revision: 201605121406 $';
/* Keep only revision number */
cacheBustingId = 'v=' + cacheBustingId.replace(/[^\d]/g, '');

;
(function($) {
    'use strict';

    /**
     * Multiple parallel getScript
     *
     * @access public
     * @param Array|String url (one or more URLs)
     * @param callback fn (oncomplete, optional)
     * @returns void
     */

    var loadedUrls = [],
        loadScript = function(url) {
            return jQuery.ajax({
                type: 'GET',
                url: url,
                dataType: 'script',
                crossDomain: true,
                cache: true
            });
        };

    $.getScripts = function(urls, fn) {
        if (!$.isArray(urls)) {
            urls = [urls];
        }

        urls = $.map(urls, function(url, i) {
            if ($.inArray(url, loadedUrls) === -1) {
                return url;
            }
        });

        if (urls.length) {
            $.when.apply(null, $.map(urls, loadScript)).done(function() {
                $.merge(loadedUrls, urls);
                fn && fn();
            });
        } else {
            fn && fn();
        }
    };
}(jQuery));


jQuery.ajaxSetup({
    timeout: 20000
});

/*!
 * jQuery Cookie Plugin
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function($) {
    $.cookie = function(key, value, options) {

        // key and at least value given, set cookie...
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
            options = $.extend({}, options);

            if (value === null || value === undefined) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires,
                    t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path ? '; path=' + options.path : '',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join(''));
        }

        // key and possibly options given, get cookie...
        options = value || {};
        var decode = options.raw ? function(s) {
            return s;
        } : decodeURIComponent;

        var pairs = document.cookie.split('; ');
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
            if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
        }
        return null;
    };
})(jQuery);


/**
 * jQuery.ScrollTo
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 5/25/2009
 *
 * @projectDescription Easy element scrolling using jQuery.
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 * Works with jQuery +1.2.6. Tested on FF 2/3, IE 6/7/8, Opera 9.5/6, Safari 3, Chrome 1 on WinXP.
 *
 * @author Ariel Flesler
 * @version 1.4.2
 *
 * @id jQuery.scrollTo
 * @id jQuery.fn.scrollTo
 * @param {String, Number, DOMElement, jQuery, Object} target Where to scroll the matched elements.
 *        The different options for target are:
 *              - A number position (will be applied to all axes).
 *              - A string position ('44', '100px', '+=90', etc ) will be applied to all axes
 *              - A jQuery/DOM element ( logically, child of the element to scroll )
 *              - A string selector, that will be relative to the element to scroll ( 'li:eq(2)', etc )
 *              - A hash { top:x, left:y }, x and y can be any kind of number/string like above.
 *               - A percentage of the container's dimension/s, for example: 50% to go to the middle.
 *              - The string 'max' for go-to-end.
 * @param {Number} duration The OVERALL length of the animation, this argument can be the settings object instead.
 * @param {Object,Function} settings Optional set of settings or the onAfter callback.
 *       @option {String} axis Which axis must be scrolled, use 'x', 'y', 'xy' or 'yx'.
 *       @option {Number} duration The OVERALL length of the animation.
 *       @option {String} easing The easing method for the animation.
 *       @option {Boolean} margin If true, the margin of the target element will be deducted from the final position.
 *       @option {Object, Number} offset Add/deduct from the end position. One number for both axes or { top:x, left:y }.
 *       @option {Object, Number} over Add/deduct the height/width multiplied by 'over', can be { top:x, left:y } when using both axes.
 *       @option {Boolean} queue If true, and both axis are given, the 2nd axis will only be animated after the first one ends.
 *       @option {Function} onAfter Function to be called after the scrolling ends.
 *       @option {Function} onAfterFirst If queuing is activated, this function will be called after the first scrolling ends.
 * @return {jQuery} Returns the same jQuery object, for chaining.
 *
 * @desc Scroll to a fixed position
 * @example $('div').scrollTo( 340 );
 *
 * @desc Scroll relatively to the actual position
 * @example $('div').scrollTo( '+=340px', { axis:'y' } );
 *
 * @dec Scroll using a selector (relative to the scrolled element)
 * @example $('div').scrollTo( 'p.paragraph:eq(2)', 500, { easing:'swing', queue:true, axis:'xy' } );
 *
 * @ Scroll to a DOM element (same for jQuery object)
 * @example var second_child = document.getElementById('container').firstChild.nextSibling;
 *                      $('#container').scrollTo( second_child, { duration:500, axis:'x', onAfter:function(){
 *                              alert('scrolled!!');
 *                      }});
 *
 * @desc Scroll on both axes, to different values
 * @example $('div').scrollTo( { top: 300, left:'+=200' }, { axis:'xy', offset:-20 } );
 */
;
(function($) {

    var $scrollTo = $.scrollTo = function(target, duration, settings) {
        $(window).scrollTo(target, duration, settings);
    };

    $scrollTo.defaults = {
        axis: 'xy',
        duration: parseFloat($.fn.jquery) >= 1.3 ? 0 : 1
    };
    // Returns the element that needs to be animated to scroll the window.
    // Kept for backwards compatibility (specially for localScroll & serialScroll)
    $scrollTo.window = function(scope) {
        return $(window)._scrollable();
    };

    // Hack, hack, hack :)
    // Returns the real elements to scroll (supports window/iframes, documents and regular nodes)
    $.fn._scrollable = function() {
        return this.map(function() {
            var elem = this,
                isWin = !elem.nodeName || $.inArray(elem.nodeName.toLowerCase(), ['iframe', '#document', 'html', 'body']) != -1;

            if (!isWin)
                return elem;

            var doc = (elem.contentWindow || elem).document || elem.ownerDocument || elem;

            return $.browser.safari || doc.compatMode == 'BackCompat' ?
                doc.body :
                doc.documentElement;
        });
    };

    $.fn.scrollTo = function(target, duration, settings) {
        if (typeof duration == 'object') {
            settings = duration;
            duration = 0;
        }
        if (typeof settings == 'function')
            settings = {
                onAfter: settings
            };

        if (target == 'max')
            target = 9e9;

        settings = $.extend({}, $scrollTo.defaults, settings);
        // Speed is still recognized for backwards compatibility
        duration = duration || settings.speed || settings.duration;
        // Make sure the settings are given right
        settings.queue = settings.queue && settings.axis.length > 1;

        if (settings.queue)
        // Let's keep the overall duration
            duration /= 2;
        settings.offset = both(settings.offset);
        settings.over = both(settings.over);

        return this._scrollable().each(function() {
            var elem = this,
                $elem = $(elem),
                targ = target,
                toff, attr = {},
                win = $elem.is('html,body');

            switch (typeof targ) {
                // A number will pass the regex
                case 'number':
                case 'string':
                    if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ)) {
                        targ = both(targ);
                        // We are done
                        break;
                    }
                    // Relative selector, no break!
                    targ = $(targ, this);
                case 'object':
                    // DOMElement / jQuery
                    if (targ.is || targ.style)
                    // Get the real position of the target 
                        toff = (targ = $(targ)).offset();
            }
            $.each(settings.axis.split(''), function(i, axis) {
                var Pos = axis == 'x' ? 'Left' : 'Top',
                    pos = Pos.toLowerCase(),
                    key = 'scroll' + Pos,
                    old = elem[key],
                    max = $scrollTo.max(elem, axis);

                if (toff) { // jQuery / DOMElement
                    attr[key] = toff[pos] + (win ? 0 : old - $elem.offset()[pos]);

                    // If it's a dom element, reduce the margin
                    if (settings.margin) {
                        attr[key] -= parseInt(targ.css('margin' + Pos)) || 0;
                        attr[key] -= parseInt(targ.css('border' + Pos + 'Width')) || 0;
                    }

                    attr[key] += settings.offset[pos] || 0;

                    if (settings.over[pos])
                    // Scroll to a fraction of its width/height
                        attr[key] += targ[axis == 'x' ? 'width' : 'height']() * settings.over[pos];
                } else {
                    var val = targ[pos];
                    // Handle percentage values
                    attr[key] = val.slice && val.slice(-1) == '%' ?
                        parseFloat(val) / 100 * max : val;
                }

                // Number or 'number'
                if (/^\d+$/.test(attr[key]))
                // Check the limits
                    attr[key] = attr[key] <= 0 ? 0 : Math.min(attr[key], max);

                // Queueing axes
                if (!i && settings.queue) {
                    // Don't waste time animating, if there's no need.
                    if (old != attr[key])
                    // Intermediate animation
                        animate(settings.onAfterFirst);
                    // Don't animate this axis again in the next iteration.
                    delete attr[key];
                }
            });

            animate(settings.onAfter);

            function animate(callback) {
                $elem.animate(attr, duration, settings.easing, callback && function() {
                    callback.call(this, target, settings);
                });
            };

        }).end();
    };

    // Max scrolling position, works on quirks mode
    // It only fails (not too badly) on IE, quirks mode.
    $scrollTo.max = function(elem, axis) {
        var Dim = axis == 'x' ? 'Width' : 'Height',
            scroll = 'scroll' + Dim;

        if (!$(elem).is('html,body'))
            return elem[scroll] - $(elem)[Dim.toLowerCase()]();

        var size = 'client' + Dim,
            html = elem.ownerDocument.documentElement,
            body = elem.ownerDocument.body;

        return Math.max(html[scroll], body[scroll]) - Math.min(html[size], body[size]);

    };

    function both(val) {
        return typeof val == 'object' ? val : {
            top: val,
            left: val
        };
    };

})(jQuery);



/* cbsiStatus
---------------------- */
;
(function($) {

    /* Defaults
    ----------------------- */
    var defaults = {
        text: '',
        className: '',
        position: 'absolute',
        location: 'center', //topLeft, topCenter
        buffer: 80, //prevents flashing
        disableForm: false,
        close: true,
        notify: false //closes itself after delay
    };


    /* Status Constructor
     * ========================= */
    var Status = function(element, options) {

        this.init(element, options);
    };


    /* Methods
    ----------------------- */
    Status.prototype = {
        constructor: Status,

        init: function(element, options) {
            this.options = $.extend({}, defaults, options);
            this.$element = $(element);
            this.$status = $('<div class="status"><span class="text"></span></div>');
            this.isActive = false;

            if (this.options.close) {
                this.$status.delegate('[data-close=status]', 'click', $.proxy(this.remove, this));
                $('<div class="icon close" data-close="status">&times;</div>').prependTo(this.$status);
            }

            if (this.options.disableForm) {
                this.$element.bind('add.disableForm', $.proxy(this.disableForm, this));
                this.$element.bind('remove.disableForm', $.proxy(this.enableForm, this));
            }
        },

        add: function() {
            clearTimeout(this.removeTimeout);
            clearTimeout(this.notifyTimeout);

            var self = this;

            this.addTimeout = setTimeout(function() {
                self.$element.trigger('add');

                self.$status.attr('class', 'status' + ' ' + self.options.location + ' ' + self.options.className);
                self.$status.find('.text').html(self.options.text);

                if (self.$element.is('body')) {
                    self.$status.appendTo(self.$element);
                } else {
                    self.$status.insertAfter(self.$element);
                }

                self.position();

                self.isActive = true;

                if (self.options.notify) {
                    self.notifyTimeout = setTimeout(function() {
                        self.remove();
                    }, 3000);
                }

            }, this.options.buffer);
        },

        remove: function() {
            if (!this.isActive) {
                clearTimeout(this.addTimeout);
                clearTimeout(this.notifyTimeout);
                return false;
            }

            var self = this;

            this.removeTimeout = setTimeout(function() {
                self.$element.trigger('remove');

                self.$status.detach();

                self.isActive = false;
            }, this.options.buffer);
        },

        position: function() {
            var offset = {
                    top: 0,
                    left: 0
                },
                css = {},
                height = 0,
                width = 0,
                loaderHeight = this.$status.outerHeight(),
                loaderWidth = this.$status.innerWidth();

            if (this.options.position === 'fixed') {
                height = $(window).height();
                width = $(window).width();
            } else {
                offset = this.$element.position();
                height = this.$element.outerHeight();
                width = this.$element.outerWidth();
            }

            switch (this.options.location) {
                case 'center':
                    css.top = offset.top + (height / 2) - (loaderHeight / 2);
                    css.left = offset.left + (width / 2) - (loaderWidth / 2);
                    break;
                case 'topCenter':
                    css.top = 0;
                    css.left = offset.left + (width / 2) - (loaderWidth / 2);
                    break;
                case 'topLeft':
                default:
                    css = offset;
            }

            this.$status.css($.extend({}, {
                zIndex: 9999993,
                position: this.options.position
            }, css));

        },

        disableForm: function() {
            if (this.isFormDisabled) {
                return false;
            }

            this.$element.find('input, select, button').attr('disabled', 'disabled');

            this.isFormDisabled = true;
        },

        enableForm: function() {
            if (!this.isFormDisabled) {
                return false;
            }

            this.$element.find('input, select, button').removeAttr('disabled');

            this.isFormDisabled = false;
        }
    };



    /* $.cbsiStatus Plugin
     *========================== */
    $.fn.cbsiStatus = function(option, type) {
        var $this = $(this[0]),
            store = type || 'status',
            data = $this.data(store),
            options = typeof option == 'object' && option;

        if (!data) {
            data = new Status(this, options);
            $this.data(store, data);
        }

        if (typeof option == 'object') {
            $.extend(data.options, defaults, option);
        }

        if (typeof option == 'string') {
            data[option]();
        } else {
            data.add();
        }

        return $this;
    };

    $.cbsiStatus = function(option) {
        var $body = $('body'),
            opts = {
                position: 'fixed',
                location: 'topCenter'
            };

        if (typeof option != 'string') {
            option = $.extend({}, opts, option);
        }

        $body.cbsiStatus(option);

        return $body;
    };

    $.fn.cbsiLoading = function(option) {
        var $this = $(this),
            opts = {
                position: 'fixed',
                location: 'topCenter',
                text: 'Loading',
                className: 'loading',
                close: false
            };

        if (typeof option != 'string') {
            option = $.extend({}, opts, option);
        }

        $this.cbsiStatus(option, 'loading');

        return this;
    };


    $.cbsiLoading = function(option) {
        var $body = $('body');

        $body.cbsiLoading(option, 'loading');

        return $body;
    };

})(jQuery);




/*
CBSI.handleAsyncResponse
=============================
Requires:
        modal.js
        status.js
        */
;
(function($) {

    if (!window.CBSI) {
        window.CBSI = {};
    }

    /* Defaults
    ----------------------- */
    var defaults = {
        onSuccess: function() {},
        onError: function() {},
        onComplete: function() {}
    };


    CBSI.handleAsyncResponse = function(res, options) {
        var opts = $.extend(true, {}, defaults, options);

        if (typeof res === 'string') {
            try {
                res = $.parseJSON(res);
            } catch (e) {}
        }

        if (typeof res !== 'object' || typeof res.status === 'undefined') {
            if ($.type(opts.onUnknownError) === "function") {
                opts.onLoadError(res);
            }

            return false;
        }

        if (res.pageElements && res.pageElements.modal) {
            $.cbsiModal({
                content: res.pageElements.modal.html,
                title: res.pageElements.modal.title
            });
        }

        if (res.pageElements && res.pageElements.status) {
            $.cbsiStatus({
                className: res.pageElements.status.type,
                text: res.pageElements.status.message,
                notify: res.pageElements.status.notify
            });
        }

        if (res.status !== 'success') {
            if ($.type(opts.onError) === "function") {
                opts.onError(res.errors);
            }

            return false;
        }

        if ($.type(opts.onSuccess) === "function") {
            opts.onSuccess(res);
        }
    };

})(jQuery);

/* app.js
---------------------- */
(function($) {

    window.debug = function() {
        if (window.console && console.log) {
            try {
                console.log.apply(console, arguments);
            } catch (e) {
                console.log(Array.slice(arguments));
            }
        }
    };

    if (!window.CBSI) {
        window.CBSI = {};
    }

    /* Ajax
    ================================================== */
    function ajax(scope) {
        var $ajax = $('.ajax', scope);

        function init() {
            $ajax.cbsiAjax().bind('hasLoaded', function() {
                $(this).unbind('hasLoaded');
                setScripts($(this).parent());
            });
        }

        if ($ajax.length) {
            if ($.isFunction($.fn.cbsiAjax)) {
                init();
            } else {
                $.getScripts('/frontend/core/js/cbsi/ajax.js?' + cacheBustingId, init);
            }
        }
    }

    /* Alert Messages
    ================================================== */
    function alerts(scope) {
        scope.delegate('[data-close="alert"]', 'click', function(e) {
            e.preventDefault();
            $alert = $(this).closest('.alert');
            $alert.fadeOut(200, function() {
                $alert.remove();
            });
        });
    }

    /* Carousel
    ================================================== */
    function carousel(scope) {
        var $carousel = $('.carousel', scope);

        function init() {
            if (Modernizr.touch && !$.isFunction($.fn.swipe)) {
                $.ajax({
                    url: '/frontend/js/external/jquery.touchSwipe-1.2.4.min.js?' + cacheBustingId,
                    async: false
                });
                $carousel.cbsiSlider({
                    touch: Modernizr.touch,
                    animation: 'slide',
                    animationDuration: 200,
                    slideshow: true
                });
            } else {
                $carousel.cbsiSlider({
                    animation: 'fade',
                    animationDuration: 0,
                    slideshow: true
                });
            }
        }

        if ($carousel.length) {
            if ($.isFunction($.fn.cbsiSlider)) {
                init();
            } else {
                $.getScripts('/frontend/core/js/cbsi/slider.js?' + cacheBustingId, init);
            }
        }
    }

    /* Catfish Bar
    ================================================== */
    function catfishBar(scope) {
        var $catfish = $('#catfish', scope);

        function init() {
            var showBar = $.cookie('catfish-state') || true;
            if (showBar && $.cookie('catfish-closes') && $.cookie('catfish-closes') >= 5) {
                showBar = false;
            }
            if (showBar == true) {
                $catfish.css('display', 'block');

                // catfish bar close is remembered for the session
                // if user closes the catfish bar in more than 5 sessions, the closure is remembered for 365 days
                $catfish.find('[data-action=close]').bind('click', function(e) {
                    e.preventDefault();
                    $catfish.remove();
                    $.cookie('catfish-state', false, {
                        path: '/'
                    }); //expires end of session
                    var numCloses = $.cookie('catfish-closes');
                    numCloses = (numCloses == null) ? 1 : (parseInt(numCloses) + 1);
                    $.cookie('catfish-closes', numCloses, {
                        path: '/',
                        expires: 365
                    }); //expires in 365 days
                });

                // add extra padding to the bottom of the page
                // TODO: need a better way to see if the bottom leader has been loaded
                $(document).on('ready lowerLeaderLoaded', function(e) {
                    adjust($catfish, e);
                });

            }
        }

        function adjust($catfish, e) {
            var $bottomLeader = $('#leaderBottom').find(".container");
            if ($bottomLeader.height() > 0) {
                $bottomLeader.css('padding-bottom', parseInt($bottomLeader.css('padding-bottom')) + $catfish.height());
            } else {
                $('#content').css('padding-bottom', parseInt($('#content').css('padding-bottom')) + $catfish.height());
            }
        }

        if ($catfish.length) {
            init();
        }
    }

    /* Cookies Policy
    ================================================== */
    function cookiesPolicy(scope) {
        var $cookiePolicy = $('#cookiePolicy', scope);

        function init() {

            var currentTime = new Date();
            currentTime = currentTime.getTime();

            var cookiePolicyData = $.cookie('cookie_policy_display');
            var cookiePolicySessionData = $.cookie('cookie_policy_session');
            var cookiePolicyDefault = {
                'visit': 1,
                'page_view': 0,
                'last_visit': currentTime,
                'closed': false
            };

            if (!cookiePolicyData) {
                cookiePolicyData = cookiePolicyDefault;
            } else {
                try {
                    cookiePolicyData = JSON.parse(cookiePolicyData);
                } catch (err) {
                    cookiePolicyData = cookiePolicyDefault;
                }
            }

            // Cookie policy session does not exist, save current milliseconds
            if (!cookiePolicySessionData) {
                cookiePolicySessionData = currentTime;
            }

            // Compare session value versus saved last visit one
            if (cookiePolicySessionData != cookiePolicyData.last_visit) {
                // Update
                cookiePolicyData.last_visit = cookiePolicySessionData;
                cookiePolicyData.page_view = 0;
                cookiePolicyData.visit++;
            }
            cookiePolicyData.page_view++;

            $cookiePolicy.find('[data-action=close]').bind('click', function(e) {
                if ($(this).hasClass('close')) {
                    e.preventDefault();
                }
                $cookiePolicy.slideUp(200, function() {
                    $cookiePolicy.remove();
                });
                cookiePolicyData.closed = true;
                $.cookie('cookie_policy_display', JSON.stringify(cookiePolicyData), {
                    path: '/',
                    domain: '.zdnet.fr',
                    expires: 365
                });
            });

            $.cookie('cookie_policy_display', JSON.stringify(cookiePolicyData), {
                path: '/',
                domain: '.zdnet.fr',
                expires: 365
            });

            $.cookie('cookie_policy_session', cookiePolicySessionData, {
                path: '/',
                domain: '.zdnet.fr'
            });
        }

        if ($cookiePolicy.length) {
            init();
        }
    }

    /* Contact Author
    ================================================== */
    function contactAuthor(scope) {

        var $contactLinks = $('[data-action="contactAuthor"]', scope);

        var init = function() {
            $contactLinks.on('click', function(e) {
                e.preventDefault();
                $({}).bind('opened', function(e, $cont) {
                    $cont.find('form').each(function() {
                        submitContactForm($(this));
                    });
                }).cbsiModal({
                    url: $(this).attr('href')
                });
            });
        };

        var submitContactForm = function($form) {
            $form.cbsiInitAsyncForm({
                triggerSubmit: false,
                onSuccess: function(res) {
                    var timer = setTimeout(function() {
                        $.cbsiModal.close()
                    }, 3000);
                }
            });
        };

        if ($contactLinks.length) {
            init();
        }

    }

    /* Edition Switch
    ================================================== */
    function editionSwitch(scope) {
        $('.editionSwitch').click(function() {
            var edition = $(this).data('edition');

            $.cookie('edition',
                edition, {
                    path: '/',
                    domain: '.zdnet.com',
                    expires: 365
                });

            window.location.reload();
            return false;
        });
    }

    /* CSS Map
    ================================================== */
    function cssMap(scope) {
        if ($('#map-selectable').length) {
            $('#map-selectable').cssMap({
                size: 430,
                visibleList: true,
                cities: true
            });
        }
    }

    /* Dependent Fields
    ================================================== */
    function dependentFields(scope) {

        var $fields = $('[data-depends-on]', scope);

        var init = function() {
            $fields.each(function() {
                $(this).cbsiDependentFields();
            });
        };

        if ($fields.length) {
            if ($.isFunction($.fn.cbsiDependentFields)) {
                init();
            } else {
                $.getScripts('/js/build-form-utils.js?' + cacheBustingId, init);
            }
        }
    }

    var subMenuContainer = '<ul id="subMenuContainer" class="bar"><li class="expandable"><a href="javascript:void(0);">Plus<span class="icon arrow"></span></a><nav class="menu"><ul id="moreMenu"></ul></nav></li></ul>';
    var $sbContainerCheck = $('#subMenuContainer');
    /* Drop Down Menus
    ================================================== */
    function dropDownMenus(scope) {


        var $dropDowns = $('.expandable', scope);

        function init() {
            /** PARTNERS ZONE **/
            $('#partners_zone a:not(".close.btn")').addClass('invisible');
            $('#pzlink').click(function(e) {
                e.preventDefault();
                $('#partners_zone').slideToggle(function() {
                    $('#partners_zone a').toggleClass('invisible');
                });
            })
            $('#partners_zone .close.btn').click(function(e) {
                e.preventDefault();
                $('#partners_zone').slideToggle(function() {
                    $('#partners_zone a').toggleClass('invisible');
                });
            })
            subMenuBuilder();
            if (Modernizr.touch) {
                $dropDowns.bind({
                    'click': function() {
                        var $visibleMenu = $(this).find('.menu');
                        if ($visibleMenu.css('display') == 'none') {
                            // only apply for mobile else primary nav will disappear
                            if ($('body').width() < 768) {
                                $dropDowns.each(function(i, el) {
                                    $(el).find('.menu').css('display', 'none');
                                });
                            }
                            $visibleMenu.css('display', 'block');
                        } else {
                            $visibleMenu.css('display', 'none');
                        }
                    }

                });
            }
        }



        if ($dropDowns.length) {
            init();
        }
    }


    /* More Menu for Tablet version
    ================================================== */




    function subMenuBuilder() {
        if (!$sbContainerCheck.length) {
            $(subMenuContainer).appendTo('.primaryNav.container');
        }
        $('.primaryNav').children('ul').children('#menuRetract').children('.menu').children('ul').children('li').each(function(index) {
            //console.debug($(this));
            if (index > 4) {
                $(this).clone(1).appendTo('#moreMenu');
                $(this).addClass('moreElements');
                $('#subMenuContainer').removeClass('noShowMenu')
                    //$('#subMenuContainer').removeClass('noShowMenu').addClass('showMenu');
            } else {
                $('#subMenuContainer').addClass('noShowMenu');
            }
        });
    }


    /* Lazy Loading
    ================================================== */
    function lazyLoading(scope) {
        var $lazyLoading = $('.lazyload', scope);

        function init() {
            $lazyLoading.cbsiLazyLoading().bind('hasLoaded', function() {
                $(this).unbind('hasLoaded');
                setScripts($(this));
            });
        }

        if ($lazyLoading.length) {
            if ($.isFunction($.fn.cbsiLazyLoading)) {
                init();
            } else {
                $.getScripts('/js/lazyLoading.js?' + cacheBustingId, init);
            }
        }
    }

    /* Load River - works in conjunction with tabs to ajax load content
    ================================================== */
    function loadRiver(scope) {
        var $river = $('#articleRiver', scope);

        function init() {
            $river.cbsiLoadRiver();
        }

        if ($river.length) {
            if ($.isFunction($.fn.cbsiLoadRiver)) {
                init();
            } else {
                $.getScripts('/js/loadRiver.js?' + cacheBustingId, init);
            }
        }
    }

    /* Load Tab - loads a specified tab with ajax load content
    ================================================== */
    function loadTabContent(scope) {
        var $tab = $('.loadTabContent', scope);

        function init() {
            $tab.cbsiLoadTabContent();
        }

        if ($tab.length) {
            if ($.isFunction($.fn.cbsiLoadTabContent)) {
                init();
            } else {
                $.getScripts('/js/loadTabContent.js?' + cacheBustingId, init);
            }
        }
    }

    /* Member
    ================================================== */
    function member(scope) {
        var $forms = $('form[data-member]', scope);

        $forms.each(function() {
            var $form = $(this),
                action = $form.data('member'),
                member = CBSI.member();

            if (typeof member[action] != 'undefined') {
                member[action]({
                    element: $form,
                    triggerSubmit: false
                });
            }
        });
    }


    function memberDelegate() {
        var init = function() {
            CBSI.member().delegate($(this));
        };

        $('body').on('click', 'a[data-member]', function(e) {
            e.preventDefault();
            init.call(this);
        }).on('submit', 'form[data-member]', function(e) {
            e.preventDefault();
            init.call(this);
        });
    }

    /* Modal
    ================================================== */
    function modalDelegate(scope) {
        var init = function($el) {
            $.cbsiModal({
                url: $el.attr('data-modal-ajax'),
                title: ($el.attr('data-modal-title') || $el.text())
            });
        };

        $('body').delegate('[data-modal-ajax]', 'click', function(e) {
            e.preventDefault();

            var $this = $(this);

            if ($.isFunction($.cbsiModal)) {
                init($this);
            } else {
                $.getScripts('/js/modal.js?' + cacheBustingId, function() {
                    init($this);
                });
            }
        });
    }

    /* Welcome Modal
    ================================================== */
    function welcomeModal(scope) {
        var $seenIntro = $.cookie('seenIntro') || 0;

        if (!$seenIntro) {
            $.cookie('seenIntro', '1', {
                path: '/',
                domain: '.zdnet.com',
                expires: 365
            });
            var init = function($el) {
                //var $elWelcomeModal = $('#welcomeModal');
                $.cbsiModal({
                    url: "/membership/welcome/"
                });
            };

            var $this = $(this);

            if ($.isFunction($.cbsiModal)) {
                init($this);
            } else {
                $.getScripts('/js/modal.js?' + cacheBustingId, function() {
                    init($this);
                });
            }
        }
    }

    /* Placeholder
    ================================================== */
    function placeholder(scope) {
        var $placeholders = $('[placeholder]', scope);

        function init() {
            $placeholders.cbsiPlaceholder();
        }

        if ($placeholders.length) {
            if ($.isFunction($.fn.cbsiPlaceholder)) {
                init();
            } else {
                $.getScripts('/frontend/core/js/cbsi/placeholder.js?' + cacheBustingId, init);
            }
        }
    }

    /* Podcast
    ================================================== */
    function podcast(scope) {
        var $podcasts = $('.audioPlayer', scope);

        function init() {
            $podcasts.cbsiPodcast();
        }

        if ($podcasts.length) {
            Modernizr.load({
                test: Modernizr.audio.mp3,
                nope: ['/frontend/js/external/swfobject.js?' + cacheBustingId, '/frontend/js/external/audio-player.min.js?' + cacheBustingId, '/frontend/core/js/cbsi/podcast.js?' + cacheBustingId],
                complete: function() {
                    if (!Modernizr.audio.mp3) {
                        init();
                    }
                }
            });
        }
    }

    /* Product Compare
    ================================================== */
    function productCompare(scope) {
        var $compareProducts = $('.productCompare', scope);

        function countSelected() {
            count = $compareProducts.find(':checked').length;
        }

        if ($compareProducts.length) {
            var checkboxes = $compareProducts.find('input[type=checkbox]'),
                count,
                maxProducts = 4,
                minProducts = 2;

            $compareProducts.click(function(e) {
                countSelected();
                if (count > maxProducts) {
                    $(this).attr('checked', false);
                    alert('Please select a maximum of ' + maxProducts + ' products to compare');
                }
            });
            $compareProducts.find('input[type=submit]').click(function(e) {
                countSelected();
                if (count < minProducts) {
                    e.preventDefault();
                    alert('Please select at least ' + minProducts + ' products to compare');
                }
            });
        }
    }

    /* Resource Centre Unit
    ================================================== */
    function resourceCentre() {
        if ($('#resourceCentre').length) {
            $resources = $('#resourceCentre li');
            $resources.bind({
                mouseenter: function() {
                    $(this).removeClass('collapse').addClass('expand');
                },
                mouseleave: function() {
                    $(this).removeClass('expand').addClass('collapse');
                }
            });
        }
    }

    /* Reviews
    ================================================== */
    function review() {
        if ($('#review').length) {
            $(document).ready(function(e) {
                $('#gallery').hide();
                $('#specifications').hide();

                var $thumbs = $('#gallery .thumbnails');

                if ($thumbs.length) {
                    $thumbs.find('a').click(function(e) {
                        e.preventDefault();
                        var $this = $(this);
                        $('#gallery .figure img').attr('src', $this.attr('href'));
                        $this.parent().siblings().removeClass('selected');
                        $this.parent().addClass('selected');
                    });
                }
            });
        }
    }

    /* Share Bar
    ================================================== */
    function shareBar(scope) {
        var $shareBars = $('[data-module="sharebar"]', scope);
        if ($shareBars.length) {


            /** boutons de partage spécifiques aux pages partenaires **/
            if (document.location.pathname.indexOf("/partenaires/ibm/") == 0) {
                function initCustom() {
                    $shareBars.cbsiShareBar({
                        contentContainer: '#siu-container',
                        buttons: ['facebook', 'twitterIBM', 'linkedin', 'googleplus'],
                        links: ['email', 'print', 'delicious', 'digg', 'stumbleupon', 'reddit', 'technorati', 'pinterest', 'slashdot'],
                        showFader: true,
                        twitterRelated: $('input[name=twitter]').val(),
                        lfSiteId: '3000030',
                        lfDomain: 'zor.i5.livefyre.com',
                        windowInset: {
                            top: 20,
                            bottom: 0
                        }
                    });
                }

                $.getScripts(['/js/shareBar.js?' + cacheBustingId, '/js/pop.js?' + cacheBustingId, '/js/fixate.js?' + cacheBustingId, '/js/fader.js?' + cacheBustingId], initCustom);
            } else {
                function init() {
                    $shareBars.cbsiShareBar({
                        contentContainer: '#siu-container',
                        buttons: ['facebook', 'twitter', 'linkedin', 'googleplus'],
                        links: ['email', 'print', 'delicious', 'digg', 'stumbleupon', 'reddit', 'technorati', 'pinterest', 'slashdot'],
                        showFader: true,
                        lfSiteId: '3000030',
                        lfDomain: 'zor.i5.livefyre.com',
                        windowInset: {
                            top: 20,
                            bottom: 0
                        }
                    });
                }

                $.getScripts(['/js/shareBar.js?' + cacheBustingId, '/js/pop.js?' + cacheBustingId, '/js/fixate.js?' + cacheBustingId, '/js/fader.js?' + cacheBustingId], init);
            }
        }
    }

    /* Fixate
    ================================================== */
    function fixate(scope) {
        var $fixates = $('[data-toggle="fixate"]', scope);
        if ($fixates.length) {
            function init() {
                $fixates.fixate({
                    bottomCapEl: 'footer[role="contentinfo"]',
                    topCapEl: 'header[role="banner"]'
                });
            }

            $.getScripts(['/js/fixate.js?' + cacheBustingId], init);
        }
    }

    /* Pop Over
    ================================================== */
    function pop(scope) {
        var $pops = $('[data-toggle="pop"]', scope);
        if ($pops.length) {
            function init() {
                $pops.popover();
            }

            $.getScripts(['/js/pop.js?' + cacheBustingId], init);
        }
    }

    /* Livefyre Comment Count
    ================================================== */
    function lfCommentCount(scope) {
        var $lf = $('.livefyre-commentcount', scope);
        if ($lf.length) {
            function init() {
                LF.CommentCount.loaded = false;
                LF.CommentCount.run()
            }

            $.getScripts(['http://zor.livefyre.com/wjs/v1.0/javascripts/CommentCount.js?' + cacheBustingId], init);
        }
    }

    /* Fader
    ================================================== */
    function fade(scope) {
        var $fades = $('.focus-highlight', scope);
        if ($fades.length) {
            function init() {
                $fades.fader();
            }

            $.getScripts(['/js/fader.js?' + cacheBustingId], init);
        }
    }


    /* Expand Table
    ================================================== */
    function tableExpand(scope) {

        var $togglers = $('#specifications .toggler', scope);

        function init() {
            $togglers.cbsiToggle({
                expandText: 'Expand',
                collapseText: 'Collapse',
                target: $('#specifications tr.hide')
            });
        }

        if ($togglers.length) {
            if ($.isFunction($.fn.cbsiToggle)) {
                init();
            } else {
                $.getScripts('/frontend/core/js/cbsi/toggle.js?' + cacheBustingId, init);
            }
        }
    }

    /* Tabs
    ================================================== */
    function tabs(scope) {
        var $tabs = $('.tabs', scope);

        function init() {
            $tabs.cbsiTabs();
        }

        if ($tabs.length) {
            if ($.isFunction($.fn.cbsiTabs)) {
                init();
            } else {
                $.getScripts('/js/tabs.js?' + cacheBustingId, init);
            }
        }
    }

    /* Talkback Reply
    ================================================== */
    function talkback(scope) {

        // bind event to comment reply links
        function bindReplyLinks() {

            $('body').on('click', '[data-action=reply]', function(e) {

                e.preventDefault();

                var $reply = $(this);

                // get comment being replied to
                var $comment = $reply.closest('div.commentWrapper');

                // get comment id and set in talkback form
                var commentId = $reply.data('comment-id');
                if (commentId != '') {
                    $talkbackForm.find('[name=parent_content_id]').val(commentId);
                }

                // get commment thread id and set in talkback form
                var commentThreadId = $reply.data('comment-thread');
                if (commentThreadId != '') {
                    $talkbackForm.find('[name=comment_thread]').val(commentThreadId);
                }

                // move talkback form below selected comment
                $talkbackForm.slideUp(function() {
                    $talkbackForm.insertAfter($comment);
                    $talkbackForm.slideDown(function() {
                        $('html, body').animate({
                            scrollTop: $talkbackForm.offset().top - 150
                        });
                    });
                });

            });

        }

        // bind event to comments pagination
        function bindPagination() {

            $commentsPagination = $comments.find('.pagination');

            if ($commentsPagination.length) {

                // get more comments via ajax
                $('body').on('click', '#comments .pagination a', function(e) {

                    e.preventDefault();

                    var $this = $(this);

                    if (!$this.data('isLoading') || $this.data('isLoading') == false) {
                        $.ajax({
                            url: $this.attr('href'),
                            beforeSend: function() {
                                $.cbsiLoading();
                                $this.data('isLoading', true);
                            },
                            error: function() {
                                $.cbsiLoading('remove');
                                $this.data('isLoading', false);
                            },
                            success: function(res) {
                                $.cbsiLoading('remove');
                                if (res.status == 'success') {
                                    $.each(res.pageElements, function(i, comment) {
                                        $.each(comment, function(j, html) {
                                            //  scroll to top of comments list
                                            $('html, body').animate({
                                                scrollTop: $comments.offset().top - 150
                                            }, function() {

                                                // replace comments with ajax response, then fade in
                                                $comments.replaceWith(html);
                                                $comments = $('#comments');
                                                $comments.find('.commentsList').hide().fadeIn(600);

                                                // move comments form back to original position on page
                                                $talkbackForm.insertAfter($comments);

                                                // reset comment field
                                                $talkbackForm.find('[name=subject]').val('');
                                                $talkbackForm.find('[name=comment]').val('');
                                                $talkbackForm.find('[name=parent_content_id]').val('');
                                                $talkbackForm.find('[name=comment_thread]').val('');

                                            });
                                        });
                                    });
                                }
                                $this.data('isLoading', false);
                            }
                        });
                    }

                });

            }
        }

        var $comments = $('#comments');

        /*if ($comments.length) {
                bindPagination();
            }*/

        var $talkbackForm = $('#postComment');

        if ($talkbackForm.length) {
            bindReplyLinks();
        }

    }

    /* Thumbnail Slider
    ================================================== */
    function thumbnailSlider(scope) {
        var $sliders = $('.thumbnails', scope);

        function init() {
            $sliders.cbsiThumbnailSlider({
                itemsPerPage: ($('body').width() > 480 ? ($('body').width() >= 1024 ? 6 : 4) : 2)
            });
        }

        if ($sliders.length) {
            if ($.isFunction($.fn.cbsiThumbnailSlider)) {
                init();
            } else {
                $.getScripts('/frontend/core/js/cbsi/thumbnailSlider.js?' + cacheBustingId, init);
            }
        }
    }


    /* Image Slider
    ================================================== */
    function imageTrafficDriverSlider(scope) {
        var $imageTD = $('.imageTrafficDriver', scope);

        function init() {
            $imageTD.cbsiThumbnailSlider({
                itemsPerPage: 2
            });
        }

        if ($imageTD.length) {
            if ($.isFunction($.fn.cbsiThumbnailSlider)) {
                init();
            } else {
                $.getScripts('/frontend/core/js/cbsi/thumbnailSlider.js?' + cacheBustingId, init);
            }
        }
    }

    /* Toggle Content
    ================================================== */
    function toggle(scope) {

        var $togglers = $('.toggler', scope);

        function init() {
            $togglers.cbsiToggle({
                animation: 'slide'
            });
        }

        if ($togglers.length) {
            if ($.isFunction($.fn.cbsiToggle)) {
                init();
            } else {
                $.getScripts('/frontend/core/js/cbsi/toggle.js?' + cacheBustingId, init);
            }
        }
    }

    /* Validator
    ================================================== */
    function validate(scope) {
        var $forms = $('form.validate', scope);

        function init() {
            $forms.cbsiValidate({});
        }

        if ($forms.length) {
            if ($.isFunction($.fn.cbsiValidate)) {
                init();
            } else {
                $.getScripts('/js/build-form-utils.js?' + cacheBustingId, init);
            }
        }
    }
	
    /* Speed Test
    ================================================== */
    function speedtestStart(scope) {
		
		//scope.delegate("#spdt-start", 'click', function(e) {
		scope.delegate("[data-action=spdt]", 'click', function(e) {
			 
			e.preventDefault();
			
			// additionnal prevent default
			$( "#spdt-start" ).click(function( event ) {
				event.preventDefault();
			});
		
			//console.log("startSPDT");
			$('#wl-bwt').wlBWt({
				BinPath: '/js/services/speedtest',
			});
				
        });
		
		var	rangeLabel = $( "#bwSelector option:selected" ).text();
		//alert($( "#bwSelector option:selected" ).val());
		$('#rangeLabel').text(rangeLabel);
		
		$("#bwSelector").change(function () {
			var gifSRC = 'http://cdn.cupinteractive.com/assets/zdnet/speedtest/tcomp.png';
			$("#bwSelector option:selected").each(function () {
				var gifName = $(this).val();
				gifSRC = 'http://cdn.cupinteractive.com/assets/zdnet/speedtest/t'+gifName+'.png';
			});
			$('#img-table').attr("src", gifSRC);
			rangeLabel = $( "#bwSelector option:selected" ).text();
			//alert($( "#bwSelector option:selected" ).val());
			$('#rangeLabel').text(rangeLabel);
			$('#rangeText').empty();
		});		
		
		$("#FBShareButton, #popupSPDT-FBShareButton").on('click', function (fe) {
			fe.preventDefault();
			
			if ( fe.isPropagationStopped() ) {
				//console.log('propagated');
			} else {
				//console.log('not propagated')
				var shareLabel = $('meta[property="og:description"]').attr('content');
				FB.ui({
					method: 'feed',
					link: 'http://www.zdnet.fr/services/test-bande-passante/',
					caption: shareLabel
				}, function(response){});
			}
			fe.stopPropagation();
		});
		
		$("#twitterShareButton, #popupSPDT-twitterShareButton").on('click', function (te) {
			te.preventDefault();
			if ( te.isPropagationStopped() ) {
				//console.log('propagated');
			} else {
				//console.log('not propagated');
				//console.log(te.target.tagName);
				var shareLabel = $('meta[property="og:description"]').attr('content');
				window.open("https://twitter.com/share?url="+escape('http://www.zdnet.fr/services/test-bande-passante/')+"&text="+shareLabel+"&via=zdnetfr", '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
				return false;
			}
			te.stopPropagation();
		});	

	}

    /* Voting
    ================================================== */
    function voting(scope) {
        scope.delegate('[data-action=vote]', 'click', function(e) {
            e.preventDefault();
            var $this = $(this);

            if (!$this.data('isLoading') || $this.data('isLoading') == false) {

                if ($this.data('asset-content-type') == 'comment' && $this.data('action') == 'vote') {
                    if ($this.data('asset-content-type') == 'up') {
                        var cookie_name = 'comment_flags';
                    } else {
                        var cookie_name = 'comment_votes';
                    }

                    var comment_votes = $.cookie(cookie_name);
                    var comment_votes_array = comment_votes.split(',');
                    var location = jQuery.inArray(String($this.data('asset-id')), comment_votes_array);

                    if (location > -1) {
                        if ($this.data('asset-content-type') == 'up') {
                            var message = 'Are you sure you wish to vote on this comment? Continuing to do so would remove your previous flag';
                        } else {
                            var message = 'Are you sure you wish to flag this comment? Continuing to do so would remove your previous vote';
                        }

                        $response = confirm(message);

                        if ($response == false) {
                            return false;
                        }
                    }
                }

                $.ajax({
                    url: $this.attr('href'),
                    data: {
                        action: $this.data('action'),
                        asset_id: $this.data('asset-id'),
                        asset_content_type: $this.data('asset-content-type'),
                        asset_debate_vote: $this.data('asset-debate-vote'),
                        content_type: $this.data('content-type')
                    },
                    beforeSend: function() {
                        $this.data('isLoading', true);
                    },
                    error: function() {
                        $.cbsiStatus({
                            className: 'error',
                            text: 'There was an error. Please try again',
                            notify: true
                        });
                        $this.data('isLoading', false);
                    },
                    success: function(res) {

                        if (res.status == 'success') {

                            $this.addClass('on');

                            if (res.data.flag_count && res.data.vote_count) {
                                var vote_element = $('#comment-' + $this.data('asset-id')).find('[data-content-type="up"]');
                                var flag_element = $('#comment-' + $this.data('asset-id')).find('[data-content-type="flag"]');

                                vote_element.find('.count').text(res.data.vote_count);
                                flag_element.find('.count').text(res.data.flag_count);
                            } else {
                                $this.find('.count').text(res.message);
                            }

                            switch ($this.data('content-type')) {
                                //Great Debate
                                case 'product':
                                    var successText = 'Your vote has been added';
                                    $('.votestatus').text('Thanks for voting');

                                    $('#sideA-vote').hide();
                                    $('#sideB-vote').hide();
                                    $('#sideA-voted').show();
                                    $('#sideB-voted').show();

                                    if ($this.data('asset-debate-vote') == 'debate_sidea') {
                                        $('#votedA').removeClass('disabled').addClass('voted');
                                    }
                                    if ($this.data('asset-debate-vote') == 'debate_sideb') {
                                        $('#votedB').removeClass('disabled').addClass('voted');
                                    }
                                    break;
                                case 'flag':
                                    var successText = 'This comment has been flagged';
                                    $this.find('.suffix').text((res.message === 1 ? 'Flag' : 'Flags'));
                                    break;
                                default:
                                    var successText = 'Your vote has been added';
                                    $this.find('.count').text(res.message);
                                    $this.find('.suffix').text((res.message === 1 ? 'Vote' : 'Votes'));
                            }

                            $.cbsiStatus({
                                className: 'success',
                                text: successText,
                                notify: true
                            });

                        } else {

                            switch ($this.data('content-type')) {
                                case 'flag':
                                    var errorText = 'You have already flagged this';
                                    break;
                                default:
                                    var errorText = 'You have already voted on this';
                            }

                            $.cbsiStatus({
                                className: 'error',
                                text: errorText,
                                notify: true
                            });

                        }

                        $this.data('isLoading', false);

                    }
                });
            }
        });
    }
	
    /* Create user Account using Ajax
    ================================================== */
    function createAccountAjaxForm(scope) {
        //scope.delegate('[data-action=createAccountAjax]', 'submit', function(e) {
		scope.delegate("#register_form", 'submit', function(e) {
		
			var postData = $(this).serializeArray();
			var formURL = $(this).attr("action");
			$.ajax(
			{
				url : formURL,
				type: "POST",
				dataType: "json",
				data: postData,
				success:function(result, textStatus, jqXHR) {
				
					if (result.success === true) {
					
						$('.mmode-msg').html(result.message);
						$('.mmode-msg').attr("style", "border:1px dotted rgb(51,208,20);color:rgb(51,208,20);font-style:italic;padding:10px;");
						$('.mmode-msg').after('<a href="'+result.referer+'" class="button primary">Retourner sur ZDNet</a>');
						$('.mmode-msg').show();
						document.getElementById("register_form").reset();
						$("#joinCommunitySubmitButton").attr("disabled", true);
						$("#register_form").hide();
						
						// auto return to original page
						timeout = setTimeout(function() {
							document.location.href = result.referer;
							return false;
						}, 15000);
						
					} else if (result.success == 'waiting') {
					
						$('.mmode-msg').html(result.message);
						$('.mmode-msg').attr("style", "border:1px dotted rgb(235,148,56);color:#005399;font-style:italic;padding:10px;");
						$('.mmode-msg').after('<a href="'+result.referer+'" class="buttonLock">En attente, vous devez valider votre compte</a>');
						$('.mmode-msg').show();
						document.getElementById("register_form").reset();
						$("#joinCommunitySubmitButton").attr("disabled", true);
						$("#register_form").hide();
						
						// auto return to original page
						timeout = setTimeout(function() {
							document.location.href = result.referer;
							return false;
						}, 15000);
						
					} else {
					
						$('.mmode-msg').html(result.message);
						$('.mmode-msg').attr("style", "border:1px dotted rgb(229,0,0);color:rgb(229,0,0);font-style:italic;padding:10px;");
						$('.mmode-msg').show();
						//here modify popup html result.html
					}
				},
				error: function(jqXHR, textStatus, errorThrown)	{
					//if fails     
				}
			});
		

			$("#register_form").unbind(); //unbind. to stop multiple form submit.
			
			e.preventDefault(); //STOP default action
			//e.stopImmediatePropagation();
			return false;
		});
	}

    /* Set Scripts
    ================================================== */
    function setScripts(scope) {
        ajax(scope);
        alerts(scope);
        carousel(scope);
        imageTrafficDriverSlider(scope);
        catfishBar(scope);
        cookiesPolicy(scope);
        contactAuthor(scope);
        editionSwitch(scope);
        cssMap(scope);
        dependentFields(scope);
        dropDownMenus(scope);
        lazyLoading(scope);
        loadRiver(scope);
        loadTabContent(scope);
        placeholder(scope);
        podcast(scope);
        productCompare(scope);
        resourceCentre(scope);
        review(scope);
        pop(scope);
        fixate(scope);
        fade(scope);
        //lfCommentCount(scope);
        tableExpand(scope);
        tabs(scope);
        thumbnailSlider(scope);
        toggle(scope);
        validate(scope);
        voting(scope);
		createAccountAjaxForm(scope);
		speedtestStart(scope);
    }


    //event that can be used from other scripts (after pageload)
    $(document).bind('contentLoaded', function(e, content) {
        var $content = $(content);
        setScripts($content);
        member($content); //member shouldn't get auto called on pageload
    });

    var $body = $('body');

    //init on pageload
    setScripts($body);

    //Share bar fire
    shareBar($body);

    talkback($body);

    // member needs to be loaded so login/register can be called at any time
    $.getScripts(['/js/member.js?' + cacheBustingId, '/js/modal.js?' + cacheBustingId, '/js/build-form-utils.js?' + cacheBustingId], function() {
        member();
        modalDelegate();
        memberDelegate();
    });


    //generates a select form with a unordered list
    $('ul.selectdropdown').each(function() {

        var select = $(document.createElement('select')).insertBefore($(this).hide());

        $('li a', this).each(function() {

            var a = $(this).click(function() {

                    if ($(this).attr('target') == '_blank') {
                        window.open(this.href);

                    } else {

                        window.location.href = this.href;

                    }

                }),

                option = $(document.createElement('option')).appendTo(select).val(this.href).html($(this).html()).click(function() {

                    a.click();

                });

        });

    });

    /** TOPIC PAGE DESCRIPTION SHOW MORE/LESS SCRIPT **/
    var showChar = 100;
    var ellipsestext = "...";
    var moretext = "En savoir plus";
    var lesstext = "Réduire";
    $('.topic-desc').each(function() {
        var content = $(this).html();

        if (content.length > showChar) {

            var c = content.substr(0, showChar);
            var h = content.substr(showChar - 1, content.length - showChar);

            var html = c + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><span class="plusdecontenu" style="display:none;"><span>' + h + '</span></span>&nbsp;&nbsp;';
            //var moreLink = '<a href="" class="morelink">' + moretext + '</a>';
            $('<p style="margin-top:-5px;"><a href="#" class="seeMore">' + moretext + '</a></p>').insertAfter($(this));
            $(this).html(html);
        }

    });

    $(".seeMore").click(function(e) {
        e.preventDefault();
        var moreSpan = $('h1+p span:last-child');
        if ($(this).hasClass("moins")) {
            moreSpan.hide();
            $(this).removeClass('moins');
            $(this).html(moretext);
        } else {
            moreSpan.show();
            $(this).addClass("moins");
            $(this).html(lesstext);
        }
    });

    /*Append the "publicité" label on each ad
        var prepend_count = new Array();
        var prependAds = function(i, e) {
                var loaded_ad = e.find(".tickerwrap, .mpuwrap");
                if (loaded_ad.length == 0) {
                        prepend_count[i]++;
                        if (prepend_count[i] < 2) {
                                setTimeout(prependAds(i, e), 1000);
                        }
                } else {
                        prepend_count[i] = 0;
                        e.show();
                }
        }
        var ads = $(".mpu,.ticker");
        if (ads.length > 0) {
                $.each(ads, function(i,e) {
                        $(e).hide();
                        prepend_count[i] = 0;
                        prependAds(i,$(e));
                });
        }
        */

    /* code for constrain ads size and resizing */
    var prependAds = function(i, e) {
        var loaded_ad = e.find(".lbwrap");
        prepend_count[i] = 0;
        var adWrapper = $(e);
        var adHeaderSize = $(adWrapper).find('.prepend').outerHeight();
        var adObject = $(adWrapper).find('object');
        var adIns = $(adWrapper).find('ins');
        if ($(adObject).length) {
            var adContainer = $(adObject).first();
        } else if ($(adIns).length) {
            var adContainer = $(adIns).first();
        }
        var minHeight = 90;
        var adContainerWidth = $(adContainer).width();
        var adContainerHeight = eval($(adContainer).height() + adHeaderSize + minHeight);
        var adRatio = adContainerWidth / adContainerHeight;
        $(adWrapper).css({
            'max-width': adContainerWidth,
            'overflow': 'hidden',
            'margin': '0px auto',
            'position': 'relative'
        });
        $(adContainer).css({
            'max-width': '100%'
        });
    }

    var ads = $(".leader .lbwrap");
    var prepend_count = new Array();
    if (ads.length > 0) {
        $.each(ads, function(i, e) {
            prepend_count[i] = 0;
            prependAds(i, $(e));
        });
    }
    /*
    var ads = $(".mpu,.ticker");
    if (ads.length > 0) {
            $.each(ads, function(i,e) {
                    $(e).hide();
                    prepend_count[i] = 0;
                    prependAds(i,$(e));
            });
    }
    */

    /*
    $('.lbwrap').each(function(e){
        var adWrapper = $(this);
            var adHeaderSize = $(adWrapper).find('.prepend').outerHeight();
            var adObject = $(adWrapper).find('object');
            var adIns = $(adWrapper).find('ins');
            alert($(adObject).length);
            if($(adObject).length) {
               console.log('Le container est un objet');
               var adContainer = $(adObject).first();
            }else if ($(adIns).length){
               console.log('Le container est un ins');
               var adContainer = $(adIns).first();
            }
            var adContainer = $(adWrapper).find('ins').first();
                var adContainerWidth = $(adContainer).outerWidth();
                var adContainerHeight = eval($(adContainer).outerHeight() + adHeaderSize) ;
                var adRatio = adContainerWidth / adContainerHeight;
                alert('hauteur : '+ adContainerHeight+'px / largeur : '+adContainerWidth+'px');
                $(adWrapper).css({'width':adContainerWidth,'height':adContainerHeight});
    });
/* ---------------------------------------- */

    /*$("select").change(function () {
      var str = "";
      $("select option:selected").each(function () {
            var url = $(this).val();
          });
      $("div").text(str);
  })*/
    //load social scripts
    /*jQuery.getScripts([
            'http://apis.google.com/js/plusone.js',
            '//platform.twitter.com/widgets.js',
            '//connect.facebook.net/en_GB/all.js#xfbml=1',
            '//platform.linkedin.com/in.js'
            ]);*/

})(jQuery);

// ===============================================
// AdBlock detector
//
// Attempts to detect the presence of Ad Blocker software
// and notify listener of its existence.
// Copyright (c) 2015 IAB
//
// The MIT License (MIT)
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
//
// THIS SCRIPT IS PROVIDED STRICTLY "AS IS", AND SHOULD ONLY BE USED IN COMPLIANCE WITH EXISTING LOCAL LAWS AND REGULATIONS.
// ===============================================

/**
 * @name window.adblockDetector
 *
 * IAB Adblock detector.
 * Usage: window.adblockDetector.init(options);
 *
 * Options object settings
 *
 *	@prop debug:  boolean
 *         Flag to indicate additional debug output should be printed to console
 *
 *	@prop found: @function
 *         Callback function to fire if adblock is detected
 *
 *	@prop notfound: @function
 *         Callback function to fire if adblock is not detected.
 *         NOTE: this function may fire multiple times and give false negative
 *         responses during a test until adblock is successfully detected.
 *
 *	@prop complete: @function
 *         Callback function to fire once a round of testing is complete.
 *         The test result (boolean) is included as a parameter to callback
 *
 * example: 	window.adblockDetector.init(
 {
     found: function(){ ...},
      notFound: function(){...}
 }
 );
 *
 *
 */
 
(function(win) {
    "use strict";

    var version = '1.0';

    var ofs = 'offset', cl = 'client';
    var noop = function(){};

    var testedOnce = false;
    var testExecuting = false;

    var isOldIEevents = (win.addEventListener === undefined);

    /**
     * Options set with default options initialized
     *
     */
    var _options = {
        loopDelay: 50,
        maxLoop: 5,
        debug: true,
        found: noop, 					// function to fire when adblock detected
        notfound: noop, 				// function to fire if adblock not detected after testing
        complete: noop  				// function to fire after testing completes, passing result as parameter
    }

    function parseAsJson(data){
        var result, fnData;
        try{
            result = JSON.parse(data);
        }
        catch(ex){
            try{
                fnData = new Function("return " + data);
                result = fnData();
            }
            catch(ex){
                log('Failed secondary JSON parse', true);
            }
        }

        return result;
    }

    /**
     * Ajax helper object to download external scripts.
     * Initialize object with an options object
     * Ex:
     {
         url : 'http://example.org/url_to_download',
         method: 'POST|GET',
         success: callback_function,
         fail:  callback_function
     }
     */
    var AjaxHelper = function(opts){
        var xhr = new XMLHttpRequest();

        this.success = opts.success || noop;
        this.fail = opts.fail || noop;
        var me = this;

        var method = opts.method || 'get';

        /**
         * Abort the request
         */
        this.abort = function(){
            try{
                xhr.abort();
            }
            catch(ex){
            }
        }

        function stateChange(vals){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    me.success(xhr.response);
                }
                else{
                    // failed
                    me.fail(xhr.status);
                }
            }
        }

        xhr.onreadystatechange = stateChange;

        function start(){
            xhr.open(method, opts.url, true);
            xhr.send();
        }

        start();
    }

    /**
     * Object tracking the various block lists
     */
    var BlockListTracker = function(){
        var me = this;
        var externalBlocklistData = {};

        /**
         * Add a new external URL to track
         */
        this.addUrl = function(url){
            externalBlocklistData[url] = {
                url: url,
                state: 'pending',
                format: null,
                data: null,
                result: null
            }

            return externalBlocklistData[url];
        }

        /**
         * Loads a block list definition
         */
        this.setResult = function(urlKey, state, data){
            var obj = externalBlocklistData[urlKey];
            if(obj == null){
                obj = this.addUrl(urlKey);
            }

            obj.state = state;
            if(data == null){
                obj.result = null;
                return;
            }

            if(typeof data === 'string'){
                try{
                    data = parseAsJson(data);
                    obj.format = 'json';
                }
                catch(ex){
                    obj.format = 'easylist';
                    // parseEasyList(data);
                }
            }
            obj.data = data;

            return obj;
        }

    }

    var listeners = []; // event response listeners
    var baitNode = null;
    var quickBait = {
        cssClass: 'pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links'
    };
    var baitTriggers = {
        nullProps: [ofs + 'Parent'],
        zeroProps: []
    };

    baitTriggers.zeroProps = [
        ofs +'Height', ofs +'Left', ofs +'Top', ofs +'Width', ofs +'Height',
        cl + 'Height', cl + 'Width'
    ];

    // result object
    var exeResult = {
        quick: null,
        remote: null
    };

    var findResult = null; // result of test for ad blocker

    var timerIds = {
        test: 0,
        download: 0
    };

    function isFunc(fn){
        return typeof(fn) == 'function';
    }

    /**
     * Make a DOM element
     */
    function makeEl(tag, attributes){
        var k, v, el, attr = attributes;
        var d = document;

        el = d.createElement(tag);

        if(attr){
            for(k in attr){
                if(attr.hasOwnProperty(k)){
                    el.setAttribute(k, attr[k]);
                }
            }
        }

        return el;
    }

    function attachEventListener(dom, eventName, handler){
        if(isOldIEevents){
            dom.attachEvent('on' + eventName, handler);
        }
        else{
            dom.addEventListener(eventName, handler, false);
        }
    }

    function log(message, isError){
        if(!_options.debug && !isError){
            return;
        }
        if(win.console && win.console.log){
            if(isError){
                console.error('[ABD] ' + message);
            }
            else{
                console.log('[ABD] ' + message);
            }
        }
    }

    var ajaxDownloads = [];

    /**
     * Load and execute the URL inside a closure function
     */
    function loadExecuteUrl(url){
        var ajax, result;

        blockLists.addUrl(url);
        // setup call for remote list
        ajax = new AjaxHelper(
            {
                url: url,
                success: function(data){
                    log('downloaded file ' + url); // todo - parse and store until use
                    result = blockLists.setResult(url, 'success', data);
                    try{
                        var intervalId = 0,
                            retryCount = 0;

                        var tryExecuteTest = function(listData){
                            if(!testExecuting){
                                beginTest(listData, true);
                                return true;
                            }
                            return false;
                        }

                        if(findResult == true){
                            return;
                        }

                        if(tryExecuteTest(result.data)){
                            return;
                        }
                        else{
                            log('Pause before test execution');
                            intervalId = setInterval(function(){
                                if(tryExecuteTest(result.data) || retryCount++ > 5){
                                    clearInterval(intervalId);
                                }
                            }, 250);
                        }
                    }
                    catch(ex){
                        log(ex.message + ' url: ' + url, true);
                    }
                },
                fail: function(status){
                    log(status, true);
                    blockLists.setResult(url, 'error', null);
                }
            });

        ajaxDownloads.push(ajax);
    }


    /**
     * Fetch the external lists and initiate the tests
     */
    function fetchRemoteLists(){
        var i, url;
        var opts = _options;

        for(i=0;i<opts.blockLists.length;i++){
            url = opts.blockLists[i];
            loadExecuteUrl(url);
        }
    }

    function cancelRemoteDownloads(){
        var i, aj;

        for(i=ajaxDownloads.length-1;i >= 0;i--){
            aj = ajaxDownloads.pop();
            aj.abort();
        }
    }


    // =============================================================================
    /**
     * Begin execution of the test
     */
    function beginTest(bait){
        log('start beginTest');
        if(findResult == true){
            return; // we found it. don't continue executing
        }
        testExecuting = true;
        castBait(bait);

        exeResult.quick = 'testing';

        timerIds.test = setTimeout(
            function(){ reelIn(bait, 1); },
            5);
    }

    /**
     * Create the bait node to see how the browser page reacts
     */
    function castBait(bait){
        var i, d = document, b = d.body;
        var t;
        var baitStyle = 'width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;'

        if(bait == null || typeof(bait) == 'string'){
            log('invalid bait being cast');
            return;
        }

        if(bait.style != null){
            baitStyle += bait.style;
        }

        baitNode = makeEl('div', {
            'class': bait.cssClass,
            'style': baitStyle
        });

        log('adding bait node to DOM');
        b.appendChild(baitNode);

        // touch these properties
        for(i=0;i<baitTriggers.nullProps.length;i++){
            t = baitNode[baitTriggers.nullProps[i]];
        }
        for(i=0;i<baitTriggers.zeroProps.length;i++){
            t = baitNode[baitTriggers.zeroProps[i]];
        }
    }

    /**
     * Run tests to see if browser has taken the bait and blocked the bait element
     */
    function reelIn(bait, attemptNum){
        var i, k, v;
        var body = document.body;
        var found = false;

        if(baitNode == null){
            log('recast bait');
            castBait(bait || quickBait);
        }

        if(typeof(bait) == 'string'){
            log('invalid bait used', true);
            if(clearBaitNode()){
                setTimeout(function(){
                    testExecuting = false;
                }, 5);
            }

            return;
        }

        if(timerIds.test > 0){
            clearTimeout(timerIds.test);
            timerIds.test = 0;
        }

        // test for issues

        if(body.getAttribute('abp') !== null){
            log('found adblock body attribute');
            found = true;
        }

        for(i=0;i<baitTriggers.nullProps.length;i++){
            if(baitNode[baitTriggers.nullProps[i]] == null){
                found = true;
                log('found adblock null attr: ' + baitTriggers.nullProps[i]);
                break;
            }
            if(found == true){
                break;
            }
        }


        for(i=0;i<baitTriggers.zeroProps.length;i++){
            if(found == true){
                break;
            }
            if(baitNode[baitTriggers.zeroProps[i]] == 0){
                found = true;
                log('found adblock zero attr: ' + baitTriggers.zeroProps[i]);
            }
        }

        if(window.getComputedStyle !== undefined) {
            var baitTemp = window.getComputedStyle(baitNode, null);
            if(baitTemp.getPropertyValue('display') == 'none'
                || baitTemp.getPropertyValue('visibility') == 'hidden') {
                found = true;
                log('found adblock computedStyle indicator');
            }
        }

        testedOnce = true;
        if(found || attemptNum++ >= _options.maxLoop){
            findResult = found;
            log('exiting test loop - value: ' + findResult);
            notifyListeners();
            if(clearBaitNode()){
                setTimeout(function(){
                    testExecuting = false;
                }, 5);
            }
        }
        else{
            timerIds.test = setTimeout(function(){
                reelIn(bait, attemptNum);
            }, _options.loopDelay);
        }
    }

    function clearBaitNode(){
        if(baitNode === null){
            return true;
        }

        try{
            if(isFunc(baitNode.remove)){
                baitNode.remove();
            }
            document.body.removeChild(baitNode);
        }
        catch(ex){
        }
        baitNode = null;

        return true;
    }

    /**
     * Halt the test and any pending timeouts
     */
    function stopFishing(){
        if(timerIds.test > 0){
            clearTimeout(timerIds.test);
        }
        if(timerIds.download > 0){
            clearTimeout(timerIds.download);
        }

        cancelRemoteDownloads();

        clearBaitNode();
    }

    /**
     * Fire all registered listeners
     */
    function notifyListeners(){
        var i, funcs;
        if(findResult === null){
            return;
        }
        for(i=0;i<listeners.length;i++){
            funcs = listeners[i];
            try{
                if(funcs != null){
                    if(isFunc(funcs['complete'])){
                        funcs['complete'](findResult);
                    }

                    if(findResult && isFunc(funcs['found'])){
                        funcs['found']();
                    }
                    else if(findResult === false && isFunc(funcs['notfound'])){
                        funcs['notfound']();
                    }
                }
            }
            catch(ex){
                log('Failure in notify listeners ' + ex.Message, true);
            }
        }
    }

    /**
     * Attaches event listener or fires if events have already passed.
     */
    function attachOrFire(){
        var fireNow = false;
        var fn;

        if(document.readyState){
            if(document.readyState == 'complete'){
                fireNow = true;
            }
        }

        fn = function(){
            beginTest(quickBait, false);
        }

        if(fireNow){
            fn();
        }
        else{
            attachEventListener(win, 'load', fn);
        }
    }


    var blockLists; // tracks external block lists

    /**
     * Public interface of adblock detector
     */
    var impl = {
        /**
         * Version of the adblock detector package
         */
        version: version,

        /**
         * Initialization function. See comments at top for options object
         */
        init: function(options){
            var k, v, funcs;

            if(!options){
                return;
            }

            funcs = {
                complete: noop,
                found: noop,
                notfound: noop
            };

            for(k in options){
                if(options.hasOwnProperty(k)){
                    if(k == 'complete' || k == 'found' || k == 'notFound'){
                        funcs[k.toLowerCase()] = options[k];
                    }
                    else{
                        _options[k] = options[k];
                    }
                }
            }

            listeners.push(funcs);

            blockLists = new BlockListTracker();

            attachOrFire();
        }
    }

    win['adblockDetector'] = impl;

})(window);

window.adblockDetector.init({
    debug: false,
    found: function() {
        var now = new Date().getTime();
        $.get('http://www.zdnet.fr/images/empty-iab.gif?_=' + now);
    }
});

